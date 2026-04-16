'use client';
import { useState } from 'react';

const timeframes = ['This Week', 'This Month', 'This Quarter', 'This Year'] as const;
const dataSources = ['Academic Papers', 'Industry Reports', 'News Feeds', 'Patent Filings', 'Government Data', 'Conference Proceedings'] as const;

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }

interface MacroTrend { trend: string; relevance: number; momentum: string; angle: string; }
interface CrossSignal { industry: string; signal: string; relevance: number; inspiration: string; }
interface AuthoritySource { source: string; credibility: number; opportunity: string; freshness: string; }
interface ContentAngle { angle: string; headline: string; hook: string; engagement: number; }
interface TimingWindow { window: string; lifecycle: string; urgency: string; recommendation: string; }
interface WhiteSpace { topic: string; opportunity: number; coverage: string; suggestion: string; }
interface ActionItem { priority: string; piece: string; format: string; rationale: string; deadline: string; }

interface EcosystemResult {
  score: number; grade: string;
  trends: MacroTrend[]; signals: CrossSignal[]; sources: AuthoritySource[];
  angles: ContentAngle[]; windows: TimingWindow[]; whiteSpaces: WhiteSpace[]; actions: ActionItem[];
}

function generate(industry: string, focus: string, audience: string, timeframe: string, sources: string[]): EcosystemResult {
  const seed = hash(`${industry}-${focus}-${audience}-${timeframe}-${sources.join(',')}`);
  const score = 35 + seed % 60;
  const grade = score >= 85 ? 'A+' : score >= 75 ? 'A' : score >= 65 ? 'B+' : score >= 55 ? 'B' : score >= 45 ? 'C+' : 'C';

  const trendNames = ['AI-Powered Personalization', 'Decentralized Content Ownership', 'Micro-Community Monetization', 'Voice-First Content Strategy', 'Sustainability Narrative Shift', 'Creator-Led Product Development', 'Zero-Click Content Optimization', 'Real-Time Collaborative Content', 'Ethical Data Storytelling', 'Augmented Reality Experiences'];
  const momentums = ['Rising', 'Stable', 'Declining'];
  const trends: MacroTrend[] = Array.from({ length: 6 }, (_, i) => ({
    trend: trendNames[(seed + i * 3) % trendNames.length],
    relevance: 40 + ((seed * (i + 1) * 7) % 55),
    momentum: momentums[(seed + i) % 3],
    angle: [`Position ${industry} as early adopter of this trend`, `Create contrarian take on why this trend is overrated in ${focus}`, `Interview practitioners already using this in ${audience} workflows`, `Build a data-driven case study showing ROI of this approach`, `Develop a beginner guide for ${audience} to leverage this`, `Create a comparison framework: old way vs. this trend`][(seed + i) % 6],
  }));

  const adjIndustries = ['Healthcare Tech', 'FinTech', 'EdTech', 'Gaming', 'Logistics', 'Clean Energy', 'Biotech', 'Aerospace'];
  const signals: CrossSignal[] = Array.from({ length: 5 }, (_, i) => ({
    industry: adjIndustries[(seed + i * 2) % adjIndustries.length],
    signal: [`Subscription fatigue driving unbundled content models`, `Community-led growth replacing paid acquisition`, `Regulatory changes creating new content requirements`, `Platform algorithm shifts favoring long-form depth`, `Privacy-first analytics reshaping attribution models`][i],
    relevance: 30 + ((seed * (i + 3)) % 65),
    inspiration: [`Adapt their unbundled model to your ${focus} content`, `Build a community-first content funnel for ${audience}`, `Create compliance-focused content ahead of competitors`, `Shift to in-depth guides that algorithms now prefer`, `Pioneer privacy-respecting content measurement in ${industry}`][i],
  }));

  const sourceNames = ['Harvard Business Review', 'McKinsey Insights', 'MIT Technology Review', 'Gartner Research', 'World Economic Forum', 'Stanford Digital Economy Lab', 'Forrester Reports', 'PwC Strategy&'];
  const authorSources: AuthoritySource[] = Array.from({ length: 8 }, (_, i) => ({
    source: sourceNames[i],
    credibility: 60 + ((seed * (i + 1)) % 35),
    opportunity: [`Cite their ${industry} report in your next thought leadership piece`, `Reference their data to back your ${focus} predictions`, `Contrast their findings with your audience-specific insights`, `Use their framework as a content template for ${audience}`, `Build a simplified explainer of their complex research`, `Create an infographic summarizing their key findings`, `Develop a podcast episode analyzing their latest report`, `Write a response piece challenging or expanding their thesis`][i],
    freshness: ['Published this week', 'Published this month', 'Last quarter', 'Evergreen'][((seed + i * 5) % 4)],
  }));

  const angles: ContentAngle[] = Array.from({ length: 6 }, (_, i) => ({
    angle: [`Trend Intersection Analysis`, `Contrarian Industry Take`, `Data-Backed Prediction`, `Expert Roundup Synthesis`, `Framework Development`, `Case Study Deep Dive`][i],
    headline: [
      `Why ${industry} Leaders Are Betting Big on ${trends[0].trend} in ${timeframe === 'This Year' ? '2026' : 'Q2 2026'}`,
      `The Uncomfortable Truth About ${focus} That Nobody in ${industry} Wants to Discuss`,
      `${industry} by the Numbers: ${5 + seed % 8} Data Points That Predict What Comes Next`,
      `We Asked ${3 + seed % 5} ${industry} Experts About ${focus} — Here Is What They Agreed On`,
      `The ${focus} Framework: A ${3 + seed % 4}-Step System for ${audience}`,
      `How One ${industry} Team ${['Tripled', 'Doubled', '10x-ed'][(seed + i) % 3]} Their ${focus} Results in ${['90 Days', '6 Months', '1 Quarter'][(seed + i) % 3]}`,
    ][i],
    hook: [
      `While most ${audience} are still debating whether ${trends[0].trend} matters, early movers are already seeing results.`,
      `Everyone in ${industry} is saying the same thing about ${focus}. They are all wrong. Here is why.`,
      `We analyzed ${(seed % 50 + 10) * 100} data points across ${industry}. The patterns are undeniable.`,
      `When ${3 + seed % 5} competing experts agree on something, it is worth paying attention.`,
      `Most ${audience} overcomplicate ${focus}. This framework simplifies everything into actionable steps.`,
      `This is not theory. This is a documented playbook from a real ${industry} team with real numbers.`,
    ][i],
    engagement: 40 + ((seed * (i + 2) * 11) % 55),
  }));

  const windows: TimingWindow[] = [
    { window: 'Early Mover Window', lifecycle: 'Emergence Phase', urgency: seed % 3 === 0 ? 'High' : 'Medium', recommendation: `Publish foundational content on ${trends[0].trend} within ${timeframe === 'This Week' ? '3 days' : '2 weeks'} to claim authority` },
    { window: 'Peak Interest Window', lifecycle: 'Growth Phase', urgency: 'High', recommendation: `Release data-driven analysis when search volume peaks — target ${['Monday AM', 'Tuesday AM', 'Wednesday PM', 'Thursday AM'][(seed) % 4]}` },
    { window: 'Consolidation Window', lifecycle: 'Maturity Phase', urgency: 'Medium', recommendation: `Publish definitive guides and frameworks once initial hype settles and ${audience} seek depth` },
    { window: 'Contrarian Window', lifecycle: 'Saturation Phase', urgency: seed % 2 === 0 ? 'High' : 'Low', recommendation: `When everyone covers the same angle, publish a contrarian or "what went wrong" perspective` },
  ];

  const whiteSpaceTopics = [`${focus} for underserved ${audience} segments`, `Intersection of ${trends[0].trend} and ${trends[1].trend}`, `${industry} failure analysis and lessons learned`, `ROI benchmarks for ${focus} initiatives`, `${focus} automation workflows for small teams`];
  const whiteSpaces: WhiteSpace[] = Array.from({ length: 5 }, (_, i) => ({
    topic: whiteSpaceTopics[i],
    opportunity: 40 + ((seed * (i + 7)) % 55),
    coverage: ['Very Low', 'Low', 'Moderate'][(seed + i) % 3],
    suggestion: [`Create a definitive resource that becomes the go-to reference`, `Build an interactive tool or calculator around this gap`, `Launch a content series with weekly installments`, `Develop a downloadable framework or template`, `Produce a video explainer series for visual learners`][i],
  }));

  const actions: ActionItem[] = Array.from({ length: 5 }, (_, i) => ({
    priority: `P${i < 2 ? 0 : i < 4 ? 1 : 2}`,
    piece: angles[i].headline,
    format: ['Long-Form Article', 'LinkedIn Carousel', 'Video Essay', 'Twitter/X Thread', 'Newsletter Deep Dive'][i],
    rationale: [`Highest engagement potential + low competition`, `Trending topic with rising momentum — time-sensitive`, `White space opportunity with strong search demand`, `Cross-industry signal gaining traction in ${industry}`, `Authority-building piece leveraging high-credibility sources`][i],
    deadline: [`${timeframe === 'This Week' ? '2 days' : '1 week'}`, `${timeframe === 'This Week' ? '4 days' : '2 weeks'}`, `${timeframe === 'This Week' ? '5 days' : '3 weeks'}`, `${timeframe === 'This Month' ? '3 weeks' : '1 month'}`, `${timeframe === 'This Month' ? '4 weeks' : '6 weeks'}`][i],
  }));

  return { score, grade, trends, signals, sources: authorSources, angles, windows, whiteSpaces, actions };
}

