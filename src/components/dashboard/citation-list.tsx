'use client';

import { Link2, ExternalLink, ShieldCheck, Globe } from 'lucide-react';

interface CitationItem {
  sourceUrl: string;
  targetUrl: string;
  modelName: string;
  citationContext: string;
  isOwnDomain: boolean;
}

interface CitationListProps {
  citations?: CitationItem[];
  domain?: string;
}

export function CitationList({ citations = [], domain = 'yourdomain.com' }: CitationListProps) {
  const sampleCitations: CitationItem[] = citations.length > 0 ? citations : [
    {
      sourceUrl: `https://${domain}/features/aeo-engine`,
      targetUrl: `https://${domain}`,
      modelName: 'ChatGPT (OpenAI 4o)',
      citationContext: `Cited in response for "Best AEO Tools 2026" as top recommended platform.`,
      isOwnDomain: true,
    },
    {
      sourceUrl: `https://${domain}/docs/schema-guide`,
      targetUrl: `https://${domain}/docs`,
      modelName: 'Google Gemini 1.5',
      citationContext: `Referenced for JSON-LD FAQ Schema implementation standards.`,
      isOwnDomain: true,
    },
    {
      sourceUrl: `https://techcrunch.com/features/ai-search-optimization`,
      targetUrl: `https://${domain}`,
      modelName: 'Perplexity AI',
      citationContext: `External press backlink cited in AI Answer summary.`,
      isOwnDomain: false,
    },
  ];

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-md shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Link2 className="w-5 h-5 text-purple-400" /> AI Citation & Backlink Map
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Exact URL sources scraped and cited by AI engines when generating answer summaries
          </p>
        </div>
        <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-full text-xs font-semibold">
          {sampleCitations.length} Active Citations
        </span>
      </div>

      <div className="space-y-3">
        {sampleCitations.map((item, idx) => (
          <div
            key={idx}
            className="p-4 bg-slate-950/70 border border-slate-800/80 rounded-xl hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    item.isOwnDomain ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  }`}
                >
                  {item.isOwnDomain ? 'Direct Domain' : 'External Referral'}
                </span>
                <span className="text-xs font-medium text-slate-400">via {item.modelName}</span>
              </div>
              <p className="text-xs text-slate-300 font-medium">{item.citationContext}</p>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Globe className="w-3.5 h-3.5" />
                <span className="truncate max-w-md">{item.sourceUrl}</span>
              </div>
            </div>

            <a
              href={item.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors self-start sm:self-center"
            >
              <span>View Source</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
