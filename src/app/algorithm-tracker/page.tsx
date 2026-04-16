'use client';
import { useState } from 'react';

const platforms = ['Instagram', 'TikTok', 'Twitter/X', 'LinkedIn', 'YouTube', 'Facebook', 'Pinterest', 'Snapchat'] as const;
const contentTypes = ['Video', 'Image', 'Carousel', 'Text', 'Story', 'Live', 'Reel', 'Short'] as const;
const goals = ['Reach', 'Engagement', 'Followers', 'Conversions', 'Brand Awareness', 'Traffic'] as const;
const timeframes = ['This Week', 'This Month', 'This Quarter', 'Last Update'] as const;

interface AlgorithmSnapshot {
  platform: string;
  lastUpdate: string;
  majorChanges: string[];
  impactLevel: 'Critical' | 'High' | 'Medium' | 'Low';
}

interface RankingFactor {
  factor: string;
  weight: number;
  trend: 'Rising' | 'Stable' | 'Declining';
  tip: string;
}

interface ContentRule {
  rule: string;
  priority: number;
  explanation: string;
  example: string;
}

interface OptimizationTip {
  tip: string;
  impact: number;
  effort: string;
  category: string;
}

interface PenaltyZone {
  behavior: string;
  severity: number;
  consequence: string;
  alternative: string;
}

interface TrendingFormat {
  format: string;
  growthRate: number;
  optimalLength: string;
  bestPractice: string;
}

interface AlgorithmResult {
  algorithmSnapshot: AlgorithmSnapshot;
  rankingFactors: RankingFactor[];
  contentRules: ContentRule[];
  optimizationTips: OptimizationTip[];
  penaltyZones: PenaltyZone[];
  trendingFormats: TrendingFormat[];
}

