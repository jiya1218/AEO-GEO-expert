'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Brain, Sparkles, ArrowRight, Bot, Zap, Layers, Sun, Moon, Search, Globe, Shield, Eye, Radio } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [isDark, setIsDark] = useState(false);
  const [searchUrl, setSearchUrl] = useState('');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchUrl) {
      router.push('/dashboard');
    }
  };

  // Generate floating particles
  const particles = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 8,
    }));
  }, []);

  // Orbiting model icons data
  const orbitModels = [
    { icon: '🧠', label: 'GPT-4o', angle: 0 },
    { icon: '💎', label: 'Gemini', angle: 90 },
    { icon: '⚡', label: 'Claude', angle: 180 },
    { icon: '🔬', label: 'DeepSeek', angle: 270 },
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-[#f8fafc] text-slate-900'} flex flex-col font-sans relative overflow-hidden transition-colors duration-500`}>

      {/* ═══════════ ANIMATED BACKGROUND LAYER ═══════════ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Morphing gradient blobs */}
        <div className={`hero-blob blob-1 ${isDark ? 'bg-cyan-500/15' : 'bg-cyan-400/20'}`} />
        <div className={`hero-blob blob-2 ${isDark ? 'bg-purple-600/12' : 'bg-purple-400/15'}`} />
        <div className={`hero-blob blob-3 ${isDark ? 'bg-blue-600/10' : 'bg-blue-400/12'}`} />

        {/* Floating particles */}
        {particles.map((p) => (
          <div
            key={p.id}
            className={`floating-particle ${isDark ? 'bg-cyan-400' : 'bg-cyan-600'}`}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}

        {/* Grid lines overlay */}
        <div className={`absolute inset-0 ${isDark ? 'opacity-[0.03]' : 'opacity-[0.04]'}`}
          style={{
            backgroundImage: `linear-gradient(${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'} 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* ═══════════ NAVIGATION ═══════════ */}
      <nav className={`border-b ${isDark ? 'border-slate-800/80 bg-slate-900/60' : 'border-slate-200/80 bg-white/80'} backdrop-blur-xl sticky top-0 z-40`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="logo-icon w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className={`font-extrabold text-lg ${isDark ? 'bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent' : 'text-slate-900'}`}>
              AEO / GEO Expert
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800 text-amber-400' : 'bg-slate-100 border-slate-300 text-slate-700'} transition-all text-xs font-semibold flex items-center gap-1.5 hover:scale-105`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span className="hidden sm:inline">{isDark ? 'Light' : 'Dark'}</span>
            </button>
            <Link href="/login" className={`text-xs font-semibold ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-slate-900'} px-3 py-2`}>
              Sign In
            </Link>
            <Link href="/login" className="cta-button inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all">
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* ═══════════ HERO SECTION ═══════════ */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center flex flex-col items-center justify-center relative z-10">

        {/* ─── ORBITAL ANIMATION ─── */}
        <div className={`hero-orbit-container ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          {/* Outer orbit ring */}
          <div className="orbit-ring orbit-ring-1" style={{ borderColor: isDark ? 'rgba(34,211,238,0.12)' : 'rgba(8,145,178,0.1)' }} />
          {/* Inner orbit ring */}
          <div className="orbit-ring orbit-ring-2" style={{ borderColor: isDark ? 'rgba(139,92,246,0.1)' : 'rgba(139,92,246,0.08)' }} />

          {/* Orbiting Model Icons */}
          {orbitModels.map((m, idx) => (
            <div
              key={m.label}
              className="orbit-item"
              style={{
                animationDelay: `${idx * -5}s`,
                animationDuration: '20s',
              }}
            >
              <div className={`orbit-icon-box ${isDark ? 'bg-slate-900/90 border-slate-700' : 'bg-white border-slate-200 shadow-lg'}`}>
                <span className="text-lg">{m.icon}</span>
                <span className={`text-[9px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{m.label}</span>
              </div>
            </div>
          ))}

          {/* Center Brain */}
          <div className="orbit-center">
            <div className="orbit-center-pulse" />
            <div className="orbit-center-pulse pulse-delay" />
            <div className={`orbit-center-icon ${isDark ? 'shadow-cyan-500/40' : 'shadow-cyan-500/30'}`}>
              <Brain className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>

        {/* ─── ANIMATED BADGE ─── */}
        <div className={`hero-badge ${mounted ? 'animate-in' : ''} ${isDark ? 'bg-slate-900/90 border-slate-700 text-cyan-400' : 'bg-white border-slate-200 text-cyan-700 shadow-xl shadow-cyan-500/5'}`}>
          <div className="badge-glow" />
          <Sparkles className="w-4 h-4 text-cyan-500 sparkle-spin" />
          <span className="text-xs font-bold relative z-10">Generative Engine Optimization (GEO) & AEO Platform</span>
        </div>

        {/* ─── HERO HEADLINE ─── */}
        <h1 className={`hero-title ${mounted ? 'animate-in' : ''} text-4xl sm:text-6xl font-black tracking-tight leading-tight max-w-4xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Dominate{' '}
          <span className="hero-gradient-text">AI Search Citations</span>
          {' '}Across All LLM Engines
        </h1>

        <p className={`hero-subtitle ${mounted ? 'animate-in' : ''} mt-6 text-base sm:text-lg max-w-2xl leading-relaxed font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Monitor your brand recommendations, analyze JSON-LD schema readiness, and capture missing content citations across ChatGPT, Google Gemini, Claude, and DeepSeek.
        </p>

        {/* ─── SEARCH BAR WITH GLOW ─── */}
        <form onSubmit={handleHeroSearch} className={`hero-search ${mounted ? 'animate-in' : ''} mt-10 w-full max-w-xl relative group`}>
          <div className="search-glow" />
          <div className={`relative flex flex-col sm:flex-row gap-2 p-2 rounded-2xl ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} border shadow-2xl z-10`}>
            <div className="relative flex-1 flex items-center">
              <Globe className="absolute left-4 h-5 w-5 text-cyan-500" />
              <input
                type="text"
                value={searchUrl}
                onChange={(e) => setSearchUrl(e.target.value)}
                placeholder="Enter website domain (e.g. yoursite.com)"
                className={`w-full ${isDark ? 'bg-transparent text-white placeholder-slate-500' : 'bg-transparent text-slate-900 placeholder-slate-400'} rounded-xl pl-12 pr-4 py-3.5 text-sm focus:outline-none font-medium`}
              />
            </div>
            <button type="submit" className="search-cta-btn px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-white font-extrabold text-sm shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 shrink-0">
              <Search className="w-4 h-4" />
              <span>Analyze Website</span>
            </button>
          </div>
        </form>

        <div className={`mt-6 ${mounted ? 'animate-in delay-5' : 'opacity-0'}`}>
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-xs font-bold text-cyan-500 hover:text-cyan-400 transition-colors group">
            <span>Go directly to Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* ─── FEATURE CARDS WITH FLOAT ANIMATIONS ─── */}
        <div className={`mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 text-left w-full ${mounted ? 'cards-in' : ''}`}>
          {[
            { icon: Bot, color: 'cyan', title: 'Multi-Model AI Scan', desc: 'Simulate prompt queries across 4 major LLM engines simultaneously to measure your organic Share of Voice.' },
            { icon: Layers, color: 'purple', title: 'JSON-LD Schema Audit', desc: 'Parse and evaluate FAQPage, Organization, and Product schemas tailored for direct answer extraction.' },
            { icon: Zap, color: 'amber', title: 'Gap & Content Brief Generator', desc: 'Identify queries where competitors win citations and generate instant GEO content briefs to outrank them.' },
          ].map((card, idx) => (
            <div key={card.title} className={`feature-card card-${idx + 1} p-8 rounded-3xl border ${
              isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'
            }`}>
              <div className={`card-icon-box w-14 h-14 rounded-2xl bg-${card.color}-500/10 border border-${card.color}-500/20 flex items-center justify-center mb-6`}>
                <card.icon className={`w-7 h-7 text-${card.color}-500`} />
              </div>
              <h3 className={`text-lg font-extrabold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{card.title}</h3>
              <p className={`text-xs leading-relaxed font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{card.desc}</p>
            </div>
          ))}
        </div>

        {/* ─── TRUST BADGES ─── */}
        <div className={`mt-16 flex flex-wrap items-center justify-center gap-6 ${mounted ? 'animate-in delay-6' : 'opacity-0'}`}>
          {['ChatGPT 4o', 'Gemini 1.5 Pro', 'Claude 3.5 Sonnet', 'DeepSeek V3'].map((name) => (
            <div key={name} className={`trust-badge px-4 py-2 rounded-xl border text-xs font-bold ${
              isDark ? 'bg-slate-900/60 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600 shadow-sm'
            }`}>
              <Radio className="w-3 h-3 text-cyan-500 inline mr-1.5" />
              {name}
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className={`border-t ${isDark ? 'border-slate-800/80 bg-slate-950' : 'border-slate-200 bg-white'} py-6 text-center text-xs text-slate-500`}>
        © 2026 AEO / GEO Expert System. All rights reserved.
      </footer>

      {/* ═══════════ ALL ANIMATIONS CSS ═══════════ */}
      <style jsx>{`
        /* ── MORPHING GRADIENT BLOBS ── */
        .hero-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
        }
        .blob-1 {
          width: 700px; height: 700px;
          top: -10%; left: 20%;
          animation: morph-blob 15s ease-in-out infinite;
        }
        .blob-2 {
          width: 500px; height: 500px;
          bottom: -15%; right: 5%;
          animation: morph-blob 18s ease-in-out infinite 3s;
        }
        .blob-3 {
          width: 400px; height: 400px;
          top: 50%; left: 60%;
          animation: morph-blob 20s ease-in-out infinite 6s;
        }
        @keyframes morph-blob {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          25% { transform: translate(40px, -60px) scale(1.15) rotate(5deg); }
          50% { transform: translate(-30px, 30px) scale(0.9) rotate(-3deg); }
          75% { transform: translate(20px, 50px) scale(1.08) rotate(4deg); }
        }

        /* ── FLOATING PARTICLES ── */
        .floating-particle {
          position: absolute;
          border-radius: 50%;
          opacity: 0;
          animation: particle-float linear infinite;
        }
        @keyframes particle-float {
          0% { opacity: 0; transform: translateY(0) translateX(0) scale(0); }
          15% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 0.4; transform: translateY(-60px) translateX(25px); }
          85% { opacity: 0.15; }
          100% { opacity: 0; transform: translateY(-120px) translateX(-15px) scale(0.3); }
        }

        /* ── ORBITAL RING SYSTEM ── */
        .hero-orbit-container {
          position: relative;
          width: 220px; height: 220px;
          margin-bottom: 2.5rem;
          transition: opacity 1s ease;
        }
        .orbit-ring {
          position: absolute;
          border-radius: 50%;
          border: 1.5px solid;
        }
        .orbit-ring-1 {
          inset: 0;
          animation: orbit-spin 25s linear infinite;
        }
        .orbit-ring-2 {
          inset: 20px;
          animation: orbit-spin 18s linear infinite reverse;
        }
        @keyframes orbit-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Orbiting items */
        .orbit-item {
          position: absolute;
          width: 48px; height: 48px;
          left: 50%; top: 50%;
          margin-left: -24px; margin-top: -24px;
          animation: orbit-around 20s linear infinite;
        }
        @keyframes orbit-around {
          from { transform: rotate(0deg) translateX(100px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
        }
        .orbit-icon-box {
          width: 100%; height: 100%;
          border-radius: 14px;
          border: 1.5px solid;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 1px;
          backdrop-filter: blur(8px);
        }

        /* Center brain icon */
        .orbit-center {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .orbit-center-pulse {
          position: absolute;
          width: 80px; height: 80px;
          border-radius: 50%;
          background: rgba(34,211,238,0.08);
          animation: center-ping 3s cubic-bezier(0,0,0.2,1) infinite;
        }
        .orbit-center-pulse.pulse-delay {
          animation-delay: 1s;
        }
        @keyframes center-ping {
          0% { transform: scale(0.8); opacity: 0.6; }
          70%, 100% { transform: scale(2); opacity: 0; }
        }
        .orbit-center-icon {
          position: relative;
          width: 56px; height: 56px;
          border-radius: 16px;
          background: linear-gradient(135deg, #06b6d4, #3b82f6, #6366f1);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 40px rgba(34,211,238,0.3);
          animation: icon-breathe 4s ease-in-out infinite;
        }
        @keyframes icon-breathe {
          0%, 100% { box-shadow: 0 0 30px rgba(34,211,238,0.25), 0 0 60px rgba(34,211,238,0.1); transform: scale(1); }
          50% { box-shadow: 0 0 50px rgba(34,211,238,0.5), 0 0 100px rgba(34,211,238,0.15); transform: scale(1.06); }
        }

        /* ── HERO BADGE ── */
        .hero-badge {
          position: relative;
          display: inline-flex; align-items: center; gap: 8px;
          padding: 8px 18px;
          border-radius: 999px;
          border: 1.5px solid;
          backdrop-filter: blur(12px);
          margin-bottom: 2rem;
          overflow: hidden;
          opacity: 0; transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .hero-badge.animate-in {
          opacity: 1; transform: translateY(0);
          transition-delay: 0.2s;
        }
        .badge-glow {
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(34,211,238,0.08), transparent);
          animation: badge-shimmer 3s ease-in-out infinite;
        }
        @keyframes badge-shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .sparkle-spin {
          animation: sparkle-rotate 6s linear infinite;
        }
        @keyframes sparkle-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* ── HERO TITLE ── */
        .hero-title {
          opacity: 0; transform: translateY(30px);
          transition: all 1s cubic-bezier(0.16,1,0.3,1) 0.4s;
        }
        .hero-title.animate-in {
          opacity: 1; transform: translateY(0);
        }
        .hero-gradient-text {
          background: linear-gradient(135deg, #06b6d4, #38bdf8, #818cf8, #06b6d4);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-shift 6s ease infinite;
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* ── SUBTITLE ── */
        .hero-subtitle {
          opacity: 0; transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.16,1,0.3,1) 0.6s;
        }
        .hero-subtitle.animate-in { opacity: 1; transform: translateY(0); }

        /* ── SEARCH BAR ── */
        .hero-search {
          opacity: 0; transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.16,1,0.3,1) 0.8s;
        }
        .hero-search.animate-in { opacity: 1; transform: translateY(0); }
        .search-glow {
          position: absolute; inset: -3px;
          background: linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6, #06b6d4);
          background-size: 400% 400%;
          border-radius: 20px;
          filter: blur(12px);
          opacity: 0.5;
          animation: search-glow-pulse 4s ease-in-out infinite;
          z-index: 0;
        }
        @keyframes search-glow-pulse {
          0%, 100% { opacity: 0.4; background-position: 0% 50%; }
          50% { opacity: 0.8; background-position: 100% 50%; }
        }
        .search-cta-btn {
          transition: all 0.3s ease;
        }
        .search-cta-btn:hover {
          transform: scale(1.03);
          box-shadow: 0 0 30px rgba(34,211,238,0.3);
        }

        /* ── FEATURE CARDS ── */
        .feature-card {
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .cards-in .card-1 { opacity: 1; transform: translateY(0); transition-delay: 1s; }
        .cards-in .card-2 { opacity: 1; transform: translateY(0); transition-delay: 1.2s; }
        .cards-in .card-3 { opacity: 1; transform: translateY(0); transition-delay: 1.4s; }
        .feature-card:hover {
          transform: translateY(-8px) !important;
          box-shadow: 0 20px 60px rgba(6,182,212,0.08);
        }
        .card-icon-box {
          transition: all 0.4s ease;
        }
        .feature-card:hover .card-icon-box {
          transform: scale(1.15) rotate(5deg);
        }

        /* ── ANIMATE IN HELPER ── */
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .delay-5 {
          transition: all 0.8s cubic-bezier(0.16,1,0.3,1) 1s !important;
        }
        .delay-6 {
          transition: all 0.8s cubic-bezier(0.16,1,0.3,1) 1.6s !important;
        }

        /* ── TRUST BADGES ── */
        .trust-badge {
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.6s ease;
        }
        .animate-in .trust-badge,
        .delay-6 .trust-badge {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── LOGO PULSE ── */
        .logo-icon {
          animation: logo-pulse 3s ease-in-out infinite;
        }
        @keyframes logo-pulse {
          0%, 100% { box-shadow: 0 4px 15px rgba(6,182,212,0.2); }
          50% { box-shadow: 0 4px 30px rgba(6,182,212,0.4); }
        }

        /* ── CTA BUTTON ── */
        .cta-button {
          transition: all 0.3s ease;
        }
        .cta-button:hover {
          transform: scale(1.05);
          box-shadow: 0 0 25px rgba(6,182,212,0.25);
        }
      `}</style>
    </div>
  );
}
