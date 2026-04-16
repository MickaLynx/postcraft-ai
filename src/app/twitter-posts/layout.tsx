import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI Tweet Generator — PostCraft AI',
  description: 'Generate viral tweets and Twitter/X threads with AI. Optimized for engagement, retweets & follows. 25+ languages. No signup required.',
  keywords: ['tweet generator', 'AI tweet writer', 'Twitter post generator', 'X post generator', 'viral tweets', 'Twitter AI'],
  openGraph: {
    title: 'Free AI Tweet Generator — PostCraft AI',
    description: 'Generate viral Twitter/X posts in seconds. 5 tones, 25+ languages, 280-char optimized.',
    type: 'website',
  },
  alternates: { canonical: 'https://postcraft.ai/twitter-posts' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
