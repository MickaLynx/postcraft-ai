'use client';
import { useState } from 'react';

const adPlatforms = ['Meta (Facebook/Instagram)', 'Google Ads', 'TikTok Ads', 'LinkedIn Ads', 'Twitter/X Ads', 'Pinterest Ads', 'Snapchat Ads', 'Reddit Ads'] as const;
const goals = ['Awareness', 'Leads', 'Sales', 'App Installs', 'Engagement'] as const;
const industries = ['Tech/SaaS', 'E-commerce', 'Finance', 'Healthcare', 'Education', 'Food & Beverage', 'Fashion', 'Real Estate', 'Fitness', 'Agency', 'Travel', 'Gaming'] as const;
const audienceSizes = ['Under 100K', '100K-500K', '500K-1M', '1M-5M', '5M-10M', '10M+'] as const;
const durations = ['1 week', '2 weeks', '1 month', '3 months', '6 months', '12 months'] as const;

interface PlatformAllocation {
  platform: string;
  percentage: number;
  budget: number;
  impressions: string;
  clicks: string;
  conversions: string;
  cpc: string;
  cpm: string;
  reasoning: string;
}

interface BudgetResult {
  allocations: PlatformAllocation[];
  roiProjection: { optimistic: string; realistic: string; conservative: string; breakEvenDays: string };
  optimizationTips: { tip: string; impact: string; difficulty: string }[];
  abTestBudget: { amount: number; percentage: number; recommendation: string; tests: string[] };
  scalingRoadmap: { period: string; budget: string; focus: string; expectedResults: string }[];
  warnings: string[];
  summary: { totalBudget: string; platformCount: number; primaryGoal: string; expectedROAS: string };
}

