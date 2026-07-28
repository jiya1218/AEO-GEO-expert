'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, Globe, Loader2, Sparkles, CheckCircle2, AlertCircle, ArrowRight, Shield, Award, BookOpen, Lock 
} from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AiBackground } from '@/components/ui/ai-background';
import { ScrollProgress } from '@/components/ui/scroll-progress';

export default function EeatAnalyzerPage() {
  const { isDark } = useTheme();
  const [domainInput, setDomainInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  const sampleDomains = ['swiggy.com', 'stripe.com', 'nike.in', 'rajaranicoaching.com', 'solospider.ai'];

  const handleAnalyze = async (targetDomain?: string) => {
    const domainToAudit = targetDomain || domainInput;
    if (!domainToAudit.trim()) {
      toast.error('Please enter a website domain (e.g. solospider.ai or nike.in)');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/tools/eeat-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domainInput: domainToAudit }),
      });

      const json = await res.json();
      if (res.ok && json.data) {
        setResult(json.data);
        toast.success(`E-E-A-T analysis completed for ${json.data.domain}!`);
      } else {
        toast.error(json.error || 'Failed to analyze EEAT');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error analyzing EEAT trust index');
    } finally {
      setLoading(false);
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
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-xs font-mono font-bold ${
            isDark ? 'bg-[#121315] border-white/10 text-[#C7A15A]' : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#B87333]'
          } shadow-sm`}>
            <ShieldCheck className="w-3.5 h-3.5 text-[#C7A15A]" />
            <span className="uppercase tracking-wider">Free Micro-Tool #09</span>
          </div>

          <h1 className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#181818]'}`}>
            E-E-A-T & Entity Trust Index
          </h1>

          <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
            Audit your domain across Experience, Expertise, Authoritativeness, and Trustworthiness signals required for Google & LLM recommendation engines.
          </p>
        </div>

        {/* Input Form & Sample Pills */}
        <div className={`max-w-2xl mx-auto rounded-3xl border ${
          isDark ? 'bg-[#121315]/90 border-white/10' : 'bg-white border-[#E5E3DF]'
        } p-6 sm:p-8 space-y-4 shadow-2xl backdrop-blur-md`}>
          
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAnalyze();
            }}
            className="space-y-4"
          >
            <label className={`block text-xs font-mono font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-[#181818]'}`}>
              Website Domain:
            </label>
            <div className="relative">
              <Globe className={`absolute left-4 top-4 h-4 w-4 ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`} />
              <input
                type="text"
                required
                value={domainInput}
                onChange={(e) => setDomainInput(e.target.value)}
                placeholder="e.g. solospider.ai or nike.in"
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
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Audit E-E-A-T</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Try Domains */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className={`text-xs font-mono font-bold ${isDark ? 'text-[#B7B7B5]/60' : 'text-[#5C5C5C]/70'}`}>
              Try sample:
            </span>
            {sampleDomains.map((sample) => (
              <button
                key={sample}
                onClick={() => {
                  setDomainInput(sample);
                  handleAnalyze(sample);
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
              <h3 className="text-xl font-bold">Auditing Google & LLM E-E-A-T Trust Index...</h3>
              <p className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
                Evaluating Experience, Expertise, Authoritativeness, and Trustworthiness signals.
              </p>
            </div>
          </div>
        )}

        {/* Results Column */}
        {result && !loading && (
          <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Score Header Card */}
            <div className={`rounded-3xl border ${
              isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'
            } p-6 sm:p-8 space-y-6 shadow-2xl`}>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className={`text-2xl font-extrabold ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                      {result.brandName}
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-md bg-[#C7A15A]/20 border border-[#C7A15A]/40 text-[#C7A15A] text-[10px] font-mono font-bold uppercase">
                      E-E-A-T Audit Report
                    </span>
                  </div>
                  <span className={`text-xs font-mono ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
                    Target Domain: https://{result.domain}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#C7A15A] block">
                      Overall Trust Index
                    </span>
                    <span className="text-3xl font-extrabold text-[#C7A15A]">
                      {result.eeatScore} <span className="text-xs font-mono text-white/50">/100</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* 4 Pillars Interactive Score Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* 1. Experience */}
                <div className={`p-4 rounded-2xl border space-y-2 ${
                  isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-[#F6F5F3] border-[#E5E3DF]'
                }`}>
                  <div className="flex items-center justify-between text-xs font-bold">
                    <div className="flex items-center gap-1.5 text-[#C7A15A]">
                      <Award className="w-4 h-4" />
                      <span>Experience</span>
                    </div>
                    <span className="font-mono text-[#C7A15A]">{result.breakdown.experience.score}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#B87333] to-[#C7A15A] rounded-full" style={{ width: `${result.breakdown.experience.score}%` }} />
                  </div>
                  <p className={`text-[11px] ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'} leading-relaxed pt-1`}>
                    {result.breakdown.experience.details}
                  </p>
                </div>

                {/* 2. Expertise */}
                <div className={`p-4 rounded-2xl border space-y-2 ${
                  isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-[#F6F5F3] border-[#E5E3DF]'
                }`}>
                  <div className="flex items-center justify-between text-xs font-bold">
                    <div className="flex items-center gap-1.5 text-[#C7A15A]">
                      <BookOpen className="w-4 h-4" />
                      <span>Expertise</span>
                    </div>
                    <span className="font-mono text-[#C7A15A]">{result.breakdown.expertise.score}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#B87333] to-[#C7A15A] rounded-full" style={{ width: `${result.breakdown.expertise.score}%` }} />
                  </div>
                  <p className={`text-[11px] ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'} leading-relaxed pt-1`}>
                    {result.breakdown.expertise.details}
                  </p>
                </div>

                {/* 3. Authoritativeness */}
                <div className={`p-4 rounded-2xl border space-y-2 ${
                  isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-[#F6F5F3] border-[#E5E3DF]'
                }`}>
                  <div className="flex items-center justify-between text-xs font-bold">
                    <div className="flex items-center gap-1.5 text-[#C7A15A]">
                      <Shield className="w-4 h-4" />
                      <span>Authority</span>
                    </div>
                    <span className="font-mono text-[#C7A15A]">{result.breakdown.authority.score}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#B87333] to-[#C7A15A] rounded-full" style={{ width: `${result.breakdown.authority.score}%` }} />
                  </div>
                  <p className={`text-[11px] ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'} leading-relaxed pt-1`}>
                    {result.breakdown.authority.details}
                  </p>
                </div>

                {/* 4. Trustworthiness */}
                <div className={`p-4 rounded-2xl border space-y-2 ${
                  isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-[#F6F5F3] border-[#E5E3DF]'
                }`}>
                  <div className="flex items-center justify-between text-xs font-bold">
                    <div className="flex items-center gap-1.5 text-[#C7A15A]">
                      <Lock className="w-4 h-4" />
                      <span>Trust</span>
                    </div>
                    <span className="font-mono text-[#C7A15A]">{result.breakdown.trust.score}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#B87333] to-[#C7A15A] rounded-full" style={{ width: `${result.breakdown.trust.score}%` }} />
                  </div>
                  <p className={`text-[11px] ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'} leading-relaxed pt-1`}>
                    {result.breakdown.trust.details}
                  </p>
                </div>

              </div>

              {/* Trust Signal Verification Checklist */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <span className={`text-xs font-mono font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                  Trust Signal Verification Checklist:
                </span>
                <div className="space-y-2.5">
                  {result.auditChecks.map((chk: any, idx: number) => (
                    <div key={idx} className={`p-3.5 rounded-2xl border flex items-center justify-between ${
                      isDark ? 'bg-[#16171A] border-white/10' : 'bg-[#F9F8F6] border-[#E5E3DF]'
                    }`}>
                      <div className="flex items-center gap-2.5">
                        {chk.pass ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                        )}
                        <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                          {chk.check}
                        </span>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-md font-mono text-[10px] font-bold ${
                        chk.pass ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}>
                        {chk.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specific Recommendation Banner */}
              <div className="p-4 rounded-2xl bg-[#C7A15A]/15 border border-[#C7A15A]/40 space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C7A15A] block">
                  Actionable E-E-A-T Recommendation:
                </span>
                <p className={`text-xs ${isDark ? 'text-white' : 'text-[#181818]'} leading-relaxed font-medium`}>
                  💡 {result.recommendation}
                </p>
              </div>

            </div>

          </div>
        )}

      </main>

      <Footer isDark={isDark} />
    </div>
  );
}
