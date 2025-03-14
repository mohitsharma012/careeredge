"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Settings,
  Save,
  Mail,
  CreditCard,
  Bell,
  Shield,
  Globe,
  Palette,
  Users,
  Key,
} from "lucide-react";

const settingsSections = [
  {
    id: "general",
    label: "General",
    icon: Settings,
  },
  {
    id: "billing",
    label: "Billing",
    icon: CreditCard,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    id: "security",
    label: "Security",
    icon: Shield,
  },
  {
    id: "api",
    label: "API",
    icon: Key,
  },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("general");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "general":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Site Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Site Name
                  </label>
                  <Input defaultValue="CV.AI" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Site Description
                  </label>
                  <Textarea defaultValue="AI-powered resume builder and optimization platform" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Support Email
                  </label>
                  <Input type="email" defaultValue="support@cv.ai" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Localization</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Default Language
                  </label>
                  <select className="w-full px-3 py-2 border rounded-lg">
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Timezone
                  </label>
                  <select className="w-full px-3 py-2 border rounded-lg">
                    <option value="UTC">UTC</option>
                    <option value="EST">Eastern Time</option>
                    <option value="PST">Pacific Time</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case "billing":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Payment Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Default Currency
                  </label>
                  <select className="w-full px-3 py-2 border rounded-lg">
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Gateway
                  </label>
                  <select className="w-full px-3 py-2 border rounded-lg">
                    <option value="stripe">Stripe</option>
                    <option value="paypal">PayPal</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Invoice Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <Input defaultValue="CV.AI Inc." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Address
                  </label>
                  <Textarea defaultValue="123 AI Street, Tech City, TC 12345" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tax ID
                  </label>
                  <Input defaultValue="12-3456789" />
                </div>
              </div>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">New User Registration</div>
                    <div className="text-sm text-gray-500">
                      Get notified when a new user signs up
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">New Subscription</div>
                    <div className="text-sm text-gray-500">
                      Get notified when a user subscribes to a paid plan
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Failed Payments</div>
                    <div className="text-sm text-gray-500">
                      Get notified when a payment fails
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">System Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">System Updates</div>
                    <div className="text-sm text-gray-500">
                      Get notified about system updates and maintenance
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Security Alerts</div>
                    <div className="text-sm text-gray-500">
                      Get notified about security-related events
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Authentication</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Two-Factor Authentication</div>
                    <div className="text-sm text-gray-500">
                      Require 2FA for all admin users
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Session Timeout (minutes)
                  </label>
                  <Input type="number" defaultValue="30" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Password Policy</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Minimum Password Length
                  </label>
                  <Input type="number" defaultValue="8" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">
                      Require Special Characters
                    </div>
                    <div className="text-sm text-gray-500">
                      Passwords must contain special characters
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "api":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">API Configuration</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    API Key
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="password"
                      defaultValue="sk_test_123456789"
                      readOnly
                    />
                    <Button variant="outline">Regenerate</Button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Webhook URL
                  </label>
                  <Input
                    type="url"
                    defaultValue="https://api.cv.ai/webhooks"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Rate Limiting</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Requests per Minute
                  </label>
                  <Input type="number" defaultValue="60" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Burst Size
                  </label>
                  <Input type="number" defaultValue="100" />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl border p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-xl">
              <Settings className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Settings</h1>
              <p className="text-gray-600">Manage your application settings</p>
            </div>
          </div>
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="bg-custom-medium hover:bg-custom-dark"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="col-span-1">
          <div className="bg-white rounded-xl border">
            <div className="p-4">
              {settingsSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors ${
                    activeSection === section.id
                      ? "bg-custom-medium text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <section.icon className="h-5 w-5" />
                  <span>{section.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Settings Content */}
        <div className="col-span-3">
          <div className="bg-white rounded-xl border p-6">
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  );
}