import os
from typing import List
from datetime import timedelta
from fastapi import APIRouter, status, Depends, Request
from fastapi.responses import JSONResponse, RedirectResponse
from sqlalchemy.orm import Session
from fastapi.exceptions import HTTPException
from pydantic import BaseModel

from .models import User
from ..config.db import get_db
from ..base.auth import  create_access_token, create_refresh_token, verify_token
from ..base import response



from .serializer import CurrentPlanSerializer, UserRegisterSerializer, UserLoginSerializer, UserAccountVerifySerializer, UserEmailSerializer, UserRestPasswordSerializer
from .services import get_current_user, hash_password, referral_code_generator, verify_password, generate_verification_link, generate_forgot_password_link
from ..base.services import generate_otp, generate_random_string
from .models import User, Referral, VerificationCode

from datetime import datetime
import openai 

openai_api_key = "test-key"
from ..subscription.models import SubscriptionPlan, Subscription, TrialPeriodExtension
from .constants import EMAIL_VERIFICATION, FORGOT_PASSWORD




account_router = APIRouter()
token_router = APIRouter()

@account_router.post("/register")
async def register(request_data: UserRegisterSerializer, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request_data.email).first()
    if user:
        raise response.BadRequest("User already exists")
    referral_code = referral_code_generator(request_data.name)
    while db.query(User).filter(User.referral_code == referral_code).first():
        referral_code = referral_code_generator(request_data.name)
    user = User(name=request_data.name, email=request_data.email, password=hash_password(request_data.password), referral_code=referral_code)
    db.add(user)
    db.flush()
    if request_data.referral_code:
        referred_by = db.query(User).filter(User.referral_code == request_data.referral_code).first()
        db.add(Referral(user_id=user.id, referred_by=referred_by.id))
    access_token = create_access_token({"email": user.email})
    refresh_token = create_refresh_token({"email": user.email})
    verification_code = VerificationCode(user_id=user.id, code=generate_random_string(10), expires_at=datetime.utcnow() + timedelta(minutes=30), used_for=EMAIL_VERIFICATION)
    db.add(verification_code)
    db.commit()
    link = generate_verification_link(verification_code.code, user.email)
    # Send verification email
    # send_verification_email(user.email, verification_code.code)

    
    return response.Ok("Verification email sent", {"access_token": access_token, "refresh_token": refresh_token})

@account_router.post("/login")
async def login(request_data: UserLoginSerializer, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request_data.email).first()
    if not user:
        raise response.BadRequest("Invalid credentials")
    if not verify_password(request_data.password, user.password):
        raise response.BadRequest("Invalid credentials")
    access_token = create_access_token({"email": user.email})
    refresh_token = create_refresh_token({"email": user.email})
    return response.Ok("Login successful", {"access_token": access_token, "refresh_token": refresh_token})

class refresh_token(BaseModel):
    refresh: str

@token_router.post("/refresh")
async def refresh(refresh_token: refresh_token):
    email = verify_token(refresh_token, response.BadRequest("Invalid refresh token"))

    if not email:
        raise response.BadRequest("Invalid refresh token")
    new_access_token = create_access_token({"email": email})
    new_refresh_token = create_refresh_token({"email": email})

    return response.Ok("Token refreshed", {"access_token": new_access_token, "refresh_token": new_refresh_token})


@account_router.get("/user-clone")
async def user_clone(
    db: Session = Depends(get_db),
    email: str = Depends(get_current_user)
):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise response.BadRequest("Invalid credentials")
    current_plan = db.query(Subscription).filter(Subscription.user_id == user.id).join(SubscriptionPlan).order_by(Subscription.start_date.desc()).first()
    serialized_plan = None
    if current_plan:
        serialized_plan = {
            "id": current_plan.plan.id if current_plan.plan else None,
            "name": current_plan.plan.name if current_plan.plan else None,
            "price": current_plan.plan.price if current_plan.plan else None,
            "interval": current_plan.plan.interval if current_plan.plan else None,
            "start_date": current_plan.start_date.isoformat() if current_plan.start_date else None,
            "end_date": current_plan.end_date.isoformat() if current_plan.end_date else None,
            "is_expired": True if current_plan.end_date and current_plan.end_date < datetime.utcnow() else False,
        }            
    return response.Ok("User found", {"id": user.id, "email": user.email, "name": user.name, "current_plan": serialized_plan, "is_verified": user.is_verified})


class refresh_token(BaseModel):
    refresh: str

@token_router.post("/refresh")
async def refresh(refresh_token: refresh_token):
    email = verify_token(refresh_token, response.BadRequest("Invalid refresh token"))

    if not email:
        raise response.BadRequest("Invalid refresh token")
    new_access_token = create_access_token({"email": email})
    new_refresh_token = create_refresh_token({"email": email})

    return response.Ok("Token refreshed", {"access_token": new_access_token, "refresh_token": new_refresh_token})


@account_router.post("/verify-account")
async def verify_account(
    request_data: UserAccountVerifySerializer, 
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.email == request_data.email).first()
    if not user:
        raise response.BadRequest("Invalid credentials")
    if user.is_verified:
        return response.Ok("Account already verified")
    verification_code = db.query(VerificationCode).filter(VerificationCode.code == request_data.code, VerificationCode.user_id == user.id, VerificationCode.used_for == EMAIL_VERIFICATION).first()
    if not verification_code or verification_code.expires_at < datetime.utcnow():
        raise response.BadRequest("Invalid or expired verification code")
    user.is_verified = True
    db.commit()
    return response.Ok("Account verified successfully")
    

@account_router.post("/forgot-password")
async def forgot_password(
    request_data: UserEmailSerializer, 
    db: Session = Depends(get_db)
):
    print(request_data.email)
    user = db.query(User).filter(User.email == request_data.email).first()
    if not user:
        raise response.BadRequest("User not found")
    
    # Generate a verification code
    code = generate_random_string(10)
    verification_code = VerificationCode(
        user_id=user.id,
        code=code,
        expires_at=datetime.utcnow() + timedelta(minutes=30),
        used_for=FORGOT_PASSWORD
    )
    db.add(verification_code)
    db.commit()
    link = generate_forgot_password_link(user.email, code)
    # Send forgot password email
    # send_forgot_password_email(user.email, forgot_password_link)
    return response.Ok("Forgot password email sent")


@account_router.post("/reset-password")
async def reset_password(
    request_data: UserRestPasswordSerializer, 
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.email == request_data.email).first()
    if not user:
        raise response.BadRequest("User not found")
    
    verification_code = db.query(VerificationCode).filter(VerificationCode.code == request_data.code, VerificationCode.user_id == user.id, VerificationCode.used_for == FORGOT_PASSWORD).first()
    if not verification_code or verification_code.expires_at < datetime.utcnow():
        raise response.BadRequest("Invalid or expired verification code")
    
    user.password = hash_password(request_data.password)
    db.commit()
    return response.Ok("Password reset successfully")




