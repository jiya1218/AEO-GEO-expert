'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Building2, Target, Eye, ShieldCheck, Sparkles, ArrowRight, CheckCircle2, Award, Users, Globe 
} from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AiBackground } from '@/components/ui/ai-background';
import { ScrollProgress } from '@/components/ui/scroll-progress';

export default function AboutPage() {
  const { isDark } = useTheme();

  const principles = [
    { title: 'Innovation', desc: 'We continuously explore emerging AI technologies to help organisations stay ahead of the evolving search landscape.' },
    { title: 'Transparency', desc: 'We believe meaningful insights should be understandable, measurable, and supported by reliable data.' },
    { title: 'Customer Success', desc: 'Every feature we build is designed to help organisations improve visibility, strengthen authority, and achieve business outcomes.' },
    { title: 'Security', desc: 'Protecting customer data through secure infrastructure and privacy-first practices is fundamental to everything we do.' },
  ];

  const stats = [
    { value: '12B+', label: 'AI Responses Analysed' },
    { value: '30M+', label: 'Brand Mentions Monitored' },
    { value: '500+', label: 'Brands Analysed' },
    { value: '99.9%', label: 'Platform Availability' },
  ];

  const industries = [
    'SaaS & Technology', 'E-commerce & Retail', 'Healthcare', 'Financial Services', 'Education', 'Manufacturing', 'Professional Services', 'Digital Agencies'
  ];

  return (
    <div className={`min-h-screen flex flex-col font-sans relative transition-colors duration-500 ${
      isDark ? 'bg-[#0B0B0C] text-[#F6F6F4]' : 'bg-[#FCFCFB] text-[#181818]'
    }`}>
      <ScrollProgress />
      <AiBackground isDark={isDark} />
      <Navbar ctaText="Book a Demo" ctaHref="/contact" />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 space-y-20">
        
        {/* Header */}
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-xs font-mono font-bold ${
            isDark ? 'bg-[#121315] border-white/10 text-[#C7A15A]' : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#B87333]'
          } shadow-sm`}>
            <Building2 className="w-3.5 h-3.5 text-[#C7A15A]" />
            <span className="uppercase tracking-wider">ABOUT TANGENTCORE</span>
          </div>

          <h1 className={`text-4xl sm:text-6xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#181818]'}`}>
            Building the Future of AI Visibility
          </h1>

          <p className={`text-lg sm:text-xl leading-relaxed ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
            As search evolves from traditional search engines to AI-powered conversations, businesses face a new challenge: ensuring their brand is recognised, understood, and recommended by AI.
          </p>

          <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-[#B7B7B5]/80' : 'text-[#5C5C5C]/80'} max-w-3xl mx-auto`}>
            TangentCore was built to solve this challenge. We help organisations monitor, measure, and improve their visibility across AI-powered search platforms, providing the intelligence needed to succeed in an increasingly conversational web.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className={`p-8 rounded-3xl border ${isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'} space-y-4 shadow-xl`}>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-[#C7A15A]/20 text-[#C7A15A]">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold">Our Mission</h2>
            </div>
            <p className={`text-sm ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'} leading-relaxed`}>
              <strong>Empower Every Business to Be Discoverable in AI Search.</strong> <br />
              Our mission is to make AI visibility measurable, actionable, and accessible. We believe every organisation should understand how AI platforms perceive their brand and have the tools to improve their presence through data-driven insights.
            </p>
          </div>

          <div className={`p-8 rounded-3xl border ${isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'} space-y-4 shadow-xl`}>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-[#C7A15A]/20 text-[#C7A15A]">
                <Eye className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold">Our Vision</h2>
            </div>
            <p className={`text-sm ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'} leading-relaxed`}>
              <strong>Defining the Next Generation of Search Intelligence.</strong> <br />
              The future of search extends beyond rankings and keywords. AI systems are becoming the primary gateway to information. Our vision is to become the leading intelligence platform enabling organisations worldwide to grow across every major AI search ecosystem.
            </p>
          </div>
        </div>

        {/* By the Numbers Stats */}
        <div className={`p-10 rounded-3xl border ${isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'} space-y-6 shadow-2xl`}>
          <h2 className="text-2xl font-bold text-center">By the Numbers</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {stats.map((st) => (
              <div key={st.label} className="space-y-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#C7A15A] font-mono block">{st.value}</span>
                <span className={`text-xs font-mono uppercase ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>{st.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Core Principles */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center">Our Core Principles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((pr) => (
              <div key={pr.title} className={`p-6 rounded-3xl border ${isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'} space-y-3`}>
                <span className="text-base font-bold text-[#C7A15A] block">{pr.title}</span>
                <p className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'} leading-relaxed`}>{pr.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Footer Card */}
        <div className="rounded-3xl luxury-gradient-card border border-[#C7A15A]/40 p-10 text-center space-y-6 shadow-2xl">
          <h3 className="text-3xl font-bold text-white">Ready to See How AI Platforms Perceive Your Brand?</h3>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link href="/contact" className="px-8 py-4 rounded-2xl luxury-btn-primary font-bold text-sm shadow-xl hover:scale-105 transition-transform">
              Book a Demo
            </Link>
            <Link href="/tools/brand-auditor" className="px-8 py-4 rounded-2xl border border-white/20 text-white font-bold text-sm hover:border-[#C7A15A]">
              Start Free AI Visibility Audit
            </Link>
          </div>
        </div>

      </main>

      <Footer isDark={isDark} />
    </div>
  );
}
