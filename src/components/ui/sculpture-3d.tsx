'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

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

    // Colors
    const bronze = isDark ? [184, 115, 51] : [160, 95, 35];
    const champagne = isDark ? [199, 161, 90] : [175, 140, 70];
    const textColor = isDark ? [246, 246, 244] : [24, 24, 24];
    const dimColor = isDark ? [183, 183, 181] : [92, 92, 92];

    const rgba = (c: number[], a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.008;

      const cx = width / 2;
      const cy = height / 2;
      const baseRadius = Math.min(width, height) * 0.40;

      // === OUTER RADAR RINGS ===
      for (let r = 1; r <= 3; r++) {
        const ringR = baseRadius * (r * 0.33 + 0.15);
        ctx.beginPath();
        ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
        ctx.strokeStyle = rgba(champagne, isDark ? 0.08 + r * 0.03 : 0.06 + r * 0.03);
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // === RADAR SWEEP ===
      const sweepAngle = time * 1.2;
      const sweepGrad = ctx.createConicGradient(sweepAngle, cx, cy);
      sweepGrad.addColorStop(0, rgba(champagne, 0.15));
      sweepGrad.addColorStop(0.08, rgba(champagne, 0.04));
      sweepGrad.addColorStop(0.12, 'transparent');
      sweepGrad.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius * 1.1, 0, Math.PI * 2);
      ctx.fillStyle = sweepGrad;
      ctx.fill();

      // === CROSS-HAIR AXIS LINES ===
      ctx.save();
      ctx.globalAlpha = isDark ? 0.07 : 0.09;
      ctx.strokeStyle = rgba(textColor, 1);
      ctx.lineWidth = 0.5;
      // Horizontal
      ctx.beginPath();
      ctx.moveTo(cx - baseRadius, cy);
      ctx.lineTo(cx + baseRadius, cy);
      ctx.stroke();
      // Vertical
      ctx.beginPath();
      ctx.moveTo(cx, cy - baseRadius);
      ctx.lineTo(cx, cy + baseRadius);
      ctx.stroke();
      ctx.restore();

      // === AI PLATFORM NODES (Hexagonal Layout) ===
      const nodeRadius = baseRadius * 0.88;
      const platforms = AI_PLATFORMS.map((p, i) => {
        const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
        const floatOffset = Math.sin(time * 1.5 + i * 1.2) * 4;
        return {
          ...p,
          x: cx + Math.cos(angle) * (nodeRadius + floatOffset),
          y: cy + Math.sin(angle) * (nodeRadius + floatOffset),
          angle,
          visibility: 0.55 + Math.sin(time * 0.8 + i * 1.1) * 0.35,
        };
      });

      // === CONNECTION LINES (node-to-center pulsing data lines) ===
      platforms.forEach((p, i) => {
        const pulse = Math.sin(time * 2 + i * 0.9);
        const opacity = 0.1 + Math.max(0, pulse) * 0.2;

        // Main connection line
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = rgba(champagne, opacity);
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Traveling data pulse dot
        if (pulse > 0) {
          const t = (Math.sin(time * 3 + i * 1.5) + 1) / 2;
          const dotX = cx + (p.x - cx) * t;
          const dotY = cy + (p.y - cy) * t;
          ctx.beginPath();
          ctx.arc(dotX, dotY, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = rgba(champagne, 0.6 + pulse * 0.3);
          ctx.fill();
        }
      });

      // === INTER-NODE CONNECTIONS (neighbor-to-neighbor) ===
      for (let i = 0; i < platforms.length; i++) {
        const next = platforms[(i + 1) % platforms.length];
        const p = platforms[i];
        const shimmer = Math.sin(time * 1.2 + i * 0.8);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(next.x, next.y);
        ctx.strokeStyle = rgba(bronze, 0.06 + Math.max(0, shimmer) * 0.1);
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // === PLATFORM NODE BADGES ===
      platforms.forEach((p) => {
        // Outer glow ring
        const glowR = 22;
        const glow = ctx.createRadialGradient(p.x, p.y, glowR * 0.5, p.x, p.y, glowR * 1.5);
        glow.addColorStop(0, rgba(champagne, p.visibility * 0.15));
        glow.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowR * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Node circle background
        ctx.beginPath();
        ctx.arc(p.x, p.y, 20, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? 'rgba(18,19,21,0.9)' : 'rgba(255,255,255,0.9)';
        ctx.fill();
        ctx.strokeStyle = rgba(champagne, 0.3 + p.visibility * 0.4);
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Platform short name
        ctx.font = `bold 9px "SF Mono", "Fira Code", monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = rgba(champagne, 0.7 + p.visibility * 0.3);
        ctx.fillText(p.short, p.x, p.y);

        // Full name below node
        ctx.font = `600 8px -apple-system, system-ui, sans-serif`;
        ctx.fillStyle = rgba(dimColor, 0.5 + p.visibility * 0.3);
        ctx.fillText(p.name, p.x, p.y + 30);

        // Live signal dot
        const dotPulse = Math.sin(time * 3 + p.angle * 2);
        if (dotPulse > 0.3) {
          ctx.beginPath();
          ctx.arc(p.x + 14, p.y - 14, 3, 0, Math.PI * 2);
          ctx.fillStyle = rgba([80, 200, 120], 0.6 + dotPulse * 0.3);
          ctx.fill();
        }
      });

      // === CENTER HUB ===
      // Outer glow
      const hubGlow = ctx.createRadialGradient(cx, cy, 10, cx, cy, 60);
      hubGlow.addColorStop(0, rgba(champagne, 0.12));
      hubGlow.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(cx, cy, 60, 0, Math.PI * 2);
      ctx.fillStyle = hubGlow;
      ctx.fill();

      // Hub circle
      ctx.beginPath();
      ctx.arc(cx, cy, 36, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? 'rgba(18,19,21,0.95)' : 'rgba(255,255,255,0.95)';
      ctx.fill();

      // Hub border with gradient
      ctx.beginPath();
      ctx.arc(cx, cy, 36, 0, Math.PI * 2);
      ctx.strokeStyle = rgba(champagne, 0.5);
      ctx.lineWidth = 2;
      ctx.stroke();

      // Visibility score number (animated)
      const score = Math.round(78 + Math.sin(time * 0.5) * 8);
      ctx.font = `800 18px -apple-system, system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = rgba(champagne, 0.95);
      ctx.fillText(`${score}`, cx, cy - 3);

      // "AVI" label below score
      ctx.font = `bold 7px "SF Mono", "Fira Code", monospace`;
      ctx.fillStyle = rgba(dimColor, 0.6);
      ctx.fillText('AVI SCORE', cx, cy + 14);

      // === BOTTOM STATUS BAR ===
      const barY = cy + baseRadius * 1.15;
      const barWidth = baseRadius * 1.3;

      // Status bar background
      ctx.beginPath();
      const barGrad = ctx.createLinearGradient(cx - barWidth / 2, barY, cx + barWidth / 2, barY);
      barGrad.addColorStop(0, 'transparent');
      barGrad.addColorStop(0.2, rgba(champagne, isDark ? 0.06 : 0.04));
      barGrad.addColorStop(0.8, rgba(champagne, isDark ? 0.06 : 0.04));
      barGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = barGrad;
      ctx.roundRect(cx - barWidth / 2, barY - 12, barWidth, 24, 12);
      ctx.fill();

      // Status text
      ctx.font = `600 8px "SF Mono", "Fira Code", monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const activePlatforms = platforms.filter((_, i) => Math.sin(time * 3 + i * 1.5) > 0.3).length;
      ctx.fillStyle = rgba([80, 200, 120], 0.7);
      ctx.fillText(`● ${activePlatforms}/6 ACTIVE`, cx - barWidth * 0.22, barY);

      ctx.fillStyle = rgba(dimColor, 0.5);
      ctx.fillText('|', cx, barY);

      ctx.fillStyle = rgba(champagne, 0.6);
      ctx.fillText('LIVE MONITORING', cx + barWidth * 0.22, barY);

      animationFrameId = requestAnimationFrame(drawFrame);
    };

    drawFrame();

    return () => {
      window.removeEventListener('resize', setSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <div className={`relative w-full h-[500px] sm:h-[560px] lg:h-[620px] flex items-center justify-center ${className}`}>
      {/* Background Warm Ambient Glow */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`absolute w-96 h-96 rounded-full blur-[120px] pointer-events-none ${
          isDark
            ? 'bg-gradient-to-tr from-[#B87333]/15 via-[#C7A15A]/20 to-transparent'
            : 'bg-gradient-to-tr from-[#B87333]/10 via-[#C7A15A]/15 to-transparent'
        }`}
      />

      {/* AI Visibility Intelligence Radar Canvas */}
      <canvas ref={canvasRef} className="relative z-10 w-full h-full" />
    </div>
  );
}
