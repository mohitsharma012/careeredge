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
import { FormSections } from "@/components/resume-builder/builder_form_data"


const sections: Section[] = FormSections;


interface ResumeSectionsProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function ResumeSections({ activeSection, onSectionChange }: ResumeSectionsProps) {
  const { resumeData } = useResumeStore();

  const isSectionFilled = (sectionId: string): boolean => {
    switch (sectionId) {
      case "personal":
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
    <div className="w-full py-2 bg-white">
      <div className="flex items-center justify-between  mx-auto">
        {sections.map((section, index) => (
          <div key={section.id} className="flex items-center relative">
            {/* Section Button */}
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSectionChange(section.id)}
              className={`flex items-center gap-2
                ${activeSection == section.id
                  ? "bg-custom-darker px-3 pr-9 py-2 rounded-3xl"
                  : index < sections.findIndex(s => s.id === activeSection)
                  ? "bg-custom-darker text-white px-3 pr-9 py-2 rounded-3xl"
                  : " px-3 pr-9 py-2 rounded-3xl bg-slate-200"

                } `}
            >
              {/* Icon Container */}
              <div
                className={cn(
                  "relative flex items-center justify-center w-7 h-7 rounded-full border-2 transition-all duration-300",
                  activeSection === section.id
                    ? " bg-white "
                    : index < sections.findIndex(s => s.id === activeSection)
                    ? "bg-white  text-black"
                    : "border-custom-light bg-white text-black"
                )}
              >
                {section.icon}
                
                {/* Completion Indicator */}
                {isSectionFilled(section.id) && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-custom-darkYellow rounded-full border-2 border-white" />
                )}
              </div>
              
              {/* Title */}
              <span className={cn(
                "text-sm font-medium whitespace-nowrap",
                activeSection === section.id
                  ? "text-white"
                  : index < sections.findIndex(s => s.id === activeSection)
                  ? "text-white"
                  : "text-black"
              )}>
                {section.title}
              </span>
            </motion.button>

            {/* Connecting Line */}
            {index < sections.length - 1 && (
              <div className="flex-1 mx-2">
                <div className={cn(
                  "h-[9px]",
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