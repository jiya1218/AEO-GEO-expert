'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Brain, Sparkles, ArrowRight, Bot, Zap, Layers, Sun, Moon, Search, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [isDark, setIsDark] = useState(false);
  const [searchUrl, setSearchUrl] = useState('');
  const router = useRouter();

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchUrl) {
      router.push('/dashboard');
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-[#f8fafc] text-slate-900'} flex flex-col font-sans relative overflow-hidden transition-colors duration-300`}>
      {/* Background Animated Glows & Mesh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-gradient-to-tr from-cyan-500/20 via-sky-400/15 to-indigo-500/10 rounded-full blur-[140px] pointer-events-none animate-blob" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none animate-blob animation-delay-2000" />

      {/* Navigation Header */}
      <nav className={`border-b ${isDark ? 'border-slate-800/80 bg-slate-900/60' : 'border-slate-200/80 bg-white/80'} backdrop-blur-xl sticky top-0 z-40`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className={`font-extrabold text-lg ${isDark ? 'bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent' : 'text-slate-900'}`}>
              AEO / GEO Expert Platform
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800 text-amber-400' : 'bg-slate-100 border-slate-300 text-slate-700'} transition-all text-xs font-semibold flex items-center gap-1.5`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span className="hidden sm:inline">{isDark ? 'Light' : 'Dark'}</span>
            </button>

            <Link
              href="/login"
              className={`text-xs font-semibold ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-slate-900'} px-3 py-2`}
            >
              Sign In
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center justify-center relative z-10">
        
        {/* Animated Pill Badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
          isDark ? 'bg-slate-900/90 border-slate-700 text-cyan-400 shadow-cyan-500/10' : 'bg-white border-slate-200 text-cyan-700 shadow-xl shadow-cyan-500/5'
        } border backdrop-blur-md mb-8 text-xs font-bold shadow-lg animate-float`}>
          <Sparkles className="w-4 h-4 text-cyan-500 animate-spin-slow" />
          <span>Generative Engine Optimization (GEO) & AEO Platform</span>
        </div>

        {/* Hero Title with Shimmer Gradient */}
        <h1 className={`text-4xl sm:text-6xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'} leading-tight max-w-4xl`}>
          Dominate <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 bg-clip-text text-transparent animate-pulse-glow inline-block">AI Search Citations</span> Across All LLM Engines
        </h1>

        <p className={`mt-6 ${isDark ? 'text-slate-300' : 'text-slate-600'} text-base sm:text-lg max-w-2xl leading-relaxed font-medium`}>
          Monitor your brand recommendations, analyze JSON-LD schema readiness, and capture missing content citations across ChatGPT, Google Gemini, Claude, and DeepSeek.
        </p>

        {/* Hero Search Bar with Animated Gradient Border */}
        <form onSubmit={handleHeroSearch} className="mt-10 w-full max-w-xl relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 rounded-3xl blur-md opacity-75 group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-pulse-glow" />
          <div className={`relative flex flex-col sm:flex-row gap-2 p-2 rounded-2xl ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          } border shadow-2xl`}>
            <div className="relative flex-1 flex items-center">
              <Globe className="absolute left-4 h-5 w-5 text-cyan-500 animate-pulse" />
              <input
                type="text"
                value={searchUrl}
                onChange={(e) => setSearchUrl(e.target.value)}
                placeholder="Enter website domain (e.g. yoursite.com)"
                className={`w-full ${
                  isDark ? 'bg-slate-900 text-white placeholder-slate-500' : 'bg-white text-slate-900 placeholder-slate-400'
                } rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none font-medium`}
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-sm shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 shrink-0 group-hover:scale-[1.02]"
            >
              <Search className="w-4 h-4" />
              <span>Analyze Website</span>
            </button>
          </div>
        </form>

        <div className="mt-6 flex items-center gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-xs font-bold text-cyan-500 hover:text-cyan-400 transition-colors group"
          >
            <span>Go directly to Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Feature Grid with Hover Levitation */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 text-left w-full">
          <div className={`p-8 rounded-3xl border ${
            isDark ? 'bg-slate-900/80 border-slate-800 hover:border-cyan-500/40' : 'bg-white border-slate-200 hover:border-cyan-400 shadow-xl shadow-slate-200/50'
          } transition-all duration-300 hover:-translate-y-2 hover:shadow-cyan-500/10 group`}>
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Bot className="w-6 h-6 text-cyan-500" />
            </div>
            <h3 className={`text-lg font-extrabold ${isDark ? 'text-white' : 'text-slate-900'} mb-2`}>Multi-Model AI Scan</h3>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'} leading-relaxed font-medium`}>
              Simulate prompt queries across 4 major LLM engines simultaneously to measure your Share of Voice (SoV).
            </p>
          </div>

          <div className={`p-8 rounded-3xl border ${
            isDark ? 'bg-slate-900/80 border-slate-800 hover:border-purple-500/40' : 'bg-white border-slate-200 hover:border-purple-400 shadow-xl shadow-slate-200/50'
          } transition-all duration-300 hover:-translate-y-2 hover:shadow-purple-500/10 group`}>
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className={`text-lg font-extrabold ${isDark ? 'text-white' : 'text-slate-900'} mb-2`}>JSON-LD Schema Audit</h3>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'} leading-relaxed font-medium`}>
              Parse and evaluate FAQPage, Organization, and Product schemas tailored for direct answer extraction.
            </p>
          </div>

          <div className={`p-8 rounded-3xl border ${
            isDark ? 'bg-slate-900/80 border-slate-800 hover:border-amber-500/40' : 'bg-white border-slate-200 hover:border-amber-400 shadow-xl shadow-slate-200/50'
          } transition-all duration-300 hover:-translate-y-2 hover:shadow-amber-500/10 group`}>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-amber-500" />
            </div>
            <h3 className={`text-lg font-extrabold ${isDark ? 'text-white' : 'text-slate-900'} mb-2`}>Gap & Content Brief Generator</h3>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'} leading-relaxed font-medium`}>
              Identify queries where competitors win citations and generate instant GEO content briefs to outrank them.
            </p>
          </div>
        </div>
      </main>

      <footer className={`border-t ${isDark ? 'border-slate-800/80 bg-slate-950' : 'border-slate-200 bg-white'} py-6 text-center text-xs text-slate-500`}>
        © 2026 AEO / GEO Expert System. All rights reserved.
      </footer>
    </div>
  );
}
