import json
import shopify
import requests
from fastapi.security import APIKeyHeader
from fastapi import HTTPException, Request, Security, status, Depends

from .constants import API_VERSION
from ..base.auth import verify_token
from ..config.config import Config

api_key_header = APIKeyHeader(name="Authorization", auto_error=False)
async def get_shopify_session(request: Request, api_key: str = Security(api_key_header)):
    token = request.headers.get("Authorization")
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authorization header missing")
    parts = token.split(" ")
    if len(parts) != 2 or parts[0].lower() != "bearer":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authorization header format")
    token = parts[1]

    try:
        token_data = verify_token(token, HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token"))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(e))
    try:
        # Verify the token
        if not token_data:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
        
        shopify.Session.setup(api_key=api_key, secret=token_data.shopifyToken)
        session = shopify.Session(token_data.shop_url, API_VERSION, token_data.shopifyToken)

        try: 
            shopify.ShopifyResource.activate_session(session)
            shop = shopify.Shop.current()
            shopify.ShopifyResource.clear_session()
        except Exception as e:
            shopify.ShopifyResource.clear_session()
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token or Expired token")


        return session
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(e))
   

async def get_current_shop_url(session: dict = Depends(get_shopify_session)):
    try:
        shopify.ShopifyResource.activate_session(session)
        store = shopify.Shop.current()
        shopify.ShopifyResource.clear_session()
        return store.myshopify_domain  
    except Exception as e:
        if e.response.code == 401:
            if hasattr(e, 'response') and hasattr(e.response, 'body'):
                error_detail_json = json.loads(e.response.body.decode('utf-8'))
                error_message = error_detail_json.get("errors", str(e))
                raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=error_message)
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(e))
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


def get_product_collections():
    """Fetch all product-collection mappings efficiently."""
    collects = shopify.Collect.find()
    product_collections = {}

    for collect in collects:
        product_id = collect.product_id
        if product_id not in product_collections:
            product_collections[product_id] = []
        product_collections[product_id].append({"id": collect.collection_id})

    return product_collections


def get_shopify_shop_products(session):
    """Fetch all products from Shopify."""
    """ Asuming session is already activated """
    products = shopify.Product.find()
    products_map = {p.id: p.to_dict() for p in products}
    return products_map

def get_shopify_shop_products_with_collections(session):
    """Fetch all products from Shopify."""
    """ Asuming session is already activated """
    products = shopify.Product.find()
    product_collections = get_product_collections()
    products_map = {p.id: {**p.to_dict(), "collections": product_collections.get(p.id, [])} for p in products}
    print(products_map)
    return products_map

def validate_product(product_id, products_map):
    """Validate if a product exists in Shopify Store."""
    if product_id not in products_map:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product with id {} not found".format(product_id))
    return True
    
def validate_bulk_products(product_ids, products_map):
    """Validate if multiple products exist in Shopify Store."""
    for product_id in product_ids:
        validate_product(product_id, products_map) if product_id else None
    return True

def validate_variant(variant_id, products_map):
    """Validate if a variant exists in Shopify Store."""
    all_variants = [v for p in products_map.values() for v in p.get("variants", [])]
    varients_list = [v.get("id") for v in all_variants]
    if variant_id not in varients_list:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Variant with id {} not found".format(variant_id))
    return True
    
def validate_bulk_variants(variant_ids, products_map):
    """Validate if multiple variants exist in Shopify Store."""
    all_variants = [v for p in products_map.values() for v in p.get("variants", [])]
    varients_list = [v.get("id") for v in all_variants]
    for variant_id in variant_ids:
        if variant_id not in varients_list:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Variant with id {} not found".format(variant_id))
    return True

def validate_product_and_variants(product_ids, variants_ids, products_map):
    """Validate if a product and its variants exist in Shopify Store."""
    validate_bulk_products(product_ids, products_map) if product_ids else None
    validate_bulk_variants(variants_ids, products_map) if variants_ids else None
    return True
  
def register_webhook(shop_domain: str, shopify_token: str):
    webhook_payload = {
        "webhook": {
            "topic": "subscription_contracts/create",  
            "address": f"{Config.BACKEND_URL}/api/v1/subscription/webhook/subscription",
            "format": "json"
        }
    }

    response = requests.post(
        f"https://{shop_domain}/admin/api/{API_VERSION}/webhooks.json",
        json=webhook_payload,
        headers={
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": shopify_token
        }
    )

    if response.status_code == 201:
        print("subscription webhook created")
        return True
    else:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f'{response.json()}')
    
