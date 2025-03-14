"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Crown,
  Check,
  Zap,
  Brain,
  Star,
  Download,
  Users,
  FileText,
  ArrowRight,
} from "lucide-react";

interface SubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const plans = [
  {
    name: "Free",
    price: "0",
    description: "Perfect for getting started",
    features: [
      "2 Resume Templates",
      "Basic AI Suggestions",
      "Standard Export Formats",
      "Email Support",
    ],
    cta: "Current Plan",
    disabled: true,
  },
  {
    name: "Pro",
    price: "12",
    description: "Most popular for job seekers",
    features: [
      "All Resume Templates",
      "Advanced AI Optimization",
      "Priority Support",
      "Multiple Export Formats",
      "Custom Branding",
      "Team Collaboration",
    ],
    cta: "Upgrade Now",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "49",
    description: "For teams and organizations",
    features: [
      "Everything in Pro",
      "Custom Templates",
      "API Access",
      "Dedicated Support",
      "Analytics Dashboard",
      "SSO Integration",
    ],
    cta: "Contact Sales",
  },
];

export function SubscriptionDialog({ open, onOpenChange }: SubscriptionDialogProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgrade = async (plan: string) => {
    setSelectedPlan(plan);
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0">
        <DialogHeader className="p-6 pb-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-2"
          >
            <Crown className="h-6 w-6 text-yellow-500" />
            <DialogTitle className="text-2xl font-bold">
              Upgrade Your Resume Game
            </DialogTitle>
          </motion.div>
          <DialogDescription className="text-base">
            Choose the perfect plan to unlock advanced features and create stunning resumes
          </DialogDescription>
        </DialogHeader>

        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative bg-white rounded-xl border ${
                    plan.featured
                      ? "border-custom-medium shadow-xl shadow-custom-medium/10"
                      : "border-gray-200"
                  }`}
                >
                  {plan.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <div className="bg-custom-medium text-white px-3 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-3xl font-bold">${plan.price}</span>
                      <span className="text-gray-600">/month</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-6">{plan.description}</p>

                    <div className="space-y-3 mb-6">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-custom-medium" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      className={`w-full ${
                        plan.featured
                          ? "bg-custom-medium hover:bg-custom-dark"
                          : plan.disabled
                          ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                          : "bg-white border-2 border-custom-medium text-custom-medium hover:bg-custom-lightest"
                      }`}
                      onClick={() => handleUpgrade(plan.name)}
                      disabled={plan.disabled || isLoading}
                    >
                      {isLoading && selectedPlan === plan.name ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                        />
                      ) : (
                        <>
                          {plan.cta}
                          {!plan.disabled && <ArrowRight className="h-4 w-4 ml-2" />}
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Features Grid */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Brain, text: "AI-Powered Optimization" },
              { icon: Star, text: "Premium Templates" },
              { icon: Download, text: "Multiple Export Formats" },
              { icon: Users, text: "Team Collaboration" },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-2">
                  <feature.icon className="h-6 w-6 text-custom-medium" />
                </div>
                <span className="text-sm text-gray-600">{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}