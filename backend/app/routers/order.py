from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.models.cart import Cart
from app.models.products import Product
from app.models.order import Order
from app.models.order_item import OrderItem

from app.auth.oauth2 import get_current_user
from app.models.user import User

router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)

@router.post("/checkout")
def checkout(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    cart_items = db.query(Cart).filter(
        Cart.user_id == current_user.id
    ).all()

    if not cart_items:
        raise HTTPException(
            status_code=400,
            detail="Cart is empty"
        )

    total_price = 0

    for item in cart_items:

        product = db.query(Product).filter(
            Product.id == item.product_id
        ).first()

        if product.stock < item.quantity:
            raise HTTPException(
                status_code=400,
                detail=f"Not enough stock for {product.name}"
            )

        total_price += (
            product.price * item.quantity
        )

    new_order = Order(
        user_id=current_user.id,
        total_price=total_price
    )

    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    for item in cart_items:

        product = db.query(Product).filter(
            Product.id == item.product_id
        ).first()

        order_item = OrderItem(
            order_id=new_order.id,
            product_id=product.id,
            quantity=item.quantity,
            price=product.price
        )

        product.stock -= item.quantity

        db.add(order_item)

    db.commit()

    for item in cart_items:
        db.delete(item)

    db.commit()

    return {
        "message": "Order placed successfully",
        "order_id": new_order.id,
        "total_price": total_price
    }

@router.get("/")
def get_orders(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    orders = db.query(Order).filter(
        Order.user_id == current_user.id
    ).all()

    return orders