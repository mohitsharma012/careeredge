from pydantic import BaseModel
from typing import Optional

class SubscriptionFilter(BaseModel):
    id: Optional[int] = None
    frequency : Optional[bool] = False
    products: Optional[bool] = False

