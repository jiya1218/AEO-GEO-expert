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
    <div className={`min-h-screen ${isDark ? 'bg-[#0B0B0C] text-[#F6F6F4]' : 'bg-[#FCFCFB] text-[#181818]'} flex flex-col justify-center items-center relative overflow-hidden p-4 transition-colors duration-500`}>
      <AiBackground isDark={isDark} />
      {/* Theme Toggle Top Right */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={() => setIsDark(!isDark)}
          className={`p-2.5 rounded-2xl border ${isDark ? 'bg-[#121315] border-white/10 text-[#C7A15A]' : 'bg-white border-[#E5E3DF] text-[#B87333]'} shadow-md transition-all flex items-center gap-2 text-xs font-bold`}
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          <span>{isDark ? 'Light' : 'Dark'}</span>
        </button>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-md relative z-10">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${
            isDark ? 'bg-[#121315] border-white/10 text-[#C7A15A]' : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#B87333]'
          } border backdrop-blur-md mb-4 text-xs font-mono font-bold`}>
            <Brain className="w-4 h-4 text-[#C7A15A] animate-pulse" />
            <span>TangentCore</span>
          </div>
          <h1 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isDark ? 'text-[#F6F6F4]' : 'text-[#181818]'}`}>
            {isSignUp ? 'Create your Account' : 'Welcome Back'}
          </h1>
          <p className={`${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'} text-sm mt-2 font-normal`}>
            Analyze, monitor, and dominate AI search citations across ChatGPT, Gemini, Claude & Perplexity.
          </p>
        </div>

        {/* Card */}
        <div className={`${
          isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-white border-[#E5E3DF] shadow-2xl'
        } backdrop-blur-2xl border p-8 rounded-3xl`}>
          {/* Google OAuth Button */}
          <button
            onClick={handleGoogleOAuth}
            disabled={loading}
            className={`w-full flex items-center justify-center gap-3 ${
              isDark ? 'bg-[#121315] hover:bg-[#242529] text-white border-white/10 hover:border-[#C7A15A]' : 'bg-[#F6F5F3] hover:bg-[#E5E3DF] text-[#181818] border-[#E5E3DF]'
            } font-bold py-3 px-4 rounded-2xl border transition-all shadow-sm group`}
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
              <div className={`w-full border-t ${isDark ? 'border-white/10' : 'border-[#E5E3DF]'}`} />
            </div>
            <span className={`relative px-3 ${isDark ? 'bg-[#1B1C1F] text-[#B7B7B5]' : 'bg-white text-[#5C5C5C]'} text-xs font-mono uppercase font-bold`}>
              Or continue with email
            </span>
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div>
              <label className={`block text-xs font-mono font-bold ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'} mb-1.5 uppercase tracking-wider`}>
                Email Address
              </label>
              <div className="relative">
                <Mail className={`absolute left-3.5 top-3.5 h-4 w-4 ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className={`w-full ${isDark ? 'bg-[#121315] border-white/10 text-white placeholder-[#B7B7B5]/60 focus:border-[#C7A15A]' : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#181818] placeholder-[#5C5C5C]/60 focus:border-[#B87333]'} border rounded-2xl pl-10 pr-4 py-2.5 text-sm focus:outline-none transition-all`}
                  required
                />
              </div>
            </div>

            <div>
              <label className={`block text-xs font-mono font-bold ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'} mb-1.5 uppercase tracking-wider`}>
                Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-3.5 top-3.5 h-4 w-4 ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full ${isDark ? 'bg-[#121315] border-white/10 text-white placeholder-[#B7B7B5]/60 focus:border-[#C7A15A]' : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#181818] placeholder-[#5C5C5C]/60 focus:border-[#B87333]'} border rounded-2xl pl-10 pr-4 py-2.5 text-sm focus:outline-none transition-all`}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 luxury-btn-primary font-bold py-3.5 px-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 group text-xs"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-[#111111] border-t-transparent rounded-full animate-spin" />
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
              className={`text-xs ${isDark ? 'text-[#B7B7B5] hover:text-[#C7A15A]' : 'text-[#5C5C5C] hover:text-[#B87333]'} transition-colors font-medium`}
            >
              {isSignUp ? (
                <>Already have an account? <span className={`${isDark ? 'text-[#C7A15A]' : 'text-[#B87333]'} underline font-bold`}>Sign In</span></>
              ) : (
                <>Don't have an account? <span className={`${isDark ? 'text-[#C7A15A]' : 'text-[#B87333]'} underline font-bold`}>Create one</span></>
              )}
            </button>

            <div className={`pt-3 border-t ${isDark ? 'border-white/10' : 'border-[#E5E3DF]'}`}>
              <button
                type="button"
                onClick={handleGuestDemoAccess}
                className={`w-full py-2.5 px-4 rounded-2xl border ${
                  isDark ? 'bg-[#121315] border-white/10 text-white hover:border-[#C7A15A] hover:text-[#C7A15A]' : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#181818] hover:bg-[#E5E3DF]'
                } text-xs font-bold transition-all flex items-center justify-center gap-1.5`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C7A15A]" />
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
