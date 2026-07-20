'use client';

import { useMemo } from 'react';

interface AnimatedBackgroundProps {
  isDark: boolean;
}

export function AnimatedBackground({ isDark }: AnimatedBackgroundProps) {
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1.5,
      duration: Math.random() * 14 + 8,
      delay: Math.random() * 10,
    }));
  }, []);

  return (
    <>
      <div className="animated-bg-layer">
        {/* Morphing gradient blobs */}
        <div className={`bg-blob bg-blob-1 ${isDark ? 'bg-cyan-500/10' : 'bg-cyan-400/15'}`} />
        <div className={`bg-blob bg-blob-2 ${isDark ? 'bg-purple-600/8' : 'bg-purple-400/12'}`} />
        <div className={`bg-blob bg-blob-3 ${isDark ? 'bg-blue-600/6' : 'bg-sky-400/10'}`} />

        {/* Floating particles */}
        {particles.map((p) => (
          <div
            key={p.id}
            className={`bg-particle ${isDark ? 'bg-cyan-400' : 'bg-cyan-600'}`}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}

        {/* Subtle grid */}
        <div
          className="bg-grid"
          style={{
            backgroundImage: `linear-gradient(${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'} 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <style jsx>{`
        .animated-bg-layer {
          position: fixed;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }
        .bg-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(130px);
        }
        .bg-blob-1 {
          width: 650px; height: 650px;
          top: -5%; left: 15%;
          animation: bg-morph 18s ease-in-out infinite;
        }
        .bg-blob-2 {
          width: 500px; height: 500px;
          bottom: -10%; right: 5%;
          animation: bg-morph 22s ease-in-out infinite 4s;
        }
        .bg-blob-3 {
          width: 400px; height: 400px;
          top: 45%; left: 55%;
          animation: bg-morph 25s ease-in-out infinite 8s;
        }
        @keyframes bg-morph {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          25% { transform: translate(35px, -50px) scale(1.12) rotate(4deg); }
          50% { transform: translate(-25px, 25px) scale(0.92) rotate(-2deg); }
          75% { transform: translate(15px, 40px) scale(1.06) rotate(3deg); }
        }
        .bg-particle {
          position: absolute;
          border-radius: 50%;
          opacity: 0;
          animation: bg-float linear infinite;
        }
        @keyframes bg-float {
          0% { opacity: 0; transform: translateY(0) scale(0); }
          12% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 0.3; transform: translateY(-50px) translateX(20px); }
          88% { opacity: 0.1; }
          100% { opacity: 0; transform: translateY(-100px) translateX(-10px) scale(0.2); }
        }
        .bg-grid {
          position: absolute;
          inset: 0;
        }
      `}</style>
    </>
  );
}
