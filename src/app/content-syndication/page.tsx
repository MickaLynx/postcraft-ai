'use client';
import { useState } from 'react';

// Option arrays (as const)
const sourceContentTypes = ['Blog Post', 'Video', 'Podcast Episode', 'Webinar', 'Case Study', 'Whitepaper', 'Newsletter', 'Social Post', 'Press Release', 'Research Report'] as const;
const primaryPlatforms = ['LinkedIn', 'Twitter/X', 'Instagram', 'TikTok', 'YouTube', 'Facebook', 'Reddit', 'Medium'] as const;
const industries = ['SaaS/Tech', 'E-commerce', 'Healthcare', 'Finance', 'Education', 'Real Estate', 'Food & Beverage', 'Fashion/Beauty'] as const;
const distributionGoals = ['Maximum Reach', 'Lead Generation', 'SEO Backlinks', 'Community Growth', 'Thought Leadership', 'Brand Awareness', 'Traffic to Website', 'Email List Growth'] as const;
const contentTones = ['Professional', 'Casual', 'Educational', 'Entertaining', 'Inspirational', 'Controversial', 'Data-Driven', 'Storytelling'] as const;
const budgetLevels = ['No Budget (Organic)', 'Low ($50-200)', 'Medium ($200-1000)', 'High ($1000-5000)', 'Enterprise ($5000+)'] as const;

// Result interfaces
interface PlatformDistribution {
  platform: string;
  adaptedFormat: string;
  postingTime: string;
  hashtags: string;
  estimatedReach: string;
  engagementTip: string;
}

interface ContentAdaptation {
  targetFormat: string;
  platform: string;
  keyChanges: string;
  lengthGuideline: string;
  visualRequirements: string;
  ctaStyle: string;
}

interface DistributionTimeline {
  day: string;
  action: string;
  platform: string;
  contentVariant: string;
  expectedMetric: string;
}

interface CrossPromotion {
  strategy: string;
  description: string;
  platforms: string;
  expectedLift: string;
  implementationTip: string;
}

interface AmplificationTactic {
  tactic: string;
  budget: string;
  expectedROI: string;
  timeToResults: string;
  bestFor: string;
}

interface PerformanceTracking {
  metric: string;
  tool: string;
  frequency: string;
  benchmark: string;
  actionThreshold: string;
}

interface SyndicationResult {
  syndicationScore: number;
  reachMultiplier: number;
  platformDistributions: PlatformDistribution[];
  contentAdaptations: ContentAdaptation[];
  distributionTimeline: DistributionTimeline[];
  crossPromotions: CrossPromotion[];
  amplificationTactics: AmplificationTactic[];
  performanceTracking: PerformanceTracking[];
  syndicationHook: string;
  performanceCTA: string;
}

// Utility functions
function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }
function pick<T>(arr: readonly T[] | T[], seed: number, idx: number = 0): T { return arr[(seed + idx) % arr.length]; }

// Large data pools for generation
const adaptedFormatsPool = [
  'Thread (5-8 tweets)',
  'Carousel (8-10 slides)',
  'Short-form video (30-60s)',
  'Long-form article (1500+ words)',
  'Infographic summary',
  'Audio snippet (2-3 min)',
  'Quote card series',
  'LinkedIn document post',
  'Story series (4-6 frames)',
  'Newsletter excerpt with CTA',
  'Reddit deep-dive post',
  'YouTube Shorts clip',
  'Podcast discussion recap',
  'Email drip sequence teaser',
  'Community poll + discussion',
  'Live Q&A recap highlights',
];

const postingTimesPool = [
  'Tuesday 9:00 AM (peak B2B engagement)',
  'Wednesday 11:30 AM (lunch scroll hour)',
  'Thursday 2:00 PM (afternoon productivity dip)',
  'Monday 8:00 AM (fresh week energy)',
  'Friday 12:00 PM (weekend planning mode)',
  'Saturday 10:00 AM (casual browsing)',
  'Sunday 7:00 PM (week-prep mindset)',
  'Wednesday 5:30 PM (commute scroll)',
  'Tuesday 7:00 PM (evening engagement peak)',
  'Thursday 10:00 AM (mid-morning focus)',
  'Monday 12:30 PM (post-meeting break)',
  'Friday 3:00 PM (TGIF engagement boost)',
];

