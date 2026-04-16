'use client';
import { useState } from 'react';

const sourceOptions = ['Instagram', 'Twitter/X', 'Facebook', 'YouTube', 'TikTok', 'LinkedIn', 'Pinterest', 'Snapchat', 'Tumblr', 'Reddit'] as const;
const targetOptions = ['TikTok', 'Instagram', 'YouTube', 'LinkedIn', 'Threads', 'Bluesky', 'Mastodon', 'Substack', 'Beehiiv', 'Kit (ConvertKit)'] as const;
const contentTypes = ['Short-form Video', 'Long-form Video', 'Static Images', 'Carousels', 'Stories', 'Text Posts', 'Articles/Blogs', 'Livestreams', 'Audio/Podcasts'] as const;
const audienceSizes = ['Under 1K', '1K-10K', '10K-50K', '50K-100K', '100K-500K', '500K-1M', '1M+'] as const;
const goals = ['Grow Audience on New Platform', 'Diversify Revenue', 'Escape Algorithm Dependency', 'Reach New Demographics', 'Build Owned Media', 'Content Repurposing at Scale'] as const;

interface MigrationPlan {
  overview: { riskLevel: string; timeEstimate: string; effortLevel: string; successProbability: string };
  weekByWeek: { week: string; tasks: string[]; milestone: string }[];
  contentAdaptation: { original: string; adapted: string; tips: string }[];
  audienceTransfer: string[];
  monetization: { method: string; timeline: string; potential: string }[];
  toolsNeeded: { tool: string; purpose: string; cost: string }[];
  pitfalls: string[];
  metrics: { metric: string; target: string; timeframe: string }[];
  crossPromotion: string[];
  contentCalendar: { day: string; sourceAction: string; targetAction: string }[];
}

