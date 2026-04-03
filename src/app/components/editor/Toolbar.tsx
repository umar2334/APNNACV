import React, { useState } from 'react';
import { Download, ChevronDown, Palette, Type, LayoutTemplate, Check, Sparkles } from 'lucide-react';
import { useCVContext } from '../../context/CVContext';
import { TemplateType, FontFamily, ColorScheme, colorSchemeMap } from '../../types/cv';
import domtoimage from 'dom-to-image-more';
import jsPDF from 'jspdf';
// html2canvas removed - using dom-to-image-more to avoid oklch parse errors

const TEMPLATES: { id: TemplateType; label: string; desc: string; tag: string; preview: React.ReactNode }[] = [
  {
    id: 'minimalist',
    label: 'The Minimalist',
    desc: 'Single column, clean & modern',
    tag: 'ATS Score: 99%',
    preview: (
      <div className="w-full h-full flex flex-col gap-0.5 p-1.5">
        <div className="h-2.5 bg-blue-600 rounded-sm w-3/4" />
        <div className="h-1 bg-gray-300 rounded-sm w-1/2" />
        <div className="h-px bg-gray-200 mt-0.5" />
        {[1,2,3].map(i => <div key={i} className="h-1 bg-gray-200 rounded-sm mt-0.5" style={{ width: `${70 + i * 5}%` }} />)}
        <div className="h-px bg-gray-200 mt-1" />
        {[1,2].map(i => <div key={i} className="h-1 bg-gray-200 rounded-sm mt-0.5 w-full" />)}
      </div>
    ),
  },
  {
    id: 'executive',
    label: 'The Executive',
    desc: 'Classic style with sidebar',
    tag: 'ATS Score: 97%',
    preview: (
      <div className="w-full h-full flex flex-col gap-0.5 p-0">
        <div className="bg-blue-700 p-1.5 rounded-sm">
          <div className="h-2 bg-white/80 rounded-sm w-2/3" />
          <div className="h-1 bg-white/50 rounded-sm w-1/3 mt-0.5" />
        </div>
        <div className="flex gap-1 flex-1 p-1">
          <div className="flex-1 space-y-0.5">
            {[1,2,3,4].map(i => <div key={i} className="h-1 bg-gray-200 rounded-sm" />)}
          </div>
          <div className="w-8 space-y-1">
            <div className="h-5 bg-blue-50 rounded-sm" />
            <div className="h-4 bg-blue-50 rounded-sm" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'modern',
    label: 'The Modern',
    desc: 'Sidebar for skills & contact',
    tag: 'ATS Score: 95%',
    preview: (
      <div className="w-full h-full flex rounded-sm overflow-hidden">
        <div className="w-10 bg-blue-800 p-1 space-y-1">
          <div className="h-4 w-4 bg-white/30 rounded-full mx-auto" />
          <div className="h-1 bg-white/50 rounded-sm" />
          <div className="h-1 bg-white/30 rounded-sm" />
          <div className="h-1 bg-white/30 rounded-sm" />
        </div>
        <div className="flex-1 p-1.5 space-y-0.5">
          {[1,2,3,4,5].map(i => <div key={i} className="h-1 bg-gray-200 rounded-sm" style={{ width: `${60 + i * 7}%` }} />)}
        </div>
      </div>
    ),
  },
];

const FONTS: { id: FontFamily; label: string; sample: string }[] = [
  { id: 'Inter', label: 'Inter', sample: 'Aa' },
  { id: 'Roboto', label: 'Roboto', sample: 'Aa' },
  { id: 'Merriweather', label: 'Merriweather', sample: 'Aa' },
  { id: 'Playfair Display', label: 'Playfair', sample: 'Aa' },
];

const COLORS: { id: ColorScheme; label: string }[] = [
  { id: 'blue', label: 'Blue' },
  { id: 'green', label: 'Green' },
  { id: 'purple', label: 'Purple' },
  { id: 'crimson', label: 'Red' },
  { id: 'dark', label: 'Dark' },
];

export function Toolbar() {
  const { template, setTemplate, fontFamily, setFontFamily, colorScheme, setColorScheme } = useCVContext();
  const [openDropdown, setOpenDropdown] = useState<'template' | 'font' | 'color' | null>(null);
  const [downloading, setDownloading] = useState(false);

  const toggleDropdown = (name: 'template' | 'font' | 'color') =>
    setOpenDropdown(openDropdown === name ? null : name);

  const handleDownload = async () => {
    const element = document.getElementById('cv-preview');
    if (!element) return;
    setDownloading(true);

    const prevShadow = element.style.boxShadow;
    const prevRadius = element.style.borderRadius;
    element.style.boxShadow = 'none';
    element.style.borderRadius = '0';

    try {
      const scale = 2;
      const dataUrl = await domtoimage.toPng(element, {
        width: element.offsetWidth * scale,
        height: element.offsetHeight * scale,
        style: {
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: element.offsetWidth + 'px',
          height: element.offsetHeight + 'px',
        },
      });

      element.style.boxShadow = prevShadow;
      element.style.borderRadius = prevRadius;

      const img = new Image();
      img.src = dataUrl;
      await new Promise((res) => { img.onload = res; });

      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const PAGE_W = 210;
      const PAGE_H = 297;
      const imgH = (img.height * PAGE_W) / img.width;

      if (imgH <= PAGE_H) {
        pdf.addImage(dataUrl, 'PNG', 0, 0, PAGE_W, imgH);
      } else {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0);
        const pageHeightPx = Math.floor((PAGE_H / PAGE_W) * img.width);
        let y = 0;
        let page = 0;
        while (y < img.height) {
          const h = Math.min(pageHeightPx, img.height - y);
          const pc = document.createElement('canvas');
          pc.width = img.width;
          pc.height = h;
          const pctx = pc.getContext('2d')!;
          pctx.fillStyle = '#fff';
          pctx.fillRect(0, 0, pc.width, pc.height);
          pctx.drawImage(canvas, 0, y, img.width, h, 0, 0, img.width, h);
          if (page > 0) pdf.addPage();
          pdf.addImage(pc.toDataURL('image/png'), 'PNG', 0, 0, PAGE_W, (h * PAGE_W) / img.width);
          y += pageHeightPx;
          page++;
        }
      }

      pdf.save('AppnaCv.pdf');
    } catch (err: unknown) {
      element.style.boxShadow = prevShadow;
      element.style.borderRadius = prevRadius;
      console.error('PDF error:', err);
      alert('Download failed: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setDownloading(false);
    }
  };

  const currentTemplate = TEMPLATES.find((t) => t.id === template)!;
  const currentFont = FONTS.find((f) => f.id === fontFamily)!;

  return (
    <div className="flex items-center gap-2 px-4 py-3 bg-white border-b border-gray-100 shadow-sm relative z-30 flex-wrap">
      {/* Template Selector */}
      <div className="relative">
        <button
          onClick={() => toggleDropdown('template')}
          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-sm font-medium text-gray-700 transition-all"
        >
          <LayoutTemplate size={14} className="text-gray-500" />
          <span>{currentTemplate.label}</span>
          <ChevronDown size={12} className="text-gray-400" />
        </button>

        {openDropdown === 'template' && (
          <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 p-3 z-50 w-72">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-1">Choose Template</p>
            <div className="space-y-2">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setTemplate(t.id); setOpenDropdown(null); }}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-lg border-2 transition-all ${
                    template === t.id ? 'border-blue-500 bg-blue-50' : 'border-transparent hover:border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="w-16 h-12 rounded-md border border-gray-200 overflow-hidden flex-shrink-0 bg-white">
                    {t.preview}
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-sm font-semibold text-gray-800">{t.label}</p>
                    <p className="text-xs text-gray-500">{t.desc}</p>
                    <span className="inline-block mt-1 px-1.5 py-0.5 bg-emerald-50 text-emerald-700 text-xs rounded-full font-medium">
                      {t.tag}
                    </span>
                  </div>
                  {template === t.id && <Check size={14} className="text-blue-500 flex-shrink-0" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Font Selector */}
      <div className="relative">
        <button
          onClick={() => toggleDropdown('font')}
          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-sm font-medium text-gray-700 transition-all"
        >
          <Type size={14} className="text-gray-500" />
          <span>{currentFont.label}</span>
          <ChevronDown size={12} className="text-gray-400" />
        </button>

        {openDropdown === 'font' && (
          <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 p-3 z-50 w-48">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-1">Font Family</p>
            <div className="space-y-1">
              {FONTS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => { setFontFamily(f.id); setOpenDropdown(null); }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all text-sm ${
                    fontFamily === f.id ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span style={{ fontFamily: f.id }}>{f.label}</span>
                  <span style={{ fontFamily: f.id, fontSize: '16px' }} className="text-gray-400">{f.sample}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Color Selector */}
      <div className="relative">
        <button
          onClick={() => toggleDropdown('color')}
          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-sm font-medium text-gray-700 transition-all"
        >
          <Palette size={14} className="text-gray-500" />
          <div
            className="w-4 h-4 rounded-full border border-white shadow-sm"
            style={{ backgroundColor: colorSchemeMap[colorScheme].primary }}
          />
          <ChevronDown size={12} className="text-gray-400" />
        </button>

        {openDropdown === 'color' && (
          <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 p-3 z-50 w-44">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-1">Color Theme</p>
            <div className="space-y-1">
              {COLORS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => { setColorScheme(c.id); setOpenDropdown(null); }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all text-sm ${
                    colorScheme === c.id ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
                >
                  <div
                    className="w-5 h-5 rounded-full border-2 border-white shadow-sm flex-shrink-0"
                    style={{ backgroundColor: colorSchemeMap[c.id].primary }}
                  />
                  <span className="text-gray-700 font-medium">{c.label}</span>
                  {colorScheme === c.id && <Check size={13} className="text-gray-600 ml-auto" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex-1" />

      {/* Free badge */}
      <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full">
        <Sparkles size={12} className="text-emerald-600" />
        <span className="text-xs font-semibold text-emerald-700">100% Free. No Hidden Fees.</span>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        disabled={downloading}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white shadow-sm hover:shadow-md transition-all active:scale-95 disabled:opacity-70"
        style={{ backgroundColor: '#10B981' }}
      >
        <Download size={14} />
        {downloading ? 'Preparing...' : 'Download Free PDF'}
      </button>

      {/* Close dropdowns on outside click */}
      {openDropdown && (
        <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />
      )}
    </div>
  );
}