'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Layers, Search, Loader2, Sparkles, CheckCircle2, ArrowRight 
} from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AiBackground } from '@/components/ui/ai-background';
import { ScrollProgress } from '@/components/ui/scroll-progress';

export default function QueryFanoutPage() {
  const { isDark } = useTheme();
  const [keywordInput, setKeywordInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  const handleSimulate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!keywordInput.trim()) {
      toast.error('Please enter a target keyword');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/tools/query-fanout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keywordInput }),
      });

      const json = await res.json();
      if (res.ok && json.data) {
        setResult(json.data);
        toast.success(`Simulated prompt fan-out for "${json.data.keyword}"!`);
      } else {
        toast.error(json.error || 'Failed to simulate query fan-out');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error simulating query fan-out');
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
            <Layers className="w-3.5 h-3.5 text-[#C7A15A]" />
            <span className="uppercase tracking-wider">Free Micro-Tool #08</span>
          </div>

          <h1 className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#181818]'}`}>
            Prompt Fan-Out & Sub-Query Simulator
          </h1>

          <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
            Simulate how ChatGPT & Perplexity decompose complex search prompts into sub-queries, and see the exact content topics required to win citations.
          </p>
        </div>

        {/* Input Form & Fan-Out Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className={`lg:col-span-5 rounded-3xl border ${
            isDark ? 'bg-[#121315]/90 border-white/10' : 'bg-white border-[#E5E3DF]'
          } p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-md`}>
            
            <form onSubmit={handleSimulate} className="space-y-5">
              <div className="space-y-2">
                <label className={`block text-xs font-mono font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                  Target Industry Keyword / Prompt:
                </label>
                <input
                  type="text"
                  required
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  placeholder="e.g. Best Enterprise Accounting Software"
                  className={`w-full ${
                    isDark
                      ? 'bg-[#1B1C1F] border-white/10 text-white placeholder-[#B7B7B5]/60 focus:border-[#C7A15A]'
                      : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#181818] placeholder-[#5C5C5C]/60 focus:border-[#B87333]'
                  } border rounded-2xl px-4 py-3.5 text-sm focus:outline-none transition-all`}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 rounded-2xl luxury-btn-primary font-bold text-xs flex items-center justify-center gap-2 shadow-xl hover:scale-[1.02] transition-transform"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Simulating Prompt Fan-Out...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Simulate LLM Query Fan-Out</span>
                  </>
                )}
              </button>
            </form>

          </div>

          {/* Fan-Out Sub-Queries Display Column */}
          <div className="lg:col-span-7 space-y-6">
            {result ? (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className={`rounded-3xl border ${
                  isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'
                } p-6 sm:p-8 space-y-6 shadow-xl`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase text-[#C7A15A]">
                      Decomposed Sub-Queries for "{result.keyword}":
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-[#C7A15A]/20 text-[#C7A15A] text-[10px] font-mono font-bold">
                      4 Sub-Prompts Generated
                    </span>
                  </div>

                  <div className="space-y-4">
                    {result.subQueries.map((sub: any) => (
                      <div key={sub.id} className={`p-4 rounded-2xl border ${
                        isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-[#F6F5F3] border-[#E5E3DF]'
                      } space-y-2`}>
                        <div className="flex items-center justify-between gap-2">
                          <h4 className={`text-sm font-extrabold ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                            Sub-Query #{sub.id}: "{sub.prompt}"
                          </h4>
                          <span className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] font-mono font-bold text-white/70">
                            {sub.intent}
                          </span>
                        </div>

                        <div className="pt-1">
                          <span className={`text-[11px] font-mono font-bold uppercase ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
                            Required Landing Page Content Topics:
                          </span>
                          <div className="flex flex-wrap gap-2 pt-1.5">
                            {sub.requiredTopics.map((top: string) => (
                              <span key={top} className="px-2.5 py-1 rounded-xl bg-[#C7A15A]/15 text-[#C7A15A] text-xs font-mono font-bold flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>{top}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'} leading-relaxed pt-2 border-t border-white/10`}>
                    💡 {result.recommendation}
                  </p>
                </div>
              </div>
            ) : (
              <div className={`rounded-3xl border ${
                isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'
              } p-12 text-center space-y-3 text-white/40`}>
                <Layers className="w-10 h-10 mx-auto stroke-[1.5]" />
                <p className="text-xs font-mono">Enter target keyword on the left to simulate LLM query decomposition.</p>
              </div>
            )}
          </div>

        </div>

      </main>

      <Footer isDark={isDark} />
    </div>
  );
}
