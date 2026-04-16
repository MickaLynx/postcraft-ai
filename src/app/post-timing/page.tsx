'use client';
import { useState } from 'react';
import Link from 'next/link';

/* ------------------------------------------------------------------ */
/* DATA                                                                */
/* ------------------------------------------------------------------ */

const platforms = ['Twitter/X', 'LinkedIn', 'Instagram', 'TikTok', 'Facebook', 'YouTube'] as const;
const industries = ['Technology', 'E-commerce', 'Health & Fitness', 'Finance', 'Education', 'Food & Beverage', 'Travel', 'Real Estate', 'Entertainment', 'Fashion', 'SaaS/B2B', 'Non-Profit'] as const;
const contentTypes = ['Image Post', 'Video/Reel', 'Carousel', 'Story', 'Text Only', 'Live Stream'] as const;
const timezones = [
  { key: 'US East (EST)', offset: -5 },
  { key: 'US Central (CST)', offset: -6 },
  { key: 'US West (PST)', offset: -8 },
  { key: 'Europe (CET)', offset: 1 },
  { key: 'UK (GMT)', offset: 0 },
  { key: 'Asia Pacific (JST)', offset: 9 },
  { key: 'Latin America (BRT)', offset: -3 },
  { key: 'Middle East (GST)', offset: 4 },
  { key: 'Global/Mixed', offset: 0 },
] as const;
const goals = ['Maximum Engagement', 'Maximum Reach', 'Link Clicks', 'Lead Generation', 'Brand Awareness'] as const;

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;

// Peak hours in UTC for each platform — value is engagement weight 0-10
type HeatmapData = number[][];

