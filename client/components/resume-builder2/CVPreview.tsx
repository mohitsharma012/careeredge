import React, { useState } from 'react';
import Template from '../templates';
import { useTemplate } from '@/context/TemplateContext';
import TemplateDialog from './TemplateDialog';
import { Button } from '../ui/button';
import { X, Edit, Check, Save, Download, Send, Sparkles, FileType } from 'lucide-react';
import { useCV } from '@/context/CVContext';
import toast from 'react-hot-toast';
import { Progress } from '@/components/ui/progress';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";

const CVPreview = ({ fullScreen = false, onClose, showActions = false, generated = false }: {
    fullScreen?: boolean;
    onClose: () => void;
    showActions?: boolean;
    generated?: boolean;

}) => {
    const { currentTemplate } = useTemplate();
    const { cvData, updatePersonal } = useCV();
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState(cvData.personal);
    const [downloadFormat, setDownloadFormat] = useState('pdf');
    const [isDownloadOpen, setIsDownloadOpen] = useState(false);
    const [email, setEmail] = useState('');
    const router = useRouter();
    generated = true;


    // Mock ATS scores (these would be calculated based on the resume content in a real app)
    const atsScore = 78;
    const keywordMatchScore = 65;
    const relevanceScore = 82;

    const handleEditToggle = () => {
        if (isEditing) {
            // Save changes
            updatePersonal(editedData);
            setIsEditing(false);


            toast.success("Your resume has been updated successfully.");
        } else {
            // Refresh edited data with current data before entering edit mode
            setEditedData(cvData.personal);
            setIsEditing(true);
        }
    };

    const handleChange = (field: string, value: any) => {
        setEditedData(prev => ({ ...prev, [field]: value }));
    };

    const handleDownload = (format: string) => {

        toast.success(`Your resume has been downloaded successfully in ${format.toUpperCase()} format.`);
        setIsDownloadOpen(false);
    };

    const handleSend = () => {

        if (!email) {
            toast.error("Please enter a valid email address.");
            return;
        }
        // check if email is valid
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        toast.success("Your resume has been sent successfully.");
    };

    const handleOptimize = () => {

        toast.loading("We're optimizing your resume for better ATS scores.");
    };

    const handleSaveResume = () => {
        toast.success("Your resume has been saved successfully")
        router.push("/pricing");

    };

    return (
        <div className={`${fullScreen ? 'fixed inset-0 bg-white z-50 p-4 overflow-auto' : 'max-w-[800px] mx-auto overflow-y-auto h-full border border-blue-50 interactive-card'}`}>
            {/* {fullScreen && (
                <div className="sticky top-0 z-10 flex justify-between items-center bg-white/90 backdrop-blur-sm p-4 border-b border-blue-100 mb-4">
                    <h2 className="text-xl font-bold text-blue-800">Your Resume</h2>
                    <div className="flex gap-2">

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClose}
                            className="flex items-center gap-1"
                        >
                            <X className="h-4 w-4" />
                            Close
                        </Button>
                    </div>
                </div>
            )} */}

            {/* ATS Score Section - Only shown in fullScreen mode or when showActions is true */}
            {((fullScreen || showActions) && generated) && (
                <div className="bg-blue-50/80 rounded-lg p-4 mb-4 border border-blue-100">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">ATS Analysis</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-blue-700">ATS Score</span>
                                <span className="text-sm font-medium text-blue-900">{atsScore}%</span>
                            </div>
                            <Progress
                                value={atsScore}
                                className="h-2 bg-blue-200"
                                indicatorClassName={`${atsScore > 70 ? 'bg-green-500' : atsScore > 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            />
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-blue-700">Keyword Match</span>
                                <span className="text-sm font-medium text-blue-900">{keywordMatchScore}%</span>
                            </div>
                            <Progress
                                value={keywordMatchScore}
                                className="h-2 bg-blue-200"
                                indicatorClassName={`${keywordMatchScore > 70 ? 'bg-green-500' : keywordMatchScore > 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            />
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-blue-700">Relevance</span>
                                <span className="text-sm font-medium text-blue-900">{relevanceScore}%</span>
                            </div>
                            <Progress
                                value={relevanceScore}
                                className="h-2 bg-blue-200"
                                indicatorClassName={`${relevanceScore > 70 ? 'bg-green-500' : relevanceScore > 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            />
                        </div>
                    </div>
                </div>
            )}

            <Template
                template={currentTemplate}
                isEditing={isEditing}
                editedData={editedData}
                handleChange={handleChange}
            />

            {/* Fixed action buttons at the bottom - Only shown in fullScreen mode or when showActions is true */}
            {(fullScreen || showActions) && (
                <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-4 border-t border-blue-100 shadow-lg flex justify-center gap-4">
                    {generated && (
                        <>

                            <Popover open={isDownloadOpen} onOpenChange={setIsDownloadOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="default"
                                        size="sm"
                                        className="flex items-center gap-2  bg-custom-moreDarker text-white/90 px-3 hover:bg-blue-700"
                                    >
                                        <Download className="h-4 w-4" />
                                        Download
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-48 p-2 bg-white">
                                    <div className="space-y-2">
                                        <h4 className="text-sm font-medium mb-2">Select Format</h4>
                                        <div className="grid gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleDownload('pdf')}
                                                className="justify-start text-left w-full hover:bg-gray-100"
                                            >
                                                <FileType className="h-4 w-4 mr-2" />
                                                PDF (.pdf)
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleDownload('doc')}
                                                className="justify-start text-left w-full hover:bg-gray-100"
                                            >
                                                <FileType className="h-4 w-4 mr-2" />
                                                Word (.doc)
                                            </Button>

                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>



                            <Dialog >
                                <DialogTrigger asChild>
                                    <Button size="sm" className='border border-custom-moreDarker text-custom-moreDarker hover:bg-gray-100'>
                                        <Send className="h-4 w-4" />
                                        Send Resume</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px] bg-white">
                                    <DialogHeader>
                                        <DialogTitle>Send Resume to Email</DialogTitle>
                                        <DialogDescription>
                                            Get you Generated Resume in your Email
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="name" className="text-right">
                                                Email
                                            </Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                className="col-span-3"
                                                onChange={(e) => setEmail(e.target.value)}
                                                value={email}
                                                placeholder='mohit@gmail.com'
                                                type='email'
                                            />
                                        </div>

                                    </div>
                                    <DialogFooter>
                                        <Button type="submit" onClick={handleSend} className='bg-custom-darker text-white hover:bg-custom-darker/90'>Sent Mail</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleOptimize}
                                className="flex items-center gap-2 border border-custom-moreDarker text-custom-moreDarker hover:bg-gray-100"
                            >
                                <Sparkles className="h-4 w-4" />
                                Optimize More
                            </Button>
                            <TemplateDialog />
                        </>
                    )}

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleEditToggle}
                        className={`flex items-center gap-1 border border-custom-moreDarker text-custom-moreDarker hover:bg-gray-100 ${isEditing ? 'bg-green-50 border-green-200 text-green-600 hover:bg-green-100' : ''}`}
                    >
                        {isEditing ? (
                            <>
                                <Save className="h-4 w-4" />
                                Save Changes
                            </>
                        ) : (
                            <>
                                <Edit className="h-4 w-4" />
                                Edit Resume
                            </>
                        )}
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSaveResume}
                        className={`flex items-center gap-1 border border-custom-moreDarker text-custom-moreDarker hover:bg-gray-100 ${isEditing ? 'bg-green-50 border-green-200 text-green-600 hover:bg-green-100' : ''}`}
                    >
                        Save Resume
                    </Button>

                </div>
            )}
        </div>
    );
};

export default CVPreview;