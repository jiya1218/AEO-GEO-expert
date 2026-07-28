'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Building2, TrendingUp, CheckCircle2, ArrowRight, Sparkles, 
  Star, ShieldCheck, Award, Layers, Bot, Download, ChevronRight, FileText
} from 'lucide-react';
import { AiBackground } from '@/components/ui/ai-background';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { BrandLogo } from '@/components/ui/brand-logo';
import { Footer } from '@/components/footer';

const caseStudies = [
  {
    slug: 'apex-global-saas',
    company: 'Apex Global',
    industry: 'Enterprise SaaS',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400',
    headline: '+380% Increase in ChatGPT Software Recommendations in 3 Weeks',
    challenge: 'Apex Global was completely missing from generative answer outputs when enterprise buyers prompted ChatGPT for "best enterprise CRM software with SOC2 compliance".',
    solution: 'Engineered Organization and Product JSON-LD schemas, injected entity density data layers, and generated competitor displacement briefs targeting legacy CRM competitors.',
    metrics: [
      { label: 'ChatGPT Citation Share', value: '84%' },
      { label: 'Share of Voice Lift', value: '4.8x' },
      { label: 'Prompt Queries Captured', value: '142' },
    ],
    testimonial: 'TangentCore completely transformed our AI search presence. Within 3 weeks of implementing their schema fixes, our SaaS platform became the #1 recommended solution across ChatGPT software evaluation prompts.',
    author: 'Marcus Vance',
    role: 'VP of Digital Growth',
  },
  {
    slug: 'soma-health-telemedicine',
    company: 'Soma Health',
    industry: 'Healthcare & Life Sciences',
    logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400',
    headline: '100% Medical Entity Schema Accuracy Across Perplexity & Gemini',
    challenge: 'Inaccurate medical entity parsing caused Google Gemini and Perplexity Pro to omit Soma Health from clinical telehealth prompts.',
    solution: 'Implemented MedicalWebPage and MedicalCondition schema validation, structured clinical trial citation matrices, and automated continuous LLM monitoring.',
    metrics: [
      { label: 'Perplexity Citation Rank', value: '#1' },
      { label: 'Medical Schema Accuracy', value: '100%' },
      { label: 'Organic AI Referral Traffic', value: '+290%' },
    ],
    testimonial: 'The automated JSON-LD schema repair and competitor displacement content briefs gave our team the exact playbook needed to outrank legacy competitors on Perplexity and Gemini.',
    author: 'Elena Rostova',
    role: 'Chief Marketing Officer',
  },
  {
    slug: 'krypton-ecommerce',
    company: 'Krypton E-Commerce',
    industry: 'Global E-Commerce & Retail',
    logo: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=400',
    headline: '94.2% AI Buying Guide Recommendation Rate Across 6 Engines',
    challenge: 'Krypton lost millions in holiday retail revenue because AI search overviews recommended rival luxury luggage brands.',
    solution: 'Integrated real-time product inventory vector feed, automated FAQPage schema injection, and monitored 200 high-intent purchasing prompts.',
    metrics: [
      { label: 'Recommendation Share', value: '94.2%' },
      { label: 'Engines Monitored', value: '6 / 6' },
      { label: 'Attributed AI Sales', value: '+$1.4M' },
    ],
    testimonial: 'We tried traditional SEO agencies for months with zero impact on AI search answers. TangentCore solved our entity mapping issues in 48 hours. The ROI on the $149/mo Growth plan is incredible.',
    author: 'David Chen',
    role: 'Head of SEO & AEO',
  },
];

