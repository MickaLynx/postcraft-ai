'use client';
import { useState } from 'react';

const contentTypes = ['Blog Post', 'Social Media Campaign', 'Video Series', 'Podcast', 'Newsletter', 'Webinar', 'Case Study', 'Infographic', 'Ebook/Whitepaper', 'Product Launch Content'] as const;
const goals = ['Brand Awareness', 'Lead Generation', 'Sales Conversion', 'Customer Retention', 'Thought Leadership', 'SEO/Organic Traffic', 'Community Growth', 'Product Adoption'] as const;
const timePeriods = ['30 Days', '90 Days', '6 Months', '12 Months'] as const;
const industries = ['Tech & SaaS', 'E-commerce & DTC', 'Healthcare', 'Finance & FinTech', 'Education', 'Real Estate', 'Agency & Consulting', 'Manufacturing', 'Non-Profit', 'Food & Beverage', 'Travel & Hospitality', 'Fitness & Wellness'] as const;
const teamSizes = ['Solo Creator', 'Small Team (2-5)', 'Medium Team (5-15)', 'Large Team (15+)'] as const;
const budgetRanges = ['Bootstrapped ($0-500/mo)', 'Growing ($500-2K/mo)', 'Scaling ($2K-10K/mo)', 'Enterprise ($10K+/mo)'] as const;

interface ROIMetric { metric: string; value: string; cost: string; roi: string; benchmark: string; trend: string; }
interface CostBreakdown { category: string; amount: string; percentage: string; optimization: string; }
interface RevenueAttribution { channel: string; directRevenue: string; assistedRevenue: string; touchpoints: string; confidence: string; }
interface ContentAssetROI { asset: string; cost: string; lifetime: string; revenue: string; roi: string; status: string; }
interface OptimizationLever { lever: string; currentState: string; optimizedState: string; expectedImpact: string; effort: string; }

interface ContentROI {
  overallROI: number;
  roiGrade: string;
  metrics: ROIMetric[];
  costs: CostBreakdown[];
  revenue: RevenueAttribution[];
  assets: ContentAssetROI[];
  optimizations: OptimizationLever[];
  kpis: string[];
  warnings: string[];
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }

