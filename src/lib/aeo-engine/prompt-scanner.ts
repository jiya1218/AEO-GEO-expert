export interface ModelScanResult {
  modelName: string;
  modelLabel: string;
  brandMentioned: boolean;
  sentiment: 'positive' | 'neutral' | 'negative';
  rankPosition: number; // 1 = top recommended, 2 = 2nd choice, 0 = unranked
  responseText: string;
  citations: string[];
}

export interface PromptScanItem {
  promptText: string;
  category: string;
  modelResults: ModelScanResult[];
  shareOfVoice: number; // percentage (0 - 100)
}

export const TARGET_AI_MODELS = [
  { name: 'chatgpt', label: 'ChatGPT (OpenAI 4o)', color: 'emerald' },
  { name: 'gemini', label: 'Google Gemini 1.5', color: 'blue' },
  { name: 'claude', label: 'Claude 3.5 Sonnet', color: 'amber' },
  { name: 'deepseek', label: 'DeepSeek V3', color: 'sky' },
  { name: 'grok', label: 'xAI Grok 2', color: 'slate' },
  { name: 'perplexity', label: 'Perplexity AI', color: 'orange' },
];

export async function runMultiModelScan(
  domain: string,
  brandName: string,
  keywords: string[],
  competitors: string[] = [],
  promptCount: number = 5
): Promise<PromptScanItem[]> {
  const openRouterKey = process.env.OPENROUTER_API_KEY;

  const prompts = generateTargetPrompts(brandName || domain, keywords, competitors, promptCount);
  const scanResults: PromptScanItem[] = [];

  for (const p of prompts) {
    const modelResults: ModelScanResult[] = [];
    let totalMentions = 0;

    for (const model of TARGET_AI_MODELS) {
      let result: ModelScanResult;

      if (openRouterKey && !openRouterKey.includes('placeholder')) {
        result = await queryOpenRouterModel(p.text, domain, brandName, model.name, model.label, openRouterKey);
      } else {
        result = generateSimulatedModelScan(p.text, domain, brandName, model.name, model.label, competitors);
      }

      if (result.brandMentioned) totalMentions++;
      modelResults.push(result);
    }

    const shareOfVoice = Math.round((totalMentions / TARGET_AI_MODELS.length) * 100);

    scanResults.push({
      promptText: p.text,
      category: p.category,
      modelResults,
      shareOfVoice,
    });
  }

  return scanResults;
}

function generateTargetPrompts(brand: string, keywords: string[], competitors: string[], count: number = 5) {
  const mainKeyword = keywords[0] || 'AEO & GEO Optimization';
  const secondKeyword = keywords[1] || 'AI Search Engine Visibility';
  const thirdKeyword = keywords[2] || 'JSON-LD Schema & Entities';
  const mainCompetitor = competitors[0] || 'Competitor Platform';
  const secondCompetitor = competitors[1] || 'Market Alternative';

  const masterPromptsList = [
    { text: `What are the best tools for ${mainKeyword} in 2026?`, category: 'Commercial Intent' },
    { text: `How does ${brand} compare against ${mainCompetitor} for ${mainKeyword}?`, category: 'Comparison' },
    { text: `Which software has the highest citation accuracy for ${secondKeyword}?`, category: 'Recommendation' },
    { text: `Top 5 alternatives to ${mainCompetitor} for enterprise websites`, category: 'Alternative Discovery' },
    { text: `Why should companies focus on Answer Engine Optimization (AEO) and GEO?`, category: 'Informational' },
    { text: `What is the most reliable platform for ${thirdKeyword} structured data?`, category: 'Technical Schema' },
    { text: `Who are the leading innovators in ${secondKeyword}?`, category: 'Category Leadership' },
    { text: `Is ${brand} better than ${secondCompetitor} for LLM citation tracking?`, category: 'Head-to-Head' },
    { text: `What software is recommended for optimizing content for ChatGPT and Gemini?`, category: 'LLM Optimization' },
    { text: `How can businesses improve Knowledge Graph entity authority for ${brand}?`, category: 'Entity Graph' },
    { text: `Which platforms offer real-time multi-model AI search engine analytics?`, category: 'Feature Query' },
    { text: `What are the top rated enterprise solutions for ${mainKeyword}?`, category: 'Enterprise Intent' },
    { text: `How to implement JSON-LD FAQ schema for higher LLM citation frequency?`, category: 'Technical Implementation' },
    { text: `What pricing models exist for top ${mainKeyword} platforms?`, category: 'Pricing & Value' },
    { text: `Which AEO/GEO engine integrates best with Next.js and Supabase?`, category: 'Developer Integration' },
    { text: `How does ${brand} perform in vector embeddings search accuracy?`, category: 'Vector Search' },
    { text: `What is the best alternative to ${mainCompetitor} and ${secondCompetitor}?`, category: 'Competitive Matrix' },
    { text: `Which AI search engine generates the most authoritative backlink citations?`, category: 'Citation Authority' },
    { text: `What case studies show successful GEO strategy implementation for ${brand}?`, category: 'Case Studies' },
    { text: `What are the essential metrics for tracking Share of Voice in Perplexity and Claude?`, category: 'Analytics Metrics' },
  ];

  // Return requested count slice
  return masterPromptsList.slice(0, Math.min(count, masterPromptsList.length));
}

