'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ShieldCheck, Zap, Lock, CreditCard, Sparkles, ArrowRight, Building2, Mail, Globe, Calendar } from 'lucide-react';
import { toast } from 'sonner';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  planPrice: string;
  isAnnual: boolean;
  isDark?: boolean;
}

export function CheckoutModal({ isOpen, onClose, planPrice, isAnnual, isDark = true }: CheckoutModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    companyName: '',
    websiteUrl: '',
    targetKeywords: 'GEO Optimization, AI Search Citations',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast.success(`Success! Priority onboarding reserved for ${formData.companyName || 'your brand'}.`);
    }, 1200);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className={`relative w-full max-w-xl rounded-3xl border ${
            isDark ? 'bg-slate-900 border-slate-800 text-white shadow-2xl shadow-cyan-500/10' : 'bg-white border-slate-200 text-slate-900 shadow-2xl'
          } p-6 sm:p-8 z-10 overflow-hidden`}
        >
          {/* Top Gradient Accents */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600" />
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className={`absolute top-5 right-5 p-2 rounded-xl border ${
              isDark ? 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white' : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
            } transition-colors`}
          >
            <X className="w-4 h-4" />
          </button>

          {isSuccess ? (
            <div className="py-8 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black">GEO Dominator Pass Activated!</h3>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'} max-w-md mx-auto`}>
                  Thank you, <span className="text-cyan-400 font-semibold">{formData.fullName}</span>. Your Dedicated GEO AI Strategist has been assigned. Check <span className="font-semibold">{formData.email}</span> for your instant login credentials and 24-hour scan setup.
                </p>
              </div>

              <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'} text-left text-xs space-y-2 max-w-md mx-auto`}>
                <div className="flex justify-between">
                  <span className="text-slate-400">Selected Plan:</span>
                  <span className="font-bold text-cyan-400">Enterprise GEO Dominator Suite</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Billing Term:</span>
                  <span className="font-semibold text-slate-200">{isAnnual ? 'Annual ($3,599/mo billed annually)' : 'Monthly ($4,499/mo)'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Brand URL:</span>
                  <span className="font-semibold text-slate-200">{formData.websiteUrl || 'Instant Setup'}</span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Flagship Enterprise Tier</span>
                </div>
                <h3 className={`text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Subscribe to Enterprise GEO Suite
                </h3>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Instant 6-LLM Citation Audit, Automated Schema Injection & Dedicated AI Strategist.
                </p>
              </div>

              {/* Price Summary Banner */}
              <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'} flex items-center justify-between`}>
                <div>
                  <span className={`text-xs uppercase tracking-wider block font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Total Investment</span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className={`text-2xl font-black bg-gradient-to-r ${isDark ? 'from-white to-cyan-300' : 'from-slate-900 to-cyan-600'} bg-clip-text text-transparent`}>
                      {planPrice}
                    </span>
                    <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>/ month</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    14-Day Money-Back Guarantee
                  </span>
                  <span className="block text-[11px] text-slate-500 mt-1">Cancel anytime • Instant activation</span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'} flex items-center gap-1.5`}>
                      <span>Full Name</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Alex Morgan"
                      className={`w-full text-xs px-3.5 py-3 rounded-xl border ${
                        isDark ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500 focus:border-cyan-500' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-cyan-500'
                      } focus:outline-none transition-colors`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'} flex items-center gap-1.5`}>
                      <Mail className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Work Email</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className={`w-full text-xs px-3.5 py-3 rounded-xl border ${
                        isDark ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500 focus:border-cyan-500' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-cyan-500'
                      } focus:outline-none transition-colors`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'} flex items-center gap-1.5`}>
                      <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Company Name</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="Acme Corp"
                      className={`w-full text-xs px-3.5 py-3 rounded-xl border ${
                        isDark ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500 focus:border-cyan-500' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-cyan-500'
                      } focus:outline-none transition-colors`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'} flex items-center gap-1.5`}>
                      <Globe className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Website Domain</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.websiteUrl}
                      onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                      placeholder="acme.com"
                      className={`w-full text-xs px-3.5 py-3 rounded-xl border ${
                        isDark ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500 focus:border-cyan-500' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-cyan-500'
                      } focus:outline-none transition-colors`}
                    />
                  </div>
                </div>

                {/* Secure Trust Footer */}
                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    <span>256-Bit SSL Encrypted Checkout</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>SOC2 Certified Data Center</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-sm shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Activating Priority Pass...
                    </span>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 fill-current text-white" />
                      <span>Subscribe Now & Start Instant Scan ({planPrice}/mo)</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
