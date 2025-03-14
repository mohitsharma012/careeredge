"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  User,
  Briefcase,
  GraduationCap,
  FileText,
  Star,
  Award,
} from "lucide-react";
import { useResumeStore } from "./store";

interface Section {
  id: string;
  icon: React.ReactNode;
  title: string;
}

const sections: Section[] = [
  {
    id: "contact",
    icon: <User className="h-4 w-4" />,
    title: "Contact Info",
  },
  {
    id: "experience",
    icon: <Briefcase className="h-4 w-4" />,
    title: "Experience",
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
    id: "skills",
    icon: <Star className="h-4 w-4" />,
    title: "Additional Skills",
  },
  {
    id: "objective",
    icon: <FileText className="h-4 w-4" />,
    title: "Career Objective",
  },
];

interface ResumeSectionsProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function ResumeSections({ activeSection, onSectionChange }: ResumeSectionsProps) {
  const { resumeData } = useResumeStore();

  const isSectionFilled = (sectionId: string): boolean => {
    switch (sectionId) {
      case "contact":
        return Object.values(resumeData.personalInfo).filter(Boolean).length >= 4;
      case "experience":
        return resumeData.experience.length > 0;
      case "education":
        return resumeData.education.length > 0;
      case "certifications":
        return true; // Add logic when certifications are implemented
      case "skills":
        return resumeData.skills.length > 0;
      case "objective":
        return resumeData.summary.length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="w-full px-4 py-6">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        {sections.map((section, index) => (
          <div key={section.id} className="flex items-center relative">
            {/* Section Button */}
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSectionChange(section.id)}
              className="flex flex-col items-center"
            >
              {/* Icon Container */}
              <div
                className={cn(
                  "relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300",
                  activeSection === section.id
                    ? "border-custom-medium bg-custom-medium text-white"
                    : index < sections.findIndex(s => s.id === activeSection)
                    ? "border-custom-dark bg-custom-dark text-white"
                    : "border-custom-light bg-white text-custom-light"
                )}
              >
                {section.icon}
                
                {/* Completion Indicator */}
                {isSectionFilled(section.id) && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-custom-darkest rounded-full border-2 border-white" />
                )}
              </div>
              
              {/* Title */}
              <span className={cn(
                "text-xs mt-2 font-medium whitespace-nowrap",
                activeSection === section.id
                  ? "text-custom-medium"
                  : index < sections.findIndex(s => s.id === activeSection)
                  ? "text-custom-dark"
                  : "text-custom-light"
              )}>
                {section.title}
              </span>
            </motion.button>

            {/* Connecting Line */}
            {index < sections.length - 1 && (
              <div className="flex-1 mx-2">
                <div className={cn(
                  "h-[2px]",
                  index < sections.findIndex(s => s.id === activeSection)
                    ? "bg-custom-dark"
                    : index === sections.findIndex(s => s.id === activeSection)
                    ? "bg-custom-medium"
                    : "bg-custom-light"
                )} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}