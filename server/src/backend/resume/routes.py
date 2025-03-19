import os
from typing import List
from datetime import timedelta
from fastapi import APIRouter, status, Depends, Request
from fastapi.responses import JSONResponse, RedirectResponse
from sqlalchemy.orm import Session
from fastapi.exceptions import HTTPException

from .models import Resume
from ..config.db import get_db
from ..base.auth import  create_access_token, create_refresh_token, verify_token
from ..base import response

resume_router = APIRouter()