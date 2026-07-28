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
  // Dimension mappings matching user reference image
  const dimensions = {
    sm: {
      img: 'h-8 w-auto',
      title: 'text-xl',
      sub: 'text-[9px] tracking-[0.2em]',
      gap: 'gap-3',
    },
    md: {
      img: 'h-11 sm:h-12 w-auto',
      title: 'text-2xl sm:text-3xl',
      sub: 'text-[10px] sm:text-[11px] tracking-[0.25em]',
      gap: 'gap-3.5 sm:gap-4',
    },
    lg: {
      img: 'h-14 sm:h-16 w-auto',
      title: 'text-3xl sm:text-4xl',
      sub: 'text-[11px] sm:text-[12px] tracking-[0.28em]',
      gap: 'gap-4 sm:gap-5',
    },
    xl: {
      img: 'h-20 sm:h-24 w-auto',
      title: 'text-4xl sm:text-5xl',
      sub: 'text-[12px] sm:text-[14px] tracking-[0.3em]',
      gap: 'gap-5 sm:gap-6',
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
            isDark ? 'text-[#B7B7B5]/80' : 'text-[#5C5C5C]/80'
          }`}>
            {subtitle}
          </span>
        )}
      </div>
    </Link>
  );
}
