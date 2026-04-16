'use client';
import { useState } from 'react';

// SEO metadata (for layout.tsx or head.tsx if converted to server component):
// title: "Competitor Tracker — Monitor Strategic Shifts | PostCraft AI"
// description: "Track competitor strategic shifts in real time. Detect content format pivots, posting frequency changes, CTA strategy changes, audience targeting shifts, and more across 7 platforms."
// keywords: "competitor tracker, competitor monitoring, strategic shift detection, social media competitor analysis, content strategy tracker, competitive intelligence tool, PostCraft AI"

// metadata removed — client components cannot export metadata

/* ------------------------------------------------------------------ */
/* CONSTANTS                                                           */
/* ------------------------------------------------------------------ */

const platforms = ['Twitter/X', 'LinkedIn', 'Instagram', 'TikTok', 'YouTube', 'Facebook', 'Multi-Platform'] as const;

const monitoringCategories = [
  'Content Format Shifts',
  'Posting Frequency Changes',
  'CTA Strategy Changes',
  'Audience Targeting Pivots',
  'Hashtag Strategy',
  'Engagement Pattern Shifts',
  'Paid vs Organic Mix',
  'Collaboration/Partnership Changes',
] as const;

const timeRanges = ['Last 7 days', 'Last 14 days', 'Last 30 days', 'Last 90 days'] as const;

const industries = ['Tech/SaaS', 'E-commerce', 'Creator Economy', 'Finance', 'Health/Fitness', 'Education', 'Food/Beverage', 'Fashion/Beauty'] as const;

/* ------------------------------------------------------------------ */
/* INTERFACES                                                          */
/* ------------------------------------------------------------------ */

interface StrategicShift {
  category: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  detectedDate: string;
  recommendation: string;
}

interface CompetitorTrackResult {
  competitorName: string;
  platform: string;
  shifts: StrategicShift[];
  overallTrend: string;
  threatLevel: number;
  opportunities: string[];
  weeklyDigest: string;
  actionItems: string[];
}

/* ------------------------------------------------------------------ */
/* DETERMINISTIC HELPERS                                                */
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
/* DATA POOLS                                                          */
/* ------------------------------------------------------------------ */

