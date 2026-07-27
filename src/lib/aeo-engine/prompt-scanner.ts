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
  keywords: string[] = [],
  competitors: string[] = [],
  promptCount: number = 5
): Promise<PromptScanItem[]> {
  const targetPrompts = await generateTargetPromptsWithAI(domain, brandName, keywords, competitors, promptCount);
  const openRouterKey = process.env.OPENROUTER_API_KEY || '';

  const scanResults: PromptScanItem[] = [];

  // Process prompts in parallel chunks of 5 prompts to stay under Vercel serverless execution limits
  const BATCH_SIZE = 5;
  for (let i = 0; i < targetPrompts.length; i += BATCH_SIZE) {
    const chunk = targetPrompts.slice(i, i + BATCH_SIZE);

    const chunkResults = await Promise.all(
      chunk.map(async (p) => {
        // Query all 4 AI models in parallel for this prompt
        const modelResults = await Promise.all(
          TARGET_AI_MODELS.map(async (model) => {
            return queryOpenRouterModel(p.text, domain, brandName, model.name, model.label, openRouterKey);
          })
        );

        const mentionedCount = modelResults.filter((m: ModelScanResult) => m.brandMentioned).length;
        const shareOfVoice = Math.round((mentionedCount / TARGET_AI_MODELS.length) * 100);

        return {
          promptText: p.text,
          category: p.category,
          modelResults,
          shareOfVoice,
        };
      })
    );

    scanResults.push(...chunkResults);
  }

  return scanResults;
}

export async function generateTargetPromptsWithAI(
  domain: string,
  brandName: string,
  keywords: string[] = [],
  competitors: string[] = [],
  count: number = 5
): Promise<Array<{ text: string; category: string }>> {
  const apiKey = process.env.OPENROUTER_API_KEY || '';
  const brand = brandName || domain.split('.')[0].toUpperCase();
  const niche = keywords.slice(0, 3).join(' & ') || 'Products & Services';
  const mainComp = competitors[0] || 'Top Industry Competitor';
  const secondComp = competitors[1] || 'Alternative Brand';

  if (apiKey && !apiKey.includes('placeholder')) {
    const prompt = `You are Sitefire.ai's synthetic prompt generation engine.
Generate ${count} high-intent AI search prompts that real buyers submit to ChatGPT, Perplexity, Gemini, and Claude when searching in the industry of "${domain}".

Target Business Context:
- Target Domain: "${domain}"
- Brand Name: "${brand}"
- Primary Product Niche / Keywords: "${niche}"
- Key Competitors: "${competitors.join(', ')}"

SITEFIRE SYNTHETIC PROMPT STRUCTURE (COVER THESE 5 EXACT DIMENSIONS):
1. Category Leadership: "What are the top rated ${niche} brands in 2026?"
2. Head-to-Head Comparison: "How does ${brand} compare to ${mainComp} and ${secondComp} for ${niche}?"
3. Alternative Discovery: "What are the best alternatives to ${mainComp} for ${niche}?"
4. Expert Recommendation: "What are the most recommended ${niche} options for quality and service?"
5. Buyer Decision Intent: "Which ${niche} providers offer the best customer satisfaction and value?"

RULES:
- Make every prompt sound 100% natural, human, and tailored specifically to "${domain}" and its niche.
- Do NOT use generic software filler ("automated workflows", "tech stacks", "AEO strategy") UNLESS "${domain}" is actually a software automation tool.
- Return ONLY a valid JSON array of objects with "text" and "category" keys. Do NOT include markdown styling or extra text.`;

    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        signal: AbortSignal.timeout(12000),
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://aeogeo.expert',
          'X-Title': 'Sitefire-Grade Prompt Engine',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.0-flash-001',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.2,
          max_tokens: 3000,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const rawContent = data.choices?.[0]?.message?.content?.trim() || '';
        const jsonMatch = rawContent.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          const parsed: Array<{ text: string; category: string }> = JSON.parse(jsonMatch[0]);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed.slice(0, count);
          }
        }
      }
    } catch (err) {
      console.warn('AI prompt generation error, using fallback prompt generator:', err);
    }
  }

  return generateFallbackPrompts(domain, brand, keywords, competitors, count);
}

