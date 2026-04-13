import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { FileText, Download, CheckCircle } from 'lucide-react';
import { hasPendingBlob, triggerDownload } from '../utils/downloadManager';

const TOTAL = 10;

export function Processing() {
  const [countdown, setCountdown] = useState(TOTAL);
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  /* If user lands here without a pending blob (e.g. direct URL) send them home */
  useEffect(() => {
    if (!hasPendingBlob()) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  /* Countdown */
  useEffect(() => {
    if (countdown <= 0) {
      triggerDownload();
      setDone(true);
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const progress = ((TOTAL - countdown) / TOTAL) * 100;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">

      {/* ── TOP AD SLOT ── */}
      <div className="w-full bg-white border-b border-gray-100 flex items-center justify-center" style={{ minHeight: 90 }}>
        {/* Replace the div below with your Google AdSense <ins> tag */}
        <div
          className="flex items-center justify-center text-gray-400 text-xs font-medium border border-dashed border-gray-300 rounded-lg"
          style={{ width: 728, maxWidth: '96vw', height: 90 }}
        >
          Advertisement · 728 × 90
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 w-full max-w-lg text-center">

        {/* Icon */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-lg"
          style={{ background: 'linear-gradient(135deg, #1D4ED8, #3B82F6)' }}
        >
          {done
            ? <CheckCircle size={36} className="text-white" />
            : <FileText size={36} className="text-white" />
          }
        </div>

        {done ? (
          <>
            <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Your CV is Ready!</h1>
            <p className="text-gray-500 mb-8">Your PDF has been downloaded. Good luck with your job search!</p>
            <button
              onClick={() => navigate('/editor')}
              className="px-8 py-3 rounded-xl text-white font-semibold shadow-md hover:shadow-lg transition-all"
              style={{ background: 'linear-gradient(135deg, #1D4ED8, #3B82F6)' }}
            >
              Back to Editor
            </button>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Preparing Your CV…</h1>
            <p className="text-gray-500 mb-8">
              Your PDF will download automatically in <span className="font-bold text-blue-600">{countdown}</span> second{countdown !== 1 ? 's' : ''}.
            </p>

            {/* Progress ring */}
            <div className="relative w-32 h-32 mb-8">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" fill="none" stroke="#E5E7EB" strokeWidth="10" />
                <circle
                  cx="60" cy="60" r="52"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 52}`}
                  strokeDashoffset={`${2 * Math.PI * 52 * (1 - progress / 100)}`}
                  style={{ transition: 'stroke-dashoffset 1s linear' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-blue-600">{countdown}</span>
                <span className="text-xs text-gray-400 font-medium">sec</span>
              </div>
            </div>

            {/* Linear progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${progress}%`, transition: 'width 1s linear' }}
              />
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Download size={14} />
              <span>Download will start automatically</span>
            </div>
          </>
        )}
      </div>

      {/* ── BOTTOM AD SLOT ── */}
      <div className="w-full bg-white border-t border-gray-100 flex items-center justify-center" style={{ minHeight: 90 }}>
        {/* Replace the div below with your Google AdSense <ins> tag */}
        <div
          className="flex items-center justify-center text-gray-400 text-xs font-medium border border-dashed border-gray-300 rounded-lg"
          style={{ width: 728, maxWidth: '96vw', height: 90 }}
        >
          Advertisement · 728 × 90
        </div>
      </div>

    </div>
  );
}
