"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  FileText,
  Upload,
  Brain,
  Layout,
  ArrowRight,
  FileImage,
  Sparkles,
} from "lucide-react";

interface CreateResumeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateFromScratch: () => void;
  onUpload: (file: File) => void;
}

export function CreateResumeDialog({
  open,
  onOpenChange,
  onCreateFromScratch,
  onUpload,
}: CreateResumeDialogProps) {
  const [hoveredOption, setHoveredOption] = useState<"create" | "upload" | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl p-0 gap-0 overflow-hidden">
        <div className="relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-white/90 " />

          {/* Content */}
          <div className="relative p-8">
            <DialogHeader className="mb-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center  text-center mb-4"
              >
                <div className="bg-custom-darker rounded-2xl p-4">
                  <Brain className="h-8 w-8 text-white" />
                </div>
              </motion.div>
              <DialogTitle className="text-2xl text-center font-bold mb-2">
                Create New Resume
              </DialogTitle>
              <DialogDescription className="text-center text-gray-600">
                Choose how you want to start building your professional resume
              </DialogDescription>
            </DialogHeader>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Create from Scratch */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                onHoverStart={() => setHoveredOption("create")}
                onHoverEnd={() => setHoveredOption(null)}
                className="relative"
              >
                <button
                  onClick={onCreateFromScratch}
                  className="w-full h-full text-left"
                >
                  <div className="bg-custom-darker rounded-2xl p-6 border-2 border-custom-light hover:border-custom-medium transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="bg-custom-lightest rounded-xl p-3">
                        <Layout className="h-6 w-6 text-custom-darker" />
                      </div>
                      <div className="flex-1 text-white ">
                        <h3 className="font-medium text-lg mb-1 flex items-center gap-2">
                          Create from Scratch
                          <Sparkles className="h-4 w-4 text-custom-medium" />
                        </h3>
                        <p className="text-sm text-white/90 mb-4">
                          Start with a professional template and customize every detail
                        </p>
                        <div className="flex items-center text-sm text-white  ">
                          <span>Choose template</span>
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </motion.div>

              {/* Upload Existing */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                onHoverStart={() => setHoveredOption("upload")}
                onHoverEnd={() => setHoveredOption(null)}
                className="relative"
              >
                <button
                  onClick={() => document.getElementById("resume-upload")?.click()}
                  className="w-full h-full text-left"
                >
                  <div className="bg-white rounded-2xl p-6 border-2 border-custom-light hover:border-custom-medium transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="bg-custom-light rounded-xl p-3">
                        <Upload className="h-6 w-6 text-custom-darker" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">
                          Upload Existing Resume
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Import and enhance your existing resume with AI
                        </p>
                        <div className="flex items-center text-sm text-custom-medium">
                          <span>Select file</span>
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
                <input
                  id="resume-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </motion.div>
            </div>

            {/* Features List */}
            <div className="mt-8 pt-8 border-t border-custom-lightest">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Brain, text: "AI-Powered Optimization" },
                  { icon: FileText, text: "ATS-Friendly Templates" },
                  { icon: Layout, text: "Professional Designs" },
                  { icon: FileImage, text: "Multiple Export Formats" },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="flex justify-center mb-2">
                      <feature.icon className="h-5 w-5 text-custom-medium" />
                    </div>
                    <span className="text-sm text-gray-600">{feature.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}