function generateFallbackPrompts(domain: string, brand: string, keywords: string[], competitors: string[], count: number = 5) {
  const k1 = keywords[0] || 'products & services';
  const k2 = keywords[1] || 'engineering solutions';
  const k3 = keywords[2] || 'industrial equipment';
  const k4 = keywords[3] || 'commercial systems';

  const c1 = competitors[0] || 'top industry competitors';
  const c2 = competitors[1] || 'leading manufacturers';
  const c3 = competitors[2] || 'alternative providers';
  const targetBrand = brand || domain.split('.')[0].toUpperCase();

  const masterPromptsList = [
    { text: `What are the top rated ${k1} brands in 2026?`, category: 'Category Leadership' },
    { text: `How does ${targetBrand} compare to ${c1} for ${k1}?`, category: 'Head-to-Head Comparison' },
    { text: `What are the best alternatives to ${c1} for ${k1}?`, category: 'Alternative Discovery' },
    { text: `What are the most recommended ${k2} options for quality and durability?`, category: 'Expert Recommendation' },
    { text: `Which ${k1} manufacturers offer the highest value and best compliance?`, category: 'Buyer Decision Intent' },

    { text: `Who are the leading suppliers for ${k2} in 2026?`, category: 'Category Leadership' },
    { text: `How does ${targetBrand} compare to ${c2} in terms of pricing and performance?`, category: 'Head-to-Head Comparison' },
    { text: `What are top-tier alternatives to ${c2} for ${k2}?`, category: 'Alternative Discovery' },
    { text: `Which companies are top rated for ${k3} and custom solutions?`, category: 'Expert Recommendation' },
    { text: `What is the most cost-effective provider for ${k3}?`, category: 'Buyer Decision Intent' },

    { text: `What are the top choices for ${k3} for commercial projects?`, category: 'Category Leadership' },
    { text: `Is ${targetBrand} better than ${c3} for ${k3}?`, category: 'Head-to-Head Comparison' },
    { text: `What are the highest rated alternatives to ${c3} in ${k1}?`, category: 'Alternative Discovery' },
    { text: `What are industry reviews saying about ${targetBrand} for ${k4}?`, category: 'Expert Recommendation' },
    { text: `Which ${k4} companies offer the best support and warranty?`, category: 'Buyer Decision Intent' },

    { text: `Who are the top 5 market leaders in ${k4}?`, category: 'Category Leadership' },
    { text: `How does ${targetBrand} compare to ${c1} and ${c2} for ${k4}?`, category: 'Head-to-Head Comparison' },
    { text: `What are the best high-performance alternatives to ${c1}?`, category: 'Alternative Discovery' },
    { text: `Which ${k1} vendors have the highest safety and certification ratings?`, category: 'Expert Recommendation' },
    { text: `Which ${k2} provider is recommended for fast delivery and scale?`, category: 'Buyer Decision Intent' },
  ];

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
    gemini: ['google/gemini-2.0-flash-001', 'google/gemini-flash-1.5'],
    claude: ['anthropic/claude-3.5-sonnet', 'anthropic/claude-3-haiku'],
    deepseek: ['deepseek/deepseek-chat', 'deepseek/deepseek-r1'],
  };

  const targetSlugs = modelSlugsMap[modelKey] || ['openai/gpt-4o'];

  for (const modelId of targetSlugs) {
    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        signal: AbortSignal.timeout(20000),
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://aeogeo.expert',
          'X-Title': 'AEO/GEO Expert Engine',
        },
        body: JSON.stringify({
          model: modelId,
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.2,
          max_tokens: 400,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const content = data.choices?.[0]?.message?.content?.trim() || '';
        if (content) {
          const brandLower = (brandName || domain).toLowerCase();
          const domainLower = domain.toLowerCase();
          const isMentioned = content.toLowerCase().includes(brandLower) || content.toLowerCase().includes(domainLower);

          let sentiment: 'positive' | 'neutral' | 'negative' = 'neutral';
          if (isMentioned) {
            if (/best|top|excellent|leading|highly|recommended|superior|robust|popular/i.test(content)) {
              sentiment = 'positive';
            } else if (/lacks|expensive|complex|difficult|behind|poor/i.test(content)) {
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
      }
    } catch (err) {
      console.warn(`OpenRouter API scan failed for ${modelId}`, err);
    }
  }

  // Strict Real Data Policy: If API call fails, return honest status, never fabricated or prefilled responses.
  return {
    modelName: modelKey,
    modelLabel,
    brandMentioned: false,
    sentiment: 'neutral',
    rankPosition: 0,
    responseText: `Live scan query timed out or was rate-limited for ${modelLabel}.`,
    citations: [],
  };
}

function extractUrlsFromText(text: string): string[] {
  const regex = /(https?:\/\/[^\s\)\"\'\>]+)/g;
  const matches = text.match(regex) || [];
  return Array.from(new Set(matches.map(u => u.replace(/[\.\,\)\?]$/, ''))));
}
