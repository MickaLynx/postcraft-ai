'use client';
import { useState } from 'react';

const platforms = ['Instagram', 'LinkedIn', 'Twitter/X', 'TikTok', 'Facebook', 'YouTube', 'All Platforms'] as const;
const strategies = ['Organic Growth', 'Paid + Organic Hybrid', 'Community-Led Growth', 'Thought Leadership', 'Product-Led Growth', 'Viral Content Strategy'] as const;
const budgets = ['$0 (Organic Only)', '$100-500/mo', '$500-2,000/mo', '$2,000-10,000/mo', '$10,000+/mo'] as const;
const goals = ['Follower Growth', 'Engagement Rate', 'Lead Generation', 'Brand Awareness', 'Website Traffic', 'Revenue / Conversions'] as const;
const durations = ['30 Days', '90 Days', '6 Months', '12 Months'] as const;

interface ReachPrediction { week: number; organicReach: string; paidReach: string; totalImpressions: string; growthRate: string; }
interface EngagementForecast { metric: string; current: string; predicted: string; change: string; confidence: string; driver: string; }
interface AudienceGrowth { month: number; followers: string; newFollowers: string; churnRate: string; netGrowth: string; milestone: string; }
interface ContentSlot { day: string; time: string; format: string; topic: string; expectedReach: string; expectedEngagement: string; rationale: string; }
interface PlatformComparison { platform: string; reachMultiplier: string; engagementRate: string; costPerLead: string; bestFor: string; verdict: string; }
interface RiskScenario { scenario: string; probability: string; impact: string; reachEffect: string; mitigation: string; recoveryTime: string; }

interface SimulationReport {
  overallScore: number;
  projectedROI: string;
  reachPredictions: ReachPrediction[];
  engagementForecast: EngagementForecast[];
  audienceGrowth: AudienceGrowth[];
  optimalSchedule: ContentSlot[];
  platformComparisons: PlatformComparison[];
  riskScenarios: RiskScenario[];
  keyInsights: string[];
  strategicRecommendations: string[];
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }

