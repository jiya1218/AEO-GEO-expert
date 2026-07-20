import Link from 'next/link';
import { Brain, Sparkles, Shield, ArrowRight, Bot, Zap, Layers, Globe } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Navigation Header */}
      <nav className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-lg bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
              AEO / GEO Expert Platform
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-xs font-semibold text-slate-300 hover:text-white transition-colors px-3 py-2"
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
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-slate-800 backdrop-blur-md mb-6 text-xs font-semibold text-cyan-400 shadow-xl">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>Generative Engine Optimization (GEO) & AEO Platform</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Dominate <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">AI Search Citations</span> Across All LLM Engines
        </h1>

        <p className="mt-6 text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed">
          Monitor your brand recommendations, analyze JSON-LD schema readiness, and capture missing content citations across ChatGPT, Google Gemini, Claude, DeepSeek, Grok, and Perplexity.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-sm shadow-xl shadow-cyan-500/25 transition-all group"
          >
            <span>Launch AEO/GEO Dashboard</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-semibold text-sm transition-all"
          >
            <span>Sign In with Google</span>
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 text-left w-full">
          <div className="bg-slate-900/70 border border-slate-800 p-6 rounded-2xl backdrop-blur-md">
            <Bot className="w-8 h-8 text-cyan-400 mb-4" />
            <h3 className="text-base font-bold text-white mb-2">Multi-Model AI Scan</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Simulate prompt queries across 6 major LLM engines simultaneously to measure your Share of Voice (SoV).
            </p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 p-6 rounded-2xl backdrop-blur-md">
            <Layers className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-base font-bold text-white mb-2">JSON-LD Schema Audit</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Parse and evaluate FAQPage, Organization, and Product schemas tailored for direct answer extraction.
            </p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 p-6 rounded-2xl backdrop-blur-md">
            <Zap className="w-8 h-8 text-amber-400 mb-4" />
            <h3 className="text-base font-bold text-white mb-2">Gap & Content Brief Generator</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Identify queries where competitors win citations and generate instant GEO content briefs to outrank them.
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        © 2026 AEO / GEO Expert System. All rights reserved.
      </footer>
    </div>
  );
}
