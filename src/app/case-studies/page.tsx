'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Building2, TrendingUp, CheckCircle2, ArrowRight, Sparkles, 
  Star, ShieldCheck, Award, Layers, Bot, Download, ChevronRight, FileText, Check
} from 'lucide-react';
import { AiBackground } from '@/components/ui/ai-background';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { BrandLogo } from '@/components/ui/brand-logo';
import { Footer } from '@/components/footer';
import { caseStudiesData } from '@/lib/case-studies-data';

export default function CaseStudiesPage() {
  const [isDark, setIsDark] = useState(true);
  const [selectedIndustry, setSelectedIndustry] = useState('All');

  const industries = ['All', 'Enterprise Software', 'Retail & E-Commerce', 'Healthcare & Life Sciences', 'Financial Services', 'Education Technology', 'Manufacturing & Industrial'];

  const filteredStudies = selectedIndustry === 'All'
    ? caseStudiesData
    : caseStudiesData.filter((cs) => cs.industry === selectedIndustry);

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
            <span>VERIFIED CUSTOMER SUCCESS STORIES</span>
          </div>
          <h1 className={`text-4xl sm:text-6xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#181818]'}`}>
            Real Businesses. Real <span className="champagne-gradient-text">AI Visibility Growth</span>.
          </h1>
          <p className={`text-base sm:text-lg ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
            Discover how organisations across industries improved their presence across ChatGPT, Gemini, Claude, Perplexity, and Google AI using TangentCore.
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
        <div className="space-y-12 mb-20">
          {filteredStudies.map((cs, idx) => (
            <motion.div
              key={cs.slug}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
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
                    <span className="text-[11px] font-mono font-bold text-[#C7A15A] uppercase">{cs.number}</span>
                    <h3 className={`text-xl font-extrabold ${isDark ? 'text-white' : 'text-[#181818]'}`}>{cs.company}</h3>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-xs font-mono ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
                    {cs.companySize} • {cs.projectDuration}
                  </span>
                </div>
              </div>

              {/* Headline & Story */}
              <div className="space-y-4">
                <h2 className={`text-2xl sm:text-3xl font-extrabold ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                  <Link href={`/case-studies/${cs.slug}`} className="hover:text-[#C7A15A] transition-colors">
                    {cs.title}
                  </Link>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm leading-relaxed">
                  <div className={`p-5 rounded-2xl border ${isDark ? 'bg-[#121315] border-white/10 text-[#B7B7B5]' : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#5C5C5C]'}`}>
                    <strong className={`block text-xs uppercase font-mono font-bold mb-1 ${isDark ? 'text-white' : 'text-[#181818]'}`}>The Business Challenge</strong>
                    {cs.businessChallenge}
                  </div>
                  <div className={`p-5 rounded-2xl border ${isDark ? 'bg-[#121315] border-white/10 text-[#B7B7B5]' : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#5C5C5C]'}`}>
                    <strong className="block text-xs uppercase font-mono font-bold mb-1 text-[#C7A15A]">The TangentCore Solution</strong>
                    {cs.solutionDetails}
                  </div>
                </div>
              </div>

              {/* Results Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                {cs.results.slice(0, 4).map((r, rIdx) => (
                  <div key={rIdx} className={`p-5 rounded-2xl border text-center ${
                    isDark ? 'bg-[#121315] border-white/10' : 'bg-[#F6F5F3] border-[#E5E3DF]'
                  }`}>
                    <div className="text-3xl font-black champagne-gradient-text">{r.metric}</div>
                    <span className={`text-[11px] font-mono font-bold block mt-1 ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>{r.description}</span>
                  </div>
                ))}
              </div>

              {/* Quote Footer & Navigation */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className={`text-xs italic leading-relaxed ${isDark ? 'text-[#F6F6F4]' : 'text-[#181818]'} max-w-2xl`}>
                  &quot;{cs.quote}&quot; — <strong className="text-[#C7A15A]">{cs.author}</strong>, {cs.authorRole}
                </p>
                <Link
                  href={`/case-studies/${cs.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl luxury-btn-primary font-bold text-xs shrink-0 shadow-md"
                >
                  <span>Read Full Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Ready to Become Success Story Banner */}
        <div className="p-10 rounded-3xl border border-[#C7A15A]/40 bg-[#121315] text-center space-y-6">
          <h2 className="text-3xl font-extrabold text-white">Ready to Become Our Next Success Story?</h2>
          <p className="text-xs sm:text-sm text-[#B7B7B5] max-w-xl mx-auto">
            Whether your goal is increasing AI visibility, strengthening brand authority, or becoming the preferred recommendation across ChatGPT, Gemini, Claude & Perplexity, TangentCore delivers measurable outcomes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="/pricing" className="px-8 py-3.5 rounded-2xl luxury-btn-primary font-bold text-xs">
              View Pricing & Plans
            </Link>
            <Link href="/dashboard" className="px-8 py-3.5 rounded-2xl luxury-btn-secondary font-bold text-xs">
              Start Free AI Visibility Audit
            </Link>
          </div>
        </div>

      </main>

      <Footer isDark={isDark} />
    </div>
  );
}
