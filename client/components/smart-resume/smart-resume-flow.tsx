"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SmartResume } from "./smart-resume";
import { CreateSmartResume } from "./create-smart-resume";
import { AIGeneration } from "./ai-generation";
import { GeneratedResume } from "./generated-resume";

type FlowState = "list" | "create" | "generating" | "result";

interface GeneratedResult {
  title: string;
  thumbnail: string;
  matchScore: number;
}

export function SmartResumeFlow() {
  const [flowState, setFlowState] = useState<FlowState>("list");
  const [generatedResult, setGeneratedResult] = useState<GeneratedResult | null>(null);

  const handleStartCreate = () => {
    setFlowState("create");
  };

  const handleBack = () => {
    setFlowState("list");
  };

  const handleGenerate = () => {
    setFlowState("generating");
  };

  const handleGenerationComplete = () => {
    setGeneratedResult({
      title: "Software Engineer - Google",
      thumbnail: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&q=80",
      matchScore: 95,
    });
    setFlowState("result");
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={flowState}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen bg-custom-lightest/30"
      >
        {flowState === "create" && (
          <CreateSmartResume
            onBack={handleBack}
            onGenerate={handleGenerate}
          />
        )}
        {flowState === "generating" && (
          <AIGeneration onComplete={handleGenerationComplete} />
        )}
        {flowState === "result" && generatedResult && (
          <GeneratedResume
            title={generatedResult.title}
            thumbnail={generatedResult.thumbnail}
            matchScore={generatedResult.matchScore}
          />
        )}
        {flowState === "list" && (
          <SmartResume onCreateNew={handleStartCreate} />
        )}
      </motion.div>
    </AnimatePresence>
  );
}