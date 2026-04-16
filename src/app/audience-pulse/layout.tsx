import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Audience Pulse — AI Sentiment & Trend Analysis | PostCraft AI',
  description: 'Monitor real-time audience sentiment and predict content performance with AI. Track trending topics, analyze competitor activity, and get actionable content recommendations.',
};

export default function AudiencePulseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
