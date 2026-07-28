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
    if (typeof window !== 'undefined' && !window.location.hostname.includes('localhost') && !window.location.hostname.includes('127.0.0.1')) {
      return `${window.location.origin}/auth/callback`;
    }
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://tangentcore.in';
    return `${baseUrl.replace(/\/$/, '')}/auth/callback`;
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

      if (isSignUp) {
        // Sign up new user
        const redirectUrl = getRedirectUrl();

        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl,
          },
        });

        if (error && !error.message?.toLowerCase().includes('rate limit')) {
          throw error;
        }

        // Show clear user notification window
        toast.success(
          '🎉 Account created successfully! Please check your inbox to confirm your email ID, or directly Sign In below.',
          { duration: 6000 }
        );

        // Redirect to Sign In view so user can directly log in with credentials
        setIsSignUp(false);
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

  const handleGuestDemoAccess = () => {
    toast.success('Accessing AEO/GEO Dashboard as Guest...');
    window.location.href = '/dashboard';
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
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${
            isDark ? 'bg-[#181818] border-[#2A2A2A] text-[#D4AF37]' : 'bg-white border-slate-200 text-cyan-600'
          } border backdrop-blur-md mb-4 text-xs font-bold`}>
            <Brain className="w-4 h-4 text-[#D4AF37] animate-pulse" />
            <span>TangentCore</span>
          </div>
          <h1 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {isSignUp ? 'Create your Account' : 'Welcome back'}
          </h1>
          <p className={`${isDark ? 'text-[#CFCFCF]' : 'text-slate-600'} text-sm mt-2 font-normal`}>
            Analyze, monitor, and dominate AI search citations across ChatGPT, Gemini, Claude & Perplexity.
          </p>
        </div>

        {/* Card */}
        <div className={`${
          isDark ? 'bg-[#181818] border-[#2A2A2A]' : 'bg-white border-slate-200/80 shadow-xl'
        } backdrop-blur-2xl border p-8 rounded-3xl`}>
          {/* Google OAuth Button */}
          <button
            onClick={handleGoogleOAuth}
            disabled={loading}
            className={`w-full flex items-center justify-center gap-3 ${
              isDark ? 'bg-[#0A0A0A] hover:bg-[#202020] text-white border-[#2A2A2A] hover:border-[#D4AF37]' : 'bg-slate-100 hover:bg-slate-200/80 text-slate-900 border-slate-300'
            } font-semibold py-3 px-4 rounded-2xl border transition-all shadow-sm group`}
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
              <div className={`w-full border-t ${isDark ? 'border-[#2A2A2A]' : 'border-slate-200'}`} />
            </div>
            <span className={`relative px-3 ${isDark ? 'bg-[#181818] text-[#9E9E9E]' : 'bg-white text-slate-400'} text-xs uppercase font-semibold`}>
              Or continue with email
            </span>
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div>
              <label className={`block text-xs font-bold ${isDark ? 'text-[#9E9E9E]' : 'text-slate-600'} mb-1.5 uppercase tracking-wider`}>
                Email Address
              </label>
              <div className="relative">
                <Mail className={`absolute left-3.5 top-3.5 h-4 w-4 ${isDark ? 'text-[#9E9E9E]' : 'text-slate-400'}`} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className={`w-full ${isDark ? 'bg-[#0A0A0A] border-[#2A2A2A] text-white placeholder-[#9E9E9E] focus:border-[#D4AF37]' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'} border rounded-2xl pl-10 pr-4 py-2.5 text-sm focus:outline-none transition-all`}
                  required
                />
              </div>
            </div>

            <div>
              <label className={`block text-xs font-bold ${isDark ? 'text-[#9E9E9E]' : 'text-slate-600'} mb-1.5 uppercase tracking-wider`}>
                Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-3.5 top-3.5 h-4 w-4 ${isDark ? 'text-[#9E9E9E]' : 'text-slate-400'}`} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full ${isDark ? 'bg-[#0A0A0A] border-[#2A2A2A] text-white placeholder-[#9E9E9E] focus:border-[#D4AF37]' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'} border rounded-2xl pl-10 pr-4 py-2.5 text-sm focus:outline-none transition-all`}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-2 ${
                isDark ? 'luxury-btn-primary' : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
              } font-bold py-3 px-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 group`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{isSignUp ? 'Sign Up' : 'Sign In'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Toggle Login / Signup */}
          <div className="mt-6 text-center space-y-3">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className={`text-xs ${isDark ? 'text-[#CFCFCF] hover:text-[#D4AF37]' : 'text-slate-600 hover:text-cyan-600'} transition-colors font-medium`}
            >
              {isSignUp ? (
                <>Already have an account? <span className={`${isDark ? 'text-[#D4AF37]' : 'text-cyan-500'} underline font-bold`}>Sign In</span></>
              ) : (
                <>Don't have an account? <span className={`${isDark ? 'text-[#D4AF37]' : 'text-cyan-500'} underline font-bold`}>Create one</span></>
              )}
            </button>

            <div className={`pt-3 border-t ${isDark ? 'border-[#2A2A2A]' : 'border-slate-200/80'}`}>
              <button
                type="button"
                onClick={handleGuestDemoAccess}
                className={`w-full py-2.5 px-4 rounded-2xl border ${
                  isDark ? 'bg-[#0A0A0A] border-[#2A2A2A] text-white hover:border-[#D4AF37] hover:text-[#D4AF37]' : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                } text-xs font-bold transition-all flex items-center justify-center gap-1.5`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Instant Demo Access (Skip Login)</span>
              </button>
            </div>
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
