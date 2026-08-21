from pydantic_settings import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    PROJECT_NAME: str = "LAX360 PVT LTD Luxury E-Commerce API"
    VERSION: str = "1.0.0"
    API_PREFIX: str = "/api"
    PORT: int = 5000
    MONGODB_URI: str = "mongodb://localhost:27017/elan_atelier"
    JWT_SECRET: str = "elan_luxury_fashion_jwt_secret_key_2026_super_secure"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    CORS_ORIGINS: str = "http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173"
    ADMIN_SEED_EMAIL: str = "admin@elan.com"
    ADMIN_SEED_PASSWORD: str = "Admin@123456"

    @property
    def cors_origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",") if origin.strip()]

    class Config:
        env_file = ".env"
        extra = "allow"

settings = Settings()
