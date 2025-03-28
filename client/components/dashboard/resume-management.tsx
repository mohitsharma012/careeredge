"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ResumePreviewDialog } from "@/components/resume-preview-dialog";
import {
  Plus,
  Search,
  Eye,
  Download,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
} from "lucide-react";

interface Resume {
  id: string;
  name: string;
  type: "uploaded" | "created";
  lastModified: string;
  status: "complete" | "incomplete" | "review";
  thumbnail: string;
  matchScore: number;
  views: number;
  downloads: number;
  keywords: string[];
}

// Add this interface to match the one expected by ResumePreviewDialog
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
import ResumeBuilder from "@/app/builder/page";



export function ResumeManagement() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(true);
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);


  const resumes: Resume[] = [
    {
      id: "1",
      name: "Software Engineer Resume",
      type: "created",
      lastModified: "2 hours ago",
      status: "complete",
      thumbnail: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&q=80",
      matchScore: 95,
      views: 145,
      downloads: 12,
      keywords: ["React", "Node.js", "TypeScript", "AWS"],
    },
    {
      id: "2",
      name: "Product Manager CV",
      type: "created",
      lastModified: "1 day ago",
      status: "review",
      thumbnail: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=400&q=80",
      matchScore: 88,
      views: 89,
      downloads: 8,
      keywords: ["Product Strategy", "Agile", "User Research"],
    },
  ];

  const filteredResumes = resumes.filter(
    (resume) => resume.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateFromScratch = () => {
    setIsCreateModalOpen(false);
    setIsBuilderOpen(true);
  };

  const handleFileUpload = (file: File) => {
    // Handle file upload logic here
    setIsCreateModalOpen(false);
    setIsBuilderOpen(true);
  };

  // Add this adapter function to convert Resume to SmartResume
  const mapResumeToSmartResume = (resume: Resume): SmartResume => {
    return {
      id: resume.id,
      title: resume.name,
      createdAt: resume.lastModified,
      matchScore: resume.matchScore,
      // Map the status values
      status: resume.status === "complete"
        ? "complete"
        : resume.status === "review"
          ? "optimizing"
          : "failed",
      template: "Modern Professional",
      views: resume.views,
      downloads: resume.downloads,
      thumbnail: resume.thumbnail,
      description: `${resume.name} optimized for job applications`,
      keywords: resume.keywords,
      atsScore: 85, // Default ATS score
    };
  };

  // Update the handlePreview function to use the adapter
  // const handlePreview = (resume: Resume) => {
  //   setSelectedResume(mapResumeToSmartResume(resume));
  //   setIsPreviewOpen(true);
  // };

  const handlePreview = (resume: Resume) => {
    setSelectedResume(resume);
    setIsPreviewOpen(true);
  };

  const handleOptimizeMore = () => {
    setIsOptimizing(true);
    // Add optimization logic here
  };



  return (
    <>
      {isCreateModalOpen ? (

        <ResumeBuilder builder={true} />
      ) : (

        <div className="space-y-8">
          {/* Header */}
          <div className="bg-custom-darker rounded-2xl p-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-2">Resume Builder</h1>
                  <p className="text-custom-lightest text-sm">Create and manage your professional resumes</p>
                </div>
                <Button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-white text-custom-darker mr-8 hover:bg-white/80"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Create New Resume
                </Button>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredResumes.map((resume) => (
                <motion.div
                  key={resume.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group bg-white rounded-xl border border-black/30 shadow-2xl  overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-[1/1.4142] relative">
                    <img
                      src={resume.thumbnail}
                      alt={resume.name}
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
                        <Button
                          variant="ghost"
                          className="text-white hover:text-white hover:bg-white/20"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-2">{resume.name}</h3>
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
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{resume.lastModified}</span>
                      </div>
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
            selectedResume={selectedResume as unknown as SmartResume}
            isOptimizing={isOptimizing}
            handleOptimizeMore={handleOptimizeMore}
            onSendEmail={() => {
              setIsPreviewOpen(false);
              setIsEmailDialogOpen(true);
            }}
          />

          {isCreateModalOpen && (

            <ResumeBuilder />
          )}

          {/* Create New Resume Dialog */}
          {/* <CreateResumeDialog
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onCreateFromScratch={handleCreateFromScratch}
        onUpload={handleFileUpload}
      /> */}
        </div>
      )}
    </>
  );
}