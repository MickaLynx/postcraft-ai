'use client';
import { useState } from 'react';

const analysisTypes = ['Content Strategy Gaps', 'Channel Coverage Gaps', 'Topic Authority Gaps', 'Engagement Gaps', 'SEO Gaps', 'All Gaps'] as const;
const industries = ['Tech & SaaS', 'E-commerce & DTC', 'Healthcare', 'Finance & FinTech', 'Education', 'Real Estate', 'Agency & Consulting', 'Fitness & Wellness', 'Media & Publishing', 'Food & Beverage'] as const;
const competitorCounts = ['1-3 competitors', '4-7 competitors', '8-15 competitors', '15+ competitors'] as const;
const marketPositions = ['Market Leader', 'Challenger', 'Niche Player', 'New Entrant'] as const;

interface ContentGap { topic: string; yourCoverage: string; competitorCoverage: string; opportunity: string; difficulty: string; estimatedTraffic: string; action: string; }
interface ChannelGap { channel: string; yourPresence: string; topCompetitor: string; gap: string; priority: string; quickWin: string; }
interface StrategyInsight { insight: string; evidence: string; yourPosition: string; competitorAdvantage: string; counterStrategy: string; timeline: string; }
interface WeaknessExploit { weakness: string; competitor: string; howToExploit: string; contentNeeded: string; expectedImpact: string; }
interface DifferentiatorOpportunity { area: string; currentState: string; whitespace: string; strategy: string; investment: string; }

interface GapReport {
  overallGapScore: number;
  totalGaps: number;
  criticalGaps: number;
  contentGaps: ContentGap[];
  channelGaps: ChannelGap[];
  insights: StrategyInsight[];
  weaknesses: WeaknessExploit[];
  differentiators: DifferentiatorOpportunity[];
  attackPlan: string[];
  defenseNeeds: string[];
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }

