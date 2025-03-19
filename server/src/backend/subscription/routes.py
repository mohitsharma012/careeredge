import shopify
import hmac
import hashlib
import base64
from sqlalchemy.orm import Session
from sqlalchemy.orm import joinedload
from fastapi.responses import JSONResponse
from fastapi import APIRouter, status, Depends, HTTPException, Request, Header


from ..config.db import get_db
from ..config.config import Config
from ..accounts.models import Shop
from .filters import SubscriptionFilter
from .serializer import SubscriptionPlanCreateSerializer, SubscriptionPlanUpdateSerializer
from .models import SubscriptionPlan, SubscriptionFrequency, SubscriptionPlanProduct, SubscriptionPlanProductVariant, Subscription
from .services import add_products_and_variants_to_plan, delete_products_and_variants_from_plan
from ..accounts.services import get_shopify_session, get_current_shop_url
from ..accounts.services import get_product_collections
from ..accounts.services import get_shopify_shop_products, validate_product_and_variants
from ..config.logger import logger  # Import the logger

subscription_plan_router = APIRouter()
subscription_router = APIRouter()

@subscription_plan_router.post("/", status_code=status.HTTP_201_CREATED, response_model=SubscriptionPlanCreateSerializer)
async def create_subscription_plan(
    request_data: SubscriptionPlanCreateSerializer, 
    db: Session = Depends(get_db),
    session: shopify.Session = Depends(get_shopify_session)
):    
    shopify.ShopifyResource.activate_session(session)
    shop_url = shopify.Shop.current().myshopify_domain  
    shop = db.query(Shop).filter(Shop.shop_url == shop_url).first()
    if not shop:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Shop not found")
    products_list = get_shopify_shop_products(session)
    shopify.ShopifyResource.clear_session()

    ## Validate products & variants
    products_ids = [product.product_id for product in request_data.products] if request_data.products else []
    variants_ids = [
        variant
        for product in (request_data.products or [])
        if product.variants  # Ensure product.variants is not None
        for variant in product.variants
    ]
    validate_product_and_variants(products_ids, variants_ids, products_list)

    try:
        db_plan = SubscriptionPlan(shop_id=shop.id, name=request_data.name)
        db.add(db_plan) 
        db.flush() 
        # Bulk insert Subscription Frequencies
        if request_data.frequency:
            db_frequencies = [
                SubscriptionFrequency(subscription_plans_id=db_plan.id, **frequency.model_dump())
                for frequency in request_data.frequency
            ]
            db.add_all(db_frequencies)

        # Bulk insert Subscription Products, variants
        if request_data.products:
            add_products_and_variants_to_plan(db_plan.id, request_data.products, db)
        db.commit()  
        return JSONResponse(content={"message": "Subscription plan created successfully"}, status_code=status.HTTP_201_CREATED)
    
    except Exception as e:
        db.rollback()
        return JSONResponse(content={"error": "An error occurred while creating the subscription plan.", "details": str(e)}, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
@subscription_plan_router.get("/", status_code=status.HTTP_200_OK)
async def get_subscription_plans(
    shop_url: str = Depends(get_current_shop_url),
    db: Session = Depends(get_db),
    filter: SubscriptionFilter = Depends(),
):
    try:

        shop = db.query(Shop).filter(Shop.shop_url == shop_url).first()
        if not shop:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Shop not found")
        if filter.frequency and filter.products:
            plans = db.query(SubscriptionPlan).filter(SubscriptionPlan.shop_id == shop.id, SubscriptionPlan.is_deleted == False).options(joinedload(SubscriptionPlan.frequency), joinedload(SubscriptionPlan.products).joinedload(SubscriptionPlanProduct.variants)).all()
        elif filter.frequency:
            plans = db.query(SubscriptionPlan).filter(SubscriptionPlan.shop_id == shop.id, SubscriptionPlan.is_deleted == False).options(joinedload(SubscriptionPlan.frequency)).all()
        elif filter.products:
            plans = db.query(SubscriptionPlan).filter(SubscriptionPlan.shop_id == shop.id, SubscriptionPlan.is_deleted == False).options(joinedload(SubscriptionPlan.products).joinedload(SubscriptionPlanProduct.variants)).all()
        else:
            plans = db.query(SubscriptionPlan).filter(SubscriptionPlan.shop_id == shop.id, SubscriptionPlan.is_deleted == False).all()

        for plan in plans:
            product_count = db.query(SubscriptionPlanProduct).filter(SubscriptionPlanProduct.subscription_plan_id == plan.id).count()
            frequency_count = db.query(SubscriptionFrequency).filter(SubscriptionFrequency.subscription_plans_id == plan.id).count()
            plan.product_count = product_count
            plan.frequency_count = frequency_count
        
        if filter.id:
            plans = [plan for plan in plans if plan.id == filter.id]
        
        return {"plans": plans}
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

@subscription_plan_router.put("/", status_code=status.HTTP_200_OK)
async def update_subscription_plan(
    request_data: SubscriptionPlanUpdateSerializer,
    db: Session = Depends(get_db),
    session: shopify.Session = Depends(get_shopify_session)
):    
    db_plan = db.query(SubscriptionPlan).filter(SubscriptionPlan.id == request_data.id).first()
    if not db_plan:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Subscription plan not found")
    
    try:
        shopify.ShopifyResource.activate_session(session)
        products = get_shopify_shop_products(session)

        if request_data.is_deleted:
            db_plan.is_deleted = request_data.is_deleted

        if request_data.name:
            db_plan.name = request_data.name

        ## Validate add products & variants
        if request_data.add_products:
            products_ids = [product.product_id for product in request_data.add_products]
            variants_ids = [variant for product in request_data.add_products for variant in product.variants]
            validate_product_and_variants(products_ids, variants_ids, products)
        ## Validate delete products & variants
        if request_data.delete_products:
            products_ids = request_data.delete_products.product_ids
            variants_ids = request_data.delete_products.variants_ids
            validate_product_and_variants(products_ids, variants_ids, products)
        ## Validate subscription frequencies 
        if request_data.update_frequency:
            for frequency in request_data.update_frequency:
                if not db.query(SubscriptionFrequency).filter(SubscriptionFrequency.id == frequency.id).first():
                    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Frequency to Update with ID {frequency.id} not found")       
        ## Validate removed frequencies
        if request_data.removed_frequency:
            for frequency in request_data.removed_frequency:
                if not db.query(SubscriptionFrequency).filter(SubscriptionFrequency.id == frequency).first():
                    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Frequency to delete with ID {frequency} not found")

        shopify.ShopifyResource.clear_session()
       
        # Delete products and variants
        if request_data.delete_products:
            delete_products_and_variants_from_plan(db_plan.id, request_data.delete_products, db)
        # Add Products and Variants
        if request_data.add_products:            
            add_products_and_variants_to_plan(db_plan.id, request_data.add_products, db)        
        # Remove Frequencies
        if request_data.removed_frequency:
            db.query(SubscriptionFrequency).filter(
                SubscriptionFrequency.id.in_(request_data.removed_frequency)
            ).delete(synchronize_session=False)
        # Add New Frequencies
        if request_data.add_frequency:
            new_frequencies = [
                SubscriptionFrequency(subscription_plans_id=request_data.id, **frequency.model_dump())
                for frequency in request_data.add_frequency
            ]
            db.bulk_save_objects(new_frequencies)
        # Update Existing Frequencies
        if request_data.update_frequency:
            for frequency in request_data.update_frequency:
                db_frequency = db.query(SubscriptionFrequency).filter(
                    SubscriptionFrequency.id == frequency.id
                ).first()
                if db_frequency:
                    for key, value in frequency.model_dump().items():
                        setattr(db_frequency, key, value)

        db.commit()
        return JSONResponse(content={"message": "Subscription plan updated successfully"}, status_code=status.HTTP_200_OK)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))



