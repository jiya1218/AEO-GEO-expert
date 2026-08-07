'use client';

import React from 'react';
import Link from 'next/link';
import { Cpu, ShieldCheck, Heart, Eye, CheckCircle2, Mail, ArrowRight } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AiBackground } from '@/components/ui/ai-background';
import { ScrollProgress } from '@/components/ui/scroll-progress';

export default function ResponsibleAiPage() {
  const { isDark } = useTheme();

  const principles = [
    { title: 'Transparency', desc: 'We strive to make our AI-powered insights understandable and actionable, explaining how visibility metrics are derived.' },
    { title: 'Human Oversight', desc: 'TangentCore analytics support business decision-making. Final strategy, compliance, and marketing choices remain under human review.' },
    { title: 'Privacy First', desc: 'We handle customer data responsibly, collecting only necessary information under strict security controls.' },
    { title: 'Fairness & Accuracy', desc: 'We continuously monitor our platform to reduce bias and improve recommendation accuracy across industries.' },
  ];

  return (
    <div className={`min-h-screen flex flex-col font-sans relative transition-colors duration-500 ${
      isDark ? 'bg-[#0B0B0C] text-[#F6F6F4]' : 'bg-[#FCFCFB] text-[#181818]'
    }`}>
      <ScrollProgress />
      <AiBackground isDark={isDark} />
      <Navbar ctaText="Feedback" ctaHref="mailto:tangentcoreindia@gmail.com" />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-xs font-mono font-bold ${
            isDark ? 'bg-[#121315] border-white/10 text-[#C7A15A]' : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#B87333]'
          } shadow-sm`}>
            <Cpu className="w-3.5 h-3.5 text-[#C7A15A]" />
            <span className="uppercase tracking-wider">RESPONSIBLE AI GOVERNANCE & ETHICS</span>
          </div>

          <h1 className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#181818]'}`}>
            Responsible AI at TangentCore
          </h1>

          <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
            We believe Artificial Intelligence should be developed and used responsibly. Our AI systems are designed to assist decision-making—not replace human judgment.
          </p>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {principles.map((pr) => (
            <div key={pr.title} className={`p-6 rounded-3xl border ${
              isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'
            } space-y-2 shadow-xl`}>
              <span className="text-base font-bold text-[#C7A15A] block">{pr.title}</span>
              <p className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'} leading-relaxed`}>{pr.desc}</p>
            </div>
          ))}
        </div>

        {/* Feedback Banner */}
        <div className={`rounded-3xl p-8 text-center space-y-4 shadow-2xl max-w-3xl mx-auto border ${
          isDark 
            ? 'luxury-gradient-card border-[#C7A15A]/40' 
            : 'bg-white border-[#E5E3DF]'
        }`}>
          <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#181818]'}`}>AI Feedback & Oversight</h3>
          <p className={`text-xs ${isDark ? 'text-[#E5E3DF]/80' : 'text-[#5C5C5C]'}`}>
            If you identify potential bias, inaccurate results, or opportunities for AI improvement, we encourage you to contact our governance team.
          </p>
          <a href="mailto:tangentcoreindia@gmail.com" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl luxury-btn-primary font-bold text-xs shadow-lg">
            <Mail className="w-4 h-4" />
            <span>Send Feedback to tangentcoreindia@gmail.com</span>
          </a>
        </div>

      </main>

      <Footer isDark={isDark} />
    </div>
  );
}
