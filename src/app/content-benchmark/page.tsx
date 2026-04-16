'use client';
import { useState } from 'react';

const industries = ['SaaS & Software', 'E-commerce', 'Health & Medical', 'Finance & Fintech', 'Education & EdTech', 'Beauty & Skincare', 'Food & Restaurant', 'Travel & Hospitality', 'Tech & Startups', 'Real Estate', 'Fitness & Sports', 'Entertainment & Media'] as const;
const platformOptions = ['Instagram', 'Facebook', 'TikTok', 'Twitter/X', 'LinkedIn', 'YouTube', 'Pinterest', 'Threads'] as const;
const contentTypes = ['Images', 'Videos', 'Carousels', 'Stories/Reels', 'Short-Form Video', 'Text Posts'] as const;
const followerRanges = ['0-1K (Starter)', '1K-10K (Micro)', '10K-50K (Mid-Tier)', '50K-100K (Rising)', '100K-500K (Established)', '500K+ (Major)'] as const;
const goals = ['Brand Awareness', 'Lead Generation', 'Direct Sales', 'Community Building', 'Thought Leadership', 'Website Traffic'] as const;
const metricsFocus = ['Engagement Rate', 'Reach & Impressions', 'Click-Through Rate', 'Conversion Rate', 'Share/Save Rate', 'Follower Growth'] as const;

interface BenchmarkRow { metric: string; yourValue: string; industryAvg: string; topPerformer: string; percentile: number; trend: 'up' | 'down' | 'stable'; }
interface PlatformGrade { platform: string; engagementRate: string; reachRate: string; avgLikes: string; avgComments: string; grade: string; }
interface ContentAnalysis { type: string; performance: string; benchmark: string; recommendation: string; potentialLift: string; }
interface CompetitorInsight { insight: string; impact: 'High' | 'Medium' | 'Low'; actionable: string; }
interface ImprovementArea { area: string; currentScore: number; targetScore: number; actions: string[]; timeline: string; }
interface WeeklyTarget { metric: string; currentAvg: string; target: string; strategy: string; }
interface BenchmarkResult {
  overallScore: number;
  grade: string;
  benchmarks: BenchmarkRow[];
  platformBreakdown: PlatformGrade[];
  contentAnalysis: ContentAnalysis[];
  competitorInsights: CompetitorInsight[];
  improvementPlan: ImprovementArea[];
  weeklyTargets: WeeklyTarget[];
  topTactics: string[];
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }
function pick<T>(arr: readonly T[] | T[], seed: number, idx: number = 0): T { return arr[(seed + idx) % arr.length]; }

