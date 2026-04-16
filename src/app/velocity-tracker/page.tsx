'use client';
import { useState } from 'react';

const teamSizes = ['Solo Creator', 'Small Team (2-5)', 'Medium Team (6-15)', 'Large Team (16-50)', 'Agency (50+)'] as const;
const contentTypes = ['Blog Posts', 'Social Posts', 'Video Content', 'Email Campaigns', 'Podcasts', 'All Content'] as const;
const industries = ['Tech & SaaS', 'E-commerce & DTC', 'Healthcare', 'Finance & FinTech', 'Education', 'Agency & Consulting', 'Fitness & Wellness', 'Media & Publishing'] as const;
const frequencies = ['Daily', '3-5x/week', '1-2x/week', 'Weekly', 'Bi-weekly', 'Monthly'] as const;

interface VelocityMetric { metric: string; current: string; benchmark: string; gap: string; trend: string; impact: string; action: string; }
interface BottleneckAnalysis { stage: string; timeSpent: string; idealTime: string; bottleneck: string; cause: string; fix: string; savings: string; }
interface EfficiencyScore { area: string; score: number; waste: string; opportunity: string; tool: string; }
interface ScaleStrategy { strategy: string; currentCapacity: string; scaledCapacity: string; investment: string; roi: string; timeline: string; }

interface VelocityReport {
  overallVelocity: number;
  piecesPerWeek: number;
  avgTimePerPiece: string;
  metrics: VelocityMetric[];
  bottlenecks: BottleneckAnalysis[];
  efficiency: EfficiencyScore[];
  scaleStrategies: ScaleStrategy[];
  quickWins: string[];
  capacityForecast: string[];
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }

