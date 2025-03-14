"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  TrendingUp,
  Users,
  Crown,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Star,
  Download,
  FileText,
  Brain,
} from "lucide-react";

const stats = [
  {
    label: "Total Users",
    value: "12,345",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    label: "Active Subscriptions",
    value: "8,567",
    change: "+8%",
    trend: "up",
    icon: Crown,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
  {
    label: "Revenue",
    value: "$45,678",
    change: "+15%",
    trend: "up",
    icon: TrendingUp,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    label: "AI Credits Used",
    value: "234,567",
    change: "-5%",
    trend: "down",
    icon: Brain,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
];

const recentUsers = [
  {
    name: "John Doe",
    email: "john@example.com",
    plan: "Pro",
    status: "active",
    joinDate: "2024-03-15",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    plan: "Enterprise",
    status: "active",
    joinDate: "2024-03-14",
  },
  {
    name: "Bob Johnson",
    email: "bob@example.com",
    plan: "Free",
    status: "trial",
    joinDate: "2024-03-13",
  },
];

const recentSubscriptions = [
  {
    user: "Alice Brown",
    plan: "Pro",
    amount: "$12.00",
    date: "2024-03-15",
    status: "success",
  },
  {
    user: "Mike Wilson",
    plan: "Enterprise",
    amount: "$49.00",
    date: "2024-03-14",
    status: "success",
  },
  {
    user: "Sarah Davis",
    plan: "Pro",
    amount: "$12.00",
    date: "2024-03-13",
    status: "pending",
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl border p-6"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 ${stat.bgColor} rounded-xl`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <h3 className="text-sm text-gray-600">{stat.label}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">{stat.value}</span>
                  <span
                    className={`flex items-center text-sm ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* User Growth */}
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">User Growth</h2>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
          <div className="h-64 flex items-center justify-center border rounded-lg">
            {/* Add chart component here */}
            <p className="text-gray-500">User Growth Chart</p>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Revenue</h2>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
          <div className="h-64 flex items-center justify-center border rounded-lg">
            {/* Add chart component here */}
            <p className="text-gray-500">Revenue Chart</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Recent Users</h2>
            <Button variant="link" size="sm">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {recentUsers.map((user, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b last:border-0"
              >
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
                <div className="text-right">
                  <div
                    className={`text-sm font-medium ${
                      user.plan === "Pro"
                        ? "text-purple-600"
                        : user.plan === "Enterprise"
                        ? "text-blue-600"
                        : "text-gray-600"
                    }`}
                  >
                    {user.plan}
                  </div>
                  <div className="text-sm text-gray-500">{user.joinDate}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Subscriptions */}
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Recent Subscriptions</h2>
            <Button variant="link" size="sm">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {recentSubscriptions.map((subscription, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b last:border-0"
              >
                <div>
                  <div className="font-medium">{subscription.user}</div>
                  <div className="text-sm text-gray-500">{subscription.plan}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{subscription.amount}</div>
                  <div
                    className={`text-sm ${
                      subscription.status === "success"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {subscription.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}