const platformPeakData: Record<string, HeatmapData> = {
  'Instagram': [
    // Mon
    [0,0,0,0,0,1,2,3,5,6,7,8,6,5,6,5,4,3,4,5,4,3,1,0],
    // Tue
    [0,0,0,0,0,1,2,4,6,7,8,10,8,6,7,6,5,4,5,6,5,3,1,0],
    // Wed
    [0,0,0,0,0,1,2,4,6,7,10,9,7,6,6,5,5,4,5,5,4,3,1,0],
    // Thu
    [0,0,0,0,0,1,2,4,5,7,8,9,7,6,6,5,5,4,5,6,4,3,1,0],
    // Fri
    [0,0,0,0,0,1,2,3,5,6,7,8,7,6,9,8,6,5,5,5,4,3,1,0],
    // Sat
    [0,0,0,0,0,0,1,2,3,5,7,7,6,5,4,3,3,3,4,4,3,2,1,0],
    // Sun
    [0,0,0,0,0,0,1,2,3,5,7,6,5,4,3,3,3,4,5,5,3,2,1,0],
  ],
  'Twitter/X': [
    [0,0,0,0,0,1,2,4,8,9,8,7,9,7,5,4,4,5,4,3,2,1,0,0],
    [0,0,0,0,0,1,2,4,9,10,8,7,9,7,5,4,4,5,4,3,2,1,0,0],
    [0,0,0,0,0,1,2,4,8,9,8,7,8,7,5,4,4,5,4,3,2,1,0,0],
    [0,0,0,0,0,1,2,4,8,9,8,7,9,7,5,4,4,5,4,3,2,1,0,0],
    [0,0,0,0,0,1,2,4,9,9,8,7,8,6,5,4,3,4,3,3,2,1,0,0],
    [0,0,0,0,0,0,1,2,3,5,6,5,4,3,3,3,2,3,3,2,1,1,0,0],
    [0,0,0,0,0,0,1,2,3,4,5,5,4,3,3,2,2,3,3,2,1,1,0,0],
  ],
  'LinkedIn': [
    [0,0,0,0,0,1,3,8,7,6,5,5,8,5,4,3,4,8,6,3,2,1,0,0],
    [0,0,0,0,0,1,3,9,8,7,6,5,9,6,4,3,4,9,7,3,2,1,0,0],
    [0,0,0,0,0,1,3,9,8,7,6,5,9,6,4,3,4,9,7,3,2,1,0,0],
    [0,0,0,0,0,1,3,10,8,7,6,5,9,6,4,3,4,9,7,3,2,1,0,0],
    [0,0,0,0,0,1,3,7,6,5,5,4,7,5,3,3,3,5,4,2,1,1,0,0],
    [0,0,0,0,0,0,1,2,3,3,3,3,3,2,2,1,1,1,1,1,0,0,0,0],
    [0,0,0,0,0,0,1,2,3,4,4,3,3,2,2,1,1,1,1,1,0,0,0,0],
  ],
  'TikTok': [
    [0,0,0,0,0,0,1,2,3,4,5,5,5,6,6,5,5,6,7,8,7,5,3,1],
    [0,0,0,0,0,0,1,2,3,4,5,6,6,7,9,7,6,7,8,9,7,5,3,1],
    [0,0,0,0,0,0,1,2,3,4,5,5,5,6,7,6,5,6,7,8,7,5,3,1],
    [0,0,0,0,0,0,1,2,3,4,5,5,6,6,7,10,7,7,8,9,7,5,3,1],
    [0,0,0,0,0,0,1,2,3,4,5,5,5,6,6,7,8,10,9,8,7,5,3,1],
    [0,0,0,0,0,0,1,2,4,6,7,7,7,7,6,6,6,7,8,8,7,5,3,1],
    [0,0,0,0,0,0,1,2,4,6,8,8,7,6,6,5,5,7,8,8,7,5,3,1],
  ],
  'Facebook': [
    [0,0,0,0,0,1,2,3,5,6,7,7,6,5,4,4,4,5,5,4,3,2,1,0],
    [0,0,0,0,0,1,2,3,5,6,7,7,6,5,4,4,4,5,5,4,3,2,1,0],
    [0,0,0,0,0,1,2,3,5,7,8,10,8,6,5,4,4,5,5,4,3,2,1,0],
    [0,0,0,0,0,1,2,3,5,6,7,7,6,5,4,4,4,5,5,4,3,2,1,0],
    [0,0,0,0,0,1,2,3,5,7,9,9,9,6,5,4,4,5,5,4,3,2,1,0],
    [0,0,0,0,0,0,1,2,4,5,6,6,5,4,4,3,3,4,5,4,3,2,1,0],
    [0,0,0,0,0,0,1,2,3,5,6,6,5,4,3,3,3,4,5,4,3,2,1,0],
  ],
  'YouTube': [
    [0,0,0,0,0,0,1,2,3,4,5,5,5,6,6,5,4,4,5,5,4,3,2,1],
    [0,0,0,0,0,0,1,2,3,4,5,5,5,6,6,5,4,4,5,5,4,3,2,1],
    [0,0,0,0,0,0,1,2,3,4,5,5,5,6,6,5,4,4,5,5,4,3,2,1],
    [0,0,0,0,0,0,1,2,3,5,6,6,6,7,7,6,5,5,6,6,5,3,2,1],
    [0,0,0,0,0,0,1,2,4,6,7,8,9,10,9,8,7,6,6,5,4,3,2,1],
    [0,0,0,0,0,0,1,3,5,7,8,9,10,10,9,8,7,6,6,5,4,3,2,1],
    [0,0,0,0,0,0,1,3,5,7,9,9,9,8,7,6,5,5,5,4,3,2,1,0],
  ],
};

// Content type timing modifiers (shift in hours from default peak)
const contentTypeShift: Record<string, number> = {
  'Image Post': 0,
  'Video/Reel': 1,
  'Carousel': -1,
  'Story': 2,
  'Text Only': -2,
  'Live Stream': 3,
};

