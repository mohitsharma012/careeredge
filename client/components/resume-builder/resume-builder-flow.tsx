"use client";

import { useState } from "react";
import { TemplatesSection } from "@/components/dashboard/templates-section";
import { ResumeBuilder } from "./resume-builder";

type FlowState = "select-template" | "build-resume";

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
}

export function ResumeBuilderFlow() {
  const [flowState, setFlowState] = useState<FlowState>("select-template");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    setFlowState("build-resume");
  };

  const handleBack = () => {
    setFlowState("select-template");
    setSelectedTemplate(null);
  };

  switch (flowState) {
    case "build-resume":
      return selectedTemplate ? (
        <ResumeBuilder
          template={selectedTemplate}
          onBack={handleBack}
        />
      ) : null;
    default:
      return (
        <TemplatesSection
          onTemplateSelect={handleTemplateSelect}
        />
      );
  }
}