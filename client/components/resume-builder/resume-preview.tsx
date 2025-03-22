"use client";

import { motion } from "framer-motion";
import { ResumeData } from "./types";
import { Mail, Phone, MapPin, Globe, Calendar, Award, Star, Download, Eye, Share2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";


// Importing all the Templates
import Template1 from "@/templates/template-1";

interface ResumePreviewProps {
  template: string;
  data: ResumeData;
  className?: string;
  showControls?: boolean;
  isPreview?: boolean;
}

export function ResumePreview({ 
  template, 
  data, 
  className = "", 
  showControls = false,
  isPreview = false 
}: ResumePreviewProps) {
  const containerClasses = isPreview 
    ? "max-h-[80vh] overflow-y-auto" 
    : "h-full";

  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}>
      {showControls && (
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white border-b border-custom-lightest">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="text-custom-medium border-custom-light">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline" size="sm" className="text-custom-medium border-custom-light">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" size="sm" className="text-custom-medium border-custom-light">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-custom-lightest rounded-full">
            <CheckCircle className="h-4 w-4 text-custom-medium" />
            <span className="text-sm font-medium text-custom-medium">ATS Optimized</span>
          </div>
        </div>
      )}

      <Template1 ResumeData={data} />


      {/* Render the selected template */}
      {template === "template-1" && <Template1 ResumeData={data} />}



    </div>
  );
}