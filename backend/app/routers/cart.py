from fastapi import APIRouter, HTTPException, Depends
from bson import ObjectId
from typing import Dict, Any, List
from ..core.database import get_database
from ..core.security import get_current_user

router = APIRouter(prefix="/cart", tags=["Cart"])

@router.get("")
async def get_user_cart(current_user: dict = Depends(get_current_user)):
    db = get_database()
    cart_doc = await db["carts"].find_one({"userId": current_user["id"]})
    return {
        "success": True,
        "items": cart_doc.get("items", []) if cart_doc else []
    }

@router.post("")
async def sync_cart(data: Dict[str, Any], current_user: dict = Depends(get_current_user)):
    db = get_database()
    items = data.get("items", [])
    await db["carts"].update_one(
        {"userId": current_user["id"]},
        {"$set": {"items": items, "userId": current_user["id"]}},
        upsert=True
    )
    return {"success": True, "items": items}

@router.delete("")
async def clear_cart(current_user: dict = Depends(get_current_user)):
    db = get_database()
    await db["carts"].delete_one({"userId": current_user["id"]})
    return {"success": True, "items": []}
