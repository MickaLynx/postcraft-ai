import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing — PostCraft AI | Free, Pro & Agency Plans',
  description: 'PostCraft AI pricing: Free (5 posts/day), Pro ($19/mo), Agency ($79/mo). 14-day free trial. Save 21% with annual billing. No credit card required.',
  openGraph: {
    title: 'Pricing — PostCraft AI',
    description: 'Start free. Pro from $19/mo. Agency from $79/mo. 14-day free trial on all paid plans.',
    type: 'website',
  },
  alternates: { canonical: 'https://postcraft.ai/pricing' },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How does the free plan work?', acceptedAnswer: { '@type': 'Answer', text: 'Generate up to 5 posts per day on 3 platforms. No credit card required. No signup needed.' } },
    { '@type': 'Question', name: 'Can I cancel anytime?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, cancel anytime from your dashboard. No lock-in, no questions asked. You keep access until the end of your billing period.' } },
    { '@type': 'Question', name: 'Is there a free trial?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! All paid plans include a 14-day free trial. No credit card required to start.' } },
    { '@type': 'Question', name: 'Do you offer annual billing?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! Save up to 21% with annual billing. Pro is $179/year ($14.92/mo) and Agency is $749/year ($62.42/mo).' } },
    { '@type': 'Question', name: 'What AI model do you use?', acceptedAnswer: { '@type': 'Answer', text: 'We use state-of-the-art LLMs fine-tuned for social media copywriting with platform-specific optimization.' } },
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
