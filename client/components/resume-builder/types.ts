export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  location: string;
  description: string;
  achievements: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface Skill {
  name: string;
}

export interface Certification {
  name: string;
  authority: string;
  startDate: string;
  endDate: string;
  url?: string;
}

export interface Project {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

export interface Achievement {
  title: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  certifications: Certification[];
  projects: Project[];
  achievements: Achievement[];
}

export interface Template {
  id: number;
  name: string;
  description: string;
  category: string;
  tags: string[];
  thumbnail: string;
  rating: number;
  usageCount: number;
  industry: string;
  featured: boolean;
}
