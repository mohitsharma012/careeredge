"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Template } from "./types";
import {
  Download,
  Eye,
  FileText,
  Settings,
  Star,
  Users,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

interface TemplatePreviewModalProps {
  template: Template | null;
  onClose: () => void;
  onSelect: (template: Template) => void;
  onUse: () => void; // Ensure this is correctly defined

}


export function TemplatePreviewModal({
  template,
  onClose,
  onSelect,
}: TemplatePreviewModalProps) {
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
      <DialogContent className="max-w-5xl p-0 gap-0">
        <div className="grid md:grid-cols-5 h-[80vh]">
          {/* Preview Panel */}
          <div className="md:col-span-3 bg-gray-50 p-6 overflow-y-auto">
            <DialogHeader className="mb-6">
              <div className="flex items-start justify-between">
                <div>
                  <DialogTitle className="text-2xl font-bold mb-2">
                    {template.name}
                  </DialogTitle>
                  <DialogDescription>
                    {template.description}
                  </DialogDescription>
                </div>
                <div className="flex items-center gap-1 px-3 py-1.5 bg-yellow-50 rounded-full">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium text-yellow-700">
                    {template.rating}
                  </span>
                </div>
              </div>
            </DialogHeader>

            <div className="aspect-[1/1.4142] bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={template.thumbnail}
                alt={template.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details Panel */}
          <div className="md:col-span-2 border-l p-6 flex flex-col">
            <div className="flex-1">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Template Features</h3>
                <div className="space-y-4">
                  {[
                    { icon: <FileText className="h-4 w-4" />, text: "ATS-Friendly Format" },
                    { icon: <Settings className="h-4 w-4" />, text: "Customizable Sections" },
                    { icon: <Users className="h-4 w-4" />, text: "Professional Design" },
                    { icon: <Download className="h-4 w-4" />, text: "Multiple Export Formats" },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 text-gray-600">
                      {feature.icon}
                      <span>{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Perfect For</h3>
                <div className="space-y-2">
                  {[
                    "Senior Professionals",
                    "Career Changers",
                    "Recent Graduates",
                    "Executive Positions",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-blue-700 mb-2">Pro Tips</h4>
                <ul className="space-y-2 text-sm text-blue-600">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 mt-1 flex-shrink-0" />
                    <span>Customize colors to match your industry</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 mt-1 flex-shrink-0" />
                    <span>Keep sections organized and concise</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button
                onClick={handleSelect}
                disabled={isLoading}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  "Use Template"
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}