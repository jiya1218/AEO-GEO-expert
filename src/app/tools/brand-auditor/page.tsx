'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, Globe, Search, Loader2, Sparkles, CheckCircle2, 
  ExternalLink, ArrowRight, Layers, Bot, Palette 
} from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AiBackground } from '@/components/ui/ai-background';
import { ScrollProgress } from '@/components/ui/scroll-progress';

export default function BrandAuditorToolPage() {
  const { isDark } = useTheme();
  const [domainInput, setDomainInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [auditResult, setAuditResult] = useState<any | null>(null);
  const [logoIdx, setLogoIdx] = useState(0);
  const [logoBgColor, setLogoBgColor] = useState<'dark' | 'light' | 'checker' | 'gold'>('light');

  const sampleDomains = ['rajaranicoaching.com', 'swiggy.com', 'amazon.com', 'stripe.com', 'linear.app'];

  const handleRunAudit = async (targetDomain?: string) => {
    const domainToAudit = targetDomain || domainInput;
    if (!domainToAudit.trim()) {
      toast.error('Please enter a valid website domain (e.g. rajaranicoaching.com or swiggy.com)');
      return;
    }

    setLoading(true);
    setAuditResult(null);
    setLogoIdx(0);

    try {
      const res = await fetch('/api/tools/brand-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domainInput: domainToAudit }),
      });

      const json = await res.json();
      if (res.ok && json.data) {
        setAuditResult(json.data);
        toast.success(`Brand audit completed for ${json.data.domain}!`);
      } else {
        toast.error(json.error || 'Failed to analyze domain');
      }
    } catch (err) {
      console.error(err);
      toast.error('Network error during brand audit');
    } finally {
      setLoading(false);
    }
  };

  const handleLogoError = () => {
    if (auditResult?.logoCandidates && logoIdx < auditResult.logoCandidates.length - 1) {
      setLogoIdx((prev) => prev + 1);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans relative transition-colors duration-500 ${
      isDark ? 'bg-[#0B0B0C] text-[#F6F6F4]' : 'bg-[#FCFCFB] text-[#181818]'
    }`}>
      <ScrollProgress />
      <AiBackground isDark={isDark} />
      <Navbar ctaText="Full AI Audit" ctaHref="/dashboard" />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10 space-y-12">
        
        {/* Page Title Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-xs font-mono font-bold ${
            isDark ? 'bg-[#121315] border-white/10 text-[#C7A15A]' : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#B87333]'
          } shadow-sm`}>
            <Building2 className="w-3.5 h-3.5 text-[#C7A15A]" />
            <span className="uppercase tracking-wider">Free Micro-Tool #01</span>
          </div>

          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight ${
            isDark ? 'text-[#F6F6F4]' : 'text-[#181818]'
          }`}>
            Brand & Competitor Audit Matrix
          </h1>

          <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
            Extract real brand logos in full original color, complete AI executive business summaries, top market competitors, and AEO citation scores.
          </p>
        </div>

        {/* Audit Search Bar Input */}
        <div className={`max-w-2xl mx-auto rounded-3xl border ${
          isDark ? 'bg-[#121315]/90 border-white/10' : 'bg-white border-[#E5E3DF]'
        } p-6 sm:p-8 space-y-4 shadow-2xl backdrop-blur-md`}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRunAudit();
            }}
            className="space-y-4"
          >
            <label className={`block text-xs font-mono font-bold uppercase tracking-wider ${
              isDark ? 'text-white' : 'text-[#181818]'
            }`}>
              Enter Website Domain to Audit
            </label>
            <div className="relative">
              <Globe className={`absolute left-4 top-4 h-4 w-4 ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`} />
              <input
                type="text"
                value={domainInput}
                onChange={(e) => setDomainInput(e.target.value)}
                placeholder="e.g. rajaranicoaching.com or swiggy.com"
                className={`w-full ${
                  isDark
                    ? 'bg-[#1B1C1F] border-white/10 text-white placeholder-[#B7B7B5]/60 focus:border-[#C7A15A]'
                    : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#181818] placeholder-[#5C5C5C]/60 focus:border-[#B87333]'
                } border rounded-2xl pl-11 pr-36 py-3.5 text-sm focus:outline-none transition-all shadow-sm`}
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-1.5 top-1.5 bottom-1.5 px-5 rounded-xl luxury-btn-primary text-xs font-bold flex items-center gap-2 shadow-md hover:scale-[1.02] transition-transform"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Auditing...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-3.5 h-3.5" />
                    <span>Run Audit</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Try Domain Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className={`text-xs font-mono font-bold ${isDark ? 'text-[#B7B7B5]/60' : 'text-[#5C5C5C]/70'}`}>
              Try sample:
            </span>
            {sampleDomains.map((sample) => (
              <button
                key={sample}
                onClick={() => {
                  setDomainInput(sample);
                  handleRunAudit(sample);
                }}
                className={`px-3 py-1 rounded-xl border text-xs font-mono font-medium ${
                  isDark
                    ? 'bg-[#1B1C1F] border-white/10 text-[#B7B7B5] hover:text-white hover:border-[#C7A15A]'
                    : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#5C5C5C] hover:text-[#181818] hover:border-[#B87333]'
                } transition-all`}
              >
                {sample}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State Skeleton */}
        {loading && (
          <div className={`max-w-4xl mx-auto rounded-3xl border ${
            isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'
          } p-12 text-center space-y-6 animate-pulse`}>
            <Loader2 className="w-10 h-10 text-[#C7A15A] animate-spin mx-auto" />
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Auditing Website & Real Market Competitors...</h3>
              <p className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
                Extracting original brand logo, executive business summary, and competitive mapping.
              </p>
            </div>
          </div>
        )}

        {/* Audit Results Section */}
        {auditResult && !loading && (
          <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Card 1: Brand Overview & LOGO */}
            <div className={`rounded-3xl border ${
              isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'
            } p-6 sm:p-8 space-y-6 shadow-2xl`}>
              
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/10 pb-6">
                
                {/* Brand Title & Direct Domain Link */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className={`text-2xl font-extrabold ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                      {auditResult.brandName}
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-md bg-[#C7A15A]/20 border border-[#C7A15A]/40 text-[#C7A15A] text-[10px] font-mono font-bold uppercase">
                      Verified Brand
                    </span>
                  </div>
                  <a
                    href={auditResult.targetUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`text-xs font-mono flex items-center gap-1 ${
                      isDark ? 'text-[#C7A15A] hover:underline' : 'text-[#B87333] hover:underline'
                    }`}
                  >
                    <span>{auditResult.domain}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* LOGO Box with Background Controls */}
                <div className="flex items-center gap-6">
                  <div className={`p-4 rounded-2xl border flex flex-col items-center gap-3 ${
                    isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-[#F6F5F3] border-[#E5E3DF]'
                  }`}>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C7A15A]">
                      LOGO
                    </span>
                    
                    {/* Dynamic Background Logo Container */}
                    <div className={`p-3 rounded-xl transition-colors duration-300 flex items-center justify-center min-w-[140px] min-h-[56px] ${
                      logoBgColor === 'light'
                        ? 'bg-white border border-slate-200'
                        : logoBgColor === 'dark'
                        ? 'bg-[#0B0B0C] border border-slate-800'
                        : logoBgColor === 'gold'
                        ? 'bg-[#C7A15A]/20 border border-[#C7A15A]/40'
                        : 'bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:8px_8px] bg-slate-100 border border-slate-300'
                    }`}>
                      {auditResult.logoCandidates && auditResult.logoCandidates[logoIdx] ? (
                        <img
                          src={auditResult.logoCandidates[logoIdx]}
                          alt={`${auditResult.brandName} Logo`}
                          className="h-12 max-w-44 object-contain"
                          onError={handleLogoError}
                        />
                      ) : (
                        <div className="h-10 px-4 rounded-xl bg-gradient-to-r from-[#B87333] to-[#C7A15A] flex items-center justify-center text-white font-extrabold text-sm tracking-wider">
                          {auditResult.brandName}
                        </div>
                      )}
                    </div>

                    {/* Background Color Mode Selector Buttons */}
                    <div className="flex items-center gap-1.5 pt-1">
                      <span className="text-[9px] font-mono text-[#B7B7B5] mr-1 flex items-center gap-1">
                        <Palette className="w-3 h-3 text-[#C7A15A]" />
                        <span>Bg:</span>
                      </span>
                      <button
                        title="White Background"
                        onClick={() => setLogoBgColor('light')}
                        className={`w-4 h-4 rounded-full bg-white border ${
                          logoBgColor === 'light' ? 'ring-2 ring-[#C7A15A]' : 'border-slate-400'
                        }`}
                      />
                      <button
                        title="Dark Background"
                        onClick={() => setLogoBgColor('dark')}
                        className={`w-4 h-4 rounded-full bg-[#0B0B0C] border ${
                          logoBgColor === 'dark' ? 'ring-2 ring-[#C7A15A]' : 'border-slate-600'
                        }`}
                      />
                      <button
                        title="Gold Accent Background"
                        onClick={() => setLogoBgColor('gold')}
                        className={`w-4 h-4 rounded-full bg-[#C7A15A] border ${
                          logoBgColor === 'gold' ? 'ring-2 ring-white' : 'border-[#B87333]'
                        }`}
                      />
                      <button
                        title="Transparent Checkerboard"
                        onClick={() => setLogoBgColor('checker')}
                        className={`w-4 h-4 rounded-full bg-slate-300 border ${
                          logoBgColor === 'checker' ? 'ring-2 ring-[#C7A15A]' : 'border-slate-400'
                        }`}
                      />
                    </div>
                  </div>

                  {/* AEO Score Badge */}
                  <div className={`p-4 rounded-2xl border text-center ${
                    isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-[#F6F5F3] border-[#E5E3DF]'
                  }`}>
                    <span className="text-[10px] font-mono font-bold uppercase text-[#B7B7B5] block mb-1">
                      AEO Score
                    </span>
                    <span className="text-2xl font-extrabold text-[#C7A15A]">
                      {auditResult.aeoReadiness.score}/100
                    </span>
                  </div>
                </div>

              </div>

              {/* Title & Description */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <span className={`text-[11px] font-mono font-bold uppercase ${isDark ? 'text-[#B7B7B5]/70' : 'text-[#5C5C5C]'}`}>
                    Page Title:
                  </span>
                  <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                    {auditResult.siteTitle}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className={`text-[11px] font-mono font-bold uppercase ${isDark ? 'text-[#B7B7B5]/70' : 'text-[#5C5C5C]'}`}>
                    Meta Description:
                  </span>
                  <p className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'} leading-relaxed`}>
                    {auditResult.metaDescription}
                  </p>
                </div>
              </div>

            </div>

            {/* Card 2: Complete AI Executive Business Summary */}
            <div className={`rounded-3xl border ${
              isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'
            } p-6 sm:p-8 space-y-6 shadow-xl`}>
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-sm font-mono font-bold uppercase tracking-wider text-[#C7A15A]">
                  <Bot className="w-4 h-4" />
                  <span>AI Generated Executive Business Summary</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#C7A15A]/20 text-[#C7A15A] text-[10px] font-mono font-bold">
                  Full Business Overview
                </span>
              </div>

              <div className="space-y-4">
                {/* Full Un-Truncated Summary */}
                <p className={`text-sm leading-relaxed ${isDark ? 'text-[#F6F6F4]' : 'text-[#181818]'} font-medium`}>
                  {auditResult.executiveSummary}
                </p>

                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-2xl border ${isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-[#F6F5F3] border-[#E5E3DF]'}`}>
                    <span className="text-[10px] font-mono font-bold uppercase text-[#C7A15A] block mb-1">
                      Target Audience & Buyers
                    </span>
                    <p className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
                      {auditResult.targetAudience}
                    </p>
                  </div>

                  <div className={`p-4 rounded-2xl border ${isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-[#F6F5F3] border-[#E5E3DF]'}`}>
                    <span className="text-[10px] font-mono font-bold uppercase text-[#C7A15A] block mb-1">
                      Detected JSON-LD Schemas
                    </span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {auditResult.aeoReadiness.schemasFound.map((s: string) => (
                        <span key={s} className="px-2.5 py-0.5 rounded-md bg-[#C7A15A]/15 text-[#C7A15A] text-[10px] font-mono font-bold">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Key Product Features */}
                <div className="space-y-2 pt-2">
                  <span className={`text-xs font-mono font-bold uppercase ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                    Core Products & Offerings:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {auditResult.keyFeatures.map((feat: string, idx: number) => (
                      <div key={idx} className={`p-3.5 rounded-xl border flex items-center gap-2.5 text-xs font-medium ${
                        isDark ? 'bg-[#16171A] border-white/10 text-white' : 'bg-[#F9F8F6] border-[#E5E3DF] text-[#181818]'
                      }`}>
                        <CheckCircle2 className="w-4 h-4 text-[#C7A15A] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: REAL Market Competitors Snapshot */}
            <div className={`rounded-3xl border ${
              isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'
            } p-6 sm:p-8 space-y-6 shadow-xl`}>
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-sm font-mono font-bold uppercase tracking-wider text-[#C7A15A]">
                  <Layers className="w-4 h-4" />
                  <span>Top 4 Real Market Competitors Snapshot</span>
                </div>
                <span className={`text-xs font-mono ${isDark ? 'text-[#B7B7B5]/60' : 'text-[#5C5C5C]/70'}`}>
                  Live Competitor Mapping
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {auditResult.competitors.map((comp: any, idx: number) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border space-y-2.5 ${
                      isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-[#F6F5F3] border-[#E5E3DF]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={`https://www.google.com/s2/favicons?domain=${comp.domain}&sz=128`}
                          alt={comp.name}
                          className="w-6 h-6 rounded-md object-contain bg-white/10 p-0.5"
                          onError={(e: any) => { e.target.src = 'https://google.com/favicon.ico'; }}
                        />
                        <div>
                          <span className={`text-sm font-bold block ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                            {comp.name}
                          </span>
                          <span className="text-[10px] font-mono text-[#C7A15A]">
                            {comp.domain}
                          </span>
                        </div>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                        comp.threatLevel === 'High'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}>
                        {comp.threatLevel} Threat
                      </span>
                    </div>

                    <p className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'} leading-relaxed`}>
                      {comp.positioning}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 4: CTA to Full Audit */}
            <div className="rounded-3xl luxury-gradient-card border border-[#C7A15A]/40 p-8 text-center space-y-6 shadow-2xl">
              <div className="space-y-2 max-w-xl mx-auto">
                <h3 className="text-2xl font-extrabold text-white">
                  Ready to Audit Citation Share Across All 6 LLMs?
                </h3>
                <p className="text-xs text-[#E5E3DF]/80 leading-relaxed">
                  Run a full GEO multi-model scan on ChatGPT-4o, Google Gemini, Perplexity Pro, Claude 3.5, DeepSeek R1, and Grok 2.
                </p>
              </div>

              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl luxury-btn-primary font-bold text-sm shadow-xl hover:scale-105 transition-transform"
              >
                <span>Launch Full 6-LLM Audit in Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        )}

      </main>

      <Footer isDark={isDark} />
    </div>
  );
}
