"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TemplatesSection } from "@/components/dashboard/templates-section";
import { ResumeManagement } from "@/components/dashboard/resume-management";
import { ProjectLoader } from "@/components/loaders/project-loader";
import { SmartResumeFlow } from "@/components/smart-resume/smart-resume-flow";
import { SubscriptionSection } from "@/components/subscription-section";
import { CVAnalysis } from "@/components/cv-analysis/cv-analysis";
import {
  FileText,
  Layout,
  Briefcase,
  Globe,
  Plus,
  MoreVertical,
  Star,
  ChevronDown,
  Search,
  Bell,
  Settings,
  Sparkles,
  Zap,
  BarChart,
  Clock,
  Award,
  Brain,
  Wand2,
  Target,
  Eye,
  Share2,
  Download,
  ArrowUpRight,
  Layers,
  Users,
  Rocket,
  Gauge,
  ChevronLeft,
  Crown,
  ChevronRight,
  FileSearch,
  Menu,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { USER_CLONE_API } from "@/constants/api";
import { getAPI } from "@/utils/apiRequest";
import { COMPANY_NAME } from "@/constants/constant";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();


  useEffect(() => {
    if (!localStorage.getItem("access")) {
      router.push("/auth");
      return;
    } else {
      let successFn = (result: any) => {
        setLoading(false);
      };
      let errorFn = (result: any) => {
        // Delete the token and redirect to login
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        router.push("/auth");
      };

      getAPI(USER_CLONE_API, successFn, errorFn);
    }
  }, [router]);

  useEffect(() => {
    const section = searchParams.get("section");
    if (section) {
      setActiveSection(section);
    }
  }, [searchParams]);

  const sidebarMenu = [
    {
      title: "Dashboard",
      icon: <Layout className="h-5 w-5" />,
      section: "dashboard",
    },
    {
      title: "Templates",
      icon: <Layers className="h-5 w-5" />,
      section: "templates",
    },
    {
      title: "Resume Builder",
      icon: <FileText className="h-5 w-5" />,
      section: "resumes",
    },
    {
      title: "Smart Resumes",
      icon: <Brain className="h-5 w-5" />,
      section: "smart-resumes",
    },
    {
      title: "Analyze CV",
      icon: <FileSearch className="h-5 w-5" />,
      section: "analyze-cv",
    },
    {
      title: "Subscription",
      icon: <Crown className="h-5 w-5" />,
      section: "subscription",
    },
  ];

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
      shares: 12,
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
      shares: 8,
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
      shares: 5,
    },
  ];

  const insights = [
    {
      title: "AI Enhancement Score",
      value: "96%",
      change: "+12%",
      icon: <Brain className="h-5 w-5" />,
      color: "text-custom-medium",
      bg: "bg-custom-lightest",
    },
    {
      title: "Profile Views",
      value: "2.4k",
      change: "+28%",
      icon: <Eye className="h-5 w-5" />,
      color: "text-custom-medium",
      bg: "bg-custom-lightest",
    },
    {
      title: "Job Match Rate",
      value: "89%",
      change: "+15%",
      icon: <Target className="h-5 w-5" />,
      color: "text-custom-medium",
      bg: "bg-custom-lightest",
    },
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
                  Welcome back,{" "}
                  <span className="text-custom-medium">Thomas</span>
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
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {insight.title}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold">
                          {insight.value}
                        </span>
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
                <Button
                  variant="outline"
                  className="text-gray-600 border-custom-light hover:bg-custom-lightest"
                >
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="group bg-white dark:bg-gray-800 rounded-2xl border border-custom-lightest hover:shadow-lg transition-all duration-300"
                  >
                    <div
                      className={`h-40 bg-gradient-to-br ${doc.gradient} p-6 relative`}
                    >
                      <div className="absolute top-4 right-4 flex items-center gap-2">
                        <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-white" />
                          <span className="text-white text-sm font-medium">
                            {doc.aiScore}
                          </span>
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
                  color: "from-custom-light to-custom-medium",
                },
                {
                  title: "Job Matching",
                  description: "Find perfect job matches",
                  icon: <Target className="h-6 w-6" />,
                  color: "from-custom-medium to-custom-dark",
                },
                {
                  title: "Export Options",
                  description: "Download in any format",
                  icon: <Download className="h-6 w-6" />,
                  color: "from-custom-dark to-custom-darkest",
                },
                {
                  title: "Team Review",
                  description: "Get feedback from team",
                  icon: <Users className="h-6 w-6" />,
                  color: "from-custom-medium to-custom-dark",
                },
              ].map((action, i) => (
                <button
                  key={i}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-custom-lightest hover:shadow-lg transition-all duration-300 text-left group"
                >
                  <div
                    className={`h-12 w-12 rounded-xl bg-gradient-to-br ${action.color} p-3 text-white mb-4`}
                  >
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
    <>
      {loading ? (
        <ProjectLoader message="Welcome to CareerEdge" />
      ) : (
        <div className="min-h-screen bg-white">
          {/* Header */}
          <div className="sticky top-0 left-0 right-0 border z-50 bg-white">
            <div className="flex items-center justify-between  h-16 px-4 md:px-6">
              <div className="flex items-center gap-7">
                <div className="flex items-center">
                  <div className="bg-white p-2 rounded-xl">
                    <Brain className="h-6 w-6 text-custom-darker" />
                  </div>
                  <span className="font-semibold text-xl text-custom-darker hidden md:block">
                    {COMPANY_NAME}
                  </span>
                </div>
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 text-black  rounded-xl transition-colors"
                >
                  {sidebarOpen ? (
                    <ChevronLeft className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </button>

              </div>
              <div className="flex items-center gap-7">
                Welcome back, Thomas


              </div>
              <div className="flex items-center gap-5">
                <button className="relative p-2 bg-custom-darker text-white hover:bg-custom-dark rounded-xl">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-custom-medium"></span>
                </button>
                <button className="p-2 text-white bg-custom-darker hover:bg-custom-dark rounded-xl">
                  <Settings className="h-5 w-5" />
                </button>
                <div className="flex items-center gap-3 text-custom-darker">
                  <div className="hidden md:block text-right ">
                    <div className="text-sm font-medium ">
                      Thomas Klein
                    </div>
                    <div className="text-x">
                      Premium Plan
                    </div>
                  </div>
                  <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-custom-medium font-medium">
                    TK
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Layout */}
          <div className=" flex">
            {/* Sidebar */}
            <aside
              className={`fixed left-0 bg-white top-16 bottom-0 border transition-all text-sm duration-300 z-40 ${sidebarOpen && "w-60"}`}
            >
              <div className="flex flex-col h-full p-4">
                <div className="space-y-1">

                  {sidebarMenu.map((item, i) => (
                    <>
                      <button
                        onClick={() => setActiveSection(item.section)}
                        className={`flex items-center px-4 py-3 text-center gap-3 rounded-xl ${sidebarOpen && "w-full"} ${activeSection === item.section
                          ? "text-white bg-custom-darker"
                          : "text-black/80 hover:bg-custom-darker hover:text-white"
                          }`}
                      >
                        {item.icon}
                        {sidebarOpen && (
                          <span
                            className="transition-opacity duration-300"
                          >
                            {item.title}
                          </span>
                        )}
                      </button>
                    </>
                  ))
                  }

                </div>



                {/* Profile Progress */}
                <div className="mt-auto bg-custom-darker rounded-xl">
                  {sidebarOpen ? (
                    <div className="bg-white/10 rounded-2xl p-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center text-custom-medium">
                          <Gauge className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">
                            Profile Score
                          </h4>
                          <p className="text-sm text-custom-lightest">
                            Almost Perfect!
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-custom-lightest">
                              Completion
                            </span>
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
                          Complete Profile{" "}
                          <ArrowUpRight className="h-4 w-4 ml-2" />
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
              className={`flex-1 transition-all duration-300 mr-6 ${sidebarOpen ? "ml-64" : "ml-24"
                } py-5`}
            >
              <div className={` mx-auto space-y-0 ${sidebarOpen ? "max-w-7xl w-full" : "max-w-full mr-4"}`}>
                {renderContent()}
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  );
}
