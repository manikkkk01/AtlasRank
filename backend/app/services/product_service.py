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
    product = product_cache.get(str(product_id))

    if product:
        return product

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

    # No Immersive API available.
    if not immersive_api_url:
        return None

    try:
        response = requests.get(
            immersive_api_url,
            params={
                "api_key": os.getenv("SERPAPI_KEY"),
            },
            timeout=(10, 30),
        )

        response.raise_for_status()

        data = response.json()

        product_results = data.get(
            "product_results",
            {},
        )

        stores = product_results.get(
            "stores",
            [],
        )

        target_store = (
            product.get("store") or ""
        ).strip().lower()

        # --------------------------------------------------
        # 1. Match the exact merchant
        # --------------------------------------------------

        for store in stores:
            store_name = (
                store.get("name") or ""
            ).strip().lower()

            store_link = store.get("link")

            if (
                target_store
                and store_name
                and target_store in store_name
                and store_link
                and not store_link.startswith(
                    "https://www.google.com/"
                )
            ):
                return store_link

        # --------------------------------------------------
        # 2. Search seller results
        # --------------------------------------------------

        sellers_results = data.get(
            "sellers_results",
            {},
        )

        online_sellers = sellers_results.get(
            "online_sellers",
            [],
        )

        for seller in online_sellers:
            seller_name = (
                seller.get("name") or ""
            ).strip().lower()

            direct_link = seller.get(
                "direct_link"
            )

            seller_link = seller.get(
                "link"
            )

            if target_store and target_store in seller_name:

                if (
                    direct_link
                    and not direct_link.startswith(
                        "https://www.google.com/"
                    )
                ):
                    return direct_link

                if (
                    seller_link
                    and not seller_link.startswith(
                        "https://www.google.com/"
                    )
                ):
                    return seller_link

        # --------------------------------------------------
        # 3. Any non-Google merchant store link
        # --------------------------------------------------

        for store in stores:
            store_link = store.get("link")

            if (
                store_link
                and not store_link.startswith(
                    "https://www.google.com/"
                )
            ):
                return store_link

        # --------------------------------------------------
        # 4. Any non-Google seller link
        # --------------------------------------------------

        for seller in online_sellers:
            direct_link = seller.get(
                "direct_link"
            )

            seller_link = seller.get(
                "link"
            )

            if (
                direct_link
                and not direct_link.startswith(
                    "https://www.google.com/"
                )
            ):
                return direct_link

            if (
                seller_link
                and not seller_link.startswith(
                    "https://www.google.com/"
                )
            ):
                return seller_link

        # --------------------------------------------------
        # IMPORTANT:
        # Never return the Google Shopping URL.
        # --------------------------------------------------

        return None

    except requests.RequestException as error:
        print(
            "Immersive Product API error:",
            error,
        )

        return None