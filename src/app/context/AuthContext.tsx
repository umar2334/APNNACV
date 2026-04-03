import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  provider: 'google' | 'email';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  showLoginModal: boolean;
  pendingRedirect: string;
  openLoginModal: (redirectTo?: string) => void;
  closeLoginModal: () => void;
  signInWithGoogle: (credential: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

function parseJwt(token: string) {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingRedirect, setPendingRedirect] = useState('/editor');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('appnacv_user');
      if (stored) setUser(JSON.parse(stored));
    } catch { /* ignore */ }
    setLoading(false);
  }, []);

  const openLoginModal = (redirectTo = '/editor') => {
    setPendingRedirect(redirectTo);
    setShowLoginModal(true);
  };

  const closeLoginModal = () => setShowLoginModal(false);

  const signInWithGoogle = async (credential: string) => {
    const payload = parseJwt(credential);
    if (!payload) throw new Error('Invalid Google credential');
    const u: User = {
      id: payload.sub,
      name: payload.name,
      email: payload.email,
      avatar: payload.picture,
      provider: 'google',
    };
    setUser(u);
    localStorage.setItem('appnacv_user', JSON.stringify(u));
    setShowLoginModal(false);
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('appnacv_user');
  };

  return (
    <AuthContext.Provider value={{
      user, loading, showLoginModal, pendingRedirect,
      openLoginModal, closeLoginModal, signInWithGoogle, signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
