'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, CheckCircle2, Clock, Calendar, ArrowRight, ShieldCheck, Tag, Bug, Zap, Layers 
} from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AiBackground } from '@/components/ui/ai-background';
import { ScrollProgress } from '@/components/ui/scroll-progress';

export default function ChangelogPage() {
  const { isDark } = useTheme();

  const releases = [
    {
      version: 'v1.6.0',
      date: 'July 24, 2026',
      badge: 'Latest Major Release',
      features: [
        'Added support for DeepSeek AI visibility monitoring.',
        'Introduced the Brand Audit Matrix with enhanced entity analysis.',
        'Added platform-specific AI Visibility Scores.',
        'Improved competitor benchmarking across supported AI platforms.',
      ],
      improvements: [
        'Faster dashboard loading times.',
        'Enhanced citation tracking accuracy.',
        'Improved report generation performance.',
        'Updated executive dashboard visualisations.',
      ],
      fixes: [
        'Fixed duplicate citation reporting in specific edge cases.',
        'Improved workspace switching stability.',
        'Resolved minor UI inconsistencies in analytics reports.',
      ],
    },
    {
      version: 'v1.5.0',
      date: 'July 10, 2026',
      features: [
        'Introduced AI ROI Estimator.',
        'Added automated weekly AI Visibility reports.',
        'Released custom dashboard widgets.',
        'Added downloadable executive summaries.',
      ],
      improvements: ['Optimised AI recommendation engine.', 'Improved historical trend calculations.', 'Enhanced search performance across workspaces.'],
      fixes: ['Fixed report export timeout issues.', 'Improved notification delivery reliability.'],
    },
    {
      version: 'v1.4.0',
      date: 'June 18, 2026',
      features: [
        'Added AI Citation Intelligence dashboard.',
        'Introduced citation timeline analytics.',
        'Added AI recommendation frequency tracking.',
        'Expanded competitor comparison reports.',
      ],
      improvements: ['Better entity recognition analysis.', 'Faster citation indexing.', 'Enhanced dashboard responsiveness.'],
      fixes: ['Fixed citation count inconsistencies.', 'Improved API authentication handling.'],
    },
    {
      version: 'v1.3.0',
      date: 'May 29, 2026',
      features: [
        'Introduced Answer Engine Optimisation (AEO) recommendations.',
        'Added semantic authority analysis.',
        'Added AI platform comparison dashboard.',
      ],
      improvements: ['Improved AI Visibility Score calculations.', 'Enhanced dashboard navigation.'],
      fixes: ['Fixed historical visibility graph rendering.'],
    },
    {
      version: 'v1.0.0',
      date: 'February 12, 2026',
      badge: 'Initial Release',
      features: [
        'AI Visibility Dashboard & Score',
        'ChatGPT, Claude & Perplexity Monitoring',
        'Citation Analytics & Executive Reports',
        'REST API & Workspace Management',
      ],
      improvements: ['First public release of TangentCore platform.'],
      fixes: [],
    },
  ];

  const upcoming = [
    'AI Visibility Alerts (Slack & Microsoft Teams)',
    'Multi-language AI Visibility Search',
    'Custom Executive Report Builder',
    'Enterprise Single Sign-On (SSO)',
  ];

  return (
    <div className={`min-h-screen flex flex-col font-sans relative transition-colors duration-500 ${
      isDark ? 'bg-[#0B0B0C] text-[#F6F6F4]' : 'bg-[#FCFCFB] text-[#181818]'
    }`}>
      <ScrollProgress />
      <AiBackground isDark={isDark} />
      <Navbar ctaText="Documentation" ctaHref="/docs" />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-xs font-mono font-bold ${
            isDark ? 'bg-[#121315] border-white/10 text-[#C7A15A]' : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#B87333]'
          } shadow-sm`}>
            <Clock className="w-3.5 h-3.5 text-[#C7A15A]" />
            <span className="uppercase tracking-wider">PRODUCT UPDATES & CHANGELOG</span>
          </div>

          <h1 className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#181818]'}`}>
            Platform Updates & Releases
          </h1>

          <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
            Welcome to the TangentCore Changelog. Here you'll find a complete history of new features, platform enhancements, performance improvements, bug fixes, and security updates.
          </p>
        </div>

        {/* Release Timeline */}
        <div className="max-w-4xl mx-auto space-y-10">
          {releases.map((rel) => (
            <div
              key={rel.version}
              className={`p-8 rounded-3xl border ${
                isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'
              } space-y-6 shadow-xl relative`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-extrabold text-[#C7A15A] font-mono">{rel.version}</span>
                  {rel.badge && (
                    <span className="px-2.5 py-0.5 rounded-md bg-[#C7A15A]/20 text-[#C7A15A] text-[10px] font-mono font-bold uppercase">
                      {rel.badge}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#B7B7B5]">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{rel.date}</span>
                </div>
              </div>

              {/* New Features */}
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase text-[#C7A15A] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> New Features
                </span>
                <ul className="space-y-1.5 pl-2">
                  {rel.features.map((feat, fIdx) => (
                    <li key={fIdx} className={`text-xs ${isDark ? 'text-white' : 'text-[#181818]'} flex items-start gap-2`}>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Improvements */}
              {rel.improvements && rel.improvements.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <span className="text-xs font-mono font-bold uppercase text-amber-400 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" /> Improvements
                  </span>
                  <ul className="space-y-1 pl-2">
                    {rel.improvements.map((imp, iIdx) => (
                      <li key={iIdx} className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
                        • {imp}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Fixes */}
              {rel.fixes && rel.fixes.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <span className="text-xs font-mono font-bold uppercase text-rose-400 flex items-center gap-1.5">
                    <Bug className="w-3.5 h-3.5" /> Bug Fixes
                  </span>
                  <ul className="space-y-1 pl-2">
                    {rel.fixes.map((fix, fxIdx) => (
                      <li key={fxIdx} className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
                        • {fix}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Currently in Development */}
        <div className={`max-w-4xl mx-auto p-8 rounded-3xl border ${isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'} space-y-4 shadow-xl`}>
          <h3 className="text-xl font-bold text-[#C7A15A]">Currently in Development</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {upcoming.map((item, idx) => (
              <div key={idx} className={`p-3 rounded-xl border ${isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-[#F6F5F3] border-[#E5E3DF]'} text-xs font-medium flex items-center gap-2`}>
                <Clock className="w-3.5 h-3.5 text-[#C7A15A] shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

      </main>

      <Footer isDark={isDark} />
    </div>
  );
}
