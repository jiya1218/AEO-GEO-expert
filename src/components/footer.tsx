'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Twitter, Github, Linkedin, Sparkles, Send, CheckCircle2 } from 'lucide-react';
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
    <footer
      className={`border-t ${
        isDark
          ? 'bg-[#040405] border-[#C7A15A]/30 text-[#A0A0A5] shadow-[0_-20px_50px_rgba(0,0,0,0.9)]'
          : 'bg-[#121315] border-[#B87333]/40 text-[#E5E3DF] shadow-2xl'
      } pt-16 sm:pt-20 pb-12 transition-colors duration-500 relative z-20`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 5-Column Layout Matching Reference Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand Column (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-5">
            <BrandLogo isDark={isDark || true} size="md" subtitle="INTELLIGENT ROUTING ENGINE" />
            
            <p className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#A0A0A5]'} leading-relaxed max-w-sm`}>
              The enterprise standard for Generative Engine Optimization (GEO) & Answer Engine Optimization (AEO). Command AI recommendations across ChatGPT, Gemini, Claude, Perplexity, DeepSeek, and Grok.
            </p>

            {/* Newsletter Inline Subscription Box */}
            <div className="pt-2 max-w-sm">
              {subscribed ? (
                <div className="p-3 rounded-xl bg-[#C7A15A]/15 text-[#C7A15A] text-xs font-mono font-bold border border-[#C7A15A]/30 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Subscribed to TangentCore Insider!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter work email..."
                    className="w-full text-xs pl-4 pr-24 py-3 rounded-xl bg-[#0F1014] border border-white/15 text-white placeholder-[#85858A] focus:border-[#C7A15A] focus:outline-none transition-all"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-3.5 rounded-lg luxury-btn-primary text-xs font-bold shadow-xs"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-1">
              <a href="#" className="p-2 rounded-xl bg-[#0F1014] border border-white/10 text-[#A0A0A5] hover:text-white hover:border-white/30 transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-[#0F1014] border border-white/10 text-[#A0A0A5] hover:text-white hover:border-white/30 transition-colors" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-[#0F1014] border border-white/10 text-[#A0A0A5] hover:text-white hover:border-white/30 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: PLATFORM (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              PLATFORM
            </h4>
            <ul className="space-y-3 text-xs font-medium">
              {platformLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[#A0A0A5] hover:text-[#C7A15A] transition-colors block py-0.5"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: RESOURCES (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              RESOURCES
            </h4>
            <ul className="space-y-3 text-xs font-medium">
              {resourceLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[#A0A0A5] hover:text-[#C7A15A] transition-colors block py-0.5"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: COMPANY (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              COMPANY
            </h4>
            <ul className="space-y-3 text-xs font-medium">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[#A0A0A5] hover:text-[#C7A15A] transition-colors block py-0.5"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: LEGAL (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              LEGAL
            </h4>
            <ul className="space-y-3 text-xs font-medium">
              {legalLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-[#A0A0A5] hover:text-[#C7A15A] transition-colors block py-0.5"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar Matching Reference Image */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#85858A]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C7A15A]" />
            <span>© {new Date().getFullYear()} TangentCore (<a href="https://tangentcore.in" target="_blank" rel="noreferrer" className="text-[#C7A15A] font-bold hover:underline">tangentcore.in</a>). All rights reserved.</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-[#B7B7B5]">The Enterprise Standard for Multi-Model AI Search Optimization.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
