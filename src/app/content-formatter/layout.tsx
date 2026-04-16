import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Content Formatter — Cross-Platform Content Optimizer | PostCraft AI',
  description: 'Instantly reformat your content for every social media platform. AI-powered adaptation that matches each platform\'s best practices, character limits, and audience expectations.',
};

export default function ContentFormatterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
