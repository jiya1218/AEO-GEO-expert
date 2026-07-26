import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';

  if (code) {
    const cookieStore = await cookies();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options: any }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Ignore error from server component call
          }
        },
      },
    });

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const defaultAppUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://aeo-geo-expert.vercel.app';
      const forwardedHost = request.headers.get('x-forwarded-host');
      
      let targetBaseUrl = defaultAppUrl;
      if (forwardedHost && !forwardedHost.includes('localhost') && !forwardedHost.includes('127.0.0.1')) {
        targetBaseUrl = `https://${forwardedHost}`;
      } else if (origin && !origin.includes('localhost') && !origin.includes('127.0.0.1')) {
        targetBaseUrl = origin;
      }

      return NextResponse.redirect(`${targetBaseUrl}/login?verified=true`);
    }
  }

  const defaultAppUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://aeo-geo-expert.vercel.app';
  const safeBaseUrl = (origin && !origin.includes('localhost') && !origin.includes('127.0.0.1'))
    ? origin
    : defaultAppUrl;

  return NextResponse.redirect(`${safeBaseUrl}/dashboard`);
}