function generateBudgetPlan(budget: number, selectedPlatforms: string[], goal: string, industry: string, audienceSize: string, duration: string): BudgetResult {
  const isSmallBudget = budget < 1000;
  const isMediumBudget = budget >= 1000 && budget < 10000;
  const isLargeBudget = budget >= 10000;

  const platformData: Record<string, { goalWeight: Record<string, number>; avgCPC: number; avgCPM: number; convRate: number }> = {
    'Meta (Facebook/Instagram)': { goalWeight: { Awareness: 0.30, Leads: 0.28, Sales: 0.30, 'App Installs': 0.25, Engagement: 0.25 }, avgCPC: 0.97, avgCPM: 7.19, convRate: 0.094 },
    'Google Ads': { goalWeight: { Awareness: 0.15, Leads: 0.30, Sales: 0.35, 'App Installs': 0.20, Engagement: 0.10 }, avgCPC: 2.69, avgCPM: 3.12, convRate: 0.071 },
    'TikTok Ads': { goalWeight: { Awareness: 0.25, Leads: 0.10, Sales: 0.15, 'App Installs': 0.30, Engagement: 0.30 }, avgCPC: 1.00, avgCPM: 10.00, convRate: 0.064 },
    'LinkedIn Ads': { goalWeight: { Awareness: 0.10, Leads: 0.25, Sales: 0.05, 'App Installs': 0.02, Engagement: 0.10 }, avgCPC: 5.26, avgCPM: 6.59, convRate: 0.062 },
    'Twitter/X Ads': { goalWeight: { Awareness: 0.10, Leads: 0.05, Sales: 0.05, 'App Installs': 0.08, Engagement: 0.15 }, avgCPC: 0.38, avgCPM: 6.46, convRate: 0.040 },
    'Pinterest Ads': { goalWeight: { Awareness: 0.05, Leads: 0.02, Sales: 0.08, 'App Installs': 0.02, Engagement: 0.05 }, avgCPC: 1.50, avgCPM: 2.00, convRate: 0.052 },
    'Snapchat Ads': { goalWeight: { Awareness: 0.03, Leads: 0.01, Sales: 0.02, 'App Installs': 0.10, Engagement: 0.03 }, avgCPC: 1.00, avgCPM: 2.95, convRate: 0.045 },
    'Reddit Ads': { goalWeight: { Awareness: 0.02, Leads: 0.01, Sales: 0.02, 'App Installs': 0.03, Engagement: 0.02 }, avgCPC: 0.75, avgCPM: 3.50, convRate: 0.051 },
  };

  // Calculate allocation percentages based on goal weights
  const filteredPlatforms = selectedPlatforms.filter(p => platformData[p]);
  const totalWeight = filteredPlatforms.reduce((sum, p) => sum + (platformData[p].goalWeight[goal] || 0.1), 0);

  const allocations: PlatformAllocation[] = filteredPlatforms.map(p => {
    const data = platformData[p];
    const weight = data.goalWeight[goal] || 0.1;
    const percentage = Math.round((weight / totalWeight) * 100);
    const platformBudget = Math.round(budget * (weight / totalWeight));
    const impressions = Math.round(platformBudget / data.avgCPM * 1000);
    const clicks = Math.round(platformBudget / data.avgCPC);
    const conversions = Math.round(clicks * data.convRate);

    const reasoningMap: Record<string, string> = {
      'Awareness': `Strong reach capabilities with ${data.avgCPM < 5 ? 'low' : 'competitive'} CPM rates`,
      'Leads': `${data.convRate > 0.07 ? 'High' : 'Moderate'} conversion rate for lead generation campaigns`,
      'Sales': `${data.avgCPC < 2 ? 'Cost-effective' : 'Premium'} clicks with proven purchase intent signals`,
      'App Installs': `${p.includes('TikTok') || p.includes('Snap') ? 'Mobile-first audience ideal for installs' : 'Cross-device tracking enables install attribution'}`,
      'Engagement': `${data.avgCPC < 1 ? 'Affordable engagement' : 'Quality engagement'} with ${p.includes('TikTok') ? 'viral potential' : 'established audience'}`,
    };

    return {
      platform: p,
      percentage,
      budget: platformBudget,
      impressions: impressions > 1000000 ? `${(impressions / 1000000).toFixed(1)}M` : impressions > 1000 ? `${(impressions / 1000).toFixed(1)}K` : `${impressions}`,
      clicks: clicks > 1000 ? `${(clicks / 1000).toFixed(1)}K` : `${clicks}`,
      conversions: `${conversions}`,
      cpc: `$${data.avgCPC.toFixed(2)}`,
      cpm: `$${data.avgCPM.toFixed(2)}`,
      reasoning: reasoningMap[goal] || 'Balanced allocation for multi-objective campaigns',
    };
  });

  const totalConversions = allocations.reduce((sum, a) => sum + parseInt(a.conversions), 0);
  const avgRevenuePerConversion = goal === 'Sales' ? 85 : goal === 'Leads' ? 35 : goal === 'App Installs' ? 15 : 5;
  const projectedRevenue = totalConversions * avgRevenuePerConversion;

  const roiProjection = {
    optimistic: `${((projectedRevenue * 1.4 / budget) * 100).toFixed(0)}% ROI ($${Math.round(projectedRevenue * 1.4).toLocaleString()} revenue)`,
    realistic: `${((projectedRevenue / budget) * 100).toFixed(0)}% ROI ($${Math.round(projectedRevenue).toLocaleString()} revenue)`,
    conservative: `${((projectedRevenue * 0.6 / budget) * 100).toFixed(0)}% ROI ($${Math.round(projectedRevenue * 0.6).toLocaleString()} revenue)`,
    breakEvenDays: `${Math.round(budget / (projectedRevenue / 30))} days (estimated)`,
  };

  const optimizationTips = [
    { tip: 'Start with Broad Targeting, then narrow based on performance data after 7 days', impact: 'HIGH — reduces CPA by 20-30%', difficulty: 'Easy' },
    { tip: `Allocate 70% of budget to ${allocations[0]?.platform || 'top platform'} initially, diversify after validation`, impact: 'HIGH — faster learning with concentrated spend', difficulty: 'Easy' },
    { tip: 'Use Lookalike/Similar Audiences built from your best customers (top 5% by LTV)', impact: 'HIGH — 2-3x better conversion rates', difficulty: 'Medium' },
    { tip: 'Set up conversion tracking with server-side events (not just pixel) for accurate attribution', impact: 'CRITICAL — without this, optimization is blind', difficulty: 'Medium' },
    { tip: 'Launch 3-5 ad variations per ad set and let the algorithm find winners (do not pick manually)', impact: 'MEDIUM — 15-25% performance improvement', difficulty: 'Easy' },
    { tip: 'Pause underperforming ads after 1000 impressions if CTR is below 1% — do not waste budget', impact: 'MEDIUM — recovers 10-20% of wasted spend', difficulty: 'Easy' },
    { tip: 'Use dayparting to concentrate spend during peak conversion hours (check analytics for your data)', impact: 'MEDIUM — 10-15% CPA reduction', difficulty: 'Medium' },
    { tip: isSmallBudget ? 'With a small budget, focus on 1-2 platforms maximum for meaningful data' : 'Scale winning campaigns by 20% every 3-5 days (avoid budget shock)', impact: 'HIGH — prevents algorithm reset from sudden changes', difficulty: 'Easy' },
  ];

  const abTestPercentage = isSmallBudget ? 20 : isMediumBudget ? 15 : 10;
  const abTestBudget = {
    amount: Math.round(budget * abTestPercentage / 100),
    percentage: abTestPercentage,
    recommendation: `Reserve ${abTestPercentage}% of budget ($${Math.round(budget * abTestPercentage / 100).toLocaleString()}) for continuous A/B testing`,
    tests: [
      'Test 3 different ad creatives (image vs video vs carousel) — run for 7 days minimum',
      'Test 2 audience segments (broad vs narrow/lookalike) — need 100+ conversions per variant',
      'Test landing page variations (long-form vs short-form) — track with UTM parameters',
      'Test ad copy angles (pain-point vs benefit-driven vs social proof) — minimum 1000 impressions each',
      'Test bidding strategies (lowest cost vs cost cap vs bid cap) — run for 14 days minimum',
    ],
  };

  const monthlyBudget = budget;
  const scalingRoadmap = [
    {
      period: 'Month 1-3',
      budget: `$${monthlyBudget.toLocaleString()}/mo`,
      focus: 'Testing & Learning — validate audiences, creatives, and platforms',
      expectedResults: `${totalConversions} conversions/mo, CPA: $${(budget / Math.max(totalConversions, 1)).toFixed(2)}`,
    },
    {
      period: 'Month 4-6',
      budget: `$${Math.round(monthlyBudget * 1.5).toLocaleString()}/mo (+50%)`,
      focus: 'Optimization — double down on winners, cut losers, expand lookalikes',
      expectedResults: `${Math.round(totalConversions * 1.8)} conversions/mo (80% increase from optimization)`,
    },
    {
      period: 'Month 7-12',
      budget: `$${Math.round(monthlyBudget * 2.5).toLocaleString()}/mo (+150%)`,
      focus: 'Scaling — new platforms, retargeting layers, full-funnel strategy',
      expectedResults: `${Math.round(totalConversions * 3.5)} conversions/mo (sustained growth with stable CPA)`,
    },
  ];

  const warnings: string[] = [];
  if (isSmallBudget) warnings.push('Budget under $1,000/mo: Focus on 1-2 platforms max. Spreading too thin prevents meaningful optimization.');
  if (selectedPlatforms.length > 4 && budget < 5000) warnings.push('Too many platforms for this budget. Each platform needs $500+ minimum for algorithm learning.');
  if (goal === 'Leads' && !selectedPlatforms.some(p => p.includes('Google') || p.includes('Meta') || p.includes('LinkedIn'))) warnings.push('For lead generation, Meta, Google, or LinkedIn should be in your mix — they have the strongest lead-gen tools.');
  if (goal === 'App Installs' && !selectedPlatforms.some(p => p.includes('TikTok') || p.includes('Meta') || p.includes('Google'))) warnings.push('For app installs, TikTok, Meta, or Google (UAC) should be prioritized — best mobile install optimization.');
  if (budget > 50000 && selectedPlatforms.length < 3) warnings.push('With $50K+ budget, diversify across 3+ platforms to reduce dependency risk.');

  return {
    allocations,
    roiProjection,
    optimizationTips,
    abTestBudget,
    scalingRoadmap,
    warnings,
    summary: {
      totalBudget: `$${budget.toLocaleString()}`,
      platformCount: filteredPlatforms.length,
      primaryGoal: goal,
      expectedROAS: `${(projectedRevenue / budget).toFixed(1)}x`,
    },
  };
}

