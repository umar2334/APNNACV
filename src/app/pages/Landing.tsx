import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

// ── Adsterra Banner Ad Component ──────────────────────────────────────────────
function AdsterraBanner({ adKey, width, height }: { adKey: string; width: number; height: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current || ref.current.querySelector('script')) return;
    // Set atOptions BEFORE loading script
    const optsScript = document.createElement('script');
    optsScript.type = 'text/javascript';
    optsScript.text = `atOptions = { 'key': '${adKey}', 'format': 'iframe', 'height': ${height}, 'width': ${width}, 'params': {} };`;
    ref.current.appendChild(optsScript);
    // Load the invoke script
    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.src = `//www.profitablecpmratenetwork.com/ad/${adKey}`;
    ref.current.appendChild(invokeScript);
  }, [adKey, width, height]);

  return (
    <div
      ref={ref}
      style={{ width, height, margin: '0 auto', overflow: 'hidden' }}
    />
  );
}

// ── Adsterra Native Banner Component ─────────────────────────────────────────
function AdsterraNative() {
  useEffect(() => {
    const containerId = 'container-0bb750990d71d2ff4e818fa662784157';
    const container = document.getElementById(containerId);
    if (!container || container.querySelector('script')) return;
    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = 'https://pl29235062.profitablecpmratenetwork.com/0bb750990d71d2ff4e818fa662784157/invoke.js';
    container.appendChild(script);
  }, []);
  return <div id="container-0bb750990d71d2ff4e818fa662784157" style={{ width: '100%' }} />;
}
import {
  CheckCircle, ArrowRight, Download, FileText, Star,
  Zap, Shield, Target, Users, ChevronRight, Sparkles,
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const FEATURES = [
  { icon: <Target size={20} />, color: '#3B82F6', title: 'ATS-Optimized', desc: 'All templates pass Applicant Tracking Systems with 95–99% score.' },
  { icon: <Zap size={20} />, color: '#F59E0B', title: 'Live Preview', desc: 'See your CV update in real-time as you type. No guesswork.' },
  { icon: <Download size={20} />, color: '#10B981', title: 'Free PDF Download', desc: 'Download your professional CV as PDF — completely free, always.' },
  { icon: <Shield size={20} />, color: '#8B5CF6', title: 'No Paywalls', desc: 'Every feature is unlocked. Zero hidden fees, no credit card required.' },
  { icon: <FileText size={20} />, color: '#EF4444', title: '3 Pro Templates', desc: 'Minimalist, Executive, and Modern templates curated by HR experts.' },
  { icon: <Users size={20} />, color: '#6366F1', title: 'Trusted by Thousands', desc: 'Join thousands of job seekers who landed interviews with AppnaCv.' },
];

const STEPS = [
  { n: '01', title: 'Fill Your Details', desc: 'Enter your personal info, experience, education, and skills in the simple form editor.' },
  { n: '02', title: 'Pick a Template', desc: 'Choose from 3 professionally designed, ATS-friendly templates and customize colors & fonts.' },
  { n: '03', title: 'Download Free', desc: 'Download your polished CV as a print-ready PDF — instantly, for free.' },
];

const TESTIMONIALS = [
  { name: 'Ali Raza', role: 'Software Engineer at Careem', text: 'AppnaCv helped me land 3 interviews in one week! The ATS score gave me confidence that my CV would actually be read.', stars: 5 },
  { name: 'Sana Khan', role: 'Marketing Manager', text: 'Finally a free CV builder that doesn\'t hold features behind a paywall. The Modern template is stunning and professional.', stars: 5 },
  { name: 'Hamza Tariq', role: 'Fresh Graduate, UET', text: 'As a fresh grad, I had no idea how to write a CV. The prompts and live preview made it incredibly easy. Got my first job!', stars: 5 },
];

export function Landing() {
  const { user, openLoginModal } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20" style={{ background: 'linear-gradient(160deg, #EFF6FF 0%, #F8FAFF 50%, #EEF2FF 100%)' }}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #1D4ED8, rgba(0,0,0,0))' }} />
          <div className="absolute -bottom-12 -left-12 w-72 h-72 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #6366F1, rgba(0,0,0,0))' }} />
        </div>

        <div className="max-w-screen-xl mx-auto px-5 relative">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full">
              <Sparkles size={14} className="text-blue-600" />
              <span className="text-sm font-semibold text-blue-700">Pakistan's #1 Free CV Builder</span>
              <span className="text-xs text-blue-500">🇵🇰</span>
            </div>
          </div>

          <div className="text-center max-w-3xl mx-auto mb-10">
            <h1 className="mb-5" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-1px', color: '#0F172A' }}>
              Build a Job-Winning CV{' '}
              <span style={{ background: 'linear-gradient(135deg, #1D4ED8, #6366F1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                in Minutes
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8">
              Create an ATS-friendly, professional CV that gets you hired. 100% free — no hidden fees, no paywalls, ever.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => user ? navigate('/editor') : openLoginModal()}
                className="flex items-center gap-2 px-8 py-3.5 rounded-xl text-white text-base font-bold shadow-lg hover:shadow-xl transition-all active:scale-95"
                style={{ background: 'linear-gradient(135deg, #1D4ED8, #3B82F6)' }}
              >
                Create My CV — Free <ArrowRight size={16} />
              </button>
              <button
                onClick={() => user ? navigate('/editor') : openLoginModal()}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl border-2 border-gray-200 text-gray-700 text-base font-semibold hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50 transition-all"
              >
                <FileText size={16} /> View Templates
              </button>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6">
              {['No signup required', '3 ATS templates', 'Free PDF download', 'Live preview'].map((s) => (
                <div key={s} className="flex items-center gap-1.5 text-sm text-gray-500">
                  <CheckCircle size={14} className="text-emerald-500" />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Preview Image */}
          <div className="relative max-w-4xl mx-auto">
            <div
              className="rounded-2xl overflow-hidden shadow-2xl border border-white/80"
              style={{ background: 'linear-gradient(135deg, #1E3A8A, #1D4ED8)' }}
            >
              {/* Fake browser bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-900/30">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 bg-white/10 rounded-md px-3 py-1 text-xs text-white/60">appnacv.com/editor</div>
              </div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1763718432504-7716caff6e99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjByZXN1bWUlMjBqb2IlMjBhcHBsaWNhdGlvbiUyMHN1Y2Nlc3N8ZW58MXx8fHwxNzc1MDQ0Njc4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="AppnaCv Editor Preview"
                className="w-full object-cover"
                style={{ height: '380px' }}
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 bg-white rounded-xl px-4 py-2.5 shadow-xl border border-gray-100 flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <CheckCircle size={16} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">ATS Score: 99%</p>
                <p className="text-xs text-gray-400">Passes all major systems</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ ADSTERRA Banner 728x90 — Hero ke baad */}
      <div className="py-3 flex justify-center bg-white border-b border-gray-100">
        <AdsterraBanner adKey="4af9a7133d3a622a55ec2eb6fc1760a9" width={728} height={90} />
      </div>

      {/* Stats Bar */}
      <div className="border-y border-gray-100 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-5 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { n: '50,000+', l: 'CVs Created' },
            { n: '99%', l: 'ATS Pass Rate' },
            { n: '100%', l: 'Completely Free' },
            { n: '3 min', l: 'Average Build Time' },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <p className="text-2xl font-extrabold text-blue-700">{s.n}</p>
              <p className="text-sm text-gray-500 mt-0.5">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <section className="py-20 max-w-screen-xl mx-auto px-5">
        <div className="text-center mb-14">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Why AppnaCv</span>
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">Everything you need to get hired</h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto">Built specifically for job seekers in Pakistan and beyond. No BS, no paywalls — just results.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div key={f.title} className="p-6 rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-lg transition-all group bg-white">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${f.color}15`, color: f.color }}>
                {f.icon}
              </div>
              <h3 className="font-bold text-gray-900 mb-1.5">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ ADSTERRA Native Banner — Features ke baad */}
      <div className="py-4 px-5 bg-gray-50 border-y border-gray-100">
        <div className="max-w-screen-xl mx-auto">
          <AdsterraNative />
        </div>
      </div>

      {/* How it Works */}
      <section className="py-20" style={{ background: 'linear-gradient(160deg, #EFF6FF, #F8FAFF)' }}>
        <div className="max-w-screen-xl mx-auto px-5">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Simple Process</span>
            <h2 className="mt-2 text-3xl font-extrabold text-gray-900">3 steps to your dream job</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((s) => (
              <div key={s.n} className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md"
                    style={{ background: 'linear-gradient(135deg, #1D4ED8, #3B82F6)' }}
                  >
                    <span className="text-white font-black text-lg">{s.n}</span>
                  </div>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => user ? navigate('/editor') : openLoginModal()}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-bold shadow-lg hover:shadow-xl transition-all"
              style={{ background: 'linear-gradient(135deg, #1D4ED8, #3B82F6)' }}
            >
              Start Building Now <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Templates Preview */}
      <section className="py-20 max-w-screen-xl mx-auto px-5">
        <div className="text-center mb-14">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Templates</span>
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">ATS-Friendly designs for every career</h2>
          <p className="text-gray-500 mt-3">Choose from 3 professionally crafted templates. All pass ATS with flying colors.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'The Minimalist', tag: 'Clean & Modern', score: '99%', icon: '📄', color: '#1D4ED8', desc: 'Single-column layout. Maximum readability. Perfect for tech roles.' },
            { name: 'The Executive', tag: 'Classic & Bold', score: '97%', icon: '💼', color: '#7C3AED', desc: 'Dual-column with sidebar. Ideal for senior and management positions.' },
            { name: 'The Modern', tag: 'Creative Pro', score: '95%', icon: '✨', color: '#059669', desc: 'Colored sidebar layout. Stand out while staying fully ATS-safe.' },
          ].map((t) => (
            <div key={t.name} className="rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all group cursor-pointer" onClick={() => user ? navigate('/editor') : openLoginModal()}>
              <div className="h-48 flex items-center justify-center text-6xl" style={{ background: `linear-gradient(135deg, ${t.color}15, ${t.color}05)` }}>
                {t.icon}
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-900">{t.name}</h3>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100">ATS {t.score}</span>
                </div>
                <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: t.color }}>{t.tag}</p>
                <p className="text-sm text-gray-500">{t.desc}</p>
                <button
                  className="mt-4 w-full py-2 rounded-lg border-2 text-sm font-semibold transition-all group-hover:text-white"
                  style={{ borderColor: t.color, color: t.color }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = t.color;
                    (e.currentTarget as HTMLButtonElement).style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                    (e.currentTarget as HTMLButtonElement).style.color = t.color;
                  }}
                >
                  Use This Template →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-5">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Success Stories</span>
            <h2 className="mt-2 text-3xl font-extrabold text-gray-900">Job seekers love AppnaCv</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} size={15} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 mb-5 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ background: 'linear-gradient(135deg, #1D4ED8, #6366F1)' }}
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ ADSTERRA Banner 300x250 — Testimonials ke neeche */}
          <div className="mt-10 flex justify-center">
            <AdsterraBanner adKey="c41379b356692c0ff166fc929170cb1d" width={300} height={250} />
          </div>

        </div>
      </section>

      {/* Final CTA */}
      <section
        className="py-20"
        style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 50%, #2563EB 100%)' }}
      >
        <div className="max-w-2xl mx-auto px-5 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Your next job is one great CV away
          </h2>
          <p className="text-blue-200 mb-8">
            Build your ATS-optimized CV in under 3 minutes. Completely free, always.
          </p>
          <button
            onClick={() => user ? navigate('/editor') : openLoginModal()}
            className="px-10 py-4 rounded-xl font-bold text-blue-700 bg-white hover:bg-blue-50 transition-all shadow-xl text-base"
          >
            Start Building For Free →
          </button>
          <p className="text-blue-300 text-xs mt-4">No signup. No credit card. Just results.</p>
        </div>
      </section>

      {/* ✅ ADSTERRA Banner 468x60 — Footer se pehle */}
      <div className="py-4 flex justify-center bg-white border-t border-gray-100">
        <AdsterraBanner adKey="aeabfd7ad07507ef114bc8f2d0db46bc" width={468} height={60} />
      </div>

      {/* Partner Projects Banner */}
      <section className="bg-gray-800 py-6 px-5">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 text-center">Partner Projects</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">

            {/* TurkVerse */}
            <a
              href="https://www.turkdrama.live"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 border border-gray-600 hover:border-red-500/40 transition-all group w-full sm:w-auto"
            >
              <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                <span className="text-white text-sm font-black">T</span>
              </div>
              <div>
                <p className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">TurkVerse</p>
                <p className="text-xs text-gray-400">Watch Turkish Dramas Free</p>
              </div>
              <span className="ml-auto text-gray-500 group-hover:text-red-400 text-xs">Visit →</span>
            </a>

            {/* EzySantz */}
            <a
              href="https://ezysantz-solution.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 border border-gray-600 hover:border-blue-500/40 transition-all group w-full sm:w-auto"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                <span className="text-white text-sm font-black">E</span>
              </div>
              <div>
                <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">EzySantz</p>
                <p className="text-xs text-gray-400">Professional Web Solutions</p>
              </div>
              <span className="ml-auto text-gray-500 group-hover:text-blue-400 text-xs">Visit →</span>
            </a>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10">
        <div className="max-w-screen-xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
              <FileText size={14} className="text-white" />
            </div>
            <span className="font-bold text-white">AppnaCv</span>
          </div>
          <p className="text-sm">© 2026 AppnaCv. Free for everyone, forever.</p>
          <div className="flex gap-5 text-sm">
            <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="/contact" className="hover:text-white transition-colors">Contact Us</a>
            <a href="/blog" className="hover:text-white transition-colors">Blog</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
