'use client';

import React from 'react';
import Link from 'next/link';
import { Cookie, ShieldCheck, Mail } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AiBackground } from '@/components/ui/ai-background';
import { ScrollProgress } from '@/components/ui/scroll-progress';

export default function CookiePolicyPage() {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col font-sans relative transition-colors duration-500 ${
      isDark ? 'bg-[#0B0B0C] text-[#F6F6F4]' : 'bg-[#FCFCFB] text-[#181818]'
    }`}>
      <ScrollProgress />
      <AiBackground isDark={isDark} />
      <Navbar ctaText="Privacy Office" ctaHref="mailto:tangentcoreindia@gmail.com" />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-xs font-mono font-bold ${
            isDark ? 'bg-[#121315] border-white/10 text-[#C7A15A]' : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#B87333]'
          } shadow-sm`}>
            <Cookie className="w-3.5 h-3.5 text-[#C7A15A]" />
            <span className="uppercase tracking-wider">COOKIE POLICY • LAST UPDATED JULY 2026</span>
          </div>

          <h1 className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#181818]'}`}>
            TangentCore Cookie Policy
          </h1>

          <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
            This Cookie Policy explains how TangentCore uses cookies and similar technologies when you visit our website, use our platform, or interact with our services.
          </p>
        </div>

        {/* Content Card */}
        <div className={`p-8 sm:p-12 rounded-3xl border ${
          isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'
        } space-y-8 shadow-2xl leading-relaxed text-sm`}>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#C7A15A]">1. What Are Cookies?</h2>
            <p className={isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}>
              Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences, improve performance, enhance security, and provide analytics on platform usage.
            </p>
          </section>

          <section className="space-y-3 border-t border-white/10 pt-6">
            <h2 className="text-xl font-bold text-[#C7A15A]">2. Types of Cookies We Use</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className={`p-4 rounded-2xl border ${isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-[#F6F5F3] border-[#E5E3DF]'} space-y-1`}>
                <span className="text-sm font-bold text-white block">Essential Cookies</span>
                <p className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>Required for user authentication, session security, and load balancing.</p>
              </div>

              <div className={`p-4 rounded-2xl border ${isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-[#F6F5F3] border-[#E5E3DF]'} space-y-1`}>
                <span className="text-sm font-bold text-white block">Performance & Analytics</span>
                <p className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>Aggregated usage data, page visit duration, and error monitoring.</p>
              </div>

              <div className={`p-4 rounded-2xl border ${isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-[#F6F5F3] border-[#E5E3DF]'} space-y-1`}>
                <span className="text-sm font-bold text-white block">Functional Cookies</span>
                <p className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>Remembers theme preferences, language, and saved dashboard settings.</p>
              </div>

              <div className={`p-4 rounded-2xl border ${isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-[#F6F5F3] border-[#E5E3DF]'} space-y-1`}>
                <span className="text-sm font-bold text-white block">Security Cookies</span>
                <p className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>Detects suspicious login attempts and prevents automated abuse.</p>
              </div>
            </div>
          </section>

          <section className="space-y-3 border-t border-white/10 pt-6">
            <h2 className="text-xl font-bold text-[#C7A15A]">3. Managing Your Cookies</h2>
            <p className={isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}>
              Most web browsers allow you to view, delete, or block cookies through browser settings. Note that disabling essential cookies may impact platform functionality.
            </p>
          </section>

        </div>

      </main>

      <Footer isDark={isDark} />
    </div>
  );
}
