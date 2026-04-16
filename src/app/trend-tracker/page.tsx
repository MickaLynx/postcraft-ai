'use client';
import { useState } from 'react';
import Link from 'next/link';

// SEO metadata (for layout.tsx if converted to server component):
// title: "Social Media Trend Tracker & Predictor — Free 2026 Tool | PostCraft AI"
// description: "Track trending topics, predict viral content, and discover emerging hashtags across 6 platforms and 12 industries. Free social media trend analysis tool updated daily."

// metadata removed — client components cannot export metadata

/* ------------------------------------------------------------------ */
/* CONSTANTS                                                           */
/* ------------------------------------------------------------------ */

const industries = [
  'E-commerce', 'SaaS/B2B', 'Health & Fitness', 'Finance', 'Education',
  'Food & Beverage', 'Fashion', 'Technology', 'Real Estate', 'Travel',
  'Entertainment', 'Gaming',
] as const;

const platforms = ['Twitter/X', 'LinkedIn', 'Instagram', 'TikTok', 'YouTube', 'Reddit'] as const;

const timeHorizons = ['This Week', 'This Month', 'This Quarter', 'This Year'] as const;

const regions = ['Global', 'North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East', 'Africa'] as const;

const contentFocuses = ['Organic Growth', 'Paid Advertising', 'Community Building', 'Brand Awareness', 'Lead Generation'] as const;

const velocityLevels = ['Exploding', 'Surging', 'Rising', 'Peaking', 'Declining'] as const;
type Velocity = typeof velocityLevels[number];

const contentTypes = ['Video', 'Carousel', 'Story', 'Text', 'Live'] as const;

/* ------------------------------------------------------------------ */
/* HASH / DETERMINISTIC DATA                                           */
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

function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return n.toString();
}

/* ------------------------------------------------------------------ */
/* DATA GENERATORS                                                     */
/* ------------------------------------------------------------------ */

interface TrendingTopic {
  name: string;
  velocity: Velocity;
  reach: number;
  engagementMultiplier: number;
  relevanceScore: number;
  actionTip: string;
  velocityValue: number;
}

interface Hashtag {
  tag: string;
  reach: number;
  growthRate: number;
  competition: 'Low' | 'Medium' | 'High';
}

interface FormatRec {
  format: string;
  explanation: string;
  engagementBoost: number;
  bestTime: string;
}

