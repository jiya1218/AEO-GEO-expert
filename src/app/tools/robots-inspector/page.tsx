'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Bot, Globe, Loader2, Copy, Download, Check, ShieldCheck, ShieldAlert, Sparkles 
} from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AiBackground } from '@/components/ui/ai-background';
import { ScrollProgress } from '@/components/ui/scroll-progress';

export default function RobotsInspectorPage() {
  const { isDark } = useTheme();
  const [domainInput, setDomainInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const [botPermissions, setBotPermissions] = useState<Record<string, boolean>>({
    GPTBot: true,
    'ChatGPT-User': true,
    ClaudeBot: true,
    PerplexityBot: true,
    Bytespider: true,
    'Google-Extended': true,
  });

  const [generatedRobotsTxt, setGeneratedRobotsTxt] = useState('');

  const handleInspectAndGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!domainInput.trim()) {
      toast.error('Please enter a website domain (e.g. stripe.com)');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/tools/robots-txt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domainInput,
          botPermissions,
        }),
      });

      const json = await res.json();
      if (res.ok && json.data) {
        setGeneratedRobotsTxt(json.data.generatedRobotsTxt);
        toast.success(`Generated optimized robots.txt for ${json.data.domain}!`);
      } else {
        toast.error(json.error || 'Failed to inspect robots.txt');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error generating robots.txt');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleBot = (botName: string) => {
    setBotPermissions((prev) => {
      const next = { ...prev, [botName]: !prev[botName] };
      return next;
    });
  };

  const handleCopy = () => {
    if (!generatedRobotsTxt) return;
    navigator.clipboard.writeText(generatedRobotsTxt);
    setCopied(true);
    toast.success('robots.txt snippet copied!');
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
            <Bot className="w-3.5 h-3.5 text-[#C7A15A]" />
            <span className="uppercase tracking-wider">Free Micro-Tool #04</span>
          </div>

          <h1 className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#181818]'}`}>
            AI Crawler & Bot Access Guardian
          </h1>

          <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
            Check and configure which AI bots (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) can index your site content.
          </p>
        </div>

        {/* Input & Bot Toggles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className={`lg:col-span-5 rounded-3xl border ${
            isDark ? 'bg-[#121315]/90 border-white/10' : 'bg-white border-[#E5E3DF]'
          } p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-md`}>
            
            <form onSubmit={handleInspectAndGenerate} className="space-y-6">
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

              {/* Bot Permission Checkboxes */}
              <div className="space-y-3 pt-2">
                <label className={`block text-xs font-mono font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                  Configure AI Web Crawlers Access:
                </label>
                
                <div className="space-y-2">
                  {Object.keys(botPermissions).map((botName) => {
                    const allowed = botPermissions[botName];
                    return (
                      <div
                        key={botName}
                        onClick={() => handleToggleBot(botName)}
                        className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                          allowed
                            ? isDark
                              ? 'bg-[#C7A15A]/10 border-[#C7A15A]/40 text-white'
                              : 'bg-emerald-50 border-emerald-300 text-slate-900'
                            : isDark
                            ? 'bg-[#1B1C1F] border-white/10 text-[#B7B7B5]'
                            : 'bg-rose-50 border-rose-200 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          {allowed ? (
                            <ShieldCheck className="w-4 h-4 text-[#C7A15A] shrink-0" />
                          ) : (
                            <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                          )}
                          <span className="text-xs font-mono font-bold">{botName}</span>
                        </div>

                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                          allowed ? 'bg-[#C7A15A]/20 text-[#C7A15A]' : 'bg-rose-500/20 text-rose-400'
                        }`}>
                          {allowed ? 'ALLOWED' : 'BLOCKED'}
                        </span>
                      </div>
                    );
                  })}
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
                    <span>Generating robots.txt...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate AI `robots.txt` Code</span>
                  </>
                )}
              </button>
            </form>

          </div>

          {/* Generated Code Output Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className={`rounded-3xl border ${
              isDark ? 'bg-[#0E0F12] border-white/10' : 'bg-[#18191C] border-slate-800'
            } p-6 sm:p-8 space-y-4 shadow-2xl text-white`}>
              
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <span className="text-xs font-mono font-bold uppercase text-[#C7A15A]">
                  `robots.txt` Output Code:
                </span>

                {generatedRobotsTxt && (
                  <button
                    onClick={handleCopy}
                    className="px-3.5 py-1.5 rounded-xl luxury-btn-primary text-xs font-bold flex items-center gap-1.5 shadow-xs"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied Code!' : 'Copy Code'}</span>
                  </button>
                )}
              </div>

              <div className="font-mono text-xs leading-relaxed overflow-x-auto min-h-[350px] p-4 rounded-2xl bg-[#070708] border border-white/10 text-emerald-400">
                {generatedRobotsTxt ? (
                  <pre className="whitespace-pre-wrap">{generatedRobotsTxt}</pre>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center py-20 text-center text-white/40 space-y-2">
                    <Bot className="w-10 h-10 stroke-[1.5]" />
                    <p>Enter domain and configure bot rules to generate your `robots.txt` snippet.</p>
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
