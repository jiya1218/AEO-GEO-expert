'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { AeoScoreCard } from '@/components/dashboard/aeo-score-card';
import { MultiModelHeatmap } from '@/components/dashboard/multi-model-heatmap';
import { CitationList } from '@/components/dashboard/citation-list';
import { GapAnalysisTable } from '@/components/dashboard/gap-analysis-table';
import { SiteCrawlerView } from '@/components/dashboard/site-crawler-view';
import { KeywordsResearchView } from '@/components/dashboard/keywords-research-view';
import { AnalysisAnimation } from '@/components/dashboard/analysis-animation';
import { ReportDownloadButton } from '@/components/dashboard/report-download-button';
import {
  Brain, RefreshCw, LogOut, Globe, Sparkles, CheckCircle2,
  Search, Loader2, Sun, Moon, Layers, Target, Link2, Bot,
  TrendingUp, Building2, Cpu, Tag, Key, Zap
} from 'lucide-react';
import { toast } from 'sonner';

type ActiveTab = 'overview' | 'crawler' | 'heatmap' | 'keywords' | 'citations' | 'gaps';

export default function DashboardPage() {
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Analysis Inputs (Website URL + Optional Brand Name + Custom Prompt Count)
  const [targetDomainInput, setTargetDomainInput] = useState('');
  const [targetBrandInput, setTargetBrandInput] = useState('');
  const [selectedPromptCount, setSelectedPromptCount] = useState<number>(5);
  
  const [analyzedProjects, setAnalyzedProjects] = useState<any[]>([]);
  const [activeAuditData, setActiveAuditData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUserEmail(data.user.email || 'User');
      }
    });
  }, []);

  const handleRunAnalysis = async (e?: React.FormEvent, isQuickScan: boolean = false) => {
    if (e) e.preventDefault();
    if (!targetDomainInput) {
      toast.error('Please enter a website domain (e.g. stripe.com)');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain: targetDomainInput,
          brandName: targetBrandInput,
          promptCount: selectedPromptCount,
          isQuickScan,
        }),
      });

      if (!res.ok) throw new Error('Failed to run AEO/GEO analysis');

      const data = await res.json();
      if (isQuickScan) {
        toast.success(`Quick Site Audit completed for ${data.domain}!`);
        setActiveTab('crawler');
      } else {
        toast.success(`AI Audit completed with ${data.metrics?.totalPromptsScanned || selectedPromptCount} prompts for ${data.domain}!`);
      }

      setActiveAuditData(data);
      setAnalyzedProjects((prev) => {
        const filtered = prev.filter(p => p.domain !== data.domain);
        return [data, ...filtered];
      });

      // Reset domain/brand inputs
      setTargetDomainInput('');
      setTargetBrandInput('');
    } catch (err: any) {
      toast.error(err.message || 'Failed to complete analysis');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Signed out successfully');
    window.location.href = '/login';
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-[#f8fafc] text-slate-900'} flex flex-col font-sans transition-colors duration-500 relative overflow-hidden`}>

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full blur-[160px] animate-blob ${isDark ? 'bg-cyan-600/10' : 'bg-cyan-400/15'}`} />
        <div className={`absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[140px] animate-blob animation-delay-2000 ${isDark ? 'bg-indigo-600/8' : 'bg-indigo-400/12'}`} />
        <div className={`absolute top-[50%] left-[40%] w-[400px] h-[400px] rounded-full blur-[130px] animate-blob animation-delay-4000 ${isDark ? 'bg-purple-600/6' : 'bg-purple-400/8'}`} />
      </div>

      {/* Full-Screen Analysis Animation Overlay */}
      {loading && (
        <AnalysisAnimation domain={targetDomainInput || 'website'} isDark={isDark} />
      )}

      {/* Top Header Navbar */}
      <header className={`border-b ${isDark ? 'border-slate-800/80 bg-slate-900/80' : 'border-slate-200/90 bg-white/90 shadow-xs'} backdrop-blur-xl sticky top-0 z-40`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-sky-600 to-indigo-600 flex items-center justify-center shadow-md shadow-cyan-600/20 animate-glow-pulse">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className={`font-extrabold text-base ${isDark ? 'bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent' : 'text-slate-900'}`}>
                AEO / GEO Expert Platform
              </span>
              <span className={`block text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'} font-semibold uppercase tracking-wider`}>
                Multi-Model AI Visibility Analytics
              </span>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={() => setIsDark(!isDark)}
              className={`px-3 py-2 rounded-xl border ${
                isDark
                  ? 'bg-slate-900 border-slate-700/80 text-amber-400 hover:bg-slate-800'
                  : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200 shadow-2xs'
              } transition-all text-xs font-extrabold flex items-center gap-2`}
              title="Toggle Light / Dark Mode"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
              <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
            </button>

            {userEmail && (
              <span className={`hidden md:inline-block text-xs font-semibold ${isDark ? 'text-slate-400 border-slate-800' : 'text-slate-600 border-slate-200'} border-l pl-3`}>
                {userEmail}
              </span>
            )}

            <button
              onClick={handleLogout}
              className={`p-2 rounded-xl border ${
                isDark
                  ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:text-slate-900'
              } transition-colors`}
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 relative z-10">
        
        {/* Prominent Website Search & Audit Bar */}
        <div className={`p-6 sm:p-8 rounded-3xl border animate-fade-in-up ${
          isDark
            ? 'bg-slate-900/80 border-slate-800/80 shadow-2xl shadow-cyan-950/20'
            : 'bg-white/90 border-slate-200/90 shadow-xl shadow-slate-200/60'
        } backdrop-blur-xl relative overflow-hidden space-y-6`}>
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full ${
                  isDark
                    ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                    : 'bg-sky-100 text-sky-800 border-sky-200'
                } border text-xs font-extrabold`}>
                  <Cpu className="w-3.5 h-3.5" /> AI Automated AEO/GEO Auditor
                </div>

                {/* Model Disclosure Badge */}
                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${
                  isDark ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20' : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                } border text-xs font-bold`}>
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Model: <strong>Gemini 3.5 Flash</strong> (Google DeepMind)</span>
                </div>
              </div>

              <h1 className={`text-2xl sm:text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'} tracking-tight`}>
                Analyze Any Website's AI Search Visibility
              </h1>
              <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'} mt-1 font-medium`}>
                Select the number of prompts to run per model. Scans Top 4 AI engines (ChatGPT 4o, Gemini 1.5 Pro, Claude 3.5 Sonnet, and DeepSeek V3).
              </p>
            </div>

            {/* Prompt Count Selector */}
            <div className={`p-4 rounded-2xl border ${
              isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
            } shrink-0 space-y-2`}>
              <div className="flex items-center justify-between text-xs font-bold gap-4">
                <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>Prompts Per Model:</span>
                <span className="text-cyan-600 font-extrabold">{selectedPromptCount} Prompts</span>
              </div>
              <div className="flex items-center gap-1.5">
                {[3, 5, 10, 15, 20].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setSelectedPromptCount(count)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                      selectedPromptCount === count
                        ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30 scale-105'
                        : isDark
                        ? 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                        : 'bg-white border border-slate-300 text-slate-700 hover:text-slate-900'
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Clean Single URL Search Bar Form */}
          <form onSubmit={(e) => handleRunAnalysis(e, false)} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Globe className={`absolute left-4 top-3.5 h-5 w-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                <input
                  type="text"
                  value={targetDomainInput}
                  onChange={(e) => setTargetDomainInput(e.target.value)}
                  placeholder="Enter website domain (e.g. stripe.com, scalezix.com, linear.app)"
                  className={`w-full ${
                    isDark
                      ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500 focus:border-cyan-500'
                      : 'bg-slate-50 border-slate-300 text-slate-900 font-semibold placeholder-slate-400 focus:border-cyan-600 focus:bg-white focus:ring-4 focus:ring-cyan-500/10'
                  } border rounded-2xl pl-12 pr-4 py-3 text-sm focus:outline-none transition-all shadow-xs`}
                  required
                />
              </div>

              <div className="relative sm:w-56">
                <Building2 className={`absolute left-3.5 top-3.5 h-4 w-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                <input
                  type="text"
                  value={targetBrandInput}
                  onChange={(e) => setTargetBrandInput(e.target.value)}
                  placeholder="Brand Name (Optional)"
                  className={`w-full ${
                    isDark
                      ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500'
                      : 'bg-slate-50 border-slate-300 text-slate-900 font-medium placeholder-slate-400 focus:bg-white'
                  } border rounded-2xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-cyan-600 shadow-xs`}
                />
              </div>

              {/* Quick Scan Button */}
              <button
                type="button"
                onClick={(e) => handleRunAnalysis(e, true)}
                disabled={loading}
                className={`px-4 py-3 rounded-2xl border ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800'
                    : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                } font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 shrink-0 disabled:opacity-50`}
                title="Quick Site Audit extracts HTML, JSON-LD Schema, meta tags, and structural website details in under 2 seconds"
              >
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Quick Scan</span>
              </button>

              {/* Full Multi-Model Audit Button */}
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-cyan-600/25 transition-all flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Scanning {selectedPromptCount} Prompts...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Run Multi-Model Audit ({selectedPromptCount} Prompts)</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Analyzed Websites Switcher Tabs */}
        {analyzedProjects.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <span className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-600'} uppercase tracking-wider shrink-0 mr-2`}>
              Analyzed Sites:
            </span>
            {analyzedProjects.map((proj) => {
              const isSelected = activeAuditData?.domain === proj.domain;
              return (
                <button
                  key={proj.domain}
                  onClick={() => setActiveAuditData(proj)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 border ${
                    isSelected
                      ? isDark
                        ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/40 shadow-sm'
                        : 'bg-cyan-600 text-white border-cyan-600 shadow-md'
                      : isDark
                      ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      : 'bg-white border-slate-300 text-slate-700 hover:text-slate-900 shadow-xs'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{proj.domain}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Audit Results View or Initial Empty State */}
        {!activeAuditData ? (
          <div className={`p-12 text-center rounded-3xl border ${
            isDark
              ? 'bg-slate-900/40 border-slate-800/60'
              : 'bg-white border-slate-200/90 shadow-xl shadow-slate-200/50'
          } space-y-4 max-w-xl mx-auto`}>
            <div className={`w-16 h-16 rounded-2xl ${
              isDark ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' : 'bg-sky-100 border-sky-200 text-cyan-700'
            } border flex items-center justify-center mx-auto shadow-xs`}>
              <Search className="w-8 h-8" />
            </div>
            <h3 className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
              No Website Analyzed Yet
            </h3>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'} leading-relaxed font-medium`}>
              Enter any target domain in the search bar above to start live Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) multi-model auditing.
            </p>
          </div>
        ) : (
          <div className="space-y-8 animate-scale-in">
            {/* Header Domain Banner & Module Nav Tabs */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${
                    isDark ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-sky-100 text-sky-800 border-sky-200'
                  } border text-xs font-bold`}>
                    <Sparkles className="w-3.5 h-3.5 text-cyan-600" /> Audit Completed: {activeAuditData.domain}
                  </div>
                  <ReportDownloadButton auditData={activeAuditData} isDark={isDark} />
                </div>
                <h2 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {activeAuditData.brandName} AI Visibility Report
                </h2>

                {/* AI Auto-Discovered Badges Banner */}
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                  <span className={`font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>AI Discovered Competitors:</span>
                  {activeAuditData.autoDiscoveredCompetitors?.map((comp: string, cIdx: number) => (
                    <span key={cIdx} className={`px-2.5 py-0.5 rounded-md font-bold text-[11px] border ${
                      isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-slate-300 text-slate-800 shadow-2xs'
                    }`}>
                      {comp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className={`flex items-center gap-1.5 overflow-x-auto p-1.5 rounded-2xl border ${
                isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-300 shadow-xs'
              } text-xs font-semibold`}>
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                    activeTab === 'overview'
                      ? 'bg-cyan-600 text-white font-extrabold shadow-sm'
                      : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5" /> Overview
                </button>
                <button
                  onClick={() => setActiveTab('crawler')}
                  className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                    activeTab === 'crawler'
                      ? 'bg-cyan-600 text-white font-extrabold shadow-sm'
                      : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" /> Site Crawler & Schema
                </button>
                <button
                  onClick={() => setActiveTab('heatmap')}
                  className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                    activeTab === 'heatmap'
                      ? 'bg-cyan-600 text-white font-extrabold shadow-sm'
                      : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Bot className="w-3.5 h-3.5 text-amber-500" /> 🔥 AI Heatmap & Matrix
                </button>
                <button
                  onClick={() => setActiveTab('keywords')}
                  className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                    activeTab === 'keywords'
                      ? 'bg-cyan-600 text-white font-extrabold shadow-sm'
                      : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Key className="w-3.5 h-3.5" /> Keywords & Research
                </button>
                <button
                  onClick={() => setActiveTab('gaps')}
                  className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                    activeTab === 'gaps'
                      ? 'bg-cyan-600 text-white font-extrabold shadow-sm'
                      : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Target className="w-3.5 h-3.5" /> Gaps & GEO Briefs
                </button>
                <button
                  onClick={() => setActiveTab('citations')}
                  className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                    activeTab === 'citations'
                      ? 'bg-cyan-600 text-white font-extrabold shadow-sm'
                      : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Link2 className="w-3.5 h-3.5" /> Citations Map
                </button>
              </div>
            </div>

            {/* TAB CONTENT 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <AeoScoreCard
                  overallGeoScore={activeAuditData.metrics?.overallGeoScore ?? 0}
                  schemaScore={activeAuditData.metrics?.schemaScore ?? 0}
                  citationScore={activeAuditData.metrics?.citationScore ?? 0}
                  entityScore={activeAuditData.metrics?.entityScore ?? 0}
                  readabilityScore={activeAuditData.metrics?.readabilityScore ?? 0}
                  shareOfVoice={activeAuditData.metrics?.shareOfVoice ?? 0}
                  isDark={isDark}
                />

                {activeAuditData.pageAudit?.recommendations?.length > 0 && (
                  <div className={`p-6 rounded-2xl border ${
                    isDark ? 'bg-slate-900/80 border-cyan-500/30' : 'bg-white border-slate-200 shadow-md shadow-slate-200/50'
                  }`}>
                    <h3 className="text-sm font-extrabold text-cyan-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-cyan-600" /> Top Actionable GEO Fixes for {activeAuditData.domain}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      {activeAuditData.pageAudit.recommendations.map((rec: string, rIdx: number) => (
                        <div key={rIdx} className={`p-3 rounded-xl border ${
                          isDark ? 'bg-slate-950/60 border-slate-800 text-slate-200' : 'bg-sky-50/50 border-sky-200 text-slate-900 font-semibold'
                        } flex items-start gap-2`}>
                          <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                          <span>{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <MultiModelHeatmap promptScans={activeAuditData.promptScans || []} isDark={isDark} />
              </div>
            )}

            {/* TAB CONTENT 2: CRAWLER & SCHEMA */}
            {activeTab === 'crawler' && (
              <SiteCrawlerView pageAudit={activeAuditData.pageAudit} isDark={isDark} />
            )}

            {/* TAB CONTENT 3: HEATMAP */}
            {activeTab === 'heatmap' && (
              <MultiModelHeatmap promptScans={activeAuditData.promptScans || []} isDark={isDark} />
            )}

            {/* TAB CONTENT 4: KEYWORDS & RESEARCH */}
            {activeTab === 'keywords' && (
              <KeywordsResearchView
                domain={activeAuditData.domain}
                extractedKeywords={activeAuditData.autoDiscoveredKeywords || []}
                isDark={isDark}
              />
            )}

            {/* TAB CONTENT 5: GAPS */}
            {activeTab === 'gaps' && (
              <GapAnalysisTable gaps={activeAuditData.gaps || []} isDark={isDark} />
            )}

            {/* TAB CONTENT 5: CITATIONS */}
            {activeTab === 'citations' && (
              <CitationList domain={activeAuditData.domain} isDark={isDark} />
            )}
          </div>
        )}
      </main>

      <footer className={`border-t ${isDark ? 'border-slate-800/80 bg-slate-950' : 'border-slate-200 bg-white'} py-6 text-center text-xs text-slate-500`}>
        © 2026 AEO / GEO Expert Platform. Unlimited Multi-Model Search Engine Analytics.
      </footer>
    </div>
  );
}
