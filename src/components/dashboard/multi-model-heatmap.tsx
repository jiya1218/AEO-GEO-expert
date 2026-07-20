'use client';

import React, { useState } from 'react';
import { PromptScanItem, TARGET_AI_MODELS } from '@/lib/aeo-engine/prompt-scanner';
import { CheckCircle2, XCircle, ChevronDown, ChevronUp, Bot, ExternalLink } from 'lucide-react';

interface HeatmapProps {
  promptScans: PromptScanItem[];
}

export function MultiModelHeatmap({ promptScans = [] }: HeatmapProps) {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  if (!promptScans || promptScans.length === 0) {
    return (
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 text-center text-slate-400">
        No prompt scan data available. Run an audit to start multi-model tracking.
      </div>
    );
  }

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-md shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Bot className="w-5 h-5 text-cyan-400" /> Multi-Model AI Search Engine Matrix
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Real-time brand citations across major Large Language Models (LLMs)
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50 inline-block" /> Mentioned (#1 Rank)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50 inline-block" /> Cited (#2+ Rank)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-slate-800 border border-slate-700 inline-block" /> Unranked
          </span>
        </div>
      </div>

      {/* Table Grid */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
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
          <tbody className="divide-y divide-slate-800/60 text-sm">
            {promptScans.map((scan, idx) => {
              const isExpanded = expandedRow === idx;
              return (
                <React.Fragment key={idx}>
                  <tr
                    onClick={() => setExpandedRow(isExpanded ? null : idx)}
                    className="hover:bg-slate-800/40 cursor-pointer transition-colors"
                  >
                    <td className="py-4 px-4 font-medium text-slate-200 max-w-xs truncate">
                      {scan.promptText}
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
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
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                              }`}
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              {isRank1 ? '#1' : '#2+'}
                            </span>
                          ) : (
                            <span className="inline-flex items-center justify-center px-2 py-1 rounded-lg text-xs font-medium text-slate-600 bg-slate-800/40">
                              <XCircle className="w-3.5 h-3.5 text-slate-600" />
                            </span>
                          )}
                        </td>
                      );
                    })}
                    <td className="py-4 px-4 text-right font-bold text-cyan-400">
                      <div className="flex items-center justify-end gap-2">
                        <span>{scan.shareOfVoice}%</span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-slate-500" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-500" />
                        )}
                      </div>
                    </td>
                  </tr>

                  {/* Expanded Model Details Accordion */}
                  {isExpanded && (
                    <tr className="bg-slate-950/60">
                      <td colSpan={TARGET_AI_MODELS.length + 3} className="p-4 border-b border-slate-800">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                          {scan.modelResults.map((mRes) => (
                            <div
                              key={mRes.modelName}
                              className="bg-slate-900 border border-slate-800 rounded-xl p-4"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-bold text-slate-200">{mRes.modelLabel}</span>
                                <span
                                  className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                                    mRes.brandMentioned
                                      ? 'bg-emerald-500/20 text-emerald-400'
                                      : 'bg-slate-800 text-slate-400'
                                  }`}
                                >
                                  {mRes.brandMentioned ? `Mentioned (${mRes.sentiment})` : 'Not Cited'}
                                </span>
                              </div>
                              <p className="text-slate-300 leading-relaxed italic bg-slate-950/50 p-3 rounded-lg border border-slate-800/50">
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
                                      className="text-cyan-400 hover:underline flex items-center gap-1"
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
