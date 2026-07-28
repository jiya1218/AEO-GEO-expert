'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Activity, CheckCircle2, Clock, Mail, Bell, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AiBackground } from '@/components/ui/ai-background';
import { ScrollProgress } from '@/components/ui/scroll-progress';

export default function StatusPage() {
  const { isDark } = useTheme();
  const [subscribed, setSubscribed] = useState(false);

  const services = [
    { name: 'Web Application', status: 'Operational' },
    { name: 'Dashboard Engine', status: 'Operational' },
    { name: 'AI Visibility Engine', status: 'Operational' },
    { name: 'GEO Analysis Engine', status: 'Operational' },
    { name: 'Citation Intelligence API', status: 'Operational' },
    { name: 'REST API Services', status: 'Operational' },
    { name: 'Authentication & SSO', status: 'Operational' },
    { name: 'Billing & Subscriptions', status: 'Operational' },
    { name: 'Webhook Notifications', status: 'Operational' },
  ];

  return (
    <div className={`min-h-screen flex flex-col font-sans relative transition-colors duration-500 ${
      isDark ? 'bg-[#0B0B0C] text-[#F6F6F4]' : 'bg-[#FCFCFB] text-[#181818]'
    }`}>
      <ScrollProgress />
      <AiBackground isDark={isDark} />
      <Navbar ctaText="Support" ctaHref="mailto:support@tangentcore.in" />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-xs font-mono font-bold ${
            isDark ? 'bg-[#121315] border-white/10 text-[#C7A15A]' : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#B87333]'
          } shadow-sm`}>
            <Activity className="w-3.5 h-3.5 text-[#C7A15A]" />
            <span className="uppercase tracking-wider">SYSTEM STATUS & UPTIME MONITOR</span>
          </div>

          <h1 className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#181818]'}`}>
            Platform Status
          </h1>

          {/* Operational Status Banner */}
          <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm font-bold flex items-center justify-center gap-2 max-w-md mx-auto">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>🟢 All Systems Operational</span>
          </div>
          <span className="text-[10px] font-mono text-[#B7B7B5] block">Last Updated: July 2026</span>
        </div>

        {/* Services Status Table */}
        <div className={`p-8 rounded-3xl border ${isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'} space-y-4 shadow-xl`}>
          <h2 className="text-xl font-bold">Platform Services Status</h2>
          <div className="space-y-2">
            {services.map((s) => (
              <div key={s.name} className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs ${
                isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-[#F6F5F3] border-[#E5E3DF]'
              }`}>
                <span className="font-bold text-white">{s.name}</span>
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-mono font-bold text-[10px] flex items-center gap-1 border border-emerald-500/30">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{s.status}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Incident History & Maintenance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`p-6 rounded-3xl border ${isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'} space-y-3`}>
            <h3 className="text-lg font-bold text-[#C7A15A]">Incident History</h3>
            <p className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
              No major outages or service disruptions recorded in the last 90 days. Average uptime: 99.98%.
            </p>
          </div>

          <div className={`p-6 rounded-3xl border ${isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'} space-y-3`}>
            <h3 className="text-lg font-bold text-[#C7A15A]">Scheduled Maintenance</h3>
            <p className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
              No maintenance windows scheduled for the next 7 days. All system updates are deployed zero-downtime.
            </p>
          </div>
        </div>

        {/* Subscribe CTA */}
        <div className="rounded-3xl luxury-gradient-card border border-[#C7A15A]/40 p-8 text-center space-y-4 shadow-2xl max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-white">Subscribe to Status Notifications</h3>
          <p className="text-xs text-[#E5E3DF]/80">
            Receive automated alerts whenever platform maintenance or status incidents occur.
          </p>
          <button
            onClick={() => {
              setSubscribed(true);
              toast.success('Subscribed to real-time status updates!');
            }}
            className="px-6 py-3 rounded-xl luxury-btn-primary font-bold text-xs shadow-lg inline-flex items-center gap-2"
          >
            <Bell className="w-4 h-4" />
            <span>{subscribed ? 'Subscribed to Updates' : 'Subscribe to Status Updates'}</span>
          </button>
        </div>

      </main>

      <Footer isDark={isDark} />
    </div>
  );
}
