-- ==========================================
-- AEO/GEO EXPERT PLATFORM - SUPABASE SCHEMA
-- ==========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  domain TEXT NOT NULL,
  name TEXT NOT NULL,
  brand_name TEXT,
  target_keywords TEXT[] DEFAULT '{}',
  competitors TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS for Projects
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own projects"
  ON public.projects
  FOR ALL
  USING (auth.uid() = user_id);

-- 2. AEO AUDITS TABLE
CREATE TABLE IF NOT EXISTS public.aeo_audits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  overall_geo_score INT DEFAULT 0,
  schema_score INT DEFAULT 0,
  citation_score INT DEFAULT 0,
  entity_score INT DEFAULT 0,
  readability_score INT DEFAULT 0,
  audit_details JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS for Audits
ALTER TABLE public.aeo_audits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can access their project audits"
  ON public.aeo_audits
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE public.projects.id = public.aeo_audits.project_id
      AND public.projects.user_id = auth.uid()
    )
  );

-- 3. PROMPT SCANS TABLE (Multi-Model AI Simulations)
CREATE TABLE IF NOT EXISTS public.prompt_scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  prompt_text TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  model_name TEXT NOT NULL, -- e.g. 'chatgpt', 'gemini', 'claude', 'deepseek', 'grok', 'perplexity'
  brand_mentioned BOOLEAN DEFAULT FALSE,
  sentiment TEXT DEFAULT 'neutral', -- 'positive', 'neutral', 'negative'
  rank_position INT DEFAULT 0,
  ai_response_text TEXT,
  citations TEXT[] DEFAULT '{}',
  scanned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS for Prompt Scans
ALTER TABLE public.prompt_scans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can access prompt scans for their projects"
  ON public.prompt_scans
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE public.projects.id = public.prompt_scans.project_id
      AND public.projects.user_id = auth.uid()
    )
  );

-- 4. CITATIONS TABLE
CREATE TABLE IF NOT EXISTS public.citations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  source_url TEXT NOT NULL,
  target_url TEXT NOT NULL,
  model_name TEXT NOT NULL,
  citation_context TEXT,
  is_own_domain BOOLEAN DEFAULT FALSE,
  detected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS for Citations
ALTER TABLE public.citations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can access citations for their projects"
  ON public.citations
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE public.projects.id = public.citations.project_id
      AND public.projects.user_id = auth.uid()
    )
  );

-- 5. GAP ANALYSIS TABLE
CREATE TABLE IF NOT EXISTS public.gap_analysis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  missing_prompt TEXT NOT NULL,
  competitor_domain TEXT NOT NULL,
  opportunity_score INT DEFAULT 50,
  suggested_content_brief TEXT,
  status TEXT DEFAULT 'open', -- 'open', 'in_progress', 'resolved'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS for Gap Analysis
ALTER TABLE public.gap_analysis ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can access gap analysis for their projects"
  ON public.gap_analysis
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE public.projects.id = public.gap_analysis.project_id
      AND public.projects.user_id = auth.uid()
    )
  );
