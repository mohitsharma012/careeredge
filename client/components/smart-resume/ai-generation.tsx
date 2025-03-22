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
    // Define progress segment per step
    const progressPerStep = 100 / steps.length;
    
    // Create intervals for smooth animation
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => {
          const next = Math.min(prev + 0.5, 100);
          
          // Calculate which step we should be on based on progress
          const expectedStep = Math.min(
            Math.floor(next / progressPerStep),
            steps.length - 1
          );
          
          // Update step if needed
          if (expectedStep > currentStep) {
            setCurrentStep(expectedStep);
          }
          
          // Complete the process when we reach 100%
          if (next === 100) {
            setTimeout(() => {
              onComplete();
            }, 1000);
          }
          
          return next;
        });
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [progress, steps.length, currentStep, onComplete]);

  return (
    <div className=" bg-custom-lightest/30 flex items-center justify-center">
      <div className="max-w-xl w-full mx-auto "
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-custom-medium rounded-2xl p-6 m-auto shadow-xl border h-1/3"
        >
          {/* Header */}
          <div className="text-center mb-4">
            <div className="flex justify-center mb-1">
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
                <Brain className="h-8 w-8 text-black" />
              </motion.div>
            </div>
            <h2 className="text-xl font-bold mb-2 text-black">Generating Smart Resume</h2>
            <p className="text-gray-600 text-sm">
              Our AI is optimizing your resume for maximum impact
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-4 flex">
            <div className="h-2 bg-custom-dark w-[90%] my-auto rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="mt-2 text-right text-sm my-auto mb-2.5 ms-4 text-custom-black font-medium">
              {progress}%
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-4 flex flex-col mb-8 text-center mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: index <= currentStep ? 1 : 0.5,
                  x: 0,
                }}
                className="flex mx-auto gap-3 text-center"
              >
                {index < currentStep ? (
                  <CheckCircle className="h-5 w-5 text-black " />
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
                      ? "text-black/80 font-medium"
                      : "text-black/50"
                  }
                >
                  {step}
                </span>
              </motion.div>
            ))}
          </div>

          {/* AI Processing Animation */}
          <div className="flex justify-center mb-4">
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
              <div className="absolute inset-0 bg-black/20 rounded-full blur-xl" />
              <div className="relative bg-white/80 rounded-full p-8">
                <Wand2 className="h-8 w-8 text-black/50" />
              </div>
            </motion.div>
          </div>

          {/* Processing Message */}
          <div className="text-center text-sm text-black/70 animate-pulse">
            Processing... Please wait while we optimize your resume
          </div>
        </motion.div>
      </div>
    </div>
  );
}