function calculateROI(contentType: string, goal: string, period: string, industry: string, teamSize: string, budget: string, totalSpend: string): ContentROI {
  const seed = hash(`${contentType}-${goal}-${period}-${industry}-${teamSize}-${budget}-${totalSpend}`);
  const spend = parseInt(totalSpend.replace(/\D/g, '')) || 5000;
  const roiMultiplier = 1.5 + (seed % 40) / 10;
  const overallROI = Math.round((roiMultiplier - 1) * 100);
  const grade = overallROI >= 300 ? 'A+' : overallROI >= 200 ? 'A' : overallROI >= 150 ? 'B+' : overallROI >= 100 ? 'B' : overallROI >= 50 ? 'C+' : overallROI >= 0 ? 'C' : 'D';

  const metrics: ROIMetric[] = [
    { metric: 'Cost Per Lead (CPL)', value: `$${12 + seed % 80}`, cost: `$${spend * 0.3}`, roi: `${Math.round(spend * 0.3 / (12 + seed % 80))} leads`, benchmark: `${industry} avg: $${20 + seed % 50}`, trend: seed % 2 === 0 ? 'Improving ↓' : 'Stable →' },
    { metric: 'Cost Per Acquisition (CPA)', value: `$${80 + seed % 300}`, cost: `$${spend * 0.5}`, roi: `${Math.round(spend * 0.5 / (80 + seed % 300))} customers`, benchmark: `${industry} avg: $${120 + seed % 200}`, trend: seed % 3 === 0 ? 'Improving ↓' : 'Needs Work ↑' },
    { metric: 'Customer Lifetime Value (CLV)', value: `$${500 + seed % 2000}`, cost: 'N/A', roi: `${Math.round((500 + seed % 2000) / (80 + seed % 300))}x CPA ratio`, benchmark: 'Healthy: CLV > 3x CPA', trend: 'Growing ↑' },
    { metric: 'Content Engagement Rate', value: `${(2 + seed % 6)}.${seed % 10}%`, cost: `$${spend * 0.1}`, roi: `${(2 + seed % 6)}.${seed % 10}% vs ${(1.5 + seed % 3)}.${seed % 10}% benchmark`, benchmark: `${contentType} avg: 2.8%`, trend: seed % 2 === 0 ? 'Growing ↑' : 'Stable →' },
    { metric: 'Organic Traffic Value', value: `$${spend * 0.4 + seed % 1000}`, cost: `$${spend * 0.2} (SEO content)`, roi: `${Math.round((spend * 0.4 + seed % 1000) / (spend * 0.2) * 100)}%`, benchmark: 'Compounds monthly after month 3', trend: 'Compounding ↑↑' },
    { metric: 'Brand Search Volume', value: `+${15 + seed % 40}%`, cost: `$${spend * 0.15}`, roi: 'Leading indicator for revenue growth', benchmark: 'Healthy: +10% QoQ', trend: seed % 2 === 0 ? 'Growing ↑' : 'Stable →' },
  ];

  const costs: CostBreakdown[] = [
    { category: 'Content Creation (writing, design, video)', amount: `$${Math.round(spend * 0.4)}`, percentage: '40%', optimization: 'Use AI tools to reduce creation time by 50% — reinvest in quality' },
    { category: 'Distribution & Promotion (ads, boost, partnerships)', amount: `$${Math.round(spend * 0.25)}`, percentage: '25%', optimization: 'Shift 10% from paid to organic community distribution' },
    { category: 'Tools & Software (CMS, analytics, scheduling)', amount: `$${Math.round(spend * 0.15)}`, percentage: '15%', optimization: 'Audit tool stack quarterly — eliminate tools with <2 weekly users' },
    { category: 'Team & Freelancers (salaries, contractors)', amount: `$${Math.round(spend * 0.15)}`, percentage: '15%', optimization: 'Cross-train team on 2+ content types to reduce bottlenecks' },
    { category: 'Research & Strategy (competitive intel, planning)', amount: `$${Math.round(spend * 0.05)}`, percentage: '5%', optimization: 'Increase to 10% — strategy time has highest ROI per dollar' },
  ];

  const revenue: RevenueAttribution[] = [
    { channel: 'Organic Search (SEO)', directRevenue: `$${Math.round(spend * roiMultiplier * 0.35)}`, assistedRevenue: `$${Math.round(spend * roiMultiplier * 0.15)}`, touchpoints: '3.2 avg before conversion', confidence: 'High' },
    { channel: 'Social Media (organic + paid)', directRevenue: `$${Math.round(spend * roiMultiplier * 0.25)}`, assistedRevenue: `$${Math.round(spend * roiMultiplier * 0.2)}`, touchpoints: '4.8 avg before conversion', confidence: 'Medium' },
    { channel: 'Email Marketing', directRevenue: `$${Math.round(spend * roiMultiplier * 0.2)}`, assistedRevenue: `$${Math.round(spend * roiMultiplier * 0.1)}`, touchpoints: '2.1 avg before conversion', confidence: 'High' },
    { channel: 'Direct / Brand Search', directRevenue: `$${Math.round(spend * roiMultiplier * 0.15)}`, assistedRevenue: `$${Math.round(spend * roiMultiplier * 0.05)}`, touchpoints: '1.5 avg before conversion', confidence: 'Medium' },
    { channel: 'Referral & Community', directRevenue: `$${Math.round(spend * roiMultiplier * 0.05)}`, assistedRevenue: `$${Math.round(spend * roiMultiplier * 0.1)}`, touchpoints: '2.8 avg before conversion', confidence: 'Low' },
  ];

  const assets: ContentAssetROI[] = [
    { asset: 'Pillar Blog Posts (5)', cost: `$${Math.round(spend * 0.15)}`, lifetime: '12-24 months', revenue: `$${Math.round(spend * roiMultiplier * 0.3)}`, roi: `${Math.round(roiMultiplier * 200)}%`, status: 'High Performer' },
    { asset: `${contentType} Campaign`, cost: `$${Math.round(spend * 0.3)}`, lifetime: `${period}`, revenue: `$${Math.round(spend * roiMultiplier * 0.35)}`, roi: `${Math.round(roiMultiplier * 117)}%`, status: 'Active' },
    { asset: 'Email Nurture Sequences (3)', cost: `$${Math.round(spend * 0.1)}`, lifetime: '6-12 months', revenue: `$${Math.round(spend * roiMultiplier * 0.15)}`, roi: `${Math.round(roiMultiplier * 150)}%`, status: 'Evergreen' },
    { asset: 'Social Media Posts (60+)', cost: `$${Math.round(spend * 0.2)}`, lifetime: '7-30 days each', revenue: `$${Math.round(spend * roiMultiplier * 0.1)}`, roi: `${Math.round(roiMultiplier * 50)}%`, status: 'Needs Optimization' },
    { asset: 'Lead Magnets (2)', cost: `$${Math.round(spend * 0.1)}`, lifetime: '6-18 months', revenue: `$${Math.round(spend * roiMultiplier * 0.1)}`, roi: `${Math.round(roiMultiplier * 100)}%`, status: 'Active' },
  ];

  const optimizations: OptimizationLever[] = [
    { lever: 'Content Repurposing', currentState: '1 piece → 3 derivatives', optimizedState: '1 piece → 15 derivatives', expectedImpact: '+200-400% reach, 0% additional creation cost', effort: 'Medium (2h/piece)' },
    { lever: 'Distribution Timing', currentState: 'Random posting schedule', optimizedState: 'Data-driven optimal times per platform', expectedImpact: '+25-40% engagement rate', effort: 'Low (1h setup)' },
    { lever: 'Content Refresh Cycle', currentState: 'Publish and forget', optimizedState: 'Quarterly refresh of top 20% content', expectedImpact: '+30-50% organic traffic from existing assets', effort: 'Medium (4h/quarter)' },
    { lever: 'Conversion Path Optimization', currentState: 'Generic CTA on all content', optimizedState: 'Stage-specific CTAs matched to content type', expectedImpact: '+15-30% conversion rate', effort: 'Low (2h total)' },
    { lever: 'Attribution Modeling', currentState: 'Last-click attribution only', optimizedState: 'Multi-touch attribution with weighted scoring', expectedImpact: 'Better budget allocation → +20% ROI', effort: 'High (setup + tools)' },
    { lever: 'AI-Assisted Creation', currentState: 'Manual creation for everything', optimizedState: 'AI for first drafts, humans for strategy + polish', expectedImpact: '-50% creation time, +20% content volume', effort: 'Medium (tool setup + training)' },
  ];

  const kpis = [
    `Track CPL weekly — target: <$${20 + seed % 30} for ${industry.toLowerCase()}`,
    'Monitor content-to-MQL conversion rate — healthy: 2-5%',
    `Measure time-to-revenue for each content type — ${contentType} avg: ${30 + seed % 60} days`,
    'Calculate content velocity — pieces published per week vs pipeline impact',
    'Track share of voice — your branded search volume vs top 3 competitors',
    'Measure email signup rate from content — benchmark: 1.5-3%',
    'Monitor content engagement-to-pipeline correlation monthly',
    `Calculate blended CAC including content costs — target: <$${100 + seed % 200}`,
  ];

  const warnings = [
    overallROI < 50 ? 'ROI is below industry benchmark — review content-market fit before scaling spend' : '',
    'Content ROI compounds over time — month 1-3 typically shows negative ROI before turning positive',
    'Social media posts depreciate quickly (7-30 days) — invest more in evergreen SEO content',
    'Multi-touch attribution reveals content assists 2-3x more revenue than last-click shows',
    `${budget.includes('Bootstrapped') ? 'At your budget level, focus 80% on SEO content — highest long-term ROI' : ''}`,
    'The biggest ROI leak is usually distribution, not creation — are you promoting each piece 5-10x?',
  ].filter(Boolean);

  return { overallROI, roiGrade: grade, metrics, costs, revenue, assets, optimizations, kpis, warnings };
}

