import { NextResponse } from 'next/server';
import { analyzePageGeo } from '@/lib/aeo-engine/page-analyzer';
import { runMultiModelScan } from '@/lib/aeo-engine/prompt-scanner';
import { detectAeoGaps } from '@/lib/aeo-engine/gap-detector';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { domain, brandName, keywords = [], competitors = [] } = body;

    if (!domain) {
      return NextResponse.json({ error: 'Domain is required' }, { status: 400 });
    }

    const cleanDomain = String(domain).trim().toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '');
    const targetBrand = brandName || cleanDomain.split('.')[0].toUpperCase();

    // 1. Run Page Audit & AI Auto-Discovery of Keywords + Competitors
    const pageAudit = await analyzePageGeo(cleanDomain, keywords, competitors);

    const activeKeywords = pageAudit.autoDiscoveredKeywords;
    const activeCompetitors = pageAudit.autoDiscoveredCompetitors;

    // 2. Run Multi-Model Prompt Scans
    const promptScans = await runMultiModelScan(cleanDomain, targetBrand, activeKeywords, activeCompetitors);

    // 3. Run Gap Detection
    const gaps = detectAeoGaps(cleanDomain, targetBrand, activeCompetitors, promptScans);

    // Calculate aggregated metrics
    const totalPrompts = promptScans.length;
    const mentionedPrompts = promptScans.filter(s => s.shareOfVoice > 0).length;
    const overallShareOfVoice = totalPrompts > 0 ? Math.round((mentionedPrompts / totalPrompts) * 100) : 0;

    const auditData = {
      domain: cleanDomain,
      brandName: targetBrand,
      timestamp: new Date().toISOString(),
      pageAudit,
      promptScans,
      gaps,
      autoDiscoveredKeywords: activeKeywords,
      autoDiscoveredCompetitors: activeCompetitors,
      metrics: {
        overallGeoScore: pageAudit.overallGeoScore,
        schemaScore: pageAudit.schemaScore,
        citationScore: pageAudit.citationScore,
        entityScore: pageAudit.entityScore,
        readabilityScore: pageAudit.readabilityScore,
        shareOfVoice: overallShareOfVoice,
        totalPromptsScanned: totalPrompts,
        activeGapsCount: gaps.length,
      },
    };

    // Attempt Supabase database persist if auth session exists
    try {
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // Upsert project
        const { data: project } = await supabase.from('projects').upsert({
          user_id: user.id,
          domain: cleanDomain,
          name: cleanDomain,
          brand_name: targetBrand,
          target_keywords: activeKeywords,
          competitors: activeCompetitors,
        }, { onConflict: 'domain' }).select().single();

        if (project) {
          // Save audit
          await supabase.from('aeo_audits').insert({
            project_id: project.id,
            overall_geo_score: pageAudit.overallGeoScore,
            schema_score: pageAudit.schemaScore,
            citation_score: pageAudit.citationScore,
            entity_score: pageAudit.entityScore,
            readability_score: pageAudit.readabilityScore,
            audit_details: auditData,
          });
        }
      }
    } catch {
      // Continue seamlessly if Supabase DB is not yet populated
    }

    return NextResponse.json(auditData);
  } catch (error: any) {
    console.error('Error running AEO/GEO analysis:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to complete AEO/GEO analysis' },
      { status: 500 }
    );
  }
}
