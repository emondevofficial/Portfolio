import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.tsx';
import { Lock, LogIn, Key, AlertCircle, ArrowLeft, Shield } from 'lucide-react';

interface AdminLoginProps {
  onBackToSite: () => void;
  onSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onBackToSite, onSuccess }) => {
  const { loginWithGoogle, loginAsDevAdmin } = useAuth();
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
      onSuccess();
    } catch (err) {
      console.error(err);
      setError('Google Sign-In failed or popup was closed. You can also sign in with the admin passkey below.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasskeyLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passkey) {
      setError('Please enter your administrator passkey or email.');
      return;
    }

    const success = loginAsDevAdmin(passkey);
    if (success) {
      onSuccess();
    } else {
      setError('Invalid administrator credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-950 text-zinc-100">
      <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl space-y-8">
        
        {/* Header */}
        <div className="space-y-3 text-center">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Admin CMS Portal
          </h1>
          <p className="text-xs text-zinc-400">
            Sign in to manage portfolio content, projects, experience, and contact messages.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-300 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Google Authentication */}
        <div className="space-y-3">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-white text-zinc-900 hover:bg-zinc-100 font-semibold text-sm transition-all shadow-xs cursor-pointer disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Sign In with Google</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-800" />
          </div>
          <span className="relative px-3 bg-zinc-900 text-xs text-zinc-500 uppercase font-mono">
            Or Passkey Sign-In
          </span>
        </div>

        {/* Passkey Fallback Form */}
        <form onSubmit={handlePasskeyLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-300">
              Admin Passkey / Email
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                placeholder="Enter admin credentials"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all cursor-pointer shadow-xs"
          >
            <LogIn className="w-4 h-4" />
            <span>Verify & Authenticate</span>
          </button>
        </form>

        <div className="pt-2 text-center">
          <button
            onClick={onBackToSite}
            className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portfolio</span>
          </button>
        </div>

      </div>
    </div>
  );
};