export default function AdBudgetPage() {
  const [budget, setBudget] = useState(5000);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['Meta (Facebook/Instagram)', 'Google Ads']);
  const [goal, setGoal] = useState<string>(goals[0]);
  const [industry, setIndustry] = useState<string>(industries[0]);
  const [audienceSize, setAudienceSize] = useState<string>(audienceSizes[2]);
  const [duration, setDuration] = useState<string>(durations[2]);
  const [result, setResult] = useState<BudgetResult | null>(null);

  const togglePlatform = (p: string) => {
    setSelectedPlatforms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Ad Budget Optimizer</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">AI-powered ad spend allocation calculator. Get platform-specific budgets, ROI projections, and a scaling roadmap for your campaigns.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Monthly Budget: ${budget.toLocaleString()}</label>
            <input type="range" min="100" max="100000" step="100" value={budget} onChange={e => setBudget(parseInt(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>$100</span><span>$25K</span><span>$50K</span><span>$75K</span><span>$100K</span></div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Platforms (select all that apply)</label>
            <div className="flex flex-wrap gap-2">{adPlatforms.map(p => (
              <button key={p} onClick={() => togglePlatform(p)} className={`px-4 py-2 rounded-xl text-sm font-medium transition ${selectedPlatforms.includes(p) ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{p}</button>
            ))}</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Campaign Goal</label>
              <select value={goal} onChange={e => setGoal(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                {goals.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Industry</label>
              <select value={industry} onChange={e => setIndustry(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                {industries.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Target Audience</label>
              <select value={audienceSize} onChange={e => setAudienceSize(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                {audienceSizes.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Duration</label>
              <select value={duration} onChange={e => setDuration(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                {durations.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => setResult(generateBudgetPlan(budget, selectedPlatforms, goal, industry, audienceSize, duration))} className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl">Optimize Budget</button>
        </div>

        {result && (
          <div className="space-y-6">
            {result.warnings.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                <h2 className="text-lg font-bold text-amber-800 mb-2">Warnings</h2>
                <ul className="space-y-1">{result.warnings.map((w, i) => <li key={i} className="text-amber-700 text-sm">{w}</li>)}</ul>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-emerald-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-emerald-600 font-semibold mb-1">Total Budget</p>
                  <p className="text-2xl font-bold text-emerald-700">{result.summary.totalBudget}</p>
                </div>
                <div className="bg-emerald-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-emerald-600 font-semibold mb-1">Platforms</p>
                  <p className="text-2xl font-bold text-emerald-700">{result.summary.platformCount}</p>
                </div>
                <div className="bg-emerald-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-emerald-600 font-semibold mb-1">Goal</p>
                  <p className="text-xl font-bold text-emerald-700">{result.summary.primaryGoal}</p>
                </div>
                <div className="bg-emerald-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-emerald-600 font-semibold mb-1">Expected ROAS</p>
                  <p className="text-2xl font-bold text-emerald-700">{result.summary.expectedROAS}</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Budget Allocation by Platform</h2>
              <div className="space-y-4">{result.allocations.map((a, i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-gray-900 text-lg">{a.platform}</span>
                    <div className="flex gap-3">
                      <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-lg text-sm font-bold">{a.percentage}%</span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-bold">${a.budget.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 mb-3">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${a.percentage}%` }} />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-center">
                    <div><p className="text-xs text-gray-400">Impressions</p><p className="text-sm font-bold text-gray-900">{a.impressions}</p></div>
                    <div><p className="text-xs text-gray-400">Clicks</p><p className="text-sm font-bold text-gray-900">{a.clicks}</p></div>
                    <div><p className="text-xs text-gray-400">Conversions</p><p className="text-sm font-bold text-gray-900">{a.conversions}</p></div>
                    <div><p className="text-xs text-gray-400">Avg CPC</p><p className="text-sm font-bold text-gray-900">{a.cpc}</p></div>
                    <div><p className="text-xs text-gray-400">Avg CPM</p><p className="text-sm font-bold text-gray-900">{a.cpm}</p></div>
                  </div>
                  <p className="text-gray-500 text-xs mt-2">{a.reasoning}</p>
                </div>
              ))}</div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">ROI Projection</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-green-600 font-semibold mb-1">Optimistic</p>
                  <p className="text-sm font-bold text-green-700">{result.roiProjection.optimistic}</p>
                </div>
                <div className="bg-emerald-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-emerald-600 font-semibold mb-1">Realistic</p>
                  <p className="text-sm font-bold text-emerald-700">{result.roiProjection.realistic}</p>
                </div>
                <div className="bg-amber-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-amber-600 font-semibold mb-1">Conservative</p>
                  <p className="text-sm font-bold text-amber-700">{result.roiProjection.conservative}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 font-semibold mb-1">Break-Even</p>
                  <p className="text-sm font-bold text-gray-700">{result.roiProjection.breakEvenDays}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Optimization Tips</h2>
              <div className="space-y-3">{result.optimizationTips.map((t, i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${t.impact.startsWith('CRITICAL') ? 'bg-red-100 text-red-700' : t.impact.startsWith('HIGH') ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{t.impact.split(' — ')[0]}</span>
                    <span className={`px-2 py-1 rounded text-xs ${t.difficulty === 'Easy' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>{t.difficulty}</span>
                  </div>
                  <p className="text-gray-700 text-sm">{t.tip}</p>
                  <p className="text-gray-500 text-xs mt-1">{t.impact}</p>
                </div>
              ))}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">A/B Testing Budget</h2>
                <div className="bg-emerald-50 rounded-xl p-4 text-center mb-4">
                  <p className="text-3xl font-bold text-emerald-700">${result.abTestBudget.amount.toLocaleString()}</p>
                  <p className="text-sm text-emerald-600">{result.abTestBudget.percentage}% of total budget</p>
                </div>
                <p className="text-gray-600 text-sm mb-3">{result.abTestBudget.recommendation}</p>
                <ul className="space-y-2">{result.abTestBudget.tests.map((t, i) => <li key={i} className="text-gray-700 text-sm bg-gray-50 rounded-lg p-3">{t}</li>)}</ul>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Scaling Roadmap</h2>
                <div className="space-y-4">{result.scalingRoadmap.map((s, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-gray-900 text-sm">{s.period}</span>
                      <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-lg text-xs font-bold">{s.budget}</span>
                    </div>
                    <p className="text-gray-700 text-sm mb-1">{s.focus}</p>
                    <p className="text-gray-500 text-xs">{s.expectedResults}</p>
                  </div>
                ))}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
