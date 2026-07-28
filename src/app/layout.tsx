import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'TangentCore — Multi-Model AI Search Optimization & GEO Platform',
  description: 'Analyze, audit, and optimize website Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) across ChatGPT, Gemini, Claude & Perplexity at tangentcore.in.',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="antialiased bg-[#0B0B0C] text-[#F6F6F4] min-h-screen" suppressHydrationWarning>
        <ThemeProvider>
          {children}
          <Toaster position="top-right" theme="dark" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
