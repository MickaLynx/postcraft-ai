import { GeistSans } from 'geist/font/sans';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PostCraft AI — Generate Viral Social Media Posts in Seconds',
  description: 'AI-powered social media content generator. Create engaging posts for Twitter/X, LinkedIn, Instagram, TikTok & Facebook. Save hours of content creation.',
  keywords: ['social media', 'AI', 'content generator', 'post writer', 'viral posts', 'copywriting'],
  openGraph: {
    title: 'PostCraft AI — Viral Social Posts in Seconds',
    description: 'Generate scroll-stopping social media content with AI. 5 platforms, unlimited creativity.',
    type: 'website',
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PostCraft AI',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '0',
      highPrice: '79',
      priceCurrency: 'USD',
    },
    description: 'AI-powered social media content generator for Twitter/X, LinkedIn, Instagram, TikTok & Facebook.',
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', ratingCount: '2000', bestRating: '5' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PostCraft AI',
    url: 'https://postcraft.ai',
    sameAs: [],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://postcraft.ai' },
      { '@type': 'ListItem', position: 2, name: 'Pricing', item: 'https://postcraft.ai/pricing' },
      { '@type': 'ListItem', position: 3, name: 'Atomizer', item: 'https://postcraft.ai/atomizer' },
      { '@type': 'ListItem', position: 4, name: 'Hooks', item: 'https://postcraft.ai/hooks' },
      { '@type': 'ListItem', position: 5, name: 'Video Scripts', item: 'https://postcraft.ai/video-scripts' },
      { '@type': 'ListItem', position: 6, name: 'Threads', item: 'https://postcraft.ai/threads' },
      { '@type': 'ListItem', position: 7, name: 'Hashtags', item: 'https://postcraft.ai/hashtags' },
      { '@type': 'ListItem', position: 8, name: 'Bios', item: 'https://postcraft.ai/bios' },
      { '@type': 'ListItem', position: 9, name: 'CTA Generator', item: 'https://postcraft.ai/cta-generator' },
      { '@type': 'ListItem', position: 10, name: 'Brand Voice', item: 'https://postcraft.ai/brand-voice' },
      { '@type': 'ListItem', position: 11, name: 'Content Calendar', item: 'https://postcraft.ai/content-calendar' },
      { '@type': 'ListItem', position: 12, name: 'Social Audit', item: 'https://postcraft.ai/social-audit' },
      { '@type': 'ListItem', position: 13, name: 'Engagement Calculator', item: 'https://postcraft.ai/engagement-calculator' },
      { '@type': 'ListItem', position: 14, name: 'Sentiment Analyzer', item: 'https://postcraft.ai/sentiment-analyzer' },
      { '@type': 'ListItem', position: 15, name: 'Influencer Score', item: 'https://postcraft.ai/influencer-score' },
      { '@type': 'ListItem', position: 16, name: 'Competitor Analysis', item: 'https://postcraft.ai/competitor-analysis' },
      { '@type': 'ListItem', position: 17, name: 'Idea Generator', item: 'https://postcraft.ai/idea-generator' },
      { '@type': 'ListItem', position: 18, name: 'ROI Calculator', item: 'https://postcraft.ai/roi-calculator' },
      { '@type': 'ListItem', position: 19, name: 'Post Timing', item: 'https://postcraft.ai/post-timing' },
      { '@type': 'ListItem', position: 20, name: 'Content Repurposer', item: 'https://postcraft.ai/repurpose' },
      { '@type': 'ListItem', position: 21, name: 'Persona Builder', item: 'https://postcraft.ai/persona-builder' },
      { '@type': 'ListItem', position: 22, name: 'Trend Tracker', item: 'https://postcraft.ai/trend-tracker' },
      { '@type': 'ListItem', position: 23, name: 'UGC Manager', item: 'https://postcraft.ai/ugc-manager' },
      { '@type': 'ListItem', position: 24, name: 'Social Listening', item: 'https://postcraft.ai/social-listening' },
      { '@type': 'ListItem', position: 25, name: 'Crisis Management', item: 'https://postcraft.ai/crisis-management' },
      { '@type': 'ListItem', position: 26, name: 'Social SEO', item: 'https://postcraft.ai/social-seo' },
      { '@type': 'ListItem', position: 27, name: 'Caption Optimizer', item: 'https://postcraft.ai/caption-optimizer' },
      { '@type': 'ListItem', position: 28, name: 'Compliance Checker', item: 'https://postcraft.ai/compliance-checker' },
      { '@type': 'ListItem', position: 29, name: 'Content Localizer', item: 'https://postcraft.ai/content-localizer' },
      { '@type': 'ListItem', position: 30, name: 'Virality Score', item: 'https://postcraft.ai/virality-score' },
      { '@type': 'ListItem', position: 31, name: 'A/B Testing', item: 'https://postcraft.ai/ab-testing' },
      { '@type': 'ListItem', position: 32, name: 'Carousel Generator', item: 'https://postcraft.ai/carousel-generator' },
      { '@type': 'ListItem', position: 33, name: 'Poll & Quiz', item: 'https://postcraft.ai/poll-quiz' },
      { '@type': 'ListItem', position: 34, name: 'Emotional Analyzer', item: 'https://postcraft.ai/emotional-analyzer' },
      { '@type': 'ListItem', position: 35, name: 'Video Pacing', item: 'https://postcraft.ai/video-pacing' },
      { '@type': 'ListItem', position: 36, name: 'Comment Reply', item: 'https://postcraft.ai/comment-reply' },
      { '@type': 'ListItem', position: 37, name: 'Link in Bio', item: 'https://postcraft.ai/link-in-bio' },
      { '@type': 'ListItem', position: 38, name: 'Story Planner', item: 'https://postcraft.ai/story-planner' },
      { '@type': 'ListItem', position: 39, name: 'Content Recycler', item: 'https://postcraft.ai/content-recycler' },
      { '@type': 'ListItem', position: 40, name: 'Competitor Tracker', item: 'https://postcraft.ai/competitor-tracker' },
      { '@type': 'ListItem', position: 41, name: 'Conversion Optimizer', item: 'https://postcraft.ai/conversion-optimizer' },
      { '@type': 'ListItem', position: 42, name: 'Influencer Outreach', item: 'https://postcraft.ai/influencer-outreach' },
      { '@type': 'ListItem', position: 43, name: 'Content Pillars', item: 'https://postcraft.ai/content-pillars' },
      { '@type': 'ListItem', position: 44, name: 'Content Gap Analyzer', item: 'https://postcraft.ai/content-gap' },
      { '@type': 'ListItem', position: 45, name: 'Angle Generator', item: 'https://postcraft.ai/angle-generator' },
      { '@type': 'ListItem', position: 46, name: 'Ad Copy Generator', item: 'https://postcraft.ai/ad-copy' },
      { '@type': 'ListItem', position: 47, name: 'Meme Generator', item: 'https://postcraft.ai/meme-generator' },
      { '@type': 'ListItem', position: 48, name: 'Monthly Report', item: 'https://postcraft.ai/monthly-report' },
      { '@type': 'ListItem', position: 49, name: 'Blog', item: 'https://postcraft.ai/blog' },
    ],
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`${GeistSans.variable} font-sans bg-zinc-950 text-zinc-50 antialiased`}>
        <nav className="fixed top-0 w-full glass z-50 px-6 py-3 flex items-center justify-between">
          <span className="font-bold text-lg gradient-text">PostCraft AI</span>
          <div className="flex gap-4 text-sm">
            <a href="/" className="text-zinc-400 hover:text-white transition">Home</a>
            <a href="/dashboard" className="text-zinc-400 hover:text-white transition">Dashboard</a>
            <a href="/pricing" className="text-zinc-400 hover:text-white transition">Pricing</a>
            <a href="/campaign" className="text-zinc-400 hover:text-white transition">Campaign</a>
            <a href="/atomizer" className="text-zinc-400 hover:text-white transition">Atomizer</a>
            <a href="/hooks" className="text-zinc-400 hover:text-white transition">Hooks</a>
            <a href="/video-scripts" className="text-zinc-400 hover:text-white transition">Video Scripts</a>
            <a href="/threads" className="text-zinc-400 hover:text-white transition">Threads</a>
            <a href="/hashtags" className="text-zinc-400 hover:text-white transition">Hashtags</a>
            <a href="/bios" className="text-zinc-400 hover:text-white transition">Bios</a>
            <a href="/cta-generator" className="text-zinc-400 hover:text-white transition">CTAs</a>
            <a href="/brand-voice" className="text-zinc-400 hover:text-white transition">Brand Voice</a>
            <a href="/content-calendar" className="text-zinc-400 hover:text-white transition">Calendar</a>
            <a href="/social-audit" className="text-zinc-400 hover:text-white transition">Audit</a>
            <a href="/engagement-calculator" className="text-zinc-400 hover:text-white transition">Engagement</a>
            <a href="/sentiment-analyzer" className="text-zinc-400 hover:text-white transition">Sentiment</a>
            <a href="/influencer-score" className="text-zinc-400 hover:text-white transition">Influencer</a>
            <a href="/competitor-analysis" className="text-zinc-400 hover:text-white transition">Competitor</a>
            <a href="/idea-generator" className="text-zinc-400 hover:text-white transition">Ideas</a>
            <a href="/roi-calculator" className="text-zinc-400 hover:text-white transition">ROI</a>
            <a href="/post-timing" className="text-zinc-400 hover:text-white transition">Timing</a>
            <a href="/repurpose" className="text-zinc-400 hover:text-white transition">Repurpose</a>
            <a href="/persona-builder" className="text-zinc-400 hover:text-white transition">Persona</a>
            <a href="/trend-tracker" className="text-zinc-400 hover:text-white transition">Trends</a>
            <a href="/ugc-manager" className="text-zinc-400 hover:text-white transition">UGC</a>
            <a href="/social-listening" className="text-zinc-400 hover:text-white transition">Listening</a>
            <a href="/crisis-management" className="text-zinc-400 hover:text-white transition">Crisis</a>
            <a href="/social-seo" className="text-zinc-400 hover:text-white transition">Social SEO</a>
            <a href="/caption-optimizer" className="text-zinc-400 hover:text-white transition">Captions</a>
            <a href="/compliance-checker" className="text-zinc-400 hover:text-white transition">Compliance</a>
            <a href="/content-localizer" className="text-zinc-400 hover:text-white transition">Localizer</a>
            <a href="/virality-score" className="text-zinc-400 hover:text-white transition">Virality</a>
            <a href="/ab-testing" className="text-zinc-400 hover:text-white transition">A/B Test</a>
            <a href="/carousel-generator" className="text-zinc-400 hover:text-white transition">Carousel</a>
            <a href="/poll-quiz" className="text-zinc-400 hover:text-white transition">Polls</a>
            <a href="/emotional-analyzer" className="text-zinc-400 hover:text-white transition">Emotions</a>
            <a href="/video-pacing" className="text-zinc-400 hover:text-white transition">Pacing</a>
            <a href="/comment-reply" className="text-zinc-400 hover:text-white transition">Replies</a>
            <a href="/link-in-bio" className="text-zinc-400 hover:text-white transition">Bio Links</a>
            <a href="/story-planner" className="text-zinc-400 hover:text-white transition">Stories</a>
            <a href="/content-recycler" className="text-zinc-400 hover:text-white transition">Recycler</a>
            <a href="/growth-calculator" className="text-zinc-400 hover:text-white transition">Growth</a>
            <a href="/content-scorecard" className="text-zinc-400 hover:text-white transition">Score</a>
            <a href="/collab-brief" className="text-zinc-400 hover:text-white transition">Collabs</a>
            <a href="/social-proof" className="text-zinc-400 hover:text-white transition">Proof</a>
            <a href="/hashtag-analytics" className="text-zinc-400 hover:text-white transition">Tag Analytics</a>
            <a href="/content-remix" className="text-zinc-400 hover:text-white transition">Remix</a>
            <a href="/dm-scripts" className="text-zinc-400 hover:text-white transition">DM Scripts</a>
            <a href="/competitor-tracker" className="text-zinc-400 hover:text-white transition">Tracker</a>
            <a href="/conversion-optimizer" className="text-zinc-400 hover:text-white transition">Conversion</a>
            <a href="/influencer-outreach" className="text-zinc-400 hover:text-white transition">Outreach</a>
            <a href="/content-pillars" className="text-zinc-400 hover:text-white transition">Pillars</a>
            <a href="/content-gap" className="text-zinc-400 hover:text-white transition">Gap Analysis</a>
            <a href="/ad-copy" className="text-zinc-400 hover:text-white transition">Ad Copy</a>
            <a href="/angle-generator" className="text-zinc-400 hover:text-white transition">Angles</a>
            <a href="/meme-generator" className="text-zinc-400 hover:text-white transition">Memes</a>
            <a href="/monthly-report" className="text-zinc-400 hover:text-white transition">Report</a>
            <a href="/use-cases" className="text-zinc-400 hover:text-white transition">Use Cases</a>
            <a href="/blog" className="text-zinc-400 hover:text-white transition">Blog</a>
          </div>
        </nav>
        <div className="pt-14">{children}</div>
      </body>
    </html>
  );
}