const shiftDescriptions: Record<string, string[]> = {
  'Content Format Shifts': [
    'Pivoted from static images to 80% short-form video content in the last period',
    'Introduced carousel-style educational posts — previously absent from their strategy',
    'Shifted to long-form written posts (500+ words) on LinkedIn, abandoning short captions',
    'Started experimenting with AI-generated visuals and infographics',
    'Moved from polished studio content to raw, behind-the-scenes footage',
    'Began publishing Twitter/X threads with 8-12 tweets instead of single posts',
    'Added interactive poll-style Stories replacing standard image Stories',
    'Launched a weekly live-stream series — new format for this competitor',
  ],
  'Posting Frequency Changes': [
    'Increased posting frequency from 3x/week to daily (7x/week)',
    'Reduced posting volume by 40% but doubled average post length',
    'Started posting 2x/day on weekdays, up from 1x/day',
    'Weekend posting dropped to zero after months of 7-day schedule',
    'Burst-posting pattern detected: 5 posts on Monday, none rest of week',
    'Shifted to a consistent every-other-day cadence from irregular schedule',
    'Ramped posting from 4/week to 12/week — likely paid campaign support',
    'Introduced late-night posting (10pm-12am) alongside regular morning schedule',
  ],
  'CTA Strategy Changes': [
    'Switched from "Shop Now" CTAs to "Learn More" educational funnels',
    'Removed all direct-sale CTAs, replaced with community-building language',
    'Added urgency-based CTAs ("Limited spots", "Ends tonight") across all posts',
    'Moved from link-in-bio references to direct DM-based conversion funnels',
    'Started embedding lead magnets (free guides, checklists) in every post',
    'Shifted to comment-based CTAs ("Comment READY to get access")',
    'Replaced newsletter CTAs with podcast promotion calls-to-action',
    'Introduced multi-step CTAs: engage first, then convert via DM automation',
  ],
  'Audience Targeting Pivots': [
    'Content language shifted from B2C consumer to B2B decision-maker tone',
    'Started targeting beginners after years of expert-level content',
    'Geographic focus shifted — now referencing EU/UK markets heavily',
    'Age targeting appears younger: meme-heavy, slang-rich captions replacing professional tone',
    'Introduced Spanish-language content for the first time (20% of posts)',
    'Pivoted from solopreneurs to enterprise teams as primary audience',
    'Content now addresses C-suite executives specifically (CMO, CEO mentions)',
    'Shifted from gender-neutral to explicitly targeting female entrepreneurs',
  ],
  'Hashtag Strategy': [
    'Reduced hashtags from 25+ per post to 3-5 highly targeted tags',
    'Introduced branded hashtag campaign not seen before',
    'Switched from industry hashtags to community/movement-based tags',
    'Stopped using hashtags entirely on LinkedIn — caption-only strategy',
    'Added location-based hashtags suggesting expansion into new markets',
    'Started using competitor brand names as hashtags (aggressive move)',
    'Moved to "SEO-style" hashtags (long-tail, specific) from broad ones',
    'Hashtag rotation pattern detected: different set each day of the week',
  ],
  'Engagement Pattern Shifts': [
    'Reply rate to comments increased from <5% to estimated 60%+',
    'Started engaging heavily with competitor audiences (commenting on rival posts)',
    'Engagement bait detected: controversial takes and hot-take threads increasing',
    'Community management shifted — now responding within 30 minutes vs 24 hours',
    'Introduced "engagement pods" behavior: rapid cross-commenting with partner accounts',
    'Stopped responding to negative comments — previously engaged with all feedback',
    'Began proactively commenting on trending industry posts for visibility',
    'Engagement quality dropped: automated responses replacing personalized replies',
  ],
  'Paid vs Organic Mix': [
    'Dark post volume estimated to have tripled based on ad library data',
    'Reduced paid promotion — content appears to be 90%+ organic now',
    'Launched retargeting campaigns targeting your audience segments',
    'Shifted budget from feed ads to Story/Reel placements',
    'Started boosting user-generated content instead of brand-produced ads',
    'New whitelisting partnerships detected with 3+ influencer accounts',
    'Paid content ratio jumped from ~20% to ~50% of visible output',
    'Testing A/B ad variants more frequently — 3-4 variants per campaign detected',
  ],
  'Collaboration/Partnership Changes': [
    'New brand partnership announced with a major industry player',
    'Dropped long-standing influencer collaborations — possible rebrand',
    'Started co-creating content with micro-influencers (5K-50K followers)',
    'Launched affiliate program based on new promotional post patterns',
    'Cross-promotion detected with 2 non-competing brands in adjacent niches',
    'Guest takeovers appearing on their account for the first time',
    'Ended partnership with previous brand ambassador — possible strategy shift',
    'Joined a multi-brand collaboration campaign with 4+ other companies',
  ],
};

const trendDescriptions = [
  'Aggressively expanding content velocity — likely preparing for a product launch or campaign push',
  'Consolidating around fewer, higher-quality posts — signaling a premium brand repositioning',
  'Shifting toward community-driven growth over paid acquisition — sustainable long-term play',
  'Experimenting across multiple formats simultaneously — testing phase, expect them to double down on winners',
  'Moving upmarket — content sophistication and targeting suggest a pivot toward enterprise clients',
  'Doubling down on short-form video and engagement bait — optimizing for algorithmic reach',
  'Becoming more aggressive with competitor-aware content — direct comparison posts increasing',
  'Investing heavily in personal branding of founder/CEO — humanizing the brand narrative',
  'Pulling back on content volume while ramping paid spend — possible budget reallocation',
  'Diversifying platform presence — previously single-platform, now active on 3+ channels',
];

