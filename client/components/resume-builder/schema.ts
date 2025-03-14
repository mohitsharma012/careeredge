import * as z from "zod";

export const resumeSchema = z.object({
  personalInfo: z.object({
    fullName: z.string().min(1, "Full name is required"),
    title: z.string().min(1, "Professional title is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
    location: z.string().min(1, "Location is required"),
    website: z.string().url("Invalid website URL").optional(),
  }),
  summary: z.string().min(1, "Professional summary is required"),
  experience: z.array(
    z.object({
      company: z.string().min(1, "Company name is required"),
      position: z.string().min(1, "Position is required"),
      startDate: z.string().min(1, "Start date is required"),
      endDate: z.string().optional(),
      current: z.boolean(),
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
      name: z.string().min(1, "Skill name is required"),
      level: z.enum(["Beginner", "Intermediate", "Advanced", "Expert"]),
      category: z.enum(["Technical", "Soft Skills", "Languages", "Tools"]),
    })
  ),
});