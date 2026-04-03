import React from 'react';
import { useCVContext } from '../../../context/CVContext';

export function SummarySection() {
  const { cvData, setCVData } = useCVContext();

  return (
    <div>
      <p className="text-xs text-gray-500 mb-2">
        Write a concise 2–4 sentence paragraph highlighting your top skills, experience, and career goals. ATS systems scan this section first.
      </p>
      <textarea
        rows={5}
        value={cvData.summary}
        onChange={(e) => setCVData((prev) => ({ ...prev, summary: e.target.value }))}
        placeholder="Results-driven professional with X years of experience in..."
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all resize-none"
      />
      <p className="text-xs text-gray-400 mt-1 text-right">{cvData.summary.length} characters</p>
    </div>
  );
}