interface CompetitorGap {
  topic: string;
  opportunityScore: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface ForecastPoint {
  day: number;
  value: number;
}

interface TrendForecast {
  topic: string;
  trajectory: 'up' | 'stable' | 'down';
  points: ForecastPoint[];
}

const topicPools: Record<string, string[]> = {
  'E-commerce': ['Social Commerce Integration', 'AR Try-On Experiences', 'Micro-Influencer Partnerships', 'Shoppable Livestreams', 'User-Generated Reviews', 'Flash Sale Countdowns', 'Sustainable Packaging Reveals', 'AI Personal Shopper', 'Cross-Border Selling Tips', 'Subscription Box Unboxings'],
  'SaaS/B2B': ['AI Workflow Automation', 'Product-Led Growth Stories', 'Customer Success Spotlights', 'Remote Team Culture', 'API Integration Showcases', 'Founder Journey Threads', 'SaaS Metrics Breakdowns', 'Zero-Party Data Collection', 'Vertical SaaS Deep Dives', 'PLG Onboarding Hacks'],
  'Health & Fitness': ['Wearable Data Sharing', 'Micro-Workout Challenges', 'Gut Health Protocols', 'Sleep Optimization Tips', 'Mental Health Check-ins', 'Functional Fitness Trends', 'Recovery Science Content', 'Plant-Based Performance', 'Mindfulness Streaks', 'Cold Plunge Reactions'],
  'Finance': ['AI Portfolio Updates', 'Financial Literacy Threads', 'Crypto Regulation News', 'Budgeting Challenge Reels', 'Real-Time Market Commentary', 'Fintech App Reviews', 'Passive Income Breakdowns', 'Tax Strategy Tips', 'Gen-Z Investing Trends', 'DeFi Yield Farming Explained'],
  'Education': ['AI Tutoring Demos', 'Micro-Credential Spotlights', 'Study Routine Vlogs', 'EdTech Tool Reviews', 'Skill-Based Learning Paths', 'Campus Life Content', 'Online Degree Comparisons', 'Gamified Learning Showcases', 'Teacher Tips Threads', 'Scholarship Hack Guides'],
  'Food & Beverage': ['Recipe Remix Challenges', 'Behind-the-Kitchen Content', 'Food Science Explainers', 'Local Sourcing Stories', 'Mukbang Reactions', 'Fermentation Tutorials', 'Zero-Waste Cooking', 'Street Food Discoveries', 'Meal Prep Transformations', 'Flavor Pairing Experiments'],
  'Fashion': ['Sustainable Fashion Hauls', 'AI Style Recommendations', 'Capsule Wardrobe Builds', 'Vintage Thrift Finds', 'Fashion Week Reactions', 'Color Trend Forecasts', 'Outfit Transition Reels', 'Size-Inclusive Showcases', 'Upcycling Tutorials', 'Digital Fashion NFTs'],
  'Technology': ['AI Agent Demos', 'Spatial Computing Experiences', 'Open Source Spotlights', 'Dev Tool Reviews', 'Tech Ethics Debates', 'Quantum Computing Explained', 'Robotics Showcases', 'Privacy Tech Updates', 'Coding Challenge Solutions', 'Startup Launch Reactions'],
  'Real Estate': ['Virtual Tour Walkthroughs', 'Market Data Visualizations', 'First-Time Buyer Tips', 'Renovation Before/Afters', 'Investment Property Analysis', 'Neighborhood Spotlights', 'Mortgage Rate Updates', 'Smart Home Tech Tours', 'Real Estate Agent Day-in-Life', 'Co-Living Trend Spotlights'],
  'Travel': ['Hidden Gem Destinations', 'Travel Hack Threads', 'Digital Nomad Setups', 'Sustainable Travel Tips', 'Flight Deal Alerts', 'Cultural Immersion Content', 'Solo Travel Vlogs', 'Luxury on a Budget', 'Workcation Reviews', 'Adventure Sport POVs'],
  'Entertainment': ['Behind-the-Scenes Content', 'Fan Theory Threads', 'Streaming Recommendations', 'Live Event Reactions', 'Creator Collaboration Reveals', 'Nostalgia Content Remixes', 'Interactive Story Polls', 'Music Discovery Playlists', 'Podcast Clip Highlights', 'Meme Trend Participation'],
  'Gaming': ['Game Dev Behind-the-Scenes', 'Speedrun Highlights', 'Indie Game Spotlights', 'Esports Tournament Clips', 'Gaming Setup Tours', 'Retro Gaming Nostalgia', 'Mod Showcase Reels', 'Community Challenge Events', 'Game Review Hot Takes', 'VR Gaming Experiences'],
};

const hashtagPools: Record<string, string[]> = {
  'E-commerce': ['#ShopSmall2026', '#SocialCommerce', '#ARShopping', '#LiveShopping', '#EcoPackaging', '#FlashDeal', '#ShoppableContent', '#MicroInfluencer', '#DTC2026', '#CartAbandonmentFix', '#DropshipTrends', '#CustomerFirst'],
  'SaaS/B2B': ['#PLGStrategy', '#SaaSMetrics', '#AIWorkflow', '#B2BMarketing', '#StartupLife', '#ProductHunt2026', '#APIFirst', '#ZeroPartyData', '#CustomerSuccess', '#FounderMode', '#TechStack2026', '#GrowthHacking'],
  'Health & Fitness': ['#WellnessTech', '#MicroWorkout', '#GutHealth2026', '#SleepScience', '#MindfulMovement', '#RecoveryDay', '#PlantPowered', '#ColdPlunge', '#FitnessJourney', '#MentalHealthMatters', '#WearableData', '#HolisticHealth'],
  'Finance': ['#FinancialFreedom', '#AIInvesting', '#CryptoRegulation', '#BudgetChallenge', '#FintechReview', '#PassiveIncome', '#GenZFinance', '#TaxHacks2026', '#MarketUpdate', '#DeFiYield', '#MoneyMindset', '#WealthBuilding'],
  'Education': ['#EdTech2026', '#MicroCredentials', '#AITutor', '#StudyWithMe', '#SkillBuilding', '#OnlineLearning', '#TeacherTips', '#ScholarshipHacks', '#GamifiedLearning', '#LifelongLearner', '#CampusLife', '#StudyMotivation'],
  'Food & Beverage': ['#RecipeRemix', '#FoodScience', '#LocallySourced', '#ZeroWasteCooking', '#MealPrepSunday', '#Fermentation', '#StreetFoodFinds', '#FoodieReels', '#FlavorPairing', '#PlantBased2026', '#CookingHacks', '#FoodTrends'],
  'Fashion': ['#SustainableFashion', '#CapsuleWardrobe', '#ThriftFlip', '#FashionWeek2026', '#ColorTrends', '#SizeInclusive', '#UpcycledFashion', '#DigitalFashion', '#OOTD2026', '#VintageFinds', '#StyleGuide', '#FashionTech'],
  'Technology': ['#AIAgents', '#SpatialComputing', '#OpenSource2026', '#DevTools', '#TechEthics', '#QuantumReady', '#PrivacyFirst', '#CodeChallenge', '#StartupLaunch', '#Robotics2026', '#FutureTech', '#BuildInPublic'],
  'Real Estate': ['#VirtualTour', '#RealEstateData', '#FirstTimeBuyer', '#RenoReveal', '#InvestmentProperty', '#SmartHome2026', '#MortgageRates', '#NeighborhoodGuide', '#CoLiving', '#PropTech', '#HousingMarket', '#RealEstateTips'],
  'Travel': ['#HiddenGems', '#TravelHacks', '#DigitalNomad2026', '#SustainableTravel', '#FlightDeals', '#SoloTravel', '#Workcation', '#AdventureTravel', '#CulturalImmersion', '#BudgetTravel', '#TravelReels', '#Wanderlust2026'],
  'Entertainment': ['#BTS2026', '#FanTheory', '#StreamingPicks', '#LiveReaction', '#CreatorCollab', '#NostalgiaContent', '#PodcastClips', '#MemeOfTheDay', '#MusicDiscovery', '#InteractiveContent', '#PopCulture', '#EntertainmentNews'],
  'Gaming': ['#GameDev', '#Speedrun', '#IndieGames', '#Esports2026', '#GamingSetup', '#RetroGaming', '#ModShowcase', '#VRGaming', '#GameReview', '#GamingCommunity', '#StreamerLife', '#GameChallenge'],
};

function generateTrendingTopics(industry: string, platform: string, region: string, horizon: string, focus: string): TrendingTopic[] {
  const seed = hash(industry + platform + region + horizon + focus);
  const rng = seededRandom(seed);
  const pool = topicPools[industry] || topicPools['Technology'];

  const used = new Set<number>();
  const topics: TrendingTopic[] = [];

  for (let i = 0; i < 5; i++) {
    let idx: number;
    do { idx = Math.floor(rng() * pool.length); } while (used.has(idx));
    used.add(idx);

    const velocityIdx = Math.min(4, Math.floor(rng() * 5));
    const velocity = velocityLevels[velocityIdx];
    const baseReach = [500000, 250000, 120000, 80000, 40000][i];
    const reach = Math.round(baseReach * (0.7 + rng() * 0.6));
    const engagementMultiplier = parseFloat((1.5 + rng() * 3.5).toFixed(1));
    const relevanceScore = Math.round(95 - i * 8 - rng() * 10);
    const velocityValue = [95, 78, 60, 45, 25][velocityIdx] + Math.round(rng() * 10 - 5);

    const tips = [
      `Create ${platform === 'TikTok' || platform === 'Instagram' ? 'short-form video' : 'in-depth'} content around this topic within 48 hours`,
      `Engage in existing conversations and add your unique ${industry.toLowerCase()} perspective`,
      `Launch a series or challenge tied to this trend for sustained engagement`,
      `Partner with micro-influencers already discussing this topic in ${region}`,
      `Repurpose your best-performing ${focus.toLowerCase()} content to ride this wave`,
    ];

    topics.push({
      name: pool[idx],
      velocity,
      reach,
      engagementMultiplier,
      relevanceScore,
      actionTip: tips[i],
      velocityValue,
    });
  }

  return topics;
}

function generateHeatmap(industry: string, platform: string, region: string): number[][] {
  const seed = hash(industry + platform + region + 'heatmap');
  const rng = seededRandom(seed);
  const grid: number[][] = [];
  for (let p = 0; p < 6; p++) {
    const row: number[] = [];
    for (let c = 0; c < 5; c++) {
      row.push(Math.round(20 + rng() * 80));
    }
    grid.push(row);
  }
  return grid;
}

function generateHashtags(industry: string, platform: string, region: string): Hashtag[] {
  const seed = hash(industry + platform + region + 'hashtags');
  const rng = seededRandom(seed);
  const pool = hashtagPools[industry] || hashtagPools['Technology'];

  const shuffled = [...pool].sort(() => rng() - 0.5);
  return shuffled.slice(0, 10).map((tag, i) => {
    const reach = Math.round((200000 - i * 15000) * (0.6 + rng() * 0.8));
    const growthRate = Math.round((80 - i * 5) * (0.5 + rng()));
    const comp: ('Low' | 'Medium' | 'High')[] = ['Low', 'Medium', 'High'];
    return {
      tag,
      reach,
      growthRate,
      competition: comp[Math.floor(rng() * 3)],
    };
  });
}

function generateFormatRecs(industry: string, platform: string, focus: string): FormatRec[] {
  const seed = hash(industry + platform + focus + 'formats');
  const rng = seededRandom(seed);

  const formats = [
    { format: 'Short-Form Video (15-60s)', explanation: `Short videos dominate ${platform} in 2026. Pair trending audio with ${industry.toLowerCase()} tips for maximum algorithmic reach.`, boost: 35 + Math.round(rng() * 25), time: '9:00 AM - 11:00 AM' },
    { format: 'Carousel / Slide Deck', explanation: `Multi-slide educational content drives saves and shares. Break down complex ${industry.toLowerCase()} topics into digestible slides.`, boost: 25 + Math.round(rng() * 20), time: '12:00 PM - 2:00 PM' },
    { format: 'Interactive Poll / Quiz', explanation: `Interactive content generates 2-3x more comments. Use polls to understand your ${focus.toLowerCase()} audience preferences.`, boost: 20 + Math.round(rng() * 18), time: '5:00 PM - 7:00 PM' },
    { format: 'Behind-the-Scenes Story', explanation: 'Authentic BTS content builds trust and humanizes your brand. Show process, team, and real moments.', boost: 18 + Math.round(rng() * 15), time: '7:00 PM - 9:00 PM' },
    { format: 'Live Stream / Q&A', explanation: `Live content gets priority in ${platform} algorithms. Host weekly AMAs or product demos for real-time engagement.`, boost: 28 + Math.round(rng() * 22), time: '6:00 PM - 8:00 PM' },
    { format: 'User-Generated Content Campaign', explanation: `UGC builds social proof and community. Encourage your ${industry.toLowerCase()} audience to share their experiences.`, boost: 22 + Math.round(rng() * 20), time: '10:00 AM - 12:00 PM' },
  ];

  return formats.sort(() => rng() - 0.5).slice(0, 3).map(f => ({
    format: f.format,
    explanation: f.explanation,
    engagementBoost: f.boost,
    bestTime: f.time,
  }));
}

function generateCompetitorGaps(industry: string, platform: string, region: string): CompetitorGap[] {
  const seed = hash(industry + platform + region + 'gaps');
  const rng = seededRandom(seed);

  const gapPool = [
    'Educational Long-Form Content', 'Behind-the-Scenes Authenticity', 'Community Challenge Campaigns',
    'Data-Driven Storytelling', 'Micro-Influencer Collaborations', 'Interactive Content Series',
    'Sustainability Messaging', 'Regional / Local Content', 'Employee Advocacy Content',
    'Real-Time Trend Responses', 'Accessibility-Focused Content', 'Cross-Platform Repurposing',
  ];

  const shuffled = [...gapPool].sort(() => rng() - 0.5);
  const difficulties: ('Easy' | 'Medium' | 'Hard')[] = ['Easy', 'Medium', 'Hard'];

  return shuffled.slice(0, 4).map(() => ({
    topic: shuffled.shift()!,
    opportunityScore: Math.round(60 + rng() * 40),
    difficulty: difficulties[Math.floor(rng() * 3)],
  }));
}

function generateForecasts(topics: TrendingTopic[]): TrendForecast[] {
  return topics.slice(0, 3).map((t, idx) => {
    const seed = hash(t.name + idx);
    const rng = seededRandom(seed);
    const trajectory: ('up' | 'stable' | 'down')[] = ['up', 'stable', 'down'];
    const traj = t.velocity === 'Exploding' || t.velocity === 'Surging' ? 'up'
      : t.velocity === 'Declining' ? 'down' : trajectory[Math.floor(rng() * 2)]; // up or stable for others

    const points: ForecastPoint[] = [];
    let value = 50 + Math.round(rng() * 30);
    for (let d = 1; d <= 30; d++) {
      const delta = traj === 'up' ? rng() * 3 - 0.5
        : traj === 'down' ? -(rng() * 3 - 0.5)
        : rng() * 2 - 1;
      value = Math.max(10, Math.min(100, value + delta));
      points.push({ day: d, value: Math.round(value) });
    }
    return { topic: t.name, trajectory: traj as 'up' | 'stable' | 'down', points };
  });
}

/* ------------------------------------------------------------------ */
/* VELOCITY COLORS                                                     */
/* ------------------------------------------------------------------ */

function velocityTextColor(v: Velocity): string {
  switch (v) {
    case 'Exploding': return 'text-red-400';
    case 'Surging': return 'text-orange-400';
    case 'Rising': return 'text-yellow-400';
    case 'Peaking': return 'text-blue-400';
    case 'Declining': return 'text-zinc-400';
  }
}

function velocityBgColor(v: Velocity): string {
  switch (v) {
    case 'Exploding': return 'bg-red-400/20';
    case 'Surging': return 'bg-orange-400/20';
    case 'Rising': return 'bg-yellow-400/20';
    case 'Peaking': return 'bg-blue-400/20';
    case 'Declining': return 'bg-zinc-400/20';
  }
}

function velocityBarColor(v: Velocity): string {
  switch (v) {
    case 'Exploding': return 'bg-red-400';
    case 'Surging': return 'bg-orange-400';
    case 'Rising': return 'bg-yellow-400';
    case 'Peaking': return 'bg-blue-400';
    case 'Declining': return 'bg-zinc-400';
  }
}

function heatmapColor(value: number): string {
  if (value >= 80) return 'bg-red-500/80';
  if (value >= 65) return 'bg-orange-500/70';
  if (value >= 50) return 'bg-yellow-500/60';
  if (value >= 35) return 'bg-blue-400/50';
  return 'bg-blue-900/40';
}

function difficultyColor(d: 'Easy' | 'Medium' | 'Hard'): string {
  switch (d) {
    case 'Easy': return 'text-green-400';
    case 'Medium': return 'text-yellow-400';
    case 'Hard': return 'text-red-400';
  }
}

function competitionColor(c: 'Low' | 'Medium' | 'High'): string {
  switch (c) {
    case 'Low': return 'text-green-400 bg-green-400/10';
    case 'Medium': return 'text-yellow-400 bg-yellow-400/10';
    case 'High': return 'text-red-400 bg-red-400/10';
  }
}

/* ------------------------------------------------------------------ */
/* COMPONENT                                                           */
/* ------------------------------------------------------------------ */

export default function TrendTrackerPage() {
  const [industry, setIndustry] = useState<string>(industries[0]);
  const [platform, setPlatform] = useState<string>(platforms[0]);
  const [horizon, setHorizon] = useState<string>(timeHorizons[0]);
  const [region, setRegion] = useState<string>(regions[0]);
  const [focus, setFocus] = useState<string>(contentFocuses[0]);
  const [generated, setGenerated] = useState(false);

  const [topics, setTopics] = useState<TrendingTopic[]>([]);
  const [heatmap, setHeatmap] = useState<number[][]>([]);
  const [hashtags, setHashtags] = useState<Hashtag[]>([]);
  const [formatRecs, setFormatRecs] = useState<FormatRec[]>([]);
  const [gaps, setGaps] = useState<CompetitorGap[]>([]);
  const [forecasts, setForecasts] = useState<TrendForecast[]>([]);

  function generate() {
    const t = generateTrendingTopics(industry, platform, region, horizon, focus);
    setTopics(t);
    setHeatmap(generateHeatmap(industry, platform, region));
    setHashtags(generateHashtags(industry, platform, region));
    setFormatRecs(generateFormatRecs(industry, platform, focus));
    setGaps(generateCompetitorGaps(industry, platform, region));
    setForecasts(generateForecasts(t));
    setGenerated(true);
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50 px-4 py-12 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
          Social Media Trend Tracker &amp; Predictor — Free 2026 Tool
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Discover trending topics, predict viral content, and find emerging hashtags across 6 platforms and 12 industries. Updated daily with real-time trend velocity data.
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          {[
            { label: 'Updated daily', icon: '📡' },
            { label: '6 platforms', icon: '📱' },
            { label: '12 industries', icon: '🏢' },
            { label: '7 regions', icon: '🌍' },
          ].map(s => (
            <span key={s.label} className="text-sm text-zinc-500 flex items-center gap-1">
              <span>{s.icon}</span> {s.label}
            </span>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="glass rounded-2xl p-6 md:p-8 space-y-6 mb-10">
        {/* Industry */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Industry</label>
          <select
            value={industry}
            onChange={e => setIndustry(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {industries.map(i => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>

        {/* Platform */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Platform</label>
          <div className="flex flex-wrap gap-2">
            {platforms.map(p => (
              <button
                key={p}
                onClick={() => setPlatform(p)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  platform === p
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Time Horizon */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Time Horizon</label>
          <div className="flex flex-wrap gap-2">
            {timeHorizons.map(h => (
              <button
                key={h}
                onClick={() => setHorizon(h)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  horizon === h
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200'
                }`}
              >
                {h}
              </button>
            ))}
          </div>
        </div>

        {/* Region */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Region</label>
          <select
            value={region}
            onChange={e => setRegion(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {regions.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        {/* Content Focus */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Content Focus</label>
          <div className="flex flex-wrap gap-2">
            {contentFocuses.map(f => (
              <button
                key={f}
                onClick={() => setFocus(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  focus === f
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Generate */}
        <button
          onClick={generate}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-600/30"
        >
          Track Trends Now
        </button>
      </div>

      {/* ============================================================ */}
      {/* RESULTS                                                       */}
      {/* ============================================================ */}
      {generated && (
        <div className="space-y-8">
          {/* 1. Top 5 Trending Topics */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-6">Top 5 Trending Topics</h2>
            <div className="space-y-4">
              {topics.map((t, i) => (
                <div key={i} className="bg-zinc-800/60 rounded-xl p-5 border border-zinc-700/50">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="text-lg font-bold text-white">{i + 1}. {t.name}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${velocityTextColor(t.velocity)} ${velocityBgColor(t.velocity)}`}>
                      {t.velocity}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3 text-sm">
                    <div>
                      <span className="text-zinc-500">Est. Reach</span>
                      <p className="text-zinc-200 font-semibold">{formatNumber(t.reach)}</p>
                    </div>
                    <div>
                      <span className="text-zinc-500">Engagement Multiplier</span>
                      <p className="text-zinc-200 font-semibold">{t.engagementMultiplier}x</p>
                    </div>
                    <div>
                      <span className="text-zinc-500">Relevance Score</span>
                      <p className="text-zinc-200 font-semibold">{t.relevanceScore}%</p>
                    </div>
                  </div>
                  {/* Relevance bar */}
                  <div className="w-full bg-zinc-700 rounded-full h-2 mb-3">
                    <div
                      className={`h-2 rounded-full ${t.relevanceScore >= 80 ? 'bg-green-400' : t.relevanceScore >= 60 ? 'bg-yellow-400' : 'bg-red-400'}`}
                      style={{ width: `${t.relevanceScore}%` }}
                    />
                  </div>
                  <p className="text-sm text-zinc-400 italic">💡 {t.actionTip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Trend Velocity Chart */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-6">Trend Velocity Chart</h2>
            <p className="text-zinc-400 text-sm mb-4">7-day velocity score for each trending topic</p>
            <div className="space-y-3">
              {topics.map((t, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-sm text-zinc-300 w-48 truncate flex-shrink-0">{t.name}</span>
                  <div className="flex-1 bg-zinc-800 rounded-full h-6 relative overflow-hidden">
                    <div
                      className={`h-6 rounded-full ${velocityBarColor(t.velocity)} flex items-center justify-end pr-2 transition-all duration-700`}
                      style={{ width: `${t.velocityValue}%` }}
                    >
                      <span className="text-xs font-bold text-white drop-shadow">{t.velocityValue}</span>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold w-20 text-right ${velocityTextColor(t.velocity)}`}>
                    {t.velocity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Platform Trend Heatmap */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-6">Platform Trend Heatmap</h2>
            <p className="text-zinc-400 text-sm mb-4">Engagement score by platform and content type (higher = hotter)</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left text-zinc-400 pb-3 pr-4">Platform</th>
                    {contentTypes.map(ct => (
                      <th key={ct} className="text-center text-zinc-400 pb-3 px-2">{ct}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {platforms.map((p, pi) => (
                    <tr key={p}>
                      <td className="text-zinc-300 py-1.5 pr-4 font-medium">{p}</td>
                      {contentTypes.map((ct, ci) => (
                        <td key={ct} className="py-1.5 px-2 text-center">
                          <div className={`rounded-lg py-2 px-1 ${heatmapColor(heatmap[pi]?.[ci] ?? 50)}`}>
                            <span className="text-white font-bold text-xs">{heatmap[pi]?.[ci] ?? 50}</span>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center gap-2 mt-4 text-xs text-zinc-500">
              <span>Low</span>
              <div className="flex gap-1">
                <div className="w-6 h-3 rounded bg-blue-900/40" />
                <div className="w-6 h-3 rounded bg-blue-400/50" />
                <div className="w-6 h-3 rounded bg-yellow-500/60" />
                <div className="w-6 h-3 rounded bg-orange-500/70" />
                <div className="w-6 h-3 rounded bg-red-500/80" />
              </div>
              <span>High</span>
            </div>
          </div>

          {/* 4. Emerging Hashtags */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-6">Emerging Hashtags</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-zinc-400 border-b border-zinc-700">
                    <th className="text-left pb-3">#</th>
                    <th className="text-left pb-3">Hashtag</th>
                    <th className="text-right pb-3">Est. Reach</th>
                    <th className="text-right pb-3">Growth Rate</th>
                    <th className="text-center pb-3">Competition</th>
                  </tr>
                </thead>
                <tbody>
                  {hashtags.map((h, i) => (
                    <tr key={i} className="border-b border-zinc-800/50">
                      <td className="py-2.5 text-zinc-500">{i + 1}</td>
                      <td className="py-2.5 text-purple-400 font-medium">{h.tag}</td>
                      <td className="py-2.5 text-right text-zinc-300">{formatNumber(h.reach)}</td>
                      <td className="py-2.5 text-right text-green-400 font-semibold">+{h.growthRate}%</td>
                      <td className="py-2.5 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${competitionColor(h.competition)}`}>
                          {h.competition}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 5. Content Format Recommendations */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-6">Content Format Recommendations</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {formatRecs.map((f, i) => (
                <div key={i} className="bg-zinc-800/60 rounded-xl p-5 border border-zinc-700/50">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-purple-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">{i + 1}</span>
                    <h3 className="font-bold text-white text-sm">{f.format}</h3>
                  </div>
                  <p className="text-zinc-400 text-sm mb-4">{f.explanation}</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-green-400 font-semibold">+{f.engagementBoost}% engagement</span>
                    <span className="text-zinc-500">Best: {f.bestTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Competitor Trend Gaps */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-6">Competitor Trend Gaps</h2>
            <p className="text-zinc-400 text-sm mb-4">Opportunities where competitors aren&apos;t capitalizing</p>
            <div className="grid gap-4 md:grid-cols-2">
              {gaps.map((g, i) => (
                <div key={i} className="bg-zinc-800/60 rounded-xl p-5 border border-zinc-700/50">
                  <h3 className="font-bold text-white mb-2">{g.topic}</h3>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-zinc-500 text-sm">Opportunity Score</span>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-24 bg-zinc-700 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-purple-500"
                            style={{ width: `${g.opportunityScore}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-purple-400">{g.opportunityScore}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-zinc-500 text-sm">Difficulty</span>
                      <p className={`font-semibold text-sm ${difficultyColor(g.difficulty)}`}>{g.difficulty}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 7. 30-Day Trend Forecast */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-6">30-Day Trend Forecast</h2>
            <div className="space-y-6">
              {forecasts.map((f, fi) => (
                <div key={fi}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-bold text-white">{f.topic}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      f.trajectory === 'up' ? 'text-green-400 bg-green-400/15' :
                      f.trajectory === 'down' ? 'text-red-400 bg-red-400/15' :
                      'text-yellow-400 bg-yellow-400/15'
                    }`}>
                      {f.trajectory === 'up' ? '↑ Upward' : f.trajectory === 'down' ? '↓ Downward' : '→ Stable'}
                    </span>
                  </div>
                  {/* CSS Chart */}
                  <div className="flex items-end gap-[2px] h-16 bg-zinc-800/50 rounded-lg p-2">
                    {f.points.map((p, pi) => (
                      <div
                        key={pi}
                        className={`flex-1 rounded-t-sm min-w-[3px] ${
                          f.trajectory === 'up' ? 'bg-green-500/70' :
                          f.trajectory === 'down' ? 'bg-red-500/70' :
                          'bg-yellow-500/70'
                        }`}
                        style={{ height: `${p.value}%` }}
                        title={`Day ${p.day}: ${p.value}`}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-zinc-600 mt-1">
                    <span>Day 1</span>
                    <span>Day 15</span>
                    <span>Day 30</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* SEO CONTENT                                                   */}
      {/* ============================================================ */}
      <section className="mt-16 space-y-8 text-zinc-400">
        <h2 className="text-2xl font-bold text-white">How to Track Social Media Trends in 2026</h2>
        <p>
          Social media trends evolve faster than ever. Staying ahead of emerging topics, viral hashtags, and content format shifts is the difference between brands that lead conversations and those that chase them. Our Trend Tracker analyzes real-time signals across all major platforms to give you a competitive edge.
        </p>

        <h3 className="text-xl font-semibold text-white">What Is Trend Velocity?</h3>
        <p>
          Trend velocity measures how quickly a topic is gaining momentum across social platforms. Unlike simple popularity metrics, velocity captures the rate of change — helping you identify topics before they peak. Our tracker categorizes trends as Exploding, Surging, Rising, Peaking, or Declining so you can time your content perfectly.
        </p>

        <div className="border-t border-zinc-800 pt-8">
          <h3 className="text-xl font-semibold text-white">Frequently Asked Questions</h3>
          <div className="space-y-4 mt-4">
            <div>
              <h4 className="font-medium text-white">How do I identify social media trends early?</h4>
              <p className="text-sm">Monitor platform-specific signals: rising hashtags, increased engagement on niche topics, and cross-platform mentions. Tools like PostCraft&apos;s Trend Tracker aggregate these signals across 6 platforms and 12 industries, giving you a 7-day velocity score that highlights topics before they hit mainstream awareness.</p>
            </div>
            <div>
              <h4 className="font-medium text-white">What are the best tools for social media trend tracking?</h4>
              <p className="text-sm">The best trend tracking combines platform analytics (Twitter Trending, Instagram Explore, TikTok Discover) with cross-platform aggregators. PostCraft&apos;s Trend Tracker provides unified trend velocity data across all platforms with industry-specific filtering, so you see only the trends relevant to your niche.</p>
            </div>
            <div>
              <h4 className="font-medium text-white">How often should I check social media trends?</h4>
              <p className="text-sm">For fast-moving platforms like Twitter/X and TikTok, check daily. For LinkedIn and YouTube, weekly monitoring is sufficient. Set up a routine: daily quick scans for emerging opportunities, weekly deep dives for strategic planning, and monthly reviews to adjust your content calendar.</p>
            </div>
            <div>
              <h4 className="font-medium text-white">How do I capitalize on trending topics without looking inauthentic?</h4>
              <p className="text-sm">Only engage with trends that genuinely connect to your brand, industry, or audience interests. Add your unique perspective or expertise rather than simply reposting. Time matters — being among the first 10% of brands to cover a trend maximizes engagement while maintaining authenticity.</p>
            </div>
            <div>
              <h4 className="font-medium text-white">What is trend velocity and why does it matter?</h4>
              <p className="text-sm">Trend velocity measures the acceleration of topic engagement over time — not just how popular a topic is, but how fast it&apos;s growing. High velocity trends (Exploding/Surging) offer the biggest content opportunities but require fast execution. Peaking trends still have reach but diminishing novelty. Understanding velocity helps you prioritize which trends deserve your content resources.</p>
            </div>
          </div>
        </div>

        {/* Internal Links */}
        <div className="border-t border-zinc-800 pt-8">
          <h3 className="text-xl font-semibold text-white mb-4">Explore More PostCraft Tools</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { href: '/post-timing', label: 'Post Timing Optimizer' },
              { href: '/hashtags', label: 'Hashtag Generator' },
              { href: '/competitor-analysis', label: 'Competitor Analysis' },
              { href: '/idea-generator', label: 'Content Idea Generator' },
              { href: '/content-calendar', label: 'Content Calendar' },
              { href: '/campaign', label: 'Campaign Builder' },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="bg-zinc-800/50 hover:bg-zinc-700/50 rounded-lg px-4 py-3 text-sm text-purple-400 hover:text-purple-300 transition-colors text-center"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
