'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sun, Moon, ArrowRight } from 'lucide-react';
import { BrandLogo } from '@/components/ui/brand-logo';
import { useTheme } from '@/components/theme-provider';

interface NavbarProps {
  isDark?: boolean;
  setIsDark?: (val: boolean | ((prev: boolean) => boolean)) => void;
  ctaText?: string;
  ctaHref?: string;
}

export function Navbar({
  ctaText = 'Get Started',
  ctaHref = '/dashboard',
}: NavbarProps) {
  const pathname = usePathname();
  const { isDark, toggleTheme } = useTheme();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Capabilities', href: '/#capabilities' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Blog', href: '/blog' },
    { label: 'Dashboard', href: '/dashboard' },
  ];

  return (
    <nav
      className={`border-b ${
        isDark ? 'border-white/10 bg-[#0B0B0C]/90 text-[#F6F6F4]' : 'border-[#E5E3DF] bg-[#FCFCFB]/90 text-[#181818]'
      } backdrop-blur-2xl sticky top-0 z-40 transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center shrink-0">
          <BrandLogo isDark={isDark} size="md" subtitle="INTELLIGENT ROUTING ENGINE" />
        </div>

        {/* Center: Main Navigation Menu Links - Mathematically Centered */}
        <div className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 text-xs font-mono font-bold uppercase tracking-wider absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href) && !link.href.includes('#'));
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`transition-all py-1 shrink-0 relative ${
                  isActive
                    ? isDark
                      ? 'text-[#C7A15A] font-extrabold'
                      : 'text-[#B87333] font-extrabold'
                    : isDark
                    ? 'text-[#B7B7B5] hover:text-white'
                    : 'text-[#3A3A3A] hover:text-[#181818]'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span
                    className={`absolute bottom-0 inset-x-0 h-0.5 rounded-full ${
                      isDark ? 'bg-[#C7A15A]' : 'bg-[#B87333]'
                    }`}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right: Icon-Only Theme Toggle & Primary CTA Button */}
        <div className="flex items-center gap-3.5 shrink-0">
          {/* Icon-Only Theme Toggle (Persistent Global State) */}
          <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-2xl border ${
              isDark
                ? 'bg-[#121315] border-white/10 text-[#C7A15A] hover:border-[#C7A15A] hover:bg-[#1B1C1F]'
                : 'bg-white border-[#E5E3DF] text-[#B87333] hover:border-[#B87333] hover:bg-[#F6F5F3]'
            } transition-all shadow-xs flex items-center justify-center group`}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-[#C7A15A] transition-transform duration-300 group-hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-[#B87333] transition-transform duration-300 group-hover:-rotate-12" />
            )}
          </button>

          {/* Primary CTA */}
          <Link
            href={ctaHref}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl luxury-btn-primary font-bold text-xs shadow-lg shadow-[#C7A15A]/20 transition-transform hover:scale-105"
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </nav>
  );
}
