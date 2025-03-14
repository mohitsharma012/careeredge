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
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  category: "Technical" | "Soft Skills" | "Languages" | "Tools";
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
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
