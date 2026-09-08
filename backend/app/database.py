import os

from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL")

if not MONGODB_URL:
    raise ValueError("MONGODB_URL is not set in .env")

client = MongoClient(MONGODB_URL)

db = client["AtlasRank"]

products_collection = db["products"]


def test_database_connection():
    try:
        client.admin.command("ping")
        print("MongoDB connected successfully!")
        return True
    except Exception as e:
        print("MongoDB connection failed:", e)
        return False