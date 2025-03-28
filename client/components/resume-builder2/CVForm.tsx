
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Zap, Sparkles, Save, Send } from 'lucide-react';
import PersonalInfoForm from './PersonalInfoForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';
import { useIsMobile } from '@/hooks/use-mobile';
import { useCV } from '@/context/CVContext';
import toast from 'react-hot-toast';

interface CVFormProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
    onSubmitSuccess: () => void;
}

const CVForm = ({ activeTab, onTabChange, onSubmitSuccess }: CVFormProps) => {
    const isMobile = useIsMobile();
    const { cvData } = useCV();

    // Define tab order for navigation
    const tabOrder = ['personal', 'experience', 'education', 'skills'];
    const currentTabIndex = tabOrder.indexOf(activeTab);

    // Navigation functions
    const goToNextTab = () => {
        if (currentTabIndex < tabOrder.length - 1) {
            onTabChange(tabOrder[currentTabIndex + 1]);

            
            toast.success("Continue building your CV");
        }
    };

    const goToPreviousTab = () => {
        if (currentTabIndex > 0) {
            onTabChange(tabOrder[currentTabIndex - 1]);

            // Show a toast notification when changing tabs
            
            toast.success("Edit your previous information");
        }
    };

    const handleSubmit = () => {
        // Basic validation
        let isValid = true;
        let message = '';

        // Check if at least one experience entry exists
        if (cvData.experience.length === 0) {
            isValid = false;
            message = "Please add at least one work experience";
        }

        // Check if at least one education entry exists
        if (cvData.education.length === 0) {
            isValid = false;
            message = message || "Please add at least one education entry";
        }

        // Check if at least one skill exists
        if (cvData.skills.length === 0) {
            isValid = false;
            message = message || "Please add at least one skill";
        }

        // Check personal info
        const requiredPersonalFields = ['firstName', 'lastName', 'email'] as const;
        for (const field of requiredPersonalFields) {
            if (!cvData.personal[field as keyof typeof cvData.personal] || cvData.personal[field as keyof typeof cvData.personal].trim() === '') {
                isValid = false;
                message = message || "Please complete your personal information";
                break;
            }
        }

        if (isValid) {            
            toast.success("Your CV is ready for download");

            // Call the onSubmitSuccess callback to show the full-screen CV preview
            onSubmitSuccess();

            console.log("CV is valid and ready for download", cvData);
        } else {
           
            toast.error("Please complete all required sections before submitting");
        }
    };

    // Render the appropriate form based on activeTab
    const renderActiveForm = () => {
        switch (activeTab) {
            case 'personal':
                return <PersonalInfoForm />;
            case 'experience':
                return <ExperienceForm />;
            case 'education':
                return <EducationForm />;
            case 'skills':
                return <SkillsForm />;
            default:
                return <PersonalInfoForm />;
        }
    };

    return (
        <div className="h-full flex flex-col  cv-form-container rounded-lg  shadow-xl relative">

            <div className="bg-blue-50/30 backdrop-blur-sm rounded-xl   p-5 flex-1  relative neo-border">
                <div className="flex-1 overflow-y-auto pb-16 mt-0 animate-fade-in">
                    {renderActiveForm()}
                </div>

            </div>

            {/* Navigation buttons */}
            <div className="flex ms-auto gap-4 mb-8">
                <Button
                    variant="outline"
                    onClick={goToPreviousTab}
                    disabled={currentTabIndex === 0}
                    className="flex items-center gap-2 w-24 border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                    <ChevronLeft className="h-4 w-4" />
                    Back
                </Button>

                {activeTab === 'skills' ? (
                    <Button
                        onClick={handleSubmit}
                        className="flex items-center gap-2 w-32 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white"
                    >
                        <Send className="h-4 w-4" />
                        Submit CV
                    </Button>
                ) : (
                    <Button
                        onClick={goToNextTab}
                        disabled={currentTabIndex === tabOrder.length - 1}
                        className="flex items-center gap-2 w-24 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white"
                    >
                        Next
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                )}
            </div>
        </div>
    );
};

export default CVForm;