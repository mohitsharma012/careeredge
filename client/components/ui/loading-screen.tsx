"use client";

import { motion } from "framer-motion";
import { Brain } from "lucide-react";
import { Loader } from "./loader";

interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({ message = "Loading..." }: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 bg-custom-lightest/30 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 shadow-xl border border-custom-lightest text-center"
      >
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
        <h2 className="text-xl font-bold mb-2 text-custom-dark">{message}</h2>
        <div className="flex justify-center">
          <Loader size="lg" />
        </div>
      </motion.div>
    </div>
  );
}