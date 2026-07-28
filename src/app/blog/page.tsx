'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Search, Calendar, Clock, ArrowRight, Sparkles, Tag, 
  Brain, Bot, ShieldCheck, TrendingUp, BookOpen, ChevronRight, User, Send, CheckCircle2
} from 'lucide-react';
import { AiBackground } from '@/components/ui/ai-background';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { BrandLogo } from '@/components/ui/brand-logo';
import { Footer } from '@/components/footer';
import { blogPostsData } from '@/lib/blog-data';

export default function BlogPage() {
  const [isDark, setIsDark] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const categories = ['All', 'AI Search', 'GEO Strategy', 'AEO Strategy', 'AI Visibility', 'Schema Engineering', 'Industry Research'];

  const filteredPosts = useMemo(() => {
    return blogPostsData.filter((post) => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = blogPostsData.find((p) => p.featured) || blogPostsData[0];

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

      {/* Navigation Bar */}
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
              <span>Launch Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 w-full">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-mono font-bold bg-[#121315] border-white/10 text-[#C7A15A]">
            <BookOpen className="w-3.5 h-3.5 text-[#C7A15A]" />
            <span>INSIGHTS ON AI SEARCH & GEO</span>
          </div>
          <h1 className={`text-4xl sm:text-6xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#181818]'}`}>
            The Enterprise GEO <span className="champagne-gradient-text">Knowledge Hub</span>
          </h1>
          <p className={`text-base sm:text-lg ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
            Stay ahead of the rapidly evolving AI search landscape with expert insights, industry research, and practical guides from TangentCore.
          </p>
        </div>

        {/* Featured Article Card */}
        {selectedCategory === 'All' && !searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-16 p-8 sm:p-12 rounded-3xl border ${
              isDark ? 'bg-[#1B1C1F] border-white/10 hover-luxury-lift' : 'bg-white border-[#E5E3DF] shadow-2xl'
            } grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden`}
          >
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#C7A15A]/15 text-[#C7A15A] text-xs font-mono font-bold uppercase">
                  Featured Article
                </span>
                <span className={`text-xs font-mono ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
                  {featuredPost.date} • {featuredPost.readTime}
                </span>
              </div>

              <h2 className={`text-2xl sm:text-4xl font-extrabold leading-tight ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                <Link href={`/blog/${featuredPost.slug}`} className="hover:text-[#C7A15A] transition-colors">
                  {featuredPost.title}
                </Link>
              </h2>

              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
                {featuredPost.excerpt}
              </p>

              <div className="flex items-center gap-4 pt-2">
                <img
                  src={featuredPost.authorAvatar}
                  alt={featuredPost.author}
                  className="w-10 h-10 rounded-full object-cover border border-[#C7A15A]"
                />
                <div>
                  <h4 className="text-xs font-bold text-[#C7A15A]">{featuredPost.author}</h4>
                  <span className={`text-[11px] ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>{featuredPost.authorRole}</span>
                </div>
              </div>

              <div>
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl luxury-btn-primary font-bold text-xs shadow-lg shadow-[#C7A15A]/20"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-72 lg:h-96 object-cover rounded-2xl border border-white/10 shadow-xl"
              />
            </div>
          </motion.div>
        )}

        {/* Filter Controls & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#C7A15A] text-[#111111] shadow-md'
                    : isDark
                    ? 'bg-[#121315] text-[#B7B7B5] hover:text-white border border-white/10'
                    : 'bg-[#F6F5F3] text-[#5C5C5C] hover:text-[#181818] border border-[#E5E3DF]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B7B7B5]" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs font-mono transition-all ${
                isDark
                  ? 'bg-[#121315] border-white/10 text-white placeholder-[#B7B7B5]/60 focus:border-[#C7A15A]'
                  : 'bg-white border-[#E5E3DF] text-[#181818] placeholder-[#5C5C5C]/60 focus:border-[#B87333]'
              } outline-none`}
            />
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredPosts.map((post) => (
            <motion.article
              key={post.slug}
              whileHover={{ y: -6 }}
              className={`rounded-3xl border ${
                isDark ? 'bg-[#1B1C1F] border-white/10 hover-luxury-lift' : 'bg-white border-[#E5E3DF] shadow-xl'
              } overflow-hidden flex flex-col justify-between`}
            >
              <div>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover border-b border-white/10"
                />
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#B87333]/15 text-[#C7A15A] font-bold">
                      {post.category}
                    </span>
                    <span className={isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}>{post.readTime}</span>
                  </div>

                  <h3 className={`text-lg font-bold leading-snug ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                    <Link href={`/blog/${post.slug}`} className="hover:text-[#C7A15A] transition-colors">
                      {post.title}
                    </Link>
                  </h3>

                  <p className={`text-xs leading-relaxed ${isDark ? 'text-[#B7B7B5]' : 'text-[#5C5C5C]'}`}>
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-white/10 mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5 pt-3">
                  <img
                    src={post.authorAvatar}
                    alt={post.author}
                    className="w-8 h-8 rounded-full object-cover border border-[#C7A15A]"
                  />
                  <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-[#181818]'}`}>
                    {post.author}
                  </span>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-mono font-bold text-[#C7A15A] hover:underline flex items-center gap-1"
                >
                  Read <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Newsletter In-Page Subscribe Banner */}
        <div className="p-8 sm:p-12 rounded-3xl border border-[#C7A15A]/40 bg-[#121315] space-y-6 text-center">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-white">Stay Ahead of AI Search</h2>
            <p className="text-xs sm:text-sm text-[#B7B7B5]">
              Receive expert insights, research reports, and practical strategies to improve your AI visibility—delivered directly to your inbox.
            </p>
          </div>

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
