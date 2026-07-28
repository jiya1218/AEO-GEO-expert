'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Brain, ArrowRight, CheckCircle2, ShieldCheck, Zap, Send, Github, Twitter, Linkedin, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { BrandLogo } from '@/components/ui/brand-logo';

interface FooterProps {
  isDark?: boolean;
}

export function Footer({ isDark = true }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    toast.success('Subscribed to TangentCore Intelligence Updates!');
    setEmail('');
  };

  const platformLinks = [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '/#capabilities' },
    { label: 'Solutions', href: '/#capabilities' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'AI Visibility Audit', href: '/dashboard' },
    { label: 'Integrations', href: '/dashboard' },
  ];

  const resourceLinks = [
    { label: 'Blog', href: '/blog' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Documentation', href: '/blog' },
    { label: 'API Reference', href: '/blog' },
    { label: 'Changelog', href: '/blog' },
    { label: 'Help Center', href: '/blog' },
  ];

  const companyLinks = [
    { label: 'About', href: '/' },
    { label: 'Careers', href: '/' },
    { label: 'Contact', href: '/pricing' },
    { label: 'Partners', href: '/' },
    { label: 'Press Kit', href: '/' },
    { label: 'Brand Assets', href: '/' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'Security', href: '#' },
    { label: 'Responsible AI', href: '#' },
    { label: 'Status', href: '#' },
  ];

  return (
    <footer className={`border-t ${isDark ? 'border-white/10 bg-[#0B0B0C] text-[#B7B7B5]' : 'border-[#E5E3DF] bg-[#FCFCFB] text-[#5C5C5C]'} pt-16 pb-8 transition-colors duration-500 relative z-10`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand Header & Newsletter Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-white/10 dark:border-white/10 items-center">
          <div className="lg:col-span-6 space-y-3">
            <BrandLogo isDark={isDark} size="md" subtitle="INTELLIGENT ROUTING ENGINE" />
            <p className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'} leading-relaxed max-w-md`}>
              The enterprise standard for Generative Engine Optimization (GEO) & Answer Engine Optimization (AEO). Command AI recommendations across ChatGPT, Gemini, Claude, Perplexity, DeepSeek, and Grok.
            </p>
          </div>

          <div className="lg:col-span-6 space-y-3">
            <h4 className={`text-xs font-mono font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-[#181818]'}`}>
              Stay Ahead of AI Search
            </h4>
            {subscribed ? (
              <div className="p-3 rounded-xl bg-[#C7A15A]/15 text-[#C7A15A] text-xs font-mono font-bold border border-[#C7A15A]/30 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Subscribed to TangentCore Insider Updates!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter business email..."
                  className={`w-full sm:w-72 text-xs px-4 py-3 rounded-2xl border ${
                    isDark
                      ? 'bg-[#121315] border-white/10 text-white placeholder-[#B7B7B5]/60 focus:border-[#C7A15A]'
                      : 'bg-white border-[#E5E3DF] text-[#181818] placeholder-[#5C5C5C]/60 focus:border-[#B87333]'
                  } focus:outline-none transition-all`}
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl luxury-btn-primary text-xs font-bold shrink-0 shadow-md"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4 Categorized Columns Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-white/10 dark:border-white/10">
          
          {/* Column 1: Platform */}
          <div className="space-y-4">
            <h4 className={`text-xs font-mono font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-[#181818]'}`}>
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              {platformLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`${
                      isDark ? 'text-[#B7B7B5] hover:text-[#C7A15A]' : 'text-[#5C5C5C] hover:text-[#B87333]'
                    } transition-colors block py-0.5`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Resources */}
          <div className="space-y-4">
            <h4 className={`text-xs font-mono font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-[#181818]'}`}>
              Resources
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              {resourceLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`${
                      isDark ? 'text-[#B7B7B5] hover:text-[#C7A15A]' : 'text-[#5C5C5C] hover:text-[#B87333]'
                    } transition-colors block py-0.5`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-4">
            <h4 className={`text-xs font-mono font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-[#181818]'}`}>
              Company
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`${
                      isDark ? 'text-[#B7B7B5] hover:text-[#C7A15A]' : 'text-[#5C5C5C] hover:text-[#B87333]'
                    } transition-colors block py-0.5`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div className="space-y-4">
            <h4 className={`text-xs font-mono font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-[#181818]'}`}>
              Legal
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              {legalLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={`${
                      isDark ? 'text-[#B7B7B5] hover:text-[#C7A15A]' : 'text-[#5C5C5C] hover:text-[#B87333]'
                    } transition-colors block py-0.5`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Operational Status Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C7A15A]" />
            <span className={isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}>
              © {new Date().getFullYear()} TangentCore (<a href="https://tangentcore.in" target="_blank" rel="noreferrer" className="text-[#C7A15A] font-bold hover:underline">tangentcore.in</a>). All rights reserved.
            </span>
          </div>
          
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold ${
            isDark ? 'bg-[#121315] border border-white/10 text-[#C7A15A]' : 'bg-[#F6F5F3] border border-[#E5E3DF] text-[#B87333]'
          }`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C7A15A] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C7A15A]"></span>
            </span>
            <span>All 6 LLM Scanners Active</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
