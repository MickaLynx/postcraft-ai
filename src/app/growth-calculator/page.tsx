'use client';
import { useState } from 'react';

const platforms = ['Instagram', 'TikTok', 'Twitter/X', 'LinkedIn', 'YouTube', 'Facebook'] as const;
const niches = ['Tech/SaaS', 'Marketing', 'Fitness', 'Finance', 'Fashion', 'Food', 'Travel', 'Education', 'Entertainment', 'Business', 'Health', 'General'] as const;
const strategies = ['Organic Only', 'Organic + Collaborations', 'Organic + Paid Ads', 'Full Stack (Organic + Collabs + Paid)', 'Viral Content Strategy'] as const;

interface GrowthProjection {
  month: number;
  followers: number;
  engagement: number;
  postsPerWeek: number;
  milestone: string;
}

interface GrowthResult {
  projections: GrowthProjection[];
  growthRate: string;
  timeToGoal: string;
  actionPlan: { phase: string; actions: string[]; duration: string }[];
  benchmarks: { metric: string; yourValue: string; industryAvg: string; verdict: string }[];
  monetizationMilestones: { followers: number; opportunity: string; estimatedRevenue: string }[];
  platformTips: string[];
  contentMix: { type: string; percentage: number; reason: string }[];
}

function calculateGrowth(
  platform: string, currentFollowers: number, goalFollowers: number,
  niche: string, postsPerWeek: number, strategy: string
): GrowthResult {
  const baseGrowthRates: Record<string, number> = {
    'Instagram': 0.03, 'TikTok': 0.08, 'Twitter/X': 0.04,
    'LinkedIn': 0.05, 'YouTube': 0.025, 'Facebook': 0.02,
  };
  const strategyMultipliers: Record<string, number> = {
    'Organic Only': 1.0, 'Organic + Collaborations': 1.5,
    'Organic + Paid Ads': 1.8, 'Full Stack (Organic + Collabs + Paid)': 2.5,
    'Viral Content Strategy': 2.0,
  };
  const postingBonus = Math.min(postsPerWeek / 5, 1.5);
  const monthlyRate = (baseGrowthRates[platform] || 0.03) * (strategyMultipliers[strategy] || 1.0) * postingBonus;

  const projections: GrowthProjection[] = [];
  let current = currentFollowers;
  const milestones = [100, 500, 1000, 5000, 10000, 25000, 50000, 100000, 500000, 1000000];

  for (let m = 1; m <= 12; m++) {
    current = Math.round(current * (1 + monthlyRate));
    const milestone = milestones.find(ms => ms > currentFollowers && current >= ms);
    projections.push({
      month: m,
      followers: current,
      engagement: Math.max(1.5, 8 - Math.log10(current) * 1.5),
      postsPerWeek,
      milestone: milestone ? `${milestone >= 1000 ? `${milestone / 1000}K` : milestone} followers reached!` : '',
    });
  }

  let monthsToGoal = 0;
  let tempFollowers = currentFollowers;
  while (tempFollowers < goalFollowers && monthsToGoal < 60) {
    tempFollowers = Math.round(tempFollowers * (1 + monthlyRate));
    monthsToGoal++;
  }

  const actionPlan = [
    { phase: 'Foundation (Month 1-2)', actions: ['Optimize bio and profile for your niche', 'Post consistently at your target frequency', `Study top 10 creators in ${niche}`, 'Define your content pillars (3-4 core topics)'], duration: '8 weeks' },
    { phase: 'Growth (Month 3-6)', actions: ['Start collaborating with peers at your level', 'Create 1 "swing for the fences" viral attempt per week', 'Engage with 20+ accounts daily in your niche', 'Analyze your top 5 posts monthly — double down on what works'], duration: '16 weeks' },
    { phase: 'Scale (Month 7-12)', actions: ['Launch a lead magnet or free resource', 'Consider paid promotion for top-performing content', 'Build email list as owned audience', 'Monetize through sponsored content or products'], duration: '24 weeks' },
  ];

  const benchmarks = [
    { metric: 'Monthly growth rate', yourValue: `${(monthlyRate * 100).toFixed(1)}%`, industryAvg: `${((baseGrowthRates[platform] || 0.03) * 100).toFixed(1)}%`, verdict: monthlyRate > (baseGrowthRates[platform] || 0.03) ? 'Above average' : 'At average' },
    { metric: 'Posts per week', yourValue: `${postsPerWeek}`, industryAvg: platform === 'TikTok' ? '7-14' : platform === 'Twitter/X' ? '7-21' : '3-5', verdict: postsPerWeek >= 5 ? 'Strong cadence' : 'Consider posting more' },
    { metric: 'Engagement rate', yourValue: `${Math.max(1.5, 8 - Math.log10(currentFollowers) * 1.5).toFixed(1)}%`, industryAvg: platform === 'TikTok' ? '4-8%' : '1-3%', verdict: 'Varies by follower count' },
    { metric: 'Follower-to-fan ratio', yourValue: 'Track in analytics', industryAvg: '10-20% active', verdict: 'Focus on engaged followers, not vanity numbers' },
  ];

  const monetizationMilestones = [
    { followers: 1000, opportunity: 'Micro-influencer deals, affiliate marketing', estimatedRevenue: '$100-$500/mo' },
    { followers: 5000, opportunity: 'Sponsored posts, brand partnerships, digital products', estimatedRevenue: '$500-$2K/mo' },
    { followers: 10000, opportunity: 'Consistent brand deals, course/product launches', estimatedRevenue: '$2K-$5K/mo' },
    { followers: 50000, opportunity: 'Major brand partnerships, membership/subscription', estimatedRevenue: '$5K-$20K/mo' },
    { followers: 100000, opportunity: 'Full-time creator income, licensing, speaking', estimatedRevenue: '$10K-$50K/mo' },
  ];

  const contentMix = [
    { type: 'Educational/Value', percentage: 40, reason: 'Builds authority and drives saves/shares' },
    { type: 'Entertaining/Relatable', percentage: 25, reason: 'Drives shares and reach to new audiences' },
    { type: 'Personal/Behind-the-scenes', percentage: 20, reason: 'Builds connection and loyalty' },
    { type: 'Promotional/CTA', percentage: 15, reason: 'Converts followers into customers/subscribers' },
  ];

  const platformTips: Record<string, string[]> = {
    'Instagram': ['Reels get 2x the reach of static posts — post 3-4 Reels/week minimum', 'Carousel posts get saved more — great for authority building', 'Stories daily keep you at the top of followers\' feeds', 'Collaborate via Collab posts — both accounts\' followers see it'],
    'TikTok': ['Post 1-3 times per day for maximum algorithm exposure', 'First 3 seconds determine everything — hook immediately', 'Trending sounds boost reach by 30-50%', 'Stitch and Duet popular content in your niche for free exposure'],
    'Twitter/X': ['Tweet 3-7 times daily, threads 2-3 times weekly', 'Reply to accounts 10x your size — visibility hack', 'Threads are your growth engine — invest heavily here', 'Retweet your best content in different time zones'],
    'LinkedIn': ['Post 3-5 times per week with 24h spacing', 'Document (PDF) carousels get 4x the reach', 'Comment on top voices\' posts within the first hour', 'Personal stories outperform corporate content 5:1'],
    'YouTube': ['Consistency > frequency — weekly upload minimum', 'Thumbnails determine 80% of click-through rate', 'First 30 seconds retention = algorithm gold', 'Shorts cross-promote long-form content effectively'],
    'Facebook': ['Groups > Pages for organic reach in 2026', 'Video content still dominates the Facebook feed', 'Share in 5-10 relevant groups per post', 'Facebook Reels are underused — less competition'],
  };

  return {
    projections,
    growthRate: `${(monthlyRate * 100).toFixed(1)}% monthly growth rate`,
    timeToGoal: monthsToGoal <= 60 ? `~${monthsToGoal} months to reach ${goalFollowers >= 1000 ? `${goalFollowers / 1000}K` : goalFollowers}` : `60+ months — consider adjusting strategy or goals`,
    actionPlan,
    benchmarks,
    monetizationMilestones: monetizationMilestones.filter(m => m.followers >= currentFollowers),
    platformTips: platformTips[platform] || platformTips['Instagram'],
    contentMix,
  };
}

