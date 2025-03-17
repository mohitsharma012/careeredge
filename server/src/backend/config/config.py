from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    DATABASE_URL: str
    SESSION_SECRET_KEY: str
    JWT_SECRET_KEY: str
    CORS_ORIGINS: list[str]
    # SHOPIFY_API_KEY: str
    # SHOPIFY_API_SECRET: str
    BACKEND_URL: str

    model_config = SettingsConfigDict(env_file="../.env", extra="ignore")


Config = Settings()

