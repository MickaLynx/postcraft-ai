'use client';
import { useState } from 'react';
import Link from 'next/link';

// SEO metadata (for layout.tsx if converted to server component):
// title: "Trend Mapper — AI Social Media Trend Prediction | PostCraft AI"
// description: "Map and predict social media trends with AI. Identify rising content formats, topics, and creator behaviors before they peak. Stay ahead of the curve."

// metadata removed — client components cannot export metadata

/* ------------------------------------------------------------------ */
/* CONSTANTS                                                           */
/* ------------------------------------------------------------------ */

const industries = [
  'SaaS', 'E-commerce', 'Health & Fitness', 'Finance', 'Education',
  'Food & Beverage', 'Fashion', 'Travel', 'Real Estate', 'Gaming',
  'Beauty', 'Tech', 'Entertainment', 'Non-profit',
] as const;

const platforms = [
  'Instagram', 'TikTok', 'Twitter/X', 'LinkedIn', 'YouTube',
  'Facebook', 'Threads', 'Pinterest',
] as const;

const timeframes = [
  'This Week', 'This Month', 'This Quarter', 'Next 6 Months', 'Next 12 Months',
] as const;

const trendTypes = [
  'Content Formats', 'Audio/Music', 'Visual Styles', 'Topics & Themes',
  'Hashtag Movements', 'Creator Behaviors',
] as const;

const audienceSegments = [
  'Gen Z', 'Millennials', 'Gen X', 'B2B Professionals', 'Mass Market',
] as const;

/* ------------------------------------------------------------------ */
/* HASH / DETERMINISTIC HELPERS                                        */
/* ------------------------------------------------------------------ */

function hash(str: string): number {
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h + str.charCodeAt(i)) & 0x7fffffff;
  }
  return h;
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

function pickFrom<T>(arr: readonly T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)];
}

/* ------------------------------------------------------------------ */
/* TYPES                                                               */
/* ------------------------------------------------------------------ */

interface TrendItem {
  trend: string;
  status: 'Rising' | 'Peaking' | 'Declining' | 'Emerging';
  confidence: number;
  velocity: string;
  platforms: string[];
  peakEstimate: string;
  actionableInsight: string;
}

interface ContentOpportunity {
  opportunity: string;
  effort: string;
  impact: string;
  timeline: string;
  examplePost: string;
}

interface RiskItem {
  trend: string;
  risk: string;
  mitigation: string;
}

interface PredictionItem {
  prediction: string;
  probability: string;
  signalsToWatch: string[];
  prepActions: string[];
}

interface TrendMapResult {
  trendMap: TrendItem[];
  contentOpportunities: ContentOpportunity[];
  riskAssessment: RiskItem[];
  predictedNextWave: PredictionItem[];
  competitorGaps: string[];
}

/* ------------------------------------------------------------------ */
/* DATA POOLS                                                          */
/* ------------------------------------------------------------------ */

