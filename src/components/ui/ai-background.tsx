'use client';

import { useMemo, useState, useEffect } from 'react';

interface AiBackgroundProps {
  isDark: boolean;
}

// Simple deterministic pseudo-random generator to avoid SSR/hydration mismatches
function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export function AiBackground({ isDark }: AiBackgroundProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate floating particles deterministically with fixed decimal precision strings
  const particles = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: (pseudoRandom(i * 1.1 + 1) * 100).toFixed(4),
      y: (pseudoRandom(i * 2.3 + 2) * 100).toFixed(4),
      size: (pseudoRandom(i * 3.7 + 3) * 3 + 1.5).toFixed(4),
      duration: (pseudoRandom(i * 4.9 + 4) * 8 + 6).toFixed(4),
      delay: (pseudoRandom(i * 5.2 + 5) * 5).toFixed(4),
      opacity: Number((pseudoRandom(i * 6.4 + 6) * 0.45 + 0.3).toFixed(4)),
    }));
  }, []);

  // Generate neural connection lines deterministically with fixed decimal precision strings
  const connections = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x1: (pseudoRandom(i * 7.1 + 10) * 100).toFixed(4),
      y1: (pseudoRandom(i * 8.3 + 20) * 100).toFixed(4),
      x2: (pseudoRandom(i * 9.5 + 30) * 100).toFixed(4),
      y2: (pseudoRandom(i * 10.7 + 40) * 100).toFixed(4),
      duration: (pseudoRandom(i * 11.9 + 50) * 4 + 4).toFixed(4),
      delay: (pseudoRandom(i * 12.1 + 60) * 3).toFixed(4),
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden no-print">
      {/* Dynamic Background Base Gradient */}
      <div
        className={`absolute inset-0 transition-colors duration-700 ${
          isDark
            ? 'bg-[#020617]'
            : 'bg-gradient-to-br from-slate-50 via-sky-50/60 to-cyan-50/70'
        }`}
      />

      {/* Subtle Grid Overlay Texture */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          isDark ? 'opacity-[0.03]' : 'opacity-[0.04]'
        }`}
        style={{
          backgroundImage: `radial-gradient(${isDark ? '#38bdf8' : '#0284c7'} 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Dynamic Morphing Gradient Blobs */}
      {/* Blob 1: Cyan / Sky Blue Glow Top-Left */}
      <div
        className={`absolute top-[-12%] left-[-8%] w-[650px] h-[650px] rounded-full blur-[140px] animate-blob pointer-events-none transition-all duration-700 ${
          isDark ? 'bg-cyan-500/20' : 'bg-cyan-400/30'
        }`}
      />

      {/* Blob 2: Purple / Indigo Glow Bottom-Right */}
      <div
        className={`absolute bottom-[-12%] right-[-8%] w-[600px] h-[600px] rounded-full blur-[140px] animate-blob animation-delay-2000 pointer-events-none transition-all duration-700 ${
          isDark ? 'bg-purple-600/20' : 'bg-indigo-300/35'
        }`}
      />

      {/* Blob 3: Blue / Teal Glow Middle-Right */}
      <div
        className={`absolute top-[35%] right-[20%] w-[500px] h-[500px] rounded-full blur-[120px] animate-blob animation-delay-4000 pointer-events-none transition-all duration-700 ${
          isDark ? 'bg-blue-600/15' : 'bg-sky-300/30'
        }`}
      />

      {/* Blob 4: Emerald Glow Bottom-Left */}
      <div
        className={`absolute bottom-[10%] left-[10%] w-[450px] h-[450px] rounded-full blur-[130px] animate-blob animation-delay-2000 pointer-events-none transition-all duration-700 ${
          isDark ? 'bg-teal-500/15' : 'bg-teal-200/40'
        }`}
      />

      {/* Floating Animated Particles & Neural Constellations */}
      {mounted && (
        <>
          {/* Floating Particles Container */}
          <div className="absolute inset-0">
            {particles.map((p) => (
              <div
                key={p.id}
                className={`absolute rounded-full animate-float-particle shadow-sm ${
                  isDark ? 'bg-cyan-400 shadow-cyan-400/50' : 'bg-cyan-600 shadow-cyan-600/40'
                }`}
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
            ))}
          </div>

          {/* SVG Neural Constellation Lines */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {connections.map((c) => (
              <line
                key={c.id}
                x1={`${c.x1}%`}
                y1={`${c.y1}%`}
                x2={`${c.x2}%`}
                y2={`${c.y2}%`}
                stroke={isDark ? 'rgba(56, 189, 248, 0.28)' : 'rgba(2, 132, 199, 0.22)'}
                strokeWidth="1"
                strokeDasharray="4 6"
                className="animate-pulse-glow"
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
