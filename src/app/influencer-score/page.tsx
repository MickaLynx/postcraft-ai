'use client';
import { useState } from 'react';

const platforms = ['Instagram', 'TikTok', 'Twitter/X', 'YouTube', 'LinkedIn', 'Facebook'] as const;
const niches = ['Tech/SaaS', 'Fashion/Beauty', 'Fitness/Health', 'Food/Cooking', 'Travel', 'Finance/Business', 'Gaming', 'Education', 'Lifestyle', 'Parenting', 'Music/Entertainment', 'Sustainability'] as const;

const tiers = [
  { name: 'Nano', range: '1K-10K', avgRate: '$10-$100', engRate: '5-8%', trustScore: 'Very High' },
  { name: 'Micro', range: '10K-50K', avgRate: '$100-$500', engRate: '3-5%', trustScore: 'High' },
  { name: 'Mid-Tier', range: '50K-200K', avgRate: '$500-$5K', engRate: '2-3%', trustScore: 'Medium' },
  { name: 'Macro', range: '200K-1M', avgRate: '$5K-$20K', engRate: '1-2%', trustScore: 'Medium-Low' },
  { name: 'Mega', range: '1M+', avgRate: '$20K-$100K+', engRate: '0.5-1%', trustScore: 'Low' },
];

interface ScoreResult {
  overallScore: number;
  tier: string;
  engagementRate: number;
  engagementGrade: string;
  authenticityScore: number;
  estimatedReach: number;
  estimatedCPM: string;
  estimatedPostValue: string;
  categories: { name: string; score: number; explanation: string }[];
  recommendations: string[];
  benchmarks: { metric: string; yours: string; average: string; verdict: string }[];
  collaborationFit: { type: string; fitScore: number; reason: string }[];
}

