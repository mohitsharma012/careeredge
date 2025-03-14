import { create } from 'zustand';
import { ResumeData } from './types';

interface ResumeStore {
  resumeData: ResumeData;
  undoHistory: ResumeData[];
  redoHistory: ResumeData[];
  updateResumeData: (data: ResumeData) => void;
  undo: () => void;
  redo: () => void;
}

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    website: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
};

export const useResumeStore = create<ResumeStore>((set) => ({
  resumeData: initialResumeData,
  undoHistory: [],
  redoHistory: [],
  updateResumeData: (data) =>
    set((state) => ({
      resumeData: data,
      undoHistory: [...state.undoHistory, state.resumeData],
      redoHistory: [],
    })),
  undo: () =>
    set((state) => {
      if (state.undoHistory.length === 0) return state;
      const previousState = state.undoHistory[state.undoHistory.length - 1];
      return {
        resumeData: previousState,
        undoHistory: state.undoHistory.slice(0, -1),
        redoHistory: [state.resumeData, ...state.redoHistory],
      };
    }),
  redo: () =>
    set((state) => {
      if (state.redoHistory.length === 0) return state;
      const nextState = state.redoHistory[0];
      return {
        resumeData: nextState,
        undoHistory: [...state.undoHistory, state.resumeData],
        redoHistory: state.redoHistory.slice(1),
      };
    }),
}));