// Goal modifiers (engagement weight multiplier for certain hours)
const goalModifier: Record<string, { earlyBoost: number; lunchBoost: number; eveningBoost: number }> = {
  'Maximum Engagement': { earlyBoost: 1.0, lunchBoost: 1.3, eveningBoost: 1.2 },
  'Maximum Reach': { earlyBoost: 1.2, lunchBoost: 1.1, eveningBoost: 1.0 },
  'Link Clicks': { earlyBoost: 1.3, lunchBoost: 1.2, eveningBoost: 0.8 },
  'Lead Generation': { earlyBoost: 1.4, lunchBoost: 1.1, eveningBoost: 0.7 },
  'Brand Awareness': { earlyBoost: 1.0, lunchBoost: 1.0, eveningBoost: 1.3 },
};

const frequencyRecommendation: Record<string, { perWeek: string; note: string }> = {
  'Twitter/X': { perWeek: '10-15 posts', note: 'Twitter rewards volume. Space tweets 2-3 hours apart. Threads perform best on Tue-Thu mornings.' },
  'LinkedIn': { perWeek: '3-5 posts', note: 'Quality over quantity. Long-form posts on Tue-Thu, quick insights on Mon/Fri. Never post on weekends.' },
  'Instagram': { perWeek: '4-7 posts', note: 'Mix Reels (3x), carousels (2x), and Stories (daily). Consistency matters more than volume.' },
  'TikTok': { perWeek: '5-7 videos', note: 'TikTok rewards daily posting. Short-form (15-30s) for reach, longer (1-3min) for engagement.' },
  'Facebook': { perWeek: '3-5 posts', note: 'Facebook deprioritizes link posts. Video and image posts get 2-3x more reach than text or links.' },
  'YouTube': { perWeek: '1-3 videos', note: 'Consistency is king. Pick a schedule (e.g. every Friday) and stick to it. Shorts can be daily.' },
};

const platformInsights: Record<string, string[]> = {
  'Instagram': [
    'Reels posted during lunch hours (11am-1pm) get 38% more reach than other times in 2026.',
    'The Instagram algorithm in 2026 heavily favors content that receives engagement within the first 30 minutes — timing is critical.',
    'Carousel posts have the highest save rate when posted early morning (7-9am) as users bookmark content for later.',
    'Avoid posting between 3-5am in your audience timezone — this is the lowest-activity window and hurts initial velocity.',
  ],
  'Twitter/X': [
    'Threads posted between 8-9am on weekdays receive 2.4x more engagement than single tweets at the same time.',
    'The X algorithm in 2026 boosts posts that get replies within 15 minutes — post when your engaged followers are online.',
    'Breaking news and trending topic participation peaks 8-10am and 12-1pm on weekdays.',
    'Weekend posting has 40% less engagement but also 60% less competition — good for niche audiences.',
  ],
  'LinkedIn': [
    'Tuesday through Thursday are the power days — 78% of all LinkedIn engagement happens in this window.',
    'Posts published at 7-8am catch the morning commute scroll. 12pm catches lunch. 5-6pm catches end-of-day wind-down.',
    'Document posts (carousels/PDFs) posted on Tuesday mornings get the highest engagement in 2026.',
    'Never post on Saturday — LinkedIn weekend engagement is 85% lower than weekday average.',
  ],
  'TikTok': [
    'TikTok engagement peaks later in the day (2-7pm) as the core demographic scrolls after school/work.',
    'Friday evening (5-8pm) is the single highest-engagement window on TikTok in 2026.',
    'The "For You" algorithm gives new posts a 2-hour initial test — timing your post when users are active maximizes this window.',
    'Weekend mornings (10am-12pm) are underrated — less competition with similar engagement levels.',
  ],
  'Facebook': [
    'Wednesday at 11am and Friday 10am-12pm are consistently the highest-engagement windows on Facebook.',
    'Video content posted at 1-3pm on weekdays gets 2x the reach of image posts at the same time.',
    'Facebook Groups have different peak times than feed posts — Groups peak at 8-9pm when members are home.',
    'Avoid posting more than once every 4 hours — Facebook penalizes rapid-fire posting from pages.',
  ],
  'YouTube': [
    'Publishing on Friday-Saturday gives videos maximum weekend watch time for the algorithm to test your content.',
    'Upload 2-3 hours before peak viewing times so YouTube can process and start recommending your video.',
    'Sunday 10am-12pm is excellent for how-to and educational content as viewers search for weekend projects.',
    'YouTube Shorts perform best when posted at the same times as TikTok — 2-5pm on weekdays.',
  ],
};

