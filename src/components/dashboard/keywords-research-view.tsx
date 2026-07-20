'use client';

import { useState } from 'react';
import { Search, Sparkles, Key, TrendingUp, HelpCircle, Check, Copy, ArrowRight, Zap, Target } from 'lucide-react';
import { toast } from 'sonner';

interface KeywordItem {
  keyword: string;
  intent: 'Commercial' | 'Informational' | 'Transactional' | 'Comparison';
  searchVolume: string;
  geoOpportunityScore: number;
  citationLikelihood: 'High' | 'Medium' | 'Critical';
  aiPromptExample: string;
}

interface KeywordsResearchViewProps {
  domain: string;
  extractedKeywords: string[];
  isDark: boolean;
}

export function KeywordsResearchView({ domain, extractedKeywords, isDark }: KeywordsResearchViewProps) {
  const [seedKeyword, setSeedKeyword] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [researchedKeywords, setResearchedKeywords] = useState<KeywordItem[]>([]);

  // Default base keywords built from domain & extracted entities
  const baseKeywords: KeywordItem[] = (extractedKeywords.length > 0 ? extractedKeywords : [
    'AEO & GEO Optimization',
    'AI Search Engine Visibility',
    'JSON-LD Schema Markup',
    'LLM Citation Analytics',
    'ChatGPT Brand Rankings',
  ]).map((kw, idx) => ({
    keyword: kw,
    intent: idx % 2 === 0 ? 'Commercial' : 'Informational',
    searchVolume: `${(idx + 1) * 2}k - ${(idx + 2) * 5}k / mo`,
    geoOpportunityScore: 92 - idx * 4,
    citationLikelihood: idx === 0 ? 'High' : idx === 1 ? 'Critical' : 'Medium',
    aiPromptExample: `What are the top platforms for ${kw} in 2026?`,
  }));

  const activeKeywordList = [...researchedKeywords, ...baseKeywords];

  const handleRunKeywordResearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!seedKeyword) return;

    setIsSearching(true);
    setTimeout(() => {
      const generated: KeywordItem[] = [
        {
          keyword: `${seedKeyword} AEO strategy`,
          intent: 'Commercial',
          searchVolume: '4.5k / mo',
          geoOpportunityScore: 96,
          citationLikelihood: 'Critical',
          aiPromptExample: `How to implement ${seedKeyword} AEO strategy for higher AI search rankings?`,
        },
        {
          keyword: `Best tools for ${seedKeyword}`,
          intent: 'Comparison',
          searchVolume: '8.2k / mo',
          geoOpportunityScore: 91,
          citationLikelihood: 'High',
          aiPromptExample: `Compare top 5 tools for ${seedKeyword} in terms of pricing and features`,
        },
        {
          keyword: `${seedKeyword} schema generator`,
          intent: 'Transactional',
          searchVolume: '3.1k / mo',
          geoOpportunityScore: 88,
          citationLikelihood: 'High',
          aiPromptExample: `Which platform generates validated JSON-LD schema for ${seedKeyword}?`,
        },
        {
          keyword: `Why is ${seedKeyword} important for LLMs`,
          intent: 'Informational',
          searchVolume: '12.4k / mo',
          geoOpportunityScore: 84,
          citationLikelihood: 'Medium',
          aiPromptExample: `Explain why ${seedKeyword} directly influences ChatGPT and Gemini citations`,
        },
      ];

      setResearchedKeywords((prev) => [...generated, ...prev]);
      setIsSearching(false);
      toast.success(`Discovered 4 high-value AEO keywords for "${seedKeyword}"!`);
      setSeedKeyword('');
    }, 800);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Prompt copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      {/* Header & Keyword Research Bar */}
      <div className={`p-6 sm:p-8 rounded-3xl border ${
        isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${
              isDark ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-sky-100 text-sky-800 border-sky-200'
            } border mb-2`}>
              <Key className="w-3.5 h-3.5" /> AEO Keyword Research Engine
            </div>
            <h2 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Keywords & AI Prompt Intelligence for {domain}
            </h2>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'} mt-1`}>
              Discover high-intent keywords that trigger direct AI search citations across ChatGPT, Gemini, Claude, and Perplexity.
            </p>
          </div>

          {/* Interactive Seed Keyword Input Form */}
          <form onSubmit={handleRunKeywordResearch} className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Search className={`absolute left-3.5 top-3.5 h-4 w-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
              <input
                type="text"
                value={seedKeyword}
                onChange={(e) => setSeedKeyword(e.target.value)}
                placeholder="Enter seed topic (e.g. AI SEO, Schema)"
                className={`w-full ${
                  isDark
                    ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500'
                    : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                } border rounded-2xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-cyan-500`}
              />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="px-4 py-2.5 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-extrabold flex items-center gap-1.5 shrink-0 shadow-md shadow-cyan-600/20 disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isSearching ? 'Researching...' : 'Research Keyword'}</span>
            </button>
          </form>
        </div>
      </div>

      {/* Keywords Table Card */}
      <div className={`rounded-3xl border overflow-hidden ${
        isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'
      }`}>
        <div className="p-5 border-b border-slate-200/80 flex items-center justify-between">
          <h3 className={`text-base font-extrabold ${isDark ? 'text-white' : 'text-slate-900'} flex items-center gap-2`}>
            <Target className="w-4 h-4 text-cyan-600" /> Target Keywords & Prompt Trigger Frequency
          </h3>
          <span className={`text-xs px-3 py-1 rounded-full font-bold ${
            isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
          }`}>
            {activeKeywordList.length} Keywords Analyzed
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className={`${
              isDark ? 'bg-slate-950/60 text-slate-400 border-b border-slate-800' : 'bg-slate-50 text-slate-600 border-b border-slate-200'
            } font-bold uppercase tracking-wider`}>
              <tr>
                <th className="p-4">Target Keyword</th>
                <th className="p-4">Search Intent</th>
                <th className="p-4">Est. Volume</th>
                <th className="p-4">GEO Opportunity Score</th>
                <th className="p-4">AI Citation Likelihood</th>
                <th className="p-4">AI Prompt Example</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800' : 'divide-slate-200'}`}>
              {activeKeywordList.map((item, idx) => (
                <tr key={idx} className={`${
                  isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'
                } transition-colors`}>
                  <td className="p-4 font-bold text-cyan-600 flex items-center gap-2">
                    <Key className="w-3.5 h-3.5 shrink-0" />
                    <span>{item.keyword}</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                      item.intent === 'Commercial'
                        ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                        : item.intent === 'Comparison'
                        ? 'bg-purple-500/10 text-purple-600 border border-purple-500/20'
                        : item.intent === 'Transactional'
                        ? 'bg-blue-500/10 text-blue-600 border border-blue-500/20'
                        : 'bg-amber-500/10 text-amber-600 border border-amber-500/20'
                    }`}>
                      {item.intent}
                    </span>
                  </td>
                  <td className={`p-4 font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {item.searchVolume}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-16 h-2 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                          style={{ width: `${item.geoOpportunityScore}%` }}
                        />
                      </div>
                      <span className={`font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {item.geoOpportunityScore}%
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                      item.citationLikelihood === 'Critical'
                        ? 'bg-red-500/10 text-red-600 border border-red-500/20'
                        : item.citationLikelihood === 'High'
                        ? 'bg-cyan-500/10 text-cyan-600 border border-cyan-500/20'
                        : 'bg-slate-500/10 text-slate-600 border border-slate-500/20'
                    }`}>
                      {item.citationLikelihood}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className={`p-2 rounded-xl border ${
                      isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-800'
                    } flex items-center justify-between gap-2 max-w-xs`}>
                      <span className="truncate italic text-[11px]">{item.aiPromptExample}</span>
                      <button
                        onClick={() => copyToClipboard(item.aiPromptExample)}
                        className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 shrink-0"
                        title="Copy Prompt"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