const trendPools: Record<string, string[]> = {
  'Content Formats': [
    'AI-Generated B-Roll Overlays', 'Interactive Carousel Quizzes', 'Micro-Documentary Series (60s)',
    'Split-Screen Reaction Duets', 'POV Storytelling Reels', 'Behind-the-Algorithm Breakdowns',
    'Swipe-to-Reveal Infographics', 'Vertical Long-Form (3-5 min)', 'Day-in-the-Life Compilations',
    'Async Video Conversations', 'Data Viz Animations', 'Photo Dump Narratives',
    'Green Screen Commentary', 'Faceless Content Templates', 'Podcast Clip Carousels',
  ],
  'Audio/Music': [
    'Nostalgic Y2K Remixes', 'AI-Composed Brand Jingles', 'Lo-Fi Ambient Workflows',
    'Trending Sound Layering', 'ASMR Product Reveals', 'Voiceover Whisper Trend',
    'Podcast-Style Narration', 'Custom Audio Memes', 'Binaural Beat Backgrounds',
    'Acapella Hook Challenges', 'Retro Synthwave Edits', 'Sound Effect Storytelling',
    'Regional Music Fusion', 'Audio-First Content Drops', 'Silent Video with Captions',
  ],
  'Visual Styles': [
    'Cluttercore Aesthetic', 'Hyper-Minimal Flat Design', 'Retro VHS Grain Filters',
    'Neon Gradient Overlays', 'Hand-Drawn Doodle Annotations', 'Cinematic Letterbox Format',
    'Muted Earth Tone Palettes', 'Glitch Art Transitions', 'Isometric 3D Illustrations',
    'Polaroid Frame Borders', 'Watercolor Wash Backgrounds', 'Bold Typography-First Posts',
    'Dark Mode Optimized Designs', 'Collage-Style Compositions', 'Frosted Glass Morphism UI',
  ],
  'Topics & Themes': [
    'AI Ethics in Everyday Life', 'Digital Minimalism Movement', 'Climate Action Storytelling',
    'Financial Literacy for Gen Z', 'Remote Work Culture Shifts', 'Mental Health Normalization',
    'Creator Economy Deep Dives', 'Sustainable Living Hacks', 'Community-Led Growth Stories',
    'Privacy-First Digital Life', 'Side Hustle Transparency', 'Neurodivergent Productivity',
    'Slow Living Renaissance', 'Tech Detox Challenges', 'Skill-Stacking Journeys',
  ],
  'Hashtag Movements': [
    '#BuildInPublic2026', '#AuthenticOverAesthetic', '#NoFilterNarratives', '#MicroImpact',
    '#CreatorBurnoutRecovery', '#SlowGrowthWins', '#DataDrivenCreator', '#ContentWithPurpose',
    '#CommunityOverFollowers', '#TransparentBusiness', '#LearnInPublic', '#DigitalWellness',
    '#RealTalkSeries', '#FailForwardFridays', '#ImpactOverImpressions',
  ],
  'Creator Behaviors': [
    'Multi-Platform Simulcasting', 'Audience Co-Creation Workflows', 'AI-Assisted Content Batching',
    'Community-Sourced Content Calendars', 'Transparency Revenue Reports', 'Collab Chains (3+ creators)',
    'Niche-Down Micro-Pivots', 'Behind-the-Metrics Sharing', 'Content Sabbatical & Comeback Arcs',
    'Platform-Native Storytelling', 'Real-Time Trend Surfing', 'Value-First Monetization',
    'Audience Segmented Posting', 'Cross-Niche Pollination', 'Evergreen Content Libraries',
  ],
};

const industryModifiers: Record<string, string[]> = {
  'SaaS': ['product demos', 'onboarding flows', 'feature launches', 'customer success stories', 'developer advocacy'],
  'E-commerce': ['product reveals', 'haul content', 'unboxing reactions', 'flash sale countdowns', 'user reviews'],
  'Health & Fitness': ['workout routines', 'meal prep', 'wellness journeys', 'recovery protocols', 'wearable data'],
  'Finance': ['market analysis', 'budgeting tips', 'investment breakdowns', 'fintech reviews', 'wealth building'],
  'Education': ['study methods', 'course reviews', 'skill tutorials', 'campus content', 'career advice'],
  'Food & Beverage': ['recipe content', 'restaurant reviews', 'cooking hacks', 'food science', 'sourcing stories'],
  'Fashion': ['outfit styling', 'trend forecasts', 'sustainable fashion', 'brand collaborations', 'thrift finds'],
  'Travel': ['destination guides', 'travel hacks', 'cultural immersion', 'budget tips', 'adventure content'],
  'Real Estate': ['property tours', 'market updates', 'renovation reveals', 'investment tips', 'neighborhood guides'],
  'Gaming': ['gameplay clips', 'game reviews', 'setup tours', 'esports highlights', 'dev diaries'],
  'Beauty': ['tutorial content', 'product reviews', 'skincare routines', 'transformation reveals', 'ingredient breakdowns'],
  'Tech': ['gadget reviews', 'coding tutorials', 'AI demos', 'startup stories', 'tech ethics debates'],
  'Entertainment': ['reaction content', 'fan theories', 'behind-the-scenes', 'live event coverage', 'streaming reviews'],
  'Non-profit': ['impact stories', 'volunteer spotlights', 'fundraising campaigns', 'awareness content', 'community highlights'],
};

