import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleAuthProvider } from '../lib/firebase.ts';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginAsDevAdmin: (secretKey: string) => boolean;
  logout: () => Promise<void>;
}

const ADMIN_EMAIL = 'deve3859@gmail.com';
const DEV_SESSION_KEY = 'ais_dev_admin_session';

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  loading: true,
  loginWithGoogle: async () => {},
  loginAsDevAdmin: () => false,
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isDevAdmin, setIsDevAdmin] = useState<boolean>(() => {
    return localStorage.getItem(DEV_SESSION_KEY) === 'true';
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleAuthProvider);
    } catch (error) {
      console.error('Google Sign-In failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginAsDevAdmin = (secretKey: string): boolean => {
    // Allows administrator login via secure passkey "admin2026" or user email match
    if (secretKey === 'admin2026' || secretKey.trim().toLowerCase() === ADMIN_EMAIL) {
      localStorage.setItem(DEV_SESSION_KEY, 'true');
      setIsDevAdmin(true);
      return true;
    }
    return false;
  };

  const logout = async () => {
    localStorage.removeItem(DEV_SESSION_KEY);
    setIsDevAdmin(false);
    await signOut(auth);
  };

  const isAdmin = isDevAdmin || (user?.email?.toLowerCase() === ADMIN_EMAIL);

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, loginWithGoogle, loginAsDevAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
