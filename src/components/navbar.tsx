'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sun, Moon, ArrowRight, LogOut, User, LayoutDashboard } from 'lucide-react';
import { BrandLogo } from '@/components/ui/brand-logo';
import { useTheme } from '@/components/theme-provider';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

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
  const [user, setUser] = useState<any>(null);

  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Signed out successfully');
      window.location.href = '/login';
    } catch (err: any) {
      toast.error(err.message || 'Failed to sign out');
    }
  };

  const navLinks = [
    { label: 'Features', href: '/#capabilities' },
    { label: 'Tools Hub', href: '/tools' },
    { label: 'Prices', href: '/pricing' },
    { label: 'EEAT Analyses', href: '/tools/eeat-analyzer' },
    { label: 'Blog', href: '/blog' },
  ];

  return (
    <nav
      className={`border-b ${
        isDark ? 'border-white/10 bg-[#0B0B0C]/90 text-[#F6F6F4]' : 'border-[#E5E3DF] bg-[#FCFCFB]/90 text-[#181818]'
      } backdrop-blur-2xl sticky top-0 z-40 transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center shrink-0">
          <BrandLogo isDark={isDark} size="md" subtitle="INTELLIGENT ROUTING ENGINE" />
        </div>

        {/* Center: Main Navigation Menu Links (Responsive Flex without Absolute Overlap) */}
        <div className="hidden xl:flex items-center justify-center gap-5 2xl:gap-7 text-xs 2xl:text-sm font-mono font-bold uppercase tracking-wider flex-1 min-w-0">
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

        {/* Right: Theme Toggle & Auth / CTA Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Theme Toggle */}
          <button
            suppressHydrationWarning
            onClick={toggleTheme}
            className={`p-2 sm:p-2.5 rounded-2xl border ${
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

          {user ? (
            /* Logged-In User State: User pill + Sign Out button */
            <div className="flex items-center gap-2">
              <div
                className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-mono font-medium ${
                  isDark ? 'bg-[#121315] border-white/10 text-[#B7B7B5]' : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#5C5C5C]'
                }`}
                title={user.email}
              >
                <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-[#C7A15A]' : 'bg-[#B87333]'} animate-pulse`} />
                <span className="max-w-[110px] 2xl:max-w-[150px] truncate">{user.email || 'User'}</span>
              </div>

              {pathname !== '/dashboard' && (
                <Link
                  href="/dashboard"
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold transition-all ${
                    isDark
                      ? 'bg-[#18191C] border-white/10 text-white hover:border-[#C7A15A]'
                      : 'bg-white border-[#E5E3DF] text-[#181818] hover:border-[#B87333] shadow-xs'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Dashboard</span>
                </Link>
              )}

              <button
                type="button"
                onClick={handleLogout}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold transition-all ${
                  isDark
                    ? 'bg-[#121315] border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/40'
                    : 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100 hover:border-red-300'
                }`}
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            /* Logged-Out State: Login link + CTA Button */
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className={`hidden sm:inline-flex items-center px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-colors ${
                  isDark ? 'text-[#B7B7B5] hover:text-white' : 'text-[#5C5C5C] hover:text-[#181818]'
                }`}
              >
                Login
              </Link>
              <Link
                href={ctaHref}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl luxury-btn-primary font-bold text-sm shadow-lg shadow-[#C7A15A]/20 transition-transform hover:scale-105"
              >
                <span>{ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}
