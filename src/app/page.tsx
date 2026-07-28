'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Brain, Sparkles, ArrowRight, Bot, Zap, Layers, Sun, Moon, Search, Globe, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { AiBackground } from '@/components/ui/ai-background';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { Footer } from '@/components/footer';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal';

export default function HomePage() {
  const [isDark, setIsDark] = useState(true);
  const [searchUrl, setSearchUrl] = useState('');
  const router = useRouter();

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchUrl) {
      const clean = searchUrl.trim().toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '');
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('pendingScanUrl', clean);
      }
      router.push('/dashboard');
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans relative overflow-hidden transition-colors duration-300 ${
      isDark ? 'bg-[#0A0A0A] text-white' : 'bg-[#f8fafc] text-slate-900'
    }`}>
      {/* Top Fixed Gold Scroll Progress Bar */}
      <ScrollProgress />

      {/* Luxury Ambient Background */}
      <AiBackground isDark={isDark} />

      {/* Navigation Header */}
      <ScrollReveal variant="fadeDown" duration={0.5} as="nav" className={`border-b ${
        isDark ? 'border-[#2A2A2A] bg-[#0A0A0A]/85' : 'border-slate-200/80 bg-white/80'
      } backdrop-blur-2xl sticky top-0 z-40 transition-colors`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className={`w-11 h-11 rounded-xl ${
              isDark ? 'bg-gradient-to-tr from-[#C8A951] via-[#D4AF37] to-[#F5D76E] text-[#111111] shadow-lg shadow-[#D4AF37]/20' : 'bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
            } flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}>
              <Brain className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className={`font-extrabold text-lg tracking-tight ${isDark ? 'gold-gradient-text' : 'text-slate-900'}`}>
                TangentCore
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-[#9E9E9E]' : 'text-slate-500'}`}>
                AEO / GEO Engine
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-5">
            <div className="hidden sm:flex items-center gap-5 text-xs font-semibold">
              <Link
                href="/pricing"
                className={`px-4 py-2 rounded-xl transition-all font-bold ${
                  isDark
                    ? 'text-[#D4AF37] hover:text-[#F5D76E] border border-[#D4AF37]/30 hover:border-[#D4AF37]'
                    : 'bg-cyan-500/10 text-cyan-600 border border-cyan-500/30 hover:bg-cyan-500/20'
                }`}
              >
                Pricing
              </Link>
            </div>

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2.5 rounded-xl border ${
                isDark
                  ? 'bg-[#181818] border-[#2A2A2A] text-[#D4AF37] hover:border-[#D4AF37]'
                  : 'bg-slate-100 border-slate-300 text-slate-700'
              } transition-all text-xs font-semibold flex items-center gap-2`}
              title="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-[#F5D76E]" /> : <Moon className="w-4 h-4" />}
              <span className="hidden sm:inline text-xs font-bold">{isDark ? 'Light' : 'Dark'}</span>
            </button>

            <Link
              href="/login"
              className={`text-xs font-semibold ${isDark ? 'text-[#CFCFCF] hover:text-white' : 'text-slate-700 hover:text-slate-900'} px-3 py-2 transition-colors`}
            >
              Sign In
            </Link>

            <Link
              href="/pricing"
              className={`inline-flex items-center gap-2 px-5 py-2.5 ${
                isDark ? 'luxury-btn-primary' : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
              } text-xs font-bold shadow-md transition-all`}
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </ScrollReveal>

      {/* Hero Section */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center flex flex-col items-center justify-center relative z-10">
        
        {/* Badge Pill */}
        <ScrollReveal variant="scaleUp" duration={0.6}>
          <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full ${
            isDark
              ? 'bg-[#181818] border-[#2A2A2A] text-[#D4AF37]'
              : 'bg-white border-slate-200 text-cyan-600'
          } border backdrop-blur-md mb-8 text-xs font-bold shadow-sm`}>
            <Sparkles className={`w-4 h-4 ${isDark ? 'text-[#D4AF37]' : 'text-cyan-500'} animate-pulse`} />
            <span className="tracking-wide">Generative Engine Optimization (GEO) & AEO Platform</span>
          </div>
        </ScrollReveal>

        {/* Hero Headline (Generous 64-72px on desktop) */}
        <ScrollReveal variant="fadeUp" delay={0.1} duration={0.7}>
          <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          } leading-[1.1]`}>
            Dominate <span className={isDark ? 'gold-gradient-text' : 'bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 bg-clip-text text-transparent'}>AI Search Citations</span> Across All LLM Engines
          </h1>
        </ScrollReveal>

        {/* Subtitle (Generous 18px body with generous line-height) */}
        <ScrollReveal variant="fadeUp" delay={0.2} duration={0.65}>
          <p className={`mt-8 ${
            isDark ? 'text-[#CFCFCF]' : 'text-slate-600'
          } text-base sm:text-lg lg:text-xl max-w-3xl leading-relaxed font-normal`}>
            Monitor your brand recommendations, analyze JSON-LD schema readiness, and capture missing content citations across ChatGPT, Google Gemini, Claude, DeepSeek, Grok, and Perplexity.
          </p>
        </ScrollReveal>

        {/* Hero Instant URL Search Form */}
        <ScrollReveal variant="fadeUp" delay={0.3} duration={0.65}>
          <form onSubmit={handleHeroSearch} className="mt-10 w-full max-w-2xl flex flex-col sm:flex-row gap-3.5">
            <div className="relative flex-1">
              <Globe className={`absolute left-4.5 top-4 h-5 w-5 ${isDark ? 'text-[#9E9E9E]' : 'text-slate-400'}`} />
              <input
                type="text"
                value={searchUrl}
                onChange={(e) => setSearchUrl(e.target.value)}
                placeholder="Enter website domain (e.g. yoursite.com)"
                className={`w-full ${
                  isDark
                    ? 'bg-[#181818] border-[#2A2A2A] text-white placeholder-[#9E9E9E] focus:border-[#D4AF37]'
                    : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-cyan-500'
                } border rounded-2xl pl-13 pr-4 py-3.5 text-sm font-medium focus:outline-none transition-all shadow-lg`}
              />
            </div>
            <button
              type="submit"
              className={`px-8 py-3.5 ${
                isDark ? 'luxury-btn-primary' : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
              } text-sm font-bold shadow-lg transition-all flex items-center justify-center gap-2 shrink-0`}
            >
              <Search className="w-4 h-4" />
              <span>Analyze Website</span>
            </button>
          </form>
        </ScrollReveal>

        {/* Dashboard Link */}
        <ScrollReveal variant="fade" delay={0.45}>
          <div className="mt-8 flex items-center gap-4">
            <Link
              href="/dashboard"
              className={`inline-flex items-center gap-2 text-xs font-bold ${
                isDark ? 'text-[#D4AF37] hover:text-[#F5D76E]' : 'text-cyan-600 hover:underline'
              } transition-colors`}
            >
              <span>Go directly to Dashboard →</span>
            </Link>
          </div>
        </ScrollReveal>

        {/* Feature Grid (100-120px padding from hero) */}
        <StaggerContainer stagger={0.15} delayChildren={0.1} className="mt-28 grid grid-cols-1 md:grid-cols-3 gap-8 text-left w-full">
          <StaggerItem variant="fadeUp">
            <div className={`p-8 rounded-3xl border ${
              isDark
                ? 'bg-[#181818] border-[#2A2A2A] hover-luxury-lift'
                : 'bg-white border-slate-200 shadow-md'
            }`}>
              <div className={`w-12 h-12 rounded-2xl ${
                isDark ? 'bg-[#202020] border border-[#2A2A2A] text-[#D4AF37]' : 'bg-cyan-50 text-cyan-600'
              } flex items-center justify-center mb-6`}>
                <Bot className="w-6 h-6" />
              </div>
              <h3 className={`text-xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'} mb-3`}>
                Multi-Model AI Scan
              </h3>
              <p className={`text-sm ${isDark ? 'text-[#CFCFCF]' : 'text-slate-600'} leading-relaxed`}>
                Simulate prompt queries across 6 major LLM engines simultaneously to measure your Share of Voice (SoV).
              </p>
            </div>
          </StaggerItem>

          <StaggerItem variant="fadeUp">
            <div className={`p-8 rounded-3xl border ${
              isDark
                ? 'bg-[#181818] border-[#2A2A2A] hover-luxury-lift'
                : 'bg-white border-slate-200 shadow-md'
            }`}>
              <div className={`w-12 h-12 rounded-2xl ${
                isDark ? 'bg-[#202020] border border-[#2A2A2A] text-[#D4AF37]' : 'bg-purple-50 text-purple-600'
              } flex items-center justify-center mb-6`}>
                <Layers className="w-6 h-6" />
              </div>
              <h3 className={`text-xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'} mb-3`}>
                JSON-LD Schema Audit
              </h3>
              <p className={`text-sm ${isDark ? 'text-[#CFCFCF]' : 'text-slate-600'} leading-relaxed`}>
                Parse and evaluate FAQPage, Organization, and Product schemas tailored for direct answer extraction.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem variant="fadeUp">
            <div className={`p-8 rounded-3xl border ${
              isDark
                ? 'bg-[#181818] border-[#2A2A2A] hover-luxury-lift'
                : 'bg-white border-slate-200 shadow-md'
            }`}>
              <div className={`w-12 h-12 rounded-2xl ${
                isDark ? 'bg-[#202020] border border-[#2A2A2A] text-[#D4AF37]' : 'bg-amber-50 text-amber-600'
              } flex items-center justify-center mb-6`}>
                <Zap className="w-6 h-6" />
              </div>
              <h3 className={`text-xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'} mb-3`}>
                Gap & GEO Content Briefs
              </h3>
              <p className={`text-sm ${isDark ? 'text-[#CFCFCF]' : 'text-slate-600'} leading-relaxed`}>
                Identify queries where competitors win citations and generate instant GEO content briefs to outrank them.
              </p>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </main>

      {/* Footer */}
      <Footer isDark={isDark} />
    </div>
  );
}
