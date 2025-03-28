"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "@/components/ui/loader";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Brain,
  ArrowLeft,
  FileText,
  CheckCircle,
  Clock,
  Eye,
  Download,
  Wand2,
} from "lucide-react";
import { ResumePreviewDialog } from "@/components/resume-preview-dialog";

interface Resume {
  id: string;
  title: string;
  thumbnail: string;
  lastModified: string;
}

// Add interface to match what the ResumePreviewDialog expects
interface SmartResume {
  id: string;
  title: string;
  createdAt: string;
  matchScore: number;
  status: "optimizing" | "complete" | "failed";
  template: string;
  views: number;
  downloads: number;
  thumbnail: string;
  description: string;
  keywords: string[];
  atsScore: number;
}

interface CreateSmartResumeProps {
  onBack: () => void;
  onGenerate: () => void;
}

export function CreateSmartResume({ onBack, onGenerate }: CreateSmartResumeProps) {
  const [jobDescription, setJobDescription] = useState("");
  const [selectedResume, setSelectedResume] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedPreviewId, setSelectedPreviewId] = useState<string | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);

  // Mock data for available resumes
  const availableResumes: Resume[] = [
    {
      id: "1",
      title: "Software Engineer Resume",
      thumbnail: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&q=80",
      lastModified: "2 days ago",
    },
    {
      id: "2",
      title: "Full Stack Developer CV",
      thumbnail: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=400&q=80",
      lastModified: "1 week ago",
    },
  ];

  const handlePreview = (id: string) => {
    setSelectedPreviewId(id);
    setIsPreviewOpen(true);
  };

  const handleOptimizeMore = () => {
    setIsOptimizing(true);
    // Simulate optimization process
    setTimeout(() => {
      setIsOptimizing(false);
    }, 2000);
  };

  // Find the resume object based on the selected ID
  const getSelectedResumeForPreview = (): SmartResume | null => {
    if (!selectedPreviewId) return null;
    
    const resume = availableResumes.find(r => r.id === selectedPreviewId);
    if (!resume) return null;
    
    // Map to the format expected by ResumePreviewDialog
    return {
      id: resume.id,
      title: resume.title,
      createdAt: resume.lastModified,
      matchScore: 85, // Default values
      status: "complete",
      template: "Professional",
      views: 0,
      downloads: 0,
      thumbnail: resume.thumbnail,
      description: `${resume.title} for job applications`,
      keywords: ["Professional", "Modern", "Clean"], // Default keywords
      atsScore: 80
    };
  };

  const handleGenerateClick = () => {
    if (!selectedResume || !jobDescription) return;
    onGenerate();
  };

  return (
    <div className="min-h-screen bg-custom-lightest/30">
      <div className="max-w-7xl mx-auto ">
        {/* Header */}
        <div className="bg-custom-darker rounded-2xl p-7">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">Create Smart Resume</h1>
              <p className="text-custom-lightest text-sm">
                Let AI optimize your resume for the specific job
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Form */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-custom-lightest p-6">
              <h2 className="text-xl font-semibold mb-6">Job Description</h2>
              <div className="space-y-4">
                <Textarea
                  placeholder="Paste the job description here..."
                  className="min-h-[400px] resize-none border-custom-light focus:border-custom-medium"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Right Panel - Resume Selection */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-custom-lightest p-6">
              <h2 className="text-xl font-semibold mb-6">Select Base Resume</h2>
              <div className="grid gap-4">
                {availableResumes.map((resume) => (
                  <div
                    key={resume.id}
                    className={`relative rounded-xl border-2 transition-all cursor-pointer ${
                      selectedResume === resume.id
                        ? "border-custom-medium bg-custom-light/30"
                        : "border-custom-light hover:border-custom-medium"
                    }`}
                    onClick={() => setSelectedResume(resume.id)}
                  >
                    <div className="p-4 flex items-center gap-4">
                      <div className="h-32 w-24 rounded-lg overflow-hidden">
                        <img
                          src={resume.thumbnail}
                          alt={resume.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium mb-2">{resume.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span>Created {resume.lastModified}</span>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-custom-darker border-custom-darker"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePreview(resume.id);
                            }}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </Button>
                        
                        </div>
                      </div>
                      {selectedResume === resume.id && (
                        <CheckCircle className="absolute top-4 right-4 h-5 w-5 text-custom-moreDarker" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={handleGenerateClick}
              disabled={!selectedResume || !jobDescription}
              className="w-full bg-custom-medium hover:bg-custom-dark h-12"
            >
              <Wand2 className="h-5 w-5 mr-2" />
              Customize Resume
            </Button>
          </div>
        </div>

        {/* Preview Dialog */}
        <ResumePreviewDialog 
          isPreviewOpen={isPreviewOpen}
          setIsPreviewOpen={setIsPreviewOpen}
          selectedResume={getSelectedResumeForPreview()}
          isOptimizing={isOptimizing}
          handleOptimizeMore={handleOptimizeMore}
          onSendEmail={() => {
            setIsPreviewOpen(false);
            setIsEmailDialogOpen(true);
          }}
        />
        
      </div>
    </div>
  );
}