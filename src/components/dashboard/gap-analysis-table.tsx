'use client';

import { useState } from 'react';
import { GapItem } from '@/lib/aeo-engine/gap-detector';
import { Target, Sparkles, FileText, CheckCircle2, Copy, X } from 'lucide-react';
import { toast } from 'sonner';

interface GapProps {
  gaps?: GapItem[];
}

export function GapAnalysisTable({ gaps = [] }: GapProps) {
  const [selectedGap, setSelectedGap] = useState<GapItem | null>(null);

  if (!gaps || gaps.length === 0) {
    return (
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 text-center text-slate-400">
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
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-md shadow-xl relative">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-400" /> Gap Detection & GEO Content Briefs
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Queries where competitors are cited in AI answers but your brand is missing
          </p>
        </div>
        <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-full text-xs font-semibold">
          {gaps.length} Content Opportunities
        </span>
      </div>

      <div className="space-y-4">
        {gaps.map((gap) => (
          <div
            key={gap.id}
            className="p-5 bg-slate-950/70 border border-slate-800/80 rounded-xl hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Opportunity Score: {gap.opportunityScore}/100
                </span>
                <span className="text-xs text-slate-400">Category: {gap.category}</span>
              </div>
              <h4 className="text-sm font-semibold text-slate-200">
                "{gap.missingPrompt}"
              </h4>
              <p className="text-xs text-slate-400">
                Competitor cited: <span className="text-slate-300 font-medium">{gap.competitorDomain}</span>
              </p>
            </div>

            <button
              onClick={() => setSelectedGap(gap)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/10 transition-all self-start md:self-center"
            >
              <FileText className="w-4 h-4" />
              <span>Generate GEO Brief</span>
            </button>
          </div>
        ))}
      </div>

      {/* Content Brief Modal */}
      {selectedGap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 relative shadow-2xl">
            <button
              onClick={() => setSelectedGap(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" /> AI Generated GEO Content Brief
            </div>
            <h2 className="text-xl font-bold text-white mb-4">
              {selectedGap.suggestedContentBrief.title}
            </h2>

            <div className="space-y-4 text-sm text-slate-300">
              {/* Target Keywords */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                  Target Vector Keywords
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedGap.suggestedContentBrief.targetKeywords.map((kw, kIdx) => (
                    <span
                      key={kIdx}
                      className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-200 text-xs border border-slate-700"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct Answer Summary */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block mb-1">
                  Direct Answer Summary (For LLM Embedding)
                </span>
                <p className="text-xs text-slate-300 italic">
                  "{selectedGap.suggestedContentBrief.directAnswerSummary}"
                </p>
              </div>

              {/* Headings Outline */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                  Suggested Article Structure (H2 Outline)
                </span>
                <ul className="space-y-1 text-xs">
                  {selectedGap.suggestedContentBrief.suggestedHeadings.map((h, hIdx) => (
                    <li key={hIdx} className="flex items-center gap-2 text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended FAQs */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                  Recommended FAQ JSON-LD Q&A Pair
                </span>
                <div className="space-y-3 text-xs">
                  {selectedGap.suggestedContentBrief.recommendedFaqs.map((faq, fIdx) => (
                    <div key={fIdx} className="border-l-2 border-amber-500 pl-3">
                      <p className="font-semibold text-white">Q: {faq.question}</p>
                      <p className="text-slate-400 mt-0.5">A: {faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setSelectedGap(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Close
              </button>
              <button
                onClick={() => copyBriefToClipboard(selectedGap.suggestedContentBrief)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all"
              >
                <Copy className="w-4 h-4" /> Copy Brief Content
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