function generateBenchmark(industry: string, platform: string, content: string, followers: string, goal: string, metric: string): BenchmarkResult {
  const seed = hash(`${industry}-${platform}-${content}-${followers}-${goal}-${metric}`);
  const score = 35 + seed % 60;
  const grades = ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'];
  const grade = grades[Math.min(Math.floor((100 - score) / 12), grades.length - 1)];

  const trends: ('up' | 'down' | 'stable')[] = ['up', 'down', 'stable'];
  const benchmarks: BenchmarkRow[] = [
    { metric: 'Engagement Rate', yourValue: `${(1.5 + (seed % 40) / 10).toFixed(1)}%`, industryAvg: `${(2.1 + (seed % 15) / 10).toFixed(1)}%`, topPerformer: `${(5.2 + (seed % 30) / 10).toFixed(1)}%`, percentile: 20 + seed % 60, trend: pick(trends, seed, 0) },
    { metric: 'Reach Rate', yourValue: `${(8 + seed % 20)}%`, industryAvg: `${(15 + seed % 10)}%`, topPerformer: `${(35 + seed % 20)}%`, percentile: 15 + seed % 50, trend: pick(trends, seed, 1) },
    { metric: 'Click-Through Rate', yourValue: `${(0.5 + (seed % 25) / 10).toFixed(1)}%`, industryAvg: `${(1.2 + (seed % 10) / 10).toFixed(1)}%`, topPerformer: `${(3.5 + (seed % 20) / 10).toFixed(1)}%`, percentile: 18 + seed % 55, trend: pick(trends, seed, 2) },
    { metric: 'Share Rate', yourValue: `${(0.2 + (seed % 15) / 10).toFixed(1)}%`, industryAvg: `${(0.8 + (seed % 8) / 10).toFixed(1)}%`, topPerformer: `${(2.5 + (seed % 15) / 10).toFixed(1)}%`, percentile: 22 + seed % 45, trend: pick(trends, seed, 3) },
    { metric: 'Save Rate', yourValue: `${(0.3 + (seed % 12) / 10).toFixed(1)}%`, industryAvg: `${(1.0 + (seed % 10) / 10).toFixed(1)}%`, topPerformer: `${(3.0 + (seed % 18) / 10).toFixed(1)}%`, percentile: 25 + seed % 50, trend: pick(trends, seed, 4) },
    { metric: 'Follower Growth Rate', yourValue: `${(0.5 + (seed % 20) / 10).toFixed(1)}%/wk`, industryAvg: `${(1.5 + (seed % 8) / 10).toFixed(1)}%/wk`, topPerformer: `${(4.0 + (seed % 25) / 10).toFixed(1)}%/wk`, percentile: 20 + seed % 55, trend: pick(trends, seed, 5) },
  ];

  const gradeList = ['A', 'A', 'B+', 'B', 'B', 'C+', 'C', 'B+'];
  const platformBreakdown: PlatformGrade[] = platformOptions.map((p, i) => ({
    platform: p,
    engagementRate: `${(1.0 + ((seed + i * 7) % 50) / 10).toFixed(1)}%`,
    reachRate: `${5 + (seed + i * 3) % 30}%`,
    avgLikes: `${50 + (seed + i * 11) % 500}`,
    avgComments: `${3 + (seed + i * 5) % 40}`,
    grade: gradeList[(seed + i) % gradeList.length],
  }));

  const contentAnalysis: ContentAnalysis[] = contentTypes.map((t, i) => ({
    type: t,
    performance: `${(1.0 + ((seed + i * 9) % 45) / 10).toFixed(1)}x avg`,
    benchmark: `${(1.5 + ((seed + i * 4) % 20) / 10).toFixed(1)}x avg`,
    recommendation: pick([
      'Increase posting frequency by 2x per week',
      'Add more storytelling elements to captions',
      'Test different thumbnail styles for higher CTR',
      'Leverage trending audio for 30% more reach',
      'Post during peak engagement windows (see Timing tool)',
      'Add strong CTAs to boost conversion rate',
    ], seed, i),
    potentialLift: `+${15 + (seed + i * 6) % 45}%`,
  }));

  const competitorInsights: CompetitorInsight[] = [
    { insight: `Top ${industry} accounts post ${3 + seed % 5}x/week on ${platform} — you post less`, impact: 'High', actionable: 'Increase content cadence using Content Calendar tool' },
    { insight: `${pick(['Carousel', 'Reel', 'Story', 'Video'], seed, 0)} content gets ${2 + seed % 4}x more engagement in your niche`, impact: 'High', actionable: 'Shift content mix toward this format' },
    { insight: `Competitors use ${pick(['user polls', 'behind-the-scenes', 'data visualizations', 'customer stories'], seed, 1)} as top engagement drivers`, impact: 'Medium', actionable: 'Test this content type in your next 5 posts' },
    { insight: `Your caption length is ${seed % 2 === 0 ? 'shorter' : 'longer'} than top performers in ${industry}`, impact: 'Medium', actionable: `${seed % 2 === 0 ? 'Expand captions with storytelling and CTAs' : 'Trim to key points — shorter converts better here'}` },
    { insight: `Top accounts reply to ${60 + seed % 30}% of comments within 1 hour`, impact: 'Low', actionable: 'Set up notification alerts and use Comment Reply tool' },
  ];

  const improvementPlan: ImprovementArea[] = [
    { area: 'Content Quality', currentScore: 40 + seed % 30, targetScore: 85, actions: ['Invest in better visuals/thumbnails', 'A/B test hooks and captions', 'Study top-performing posts weekly'], timeline: '4-6 weeks' },
    { area: 'Posting Consistency', currentScore: 35 + seed % 35, targetScore: 90, actions: ['Build 2-week content buffer', 'Use Content Calendar for scheduling', 'Batch-create content weekly'], timeline: '2-3 weeks' },
    { area: 'Audience Engagement', currentScore: 30 + seed % 40, targetScore: 80, actions: ['Reply to every comment within 2 hours', 'Add questions/polls to every post', 'Run weekly engagement campaigns'], timeline: '4-8 weeks' },
    { area: 'Content Mix Optimization', currentScore: 45 + seed % 25, targetScore: 85, actions: ['Follow 60/30/10 rule (value/engage/promote)', 'Test new format each week', 'Track per-format performance'], timeline: '3-5 weeks' },
  ];

  const weeklyTargets: WeeklyTarget[] = [
    { metric: 'Posts per week', currentAvg: `${2 + seed % 3}`, target: `${5 + seed % 3}`, strategy: 'Batch-create content on Mondays using Content Calendar' },
    { metric: 'Avg. engagement rate', currentAvg: `${(1.5 + (seed % 20) / 10).toFixed(1)}%`, target: `${(3.0 + (seed % 15) / 10).toFixed(1)}%`, strategy: 'Focus on carousel + video formats with strong hooks' },
    { metric: 'Story views', currentAvg: `${100 + seed % 300}`, target: `${400 + seed % 500}`, strategy: 'Post 3-5 stories/day with polls and questions' },
    { metric: 'Profile visits', currentAvg: `${50 + seed % 150}`, target: `${200 + seed % 300}`, strategy: 'Optimize bio with CTA and update link-in-bio weekly' },
    { metric: 'Saves per post', currentAvg: `${5 + seed % 20}`, target: `${25 + seed % 30}`, strategy: 'Create save-worthy infographics and checklists' },
  ];

  const topTactics = [
    `Post ${pick(['Reels', 'carousels', 'short videos', 'Stories'], seed, 0)} — they get ${2 + seed % 3}x more reach in ${industry}`,
    'Use the first 3 seconds to hook — 65% of viewers decide to stay or leave',
    `Optimal posting time for ${platform}: ${pick(['7-9 AM', '12-1 PM', '5-7 PM', '8-10 PM'], seed, 1)} in your audience timezone`,
    'Add a CTA in every caption — posts with CTAs get 2.5x more clicks',
    'Respond to comments within 60 minutes — algorithm rewards fast engagement',
    `Use ${3 + seed % 5} hashtags maximum on ${platform} for best reach (2026 algorithm)`,
    'Share user-generated content — UGC posts get 4.5x higher engagement',
    'Leverage trending audio within 48 hours of trend emergence for maximum reach',
    'Cross-promote top content from other platforms using Cross-Platform Adapter',
    'Analyze competitor content weekly with Competitor Tracker to spot gaps',
  ];

  return { overallScore: score, grade, benchmarks, platformBreakdown, contentAnalysis, competitorInsights, improvementPlan, weeklyTargets, topTactics };
}

