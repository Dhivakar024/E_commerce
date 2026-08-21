from fastapi import APIRouter, HTTPException, Depends
from bson import ObjectId
from typing import Dict, Any, List
import uuid
from ..core.database import get_database
from ..core.security import get_current_user
from ..schemas.auth import AddressItem

router = APIRouter(prefix="/addresses", tags=["Addresses"])

@router.get("")
async def get_addresses(current_user: dict = Depends(get_current_user)):
    db = get_database()
    user = await db["users"].find_one({"_id": ObjectId(current_user["id"])})
    return {"success": True, "data": user.get("addresses", []) if user else []}

@router.post("")
async def add_address(data: AddressItem, current_user: dict = Depends(get_current_user)):
    db = get_database()
    addr_dict = data.dict()
    addr_dict["id"] = f"addr_{uuid.uuid4().hex[:8]}"

    user = await db["users"].find_one({"_id": ObjectId(current_user["id"])})
    addresses = user.get("addresses", []) if user else []

    if addr_dict.get("isDefault") or len(addresses) == 0:
        for a in addresses:
            a["isDefault"] = False
        addr_dict["isDefault"] = True

    addresses.append(addr_dict)
    await db["users"].update_one(
        {"_id": ObjectId(current_user["id"])},
        {"$set": {"addresses": addresses}}
    )

    return {"success": True, "data": addresses, "address": addr_dict}

@router.put("/{id}")
async def update_address(id: str, data: AddressItem, current_user: dict = Depends(get_current_user)):
    db = get_database()
    user = await db["users"].find_one({"_id": ObjectId(current_user["id"])})
    addresses = user.get("addresses", []) if user else []

    for i, a in enumerate(addresses):
        if a.get("id") == id or str(a.get("_id")) == id:
            updated = data.dict()
            updated["id"] = id
            addresses[i] = updated
            break

    await db["users"].update_one(
        {"_id": ObjectId(current_user["id"])},
        {"$set": {"addresses": addresses}}
    )
    return {"success": True, "data": addresses}

@router.delete("/{id}")
async def delete_address(id: str, current_user: dict = Depends(get_current_user)):
    db = get_database()
    user = await db["users"].find_one({"_id": ObjectId(current_user["id"])})
    addresses = user.get("addresses", []) if user else []
    addresses = [a for a in addresses if a.get("id") != id and str(a.get("_id")) != id]

    await db["users"].update_one(
        {"_id": ObjectId(current_user["id"])},
        {"$set": {"addresses": addresses}}
    )
    return {"success": True, "data": addresses}

@router.put("/{id}/default")
async def set_default_address(id: str, current_user: dict = Depends(get_current_user)):
    db = get_database()
    user = await db["users"].find_one({"_id": ObjectId(current_user["id"])})
    addresses = user.get("addresses", []) if user else []

    for a in addresses:
        a["isDefault"] = (a.get("id") == id or str(a.get("_id")) == id)

    await db["users"].update_one(
        {"_id": ObjectId(current_user["id"])},
        {"$set": {"addresses": addresses}}
    )
    return {"success": True, "data": addresses}
