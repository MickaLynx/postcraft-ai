import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Time to Post on Social Media 2026 — Free Calculator | PostCraft AI',
  description:
    'Find the best times to post on Instagram, TikTok, LinkedIn, Twitter/X, Facebook & YouTube in 2026. Data-driven posting schedule optimizer with heatmap.',
  keywords: [
    'best time to post',
    'social media timing',
    'posting schedule',
    'when to post on instagram',
    'best time to post on tiktok',
  ],
  openGraph: {
    title: 'Best Time to Post on Social Media 2026 — Free Calculator | PostCraft AI',
    description:
      'Find the best times to post on Instagram, TikTok, LinkedIn, Twitter/X, Facebook & YouTube in 2026. Data-driven posting schedule optimizer with heatmap.',
    type: 'website',
  },
  alternates: { canonical: 'https://postcraft.ai/post-timing' },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is the best time to post on Instagram in 2026?', acceptedAnswer: { '@type': 'Answer', text: 'The best times to post on Instagram in 2026 are Tuesday at 11am, Wednesday at 10am, and Friday at 2pm (adjusted for your audience timezone). Reels perform best during lunch hours, while carousel posts peak in early morning.' } },
    { '@type': 'Question', name: 'Does posting time really affect engagement?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Posts published during peak activity windows receive 47% more engagement on average. Platform algorithms prioritize content that gains early traction, so timing your post when your audience is most active creates a compounding effect on reach.' } },
    { '@type': 'Question', name: 'What is the best time to post on TikTok?', acceptedAnswer: { '@type': 'Answer', text: 'In 2026, the best times to post on TikTok are Tuesday at 2pm, Thursday at 3pm, and Friday at 5pm. TikTok engagement peaks later in the day compared to LinkedIn or Twitter, as users scroll during evening hours.' } },
    { '@type': 'Question', name: 'Should I post at the same time every day?', acceptedAnswer: { '@type': 'Answer', text: 'Not necessarily. Different days have different peak windows. Tuesday through Thursday generally outperform weekends for B2B content, while entertainment and lifestyle content performs well on weekends. Consistency in frequency matters more than posting at the exact same time.' } },
    { '@type': 'Question', name: 'How many times per week should I post on social media?', acceptedAnswer: { '@type': 'Answer', text: 'It depends on the platform: Instagram 4-7x/week, TikTok 5-7x/week, LinkedIn 3-5x/week, Twitter/X 10-15x/week, Facebook 3-5x/week, and YouTube 1-3x/week. Quality always trumps quantity — reduce frequency if engagement drops.' } },
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
