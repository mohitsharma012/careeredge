"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Template } from "@/components/template-card";
import {
  Star,
  Download,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  Eye,
  FileText,
  Settings,
} from "lucide-react";

interface TemplatePreviewModalProps {
  template: Template | null;
  onClose: () => void;
  onUse: (template: Template) => void; // Updated to accept a Template argument
  onSelect: (template: Template) => void;

}

export function TemplatePreviewModal({
  template,
  onClose,
  onUse,
}: TemplatePreviewModalProps) {
  const [activeTab, setActiveTab] = useState("preview");
  const [isLoading, setIsLoading] = useState(false);

  if (!template) return null;

  const handleUseTemplate = async () => {
    setIsLoading(true);
    // Simulate loading state
    await new Promise(resolve => setTimeout(resolve, 1000));
    onUse(template);
    setIsLoading(false);
  };

  return (
    <Dialog open={!!template} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl p-0 gap-0 bg-white rounded-xl overflow-hidden">
        <div className="grid md:grid-cols-5 h-[80vh]">
          {/* Preview Panel */}
          <div className="md:col-span-3 bg-gray-50 p-6 overflow-y-auto">
            <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
              <Image
                src={template.thumbnail}
                alt={template.name}
                width={550}
                height={733}
                layout="responsive"
              />
            </div>
          </div>

          {/* Action Panel */}
          <div className="md:col-span-2 border-l p-6 flex flex-col">
            <DialogHeader className="mb-6">
              <div className="flex items-start justify-between">
                <div>
                  <DialogTitle className="text-2xl font-bold mb-2">
                    {template.name}
                  </DialogTitle>
                  <DialogDescription className="text-gray-600">
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
            <div className="flex-1">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Template Info</h3>
                <div className="flex flex-wrap gap-2">
                  {template.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-blue-50 text-blue-700"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>


              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-medium mb-3">Key Features</h4>
                <ul className="space-y-2">
                  {[
                    "ATS-Optimized Layout",
                    "Professional Typography",
                    "Custom Sections",
                    "Easy to Customize",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-blue-700 mb-2">Pro Tips</h4>
                <ul className="space-y-2 text-sm text-blue-600">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 mt-1 flex-shrink-0" />
                    <span>Customize colors and fonts to match your style</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 mt-1 flex-shrink-0" />
                    <span>Add or remove sections based on your experience</span>
                  </li>
                </ul>
              </div>
            </div>

            <DialogFooter className="flex-shrink-0">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleUseTemplate}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2 ">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="h-4 w-4 border-2 border-white  border-t-transparent rounded-full"
                    />
                    Processing...
                  </span>
                ) : (
                  "Use Template"
                )}
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}