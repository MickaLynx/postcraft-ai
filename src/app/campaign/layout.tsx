import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Campaign Mode — PostCraft AI | Multi-Platform Content in One Click',
  description: 'Generate an entire cross-platform social media campaign from one topic. Twitter/X, LinkedIn, Instagram, TikTok & Facebook — all at once. Free, 25+ languages.',
};

export default function CampaignLayout({ children }: { children: React.ReactNode }) {
  return children;
}
