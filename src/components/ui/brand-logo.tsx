'use client';

import React from 'react';
import Link from 'next/link';

interface BrandLogoProps {
  isDark?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  subtitle?: string;
  className?: string;
}

export function BrandLogo({
  isDark = true,
  size = 'md',
  subtitle = 'INTELLIGENT ROUTING ENGINE',
  className = '',
}: BrandLogoProps) {
  // Dimension mappings with smaller, sleeker subtitle sizing
  const dimensions = {
    sm: {
      img: 'h-7 w-auto',
      title: 'text-lg',
      sub: 'text-[6px] tracking-[0.2em]',
      gap: 'gap-2.5',
    },
    md: {
      img: 'h-9 sm:h-10 w-auto',
      title: 'text-xl sm:text-2xl',
      sub: 'text-[7.5px] sm:text-[8.5px] tracking-[0.22em]',
      gap: 'gap-3',
    },
    lg: {
      img: 'h-12 sm:h-14 w-auto',
      title: 'text-2xl sm:text-3xl',
      sub: 'text-[8.5px] sm:text-[9.5px] tracking-[0.24em]',
      gap: 'gap-3.5 sm:gap-4',
    },
    xl: {
      img: 'h-16 sm:h-20 w-auto',
      title: 'text-3xl sm:text-4xl',
      sub: 'text-[10px] sm:text-[11px] tracking-[0.26em]',
      gap: 'gap-4 sm:gap-5',
    },
  }[size];

  return (
    <Link href="/" className={`inline-flex items-center ${dimensions.gap} group select-none ${className}`}>
      {/* Metallic T Logo Image Mark - Clean, transparent background without box */}
      <img
        src="/logo.png"
        alt="TangentCore Logo"
        className={`${dimensions.img} object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-md`}
      />

      {/* Typography: "Tangent" (White/Black) + "Core" (Gold/Bronze) & Spaced Subtitle */}
      <div className="flex flex-col justify-center leading-none">
        <div className={`font-black ${dimensions.title} tracking-tight flex items-baseline`}>
          <span className={isDark ? 'text-white' : 'text-[#181818]'}>Tangent</span>
          <span className={isDark ? 'text-[#C7A15A]' : 'text-[#B87333]'}>Core</span>
        </div>

        {subtitle && (
          <span className={`font-mono uppercase font-bold ${dimensions.sub} mt-1 ${
            isDark ? 'text-[#B7B7B5]' : 'text-[#3A3A3A]'
          }`}>
            {subtitle}
          </span>
        )}
      </div>
    </Link>
  );
}
