'use client';

import { useState } from 'react';
import { GapItem } from '@/lib/aeo-engine/gap-detector';
import { Target, Sparkles, FileText, CheckCircle2, Copy, X, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

interface GapProps {
  gaps?: GapItem[];
  isDark?: boolean;
}

export function GapAnalysisTable({ gaps = [], isDark = true }: GapProps) {
  const [selectedGap, setSelectedGap] = useState<GapItem | null>(null);

  if (!gaps || gaps.length === 0) {
    return (
      <div className={`p-8 text-center rounded-2xl border ${isDark ? 'bg-slate-900/60 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500 shadow-sm'}`}>
        No content gaps detected. Your domain is well cited across tested prompt categories!
      </div>
    );
  }

  const copyBriefToClipboard = (brief: GapItem['suggestedContentBrief']) => {
    const text = `TITLE: ${brief.title}\n\nTARGET KEYWORDS:\n${brief.targetKeywords.join(', ')}\n\nDIRECT ANSWER SUMMARY:\n${brief.directAnswerSummary}\n\nHEADINGS OUTLINE:\n${brief.suggestedHeadings.map(h => `- ${h}`).join('\n')}\n\nRECOMMENDED FAQS:\n${brief.recommendedFaqs.map(f => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n')}`;
    navigator.clipboard.writeText(text);
    toast.success('GEO Content Brief copied to clipboard!');
  };

  return (
    <ScrollReveal variant="fadeUp" duration={0.55} className={`p-6 sm:p-8 rounded-3xl border ${
      isDark ? 'bg-[#181818] border-[#2A2A2A]' : 'bg-white border-slate-200/90 shadow-xl shadow-slate-900/5'
    } backdrop-blur-2xl relative`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className={`text-lg font-extrabold ${isDark ? 'text-white' : 'text-slate-900'} flex items-center gap-2`}>
            <Target className={`w-5 h-5 ${isDark ? 'text-[#D4AF37]' : 'text-amber-500'}`} /> Gap Detection & GEO Content Briefs
          </h3>
          <p className={`text-xs ${isDark ? 'text-[#CFCFCF]' : 'text-slate-600'} mt-1 font-medium`}>
            Queries where competitors are cited in AI answers but your brand is missing
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
          isDark ? 'bg-[#121212] border border-[#D4AF37]/30 text-[#D4AF37]' : 'bg-amber-500/10 border border-amber-500/30 text-amber-600'
        }`}>
          {gaps.length} Opportunities
        </span>
      </div>

      <div className="space-y-4">
        {gaps.map((gap) => {
          const compUrl = gap.competitorDomain.startsWith('http') ? gap.competitorDomain : `https://${gap.competitorDomain}`;
          return (
            <div
              key={gap.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                isDark ? 'bg-[#0A0A0A] border-[#2A2A2A] hover-luxury-lift' : 'bg-amber-50/30 border-amber-200/80 hover:border-amber-300 shadow-2xs'
              }`}
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                    isDark ? 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30' : 'bg-amber-500/10 text-amber-600 border border-amber-500/20'
                  }`}>
                    Opportunity Score: {gap.opportunityScore}/100
                  </span>
                  <span className={`text-xs font-medium ${isDark ? 'text-[#9E9E9E]' : 'text-slate-600'}`}>Category: {gap.category}</span>
                </div>
                <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  &quot;{gap.missingPrompt}&quot;
                </h4>
                <p className={`text-xs ${isDark ? 'text-[#CFCFCF]' : 'text-slate-600'} flex items-center gap-1.5`}>
                  <span>Competitor cited:</span>
                  <a
                    href={compUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`font-extrabold ${isDark ? 'text-[#D4AF37] hover:text-[#F5D76E]' : 'text-amber-500 hover:text-amber-400'} hover:underline flex items-center gap-1`}
                    title={`Open ${gap.competitorDomain} in new tab`}
                  >
                    <span>{gap.competitorDomain}</span>
                    <ExternalLink className={`w-3 h-3 ${isDark ? 'text-[#D4AF37]' : 'text-amber-500'}`} />
                  </a>
                </p>
              </div>

              <button
                onClick={() => setSelectedGap(gap)}
                className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl ${
                  isDark ? 'luxury-btn-primary' : 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950'
                } font-extrabold text-xs shadow-md transition-all self-start md:self-center shrink-0`}
              >
                <FileText className="w-4 h-4" />
                <span>Generate GEO Brief</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Content Brief Modal */}
      {selectedGap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
          <div className={`border rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 relative shadow-2xl ${
            isDark ? 'bg-[#181818] border-[#2A2A2A] text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <button
              onClick={() => setSelectedGap(null)}
              className={`absolute top-4 right-4 p-2 rounded-xl border ${
                isDark ? 'bg-[#0A0A0A] border-[#2A2A2A] text-[#9E9E9E] hover:text-white' : 'bg-slate-100 text-slate-500 hover:text-slate-900'
              }`}
            >
              <X className="w-4 h-4" />
            </button>

            <div className={`flex items-center gap-2 ${isDark ? 'text-[#D4AF37]' : 'text-amber-500'} text-xs font-extrabold uppercase tracking-wider mb-2`}>
              <Sparkles className="w-4 h-4" /> AI Generated GEO Content Brief
            </div>
            <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'} mb-4`}>
              {selectedGap.suggestedContentBrief.title}
            </h2>

            <div className="space-y-4 text-sm">
              {/* Target Keywords */}
              <div className={`p-4 rounded-2xl border ${isDark ? 'bg-[#0A0A0A] border-[#2A2A2A]' : 'bg-slate-50 border-slate-200'}`}>
                <span className={`text-xs font-bold ${isDark ? 'text-[#9E9E9E]' : 'text-slate-500'} uppercase tracking-wider block mb-2`}>
                  Target Vector Keywords
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedGap.suggestedContentBrief.targetKeywords.map((kw, kIdx) => (
                    <span
                      key={kIdx}
                      className={`px-3 py-1 rounded-xl text-xs font-semibold border ${
                        isDark ? 'bg-[#202020] text-white border-[#2A2A2A]' : 'bg-white text-slate-800 border-slate-300 shadow-2xs'
                      }`}
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct Answer Summary */}
              <div className={`p-4 rounded-2xl border ${isDark ? 'bg-[#0A0A0A] border-[#2A2A2A]' : 'bg-slate-50 border-slate-200'}`}>
                <span className={`text-xs font-bold ${isDark ? 'text-[#D4AF37]' : 'text-cyan-600'} uppercase tracking-wider block mb-1`}>
                  Direct Answer Summary (For LLM Embedding)
                </span>
                <p className={`text-xs font-medium italic ${isDark ? 'text-[#CFCFCF]' : ''}`}>
                  &quot;{selectedGap.suggestedContentBrief.directAnswerSummary}&quot;
                </p>
              </div>

              {/* Headings Outline */}
              <div className={`p-4 rounded-2xl border ${isDark ? 'bg-[#0A0A0A] border-[#2A2A2A]' : 'bg-slate-50 border-slate-200'}`}>
                <span className={`text-xs font-bold ${isDark ? 'text-[#9E9E9E]' : 'text-slate-500'} uppercase tracking-wider block mb-2`}>
                  Suggested Article Structure (H2 Outline)
                </span>
                <ul className="space-y-1.5 text-xs font-medium">
                  {selectedGap.suggestedContentBrief.suggestedHeadings.map((h, hIdx) => (
                    <li key={hIdx} className="flex items-center gap-2">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${isDark ? 'text-[#D4AF37]' : 'text-emerald-500'} shrink-0`} />
                      <span className={isDark ? 'text-[#CFCFCF]' : ''}>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setSelectedGap(null)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold border ${
                  isDark ? 'bg-[#0A0A0A] border-[#2A2A2A] text-[#9E9E9E] hover:text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                Close
              </button>
              <button
                onClick={() => copyBriefToClipboard(selectedGap.suggestedContentBrief)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl ${
                  isDark ? 'luxury-btn-primary' : 'bg-cyan-600 text-white'
                } text-xs font-extrabold shadow-md transition-all`}
              >
                <Copy className="w-4 h-4" /> Copy Brief Content
              </button>
            </div>
          </div>
        </div>
      )}
    </ScrollReveal>
  );
}