const hashtagSetsPool = [
  '#ContentMarketing #Distribution #Growth',
  '#MarketingStrategy #ContentRepurposing #ROI',
  '#DigitalMarketing #Syndication #Reach',
  '#SocialMedia #ContentStrategy #Engagement',
  '#B2BMarketing #ThoughtLeadership #LinkedIn',
  '#ContentCreator #MultiPlatform #Scale',
  '#GrowthHacking #ContentAmplification #Viral',
  '#MarketingTips #CrossPromotion #Audience',
  '#BrandBuilding #OmniChannel #Strategy',
  '#ContentDistribution #Analytics #Performance',
  '#InboundMarketing #SEO #Backlinks',
  '#CommunityBuilding #Engagement #Loyalty',
  '#VideoMarketing #ShortForm #Trending',
  '#EmailMarketing #Newsletter #Conversion',
];

const estimatedReachPool = [
  '2,500 - 8,000 impressions',
  '5,000 - 15,000 impressions',
  '10,000 - 35,000 impressions',
  '1,200 - 4,500 impressions',
  '8,000 - 25,000 impressions',
  '15,000 - 50,000 impressions',
  '3,500 - 12,000 impressions',
  '500 - 2,000 impressions',
  '20,000 - 75,000 impressions',
  '6,000 - 18,000 impressions',
  '800 - 3,500 impressions',
  '12,000 - 40,000 impressions',
];

const engagementTipsPool = [
  'Lead with a bold stat or contrarian take in the first line',
  'Use native platform features (polls, carousels) for 2x engagement',
  'Reply to every comment within the first hour for algorithm boost',
  'Tag relevant thought leaders to expand organic reach',
  'Post a teaser 24h before the full content drop',
  'Use platform-native video instead of external links',
  'Add a personal story angle to increase relatability',
  'Ask a question at the end to drive comment volume',
  'Pin a follow-up comment with additional context or links',
  'Cross-reference trending topics for discovery boost',
  'Use accessibility features (alt text, captions) for wider reach',
  'Batch engagement: reply to comments in bursts for algorithm signals',
  'Create a cliff-hanger that drives profile visits',
  'Use the 80/20 rule: 80% value, 20% promotion',
];

const targetFormatsPool = [
  'Twitter/X Thread',
  'LinkedIn Article',
  'Instagram Carousel',
  'TikTok Video',
  'YouTube Short',
  'Reddit Discussion Post',
  'Medium Republish',
  'Email Newsletter Section',
  'Pinterest Infographic',
  'Facebook Group Post',
  'Podcast Talking Points',
  'SlideShare Presentation',
  'Quora Answer',
  'Substack Cross-post',
];

const keyChangesPool = [
  'Condense to key takeaways with numbered list format',
  'Add visual storytelling elements and branded graphics',
  'Rewrite in first-person narrative with personal insights',
  'Extract data points and create visual data cards',
  'Convert to step-by-step tutorial format',
  'Add community-specific context and discussion prompts',
  'Simplify jargon for broader consumer audience',
  'Expand with behind-the-scenes context and process details',
  'Restructure as problem-solution-result framework',
  'Add interactive elements (polls, quizzes, sliders)',
  'Convert statistics into shareable quote graphics',
  'Break into micro-content series with cliffhangers',
  'Localize language and references for regional audience',
  'Add expert commentary and contrarian perspectives',
];

const lengthGuidelinesPool = [
  '280 chars per tweet, 5-8 tweet thread',
  '1,300-2,000 words for optimal LinkedIn reach',
  '150 words max caption + 8-10 visual slides',
  '15-60 seconds with hook in first 3 seconds',
  'Under 60 seconds with text overlays',
  '300-500 words with 2-3 embedded links',
  '800-1,500 words with SEO-optimized headers',
  '200-400 words with single clear CTA',
  '1 image + 100-word description per pin',
  '150-300 words with discussion question',
  '3-5 bullet points per talking segment',
  '10-15 slides with minimal text per slide',
];

const visualRequirementsPool = [
  '1200x675px branded header image',
  '1080x1080px square cards with consistent template',
  '9:16 vertical video with captions burned in',
  '16:9 thumbnail with click-worthy text overlay',
  'Custom infographic (1080x1920px)',
  'Brand-colored quote cards with logo watermark',
  'Screen recording with face cam overlay',
  'Animated text graphics (GIF or MP4)',
  'Data visualization charts with brand colors',
  'Photo carousel with text overlay on each slide',
  'Minimal text on dark background for readability',
  'Before/after comparison visual layout',
];

