"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import CVForm from '@/components/resume-builder2/CVForm';
import CVPreview from '@/components/resume-builder2/CVPreview';
import { CVProvider, useCV } from '@/context/CVContext';
import { TemplateProvider } from '@/context/TemplateContext';
import { Button } from '@/components/ui/button';
import { Eye, Pencil, FileCheck, Download, Share2, User, Briefcase, GraduationCap, Sparkles, LayoutDashboard } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import StartOptions from '@/components/resume-builder2/StartOptions';
import TemplateDialog from '@/components/resume-builder2/TemplateDialog';
import logoSvg from '@/public/logo.svg';


interface ProgressTrackerProps {
    onTabChange: (tabId: string) => void;
    activeTab: string;
}

const ProgressTracker = ({ onTabChange, activeTab }: ProgressTrackerProps) => {
    const { cvData } = useCV();
    const { toast } = useToast();

    const getPersonalCompletion = () => {
        const fields = Object.values(cvData.personal);
        const filledFields = fields.filter(field => field && field.trim() !== '').length;
        return Math.round((filledFields / fields.length) * 100);
    };

    const getExperienceCompletion = () => {
        return cvData.experience.length > 0 ? 100 : 0;
    };

    const getEducationCompletion = () => {
        return cvData.education.length > 0 ? 100 : 0;
    };

    const getSkillsCompletion = () => {
        return cvData.skills.length > 0 ? 100 : 0;
    };

    const getTotalCompletion = () => {
        return Math.round(
            (getPersonalCompletion() + getExperienceCompletion() + getEducationCompletion() + getSkillsCompletion()) / 4
        );
    };

    const getColorClass = (percentage: number) => {
        if (percentage === 0) return "bg-gray-200";
        if (percentage < 30) return "bg-red-400";
        if (percentage < 70) return "bg-yellow-400";
        return "bg-green-500";
    };

    const tabsConfig = [
        { id: 'personal', label: 'Personal', icon: <User className="h-5 w-5 text-blue-600" />, completion: getPersonalCompletion() },
        { id: 'experience', label: 'Experience', icon: <Briefcase className="h-5 w-5 text-blue-600" />, completion: getExperienceCompletion() },
        { id: 'education', label: 'Education', icon: <GraduationCap className="h-5 w-5 text-blue-600" />, completion: getEducationCompletion() },
        { id: 'skills', label: 'Skills', icon: <Sparkles className="h-5 w-5 text-blue-600" />, completion: getSkillsCompletion() },
        { id: 'overview', label: 'Overall', icon: <span className="text-sm font-bold text-blue-600">{getTotalCompletion()}%</span>, completion: getTotalCompletion() }
    ];

    const handleTabClick = (tabId: string) => {
        if (tabId === 'overview') return; // Don't switch to overview tab
        onTabChange(tabId);
        toast({
            title: `Switched to ${tabId.charAt(0).toUpperCase() + tabId.slice(1)} section`,
            description: "Complete this section to improve your CV score",
            variant: "default",
        });
    };

    return (
        <div className="bg-white/90 max-w-7xl mx-auto backdrop-blur-sm py-4 px-4 rounded-lg mt-2 shadow-sm">
            <div className="flex items-center justify-around gap-4">
                {tabsConfig.map((tab) => (
                    <div
                        key={tab.id}
                        className={`flex  items-center gap-4 ${tab.id !== 'overview' ? 'cursor-pointer hover:scale-105 transition-all' : ''}`}
                        onClick={() => tab.id !== 'overview' && handleTabClick(tab.id)}
                    >
                        <div className={`relative  w-14 h-14 mb-1 ${activeTab === tab.id ? 'scale-110' : ''} transition-all duration-300`}>
                            <svg className="w-14 h-14 transform -rotate-90">
                                <circle
                                    cx="28"
                                    cy="28"
                                    r="24"
                                    fill="none"
                                    stroke="#e5e7eb"
                                    strokeWidth="4"
                                />
                                <circle
                                    cx="28"
                                    cy="28"
                                    r="24"
                                    fill="none"
                                    stroke={tab.completion === 0 ? "#e5e7eb" :
                                        tab.completion < 30 ? "#f87171" :
                                            tab.completion < 70 ? "#facc15" :
                                                "#22c55e"}
                                    strokeWidth="4"
                                    strokeDasharray={`${tab.completion * 1.5} 150`}
                                    className="transition-all duration-700 ease-out"
                                />
                            </svg>
                            <div className={`absolute top-0 left-0 w-full h-full flex items-center justify-center ${activeTab === tab.id ? 'animate-pulse' : ''}`}>
                                {tab.icon}
                            </div>
                            {activeTab === tab.id && (
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                    <Pencil className="h-3 w-3 text-white" />
                                </div>
                            )}
                        </div>
                        <span className={`text-sm font-medium ${activeTab === tab.id ? 'text-blue-600 font-bold' : 'text-gray-600'}`}>
                            {tab.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ResumeBuilder = ({ builder = false }: { builder?: boolean } = {}) => {

    const isMobile = useIsMobile();
    const [activeView, setActiveView] = useState<'form' | 'preview'>(isMobile ? 'form' : 'preview');
    const [activeTab, setActiveTab] = useState<string>('personal');
    const [startOption, setStartOption] = useState<'upload' | 'create' | null>(null);
    const [showFullScreenCV, setShowFullScreenCV] = useState(false);
    const [showCVActions, setShowCVActions] = useState(false);

    useEffect(() => {
        if (isMobile) {
            setActiveView('form');
        } else {
            setActiveView('preview');
        }
    }, [isMobile]);

    const handleStart = (option: 'upload' | 'create') => {
        setStartOption(option);
    };

    const handleSubmitSuccess = (showActions = false) => {
        setShowFullScreenCV(true);
        setShowCVActions(showActions);
    };

    return (
        <TemplateProvider>
            <CVProvider>
                <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white pattern-bg flex flex-col">
                    <div className="sticky top-0 z-10 w-full">
                        <div className="bg-white/90 md:hidden backdrop-blur-sm border-b border-blue-100 shadow-sm py-3">
                            <div className="container mx-auto px-4 md:px-6">
                                <div className="flex justify-between items-center">


                                    {startOption && (

                                        <div className="flex items-center space-x-2">
                                            <Link href="/dashboard">
                                                <Button variant="outline" size="sm" className="gap-2 border-blue-200 text-blue-700">
                                                    <LayoutDashboard size={16} />
                                                    Dashboard
                                                </Button>
                                            </Link>
                                            <Button variant="outline" size="sm" className="gap-2 border-blue-200 text-blue-700">
                                                <Download size={16} />
                                                Export PDF
                                            </Button>
                                            <Button variant="outline" size="sm" className="gap-2 border-blue-200 text-blue-700">
                                                <Share2 size={16} />
                                                Share
                                            </Button>
                                        </div>


                                    )}
                                </div>
                            </div>
                        </div>

                        {startOption && !showFullScreenCV && (
                            <>
                                <ProgressTracker onTabChange={setActiveTab} activeTab={activeTab} />

                                {isMobile && (
                                    <div className="flex border-b bg-white/90 backdrop-blur-sm">
                                        <Button
                                            variant={activeView === 'form' ? 'default' : 'outline'}
                                            onClick={() => setActiveView('form')}
                                            className={`flex-1 rounded-none py-3 justify-center items-center gap-2 transition-all duration-300 ${activeView === 'form' ? 'bg-blue-gradient text-white' : 'text-blue-700'
                                                }`}
                                        >
                                            <Pencil className="h-4 w-4" />
                                            Edit
                                        </Button>
                                        <Button
                                            variant={activeView === 'preview' ? 'default' : 'outline'}
                                            onClick={() => setActiveView('preview')}
                                            className={`flex-1 rounded-none py-3 justify-center items-center gap-2 transition-all duration-300 ${activeView === 'preview' ? 'bg-blue-gradient text-white' : 'text-blue-700'
                                                }`}
                                        >
                                            <Eye className="h-4 w-4" />
                                            Preview
                                        </Button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    <main className="flex-1 container mx-auto px-0 md:px-6 flex flex-col py-2 md:py-4">
                        {!startOption ? (
                            <StartOptions builder={true} onStart={handleStart} />
                        ) : showFullScreenCV ? (
                            <CVPreview
                                fullScreen={true}
                                onClose={() => setShowFullScreenCV(false)}
                                showActions={showCVActions}
                                generated={false}
                            />
                        ) : (
                            <div className="flex flex-col md:flex-row flex-1 md:gap-8 md:bg-transparent rounded-lg overflow-hidden">
                                <div
                                    className={`w-full md:w-1/2 p-0 transition-all duration-500 ease-in-out overflow-hidden md:rounded-lg ${isMobile ? (activeView === 'form' ? 'flex-1' : 'hidden') : 'flex-1'
                                        }`}
                                >
                                    <CVForm
                                        activeTab={activeTab}
                                        onTabChange={setActiveTab}
                                        onSubmitSuccess={handleSubmitSuccess}
                                    />
                                </div>

                                <div
                                    className={`w-full md:w-1/2 transition-all duration-500 cv-preview-container md:rounded-lg ${isMobile ? (activeView === 'preview' ? 'flex-1' : 'hidden') : 'flex-1'
                                        }`}
                                >
                                    <div className="h-full p-6 overflow-auto ">
                                        <div className="flex justify-between items-center mb-4">
                                            <h2 className="text-lg font-semibold text-blue-800"></h2>
                                            <div className="flex gap-2">
                                                <TemplateDialog />

                                            </div>
                                        </div>
                                        <div className="p-1 ">
                                            <CVPreview onClose={() => { }} showActions={false} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </CVProvider>
        </TemplateProvider>
    );
};

export default ResumeBuilder;