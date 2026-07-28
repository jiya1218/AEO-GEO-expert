'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  HelpCircle, Loader2, Copy, Check, Sparkles, Code2 
} from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AiBackground } from '@/components/ui/ai-background';
import { ScrollProgress } from '@/components/ui/scroll-progress';

export default function FaqGeneratorPage() {
  const { isDark } = useTheme();
  const [brandOrTopic, setBrandOrTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!brandOrTopic.trim()) {
      toast.error('Please enter a brand name or product topic');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/tools/faq-schema', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brandOrTopic }),
      });

      const json = await res.json();
      if (res.ok && json.data) {
        setResult(json.data);
        toast.success('Generated 5 citation-ready FAQs and JSON-LD FAQPage Schema!');
      } else {
        toast.error(json.error || 'Failed to generate FAQs');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error generating FAQ schema');
    } finally {
      setLoading(false);
    }
  };

  const handleCopySchema = () => {
    if (!result?.schemaSnippet) return;
    navigator.clipboard.writeText(result.schemaSnippet);
    setCopied(true);
    toast.success('JSON-LD FAQPage Schema copied!');
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
            <HelpCircle className="w-3.5 h-3.5 text-[#C7A15A]" />
            <span className="uppercase tracking-wider">Free Micro-Tool #07</span>
          </div>

          <h1 className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#181818]'}`}>
            Citation-Ready FAQ & Schema Studio
          </h1>

          <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
            Generate 5 conversational FAQs and embedded FAQPage JSON-LD schema code formatted for ChatGPT and Perplexity.
          </p>
        </div>

        {/* Input Form & Code Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className={`lg:col-span-5 rounded-3xl border ${
            isDark ? 'bg-[#121315]/90 border-white/10' : 'bg-white border-[#E5E3DF]'
          } p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-md`}>
            
            <form onSubmit={handleGenerate} className="space-y-5">
              <div className="space-y-2">
                <label className={`block text-xs font-mono font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                  Brand Name or Product Topic:
                </label>
                <input
                  type="text"
                  required
                  value={brandOrTopic}
                  onChange={(e) => setBrandOrTopic(e.target.value)}
                  placeholder="e.g. TangentCore or Enterprise CRM"
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
                    <span>Building FAQ Schema...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate FAQ & Schema</span>
                  </>
                )}
              </button>
            </form>

          </div>

          {/* Results Output Column */}
          <div className="lg:col-span-7 space-y-6">
            {result ? (
              <div className="space-y-6 animate-in fade-in duration-300">
                
                {/* FAQ Questions List */}
                <div className={`rounded-3xl border ${
                  isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'
                } p-6 sm:p-8 space-y-4 shadow-xl`}>
                  <span className="text-xs font-mono font-bold uppercase text-[#C7A15A]">
                    Generated FAQs for {result.topic}:
                  </span>

                  <div className="space-y-3">
                    {result.faqs.map((faq: any, idx: number) => (
                      <div key={idx} className={`p-4 rounded-2xl border ${
                        isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-[#F6F5F3] border-[#E5E3DF]'
                      } space-y-1`}>
                        <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                          Q: {faq.question}
                        </h4>
                        <p className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'} leading-relaxed`}>
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Schema Code Snippet */}
                <div className={`rounded-3xl border ${
                  isDark ? 'bg-[#0E0F12] border-white/10' : 'bg-[#18191C] border-slate-800'
                } p-6 sm:p-8 space-y-4 shadow-2xl text-white`}>
                  <div className="flex items-center justify-between border-b border-white/15 pb-4">
                    <span className="text-xs font-mono font-bold uppercase text-[#C7A15A]">
                      JSON-LD FAQPage Schema Code:
                    </span>
                    <button
                      onClick={handleCopySchema}
                      className="px-3.5 py-1.5 rounded-xl luxury-btn-primary text-xs font-bold flex items-center gap-1.5 shadow-xs"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied Schema!' : 'Copy Schema'}</span>
                    </button>
                  </div>

                  <div className="font-mono text-xs leading-relaxed overflow-x-auto p-4 rounded-2xl bg-[#070708] border border-white/10 text-emerald-400">
                    <pre className="whitespace-pre-wrap">{result.schemaSnippet}</pre>
                  </div>
                </div>

              </div>
            ) : (
              <div className={`rounded-3xl border ${
                isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'
              } p-12 text-center space-y-3 text-white/40`}>
                <Code2 className="w-10 h-10 mx-auto stroke-[1.5]" />
                <p className="text-xs font-mono">Enter topic on the left to generate 5 FAQs and FAQPage JSON-LD schema.</p>
              </div>
            )}
          </div>

        </div>

      </main>

      <Footer isDark={isDark} />
    </div>
  );
}
