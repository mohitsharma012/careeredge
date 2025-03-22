"use client";

import Image from 'next/image'
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Template } from "@/components/template-card";
import { TemplatePreviewModal } from "@/components/dashboard/template-preview-modal";
import { ResumeBuilder } from "@/components/resume-builder/resume-builder";
import {
  Search,
  Filter,
  SlidersHorizontal,
  Star,
  Eye,
  ArrowRight,
  CheckCircle,
  FileText,
  Briefcase,
  GraduationCap,
  Award,
  Layout,
  Sparkles,
  Download,
  Clock,
  Users,
} from "lucide-react";

const templates = [
  {
    id: 1,
    name: "Professional Executive",
    description: "Clean and modern template for senior positions",
    category: "Corporate",
    tags: ["Executive", "Management", "Professional"],
    thumbnail: "/templates/template_1.jpg",
    rating: 4.8,
    usageCount: 12453,
    industry: "Business",
    featured: true,
  },
  {
    id: 2,
    name: "Creative Portfolio",
    description: "Stand out with this creative design template",
    category: "Creative",
    tags: ["Design", "Creative", "Portfolio"],
    thumbnail: "/templates/template_1.jpg",
    rating: 4.7,
    usageCount: 8932,
    industry: "Creative Arts",
    featured: false,
  },
  {
    id: 3,
    name: "Tech Professional",
    description: "Modern template for IT and tech positions",
    category: "Technology",
    tags: ["Technology", "IT", "Development"],
    thumbnail: "/templates/template_1.jpg",
    rating: 4.9,
    usageCount: 15678,
    industry: "Technology",
    featured: true,
  },
];

const categories = [
  { id: "all", label: "All Templates", icon: Layout },
  { id: "featured", label: "Featured", icon: Sparkles },
  { id: "corporate", label: "Corporate", icon: Briefcase },
  { id: "creative", label: "Creative", icon: FileText },
  { id: "academic", label: "Academic", icon: GraduationCap },
  { id: "modern", label: "Modern", icon: Award },
];

interface TemplatesSectionProps {
  onTemplateSelect?: (template: Template) => void;
  className?: string;
}

export function TemplatesSection({ onTemplateSelect, className = "" }: TemplatesSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [sortBy, setSortBy] = useState("popular");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    setIsBuilderOpen(true);
    onTemplateSelect?.(template);
  };

  if (isBuilderOpen && selectedTemplate) {
    return <ResumeBuilder template={selectedTemplate} onBack={() => setIsBuilderOpen(false)} />;
  }

  const filteredTemplates = templates
    .filter(template => 
      (selectedCategory === "all" || 
       selectedCategory === "featured" ? template.featured : 
       template.category.toLowerCase() === selectedCategory) &&
      (template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
       template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "popular": return b.usageCount - a.usageCount;
        case "rating": return b.rating - a.rating;
        case "name": return a.name.localeCompare(b.name);
        default: return 0;
      }
    });

  return (
    <div className={`space-y-0 ${className} flex flex-col gap-7`}>
      {/* Header */}
      <div className="bg-custom-darker rounded-2xl p-7">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white"
        >
          <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">
            Resume Templates
            <Sparkles className="h-6 w-6" />
          </h2>
          <p className="text-custom-lightest text-sm">
            Choose from our professionally designed templates to create your perfect resume
          </p>
        </motion.div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredTemplates.map((template) => (
            <motion.div
              key={template.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="group  rounded-xl border border-black/30 shadow-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[1/1.4142] relative">
                <Image
                  src={template.thumbnail}
                  alt={template.name}
                  width={400}
                  height={565}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <Button
                      variant="ghost"
                      className="text-whiten border-white/20 bg-gray-300 hover:bg-white "
                      onClick={() => setPreviewTemplate(template)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button
                      className=" text-black hover:text-white  bg-custom-medium hover:bg-custom-darker"
                      onClick={() => handleTemplateSelect(template)}
                    >
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Use Template
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{template.name}</h3>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="h-4 w-4 fill-yellow-500" />
                    <span className="text-sm font-medium">{template.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Preview Modal */}
      <TemplatePreviewModal
        template={previewTemplate}
        onClose={() => setPreviewTemplate(null)}
        onSelect={handleTemplateSelect}
        onUse={() => {}}

      />
    </div>
  );
}