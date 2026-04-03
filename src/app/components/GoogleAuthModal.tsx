import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { X, FileText, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const GOOGLE_CLIENT_ID = '199613781580-qbe6mushliulnvqmqf0916q0gsra0epf.apps.googleusercontent.com';

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: object) => void;
          renderButton: (el: HTMLElement, config: object) => void;
        };
      };
    };
  }
}

export function GoogleAuthModal() {
  const navigate = useNavigate();
  const { showLoginModal, closeLoginModal, pendingRedirect, signInWithGoogle } = useAuth();
  const googleBtnRef = useRef<HTMLDivElement>(null);
  const [googleReady, setGoogleReady] = useState(false);
  const [error, setError] = useState('');

  // Load Google script once
  useEffect(() => {
    if (document.getElementById('google-gsi-script')) {
      initGoogle();
      return;
    }
    const script = document.createElement('script');
    script.id = 'google-gsi-script';
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => initGoogle();
    document.head.appendChild(script);
  }, []);

  // Re-render button whenever modal opens
  useEffect(() => {
    if (showLoginModal && googleReady) {
      setTimeout(() => renderButton(), 100);
    }
  }, [showLoginModal, googleReady]);

  function initGoogle() {
    if (!window.google) return;
    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleCredential,
      auto_select: false,
    });
    setGoogleReady(true);
  }

  function renderButton() {
    if (!window.google || !googleBtnRef.current) return;
    googleBtnRef.current.innerHTML = '';
    window.google.accounts.id.renderButton(googleBtnRef.current, {
      theme: 'outline',
      size: 'large',
      width: 320,
      text: 'continue_with',
      shape: 'rectangular',
      logo_alignment: 'left',
    });
  }

  async function handleCredential(response: { credential: string }) {
    setError('');
    try {
      await signInWithGoogle(response.credential);
      navigate(pendingRedirect);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Sign-in failed. Try again.');
    }
  }

  if (!showLoginModal) return null;

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) closeLoginModal(); }}
    >
      {/* Modal card */}
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden"
        style={{ animation: 'modalIn 0.25s cubic-bezier(0.34,1.56,0.64,1)' }}
      >
        {/* Blue top banner */}
        <div
          className="px-8 pt-8 pb-6 text-center relative"
          style={{ background: 'linear-gradient(160deg, #1E3A8A 0%, #1D4ED8 60%, #2563EB 100%)' }}
        >
          {/* Close button */}
          <button
            onClick={closeLoginModal}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
          >
            <X size={15} className="text-white" />
          </button>

          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <FileText size={18} className="text-white" />
            </div>
            <span className="text-xl font-black text-white">AppnaCv</span>
          </div>

          <h2 className="text-xl font-extrabold text-white mb-1">Sign in to continue</h2>
          <p className="text-sm text-blue-200">
            Save your CV and access it anytime
          </p>
        </div>

        {/* Body */}
        <div className="px-8 py-7">
          {/* Benefits */}
          <div className="space-y-2.5 mb-6">
            {[
              { icon: '💾', text: 'Auto-save your CV progress' },
              { icon: '📄', text: 'Access your CVs from any device' },
              { icon: '⚡', text: 'One-click PDF download' },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-3">
                <span className="text-base">{b.icon}</span>
                <span className="text-sm text-gray-600">{b.text}</span>
              </div>
            ))}
          </div>

          {/* Google button */}
          <div className="flex justify-center mb-3">
            {googleReady ? (
              <div ref={googleBtnRef} />
            ) : (
              <button
                disabled
                className="flex items-center justify-center gap-2 w-80 py-3 border-2 border-gray-200 rounded-xl text-sm text-gray-400 bg-gray-50"
              >
                <Loader2 size={15} className="animate-spin" />
                Loading Google Sign-In…
              </button>
            )}
          </div>

          {error && (
            <p className="text-center text-xs text-red-500 mt-2">{error}</p>
          )}

          <p className="text-center text-xs text-gray-400 mt-4">
            100% free · No credit card · Cancel anytime
          </p>
        </div>
      </div>

      {/* Animation keyframe */}
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.85) translateY(20px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
      `}</style>
    </div>
  );
}
