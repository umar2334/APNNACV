import React, { useRef } from 'react';
import { useCVContext } from '../../context/CVContext';
import { colorSchemeMap } from '../../types/cv';
import { MinimalistTemplate } from '../templates/MinimalistTemplate';
import ExecutiveTemplate from '../templates/ExecutiveTemplate';
import { ModernTemplate } from '../templates/ModernTemplate';

export function PreviewPanel() {
  const { cvData, setCVData, template, fontFamily, colorScheme } = useCVContext();
  const colors = colorSchemeMap[colorScheme];
  const font = `'${fontFamily}', sans-serif`;
  const previewRef = useRef<HTMLDivElement>(null);

  const handlePhotoChange = (photo: string) => {
    setCVData((prev) => ({ ...prev, personalInfo: { ...prev.personalInfo, photo } }));
  };

  return (
    <div className="h-full overflow-y-auto flex flex-col items-center py-6 px-4" style={{ backgroundColor: '#E8ECF0', scrollbarWidth: 'thin' }}>
      {/* A4 Paper */}
      <div
        id="cv-preview"
        ref={previewRef}
        style={{
          width: '210mm',
          minHeight: '297mm',
          backgroundColor: '#fff',
          boxShadow: '0 4px 32px rgba(0,0,0,0.18)',
          borderRadius: '2px',
          padding: template === 'modern' ? '0' : '28px 32px',
          overflow: 'hidden',
          position: 'relative',
          flexShrink: 0,
        }}
      >
        {template === 'minimalist' && <MinimalistTemplate data={cvData} colors={colors} font={font} />}
        {template === 'executive' && <ExecutiveTemplate data={cvData} />}
        {template === 'modern' && <ModernTemplate data={cvData} colors={colors} font={font} onPhotoChange={handlePhotoChange} />}
      </div>

      <p className="text-xs text-gray-400 mt-4 text-center">
        A4 Format • ATS-Compatible • Live Preview
      </p>
    </div>
  );
}
