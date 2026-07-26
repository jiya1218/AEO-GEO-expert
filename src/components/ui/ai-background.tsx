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
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: (pseudoRandom(i * 1.1 + 1) * 100).toFixed(4),
      y: (pseudoRandom(i * 2.3 + 2) * 100).toFixed(4),
      size: (pseudoRandom(i * 3.7 + 3) * 3 + 1).toFixed(4),
      duration: (pseudoRandom(i * 4.9 + 4) * 7 + 4).toFixed(4),
      delay: (pseudoRandom(i * 5.2 + 5) * 4).toFixed(4),
      opacity: Number((pseudoRandom(i * 6.4 + 6) * 0.5 + 0.25).toFixed(4)),
    }));
  }, []);

  // Generate neural connection lines deterministically with fixed decimal precision strings
  const connections = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
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
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Background Base */}
      <div
        className={`absolute inset-0 transition-colors duration-500 ${
          isDark
            ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'
            : 'bg-gradient-to-br from-sky-50 via-white to-cyan-50'
        }`}
      />

      {/* Dynamic Animated Mesh Blobs */}
      <div
        className={`absolute top-[-10%] left-[-5%] w-[650px] h-[650px] rounded-full blur-[130px] animate-blob pointer-events-none ${
          isDark ? 'bg-cyan-600/20' : 'bg-cyan-400/25'
        }`}
      />
      <div
        className={`absolute bottom-[-10%] right-[-5%] w-[550px] h-[550px] rounded-full blur-[130px] animate-blob animation-delay-2000 pointer-events-none ${
          isDark ? 'bg-purple-600/20' : 'bg-purple-400/20'
        }`}
      />
      <div
        className={`absolute top-[40%] left-[55%] w-[450px] h-[450px] rounded-full blur-[110px] animate-blob animation-delay-4000 pointer-events-none ${
          isDark ? 'bg-blue-600/15' : 'bg-sky-400/20'
        }`}
      />

      {/* Floating Animated Particles (Only Rendered After Mount to Prevent Hydration Mismatches) */}
      {mounted && (
        <>
          <div className="absolute inset-0">
            {particles.map((p) => (
              <div
                key={p.id}
                className={`absolute rounded-full animate-float-particle ${
                  isDark ? 'bg-cyan-400' : 'bg-cyan-600'
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

          {/* Neural Network SVG Grid */}
          <svg className="absolute inset-0 w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
            {connections.map((c) => (
              <line
                key={c.id}
                x1={`${c.x1}%`}
                y1={`${c.y1}%`}
                x2={`${c.x2}%`}
                y2={`${c.y2}%`}
                stroke={isDark ? 'rgba(6, 182, 212, 0.25)' : 'rgba(14, 165, 233, 0.28)'}
                strokeWidth="0.9"
                strokeDasharray="4 4"
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
