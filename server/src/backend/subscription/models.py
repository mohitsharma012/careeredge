from datetime import datetime
from sqlalchemy import DateTime
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Boolean, Float, ForeignKey, BigInteger, ARRAY


from ..config.db import Base
from ..base.models import TimeStampedModel
from ..accounts.models import User


class SubscriptionPlan(TimeStampedModel):
    __tablename__ = "subscription_plans"

    name = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    interval = Column(String, nullable=False)    
    description = Column(String, nullable=True)
    features = Column(ARRAY(String), nullable=True) 
    trial_period_days = Column(Integer, nullable=True)
    is_active = Column(Boolean, default=True)

    subscriptions = relationship("Subscription", back_populates="plan")  # Corrected relationship
    users = relationship("User", back_populates="plan")

class Subscription(TimeStampedModel):
    __tablename__ = "subscriptions"

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    plan_id = Column(Integer, ForeignKey("subscription_plans.id"), nullable=False)
    start_date = Column(DateTime, default=datetime.utcnow)
    end_date = Column(DateTime, nullable=True)

    user = relationship("User", back_populates="subscriptions")  # Corrected relationship
    plan = relationship("SubscriptionPlan", back_populates="subscriptions")  # Corrected relationship
    trial_period_extensions = relationship("TrialPeriodExtension", back_populates="subscription")  # Corrected relationship

class TrialPeriodExtension(TimeStampedModel):
    __tablename__ = "trial_extensions"

    subscription_id = Column(Integer, ForeignKey("subscriptions.id"), nullable=False)
    extended_days = Column(Integer, nullable=False)
    reason = Column(String, nullable=True)

    subscription = relationship("Subscription", back_populates="trial_period_extensions")  # Corrected relationship


