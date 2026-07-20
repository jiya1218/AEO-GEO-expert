'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Brain, Sparkles, ArrowRight, Bot, Zap, Layers, Sun, Moon, Search, Globe, Shield, Radio, Eye, Cpu } from 'lucide-react';
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

  // Generate floating particles
  const particles = useMemo(() => {
    return Array.from({ length: 35 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 4 + 2,
      dur: Math.random() * 15 + 10,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.4 + 0.1,
    }));
  }, []);

  // Generate twinkle stars
  const stars = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      dur: Math.random() * 4 + 2,
      delay: Math.random() * 5,
    }));
  }, []);

  // Data stream lines for SVG background
  const dataStreams = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x1: Math.random() * 100,
      y1: Math.random() * 100,
      x2: Math.random() * 100,
      y2: Math.random() * 100,
      dur: Math.random() * 5 + 3,
      delay: Math.random() * 4,
    }));
  }, []);

  const AI_ENGINES = [
    { name: 'ChatGPT', icon: '🧠', color: '#10b981' },
    { name: 'Gemini', icon: '💎', color: '#3b82f6' },
    { name: 'Claude', icon: '⚡', color: '#f59e0b' },
    { name: 'DeepSeek', icon: '🔬', color: '#06b6d4' },
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-[#f8fafc] text-slate-900'} flex flex-col font-sans relative overflow-hidden transition-colors duration-500`}>

      {/* ═══ ANIMATED BACKGROUND LAYER ═══ */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Mesh Blobs */}
        <div className={`absolute top-[-15%] left-[-10%] w-[700px] h-[700px] rounded-full blur-[160px] animate-blob ${
          isDark ? 'bg-cyan-600/20' : 'bg-cyan-400/25'
        }`} />
        <div className={`absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[140px] animate-blob animation-delay-2000 ${
          isDark ? 'bg-indigo-600/15' : 'bg-indigo-400/20'
        }`} />
        <div className={`absolute top-[50%] left-[50%] w-[500px] h-[500px] rounded-full blur-[130px] animate-blob animation-delay-4000 ${
          isDark ? 'bg-purple-600/10' : 'bg-purple-400/15'
        }`} />

        {/* Floating Particles */}
        {particles.map((p) => (
          <div
            key={p.id}
            className={`absolute rounded-full animate-particle ${isDark ? 'bg-cyan-400' : 'bg-cyan-600'}`}
            style={{
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              ['--dur' as string]: `${p.dur}s`,
              ['--delay' as string]: `${p.delay}s`,
            }}
          />
        ))}

        {/* Twinkle Stars */}
        {stars.map((s) => (
          <div
            key={s.id}
            className={`absolute rounded-full animate-twinkle ${isDark ? 'bg-white' : 'bg-cyan-500'}`}
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              ['--dur' as string]: `${s.dur}s`,
              ['--delay' as string]: `${s.delay}s`,
            }}
          />
        ))}

        {/* Data Stream SVG Lines */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {dataStreams.map((d) => (
            <line
              key={d.id}
              x1={`${d.x1}%`} y1={`${d.y1}%`}
              x2={`${d.x2}%`} y2={`${d.y2}%`}
              className="animate-data-stream"
              style={{
                stroke: isDark ? 'rgba(34,211,238,0.08)' : 'rgba(8,145,178,0.06)',
                strokeWidth: 1,
                ['--dur' as string]: `${d.dur}s`,
                ['--delay' as string]: `${d.delay}s`,
              }}
            />
          ))}
        </svg>
      </div>

      {/* ═══ NAVIGATION ═══ */}
      <nav className={`border-b ${isDark ? 'border-slate-800/80 bg-slate-900/60' : 'border-slate-200/80 bg-white/70'} backdrop-blur-xl sticky top-0 z-40 animate-fade-in-up`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 animate-glow-pulse">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className={`font-extrabold text-lg ${isDark ? 'bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent' : 'text-slate-900'}`}>
              AEO / GEO Expert
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
            <Link href="/login" className={`text-xs font-semibold ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-slate-900'} px-3 py-2`}>Sign In</Link>
            <Link href="/login" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all animate-gradient-shift">
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* ═══ HERO SECTION ═══ */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center flex flex-col items-center justify-center relative z-10">

        {/* Animated Orbital Rings Behind Hero */}
        <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] pointer-events-none">
          <div className={`absolute inset-0 rounded-full border animate-orbit-ring ${isDark ? 'border-cyan-500/10' : 'border-cyan-400/15'}`} style={{ ['--speed' as string]: '25s' }} />
          <div className={`absolute inset-8 rounded-full border animate-orbit-reverse ${isDark ? 'border-indigo-500/10' : 'border-indigo-400/12'}`} style={{ ['--speed' as string]: '18s' }} />
          <div className={`absolute inset-16 rounded-full border animate-orbit-ring ${isDark ? 'border-purple-500/8' : 'border-purple-400/10'}`} style={{ ['--speed' as string]: '12s' }} />
          {/* Center Radar Sweep */}
          <div className="absolute inset-24 rounded-full overflow-hidden">
            <div className={`absolute inset-0 animate-radar ${
              isDark
                ? 'bg-[conic-gradient(from_0deg,transparent_0deg,rgba(34,211,238,0.08)_90deg,transparent_180deg)]'
                : 'bg-[conic-gradient(from_0deg,transparent_0deg,rgba(6,182,212,0.06)_90deg,transparent_180deg)]'
            }`} />
          </div>
        </div>

        {/* Floating Badge */}
        <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full ${
          isDark ? 'bg-slate-900/90 border-slate-700 text-cyan-400' : 'bg-white border-slate-200 text-cyan-700 shadow-xl shadow-cyan-500/5'
        } border backdrop-blur-md mb-8 text-xs font-bold shadow-lg animate-fade-in-up animate-hero-float relative z-10`}>
          <Sparkles className="w-4 h-4 text-cyan-500 animate-spin" style={{ animationDuration: '4s' }} />
          <span>AI-Powered AEO & GEO Analytics Engine</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        {/* Hero Title */}
        <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] max-w-4xl animate-fade-in-up delay-200 relative z-10 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Dominate{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_200%]">
            AI Search Citations
          </span>
          {' '}Across All LLM Engines
        </h1>

        <p className={`mt-6 text-base sm:text-lg max-w-2xl leading-relaxed font-medium animate-fade-in-up delay-400 relative z-10 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Monitor your brand recommendations, analyze JSON-LD schema readiness, and capture missing content citations across ChatGPT, Google Gemini, Claude, and DeepSeek.
        </p>

        {/* Animated AI Engine Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6 animate-fade-in-up delay-500 relative z-10">
          {AI_ENGINES.map((engine, idx) => (
            <div
              key={engine.name}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all duration-300 hover:scale-105 ${
                isDark ? 'bg-slate-900/80 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-700 shadow-sm'
              }`}
              style={{ animationDelay: `${0.6 + idx * 0.1}s` }}
            >
              <span>{engine.icon}</span>
              <span>{engine.name}</span>
            </div>
          ))}
        </div>

        {/* Hero Search Bar with Glowing Animated Border */}
        <form onSubmit={handleHeroSearch} className="mt-10 w-full max-w-xl relative group animate-fade-in-up delay-600 z-10">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-500 rounded-3xl blur-md opacity-60 group-hover:opacity-100 transition duration-500 animate-gradient-shift bg-[length:200%_200%]" />
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
                className={`w-full ${isDark ? 'bg-slate-900 text-white placeholder-slate-500' : 'bg-white text-slate-900 placeholder-slate-400'} rounded-xl pl-12 pr-4 py-3.5 text-sm focus:outline-none font-medium`}
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-sm shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 shrink-0 group-hover:scale-[1.02] animate-gradient-shift bg-[length:200%_200%]"
            >
              <Search className="w-4 h-4" />
              <span>Analyze Website</span>
            </button>
          </div>
        </form>

        <div className="mt-6 flex items-center gap-4 animate-fade-in-up delay-700 relative z-10">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-xs font-bold text-cyan-500 hover:text-cyan-400 transition-colors group">
            <span>Go directly to Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* ═══ FEATURE CARDS WITH LEVITATION ═══ */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 text-left w-full relative z-10">
          {[
            { icon: Bot, color: 'cyan', title: 'Multi-Model AI Scan', desc: 'Run unbranded buyer-intent prompts across 4 premier LLMs and measure organic Share of Voice.', delay: 'delay-100' },
            { icon: Layers, color: 'purple', title: 'JSON-LD Schema Audit', desc: 'Deep crawl FAQPage, Organization, and Product schemas for direct answer extraction readiness.', delay: 'delay-300' },
            { icon: Zap, color: 'amber', title: 'Gap & Brief Generator', desc: 'Identify queries where competitors win AI citations and generate instant GEO content briefs.', delay: 'delay-500' },
          ].map((card) => (
            <div
              key={card.title}
              className={`p-8 rounded-3xl border animate-fade-in-up ${card.delay} ${
                isDark
                  ? `bg-slate-900/80 border-slate-800 hover:border-${card.color}-500/40`
                  : `bg-white border-slate-200 hover:border-${card.color}-400 shadow-xl shadow-slate-200/50`
              } transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl group cursor-default`}
            >
              <div className={`w-14 h-14 rounded-2xl bg-${card.color}-500/10 border border-${card.color}-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                <card.icon className={`w-7 h-7 text-${card.color}-500`} />
              </div>
              <h3 className={`text-lg font-extrabold ${isDark ? 'text-white' : 'text-slate-900'} mb-3`}>{card.title}</h3>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'} leading-relaxed font-medium`}>{card.desc}</p>
            </div>
          ))}
        </div>

        {/* ═══ ANIMATED STATS BAR ═══ */}
        <div className={`mt-20 w-full grid grid-cols-2 sm:grid-cols-4 gap-4 animate-fade-in-up delay-700 relative z-10`}>
          {[
            { label: 'AI Models', value: '4', suffix: '+' },
            { label: 'Prompt Categories', value: '20', suffix: '' },
            { label: 'Schema Types', value: '6', suffix: '' },
            { label: 'Real-Time', value: '100', suffix: '%' },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`p-5 rounded-2xl border text-center ${
                isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white/80 border-slate-200 shadow-lg shadow-slate-200/30'
              } backdrop-blur-md animate-breathe`}
            >
              <div className={`text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'} animate-count-up`}>
                {stat.value}<span className="text-cyan-500">{stat.suffix}</span>
              </div>
              <p className={`text-xs font-semibold mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{stat.label}</p>
            </div>
          ))}
        </div>
      </main>

      {/* ═══ FOOTER ═══ */}
      <footer className={`border-t ${isDark ? 'border-slate-800/80 bg-slate-950/80' : 'border-slate-200 bg-white/80'} backdrop-blur-md py-6 text-center text-xs text-slate-500 relative z-10`}>
        © 2026 AEO / GEO Expert Platform. All rights reserved.
      </footer>
    </div>
  );
}
