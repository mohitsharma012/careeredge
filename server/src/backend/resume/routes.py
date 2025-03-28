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
from .serializer import ResumeCreateSerilizer, ResumeUpdateSerializer, OptimizeResumeSerializer
from ..accounts.services import get_current_user
from ..accounts.models import User

import openai



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


@resume_router.put("/")
async def update_resume(
    request_data: ResumeUpdateSerializer,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    # Check if the resume exists
    resume = db.query(Resume).filter(Resume.id == request_data.id, Resume.user_id == user.id).first()
    if not resume:
        raise response.BadRequest("Resume does not exist")
    
    # Update the resume
    resume.name = request_data.name
    resume.email = request_data.email
    resume.phone = request_data.phone
    resume.location = request_data.location
    resume.linkedin = request_data.linkedin
    resume.professional_title = request_data.professional_title
    resume.summary = request_data.summary
    resume.skills = request_data.skills
    resume.career_highlights = request_data.career_highlights

    db.commit()
    db.refresh(resume)
    return response.Ok("Resume updated successfully")

openai.api_key = "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"

from .prompt import prompt


def generate_cv_prompt(cv_text: str, jd_text: str) -> str:
    prompt = f"""You are my personal recruitment consultant and CV expert. Your task is to analyze the "My CV" section and the "Job Description" section provided below, then rework my CV to perfectly align with the Job Description. Ensure you capture all the relevant keywords, skills, and important elements from the Job Description.
        For the Professional Summary section, highlight my professional experiences, skills, and education so that it aligns with the Job Description in no more than 5 sentences.
        For the Key Skills/Areas of Expertise section, list the key skills required in the Job Description.
        For the Career Highlights section, showcase the most impactful accomplishments of my career as they relate to the Job Description.
        In the Work Experience section, each work experience entry must contain a Role Summary and Accomplishments. The Role Summary should be no more than 40 words and briefly describe the role and its objectives (for example, "Hired to lead a team of 6 in defining and executing SaaS product strategy, reporting to the VP of Marketing and responsible for driving business revenue growth"). The Accomplishments for each work experience must include a minimum of 5 highly impactful achievements that align with the Job Description, with at least 80% of these accomplishments including key metrics to demonstrate success. Each accomplishment should showcase my domain-specific knowledge and relevant work experience by highlighting the key skills, tools, and frameworks expressed in the Job Description and demonstrating how they have been applied in my work.
        At the end, provide a percentage alignment of the newly generated CV with the Job Description, ensuring the output is 100% aligned with the Job Description and 100% ATS compliant, while retaining the context of my work experience as shown in the "My CV" section.
        Output the final CV in markdown format without any additional formatting, and do not use any '#' or '*' symbols.
        "My CV" Section:
        {cv_text}
        "Job Description" Section:
        {jd_text}"""
    return prompt



@resume_router.post("/optimize_resume")
async def optimize_resume(
    request_data: OptimizeResumeSerializer,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    
    resume = db.query(Resume).filter(Resume.id == request_data.resume_id)\
        .options(
            joinedload(Resume.experiences),
            joinedload(Resume.educations),
            joinedload(Resume.certifications)
        ).first()
    
    
    if not resume:
        raise response.BadRequest("Resume does not exist")
    resume = {
        "name": resume.name,
        "email": resume.email,
        "phone": resume.phone,
        "location": resume.location,
        "linkedin": resume.linkedin,
        "professional_title": resume.professional_title,
        "summary": resume.summary,
        "skills": resume.skills,
        "career_highlights": resume.career_highlights
    }    

    prompt_text = prompt()
    resume_and_jd = f"""
    Resume: {resume}
    Job Description: {request_data.job_description}
    """


    print("OpenAI Response:")
    hi= generate_cv_prompt(resume, request_data.job_description)
    print("OpenAI Response Choices:")


    openai_response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": hi}
        ],
        temperature=0.7,
        max_tokens=1500,
        top_p=1,
        frequency_penalty=0,
    ) 

    print("OpenAI Response Choices:")
    print(openai_response)
    print("OpenAI Response Choices:")


    return response.Ok("Resume optimized successfully")



