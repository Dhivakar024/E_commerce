from fastapi import APIRouter, HTTPException, Depends
from bson import ObjectId
from typing import Dict, Any, List
from ..core.database import get_database
from ..core.security import get_current_user

router = APIRouter(prefix="/wishlist", tags=["Wishlist"])

@router.get("")
async def get_user_wishlist(current_user: dict = Depends(get_current_user)):
    db = get_database()
    user = await db["users"].find_one({"_id": ObjectId(current_user["id"])})
    wishlist = user.get("wishlist", []) if user else []
    return {"success": True, "data": wishlist}

@router.post("")
async def sync_wishlist(data: Dict[str, Any], current_user: dict = Depends(get_current_user)):
    db = get_database()
    wishlist = data.get("wishlist", data.get("items", []))
    await db["users"].update_one(
        {"_id": ObjectId(current_user["id"])},
        {"$set": {"wishlist": wishlist}}
    )
    return {"success": True, "data": wishlist}

@router.post("/toggle/{product_id}")
async def toggle_wishlist_item(product_id: str, current_user: dict = Depends(get_current_user)):
    db = get_database()
    user = await db["users"].find_one({"_id": ObjectId(current_user["id"])})
    wishlist = list(user.get("wishlist", [])) if user else []

    # Handle int or str
    pid = int(product_id) if product_id.isdigit() else product_id
    if pid in wishlist:
        wishlist.remove(pid)
    else:
        wishlist.append(pid)

    await db["users"].update_one(
        {"_id": ObjectId(current_user["id"])},
        {"$set": {"wishlist": wishlist}}
    )
    return {"success": True, "data": wishlist}
