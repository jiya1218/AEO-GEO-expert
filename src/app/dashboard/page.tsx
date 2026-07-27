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
import { AiBackground } from '@/components/ui/ai-background';
import {
  Brain, RefreshCw, LogOut, Globe, Sparkles, CheckCircle2,
  Search, Loader2, Sun, Moon, Layers, Target, Link2, Bot,
  TrendingUp, Building2, Cpu, Tag, Key, Zap, ExternalLink
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

    // Auto-start scan if initiated from Homepage
    if (typeof window !== 'undefined') {
      const pending = sessionStorage.getItem('pendingScanUrl');
      if (pending) {
        sessionStorage.removeItem('pendingScanUrl');
        setTargetDomainInput(pending);
        handleRunAnalysisForDomain(pending);
      }
    }
  }, []);

  const handleRunAnalysisForDomain = async (domainToScan: string, brandToScan: string = '', isQuick: boolean = false) => {
    try {
      setLoading(true);
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain: domainToScan,
          brandName: brandToScan,
          promptCount: selectedPromptCount,
          isQuickScan: isQuick,
        }),
      });

      if (!res.ok) throw new Error('Analysis failed');

      const data = await res.json();
      setActiveAuditData(data);
      setAnalyzedProjects((prev) => [data, ...prev.filter((p) => p.domain !== data.domain)]);
      
      if (isQuick) {
        toast.success(`Quick Site Audit completed for ${data.domain}!`);
        setActiveTab('overview');
      } else {
        toast.success(`Full Multi-Model Audit completed for ${data.domain}!`);
        setActiveTab('overview');
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
      toast.error(err.message || 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRunAnalysis = async (e?: React.FormEvent, isQuickScan: boolean = false) => {
    if (e) e.preventDefault();
    if (!targetDomainInput) {
      toast.error('Please enter a website domain (e.g. stripe.com)');
      return;
    }
    await handleRunAnalysisForDomain(targetDomainInput, targetBrandInput, isQuickScan);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Signed out successfully');
    window.location.href = '/login';
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-[#f8fafc] text-slate-900'} flex flex-col font-sans transition-colors duration-200 relative overflow-hidden`}>
      <AiBackground isDark={isDark} />

      {/* Full-Screen Analysis Animation Overlay */}
      {loading && (
        <AnalysisAnimation domain={targetDomainInput || 'website'} isDark={isDark} />
      )}

      {/* Top Header Navbar */}
      <header className={`border-b ${isDark ? 'border-slate-800/80 bg-slate-900/80' : 'border-slate-200/90 bg-white/90 shadow-xs'} backdrop-blur-xl sticky top-0 z-40`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-sky-600 to-indigo-600 flex items-center justify-center shadow-md shadow-cyan-600/20">
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
        
        {/* Sleek Hero & Search Input Controls Card (Hidden during print) */}
        <div className={`p-6 sm:p-8 rounded-3xl border ${
          isDark
            ? 'bg-slate-900/80 border-slate-800'
            : 'bg-white border-slate-200/90 shadow-xl shadow-slate-900/5'
        } backdrop-blur-xl no-print`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border ${
                  isDark ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' : 'bg-cyan-50 text-cyan-800 border-cyan-200'
                }`}>
                  <Sparkles className="w-3 h-3 inline mr-1 text-cyan-500" /> Multi-LLM Engine
                </span>
                <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'} font-semibold`}>
                  Live Search Auditing
                </span>
              </div>
              <h2 className={`text-xl sm:text-2xl font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>
                Audit Any Domain in Real Time
              </h2>
            </div>

            {/* Prompt Count Selector */}
            <div className="flex items-center gap-3">
              <span className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-600'} shrink-0`}>
                Prompts to Scan:
              </span>
              <div className="flex items-center gap-1">
                {[3, 5, 10, 15, 20].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setSelectedPromptCount(count)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                      selectedPromptCount === count
                        ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                        : isDark
                        ? 'text-slate-400 hover:text-white hover:bg-slate-900'
                        : 'text-slate-600 hover:text-slate-950 hover:bg-white'
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={handleRunAnalysis} className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="relative sm:col-span-6">
                <Globe className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={targetDomainInput}
                  onChange={(e) => setTargetDomainInput(e.target.value)}
                  placeholder="Website Domain (e.g. stripe.com, kalkifashion.com, amazon.in)"
                  required
                  className={`w-full ${
                    isDark
                      ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500 focus:border-cyan-500'
                      : 'bg-slate-50 border-slate-200 text-slate-900 font-semibold placeholder-slate-400 focus:border-cyan-600 shadow-xs'
                  } border rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm focus:outline-none transition-all`}
                />
              </div>
              
              <div className="relative sm:col-span-3">
                <Building2 className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={targetBrandInput}
                  onChange={(e) => setTargetBrandInput(e.target.value)}
                  placeholder="Brand Name (Optional)"
                  className={`w-full ${
                    isDark
                      ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500 focus:border-cyan-500'
                      : 'bg-slate-50 border-slate-200 text-slate-900 font-semibold placeholder-slate-400 focus:border-cyan-600 shadow-xs'
                  } border rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm focus:outline-none transition-all`}
                />
              </div>

              <div className="sm:col-span-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    if (!targetDomainInput) {
                      toast.error('Please enter a website domain first');
                      return;
                    }
                    handleRunAnalysis(e, true);
                  }}
                  disabled={loading}
                  className={`px-3.5 py-3 rounded-2xl border ${
                    isDark
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20'
                      : 'bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100 shadow-xs'
                  } font-bold text-xs transition-all flex items-center justify-center gap-1.5 shrink-0`}
                  title="Quick Site Audit (3s Fast Scan)"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>Quick Scan</span>
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-cyan-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Scanning...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      <span>Audit ({selectedPromptCount} Prompts)</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Analyzed Websites Switcher Tabs (Hidden during print) */}
        {analyzedProjects.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-print">
            <span className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-600'} uppercase tracking-wider shrink-0 mr-1`}>
              Recent Audits:
            </span>
            {analyzedProjects.map((proj) => {
              const isSelected = activeAuditData?.domain === proj.domain;
              return (
                <button
                  key={proj.domain}
                  onClick={() => setActiveAuditData(proj)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 border ${
                    isSelected
                      ? isDark
                        ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/40 shadow-xs'
                        : 'bg-cyan-600 text-white border-cyan-600 shadow-md'
                      : isDark
                      ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      : 'bg-white border-slate-200 text-slate-700 hover:text-slate-950 shadow-2xs'
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
              ? 'bg-slate-900/80 border-slate-800'
              : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'
          } space-y-4 max-w-xl mx-auto`}>
            <div className={`w-14 h-14 rounded-2xl ${
              isDark ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' : 'bg-cyan-50 border-cyan-200 text-cyan-700'
            } border flex items-center justify-center mx-auto`}>
              <Search className="w-7 h-7" />
            </div>
            <h3 className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>
              No Website Analyzed Yet
            </h3>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'} leading-relaxed font-medium`}>
              Enter any target domain in the search bar above to start live Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) multi-model auditing.
            </p>
          </div>
        ) : (
          <>
            {/* SCREEN VIEW (Hidden during PDF print) */}
            <div className="space-y-6 print:hidden">
              {/* LAYER 1: Report Title & Action Buttons */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold ${
                      isDark ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    }`}>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Audit Complete: {activeAuditData.domain}
                    </span>
                    {activeAuditData.isQuickScan && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        ⚡ Quick Scan
                      </span>
                    )}
                  </div>
                  <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
                    {activeAuditData.brandName} AI Search Visibility
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  <ReportDownloadButton auditData={activeAuditData} isDark={isDark} />
                </div>
              </div>

              {/* LAYER 2: Competitors Banner */}
              <div className={`p-3.5 rounded-2xl border ${
                isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-slate-100 border-slate-200'
              } flex flex-wrap items-center gap-3 text-xs`}>
                <span className={`font-bold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Top Market Competitors:
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {activeAuditData.autoDiscoveredCompetitors?.map((comp: string, cIdx: number) => {
                    const href = comp.startsWith('http') ? comp : `https://${comp}`;
                    return (
                      <a
                        key={cIdx}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`px-3 py-1 rounded-xl font-extrabold text-xs border transition-all flex items-center gap-1.5 hover:scale-105 ${
                          isDark
                            ? 'bg-slate-950 border-slate-800 text-cyan-400 hover:text-cyan-300 hover:border-cyan-500/50 shadow-sm'
                            : 'bg-white border-slate-300 text-cyan-700 hover:text-cyan-900 shadow-2xs hover:border-cyan-400'
                        }`}
                        title={`Visit ${comp} (opens in new tab)`}
                      >
                        <span>{comp}</span>
                        <ExternalLink className="w-3 h-3 text-cyan-500 opacity-80" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* LAYER 3: Full-Width Clean Segmented Navigation Tab Bar */}
              <div className={`p-1.5 rounded-2xl border ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
              } flex items-center gap-1.5 overflow-x-auto text-xs font-bold no-print`}>
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
                    activeTab === 'overview'
                      ? 'bg-cyan-600 text-white font-extrabold shadow-md shadow-cyan-600/30'
                      : isDark ? 'text-slate-400 hover:text-white hover:bg-slate-950/50' : 'text-slate-600 hover:text-slate-950 hover:bg-white'
                  }`}
                >
                  <TrendingUp className="w-4 h-4" /> Overview
                </button>
                
                <button
                  onClick={() => setActiveTab('crawler')}
                  className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
                    activeTab === 'crawler'
                      ? 'bg-cyan-600 text-white font-extrabold shadow-md shadow-cyan-600/30'
                      : isDark ? 'text-slate-400 hover:text-white hover:bg-slate-950/50' : 'text-slate-600 hover:text-slate-950 hover:bg-white'
                  }`}
                >
                  <Layers className="w-4 h-4" /> Site Crawler & Schema
                </button>
                
                <button
                  onClick={() => setActiveTab('heatmap')}
                  className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
                    activeTab === 'heatmap'
                      ? 'bg-cyan-600 text-white font-extrabold shadow-md shadow-cyan-600/30'
                      : isDark ? 'text-slate-400 hover:text-white hover:bg-slate-950/50' : 'text-slate-600 hover:text-slate-950 hover:bg-white'
                  }`}
                >
                  <Bot className="w-4 h-4 text-amber-400" /> AI Heatmap
                </button>
                
                <button
                  onClick={() => setActiveTab('keywords')}
                  className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
                    activeTab === 'keywords'
                      ? 'bg-cyan-600 text-white font-extrabold shadow-md shadow-cyan-600/30'
                      : isDark ? 'text-slate-400 hover:text-white hover:bg-slate-950/50' : 'text-slate-600 hover:text-slate-950 hover:bg-white'
                  }`}
                >
                  <Key className="w-4 h-4" /> Keywords
                </button>
                
                <button
                  onClick={() => setActiveTab('gaps')}
                  className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
                    activeTab === 'gaps'
                      ? 'bg-cyan-600 text-white font-extrabold shadow-md shadow-cyan-600/30'
                      : isDark ? 'text-slate-400 hover:text-white hover:bg-slate-950/50' : 'text-slate-600 hover:text-slate-950 hover:bg-white'
                  }`}
                >
                  <Target className="w-4 h-4" /> Gaps & GEO Briefs
                </button>
                
                <button
                  onClick={() => setActiveTab('citations')}
                  className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
                    activeTab === 'citations'
                      ? 'bg-cyan-600 text-white font-extrabold shadow-md shadow-cyan-600/30'
                      : isDark ? 'text-slate-400 hover:text-white hover:bg-slate-950/50' : 'text-slate-600 hover:text-slate-950 hover:bg-white'
                  }`}
                >
                  <Link2 className="w-4 h-4" /> Citations Map
                </button>
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

            {/* DEDICATED FULL PRINT REPORT VIEW (Renders only when Export PDF / Print is active) */}
            <div className="hidden print:block space-y-8">
              {/* Executive Header */}
              <div className="border-b border-slate-300 pb-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                      AEO / GEO Executive Audit Report
                    </h1>
                    <p className="text-sm font-bold text-slate-700 mt-1">
                      Domain: <span className="text-cyan-700">{activeAuditData.domain}</span> | Brand: <span className="text-slate-900">{activeAuditData.brandName}</span>
                    </p>
                  </div>
                  <div className="text-right text-xs font-semibold text-slate-600">
                    <p>Generated: {new Date(activeAuditData.timestamp || Date.now()).toLocaleDateString()}</p>
                    <p className="text-[10px] text-slate-500">AEO/GEO Expert Analytics</p>
                  </div>
                </div>

                {activeAuditData.autoDiscoveredCompetitors?.length > 0 && (
                  <div className="mt-3 text-xs flex items-center gap-2">
                    <span className="font-bold text-slate-800">Analyzed Market Competitors:</span>
                    <span className="font-semibold text-slate-700">
                      {activeAuditData.autoDiscoveredCompetitors.join(', ')}
                    </span>
                  </div>
                )}
              </div>

              {/* Section 1: Executive Scores */}
              <div className="break-inside-avoid">
                <h2 className="text-sm font-extrabold text-slate-900 border-b border-slate-300 pb-1 mb-3 uppercase tracking-wider">
                  1. Executive AI Search Visibility Scores
                </h2>
                <AeoScoreCard
                  overallGeoScore={activeAuditData.metrics?.overallGeoScore ?? 0}
                  schemaScore={activeAuditData.metrics?.schemaScore ?? 0}
                  citationScore={activeAuditData.metrics?.citationScore ?? 0}
                  entityScore={activeAuditData.metrics?.entityScore ?? 0}
                  readabilityScore={activeAuditData.metrics?.readabilityScore ?? 0}
                  shareOfVoice={activeAuditData.metrics?.shareOfVoice ?? 0}
                  isDark={false}
                />
              </div>

              {/* Section 2: Top Actionable GEO Fixes */}
              {activeAuditData.pageAudit?.recommendations?.length > 0 && (
                <div className="break-inside-avoid">
                  <h2 className="text-sm font-extrabold text-slate-900 border-b border-slate-300 pb-1 mb-3 uppercase tracking-wider">
                    2. Top Actionable GEO Optimization Fixes
                  </h2>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    {activeAuditData.pageAudit.recommendations.map((rec: string, rIdx: number) => (
                      <div key={rIdx} className="p-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-semibold flex items-start gap-2">
                        <span className="text-cyan-700 font-bold">•</span>
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Section 3: Full AI Search Visibility Matrix */}
              <div className="break-inside-avoid">
                <h2 className="text-sm font-extrabold text-slate-900 border-b border-slate-300 pb-1 mb-3 uppercase tracking-wider">
                  3. Multi-Model AI Search Engine Evaluation Matrix
                </h2>
                <MultiModelHeatmap promptScans={activeAuditData.promptScans || []} isDark={false} />
              </div>

              {/* Section 4: Technical Site Crawler & Schema Markup */}
              {activeAuditData.pageAudit && (
                <div className="break-inside-avoid">
                  <h2 className="text-sm font-extrabold text-slate-900 border-b border-slate-300 pb-1 mb-3 uppercase tracking-wider">
                    4. Technical Site Crawler & Structured Schema Markup Analysis
                  </h2>
                  <SiteCrawlerView pageAudit={activeAuditData.pageAudit} isDark={false} />
                </div>
              )}

              {/* Section 5: Target Search Keywords */}
              {activeAuditData.autoDiscoveredKeywords?.length > 0 && (
                <div className="break-inside-avoid">
                  <h2 className="text-sm font-extrabold text-slate-900 border-b border-slate-300 pb-1 mb-3 uppercase tracking-wider">
                    5. High-Intent Target Search Keywords
                  </h2>
                  <KeywordsResearchView
                    domain={activeAuditData.domain}
                    extractedKeywords={activeAuditData.autoDiscoveredKeywords || []}
                    isDark={false}
                  />
                </div>
              )}

              {/* Section 6: High-Priority GEO Visibility Gaps */}
              {activeAuditData.gaps?.length > 0 && (
                <div className="break-inside-avoid">
                  <h2 className="text-sm font-extrabold text-slate-900 border-b border-slate-300 pb-1 mb-3 uppercase tracking-wider">
                    6. High-Priority GEO Visibility Opportunities & Gaps
                  </h2>
                  <GapAnalysisTable gaps={activeAuditData.gaps || []} isDark={false} />
                </div>
              )}
            </div>
          </>
        )}
      </main>

      <footer className={`border-t ${isDark ? 'border-slate-800/80 bg-slate-950' : 'border-slate-200 bg-white'} py-6 text-center text-xs text-slate-500`}>
        © 2026 AEO / GEO Expert Platform. Unlimited Multi-Model Search Engine Analytics.
      </footer>
    </div>
  );
}
