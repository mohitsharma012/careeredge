
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Upload, PlusCircle, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import logoSvg from '@/public/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
interface StartOptionsProps {
    onStart: (option: 'upload' | 'create') => void;
}

const StartOptions = ({ onStart }: StartOptionsProps, builder=false) => {
    const { toast } = useToast();
    const [isUploading, setIsUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setIsUploading(true);
            setUploadStatus('loading');

            // Simulate processing time
            setTimeout(() => {
                setIsUploading(false);
                setUploadStatus('success');

                toast({
                    title: "CV Uploaded Successfully",
                    description: "Your CV has been processed. We'll help you enhance it.",
                    variant: "default",
                });

                // Reset file input
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }

                // Wait a moment to show success state before starting
                setTimeout(() => {
                    onStart('upload');
                }, 800);
            }, 1500);
        }
    };

    const triggerFileUpload = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="h-fit my-auto flex flex-col items-center justify-center p-6 md:p-8 relative overflow-hidden">


            {/* Header with enhanced styling */}
            {builder && (
            <div className="text-center mb-10 max-w-2xl animate-fade-in relative z-10">
                <Link href={"/"} className="flex items-center gap-2 w-fit mx-auto mb-2 ">
                    <Image src={logoSvg} alt="Logo" width={250} />
                </Link>
                <p className="text-lg md:text-base text-custom-moreDarker/70 max-w-2xl mx-auto leading-relaxed">
                    Generate a professional, AI-optimized CV tailored to your job description, ensuring keyword alignment and industry-specific formatting for maximum impact.
                </p>
            </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-4xl mb-8 animate-fade-in relative z-10">
                {/* Upload option */}
                <Card className="group rounded-xl border-blue-100 shadow-lg hover:shadow-custom-light hover:-translate-y-1 transition-all duration-300 overflow-hidden bg-white/90 backdrop-blur-sm relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent pointer-events-none"></div>
                    <div className="absolute top-0 left-0 w-20 h-20 bg-blue-50 rounded-full -translate-x-1/2 -translate-y-1/2 filter blur-md opacity-50"></div>

                    <CardContent className="p-8">
                        <div className="flex flex-col items-center text-center h-full">
                            <div className="w-20 h-20 flex items-center justify-center bg-blue-50/80 rounded-full mb-5 border border-blue-100 group-hover:scale-105 transition-transform duration-300 relative">
                                <Upload className="h-8 w-8 text-blue-500 group-hover:text-blue-600 transition-colors" />
                                <span className="absolute top-0 right-0 w-full h-full bg-blue-100 rounded-full opacity-0 group-hover:opacity-30 scale-0 group-hover:scale-100 transition-all duration-500"></span>
                            </div>

                            <h3 className="text-2xl font-semibold mb-3 text-custom-moreDarker">Upload Existing CV</h3>
                            <p className="text-custom-moreDarker/80 mb-6 px-2">Import your existing CV document and we&apos;ll help you enhance it for better results</p>

                            <div className="mt-auto w-full">
                                <Button
                                    onClick={triggerFileUpload}
                                    disabled={isUploading}
                                    variant="outline"
                                    className="w-full border-blue-200 text-custom-moreDarker hover:bg-blue-50 gap-2 h-12 relative overflow-hidden group"
                                >
                                    {uploadStatus === 'loading' ? (
                                        <>
                                            <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full mr-2"></div>
                                            Processing...
                                        </>
                                    ) : uploadStatus === 'success' ? (
                                        <>
                                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                                            Uploaded Successfully
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="h-4 w-4" />
                                            Choose File
                                        </>
                                    )}

                                </Button>
                                <input
                                    ref={fileInputRef}
                                    id="cv-upload"
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    className="hidden"
                                    onChange={handleUpload}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Create from scratch option */}
                <Card className="group rounded-xl border-blue-100 shadow-lg hover:shadow-custom-light hover:-translate-y-1 transition-all duration-300 overflow-hidden bg-white/90 backdrop-blur-sm relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent pointer-events-none"></div>
                    <div className="absolute bottom-0 right-0 w-16 h-16 bg-blue-50 rounded-full translate-x-1/2 translate-y-1/2 filter blur-md opacity-50"></div>

                    <CardContent className="p-8">
                        <div className="flex flex-col items-center text-center h-full">
                            <div className="w-20 h-20 flex items-center justify-center bg-blue-50/80 rounded-full mb-5 border border-blue-100 group-hover:scale-105 transition-transform duration-300 relative">
                                <PlusCircle className="h-8 w-8 text-blue-500 group-hover:text-blue-600 transition-colors" />
                                <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-blue-400 animate-pulse" />
                                <span className="absolute top-0 right-0 w-full h-full bg-blue-100 rounded-full opacity-0 group-hover:opacity-30 scale-0 group-hover:scale-100 transition-all duration-500"></span>
                            </div>

                            <h3 className="text-2xl font-semibold mb-3 text-custom-moreDarker">Create New CV</h3>
                            <p className="text-blue-600/80 mb-6 px-2">Build your CV from scratch with our step-by-step guide and professional templates</p>

                            <div className="mt-auto w-full">
                                <Button
                                    onClick={() => onStart('create')}
                                    className="w-full bg-gradient-to-r from-custom-dark to-custom-darker text-white gap-2 h-12 relative overflow-hidden group hover:opacity-90 transition-opacity"
                                >
                                    <PlusCircle className="h-4 w-4" />
                                    Get Started
                                    <div className="absolute inset-0 w-full transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 pointer-events-none bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-60"></div>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {builder && (

            <div className="flex flex-col items-center gap-4 text-center max-w-lg animate-fade-in relative z-10">
                <div className="text-blue-500/70 text-sm flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-400" />
                    <span>Your data stays private and secure</span>
                </div>
                <div className="text-blue-500/70 text-sm flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-400" />
                    <span>Export to PDF, DOCX or share online anytime</span>
                </div>
                <div className="text-blue-500/70 text-sm flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-400" />
                    <span>ATS-friendly formats to pass resume scanners</span>
                </div>
            </div>
            )}

        </div>
    );
};

export default StartOptions;
