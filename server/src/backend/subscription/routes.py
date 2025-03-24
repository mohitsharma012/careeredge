import shopify
import hmac
import hashlib
import base64
from sqlalchemy.orm import Session
from sqlalchemy.orm import joinedload
from fastapi.responses import JSONResponse
from fastapi import APIRouter, status, Depends, HTTPException, Request, Header


from ..config.db import get_db
from ..accounts.services import get_current_user
from ..accounts.models import User
from ..base import response
from .models import SubscriptionPlan, Subscription
from .serializer import SubscriptionPlanSerializer, SubscriptionPlanUpdateSerializer
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
    return response.Ok(plans)




    
