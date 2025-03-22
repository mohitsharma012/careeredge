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
      console.log("Saving resume data:", currentData);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      setSaveStatus("success");
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSaving(false);

      // Redirect to resume list
      router.push("/dashboard?section=resumes");
      // reload the page 
    } catch (error) {
      console.error("Error saving resume:", error);
    }
  };


  return (
    <div className="min-h-screen  flex flex-col bg-gray-50">
      {/* Loading Screen */}
      <AnimatePresence>
        {isSaving && (
          <LoadingScreen
            message={saveStatus === "loading" ? "Saving your resume..." : "Resume saved successfully!"}
            status={saveStatus}
          />
        )}
      </AnimatePresence>

      {/* {onBack && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-gray-600"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      )} */}




      {/* Navigation Bar */}
      <div className="sticky top-16 z-40 w-full">
        <div className=" mx-auto">
          <div className="flex items-center justify-center py-0">
            <ResumeSections
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-row-reverse w-full ">



        {/* Main Content */}
        <div className="mx-auto w-full flex">
          <div className="flex gap-3 w-full">
            {/* Left Panel - Form */}
                {!previewMode && (
            <div className="w-1/2">
              <AnimatePresence mode="wait" >
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className=""
                  >
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <ResumeForm
                        activeSection={activeSection}
                        onDataChange={handleDataChange}
                        setActiveSection={setActiveSection}
                      />
                    </div>
                  </motion.div>
              </AnimatePresence>

            </div>
                )}
            <div className={`w-1/2 ${previewMode && 'w-full'}`}>
              {/* Right Panel - Preview */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`bg-white rounded-xl flex flex-col-reverse shadow-lg p-2 ${previewMode ? 'col-span-2' : ''}`}
              >
                <div className="aspect-[1/1.4142] bg-white w-full shadow-lg rounded-lg overflow-hidden">
                  <ResumePreview
                    template={selectedTemplateId}
                    data={currentData || resumeData}
                  />
                </div>
                {/* topbar */}
                <div className=" flex  top-0 bg-white  ">
                  <div className="mx-auto flex w-auto">
                    <div className=" flex  items-center justify-between h-16">
                      <div className="flex w-auto gap-2">
                        <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
                          <DialogTrigger asChild>
                            <Button variant="outline" className="text-xs bg-custom-darker text-white">
                              <Layout className="h-4 w-4 mr-2" />
                              Change Template
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl bg-white max-h-[80%] overflow-y-auto">
                            <ResumeTemplateSelector
                              selectedTemplate={selectedTemplateId}
                              onTemplateChange={handleTemplateChange}
                            />
                          </DialogContent>
                        </Dialog>

                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs bg-custom-darker text-white"
                          onClick={() => setPreviewMode(!previewMode)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          {previewMode ? "Edit" : "Preview"}
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleSave}
                          className="hidden md:flex text-xs bg-custom-darker text-white"
                          disabled={isSaving}
                        >
                          <Save className="h-4 w-4 mr-2" />
                          {isSaving ? "Saving..." : "Save"}
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => { }}
                          className="hidden md:flex text-xs bg-custom-darker text-white"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => { }}
                          className="hidden md:flex text-xs bg-custom-darker text-white"
                        >
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>

          </div>
        </div>
      </div>

    </div>
  );
}