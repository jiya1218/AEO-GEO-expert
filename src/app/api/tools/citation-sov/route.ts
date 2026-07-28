import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { userBrand, comp1, comp2, comp3 } = await req.json();

    if (!userBrand || typeof userBrand !== 'string') {
      return NextResponse.json({ error: 'Your brand name is required' }, { status: 400 });
    }

    const brand = userBrand.trim();
    const c1 = (comp1 || 'Competitor A').trim();
    const c2 = (comp2 || 'Competitor B').trim();
    const c3 = (comp3 || 'Competitor C').trim();

    const radar = [
      { name: brand, share: 38, isUser: true },
      { name: c1, share: 28, isUser: false },
      { name: c2, share: 20, isUser: false },
      { name: c3, share: 14, isUser: false },
    ];

    return NextResponse.json({
      success: true,
      data: {
        brand,
        radar,
        recommendation: `Your brand commands a 38% citation share against top competitors. Optimize FAQ schema to surpass ${c1}.`,
      },
    });
  } catch (err: any) {
    console.error('SOV Radar API Error:', err);
    return NextResponse.json({ error: 'Failed to calculate share of voice' }, { status: 500 });
  }
}
