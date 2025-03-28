import React from 'react';
import ModernTemplate from './ModernTemplate';
import MinimalTemplate from './MinimalTemplate';
import CreativeTemplate from './CreativeTemplate';

export type TemplateType = 'modern' | 'minimal' | 'creative';

interface TemplateProps {
  template: TemplateType;
  isEditing?: boolean;
  editedData?: any;
  handleChange?: (field: string, value: any) => void;
}

const Template: React.FC<TemplateProps> = ({ 
  template, 
  isEditing = false, 
  editedData, 
  handleChange 
}) => {
  // Ensure we always pass all editing props consistently to all templates
  const editProps = {
    isEditing,
    editedData,
    handleChange
  };

  switch (template) {
    case 'modern':
      return <ModernTemplate {...editProps} />;
    case 'minimal':
      return <MinimalTemplate {...editProps} />;
    case 'creative':
      return <CreativeTemplate {...editProps} />;
    default:
      return <ModernTemplate {...editProps} />;
  }
};

export default Template;
