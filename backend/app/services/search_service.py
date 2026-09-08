from app.services.shopping_service import search_shopping_products


# Temporary in-memory product cache
product_cache = {}


def search_products(query: str):
    normalized_query = query.strip()

    if not normalized_query:
        return []

    products = search_shopping_products(normalized_query)

    # Store products so Product Details can find them
    for product in products:
        product_id = product.get("id")

        if product_id:
            product_cache[str(product_id)] = product

    return products