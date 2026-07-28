'use client';

import { Link2, ExternalLink, Globe } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

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
  isDark?: boolean;
}

export function CitationList({ citations = [], domain = 'yourdomain.com', isDark = true }: CitationListProps) {
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
    <ScrollReveal variant="fadeUp" duration={0.55} className={`p-6 sm:p-8 rounded-3xl border ${
      isDark ? 'bg-[#181818] border-[#2A2A2A]' : 'bg-white border-slate-200/90 shadow-xl shadow-slate-900/5'
    } backdrop-blur-2xl`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className={`text-lg font-extrabold ${isDark ? 'text-white' : 'text-slate-900'} flex items-center gap-2`}>
            <Link2 className={`w-5 h-5 ${isDark ? 'text-[#D4AF37]' : 'text-purple-500'}`} /> AI Citation & Backlink Map
          </h3>
          <p className={`text-xs ${isDark ? 'text-[#CFCFCF]' : 'text-slate-600'} mt-1 font-medium`}>
            Exact URL sources scraped and cited by AI engines when generating answer summaries
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
          isDark ? 'bg-[#121212] border border-[#D4AF37]/30 text-[#D4AF37]' : 'bg-purple-500/10 border border-purple-500/30 text-purple-600'
        }`}>
          {sampleCitations.length} Active Citations
        </span>
      </div>

      <div className="space-y-3">
        {sampleCitations.map((item, idx) => (
          <div
            key={idx}
            className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              isDark ? 'bg-[#0A0A0A] border-[#2A2A2A] hover-luxury-lift' : 'bg-slate-50 border-slate-200 hover:border-slate-300 shadow-2xs'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                    item.isOwnDomain
                      ? (isDark ? 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30' : 'bg-cyan-500/10 text-cyan-600 border border-cyan-500/20')
                      : (isDark ? 'bg-[#202020] text-[#9E9E9E] border border-[#2A2A2A]' : 'bg-blue-500/10 text-blue-600 border border-blue-500/20')
                  }`}
                >
                  {item.isOwnDomain ? 'Direct Domain' : 'External Referral'}
                </span>
                <span className={`text-xs font-semibold ${isDark ? 'text-[#9E9E9E]' : 'text-slate-500'}`}>via {item.modelName}</span>
              </div>
              <p className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.citationContext}</p>
              <div className={`flex items-center gap-1 text-xs ${isDark ? 'text-[#9E9E9E]' : 'text-slate-500'} font-medium`}>
                <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="truncate max-w-md">{item.sourceUrl}</span>
              </div>
            </div>

            <a
              href={item.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border text-xs font-extrabold transition-all self-start sm:self-center ${
                isDark ? 'bg-[#181818] border-[#2A2A2A] text-white hover:border-[#D4AF37] hover:text-[#D4AF37]' : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100 shadow-2xs'
              }`}
            >
              <span>View Source</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
            </a>
          </div>
        ))}
      </div>
    </ScrollReveal>
  );
}
