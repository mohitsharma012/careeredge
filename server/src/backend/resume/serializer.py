from pydantic import BaseModel
from typing import Optional, List
from fastapi import HTTPException
from pydantic import root_validator
from ..base.validators import is_valid_email
from ..base import response

class ExperienceSerializer(BaseModel):
    job_title: Optional[str] = None
    organization: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    is_current: Optional[bool] = False
    description: Optional[List[str]] = None

class EducationSerializer(BaseModel):
    degree: Optional[str] = None
    institution: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    is_current: Optional[bool] = False
    grade: Optional[str] = None

class CertificationSerializer(BaseModel):
    certification_name: Optional[str] = None
    issuing_organization: Optional[str] = None
    issue_date: Optional[str] = None

    


class ResumeCreateSerilizer(BaseModel):

    name: str
    email: str
    phone: Optional[str] = None
    location: Optional[str] = None
    linkedin: Optional[str] = None
    professional_title: Optional[str] = None
    summary: Optional[str] = None
    skills: Optional[List[str]] = None
    career_highlights: Optional[List[str]] = None
    experiences: Optional[List[ExperienceSerializer]] = None
    educations: Optional[List[EducationSerializer]] = None
    certifications: Optional[List[CertificationSerializer]] = None

    @root_validator(pre=True)
    def validate_email(cls, values):
        if not is_valid_email(values.get("email")):
            raise response.BadRequest("Invalid email Format")
        return values
    
    class config:
        from_attributes=True
    
    model_config = {
        "json_schema_extra":{
            "example": {
                "name": "John Doe",
                "email": "john@example.com",
                "phone": "1234567890",
                "location": "New York, USA",
                "linkedin": "https://linkedin.com/in/johndoe",
                "professional_title": "Software Engineer",
                "summary": "Experienced software engineer with a passion for problem-solving",
                "skills": ["Python", "FastAPI", "JavaScript"],
                "career_highlights": ["Led a team of 5 developers", "Reduced system response time by 30%"],
                "experiences": [
                    {
                        "job_title": "Senior Developer",
                        "organization": "Tech Solutions Inc.",
                        "start_date": "2020-01-01",
                        "end_date": "",
                        "is_current": True,
                        "description": ["Developed scalable APIs", "Managed team of junior developers"]
                    },
                    {
                        "job_title": "Developer",
                        "organization": "Code Masters",
                        "start_date": "2017-03-15",
                        "end_date": "2019-12-31",
                        "is_current": False,
                        "description": ["Implemented frontend features", "Optimized database queries"]
                    }
                ],
                "educations": [
                    {
                        "degree": "Master of Computer Science",
                        "institution": "Tech University",
                        "start_date": "2015-09-01",
                        "end_date": "2017-05-30",
                        "is_current": False,
                        "grade": "3.8 GPA"
                    }
                ],
                "certifications": [
                    {
                        "certification_name": "AWS Certified Developer",
                        "issuing_organization": "Amazon Web Services",
                        "issue_date": "2021-06-15"
                    }
                ]
            }
        }
    }


    
