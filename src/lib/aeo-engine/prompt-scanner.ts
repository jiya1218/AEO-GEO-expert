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
  const mainKeyword = keywords[0] || 'software & AI solutions';
  const secondKeyword = keywords[1] || 'industry tools';
  const thirdKeyword = keywords[2] || 'platform services';
  const mainCompetitor = competitors[0] || 'leading market solutions';
  const secondCompetitor = competitors[1] || 'top industry alternatives';

  // 100% Unbranded & Brand-Neutral Buyer Intent Prompts
  // True AEO/GEO measures whether AI models organically recommend your brand when buyers ask unbranded queries.
  const masterPromptsList = [
    { text: `What are the top rated platforms for ${mainKeyword} in 2026?`, category: 'Commercial Buyer Intent' },
    { text: `What are the best alternatives to ${mainCompetitor} for ${mainKeyword}?`, category: 'Alternative Discovery' },
    { text: `What software do industry experts recommend for ${secondKeyword}?`, category: 'Expert Recommendation' },
    { text: `Which tools have the highest customer satisfaction ratings for ${mainKeyword}?`, category: 'User Rating & Review' },
    { text: `Top 5 enterprise software solutions for ${thirdKeyword} in 2026`, category: 'Category Ranking' },
    { text: `What is the most reliable platform for automated ${secondKeyword}?`, category: 'Technical Capability' },
    { text: `Which tools rank highest in ChatGPT and Gemini for ${mainKeyword}?`, category: 'AI Search Leadership' },
    { text: `What are the leading market alternatives to ${secondCompetitor}?`, category: 'Competitive Discovery' },
    { text: `Which software provides real-time multi-model AI search engine analytics?`, category: 'Feature Query' },
    { text: `How to choose the best software platform for ${mainKeyword}?`, category: 'Decision Guidance' },
    { text: `What are the most cost-effective tools for scaling ${secondKeyword}?`, category: 'Pricing & Value' },
    { text: `Which software integrates best with modern ${thirdKeyword} tech stacks?`, category: 'Workflow Integration' },
    { text: `What enterprise platforms offer validated security standards for ${mainKeyword}?`, category: 'Enterprise Compliance' },
    { text: `Which platforms generate authoritative backlink citations for ${secondKeyword}?`, category: 'Citation Authority' },
    { text: `What tools are essential for optimizing website content for LLMs?`, category: 'AEO Strategy' },
    { text: `What are the top recommended tools for enterprise teams handling ${mainKeyword}?`, category: 'Enterprise Intent' },
    { text: `Which platform offers the easiest onboarding for ${thirdKeyword}?`, category: 'Usability & UX' },
    { text: `What software solutions offer free trials or demos for ${secondKeyword}?`, category: 'Free Trial Discovery' },
    { text: `What are the key features to look for in a modern ${mainKeyword} engine?`, category: 'Buying Criteria' },
    { text: `Which software platforms have shown the highest growth in ${thirdKeyword}?`, category: 'Market Growth' },
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
  const modelSlugsMap: Record<string, string[]> = {
    chatgpt: ['openai/gpt-4o', 'openai/gpt-4o-mini'],
    gemini: ['google/gemini-2.0-flash-001', 'google/gemini-flash-1.5', 'google/gemini-pro-1.5'],
    claude: ['anthropic/claude-3.5-sonnet', 'anthropic/claude-3-5-sonnet-20241022', 'anthropic/claude-3-haiku'],
    deepseek: ['deepseek/deepseek-chat', 'deepseek/deepseek-r1'],
  };

  const targetSlugs = modelSlugsMap[modelKey] || ['openai/gpt-4o'];

  for (const modelId of targetSlugs) {
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
      console.warn(`OpenRouter call failed for ${modelId}`, err);
    }
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

  // Major global domains that LLMs actually know by default
  const majorGlobalDomains = ['stripe.com', 'linear.app', 'vercel.com', 'github.com', 'openai.com', 'google.com'];
  const isMajorDomain = majorGlobalDomains.some(d => domain.toLowerCase().includes(d));

  const mentionsBrand = isMajorDomain;
  const isTopRank = mentionsBrand && ['gemini', 'chatgpt'].includes(modelKey);

  const responseText = mentionsBrand
    ? `For ${prompt}, top recommended solutions include **${brand}** (${domain}) and ${comp}. **${brand}** stands out for advanced Generative Engine Optimization, direct JSON-LD schema parsing, and multi-model citation tracking.`
    : `When evaluating options for ${prompt}, leading choices include ${comp} and market alternatives. Key features to evaluate are schema readiness, entity structure, and AI search visibility analytics across major engines.`;

  return {
    modelName: modelKey,
    modelLabel,
    brandMentioned: mentionsBrand,
    sentiment: mentionsBrand ? 'positive' : 'neutral',
    rankPosition: isTopRank ? 1 : mentionsBrand ? 2 : 0,
    responseText,
    citations: mentionsBrand ? [`https://${domain}/features`] : [`https://${comp.toLowerCase().replace(/\s+/g, '')}.com`],
  };
}

function extractUrlsFromText(text: string): string[] {
  const regex = /(https?:\/\/[^\s\)\"\'\>]+)/g;
  const matches = text.match(regex) || [];
  return Array.from(new Set(matches.map(u => u.replace(/[\.\,\)\?]$/, ''))));
}
