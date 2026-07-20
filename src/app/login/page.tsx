'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Sparkles, ArrowRight, CheckCircle2, Lock, Mail, Brain, Sun, Moon } from 'lucide-react';
import { toast } from 'sonner';
import { AiBackground } from '@/components/ui/ai-background';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const supabase = createClient();

  const getRedirectUrl = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/auth/callback`;
    }
    return process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback` : 'https://aeo-geo-expert.vercel.app/auth/callback';
  };

  const handleGoogleOAuth = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: getRedirectUrl(),
        },
      });
      if (error) throw error;
    } catch (err: any) {
      toast.error(err.message || 'Failed to sign in with Google');
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter your email and password');
      return;
    }

    try {
      setLoading(true);
      const redirectUrl = getRedirectUrl();

      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl,
          },
        });
        if (error) throw error;
        toast.success('Account created! Verification email sent. Please check your inbox.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast.success('Logged in successfully!');
        window.location.href = '/dashboard';
      }
    } catch (err: any) {
      toast.error(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} flex flex-col justify-center items-center relative overflow-hidden p-4 transition-colors duration-300`}>
      <AiBackground isDark={isDark} />
      {/* Theme Toggle Top Right */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={() => setIsDark(!isDark)}
          className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800 text-amber-400' : 'bg-white border-slate-200 text-slate-700'} shadow-md transition-all flex items-center gap-2 text-xs font-semibold`}
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-md relative z-10">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full ${isDark ? 'bg-slate-900/80 border-slate-800 text-cyan-400' : 'bg-white border-slate-200 text-cyan-600'} border backdrop-blur-md mb-4 text-xs font-medium`}>
            <Brain className="w-4 h-4 animate-pulse" />
            <span>AEO / GEO Engine Expert</span>
          </div>
          <h1 className={`text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {isSignUp ? 'Create your Account' : 'Welcome back'}
          </h1>
          <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'} text-sm mt-2`}>
            Analyze, monitor, and dominate AI search citations across ChatGPT, Gemini, Claude & Perplexity.
          </p>
        </div>

        {/* Card */}
        <div className={`${isDark ? 'bg-slate-900/70 border-slate-800/80' : 'bg-white border-slate-200/80 shadow-xl'} backdrop-blur-xl border p-8 rounded-2xl`}>
          {/* Google OAuth Button */}
          <button
            onClick={handleGoogleOAuth}
            disabled={loading}
            className={`w-full flex items-center justify-center gap-3 ${isDark ? 'bg-slate-800 hover:bg-slate-700/80 text-white border-slate-700' : 'bg-slate-100 hover:bg-slate-200/80 text-slate-900 border-slate-300'} font-medium py-3 px-4 rounded-xl border transition-all shadow-sm group`}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className={`w-full border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`} />
            </div>
            <span className={`relative px-3 ${isDark ? 'bg-slate-900 text-slate-500' : 'bg-white text-slate-400'} text-xs uppercase font-semibold`}>
              Or continue with email
            </span>
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div>
              <label className={`block text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'} mb-1.5 uppercase tracking-wider`}>
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className={`w-full ${isDark ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'} border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 transition-all`}
                  required
                />
              </div>
            </div>

            <div>
              <label className={`block text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'} mb-1.5 uppercase tracking-wider`}>
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full ${isDark ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'} border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 transition-all`}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{isSignUp ? 'Sign Up' : 'Sign In'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Toggle Login / Signup */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className={`text-xs ${isDark ? 'text-slate-400 hover:text-cyan-400' : 'text-slate-600 hover:text-cyan-600'} transition-colors font-medium`}
            >
              {isSignUp ? (
                <>Already have an account? <span className="text-cyan-500 underline font-semibold">Sign In</span></>
              ) : (
                <>Don't have an account? <span className="text-cyan-500 underline font-semibold">Create one</span></>
              )}
            </button>
          </div>
        </div>

        {/* Footer Feature Badges */}
        <div className={`mt-8 flex justify-center items-center gap-6 text-xs ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Multi-LLM Scanning
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500" /> JSON-LD Schema Auditor
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" /> Citation Map
          </span>
        </div>
      </div>
    </div>
  );
}