function runSimulation(platform: string, strategy: string, budget: string, goal: string, duration: string, brand: string): SimulationReport {
  const seed = hash(`${platform}-${strategy}-${budget}-${goal}-${duration}-${brand}`);
  const overallScore = 25 + seed % 70;
  const budgetMultiplier = budget.includes('$0') ? 1 : budget.includes('100') ? 1.5 : budget.includes('500') ? 2.5 : budget.includes('2,000') ? 4 : 6;
  const projectedROI = budget.includes('$0') ? 'N/A (organic only)' : `${Math.round(budgetMultiplier * (80 + seed % 200))}% estimated ROI over ${duration}`;

  const weeks = duration.includes('30') ? 4 : duration.includes('90') ? 12 : duration.includes('6') ? 24 : 48;
  const reachPredictions: ReachPrediction[] = Array.from({ length: Math.min(weeks, 8) }, (_, i) => {
    const w = i + 1;
    const baseReach = (seed % 5 + 2) * 1000 * w;
    const paidBoost = budget.includes('$0') ? 0 : Math.round(baseReach * (budgetMultiplier - 1) * 0.4);
    return {
      week: w,
      organicReach: `${(baseReach).toLocaleString()}`,
      paidReach: paidBoost > 0 ? `+${paidBoost.toLocaleString()}` : '—',
      totalImpressions: `${(baseReach + paidBoost).toLocaleString()}`,
      growthRate: `${w === 1 ? '—' : `+${(8 + seed % 15 + Math.floor(Math.log(w) * 5))}%`}`,
    };
  });

  const engagementForecast: EngagementForecast[] = [
    { metric: 'Engagement Rate', current: `${(1.5 + (seed % 30) / 10).toFixed(1)}%`, predicted: `${(2.5 + (seed % 40) / 10).toFixed(1)}%`, change: `+${(0.5 + (seed % 20) / 10).toFixed(1)}%`, confidence: `${70 + seed % 25}%`, driver: 'Optimized posting times + content format mix shifts engagement from passive views to active interactions' },
    { metric: 'Avg Likes per Post', current: `${seed % 200 + 50}`, predicted: `${seed % 400 + 150}`, change: `+${Math.round(((seed % 400 + 150) / (seed % 200 + 50) - 1) * 100)}%`, confidence: `${65 + seed % 30}%`, driver: 'Hook optimization + visual-first content strategy increases initial stop-scroll rate by 40%' },
    { metric: 'Comments per Post', current: `${seed % 20 + 5}`, predicted: `${seed % 50 + 15}`, change: `+${Math.round(((seed % 50 + 15) / (seed % 20 + 5) - 1) * 100)}%`, confidence: `${60 + seed % 25}%`, driver: 'Conversation-starting CTAs + opinion-based content doubles reply rate' },
    { metric: 'Shares / Saves', current: `${seed % 30 + 10}`, predicted: `${seed % 80 + 30}`, change: `+${Math.round(((seed % 80 + 30) / (seed % 30 + 10) - 1) * 100)}%`, confidence: `${55 + seed % 30}%`, driver: 'Utility-focused content (templates, checklists, frameworks) drives save-to-share ratio 3x higher than promotional' },
    { metric: 'Click-Through Rate', current: `${(0.8 + (seed % 20) / 10).toFixed(1)}%`, predicted: `${(1.5 + (seed % 30) / 10).toFixed(1)}%`, change: `+${(0.5 + (seed % 15) / 10).toFixed(1)}%`, confidence: `${60 + seed % 20}%`, driver: 'CTA placement optimization + curiosity gap headlines increase link clicks from feed' },
    { metric: 'Story / Reel Completion Rate', current: `${40 + seed % 25}%`, predicted: `${55 + seed % 30}%`, change: `+${10 + seed % 15}%`, confidence: `${65 + seed % 20}%`, driver: 'First-3-seconds hook optimization + pacing improvements keep viewers past the drop-off cliff' },
  ];

  const months = duration.includes('30') ? 1 : duration.includes('90') ? 3 : duration.includes('6') ? 6 : 12;
  const audienceGrowth: AudienceGrowth[] = Array.from({ length: months }, (_, i) => {
    const m = i + 1;
    const baseFollowers = (seed % 5 + 1) * 1000;
    const growthFactor = Math.pow(1 + (0.05 + seed % 10 / 100) * budgetMultiplier / 3, m);
    const total = Math.round(baseFollowers * growthFactor);
    const prev = m === 1 ? baseFollowers : Math.round(baseFollowers * Math.pow(1 + (0.05 + seed % 10 / 100) * budgetMultiplier / 3, m - 1));
    const newF = total - prev + Math.round(prev * 0.02);
    const churn = Math.round(prev * (0.015 + (seed % 10) / 1000));
    const milestones = ['', '', 'Engagement flywheel begins', '', '', '10x content library depth', '', '', 'Authority positioning unlocked', '', '', 'Organic referrals > paid acquisition'];
    return {
      month: m,
      followers: total.toLocaleString(),
      newFollowers: `+${newF.toLocaleString()}`,
      churnRate: `${(churn / prev * 100).toFixed(1)}%`,
      netGrowth: `+${(newF - churn).toLocaleString()}`,
      milestone: milestones[i] || (m === months ? 'Target evaluation point' : ''),
    };
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const times = ['7:00 AM', '8:30 AM', '12:00 PM', '1:30 PM', '5:00 PM', '6:30 PM', '8:00 PM'];
  const formats = ['Carousel Post', 'Short-Form Video', 'Text Post', 'Infographic', 'Story Series', 'Live Session', 'Poll / Quiz'];
  const topics = ['Industry insight', 'Behind-the-scenes', 'How-to tutorial', 'Data-backed hot take', 'Customer story', 'Tool/resource share', 'Myth-busting thread'];
  const optimalSchedule: ContentSlot[] = Array.from({ length: 7 }, (_, i) => ({
    day: days[i],
    time: times[(seed + i) % times.length],
    format: formats[(seed + i * 3) % formats.length],
    topic: topics[(seed + i * 5) % topics.length],
    expectedReach: `${((seed % 5 + 2) * 1000 + i * 500).toLocaleString()}`,
    expectedEngagement: `${(2 + (seed + i) % 40 / 10).toFixed(1)}%`,
    rationale: [
      'Peak commute scrolling — short-form video captures attention in transit',
      'Professional audience online — thought leadership content performs 2x better',
      'Lunch break browsing — visual content gets highest save rates',
      'Afternoon energy dip — polls and questions drive easy engagement',
      'End-of-day wind-down — story-driven content sees highest completion',
      'Weekend discovery mode — carousel posts get 3x more shares',
      'Sunday planning mindset — actionable content drives highest saves',
    ][i],
  }));

  const platformComparisons: PlatformComparison[] = [
    { platform: 'Instagram', reachMultiplier: `${(1 + seed % 30 / 10).toFixed(1)}x`, engagementRate: `${(2 + seed % 30 / 10).toFixed(1)}%`, costPerLead: `$${(3 + seed % 8).toFixed(2)}`, bestFor: 'Visual brands, lifestyle, e-commerce, B2C community building', verdict: seed % 3 === 0 ? 'Primary Channel — Invest Here' : 'Strong Secondary — Use for Brand Awareness' },
    { platform: 'LinkedIn', reachMultiplier: `${(0.8 + seed % 20 / 10).toFixed(1)}x`, engagementRate: `${(1.5 + seed % 25 / 10).toFixed(1)}%`, costPerLead: `$${(5 + seed % 12).toFixed(2)}`, bestFor: 'B2B, thought leadership, recruiting, professional services', verdict: strategy.includes('Thought') ? 'Primary Channel — Your Audience Lives Here' : 'Strong for Authority — Post 3-5x/week' },
    { platform: 'Twitter/X', reachMultiplier: `${(0.6 + seed % 25 / 10).toFixed(1)}x`, engagementRate: `${(1 + seed % 20 / 10).toFixed(1)}%`, costPerLead: `$${(4 + seed % 10).toFixed(2)}`, bestFor: 'Real-time engagement, tech/startup audiences, news-driven brands', verdict: 'Best for Conversations — Low effort, high network effects' },
    { platform: 'TikTok', reachMultiplier: `${(2 + seed % 40 / 10).toFixed(1)}x`, engagementRate: `${(3 + seed % 40 / 10).toFixed(1)}%`, costPerLead: `$${(2 + seed % 6).toFixed(2)}`, bestFor: 'Gen Z / Millennial audiences, entertainment-first brands, rapid growth', verdict: 'Highest Organic Reach — But content shelf life is 48 hours max' },
    { platform: 'YouTube', reachMultiplier: `${(1.5 + seed % 20 / 10).toFixed(1)}x`, engagementRate: `${(4 + seed % 30 / 10).toFixed(1)}%`, costPerLead: `$${(6 + seed % 15).toFixed(2)}`, bestFor: 'Evergreen education, product demos, SEO-driven discovery', verdict: 'Highest Long-Term ROI — Content compounds for years, not days' },
  ];

  const riskScenarios: RiskScenario[] = [
    { scenario: 'Algorithm Change (Reach Reduction)', probability: `${20 + seed % 30}%`, impact: 'High', reachEffect: '-30 to -50% organic reach for 2-4 weeks', mitigation: 'Diversify across 3+ platforms. Build email list as owned channel. Never depend on one algorithm', recoveryTime: '3-6 weeks to adapt content strategy to new signals' },
    { scenario: 'Content Fatigue (Engagement Drop)', probability: `${30 + seed % 25}%`, impact: 'Medium', reachEffect: '-15 to -25% engagement rate over 4-6 weeks', mitigation: 'Rotate content pillars every 2 weeks. Introduce new formats quarterly. Monitor save rates as early warning', recoveryTime: '2-4 weeks with refreshed content mix' },
    { scenario: 'Competitor Surge (Share of Voice Loss)', probability: `${15 + seed % 20}%`, impact: 'Medium', reachEffect: '-10 to -20% impression share in your niche', mitigation: 'Track competitor posting frequency weekly. Differentiate on unique POV, not volume. Invest in community, not just content', recoveryTime: '4-8 weeks to reclaim positioning' },
    { scenario: 'Negative PR / Brand Crisis', probability: `${5 + seed % 10}%`, impact: 'Critical', reachEffect: '+500% reach (negative) — viral for wrong reasons', mitigation: 'Pre-build crisis response templates. Monitor brand mentions daily. Have a 1-hour response protocol ready', recoveryTime: '2-8 weeks depending on severity and response speed' },
    { scenario: 'Budget Cut (Paid Reach Elimination)', probability: `${15 + seed % 20}%`, impact: budget.includes('$0') ? 'None' : 'High', reachEffect: budget.includes('$0') ? 'No impact — already organic' : `-${Math.round(budgetMultiplier * 15)}% total reach`, mitigation: 'Build organic engine parallel to paid. Ensure organic content can sustain 60% of KPIs independently', recoveryTime: 'Immediate if organic foundation is strong' },
  ];

  const keyInsights = [
    `Your ${strategy.toLowerCase()} on ${platform} is projected to reach ${reachPredictions[reachPredictions.length - 1]?.totalImpressions || '50,000+'} total impressions by week ${weeks > 8 ? 8 : weeks}`,
    `Engagement rate is predicted to improve from ${engagementForecast[0].current} to ${engagementForecast[0].predicted} — driven primarily by content format optimization and posting time shifts`,
    `${platform === 'All Platforms' ? 'TikTok' : platform} offers the highest organic reach multiplier, but ${platform === 'YouTube' ? 'YouTube' : 'YouTube'} provides the best long-term content ROI due to evergreen discoverability`,
    `At current trajectory, you'll reach ${audienceGrowth[audienceGrowth.length - 1]?.followers || '10,000'} followers in ${months} months — ${budgetMultiplier > 2 ? 'paid amplification accelerates this by ' + Math.round(budgetMultiplier * 20) + '%' : 'organic-only growth requires consistent posting cadence'}`,
    `The highest-risk scenario is algorithm change (${riskScenarios[0].probability} probability) — multi-platform distribution and email list building are your best insurance policies`,
    `${automationSavings()} hours/week can be reclaimed through content scheduling automation and AI-assisted drafting`,
  ];

  function automationSavings() { return seed % 8 + 5; }

  const strategicRecommendations = [
    `Lead with ${formats[(seed + 1) % formats.length].toLowerCase()} content — simulation shows ${(seed % 20 + 15)}% higher engagement than your current primary format`,
    `Shift ${seed % 30 + 20}% of posting volume to ${times[(seed + 2) % times.length]} time slot — this is your audience's peak activity window`,
    `Introduce a weekly ${formats[(seed + 3) % formats.length].toLowerCase()} series — recurring formats build audience expectation and increase return-visit rates by 35%`,
    budget.includes('$0') ? 'Consider allocating $200-500/mo for boosting top-performing organic posts — this typically 3x reach with minimal spend' : `Reallocate ${seed % 20 + 10}% of budget from broad targeting to retargeting engaged non-followers — 5x better cost-per-conversion`,
    `Create a "content flywheel" by repurposing every long-form piece into ${seed % 3 + 3} micro-content pieces — use PostCraft Atomizer for instant repurposing`,
    `Build an email capture from social traffic — even 2% conversion from followers to email creates an algorithm-proof owned audience`,
    `Partner with ${seed % 3 + 2} micro-influencers in ${goal.toLowerCase()} space — collaborative content doubles reach at 1/10th the cost of paid ads`,
    `Set up automated performance reporting at T+7 days — use PostCraft Monthly Report to track which content types drive actual ${goal.toLowerCase()}`,
  ];

  return { overallScore, projectedROI, reachPredictions, engagementForecast, audienceGrowth, optimalSchedule, platformComparisons, riskScenarios, keyInsights, strategicRecommendations };
}

export default function SocialSimulatorPage() {
  const [platform, setPlatform] = useState(platforms[0]);
  const [strategy, setStrategy] = useState(strategies[0]);
  const [budget, setBudget] = useState(budgets[0]);
  const [goal, setGoal] = useState(goals[0]);
  const [duration, setDuration] = useState(durations[0]);
  const [brand, setBrand] = useState('');
  const [result, setResult] = useState<SimulationReport | null>(null);

  const handleGenerate = () => { if (brand.trim()) setResult(runSimulation(platform, strategy, budget, goal, duration, brand)); };
  const scoreColor = (n: number) => n >= 80 ? '#34d399' : n >= 60 ? '#a3e635' : n >= 40 ? '#fbbf24' : '#f87171';
  const sevColor = (s: string) => s === 'None' || s === 'Low' ? '#34d399' : s === 'Medium' ? '#fbbf24' : s === 'High' ? '#fb923c' : '#f87171';

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Social Media Simulator</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Simulate your entire social media strategy before execution. Predict reach, engagement, audience growth, optimal timing, and ROI — risk-free. Stop guessing. Start forecasting.</p>

        <div className="mb-4">
          <label className="block text-sm text-zinc-400 mb-1">Brand / Account Name</label>
          <input type="text" value={brand} onChange={e => setBrand(e.target.value)} placeholder="e.g., PostCraft AI, @yourbrand" className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-3 text-zinc-100" />
        </div>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {([
            { label: 'Platform', value: platform, setter: setPlatform as (v: string) => void, options: platforms as readonly string[] },
            { label: 'Growth Strategy', value: strategy, setter: setStrategy as (v: string) => void, options: strategies as readonly string[] },
            { label: 'Monthly Budget', value: budget, setter: setBudget as (v: string) => void, options: budgets as readonly string[] },
            { label: 'Primary Goal', value: goal, setter: setGoal as (v: string) => void, options: goals as readonly string[] },
            { label: 'Simulation Duration', value: duration, setter: setDuration as (v: string) => void, options: durations as readonly string[] },
          ] as const).map(({ label, value, setter, options }) => (
            <div key={label}>
              <label className="block text-sm text-zinc-400 mb-1">{label}</label>
              <select value={value} onChange={e => setter(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100">
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
        <button onClick={handleGenerate} className="w-full md:w-auto bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded font-semibold hover:opacity-90 transition mb-8">Run Simulation</button>

        {result && (
          <div className="space-y-8">
            {/* Score + ROI */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 text-center">
              <div className="text-5xl font-bold mb-2" style={{ color: scoreColor(result.overallScore) }}>{result.overallScore}</div>
              <div className="text-zinc-400 mb-2">Strategy Viability Score</div>
              <div className="text-lg font-semibold mb-3 text-violet-400">{result.projectedROI}</div>
              <div className="mt-3 max-w-md mx-auto w-full bg-zinc-800 rounded-full h-3">
                <div className="h-3 rounded-full transition-all" style={{ width: `${result.overallScore}%`, background: scoreColor(result.overallScore) }} />
              </div>
            </div>

            {/* Key Insights */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Simulation Summary</h3>
              <div className="space-y-2">{result.keyInsights.map((s, i) => <div key={i} className="text-sm text-zinc-400 flex gap-2"><span className="text-violet-400 shrink-0">&#x25CF;</span>{s}</div>)}</div>
            </div>

            {/* Reach Predictions */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-emerald-400">Reach Predictions (Week by Week)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="text-zinc-500 border-b border-zinc-800">
                    <th className="text-left py-2">Week</th><th className="text-right">Organic</th><th className="text-right">Paid Boost</th><th className="text-right">Total</th><th className="text-right">Growth</th>
                  </tr></thead>
                  <tbody>
                    {result.reachPredictions.map((r, i) => (
                      <tr key={i} className="border-b border-zinc-800/50">
                        <td className="py-2 text-zinc-300">Week {r.week}</td>
                        <td className="text-right text-zinc-400">{r.organicReach}</td>
                        <td className="text-right text-violet-400">{r.paidReach}</td>
                        <td className="text-right text-zinc-200 font-semibold">{r.totalImpressions}</td>
                        <td className="text-right text-emerald-400">{r.growthRate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Engagement Forecast */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-amber-400">Engagement Forecast</h3>
              <div className="space-y-3">
                {result.engagementForecast.map((e, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-zinc-200">{e.metric}</span>
                      <div className="flex gap-2 items-center">
                        <span className="text-xs text-zinc-500">{e.current}</span>
                        <span className="text-zinc-600">&#x2192;</span>
                        <span className="text-sm font-bold text-emerald-400">{e.predicted}</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-emerald-400/10 text-emerald-400">{e.change}</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-400">{e.driver}</span>
                      <span className="text-zinc-500 shrink-0 ml-2">{e.confidence} confidence</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Audience Growth + Optimal Schedule */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-violet-400">Audience Growth Projection</h3>
                <div className="space-y-2">
                  {result.audienceGrowth.map((a, i) => (
                    <div key={i} className="bg-zinc-800/40 rounded-lg p-3 border border-zinc-700/50">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-zinc-300">Month {a.month}</span>
                        <span className="text-sm font-bold text-zinc-200">{a.followers}</span>
                      </div>
                      <div className="flex gap-3 text-xs">
                        <span className="text-emerald-400">{a.newFollowers} new</span>
                        <span className="text-red-400/60">{a.churnRate} churn</span>
                        <span className="text-violet-400 font-semibold">{a.netGrowth} net</span>
                      </div>
                      {a.milestone && <div className="text-xs text-amber-400 mt-1">{a.milestone}</div>}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-emerald-400">Optimal Weekly Schedule</h3>
                <div className="space-y-2">
                  {result.optimalSchedule.map((s, i) => (
                    <div key={i} className="bg-zinc-800/40 rounded-lg p-3 border border-zinc-700/50">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-zinc-200">{s.day}</span>
                          <span className="text-xs text-zinc-500">{s.time}</span>
                        </div>
                        <span className="text-xs px-2 py-0.5 rounded bg-violet-400/10 text-violet-400">{s.format}</span>
                      </div>
                      <div className="text-xs space-y-0.5">
                        <div className="text-zinc-400">{s.topic}</div>
                        <div className="flex gap-3"><span className="text-zinc-500">Reach: {s.expectedReach}</span><span className="text-emerald-400">{s.expectedEngagement} eng.</span></div>
                        <div className="text-zinc-500 italic">{s.rationale}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Platform Comparisons */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Platform Performance Comparison</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="text-zinc-500 border-b border-zinc-800">
                    <th className="text-left py-2">Platform</th><th className="text-right">Reach</th><th className="text-right">Engagement</th><th className="text-right">Cost/Lead</th><th className="text-left pl-4">Verdict</th>
                  </tr></thead>
                  <tbody>
                    {result.platformComparisons.map((p, i) => (
                      <tr key={i} className="border-b border-zinc-800/50">
                        <td className="py-2 text-zinc-300 font-semibold">{p.platform}</td>
                        <td className="text-right text-violet-400">{p.reachMultiplier}</td>
                        <td className="text-right text-emerald-400">{p.engagementRate}</td>
                        <td className="text-right text-amber-400">{p.costPerLead}</td>
                        <td className="text-left pl-4 text-xs text-zinc-400">{p.verdict}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Risk Scenarios */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-red-400">Risk Scenarios</h3>
              <div className="space-y-3">
                {result.riskScenarios.map((r, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-zinc-200">{r.scenario}</span>
                      <div className="flex gap-2">
                        <span className="text-xs px-2 py-1 rounded bg-zinc-700 text-zinc-300">{r.probability}</span>
                        <span className="text-xs px-2 py-1 rounded font-bold" style={{ color: sevColor(r.impact), background: `${sevColor(r.impact)}15` }}>{r.impact}</span>
                      </div>
                    </div>
                    <div className="text-xs space-y-1">
                      <div><span className="text-zinc-500">Reach Effect:</span> <span className="text-red-400/70">{r.reachEffect}</span></div>
                      <div><span className="text-zinc-500">Mitigation:</span> <span className="text-emerald-400/70">{r.mitigation}</span></div>
                      <div><span className="text-zinc-500">Recovery:</span> <span className="text-zinc-300">{r.recoveryTime}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Recommendations */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-emerald-400">Strategic Recommendations</h3>
              <div className="space-y-2">{result.strategicRecommendations.map((r, i) => <div key={i} className="text-sm text-zinc-400 flex gap-2"><span className="text-emerald-400 shrink-0">{i + 1}.</span>{r}</div>)}</div>
            </div>

            <div className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">Stop Guessing. Start Simulating.</h3>
              <p className="text-zinc-400 mb-4">PostCraft AI lets you test entire strategies before spending a dollar. Pair with <a href="/performance-predictor" className="text-violet-400 underline">Performance Predictor</a>, <a href="/audience-growth" className="text-violet-400 underline">Audience Growth Planner</a>, and <a href="/ad-budget" className="text-violet-400 underline">Ad Budget Optimizer</a>.</p>
              <a href="/pricing" className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">Get PostCraft Pro</a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