/* ------------------------------------------------------------------ */
/* GENERATOR                                                           */
/* ------------------------------------------------------------------ */

function generate(
  industry: string,
  platform: string,
  timeframe: string,
  trendType: string,
  audience: string,
): TrendMapResult {
  const seed = hash(industry + platform + timeframe + trendType + audience);
  const rng = seededRandom(seed);

  const statuses: TrendItem['status'][] = ['Rising', 'Peaking', 'Declining', 'Emerging'];
  const velocities = ['+340%/week', '+210%/week', '+95%/week', '+55%/week', '+180%/week', '-15%/week', '+420%/week', '+28%/week', '+145%/week', '+72%/week'];
  const peakEstimates = ['2-3 weeks', '1-2 weeks', 'Already peaking', '4-6 weeks', '2-3 months', '6+ months', '3-4 weeks', '8-12 weeks'];
  const efforts = ['Low', 'Medium', 'High', 'Very Low', 'Medium-High'];
  const impacts = ['High', 'Very High', 'Medium', 'Extreme', 'High-Medium'];
  const timelines = ['1-2 days', '3-5 days', '1-2 weeks', 'Same day', '2-3 weeks'];

  const pool = trendPools[trendType] || trendPools['Content Formats'];
  const mods = industryModifiers[industry] || industryModifiers['Tech'];
  const allPlatforms = [...platforms];

  // --- trendMap (10 items) ---
  const usedTrends = new Set<number>();
  const trendMap: TrendItem[] = [];
  for (let i = 0; i < 10; i++) {
    let idx: number;
    do { idx = Math.floor(rng() * pool.length); } while (usedTrends.has(idx) && usedTrends.size < pool.length);
    usedTrends.add(idx);

    const status = statuses[Math.floor(rng() * statuses.length)];
    const confidence = Math.round(60 + rng() * 38);
    const numPlat = 1 + Math.floor(rng() * 3);
    const platSet = new Set<string>();
    platSet.add(platform);
    while (platSet.size < numPlat) platSet.add(pickFrom(allPlatforms, rng));

    const insights = [
      `Jump on this trend now with ${mods[Math.floor(rng() * mods.length)]} content tailored for ${audience}. First-mover advantage is significant.`,
      `Create a series around this trend using ${platform}-native features. ${audience} audiences respond best to authentic, unpolished takes.`,
      `Combine this trend with ${mods[Math.floor(rng() * mods.length)]} for a unique angle. Test 3-5 variations to find what resonates with ${audience}.`,
      `This trend is perfect for ${industry.toLowerCase()} brands. Lead with value, not promotion. ${audience} audiences will share content that educates.`,
      `Repurpose existing ${mods[Math.floor(rng() * mods.length)]} content to ride this wave. Add trending audio/visuals for ${platform} algorithm boost.`,
      `Build a content template around this trend for consistent output. ${audience} engagement peaks on ${platform} between 6-9 PM local time.`,
      `Partner with 2-3 micro-creators already using this trend. Cross-pollinate audiences in the ${industry.toLowerCase()} space.`,
      `Use this trend as a hook for your core ${industry.toLowerCase()} messaging. The ${audience} segment is 3.2x more likely to engage with trend-aligned content.`,
      `Create a branded challenge around this trend. ${platform} algorithm favors content that drives participation from ${audience} users.`,
      `Document your ${industry.toLowerCase()} process using this format. Authenticity drives 4.7x more saves among ${audience} viewers.`,
    ];

    trendMap.push({
      trend: pool[idx],
      status,
      confidence,
      velocity: velocities[Math.floor(rng() * velocities.length)],
      platforms: Array.from(platSet),
      peakEstimate: peakEstimates[Math.floor(rng() * peakEstimates.length)],
      actionableInsight: insights[i],
    });
  }

  // --- contentOpportunities (6 items) ---
  const contentOpportunities: ContentOpportunity[] = [];
  const oppTemplates = [
    { opp: `Create a "${trendType}" series showcasing ${mods[0]} with trending ${trendType.toLowerCase()} elements`, ex: `"Day 1 of our ${mods[0]} journey using ${trendMap[0]?.trend || 'this trend'}. Here's what happened..." [${platform} ${trendType.toLowerCase()} post with trending hook]` },
    { opp: `Launch a weekly "${audience} Insights" segment using ${trendMap[1]?.trend || 'emerging trends'}`, ex: `"What ${audience} actually thinks about ${mods[1]}... the data might surprise you 📊" [Data-driven carousel with poll sticker]` },
    { opp: `Repurpose top-performing ${mods[2]} content into ${trendType.toLowerCase()} format for ${platform}`, ex: `"We turned our most popular ${mods[2]} post into a ${trendType.toLowerCase()} format. 10x the engagement. Here's the framework 🧵"` },
    { opp: `Build a collab series with ${industry.toLowerCase()} micro-creators using ${trendMap[2]?.trend || 'trending formats'}`, ex: `"Partnered with @creator to break down ${mods[3]} using ${trendMap[2]?.trend || 'this format'}. The results? Game-changing."` },
    { opp: `Create a "Trend Report" template post analyzing ${trendType.toLowerCase()} shifts for ${audience}`, ex: `"${timeframe} ${industry} Trend Report: ${trendMap[3]?.trend || 'Top trend'} is ${trendMap[3]?.status || 'Rising'}. Here's what it means for your content strategy..."` },
    { opp: `Develop a behind-the-scenes content series showing how your ${industry.toLowerCase()} brand adapts to ${trendType.toLowerCase()}`, ex: `"How we completely changed our ${platform} strategy in 72 hours because of ${trendMap[4]?.trend || 'this trend'}. Thread 🧵"` },
  ];

  for (let i = 0; i < 6; i++) {
    const t = oppTemplates[i];
    contentOpportunities.push({
      opportunity: t.opp,
      effort: efforts[Math.floor(rng() * efforts.length)],
      impact: impacts[Math.floor(rng() * impacts.length)],
      timeline: timelines[Math.floor(rng() * timelines.length)],
      examplePost: t.ex,
    });
  }

  // --- riskAssessment (5 items) ---
  const riskAssessment: RiskItem[] = [
    {
      trend: trendMap[0]?.trend || 'Leading trend',
      risk: `Rapid saturation expected within ${timeframe === 'This Week' ? '3-5 days' : '2-3 weeks'}. Early adopters gain disproportionate reach, but late entries face algorithm suppression.`,
      mitigation: `Publish within 48 hours. Add a unique ${industry.toLowerCase()} angle that competitors cannot easily replicate. Focus on depth over speed.`,
    },
    {
      trend: trendMap[1]?.trend || 'Secondary trend',
      risk: `${platform} algorithm may deprioritize this format if engagement rates drop below platform average. ${audience} fatigue signals are emerging.`,
      mitigation: `A/B test 3 variations before committing. Monitor engagement rate per follower (not just total) as the leading indicator. Pivot to ${trendMap[5]?.trend || 'alternative format'} if CTR drops 20%+.`,
    },
    {
      trend: trendMap[2]?.trend || 'Third trend',
      risk: `Brand safety concerns in the ${industry.toLowerCase()} space. This trend may attract controversy or misinterpretation from ${audience} audiences if not executed carefully.`,
      mitigation: `Draft content with compliance/legal review. Prepare a response template for potential pushback. Focus on educational framing rather than trend-chasing optics.`,
    },
    {
      trend: trendMap[3]?.trend || 'Fourth trend',
      risk: `Cross-platform inconsistency — this trend performs differently on ${platform} vs. other platforms. ${audience} expectations vary significantly by platform context.`,
      mitigation: `Adapt content natively for each platform rather than cross-posting. Use ${platform}-specific features (stickers, polls, collab posts) to boost algorithmic favorability.`,
    },
    {
      trend: 'Overall trend adoption',
      risk: `Over-reliance on trend-based content can dilute brand voice and confuse ${audience} followers. Trend-to-evergreen ratio matters for long-term growth.`,
      mitigation: `Maintain a 30/70 trend-to-evergreen content split. Use trends as hooks that funnel into your core ${industry.toLowerCase()} messaging and ${mods[0]} content pillars.`,
    },
  ];

  // --- predictedNextWave (5 items) ---
  const predictedNextWave: PredictionItem[] = [
    {
      prediction: `AI-personalized ${trendType.toLowerCase()} will become the default on ${platform} within ${timeframe === 'Next 12 Months' ? '8 months' : '3-6 months'}`,
      probability: `${Math.round(65 + rng() * 25)}%`,
      signalsToWatch: [
        `${platform} announces creator AI tools`,
        `Top ${industry.toLowerCase()} creators adopt AI workflows publicly`,
        `Engagement rates on AI-enhanced content outperform organic by 2x+`,
      ],
      prepActions: [
        `Start experimenting with AI-assisted ${mods[0]} content creation now`,
        `Build a library of brand-approved AI templates and prompts`,
        `Train your team on AI content tools specific to ${platform}`,
      ],
    },
    {
      prediction: `${audience}-led micro-communities will overtake mass-reach strategies for ${industry.toLowerCase()} brands on ${platform}`,
      probability: `${Math.round(55 + rng() * 30)}%`,
      signalsToWatch: [
        `${platform} launches or promotes community/group features`,
        `Organic reach for broadcast content drops below 3%`,
        `${audience} engagement shifts to DMs and close-friends content`,
      ],
      prepActions: [
        `Build a private community or inner circle for your top ${audience} followers`,
        `Shift content strategy toward conversation-starting formats`,
        `Develop exclusive content tiers for community members`,
      ],
    },
    {
      prediction: `Short-form vertical video will fragment into niche sub-formats optimized for ${trendType.toLowerCase()} discovery`,
      probability: `${Math.round(50 + rng() * 35)}%`,
      signalsToWatch: [
        `New ${platform} features for content categorization or sub-feeds`,
        `${audience} watch time shifts toward niche creators over mainstream`,
        `Algorithm updates favoring topical relevance over virality`,
      ],
      prepActions: [
        `Double down on your ${industry.toLowerCase()} niche rather than going broad`,
        `Create content clusters around specific ${mods[1]} sub-topics`,
        `Optimize metadata, captions, and hashtags for niche discoverability`,
      ],
    },
    {
      prediction: `Creator-brand co-ownership models will disrupt traditional influencer partnerships in ${industry.toLowerCase()}`,
      probability: `${Math.round(40 + rng() * 30)}%`,
      signalsToWatch: [
        `Major ${industry.toLowerCase()} brands announce creator equity programs`,
        `Top creators launch their own competing ${industry.toLowerCase()} products`,
        `Affiliate commission structures shift toward revenue-sharing`,
      ],
      prepActions: [
        `Identify 5-10 aligned creators for deeper partnership exploration`,
        `Develop a creator partnership framework beyond one-off sponsorships`,
        `Budget for long-term creator relationships in next quarter planning`,
      ],
    },
    {
      prediction: `${platform} will introduce native ${trendType.toLowerCase()} analytics tools that commoditize current third-party solutions`,
      probability: `${Math.round(45 + rng() * 25)}%`,
      signalsToWatch: [
        `${platform} acquires or partners with analytics startups`,
        `Beta features for enhanced creator analytics appear`,
        `Competitors (${platforms.filter(p => p !== platform).slice(0, 2).join(', ')}) launch similar native tools`,
      ],
      prepActions: [
        `Focus on proprietary data and insights that platform tools cannot replicate`,
        `Build custom dashboards tracking ${industry.toLowerCase()}-specific KPIs`,
        `Develop internal benchmarks for ${audience} engagement in your niche`,
      ],
    },
  ];

  // --- competitorGaps (7 items) ---
  const competitorGaps: string[] = [
    `Most ${industry.toLowerCase()} competitors are ignoring ${trendMap[0]?.trend || 'emerging trends'} on ${platform} — only 12% of top accounts have adopted it`,
    `No major ${industry.toLowerCase()} brand is combining ${mods[0]} with ${trendType.toLowerCase()} formats — this whitespace represents a 4.2x engagement opportunity`,
    `${audience} audiences on ${platform} are underserved with educational ${industry.toLowerCase()} content — demand signals are 3x higher than supply`,
    `Competitors are posting at peak hours but ignoring ${platform}'s emerging "off-peak discovery" algorithm that rewards ${timeframe.toLowerCase() === 'this week' ? 'early morning' : 'late evening'} content`,
    `Less than 8% of ${industry.toLowerCase()} brands on ${platform} are using ${trendMap[2]?.trend || 'this emerging format'} — first-mover advantage window is 4-6 weeks`,
    `${audience} users are actively seeking ${mods[3]} content on ${platform} but most brands default to promotional posts — the authenticity gap is massive`,
    `Cross-platform repurposing from ${platform} to ${platforms.filter(p => p !== platform)[0]} is virtually untapped in the ${industry.toLowerCase()} space — competitors are leaving reach on the table`,
  ];

  return { trendMap, contentOpportunities, riskAssessment, predictedNextWave, competitorGaps };
}

