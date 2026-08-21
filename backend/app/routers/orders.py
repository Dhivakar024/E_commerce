from fastapi import APIRouter, HTTPException, status, Depends
from bson import ObjectId
from datetime import datetime
import random
from typing import Optional, List
from ..core.database import get_database
from ..core.security import get_current_user, get_optional_user, get_current_admin
from ..schemas.order import OrderCreate, OrderStatusUpdate

router = APIRouter(prefix="/orders", tags=["Orders"])

def serialize_order(o: dict) -> dict:
    return {
        "id": str(o.get("_id", o.get("id", ""))),
        "_id": str(o.get("_id", o.get("id", ""))),
        "orderNumber": o.get("orderNumber", ""),
        "userId": str(o.get("userId", "")) if o.get("userId") else None,
        "items": o.get("items", []),
        "customer": o.get("customer", {}),
        "shippingAddress": o.get("shippingAddress", {}),
        "deliveryMethod": o.get("deliveryMethod", {}),
        "paymentMethod": o.get("paymentMethod", ""),
        "subtotal": o.get("subtotal", 0),
        "discount": o.get("discount", 0),
        "shipping": o.get("shipping", 0),
        "tax": o.get("tax", 0),
        "total": o.get("total", 0),
        "status": o.get("status", "Order Confirmed"),
        "couponCode": o.get("couponCode"),
        "createdAt": o.get("createdAt", datetime.utcnow()).isoformat() if isinstance(o.get("createdAt"), datetime) else o.get("createdAt", "")
    }

def generate_order_number() -> str:
    rnd = random.randint(100000, 999999)
    return f"ORD-2026-{rnd}"

@router.post("", status_code=status.HTTP_201_CREATED)
async def create_order(
    data: OrderCreate,
    current_user: Optional[dict] = Depends(get_optional_user)
):
    db = get_database()
    order_doc = data.dict()
    order_doc["orderNumber"] = generate_order_number()
    order_doc["status"] = "Order Confirmed"
    order_doc["userId"] = current_user.get("id") if current_user else None
    order_doc["createdAt"] = datetime.utcnow()
    order_doc["updatedAt"] = datetime.utcnow()

    if db is not None:
        res = await db["orders"].insert_one(order_doc)
        order_doc["_id"] = res.inserted_id

        # Update product stock
        for item in data.items:
            prod = item.product
            pid = prod.get("id") or prod.get("_id")
            if pid:
                try:
                    await db["products"].update_one(
                        {"$or": [{"_id": ObjectId(pid)}, {"id": pid}, {"id": int(pid)}]},
                        {"$inc": {"stock": -item.quantity}}
                    )
                except Exception:
                    pass

    return {
        "success": True,
        "order": serialize_order(order_doc),
        "data": serialize_order(order_doc)
    }

@router.get("")
@router.get("/user/me")
async def get_my_orders(current_user: dict = Depends(get_current_user)):
    db = get_database()
    if db is None:
        return {"success": True, "data": []}

    user_email = current_user.get("email")
    orders = await db["orders"].find({
        "$or": [
            {"userId": current_user["id"]},
            {"customer.email": user_email}
        ]
    }).sort("createdAt", -1).to_list(length=100)

    return {"success": True, "data": [serialize_order(o) for o in orders]}

@router.get("/admin/all")
async def get_all_orders_admin(admin: dict = Depends(get_current_admin)):
    db = get_database()
    if db is None:
        return {"success": True, "data": []}

    orders = await db["orders"].find({}).sort("createdAt", -1).to_list(length=200)
    return {"success": True, "data": [serialize_order(o) for o in orders]}

@router.get("/{id}")
async def get_order_by_id(id: str):
    db = get_database()
    if db is None:
        raise HTTPException(status_code=404, detail="Order not found")

    order = None
    try:
        order = await db["orders"].find_one({"_id": ObjectId(id)})
    except Exception:
        pass

    if not order:
        order = await db["orders"].find_one({"orderNumber": id})

    if not order:
        raise HTTPException(status_code=404, detail="Order not found in atelier archives.")

    return {"success": True, "data": serialize_order(order), "order": serialize_order(order)}

@router.put("/{id}/status")
async def update_order_status(id: str, data: OrderStatusUpdate, admin: dict = Depends(get_current_admin)):
    db = get_database()
    query = {}
    try:
        query = {"_id": ObjectId(id)}
    except Exception:
        query = {"orderNumber": id}

    await db["orders"].update_one(query, {"$set": {"status": data.status, "updatedAt": datetime.utcnow()}})
    updated = await db["orders"].find_one(query)
    if not updated:
        raise HTTPException(status_code=404, detail="Order not found")

    return {"success": True, "data": serialize_order(updated)}
