'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { 
  Brain, Sparkles, ArrowRight, CheckCircle2, Zap, ShieldCheck, 
  HelpCircle, Bot, Layers, Sun, Moon, Search, Globe, ChevronDown, 
  TrendingUp, Award, Clock, Lock, RefreshCw, BarChart3, Star, Check, X,
  FileCode, AlertTriangle, Users, DollarSign, Calculator
} from 'lucide-react';
import { AiBackground } from '@/components/ui/ai-background';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { Footer } from '@/components/footer';
import { CheckoutModal } from '@/components/pricing/checkout-modal';

// Animation Variants for Framer Motion Heavy Animations
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0, 0, 0.2, 1] },
  },
};

const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0, 0, 0.2, 1] },
  },
};

export default function PricingPage() {
  const [isDark, setIsDark] = useState(true);
  const [isAnnual, setIsAnnual] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFaqCategory, setSelectedFaqCategory] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  
  // Interactive ROI Calculator State
  const [monthlyVisits, setMonthlyVisits] = useState<number>(50000);
  const [avgOrderValue, setAvgOrderValue] = useState<number>(150);

  // Calculated ROI values
  const roiMetrics = useMemo(() => {
    // Estimated 12% additional AI Search citation visits
    const aiVisitsGain = Math.round(monthlyVisits * 0.12);
    // Estimated 2.5% conversion rate on AI high-intent search traffic
    const estimatedNewOrders = Math.round(aiVisitsGain * 0.025);
    const monthlyRevenueGain = estimatedNewOrders * avgOrderValue;
    const planCost = isAnnual ? 3599 : 4499;
    const netProfit = monthlyRevenueGain - planCost;
    const roiMultiplier = Math.max(1, (monthlyRevenueGain / planCost)).toFixed(1);

    return {
      aiVisitsGain,
      estimatedNewOrders,
      monthlyRevenueGain,
      netProfit,
      roiMultiplier,
      planCost,
    };
  }, [monthlyVisits, avgOrderValue, isAnnual]);

  const faqs = [
    {
      category: 'billing',
      question: 'What is included in the $4,499 / month Enterprise GEO Dominator Plan?',
      answer: 'The flagship $4,499/mo plan is a full-service, white-glove GEO solution. It includes real-time citation tracking across all 6 major LLM engines (ChatGPT, Google Gemini, Claude, Perplexity, DeepSeek, and Grok), unlimited prompt simulations, automated JSON-LD schema generation and error repair, competitor displacement content briefs, real-time Share of Voice (SoV) alerts, and a dedicated Senior AI Strategist with direct Slack support.',
    },
    {
      category: 'billing',
      question: 'Can I cancel or switch my monthly subscription anytime?',
      answer: 'Yes! There are no long-term lock-in contracts for the monthly subscription. You can upgrade, downgrade, or cancel your subscription directly from your billing portal at any time with a single click.',
    },
    {
      category: 'roi',
      question: 'Is there a money-back guarantee for the Enterprise plan?',
      answer: 'Absolutely. We offer an unconditional 14-Day 100% Money-Back Guarantee. If our GEO & AEO audit platform and strategic schema recommendations do not provide actionable avenues to capture AI search citations within 14 days, we will refund your investment in full without hassle.',
    },
    {
      category: 'llms',
      question: 'Which LLM AI search engines does the platform scan and monitor?',
      answer: 'We continuously monitor and benchmark your brand across OpenAI ChatGPT-4o, Google Gemini 1.5 Pro & Search Overviews, Perplexity AI, Anthropic Claude 3.5 Sonnet, DeepSeek R1, and X/xAI Grok 2.',
    },
    {
      category: 'features',
      question: 'How does automated JSON-LD Schema repair work?',
      answer: 'Our proprietary schema engine parses your website source code, extracts microdata gaps, and generates perfectly validated JSON-LD schema markup for FAQPage, Organization, Product, and HowTo entities tailored specifically for LLM scraper bots.',
    },
    {
      category: 'roi',
      question: 'How fast can our brand expect to see increased citations in ChatGPT and Perplexity?',
      answer: 'Most enterprise clients experience initial citation inclusions within 14 to 21 days after implementing our generated JSON-LD entity markup and GEO content briefs. LLM crawlers re-index verified high-authority schemas rapidly.',
    },
    {
      category: 'features',
      question: 'Does the Enterprise plan support multiple sub-domains or regional brand entities?',
      answer: 'Yes! The Enterprise plan supports up to 5 distinct domain properties or regional brand entities under a single unified dashboard, complete with multi-user team role permissions.',
    },
  ];

  const filteredFaqs = useMemo(() => {
    if (selectedFaqCategory === 'all') return faqs;
    return faqs.filter((faq) => faq.category === selectedFaqCategory);
  }, [selectedFaqCategory]);

  return (
    <div className={`min-h-screen flex flex-col font-sans relative overflow-hidden transition-colors duration-500 ${isDark ? 'bg-[#0B0B0C] text-[#F6F6F4]' : 'bg-[#FCFCFB] text-[#181818]'}`}>
      {/* Top Fixed Champagne Scroll Progress Bar */}
      <ScrollProgress />

      <AiBackground isDark={isDark} />

      {/* Navigation Header */}
      <nav className={`border-b ${isDark ? 'border-white/10 bg-[#0B0B0C]/85' : 'border-[#E5E3DF] bg-[#FCFCFB]/85'} backdrop-blur-2xl sticky top-0 z-40 transition-colors`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className={`w-11 h-11 rounded-2xl ${
              isDark ? 'bg-gradient-to-tr from-[#B87333] to-[#C7A15A] text-[#111111] shadow-lg shadow-[#B87333]/20' : 'bg-[#B87333] text-white shadow-md'
            } flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}>
              <Brain className="w-5.5 h-5.5" />
            </div>
            <div className="flex flex-col">
              <span className={`font-extrabold text-xl tracking-tight ${isDark ? 'champagne-gradient-text' : 'text-[#181818]'}`}>
                TangentCore
              </span>
              <span className={`text-[10px] font-mono tracking-widest uppercase ${isDark ? 'text-[#B7B7B5]/60' : 'text-[#5C5C5C]/60'}`}>
                Enterprise GEO Suite
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-wide">
              <Link href="/" className={`${isDark ? 'text-[#B7B7B5] hover:text-white' : 'text-[#5C5C5C] hover:text-[#181818]'} transition-colors`}>
                Home
              </Link>
              <Link href="/pricing" className={`${isDark ? 'text-[#C7A15A] font-extrabold border-b-2 border-[#C7A15A]' : 'text-[#B87333] font-extrabold border-b-2 border-[#B87333]'} py-1`}>
                Pricing
              </Link>
              <Link href="/dashboard" className={`${isDark ? 'text-[#B7B7B5] hover:text-white' : 'text-[#5C5C5C] hover:text-[#181818]'} transition-colors`}>
                Dashboard
              </Link>
            </div>

            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2.5 rounded-2xl border ${isDark ? 'bg-[#121315] border-white/10 text-[#C7A15A]' : 'bg-white border-[#E5E3DF] text-[#B87333]'} transition-all text-xs font-bold flex items-center gap-2`}
            >
              {isDark ? <Sun className="w-4 h-4 text-[#C7A15A]" /> : <Moon className="w-4 h-4 text-[#B87333]" />}
              <span className="hidden sm:inline text-[11px] uppercase tracking-wider">{isDark ? 'Light' : 'Dark'}</span>
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl luxury-btn-primary font-bold text-xs shadow-lg shadow-[#C7A15A]/20 transition-all"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 w-full">
        
        {/* Hero Banner Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center max-w-3xl mx-auto space-y-6 pt-4 pb-8"
        >
          <motion.div
            variants={fadeInUpVariants}
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${
              isDark ? 'bg-[#181818] border-[#2A2A2A] text-[#D4AF37]' : 'bg-white border-slate-200 text-cyan-600'
            } border backdrop-blur-md text-xs font-bold shadow-md`}
          >
            <Sparkles className={`w-4 h-4 ${isDark ? 'text-[#D4AF37]' : 'text-cyan-500'} animate-pulse`} />
            <span>Generative Engine Optimization (GEO) Enterprise Plans</span>
          </motion.div>

          <motion.h1
            variants={fadeInUpVariants}
            className={`text-4xl sm:text-6xl font-black tracking-tight leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}
          >
            Dominate AI Search Citations Across{' '}
            <span className={isDark ? 'gold-gradient-text' : 'bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent underline decoration-cyan-500/40 underline-offset-8'}>
              Generative AI Engines
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUpVariants}
            className={`text-base sm:text-lg ${isDark ? 'text-[#CFCFCF]' : 'text-slate-600'} leading-relaxed`}
          >
            Capture brand recommendations, automate JSON-LD schemas, and outrank competitors across ChatGPT, Gemini, Perplexity, Claude, DeepSeek & Grok with our full-service GEO suite.
          </motion.p>

          {/* Billing Cycle Toggle */}
          <motion.div
            variants={scaleInVariants}
            className="pt-4 flex justify-center items-center"
          >
            <div className={`p-1.5 rounded-2xl border ${isDark ? 'bg-[#181818] border-[#2A2A2A]' : 'bg-slate-200/80 border-slate-300'} backdrop-blur-md inline-flex items-center gap-2 shadow-inner`}>
              <button
                onClick={() => setIsAnnual(false)}
                className={`relative px-6 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                  !isAnnual ? (isDark ? 'text-white' : 'text-slate-900') : (isDark ? 'text-[#9E9E9E] hover:text-white' : 'text-slate-600 hover:text-slate-900')
                }`}
              >
                {!isAnnual && (
                  <motion.div
                    layoutId="billing-pill"
                    className={`absolute inset-0 rounded-xl ${isDark ? 'bg-[#202020] border border-[#2A2A2A]' : 'bg-white shadow-md'} -z-10`}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span>Monthly Billing</span>
              </button>

              <button
                onClick={() => setIsAnnual(true)}
                className={`relative px-6 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                  isAnnual ? (isDark ? 'text-white' : 'text-slate-900') : (isDark ? 'text-[#9E9E9E] hover:text-white' : 'text-slate-600 hover:text-slate-900')
                }`}
              >
                {isAnnual && (
                  <motion.div
                    layoutId="billing-pill"
                    className={`absolute inset-0 rounded-xl ${isDark ? 'bg-[#202020] border border-[#2A2A2A]' : 'bg-white shadow-md'} -z-10`}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span>Annual Billing</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${isDark ? 'bg-[#D4AF37] text-[#111111]' : 'bg-emerald-500 text-white'}`}>
                  Save 20%
                </span>
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Supported AI Engine Badges */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="py-4 text-center"
        >
          <p className={`text-xs uppercase tracking-widest ${isDark ? 'text-[#9E9E9E]' : 'text-slate-500'} font-bold mb-4`}>
            Continuous Live Scanning Across 6 Major AI Search Engines
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 opacity-90">
            {['ChatGPT-4o', 'Google Gemini', 'Perplexity Pro', 'Claude 3.5', 'DeepSeek R1', 'xAI Grok 2'].map((engine) => (
              <motion.div
                key={engine}
                whileHover={{ scale: 1.05, y: -2 }}
                className={`px-4 py-2 rounded-xl border ${isDark ? 'bg-[#181818] border-[#2A2A2A] text-white hover:border-[#D4AF37]' : 'bg-white border-slate-200 text-slate-700'} text-xs font-bold flex items-center gap-2 shadow-sm`}
              >
                <Bot className={`w-4 h-4 ${isDark ? 'text-[#D4AF37]' : 'text-cyan-500'}`} />
                <span>{engine}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pricing Cards Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
          className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
        >
          
          {/* Card 1: Starter / Growth Tier */}
          <motion.div
            variants={scaleInVariants}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className={`rounded-3xl border ${
              isDark ? 'bg-[#181818] border-[#2A2A2A] hover-luxury-lift' : 'bg-white border-slate-200 shadow-xl'
            } p-7 sm:p-8 flex flex-col justify-between backdrop-blur-2xl relative`}
          >
            <div>
              {/* Header */}
              <div className="space-y-1">
                <span className={`text-[11px] font-bold uppercase tracking-wider ${isDark ? 'text-[#9E9E9E]' : 'text-slate-500'}`}>
                  Starter GEO Audit
                </span>
                <h3 className={`text-2xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Growth Tier
                </h3>
                <p className={`text-xs ${isDark ? 'text-[#CFCFCF]' : 'text-slate-600'} leading-relaxed min-h-[36px]`}>
                  Essential GEO scanning for single product launches & small businesses.
                </p>
              </div>

              {/* Price Box */}
              <div className={`my-6 p-4 rounded-2xl border ${
                isDark ? 'bg-[#0A0A0A] border-[#2A2A2A]' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-baseline gap-2">
                  <span className={`text-3xl sm:text-4xl font-black ${isDark ? 'gold-gradient-text' : 'text-slate-900'}`}>
                    {isAnnual ? '$1,499' : '$1,899'}
                  </span>
                  <span className={`text-xs font-semibold ${isDark ? 'text-[#9E9E9E]' : 'text-slate-500'}`}>
                    / month
                  </span>
                </div>
                <span className={`text-[11px] font-medium block mt-1 ${isDark ? 'text-[#9E9E9E]' : 'text-slate-500'}`}>
                  {isAnnual ? 'Billed annually' : 'Flexible monthly billing'}
                </span>
              </div>

              {/* Divider */}
              <div className={`w-full h-px ${isDark ? 'bg-[#2A2A2A]' : 'bg-slate-200'} mb-6`} />

              {/* Feature List */}
              <ul className="space-y-3.5 text-xs sm:text-sm font-medium">
                <li className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-md ${isDark ? 'bg-[#202020] text-[#D4AF37]' : 'bg-cyan-500/10 text-cyan-500'} flex items-center justify-center shrink-0 mt-0.5`}>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className={isDark ? 'text-white' : 'text-slate-700'}>
                    2 Monitored LLM Engines (ChatGPT & Perplexity)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-md ${isDark ? 'bg-[#202020] text-[#D4AF37]' : 'bg-cyan-500/10 text-cyan-500'} flex items-center justify-center shrink-0 mt-0.5`}>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className={isDark ? 'text-white' : 'text-slate-700'}>
                    Up to 25 Target Prompt Keywords
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-md ${isDark ? 'bg-[#202020] text-[#D4AF37]' : 'bg-cyan-500/10 text-cyan-500'} flex items-center justify-center shrink-0 mt-0.5`}>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className={isDark ? 'text-white' : 'text-slate-700'}>
                    Basic JSON-LD Schema Validation
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-md ${isDark ? 'bg-[#202020] text-[#D4AF37]' : 'bg-cyan-500/10 text-cyan-500'} flex items-center justify-center shrink-0 mt-0.5`}>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className={isDark ? 'text-white' : 'text-slate-700'}>
                    Weekly Citation Reports
                  </span>
                </li>
                <li className="flex items-start gap-3 text-slate-500 line-through">
                  <div className={`w-5 h-5 rounded-md ${isDark ? 'bg-[#0A0A0A] text-[#9E9E9E]' : 'bg-slate-100 text-slate-400'} flex items-center justify-center shrink-0 mt-0.5`}>
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <span>Automated Schema Auto-Repair</span>
                </li>
                <li className="flex items-start gap-3 text-slate-500 line-through">
                  <div className={`w-5 h-5 rounded-md ${isDark ? 'bg-[#0A0A0A] text-[#9E9E9E]' : 'bg-slate-100 text-slate-400'} flex items-center justify-center shrink-0 mt-0.5`}>
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <span>Dedicated Senior AI Strategist</span>
                </li>
              </ul>
            </div>

            {/* CTA Button */}
            <div className="mt-8">
              <button
                onClick={() => setIsModalOpen(true)}
                className={`w-full py-3.5 rounded-2xl border ${
                  isDark
                    ? 'luxury-btn-secondary'
                    : 'bg-slate-100 border-slate-300 hover:bg-slate-200 text-slate-900'
                } font-bold text-xs transition-all`}
              >
                Select Growth ($1,899/mo)
              </button>
            </div>
          </motion.div>

          {/* Card 2: FLAGSHIP ENTERPRISE PLAN ($4,499 / MO) */}
          <motion.div
            variants={scaleInVariants}
            whileHover={{ y: -8, scale: 1.015 }}
            transition={{ duration: 0.25 }}
            className={`rounded-3xl border-2 ${
              isDark ? 'bg-[#181818] border-[#D4AF37] shadow-2xl shadow-[#D4AF37]/15' : 'bg-white border-cyan-500 shadow-2xl shadow-cyan-500/20'
            } p-7 sm:p-8 flex flex-col justify-between backdrop-blur-2xl relative overflow-hidden`}
          >
            {/* Top Glow Accent Bar */}
            <div className={`absolute top-0 inset-x-0 h-1.5 ${isDark ? 'bg-gradient-to-r from-[#C8A951] via-[#D4AF37] to-[#F5D76E]' : 'bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600'} animate-pulse`} />

            <div>
              {/* Header */}
              <div className="space-y-1">
                <div className={`text-xs font-extrabold uppercase tracking-wider ${isDark ? 'text-[#D4AF37]' : 'text-cyan-500'} flex items-center gap-1.5`}>
                  <Star className={`w-4 h-4 ${isDark ? 'fill-[#D4AF37] text-[#D4AF37]' : 'fill-cyan-500 text-cyan-500'}`} />
                  <span>Flagship Enterprise Suite</span>
                </div>
                <h3 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  GEO Dominator
                </h3>
                <p className={`text-xs ${isDark ? 'text-[#CFCFCF]' : 'text-slate-600'} leading-relaxed min-h-[36px]`}>
                  Complete end-to-end platform for market leadership across all 6 generative engines.
                </p>
              </div>

              {/* Price Box */}
              <div className={`my-6 p-4 rounded-2xl border ${
                isDark ? 'bg-[#0A0A0A] border-[#D4AF37]/40' : 'bg-cyan-50/80 border-cyan-200'
              }`}>
                <div className="flex items-baseline gap-2">
                  <span className={`text-4xl sm:text-5xl font-black ${isDark ? 'gold-gradient-text' : 'text-slate-900'}`}>
                    {isAnnual ? '$3,599' : '$4,499'}
                  </span>
                  <span className={`text-xs font-semibold ${isDark ? 'text-[#9E9E9E]' : 'text-slate-600'}`}>
                    / month
                  </span>
                </div>
                <span className={`text-xs font-medium block mt-1 ${isDark ? 'text-[#9E9E9E]' : 'text-slate-500'}`}>
                  {isAnnual ? 'Save $10,800 annually (Billed $43,188/yr)' : 'Full Enterprise GEO Suite Access'}
                </span>
              </div>

              {/* Divider */}
              <div className={`w-full h-px ${isDark ? 'bg-[#2A2A2A]' : 'bg-slate-200'} mb-6`} />

              {/* Core Features Checklist */}
              <ul className="space-y-3.5 text-xs sm:text-sm font-medium">
                <li className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-md ${isDark ? 'bg-[#D4AF37] text-[#111111]' : 'bg-cyan-500/20 text-cyan-500'} flex items-center justify-center shrink-0 mt-0.5`}>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Full 6 Multi-LLM Continuous Engine Scanning
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-md ${isDark ? 'bg-[#202020] text-[#D4AF37]' : 'bg-cyan-500/20 text-cyan-500'} flex items-center justify-center shrink-0 mt-0.5`}>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className={isDark ? 'text-white' : 'text-slate-700'}>
                    Unlimited Target Prompts & Keywords
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-md ${isDark ? 'bg-[#202020] text-[#D4AF37]' : 'bg-cyan-500/20 text-cyan-500'} flex items-center justify-center shrink-0 mt-0.5`}>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className={`font-bold ${isDark ? 'text-[#D4AF37]' : 'text-cyan-500'}`}>
                    Automated JSON-LD Schema Injection & Repair
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-md ${isDark ? 'bg-[#202020] text-[#D4AF37]' : 'bg-cyan-500/20 text-cyan-500'} flex items-center justify-center shrink-0 mt-0.5`}>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className={isDark ? 'text-white' : 'text-slate-700'}>
                    Competitor Displacement Brief Generator
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-md ${isDark ? 'bg-[#202020] text-[#D4AF37]' : 'bg-cyan-500/20 text-cyan-500'} flex items-center justify-center shrink-0 mt-0.5`}>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className={isDark ? 'text-white' : 'text-slate-700'}>
                    Real-Time Share of Voice (SoV) Analytics & Webhooks
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-md ${isDark ? 'bg-[#202020] text-[#D4AF37]' : 'bg-cyan-500/20 text-cyan-500'} flex items-center justify-center shrink-0 mt-0.5`}>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className={isDark ? 'text-white' : 'text-slate-700'}>
                    Dedicated Senior GEO AI Strategist + Shared Slack
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-md ${isDark ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'bg-emerald-500/20 text-emerald-500'} flex items-center justify-center shrink-0 mt-0.5`}>
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <span className={`${isDark ? 'text-[#D4AF37]' : 'text-emerald-500'} font-bold`}>
                    14-Day 100% Money-Back Guarantee
                  </span>
                </li>
              </ul>
            </div>

            {/* CTA Button */}
            <div className="mt-8 space-y-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className={`w-full py-4 rounded-2xl ${
                  isDark ? 'luxury-btn-primary' : 'bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-white'
                } font-extrabold text-sm shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:scale-[1.02]`}
              >
                <Zap className={`w-4 h-4 fill-current ${isDark ? 'text-[#111111]' : 'text-white'}`} />
                <span>Get Started Now — {isAnnual ? '$3,599' : '$4,499'}/mo</span>
              </button>
              <div className={`text-[11px] text-center space-y-0.5 ${isDark ? 'text-[#9E9E9E]' : 'text-slate-500'}`}>
                <p className={`font-semibold ${isDark ? 'text-[#D4AF37]' : 'text-cyan-600'}`}>
                  ✓ Flexible monthly billing • Zero setup fees • Cancel anytime
                </p>
                <p>Priority scanning setup within 2 hours</p>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Custom Holding Company Tier */}
          <motion.div
            variants={scaleInVariants}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className={`rounded-3xl border ${
              isDark ? 'bg-[#181818] border-[#2A2A2A] hover-luxury-lift' : 'bg-white border-slate-200 shadow-xl'
            } p-7 sm:p-8 flex flex-col justify-between backdrop-blur-2xl relative`}
          >
            <div>
              {/* Header */}
              <div className="space-y-1">
                <span className={`text-[11px] font-bold uppercase tracking-wider ${isDark ? 'text-[#9E9E9E]' : 'text-slate-500'}`}>
                  Multi-Brand Enterprise
                </span>
                <h3 className={`text-2xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Holding Group
                </h3>
                <p className={`text-xs ${isDark ? 'text-[#CFCFCF]' : 'text-slate-600'} leading-relaxed min-h-[36px]`}>
                  Tailored GEO infrastructure for conglomerate portfolios & multi-domain brands.
                </p>
              </div>

              {/* Price Box */}
              <div className={`my-6 p-4 rounded-2xl border ${
                isDark ? 'bg-[#0A0A0A] border-[#2A2A2A]' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-baseline gap-2">
                  <span className={`text-3xl sm:text-4xl font-black ${isDark ? 'gold-gradient-text' : 'text-slate-900'}`}>
                    Custom
                  </span>
                  <span className={`text-xs font-semibold ${isDark ? 'text-[#9E9E9E]' : 'text-slate-500'}`}>
                    annual contract
                  </span>
                </div>
                <span className={`text-[11px] font-medium block mt-1 ${isDark ? 'text-[#9E9E9E]' : 'text-slate-500'}`}>
                  Volume discount for 5+ brand domains
                </span>
              </div>

              {/* Divider */}
              <div className={`w-full h-px ${isDark ? 'bg-slate-800' : 'bg-slate-200'} mb-6`} />

              {/* Feature List */}
              <ul className="space-y-3.5 text-xs sm:text-sm font-medium">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md bg-cyan-500/10 text-cyan-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className={isDark ? 'text-slate-200' : 'text-slate-700'}>
                    Unlimited Monitored Brands & Websites
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md bg-cyan-500/10 text-cyan-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className={isDark ? 'text-slate-200' : 'text-slate-700'}>
                    Custom LLM API Integrations
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md bg-cyan-500/10 text-cyan-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className={isDark ? 'text-slate-200' : 'text-slate-700'}>
                    White-Label Client Reporting Portal
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md bg-cyan-500/10 text-cyan-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className={isDark ? 'text-slate-200' : 'text-slate-700'}>
                    Dedicated Engineering Team & SLA
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md bg-cyan-500/10 text-cyan-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className={isDark ? 'text-slate-200' : 'text-slate-700'}>
                    Custom Security & Compliance (SOC2)
                  </span>
                </li>
              </ul>
            </div>

            {/* CTA Button */}
            <div className="mt-8">
              <button
                onClick={() => setIsModalOpen(true)}
                className={`w-full py-3.5 rounded-2xl border ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-white'
                    : 'bg-slate-100 border-slate-300 hover:bg-slate-200 text-slate-900'
                } font-bold text-xs transition-all`}
              >
                Contact Enterprise Sales
              </button>
            </div>
          </motion.div>

        </motion.div>

        {/* Benefits Breakdown Section */}
        <section className="mt-12 sm:mt-16">
          <div className={`p-8 sm:p-12 rounded-3xl border ${
            isDark ? 'bg-slate-900/50 border-slate-800/80 backdrop-blur-xl' : 'bg-slate-50/80 border-slate-200/90 shadow-xl'
          } space-y-8`}>
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto space-y-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Enterprise Features & Benefits</span>
              </div>
              <h2 className={`text-2xl sm:text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Why Enterprise Brands Invest in <span className="text-cyan-500">Generative Engine Optimization</span>
              </h2>
              <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'} leading-relaxed`}>
                Generative Engine Optimization is replacing traditional SEO. Here is how our platform ensures your brand is recommended first.
              </p>
            </div>

            {/* Feature Cards Grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              <motion.div variants={fadeInUpVariants} whileHover={{ y: -4 }} className={`p-5 sm:p-6 rounded-2xl border ${isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-white border-slate-200 shadow-md'} space-y-3`}>
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>6-LLM Multi-Model Monitoring</h3>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'} leading-relaxed`}>
                  Continuous automated prompt simulations across ChatGPT, Gemini, Perplexity, Claude, DeepSeek, and Grok to track Share of Voice (SoV).
                </p>
              </motion.div>

              <motion.div variants={fadeInUpVariants} whileHover={{ y: -4 }} className={`p-5 sm:p-6 rounded-2xl border ${isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-white border-slate-200 shadow-md'} space-y-3`}>
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
                  <FileCode className="w-5 h-5" />
                </div>
                <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Automated Schema Repair Engine</h3>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'} leading-relaxed`}>
                  Generate and auto-inject validated JSON-LD schema markup for FAQPage, Product, and Organization to enable direct AI answer extractions.
                </p>
              </motion.div>

              <motion.div variants={fadeInUpVariants} whileHover={{ y: -4 }} className={`p-5 sm:p-6 rounded-2xl border ${isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-white border-slate-200 shadow-md'} space-y-3`}>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Competitor Displacement Briefs</h3>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'} leading-relaxed`}>
                  Identify search queries where competitors hold citations and generate structured GEO content briefs to overtake their recommendations.
                </p>
              </motion.div>

              <motion.div variants={fadeInUpVariants} whileHover={{ y: -4 }} className={`p-5 sm:p-6 rounded-2xl border ${isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-white border-slate-200 shadow-md'} space-y-3`}>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Dedicated Senior AI Strategist</h3>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'} leading-relaxed`}>
                  Every Enterprise client is paired with an expert AI search strategist who conducts weekly prompt tuning and custom optimization audits.
                </p>
              </motion.div>

              <motion.div variants={fadeInUpVariants} whileHover={{ y: -4 }} className={`p-5 sm:p-6 rounded-2xl border ${isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-white border-slate-200 shadow-md'} space-y-3`}>
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>14-Day Money-Back Guarantee</h3>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'} leading-relaxed`}>
                  Try the flagship plan risk-free. If our GEO audit and automated schema engine don't deliver immediate clarity, get 100% refunded.
                </p>
              </motion.div>

              <motion.div variants={fadeInUpVariants} whileHover={{ y: -4 }} className={`p-5 sm:p-6 rounded-2xl border ${isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-white border-slate-200 shadow-md'} space-y-3`}>
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>256-Bit API & Webhook Alerts</h3>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'} leading-relaxed`}>
                  Integrate live citation alerts and Share of Voice metrics directly into Slack, Datadog, or your custom internal executive dashboards.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Interactive FAQ Accordion Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeInUpVariants}
          className="mt-12 sm:mt-16 space-y-8 max-w-4xl mx-auto"
        >
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Got Questions About Our <span className="text-cyan-500">Enterprise Pricing</span>?
            </h2>
            <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Everything you need to know about our billing, guarantees, and GEO technology.
            </p>
          </div>

          {/* FAQ Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { id: 'all', label: 'All Questions' },
              { id: 'billing', label: 'Billing & Subscriptions' },
              { id: 'roi', label: 'ROI & Guarantees' },
              { id: 'llms', label: 'LLM Engines' },
              { id: 'features', label: 'Schema & Features' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFaqCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedFaqCategory === tab.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                    : isDark
                    ? 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                    : 'bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-3">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-colors ${
                    isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                  } overflow-hidden`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm"
                  >
                    <span className={isDark ? 'text-slate-100' : 'text-slate-900'}>
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-cyan-500 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className={`px-5 pb-5 text-xs leading-relaxed border-t ${
                          isDark ? 'border-slate-800/60 text-slate-400' : 'border-slate-100 text-slate-600'
                        } pt-3`}>
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* Final Bottom Call-To-Action Banner */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={scaleInVariants}
          className="mt-12 sm:mt-16 mb-8"
        >
          <div className={`p-8 sm:p-14 rounded-3xl border-2 border-cyan-500/40 ${
            isDark ? 'bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 shadow-2xl shadow-cyan-500/20' : 'bg-gradient-to-r from-sky-50 via-cyan-50 to-blue-50 border-cyan-300'
          } text-center space-y-6 relative overflow-hidden`}>
            
            <div className="max-w-2xl mx-auto space-y-4">
              <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 inline-block">
                Start Dominating AI Citations Today
              </span>
              
              <h2 className={`text-3xl sm:text-5xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Ready for the <span className="bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 bg-clip-text text-transparent">Flagship Enterprise Pass</span>?
              </h2>

              <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'} leading-relaxed`}>
                Get full access to all 6 LLM scanners, automated schema repair, and your assigned Senior AI Strategist within 2 hours.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-sm shadow-xl shadow-cyan-500/30 transition-all flex items-center justify-center gap-2 transform hover:scale-105 cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Activate Priority Pass</span>
                </button>

                <Link
                  href="/dashboard"
                  className={`w-full sm:w-auto px-6 py-4 rounded-2xl border ${
                    isDark ? 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-300' : 'bg-white border-slate-300 hover:bg-slate-100 text-slate-700'
                  } font-bold text-xs transition-all flex items-center justify-center gap-2`}
                >
                  <span>Explore Live Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="pt-3 flex items-center justify-center gap-6 text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>14-Day Money Back</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-500" />
                  <span>2-Hour Onboarding</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-500" />
                  <span>Zero Lock-in Contract</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

      </main>

      {/* Shared Multi-Column Footer */}
      <Footer isDark={isDark} />

      {/* Interactive Checkout / Booking Modal */}
      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        planPrice={isAnnual ? '$3,599' : '$4,499'}
        isAnnual={isAnnual}
        isDark={isDark}
      />
    </div>
  );
}
