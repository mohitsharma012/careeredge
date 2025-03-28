import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Experience = {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
};

export type Education = {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
};

export type Skill = {
  id: string;
  name: string;
  level: number;
};

export type CVData = {
  personal: {
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    summary: string;
  };
  experience: Experience[];
  education: Education[];
  skills: Skill[];
};

const initialState: CVData = {
  personal: {
    firstName: '',
    lastName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    summary: '',
  },
  experience: [],
  education: [],
  skills: [],
};

type CVContextType = {
  cvData: CVData;
  updatePersonal: (data: Partial<CVData['personal']>) => void;
  addExperience: (experience: Omit<Experience, 'id'>) => void;
  updateExperience: (id: string, experience: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addEducation: (education: Omit<Education, 'id'>) => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
};

const CVContext = createContext<CVContextType | undefined>(undefined);

export const CVProvider = ({ children }: { children: ReactNode }) => {
  const [cvData, setCvData] = useState<CVData>(initialState);

  const updatePersonal = (data: Partial<CVData['personal']>) => {
    setCvData((prev) => ({
      ...prev,
      personal: { ...prev.personal, ...data },
    }));
  };

  const addExperience = (experience: Omit<Experience, 'id'>) => {
    const id = crypto.randomUUID();
    setCvData((prev) => ({
      ...prev,
      experience: [...prev.experience, { ...experience, id }],
    }));
  };

  const updateExperience = (id: string, experience: Partial<Experience>) => {
    setCvData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, ...experience } : exp
      ),
    }));
  };

  const removeExperience = (id: string) => {
    setCvData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  const addEducation = (education: Omit<Education, 'id'>) => {
    const id = crypto.randomUUID();
    setCvData((prev) => ({
      ...prev,
      education: [...prev.education, { ...education, id }],
    }));
  };

  const updateEducation = (id: string, education: Partial<Education>) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, ...education } : edu
      ),
    }));
  };

  const removeEducation = (id: string) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  const addSkill = (skill: Omit<Skill, 'id'>) => {
    const id = crypto.randomUUID();
    setCvData((prev) => ({
      ...prev,
      skills: [...prev.skills, { ...skill, id }],
    }));
  };

  const updateSkill = (id: string, skill: Partial<Skill>) => {
    setCvData((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.id === id ? { ...s, ...skill } : s)),
    }));
  };

  const removeSkill = (id: string) => {
    setCvData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id),
    }));
  };

  return (
    <CVContext.Provider
      value={{
        cvData,
        updatePersonal,
        addExperience,
        updateExperience,
        removeExperience,
        addEducation,
        updateEducation,
        removeEducation,
        addSkill,
        updateSkill,
        removeSkill,
      }}
    >
      {children}
    </CVContext.Provider>
  );
};

export const useCV = (): CVContextType => {
  const context = useContext(CVContext);
  if (context === undefined) {
    throw new Error('useCV must be used within a CVProvider');
  }
  return context;
};