from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from datetime import datetime, timedelta
from sqlalchemy.orm import relationship
from ..config.db import Base
from ..base.models import TimeStampedModel


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True, index=True)
    password = Column(String, nullable=False)
    is_verified = Column(Boolean, default=False)
    is_google_user = Column(Boolean, default=False)
    referral_code = Column(String, nullable=True)
    current_plan_id = Column(Integer, ForeignKey("subscription_plans.id"), nullable=True)
    is_superuser = Column(Boolean, default=False)

    resumes = relationship("Resume", back_populates="user")
    referrals = relationship("Referral", foreign_keys="[Referral.referred_by_id]", back_populates="referrer")
    referred_by = relationship("Referral", foreign_keys="[Referral.referred_id]", back_populates="referred")
    verification_codes = relationship("VerificationCode", back_populates="user")
    current_plan = relationship("SubscriptionPlan", back_populates="users")
    subscriptions = relationship("Subscription", back_populates="user")




class Referral(Base):
    __tablename__ = "referrals"

    id = Column(Integer, primary_key=True, index=True)
    referred_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    referred_by_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    referred = relationship("User", foreign_keys=[referred_id], back_populates="referred_by")
    referrer = relationship("User", foreign_keys=[referred_by_id], back_populates="referrals")


class VerificationCode(Base):
    __tablename__ = "verification_codes"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    code = Column(String, nullable=False, unique=True)  # Ensure uniqueness
    is_used = Column(Boolean, default=False)
    expires_at = Column(DateTime, nullable=False)
    used_for = Column(String, nullable=True)

    user = relationship("User", back_populates="verification_codes")


