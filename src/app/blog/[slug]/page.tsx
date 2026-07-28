'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Calendar, Clock, Share2, Sparkles, Check, 
  ArrowRight, BookOpen, User, Tag, Send, CheckCircle2
} from 'lucide-react';
import { AiBackground } from '@/components/ui/ai-background';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { BrandLogo } from '@/components/ui/brand-logo';
import { Footer } from '@/components/footer';
import { blogPostsData } from '@/lib/blog-data';

export default function BlogDetailPage() {
  const [isDark, setIsDark] = useState(true);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  
  const params = useParams();
  const slug = params?.slug as string;

  const post = blogPostsData.find((p) => p.slug === slug) || blogPostsData[0];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans relative overflow-hidden transition-colors duration-500 ${isDark ? 'bg-[#0B0B0C] text-[#F6F6F4]' : 'bg-[#FCFCFB] text-[#181818]'}`}>
      <ScrollProgress />
      <AiBackground isDark={isDark} />

      {/* Navigation Header */}
      <nav className={`border-b ${isDark ? 'border-white/10 bg-[#0B0B0C]/85' : 'border-[#E5E3DF] bg-[#FCFCFB]/85'} backdrop-blur-2xl sticky top-0 z-40 transition-colors`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <BrandLogo isDark={isDark} size="md" subtitle="INTELLIGENT ROUTING ENGINE" />

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-8 text-xs font-bold tracking-wide uppercase">
              <Link href="/" className={`${isDark ? 'text-[#B7B7B5] hover:text-white' : 'text-[#5C5C5C] hover:text-[#181818]'} transition-colors`}>
                Home
              </Link>
              <Link href="/pricing" className={`${isDark ? 'text-[#B7B7B5] hover:text-white' : 'text-[#5C5C5C] hover:text-[#181818]'} transition-colors`}>
                Pricing
              </Link>
              <Link href="/case-studies" className={`${isDark ? 'text-[#B7B7B5] hover:text-white' : 'text-[#5C5C5C] hover:text-[#181818]'} transition-colors`}>
                Case Studies
              </Link>
              <Link href="/blog" className={`${isDark ? 'text-[#C7A15A] font-extrabold border-b-2 border-[#C7A15A]' : 'text-[#B87333] font-extrabold border-b-2 border-[#B87333]'} py-1`}>
                Blog
              </Link>
              <Link href="/dashboard" className={`${isDark ? 'text-[#B7B7B5] hover:text-white' : 'text-[#5C5C5C] hover:text-[#181818]'} transition-colors`}>
                Dashboard
              </Link>
            </div>

            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2.5 rounded-2xl border ${isDark ? 'bg-[#121315] border-white/10 text-[#C7A15A]' : 'bg-white border-[#E5E3DF] text-[#B87333]'} transition-all text-xs font-bold flex items-center gap-2`}
            >
              <span>{isDark ? 'Light' : 'Dark'}</span>
            </button>

            <Link
              href="/dashboard"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl luxury-btn-primary font-bold text-xs shadow-lg shadow-[#C7A15A]/20"
            >
              <span>Audit Your Brand</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Article Content Container */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 w-full">
        
        {/* Back Link */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#C7A15A] hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </Link>

        {/* Article Meta */}
        <div className="space-y-6 mb-10">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-[#C7A15A]/15 text-[#C7A15A] text-xs font-mono font-bold uppercase">
              {post.category}
            </span>
            <span className={`text-xs font-mono ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
              {post.date} • {post.readTime}
            </span>
          </div>

          <h1 className={`text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight ${isDark ? 'text-white' : 'text-[#181818]'}`}>
            {post.title}
          </h1>

          {/* Author Block */}
          <div className="flex items-center gap-4 pt-4 border-t border-white/10">
            <img
              src={post.authorAvatar}
              alt={post.author}
              className="w-12 h-12 rounded-full object-cover border-2 border-[#C7A15A]"
            />
            <div>
              <h4 className="text-sm font-bold text-[#C7A15A]">{post.author}</h4>
              <span className={`text-xs ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>{post.authorRole}</span>
            </div>
          </div>
        </div>

        {/* Hero Featured Image */}
        <div className="mb-12 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-80 sm:h-96 object-cover"
          />
        </div>

        {/* Key Takeaways Box */}
        {post.takeaways && post.takeaways.length > 0 && (
          <div className={`p-8 rounded-3xl border ${isDark ? 'bg-[#1B1C1F] border-white/10' : 'bg-white border-[#E5E3DF] shadow-xl'} mb-12 space-y-4`}>
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#C7A15A] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C7A15A]" />
              <span>Key Executive Takeaways</span>
            </h3>
            <ul className="space-y-3">
              {post.takeaways.map((t, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm">
                  <div className="w-5 h-5 rounded-md bg-[#C7A15A] text-[#111111] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className={isDark ? 'text-[#F6F6F4]' : 'text-[#181818]'}>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Article Body */}
        <div className={`prose max-w-none ${isDark ? 'prose-invert text-[#F6F6F4]' : 'text-[#181818]'} space-y-6 text-sm sm:text-base leading-relaxed`}>
          {post.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Newsletter In-Article Subscribe Box */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl border border-[#C7A15A]/40 bg-[#121315] space-y-4 text-center">
          <h3 className="text-xl font-extrabold text-white">Subscribe to Enterprise GEO Intelligence</h3>
          <p className="text-xs text-[#B7B7B5] max-w-md mx-auto">
            Receive weekly breakdowns of changes in ChatGPT, Perplexity, and Gemini search citation algorithms directly to your inbox.
          </p>

          {subscribed ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#C7A15A]/15 text-[#C7A15A] text-xs font-mono font-bold border border-[#C7A15A]/30">
              <CheckCircle2 className="w-4 h-4" />
              <span>Successfully subscribed to GEO Insights!</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter work email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:w-72 px-4 py-3 rounded-2xl bg-[#0B0B0C] border border-white/10 text-xs font-mono text-white outline-none focus:border-[#C7A15A]"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-2xl luxury-btn-primary font-bold text-xs shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>

      </main>

      <Footer isDark={isDark} />
    </div>
  );
}
