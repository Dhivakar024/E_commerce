from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Dict, Any
from datetime import datetime

class UserRegister(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr
    password: str
    phone: Optional[str] = ""

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserProfileUpdate(BaseModel):
    firstName: Optional[str] = None
    lastName: Optional[str] = None
    phone: Optional[str] = None

class AddressItem(BaseModel):
    id: Optional[str] = None
    firstName: str
    lastName: str
    phone: str
    addressLine1: str
    addressLine2: Optional[str] = ""
    city: str
    state: str
    pinCode: str
    country: Optional[str] = "India"
    isDefault: Optional[bool] = False

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class ResetPasswordRequest(BaseModel):
    email: EmailStr
    newPassword: str

class UserResponse(BaseModel):
    id: str
    firstName: str
    lastName: str
    email: str
    phone: Optional[str] = ""
    role: str = "customer"
    addresses: Optional[List[Dict[str, Any]]] = []
    wishlist: Optional[List[Any]] = []
    createdAt: Optional[datetime] = None

class TokenResponse(BaseModel):
    token: str
    user: Dict[str, Any]
