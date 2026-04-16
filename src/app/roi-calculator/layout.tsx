import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Social Media ROI Calculator 2026 — PostCraft AI',
  description:
    'Calculate your social media ROI instantly. Track ad spend, revenue attribution, cost per lead, and get actionable recommendations to maximize your social media investment.',
  keywords: [
    'social media ROI calculator',
    'social media ROI',
    'marketing ROI',
    'social media investment',
    'cost per lead calculator',
  ],
  openGraph: {
    title: 'Free Social Media ROI Calculator 2026 — PostCraft AI',
    description:
      'Calculate your social media ROI instantly. Track ad spend, revenue attribution, and get actionable recommendations.',
    type: 'website',
  },
  alternates: { canonical: 'https://postcraft.ai/roi-calculator' },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How do you calculate social media ROI?', acceptedAnswer: { '@type': 'Answer', text: 'Social media ROI = ((Revenue from Social - Total Investment) / Total Investment) x 100. Total investment includes ad spend plus content creation costs (hours x hourly rate).' } },
    { '@type': 'Question', name: 'What is a good social media ROI?', acceptedAnswer: { '@type': 'Answer', text: 'A positive ROI (above 0%) means you are profitable. Most businesses target 200-500% ROI. Top performers achieve 800%+ through optimized content strategies and audience targeting.' } },
    { '@type': 'Question', name: 'How do I track revenue from social media?', acceptedAnswer: { '@type': 'Answer', text: 'Use UTM parameters, conversion pixels, and attribution tools. Track direct sales, lead generation value, and customer lifetime value from social media traffic.' } },
    { '@type': 'Question', name: 'Which social media platform has the best ROI?', acceptedAnswer: { '@type': 'Answer', text: 'In 2026, LinkedIn leads for B2B (avg 280% ROI), Instagram for e-commerce (avg 320% ROI), and TikTok for brand awareness (avg 250% ROI). The best platform depends on your industry and audience.' } },
    { '@type': 'Question', name: 'Should I include organic content costs in ROI?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Time spent creating content has a cost (your hourly rate or employee wages). Including content creation hours gives a more accurate picture of your true social media investment.' } },
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      {children}
    </>
  );
}
