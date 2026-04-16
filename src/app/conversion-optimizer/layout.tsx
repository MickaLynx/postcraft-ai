import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conversion Optimizer — Maximize Social Media ROI | PostCraft AI',
  description:
    'Analyze your social media funnel and get AI-powered recommendations for CTA placement, link strategies, and conversion paths. Maximize monetization without being spammy.',
  keywords: [
    'conversion optimizer',
    'social media conversion',
    'CTA optimization',
    'funnel optimization',
    'social media monetization',
    'conversion rate optimization',
    'social media ROI',
    'link strategy',
    'conversion funnel',
  ],
  openGraph: {
    title: 'Conversion Optimizer — Maximize Social Media ROI | PostCraft AI',
    description:
      'AI-powered funnel analysis with CTA placement, link strategies, and conversion path optimization for social media creators and businesses.',
    type: 'website',
  },
  alternates: { canonical: 'https://postcraft.ai/conversion-optimizer' },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is a social media conversion funnel?', acceptedAnswer: { '@type': 'Answer', text: 'A social media conversion funnel maps the journey from awareness (TOFU) through consideration (MOFU) to purchase (BOFU). Each stage requires different content types and CTAs to move followers toward becoming customers.' } },
    { '@type': 'Question', name: 'What is a good social media conversion rate?', acceptedAnswer: { '@type': 'Answer', text: 'Average social media conversion rates range from 1-3% depending on platform and industry. Top performers achieve 5-8% through optimized CTAs, strategic link placement, and audience-matched offers.' } },
    { '@type': 'Question', name: 'How do I optimize CTAs on social media?', acceptedAnswer: { '@type': 'Answer', text: 'Place CTAs where engagement peaks (end of carousels, mid-roll in videos, P.S. lines in captions). Use action verbs, create urgency, and match the CTA to the content type and audience stage in your funnel.' } },
    { '@type': 'Question', name: 'How can I monetize social media without being spammy?', acceptedAnswer: { '@type': 'Answer', text: 'Follow the 80/20 rule: 80% value content, 20% promotional. Use soft CTAs in value posts and direct CTAs only in dedicated sales content. Build trust through social proof and storytelling before asking for the sale.' } },
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
