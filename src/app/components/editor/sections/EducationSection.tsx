import React from 'react';
import { Plus, Trash2, GraduationCap } from 'lucide-react';
import { useCVContext } from '../../../context/CVContext';
import { Education } from '../../../types/cv';

export function EducationSection() {
  const { cvData, setCVData } = useCVContext();
  const educations = cvData.education;

  const addEdu = () => {
    const newEdu: Education = {
      id: crypto.randomUUID(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      grade: '',
    };
    setCVData((prev) => ({ ...prev, education: [...prev.education, newEdu] }));
  };

  const removeEdu = (id: string) =>
    setCVData((prev) => ({ ...prev, education: prev.education.filter((e) => e.id !== id) }));

  const updateEdu = (id: string, key: keyof Education, val: string) =>
    setCVData((prev) => ({
      ...prev,
      education: prev.education.map((e) => (e.id === id ? { ...e, [key]: val } : e)),
    }));

  return (
    <div className="space-y-4">
      {educations.map((edu, idx) => (
        <div key={edu.id} className="border border-gray-200 rounded-xl p-4 bg-gray-50 relative group">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center">
                <GraduationCap size={13} className="text-emerald-600" />
              </div>
              <span className="text-sm font-semibold text-gray-700">
                {edu.institution || `Education ${idx + 1}`}
              </span>
            </div>
            <button
              onClick={() => removeEdu(edu.id)}
              className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all p-1 rounded-md hover:bg-red-50"
            >
              <Trash2 size={14} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <InputField label="Institution" value={edu.institution} onChange={(v) => updateEdu(edu.id, 'institution', v)} placeholder="University / College Name" />
            </div>
            <InputField label="Degree" value={edu.degree} onChange={(v) => updateEdu(edu.id, 'degree', v)} placeholder="Bachelor of Science" />
            <InputField label="Field of Study" value={edu.field} onChange={(v) => updateEdu(edu.id, 'field', v)} placeholder="Computer Science" />
            <InputField label="Start Date" value={edu.startDate} onChange={(v) => updateEdu(edu.id, 'startDate', v)} placeholder="Sep 2016" />
            <InputField label="End Date" value={edu.endDate} onChange={(v) => updateEdu(edu.id, 'endDate', v)} placeholder="Jun 2020" />
            <div className="col-span-2">
              <InputField label="Grade / GPA" value={edu.grade} onChange={(v) => updateEdu(edu.id, 'grade', v)} placeholder="3.8 GPA / A+" />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addEdu}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-dashed border-gray-200 text-gray-500 hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50 transition-all text-sm font-medium"
      >
        <Plus size={15} /> Add Education
      </button>
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label className="block mb-1" style={{ fontSize: '11px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all"
      />
    </div>
  );
}
