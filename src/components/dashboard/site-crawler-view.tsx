'use client';

import { PageGeoAuditResult } from '@/lib/aeo-engine/page-analyzer';
import { Layers, CheckCircle2, AlertTriangle, FileCode, Tag, Heading, Sparkles, Globe } from 'lucide-react';

interface SiteCrawlerProps {
  pageAudit?: PageGeoAuditResult;
  isDark?: boolean;
}

export function SiteCrawlerView({ pageAudit, isDark = true }: SiteCrawlerProps) {
  if (!pageAudit) {
    return (
      <div className={`p-8 text-center rounded-2xl border ${isDark ? 'bg-slate-900/60 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'}`}>
        No crawl data available yet. Run a website scan above to inspect site structure and schemas.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Crawl Summary Card */}
      <div className={`p-6 rounded-2xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} space-y-4`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 border-slate-800/60">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-500 uppercase tracking-wider mb-1">
              <Globe className="w-3.5 h-3.5" /> Technical On-Page GEO Crawl
            </div>
            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {pageAudit.domain}
            </h3>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'} mt-0.5`}>
              Crawled URL: <a href={pageAudit.url} target="_blank" rel="noreferrer" className="text-cyan-500 hover:underline">{pageAudit.url}</a>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-center px-4 py-2 bg-slate-950/40 rounded-xl border border-slate-800">
              <span className="block text-[10px] text-slate-400 uppercase font-semibold">Schema Score</span>
              <span className="text-lg font-bold text-purple-400">{pageAudit.schemaScore}/100</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-950/40 rounded-xl border border-slate-800">
              <span className="block text-[10px] text-slate-400 uppercase font-semibold">Entity Density</span>
              <span className="text-lg font-bold text-emerald-400">{pageAudit.entityScore}/100</span>
            </div>
          </div>
        </div>

        {/* Page Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/70 border-slate-800/80' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-semibold text-slate-400 uppercase block mb-1">Meta Title Tag</span>
            <p className={`font-medium ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{pageAudit.title || 'No Title Found'}</p>
          </div>
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/70 border-slate-800/80' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-semibold text-slate-400 uppercase block mb-1">Meta Description</span>
            <p className={`font-medium ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{pageAudit.description || 'No Description Found'}</p>
          </div>
        </div>
      </div>

      {/* JSON-LD Schemas & Heading Outline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Detected Schemas */}
        <div className={`p-6 rounded-2xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'} flex items-center gap-2 mb-4`}>
            <FileCode className="w-5 h-5 text-purple-400" /> JSON-LD Schema Markup Inspection
          </h4>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/50 border border-slate-800">
              <span className="font-semibold text-slate-300">FAQPage Schema</span>
              {pageAudit.hasFaqSchema ? (
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Detected
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Missing
                </span>
              )}
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/50 border border-slate-800">
              <span className="font-semibold text-slate-300">Organization Schema</span>
              {pageAudit.hasOrganizationSchema ? (
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Detected
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Missing
                </span>
              )}
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/50 border border-slate-800">
              <span className="font-semibold text-slate-300">Product / Service Schema</span>
              {pageAudit.hasProductSchema ? (
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Detected
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 font-bold">
                  Optional
                </span>
              )}
            </div>

            {pageAudit.detectedSchemas.length > 0 && (
              <div className="pt-2">
                <span className="font-semibold text-slate-400 block mb-2">All Detected Schemas:</span>
                <div className="flex flex-wrap gap-1.5">
                  {pageAudit.detectedSchemas.map((schema, sIdx) => (
                    <span key={sIdx} className="px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20 font-medium">
                      {schema}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Knowledge Graph Entities */}
        <div className={`p-6 rounded-2xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'} flex items-center gap-2 mb-4`}>
            <Tag className="w-5 h-5 text-emerald-400" /> Vector Entity Density Keywords
          </h4>

          <p className="text-xs text-slate-400 mb-4">
            Key brand and topical entities extracted for LLM vector embedding alignment:
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {pageAudit.entityKeywords.map((entity, eIdx) => (
              <span
                key={eIdx}
                className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-semibold flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                {entity}
              </span>
            ))}
          </div>

          <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Heading className="w-4 h-4 text-blue-400" /> H2 Subheading Structure
          </h5>
          <div className="space-y-1.5 text-xs text-slate-400 max-h-36 overflow-y-auto">
            {pageAudit.h2Tags.map((h2, hIdx) => (
              <div key={hIdx} className="p-2 rounded bg-slate-950/40 border border-slate-800/60 truncate">
                • {h2}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
