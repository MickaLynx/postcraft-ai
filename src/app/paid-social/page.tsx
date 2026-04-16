'use client';
import { useState } from 'react';

const platforms = ['Facebook Ads', 'Instagram Ads', 'TikTok Ads', 'LinkedIn Ads', 'Twitter/X Ads', 'Pinterest Ads', 'YouTube Ads', 'Snapchat Ads'] as const;
const objectives = ['Brand Awareness', 'Lead Generation', 'Conversions', 'App Installs', 'Traffic', 'Video Views', 'Engagement'] as const;
const budgets = ['$500', '$1K', '$2.5K', '$5K', '$10K', '$25K', '$50K+'] as const;
const industries = ['E-commerce', 'SaaS', 'Local Business', 'Agency', 'Education', 'Health & Fitness', 'Finance', 'Real Estate', 'Entertainment', 'Non-profit'] as const;

interface CampaignBlueprint {
  campaignName: string;
  adSets: { name: string; audience: string; budget: string }[];
  dailyBudget: string;
  estimatedReach: string;
  estimatedCPM: string;
  estimatedCPC: string;
  estimatedConversions: string;
  roasProjection: string;
}

interface AudienceSegment {
  name: string;
  sizeEstimate: string;
  interests: string[];
  behaviors: string[];
  demographics: string;
  bidStrategy: string;
  estimatedCPA: string;
}

interface AdCreativeBrief {
  adType: string;
  headline: string;
  primaryText: string;
  cta: string;
  hookAngle: string;
  targetEmotion: string;
  estimatedCTR: string;
}

interface BudgetAllocation {
  stage: string;
  percentage: number;
  amount: string;
  objective: string;
  kpis: string[];
  expectedResults: string;
}

interface ABTest {
  variable: string;
  control: string;
  test: string;
  sampleSize: string;
  duration: string;
  successMetric: string;
  minimumLift: string;
}

interface ScalingPhase {
  phase: string;
  budget: string;
  strategy: string;
  targets: string[];
  risks: string[];
  adjustments: string;
}

interface KPIMetric {
  name: string;
  target: string;
  benchmark: string;
  formula: string;
  frequency: string;
}

