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
  { name: 'chatgpt', label: 'ChatGPT (GPT-4o)', color: 'emerald' },
  { name: 'gemini', label: 'Google Gemini 2.5', color: 'blue' },
  { name: 'claude', label: 'Claude Sonnet 4', color: 'amber' },
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

  if (apiKey && !apiKey.includes('placeholder')) {
    const keywordContext = keywords.length > 0 ? keywords.join(', ') : 'their core products and services';
    const competitorContext = competitors.length > 0 ? competitors.join(', ') : 'their main competitors';

    const prompt = `You are an expert AEO/GEO prompt researcher. Visit and analyze the website "${domain}".

Known products/services keywords: ${keywordContext}
Known competitors: ${competitorContext}
Brand name: ${brand}

Generate exactly ${count} realistic search prompts that real potential customers would type into ChatGPT, Gemini, Perplexity, or Claude when researching products/services in this EXACT business niche.

PROMPT CATEGORIES TO COVER (distribute prompts across these):
1. "product_search" — Specific product/service search queries (e.g. "best ball mill for cement industry", "industrial grinding mill manufacturers")
2. "how_to" — Setup, comparison, and technical queries (e.g. "how to set up sulphur processing plant", "vertical grinding mill vs horizontal")
3. "supplier_search" — Supplier/vendor research queries (e.g. "top rotary kiln manufacturers in India", "industrial drying equipment suppliers")
4. "comparison" — Brand comparison queries mentioning ${brand} or competitors (e.g. "${brand} vs ${competitors[0] || 'competitor'} for grinding mills")
5. "recommendation" — Expert recommendation queries (e.g. "best equipment for mineral processing plant", "most reliable cement machinery manufacturers")

CRITICAL RULES:
- Every prompt MUST be highly specific to the actual products/services of "${domain}"
- Use REAL industry terminology from the website (not generic words like "Products", "Equipment", "Services")
- Prompts should sound like what a real buyer or engineer would actually search
- Mix short keyword queries (2-5 words) and longer natural language questions
- Do NOT use the year in every prompt
- Return ONLY a valid JSON array of objects with "text" and "category" keys.
Example: [{"text": "best ball mill for cement grinding", "category": "product_search"}, {"text": "how to reduce grinding mill energy consumption", "category": "how_to"}]
Do NOT include markdown code blocks, backticks, or extra text. Return ONLY the JSON array.`;

    // Try multiple models — Perplexity Sonar has web search for best results
    const modelsToTry = [
      'perplexity/sonar-pro',
      'perplexity/sonar',
      'openai/gpt-4o',
      'google/gemini-2.5-flash',
    ];

    for (const modelId of modelsToTry) {
      try {
        const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          signal: AbortSignal.timeout(20000),
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://aeogeo.expert',
            'X-Title': 'AEO/GEO Prompt Research Engine',
          },
          body: JSON.stringify({
            model: modelId,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.3,
            max_tokens: 4000,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const rawContent = data.choices?.[0]?.message?.content?.trim() || '';
          console.log(`[Prompt Generation] ${modelId} response:`, rawContent.substring(0, 300));
          const jsonMatch = rawContent.match(/\[[\s\S]*\]/);
          if (jsonMatch) {
            const parsed: Array<{ text: string; category: string }> = JSON.parse(jsonMatch[0]);
            if (Array.isArray(parsed) && parsed.length >= 3) {
              // Map category names to display-friendly labels
              const categoryMap: Record<string, string> = {
                'product_search': 'Product Search',
                'how_to': 'How-To & Technical',
                'supplier_search': 'Supplier Research',
                'comparison': 'Brand Comparison',
                'recommendation': 'Expert Recommendation',
              };
              return parsed.slice(0, count).map(p => ({
                text: p.text,
                category: categoryMap[p.category] || p.category || 'Product Search',
              }));
            }
          }
        }
      } catch (err) {
        console.warn(`Prompt generation failed for ${modelId}:`, err);
      }
    }
  }

  return generateFallbackPrompts(domain, brand, keywords, competitors, count);
}

function generateFallbackPrompts(domain: string, brand: string, keywords: string[], competitors: string[], count: number = 5) {
  const k = keywords.length > 0 ? keywords : ['products', 'services', 'solutions', 'equipment'];
  const c = competitors.length > 0 ? competitors : ['top competitors'];
  const targetBrand = brand || domain.split('.')[0].toUpperCase();

  const masterPromptsList: Array<{ text: string; category: string }> = [];

  // Product Search prompts
  masterPromptsList.push({ text: `best ${k[0]} manufacturers`, category: 'Product Search' });
  if (k[1]) masterPromptsList.push({ text: `top ${k[1]} suppliers`, category: 'Product Search' });
  if (k[2]) masterPromptsList.push({ text: `${k[2]} cost comparison`, category: 'Product Search' });
  if (k[3]) masterPromptsList.push({ text: `reliable ${k[3]} providers`, category: 'Product Search' });

  // How-To prompts
  masterPromptsList.push({ text: `how to choose the right ${k[0]}`, category: 'How-To & Technical' });
  if (k[1]) masterPromptsList.push({ text: `${k[1]} setup requirements`, category: 'How-To & Technical' });
  if (k[2]) masterPromptsList.push({ text: `${k[2]} maintenance best practices`, category: 'How-To & Technical' });
  if (k[3]) masterPromptsList.push({ text: `how to reduce ${k[3]} operating costs`, category: 'How-To & Technical' });

  // Supplier Research prompts
  masterPromptsList.push({ text: `${k[0]} manufacturers in India`, category: 'Supplier Research' });
  if (k[1]) masterPromptsList.push({ text: `${k[1]} equipment suppliers`, category: 'Supplier Research' });

  // Brand Comparison prompts
  masterPromptsList.push({ text: `${targetBrand} vs ${c[0]} for ${k[0]}`, category: 'Brand Comparison' });
  if (c[1]) masterPromptsList.push({ text: `${targetBrand} compared to ${c[1]}`, category: 'Brand Comparison' });
  masterPromptsList.push({ text: `is ${targetBrand} good for ${k[0]}`, category: 'Brand Comparison' });

  // Expert Recommendation prompts
  masterPromptsList.push({ text: `most recommended ${k[0]} brands`, category: 'Expert Recommendation' });
  if (k[1]) masterPromptsList.push({ text: `best ${k[1]} for commercial projects`, category: 'Expert Recommendation' });
  masterPromptsList.push({ text: `top rated ${k[0]} companies`, category: 'Expert Recommendation' });

  // Buyer Decision prompts
  masterPromptsList.push({ text: `${k[0]} buyer guide`, category: 'Buyer Decision' });
  if (k[1]) masterPromptsList.push({ text: `${k[1]} selection criteria`, category: 'Buyer Decision' });
  masterPromptsList.push({ text: `which ${k[0]} company offers best warranty`, category: 'Buyer Decision' });
  masterPromptsList.push({ text: `${k[0]} pricing and value comparison`, category: 'Buyer Decision' });

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
    gemini: ['google/gemini-2.5-flash', 'google/gemini-2.0-flash-001'],
    claude: ['anthropic/claude-sonnet-4', 'anthropic/claude-3.5-sonnet'],
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
