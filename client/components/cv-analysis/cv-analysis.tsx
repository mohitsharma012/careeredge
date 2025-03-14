"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Brain,
  Upload,
  FileText,
  CheckCircle,
  Target,
  Star,
  AlertCircle,
  ArrowRight,
  Sparkles,
  BarChart,
  Zap,
  FileSearch,
  Pencil,
  FolderOpen,
  Layout,
  Eye,
} from "lucide-react";

interface AnalysisResult {
  overallMatch: number;
  keywordMatch: number;
  skillsMatch: number;
  experienceMatch: number;
  recommendations: string[];
  missingKeywords: string[];
  strongPoints: string[];
}

type CVSource = "upload" | "paste" | "resume-builder" | "smart-resume";

export function CVAnalysis() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [cvSource, setCVSource] = useState<CVSource>("upload");
  const [pastedCV, setPastedCV] = useState("");
  const [isResumeDialogOpen, setIsResumeDialogOpen] = useState(false);
  const [selectedResume, setSelectedResume] = useState<string | null>(null);

  // Mock data for resumes
  const mockResumes = [
    {
      id: "1",
      title: "Software Engineer Resume",
      type: "resume-builder",
      thumbnail: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&q=80",
    },
    {
      id: "2",
      title: "Full Stack Developer CV",
      type: "smart-resume",
      thumbnail: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=400&q=80",
    },
  ];

  const steps = [
    "Scanning CV",
    "Extracting Keywords",
    "Analyzing Job Description",
    "Matching Skills",
    "Generating Recommendations",
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleResumeSelect = (resumeId: string) => {
    setSelectedResume(resumeId);
    setIsResumeDialogOpen(false);
  };

  const handleAnalyze = async () => {
    const hasValidInput = 
      (cvSource === "upload" && file) ||
      (cvSource === "paste" && pastedCV) ||
      (cvSource === "resume-builder" && selectedResume) ||
      (cvSource === "smart-resume" && selectedResume);

    if (!hasValidInput || !jobDescription) return;

    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setCurrentStep(0);
    setResult(null);

    // Simulate analysis process
    for (let i = 0; i <= steps.length; i++) {
      setCurrentStep(i);
      const progress = (i / steps.length) * 100;
      setAnalysisProgress(progress);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Simulate analysis result
    setResult({
      overallMatch: 85,
      keywordMatch: 78,
      skillsMatch: 92,
      experienceMatch: 88,
      recommendations: [
        "Add more specific technical skills mentioned in the job description",
        "Highlight leadership experience more prominently",
        "Include specific metrics and achievements",
      ],
      missingKeywords: ["Docker", "Kubernetes", "CI/CD"],
      strongPoints: [
        "Strong technical background",
        "Relevant industry experience",
        "Project management skills",
      ],
    });

    setIsAnalyzing(false);
  };

  const renderCVInput = () => {
    switch (cvSource) {
      case "upload":
        return (
          <div className="border-2 border-dashed rounded-xl p-8 text-center">
            <input
              type="file"
              id="cv-upload"
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />
            <label
              htmlFor="cv-upload"
              className="cursor-pointer block"
            >
              <Upload className="h-8 w-8 mx-auto mb-4 text-custom-medium" />
              <p className="text-gray-600 mb-2">
                {file ? file.name : "Drop your CV here or click to browse"}
              </p>
              <p className="text-sm text-gray-500">
                Supports PDF, DOC, DOCX (Max 5MB)
              </p>
            </label>
          </div>
        );

      case "paste":
        return (
          <Textarea
            placeholder="Paste your CV content here..."
            className="min-h-[200px] resize-none"
            value={pastedCV}
            onChange={(e) => setPastedCV(e.target.value)}
          />
        );

      case "resume-builder":
      case "smart-resume":
        return (
          <div className="text-center">
            {selectedResume ? (
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-custom-medium" />
                  <span className="font-medium">
                    {mockResumes.find(r => r.id === selectedResume)?.title}
                  </span>
                </div>
                <Button
                  variant="link"
                  onClick={() => setIsResumeDialogOpen(true)}
                  className="mt-2"
                >
                  Change Resume
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setIsResumeDialogOpen(true)}
                className="bg-custom-medium hover:bg-custom-dark"
              >
                <FolderOpen className="h-5 w-5 mr-2" />
                Select Resume
              </Button>
            )}
          </div>
        );
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-custom-medium to-custom-dark rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-white/10 rounded-xl">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Analyze CV</h1>
            <p className="text-custom-lightest">
              Get AI-powered insights on how well your CV matches the job requirements
            </p>
          </div>
        </div>
      </div>

      {/* Analysis Form */}
      {!isAnalyzing && !result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* CV Input */}
          <div className="bg-white rounded-xl border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">CV Input</h2>
              <div className="flex gap-2">
                <Button
                  variant={cvSource === "upload" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCVSource("upload")}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
                <Button
                  variant={cvSource === "paste" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCVSource("paste")}
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  Paste
                </Button>
                <Button
                  variant={cvSource === "resume-builder" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCVSource("resume-builder")}
                >
                  <Layout className="h-4 w-4 mr-2" />
                  Resume Builder
                </Button>
                <Button
                  variant={cvSource === "smart-resume" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCVSource("smart-resume")}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Smart Resume
                </Button>
              </div>
            </div>
            {renderCVInput()}
          </div>

          {/* Job Description */}
          <div className="bg-white rounded-xl border p-6">
            <h2 className="text-xl font-semibold mb-4">Job Description</h2>
            <Textarea
              placeholder="Paste the job description here..."
              className="min-h-[200px] resize-none"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>

          {/* Analyze Button */}
          <div className="md:col-span-2">
            <Button
              className="w-full bg-custom-medium hover:bg-custom-dark h-12"
              onClick={handleAnalyze}
              disabled={
                (!file && cvSource === "upload") ||
                (!pastedCV && cvSource === "paste") ||
                (!selectedResume && (cvSource === "resume-builder" || cvSource === "smart-resume")) ||
                !jobDescription
              }
            >
              <Brain className="h-5 w-5 mr-2" />
              Analyze CV
            </Button>
          </div>
        </motion.div>
      )}

      {/* Resume Selection Dialog */}
      <Dialog open={isResumeDialogOpen} onOpenChange={setIsResumeDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Select Resume</DialogTitle>
          </DialogHeader>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            {mockResumes
              .filter(resume => 
                cvSource === "resume-builder" 
                  ? resume.type === "resume-builder"
                  : resume.type === "smart-resume"
              )
              .map((resume) => (
                <div
                  key={resume.id}
                  className={`relative rounded-xl border-2 transition-all cursor-pointer ${
                    selectedResume === resume.id
                      ? "border-custom-medium bg-custom-lightest"
                      : "border-gray-200 hover:border-custom-medium"
                  }`}
                  onClick={() => handleResumeSelect(resume.id)}
                >
                  <div className="p-4 flex items-center gap-4">
                    <div className="h-32 w-24 rounded-lg overflow-hidden">
                      <img
                        src={resume.thumbnail}
                        alt={resume.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">{resume.title}</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-custom-medium border-custom-light"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                    {selectedResume === resume.id && (
                      <CheckCircle className="absolute top-4 right-4 h-5 w-5 text-custom-medium" />
                    )}
                  </div>
                </div>
              ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Analysis Progress */}
      {isAnalyzing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl border p-8"
        >
          <div className="max-w-md mx-auto text-center">
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
              className="bg-custom-medium rounded-full p-4 w-16 h-16 mx-auto mb-6"
            >
              <Brain className="h-8 w-8 text-white" />
            </motion.div>

            <h2 className="text-2xl font-bold mb-2">Analyzing Your CV</h2>
            <p className="text-gray-600 mb-8">
              Please wait while our AI analyzes your CV against the job requirements
            </p>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Overall Progress</span>
                  <span className="font-medium">{Math.round(analysisProgress)}%</span>
                </div>
                <Progress value={analysisProgress} className="h-2" />
              </div>

              <div className="space-y-3">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                      opacity: index <= currentStep ? 1 : 0.5,
                      x: 0,
                    }}
                    className="flex items-center gap-3"
                  >
                    {index < currentStep ? (
                      <CheckCircle className="h-5 w-5 text-custom-dark" />
                    ) : index === currentStep ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="h-5 w-5 border-2 border-custom-medium border-t-transparent rounded-full"
                      />
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-gray-200" />
                    )}
                    <span
                      className={
                        index <= currentStep
                          ? "text-custom-dark font-medium"
                          : "text-gray-400"
                      }
                    >
                      {step}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Analysis Results */}
      {result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Overall Match */}
          <div className="bg-white rounded-xl border p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold">Match Score</h2>
                <p className="text-gray-600">How well your CV matches the job requirements</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-custom-lightest rounded-full">
                <Target className="h-5 w-5 text-custom-medium" />
                <span className="font-semibold text-custom-medium">
                  {result.overallMatch}% Match
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <FileSearch className="h-5 w-5 text-blue-500" />
                  <span className="font-medium">Keyword Match</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Match Rate</span>
                    <span className="font-medium">{result.keywordMatch}%</span>
                  </div>
                  <Progress value={result.keywordMatch} className="h-2" />
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="font-medium">Skills Match</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Match Rate</span>
                    <span className="font-medium">{result.skillsMatch}%</span>
                  </div>
                  <Progress value={result.skillsMatch} className="h-2" />
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart className="h-5 w-5 text-green-500" />
                  <span className="font-medium">Experience Match</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Match Rate</span>
                    <span className="font-medium">{result.experienceMatch}%</span>
                  </div>
                  <Progress value={result.experienceMatch} className="h-2" />
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-xl border p-6">
            <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
            <div className="space-y-4">
              {result.recommendations.map((recommendation, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 bg-gray-50 rounded-lg p-4"
                >
                  <Zap className="h-5 w-5 text-custom-medium flex-shrink-0 mt-0.5" />
                  <span>{recommendation}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Missing Keywords & Strong Points */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-xl font-semibold mb-4">Missing Keywords</h2>
              <div className="flex flex-wrap gap-2">
                {result.missingKeywords.map((keyword, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm"
                  >
                    {keyword}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-xl font-semibold mb-4">Strong Points</h2>
              <div className="space-y-2">
                {result.strongPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-2 text-green-600"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>{point}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                setFile(null);
                setJobDescription("");
                setResult(null);
              }}
            >
              Analyze Another CV
            </Button>
            <Button className="flex-1 bg-custom-medium hover:bg-custom-dark">
              <Sparkles className="h-4 w-4 mr-2" />
              Optimize CV
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}