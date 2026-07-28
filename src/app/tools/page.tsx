'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Building2, Search, ArrowRight, Sparkles, ShieldCheck, 
  Bot, FileCode, CheckCircle2, Zap, Layers, FileText, Tag, HelpCircle, BarChart3, ShoppingBag 
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
      name: 'Brand & Competitor Audit Matrix',
      category: 'Brand Intelligence & Competitor Analysis',
      badge: 'Active & Free',
      isActive: true,
      href: '/tools/brand-auditor',
      icon: Building2,
      description: 'Audit any domain in real time. Extract real logos, favicons, AI executive business summaries, top 4 market competitor snapshots, and AEO citation readiness scores.',
      highlights: ['Real Favicon & Logo Extraction', 'AI Executive Summary', 'Top 4 Competitor Snapshot', 'AEO Readiness Rating'],
    },
    {
      id: 'roi-calculator',
      name: 'AI Search Revenue ROI Estimator',
      category: 'Revenue & ROI Estimation',
      badge: 'Active & Free',
      isActive: true,
      href: '/tools/roi-calculator',
      icon: Zap,
      description: 'Calculate your projected revenue lift, conversion growth, and ROI multiplier from commanding citations across ChatGPT, Perplexity, and Gemini.',
      highlights: ['Interactive Traffic Sliders', 'Annual Revenue Impact', 'Net Profit Projection', 'ROI Multiplier Score'],
    },
    {
      id: 'llms-generator',
      name: '`llms.txt` Precision Architect',
      category: 'LLM File Standards',
      badge: 'Active & Free',
      isActive: true,
      href: '/tools/llms-generator',
      icon: FileText,
      description: 'Generate the official `/llms.txt` file standard that guides ChatGPT, Perplexity, and Claude to index your site documentation.',
      highlights: ['Official llms.txt Format', 'Markdown Clean Summaries', '1-Click Code Copy', 'File Download'],
    },
    {
      id: 'robots-inspector',
      name: 'AI Crawler & Bot Access Guardian',
      category: 'Technical AEO Compliance',
      badge: 'Active & Free',
      isActive: true,
      href: '/tools/robots-inspector',
      icon: Bot,
      description: 'Scan your robots.txt file to verify whether GPTBot, ClaudeBot, PerplexityBot, and Bytespider are allowed or blocked.',
      highlights: ['GPTBot Permission Check', 'ClaudeBot & PerplexityBot Rules', 'Custom Rule Toggle', 'Instant Code Copy'],
    },
    {
      id: 'meta-optimizer',
      name: 'Conversational Meta & OpenGraph Synthesizer',
      category: 'Search Snippet Optimization',
      badge: 'Active & Free',
      isActive: true,
      href: '/tools/meta-optimizer',
      icon: Tag,
      description: 'Generate AI-optimized Title Tags, Meta Descriptions, and OpenGraph snippet code formatted for LLM fact-extraction engines.',
      highlights: ['LLM Title Tag Synthesis', 'Conversational Meta Descriptions', 'OpenGraph HTML Snippets', 'Live Search Preview'],
    },
    {
      id: 'markdown-converter',
      name: 'Clean AI Context Markdown Extractor',
      category: 'Context Window Optimization',
      badge: 'Active & Free',
      isActive: true,
      href: '/tools/markdown-converter',
      icon: FileCode,
      description: 'Strip HTML noise, CSS scripts, and DOM clutter into clean Markdown formatted for ChatGPT and Perplexity context windows.',
      highlights: ['HTML Script Stripping', 'Markdown Heading Structuring', '1-Click Copy Markdown', 'Noise Removal'],
    },
    {
      id: 'faq-generator',
      name: 'Citation-Ready FAQ & Schema Studio',
      category: 'Structured Data Optimization',
      badge: 'Active & Free',
      isActive: true,
      href: '/tools/faq-generator',
      icon: HelpCircle,
      description: 'Generate 5 conversational FAQs and embedded FAQPage JSON-LD schema code formatted for ChatGPT and Perplexity.',
      highlights: ['5 Conversational Q&As', 'JSON-LD FAQPage Schema', 'Ready-to-Paste Script', 'Fact Density Formatting'],
    },
    {
      id: 'query-fanout',
      name: 'Prompt Fan-Out & Sub-Query Simulator',
      category: 'Conversational Intent Analysis',
      badge: 'Active & Free',
      isActive: true,
      href: '/tools/query-fanout',
      icon: Layers,
      description: 'Simulate how ChatGPT & Perplexity decompose complex search prompts into sub-queries, and see required landing page content topics.',
      highlights: ['Sub-Query Decomposition', '4 Buyer Intent Angles', 'Content Coverage Guide', 'Intent Classification'],
    },
    {
      id: 'eeat-analyzer',
      name: 'E-E-A-T & Entity Trust Index',
      category: 'Authority & Trust Auditing',
      badge: 'Active & Free',
      isActive: true,
      href: '/tools/eeat-analyzer',
      icon: ShieldCheck,
      description: 'Analyze your domain across Experience, Expertise, Authority, and Trust signals required for LLM endorsement.',
      highlights: ['4 Trust Pillars Scorecard', 'Organization Schema Check', 'Wikidata & sameAs Audit', 'Trust Fix List'],
    },
    {
      id: 'prompt-research',
      name: 'Buyer Intent Prompt Discovery Engine',
      category: 'AI Prompt Intelligence',
      badge: 'Active & Free',
      isActive: true,
      href: '/tools/prompt-research',
      icon: Search,
      description: 'Uncover the exact conversational prompts real buyers ask ChatGPT, Perplexity, and Claude in your vertical.',
      highlights: ['Commercial Intent Prompts', 'Buyer Decision Funnel', 'Comparison Queries', 'Pricing Research Prompts'],
    },
    {
      id: 'citation-sov',
      name: 'Multi-Model Citation Share-of-Voice Radar',
      category: 'Competitive Citation Benchmarking',
      badge: 'Active & Free',
      isActive: true,
      href: '/tools/citation-sov',
      icon: BarChart3,
      description: 'Benchmark your brand\'s AI search citation share against 3 top competitors across LLM conversational search.',
      highlights: ['4-Brand Radar Benchmark', 'Percentage Citation Share', 'Competitor Comparison', 'Growth Recommendation'],
    },
    {
      id: 'commerce-checker',
      name: 'Agentic Commerce Protocol Inspector',
      category: 'AI Shopping & Agentic Checkout',
      badge: 'Active & Free',
      isActive: true,
      href: '/tools/commerce-checker',
      icon: ShoppingBag,
      description: 'Audit your online store for ChatGPT Shopping & Google AI Agent Checkout readiness (Product Schemas, ACP, UCP).',
      highlights: ['Product JSON-LD Audit', 'OpenGraph Price Metadata', 'ChatGPT Shopping Indexing', 'UCP Protocol Readiness'],
    },
  ];

  return (
    <div className={`min-h-screen flex flex-col font-sans relative transition-colors duration-500 ${
      isDark ? 'bg-[#0B0B0C] text-[#F6F6F4]' : 'bg-[#FCFCFB] text-[#181818]'
    }`}>
      <ScrollProgress />
      <AiBackground isDark={isDark} />
      <Navbar ctaText="Full AI Audit" ctaHref="/dashboard" />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        
        {/* Header Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-xs font-mono font-bold ${
            isDark ? 'bg-[#121315] border-white/10 text-[#C7A15A]' : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#B87333]'
          } shadow-sm`}>
            <Sparkles className="w-3.5 h-3.5 text-[#C7A15A] animate-pulse" />
            <span className="uppercase tracking-wider">Free AI Search & Brand Optimization Suite (12 Micro-Tools)</span>
          </div>

          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight ${
            isDark ? 'text-[#F6F6F4]' : 'text-[#181818]'
          }`}>
            Instant, Real-Data AI Micro-Tools
          </h1>

          <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
            Explore our suite of 12 free intelligence utilities designed to analyze brand logos, executive summaries, market competitors, LLM search readiness, and ROI.
          </p>
        </div>

        {/* Free Tools Grid (All 12 Active) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {freeTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                className={`rounded-3xl border ${
                  isDark
                    ? 'bg-[#121315]/90 border-white/10 hover:border-[#C7A15A]/50'
                    : 'bg-white border-[#E5E3DF] hover:border-[#B87333]/50'
                } p-6 flex flex-col justify-between space-y-6 transition-all duration-300 shadow-xl group`}
              >
                <div className="space-y-4">
                  {/* Top Badge & Category */}
                  <div className="flex items-center justify-between gap-3">
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                      isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'
                    }`}>
                      {tool.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#C7A15A]/20 border border-[#C7A15A]/40 text-[#C7A15A]">
                      {tool.badge}
                    </span>
                  </div>

                  {/* Title & Icon */}
                  <div className="flex items-start gap-3.5 pt-1">
                    <div className={`p-3 rounded-2xl border ${
                      isDark ? 'bg-[#1B1C1F] border-white/10 text-[#C7A15A]' : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#B87333]'
                    } shrink-0 group-hover:scale-105 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className={`text-lg font-extrabold ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                        {tool.name}
                      </h3>
                    </div>
                  </div>

                  <p className={`text-xs leading-relaxed ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
                    {tool.description}
                  </p>

                  {/* Highlight Pills */}
                  <div className="grid grid-cols-2 gap-1.5 pt-2">
                    {tool.highlights.map((item, idx) => (
                      <div key={idx} className={`flex items-center gap-1.5 text-[10px] font-medium ${
                        isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'
                      }`}>
                        <CheckCircle2 className="w-3 h-3 text-[#C7A15A] shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Action Button */}
                <div className="pt-4 border-t border-white/10 dark:border-white/10">
                  <Link
                    href={tool.href}
                    className="w-full py-3 px-4 rounded-2xl luxury-btn-primary font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] transition-transform"
                  >
                    <span>Launch Free Tool</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
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
