'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, ShieldCheck, Mail, ArrowRight } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AiBackground } from '@/components/ui/ai-background';
import { ScrollProgress } from '@/components/ui/scroll-progress';

export default function TermsPage() {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col font-sans relative transition-colors duration-500 ${
      isDark ? 'bg-[#0B0B0C] text-[#F6F6F4]' : 'bg-[#FCFCFB] text-[#181818]'
    }`}>
      <ScrollProgress />
      <AiBackground isDark={isDark} />
      <Navbar ctaText="Contact Legal" ctaHref="mailto:legal@tangentcore.in" />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-xs font-mono font-bold ${
            isDark ? 'bg-[#121315] border-white/10 text-[#C7A15A]' : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#B87333]'
          } shadow-sm`}>
            <FileText className="w-3.5 h-3.5 text-[#C7A15A]" />
            <span className="uppercase tracking-wider">TERMS OF SERVICE • LAST UPDATED JULY 2026</span>
          </div>

          <h1 className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#181818]'}`}>
            TangentCore Terms of Service
          </h1>

          <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
            These Terms of Service ("Terms") govern your access to and use of the TangentCore website, platform, APIs, applications, and related services.
          </p>
        </div>

        {/* Content Card */}
        <div className={`p-8 sm:p-12 rounded-3xl border ${
          isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'
        } space-y-8 shadow-2xl leading-relaxed text-sm`}>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#C7A15A]">1. Eligibility & Your Account</h2>
            <p className={isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}>
              To use TangentCore, you must be at least 18 years of age and have the legal authority to enter into a binding agreement. You are responsible for maintaining the confidentiality of your credentials and all activities occurring under your account.
            </p>
          </section>

          <section className="space-y-3 border-t border-white/10 pt-6">
            <h2 className="text-xl font-bold text-[#C7A15A]">2. Acceptable Use</h2>
            <p className={isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}>
              You agree to use TangentCore solely for lawful business purposes. You must not attempt unauthorized access, reverse engineer the platform, upload malicious code, or use automated tools to abuse or overload our Services.
            </p>
          </section>

          <section className="space-y-3 border-t border-white/10 pt-6">
            <h2 className="text-xl font-bold text-[#C7A15A]">3. Intellectual Property & Subscriptions</h2>
            <p className={isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}>
              All content, algorithms, designs, and code remain the exclusive property of TangentCore. Subscriptions are billed recurringly based on your selected plan. Unless otherwise stated, subscription payments are non-refundable.
            </p>
          </section>

          <section className="space-y-3 border-t border-white/10 pt-6">
            <h2 className="text-xl font-bold text-[#C7A15A]">4. Limitation of Liability & Governing Law</h2>
            <p className={isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}>
              Services are provided on an "as is" basis. TangentCore shall not be liable for any indirect or consequential damages. These Terms are governed by the laws of <strong>India</strong> under the exclusive jurisdiction of courts located in India.
            </p>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono">
              <span className="text-[#C7A15A] font-bold block">Legal Team Contact:</span>
              <a href="mailto:legal@tangentcore.in" className="text-white hover:underline">legal@tangentcore.in</a>
            </div>
          </section>

        </div>

      </main>

      <Footer isDark={isDark} />
    </div>
  );
}
