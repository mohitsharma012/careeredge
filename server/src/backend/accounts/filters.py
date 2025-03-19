from pydantic import BaseModel
from typing import Optional

class ShopifyCollectionFilter(BaseModel):
    id: Optional[int] = None
    title: Optional[str] = None

class ShopifyProductFilter(BaseModel):
    id: Optional[int] = None
    title: Optional[str] = None
    collection_id: Optional[int] = None

   
