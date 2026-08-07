'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  HelpCircle, Search, Mail, Clock, ArrowRight, ShieldCheck, FileText, UserCheck, CreditCard, Wrench, ChevronRight 
} from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AiBackground } from '@/components/ui/ai-background';
import { ScrollProgress } from '@/components/ui/scroll-progress';

export default function HelpCenterPage() {
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      title: 'Getting Started',
      icon: FileText,
      articles: ['Creating Your Account', 'Setting Up Your Workspace', 'Verifying Your Website', 'Running Your First Audit', 'Understanding Your Dashboard', 'Inviting Team Members'],
    },
    {
      title: 'Account & Workspace',
      icon: UserCheck,
      articles: ['Update Profile Information', 'Change Your Password', 'Enable Two-Factor Authentication', 'Manage Team Members', 'User Roles & Permissions', 'Delete a Workspace'],
    },
    {
      title: 'Billing & Subscription',
      icon: CreditCard,
      articles: ['View Current Plan', 'Upgrade or Downgrade', 'Payment Methods', 'Billing History', 'Download Invoices', 'Enterprise Licensing'],
    },
    {
      title: 'Troubleshooting & Support',
      icon: Wrench,
      articles: ['Unable to Verify Website', 'Dashboard Not Updating', 'Missing AI Citations', 'Reports Not Generating', 'Integration Errors', 'API Authentication Failed'],
    },
  ];

  const supportContacts = [
    { label: 'General Support', email: 'tangentcoreindia@gmail.com' },
    { label: 'Technical Support', email: 'tangentcoreindia@gmail.com' },
    { label: 'Sales Enquiries', email: 'tangentcoreindia@gmail.com' },
    { label: 'Enterprise Support', email: 'tangentcoreindia@gmail.com' },
  ];

  return (
    <div className={`min-h-screen flex flex-col font-sans relative transition-colors duration-500 ${
      isDark ? 'bg-[#0B0B0C] text-[#F6F6F4]' : 'bg-[#FCFCFB] text-[#181818]'
    }`}>
      <ScrollProgress />
      <AiBackground isDark={isDark} />
      <Navbar ctaText="Contact Support" ctaHref="/contact" />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-xs font-mono font-bold ${
            isDark ? 'bg-[#121315] border-white/10 text-[#C7A15A]' : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#B87333]'
          } shadow-sm`}>
            <HelpCircle className="w-3.5 h-3.5 text-[#C7A15A]" />
            <span className="uppercase tracking-wider">HELP CENTER & KNOWLEDGE BASE</span>
          </div>

          <h1 className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#181818]'}`}>
            How Can We Help You Today?
          </h1>

          <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
            Welcome to the TangentCore Help Center. Find answers to common questions, troubleshoot issues, learn how to use the platform, and get direct support from our team.
          </p>

          {/* Search Placeholder */}
          <div className="max-w-xl mx-auto pt-4 relative">
            <Search className={`absolute left-4 top-4 h-4 w-4 ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles, guides, tutorials, or FAQs..."
              className={`w-full ${
                isDark
                  ? 'bg-[#121315] border-white/10 text-white placeholder-[#B7B7B5]/60 focus:border-[#C7A15A]'
                  : 'bg-white border-[#E5E3DF] text-[#181818] placeholder-[#5C5C5C]/60 focus:border-[#B87333]'
              } border rounded-2xl pl-11 pr-4 py-3.5 text-sm focus:outline-none transition-all shadow-md`}
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className={`p-8 rounded-3xl border ${
                  isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'
                } space-y-4 shadow-xl`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-[#C7A15A]/20 text-[#C7A15A]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold">{cat.title}</h3>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/10">
                  {cat.articles.map((art, aIdx) => (
                    <div key={aIdx} className="flex items-center justify-between text-xs py-1.5 hover:text-[#C7A15A] cursor-pointer transition-colors border-b border-white/5">
                      <span className="font-medium">{art}</span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Support Channels & Hours */}
        <div className={`p-8 sm:p-10 rounded-3xl border ${isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'} space-y-8 shadow-xl`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Contact Support Channels</h3>
              <div className="space-y-3">
                {supportContacts.map((sc) => (
                  <div key={sc.label} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-white font-bold">{sc.label}</span>
                    <a href={`mailto:${sc.email}`} className="text-[#C7A15A] hover:underline flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5" />
                      <span>{sc.email}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Support Hours</h3>
              <div className={`p-5 rounded-2xl ${isDark ? 'bg-[#1B1C1F]' : 'bg-[#F6F5F3]'} space-y-3 text-xs`}>
                <div className="flex items-center justify-between font-mono">
                  <span className="text-white font-bold">Monday – Friday</span>
                  <span className="text-[#C7A15A]">9:00 AM – 6:00 PM (IST)</span>
                </div>
                <div className="flex items-center justify-between font-mono">
                  <span className="text-white font-bold">Saturday</span>
                  <span className="text-[#C7A15A]">10:00 AM – 2:00 PM (IST)</span>
                </div>
                <div className="flex items-center justify-between font-mono">
                  <span className="text-white font-bold">Sunday</span>
                  <span className="text-rose-400">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>

      <Footer isDark={isDark} />
    </div>
  );
}