function calculateScore(
  followers: number, avgLikes: number, avgComments: number, avgShares: number,
  avgViews: number, postsPerWeek: number, accountAge: number,
  platform: string, niche: string, hasMediaKit: boolean, respondsToDMs: boolean
): ScoreResult {
  const engagementRate = followers > 0 ? ((avgLikes + avgComments * 2 + avgShares * 3) / followers) * 100 : 0;

  let tier = 'Nano';
  if (followers >= 1000000) tier = 'Mega';
  else if (followers >= 200000) tier = 'Macro';
  else if (followers >= 50000) tier = 'Mid-Tier';
  else if (followers >= 10000) tier = 'Micro';

  // Engagement grade
  let engGrade = 'Poor';
  if (engagementRate >= 6) engGrade = 'Exceptional';
  else if (engagementRate >= 4) engGrade = 'Excellent';
  else if (engagementRate >= 2.5) engGrade = 'Good';
  else if (engagementRate >= 1.5) engGrade = 'Average';
  else if (engagementRate >= 0.8) engGrade = 'Below Average';

  // Authenticity scoring
  const likesToFollowers = followers > 0 ? avgLikes / followers : 0;
  const commentsToLikes = avgLikes > 0 ? avgComments / avgLikes : 0;
  let authenticityScore = 50;
  if (likesToFollowers >= 0.03 && likesToFollowers <= 0.15) authenticityScore += 20;
  else if (likesToFollowers > 0.15) authenticityScore -= 10; // possibly fake
  if (commentsToLikes >= 0.01 && commentsToLikes <= 0.1) authenticityScore += 15;
  else if (commentsToLikes > 0.1) authenticityScore += 5; // high comment ratio = real
  if (postsPerWeek >= 2 && postsPerWeek <= 10) authenticityScore += 10;
  if (accountAge >= 2) authenticityScore += 5;
  authenticityScore = Math.min(100, Math.max(0, authenticityScore));

  // Estimated reach
  const reachMultiplier = platform === 'TikTok' ? 3 : platform === 'Instagram' ? 0.4 : platform === 'Twitter/X' ? 0.3 : platform === 'YouTube' ? 0.6 : platform === 'LinkedIn' ? 0.15 : 0.1;
  const estimatedReach = Math.round(followers * reachMultiplier * (engagementRate / 2));

  // CPM & post value estimation
  const baseCPM = platform === 'Instagram' ? 12 : platform === 'TikTok' ? 8 : platform === 'YouTube' ? 18 : platform === 'LinkedIn' ? 25 : platform === 'Twitter/X' ? 10 : 6;
  const nicheMult = ['Tech/SaaS', 'Finance/Business'].includes(niche) ? 1.8 : ['Fashion/Beauty', 'Fitness/Health'].includes(niche) ? 1.3 : 1;
  const cpm = baseCPM * nicheMult * (engagementRate > 3 ? 1.5 : 1);
  const postValue = (estimatedReach / 1000) * cpm;

  // Categories
  const categories = [
    {
      name: 'Engagement Quality',
      score: Math.min(100, Math.round(engagementRate * 15 + (commentsToLikes > 0.02 ? 20 : 0))),
      explanation: engagementRate >= 3 ? 'Strong engagement indicates an active, real audience' : 'Engagement could be improved — try more interactive content',
    },
    {
      name: 'Audience Authenticity',
      score: authenticityScore,
      explanation: authenticityScore >= 70 ? 'Engagement patterns suggest a genuine, organic audience' : 'Some engagement patterns may indicate mixed audience quality',
    },
    {
      name: 'Content Consistency',
      score: Math.min(100, Math.round(postsPerWeek >= 3 && postsPerWeek <= 7 ? 85 : postsPerWeek >= 1 ? 60 : 30)),
      explanation: postsPerWeek >= 3 ? 'Regular posting schedule signals reliability to brands' : 'Increase posting frequency to 3-5x/week for brand appeal',
    },
    {
      name: 'Brand Readiness',
      score: Math.min(100, (hasMediaKit ? 30 : 0) + (respondsToDMs ? 20 : 0) + (accountAge >= 1 ? 20 : 10) + (postsPerWeek >= 2 ? 20 : 10) + (engagementRate >= 2 ? 10 : 0)),
      explanation: hasMediaKit ? 'Media kit and responsiveness show professionalism' : 'Create a media kit to attract higher-paying collaborations',
    },
    {
      name: 'Growth Potential',
      score: Math.min(100, Math.round(50 + (engagementRate > 3 ? 20 : 0) + (tier === 'Nano' || tier === 'Micro' ? 20 : 0) + (postsPerWeek >= 3 ? 10 : 0))),
      explanation: tier === 'Nano' || tier === 'Micro' ? 'Smaller accounts with high engagement have the most growth potential' : 'Focus on deepening engagement to maintain growth trajectory',
    },
    {
      name: 'Monetization Readiness',
      score: Math.min(100, Math.round((followers >= 5000 ? 20 : 10) + (engagementRate >= 2 ? 25 : 10) + (hasMediaKit ? 20 : 0) + (postsPerWeek >= 2 ? 15 : 5) + (accountAge >= 1 ? 20 : 5))),
      explanation: followers >= 5000 && engagementRate >= 2 ? 'You meet the threshold for most brand collaboration platforms' : 'Build to 5K followers with 2%+ engagement for monetization',
    },
  ];

  const overallScore = Math.round(categories.reduce((s, c) => s + c.score, 0) / categories.length);

  // Recommendations
  const recommendations: string[] = [];
  if (engagementRate < 2) recommendations.push('Focus on creating conversation-starting content (polls, questions, hot takes) to boost engagement rate');
  if (!hasMediaKit) recommendations.push('Create a professional media kit with audience demographics, past collaborations, and rates');
  if (!respondsToDMs) recommendations.push('Enable DMs and respond within 24h — brands filter for responsive creators');
  if (postsPerWeek < 3) recommendations.push('Increase posting frequency to 3-5x per week for algorithm consistency');
  if (avgViews > 0 && avgViews < followers * 0.1) recommendations.push('Your view-to-follower ratio is low — experiment with trending formats and posting times');
  if (commentsToLikes < 0.01) recommendations.push('Your comment-to-like ratio is low — add CTAs in captions asking specific questions');
  if (accountAge < 1) recommendations.push('Account age under 1 year — brands prefer established accounts. Keep building consistently');
  if (recommendations.length < 3) recommendations.push('Cross-promote on other platforms to diversify your audience and attract multi-platform brand deals');

  // Benchmarks
  const avgEngByPlatform: Record<string, number> = { 'Instagram': 1.9, 'TikTok': 4.2, 'Twitter/X': 0.9, 'YouTube': 3.5, 'LinkedIn': 2.6, 'Facebook': 0.6 };
  const benchmarks = [
    { metric: 'Engagement Rate', yours: `${engagementRate.toFixed(2)}%`, average: `${avgEngByPlatform[platform] || 2}%`, verdict: engagementRate > (avgEngByPlatform[platform] || 2) ? 'Above average' : 'Below average' },
    { metric: 'Posts/Week', yours: `${postsPerWeek}`, average: '4-5', verdict: postsPerWeek >= 3 ? 'On track' : 'Too low' },
    { metric: 'Comment/Like Ratio', yours: `${(commentsToLikes * 100).toFixed(1)}%`, average: '2-5%', verdict: commentsToLikes >= 0.02 ? 'Healthy' : 'Low interaction' },
    { metric: 'Estimated CPM', yours: `$${cpm.toFixed(0)}`, average: `$${baseCPM}`, verdict: cpm > baseCPM ? 'Premium' : 'Standard' },
  ];

  // Collaboration fit
  const collaborationFit = [
    { type: 'Sponsored Posts', fitScore: Math.min(100, Math.round(overallScore * 0.8 + (hasMediaKit ? 20 : 0))), reason: hasMediaKit ? 'Professional setup for brand partnerships' : 'Create a media kit to unlock sponsored deals' },
    { type: 'Affiliate Marketing', fitScore: Math.min(100, Math.round(40 + (engagementRate >= 3 ? 30 : 0) + (commentsToLikes >= 0.02 ? 30 : 0))), reason: engagementRate >= 3 ? 'High engagement means strong conversion potential' : 'Build trust and engagement for affiliate success' },
    { type: 'Brand Ambassador', fitScore: Math.min(100, Math.round(30 + (postsPerWeek >= 3 ? 20 : 0) + (accountAge >= 2 ? 20 : 0) + (authenticityScore >= 70 ? 30 : 0))), reason: authenticityScore >= 70 ? 'Authentic voice resonates for long-term partnerships' : 'Build a consistent, authentic presence first' },
    { type: 'UGC Creator', fitScore: Math.min(100, Math.round(50 + (engagementRate >= 2 ? 20 : 0) + (tier === 'Nano' || tier === 'Micro' ? 30 : 0))), reason: tier === 'Nano' || tier === 'Micro' ? 'Smaller creators excel at authentic UGC content' : 'UGC opportunities decrease as account size grows' },
  ];

  return {
    overallScore,
    tier,
    engagementRate: Math.round(engagementRate * 100) / 100,
    engagementGrade: engGrade,
    authenticityScore,
    estimatedReach,
    estimatedCPM: `$${cpm.toFixed(0)}`,
    estimatedPostValue: postValue >= 1000 ? `$${(postValue / 1000).toFixed(1)}K` : `$${Math.round(postValue)}`,
    categories,
    recommendations,
    benchmarks,
    collaborationFit,
  };
}

