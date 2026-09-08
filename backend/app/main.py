import os

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

from app.api.products import router as products_router
from app.services.search_service import search_products


app = FastAPI(
    title="AtlasRank API",
    description="Product intelligence and comparison API",
    version="1.0.0",
)


# --------------------------------------------------
# CORS
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        os.getenv("FRONTEND_URL", ""),
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# Routers
# --------------------------------------------------

app.include_router(products_router)


# --------------------------------------------------
# Root
# --------------------------------------------------

@app.get("/")
def root():
    return {
        "message": "AtlasRank API is running"
    }


# --------------------------------------------------
# Health Check
# --------------------------------------------------

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy"
    }


# --------------------------------------------------
# Product Search
# --------------------------------------------------

@app.get("/api/search")
def search(
    q: str = Query(
        ...,
        min_length=1,
        description="Product search query",
    )
):
    results = search_products(q)

    return {
        "query": q,
        "count": len(results),
        "products": results,
    }