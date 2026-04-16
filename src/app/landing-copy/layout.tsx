import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Landing Page Copy Generator — AI Copywriting — PostCraft AI',
  description: 'Generate high-converting landing page copy with AI. Hero sections, CTAs, feature blocks, and testimonials — all optimized for conversion.',
};

export default function LandingCopyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
