'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Mail, Globe, CheckCircle2, ArrowRight } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AiBackground } from '@/components/ui/ai-background';
import { ScrollProgress } from '@/components/ui/scroll-progress';

export default function PrivacyPage() {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col font-sans relative transition-colors duration-500 ${
      isDark ? 'bg-[#0B0B0C] text-[#F6F6F4]' : 'bg-[#FCFCFB] text-[#181818]'
    }`}>
      <ScrollProgress />
      <AiBackground isDark={isDark} />
      <Navbar ctaText="Contact Privacy" ctaHref="mailto:privacy@tangentcore.in" />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-xs font-mono font-bold ${
            isDark ? 'bg-[#121315] border-white/10 text-[#C7A15A]' : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#B87333]'
          } shadow-sm`}>
            <ShieldCheck className="w-3.5 h-3.5 text-[#C7A15A]" />
            <span className="uppercase tracking-wider">PRIVACY POLICY • LAST UPDATED JULY 2026</span>
          </div>

          <h1 className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#181818]'}`}>
            TangentCore Privacy Policy
          </h1>

          <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
            At TangentCore, we are committed to protecting your privacy and handling your personal information responsibly. This Privacy Policy explains what information we collect, how we use it, and how we protect it.
          </p>
        </div>

        {/* Content Card */}
        <div className={`p-8 sm:p-12 rounded-3xl border ${
          isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'
        } space-y-8 shadow-2xl leading-relaxed text-sm`}>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#C7A15A]">1. Information We Collect</h2>
            <p className={isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}>
              Depending on how you interact with our platform, we may collect the following information:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li><strong>Personal Information:</strong> Full Name, Business Email Address, Company Name, Job Title, Phone Number, Billing Information, and Account Credentials.</li>
              <li><strong>Usage Information:</strong> IP Address, Browser Type, Operating System, Device Information, Pages Visited, Session Duration, Clickstream Data, and Error Logs.</li>
              <li><strong>Platform Data:</strong> Website URLs, Search Visibility Reports, AI Citation Data, Analytics Data, and Competitor Analysis.</li>
            </ul>
          </section>

          <section className="space-y-3 border-t border-white/10 pt-6">
            <h2 className="text-xl font-bold text-[#C7A15A]">2. How We Use Your Information</h2>
            <p className={isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}>
              We use your information to provide and maintain our platform, process subscriptions, deliver AI visibility insights, respond to enquiries, prevent fraud, and comply with legal obligations. <strong>We do not sell your personal information to third parties.</strong>
            </p>
          </section>

          <section className="space-y-3 border-t border-white/10 pt-6">
            <h2 className="text-xl font-bold text-[#C7A15A]">3. Cookies and Tracking Technologies</h2>
            <p className={isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}>
              We use cookies to keep you signed in, remember your preferences, measure platform usage, and enhance security. You can manage or disable cookies through your browser settings.
            </p>
          </section>

          <section className="space-y-3 border-t border-white/10 pt-6">
            <h2 className="text-xl font-bold text-[#C7A15A]">4. Sharing & Data Security</h2>
            <p className={isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}>
              We share information only with trusted cloud infrastructure providers, payment processors, and analytics partners under strict confidentiality agreements. We implement encryption in transit, secure cloud infrastructure, and continuous security monitoring.
            </p>
          </section>

          <section className="space-y-3 border-t border-white/10 pt-6">
            <h2 className="text-xl font-bold text-[#C7A15A]">5. Your Rights & Contact Information</h2>
            <p className={isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}>
              Depending on your location, you have the right to access, correct, or request deletion of your personal data. For privacy enquiries:
            </p>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono">
              <span className="text-[#C7A15A] font-bold block">Privacy Office:</span>
              <a href="mailto:privacy@tangentcore.in" className="text-white hover:underline">privacy@tangentcore.in</a>
            </div>
          </section>

        </div>

      </main>

      <Footer isDark={isDark} />
    </div>
  );
}
