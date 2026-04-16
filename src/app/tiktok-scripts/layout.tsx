import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI TikTok Script Generator — PostCraft AI',
  description: 'Generate viral TikTok scripts and captions with AI. Hook-first structure, trending formats. 25+ languages. No signup required.',
  keywords: ['TikTok script generator', 'AI TikTok captions', 'TikTok content creator', 'viral TikTok scripts', 'short-form video AI'],
  openGraph: {
    title: 'Free AI TikTok Script Generator — PostCraft AI',
    description: 'Generate viral TikTok scripts in seconds. Hook-first, trending formats, 25+ languages.',
    type: 'website',
  },
  alternates: { canonical: 'https://postcraft.ai/tiktok-scripts' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
