'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BarChart3, Loader2, Sparkles 
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

  const handleCalculate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userBrand.trim()) {
      toast.error('Please enter your brand name');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/tools/citation-sov', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userBrand, comp1, comp2, comp3 }),
      });

      const json = await res.json();
      if (res.ok && json.data) {
        setResult(json.data);
        toast.success(`Calculated Share of Voice for ${json.data.brand}!`);
      } else {
        toast.error(json.error || 'Failed to calculate SOV');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error calculating share of voice');
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
            <BarChart3 className="w-3.5 h-3.5 text-[#C7A15A]" />
            <span className="uppercase tracking-wider">Free Micro-Tool #11</span>
          </div>

          <h1 className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#181818]'}`}>
            Multi-Model Citation Share-of-Voice Radar
          </h1>

          <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
            Benchmark your brand's AI search citation share against 3 top competitors across LLM conversational search.
          </p>
        </div>

        {/* Input & Radar Bar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className={`lg:col-span-5 rounded-3xl border ${
            isDark ? 'bg-[#121315]/90 border-white/10' : 'bg-white border-[#E5E3DF]'
          } p-6 sm:p-8 space-y-5 shadow-2xl backdrop-blur-md`}>
            
            <form onSubmit={handleCalculate} className="space-y-4">
              <div className="space-y-2">
                <label className={`block text-xs font-mono font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                  Your Brand Name:
                </label>
                <input
                  type="text"
                  required
                  value={userBrand}
                  onChange={(e) => setUserBrand(e.target.value)}
                  placeholder="e.g. TangentCore"
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
                  placeholder="e.g. Competitor A"
                  className={`w-full ${
                    isDark
                      ? 'bg-[#1B1C1F] border-white/10 text-white placeholder-[#B7B7B5]/60 focus:border-[#C7A15A]'
                      : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#181818] placeholder-[#5C5C5C]/60 focus:border-[#B87333]'
                  } border rounded-2xl px-4 py-3 text-sm focus:outline-none transition-all`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={comp2}
                  onChange={(e) => setComp2(e.target.value)}
                  placeholder="Competitor #2"
                  className={`w-full ${
                    isDark
                      ? 'bg-[#1B1C1F] border-white/10 text-white placeholder-[#B7B7B5]/60 focus:border-[#C7A15A]'
                      : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#181818] placeholder-[#5C5C5C]/60 focus:border-[#B87333]'
                  } border rounded-2xl px-4 py-3 text-xs focus:outline-none transition-all`}
                />
                <input
                  type="text"
                  value={comp3}
                  onChange={(e) => setComp3(e.target.value)}
                  placeholder="Competitor #3"
                  className={`w-full ${
                    isDark
                      ? 'bg-[#1B1C1F] border-white/10 text-white placeholder-[#B7B7B5]/60 focus:border-[#C7A15A]'
                      : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#181818] placeholder-[#5C5C5C]/60 focus:border-[#B87333]'
                  } border rounded-2xl px-4 py-3 text-xs focus:outline-none transition-all`}
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
                    <span>Calculating SOV Radar...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Calculate Citation Share of Voice</span>
                  </>
                )}
              </button>
            </form>

          </div>

          <div className="lg:col-span-7 space-y-6">
            {result ? (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className={`rounded-3xl border ${
                  isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'
                } p-6 sm:p-8 space-y-6 shadow-xl`}>
                  <span className="text-xs font-mono font-bold uppercase text-[#C7A15A]">
                    Citation Share of Voice Breakdown:
                  </span>

                  <div className="space-y-4">
                    {result.radar.map((item: any) => (
                      <div key={item.name} className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className={item.isUser ? 'text-[#C7A15A]' : 'text-white'}>
                            {item.name} {item.isUser && '(Your Brand)'}
                          </span>
                          <span className="font-mono text-[#C7A15A]">{item.share}%</span>
                        </div>
                        <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              item.isUser ? 'bg-gradient-to-r from-[#B87333] to-[#C7A15A]' : 'bg-white/30'
                            }`}
                            style={{ width: `${item.share}%` }}
                          />
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
                <BarChart3 className="w-10 h-10 mx-auto stroke-[1.5]" />
                <p className="text-xs font-mono">Enter your brand & competitors to calculate Share-of-Voice.</p>
              </div>
            )}
          </div>

        </div>

      </main>

      <Footer isDark={isDark} />
    </div>
  );
}
