from pydantic import BaseModel, Field
from typing import Optional, Literal
from .constants import PLAN_TYPE_CHOICES, FREQUENCY_TYPE_CHOICES, INVENTORY_POLICY_RESERVE_CHOICES, DISCOUNT_TYPE_CHOICES, \
            FREQUENCY_INTERVAL_CHOICES, PLAN_STATUS_CHOICES, ACTIVE


add_frequency_expample = {
    "plan_type": "PAY_AS_YOU_GO",
    "name": "Monthly Subscription",
    "description": "<p>This is Description</p>",
    "frequency_interval": "MONTH",
    "frequency_count": 1,
    "billing_frequency_count": 1,
    "billing_frequency_interval": "MONTH",
    "specific_day_enabled": False,
    "frequency_type": "ON_PURCHASE_DAY",
    "specific_day_value": 1,
    "max_cycles": 12,
    "min_cycles": 1,
    "cut_off": 1,
    "discount_enabled": False,
    "discount_offer": 10.0,
    "discount_type": "PERCENTAGE",
    "after_cycle1": 1,
    "discount_enabled2": False,
    "discount_type2": "PERCENTAGE",
    "discount_offer2": 10.0,
    "after_cycle2": 1,
    "inventory_policy_reserve": "ON_SALE",
}

update_frequency_expample = add_frequency_expample.copy()
update_frequency_expample["id"] = 1


class FrequencyCreateSerializer(BaseModel):
    plan_type: Optional[Literal[PLAN_TYPE_CHOICES]] = None
    name: Optional[str] = None
    description: Optional[str] = None
    frequency_interval: Optional[Literal[FREQUENCY_INTERVAL_CHOICES]] = None
    frequency_order: Optional[int] = None
    billing_frequency_count: Optional[int] = None
    billing_frequency_interval: Optional[Literal[FREQUENCY_INTERVAL_CHOICES]] = None
    specific_day_enabled: Optional[bool] = None
    frequency_type: Optional[Literal[FREQUENCY_TYPE_CHOICES]] = None
    specific_day_value: Optional[int] = None
    max_cycles: Optional[int] = None
    min_cycles: Optional[int] = None
    cut_off: Optional[int] = None
    discount_enabled: Optional[bool] = None
    discount_offer: Optional[float] = None
    discount_type: Optional[Literal[DISCOUNT_TYPE_CHOICES]] = None
    after_cycle1: Optional[int] = None
    discount_enabled2: Optional[bool] = None
    discount_type2: Optional[Literal[DISCOUNT_TYPE_CHOICES]] = None
    discount_offer2: Optional[float] = None
    after_cycle2: Optional[int] = None
    inventory_policy_reserve: Optional[Literal[INVENTORY_POLICY_RESERVE_CHOICES]] = None


class ProductCreateSerializer(BaseModel):
    product_id: int
    variants: Optional[list[int]] = None


class SubscriptionPlanCreateSerializer(BaseModel):
    name: Optional[str] = None
    frequency: Optional[list[FrequencyCreateSerializer]] = None
    products: Optional[list[ProductCreateSerializer]] = None
    status : Optional[Literal[PLAN_STATUS_CHOICES]] = ACTIVE

    model_config = {
        "json_schema_extra": {
            "example": {
                "name": "Basic Plan",
                "frequency": [add_frequency_expample],
                "status": "ACTIVE",
                "products": [
                    {
                        "product_id": 8348665053334,
                        "variants": [44417633943702, 44417633976470]
                    }
                ]

            }

        }
    }


class FrequencyUpdateSerializer(FrequencyCreateSerializer):
    id : int


class ProductUpdateSerializer(BaseModel):
    product_ids: Optional[list[int]] = None
    variants_ids: Optional[list[int]] = None


class SubscriptionPlanUpdateSerializer(BaseModel):
    id: int
    name: Optional[str] = None
    delete_products: Optional[ProductUpdateSerializer] = None
    add_products: Optional[list[ProductCreateSerializer]] = None
    removed_frequency: Optional[list[int]] = None
    update_frequency: Optional[list[FrequencyUpdateSerializer]] = None
    add_frequency: Optional[list[FrequencyCreateSerializer]] = None
    status: Optional[Literal[PLAN_STATUS_CHOICES]] = None
    is_deleted: Optional[bool] = None

    model_config = {
        "json_schema_extra": {
            "example": {
                "id": 1,
                "name": "Basic Plan",
                "delete_products": {
                    "product_ids": [1, 2],
                    "variants_ids": [1, 2]
                },
                "add_products": [
                    {
                        "product_id": 8348665053334,
                        "variants": [44417633943702, 44417633976470]
                    }
                ],
                "removed_frequency": [1, 2],
                "update_frequency": [
                    update_frequency_expample
                ],
                "add_frequency": [
                   add_frequency_expample
                ]
            }
        }
    }


class SubscriptionCreateSerializer(BaseModel):
    shop_id: Optional[int] = None
    subscription_plan_id: Optional[int] = None
    frequency_id: Optional[int] = None
    product_id: Optional[int] = None
    customer_id: Optional[int] = None

    model_config = {
        "json_schema_extra": {
            "example": {
                "shop_id": 1,
                "subscription_plan_id": 1,
                "frequency_id": 1,
                "product_id": 32432432,
                "customer_id": 1
            }
        }
    }



