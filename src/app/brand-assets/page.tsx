'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Palette, Download, Mail, CheckCircle2, AlertCircle, Sparkles, FileText, Image, ShieldCheck 
} from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AiBackground } from '@/components/ui/ai-background';
import { ScrollProgress } from '@/components/ui/scroll-progress';

export default function BrandAssetsPage() {
  const { isDark } = useTheme();

  const handleDownloadAsset = (assetName: string) => {
    toast.success(`Started download for ${assetName}`);
  };

  const colours = [
    { name: 'Midnight Black', hex: '#0B0B0B', class: 'bg-[#0B0B0B] text-white border-white/20' },
    { name: 'Champagne Gold', hex: '#D6B36A', class: 'bg-[#D6B36A] text-black border-black/20' },
    { name: 'Graphite', hex: '#2A2A2A', class: 'bg-[#2A2A2A] text-white border-white/20' },
    { name: 'Soft White', hex: '#F8F8F8', class: 'bg-[#F8F8F8] text-black border-black/20' },
    { name: 'Slate Grey', hex: '#6B7280', class: 'bg-[#6B7280] text-white border-white/20' },
  ];

  const logoVariants = [
    { title: 'Primary Logo', desc: 'Use whenever possible across digital and print media.', format: 'SVG, PNG, PDF' },
    { title: 'Dark Background Logo', desc: 'Optimised for dark interfaces and presentations.', format: 'SVG, PNG' },
    { title: 'Light Background Logo', desc: 'Designed for white or light-coloured backgrounds.', format: 'SVG, PNG' },
    { title: 'Brand Icon Mark', desc: 'Favicons, mobile applications, and social profile avatars.', format: 'SVG, PNG, ICO' },
  ];

  const screenshots = [
    'AI Visibility Dashboard', 'AI Visibility Reports', 'Analytics & Trends', 'Brand Audit Matrix', 'Citation Intelligence'
  ];

  return (
    <div className={`min-h-screen flex flex-col font-sans relative transition-colors duration-500 ${
      isDark ? 'bg-[#0B0B0C] text-[#F6F6F4]' : 'bg-[#FCFCFB] text-[#181818]'
    }`}>
      <ScrollProgress />
      <AiBackground isDark={isDark} />
      <Navbar ctaText="Press Kit" ctaHref="/press-kit" />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-xs font-mono font-bold ${
            isDark ? 'bg-[#121315] border-white/10 text-[#C7A15A]' : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#B87333]'
          } shadow-sm`}>
            <Palette className="w-3.5 h-3.5 text-[#C7A15A]" />
            <span className="uppercase tracking-wider">BRAND ASSETS & GUIDELINES</span>
          </div>

          <h1 className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#181818]'}`}>
            Official TangentCore Brand Resources
          </h1>

          <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
            Welcome to the TangentCore Brand Assets page. Here you'll find our official logos, icons, typography, colours, and usage guidelines to ensure our brand is represented consistently.
          </p>

          <div className="pt-2 flex justify-center gap-4">
            <button
              onClick={() => handleDownloadAsset('TangentCore Complete Brand Kit (.zip)')}
              className="px-6 py-3 rounded-xl luxury-btn-primary font-bold text-xs flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
            >
              <Download className="w-4 h-4" />
              <span>Download Brand Kit (.zip)</span>
            </button>
          </div>
        </div>

        {/* Logo Downloads Grid */}
        <div className="space-y-6">
          <h2 className="text-2xl font-extrabold">Logo Variations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {logoVariants.map((logo) => (
              <div
                key={logo.title}
                className={`p-6 rounded-3xl border ${
                  isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'
                } space-y-4 shadow-xl flex flex-col justify-between`}
              >
                <div className="space-y-2">
                  <span className="text-base font-bold text-white block">{logo.title}</span>
                  <p className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>{logo.desc}</p>
                  <span className="text-[10px] font-mono text-[#C7A15A] block">Formats: {logo.format}</span>
                </div>

                <button
                  onClick={() => handleDownloadAsset(logo.title)}
                  className={`w-full py-2.5 rounded-xl border text-xs font-mono font-bold flex items-center justify-center gap-2 ${
                    isDark ? 'bg-[#1B1C1F] border-white/10 text-white hover:border-[#C7A15A]' : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#181818]'
                  } transition-all`}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download {logo.title}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Colours */}
        <div className={`p-8 rounded-3xl border ${isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'} space-y-6 shadow-xl`}>
          <h2 className="text-2xl font-extrabold">Brand Palette</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {colours.map((c) => (
              <div key={c.name} className={`p-4 rounded-2xl border ${c.class} space-y-2 shadow-md`}>
                <div className="w-full h-12 rounded-xl bg-current opacity-20 border border-current" />
                <div>
                  <span className="text-xs font-bold block">{c.name}</span>
                  <span className="text-[10px] font-mono font-bold block">{c.hex}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Usage Do's and Don'ts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`p-6 rounded-3xl border ${isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'} space-y-3`}>
            <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> Always
            </h3>
            <ul className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'} space-y-2`}>
              <li>• Maintain clear padding & spacing around the logo.</li>
              <li>• Use official brand colours (#0B0B0B & #D6B36A).</li>
              <li>• Scale logos proportionally without stretching.</li>
              <li>• Use approved logo variations for light/dark backdrops.</li>
            </ul>
          </div>

          <div className={`p-6 rounded-3xl border ${isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'} space-y-3`}>
            <h3 className="text-lg font-bold text-rose-400 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" /> Never
            </h3>
            <ul className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'} space-y-2`}>
              <li>• Stretch, distort, or skew the logo aspect ratio.</li>
              <li>• Rotate or tilt the logo mark.</li>
              <li>• Modify or swap official brand colours.</li>
              <li>• Place the logo on unapproved low-contrast backgrounds.</li>
            </ul>
          </div>
        </div>

        {/* Custom Asset Request */}
        <div className={`rounded-3xl p-8 text-center space-y-4 shadow-2xl max-w-3xl mx-auto border ${
          isDark 
            ? 'luxury-gradient-card border-[#C7A15A]/40' 
            : 'bg-white border-[#E5E3DF]'
        }`}>
          <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#181818]'}`}>Need Custom Branding Materials?</h3>
          <p className={`text-xs ${isDark ? 'text-[#E5E3DF]/80' : 'text-[#5C5C5C]'}`}>
            If you require custom vector assets, press badges, or high-res vector graphics, our brand design team is happy to assist.
          </p>
          <a href="mailto:tangentcoreindia@gmail.com" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl luxury-btn-primary font-bold text-xs shadow-lg">
            <Mail className="w-4 h-4" />
            <span>Contact Brand Team (tangentcoreindia@gmail.com)</span>
          </a>
        </div>

      </main>

      <Footer isDark={isDark} />
    </div>
  );
}
