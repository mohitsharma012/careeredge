"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TemplatesSection } from "@/components/templates-section";
import { ResumeManagement } from "@/components/resume-management";
import { SmartResumeFlow } from "@/components/smart-resume/smart-resume-flow";
import { SubscriptionSection } from "@/components/subscription-section";
import { CVAnalysis } from "@/components/cv-analysis/cv-analysis";
import {
  FileText, Layout, Briefcase, Globe, Menu, Plus,
  MoreVertical, Star, ChevronDown, Search, Bell,
  Settings, Sparkles, Zap, BarChart, Clock, Award,
  Brain, Wand2, Target, Eye, Share2, Download,
  ArrowUpRight, Layers, Users, Rocket, Gauge,
  ChevronLeft, Crown, ChevronRight, FileSearch,
} from "lucide-react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");

  const documents = [
    {
      id: 1,
      type: "resume",
      name: "Full Stack Developer",
      lastUpdated: "2 hours ago",
      gradient: "from-custom-lightest via-custom-light to-custom-medium",
      progress: 92,
      aiScore: 96,
      views: 145,
      shares: 12
    },
    {
      id: 2,
      type: "cv",
      name: "Senior UX Designer",
      lastUpdated: "1 day ago",
      gradient: "from-custom-light via-custom-medium to-custom-dark",
      progress: 88,
      aiScore: 94,
      views: 89,
      shares: 8
    },
    {
      id: 3,
      type: "cover",
      name: "Product Manager",
      lastUpdated: "3 days ago",
      gradient: "from-custom-medium via-custom-dark to-custom-darkest",
      progress: 85,
      aiScore: 92,
      views: 67,
      shares: 5
    }
  ];

  const insights = [
    {
      title: "AI Enhancement Score",
      value: "96%",
      change: "+12%",
      icon: <Brain className="h-5 w-5" />,
      color: "text-custom-medium",
      bg: "bg-custom-lightest"
    },
    {
      title: "Profile Views",
      value: "2.4k",
      change: "+28%",
      icon: <Eye className="h-5 w-5" />,
      color: "text-custom-medium",
      bg: "bg-custom-lightest"
    },
    {
      title: "Job Match Rate",
      value: "89%",
      change: "+15%",
      icon: <Target className="h-5 w-5" />,
      color: "text-custom-medium",
      bg: "bg-custom-lightest"
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "templates":
        return <TemplatesSection className="mt-0" />;
      case "resumes":
        return <ResumeManagement />;
      case "smart-resumes":
        return <SmartResumeFlow />;
      case "subscription":
        return <SubscriptionSection />;
      case "analyze-cv":
        return <CVAnalysis />;
      case "dashboard":
      default:
        return (
          <>
            {/* Welcome Section */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">
                  Welcome back, <span className="text-custom-medium">Thomas</span>
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Your documents are performing exceptionally well
                </p>
              </div>
              <Button className="bg-custom-medium hover:bg-custom-dark text-white">
                <Plus className="h-5 w-5 mr-2" /> Create Document
              </Button>
            </div>

            {/* Insights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {insights.map((insight, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-custom-lightest"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 ${insight.bg} rounded-xl`}>
                      <div className={insight.color}>{insight.icon}</div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{insight.title}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold">{insight.value}</span>
                        <span className="text-sm text-custom-dark bg-custom-lightest/50 px-2 py-0.5 rounded-full">
                          {insight.change}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Documents Grid */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Active Documents</h2>
                <Button variant="outline" className="text-gray-600 border-custom-light hover:bg-custom-lightest">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="group bg-white dark:bg-gray-800 rounded-2xl border border-custom-lightest hover:shadow-lg transition-all duration-300"
                  >
                    <div className={`h-40 bg-gradient-to-br ${doc.gradient} p-6 relative`}>
                      <div className="absolute top-4 right-4 flex items-center gap-2">
                        <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-white" />
                          <span className="text-white text-sm font-medium">{doc.aiScore}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white hover:bg-white/20"
                        >
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-white/20 backdrop-blur-sm h-1 rounded-full">
                          <div
                            className="bg-white h-1 rounded-full"
                            style={{ width: `${doc.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-medium text-lg mb-2">{doc.name}</h3>
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span>{doc.views}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Share2 className="h-4 w-4" />
                            <span>{doc.shares}</span>
                          </div>
                        </div>
                        <span>{doc.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "AI Enhancement",
                  description: "Optimize your CV with AI",
                  icon: <Wand2 className="h-6 w-6" />,
                  color: "from-custom-light to-custom-medium"
                },
                {
                  title: "Job Matching",
                  description: "Find perfect job matches",
                  icon: <Target className="h-6 w-6" />,
                  color: "from-custom-medium to-custom-dark"
                },
                {
                  title: "Export Options",
                  description: "Download in any format",
                  icon: <Download className="h-6 w-6" />,
                  color: "from-custom-dark to-custom-darkest"
                },
                {
                  title: "Team Review",
                  description: "Get feedback from team",
                  icon: <Users className="h-6 w-6" />,
                  color: "from-custom-medium to-custom-dark"
                }
              ].map((action, i) => (
                <button
                  key={i}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-custom-lightest hover:shadow-lg transition-all duration-300 text-left group"
                >
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${action.color} p-3 text-white mb-4`}>
                    {action.icon}
                  </div>
                  <h3 className="font-medium mb-1 group-hover:text-custom-medium transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {action.description}
                  </p>
                </button>
              ))}
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-custom-lightest/30">
      {/* Header */}
      <div className="sticky top-0 left-0 right-0 bg-custom-medium z-50">
        <div className="flex items-center justify-between h-16 px-4 md:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-white hover:bg-custom-dark rounded-xl transition-colors"
            >
              {sidebarOpen ? (
                <ChevronLeft className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-xl">
                <Brain className="h-6 w-6 text-custom-medium" />
              </div>
              <span className="font-semibold text-xl text-white hidden md:block">
                CV<span className="text-custom-lightest">.AI</span>
              </span>
            </div>
          </div>

          <div className="flex-1 max-w-3xl mx-8 hidden lg:block">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-custom-lightest" />
              <input
                type="search"
                placeholder="Search templates, documents, or job matches..."
                className="w-full pl-12 pr-4 py-2.5 bg-custom-dark/20 text-white placeholder-custom-lightest border border-custom-dark/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button className="relative p-2 text-white hover:bg-custom-dark rounded-xl">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-custom-medium"></span>
            </button>
            <button className="p-2 text-white hover:bg-custom-dark rounded-xl">
              <Settings className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="hidden md:block text-right">
                <div className="text-sm font-medium text-white">Thomas Klein</div>
                <div className="text-xs text-custom-lightest">Premium Plan</div>
              </div>
              <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-custom-medium font-medium">
                TK
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="pt-16 flex">
        {/* Sidebar */}
        <aside
          className={`fixed left-0 top-16 bottom-0 bg-custom-medium transition-all duration-300 z-40 ${
            sidebarOpen ? "w-72" : "w-20"
          }`}
        >
          <div className="flex flex-col h-full p-4">
            <div className="space-y-1">
              <button
                onClick={() => setActiveSection("dashboard")}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full ${
                  activeSection === "dashboard"
                    ? "text-custom-medium bg-white"
                    : "text-white hover:bg-custom-dark"
                }`}
              >
                <Layout className="h-5 w-5" />
                <span className={`transition-opacity duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0 w-0"}`}>
                  Dashboard
                </span>
              </button>
              <button
                onClick={() => setActiveSection("templates")}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full ${
                  activeSection === "templates"
                    ? "text-custom-medium bg-white"
                    : "text-white hover:bg-custom-dark"
                }`}
              >
                <Layers className="h-5 w-5" />
                <span className={`transition-opacity duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0 w-0"}`}>
                  Templates
                </span>
              </button>
              <button
                onClick={() => setActiveSection("resumes")}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full ${
                  activeSection === "resumes"
                    ? "text-custom-medium bg-white"
                    : "text-white hover:bg-custom-dark"
                }`}
              >
                <FileText className="h-5 w-5" />
                <span className={`transition-opacity duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0 w-0"}`}>
                  Resume Builder
                </span>
              </button>
              <button
                onClick={() => setActiveSection("smart-resumes")}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full ${
                  activeSection === "smart-resumes"
                    ? "text-custom-medium bg-white"
                    : "text-white hover:bg-custom-dark"
                }`}
              >
                <Brain className="h-5 w-5" />
                <span className={`transition-opacity duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0 w-0"}`}>
                  Smart Resumes
                </span>
              </button>
              <button
                onClick={() => setActiveSection("analyze-cv")}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full ${
                  activeSection === "analyze-cv"
                    ? "text-custom-medium bg-white"
                    : "text-white hover:bg-custom-dark"
                }`}
              >
                <FileSearch className="h-5 w-5" />
                <span className={`transition-opacity duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0 w-0"}`}>
                  Analyze CV
                </span>
              </button>
              <button
                onClick={() => setActiveSection("subscription")}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full ${
                  activeSection === "subscription"
                    ? "text-custom-medium bg-white"
                    : "text-white hover:bg-custom-dark"
                }`}
              >
                <Crown className="h-5 w-5" />
                <span className={`transition-opacity duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0 w-0"}`}>
                  Subscription
                </span>
              </button>
              {[
                { icon: <Users className="h-5 w-5" />, label: "Team" },
                { icon: <Briefcase className="h-5 w-5" />, label: "Job Matches" },
                { icon: <Globe className="h-5 w-5" />, label: "Portfolio" }
              ].map((item, i) => (
                <button
                  key={i}
                  className="flex items-center gap-3 text-white hover:bg-custom-dark px-4 py-3 rounded-xl w-full"
                >
                  {item.icon}
                  <span className={`transition-opacity duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0 w-0"}`}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>

            {/* AI Assistant */}
            <div className="mt-8">
              <div className="px-4 mb-4">
                {sidebarOpen && (
                  <h3 className="text-sm font-medium text-custom-lightest">AI ASSISTANT</h3>
                )}
              </div>
              <div className="space-y-1">
                {[
                  { icon: <Wand2 className="h-5 w-5" />, label: "Enhance CV" },
                  { icon: <Target className="h-5 w-5" />, label: "Job Targeting" },
                  { icon: <Rocket className="h-5 w-5" />, label: "Career Path" }
                ].map((item, i) => (
                  <button
                    key={i}
                    className="flex items-center gap-3 text-white hover:bg-custom-dark px-4 py-3 rounded-xl w-full"
                  >
                    {item.icon}
                    <span className={`transition-opacity duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0 w-0"}`}>
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Profile Progress */}
            <div className="mt-auto">
              {sidebarOpen ? (
                <div className="bg-white/10 rounded-2xl p-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center text-custom-medium">
                      <Gauge className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Profile Score</h4>
                      <p className="text-sm text-custom-lightest">
                        Almost Perfect!
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-custom-lightest">Completion</span>
                        <span className="text-white font-medium">92%</span>
                      </div>
                      <div className="h-2 bg-custom-dark/50 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-white rounded-full"
                          style={{ width: "92%" }}
                        ></div>
                      </div>
                    </div>
                    <Button className="w-full bg-white text-custom-medium hover:bg-custom-lightest">
                      Complete Profile <ArrowUpRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center">
                  <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center text-custom-medium">
                    <Gauge className="h-6 w-6" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? "ml-72" : "ml-20"
          } p-8`}
        >
          <div className="max-w-7xl mx-auto space-y-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}