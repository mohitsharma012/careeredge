import * as z from "zod";

export const resumeSchema = z.object({
  personalInfo: z.object({
    fullName: z.string().min(1, "Full name is required"),
    title: z.string().min(1, "Professional title is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
    location: z.string().optional(),
    website: z.string().url("Invalid website URL").optional(),
  }),
  summary: z.string().optional(),
  experience: z.array(
    z.object({
      company: z.string().min(1, "Company name is required"),
      position: z.string().min(1, "Position is required"),
      startDate: z.string().min(1, "Start date is required"),
      endDate: z.string().optional(),
      current: z.boolean(),
      location: z.string().optional(),
      description: z.string().min(1, "Job description is required"),
      achievements: z.array(z.string()),
    })
  ),
  education: z.array(
    z.object({
      institution: z.string().min(1, "Institution name is required"),
      degree: z.string().min(1, "Degree is required"),
      field: z.string().min(1, "Field of study is required"),
      startDate: z.string().min(1, "Start date is required"),
      endDate: z.string().min(1, "End date is required"),
      gpa: z.string().optional(),
    })
  ),
  skills: z.array(
    z.object({
      name: z.string().min(1, "Skill name is required")
     
    })
  ),
  certifications: z.array(
    z.object({
      name: z.string().min(1, "Certification name is required"),
      authority: z.string().min(1, "Certification authority is required"),
      startDate: z.string().min(1, "Start date is required"),
      endDate: z.string().min(1, "End date is required"),
      url: z.string().optional(),
    })
  ),
  projects: z.array(
    z.object({
      name: z.string().min(1, "Project name is required"),
      description: z.string().min(1, "Project description is required"),
      startDate: z.string().min(1, "Start date is required"),
      endDate: z.string().optional(),
      current: z.boolean(),
    })
  ),
  achievements: z.array(
    z.object({
      title: z.string().min(1, "Achievement title is required"),
    })
  ),
});