const ctaStylesPool = [
  'Soft CTA: "Follow for more insights like this"',
  'Direct CTA: "Download the full guide (link in bio)"',
  'Engagement CTA: "What do you think? Share below"',
  'Lead gen CTA: "DM me SYNDICATE for the template"',
  'Traffic CTA: "Read the full breakdown at [link]"',
  'Community CTA: "Join 5,000+ in our free group"',
  'Conversion CTA: "Try it free for 14 days"',
  'Social proof CTA: "See why 10K+ marketers use this"',
  'Urgency CTA: "Only available this week"',
  'Value CTA: "Save this post for your next campaign"',
  'Newsletter CTA: "Subscribe for weekly strategies"',
  'Collaboration CTA: "Tag someone who needs this"',
];

const timelineActionsPool = [
  'Publish primary content on source platform',
  'Share teaser clip on Stories/Reels',
  'Post adapted thread on Twitter/X',
  'Cross-post to LinkedIn with native formatting',
  'Submit to relevant Reddit communities',
  'Send newsletter with content highlights',
  'Republish on Medium with canonical link',
  'Launch paid amplification on top performer',
  'Share behind-the-scenes of creation process',
  'Post follow-up with community reactions',
  'Create quote cards from best-performing excerpts',
  'Engage in comments and seed discussions',
  'Repurpose into carousel for Instagram',
  'Record quick video commentary on TikTok',
  'Pin top-performing variant to profile',
  'Send personal outreach to amplifiers/influencers',
];

const contentVariantsPool = [
  'Original long-form version',
  'Condensed thread with key insights',
  'Visual carousel adaptation',
  'Short-form video highlight reel',
  'Audio snippet with commentary',
  'Data-focused infographic extract',
  'Behind-the-scenes narrative',
  'Community discussion prompt',
  'Quote card series (3-5 cards)',
  'Newsletter digest format',
  'Interactive poll based on findings',
  'User-generated content remix',
  'Expert roundup extension',
  'Controversial hot-take angle',
];

const expectedMetricsPool = [
  '500-2,000 impressions, 3-5% engagement rate',
  '1,000-5,000 reach, 50-200 clicks',
  '2,000-8,000 views, 100-500 engagements',
  '200-800 link clicks, 5-15 leads',
  '5,000-15,000 impressions, 2-4% CTR',
  '300-1,200 video views, 8-12% watch rate',
  '50-200 new followers, 20-50 profile visits',
  '100-500 saves/bookmarks, high intent signal',
  '1,500-6,000 reach, 150-400 interactions',
  '20-80 comments, strong discussion signal',
  '10-50 shares/reposts for viral potential',
  '500-2,000 email opens, 15-25% open rate',
];

const crossPromoStrategiesPool = [
  'Platform Bridging',
  'Influencer Seeding',
  'Community Amplification',
  'Employee Advocacy Program',
  'Content Syndication Ring',
  'Collaborative Content Swap',
  'Hashtag Hijacking (Ethical)',
  'Newsletter Cross-Pollination',
  'Podcast Guest Mention Network',
  'Affiliate Content Distribution',
  'Social Proof Cascade',
  'Trend-Jacking Rapid Response',
];

const crossPromoDescriptionsPool = [
  'Tease content on one platform to drive traffic to another, creating a multi-platform flywheel',
  'Seed content with 5-10 micro-influencers in your niche for organic amplification',
  'Share in 3-5 relevant communities with custom context for each group',
  'Equip team members with pre-written posts and talking points for personal sharing',
  'Partner with 3 complementary brands for weekly content exchange',
  'Swap guest content with aligned creators for mutual audience exposure',
  'Align content with trending hashtags while adding genuine unique value',
  'Feature partner content in your newsletter and get featured in theirs',
  'Get mentioned in 2-3 niche podcasts by providing exclusive insights',
  'Create shareable assets that affiliates and partners can distribute',
  'Stack testimonials and results across platforms for compounding trust',
  'Rapidly create content around trending topics to ride discovery waves',
];

const crossPromoPlatformsPool = [
  'LinkedIn + Twitter/X + Newsletter',
  'Instagram + TikTok + YouTube Shorts',
  'Reddit + Medium + Quora',
  'Facebook Groups + LinkedIn Groups',
  'YouTube + Podcast + Blog',
  'Twitter/X + Reddit + Hacker News',
  'Instagram + Pinterest + Blog',
  'All social + Email list',
  'TikTok + Instagram Reels + YouTube Shorts',
  'LinkedIn + Medium + Substack',
];

const expectedLiftPool = [
  '+35-60% total reach across platforms',
  '+20-40% engagement through social proof',
  '+50-100% referral traffic within 2 weeks',
  '+15-30% follower growth on secondary platforms',
  '+25-45% content lifespan extension',
  '+40-80% audience discovery from new channels',
  '+10-25% conversion rate through trust stacking',
  '+30-50% email signups from cross-channel funnels',
  '+60-120% video views through multi-format repurposing',
  '+20-35% community engagement through active seeding',
];

