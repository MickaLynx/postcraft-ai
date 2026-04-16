'use client';
import { useState } from 'react';

const platforms = ['Instagram', 'TikTok', 'Twitter/X', 'YouTube', 'LinkedIn', 'Facebook'] as const;
const industries = ['Tech/SaaS', 'E-commerce', 'Health/Fitness', 'Finance', 'Education', 'Food/Beverage', 'Travel', 'Fashion/Beauty', 'Gaming', 'Real Estate'] as const;

interface CompetitorProfile {
  name: string;
  platform: string;
  followers: number;
  postsPerWeek: number;
  avgLikes: number;
  avgComments: number;
  avgShares: number;
  topContentType: string;
  postingTimes: string;
}

interface AnalysisResult {
  overallStrength: number;
  contentStrategy: { pillar: string; score: number; insight: string }[];
  gaps: { area: string; description: string; opportunity: string }[];
  benchmarks: { metric: string; competitor: string; industryAvg: string; verdict: string }[];
  actionPlan: string[];
  swot: { strengths: string[]; weaknesses: string[]; opportunities: string[]; threats: string[] };
  contentMix: { type: string; percentage: number; effectiveness: string }[];
}

const contentTypes = ['Educational', 'Entertainment', 'Promotional', 'Behind-the-scenes', 'User-generated', 'Trending/Memes', 'Storytelling', 'How-to/Tutorial'] as const;

