'use client';

import { ShieldCheck, Award, Zap, Layers, Sparkles } from 'lucide-react';

interface ScoreProps {
  overallGeoScore: number;
  schemaScore: number;
  citationScore: number;
  entityScore: number;
  readabilityScore: number;
  shareOfVoice: number;
}

export function AeoScoreCard({
  overallGeoScore = 78,
  schemaScore = 70,
  citationScore = 82,
  entityScore = 75,
  readabilityScore = 85,
  shareOfVoice = 64,
}: ScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-emerald-500 to-teal-400 text-emerald-400';
    if (score >= 60) return 'from-cyan-500 to-blue-400 text-cyan-400';
    return 'from-amber-500 to-red-400 text-amber-400';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Overall GEO Score Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative overflow-hidden backdrop-blur-md shadow-lg">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Overall GEO Score</span>
          <Award className="w-5 h-5 text-cyan-400" />
        </div>
        <div className="mt-4 flex items-baseline gap-2">
          <span className={`text-4xl font-extrabold bg-gradient-to-r ${getScoreColor(overallGeoScore)} bg-clip-text text-transparent`}>
            {overallGeoScore}
          </span>
          <span className="text-slate-500 text-sm font-medium">/ 100</span>
        </div>
        <div className="mt-3 w-full bg-slate-800 h-2 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${getScoreColor(overallGeoScore)} transition-all duration-1000`}
            style={{ width: `${overallGeoScore}%` }}
          />
        </div>
        <p className="text-slate-400 text-xs mt-3 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 inline" /> Direct Answer AI Readiness
        </p>
      </div>

      {/* Share of Voice Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative overflow-hidden backdrop-blur-md shadow-lg">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">AI Share of Voice (SoV)</span>
          <Zap className="w-5 h-5 text-blue-400" />
        </div>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-4xl font-extrabold text-white">{shareOfVoice}%</span>
          <span className="text-emerald-400 text-xs font-semibold">↑ 12% vs last audit</span>
        </div>
        <div className="mt-3 w-full bg-slate-800 h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-1000"
            style={{ width: `${shareOfVoice}%` }}
          />
        </div>
        <p className="text-slate-400 text-xs mt-3">Percentage of LLM prompts citing brand</p>
      </div>

      {/* Schema Score Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative overflow-hidden backdrop-blur-md shadow-lg">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">JSON-LD Schema Score</span>
          <Layers className="w-5 h-5 text-purple-400" />
        </div>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-4xl font-extrabold text-white">{schemaScore}</span>
          <span className="text-slate-500 text-sm">/ 100</span>
        </div>
        <div className="mt-3 w-full bg-slate-800 h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-purple-500 transition-all duration-1000"
            style={{ width: `${schemaScore}%` }}
          />
        </div>
        <p className="text-slate-400 text-xs mt-3">FAQPage & Entity Schema coverage</p>
      </div>

      {/* Entity Score Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative overflow-hidden backdrop-blur-md shadow-lg">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Entity & Readability</span>
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
        </div>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-4xl font-extrabold text-white">{entityScore}</span>
          <span className="text-slate-500 text-sm">/ 100</span>
        </div>
        <div className="mt-3 w-full bg-slate-800 h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-all duration-1000"
            style={{ width: `${entityScore}%` }}
          />
        </div>
        <p className="text-slate-400 text-xs mt-3">Knowledge Graph vector density</p>
      </div>
    </div>
  );
}
