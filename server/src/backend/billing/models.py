
from ..config.db import Base
from ..shop.models import Store
from ..base.models import TimeStampedModel



from sqlalchemy import Column, Integer, String, Boolean, Float, ForeignKey, DateTime, Table
from sqlalchemy.orm import relationship, backref
from datetime import datetime


# Association table for many-to-many relationship between SubscriptionPlan and Feature
plan_feature_association = Table(
    "plan_feature_association",
    Base.metadata,
    Column("plan_id", Integer, ForeignKey("subscription_plans.id"), primary_key=True),
    Column("feature_id", Integer, ForeignKey("features.id"), primary_key=True)
)

class SubscriptionPlan(TimeStampedModel):
    __tablename__ = "subscription_plans"

    name = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    interval = Column(String, nullable=False) 
    is_active = Column(Boolean, default=True)
    
    subscriptions = relationship("Subscription", back_populates="plan")
    features = relationship("Feature", secondary=plan_feature_association, back_populates="plans")
    
    class Config:
        from_attributes = True


class Feature(TimeStampedModel):
    __tablename__ = "features"

    name = Column(String, nullable=False)
    
    plans = relationship("SubscriptionPlan", secondary=plan_feature_association, back_populates="features")
    
    class Config:
        from_attributes = True


class Subscription(TimeStampedModel):
    __tablename__ = "subscriptions"

    user_id = Column(Integer, ForeignKey("users.id"))
    plan_id = Column(Integer, ForeignKey("subscription_plans.id"))
    active = Column(Boolean, default=True)
    
    
    user = relationship("User", back_populates="subscriptions")
    plan = relationship("SubscriptionPlan", back_populates="subscriptions")
    
    class Config:
        from_attributes = True
    

