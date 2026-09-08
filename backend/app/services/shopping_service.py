import os
import math
import requests
from dotenv import load_dotenv


load_dotenv()

SERPAPI_KEY = os.getenv("SERPAPI_KEY")


def calculate_review_score(reviews):
    """
    Convert review count into a 0-100 score.
    Uses logarithmic scaling so very large review counts
    don't dominate the ranking.
    """
    if reviews <= 0:
        return 0

    return min(math.log10(reviews + 1) / 5 * 100, 100)


def search_shopping_products(query: str):

    params = {
        "engine": "google_shopping",
        "q": query,
        "api_key": SERPAPI_KEY,
        "gl": "in",
        "hl": "en",
    }

    response = requests.get(
        "https://serpapi.com/search.json",
        params=params,
        timeout=20,
    )

    response.raise_for_status()

    data = response.json()

    raw_products = data.get("shopping_results", [])

    print("RAW SERPAPI RESULTS:", len(raw_products))

    # --------------------------------------------------
    # Filter irrelevant products
    # --------------------------------------------------

    

    # --------------------------------------------------
    # Find price range
    # --------------------------------------------------

    prices = [
        item.get("extracted_price")
        for item in raw_products
        if item.get("extracted_price") is not None
        and item.get("extracted_price") > 0
    ]

    cheapest_price = min(prices) if prices else 0
    most_expensive_price = max(prices) if prices else 0

    products = []

    # --------------------------------------------------
    # Normalize + calculate scores
    # --------------------------------------------------

    for item in raw_products:

        price = item.get("extracted_price") or 0
        rating = item.get("rating") or 0
        reviews = item.get("reviews") or 0

        # -----------------------------
        # Rating score
        # -----------------------------

        rating_score = (rating / 5) * 100

        # -----------------------------
        # Review score
        # -----------------------------

        review_score = calculate_review_score(reviews)

        # -----------------------------
        # Price score
        # Lower price = better score
        # -----------------------------

        if (
            price > 0
            and cheapest_price > 0
            and most_expensive_price > cheapest_price
        ):
            price_score = (
                (most_expensive_price - price)
                / (most_expensive_price - cheapest_price)
            ) * 100

        elif price > 0:
            price_score = 100

        else:
            price_score = 0

        # -----------------------------
        # Overall AtlasRank score
        # -----------------------------

        overall_score = round(
            rating_score * 0.50
            + review_score * 0.20
            + price_score * 0.30
        )

        # -----------------------------
        # Best Value score
        # More importance on price
        # and rating.
        # -----------------------------

        value_score = round(
            rating_score * 0.60
            + price_score * 0.40
        )

        # -----------------------------
        # AtlasRank product structure
        # -----------------------------

        product = {
            "id": item.get("product_id"),

            "identity": {
                "name": item.get("title", ""),
                "keywords": [],
            },

            "image": item.get("thumbnail", ""),

            "store": item.get("source", ""),

            "pricing": {
                "current": price,
                "original": item.get("extracted_old_price"),
            },

            "rating": {
                "value": rating,
                "reviews": reviews,
            },

            "score": overall_score,

            "value_score": value_score,

            "badge": None,
        }

        products.append(product)

    # --------------------------------------------------
    # Assign badges
    # --------------------------------------------------

    if products:

        # -----------------------------
        # 🏆 Best Overall
        # -----------------------------

        best_overall = max(
            products,
            key=lambda product: product["score"]
        )

        best_overall["badge"] = "Best Overall"

        # -----------------------------
        # 💰 Best Value
        # -----------------------------

        value_products = [
            product
            for product in products
            if product["pricing"]["current"] > 0
            and product["rating"]["value"] > 0
        ]

        if value_products:

            best_value = max(
                value_products,
                key=lambda product: product["value_score"]
            )

            # Don't overwrite Best Overall
            if best_value["id"] != best_overall["id"]:
                best_value["badge"] = "Best Value"

        # -----------------------------
        # ⭐ Highest Rated
        # -----------------------------

        rated_products = [
            product
            for product in products
            if product["rating"]["value"] > 0
        ]

        if rated_products:

            highest_rated = max(
                rated_products,
                key=lambda product: (
                    product["rating"]["value"],
                    product["rating"]["reviews"]
                )
            )

            # Don't overwrite an existing badge
            if highest_rated["badge"] is None:
                highest_rated["badge"] = "Highest Rated"

    return products