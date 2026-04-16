'use client';
import { useState } from 'react';

const platforms = ['Instagram', 'LinkedIn', 'Twitter/X', 'TikTok', 'Facebook', 'YouTube'] as const;
const frequencies = ['1-3 posts/week', '4-7 posts/week', '1-2 posts/day', '3-5 posts/day', '5+ posts/day'] as const;
const industries = ['E-commerce', 'SaaS / Tech', 'Agency', 'Health & Wellness', 'Finance', 'Education', 'Media', 'Real Estate'] as const;

interface HourlyScore { hour: string; weekday: number; weekend: number; label: string; }
interface DayAnalysis { day: string; score: number; bestHour: string; worstHour: string; contentAdvice: string; audienceBehavior: string; }
interface ContentPerformance { contentType: string; engagementRate: string; reachMultiplier: string; bestTime: string; decayCurve: string; recommendation: string; }
interface SeasonalPattern { period: string; trend: string; engagementShift: string; contentStrategy: string; opportunity: string; }
interface PostingWindow { window: string; score: number; reason: string; contentTypes: string; competition: string; }
interface DecayCurve { contentType: string; peakHour: string; halfLife: string; longTail: string; revivalStrategy: string; }
interface Recommendation { category: string; action: string; expectedImpact: string; priority: 'Critical' | 'High' | 'Medium'; effort: string; }

interface HeatmapReport {
  overallEngagementScore: number;
  peakWindow: string;
  worstWindow: string;
  hourlyScores: HourlyScore[];
  dayAnalysis: DayAnalysis[];
  contentPerformance: ContentPerformance[];
  seasonalPatterns: SeasonalPattern[];
  postingWindows: PostingWindow[];
  decayCurves: DecayCurve[];
  recommendations: Recommendation[];
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }

