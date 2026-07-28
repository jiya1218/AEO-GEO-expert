'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FileText, Globe, Loader2, Copy, Download, Check, Sparkles, ArrowRight 
} from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AiBackground } from '@/components/ui/ai-background';
import { ScrollProgress } from '@/components/ui/scroll-progress';

export default function LlmsGeneratorPage() {
  const { isDark } = useTheme();
  const [domainInput, setDomainInput] = useState('');
  const [siteTitle, setSiteTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [llmsTxtContent, setLlmsTxtContent] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!domainInput.trim()) {
      toast.error('Please enter a website domain (e.g. stripe.com)');
      return;
    }

    setLoading(true);
    setLlmsTxtContent('');

    try {
      const res = await fetch('/api/tools/llms-txt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domainInput,
          siteTitleInput: siteTitle,
          summaryInput: summary,
        }),
      });

      const json = await res.json();
      if (res.ok && json.data) {
        setLlmsTxtContent(json.data.llmsTxtContent);
        toast.success('Generated valid llms.txt standard file!');
      } else {
        toast.error(json.error || 'Failed to generate llms.txt');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error generating llms.txt');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!llmsTxtContent) return;
    navigator.clipboard.writeText(llmsTxtContent);
    setCopied(true);
    toast.success('llms.txt code copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!llmsTxtContent) return;
    const blob = new Blob([llmsTxtContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'llms.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Downloaded llms.txt file!');
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
            <FileText className="w-3.5 h-3.5 text-[#C7A15A]" />
            <span className="uppercase tracking-wider">Free Micro-Tool #03</span>
          </div>

          <h1 className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#181818]'}`}>
            `llms.txt` Precision Architect
          </h1>

          <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
            Generate the official `/llms.txt` file standard that guides ChatGPT, Perplexity, and Claude to index and cite your core site documentation.
          </p>
        </div>

        {/* Input Form & Code Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Column */}
          <div className={`lg:col-span-5 rounded-3xl border ${
            isDark ? 'bg-[#121315]/90 border-white/10' : 'bg-white border-[#E5E3DF]'
          } p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-md`}>
            
            <form onSubmit={handleGenerate} className="space-y-5">
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

              <div className="space-y-2">
                <label className={`block text-xs font-mono font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                  Brand / Site Title (Optional):
                </label>
                <input
                  type="text"
                  value={siteTitle}
                  onChange={(e) => setSiteTitle(e.target.value)}
                  placeholder="e.g. Acme Inc — AI Workflow Platform"
                  className={`w-full ${
                    isDark
                      ? 'bg-[#1B1C1F] border-white/10 text-white placeholder-[#B7B7B5]/60 focus:border-[#C7A15A]'
                      : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#181818] placeholder-[#5C5C5C]/60 focus:border-[#B87333]'
                  } border rounded-2xl px-4 py-3 text-sm focus:outline-none transition-all`}
                />
              </div>

              <div className="space-y-2">
                <label className={`block text-xs font-mono font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                  Executive Summary (Optional):
                </label>
                <textarea
                  rows={3}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Briefly describe what your platform does..."
                  className={`w-full ${
                    isDark
                      ? 'bg-[#1B1C1F] border-white/10 text-white placeholder-[#B7B7B5]/60 focus:border-[#C7A15A]'
                      : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#181818] placeholder-[#5C5C5C]/60 focus:border-[#B87333]'
                  } border rounded-2xl p-4 text-sm focus:outline-none transition-all`}
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
                    <span>Building llms.txt...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate `llms.txt` Standard</span>
                  </>
                )}
              </button>
            </form>

          </div>

          {/* Generated Code Display Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className={`rounded-3xl border ${
              isDark ? 'bg-[#0E0F12] border-white/10' : 'bg-[#18191C] border-slate-800'
            } p-6 sm:p-8 space-y-4 shadow-2xl text-white`}>
              
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <span className="text-xs font-mono font-bold uppercase text-[#C7A15A]">
                  `llms.txt` Output Code:
                </span>

                {llmsTxtContent && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopy}
                      className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                    <button
                      onClick={handleDownload}
                      className="px-3 py-1.5 rounded-xl luxury-btn-primary text-xs font-bold flex items-center gap-1.5 shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Code Textarea / Pre */}
              <div className="font-mono text-xs leading-relaxed overflow-x-auto min-h-[300px] p-4 rounded-2xl bg-[#070708] border border-white/10 text-emerald-400">
                {llmsTxtContent ? (
                  <pre className="whitespace-pre-wrap">{llmsTxtContent}</pre>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center py-16 text-center text-white/40 space-y-2">
                    <FileText className="w-10 h-10 stroke-[1.5]" />
                    <p>Enter domain on the left and click Generate to build your `llms.txt` file.</p>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>

      </main>

      <Footer isDark={isDark} />
    </div>
  );
}
