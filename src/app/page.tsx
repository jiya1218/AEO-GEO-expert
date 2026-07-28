'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Brain, Sparkles, ArrowRight, Bot, Zap, Layers, Sun, Moon, Search, Globe, ShieldCheck,
  CheckCircle2, TrendingUp, Building2, Cpu, Tag, Key, Star, ChevronRight, Check, Lock,
  BarChart3, Users, Sliders, Clock
} from 'lucide-react';
import { AiBackground } from '@/components/ui/ai-background';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { Sculpture3D } from '@/components/ui/sculpture-3d';
import { Footer } from '@/components/footer';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal';

import { useTheme } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { BrandLogo } from '@/components/ui/brand-logo';

export default function HomePage() {
  const { isDark, setIsDark } = useTheme();
  const [searchUrl, setSearchUrl] = useState('');
  const [activeIndustryTab, setActiveIndustryTab] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const router = useRouter();

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchUrl) {
      const clean = searchUrl.trim().toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '');
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('pendingScanUrl', clean);
      }
      router.push('/dashboard');
    }
  };

  const industries = [
    {
      title: 'Enterprise SaaS & Cloud',
      metrics: '3.8x Citation Rate Lift',
      description: 'Command brand positioning in AI evaluation responses for B2B software purchasing queries.',
      features: ['Software comparison matrix displacement', 'Integration & API schema injection', 'SOC2 & compliance entity mapping'],
    },
    {
      title: 'Global E-Commerce & Retail',
      metrics: '94.2% AI Recommendation Share',
      description: 'Ensure direct product recommendations when consumers prompt ChatGPT or Perplexity for purchasing guidance.',
      features: ['Product schema structured data', 'Category buying guide placement', 'Real-time inventory vector feed'],
    },
    {
      title: 'Healthcare & Life Sciences',
      metrics: '100% Medical Schema Accuracy',
      description: 'Validate authoritative clinical sources cited by AI engines for medical and bio-tech queries.',
      features: ['Clinical trial & study citations', 'Medical entity density optimization', 'Regulatory compliant AI briefs'],
    },
    {
      title: 'Financial Services & Banking',
      metrics: '4.5x Share of Voice Expansion',
      description: 'Secure trusted brand citations in AI responses for wealth management, credit, and enterprise fintech searches.',
      features: ['Financial metric schema validation', 'Risk & compliance vector mapping', 'Executive leadership citations'],
    },
  ];

  const faqs = [
    {
      q: 'What is Generative Engine Optimization (GEO) and how does it differ from traditional SEO?',
      a: 'Traditional SEO focuses on earning links and keywords to rank on 10 blue links in Google search results. Generative Engine Optimization (GEO) focuses on structuring brand entity knowledge, JSON-LD schemas, and vector content so that Large Language Models (ChatGPT, Gemini, Perplexity, Claude, DeepSeek, Grok) directly cite and recommend your brand when users ask conversational questions.',
    },
    {
      q: 'Which AI engines does TangentCore scan and audit in real-time?',
      a: 'TangentCore continuously monitors 6 major generative AI engines: ChatGPT-4o (OpenAI), Google Gemini 1.5 Pro, Perplexity Pro, Claude 3.5 Sonnet (Anthropic), DeepSeek R1, and xAI Grok 2.',
    },
    {
      q: 'How quickly can TangentCore improve our brand citation frequency in AI responses?',
      a: 'Initial AI audit and schema gap detection complete within 2 minutes. Once recommended JSON-LD schema fixes and competitor displacement briefs are implemented, brands typically observe measurable citation frequency increases within 7 to 14 days.',
    },
    {
      q: 'Can TangentCore integrate directly into our CMS or web infrastructure?',
      a: 'Yes. TangentCore offers direct JSON-LD schema injection scripts, REST API endpoints, and automated webhooks for Vercel, Next.js, WordPress, Webflow, Shopify, and enterprise CMS platforms.',
    },
    {
      q: 'Is there a money-back guarantee for enterprise subscriptions?',
      a: 'Yes. The Flagship GEO Dominator plan includes a 14-day 100% money-back guarantee and dedicated onboarding support from a senior GEO AI strategist.',
    },
  ];

  return (
    <div className={`min-h-screen flex flex-col font-sans relative transition-colors duration-500 ${
      isDark ? 'bg-[#0B0B0C] text-[#F6F6F4]' : 'bg-[#FCFCFB] text-[#181818]'
    }`}>
      {/* Top Fixed Champagne & Bronze Scroll Progress Bar */}
      <ScrollProgress />

      {/* Luxury Ambient Studio Lighting Reflections */}
      <AiBackground isDark={isDark} />

      {/* Navigation Header */}
      <Navbar ctaText="Audit Your Brand" ctaHref="/dashboard" />

      {/* Main Content Sections */}
      <main className="flex-1">

        {/* SECTION 1: HERO SECTION (Equal 50/50 Unified Section) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left 50% Content Column (Columns 1-6) */}
            <ScrollReveal variant="fadeRight" duration={0.8} className="lg:col-span-6 space-y-8 text-left">
              <div className="space-y-4">
                <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-xs font-bold ${
                  isDark ? 'bg-[#121315] border-white/10 text-[#C7A15A]' : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#B87333]'
                } backdrop-blur-md shadow-sm`}>
                  <Sparkles className="w-3.5 h-3.5 text-[#C7A15A] animate-pulse" />
                  <span className="uppercase tracking-widest text-[10px]">AI Visibility Intelligence Platform</span>
                </div>

                <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] ${
                  isDark ? 'text-[#F6F6F4]' : 'text-[#181818]'
                }`}>
                  Become the Brand{' '}
                  <span className={isDark ? 'champagne-gradient-text' : 'text-[#B87333]'}>
                    AI Recommends.
                  </span>
                </h1>

                <p className={`text-base sm:text-lg leading-[1.7] ${
                  isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'
                } max-w-xl`}>
                  TangentCore helps enterprises measure, monitor, and improve how their brand appears across AI-powered search platforms including ChatGPT, Gemini, Claude, Perplexity, Grok, and DeepSeek. Gain actionable insights into AI citations, Generative Engine Optimisation (GEO), structured data, and competitive visibility from a single enterprise platform.
                </p>
              </div>

              {/* Instant Hero Scan Input & CTAs */}
              <form onSubmit={handleHeroSearch} className="space-y-4 max-w-xl">
                <div className="relative">
                  <Globe className={`absolute left-4 top-4 h-4 w-4 ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`} />
                  <input
                    type="text"
                    value={searchUrl}
                    onChange={(e) => setSearchUrl(e.target.value)}
                    placeholder="Enter your domain (e.g. company.com)"
                    className={`w-full ${
                      isDark
                        ? 'bg-[#121315] border-white/10 text-white placeholder-[#B7B7B5]/60 focus:border-[#C7A15A]'
                        : 'bg-white border-[#E5E3DF] text-[#181818] placeholder-[#5C5C5C]/60 focus:border-[#B87333]'
                    } border rounded-2xl pl-11 pr-4 py-3.5 text-xs focus:outline-none transition-all shadow-md`}
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    className="px-6 py-3.5 rounded-2xl luxury-btn-primary text-xs font-bold flex items-center gap-2 shadow-md hover:scale-[1.02] transition-transform"
                  >
                    <span>Run Free AI Visibility Audit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <Link
                    href="/contact"
                    className={`px-6 py-3.5 rounded-2xl border text-xs font-bold ${
                      isDark ? 'bg-[#121315] border-white/10 text-white hover:border-[#C7A15A]' : 'bg-white border-[#E5E3DF] text-[#181818] hover:border-[#B87333]'
                    } transition-all`}
                  >
                    Book a Demo
                  </Link>
                </div>

                <div className={`flex flex-wrap items-center gap-4 text-[11px] ${isDark ? 'text-[#B7B7B5]/80' : 'text-[#5C5C5C]'}`}>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C7A15A]" /> Instant AI Visibility Report
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C7A15A]" /> No Credit Card Required
                  </span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#B87333]" /> Enterprise Ready
                  </span>
                </div>
              </form>

              {/* Client Logos / Trust Strip */}
              <div className="pt-4 border-t border-white/10 dark:border-white/10">
                <p className={`text-[10px] uppercase tracking-widest font-mono font-bold mb-3 ${
                  isDark ? 'text-[#B7B7B5]/60' : 'text-[#5C5C5C]/70'
                }`}>
                  Trusted by innovative teams worldwide
                </p>
                <div className="flex flex-wrap items-center gap-6 opacity-80 hover:opacity-100 transition-all">
                  {['Apex Global', 'Vanguard SaaS', 'Soma Health', 'Krypton Financial', 'Aura Commerce'].map((client, idx) => (
                    <span key={idx} className={`text-xs font-extrabold tracking-wider ${
                      isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'
                    }`}>
                      • {client}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Right 50% 3D Sculpture Column (Columns 7-12) */}
            <ScrollReveal variant="fadeLeft" duration={0.9} delay={0.2} className="lg:col-span-6">
              <Sculpture3D isDark={isDark} />
            </ScrollReveal>

          </div>
        </section>


        {/* SECTION 2: LIVE SCANNED ENGINE STRIP & TICKER */}
        <section className={`py-8 border-y ${
          isDark ? 'bg-[#121315] border-white/10' : 'bg-[#F6F5F3] border-[#E5E3DF]'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col xl:flex-row items-center justify-between gap-5">
              
              {/* Status Indicator Badge */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C7A15A] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#C7A15A]"></span>
                </div>
                <span className={`text-xs font-mono font-bold uppercase tracking-widest ${
                  isDark ? 'text-[#F6F6F4]' : 'text-[#181818]'
                }`}>
                  Live Matrix Scanning Active Across 6 AI Engines:
                </span>
              </div>

              {/* 6 AI Engine Badges - Perfectly Grid & Flex Aligned */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 w-full xl:w-auto">
                {['ChatGPT-4o', 'Google Gemini', 'Perplexity Pro', 'Claude 3.5', 'DeepSeek R1', 'xAI Grok 2'].map((engine) => (
                  <div
                    key={engine}
                    className={`px-3 py-2 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 whitespace-nowrap ${
                      isDark ? 'bg-[#1B1C1F] border-white/10 text-[#F6F6F4]' : 'bg-white border-[#E5E3DF] text-[#181818]'
                    } shadow-xs transition-transform hover:scale-105`}
                  >
                    <Bot className="w-3.5 h-3.5 text-[#C7A15A] shrink-0" />
                    <span>{engine}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>


        {/* SECTION 3: CAPABILITIES & SERVICES (Bespoke Alternating Editorial Blocks) */}
        <section id="capabilities" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-36">
          <div className="space-y-28">

            {/* Block 1 */}
            <ScrollReveal variant="fadeUp" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-6">
                <span className="text-xs font-mono text-[#B87333] font-bold uppercase tracking-widest">
                  01 // AI CITATION INTELLIGENCE
                </span>
                <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${
                  isDark ? 'text-[#F6F6F4]' : 'text-[#181818]'
                }`}>
                  AI Search Citation Intelligence
                </h2>
                <p className={`text-base leading-[1.7] ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
                  Understand how leading AI platforms reference, rank, and recommend your brand. Compare citation performance across ChatGPT, Gemini, Claude, Perplexity, Grok, and DeepSeek to uncover visibility gaps, benchmark competitors, and strengthen AI discoverability.
                </p>
                <ul className="space-y-3 text-xs font-bold">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C7A15A]" />
                    <span>Compare AI citations across every major LLM</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C7A15A]" />
                    <span>Track citation sources and answer references</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C7A15A]" />
                    <span>Benchmark competitor visibility in real time</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C7A15A]" />
                    <span>Identify missing AI visibility opportunities</span>
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-7">
                <div className={`p-8 rounded-3xl border ${
                  isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-white border-[#E5E3DF] shadow-xl'
                } space-y-4 hover-luxury-lift`}>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <span className="text-xs font-mono text-[#C7A15A] font-bold">AI CITATION OVERVIEW</span>
                    <span className="px-3 py-1 rounded-full bg-[#C7A15A]/15 text-[#C7A15A] text-[10px] font-mono font-bold uppercase">
                      LIVE ANALYSIS
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-xs font-mono">
                    <div className={`p-4 rounded-2xl border ${isDark ? 'bg-[#121315] border-white/10' : 'bg-[#F6F5F3] border-[#E5E3DF]'}`}>
                      <span className="block text-[10px] text-[#B7B7B5]">Models Monitored</span>
                      <span className="text-base sm:text-lg font-bold text-[#C7A15A]">6 Active</span>
                    </div>
                    <div className={`p-4 rounded-2xl border ${isDark ? 'bg-[#121315] border-white/10' : 'bg-[#F6F5F3] border-[#E5E3DF]'}`}>
                      <span className="block text-[10px] text-[#B7B7B5]">Citation Coverage</span>
                      <span className="text-base sm:text-lg font-bold text-[#C7A15A]">94%</span>
                    </div>
                    <div className={`p-4 rounded-2xl border ${isDark ? 'bg-[#121315] border-white/10' : 'bg-[#F6F5F3] border-[#E5E3DF]'}`}>
                      <span className="block text-[10px] text-[#B7B7B5]">Average Position</span>
                      <span className="text-base sm:text-lg font-bold text-[#B87333]">#1.8</span>
                    </div>
                  </div>

                  {/* Thin Divider & Status List */}
                  <div className="border-t border-white/10 pt-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-mono font-medium">
                      <div className="flex items-center gap-1.5 text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>ChatGPT — Referenced</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>Gemini — Referenced</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>Claude — Referenced</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>Perplexity — Position #2</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>Grok — Position #1</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-amber-400">
                        <span className="font-bold shrink-0">⚠️</span>
                        <span>DeepSeek — Limited Coverage</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </ScrollReveal>

            {/* Block 2 */}
            <ScrollReveal variant="fadeUp" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center lg:flex-row-reverse">
              <div className="lg:col-span-7 lg:order-1">
                <div className={`p-8 rounded-3xl border ${
                  isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-white border-[#E5E3DF] shadow-xl'
                } space-y-4 hover-luxury-lift`}>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <span className="text-xs font-mono text-[#B87333] font-bold uppercase">AI SCHEMA INTELLIGENCE</span>
                    <span className="px-3 py-1 rounded-full bg-[#C7A15A]/15 text-[#C7A15A] text-[10px] font-mono font-bold uppercase">
                      AI OPTIMIZED
                    </span>
                  </div>
                  <div className={`p-4 rounded-2xl border font-mono text-xs ${
                    isDark ? 'bg-[#0B0B0C] border-white/10 text-[#C7A15A]' : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#B87333]'
                  }`}>
                    <pre><code>{`{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "TangentCore",
  "sameAs": [
    "https://linkedin.com/company/tangentcore"
  ],
  "url": "https://tangentcore.in"
}`}</code></pre>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-6 lg:order-2">
                <span className="text-xs font-mono text-[#B87333] font-bold uppercase tracking-widest">
                  02 // STRUCTURED DATA INTELLIGENCE
                </span>
                <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${
                  isDark ? 'text-[#F6F6F4]' : 'text-[#181818]'
                }`}>
                  Structured Data Intelligence
                </h2>
                <p className={`text-base leading-[1.7] ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
                  Analyse structured data, entity relationships, and schema coverage to help AI platforms better understand your brand. Detect missing schema, validate structured markup, and optimise content for stronger AI visibility across modern answer engines.
                </p>
                <ul className="space-y-3 text-xs font-bold">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C7A15A]" />
                    <span>Automatic JSON-LD validation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C7A15A]" />
                    <span>Entity relationship detection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C7A15A]" />
                    <span>Missing schema recommendations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C7A15A]" />
                    <span>AI-ready structured data optimisation</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>

          </div>
        </section>


        {/* SECTION 4: SOLUTIONS & ENTERPRISE PLATFORM PANELS */}
        <section id="solutions" className={`py-28 sm:py-36 border-y ${
          isDark ? 'bg-[#121315] border-white/10' : 'bg-[#F6F5F3] border-[#E5E3DF]'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            <ScrollReveal variant="fadeUp" className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-mono text-[#C7A15A] font-bold uppercase tracking-widest">
                Enterprise GEO Suite
              </span>
              <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${
                isDark ? 'text-[#F6F6F4]' : 'text-[#181818]'
              }`}>
                Engineered for Market Leadership
              </h2>
              <p className={`text-base leading-[1.7] ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
                Comprehensive tools to monitor, optimize, and outrank competitors across generative search engines.
              </p>
            </ScrollReveal>

            {/* Asymmetric Solution Panels */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Real-Time Share of Voice (SoV)',
                  desc: 'Track percentage of AI search prompts where your domain is cited vs. top competitors.',
                  icon: TrendingUp,
                  metric: '4.2x Avg. Lift',
                },
                {
                  title: 'Competitor Displacement Briefs',
                  desc: 'Generate AI-optimized editorial briefs designed specifically to displace competitor citations.',
                  icon: Zap,
                  metric: 'Instant Briefs',
                },
                {
                  title: 'Vector Entity Density',
                  desc: 'Analyze semantic keyword density to align content with LLM vector embedding parameters.',
                  icon: Cpu,
                  metric: '100% Vector Precision',
                },
              ].map((solution, idx) => (
                <ScrollReveal key={idx} variant="fadeUp" delay={idx * 0.15}>
                  <div className={`p-8 rounded-3xl border ${
                    isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-white border-[#E5E3DF] shadow-lg'
                  } space-y-6 hover-luxury-lift h-full flex flex-col justify-between`}>
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#B87333]/15 text-[#C7A15A] flex items-center justify-center">
                        <solution.icon className="w-6 h-6" />
                      </div>
                      <h3 className={`text-xl font-bold ${isDark ? 'text-[#F6F6F4]' : 'text-[#181818]'}`}>
                        {solution.title}
                      </h3>
                      <p className={`text-xs leading-[1.7] ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
                        {solution.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono font-bold text-[#C7A15A]">
                      <span>{solution.metric}</span>
                      <ChevronRight className="w-4 h-4 text-[#B87333]" />
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>


        {/* SECTION 5: INTERACTIVE 6-LLM ARCHITECTURE DIAGRAM */}
        <section id="architecture" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-36">
          <ScrollReveal variant="fadeUp" className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-mono text-[#B87333] font-bold uppercase tracking-widest">
              Live Neural Architecture
            </span>
            <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${
              isDark ? 'text-[#F6F6F4]' : 'text-[#181818]'
            }`}>
              Bi-Directional AI Data Pipeline
            </h2>
            <p className={`text-base leading-[1.7] ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
              How TangentCore continuously ingests, vectorizes, and validates brand knowledge across LLM search engines.
            </p>
          </ScrollReveal>

          {/* Interactive Flow Diagram */}
          <div className={`p-8 sm:p-12 rounded-3xl border ${
            isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-white border-[#E5E3DF] shadow-2xl'
          } relative overflow-hidden`}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center text-center">

              {/* Source 1: Enterprise Web Infrastructure */}
              <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#121315] border-white/10' : 'bg-[#F6F5F3] border-[#E5E3DF]'} space-y-3`}>
                <Building2 className="w-8 h-8 text-[#B87333] mx-auto" />
                <h4 className="text-sm font-bold">Brand Infrastructure</h4>
                <p className="text-xs text-[#B7B7B5]">JSON-LD Schemas, Meta Tags & Editorial Content</p>
              </div>

              {/* Center: TangentCore Core Engine */}
              <div className={`p-8 rounded-3xl border-2 border-[#C7A15A] ${
                isDark ? 'bg-[#242529] shadow-xl shadow-[#C7A15A]/10' : 'bg-[#FCFCFB] shadow-xl'
              } space-y-4 relative`}>
                <div className="w-12 h-12 rounded-2xl bg-[#C7A15A] text-[#111111] flex items-center justify-center mx-auto shadow-md">
                  <Brain className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-extrabold champagne-gradient-text">TangentCore GEO Engine</h3>
                <span className="inline-block px-3 py-1 rounded-full bg-[#B87333]/20 text-[#C7A15A] text-[10px] font-mono font-bold">
                  Vector Density & Citation Pipeline
                </span>
              </div>

              {/* Source 3: 6 Generative Search Engines */}
              <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#121315] border-white/10' : 'bg-[#F6F5F3] border-[#E5E3DF]'} space-y-3`}>
                <Bot className="w-8 h-8 text-[#C7A15A] mx-auto" />
                <h4 className="text-sm font-bold">6 Generative Search Engines</h4>
                <p className="text-xs text-[#B7B7B5]">ChatGPT, Gemini, Perplexity, Claude, DeepSeek, Grok</p>
              </div>

            </div>
          </div>
        </section>


        {/* SECTION 6: INDUSTRIES SHOWCASE (Tabbed Luxury Showcase) */}
        <section className={`py-28 sm:py-36 border-y ${
          isDark ? 'bg-[#121315] border-white/10' : 'bg-[#F6F5F3] border-[#E5E3DF]'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <ScrollReveal variant="fadeUp" className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-mono text-[#C7A15A] font-bold uppercase tracking-widest">
                Tailored Industry Solutions
              </span>
              <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${
                isDark ? 'text-[#F6F6F4]' : 'text-[#181818]'
              }`}>
                Built for High-Stakes Verticals
              </h2>
            </ScrollReveal>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-3">
              {industries.map((ind, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndustryTab(idx)}
                  className={`px-6 py-3 rounded-2xl text-xs font-bold transition-all border ${
                    activeIndustryTab === idx
                      ? 'bg-[#C7A15A] text-[#111111] border-[#C7A15A] shadow-md'
                      : isDark
                      ? 'bg-[#1B1C1F] border-white/10 text-[#B7B7B5] hover:text-white'
                      : 'bg-white border-[#E5E3DF] text-[#5C5C5C] hover:text-[#181818]'
                  }`}
                >
                  {ind.title}
                </button>
              ))}
            </div>

            {/* Active Tab Panel */}
            <div className={`p-8 sm:p-12 rounded-3xl border ${
              isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-white border-[#E5E3DF] shadow-xl'
            } grid grid-cols-1 lg:grid-cols-12 gap-8 items-center`}>
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-mono text-[#C7A15A] font-bold uppercase">
                  {industries[activeIndustryTab].metrics}
                </span>
                <h3 className="text-2xl font-extrabold">
                  {industries[activeIndustryTab].title}
                </h3>
                <p className={`text-sm leading-[1.7] ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
                  {industries[activeIndustryTab].description}
                </p>
                <div className="pt-4 space-y-2">
                  {industries[activeIndustryTab].features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-[#B87333]" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center">
                <div className="w-32 h-32 rounded-3xl bg-[#B87333]/15 text-[#C7A15A] flex items-center justify-center border border-[#B87333]/30 shadow-inner">
                  <Building2 className="w-16 h-16" />
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* SECTION 7: VERTICAL ANIMATED TIMELINE (Process) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-36">
          <ScrollReveal variant="fadeUp" className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-mono text-[#B87333] font-bold uppercase tracking-widest">
              Execution Methodology
            </span>
            <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${
              isDark ? 'text-[#F6F6F4]' : 'text-[#181818]'
            }`}>
              4-Step GEO Displacement Workflow
            </h2>
          </ScrollReveal>

          <div className="space-y-8 max-w-3xl mx-auto">
            {[
              {
                step: '01',
                title: 'Continuous LLM Ingestion & Scraping',
                desc: 'Automated daily scanning across ChatGPT, Gemini, Perplexity, Claude, DeepSeek, and Grok for high-intent target prompts.',
              },
              {
                step: '02',
                title: 'Vector Alignment & Gap Analysis',
                desc: 'Detect queries where competitor domains are cited and pinpoint missing structured data or entity density gaps.',
              },
              {
                step: '03',
                title: 'Automated Schema Repair & Brief Generation',
                desc: 'Inject validated JSON-LD schemas and generate AI-optimized editorial content briefs designed for LLM citation.',
              },
              {
                step: '04',
                title: 'Share of Voice Displacement',
                desc: 'Track direct brand citation growth and outrank legacy competitor search recommendations in real time.',
              },
            ].map((st, idx) => (
              <ScrollReveal key={idx} variant="fadeUp" delay={idx * 0.1} className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-2xl bg-[#C7A15A] text-[#111111] flex items-center justify-center shrink-0 font-mono font-extrabold text-sm shadow-md">
                  {st.step}
                </div>
                <div className={`p-6 rounded-2xl border flex-1 ${
                  isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-white border-[#E5E3DF] shadow-md'
                }`}>
                  <h3 className="text-lg font-bold mb-1">{st.title}</h3>
                  <p className={`text-xs leading-[1.7] ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
                    {st.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>


        {/* SECTION 8: OVERSIZED ANIMATED NUMBERS & STATISTICS */}
        <section className={`py-28 sm:py-36 border-y ${
          isDark ? 'bg-[#121315] border-white/10' : 'bg-[#F6F5F3] border-[#E5E3DF]'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {[
                { number: '94.8%', label: 'GEO Citation Accuracy' },
                { number: '4.2x', label: 'Share of Voice Lift' },
                { number: '6', label: 'Monitored AI Engines' },
                { number: '100%', label: 'Schema Compliance' },
              ].map((stat, idx) => (
                <ScrollReveal key={idx} variant="scaleUp" delay={idx * 0.1} className="space-y-2">
                  <span className="text-4xl sm:text-6xl font-black champagne-gradient-text block">
                    {stat.number}
                  </span>
                  <span className={`text-xs font-mono font-bold uppercase tracking-wider ${
                    isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'
                  }`}>
                    {stat.label}
                  </span>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>


        {/* SECTION 9 & 10: EDITORIAL CASE STUDIES & TESTIMONIALS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-36 space-y-16">
          <ScrollReveal variant="fadeUp" className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono text-[#C7A15A] font-bold uppercase tracking-widest">
              Executive Proof
            </span>
            <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${
              isDark ? 'text-[#F6F6F4]' : 'text-[#181818]'
            }`}>
              Trusted by Industry Pioneers
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                quote: 'TangentCore completely transformed our AI search visibility. We went from 0% citation in ChatGPT software recommendation prompts to dominating 84% of queries in 3 weeks.',
                author: 'Marcus Vance',
                role: 'VP of Digital Growth, Apex Global',
              },
              {
                quote: 'The automated JSON-LD schema repair and competitor displacement briefs gave our technical marketing team the exact playbook needed to outrank legacy competitors on Perplexity.',
                author: 'Elena Rostova',
                role: 'Chief Marketing Officer, Soma Health',
              },
            ].map((t, idx) => (
              <ScrollReveal key={idx} variant="fadeUp" delay={idx * 0.15}>
                <div className={`p-8 sm:p-10 rounded-3xl border ${
                  isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-white border-[#E5E3DF] shadow-xl'
                } space-y-6 hover-luxury-lift h-full flex flex-col justify-between`}>
                  <p className={`text-base leading-[1.7] italic ${isDark ? 'text-[#F6F6F4]' : 'text-[#181818]'}`}>
                    &quot;{t.quote}&quot;
                  </p>
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-[#C7A15A]">{t.author}</h4>
                      <span className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>{t.role}</span>
                    </div>
                    <Star className="w-5 h-5 text-[#C7A15A] fill-[#C7A15A]" />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>


        {/* SECTION 11: PRICING COMPARISON */}
        <section id="pricing" className={`py-28 sm:py-36 border-y ${
          isDark ? 'bg-[#121315] border-white/10' : 'bg-[#F6F5F3] border-[#E5E3DF]'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            <ScrollReveal variant="fadeUp" className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-mono text-[#B87333] font-bold uppercase tracking-widest">
                Enterprise GEO Suite
              </span>
              <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${
                isDark ? 'text-[#F6F6F4]' : 'text-[#181818]'
              }`}>
                Simple, Transparent Pricing
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Starter Plan */}
              <ScrollReveal variant="fadeUp">
                <div className={`p-8 rounded-3xl border ${
                  isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-white border-[#E5E3DF] shadow-lg'
                } space-y-6 hover-luxury-lift flex flex-col justify-between h-full`}>
                  <div className="space-y-4">
                    <span className="text-xs font-mono text-[#B7B7B5] font-bold uppercase">Starter GEO Audit</span>
                    <h3 className="text-2xl font-extrabold">Starter Plan</h3>
                    <div className="text-3xl font-black text-[#C7A15A]">$39 <span className="text-xs text-[#B7B7B5] font-normal">/mo</span></div>
                    <ul className="space-y-2.5 text-xs font-medium pt-4 border-t border-white/10">
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#C7A15A]" /> 2 Monitored LLM Engines</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#C7A15A]" /> 15 Target Prompt Keywords</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#C7A15A]" /> Basic JSON-LD Schema Validation</li>
                    </ul>
                  </div>
                  <Link href="/pricing" className="w-full py-3.5 rounded-2xl luxury-btn-secondary text-center text-xs font-bold block">
                    Select Starter ($39/mo)
                  </Link>
                </div>
              </ScrollReveal>

              {/* Dominator Plan */}
              <ScrollReveal variant="fadeUp" delay={0.15}>
                <div className={`p-8 rounded-3xl border-2 border-[#C7A15A] ${
                  isDark ? 'bg-[#242529] shadow-2xl shadow-[#C7A15A]/15' : 'bg-white shadow-2xl'
                } space-y-6 hover-luxury-lift relative overflow-hidden flex flex-col justify-between h-full`}>
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#B87333] via-[#C7A15A] to-[#F5E8C7]" />
                  <div className="space-y-4">
                    <span className="text-xs font-mono text-[#C7A15A] font-bold uppercase flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-[#C7A15A]" /> Flagship Most Popular
                    </span>
                    <h3 className="text-2xl font-extrabold">Growth Dominator</h3>
                    <div className="text-4xl font-black champagne-gradient-text">$149 <span className="text-xs text-[#B7B7B5] font-normal">/mo</span></div>
                    <ul className="space-y-2.5 text-xs font-medium pt-4 border-t border-white/10">
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#C7A15A]" /> All 6 Multi-LLM Continuous Scans</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#C7A15A]" /> 100 Target Prompt Keywords</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#C7A15A]" /> Automated Schema Auto-Repair</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#C7A15A]" /> Competitor Displacement Briefs</li>
                    </ul>
                  </div>
                  <Link href="/pricing" className="w-full py-3.5 rounded-2xl luxury-btn-primary text-center text-xs font-bold block shadow-md">
                    Get Started ($149/mo)
                  </Link>
                </div>
              </ScrollReveal>

              {/* Enterprise Plan */}
              <ScrollReveal variant="fadeUp" delay={0.3}>
                <div className={`p-8 rounded-3xl border ${
                  isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-white border-[#E5E3DF] shadow-lg'
                } space-y-6 hover-luxury-lift flex flex-col justify-between h-full`}>
                  <div className="space-y-4">
                    <span className="text-xs font-mono text-[#B7B7B5] font-bold uppercase">Multi-Brand Enterprise</span>
                    <h3 className="text-2xl font-extrabold">Enterprise Scale</h3>
                    <div className="text-3xl font-black text-[#C7A15A]">$399 <span className="text-xs text-[#B7B7B5] font-normal">/mo</span></div>
                    <ul className="space-y-2.5 text-xs font-medium pt-4 border-t border-white/10">
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#C7A15A]" /> Unlimited Brands & Portfolios (5 Domains)</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#C7A15A]" /> Automated Webhooks & API Integration</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#C7A15A]" /> Dedicated Senior GEO AI Strategist</li>
                    </ul>
                  </div>
                  <Link href="/pricing" className="w-full py-3.5 rounded-2xl luxury-btn-secondary text-center text-xs font-bold block">
                    Select Enterprise ($399/mo)
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>


        {/* SECTION 12: ELEGANT ACCORDION FAQ */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-36 space-y-12">
          <ScrollReveal variant="fadeUp" className="text-center space-y-4">
            <span className="text-xs font-mono text-[#C7A15A] font-bold uppercase tracking-widest">
              Frequently Asked Questions
            </span>
            <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${
              isDark ? 'text-[#F6F6F4]' : 'text-[#181818]'
            }`}>
              GEO Insights & Intelligence
            </h2>
          </ScrollReveal>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <ScrollReveal key={idx} variant="fadeUp" delay={idx * 0.08}>
                <div className={`rounded-2xl border ${
                  isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-white border-[#E5E3DF]'
                } overflow-hidden`}>
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full p-6 text-left font-bold text-sm sm:text-base flex justify-between items-center gap-4"
                  >
                    <span>{faq.q}</span>
                    <span className="text-[#C7A15A] font-mono text-xl">{activeFaq === idx ? '−' : '+'}</span>
                  </button>
                  {activeFaq === idx && (
                    <div className={`px-6 pb-6 text-xs sm:text-sm leading-[1.7] ${
                      isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'
                    } border-t border-white/10 pt-4`}>
                      {faq.a}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>


        {/* SECTION 13: FULL-WIDTH LUXURY CTA */}
        <section className={`py-24 sm:py-32 relative overflow-hidden border-t ${
          isDark ? 'bg-[#121315] border-white/10' : 'bg-[#F6F5F3] border-[#E5E3DF]'
        }`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
            <ScrollReveal variant="fadeUp" className="space-y-4">
              <span className="text-xs font-mono text-[#C7A15A] font-bold uppercase tracking-widest">
                Command Your AI Search Position
              </span>
              <h2 className={`text-4xl sm:text-6xl font-extrabold tracking-tight ${
                isDark ? 'text-[#F6F6F4]' : 'text-[#181818]'
              }`}>
                Audit Your Brand on Generative Search Today
              </h2>
              <p className={`text-base leading-[1.7] max-w-xl mx-auto ${
                isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'
              }`}>
                Scan your domain across ChatGPT, Gemini, Perplexity, Claude, DeepSeek, and Grok in under 2 minutes.
              </p>
            </ScrollReveal>

            <ScrollReveal variant="scaleUp" delay={0.2} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl luxury-btn-primary text-sm font-bold shadow-xl shadow-[#C7A15A]/30 flex items-center justify-center gap-2"
              >
                <span>Run Free Brand Audit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/pricing"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl luxury-btn-secondary text-sm font-bold flex items-center justify-center gap-2"
              >
                <span>View Enterprise Plans</span>
              </Link>
            </ScrollReveal>
          </div>
        </section>

      </main>

      {/* Luxury Footer */}
      <Footer isDark={isDark} />
    </div>
  );
}
