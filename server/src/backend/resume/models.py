from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import relationship
from ..base.models import TimeStampedModel
from ..accounts.models import User

class Resume(TimeStampedModel):
    __tablename__ = "resumes"

    user_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String, nullable=False)
    job_title = Column(String, nullable=False)
    summary = Column(String, nullable=False)
    skills = Column(ARRAY(String), nullable=False)
    languages = Column(ARRAY(String), nullable=False)
    achievements = Column(ARRAY(String), nullable=False)

    user = relationship("User", back_populates="resumes")
    contact_information = relationship("ContactInformation", back_populates="resume")
    social_media = relationship("SocialMedia", back_populates="resume")
    education = relationship("Education", back_populates="resume")
    experience = relationship("Experience", back_populates="resume")
    certifications = relationship("Certification", back_populates="resume")

class ContactInformation(TimeStampedModel):
    __tablename__ = "contact_information"

    resume_id = Column(Integer, ForeignKey("resumes.id"))
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    address = Column(String, nullable=False)

    resume = relationship("Resume", back_populates="contact_information")

class SocialMedia(TimeStampedModel):
    __tablename__ = "social_media"

    resume_id = Column(Integer, ForeignKey("resumes.id"))
    linkedin = Column(String, nullable=False)
    github = Column(String, nullable=False)
    twitter = Column(String, nullable=False)
    facebook = Column(String, nullable=False)
    personal_website = Column(String, nullable=False)

    resume = relationship("Resume", back_populates="social_media")

class Education(TimeStampedModel):
    __tablename__ = "education"

    resume_id = Column(Integer, ForeignKey("resumes.id"))
    degree = Column(String, nullable=False)
    institution = Column(String, nullable=False)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    grade = Column(String, nullable=False)
    is_current = Column(Boolean, default=False)

    resume = relationship("Resume", back_populates="education")

class Experience(TimeStampedModel):
    __tablename__ = "experience"

    resume_id = Column(Integer, ForeignKey("resumes.id"))
    title = Column(String, nullable=False)
    company = Column(String, nullable=False)
    location = Column(String, nullable=False)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    responsibilities = Column(ARRAY(String), nullable=False)
    achivements = Column(ARRAY(String), nullable=False)
    is_current = Column(Boolean, default=False)

    resume = relationship("Resume", back_populates="experience")

class Certification(TimeStampedModel):
    __tablename__ = "certification"
    resume_id = Column(Integer, ForeignKey("resumes.id"))

    name = Column(String, nullable=False)
    institution = Column(String, nullable=False)
    issue_date = Column(DateTime, nullable=False)

    resume = relationship("Resume", back_populates="certifications")
   