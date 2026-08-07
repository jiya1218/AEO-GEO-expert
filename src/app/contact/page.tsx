'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Mail, Phone, Clock, Send, CheckCircle2, Building2, HelpCircle, ShieldCheck, ArrowRight 
} from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AiBackground } from '@/components/ui/ai-background';
import { ScrollProgress } from '@/components/ui/scroll-progress';

export default function ContactPage() {
  const { isDark } = useTheme();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !message) {
      toast.error('Please fill out all required fields.');
      return;
    }
    setSubmitted(true);
    toast.success('Thank you! Your message has been sent to our team.');
  };

  const contacts = [
    { label: 'Sales Enquiries', email: 'tangentcoreindia@gmail.com', desc: 'Interested in TangentCore for your organisation?' },
    { label: 'Customer Support', email: 'tangentcoreindia@gmail.com', desc: 'Need help using the platform or dashboard?' },
    { label: 'Technical Support', email: 'tangentcoreindia@gmail.com', desc: 'Questions about REST API or webhooks?' },
    { label: 'Enterprise Solutions', email: 'tangentcoreindia@gmail.com', desc: 'Discuss custom enterprise deployments & SSO.' },
  ];

  return (
    <div className={`min-h-screen flex flex-col font-sans relative transition-colors duration-500 ${
      isDark ? 'bg-[#0B0B0C] text-[#F6F6F4]' : 'bg-[#FCFCFB] text-[#181818]'
    }`}>
      <ScrollProgress />
      <AiBackground isDark={isDark} />
      <Navbar ctaText="Book a Demo" ctaHref="#contact-form" />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-xs font-mono font-bold ${
            isDark ? 'bg-[#121315] border-white/10 text-[#C7A15A]' : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#B87333]'
          } shadow-sm`}>
            <Mail className="w-3.5 h-3.5 text-[#C7A15A]" />
            <span className="uppercase tracking-wider">CONTACT TANGENTCORE</span>
          </div>

          <h1 className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#181818]'}`}>
            We'd Love to Hear From You
          </h1>

          <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
            Whether you have questions about the platform, pricing, partnerships, enterprise deployments, or technical support, our team is here to help.
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contacts.map((c) => (
            <div
              key={c.label}
              className={`p-6 rounded-3xl border ${
                isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'
              } space-y-3 shadow-xl`}
            >
              <span className="text-sm font-bold text-white block">{c.label}</span>
              <p className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>{c.desc}</p>
              <a
                href={`mailto:${c.email}`}
                className="text-xs font-mono font-bold text-[#C7A15A] hover:underline flex items-center gap-1 pt-1"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{c.email}</span>
              </a>
            </div>
          ))}
        </div>

        {/* Contact Form & Hours */}
        <div id="contact-form" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Column */}
          <div className={`lg:col-span-8 p-8 sm:p-10 rounded-3xl border ${
            isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'
          } space-y-6 shadow-2xl`}>
            <h2 className="text-2xl font-bold">Send Us a Message</h2>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-[#C7A15A]/15 border border-[#C7A15A]/40 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#C7A15A] mx-auto" />
                <h3 className="text-xl font-bold text-white">Message Sent Successfully!</h3>
                <p className="text-xs text-[#E5E3DF]/80">
                  Thank you for reaching out. A TangentCore representative will respond to <strong>{email}</strong> within 1 business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className={`block text-xs font-mono font-bold uppercase ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Jane Doe"
                      className={`w-full ${
                        isDark ? 'bg-[#1B1C1F] border-white/10 text-white' : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#181818]'
                      } border rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#C7A15A]`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className={`block text-xs font-mono font-bold uppercase ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@company.com"
                      className={`w-full ${
                        isDark ? 'bg-[#1B1C1F] border-white/10 text-white' : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#181818]'
                      } border rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#C7A15A]`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className={`block text-xs font-mono font-bold uppercase ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Acme Corp"
                      className={`w-full ${
                        isDark ? 'bg-[#1B1C1F] border-white/10 text-white' : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#181818]'
                      } border rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#C7A15A]`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className={`block text-xs font-mono font-bold uppercase ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                      Subject
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Product Demo / Enterprise Inquiry"
                      className={`w-full ${
                        isDark ? 'bg-[#1B1C1F] border-white/10 text-white' : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#181818]'
                      } border rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#C7A15A]`}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className={`block text-xs font-mono font-bold uppercase ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your team's AI visibility requirements..."
                    className={`w-full ${
                      isDark ? 'bg-[#1B1C1F] border-white/10 text-white' : 'bg-[#F6F5F3] border-[#E5E3DF] text-[#181818]'
                    } border rounded-2xl p-4 text-sm focus:outline-none focus:border-[#C7A15A]`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-2xl luxury-btn-primary font-bold text-xs flex items-center justify-center gap-2 shadow-xl hover:scale-[1.02] transition-transform"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Office Hours Column */}
          <div className={`lg:col-span-4 p-8 rounded-3xl border ${
            isDark ? 'bg-[#121315] border-white/10' : 'bg-white border-[#E5E3DF]'
          } space-y-6 shadow-xl`}>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#C7A15A] uppercase">
                <Clock className="w-4 h-4" />
                <span>Office Hours</span>
              </div>
              <h3 className="text-xl font-bold">Support Hours</h3>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-white font-bold">Monday – Friday</span>
                <span className="text-[#C7A15A]">9:00 AM – 6:00 PM (IST)</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-white font-bold">Saturday</span>
                <span className="text-[#C7A15A]">10:00 AM – 2:00 PM (IST)</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-white font-bold">Sunday</span>
                <span className="text-rose-400">Closed</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <span className="text-xs font-bold text-white block">Response SLA</span>
              <p className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
                Our team aims to respond to all sales and support enquiries within 1 business day.
              </p>
            </div>
          </div>

        </div>

      </main>

      <Footer isDark={isDark} />
    </div>
  );
}
