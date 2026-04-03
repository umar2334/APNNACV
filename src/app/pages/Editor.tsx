import React from 'react';
import { FormPanel } from '../components/editor/FormPanel';
import { PreviewPanel } from '../components/editor/PreviewPanel';
import { Toolbar } from '../components/editor/Toolbar';

export function Editor() {
  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      {/* Toolbar */}
      <Toolbar />

      {/* Split Screen */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel — Form (40%) */}
        <div
          className="flex-none flex flex-col overflow-hidden border-r border-gray-100"
          style={{ width: '40%', background: '#F9FAFB' }}
        >
          <div className="flex-none flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-white">
            <div>
              <h2 className="text-sm font-bold text-gray-800">Your Information</h2>
              <p className="text-xs text-gray-400 mt-0.5">Changes reflect instantly in the preview →</p>
            </div>
            <div className="flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-700">Live</span>
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <FormPanel />
          </div>
        </div>

        {/* Right Panel — Preview (60%) */}
        <div className="flex-1 overflow-hidden flex flex-col" style={{ background: '#E8ECF0' }}>
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
            <div>
              <h2 className="text-sm font-bold text-gray-800">Live Preview</h2>
              <p className="text-xs text-gray-400 mt-0.5">A4 format • Ready to print</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-blue-50 border border-blue-100 rounded-full text-xs font-semibold text-blue-700">ATS-Safe</span>
              <span className="px-2 py-0.5 bg-gray-50 border border-gray-200 rounded-full text-xs text-gray-500">A4 • 210×297mm</span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <PreviewPanel />
          </div>
        </div>
      </div>
    </div>
  );
}