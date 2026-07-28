'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Tag, Globe, Loader2, Copy, Check, Sparkles, Code2 
} from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AiBackground } from '@/components/ui/ai-background';
import { ScrollProgress } from '@/components/ui/scroll-progress';

export default function MetaOptimizerPage() {
  const { isDark } = useTheme();
  const [domainOrTopic, setDomainOrTopic] = useState('');
  const [targetKeyword, setTargetKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSynthesize = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!domainOrTopic.trim()) {
      toast.error('Please enter a domain or topic description');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/tools/meta-opt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domainOrTopic, targetKeyword }),
      });

      const json = await res.json();
      if (res.ok && json.data) {
        setResult(json.data);
        toast.success('Generated AI-optimized Title, Meta, and OpenGraph tags!');
      } else {
        toast.error(json.error || 'Failed to synthesize meta tags');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error generating meta tags');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyOg = () => {
    if (!result?.openGraphTags) return;
    navigator.clipboard.writeText(result.openGraphTags);
    setCopied(true);
    toast.success('OpenGraph meta tags copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
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
            <Tag className="w-3.5 h-3.5 text-[#C7A15A]" />
            <span className="uppercase tracking-wider">Free Micro-Tool #05</span>
          </div>

          <h1 className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#181818]'}`}>
            Conversational Meta & OpenGraph Synthesizer
          </h1>

          <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
            Generate AI-optimized Title Tags, Meta Descriptions, and OpenGraph snippet code designed for LLM fact-extraction engines.
          </p>
        </div>

        {/* Input & Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className={`lg:col-span-5 rounded-3xl border ${
            isDark ? 'bg-[#121315]/90 border-white/10' : 'bg-white border-[#E5E3DF]'
          } p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-md`}>
            
            <form onSubmit={handleSynthesize} className="space-y-5">
              <div className="space-y-2">
                <label className={`block text-xs font-mono font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                  Domain or Product Niche:
                </label>
                <input
                  type="text"
                  required
                  value={domainOrTopic}
                  onChange={(e) => setDomainOrTopic(e.target.value)}
                  placeholder="e.g. acme.com or AI Invoice Software"
                  className={`w-full ${
                    isDark
                      ? 'bg-[#1B1C1F] border-white/10 text-white placeholder-[#B7B7B5]/60 focus:border-[#C7A15A]'
                      : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#181818] placeholder-[#5C5C5C]/60 focus:border-[#B87333]'
                  } border rounded-2xl px-4 py-3 text-sm focus:outline-none transition-all`}
                />
              </div>

              <div className="space-y-2">
                <label className={`block text-xs font-mono font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                  Primary Target Keyword:
                </label>
                <input
                  type="text"
                  value={targetKeyword}
                  onChange={(e) => setTargetKeyword(e.target.value)}
                  placeholder="e.g. Automated GEO Search Optimization"
                  className={`w-full ${
                    isDark
                      ? 'bg-[#1B1C1F] border-white/10 text-white placeholder-[#B7B7B5]/60 focus:border-[#C7A15A]'
                      : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#181818] placeholder-[#5C5C5C]/60 focus:border-[#B87333]'
                  } border rounded-2xl px-4 py-3 text-sm focus:outline-none transition-all`}
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
                    <span>Synthesizing Meta Tags...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Synthesize AI Meta & OG Tags</span>
                  </>
                )}
              </button>
            </form>

          </div>

          {/* Results Output Column */}
          <div className="lg:col-span-7 space-y-6">
            {result ? (
              <div className="space-y-6 animate-in fade-in duration-300">
                {/* Title & Description Preview Card */}
                <div className={`rounded-3xl border ${
                  isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'
                } p-6 sm:p-8 space-y-4 shadow-xl`}>
                  <span className="text-xs font-mono font-bold uppercase text-[#C7A15A]">
                    Live Search Result Preview:
                  </span>
                  
                  <div className="p-4 rounded-2xl bg-[#070708] border border-white/10 space-y-1">
                    <div className="text-xs text-[#C7A15A] font-mono">https://{domainOrTopic.replace(/^https?:\/\//, '')}</div>
                    <div className="text-base font-extrabold text-blue-400 hover:underline cursor-pointer">
                      {result.titleTag}
                    </div>
                    <div className="text-xs text-slate-300 leading-relaxed pt-1">
                      {result.metaDescription}
                    </div>
                  </div>
                </div>

                {/* OpenGraph Code Snippet Card */}
                <div className={`rounded-3xl border ${
                  isDark ? 'bg-[#0E0F12] border-white/10' : 'bg-[#18191C] border-slate-800'
                } p-6 sm:p-8 space-y-4 shadow-2xl text-white`}>
                  <div className="flex items-center justify-between border-b border-white/15 pb-4">
                    <span className="text-xs font-mono font-bold uppercase text-[#C7A15A]">
                      HTML OpenGraph & Meta Snippet:
                    </span>
                    <button
                      onClick={handleCopyOg}
                      className="px-3.5 py-1.5 rounded-xl luxury-btn-primary text-xs font-bold flex items-center gap-1.5 shadow-xs"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied Meta Code!' : 'Copy HTML Code'}</span>
                    </button>
                  </div>

                  <div className="font-mono text-xs leading-relaxed overflow-x-auto p-4 rounded-2xl bg-[#070708] border border-white/10 text-emerald-400">
                    <pre className="whitespace-pre-wrap">{result.openGraphTags}</pre>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`rounded-3xl border ${
                isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'
              } p-12 text-center space-y-3 text-white/40`}>
                <Code2 className="w-10 h-10 mx-auto stroke-[1.5]" />
                <p className="text-xs font-mono">Fill in domain & keyword on the left to generate conversational meta tags.</p>
              </div>
            )}
          </div>

        </div>

      </main>

      <Footer isDark={isDark} />
    </div>
  );
}