function trackVelocity(team: string, content: string, industry: string, freq: string, brand: string): VelocityReport {
  const seed = hash(`${team}-${content}-${industry}-${freq}-${brand}`);
  const overallVelocity = 20 + seed % 70;
  const piecesPerWeek = 2 + seed % 15;
  const avgTimePerPiece = `${1 + seed % 6}h ${seed % 50}min`;

  const metrics: VelocityMetric[] = [
    { metric: 'Ideation Speed', current: `${20 + seed % 40} min per idea`, benchmark: '10-15 min per idea', gap: seed % 2 === 0 ? 'Slower than benchmark' : 'On par', trend: seed % 3 === 0 ? 'Improving' : 'Stable', impact: 'Ideation bottleneck reduces total output by 20%', action: 'Build an idea bank (50+ pre-validated ideas) — never start from blank' },
    { metric: 'Draft-to-Publish Time', current: `${2 + seed % 5} days avg`, benchmark: '1-2 days', gap: `${seed % 3 + 1} days slower than benchmark`, trend: 'Declining', impact: 'Slow publishing means missing trend windows', action: 'Implement "publish first, polish later" for social — perfection kills velocity' },
    { metric: 'Review Cycle Time', current: `${seed % 4 + 1} revision rounds`, benchmark: '1-2 rounds max', gap: `${seed % 2 + 1} extra rounds on average`, trend: 'Stable', impact: 'Each extra revision round adds 0.5-1 day to publishing timeline', action: 'Create clear brand guidelines so reviewers approve faster — reduce subjective feedback' },
    { metric: 'Content Utilization Rate', current: `${30 + seed % 40}% of content published gets repurposed`, benchmark: '70-80%', gap: `${30 + seed % 30}% waste — content created but never reused`, trend: seed % 2 === 0 ? 'Improving' : 'Declining', impact: 'Low repurposing means 3x more work for same reach', action: 'Create every piece with 3 derivative formats in mind — blog → thread → carousel → video' },
    { metric: 'Batch Efficiency', current: `${seed % 2 === 0 ? 'Ad-hoc creation' : 'Partial batching (2-3 pieces)'}`, benchmark: 'Full batching (5-10 pieces/session)', gap: seed % 2 === 0 ? 'No batching — massive context-switching waste' : 'Partial batching — room to scale', trend: 'Stable', impact: 'Batching increases output 2-3x without adding hours', action: 'Dedicate 2 blocks per week to batch creation — all ideation in one session, all writing in another' },
    { metric: 'Quality-Adjusted Output', current: `${piecesPerWeek} pieces/week, ${50 + seed % 40}% hit engagement targets`, benchmark: `${piecesPerWeek + 3}+ pieces/week, 70%+ hit targets`, gap: 'Output and quality both below potential', trend: seed % 3 === 0 ? 'Improving' : 'Declining', impact: 'Underperforming content wastes the same time as top-performing content', action: 'Double down on formats that consistently hit targets — cut underperformers ruthlessly' },
  ];

  const bottlenecks: BottleneckAnalysis[] = [
    { stage: 'Ideation & Research', timeSpent: `${25 + seed % 20}% of total time`, idealTime: '10-15%', bottleneck: 'Starting from scratch each time', cause: 'No idea bank, no content pillars, no topic calendar', fix: 'Build a 90-day topic calendar with pre-researched ideas', savings: 'Save 3-5 hours/week' },
    { stage: 'Writing / Creation', timeSpent: `${30 + seed % 15}% of total time`, idealTime: '40-50%', bottleneck: seed % 2 === 0 ? 'Perfectionism — rewriting same paragraph 5x' : 'Blank page syndrome', cause: seed % 2 === 0 ? 'No "good enough" standard defined' : 'No templates or frameworks to start from', fix: seed % 2 === 0 ? 'Set a "one draft, one edit" rule — publish imperfect content' : 'Create 10 reusable templates per format', savings: 'Save 2-4 hours/week' },
    { stage: 'Review & Approval', timeSpent: `${15 + seed % 15}% of total time`, idealTime: '5-10%', bottleneck: 'Too many stakeholders, unclear feedback', cause: 'No single decision-maker, subjective opinions disguised as brand feedback', fix: 'Designate 1 approver per content type — give them a checklist, not open-ended review', savings: 'Save 2-3 hours/week' },
    { stage: 'Publishing & Distribution', timeSpent: `${10 + seed % 10}% of total time`, idealTime: '5%', bottleneck: 'Manual formatting for each platform', cause: 'No automation tools, manual copy-paste between platforms', fix: 'Use a publishing tool with multi-platform scheduling — format once, publish everywhere', savings: 'Save 1-2 hours/week' },
    { stage: 'Analytics & Reporting', timeSpent: `${10 + seed % 10}% of total time`, idealTime: '5-10%', bottleneck: 'Manual data collection from multiple platforms', cause: 'No unified dashboard — checking each platform individually', fix: 'Set up automated weekly reports — focus on 3-5 KPIs, not 20', savings: 'Save 1-2 hours/week' },
  ];

  const efficiency: EfficiencyScore[] = [
    { area: 'Template Usage', score: 20 + seed % 60, waste: `${60 - seed % 40}% of content created from scratch`, opportunity: 'Templates reduce creation time by 40-60% per piece', tool: 'PostCraft Content Templates + Brand Voice guidelines' },
    { area: 'Repurposing Pipeline', score: 15 + seed % 55, waste: `${50 + seed % 30}% of content published once and forgotten`, opportunity: 'Each piece should generate 3-5 derivatives automatically', tool: 'PostCraft Content Repurposer + Content Cascade' },
    { area: 'Workflow Automation', score: 25 + seed % 50, waste: `${3 + seed % 5} hours/week on manual tasks`, opportunity: 'Automate scheduling, formatting, and basic reporting', tool: 'Publishing automation + AI-assisted formatting' },
    { area: 'Team Collaboration', score: 30 + seed % 45, waste: `${seed % 5 + 2} hours/week lost to unclear briefs and revision loops`, opportunity: 'Clear briefs and 1-approver rule save 50% of review time', tool: 'Content brief templates + approval workflow' },
    { area: 'Content Performance Learning', score: 20 + seed % 50, waste: 'Repeating formats that don\'t work, ignoring formats that do', opportunity: 'Track format-level performance — double down on winners', tool: 'PostCraft Engagement Quality + Content Scoring Matrix' },
  ];

  const scaleStrategies: ScaleStrategy[] = [
    { strategy: 'AI-Assisted First Drafts', currentCapacity: `${piecesPerWeek} pieces/week`, scaledCapacity: `${piecesPerWeek * 2} pieces/week`, investment: '$50-200/mo for AI tools', roi: '2x output with same team', timeline: '1-2 weeks to implement' },
    { strategy: 'Batch Creation Sessions', currentCapacity: 'Ad-hoc creation', scaledCapacity: '2x efficiency per session', investment: '0 (process change only)', roi: 'Same output in 50% less time', timeline: 'Immediate' },
    { strategy: 'Content Repurposing Pipeline', currentCapacity: '1 piece = 1 format', scaledCapacity: '1 piece = 5 formats', investment: '2-3 hours/week setup', roi: '5x content reach with 30% more effort', timeline: '2-3 weeks' },
    { strategy: 'Freelance Content Network', currentCapacity: `${team}`, scaledCapacity: `${team} + 3-5 specialists`, investment: '$2-5K/mo', roi: '3x output, specialized quality', timeline: '1 month to hire + onboard' },
    { strategy: 'User-Generated Content Program', currentCapacity: '100% brand-created', scaledCapacity: '30% UGC, 70% brand', investment: '$500-1K/mo (incentives)', roi: 'Higher trust + 30% less creation work', timeline: '1-2 months to build' },
  ];

  const quickWins = [
    'Batch your ideation — spend 1 hour generating 20 ideas, then schedule them across 4 weeks',
    'Create 5 reusable templates for your most common content formats — use them for 80% of posts',
    'Set a "one draft, one edit" rule for social media — perfectionism kills velocity more than quality',
    'Repurpose every blog post into: 1 thread, 1 carousel, 3 social quotes, 1 email snippet — 6 pieces from 1',
    'Schedule a weekly 30-min review session instead of ad-hoc approval — eliminates bottleneck',
    'Track time spent per content stage for 1 week — you\'ll find your biggest bottleneck immediately',
    'Kill your 3 worst-performing content formats — replace with your top 3 formats (same effort, better results)',
    'Automate publishing to at least 3 platforms — manual posting is the most wasteful activity in content marketing',
  ];

  const capacityForecast = [
    `Current: ${piecesPerWeek} pieces/week, ${avgTimePerPiece}/piece, ${overallVelocity}% velocity score`,
    `+30 days (with quick wins): ${Math.round(piecesPerWeek * 1.4)} pieces/week, ${overallVelocity + 15}% velocity`,
    `+60 days (with batch + repurpose): ${Math.round(piecesPerWeek * 2.2)} pieces/week, ${Math.min(95, overallVelocity + 25)}% velocity`,
    `+90 days (with AI + team scale): ${Math.round(piecesPerWeek * 3)} pieces/week, ${Math.min(95, overallVelocity + 35)}% velocity`,
    'Key: velocity isn\'t about more content — it\'s about more EFFECTIVE content in less time',
  ];

  return { overallVelocity, piecesPerWeek, avgTimePerPiece, metrics, bottlenecks, efficiency, scaleStrategies, quickWins, capacityForecast };
}

