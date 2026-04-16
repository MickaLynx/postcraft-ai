import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trend Mapper — AI Social Media Trend Prediction — PostCraft AI',
  description: 'Map and predict social media trends with AI. Identify rising content formats, topics, and creator behaviors before they peak.',
};

export default function TrendMapperLayout({ children }: { children: React.ReactNode }) {
  return children;
}
