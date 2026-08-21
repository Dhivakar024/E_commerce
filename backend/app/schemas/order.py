from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class OrderItem(BaseModel):
    product: Dict[str, Any]
    quantity: int
    selectedSize: Optional[str] = "Standard"
    selectedColor: Optional[str] = "Default"

class CustomerInfo(BaseModel):
    email: str
    phone: Optional[str] = ""
    newsletterOptIn: Optional[bool] = False

class ShippingAddress(BaseModel):
    firstName: str
    lastName: str
    phone: str
    addressLine1: str
    addressLine2: Optional[str] = ""
    city: str
    state: str
    pinCode: str
    country: Optional[str] = "India"

class DeliveryMethod(BaseModel):
    id: str
    name: str
    estimate: str
    price: float

class OrderCreate(BaseModel):
    items: List[OrderItem]
    customer: CustomerInfo
    shippingAddress: ShippingAddress
    deliveryMethod: DeliveryMethod
    paymentMethod: str
    subtotal: float
    discount: Optional[float] = 0.0
    shipping: Optional[float] = 0.0
    tax: Optional[float] = 0.0
    total: float
    couponCode: Optional[str] = None
    notes: Optional[str] = ""

class OrderStatusUpdate(BaseModel):
    status: str
