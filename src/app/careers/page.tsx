'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Briefcase, Mail, ArrowRight, CheckCircle2, Sparkles, Heart, Zap, ShieldCheck 
} from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AiBackground } from '@/components/ui/ai-background';
import { ScrollProgress } from '@/components/ui/scroll-progress';

export default function CareersPage() {
  const { isDark } = useTheme();

  const openPositions = [
    { title: 'Software Engineer', dept: 'Engineering', loc: 'Remote / Hybrid', desc: 'Build scalable backend systems and platform infrastructure for live multi-LLM scanning.' },
    { title: 'Frontend Engineer', dept: 'Engineering', loc: 'Remote / Hybrid', desc: 'Create intuitive, high-performance user experiences and interactive AI data visualisations.' },
    { title: 'AI Engineer', dept: 'AI & Data Science', loc: 'Remote / Hybrid', desc: 'Develop AI-powered features, prompt evaluation analytics, and GEO recommendation systems.' },
    { title: 'Product Designer', dept: 'Design', loc: 'Remote / Hybrid', desc: 'Design modern interfaces, design systems, and exceptional user experiences.' },
    { title: 'Growth Marketing Specialist', dept: 'Marketing', loc: 'Remote / Hybrid', desc: 'Help organisations discover TangentCore through innovative marketing strategies.' },
  ];

  const values = [
    { title: 'Innovation', desc: 'We embrace curiosity, experimentation, and continuous improvement.' },
    { title: 'Ownership', desc: 'Every team member is trusted to make decisions and drive meaningful outcomes.' },
    { title: 'Collaboration', desc: 'We believe the best ideas come from working together across teams.' },
    { title: 'Customer First', desc: 'Everything we build starts with solving real customer problems.' },
    { title: 'Excellence', desc: 'We value quality, attention to detail, and long-term thinking.' },
  ];

  return (
    <div className={`min-h-screen flex flex-col font-sans relative transition-colors duration-500 ${
      isDark ? 'bg-[#0B0B0C] text-[#F6F6F4]' : 'bg-[#FCFCFB] text-[#181818]'
    }`}>
      <ScrollProgress />
      <AiBackground isDark={isDark} />
      <Navbar ctaText="View Open Positions" ctaHref="#positions" />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 space-y-20">
        
        {/* Header */}
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-xs font-mono font-bold ${
            isDark ? 'bg-[#121315] border-white/10 text-[#C7A15A]' : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#B87333]'
          } shadow-sm`}>
            <Briefcase className="w-3.5 h-3.5 text-[#C7A15A]" />
            <span className="uppercase tracking-wider">CAREERS AT TANGENTCORE</span>
          </div>

          <h1 className={`text-4xl sm:text-6xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#181818]'}`}>
            Build the Future of AI Search with Us
          </h1>

          <p className={`text-lg sm:text-xl leading-relaxed ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
            At TangentCore, we're building technology that helps organisations understand and improve their visibility in the era of AI-powered search. We're looking for curious thinkers, engineers, designers, and innovators.
          </p>
        </div>

        {/* Our Values */}
        <div className="space-y-8">
          <h2 className="text-3xl font-extrabold text-center">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {values.map((v) => (
              <div key={v.title} className={`p-6 rounded-3xl border ${isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'} space-y-2`}>
                <span className="text-sm font-bold text-[#C7A15A] block">{v.title}</span>
                <p className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Open Positions List */}
        <div id="positions" className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold">Open Positions</h2>
            <p className={`text-sm ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
              Join our remote/hybrid team and help shape the next generation of search intelligence.
            </p>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {openPositions.map((pos, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-3xl border ${
                  isDark ? 'bg-[#121315] border-white/10 hover:border-[#C7A15A]/40' : 'bg-white border-[#E5E3DF] hover:border-[#B87333]/40'
                } flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl transition-all`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">{pos.title}</h3>
                    <span className="px-2.5 py-0.5 rounded-md bg-[#C7A15A]/20 text-[#C7A15A] text-[10px] font-mono font-bold">
                      {pos.dept}
                    </span>
                  </div>
                  <p className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>{pos.desc}</p>
                  <span className="text-[10px] font-mono text-[#C7A15A] block pt-1">📍 Location: {pos.loc}</span>
                </div>

                <a
                  href={`mailto:careers@tangentcore.in?subject=Application for ${encodeURIComponent(pos.title)}`}
                  className="px-5 py-2.5 rounded-xl luxury-btn-primary text-xs font-bold shrink-0 shadow-md flex items-center gap-1.5"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* General Application Footer */}
        <div className="rounded-3xl luxury-gradient-card border border-[#C7A15A]/40 p-8 text-center space-y-4 shadow-2xl max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-white">Don't See a Suitable Role?</h3>
          <p className="text-xs text-[#E5E3DF]/80">
            We're always interested in meeting talented people. Send your resume and portfolio directly to our talent acquisition team.
          </p>
          <a
            href="mailto:careers@tangentcore.in"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl luxury-btn-primary font-bold text-xs shadow-lg"
          >
            <Mail className="w-4 h-4" />
            <span>Send Resume to careers@tangentcore.in</span>
          </a>
        </div>

      </main>

      <Footer isDark={isDark} />
    </div>
  );
}
