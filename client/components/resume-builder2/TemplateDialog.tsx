
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';
import { useTemplate } from '@/context/TemplateContext';
import { TemplateType } from '../templates';
import toast from 'react-hot-toast';
import Image from 'next/image';


interface TemplateOption {
    id: TemplateType;
    name: string;
    description: string;
    thumbnail: string;
}

const templates: TemplateOption[] = [
    {
        id: 'modern',
        name: 'Modern',
        description: 'Clean and professional design with blue accents',
        thumbnail: "/templates/template_3.jpg"
    },
    {
        id: 'minimal',
        name: 'Minimal',
        description: 'Simple, clean layout with monochrome design',
        thumbnail: "/templates/template_2.jpg"
    },
    {
        id: 'minimal',
        name: 'Minimal',
        description: 'Simple, clean layout with monochrome design',
        thumbnail: "/templates/template_2.jpg"
    },
    {
        id: 'minimal',
        name: 'Minimal',
        description: 'Simple, clean layout with monochrome design',
        thumbnail: "/templates/template_2.jpg"
    },
    {
        id: 'minimal',
        name: 'Minimal',
        description: 'Simple, clean layout with monochrome design',
        thumbnail: "/templates/template_2.jpg"
    },
    {
        id: 'minimal',
        name: 'Minimal',
        description: 'Simple, clean layout with monochrome design',
        thumbnail: "/templates/template_2.jpg"
    },
    {
        id: 'minimal',
        name: 'Minimal',
        description: 'Simple, clean layout with monochrome design',
        thumbnail: "/templates/template_2.jpg"
    },
    {
        id: 'creative',
        name: 'Creative',
        description: 'Eye-catching design with vibrant colors and timeline',
        thumbnail: "/templates/template_1.jpg"
    }
];

const TemplateDialog = () => {
    const { currentTemplate, setCurrentTemplate } = useTemplate();

    const handleSelectTemplate = (templateId: TemplateType) => {
        setCurrentTemplate(templateId);

        toast.success(`Your CV now uses the ${templates.find(t => t.id === templateId)?.name} template.`);
    };

    return (
        <Dialog >
            <DialogTrigger asChild>
                <Button size={"sm"} className=" border border-custom-moreDarker text-custom-moreDarker hover:bg-gray-100">
                    <Palette size={14} />
                    Change Template
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle className="text-xl">Choose a Template</DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 sm:grid-cols-3 bg-white gap-6 py-4 overflow-y-auto max-h-[70vh]" >
                    {templates.map((template) => (
                        <div
                            key={template.id}
                            className={`relative border rounded-md  cursor-pointer transition-all hover:shadow-md ${currentTemplate === template.id ? 'ring-2 ring-blue-500 shadow-md' : 'hover:border-blue-200'
                                }`}
                            onClick={() => handleSelectTemplate(template.id)}
                        >
                            <div className="  bg-gray-50">
                                <Image
                                    src={template.thumbnail}
                                    alt={template.name}
                                    className="w-full h-full object-cover"
                                    width={300}
                                    height={500}
                                />
                            </div>
                            <div className="p-3">
                                <h3 className="font-medium text-gray-900">{template.name}</h3>
                                <p className="text-sm text-gray-500 mt-1">{template.description}</p>
                            </div>
                            {currentTemplate === template.id && (
                                <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                                    Active
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TemplateDialog;