function generateAlgorithmAnalysis(
  platform: string,
  contentType: string,
  goal: string,
  timeframe: string,
  niche: string
): AlgorithmResult {
  const nicheLabel = niche || 'general content';

  const snapshotData: Record<string, { lastUpdate: string; majorChanges: string[]; impactLevel: 'Critical' | 'High' | 'Medium' | 'Low' }> = {
    'Instagram': {
      lastUpdate: 'April 8, 2026',
      majorChanges: [
        'Reels now prioritized 3x over static images in Explore',
        'Carousel dwell-time weight increased by 40%',
        'Comment-reply threads now boost post visibility significantly',
        'New "Original Content" bonus — reposts from other platforms penalized',
        'Close-friends story views now factor into feed ranking',
      ],
      impactLevel: 'Critical',
    },
    'TikTok': {
      lastUpdate: 'April 5, 2026',
      majorChanges: [
        'Watch-through rate now weighted 2x higher than likes',
        'Videos under 90 seconds get a distribution bonus on For You page',
        'Comment engagement within first 30 minutes is the top velocity signal',
        'Photo carousels now eligible for For You page distribution',
        'Creator credibility score introduced — consistent posting rewarded',
      ],
      impactLevel: 'Critical',
    },
    'Twitter/X': {
      lastUpdate: 'March 29, 2026',
      majorChanges: [
        'Long-form posts (280+ chars) get 35% more distribution',
        'Bookmark-to-impression ratio now a key ranking signal',
        'Community Notes contributors get visibility boost',
        'Reply chains weighted higher — thread engagement matters more',
        'Blue/Premium subscribers get 2x initial impression distribution',
      ],
      impactLevel: 'High',
    },
    'LinkedIn': {
      lastUpdate: 'April 2, 2026',
      majorChanges: [
        'Dwell time is now the #1 feed ranking factor (surpassing reactions)',
        'Document/carousel posts get 2.5x more reach than text-only',
        'External links in posts penalized 50% — use comments instead',
        'First-degree connection engagement weighted 3x over followers',
        'Video posts under 2 minutes now boosted in feed',
      ],
      impactLevel: 'High',
    },
    'YouTube': {
      lastUpdate: 'April 1, 2026',
      majorChanges: [
        'Shorts algorithm now separate from long-form — different metrics apply',
        'Average view duration replaced by "satisfaction signals" (likes + shares post-watch)',
        'Thumbnail click-through rate threshold raised to 6% for recommendation push',
        'Community posts now factor into channel authority score',
        'Multi-format creators (Shorts + Long + Live) get a channel-level boost',
      ],
      impactLevel: 'High',
    },
    'Facebook': {
      lastUpdate: 'March 25, 2026',
      majorChanges: [
        'Group content now prioritized over page content in feed',
        'Reels getting 4x distribution of standard video posts',
        'Meaningful interaction signals (long comments, shares-with-text) boosted',
        'AI-generated content flagged and shown to fewer people',
        'Local content relevancy score introduced for geo-targeting',
      ],
      impactLevel: 'Medium',
    },
    'Pinterest': {
      lastUpdate: 'March 20, 2026',
      majorChanges: [
        'Idea Pins now merged with standard Pins — all Pins can include multiple pages',
        'Fresh content bonus extended from 30 to 90 days',
        'Product tagging in Pins increases distribution by 60%',
        'Keyword relevancy in Pin description now weighted higher than board name',
        'Video Pins under 60 seconds get a homepage distribution boost',
      ],
      impactLevel: 'Medium',
    },
    'Snapchat': {
      lastUpdate: 'March 18, 2026',
      majorChanges: [
        'Spotlight algorithm now favors creators with 7+ day posting streaks',
        'Stories with interactive elements (polls, questions) shown to wider audience',
        'AR lens engagement now factors into content distribution',
        'Snap Map content discovery expanded to non-friends',
        'Longer Spotlights (60-90s) now outperform shorter clips',
      ],
      impactLevel: 'Low',
    },
  };

  const rankingFactorsData: Record<string, RankingFactor[]> = {
    'Instagram': [
      { factor: 'Reel Completion Rate', weight: 95, trend: 'Rising', tip: 'Hook viewers in the first 0.5 seconds — use text overlays or motion' },
      { factor: 'Saves & Shares', weight: 90, trend: 'Rising', tip: 'Create "reference-worthy" content that people want to revisit' },
      { factor: 'Comment Depth (replies per comment)', weight: 82, trend: 'Rising', tip: 'Ask open-ended questions and reply to every comment within 1 hour' },
      { factor: 'Carousel Swipe-Through Rate', weight: 78, trend: 'Stable', tip: 'Use cliffhangers between slides to maximize swipe completion' },
      { factor: 'Story Interaction Rate', weight: 72, trend: 'Stable', tip: 'Use 2-3 interactive stickers per story (polls, sliders, quizzes)' },
      { factor: 'Post Consistency (weekly cadence)', weight: 68, trend: 'Rising', tip: 'Post at least 4x/week — the algorithm rewards consistent creators' },
      { factor: 'Hashtag Relevancy Score', weight: 55, trend: 'Declining', tip: 'Use 3-5 hyper-relevant hashtags instead of 30 generic ones' },
      { factor: 'Account Authority (niche consistency)', weight: 85, trend: 'Rising', tip: `Stay focused on ${nicheLabel} — niche accounts get 2x more Explore reach` },
    ],
    'TikTok': [
      { factor: 'Watch-Through Rate', weight: 97, trend: 'Rising', tip: 'Keep videos between 21-34 seconds for maximum completion rates' },
      { factor: 'Share Rate', weight: 91, trend: 'Rising', tip: 'Create "send this to someone who..." hooks to drive shares' },
      { factor: 'Comment Velocity (first 30 min)', weight: 88, trend: 'Rising', tip: 'Post when your audience is most active and reply immediately' },
      { factor: 'Replay Rate', weight: 84, trend: 'Rising', tip: 'Add a hidden detail or fast moment that makes viewers rewatch' },
      { factor: 'Profile Visit Rate', weight: 76, trend: 'Stable', tip: 'End with a CTA that drives profile visits — "more on my page"' },
      { factor: 'Sound/Audio Trending Score', weight: 72, trend: 'Stable', tip: 'Use trending sounds within the first 48 hours of their rise' },
      { factor: 'Posting Consistency', weight: 65, trend: 'Rising', tip: 'Post 1-2x daily — the algorithm favors active creators' },
      { factor: 'Creator Credibility Score', weight: 70, trend: 'Rising', tip: 'Maintain a 7-day posting streak to unlock higher distribution tiers' },
    ],
    'Twitter/X': [
      { factor: 'Bookmark Rate', weight: 92, trend: 'Rising', tip: 'Write actionable threads and lists that people want to save for later' },
      { factor: 'Reply Quality & Depth', weight: 85, trend: 'Rising', tip: 'Engage in meaningful conversations — one-word replies hurt you' },
      { factor: 'Retweet + Quote Tweet Ratio', weight: 80, trend: 'Stable', tip: 'Make your content quotable — strong opinions and data points work best' },
      { factor: 'Follower Engagement Rate', weight: 76, trend: 'Stable', tip: 'Engage with your followers\' content — reciprocity signals matter' },
      { factor: 'Impression-to-Engagement Ratio', weight: 73, trend: 'Stable', tip: 'If impressions are high but engagement is low, your hook needs work' },
      { factor: 'Media Attachment (images/video)', weight: 68, trend: 'Rising', tip: 'Posts with images get 2x engagement — use custom graphics over stock' },
      { factor: 'Post Timing Relevance', weight: 60, trend: 'Stable', tip: 'Post during your audience\'s active hours (check analytics)' },
      { factor: 'Account Premium Status', weight: 78, trend: 'Rising', tip: 'Premium subscribers get initial distribution boost — factor this into strategy' },
    ],
    'LinkedIn': [
      { factor: 'Dwell Time (reading duration)', weight: 96, trend: 'Rising', tip: 'Write longer, formatted posts (1200+ chars) with line breaks for readability' },
      { factor: 'Document/Carousel Engagement', weight: 88, trend: 'Rising', tip: 'Create 8-12 slide carousels with one key insight per slide' },
      { factor: 'Comment Length & Quality', weight: 85, trend: 'Rising', tip: 'Leave thoughtful 3+ sentence comments on others\' posts daily' },
      { factor: 'First-Hour Engagement Velocity', weight: 82, trend: 'Stable', tip: 'Notify your network when posting — DM 5-10 close connections' },
      { factor: 'Connection Strength Score', weight: 79, trend: 'Rising', tip: 'Engage regularly with connections — the algorithm tracks relationship depth' },
      { factor: 'Content Originality', weight: 74, trend: 'Rising', tip: 'Share personal stories and original data — repurposed content is deprioritized' },
      { factor: 'Profile Completeness', weight: 62, trend: 'Stable', tip: 'Complete all profile sections — LinkedIn rewards "All-Star" profiles' },
      { factor: 'Video Under 2 Minutes', weight: 70, trend: 'Rising', tip: 'Native video gets 5x reach of YouTube links — always upload natively' },
    ],
  };

  const defaultRankingFactors: RankingFactor[] = [
    { factor: 'Content Relevancy Score', weight: 90, trend: 'Rising', tip: 'Align content closely with your niche keywords and audience interests' },
    { factor: 'Engagement Velocity', weight: 85, trend: 'Rising', tip: 'Get engagement quickly after posting — time your posts for peak activity' },
    { factor: 'Save/Bookmark Rate', weight: 82, trend: 'Rising', tip: 'Create valuable, reference-worthy content that people want to revisit' },
    { factor: 'Share/Forward Rate', weight: 80, trend: 'Stable', tip: 'Make content emotionally resonant or practically useful to drive shares' },
    { factor: 'Comment Quality', weight: 75, trend: 'Rising', tip: 'Prompt meaningful discussions — avoid one-word engagement bait' },
    { factor: 'Post Consistency', weight: 70, trend: 'Stable', tip: 'Maintain a regular posting schedule — at least 3-5x per week' },
    { factor: 'Profile Authority', weight: 68, trend: 'Rising', tip: 'Build authority through consistent niche content and engagement' },
    { factor: 'Content Freshness', weight: 65, trend: 'Stable', tip: 'Post original content — reposts and duplicates are deprioritized' },
  ];

  const contentRulesData: Record<string, ContentRule[]> = {
    'Instagram': [
      { rule: 'Hook in First 0.5 Seconds', priority: 98, explanation: 'The algorithm measures instant drop-off — losing viewers in the first half-second kills your reach', example: 'Start with a bold text overlay or surprising visual instead of a slow intro' },
      { rule: 'Post Reels Over Static Images', priority: 94, explanation: 'Reels receive 3x the distribution of static posts in Explore and feed', example: 'Convert your carousel ideas into short animated Reels with text overlays' },
      { rule: 'Avoid External Links in Captions', priority: 88, explanation: 'Instagram suppresses posts that try to send users off-platform', example: 'Use "link in bio" and update your bio link instead of posting URLs' },
      { rule: 'Respond to Comments Within 60 Minutes', priority: 85, explanation: 'Quick replies signal active engagement and trigger re-distribution of your post', example: 'Set notifications for the first hour after posting and reply to every comment' },
      { rule: 'Use Original Audio', priority: 80, explanation: 'The "Original Content" bonus rewards creators who use their own audio over repurposed sounds', example: 'Record voiceovers or use original background music instead of trending sounds' },
      { rule: 'Cross-Post Sparingly', priority: 75, explanation: 'Content detected as reposts from TikTok or other platforms gets reduced distribution', example: 'Re-record content natively on Instagram rather than downloading and re-uploading' },
    ],
    'TikTok': [
      { rule: 'Optimize for Replay Value', priority: 97, explanation: 'Replay rate is weighted even higher than initial completion — design for multiple watches', example: 'Hide a subtle detail or Easter egg that viewers want to catch on second viewing' },
      { rule: 'Keep Videos Under 90 Seconds', priority: 93, explanation: 'Videos under 90 seconds get a distribution bonus on the For You page', example: 'Edit ruthlessly — cut any moment that doesn\'t add value to the viewer' },
      { rule: 'Front-Load the Hook', priority: 91, explanation: 'The first 2 seconds determine whether TikTok pushes your video to the next audience tier', example: '"This one trick changed everything about my [niche]..." — start with the payoff' },
      { rule: 'Engage in Comments Immediately', priority: 86, explanation: 'Comment velocity in the first 30 minutes is the strongest distribution signal', example: 'Pin a controversial or question-based comment to spark discussion' },
      { rule: 'Post During Peak Hours', priority: 79, explanation: 'Initial engagement velocity determines algorithmic push — timing is critical', example: 'Check your analytics for peak hours — typically 7-9 PM and 12-1 PM' },
      { rule: 'Maintain Posting Streaks', priority: 75, explanation: 'The new Creator Credibility Score rewards 7+ day consecutive posting', example: 'Batch-create content and schedule — never break your streak' },
    ],
    'Twitter/X': [
      { rule: 'Write for Bookmarks', priority: 95, explanation: 'Bookmark rate has become the strongest signal for algorithmic distribution on X', example: 'Create actionable lists, frameworks, and "save this for later" content' },
      { rule: 'Use Long-Form Posts', priority: 88, explanation: 'Posts over 280 characters get 35% more distribution than short posts', example: 'Write 3-5 paragraph posts with clear formatting and line breaks' },
      { rule: 'Thread Strategically', priority: 84, explanation: 'Thread engagement (clicks through to next tweet) is a strong ranking signal', example: 'Use a strong hook in tweet 1 and cliffhangers between each tweet' },
      { rule: 'Avoid Engagement Bait', priority: 82, explanation: 'The algorithm now detects and penalizes "like if you agree" type posts', example: 'Ask genuine questions that invite thoughtful replies instead' },
      { rule: 'Include Visual Media', priority: 78, explanation: 'Posts with images/video get 2x engagement — the algorithm rewards media-rich content', example: 'Create custom graphics, screenshots with annotations, or short video clips' },
      { rule: 'Engage Before and After Posting', priority: 72, explanation: 'Active engagement around your posting time signals to the algorithm that you\'re a real user', example: 'Spend 15 minutes replying to others before and after publishing your post' },
    ],
    'LinkedIn': [
      { rule: 'Maximize Dwell Time', priority: 97, explanation: 'Dwell time is now the #1 ranking factor — longer reading = more reach', example: 'Write 1200+ character posts with storytelling, data, and clear formatting' },
      { rule: 'Never Put Links in the Post Body', priority: 93, explanation: 'External links in the post reduce reach by up to 50%', example: 'Put your link in the first comment and say "Link in comments" in the post' },
      { rule: 'Use Document/Carousel Format', priority: 90, explanation: 'Document posts get 2.5x more reach than text-only — swipe engagement is heavily weighted', example: 'Create PDF carousels with 8-12 slides, one insight per slide' },
      { rule: 'Engage Your Network First Hour', priority: 85, explanation: 'First-hour engagement velocity determines whether LinkedIn shows your post to 2nd/3rd degree connections', example: 'DM 10 close connections when you post and ask them to engage meaningfully' },
      { rule: 'Be Personal and Authentic', priority: 80, explanation: 'LinkedIn\'s algorithm boosts personal stories and experiences over corporate content', example: 'Start with "I" and share a real experience — vulnerability outperforms polish' },
      { rule: 'Comment on 10 Posts Before You Publish', priority: 75, explanation: 'Pre-posting engagement warms up the algorithm and increases your content\'s initial push', example: 'Leave 3+ sentence comments on posts in your niche 30 minutes before publishing' },
    ],
  };

  const defaultContentRules: ContentRule[] = [
    { rule: 'Prioritize Watch Time / Dwell Time', priority: 95, explanation: 'Most algorithms now prioritize how long users spend with your content over passive engagement', example: 'Create content that demands attention — storytelling, data reveals, step-by-step guides' },
    { rule: 'Avoid External Links in Posts', priority: 88, explanation: 'Platforms penalize content that tries to send users elsewhere', example: 'Put links in comments, bios, or pinned posts instead of the main content' },
    { rule: 'Engage Within the First Hour', priority: 85, explanation: 'Initial engagement velocity is a universal ranking signal across platforms', example: 'Reply to every comment in the first 60 minutes after posting' },
    { rule: 'Post Consistently', priority: 82, explanation: 'Algorithms reward consistent creators with higher baseline distribution', example: 'Maintain a minimum of 3x/week posting schedule without breaks' },
    { rule: 'Use Native Content Formats', priority: 78, explanation: 'Platform-native content always outperforms cross-posted or embedded content', example: 'Record and edit directly on the platform instead of uploading from elsewhere' },
    { rule: 'Create Shareable Content', priority: 74, explanation: 'Shares are the highest-value engagement signal on most platforms', example: 'Make content that people want to send to a friend — relatable, useful, or surprising' },
  ];

  const optimizationTipsData: Record<string, OptimizationTip[]> = {
    'Instagram': [
      { tip: 'Convert your top-performing carousels into Reels with text animation', impact: 92, effort: 'Medium', category: 'Content Format' },
      { tip: 'Add closed captions to all Reels — 85% of users watch without sound', impact: 88, effort: 'Low', category: 'Accessibility' },
      { tip: 'Use the "Add Yours" sticker in Stories to boost interactive engagement', impact: 79, effort: 'Low', category: 'Engagement' },
      { tip: 'Post at 11 AM and 7 PM in your audience\'s timezone for peak reach', impact: 76, effort: 'Low', category: 'Timing' },
      { tip: 'Create a branded hashtag and encourage UGC — algorithm loves community signals', impact: 82, effort: 'High', category: 'Community' },
      { tip: 'Use Instagram Collab feature for cross-audience reach doubling', impact: 85, effort: 'Medium', category: 'Reach' },
      { tip: 'Pin your 3 best-performing Reels to your profile grid', impact: 70, effort: 'Low', category: 'Profile Optimization' },
    ],
    'TikTok': [
      { tip: 'Test posting the same concept at 3 different times to find your sweet spot', impact: 88, effort: 'Medium', category: 'Testing' },
      { tip: 'Use green screen effect with trending news for easy content creation', impact: 82, effort: 'Low', category: 'Content Format' },
      { tip: 'Reply to comments with video — these get pushed to FYP independently', impact: 91, effort: 'Low', category: 'Engagement' },
      { tip: 'Add 3-5 relevant hashtags + 1 niche-specific long-tail hashtag', impact: 74, effort: 'Low', category: 'Discovery' },
      { tip: 'Stitch trending videos in your niche within 24 hours of their peak', impact: 86, effort: 'Medium', category: 'Trends' },
      { tip: 'Create a series playlist — binge-watching signals boost your account', impact: 80, effort: 'Medium', category: 'Retention' },
      { tip: 'Post your best content on Tuesday and Thursday between 7-9 PM', impact: 77, effort: 'Low', category: 'Timing' },
    ],
    'Twitter/X': [
      { tip: 'Start threads with a provocative question or bold claim to maximize click-through', impact: 90, effort: 'Low', category: 'Content Format' },
      { tip: 'Quote tweet industry news with your unique analysis within 2 hours of breaking', impact: 85, effort: 'Medium', category: 'Timeliness' },
      { tip: 'Create "bookmark-worthy" resource lists and frameworks weekly', impact: 88, effort: 'Medium', category: 'Value Content' },
      { tip: 'Engage in 20 meaningful conversations daily to build reciprocity signals', impact: 82, effort: 'High', category: 'Networking' },
      { tip: 'Use polls strategically — they get 3x more impressions than standard posts', impact: 76, effort: 'Low', category: 'Engagement' },
      { tip: 'Pin a thread that showcases your best work or a lead magnet', impact: 72, effort: 'Low', category: 'Profile Optimization' },
      { tip: 'Post 3-5x daily for optimal algorithmic visibility on X', impact: 79, effort: 'High', category: 'Frequency' },
    ],
    'LinkedIn': [
      { tip: 'Open every post with a one-line hook that creates curiosity', impact: 94, effort: 'Low', category: 'Hook' },
      { tip: 'Share specific numbers and results — data-driven posts get 3x more saves', impact: 89, effort: 'Medium', category: 'Credibility' },
      { tip: 'Post between 7:30-8:30 AM on Tuesday-Thursday for maximum reach', impact: 80, effort: 'Low', category: 'Timing' },
      { tip: 'Create PDF carousels from your best-performing text posts', impact: 87, effort: 'Medium', category: 'Repurposing' },
      { tip: 'End every post with a question to drive comment engagement', impact: 83, effort: 'Low', category: 'Engagement' },
      { tip: 'Tag 3-5 relevant people (not more) to expand reach without looking spammy', impact: 74, effort: 'Low', category: 'Reach' },
      { tip: 'Write "I" posts, not "We" posts — personal voice outperforms brand voice 5x', impact: 91, effort: 'Low', category: 'Voice' },
    ],
  };

  const defaultOptimizationTips: OptimizationTip[] = [
    { tip: 'Analyze your top 10 posts and double down on the format that works', impact: 90, effort: 'Medium', category: 'Strategy' },
    { tip: 'Post during your audience\'s peak activity hours', impact: 82, effort: 'Low', category: 'Timing' },
    { tip: 'Add captions/subtitles to all video content', impact: 85, effort: 'Low', category: 'Accessibility' },
    { tip: 'Respond to every comment within the first hour', impact: 80, effort: 'Medium', category: 'Engagement' },
    { tip: 'Use platform-native editing tools instead of third-party apps', impact: 75, effort: 'Low', category: 'Content Quality' },
    { tip: 'Create content series to build anticipation and returning viewers', impact: 78, effort: 'High', category: 'Retention' },
    { tip: 'A/B test your hooks — change only the first line/second and compare results', impact: 88, effort: 'Medium', category: 'Testing' },
  ];

  const penaltyZonesData: Record<string, PenaltyZone[]> = {
    'Instagram': [
      { behavior: 'Using banned or flagged hashtags', severity: 90, consequence: 'Shadowban — content hidden from Explore and hashtag feeds for 24-48 hours', alternative: 'Research hashtags before using — check if they show recent posts when searched' },
      { behavior: 'Posting TikTok watermarked content', severity: 85, consequence: 'Reels deprioritized in recommendations — up to 70% reach reduction', alternative: 'Re-record content natively or use SnapTik to remove watermarks before posting' },
      { behavior: 'Engagement pod activity (mass likes/comments)', severity: 82, consequence: 'Algorithm detects artificial engagement patterns and reduces organic reach', alternative: 'Build genuine engagement through quality content and authentic conversations' },
      { behavior: 'Posting more than 5x per day', severity: 65, consequence: 'Content cannibalizes itself — each post gets less reach than optimal frequency', alternative: 'Post 1-2 feed posts + 3-5 stories daily for best results' },
      { behavior: 'Deleting and reposting content', severity: 72, consequence: 'Algorithm resets engagement signals and may flag the content as spam', alternative: 'Leave underperforming content up — it can gain traction over 48+ hours' },
    ],
    'TikTok': [
      { behavior: 'Deleting videos that underperform', severity: 88, consequence: 'Account-level penalty — the algorithm distrusts creators who frequently delete', alternative: 'Set videos to private instead of deleting — preserves account health' },
      { behavior: 'Using prohibited or sensitive keywords in text/speech', severity: 95, consequence: 'Video gets zero distribution or is removed — repeated offenses harm account', alternative: 'Use euphemisms or visual cues — the community understands coded language' },
      { behavior: 'Buying followers or engagement', severity: 92, consequence: 'Account flagged — all future content receives dramatically reduced distribution', alternative: 'Grow organically through consistent quality posting and trend participation' },
      { behavior: 'Posting identical content multiple times', severity: 78, consequence: 'Duplicate content detection reduces reach on all copies', alternative: 'Vary hooks, captions, and timing — remix rather than repost' },
      { behavior: 'Linking to external sites aggressively', severity: 70, consequence: 'TikTok suppresses content that pushes users off-platform too frequently', alternative: 'Use "link in bio" and update your profile link — mention it verbally in videos' },
    ],
    'Twitter/X': [
      { behavior: 'Engagement bait ("Like if you agree", "RT to win")', severity: 80, consequence: 'Post flagged as low-quality — reduced distribution to non-followers', alternative: 'Ask genuine questions or share insights that naturally invite engagement' },
      { behavior: 'Excessive hashtag usage (5+ per tweet)', severity: 65, consequence: 'Post appears spammy — lower impression-to-engagement ratio', alternative: 'Use 1-2 highly relevant hashtags maximum — or none for conversational posts' },
      { behavior: 'Automated mass-following/unfollowing', severity: 90, consequence: 'Account suspension risk — X actively detects bot-like behavior patterns', alternative: 'Follow people manually and engage with their content before following' },
      { behavior: 'Posting only links without commentary', severity: 72, consequence: 'Link-only posts get minimal distribution — algorithm wants native content', alternative: 'Add a 2-3 sentence commentary or key takeaway above any shared link' },
      { behavior: 'Replying to viral posts with self-promotion', severity: 75, consequence: 'Replies flagged as spam — can lead to reduced visibility across your account', alternative: 'Add genuine value in replies — build reputation before promoting' },
    ],
    'LinkedIn': [
      { behavior: 'Including external links in post body', severity: 85, consequence: 'Post reach reduced by up to 50% — LinkedIn wants to keep users on platform', alternative: 'Put links in the first comment and write "Link in comments" in your post' },
      { behavior: 'Tagging 10+ people who didn\'t contribute to the post', severity: 78, consequence: 'Tagged users ignore or report — signals to algorithm that tags are irrelevant', alternative: 'Tag only 3-5 people who are genuinely relevant and likely to engage' },
      { behavior: 'Posting more than 1x per day', severity: 60, consequence: 'Posts compete against each other — second post cannibalizes the first', alternative: 'Post once daily maximum — focus on quality over quantity' },
      { behavior: 'Using LinkedIn as a broadcasting tool only', severity: 72, consequence: 'Algorithm detects one-way communication and reduces feed presence', alternative: 'Comment on 10 posts for every 1 you publish — engagement ratio matters' },
      { behavior: 'Sharing company-page content without personal commentary', severity: 68, consequence: 'Reshared corporate content gets 5x less reach than original personal posts', alternative: 'Rewrite the insight in your own words with a personal angle' },
    ],
  };

  const defaultPenaltyZones: PenaltyZone[] = [
    { behavior: 'Buying followers or engagement', severity: 95, consequence: 'Account flagged — all content receives reduced distribution permanently', alternative: 'Grow organically through quality content and genuine engagement' },
    { behavior: 'Cross-posting identical content with watermarks', severity: 80, consequence: 'Platforms deprioritize content detected as reposts from competitors', alternative: 'Re-create content natively for each platform' },
    { behavior: 'Engagement bait tactics', severity: 75, consequence: 'Content flagged as low-quality — reduced algorithmic distribution', alternative: 'Create genuinely engaging content that naturally invites interaction' },
    { behavior: 'Posting and deleting frequently', severity: 70, consequence: 'Account trust score decreases — future content gets less initial distribution', alternative: 'Leave content up and learn from analytics instead of deleting' },
    { behavior: 'Excessive posting frequency', severity: 60, consequence: 'Content cannibalizes itself — individual post reach decreases', alternative: 'Find the optimal frequency for your platform (usually 1-2x daily max)' },
  ];

  const trendingFormatsData: Record<string, TrendingFormat[]> = {
    'Instagram': [
      { format: 'Educational Reels with Text Overlays', growthRate: 94, optimalLength: '30-60 seconds', bestPractice: 'Use bold text on screen, fast pacing, and a clear takeaway in the last 3 seconds' },
      { format: 'Interactive Carousel Stories', growthRate: 82, optimalLength: '8-10 slides', bestPractice: 'Start with a question, build tension slide-by-slide, end with a CTA' },
      { format: 'Behind-the-Scenes Raw Content', growthRate: 78, optimalLength: '15-45 seconds', bestPractice: 'Show the messy reality — imperfection outperforms polished content in 2026' },
      { format: 'Collab Reels with Creators', growthRate: 86, optimalLength: '30-90 seconds', bestPractice: 'Use the Collab feature for dual-audience distribution — both creators benefit' },
      { format: 'Carousel Data Visualizations', growthRate: 75, optimalLength: '6-8 slides', bestPractice: 'Present one stat per slide with clean design — save-worthy content drives reach' },
    ],
    'TikTok': [
      { format: 'Story-Time with Subtitles', growthRate: 96, optimalLength: '60-90 seconds', bestPractice: 'Tell a personal story with a twist — use captions and dramatic pauses' },
      { format: 'Tutorial/How-To Speed Edits', growthRate: 91, optimalLength: '21-34 seconds', bestPractice: 'Show the result first, then the process — reverse-hook pattern' },
      { format: 'POV / Day-in-the-Life', growthRate: 84, optimalLength: '30-60 seconds', bestPractice: 'Use trending audio and relatable scenarios — authenticity over production' },
      { format: 'Stitch Reactions to Viral Content', growthRate: 88, optimalLength: '15-30 seconds', bestPractice: 'React within 24 hours of the original going viral — speed is everything' },
      { format: 'Photo Carousel with Trending Audio', growthRate: 79, optimalLength: '5-10 images', bestPractice: 'Use the new photo mode with a trending sound — lower effort, strong reach' },
    ],
    'Twitter/X': [
      { format: 'Data-Backed Thread (7-12 tweets)', growthRate: 89, optimalLength: '7-12 tweets', bestPractice: 'Open with a bold claim, back it with data, end with an actionable takeaway' },
      { format: 'Screenshot + Commentary', growthRate: 82, optimalLength: '1 image + 200 chars', bestPractice: 'Screenshot an interesting insight and add your unique take above it' },
      { format: 'Long-Form Single Post', growthRate: 85, optimalLength: '500-1000 characters', bestPractice: 'Write a mini-essay with clear formatting — use line breaks generously' },
      { format: 'Visual Framework/Diagram', growthRate: 78, optimalLength: '1 image + caption', bestPractice: 'Create a simple 2x2 matrix or flowchart — these get saved and shared heavily' },
      { format: 'Quote Tweet Chain', growthRate: 72, optimalLength: '3-5 quote tweets', bestPractice: 'Build on trending conversations by adding original analysis in each quote' },
    ],
    'LinkedIn': [
      { format: 'PDF Carousel Document', growthRate: 93, optimalLength: '8-12 slides', bestPractice: 'One insight per slide, large text, brand colors — design for mobile viewing' },
      { format: 'Personal Story Post', growthRate: 90, optimalLength: '1200-1500 characters', bestPractice: 'Start with "I", share a real experience with vulnerability, end with a lesson' },
      { format: 'Native Video (Face to Camera)', growthRate: 80, optimalLength: '60-120 seconds', bestPractice: 'Speak directly to camera, add captions, share one actionable insight' },
      { format: 'Data-Driven Insight Post', growthRate: 85, optimalLength: '800-1200 characters', bestPractice: 'Lead with a surprising statistic, provide context, offer your interpretation' },
      { format: 'Poll + Commentary', growthRate: 76, optimalLength: 'Poll + 200 chars', bestPractice: 'Ask a genuinely interesting question and add context — polls get 2x impressions' },
    ],
  };

  const defaultTrendingFormats: TrendingFormat[] = [
    { format: 'Short-Form Video (Vertical)', growthRate: 92, optimalLength: '30-60 seconds', bestPractice: 'Hook in 2 seconds, deliver value fast, end with a clear CTA' },
    { format: 'Interactive Carousels', growthRate: 85, optimalLength: '6-10 slides', bestPractice: 'One key point per slide, use questions to drive swipe-through' },
    { format: 'Behind-the-Scenes Content', growthRate: 78, optimalLength: '30-90 seconds', bestPractice: 'Show authentic process — imperfection builds trust' },
    { format: 'User-Generated Content Features', growthRate: 80, optimalLength: 'Varies', bestPractice: 'Reshare and credit customer content — builds community signals' },
    { format: 'Data Visualization Posts', growthRate: 74, optimalLength: '1 image + caption', bestPractice: 'Present surprising data clearly — save-worthy content drives algorithm favor' },
  ];

  const snapshot = snapshotData[platform] || snapshotData['Instagram'];

  return {
    algorithmSnapshot: {
      platform,
      lastUpdate: snapshot.lastUpdate,
      majorChanges: snapshot.majorChanges,
      impactLevel: snapshot.impactLevel,
    },
    rankingFactors: rankingFactorsData[platform] || defaultRankingFactors,
    contentRules: contentRulesData[platform] || defaultContentRules,
    optimizationTips: optimizationTipsData[platform] || defaultOptimizationTips,
    penaltyZones: penaltyZonesData[platform] || defaultPenaltyZones,
    trendingFormats: trendingFormatsData[platform] || defaultTrendingFormats,
  };
}

