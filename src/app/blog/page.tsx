import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — PostCraft AI | Social Media Tips & AI Content Strategies',
  description: 'Learn how to create viral social media content with AI. Tips for Twitter/X, LinkedIn, Instagram, TikTok & Facebook marketing.',
};

const posts = [
  {
    slug: 'funnel-builder-content-decay-guide',
    title: 'Social Media Funnel Builder & Content Decay Tracker: The Complete 2026 Guide to Conversion-Driven Content',
    excerpt: 'Map your social content to TOFU/MOFU/BOFU funnel stages and track content performance decay over time. Funnel scoring, content journey mapping, retargeting strategies, lead magnets, decay curves, half-life analysis, refresh scheduling, evergreen scoring, and the complete lifecycle management workflow.',
    date: '2026-04-16',
    readTime: '30 min read',
    tags: ['Marketing Funnel', 'Content Decay', 'Conversion Optimization', 'Content Lifecycle', 'Lead Generation', 'Evergreen Content'],
  },
  {
    slug: 'event-promo-win-story-guide',
    title: 'Event Promotion & Customer Win Stories: The Complete Social Media Playbook 2026',
    excerpt: 'Master event promotion campaigns and customer success storytelling. 30-day countdown plans, email sequences, partner kits, post-event follow-up, 6-stage story arc frameworks, quote extraction, multi-platform distribution, and amplification strategies.',
    date: '2026-04-16',
    readTime: '28 min read',
    tags: ['Event Marketing', 'Customer Success', 'Social Proof', 'Case Studies', 'Content Distribution'],
  },
  {
    slug: 'social-policy-content-accessibility-guide',
    title: 'Social Media Policy & Content Accessibility: The Complete Enterprise Guide 2026',
    excerpt: 'Build bulletproof social media policies and make every piece of content accessible. Crisis protocols, compliance (GDPR, FTC, ADA), team roles, approval workflows, WCAG standards, inclusive language, alt text best practices, cognitive load optimization, and platform-specific accessibility features.',
    date: '2026-04-16',
    readTime: '32 min read',
    tags: ['Social Media Policy', 'Content Accessibility', 'WCAG', 'Compliance', 'Inclusive Content', 'ADA'],
  },
  {
    slug: 'content-cascade-mood-timing-guide',
    title: 'Content Cascade + Mood Timing: The 2026 Guide to Multi-Platform Content Domination',
    excerpt: 'Turn one piece of content into 30+ platform-optimized pieces and post them when your audience is emotionally primed. The 5-layer cascade framework, psychographic timing model, mood-based content mapping, and the complete workflow.',
    date: '2026-04-16',
    readTime: '26 min read',
    tags: ['Content Cascade', 'Mood Timing', 'Multi-Platform', 'Content Strategy', 'Psychology'],
  },
  {
    slug: 'audience-growth-sponsorship-pitch-guide',
    title: 'Audience Growth Planner & Sponsorship Pitch Generator: Scale and Monetize Your Following',
    excerpt: 'Strategic audience growth roadmaps with milestones, platform hacks, and weekly action plans. Plus: professional sponsorship pitch templates, media kit stats, deliverable packages, negotiation tips, and follow-up sequences.',
    date: '2026-04-16',
    readTime: '25 min read',
    tags: ['Audience Growth', 'Sponsorship', 'Brand Deals', 'Creator Economy', 'Monetization'],
  },
  {
    slug: 'community-manager-paid-social-guide',
    title: 'Community Management & Paid Social Strategy: The Complete 2026 Guide',
    excerpt: 'Master community engagement playbooks, ambassador programs, moderation frameworks, and paid social campaign planning. Budget allocation, A/B testing, audience segmentation, creative briefs, and scaling roadmaps.',
    date: '2026-04-16',
    readTime: '25 min read',
    tags: ['Community Management', 'Paid Social', 'Ambassador Programs', 'Ad Campaigns', 'ROAS'],
  },
  {
    slug: 'algorithm-tracker-topic-miner-guide',
    title: 'Master Social Media Algorithms & Discover Untapped Topics with AI',
    excerpt: 'Decode platform algorithms and mine untapped content topics. Ranking factors, penalty zones, golden topics, emerging narratives, content gaps, and a step-by-step workflow combining both tools for maximum reach.',
    date: '2026-04-16',
    readTime: '23 min read',
    tags: ['Algorithm Tracking', 'Topic Mining', 'Content Discovery', 'Platform Strategy'],
  },
  {
    slug: 'content-formatter-audience-pulse-guide',
    title: 'Cross-Platform Content Formatting & Audience Sentiment Analysis: The Complete 2026 Guide',
    excerpt: 'Master AI-powered content formatting across 9 platforms and real-time audience pulse tracking. The ADAPT framework, sentiment response systems, content predictions, competitor benchmarking, and the combined workflow for maximum impact.',
    date: '2026-04-16',
    readTime: '22 min read',
    tags: ['Content Formatting', 'Audience Pulse', 'Sentiment Analysis', 'Cross-Platform', 'Strategy'],
  },
  {
    slug: 'story-arc-content-velocity-guide',
    title: 'Story Arc Generation & Content Velocity: The Complete 2026 Guide to Building a Content Machine',
    excerpt: 'Master narrative story arcs for social video content and optimize your content velocity. 10 arc styles, 7-beat structure, retention curve optimization, velocity scoring, batch production, and the 90-day acceleration plan.',
    date: '2026-04-16',
    readTime: '24 min read',
    tags: ['Story Arc', 'Content Velocity', 'Video', 'Strategy', 'Productivity'],
  },
  {
    slug: 'dm-scripts-story-planner-guide',
    title: 'DM Scripts & Story Planning: The Complete 2026 Guide to Social Media Outreach',
    excerpt: 'Master cold DM outreach that gets replies and story content planning that builds narrative arcs. Follow-up sequences, engagement sticker strategy, Instagram/TikTok optimization, and conversion funnels.',
    date: '2026-04-16',
    readTime: '20 min read',
    tags: ['DM Scripts', 'Story Planning', 'Outreach', 'Instagram', 'TikTok'],
  },
  {
    slug: 'content-gap-angle-generator-guide',
    title: 'Content Gap Analysis & Angle Generation: The Complete 2026 Guide',
    excerpt: 'Identify content gaps in your social strategy and generate unique content angles — contrarian takes, data-driven hooks, story-based frameworks. Step-by-step process with practical examples.',
    date: '2026-04-16',
    readTime: '22 min read',
    tags: ['Content Gap', 'Angle Generator', 'Strategy', 'Content Planning'],
  },
  {
    slug: 'ad-copy-content-gap-analysis-guide',
    title: 'Ad Copy Mastery & Content Gap Analysis: The Complete 2026 Guide',
    excerpt: 'Master ad copy creation with AIDA, PAS, BAB frameworks and discover content gaps in your social strategy. Platform-specific ad specs, A/B testing, funnel analysis, and actionable playbooks.',
    date: '2026-04-16',
    readTime: '22 min read',
    tags: ['Ad Copy', 'Content Gap', 'Paid Social', 'AIDA', 'PAS', 'Strategy'],
  },
  {
    slug: 'influencer-outreach-content-pillars-guide',
    title: 'Influencer Outreach & Content Pillar Strategy: The Complete 2026 Guide',
    excerpt: 'Master content pillar planning and influencer outreach. Templates, rate cards, negotiation tips, micro-influencer benchmarks, and a 90-day roadmap to scale your social media strategy.',
    date: '2026-04-16',
    readTime: '18 min read',
    tags: ['Influencer Outreach', 'Content Pillars', 'Strategy', 'Rate Cards', 'Templates'],
  },
  {
    slug: 'competitor-tracking-conversion-optimization-guide',
    title: 'Competitor Tracking & Conversion Optimization: The 2026 Guide to Outperforming Your Social Media Rivals',
    excerpt: 'Master the Competitor Drift Framework, full-funnel conversion optimization, CTA placement strategies, A/B testing, pricing psychology, and ROI measurement to systematically outperform your social media competitors.',
    date: '2026-04-16',
    readTime: '24 min read',
    tags: ['Competitor Tracking', 'Conversion Optimization', 'ROI', 'A/B Testing', 'Strategy'],
  },
  {
    slug: 'emotional-analysis-video-pacing-guide',
    title: 'Emotional Content Analysis & Video Pacing: The Science Behind Viral Social Media in 2026',
    excerpt: 'Master emotional hooks, psychological triggers, and platform-specific video pacing to create viral content. AI-driven emotional velocity analysis, retention curve optimization, and the science of the first 3 seconds.',
    date: '2026-04-16',
    readTime: '22 min read',
    tags: ['Emotional Analysis', 'Video Pacing', 'Psychology', 'Viral Content', 'AI'],
  },
  {
    slug: 'carousel-poll-engagement-guide',
    title: 'Carousel Posts & Polls: The 2026 Engagement Playbook',
    excerpt: 'Carousels get 3x more engagement, polls get 2.8x. Learn how to create viral carousel posts and polls for Instagram, LinkedIn, TikTok, and Twitter/X with data-backed strategies and the poll-to-content pipeline.',
    date: '2026-04-16',
    readTime: '12 min read',
    tags: ['Carousels', 'Polls', 'Engagement', 'Instagram', 'LinkedIn'],
  },
  {
    slug: 'compliance-localization-guide',
    title: 'Social Media Compliance & Content Localization: The Complete 2026 Guide',
    excerpt: 'Avoid shadowbans, policy strikes, and FTC fines. Master platform compliance rules for 2026 and learn how to localize social content for 24+ global markets with cultural adaptation strategies.',
    date: '2026-04-16',
    readTime: '20 min read',
    tags: ['Compliance', 'Localization', 'FTC', 'Global Marketing'],
  },
  {
    slug: 'social-seo-caption-optimization-guide',
    title: 'Social SEO & Caption Optimization: The Complete 2026 Guide',
    excerpt: 'Master social search optimization and cross-platform caption writing. Rank on TikTok, Instagram, YouTube Shorts, and Pinterest with keyword strategies, caption formulas, and the 8-point optimization framework.',
    date: '2026-04-16',
    readTime: '20 min read',
    tags: ['Social SEO', 'Caption Optimization', 'Keywords', 'Cross-Platform'],
  },
  {
    slug: 'social-listening-crisis-management-guide',
    title: 'Social Listening & Crisis Management: The Complete 2026 Guide',
    excerpt: 'Master social listening to detect crises before they escalate. Brand monitoring, sentiment tracking, the RACE crisis response framework, recovery timelines, and prevention strategies.',
    date: '2026-04-16',
    readTime: '20 min read',
    tags: ['Social Listening', 'Crisis Management', 'Brand Reputation', 'Strategy'],
  },
  {
    slug: 'trend-tracking-ugc-management-guide',
    title: 'Social Media Trend Tracking & UGC Management: The Complete 2026 Guide',
    excerpt: 'Master social media trend tracking and UGC management. Learn how to identify emerging trends, manage user-generated content rights, and build a UGC strategy that drives 3x engagement.',
    date: '2026-04-16',
    readTime: '22 min read',
    tags: ['Trends', 'UGC', 'Social Listening', 'Strategy'],
  },
  {
    slug: 'content-repurposing-persona-builder-guide',
    title: 'Content Repurposing & Audience Personas: The Complete 2026 Guide',
    excerpt: 'Master content repurposing to 10x your social reach and build audience personas that drive every content decision. Platform-native adaptation, the Repurposing Matrix, and the Persona Framework.',
    date: '2026-04-16',
    readTime: '18 min read',
    tags: ['Repurposing', 'Personas', 'Strategy', 'Cross-Platform'],
  },
  {
    slug: 'competitor-analysis-content-ideas-guide',
    title: 'Competitor Analysis & Content Idea Generation: The Complete 2026 Guide',
    excerpt: 'Master social media competitor analysis and never run out of content ideas. SWOT framework, industry benchmarks, the 4-pillar idea framework, and actionable strategies to outperform any competitor.',
    date: '2026-04-16',
    readTime: '20 min read',
    tags: ['Competitor Analysis', 'Content Ideas', 'Strategy', 'SWOT'],
  },
  {
    slug: 'social-media-roi-posting-times-guide',
    title: 'The Complete Guide to Social Media ROI & Optimal Posting Times (2026)',
    excerpt: 'Calculate your true social media ROI, understand revenue attribution, and discover the best posting times for every platform. Data-driven 2026 benchmarks, formulas, and a 30-day optimization plan.',
    date: '2026-04-16',
    readTime: '22 min read',
    tags: ['ROI', 'Posting Times', 'Analytics', 'Strategy'],
  },
  {
    slug: 'sentiment-influencer-scoring-guide',
    title: 'Sentiment Analysis & Influencer Scoring: The Complete 2026 Guide',
    excerpt: 'Master sentiment analysis for social media and learn how to calculate your influencer score. Empathy Index, emotional dimensions, post valuation, and brand readiness — the definitive guide.',
    date: '2026-04-16',
    readTime: '22 min read',
    tags: ['Sentiment', 'Influencer', 'Analytics', 'Strategy'],
  },
  {
    slug: 'social-media-audit-engagement-guide',
    title: 'The Complete Social Media Audit & Engagement Rate Guide for 2026',
    excerpt: 'Stop guessing. Start measuring. The exact frameworks, formulas, and 2026 benchmarks to audit your social presence and skyrocket your engagement rate.',
    date: '2026-04-16',
    readTime: '20 min read',
    tags: ['Audit', 'Engagement', 'Analytics', 'Strategy'],
  },
  {
    slug: 'scroll-stopping-hooks-guide',
    title: 'The Ultimate Guide to Scroll-Stopping Hooks (2026)',
    excerpt: 'Master the art of hooks that stop the scroll. 7 proven hook styles, platform-specific strategies, and real examples for every platform.',
    date: '2026-04-16',
    readTime: '12 min read',
    tags: ['Hooks', 'Copywriting', 'Strategy'],
  },
  {
    slug: 'content-atomization-strategy',
    title: 'Content Atomization: How to Turn 1 Blog Post into 15+ Social Posts',
    excerpt: 'The complete guide to content atomization — the #1 social media strategy for 2026. Turn long-form content into weeks of platform-native posts automatically.',
    date: '2026-04-16',
    readTime: '10 min read',
    tags: ['Strategy', 'Content Atomization', 'Productivity'],
  },
  {
    slug: 'ai-social-media-content-2026',
    title: 'The State of AI Social Media Content in 2026',
    excerpt: 'How AI content generators evolved from generic text spinners to brand-voice-aware engines that outperform human copywriters on engagement metrics.',
    date: '2026-04-15',
    readTime: '6 min read',
    tags: ['AI', 'Trends', 'Social Media'],
  },
  {
    slug: 'linkedin-posts-that-convert',
    title: '7 LinkedIn Post Formulas That Get 10x Engagement',
    excerpt: 'Proven frameworks for LinkedIn posts that drive comments, shares, and inbound leads. Data-backed analysis of 50,000+ posts.',
    date: '2026-04-12',
    readTime: '8 min read',
    tags: ['LinkedIn', 'Copywriting', 'B2B'],
  },
  {
    slug: 'twitter-thread-strategy',
    title: 'How to Turn One Idea into a Week of Twitter/X Content',
    excerpt: 'The content atomization method: take one insight and generate 7 unique posts across different angles, tones, and formats.',
    date: '2026-04-10',
    readTime: '5 min read',
    tags: ['Twitter/X', 'Strategy', 'Productivity'],
  },
  {
    slug: 'instagram-reels-captions',
    title: 'Instagram Reels Captions That Drive Saves & Shares',
    excerpt: 'Why your Reels captions matter more than your hook. Data from 10,000 posts shows caption length, CTA placement, and hashtag strategy impact.',
    date: '2026-04-08',
    readTime: '7 min read',
    tags: ['Instagram', 'Reels', 'Captions'],
  },
  {
    slug: 'multi-platform-content-strategy',
    title: 'Stop Cross-Posting: Why Platform-Native Content Wins',
    excerpt: 'Cross-posting the same content everywhere kills engagement. Learn how to adapt one message for 5 platforms without 5x the effort.',
    date: '2026-04-05',
    readTime: '6 min read',
    tags: ['Strategy', 'Multi-Platform', 'Content'],
  },
  {
    slug: 'ai-content-for-ecommerce',
    title: 'AI-Powered Product Launch Posts: A Complete Playbook',
    excerpt: 'Generate 50 platform-optimized launch posts in under 10 minutes. Templates, tone guides, and real examples from DTC brands.',
    date: '2026-04-02',
    readTime: '9 min read',
    tags: ['E-commerce', 'Product Launch', 'AI'],
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen px-6 py-20 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-3">PostCraft Blog</h1>
      <p className="text-zinc-400 text-center mb-12 max-w-2xl mx-auto">
        Actionable tips on AI content creation, social media strategy, and growing your audience across every platform.
      </p>

      <div className="space-y-6">
        {posts.map(post => (
          <a key={post.slug} href={`/blog/${post.slug}`} className="glass rounded-2xl p-6 hover:border-pink-500/30 transition cursor-pointer block">
            <div className="flex items-center gap-3 mb-3">
              <time className="text-xs text-zinc-500">{post.date}</time>
              <span className="text-xs text-zinc-600">|</span>
              <span className="text-xs text-zinc-500">{post.readTime}</span>
            </div>
            <h2 className="text-lg font-bold mb-2 hover:text-pink-400 transition">{post.title}</h2>
            <p className="text-sm text-zinc-400 mb-3">{post.excerpt}</p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded">{tag}</span>
              ))}
            </div>
          </a>
        ))}
      </div>

      {/* Internal Links to Platform Tools */}
      <div className="mt-12 glass rounded-2xl p-6">
        <h2 className="text-lg font-bold mb-4 text-center">Try Our Free AI Generators</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <a href="/instagram-captions" className="text-center p-3 bg-zinc-800/50 rounded-xl hover:bg-zinc-700/50 transition">
            <p className="font-medium text-sm">Instagram Captions</p>
            <p className="text-xs text-zinc-500 mt-1">2,200 chars</p>
          </a>
          <a href="/linkedin-posts" className="text-center p-3 bg-zinc-800/50 rounded-xl hover:bg-zinc-700/50 transition">
            <p className="font-medium text-sm">LinkedIn Posts</p>
            <p className="text-xs text-zinc-500 mt-1">Thought leadership</p>
          </a>
          <a href="/twitter-posts" className="text-center p-3 bg-zinc-800/50 rounded-xl hover:bg-zinc-700/50 transition">
            <p className="font-medium text-sm">Twitter/X Posts</p>
            <p className="text-xs text-zinc-500 mt-1">Viral tweets</p>
          </a>
          <a href="/tiktok-scripts" className="text-center p-3 bg-zinc-800/50 rounded-xl hover:bg-zinc-700/50 transition">
            <p className="font-medium text-sm">TikTok Scripts</p>
            <p className="text-xs text-zinc-500 mt-1">Hook-first</p>
          </a>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-xl font-bold mb-3">Want posts like these — but for your brand?</h2>
        <a href="/" className="inline-block px-8 py-3 btn-primary rounded-xl font-semibold text-white">
          Try PostCraft AI Free
        </a>
      </div>
    </main>
  );
}
