import * as cheerio from 'cheerio';

export interface PageGeoAuditResult {
  url: string;
  domain: string;
  title: string;
  description: string;
  overallGeoScore: number;
  schemaScore: number;
  citationScore: number;
  entityScore: number;
  readabilityScore: number;
  detectedSchemas: string[];
  hasFaqSchema: boolean;
  hasOrganizationSchema: boolean;
  hasProductSchema: boolean;
  h1Tags: string[];
  h2Tags: string[];
  entityKeywords: string[];
  autoDiscoveredKeywords: string[];
  autoDiscoveredCompetitors: string[];
  recommendations: string[];
}

export async function analyzePageGeo(targetUrl: string, userKeywords: string[] = [], userCompetitors: string[] = []): Promise<PageGeoAuditResult> {
  const cleanUrl = targetUrl.startsWith('http') ? targetUrl : `https://${targetUrl}`;
  const domain = new URL(cleanUrl).hostname.replace(/^www\./, '');

  let html = '';
  try {
    const res = await fetch(cleanUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Compatible; AeoGeoBot/1.0; +https://aeogeo.expert)',
      },
      signal: AbortSignal.timeout(10000),
    });
    if (res.ok) {
      html = await res.text();
    }
  } catch (err) {
    console.warn(`Failed to fetch ${cleanUrl}, running algorithmic fallback analysis`, err);
  }

  if (!html) {
    return generateBaselineAudit(cleanUrl, domain, userKeywords, userCompetitors);
  }

  const $ = cheerio.load(html);

  const title = $('title').text().trim() || domain;
  const description = $('meta[name="description"]').attr('content')?.trim() || '';

  // 1. Detect Schemas (JSON-LD)
  const detectedSchemas: string[] = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const json = JSON.parse($(el).html() || '{}');
      const types = Array.isArray(json) 
        ? json.map(j => j['@type']) 
        : [json['@type'] || json['@graph']?.map((g: any) => g['@type'])];
      
      types.flat().filter(Boolean).forEach(t => {
        if (typeof t === 'string' && !detectedSchemas.includes(t)) {
          detectedSchemas.push(t);
        }
      });
    } catch {
      // Ignore JSON parse errors
    }
  });

  const hasFaqSchema = detectedSchemas.some(s => s.toLowerCase().includes('faq'));
  const hasOrganizationSchema = detectedSchemas.some(s => s.toLowerCase().includes('organization'));
  const hasProductSchema = detectedSchemas.some(s => s.toLowerCase().includes('product'));

  // 2. Extract Headings & Entities
  const h1Tags: string[] = [];
  $('h1').each((_, el) => {
    const text = $(el).text().trim();
    if (text) h1Tags.push(text);
  });

  const h2Tags: string[] = [];
  $('h2').each((_, el) => {
    const text = $(el).text().trim();
    if (text && h2Tags.length < 10) h2Tags.push(text);
  });

  const bodyText = $('body').text().replace(/\s+/g, ' ');
  const words = bodyText.split(' ').filter(w => w.length > 4);
  const wordFreq: Record<string, number> = {};
  words.forEach(w => {
    const clean = w.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (clean && !['about', 'their', 'there', 'would', 'should', 'which', 'other', 'these', 'where'].includes(clean)) {
      wordFreq[clean] = (wordFreq[clean] || 0) + 1;
    }
  });

  const entityKeywords = Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([word]) => word.charAt(0).toUpperCase() + word.slice(1));

  // AI Auto-Discovered Keywords & Competitors
  const autoDiscoveredKeywords = userKeywords.length > 0 
    ? userKeywords 
    : entityKeywords.length > 0 
      ? entityKeywords.slice(0, 4) 
      : ['AI Search Optimization', 'Direct Answer Citation', 'Knowledge Graph Entity', 'Schema Markup'];

  const autoDiscoveredCompetitors = userCompetitors.length > 0 
    ? userCompetitors 
    : deriveCompetitorsForDomain(domain, title, entityKeywords);

  // 3. Calculate Scores (STRICT REAL CALCULATION)
  let schemaScore = 0;
  if (detectedSchemas.length > 0) {
    schemaScore += 30;
    if (hasFaqSchema) schemaScore += 30;
    if (hasOrganizationSchema) schemaScore += 20;
    if (hasProductSchema) schemaScore += 20;
  }
  schemaScore = Math.min(100, schemaScore);

  let readabilityScore = 20;
  if (title && title !== domain) readabilityScore += 20;
  if (description.length > 30) readabilityScore += 20;
  if (h1Tags.length === 1) readabilityScore += 20;
  if (h2Tags.length >= 2) readabilityScore += 20;
  readabilityScore = Math.min(100, readabilityScore);

  let citationScore = Math.min(100, (detectedSchemas.length * 20) + (h2Tags.length * 10));
  let entityScore = Math.min(100, (entityKeywords.length * 10));

  const overallGeoScore = Math.round((schemaScore * 0.35) + (citationScore * 0.25) + (entityScore * 0.2) + (readabilityScore * 0.2));

  // 4. Generate Recommendations
  const recommendations: string[] = [];
  if (detectedSchemas.length === 0) {
    recommendations.push('CRITICAL: No JSON-LD Schema markup detected. Add Organization and WebSite schema immediately.');
  }
  if (!hasFaqSchema) {
    recommendations.push('Add FAQPage JSON-LD schema markup to directly capture AI snippet answer boxes in ChatGPT & Gemini.');
  }
  if (!hasOrganizationSchema) {
    recommendations.push('Implement Organization schema to establish official brand entity authority in LLM Knowledge Graphs.');
  }
  if (h1Tags.length === 0) {
    recommendations.push('Add a clear <h1> headline incorporating primary topic entity keywords.');
  }
  if (h2Tags.length < 3) {
    recommendations.push('Format section subheadings (<h2> tags) as direct question-and-answer pairs.');
  }
  recommendations.push('Increase entity density around core brand offerings to align vector embeddings for LLM prompt answers.');

  return {
    url: cleanUrl,
    domain,
    title,
    description,
    overallGeoScore,
    schemaScore,
    citationScore,
    entityScore,
    readabilityScore,
    detectedSchemas,
    hasFaqSchema,
    hasOrganizationSchema,
    hasProductSchema,
    h1Tags,
    h2Tags,
    entityKeywords,
    autoDiscoveredKeywords,
    autoDiscoveredCompetitors,
    recommendations,
  };
}

