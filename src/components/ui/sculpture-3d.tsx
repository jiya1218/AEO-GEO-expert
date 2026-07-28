'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Sculpture3DProps {
  isDark?: boolean;
  className?: string;
}

const AI_PLATFORMS = [
  { name: 'ChatGPT', short: 'GPT' },
  { name: 'Gemini', short: 'GEM' },
  { name: 'Claude', short: 'CLD' },
  { name: 'Perplexity', short: 'PPX' },
  { name: 'Grok', short: 'GRK' },
  { name: 'DeepSeek', short: 'DSK' },
];

export function Sculpture3D({ isDark = true, className = '' }: Sculpture3DProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activePlatforms, setActivePlatforms] = useState(4);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger entrance animation after mount
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let dpr = window.devicePixelRatio || 1;
    let width: number;
    let height: number;

    const setSize = () => {
      if (!canvas || !canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();
    window.addEventListener('resize', setSize);

    let time = 0;
    // Entrance animation progress (0 → 1 over ~2.5 seconds)
    let entranceProgress = 0;

    // Colors
    const bronze = isDark ? [184, 115, 51] : [160, 95, 35];
    const champagne = isDark ? [199, 161, 90] : [175, 140, 70];
    const textColor = isDark ? [246, 246, 244] : [24, 24, 24];
    const dimColor = isDark ? [183, 183, 181] : [92, 92, 92];

    const rgba = (c: number[], a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

    // Smooth easing function
    const easeOutExpo = (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    const easeOutBack = (t: number) => {
      const c1 = 1.70158;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.008;
      entranceProgress = Math.min(1, entranceProgress + 0.006);

      const cx = width / 2;
      const cy = height / 2;
      const baseRadius = Math.min(width, height) * 0.38;

      // === ENTRANCE: Radar rings scale in ===
      const ringEntrance = easeOutExpo(Math.min(1, entranceProgress * 1.8));

      // === OUTER RADAR RINGS ===
      for (let r = 1; r <= 3; r++) {
        const ringR = baseRadius * (r * 0.33 + 0.15) * ringEntrance;
        ctx.beginPath();
        ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
        ctx.strokeStyle = rgba(champagne, (isDark ? 0.08 + r * 0.03 : 0.06 + r * 0.03) * ringEntrance);
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // === RADAR SWEEP (appears after rings) ===
      const sweepEntrance = easeOutExpo(Math.max(0, (entranceProgress - 0.15) * 2));
      if (sweepEntrance > 0) {
        const sweepAngle = time * 1.2;
        const sweepGrad = ctx.createConicGradient(sweepAngle, cx, cy);
        sweepGrad.addColorStop(0, rgba(champagne, 0.15 * sweepEntrance));
        sweepGrad.addColorStop(0.08, rgba(champagne, 0.04 * sweepEntrance));
        sweepGrad.addColorStop(0.12, 'transparent');
        sweepGrad.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(cx, cy, baseRadius * 1.1 * ringEntrance, 0, Math.PI * 2);
        ctx.fillStyle = sweepGrad;
        ctx.fill();
      }

      // === CROSS-HAIR AXIS LINES ===
      const axisEntrance = easeOutExpo(Math.max(0, (entranceProgress - 0.1) * 2.5));
      ctx.save();
      ctx.globalAlpha = (isDark ? 0.07 : 0.09) * axisEntrance;
      ctx.strokeStyle = rgba(textColor, 1);
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(cx - baseRadius * axisEntrance, cy);
      ctx.lineTo(cx + baseRadius * axisEntrance, cy);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx, cy - baseRadius * axisEntrance);
      ctx.lineTo(cx, cy + baseRadius * axisEntrance);
      ctx.stroke();
      ctx.restore();

      // === AI PLATFORM NODES (staggered entrance) ===
      const nodeRadius = baseRadius * 0.88;
      const platforms = AI_PLATFORMS.map((p, i) => {
        const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
        const floatOffset = Math.sin(time * 1.5 + i * 1.2) * 4;
        // Each node appears with staggered delay
        const nodeDelay = 0.25 + i * 0.08;
        const nodeEntrance = easeOutBack(Math.max(0, Math.min(1, (entranceProgress - nodeDelay) * 3)));
        return {
          ...p,
          x: cx + Math.cos(angle) * (nodeRadius + floatOffset) * nodeEntrance,
          y: cy + Math.sin(angle) * (nodeRadius + floatOffset) * nodeEntrance,
          angle,
          visibility: 0.55 + Math.sin(time * 0.8 + i * 1.1) * 0.35,
          entrance: nodeEntrance,
        };
      });

      // === CONNECTION LINES (fade in after nodes) ===
      const lineEntrance = easeOutExpo(Math.max(0, (entranceProgress - 0.4) * 2.5));
      platforms.forEach((p, i) => {
        if (p.entrance < 0.1) return;
        const pulse = Math.sin(time * 2 + i * 0.9);
        const opacity = (0.1 + Math.max(0, pulse) * 0.2) * lineEntrance;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = rgba(champagne, opacity);
        ctx.lineWidth = 1.2;
        ctx.stroke();

        if (pulse > 0 && lineEntrance > 0.5) {
          const t = (Math.sin(time * 3 + i * 1.5) + 1) / 2;
          const dotX = cx + (p.x - cx) * t;
          const dotY = cy + (p.y - cy) * t;
          ctx.beginPath();
          ctx.arc(dotX, dotY, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = rgba(champagne, (0.6 + pulse * 0.3) * lineEntrance);
          ctx.fill();
        }
      });

      // === INTER-NODE CONNECTIONS ===
      if (lineEntrance > 0.3) {
        for (let i = 0; i < platforms.length; i++) {
          const next = platforms[(i + 1) % platforms.length];
          const p = platforms[i];
          if (p.entrance < 0.5 || next.entrance < 0.5) continue;
          const shimmer = Math.sin(time * 1.2 + i * 0.8);
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(next.x, next.y);
          ctx.strokeStyle = rgba(bronze, (0.06 + Math.max(0, shimmer) * 0.1) * lineEntrance);
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // === PLATFORM NODE BADGES ===
      platforms.forEach((p) => {
        if (p.entrance < 0.05) return;
        const nodeAlpha = p.entrance;

        // Outer glow ring
        const glowR = 30;
        const glow = ctx.createRadialGradient(p.x, p.y, glowR * 0.5, p.x, p.y, glowR * 1.5);
        glow.addColorStop(0, rgba(champagne, p.visibility * 0.15 * nodeAlpha));
        glow.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowR * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Node circle background
        ctx.beginPath();
        ctx.arc(p.x, p.y, 28 * nodeAlpha, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? `rgba(18,19,21,${0.9 * nodeAlpha})` : `rgba(255,255,255,${0.9 * nodeAlpha})`;
        ctx.fill();
        ctx.strokeStyle = rgba(champagne, (0.3 + p.visibility * 0.4) * nodeAlpha);
        ctx.lineWidth = 1.8;
        ctx.stroke();

        // Platform short name
        ctx.font = `bold 13px "SF Mono", "Fira Code", monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = rgba(champagne, (0.7 + p.visibility * 0.3) * nodeAlpha);
        ctx.fillText(p.short, p.x, p.y);

        // Full name below node
        ctx.font = `600 10px -apple-system, system-ui, sans-serif`;
        ctx.fillStyle = rgba(dimColor, (0.5 + p.visibility * 0.3) * nodeAlpha);
        ctx.fillText(p.name, p.x, p.y + 38);

        // Live signal dot
        const dotPulse = Math.sin(time * 3 + p.angle * 2);
        if (dotPulse > 0.3 && nodeAlpha > 0.8) {
          ctx.beginPath();
          ctx.arc(p.x + 20, p.y - 20, 4, 0, Math.PI * 2);
          ctx.fillStyle = rgba([80, 200, 120], 0.6 + dotPulse * 0.3);
          ctx.fill();
        }
      });

      // === CENTER HUB (scales up first) ===
      const hubEntrance = easeOutBack(Math.min(1, entranceProgress * 2.2));

      // Outer glow
      const hubGlow = ctx.createRadialGradient(cx, cy, 12, cx, cy, 75 * hubEntrance);
      hubGlow.addColorStop(0, rgba(champagne, 0.12 * hubEntrance));
      hubGlow.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(cx, cy, 75 * hubEntrance, 0, Math.PI * 2);
      ctx.fillStyle = hubGlow;
      ctx.fill();

      // Hub circle
      const hubR = 46 * hubEntrance;
      ctx.beginPath();
      ctx.arc(cx, cy, hubR, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? 'rgba(18,19,21,0.95)' : 'rgba(255,255,255,0.95)';
      ctx.fill();

      // Hub border
      ctx.beginPath();
      ctx.arc(cx, cy, hubR, 0, Math.PI * 2);
      ctx.strokeStyle = rgba(champagne, 0.5 * hubEntrance);
      ctx.lineWidth = 2;
      ctx.stroke();

      // Visibility score number
      if (hubEntrance > 0.5) {
        const scoreAlpha = easeOutExpo((hubEntrance - 0.5) * 2);
        const score = Math.round(78 + Math.sin(time * 0.5) * 8);
        ctx.font = `800 26px -apple-system, system-ui, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = rgba(champagne, 0.95 * scoreAlpha);
        ctx.fillText(`${score}`, cx, cy - 4);

        // "AVI SCORE" label
        ctx.font = `bold 9px "SF Mono", "Fira Code", monospace`;
        ctx.fillStyle = rgba(dimColor, 0.6 * scoreAlpha);
        ctx.fillText('AVI SCORE', cx, cy + 18);
      }

      // Update active platforms count for DOM status bar
      const activeCount = platforms.filter((_, i) => Math.sin(time * 3 + i * 1.5) > 0.3).length;
      setActivePlatforms(activeCount);

      animationFrameId = requestAnimationFrame(drawFrame);
    };

    drawFrame();

    return () => {
      window.removeEventListener('resize', setSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <div className={`relative w-full flex flex-col items-center ${className}`}>
      {/* Canvas Container */}
      <div className="relative w-full h-[520px] sm:h-[580px] lg:h-[640px] flex items-center justify-center">
        {/* Background Warm Ambient Glow */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.25, 0.4, 0.25] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.3,
          }}
          className={`absolute w-[28rem] h-[28rem] rounded-full blur-[120px] pointer-events-none ${
            isDark
              ? 'bg-gradient-to-tr from-[#B87333]/15 via-[#C7A15A]/20 to-transparent'
              : 'bg-gradient-to-tr from-[#B87333]/10 via-[#C7A15A]/15 to-transparent'
          }`}
        />

        {/* AI Visibility Intelligence Radar Canvas */}
        <canvas ref={canvasRef} className="relative z-10 w-full h-full" />
      </div>

      {/* Status Bar — Outside Canvas, Below Figure */}
      <AnimatePresence>
        {isLoaded && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-4 mt-3"
          >
            <div className={`flex items-center gap-4 px-6 py-2.5 rounded-full border backdrop-blur-sm ${
              isDark
                ? 'bg-[#121315]/80 border-white/10'
                : 'bg-white/80 border-[#E5E3DF]'
            }`}>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className={`text-[11px] font-mono font-bold tracking-wide ${
                  isDark ? 'text-emerald-400/90' : 'text-emerald-600'
                }`}>
                  {activePlatforms}/6 ACTIVE
                </span>
              </div>

              <div className={`w-px h-3.5 ${isDark ? 'bg-white/10' : 'bg-[#E5E3DF]'}`} />

              <span className={`text-[11px] font-mono font-bold tracking-wide ${
                isDark ? 'text-[#C7A15A]/80' : 'text-[#B87333]'
              }`}>
                LIVE MONITORING
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
