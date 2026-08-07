'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Twitter, Github, Linkedin, Sparkles, CheckCircle2 } from 'lucide-react';
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
    { label: 'Features', href: '/features' },
    { label: 'Solutions', href: '/tools' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'AI Visibility Audit', href: '/dashboard' },
    { label: 'Integrations', href: '/docs' },
  ];

  const resourceLinks = [
    { label: 'Blog', href: '/blog' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Documentation', href: '/docs' },
    { label: 'API Reference', href: '/api-reference' },
    { label: 'Changelog', href: '/changelog' },
    { label: 'Help Center', href: '/help' },
  ];

  const companyLinks = [
    { label: 'About', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
    { label: 'Partners', href: '/partners' },
    { label: 'Press Kit', href: '/press-kit' },
    { label: 'Brand Assets', href: '/brand-assets' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookie-policy' },
    { label: 'Security', href: '/security' },
    { label: 'Responsible AI', href: '/responsible-ai' },
    { label: 'Status', href: '/status' },
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
            {/* Brand Logo & Venture Badge */}
            <div className="space-y-3">
              <BrandLogo isDark={isDark || true} size="lg" subtitle="AI VISIBILITY INTELLIGENCE" />
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C7A15A]/10 border border-[#C7A15A]/30 text-xs font-mono font-bold text-[#C7A15A]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>A Scalezix Venture</span>
              </div>
            </div>
            
            <p className={`text-sm ${isDark ? 'text-[#B7B7B5]' : 'text-[#A0A0A5]'} leading-relaxed max-w-sm`}>
              Enterprise AI Visibility Intelligence for monitoring, analysing, and optimising how your brand is discovered across AI-powered search and answer engines.
            </p>

            {/* Newsletter Inline Subscription Box */}
            <div className="pt-2 max-w-sm">
              {subscribed ? (
                <div className="p-3.5 rounded-xl bg-[#C7A15A]/15 text-[#C7A15A] text-sm font-mono font-bold border border-[#C7A15A]/30 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Subscribed to TangentCore Insider!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="relative">
                  <input
                    suppressHydrationWarning
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work email"
                    className="w-full text-sm pl-4 pr-28 py-3 rounded-xl bg-[#0F1014] border border-white/15 text-white placeholder-[#85858A] focus:border-[#C7A15A] focus:outline-none transition-all"
                  />
                  <button
                    suppressHydrationWarning
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-4 rounded-lg luxury-btn-primary text-xs sm:text-sm font-bold shadow-xs"
                  >
                    Get Updates
                  </button>
                </form>
              )}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-1">
              <a href="#" className="p-2.5 rounded-xl bg-[#0F1014] border border-white/10 text-[#A0A0A5] hover:text-white hover:border-white/30 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-[#0F1014] border border-white/10 text-[#A0A0A5] hover:text-white hover:border-white/30 transition-colors" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-[#0F1014] border border-white/10 text-[#A0A0A5] hover:text-white hover:border-white/30 transition-colors" aria-label="X (Twitter)">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: PLATFORM (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm sm:text-base font-mono font-bold uppercase tracking-wider text-white">
              PLATFORM
            </h4>
            <ul className="space-y-3 text-sm sm:text-base font-medium">
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
            <h4 className="text-sm sm:text-base font-mono font-bold uppercase tracking-wider text-white">
              RESOURCES
            </h4>
            <ul className="space-y-3 text-sm sm:text-base font-medium">
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
            <h4 className="text-sm sm:text-base font-mono font-bold uppercase tracking-wider text-white">
              COMPANY
            </h4>
            <ul className="space-y-3 text-sm sm:text-base font-medium">
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
            <h4 className="text-sm sm:text-base font-mono font-bold uppercase tracking-wider text-white">
              LEGAL
            </h4>
            <ul className="space-y-3 text-sm sm:text-base font-medium">
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
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm font-mono text-[#85858A]">
          <div className="flex items-center gap-2 flex-wrap">
            <Sparkles className="w-4 h-4 text-[#C7A15A]" />
            <span>© {new Date().getFullYear()} TangentCore. All rights reserved.</span>
            <span className="text-[#C7A15A] font-semibold">• A Scalezix Venture</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-[#B7B7B5]">Enterprise AI Visibility Intelligence for the Next Generation of Search.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
