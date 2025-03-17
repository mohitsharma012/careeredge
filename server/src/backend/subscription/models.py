from datetime import datetime
from sqlalchemy import DateTime
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Boolean, Float, ForeignKey, BigInteger

from ..config.db import Base
from ..shop.models import Shop
from ..base.models import TimeStampedModel


class SubscriptionFrequency(TimeStampedModel):
    __tablename__ = "subscription_frequencies"

    subscription_plans_id = Column(Integer, ForeignKey("subscription_plans.id"), nullable=True)
    plan_type = Column(String, nullable=True) 
    name = Column(String, nullable=True)  
    description = Column(String, nullable=True)   # 
    frequency_interval = Column(String, nullable=True) 
    frequency_order = Column(Integer, nullable=True)
    billing_frequency_count = Column(Integer, nullable=True)
    billing_frequency_interval = Column(String, nullable=True)
    specific_day_enabled = Column(Boolean, default=False)
    frequency_type = Column(String, nullable=True) 
    specific_day_value = Column(Integer, nullable=True)
    max_cycles = Column(Integer, nullable=True)
    min_cycles = Column(Integer, nullable=True)
    cut_off = Column(Integer, nullable=True)  
    discount_enabled = Column(Boolean, default=False)
    discount_offer = Column(Float, nullable=True)
    discount_type = Column(String, nullable=True)   
    after_cycle1 = Column(Integer, default=0)
    discount_enabled2 = Column(Boolean, default=False)
    discount_type2 = Column(String, nullable=True)
    discount_offer2 = Column(Float, nullable=True)
    after_cycle2 = Column(Integer, default=0)
    inventory_policy_reserve = Column(String, nullable=True)


    # specific_month_value = Column(Integer, nullable=True)
    # prepaid_flag = Column(Boolean, default=False)
    # frequency_sequence = Column(Integer, nullable=True)
    # repeating_cycle = Column(Boolean, default=False)
    # repeating_number_of_cycles = Column(Integer, nullable=True)
    

    subscription_plans = relationship("SubscriptionPlan", back_populates="frequency")
    subscription = relationship("Subscription", back_populates="frequency")
    
    class Config:
        from_attributes = True


class SubscriptionPlan(TimeStampedModel):
    __tablename__ = "subscription_plans"

    shop_id = Column(Integer, ForeignKey("shops.id"), nullable=True)
    name = Column(String, nullable=True)
    status = Column(String, nullable=True)

    # price = Column(Float, nullable=True)
    # free_trial_enabled = Column(Boolean, default=False)
    # free_trial_count = Column(Integer, nullable=True)
    # free_trial_interval = Column(String, nullable=True)  # DAY, WEEK, MONTH
    # delivery_policy_pre_anchor_behavior = Column(String, nullable=True)  # ASAP, SPECIFIC_DATE

    shop = relationship("Shop", back_populates="subscription_plans")
    frequency = relationship("SubscriptionFrequency", back_populates="subscription_plans")
    products = relationship("SubscriptionPlanProduct", back_populates="subscription_plans")
    subscription = relationship("Subscription", back_populates="subscription_plans")
    
    class Config:
        from_attributes = True
    

class SubscriptionPlanProduct(TimeStampedModel):
    __tablename__ = "subscription_plan_products"

    subscription_plan_id = Column(Integer, ForeignKey("subscription_plans.id"), nullable=True)
    product_id = Column(BigInteger, nullable=False)  

    subscription_plans = relationship("SubscriptionPlan", back_populates="products")
    variants = relationship("SubscriptionPlanProductVariant", back_populates="subscription_plan_products")
    
    class Config:
        from_attributes = True


class SubscriptionPlanProductVariant(TimeStampedModel):
    __tablename__ = "subscription_plan_product_variants"

    subscription_plan_product_id = Column(Integer, ForeignKey("subscription_plan_products.id"), nullable=True)
    variant_id = Column(BigInteger, nullable=False)  

    subscription_plan_products = relationship("SubscriptionPlanProduct", back_populates="variants")
 
    class Config:
        from_attributes = True


class Subscription(TimeStampedModel):
    __tablename__ = "subscriptions"

    shop_id = Column(Integer, ForeignKey("shops.id"), nullable=True)
    subscription_plan_id = Column(Integer, ForeignKey("subscription_plans.id"), nullable=True)
    frequency_id = Column(Integer, ForeignKey("subscription_frequencies.id"), nullable=True)
    product_id = Column(BigInteger, nullable=False)
    customer_id = Column(Integer, nullable=True)
    status = Column(String, nullable=True)

    shop = relationship("Shop", back_populates="subscription")
    subscription_plans = relationship("SubscriptionPlan", back_populates="subscription")
    frequency = relationship("SubscriptionFrequency", back_populates="subscription")

    class Config:
        from_attributes = True
