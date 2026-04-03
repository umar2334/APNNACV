import React from 'react';
import { Plus, X, Zap } from 'lucide-react';
import { useCVContext } from '../../../context/CVContext';
import { Skill } from '../../../types/cv';

const LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

const SUGGESTED = ['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Git', 'TypeScript', 'Docker', 'AWS', 'MongoDB', 'Java', 'C++'];

export function SkillsSection() {
  const { cvData, setCVData } = useCVContext();
  const skills = cvData.skills;

  const addSkill = (name = '') => {
    const newSkill: Skill = { id: crypto.randomUUID(), name, level: 'Intermediate' };
    setCVData((prev) => ({ ...prev, skills: [...prev.skills, newSkill] }));
  };

  const removeSkill = (id: string) =>
    setCVData((prev) => ({ ...prev, skills: prev.skills.filter((s) => s.id !== id) }));

  const updateSkill = (id: string, key: keyof Skill, val: string) =>
    setCVData((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.id === id ? { ...s, [key]: val } : s)),
    }));

  const existingNames = skills.map((s) => s.name.toLowerCase());

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {skills.map((sk) => (
          <div key={sk.id} className="flex items-center gap-2">
            <input
              type="text"
              value={sk.name}
              onChange={(e) => updateSkill(sk.id, 'name', e.target.value)}
              placeholder="Skill name"
              className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all"
            />
            <select
              value={sk.level}
              onChange={(e) => updateSkill(sk.id, 'level', e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-2 py-2 text-sm text-gray-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all"
            >
              {LEVELS.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
            <button
              onClick={() => removeSkill(sk.id)}
              className="text-gray-400 hover:text-red-500 p-1.5 rounded-md hover:bg-red-50 transition-all flex-shrink-0"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => addSkill()}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-dashed border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all text-sm font-medium"
      >
        <Plus size={15} /> Add Skill
      </button>

      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <Zap size={12} className="text-amber-500" />
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Quick Add</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {SUGGESTED.filter((s) => !existingNames.includes(s.toLowerCase())).map((s) => (
            <button
              key={s}
              onClick={() => addSkill(s)}
              className="px-2.5 py-1 rounded-full border border-gray-200 bg-white text-xs text-gray-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all"
            >
              + {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
