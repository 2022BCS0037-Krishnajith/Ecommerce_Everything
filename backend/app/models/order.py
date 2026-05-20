from sqlalchemy import Column, Integer, Float, ForeignKey
from app.database import Base

class Order(Base):

    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    total_price = Column(Float)