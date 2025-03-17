from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from ..config.db import Base
from ..base.models import TimeStampedModel

class Shop(TimeStampedModel):
    __tablename__ = "shops"

    shop_url = Column(String, unique=True, nullable=False)
    email = Column(String, nullable=True)

    subscription_plans = relationship("SubscriptionPlan", back_populates="shop")
    subscription = relationship("Subscription", back_populates="shop")
    
    class Config:
        from_attributes = True


