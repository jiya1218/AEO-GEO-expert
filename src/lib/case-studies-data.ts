export interface CaseStudy {
  slug: string;
  number: string;
  title: string;
  company: string;
  industry: string;
  companySize: string;
  projectDuration: string;
  featured?: boolean;
  heroMetrics: { label: string; value: string }[];
  businessChallenge: string;
  objectives: string[];
  solutionDetails: string;
  results: { metric: string; description: string }[];
  businessImpact: string;
  quote: string;
  author: string;
  authorRole: string;
  role?: string;
  image: string;
}

export const caseStudiesData: CaseStudy[] = [
  {
    slug: 'enterprise-saas-platform',
    number: 'Featured Case Study',
    title: 'Enterprise SaaS Platform: 247% AI Citation Increase & Market Leadership',
    company: 'Enterprise SaaS Platform',
    industry: 'Enterprise Software',
    companySize: '500+ Employees',
    projectDuration: '12 Weeks',
    featured: true,
    heroMetrics: [
      { label: 'AI Citations Increase', value: '+247%' },
      { label: 'AI Visibility Score', value: '+182%' },
      { label: 'ChatGPT Brand Mentions', value: '+221%' },
      { label: 'Qualified Organic Leads', value: '+71%' },
    ],
    businessChallenge: `Although the company maintained strong rankings on traditional search engines, its brand rarely appeared in AI-generated responses across ChatGPT, Gemini, Claude, and Google AI. Prospective customers researching enterprise software were consistently introduced to competing solutions.`,
    objectives: [
      'Increase AI-generated citations across ChatGPT, Perplexity, and Gemini',
      'Improve overall AI Visibility Score and entity authority',
      'Strengthen Knowledge Graph entity relationships for enterprise software',
      'Improve recommendation frequency in competitive evaluation prompts',
      'Benchmark competitor performance and capture market share of voice',
    ],
    solutionDetails: `TangentCore conducted a comprehensive AI Visibility Audit to understand how AI models interpreted the client's brand. The engagement included entity optimization, semantic authority enhancement, structured content improvements, JSON-LD schema auto-repair, citation analysis, competitor displacement benchmarking, and continuous 6-LLM AI visibility monitoring.`,
    results: [
      { metric: '247%', description: 'Increase in AI citations across ChatGPT & Perplexity' },
      { metric: '182%', description: 'Improvement in composite AI Visibility Score' },
      { metric: '221%', description: 'Increase in ChatGPT brand mentions' },
      { metric: '181%', description: 'Increase in Google AI Search Overview visibility' },
      { metric: '71%', description: 'Increase in qualified inbound organic leads' },
    ],
    businessImpact: `Within twelve weeks, the organization established a significantly stronger presence across AI-powered search experiences, resulting in increased brand awareness, improved customer trust, and higher-quality inbound opportunities.`,
    quote: `TangentCore gave our growth team the exact schema blueprint and competitor displacement briefs needed to outrank legacy incumbents across ChatGPT and Perplexity.`,
    author: 'Marcus Vance',
    authorRole: 'VP of Digital Growth',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000',
  },
  {
    slug: 'global-ecommerce-brand',
    number: 'Case Study 02',
    title: 'Global E-Commerce Brand: 168% AI Product Recommendation Growth',
    company: 'Global E-Commerce Brand',
    industry: 'Retail & E-Commerce',
    companySize: '1,000+ Employees',
    projectDuration: '10 Weeks',
    featured: false,
    heroMetrics: [
      { label: 'AI Product Recs', value: '+168%' },
      { label: 'Product Discoverability', value: '+139%' },
      { label: 'AI Brand Mentions', value: '+94%' },
      { label: 'Organic Revenue', value: '+36%' },
    ],
    businessChallenge: `Despite a strong organic presence, the company's products rarely appeared in AI-generated shopping recommendations. Customers using AI assistants for product research were consistently shown competing brands.`,
    objectives: [
      'Increase AI product recommendations during high-intent purchasing prompts',
      'Improve product entity recognition and semantic catalog mapping',
      'Strengthen category authority across retail evaluation queries',
      'Expand AI-driven product discovery across conversational assistants',
    ],
    solutionDetails: `Using AI search intelligence, TangentCore analyzed product entities, structured data quality, category relationships, and recommendation patterns. Product content was enhanced with automated Product and FAQPage JSON-LD schemas to improve AI comprehension and retrieval.`,
    results: [
      { metric: '168%', description: 'Increase in AI product recommendations' },
      { metric: '139%', description: 'Increase in product discoverability' },
      { metric: '94%', description: 'Increase in AI brand mentions' },
      { metric: '36%', description: 'Increase in organic revenue attributed to AI search' },
    ],
    businessImpact: `The brand achieved significantly higher visibility within AI-assisted shopping journeys, helping customers discover products earlier in the buying process.`,
    quote: `We tried traditional SEO agencies for months with zero impact on AI search answers. TangentCore solved our entity mapping issues in 48 hours.`,
    author: 'David Chen',
    role: 'Head of SEO & AEO',
    authorRole: 'Head of SEO & AEO',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=800',
  },
  {
    slug: 'healthcare-technology-platform',
    number: 'Case Study 03',
    title: 'Healthcare Technology Platform: 214% Increase in Authoritative Citations',
    company: 'Healthcare Technology Platform',
    industry: 'Healthcare & Life Sciences',
    companySize: '250+ Employees',
    projectDuration: '14 Weeks',
    featured: false,
    heroMetrics: [
      { label: 'Authoritative Citations', value: '+214%' },
      { label: 'Trust Signals', value: '+152%' },
      { label: 'Healthcare Visibility', value: '+81%' },
      { label: 'Qualified Traffic', value: '+59%' },
    ],
    businessChallenge: `Healthcare content requires strong authority and trust signals. While the organization produced medically reviewed content, AI platforms rarely referenced it in healthcare-related responses.`,
    objectives: [
      'Strengthen AI trust signals and medical entity validation',
      'Increase authoritative citations in clinical & diagnostic queries',
      'Improve healthcare visibility across medical evaluation prompts',
      'Expand Knowledge Graph coverage for core therapeutic areas',
    ],
    solutionDetails: `TangentCore enhanced semantic relationships, strengthened entity authority, optimized structured medical content with MedicalWebPage schemas, and continuously monitored AI-generated healthcare responses.`,
    results: [
      { metric: '214%', description: 'Increase in AI citations across clinical search prompts' },
      { metric: '152%', description: 'Improvement in verified trust signals' },
      { metric: '81%', description: 'Increase in overall healthcare visibility' },
      { metric: '59%', description: 'Increase in qualified traffic' },
    ],
    businessImpact: `The organization became a more trusted source across AI-powered healthcare searches, improving both discoverability and user confidence.`,
    quote: `TangentCore gave our medical communications team complete visibility into how AI models cite our clinical research.`,
    author: 'Elena Rostova',
    role: 'Chief Marketing Officer',
    authorRole: 'Chief Marketing Officer',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
  },
  {
    slug: 'financial-services-organisation',
    number: 'Case Study 04',
    title: 'Financial Services Organisation: 198% Expansion in AI Mentions',
    company: 'Financial Services Organisation',
    industry: 'Financial Services',
    companySize: 'Enterprise',
    projectDuration: '11 Weeks',
    featured: false,
    heroMetrics: [
      { label: 'AI Mentions Growth', value: '+198%' },
      { label: 'Citation Coverage', value: '+146%' },
      { label: 'Recommendation Freq', value: '+63%' },
      { label: 'Qualified Enquiries', value: '+52%' },
    ],
    businessChallenge: `Customers increasingly relied on AI assistants for financial research, yet competitors consistently appeared in AI-generated recommendations while the client's brand remained largely absent.`,
    objectives: [
      'Improve AI recommendation frequency for wealth & fintech queries',
      'Increase financial entity authority and compliance vector density',
      'Benchmark competitors across high-value commercial financial prompts',
      'Improve entity recognition across enterprise banking categories',
    ],
    solutionDetails: `TangentCore implemented an enterprise GEO strategy focused on competitor intelligence, semantic optimization, authority development, and continuous AI citation monitoring.`,
    results: [
      { metric: '198%', description: 'Increase in AI mentions across financial prompts' },
      { metric: '146%', description: 'Growth in citation coverage across Perplexity and Gemini' },
      { metric: '63%', description: 'Increase in recommendation frequency' },
      { metric: '52%', description: 'Increase in qualified inbound sales enquiries' },
    ],
    businessImpact: `The company established a stronger competitive position within AI-generated financial recommendations, leading to greater visibility and customer engagement.`,
    quote: `Our enterprise banking team captured prime recommendation spots in ChatGPT within 60 days of deploying TangentCore.`,
    author: 'Robert Sterling',
    role: 'Managing Director',
    authorRole: 'Managing Director',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800',
  },
  {
    slug: 'education-technology-company',
    number: 'Case Study 05',
    title: 'Education Technology Company: 176% Growth in AI References',
    company: 'Education Technology Company',
    industry: 'Education Technology',
    companySize: '150+ Employees',
    projectDuration: '9 Weeks',
    featured: false,
    heroMetrics: [
      { label: 'AI References', value: '+176%' },
      { label: 'Educational Citations', value: '+104%' },
      { label: 'Organic Visibility', value: '+69%' },
      { label: 'Learner Registrations', value: '+57%' },
    ],
    businessChallenge: `Although the platform published thousands of educational resources, AI assistants rarely referenced its content during learning-related queries.`,
    objectives: [
      'Improve educational authority and curriculum entity structure',
      'Increase AI references across learning evaluation queries',
      'Expand entity coverage for technical skills and course catalogs',
      'Improve discoverability across student and instructor prompts',
    ],
    solutionDetails: `The optimization strategy focused on strengthening topical authority, educational entities, structured learning content with Course and FAQ schemas, and semantic relevance for AI retrieval.`,
    results: [
      { metric: '176%', description: 'Increase in AI references' },
      { metric: '104%', description: 'Increase in educational citations' },
      { metric: '69%', description: 'Growth in organic visibility' },
      { metric: '57%', description: 'Increase in learner registrations' },
    ],
    businessImpact: `Educational resources became significantly more discoverable through AI-powered learning experiences, resulting in increased engagement and enrolments.`,
    quote: `Our platform course catalog became the primary citation source for tech skill prompts in Perplexity.`,
    author: 'Sarah Jenkins',
    role: 'Head of Content',
    authorRole: 'Head of Content',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800',
  },
  {
    slug: 'manufacturing-enterprise',
    number: 'Case Study 06',
    title: 'Manufacturing Enterprise: 189% Lift in Technical Visibility',
    company: 'Manufacturing Enterprise',
    industry: 'Manufacturing & Industrial',
    companySize: 'Global Enterprise',
    projectDuration: '13 Weeks',
    featured: false,
    heroMetrics: [
      { label: 'Technical Visibility', value: '+189%' },
      { label: 'AI References', value: '+143%' },
      { label: 'Procurement Recs', value: '+84%' },
      { label: 'Enterprise Enquiries', value: '+46%' },
    ],
    businessChallenge: `Technical documentation and product specifications were difficult for AI systems to interpret, reducing visibility during industrial research and procurement queries.`,
    objectives: [
      'Improve technical discoverability for complex machinery & components',
      'Increase AI citations in B2B procurement queries',
      'Enhance product knowledge graph parsing',
      'Improve procurement visibility across global buyer prompts',
    ],
    solutionDetails: `TangentCore optimized technical documentation, strengthened product entities, improved semantic structure, and continuously monitored AI visibility across enterprise search platforms.`,
    results: [
      { metric: '189%', description: 'Increase in technical visibility' },
      { metric: '143%', description: 'Increase in AI references' },
      { metric: '84%', description: 'Increase in procurement recommendations' },
      { metric: '46%', description: 'Increase in enterprise enquiries' },
    ],
    businessImpact: `The organization achieved stronger visibility throughout AI-assisted procurement and industrial research journeys, helping enterprise buyers identify its solutions more effectively.`,
    quote: `TangentCore enabled our global engineering team to standardize technical schema data so ChatGPT parses our specs accurately.`,
    author: 'Hans Weber',
    role: 'VP of Procurement Technology',
    authorRole: 'VP of Procurement Technology',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
  },
];
