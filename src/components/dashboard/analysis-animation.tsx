'use client';

import { useState, useEffect, useMemo } from 'react';
import { Brain, Globe, Cpu, Sparkles, Zap, Radio, Eye, Layers, Shield, Search } from 'lucide-react';

interface AnalysisAnimationProps {
  domain: string;
  isDark: boolean;
}

const AI_MODELS = [
  { name: 'GPT-4o', color: '#10b981', icon: '🧠' },
  { name: 'Gemini Pro', color: '#8b5cf6', icon: '💎' },
  { name: 'Claude 3.5', color: '#f59e0b', icon: '⚡' },
  { name: 'DeepSeek', color: '#06b6d4', icon: '🔬' },
  { name: 'Grok-2', color: '#ef4444', icon: '🌀' },
  { name: 'Perplexity', color: '#3b82f6', icon: '🌐' },
];

const SCAN_PHASES = [
  { label: 'Crawling Website HTML', icon: Globe, detail: 'Extracting DOM structure, meta tags, and schema markup...' },
  { label: 'Extracting Entities & Keywords', icon: Search, detail: 'Identifying key entities, NLP signals, and semantic markers...' },
  { label: 'Discovering Competitors', icon: Eye, detail: 'AI analyzing industry landscape for top competitors...' },
  { label: 'Querying GPT-4o', icon: Brain, detail: 'Scanning brand visibility across OpenAI search...' },
  { label: 'Querying Gemini Pro 1.5', icon: Sparkles, detail: 'Analyzing presence in Google AI Overviews...' },
  { label: 'Querying Claude 3.5 Sonnet', icon: Zap, detail: 'Checking Anthropic model citation patterns...' },
  { label: 'Querying DeepSeek Chat', icon: Cpu, detail: 'Testing Chinese AI model visibility...' },
  { label: 'Querying Grok-2', icon: Radio, detail: 'Scanning xAI search engine presence...' },
  { label: 'Querying Perplexity Sonar', icon: Layers, detail: 'Evaluating real-time AI search citations...' },
  { label: 'Computing AEO/GEO Scores', icon: Shield, detail: 'Aggregating multi-model results into final scores...' },
];

