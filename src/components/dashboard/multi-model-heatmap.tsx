'use client';

import React, { useState } from 'react';
import { PromptScanItem, TARGET_AI_MODELS } from '@/lib/aeo-engine/prompt-scanner';
import { CheckCircle2, XCircle, ChevronDown, ChevronUp, Bot, ExternalLink } from 'lucide-react';

interface HeatmapProps {
  promptScans?: PromptScanItem[];
  isDark?: boolean;
}

export function MultiModelHeatmap({ promptScans = [], isDark = true }: HeatmapProps) {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  if (!promptScans || promptScans.length === 0) {
    return (
      <div className={`p-8 text-center rounded-2xl border ${isDark ? 'bg-slate-900/60 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500 shadow-sm'}`}>
        No prompt scan data available. Run an audit to start multi-model tracking.
      </div>
    );
  }

  return (
    <div className={`p-6 rounded-2xl border ${
      isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200/90 shadow-xl shadow-slate-900/5'
    } backdrop-blur-md`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <h3 className={`text-lg font-extrabold ${isDark ? 'text-white' : 'text-slate-900'} flex items-center gap-2`}>
              <Bot className="w-5 h-5 text-cyan-600" /> Multi-Model AI Search Engine Matrix
            </h3>
            <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-extrabold border ${
              isDark ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' : 'bg-sky-100 text-sky-800 border-sky-200'
            }`}>
              {promptScans.length} Prompts × {TARGET_AI_MODELS.length} AI Models = {promptScans.length * TARGET_AI_MODELS.length} Engine Evaluations
            </span>
          </div>
          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'} font-medium`}>
            Real-time brand citations across major Large Language Models (LLMs)
          </p>
        </div>
        <div className={`flex items-center gap-4 text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500 inline-block" /> Mentioned (#1 Rank)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500 inline-block" /> Cited (#2+ Rank)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-slate-200 border border-slate-400 inline-block" /> Not Mentioned
          </span>
        </div>
      </div>

      {/* Table Grid */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className={`border-b ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'} text-xs font-bold uppercase tracking-wider`}>
              <th className="pb-3 px-4">Target Query / Prompt</th>
              <th className="pb-3 px-4">Category</th>
              {TARGET_AI_MODELS.map((m) => (
                <th key={m.name} className="pb-3 px-3 text-center min-w-[100px]">
                  {m.label.split(' ')[0]}
                </th>
              ))}
              <th className="pb-3 px-4 text-right">SoV</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${isDark ? 'divide-slate-800/60 text-slate-200' : 'divide-slate-200 text-slate-800'} text-sm`}>
            {promptScans.map((scan, idx) => {
              const isExpanded = expandedRow === idx;
              return (
                <React.Fragment key={idx}>
                  <tr
                    onClick={() => setExpandedRow(isExpanded ? null : idx)}
                    className={`${isDark ? 'hover:bg-slate-800/40' : 'hover:bg-sky-50/50'} cursor-pointer transition-colors font-medium`}
                  >
                    <td className="py-4 px-4 font-semibold max-w-xs truncate">
                      {scan.promptText}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-300 shadow-2xs'
                      } border`}>
                        {scan.category}
                      </span>
                    </td>
                    {TARGET_AI_MODELS.map((model) => {
                      const res = scan.modelResults.find((r) => r.modelName === model.name);
                      const isMentioned = res?.brandMentioned;
                      const isRank1 = res?.rankPosition === 1;

                      return (
                        <td key={model.name} className="py-4 px-3 text-center">
                          {isMentioned ? (
                            <span
                              className={`inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold ${
                                isRank1
                                  ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/30'
                                  : 'bg-amber-500/10 text-amber-600 border border-amber-500/30'
                              }`}
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              {isRank1 ? '#1' : '#2+'}
                            </span>
                          ) : (
                            <span className={`inline-flex items-center justify-center px-2 py-1 rounded-lg text-xs font-medium ${
                              isDark ? 'text-slate-600 bg-slate-800/40' : 'text-slate-400 bg-slate-100'
                            }`}>
                              <XCircle className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </td>
                      );
                    })}
                    <td className="py-4 px-4 text-right font-black text-cyan-600">
                      <div className="flex items-center justify-end gap-2">
                        <span>{scan.shareOfVoice}%</span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </td>
                  </tr>

                  {/* Expanded Model Details Accordion */}
                  {isExpanded && (
                    <tr className={isDark ? 'bg-slate-950/60' : 'bg-slate-50/80'}>
                      <td colSpan={TARGET_AI_MODELS.length + 3} className="p-4 border-b border-slate-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                          {scan.modelResults.map((mRes) => (
                            <div
                              key={mRes.modelName}
                              className={`p-4 rounded-xl border ${
                                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>{mRes.modelLabel}</span>
                                <span
                                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                    mRes.brandMentioned
                                      ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                                      : 'bg-slate-200 text-slate-600'
                                  }`}
                                >
                                  {mRes.brandMentioned ? `Mentioned (${mRes.sentiment})` : 'Not Cited'}
                                </span>
                              </div>
                              <p className={`p-3 rounded-lg border italic ${
                                isDark ? 'bg-slate-950/50 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                              }`}>
                                "{mRes.responseText}"
                              </p>
                              {mRes.citations.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-1">
                                  <span className="text-slate-500 font-semibold">Citations:</span>
                                  {mRes.citations.map((c, cIdx) => (
                                    <a
                                      key={cIdx}
                                      href={c}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-cyan-600 hover:underline flex items-center gap-1 font-medium"
                                    >
                                      {c.replace(/https?:\/\//, '')} <ExternalLink className="w-2.5 h-2.5" />
                                    </a>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
