import os
import shopify
from typing import List
from datetime import timedelta
from fastapi import APIRouter, status, Depends, Request
from fastapi.responses import JSONResponse, RedirectResponse
from sqlalchemy.orm import Session
from fastapi.exceptions import HTTPException

from .models import Shop
from ..config.db import get_db
from ..base.auth import  create_access_token, create_refresh_token
from .constants import API_KEY, API_SECRET, SCOPES, REDIRECT_URI, API_VERSION, ACCESS_TOKEN_EXPIRE_MINUTES
from .services import get_shopify_session, get_current_shop_url, get_product_collections, register_webhook
from .serializer import ProductResponseSerializer, ProductSerializer
from .filters import ShopifyCollectionFilter, ShopifyProductFilter
from ..base.auth import verify_token

token_router = APIRouter()
shop_router = APIRouter()
product_router = APIRouter()

@token_router.get("/refresh-token", status_code=status.HTTP_200_OK)
async def refresh_token(refresh_token: str):
    payload = verify_token(refresh_token, HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token"))
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")
    new_access_token = create_access_token({"shop_url": payload.shop_url, "shopifyToken": payload.shopifyToken})
    return {"access_token": new_access_token, "token_type": "bearer"}

@shop_router.get("/install")
async def install(shop_url: str):
    shopify.Session.setup(api_key=API_KEY, secret=API_SECRET)
    redirect_uri = REDIRECT_URI
    state = os.urandom(16).hex()
    install_url = (f"https://{shop_url}/admin/oauth/authorize?"
                   f"client_id={API_KEY}&scope={SCOPES}&redirect_uri={redirect_uri}&state={state}")
    print(install_url)
    return RedirectResponse(install_url)

@shop_router.get("/token", status_code=status.HTTP_200_OK)
async def get_token(shop_url: str, shopify_token: str):
    # Register webhook
    # try:
    #     register_webhook(shop_url, shopify_token)
    # except Exception as e:
    #     return JSONResponse(content={"error": str(e)}, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
    try:
        print("mohit")        
        token = create_access_token(data={"shop_url": shop_url, "shopifyToken": shopify_token})
        return JSONResponse(content={"shop": shop_url, "token": token}, status_code=status.HTTP_200_OK)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

@shop_router.get("/callback", status_code=status.HTTP_200_OK)
async def callback(request: Request, shop: str, db: Session = Depends(get_db)):
    try:
        shopify.Session.setup(api_key=API_KEY, secret=API_SECRET)
        session = shopify.Session(shop, API_VERSION)
        shopifyToken = session.request_token(request.query_params)

        shopify.ShopifyResource.activate_session(session)
        shop_email = shopify.Shop.current().email if shopify.Shop.current().email else None
        shopify.ShopifyResource.clear_session()

        shop_record = db.query(Shop).filter(Shop.shop_url == shop).first()
        if not shop_record:
            new_shop = Shop(shop_url=shop, email=shop_email)
            db.add(new_shop)
            db.commit()
            db.refresh(new_shop)

        token = create_access_token(data={"shop_url": shop, "shopifyToken": shopifyToken})
        refresh_token = create_refresh_token(data={"shop_url": shop, "shopifyToken": shopifyToken})

        # # Register webhook
        # try:
        #     register_webhook(shop, shopifyToken)
        # except Exception as e:
        #     return JSONResponse(content={"error": str(e)}, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return JSONResponse(content={"shop": shop, "token": token, "refresh_token":refresh_token}, status_code=status.HTTP_200_OK)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@shop_router.get("/shopify-shop-info", status_code=status.HTTP_200_OK)
async def get_shop_info(session: shopify.Session = Depends(get_shopify_session)):
    try:
        shopify.ShopifyResource.activate_session(session)
        shop = shopify.Shop.current()
        shopify.ShopifyResource.clear_session()
        return shop.to_dict()
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=status.HTTP_400_BAD_REQUEST)

    

@product_router.get("/", status_code=200, response_model=ProductResponseSerializer)
async def get_products(session: shopify.Session = Depends(get_shopify_session),filter: ShopifyProductFilter = Depends(),product_count : int = 10):
    try:
        shopify.ShopifyResource.activate_session(session)
        products = shopify.Product.find()
        product_collections = get_product_collections()

        # Convert products to dictionary and assign collections
        products_list = [
            {**product.to_dict(), "collections": product_collections.get(product.id, [])}
            for product in products
        ]
        total_products = len(products_list)

        if filter.id:
            products_list = [p for p in products_list if p["id"] == filter.id]
        if filter.title:
            products_list = [p for p in products_list if p["title"].lower() == filter.title.lower()]
        if filter.collection_id:
            products_list = [p for p in products_list if any(c["id"] == filter.collection_id for c in p.get("collections", []))]
        
        products_list = products_list[:product_count if product_count == 10 else product_count+10]

        # Check if the product has single variant then remove variants
        for product in products_list:
            if len(product.get("variants", [])) == 1:
                product["variants"] = []
        shopify.ShopifyResource.clear_session()
        return {"products_list":products_list, "total_products": total_products, "hm": False if total_products <= len(products_list) else True}
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=400)

    finally:
        shopify.ShopifyResource.clear_session()


@product_router.get("/collection", status_code=status.HTTP_200_OK)
async def get_collection(session: shopify.Session = Depends(get_shopify_session), filter: ShopifyCollectionFilter = Depends()):
    try:
        shopify.ShopifyResource.activate_session(session)
        custom_collections = shopify.CustomCollection.find()
        smart_collections = shopify.SmartCollection.find()
        shopify.ShopifyResource.clear_session()
        collections = []
        if custom_collections:
            collections.extend([collection.to_dict() for collection in custom_collections])
        if smart_collections:
            collections.extend([collection.to_dict() for collection in smart_collections])
        
        if filter.id:
            collections = [collection for collection in collections if collection.get("id") == filter.id]
        if filter.title:
            collections = [collection for collection in collections if collection.get("title") == filter.title]

        return collections
    except Exception as e:
        shopify.ShopifyResource.clear_session()
        return JSONResponse(content={"error": str(e)}, status_code=status.HTTP_400_BAD_REQUEST)