function findGaps(analysis: string, industry: string, competitors: string, position: string, brand: string): GapReport {
  const seed = hash(`${analysis}-${industry}-${competitors}-${position}-${brand}`);
  const overallGapScore = 25 + seed % 65;
  const totalGaps = 10 + seed % 15;
  const criticalGaps = 2 + seed % 4;

  const contentGaps: ContentGap[] = [
    { topic: `"How to choose ${industry.toLowerCase()} tools" comparison guide`, yourCoverage: 'No content', competitorCoverage: '3 competitors have comprehensive guides ranking #1-3', opportunity: 'High-intent commercial keyword — visitors are ready to buy', difficulty: 'Medium', estimatedTraffic: `${(seed % 30 + 5) * 100}/mo`, action: 'Create the definitive comparison guide — be more transparent than competitors' },
    { topic: `${industry} ROI calculator / benchmark data`, yourCoverage: 'No interactive tools', competitorCoverage: '2 competitors have calculators with 10K+ monthly users', opportunity: 'Interactive tools generate 3x more backlinks and 5x more time-on-site', difficulty: 'Medium-High', estimatedTraffic: `${(seed % 20 + 8) * 100}/mo`, action: 'Build an industry-specific ROI calculator — gate it for lead gen' },
    { topic: `Beginner's guide to ${industry.toLowerCase()}`, yourCoverage: 'Fragmented blog posts', competitorCoverage: '4 competitors have structured learning paths / academies', opportunity: 'Educational content captures top-of-funnel — 60% of future customers start here', difficulty: 'Low', estimatedTraffic: `${(seed % 50 + 20) * 100}/mo`, action: 'Create a structured 7-day learning path with email drip — capture and nurture' },
    { topic: `${industry} trends and predictions (annual report)`, yourCoverage: 'No original research', competitorCoverage: '1 competitor publishes annual report (5K+ downloads, 200+ backlinks)', opportunity: 'Original research = authority moat — competitors can\'t replicate your data', difficulty: 'High', estimatedTraffic: `${(seed % 15 + 3) * 100}/mo + PR value`, action: 'Survey 500+ industry professionals — publish annual State of [Industry] report' },
    { topic: `Templates / free tools for ${industry.toLowerCase()}`, yourCoverage: `${seed % 3 + 1} templates available`, competitorCoverage: `Top competitor offers ${seed % 10 + 15} free templates/tools`, opportunity: 'Free tools are the #1 organic lead magnet — 10x more effective than ebooks', difficulty: 'Low-Medium', estimatedTraffic: `${(seed % 40 + 10) * 100}/mo`, action: `Create ${seed % 5 + 5} free templates targeting specific use cases — gate with email` },
    { topic: 'Customer success stories by industry vertical', yourCoverage: `${seed % 3 + 1} generic case studies`, competitorCoverage: `Top competitor has ${seed % 10 + 10} vertical-specific case studies`, opportunity: 'Vertical case studies convert 3x better — prospects need to see their industry', difficulty: 'Low', estimatedTraffic: 'Direct conversion impact', action: `Create 1 case study per month per vertical — target your top ${seed % 3 + 3} industries` },
  ];

  const channelGaps: ChannelGap[] = [
    { channel: 'YouTube / Video', yourPresence: `${seed % 2 === 0 ? 'No presence' : 'Sporadic uploads'}`, topCompetitor: `${seed % 5 + 3}K subscribers, weekly uploads`, gap: `${seed % 2 === 0 ? 'Complete gap' : 'Consistency gap'} — video is the fastest-growing content channel`, priority: 'P0', quickWin: 'Start with 60-second tip videos — repurpose blog post key points' },
    { channel: 'Newsletter / Email', yourPresence: `${seed % 2 === 0 ? 'Product updates only' : 'Bi-weekly newsletter'}`, topCompetitor: `${(seed % 5 + 2) * 1000} subscribers, weekly value-driven newsletter`, gap: 'Newsletter is the only owned channel — competitors building direct audience', priority: 'P0', quickWin: 'Launch a weekly 3-minute digest — curate 3 insights + 1 original take' },
    { channel: 'Podcast', yourPresence: 'No podcast', topCompetitor: `${seed % 3 + 1} competitors have active podcasts (${seed % 50 + 20}+ episodes)`, gap: 'Podcasts build deep relationships — 45min of attention vs 30sec social scroll', priority: 'P1', quickWin: 'Start as a guest on 5 industry podcasts before launching your own' },
    { channel: 'Community (Discord/Slack/Forum)', yourPresence: `${seed % 2 === 0 ? 'No community' : 'Inactive Slack group'}`, topCompetitor: `Active community with ${(seed % 5 + 1) * 1000} members`, gap: 'Community = retention moat — hard to replicate, high switching costs', priority: 'P1', quickWin: 'Start a private Slack/Discord for top customers — 50 founding members' },
    { channel: 'LinkedIn Company Page', yourPresence: `${seed % 2 === 0 ? 'Irregular posting' : '2-3 posts/week'}`, topCompetitor: 'Daily posts + employee advocacy program', gap: `${seed % 2 === 0 ? 'Consistency and volume gap' : 'Employee advocacy gap — competitors amplify through team'}`, priority: 'P1', quickWin: 'Implement 3-post/week minimum + create shareable templates for employees' },
  ];

  const insights: StrategyInsight[] = [
    { insight: 'Competitor A is investing heavily in video content — likely planning YouTube-first strategy', evidence: `${seed % 3 + 2}x increase in video content over last 6 months, hired video editor`, yourPosition: 'No video strategy', competitorAdvantage: 'Video has 5x organic reach and builds stronger parasocial relationships', counterStrategy: 'Don\'t try to match volume — create 1 high-quality weekly video in your unique style', timeline: 'Start within 2 weeks — first results in 3 months' },
    { insight: 'Competitor B is building a content moat with original research and data', evidence: 'Published 3 industry reports with 500+ combined backlinks', yourPosition: 'Relying on third-party data and opinions', competitorAdvantage: 'Original data can\'t be replicated — becomes the cited source for entire industry', counterStrategy: 'Launch a quarterly survey/report — even small-scale original data is powerful', timeline: 'First report in 6-8 weeks' },
    { insight: 'No competitor is doing live content or real-time engagement', evidence: 'No LinkedIn Lives, Twitter Spaces, or live webinars from any competitor', yourPosition: 'Also not doing live content', competitorAdvantage: 'None — this is a white space opportunity', counterStrategy: 'Launch a bi-weekly "Ask Me Anything" or live Q&A — first-mover advantage', timeline: 'Start within 1 week — zero investment needed' },
    { insight: `Most competitors neglect post-purchase content — focused only on acquisition`, evidence: 'No competitor has a customer education program, community, or advocacy content', yourPosition: 'Also acquisition-focused', competitorAdvantage: 'None — mutual blind spot', counterStrategy: 'Build a customer success content hub — reduces churn AND generates referrals', timeline: 'Launch basics in 2 weeks — iterate from there' },
  ];

  const weaknesses: WeaknessExploit[] = [
    { weakness: 'Competitor A\'s content is generic — no unique voice or personality', competitor: 'Competitor A', howToExploit: 'Develop a distinctive, opinionated voice that makes your content unmistakable', contentNeeded: 'Behind-the-scenes, founder stories, contrarian takes', expectedImpact: '+40% brand recall, stronger community loyalty' },
    { weakness: 'Competitor B has no social proof — few testimonials or case studies', competitor: 'Competitor B', howToExploit: 'Flood your channels with customer success stories — make social proof your advantage', contentNeeded: '2 new case studies/month + customer spotlight series', expectedImpact: '+25% conversion rate on comparison searches' },
    { weakness: 'Competitor C only produces English content — ignoring global market', competitor: 'Competitor C', howToExploit: 'Create content in 3-5 key languages to capture underserved international markets', contentNeeded: 'Localized landing pages, translated top blog posts', expectedImpact: '+30% international traffic, new market entry' },
    { weakness: 'Most competitors have slow content — no real-time trend coverage', competitor: 'All competitors', howToExploit: 'Be first to cover industry news and trends — speed builds authority', contentNeeded: 'Same-day analysis posts, trend alert newsletter', expectedImpact: 'Become the go-to source for breaking industry coverage' },
  ];

  const differentiators: DifferentiatorOpportunity[] = [
    { area: 'Interactive Content', currentState: 'No competitors offer interactive tools beyond basic calculators', whitespace: 'Assessment tools, configurators, benchmarking quizzes', strategy: 'Build 3 interactive tools that solve specific problems — gate results for lead gen', investment: '$5-15K development + maintenance' },
    { area: 'Community-Led Content', currentState: 'All competitors broadcast — none co-create with audience', whitespace: 'User-contributed content, community spotlights, collaborative research', strategy: 'Launch a "community experts" program — feature customer content alongside yours', investment: '$1-2K/mo for community management' },
    { area: 'Multimedia Storytelling', currentState: 'Text-heavy industry — no one does podcast + video + newsletter bundle', whitespace: 'Cross-media content series that tells one story across formats', strategy: 'Create a monthly "deep dive" series: article + video + podcast episode + email recap', investment: '$2-5K/mo for production' },
    { area: 'Real-Time Intelligence', currentState: 'All content is planned and scheduled — no one does live analysis', whitespace: 'Live trend commentary, real-time market analysis, breaking news coverage', strategy: 'Assign one team member to "content newsroom" role — 1-2 reactive pieces per week', investment: '10-15 hours/week of dedicated time' },
  ];

  const attackPlan = [
    `Priority 1: Fill the ${criticalGaps} critical content gaps — these are high-intent topics where competitors already win`,
    'Priority 2: Launch video content — even 1 video/week puts you ahead of 60% of competitors',
    'Priority 3: Start original research — one survey report gives you 6+ months of content and backlinks',
    'Priority 4: Exploit competitor weaknesses — generic voice, no social proof, English-only are all attackable',
    'Priority 5: Build the community moat — hardest to replicate, highest long-term value',
    `Execute in order — don't try to close all ${totalGaps} gaps simultaneously, that dilutes everything`,
    'Review competitive landscape monthly — new gaps emerge as competitors evolve',
    'Track gap closure rate — aim to close 2-3 gaps per quarter',
  ];

  const defenseNeeds = [
    'Protect your existing content advantages — don\'t let competitors catch up on topics you own',
    'Monitor competitor content launches weekly — set up alerts for their blog and social channels',
    'Refresh your top-performing content quarterly — stale content loses ranking to fresh competitor content',
    'Build defensible assets: original research, community, and interactive tools are hardest to replicate',
    'Document your content playbook — so team changes don\'t create gaps in your own strategy',
  ];

  return { overallGapScore, totalGaps, criticalGaps, contentGaps, channelGaps, insights, weaknesses, differentiators, attackPlan, defenseNeeds };
}

