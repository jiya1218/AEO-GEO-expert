'use client';

import React from 'react';
import Link from 'next/link';
import { 
  FileText, Download, Mail, Globe, Calendar, ArrowRight, ShieldCheck, Award, Sparkles 
} from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AiBackground } from '@/components/ui/ai-background';
import { ScrollProgress } from '@/components/ui/scroll-progress';

export default function PressKitPage() {
  const { isDark } = useTheme();

  const companyFactSheet = [
    { label: 'Company Name', val: 'TangentCore' },
    { label: 'Industry', val: 'AI Visibility Intelligence' },
    { label: 'Founded', val: '2025' },
    { label: 'Headquarters', val: 'India' },
    { label: 'Website', val: 'https://tangentcore.in' },
    { label: 'Media Contact', val: 'tangentcoreindia@gmail.com' },
  ];

  const resources = [
    'Company Overview & Fact Sheet', 'Official Vector Logos (Light/Dark)', 'Brand Guidelines & Typography',
    'High-Res Product Screenshots', 'Executive Leadership Biographies', 'Media & Press Boilerplate'
  ];

  return (
    <div className={`min-h-screen flex flex-col font-sans relative transition-colors duration-500 ${
      isDark ? 'bg-[#0B0B0C] text-[#F6F6F4]' : 'bg-[#FCFCFB] text-[#181818]'
    }`}>
      <ScrollProgress />
      <AiBackground isDark={isDark} />
      <Navbar ctaText="Brand Assets" ctaHref="/brand-assets" />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-xs font-mono font-bold ${
            isDark ? 'bg-[#121315] border-white/10 text-[#C7A15A]' : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#B87333]'
          } shadow-sm`}>
            <FileText className="w-3.5 h-3.5 text-[#C7A15A]" />
            <span className="uppercase tracking-wider">MEDIA & PRESS KIT</span>
          </div>

          <h1 className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#181818]'}`}>
            Media Resources for TangentCore
          </h1>

          <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
            Welcome to the TangentCore Press Kit. This page provides journalists, media professionals, analysts, event organizers, and partners with official company information, brand assets, and media resources.
          </p>

          <div className="pt-2 flex justify-center gap-4">
            <Link
              href="/brand-assets"
              className="px-6 py-3 rounded-xl luxury-btn-primary font-bold text-xs flex items-center gap-2 shadow-lg"
            >
              <Download className="w-4 h-4" />
              <span>Download Brand Kit</span>
            </Link>
          </div>
        </div>

        {/* Company Fact Sheet */}
        <div className={`p-8 rounded-3xl border ${isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'} space-y-6 shadow-xl`}>
          <h2 className="text-2xl font-extrabold text-center">Company Overview & Fact Sheet</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {companyFactSheet.map((item) => (
              <div key={item.label} className={`p-4 rounded-2xl border ${isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-[#F6F5F3] border-[#E5E3DF]'} space-y-1`}>
                <span className="text-[10px] font-mono font-bold uppercase text-[#C7A15A] block">{item.label}</span>
                <span className="text-sm font-bold text-white block">{item.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Boilerplate */}
        <div className={`p-8 rounded-3xl border ${isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'} space-y-4 shadow-xl`}>
          <h3 className="text-xl font-bold text-[#C7A15A]">Company Boilerplate</h3>
          <p className={`text-sm ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'} leading-relaxed`}>
            TangentCore is an enterprise AI Visibility Intelligence platform designed to help organisations understand how AI platforms perceive, reference, and recommend their brands. Through AI visibility monitoring, citation analytics, competitor intelligence, and GEO recommendations, TangentCore empowers businesses to improve discoverability across the next generation of AI-powered search experiences.
          </p>
        </div>

        {/* Press Resources & Media Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className={`p-8 rounded-3xl border ${isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'} space-y-4 shadow-xl`}>
            <h3 className="text-xl font-bold">Press Resources Available</h3>
            <ul className="space-y-2">
              {resources.map((r, i) => (
                <li key={i} className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'} flex items-center gap-2`}>
                  <FileText className="w-3.5 h-3.5 text-[#C7A15A] shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`p-8 rounded-3xl border ${isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'} space-y-4 shadow-xl`}>
            <h3 className="text-xl font-bold">Media & Speaking Enquiries</h3>
            <p className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'} leading-relaxed`}>
              For interview requests, speaking opportunities at podcasts/conferences, or media enquiries, please contact:
            </p>
            <div className="space-y-2 pt-2">
              <a href="mailto:tangentcoreindia@gmail.com" className="text-xs font-mono font-bold text-[#C7A15A] hover:underline block">
                📧 tangentcoreindia@gmail.com
              </a>
              <a href="mailto:tangentcoreindia@gmail.com" className="text-xs font-mono font-bold text-[#C7A15A] hover:underline block">
                🎙️ tangentcoreindia@gmail.com
              </a>
            </div>
          </div>
        </div>

      </main>

      <Footer isDark={isDark} />
    </div>
  );
}