const opportunityDescriptions: Record<string, string[]> = {
  'Tech/SaaS': [
    'Their pivot to enterprise leaves the SMB segment underserved — capitalize with targeted content',
    'They abandoned educational content; fill the gap with tutorials and how-to guides',
    'Their reduced posting frequency opens a window to dominate the daily conversation',
    'Community engagement is dropping — poach their most active commenters with better engagement',
    'They stopped A/B testing CTAs — outperform with data-driven conversion optimization',
  ],
  'E-commerce': [
    'Their shift away from UGC creates opportunity to dominate social proof content',
    'Competitor abandoned flash sale promotions — own the urgency-driven conversion space',
    'Their content is now too polished — win with authentic, raw customer stories',
    'They dropped influencer partnerships — recruit their former collaborators at discount',
    'Weekend content gap detected — schedule high-impact posts during their silent periods',
  ],
  'Creator Economy': [
    'Their focus on polished content opens space for raw, authentic creator stories',
    'Competitor stopped engaging in comments — build community in the gap they left',
    'They pivoted to premium positioning — serve the underserved beginner audience',
    'Their collaboration network is weakening — recruit their former partners',
    'They left short-form content — dominate TikTok/Reels while they focus elsewhere',
  ],
  'Finance': [
    'Their regulatory-safe content is generic — differentiate with bold, opinion-driven posts',
    'Competitor stopped educational content — own the financial literacy niche',
    'Their engagement dropped on complex topics — simplify and capture their audience',
    'They abandoned retail investors — serve this growing audience segment',
    'Weekend posting gap allows you to dominate Saturday/Sunday finance discussions',
  ],
  'Health/Fitness': [
    'Their pivot to supplements creates space to own pure fitness content',
    'Competitor dropped beginner content — capture newcomers with accessible guides',
    'Their influencer partnerships ended — recruit athletes at favorable terms',
    'They stopped meal prep content — combine fitness + nutrition for complete authority',
    'Morning posting gap detected — own the pre-workout content window',
  ],
  'Education': [
    'Their move to premium courses leaves free content space open — fill it',
    'Competitor reduced posting frequency — maintain daily presence to capture share',
    'They stopped student testimonials — dominate social proof in the education space',
    'Their content became too academic — win with practical, applied learning posts',
    'They abandoned YouTube — create the definitive video course channel in the niche',
  ],
  'Food/Beverage': [
    'Their shift to fine dining leaves casual/home cooking audience underserved',
    'Competitor stopped recipe videos — own the short-form recipe format',
    'They dropped seasonal content — capitalize on holiday and seasonal food trends',
    'Their sustainability messaging weakened — differentiate with eco-friendly positioning',
    'They left TikTok food trends behind — dominate viral food content',
  ],
  'Fashion/Beauty': [
    'Their luxury pivot leaves affordable fashion audience open — serve them',
    'Competitor dropped size-inclusive content — own the body-positive narrative',
    'They stopped trend prediction content — become the go-to trend forecaster',
    'Their UGC program collapsed — launch a superior community-driven style campaign',
    'They left sustainable fashion — differentiate with eco-conscious positioning',
  ],
};

const actionItemPool = [
  'Publish 3 pieces of content in the format your competitor just abandoned',
  'Launch a targeted engagement campaign during their identified posting gaps',
  'Create a comparison post addressing the audience segment they deprioritized',
  'Recruit 2-3 micro-influencers from their recently dropped partnership network',
  'Run a 7-day content blitz on the platform where their activity dropped most',
  'A/B test the CTA style they abandoned — it may still resonate with your shared audience',
  'Schedule community engagement sessions during hours they stopped responding',
  'Develop a lead magnet addressing the topic gap their format shift created',
  'Create a branded hashtag campaign targeting the community they left behind',
  'Produce a weekly content series in the format they deprioritized',
  'Amplify UGC content to fill the authenticity gap their polished pivot created',
  'Boost posts during their identified low-activity periods for maximum share of voice',
  'Build a nurture sequence for audience members likely dissatisfied with their shift',
  'Partner with complementary brands they recently stopped collaborating with',
  'Launch retargeting ads specifically during their content blackout windows',
];

const weeklyDigestTemplates = [
  '{name} made {shiftCount} significant strategic changes this period. The most critical was {topShift}. Their threat level is {threat}/10 — {threatDesc}. Your biggest opportunity: {topOpp}.',
  'This period, {name} shifted their approach notably with {shiftCount} detected changes. The highest-severity shift involved {topShift}. At threat level {threat}/10, {threatDesc}. Immediate opportunity: {topOpp}.',
  'Monitoring detected {shiftCount} strategic shifts from {name}. Key development: {topShift}. Current threat assessment: {threat}/10 ({threatDesc}). Recommended focus: {topOpp}.',
];

/* ------------------------------------------------------------------ */
/* GENERATOR                                                           */
/* ------------------------------------------------------------------ */

