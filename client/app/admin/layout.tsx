"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Users,
  Crown,
  Settings,
  BarChart,
  Search,
  Bell,
  Menu,
  ChevronLeft,
  Brain,
  UserCog,
  Tag,
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { id: "dashboard", icon: BarChart, label: "Dashboard", path: "/admin" },
    { id: "users", icon: Users, label: "Users", path: "/admin/users" },
    { id: "employees", icon: UserCog, label: "Employees", path: "/admin/employees" },
    { id: "subscriptions", icon: Crown, label: "Subscriptions", path: "/admin/subscriptions" },
    { id: "subscription-plans", icon: Tag, label: "Subscription Plans", path: "/admin/subscription-plans" },
    { id: "settings", icon: Settings, label: "Settings", path: "/admin/settings" },
  ];

  const isActivePath = (path: string) => {
    if (path === "/admin") {
      return pathname === "/admin";
    }
    return pathname?.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b">
        <div className="flex items-center justify-between h-16 px-4 md:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              {sidebarOpen ? (
                <ChevronLeft className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
            <div className="flex items-center gap-3">
              <div className="bg-custom-medium p-2 rounded-xl">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="font-semibold text-xl hidden md:block">
                Admin Panel
              </span>
            </div>
          </div>

          <div className="flex-1 max-w-3xl mx-8 hidden lg:block">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search users, subscriptions..."
                className="w-full pl-12 pr-4 py-2"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-xl">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3">
              <div className="hidden md:block text-right">
                <div className="text-sm font-medium">Admin User</div>
                <div className="text-xs text-gray-500">Super Admin</div>
              </div>
              <div className="h-10 w-10 rounded-xl bg-custom-medium flex items-center justify-center text-white font-medium">
                AU
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed left-0 top-16 bottom-0 bg-white border-r transition-all duration-300 z-40 ${
            sidebarOpen ? "w-64" : "w-20"
          }`}
        >
          <div className="flex flex-col h-full p-4">
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => router.push(item.path)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full transition-colors ${
                    isActivePath(item.path)
                      ? "bg-custom-medium text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span
                    className={`transition-opacity duration-300 ${
                      sidebarOpen ? "opacity-100" : "opacity-0 w-0"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? "ml-64" : "ml-20"
          } p-8`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}