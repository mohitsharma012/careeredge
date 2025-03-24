from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from ..config.db import Base
from ..base.models import TimeStampedModel

class User(TimeStampedModel):
    __tablename__ = "users"

    name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    is_verified = Column(Boolean, default=False)
    referral_code = Column(String, nullable=True)
    current_plan_id = Column(Integer, ForeignKey("subscription_plans.id"), nullable=True)  
    is_superuser = Column(Boolean, default=False)

    otp = relationship("Otp", back_populates="user")
    resumes = relationship("Resume", back_populates="user")


class Otp(TimeStampedModel):
    __tablename__ = "otp"

    user_id = Column(Integer, ForeignKey("users.id"))
    otp = Column(String, nullable=False)
    is_used = Column(Boolean, default=False)
    expires_at = Column(DateTime, default=lambda: datetime.utcnow() + timedelta(minutes=10))  
    user = relationship("User", back_populates="otp")
    referrals = relationship("Referral", back_populates="referrer", foreign_keys="Referral.referred_by_id")
    referred_by = relationship("Referral", back_populates="referred", foreign_keys="Referral.referred_id")
    plan = relationship("SubscriptionPlan", back_populates="users")
    subscriptions = relationship("Subscription", back_populates="user")
    verification_codes = relationship("VerificationCode", back_populates="user")

class Referral(TimeStampedModel):
    __tablename__ = "referral"

    referred_id = Column(Integer, ForeignKey("users.id"))  
    referred_by_id = Column(Integer, ForeignKey("users.id")) 

    referred = relationship("User", back_populates="referred_by", foreign_keys=[referred_id])
    referrer = relationship("User", back_populates="referrals", foreign_keys=[referred_by_id])

class VerificationCode(TimeStampedModel):
    __tablename__ = "verification_codes"

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    code = Column(String, nullable=False)
    is_used = Column(Boolean, default=False)
    expires_at = Column(DateTime, nullable=False)
    used_for = Column(String, nullable=True)

    user = relationship("User", back_populates="verification_codes")