const implementationTipsPool = [
  'Start with your strongest platform, then cascade to others over 5-7 days',
  'Use scheduling tools (Buffer, Hootsuite) to automate the distribution cadence',
  'Personalize each outreach message - no copy-paste templates',
  'Track UTM parameters for every cross-platform link to measure attribution',
  'Engage authentically in communities for 2 weeks before sharing content',
  'Create a shared asset library so team members can grab and post easily',
  'A/B test two hook variations on the first platform before syndicating',
  'Set up Google Alerts for your brand mentions to catch organic amplification',
  'Batch-create all adapted formats before starting the distribution cycle',
  'Follow up with every commenter who shares or engages meaningfully',
  'Maintain a content syndication calendar with deadlines and owners',
  'Measure and optimize after each cycle - double down on what works',
];

const amplificationTacticsPool = [
  'Boost top-performing organic post',
  'LinkedIn Thought Leader Ads',
  'Twitter/X Promoted Tweets',
  'Reddit community sponsorship',
  'Instagram Collab post with creator',
  'YouTube pre-roll on competitor keywords',
  'Facebook group seeding campaign',
  'Email list re-engagement blast',
  'Podcast ad placement in niche shows',
  'Quora answer promotion',
  'Pinterest promoted pins for evergreen content',
  'Influencer whitelisting for paid amplification',
];

const amplificationBudgetsPool = [
  '$0 (organic only)',
  '$25-50 per platform',
  '$50-150 targeted spend',
  '$100-300 for 7-day campaign',
  '$200-500 for multi-platform push',
  '$500-1,000 for full amplification cycle',
  '$1,000-2,500 for enterprise reach',
  '$50-100 for initial testing phase',
  '$150-400 for retargeting layer',
  '$2,500-5,000 for maximum saturation',
];

const amplificationROIsPool = [
  '2.5x-4x return on ad spend',
  '3x-6x for warm audience retargeting',
  '1.5x-3x for cold audience discovery',
  '4x-8x for high-intent keyword targeting',
  '2x-3.5x with consistent optimization',
  '5x-10x for email list monetization',
  '1.8x-4x for brand awareness campaigns',
  '3.5x-7x for lead generation focus',
  '2x-5x for community-driven amplification',
  '6x-12x for retargeting engaged visitors',
];

const timeToResultsPool = [
  '24-48 hours for initial traction',
  '3-5 days for meaningful data',
  '1-2 weeks for full campaign cycle',
  '2-4 weeks for SEO backlink impact',
  '48-72 hours for paid amplification spike',
  'Immediate for email list campaigns',
  '1-3 days for social engagement boost',
  '2-6 weeks for organic community growth',
  '1 week for A/B test conclusions',
  '30-90 days for compounding returns',
];

const bestForPool = [
  'Content with proven organic engagement signals',
  'B2B thought leadership and authority building',
  'Visual content with high save/share ratios',
  'Time-sensitive launches and announcements',
  'Evergreen educational content with long shelf life',
  'Community-driven discussions and debates',
  'Lead generation with clear conversion paths',
  'Brand awareness in new market segments',
  'Re-engaging dormant audience segments',
  'Scaling proven content formulas to new platforms',
];

const trackingMetricsPool = [
  'Cross-Platform Reach',
  'Engagement Rate per Platform',
  'Referral Traffic by Source',
  'Lead Attribution by Channel',
  'Content Lifespan (days active)',
  'Audience Growth Rate',
  'Share of Voice',
  'Click-Through Rate (CTR)',
  'Cost Per Engagement (CPE)',
  'Conversion Rate by Platform',
  'Email Signup Rate from Social',
  'Brand Mention Volume',
];

const trackingToolsPool = [
  'Google Analytics 4 + UTM tracking',
  'Native platform analytics dashboard',
  'Hootsuite / Buffer analytics',
  'Sprout Social cross-platform reports',
  'HubSpot content attribution',
  'Ahrefs / SEMrush for backlink tracking',
  'Brand24 / Mention for social listening',
  'Bitly / Short.io for link click tracking',
  'PostCraft AI performance dashboard',
  'Custom Notion / Sheets tracker',
  'Mixpanel for event-based tracking',
  'Databox for unified KPI dashboard',
];

