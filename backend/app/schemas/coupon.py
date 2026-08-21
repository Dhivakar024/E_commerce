from pydantic import BaseModel
from typing import Optional

class CouponCreate(BaseModel):
    code: str
    type: str  # percentage | fixed
    value: float
    minOrder: Optional[float] = 0.0
    maxDiscount: Optional[float] = 0.0
    description: Optional[str] = ""
    isActive: Optional[bool] = True

class CouponApply(BaseModel):
    code: str
    subtotal: float
