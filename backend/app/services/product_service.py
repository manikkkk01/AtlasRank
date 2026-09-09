import os
import requests

from app.database import products_collection
from app.services.search_service import product_cache


def get_all_products():
    return list(
        products_collection.find(
            {},
            {"_id": 0},
        )
    )


def get_product_by_id(product_id: str):
    # First check recently searched SerpApi products
    product = product_cache.get(str(product_id))

    if product:
        return product

    # Fallback to MongoDB products
    product = products_collection.find_one(
        {"id": product_id},
        {"_id": 0},
    )

    return product


def get_product_store_url(product_id: str):
    """
    Fetch the actual merchant/store URL for a product
    using SerpApi's Google Immersive Product API.
    """

    product = product_cache.get(str(product_id))

    if not product:
        product = products_collection.find_one(
            {"id": product_id},
            {"_id": 0},
        )

    if not product:
        return None

    immersive_api_url = product.get("immersive_product_api")

    if not immersive_api_url:
        return product.get("url")

    try:
        response = requests.get(
            immersive_api_url,
            params={
                "api_key": os.getenv("SERPAPI_KEY"),
            },
            timeout=20,
        )

        response.raise_for_status()

        data = response.json()

        print(
            "IMMERSIVE API STATUS:",
            data.get("search_metadata", {}).get("status"),
        )

        print(
            "IMMERSIVE API ERROR:",
            data.get("error"),
        )

        print(
            "PRODUCT RESULTS:",
            data.get("product_results"),
        )

        print(
            "SELLERS RESULTS:",
            data.get("sellers_results"),
        )

        # --------------------------------------------------
        # Method 1: Current Immersive Product store results
        # --------------------------------------------------

        product_results = data.get("product_results", {})
        stores = product_results.get("stores", [])

        if stores:
            store_name = (
                product.get("store") or ""
            ).lower()

            # First try to find the exact store.
            for store in stores:
                current_store_name = (
                    store.get("name") or ""
                ).lower()

                if (
                    store_name
                    and store_name in current_store_name
                ):
                    store_link = store.get("link")

                    if store_link:
                        return store_link

            # Fallback: first store with a product link.
            for store in stores:
                store_link = store.get("link")

                if store_link:
                    return store_link

        # --------------------------------------------------
        # Method 2: Sellers results
        # --------------------------------------------------

        sellers_results = data.get(
            "sellers_results",
            {},
        )

        online_sellers = sellers_results.get(
            "online_sellers",
            [],
        )

        if online_sellers:
            store_name = (
                product.get("store") or ""
            ).lower()

            # First try matching the current store.
            for seller in online_sellers:
                seller_name = (
                    seller.get("name") or ""
                ).lower()

                if (
                    store_name
                    and store_name in seller_name
                ):
                    direct_link = seller.get(
                        "direct_link"
                    )

                    if direct_link:
                        return direct_link

                    seller_link = seller.get("link")

                    if seller_link:
                        return seller_link

            # Fallback to the first seller with a usable URL.
            for seller in online_sellers:
                direct_link = seller.get(
                    "direct_link"
                )

                if direct_link:
                    return direct_link

                seller_link = seller.get("link")

                if seller_link:
                    return seller_link

        # --------------------------------------------------
        # Method 3: Direct product link in response
        # --------------------------------------------------

        product_link = data.get("product_link")

        if product_link:
            return product_link

    except requests.RequestException as error:
        print(
            "Immersive Product API error:",
            error,
        )

    # Final fallback.
    return product.get("url")