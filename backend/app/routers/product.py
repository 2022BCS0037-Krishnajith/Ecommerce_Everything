from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.products import Product
from app.schemas.product import (
    ProductCreate,
    ProductResponse
)
from app.auth.admin import admin_only
from app.models.cart import Cart
from app.models.order_item import OrderItem

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)

@router.post("/")
def create_product(
    request: ProductCreate,
    db: Session = Depends(get_db),
    admin=Depends(admin_only)
):

    new_product = Product(
        name=request.name,
        description=request.description,
        price=request.price,
        stock=request.stock,
        category=request.category,
        image_url=request.image_url
    )

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return new_product

@router.get("/", response_model=list[ProductResponse])
def get_products(
    db: Session = Depends(get_db)
):

    return db.query(Product).all()

@router.get("/{product_id}",
response_model=ProductResponse)
def get_product(
    product_id: int,
    db: Session = Depends(get_db)
):

    product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return product

@router.delete("/{product_id}")
def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    admin=Depends(admin_only)
):

    product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    order_items = db.query(OrderItem).filter(
        OrderItem.product_id == product_id
    ).all()

    for item in order_items:
        db.delete(item)

    cart_items = db.query(Cart).filter(
        Cart.product_id == product_id
    ).all()

    for item in cart_items:
        db.delete(item)

    db.delete(product)

    db.commit()

    return {
        "message": "Product deleted"
    }

@router.put("/{product_id}")
def update_product(
    product_id: int,
    request: ProductCreate,
    db: Session = Depends(get_db),
    admin=Depends(admin_only)
):

    product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    product.name = request.name
    product.description = request.description
    product.price = request.price
    product.stock = request.stock
    product.category = request.category
    product.image_url = request.image_url

    db.commit()

    return {
        "message": "Product updated"
    }