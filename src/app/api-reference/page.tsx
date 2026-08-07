'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Terminal, Code2, Copy, Check, ShieldCheck, Cpu, ArrowRight, Server, Key, Zap 
} from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AiBackground } from '@/components/ui/ai-background';
import { ScrollProgress } from '@/components/ui/scroll-progress';

export default function ApiReferencePage() {
  const { isDark } = useTheme();
  const [copied, setCopied] = useState(false);

  const copyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Code copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const rateLimits = [
    { plan: 'Starter', limit: '120 requests / min' },
    { plan: 'Professional', limit: '500 requests / min' },
    { plan: 'Enterprise', limit: 'Custom Rate Limits' },
  ];

  const endpoints = [
    { method: 'GET', path: '/workspaces', desc: 'List all workspaces associated with your account.' },
    { method: 'GET', path: '/workspaces/{id}', desc: 'Retrieve complete workspace metrics and configuration.' },
    { method: 'POST', path: '/workspaces', desc: 'Create a new TangentCore workspace.' },
    { method: 'GET', path: '/visibility', desc: 'Retrieve overall AI Visibility score, platform breakdown & history.' },
    { method: 'GET', path: '/citations', desc: 'Retrieve total citation count, citation sources & AI platform distribution.' },
    { method: 'GET', path: '/competitors', desc: 'Compare AI visibility metrics and citation share against competitors.' },
    { method: 'POST', path: '/reports', desc: 'Generate executive PDF & JSON summaries.' },
    { method: 'POST', path: '/brand-audit', desc: 'Run real-time Brand Audit Matrix on any domain.' },
    { method: 'GET', path: '/recommendations', desc: 'Retrieve prioritised GEO and AEO optimization tasks.' },
  ];

  const responseCodes = [
    { code: '200', meaning: 'Success', detail: 'Request completed successfully.' },
    { code: '201', meaning: 'Resource Created', detail: 'Workspace or report created.' },
    { code: '400', meaning: 'Invalid Request', detail: 'Missing required parameters.' },
    { code: '401', meaning: 'Authentication Required', detail: 'Invalid or missing API key.' },
    { code: '403', meaning: 'Permission Denied', detail: 'Insufficient key permissions.' },
    { code: '429', meaning: 'Rate Limit Exceeded', detail: 'Exceeded request limit per minute.' },
    { code: '500', meaning: 'Internal Server Error', detail: 'Platform service exception.' },
  ];

  const curlSnippet = `curl -X GET "https://api.tangentcore.in/v1/visibility" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`;

  const jsonSnippet = `{
  "score": 82,
  "trend": "up",
  "platforms": {
    "chatgpt": 84,
    "gemini": 79,
    "claude": 76,
    "perplexity": 81,
    "google_ai": 88
  }
}`;

  return (
    <div className={`min-h-screen flex flex-col font-sans relative transition-colors duration-500 ${
      isDark ? 'bg-[#0B0B0C] text-[#F6F6F4]' : 'bg-[#FCFCFB] text-[#181818]'
    }`}>
      <ScrollProgress />
      <AiBackground isDark={isDark} />
      <Navbar ctaText="Documentation" ctaHref="/docs" />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-xs font-mono font-bold ${
            isDark ? 'bg-[#121315] border-white/10 text-[#C7A15A]' : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#B87333]'
          } shadow-sm`}>
            <Terminal className="w-3.5 h-3.5 text-[#C7A15A]" />
            <span className="uppercase tracking-wider">REST API v1 REFERENCE</span>
          </div>

          <h1 className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#181818]'}`}>
            Build Powerful AI Workflows
          </h1>

          <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
            The TangentCore REST API enables developers to programmatically access AI visibility data, citation analytics, competitor insights, reports, and workspace management.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#C7A15A]/15 border border-[#C7A15A]/30 text-[#C7A15A] text-xs font-mono font-bold">
            <Server className="w-3.5 h-3.5" />
            <span>Base URL: https://api.tangentcore.in/v1</span>
          </div>
        </div>

        {/* Authentication Section */}
        <div className={`p-8 rounded-3xl border ${isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'} space-y-4 shadow-xl`}>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#C7A15A] uppercase">
            <Key className="w-4 h-4" />
            <span>Authentication</span>
          </div>
          <h2 className="text-2xl font-bold">Authenticate Your Requests</h2>
          <p className={`text-sm ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
            Every request to the TangentCore API requires an API key. Generate API keys from <strong>Dashboard → Settings → API Keys</strong> and include it in the Authorization header.
          </p>

          <div className="p-4 rounded-2xl bg-[#09090B] border border-white/10 text-xs font-mono text-[#C7A15A] flex items-center justify-between">
            <span>Authorization: Bearer YOUR_API_KEY</span>
            <button onClick={() => copyCode('Authorization: Bearer YOUR_API_KEY')} className="p-1.5 hover:text-white">
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Example cURL & JSON Response */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`p-6 rounded-3xl border ${isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'} space-y-3`}>
            <div className="flex items-center justify-between text-xs font-mono text-[#C7A15A]">
              <span>Example Request (cURL)</span>
              <button onClick={() => copyCode(curlSnippet)} className="hover:text-white flex items-center gap-1">
                <Copy className="w-3.5 h-3.5" /> Copy
              </button>
            </div>
            <pre className="p-4 rounded-2xl bg-[#09090B] border border-white/10 text-xs font-mono text-[#E5E3DF] overflow-x-auto">
              <code>{curlSnippet}</code>
            </pre>
          </div>

          <div className={`p-6 rounded-3xl border ${isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'} space-y-3`}>
            <div className="flex items-center justify-between text-xs font-mono text-[#C7A15A]">
              <span>Example Response (JSON)</span>
            </div>
            <pre className="p-4 rounded-2xl bg-[#09090B] border border-white/10 text-xs font-mono text-emerald-400 overflow-x-auto">
              <code>{jsonSnippet}</code>
            </pre>
          </div>
        </div>

        {/* Endpoints Table */}
        <div className={`p-8 rounded-3xl border ${isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'} space-y-6 shadow-xl`}>
          <h2 className="text-2xl font-bold">API Endpoints Overview</h2>
          <div className="space-y-2.5">
            {endpoints.map((ep, idx) => (
              <div key={idx} className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-[#F6F5F3] border-[#E5E3DF]'
              }`}>
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase ${
                    ep.method === 'GET' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}>
                    {ep.method}
                  </span>
                  <span className="text-sm font-mono font-bold text-white">{ep.path}</span>
                </div>
                <span className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>{ep.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rate Limits & Status Codes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`p-6 rounded-3xl border ${isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'} space-y-4`}>
            <h3 className="text-lg font-bold text-[#C7A15A]">Rate Limits</h3>
            <div className="space-y-2">
              {rateLimits.map((rl) => (
                <div key={rl.plan} className="flex items-center justify-between p-3 rounded-xl bg-white/5 text-xs font-mono">
                  <span className="text-white font-bold">{rl.plan} Plan</span>
                  <span className="text-[#C7A15A]">{rl.limit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`p-6 rounded-3xl border ${isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'} space-y-4`}>
            <h3 className="text-lg font-bold text-[#C7A15A]">Official SDKs</h3>
            <div className="flex flex-wrap gap-2 pt-1">
              {['JavaScript', 'TypeScript', 'Python', 'PHP', 'Java', 'Go'].map((sdk) => (
                <span key={sdk} className="px-3 py-1.5 rounded-xl bg-[#C7A15A]/15 border border-[#C7A15A]/30 text-[#C7A15A] text-xs font-mono font-bold">
                  {sdk} SDK
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Developer Contact */}
        <div className={`rounded-3xl p-8 text-center space-y-4 shadow-2xl border ${
          isDark 
            ? 'luxury-gradient-card border-[#C7A15A]/40' 
            : 'bg-white border-[#E5E3DF]'
        }`}>
          <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#181818]'}`}>Need Developer Assistance?</h3>
          <p className={`text-xs max-w-md mx-auto ${isDark ? 'text-[#E5E3DF]/80' : 'text-[#5C5C5C]'}`}>
            Questions about custom webhooks, rate limits, enterprise SSO, or SDK implementation?
          </p>
          <a href="mailto:tangentcoreindia@gmail.com" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl luxury-btn-primary font-bold text-xs shadow-lg">
            <span>Contact Developer Support (tangentcoreindia@gmail.com)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </main>

      <Footer isDark={isDark} />
    </div>
  );
}
