from fastapi import APIRouter, HTTPException, Depends
from bson import ObjectId
from ..core.database import get_database
from ..core.security import get_current_admin
from ..schemas.coupon import CouponCreate, CouponApply

router = APIRouter(prefix="/coupons", tags=["Coupons"])

def serialize_coupon(c: dict) -> dict:
    return {
        "id": str(c.get("_id", c.get("id", ""))),
        "_id": str(c.get("_id", c.get("id", ""))),
        "code": c.get("code", ""),
        "type": c.get("type", "percentage"),
        "value": c.get("value", 0),
        "minOrder": c.get("minOrder", 0),
        "maxDiscount": c.get("maxDiscount", 0),
        "description": c.get("description", ""),
        "isActive": c.get("isActive", True),
        "usageCount": c.get("usageCount", 0),
    }

@router.post("/apply")
async def apply_coupon(data: CouponApply):
    db = get_database()
    code_clean = data.code.strip().upper()

    # Pre-set default coupons if DB offline or empty
    DEFAULT_COUPONS = {
        "SAVE10": {"type": "percentage", "value": 10, "minOrder": 0, "maxDiscount": 0, "description": "10% off your entire order"},
        "FLAT500": {"type": "fixed", "value": 500, "minOrder": 3000, "maxDiscount": 0, "description": "₹500 flat discount on orders over ₹3,000"},
        "WELCOME15": {"type": "percentage", "value": 15, "minOrder": 0, "maxDiscount": 1500, "description": "15% welcome discount (Max ₹1,500)"},
        "ELANVIP": {"type": "percentage", "value": 20, "minOrder": 5000, "maxDiscount": 3000, "description": "20% VIP Atelier Privilege"},
    }

    coupon = None
    if db is not None:
        coupon = await db["coupons"].find_one({"code": code_clean, "isActive": True})

    if not coupon:
        if code_clean in DEFAULT_COUPONS:
            coupon = DEFAULT_COUPONS[code_clean]
            coupon["code"] = code_clean
        else:
            raise HTTPException(status_code=400, detail="Invalid or expired promotion code.")

    # Validation
    min_order = coupon.get("minOrder") or 0
    if min_order > 0 and data.subtotal < min_order:
        raise HTTPException(
            status_code=400,
            detail=f"This privilege code requires a minimum purchase value of ₹{min_order:,}."
        )

    # Calculate discount
    discount_amount = 0
    c_type = coupon.get("type", "percentage")
    c_val = float(coupon.get("value", 0))

    if c_type == "percentage":
        discount_amount = (data.subtotal * c_val) / 100
        max_discount = coupon.get("maxDiscount") or 0
        if max_discount > 0 and discount_amount > max_discount:
            discount_amount = max_discount
    else:
        discount_amount = c_val

    # Ensure discount does not exceed subtotal
    discount_amount = min(discount_amount, data.subtotal)

    return {
        "success": True,
        "discount": round(discount_amount, 2),
        "coupon": {
            "code": code_clean,
            "type": c_type,
            "value": c_val,
            "description": coupon.get("description", "Privilege code applied."),
        }
    }

@router.get("")
async def get_all_coupons():
    db = get_database()
    if db is None:
        return {"success": True, "data": []}

    coupons = await db["coupons"].find({}).to_list(length=100)
    return {"success": True, "data": [serialize_coupon(c) for c in coupons]}

@router.post("")
async def create_coupon(data: CouponCreate, admin: dict = Depends(get_current_admin)):
    db = get_database()
    c_dict = data.dict()
    c_dict["code"] = c_dict["code"].strip().upper()

    res = await db["coupons"].insert_one(c_dict)
    c_dict["_id"] = res.inserted_id
    return {"success": True, "data": serialize_coupon(c_dict)}

@router.delete("/{id}")
async def delete_coupon(id: str, admin: dict = Depends(get_current_admin)):
    db = get_database()
    query = {}
    try:
        query = {"_id": ObjectId(id)}
    except Exception:
        query = {"id": id}

    await db["coupons"].delete_one(query)
    return {"success": True, "message": "Coupon code deleted."}
