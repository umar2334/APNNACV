import React from 'react';
import { Plus, X } from 'lucide-react';
import { useCVContext } from '../../../context/CVContext';
import { Language } from '../../../types/cv';

const PROFICIENCIES = ['Native', 'Fluent', 'Professional', 'Intermediate', 'Basic'];

export function LanguagesSection() {
  const { cvData, setCVData } = useCVContext();
  const languages = cvData.languages;

  const addLang = () => {
    const newLang: Language = { id: crypto.randomUUID(), name: '', proficiency: 'Professional' };
    setCVData((prev) => ({ ...prev, languages: [...prev.languages, newLang] }));
  };

  const removeLang = (id: string) =>
    setCVData((prev) => ({ ...prev, languages: prev.languages.filter((l) => l.id !== id) }));

  const updateLang = (id: string, key: keyof Language, val: string) =>
    setCVData((prev) => ({
      ...prev,
      languages: prev.languages.map((l) => (l.id === id ? { ...l, [key]: val } : l)),
    }));

  return (
    <div className="space-y-3">
      {languages.map((lang) => (
        <div key={lang.id} className="flex items-center gap-2">
          <input
            type="text"
            value={lang.name}
            onChange={(e) => updateLang(lang.id, 'name', e.target.value)}
            placeholder="Language (e.g. English)"
            className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all"
          />
          <select
            value={lang.proficiency}
            onChange={(e) => updateLang(lang.id, 'proficiency', e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-2 py-2 text-sm text-gray-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all"
          >
            {PROFICIENCIES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <button
            onClick={() => removeLang(lang.id)}
            className="text-gray-400 hover:text-red-500 p-1.5 rounded-md hover:bg-red-50 transition-all flex-shrink-0"
          >
            <X size={14} />
          </button>
        </div>
      ))}

      <button
        onClick={addLang}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-dashed border-gray-200 text-gray-500 hover:border-purple-300 hover:text-purple-600 hover:bg-purple-50 transition-all text-sm font-medium"
      >
        <Plus size={15} /> Add Language
      </button>
    </div>
  );
}
