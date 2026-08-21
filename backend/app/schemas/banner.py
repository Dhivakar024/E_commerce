from pydantic import BaseModel
from typing import Optional

class BannerCreate(BaseModel):
    title: str
    subtitle: Optional[str] = ""
    image: str
    cta: Optional[str] = "Shop Now"
    ctaUrl: Optional[str] = "/shop"
    priority: Optional[int] = 0
    isActive: Optional[bool] = True