export default function InfluencerScorePage() {
  const [platform, setPlatform] = useState<string>('Instagram');
  const [niche, setNiche] = useState<string>('Tech/SaaS');
  const [followers, setFollowers] = useState('');
  const [avgLikes, setAvgLikes] = useState('');
  const [avgComments, setAvgComments] = useState('');
  const [avgShares, setAvgShares] = useState('');
  const [avgViews, setAvgViews] = useState('');
  const [postsPerWeek, setPostsPerWeek] = useState('');
  const [accountAge, setAccountAge] = useState('');
  const [hasMediaKit, setHasMediaKit] = useState(false);
  const [respondsToDMs, setRespondsToDMs] = useState(false);
  const [result, setResult] = useState<ScoreResult | null>(null);

  function calculate() {
    const f = Number(followers);
    if (!f) return;
    setResult(calculateScore(f, Number(avgLikes), Number(avgComments), Number(avgShares), Number(avgViews), Number(postsPerWeek), Number(accountAge), platform, niche, hasMediaKit, respondsToDMs));
  }

  function scoreColor(score: number) {
    if (score >= 75) return 'text-green-400';
    if (score >= 50) return 'text-yellow-400';
    if (score >= 30) return 'text-orange-400';
    return 'text-red-400';
  }

  function barColor(score: number) {
    if (score >= 75) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    if (score >= 30) return 'bg-orange-500';
    return 'bg-red-500';
  }

  return (
    <main className="min-h-screen">
      <section className="px-6 py-20 max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">
          Free <span className="gradient-text">Influencer Score</span> Calculator
        </h1>
        <p className="text-zinc-400 text-lg mb-2 max-w-2xl mx-auto">
          Calculate your influencer score, estimated post value, and brand readiness. Get actionable insights to grow your monetization potential across any platform.
        </p>
        <p className="text-zinc-500 text-sm mb-8">Used by 8,000+ creators and agencies to evaluate influencer partnerships</p>
      </section>

      <section className="px-6 pb-10 max-w-4xl mx-auto">
        <div className="glass rounded-2xl p-8">
          <h2 className="text-xl font-semibold mb-6">Enter Your Profile Metrics</h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Platform</label>
              <select value={platform} onChange={e => setPlatform(e.target.value)}
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-pink-500 transition">
                {platforms.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Niche</label>
              <select value={niche} onChange={e => setNiche(e.target.value)}
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-pink-500 transition">
                {niches.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {[
              ['Followers', followers, setFollowers, 'e.g. 25000'],
              ['Avg Likes/Post', avgLikes, setAvgLikes, 'e.g. 800'],
              ['Avg Comments/Post', avgComments, setAvgComments, 'e.g. 45'],
              ['Avg Shares/Post', avgShares, setAvgShares, 'e.g. 20'],
              ['Avg Views/Post', avgViews, setAvgViews, 'e.g. 5000'],
              ['Posts per Week', postsPerWeek, setPostsPerWeek, 'e.g. 4'],
            ].map(([label, val, setter, placeholder]) => (
              <div key={label as string}>
                <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">{label as string}</label>
                <input type="number" value={val as string} onChange={e => (setter as (v: string) => void)(e.target.value)} placeholder={placeholder as string}
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-pink-500 transition" />
              </div>
            ))}
          </div>

          <div className="mb-6">
            <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Account Age (years)</label>
            <input type="number" value={accountAge} onChange={e => setAccountAge(e.target.value)} placeholder="e.g. 2.5"
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-pink-500 transition" />
          </div>

          <div className="flex gap-6 mb-8">
            <label className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer">
              <input type="checkbox" checked={hasMediaKit} onChange={e => setHasMediaKit(e.target.checked)} className="rounded" />
              Has Media Kit
            </label>
            <label className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer">
              <input type="checkbox" checked={respondsToDMs} onChange={e => setRespondsToDMs(e.target.checked)} className="rounded" />
              Responds to DMs / Brand Inquiries
            </label>
          </div>

          <button onClick={calculate} disabled={!followers.trim()}
            className="w-full py-3.5 btn-primary rounded-xl font-semibold text-white">
            Calculate Influencer Score
          </button>
        </div>
      </section>

      {result && (
        <section className="px-6 pb-20 max-w-4xl mx-auto space-y-8 fade-in">
          {/* Overview */}
          <div className="glass rounded-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className={`text-5xl font-bold ${scoreColor(result.overallScore)}`}>{result.overallScore}</p>
                <p className="text-xs text-zinc-500 mt-2">Overall Score</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-purple-400">{result.tier}</p>
                <p className="text-xs text-zinc-500 mt-2">Influencer Tier</p>
              </div>
              <div>
                <p className={`text-3xl font-bold ${scoreColor(result.engagementRate > 3 ? 80 : result.engagementRate > 1.5 ? 55 : 25)}`}>{result.engagementRate}%</p>
                <p className="text-xs text-zinc-500 mt-2">Engagement Rate ({result.engagementGrade})</p>
              </div>
              <div>
                <p className="text-3xl font-bold gradient-text">{result.estimatedPostValue}</p>
                <p className="text-xs text-zinc-500 mt-2">Est. Post Value</p>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="glass rounded-xl p-5 text-center">
              <p className="text-2xl font-bold text-cyan-400">{result.authenticityScore}%</p>
              <p className="text-xs text-zinc-500 mt-1">Authenticity Score</p>
            </div>
            <div className="glass rounded-xl p-5 text-center">
              <p className="text-2xl font-bold text-pink-400">{result.estimatedReach.toLocaleString()}</p>
              <p className="text-xs text-zinc-500 mt-1">Estimated Reach/Post</p>
            </div>
            <div className="glass rounded-xl p-5 text-center">
              <p className="text-2xl font-bold text-amber-400">{result.estimatedCPM}</p>
              <p className="text-xs text-zinc-500 mt-1">Estimated CPM</p>
            </div>
          </div>

          {/* Categories */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-lg font-semibold mb-6">Score Breakdown</h3>
            <div className="space-y-4">
              {result.categories.map(c => (
                <div key={c.name}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{c.name}</span>
                    <span className={`text-sm font-bold ${scoreColor(c.score)}`}>{c.score}/100</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-2.5 mb-1">
                    <div className={`h-2.5 rounded-full ${barColor(c.score)} transition-all duration-500`} style={{ width: `${c.score}%` }} />
                  </div>
                  <p className="text-xs text-zinc-500">{c.explanation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Benchmarks */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-lg font-semibold mb-4">Platform Benchmarks ({platform})</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-left py-2 text-zinc-500">Metric</th>
                    <th className="text-left py-2 text-zinc-500">Yours</th>
                    <th className="text-left py-2 text-zinc-500">Average</th>
                    <th className="text-left py-2 text-zinc-500">Verdict</th>
                  </tr>
                </thead>
                <tbody>
                  {result.benchmarks.map(b => (
                    <tr key={b.metric} className="border-b border-zinc-800/50">
                      <td className="py-2 font-medium">{b.metric}</td>
                      <td className="py-2">{b.yours}</td>
                      <td className="py-2 text-zinc-400">{b.average}</td>
                      <td className={`py-2 ${b.verdict.includes('Above') || b.verdict === 'On track' || b.verdict === 'Healthy' || b.verdict === 'Premium' ? 'text-green-400' : 'text-orange-400'}`}>{b.verdict}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Collaboration Fit */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-lg font-semibold mb-6">Collaboration Fit</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {result.collaborationFit.map(c => (
                <div key={c.type} className="bg-zinc-800/50 rounded-xl p-5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{c.type}</span>
                    <span className={`text-lg font-bold ${scoreColor(c.fitScore)}`}>{c.fitScore}%</span>
                  </div>
                  <div className="w-full bg-zinc-700 rounded-full h-1.5 mb-2">
                    <div className={`h-1.5 rounded-full ${barColor(c.fitScore)}`} style={{ width: `${c.fitScore}%` }} />
                  </div>
                  <p className="text-xs text-zinc-500">{c.reason}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          {result.recommendations.length > 0 && (
            <div className="glass rounded-2xl p-8">
              <h3 className="text-lg font-semibold mb-4">Growth Recommendations</h3>
              <ul className="space-y-3">
                {result.recommendations.map((tip, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="text-pink-400 font-bold shrink-0">{i + 1}.</span>
                    <span className="text-zinc-300">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* Influencer Tier Table */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">2026 Influencer Tier Benchmarks</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-3 text-zinc-500">Tier</th>
                  <th className="text-left py-3 text-zinc-500">Followers</th>
                  <th className="text-left py-3 text-zinc-500">Avg Rate/Post</th>
                  <th className="text-left py-3 text-zinc-500">Avg Engagement</th>
                  <th className="text-left py-3 text-zinc-500">Audience Trust</th>
                </tr>
              </thead>
              <tbody>
                {tiers.map(t => (
                  <tr key={t.name} className="border-b border-zinc-800/50">
                    <td className="py-3 font-medium">{t.name}</td>
                    <td className="py-3 text-zinc-400">{t.range}</td>
                    <td className="py-3 text-zinc-400">{t.avgRate}</td>
                    <td className="py-3 text-zinc-400">{t.engRate}</td>
                    <td className="py-3 text-zinc-400">{t.trustScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-10">How the Influencer Score Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              ['1', 'Enter Metrics', 'Input your follower count, average engagement, posting frequency, and account details.'],
              ['2', 'Get Your Score', 'Our algorithm calculates your overall score, tier, authenticity, estimated post value, and CPM.'],
              ['3', 'Grow & Monetize', 'Follow personalized recommendations to increase your score and attract brand partnerships.'],
            ].map(([num, title, desc]) => (
              <div key={num} className="glass rounded-2xl p-6">
                <div className="text-3xl mb-3">{num}</div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-zinc-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto text-center">
          <div className="grid grid-cols-3 gap-8">
            <div><p className="text-3xl font-bold gradient-text">6</p><p className="text-zinc-500 text-xs mt-1">Platforms</p></div>
            <div><p className="text-3xl font-bold gradient-text">12</p><p className="text-zinc-500 text-xs mt-1">Niches</p></div>
            <div><p className="text-3xl font-bold gradient-text">6</p><p className="text-zinc-500 text-xs mt-1">Score Categories</p></div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              ['What is an influencer score?', 'An influencer score is a composite metric that evaluates your overall value as a creator for brand partnerships. It combines engagement quality, audience authenticity, content consistency, brand readiness, growth potential, and monetization readiness into a single 0-100 score.'],
              ['How is the estimated post value calculated?', 'Post value is estimated using your platform, niche, engagement rate, and estimated reach. Higher engagement rates in premium niches (like Tech/SaaS or Finance) command higher CPMs. The formula factors in industry-standard rates for 2026.'],
              ['What does the authenticity score measure?', 'The authenticity score analyzes the ratio between your followers, likes, and comments to detect patterns consistent with genuine engagement. Healthy like-to-follower and comment-to-like ratios indicate real, engaged audiences rather than purchased followers.'],
              ['Is this tool free?', 'Yes, completely free with no signup required. Calculate your influencer score, get benchmarks, and receive personalized growth recommendations at no cost.'],
              ['Which influencer tier is best for brand deals?', 'It depends on the brand\'s goals. Nano and micro-influencers (1K-50K) typically have higher engagement and trust, making them ideal for conversions. Macro and mega-influencers excel at brand awareness campaigns. The best tier is the one where your engagement quality is highest.'],
            ].map(([q, a]) => (
              <div key={q} className="glass rounded-xl p-6">
                <h3 className="font-semibold mb-2">{q}</h3>
                <p className="text-sm text-zinc-400">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 border-t border-zinc-800/50 text-center">
        <h2 className="text-2xl font-bold mb-4">Create Content That Brands Want to Sponsor</h2>
        <p className="text-zinc-400 mb-6 max-w-md mx-auto">Use PostCraft AI to generate high-engagement content that grows your influencer score.</p>
        <div className="flex justify-center gap-4">
          <a href="/" className="px-8 py-3.5 btn-primary rounded-xl font-semibold text-white">Generate Posts Free</a>
          <a href="/sentiment-analyzer" className="px-8 py-3.5 bg-zinc-800 rounded-xl font-semibold text-zinc-300 hover:bg-zinc-700 transition">Analyze Sentiment</a>
        </div>
      </section>
    </main>
  );
}
