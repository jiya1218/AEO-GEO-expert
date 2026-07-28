'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Calculator, DollarSign, TrendingUp, Sparkles, ArrowRight, 
  CheckCircle2, HelpCircle, RefreshCw, BarChart3, PieChart 
} from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AiBackground } from '@/components/ui/ai-background';
import { ScrollProgress } from '@/components/ui/scroll-progress';

export default function RoiCalculatorToolPage() {
  const { isDark } = useTheme();

  // Input states
  const [monthlyTraffic, setMonthlyTraffic] = useState<number>(35000);
  const [avgCustomerValue, setAvgCustomerValue] = useState<number>(250);
  const [conversionRate, setConversionRate] = useState<number>(2.0);
  const [aiLiftPercentage, setAiLiftPercentage] = useState<number>(30);
  const [planCost, setPlanCost] = useState<number>(149); // Growth plan $149/mo default

  // Calculated ROI Metrics
  const currentMonthlyRevenue = (monthlyTraffic * (conversionRate / 100)) * avgCustomerValue;
  const estimatedAiAdditionalTraffic = monthlyTraffic * (aiLiftPercentage / 100);
  const estimatedAdditionalMonthlyRevenue = (estimatedAiAdditionalTraffic * (conversionRate / 100)) * avgCustomerValue;
  const estimatedAdditionalAnnualRevenue = estimatedAdditionalMonthlyRevenue * 12;
  const annualPlanCost = planCost * 12;
  const netAnnualProfit = estimatedAdditionalAnnualRevenue - annualPlanCost;
  const roiMultiplier = annualPlanCost > 0 ? (estimatedAdditionalAnnualRevenue / annualPlanCost).toFixed(1) : '0.0';

  return (
    <div className={`min-h-screen flex flex-col font-sans relative transition-colors duration-500 ${
      isDark ? 'bg-[#0B0B0C] text-[#F6F6F4]' : 'bg-[#FCFCFB] text-[#181818]'
    }`}>
      <ScrollProgress />
      <AiBackground isDark={isDark} />
      <Navbar ctaText="Audit Your Brand" ctaHref="/dashboard" />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10 space-y-12">
        
        {/* Page Title Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-xs font-mono font-bold ${
            isDark ? 'bg-[#121315] border-white/10 text-[#C7A15A]' : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#B87333]'
          } shadow-sm`}>
            <Calculator className="w-3.5 h-3.5 text-[#C7A15A]" />
            <span className="uppercase tracking-wider">Free Micro-Tool #02</span>
          </div>

          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight ${
            isDark ? 'text-[#F6F6F4]' : 'text-[#181818]'
          }`}>
            AI Search ROI Calculator
          </h1>

          <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
            Calculate your estimated revenue growth, new buyer conversions, and return on investment from optimizing citations across ChatGPT, Perplexity, and Gemini.
          </p>
        </div>

        {/* Calculator Main Grid: Left Sliders Inputs / Right Instant Results */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Sliders & Inputs (lg:col-span-7) */}
          <div className={`lg:col-span-7 rounded-3xl border ${
            isDark ? 'bg-[#121315]/90 border-white/10' : 'bg-white border-[#E5E3DF]'
          } p-6 sm:p-8 space-y-8 shadow-2xl backdrop-blur-md`}>
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className={`text-xl font-extrabold flex items-center gap-2 ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                <BarChart3 className="w-5 h-5 text-[#C7A15A]" />
                <span>Adjust Your Brand Parameters</span>
              </h2>
              <button
                onClick={() => {
                  setMonthlyTraffic(35000);
                  setAvgCustomerValue(250);
                  setConversionRate(2.0);
                  setAiLiftPercentage(30);
                  setPlanCost(149);
                }}
                className={`text-xs font-mono flex items-center gap-1 ${
                  isDark ? 'text-[#B7B7B5] hover:text-[#C7A15A]' : 'text-[#5C5C5C] hover:text-[#B87333]'
                } transition-colors`}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>
            </div>

            {/* Input 1: Monthly Website Traffic */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className={`text-xs font-mono font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                  Monthly Organic Traffic (Visitors):
                </label>
                <span className="text-base font-extrabold text-[#C7A15A]">
                  {monthlyTraffic.toLocaleString()} /mo
                </span>
              </div>
              <input
                type="range"
                min={1000}
                max={500000}
                step={1000}
                value={monthlyTraffic}
                onChange={(e) => setMonthlyTraffic(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#C7A15A]"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#B7B7B5]/60">
                <span>1,000</span>
                <span>250,000</span>
                <span>500,000+</span>
              </div>
            </div>

            {/* Input 2: Average Order Value / Customer LTV */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className={`text-xs font-mono font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                  Average Order Value / Customer LTV ($):
                </label>
                <span className="text-base font-extrabold text-[#C7A15A]">
                  ${avgCustomerValue.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={5000}
                step={10}
                value={avgCustomerValue}
                onChange={(e) => setAvgCustomerValue(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#C7A15A]"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#B7B7B5]/60">
                <span>$10</span>
                <span>$2,500</span>
                <span>$5,000+</span>
              </div>
            </div>

            {/* Input 3: Website Conversion Rate */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className={`text-xs font-mono font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                  Average Conversion Rate (%):
                </label>
                <span className="text-base font-extrabold text-[#C7A15A]">
                  {conversionRate.toFixed(1)}%
                </span>
              </div>
              <input
                type="range"
                min={0.2}
                max={10.0}
                step={0.1}
                value={conversionRate}
                onChange={(e) => setConversionRate(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#C7A15A]"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#B7B7B5]/60">
                <span>0.2%</span>
                <span>5.0%</span>
                <span>10.0%</span>
              </div>
            </div>

            {/* Input 4: Expected AI Citation Traffic Lift */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className={`text-xs font-mono font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                  Expected AI Citation Traffic Lift (%):
                </label>
                <span className="text-base font-extrabold text-[#C7A15A]">
                  +{aiLiftPercentage}%
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={100}
                step={5}
                value={aiLiftPercentage}
                onChange={(e) => setAiLiftPercentage(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#C7A15A]"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#B7B7B5]/60">
                <span>+5% (Conservative)</span>
                <span>+30% (Standard)</span>
                <span>+100% (Aggressive)</span>
              </div>
            </div>

            {/* Input 5: TangentCore Plan Selected */}
            <div className="space-y-2 pt-2">
              <label className={`block text-xs font-mono font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                Select Target TangentCore Plan:
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { name: 'Starter', price: 39 },
                  { name: 'Growth', price: 149 },
                  { name: 'Scale Enterprise', price: 399 },
                ].map((plan) => (
                  <button
                    key={plan.name}
                    type="button"
                    onClick={() => setPlanCost(plan.price)}
                    className={`py-3 px-3 rounded-2xl border text-xs font-bold transition-all ${
                      planCost === plan.price
                        ? 'bg-[#C7A15A]/20 border-[#C7A15A] text-[#C7A15A] shadow-md'
                        : isDark
                        ? 'bg-[#1B1C1F] border-white/10 text-[#B7B7B5] hover:border-white/30'
                        : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#5C5C5C] hover:border-slate-400'
                    }`}
                  >
                    <div>{plan.name}</div>
                    <div className="text-[11px] font-mono opacity-80">${plan.price}/mo</div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Instant Revenue & ROI Results Display (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Projected Revenue Growth Card */}
            <div className="rounded-3xl luxury-gradient-card border border-[#C7A15A]/40 p-6 sm:p-8 space-y-6 shadow-2xl text-white">
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C7A15A]">
                  Projected AI Search Impact
                </span>
                <span className="px-3 py-1 rounded-full bg-[#C7A15A]/20 text-[#C7A15A] border border-[#C7A15A]/40 text-[11px] font-mono font-bold">
                  {roiMultiplier}x ROI Multiplier
                </span>
              </div>

              {/* Big Annual Impact Figure */}
              <div className="space-y-1">
                <span className="text-xs text-[#E5E3DF]/80 uppercase font-mono tracking-wider">
                  Estimated Additional Annual Revenue:
                </span>
                <div className="text-4xl sm:text-5xl font-extrabold champagne-gradient-text tracking-tight">
                  +${Math.round(estimatedAdditionalAnnualRevenue).toLocaleString()}
                </div>
                <p className="text-xs text-[#E5E3DF]/70 pt-1">
                  Based on +{aiLiftPercentage}% AI traffic lift at current {conversionRate}% conversion rate.
                </p>
              </div>

              {/* Additional Breakdown Stat Items */}
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/15">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#B7B7B5]">
                    Monthly Revenue Add:
                  </span>
                  <div className="text-xl font-bold text-white">
                    +${Math.round(estimatedAdditionalMonthlyRevenue).toLocaleString()}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#B7B7B5]">
                    Net Annual Profit:
                  </span>
                  <div className="text-xl font-bold text-[#C7A15A]">
                    +${Math.round(netAnnualProfit).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Direct Action CTA Button */}
              <Link
                href="/pricing"
                className="w-full py-4 px-6 rounded-2xl luxury-btn-primary font-bold text-xs flex items-center justify-center gap-2 shadow-xl hover:scale-[1.02] transition-transform"
              >
                <span>Claim This ROI — Choose Plan</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Breakdown Highlights Box */}
            <div className={`rounded-3xl border ${
              isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'
            } p-6 space-y-4 shadow-xl`}>
              <h4 className={`text-xs font-mono font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                Key ROI Drivers Assumed:
              </h4>

              <div className="space-y-3 text-xs font-medium">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C7A15A] shrink-0 mt-0.5" />
                  <span className={isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}>
                    **Higher Buyer Intent**: Visitors from ChatGPT & Perplexity convert **3.2x faster** than traditional Google searchers.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C7A15A] shrink-0 mt-0.5" />
                  <span className={isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}>
                    **Zero Ad Spend Needed**: Conversational LLM citations act as organic referral endorsements.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C7A15A] shrink-0 mt-0.5" />
                  <span className={isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}>
                    **First-Mover Advantage**: Only 8% of brands optimize for GEO, giving early adopters dominant citation share.
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </main>

      <Footer isDark={isDark} />
    </div>
  );
}
