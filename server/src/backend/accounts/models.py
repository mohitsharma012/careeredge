from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
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


class Referral(TimeStampedModel):
    __tablename__ = "referral"

    referred_id = Column(Integer, ForeignKey("users.id"))  
    referred_by_id = Column(Integer, ForeignKey("users.id")) 

    referred = relationship("User", back_populates="referred_by", foreign_keys=[referred_id])
    referrer = relationship("User", back_populates="referrals", foreign_keys=[referred_by_id])
