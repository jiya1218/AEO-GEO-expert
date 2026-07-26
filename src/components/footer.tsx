'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Brain, ArrowRight, CheckCircle2, ShieldCheck, Zap, Send, Github, Twitter, Linkedin, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

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
    <footer className={`border-t ${isDark ? 'border-slate-800/80 bg-slate-950 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'} pt-12 pb-6 transition-colors duration-300 relative z-10`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-8 border-b border-slate-800/40">
          
          {/* Brand & Overview */}
          <div className="sm:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-md shadow-cyan-500/20">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className={`font-extrabold text-lg ${isDark ? 'bg-gradient-to-r from-white via-slate-100 to-cyan-400 bg-clip-text text-transparent' : 'text-slate-900'}`}>
                AEO / GEO Expert System
              </span>
            </div>
            
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'} leading-relaxed max-w-sm`}>
              The enterprise standard for Generative Engine Optimization (GEO) & Answer Engine Optimization (AEO). Monitor, audit, and command brand citations across ChatGPT, Google Gemini, Claude, Perplexity, DeepSeek, and Grok.
            </p>

            {/* Live Operational Status Indicator */}
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold ${isDark ? 'bg-slate-900/90 border border-slate-800 text-slate-300' : 'bg-white border border-slate-200 text-slate-700'} shadow-sm`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>All 6 LLM Scanners Operational</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2.5 pt-1">
              <a href="#" className={`p-2 rounded-lg ${isDark ? 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white' : 'bg-white hover:bg-slate-200 text-slate-600 hover:text-slate-900'} transition-colors`} aria-label="Twitter">
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a href="#" className={`p-2 rounded-lg ${isDark ? 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white' : 'bg-white hover:bg-slate-200 text-slate-600 hover:text-slate-900'} transition-colors`} aria-label="GitHub">
                <Github className="w-3.5 h-3.5" />
              </a>
              <a href="#" className={`p-2 rounded-lg ${isDark ? 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white' : 'bg-white hover:bg-slate-200 text-slate-600 hover:text-slate-900'} transition-colors`} aria-label="LinkedIn">
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
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'} leading-relaxed`}>
              Get weekly breakdowns of changes in ChatGPT & Perplexity citation algorithms.
            </p>
            {subscribed ? (
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] flex items-center gap-2">
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
                    className={`w-full text-xs px-3 py-2 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500 focus:border-cyan-500' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-cyan-500'} focus:outline-none transition-colors`}
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 p-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-white transition-colors"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Compact Bottom Copyright Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-cyan-500" />
            <span>© {new Date().getFullYear()} Scalezix AEO / GEO Expert System. All rights reserved.</span>
          </div>
          
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Security</a>
            <a href="#" className="hover:text-slate-400 transition-colors">GEO Standard 2.0</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
