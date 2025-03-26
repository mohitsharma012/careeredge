import shopify
import hmac
import hashlib
import base64
from sqlalchemy.orm import Session
from sqlalchemy.orm import joinedload
from fastapi.responses import JSONResponse
from fastapi import APIRouter, status, Depends, HTTPException, Request, Header
from fastapi.security import OAuth2PasswordBearer
from datetime import datetime, timedelta


from ..config.db import get_db
from ..accounts.services import get_current_user
from ..accounts.models import User
from ..base import response
from .models import SubscriptionPlan, Subscription
from .serializer import SubscriptionPlanSerializer, SubscriptionPlanUpdateSerializer, SubscriptionCreateSerializer
from .filters import SubscriptionPlanFilter

subscription_plan_router = APIRouter()
subscription_router = APIRouter()


@subscription_plan_router.post("/")
async def create_subscription_plan(
    request_data: SubscriptionPlanSerializer,
    email: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Check if the user is an admin
    user = db.query(User).filter(User.email == email).first()
    if not user or not user.is_superuser:
        raise response.BadRequest("You are not authorized to create a subscription plan")
    plan = SubscriptionPlan(
        name=request_data.name,
        price=request_data.price,
        interval=request_data.interval,
        description=request_data.description,
        features=request_data.features,
        trial_period_days=request_data.trial_period_days
    )
    db.add(plan)
    db.commit()
    db.refresh(plan)
    return response.Ok("Subscription plan created successfully")

@subscription_plan_router.get("/")
async def get_subscription_plans(
    db: Session = Depends(get_db),
    filters: SubscriptionPlanFilter = Depends(),
):
    plans = db.query(SubscriptionPlan).filter(SubscriptionPlan.is_active == True).all()
    if filters.id:
        plans = [plan for plan in plans if plan.id == filters.id]
    return plans

@subscription_plan_router.put("/")
async def update_subscription_plan(
    request_data: SubscriptionPlanUpdateSerializer,
    email: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Check if the user is an admin
    user = db.query(User).filter(User.email == email).first()
    if not user or not user.is_superuser:
        raise response.BadRequest("You are not authorized to update a subscription plan")
    
    # Check if the plan exists
    plan = db.query(SubscriptionPlan).filter(SubscriptionPlan.id == request_data.id).first()
    if not plan:
        raise response.BadRequest("Subscription plan does not exist")
    
    # Update the plan
    plan.name = request_data.name
    plan.price = request_data.price
    plan.interval = request_data.interval
    plan.description = request_data.description
    plan.features = request_data.features
    plan.trial_period_days = request_data.trial_period_days
    db.commit()
    
    return response.Ok("Subscription plan updated successfully")


@subscription_router.post("/")
async def create_subscription(
    request_data: SubscriptionCreateSerializer,
    db: Session = Depends(get_db)
):
    # Check if the user exists
    user = db.query(User).filter(User.id == request_data.user_id).first()
    if not user:
        raise response.BadRequest("User does not exist")
    
    #check Plan id
    plan = db.query(SubscriptionPlan).filter(SubscriptionPlan.id == request_data.plan_id).first()
    if not plan:
        raise response.BadRequest("Subscription plan does not exist")
    
    # Check if the plan exists
    plan = db.query(SubscriptionPlan).filter(SubscriptionPlan.id == request_data.plan_id).first()
    if not plan:
        raise response.BadRequest("Subscription plan does not exist")
    
    end_date = request_data.start_date + timedelta(days=10)
    # Create the subscription
    subscription = Subscription(
        user_id=request_data.user_id,
        plan_id=request_data.plan_id,
        start_date=request_data.start_date,
        end_date=end_date
    )
    db.add(subscription)
    db.commit()   
    
    return response.Ok("Subscription created successfully")

@subscription_router.get("/")
async def get_subscriptions(
    db: Session = Depends(get_db),
    email: str = Depends(get_current_user)
):
    # Check if the user exists
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise response.BadRequest("User does not exist")
    if user.is_superuser:
        # If the user is an admin, get all subscriptions
        subscriptions = db.query(Subscription).options(joinedload(Subscription.plan)).all()
        return subscriptions
    
    # Get the subscriptions
    subscriptions = db.query(Subscription).filter(Subscription.user_id == user.id).options(joinedload(Subscription.plan)).all()
    
    return subscriptions

    
