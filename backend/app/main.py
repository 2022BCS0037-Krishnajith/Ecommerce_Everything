from fastapi import FastAPI

from app.database import engine, Base
from app.models import user
from app.routers import auth
from app.auth.oauth2 import get_current_user
from app.models.user import User
from fastapi import Depends
from app.routers import product
from app.routers import cart
from app.routers import order
from fastapi.middleware.cors import CORSMiddleware
from app.database import SessionLocal
from app.models.user import User
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)
app.include_router(product.router)
app.include_router(auth.router)
app.include_router(cart.router)
app.include_router(order.router)
@app.get("/make-admin")
def make_admin(email: str):

    db = SessionLocal()

    user = db.query(User).filter(
        User.email == email
    ).first()

    if not user:

        return {
            "message": "User not found"
        }

    user.is_admin = True

    db.commit()

    return {
        "message": "Admin updated"
    }
    
@app.get("/")
def home():
    return {"message": "E-commerce Backend Running"}

@app.get("/profile")
def profile(
    current_user: User = Depends(
        get_current_user
    )
):

    return {

        "id": current_user.id,

        "username":
            current_user.username,

        "email":
            current_user.email,

        "is_admin":
            current_user.is_admin
    }