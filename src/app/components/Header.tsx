import React, { useState } from 'react';
import { FileText, Menu, X, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { user, openLoginModal, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-screen-xl mx-auto px-5 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm"
            style={{ background: 'linear-gradient(135deg, #1D4ED8, #3B82F6)' }}
          >
            <FileText size={18} className="text-white" />
          </div>
          <span
            className="text-xl font-extrabold tracking-tight"
            style={{ background: 'linear-gradient(135deg, #1D4ED8, #3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            AppnaCv
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/templates" className="text-sm font-medium text-gray-600 hover:text-blue-700 transition-colors">Templates</Link>
          <Link to="/how-it-works" className="text-sm font-medium text-gray-600 hover:text-blue-700 transition-colors">How it Works</Link>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            // Logged in — show avatar + sign out
            <>
              <div className="flex items-center gap-2.5">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border-2 border-blue-100" />
                ) : (
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ background: 'linear-gradient(135deg, #1D4ED8, #6366F1)' }}
                  >
                    {user.name.charAt(0)}
                  </div>
                )}
                <span className="text-sm font-semibold text-gray-700">{user.name.split(' ')[0]}</span>
              </div>
              <button
                onClick={() => navigate('/editor')}
                className="text-sm font-semibold text-white px-5 py-2 rounded-lg transition-all shadow-sm hover:shadow-md"
                style={{ background: 'linear-gradient(135deg, #1D4ED8, #3B82F6)' }}
              >
                My CV
              </button>
              <button
                onClick={signOut}
                className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                title="Sign out"
              >
                <LogOut size={16} />
              </button>
            </>
          ) : (
            // Not logged in
            <>
              <button
                onClick={() => openLoginModal()}
                className="text-sm font-semibold text-gray-600 hover:text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all"
              >
                Sign In
              </button>
              <button
                onClick={() => openLoginModal()}
                className="text-sm font-semibold text-white px-5 py-2 rounded-lg transition-all shadow-sm hover:shadow-md"
                style={{ background: 'linear-gradient(135deg, #1D4ED8, #3B82F6)' }}
              >
                Build My CV — Free
              </button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-all"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 px-5 py-4 space-y-3 bg-white">
          <Link to="/templates" className="block text-sm font-medium text-gray-700 py-2">Templates</Link>
          <Link to="/how-it-works" className="block text-sm font-medium text-gray-700 py-2">How it Works</Link>
          {user ? (
            <>
              <div className="flex items-center gap-2 py-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ background: 'linear-gradient(135deg, #1D4ED8, #6366F1)' }}
                >
                  {user.name.charAt(0)}
                </div>
                <span className="text-sm font-semibold text-gray-700">{user.name}</span>
              </div>
              <button
                onClick={() => { navigate('/editor'); setMobileOpen(false); }}
                className="w-full text-sm font-semibold text-white px-5 py-2.5 rounded-lg text-center"
                style={{ background: 'linear-gradient(135deg, #1D4ED8, #3B82F6)' }}
              >
                My CV
              </button>
              <button
                onClick={() => { signOut(); setMobileOpen(false); }}
                className="w-full text-sm font-semibold text-red-500 border border-red-100 px-5 py-2.5 rounded-lg text-center hover:bg-red-50 transition-all"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={() => { openLoginModal(); setMobileOpen(false); }}
              className="w-full text-sm font-semibold text-white px-5 py-2.5 rounded-lg text-center"
              style={{ background: 'linear-gradient(135deg, #1D4ED8, #3B82F6)' }}
            >
              Build My CV — Free
            </button>
          )}
        </div>
      )}
    </header>
  );
}
