'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { AeoScoreCard } from '@/components/dashboard/aeo-score-card';
import { MultiModelHeatmap } from '@/components/dashboard/multi-model-heatmap';
import { CitationList } from '@/components/dashboard/citation-list';
import { GapAnalysisTable } from '@/components/dashboard/gap-analysis-table';
import { AuditModal } from '@/components/dashboard/audit-modal';
import {
  Brain, Plus, RefreshCw, LogOut, Globe, Sparkles, CheckCircle2,
  AlertTriangle, Shield, Download, FileSpreadsheet
} from 'lucide-react';
import { toast } from 'sonner';

export default function DashboardPage() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [auditData, setAuditData] = useState<any>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    // Check auth session
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUserEmail(data.user.email || 'User');
      }
    });

    // Run initial baseline analysis for demo domain
    fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        domain: 'scalezix.com',
        brandName: 'Scalezix',
        keywords: ['AEO Engine', 'GEO Optimization', 'AI Search Visibility'],
        competitors: ['Semrush.com', 'Ahrefs.com'],
      }),
    })
      .then((res) => res.json())
      .then((data) => setAuditData(data))
      .catch((err) => console.error('Error fetching initial audit:', err));
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Signed out successfully');
    window.location.href = '/login';
  };

  const handleAuditComplete = (newData: any) => {
    setAuditData(newData);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-base bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
                AEO / GEO Expert Platform
              </span>
              <span className="block text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                Multi-Model AI Visibility Analytics
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-slate-300 font-semibold">
                {auditData?.domain || 'scalezix.com'}
              </span>
            </div>

            <button
              onClick={() => setIsAuditModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>New Audit</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header Title Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/60 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Live AEO/GEO Visibility Audit
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {auditData?.brandName || 'Scalezix'} AI Visibility Audit
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Analyzing domain <span className="text-cyan-400 font-medium">{auditData?.domain || 'scalezix.com'}</span> across 6 Generative AI engines.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAuditModalOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs font-semibold text-slate-300 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
              <span>Re-run Audit</span>
            </button>
          </div>
        </div>

        {/* Score Breakdown Cards */}
        <AeoScoreCard
          overallGeoScore={auditData?.metrics?.overallGeoScore || 78}
          schemaScore={auditData?.metrics?.schemaScore || 70}
          citationScore={auditData?.metrics?.citationScore || 82}
          entityScore={auditData?.metrics?.entityScore || 75}
          readabilityScore={auditData?.metrics?.readabilityScore || 85}
          shareOfVoice={auditData?.metrics?.shareOfVoice || 64}
        />

        {/* On-Page GEO Action Items Banner */}
        {auditData?.pageAudit?.recommendations?.length > 0 && (
          <div className="bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/30 rounded-2xl p-6 relative overflow-hidden backdrop-blur-md">
            <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" /> Priority GEO Recommendations for {auditData.domain}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-200">
              {auditData.pageAudit.recommendations.map((rec: string, rIdx: number) => (
                <div key={rIdx} className="flex items-start gap-2 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Multi-Model Heatmap Matrix */}
        <MultiModelHeatmap promptScans={auditData?.promptScans || []} />

        {/* Two-Column Grid: Gaps & Citations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <GapAnalysisTable gaps={auditData?.gaps || []} />
          <CitationList domain={auditData?.domain || 'scalezix.com'} />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <p>© 2026 AEO / GEO Expert Platform. Designed for Next-Gen Generative Engine Optimization.</p>
      </footer>

      {/* Audit Modal */}
      <AuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        onAuditComplete={handleAuditComplete}
      />
    </div>
  );
}