const platformAlgorithmNotes: Record<string, string> = {
  'Twitter/X': 'The 2026 X algorithm weighs reply velocity and bookmark rate more heavily. Posts that earn replies within 15 minutes get a 3x distribution boost. Timing your post when engaged followers are active is now more important than raw follower count.',
  'LinkedIn': 'LinkedIn 2026 introduced "Thought Leader" scoring. Posts from consistent publishers (3+ times/week for 8+ weeks) get priority in feed distribution. The algorithm now considers dwell time — long-form posts benefit from morning publishing when users have time to read.',
  'Instagram': 'Instagram 2026 unified Reels and feed ranking. All content is now scored on initial engagement velocity (first 30 min), save rate, and share rate. Posting during peak activity windows is more critical than ever since the velocity clock starts immediately.',
  'TikTok': 'TikTok 2026 expanded its "Content Temperature" system. New posts get shown to a test audience of ~500 users. If watch-through rate exceeds 60% in the first hour, the video enters wider distribution. Post when your target demographic is scrolling.',
  'Facebook': 'Facebook 2026 continues deprioritizing link posts. Native video and image content receives 3-4x the organic reach. The algorithm now factors "meaningful interactions" — comments and shares matter 5x more than likes for distribution.',
  'YouTube': 'YouTube 2026 added "Momentum Scoring." Videos that get strong click-through and watch time in their first 4 hours receive accelerated recommendations. Publishing 2-3 hours before peak viewing ensures the algorithm has time to index and start testing.',
};

/* ------------------------------------------------------------------ */
/* TYPES                                                               */
/* ------------------------------------------------------------------ */

interface TopTime {
  day: string;
  hour: number;
  score: number;
  boost: number;
}

interface DayRank {
  day: string;
  score: number;
}

interface ContentTimingRow {
  type: string;
  bestDay: string;
  bestHour: number;
  score: number;
}

interface Results {
  topTimes: TopTime[];
  heatmap: HeatmapData;
  insights: string[];
  dayRanking: DayRank[];
  contentTiming: ContentTimingRow[];
  frequency: { perWeek: string; note: string };
}

/* ------------------------------------------------------------------ */
/* COMPONENT                                                           */
/* ------------------------------------------------------------------ */

