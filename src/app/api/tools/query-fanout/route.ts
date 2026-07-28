import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { keywordInput } = await req.json();

    if (!keywordInput || typeof keywordInput !== 'string') {
      return NextResponse.json({ error: 'Keyword or domain is required' }, { status: 400 });
    }

    let input = keywordInput.trim().toLowerCase()
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .replace(/\/.*$/, '');

    const parts = input.split('.');
    const brandName = parts[0].toUpperCase();

    let subQueries: any[] = [];

    // Stage 1: OpenRouter AI for Brand-Specific Query Fan-Out
    if (process.env.OPENROUTER_API_KEY) {
      try {
        const aiRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://tangentcore.in',
            'X-Title': 'TangentCore Query Fan-Out',
          },
          body: JSON.stringify({
            model: 'google/gemini-2.5-flash',
            messages: [
              {
                role: 'system',
                content: 'You are an LLM query fan-out simulator. Return strictly JSON matching the requested schema without markdown codeblocks.',
              },
              {
                role: 'user',
                content: `Simulate 4 sub-queries that ChatGPT & Perplexity generate when decomposing search intent for brand/domain/keyword: "${input}" (${brandName}).

Return JSON:
{
  "subQueries": [
    {
      "id": 1,
      "prompt": "Top alternatives & competitor comparison for ${brandName}",
      "intent": "Commercial Comparison",
      "requiredTopics": ["Price Comparison", "Product Quality", "Shipping & Delivery"]
    },
    {
      "id": 2,
      "prompt": "Customer reviews and product rating details for ${brandName}",
      "intent": "Social Proof & Reviews",
      "requiredTopics": ["Verified Buyers", "Star Ratings", "Return Policy"]
    },
    {
      "id": 3,
      "prompt": "Official website, size guide, or store locations for ${brandName}",
      "intent": "Navigational & Store Info",
      "requiredTopics": ["Store Locator", "Size Chart", "Official Contact"]
    },
    {
      "id": 4,
      "prompt": "Discounts, promo codes, and membership benefits for ${brandName}",
      "intent": "Transactional / Offers",
      "requiredTopics": ["Member Perks", "Coupon Codes", "Sale Collections"]
    }
  ]
}`,
              },
            ],
            temperature: 0.1,
          }),
        });

        if (aiRes.ok) {
          const aiData = await aiRes.json();
          const rawText = aiData.choices?.[0]?.message?.content || '';
          const cleanedText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleanedText);
          if (parsed.subQueries && parsed.subQueries.length > 0) subQueries = parsed.subQueries;
        }
      } catch (aiErr) {
        console.warn('OpenRouter API call error for query fan-out:', aiErr);
      }
    }

    if (subQueries.length === 0) {
      subQueries = [
        {
          id: 1,
          prompt: `Top alternatives & competitor comparison for ${brandName}`,
          intent: 'Commercial Comparison',
          requiredTopics: ['Price Comparison', 'Product Quality', 'Shipping & Delivery'],
        },
        {
          id: 2,
          prompt: `Customer reviews and product rating details for ${brandName}`,
          intent: 'Social Proof & Reviews',
          requiredTopics: ['Verified Buyers', 'Star Ratings', 'Return Policy'],
        },
        {
          id: 3,
          prompt: `Official website, size guide, or store locations for ${brandName}`,
          intent: 'Navigational & Store Info',
          requiredTopics: ['Store Locator', 'Size Chart', 'Official Contact'],
        },
        {
          id: 4,
          prompt: `Discounts, promo codes, and membership benefits for ${brandName}`,
          intent: 'Transactional / Offers',
          requiredTopics: ['Member Perks', 'Coupon Codes', 'Sale Collections'],
        },
      ];
    }

    return NextResponse.json({
      success: true,
      data: {
        keyword: brandName,
        subQueries,
        recommendation: `Ensure your landing pages include clear sections addressing all 4 sub-query angles to maximize ChatGPT & Perplexity citation rate for ${brandName}.`,
      },
    });
  } catch (err: any) {
    console.error('Query Fan-Out API Error:', err);
    return NextResponse.json({ error: 'Failed to simulate query fan-out' }, { status: 500 });
  }
}
