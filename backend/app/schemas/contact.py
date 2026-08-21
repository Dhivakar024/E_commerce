from pydantic import BaseModel, EmailStr
from typing import Optional

class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    subject: Optional[str] = "Client Inquiry"
    message: str
