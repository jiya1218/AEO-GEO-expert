import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { keywordInput } = await req.json();

    if (!keywordInput || typeof keywordInput !== 'string') {
      return NextResponse.json({ error: 'Keyword is required' }, { status: 400 });
    }

    const keyword = keywordInput.trim();

    const subQueries = [
      {
        id: 1,
        prompt: `Top enterprise alternatives & pricing matrix for ${keyword}`,
        intent: 'Transactional / Commercial Comparison',
        requiredTopics: ['Pricing Tiers', 'Free Trial Options', 'Contract Terms'],
      },
      {
        id: 2,
        prompt: `Security compliance & SOC2 certification details for ${keyword}`,
        intent: 'Technical / Security Assessment',
        requiredTopics: ['Data Encryption', 'SOC2 Type II', 'GDPR & Privacy Policy'],
      },
      {
        id: 3,
        prompt: `API integration capabilities & SDK documentation for ${keyword}`,
        intent: 'Developer / Integration Readiness',
        requiredTopics: ['REST & GraphQL APIs', 'Webhook Support', 'SDK Libraries'],
      },
      {
        id: 4,
        prompt: `Real customer reviews & case study metrics for ${keyword}`,
        intent: 'Social Proof / Case Study Proof',
        requiredTopics: ['Customer Logos', 'ROI Percentage', 'Implementation Time'],
      },
    ];

    return NextResponse.json({
      success: true,
      data: {
        keyword,
        subQueries,
        recommendation: 'Ensure your primary landing page includes H2 headers addressing all 4 sub-query angles to maximize ChatGPT & Perplexity citation rate.',
      },
    });
  } catch (err: any) {
    console.error('Query Fan-Out API Error:', err);
    return NextResponse.json({ error: 'Failed to simulate query fan-out' }, { status: 500 });
  }
}
