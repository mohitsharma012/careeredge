from pydantic import BaseModel, Field
from typing import Optional, Literal
from .constants import MONTHLY, YEARLY
from datetime import datetime




class SubscriptionPlanSerializer(BaseModel):
    name: str = None
    price: float = Field(..., gt=0)
    interval: Literal[MONTHLY, YEARLY] = None
    description: Optional[str] = None
    features: Optional[list[str]] = None
    trial_period_days: Optional[int] = Field(0, ge=0)

    class Config:
        schema_extra = {
            "example": {
                "name": "Basic Plan",
                "price": 9.99,
                "interval": MONTHLY,
                "description": "Basic subscription plan",
                "features": ["Feature 1", "Feature 2"],
                "trial_period_days": 14,
            }
        }
class SubscriptionPlanUpdateSerializer(SubscriptionPlanSerializer):
    id : int

class SubscriptionCreateSerializer(BaseModel):
    plan_id: int
    user_id: int
    start_date: Optional[str] = datetime.utcnow()

    class Config:
        schema_extra = {
            "example": {
                "plan_id": 1,
                "user_id": 1
            }
        }

