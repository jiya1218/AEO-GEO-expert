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
import { BrandLogo } from '@/components/ui/brand-logo';

// Animation Variants for Framer Motion
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function PricingPage() {
  const [isDark, setIsDark] = useState(true);
  const [isAnnual, setIsAnnual] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlanPrice, setSelectedPlanPrice] = useState('$149');
  const [selectedFaqCategory, setSelectedFaqCategory] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  
  // Interactive ROI Calculator State
  const [monthlyVisits, setMonthlyVisits] = useState<number>(50000);
  const [avgOrderValue, setAvgOrderValue] = useState<number>(120);

  // Calculated ROI values
  const roiMetrics = useMemo(() => {
    const aiVisitsGain = Math.round(monthlyVisits * 0.14);
    const estimatedNewOrders = Math.round(aiVisitsGain * 0.028);
    const monthlyRevenueGain = estimatedNewOrders * avgOrderValue;
    const planCost = isAnnual ? 119 : 149;
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

  const customerReviews = [
    {
      name: 'Marcus Vance',
      role: 'VP of Digital Growth',
      company: 'Apex Global SaaS',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      rating: 5,
      metric: '+380% ChatGPT Citations',
      review: 'TangentCore completely transformed our AI search presence. Within 3 weeks of implementing their schema fixes, our SaaS platform became the #1 recommended solution across ChatGPT software evaluation prompts.',
    },
    {
      name: 'Elena Rostova',
      role: 'Chief Marketing Officer',
      company: 'Soma Health',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
      rating: 5,
      metric: '4.8x Share of Voice Lift',
      review: 'The automated JSON-LD schema repair and competitor displacement content briefs gave our team the exact playbook needed to outrank legacy competitors on Perplexity and Gemini.',
    },
    {
      name: 'David Chen',
      role: 'Head of SEO & AEO',
      company: 'Krypton E-Commerce',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      rating: 5,
      metric: '94.2% AI Recommendation Rate',
      review: 'We tried traditional SEO agencies for months with zero impact on AI search answers. TangentCore solved our entity mapping issues in 48 hours. The ROI on the $149/mo Growth plan is incredible.',
    },
  ];

  const faqs = [
    {
      category: 'billing',
      question: 'What is included in the $149 / month Growth Dominator Plan?',
      answer: 'The flagship $149/mo plan includes continuous scanning across all 6 major LLM engines (ChatGPT, Google Gemini, Claude, Perplexity, DeepSeek, Grok), up to 100 target prompt keywords, automated JSON-LD schema auto-repair, real-time Share of Voice tracking, and competitor displacement content briefs.',
    },
    {
      category: 'billing',
      question: 'Can I switch or cancel my subscription anytime?',
      answer: 'Yes! There are no long-term contracts for monthly subscriptions. You can upgrade, downgrade, or cancel your subscription anytime directly from your billing portal with one click.',
    },
    {
      category: 'roi',
      question: 'Is there a money-back guarantee?',
      answer: 'Yes. We offer an unconditional 14-Day 100% Money-Back Guarantee on all plans. If our GEO audit and schema recommendations do not provide actionable clarity to improve AI citations, we will refund your investment in full.',
    },
    {
      category: 'llms',
      question: 'Which LLM search engines are monitored?',
      answer: 'We continuously monitor OpenAI ChatGPT-4o, Google Gemini 1.5, Perplexity Pro, Anthropic Claude 3.5, DeepSeek R1, and xAI Grok 2.',
    },
  ];

  const filteredFaqs = useMemo(() => {
    if (selectedFaqCategory === 'all') return faqs;
    return faqs.filter((faq) => faq.category === selectedFaqCategory);
  }, [selectedFaqCategory]);

  const handleOpenCheckout = (priceStr: string) => {
    setSelectedPlanPrice(priceStr);
    setIsModalOpen(true);
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans relative overflow-hidden transition-colors duration-500 ${isDark ? 'bg-[#0B0B0C] text-[#F6F6F4]' : 'bg-[#FCFCFB] text-[#181818]'}`}>
      {/* Top Fixed Champagne Scroll Progress Bar */}
      <ScrollProgress />

      <AiBackground isDark={isDark} />

      {/* Navigation Header */}
      <nav className={`border-b ${isDark ? 'border-white/10 bg-[#0B0B0C]/85' : 'border-[#E5E3DF] bg-[#FCFCFB]/85'} backdrop-blur-2xl sticky top-0 z-40 transition-colors`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <BrandLogo isDark={isDark} size="md" subtitle="INTELLIGENT ROUTING ENGINE" />

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
              onClick={() => handleOpenCheckout(isAnnual ? '$119' : '$149')}
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
          className="text-center max-w-3xl mx-auto space-y-5 py-6"
        >
          <motion.div
            variants={fadeInUpVariants}
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-mono font-bold ${
              isDark ? 'bg-[#121315] border-white/10 text-[#C7A15A]' : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#B87333]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C7A15A] animate-pulse" />
            <span>TRANSPARENT ENTERPRISE GEO PLANS</span>
          </motion.div>

          <motion.h1
            variants={fadeInUpVariants}
            className={`text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight ${isDark ? 'text-[#F6F6F4]' : 'text-[#181818]'}`}
          >
            Dominate AI Search Citations Across{' '}
            <span className={isDark ? 'champagne-gradient-text' : 'text-[#B87333]'}>
              All Generative Engines
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUpVariants}
            className={`text-base sm:text-lg ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'} leading-relaxed`}
          >
            Capture brand recommendations, automate JSON-LD schemas, and outrank competitors across ChatGPT, Gemini, Perplexity, Claude, DeepSeek & Grok.
          </motion.p>

          {/* Billing Cycle Toggle */}
          <motion.div
            variants={scaleInVariants}
            className="pt-4 flex justify-center items-center"
          >
            <div className={`p-1.5 rounded-2xl border ${isDark ? 'bg-[#121315] border-white/10' : 'bg-[#F6F5F3] border-[#E5E3DF]'} backdrop-blur-md inline-flex items-center gap-2 shadow-inner`}>
              <button
                onClick={() => setIsAnnual(false)}
                className={`relative px-6 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  !isAnnual ? (isDark ? 'text-white font-extrabold' : 'text-[#181818] font-extrabold') : (isDark ? 'text-[#B7B7B5] hover:text-white' : 'text-[#5C5C5C] hover:text-[#181818]')
                }`}
              >
                {!isAnnual && (
                  <motion.div
                    layoutId="billing-pill"
                    className={`absolute inset-0 rounded-xl ${isDark ? 'bg-[#242529] border border-white/10' : 'bg-white shadow-md'} -z-10`}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span>Monthly Billing</span>
              </button>

              <button
                onClick={() => setIsAnnual(true)}
                className={`relative px-6 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                  isAnnual ? (isDark ? 'text-white font-extrabold' : 'text-[#181818] font-extrabold') : (isDark ? 'text-[#B7B7B5] hover:text-white' : 'text-[#5C5C5C] hover:text-[#181818]')
                }`}
              >
                {isAnnual && (
                  <motion.div
                    layoutId="billing-pill"
                    className={`absolute inset-0 rounded-xl ${isDark ? 'bg-[#242529] border border-white/10' : 'bg-white shadow-md'} -z-10`}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span>Annual Billing</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-extrabold bg-[#C7A15A] text-[#111111]">
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
          <p className={`text-xs uppercase tracking-widest ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'} font-mono font-bold mb-4`}>
            Continuous Live Scanning Across 6 Major AI Search Engines
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 opacity-90">
            {['ChatGPT-4o', 'Google Gemini', 'Perplexity Pro', 'Claude 3.5', 'DeepSeek R1', 'xAI Grok 2'].map((engine) => (
              <motion.div
                key={engine}
                whileHover={{ scale: 1.05, y: -2 }}
                className={`px-4 py-2 rounded-2xl border ${isDark ? 'bg-[#1B1C1F] border-white/10 text-white hover:border-[#C7A15A]' : 'bg-white border-[#E5E3DF] text-[#181818]'} text-xs font-mono font-bold flex items-center gap-2 shadow-xs`}
              >
                <Bot className="w-4 h-4 text-[#C7A15A]" />
                <span>{engine}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>


        {/* THE 3 EXACT PRICING PLANS GRID ($39, $149, $399) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
          className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
        >
          
          {/* Plan 1: Starter GEO ($39/mo) */}
          <motion.div
            variants={scaleInVariants}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className={`rounded-3xl border ${
              isDark ? 'bg-[#1B1C1F] border-white/10 hover-luxury-lift' : 'bg-white border-[#E5E3DF] shadow-xl'
            } p-7 sm:p-8 flex flex-col justify-between backdrop-blur-2xl relative`}
          >
            <div>
              {/* Header */}
              <div className="space-y-1">
                <span className={`text-[11px] font-mono font-bold uppercase tracking-wider ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
                  Starter GEO Audit
                </span>
                <h3 className={`text-2xl font-extrabold ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                  Starter Plan
                </h3>
                <p className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'} leading-relaxed min-h-[36px]`}>
                  Essential GEO scanning for startups & single product websites.
                </p>
              </div>

              {/* Price Box */}
              <div className={`my-6 p-4 rounded-2xl border ${
                isDark ? 'bg-[#121315] border-white/10' : 'bg-[#F6F5F3] border-[#E5E3DF]'
              }`}>
                <div className="flex items-baseline gap-2">
                  <span className={`text-4xl font-black ${isDark ? 'champagne-gradient-text' : 'text-[#181818]'}`}>
                    {isAnnual ? '$31' : '$39'}
                  </span>
                  <span className={`text-xs font-semibold ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
                    / month
                  </span>
                </div>
                <span className={`text-[11px] font-medium block mt-1 ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
                  {isAnnual ? 'Billed $372 annually' : 'Flexible monthly billing'}
                </span>
              </div>

              {/* Divider */}
              <div className={`w-full h-px ${isDark ? 'bg-white/10' : 'bg-[#E5E3DF]'} mb-6`} />

              {/* Feature List */}
              <ul className="space-y-3.5 text-xs sm:text-sm font-medium">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md bg-[#B87333]/15 text-[#C7A15A] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className={isDark ? 'text-white' : 'text-[#181818]'}>
                    2 Monitored LLMs (ChatGPT & Perplexity)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md bg-[#B87333]/15 text-[#C7A15A] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className={isDark ? 'text-white' : 'text-[#181818]'}>
                    Up to 15 Target Prompt Keywords
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md bg-[#B87333]/15 text-[#C7A15A] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className={isDark ? 'text-white' : 'text-[#181818]'}>
                    Basic JSON-LD Schema Validation
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md bg-[#B87333]/15 text-[#C7A15A] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className={isDark ? 'text-white' : 'text-[#181818]'}>
                    Weekly Citation Email Summary
                  </span>
                </li>
                <li className="flex items-start gap-3 opacity-40 line-through">
                  <div className="w-5 h-5 rounded-md bg-white/5 text-[#B7B7B5] flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <span>Automated Schema Auto-Repair</span>
                </li>
              </ul>
            </div>

            {/* CTA Button */}
            <div className="mt-8">
              <button
                onClick={() => handleOpenCheckout(isAnnual ? '$31' : '$39')}
                className="w-full py-3.5 rounded-2xl luxury-btn-secondary font-bold text-xs transition-all"
              >
                Select Starter Plan ($39/mo)
              </button>
            </div>
          </motion.div>

          {/* Plan 2: FLAGSHIP GROWTH DOMINATOR ($149/mo) - MOST POPULAR */}
          <motion.div
            variants={scaleInVariants}
            whileHover={{ y: -8, scale: 1.015 }}
            transition={{ duration: 0.25 }}
            className={`rounded-3xl border-2 ${
              isDark ? 'bg-[#1B1C1F] border-[#C7A15A] shadow-2xl shadow-[#C7A15A]/15' : 'bg-white border-[#B87333] shadow-2xl'
            } p-7 sm:p-8 flex flex-col justify-between backdrop-blur-2xl relative overflow-hidden`}
          >
            {/* Top Glow Accent Bar */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#B87333] via-[#C7A15A] to-[#F5E8C7] animate-pulse" />

            <div>
              {/* Header */}
              <div className="space-y-1">
                <div className="text-xs font-mono font-extrabold uppercase tracking-wider text-[#C7A15A] flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-[#C7A15A] text-[#C7A15A]" />
                  <span>Flagship Most Popular</span>
                </div>
                <h3 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                  Growth Dominator
                </h3>
                <p className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'} leading-relaxed min-h-[36px]`}>
                  Complete GEO suite for growing brands seeking #1 recommendations on AI search.
                </p>
              </div>

              {/* Price Box */}
              <div className={`my-6 p-4 rounded-2xl border ${
                isDark ? 'bg-[#121315] border-[#C7A15A]/40' : 'bg-[#F6F5F3] border-[#B87333]/30'
              }`}>
                <div className="flex items-baseline gap-2">
                  <span className={`text-4xl sm:text-5xl font-black ${isDark ? 'champagne-gradient-text' : 'text-[#181818]'}`}>
                    {isAnnual ? '$119' : '$149'}
                  </span>
                  <span className={`text-xs font-semibold ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
                    / month
                  </span>
                </div>
                <span className={`text-xs font-medium block mt-1 ${isDark ? 'text-[#C7A15A]' : 'text-[#B87333]'}`}>
                  {isAnnual ? 'Save $360 annually (Billed $1,428/yr)' : 'Full Multi-LLM GEO Suite Access'}
                </span>
              </div>

              {/* Divider */}
              <div className={`w-full h-px ${isDark ? 'bg-white/10' : 'bg-[#E5E3DF]'} mb-6`} />

              {/* Core Features Checklist */}
              <ul className="space-y-3.5 text-xs sm:text-sm font-medium">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md bg-[#C7A15A] text-[#111111] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className={`font-bold ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                    All 6 Multi-LLM Engines (ChatGPT, Gemini, Perplexity, Claude, DeepSeek, Grok)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md bg-[#B87333]/20 text-[#C7A15A] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className={isDark ? 'text-white' : 'text-[#181818]'}>
                    Up to 100 Target Prompt Keywords
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md bg-[#B87333]/20 text-[#C7A15A] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="font-bold text-[#C7A15A]">
                    Automated JSON-LD Schema Auto-Repair
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md bg-[#B87333]/20 text-[#C7A15A] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className={isDark ? 'text-white' : 'text-[#181818]'}>
                    Competitor Displacement Brief Generator
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md bg-[#B87333]/20 text-[#C7A15A] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className={isDark ? 'text-white' : 'text-[#181818]'}>
                    Real-Time Share of Voice (SoV) Analytics
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md bg-[#C7A15A]/20 text-[#C7A15A] flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[#C7A15A] font-bold">
                    14-Day 100% Money-Back Guarantee
                  </span>
                </li>
              </ul>
            </div>

            {/* CTA Button */}
            <div className="mt-8 space-y-2">
              <button
                onClick={() => handleOpenCheckout(isAnnual ? '$119' : '$149')}
                className="w-full py-4 rounded-2xl luxury-btn-primary font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer transform hover:scale-[1.02]"
              >
                <Zap className="w-4 h-4 fill-[#111111] text-[#111111]" />
                <span>Get Started Now — {isAnnual ? '$119' : '$149'}/mo</span>
              </button>
              <div className={`text-[11px] text-center ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
                <p className="font-bold text-[#C7A15A]">
                  ✓ Flexible monthly billing • Zero setup fees • Cancel anytime
                </p>
              </div>
            </div>
          </motion.div>

          {/* Plan 3: Enterprise Scale ($399/mo) */}
          <motion.div
            variants={scaleInVariants}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className={`rounded-3xl border ${
              isDark ? 'bg-[#1B1C1F] border-white/10 hover-luxury-lift' : 'bg-white border-[#E5E3DF] shadow-xl'
            } p-7 sm:p-8 flex flex-col justify-between backdrop-blur-2xl relative`}
          >
            <div>
              {/* Header */}
              <div className="space-y-1">
                <span className={`text-[11px] font-mono font-bold uppercase tracking-wider ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
                  Multi-Brand Enterprise
                </span>
                <h3 className={`text-2xl font-extrabold ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                  Enterprise Scale
                </h3>
                <p className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'} leading-relaxed min-h-[36px]`}>
                  Tailored GEO infrastructure for agencies & multi-domain portfolios.
                </p>
              </div>

              {/* Price Box */}
              <div className={`my-6 p-4 rounded-2xl border ${
                isDark ? 'bg-[#121315] border-white/10' : 'bg-[#F6F5F3] border-[#E5E3DF]'
              }`}>
                <div className="flex items-baseline gap-2">
                  <span className={`text-3xl sm:text-4xl font-black ${isDark ? 'champagne-gradient-text' : 'text-[#181818]'}`}>
                    {isAnnual ? '$319' : '$399'}
                  </span>
                  <span className={`text-xs font-semibold ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
                    / month
                  </span>
                </div>
                <span className={`text-[11px] font-medium block mt-1 ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
                  {isAnnual ? 'Billed $3,828 annually' : 'Flexible monthly contract'}
                </span>
              </div>

              {/* Divider */}
              <div className={`w-full h-px ${isDark ? 'bg-white/10' : 'bg-[#E5E3DF]'} mb-6`} />

              {/* Feature List */}
              <ul className="space-y-3.5 text-xs sm:text-sm font-medium">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md bg-[#B87333]/15 text-[#C7A15A] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className={isDark ? 'text-[#F6F6F4]' : 'text-[#181818]'}>
                    Unlimited Monitored Brands (5 Domains)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md bg-[#B87333]/15 text-[#C7A15A] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className={isDark ? 'text-[#F6F6F4]' : 'text-[#181818]'}>
                    Unlimited Target Prompts & Keywords
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md bg-[#B87333]/15 text-[#C7A15A] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className={isDark ? 'text-[#F6F6F4]' : 'text-[#181818]'}>
                    Automated Schema Injection Webhooks
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md bg-[#B87333]/15 text-[#C7A15A] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className={isDark ? 'text-[#F6F6F4]' : 'text-[#181818]'}>
                    Dedicated Senior GEO AI Strategist
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md bg-[#B87333]/15 text-[#C7A15A] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className={isDark ? 'text-[#F6F6F4]' : 'text-[#181818]'}>
                    Priority Slack Support & SOC2 Compliance
                  </span>
                </li>
              </ul>
            </div>

            {/* CTA Button */}
            <div className="mt-8">
              <button
                onClick={() => handleOpenCheckout(isAnnual ? '$319' : '$399')}
                className="w-full py-3.5 rounded-2xl luxury-btn-secondary font-bold text-xs transition-all"
              >
                Select Enterprise ($399/mo)
              </button>
            </div>
          </motion.div>

        </motion.div>


        {/* CUSTOMER REVIEWS & TESTIMONIALS SECTION */}
        <section className="mt-28 sm:mt-36">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-12"
          >
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-[#B87333]/15 text-[#C7A15A] border border-[#B87333]/30">
                <Star className="w-3.5 h-3.5 fill-[#C7A15A]" />
                <span>CUSTOMER PROOF & REVIEWS</span>
              </div>
              <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                Loved by High-Growth AI Pioneers
              </h2>
              <p className={`text-xs sm:text-sm ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
                See how marketing leaders and growth executives capture direct recommendations across ChatGPT & Perplexity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {customerReviews.map((rev, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUpVariants}
                  whileHover={{ y: -6 }}
                  className={`p-8 rounded-3xl border ${
                    isDark ? 'bg-[#1B1C1F] border-white/10 hover-luxury-lift' : 'bg-white border-[#E5E3DF] shadow-xl'
                  } space-y-6 flex flex-col justify-between`}
                >
                  <div className="space-y-4">
                    {/* Rating & Metric Badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[#C7A15A]">
                        {Array.from({ length: rev.rating }).map((_, rIdx) => (
                          <Star key={rIdx} className="w-4 h-4 fill-[#C7A15A]" />
                        ))}
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-[#C7A15A]/15 text-[#C7A15A] text-[10px] font-mono font-bold">
                        {rev.metric}
                      </span>
                    </div>

                    <p className={`text-xs sm:text-sm leading-[1.7] italic ${isDark ? 'text-[#F6F6F4]' : 'text-[#181818]'}`}>
                      &quot;{rev.review}&quot;
                    </p>
                  </div>

                  {/* Author Meta */}
                  <div className="pt-4 border-t border-white/10 flex items-center gap-3.5">
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      className="w-10 h-10 rounded-full object-cover border border-[#C7A15A]"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-[#C7A15A]">{rev.name}</h4>
                      <span className={`text-[11px] block ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
                        {rev.role}, <strong className={isDark ? 'text-white' : 'text-[#181818]'}>{rev.company}</strong>
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>


        {/* INTERACTIVE ROI ESTIMATOR CALCULATOR */}
        <section className="mt-28 sm:mt-36">
          <div className={`p-8 sm:p-12 rounded-3xl border ${
            isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-white border-[#E5E3DF] shadow-2xl'
          } space-y-8`}>
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-[#C7A15A]/15 text-[#C7A15A] border border-[#C7A15A]/30">
                <Calculator className="w-3.5 h-3.5 text-[#C7A15A]" />
                <span>INTERACTIVE REVENUE CALCULATOR</span>
              </div>
              <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                Calculate Your AI Search ROI
              </h2>
              <p className={`text-xs sm:text-sm ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
                Estimate additional revenue generated when your domain is cited in ChatGPT & Perplexity.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Controls */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-mono font-bold mb-2">
                    <span className={isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}>Monthly Domain Traffic</span>
                    <span className="text-[#C7A15A] font-extrabold">{monthlyVisits.toLocaleString()} visits</span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="500000"
                    step="5000"
                    value={monthlyVisits}
                    onChange={(e) => setMonthlyVisits(Number(e.target.value))}
                    className="w-full accent-[#C7A15A] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono font-bold mb-2">
                    <span className={isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}>Average Order / Deal Value (AOV)</span>
                    <span className="text-[#C7A15A] font-extrabold">${avgOrderValue}</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="1000"
                    step="10"
                    value={avgOrderValue}
                    onChange={(e) => setAvgOrderValue(Number(e.target.value))}
                    className="w-full accent-[#C7A15A] cursor-pointer"
                  />
                </div>
              </div>

              {/* Calculated Outputs Box */}
              <div className="lg:col-span-6">
                <div className={`p-6 sm:p-8 rounded-2xl border ${
                  isDark ? 'bg-[#121315] border-white/10' : 'bg-[#F6F5F3] border-[#E5E3DF]'
                } space-y-6 text-center`}>
                  <span className="text-xs font-mono text-[#B87333] font-bold uppercase">Estimated Monthly Revenue Lift</span>
                  <div className="text-4xl sm:text-5xl font-black champagne-gradient-text">
                    +${roiMetrics.monthlyRevenueGain.toLocaleString()}
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono pt-4 border-t border-white/10">
                    <div>
                      <span className="text-[#B7B7B5] block">AI Citation Traffic Lift</span>
                      <strong className="text-white text-sm">+{roiMetrics.aiVisitsGain.toLocaleString()} visits</strong>
                    </div>
                    <div>
                      <span className="text-[#B7B7B5] block">Estimated ROI</span>
                      <strong className="text-[#C7A15A] text-sm">{roiMetrics.roiMultiplier}x Return</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Interactive FAQ Accordion Section */}
        <section className="mt-28 sm:mt-36 space-y-8 max-w-4xl mx-auto">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-[#C7A15A]/15 text-[#C7A15A] border border-[#C7A15A]/30">
              <HelpCircle className="w-3.5 h-3.5 text-[#C7A15A]" />
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#181818]'}`}>
              Got Questions About Our <span className="text-[#C7A15A]">Pricing</span>?
            </h2>
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-colors ${
                    isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-white border-[#E5E3DF] shadow-xs'
                  } overflow-hidden`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm"
                  >
                    <span className={isDark ? 'text-white' : 'text-[#181818]'}>
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#C7A15A] transition-transform duration-200 shrink-0 ${
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
                        <div className={`px-5 pb-5 text-xs sm:text-sm leading-relaxed border-t ${
                          isDark ? 'border-white/10 text-[#B7B7B5]' : 'border-[#E5E3DF] text-[#5C5C5C]'
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
        </section>

      </main>

      {/* Shared Multi-Column Footer */}
      <Footer isDark={isDark} />

      {/* Interactive Checkout Modal */}
      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        planPrice={selectedPlanPrice}
        isAnnual={isAnnual}
      />
    </div>
  );
}
