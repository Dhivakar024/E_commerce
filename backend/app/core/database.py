from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from .config import settings
import logging

logger = logging.getLogger(__name__)

class Database:
    client: AsyncIOMotorClient = None
    db: AsyncIOMotorDatabase = None

db_instance = Database()

async def connect_to_mongo():
    try:
        db_instance.client = AsyncIOMotorClient(settings.MONGODB_URI)
        # Extract db name from URI or default
        db_name = settings.MONGODB_URI.split("/")[-1].split("?")[0] or "elan_atelier"
        db_instance.db = db_instance.client[db_name]
        logger.info(f"Connected to MongoDB database: {db_name}")
    except Exception as e:
        logger.error(f"Could not connect to MongoDB: {e}")

async def close_mongo_connection():
    if db_instance.client:
        db_instance.client.close()
        logger.info("Closed MongoDB connection")

def get_database() -> AsyncIOMotorDatabase:
    return db_instance.db
