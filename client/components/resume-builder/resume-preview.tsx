"use client";

import { motion } from "framer-motion";
import { ResumeData } from "./types";
import { Mail, Phone, MapPin, Globe, Calendar, Award, Star, Download, Eye, Share2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResumePreviewProps {
  template: string;
  data: ResumeData;
  className?: string;
  showControls?: boolean;
  isPreview?: boolean;
}

export function ResumePreview({ 
  template, 
  data, 
  className = "", 
  showControls = false,
  isPreview = false 
}: ResumePreviewProps) {
  const containerClasses = isPreview 
    ? "max-h-[80vh] overflow-y-auto" 
    : "h-full";

  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}>
      {showControls && (
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white border-b border-custom-lightest">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="text-custom-medium border-custom-light">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline" size="sm" className="text-custom-medium border-custom-light">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" size="sm" className="text-custom-medium border-custom-light">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-custom-lightest rounded-full">
            <CheckCircle className="h-4 w-4 text-custom-medium" />
            <span className="text-sm font-medium text-custom-medium">ATS Optimized</span>
          </div>
        </div>
      )}

      <div className={`${containerClasses} p-8`}>
        {/* Header Section */}
        <header className="mb-8 border-b-2 border-custom-medium pb-6">
          <h1 className="text-4xl font-bold mb-2 text-custom-dark">
            {data.personalInfo.fullName || "Your Name"}
          </h1>
          <h2 className="text-xl text-custom-medium mb-4">
            {data.personalInfo.title || "Professional Title"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            {data.personalInfo.email && (
              <div className="flex items-center gap-2 text-custom-medium">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{data.personalInfo.email}</span>
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center gap-2 text-custom-medium">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{data.personalInfo.phone}</span>
              </div>
            )}
            {data.personalInfo.location && (
              <div className="flex items-center gap-2 text-custom-medium">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{data.personalInfo.location}</span>
              </div>
            )}
            {data.personalInfo.website && (
              <div className="flex items-center gap-2 text-custom-medium">
                <Globe className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{data.personalInfo.website}</span>
              </div>
            )}
          </div>
        </header>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Professional Summary */}
          {data.summary && (
            <section>
              <h3 className="text-lg font-bold mb-3 text-custom-dark flex items-center gap-2">
                <Award className="h-5 w-5 text-custom-medium flex-shrink-0" />
                Professional Summary
              </h3>
              <p className="text-custom-medium leading-relaxed whitespace-pre-wrap">
                {data.summary}
              </p>
            </section>
          )}

          {/* Experience Section */}
          {data.experience.length > 0 && (
            <section>
              <h3 className="text-lg font-bold mb-4 text-custom-dark flex items-center gap-2">
                <Star className="h-5 w-5 text-custom-medium flex-shrink-0" />
                Professional Experience
              </h3>
              <div className="space-y-6">
                {data.experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-4 border-l-2 border-custom-lightest"
                  >
                    <div className="absolute -left-[9px] top-0 w-4 h-4 bg-custom-medium rounded-full" />
                    <h4 className="font-semibold text-custom-dark">{exp.position}</h4>
                    <div className="text-custom-medium text-sm mb-2 flex items-center gap-2 flex-wrap">
                      <span className="font-medium">{exp.company}</span>
                      <span className="text-custom-light">•</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 flex-shrink-0" />
                        <span>{exp.startDate} - {exp.endDate || "Present"}</span>
                      </div>
                    </div>
                    <p className="text-custom-medium text-sm leading-relaxed whitespace-pre-wrap">
                      {exp.description}
                    </p>
                    {exp.achievements?.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="text-sm text-custom-medium flex items-start gap-2">
                            <span className="text-custom-dark mt-1">•</span>
                            <span className="flex-1">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Education Section */}
          {data.education.length > 0 && (
            <section>
              <h3 className="text-lg font-bold mb-4 text-custom-dark flex items-center gap-2">
                <Award className="h-5 w-5 text-custom-medium flex-shrink-0" />
                Education
              </h3>
              <div className="grid gap-4">
                {data.education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-l-2 border-custom-lightest pl-4 relative"
                  >
                    <div className="absolute -left-[9px] top-0 w-4 h-4 bg-custom-medium rounded-full" />
                    <h4 className="font-semibold text-custom-dark">
                      {edu.degree} in {edu.field}
                    </h4>
                    <div className="text-custom-medium text-sm flex items-center gap-2 flex-wrap">
                      <span className="font-medium">{edu.institution}</span>
                      <span className="text-custom-light">•</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 flex-shrink-0" />
                        <span>{edu.startDate} - {edu.endDate}</span>
                      </div>
                    </div>
                    {edu.gpa && (
                      <div className="text-sm text-custom-medium mt-1">GPA: {edu.gpa}</div>
                    )}
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Skills Section */}
          {data.skills.length > 0 && (
            <section>
              <h3 className="text-lg font-bold mb-4 text-custom-dark flex items-center gap-2">
                <Star className="h-5 w-5 text-custom-medium flex-shrink-0" />
                Skills
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(
                  data.skills.reduce((acc, skill) => {
                    if (!acc[skill.category]) {
                      acc[skill.category] = [];
                    }
                    acc[skill.category].push(skill);
                    return acc;
                  }, {} as Record<string, typeof data.skills>)
                ).map(([category, skills]) => (
                  <div key={category} className="space-y-3">
                    <h4 className="font-medium text-custom-dark text-sm">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                          className="px-3 py-1 bg-custom-lightest text-custom-medium rounded-full text-sm font-medium"
                        >
                          {skill.name}
                          <span className="text-custom-medium/70 text-xs ml-1">
                            • {skill.level}
                          </span>
                        </motion.span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}