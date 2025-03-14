"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import {
  Brain,
  Wand2,
  Download,
  Mail,
  Save,
  FileText,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

interface AIGenerationProps {
  onComplete: () => void;
}

export function AIGeneration({ onComplete }: AIGenerationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    "Analyzing Job Description",
    "Extracting Key Requirements",
    "Matching Skills",
    "Optimizing Content",
    "Enhancing ATS Score",
    "Finalizing Resume",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => {
          const next = prev + 1;
          if (next % (100 / steps.length) === 0) {
            setCurrentStep((prev) => prev + 1);
          }
          return next;
        });
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 1000);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [progress, onComplete]);

  return (
    <div className="min-h-screen bg-custom-lightest/30 flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 shadow-xl border border-custom-lightest"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="bg-custom-medium rounded-full p-4"
              >
                <Brain className="h-8 w-8 text-white" />
              </motion.div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Generating Smart Resume</h2>
            <p className="text-gray-600">
              Our AI is optimizing your resume for maximum impact
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="h-2 bg-custom-lightest rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-custom-medium"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="mt-2 text-right text-sm text-custom-medium font-medium">
              {progress}%
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-4 mb-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: index <= currentStep ? 1 : 0.5,
                  x: 0,
                }}
                className="flex items-center gap-3"
              >
                {index < currentStep ? (
                  <CheckCircle className="h-5 w-5 text-custom-dark" />
                ) : index === currentStep ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader size="sm" />
                  </motion.div>
                ) : (
                  <div className="h-5 w-5 rounded-full border-2 border-custom-light" />
                )}
                <span
                  className={
                    index <= currentStep
                      ? "text-custom-dark font-medium"
                      : "text-custom-light"
                  }
                >
                  {step}
                </span>
              </motion.div>
            ))}
          </div>

          {/* AI Processing Animation */}
          <div className="flex justify-center mb-8">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <div className="absolute inset-0 bg-custom-medium/20 rounded-full blur-xl" />
              <div className="relative bg-custom-medium/10 rounded-full p-8">
                <Wand2 className="h-12 w-12 text-custom-medium" />
              </div>
            </motion.div>
          </div>

          {/* Processing Message */}
          <div className="text-center text-sm text-custom-medium animate-pulse">
            Processing... Please wait while we optimize your resume
          </div>
        </motion.div>
      </div>
    </div>
  );
}