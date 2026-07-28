'use client';

import { useState } from 'react';
import { ShieldCheck, Award, Zap, Layers, Sparkles, X, CheckCircle2, AlertCircle, Info, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

interface ScoreProps {
  overallGeoScore?: number;
  schemaScore?: number;
  citationScore?: number;
  entityScore?: number;
  readabilityScore?: number;
  shareOfVoice?: number;
  isDark?: boolean;
}

export function AeoScoreCard({
  overallGeoScore = 0,
  schemaScore = 0,
  citationScore = 0,
  entityScore = 0,
  readabilityScore = 0,
  shareOfVoice = 0,
  isDark = false,
}: ScoreProps) {
  const [activeMetricModal, setActiveMetricModal] = useState<string | null>(null);

  const safeOverallGeo = overallGeoScore ?? 0;
  const safeSchema = schemaScore ?? 0;
  const safeCitation = citationScore ?? 0;
  const safeEntity = entityScore ?? 0;
  const safeReadability = readabilityScore ?? 0;
  const safeSoV = shareOfVoice ?? 0;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-emerald-500 to-teal-400 text-emerald-500';
    if (score >= 50) return 'from-cyan-500 to-blue-500 text-cyan-600';
    return 'from-red-500 to-amber-500 text-red-500';
  };

  const metricDetails: Record<string, any> = {
    overall: {
      title: 'Overall GEO Score',
      score: safeOverallGeo,
      icon: Award,
      color: 'cyan',
      description: 'Composite AI search readiness score evaluating direct answer optimization across LLM engines.',
      breakdown: [
        { label: 'AI Share of Voice Weight (40%)', value: `${safeSoV}%`, status: safeSoV > 0 ? 'passed' : 'failed' },
        { label: 'JSON-LD Schema Coverage Weight (25%)', value: `${safeSchema}/100`, status: safeSchema >= 50 ? 'passed' : 'failed' },
        { label: 'Entity Knowledge Density Weight (20%)', value: `${safeEntity}/100`, status: safeEntity >= 50 ? 'passed' : 'failed' },
        { label: 'Content Readability & Headings Weight (15%)', value: `${safeReadability}/100`, status: safeReadability >= 50 ? 'passed' : 'failed' },
      ],
      recommendations: [
        'Implement FAQPage JSON-LD schema markup to directly target AI snippet answer boxes.',
        'Increase entity density in subheadings to improve vector embedding similarity scores.',
      ]
    },
    sov: {
      title: 'AI Share of Voice (SOV)',
      score: `${safeSoV}%`,
      icon: Zap,
      color: 'blue',
      description: 'Percentage of unbranded buyer intent queries where your domain is organically recommended by LLMs.',
      breakdown: [
        { label: 'Organic ChatGPT (GPT-4o) Mention', value: safeSoV > 0 ? 'Cited' : 'Unranked', status: safeSoV > 0 ? 'passed' : 'failed' },
        { label: 'Google Gemini 1.5 Pro Recommendation', value: safeSoV > 0 ? 'Cited' : 'Unranked', status: safeSoV > 0 ? 'passed' : 'failed' },
        { label: 'Claude 3.5 Sonnet Citation', value: safeSoV > 0 ? 'Cited' : 'Unranked', status: safeSoV > 0 ? 'passed' : 'failed' },
        { label: 'DeepSeek V3 Recommendation', value: safeSoV > 0 ? 'Cited' : 'Unranked', status: safeSoV > 0 ? 'passed' : 'failed' },
      ],
      recommendations: [
        'Publish direct-answer summaries at the top of key product pages.',
        'Build authoritative citations across Wikidata, Crunchbase, and GitHub repositories.',
      ]
    },
    schema: {
      title: 'JSON-LD Schema Score',
      score: safeSchema,
      icon: Layers,
      color: 'purple',
      description: 'Structural JSON-LD schema validation measuring machine-readable structured data.',
      breakdown: [
        { label: 'Organization / WebSite Schema', value: safeSchema >= 30 ? 'Detected' : 'Missing', status: safeSchema >= 30 ? 'passed' : 'failed' },
        { label: 'FAQPage Structured Data', value: safeSchema >= 60 ? 'Implemented' : 'Missing', status: safeSchema >= 60 ? 'passed' : 'failed' },
        { label: 'Product / SoftwareApp Schema', value: safeSchema >= 80 ? 'Implemented' : 'Missing', status: safeSchema >= 80 ? 'passed' : 'failed' },
      ],
      recommendations: [
        'Add FAQPage JSON-LD schema containing Q&A pairs directly matching buyer questions.',
        'Add sameAs attributes linking your official social profiles and Wikipedia/Wikidata entities.',
      ]
    },
    entity: {
      title: 'Entity & Readability Score',
      score: safeEntity,
      icon: ShieldCheck,
      color: 'emerald',
      description: 'Entity keyphrases density, structural H1/H2 header formatting, and NLP readability index.',
      breakdown: [
        { label: 'Single <h1> Tag Validation', value: safeReadability >= 40 ? 'Valid' : 'Warning', status: safeReadability >= 40 ? 'passed' : 'failed' },
        { label: 'Q&A <h2> Subheading Structure', value: safeReadability >= 60 ? 'Good' : 'Needs Work', status: safeReadability >= 60 ? 'passed' : 'failed' },
        { label: 'Core Entity Word Frequency Density', value: safeEntity >= 50 ? 'High' : 'Low', status: safeEntity >= 50 ? 'passed' : 'failed' },
      ],
      recommendations: [
        'Ensure exactly one <h1> heading per page containing primary industry keywords.',
        'Format <h2> tags as direct questions that LLMs parse for answer snippets.',
      ]
    }
  };

  const selectedData = activeMetricModal ? metricDetails[activeMetricModal] : null;

  return (
    <>
      <ScrollReveal variant="fadeUp" duration={0.55} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Overall GEO Score Card */}
        <div
          onClick={() => setActiveMetricModal('overall')}
          className={`p-6 rounded-3xl border ${
            isDark ? 'bg-[#181818] border-[#2A2A2A] hover-luxury-lift' : 'bg-white border-slate-200 shadow-lg shadow-slate-200/50 hover:border-cyan-400'
          } relative overflow-hidden backdrop-blur-2xl cursor-pointer transition-all duration-300 group`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold ${isDark ? 'text-[#9E9E9E]' : 'text-slate-600'} uppercase tracking-wider`}>Overall GEO Score</span>
            <Award className={`w-5 h-5 ${isDark ? 'text-[#D4AF37]' : 'text-cyan-500'} group-hover:scale-110 transition-transform`} />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className={`text-4xl font-black ${isDark ? 'gold-gradient-text' : `bg-gradient-to-r ${getScoreColor(safeOverallGeo)} bg-clip-text text-transparent`}`}>
              {safeOverallGeo}
            </span>
            <span className={`${isDark ? 'text-[#9E9E9E]' : 'text-slate-400'} text-sm font-semibold`}>/ 100</span>
          </div>
          <div className={`mt-3 w-full ${isDark ? 'bg-[#202020]' : 'bg-slate-100'} h-2 rounded-full overflow-hidden`}>
            <div
              className={`h-full ${isDark ? 'bg-[#D4AF37]' : `bg-gradient-to-r ${getScoreColor(safeOverallGeo)}`} transition-all duration-1000`}
              style={{ width: `${safeOverallGeo}%` }}
            />
          </div>
          <p className={`${isDark ? 'text-[#CFCFCF]' : 'text-slate-600'} text-xs font-medium mt-3 flex items-center justify-between`}>
            <span>Direct Answer AI Readiness</span>
            <span className={`${isDark ? 'text-[#D4AF37]' : 'text-cyan-500'} text-[11px] font-bold group-hover:underline`}>View Breakdown →</span>
          </p>
        </div>

        {/* Share of Voice Card */}
        <div
          onClick={() => setActiveMetricModal('sov')}
          className={`p-6 rounded-3xl border ${
            isDark ? 'bg-[#181818] border-[#2A2A2A] hover-luxury-lift' : 'bg-white border-slate-200 shadow-lg shadow-slate-200/50 hover:border-blue-400'
          } relative overflow-hidden backdrop-blur-2xl cursor-pointer transition-all duration-300 group`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold ${isDark ? 'text-[#9E9E9E]' : 'text-slate-600'} uppercase tracking-wider`}>AI Share of Voice (SoV)</span>
            <Zap className={`w-5 h-5 ${isDark ? 'text-[#D4AF37]' : 'text-blue-500'} group-hover:scale-110 transition-transform`} />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className={`text-4xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{safeSoV}%</span>
            <span className={`text-xs font-bold ${safeSoV > 0 ? (isDark ? 'text-[#D4AF37]' : 'text-emerald-600') : 'text-[#9E9E9E]'}`}>
              {safeSoV > 0 ? 'Organic Recommendations' : '0% Mentions'}
            </span>
          </div>
          <div className={`mt-3 w-full ${isDark ? 'bg-[#202020]' : 'bg-slate-100'} h-2 rounded-full overflow-hidden`}>
            <div
              className={`h-full ${isDark ? 'bg-[#D4AF37]' : 'bg-blue-500'} transition-all duration-1000`}
              style={{ width: `${safeSoV}%` }}
            />
          </div>
          <p className={`${isDark ? 'text-[#CFCFCF]' : 'text-slate-600'} text-xs font-medium mt-3 flex items-center justify-between`}>
            <span>Percentage of LLM prompts citing brand</span>
            <span className={`${isDark ? 'text-[#D4AF37]' : 'text-blue-500'} text-[11px] font-bold group-hover:underline`}>View Breakdown →</span>
          </p>
        </div>

        {/* Schema Score Card */}
        <div
          onClick={() => setActiveMetricModal('schema')}
          className={`p-6 rounded-3xl border ${
            isDark ? 'bg-[#181818] border-[#2A2A2A] hover-luxury-lift' : 'bg-white border-slate-200 shadow-lg shadow-slate-200/50 hover:border-purple-400'
          } relative overflow-hidden backdrop-blur-2xl cursor-pointer transition-all duration-300 group`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold ${isDark ? 'text-[#9E9E9E]' : 'text-slate-600'} uppercase tracking-wider`}>JSON-LD Schema Score</span>
            <Layers className={`w-5 h-5 ${isDark ? 'text-[#D4AF37]' : 'text-purple-500'} group-hover:scale-110 transition-transform`} />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className={`text-4xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{safeSchema}</span>
            <span className={`${isDark ? 'text-[#9E9E9E]' : 'text-slate-400'} text-sm font-semibold`}>/ 100</span>
          </div>
          <div className={`mt-3 w-full ${isDark ? 'bg-[#202020]' : 'bg-slate-100'} h-2 rounded-full overflow-hidden`}>
            <div
              className={`h-full ${isDark ? 'bg-[#D4AF37]' : 'bg-purple-500'} transition-all duration-1000`}
              style={{ width: `${safeSchema}%` }}
            />
          </div>
          <p className={`${isDark ? 'text-[#CFCFCF]' : 'text-slate-600'} text-xs font-medium mt-3 flex items-center justify-between`}>
            <span>FAQPage & Entity Schema coverage</span>
            <span className={`${isDark ? 'text-[#D4AF37]' : 'text-purple-500'} text-[11px] font-bold group-hover:underline`}>View Breakdown →</span>
          </p>
        </div>

        {/* Entity Score Card */}
        <div
          onClick={() => setActiveMetricModal('entity')}
          className={`p-6 rounded-3xl border ${
            isDark ? 'bg-[#181818] border-[#2A2A2A] hover-luxury-lift' : 'bg-white border-slate-200 shadow-lg shadow-slate-200/50 hover:border-emerald-400'
          } relative overflow-hidden backdrop-blur-2xl cursor-pointer transition-all duration-300 group`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold ${isDark ? 'text-[#9E9E9E]' : 'text-slate-600'} uppercase tracking-wider`}>Entity & Readability</span>
            <ShieldCheck className={`w-5 h-5 ${isDark ? 'text-[#D4AF37]' : 'text-emerald-500'} group-hover:scale-110 transition-transform`} />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className={`text-4xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{safeEntity}</span>
            <span className={`${isDark ? 'text-[#9E9E9E]' : 'text-slate-400'} text-sm font-semibold`}>/ 100</span>
          </div>
          <div className={`mt-3 w-full ${isDark ? 'bg-[#202020]' : 'bg-slate-100'} h-2 rounded-full overflow-hidden`}>
            <div
              className={`h-full ${isDark ? 'bg-[#D4AF37]' : 'bg-emerald-500'} transition-all duration-1000`}
              style={{ width: `${safeEntity}%` }}
            />
          </div>
          <p className={`${isDark ? 'text-[#CFCFCF]' : 'text-slate-600'} text-xs font-medium mt-3 flex items-center justify-between`}>
            <span>Knowledge Graph vector density</span>
            <span className={`${isDark ? 'text-[#D4AF37]' : 'text-emerald-500'} text-[11px] font-bold group-hover:underline`}>View Breakdown →</span>
          </p>
        </div>
      </ScrollReveal>

      {/* METRIC DETAIL BREAKDOWN MODAL */}
      {selectedData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
          <div className={`w-full max-w-lg rounded-3xl border p-6 shadow-2xl ${
            isDark ? 'bg-[#181818] border-[#2A2A2A] text-white' : 'bg-white border-slate-200 text-slate-900'
          } relative space-y-5`}>
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-[#2A2A2A] pb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isDark ? 'bg-[#202020] text-[#D4AF37] border border-[#2A2A2A]' : 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                }`}>
                  <selectedData.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black">{selectedData.title}</h3>
                  <p className={`text-xs ${isDark ? 'text-[#9E9E9E]' : 'text-slate-500'} font-medium`}>Metric Score: {selectedData.score}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveMetricModal(null)}
                className={`p-2 rounded-xl border ${isDark ? 'border-[#2A2A2A] hover:bg-[#202020] text-[#9E9E9E] hover:text-white' : 'border-slate-300 hover:bg-slate-100'} transition-all`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Description */}
            <p className={`text-xs ${isDark ? 'text-[#CFCFCF]' : 'text-slate-700'} font-medium leading-relaxed`}>
              {selectedData.description}
            </p>

            {/* Detailed Checks Breakdown */}
            <div className="space-y-2">
              <h4 className={`text-xs font-extrabold uppercase tracking-wider ${isDark ? 'text-[#9E9E9E]' : 'text-slate-500'}`}>Evaluation Checks:</h4>
              <div className="space-y-2">
                {selectedData.breakdown.map((item: any, idx: number) => (
                  <div key={idx} className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                    isDark ? 'bg-[#0A0A0A] border-[#2A2A2A]' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="flex items-center gap-2">
                      {item.status === 'passed' ? (
                        <CheckCircle2 className={`w-4 h-4 ${isDark ? 'text-[#D4AF37]' : 'text-emerald-500'} shrink-0`} />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                      )}
                      <span className="font-semibold">{item.label}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      item.status === 'passed'
                        ? (isDark ? 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30' : 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20')
                        : 'bg-amber-500/10 text-amber-600 border border-amber-500/20'
                    }`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actionable Fixes */}
            <div className={`p-4 rounded-2xl border ${
              isDark ? 'bg-[#202020] border-[#D4AF37]/30' : 'bg-sky-50 border-sky-200'
            } space-y-2`}>
              <h4 className={`text-xs font-black ${isDark ? 'text-[#D4AF37]' : 'text-cyan-600'} uppercase tracking-wider flex items-center gap-1.5`}>
                <Sparkles className="w-3.5 h-3.5" /> Actionable Optimization Advice
              </h4>
              <ul className="space-y-1.5 text-xs">
                {selectedData.recommendations.map((rec: string, rIdx: number) => (
                  <li key={rIdx} className="flex items-start gap-2">
                    <ArrowRight className={`w-3.5 h-3.5 ${isDark ? 'text-[#D4AF37]' : 'text-cyan-600'} shrink-0 mt-0.5`} />
                    <span className={isDark ? 'text-[#CFCFCF]' : ''}>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modal Footer */}
            <div className="pt-2 text-right">
              <button
                onClick={() => setActiveMetricModal(null)}
                className={`px-5 py-2.5 rounded-xl ${isDark ? 'luxury-btn-primary' : 'bg-cyan-600 text-white'} text-xs font-bold transition-all`}
              >
                Close Breakdown
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
