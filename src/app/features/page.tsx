'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Layers, Bot, Cpu, BarChart3, 
  Search, Lock, Zap, FileText, Globe, RefreshCw, Terminal, Eye, Award
} from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AiBackground } from '@/components/ui/ai-background';
import { ScrollProgress } from '@/components/ui/scroll-progress';

export default function FeaturesPage() {
  const { isDark } = useTheme();

  const featureModules = [
    {
      icon: Eye,
      title: 'AI Visibility Dashboard',
      subtitle: 'Monitor Your Brand Across Every AI Platform',
      desc: 'Get a unified view of your visibility across major Large Language Models. Track how often your organisation appears in AI-generated responses and monitor performance trends over time.',
      features: ['Unified AI Visibility Score', 'Brand Mention Timeline', 'Platform-wise Performance', 'Historical Visibility Trends', 'Executive Dashboard', 'Custom Reports'],
    },
    {
      icon: Sparkles,
      title: 'AI Citation Intelligence',
      subtitle: 'Track Every AI Citation That Matters',
      desc: 'Understand when, where, and why AI platforms reference your organisation. Measure citation frequency, identify high-performing content, and discover new opportunities to increase AI recommendations.',
      features: ['Citation Tracking', 'Source Analysis', 'Citation History', 'Mention Monitoring', 'Authority Signals', 'Citation Growth Reports'],
    },
    {
      icon: BarChart3,
      title: 'Competitor Intelligence',
      subtitle: 'See How You Compare Against Competitors',
      desc: 'Benchmark your AI visibility against competitors across every major AI search platform. Identify strengths, uncover weaknesses, and discover opportunities to gain a competitive advantage.',
      features: ['Competitor Benchmarking', 'AI Visibility Comparison', 'Citation Share Analysis', 'Recommendation Tracking', 'Market Position Insights', 'Opportunity Detection'],
    },
    {
      icon: Bot,
      title: 'GEO Recommendations',
      subtitle: 'Actionable Optimisation Powered by AI',
      desc: 'Receive prioritised recommendations that help AI models better understand your organisation. Every suggestion is designed to improve discoverability, authority, and recommendation frequency.',
      features: ['Entity Optimisation', 'Content Recommendations', 'Technical Improvements', 'Semantic Analysis', 'Priority Scoring', 'GEO Readiness Report'],
    },
    {
      icon: Layers,
      title: 'Answer Engine Optimisation',
      subtitle: 'Optimise for AI-Generated Answers',
      desc: 'Improve how your content performs inside conversational AI experiences by aligning with the ranking signals used by modern answer engines.',
      features: ['Question-Based Optimisation', 'AI Answer Readiness', 'Featured Response Analysis', 'Conversational Content Guidance', 'Structured Content Review', 'Authority Improvement'],
    },
    {
      icon: ShieldCheck,
      title: 'Brand Audit Matrix',
      subtitle: 'Understand How AI Understands Your Brand',
      desc: 'The Brand Audit Matrix analyses your digital presence from an AI perspective, measuring authority, entity recognition, semantic relevance, and citation quality to identify areas for improvement.',
      features: ['Brand Health Score', 'Entity Recognition Analysis', 'Semantic Authority', 'Knowledge Graph Insights', 'AI Trust Signals', 'Improvement Roadmap'],
    },
    {
      icon: FileText,
      title: 'Content Intelligence',
      subtitle: 'Create Content AI Can Understand',
      desc: 'Analyse your existing content to discover semantic gaps, improve topical authority, and optimise information architecture for AI-powered search.',
      features: ['Content Quality Analysis', 'Topic Coverage', 'Semantic Relevance', 'Content Gap Detection', 'AI Readability', 'Optimisation Suggestions'],
    },
    {
      icon: RefreshCw,
      title: 'AI ROI Estimator',
      subtitle: 'Measure the Business Impact of AI Visibility',
      desc: 'Estimate the potential return from improving your AI visibility using projected increases in citations, brand exposure, organic discovery, and customer engagement.',
      features: ['ROI Forecasting', 'Visibility Impact Calculator', 'Lead Growth Projection', 'Citation Value Estimation', 'Traffic Opportunity Analysis', 'Executive Business Reports'],
    },
    {
      icon: Zap,
      title: 'Automated Monitoring',
      subtitle: 'Continuous AI Search Monitoring',
      desc: 'AI search changes daily. TangentCore continuously monitors your visibility, detects important changes, and alerts your team whenever opportunities or risks appear.',
      features: ['24/7 Monitoring', 'AI Visibility Alerts', 'Weekly Reports', 'Competitor Change Detection', 'Trend Monitoring', 'Automated Notifications'],
    },
    {
      icon: Award,
      title: 'Enterprise Reporting',
      subtitle: 'Reports Built for Leadership Teams',
      desc: 'Generate professional reports that clearly communicate AI visibility performance, optimisation progress, competitive insights, and business impact.',
      features: ['Executive Reports', 'PDF Export', 'Team Dashboards', 'Scheduled Reports', 'KPI Tracking', 'Custom Branding'],
    },
  ];

  const integrations = [
    'Google Search Console', 'Google Analytics 4', 'Ahrefs', 'Semrush', 'Slack', 'Zapier', 'REST API', 'Webhooks'
  ];

  const securityFeatures = [
    'End-to-End Encryption', 'Role-Based Access Control', 'Secure Authentication', 'Audit Logs', 'Enterprise Infrastructure', 'Privacy by Design'
  ];

  return (
    <div className={`min-h-screen flex flex-col font-sans relative transition-colors duration-500 ${
      isDark ? 'bg-[#0B0B0C] text-[#F6F6F4]' : 'bg-[#FCFCFB] text-[#181818]'
    }`}>
      <ScrollProgress />
      <AiBackground isDark={isDark} />
      <Navbar ctaText="Book a Demo" ctaHref="/contact" />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 space-y-20">
        
        {/* Hero Section */}
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-xs font-mono font-bold ${
            isDark ? 'bg-[#121315] border-white/10 text-[#C7A15A]' : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#B87333]'
          } shadow-sm`}>
            <Cpu className="w-3.5 h-3.5 text-[#C7A15A]" />
            <span className="uppercase tracking-wider">FEATURES & CAPABILITIES</span>
          </div>

          <h1 className={`text-4xl sm:text-6xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#181818]'}`}>
            Enterprise AI Visibility Platform
          </h1>

          <p className={`text-lg sm:text-xl leading-relaxed ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
            Monitor, measure, and improve how your brand is discovered across ChatGPT, Google AI, Gemini, Claude, Perplexity, DeepSeek, and the next generation of AI-powered search engines.
          </p>

          <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-[#B7B7B5]/80' : 'text-[#5C5C5C]/80'} max-w-3xl mx-auto`}>
            TangentCore combines AI visibility analytics, citation intelligence, competitor monitoring, and Generative Engine Optimisation (GEO) into one enterprise platform, giving marketing teams complete control over their AI search presence.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-2xl luxury-btn-primary font-bold text-sm shadow-xl hover:scale-105 transition-transform flex items-center gap-2"
            >
              <span>Book a Demo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/tools/brand-auditor"
              className={`px-8 py-4 rounded-2xl border text-sm font-bold ${
                isDark ? 'bg-[#121315] border-white/10 text-white hover:border-[#C7A15A]' : 'bg-white border-[#E5E3DF] text-[#181818] hover:border-[#B87333]'
              } transition-all`}
            >
              Start Free AI Visibility Audit
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-extrabold">Platform Capabilities</h2>
            <p className={`text-sm ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'} max-w-2xl mx-auto`}>
              Our platform provides everything organisations need to understand how AI models perceive their brand, identify optimisation opportunities, and continuously improve visibility across modern AI search experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featureModules.map((mod, idx) => {
              const Icon = mod.icon;
              return (
                <div
                  key={idx}
                  className={`p-8 rounded-3xl border ${
                    isDark ? 'bg-[#121315] border-white/10 hover:border-[#C7A15A]/40' : 'bg-white border-[#E5E3DF] hover:border-[#B87333]/40'
                  } space-y-6 shadow-xl transition-all hover:scale-[1.01]`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-[#C7A15A]/20 border border-[#C7A15A]/30 text-[#C7A15A]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{mod.title}</h3>
                      <span className="text-xs font-mono text-[#C7A15A] block">{mod.subtitle}</span>
                    </div>
                  </div>

                  <p className={`text-sm ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'} leading-relaxed`}>
                    {mod.desc}
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                    {mod.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C7A15A] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* API & Integrations Section */}
        <div className={`p-10 rounded-3xl border ${isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'} space-y-8 shadow-2xl`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-[#C7A15A] uppercase">
                <Terminal className="w-4 h-4" />
                <span>API & Integrations</span>
              </div>
              <h3 className="text-2xl font-bold">Connect With Your Existing Marketing Stack</h3>
              <p className={`text-sm ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'} leading-relaxed`}>
                Integrate TangentCore into your workflow and centralise AI visibility data alongside your existing analytics and reporting tools.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {integrations.map((item) => (
                  <span key={item} className="px-3 py-1.5 rounded-xl bg-[#C7A15A]/15 border border-[#C7A15A]/30 text-[#C7A15A] text-xs font-mono font-bold">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-[#C7A15A] uppercase">
                <Lock className="w-4 h-4" />
                <span>Enterprise Security</span>
              </div>
              <h3 className="text-2xl font-bold">Security Built for Enterprise Teams</h3>
              <p className={`text-sm ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'} leading-relaxed`}>
                Protect your organisation with enterprise-grade infrastructure, secure authentication, encrypted communication, and privacy-first architecture.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-2">
                {securityFeatures.map((sec) => (
                  <div key={sec} className="flex items-center gap-2 text-xs font-medium">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{sec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Why TangentCore? */}
        <div className="rounded-3xl luxury-gradient-card border border-[#C7A15A]/40 p-10 sm:p-12 text-center space-y-6 shadow-2xl">
          <h2 className="text-3xl font-extrabold text-white">Why TangentCore?</h2>
          <p className="text-base text-[#E5E3DF]/80 max-w-2xl mx-auto leading-relaxed">
            Traditional SEO tells you how you rank on search engines. <br />
            <strong>TangentCore tells you how AI systems understand, reference, and recommend your organisation.</strong>
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-2xl luxury-btn-primary font-bold text-sm shadow-xl hover:scale-105 transition-transform"
            >
              Book a Demo
            </Link>
          </div>
        </div>

      </main>

      <Footer isDark={isDark} />
    </div>
  );
}
