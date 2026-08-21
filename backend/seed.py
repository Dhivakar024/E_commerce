import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from passlib.context import CryptContext
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/elan_atelier")

SEED_PRODUCTS = [
    {
        "name": "Classic Linen Shirt",
        "slug": "classic-linen-shirt",
        "category": "Men",
        "subcategory": "Shirts",
        "description": "Crafted from premium 100% breathable organic European flax linen, this relaxed-fit shirt brings effortless sophistication to everyday dressing.",
        "shortDescription": "Tailored organic linen relaxed shirt.",
        "price": 2499,
        "compareAtPrice": 2999,
        "image": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80",
        "images": [
            "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1000&q=80",
        ],
        "sizes": ["XS", "S", "M", "L", "XL"],
        "colors": ["Beige", "White", "Black"],
        "colorHexes": [
            {"name": "Beige", "hex": "#d4c5b9"},
            {"name": "White", "hex": "#ffffff"},
            {"name": "Black", "hex": "#111111"},
        ],
        "tags": ["Linen", "Summer", "Classic", "Essentials"],
        "material": "100% Organic European Flax Linen",
        "fit": "Relaxed modern drape",
        "careInstructions": "Machine wash delicate or dry clean",
        "rating": 4.8,
        "reviewCount": 124,
        "stock": 15,
        "sku": "ELA-SHIRT-001",
        "isNew": True,
        "isFeatured": True,
        "isActive": True,
    },
    {
        "name": "Silk Blend Slip Dress",
        "slug": "silk-blend-slip-dress",
        "category": "Women",
        "subcategory": "Dresses",
        "description": "A timeless bias-cut silhouette woven from liquid silk-satin that drapes effortlessly across the contours of the body.",
        "shortDescription": "Liquid mulberry silk-satin bias midi dress.",
        "price": 4999,
        "compareAtPrice": 5999,
        "image": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80",
        "images": [
            "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
        ],
        "sizes": ["XS", "S", "M", "L"],
        "colors": ["Black", "Champagne", "Emerald"],
        "colorHexes": [
            {"name": "Black", "hex": "#1a1a1a"},
            {"name": "Champagne", "hex": "#f7e7ce"},
            {"name": "Emerald", "hex": "#0f5257"},
        ],
        "tags": ["Silk", "Evening", "Dresses", "Luxury"],
        "material": "92% Mulberry Silk, 8% Elastane",
        "fit": "Fluid bias silhouette",
        "careInstructions": "Specialist dry clean only",
        "rating": 4.9,
        "reviewCount": 98,
        "stock": 8,
        "sku": "ELA-DRSS-002",
        "isNew": True,
        "isFeatured": True,
        "isActive": True,
    },
    {
        "name": "Tailored Cashmere Overcoat",
        "slug": "tailored-cashmere-overcoat",
        "category": "Men",
        "subcategory": "Outerwear",
        "description": "Sculpted double-breasted coat rendered in pure Mongolian cashmere with pick-stitched peak lapels and horn buttons.",
        "shortDescription": "Mongolian double-faced cashmere overcoat.",
        "price": 12999,
        "compareAtPrice": 15499,
        "image": "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80",
        "images": [
            "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80",
        ],
        "sizes": ["S", "M", "L", "XL"],
        "colors": ["Camel", "Charcoal", "Black"],
        "colorHexes": [
            {"name": "Camel", "hex": "#c19a6b"},
            {"name": "Charcoal", "hex": "#36454f"},
            {"name": "Black", "hex": "#000000"},
        ],
        "tags": ["Cashmere", "Outerwear", "Winter", "Tailoring"],
        "material": "100% Grade-A Mongolian Cashmere",
        "fit": "Architectural tailored silhouette",
        "careInstructions": "Specialist dry clean only",
        "rating": 5.0,
        "reviewCount": 64,
        "stock": 5,
        "sku": "ELA-COAT-003",
        "isNew": False,
        "isFeatured": True,
        "isActive": True,
    },
    {
        "name": "Structured Leather Tote",
        "slug": "structured-leather-tote",
        "category": "Accessories",
        "subcategory": "Bags",
        "description": "Handcrafted in Florence using full-grain Tuscan vegetable-tanned leather, finished with palladium hardware.",
        "shortDescription": "Full-grain Tuscan calfskin structured tote.",
        "price": 7499,
        "compareAtPrice": 8999,
        "image": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80",
        "images": [
            "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80",
        ],
        "sizes": ["One Size"],
        "colors": ["Cognac", "Black", "Olive"],
        "colorHexes": [
            {"name": "Cognac", "hex": "#9a3820"},
            {"name": "Black", "hex": "#111111"},
            {"name": "Olive", "hex": "#556b2f"},
        ],
        "tags": ["Leather", "Bags", "Accessories", "Artisan"],
        "material": "100% Tuscan Full-Grain Calfskin Leather",
        "fit": "Structured everyday proportions",
        "careInstructions": "Wipe with soft leather conditioner",
        "rating": 4.8,
        "reviewCount": 84,
        "stock": 12,
        "sku": "ELA-BAG-004",
        "isNew": True,
        "isFeatured": True,
        "isActive": True,
    },
    {
        "name": "Pleated Wool Wide Trousers",
        "slug": "pleated-wool-wide-trousers",
        "category": "Women",
        "subcategory": "Trousers",
        "description": "High-waisted palazzo trousers tailored from lightweight virgin tropical wool featuring double reverse pleats.",
        "shortDescription": "High-waisted virgin wool pleated trousers.",
        "price": 3899,
        "compareAtPrice": 4599,
        "image": "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
        "images": [
            "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
        ],
        "sizes": ["XS", "S", "M", "L"],
        "colors": ["Cream", "Black", "Mocha"],
        "colorHexes": [
            {"name": "Cream", "hex": "#fffdd0"},
            {"name": "Black", "hex": "#1a1a1a"},
            {"name": "Mocha", "hex": "#4a3728"},
        ],
        "tags": ["Wool", "Trousers", "Tailoring", "Minimal"],
        "material": "100% Super 120s Virgin Wool",
        "fit": "High-rise wide leg",
        "careInstructions": "Dry clean only",
        "rating": 4.7,
        "reviewCount": 42,
        "stock": 10,
        "sku": "ELA-PANT-005",
        "isNew": False,
        "isFeatured": False,
        "isActive": True,
    },
    {
        "name": "Minimalist Chelsea Boots",
        "slug": "minimalist-chelsea-boots",
        "category": "Men",
        "subcategory": "Footwear",
        "description": "Hand-lasted Italian suede Chelsea boots with Goodyear welted leather soles and tonal elasticated side gussets.",
        "shortDescription": "Hand-lasted Italian suede Chelsea boots.",
        "price": 6499,
        "compareAtPrice": 7999,
        "image": "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=1000&q=80",
        "images": [
            "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=1000&q=80",
        ],
        "sizes": ["40", "41", "42", "43", "44"],
        "colors": ["Espresso", "Taupe", "Black"],
        "colorHexes": [
            {"name": "Espresso", "hex": "#3b2f2f"},
            {"name": "Taupe", "hex": "#877c75"},
            {"name": "Black", "hex": "#111111"},
        ],
        "tags": ["Footwear", "Leather", "Shoes", "Artisan"],
        "material": "Italian Calf Suede, Leather Sole",
        "fit": "Standard European width",
        "careInstructions": "Brush with suede crepe brush",
        "rating": 4.9,
        "reviewCount": 76,
        "stock": 14,
        "sku": "ELA-SHOE-006",
        "isNew": True,
        "isFeatured": False,
        "isActive": True,
    },
    {
        "name": "Sculpted Gold Signet Ring",
        "slug": "sculpted-gold-signet-ring",
        "category": "Accessories",
        "subcategory": "Jewelry",
        "description": "18k solid gold vermeil signet ring featuring a softly brushed architectural face and organic contoured band.",
        "shortDescription": "18k gold vermeil architectural signet ring.",
        "price": 1899,
        "compareAtPrice": 2499,
        "image": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80",
        "images": [
            "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80",
        ],
        "sizes": ["6", "7", "8", "9", "10"],
        "colors": ["Gold", "Silver"],
        "colorHexes": [
            {"name": "Gold", "hex": "#d4af37"},
            {"name": "Silver", "hex": "#c0c0c0"},
        ],
        "tags": ["Jewelry", "Gold", "Rings", "Accessories"],
        "material": "18k Gold Vermeil over 925 Sterling Silver",
        "fit": "Comfort-fit curved interior",
        "careInstructions": "Store in airtight velvet atelier pouch",
        "rating": 4.9,
        "reviewCount": 52,
        "stock": 20,
        "sku": "ELA-JWLR-007",
        "isNew": True,
        "isFeatured": True,
        "isActive": True,
    },
    {
        "name": "Merino Wool Ribbed Knitwear",
        "slug": "merino-wool-ribbed-knitwear",
        "category": "Women",
        "subcategory": "Knitwear",
        "description": "Heavyweight ribbed turtleneck spun from extrafine Australian merino wool with a relaxed silhouette and dropped shoulders.",
        "shortDescription": "Extrafine Australian merino wool turtleneck.",
        "price": 3499,
        "compareAtPrice": 4299,
        "image": "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=1000&q=80",
        "images": [
            "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=1000&q=80",
        ],
        "sizes": ["XS", "S", "M", "L"],
        "colors": ["Oatmeal", "Sage", "Charcoal"],
        "colorHexes": [
            {"name": "Oatmeal", "hex": "#e3dac9"},
            {"name": "Sage", "hex": "#9ca998"},
            {"name": "Charcoal", "hex": "#2f353b"},
        ],
        "tags": ["Merino", "Knitwear", "Winter", "Minimal"],
        "material": "100% Extrafine Australian Merino Wool",
        "fit": "Cozy relaxed fit",
        "careInstructions": "Hand wash cold, dry flat",
        "rating": 4.8,
        "reviewCount": 110,
        "stock": 18,
        "sku": "ELA-KNIT-008",
        "isNew": False,
        "isFeatured": True,
        "isActive": True,
    },
]