/* ------------------------------------------------------------------ */
/* STATUS BADGE                                                        */
/* ------------------------------------------------------------------ */

function statusColor(status: string): string {
  switch (status) {
    case 'Rising': return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'Peaking': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    case 'Declining': return 'bg-red-500/20 text-red-400 border-red-500/30';
    case 'Emerging': return 'bg-violet-500/20 text-violet-400 border-violet-500/30';
    default: return 'bg-zinc-700/40 text-zinc-400 border-zinc-600/30';
  }
}

/* ------------------------------------------------------------------ */
/* PAGE COMPONENT                                                      */
/* ------------------------------------------------------------------ */

export default function TrendMapperPage() {
  const [industry, setIndustry] = useState<string>(industries[0]);
  const [platform, setPlatform] = useState<string>(platforms[0]);
  const [timeframe, setTimeframe] = useState<string>(timeframes[0]);
  const [trendType, setTrendType] = useState<string>(trendTypes[0]);
  const [audience, setAudience] = useState<string>(audienceSegments[0]);
  const [result, setResult] = useState<TrendMapResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setResult(generate(industry, platform, timeframe, trendType, audience));
      setLoading(false);
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      {/* ---- HEADER ---- */}
      <section className="relative overflow-hidden border-b border-zinc-800">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-zinc-950 to-purple-900/10" />
        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 text-center">
          <Link href="/" className="inline-block mb-6 text-sm text-zinc-400 hover:text-zinc-200 transition-colors">
            &larr; Back to PostCraft AI
          </Link>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
            Trend Mapper
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto">
            Map and predict social media trends with AI. Identify rising content formats, topics, and creator behaviors before they peak.
          </p>
        </div>
      </section>

      {/* ---- FORM ---- */}
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur">
          <h2 className="text-xl font-bold text-zinc-100 mb-6">Configure Your Trend Map</h2>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Industry */}
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1.5">Industry</label>
              <select
                value={industry}
                onChange={e => setIndustry(e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-zinc-100 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-colors"
              >
                {industries.map(i => <option key={i}>{i}</option>)}
              </select>
            </div>

            {/* Platform */}
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1.5">Platform</label>
              <select
                value={platform}
                onChange={e => setPlatform(e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-zinc-100 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-colors"
              >
                {platforms.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>

            {/* Timeframe */}
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1.5">Timeframe</label>
              <select
                value={timeframe}
                onChange={e => setTimeframe(e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-zinc-100 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-colors"
              >
                {timeframes.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>

            {/* Trend Type */}
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1.5">Trend Type</label>
              <select
                value={trendType}
                onChange={e => setTrendType(e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-zinc-100 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-colors"
              >
                {trendTypes.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>

            {/* Audience Segment */}
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1.5">Audience Segment</label>
              <select
                value={audience}
                onChange={e => setAudience(e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-zinc-100 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-colors"
              >
                {audienceSegments.map(a => <option key={a}>{a}</option>)}
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="mt-8 w-full sm:w-auto rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 hover:from-violet-500 hover:to-purple-500 disabled:opacity-50 transition-all"
          >
            {loading ? 'Mapping Trends...' : 'Generate Trend Map'}
          </button>
        </div>
      </section>

      {/* ---- RESULTS ---- */}
      {result && (
        <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 space-y-10">

          {/* ---- TREND MAP ---- */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-zinc-100 mb-2">Trend Map</h2>
            <p className="text-sm text-zinc-500 mb-6">{result.trendMap.length} trends identified for {industry} on {platform} &middot; {timeframe} &middot; {audience}</p>

            <div className="space-y-4">
              {result.trendMap.map((t, i) => (
                <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-5 hover:border-zinc-700 transition-colors">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <h3 className="text-lg font-semibold text-zinc-100">{t.trend}</h3>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusColor(t.status)}`}>
                        {t.status}
                      </span>
                      <span className="text-xs text-zinc-500 bg-zinc-800 rounded-full px-2.5 py-0.5 border border-zinc-700">
                        {t.confidence}% confidence
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm mb-3">
                    <div>
                      <span className="text-zinc-500 text-xs">Velocity</span>
                      <p className="text-violet-400 font-medium">{t.velocity}</p>
                    </div>
                    <div>
                      <span className="text-zinc-500 text-xs">Peak Estimate</span>
                      <p className="text-zinc-300">{t.peakEstimate}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-zinc-500 text-xs">Active Platforms</span>
                      <div className="flex gap-1.5 mt-0.5 flex-wrap">
                        {t.platforms.map(p => (
                          <span key={p} className="text-xs bg-zinc-800 text-zinc-300 rounded px-2 py-0.5 border border-zinc-700">{p}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-zinc-800/50 rounded-lg p-3 border border-zinc-700/50">
                    <p className="text-sm text-zinc-300">
                      <span className="text-violet-400 font-medium">Insight:</span> {t.actionableInsight}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ---- CONTENT OPPORTUNITIES ---- */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-zinc-100 mb-2">Content Opportunities</h2>
            <p className="text-sm text-zinc-500 mb-6">Actionable content ideas ranked by impact and effort</p>

            <div className="space-y-4">
              {result.contentOpportunities.map((c, i) => (
                <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-5 hover:border-zinc-700 transition-colors">
                  <h3 className="text-base font-semibold text-zinc-100 mb-3">{c.opportunity}</h3>

                  <div className="grid grid-cols-3 gap-3 text-sm mb-4">
                    <div>
                      <span className="text-zinc-500 text-xs">Effort</span>
                      <p className={`font-medium ${c.effort === 'Low' || c.effort === 'Very Low' ? 'text-green-400' : c.effort === 'High' || c.effort === 'Medium-High' ? 'text-amber-400' : 'text-zinc-300'}`}>{c.effort}</p>
                    </div>
                    <div>
                      <span className="text-zinc-500 text-xs">Impact</span>
                      <p className={`font-medium ${c.impact === 'Very High' || c.impact === 'Extreme' ? 'text-violet-400' : c.impact === 'High' ? 'text-purple-400' : 'text-zinc-300'}`}>{c.impact}</p>
                    </div>
                    <div>
                      <span className="text-zinc-500 text-xs">Timeline</span>
                      <p className="text-zinc-300">{c.timeline}</p>
                    </div>
                  </div>

                  <div className="bg-zinc-800/50 rounded-lg p-3 border border-zinc-700/50">
                    <p className="text-xs text-zinc-500 mb-1">Example Post</p>
                    <p className="text-sm text-zinc-300 italic">{c.examplePost}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ---- RISK ASSESSMENT ---- */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-zinc-100 mb-2">Risk Assessment</h2>
            <p className="text-sm text-zinc-500 mb-6">Potential pitfalls and mitigation strategies for trend adoption</p>

            <div className="space-y-4">
              {result.riskAssessment.map((r, i) => (
                <div key={i} className="rounded-xl border border-red-500/10 bg-zinc-900/80 p-5 hover:border-red-500/20 transition-colors">
                  <h3 className="text-base font-semibold text-zinc-100 mb-2">{r.trend}</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-xs font-medium text-red-400 uppercase tracking-wide">Risk</span>
                      <p className="text-sm text-zinc-400 mt-0.5">{r.risk}</p>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-green-400 uppercase tracking-wide">Mitigation</span>
                      <p className="text-sm text-zinc-300 mt-0.5">{r.mitigation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ---- PREDICTED NEXT WAVE ---- */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-zinc-100 mb-2">Predicted Next Wave</h2>
            <p className="text-sm text-zinc-500 mb-6">AI-powered predictions for upcoming trend shifts</p>

            <div className="space-y-4">
              {result.predictedNextWave.map((p, i) => (
                <div key={i} className="rounded-xl border border-violet-500/10 bg-zinc-900/80 p-5 hover:border-violet-500/20 transition-colors">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <h3 className="text-base font-semibold text-zinc-100">{p.prediction}</h3>
                    <span className="text-xs font-medium bg-violet-500/20 text-violet-400 border border-violet-500/30 rounded-full px-2.5 py-0.5 flex-shrink-0">
                      {p.probability} probability
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-medium text-amber-400 uppercase tracking-wide mb-2">Signals to Watch</p>
                      <ul className="space-y-1.5">
                        {p.signalsToWatch.map((s, j) => (
                          <li key={j} className="text-sm text-zinc-400 flex gap-2">
                            <span className="text-amber-500 mt-1 flex-shrink-0">&#9656;</span>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-green-400 uppercase tracking-wide mb-2">Preparation Actions</p>
                      <ul className="space-y-1.5">
                        {p.prepActions.map((a, j) => (
                          <li key={j} className="text-sm text-zinc-300 flex gap-2">
                            <span className="text-green-500 mt-1 flex-shrink-0">&#10003;</span>
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ---- COMPETITOR GAPS ---- */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-zinc-100 mb-2">Competitor Gaps</h2>
            <p className="text-sm text-zinc-500 mb-6">Untapped opportunities your competitors are missing</p>

            <div className="space-y-3">
              {result.competitorGaps.map((gap, i) => (
                <div key={i} className="flex gap-3 items-start rounded-xl border border-zinc-800 bg-zinc-900/80 p-4 hover:border-purple-500/20 transition-colors">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold border border-purple-500/30">
                    {i + 1}
                  </span>
                  <p className="text-sm text-zinc-300 leading-relaxed">{gap}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ---- CTA ---- */}
          <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-900/20 to-purple-900/10 p-8 text-center">
            <h3 className="text-xl font-bold text-zinc-100 mb-2">Ready to act on these trends?</h3>
            <p className="text-sm text-zinc-400 mb-6 max-w-xl mx-auto">
              Use PostCraft AI&apos;s full suite of tools to create trend-aligned content, optimize posting times, and track your performance.
            </p>
            <Link
              href="/"
              className="inline-flex rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 hover:from-violet-500 hover:to-purple-500 transition-all"
            >
              Explore All PostCraft Tools
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
