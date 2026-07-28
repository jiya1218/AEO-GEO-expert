'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Brain, Sparkles, ArrowRight, Bot, Zap, Layers, Sun, Moon, Search, Globe, ShieldCheck,
  CheckCircle2, TrendingUp, Building2, Cpu, Tag, Key, Star, ChevronRight, Check, Lock,
  BarChart3, Users, Sliders, Clock, ShoppingCart, HeartPulse, Landmark
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
      icon: Layers,
    },
    {
      title: 'Global E-Commerce & Retail',
      metrics: '94.2% AI Recommendation Share',
      description: 'Ensure direct product recommendations when consumers prompt ChatGPT or Perplexity for purchasing guidance.',
      features: ['Product schema structured data', 'Category buying guide placement', 'Real-time inventory vector feed'],
      icon: ShoppingCart,
    },
    {
      title: 'Healthcare & Life Sciences',
      metrics: '100% Medical Schema Accuracy',
      description: 'Validate authoritative clinical sources cited by AI engines for medical and bio-tech queries.',
      features: ['Clinical trial & study citations', 'Medical entity density optimization', 'Regulatory compliant AI briefs'],
      icon: HeartPulse,
    },
    {
      title: 'Financial Services & Banking',
      metrics: '4.5x Share of Voice Expansion',
      description: 'Secure trusted brand citations in AI responses for wealth management, credit, and enterprise fintech searches.',
      features: ['Financial metric schema validation', 'Risk & compliance vector mapping', 'Executive leadership citations'],
      icon: Landmark,
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
                Enterprise AI Platform
              </span>
              <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${
                isDark ? 'text-[#F6F6F4]' : 'text-[#181818]'
              }`}>
                Built for AI Visibility Leadership
              </h2>
              <p className={`text-base leading-[1.7] ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
                Enterprise tools to monitor AI citations, analyse competitor visibility, and strengthen brand discoverability across modern answer engines.
              </p>
            </ScrollReveal>

            {/* Asymmetric Solution Panels */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'AI Citation Share of Voice',
                  desc: 'Track the percentage of AI search responses where your brand is referenced versus top competitors across all major LLMs.',
                  icon: TrendingUp,
                  metric: '4.2x Avg. Lift',
                  href: '/tools/citation-sov',
                },
                {
                  title: 'Competitive Visibility Intelligence',
                  desc: 'Analyse competitor AI visibility patterns and identify actionable opportunities to strengthen your brand positioning.',
                  icon: Zap,
                  metric: 'Real-Time Insights',
                  href: '/tools/prompt-research',
                },
                {
                  title: 'Entity & Schema Coverage',
                  desc: 'Validate structured data coverage and entity relationships to ensure AI platforms accurately represent your brand.',
                  icon: Cpu,
                  metric: '100% Schema Coverage',
                  href: '/tools/brand-auditor',
                },
              ].map((solution, idx) => (
                <ScrollReveal key={idx} variant="fadeUp" delay={idx * 0.15}>
                  <Link href={solution.href} className="block h-full">
                    <div className={`p-8 rounded-3xl border ${
                      isDark ? 'bg-[#1B1C1F] border-white/10 hover:border-[#C7A15A]/40' : 'bg-white border-[#E5E3DF] hover:border-[#B87333]/40 shadow-lg'
                    } space-y-6 hover-luxury-lift h-full flex flex-col justify-between cursor-pointer group transition-all`}>
                      <div className="space-y-4">
                        <div className="w-12 h-12 rounded-2xl bg-[#B87333]/15 text-[#C7A15A] flex items-center justify-center group-hover:scale-110 transition-transform">
                          <solution.icon className="w-6 h-6" />
                        </div>
                        <h3 className={`text-xl font-bold ${isDark ? 'text-[#F6F6F4]' : 'text-[#181818]'} group-hover:text-[#C7A15A] transition-colors`}>
                          {solution.title}
                        </h3>
                        <p className={`text-xs leading-[1.7] ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
                          {solution.desc}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono font-bold text-[#C7A15A]">
                        <span>{solution.metric}</span>
                        <ChevronRight className="w-4 h-4 text-[#B87333] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>


        {/* SECTION 5: INTERACTIVE 6-LLM ARCHITECTURE DIAGRAM */}
        <section id="architecture" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-36">
          <ScrollReveal variant="fadeUp" className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-mono text-[#B87333] font-bold uppercase tracking-widest">
              Platform Architecture
            </span>
            <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${
              isDark ? 'text-[#F6F6F4]' : 'text-[#181818]'
            }`}>
              How TangentCore Works
            </h2>
            <p className={`text-base leading-[1.7] ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
              TangentCore continuously monitors how AI platforms perceive your brand, analyses citation patterns, and delivers actionable visibility intelligence.
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
                <h3 className="text-lg font-extrabold champagne-gradient-text">TangentCore AI Engine</h3>
                <span className="inline-block px-3 py-1 rounded-full bg-[#B87333]/20 text-[#C7A15A] text-[10px] font-mono font-bold">
                  AI Visibility Intelligence Pipeline
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
                <div className="w-32 h-32 rounded-3xl bg-[#B87333]/15 text-[#C7A15A] flex items-center justify-center border border-[#B87333]/30 shadow-inner transition-all">
                  {(() => {
                    const ActiveIcon = industries[activeIndustryTab].icon;
                    return <ActiveIcon className="w-16 h-16" />;
                  })()}
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* SECTION 7: VERTICAL ANIMATED TIMELINE (Process) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-36">
          <ScrollReveal variant="fadeUp" className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-mono text-[#B87333] font-bold uppercase tracking-widest">
              Enterprise AI Workflow
            </span>
            <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${
              isDark ? 'text-[#F6F6F4]' : 'text-[#181818]'
            }`}>
              Enterprise AI Visibility Workflow
            </h2>
            <p className={`text-base leading-[1.7] ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
              From continuous AI search monitoring to structured data optimisation and executive reporting, TangentCore provides an end-to-end workflow for improving your brand&apos;s visibility across modern AI search platforms.
            </p>
          </ScrollReveal>

          <div className="space-y-8 max-w-3xl mx-auto">
            {[
              {
                step: '01',
                title: 'AI Platform Monitoring',
                desc: 'Continuously monitor how ChatGPT, Gemini, Claude, Perplexity, Grok, and DeepSeek discover, reference, and recommend your brand across relevant prompts and customer journeys.',
                badge: 'Live Monitoring',
              },
              {
                step: '02',
                title: 'AI Citation Intelligence',
                desc: 'Analyse citation frequency, competitor mentions, answer quality, and visibility gaps to understand where your brand gains—or loses—AI exposure.',
                badge: 'AI Analysis',
              },
              {
                step: '03',
                title: 'Structured Data & Entity Optimisation',
                desc: 'Validate structured data, strengthen entity relationships, optimise knowledge signals, and improve how AI platforms interpret your website and content.',
                badge: 'Optimisation Ready',
              },
              {
                step: '04',
                title: 'Continuous Performance Intelligence',
                desc: 'Track AI visibility trends, benchmark competitors, measure citation growth, and generate executive-ready reports that demonstrate long-term business impact.',
                badge: 'Executive Reporting',
              },
            ].map((st, idx) => (
              <ScrollReveal key={idx} variant="fadeUp" delay={idx * 0.1} className="flex gap-6 items-start">
                <div className="w-12 h-12 mt-1 rounded-2xl bg-[#C7A15A] text-[#111111] flex items-center justify-center shrink-0 font-mono font-extrabold text-sm shadow-md">
                  {st.step}
                </div>
                <div className={`p-6 rounded-2xl border flex-1 ${
                  isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-white border-[#E5E3DF] shadow-md'
                }`}>
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <h3 className="text-lg font-bold">{st.title}</h3>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#B87333]/15 text-[#C7A15A] text-[10px] font-mono font-bold uppercase tracking-wide">
                      {st.badge}
                    </span>
                  </div>
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
                { number: '6', label: 'AI Platforms Monitored' },
                { number: '100+', label: 'AI Visibility Signals' },
                { number: '24/7', label: 'Continuous Monitoring' },
                { number: 'Enterprise', label: 'Ready' },
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


        {/* SECTION 9: WHY TANGENTCORE */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-36 space-y-16">
          <ScrollReveal variant="fadeUp" className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono text-[#C7A15A] font-bold uppercase tracking-widest">
              Why TangentCore
            </span>
            <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${
              isDark ? 'text-[#F6F6F4]' : 'text-[#181818]'
            }`}>
              Built for Enterprise AI Visibility
            </h2>
            <p className={`text-base leading-[1.7] ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
              Everything your organisation needs to monitor, analyse, optimise, and improve brand visibility across modern AI search and answer engines.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Card 1: AI Visibility Intelligence */}
            <ScrollReveal variant="fadeUp">
              <div className={`p-8 sm:p-10 rounded-3xl border ${
                isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-white border-[#E5E3DF] shadow-xl'
              } space-y-6 hover-luxury-lift h-full flex flex-col`}>
                <div className="w-12 h-12 rounded-2xl bg-[#B87333]/15 text-[#C7A15A] flex items-center justify-center border border-[#B87333]/30">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-extrabold">Enterprise AI Visibility Intelligence</h3>
                  <p className={`text-sm leading-[1.7] ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
                    Monitor how leading AI platforms discover, reference, and recommend your brand across ChatGPT, Gemini, Claude, Perplexity, Grok, and DeepSeek.
                  </p>
                </div>
                <div className="pt-4 space-y-2.5 flex-1">
                  {['Real-time AI visibility monitoring', 'Cross-platform citation intelligence', 'Competitor benchmarking', 'Executive-ready reporting'].map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-[#B87333] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-white/10">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#B87333]/15 text-[#C7A15A] text-[10px] font-mono font-bold uppercase tracking-wide">
                    Continuous Intelligence
                  </span>
                </div>
              </div>
            </ScrollReveal>

            {/* Card 2: Structured Data & Knowledge Optimisation */}
            <ScrollReveal variant="fadeUp" delay={0.15}>
              <div className={`p-8 sm:p-10 rounded-3xl border ${
                isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-white border-[#E5E3DF] shadow-xl'
              } space-y-6 hover-luxury-lift h-full flex flex-col`}>
                <div className="w-12 h-12 rounded-2xl bg-[#B87333]/15 text-[#C7A15A] flex items-center justify-center border border-[#B87333]/30">
                  <Cpu className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-extrabold">Structured Data & Knowledge Optimisation</h3>
                  <p className={`text-sm leading-[1.7] ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
                    Strengthen structured data, entity relationships, and knowledge signals to improve how AI platforms interpret, rank, and reference your content.
                  </p>
                </div>
                <div className="pt-4 space-y-2.5 flex-1">
                  {['JSON-LD validation', 'Entity relationship optimisation', 'Knowledge graph enhancement', 'AI-ready content recommendations'].map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-[#B87333] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-white/10">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#B87333]/15 text-[#C7A15A] text-[10px] font-mono font-bold uppercase tracking-wide">
                    Enterprise Ready
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>


        {/* SECTION 11: PRICING COMPARISON */}
        <section id="pricing" className={`py-28 sm:py-36 border-y ${
          isDark ? 'bg-[#121315] border-white/10' : 'bg-[#F6F5F3] border-[#E5E3DF]'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            <ScrollReveal variant="fadeUp" className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-mono text-[#B87333] font-bold uppercase tracking-widest">
                Plans & Pricing
              </span>
              <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${
                isDark ? 'text-[#F6F6F4]' : 'text-[#181818]'
              }`}>
                Choose the Right Plan for Your Business
              </h2>
              <p className={`text-base leading-[1.7] ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
                Start with an AI Visibility Audit and scale your monitoring, optimisation, and reporting as your organisation grows.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Starter Plan */}
              <ScrollReveal variant="fadeUp">
                <div className={`p-8 rounded-3xl border ${
                  isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-white border-[#E5E3DF] shadow-lg'
                } space-y-6 hover-luxury-lift flex flex-col justify-between h-full`}>
                  <div className="space-y-4">
                    <span className="text-xs font-mono text-[#B7B7B5] font-bold uppercase">Starter</span>
                    <h3 className="text-2xl font-extrabold">Starter</h3>
                    <div className="text-3xl font-black text-[#C7A15A]">$39 <span className="text-xs text-[#B7B7B5] font-normal">/mo</span></div>
                    <ul className="space-y-2.5 text-xs font-medium pt-4 border-t border-white/10">
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#C7A15A]" /> Monitor 2 AI Search Platforms</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#C7A15A]" /> 15 AI Search Prompts</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#C7A15A]" /> AI Visibility Dashboard</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#C7A15A]" /> JSON-LD Validation</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#C7A15A]" /> Monthly AI Visibility Report</li>
                    </ul>
                  </div>
                  <Link href="/pricing" className="w-full py-3.5 rounded-2xl luxury-btn-secondary text-center text-xs font-bold block">
                    Start Free Audit
                  </Link>
                </div>
              </ScrollReveal>

              {/* Professional Plan */}
              <ScrollReveal variant="fadeUp" delay={0.15}>
                <div className={`p-8 rounded-3xl border-2 border-[#C7A15A] ${
                  isDark ? 'bg-[#242529] shadow-2xl shadow-[#C7A15A]/15' : 'bg-white shadow-2xl'
                } space-y-6 hover-luxury-lift relative overflow-hidden flex flex-col justify-between h-full`}>
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#B87333] via-[#C7A15A] to-[#F5E8C7]" />
                  <div className="space-y-4">
                    <span className="text-xs font-mono text-[#C7A15A] font-bold uppercase flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-[#C7A15A]" /> Most Popular
                    </span>
                    <h3 className="text-2xl font-extrabold">Professional</h3>
                    <div className="text-4xl font-black champagne-gradient-text">$149 <span className="text-xs text-[#B7B7B5] font-normal">/mo</span></div>
                    <ul className="space-y-2.5 text-xs font-medium pt-4 border-t border-white/10">
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#C7A15A]" /> Monitor All 6 AI Platforms</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#C7A15A]" /> 100 AI Search Prompts</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#C7A15A]" /> AI Citation Intelligence</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#C7A15A]" /> Automated Schema Optimisation</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#C7A15A]" /> Competitor Intelligence Reports</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#C7A15A]" /> Weekly Visibility Reports</li>
                    </ul>
                  </div>
                  <Link href="/pricing" className="w-full py-3.5 rounded-2xl luxury-btn-primary text-center text-xs font-bold block shadow-md">
                    Choose Professional
                  </Link>
                </div>
              </ScrollReveal>

              {/* Enterprise Plan */}
              <ScrollReveal variant="fadeUp" delay={0.3}>
                <div className={`p-8 rounded-3xl border ${
                  isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-white border-[#E5E3DF] shadow-lg'
                } space-y-6 hover-luxury-lift flex flex-col justify-between h-full`}>
                  <div className="space-y-4">
                    <span className="text-xs font-mono text-[#B7B7B5] font-bold uppercase">Enterprise</span>
                    <h3 className="text-2xl font-extrabold">Enterprise</h3>
                    <div className="text-3xl font-black text-[#C7A15A]">$399 <span className="text-xs text-[#B7B7B5] font-normal">/mo</span></div>
                    <ul className="space-y-2.5 text-xs font-medium pt-4 border-t border-white/10">
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#C7A15A]" /> Unlimited Brands</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#C7A15A]" /> Unlimited Monitoring</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#C7A15A]" /> API Access</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#C7A15A]" /> Custom Integrations</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#C7A15A]" /> Dedicated Customer Success Manager</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#C7A15A]" /> Priority Support</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#C7A15A]" /> Enterprise SLA</li>
                    </ul>
                  </div>
                  <Link href="/contact" className="w-full py-3.5 rounded-2xl luxury-btn-secondary text-center text-xs font-bold block">
                    Contact Sales
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            {/* Bottom Note */}
            <ScrollReveal variant="fadeUp" className="text-center max-w-2xl mx-auto space-y-4 pt-4">
              <p className={`text-sm leading-[1.7] ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
                Need custom deployments, higher usage limits, or tailored onboarding? Contact our enterprise team for a personalised solution.
              </p>
              <Link
                href="/contact"
                className="inline-block px-8 py-3.5 rounded-2xl luxury-btn-secondary text-xs font-bold"
              >
                Contact Sales
              </Link>
            </ScrollReveal>
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
              AI Visibility Intelligence FAQ
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
                Get Started Today
              </span>
              <h2 className={`text-4xl sm:text-6xl font-extrabold tracking-tight ${
                isDark ? 'text-[#F6F6F4]' : 'text-[#181818]'
              }`}>
                Discover How AI Platforms See Your Brand
              </h2>
              <p className={`text-base leading-[1.7] max-w-xl mx-auto ${
                isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'
              }`}>
                Run a free AI visibility audit across ChatGPT, Gemini, Claude, Perplexity, DeepSeek, and Grok in under 2 minutes.
              </p>
            </ScrollReveal>

            <ScrollReveal variant="scaleUp" delay={0.2} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl luxury-btn-primary text-sm font-bold shadow-xl shadow-[#C7A15A]/30 flex items-center justify-center gap-2"
              >
                <span>Run Free AI Visibility Audit</span>
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
