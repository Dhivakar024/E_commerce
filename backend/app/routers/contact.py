from fastapi import APIRouter, HTTPException
from datetime import datetime
from ..core.database import get_database
from ..schemas.contact import ContactMessage

router = APIRouter(prefix="/contact", tags=["Concierge Contact"])

@router.post("")
async def send_contact_message(data: ContactMessage):
    db = get_database()
    msg_dict = data.dict()
    msg_dict["createdAt"] = datetime.utcnow()

    if db is not None:
        await db["messages"].insert_one(msg_dict)

    return {
        "success": True,
        "message": "Your inquiry has been received by our private concierge team."
    }
