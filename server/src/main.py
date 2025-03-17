import uvicorn
import logging
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from fastapi.security import OAuth2PasswordBearer

# from backend.routes import app_router
from .backend.config.db import Base, engine
from .backend.config.config import Config
from .backend.config.logger import LoggingMiddleware

print("Starting the FastAPI app...")
logging.getLogger("sqlalchemy.engine").setLevel(logging.WARNING)

version = "v1"

description = """
A REST API for a Shopify web service.

This REST API is able to;
- Create Subscription for the Products
- List all the Products
- List all the Collections
"""

app = FastAPI(
    title="Shopify App Backend",
    description=description,
    version=version,
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"/api/{version}/user/token")

# Middlewares
app.add_middleware(LoggingMiddleware)
app.add_middleware(SessionMiddleware, secret_key=Config.SESSION_SECRET_KEY)

# CORS settings
origins = Config.CORS_ORIGINS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create the database tables
Base.metadata.create_all(bind=engine)

# include the routers
# app.include_router(app_router, prefix=f"/api/{version}")


@app.get("/", tags=["Root"])
async def root():
    return {"message": "Welcome to Shopify App Backend!", "docs": "/docs"}

# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=8081)
