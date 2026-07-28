'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, Loader2, Sparkles, Copy, Check 
} from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AiBackground } from '@/components/ui/ai-background';
import { ScrollProgress } from '@/components/ui/scroll-progress';

export default function PromptResearchPage() {
  const { isDark } = useTheme();
  const [nicheInput, setNicheInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  const handleResearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!nicheInput.trim()) {
      toast.error('Please enter an industry niche');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/tools/prompt-research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nicheInput }),
      });

      const json = await res.json();
      if (res.ok && json.data) {
        setResult(json.data);
        toast.success(`Discovered buyer intent prompts for ${json.data.niche}!`);
      } else {
        toast.error(json.error || 'Failed to research prompts');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error discovering prompts');
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
            <Search className="w-3.5 h-3.5 text-[#C7A15A]" />
            <span className="uppercase tracking-wider">Free Micro-Tool #10</span>
          </div>

          <h1 className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#181818]'}`}>
            Buyer Intent Prompt Discovery Engine
          </h1>

          <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
            Uncover the exact conversational prompts real buyers ask ChatGPT, Perplexity, and Claude in your vertical.
          </p>
        </div>

        {/* Form & Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className={`lg:col-span-5 rounded-3xl border ${
            isDark ? 'bg-[#121315]/90 border-white/10' : 'bg-white border-[#E5E3DF]'
          } p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-md`}>
            
            <form onSubmit={handleResearch} className="space-y-5">
              <div className="space-y-2">
                <label className={`block text-xs font-mono font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                  Industry / Product Niche:
                </label>
                <input
                  type="text"
                  required
                  value={nicheInput}
                  onChange={(e) => setNicheInput(e.target.value)}
                  placeholder="e.g. Fintech, Healthcare SaaS, E-Commerce"
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
                    <span>Discovering Prompts...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Discover Buyer Intent Prompts</span>
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
                } p-6 sm:p-8 space-y-4 shadow-xl`}>
                  <span className="text-xs font-mono font-bold uppercase text-[#C7A15A]">
                    Discovered LLM Prompts for "{result.niche}":
                  </span>

                  <div className="space-y-3">
                    {result.prompts.map((p: any) => (
                      <div key={p.id} className={`p-4 rounded-2xl border ${
                        isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-[#F6F5F3] border-[#E5E3DF]'
                      } flex flex-col justify-between gap-2`}>
                        <div className="text-sm font-bold text-white">
                          "{p.prompt}"
                        </div>
                        <div className="flex items-center justify-between text-[10px] font-mono text-[#C7A15A]">
                          <span>{p.intent}</span>
                          <span>Stage: {p.stage}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className={`rounded-3xl border ${
                isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'
              } p-12 text-center space-y-3 text-white/40`}>
                <Search className="w-10 h-10 mx-auto stroke-[1.5]" />
                <p className="text-xs font-mono">Enter niche on the left to discover LLM buyer prompts.</p>
              </div>
            )}
          </div>

        </div>

      </main>

      <Footer isDark={isDark} />
    </div>
  );
}
