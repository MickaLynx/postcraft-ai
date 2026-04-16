'use client';
import { useState } from 'react';

const platforms = ['Twitter/X', 'LinkedIn', 'Instagram', 'TikTok', 'Facebook', 'YouTube'] as const;

interface CalcResult {
  engagementRate: number;
  rating: string;
  benchmarks: { platform: string; average: number; good: number; excellent: number }[];
  tips: string[];
  projections: { metric: string; current: string; optimized: string }[];
}

const benchmarkData: Record<string, { average: number; good: number; excellent: number }> = {
  'Twitter/X': { average: 0.5, good: 1.5, excellent: 3.0 },
  LinkedIn: { average: 2.0, good: 4.0, excellent: 6.0 },
  Instagram: { average: 1.5, good: 3.5, excellent: 6.0 },
  TikTok: { average: 3.0, good: 6.0, excellent: 10.0 },
  Facebook: { average: 0.5, good: 1.0, excellent: 3.0 },
  YouTube: { average: 2.0, good: 5.0, excellent: 8.0 },
};

export default function EngagementCalculatorPage() {
  const [platform, setPlatform] = useState<string>('Instagram');
  const [followers, setFollowers] = useState('');
  const [likes, setLikes] = useState('');
  const [comments, setComments] = useState('');
  const [shares, setShares] = useState('');
  const [saves, setSaves] = useState('');
  const [views, setViews] = useState('');
  const [result, setResult] = useState<CalcResult | null>(null);

  function calculate() {
    const f = Number(followers) || 1;
    const l = Number(likes) || 0;
    const c = Number(comments) || 0;
    const s = Number(shares) || 0;
    const sv = Number(saves) || 0;
    const v = Number(views) || 0;

    const totalEngagement = l + c + s + sv;
    const engagementRate = (totalEngagement / f) * 100;
    const bench = benchmarkData[platform] || benchmarkData['Instagram'];

    let rating = 'Below Average';
    if (engagementRate >= bench.excellent) rating = 'Excellent';
    else if (engagementRate >= bench.good) rating = 'Good';
    else if (engagementRate >= bench.average) rating = 'Average';

    const tips: string[] = [];
    if (c / f < 0.005) tips.push('Your comment rate is low — try asking questions in your captions to boost conversation');
    if (s / f < 0.002) tips.push('Low share rate — create more shareable content (tips, infographics, controversial takes)');
    if (sv / f < 0.003 && (platform === 'Instagram' || platform === 'TikTok')) tips.push('Saves are low — post educational content, tutorials, and checklists that people want to revisit');
    if (l / f < bench.average / 100) tips.push('Like rate is below average — experiment with different content formats and posting times');
    if (v > 0 && totalEngagement / v < 0.03) tips.push('View-to-engagement ratio is low — your hook is working but content isn\'t compelling enough to engage');
    if (engagementRate < bench.average) tips.push('Consider reducing posting frequency and focusing on quality over quantity');
    if (engagementRate >= bench.good) tips.push('Great engagement! Consider monetizing through sponsored content or digital products');
    if (tips.length === 0) tips.push('Your metrics look solid — focus on consistency and testing new content formats');

    const optimizedRate = Math.min(engagementRate * 1.5, bench.excellent);
    const projections = [
      { metric: 'Engagement Rate', current: `${engagementRate.toFixed(2)}%`, optimized: `${optimizedRate.toFixed(2)}%` },
      { metric: 'Likes per Post', current: l.toLocaleString(), optimized: Math.round(l * 1.5).toLocaleString() },
      { metric: 'Comments per Post', current: c.toLocaleString(), optimized: Math.round(c * 2).toLocaleString() },
      { metric: 'Monthly Reach (est.)', current: `${(f * 0.3).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, optimized: `${(f * 0.6).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}` },
    ];

    setResult({
      engagementRate,
      rating,
      benchmarks: Object.entries(benchmarkData).map(([p, b]) => ({ platform: p, ...b })),
      tips,
      projections,
    });
  }

  function rateColor(rate: number) {
    const bench = benchmarkData[platform] || benchmarkData['Instagram'];
    if (rate >= bench.excellent) return 'text-green-400';
    if (rate >= bench.good) return 'text-blue-400';
    if (rate >= bench.average) return 'text-yellow-400';
    return 'text-red-400';
  }

  return (
    <main className="min-h-screen">
      <section className="px-6 py-20 max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">
          Free <span className="gradient-text">Engagement Rate Calculator</span>
        </h1>
        <p className="text-zinc-400 text-lg mb-2 max-w-2xl mx-auto">
          Calculate your real engagement rate across any platform. Compare against industry benchmarks and get personalized tips to improve.
        </p>
        <p className="text-zinc-500 text-sm mb-8">Trusted by 20,000+ creators and marketers</p>
      </section>

      <section className="px-6 pb-10 max-w-4xl mx-auto">
        <div className="glass rounded-2xl p-8">
          <h2 className="text-xl font-semibold mb-6">Enter Your Metrics</h2>

          <div className="mb-6">
            <label className="block text-zinc-400 text-sm mb-1">Platform</label>
            <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full bg-zinc-800 rounded-lg px-4 py-3 text-white">
              {platforms.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-zinc-400 text-sm mb-1">Total Followers</label>
              <input type="number" value={followers} onChange={e => setFollowers(e.target.value)} placeholder="10,000" className="w-full bg-zinc-800 rounded-lg px-4 py-3 text-white" />
            </div>
            <div>
              <label className="block text-zinc-400 text-sm mb-1">Avg Likes/Post</label>
              <input type="number" value={likes} onChange={e => setLikes(e.target.value)} placeholder="200" className="w-full bg-zinc-800 rounded-lg px-4 py-3 text-white" />
            </div>
            <div>
              <label className="block text-zinc-400 text-sm mb-1">Avg Comments/Post</label>
              <input type="number" value={comments} onChange={e => setComments(e.target.value)} placeholder="15" className="w-full bg-zinc-800 rounded-lg px-4 py-3 text-white" />
            </div>
            <div>
              <label className="block text-zinc-400 text-sm mb-1">Avg Shares/Post</label>
              <input type="number" value={shares} onChange={e => setShares(e.target.value)} placeholder="5" className="w-full bg-zinc-800 rounded-lg px-4 py-3 text-white" />
            </div>
            <div>
              <label className="block text-zinc-400 text-sm mb-1">Avg Saves/Post</label>
              <input type="number" value={saves} onChange={e => setSaves(e.target.value)} placeholder="10" className="w-full bg-zinc-800 rounded-lg px-4 py-3 text-white" />
            </div>
            <div>
              <label className="block text-zinc-400 text-sm mb-1">Avg Views (optional)</label>
              <input type="number" value={views} onChange={e => setViews(e.target.value)} placeholder="5000" className="w-full bg-zinc-800 rounded-lg px-4 py-3 text-white" />
            </div>
          </div>

          <button onClick={calculate} disabled={!followers || !likes} className="w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition disabled:opacity-50">
            Calculate Engagement Rate
          </button>
        </div>
      </section>

      {result && (
        <section className="px-6 pb-10 max-w-4xl mx-auto space-y-6">
          {/* Main Result */}
          <div className="glass rounded-2xl p-8 text-center">
            <p className="text-zinc-400 text-sm mb-2">Your Engagement Rate on {platform}</p>
            <p className={`text-7xl font-bold ${rateColor(result.engagementRate)}`}>{result.engagementRate.toFixed(2)}<span className="text-3xl">%</span></p>
            <p className={`text-xl font-semibold mt-2 ${rateColor(result.engagementRate)}`}>{result.rating}</p>
            <p className="text-zinc-500 text-sm mt-2">Formula: (Likes + Comments + Shares + Saves) / Followers × 100</p>
          </div>

          {/* Benchmarks Table */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-4">Industry Benchmarks (2026)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-zinc-400 border-b border-zinc-800">
                    <th className="text-left py-2">Platform</th>
                    <th className="text-center py-2">Average</th>
                    <th className="text-center py-2">Good</th>
                    <th className="text-center py-2">Excellent</th>
                    <th className="text-center py-2">Your Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {result.benchmarks.map(b => (
                    <tr key={b.platform} className={`border-b border-zinc-800/50 ${b.platform === platform ? 'bg-zinc-800/30' : ''}`}>
                      <td className="py-2 font-medium">{b.platform}</td>
                      <td className="text-center text-yellow-400">{b.average}%</td>
                      <td className="text-center text-blue-400">{b.good}%</td>
                      <td className="text-center text-green-400">{b.excellent}%</td>
                      <td className="text-center">{b.platform === platform ? <span className={`font-bold ${rateColor(result.engagementRate)}`}>{result.engagementRate.toFixed(2)}%</span> : '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Growth Projections */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-4">Growth Projections</h3>
            <p className="text-zinc-400 text-sm mb-4">What your metrics could look like with optimized content strategy:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {result.projections.map(p => (
                <div key={p.metric} className="bg-zinc-800/50 rounded-xl p-4 text-center">
                  <p className="text-zinc-400 text-xs mb-2">{p.metric}</p>
                  <p className="text-zinc-500 text-sm line-through">{p.current}</p>
                  <p className="text-green-400 text-lg font-bold">{p.optimized}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-4">Personalized Recommendations</h3>
            <ul className="space-y-3">
              {result.tips.map((tip, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="text-purple-400 font-bold mt-0.5">→</span>
                  <span className="text-zinc-300">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="glass rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">Boost Your Engagement Rate</h3>
            <p className="text-zinc-400 mb-4">Use PostCraft AI tools to create content that drives higher engagement.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a href="/hooks" className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 font-semibold hover:from-purple-500 hover:to-pink-500 transition">Write Better Hooks</a>
              <a href="/hashtags" className="px-6 py-3 rounded-xl border border-zinc-700 font-semibold hover:bg-zinc-800 transition">Optimize Hashtags</a>
              <a href="/social-audit" className="px-6 py-3 rounded-xl border border-zinc-700 font-semibold hover:bg-zinc-800 transition">Full Profile Audit</a>
            </div>
          </div>
        </section>
      )}

      {/* SEO Content */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Understanding Engagement Rate</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3">What is Engagement Rate?</h3>
            <p className="text-zinc-400 text-sm">Engagement rate measures how actively your audience interacts with your content. It&apos;s calculated by dividing total interactions (likes, comments, shares, saves) by your follower count, then multiplying by 100. A higher rate means your content resonates more with your audience.</p>
          </div>
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3">Why Does It Matter?</h3>
            <p className="text-zinc-400 text-sm">Engagement rate is the #1 metric brands and sponsors look at. A micro-influencer with 5% engagement is worth more than a mega-influencer with 0.5%. It directly impacts algorithm reach, sponsorship deals ($250 per 1% engagement per 10K followers), and organic growth.</p>
          </div>
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3">How to Improve It</h3>
            <p className="text-zinc-400 text-sm">Post at optimal times, use strong hooks in the first line, ask questions, create saveable content (tips/tutorials), respond to every comment within 1 hour, use relevant hashtags, and collaborate with accounts in your niche.</p>
          </div>
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3">2026 Trends</h3>
            <p className="text-zinc-400 text-sm">Engagement rates are shifting: short-form video (Reels/TikTok) averages 3-6%, while static posts dropped to 1-2%. AI-generated content with human editing hits 4.2% average — 40% higher than fully manual or fully AI content.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 pb-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">FAQ</h2>
        <div className="space-y-4">
          {[
            { q: 'What\'s a good engagement rate on Instagram?', a: 'In 2026, 1.5% is average, 3.5% is good, and 6%+ is excellent on Instagram. Micro-influencers (1K-10K followers) typically have higher rates (4-7%) than large accounts.' },
            { q: 'Does engagement rate include views?', a: 'The standard formula uses likes + comments + shares + saves divided by followers. Some platforms (TikTok, YouTube) also use a view-based engagement rate, which we show separately.' },
            { q: 'How often should I check my engagement rate?', a: 'Track weekly for trends, but don\'t obsess over daily fluctuations. Look at 30-day rolling averages for the most accurate picture of your performance.' },
            { q: 'Why is my engagement rate dropping?', a: 'Common causes: algorithm changes, posting too much/little, content fatigue, audience misalignment, or buying followers. Focus on quality over quantity and engage authentically with your community.' },
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
