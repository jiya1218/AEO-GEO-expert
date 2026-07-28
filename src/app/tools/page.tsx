'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Building2, Search, ArrowRight, Sparkles, ShieldCheck, 
  Bot, FileCode, CheckCircle2, Zap, Layers 
} from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AiBackground } from '@/components/ui/ai-background';
import { ScrollProgress } from '@/components/ui/scroll-progress';

export default function ToolsHubPage() {
  const { isDark } = useTheme();

  const freeTools = [
    {
      id: 'brand-auditor',
      name: 'AI Brand & Competitor Audit Engine',
      category: 'Brand Intelligence & Competitor Analysis',
      badge: 'Active & Free',
      isActive: true,
      href: '/tools/brand-auditor',
      icon: Building2,
      description: 'Audit any domain in real time. Extract real logos, favicons, AI executive business summaries, top 4 market competitor snapshots, and AEO citation readiness scores.',
      highlights: ['Real Favicon & Logo Extraction', 'AI Executive Summary', 'Top 4 Competitor Snapshot', 'AEO Readiness Rating'],
    },
    {
      id: 'robots-inspector',
      name: 'AI Crawler & robots.txt Inspector',
      category: 'Technical AEO Compliance',
      badge: 'Coming Soon',
      isActive: false,
      href: '#',
      icon: Bot,
      description: 'Scan your robots.txt file to verify whether GPTBot, ClaudeBot, PerplexityBot, and Bytespider are allowed or blocked.',
      highlights: ['GPTBot Permission Check', 'ClaudeBot & PerplexityBot Verification', 'Instant Direct Fix Guide'],
    },
    {
      id: 'schema-builder',
      name: 'AI-First JSON-LD Schema Builder',
      category: 'Structured Data Optimization',
      badge: 'Coming Soon',
      isActive: false,
      href: '#',
      icon: FileCode,
      description: 'Build Schema.org JSON-LD markup specifically formatted for LLM fact-extraction engines.',
      highlights: ['Organization & Product Schema', 'FAQPage & HowTo Markup', '1-Click JSON Download'],
    },
    {
      id: 'perplexity-checker',
      name: 'Perplexity Citation Tracker',
      category: 'AI Search Visibility',
      badge: 'Coming Soon',
      isActive: false,
      href: '#',
      icon: Search,
      description: 'Track how often Perplexity Pro & ChatGPT-4o cite your domain vs top industry competitors.',
      highlights: ['Live Citation Query', 'Competitor Share-of-Voice', 'AI Citation Index'],
    },
  ];

  return (
    <div className={`min-h-screen flex flex-col font-sans relative transition-colors duration-500 ${
      isDark ? 'bg-[#0B0B0C] text-[#F6F6F4]' : 'bg-[#FCFCFB] text-[#181818]'
    }`}>
      <ScrollProgress />
      <AiBackground isDark={isDark} />
      <Navbar ctaText="Launch Audit" ctaHref="/tools/brand-auditor" />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        
        {/* Header Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-xs font-mono font-bold ${
            isDark ? 'bg-[#121315] border-white/10 text-[#C7A15A]' : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#B87333]'
          } shadow-sm`}>
            <Sparkles className="w-3.5 h-3.5 text-[#C7A15A] animate-pulse" />
            <span className="uppercase tracking-wider">Free AI Brand & Website Audit Tools</span>
          </div>

          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight ${
            isDark ? 'text-[#F6F6F4]' : 'text-[#181818]'
          }`}>
            Instant, Real-Data AI Micro-Tools
          </h1>

          <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
            Explore our suite of free intelligence utilities designed to analyze brand logos, executive summaries, market competitors, and LLM search readiness.
          </p>
        </div>

        {/* Free Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {freeTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                className={`rounded-3xl border ${
                  isDark
                    ? 'bg-[#121315]/90 border-white/10 hover:border-[#C7A15A]/40'
                    : 'bg-white border-[#E5E3DF] hover:border-[#B87333]/40'
                } p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-all duration-300 shadow-xl group`}
              >
                <div className="space-y-4">
                  {/* Top Badge & Category */}
                  <div className="flex items-center justify-between gap-3">
                    <span className={`text-[11px] font-mono font-bold uppercase tracking-wider ${
                      isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'
                    }`}>
                      {tool.category}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold ${
                      tool.isActive
                        ? 'bg-[#C7A15A]/20 border border-[#C7A15A]/40 text-[#C7A15A]'
                        : isDark
                        ? 'bg-white/5 border border-white/10 text-white/40'
                        : 'bg-black/5 border border-black/10 text-black/40'
                    }`}>
                      {tool.badge}
                    </span>
                  </div>

                  {/* Title & Icon */}
                  <div className="flex items-start gap-4 pt-2">
                    <div className={`p-3.5 rounded-2xl border ${
                      isDark ? 'bg-[#1B1C1F] border-white/10 text-[#C7A15A]' : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#B87333]'
                    } shrink-0 group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className={`text-xl font-extrabold ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                        {tool.name}
                      </h3>
                      <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
                        {tool.description}
                      </p>
                    </div>
                  </div>

                  {/* Highlight Pills */}
                  <div className="grid grid-cols-2 gap-2 pt-3">
                    {tool.highlights.map((item, idx) => (
                      <div key={idx} className={`flex items-center gap-1.5 text-[11px] font-medium ${
                        isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'
                      }`}>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C7A15A] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Action Button */}
                <div className="pt-4 border-t border-white/10 dark:border-white/10">
                  {tool.isActive ? (
                    <Link
                      href={tool.href}
                      className="w-full py-3 px-5 rounded-2xl luxury-btn-primary font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] transition-transform"
                    >
                      <span>Launch Brand Audit Engine</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <button
                      disabled
                      className={`w-full py-3 px-5 rounded-2xl text-xs font-bold font-mono cursor-not-allowed border ${
                        isDark ? 'bg-[#18191C] border-white/5 text-white/30' : 'bg-slate-100 border-slate-200 text-slate-400'
                      }`}
                    >
                      Tool In Development
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </main>

      <Footer isDark={isDark} />
    </div>
  );
}