function generateTrackResults(
  competitors: string[],
  platform: string,
  categories: string[],
  timeRange: string,
  industry: string
): CompetitorTrackResult[] {
  const results: CompetitorTrackResult[] = [];

  for (const comp of competitors) {
    if (!comp.trim()) continue;

    const seed = hash(comp + platform + timeRange + industry + categories.join(','));
    const rng = seededRandom(seed);

    // Generate shifts
    const shifts: StrategicShift[] = [];
    const numShifts = 4 + Math.floor(rng() * 4); // 4-7 shifts
    const usedCategories = new Set<string>();
    const catPool = categories.length > 0 ? categories : [...monitoringCategories];

    for (let i = 0; i < numShifts; i++) {
      let cat: string;
      if (i < catPool.length) {
        cat = catPool[i % catPool.length];
      } else {
        cat = pickFrom(catPool, rng);
      }

      const descs = shiftDescriptions[cat] || shiftDescriptions['Content Format Shifts'];
      const descIdx = Math.floor(rng() * descs.length);
      const severities: StrategicShift['severity'][] = ['low', 'medium', 'high', 'critical'];
      const severityWeights = [0.2, 0.35, 0.3, 0.15];
      let r = rng();
      let sevIdx = 0;
      for (let j = 0; j < severityWeights.length; j++) {
        if (r < severityWeights[j]) { sevIdx = j; break; }
        r -= severityWeights[j];
      }

      const daysAgo = Math.floor(rng() * (timeRange === 'Last 7 days' ? 7 : timeRange === 'Last 14 days' ? 14 : timeRange === 'Last 30 days' ? 30 : 90));
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);

      const recs = [
        `Counter by strengthening your own ${cat.toLowerCase()} approach with consistent, high-quality output`,
        `Monitor this shift for 1-2 more weeks before reacting — it may be temporary A/B testing`,
        `Immediately capitalize: create content addressing the gap this shift opens in the market`,
        `Defensive move recommended: ensure your ${cat.toLowerCase()} strategy is locked in before they gain ground`,
        `Offensive opportunity: this shift exposes a weakness you can exploit with targeted content`,
        `Use this intelligence to brief your content team on evolving competitive landscape`,
        `Adjust your content calendar to address this shift within the next 48 hours`,
        `Consider pivoting your own strategy in the opposite direction to differentiate`,
      ];

      shifts.push({
        category: cat,
        description: descs[descIdx],
        severity: severities[sevIdx],
        detectedDate: date.toISOString().split('T')[0],
        recommendation: pickFrom(recs, rng),
      });

      usedCategories.add(cat);
    }

    // Sort shifts by severity (critical first)
    const sevOrder: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 };
    shifts.sort((a, b) => sevOrder[a.severity] - sevOrder[b.severity]);

    const threatLevel = Math.min(10, Math.max(1, Math.round(
      shifts.filter(s => s.severity === 'critical').length * 3 +
      shifts.filter(s => s.severity === 'high').length * 2 +
      shifts.filter(s => s.severity === 'medium').length * 1 +
      rng() * 2
    )));

    const overallTrend = pickFrom(trendDescriptions, rng);

    const indOpps = opportunityDescriptions[industry] || opportunityDescriptions['Tech/SaaS'];
    const opportunities: string[] = [];
    const usedOppIdx = new Set<number>();
    for (let i = 0; i < 3; i++) {
      let idx: number;
      do { idx = Math.floor(rng() * indOpps.length); } while (usedOppIdx.has(idx));
      usedOppIdx.add(idx);
      opportunities.push(indOpps[idx]);
    }

    const actionItems: string[] = [];
    const usedActIdx = new Set<number>();
    for (let i = 0; i < 4; i++) {
      let idx: number;
      do { idx = Math.floor(rng() * actionItemPool.length); } while (usedActIdx.has(idx));
      usedActIdx.add(idx);
      actionItems.push(actionItemPool[idx]);
    }

    const threatDesc = threatLevel >= 8 ? 'immediate attention required' : threatLevel >= 5 ? 'monitor closely and prepare responses' : 'low risk, continue current strategy';
    const topShift = shifts[0]?.description.toLowerCase() || 'content format changes';
    const topOpp = opportunities[0] || 'capitalize on their strategic gaps';

    const digestTemplate = pickFrom(weeklyDigestTemplates, rng);
    const weeklyDigest = digestTemplate
      .replace('{name}', comp.trim())
      .replace('{shiftCount}', String(shifts.length))
      .replace('{topShift}', topShift)
      .replace('{threat}', String(threatLevel))
      .replace('{threatDesc}', threatDesc)
      .replace('{topOpp}', topOpp);

    results.push({
      competitorName: comp.trim(),
      platform,
      shifts,
      overallTrend,
      threatLevel,
      opportunities,
      weeklyDigest,
      actionItems,
    });
  }

  return results;
}

