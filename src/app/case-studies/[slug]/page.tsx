'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Building2, TrendingUp, CheckCircle2, ArrowRight, Sparkles, 
  Star, ShieldCheck, Award, ArrowLeft, Clock, Calendar, Check, Zap, Users
} from 'lucide-react';
import { AiBackground } from '@/components/ui/ai-background';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { Navbar } from '@/components/navbar';
import { BrandLogo } from '@/components/ui/brand-logo';
import { Footer } from '@/components/footer';
import { useTheme } from '@/components/theme-provider';
import { caseStudiesData } from '@/lib/case-studies-data';

export default function CaseStudyDetailPage() {
  const { isDark } = useTheme();
  const params = useParams();
  const slug = params?.slug as string;

  const caseStudy = caseStudiesData.find((cs) => cs.slug === slug);

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-[#0B0B0C] text-white flex flex-col justify-center items-center p-4">
        <BrandLogo isDark={true} size="lg" />
        <h1 className="text-2xl font-bold mt-8">Case Study Not Found</h1>
        <Link href="/case-studies" className="mt-4 px-6 py-2.5 rounded-xl luxury-btn-primary text-xs font-bold">
          Back to Case Studies
        </Link>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col font-sans relative overflow-hidden transition-colors duration-500 ${isDark ? 'bg-[#0B0B0C] text-[#F6F6F4]' : 'bg-[#FCFCFB] text-[#181818]'}`}>
      <ScrollProgress />
      <AiBackground isDark={isDark} />

      {/* Navigation Header */}
      <Navbar ctaText="Audit Your Brand" ctaHref="/dashboard" />

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 w-full">
        
        {/* Back Link */}
        <Link href="/case-studies" className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#C7A15A] hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Case Studies</span>
        </Link>

        {/* Case Study Header */}
        <div className="space-y-6 mb-12">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-[#C7A15A]/15 text-[#C7A15A] text-xs font-mono font-bold uppercase">
              {caseStudy.industry}
            </span>
            <span className={`text-xs font-mono ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
              {caseStudy.companySize} • {caseStudy.projectDuration} Engagement
            </span>
          </div>

          <h1 className={`text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight ${isDark ? 'text-white' : 'text-[#181818]'}`}>
            {caseStudy.title}
          </h1>

          <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
            {caseStudy.businessChallenge}
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-12 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <img
            src={caseStudy.image}
            alt={caseStudy.company}
            className="w-full h-80 sm:h-96 object-cover"
          />
        </div>

        {/* Hero Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {caseStudy.heroMetrics.map((m, idx) => (
            <div key={idx} className={`p-6 rounded-2xl border text-center ${
              isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-white border-[#E5E3DF] shadow-lg'
            }`}>
              <div className="text-3xl sm:text-4xl font-black champagne-gradient-text">{m.value}</div>
              <span className={`text-[11px] font-mono font-bold uppercase block mt-1 ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>{m.label}</span>
            </div>
          ))}
        </div>

        {/* Detailed Sections */}
        <div className="space-y-12 text-sm sm:text-base leading-relaxed">
          
          {/* Section: Business Challenge */}
          <section className={`p-8 sm:p-10 rounded-3xl border ${isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-white border-[#E5E3DF] shadow-xl'} space-y-4`}>
            <h2 className="text-2xl font-extrabold text-[#C7A15A]">Business Challenge</h2>
            <p className={isDark ? 'text-[#F6F6F4]' : 'text-[#181818]'}>
              {caseStudy.businessChallenge}
            </p>
          </section>

          {/* Section: Objectives */}
          <section className={`p-8 sm:p-10 rounded-3xl border ${isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-white border-[#E5E3DF] shadow-xl'} space-y-4`}>
            <h2 className="text-2xl font-extrabold text-[#C7A15A]">Core Engagement Objectives</h2>
            <ul className="space-y-3">
              {caseStudy.objectives.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md bg-[#C7A15A] text-[#111111] flex items-center justify-center shrink-0 mt-1 font-bold">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className={isDark ? 'text-[#F6F6F4]' : 'text-[#181818]'}>{obj}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section: TangentCore Solution */}
          <section className={`p-8 sm:p-10 rounded-3xl border ${isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-white border-[#E5E3DF] shadow-xl'} space-y-4`}>
            <h2 className="text-2xl font-extrabold text-[#C7A15A]">The TangentCore Solution</h2>
            <p className={isDark ? 'text-[#F6F6F4]' : 'text-[#181818]'}>
              {caseStudy.solutionDetails}
            </p>
          </section>

          {/* Section: Quantifiable Results */}
          <section className={`p-8 sm:p-10 rounded-3xl border ${isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-white border-[#E5E3DF] shadow-xl'} space-y-6`}>
            <h2 className="text-2xl font-extrabold text-[#C7A15A]">Quantifiable Results Achieved</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {caseStudy.results.map((r, idx) => (
                <div key={idx} className={`p-5 rounded-2xl border ${isDark ? 'bg-[#121315] border-white/10' : 'bg-[#F6F5F3] border-[#E5E3DF]'} space-y-1`}>
                  <div className="text-2xl font-black champagne-gradient-text">{r.metric}</div>
                  <p className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>{r.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Business Impact & Executive Quote */}
          <section className={`p-8 sm:p-10 rounded-3xl border-2 border-[#C7A15A] ${isDark ? 'bg-[#242529]' : 'bg-white shadow-2xl'} space-y-6`}>
            <h2 className="text-2xl font-extrabold text-white">Business Impact</h2>
            <p className={isDark ? 'text-[#F6F6F4]' : 'text-[#181818]'}>
              {caseStudy.businessImpact}
            </p>
            <div className="pt-4 border-t border-white/10">
              <p className="text-sm italic text-[#C7A15A]">
                &quot;{caseStudy.quote}&quot;
              </p>
              <span className="block text-xs font-mono font-bold text-white mt-2">
                — {caseStudy.author}, {caseStudy.authorRole}
              </span>
            </div>
          </section>

        </div>

        {/* CTA Bottom Banner */}
        <div className="mt-16 text-center space-y-6 p-10 rounded-3xl border border-[#C7A15A]/40 bg-gradient-to-r from-[#121315] via-[#1B1C1F] to-[#121315]">
          <h2 className="text-3xl font-extrabold text-white">Ready to Become Our Next Success Story?</h2>
          <p className="text-xs sm:text-sm text-[#B7B7B5] max-w-xl mx-auto">
            Book a demo or launch your brand AI search audit today to capture #1 citations across ChatGPT, Gemini, Perplexity & Claude.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="/pricing" className="px-8 py-3.5 rounded-2xl luxury-btn-primary font-bold text-xs">
              View Pricing & Plans
            </Link>
            <Link href="/dashboard" className="px-8 py-3.5 rounded-2xl luxury-btn-secondary font-bold text-xs">
              Launch Free AI Audit
            </Link>
          </div>
        </div>

      </main>

      <Footer isDark={isDark} />
    </div>
  );
}
