from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    DATABASE_URL: str 
    SESSION_SECRET_KEY: str
    JWT_SECRET_KEY: str
    CORS_ORIGINS: list[str]
    # SHOPIFY_API_KEY: str
    # SHOPIFY_API_SECRET: str
    BACKEND_URL: str
    FRONTEND_URL: str
    GOOGLE_CLIENT_ID : str = ""
    GOOGLE_CLIENT_SECRET : str = ""
    GOOGLE_REDIRECT_URI : str = ""
    SECRET_KEY : str

    model_config = SettingsConfigDict(env_file="../.env", extra="ignore")


Config = Settings()

