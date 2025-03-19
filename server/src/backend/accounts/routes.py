import os
import shopify
from typing import List
from datetime import timedelta
from fastapi import APIRouter, status, Depends, Request
from fastapi.responses import JSONResponse, RedirectResponse
from sqlalchemy.orm import Session
from fastapi.exceptions import HTTPException

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


from .serializer import UserRegisterSerializer, UserLoginSerializer, UserAccountVerifySerializer, UserEmailSerializer
from .services import get_current_user, hash_password, verify_password
from ..base.services import generate_otp
from .models import User, Otp
from datetime import datetime




account_router = APIRouter()

@account_router.post("/register")
async def register(request_data: UserRegisterSerializer, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request_data.email).first()
    if user and user.is_verified:
        raise response.BadRequest("User already exists")
    if user and not user.is_verified:
        otp = db.query(Otp).filter(Otp.user_id == user.id).first()
        db.delete(otp)
        db.flush()
        db.add(Otp(user_id=user.id, otp=generate_otp(length=6)))
        db.commit()
        return response.Ok("OTP sent to your email")
    user = User(name=request_data.name, email=request_data.email, password=hash_password(request_data.password))
    db.add(user)
    db.flush()
    db.add(Otp(user_id=user.id, otp=generate_otp(length=6)))
    db.commit()
    return response.Ok("OTP sent to your email")

@account_router.post("/login")
async def login(request_data: UserLoginSerializer, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request_data.email).first()
    if not user or not user.is_verified:
        raise response.BadRequest("Invalid credentials")
    if not verify_password(request_data.password, user.password):
        raise response.BadRequest("Invalid credentials")
    access_token = create_access_token({"email": user.email})
    refresh_token = create_refresh_token({"email": user.email})
    return response.Ok("Login successful", {"access_token": access_token, "refresh_token": refresh_token})
   


@account_router.post("/verify-account")
async def verify_account(
    request_data: UserAccountVerifySerializer, 
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.email == request_data.email).first()
    if not user:
        raise response.BadRequest("No user found")
    if user.is_verified:
        raise response.BadRequest("User already verified")
    otp = db.query(Otp).filter(Otp.user_id == user.id, Otp.otp == request_data.otp).first()
    if not otp:
        raise response.BadRequest("Invalid OTP")
    if otp.expires_at < datetime.utcnow():
        raise response.BadRequest("OTP expired")
    user.is_verified = True
    db.commit()
    return response.Ok("Account verified successfully")


@account_router.post("/resend-otp")
async def resend_otp(
    request_data: UserEmailSerializer, 
    db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request_data.email).first()
    if not user:
        raise response.BadRequest("No user found")
    otp = db.query(Otp).filter(Otp.user_id == user.id).first()
    if not otp:
        raise response.BadRequest("No OTP found")
    if otp.expires_at > datetime.utcnow():
        raise response.BadRequest("OTP not expired")
    otp.otp = generate_otp(length=6)
    otp.expires_at = datetime.utcnow() + timedelta(minutes=10)
    db.commit()
    return response.Ok("OTP sent to your email")


    


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