const trackingFrequenciesPool = [
  'Daily for first 7 days, then weekly',
  'Every 48 hours during active campaign',
  'Weekly rollup with monthly deep dive',
  'Real-time monitoring during launch window',
  'Bi-weekly with quarterly trend analysis',
  'After each content drop + weekly summary',
  'Monthly benchmarking report',
  'Daily automated alerts for anomalies',
  'Weekly during campaign, monthly post-campaign',
  'Continuous with weekly optimization reviews',
];

const trackingBenchmarksPool = [
  'Industry avg: 2.1% engagement rate',
  'Top 10%: 5.5% CTR across platforms',
  'Baseline: 1,000 impressions per post',
  'Standard: 3-5 shares per 1,000 views',
  'Median: 15-day content active lifespan',
  'Average: 2.8% follower growth monthly',
  'Typical: 0.5-1.5% conversion from social',
  'Benchmark: $0.50-2.00 cost per engagement',
  'Industry avg: 20-25% email open rate',
  'Standard: 150-500 referral visits per post',
  'Baseline: 5-15 backlinks per syndicated piece',
  'Average: 30-50 brand mentions per campaign',
];

const actionThresholdsPool = [
  'Below 1% engagement: revise hook and format immediately',
  'Above 5% CTR: increase budget allocation by 2x',
  'Under 500 impressions after 48h: boost or repost',
  'Above 3% conversion: scale to additional platforms',
  'Below 10 shares: test new angle or visual approach',
  'Engagement drop >30%: audit content-market fit',
  'Above 2x ROI: reinvest 50% of profit into next cycle',
  'Zero leads after 1 week: pivot distribution strategy',
  'Above 100 saves: repurpose into evergreen series',
  'Below benchmark by 40%: pause and A/B test variations',
  'Viral signal (10x avg reach): activate all amplification',
  'Negative sentiment >5%: respond and adjust messaging',
];

const syndicationHooksPool = [
  'One piece of content. Eight platforms. 12x the reach. Here is your syndication blueprint.',
  'Stop creating new content for every platform. Start syndicating strategically for 10x impact.',
  'The best marketers do not create more content - they distribute smarter. Here is exactly how.',
  'Why are you only posting on one platform? Your content deserves a multi-channel amplification plan.',
  'Content syndication is the most underused growth lever in marketing. This plan changes that.',
  'Same effort, 8x the reach. Your content syndication strategy is ready.',
  'Your content is only reaching 10% of its potential audience. Let us fix that right now.',
  'One blog post can become 15 pieces of content across 8 platforms. Here is the exact playbook.',
];

const performanceCTAsPool = [
  'Track every metric, optimize every channel. Start syndicating with PostCraft AI today.',
  'From one post to platform domination. Generate your next syndication plan with PostCraft AI.',
  'Maximize your content ROI across every channel. Try PostCraft AI free for 14 days.',
  'Your content syndication engine is one click away. Explore all 110+ PostCraft AI tools.',
  'Stop leaving reach on the table. Build your syndication strategy with PostCraft AI.',
  'Join 15,000+ marketers who syndicate smarter. Get started with PostCraft AI free.',
  'Every piece of content deserves maximum distribution. Let PostCraft AI plan it for you.',
  'Multiply your marketing impact without multiplying your workload. Try PostCraft AI now.',
];

