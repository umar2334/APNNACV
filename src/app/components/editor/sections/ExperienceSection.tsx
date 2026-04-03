import React from 'react';
import { Plus, Trash2, Briefcase } from 'lucide-react';
import { useCVContext } from '../../../context/CVContext';
import { Experience } from '../../../types/cv';

export function ExperienceSection() {
  const { cvData, setCVData } = useCVContext();
  const experiences = cvData.experience;

  const addExp = () => {
    const newExp: Experience = {
      id: crypto.randomUUID(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    setCVData((prev) => ({ ...prev, experience: [...prev.experience, newExp] }));
  };

  const removeExp = (id: string) =>
    setCVData((prev) => ({ ...prev, experience: prev.experience.filter((e) => e.id !== id) }));

  const updateExp = (id: string, key: keyof Experience, val: string | boolean) =>
    setCVData((prev) => ({
      ...prev,
      experience: prev.experience.map((e) => (e.id === id ? { ...e, [key]: val } : e)),
    }));

  return (
    <div className="space-y-4">
      {experiences.map((exp, idx) => (
        <div key={exp.id} className="border border-gray-200 rounded-xl p-4 bg-gray-50 relative group">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                <Briefcase size={13} className="text-blue-600" />
              </div>
              <span className="text-sm font-semibold text-gray-700">
                {exp.position || `Experience ${idx + 1}`}
              </span>
            </div>
            <button
              onClick={() => removeExp(exp.id)}
              className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all p-1 rounded-md hover:bg-red-50"
            >
              <Trash2 size={14} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <InputField label="Job Title" value={exp.position} onChange={(v) => updateExp(exp.id, 'position', v)} placeholder="Software Engineer" />
            <InputField label="Company" value={exp.company} onChange={(v) => updateExp(exp.id, 'company', v)} placeholder="Company Name" />
            <InputField label="Start Date" value={exp.startDate} onChange={(v) => updateExp(exp.id, 'startDate', v)} placeholder="Jan 2022" />
            <div>
              <InputField
                label="End Date"
                value={exp.endDate}
                onChange={(v) => updateExp(exp.id, 'endDate', v)}
                placeholder="Dec 2023"
                disabled={exp.current}
              />
              <label className="flex items-center gap-1.5 mt-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => updateExp(exp.id, 'current', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600"
                />
                <span className="text-xs text-gray-500">Currently working here</span>
              </label>
            </div>
            <div className="col-span-2">
              <label className="block mb-1" style={{ fontSize: '11px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Description
              </label>
              <textarea
                rows={3}
                value={exp.description}
                onChange={(e) => updateExp(exp.id, 'description', e.target.value)}
                placeholder="Describe your responsibilities and achievements..."
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all resize-none"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addExp}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-dashed border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all text-sm font-medium"
      >
        <Plus size={15} /> Add Work Experience
      </button>
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  disabled?: boolean;
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
        disabled={disabled}
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all disabled:bg-gray-100 disabled:text-gray-400"
      />
    </div>
  );
}
