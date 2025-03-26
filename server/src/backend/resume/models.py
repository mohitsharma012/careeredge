from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, ARRAY
from sqlalchemy.orm import relationship
from ..config.db import Base
from ..base.models import TimeStampedModel

class Resume(TimeStampedModel):
    __tablename__ = 'resumes'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=True)
    location = Column(String, nullable=True)
    linkedin = Column(String, nullable=True)
    professional_title = Column(String, nullable=True)
    summary = Column(String, nullable=True)
    skills = Column(ARRAY(String), nullable=True)
    career_highlights = Column(ARRAY(String), nullable=True)


    user = relationship("User", back_populates="resumes")
    experiences = relationship("Experience", back_populates="resume", cascade="all, delete-orphan")
    educations = relationship("Education", back_populates="resume", cascade="all, delete-orphan")
    certifications = relationship("Certification", back_populates="resume", cascade="all, delete-orphan")
    

class Experience(TimeStampedModel):
    __tablename__ = 'experiences'

    id = Column(Integer, primary_key=True, index=True)
    resume_id = Column(Integer, ForeignKey('resumes.id'), nullable=False)
    job_title = Column(String, nullable=False)
    organization = Column(String, nullable=False)
    start_date = Column(String, nullable=False)
    end_date = Column(String, nullable=True)
    is_current = Column(Boolean, default=False)
    description = Column(ARRAY(String), nullable=True)

    resume = relationship("Resume", back_populates="experiences")

class Education(TimeStampedModel):
    __tablename__ = 'educations'

    id = Column(Integer, primary_key=True, index=True)
    resume_id = Column(Integer, ForeignKey('resumes.id'), nullable=False)
    degree = Column(String, nullable=False)
    institution = Column(String, nullable=False)
    start_date = Column(String, nullable=False)
    end_date = Column(String, nullable=True)
    is_current = Column(Boolean, default=False)
    grade = Column(String, nullable=True)

    resume = relationship("Resume", back_populates="educations")

class Certification(TimeStampedModel):
    __tablename__ = 'certifications'

    id = Column(Integer, primary_key=True, index=True)
    resume_id = Column(Integer, ForeignKey('resumes.id'), nullable=False)
    certification_name = Column(String, nullable=False)
    issuing_organization = Column(String, nullable=False)
    issue_date = Column(String, nullable=True)
    expiration_date = Column(String, nullable=True)

    resume = relationship("Resume", back_populates="certifications")