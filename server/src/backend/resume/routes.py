import os
import shopify
from typing import List
from datetime import timedelta
from fastapi import APIRouter, status, Depends, Request
from fastapi.responses import JSONResponse, RedirectResponse
from sqlalchemy.orm import Session
from fastapi.exceptions import HTTPException

from pydantic import BaseModel

from ..config.db import get_db
from ..base.auth import  create_access_token, create_refresh_token, verify_token
from ..base import response
from .models import Resume, Experience, Education, Certification

from .models import Resume


resume_router = APIRouter()

@resume_router.post("/")
async def create_resume(request_data: Resume, db: Session = Depends(get_db)):
    resume = Resume(**request_data.dict())
    db.add(resume)
    db.commit()
    return response.Ok("Resume created successfully", {"resume_id": resume.id})
