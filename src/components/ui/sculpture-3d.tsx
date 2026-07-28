'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Sculpture3DProps {
  isDark?: boolean;
  className?: string;
}

export function Sculpture3D({ isDark = true, className = '' }: Sculpture3DProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    let angleX = 0;
    let angleY = 0;
    let floatTime = 0;

    // Bronze & Champagne color palettes
    const bronzeColor = isDark ? 'rgba(184, 115, 51, ' : 'rgba(160, 95, 35, ';
    const champagneColor = isDark ? 'rgba(199, 161, 90, ' : 'rgba(175, 140, 70, ';
    const metallicGridColor = isDark ? 'rgba(246, 246, 244, ' : 'rgba(24, 24, 24, ';

    const drawSculpture = () => {
      ctx.clearRect(0, 0, width, height);

      // Centered slightly upward to align with header headline
      const centerX = width / 2;
      const centerY = height * 0.45 + Math.sin(floatTime) * 10; 
      floatTime += 0.015;
      angleX += 0.004;
      angleY += 0.007;

      const size = Math.min(width, height) * 0.42;

      // Render concentric precision-machined metallic rings
      const ringCount = 5;
      for (let r = 0; r < ringCount; r++) {
        const radius = size * (0.35 + r * 0.16);
        const ringAngleX = angleX * (1 + r * 0.15);
        const ringAngleY = angleY * (1 - r * 0.1);
        const isChampagne = r % 2 === 1;

        ctx.save();
        ctx.translate(centerX, centerY);

        // 3D Transform projection simulated with ellipse scaling
        const scaleX = Math.cos(ringAngleY);
        const scaleY = Math.sin(ringAngleX);
        const tilt = Math.sin(ringAngleY * 0.5) * 0.5;

        ctx.rotate(tilt);
        ctx.scale(1, Math.max(0.2, Math.abs(scaleY * scaleX)));

        // Metallic Ring Stroke
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        const baseColor = isChampagne ? champagneColor : bronzeColor;
        const opacity = isDark ? 0.35 + r * 0.1 : 0.45 + r * 0.1;
        ctx.strokeStyle = `${baseColor}${opacity})`;
        ctx.lineWidth = 2.5 - r * 0.3;
        ctx.stroke();

        // High-precision machined notch points around ring
        const notches = 12 + r * 6;
        for (let n = 0; n < notches; n++) {
          const nAngle = (n / notches) * Math.PI * 2 + ringAngleX;
          const nx = Math.cos(nAngle) * radius;
          const ny = Math.sin(nAngle) * radius;

          ctx.beginPath();
          ctx.arc(nx, ny, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `${isChampagne ? champagneColor : bronzeColor}${opacity + 0.3})`;
          ctx.fill();
        }

        ctx.restore();
      }

      // Render Floating Layered Glass Architecture Octagon
      const vertices: { x: number; y: number; z: number }[] = [];
      const steps = 8;
      const octRadius = size * 0.55;
      for (let i = 0; i < steps; i++) {
        const a = (i / steps) * Math.PI * 2;
        vertices.push({
          x: Math.cos(a) * octRadius,
          y: Math.sin(a) * octRadius,
          z: Math.sin(a * 2 + angleX) * 40,
        });
      }

      // Draw Glass Facet Edge Lines
      ctx.save();
      ctx.translate(centerX, centerY);

      ctx.beginPath();
      for (let i = 0; i < vertices.length; i++) {
        const v1 = vertices[i];
        const v2 = vertices[(i + 1) % vertices.length];

        const cosY = Math.cos(angleY * 0.8);
        const sinY = Math.sin(angleY * 0.8);
        const x1 = v1.x * cosY - v1.z * sinY;
        const y1 = v1.y;
        const x2 = v2.x * cosY - v2.z * sinY;
        const y2 = v2.y;

        if (i === 0) ctx.moveTo(x1, y1);
        else ctx.lineTo(x1, y1);
        ctx.lineTo(x2, y2);
      }
      ctx.closePath();
      ctx.strokeStyle = `${champagneColor}${isDark ? 0.25 : 0.35})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Soft Glass Facet Fill with Warm Metallic Reflection
      const fillGradient = ctx.createRadialGradient(0, 0, 10, 0, 0, octRadius);
      fillGradient.addColorStop(0, `${champagneColor}${isDark ? 0.08 : 0.06})`);
      fillGradient.addColorStop(0.6, `${bronzeColor}${isDark ? 0.04 : 0.03})`);
      fillGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = fillGradient;
      ctx.fill();

      // Core Machined Axis Line
      ctx.beginPath();
      ctx.moveTo(-octRadius * 0.8, 0);
      ctx.lineTo(octRadius * 0.8, 0);
      ctx.strokeStyle = `${metallicGridColor}${isDark ? 0.12 : 0.18})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();

      animationFrameId = requestAnimationFrame(drawSculpture);
    };

    drawSculpture();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <div className={`relative w-full h-[450px] sm:h-[500px] flex items-center justify-center -mt-6 sm:-mt-10 lg:-mt-16 ${className}`}>
      {/* Background Soft Warm Lighting Glow Disc */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.35, 0.5, 0.35],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`absolute w-80 h-80 rounded-full blur-[120px] pointer-events-none ${
          isDark
            ? 'bg-gradient-to-tr from-[#B87333]/15 via-[#C7A15A]/20 to-transparent'
            : 'bg-gradient-to-tr from-[#B87333]/10 via-[#C7A15A]/15 to-transparent'
        }`}
      />

      {/* Clean Interactive 3D Metal & Glass Sculpture Canvas without text clutter */}
      <canvas ref={canvasRef} className="relative z-10 w-full h-full cursor-pointer" />
    </div>
  );
}