@subscription_router.get("/", status_code=status.HTTP_200_OK)
async def get_subscriptions(
    shop_url: str = Depends(get_current_shop_url),
    db: Session = Depends(get_db)
):
    try:
        shop = db.query(Shop).filter(Shop.shop_url == shop_url).first()
        if not shop:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Shop not found")
        subscriptions = db.query(Subscription).filter(Subscription.shop_id == shop.id, Subscription.is_deleted == False).all()
        return subscriptions
    except Exception as e:
        print(e)
        return JSONResponse(content={"error": str(e)}, status_code=status.HTTP_400_BAD_REQUEST)

secret = "b10f2c8fa36c504ecda43365428fd298"

def verify_hmac(data: bytes, hmac_header: str) -> bool:
    """
    Verify the HMAC signature of the incoming request.
    """
    digest = hmac.new(
        secret.encode('utf-8'),
        data, hashlib.sha256
    ).digest()
    computed_hmac = base64.b64encode(digest).decode()
    return hmac.compare_digest(computed_hmac, hmac_header)

@subscription_router.post("/webhook/subscription", status_code=status.HTTP_200_OK)
async def handle_subscription_webhook(request: Request, x_shopify_hmac_sha256: str = Header(None)):
    body = await request.body()
    if not verify_hmac(body, x_shopify_hmac_sha256):
        return JSONResponse(content={"status": "error"}, status_code=status.HTTP_403_FORBIDDEN)
    
    try:
        payload = await request.json()
        # Process the payload as needed
        logger.info(f"Received payload: {payload}")
        return JSONResponse(content={"status": "success"}, status_code=status.HTTP_200_OK)
    except Exception as e:
        return JSONResponse(content={"status": "error", "details": str(e)}, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

import requests

def create_selling_plan_group(shop_url, shopify_token):
    if not shop_url or not shopify_token:
        raise ValueError("shop_url and shopify_token must not be None")
    
    url = f"https://{shop_url}/admin/api/2025-01/graphql.json"
    headers = {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': shopify_token
    }
    mutation = '''
    mutation {
      sellingPlanGroupCreate(input: {
        name: "Monthly Subscription",
        options: ["Delivery every"],
        position: 1,
        sellingPlansToCreate: [{
          name: "Every Month",
          options: ["1 Month"],
          billingPolicy: {
            interval: MONTH,
            intervalCount: 1
          },
          deliveryPolicy: {
            interval: MONTH,
            intervalCount: 1
          },
          pricingPolicies: [{
            adjustmentType: PERCENTAGE,
            adjustmentValue: 10
          }]
        }],
        products: ["gid://shopify/Product/PRODUCT_ID"]
      }) {
        sellingPlanGroup {
          id
        }
        userErrors {
          field
          message
        }
      }
    }
    '''
    response = requests.post(url, headers=headers, json={'query': mutation})
    print(response.json())
    return response.json()

@subscription_plan_router.post("/create_subscription_plan/")
def create_subscription_plan_endpoint(
    db: Session = Depends(get_db),
    session: shopify.Session = Depends(get_shopify_session),
    shop_url: str = Depends(get_current_shop_url)
):
    try:
        shopify_token = session.token
        print("mohit")
        print(shopify_token)
        print("-==========================")
        print(shop_url, shopify_token)
        print("-==========================")

        if not shop_url or not shopify_token:
            raise HTTPException(status_code=400, detail="shop_url or shopify_token is None")
        create_selling_plan_group(shop_url, shopify_token)
        return {"message": "Subscription plan created successfully."}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# def attach_selling_plan_group_to_product(product_id, selling_plan_group_id):
#     """
#     Attach a selling plan group to a product in Shopify.
#     """
#     product = shopify.Product.find(product_id)
#     if not product:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    
#     product.selling_plan_group_ids = [selling_plan_group_id]
#     product.save()
#     print("Product updated with selling plan group")

# def register_subscription_webhook():
#     """
#     Register a webhook for subscription events in Shopify.
#     """
#     webhook = shopify.Webhook()
#     webhook.topic = "subscription_contracts/create"
#     webhook.address = "https://yourapp.com/webhook/subscription"
#     webhook.format = "json"
#     if webhook.save():
#         print("Webhook created successfully")
#     else:
#         print("Failed to create webhook")