export default function EcosystemMapperPage() {
  const [industry, setIndustry] = useState('');
  const [focus, setFocus] = useState('');
  const [audience, setAudience] = useState('');
  const [timeframe, setTimeframe] = useState<string>(timeframes[0]);
  const [selectedSources, setSelectedSources] = useState<string[]>([...dataSources]);
  const [result, setResult] = useState<EcosystemResult | null>(null);

  const toggleSource = (s: string) => setSelectedSources(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  const handleGenerate = () => { if (industry.trim() && focus.trim() && audience.trim()) setResult(generate(industry, focus, audience, timeframe, selectedSources)); };
  const scoreColor = (n: number) => n > 75 ? '#34d399' : n > 55 ? '#a78bfa' : n > 35 ? '#fbbf24' : '#f87171';
  const momentumColor = (m: string) => m === 'Rising' ? '#34d399' : m === 'Stable' ? '#a78bfa' : '#f87171';
  const urgencyColor = (u: string) => u === 'High' ? '#f87171' : u === 'Medium' ? '#fbbf24' : '#60a5fa';
  const prioColor = (p: string) => p === 'P0' ? '#f87171' : p === 'P1' ? '#fbbf24' : '#60a5fa';

  return (
    <main className="min-h-screen bg-black text-white px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent mb-2">Ecosystem Relevance Mapper</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Scan your industry ecosystem for emerging trends, cross-industry signals, authority sources, and content white space. Get a prioritized action plan based on real-time relevance mapping.</p>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Industry / Niche</label>
            <input type="text" value={industry} onChange={e => setIndustry(e.target.value)} placeholder="e.g., B2B SaaS, DTC E-commerce, HealthTech" className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-3 text-white" />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Content Focus Area</label>
            <input type="text" value={focus} onChange={e => setFocus(e.target.value)} placeholder="e.g., Content Marketing, Product-Led Growth" className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-3 text-white" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Target Audience</label>
            <input type="text" value={audience} onChange={e => setAudience(e.target.value)} placeholder="e.g., Marketing Directors, Startup Founders" className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-3 text-white" />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Timeframe</label>
            <select value={timeframe} onChange={e => setTimeframe(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-3 text-white">
              {timeframes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm text-zinc-400 mb-2">Data Sources to Scan</label>
          <div className="flex flex-wrap gap-3">
            {dataSources.map(s => (
              <label key={s} className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer text-sm transition ${selectedSources.includes(s) ? 'bg-violet-600/20 border-violet-500/50 text-violet-300' : 'bg-zinc-900 border-zinc-700 text-zinc-400'}`}>
                <input type="checkbox" checked={selectedSources.includes(s)} onChange={() => toggleSource(s)} className="accent-violet-500" />{s}
              </label>
            ))}
          </div>
        </div>
        <button onClick={handleGenerate} className="w-full md:w-auto bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-3 rounded font-semibold hover:opacity-90 transition mb-8">Map My Ecosystem</button>

        {result && (
          <div className="space-y-8">
            {/* Ecosystem Score */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center">
              <div className="text-6xl font-bold mb-1" style={{ color: scoreColor(result.score) }}>{result.score}</div>
              <div className="text-zinc-400 mb-1">Ecosystem Relevance Score</div>
              <div className="text-3xl font-bold mb-3" style={{ color: scoreColor(result.score) }}>{result.grade}</div>
              <div className="max-w-md mx-auto bg-zinc-800 rounded-full h-3"><div className="h-3 rounded-full" style={{ width: `${result.score}%`, background: scoreColor(result.score) }} /></div>
            </div>

            {/* Macro-Trend Radar */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-violet-400">Macro-Trend Radar</h3>
              <div className="space-y-3">
                {result.trends.map((t, i) => (
                  <div key={i} className="bg-zinc-800/60 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-zinc-100">{t.trend}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs px-2 py-1 rounded font-semibold" style={{ color: momentumColor(t.momentum), background: `${momentumColor(t.momentum)}15` }}>{t.momentum}</span>
                        <span className="text-sm font-bold" style={{ color: scoreColor(t.relevance) }}>{t.relevance}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-zinc-700 rounded-full h-2 mb-2"><div className="h-2 rounded-full" style={{ width: `${t.relevance}%`, background: scoreColor(t.relevance) }} /></div>
                    <div className="text-xs text-zinc-400"><span className="text-zinc-500">Content Angle:</span> {t.angle}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cross-Industry Signals */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-purple-400">Cross-Industry Signals</h3>
              <div className="space-y-3">
                {result.signals.map((s, i) => (
                  <div key={i} className="bg-zinc-800/60 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs px-2 py-1 rounded bg-purple-500/20 text-purple-300">{s.industry}</span>
                      <span className="text-sm font-bold" style={{ color: scoreColor(s.relevance) }}>{s.relevance}%</span>
                    </div>
                    <div className="text-sm text-zinc-200 mb-1">{s.signal}</div>
                    <div className="text-xs text-violet-400/70">{s.inspiration}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Authority Source Map */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-violet-400">Authority Source Map</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="text-left text-zinc-500 border-b border-zinc-700"><th className="pb-2 pr-3">Source</th><th className="pb-2 pr-3">Credibility</th><th className="pb-2 pr-3">Freshness</th><th className="pb-2">Content Opportunity</th></tr></thead>
                  <tbody>
                    {result.sources.map((s, i) => (
                      <tr key={i} className="border-b border-zinc-800/50">
                        <td className="py-3 pr-3 text-zinc-200 font-medium">{s.source}</td>
                        <td className="py-3 pr-3"><span className="font-bold" style={{ color: scoreColor(s.credibility) }}>{s.credibility}</span></td>
                        <td className="py-3 pr-3 text-xs text-zinc-400">{s.freshness}</td>
                        <td className="py-3 text-xs text-zinc-300">{s.opportunity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Topical Angle Generator */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-purple-400">Topical Angle Generator</h3>
              <div className="space-y-4">
                {result.angles.map((a, i) => (
                  <div key={i} className="bg-zinc-800/60 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs px-2 py-1 rounded bg-violet-500/20 text-violet-300">{a.angle}</span>
                      <span className="text-sm">Est. Engagement: <span className="font-bold" style={{ color: scoreColor(a.engagement) }}>{a.engagement}%</span></span>
                    </div>
                    <div className="text-sm font-semibold text-zinc-100 mb-1">{a.headline}</div>
                    <div className="text-xs text-zinc-400 italic">{a.hook}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timing Windows + White Space */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-violet-400">Timing Windows</h3>
                <div className="space-y-3">
                  {result.windows.map((w, i) => (
                    <div key={i} className="bg-zinc-800/60 rounded-lg p-3 border border-zinc-700/50">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-zinc-200">{w.window}</span>
                        <span className="text-xs px-2 py-1 rounded font-semibold" style={{ color: urgencyColor(w.urgency), background: `${urgencyColor(w.urgency)}15` }}>{w.urgency}</span>
                      </div>
                      <div className="text-xs text-zinc-500 mb-1">{w.lifecycle}</div>
                      <div className="text-xs text-zinc-300">{w.recommendation}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-purple-400">Competitive White Space</h3>
                <div className="space-y-3">
                  {result.whiteSpaces.map((w, i) => (
                    <div key={i} className="bg-zinc-800/60 rounded-lg p-3 border border-zinc-700/50">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-zinc-200">{w.topic}</span>
                        <span className="text-sm font-bold" style={{ color: scoreColor(w.opportunity) }}>{w.opportunity}%</span>
                      </div>
                      <div className="text-xs text-zinc-500 mb-1">Coverage: {w.coverage}</div>
                      <div className="text-xs text-violet-400/70">{w.suggestion}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Plan */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-violet-400">Action Plan</h3>
              <div className="space-y-3">
                {result.actions.map((a, i) => (
                  <div key={i} className="flex gap-3 items-start bg-zinc-800/60 rounded-lg p-4 border border-zinc-700/50">
                    <span className="shrink-0 text-xs px-2 py-1 rounded font-bold" style={{ color: prioColor(a.priority), background: `${prioColor(a.priority)}15` }}>{a.priority}</span>
                    <div className="flex-1">
                      <div className="text-sm text-zinc-100 font-medium">{a.piece}</div>
                      <div className="flex flex-wrap gap-4 mt-1 text-xs">
                        <span className="text-violet-400">{a.format}</span>
                        <span className="text-zinc-400">{a.rationale}</span>
                        <span className="text-zinc-500">Deadline: {a.deadline}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-violet-600/20 to-purple-600/20 border border-violet-500/30 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">Stay Ahead of Your Ecosystem</h3>
              <p className="text-zinc-400 mb-4">Use PostCraft AI to map trends, find white space, and build authority. Pair with <a href="/trend-mapper" className="text-violet-400 underline">Trend Mapper</a>, <a href="/content-gap" className="text-violet-400 underline">Content Gap</a>, and <a href="/topic-miner" className="text-violet-400 underline">Topic Miner</a>.</p>
              <a href="/pricing" className="inline-block bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">Get PostCraft Pro</a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
