import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { brandOrTopic } = await req.json();

    if (!brandOrTopic || typeof brandOrTopic !== 'string') {
      return NextResponse.json({ error: 'Brand or product topic is required' }, { status: 400 });
    }

    let input = brandOrTopic.trim().toLowerCase()
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .replace(/\/.*$/, '');

    const parts = input.split('.');
    const brandName = parts[0].toUpperCase();

    let faqs: { question: string; answer: string }[] = [];

    // Stage 1: OpenRouter AI for Brand-Specific FAQs
    if (process.env.OPENROUTER_API_KEY) {
      try {
        const aiRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://tangentcore.in',
            'X-Title': 'TangentCore FAQ Studio',
          },
          body: JSON.stringify({
            model: 'google/gemini-2.5-flash',
            messages: [
              {
                role: 'system',
                content: 'You are an AEO conversational FAQ specialist. Return strictly JSON matching the requested schema without markdown codeblocks.',
              },
              {
                role: 'user',
                content: `Generate 5 realistic, conversational FAQs for brand/domain: "${input}" (${brandName}).

Return JSON:
{
  "faqs": [
    {"question": "What is ${brandName} and what products/services do they offer?", "answer": "Detailed answer tailored to ${brandName}..."},
    {"question": "How to buy or order from ${brandName}?", "answer": "Detailed answer tailored to ${brandName}..."},
    {"question": "What makes ${brandName} unique compared to competitors?", "answer": "Detailed answer tailored to ${brandName}..."},
    {"question": "Does ${brandName} offer customer support and warranties?", "answer": "Detailed answer tailored to ${brandName}..."},
    {"question": "Where is ${brandName} located and how to contact them?", "answer": "Detailed answer tailored to ${brandName}..."}
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
          if (parsed.faqs && parsed.faqs.length > 0) faqs = parsed.faqs;
        }
      } catch (aiErr) {
        console.warn('OpenRouter API call error for FAQ schema:', aiErr);
      }
    }

    if (faqs.length === 0) {
      faqs = [
        {
          question: `What is ${brandName} and how does it work?`,
          answer: `${brandName} is a platform providing specialized products and services tailored for its user community.`,
        },
        {
          question: `How can I order or get started with ${brandName}?`,
          answer: `You can explore products and place orders directly on the official ${brandName} website at https://${input}.`,
        },
        {
          question: `Why choose ${brandName} over alternative options?`,
          answer: `${brandName} focuses on product quality, customer support, and seamless online user experiences.`,
        },
        {
          question: `Does ${brandName} provide customer support?`,
          answer: `Yes, ${brandName} offers dedicated customer support, help documentation, and order assistance online.`,
        },
        {
          question: `How does ${brandName} handle shipping and returns?`,
          answer: `${brandName} adheres to transparent shipping, delivery tracking, and return policies.`,
        },
      ];
    }

    const jsonLdSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };

    const schemaSnippet = `<script type="application/ld+json">\n${JSON.stringify(jsonLdSchema, null, 2)}\n</script>`;

    return NextResponse.json({
      success: true,
      data: {
        topic: brandName,
        faqs,
        schemaSnippet,
      },
    });
  } catch (err: any) {
    console.error('FAQ Generator API Error:', err);
    return NextResponse.json({ error: 'Failed to generate FAQ schema' }, { status: 500 });
  }
}