interface PaidSocialResult {
  blueprint: CampaignBlueprint;
  audiences: AudienceSegment[];
  creatives: AdCreativeBrief[];
  budgetAllocation: BudgetAllocation[];
  abTests: ABTest[];
  scalingRoadmap: ScalingPhase[];
  kpis: KPIMetric[];
}

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function generate(platform: string, objective: string, budget: string, industry: string, audience: string): PaidSocialResult {
  const seed = hash(`${platform}${objective}${budget}${industry}${audience}`);
  const p = (i: number) => ((seed * (i + 3)) % 100);
  const audienceLabel = audience || 'target demographic';
  const budgetNum = { '$500': 500, '$1K': 1000, '$2.5K': 2500, '$5K': 5000, '$10K': 10000, '$25K': 25000, '$50K+': 50000 }[budget] || 5000;
  const daily = Math.round(budgetNum / 30);

  const blueprint: CampaignBlueprint = {
    campaignName: `${industry} ${objective} — ${platform} Q2 2026`,
    adSets: [
      { name: 'Prospecting — Cold', audience: `Lookalike of ${audienceLabel}`, budget: `$${Math.round(daily * 0.4)}/day` },
      { name: 'Retargeting — Warm', audience: 'Website visitors + engagers (7-30 days)', budget: `$${Math.round(daily * 0.35)}/day` },
      { name: 'Conversion — Hot', audience: 'Cart abandoners + high-intent signals', budget: `$${Math.round(daily * 0.25)}/day` },
    ],
    dailyBudget: `$${daily}`,
    estimatedReach: `${Math.round(budgetNum * (15 + p(1) % 25) / 10).toLocaleString()} people/month`,
    estimatedCPM: `$${(3 + (p(2) % 15)).toFixed(2)}`,
    estimatedCPC: `$${(0.3 + (p(3) % 30) / 10).toFixed(2)}`,
    estimatedConversions: `${Math.round(budgetNum / (8 + p(4) % 30))}/month`,
    roasProjection: `${(1.5 + (p(5) % 35) / 10).toFixed(1)}x`,
  };

  const audiences: AudienceSegment[] = [
    { name: 'Core Target', sizeEstimate: `${(500 + p(10) * 30)}K`, interests: [`${industry} enthusiasts`, `${audienceLabel} interests`, 'Online shopping'], behaviors: ['Engaged shoppers', 'Frequent mobile users'], demographics: `Ages 25-44, ${audienceLabel}`, bidStrategy: 'Lowest Cost with Bid Cap', estimatedCPA: `$${(5 + p(11) % 25).toFixed(2)}` },
    { name: '1% Lookalike — Buyers', sizeEstimate: `${(1 + p(12) % 3)}.${p(13) % 10}M`, interests: ['Auto-matched by platform'], behaviors: ['Purchase behavior similar to existing customers'], demographics: 'Broad — platform-optimized', bidStrategy: 'Cost Cap', estimatedCPA: `$${(8 + p(14) % 20).toFixed(2)}` },
    { name: 'Interest Stack', sizeEstimate: `${(300 + p(15) * 20)}K`, interests: [`${industry} tools`, `${industry} tips`, 'Competitor followers'], behaviors: ['Content consumers', 'Newsletter subscribers'], demographics: `Ages 22-38, interested in ${industry}`, bidStrategy: 'Lowest Cost', estimatedCPA: `$${(6 + p(16) % 18).toFixed(2)}` },
    { name: 'Retargeting Pool', sizeEstimate: `${(10 + p(17) % 90)}K`, interests: ['Already engaged with brand'], behaviors: ['Website visits', 'Video viewers 50%+', 'Form starters'], demographics: 'All ages — warm audience', bidStrategy: 'Bid Cap (aggressive)', estimatedCPA: `$${(2 + p(18) % 10).toFixed(2)}` },
    { name: 'Competitor Conquest', sizeEstimate: `${(200 + p(19) * 15)}K`, interests: ['Competitor brand names', 'Industry leaders', 'Comparison shoppers'], behaviors: ['Actively researching solutions'], demographics: `Ages 28-50, ${industry} decision-makers`, bidStrategy: 'Target Cost', estimatedCPA: `$${(10 + p(20) % 20).toFixed(2)}` },
  ];

  const adTypes = ['Video (15s)', 'Image (Static)', 'Carousel (5 slides)', 'Story/Reel', 'Video (30s)', 'UGC-style'];
  const emotions = ['Curiosity', 'FOMO', 'Aspiration', 'Trust', 'Urgency', 'Relief'];
  const hooks = ['Problem-Agitate', 'Social Proof', 'Before/After', 'Question Hook', 'Bold Claim', 'Story-Led'];
  const ctas = ['Shop Now', 'Learn More', 'Get Started', 'Try Free', 'See How', 'Claim Offer'];
  const creatives: AdCreativeBrief[] = adTypes.map((type, i) => ({
    adType: type,
    headline: [
      `Stop Wasting Money on ${industry} That Doesn't Work`,
      `${(2 + p(30 + i) % 8)}K+ ${industry} Professionals Trust This`,
      `Before vs After: Real ${industry} Results in ${(7 + p(31 + i) % 24)} Days`,
      `Is Your ${industry} Strategy Actually Working?`,
      `We Grew ${(p(32 + i) % 5) + 2}x in ${(p(33 + i) % 6) + 1} Months — Here's How`,
      `The ${industry} Secret Nobody Talks About`,
    ][i],
    primaryText: [
      `Most ${audienceLabel} waste 80% of their budget. Here's the ${(p(34 + i) % 3) + 3}-step framework that changes everything.`,
      `Join ${(2 + p(35 + i) % 8)}K+ professionals who switched. Average ROI: ${blueprint.roasProjection}. See why.`,
      `Real results from real ${audienceLabel}. No fluff, no theory — just what works right now in ${industry}.`,
      `We analyzed ${(50 + p(36 + i) % 450)}+ ${industry} campaigns. The top ${(p(37 + i) % 5) + 3}% all do this one thing.`,
      `From struggling to scaling — our exact ${industry} playbook (with real numbers).`,
      `The algorithm just changed. Here's what ${audienceLabel} need to know to stay ahead.`,
    ][i],
    cta: ctas[i],
    hookAngle: hooks[i],
    targetEmotion: emotions[i],
    estimatedCTR: `${(0.8 + (p(40 + i) % 35) / 10).toFixed(1)}%`,
  }));

  const budgetAllocation: BudgetAllocation[] = [
    { stage: 'TOFU — Awareness', percentage: 40, amount: `$${Math.round(budgetNum * 0.4).toLocaleString()}`, objective: 'Reach & impressions', kpis: ['CPM', 'Reach', 'Video views', 'Brand lift'], expectedResults: `${Math.round(budgetNum * 0.4 / (5 + p(50) % 10) * 1000).toLocaleString()} impressions` },
    { stage: 'MOFU — Consideration', percentage: 35, amount: `$${Math.round(budgetNum * 0.35).toLocaleString()}`, objective: 'Engagement & leads', kpis: ['CPC', 'CTR', 'Lead cost', 'Engagement rate'], expectedResults: `${Math.round(budgetNum * 0.35 / (1 + p(51) % 4)).toLocaleString()} clicks` },
    { stage: 'BOFU — Conversion', percentage: 25, amount: `$${Math.round(budgetNum * 0.25).toLocaleString()}`, objective: 'Sales & signups', kpis: ['CPA', 'ROAS', 'Conversion rate', 'Revenue'], expectedResults: `${Math.round(budgetNum * 0.25 / (10 + p(52) % 25))} conversions` },
  ];

  const abTests: ABTest[] = [
    { variable: 'Ad Creative', control: 'Static image with benefit headline', test: 'UGC-style video testimonial', sampleSize: `${Math.round(budgetNum * 3)} impressions`, duration: '7 days', successMetric: 'CTR', minimumLift: '15%' },
    { variable: 'Headline Copy', control: 'Feature-focused headline', test: 'Outcome-focused headline', sampleSize: `${Math.round(budgetNum * 2)} impressions`, duration: '5 days', successMetric: 'CPC', minimumLift: '10%' },
    { variable: 'Audience', control: 'Interest-based targeting', test: '1% Lookalike audience', sampleSize: `${Math.round(budgetNum * 4)} impressions`, duration: '10 days', successMetric: 'CPA', minimumLift: '20%' },
    { variable: 'Landing Page', control: 'Long-form sales page', test: 'Short-form with video', sampleSize: `${Math.round(budgetNum)} clicks`, duration: '14 days', successMetric: 'Conversion Rate', minimumLift: '12%' },
    { variable: 'Bid Strategy', control: 'Lowest Cost (auto)', test: 'Cost Cap at target CPA', sampleSize: `$${Math.round(budgetNum * 0.3)} spend`, duration: '7 days', successMetric: 'ROAS', minimumLift: '0.3x improvement' },
  ];

  const scalingRoadmap: ScalingPhase[] = [
    { phase: 'Week 1-2: Testing', budget: `$${Math.round(budgetNum * 0.5).toLocaleString()}`, strategy: 'Launch all creatives, run A/B tests, identify winners', targets: ['Find winning creative (CTR > 2%)', 'Identify best audience', 'Establish baseline CPA'], risks: ['Overspending on losers', 'Insufficient data'], adjustments: 'Kill underperformers at day 4. Reallocate to top 2 ads.' },
    { phase: 'Week 3-4: Optimize', budget: `$${Math.round(budgetNum * 0.8).toLocaleString()}`, strategy: 'Scale winners, refine audiences, launch retargeting', targets: ['Reduce CPA by 20%', 'Scale winning ads 2x', 'Build retargeting pools'], risks: ['Creative fatigue', 'Audience saturation'], adjustments: 'Refresh ad copy every 5 days. Expand lookalike to 2-3%.' },
    { phase: 'Month 2: Scale', budget: `$${Math.round(budgetNum * 1.5).toLocaleString()}`, strategy: 'Increase budget on proven campaigns, add new platforms', targets: [`ROAS > ${blueprint.roasProjection}`, 'Test 2nd platform', 'Launch dynamic ads'], risks: ['Diminishing returns at scale', 'Platform algo shifts'], adjustments: 'Use CBO (Campaign Budget Optimization). Add UGC creatives.' },
    { phase: 'Month 3: Maximize', budget: `$${Math.round(budgetNum * 2).toLocaleString()}`, strategy: 'Full funnel optimization, automate reporting, plan Q3', targets: ['Predictable CPA within 10% variance', 'Automated rules for scaling', '3+ creative variations per ad set'], risks: ['Market seasonality', 'Competitor copying'], adjustments: 'Refresh entire creative suite. Test emerging formats (AR, interactive).' },
  ];

  const kpis: KPIMetric[] = [
    { name: 'Cost Per Acquisition (CPA)', target: `$${(5 + p(60) % 30).toFixed(2)}`, benchmark: `$${(8 + p(61) % 35).toFixed(2)} (${industry} avg)`, formula: 'Total Spend / Conversions', frequency: 'Daily' },
    { name: 'Return on Ad Spend (ROAS)', target: blueprint.roasProjection, benchmark: `${(1.5 + (p(62) % 20) / 10).toFixed(1)}x (${industry} avg)`, formula: 'Revenue / Ad Spend', frequency: 'Weekly' },
    { name: 'Click-Through Rate (CTR)', target: `${(1.5 + (p(63) % 25) / 10).toFixed(1)}%`, benchmark: `${(0.9 + (p(64) % 15) / 10).toFixed(1)}% (${platform} avg)`, formula: 'Clicks / Impressions × 100', frequency: 'Daily' },
    { name: 'Cost Per Click (CPC)', target: blueprint.estimatedCPC, benchmark: `$${(0.5 + (p(65) % 30) / 10).toFixed(2)} (${industry} avg)`, formula: 'Total Spend / Clicks', frequency: 'Daily' },
    { name: 'Conversion Rate', target: `${(2 + (p(66) % 8))}.${p(67) % 10}%`, benchmark: `${(1 + (p(68) % 5))}.${p(69) % 10}% (${industry} avg)`, formula: 'Conversions / Clicks × 100', frequency: 'Weekly' },
    { name: 'Cost Per Mille (CPM)', target: blueprint.estimatedCPM, benchmark: `$${(5 + (p(70) % 20)).toFixed(2)} (${platform} avg)`, formula: 'Spend / Impressions × 1000', frequency: 'Daily' },
    { name: 'Frequency', target: `${(1.5 + (p(71) % 10) / 10).toFixed(1)}`, benchmark: '2.5 (fatigue threshold)', formula: 'Impressions / Unique Reach', frequency: 'Weekly' },
    { name: 'Thumb-Stop Rate', target: `${(20 + p(72) % 30)}%`, benchmark: `${(15 + p(73) % 20)}% (${platform} avg)`, formula: 'Video Plays (3s) / Impressions × 100', frequency: 'Per Creative' },
  ];

  return { blueprint, audiences, creatives, budgetAllocation, abTests, scalingRoadmap, kpis };
}

