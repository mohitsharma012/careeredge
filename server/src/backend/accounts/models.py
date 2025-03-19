from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime, timedelta
from ..config.db import Base
from ..base.models import TimeStampedModel

class User(TimeStampedModel):
    __tablename__ = "users"

    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    password = Column(String, nullable=False)
    is_verified = Column(Boolean, default=False)

    otp = relationship("Otp", back_populates="user")
    resumes = relationship("Resume", back_populates="user")


class Otp(TimeStampedModel):
    __tablename__ = "otp"

    user_id = Column(Integer, ForeignKey("users.id"))
    otp = Column(String, nullable=False)
    is_used = Column(Boolean, default=False)
    expires_at = Column(DateTime, default=lambda: datetime.utcnow() + timedelta(minutes=10))  
    user = relationship("User", back_populates="otp")
