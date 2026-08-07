'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Users, Mail, ArrowRight, CheckCircle2, Sparkles, Building2, Layers, Award 
} from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AiBackground } from '@/components/ui/ai-background';
import { ScrollProgress } from '@/components/ui/scroll-progress';

export default function PartnersPage() {
  const { isDark } = useTheme();

  const benefits = [
    'Early access to new features', 'Dedicated partner support', 'Technical enablement', 'Co-marketing opportunities',
    'Sales collaboration', 'Product training', 'Partner resources', 'Business growth opportunities'
  ];

  const programmes = [
    { title: 'Agency Partners', desc: 'Help clients improve AI visibility through TangentCore\'s enterprise platform while expanding your agency service offerings.' },
    { title: 'Technology Partners', desc: 'Integrate your products and services with TangentCore to deliver a seamless customer experience.' },
    { title: 'Consulting Partners', desc: 'Support organisations with AI search strategies, implementation, and GEO optimisation using TangentCore.' },
    { title: 'Referral Partners', desc: 'Recommend TangentCore to your network and earn rewards for successful client referrals.' },
  ];

  const steps = [
    { num: '01', title: 'Apply', desc: 'Submit your partnership application.' },
    { num: '02', title: 'Review', desc: 'Our team reviews your business and partnership goals.' },
    { num: '03', title: 'Onboarding', desc: 'Receive training, resources, and platform access.' },
    { num: '04', title: 'Launch', desc: 'Start delivering AI visibility solutions to your customers.' },
  ];

  return (
    <div className={`min-h-screen flex flex-col font-sans relative transition-colors duration-500 ${
      isDark ? 'bg-[#0B0B0C] text-[#F6F6F4]' : 'bg-[#FCFCFB] text-[#181818]'
    }`}>
      <ScrollProgress />
      <AiBackground isDark={isDark} />
      <Navbar ctaText="Apply to Partner" ctaHref="#apply" />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 space-y-20">
        
        {/* Header */}
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-xs font-mono font-bold ${
            isDark ? 'bg-[#121315] border-white/10 text-[#C7A15A]' : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#B87333]'
          } shadow-sm`}>
            <Users className="w-3.5 h-3.5 text-[#C7A15A]" />
            <span className="uppercase tracking-wider">PARTNER PROGRAMME</span>
          </div>

          <h1 className={`text-4xl sm:text-6xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#181818]'}`}>
            Grow Together with TangentCore
          </h1>

          <p className={`text-lg sm:text-xl leading-relaxed ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
            Partner with TangentCore to help organisations improve their visibility across AI-powered search. Whether you're a digital agency, technology provider, systems integrator, or consulting firm, our partner programme is designed for mutual growth.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className={`p-8 sm:p-10 rounded-3xl border ${isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'} space-y-6 shadow-xl`}>
          <h2 className="text-2xl font-extrabold text-center">Why Partner with TangentCore?</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {benefits.map((ben) => (
              <div key={ben} className={`p-4 rounded-2xl border ${isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-[#F6F5F3] border-[#E5E3DF]'} flex items-center gap-2 text-xs font-medium`}>
                <CheckCircle2 className="w-4 h-4 text-[#C7A15A] shrink-0" />
                <span>{ben}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Partnership Programmes */}
        <div className="space-y-8">
          <h2 className="text-3xl font-extrabold text-center">Partnership Programmes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programmes.map((p) => (
              <div key={p.title} className={`p-8 rounded-3xl border ${isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'} space-y-3 shadow-xl`}>
                <span className="text-lg font-bold text-[#C7A15A] block">{p.title}</span>
                <p className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'} leading-relaxed`}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Partner Success Process */}
        <div className="space-y-8">
          <h2 className="text-3xl font-extrabold text-center">Partner Success Process</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((st) => (
              <div key={st.num} className={`p-6 rounded-3xl border ${isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'} space-y-2 text-center`}>
                <span className="w-8 h-8 rounded-xl bg-[#C7A15A]/20 text-[#C7A15A] font-mono font-bold text-xs flex items-center justify-center mx-auto">
                  {st.num}
                </span>
                <span className="text-sm font-bold text-white block">{st.title}</span>
                <p className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>{st.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Become a Partner Application CTA */}
        <div id="apply" className={`rounded-3xl p-10 text-center space-y-6 shadow-2xl max-w-3xl mx-auto border ${
          isDark 
            ? 'luxury-gradient-card border-[#C7A15A]/40' 
            : 'bg-white border-[#E5E3DF]'
        }`}>
          <h3 className={`text-3xl font-extrabold ${isDark ? 'text-white' : 'text-[#181818]'}`}>Become a TangentCore Partner</h3>
          <p className={`text-xs leading-relaxed ${isDark ? 'text-[#E5E3DF]/80' : 'text-[#5C5C5C]'}`}>
            Interested in joining our growing partner network? Contact our partnerships team to receive sales enablement materials and platform access.
          </p>
          <a
            href="mailto:tangentcoreindia@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl luxury-btn-primary font-bold text-sm shadow-xl"
          >
            <Mail className="w-4 h-4" />
            <span>Apply to Become a Partner (tangentcoreindia@gmail.com)</span>
          </a>
        </div>

      </main>

      <Footer isDark={isDark} />
    </div>
  );
}
