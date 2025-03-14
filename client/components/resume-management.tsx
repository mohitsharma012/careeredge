"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CreateResumeDialog } from "@/components/resume-builder/create-resume-dialog";
import { ResumeBuilderFlow } from "@/components/resume-builder/resume-builder-flow";
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

export function ResumeManagement() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);

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
  };

  if (isBuilderOpen) {
    return <ResumeBuilderFlow />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-custom-medium to-custom-dark rounded-2xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Resume Builder</h1>
            <p className="text-custom-lightest">Create and manage your professional resumes</p>
          </div>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-white text-custom-medium hover:bg-custom-lightest"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create New Resume
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-custom-medium" />
        <input
          type="text"
          placeholder="Search resumes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-custom-light focus:border-custom-medium outline-none"
        />
      </div>

      {/* Resumes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredResumes.map((resume) => (
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
                  alt={resume.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2">
                    <Star className="h-4 w-4 text-white" />
                    <span className="text-white text-sm">{resume.matchScore}% Match</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <Button
                      variant="ghost"
                      className="text-white hover:text-white hover:bg-white/20"
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

      {/* Create New Resume Dialog */}
      <CreateResumeDialog
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onCreateFromScratch={handleCreateFromScratch}
        onUpload={handleFileUpload}
      />
    </div>
  );
}