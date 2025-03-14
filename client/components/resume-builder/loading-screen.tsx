"use client";

import { motion } from "framer-motion";
import { Save, CheckCircle } from "lucide-react";

interface LoadingScreenProps {
  message: string;
  status?: "loading" | "success";
}

export function LoadingScreen({ message, status = "loading" }: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          className="flex justify-center mb-6"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {status === "loading" ? (
            <motion.div
              className="bg-custom-medium rounded-full p-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Save className="h-8 w-8 text-white" />
            </motion.div>
          ) : (
            <motion.div
              className="bg-green-500 rounded-full p-4"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <CheckCircle className="h-8 w-8 text-white" />
            </motion.div>
          )}
        </motion.div>
        <motion.h2
          className="text-2xl font-bold mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {message}
        </motion.h2>
      </div>
    </div>
  );
}