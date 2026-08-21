from fastapi import APIRouter, HTTPException, Depends
from bson import ObjectId
from ..core.database import get_database
from ..core.security import get_current_admin
from ..schemas.banner import BannerCreate

router = APIRouter(prefix="/banners", tags=["Banners"])

def serialize_banner(b: dict) -> dict:
    return {
        "id": str(b.get("_id", b.get("id", ""))),
        "_id": str(b.get("_id", b.get("id", ""))),
        "title": b.get("title", ""),
        "subtitle": b.get("subtitle", ""),
        "image": b.get("image", ""),
        "cta": b.get("cta", "Shop Now"),
        "ctaUrl": b.get("ctaUrl", "/shop"),
        "priority": b.get("priority", 0),
        "isActive": b.get("isActive", True),
    }

@router.get("")
async def get_banners():
    db = get_database()
    if db is None:
        return {"success": True, "data": []}

    banners = await db["banners"].find({"isActive": True}).sort("priority", -1).to_list(length=20)
    return {"success": True, "data": [serialize_banner(b) for b in banners]}

@router.post("")
async def create_banner(data: BannerCreate, admin: dict = Depends(get_current_admin)):
    db = get_database()
    b_dict = data.dict()
    res = await db["banners"].insert_one(b_dict)
    b_dict["_id"] = res.inserted_id
    return {"success": True, "data": serialize_banner(b_dict)}

@router.delete("/{id}")
async def delete_banner(id: str, admin: dict = Depends(get_current_admin)):
    db = get_database()
    query = {}
    try:
        query = {"_id": ObjectId(id)}
    except Exception:
        query = {"id": id}

    await db["banners"].delete_one(query)
    return {"success": True, "message": "Banner removed."}
