import { ResumeData } from "@/components/resume-builder/types";

interface CVTemplateProps {
  ResumeData: ResumeData;
}


export default function Template1({ ResumeData }: CVTemplateProps) {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      {/* Header */}
      <div className="text-center border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-800">{ResumeData.personalInfo.fullName || "Your Name"}</h1>
        <p className="text-lg text-gray-600">{ResumeData.personalInfo.fullName || "Your Name"}</p>
      </div>

      
    </div>
  );
}
