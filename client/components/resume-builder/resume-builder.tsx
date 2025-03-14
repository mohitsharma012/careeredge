"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ResumeForm } from "./resume-form";
import { ResumePreview } from "./resume-preview";
import { ResumeTemplateSelector } from "./resume-template-selector";
import { ResumeSections } from "./resume-form-sections";
import { LoadingScreen } from "./loading-screen";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
  Download,
  Share2,
  Undo,
  Redo,
  Save,
  Eye,
  ArrowLeft,
  Layout,
  FileText,
  Settings,
  ChevronDown,
} from "lucide-react";
import { useResumeStore } from "./store";
import { Template } from "@/components/template-card";
import { ResumeData } from "./types";

interface ResumeBuilderProps {
  template: Template;
  onBack?: () => void;
}

export function ResumeBuilder({ template, onBack }: ResumeBuilderProps) {
  const router = useRouter();
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");
  const [previewMode, setPreviewMode] = useState(false);
  const [activeSection, setActiveSection] = useState("personal");
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [currentData, setCurrentData] = useState<ResumeData | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"loading" | "success">("loading");
  const { resumeData, undoHistory, redoHistory } = useResumeStore();

  useEffect(() => {
    if (template) {
      setSelectedTemplateId(String(template.id));
    }
  }, [template]);

  useEffect(() => {
    setCurrentData(resumeData);
  }, [resumeData]);

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplateId(templateId);
    setIsTemplateDialogOpen(false);
  };

  const handleDataChange = (data: ResumeData) => {
    setCurrentData(data);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus("loading");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSaveStatus("success");
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to resume list
      router.push("/dashboard");
    } catch (error) {
      console.error("Error saving resume:", error);
    }
  };

  const calculateProgress = () => {
    if (!currentData) return 0;
    
    const sections = {
      personal: Object.values(currentData.personalInfo).filter(Boolean).length / 6,
      summary: currentData.summary ? 1 : 0,
      experience: currentData.experience.length > 0 ? 1 : 0,
      education: currentData.education.length > 0 ? 1 : 0,
      skills: currentData.skills.length > 0 ? 1 : 0,
    };
    
    const totalProgress = Object.values(sections).reduce((acc, val) => acc + val, 0);
    return (totalProgress / Object.keys(sections).length) * 100;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Loading Screen */}
      <AnimatePresence>
        {isSaving && (
          <LoadingScreen
            message={saveStatus === "loading" ? "Saving your resume..." : "Resume saved successfully!"}
            status={saveStatus}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center gap-4">
              {onBack && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBack}
                  className="text-gray-600"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              )}
              <div>
                <h1 className="text-xl font-semibold">Resume Builder</h1>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Progress value={calculateProgress()} className="w-32 h-2" />
                  <span>{Math.round(calculateProgress())}% Complete</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Layout className="h-4 w-4 mr-2" />
                    Change Template
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <ResumeTemplateSelector
                    selectedTemplate={selectedTemplateId}
                    onTemplateChange={handleTemplateChange}
                  />
                </DialogContent>
              </Dialog>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setPreviewMode(!previewMode)}
              >
                <Eye className="h-4 w-4 mr-2" />
                {previewMode ? "Edit" : "Preview"}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleSave}
                className="hidden md:flex"
                disabled={isSaving}
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? "Saving..." : "Save"}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {}}
                className="hidden md:flex"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {}}
                className="hidden md:flex"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="sticky top-16 z-40 w-full bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center py-2">
            <ResumeSections
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Form */}
          <AnimatePresence mode="wait">
            {!previewMode && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <ResumeForm 
                    activeSection={activeSection}
                    onDataChange={handleDataChange}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Right Panel - Preview */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`bg-white rounded-xl shadow-lg p-6 ${previewMode ? 'col-span-2' : ''}`}
          >
            <div className="aspect-[1/1.4142] bg-white shadow-lg rounded-lg overflow-hidden">
              <ResumePreview
                template={selectedTemplateId}
                data={currentData || resumeData}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}