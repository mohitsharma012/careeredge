"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Wand2,
  Target,
  FileText,
  CheckCircle,
  AlertCircle,
  Download,
  Eye,
  Mail,
  Clock,
  Share2,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface SmartResume {
  id: string;
  title: string;
  createdAt: string;
  matchScore: number;
  status: "optimizing" | "complete" | "failed";
  template: string;
  views: number;
  downloads: number;
  thumbnail: string;
  description: string;
  keywords: string[];
  atsScore: number;
}

interface ResumePreviewDialogProps {
  isPreviewOpen: boolean;
  setIsPreviewOpen: (isOpen: boolean) => void;
  selectedResume: SmartResume | null;
  isOptimizing: boolean;
  handleOptimizeMore: () => void;
  onSendEmail: () => void;
}

export function ResumePreviewDialog({
  isPreviewOpen,
  setIsPreviewOpen,
  selectedResume,
  isOptimizing,
  handleOptimizeMore,
  onSendEmail,
}: ResumePreviewDialogProps) {
  if (!selectedResume) return null;



  return (
    <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
      <DialogContent className="max-w-4xl bg-white/90 flex gap-2 max-h-screen overflow-y-auto">

        <div className=" w-3/5 bg-white rounded-xl border overflow-hidden">
          <div className="aspect-[1/1.4142] relative">
            <img
              src={selectedResume.thumbnail}
              alt={selectedResume.title}
              className="w-full h-full object-contain border-b"
            />
          </div>
        </div>
        <div className="flex flex-col w-2/5 gap-3 py-5">
          <div className="bg-white p-4 rounded-xl shadow-xl">
            <h1 className="text-lg font-medium">{selectedResume.title}</h1>
            <div className="space-y-2 mt-4 text-sm">
              <div className="flex items-center gap-4">
                <span className="text-gray-500 ">Template</span>
                <span>{selectedResume.template}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-500">Created</span>
                <span>{selectedResume.createdAt}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-xl">
            <h3 className="text-lg font-medium mb-2">Optimization Scores</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-500">ATS Compatibility</span>
                  <span className="font-medium">{selectedResume.atsScore}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-500 h-2.5 rounded-full"
                    style={{ width: `${selectedResume.atsScore}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-500">Match Score</span>
                  <span className="font-medium">{selectedResume.matchScore}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full"
                    style={{ width: `${selectedResume.matchScore}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-xl">
            <h3 className="text-lg font-medium mb-2">Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {selectedResume.keywords.map((keyword, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-custom-darkYellow text-white rounded-full text-xs"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col  gap-2 mt-2">
            <div className="w-full flex ">

              <Button
                variant="outline"
                className="bg-custom-darker text-white py-5 hover:bg-custom-dark w-1/2"
                onClick={onSendEmail}
              >
                <Mail className="h-4 w-4 mr-2" />
                Send via Email
              </Button>
              <Button
                variant="outline"
                className="bg-custom-darker text-white py-5 hover:bg-custom-dark w-1/2"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
            <Button
              className=" bg-custom-darker text-white py-5 hover:bg-custom-dark"
              onClick={handleOptimizeMore}
              disabled={isOptimizing}
            >
              {isOptimizing ? (
                <>
                  <span className="animate-spin mr-2">
                    <Clock className="h-4 w-4" />
                  </span>
                  Optimizing...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Optimize More
                </>
              )}
            </Button>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
}