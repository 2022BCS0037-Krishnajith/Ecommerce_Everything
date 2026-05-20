from pydantic import BaseModel
from typing import Optional

class ProductCreate(BaseModel):

    name: str
    description: str
    price: float
    stock: int
    category: str
    image_url: Optional[str] = None

class ProductResponse(ProductCreate):

    id: int

    class Config:
        from_attributes = True