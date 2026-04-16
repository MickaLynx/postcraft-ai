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
      { '@type': 'ListItem', position: 49, name: 'UGC Script Generator', item: 'https://postcraft.ai/ugc-scripts' },
      { '@type': 'ListItem', position: 50, name: 'Platform Migration Planner', item: 'https://postcraft.ai/platform-migration' },
      { '@type': 'ListItem', position: 51, name: 'Pricing Page Generator', item: 'https://postcraft.ai/pricing-page-gen' },
      { '@type': 'ListItem', position: 52, name: 'Retention Playbook', item: 'https://postcraft.ai/retention-playbook' },
      { '@type': 'ListItem', position: 53, name: 'Competitor Comparison', item: 'https://postcraft.ai/competitor-comparison' },
      { '@type': 'ListItem', position: 54, name: 'Onboarding Emails', item: 'https://postcraft.ai/onboarding-emails' },
      { '@type': 'ListItem', position: 55, name: 'KPI Dashboard', item: 'https://postcraft.ai/kpi-dashboard' },
      { '@type': 'ListItem', position: 56, name: 'Landing Page Copy', item: 'https://postcraft.ai/landing-copy' },
      { '@type': 'ListItem', position: 56, name: 'Story Arc Generator', item: 'https://postcraft.ai/story-arc' },
      { '@type': 'ListItem', position: 56, name: 'Content Velocity', item: 'https://postcraft.ai/content-velocity' },
      { '@type': 'ListItem', position: 57, name: 'Content Formatter', item: 'https://postcraft.ai/content-formatter' },
      { '@type': 'ListItem', position: 58, name: 'Audience Pulse', item: 'https://postcraft.ai/audience-pulse' },
      { '@type': 'ListItem', position: 59, name: 'Trend Mapper', item: 'https://postcraft.ai/trend-mapper' },
      { '@type': 'ListItem', position: 60, name: 'Content Brief', item: 'https://postcraft.ai/content-brief' },
      { '@type': 'ListItem', position: 61, name: 'Social Inbox', item: 'https://postcraft.ai/social-inbox' },
      { '@type': 'ListItem', position: 62, name: 'Ad Budget Optimizer', item: 'https://postcraft.ai/ad-budget' },
      { '@type': 'ListItem', position: 63, name: 'Algorithm Tracker', item: 'https://postcraft.ai/algorithm-tracker' },
      { '@type': 'ListItem', position: 64, name: 'Topic Miner', item: 'https://postcraft.ai/topic-miner' },
      { '@type': 'ListItem', position: 65, name: 'Community Manager', item: 'https://postcraft.ai/community-manager' },
      { '@type': 'ListItem', position: 66, name: 'Paid Social Planner', item: 'https://postcraft.ai/paid-social' },
      { '@type': 'ListItem', position: 67, name: 'Blog', item: 'https://postcraft.ai/blog' },
      { '@type': 'ListItem', position: 68, name: 'Intent Analyzer', item: 'https://postcraft.ai/intent-analyzer' },
      { '@type': 'ListItem', position: 69, name: 'Brand Checker', item: 'https://postcraft.ai/brand-checker' },
      { '@type': 'ListItem', position: 70, name: 'Emotion Mapper', item: 'https://postcraft.ai/emotion-mapper' },
      { '@type': 'ListItem', position: 71, name: 'Cross-Platform Adapter', item: 'https://postcraft.ai/cross-platform' },
      { '@type': 'ListItem', position: 72, name: 'Audience Growth Planner', item: 'https://postcraft.ai/audience-growth' },
      { '@type': 'ListItem', position: 73, name: 'Sponsorship Pitch Generator', item: 'https://postcraft.ai/sponsorship-pitch' },
      { '@type': 'ListItem', position: 74, name: 'Content Flow Optimizer', item: 'https://postcraft.ai/content-flow' },
      { '@type': 'ListItem', position: 75, name: 'Insight Harvester', item: 'https://postcraft.ai/insight-harvester' },
      { '@type': 'ListItem', position: 76, name: 'Newsletter Generator', item: 'https://postcraft.ai/newsletter-gen' },
      { '@type': 'ListItem', position: 77, name: 'Podcast Promo Generator', item: 'https://postcraft.ai/podcast-promo' },
      { '@type': 'ListItem', position: 78, name: 'Trend Predictor', item: 'https://postcraft.ai/trend-predictor' },
      { '@type': 'ListItem', position: 79, name: 'Content Scaler', item: 'https://postcraft.ai/content-scaler' },
      { '@type': 'ListItem', position: 80, name: 'Ad Compliance Scanner', item: 'https://postcraft.ai/ad-scanner' },
      { '@type': 'ListItem', position: 81, name: 'Content Benchmark', item: 'https://postcraft.ai/content-benchmark' },
      { '@type': 'ListItem', position: 82, name: 'Content Rewriter', item: 'https://postcraft.ai/content-rewriter' },
      { '@type': 'ListItem', position: 83, name: 'Competitor Spy', item: 'https://postcraft.ai/competitor-spy' },
      { '@type': 'ListItem', position: 84, name: 'Bulk Content Generator', item: 'https://postcraft.ai/bulk-generator' },
      { '@type': 'ListItem', position: 85, name: 'Performance Predictor', item: 'https://postcraft.ai/performance-predictor' },
      { '@type': 'ListItem', position: 86, name: 'ToneGuard', item: 'https://postcraft.ai/tone-guard' },
      { '@type': 'ListItem', position: 87, name: 'Cultural Pulse', item: 'https://postcraft.ai/cultural-pulse' },
      { '@type': 'ListItem', position: 88, name: 'Content Cascade', item: 'https://postcraft.ai/content-cascade' },
      { '@type': 'ListItem', position: 89, name: 'Mood Timing', item: 'https://postcraft.ai/mood-timing' },
      { '@type': 'ListItem', position: 90, name: 'Social Media Policy Generator', item: 'https://postcraft.ai/social-policy' },
      { '@type': 'ListItem', position: 91, name: 'Content Accessibility Checker', item: 'https://postcraft.ai/content-a11y' },
      { '@type': 'ListItem', position: 92, name: 'Narrative Engine', item: 'https://postcraft.ai/narrative-engine' },
      { '@type': 'ListItem', position: 93, name: 'Content Rights Vault', item: 'https://postcraft.ai/content-rights' },
      { '@type': 'ListItem', position: 94, name: 'Event Promo Generator', item: 'https://postcraft.ai/event-promo' },
      { '@type': 'ListItem', position: 95, name: 'Win Story Generator', item: 'https://postcraft.ai/win-story' },
      { '@type': 'ListItem', position: 96, name: 'Social Funnel Builder', item: 'https://postcraft.ai/funnel-builder' },
      { '@type': 'ListItem', position: 97, name: 'Content Decay Tracker', item: 'https://postcraft.ai/content-decay' },
      { '@type': 'ListItem', position: 98, name: 'Testimonial Generator', item: 'https://postcraft.ai/testimonial-generator' },
      { '@type': 'ListItem', position: 99, name: 'Trend Hijacking Generator', item: 'https://postcraft.ai/trend-hijacking' },
      { '@type': 'ListItem', position: 100, name: 'Content Syndication Planner', item: 'https://postcraft.ai/content-syndication' },
      { '@type': 'ListItem', position: 101, name: 'Micro-Community Builder', item: 'https://postcraft.ai/micro-community' },
      { '@type': 'ListItem', position: 102, name: 'Community Guidelines Generator', item: 'https://postcraft.ai/community-guidelines' },
      { '@type': 'ListItem', position: 103, name: 'Content Scoring Matrix', item: 'https://postcraft.ai/content-scoring' },
      { '@type': 'ListItem', position: 104, name: 'Content Repurpose Calendar', item: 'https://postcraft.ai/repurpose-calendar' },
      { '@type': 'ListItem', position: 105, name: 'Social Proof Wall Builder', item: 'https://postcraft.ai/proof-wall' },
      { '@type': 'ListItem', position: 106, name: 'Audience Segmentation Engine', item: 'https://postcraft.ai/audience-segmentation' },
      { '@type': 'ListItem', position: 107, name: 'Brand Voice Analyzer', item: 'https://postcraft.ai/brand-voice-analyzer' },
      { '@type': 'ListItem', position: 108, name: 'Content ROI Tracker', item: 'https://postcraft.ai/content-roi' },
      { '@type': 'ListItem', position: 109, name: 'Conversation Depth Predictor', item: 'https://postcraft.ai/conversation-depth' },
      { '@type': 'ListItem', position: 110, name: 'Ecosystem Relevance Mapper', item: 'https://postcraft.ai/ecosystem-mapper' },
      { '@type': 'ListItem', position: 111, name: 'Influencer Vetting Tool', item: 'https://postcraft.ai/influencer-vetting' },
      { '@type': 'ListItem', position: 112, name: 'Content Fatigue Detector', item: 'https://postcraft.ai/content-fatigue' },
      { '@type': 'ListItem', position: 113, name: 'Content Integrity Checker', item: 'https://postcraft.ai/content-integrity' },
      { '@type': 'ListItem', position: 114, name: 'Intent Flow Optimizer', item: 'https://postcraft.ai/intent-flow' },
      { '@type': 'ListItem', position: 115, name: 'AI Storytelling Engine', item: 'https://postcraft.ai/storytelling-engine' },
      { '@type': 'ListItem', position: 116, name: 'Audience Loyalty Tracker', item: 'https://postcraft.ai/audience-loyalty' },
      { '@type': 'ListItem', position: 117, name: 'Content DNA Profiler', item: 'https://postcraft.ai/content-dna' },
      { '@type': 'ListItem', position: 118, name: 'Audience Mood Mapper', item: 'https://postcraft.ai/audience-mood' },
      { '@type': 'ListItem', position: 119, name: 'Content Journey Mapper', item: 'https://postcraft.ai/content-journey' },
      { '@type': 'ListItem', position: 120, name: 'Engagement Quality Score', item: 'https://postcraft.ai/engagement-quality' },
      { '@type': 'ListItem', position: 121, name: 'Content Velocity Tracker', item: 'https://postcraft.ai/velocity-tracker' },
      { '@type': 'ListItem', position: 122, name: 'Competitive Gap Finder', item: 'https://postcraft.ai/competitive-gap' },
      { '@type': 'ListItem', position: 123, name: 'Content Workflow Builder', item: 'https://postcraft.ai/content-workflow' },
      { '@type': 'ListItem', position: 124, name: 'Social Media Simulator', item: 'https://postcraft.ai/social-simulator' },
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
            <a href="/ugc-scripts" className="text-zinc-400 hover:text-white transition">UGC Scripts</a>
            <a href="/platform-migration" className="text-zinc-400 hover:text-white transition">Migration</a>
            <a href="/pricing-page-gen" className="text-zinc-400 hover:text-white transition">Pricing</a>
            <a href="/retention-playbook" className="text-zinc-400 hover:text-white transition">Retention</a>
            <a href="/competitor-comparison" className="text-zinc-400 hover:text-white transition">Compare</a>
            <a href="/onboarding-emails" className="text-zinc-400 hover:text-white transition">Emails</a>
            <a href="/kpi-dashboard" className="text-zinc-400 hover:text-white transition">KPIs</a>
            <a href="/landing-copy" className="text-zinc-400 hover:text-white transition">Landing Copy</a>
            <a href="/story-arc" className="text-zinc-400 hover:text-white transition">Story Arc</a>
            <a href="/content-velocity" className="text-zinc-400 hover:text-white transition">Velocity</a>
            <a href="/content-formatter" className="text-zinc-400 hover:text-white transition">Formatter</a>
            <a href="/audience-pulse" className="text-zinc-400 hover:text-white transition">Pulse</a>
            <a href="/trend-mapper" className="text-zinc-400 hover:text-white transition">Trend Map</a>
            <a href="/content-brief" className="text-zinc-400 hover:text-white transition">Brief</a>
            <a href="/social-inbox" className="text-zinc-400 hover:text-white transition">Inbox</a>
            <a href="/ad-budget" className="text-zinc-400 hover:text-white transition">Ad Budget</a>
            <a href="/algorithm-tracker" className="text-zinc-400 hover:text-white transition">Algorithm</a>
            <a href="/topic-miner" className="text-zinc-400 hover:text-white transition">Topics</a>
            <a href="/community-manager" className="text-zinc-400 hover:text-white transition">Community</a>
            <a href="/paid-social" className="text-zinc-400 hover:text-white transition">Paid Social</a>
            <a href="/intent-analyzer" className="text-zinc-400 hover:text-white transition">Intent</a>
            <a href="/brand-checker" className="text-zinc-400 hover:text-white transition">Brand Check</a>
            <a href="/audience-growth" className="text-zinc-400 hover:text-white transition">Growth Plan</a>
            <a href="/sponsorship-pitch" className="text-zinc-400 hover:text-white transition">Sponsorship</a>
            <a href="/emotion-mapper" className="text-zinc-400 hover:text-white transition">Emotions</a>
            <a href="/cross-platform" className="text-zinc-400 hover:text-white transition">Cross-Platform</a>
            <a href="/content-flow" className="text-zinc-400 hover:text-white transition">Flow</a>
            <a href="/insight-harvester" className="text-zinc-400 hover:text-white transition">Insights</a>
            <a href="/newsletter-gen" className="text-zinc-400 hover:text-white transition">Newsletter</a>
            <a href="/podcast-promo" className="text-zinc-400 hover:text-white transition">Podcast Promo</a>
            <a href="/trend-predictor" className="text-zinc-400 hover:text-white transition">Predictions</a>
            <a href="/content-scaler" className="text-zinc-400 hover:text-white transition">Scaler</a>
            <a href="/ad-scanner" className="text-zinc-400 hover:text-white transition">Ad Scanner</a>
            <a href="/content-benchmark" className="text-zinc-400 hover:text-white transition">Benchmark</a>
            <a href="/content-rewriter" className="text-zinc-400 hover:text-white transition">Rewriter</a>
            <a href="/competitor-spy" className="text-zinc-400 hover:text-white transition">Spy</a>
            <a href="/bulk-generator" className="text-zinc-400 hover:text-white transition">Bulk Gen</a>
            <a href="/performance-predictor" className="text-zinc-400 hover:text-white transition">Predictor</a>
            <a href="/tone-guard" className="text-zinc-400 hover:text-white transition">ToneGuard</a>
            <a href="/cultural-pulse" className="text-zinc-400 hover:text-white transition">Cultural Pulse</a>
            <a href="/content-cascade" className="text-zinc-400 hover:text-white transition">Cascade</a>
            <a href="/mood-timing" className="text-zinc-400 hover:text-white transition">Mood Timing</a>
            <a href="/social-policy" className="text-zinc-400 hover:text-white transition">Policy</a>
            <a href="/content-a11y" className="text-zinc-400 hover:text-white transition">A11y</a>
            <a href="/narrative-engine" className="text-zinc-400 hover:text-white transition">Narrative</a>
            <a href="/content-rights" className="text-zinc-400 hover:text-white transition">Rights</a>
            <a href="/event-promo" className="text-zinc-400 hover:text-white transition">Events</a>
            <a href="/win-story" className="text-zinc-400 hover:text-white transition">Win Stories</a>
            <a href="/testimonial-generator" className="text-zinc-400 hover:text-white transition">Testimonials</a>
            <a href="/trend-hijacking" className="text-zinc-400 hover:text-white transition">Trend Hijack</a>
            <a href="/funnel-builder" className="text-zinc-400 hover:text-white transition">Funnel</a>
            <a href="/content-decay" className="text-zinc-400 hover:text-white transition">Decay</a>
            <a href="/content-syndication" className="text-zinc-400 hover:text-white transition">Syndication</a>
            <a href="/micro-community" className="text-zinc-400 hover:text-white transition">Community+</a>
            <a href="/community-guidelines" className="text-zinc-400 hover:text-white transition">Guidelines</a>
            <a href="/content-scoring" className="text-zinc-400 hover:text-white transition">Scoring</a>
            <a href="/repurpose-calendar" className="text-zinc-400 hover:text-white transition">Repurpose</a>
            <a href="/proof-wall" className="text-zinc-400 hover:text-white transition">Proof Wall</a>
            <a href="/audience-segmentation" className="text-zinc-400 hover:text-white transition">Segments</a>
            <a href="/conversation-depth" className="text-zinc-400 hover:text-white transition">Depth</a>
            <a href="/ecosystem-mapper" className="text-zinc-400 hover:text-white transition">Ecosystem</a>
            <a href="/content-fatigue" className="text-zinc-400 hover:text-white transition">Fatigue</a>
            <a href="/content-roi" className="text-zinc-400 hover:text-white transition">Content ROI</a>
            <a href="/influencer-vetting" className="text-zinc-400 hover:text-white transition">Vetting</a>
            <a href="/content-integrity" className="text-zinc-400 hover:text-white transition">Integrity</a>
            <a href="/intent-flow" className="text-zinc-400 hover:text-white transition">Intent Flow</a>
            <a href="/storytelling-engine" className="text-zinc-400 hover:text-white transition">Storytelling</a>
            <a href="/audience-loyalty" className="text-zinc-400 hover:text-white transition">Loyalty</a>
            <a href="/content-dna" className="text-zinc-400 hover:text-white transition">Content DNA</a>
            <a href="/audience-mood" className="text-zinc-400 hover:text-white transition">Mood Map</a>
            <a href="/content-journey" className="text-zinc-400 hover:text-white transition">Journey</a>
            <a href="/engagement-quality" className="text-zinc-400 hover:text-white transition">Quality</a>
            <a href="/velocity-tracker" className="text-zinc-400 hover:text-white transition">Velocity</a>
            <a href="/competitive-gap" className="text-zinc-400 hover:text-white transition">Gaps</a>
            <a href="/content-workflow" className="text-zinc-400 hover:text-white transition">Workflow</a>
            <a href="/social-simulator" className="text-zinc-400 hover:text-white transition">Simulator</a>
            <a href="/use-cases" className="text-zinc-400 hover:text-white transition">Use Cases</a>
            <a href="/blog" className="text-zinc-400 hover:text-white transition">Blog</a>
          </div>
        </nav>
        <div className="pt-14">{children}</div>
      </body>
    </html>
  );
}
