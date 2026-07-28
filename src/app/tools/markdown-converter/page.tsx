'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FileCode, Loader2, Copy, Check, Sparkles, Code2, ArrowRight 
} from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AiBackground } from '@/components/ui/ai-background';
import { ScrollProgress } from '@/components/ui/scroll-progress';

export default function MarkdownConverterPage() {
  const { isDark } = useTheme();
  const [htmlInput, setHtmlInput] = useState('');
  const [markdownOutput, setMarkdownOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleConvert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!htmlInput.trim()) {
      toast.error('Please paste HTML code or text content');
      return;
    }

    // Convert HTML to Markdown format
    let clean = htmlInput
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n')
      .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n')
      .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n')
      .replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n')
      .replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n')
      .replace(/<a[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi, '[$2]($1)')
      .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
      .replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
      .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
      .replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*')
      .replace(/<[^>]+>/g, '')
      .replace(/\n\s*\n\s*\n/g, '\n\n')
      .trim();

    setMarkdownOutput(clean);
    toast.success('Cleaned HTML into AI-ready Markdown text!');
  };

  const handleCopy = () => {
    if (!markdownOutput) return;
    navigator.clipboard.writeText(markdownOutput);
    setCopied(true);
    toast.success('Markdown text copied to clipboard!');
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
            <FileCode className="w-3.5 h-3.5 text-[#C7A15A]" />
            <span className="uppercase tracking-wider">Free Micro-Tool #06</span>
          </div>

          <h1 className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#181818]'}`}>
            Clean AI Context Markdown Extractor
          </h1>

          <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
            Strip HTML noise, CSS scripts, and DOM clutter into clean Markdown formatted for ChatGPT and Perplexity context windows.
          </p>
        </div>

        {/* Input & Output Split Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* HTML Input Column */}
          <div className={`lg:col-span-6 rounded-3xl border ${
            isDark ? 'bg-[#121315]/90 border-white/10' : 'bg-white border-[#E5E3DF]'
          } p-6 sm:p-8 space-y-4 shadow-2xl backdrop-blur-md`}>
            
            <form onSubmit={handleConvert} className="space-y-4">
              <div className="flex items-center justify-between">
                <label className={`text-xs font-mono font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                  Paste Raw HTML Code or Text:
                </label>
                <button
                  type="button"
                  onClick={() => setHtmlInput('<h1>Enterprise SaaS Platform</h1><p>We build <strong>automated GEO intelligence tools</strong> for modern brands.</p><ul><li>6-LLM Scanners</li><li>Real-Time Citation Audits</li></ul>')}
                  className={`text-[11px] font-mono text-[#C7A15A] hover:underline`}
                >
                  Load Sample HTML
                </button>
              </div>

              <textarea
                rows={12}
                required
                value={htmlInput}
                onChange={(e) => setHtmlInput(e.target.value)}
                placeholder="Paste HTML <div><h1>Header</h1><p>Content...</p></div> here..."
                className={`w-full font-mono text-xs ${
                  isDark
                    ? 'bg-[#1B1C1F] border-white/10 text-white placeholder-[#B7B7B5]/60 focus:border-[#C7A15A]'
                    : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#181818] placeholder-[#5C5C5C]/60 focus:border-[#B87333]'
                } border rounded-2xl p-4 focus:outline-none transition-all`}
              />

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl luxury-btn-primary font-bold text-xs flex items-center justify-center gap-2 shadow-xl hover:scale-[1.02] transition-transform"
              >
                <Sparkles className="w-4 h-4" />
                <span>Extract Clean AI Markdown</span>
              </button>
            </form>

          </div>

          {/* Markdown Output Column */}
          <div className="lg:col-span-6 space-y-4">
            <div className={`rounded-3xl border ${
              isDark ? 'bg-[#0E0F12] border-white/10' : 'bg-[#18191C] border-slate-800'
            } p-6 sm:p-8 space-y-4 shadow-2xl text-white`}>
              
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <span className="text-xs font-mono font-bold uppercase text-[#C7A15A]">
                  Clean Markdown Text:
                </span>
                {markdownOutput && (
                  <button
                    onClick={handleCopy}
                    className="px-3.5 py-1.5 rounded-xl luxury-btn-primary text-xs font-bold flex items-center gap-1.5 shadow-xs"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied Markdown!' : 'Copy Markdown'}</span>
                  </button>
                )}
              </div>

              <div className="font-mono text-xs leading-relaxed overflow-x-auto min-h-[320px] p-4 rounded-2xl bg-[#070708] border border-white/10 text-emerald-400">
                {markdownOutput ? (
                  <pre className="whitespace-pre-wrap">{markdownOutput}</pre>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center py-20 text-center text-white/40 space-y-2">
                    <Code2 className="w-10 h-10 stroke-[1.5]" />
                    <p>Paste HTML on the left and click Extract to view clean Markdown output.</p>
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
