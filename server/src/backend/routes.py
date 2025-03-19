from fastapi import APIRouter
# from .billing.routes import plan_router
# from .subscription.routes import subscription_plan_router, subscription_router
from .accounts.routes import account_router
from .resume.routes import resume_router
# from .accounts.google_auth import google_router


app_router = APIRouter()
app_router.include_router(account_router, prefix="/user", tags=["user"])
app_router.include_router(resume_router, prefix="/resume", tags=["resume"])
# app_router.include_router(google_router, prefix="/google", tags=["Google Auth"])


# app_router.include_router(token_router, prefix="/token", tags=["Token"])
# app_router.include_router(shop_router, prefix="/shop", tags=["shop"])
# app_router.include_router(product_router, prefix="/product", tags=["Product"])
# # app_router.include_router(plan_router, prefix="/plan", tags=["Plan"])
# app_router.include_router(subscription_plan_router, prefix="/subscription-plan", tags=["Subscription Plan"])
# app_router.include_router(subscription_router, prefix="/subscription", tags=["Subscription"])












