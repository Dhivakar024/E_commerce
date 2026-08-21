from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class ColorHex(BaseModel):
    name: str
    hex: str

class ProductCreate(BaseModel):
    name: str
    slug: Optional[str] = None
    description: str
    shortDescription: Optional[str] = ""
    category: str
    subcategory: Optional[str] = ""
    price: float
    compareAtPrice: Optional[float] = None
    image: str
    images: Optional[List[str]] = []
    sizes: Optional[List[str]] = ["XS", "S", "M", "L", "XL"]
    colors: Optional[List[str]] = []
    colorHexes: Optional[List[ColorHex]] = []
    tags: Optional[List[str]] = []
    material: Optional[str] = "100% Noble Natural Fibers"
    fit: Optional[str] = "Tailored drape; true to size"
    careInstructions: Optional[str] = "Specialist dry clean or cold delicate wash"
    rating: Optional[float] = 5.0
    reviewCount: Optional[int] = 0
    stock: int = 10
    sku: Optional[str] = None
    isNew: Optional[bool] = False
    isFeatured: Optional[bool] = False
    isActive: Optional[bool] = True

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    slug: Optional[str] = None
    description: Optional[str] = None
    shortDescription: Optional[str] = None
    category: Optional[str] = None
    subcategory: Optional[str] = None
    price: Optional[float] = None
    compareAtPrice: Optional[float] = None
    image: Optional[str] = None
    images: Optional[List[str]] = None
    sizes: Optional[List[str]] = None
    colors: Optional[List[str]] = None
    colorHexes: Optional[List[ColorHex]] = None
    tags: Optional[List[str]] = None
    material: Optional[str] = None
    fit: Optional[str] = None
    careInstructions: Optional[str] = None
    rating: Optional[float] = None
    reviewCount: Optional[int] = None
    stock: Optional[int] = None
    sku: Optional[str] = None
    isNew: Optional[bool] = None
    isFeatured: Optional[bool] = None
    isActive: Optional[bool] = None
