from fastapi import APIRouter
# from .billing.routes import plan_router
from .subscription.routes import subscription_plan_router, subscription_router
from .shop.routes import shop_router, product_router, token_router


app_router = APIRouter()

app_router.include_router(token_router, prefix="/token", tags=["Token"])
# app_router.include_router(shop_router, prefix="/shop", tags=["shop"])
# app_router.include_router(product_router, prefix="/product", tags=["Product"])
# # app_router.include_router(plan_router, prefix="/plan", tags=["Plan"])
# app_router.include_router(subscription_plan_router, prefix="/subscription-plan", tags=["Subscription Plan"])
# app_router.include_router(subscription_router, prefix="/subscription", tags=["Subscription"])












