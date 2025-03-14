"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader } from "@/components/ui/loader";
import { TemplatesSection } from "@/components/templates-section";
import {
  Download,
  Mail,
  Save,
  Wand2,
  ChevronDown,
  FileText,
  FileImage,
  Layout,
  ArrowRight,
} from "lucide-react";

interface GeneratedResumeProps {
  thumbnail: string;
  title: string;
  matchScore: number;
}

export function GeneratedResume({ thumbnail, title, matchScore }: GeneratedResumeProps) {
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState(thumbnail);

  const handleTemplateSelect = (template: any) => {
    setCurrentTemplate(template.thumbnail);
    setIsTemplateDialogOpen(false);
  };

  const handleOptimizeMore = async () => {
    setIsOptimizing(true);
    // Simulate optimization process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsOptimizing(false);
  };

  return (
    <div className="min-h-screen bg-custom-lightest/30">
      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Resume Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-custom-lightest p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTemplate}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="aspect-[1/1.4142] bg-white rounded-lg overflow-hidden shadow-lg"
                >
                  <img
                    src={currentTemplate}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Actions Sidebar */}
          <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl border border-custom-lightest p-6">
              <h2 className="text-xl font-semibold mb-2">{title}</h2>
              <div className="flex items-center gap-2 text-custom-medium">
                <Wand2 className="h-5 w-5" />
                <span className="font-medium">{matchScore}% Match Score</span>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-xl border border-custom-lightest p-6 space-y-4">
              <h3 className="font-medium mb-4">Actions</h3>

              {/* Change Template */}
              <Button
                className="w-full bg-custom-medium hover:bg-custom-dark"
                onClick={() => setIsTemplateDialogOpen(true)}
              >
                <Layout className="h-4 w-4 mr-2" />
                Change Template
              </Button>

              {/* Download */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="w-full bg-custom-dark hover:bg-custom-darkest">
                    <Download className="h-4 w-4 mr-2" />
                    Download As
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

              {/* Send to Email */}
              <Button
                variant="outline"
                className="w-full border-custom-light text-custom-medium hover:bg-custom-lightest"
                onClick={() => setIsEmailDialogOpen(true)}
              >
                <Mail className="h-4 w-4 mr-2" />
                Send to Email
              </Button>

              {/* Optimize More */}
              <Button
                variant="outline"
                className="w-full border-custom-light text-custom-medium hover:bg-custom-lightest"
                onClick={handleOptimizeMore}
                disabled={isOptimizing}
              >
                {isOptimizing ? (
                  <>
                    <Loader size="sm" className="mr-2" />
                    Optimizing...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4 mr-2" />
                    Optimize More
                  </>
                )}
              </Button>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-xl border border-custom-lightest p-6">
              <h3 className="font-medium mb-4">Resume Stats</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">ATS Score</div>
                  <div className="h-2 bg-custom-lightest rounded-full">
                    <motion.div
                      className="h-full bg-custom-medium rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "92%" }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                  <div className="text-right text-sm text-custom-medium mt-1">92%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Keyword Match</div>
                  <div className="h-2 bg-custom-lightest rounded-full">
                    <motion.div
                      className="h-full bg-custom-medium rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "88%" }}
                      transition={{ duration: 1, delay: 0.4 }}
                    />
                  </div>
                  <div className="text-right text-sm text-custom-medium mt-1">88%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Template Selection Dialog */}
      <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
        <DialogContent className="max-w-7xl">
          <DialogHeader>
            <DialogTitle>Choose a Template</DialogTitle>
          </DialogHeader>
          <TemplatesSection onTemplateSelect={handleTemplateSelect} />
        </DialogContent>
      </Dialog>

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
  );
}