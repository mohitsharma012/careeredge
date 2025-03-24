from pydantic import BaseModel
from typing import Optional

class SubscriptionPlanFilter(BaseModel):
    id: Optional[int] = None

