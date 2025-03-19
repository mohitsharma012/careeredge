from fastapi import APIRouter, Request, HTTPException, Depends
from fastapi.responses import RedirectResponse
from authlib.integrations.starlette_client import OAuth
from starlette.middleware.sessions import SessionMiddleware
from ..config.config import Config
import jwt
from datetime import datetime, timedelta

google_router = APIRouter()

# Configure OAuth
oauth = OAuth()
oauth.register(
    name="google",
    client_id=Config.GOOGLE_CLIENT_ID,
    client_secret=Config.GOOGLE_CLIENT_SECRET,
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_kwargs={"scope": "openid email profile"},
)

# JWT configuration
JWT_SECRET = Config.JWT_SECRET_KEY
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION = 30  # minutes

# Simulated database (Replace with actual DB)
fake_db = {}

def create_jwt_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=JWT_EXPIRATION)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return encoded_jwt

@google_router.get("/login")
async def login(request: Request):
    """Redirect user to Google login."""
    redirect_uri = request.url_for("auth_callback")
    print(redirect_uri)
    return await oauth.google.authorize_redirect(request, redirect_uri)

@google_router.get("/callback")
async def auth_callback(request: Request):
    """Handle Google OAuth callback."""
    try:
        token = await oauth.google.authorize_access_token(request)
        
        # Instead of using parse_id_token, get user info directly
        user_info = await oauth.google.userinfo(token=token)

        if not user_info:
            raise HTTPException(status_code=400, detail="Failed to retrieve user info")
        
        email = user_info.get("email")
        if email not in fake_db:
            fake_db[email] = {"name": user_info.get("name"), "email": email}
        
        # Create JWT token
        access_token = create_jwt_token({"sub": email})
        
        # Redirect to home page with token
        response = RedirectResponse(url="/")
        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            max_age=1800,  # 30 minutes
            samesite="lax"
        )
        return response

    except Exception as e:
        # Add more detailed error logging
        print(f"Error in callback: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@google_router.get("/logout")
async def logout():
    """Logout user (Clear session)."""
    response = RedirectResponse(url="/")
    response.delete_cookie("access_token")
    return response