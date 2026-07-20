'use client';

import { useMemo } from 'react';

interface AiBackgroundProps {
  isDark: boolean;
}

export function AiBackground({ isDark }: AiBackgroundProps) {
  // Generate floating particles
  const particles = useMemo(() => {
    return Array.from({ length: 45 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 1,
      duration: Math.random() * 8 + 5,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.15,
    }));
  }, []);

  // Generate subtle neural connection lines
  const connections = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x1: Math.random() * 100,
      y1: Math.random() * 100,
      x2: Math.random() * 100,
      y2: Math.random() * 100,
      duration: Math.random() * 5 + 3,
      delay: Math.random() * 3,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Background Gradient Base */}
      <div
        className={`absolute inset-0 transition-colors duration-500 ${
          isDark
            ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'
            : 'bg-gradient-to-br from-sky-50/80 via-white to-cyan-50/70'
        }`}
      />

      {/* Ambient Radial Mesh Blobs */}
      <div
        className={`absolute top-[-15%] left-[-10%] w-[650px] h-[650px] rounded-full blur-[130px] animate-blob ${
          isDark ? 'bg-cyan-600/15' : 'bg-cyan-400/20'
        }`}
      />
      <div
        className={`absolute bottom-[-15%] right-[-10%] w-[550px] h-[550px] rounded-full blur-[130px] animate-blob animation-delay-2000 ${
          isDark ? 'bg-purple-600/15' : 'bg-purple-400/15'
        }`}
      />
      <div
        className={`absolute top-[40%] left-[55%] w-[450px] h-[450px] rounded-full blur-[110px] animate-blob animation-delay-4000 ${
          isDark ? 'bg-blue-600/10' : 'bg-sky-400/15'
        }`}
      />

      {/* Floating Particles */}
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

      {/* Neural Network Line Grid */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {connections.map((c) => (
          <line
            key={c.id}
            x1={`${c.x1}%`}
            y1={`${c.y1}%`}
            x2={`${c.x2}%`}
            y2={`${c.y2}%`}
            stroke={isDark ? 'rgba(6, 182, 212, 0.12)' : 'rgba(14, 165, 233, 0.15)'}
            strokeWidth="0.8"
            strokeDasharray="4 4"
            className="animate-pulse"
            style={{
              animationDuration: `${c.duration}s`,
              animationDelay: `${c.delay}s`,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
