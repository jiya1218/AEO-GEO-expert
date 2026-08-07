'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Briefcase, Mail, ArrowRight, CheckCircle2, Sparkles, Heart, Zap, ShieldCheck 
} from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AiBackground } from '@/components/ui/ai-background';
import { ScrollProgress } from '@/components/ui/scroll-progress';

export default function CareersPage() {
  const { isDark } = useTheme();

  const openPositions = [
    {
      title: 'AI Automation Engineer',
      type: 'Full-time / Intern',
      dept: 'Engineering & Automation',
      loc: 'Hybrid / i-Hub Ahmedabad',
      desc: 'Design and implement workflow automations connecting CRMs, databases, and communication channels using APIs, Make.com, and Python.',
      skills: ['REST APIs', 'Make.com / Zapier', 'Python / Node.js', 'AI Prompts / LangChain'],
    },
    {
      title: 'Full-Stack Developer (Next.js)',
      type: 'Full-time',
      dept: 'Engineering',
      loc: 'Hybrid / i-Hub Ahmedabad',
      desc: 'Build beautiful, highly performant web applications, internal tools, and client portals using React, Next.js, and Tailwind CSS.',
      skills: ['React & TypeScript', 'Next.js App Router', 'Tailwind CSS', 'Node.js & PostgreSQL'],
    },
    {
      title: 'Database Analyst',
      type: 'Full-time',
      dept: 'Data & Infrastructure',
      loc: 'Hybrid / i-Hub Ahmedabad',
      desc: 'Collect and document user requirements. Design and develop database architecture for information systems projects. Design, construct, modify, integrate, implement and test data models and database management systems. Conduct research and provide advice to other informatics professionals regarding the selection, application and implementation of database management tools. Operate database management systems to analyze data and perform data mining analysis. May lead, coordinate or supervise other workers in this group.',
      skills: ['Database Architecture', 'Data Modeling', 'DBMS Integration', 'Data Mining & Analysis', 'Requirements Collection', 'Team Coordination'],
    },
    {
      title: 'SEO & Growth Marketer',
      type: 'Full-time',
      dept: 'Marketing & Growth',
      loc: 'Hybrid / i-Hub Ahmedabad',
      desc: 'Own organic search acquisition and paid campaigns. Design content structures and implement SEO/AEO funnels for Scalezix and clients.',
      skills: ['Technical SEO & AEO', 'Google & Meta Ads', 'Conversion Optimization', 'Content Automation'],
    },
  ];

  const values = [
    { title: 'AI-First Culture', desc: 'Prompting, automation, and model integrations are at the core of everything we do.' },
    { title: 'High Speed & Zero Bureaucracy', desc: 'We ship modular code and live automations in weeks, not quarters. No red tape.' },
    { title: 'Real Commercial Impact', desc: 'Your work will qualify real leads, route millions in revenue, and save thousands of manual hours.' },
    { title: 'Ownership & Speed', desc: 'Every team member is trusted to make decisions, write clean code, and drive meaningful outcomes.' },
    { title: 'Excellence in AI & Search', desc: 'We value high-trust engineering, attention to detail, and next-generation AEO/GEO systems.' },
  ];

  return (
    <div className={`min-h-screen flex flex-col font-sans relative transition-colors duration-500 ${
      isDark ? 'bg-[#0B0B0C] text-[#F6F6F4]' : 'bg-[#FCFCFB] text-[#181818]'
    }`}>
      <ScrollProgress />
      <AiBackground isDark={isDark} />
      <Navbar ctaText="View Open Positions" ctaHref="#positions" />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 space-y-20">
        
        {/* Header */}
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-xs font-mono font-bold ${
            isDark ? 'bg-[#121315] border-white/10 text-[#C7A15A]' : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#B87333]'
          } shadow-sm`}>
            <Briefcase className="w-3.5 h-3.5 text-[#C7A15A]" />
            <span className="uppercase tracking-wider">CAREERS AT SCALEZIX & TANGENTCORE</span>
          </div>

          <h1 className={`text-4xl sm:text-6xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#181818]'}`}>
            Build the Future of AI with Scalezix
          </h1>

          <p className={`text-lg sm:text-xl leading-relaxed ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
            We are an AI-first engineering and automation team based in Ahmedabad. We value speed, clean execution, and direct business impact. If you want to move fast and build things that companies actually use, you belong here.
          </p>
        </div>

        {/* Our Values */}
        <div className="space-y-8">
          <h2 className="text-3xl font-extrabold text-center">Why Work Here</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {values.map((v) => (
              <div key={v.title} className={`p-6 rounded-3xl border ${isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'} space-y-2`}>
                <span className="text-sm font-bold text-[#C7A15A] block">{v.title}</span>
                <p className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Open Positions List */}
        <div id="positions" className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold">Open Positions</h2>
            <p className={`text-sm ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
              Review our active roles and apply by sending your resume.
            </p>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {openPositions.map((pos, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-3xl border ${
                  isDark ? 'bg-[#121315] border-white/10 hover:border-[#C7A15A]/40' : 'bg-white border-[#E5E3DF] hover:border-[#B87333]/40'
                } flex flex-col gap-4 shadow-xl transition-all`}
              >
                <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4 ${
                  isDark ? 'border-white/10' : 'border-[#E5E3DF]'
                }`}>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-[#181818]'}`}>{pos.title}</h3>
                      <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold ${
                        isDark ? 'bg-[#C7A15A]/20 text-[#C7A15A]' : 'bg-[#B87333]/15 text-[#B87333]'
                      }`}>
                        {pos.type}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-md border text-xs font-mono ${
                        isDark ? 'bg-white/5 border-white/10 text-[#A0A0A5]' : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#5C5C5C]'
                      }`}>
                        {pos.dept}
                      </span>
                    </div>
                    <span className={`text-xs font-mono block ${isDark ? 'text-[#C7A15A]' : 'text-[#B87333]'}`}>📍 Location: {pos.loc}</span>
                  </div>

                  <a
                    href={`mailto:tangentcoreindia@gmail.com?subject=Application for ${encodeURIComponent(pos.title)}`}
                    className="px-5 py-2.5 rounded-xl luxury-btn-primary text-xs font-bold shrink-0 shadow-md flex items-center gap-1.5"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>{pos.desc}</p>

                {/* Skill Badges */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {pos.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`text-[10px] font-mono px-2.5 py-1 rounded-lg border font-semibold ${
                        isDark 
                          ? 'bg-[#C7A15A]/10 text-[#C7A15A] border-[#C7A15A]/30' 
                          : 'bg-[#B87333]/10 text-[#7E4A19] border-[#B87333]/30'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* General Application Footer */}
        <div className={`rounded-3xl p-8 text-center space-y-4 shadow-2xl max-w-3xl mx-auto border ${
          isDark 
            ? 'luxury-gradient-card border-[#C7A15A]/40' 
            : 'bg-white border-[#E5E3DF]'
        }`}>
          <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#181818]'}`}>Don't See a Suitable Role?</h3>
          <p className={`text-xs ${isDark ? 'text-[#E5E3DF]/80' : 'text-[#5C5C5C]'}`}>
            We're always interested in meeting talented people. Send your resume and portfolio directly to our talent acquisition team.
          </p>
          <a
            href="mailto:tangentcoreindia@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl luxury-btn-primary font-bold text-xs shadow-lg"
          >
            <Mail className="w-4 h-4" />
            <span>Send Resume to tangentcoreindia@gmail.com</span>
          </a>
        </div>

      </main>

      <Footer isDark={isDark} />
    </div>
  );
}