async def run_seed():
    print("[Python Seed]: Connecting to MongoDB...")
    client = AsyncIOMotorClient(MONGODB_URI)
    db_name = MONGODB_URI.split("/")[-1].split("?")[0] or "elan_atelier"
    db = client[db_name]

    # 1. Users
    await db["users"].delete_many({})
    admin_user = {
        "firstName": "Executive",
        "lastName": "Director",
        "email": os.getenv("ADMIN_SEED_EMAIL", "admin@lax360.com"),
        "phone": "9876543210",
        "password": pwd_context.hash(os.getenv("ADMIN_SEED_PASSWORD", "Admin@123456")),
        "role": "admin",
        "addresses": [],
        "wishlist": [],
        "createdAt": datetime.utcnow(),
    }
    customer_user = {
        "firstName": "Dhivakar",
        "lastName": "Client",
        "email": "customer@lax360.com",
        "phone": "9876543211",
        "password": pwd_context.hash("Customer@123456"),
        "role": "customer",
        "addresses": [],
        "wishlist": [],
        "createdAt": datetime.utcnow(),
    }
    await db["users"].insert_many([admin_user, customer_user])
    print("[Python Seed]: Users seeded (admin@lax360.com / Admin@123456).")

    # 2. Categories
    await db["categories"].delete_many({})
    categories = [
        {"name": "Women", "slug": "women", "description": "Fluid silhouettes and noble textiles.", "image": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80", "isActive": True},
        {"name": "Men", "slug": "men", "description": "Architectural tailoring and understated elegance.", "image": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80", "isActive": True},
        {"name": "New Arrivals", "slug": "new-arrivals", "description": "The seasonal preview collection.", "image": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80", "isActive": True},
        {"name": "Accessories", "slug": "accessories", "description": "Handcrafted leather goods and solid jewelry.", "image": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80", "isActive": True},
    ]
    await db["categories"].insert_many(categories)
    print("[Python Seed]: Categories seeded.")

    # 3. Products
    await db["products"].delete_many({})
    for p in SEED_PRODUCTS:
        p["createdAt"] = datetime.utcnow()
        p["updatedAt"] = datetime.utcnow()
    await db["products"].insert_many(SEED_PRODUCTS)
    print(f"[Python Seed]: {len(SEED_PRODUCTS)} Products seeded.")

    # 4. Coupons
    await db["coupons"].delete_many({})
    coupons = [
        {"code": "SAVE10", "type": "percentage", "value": 10, "minOrder": 0, "maxDiscount": 0, "description": "10% off your entire order", "isActive": True, "usageCount": 48},
        {"code": "FLAT500", "type": "fixed", "value": 500, "minOrder": 3000, "maxDiscount": 0, "description": "₹500 flat discount on orders over ₹3,000", "isActive": True, "usageCount": 22},
        {"code": "WELCOME15", "type": "percentage", "value": 15, "minOrder": 0, "maxDiscount": 1500, "description": "15% welcome discount (Max ₹1,500)", "isActive": True, "usageCount": 91},
        {"code": "ELANVIP", "type": "percentage", "value": 20, "minOrder": 5000, "maxDiscount": 3000, "description": "20% VIP Atelier Privilege", "isActive": True, "usageCount": 15},
    ]
    await db["coupons"].insert_many(coupons)
    print("[Python Seed]: Promotional coupons seeded.")

    # 5. Banners
    await db["banners"].delete_many({})
    banners = [
        {
            "title": "THE SEASON’S EDIT",
            "subtitle": "Elevate Your Everyday with Sculptural Elegance",
            "image": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80",
            "cta": "Explore Collection",
            "ctaUrl": "/shop",
            "priority": 1,
            "isActive": True,
        }
    ]
    await db["banners"].insert_many(banners)
    print("[Python Seed]: Storefront banners seeded.")

    print("[Python Seed Finished]: Database initialization completed successfully.")
    client.close()

if __name__ == "__main__":
    asyncio.run(run_seed())
