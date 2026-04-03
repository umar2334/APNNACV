import React from 'react';
import {
  User, FileText, Briefcase, GraduationCap, Star, Languages, ChevronDown, ChevronUp,
} from 'lucide-react';
import { useCVContext } from '../../context/CVContext';
import { PersonalInfoSection } from './sections/PersonalInfoSection';
import { SummarySection } from './sections/SummarySection';
import { ExperienceSection } from './sections/ExperienceSection';
import { EducationSection } from './sections/EducationSection';
import { SkillsSection } from './sections/SkillsSection';
import { LanguagesSection } from './sections/LanguagesSection';

const SECTIONS = [
  { id: 'personal', label: 'Personal Info', icon: <User size={15} />, color: '#3B82F6', component: <PersonalInfoSection /> },
  { id: 'summary', label: 'Professional Summary', icon: <FileText size={15} />, color: '#8B5CF6', component: <SummarySection /> },
  { id: 'experience', label: 'Work Experience', icon: <Briefcase size={15} />, color: '#F59E0B', component: <ExperienceSection /> },
  { id: 'education', label: 'Education', icon: <GraduationCap size={15} />, color: '#10B981', component: <EducationSection /> },
  { id: 'skills', label: 'Skills', icon: <Star size={15} />, color: '#EF4444', component: <SkillsSection /> },
  { id: 'languages', label: 'Languages', icon: <Languages size={15} />, color: '#6366F1', component: <LanguagesSection /> },
];

export function FormPanel() {
  const { activeSection, setActiveSection } = useCVContext();

  const toggle = (id: string) => setActiveSection(activeSection === id ? null : id);

  return (
    <div className="h-full overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#E5E7EB transparent' }}>
      <div className="p-5 space-y-3">
        {/* ATS notice */}
        <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl p-3 mb-4">
          <span className="text-lg mt-0.5">🎯</span>
          <div>
            <p className="text-xs font-semibold text-blue-800">ATS-Optimized Templates</p>
            <p className="text-xs text-blue-600 mt-0.5">
              All templates are parsed correctly by Applicant Tracking Systems. Fill in all sections for best results.
            </p>
          </div>
        </div>

        {SECTIONS.map((sec, idx) => {
          const isOpen = activeSection === sec.id;
          return (
            <div key={sec.id} className="rounded-xl overflow-hidden shadow-sm border border-gray-100">
              <button
                onClick={() => toggle(sec.id)}
                className="w-full flex items-center justify-between px-4 py-3.5 bg-white hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${sec.color}18`, color: sec.color }}
                  >
                    {sec.icon}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-800">{sec.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Step {idx + 1} of {SECTIONS.length}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: sec.color }}
                  >
                    ✓
                  </span>
                  {isOpen ? <ChevronUp size={15} className="text-gray-400" /> : <ChevronDown size={15} className="text-gray-400" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-3 bg-white border-t border-gray-100">
                  {sec.component}
                </div>
              )}
            </div>
          );
        })}

        <div className="h-6" />
      </div>
    </div>
  );
}