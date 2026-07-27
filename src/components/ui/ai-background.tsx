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

  // Generate 60 floating particles with deterministic values
  const particles = useMemo(() => {
    return Array.from({ length: 65 }, (_, i) => ({
      id: i,
      x: (pseudoRandom(i * 1.1 + 1) * 100).toFixed(4),
      y: (pseudoRandom(i * 2.3 + 2) * 100).toFixed(4),
      size: (pseudoRandom(i * 3.7 + 3) * 3.5 + 1.5).toFixed(4),
      duration: (pseudoRandom(i * 4.9 + 4) * 6 + 4).toFixed(4),
      delay: (pseudoRandom(i * 5.2 + 5) * 5).toFixed(4),
      opacity: Number((pseudoRandom(i * 6.4 + 6) * 0.45 + 0.25).toFixed(4)),
      colorType: i % 3, // 0 = cyan, 1 = sky/blue, 2 = indigo/purple
    }));
  }, []);

  // Generate neural network connection lines
  const connections = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x1: (pseudoRandom(i * 7.1 + 10) * 100).toFixed(4),
      y1: (pseudoRandom(i * 8.3 + 20) * 100).toFixed(4),
      x2: (pseudoRandom(i * 9.5 + 30) * 100).toFixed(4),
      y2: (pseudoRandom(i * 10.7 + 40) * 100).toFixed(4),
      duration: (pseudoRandom(i * 11.9 + 50) * 4 + 3).toFixed(4),
      delay: (pseudoRandom(i * 12.1 + 60) * 3).toFixed(4),
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden no-print">
      {/* 1. Base Gradient Layer */}
      <div
        className={`absolute inset-0 transition-colors duration-700 ${
          isDark
            ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'
            : 'bg-gradient-to-br from-[#f8fafc] via-[#f0f9ff] to-[#e0f2fe]'
        }`}
      />

      {/* 2. Subdued Tech Grid Pattern Overlay */}
      <div
        className={`absolute inset-0 ${isDark ? 'opacity-[0.035]' : 'opacity-[0.06]'}`}
        style={{
          backgroundImage: `radial-gradient(${isDark ? '#38bdf8' : '#0284c7'} 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* 3. Sweeping Aurora Glowing Light Beam */}
      <div
        className={`absolute -top-32 -left-32 w-[900px] h-[450px] rounded-full blur-[140px] animate-aurora pointer-events-none ${
          isDark ? 'bg-gradient-to-r from-cyan-600/20 via-sky-500/15 to-indigo-600/20' : 'bg-gradient-to-r from-cyan-400/30 via-sky-300/35 to-indigo-300/30'
        }`}
      />

      {/* 4. Glowing Floating Mesh Orbs */}
      {/* Top-Left Orb */}
      <div
        className={`absolute -top-[12%] -left-[8%] w-[700px] h-[700px] rounded-full blur-[140px] animate-blob pointer-events-none ${
          isDark ? 'bg-cyan-500/20' : 'bg-cyan-400/35'
        }`}
      />
      {/* Bottom-Right Orb */}
      <div
        className={`absolute -bottom-[12%] -right-[8%] w-[650px] h-[650px] rounded-full blur-[140px] animate-blob animation-delay-2000 pointer-events-none ${
          isDark ? 'bg-indigo-600/20' : 'bg-purple-400/30'
        }`}
      />
      {/* Top-Right Orb */}
      <div
        className={`absolute top-[10%] right-[5%] w-[550px] h-[550px] rounded-full blur-[130px] animate-blob animation-delay-4000 pointer-events-none ${
          isDark ? 'bg-sky-500/15' : 'bg-sky-300/35'
        }`}
      />
      {/* Center-Left Orb */}
      <div
        className={`absolute top-[45%] -left-[10%] w-[500px] h-[500px] rounded-full blur-[120px] animate-blob animation-delay-3000 pointer-events-none ${
          isDark ? 'bg-teal-500/15' : 'bg-teal-300/30'
        }`}
      />

      {/* 5. Animated Particles & Neural Constellations (Rendered after hydration mount) */}
      {mounted && (
        <>
          {/* Floating Particles Container */}
          <div className="absolute inset-0">
            {particles.map((p) => {
              // Color selection based on dark/light mode & particle type
              let particleBg = isDark ? 'bg-cyan-400' : 'bg-cyan-600';
              if (p.colorType === 1) {
                particleBg = isDark ? 'bg-sky-400' : 'bg-sky-500';
              } else if (p.colorType === 2) {
                particleBg = isDark ? 'bg-indigo-400' : 'bg-indigo-600';
              }

              return (
                <div
                  key={p.id}
                  className={`absolute rounded-full animate-float-particle shadow-sm ${particleBg}`}
                  style={{
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    opacity: p.opacity,
                    animationDuration: `${p.duration}s`,
                    animationDelay: `${p.delay}s`,
                  }}
                />
              );
            })}
          </div>

          {/* Neural Network SVG Constellation Grid */}
          <svg className="absolute inset-0 w-full h-full opacity-70" xmlns="http://www.w3.org/2000/svg">
            {connections.map((c) => (
              <line
                key={c.id}
                x1={`${c.x1}%`}
                y1={`${c.y1}%`}
                x2={`${c.x2}%`}
                y2={`${c.y2}%`}
                stroke={isDark ? 'rgba(56, 189, 248, 0.28)' : 'rgba(2, 132, 199, 0.32)'}
                strokeWidth="0.95"
                strokeDasharray="4 6"
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
