"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BillingSummary } from "@/components/billing-summary";
import {
  Crown,
  Check,
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
  Zap,
  Gift,
  Share2,
  Copy,
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
    label: "Trial Days Left",
    current: 4,
    total: 7,
    icon: Clock,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    label: "Templates Used",
    current: 2,
    total: 2,
    icon: FileText,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
  {
    label: "AI Credits",
    current: 8,
    total: 10,
    icon: Brain,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    label: "Export Credits",
    current: 3,
    total: 5,
    icon: Download,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
];

const referralRewards = [
  {
    users: 1,
    reward: "+3 days trial extension",
    icon: Clock,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    users: 3,
    reward: "+5 AI credits",
    icon: Brain,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    users: 5,
    reward: "1 month free Pro plan",
    icon: Crown,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
];

export function SubscriptionSection() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [referralCopied, setReferralCopied] = useState(false);
  const [showBillingSummary, setShowBillingSummary] = useState(false);
  const [selectedPlanDetails, setSelectedPlanDetails] = useState<any>(null);

  const handleUpgrade = async (plan: string) => {
    setSelectedPlan(plan);
    const planInfo = plans.find(p => p.name === plan);
    
    if (planInfo) {
      setSelectedPlanDetails({
        name: planInfo.name,
        price: Number(planInfo.price),
        billingCycle: "Monthly",
        startDate: new Date().toLocaleDateString(),
        nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      });
      setShowBillingSummary(true);
    }
  };

  const handleConfirmUpgrade = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setShowBillingSummary(false);
    // Here you would typically update the UI to reflect the new subscription
  };

  const handleCopyReferral = () => {
    navigator.clipboard.writeText("https://cv.ai/ref/USER123");
    setReferralCopied(true);
    setTimeout(() => setReferralCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-custom-medium to-custom-dark rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-white/10 rounded-xl">
            <Crown className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Subscription</h1>
            <p className="text-custom-lightest">
              Manage your subscription and unlock premium features
            </p>
          </div>
        </div>
      </div>

      {/* Trial Status & Referral */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Trial Status */}
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold">Free Trial</h2>
              <p className="text-gray-600">4 days remaining</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-xl">
              <Gift className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Trial Progress</span>
                <span className="text-sm font-medium">4/7 days</span>
              </div>
              <Progress value={57} className="h-2" />
            </div>
            <p className="text-sm text-gray-600">
              Upgrade to Pro plan or invite friends to extend your trial period
            </p>
          </div>
        </div>

        {/* Referral Program */}
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold">Referral Program</h2>
              <p className="text-gray-600">Invite friends & earn rewards</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-xl">
              <Share2 className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value="https://cv.ai/ref/USER123"
                readOnly
                className="flex-1 px-4 py-2 bg-gray-50 rounded-lg text-sm"
              />
              <Button
                variant="outline"
                className="flex-shrink-0"
                onClick={handleCopyReferral}
              >
                {referralCopied ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {referralRewards.map((reward, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-4 text-center"
                >
                  <div className={`${reward.bgColor} p-2 rounded-lg inline-block mb-2`}>
                    <reward.icon className={`h-5 w-5 ${reward.color}`} />
                  </div>
                  <div className="text-2xl font-bold mb-1">{reward.users}</div>
                  <div className="text-xs text-gray-600">users</div>
                  <div className="text-sm font-medium mt-2">{reward.reward}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Current Plan Usage */}
      <div className="bg-white rounded-xl border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold">Current Plan</h2>
            <p className="text-gray-600">Free Trial</p>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-gray-400" />
            <span className="text-gray-600">4 days remaining</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {usageStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 rounded-xl p-4"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 ${stat.bgColor} rounded-lg`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <span className="text-sm text-gray-600">{stat.label}</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold">
                    {stat.current}/{stat.total}
                  </span>
                  <span className="text-sm text-gray-500">
                    {Math.round((stat.current / stat.total) * 100)}%
                  </span>
                </div>
                <Progress value={(stat.current / stat.total) * 100} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Available Plans */}
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

      {/* Add Billing Summary Dialog */}
      <BillingSummary
        open={showBillingSummary}
        onOpenChange={setShowBillingSummary}
        planDetails={selectedPlanDetails}
        onConfirm={handleConfirmUpgrade}
        onCancel={() => setShowBillingSummary(false)}
      />
    </div>
  );
}