function generateSyndicationPlan(
  sourceType: string,
  primaryPlatform: string,
  industry: string,
  goal: string,
  tone: string,
  budget: string,
  summary: string,
): SyndicationResult {
  const seed = hash(`${sourceType}-${primaryPlatform}-${industry}-${goal}-${tone}-${budget}-${summary}`);

  const syndicationScore = 42 + seed % 55;
  const reachMultiplier = parseFloat((1.5 + ((seed * 7) % 105) / 10).toFixed(1));

  const platformDistributions: PlatformDistribution[] = Array.from({ length: 8 }, (_, i) => ({
    platform: pick([...primaryPlatforms, 'Pinterest', 'Substack', 'Quora', 'Hacker News'], seed, i * 3),
    adaptedFormat: pick(adaptedFormatsPool, seed, i * 4 + 1),
    postingTime: pick(postingTimesPool, seed, i * 5 + 2),
    hashtags: pick(hashtagSetsPool, seed, i * 2 + 3),
    estimatedReach: pick(estimatedReachPool, seed, i * 6),
    engagementTip: pick(engagementTipsPool, seed, i * 3 + 5),
  }));

  const contentAdaptations: ContentAdaptation[] = Array.from({ length: 6 }, (_, i) => ({
    targetFormat: pick(targetFormatsPool, seed, i * 4),
    platform: pick([...primaryPlatforms], seed, i * 3 + 1),
    keyChanges: pick(keyChangesPool, seed, i * 5 + 2),
    lengthGuideline: pick(lengthGuidelinesPool, seed, i * 2 + 3),
    visualRequirements: pick(visualRequirementsPool, seed, i * 6 + 1),
    ctaStyle: pick(ctaStylesPool, seed, i * 3 + 4),
  }));

  const distributionTimeline: DistributionTimeline[] = Array.from({ length: 7 }, (_, i) => ({
    day: `Day ${i + 1}`,
    action: pick(timelineActionsPool, seed, i * 4 + 2),
    platform: pick([...primaryPlatforms], seed, i * 3 + 5),
    contentVariant: pick(contentVariantsPool, seed, i * 5),
    expectedMetric: pick(expectedMetricsPool, seed, i * 2 + 3),
  }));

  const crossPromotions: CrossPromotion[] = Array.from({ length: 5 }, (_, i) => ({
    strategy: pick(crossPromoStrategiesPool, seed, i * 3),
    description: pick(crossPromoDescriptionsPool, seed, i * 4 + 1),
    platforms: pick(crossPromoPlatformsPool, seed, i * 2 + 2),
    expectedLift: pick(expectedLiftPool, seed, i * 5 + 3),
    implementationTip: pick(implementationTipsPool, seed, i * 6),
  }));

  const amplificationTactics: AmplificationTactic[] = Array.from({ length: 5 }, (_, i) => ({
    tactic: pick(amplificationTacticsPool, seed, i * 4 + 1),
    budget: pick(amplificationBudgetsPool, seed, i * 3 + 2),
    expectedROI: pick(amplificationROIsPool, seed, i * 5),
    timeToResults: pick(timeToResultsPool, seed, i * 2 + 4),
    bestFor: pick(bestForPool, seed, i * 6 + 1),
  }));

  const performanceTracking: PerformanceTracking[] = Array.from({ length: 6 }, (_, i) => ({
    metric: pick(trackingMetricsPool, seed, i * 3),
    tool: pick(trackingToolsPool, seed, i * 4 + 1),
    frequency: pick(trackingFrequenciesPool, seed, i * 5 + 2),
    benchmark: pick(trackingBenchmarksPool, seed, i * 2 + 3),
    actionThreshold: pick(actionThresholdsPool, seed, i * 6),
  }));

  return {
    syndicationScore,
    reachMultiplier,
    platformDistributions,
    contentAdaptations,
    distributionTimeline,
    crossPromotions,
    amplificationTactics,
    performanceTracking,
    syndicationHook: pick(syndicationHooksPool, seed, 0),
    performanceCTA: pick(performanceCTAsPool, seed, 1),
  };
}

