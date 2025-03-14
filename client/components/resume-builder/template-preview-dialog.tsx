"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Download,
  Eye,
  FileText,
  Settings,
  Star,
  Users,
  CheckCircle,
  ArrowRight,
  Briefcase,
  Clock,
  Target,
} from "lucide-react";

interface Template {
  id: number;
  name: string;
  description: string;
  category: string;
  tags: string[];
  thumbnail: string;
  rating: number;
  usageCount: number;
  industry: string;
  featured?: boolean;
  setupTime?: string;
  atsScore?: number;
}

interface TemplatePreviewDialogProps {
  template: Template | null;
  onClose: () => void;
  onSelect: (template: Template) => void;
}

export function TemplatePreviewDialog({
  template,
  onClose,
  onSelect,
}: TemplatePreviewDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  if (!template) return null;

  const handleSelect = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    onSelect(template);
    setIsLoading(false);
  };

  return (
    <Dialog open={!!template} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl p-0 gap-0">
        <DialogHeader>
          <DialogTitle className="text-2xl p-6 border-b">
            {template.name}
          </DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-5 h-[80vh]">
          {/* Preview Panel */}
          <div className="md:col-span-3 bg-custom-lightest/30 p-6 overflow-y-auto">
            <div className="aspect-[1/1.4142] bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src={template.thumbnail}
                alt={template.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details Panel */}
          <div className="md:col-span-2 border-l border-custom-lightest p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Template Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-custom-lightest">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Target className="h-4 w-4" />
                    <span>ATS Score</span>
                  </div>
                  <p className="text-2xl font-semibold text-custom-medium">
                    {template.atsScore}%
                  </p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-custom-lightest">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Users className="h-4 w-4" />
                    <span>Usage</span>
                  </div>
                  <p className="text-2xl font-semibold text-custom-medium">
                    {template.usageCount.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Template Info */}
              <div className="bg-white p-4 rounded-xl border border-custom-lightest">
                <h3 className="font-medium mb-4">Template Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Briefcase className="h-4 w-4" />
                    <span>Best for {template.industry}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{template.setupTime} setup time</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <CheckCircle className="h-4 w-4" />
                    <span>ATS-friendly format</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="bg-white p-4 rounded-xl border border-custom-lightest">
                <h3 className="font-medium mb-4">Recommended For</h3>
                <div className="flex flex-wrap gap-2">
                  {template.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-custom-lightest text-custom-medium rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="bg-white p-4 rounded-xl border border-custom-lightest">
                <h3 className="font-medium mb-4">Key Features</h3>
                <div className="space-y-3">
                  {[
                    "Professional typography and layout",
                    "Customizable sections and colors",
                    "Multiple page formats supported",
                    "Easy to read and scan",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-600">
                      <CheckCircle className="h-4 w-4 text-custom-medium" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  className="flex-1 bg-custom-medium hover:bg-custom-dark"
                  onClick={handleSelect}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      Use Template
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}