function generateHeatmap(platform: string, frequency: string, industry: string, brand: string): HeatmapReport {
  const seed = hash(`${platform}-${frequency}-${industry}-${brand}`);
  const overallEngagementScore = 40 + seed % 45;

  const hours = ['6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'];
  const labels = ['Early risers checking phones', 'Commute scrolling peak', 'Commute + coffee browsing', 'Work start — quick scroll', 'Mid-morning break', 'Pre-lunch browsing', 'Lunch break peak', 'Post-lunch scroll', 'Afternoon slump = social time', 'Late afternoon break', 'End of workday', 'Commute home scrolling', 'Dinner + wind-down', 'Evening prime time', 'Peak relaxation scrolling', 'Late evening engagement', 'Night owl activity', 'Late night low activity'];

  const hourlyScores: HourlyScore[] = hours.map((hour, i) => {
    const base = [20, 35, 55, 60, 50, 45, 70, 55, 40, 35, 45, 60, 65, 80, 85, 75, 55, 30];
    const weekday = Math.min(100, Math.max(5, base[i] + (seed + i * 7) % 20 - 10));
    const weekend = Math.min(100, Math.max(5, base[i] + (seed + i * 13) % 25 - 5 + (i >= 8 && i <= 14 ? 15 : -10)));
    return { hour, weekday, weekend, label: labels[i] };
  });

  const bestWeekdayIdx = hourlyScores.reduce((max, h, i) => h.weekday > hourlyScores[max].weekday ? i : max, 0);
  const peakWindow = `${hourlyScores[bestWeekdayIdx].hour} (weekdays)`;
  const worstIdx = hourlyScores.reduce((min, h, i) => h.weekday < hourlyScores[min].weekday ? i : min, 0);
  const worstWindow = `${hourlyScores[worstIdx].hour} (weekdays)`;

  const dayAnalysis: DayAnalysis[] = [
    { day: 'Monday', score: 55 + seed % 20, bestHour: '8-9 AM', worstHour: '2-3 PM', contentAdvice: 'Motivational and planning content performs best. Audiences set intentions for the week.', audienceBehavior: 'High intent, moderate engagement. People plan but are busy — keep content scannable.' },
    { day: 'Tuesday', score: 65 + seed % 20, bestHour: '10-11 AM', worstHour: '4-5 PM', contentAdvice: 'Educational and how-to content peaks. Audiences are in learning mode mid-week.', audienceBehavior: 'Highest focus day. Longer content performs better on Tuesday than any other day.' },
    { day: 'Wednesday', score: 70 + seed % 15, bestHour: '12-1 PM', worstHour: '3-4 PM', contentAdvice: 'Mid-week engagement peak. Polls, questions, and interactive content drive highest participation.', audienceBehavior: 'Peak social energy. Community interactions and conversations thrive.' },
    { day: 'Thursday', score: 60 + seed % 20, bestHour: '1-2 PM', worstHour: '5-6 PM', contentAdvice: 'Thought leadership and opinion pieces. Audiences are reflective before the weekend.', audienceBehavior: 'Good engagement but shorter attention spans. Front-load value in first line.' },
    { day: 'Friday', score: 45 + seed % 25, bestHour: '9-10 AM', worstHour: '3-6 PM', contentAdvice: 'Light, entertaining, and behind-the-scenes content. Nobody wants heavy reads on Friday.', audienceBehavior: 'Declining focus. Quick-hit content wins. Save your best long-form for Tuesday-Wednesday.' },
    { day: 'Saturday', score: 40 + seed % 25, bestHour: '10 AM-12 PM', worstHour: '2-4 PM', contentAdvice: 'Lifestyle and inspiration content. Audiences browse casually with more time to engage.', audienceBehavior: 'Lower volume but higher engagement per post. Quality over frequency on weekends.' },
    { day: 'Sunday', score: 50 + seed % 20, bestHour: '7-9 PM', worstHour: '6-9 AM', contentAdvice: 'Planning and preview content for the week ahead. "Week ahead" series perform excellently.', audienceBehavior: 'Evening surge as people prepare for Monday. Great time for newsletter-style content.' },
  ];

  const contentPerformance: ContentPerformance[] = [
    { contentType: 'Short-form Video (< 60s)', engagementRate: `${3.5 + (seed % 30) / 10}%`, reachMultiplier: `${2.5 + (seed % 20) / 10}x`, bestTime: '7-9 PM weekdays', decayCurve: 'Fast peak (2h), moderate tail (48h)', recommendation: `Post at peak hours. ${platform} algorithm favors first-hour velocity — engagement in minute 1-60 determines total reach.` },
    { contentType: 'Carousels / Multi-image', engagementRate: `${4.0 + (seed % 25) / 10}%`, reachMultiplier: `${1.8 + (seed % 15) / 10}x`, bestTime: '10 AM-12 PM weekdays', decayCurve: 'Slow peak (6h), long tail (72h+)', recommendation: 'Educational carousels perform best mid-morning when audiences have attention. Saves drive extended reach.' },
    { contentType: 'Text-only / Threads', engagementRate: `${2.0 + (seed % 20) / 10}%`, reachMultiplier: `${1.2 + (seed % 10) / 10}x`, bestTime: '8-10 AM weekdays', decayCurve: 'Moderate peak (4h), short tail (24h)', recommendation: 'Hook in first line is everything. Text posts live or die in the first 30 minutes — time them when your audience is most active.' },
    { contentType: 'Stories / Ephemeral', engagementRate: `${5.0 + (seed % 30) / 10}%`, reachMultiplier: `${0.8 + (seed % 5) / 10}x`, bestTime: '12-1 PM & 8-9 PM', decayCurve: '24h lifespan, front-loaded engagement', recommendation: 'Post stories when audience is online — no algorithm to help you. Lunch and evening are the two windows.' },
    { contentType: 'Long-form Video (3-10 min)', engagementRate: `${1.5 + (seed % 15) / 10}%`, reachMultiplier: `${3.0 + (seed % 25) / 10}x`, bestTime: 'Tue-Thu 10 AM-2 PM', decayCurve: 'Very slow peak (24h), very long tail (weeks)', recommendation: 'Long-form has the longest shelf life. Post mid-week when attention is highest. Repurpose clips as short-form.' },
    { contentType: 'Polls & Interactive', engagementRate: `${6.0 + (seed % 35) / 10}%`, reachMultiplier: `${1.5 + (seed % 10) / 10}x`, bestTime: 'Wed-Thu 11 AM-1 PM', decayCurve: 'Fast peak (3h), rapid decay (12h)', recommendation: 'Highest raw engagement but shortest lifespan. Use to boost algorithm signals before posting your best content.' },
  ];

  const seasonalPatterns: SeasonalPattern[] = [
    { period: 'January - March (Q1)', trend: 'High intent, fresh-start energy', engagementShift: '+15-25% on educational content', contentStrategy: 'Goal-setting, how-to guides, and "new year new strategy" content. Audiences are hungry to learn.', opportunity: `${industry} audiences are budgeting and planning. Position ${brand} as the essential resource for Q1 execution.` },
    { period: 'April - June (Q2)', trend: 'Execution mode, mid-year push', engagementShift: 'Stable baseline, +10% on tactical content', contentStrategy: 'Case studies, ROI content, and progress-check frameworks. People want validation they\'re on track.', opportunity: 'Conference season drives social conversation. Tap into industry events for relevance and reach.' },
    { period: 'July - August (Summer)', trend: 'Seasonal dip, casual consumption', engagementShift: '-10-20% overall, +15% on entertainment', contentStrategy: 'Lighter content, behind-the-scenes, and evergreen republishes. Don\'t waste your best content here.', opportunity: 'Competitors slow down in summer. Consistent posting during the dip builds disproportionate audience share.' },
    { period: 'September - October (Q4 Prep)', trend: 'Back-to-business surge', engagementShift: '+20-30% across all formats', contentStrategy: 'Peak content season. Publish your best research, guides, and thought leadership. Audiences are most receptive.', opportunity: `This is when ${brand} should launch major content initiatives. The audience is primed and competitors are catching up.` },
    { period: 'November - December (Q4)', trend: 'Budget season + holiday distraction', engagementShift: '+25% on planning content, -15% on casual', contentStrategy: 'Year-in-review, predictions, and planning content for next year. Budget-holders are making decisions.', opportunity: `Decision-makers allocate budgets in Q4. Content that helps them justify spending on ${industry.toLowerCase()} wins.` },
  ];

  const postingWindows: PostingWindow[] = [
    { window: 'Early Bird (6-8 AM)', score: 35 + seed % 25, reason: 'Catches commuters and early risers. Lower competition but smaller audience.', contentTypes: 'News, quick tips, motivational quotes', competition: 'Low — most brands post later. Early movers get algorithmic head start.' },
    { window: 'Morning Peak (8-11 AM)', score: 65 + seed % 25, reason: 'Work-start browsing. Highest intent audience — people actively seeking content.', contentTypes: 'Educational, how-to, industry news, threads', competition: 'High — every brand targets this window. Quality must be exceptional to stand out.' },
    { window: 'Lunch Rush (11 AM-1 PM)', score: 75 + seed % 20, reason: 'Lunch break scrolling is the highest-volume window. People have time and desire entertainment.', contentTypes: 'Interactive, polls, carousels, short video', competition: 'Very high — optimal for engagement but crowded. Use interactive formats to differentiate.' },
    { window: 'Afternoon Lull (1-4 PM)', score: 30 + seed % 20, reason: 'Post-lunch energy dip. Engagement drops as people focus on work or feel sluggish.', contentTypes: 'Light content, memes, reposts, stories', competition: 'Low — most brands avoid this window. Can be strategic for niche audiences.' },
    { window: 'Evening Prime (6-9 PM)', score: 80 + seed % 15, reason: 'Relaxation scrolling peak. Longest session times. People consume more content with less hurry.', contentTypes: 'Video, storytelling, long-form, carousels', competition: 'Moderate-High — B2C brands dominate. B2B has less competition in this window.' },
    { window: 'Night Owl (9 PM-12 AM)', score: 45 + seed % 20, reason: 'Niche but loyal audience. Late-night scrollers engage deeply when they find good content.', contentTypes: 'Personality-driven, behind-the-scenes, casual', competition: 'Very low — underserved window with surprisingly strong engagement per impression.' },
  ];

  const decayCurves: DecayCurve[] = [
    { contentType: 'Short-form Video', peakHour: '0-2 hours', halfLife: '6-12 hours', longTail: 'Minimal after 48h unless algorithm resurfaces', revivalStrategy: 'Reshare as a story at a different time. Re-edit with new hook. Cross-post to different platform.' },
    { contentType: 'Carousels', peakHour: '2-6 hours', halfLife: '24-36 hours', longTail: 'Strong — saves and shares extend reach for 72h+', revivalStrategy: 'Update data and repost quarterly. Convert top slides into individual posts. Pin to profile.' },
    { contentType: 'Text Posts', peakHour: '0-1 hour', halfLife: '4-8 hours', longTail: 'Very short — text is ephemeral on most platforms', revivalStrategy: 'Screenshot high-performing text posts and reshare as images. Expand into thread or carousel.' },
    { contentType: 'Long-form Video', peakHour: '12-48 hours', halfLife: '1-2 weeks', longTail: 'Excellent — SEO and suggested content drive ongoing views', revivalStrategy: 'Cut into clips monthly. Update title/thumbnail for seasonal relevance. Embed in blog posts.' },
    { contentType: 'Stories', peakHour: '0-4 hours', halfLife: '8 hours', longTail: 'None — 24h lifespan', revivalStrategy: 'Save to highlights. Best-performing stories become permanent carousel or video content.' },
    { contentType: 'Polls & Interactive', peakHour: '0-3 hours', halfLife: '6-10 hours', longTail: 'Short but data lives on — use results in future content', revivalStrategy: 'Share results as a follow-up post. "You voted, here are the results" drives second wave of engagement.' },
  ];

  const recommendations: Recommendation[] = [
    { category: 'Timing', action: `Shift your primary posting window to ${postingWindows.sort((a, b) => b.score - a.score)[0].window} — this is your highest-scoring engagement window`, expectedImpact: '+20-35% engagement rate within 2 weeks', priority: 'Critical', effort: 'Low — just change your scheduling time' },
    { category: 'Content Mix', action: 'Increase interactive content (polls, quizzes) to 20% of your weekly output — use them to prime the algorithm before your best posts', expectedImpact: '+15-25% average reach across all content', priority: 'High', effort: 'Low — interactive content is fastest to create' },
    { category: 'Frequency', action: `Based on "${frequency}" frequency and ${platform} algorithm behavior, ${frequency.includes('1-3') ? 'increase to 4-5 posts/week' : frequency.includes('5+') ? 'reduce to 1-2 quality posts/day' : 'maintain current pace but batch-schedule for optimal windows'}`, expectedImpact: '+10-20% overall engagement through timing optimization', priority: 'High', effort: 'Medium — requires content calendar restructuring' },
    { category: 'Format', action: `Your ${industry.toLowerCase()} audience on ${platform} responds best to carousel and short-video formats. Allocate 60%+ of content to these two formats.`, expectedImpact: '+25-40% engagement by matching format to platform preference', priority: 'Critical', effort: 'Medium — may require new content creation skills' },
    { category: 'Decay Management', action: 'Implement a "revival schedule": reshare top content at 7 days, 30 days, and 90 days in different formats', expectedImpact: '+30-50% total lifetime engagement per piece of content', priority: 'High', effort: 'Low — repurpose what already works' },
    { category: 'Seasonal', action: 'Frontload your best content for September-October and January-February. Save lightweight content for July-August.', expectedImpact: '+15-25% annual engagement by aligning quality with attention cycles', priority: 'Medium', effort: 'Low — adjust editorial calendar' },
  ];

  return { overallEngagementScore, peakWindow, worstWindow, hourlyScores, dayAnalysis, contentPerformance, seasonalPatterns, postingWindows, decayCurves, recommendations };
}

