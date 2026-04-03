import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router';
import { FileText, Eye, EyeOff, ArrowLeft, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// ─── Replace with your actual Google OAuth Client ID ───────────────────────
// Get one free at: https://console.cloud.google.com/
// Add your domain to "Authorized JavaScript origins"
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';
// ───────────────────────────────────────────────────────────────────────────

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: object) => void;
          renderButton: (el: HTMLElement, config: object) => void;
          prompt: () => void;
        };
      };
    };
    onGoogleScriptLoad?: () => void;
  }
}

type Mode = 'login' | 'signup';

export function Signup() {
  const navigate = useNavigate();
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, user } = useAuth();

  const [mode, setMode] = useState<Mode>('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [googleReady, setGoogleReady] = useState(false);

  const googleBtnRef = useRef<HTMLDivElement>(null);

  // Redirect if already logged in
  useEffect(() => {
    if (user) navigate('/editor');
  }, [user, navigate]);

  // Load Google Identity Services script
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

  // Re-render Google button when mode changes or googleReady changes
  useEffect(() => {
    if (googleReady && googleBtnRef.current) renderGoogleButton();
  }, [googleReady, mode]);

  function initGoogle() {
    if (!window.google) return;
    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleGoogleResponse,
      auto_select: false,
    });
    setGoogleReady(true);
  }

  function renderGoogleButton() {
    if (!window.google || !googleBtnRef.current) return;
    googleBtnRef.current.innerHTML = '';
    window.google.accounts.id.renderButton(googleBtnRef.current, {
      theme: 'outline',
      size: 'large',
      width: googleBtnRef.current.offsetWidth || 400,
      text: mode === 'login' ? 'signin_with' : 'signup_with',
      shape: 'rectangular',
    });
  }

  async function handleGoogleResponse(response: { credential: string }) {
    setError('');
    setLoading(true);
    try {
      await signInWithGoogle(response.credential);
      navigate('/editor');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Google sign-in failed');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'signup') {
        await signUpWithEmail(name, email, password);
      } else {
        await signInWithEmail(email, password);
      }
      navigate('/editor');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  }

  const switchMode = (m: Mode) => {
    setMode(m);
    setError('');
    setName('');
    setEmail('');
    setPassword('');
  };

  // Password strength indicator
  const pwStrength = (() => {
    if (!password) return null;
    if (password.length < 6) return { label: 'Too short', color: '#EF4444', w: '25%' };
    if (password.length < 8) return { label: 'Weak', color: '#F59E0B', w: '50%' };
    if (!/[0-9]/.test(password) || !/[A-Z]/.test(password)) return { label: 'Fair', color: '#3B82F6', w: '75%' };
    return { label: 'Strong', color: '#10B981', w: '100%' };
  })();

  return (
    <div
      className="min-h-screen flex"
      style={{ background: 'linear-gradient(160deg, #EFF6FF 0%, #F8FAFF 50%, #EEF2FF 100%)' }}
    >
      {/* ── Left decorative panel (hidden on mobile) ── */}
      <div
        className="hidden lg:flex lg:w-[45%] flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #1E3A8A 0%, #1D4ED8 55%, #2563EB 100%)' }}
      >
        {/* Floating circles */}
        <div
          className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #93C5FD, transparent)' }}
        />
        <div
          className="absolute bottom-20 -right-12 w-64 h-64 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #818CF8, transparent)' }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #E0E7FF, transparent)' }}
        />

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 relative z-10">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <FileText size={18} className="text-white" />
          </div>
          <span className="text-2xl font-black text-white tracking-tight">AppnaCv</span>
        </Link>

        {/* Central pitch */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full mb-6">
            <span className="text-xs font-semibold text-blue-200">🇵🇰 Pakistan's #1 Free CV Builder</span>
          </div>
          <h2 className="text-4xl font-black text-white leading-tight mb-5">
            Build a career-defining
            <br />
            <span className="text-blue-200">CV in minutes.</span>
          </h2>
          <p className="text-blue-200 text-base leading-relaxed max-w-xs">
            Join thousands of job seekers who landed interviews using AppnaCv. Free, ATS-optimized, and beautifully designed.
          </p>

          {/* Trust badges */}
          <div className="mt-8 space-y-3">
            {[
              { icon: '✅', text: '100% Free — no credit card ever' },
              { icon: '🎯', text: '99% ATS pass rate across all templates' },
              { icon: '⚡', text: 'Live preview as you type' },
              { icon: '📄', text: 'Instant PDF download' },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-3">
                <span className="text-base">{b.icon}</span>
                <span className="text-sm text-blue-100">{b.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
          <div className="flex gap-0.5 mb-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <span key={i} className="text-amber-300 text-sm">★</span>
            ))}
          </div>
          <p className="text-sm text-blue-100 italic leading-relaxed mb-4">
            "AppnaCv helped me land 3 interviews in one week. The ATS score gave me confidence my CV would actually be read."
          </p>
          <div className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ background: 'linear-gradient(135deg, #6366F1, #3B82F6)' }}
            >
              A
            </div>
            <div>
              <p className="text-xs font-bold text-white">Ali Raza</p>
              <p className="text-xs text-blue-300">Software Engineer at Careem</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right: Auth form ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-12">
        {/* Mobile logo */}
        <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #1D4ED8, #3B82F6)' }}
          >
            <FileText size={18} className="text-white" />
          </div>
          <span className="text-xl font-black text-gray-900">AppnaCv</span>
        </Link>

        <div className="w-full max-w-md">
          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 transition-colors mb-7"
          >
            <ArrowLeft size={14} /> Back to home
          </Link>

          {/* Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            {/* Mode tabs */}
            <div className="flex bg-gray-100 rounded-2xl p-1 mb-7">
              {(['signup', 'login'] as Mode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => switchMode(m)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
                  style={
                    mode === m
                      ? {
                          background: 'linear-gradient(135deg, #1D4ED8, #3B82F6)',
                          color: '#fff',
                          boxShadow: '0 2px 8px rgba(29,78,216,0.25)',
                        }
                      : { color: '#6B7280' }
                  }
                >
                  {m === 'signup' ? 'Create Account' : 'Sign In'}
                </button>
              ))}
            </div>

            <h1 className="text-2xl font-extrabold text-gray-900 mb-1">
              {mode === 'signup' ? 'Get started free' : 'Welcome back'}
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              {mode === 'signup'
                ? 'Create your account to save and manage your CVs.'
                : 'Sign in to access your saved CVs and templates.'}
            </p>

            {/* Google button */}
            <div className="mb-4">
              {googleReady ? (
                <div ref={googleBtnRef} className="w-full flex justify-center" />
              ) : (
                <button
                  disabled
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-400 bg-gray-50 cursor-not-allowed"
                >
                  <Loader2 size={16} className="animate-spin" />
                  Loading Google Sign-In…
                </button>
              )}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 font-medium">or continue with email</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Error banner */}
            {error && (
              <div className="flex items-start gap-2.5 p-3.5 bg-red-50 border border-red-100 rounded-xl mb-4 text-sm text-red-600">
                <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    placeholder="Muhammad Ali"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none transition-all focus:border-blue-400 focus:ring-3 focus:ring-blue-100 placeholder:text-gray-400"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none transition-all focus:border-blue-400 focus:ring-3 focus:ring-blue-100 placeholder:text-gray-400"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-gray-700">Password</label>
                  {mode === 'login' && (
                    <a href="#" className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                      Forgot password?
                    </a>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPw ? 'text' : 'password'}
                    placeholder={mode === 'signup' ? 'Min. 8 characters' : 'Your password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={mode === 'signup' ? 8 : 1}
                    className="w-full px-4 py-3 pr-11 rounded-xl border border-gray-200 text-sm outline-none transition-all focus:border-blue-400 focus:ring-3 focus:ring-blue-100 placeholder:text-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((p) => !p)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {/* Password strength bar (signup only) */}
                {mode === 'signup' && pwStrength && (
                  <div className="mt-2">
                    <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{ width: pwStrength.w, backgroundColor: pwStrength.color }}
                      />
                    </div>
                    <p className="text-xs mt-1 font-medium" style={{ color: pwStrength.color }}>
                      {pwStrength.label}
                    </p>
                  </div>
                )}
              </div>

              {/* Terms (signup only) */}
              {mode === 'signup' && (
                <p className="text-xs text-gray-500">
                  By creating an account you agree to our{' '}
                  <a href="#" className="text-blue-600 hover:underline font-medium">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-blue-600 hover:underline font-medium">Privacy Policy</a>.
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-bold text-sm transition-all shadow-md hover:shadow-lg active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(135deg, #1D4ED8, #3B82F6)' }}
              >
                {loading ? (
                  <><Loader2 size={16} className="animate-spin" /> Please wait…</>
                ) : mode === 'signup' ? (
                  <><CheckCircle size={16} /> Create Free Account</>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Switch mode link */}
            <p className="text-center text-sm text-gray-500 mt-5">
              {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => switchMode(mode === 'signup' ? 'login' : 'signup')}
                className="text-blue-600 font-semibold hover:text-blue-700 hover:underline"
              >
                {mode === 'signup' ? 'Sign in' : 'Create one free'}
              </button>
            </p>
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-gray-400 mt-6">
            AppnaCv is 100% free. No credit card required, ever.
          </p>
        </div>
      </div>
    </div>
  );
}
