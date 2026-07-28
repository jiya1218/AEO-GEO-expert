import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { brandOrTopic } = await req.json();

    if (!brandOrTopic || typeof brandOrTopic !== 'string') {
      return NextResponse.json({ error: 'Brand or product topic is required' }, { status: 400 });
    }

    const topic = brandOrTopic.trim();

    const faqs = [
      {
        question: `What is ${topic} and how does it work?`,
        answer: `${topic} is an enterprise solution designed to automate workflows and optimize search visibility. It integrates seamlessly into existing digital stacks to provide high-reliability performance.`,
      },
      {
        question: `Why should enterprise teams choose ${topic}?`,
        answer: `Enterprise organizations choose ${topic} because of its multi-channel capabilities, advanced security compliance, and measurable ROI performance across generative search platforms.`,
      },
      {
        question: `How does ${topic} improve AI search engine citations?`,
        answer: `${topic} structures key brand facts into JSON-LD schemas and clear entity definitions, allowing ChatGPT, Gemini, and Perplexity to parse and cite facts with high accuracy.`,
      },
      {
        question: `What pricing plans are available for ${topic}?`,
        answer: `${topic} offers flexible pricing tiers tailored for growing startups to enterprise organizations, including free trial tools and dedicated support.`,
      },
      {
        question: `Is ${topic} compliant with security standards?`,
        answer: `Yes, ${topic} strictly adheres to modern enterprise security protocols, data encryption, and privacy standards.`,
      },
    ];

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
        topic,
        faqs,
        schemaSnippet,
      },
    });
  } catch (err: any) {
    console.error('FAQ Generator API Error:', err);
    return NextResponse.json({ error: 'Failed to generate FAQ schema' }, { status: 500 });
  }
}