export default function GrowthCalculatorPage() {
  const [platform, setPlatform] = useState<string>('Instagram');
  const [currentFollowers, setCurrentFollowers] = useState(1000);
  const [goalFollowers, setGoalFollowers] = useState(10000);
  const [niche, setNiche] = useState<string>('Tech/SaaS');
  const [postsPerWeek, setPostsPerWeek] = useState(5);
  const [strategy, setStrategy] = useState<string>('Organic + Collaborations');
  const [result, setResult] = useState<GrowthResult | null>(null);

  const handleGenerate = () => {
    setResult(calculateGrowth(platform, currentFollowers, goalFollowers, niche, postsPerWeek, strategy));
  };

  return (
    <main className="min-h-screen bg-zinc-950 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Audience Growth Calculator</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Project your follower growth, set realistic milestones, and get a personalized action plan to reach your goals.</p>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Platform</label>
            <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {platforms.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Current Followers</label>
            <input type="number" value={currentFollowers} onChange={e => setCurrentFollowers(Number(e.target.value))} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white" />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Goal Followers</label>
            <input type="number" value={goalFollowers} onChange={e => setGoalFollowers(Number(e.target.value))} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white" />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Niche</label>
            <select value={niche} onChange={e => setNiche(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {niches.map(n => <option key={n}>{n}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Posts per Week</label>
            <input type="number" value={postsPerWeek} onChange={e => setPostsPerWeek(Number(e.target.value))} min={1} max={21} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white" />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Growth Strategy</label>
            <select value={strategy} onChange={e => setStrategy(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {strategies.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <button onClick={handleGenerate} className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition">
          Calculate Growth
        </button>

        {result && (
          <div className="mt-10 space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-zinc-900 border border-violet-500/30 rounded-xl p-5 text-center">
                <p className="text-sm text-zinc-400">Growth Rate</p>
                <p className="text-2xl font-bold text-green-400">{result.growthRate}</p>
              </div>
              <div className="bg-zinc-900 border border-violet-500/30 rounded-xl p-5 text-center">
                <p className="text-sm text-zinc-400">Time to Goal</p>
                <p className="text-2xl font-bold text-white">{result.timeToGoal}</p>
              </div>
              <div className="bg-zinc-900 border border-violet-500/30 rounded-xl p-5 text-center">
                <p className="text-sm text-zinc-400">12-Month Projection</p>
                <p className="text-2xl font-bold text-violet-400">{result.projections[11]?.followers.toLocaleString()}</p>
              </div>
            </div>

            {/* Monthly Projections */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3">12-Month Projection</h3>
              <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                {result.projections.map(p => (
                  <div key={p.month} className={`bg-zinc-800 rounded-lg p-3 text-center ${p.milestone ? 'ring-1 ring-green-500/50' : ''}`}>
                    <p className="text-xs text-zinc-500">Month {p.month}</p>
                    <p className="text-sm font-bold text-white">{p.followers.toLocaleString()}</p>
                    {p.milestone && <p className="text-xs text-green-400 mt-1">{p.milestone}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Plan */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Action Plan</h3>
              {result.actionPlan.map((phase, i) => (
                <div key={i} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-violet-400">{phase.phase}</span>
                    <span className="text-xs text-zinc-500">{phase.duration}</span>
                  </div>
                  <ul className="space-y-1">{phase.actions.map((a, j) => <li key={j} className="text-sm text-zinc-300 flex gap-2"><span className="text-green-400">→</span>{a}</li>)}</ul>
                </div>
              ))}
            </div>

            {/* Content Mix + Benchmarks */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Ideal Content Mix</h3>
                {result.contentMix.map((c, i) => (
                  <div key={i} className="mb-3">
                    <div className="flex justify-between text-sm mb-1"><span className="text-white">{c.type}</span><span className="text-violet-400">{c.percentage}%</span></div>
                    <div className="w-full bg-zinc-800 rounded-full h-2"><div className="bg-violet-600 h-2 rounded-full" style={{ width: `${c.percentage}%` }} /></div>
                    <p className="text-xs text-zinc-500 mt-1">{c.reason}</p>
                  </div>
                ))}
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Benchmarks</h3>
                {result.benchmarks.map((b, i) => (
                  <div key={i} className="mb-3 bg-zinc-800 rounded-lg p-3">
                    <p className="text-sm text-white">{b.metric}</p>
                    <div className="flex justify-between text-xs mt-1"><span className="text-violet-400">You: {b.yourValue}</span><span className="text-zinc-500">Avg: {b.industryAvg}</span></div>
                    <p className="text-xs text-zinc-500 mt-1">{b.verdict}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Monetization + Platform Tips */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Monetization Milestones</h3>
              {result.monetizationMilestones.map((m, i) => (
                <div key={i} className="flex items-center justify-between bg-zinc-800 rounded-lg p-3 mb-2">
                  <div>
                    <span className="text-white text-sm font-medium">{m.followers >= 1000 ? `${m.followers / 1000}K` : m.followers} followers</span>
                    <p className="text-xs text-zinc-500">{m.opportunity}</p>
                  </div>
                  <span className="text-green-400 text-sm font-medium">{m.estimatedRevenue}</span>
                </div>
              ))}
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Platform Tips</h3>
              <ul className="space-y-2">{result.platformTips.map((t, i) => <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-violet-400">•</span>{t}</li>)}</ul>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-zinc-400 mb-3">Grow Faster</h3>
              <div className="flex flex-wrap gap-2 text-sm">
                <a href="/content-calendar" className="text-violet-400 hover:text-violet-300 underline">Content Calendar</a>
                <a href="/post-timing" className="text-violet-400 hover:text-violet-300 underline">Post Timing</a>
                <a href="/hashtags" className="text-violet-400 hover:text-violet-300 underline">Hashtags</a>
                <a href="/hooks" className="text-violet-400 hover:text-violet-300 underline">Hook Generator</a>
                <a href="/engagement-calculator" className="text-violet-400 hover:text-violet-300 underline">Engagement Calculator</a>
                <a href="/content-recycler" className="text-violet-400 hover:text-violet-300 underline">Content Recycler</a>
              </div>
            </div>
          </div>
        )}

        <section className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">Growth Calculator FAQ</h2>
          <div className="space-y-4">
            {[
              { q: 'How accurate are these projections?', a: 'These are estimates based on platform averages. Actual growth depends on content quality, consistency, niche competition, and algorithm changes. Use them as directional guides, not guarantees.' },
              { q: 'Which platform grows fastest?', a: 'TikTok has the highest organic growth potential (5-10% monthly for consistent creators). LinkedIn is second for professional content. Instagram and YouTube are slower but have higher monetization per follower.' },
              { q: 'How many followers do I need to make money?', a: 'You can start monetizing at 1,000 followers with affiliate marketing and micro-influencer deals. At 10K+, brand partnerships become consistent. Quality of engagement matters more than raw follower count.' },
            ].map((faq, i) => (
              <details key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <summary className="font-semibold text-white cursor-pointer">{faq.q}</summary>
                <p className="text-zinc-400 text-sm mt-2">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <footer className="mt-20 border-t border-zinc-800 pt-8 pb-12">
          <div className="grid md:grid-cols-4 gap-8 text-sm text-zinc-500">
            <div><h4 className="font-semibold text-white mb-3">Creation</h4><ul className="space-y-1"><li><a href="/" className="hover:text-white transition">Posts</a></li><li><a href="/carousel-generator" className="hover:text-white transition">Carousel</a></li><li><a href="/story-planner" className="hover:text-white transition">Stories</a></li><li><a href="/poll-quiz" className="hover:text-white transition">Polls</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Optimization</h4><ul className="space-y-1"><li><a href="/hashtags" className="hover:text-white transition">Hashtags</a></li><li><a href="/post-timing" className="hover:text-white transition">Timing</a></li><li><a href="/virality-score" className="hover:text-white transition">Virality</a></li><li><a href="/link-in-bio" className="hover:text-white transition">Bio Links</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Analytics</h4><ul className="space-y-1"><li><a href="/growth-calculator" className="hover:text-white transition">Growth</a></li><li><a href="/engagement-calculator" className="hover:text-white transition">Engagement</a></li><li><a href="/roi-calculator" className="hover:text-white transition">ROI</a></li><li><a href="/influencer-score" className="hover:text-white transition">Influencer</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Strategy</h4><ul className="space-y-1"><li><a href="/content-calendar" className="hover:text-white transition">Calendar</a></li><li><a href="/brand-voice" className="hover:text-white transition">Brand Voice</a></li><li><a href="/campaign" className="hover:text-white transition">Campaign</a></li><li><a href="/content-recycler" className="hover:text-white transition">Recycler</a></li></ul></div>
          </div>
          <p className="text-center text-zinc-600 text-xs mt-8">© 2026 PostCraft AI. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