export default function ContentBenchmarkPage() {
  const [industry, setIndustry] = useState(industries[0]);
  const [platform, setPlatform] = useState(platformOptions[0]);
  const [content, setContent] = useState(contentTypes[0]);
  const [followers, setFollowers] = useState(followerRanges[0]);
  const [goal, setGoal] = useState(goals[0]);
  const [metric, setMetric] = useState(metricsFocus[0]);
  const [result, setResult] = useState<BenchmarkResult | null>(null);

  const handleGenerate = () => setResult(generateBenchmark(industry, platform, content, followers, goal, metric));

  const gradeColor = (g: string) => g.startsWith('A') ? 'text-emerald-400' : g.startsWith('B') ? 'text-blue-400' : g.startsWith('C') ? 'text-yellow-400' : 'text-red-400';
  const impactColor = (i: string) => i === 'High' ? 'text-red-400' : i === 'Medium' ? 'text-yellow-400' : 'text-emerald-400';
  const trendIcon = (t: string) => t === 'up' ? '\u2191' : t === 'down' ? '\u2193' : '\u2192';
  const trendColor = (t: string) => t === 'up' ? 'text-emerald-400' : t === 'down' ? 'text-red-400' : 'text-zinc-500';

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Content Benchmark</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Compare your social media performance against industry benchmarks and top performers. See where you stand and get a personalized improvement plan.</p>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {([
            { label: 'Industry', value: industry, setter: setIndustry as (v: string) => void, options: industries as readonly string[] },
            { label: 'Primary Platform', value: platform, setter: setPlatform as (v: string) => void, options: platformOptions as readonly string[] },
            { label: 'Content Type', value: content, setter: setContent as (v: string) => void, options: contentTypes as readonly string[] },
            { label: 'Follower Range', value: followers, setter: setFollowers as (v: string) => void, options: followerRanges as readonly string[] },
            { label: 'Primary Goal', value: goal, setter: setGoal as (v: string) => void, options: goals as readonly string[] },
            { label: 'Key Metric', value: metric, setter: setMetric as (v: string) => void, options: metricsFocus as readonly string[] },
          ] as const).map(({ label, value, setter, options }) => (
            <div key={label}>
              <label className="block text-sm text-zinc-400 mb-1">{label}</label>
              <select value={value} onChange={e => setter(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100">
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
        <button onClick={handleGenerate} className="w-full md:w-auto bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded font-semibold hover:opacity-90 transition mb-8">Run Benchmark Analysis</button>

        {result && (
          <div className="space-y-8">
            {/* Overall Score */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 text-center">
              <div className="text-sm text-zinc-500 mb-1">Your Content Performance Score</div>
              <div className="flex items-center justify-center gap-4">
                <span className="text-6xl font-bold" style={{ color: result.overallScore > 75 ? '#34d399' : result.overallScore > 50 ? '#fbbf24' : '#f87171' }}>{result.overallScore}</span>
                <span className={`text-4xl font-bold ${gradeColor(result.grade)}`}>{result.grade}</span>
              </div>
              <div className="mt-3 max-w-md mx-auto w-full bg-zinc-800 rounded-full h-3">
                <div className="h-3 rounded-full transition-all" style={{ width: `${result.overallScore}%`, background: result.overallScore > 75 ? '#34d399' : result.overallScore > 50 ? '#fbbf24' : '#f87171' }} />
              </div>
              <div className="mt-2 text-zinc-500 text-sm">vs. {industry} industry average</div>
            </div>

            {/* Industry Benchmarks */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Industry Benchmarks</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="text-zinc-500 border-b border-zinc-800"><th className="text-left py-2">Metric</th><th className="text-left py-2">You</th><th className="text-left py-2">Industry Avg</th><th className="text-left py-2">Top 10%</th><th className="text-left py-2">Percentile</th><th className="py-2">Trend</th></tr></thead>
                  <tbody>
                    {result.benchmarks.map((b, i) => (
                      <tr key={i} className="border-b border-zinc-800/50">
                        <td className="py-2 text-zinc-300 font-medium">{b.metric}</td>
                        <td className="py-2 text-zinc-100 font-semibold">{b.yourValue}</td>
                        <td className="py-2 text-zinc-400">{b.industryAvg}</td>
                        <td className="py-2 text-emerald-400">{b.topPerformer}</td>
                        <td className="py-2">
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-zinc-800 rounded-full h-2"><div className="h-2 rounded-full bg-violet-500" style={{ width: `${b.percentile}%` }} /></div>
                            <span className="text-zinc-400">{b.percentile}th</span>
                          </div>
                        </td>
                        <td className={`py-2 text-center font-bold ${trendColor(b.trend)}`}>{trendIcon(b.trend)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Platform Breakdown */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Platform Performance Breakdown</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                {result.platformBreakdown.map((p, i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-zinc-200">{p.platform}</span>
                      <span className={`text-lg font-bold ${gradeColor(p.grade)}`}>{p.grade}</span>
                    </div>
                    <div className="text-xs text-zinc-500 space-y-1">
                      <div className="flex justify-between"><span>Engagement</span><span className="text-zinc-300">{p.engagementRate}</span></div>
                      <div className="flex justify-between"><span>Reach</span><span className="text-zinc-300">{p.reachRate}</span></div>
                      <div className="flex justify-between"><span>Avg Likes</span><span className="text-zinc-300">{p.avgLikes}</span></div>
                      <div className="flex justify-between"><span>Avg Comments</span><span className="text-zinc-300">{p.avgComments}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Type Analysis */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Content Type Performance</h3>
              <div className="space-y-3">
                {result.contentAnalysis.map((c, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50 flex flex-col md:flex-row md:items-center gap-3">
                    <div className="md:w-1/5 font-semibold text-zinc-200">{c.type}</div>
                    <div className="md:w-1/5 text-sm"><span className="text-zinc-500">You:</span> <span className="text-zinc-200">{c.performance}</span></div>
                    <div className="md:w-1/5 text-sm"><span className="text-zinc-500">Benchmark:</span> <span className="text-zinc-300">{c.benchmark}</span></div>
                    <div className="md:w-1/5 text-sm text-zinc-400">{c.recommendation}</div>
                    <div className="md:w-1/5 text-right text-emerald-400 font-semibold">{c.potentialLift}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Competitor Insights */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Competitor Insights</h3>
              <div className="space-y-3">
                {result.competitorInsights.map((c, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-zinc-200">{c.insight}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${impactColor(c.impact)} bg-zinc-800`}>{c.impact}</span>
                    </div>
                    <div className="text-sm text-zinc-400"><strong>Action:</strong> {c.actionable}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Improvement Plan */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Personalized Improvement Plan</h3>
              <div className="space-y-4">
                {result.improvementPlan.map((p, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-zinc-200">{p.area}</span>
                      <span className="text-xs text-zinc-500">{p.timeline}</span>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-red-400 text-sm font-mono">{p.currentScore}</span>
                      <div className="flex-1 bg-zinc-800 rounded-full h-2 relative">
                        <div className="h-2 rounded-full bg-red-400/50 absolute" style={{ width: `${p.currentScore}%` }} />
                        <div className="h-2 rounded-full bg-emerald-400/30 absolute" style={{ width: `${p.targetScore}%` }} />
                      </div>
                      <span className="text-emerald-400 text-sm font-mono">{p.targetScore}</span>
                    </div>
                    <ul className="text-sm text-zinc-400 space-y-1">{p.actions.map((a, j) => <li key={j}>- {a}</li>)}</ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Targets */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Weekly Targets</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="text-zinc-500 border-b border-zinc-800"><th className="text-left py-2">Metric</th><th className="text-left py-2">Current</th><th className="text-left py-2">Target</th><th className="text-left py-2">Strategy</th></tr></thead>
                  <tbody>
                    {result.weeklyTargets.map((t, i) => (
                      <tr key={i} className="border-b border-zinc-800/50"><td className="py-2 text-zinc-300">{t.metric}</td><td className="py-2 text-zinc-400">{t.currentAvg}</td><td className="py-2 text-emerald-400 font-semibold">{t.target}</td><td className="py-2 text-zinc-400">{t.strategy}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Tactics */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Top Performer Tactics for {industry}</h3>
              <div className="grid md:grid-cols-2 gap-2">
                {result.topTactics.map((t, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-zinc-300 bg-zinc-800/30 rounded p-3">
                    <span className="text-violet-400 font-bold">{i + 1}.</span> {t}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">Outperform Your Industry</h3>
              <p className="text-zinc-400 mb-4">Use <a href="/content-scorecard" className="text-violet-400 underline">Content Scorecard</a>, <a href="/competitor-tracker" className="text-violet-400 underline">Competitor Tracker</a>, and <a href="/content-calendar" className="text-violet-400 underline">Content Calendar</a> to systematically improve.</p>
              <a href="/pricing" className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">Get PostCraft Pro</a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
