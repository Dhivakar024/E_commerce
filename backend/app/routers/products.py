from fastapi import APIRouter, HTTPException, status, Depends, Query
from typing import Optional, List
from datetime import datetime
from bson import ObjectId
from ..core.database import get_database
from ..core.security import get_current_admin
from ..schemas.product import ProductCreate, ProductUpdate

router = APIRouter(prefix="/products", tags=["Products"])

def serialize_product(p: dict) -> dict:
    return {
        "id": str(p.get("_id", p.get("id", ""))),
        "_id": str(p.get("_id", p.get("id", ""))),
        "name": p.get("name", ""),
        "slug": p.get("slug", ""),
        "description": p.get("description", ""),
        "shortDescription": p.get("shortDescription", ""),
        "category": p.get("category", ""),
        "subcategory": p.get("subcategory", ""),
        "price": p.get("price", 0),
        "compareAtPrice": p.get("compareAtPrice"),
        "image": p.get("image", ""),
        "images": p.get("images", []),
        "sizes": p.get("sizes", []),
        "colors": p.get("colors", []),
        "colorHexes": p.get("colorHexes", []),
        "tags": p.get("tags", []),
        "material": p.get("material", "100% Noble Natural Fibers"),
        "fit": p.get("fit", "Tailored drape; true to size"),
        "careInstructions": p.get("careInstructions", "Specialist dry clean"),
        "rating": p.get("rating", 5.0),
        "reviewCount": p.get("reviewCount", 0),
        "stock": p.get("stock", 10),
        "sku": p.get("sku", ""),
        "isNew": p.get("isNew", False),
        "isFeatured": p.get("isFeatured", False),
        "isActive": p.get("isActive", True),
        "createdAt": p.get("createdAt", datetime.utcnow()).isoformat() if isinstance(p.get("createdAt"), datetime) else p.get("createdAt", "")
    }

@router.get("")
async def get_products(
    category: Optional[str] = None,
    search: Optional[str] = None,
    sort: Optional[str] = "featured",
    minPrice: Optional[float] = None,
    maxPrice: Optional[float] = None,
    inStock: Optional[bool] = None,
    featured: Optional[bool] = None,
    page: int = Query(1, ge=1),
    limit: int = Query(50, ge=1, le=100)
):
    db = get_database()
    if db is None:
        return {"success": True, "count": 0, "data": []}

    query = {}
    if category and category.lower() != "all":
        cat_clean = category.replace("-", " ")
        query["category"] = {"$regex": f"^{cat_clean}$", "$options": "i"}

    if search and search.strip():
        q_clean = search.strip()
        query["$or"] = [
            {"name": {"$regex": q_clean, "$options": "i"}},
            {"description": {"$regex": q_clean, "$options": "i"}},
            {"category": {"$regex": q_clean, "$options": "i"}},
            {"tags": {"$regex": q_clean, "$options": "i"}},
            {"sku": {"$regex": q_clean, "$options": "i"}},
        ]

    if minPrice is not None or maxPrice is not None:
        price_query = {}
        if minPrice is not None:
            price_query["$gte"] = minPrice
        if maxPrice is not None:
            price_query["$lte"] = maxPrice
        query["price"] = price_query

    if inStock is True:
        query["stock"] = {"$gt": 0}

    if featured is True:
        query["isFeatured"] = True

    sort_field = [("createdAt", -1)]
    if sort == "price-asc":
        sort_field = [("price", 1)]
    elif sort == "price-desc":
        sort_field = [("price", -1)]
    elif sort == "newest":
        sort_field = [("isNew", -1), ("createdAt", -1)]
    elif sort == "name-asc":
        sort_field = [("name", 1)]
    elif sort == "name-desc":
        sort_field = [("name", -1)]
    elif sort == "featured":
        sort_field = [("isFeatured", -1), ("rating", -1)]

    skip = (page - 1) * limit
    cursor = db["products"].find(query).sort(sort_field).skip(skip).limit(limit)
    raw_products = await cursor.to_list(length=limit)
    total = await db["products"].count_documents(query)

    return {
        "success": True,
        "count": len(raw_products),
        "total": total,
        "page": page,
        "pages": (total + limit - 1) // limit if total > 0 else 1,
        "data": [serialize_product(p) for p in raw_products]
    }

@router.get("/categories/list")
async def get_product_categories():
    db = get_database()
    if db is None:
        return {"success": True, "data": []}
    categories = await db["products"].distinct("category")
    return {"success": True, "data": categories}

@router.get("/slug/{slug}")
async def get_product_by_slug(slug: str):
    db = get_database()
    if db is None:
        raise HTTPException(status_code=404, detail="Product not found")

    p = await db["products"].find_one({"slug": slug})
    if not p:
        # Check if slug is an id
        try:
            p = await db["products"].find_one({"_id": ObjectId(slug)})
        except Exception:
            pass

    if not p:
        raise HTTPException(status_code=404, detail="Product silhouette not found in atelier archives.")

    return {"success": True, "data": serialize_product(p)}

@router.get("/{id}")
async def get_product_by_id(id: str):
    db = get_database()
    if db is None:
        raise HTTPException(status_code=404, detail="Product not found")

    p = None
    try:
        p = await db["products"].find_one({"_id": ObjectId(id)})
    except Exception:
        p = await db["products"].find_one({"id": id})

    if not p:
        p = await db["products"].find_one({"slug": id})

    if not p:
        raise HTTPException(status_code=404, detail="Product silhouette not found.")

    return {"success": True, "data": serialize_product(p)}

@router.post("", status_code=status.HTTP_201_CREATED)
async def create_product(data: ProductCreate, admin: dict = Depends(get_current_admin)):
    db = get_database()
    product_dict = data.dict()
    if not product_dict.get("slug"):
        product_dict["slug"] = data.name.lower().strip().replace(" ", "-")

    product_dict["createdAt"] = datetime.utcnow()
    product_dict["updatedAt"] = datetime.utcnow()

    res = await db["products"].insert_one(product_dict)
    product_dict["_id"] = res.inserted_id
    return {"success": True, "data": serialize_product(product_dict)}

@router.put("/{id}")
async def update_product(id: str, data: ProductUpdate, admin: dict = Depends(get_current_admin)):
    db = get_database()
    updates = {k: v for k, v in data.dict().items() if v is not None}
    updates["updatedAt"] = datetime.utcnow()

    query = {}
    try:
        query = {"_id": ObjectId(id)}
    except Exception:
        query = {"id": id}

    await db["products"].update_one(query, {"$set": updates})
    updated = await db["products"].find_one(query)
    if not updated:
        raise HTTPException(status_code=404, detail="Product not found")

    return {"success": True, "data": serialize_product(updated)}

@router.delete("/{id}")
async def delete_product(id: str, admin: dict = Depends(get_current_admin)):
    db = get_database()
    query = {}
    try:
        query = {"_id": ObjectId(id)}
    except Exception:
        query = {"id": id}

    res = await db["products"].delete_one(query)
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")

    return {"success": True, "message": "Product silhouette archived."}
