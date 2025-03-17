from pydantic import BaseModel
from typing import Optional, List

class ProductVariantSerializer(BaseModel):
    id: Optional[int] = None
    title: Optional[str] = None
    product_id: Optional[int] = None
    price: Optional[str] = None

class ImageSerializer(BaseModel):
    id: Optional[int] = None
    src: Optional[str] = None

class CollectionSerializer(BaseModel):
    id: Optional[int] = None

class ProductSerializer(BaseModel):
    id: Optional[int] = None
    title: Optional[str] = None
    body_html: Optional[str] = None
    vendor: Optional[str] = None
    product_type: Optional[str] = None
    created_at: Optional[str] = None
    updated_at: Optional[str] = None
    collections : Optional[List[CollectionSerializer]] = None
    variants: Optional[List[ProductVariantSerializer]] = None
    status: Optional[str] = None
    image: Optional[ImageSerializer] = None
    
    class Config:
        from_attributes = True

class ProductResponseSerializer(BaseModel):
    products_list: Optional[List[ProductSerializer]] = None
    total_products: Optional[int] = None
    hm: Optional[bool] = None
