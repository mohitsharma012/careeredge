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

interface Resume {
  id: string;
  title: string;
  thumbnail: string;
  lastModified: string;
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

  const handleGenerateClick = () => {
    if (!selectedResume || !jobDescription) return;
    onGenerate();
  };

  return (
    <div className="min-h-screen bg-custom-lightest/30">
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-custom-medium to-custom-dark rounded-2xl p-8">
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
              <h1 className="text-3xl font-bold text-white mb-2">Create Smart Resume</h1>
              <p className="text-custom-lightest">
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
                        ? "border-custom-medium bg-custom-lightest"
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
                          <span>Modified {resume.lastModified}</span>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-custom-medium border-custom-light"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePreview(resume.id);
                            }}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-custom-medium border-custom-light"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                      {selectedResume === resume.id && (
                        <CheckCircle className="absolute top-4 right-4 h-5 w-5 text-custom-medium" />
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
              Generate Smart Resume
            </Button>
          </div>
        </div>

        {/* Preview Dialog */}
        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Resume Preview</DialogTitle>
            </DialogHeader>
            <div className="aspect-[1/1.4142] bg-white rounded-lg overflow-hidden">
              {selectedPreviewId && (
                <img
                  src={availableResumes.find(r => r.id === selectedPreviewId)?.thumbnail}
                  alt="Resume Preview"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
                Close
              </Button>
              <Button className="bg-custom-medium hover:bg-custom-dark">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}