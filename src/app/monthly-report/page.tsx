'use client';
import { useState } from 'react';

const platforms = ['All Platforms', 'Instagram', 'Twitter/X', 'LinkedIn', 'TikTok', 'Facebook', 'YouTube'] as const;
const reportPeriods = ['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'Custom Range'] as const;
const businessTypes = ['Creator/Influencer', 'SaaS/Tech', 'E-commerce', 'Agency', 'Local Business', 'Non-Profit', 'Media/Publisher', 'Personal Brand'] as const;
const goals = ['Grow Followers', 'Increase Engagement', 'Drive Traffic', 'Generate Leads', 'Build Brand Awareness', 'Increase Sales', 'Community Building'] as const;

interface ReportResult {
  summary: { metric: string; value: string; change: string; status: string }[];
  topContent: { type: string; description: string; engagement: string; lesson: string }[];
  platformBreakdown: { platform: string; followers: string; engagement: string; reach: string; trend: string }[];
  contentMix: { type: string; percentage: string; performance: string }[];
  audienceInsights: string[];
  weeklyTrends: { week: string; highlights: string; lowPoints: string }[];
  actionItems: { priority: string; action: string; expectedImpact: string }[];
  competitorBenchmark: { metric: string; you: string; industry: string; gap: string }[];
  recommendations: string[];
  reportSections: string[];
}

function generateReport(platform: string, period: string, business: string, goal: string, followers: string, engRate: string): ReportResult {
  const followerCount = parseInt(followers) || 5000;
  const engagement = parseFloat(engRate) || 3.2;
  const isGood = engagement > 3;

  return {
    summary: [
      { metric: 'Total Followers', value: followerCount.toLocaleString(), change: `+${Math.floor(followerCount * 0.03)}`, status: '📈' },
      { metric: 'Engagement Rate', value: `${engagement}%`, change: isGood ? '+0.4%' : '-0.2%', status: isGood ? '📈' : '📉' },
      { metric: 'Total Reach', value: `${Math.floor(followerCount * 4.2).toLocaleString()}`, change: '+12%', status: '📈' },
      { metric: 'Total Impressions', value: `${Math.floor(followerCount * 8.5).toLocaleString()}`, change: '+8%', status: '📈' },
      { metric: 'Profile Visits', value: `${Math.floor(followerCount * 0.15).toLocaleString()}`, change: '+18%', status: '📈' },
      { metric: 'Link Clicks', value: `${Math.floor(followerCount * 0.02).toLocaleString()}`, change: '+5%', status: '📈' },
      { metric: 'Saves/Bookmarks', value: `${Math.floor(followerCount * 0.01).toLocaleString()}`, change: '+22%', status: '🔥' },
      { metric: 'Shares', value: `${Math.floor(followerCount * 0.008).toLocaleString()}`, change: '+15%', status: '📈' },
    ],
    topContent: [
      { type: 'Carousel', description: 'Educational carousel about industry trends', engagement: '8.4%', lesson: 'Educational content with actionable takeaways drives saves and shares' },
      { type: 'Meme/Humor', description: 'Relatable industry meme with trending format', engagement: '7.2%', lesson: 'Humor content drives shares — the #1 metric for algorithmic reach' },
      { type: 'Video/Reel', description: 'Behind-the-scenes + tip format (< 30s)', engagement: '6.8%', lesson: 'Short-form video with text overlay outperforms talking head' },
      { type: 'Thread', description: 'Breakdown of a case study with numbers', engagement: '5.9%', lesson: 'Data-driven threads get bookmarked — long shelf life content' },
      { type: 'Poll/Question', description: 'Industry opinion poll with hot take', engagement: '5.5%', lesson: 'Interactive content boosts comment count which feeds the algorithm' },
    ],
    platformBreakdown: [
      { platform: 'Instagram', followers: Math.floor(followerCount * 0.4).toLocaleString(), engagement: `${(engagement * 1.1).toFixed(1)}%`, reach: `${Math.floor(followerCount * 1.5).toLocaleString()}`, trend: '📈 +5%' },
      { platform: 'Twitter/X', followers: Math.floor(followerCount * 0.25).toLocaleString(), engagement: `${(engagement * 0.8).toFixed(1)}%`, reach: `${Math.floor(followerCount * 2).toLocaleString()}`, trend: '📈 +8%' },
      { platform: 'LinkedIn', followers: Math.floor(followerCount * 0.2).toLocaleString(), engagement: `${(engagement * 1.5).toFixed(1)}%`, reach: `${Math.floor(followerCount * 0.8).toLocaleString()}`, trend: '🔥 +15%' },
      { platform: 'TikTok', followers: Math.floor(followerCount * 0.15).toLocaleString(), engagement: `${(engagement * 2).toFixed(1)}%`, reach: `${Math.floor(followerCount * 5).toLocaleString()}`, trend: '📈 +12%' },
    ],
    contentMix: [
      { type: 'Educational/Value', percentage: '40%', performance: isGood ? '⭐ Strong' : '⚡ Needs more' },
      { type: 'Entertainment/Memes', percentage: '20%', performance: '⭐ Strong' },
      { type: 'Promotional', percentage: '15%', performance: '⚡ Watch ratio' },
      { type: 'Behind-the-Scenes', percentage: '10%', performance: '⭐ Strong' },
      { type: 'User-Generated', percentage: '10%', performance: isGood ? '⭐ Strong' : '⚡ Under-utilized' },
      { type: 'Community/Engagement', percentage: '5%', performance: '⚡ Increase this' },
    ],
    audienceInsights: [
      `Peak active hours: 9-11am and 7-9pm (${platform === 'LinkedIn' ? 'weekdays' : 'all week'})`,
      `Top demographics: 25-34 age group (42%), followed by 18-24 (28%)`,
      `Geographic: 60% domestic, 15% UK/AU, 25% international`,
      `Most engaged segment: ${business === 'SaaS/Tech' ? 'Founders and product managers' : business === 'Creator/Influencer' ? 'Aspiring creators and small businesses' : 'Decision-makers in your niche'}`,
      `Content preference: Carousel > Video > Image > Text-only`,
      `Unfollows mostly happen after 3+ promotional posts in a row`,
    ],
    weeklyTrends: [
      { week: 'Week 1', highlights: 'Carousel post went semi-viral (3x avg reach)', lowPoints: 'Two text-only posts underperformed (-40% vs avg)' },
      { week: 'Week 2', highlights: 'Meme content drove record shares', lowPoints: 'Sunday posting experiment failed (50% less engagement)' },
      { week: 'Week 3', highlights: 'Thread format tested — great save rate', lowPoints: 'Repost of old content did poorly' },
      { week: 'Week 4', highlights: 'Collaboration post brought 200+ new followers', lowPoints: 'Engagement dip mid-week (likely algorithm shift)' },
    ],
    actionItems: [
      { priority: '🔴 High', action: 'Double down on carousel content — your top performer', expectedImpact: '+20% avg engagement' },
      { priority: '🔴 High', action: `Post at optimal times (${platform === 'LinkedIn' ? '8-10am Tue-Thu' : '9-11am and 7-9pm'})`, expectedImpact: '+15% reach' },
      { priority: '🟡 Medium', action: 'Add more community/engagement posts (polls, questions)', expectedImpact: '+10% comment rate' },
      { priority: '🟡 Medium', action: 'Create a meme backlog — use 2x/week as engagement boosters', expectedImpact: '+25% shares' },
      { priority: '🟢 Low', action: 'Test LinkedIn newsletters if not already active', expectedImpact: 'New audience channel' },
      { priority: '🟢 Low', action: 'Repurpose top 5 posts from this month into different formats', expectedImpact: '5 extra content pieces with minimal effort' },
    ],
    competitorBenchmark: [
      { metric: 'Engagement Rate', you: `${engagement}%`, industry: '3.5%', gap: engagement > 3.5 ? '✅ Above avg' : '⚠️ Below avg' },
      { metric: 'Post Frequency', you: '4-5/week', industry: '5-7/week', gap: '⚠️ Slightly under' },
      { metric: 'Follower Growth', you: '+3%/mo', industry: '+2-4%/mo', gap: '✅ On track' },
      { metric: 'Video Content %', you: '20%', industry: '35%', gap: '⚠️ Increase video' },
      { metric: 'Response Time', you: '< 2 hrs', industry: '< 4 hrs', gap: '✅ Above avg' },
    ],
    recommendations: [
      `Focus on ${goal.toLowerCase()} — align every post with this primary goal`,
      'Implement the 4-1-1 rule: 4 value posts, 1 soft promo, 1 hard promo per week',
      'Create a monthly content calendar with themed weeks (reduces decision fatigue)',
      `Invest in ${platform === 'TikTok' ? 'short-form video production' : platform === 'LinkedIn' ? 'thought leadership threads and newsletters' : 'carousel and reel templates'}`,
      'Set up a weekly 30-min "engagement block" — reply to every comment and DM',
      'A/B test headlines and hooks on your next 10 posts — track which patterns win',
    ],
    reportSections: [
      'Executive Summary', 'Key Metrics Dashboard', 'Content Performance Analysis',
      'Audience Growth & Demographics', 'Platform-by-Platform Breakdown',
      'Top & Bottom Performing Content', 'Competitor Benchmarking',
      'Weekly Trend Analysis', 'Content Mix Optimization',
      'Action Items & Recommendations', 'Goals Progress Tracker',
    ],
  };
}

export default function MonthlyReportPage() {
  const [platform, setPlatform] = useState<string>('All Platforms');
  const [period, setPeriod] = useState<string>('Last 30 Days');
  const [business, setBusiness] = useState<string>('Creator/Influencer');
  const [goal, setGoal] = useState<string>('Grow Followers');
  const [followers, setFollowers] = useState('5000');
  const [engRate, setEngRate] = useState('3.2');
  const [result, setResult] = useState<ReportResult | null>(null);

  const handleGenerate = () => setResult(generateReport(platform, period, business, goal, followers, engRate));

  return (
    <main className="min-h-screen bg-zinc-950 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Monthly Report Generator</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Generate comprehensive social media performance reports. <strong className="text-white">Data-driven creators grow 3x faster</strong> than those who post without tracking.</p>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div><label className="block text-sm text-zinc-400 mb-1">Platform</label><select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">{platforms.map(p => <option key={p}>{p}</option>)}</select></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Period</label><select value={period} onChange={e => setPeriod(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">{reportPeriods.map(p => <option key={p}>{p}</option>)}</select></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Business Type</label><select value={business} onChange={e => setBusiness(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">{businessTypes.map(b => <option key={b}>{b}</option>)}</select></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Primary Goal</label><select value={goal} onChange={e => setGoal(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">{goals.map(g => <option key={g}>{g}</option>)}</select></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Total Followers</label><input type="number" value={followers} onChange={e => setFollowers(e.target.value)} placeholder="5000" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600" /></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Avg Engagement Rate (%)</label><input type="number" step="0.1" value={engRate} onChange={e => setEngRate(e.target.value)} placeholder="3.2" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600" /></div>
        </div>

        <button onClick={handleGenerate} className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition">Generate Report</button>

        {result && (
          <div className="mt-10 space-y-6">
            <div className="bg-zinc-900 border border-violet-500/30 rounded-xl p-5">
              <h2 className="text-xl font-bold text-white mb-4">📊 Performance Summary ({period})</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {result.summary.map((s, i) => (
                  <div key={i} className="bg-zinc-800 rounded-lg p-3 text-center">
                    <p className="text-xs text-zinc-500">{s.metric}</p>
                    <p className="text-lg font-bold text-white">{s.value}</p>
                    <p className={`text-xs ${s.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{s.status} {s.change}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-4">🏆 Top Performing Content</h3>
              {result.topContent.map((c, i) => (
                <div key={i} className="flex items-start gap-4 mb-4 pb-4 border-b border-zinc-800 last:border-0">
                  <span className="text-2xl font-bold text-violet-400">#{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs bg-zinc-700 text-zinc-300 px-2 py-0.5 rounded">{c.type}</span>
                      <span className="text-sm font-semibold text-green-400">{c.engagement} eng.</span>
                    </div>
                    <p className="text-sm text-white mt-1">{c.description}</p>
                    <p className="text-xs text-zinc-400 mt-1">💡 {c.lesson}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-4">📱 Platform Breakdown</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="text-zinc-500 border-b border-zinc-800"><th className="text-left py-2">Platform</th><th className="text-right py-2">Followers</th><th className="text-right py-2">Engagement</th><th className="text-right py-2">Reach</th><th className="text-right py-2">Trend</th></tr></thead>
                  <tbody>{result.platformBreakdown.map((p, i) => (
                    <tr key={i} className="border-b border-zinc-800/50"><td className="py-2 text-white">{p.platform}</td><td className="text-right text-zinc-300">{p.followers}</td><td className="text-right text-zinc-300">{p.engagement}</td><td className="text-right text-zinc-300">{p.reach}</td><td className="text-right">{p.trend}</td></tr>
                  ))}</tbody>
                </table>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Content Mix Analysis</h3>
                {result.contentMix.map((c, i) => (
                  <div key={i} className="flex justify-between items-center mb-2">
                    <span className="text-sm text-zinc-300">{c.type}</span>
                    <div className="flex items-center gap-2"><span className="text-sm text-zinc-400">{c.percentage}</span><span className="text-xs">{c.performance}</span></div>
                  </div>
                ))}
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Audience Insights</h3>
                <ul className="space-y-2">{result.audienceInsights.map((a, i) => <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-violet-400">•</span>{a}</li>)}</ul>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Weekly Trends</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {result.weeklyTrends.map((w, i) => (
                  <div key={i} className="bg-zinc-800 rounded-lg p-3">
                    <h4 className="text-sm font-semibold text-violet-300 mb-2">{w.week}</h4>
                    <p className="text-xs text-green-400">✓ {w.highlights}</p>
                    <p className="text-xs text-red-400 mt-1">✕ {w.lowPoints}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Competitor Benchmark</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="text-zinc-500 border-b border-zinc-800"><th className="text-left py-2">Metric</th><th className="text-right py-2">You</th><th className="text-right py-2">Industry Avg</th><th className="text-right py-2">Status</th></tr></thead>
                  <tbody>{result.competitorBenchmark.map((c, i) => (
                    <tr key={i} className="border-b border-zinc-800/50"><td className="py-2 text-white">{c.metric}</td><td className="text-right text-zinc-300">{c.you}</td><td className="text-right text-zinc-300">{c.industry}</td><td className="text-right">{c.gap}</td></tr>
                  ))}</tbody>
                </table>
              </div>
            </div>

            <div className="bg-zinc-900 border border-violet-500/20 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-violet-400 mb-3">🎯 Action Items (Prioritized)</h3>
              {result.actionItems.map((a, i) => (
                <div key={i} className="flex items-start gap-3 mb-3 pb-3 border-b border-zinc-800 last:border-0">
                  <span className="text-sm">{a.priority}</span>
                  <div className="flex-1"><p className="text-sm text-white">{a.action}</p><p className="text-xs text-zinc-500">Expected: {a.expectedImpact}</p></div>
                </div>
              ))}
            </div>

            <div className="bg-zinc-900 border border-green-500/20 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-green-400 mb-3">Recommendations for Next Month</h3>
              <ul className="space-y-2">{result.recommendations.map((r, i) => <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-green-400">{i + 1}.</span>{r}</li>)}</ul>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-zinc-400 mb-3">Related Tools</h3>
              <div className="flex flex-wrap gap-2 text-sm">
                <a href="/social-audit" className="text-violet-400 hover:text-violet-300 underline">Social Audit</a>
                <a href="/engagement-calculator" className="text-violet-400 hover:text-violet-300 underline">Engagement Calculator</a>
                <a href="/roi-calculator" className="text-violet-400 hover:text-violet-300 underline">ROI Calculator</a>
                <a href="/competitor-tracker" className="text-violet-400 hover:text-violet-300 underline">Competitor Tracker</a>
                <a href="/growth-calculator" className="text-violet-400 hover:text-violet-300 underline">Growth Calculator</a>
                <a href="/content-scorecard" className="text-violet-400 hover:text-violet-300 underline">Content Scorecard</a>
              </div>
            </div>
          </div>
        )}

        <footer className="mt-20 border-t border-zinc-800 pt-8 pb-12">
          <div className="grid md:grid-cols-4 gap-8 text-sm text-zinc-500">
            <div><h4 className="font-semibold text-white mb-3">Analytics</h4><ul className="space-y-1"><li><a href="/monthly-report" className="hover:text-white transition">Monthly Report</a></li><li><a href="/social-audit" className="hover:text-white transition">Social Audit</a></li><li><a href="/engagement-calculator" className="hover:text-white transition">Engagement</a></li><li><a href="/roi-calculator" className="hover:text-white transition">ROI</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Creation</h4><ul className="space-y-1"><li><a href="/" className="hover:text-white transition">Posts</a></li><li><a href="/meme-generator" className="hover:text-white transition">Memes</a></li><li><a href="/carousel-generator" className="hover:text-white transition">Carousel</a></li><li><a href="/hooks" className="hover:text-white transition">Hooks</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Tracking</h4><ul className="space-y-1"><li><a href="/competitor-tracker" className="hover:text-white transition">Competitors</a></li><li><a href="/trend-tracker" className="hover:text-white transition">Trends</a></li><li><a href="/growth-calculator" className="hover:text-white transition">Growth</a></li><li><a href="/content-scorecard" className="hover:text-white transition">Scorecard</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Strategy</h4><ul className="space-y-1"><li><a href="/content-calendar" className="hover:text-white transition">Calendar</a></li><li><a href="/content-pillars" className="hover:text-white transition">Pillars</a></li><li><a href="/brand-voice" className="hover:text-white transition">Brand Voice</a></li><li><a href="/campaign" className="hover:text-white transition">Campaign</a></li></ul></div>
          </div>
          <p className="text-center text-zinc-600 text-xs mt-8">© 2026 PostCraft AI. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