export default function PaidSocialPage() {
  const [platform, setPlatform] = useState<string>(platforms[0]);
  const [objective, setObjective] = useState<string>(objectives[0]);
  const [budget, setBudget] = useState<string>(budgets[3]);
  const [industry, setIndustry] = useState<string>(industries[0]);
  const [audience, setAudience] = useState('');
  const [result, setResult] = useState<PaidSocialResult | null>(null);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50 px-4 py-16 max-w-7xl mx-auto">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">Paid Social Campaign Planner</h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">Generate a complete paid social strategy — campaign blueprint, audience segments, ad creatives, budget allocation, A/B tests, scaling roadmap, and KPI dashboard.</p>
      </section>

      <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Ad Platform</label>
            <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100">
              {platforms.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Campaign Objective</label>
            <select value={objective} onChange={e => setObjective(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100">
              {objectives.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Monthly Budget</label>
            <select value={budget} onChange={e => setBudget(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100">
              {budgets.map(b => <option key={b}>{b}</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Industry</label>
            <select value={industry} onChange={e => setIndustry(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100">
              {industries.map(i => <option key={i}>{i}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Target Audience</label>
            <input value={audience} onChange={e => setAudience(e.target.value)} placeholder="e.g. women 25-34 interested in yoga" className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100" />
          </div>
        </div>
        <button onClick={() => setResult(generate(platform, objective, budget, industry, audience))} className="w-full py-3 rounded-xl font-bold text-lg bg-gradient-to-r from-purple-500 to-rose-500 hover:from-purple-400 hover:to-rose-400 transition">Generate Campaign Plan</button>
      </section>

      {result && (
        <div className="space-y-10">
          {/* Campaign Blueprint */}
          <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4">🎯 Campaign Blueprint</h2>
            <div className="text-lg font-semibold text-purple-400 mb-3">{result.blueprint.campaignName}</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {[
                { label: 'Daily Budget', value: result.blueprint.dailyBudget, color: 'text-emerald-400' },
                { label: 'Est. Reach', value: result.blueprint.estimatedReach, color: 'text-blue-400' },
                { label: 'Est. CPM', value: result.blueprint.estimatedCPM, color: 'text-cyan-400' },
                { label: 'Est. CPC', value: result.blueprint.estimatedCPC, color: 'text-teal-400' },
                { label: 'Est. Conversions', value: result.blueprint.estimatedConversions, color: 'text-pink-400' },
                { label: 'ROAS Projection', value: result.blueprint.roasProjection, color: 'text-purple-400' },
              ].map(m => (
                <div key={m.label} className="bg-zinc-800/50 rounded-xl p-3 text-center">
                  <div className="text-xs text-zinc-500">{m.label}</div>
                  <div className={`font-bold text-lg ${m.color}`}>{m.value}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {result.blueprint.adSets.map((s, i) => (
                <div key={i} className="bg-zinc-800/50 rounded-xl p-3">
                  <div className="font-bold text-sm text-rose-400">{s.name}</div>
                  <div className="text-xs text-zinc-400">{s.audience}</div>
                  <div className="text-xs text-emerald-400 mt-1">{s.budget}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Audience Segments */}
          <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4">👥 Audience Segments</h2>
            <div className="space-y-3">
              {result.audiences.map((a, i) => (
                <div key={i} className="bg-zinc-800/50 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-purple-400">{a.name}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-zinc-700 text-zinc-300">{a.sizeEstimate}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-xs mb-2">
                    <div><span className="text-zinc-500">Interests:</span> <span className="text-zinc-300">{a.interests.join(', ')}</span></div>
                    <div><span className="text-zinc-500">Behaviors:</span> <span className="text-zinc-300">{a.behaviors.join(', ')}</span></div>
                    <div><span className="text-zinc-500">Demo:</span> <span className="text-zinc-300">{a.demographics}</span></div>
                    <div><span className="text-zinc-500">Bid:</span> <span className="text-cyan-400">{a.bidStrategy}</span></div>
                  </div>
                  <div className="text-xs text-emerald-400">Est. CPA: {a.estimatedCPA}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Ad Creative Briefs */}
          <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4">🎨 Ad Creative Briefs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {result.creatives.map((c, i) => (
                <div key={i} className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-purple-900/50 text-purple-400">{c.adType}</span>
                    <span className="text-xs text-emerald-400">CTR: {c.estimatedCTR}</span>
                  </div>
                  <h3 className="font-bold text-sm mb-1">{c.headline}</h3>
                  <p className="text-xs text-zinc-400 mb-2">{c.primaryText}</p>
                  <div className="grid grid-cols-3 gap-1 text-xs">
                    <div className="bg-zinc-900/50 rounded p-1 text-center"><span className="text-zinc-500">CTA</span><br /><span className="text-pink-400">{c.cta}</span></div>
                    <div className="bg-zinc-900/50 rounded p-1 text-center"><span className="text-zinc-500">Hook</span><br /><span className="text-cyan-400">{c.hookAngle}</span></div>
                    <div className="bg-zinc-900/50 rounded p-1 text-center"><span className="text-zinc-500">Emotion</span><br /><span className="text-yellow-400">{c.targetEmotion}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Budget Allocation */}
          <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4">💰 Budget Allocation</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {result.budgetAllocation.map((b, i) => (
                <div key={i} className="bg-zinc-800/50 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-pink-400">{b.stage}</h3>
                    <span className="text-2xl font-extrabold text-purple-400">{b.percentage}%</span>
                  </div>
                  <div className="w-full bg-zinc-700 rounded-full h-3 mb-3"><div className="h-3 rounded-full bg-gradient-to-r from-purple-500 to-rose-500" style={{ width: `${b.percentage}%` }} /></div>
                  <div className="text-sm text-emerald-400 mb-2">{b.amount}</div>
                  <div className="text-xs text-zinc-400 mb-2">{b.objective}</div>
                  <div className="flex flex-wrap gap-1">{b.kpis.map((k, j) => <span key={j} className="text-xs px-2 py-0.5 rounded-full bg-zinc-700 text-zinc-300">{k}</span>)}</div>
                  <div className="text-xs text-cyan-400 mt-2">Expected: {b.expectedResults}</div>
                </div>
              ))}
            </div>
          </section>

          {/* A/B Testing Plan */}
          <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4">🧪 A/B Testing Plan</h2>
            <div className="space-y-3">
              {result.abTests.map((t, i) => (
                <div key={i} className="bg-zinc-800/50 rounded-xl p-4">
                  <h3 className="font-bold text-cyan-400 mb-2">Test #{i + 1}: {t.variable}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                    <div><span className="text-zinc-500">Control:</span> <span className="text-zinc-300">{t.control}</span></div>
                    <div><span className="text-zinc-500">Variant:</span> <span className="text-emerald-400">{t.test}</span></div>
                    <div><span className="text-zinc-500">Sample:</span> <span className="text-zinc-300">{t.sampleSize}</span></div>
                    <div><span className="text-zinc-500">Duration:</span> <span className="text-zinc-300">{t.duration}</span></div>
                    <div><span className="text-zinc-500">Metric:</span> <span className="text-pink-400">{t.successMetric}</span></div>
                    <div><span className="text-zinc-500">Min Lift:</span> <span className="text-yellow-400">{t.minimumLift}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Scaling Roadmap */}
          <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4">📈 Scaling Roadmap</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.scalingRoadmap.map((s, i) => (
                <div key={i} className="bg-zinc-800/50 rounded-xl p-4 border-l-4 border-purple-500">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-purple-400">{s.phase}</h3>
                    <span className="text-sm font-bold text-emerald-400">{s.budget}</span>
                  </div>
                  <p className="text-sm text-zinc-400 mb-2">{s.strategy}</p>
                  <div className="mb-2">{s.targets.map((t, j) => <div key={j} className="text-xs text-cyan-400">✅ {t}</div>)}</div>
                  <div className="mb-2">{s.risks.map((r, j) => <div key={j} className="text-xs text-red-400">⚠️ {r}</div>)}</div>
                  <div className="text-xs text-zinc-500 italic">💡 {s.adjustments}</div>
                </div>
              ))}
            </div>
          </section>

          {/* KPI Dashboard */}
          <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4">📊 KPI Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {result.kpis.map((k, i) => (
                <div key={i} className="bg-zinc-800/50 rounded-xl p-3">
                  <div className="text-xs text-zinc-500 mb-1">{k.name}</div>
                  <div className="text-xl font-bold text-purple-400">{k.target}</div>
                  <div className="text-xs text-zinc-500 mt-1">Benchmark: {k.benchmark}</div>
                  <div className="text-xs text-zinc-600 mt-1">{k.formula}</div>
                  <div className="text-xs text-cyan-400 mt-1">📅 {k.frequency}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
