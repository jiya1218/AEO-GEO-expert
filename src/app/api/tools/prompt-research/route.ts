import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { nicheInput } = await req.json();

    if (!nicheInput || typeof nicheInput !== 'string') {
      return NextResponse.json({ error: 'Niche or brand is required' }, { status: 400 });
    }

    let input = nicheInput.trim().toLowerCase()
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .replace(/\/.*$/, '');

    const parts = input.split('.');
    const brandName = parts[0].toUpperCase();

    let prompts: any[] = [];

    // Stage 1: OpenRouter AI for Brand-Specific Buyer Prompts
    if (process.env.OPENROUTER_API_KEY) {
      try {
        const aiRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://tangentcore.in',
            'X-Title': 'TangentCore Prompt Discovery',
          },
          body: JSON.stringify({
            model: 'google/gemini-2.5-flash',
            messages: [
              {
                role: 'system',
                content: 'You are a buyer intent prompt discovery engine. Return strictly JSON matching the requested schema without markdown codeblocks.',
              },
              {
                role: 'user',
                content: `Generate 5 realistic conversational prompts that real buyers ask ChatGPT, Perplexity, and Gemini regarding brand/niche: "${input}" (${brandName}).

Return JSON:
{
  "prompts": [
    {"id": 1, "prompt": "What are the best products or services offered by ${brandName}?", "intent": "High Buyer Intent", "stage": "Decision"},
    {"id": 2, "prompt": "How does ${brandName} compare to top alternatives in terms of quality and price?", "intent": "Comparison Research", "stage": "Evaluation"},
    {"id": 3, "prompt": "Are there active discount codes or membership offers for ${brandName}?", "intent": "Transactional Offer", "stage": "Decision"},
    {"id": 4, "prompt": "What do customer reviews say about ${brandName} shipping and returns?", "intent": "Proof & Trust", "stage": "Evaluation"},
    {"id": 5, "prompt": "How to contact official support or visit ${brandName} online?", "intent": "Navigational", "stage": "Consideration"}
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
          if (parsed.prompts && parsed.prompts.length > 0) prompts = parsed.prompts;
        }
      } catch (aiErr) {
        console.warn('OpenRouter API call error for prompt research:', aiErr);
      }
    }

    if (prompts.length === 0) {
      prompts = [
        { id: 1, prompt: `What are the top offerings from ${brandName}?`, intent: 'High Buyer Intent', stage: 'Decision' },
        { id: 2, prompt: `Top alternatives to ${brandName} for quality and value`, intent: 'Comparison Research', stage: 'Evaluation' },
        { id: 3, prompt: `What is the price range and return policy of ${brandName}?`, intent: 'Pricing Research', stage: 'Consideration' },
        { id: 4, prompt: `Are customer reviews positive for ${brandName}?`, intent: 'Proof & Trust', stage: 'Evaluation' },
        { id: 5, prompt: `Where to buy official ${brandName} products online?`, intent: 'Navigational', stage: 'Decision' },
      ];
    }

    return NextResponse.json({
      success: true,
      data: {
        niche: brandName,
        prompts,
      },
    });
  } catch (err: any) {
    console.error('Prompt Research API Error:', err);
    return NextResponse.json({ error: 'Failed to discover prompts' }, { status: 500 });
  }
}
