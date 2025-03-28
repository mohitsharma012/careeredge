
import React, { createContext, useContext, useState } from 'react';
import { TemplateType } from '@/components/templates';

interface TemplateContextType {
  currentTemplate: TemplateType;
  setCurrentTemplate: (template: TemplateType) => void;
}

const TemplateContext = createContext<TemplateContextType | undefined>(undefined);

export const TemplateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTemplate, setCurrentTemplate] = useState<TemplateType>('modern');

  return (
    <TemplateContext.Provider value={{ currentTemplate, setCurrentTemplate }}>
      {children}
    </TemplateContext.Provider>
  );
};

export const useTemplate = (): TemplateContextType => {
  const context = useContext(TemplateContext);
  if (context === undefined) {
    throw new Error('useTemplate must be used within a TemplateProvider');
  }
  return context;
};
