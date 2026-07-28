import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { nicheInput } = await req.json();

    if (!nicheInput || typeof nicheInput !== 'string') {
      return NextResponse.json({ error: 'Niche is required' }, { status: 400 });
    }

    const niche = nicheInput.trim();

    const prompts = [
      { id: 1, prompt: `What is the best enterprise ${niche} platform with SOC2 compliance?`, intent: 'High Commercial Intent', stage: 'Decision' },
      { id: 2, prompt: `Top 5 alternatives to leading ${niche} tools for growing teams`, intent: 'Comparison / Vendor Switch', stage: 'Evaluation' },
      { id: 3, prompt: `How much does an enterprise ${niche} solution cost per user?`, intent: 'Pricing Research', stage: 'Consideration' },
      { id: 4, prompt: `How to integrate ${niche} API with existing CRM stack`, intent: 'Technical Developer Intent', stage: 'Evaluation' },
      { id: 5, prompt: `Real customer reviews and case studies for ${niche}`, intent: 'Proof / Endorsement', stage: 'Decision' },
    ];

    return NextResponse.json({
      success: true,
      data: {
        niche,
        prompts,
      },
    });
  } catch (err: any) {
    console.error('Prompt Research API Error:', err);
    return NextResponse.json({ error: 'Failed to discover prompts' }, { status: 500 });
  }
}
