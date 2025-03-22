"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface ResumeTemplateSelectorProps {
  selectedTemplate: string;
  onTemplateChange: (template: string) => void;
}

const templates = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean and professional design with a modern touch",
    thumbnail: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=200&q=80",
  },
  {
    id: "classic",
    name: "Classic",
    description: "Traditional resume layout that never goes out of style",
    thumbnail: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=200&q=80",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and elegant design focusing on content",
    thumbnail: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=200&q=80",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and elegant design focusing on content",
    thumbnail: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=200&q=80",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and elegant design focusing on content",
    thumbnail: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=200&q=80",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and elegant design focusing on content",
    thumbnail: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=200&q=80",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and elegant design focusing on content",
    thumbnail: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=200&q=80",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and elegant design focusing on content",
    thumbnail: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=200&q=80",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and elegant design focusing on content",
    thumbnail: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=200&q=80",
  },
];

export function ResumeTemplateSelector({
  selectedTemplate,
  onTemplateChange,
}: ResumeTemplateSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-4 bg-white">
      {templates.map((template) => (
        <motion.div
          key={template.id}
          whileHover={{ scale: 1.02 }}
          className={`relative rounded-lg overflow-hidden cursor-pointer border-2 transition-colors ${
            selectedTemplate === template.id
              ? "border-blue-500"
              : "border-transparent hover:border-gray-200"
          }`}
          onClick={() => onTemplateChange(template.id)}
        >
          <img
            src={template.thumbnail}
            alt={template.name}
            className="w-full h-32 object-cover"
          />
          <div className="p-4">
            <h3 className="font-medium mb-1">{template.name}</h3>
            <p className="text-sm text-gray-600">{template.description}</p>
          </div>
          {selectedTemplate === template.id && (
            <div className="absolute top-2 right-2 bg-blue-500 text-white p-1 rounded-full">
              <Check className="h-6 w-6" />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}