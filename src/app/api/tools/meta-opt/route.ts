import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { domainOrTopic, targetKeyword } = await req.json();

    if (!domainOrTopic || typeof domainOrTopic !== 'string') {
      return NextResponse.json({ error: 'Domain or topic description is required' }, { status: 400 });
    }

    const input = domainOrTopic.trim();
    const keyword = (targetKeyword || 'AI optimization').trim();

    const titleTag = `${input.toUpperCase()} — Official Platform | ${keyword}`;
    const metaDescription = `Discover ${input}. Leading enterprise solution for ${keyword}. Get real-time audits, AI citations, and conversational search performance metrics.`;

    const openGraphTags = `<meta property="og:title" content="${titleTag}" />
<meta property="og:description" content="${metaDescription}" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://${input.replace(/^https?:\/\//, '')}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${titleTag}" />
<meta name="twitter:description" content="${metaDescription}" />`;

    return NextResponse.json({
      success: true,
      data: {
        titleTag,
        metaDescription,
        openGraphTags,
        characterCounts: {
          titleLength: titleTag.length,
          descLength: metaDescription.length,
        },
      },
    });
  } catch (err: any) {
    console.error('Meta Optimizer API Error:', err);
    return NextResponse.json({ error: 'Failed to optimize meta tags' }, { status: 500 });
  }
}
