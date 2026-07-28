'use client';

import { useMemo, useState, useEffect } from 'react';

interface AiBackgroundProps {
  isDark: boolean;
}

// Deterministic pseudo-random generator for SSR/hydration consistency
function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export function AiBackground({ isDark }: AiBackgroundProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate floating gold dust particles deterministically
  const particles = useMemo(() => {
    return Array.from({ length: 55 }, (_, i) => ({
      id: i,
      x: (pseudoRandom(i * 1.1 + 1) * 100).toFixed(4),
      y: (pseudoRandom(i * 2.3 + 2) * 100).toFixed(4),
      size: (pseudoRandom(i * 3.7 + 3) * 2.5 + 1.2).toFixed(4),
      duration: (pseudoRandom(i * 4.9 + 4) * 8 + 6).toFixed(4), // slower, subtle movement
      delay: (pseudoRandom(i * 5.2 + 5) * 5).toFixed(4),
      opacity: Number((pseudoRandom(i * 6.4 + 6) * 0.25 + 0.1).toFixed(4)),
    }));
  }, []);

  // Generate subtle geometric connection lines
  const connections = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x1: (pseudoRandom(i * 7.1 + 10) * 100).toFixed(4),
      y1: (pseudoRandom(i * 8.3 + 20) * 100).toFixed(4),
      x2: (pseudoRandom(i * 9.5 + 30) * 100).toFixed(4),
      y2: (pseudoRandom(i * 10.7 + 40) * 100).toFixed(4),
      duration: (pseudoRandom(i * 11.9 + 50) * 5 + 4).toFixed(4),
      delay: (pseudoRandom(i * 12.1 + 60) * 3).toFixed(4),
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden no-print">
      {/* 1. Base Background Color Layer */}
      <div
        className={`absolute inset-0 transition-colors duration-700 ${
          isDark
            ? 'bg-[#0B0B0C]'
            : 'bg-[#FCFCFB]'
        }`}
      />

      {/* 2. Minimal Tech Grid Pattern Overlay */}
      <div
        className={`absolute inset-0 ${isDark ? 'opacity-[0.025]' : 'opacity-[0.03]'}`}
        style={{
          backgroundImage: `radial-gradient(${isDark ? '#C7A15A' : '#B87333'} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* 3. Luxury Ambient Studio Lighting Orbs (Warm Bronze & Champagne Reflections) */}
      {isDark ? (
        <>
          {/* Top-Left Soft Bronze Glow */}
          <div className="absolute -top-[15%] -left-[10%] w-[800px] h-[800px] rounded-full blur-[170px] bg-[#B87333]/[0.04] pointer-events-none" />
          {/* Bottom-Right Champagne Studio Reflection */}
          <div className="absolute -bottom-[15%] -right-[10%] w-[750px] h-[750px] rounded-full blur-[170px] bg-[#C7A15A]/[0.045] pointer-events-none" />
          {/* Center Warm Metallic Glow */}
          <div className="absolute top-[35%] left-[40%] w-[600px] h-[600px] rounded-full blur-[150px] bg-[#C7A15A]/[0.025] pointer-events-none" />
        </>
      ) : (
        <>
          <div className="absolute -top-[12%] -left-[8%] w-[700px] h-[700px] rounded-full blur-[140px] bg-[#C7A15A]/[0.08] pointer-events-none" />
          <div className="absolute -bottom-[12%] -right-[8%] w-[650px] h-[650px] rounded-full blur-[140px] bg-[#B87333]/[0.06] pointer-events-none" />
        </>
      )}

      {/* 4. Animated Metallic Spec Particles */}
      {mounted && (
        <>
          <div className="absolute inset-0">
            {particles.map((p) => (
              <div
                key={p.id}
                className={`absolute rounded-full animate-float-particle ${
                  isDark
                    ? p.id % 2 === 0
                      ? 'bg-[#C7A15A]'
                      : 'bg-[#B87333]'
                    : 'bg-[#B87333]'
                }`}
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  opacity: isDark ? p.opacity : p.opacity * 0.7,
                  animationDuration: `${p.duration}s`,
                  animationDelay: `${p.delay}s`,
                }}
              />
            ))}
          </div>

          {/* Minimal Geometric Connection Grid */}
          <svg className="absolute inset-0 w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
            {connections.map((c) => (
              <line
                key={c.id}
                x1={`${c.x1}%`}
                y1={`${c.y1}%`}
                x2={`${c.x2}%`}
                y2={`${c.y2}%`}
                stroke={isDark ? 'rgba(212, 175, 55, 0.12)' : 'rgba(2, 132, 199, 0.25)'}
                strokeWidth="0.8"
                strokeDasharray="4 8"
                className="animate-pulse"
                style={{
                  animationDuration: `${c.duration}s`,
                  animationDelay: `${c.delay}s`,
                }}
              />
            ))}
          </svg>
        </>
      )}
    </div>
  );
}
