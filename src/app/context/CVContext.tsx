import React, { createContext, useContext, useState } from 'react';
import {
  CVData,
  TemplateType,
  FontFamily,
  ColorScheme,
  DEFAULT_CV_DATA,
} from '../types/cv';

interface CVContextType {
  cvData: CVData;
  setCVData: React.Dispatch<React.SetStateAction<CVData>>;
  template: TemplateType;
  setTemplate: (t: TemplateType) => void;
  fontFamily: FontFamily;
  setFontFamily: (f: FontFamily) => void;
  colorScheme: ColorScheme;
  setColorScheme: (c: ColorScheme) => void;
  activeSection: string | null;
  setActiveSection: (s: string | null) => void;
}

const CVContext = createContext<CVContextType | undefined>(undefined);

export function CVProvider({ children }: { children: React.ReactNode }) {
  const [cvData, setCVData] = useState<CVData>(DEFAULT_CV_DATA);
  const [template, setTemplate] = useState<TemplateType>('minimalist');
  const [fontFamily, setFontFamily] = useState<FontFamily>('Inter');
  const [colorScheme, setColorScheme] = useState<ColorScheme>('blue');
  const [activeSection, setActiveSection] = useState<string | null>('personal');

  return (
    <CVContext.Provider
      value={{
        cvData,
        setCVData,
        template,
        setTemplate,
        fontFamily,
        setFontFamily,
        colorScheme,
        setColorScheme,
        activeSection,
        setActiveSection,
      }}
    >
      {children}
    </CVContext.Provider>
  );
}

export function useCVContext() {
  const ctx = useContext(CVContext);
  if (!ctx) throw new Error('useCVContext must be used inside CVProvider');
  return ctx;
}