function deriveCompetitorsForDomain(domain: string, title: string = '', keywords: string[] = []): string[] {
  const text = (domain + ' ' + title + ' ' + keywords.join(' ')).toLowerCase();

  if (text.includes('payment') || text.includes('checkout') || text.includes('stripe') || text.includes('billing')) {
    return ['PayPal.com', 'Adyen.com', 'Square.com'];
  }
  if (text.includes('seo') || text.includes('aeo') || text.includes('geo') || text.includes('scalezix') || text.includes('search') || text.includes('ranking')) {
    return ['Semrush.com', 'Ahrefs.com', 'BrightEdge.com'];
  }
  if (text.includes('jira') || text.includes('task') || text.includes('project') || text.includes('linear') || text.includes('management')) {
    return ['Jira.com', 'Asana.com', 'Monday.com'];
  }
  if (text.includes('cloud') || text.includes('host') || text.includes('vercel') || text.includes('server') || text.includes('deploy')) {
    return ['Netlify.com', 'Cloudflare.com', 'AWS.com'];
  }
  if (text.includes('crm') || text.includes('sales') || text.includes('hubspot') || text.includes('lead')) {
    return ['Salesforce.com', 'HubSpot.com', 'Zoho.com'];
  }
  if (text.includes('commerce') || text.includes('shop') || text.includes('store') || text.includes('product')) {
    return ['Shopify.com', 'WooCommerce.com', 'BigCommerce.com'];
  }
  if (text.includes('design') || text.includes('ui') || text.includes('ux') || text.includes('figma')) {
    return ['Figma.com', 'Canva.com', 'Adobe.com'];
  }
  if (text.includes('analytic') || text.includes('data') || text.includes('metric') || text.includes('track')) {
    return ['Mixpanel.com', 'Google Analytics', 'Amplitude.com'];
  }
  if (text.includes('ai') || text.includes('gpt') || text.includes('llm') || text.includes('model')) {
    return ['OpenAI.com', 'Anthropic.com', 'Perplexity.ai'];
  }

  // Fallback for general SaaS domains
  return ['Leading Solution', 'Market Alternative', 'Enterprise Competitor'];
}

function generateBaselineAudit(url: string, domain: string, userKeywords: string[], userCompetitors: string[]): PageGeoAuditResult {
  const autoKeywords = userKeywords.length > 0 ? userKeywords : [domain, 'Software', 'Services', 'Platform'];
  const autoCompetitors = userCompetitors.length > 0 ? userCompetitors : deriveCompetitorsForDomain(domain);

  return {
    url,
    domain,
    title: `${domain}`,
    description: `Unable to extract HTML or site blocked bot access for ${domain}`,
    overallGeoScore: 0,
    schemaScore: 0,
    citationScore: 0,
    entityScore: 0,
    readabilityScore: 0,
    detectedSchemas: [],
    hasFaqSchema: false,
    hasOrganizationSchema: false,
    hasProductSchema: false,
    h1Tags: [],
    h2Tags: [],
    entityKeywords: [],
    autoDiscoveredKeywords: autoKeywords,
    autoDiscoveredCompetitors: autoCompetitors,
    recommendations: [
      'Site inaccessible or blocking crawler. Enable public HTTP access for bot user-agents.',
      'Add JSON-LD Schema markup to enable LLM search engine indexing.',
    ],
  };
}
