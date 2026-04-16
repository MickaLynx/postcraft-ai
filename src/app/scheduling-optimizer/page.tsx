'use client';
import { useState } from 'react';

const platforms = ['Instagram', 'LinkedIn', 'Twitter/X', 'TikTok', 'YouTube', 'Facebook', 'Pinterest'] as const;
const contentTypes = ['Image Post', 'Carousel', 'Short Video/Reel', 'Long Video', 'Story', 'Text Post', 'Live Stream', 'Poll/Quiz', 'Thread', 'Article/Blog Share'] as const;
const audiences = ['B2B Professionals', 'Gen Z Consumers', 'Millennials', 'Parents', 'Creators/Influencers', 'Small Business Owners', 'Enterprise Decision-Makers', 'General'] as const;
const timezones = ['UTC-8 (PST)', 'UTC-5 (EST)', 'UTC+0 (GMT)', 'UTC+1 (CET)', 'UTC+2 (EET)', 'UTC+5:30 (IST)', 'UTC+8 (CST/SGT)', 'UTC+9 (JST)', 'UTC+10 (AEST)'] as const;
const frequencies = ['1x/day', '2x/day', '3x/day', '1x/week', '3x/week', '5x/week', '7x/week', '14x/week'] as const;

interface ScheduleResult {
  weeklySchedule: { day: string; slots: { time: string; contentType: string; reason: string; priority: string }[] }[];
  platformInsights: { metric: string; bestTime: string; worstTime: string; tip: string }[];
  frequencyAnalysis: { recommendation: string; currentGap: string; optimalCadence: string; burnoutRisk: string };
  contentMix: { type: string; percentage: number; bestDay: string; bestTime: string }[];
  seasonalAdjustments: { period: string; adjustment: string; reason: string }[];
  automationTips: string[];
  metrics: { name: string; value: string }[];
}

