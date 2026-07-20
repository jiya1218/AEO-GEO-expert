'use client';

import { useState } from 'react';
import { Search, Loader2, Sparkles, X, Globe, Key, Building2 } from 'lucide-react';
import { toast } from 'sonner';

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuditComplete: (data: any) => void;
}

export function AuditModal({ isOpen, onClose, onAuditComplete }: AuditModalProps) {
  const [domain, setDomain] = useState('');
  const [brandName, setBrandName] = useState('');
  const [keywords, setKeywords] = useState('');
  const [competitors, setCompetitors] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain) {
      toast.error('Please enter a target domain name');
      return;
    }

    try {
      setLoading(true);
      const kwArray = keywords.split(',').map(k => k.trim()).filter(Boolean);
      const compArray = competitors.split(',').map(c => c.trim()).filter(Boolean);

      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain,
          brandName,
          keywords: kwArray,
          competitors: compArray,
        }),
      });

      if (!res.ok) throw new Error('Analysis failed');

      const data = await res.json();
      toast.success(`AEO/GEO Analysis completed for ${domain}!`);
      onAuditComplete(data);
      onClose();
    } catch (err: any) {
      toast.error(err.message || 'Failed to complete website audit');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 relative shadow-2xl">
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Run AEO / GEO Website Audit
        </div>
        <h2 className="text-xl font-bold text-white mb-1">Analyze a New Website</h2>
        <p className="text-xs text-slate-400 mb-6">
          Test on-page GEO schemas and multi-model AI search engine citations.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">
              Website Domain *
            </label>
            <div className="relative">
              <Globe className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="example.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all text-sm"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">
              Brand Name (Optional)
            </label>
            <div className="relative">
              <Building2 className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="Acme Inc"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">
              Target Keywords (Comma-separated)
            </label>
            <div className="relative">
              <Key className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="AEO software, AI Search Optimization, GEO"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">
              Competitor Domains (Comma-separated)
            </label>
            <input
              type="text"
              value={competitors}
              onChange={(e) => setCompetitors(e.target.value)}
              placeholder="competitor1.com, competitor2.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all text-sm"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Analyzing AI Visibility...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Start AEO Audit</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