export function AnalysisAnimation({ domain, isDark }: AnalysisAnimationProps) {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const [pulseCount, setPulseCount] = useState(0);

  // Cycle through phases
  useEffect(() => {
    const phaseInterval = setInterval(() => {
      setCurrentPhase((prev) => (prev + 1) % SCAN_PHASES.length);
    }, 3200);
    return () => clearInterval(phaseInterval);
  }, []);

  // Smooth progress bar
  useEffect(() => {
    const progInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return 15; // loop back
        return prev + Math.random() * 3 + 0.5;
      });
    }, 200);
    return () => clearInterval(progInterval);
  }, []);

  // Pulse counter for ring animations
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setPulseCount((prev) => prev + 1);
    }, 1500);
    return () => clearInterval(pulseInterval);
  }, []);

  // Generate particles
  const particles = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 8 + 4,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.6 + 0.1,
    }));
  }, []);

  // Generate neural connections
  const connections = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x1: Math.random() * 100,
      y1: Math.random() * 100,
      x2: Math.random() * 100,
      y2: Math.random() * 100,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 3,
    }));
  }, []);

  const currentPhaseData = SCAN_PHASES[currentPhase];
  const PhaseIcon = currentPhaseData.icon;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden ${
      isDark ? 'bg-slate-950' : 'bg-white'
    }`}>

      {/* === BACKGROUND LAYER: Animated Gradient Mesh === */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute inset-0 ${
          isDark
            ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'
            : 'bg-gradient-to-br from-sky-50 via-white to-cyan-50'
        }`} />
        
        {/* Animated gradient blobs */}
        <div className={`absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] animate-blob ${
          isDark ? 'bg-cyan-600/15' : 'bg-cyan-400/20'
        }`} />
        <div className={`absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] animate-blob animation-delay-2000 ${
          isDark ? 'bg-purple-600/15' : 'bg-purple-400/15'
        }`} />
        <div className={`absolute top-[40%] left-[60%] w-[400px] h-[400px] rounded-full blur-[100px] animate-blob animation-delay-4000 ${
          isDark ? 'bg-blue-600/10' : 'bg-blue-400/10'
        }`} />
      </div>

      {/* === PARTICLE FIELD === */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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

      {/* === NEURAL CONNECTION LINES === */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        {connections.map((c) => (
          <line
            key={c.id}
            x1={`${c.x1}%`}
            y1={`${c.y1}%`}
            x2={`${c.x2}%`}
            y2={`${c.y2}%`}
            className="animate-neural-pulse"
            style={{
              stroke: isDark ? 'rgba(34,211,238,0.08)' : 'rgba(8,145,178,0.06)',
              strokeWidth: 1,
              animationDuration: `${c.duration}s`,
              animationDelay: `${c.delay}s`,
            }}
          />
        ))}
      </svg>

      {/* === CENTER CONTENT === */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl px-6">
        
        {/* === ORBITAL RING SYSTEM === */}
        <div className="relative w-52 h-52 mb-10">
          {/* Outer ring 1 — slow rotation */}
          <div className="absolute inset-0 rounded-full border animate-spin-slow"
            style={{
              borderColor: isDark ? 'rgba(34,211,238,0.15)' : 'rgba(8,145,178,0.12)',
              borderTopColor: isDark ? 'rgba(34,211,238,0.6)' : 'rgba(8,145,178,0.5)',
              borderRightColor: 'transparent',
              animationDuration: '8s',
            }}
          />
          {/* Outer ring 2 — reverse rotation */}
          <div className="absolute inset-3 rounded-full border animate-spin-reverse"
            style={{
              borderColor: isDark ? 'rgba(139,92,246,0.12)' : 'rgba(139,92,246,0.08)',
              borderBottomColor: isDark ? 'rgba(139,92,246,0.5)' : 'rgba(139,92,246,0.4)',
              borderLeftColor: 'transparent',
              animationDuration: '6s',
            }}
          />
          {/* Inner ring 3 — fast rotation */}
          <div className="absolute inset-6 rounded-full border-2 animate-spin-slow"
            style={{
              borderColor: isDark ? 'rgba(59,130,246,0.1)' : 'rgba(59,130,246,0.08)',
              borderTopColor: isDark ? 'rgba(59,130,246,0.5)' : 'rgba(59,130,246,0.4)',
              animationDuration: '4s',
            }}
          />
          
          {/* Scanning radar sweep */}
          <div className="absolute inset-8 rounded-full overflow-hidden">
            <div className={`absolute inset-0 animate-spin-slow ${
              isDark
                ? 'bg-[conic-gradient(from_0deg,transparent_0deg,rgba(34,211,238,0.15)_60deg,transparent_120deg)]'
                : 'bg-[conic-gradient(from_0deg,transparent_0deg,rgba(8,145,178,0.1)_60deg,transparent_120deg)]'
            }`}
              style={{ animationDuration: '3s' }}
            />
          </div>

          {/* Center Brain Icon with pulse rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Pulse ring effects */}
            <div className={`absolute w-24 h-24 rounded-full animate-ping-slow ${
              isDark ? 'bg-cyan-500/10' : 'bg-cyan-500/8'
            }`} />
            <div className={`absolute w-20 h-20 rounded-full animate-ping-slow animation-delay-500 ${
              isDark ? 'bg-cyan-500/15' : 'bg-cyan-500/10'
            }`} />
            
            {/* Core icon */}
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl ${
              isDark
                ? 'bg-gradient-to-br from-cyan-500 via-sky-500 to-blue-600 shadow-cyan-500/30'
                : 'bg-gradient-to-br from-cyan-500 via-sky-500 to-blue-600 shadow-cyan-500/25'
            } animate-icon-glow`}>
              <Brain className="w-8 h-8 text-white animate-pulse" />
            </div>
          </div>

          {/* Orbiting AI Model Dots */}
          {AI_MODELS.map((model, idx) => {
            const angle = (idx / AI_MODELS.length) * 360;
            const radius = 96;
            return (
              <div
                key={model.name}
                className="absolute animate-orbit"
                style={{
                  width: '36px',
                  height: '36px',
                  left: '50%',
                  top: '50%',
                  marginLeft: '-18px',
                  marginTop: '-18px',
                  animationDuration: `${12 + idx * 2}s`,
                  animationDelay: `${idx * 0.5}s`,
                  // @ts-ignore
                  '--orbit-radius': `${radius}px`,
                  '--start-angle': `${angle}deg`,
                } as React.CSSProperties}
              >
                <div
                  className="w-full h-full rounded-xl flex items-center justify-center text-sm shadow-lg animate-pulse border"
                  style={{
                    backgroundColor: isDark ? `${model.color}20` : `${model.color}15`,
                    borderColor: `${model.color}50`,
                    boxShadow: `0 0 20px ${model.color}30`,
                  }}
                  title={model.name}
                >
                  {model.icon}
                </div>
              </div>
            );
          })}
        </div>

        {/* === DOMAIN BEING ANALYZED === */}
        <div className={`mb-6 px-5 py-2 rounded-full border animate-fade-in ${
          isDark
            ? 'bg-slate-900/80 border-slate-700/60 text-cyan-400'
            : 'bg-white border-slate-200 text-cyan-700 shadow-lg shadow-slate-200/60'
        } flex items-center gap-2 backdrop-blur-xl`}>
          <Globe className="w-4 h-4 animate-spin-slow" style={{ animationDuration: '6s' }} />
          <span className="text-sm font-bold tracking-wide">{domain}</span>
          <span className={`w-2 h-2 rounded-full animate-pulse ${
            isDark ? 'bg-emerald-400' : 'bg-emerald-500'
          }`} />
        </div>

        {/* === TITLE TEXT === */}
        <h2 className={`text-2xl sm:text-3xl font-black tracking-tight mb-2 animate-fade-in-up ${
          isDark
            ? 'bg-gradient-to-r from-white via-cyan-200 to-sky-400 bg-clip-text text-transparent'
            : 'bg-gradient-to-r from-slate-900 via-cyan-800 to-sky-700 bg-clip-text text-transparent'
        }`}>
          AI Models Analyzing
        </h2>
        <p className={`text-xs font-medium mb-8 animate-fade-in-up animation-delay-200 ${
          isDark ? 'text-slate-400' : 'text-slate-500'
        }`}>
          Scanning 6 AI search engines across multiple prompts in real-time
        </p>

        {/* === CURRENT PHASE INDICATOR === */}
        <div className={`w-full max-w-md px-5 py-4 rounded-2xl border mb-6 animate-phase-slide ${
          isDark
            ? 'bg-slate-900/80 border-slate-800/80 backdrop-blur-xl'
            : 'bg-white border-slate-200/80 shadow-lg shadow-slate-200/40'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              isDark
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                : 'bg-cyan-50 text-cyan-700 border border-cyan-200'
            }`}>
              <PhaseIcon className="w-5 h-5 animate-pulse" />
            </div>
            <div className="text-left">
              <p className={`text-sm font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {currentPhaseData.label}
              </p>
              <p className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {currentPhaseData.detail}
              </p>
            </div>
          </div>
        </div>

        {/* === ANIMATED PROGRESS BAR === */}
        <div className="w-full max-w-md mb-6">
          <div className={`w-full h-2 rounded-full overflow-hidden ${
            isDark ? 'bg-slate-800' : 'bg-slate-200'
          }`}>
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 transition-all duration-300 relative overflow-hidden"
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              {/* Shimmer effect on progress bar */}
              <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </div>
          </div>
        </div>

        {/* === AI MODEL STATUS GRID === */}
        <div className="w-full max-w-md grid grid-cols-3 gap-2">
          {AI_MODELS.map((model, idx) => {
            const isActive = currentPhase >= 3 + idx && currentPhase <= 3 + idx;
            const isComplete = currentPhase > 3 + idx;
            return (
              <div
                key={model.name}
                className={`px-3 py-2.5 rounded-xl border text-center transition-all duration-500 ${
                  isActive
                    ? isDark
                      ? 'bg-cyan-500/10 border-cyan-500/40 scale-105 shadow-lg shadow-cyan-500/10'
                      : 'bg-cyan-50 border-cyan-300 scale-105 shadow-lg shadow-cyan-200/40'
                    : isComplete
                    ? isDark
                      ? 'bg-emerald-500/10 border-emerald-500/30'
                      : 'bg-emerald-50 border-emerald-200'
                    : isDark
                    ? 'bg-slate-900/60 border-slate-800/60'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="text-lg mb-0.5">{model.icon}</div>
                <p className={`text-[10px] font-bold truncate ${
                  isActive
                    ? isDark ? 'text-cyan-400' : 'text-cyan-700'
                    : isComplete
                    ? isDark ? 'text-emerald-400' : 'text-emerald-700'
                    : isDark ? 'text-slate-500' : 'text-slate-500'
                }`}>
                  {model.name}
                </p>
                <p className={`text-[9px] font-medium ${
                  isActive
                    ? isDark ? 'text-cyan-500' : 'text-cyan-600'
                    : isComplete
                    ? isDark ? 'text-emerald-500' : 'text-emerald-600'
                    : isDark ? 'text-slate-600' : 'text-slate-400'
                }`}>
                  {isActive ? 'Scanning...' : isComplete ? 'Done ✓' : 'Queued'}
                </p>
              </div>
            );
          })}
        </div>

        {/* === SCANNING TEXT ANIMATION === */}
        <div className={`mt-6 flex items-center gap-2 text-xs font-semibold ${
          isDark ? 'text-slate-500' : 'text-slate-400'
        }`}>
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <span>This may take 30-60 seconds for a comprehensive audit</span>
        </div>
      </div>

      {/* === CSS ANIMATIONS === */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 12s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        @keyframes float-particle {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          50% { transform: translateY(-40px) translateX(20px); opacity: 0.8; }
          90% { opacity: 0.2; }
          100% { transform: translateY(-80px) translateX(-10px); opacity: 0; }
        }
        .animate-float-particle {
          animation: float-particle var(--duration, 6s) ease-in-out infinite;
        }

        @keyframes neural-pulse {
          0%, 100% { opacity: 0; stroke-dashoffset: 1000; }
          50% { opacity: 1; stroke-dashoffset: 0; }
        }
        .animate-neural-pulse {
          stroke-dasharray: 4 8;
          animation: neural-pulse var(--duration, 5s) ease-in-out infinite;
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-reverse {
          animation: spin-reverse 6s linear infinite;
        }

        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.6; }
          75%, 100% { transform: scale(1.8); opacity: 0; }
        }
        .animate-ping-slow {
          animation: ping-slow 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        @keyframes icon-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(34,211,238,0.3), 0 0 60px rgba(34,211,238,0.1); }
          50% { box-shadow: 0 0 30px rgba(34,211,238,0.5), 0 0 80px rgba(34,211,238,0.2); }
        }
        .animate-icon-glow {
          animation: icon-glow 3s ease-in-out infinite;
        }

        @keyframes orbit {
          from {
            transform: rotate(var(--start-angle, 0deg)) translateX(var(--orbit-radius, 96px)) rotate(calc(-1 * var(--start-angle, 0deg)));
          }
          to {
            transform: rotate(calc(var(--start-angle, 0deg) + 360deg)) translateX(var(--orbit-radius, 96px)) rotate(calc(-1 * (var(--start-angle, 0deg) + 360deg)));
          }
        }
        .animate-orbit {
          animation: orbit var(--duration, 12s) linear infinite;
        }

        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        @keyframes phase-slide {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-phase-slide {
          animation: phase-slide 0.5s ease-out;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
