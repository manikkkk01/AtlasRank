from pymongo import UpdateOne

from app.database import products_collection
from app.data.products import products


def seed_products():
    operations = [
        UpdateOne(
            {"id": product["id"]},
            {"$set": product},
            upsert=True,
        )
        for product in products
    ]

    if operations:
        result = products_collection.bulk_write(operations)

        print(f"Products processed: {len(products)}")
        print(f"Inserted: {result.upserted_count}")
        print(f"Updated: {result.modified_count}")


if __name__ == "__main__":
    seed_products()