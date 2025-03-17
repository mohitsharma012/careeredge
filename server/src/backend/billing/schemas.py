from pydantic import BaseModel
from typing import Optional


class SuscriptionPlanCreateModel(BaseModel):
    name : str
    price : float
    interval : str


    model_config = {
        "json_schema_extra": {
            "example": {
                "name": "Basic Plan",
                "price": 10.99,
                "interval": "Month",
            }
        }
    }
class SubscriptionPlanUpdateModel(BaseModel):
    name: Optional[str] = None
    price: Optional[float] = None
    interval: Optional[str] = None

    class Config:
        json_schema_extra = {
            "example": {
                "name": "Basic Plan",
                "price": 10.99,
                "interval": "Month",
            }
        }

class SubscriptionPlanFeatureCreateModel(BaseModel):
    name : str

    model_config = {
        "json_schema_extra": {
            "example": {
                "name": "Product Listing",
            }
        }
    }

class FeatureResponseModel(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True

class SubscriptionPlanResponseModel(BaseModel):
    id: int
    name: str
    price: float
    interval: str
    features: list[FeatureResponseModel]

    class Config:
        from_attributes = True

