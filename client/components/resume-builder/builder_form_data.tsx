import React from "react";
import {
  User,
  Briefcase,
  GraduationCap,
  FileText,
  Star,
  Award,
  Globe,
  Layers,
  Activity,
  MessageSquare,
} from "lucide-react";

interface Section {
  id: string;
  icon: React.ReactNode;
  title: string;
}

export const FormSections: Section[] = [
  {
    id: "personal",
    icon: <User className="h-4 w-4" />,
    title: "Personal Info",
  },
  {
    id: "skills",
    icon: <Star className="h-4 w-4" />,
    title: "Skills",
  },
  {
    id: "experience",
    icon: <Briefcase className="h-4 w-4" />,
    title: "Work Experience",
  },
  {
    id: "education",
    icon: <GraduationCap className="h-4 w-4" />,
    title: "Education",
  },
  {
    id: "certifications",
    icon: <Award className="h-4 w-4" />,
    title: "Certifications",
  },
  {
    id: "projects",
    icon: <Layers className="h-4 w-4" />,
    title: "Projects",
  },
  {
    id: "other",
    icon: <Activity className="h-4 w-4" />,
    title: "Other",
  }

];



// export const sections = [
//   {
//     id: "personal",
//     icon: "User",
//     title: "Personal Info",
//   },
//   {
//     id: "contact",
//     icon: <User className="h-4 w-4" />,
//     title: "Contact Info",
//   },
//   {
//     id: "experience",
//     icon: <Briefcase className="h-4 w-4" />,
//     title: "Experience",
//   },
//   {
//     id: "education",
//     icon: <GraduationCap className="h-4 w-4" />,
//     title: "Education",
//   },
//   {
//     id: "certifications",
//     icon: <Award className="h-4 w-4" />,
//     title: "Certifications",
//   },
//   {
//     id: "skills",
//     icon: <Star className="h-4 w-4" />,
//     title: "Additional Skills",
//   },
//   {
//     id: "objective",
//     icon: <FileText className="h-4 w-4" />,
//     title: "Career Objective",
//   },
// ];