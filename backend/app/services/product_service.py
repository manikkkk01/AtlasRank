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