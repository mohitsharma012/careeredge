import os
import shopify
from typing import List
from datetime import timedelta
from fastapi import APIRouter, status, Depends, Request
from fastapi.responses import JSONResponse, RedirectResponse
from sqlalchemy.orm import Session, joinedload
from fastapi.exceptions import HTTPException

from pydantic import BaseModel

from ..config.db import get_db
from ..base.auth import  create_access_token, create_refresh_token, verify_token
from ..base import response
from .models import Resume, Experience, Education, Certification
from .serializer import ResumeCreateSerilizer
from ..accounts.services import get_current_user
from ..accounts.models import User



resume_router = APIRouter()

@resume_router.post("/")
async def create_resume(
    request_data: ResumeCreateSerilizer,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    # Create a new resume
    resume = Resume(
        user_id=user.id,
        name=request_data.name,
        email=request_data.email,
        phone=request_data.phone,
        location=request_data.location,
        linkedin=request_data.linkedin,
        professional_title=request_data.professional_title,
        summary=request_data.summary,
        skills=request_data.skills,
        career_highlights=request_data.career_highlights
    )
    db.add(resume)
    db.flush()

    if request_data.experiences:
        for exp in request_data.experiences:
            experience = Experience(
                resume_id=resume.id,
                job_title=exp.job_title,
                organization=exp.organization,
                start_date=exp.start_date,
                end_date=exp.end_date,
                is_current=exp.is_current,
                description=exp.description
            )
            db.add(experience)

    if request_data.educations:
        for edu in request_data.educations:
            education = Education(
                resume_id=resume.id,
                degree=edu.degree,
                institution=edu.institution,
                start_date=edu.start_date,
                end_date=edu.end_date,
                is_current=edu.is_current,
                grade=edu.grade
            )
            db.add(education)
    if request_data.certifications:
        for cert in request_data.certifications:
            certification = Certification(
                resume_id=resume.id,
                certification_name=cert.certification_name,
                issuing_organization=cert.issuing_organization,
                issue_date=cert.issue_date
            )
            db.add(certification)
    db.commit()
    db.refresh(resume)
    return response.Ok("Resume created successfully")


@resume_router.get("/")
async def get_resumes(
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):

    # Get all resumes for the user
    # resumes = db.query(Resume).filter(Resume.user_id == user.id).join(Experience).join(Education).join(Certification).all()
    resumes = db.query(Resume).filter(Resume.user_id == user.id)\
        .options(
            joinedload(Resume.experiences),
            joinedload(Resume.educations),
            joinedload(Resume.certifications)
        ).all()
    
    return resumes