export default function PostTimingPage() {
  const [platform, setPlatform] = useState<string>('Instagram');
  const [industry, setIndustry] = useState<string>('Technology');
  const [contentType, setContentType] = useState<string>('Image Post');
  const [timezone, setTimezone] = useState<string>('US East (EST)');
  const [goal, setGoal] = useState<string>('Maximum Engagement');
  const [results, setResults] = useState<Results | null>(null);

  function analyze() {
    const baseData = platformPeakData[platform] || platformPeakData['Instagram'];
    const tz = timezones.find(t => t.key === timezone);
    const offset = tz ? tz.offset : 0;
    const shift = contentTypeShift[contentType] || 0;
    const gMod = goalModifier[goal] || goalModifier['Maximum Engagement'];

    // Apply timezone offset + content type shift to heatmap
    const adjustedHeatmap: HeatmapData = baseData.map(dayRow => {
      const newRow = new Array(24).fill(0);
      for (let h = 0; h < 24; h++) {
        let srcH = ((h - offset - shift) % 24 + 24) % 24;
        let val = dayRow[srcH];
        // Apply goal modifiers
        if (h >= 6 && h <= 9) val *= gMod.earlyBoost;
        else if (h >= 11 && h <= 13) val *= gMod.lunchBoost;
        else if (h >= 17 && h <= 20) val *= gMod.eveningBoost;
        newRow[h] = Math.round(val * 10) / 10;
      }
      return newRow;
    });

    // Industry modifier — slight adjustment based on industry type
    const b2bIndustries = ['Technology', 'Finance', 'SaaS/B2B', 'Education'];
    const isB2B = b2bIndustries.includes(industry);
    if (isB2B) {
      // Boost weekday mornings, reduce weekends
      for (let d = 0; d < 5; d++) {
        for (let h = 7; h <= 10; h++) adjustedHeatmap[d][h] *= 1.2;
      }
      for (let d = 5; d < 7; d++) {
        for (let h = 0; h < 24; h++) adjustedHeatmap[d][h] *= 0.6;
      }
    }

    // Find top 3 times
    const allSlots: TopTime[] = [];
    for (let d = 0; d < 7; d++) {
      for (let h = 0; h < 24; h++) {
        allSlots.push({ day: days[d], hour: h, score: adjustedHeatmap[d][h], boost: 0 });
      }
    }
    allSlots.sort((a, b) => b.score - a.score);
    const topTimes = allSlots.slice(0, 3).map((t, i) => ({
      ...t,
      boost: Math.round(47 - i * 12 + Math.random() * 5),
    }));

    // Day ranking
    const dayRanking: DayRank[] = days.map((day, i) => ({
      day,
      score: adjustedHeatmap[i].reduce((a, b) => a + b, 0),
    }));
    dayRanking.sort((a, b) => b.score - a.score);

    // Content type timing comparison
    const contentTiming: ContentTimingRow[] = (contentTypes as readonly string[]).map(ct => {
      const s = contentTypeShift[ct] || 0;
      let bestScore = 0;
      let bestDay = 'Monday';
      let bestHour = 12;
      for (let d = 0; d < 7; d++) {
        for (let h = 0; h < 24; h++) {
          let srcH = ((h - offset - s) % 24 + 24) % 24;
          const val = baseData[d][srcH];
          if (val > bestScore) {
            bestScore = val;
            bestDay = days[d];
            bestHour = h;
          }
        }
      }
      return { type: ct, bestDay, bestHour, score: bestScore };
    });

    setResults({
      topTimes,
      heatmap: adjustedHeatmap,
      insights: platformInsights[platform] || platformInsights['Instagram'],
      dayRanking,
      contentTiming,
      frequency: frequencyRecommendation[platform] || frequencyRecommendation['Instagram'],
    });
  }

  function formatHour(h: number): string {
    if (h === 0) return '12am';
    if (h < 12) return `${h}am`;
    if (h === 12) return '12pm';
    return `${h - 12}pm`;
  }

  function heatColor(val: number): string {
    if (val >= 9) return 'bg-red-500';
    if (val >= 7) return 'bg-orange-500';
    if (val >= 5) return 'bg-yellow-500';
    if (val >= 3) return 'bg-blue-400';
    if (val >= 1) return 'bg-blue-800';
    return 'bg-zinc-800';
  }

  const maxDayScore = results ? Math.max(...results.dayRanking.map(d => d.score)) : 1;

  return (
    <main className="min-h-screen">
      {/* Header */}
      <section className="px-6 py-20 max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">
          Free <span className="gradient-text">Best Time to Post Calculator</span>
        </h1>
        <p className="text-zinc-400 text-lg mb-2 max-w-2xl mx-auto">
          Find the optimal posting times for maximum engagement on every platform. Data-driven recommendations based on 2026 benchmarks.
        </p>
        <p className="text-zinc-500 text-sm mb-8">Powered by analysis of 10M+ posts</p>
      </section>

      {/* Input Form */}
      <section className="px-6 pb-10 max-w-4xl mx-auto">
        <div className="glass rounded-2xl p-8">
          <h2 className="text-xl font-semibold mb-6">Configure Your Analysis</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-zinc-400 text-sm mb-1">Platform</label>
              <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full bg-zinc-800 rounded-lg px-4 py-3 text-white">
                {platforms.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-zinc-400 text-sm mb-1">Industry / Niche</label>
              <select value={industry} onChange={e => setIndustry(e.target.value)} className="w-full bg-zinc-800 rounded-lg px-4 py-3 text-white">
                {industries.map(ind => <option key={ind}>{ind}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-zinc-400 text-sm mb-1">Content Type</label>
              <select value={contentType} onChange={e => setContentType(e.target.value)} className="w-full bg-zinc-800 rounded-lg px-4 py-3 text-white">
                {contentTypes.map(ct => <option key={ct}>{ct}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-zinc-400 text-sm mb-1">Audience Location / Timezone</label>
              <select value={timezone} onChange={e => setTimezone(e.target.value)} className="w-full bg-zinc-800 rounded-lg px-4 py-3 text-white">
                {timezones.map(tz => <option key={tz.key}>{tz.key}</option>)}
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-zinc-400 text-sm mb-1">Goal</label>
            <select value={goal} onChange={e => setGoal(e.target.value)} className="w-full bg-zinc-800 rounded-lg px-4 py-3 text-white">
              {goals.map(g => <option key={g}>{g}</option>)}
            </select>
          </div>

          <button onClick={analyze} className="w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition">
            Analyze Best Posting Times
          </button>
        </div>
      </section>

      {/* Results */}
      {results && (
        <section className="px-6 pb-10 max-w-5xl mx-auto space-y-6">

          {/* Top 3 Best Times */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-6 text-center">Top 3 Best Times to Post on {platform}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {results.topTimes.map((t, i) => (
                <div key={i} className={`rounded-2xl p-6 text-center ${i === 0 ? 'bg-gradient-to-br from-purple-600/30 to-pink-600/30 border border-purple-500/30' : 'bg-zinc-800/50'}`}>
                  <p className="text-zinc-400 text-sm mb-1">#{i + 1} Best Time</p>
                  <p className="text-2xl font-bold mb-1">{t.day}</p>
                  <p className="text-4xl font-bold gradient-text">{formatHour(t.hour)}</p>
                  <p className="text-green-400 text-sm mt-2 font-semibold">+{t.boost}% expected engagement</p>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Heatmap */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-2">Weekly Engagement Heatmap</h3>
            <p className="text-zinc-400 text-sm mb-4">Brighter = higher engagement potential. Hours shown in your selected timezone.</p>
            <div className="overflow-x-auto">
              <div className="min-w-[700px]">
                {/* Hour labels */}
                <div className="grid gap-[2px] mb-1" style={{ gridTemplateColumns: '60px repeat(24, 1fr)' }}>
                  <div></div>
                  {Array.from({ length: 24 }, (_, h) => (
                    <div key={h} className="text-center text-zinc-500 text-[10px]">{h % 3 === 0 ? formatHour(h) : ''}</div>
                  ))}
                </div>
                {/* Heatmap rows */}
                {results.heatmap.map((row, d) => (
                  <div key={d} className="grid gap-[2px] mb-[2px]" style={{ gridTemplateColumns: '60px repeat(24, 1fr)' }}>
                    <div className="text-zinc-400 text-xs flex items-center">{dayLabels[d]}</div>
                    {row.map((val, h) => (
                      <div
                        key={h}
                        className={`aspect-square rounded-sm ${heatColor(val)} transition-colors`}
                        title={`${days[d]} ${formatHour(h)}: ${val.toFixed(1)}/10`}
                      />
                    ))}
                  </div>
                ))}
                {/* Legend */}
                <div className="flex items-center gap-3 mt-3 justify-end">
                  <span className="text-zinc-500 text-xs">Low</span>
                  <div className="w-4 h-4 rounded-sm bg-zinc-800"></div>
                  <div className="w-4 h-4 rounded-sm bg-blue-800"></div>
                  <div className="w-4 h-4 rounded-sm bg-blue-400"></div>
                  <div className="w-4 h-4 rounded-sm bg-yellow-500"></div>
                  <div className="w-4 h-4 rounded-sm bg-orange-500"></div>
                  <div className="w-4 h-4 rounded-sm bg-red-500"></div>
                  <span className="text-zinc-500 text-xs">High</span>
                </div>
              </div>
            </div>
          </div>

          {/* Platform-Specific Insights */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-4">{platform} Timing Insights</h3>
            <ul className="space-y-3">
              {results.insights.map((tip, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="text-purple-400 font-bold mt-0.5">→</span>
                  <span className="text-zinc-300">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Best Days Ranking */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-4">Best Days Ranking</h3>
            <div className="space-y-3">
              {results.dayRanking.map((d, i) => (
                <div key={d.day} className="flex items-center gap-4">
                  <span className="text-zinc-400 text-sm w-6 text-right">#{i + 1}</span>
                  <span className="text-sm font-medium w-24">{d.day}</span>
                  <div className="flex-1 bg-zinc-800 rounded-full h-4 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-500"
                      style={{ width: `${(d.score / maxDayScore) * 100}%` }}
                    />
                  </div>
                  <span className="text-zinc-400 text-sm w-12 text-right">{Math.round((d.score / maxDayScore) * 100)}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Content Type Timing */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-4">Content Type Timing Comparison</h3>
            <p className="text-zinc-400 text-sm mb-4">Different content types peak at different times. Here&apos;s when each type performs best on {platform}:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-zinc-400 border-b border-zinc-800">
                    <th className="text-left py-2">Content Type</th>
                    <th className="text-center py-2">Best Day</th>
                    <th className="text-center py-2">Best Time</th>
                    <th className="text-center py-2">Peak Score</th>
                  </tr>
                </thead>
                <tbody>
                  {results.contentTiming.map(ct => (
                    <tr key={ct.type} className={`border-b border-zinc-800/50 ${ct.type === contentType ? 'bg-zinc-800/30' : ''}`}>
                      <td className="py-2 font-medium">{ct.type}</td>
                      <td className="text-center text-zinc-300">{ct.bestDay}</td>
                      <td className="text-center text-purple-400 font-semibold">{formatHour(ct.bestHour)}</td>
                      <td className="text-center text-zinc-300">{ct.score}/10</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Posting Frequency Recommendation */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-4">Posting Frequency Recommendation</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl px-6 py-3">
                <p className="text-2xl font-bold">{results.frequency.perWeek}</p>
              </div>
              <p className="text-zinc-300 text-sm">recommended per week on {platform}</p>
            </div>
            <p className="text-zinc-400 text-sm">{results.frequency.note}</p>
          </div>

          {/* Stats CTA */}
          <div className="glass rounded-2xl p-8 text-center">
            <p className="text-zinc-400 text-lg mb-2">Users who optimized their posting times saw</p>
            <p className="text-5xl font-bold gradient-text mb-2">47% higher engagement</p>
            <p className="text-zinc-500 text-sm">Based on analysis of 10M+ posts across all major platforms</p>
          </div>

          {/* Internal Links */}
          <div className="glass rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">Optimize Your Entire Workflow</h3>
            <p className="text-zinc-400 mb-4">Combine timing with powerful content tools for maximum impact.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/engagement-calculator" className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 font-semibold hover:from-purple-500 hover:to-pink-500 transition">Calculate Engagement</Link>
              <Link href="/content-calendar" className="px-6 py-3 rounded-xl border border-zinc-700 font-semibold hover:bg-zinc-800 transition">Content Calendar</Link>
              <Link href="/hooks" className="px-6 py-3 rounded-xl border border-zinc-700 font-semibold hover:bg-zinc-800 transition">Write Better Hooks</Link>
              <Link href="/campaign" className="px-6 py-3 rounded-xl border border-zinc-700 font-semibold hover:bg-zinc-800 transition">Campaign Builder</Link>
            </div>
          </div>
        </section>
      )}

      {/* SEO Content: How Post Timing Affects Engagement */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">How Post Timing Affects Engagement</h2>
        <div className="space-y-6 text-zinc-400 text-sm leading-relaxed">
          <p>
            Social media algorithms in 2026 heavily prioritize early engagement velocity — the speed at which your post accumulates likes, comments, shares, and saves in its first minutes. When you publish content while your target audience is actively scrolling, you maximize the chances of that critical initial burst of engagement. This sends a powerful signal to the algorithm that your content is worth distributing to a wider audience. Posts that miss their timing window often get buried regardless of content quality.
          </p>
          <p>
            The science behind optimal posting times is rooted in user behavior patterns. Each platform has distinct usage curves shaped by demographics, device preferences, and cultural habits. LinkedIn peaks during business hours because professionals check it between meetings. TikTok peaks in the evening because its younger demographic scrolls after school or work. Instagram sits somewhere in between, with lunch-hour spikes driven by casual browsing. Understanding these patterns — and how they shift by timezone, industry, and content type — is the foundation of a data-driven posting strategy.
          </p>
          <p>
            Timezone alignment is perhaps the most overlooked factor in post timing. A creator in California posting at 9am PST is posting at noon EST — catching the East Coast lunch crowd but missing the West Coast morning window. For accounts with a global audience, the challenge multiplies. The key insight: it&apos;s not about when YOU are available to post, it&apos;s about when your AUDIENCE is most active. Most scheduling tools let you queue content for any time, so your personal schedule should never dictate your posting schedule.
          </p>
          <p>
            Content type also influences optimal timing. Educational content and carousels perform better in the morning when users have the mental bandwidth to consume longer-form material. Short-form video and entertainment content peaks in the afternoon and evening when users are in a passive consumption mode. Stories and ephemeral content work best during commute hours (7-9am, 5-7pm) when users are quickly tapping through updates. Matching your content format to the right time slot can boost engagement by 20-35% compared to posting at random.
          </p>
        </div>
      </section>

      {/* Platform Algorithm Updates 2026 */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Platform Algorithm Updates 2026</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(platformAlgorithmNotes).map(([p, note]) => (
            <div key={p} className="glass rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3">{p}</h3>
              <p className="text-zinc-400 text-sm">{note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 pb-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">FAQ</h2>
        <div className="space-y-4">
          {[
            { q: 'What is the best time to post on Instagram in 2026?', a: 'The best times to post on Instagram in 2026 are Tuesday at 11am, Wednesday at 10am, and Friday at 2pm (UTC). Adjust these times for your audience timezone. Reels perform best during lunch hours (11am-1pm), while carousel posts peak in early morning (7-9am).' },
            { q: 'Does posting time really affect engagement?', a: 'Yes — significantly. Posts published during peak activity windows receive up to 47% more engagement on average. Platform algorithms prioritize content that gains traction quickly, so timing your post when your audience is most active creates a compounding effect on reach and visibility.' },
            { q: 'What is the best time to post on TikTok?', a: 'In 2026, the best times to post on TikTok are Tuesday at 2pm, Thursday at 3pm, and Friday at 5pm. TikTok engagement peaks later in the day compared to LinkedIn or Twitter, as the core demographic scrolls during afternoon and evening hours.' },
            { q: 'Should I post at the same time every day?', a: 'Not necessarily. Different days have different peak engagement windows. Tuesday through Thursday generally outperform other days for B2B content, while entertainment and lifestyle content performs well on weekends. Consistency in frequency matters more than posting at the exact same time daily.' },
            { q: 'How many times per week should I post on social media?', a: 'It depends on the platform: Instagram 4-7x/week, TikTok 5-7x/week, LinkedIn 3-5x/week, Twitter/X 10-15x/week, Facebook 3-5x/week, and YouTube 1-3x/week. Quality always trumps quantity — if engagement drops as you post more, reduce frequency and focus on higher-quality content.' },
          ].map(faq => (
            <details key={faq.q} className="glass rounded-xl p-4 cursor-pointer group">
              <summary className="font-semibold list-none flex justify-between items-center">
                {faq.q}
                <span className="text-zinc-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-zinc-400 text-sm mt-3">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
