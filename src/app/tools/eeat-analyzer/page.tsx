'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, Globe, Loader2, Sparkles, CheckCircle2, AlertCircle 
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

  const handleAnalyze = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!domainInput.trim()) {
      toast.error('Please enter a website domain');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/tools/eeat-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domainInput }),
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
      <Navbar ctaText="Audit Your Brand" ctaHref="/dashboard" />

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
            Analyze your domain across Experience, Expertise, Authority, and Trust signals required for LLM endorsement.
          </p>
        </div>

        {/* Input Form & Score Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className={`lg:col-span-5 rounded-3xl border ${
            isDark ? 'bg-[#121315]/90 border-white/10' : 'bg-white border-[#E5E3DF]'
          } p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-md`}>
            
            <form onSubmit={handleAnalyze} className="space-y-5">
              <div className="space-y-2">
                <label className={`block text-xs font-mono font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                  Website Domain:
                </label>
                <div className="relative">
                  <Globe className={`absolute left-3.5 top-3.5 h-4 w-4 ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`} />
                  <input
                    type="text"
                    required
                    value={domainInput}
                    onChange={(e) => setDomainInput(e.target.value)}
                    placeholder="e.g. acme.com"
                    className={`w-full ${
                      isDark
                        ? 'bg-[#1B1C1F] border-white/10 text-white placeholder-[#B7B7B5]/60 focus:border-[#C7A15A]'
                        : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#181818] placeholder-[#5C5C5C]/60 focus:border-[#B87333]'
                    } border rounded-2xl pl-10 pr-4 py-3 text-sm focus:outline-none transition-all`}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 rounded-2xl luxury-btn-primary font-bold text-xs flex items-center justify-center gap-2 shadow-xl hover:scale-[1.02] transition-transform"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing Trust Signals...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Calculate E-E-A-T Trust Index</span>
                  </>
                )}
              </button>
            </form>

          </div>

          {/* Results Column */}
          <div className="lg:col-span-7 space-y-6">
            {result ? (
              <div className="space-y-6 animate-in fade-in duration-300">
                
                {/* Score Header */}
                <div className={`rounded-3xl border ${
                  isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'
                } p-6 sm:p-8 space-y-6 shadow-xl`}>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-xs font-mono font-bold uppercase text-[#C7A15A]">
                      Overall E-E-A-T Score:
                    </span>
                    <div className="text-3xl font-extrabold text-[#C7A15A]">
                      {result.eeatScore} <span className="text-xs font-mono text-white/50">/100</span>
                    </div>
                  </div>

                  {/* 4 Pillars Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(result.breakdown).map(([pillar, val]: [string, any]) => (
                      <div key={pillar} className={`p-4 rounded-2xl border ${
                        isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-[#F6F5F3] border-[#E5E3DF]'
                      } space-y-1`}>
                        <div className="flex items-center justify-between text-xs font-mono font-bold uppercase">
                          <span className={isDark ? 'text-white' : 'text-[#181818]'}>{pillar}</span>
                          <span className="text-[#C7A15A]">{val.score}%</span>
                        </div>
                        <p className={`text-[11px] ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
                          {val.details}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Checklist */}
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <span className={`text-xs font-mono font-bold uppercase ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                      Trust Signal Verification Checklist:
                    </span>
                    <div className="space-y-2">
                      {result.auditChecks.map((chk: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between text-xs font-medium">
                          <div className="flex items-center gap-2">
                            {chk.pass ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                            )}
                            <span className={isDark ? 'text-white' : 'text-[#181818]'}>{chk.check}</span>
                          </div>
                          <span className={`font-mono text-[10px] ${chk.pass ? 'text-emerald-400' : 'text-amber-400'}`}>
                            {chk.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <div className={`rounded-3xl border ${
                isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'
              } p-12 text-center space-y-3 text-white/40`}>
                <ShieldCheck className="w-10 h-10 mx-auto stroke-[1.5]" />
                <p className="text-xs font-mono">Enter domain on the left to calculate E-E-A-T trust signals.</p>
              </div>
            )}
          </div>

        </div>

      </main>

      <Footer isDark={isDark} />
    </div>
  );
}