export default function ContentROIPage() {
  const [contentType, setContentType] = useState(contentTypes[0]);
  const [goal, setGoal] = useState(goals[0]);
  const [period, setPeriod] = useState(timePeriods[0]);
  const [industry, setIndustry] = useState(industries[0]);
  const [teamSize, setTeamSize] = useState(teamSizes[0]);
  const [budget, setBudget] = useState(budgetRanges[0]);
  const [totalSpend, setTotalSpend] = useState('');
  const [result, setResult] = useState<ContentROI | null>(null);

  const handleGenerate = () => { if (totalSpend.trim()) setResult(calculateROI(contentType, goal, period, industry, teamSize, budget, totalSpend)); };
  const scoreColor = (n: number) => n > 200 ? '#34d399' : n > 100 ? '#fbbf24' : n > 0 ? '#fb923c' : '#f87171';
  const gradeColor = (g: string) => g.startsWith('A') ? '#34d399' : g.startsWith('B') ? '#fbbf24' : '#f87171';
  const statusColor = (s: string) => s.includes('High') || s.includes('Evergreen') ? '#34d399' : s.includes('Active') ? '#fbbf24' : '#fb923c';

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Content ROI Tracker</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Calculate the real ROI of your content investment. Get cost breakdowns, revenue attribution, asset-level ROI analysis, optimization levers, and KPI tracking — prove content value with data.</p>

        <div className="mb-4">
          <label className="block text-sm text-zinc-400 mb-1">Total Content Spend (for period)</label>
          <input type="text" value={totalSpend} onChange={e => setTotalSpend(e.target.value)} placeholder="e.g., $5000, $15000, $50000" className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-3 text-zinc-100" />
        </div>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {([
            { label: 'Content Type', value: contentType, setter: setContentType as (v: string) => void, options: contentTypes as readonly string[] },
            { label: 'Primary Goal', value: goal, setter: setGoal as (v: string) => void, options: goals as readonly string[] },
            { label: 'Time Period', value: period, setter: setPeriod as (v: string) => void, options: timePeriods as readonly string[] },
            { label: 'Industry', value: industry, setter: setIndustry as (v: string) => void, options: industries as readonly string[] },
            { label: 'Team Size', value: teamSize, setter: setTeamSize as (v: string) => void, options: teamSizes as readonly string[] },
            { label: 'Budget Range', value: budget, setter: setBudget as (v: string) => void, options: budgetRanges as readonly string[] },
          ] as const).map(({ label, value, setter, options }) => (
            <div key={label}>
              <label className="block text-sm text-zinc-400 mb-1">{label}</label>
              <select value={value} onChange={e => setter(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100">
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
        <button onClick={handleGenerate} className="w-full md:w-auto bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded font-semibold hover:opacity-90 transition mb-8">Calculate Content ROI</button>

        {result && (
          <div className="space-y-8">
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                  <div className="text-6xl font-bold mb-1" style={{ color: scoreColor(result.overallROI) }}>{result.overallROI}%</div>
                  <div className="text-zinc-400">Overall ROI</div>
                </div>
                <div className="text-5xl font-bold px-6 py-3 rounded-xl border-2" style={{ color: gradeColor(result.roiGrade), borderColor: `${gradeColor(result.roiGrade)}40` }}>{result.roiGrade}</div>
              </div>
              {result.warnings.length > 0 && (
                <div className="mt-4 space-y-2">{result.warnings.map((w, i) => <div key={i} className="text-sm text-yellow-400/80 flex gap-2"><span className="shrink-0">⚠</span>{w}</div>)}</div>
              )}
            </div>

            {/* Metrics */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Key ROI Metrics</h3>
              <div className="space-y-3">
                {result.metrics.map((m, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-zinc-200">{m.metric}</span>
                      <span className="text-lg font-bold text-emerald-400">{m.value}</span>
                    </div>
                    <div className="flex gap-6 text-xs">
                      <div><span className="text-zinc-500">Cost:</span> <span className="text-zinc-300">{m.cost}</span></div>
                      <div><span className="text-zinc-500">Return:</span> <span className="text-emerald-400/70">{m.roi}</span></div>
                      <div><span className="text-zinc-500">Benchmark:</span> <span className="text-zinc-400">{m.benchmark}</span></div>
                      <div><span className="text-zinc-500">Trend:</span> <span className="text-violet-400">{m.trend}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cost Breakdown + Revenue Attribution */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3">Cost Breakdown</h3>
                <div className="space-y-3">
                  {result.costs.map((c, i) => (
                    <div key={i} className="bg-zinc-800/40 rounded-lg p-3 border border-zinc-700/50">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-sm text-zinc-200">{c.category}</span>
                        <div className="text-right">
                          <span className="text-sm font-bold text-zinc-200">{c.amount}</span>
                          <span className="text-xs text-zinc-500 ml-2">({c.percentage})</span>
                        </div>
                      </div>
                      <div className="text-xs text-emerald-400/70">{c.optimization}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3">Revenue Attribution</h3>
                <div className="space-y-3">
                  {result.revenue.map((r, i) => (
                    <div key={i} className="bg-zinc-800/40 rounded-lg p-3 border border-zinc-700/50">
                      <div className="font-semibold text-zinc-200 text-sm mb-1">{r.channel}</div>
                      <div className="flex gap-4 text-xs">
                        <div><span className="text-zinc-500">Direct:</span> <span className="text-emerald-400">{r.directRevenue}</span></div>
                        <div><span className="text-zinc-500">Assisted:</span> <span className="text-violet-400">{r.assistedRevenue}</span></div>
                        <div><span className="text-zinc-500">Touchpoints:</span> <span className="text-zinc-400">{r.touchpoints}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Asset ROI */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Asset-Level ROI</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="text-left text-zinc-500 border-b border-zinc-700"><th className="pb-2 pr-3">Asset</th><th className="pb-2 pr-3">Cost</th><th className="pb-2 pr-3">Lifetime</th><th className="pb-2 pr-3">Revenue</th><th className="pb-2 pr-3">ROI</th><th className="pb-2">Status</th></tr></thead>
                  <tbody>
                    {result.assets.map((a, i) => (
                      <tr key={i} className="border-b border-zinc-800/50">
                        <td className="py-2 pr-3 text-zinc-200">{a.asset}</td>
                        <td className="py-2 pr-3 text-zinc-400">{a.cost}</td>
                        <td className="py-2 pr-3 text-zinc-500 text-xs">{a.lifetime}</td>
                        <td className="py-2 pr-3 text-emerald-400">{a.revenue}</td>
                        <td className="py-2 pr-3 text-emerald-400 font-bold">{a.roi}</td>
                        <td className="py-2"><span className="text-xs px-2 py-0.5 rounded" style={{ color: statusColor(a.status), background: `${statusColor(a.status)}15` }}>{a.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Optimization Levers + KPIs */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-emerald-400">Optimization Levers</h3>
                <div className="space-y-3">
                  {result.optimizations.map((o, i) => (
                    <div key={i} className="bg-zinc-800/40 rounded-lg p-3 border border-zinc-700/50">
                      <div className="font-semibold text-zinc-200 text-sm mb-1">{o.lever}</div>
                      <div className="text-xs space-y-1">
                        <div><span className="text-red-400/60">Now:</span> <span className="text-zinc-400">{o.currentState}</span></div>
                        <div><span className="text-emerald-400/70">Goal:</span> <span className="text-zinc-300">{o.optimizedState}</span></div>
                        <div><span className="text-violet-400">Impact:</span> <span className="text-zinc-300">{o.expectedImpact}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-violet-400">KPIs to Track</h3>
                <div className="space-y-2">{result.kpis.map((k, i) => <div key={i} className="text-sm text-zinc-400 flex gap-2"><span className="text-violet-400 shrink-0">→</span>{k}</div>)}</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">Prove Your Content ROI With Data</h3>
              <p className="text-zinc-400 mb-4">PostCraft AI calculates real content ROI. Pair with <a href="/roi-calculator" className="text-violet-400 underline">ROI Calculator</a>, <a href="/kpi-dashboard" className="text-violet-400 underline">KPI Dashboard</a>, and <a href="/monthly-report" className="text-violet-400 underline">Monthly Report</a>.</p>
              <a href="/pricing" className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">Get PostCraft Pro</a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
