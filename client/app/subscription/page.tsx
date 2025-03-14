"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
} from "lucide-react";

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

const features = [
  {
    icon: Brain,
    title: "AI-Powered Optimization",
    description: "Smart suggestions to improve your resume content",
  },
  {
    icon: Star,
    title: "Premium Templates",
    description: "Access to professionally designed templates",
  },
  {
    icon: Download,
    title: "Multiple Export Formats",
    description: "Export to PDF, Word, and more formats",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Work together with your team on resumes",
  },
];

const usageStats = [
  {
    label: "Active Subscription",
    value: "Free Plan",
    icon: Crown,
    color: "text-gray-600",
  },
  {
    label: "Next Billing Date",
    value: "N/A",
    icon: Clock,
    color: "text-blue-600",
  },
  {
    label: "Templates Used",
    value: "2/2",
    icon: FileText,
    color: "text-yellow-600",
  },
  {
    label: "AI Credits",
    value: "10/10",
    icon: Brain,
    color: "text-purple-600",
  },
];

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgrade = async (plan: string) => {
    setSelectedPlan(plan);
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-yellow-100 rounded-xl">
              <Crown className="h-6 w-6 text-yellow-600" />
            </div>
            <h1 className="text-3xl font-bold">Subscription</h1>
          </div>
          <p className="text-gray-600">
            Manage your subscription and unlock premium features
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Current Plan Stats */}
        <div className="bg-white rounded-xl border p-6">
          <h2 className="text-xl font-semibold mb-6">Current Subscription</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {usageStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-4"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`${stat.color}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm text-gray-600">{stat.label}</span>
                </div>
                <p className="text-xl font-semibold">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div className="bg-white rounded-xl border p-6">
          <h2 className="text-xl font-semibold mb-6">Available Plans</h2>
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
        </div>

        {/* Features */}
        <div className="bg-white rounded-xl border p-6">
          <h2 className="text-xl font-semibold mb-6">Premium Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-custom-lightest rounded-lg">
                    <feature.icon className="h-5 w-5 text-custom-medium" />
                  </div>
                  <h3 className="font-medium">{feature.title}</h3>
                </div>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Billing History */}
        <div className="bg-white rounded-xl border p-6">
          <h2 className="text-xl font-semibold mb-6">Billing History</h2>
          <div className="text-center text-gray-500 py-8">
            <Clock className="h-8 w-8 mx-auto mb-3 text-gray-400" />
            <p>No billing history available</p>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Payment Methods</h2>
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Payment Method
            </Button>
          </div>
          <div className="text-center text-gray-500 py-8">
            <Shield className="h-8 w-8 mx-auto mb-3 text-gray-400" />
            <p>No payment methods added</p>
          </div>
        </div>
      </div>
    </div>
  );
}