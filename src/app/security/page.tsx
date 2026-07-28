'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Key, Server, Cpu, Mail, ArrowRight, Eye, CheckCircle2 } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AiBackground } from '@/components/ui/ai-background';
import { ScrollProgress } from '@/components/ui/scroll-progress';

export default function SecurityPage() {
  const { isDark } = useTheme();

  const principles = [
    { title: 'Protect Customer Data', desc: 'Encryption of data in transit (TLS 1.3) and at rest (AES-256).' },
    { title: 'Maintain Availability', desc: 'Redundant cloud infrastructure with 99.9% uptime target SLA.' },
    { title: 'Prevent Unauthorized Access', desc: 'Role-based access controls (RBAC) and multi-factor authentication (MFA).' },
    { title: 'Continuous Monitoring', desc: '24/7 automated vulnerability scanning and security audit logs.' },
  ];

  return (
    <div className={`min-h-screen flex flex-col font-sans relative transition-colors duration-500 ${
      isDark ? 'bg-[#0B0B0C] text-[#F6F6F4]' : 'bg-[#FCFCFB] text-[#181818]'
    }`}>
      <ScrollProgress />
      <AiBackground isDark={isDark} />
      <Navbar ctaText="Report Vulnerability" ctaHref="mailto:security@tangentcore.in" />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-xs font-mono font-bold ${
            isDark ? 'bg-[#121315] border-white/10 text-[#C7A15A]' : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#B87333]'
          } shadow-sm`}>
            <ShieldCheck className="w-3.5 h-3.5 text-[#C7A15A]" />
            <span className="uppercase tracking-wider">ENTERPRISE SECURITY & DATA PROTECTION</span>
          </div>

          <h1 className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#181818]'}`}>
            Security at TangentCore
          </h1>

          <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
            Security is integrated throughout our development lifecycle, infrastructure, and operational processes. We protect customer data through privacy-first architecture and enterprise-grade safeguards.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {principles.map((pr) => (
            <div key={pr.title} className={`p-6 rounded-3xl border ${
              isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'
            } space-y-2 shadow-xl`}>
              <div className="flex items-center gap-2 text-[#C7A15A]">
                <Lock className="w-4 h-4" />
                <span className="text-base font-bold text-white">{pr.title}</span>
              </div>
              <p className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'} leading-relaxed`}>{pr.desc}</p>
            </div>
          ))}
        </div>

        {/* Responsible Disclosure Card */}
        <div className={`p-8 rounded-3xl border ${isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'} space-y-4 shadow-xl`}>
          <h2 className="text-xl font-bold text-[#C7A15A]">Responsible Disclosure</h2>
          <p className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'} leading-relaxed`}>
            If you believe you have discovered a security vulnerability affecting TangentCore, please report it responsibly to our security team at <strong>security@tangentcore.in</strong>. Please include steps to reproduce, impact assessment, and proof of concept.
          </p>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono text-white">
            <span>Security Operations: <a href="mailto:security@tangentcore.in" className="text-[#C7A15A] hover:underline">security@tangentcore.in</a></span>
          </div>
        </div>

      </main>

      <Footer isDark={isDark} />
    </div>
  );
}