export default function CaseStudiesPage() {
  const [isDark, setIsDark] = useState(true);
  const [selectedIndustry, setSelectedIndustry] = useState('All');

  const industries = ['All', 'Enterprise SaaS', 'Healthcare & Life Sciences', 'Global E-Commerce & Retail'];

  const filteredStudies = selectedIndustry === 'All'
    ? caseStudies
    : caseStudies.filter((cs) => cs.industry === selectedIndustry);

  return (
    <div className={`min-h-screen flex flex-col font-sans relative overflow-hidden transition-colors duration-500 ${isDark ? 'bg-[#0B0B0C] text-[#F6F6F4]' : 'bg-[#FCFCFB] text-[#181818]'}`}>
      <ScrollProgress />
      <AiBackground isDark={isDark} />

      {/* Navigation Header */}
      <nav className={`border-b ${isDark ? 'border-white/10 bg-[#0B0B0C]/85' : 'border-[#E5E3DF] bg-[#FCFCFB]/85'} backdrop-blur-2xl sticky top-0 z-40 transition-colors`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <BrandLogo isDark={isDark} size="md" subtitle="INTELLIGENT ROUTING ENGINE" />

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-8 text-xs font-bold tracking-wide uppercase">
              <Link href="/" className={`${isDark ? 'text-[#B7B7B5] hover:text-white' : 'text-[#5C5C5C] hover:text-[#181818]'} transition-colors`}>
                Home
              </Link>
              <Link href="/pricing" className={`${isDark ? 'text-[#B7B7B5] hover:text-white' : 'text-[#5C5C5C] hover:text-[#181818]'} transition-colors`}>
                Pricing
              </Link>
              <Link href="/case-studies" className={`${isDark ? 'text-[#C7A15A] font-extrabold border-b-2 border-[#C7A15A]' : 'text-[#B87333] font-extrabold border-b-2 border-[#B87333]'} py-1`}>
                Case Studies
              </Link>
              <Link href="/blog" className={`${isDark ? 'text-[#B7B7B5] hover:text-white' : 'text-[#5C5C5C] hover:text-[#181818]'} transition-colors`}>
                Blog
              </Link>
              <Link href="/dashboard" className={`${isDark ? 'text-[#B7B7B5] hover:text-white' : 'text-[#5C5C5C] hover:text-[#181818]'} transition-colors`}>
                Dashboard
              </Link>
            </div>

            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2.5 rounded-2xl border ${isDark ? 'bg-[#121315] border-white/10 text-[#C7A15A]' : 'bg-white border-[#E5E3DF] text-[#B87333]'} transition-all text-xs font-bold flex items-center gap-2`}
            >
              <span>{isDark ? 'Light' : 'Dark'}</span>
            </button>

            <Link
              href="/dashboard"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl luxury-btn-primary font-bold text-xs shadow-lg shadow-[#C7A15A]/20"
            >
              <span>Start Free Audit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 w-full">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-mono font-bold bg-[#121315] border-white/10 text-[#C7A15A]">
            <Award className="w-3.5 h-3.5 text-[#C7A15A]" />
            <span>VERIFIED ENTERPRISE RESULTS</span>
          </div>
          <h1 className={`text-4xl sm:text-6xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#181818]'}`}>
            How Industry Leaders Win <span className="champagne-gradient-text">AI Search Citations</span>
          </h1>
          <p className={`text-base sm:text-lg ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
            Explore real-world case studies demonstrating how enterprise brands capture #1 recommendations across ChatGPT, Perplexity, Gemini & Claude.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {industries.map((ind) => (
            <button
              key={ind}
              onClick={() => setSelectedIndustry(ind)}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                selectedIndustry === ind
                  ? 'bg-[#C7A15A] text-[#111111] shadow-md'
                  : isDark
                  ? 'bg-[#121315] text-[#B7B7B5] hover:text-white border border-white/10'
                  : 'bg-[#F6F5F3] text-[#5C5C5C] hover:text-[#181818] border border-[#E5E3DF]'
              }`}
            >
              {ind}
            </button>
          ))}
        </div>

        {/* Case Studies Stack */}
        <div className="space-y-12">
          {filteredStudies.map((cs, idx) => (
            <motion.div
              key={cs.slug}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`p-8 sm:p-12 rounded-3xl border ${
                isDark ? 'bg-[#1B1C1F] border-white/10 hover-luxury-lift' : 'bg-white border-[#E5E3DF] shadow-2xl'
              } space-y-8`}
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#B87333]/15 text-[#C7A15A] flex items-center justify-center font-black text-xl">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className={`text-xl font-extrabold ${isDark ? 'text-white' : 'text-[#181818]'}`}>{cs.company}</h3>
                    <span className="text-xs font-mono text-[#C7A15A] font-bold">{cs.industry}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#121315] border border-white/10 text-xs font-mono font-bold text-[#C7A15A]">
                    Verified Case Study
                  </span>
                </div>
              </div>

              {/* Headline & Story */}
              <div className="space-y-4">
                <h2 className={`text-2xl sm:text-3xl font-extrabold ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                  {cs.headline}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm leading-relaxed">
                  <div className={`p-5 rounded-2xl border ${isDark ? 'bg-[#121315] border-white/10 text-[#B7B7B5]' : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#5C5C5C]'}`}>
                    <strong className={`block text-xs uppercase font-mono font-bold mb-1 ${isDark ? 'text-white' : 'text-[#181818]'}`}>The Challenge</strong>
                    {cs.challenge}
                  </div>
                  <div className={`p-5 rounded-2xl border ${isDark ? 'bg-[#121315] border-white/10 text-[#B7B7B5]' : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#5C5C5C]'}`}>
                    <strong className="block text-xs uppercase font-mono font-bold mb-1 text-[#C7A15A]">The TangentCore Solution</strong>
                    {cs.solution}
                  </div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {cs.metrics.map((m, mIdx) => (
                  <div key={mIdx} className={`p-5 rounded-2xl border text-center ${
                    isDark ? 'bg-[#121315] border-white/10' : 'bg-[#F6F5F3] border-[#E5E3DF]'
                  }`}>
                    <div className="text-3xl font-black champagne-gradient-text">{m.value}</div>
                    <span className={`text-xs font-mono font-bold uppercase ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>{m.label}</span>
                  </div>
                ))}
              </div>

              {/* Quote Footer */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className={`text-xs italic leading-relaxed ${isDark ? 'text-[#F6F6F4]' : 'text-[#181818]'} max-w-2xl`}>
                  &quot;{cs.testimonial}&quot; — <strong className="text-[#C7A15A]">{cs.author}</strong>, {cs.role}
                </p>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl luxury-btn-secondary text-xs font-bold shrink-0"
                >
                  <span>Replicate Results</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer isDark={isDark} />
    </div>
  );
}