export default function EngagementHeatmapPage() {
  const [platform, setPlatform] = useState<string>(platforms[0]);
  const [frequency, setFrequency] = useState<string>(frequencies[1]);
  const [industry, setIndustry] = useState<string>(industries[0]);
  const [brand, setBrand] = useState('');
  const [report, setReport] = useState<HeatmapReport | null>(null);

  const generate = () => { if (brand.trim()) setReport(generateHeatmap(platform, frequency, industry, brand)); };

  const getHeatColor = (score: number) => {
    if (score >= 80) return 'bg-amber-400 text-black';
    if (score >= 60) return 'bg-amber-500/70 text-white';
    if (score >= 40) return 'bg-amber-600/50 text-white';
    if (score >= 20) return 'bg-amber-900/40 text-gray-300';
    return 'bg-gray-800 text-gray-500';
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 rounded-full text-sm font-medium">Analytics Intelligence</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Engagement Heatmap</h1>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">Visualize when and what content performs best. Discover optimal posting windows, content format performance, and seasonal patterns to maximize engagement.</p>
        </div>

        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Primary Platform</label>
              <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white">{platforms.map(p => <option key={p}>{p}</option>)}</select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Posting Frequency</label>
              <select value={frequency} onChange={e => setFrequency(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white">{frequencies.map(f => <option key={f}>{f}</option>)}</select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Industry</label>
              <select value={industry} onChange={e => setIndustry(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white">{industries.map(i => <option key={i}>{i}</option>)}</select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Brand Name</label>
              <input value={brand} onChange={e => setBrand(e.target.value)} placeholder="e.g., Acme Co" className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white" />
            </div>
          </div>
          <button onClick={generate} className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 transition-all">Generate Engagement Heatmap</button>
        </div>

        {report && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 text-center">
                <div className={`text-3xl font-bold ${report.overallEngagementScore > 70 ? 'text-amber-400' : report.overallEngagementScore > 50 ? 'text-yellow-400' : 'text-red-400'}`}>{report.overallEngagementScore}/100</div>
                <div className="text-sm text-gray-400 mt-1">Engagement Optimization Score</div>
              </div>
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 text-center">
                <div className="text-xl font-bold text-amber-400">{report.peakWindow}</div>
                <div className="text-sm text-gray-400 mt-1">Peak Engagement Window</div>
              </div>
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 text-center">
                <div className="text-xl font-bold text-red-400">{report.worstWindow}</div>
                <div className="text-sm text-gray-400 mt-1">Lowest Engagement Window</div>
              </div>
            </div>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-amber-300">Hourly Engagement Heatmap</h2>
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 overflow-x-auto">
                <div className="min-w-[600px]">
                  <div className="grid grid-cols-[100px_1fr_1fr_1fr] gap-1 mb-2">
                    <div className="text-xs text-gray-500 font-medium">Time</div>
                    <div className="text-xs text-gray-500 font-medium text-center">Weekday</div>
                    <div className="text-xs text-gray-500 font-medium text-center">Weekend</div>
                    <div className="text-xs text-gray-500 font-medium">Why</div>
                  </div>
                  {report.hourlyScores.map((h, i) => (
                    <div key={i} className="grid grid-cols-[100px_1fr_1fr_1fr] gap-1 mb-1">
                      <div className="text-xs text-gray-400 py-1">{h.hour}</div>
                      <div className={`rounded px-2 py-1 text-xs text-center font-mono ${getHeatColor(h.weekday)}`}>{h.weekday}</div>
                      <div className={`rounded px-2 py-1 text-xs text-center font-mono ${getHeatColor(h.weekend)}`}>{h.weekend}</div>
                      <div className="text-xs text-gray-500 py-1 truncate">{h.label}</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                  <span>Low</span>
                  <div className="flex gap-0.5">
                    <div className="w-6 h-3 rounded bg-gray-800" />
                    <div className="w-6 h-3 rounded bg-amber-900/40" />
                    <div className="w-6 h-3 rounded bg-amber-600/50" />
                    <div className="w-6 h-3 rounded bg-amber-500/70" />
                    <div className="w-6 h-3 rounded bg-amber-400" />
                  </div>
                  <span>High</span>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-amber-300">Day-of-Week Analysis</h2>
              <div className="space-y-3">{report.dayAnalysis.map((d, i) => (
                <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">{d.day}</h3>
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-gray-700 rounded-full h-2"><div className={`h-2 rounded-full ${d.score > 65 ? 'bg-amber-400' : d.score > 50 ? 'bg-yellow-400' : 'bg-orange-400'}`} style={{ width: `${d.score}%` }} /></div>
                      <span className="font-mono text-sm text-amber-300">{d.score}/100</span>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    <div><span className="text-gray-500">Best hour:</span> <span className="text-amber-300">{d.bestHour}</span></div>
                    <div><span className="text-gray-500">Worst hour:</span> <span className="text-red-300">{d.worstHour}</span></div>
                    <div><span className="text-gray-500">Content:</span> <span className="text-gray-300">{d.contentAdvice}</span></div>
                    <div><span className="text-gray-500">Audience:</span> <span className="text-gray-300">{d.audienceBehavior}</span></div>
                  </div>
                </div>
              ))}</div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-amber-300">Content Type Performance Matrix</h2>
              <div className="overflow-x-auto"><table className="w-full text-sm">
                <thead><tr className="border-b border-gray-700">{['Content Type', 'Engagement', 'Reach', 'Best Time', 'Decay', 'Recommendation'].map(h => <th key={h} className="text-left py-2 px-3 text-gray-400 font-medium">{h}</th>)}</tr></thead>
                <tbody>{report.contentPerformance.map((c, i) => <tr key={i} className="border-b border-gray-800">
                  <td className="py-2 px-3 text-white font-medium">{c.contentType}</td>
                  <td className="py-2 px-3 text-amber-300">{c.engagementRate}</td>
                  <td className="py-2 px-3 text-orange-300">{c.reachMultiplier}</td>
                  <td className="py-2 px-3 text-teal-300">{c.bestTime}</td>
                  <td className="py-2 px-3 text-gray-400">{c.decayCurve}</td>
                  <td className="py-2 px-3 text-gray-300">{c.recommendation}</td>
                </tr>)}</tbody>
              </table></div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-amber-300">Seasonal Patterns</h2>
              <div className="space-y-3">{report.seasonalPatterns.map((s, i) => (
                <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">{s.period}</h3>
                    <span className="text-sm text-amber-300">{s.engagementShift}</span>
                  </div>
                  <div className="text-sm mb-1"><span className="text-gray-500">Trend:</span> <span className="text-gray-300">{s.trend}</span></div>
                  <div className="text-sm mb-1"><span className="text-gray-500">Strategy:</span> <span className="text-gray-300">{s.contentStrategy}</span></div>
                  <div className="text-sm"><span className="text-gray-500">Opportunity:</span> <span className="text-amber-300">{s.opportunity}</span></div>
                </div>
              ))}</div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-amber-300">Optimal Posting Windows</h2>
              <div className="space-y-3">{report.postingWindows.map((w, i) => (
                <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">{w.window}</h3>
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-gray-700 rounded-full h-2"><div className={`h-2 rounded-full ${w.score > 65 ? 'bg-amber-400' : w.score > 45 ? 'bg-yellow-400' : 'bg-gray-500'}`} style={{ width: `${w.score}%` }} /></div>
                      <span className="font-mono text-sm text-amber-300">{w.score}/100</span>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    <div><span className="text-gray-500">Why:</span> <span className="text-gray-300">{w.reason}</span></div>
                    <div><span className="text-gray-500">Best for:</span> <span className="text-teal-300">{w.contentTypes}</span></div>
                    <div className="md:col-span-2"><span className="text-gray-500">Competition:</span> <span className="text-orange-300">{w.competition}</span></div>
                  </div>
                </div>
              ))}</div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-amber-300">Engagement Decay Curves</h2>
              <div className="overflow-x-auto"><table className="w-full text-sm">
                <thead><tr className="border-b border-gray-700">{['Content Type', 'Peak', 'Half-Life', 'Long Tail', 'Revival Strategy'].map(h => <th key={h} className="text-left py-2 px-3 text-gray-400 font-medium">{h}</th>)}</tr></thead>
                <tbody>{report.decayCurves.map((d, i) => <tr key={i} className="border-b border-gray-800">
                  <td className="py-2 px-3 text-white font-medium">{d.contentType}</td>
                  <td className="py-2 px-3 text-amber-300">{d.peakHour}</td>
                  <td className="py-2 px-3 text-orange-300">{d.halfLife}</td>
                  <td className="py-2 px-3 text-gray-400">{d.longTail}</td>
                  <td className="py-2 px-3 text-teal-300">{d.revivalStrategy}</td>
                </tr>)}</tbody>
              </table></div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-amber-300">Recommendations</h2>
              <div className="space-y-3">{report.recommendations.map((r, i) => (
                <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">{r.category}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">{r.effort}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${r.priority === 'Critical' ? 'bg-red-500/20 text-red-400' : r.priority === 'High' ? 'bg-orange-500/20 text-orange-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{r.priority}</span>
                    </div>
                  </div>
                  <div className="text-sm mb-1"><span className="text-gray-300">{r.action}</span></div>
                  <div className="text-sm"><span className="text-gray-500">Expected impact:</span> <span className="text-amber-300">{r.expectedImpact}</span></div>
                </div>
              ))}</div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
