'use client';

import React, { useState, useMemo } from 'react';
import { PromptScanItem, TARGET_AI_MODELS } from '@/lib/aeo-engine/prompt-scanner';
import {
  Bot, CheckCircle2, XCircle, ChevronDown, ChevronUp, ExternalLink,
  Copy, Search, Filter, Flame, Sparkles, BarChart3, MessageSquare, ThumbsUp, ThumbsDown
} from 'lucide-react';
import { toast } from 'sonner';

interface HeatmapProps {
  promptScans?: PromptScanItem[];
  isDark?: boolean;
}

export function MultiModelHeatmap({ promptScans = [], isDark = true }: HeatmapProps) {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract unique categories for filter
  const categories = useMemo(() => {
    const set = new Set<string>();
    promptScans.forEach(p => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [promptScans]);

  // Compute per-model stats for header summary cards
  const modelStats = useMemo(() => {
    const totalPrompts = promptScans.length;
    if (totalPrompts === 0) return [];

    return TARGET_AI_MODELS.map(model => {
      let mentions = 0;
      let rank1Count = 0;

      promptScans.forEach(scan => {
        const res = scan.modelResults?.find(r => r.modelName === model.name);
        if (res?.brandMentioned) {
          mentions++;
          if (res.rankPosition === 1) rank1Count++;
        }
      });

      const visibilityRate = Math.round((mentions / totalPrompts) * 100);

      return {
        ...model,
        mentions,
        rank1Count,
        visibilityRate,
      };
    });
  }, [promptScans]);

  // Filtered prompt scans based on user selections
  const filteredScans = useMemo(() => {
    return promptScans.filter(scan => {
      // Category Filter
      if (selectedCategory !== 'all' && scan.category !== selectedCategory) {
        return false;
      }
      // Status Filter
      if (selectedStatus === 'mentioned' && scan.shareOfVoice === 0) {
        return false;
      }
      if (selectedStatus === 'unranked' && scan.shareOfVoice > 0) {
        return false;
      }
      // Text Search
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchesPrompt = scan.promptText.toLowerCase().includes(query);
        const matchesCategory = scan.category.toLowerCase().includes(query);
        if (!matchesPrompt && !matchesCategory) return false;
      }
      return true;
    });
  }, [promptScans, selectedCategory, selectedStatus, searchQuery]);

  const copyToClipboard = (e: React.MouseEvent, text: string, msg: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    toast.success(msg);
  };

  if (!promptScans || promptScans.length === 0) {
    return (
      <div className={`p-10 text-center rounded-3xl border ${
        isDark ? 'bg-slate-900/60 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500 shadow-sm'
      }`}>
        <Flame className="w-10 h-10 text-slate-400 mx-auto mb-3 opacity-60" />
        <h4 className="text-base font-extrabold text-slate-300">No Prompt Heatmap Data Available</h4>
        <p className="text-xs text-slate-500 mt-1">Run an audit on any target domain to evaluate multi-model AI search engine visibility.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* MODEL PERFORMANCE CARDS (Top Banner) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {modelStats.map(stat => (
          <div
            key={stat.name}
            className={`p-4 rounded-2xl border ${
              isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-md shadow-slate-200/50'
            } backdrop-blur-md transition-all hover:border-cyan-500/40`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-black ${isDark ? 'text-slate-200' : 'text-slate-900'} flex items-center gap-1.5`}>
                <Bot className="w-4 h-4 text-cyan-500" />
                {stat.label}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                stat.visibilityRate >= 50
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : stat.visibilityRate > 0
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}>
                {stat.visibilityRate}% Visibility
              </span>
            </div>

            <div className="mt-3 flex items-baseline justify-between text-xs">
              <span className={`font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Cited: <strong className={isDark ? 'text-white' : 'text-slate-950'}>{stat.mentions}/{promptScans.length}</strong> Prompts
              </span>
              <span className="text-[11px] font-bold text-emerald-400">
                #{stat.rank1Count} Top Ranks
              </span>
            </div>

            {/* Visual Bar */}
            <div className={`mt-2 w-full ${isDark ? 'bg-slate-800' : 'bg-slate-100'} h-1.5 rounded-full overflow-hidden`}>
              <div
                className={`h-full transition-all duration-700 ${
                  stat.visibilityRate >= 50 ? 'bg-emerald-500' : stat.visibilityRate > 0 ? 'bg-amber-500' : 'bg-slate-600'
                }`}
                style={{ width: `${stat.visibilityRate}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* HEATMAP STUDIO MAIN CONTAINER */}
      <div className={`p-6 rounded-3xl border ${
        isDark ? 'bg-slate-900/90 border-slate-800 shadow-2xl shadow-cyan-950/10' : 'bg-white border-slate-200/90 shadow-xl shadow-slate-900/5'
      } backdrop-blur-xl space-y-6`}>
        
        {/* Header & Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-200/80 dark:border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border ${
                isDark ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}>
                <Flame className="w-3.5 h-3.5 inline mr-1 text-amber-400 fill-amber-400" />
                Live Matrix Heatmap
              </span>
              <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'} font-semibold`}>
                {filteredScans.length} of {promptScans.length} Prompts Displayed
              </span>
            </div>
            <h3 className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-950'} flex items-center gap-2`}>
              AI Multi-Model Search Heatmap Matrix
            </h3>
          </div>

          {/* Interactive Filters Bar (Hidden in PDF print) */}
          <div className="flex flex-wrap items-center gap-2.5 no-print">
            {/* Search Input */}
            <div className="relative shrink-0">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Filter prompts..."
                className={`pl-8 pr-3 py-1.5 rounded-xl text-xs font-semibold border ${
                  isDark
                    ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500 focus:border-cyan-500'
                    : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-cyan-600'
                } focus:outline-none transition-all w-44`}
              />
            </div>

            {/* Category Dropdown Filter */}
            {categories.length > 0 && (
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                  isDark
                    ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-cyan-500'
                    : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-cyan-600'
                } focus:outline-none transition-all cursor-pointer`}
              >
                <option value="all">All Categories ({promptScans.length})</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            )}

            {/* Visibility Status Filter */}
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                isDark
                  ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-cyan-500'
                  : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-cyan-600'
              } focus:outline-none transition-all cursor-pointer`}
            >
              <option value="all">All Visibility Statuses</option>
              <option value="mentioned">Mentioned in AI (SoV &gt; 0%)</option>
              <option value="unranked">Not Mentioned (0% SoV)</option>
            </select>
          </div>
        </div>

        {/* HEATMAP LEGEND BAR */}
        <div className={`p-3 rounded-2xl border ${
          isDark ? 'bg-slate-950/60 border-slate-800/80 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
        } flex flex-wrap items-center justify-between gap-4 text-xs font-semibold`}>
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[11px]">Heatmap Color Legend:</span>
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-md bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400 text-[10px] font-black">
                #1
              </span>
              <span>Mentioned (#1 Top Recommendation)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-md bg-amber-500/20 border border-amber-500 flex items-center justify-center text-amber-400 text-[10px] font-black">
                #2+
              </span>
              <span>Cited (#2+ Rank Option)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-500 text-[10px]">
                —
              </span>
              <span>Not Mentioned (0% Visibility)</span>
            </span>
          </div>
        </div>

        {/* HEATMAP GRID TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`border-b ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'} text-xs font-extrabold uppercase tracking-wider`}>
                <th className="pb-3.5 px-4 min-w-[260px] w-1/3 whitespace-nowrap">Target Search Query / Prompt</th>
                <th className="pb-3.5 px-4 min-w-[150px]">Category</th>
                {TARGET_AI_MODELS.map(m => (
                  <th key={m.name} className="pb-3.5 px-3 text-center min-w-[120px]">
                    <div className="flex flex-col items-center gap-0.5">
                      <span>{m.label.split(' ')[0]}</span>
                      <span className="text-[10px] text-slate-500 normal-case font-medium">
                        {m.label.replace(/^ChatGPT|^Google|^Claude|^DeepSeek/, '').trim()}
                      </span>
                    </div>
                  </th>
                ))}
                <th className="pb-3.5 px-4 text-right">Share of Voice</th>
              </tr>
            </thead>

            <tbody className={`divide-y ${isDark ? 'divide-slate-800/60 text-slate-200' : 'divide-slate-200 text-slate-800'} text-xs sm:text-sm`}>
              {filteredScans.length === 0 ? (
                <tr>
                  <td colSpan={TARGET_AI_MODELS.length + 3} className="py-8 text-center text-slate-500 font-medium">
                    No prompts match your selected filters. Try clearing the search or category selection.
                  </td>
                </tr>
              ) : (
                filteredScans.map((scan, idx) => {
                  const isExpanded = expandedRow === idx;
                  const sov = scan.shareOfVoice;

                  return (
                    <React.Fragment key={idx}>
                      <tr
                        onClick={() => setExpandedRow(isExpanded ? null : idx)}
                        className={`transition-colors cursor-pointer font-medium ${
                          isExpanded
                            ? isDark ? 'bg-slate-800/60' : 'bg-sky-50'
                            : isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'
                        }`}
                      >
                        {/* Target Query */}
                        <td className="py-4 px-4">
                          <div className="flex items-start justify-between gap-2 group">
                            <span className="font-semibold text-xs sm:text-sm leading-relaxed">
                              {scan.promptText}
                            </span>
                            <button
                              onClick={e => copyToClipboard(e, scan.promptText, 'Prompt copied to clipboard!')}
                              className={`p-1.5 rounded-lg border transition-all shrink-0 opacity-0 group-hover:opacity-100 ${
                                isDark
                                  ? 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700'
                                  : 'bg-slate-100 border-slate-300 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                              }`}
                              title="Copy Full Prompt"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>

                        {/* Category Pill */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold border ${
                            isDark
                              ? 'bg-slate-950 text-slate-300 border-slate-800'
                              : 'bg-slate-100 text-slate-800 border-slate-300 shadow-2xs'
                          }`}>
                            {scan.category}
                          </span>
                        </td>

                        {/* AI Models Evaluation Cell (Heatmap Colored Cells) */}
                        {TARGET_AI_MODELS.map(model => {
                          const res = scan.modelResults?.find(r => r.modelName === model.name);
                          const isMentioned = res?.brandMentioned;
                          const isRank1 = res?.rankPosition === 1;

                          return (
                            <td key={model.name} className="py-4 px-3 text-center">
                              {isMentioned ? (
                                <span
                                  className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-transform transform hover:scale-105 ${
                                    isRank1
                                      ? isDark
                                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm shadow-emerald-500/10'
                                        : 'bg-emerald-100 text-emerald-950 border border-emerald-300 font-extrabold shadow-2xs'
                                      : isDark
                                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-sm shadow-amber-500/10'
                                      : 'bg-amber-100 text-amber-950 border border-amber-300 font-extrabold shadow-2xs'
                                  }`}
                                  title={res?.responseText?.substring(0, 150)}
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                                  <span>{isRank1 ? '#1 Rank' : '#2+ Cited'}</span>
                                </span>
                              ) : (
                                <span className={`inline-flex items-center justify-center px-3 py-1 rounded-xl text-xs font-bold ${
                                  isDark
                                    ? 'bg-slate-950/60 text-slate-500 border border-slate-800/80'
                                    : 'bg-slate-100 text-slate-600 border border-slate-300 font-bold'
                                }`}>
                                  —
                                </span>
                              )}
                            </td>
                          );
                        })}

                        {/* Share of Voice Column */}
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <span className={`px-2.5 py-1 rounded-xl text-xs font-black border ${
                              sov >= 75
                                ? isDark ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' : 'bg-emerald-100 text-emerald-950 border-emerald-300 font-black'
                                : sov >= 25
                                ? isDark ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40' : 'bg-sky-100 text-cyan-950 border-sky-300 font-black'
                                : isDark ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-300 font-extrabold'
                            }`}>
                              {sov}% SoV
                            </span>
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-cyan-400" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-slate-500" />
                            )}
                          </div>
                        </td>
                      </tr>

                      {/* EXPANDED ACCORDION: RAW AI RESPONSES & CITATIONS INSPECTOR */}
                      {isExpanded && (
                        <tr className={isDark ? 'bg-slate-950/80' : 'bg-slate-50/90'}>
                          <td colSpan={TARGET_AI_MODELS.length + 3} className="p-6 border-b border-slate-200 dark:border-slate-800 space-y-4">
                            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                              <h4 className="text-xs font-extrabold uppercase tracking-wider text-cyan-500 flex items-center gap-1.5">
                                <MessageSquare className="w-4 h-4" /> Live AI Engine Outputs for: "{scan.promptText}"
                              </h4>
                              <span className="text-xs text-slate-400 font-semibold">
                                Click any response box to view citations & sentiment
                              </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {scan.modelResults?.map(mRes => (
                                <div
                                  key={mRes.modelName}
                                  className={`p-4 rounded-2xl border space-y-3 ${
                                    mRes.brandMentioned
                                      ? isDark
                                        ? 'bg-slate-900 border-emerald-500/30'
                                        : 'bg-white border-emerald-300 shadow-md'
                                      : isDark
                                      ? 'bg-slate-900/60 border-slate-800'
                                      : 'bg-white border-slate-200'
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <span className={`font-black text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                        {mRes.modelLabel}
                                      </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${
                                        mRes.brandMentioned
                                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                          : 'bg-slate-800 text-slate-500 border-slate-700'
                                      }`}>
                                        {mRes.brandMentioned ? `Rank #${mRes.rankPosition}` : 'Not Mentioned'}
                                      </span>

                                      {mRes.brandMentioned && (
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                                          mRes.sentiment === 'positive'
                                            ? 'bg-emerald-500/10 text-emerald-400'
                                            : 'bg-slate-800 text-slate-300'
                                        }`}>
                                          <ThumbsUp className="w-2.5 h-2.5 text-emerald-400" />
                                          {mRes.sentiment}
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  {/* AI Output Response Text */}
                                  <div className={`p-3.5 rounded-xl border text-xs leading-relaxed font-mono ${
                                    isDark ? 'bg-slate-950/70 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-800'
                                  }`}>
                                    "{mRes.responseText}"
                                  </div>

                                  {/* Citations / Links */}
                                  {mRes.citations && mRes.citations.length > 0 && (
                                    <div className="space-y-1">
                                      <span className="text-[11px] font-bold text-slate-400 block">Extracted Citations:</span>
                                      <div className="flex flex-wrap gap-1.5">
                                        {mRes.citations.map((cite, cIdx) => (
                                          <a
                                            key={cIdx}
                                            href={cite}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-2 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:text-cyan-300 text-[11px] font-semibold flex items-center gap-1 transition-colors"
                                          >
                                            <span>{cite.replace(/^https?:\/\//, '').split('/')[0]}</span>
                                            <ExternalLink className="w-2.5 h-2.5" />
                                          </a>
                                        ))}
                                      </div>
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
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
