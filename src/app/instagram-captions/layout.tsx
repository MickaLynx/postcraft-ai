import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI Instagram Caption Generator — PostCraft AI',
  description: 'Generate engaging Instagram captions with AI. Optimized for saves, shares & comments. 25+ languages. No signup required. Try free now.',
  keywords: ['Instagram caption generator', 'AI Instagram captions', 'Instagram post generator', 'caption writer', 'Instagram marketing', 'social media AI'],
  openGraph: {
    title: 'Free AI Instagram Caption Generator — PostCraft AI',
    description: 'Generate scroll-stopping Instagram captions in seconds. 5 tones, 25+ languages, optimized for engagement.',
    type: 'website',
  },
  alternates: { canonical: 'https://postcraft.ai/instagram-captions' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
