import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router';
import { Header } from './components/Header';
import { Landing } from './pages/Landing';
import { Editor } from './pages/Editor';
import { CVProvider } from './context/CVContext';
import { AuthProvider } from './context/AuthContext';
import { GoogleAuthModal } from './components/GoogleAuthModal';

function Root() {
  return (
    <AuthProvider>
      <CVProvider>
        <div className="min-h-screen flex flex-col bg-white">
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          {/* Global Google login modal — shows on top of any page */}
          <GoogleAuthModal />
        </div>
      </CVProvider>
    </AuthProvider>
  );
}

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-6xl font-black text-gray-200 mb-4">404</h1>
      <h2 className="text-xl font-bold text-gray-800 mb-2">Page Not Found</h2>
      <p className="text-gray-500 mb-6">This page doesn't exist. Head back to build your CV!</p>
      <a href="/" className="px-6 py-2.5 rounded-xl text-white font-semibold" style={{ background: 'linear-gradient(135deg, #1D4ED8, #3B82F6)' }}>
        Go Home
      </a>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Landing },
      { path: 'editor', Component: Editor },
      { path: 'templates', Component: Landing },
      { path: 'how-it-works', Component: Landing },
      { path: '*', Component: NotFound },
    ],
  },
]);
