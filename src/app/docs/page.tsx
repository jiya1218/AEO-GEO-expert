'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, Search, ArrowRight, ShieldCheck, CheckCircle2, Terminal, HelpCircle, UserCheck, Bell, ChevronRight 
} from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AiBackground } from '@/components/ui/ai-background';
import { ScrollProgress } from '@/components/ui/scroll-progress';

export default function DocsPage() {
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const quickSteps = [
    'Create your TangentCore workspace.',
    'Verify your website or domain.',
    'Connect your analytics and search platforms.',
    'Run your first AI Visibility Audit.',
    'Review your dashboard and optimisation recommendations.',
  ];

  const roles = [
    { title: 'Owner', desc: 'Full platform access including billing, integrations, user management, and workspace settings.' },
    { title: 'Administrator', desc: 'Manage projects, reports, dashboards, integrations, and users.' },
    { title: 'Analyst', desc: 'Access dashboards, reports, recommendations, and competitor insights.' },
    { title: 'Viewer', desc: 'Read-only access to dashboards and reports.' },
  ];

  const faqs = [
    {
      q: 'What AI platforms does TangentCore support?',
      a: 'ChatGPT, Google AI, Gemini, Claude, Perplexity, DeepSeek, and additional AI search platforms as they become available.',
    },
    {
      q: 'How often is AI visibility updated?',
      a: 'Visibility metrics are refreshed automatically based on your selected monitoring schedule and available platform data.',
    },
    {
      q: 'Can I export reports?',
      a: 'Yes. Reports can be exported in multiple formats for internal reporting and executive presentations.',
    },
    {
      q: 'Can multiple team members access the same workspace?',
      a: 'Yes. Enterprise workspaces support multiple users with role-based permissions.',
    },
    {
      q: 'Does TangentCore provide optimisation recommendations?',
      a: 'Yes. Every workspace receives AI-powered GEO and AEO recommendations to improve discoverability across supported AI search platforms.',
    },
  ];

  return (
    <div className={`min-h-screen flex flex-col font-sans relative transition-colors duration-500 ${
      isDark ? 'bg-[#0B0B0C] text-[#F6F6F4]' : 'bg-[#FCFCFB] text-[#181818]'
    }`}>
      <ScrollProgress />
      <AiBackground isDark={isDark} />
      <Navbar ctaText="View API Reference" ctaHref="/api-reference" />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-xs font-mono font-bold ${
            isDark ? 'bg-[#121315] border-white/10 text-[#C7A15A]' : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#B87333]'
          } shadow-sm`}>
            <BookOpen className="w-3.5 h-3.5 text-[#C7A15A]" />
            <span className="uppercase tracking-wider">DOCUMENTATION v1.0</span>
          </div>

          <h1 className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#181818]'}`}>
            Everything You Need to Use TangentCore
          </h1>

          <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
            Welcome to the TangentCore Documentation. Whether you're getting started with AI Visibility Monitoring, configuring your workspace, integrating with existing tools, or exploring our API, this documentation provides everything you need to successfully use the platform.
          </p>

          {/* Search Box */}
          <div className="max-w-xl mx-auto pt-4 relative">
            <Search className={`absolute left-4 top-4 h-4 w-4 ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documentation, guides, or API endpoints..."
              className={`w-full ${
                isDark
                  ? 'bg-[#121315] border-white/10 text-white placeholder-[#B7B7B5]/60 focus:border-[#C7A15A]'
                  : 'bg-white border-[#E5E3DF] text-[#181818] placeholder-[#5C5C5C]/60 focus:border-[#B87333]'
              } border rounded-2xl pl-11 pr-4 py-3.5 text-sm focus:outline-none transition-all shadow-md`}
            />
          </div>
        </div>

        {/* Quick Start Guide */}
        <div className={`p-8 sm:p-10 rounded-3xl border ${isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'} space-y-6 shadow-xl`}>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#C7A15A] uppercase">
            <Terminal className="w-4 h-4" />
            <span>Quick Start</span>
          </div>
          <h2 className="text-2xl font-bold">Get Up and Running in Minutes</h2>
          <p className={`text-sm ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
            Follow these steps to begin monitoring your AI visibility across major Large Language Models.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-2">
            {quickSteps.map((step, idx) => (
              <div key={idx} className={`p-4 rounded-2xl border ${isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-[#F6F5F3] border-[#E5E3DF]'} space-y-2`}>
                <span className="w-7 h-7 rounded-xl bg-[#C7A15A]/20 text-[#C7A15A] font-mono font-bold text-xs flex items-center justify-center">
                  0{idx + 1}
                </span>
                <p className={`text-xs ${isDark ? 'text-white' : 'text-[#181818]'} font-medium`}>
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Core Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`p-6 rounded-3xl border ${isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'} space-y-3`}>
            <h3 className="text-lg font-bold text-[#C7A15A]">Dashboard Modules</h3>
            <ul className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'} space-y-2`}>
              <li>• AI Visibility Score</li>
              <li>• Citation Overview</li>
              <li>• Brand Mentions</li>
              <li>• Competitor Comparison</li>
              <li>• GEO Recommendations</li>
              <li>• AI Platform Breakdown</li>
            </ul>
          </div>

          <div className={`p-6 rounded-3xl border ${isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'} space-y-3`}>
            <h3 className="text-lg font-bold text-[#C7A15A]">AI Citation Monitoring</h3>
            <ul className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'} space-y-2`}>
              <li>• Citation history & timeline</li>
              <li>• Citation sources analysis</li>
              <li>• Platform distribution breakdown</li>
              <li>• Content contributing to citations</li>
              <li>• Citation growth trend metrics</li>
            </ul>
          </div>

          <div className={`p-6 rounded-3xl border ${isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'} space-y-3`}>
            <h3 className="text-lg font-bold text-[#C7A15A]">Brand Audit Matrix</h3>
            <ul className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'} space-y-2`}>
              <li>• Entity health score</li>
              <li>• Authority score metrics</li>
              <li>• Brand consistency review</li>
              <li>• Semantic relevance audit</li>
              <li>• Technical optimization audit</li>
            </ul>
          </div>
        </div>

        {/* Roles & Permissions */}
        <div className={`p-8 rounded-3xl border ${isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'} space-y-6 shadow-xl`}>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#C7A15A] uppercase">
            <UserCheck className="w-4 h-4" />
            <span>User Roles & Permissions</span>
          </div>
          <h2 className="text-2xl font-bold">Manage Team Access</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {roles.map((r) => (
              <div key={r.title} className={`p-4 rounded-2xl border ${isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-[#F6F5F3] border-[#E5E3DF]'} space-y-1.5`}>
                <span className="text-sm font-bold text-[#C7A15A] block">{r.title}</span>
                <p className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Frequently Asked Questions</h2>
          <div className="space-y-3 max-w-3xl mx-auto">
            {faqs.map((faq, idx) => (
              <div key={idx} className={`p-5 rounded-2xl border ${isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'} space-y-2`}>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#C7A15A] shrink-0" />
                  <span>{faq.q}</span>
                </h4>
                <p className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'} pl-6 leading-relaxed`}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Support Footer Card */}
        <div className={`rounded-3xl p-8 text-center space-y-4 shadow-2xl border ${
          isDark 
            ? 'luxury-gradient-card border-[#C7A15A]/40' 
            : 'bg-white border-[#E5E3DF]'
        }`}>
          <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#181818]'}`}>Need More Help?</h3>
          <p className={`text-xs max-w-md mx-auto ${isDark ? 'text-[#E5E3DF]/80' : 'text-[#5C5C5C]'}`}>
            Our support team is available to help with onboarding, integrations, API implementation, and enterprise deployment.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link href="/contact" className="px-6 py-3 rounded-xl luxury-btn-primary font-bold text-xs shadow-lg">
              Contact Support
            </Link>
            <Link href="/api-reference" className={`px-6 py-3 rounded-xl border font-bold text-xs transition-colors ${
              isDark ? 'border-white/20 text-white hover:border-[#C7A15A]' : 'border-[#E5E3DF] text-[#181818] hover:border-[#B87333]'
            }`}>
              View API Reference
            </Link>
          </div>
        </div>

      </main>

      <Footer isDark={isDark} />
    </div>
  );
}