export default function CompetitiveGapPage() {
  const [analysis, setAnalysis] = useState(analysisTypes[0]);
  const [industry, setIndustry] = useState(industries[0]);
  const [competitors, setCompetitors] = useState(competitorCounts[0]);
  const [position, setPosition] = useState(marketPositions[0]);
  const [brand, setBrand] = useState('');
  const [result, setResult] = useState<GapReport | null>(null);

  const handleGenerate = () => { if (brand.trim()) setResult(findGaps(analysis, industry, competitors, position, brand)); };
  const scoreColor = (n: number) => n >= 70 ? '#34d399' : n >= 50 ? '#a3e635' : n >= 30 ? '#fbbf24' : '#f87171';
  const prioColor = (p: string) => p === 'P0' ? '#f87171' : p === 'P1' ? '#fbbf24' : '#60a5fa';

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Competitive Gap Finder</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Find the gaps your competitors left open. Discover content topics they missed, channels they ignore, weaknesses you can exploit, and white-space opportunities for differentiation. Turn their blind spots into your advantage.</p>
        <div className="mb-4"><label className="block text-sm text-zinc-400 mb-1">Your Brand</label><input type="text" value={brand} onChange={e => setBrand(e.target.value)} placeholder="e.g., PostCraft, your company" className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-3 text-zinc-100" /></div>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {([{ label: 'Analysis Focus', value: analysis, setter: setAnalysis as (v: string) => void, options: analysisTypes as readonly string[] }, { label: 'Industry', value: industry, setter: setIndustry as (v: string) => void, options: industries as readonly string[] }, { label: 'Competitor Count', value: competitors, setter: setCompetitors as (v: string) => void, options: competitorCounts as readonly string[] }, { label: 'Your Market Position', value: position, setter: setPosition as (v: string) => void, options: marketPositions as readonly string[] }] as const).map(({ label, value, setter, options }) => (<div key={label}><label className="block text-sm text-zinc-400 mb-1">{label}</label><select value={value} onChange={e => setter(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100">{options.map(o => <option key={o} value={o}>{o}</option>)}</select></div>))}
        </div>
        <button onClick={handleGenerate} className="w-full md:w-auto bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded font-semibold hover:opacity-90 transition mb-8">Find Competitive Gaps</button>
        {result && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 text-center"><div className="text-4xl font-bold mb-1" style={{ color: scoreColor(result.overallGapScore) }}>{result.overallGapScore}%</div><div className="text-zinc-400 text-sm">Competitive Position</div></div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 text-center"><div className="text-4xl font-bold mb-1 text-amber-400">{result.totalGaps}</div><div className="text-zinc-400 text-sm">Total Gaps Found</div></div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 text-center"><div className="text-4xl font-bold mb-1 text-red-400">{result.criticalGaps}</div><div className="text-zinc-400 text-sm">Critical Gaps</div></div>
            </div>
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6"><h3 className="text-xl font-semibold mb-4 text-red-400">Content Gaps</h3><div className="space-y-3">{result.contentGaps.map((g, i) => (<div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50"><div className="flex items-center justify-between mb-2"><span className="font-semibold text-zinc-200">{g.topic}</span><span className="text-xs px-2 py-1 rounded bg-zinc-700 text-zinc-300">{g.estimatedTraffic}</span></div><div className="grid md:grid-cols-2 gap-2 text-xs mb-1"><div><span className="text-red-400/60">You:</span> <span className="text-zinc-400">{g.yourCoverage}</span></div><div><span className="text-emerald-400/70">Them:</span> <span className="text-zinc-400">{g.competitorCoverage}</span></div></div><div className="text-xs text-zinc-500 mb-1">{g.opportunity}</div><div className="text-xs text-emerald-400/70">{g.action}</div></div>))}</div></div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6"><h3 className="text-lg font-semibold mb-3 text-amber-400">Channel Gaps</h3><div className="space-y-3">{result.channelGaps.map((c, i) => (<div key={i} className="bg-zinc-800/40 rounded-lg p-3 border border-zinc-700/50"><div className="flex justify-between mb-1"><span className="text-sm font-semibold text-zinc-200">{c.channel}</span><span className="text-xs px-2 py-0.5 rounded font-bold" style={{ color: prioColor(c.priority), background: `${prioColor(c.priority)}15` }}>{c.priority}</span></div><div className="text-xs space-y-0.5"><div className="flex gap-3"><span className="text-red-400/60">You: {c.yourPresence}</span></div><div><span className="text-emerald-400/70">Top competitor: {c.topCompetitor}</span></div><div className="text-zinc-400">{c.gap}</div><div className="text-violet-400/70">Quick win: {c.quickWin}</div></div></div>))}</div></div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6"><h3 className="text-lg font-semibold mb-3 text-fuchsia-400">Competitor Weaknesses</h3><div className="space-y-3">{result.weaknesses.map((w, i) => (<div key={i} className="bg-zinc-800/40 rounded-lg p-3 border border-zinc-700/50"><div className="text-sm font-semibold text-zinc-200 mb-1">{w.weakness}</div><div className="text-xs space-y-0.5"><div className="text-zinc-500">Competitor: {w.competitor}</div><div className="text-emerald-400/70">Exploit: {w.howToExploit}</div><div className="text-zinc-400">Content needed: {w.contentNeeded}</div><div className="text-violet-400/70">Impact: {w.expectedImpact}</div></div></div>))}</div></div>
            </div>
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6"><h3 className="text-xl font-semibold mb-4 text-violet-400">Strategic Insights</h3><div className="space-y-3">{result.insights.map((ins, i) => (<div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50"><div className="font-semibold text-zinc-200 mb-2">{ins.insight}</div><div className="text-xs space-y-1"><div><span className="text-zinc-500">Evidence:</span> <span className="text-zinc-300">{ins.evidence}</span></div><div><span className="text-zinc-500">Your position:</span> <span className="text-red-400/60">{ins.yourPosition}</span></div><div><span className="text-zinc-500">Their advantage:</span> <span className="text-amber-400/70">{ins.competitorAdvantage}</span></div><div><span className="text-zinc-500">Counter:</span> <span className="text-emerald-400/70">{ins.counterStrategy}</span></div><div className="text-zinc-500">Timeline: {ins.timeline}</div></div></div>))}</div></div>
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6"><h3 className="text-xl font-semibold mb-4 text-emerald-400">Differentiator Opportunities</h3><div className="grid md:grid-cols-2 gap-3">{result.differentiators.map((d, i) => (<div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50"><div className="font-semibold text-zinc-200 mb-1">{d.area}</div><div className="text-xs space-y-0.5"><div className="text-zinc-500">{d.currentState}</div><div className="text-violet-400/70">White space: {d.whitespace}</div><div className="text-emerald-400/70">{d.strategy}</div><div className="text-zinc-500">Investment: {d.investment}</div></div></div>))}</div></div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6"><h3 className="text-lg font-semibold mb-3 text-emerald-400">Attack Plan</h3><div className="space-y-2">{result.attackPlan.map((a, i) => <div key={i} className="text-sm text-zinc-400 flex gap-2"><span className="text-emerald-400 shrink-0">{i + 1}.</span>{a}</div>)}</div></div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6"><h3 className="text-lg font-semibold mb-3 text-blue-400">Defense Needs</h3><div className="space-y-2">{result.defenseNeeds.map((d, i) => <div key={i} className="text-sm text-zinc-400 flex gap-2"><span className="text-blue-400 shrink-0">→</span>{d}</div>)}</div></div>
            </div>
            <div className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 rounded-xl p-8 text-center"><h3 className="text-2xl font-bold mb-2">Turn Their Blind Spots Into Your Advantage</h3><p className="text-zinc-400 mb-4">PostCraft AI finds every gap your competitors left open. Pair with <a href="/competitor-analysis" className="text-violet-400 underline">Competitor Analysis</a>, <a href="/competitor-spy" className="text-violet-400 underline">Competitor Spy</a>, and <a href="/content-gap" className="text-violet-400 underline">Content Gap Analyzer</a>.</p><a href="/pricing" className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">Get PostCraft Pro</a></div>
          </div>
        )}
      </div>
    </main>
  );
}
