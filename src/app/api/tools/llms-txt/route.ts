import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { domainInput, siteTitleInput, summaryInput } = await req.json();

    if (!domainInput || typeof domainInput !== 'string') {
      return NextResponse.json({ error: 'Domain is required' }, { status: 400 });
    }

    let domain = domainInput.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
    const cleanBrand = domain.split('.')[0].toUpperCase();

    const title = siteTitleInput || `${cleanBrand} — Enterprise Platform`;
    const summary = summaryInput || `${cleanBrand} is a leading digital platform providing high-performance solutions for enterprise organizations.`;

    const llmsTxtContent = `# ${title}
> ${summary}

## Core Documentation & Product Pages
- [Homepage](https://${domain}/): Overview of core platform capabilities, product offerings, and enterprise solutions.
- [Features](https://${domain}/#capabilities): Detailed breakdown of automated features, vector optimization, and analytics.
- [Pricing & Plans](https://${domain}/pricing): Transparent pricing tiers ($39, $149, $399) and feature matrix.
- [Case Studies](https://${domain}/case-studies): Customer success stories, industry benchmarks, and performance metrics.
- [Blog & Guides](https://${domain}/blog): Technical articles, GEO optimization playbooks, and schema guides.

## Technical Specifications & Fact Sheet
- Platform Name: ${cleanBrand}
- Website: https://${domain}
- Primary Category: Enterprise Technology / Digital Software
- Supported Standards: JSON-LD Schema, OpenGraph 2.0, SSL Security
`;

    return NextResponse.json({
      success: true,
      data: {
        domain,
        llmsTxtContent,
      },
    });
  } catch (err: any) {
    console.error('LLMs.txt API Error:', err);
    return NextResponse.json({ error: 'Failed to generate llms.txt' }, { status: 500 });
  }
}