function analyzeCompetitor(comp: CompetitorProfile, industry: string): AnalysisResult {
  const engRate = comp.followers > 0 ? ((comp.avgLikes + comp.avgComments * 2 + comp.avgShares * 3) / comp.followers) * 100 : 0;

  const industryBenchmarks: Record<string, { engRate: number; postsPerWeek: number; followers: number }> = {
    'Tech/SaaS': { engRate: 1.8, postsPerWeek: 5, followers: 25000 },
    'E-commerce': { engRate: 2.2, postsPerWeek: 7, followers: 50000 },
    'Health/Fitness': { engRate: 3.5, postsPerWeek: 6, followers: 40000 },
    'Finance': { engRate: 1.5, postsPerWeek: 4, followers: 20000 },
    'Education': { engRate: 2.8, postsPerWeek: 5, followers: 30000 },
    'Food/Beverage': { engRate: 3.2, postsPerWeek: 7, followers: 45000 },
    'Travel': { engRate: 3.8, postsPerWeek: 5, followers: 35000 },
    'Fashion/Beauty': { engRate: 2.5, postsPerWeek: 8, followers: 60000 },
    'Gaming': { engRate: 4.0, postsPerWeek: 6, followers: 55000 },
    'Real Estate': { engRate: 1.2, postsPerWeek: 3, followers: 15000 },
  };

  const bench = industryBenchmarks[industry] || { engRate: 2.5, postsPerWeek: 5, followers: 30000 };

  const overallStrength = Math.min(100, Math.round(
    (Math.min(engRate / bench.engRate, 2) * 25) +
    (Math.min(comp.postsPerWeek / bench.postsPerWeek, 2) * 20) +
    (Math.min(comp.followers / bench.followers, 2) * 25) +
    (comp.avgComments > 0 ? 15 : 5) +
    (comp.avgShares > 0 ? 15 : 5)
  ));

  const contentStrategy = [
    { pillar: 'Engagement Quality', score: Math.min(100, Math.round(engRate * 20)), insight: engRate >= 3 ? 'Above industry average — strong audience connection' : engRate >= 1.5 ? 'Moderate engagement — room for growth with more interactive content' : 'Below average — consider more questions, polls, and CTAs' },
    { pillar: 'Posting Consistency', score: Math.min(100, Math.round((comp.postsPerWeek / bench.postsPerWeek) * 50)), insight: comp.postsPerWeek >= bench.postsPerWeek ? 'Consistent posting schedule — algorithm favors regularity' : `Below ${bench.postsPerWeek} posts/week industry standard` },
    { pillar: 'Audience Size', score: Math.min(100, Math.round((comp.followers / bench.followers) * 50)), insight: comp.followers >= bench.followers ? 'Above industry average for follower count' : 'Below industry average — focus on growth tactics' },
    { pillar: 'Comment Ratio', score: Math.min(100, Math.round((comp.avgLikes > 0 ? (comp.avgComments / comp.avgLikes) : 0) * 500)), insight: (comp.avgComments / Math.max(comp.avgLikes, 1)) > 0.05 ? 'Healthy comment-to-like ratio — real community engagement' : 'Low comment ratio — try conversation-starting hooks' },
    { pillar: 'Shareability', score: Math.min(100, Math.round((comp.avgLikes > 0 ? (comp.avgShares / comp.avgLikes) : 0) * 300)), insight: comp.avgShares > comp.avgLikes * 0.1 ? 'High share rate — content has viral potential' : 'Low share rate — create more save/share-worthy content' },
    { pillar: 'Content-Market Fit', score: Math.min(100, Math.round(overallStrength * 0.8 + (engRate > bench.engRate ? 20 : 0))), insight: engRate > bench.engRate ? 'Content resonates well with the target market' : 'Content may not fully align with audience expectations' },
  ];

  const gaps: AnalysisResult['gaps'] = [];
  if (engRate < bench.engRate) gaps.push({ area: 'Engagement', description: `${engRate.toFixed(1)}% vs ${bench.engRate}% industry avg`, opportunity: 'Outperform by using more hooks, questions, and interactive formats' });
  if (comp.postsPerWeek < bench.postsPerWeek) gaps.push({ area: 'Frequency', description: `${comp.postsPerWeek} posts/week vs ${bench.postsPerWeek} industry avg`, opportunity: 'Post more consistently to capture algorithmic favor' });
  if (comp.avgShares < comp.avgLikes * 0.05) gaps.push({ area: 'Virality', description: 'Share rate below 5% of likes', opportunity: 'Create more educational carousels and controversial takes' });
  if (comp.avgComments < comp.avgLikes * 0.02) gaps.push({ area: 'Community', description: 'Comment rate below 2% of likes', opportunity: 'End posts with open-ended questions and reply to every comment' });
  if (gaps.length === 0) gaps.push({ area: 'Differentiation', description: 'Competitor is strong across all metrics', opportunity: 'Focus on unique positioning and underserved audience segments' });

  const benchmarks = [
    { metric: 'Engagement Rate', competitor: `${engRate.toFixed(2)}%`, industryAvg: `${bench.engRate}%`, verdict: engRate >= bench.engRate ? 'Above Avg' : 'Below Avg' },
    { metric: 'Posts/Week', competitor: `${comp.postsPerWeek}`, industryAvg: `${bench.postsPerWeek}`, verdict: comp.postsPerWeek >= bench.postsPerWeek ? 'Above Avg' : 'Below Avg' },
    { metric: 'Followers', competitor: comp.followers >= 1000000 ? `${(comp.followers / 1000000).toFixed(1)}M` : comp.followers >= 1000 ? `${(comp.followers / 1000).toFixed(1)}K` : `${comp.followers}`, industryAvg: bench.followers >= 1000 ? `${(bench.followers / 1000).toFixed(0)}K` : `${bench.followers}`, verdict: comp.followers >= bench.followers ? 'Above Avg' : 'Below Avg' },
    { metric: 'Comment/Like Ratio', competitor: `${((comp.avgComments / Math.max(comp.avgLikes, 1)) * 100).toFixed(1)}%`, industryAvg: '3-5%', verdict: (comp.avgComments / Math.max(comp.avgLikes, 1)) >= 0.03 ? 'Healthy' : 'Low' },
  ];

  const actionPlan = [
    engRate < bench.engRate ? `Boost engagement: use hooks, questions, and polls to increase from ${engRate.toFixed(1)}% to ${bench.engRate}%+` : `Maintain strong ${engRate.toFixed(1)}% engagement with interactive content`,
    comp.postsPerWeek < bench.postsPerWeek ? `Increase posting to ${bench.postsPerWeek}+ per week (currently ${comp.postsPerWeek})` : 'Posting frequency is strong — focus on quality optimization',
    `Target their weakest content pillar: ${contentStrategy.sort((a, b) => a.score - b.score)[0].pillar}`,
    `Create content series around ${gaps[0]?.area || 'community building'} to differentiate`,
    `Monitor their top-performing posts weekly for trend adoption`,
    `Build a content calendar that addresses all identified gaps systematically`,
  ];

  const swot = {
    strengths: contentStrategy.filter(c => c.score >= 60).map(c => `${c.pillar}: ${c.insight}`),
    weaknesses: contentStrategy.filter(c => c.score < 40).map(c => `${c.pillar}: ${c.insight}`),
    opportunities: gaps.map(g => `${g.area}: ${g.opportunity}`),
    threats: [
      engRate > bench.engRate * 1.5 ? 'Strong audience loyalty may be hard to penetrate' : 'Audience may be open to alternatives with better content',
      comp.followers > bench.followers * 2 ? 'Large established audience creates barrier to entry' : 'Follower count is catchable with consistent growth tactics',
    ],
  };
  if (swot.strengths.length === 0) swot.strengths.push('No standout strengths identified — overall average performance');
  if (swot.weaknesses.length === 0) swot.weaknesses.push('No critical weaknesses — well-rounded competitor');

  const contentMix = [
    { type: 'Educational', percentage: 30, effectiveness: engRate > 2 ? 'High' : 'Medium' },
    { type: 'Entertainment', percentage: 20, effectiveness: comp.avgShares > comp.avgLikes * 0.05 ? 'High' : 'Medium' },
    { type: 'Promotional', percentage: 15, effectiveness: 'Low-Medium' },
    { type: 'Behind-the-scenes', percentage: 10, effectiveness: comp.avgComments > comp.avgLikes * 0.03 ? 'High' : 'Medium' },
    { type: 'User-generated', percentage: 10, effectiveness: 'High' },
    { type: 'Trending/Memes', percentage: 10, effectiveness: comp.platform === 'TikTok' ? 'High' : 'Medium' },
    { type: 'How-to/Tutorial', percentage: 5, effectiveness: engRate > 3 ? 'Very High' : 'Medium' },
  ];

  return { overallStrength, contentStrategy, gaps, benchmarks, actionPlan, swot, contentMix };
}

