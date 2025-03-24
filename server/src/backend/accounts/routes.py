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

# @token_router.get("/refresh-token", status_code=status.HTTP_200_OK)
# async def refresh_token(refresh_token: str):
#     payload = verify_token(refresh_token, HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token"))
#     if not payload:
#         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")
#     new_access_token = create_access_token({"shop_url": payload.shop_url, "shopifyToken": payload.shopifyToken})
#     return {"access_token": new_access_token, "token_type": "bearer"}

# @shop_router.get("/token", status_code=status.HTTP_200_OK)
# async def get_token(shop_url: str, shopify_token: str):
#     # Register webhook
#     # try:
#     #     register_webhook(shop_url, shopify_token)
#     # except Exception as e:
#     #     return JSONResponse(content={"error": str(e)}, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
#     try:
#         print("mohit")        
#         token = create_access_token(data={"shop_url": shop_url, "shopifyToken": shopify_token})
#         return JSONResponse(content={"shop": shop_url, "token": token}, status_code=status.HTTP_200_OK)
#     except Exception as e:
#         return JSONResponse(content={"error": str(e)}, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)


from .serializer import UserRegisterSerializer, UserLoginSerializer, UserAccountVerifySerializer, UserEmailSerializer, UserRestPasswordSerializer
from .services import get_current_user, hash_password, referral_code_generator, verify_password, generate_verification_link, generate_forgot_password_link
from ..base.services import generate_otp, generate_random_string
from .models import User, Referral, VerificationCode
from datetime import datetime
import openai 

openai_api_key = "test-key"
from ..subscription.models import SubscriptionPlan
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
    current_plan = db.query(SubscriptionPlan).filter(SubscriptionPlan.id == user.current_plan_id).first() if user.current_plan_id else None
    return response.Ok("User found", {"email": user.email, "name": user.name, "current_plan": current_plan, "is_verified": user.is_verified})


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






    


# @account_router.post("/verify-account")
# async def verify_account(
#     request_data: UserAccountVerifySerializer, 
#     db: Session = Depends(get_db),
#     email: Session = Depends(get_current_user)
# ):
#     try:
#         user = db.query(User).filter(User.email == email, is_verified = False).first()
#         if not user:
#             return response.BadRequest("Invalid Token")
#         user.is_verified = True
#         db.commit()
#         return response.Ok("Account verified successfully")
#     except Exception as e:
#         return response.BadRequest("Internal server error")
