from fastapi import APIRouter, HTTPException

from app.services.product_service import (
    get_all_products,
    get_product_by_id,
    get_product_store_url,
)

router = APIRouter(
    prefix="/api/products",
    tags=["Products"],
)


@router.get("")
def get_products():
    return get_all_products()


@router.get("/{product_id}/store-url")
def get_product_store_url_route(product_id: str):
    store_url = get_product_store_url(product_id)

    if store_url is None:
        raise HTTPException(
            status_code=404,
            detail="Store URL not found",
        )

    return {
        "url": store_url,
    }


@router.get("/{product_id}")
def get_product(product_id: str):
    product = get_product_by_id(product_id)

    if product is None:
        raise HTTPException(
            status_code=404,
            detail="Product not found",
        )

    return product