export default function CompetitorAnalysisPage() {
  const [platform, setPlatform] = useState<string>('Instagram');
  const [industry, setIndustry] = useState<string>('Tech/SaaS');
  const [name, setName] = useState('');
  const [followers, setFollowers] = useState('');
  const [postsPerWeek, setPostsPerWeek] = useState('');
  const [avgLikes, setAvgLikes] = useState('');
  const [avgComments, setAvgComments] = useState('');
  const [avgShares, setAvgShares] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = () => {
    if (!name.trim() || !followers) return;
    const comp: CompetitorProfile = {
      name: name.trim(), platform, followers: parseInt(followers) || 0,
      postsPerWeek: parseInt(postsPerWeek) || 3, avgLikes: parseInt(avgLikes) || 0,
      avgComments: parseInt(avgComments) || 0, avgShares: parseInt(avgShares) || 0,
      topContentType: 'Mixed', postingTimes: 'Mixed',
    };
    setResult(analyzeCompetitor(comp, industry));
  };

  const strengthColor = (s: number) => s >= 70 ? 'text-green-400' : s >= 40 ? 'text-yellow-400' : 'text-red-400';
  const verdictColor = (v: string) => v.includes('Above') || v === 'Healthy' ? 'text-green-400' : 'text-red-400';

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold gradient-text mb-4">Competitor Analysis</h1>
      <p className="text-zinc-400 mb-8 max-w-2xl">Analyze any competitor&apos;s social media presence. Get a full SWOT analysis, identify content gaps, and build a strategy to outperform them.</p>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Competitor Name</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="@competitor or brand name" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Platform</label>
              <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none">
                {platforms.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Industry</label>
              <select value={industry} onChange={e => setIndustry(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none">
                {industries.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Followers</label>
              <input type="number" value={followers} onChange={e => setFollowers(e.target.value)} placeholder="50000" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Posts/Week</label>
              <input type="number" value={postsPerWeek} onChange={e => setPostsPerWeek(e.target.value)} placeholder="5" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Avg Likes</label>
              <input type="number" value={avgLikes} onChange={e => setAvgLikes(e.target.value)} placeholder="1200" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Avg Comments</label>
              <input type="number" value={avgComments} onChange={e => setAvgComments(e.target.value)} placeholder="45" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Avg Shares</label>
              <input type="number" value={avgShares} onChange={e => setAvgShares(e.target.value)} placeholder="80" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none" />
            </div>
          </div>
        </div>
      </div>

      <button onClick={handleAnalyze} className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:opacity-90 transition mb-10">Analyze Competitor</button>

      {result && (
        <div className="space-y-8">
          {/* Overall Score */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">Overall Competitive Strength: <span className={strengthColor(result.overallStrength)}>{result.overallStrength}/100</span></h2>
            <div className="w-full bg-zinc-800 rounded-full h-4 mb-2">
              <div className={`h-4 rounded-full ${result.overallStrength >= 70 ? 'bg-green-500' : result.overallStrength >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${result.overallStrength}%` }} />
            </div>
            <p className="text-sm text-zinc-400">{name} on {platform} in {industry}</p>
          </div>

          {/* Content Strategy Pillars */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">Content Strategy Pillars</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {result.contentStrategy.map(c => (
                <div key={c.pillar} className="bg-zinc-900/50 rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{c.pillar}</span>
                    <span className={strengthColor(c.score)}>{c.score}/100</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-2 mb-2">
                    <div className={`h-2 rounded-full ${c.score >= 60 ? 'bg-green-500' : c.score >= 30 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${c.score}%` }} />
                  </div>
                  <p className="text-sm text-zinc-400">{c.insight}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SWOT Analysis */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">SWOT Analysis</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-900/20 border border-green-800/30 rounded-lg p-4">
                <h3 className="font-semibold text-green-400 mb-2">Strengths</h3>
                <ul className="space-y-1">{result.swot.strengths.map((s, i) => <li key={i} className="text-sm text-zinc-300">• {s}</li>)}</ul>
              </div>
              <div className="bg-red-900/20 border border-red-800/30 rounded-lg p-4">
                <h3 className="font-semibold text-red-400 mb-2">Weaknesses</h3>
                <ul className="space-y-1">{result.swot.weaknesses.map((w, i) => <li key={i} className="text-sm text-zinc-300">• {w}</li>)}</ul>
              </div>
              <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-4">
                <h3 className="font-semibold text-blue-400 mb-2">Opportunities</h3>
                <ul className="space-y-1">{result.swot.opportunities.map((o, i) => <li key={i} className="text-sm text-zinc-300">• {o}</li>)}</ul>
              </div>
              <div className="bg-yellow-900/20 border border-yellow-800/30 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-400 mb-2">Threats</h3>
                <ul className="space-y-1">{result.swot.threats.map((t, i) => <li key={i} className="text-sm text-zinc-300">• {t}</li>)}</ul>
              </div>
            </div>
          </div>

          {/* Benchmarks Table */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">Industry Benchmarks</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-zinc-800"><th className="text-left py-2 text-zinc-400">Metric</th><th className="text-left py-2 text-zinc-400">{name || 'Competitor'}</th><th className="text-left py-2 text-zinc-400">{industry} Avg</th><th className="text-left py-2 text-zinc-400">Verdict</th></tr></thead>
                <tbody>
                  {result.benchmarks.map(b => (
                    <tr key={b.metric} className="border-b border-zinc-800/50">
                      <td className="py-2">{b.metric}</td>
                      <td className="py-2 font-mono">{b.competitor}</td>
                      <td className="py-2 font-mono text-zinc-400">{b.industryAvg}</td>
                      <td className={`py-2 font-semibold ${verdictColor(b.verdict)}`}>{b.verdict}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Content Gaps */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">Content Gaps & Opportunities</h2>
            <div className="space-y-3">
              {result.gaps.map((g, i) => (
                <div key={i} className="bg-zinc-900/50 rounded-lg p-4 border-l-4 border-purple-500">
                  <h3 className="font-semibold text-purple-400">{g.area}</h3>
                  <p className="text-sm text-zinc-400 mt-1">{g.description}</p>
                  <p className="text-sm text-green-400 mt-1">→ {g.opportunity}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Content Mix */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">Recommended Content Mix</h2>
            <div className="space-y-3">
              {result.contentMix.map(c => (
                <div key={c.type} className="flex items-center gap-4">
                  <span className="w-32 text-sm">{c.type}</span>
                  <div className="flex-1 bg-zinc-800 rounded-full h-3">
                    <div className="h-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600" style={{ width: `${c.percentage}%` }} />
                  </div>
                  <span className="text-sm text-zinc-400 w-10">{c.percentage}%</span>
                  <span className={`text-xs ${c.effectiveness === 'High' || c.effectiveness === 'Very High' ? 'text-green-400' : 'text-yellow-400'}`}>{c.effectiveness}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Plan */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">Action Plan to Outperform</h2>
            <ol className="space-y-2">
              {result.actionPlan.map((a, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="bg-purple-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                  <span className="text-zinc-300">{a}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}

      {/* SEO Content */}
      <section className="mt-16 space-y-8 text-zinc-400">
        <h2 className="text-2xl font-bold text-white">How to Analyze Social Media Competitors in 2026</h2>
        <p>Understanding your competitors&apos; social media strategy is essential for growth. A thorough competitor analysis reveals content gaps, audience opportunities, and strategic weaknesses you can exploit to build a stronger presence.</p>

        <h3 className="text-xl font-semibold text-white">What Is a Social Media Competitor Analysis?</h3>
        <p>A social media competitor analysis is a systematic evaluation of your competitors&apos; social profiles, content strategies, engagement metrics, and audience demographics. It helps you identify what works in your industry, spot untapped opportunities, and build a data-driven content strategy that outperforms the competition.</p>

        <h3 className="text-xl font-semibold text-white">Key Metrics to Track</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong className="text-white">Engagement Rate:</strong> Measures how actively the audience interacts with content</li>
          <li><strong className="text-white">Posting Frequency:</strong> How often competitors publish content</li>
          <li><strong className="text-white">Content Mix:</strong> The balance between educational, promotional, and entertainment content</li>
          <li><strong className="text-white">Audience Growth:</strong> Rate of follower acquisition over time</li>
          <li><strong className="text-white">Share Rate:</strong> Percentage of content that gets shared — indicates virality potential</li>
        </ul>

        <h3 className="text-xl font-semibold text-white">SWOT Framework for Social Media</h3>
        <p>Apply the classic SWOT framework to social media: identify Strengths (high engagement, consistent posting), Weaknesses (low comment ratio, infrequent posting), Opportunities (underserved content formats, emerging platforms), and Threats (large established audiences, high-budget competitors). Use these insights to craft a differentiated content strategy.</p>

        <div className="border-t border-zinc-800 pt-8">
          <h3 className="text-xl font-semibold text-white">Frequently Asked Questions</h3>
          <div className="space-y-4 mt-4">
            <div><h4 className="font-medium text-white">How often should I analyze competitors?</h4><p className="text-sm">Perform a deep analysis quarterly, but monitor key metrics weekly. Social media moves fast — quarterly reviews keep you strategically aligned while weekly checks catch tactical opportunities.</p></div>
            <div><h4 className="font-medium text-white">How many competitors should I track?</h4><p className="text-sm">Track 3-5 direct competitors and 2-3 aspirational brands in your niche. Too many dilutes focus; too few limits your strategic perspective.</p></div>
            <div><h4 className="font-medium text-white">What&apos;s the most important metric?</h4><p className="text-sm">Engagement rate is the single most telling metric because it measures how well content resonates with the audience, regardless of follower count.</p></div>
            <div><h4 className="font-medium text-white">Can I use this for any platform?</h4><p className="text-sm">Yes. PostCraft&apos;s Competitor Analysis tool supports Instagram, TikTok, Twitter/X, YouTube, LinkedIn, and Facebook with industry-specific benchmarks for each.</p></div>
          </div>
        </div>
      </section>
    </main>
  );
}