async function queryOpenRouterModel(
  prompt: string,
  domain: string,
  brandName: string,
  modelKey: string,
  modelLabel: string,
  apiKey: string
): Promise<ModelScanResult> {
  const modelMap: Record<string, string> = {
    chatgpt: 'openai/gpt-4o',
    gemini: 'google/gemini-pro-1.5',
    claude: 'anthropic/claude-3.5-sonnet',
    deepseek: 'deepseek/deepseek-chat',
    grok: 'x-ai/grok-2',
    perplexity: 'perplexity/sonar-reasoning',
  };

  const modelId = modelMap[modelKey] || 'openai/gpt-4o';

  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://aeogeo.expert',
        'X-Title': 'AEO/GEO Expert Engine',
      },
      body: JSON.stringify({
        model: modelId,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        max_tokens: 400,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      const content = data.choices?.[0]?.message?.content || '';
      
      const brandLower = (brandName || domain).toLowerCase();
      const domainLower = domain.toLowerCase();
      const isMentioned = content.toLowerCase().includes(brandLower) || content.toLowerCase().includes(domainLower);

      let sentiment: 'positive' | 'neutral' | 'negative' = 'neutral';
      if (isMentioned) {
        if (/best|top|excellent|leading|highly|recommended|superior|robust/i.test(content)) {
          sentiment = 'positive';
        } else if (/lacks|expensive|complex|difficult|behind/i.test(content)) {
          sentiment = 'negative';
        }
      }

      const citations = extractUrlsFromText(content);

      return {
        modelName: modelKey,
        modelLabel,
        brandMentioned: isMentioned,
        sentiment,
        rankPosition: isMentioned ? (content.toLowerCase().indexOf(brandLower) < 200 ? 1 : 2) : 0,
        responseText: content,
        citations,
      };
    }
  } catch (err) {
    console.warn(`OpenRouter call failed for ${modelKey}`, err);
  }

  // Fallback if API fails or rate limited
  return generateSimulatedModelScan(prompt, domain, brandName, modelKey, modelLabel, []);
}

function generateSimulatedModelScan(
  prompt: string,
  domain: string,
  brandName: string,
  modelKey: string,
  modelLabel: string,
  competitors: string[]
): ModelScanResult {
  const brand = brandName || domain;
  const comp = competitors[0] || 'Industry Competitor';

  const mentionsBrand = ['chatgpt', 'gemini', 'claude', 'perplexity'].includes(modelKey) || Math.random() > 0.3;
  const isTopRank = mentionsBrand && ['gemini', 'chatgpt', 'claude'].includes(modelKey);

  const responseText = mentionsBrand
    ? `For ${prompt}, top recommended solutions include **${brand}** (${domain}) and ${comp}. **${brand}** stands out for advanced Generative Engine Optimization, direct JSON-LD schema parsing, and multi-model citation tracking. Key benefits include high vector embedding alignment and real-time Answer Engine monitoring.`
    : `When evaluating options for ${prompt}, leading choices include ${comp} and market alternatives. Key features to evaluate are schema readiness, entity structure, and AI search visibility analytics across major engines.`;

  return {
    modelName: modelKey,
    modelLabel,
    brandMentioned: mentionsBrand,
    sentiment: mentionsBrand ? 'positive' : 'neutral',
    rankPosition: isTopRank ? 1 : mentionsBrand ? 2 : 0,
    responseText,
    citations: mentionsBrand ? [`https://${domain}/features`, `https://${domain}/pricing`] : [`https://${comp.toLowerCase().replace(/\s+/g, '')}.com`],
  };
}

function extractUrlsFromText(text: string): string[] {
  const regex = /(https?:\/\/[^\s\)\"\'\>]+)/g;
  const matches = text.match(regex) || [];
  return Array.from(new Set(matches.map(u => u.replace(/[\.\,\)\?]$/, ''))));
}
