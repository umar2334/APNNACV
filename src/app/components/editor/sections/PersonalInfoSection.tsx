import React from 'react';
import { User, Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';
import { useCVContext } from '../../../context/CVContext';

export function PersonalInfoSection() {
  const { cvData, setCVData } = useCVContext();
  const p = cvData.personalInfo;

  const update = (key: keyof typeof p, val: string) =>
    setCVData((prev) => ({ ...prev, personalInfo: { ...prev.personalInfo, [key]: val } }));

  const fields = [
    { key: 'fullName' as const, label: 'Full Name', icon: <User size={14} />, placeholder: 'your name ', colSpan: 2 },
    { key: 'title' as const, label: 'Job Title', icon: <User size={14} />, placeholder: 'Software Engineer', colSpan: 2 },
    { key: 'email' as const, label: 'Email Address', icon: <Mail size={14} />, placeholder: 'umar@example.com', colSpan: 1 },
    { key: 'phone' as const, label: 'Phone Number', icon: <Phone size={14} />, placeholder: '+92 300 0000000', colSpan: 1 },
    { key: 'location' as const, label: 'Location / City', icon: <MapPin size={14} />, placeholder: 'Lahore, Pakistan', colSpan: 1 },
    { key: 'linkedin' as const, label: 'LinkedIn URL', icon: <Linkedin size={14} />, placeholder: 'linkedin.com/in/username', colSpan: 1 },
    { key: 'website' as const, label: 'Website / Portfolio', icon: <Globe size={14} />, placeholder: 'yourwebsite.com', colSpan: 2 },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {fields.map((f) => (
        <div key={f.key} className={f.colSpan === 2 ? 'col-span-2' : 'col-span-1'}>
          <label className="block mb-1" style={{ fontSize: '11px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {f.label}
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#9CA3AF' }}>{f.icon}</span>
            <input
              type="text"
              value={p[f.key]}
              onChange={(e) => update(f.key, e.target.value)}
              placeholder={f.placeholder}
              className="w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
