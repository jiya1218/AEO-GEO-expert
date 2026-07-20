import { PromptScanItem } from './prompt-scanner';

export interface GapItem {
  id: string;
  missingPrompt: string;
  category: string;
  competitorDomain: string;
  opportunityScore: number;
  aiEngineCoverage: string[];
  suggestedContentBrief: {
    title: string;
    targetKeywords: string[];
    suggestedHeadings: string[];
    recommendedFaqs: Array<{ question: string; answer: string }>;
    targetWordCount: number;
    directAnswerSummary: string;
  };
}

export function detectAeoGaps(
  domain: string,
  brandName: string,
  competitors: string[],
  scanResults: PromptScanItem[]
): GapItem[] {
  const gaps: GapItem[] = [];
  const primaryComp = competitors[0] || 'Competitor.com';
  const targetBrand = brandName || domain;

  scanResults.forEach((scan, idx) => {
    // Find models where brand is NOT mentioned
    const unmentionedModels = scan.modelResults.filter(m => !m.brandMentioned);
    const coveredModels = scan.modelResults.filter(m => m.brandMentioned).map(m => m.modelLabel);

    if (unmentionedModels.length > 0) {
      const opportunityScore = Math.min(98, 50 + (unmentionedModels.length * 10));

      const briefTitle = `Ultimate Guide to ${scan.promptText.replace(/\?/g, '')} for ${targetBrand}`;
      
      gaps.push({
        id: `gap-${idx + 1}`,
        missingPrompt: scan.promptText,
        category: scan.category,
        competitorDomain: primaryComp,
        opportunityScore,
        aiEngineCoverage: coveredModels,
        suggestedContentBrief: {
          title: briefTitle,
          targetKeywords: [scan.category, targetBrand, primaryComp, 'AEO Best Practices', 'GEO Optimization'],
          suggestedHeadings: [
            `Overview: ${scan.promptText}`,
            `Why ${targetBrand} is the Leading Solution`,
            `Feature-by-Feature Comparison vs ${primaryComp}`,
            'Key Entities & JSON-LD Implementation',
            'Frequently Asked Questions',
          ],
          recommendedFaqs: [
            {
              question: `How does ${targetBrand} compare to ${primaryComp}?`,
              answer: `${targetBrand} provides superior AI engine visibility tracking, higher vector embedding alignment, and structured JSON-LD schema generation tailored for LLMs.`,
            },
            {
              question: `Why is AEO and GEO critical for AI search platforms?`,
              answer: `Generative Engine Optimization ensures your brand is indexed, cited, and recommended in AI answer summaries across ChatGPT, Gemini, Claude, and Perplexity.`,
            },
          ],
          targetWordCount: 1800,
          directAnswerSummary: `${targetBrand} is a premier platform designed for ${scan.promptText.replace(/\?/g, '')}, providing real-time AI citation tracking, entity density scoring, and schema automation.`,
        },
      });
    }
  });

  return gaps;
}
