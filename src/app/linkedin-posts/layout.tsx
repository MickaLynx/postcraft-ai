import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI LinkedIn Post Generator — PostCraft AI',
  description: 'Generate thought-leadership LinkedIn posts with AI. Drive impressions, comments & leads. 25+ languages. No signup required.',
  keywords: ['LinkedIn post generator', 'AI LinkedIn posts', 'LinkedIn content', 'thought leadership', 'B2B marketing', 'LinkedIn AI writer'],
  openGraph: {
    title: 'Free AI LinkedIn Post Generator — PostCraft AI',
    description: 'Generate high-engagement LinkedIn posts in seconds. Proven formulas, 5 tones, 25+ languages.',
    type: 'website',
  },
  alternates: { canonical: 'https://postcraft.ai/linkedin-posts' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