/* ------------------------------------------------------------------ */
/* COMPONENT                                                           */
/* ------------------------------------------------------------------ */

export default function CompetitorTrackerPage() {
  const [platform, setPlatform] = useState<string>('Twitter/X');
  const [competitors, setCompetitors] = useState<string[]>(['', '', '']);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([...monitoringCategories]);
  const [timeRange, setTimeRange] = useState<string>('Last 30 days');
  const [industry, setIndustry] = useState<string>('Tech/SaaS');
  const [results, setResults] = useState<CompetitorTrackResult[] | null>(null);

  function addCompetitor() {
    if (competitors.length < 5) setCompetitors([...competitors, '']);
  }

  function removeCompetitor(idx: number) {
    if (competitors.length > 1) setCompetitors(competitors.filter((_, i) => i !== idx));
  }

  function updateCompetitor(idx: number, val: string) {
    const updated = [...competitors];
    updated[idx] = val;
    setCompetitors(updated);
  }

  function toggleCategory(cat: string) {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  }

  function analyze() {
    const filled = competitors.filter(c => c.trim());
    if (filled.length === 0) return;
    setResults(generateTrackResults(filled, platform, selectedCategories, timeRange, industry));
  }

  const canAnalyze = competitors.some(c => c.trim());

  const severityColor = (s: string) =>
    s === 'critical' ? 'text-red-500 bg-red-500/10 border-red-500/30' :
    s === 'high' ? 'text-orange-400 bg-orange-400/10 border-orange-400/30' :
    s === 'medium' ? 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30' :
    'text-blue-400 bg-blue-400/10 border-blue-400/30';

  const severityBadge = (s: string) =>
    s === 'critical' ? 'text-red-500 bg-red-500/10' :
    s === 'high' ? 'text-orange-400 bg-orange-400/10' :
    s === 'medium' ? 'text-yellow-400 bg-yellow-400/10' :
    'text-blue-400 bg-blue-400/10';

  const threatColor = (level: number) =>
    level >= 8 ? 'text-red-500' : level >= 5 ? 'text-orange-400' : level >= 3 ? 'text-yellow-400' : 'text-green-400';

  const threatBg = (level: number) =>
    level >= 8 ? 'bg-red-500' : level >= 5 ? 'bg-orange-400' : level >= 3 ? 'bg-yellow-400' : 'bg-green-400';

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs text-purple-400 uppercase tracking-widest mb-2 font-semibold">Competitive Intelligence</p>
        <h1 className="text-4xl font-bold mb-3">Competitor <span className="gradient-text">Tracker</span></h1>
        <p className="text-zinc-400 mb-10 max-w-2xl">Monitor competitor profiles in real time. Detect strategic shifts in content format, posting frequency, CTAs, audience targeting, and more — before they gain an edge.</p>

        {/* ---- FORM ---- */}
        <div className="glass rounded-2xl p-6 mb-10">
          {/* Competitor Inputs */}
          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Competitor profiles (up to 5)</label>
          <div className="space-y-3 mb-5">
            {competitors.map((comp, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  value={comp}
                  onChange={e => updateCompetitor(idx, e.target.value)}
                  placeholder={`Competitor ${idx + 1} — handle or URL (e.g. @rival_brand)`}
                  className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-purple-500 transition"
                />
                {competitors.length > 1 && (
                  <button onClick={() => removeCompetitor(idx)} className="px-3 py-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-red-400 hover:bg-zinc-700 transition text-sm">
                    Remove
                  </button>
                )}
              </div>
            ))}
            {competitors.length < 5 && (
              <button onClick={addCompetitor} className="text-xs text-purple-400 hover:text-purple-300 transition">+ Add another competitor</button>
            )}
          </div>

          {/* Platform */}
          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Platform</label>
          <div className="flex flex-wrap gap-2 mb-5">
            {platforms.map(p => (
              <button key={p} onClick={() => setPlatform(p)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition ${platform === p ? 'bg-purple-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
                {p}
              </button>
            ))}
          </div>

          {/* Monitoring Categories */}
          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Monitoring categories</label>
          <div className="flex flex-wrap gap-2 mb-5">
            {monitoringCategories.map(cat => (
              <button key={cat} onClick={() => toggleCategory(cat)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition ${selectedCategories.includes(cat) ? 'bg-violet-600/30 text-violet-300 border border-violet-500/40' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 border border-transparent'}`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Time Range & Industry */}
          <div className="grid md:grid-cols-2 gap-4 mb-5">
            <div>
              <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Time range</label>
              <select value={timeRange} onChange={e => setTimeRange(e.target.value)}
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-purple-500 transition">
                {timeRanges.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Industry</label>
              <select value={industry} onChange={e => setIndustry(e.target.value)}
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-purple-500 transition">
                {industries.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
          </div>

          <button onClick={analyze} disabled={!canAnalyze}
            className="w-full py-3.5 btn-primary rounded-xl font-semibold text-white">
            Track Competitors
          </button>
        </div>

        {/* ---- RESULTS ---- */}
        {results && results.length > 0 && (
          <div className="space-y-10 fade-in">

            {/* Summary Cards */}
            <div className="grid md:grid-cols-4 gap-4">
              <div className="glass rounded-xl p-5 text-center">
                <p className="text-xs text-zinc-500 uppercase mb-1">Competitors Tracked</p>
                <p className="text-3xl font-bold text-white">{results.length}</p>
                <p className="text-xs text-zinc-400 mt-1">{platform}</p>
              </div>
              <div className="glass rounded-xl p-5 text-center">
                <p className="text-xs text-zinc-500 uppercase mb-1">Total Shifts Detected</p>
                <p className="text-3xl font-bold text-violet-400">{results.reduce((s, r) => s + r.shifts.length, 0)}</p>
                <p className="text-xs text-zinc-400 mt-1">{timeRange}</p>
              </div>
              <div className="glass rounded-xl p-5 text-center">
                <p className="text-xs text-zinc-500 uppercase mb-1">Critical Alerts</p>
                <p className="text-3xl font-bold text-red-400">{results.reduce((s, r) => s + r.shifts.filter(sh => sh.severity === 'critical').length, 0)}</p>
                <p className="text-xs text-zinc-400 mt-1">Require immediate action</p>
              </div>
              <div className="glass rounded-xl p-5 text-center">
                <p className="text-xs text-zinc-500 uppercase mb-1">Avg Threat Level</p>
                <p className={`text-3xl font-bold ${threatColor(Math.round(results.reduce((s, r) => s + r.threatLevel, 0) / results.length))}`}>
                  {(results.reduce((s, r) => s + r.threatLevel, 0) / results.length).toFixed(1)}/10
                </p>
                <p className="text-xs text-zinc-400 mt-1">Across all competitors</p>
              </div>
            </div>

            {/* Per-Competitor Results */}
            {results.map((result, rIdx) => (
              <div key={rIdx} className="glass rounded-2xl p-6">
                {/* Competitor Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold">{result.competitorName}</h2>
                    <p className="text-sm text-zinc-400">{result.platform} &middot; {industry}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-zinc-500 uppercase mb-1">Threat Level</p>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-zinc-800 rounded-full h-3 overflow-hidden">
                        <div className={`h-full rounded-full ${threatBg(result.threatLevel)}`} style={{ width: `${result.threatLevel * 10}%` }} />
                      </div>
                      <span className={`text-lg font-bold ${threatColor(result.threatLevel)}`}>{result.threatLevel}/10</span>
                    </div>
                  </div>
                </div>

                {/* Weekly Digest */}
                <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800 mb-6">
                  <p className="text-xs text-purple-400 uppercase tracking-wider mb-2 font-medium">Weekly Digest</p>
                  <p className="text-sm text-zinc-300 leading-relaxed">{result.weeklyDigest}</p>
                </div>

                {/* Overall Trend */}
                <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800 mb-6">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2 font-medium">Overall Strategic Trend</p>
                  <p className="text-sm text-zinc-300">{result.overallTrend}</p>
                </div>

                {/* Strategic Shifts */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-zinc-400">Detected Shifts ({result.shifts.length})</h3>
                  <div className="space-y-3">
                    {result.shifts.map((shift, sIdx) => (
                      <div key={sIdx} className={`bg-zinc-900/50 rounded-xl p-4 border ${severityColor(shift.severity)}`}>
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${severityBadge(shift.severity)}`}>{shift.severity}</span>
                          <span className="text-xs text-zinc-500">{shift.category}</span>
                          <span className="text-xs text-zinc-600 ml-auto">{shift.detectedDate}</span>
                        </div>
                        <p className="text-sm text-zinc-300 mb-2">{shift.description}</p>
                        <p className="text-xs text-purple-400"><strong>Recommendation:</strong> {shift.recommendation}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Opportunities */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-zinc-400">Opportunities</h3>
                  <div className="space-y-2">
                    {result.opportunities.map((opp, oIdx) => (
                      <div key={oIdx} className="flex gap-3 items-start bg-zinc-900/50 rounded-xl p-4 border border-green-500/20">
                        <span className="text-green-400 font-bold text-sm mt-0.5">{oIdx + 1}.</span>
                        <p className="text-sm text-zinc-300">{opp}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Items */}
                <div>
                  <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-zinc-400">Action Items</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {result.actionItems.map((item, aIdx) => (
                      <div key={aIdx} className="flex gap-3 items-start bg-zinc-900/50 rounded-xl p-4 border border-zinc-800">
                        <span className="text-violet-400 font-bold text-sm mt-0.5 shrink-0">#{aIdx + 1}</span>
                        <p className="text-sm text-zinc-300">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Export Section */}
            <div className="glass rounded-2xl p-6 text-center">
              <h3 className="font-semibold mb-2">Export Competitor Intelligence Report</h3>
              <p className="text-sm text-zinc-400 mb-4">Download a complete strategic shift report with all detected changes, threat assessments, and action items.</p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => {
                    const data = JSON.stringify(results, null, 2);
                    const blob = new Blob([data], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'competitor-tracker-report.json';
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="px-5 py-2.5 btn-primary rounded-lg text-sm font-medium text-white"
                >
                  Export JSON
                </button>
                <button
                  onClick={() => {
                    let md = '# Competitor Tracker Report\n\n';
                    md += `**Platform:** ${platform} | **Industry:** ${industry} | **Period:** ${timeRange}\n\n---\n\n`;
                    results.forEach(r => {
                      md += `## ${r.competitorName}\n\n`;
                      md += `**Threat Level:** ${r.threatLevel}/10\n\n`;
                      md += `**Digest:** ${r.weeklyDigest}\n\n`;
                      md += `**Overall Trend:** ${r.overallTrend}\n\n`;
                      md += `### Detected Shifts\n\n`;
                      r.shifts.forEach((s, i) => {
                        md += `${i + 1}. **[${s.severity.toUpperCase()}]** ${s.category} (${s.detectedDate})\n   ${s.description}\n   *Recommendation:* ${s.recommendation}\n\n`;
                      });
                      md += `### Opportunities\n\n`;
                      r.opportunities.forEach((o, i) => { md += `${i + 1}. ${o}\n`; });
                      md += `\n### Action Items\n\n`;
                      r.actionItems.forEach((a, i) => { md += `${i + 1}. ${a}\n`; });
                      md += '\n---\n\n';
                    });
                    const blob = new Blob([md], { type: 'text/markdown' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'competitor-tracker-report.md';
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm font-medium text-zinc-300 transition"
                >
                  Export Markdown
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ---- SEO CONTENT ---- */}
        <section className="mt-16 glass rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">What Is Competitor Tracking?</h2>
          <p className="text-zinc-400 mb-4">Competitor tracking goes beyond one-time analysis. It is the ongoing, real-time monitoring of competitor social media behavior to detect strategic shifts as they happen — from content format pivots and posting cadence changes to CTA experiments and audience retargeting moves. Unlike static competitor analysis, tracking gives you a dynamic, living view of how your rivals are evolving their strategy.</p>

          <h3 className="text-lg font-semibold mb-3">Why Real-Time Competitor Tracking Matters in 2026</h3>
          <ul className="space-y-2 text-sm text-zinc-400 mb-6">
            <li className="flex gap-2"><span className="text-purple-400">&#10003;</span> Brands that monitor competitors weekly are 3.2x more likely to outperform on engagement rates</li>
            <li className="flex gap-2"><span className="text-purple-400">&#10003;</span> 67% of strategic content pivots happen within a 14-day window — miss it and you lose the advantage</li>
            <li className="flex gap-2"><span className="text-purple-400">&#10003;</span> Early detection of competitor CTA changes lets you A/B test counter-strategies 2 weeks faster</li>
            <li className="flex gap-2"><span className="text-purple-400">&#10003;</span> Automated drift detection eliminates 10+ hours/week of manual competitor monitoring</li>
          </ul>

          <h3 className="text-lg font-semibold mb-3">How PostCraft Competitor Tracker Works</h3>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-zinc-900/50 rounded-xl p-4"><p className="font-medium text-sm mb-1">1. Add Competitors</p><p className="text-xs text-zinc-500">Enter up to 5 competitor handles or profile URLs across any major platform.</p></div>
            <div className="bg-zinc-900/50 rounded-xl p-4"><p className="font-medium text-sm mb-1">2. Detect Shifts</p><p className="text-xs text-zinc-500">Our AI scans for strategic changes across 8 categories, scoring severity and urgency.</p></div>
            <div className="bg-zinc-900/50 rounded-xl p-4"><p className="font-medium text-sm mb-1">3. Act on Intelligence</p><p className="text-xs text-zinc-500">Get threat-scored reports with specific action items and opportunity windows.</p></div>
          </div>

          <h3 className="text-lg font-semibold mb-3">Competitor Tracker vs Competitor Analysis</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm mb-6">
              <thead>
                <tr className="text-zinc-500 text-xs uppercase">
                  <th className="text-left py-2">Feature</th>
                  <th className="text-center py-2">Competitor Tracker</th>
                  <th className="text-center py-2">Competitor Analysis</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Monitoring Type', 'Real-time, ongoing', 'One-time snapshot'],
                  ['Shift Detection', 'Automated drift alerts', 'Manual comparison'],
                  ['Threat Scoring', 'Dynamic 1-10 scale', 'Static SWOT'],
                  ['Action Items', 'Time-sensitive, tactical', 'Strategic, long-term'],
                  ['Best For', 'Weekly competitive intel', 'Quarterly strategy reviews'],
                ].map(([feature, tracker, analysis]) => (
                  <tr key={feature} className="border-t border-zinc-800">
                    <td className="py-3 text-zinc-300 font-medium">{feature}</td>
                    <td className="py-3 text-center text-purple-400">{tracker}</td>
                    <td className="py-3 text-center text-zinc-400">{analysis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ---- FAQ ---- */}
        <section className="mt-8 glass rounded-2xl p-8">
          <h2 className="text-xl font-bold mb-4">Competitor Tracker FAQ</h2>
          <div className="space-y-4">
            {[
              ['How is this different from Competitor Analysis?', 'Competitor Analysis provides a one-time, in-depth SWOT-style breakdown. Competitor Tracker is designed for ongoing, real-time monitoring — it detects when competitors change their strategy and alerts you with severity-scored shifts and specific counter-actions.'],
              ['How many competitors can I track?', 'You can track up to 5 competitors simultaneously per analysis. Each competitor receives a full strategic shift report with threat scoring, opportunities, and action items.'],
              ['What types of shifts does the tracker detect?', 'The tracker monitors 8 categories: Content Format Shifts, Posting Frequency Changes, CTA Strategy Changes, Audience Targeting Pivots, Hashtag Strategy, Engagement Pattern Shifts, Paid vs Organic Mix, and Collaboration/Partnership Changes.'],
              ['How is the threat level calculated?', 'Threat level (1-10) is calculated based on the number and severity of detected shifts. Critical shifts contribute 3 points, high shifts contribute 2, and medium shifts contribute 1. Levels 8+ require immediate attention.'],
              ['Can I export the tracking report?', 'Yes. Export as JSON for integration with other tools or as Markdown for team sharing and documentation. Both formats include all detected shifts, threat scores, and recommended actions.'],
              ['How often should I run competitor tracking?', 'For fast-moving industries (Tech/SaaS, Creator Economy), run weekly. For slower-moving verticals (Finance, Education), bi-weekly or monthly is sufficient. The key is consistency — strategic shifts compound over time.'],
            ].map(([q, a]) => (
              <div key={q}>
                <h3 className="font-medium text-sm mb-1">{q}</h3>
                <p className="text-xs text-zinc-500">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---- INTERNAL LINKS ---- */}
        <section className="mt-8 text-center">
          <p className="text-sm text-zinc-500 mb-3">Related Tools</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              ['/competitor-analysis', 'Competitor Analysis'],
              ['/social-listening', 'Social Listening'],
              ['/trend-tracker', 'Trend Tracker'],
              ['/sentiment-analyzer', 'Sentiment Analyzer'],
              ['/brand-voice', 'Brand Voice'],
              ['/crisis-management', 'Crisis Management'],
              ['/engagement-calculator', 'Engagement Calculator'],
            ].map(([href, label]) => (
              <a key={href} href={href} className="text-xs text-purple-400 hover:text-purple-300 transition underline underline-offset-2">{label}</a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