function generateMigrationPlan(source: string, target: string, contentType: string, audience: string, goal: string): MigrationPlan {
  const audienceNum = audience.includes('Under') ? 500 : parseInt(audience.replace(/[K+M,]/g, '')) * (audience.includes('M') ? 1000000 : audience.includes('K') ? 1000 : 1);

  return {
    overview: {
      riskLevel: audienceNum > 100000 ? '🟡 Medium — large audience to migrate, gradual approach critical' : '🟢 Low — smaller audience, faster experimentation possible',
      timeEstimate: audienceNum > 50000 ? '8-12 weeks for meaningful traction' : '4-6 weeks for initial growth',
      effortLevel: source === target ? 'Low (same platform)' : contentType.includes('Video') ? 'High (reformatting needed)' : 'Medium (content adaptation)',
      successProbability: `${Math.min(85, 60 + Math.floor(Math.random() * 20))}% — based on ${source}→${target} migration success rates`,
    },
    weekByWeek: [
      { week: 'Week 1: Research & Setup', tasks: [`Create optimized ${target} profile (bio, links, branding)`, `Audit top 20 performing ${source} posts for reuse`, `Study ${target} algorithm: best times, formats, hashtags`, `Set up analytics tracking (UTM links + platform native)`], milestone: `${target} profile live with first 3 posts` },
      { week: 'Week 2: Content Bridge', tasks: [`Repurpose 5 top ${source} posts for ${target} format`, `Create 2 original ${target}-native pieces`, `Cross-promote on ${source}: "Find me on ${target}"`, 'Engage with 50 accounts in your niche daily'], milestone: 'First 10 posts published, engagement patterns emerging' },
      { week: 'Week 3-4: Growth Sprint', tasks: [`Post daily on ${target} (algorithm rewards consistency)`, `Collaborate with 2-3 ${target} creators in niche`, 'Run a cross-platform challenge or giveaway', `Optimize content based on Week 2 analytics`], milestone: `${audienceNum > 10000 ? '1K-5K' : '100-500'} followers on ${target}` },
      { week: 'Week 5-6: Momentum', tasks: [`Launch ${target}-exclusive content series`, `Build ${target}-specific community (comments, DMs, lives)`, `Reduce ${source} posting to 3x/week, increase ${target} to daily`, 'Create lead magnet to capture emails (owned audience)'], milestone: `Consistent engagement rate above ${target === 'LinkedIn' ? '3%' : '5%'}` },
      { week: 'Week 7-8: Monetization', tasks: [`Set up monetization on ${target} (creator fund, tips, etc.)`, 'Launch first paid offering (course, membership, product)', `Test affiliate links on ${target}`, 'Review full funnel: awareness → engagement → conversion'], milestone: 'First revenue from new platform' },
    ],
    contentAdaptation: [
      { original: `${source} ${contentType}`, adapted: `${target}-native format`, tips: getAdaptationTip(source, target, contentType) },
      { original: 'Captions/Copy', adapted: `${target} caption style`, tips: target === 'LinkedIn' ? 'Longer, story-driven, use line breaks for readability' : target === 'TikTok' ? 'Short, punchy, use trending sounds + text overlays' : 'Match platform voice — study top creators' },
      { original: 'Hashtags', adapted: `${target} hashtag strategy`, tips: target === 'Instagram' ? '20-30 hashtags in first comment, mix niche+broad' : target === 'TikTok' ? '3-5 hashtags max, rely on FYP algorithm' : target === 'LinkedIn' ? '3-5 industry hashtags only' : 'Platform-specific research needed' },
      { original: 'Posting Schedule', adapted: `${target} optimal times`, tips: target === 'TikTok' ? '7-9 AM, 12-3 PM, 7-11 PM (local audience time)' : target === 'LinkedIn' ? 'Tue-Thu 8-10 AM business hours' : 'Use analytics to find YOUR audience peak times' },
    ],
    audienceTransfer: [
      `Pin a "Find me on ${target}" post on ${source}`,
      `Add ${target} link to ${source} bio`,
      `Create a "Why I'm moving to ${target}" story series on ${source}`,
      `Offer exclusive content on ${target} as incentive to follow`,
      `Build email list (Substack/Beehiiv) as platform-independent bridge`,
      `DM top 50 engaged followers: "Hey! I'm building something special on ${target}"`,
      `Run a cross-platform collaboration with a ${target}-native creator`,
    ],
    monetization: [
      { method: `${target} Creator Fund`, timeline: 'Month 2-3', potential: '$50-500/month (varies by platform)' },
      { method: 'Sponsored Posts', timeline: 'Month 3-4 (need proof of engagement)', potential: `$${audienceNum > 50000 ? '500-5,000' : '50-500'}/post` },
      { method: 'Affiliate Marketing', timeline: 'Month 1 (start immediately)', potential: '5-15% commissions on sales' },
      { method: 'Digital Products', timeline: 'Month 2-3', potential: '$500-10,000/month' },
      { method: 'Coaching/Consulting', timeline: 'Month 1 (leverage existing authority)', potential: '$100-500/session' },
      { method: 'Email Newsletter Monetization', timeline: 'Month 3+', potential: '$500-5,000/month (ads + paid tier)' },
    ],
    toolsNeeded: [
      { tool: 'Repurpose.io or Opus Clip', purpose: 'Auto-repurpose long content to short-form', cost: '$20-50/month' },
      { tool: 'Canva Pro or Figma', purpose: 'Resize/rebrand content for new platform', cost: '$13-15/month' },
      { tool: 'Later or Buffer', purpose: 'Schedule cross-platform posts', cost: '$18-50/month' },
      { tool: 'Metricool or Sprout Social', purpose: 'Cross-platform analytics', cost: '$20-100/month' },
      { tool: 'Beehiiv or Kit', purpose: 'Email capture (platform-independent audience)', cost: 'Free-$50/month' },
      { tool: 'PostCraft', purpose: 'Generate optimized content for any platform', cost: '$0 (free tier)' },
    ],
    pitfalls: [
      `Don't abandon ${source} completely — maintain presence while growing ${target}`,
      `Don't copy-paste content — ${target} algorithm penalizes reposted content`,
      'Don\'t buy followers/engagement — kills algorithm trust score',
      `Don't ignore ${target} culture — study native content before posting`,
      'Don\'t spread too thin — master ONE new platform before adding another',
      'Don\'t skip the engagement phase — posting without commenting = invisible',
      'Don\'t compare Day 1 metrics on new platform to established platform metrics',
    ],
    metrics: [
      { metric: 'Follower Growth Rate', target: `${audienceNum > 50000 ? '500-2000' : '50-200'}/week`, timeframe: 'Track weekly' },
      { metric: 'Engagement Rate', target: `${target === 'LinkedIn' ? '3-5%' : target === 'TikTok' ? '8-15%' : '5-8%'}`, timeframe: 'Track per post' },
      { metric: 'Content Reach', target: `${audienceNum > 50000 ? '10x' : '3x'} follower count`, timeframe: 'Track weekly' },
      { metric: 'Email Signups', target: '2-5% of new followers', timeframe: 'Track weekly' },
      { metric: 'Revenue per Follower', target: '$0.50-2.00/follower/year', timeframe: 'Track monthly' },
      { metric: 'Cross-Platform Traffic', target: '10-20% referral from source', timeframe: 'Track monthly' },
    ],
    crossPromotion: [
      `${source} Story: "Sneak peek of what I'm building on ${target} 👀"`,
      `${source} Post: "Top 5 things I learned switching to ${target} [thread]"`,
      `${source} Bio: "Daily tips on ${target} → @yourhandle"`,
      `${target} Welcome Post: "Just arrived from ${source} — here's what I'm bringing you"`,
      `Email: "I'm experimenting on ${target} — join me!"`,
      `Podcast/Video: "Why ${target} is the future of [niche]"`,
    ],
    contentCalendar: [
      { day: 'Monday', sourceAction: `${source}: Share weekend results/wins`, targetAction: `${target}: Educational content (tips, how-to)` },
      { day: 'Tuesday', sourceAction: `${source}: Engage only (no new post)`, targetAction: `${target}: Behind-the-scenes content` },
      { day: 'Wednesday', sourceAction: `${source}: Cross-promote ${target} content`, targetAction: `${target}: Trending topic/format participation` },
      { day: 'Thursday', sourceAction: `${source}: Repurpose top ${target} post`, targetAction: `${target}: Original value-packed content` },
      { day: 'Friday', sourceAction: `${source}: Community engagement day`, targetAction: `${target}: Fun/personal content + engage` },
      { day: 'Weekend', sourceAction: `${source}: Schedule 1 evergreen post`, targetAction: `${target}: Experiment with new format + batch create next week` },
    ],
  };
}

