import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import './globals.css';

export const metadata: Metadata = {
  title: 'AEO / GEO Expert System — Multi-Model AI Search Optimization',
  description: 'Analyze, audit, and optimize website Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) across ChatGPT, Gemini, Claude & Perplexity.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-slate-950 text-slate-100 min-h-screen">
        {children}
        <Toaster position="top-right" theme="dark" richColors />
      </body>
    </html>
  );
}
