export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  featured?: boolean;
  image: string;
  content: string;
  takeaways: string[];
}

export const blogPostsData: BlogPost[] = [
  {
    slug: 'the-future-of-search-has-changed',
    title: 'The Future of Search Has Changed: Why AI Visibility Matters More Than Traditional Rankings',
    excerpt: 'Artificial Intelligence is fundamentally changing how people discover information. Instead of browsing through pages of search results, users now ask questions directly to AI assistants.',
    category: 'AI Search',
    date: 'July 26, 2026',
    readTime: '8 min read',
    author: 'Dr. Alistair Vance',
    authorRole: 'Chief AI Strategist',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    featured: true,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000',
    takeaways: [
      '68% of enterprise research queries now start inside conversational AI assistants rather than standard search engines.',
      'AI search models synthesize brand data from Knowledge Graphs, schema markup, and high-authority entity citations.',
      'Generative Engine Optimization (GEO) ensures your brand is recommended in conversational answers.',
    ],
    content: `Artificial Intelligence is fundamentally changing how people discover information. Instead of browsing through pages of search results, users now ask questions directly to AI assistants and receive immediate answers.

This shift means brands are no longer competing only for search rankings—they are competing to become trusted sources that AI systems recognize, understand, and recommend.

### Why Traditional SEO Is No Longer Enough
Traditional search engine optimization focuses on keyword density, backlinks, and SERP positions. However, LLMs like ChatGPT, Gemini, Perplexity, and Claude operate on vector embeddings, semantic relationships, and entity authority.

When a user asks: "What are the top enterprise SaaS security platforms with SOC2 compliance?", ChatGPT does not display 10 blue links. It generates a synthesized response citing 2 or 3 recommended solutions.

### The Rise of Generative Engine Optimization (GEO)
Generative Engine Optimization (GEO) is the discipline of structuring your brand data, JSON-LD schemas, and digital footprint so that AI search engines parse your brand as the authoritative answer.

To build strong AI visibility, enterprise organizations must focus on:
1. **Entity Density**: Clearly defining your organization, products, and executives in structured Knowledge Graph schemas.
2. **Semantic Citation Authority**: Ensuring third-party review sites, press releases, and technical documentation use unambiguous entity terms.
3. **Continuous LLM Benchmarking**: Tracking your Share of Voice (SoV) across ChatGPT, Gemini, Perplexity, Claude, DeepSeek, and Grok.`,
  },
  {
    slug: 'how-chatgpt-decides-which-brands-to-recommend',
    title: 'How ChatGPT Decides Which Brands to Recommend',
    excerpt: 'Understand the signals that influence brand recommendations inside ChatGPT and learn how organizations can strengthen their AI authority.',
    category: 'GEO Strategy',
    date: 'July 22, 2026',
    readTime: '7 min read',
    author: 'Elena Rostova',
    authorRole: 'Head of Vector Architecture',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    featured: false,
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800',
    takeaways: [
      'ChatGPT parses semantic proximity between user intent vectors and brand Knowledge Graph entities.',
      'Structured JSON-LD FAQPage and Product schemas increase citation likelihood by over 3.4x.',
      'Real-time web browsing models evaluate source freshiness and domain credibility.',
    ],
    content: `When a user prompts ChatGPT for brand or vendor recommendations, OpenAI's retrieval-augmented generation (RAG) pipeline queries both internal pre-trained weights and live web search indices.

### The 3 Core Recommendation Signals
1. **Knowledge Graph Proximity**: How closely connected your brand entity is to the requested topic in structured data graphs.
2. **Schema Verification**: Valid JSON-LD markup that enables instant deterministic extraction of key features, pricing, and compliance details.
3. **Consensus Attribution**: Consistent brand claims verified across multiple reputable digital sources.`,
  },
  {
    slug: 'geo-vs-seo-understanding-the-difference',
    title: 'GEO vs SEO: Understanding the Difference',
    excerpt: 'Traditional SEO helps you rank on search engines. GEO helps your brand become part of AI-generated answers. Learn how these strategies complement each other.',
    category: 'AEO Strategy',
    date: 'July 15, 2026',
    readTime: '6 min read',
    author: 'David Chen',
    authorRole: 'Senior GEO Lead',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    featured: false,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
    takeaways: [
      'SEO targets keyword SERP ranks; GEO targets AI model answer synthesis.',
      'GEO prioritizes entity relationships, schema auto-repair, and vector density.',
      'Combining SEO and GEO creates total search engine and answer engine coverage.',
    ],
    content: `While SEO focuses on driving clicks from traditional search result pages, GEO focuses on ensuring your brand is cited inside direct AI answers.

As AI Overviews and conversational assistants become the default interface for digital discovery, organizations that optimize for both SEO and GEO achieve market dominance.`,
  },
  {
    slug: 'measuring-ai-visibility-metrics',
    title: 'Measuring AI Visibility: Metrics Every Marketing Team Should Track',
    excerpt: 'Explore the key performance indicators that help organizations understand their presence across AI-powered search platforms.',
    category: 'AI Visibility',
    date: 'July 10, 2026',
    readTime: '9 min read',
    author: 'Dr. Alistair Vance',
    authorRole: 'Chief AI Strategist',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    featured: false,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800',
    takeaways: [
      'Share of Voice (SoV) across all 6 major LLM search engines.',
      'AI Recommendation Rank & Citation Frequency.',
      'Schema Validity Score & Entity Density index.',
    ],
    content: `To effectively manage AI search performance, marketing and growth teams must transition from measuring keyword rankings to tracking AI Visibility Metrics.

TangentCore provides real-time Share of Voice benchmarking across ChatGPT, Gemini, Perplexity, Claude, DeepSeek, and Grok.`,
  },
  {
    slug: 'why-structured-data-matters-for-ai-search',
    title: 'Why Structured Data Matters for AI Search',
    excerpt: 'Discover how structured information improves AI comprehension, enhances entity recognition, and increases the likelihood of being cited in AI-generated responses.',
    category: 'Schema Engineering',
    date: 'July 04, 2026',
    readTime: '5 min read',
    author: 'Elena Rostova',
    authorRole: 'Head of Vector Architecture',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    featured: false,
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
    takeaways: [
      'JSON-LD schemas eliminate ambiguity for LLM crawlers parsing complex web pages.',
      'Automated schema repair fixes broken syntax before AI models index your site.',
    ],
    content: `Structured JSON-LD schema markup acts as a universal translator between your website content and AI search engine neural networks. Valid schemas guarantee that AI models accurately extract product specifications, executive bios, and company FAQs.`,
  },
  {
    slug: 'ai-search-trends-2026',
    title: 'AI Search Trends Every Enterprise Should Watch in 2026',
    excerpt: 'From conversational search to multimodal AI experiences, explore the trends reshaping digital visibility and customer discovery.',
    category: 'Industry Research',
    date: 'June 28, 2026',
    readTime: '10 min read',
    author: 'David Chen',
    authorRole: 'Senior GEO Lead',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    featured: false,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    takeaways: [
      'Multimodal search engines analyzing video, audio, and visual assets alongside text.',
      'Autonomous AI purchasing agents selecting software vendors based on GEO citations.',
    ],
    content: `As AI models evolve into autonomous purchasing agents, being recommended in AI search overviews directly dictates enterprise deal flow and customer acquisition efficiency.`,
  },
];
