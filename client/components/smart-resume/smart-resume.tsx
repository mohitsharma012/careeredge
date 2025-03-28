"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Brain,
  Wand2,
  Target,
  FileText,
  CheckCircle,
  AlertCircle,
  Download,
  Eye,
  Mail,
  Clock,
  Share2,
  Sparkles,
  ArrowRight,
  Plus,
  ChevronDown,
  FileImage,
  Layout,
  Star,
  Users,
} from "lucide-react";
import { ResumePreviewDialog } from "@/components/resume-preview-dialog";

interface SmartResumeProps {
  onCreateNew: () => void;
}

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

export function SmartResume({ onCreateNew }: SmartResumeProps) {
  const [selectedResume, setSelectedResume] = useState<SmartResume | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(true);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);

  // Mock data for generated smart resumes
  const smartResumes: SmartResume[] = [
    {
      id: "1",
      title: "Senior Frontend Developer - Google",
      description: "Optimized for frontend development roles with focus on React and modern web technologies",
      createdAt: "2 hours ago",
      matchScore: 95,
      status: "complete",
      template: "Modern",
      views: 24,
      downloads: 3,
      thumbnail: "/templates/template_1.jpg",
      keywords: ["React", "TypeScript", "Frontend Architecture", "UI/UX"],
      atsScore: 92,
    },
    {
      id: "2",
      title: "Full Stack Engineer - Amazon",
      description: "Tailored for full-stack positions with emphasis on scalable systems and cloud technologies",
      createdAt: "1 day ago",
      matchScore: 88,
      status: "complete",
      template: "Professional",
      views: 18,
      downloads: 2,
      thumbnail: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=400&q=80",
      keywords: ["Node.js", "AWS", "System Design", "API Development"],
      atsScore: 89,
    },
  ];

  const handlePreview = (resume: SmartResume) => {
    setSelectedResume(resume);
    setIsPreviewOpen(true);
  };

  const handleOptimizeMore = async () => {
    setIsOptimizing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsOptimizing(false);
    // Update the resume with new optimization results
    if (selectedResume) {
      const updatedResume = {
        ...selectedResume,
        matchScore: Math.min(selectedResume.matchScore + 3, 100),
        atsScore: Math.min(selectedResume.atsScore + 4, 100),
      };
      setSelectedResume(updatedResume);
    }
  };

  return (
    <div className=" bg-custom-lightest/30">
      <div className="max-w-7xl mx-auto  space-y-8">
        {/* Header */}
        <div className="bg-custom-darker rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">Customized Resumes</h1>
              <p className="text-custom-lightest text-sm">
                AI-optimized resumes tailored for specific job positions
              </p>
            </div>
            <Button
              onClick={onCreateNew}
              className="bg-white text-custom-darker hover:bg-white/90"
            >
              <Plus className="h-5 w-5 mr-2" />
              Customize new resume
            </Button>
          </div>
        </div>

        {/* Generated Resumes */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {smartResumes.map((resume) => (
              <motion.div
                key={resume.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group bg-white rounded-xl border border-custom-lightest overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[1/1.4142] relative">
                  <img
                    src={resume.thumbnail}
                    alt={resume.title}
                    className="w-full h-full object-cover"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <Button
                        variant="ghost"
                        className="text-white hover:text-white hover:bg-white/20"
                        onClick={() => handlePreview(resume)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="text-white hover:text-white hover:bg-white/20"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                            <ChevronDown className="h-4 w-4 ml-2" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem>
                            <FileText className="h-4 w-4 mr-2" />
                            PDF Document
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="h-4 w-4 mr-2" />
                            Word Document
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileImage className="h-4 w-4 mr-2" />
                            Image (PNG)
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-2">{resume.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{resume.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        <span>{resume.downloads}</span>
                      </div>
                    </div>
                    <span>{resume.createdAt}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Preview Dialog */}
        <ResumePreviewDialog 
          isPreviewOpen={isPreviewOpen}
          setIsPreviewOpen={setIsPreviewOpen}
          selectedResume={selectedResume}
          isOptimizing={isOptimizing}
          handleOptimizeMore={handleOptimizeMore}
          onSendEmail={() => {
            setIsPreviewOpen(false);
            setIsEmailDialogOpen(true);
          }}
        />
        


        {/* Email Dialog */}
        <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send Resume to Email</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-4">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="flex-1 px-4 py-2 rounded-lg border border-custom-light focus:border-custom-medium outline-none"
                />
                <Button className="bg-custom-medium hover:bg-custom-dark">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}