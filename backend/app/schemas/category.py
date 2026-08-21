from pydantic import BaseModel
from typing import Optional

class CategoryCreate(BaseModel):
    name: str
    slug: Optional[str] = None
    description: Optional[str] = ""
    image: Optional[str] = ""
    bannerImage: Optional[str] = ""
    isActive: Optional[bool] = True

class CategoryUpdate(BaseModel):
    name: Optional[str] = None
    slug: Optional[str] = None
    description: Optional[str] = None
    image: Optional[str] = None
    bannerImage: Optional[str] = None
    isActive: Optional[bool] = None
