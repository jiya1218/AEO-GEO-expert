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
    toast.success('Successfully subscribed to GEO & AEO Insider insights!');
    setEmail('');
  };

  return (
    <footer className={`border-t ${isDark ? 'border-white/10 bg-[#0B0B0C] text-[#B7B7B5]' : 'border-[#E5E3DF] bg-[#FCFCFB] text-[#5C5C5C]'} pt-16 pb-8 transition-colors duration-500 relative z-10`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-white/10 dark:border-white/10">
          
          {/* Brand & Overview */}
          <div className="sm:col-span-2 space-y-4">
            <div>
              <BrandLogo isDark={isDark} size="md" subtitle="INTELLIGENT ROUTING ENGINE" />
            </div>
            
            <p className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'} leading-relaxed max-w-sm`}>
              The enterprise standard for Generative Engine Optimization (GEO) & Answer Engine Optimization (AEO). Monitor, audit, and command brand citations across ChatGPT, Google Gemini, Claude, Perplexity, DeepSeek, and Grok.
            </p>

            {/* Live Operational Status Indicator */}
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-bold ${isDark ? 'bg-[#121315] border border-white/10 text-white' : 'bg-[#F6F5F3] border border-[#E5E3DF] text-[#181818]'} shadow-sm`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C7A15A] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C7A15A]"></span>
              </span>
              <span>All 6 LLM Scanners Operational</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2.5 pt-1">
              <a href="#" className={`p-2 rounded-xl ${isDark ? 'bg-[#121315] hover:bg-[#242529] text-[#B7B7B5] hover:text-white border border-white/10' : 'bg-[#F6F5F3] hover:bg-[#E5E3DF] text-[#5C5C5C] hover:text-[#181818]'} transition-colors`} aria-label="Twitter">
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a href="#" className={`p-2 rounded-lg ${isDark ? 'bg-[#181818] hover:bg-[#202020] text-[#9E9E9E] hover:text-white border border-[#2A2A2A]' : 'bg-white hover:bg-slate-200 text-slate-600 hover:text-slate-900'} transition-colors`} aria-label="GitHub">
                <Github className="w-3.5 h-3.5" />
              </a>
              <a href="#" className={`p-2 rounded-lg ${isDark ? 'bg-[#181818] hover:bg-[#202020] text-[#9E9E9E] hover:text-white border border-[#2A2A2A]' : 'bg-white hover:bg-slate-200 text-slate-600 hover:text-slate-900'} transition-colors`} aria-label="LinkedIn">
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className={`${isDark ? 'text-slate-400 hover:text-cyan-400' : 'text-slate-600 hover:text-cyan-600'} transition-colors block py-0.5`}>
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/pricing" className={`${isDark ? 'text-cyan-400 hover:text-cyan-300' : 'text-cyan-600 hover:text-cyan-700'} font-semibold transition-colors block py-0.5`}>
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className={`${isDark ? 'text-slate-400 hover:text-cyan-400' : 'text-slate-600 hover:text-cyan-600'} transition-colors block py-0.5`}>
                  Live Dashboard
                </Link>
              </li>
              <li>
                <a href="#roi" className={`${isDark ? 'text-slate-400 hover:text-cyan-400' : 'text-slate-600 hover:text-cyan-600'} transition-colors block py-0.5`}>
                  ROI Calculator
                </a>
              </li>
            </ul>
          </div>

          {/* GEO Solutions */}
          <div className="space-y-3">
            <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
              GEO Solutions
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <span className={`${isDark ? 'text-slate-400' : 'text-slate-600'} block py-0.5`}>ChatGPT Citation Engine</span>
              </li>
              <li>
                <span className={`${isDark ? 'text-slate-400' : 'text-slate-600'} block py-0.5`}>Perplexity Recommendation</span>
              </li>
              <li>
                <span className={`${isDark ? 'text-slate-400' : 'text-slate-600'} block py-0.5`}>Gemini AI Overview Audit</span>
              </li>
              <li>
                <span className={`${isDark ? 'text-slate-400' : 'text-slate-600'} block py-0.5`}>JSON-LD Schema Automation</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-3">
            <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
              GEO Insights Newsletter
            </h4>
            <p className={`text-xs ${isDark ? 'text-[#CFCFCF]' : 'text-slate-600'} leading-relaxed`}>
              Get weekly breakdowns of changes in ChatGPT & Perplexity citation algorithms.
            </p>
            {subscribed ? (
              <div className={`p-2.5 rounded-xl border text-[11px] flex items-center gap-2 ${
                isDark ? 'bg-[#D4AF37]/10 border-[#D4AF37]/30 text-[#D4AF37]' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600'
              }`}>
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Subscribed to GEO Insights!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter business email..."
                    className={`w-full text-xs px-3.5 py-2.5 rounded-xl border ${
                      isDark ? 'bg-[#0A0A0A] border-[#2A2A2A] text-white placeholder-[#9E9E9E] focus:border-[#D4AF37]' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-cyan-500'
                    } focus:outline-none transition-all pr-10`}
                  />
                  <button
                    type="submit"
                    className={`absolute right-1 top-1 p-2 rounded-lg ${
                      isDark ? 'bg-[#D4AF37] text-[#111111] hover:bg-[#F5D76E]' : 'bg-cyan-500 hover:bg-cyan-400 text-white'
                    } transition-colors`}
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Compact Bottom Copyright Bar */}
        <div className={`pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] ${isDark ? 'text-[#9E9E9E]' : 'text-slate-500'}`}>
          <div className="flex items-center gap-1.5">
            <Sparkles className={`w-3.5 h-3.5 ${isDark ? 'text-[#D4AF37]' : 'text-cyan-500'}`} />
            <span>© {new Date().getFullYear()} TangentCore (<a href="https://tangentcore.in" target="_blank" rel="noreferrer" className={`${isDark ? 'text-[#D4AF37] hover:text-[#F5D76E]' : 'text-cyan-500'} hover:underline font-bold`}>tangentcore.in</a>). All rights reserved.</span>
          </div>
          
          <div className="flex items-center gap-5">
            <a href="#" className={`hover:${isDark ? 'text-white' : 'text-slate-900'} transition-colors`}>Privacy Policy</a>
            <a href="#" className={`hover:${isDark ? 'text-white' : 'text-slate-900'} transition-colors`}>Terms of Service</a>
            <a href="#" className={`hover:${isDark ? 'text-white' : 'text-slate-900'} transition-colors`}>Security</a>
            <a href="#" className={`hover:${isDark ? 'text-white' : 'text-slate-900'} transition-colors`}>GEO Standard 2.0</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
