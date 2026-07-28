'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShoppingBag, Globe, Loader2, Sparkles, CheckCircle2 
} from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AiBackground } from '@/components/ui/ai-background';
import { ScrollProgress } from '@/components/ui/scroll-progress';

export default function CommerceCheckerPage() {
  const { isDark } = useTheme();
  const [storeUrl, setStoreUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  const handleInspect = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!storeUrl.trim()) {
      toast.error('Please enter an e-commerce store URL');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/tools/commerce-checker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ storeUrl }),
      });

      const json = await res.json();
      if (res.ok && json.data) {
        setResult(json.data);
        toast.success(`Agentic Commerce audit completed for ${json.data.domain}!`);
      } else {
        toast.error(json.error || 'Failed to inspect store');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error inspecting commerce protocol');
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
            <ShoppingBag className="w-3.5 h-3.5 text-[#C7A15A]" />
            <span className="uppercase tracking-wider">Free Micro-Tool #12</span>
          </div>

          <h1 className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#181818]'}`}>
            Agentic Commerce Protocol Inspector
          </h1>

          <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
            Audit your online store for ChatGPT Shopping & Google AI Agent Checkout readiness (Product Schemas, ACP, UCP).
          </p>
        </div>

        {/* Input & Audit Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className={`lg:col-span-5 rounded-3xl border ${
            isDark ? 'bg-[#121315]/90 border-white/10' : 'bg-white border-[#E5E3DF]'
          } p-6 sm:p-8 space-y-5 shadow-2xl backdrop-blur-md`}>
            
            <form onSubmit={handleInspect} className="space-y-4">
              <div className="space-y-2">
                <label className={`block text-xs font-mono font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                  E-Commerce Store URL:
                </label>
                <div className="relative">
                  <Globe className={`absolute left-3.5 top-3.5 h-4 w-4 ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`} />
                  <input
                    type="text"
                    required
                    value={storeUrl}
                    onChange={(e) => setStoreUrl(e.target.value)}
                    placeholder="e.g. allbirds.com or shop.acme.com"
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
                    <span>Auditing Store Protocols...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Inspect Agentic Commerce Protocols</span>
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
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-xs font-mono font-bold uppercase text-[#C7A15A]">
                      Agentic Shopping Readiness Score:
                    </span>
                    <div className="text-3xl font-extrabold text-[#C7A15A]">
                      {result.acpScore} <span className="text-xs font-mono text-white/50">/100</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {result.checks.map((chk: any, idx: number) => (
                      <div key={idx} className={`p-4 rounded-2xl border ${
                        isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-[#F6F5F3] border-[#E5E3DF]'
                      } space-y-1`}>
                        <div className="flex items-center justify-between text-xs font-bold">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span className="text-white">{chk.name}</span>
                          </div>
                          <span className="text-[10px] font-mono text-emerald-400">PASSED</span>
                        </div>
                        <p className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
                          {chk.detail}
                        </p>
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
                <ShoppingBag className="w-10 h-10 mx-auto stroke-[1.5]" />
                <p className="text-xs font-mono">Enter e-commerce store URL on the left to audit agentic shopping protocols.</p>
              </div>
            )}
          </div>

        </div>

      </main>

      <Footer isDark={isDark} />
    </div>
  );
}