export default function ContentSyndicationPage() {
  const [sourceType, setSourceType] = useState<string>(sourceContentTypes[0]);
  const [primaryPlatform, setPrimaryPlatform] = useState<string>(primaryPlatforms[0]);
  const [industry, setIndustry] = useState<string>(industries[0]);
  const [goal, setGoal] = useState<string>(distributionGoals[0]);
  const [tone, setTone] = useState<string>(contentTones[0]);
  const [budget, setBudget] = useState<string>(budgetLevels[0]);
  const [summary, setSummary] = useState<string>('');
  const [result, setResult] = useState<SyndicationResult | null>(null);

  const handleGenerate = () => setResult(generateSyndicationPlan(sourceType, primaryPlatform, industry, goal, tone, budget, summary));
  const scoreColor = (n: number) => n > 75 ? '#34d399' : n > 55 ? '#fbbf24' : n > 35 ? '#fb923c' : '#f87171';

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Content Syndication Planner</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Take one piece of content and plan its distribution across multiple platforms. Get format adaptations, posting schedules, cross-promotion strategies, and performance tracking blueprints.</p>

        {/* Form selects */}
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          {[
            { label: 'Source Content Type', value: sourceType, setter: setSourceType, options: sourceContentTypes },
            { label: 'Primary Platform', value: primaryPlatform, setter: setPrimaryPlatform, options: primaryPlatforms },
            { label: 'Industry', value: industry, setter: setIndustry, options: industries },
            { label: 'Distribution Goal', value: goal, setter: setGoal, options: distributionGoals },
            { label: 'Content Tone', value: tone, setter: setTone, options: contentTones },
            { label: 'Budget Level', value: budget, setter: setBudget, options: budgetLevels },
          ].map(({ label, value, setter, options }) => (
            <div key={label}>
              <label className="text-xs text-zinc-400 mb-1 block">{label}</label>
              <select value={value} onChange={e => setter(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100">
                {options.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>

        {/* Textarea for content summary */}
        <div className="mb-8">
          <label className="text-xs text-zinc-400 mb-1 block">Content Summary</label>
          <textarea
            value={summary}
            onChange={e => setSummary(e.target.value)}
            placeholder="Describe the content you want to syndicate across platforms..."
            className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100 h-24 resize-none"
          />
        </div>

        <button onClick={handleGenerate} className="btn-primary px-8 py-3 rounded-lg font-semibold text-lg w-full md:w-auto">Generate Syndication Plan</button>

        {result && (
          <div className="space-y-8 mt-10 fade-in">
            {/* Score Overview */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 rounded-2xl p-6 border border-zinc-800 text-center">
                <div className="text-xs text-zinc-500 mb-2">Syndication Score</div>
                <div className="text-5xl font-bold mb-2" style={{ color: scoreColor(result.syndicationScore) }}>{result.syndicationScore}<span className="text-lg text-zinc-500">/100</span></div>
                <div className="w-full bg-zinc-800 rounded-full h-3"><div className="h-3 rounded-full" style={{ width: `${result.syndicationScore}%`, background: `linear-gradient(90deg, ${scoreColor(result.syndicationScore)}, #a78bfa)` }} /></div>
              </div>
              <div className="bg-zinc-900/60 rounded-2xl p-6 border border-zinc-800 text-center">
                <div className="text-xs text-zinc-500 mb-2">Estimated Reach Multiplier</div>
                <div className="text-5xl font-bold mb-2" style={{ color: '#a78bfa' }}>{result.reachMultiplier}<span className="text-lg text-zinc-500">x</span></div>
                <div className="w-full bg-zinc-800 rounded-full h-3"><div className="h-3 rounded-full" style={{ width: `${Math.min(result.reachMultiplier * 8, 100)}%`, background: 'linear-gradient(90deg, #8b5cf6, #3b82f6)' }} /></div>
              </div>
            </div>

            {/* Syndication Hook & Performance CTA */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 rounded-2xl p-5 border border-violet-500/30">
                <div className="text-xs text-violet-400 mb-2">Syndication Hook</div>
                <p className="text-zinc-100 italic text-lg">&ldquo;{result.syndicationHook}&rdquo;</p>
              </div>
              <div className="bg-zinc-900/60 rounded-2xl p-5 border border-fuchsia-500/30">
                <div className="text-xs text-fuchsia-400 mb-2">Performance CTA</div>
                <p className="text-zinc-100 italic text-lg">&ldquo;{result.performanceCTA}&rdquo;</p>
              </div>
            </div>

            {/* Platform Distribution Plan */}
            <div>
              <h2 className="text-xl font-bold text-zinc-100 mb-4">Platform Distribution Plan</h2>
              <div className="space-y-3">
                {result.platformDistributions.map((pd, i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-2xl p-4 border border-zinc-700/50">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)' }}>{i + 1}</span>
                      <span className="font-semibold text-zinc-100 text-lg">{pd.platform}</span>
                      <span className="ml-auto text-sm text-emerald-400">{pd.estimatedReach}</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-2 text-sm">
                      <div><span className="text-zinc-500">Format:</span> <span className="text-violet-400">{pd.adaptedFormat}</span></div>
                      <div><span className="text-zinc-500">Best Time:</span> <span className="text-blue-400">{pd.postingTime}</span></div>
                      <div><span className="text-zinc-500">Hashtags:</span> <span className="text-zinc-300">{pd.hashtags}</span></div>
                      <div><span className="text-zinc-500">Tip:</span> <span className="text-zinc-300">{pd.engagementTip}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Adaptation Matrix */}
            <div>
              <h2 className="text-xl font-bold text-zinc-100 mb-4">Content Adaptation Matrix</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {result.contentAdaptations.map((ca, i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-2xl p-4 border border-zinc-700/50">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-0.5 bg-violet-600/30 text-violet-300 text-xs rounded-full font-semibold">{ca.targetFormat}</span>
                      <span className="px-2 py-0.5 bg-blue-600/30 text-blue-300 text-xs rounded-full font-semibold">{ca.platform}</span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div><span className="text-zinc-500">Key Changes:</span> <span className="text-zinc-300">{ca.keyChanges}</span></div>
                      <div><span className="text-zinc-500">Length:</span> <span className="text-violet-400">{ca.lengthGuideline}</span></div>
                      <div><span className="text-zinc-500">Visuals:</span> <span className="text-blue-400">{ca.visualRequirements}</span></div>
                      <div><span className="text-zinc-500">CTA:</span> <span className="text-emerald-400">{ca.ctaStyle}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Distribution Timeline */}
            <div>
              <h2 className="text-xl font-bold text-zinc-100 mb-4">7-Day Distribution Timeline</h2>
              <div className="space-y-3">
                {result.distributionTimeline.map((dt, i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-2xl p-4 border border-zinc-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">{dt.day.replace('Day ', '')}</span>
                        <span className="font-semibold text-zinc-100">{dt.action}</span>
                      </div>
                      <span className="text-sm text-violet-400">{dt.platform}</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-2 text-sm">
                      <div><span className="text-zinc-500">Content:</span> <span className="text-zinc-300">{dt.contentVariant}</span></div>
                      <div><span className="text-zinc-500">Expected:</span> <span className="text-emerald-400">{dt.expectedMetric}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cross-Promotion Strategies */}
            <div>
              <h2 className="text-xl font-bold text-zinc-100 mb-4">Cross-Promotion Strategies</h2>
              <div className="space-y-4">
                {result.crossPromotions.map((cp, i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-2xl p-5 border border-zinc-700/50">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'linear-gradient(135deg, #ec4899, #8b5cf6)' }}>{i + 1}</span>
                      <span className="font-semibold text-zinc-100 text-lg">{cp.strategy}</span>
                    </div>
                    <p className="text-sm text-zinc-300 mb-3">{cp.description}</p>
                    <div className="grid md:grid-cols-3 gap-2 text-sm">
                      <div><span className="text-zinc-500">Platforms:</span> <span className="text-violet-400">{cp.platforms}</span></div>
                      <div><span className="text-zinc-500">Expected Lift:</span> <span className="text-emerald-400">{cp.expectedLift}</span></div>
                      <div><span className="text-zinc-500">Tip:</span> <span className="text-zinc-300">{cp.implementationTip}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Amplification Tactics */}
            <div>
              <h2 className="text-xl font-bold text-zinc-100 mb-4">Amplification Tactics</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {result.amplificationTactics.map((at, i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-2xl p-4 border border-zinc-700/50">
                    <div className="text-sm font-semibold text-fuchsia-400 mb-2">{at.tactic}</div>
                    <div className="space-y-1 text-sm">
                      <div><span className="text-zinc-500">Budget:</span> <span className="text-zinc-300">{at.budget}</span></div>
                      <div><span className="text-zinc-500">Expected ROI:</span> <span className="text-emerald-400">{at.expectedROI}</span></div>
                      <div><span className="text-zinc-500">Time to Results:</span> <span className="text-violet-400">{at.timeToResults}</span></div>
                      <div><span className="text-zinc-500">Best For:</span> <span className="text-zinc-300">{at.bestFor}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Tracking Plan */}
            <div>
              <h2 className="text-xl font-bold text-zinc-100 mb-4">Performance Tracking Plan</h2>
              <div className="space-y-3">
                {result.performanceTracking.map((pt, i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-2xl p-4 border border-zinc-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-zinc-100">{pt.metric}</span>
                      <div className="flex gap-3">
                        <span className="text-xs px-2 py-0.5 bg-zinc-700 rounded-full text-zinc-400">{pt.benchmark}</span>
                        <span className="text-xs px-2 py-0.5 bg-violet-600/30 rounded-full text-violet-300">{pt.tool}</span>
                      </div>
                    </div>
                    <p className="text-sm text-zinc-400 mb-1"><span className="text-zinc-500">Frequency:</span> {pt.frequency}</p>
                    <p className="text-sm text-emerald-400">{pt.actionThreshold}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom CTA section */}
            <div className="rounded-2xl p-8 text-center" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(59,130,246,0.2))' }}>
              <h3 className="text-2xl font-bold mb-2">Syndicate Smarter, Not Harder</h3>
              <p className="text-zinc-400 mb-4">Combine syndication planning with our full suite of 110+ content tools for maximum distribution impact.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="/funnel-builder" className="text-violet-400 hover:text-violet-300 text-sm">Funnel Builder</a>
                <a href="/content-cascade" className="text-violet-400 hover:text-violet-300 text-sm">Content Cascade</a>
                <a href="/performance-predictor" className="text-violet-400 hover:text-violet-300 text-sm">Performance Predictor</a>
                <a href="/narrative-engine" className="text-violet-400 hover:text-violet-300 text-sm">Narrative Engine</a>
                <a href="/pricing" className="text-violet-400 hover:text-violet-300 text-sm">View Pricing</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