function getAdaptationTip(source: string, target: string, contentType: string): string {
  if (contentType.includes('Video') && target === 'LinkedIn') return 'Add captions (85% watch muted), keep under 90s, lead with insight not hook';
  if (contentType.includes('Video') && target === 'TikTok') return 'Hook in first 1s, faster pace, text overlays mandatory, trending sounds boost reach 3x';
  if (contentType === 'Static Images' && target === 'TikTok') return 'Convert to slideshows with voiceover — static images get 70% less reach on TikTok';
  if (contentType === 'Articles/Blogs' && target === 'Threads') return 'Break into 5-7 tweet thread format, add visuals every 2nd post';
  if (source === 'Twitter/X' && target === 'Threads') return 'Similar format but Threads rewards longer, more thoughtful posts — less hot takes';
  return `Reformat ${contentType.toLowerCase()} to match ${target} native style — study top 10 creators in your niche on ${target}`;
}

export default function PlatformMigrationPage() {
  const [source, setSource] = useState<string>(sourceOptions[0]);
  const [target, setTarget] = useState<string>(targetOptions[0]);
  const [contentType, setContentType] = useState<string>(contentTypes[0]);
  const [audience, setAudience] = useState<string>(audienceSizes[1]);
  const [goal, setGoal] = useState<string>(goals[0]);
  const [result, setResult] = useState<MigrationPlan | null>(null);

  const handleGenerate = () => {
    setResult(generateMigrationPlan(source, target, contentType, audience, goal));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Platform Migration Planner</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Plan your move from one social platform to another with a week-by-week strategy, content adaptation guide, and monetization roadmap.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Source Platform</label>
              <select value={source} onChange={e => setSource(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                {sourceOptions.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Target Platform</label>
              <select value={target} onChange={e => setTarget(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                {targetOptions.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Main Content Type</label>
              <select value={contentType} onChange={e => setContentType(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                {contentTypes.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Current Audience Size</label>
              <select value={audience} onChange={e => setAudience(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                {audienceSizes.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Migration Goal</label>
              <select value={goal} onChange={e => setGoal(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                {goals.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
          </div>
          <button onClick={handleGenerate} className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl">Generate Migration Plan</button>
        </div>

        {result && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Migration Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-xl p-4"><span className="text-xs font-semibold text-gray-500 uppercase">Risk Level</span><p className="text-sm text-gray-800 mt-1">{result.overview.riskLevel}</p></div>
                <div className="bg-blue-50 rounded-xl p-4"><span className="text-xs font-semibold text-gray-500 uppercase">Time Estimate</span><p className="text-sm text-gray-800 mt-1">{result.overview.timeEstimate}</p></div>
                <div className="bg-blue-50 rounded-xl p-4"><span className="text-xs font-semibold text-gray-500 uppercase">Effort Level</span><p className="text-sm text-gray-800 mt-1">{result.overview.effortLevel}</p></div>
                <div className="bg-blue-50 rounded-xl p-4"><span className="text-xs font-semibold text-gray-500 uppercase">Success Rate</span><p className="text-sm text-gray-800 mt-1">{result.overview.successProbability}</p></div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Week-by-Week Plan</h2>
              <div className="space-y-4">
                {result.weekByWeek.map((week, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-gray-900 mb-2">{week.week}</h3>
                    <ul className="space-y-1 mb-3">{week.tasks.map((t, j) => <li key={j} className="text-gray-700 text-sm flex gap-2"><span>📋</span>{t}</li>)}</ul>
                    <div className="bg-green-50 rounded-lg p-3 text-green-800 text-sm font-medium">Milestone: {week.milestone}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Content Adaptation Guide</h2>
              <div className="space-y-3">
                {result.contentAdaptation.map((a, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">{a.original}</span><span>→</span><span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs font-bold">{a.adapted}</span></div>
                    <p className="text-gray-700 text-sm">{a.tips}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Audience Transfer Tactics</h2>
                <ul className="space-y-2">{result.audienceTransfer.map((t, i) => <li key={i} className="text-gray-700 text-sm flex gap-2"><span className="text-blue-500">🔗</span>{t}</li>)}</ul>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Common Pitfalls to Avoid</h2>
                <ul className="space-y-2">{result.pitfalls.map((p, i) => <li key={i} className="text-gray-700 text-sm flex gap-2"><span className="text-red-500">⚠️</span>{p}</li>)}</ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Monetization Roadmap</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-gray-200"><th className="text-left p-3 font-semibold text-gray-700">Method</th><th className="text-left p-3 font-semibold text-gray-700">Timeline</th><th className="text-left p-3 font-semibold text-gray-700">Potential</th></tr></thead>
                  <tbody>{result.monetization.map((m, i) => <tr key={i} className="border-b border-gray-50"><td className="p-3 text-gray-800">{m.method}</td><td className="p-3 text-gray-600">{m.timeline}</td><td className="p-3 text-green-700 font-medium">{m.potential}</td></tr>)}</tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Tools You Need</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {result.toolsNeeded.map((t, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-4">
                    <div className="font-semibold text-gray-900 text-sm">{t.tool}</div>
                    <div className="text-gray-600 text-xs mt-1">{t.purpose}</div>
                    <div className="text-blue-600 text-xs font-medium mt-1">{t.cost}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">KPI Targets</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-gray-200"><th className="text-left p-3 font-semibold text-gray-700">Metric</th><th className="text-left p-3 font-semibold text-gray-700">Target</th><th className="text-left p-3 font-semibold text-gray-700">Timeframe</th></tr></thead>
                  <tbody>{result.metrics.map((m, i) => <tr key={i} className="border-b border-gray-50"><td className="p-3 text-gray-800">{m.metric}</td><td className="p-3 text-indigo-700 font-medium">{m.target}</td><td className="p-3 text-gray-600">{m.timeframe}</td></tr>)}</tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Weekly Content Calendar</h2>
              <div className="space-y-3">
                {result.contentCalendar.map((d, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-4 grid grid-cols-3 gap-4">
                    <div className="font-bold text-gray-900 text-sm">{d.day}</div>
                    <div className="text-gray-600 text-sm"><span className="text-xs font-semibold text-orange-600">SOURCE:</span> {d.sourceAction}</div>
                    <div className="text-gray-600 text-sm"><span className="text-xs font-semibold text-blue-600">TARGET:</span> {d.targetAction}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Cross-Promotion Templates</h2>
              <div className="space-y-3">{result.crossPromotion.map((c, i) => <div key={i} className="bg-indigo-50 rounded-xl p-4 text-indigo-800 text-sm italic">{c}</div>)}</div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
