"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Eye, Download, Sparkles, Clock } from "lucide-react";

export interface Template {
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
}

interface TemplateCardProps {
  template: Template;
  onPreview: (template: Template) => void;
  onUse: (template: Template) => void;
}

export function TemplateCard({ template, onPreview, onUse }: TemplateCardProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-transparent hover:border-blue-100">
      <CardHeader className="p-0">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={template.thumbnail}
            alt={template.name}
            className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
          />
          {template.featured && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 shadow-lg">
              <Sparkles className="h-4 w-4" />
              Featured
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span className="text-sm">Preview</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm">5 min setup</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-start justify-between mb-2">
            <CardTitle className="text-xl">{template.name}</CardTitle>
            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-yellow-700">{template.rating}</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{template.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {template.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              <span>{template.usageCount.toLocaleString()} uses</span>
            </div>
            <span className="text-blue-600">{template.industry}</span>
          </div>
        </motion.div>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex gap-3">
        <Button
          className="flex-1 bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-100 transition-all duration-300"
          onClick={() => onUse(template)}
        >
          Use Template
        </Button>
        <Button
          variant="outline"
          className="flex-1 hover:bg-blue-50 transition-colors"
          onClick={() => onPreview(template)}
        >
          Preview
        </Button>
      </CardFooter>
    </Card>
  );
}