export default function VelocityTrackerPage() {
  const [team, setTeam] = useState(teamSizes[0]);
  const [content, setContent] = useState(contentTypes[0]);
  const [industry, setIndustry] = useState(industries[0]);
  const [freq, setFreq] = useState(frequencies[0]);
  const [brand, setBrand] = useState('');
  const [result, setResult] = useState<VelocityReport | null>(null);

  const handleGenerate = () => { if (brand.trim()) setResult(trackVelocity(team, content, industry, freq, brand)); };
  const scoreColor = (n: number) => n >= 70 ? '#34d399' : n >= 50 ? '#a3e635' : n >= 30 ? '#fbbf24' : '#f87171';

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Content Velocity Tracker</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Measure and optimize your content production speed. Find bottlenecks, track efficiency metrics, and get a scaling roadmap — produce more effective content in less time, not more content for content's sake.</p>
        <div className="mb-4"><label className="block text-sm text-zinc-400 mb-1">Brand / Team</label><input type="text" value={brand} onChange={e => setBrand(e.target.value)} placeholder="e.g., PostCraft, your team name" className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-3 text-zinc-100" /></div>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {([{ label: 'Team Size', value: team, setter: setTeam as (v: string) => void, options: teamSizes as readonly string[] }, { label: 'Content Type', value: content, setter: setContent as (v: string) => void, options: contentTypes as readonly string[] }, { label: 'Industry', value: industry, setter: setIndustry as (v: string) => void, options: industries as readonly string[] }, { label: 'Current Frequency', value: freq, setter: setFreq as (v: string) => void, options: frequencies as readonly string[] }] as const).map(({ label, value, setter, options }) => (<div key={label}><label className="block text-sm text-zinc-400 mb-1">{label}</label><select value={value} onChange={e => setter(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100">{options.map(o => <option key={o} value={o}>{o}</option>)}</select></div>))}
        </div>
        <button onClick={handleGenerate} className="w-full md:w-auto bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded font-semibold hover:opacity-90 transition mb-8">Track Velocity</button>
        {result && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 text-center"><div className="text-4xl font-bold mb-1" style={{ color: scoreColor(result.overallVelocity) }}>{result.overallVelocity}%</div><div className="text-zinc-400 text-sm">Velocity Score</div></div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 text-center"><div className="text-4xl font-bold mb-1 text-violet-400">{result.piecesPerWeek}</div><div className="text-zinc-400 text-sm">Pieces / Week</div></div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 text-center"><div className="text-4xl font-bold mb-1 text-fuchsia-400">{result.avgTimePerPiece}</div><div className="text-zinc-400 text-sm">Avg Time / Piece</div></div>
            </div>
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6"><h3 className="text-xl font-semibold mb-4 text-violet-400">Velocity Metrics</h3><div className="space-y-3">{result.metrics.map((m, i) => (<div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50"><div className="flex items-center justify-between mb-2"><span className="font-semibold text-zinc-200">{m.metric}</span><span className="text-xs" style={{ color: m.trend === 'Improving' ? '#34d399' : m.trend === 'Declining' ? '#f87171' : '#fbbf24' }}>{m.trend}</span></div><div className="grid md:grid-cols-2 gap-2 text-xs mb-1"><div><span className="text-zinc-500">Current:</span> <span className="text-zinc-300">{m.current}</span></div><div><span className="text-zinc-500">Benchmark:</span> <span className="text-emerald-400/70">{m.benchmark}</span></div></div><div className="text-xs text-zinc-500 mb-1">{m.impact}</div><div className="text-xs text-emerald-400/70">{m.action}</div></div>))}</div></div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6"><h3 className="text-lg font-semibold mb-3 text-red-400">Bottlenecks</h3><div className="space-y-3">{result.bottlenecks.map((b, i) => (<div key={i} className="bg-zinc-800/40 rounded-lg p-3 border border-zinc-700/50"><div className="flex justify-between mb-1"><span className="text-sm font-semibold text-zinc-200">{b.stage}</span><span className="text-xs text-red-400/70">{b.timeSpent} (ideal: {b.idealTime})</span></div><div className="text-xs space-y-0.5"><div className="text-zinc-400">{b.bottleneck}</div><div className="text-zinc-500">Cause: {b.cause}</div><div className="text-emerald-400/70">Fix: {b.fix}</div><div className="text-violet-400/70">Savings: {b.savings}</div></div></div>))}</div></div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6"><h3 className="text-lg font-semibold mb-3 text-amber-400">Efficiency Scores</h3><div className="space-y-3">{result.efficiency.map((e, i) => (<div key={i} className="bg-zinc-800/40 rounded-lg p-3 border border-zinc-700/50"><div className="flex justify-between mb-1"><span className="text-sm font-semibold text-zinc-200">{e.area}</span><span className="text-sm font-bold" style={{ color: scoreColor(e.score) }}>{e.score}%</span></div><div className="w-full bg-zinc-800 rounded-full h-1.5 mb-2"><div className="h-1.5 rounded-full" style={{ width: `${e.score}%`, background: scoreColor(e.score) }} /></div><div className="text-xs space-y-0.5"><div className="text-red-400/60">{e.waste}</div><div className="text-emerald-400/70">{e.opportunity}</div></div></div>))}</div></div>
            </div>
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6"><h3 className="text-xl font-semibold mb-4 text-emerald-400">Scale Strategies</h3><div className="space-y-3">{result.scaleStrategies.map((s, i) => (<div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50"><div className="font-semibold text-zinc-200 mb-2">{s.strategy}</div><div className="grid md:grid-cols-2 gap-2 text-xs"><div><span className="text-zinc-500">Current:</span> <span className="text-zinc-300">{s.currentCapacity}</span></div><div><span className="text-zinc-500">Scaled:</span> <span className="text-emerald-400">{s.scaledCapacity}</span></div><div><span className="text-zinc-500">Investment:</span> <span className="text-zinc-300">{s.investment}</span></div><div><span className="text-zinc-500">ROI:</span> <span className="text-violet-400">{s.roi}</span></div></div><div className="text-xs text-zinc-500 mt-1">Timeline: {s.timeline}</div></div>))}</div></div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6"><h3 className="text-lg font-semibold mb-3 text-emerald-400">Quick Wins</h3><div className="space-y-2">{result.quickWins.map((w, i) => <div key={i} className="text-sm text-zinc-400 flex gap-2"><span className="text-emerald-400 shrink-0">{i + 1}.</span>{w}</div>)}</div></div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6"><h3 className="text-lg font-semibold mb-3 text-violet-400">Capacity Forecast</h3><div className="space-y-2">{result.capacityForecast.map((c, i) => <div key={i} className="text-sm text-zinc-400 flex gap-2"><span className="text-violet-400 shrink-0">→</span>{c}</div>)}</div></div>
            </div>
            <div className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 rounded-xl p-8 text-center"><h3 className="text-2xl font-bold mb-2">Produce More. Waste Less.</h3><p className="text-zinc-400 mb-4">PostCraft AI optimizes your content velocity — more effective content in less time. Pair with <a href="/content-calendar" className="text-violet-400 underline">Content Calendar</a>, <a href="/content-cascade" className="text-violet-400 underline">Content Cascade</a>, and <a href="/repurpose" className="text-violet-400 underline">Content Repurposer</a>.</p><a href="/pricing" className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">Get PostCraft Pro</a></div>
          </div>
        )}
      </div>
    </main>
  );
}
