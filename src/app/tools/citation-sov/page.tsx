'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BarChart3, Loader2, Sparkles, CheckCircle2, AlertCircle, ArrowRight, Bot, Layers 
} from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AiBackground } from '@/components/ui/ai-background';
import { ScrollProgress } from '@/components/ui/scroll-progress';

export default function CitationSovPage() {
  const { isDark } = useTheme();
  const [userBrand, setUserBrand] = useState('');
  const [comp1, setComp1] = useState('');
  const [comp2, setComp2] = useState('');
  const [comp3, setComp3] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  const sampleBenchmark = [
    { brand: 'swiggy.com', c1: 'zomato.com', c2: 'zepto.com', c3: 'blinkit.com' },
    { brand: 'stripe.com', c1: 'adyen.com', c2: 'paypal.com', c3: 'checkout.com' },
    { brand: 'linear.app', c1: 'atlassian.com', c2: 'asana.com', c3: 'monday.com' },
  ];

  const handleCalculate = async (targetBrand?: string, tc1?: string, tc2?: string, tc3?: string) => {
    const brandToCalc = targetBrand || userBrand;
    if (!brandToCalc.trim()) {
      toast.error('Please enter your brand name or website domain');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/tools/citation-sov', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userBrand: brandToCalc,
          comp1: tc1 !== undefined ? tc1 : comp1,
          comp2: tc2 !== undefined ? tc2 : comp2,
          comp3: tc3 !== undefined ? tc3 : comp3,
        }),
      });

      const json = await res.json();
      if (res.ok && json.data) {
        setResult(json.data);
        toast.success(`Calculated AI Citation Share of Voice for ${json.data.brand}!`);
      } else {
        toast.error(json.error || 'Failed to calculate Share of Voice');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error calculating Share of Voice');
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
            <BarChart3 className="w-3.5 h-3.5 text-[#C7A15A]" />
            <span className="uppercase tracking-wider">Free Micro-Tool #11</span>
          </div>

          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight ${
            isDark ? 'text-[#F6F6F4]' : 'text-[#181818]'
          }`}>
            Multi-Model Citation Share-of-Voice Radar
          </h1>

          <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
            Benchmark your brand's AI search citation share against top market competitors across ChatGPT, Perplexity, Gemini, and Claude.
          </p>
        </div>

        {/* Input Form & Sample Pills */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className={`lg:col-span-5 rounded-3xl border ${
            isDark ? 'bg-[#121315]/90 border-white/10' : 'bg-white border-[#E5E3DF]'
          } p-6 sm:p-8 space-y-5 shadow-2xl backdrop-blur-md`}>
            
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCalculate();
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <label className={`block text-xs font-mono font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                  Your Brand Domain:
                </label>
                <input
                  type="text"
                  required
                  value={userBrand}
                  onChange={(e) => setUserBrand(e.target.value)}
                  placeholder="e.g. swiggy.com or stripe.com"
                  className={`w-full ${
                    isDark
                      ? 'bg-[#1B1C1F] border-white/10 text-white placeholder-[#B7B7B5]/60 focus:border-[#C7A15A]'
                      : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#181818] placeholder-[#5C5C5C]/60 focus:border-[#B87333]'
                  } border rounded-2xl px-4 py-3 text-sm focus:outline-none transition-all`}
                />
              </div>

              <div className="space-y-2">
                <label className={`block text-xs font-mono font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                  Competitor #1:
                </label>
                <input
                  type="text"
                  value={comp1}
                  onChange={(e) => setComp1(e.target.value)}
                  placeholder="e.g. zomato.com"
                  className={`w-full ${
                    isDark
                      ? 'bg-[#1B1C1F] border-white/10 text-white placeholder-[#B7B7B5]/60 focus:border-[#C7A15A]'
                      : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#181818] placeholder-[#5C5C5C]/60 focus:border-[#B87333]'
                  } border rounded-2xl px-4 py-3 text-sm focus:outline-none transition-all`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className={`block text-[10px] font-mono font-bold uppercase tracking-wider ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
                    Competitor #2:
                  </label>
                  <input
                    type="text"
                    value={comp2}
                    onChange={(e) => setComp2(e.target.value)}
                    placeholder="zepto.com"
                    className={`w-full ${
                      isDark
                        ? 'bg-[#1B1C1F] border-white/10 text-white placeholder-[#B7B7B5]/60 focus:border-[#C7A15A]'
                        : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#181818] placeholder-[#5C5C5C]/60 focus:border-[#B87333]'
                    } border rounded-2xl px-3.5 py-2.5 text-xs focus:outline-none transition-all`}
                  />
                </div>

                <div className="space-y-1">
                  <label className={`block text-[10px] font-mono font-bold uppercase tracking-wider ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
                    Competitor #3:
                  </label>
                  <input
                    type="text"
                    value={comp3}
                    onChange={(e) => setComp3(e.target.value)}
                    placeholder="blinkit.com"
                    className={`w-full ${
                      isDark
                        ? 'bg-[#1B1C1F] border-white/10 text-white placeholder-[#B7B7B5]/60 focus:border-[#C7A15A]'
                        : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#181818] placeholder-[#5C5C5C]/60 focus:border-[#B87333]'
                    } border rounded-2xl px-3.5 py-2.5 text-xs focus:outline-none transition-all`}
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
                    <span>Analyzing AI Share of Voice...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Calculate Citation Share of Voice</span>
                  </>
                )}
              </button>
            </form>

            {/* Quick Benchmark Pills */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <span className={`text-[10px] font-mono font-bold uppercase ${isDark ? 'text-[#B7B7B5]/70' : 'text-[#5C5C5C]'}`}>
                Benchmark Competitor Sets:
              </span>
              <div className="space-y-1.5">
                {sampleBenchmark.map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setUserBrand(sample.brand);
                      setComp1(sample.c1);
                      setComp2(sample.c2);
                      setComp3(sample.c3);
                      handleCalculate(sample.brand, sample.c1, sample.c2, sample.c3);
                    }}
                    className={`w-full p-2.5 rounded-xl border text-left text-xs font-mono flex items-center justify-between transition-all ${
                      isDark
                        ? 'bg-[#1B1C1F] border-white/10 text-[#B7B7B5] hover:text-white hover:border-[#C7A15A]'
                        : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#5C5C5C] hover:text-[#181818] hover:border-[#B87333]'
                    }`}
                  >
                    <span className="font-bold text-white">{sample.brand}</span>
                    <span className="text-[10px] text-white/50">vs {sample.c1}, {sample.c2}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Results Output Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Loading State */}
            {loading && (
              <div className={`rounded-3xl border ${
                isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'
              } p-12 text-center space-y-6 animate-pulse`}>
                <Loader2 className="w-10 h-10 text-[#C7A15A] animate-spin mx-auto" />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Scanning Citation Dominance Across LLM Engine Prompts...</h3>
                  <p className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
                    Auditing ChatGPT-4o, Perplexity Pro, Google Gemini, and Claude 3.5.
                  </p>
                </div>
              </div>
            )}

            {/* Results Display */}
            {result && !loading && (
              <div className="space-y-6 animate-in fade-in duration-300">
                
                {/* Overall Citation Share Radar */}
                <div className={`rounded-3xl border ${
                  isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'
                } p-6 sm:p-8 space-y-6 shadow-xl`}>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2 text-sm font-mono font-bold uppercase tracking-wider text-[#C7A15A]">
                      <BarChart3 className="w-4 h-4" />
                      <span>AI Citation Share of Voice Breakdown</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#C7A15A]/20 text-[#C7A15A] text-[10px] font-mono font-bold">
                      Domain-Accurate AI Radar
                    </span>
                  </div>

                  <div className="space-y-4">
                    {result.radar.map((item: any) => (
                      <div key={item.name} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <div className="flex items-center gap-2">
                            <span className={item.isUser ? 'text-[#C7A15A] font-extrabold' : 'text-white'}>
                              {item.name} {item.isUser && '(Your Brand)'}
                            </span>
                            <span className="text-[10px] font-mono text-white/50">
                              {item.domain}
                            </span>
                          </div>
                          <span className="font-mono text-[#C7A15A] text-sm font-extrabold">{item.share}%</span>
                        </div>
                        <div className="w-full h-3.5 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              item.isUser
                                ? 'bg-gradient-to-r from-[#B87333] via-[#C7A15A] to-amber-300'
                                : 'bg-white/30'
                            }`}
                            style={{ width: `${item.share}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Recommendation */}
                  <div className="p-4 rounded-2xl bg-[#C7A15A]/15 border border-[#C7A15A]/40 space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C7A15A] block">
                      AI Citation Growth Insight:
                    </span>
                    <p className={`text-xs ${isDark ? 'text-white' : 'text-[#181818]'} leading-relaxed font-medium`}>
                      💡 {result.recommendation}
                    </p>
                  </div>
                </div>

                {/* Competitive Insights & Gaps */}
                {result.competitiveDetails && result.competitiveDetails.length > 0 && (
                  <div className={`rounded-3xl border ${
                    isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'
                  } p-6 sm:p-8 space-y-4 shadow-xl`}>
                    <span className="text-xs font-mono font-bold uppercase text-[#C7A15A] block">
                      Detailed Brand Citation Analysis & Gaps:
                    </span>

                    <div className="space-y-3">
                      {result.competitiveDetails.map((det: any, idx: number) => (
                        <div key={idx} className={`p-4 rounded-2xl border ${
                          isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-[#F6F5F3] border-[#E5E3DF]'
                        } space-y-2`}>
                          <div className="flex items-center justify-between text-xs font-bold">
                            <span className="text-white">{det.name}</span>
                            <span className="font-mono text-[#C7A15A] text-[11px]">
                              ~{det.citationEstPer1000} Citations / 1,000 Queries
                            </span>
                          </div>
                          <div className="space-y-1 text-xs">
                            <div className="flex items-start gap-1.5 text-emerald-400">
                              <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                              <span>{det.keyStrengths}</span>
                            </div>
                            <div className="flex items-start gap-1.5 text-amber-400">
                              <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                              <span>{det.citationGaps}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}

            {!result && !loading && (
              <div className={`rounded-3xl border ${
                isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'
              } p-12 text-center space-y-3 text-white/40`}>
                <BarChart3 className="w-10 h-10 mx-auto stroke-[1.5]" />
                <p className="text-xs font-mono">Enter your brand & competitors to calculate real AI Citation Share-of-Voice.</p>
              </div>
            )}

          </div>

        </div>

      </main>

      <Footer isDark={isDark} />
    </div>
  );
}
