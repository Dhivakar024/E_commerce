from fastapi import APIRouter, HTTPException, status, Depends
from datetime import datetime
from bson import ObjectId
from ..core.database import get_database
from ..core.security import verify_password, get_password_hash, create_access_token, get_current_user
from ..schemas.auth import UserRegister, UserLogin, UserProfileUpdate, ForgotPasswordRequest, ResetPasswordRequest

router = APIRouter(prefix="/auth", tags=["Authentication"])

def serialize_user(user: dict) -> dict:
    return {
        "id": str(user.get("_id", user.get("id", ""))),
        "_id": str(user.get("_id", user.get("id", ""))),
        "firstName": user.get("firstName", ""),
        "lastName": user.get("lastName", ""),
        "email": user.get("email", ""),
        "phone": user.get("phone", ""),
        "role": user.get("role", "customer"),
        "addresses": user.get("addresses", []),
        "wishlist": user.get("wishlist", []),
        "createdAt": user.get("createdAt", datetime.utcnow()).isoformat() if isinstance(user.get("createdAt"), datetime) else user.get("createdAt", "")
    }

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register_user(data: UserRegister):
    db = get_database()
    if db is None:
        raise HTTPException(status_code=503, detail="Database connection unavailable")

    clean_email = data.email.strip().lower()
    existing = await db["users"].find_one({"email": clean_email})
    if existing:
        raise HTTPException(status_code=400, detail="An account with this email address already exists.")

    new_user = {
        "firstName": data.firstName.strip(),
        "lastName": data.lastName.strip(),
        "email": clean_email,
        "phone": data.phone.strip() if data.phone else "",
        "password": get_password_hash(data.password),
        "role": "customer",
        "addresses": [],
        "wishlist": [],
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow(),
    }

    res = await db["users"].insert_one(new_user)
    new_user["_id"] = res.inserted_id

    token = create_access_token({"sub": str(res.inserted_id), "email": clean_email, "role": "customer"})
    return {
        "success": True,
        "token": token,
        "user": serialize_user(new_user)
    }

@router.post("/login")
async def login_user(data: UserLogin):
    db = get_database()
    if db is None:
        raise HTTPException(status_code=503, detail="Database connection unavailable")

    clean_email = data.email.strip().lower()
    user = await db["users"].find_one({"email": clean_email})
    if not user or not verify_password(data.password, user.get("password", "")):
        raise HTTPException(status_code=401, detail="Invalid email address or password.")

    token = create_access_token({
        "sub": str(user["_id"]),
        "email": user["email"],
        "role": user.get("role", "customer")
    })

    return {
        "success": True,
        "token": token,
        "user": serialize_user(user)
    }

@router.get("/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    return {
        "success": True,
        "user": serialize_user(current_user)
    }

@router.put("/profile")
async def update_profile(data: UserProfileUpdate, current_user: dict = Depends(get_current_user)):
    db = get_database()
    updates = {}
    if data.firstName is not None:
        updates["firstName"] = data.firstName.strip()
    if data.lastName is not None:
        updates["lastName"] = data.lastName.strip()
    if data.phone is not None:
        updates["phone"] = data.phone.strip()
    updates["updatedAt"] = datetime.utcnow()

    await db["users"].update_one({"_id": ObjectId(current_user["id"])}, {"$set": updates})
    updated_user = await db["users"].find_one({"_id": ObjectId(current_user["id"])})
    return {
        "success": True,
        "user": serialize_user(updated_user)
    }

@router.post("/forgot-password")
async def forgot_password(data: ForgotPasswordRequest):
    return {
        "success": True,
        "message": "If that email is registered, password recovery instructions have been dispatched."
    }

@router.post("/reset-password")
async def reset_password(data: ResetPasswordRequest):
    db = get_database()
    if db is not None:
        clean_email = data.email.strip().lower()
        hashed = get_password_hash(data.newPassword)
        await db["users"].update_one(
            {"email": clean_email},
            {"$set": {"password": hashed, "updatedAt": datetime.utcnow()}}
        )
    return {
        "success": True,
        "message": "Password updated successfully. You may now sign in."
    }

@router.post("/logout")
async def logout_user():
    return {
        "success": True,
        "message": "Successfully logged out."
    }
