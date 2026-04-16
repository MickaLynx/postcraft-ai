import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing Page Generator — AI SaaS Pricing — PostCraft AI',
  description: 'Design conversion-optimized pricing pages with AI. Tier structures, psychological anchoring, and copy that drives upgrades.',
};

export default function PricingPageGenLayout({ children }: { children: React.ReactNode }) {
  return children;
}