export default function AlgorithmTrackerPage() {
  const [platform, setPlatform] = useState<string>(platforms[0]);
  const [contentType, setContentType] = useState<string>(contentTypes[0]);
  const [goal, setGoal] = useState<string>(goals[0]);
  const [timeframe, setTimeframe] = useState<string>(timeframes[0]);
  const [niche, setNiche] = useState('');
  const [result, setResult] = useState<AlgorithmResult | null>(null);

  const impactColor = (level: string) => {
    switch (level) {
      case 'Critical': return 'bg-red-100 text-red-700';
      case 'High': return 'bg-orange-100 text-orange-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const trendColor = (trend: string) => {
    switch (trend) {
      case 'Rising': return 'bg-green-100 text-green-700';
      case 'Stable': return 'bg-blue-100 text-blue-700';
      case 'Declining': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const effortColor = (effort: string) => {
    switch (effort) {
      case 'Low': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'High': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const severityColor = (severity: number) => {
    if (severity >= 85) return 'bg-red-500';
    if (severity >= 70) return 'bg-orange-500';
    if (severity >= 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const severityLabel = (severity: number) => {
    if (severity >= 85) return { text: 'Critical', className: 'bg-red-100 text-red-700' };
    if (severity >= 70) return { text: 'High', className: 'bg-orange-100 text-orange-700' };
    if (severity >= 50) return { text: 'Medium', className: 'bg-yellow-100 text-yellow-700' };
    return { text: 'Low', className: 'bg-green-100 text-green-700' };
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Algorithm Tracker</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Analyze platform algorithm changes, discover ranking factors, and generate optimized content strategies to maximize your reach and engagement.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Platform</label>
              <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                {platforms.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Content Type</label>
              <select value={contentType} onChange={e => setContentType(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                {contentTypes.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Goal</label>
              <select value={goal} onChange={e => setGoal(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                {goals.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Timeframe</label>
              <select value={timeframe} onChange={e => setTimeframe(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                {timeframes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Niche / Industry</label>
              <input
                type="text"
                value={niche}
                onChange={e => setNiche(e.target.value)}
                placeholder="e.g. fitness coaching, SaaS marketing, food photography"
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
          <button
            onClick={() => setResult(generateAlgorithmAnalysis(platform, contentType, goal, timeframe, niche))}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl"
          >
            Analyze Algorithm
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6">

            {/* 1. Algorithm Snapshot */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex flex-wrap items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Algorithm Snapshot</h2>
                <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${impactColor(result.algorithmSnapshot.impactLevel)}`}>
                  {result.algorithmSnapshot.impactLevel} Impact
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-2xl p-6 text-white text-center">
                  <p className="text-3xl font-bold">{result.algorithmSnapshot.platform}</p>
                  <p className="text-indigo-100 mt-1">Platform</p>
                </div>
                <div className="bg-indigo-50 rounded-2xl p-6 text-center">
                  <p className="text-xl font-bold text-indigo-700">{result.algorithmSnapshot.lastUpdate}</p>
                  <p className="text-sm text-gray-600 mt-1">Last Algorithm Update</p>
                </div>
                <div className="bg-cyan-50 rounded-2xl p-6 text-center">
                  <p className="text-xl font-bold text-cyan-700">{result.algorithmSnapshot.majorChanges.length}</p>
                  <p className="text-sm text-gray-600 mt-1">Major Changes Detected</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">Major Algorithm Changes</p>
                <div className="space-y-2">
                  {result.algorithmSnapshot.majorChanges.map((change, i) => (
                    <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                      <span className="bg-indigo-100 text-indigo-700 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                      <p className="text-gray-800">{change}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Ranking Factors */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Ranking Factors</h2>
              <div className="space-y-4">
                {result.rankingFactors.map((f, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-5">
                    <div className="flex flex-wrap items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold">#{i + 1}</span>
                        <span className="font-semibold text-gray-900">{f.factor}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${trendColor(f.trend)}`}>{f.trend}</span>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${f.weight >= 85 ? 'bg-indigo-600' : f.weight >= 70 ? 'bg-cyan-500' : 'bg-gray-400'}`}
                          style={{ width: `${f.weight}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-gray-600 whitespace-nowrap">{f.weight}%</span>
                    </div>
                    <p className="text-sm text-gray-600">{f.tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Content Rules */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Content Rules</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.contentRules.map((r, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{r.rule}</h3>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${r.priority >= 90 ? 'bg-red-100 text-red-700' : r.priority >= 80 ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        P{r.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{r.explanation}</p>
                    <div className="bg-indigo-50 rounded-lg p-3">
                      <p className="text-xs font-semibold text-indigo-600 mb-1">EXAMPLE</p>
                      <p className="text-sm text-indigo-800">{r.example}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Optimization Tips */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Optimization Tips</h2>
              <div className="space-y-3">
                {result.optimizationTips.map((t, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-5">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="bg-cyan-100 text-cyan-700 px-2.5 py-1 rounded-lg text-xs font-bold">{t.category}</span>
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${effortColor(t.effort)}`}>{t.effort} Effort</span>
                        </div>
                        <p className="font-medium text-gray-900">{t.tip}</p>
                      </div>
                      <div className="flex items-center gap-3 md:w-48">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className={`h-2.5 rounded-full ${t.impact >= 85 ? 'bg-green-500' : t.impact >= 70 ? 'bg-cyan-500' : 'bg-gray-400'}`}
                            style={{ width: `${t.impact}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-gray-600 whitespace-nowrap">{t.impact}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Penalty Zones */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Penalty Zones</h2>
              <div className="space-y-4">
                {result.penaltyZones.map((p, i) => {
                  const label = severityLabel(p.severity);
                  return (
                    <div key={i} className="border border-gray-100 rounded-xl p-5">
                      <div className="flex flex-wrap items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900">{p.behavior}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${label.className}`}>{label.text} Severity</span>
                      </div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className={`h-2 rounded-full ${severityColor(p.severity)}`} style={{ width: `${p.severity}%` }} />
                        </div>
                        <span className="text-sm font-bold text-gray-500 whitespace-nowrap">{p.severity}/100</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="bg-red-50 rounded-lg p-3">
                          <p className="text-xs font-semibold text-red-600 mb-1">CONSEQUENCE</p>
                          <p className="text-sm text-red-800">{p.consequence}</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-3">
                          <p className="text-xs font-semibold text-green-600 mb-1">DO THIS INSTEAD</p>
                          <p className="text-sm text-green-800">{p.alternative}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 6. Trending Formats */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Trending Formats</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {result.trendingFormats.map((f, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-5 flex flex-col">
                    <h3 className="font-semibold text-gray-900 mb-3">{f.format}</h3>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-semibold text-gray-500">Growth</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${f.growthRate >= 85 ? 'bg-green-500' : f.growthRate >= 70 ? 'bg-cyan-500' : 'bg-yellow-500'}`}
                          style={{ width: `${f.growthRate}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-gray-600">{f.growthRate}%</span>
                    </div>
                    <div className="mb-3">
                      <span className="bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-lg text-xs font-bold">{f.optimalLength}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-auto">{f.bestPractice}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
    </main>
  );
}
