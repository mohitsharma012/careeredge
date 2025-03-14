"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Template } from "@/components/template-card";
import { TemplatePreviewModal } from "@/components/template-preview-modal";
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
    thumbnail: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&q=80",
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
    thumbnail: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=400&q=80",
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
    thumbnail: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=400&q=80",
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
    <div className={`space-y-8 ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-custom-medium to-custom-dark rounded-2xl p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white"
        >
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
            Resume Templates
            <Sparkles className="h-6 w-6" />
          </h2>
          <p className="text-custom-lightest">
            Choose from our professionally designed templates to create your perfect resume
          </p>
        </motion.div>
      </div>

      {/* Search and Filters */}
      <div className="sticky top-16 z-10 bg-white/80 backdrop-blur-xl p-6 rounded-xl shadow-sm border border-custom-lightest">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-custom-medium" />
            <Input
              placeholder="Search templates..."
              className="pl-10 border-custom-light focus:border-custom-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select
              className="px-4 py-2 border border-custom-light rounded-lg bg-white focus:border-custom-medium outline-none"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`whitespace-nowrap ${
                  selectedCategory === category.id
                    ? "bg-custom-medium text-white hover:bg-custom-dark"
                    : "border-custom-light text-custom-medium hover:bg-custom-lightest"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <Icon className="h-4 w-4 mr-2" />
                {category.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredTemplates.map((template) => (
            <motion.div
              key={template.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="group bg-white rounded-xl border border-custom-lightest overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[1/1.4142] relative">
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
                {template.featured && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-custom-medium to-custom-dark text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Sparkles className="h-4 w-4" />
                    Featured
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <Button
                      variant="ghost"
                      className="text-white hover:bg-white/20"
                      onClick={() => setPreviewTemplate(template)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button
                      className="bg-custom-medium hover:bg-custom-dark"
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
                <div className="flex flex-wrap gap-2">
                  {template.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-custom-lightest text-custom-medium rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    <span>{template.usageCount.toLocaleString()} uses</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>5 min setup</span>
                  </div>
                </div>
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