function generateSchedule(
  platform: string, contentType: string, audience: string,
  timezone: string, frequency: string, currentBestPost: string
): ScheduleResult {
  const isB2B = ['B2B Professionals', 'Enterprise Decision-Makers'].includes(audience);
  const isGenZ = audience === 'Gen Z Consumers';
  const isPro = ['LinkedIn'].includes(platform);

  const tzOffset = timezone.includes('PST') ? -8 : timezone.includes('EST') ? -5 : timezone.includes('GMT') ? 0 : timezone.includes('CET') ? 1 : timezone.includes('EET') ? 2 : timezone.includes('IST') ? 5.5 : timezone.includes('CST') ? 8 : timezone.includes('JST') ? 9 : 10;

  const baseHour = (h: number) => {
    const adjusted = h + tzOffset;
    const wrapped = ((adjusted % 24) + 24) % 24;
    return `${String(Math.floor(wrapped)).padStart(2, '0')}:${wrapped % 1 === 0.5 ? '30' : '00'}`;
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const platformTimes: Record<string, { peak: number[]; offPeak: number[] }> = {
    'Instagram': { peak: [7, 12, 17, 20], offPeak: [9, 14, 22] },
    'LinkedIn': { peak: [7, 10, 12, 17], offPeak: [8, 15, 18] },
    'Twitter/X': { peak: [8, 12, 17, 21], offPeak: [6, 10, 15] },
    'TikTok': { peak: [7, 10, 19, 22], offPeak: [12, 15, 17] },
    'YouTube': { peak: [9, 12, 15, 20], offPeak: [7, 18, 22] },
    'Facebook': { peak: [9, 13, 16, 19], offPeak: [7, 11, 21] },
    'Pinterest': { peak: [8, 14, 20, 22], offPeak: [10, 16, 18] },
  };

  const times = platformTimes[platform] || platformTimes['Instagram'];
  const freqNum = frequency.includes('14') ? 14 : frequency.includes('7') ? 7 : frequency.includes('5') ? 5 : frequency.includes('3x/week') ? 3 : frequency.includes('3x/day') ? 21 : frequency.includes('2x/day') ? 14 : frequency.includes('1x/day') ? 7 : 1;

  const contentTypes2 = ['Image Post', 'Carousel', 'Short Video/Reel', 'Text Post', 'Story', 'Poll/Quiz', 'Thread'];

  const weeklySchedule = days.map((day, dayIdx) => {
    const isWeekend = dayIdx >= 5;
    const slotsPerDay = Math.max(1, Math.round(freqNum / 7));
    const slots = [];

    for (let s = 0; s < Math.min(slotsPerDay, 3); s++) {
      const timeIdx = s % times.peak.length;
      const hour = isWeekend ? times.peak[(timeIdx + 1) % times.peak.length] : times.peak[timeIdx];
      const ct = contentTypes2[(dayIdx * 3 + s) % contentTypes2.length];
      const reasons = isB2B
        ? ['Decision-makers check feeds before meetings', 'Lunch break browsing peak', 'End-of-day review and planning', 'Morning coffee scroll']
        : isGenZ
        ? ['Pre-school/work scroll', 'Lunch break peak', 'Post-work relaxation', 'Late-night browsing spike']
        : ['Morning engagement peak', 'Midday content consumption', 'Evening wind-down scroll', 'Weekend leisure browsing'];

      slots.push({
        time: baseHour(hour),
        contentType: ct,
        reason: reasons[s % reasons.length],
        priority: s === 0 ? 'High' : s === 1 ? 'Medium' : 'Low',
      });
    }

    return { day, slots };
  });

  const platformInsights = [
    { metric: 'Peak Engagement', bestTime: `${baseHour(times.peak[0])} & ${baseHour(times.peak[2])}`, worstTime: `${baseHour(2)}-${baseHour(5)}`, tip: `Post your highest-quality content at ${baseHour(times.peak[0])} — this is when ${isB2B ? 'professionals' : 'your audience'} are most active` },
    { metric: 'Best Day', bestTime: isB2B ? 'Tuesday-Thursday' : 'Wednesday & Sunday', worstTime: isB2B ? 'Saturday' : 'Monday', tip: isB2B ? 'Mid-week posts get 25% more engagement from professionals' : 'Weekend and mid-week posts perform best for consumer audiences' },
    { metric: 'Reel/Video Window', bestTime: `${baseHour(times.peak[3])} (${isGenZ ? 'late night' : 'evening'})`, worstTime: `${baseHour(times.peak[1])} (lunch — prefer carousels)`, tip: 'Short video performs best in evening hours when attention spans are longer' },
    { metric: 'Story Optimal', bestTime: `${baseHour(times.peak[0])} (morning) & ${baseHour(times.peak[3])} (evening)`, worstTime: `${baseHour(14)}-${baseHour(16)} (afternoon dip)`, tip: 'Stories at morning and evening bookend your audience\'s day' },
  ];

  const freqPerWeek = Math.min(freqNum, 21);
  const frequencyAnalysis = {
    recommendation: freqPerWeek <= 3 ? 'Increase to 5x/week — consistency beats quality at low volumes' : freqPerWeek <= 7 ? 'Good cadence. Ensure each post has a clear purpose (educate/entertain/convert)' : freqPerWeek <= 14 ? 'High volume — use content batching and repurposing to maintain quality' : 'Very high volume — risk of audience fatigue. A/B test reducing to 2x/day',
    currentGap: `At ${frequency}, you need ${freqPerWeek} pieces/week. ${freqPerWeek > 7 ? 'Consider batch creation days (2-3 hours) to stay ahead' : 'Manageable with 1-2 creation sessions per week'}`,
    optimalCadence: platform === 'TikTok' ? '1-3x/day (algorithm rewards frequency)' : platform === 'LinkedIn' ? '1x/day weekdays (quality over quantity)' : platform === 'Instagram' ? '1x/day feed + 3-5 Stories/day' : '1-2x/day for most platforms',
    burnoutRisk: freqPerWeek > 10 ? 'High — batch and schedule 2 weeks ahead' : freqPerWeek > 5 ? 'Medium — use content pillars to reduce decision fatigue' : 'Low — sustainable pace',
  };

  const contentMix = [
    { type: 'Educational/Value', percentage: 40, bestDay: isB2B ? 'Tuesday' : 'Wednesday', bestTime: baseHour(times.peak[0]) },
    { type: 'Entertaining/Relatable', percentage: 25, bestDay: isB2B ? 'Friday' : 'Saturday', bestTime: baseHour(times.peak[3]) },
    { type: 'Promotional/CTA', percentage: 15, bestDay: isB2B ? 'Thursday' : 'Sunday', bestTime: baseHour(times.peak[1]) },
    { type: 'Community/UGC', percentage: 10, bestDay: 'Wednesday', bestTime: baseHour(times.peak[2]) },
    { type: 'Behind-the-Scenes', percentage: 10, bestDay: isB2B ? 'Monday' : 'Friday', bestTime: baseHour(times.peak[0]) },
  ];

  const seasonalAdjustments = [
    { period: 'Q1 (Jan-Mar)', adjustment: 'New Year energy — increase motivational and "fresh start" content by 30%', reason: 'Resolution-driven engagement peaks in January, budget planning in B2B' },
    { period: 'Q2 (Apr-Jun)', adjustment: 'Spring refresh — focus on tutorials and how-tos', reason: 'Users are most receptive to learning content in spring' },
    { period: 'Q3 (Jul-Aug)', adjustment: 'Summer slowdown — reduce frequency 20%, increase entertainment content', reason: 'Lower engagement in summer; lighter content performs better' },
    { period: 'Q4 (Oct-Dec)', adjustment: 'Peak season — increase promotional content 40%, leverage Black Friday/holiday', reason: 'Highest purchase intent of the year; competition for attention is fierce' },
  ];

  return {
    weeklySchedule,
    platformInsights,
    frequencyAnalysis,
    contentMix,
    seasonalAdjustments,
    automationTips: [
      `Use a scheduling tool (Buffer, Later, Hootsuite) to batch-schedule ${Math.ceil(freqPerWeek * 2)} posts (2 weeks ahead)`,
      'Create content on Monday/Tuesday, schedule for the entire week',
      'Set up auto-posting for evergreen content to fill gaps',
      `Repurpose top performers: your best ${platform} post → adapt for 2-3 other platforms`,
      'Use AI tools (PostCraft!) to generate first drafts, then personalize',
      'Track engagement hourly for 30 days, then adjust this schedule to YOUR data',
      'Create a "content bank" of 20+ posts you can deploy anytime engagement dips',
    ],
    metrics: [
      { name: 'Optimal posting consistency', value: '+33% reach' },
      { name: 'Right time vs random time', value: '+79% engagement' },
      { name: 'Content variety (mixed types)', value: '+41% retention' },
      { name: 'Batch scheduling vs real-time', value: '+2.5h saved/week' },
      { name: 'Seasonal content alignment', value: '+28% relevance' },
    ],
  };
}

export default function SchedulingOptimizerPage() {
  const [platform, setPlatform] = useState<string>('Instagram');
  const [contentType, setContentType] = useState<string>('Image Post');
  const [audience, setAudience] = useState<string>('General');
  const [timezone, setTimezone] = useState<string>('UTC+1 (CET)');
  const [frequency, setFrequency] = useState<string>('1x/day');
  const [currentBestPost, setCurrentBestPost] = useState('');
  const [result, setResult] = useState<ScheduleResult | null>(null);

  const handleGenerate = () => {
    setResult(generateSchedule(platform, contentType, audience, timezone, frequency, currentBestPost.trim()));
  };

  return (
    <main className="min-h-screen bg-zinc-950 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Content Scheduling Optimizer</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Get a data-driven weekly posting schedule optimized for your platform, audience, and timezone. Posting at the right time increases engagement by <strong className="text-white">up to 79%</strong>.</p>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div><label className="block text-sm text-zinc-400 mb-1">Platform</label><select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">{platforms.map(p => <option key={p}>{p}</option>)}</select></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Primary Content Type</label><select value={contentType} onChange={e => setContentType(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">{contentTypes.map(c => <option key={c}>{c}</option>)}</select></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Target Audience</label><select value={audience} onChange={e => setAudience(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">{audiences.map(a => <option key={a}>{a}</option>)}</select></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Timezone</label><select value={timezone} onChange={e => setTimezone(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">{timezones.map(t => <option key={t}>{t}</option>)}</select></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Posting Frequency</label><select value={frequency} onChange={e => setFrequency(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">{frequencies.map(f => <option key={f}>{f}</option>)}</select></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Best-Performing Post Time</label><input type="text" value={currentBestPost} onChange={e => setCurrentBestPost(e.target.value)} placeholder="e.g., Tuesdays at 9am" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600" /></div>
        </div>

        <button onClick={handleGenerate} className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition">Optimize My Schedule</button>

        {result && (
          <div className="mt-10 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Weekly Schedule</h2>
              <div className="grid lg:grid-cols-7 gap-2">
                {result.weeklySchedule.map((d, i) => (
                  <div key={i} className={`bg-zinc-900 border rounded-xl p-3 ${i < 5 ? 'border-zinc-800' : 'border-violet-900/50'}`}>
                    <h3 className="text-white font-semibold text-sm mb-2">{d.day.slice(0, 3)}</h3>
                    {d.slots.map((s, j) => (
                      <div key={j} className="mb-2 last:mb-0">
                        <div className="flex items-center gap-1">
                          <span className={`w-1.5 h-1.5 rounded-full ${s.priority === 'High' ? 'bg-green-400' : s.priority === 'Medium' ? 'bg-yellow-400' : 'bg-zinc-600'}`} />
                          <span className="text-xs text-white font-mono">{s.time}</span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-0.5">{s.contentType}</p>
                        <p className="text-xs text-zinc-600">{s.reason}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">Platform Insights</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {result.platformInsights.map((p, i) => (
                  <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                    <h3 className="text-white font-semibold text-sm mb-2">{p.metric}</h3>
                    <div className="flex justify-between mb-1"><span className="text-xs text-green-400">Best: {p.bestTime}</span><span className="text-xs text-red-400">Worst: {p.worstTime}</span></div>
                    <p className="text-xs text-zinc-400 mt-1">{p.tip}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h2 className="text-xl font-bold text-white mb-3">Frequency Analysis</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div><p className="text-xs text-zinc-500 mb-1">Recommendation</p><p className="text-sm text-zinc-200">{result.frequencyAnalysis.recommendation}</p></div>
                <div><p className="text-xs text-zinc-500 mb-1">Current Gap</p><p className="text-sm text-zinc-200">{result.frequencyAnalysis.currentGap}</p></div>
                <div><p className="text-xs text-zinc-500 mb-1">Optimal Cadence</p><p className="text-sm text-violet-400">{result.frequencyAnalysis.optimalCadence}</p></div>
                <div><p className="text-xs text-zinc-500 mb-1">Burnout Risk</p><p className={`text-sm font-medium ${result.frequencyAnalysis.burnoutRisk.startsWith('High') ? 'text-red-400' : result.frequencyAnalysis.burnoutRisk.startsWith('Medium') ? 'text-yellow-400' : 'text-green-400'}`}>{result.frequencyAnalysis.burnoutRisk}</p></div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">Content Mix (40/25/15/10/10 Rule)</h2>
              <div className="space-y-2">
                {result.contentMix.map((c, i) => (
                  <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-white font-medium">{c.type}</span>
                      <span className="text-sm text-violet-400 font-mono">{c.percentage}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-full" style={{ width: `${c.percentage}%` }} /></div>
                    <p className="text-xs text-zinc-500 mt-1">Best: {c.bestDay} at {c.bestTime}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Seasonal Adjustments</h3>
                {result.seasonalAdjustments.map((s, i) => (
                  <div key={i} className="mb-3 last:mb-0">
                    <p className="text-sm text-violet-400 font-semibold">{s.period}</p>
                    <p className="text-xs text-zinc-300">{s.adjustment}</p>
                    <p className="text-xs text-zinc-600">{s.reason}</p>
                  </div>
                ))}
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Automation Tips</h3>
                <ul className="space-y-2">{result.automationTips.map((t, i) => <li key={i} className="text-xs text-zinc-300 flex gap-2"><span className="text-green-400 shrink-0">{i + 1}.</span>{t}</li>)}</ul>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Impact Metrics</h3>
              <div className="grid md:grid-cols-5 gap-4">{result.metrics.map((m, i) => <div key={i} className="text-center"><p className="text-lg text-green-400 font-bold">{m.value}</p><p className="text-xs text-zinc-500">{m.name}</p></div>)}</div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-zinc-400 mb-3">Related Tools</h3>
              <div className="flex flex-wrap gap-2 text-sm">
                <a href="/content-calendar" className="text-violet-400 hover:text-violet-300 underline">Content Calendar</a>
                <a href="/post-timing" className="text-violet-400 hover:text-violet-300 underline">Post Timing</a>
                <a href="/audience-persona-sync" className="text-violet-400 hover:text-violet-300 underline">Persona Sync</a>
                <a href="/content-pillars" className="text-violet-400 hover:text-violet-300 underline">Content Pillars</a>
                <a href="/bulk-generator" className="text-violet-400 hover:text-violet-300 underline">Bulk Generator</a>
                <a href="/content-flow" className="text-violet-400 hover:text-violet-300 underline">Content Flow</a>
              </div>
            </div>
          </div>
        )}

        <footer className="mt-20 border-t border-zinc-800 pt-8 pb-12">
          <div className="grid md:grid-cols-4 gap-8 text-sm text-zinc-500">
            <div><h4 className="font-semibold text-white mb-3">Creation</h4><ul className="space-y-1"><li><a href="/" className="hover:text-white transition">Posts</a></li><li><a href="/carousel-generator" className="hover:text-white transition">Carousel</a></li><li><a href="/story-planner" className="hover:text-white transition">Stories</a></li><li><a href="/social-proof" className="hover:text-white transition">Social Proof</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Scheduling</h4><ul className="space-y-1"><li><a href="/scheduling-optimizer" className="hover:text-white transition">Schedule Optimizer</a></li><li><a href="/content-calendar" className="hover:text-white transition">Calendar</a></li><li><a href="/post-timing" className="hover:text-white transition">Post Timing</a></li><li><a href="/content-flow" className="hover:text-white transition">Content Flow</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Analytics</h4><ul className="space-y-1"><li><a href="/growth-calculator" className="hover:text-white transition">Growth</a></li><li><a href="/content-scorecard" className="hover:text-white transition">Score Card</a></li><li><a href="/engagement-calculator" className="hover:text-white transition">Engagement</a></li><li><a href="/roi-calculator" className="hover:text-white transition">ROI</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Strategy</h4><ul className="space-y-1"><li><a href="/brand-voice" className="hover:text-white transition">Brand Voice</a></li><li><a href="/audience-persona-sync" className="hover:text-white transition">Persona Sync</a></li><li><a href="/campaign" className="hover:text-white transition">Campaign</a></li><li><a href="/ab-testing" className="hover:text-white transition">A/B Testing</a></li></ul></div>
          </div>
          <p className="text-center text-zinc-600 text-xs mt-8">© 2026 PostCraft AI. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
