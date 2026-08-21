from fastapi import APIRouter, HTTPException, status, Depends
from bson import ObjectId
from datetime import datetime
from ..core.database import get_database
from ..core.security import get_current_admin
from ..schemas.category import CategoryCreate, CategoryUpdate

router = APIRouter(prefix="/categories", tags=["Categories"])

def serialize_category(c: dict) -> dict:
    return {
        "id": str(c.get("_id", c.get("id", ""))),
        "_id": str(c.get("_id", c.get("id", ""))),
        "name": c.get("name", ""),
        "slug": c.get("slug", ""),
        "description": c.get("description", ""),
        "image": c.get("image", ""),
        "bannerImage": c.get("bannerImage", ""),
        "link": f"/shop/{c.get('slug', c.get('name', '').lower().replace(' ', '-'))}",
        "isActive": c.get("isActive", True),
        "count": c.get("count", 0),
    }

@router.get("")
async def get_categories():
    db = get_database()
    if db is None:
        return {"success": True, "data": []}

    categories = await db["categories"].find({"isActive": True}).to_list(length=100)
    return {"success": True, "data": [serialize_category(c) for c in categories]}

@router.post("", status_code=status.HTTP_201_CREATED)
async def create_category(data: CategoryCreate, admin: dict = Depends(get_current_admin)):
    db = get_database()
    cat_dict = data.dict()
    if not cat_dict.get("slug"):
        cat_dict["slug"] = data.name.lower().strip().replace(" ", "-")

    res = await db["categories"].insert_one(cat_dict)
    cat_dict["_id"] = res.inserted_id
    return {"success": True, "data": serialize_category(cat_dict)}

@router.put("/{id}")
async def update_category(id: str, data: CategoryUpdate, admin: dict = Depends(get_current_admin)):
    db = get_database()
    updates = {k: v for k, v in data.dict().items() if v is not None}

    query = {}
    try:
        query = {"_id": ObjectId(id)}
    except Exception:
        query = {"id": id}

    await db["categories"].update_one(query, {"$set": updates})
    updated = await db["categories"].find_one(query)
    return {"success": True, "data": serialize_category(updated)}

@router.delete("/{id}")
async def delete_category(id: str, admin: dict = Depends(get_current_admin)):
    db = get_database()
    query = {}
    try:
        query = {"_id": ObjectId(id)}
    except Exception:
        query = {"id": id}

    await db["categories"].delete_one(query)
    return {"success": True, "message": "Category archived."}
