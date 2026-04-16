'use client';
import { useState } from 'react';

const teamSizes = ['Solo Creator', '2-3 Person Team', '4-8 Person Team', '10-20 Person Team', '20+ (Agency)'] as const;
const contentCadences = ['Daily Posts', '3-5x/Week', 'Weekly', 'Bi-weekly', 'Monthly'] as const;
const platforms = ['Instagram + TikTok', 'LinkedIn + Twitter/X', 'YouTube + Podcast', 'All Social (5+)', 'Blog + Email + Social'] as const;
const industries = ['E-commerce', 'SaaS / Tech', 'Agency / Freelance', 'Healthcare', 'Education', 'Finance', 'Media / Entertainment', 'Non-Profit'] as const;

interface DeadlineItem { title: string; dueIn: string; priority: 'Critical' | 'High' | 'Medium' | 'Low'; status: string; owner: string; dependencies: string; riskIfMissed: string; }
interface ContentSlot { day: string; platform: string; type: string; deadline: string; bufferTime: string; status: string; }
interface BottleneckRisk { risk: string; probability: string; impact: string; mitigation: string; earlyWarning: string; }
interface AutomationRule { trigger: string; action: string; tool: string; timeSaved: string; }
interface CapacityMetric { metric: string; current: string; optimal: string; gap: string; recommendation: string; }

interface DeadlineReport {
  weeklyCapacity: number;
  utilizationRate: number;
  missedDeadlineRisk: number;
  deadlines: DeadlineItem[];
  schedule: ContentSlot[];
  risks: BottleneckRisk[];
  automations: AutomationRule[];
  capacityMetrics: CapacityMetric[];
  urgentActions: string[];
  weeklyRhythm: string[];
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }

function trackDeadlines(team: string, cadence: string, platform: string, industry: string, brand: string): DeadlineReport {
  const seed = hash(`${team}-${cadence}-${platform}-${industry}-${brand}`);
  const weeklyCapacity = 5 + seed % 20;
  const utilizationRate = 55 + seed % 35;
  const missedDeadlineRisk = 10 + seed % 40;

  const deadlines: DeadlineItem[] = [
    { title: 'Weekly Content Batch — Draft Completion', dueIn: `${1 + seed % 2} days`, priority: 'Critical', status: 'Needs attention — behind by 1 slot', owner: 'Content Creator', dependencies: 'Content brief approved, assets collected', riskIfMissed: 'Entire week\'s schedule shifts — cascading delays across all platforms' },
    { title: 'Visual Asset Production', dueIn: `${2 + seed % 3} days`, priority: 'High', status: seed % 2 === 0 ? 'On track' : 'Waiting on brand assets', owner: 'Designer / Creator', dependencies: 'Draft text approved, brand guidelines updated', riskIfMissed: 'Posts go live without optimized visuals — 40-60% lower engagement' },
    { title: 'Video Content — Edit & Caption', dueIn: `${3 + seed % 4} days`, priority: 'High', status: 'In production', owner: 'Video Editor', dependencies: 'Raw footage delivered, script approved', riskIfMissed: 'Video slots filled with repurposed content — missed algorithm momentum' },
    { title: 'Monthly Analytics Report', dueIn: `${5 + seed % 10} days`, priority: 'Medium', status: 'Scheduled', owner: 'Analytics Lead', dependencies: '30-day data window complete', riskIfMissed: 'Next month\'s strategy based on gut feeling instead of data — suboptimal content mix' },
    { title: 'Quarterly Content Audit', dueIn: `${15 + seed % 30} days`, priority: 'Medium', status: 'Not started', owner: 'Content Manager', dependencies: 'Monthly reports for Q complete', riskIfMissed: 'Content decay undetected — underperforming pieces stay live, top performers not repurposed' },
    { title: 'Campaign Launch — Pre-Production', dueIn: `${7 + seed % 14} days`, priority: 'Critical', status: seed % 3 === 0 ? 'At risk' : 'Planning', owner: 'Campaign Manager', dependencies: 'Budget approved, creative brief signed off, landing pages ready', riskIfMissed: 'Campaign launch delayed — paid media budget wasted on holding patterns' },
    { title: 'Influencer Content Review', dueIn: `${3 + seed % 5} days`, priority: 'Low', status: 'Awaiting submissions', owner: 'Partnerships Lead', dependencies: 'Influencer briefs sent, contracts signed', riskIfMissed: 'Influencer content published without brand review — potential brand safety issue' },
  ];

  const schedule: ContentSlot[] = [
    { day: 'Monday', platform: 'LinkedIn', type: 'Thought Leadership Post', deadline: 'Friday prior (3 days buffer)', bufferTime: '3 days', status: 'Scheduled' },
    { day: 'Monday', platform: 'Instagram Stories', type: 'Behind-the-Scenes', deadline: 'Monday morning (same day)', bufferTime: '2 hours', status: 'Template ready' },
    { day: 'Tuesday', platform: 'Twitter/X', type: 'Thread (5-7 tweets)', deadline: 'Monday EOD', bufferTime: '1 day', status: seed % 2 === 0 ? 'Draft ready' : 'Needs draft' },
    { day: 'Wednesday', platform: 'TikTok', type: 'Short-Form Video (30-60s)', deadline: 'Monday (2 day buffer for editing)', bufferTime: '2 days', status: 'In editing' },
    { day: 'Thursday', platform: 'Blog + Email', type: 'Long-Form Article + Newsletter', deadline: 'Tuesday (2 day buffer)', bufferTime: '2 days', status: 'Writing' },
    { day: 'Friday', platform: 'Instagram Feed', type: 'Carousel Post (5-10 slides)', deadline: 'Wednesday (2 day buffer)', bufferTime: '2 days', status: 'Design phase' },
    { day: 'Saturday', platform: 'YouTube', type: 'Weekly Video (8-15 min)', deadline: 'Wednesday (3 day buffer for editing)', bufferTime: '3 days', status: seed % 3 === 0 ? 'Editing' : 'Filming' },
  ];

  const risks: BottleneckRisk[] = [
    { risk: 'Creator Burnout', probability: `${30 + seed % 30}%`, impact: 'Quality drops, deadlines missed for 1-2 weeks, then recovery', mitigation: 'Batch content 2 weeks ahead — create a "content bank" of 10-15 evergreen pieces', earlyWarning: 'Quality declining, asking for deadline extensions, shorter posts than usual' },
    { risk: 'Approval Bottleneck', probability: `${20 + seed % 25}%`, impact: 'Scheduled posts delayed — algorithm penalizes inconsistency', mitigation: 'Auto-approve rule: if not reviewed within 12 hours, content publishes (for low-risk content)', earlyWarning: 'Review queue growing, same-day approvals becoming next-day' },
    { risk: 'Platform Algorithm Change', probability: `${15 + seed % 20}%`, impact: 'Current content format underperforms — reach drops 30-50%', mitigation: 'Diversify formats — never put 100% into one content type or platform', earlyWarning: 'Engagement rate dropping despite consistent quality and posting' },
    { risk: 'Trending Topic Miss', probability: `${25 + seed % 20}%`, impact: 'Competitors capitalize on trend while you\'re producing scheduled content', mitigation: 'Reserve 20% capacity for reactive content — "trend response" slots in the calendar', earlyWarning: 'Competitor posts on trending topic before you — your audience mentions it first' },
    { risk: 'Asset Dependency Delay', probability: `${20 + seed % 20}%`, impact: 'Visual content delayed — text-only posts fill the gap (lower engagement)', mitigation: 'Maintain asset library of 50+ brand-approved templates, stock photos, video clips', earlyWarning: 'Designer/photographer responding slower than usual, asset requests piling up' },
  ];

  const automations: AutomationRule[] = [
    { trigger: 'Content brief approved', action: 'Auto-create draft task with deadline and template in project management tool', tool: 'Notion/Asana + Zapier', timeSaved: '15 min per piece' },
    { trigger: 'Draft submitted for review', action: 'Auto-run grammar check, brand term scan, tone analysis before human review', tool: 'Grammarly API + Custom checks', timeSaved: '20 min per piece (reviewer time)' },
    { trigger: 'Approval not received within 12h', action: 'Auto-escalate to backup approver, then auto-publish at 24h for low-risk content', tool: 'Slack bot + scheduling tool', timeSaved: '1-2 days per delayed piece' },
    { trigger: 'Content published', action: 'Auto-post to all scheduled platforms with platform-optimized formatting', tool: 'Buffer/Hootsuite API', timeSaved: '30 min per cross-post session' },
    { trigger: 'Post performance data available (24h)', action: 'Auto-generate mini-report: engagement rate, reach, top comments, comparison to average', tool: 'PostHog/Analytics API + Dashboard', timeSaved: '20 min per post analysis' },
    { trigger: 'Monthly milestone reached', action: 'Auto-compile performance report with top/bottom performers and recommendations', tool: 'Custom script + Notion', timeSaved: '3-4 hours per monthly report' },
  ];

  const capacityMetrics: CapacityMetric[] = [
    { metric: 'Weekly Content Output', current: `${weeklyCapacity} pieces`, optimal: `${Math.ceil(weeklyCapacity * 0.8)} pieces (80% utilization)`, gap: utilizationRate > 85 ? 'Over capacity — burnout risk' : 'Healthy capacity', recommendation: utilizationRate > 85 ? 'Reduce output by 20% or add team member — quality over quantity' : 'Good balance — maintain current pace with 20% buffer for reactive content' },
    { metric: 'Buffer Time per Piece', current: `${1 + seed % 2} days average`, optimal: '2-3 days minimum', gap: seed % 2 === 0 ? 'Adequate' : 'Too tight — one delay cascades', recommendation: 'Move content creation 1 day earlier across the board — small shift, big safety net' },
    { metric: 'Content Bank Size', current: `${seed % 8} evergreen pieces ready`, optimal: '10-15 pieces (2 week buffer)', gap: `${Math.max(0, 10 - seed % 8)} pieces short`, recommendation: 'Dedicate 1 day/month to creating 4-5 evergreen pieces that can fill any slot' },
    { metric: 'Review Turnaround', current: `${8 + seed % 24} hours average`, optimal: '< 8 hours', gap: seed % 24 > 8 ? 'Slow — blocking production' : 'Within target', recommendation: 'Implement dedicated review windows: 9-10 AM and 3-4 PM daily' },
    { metric: 'Repurpose Ratio', current: `${1 + seed % 3}:1 (pieces created:repurposed)`, optimal: '1:3 (every piece repurposed 3x)', gap: 'Under-leveraging existing content', recommendation: 'After publishing, immediately queue 3 repurpose variants: short clip, quote card, thread' },
  ];

  const urgentActions = [
    missedDeadlineRisk > 30 ? `HIGH RISK: ${missedDeadlineRisk}% chance of missed deadline this week — front-load critical content today` : `Risk moderate at ${missedDeadlineRisk}% — maintain current pace with buffer checks`,
    utilizationRate > 85 ? 'OVER CAPACITY: Running above 85% utilization — cut lowest-performing content type this week' : 'Capacity healthy — consider adding 1 experimental content piece this week',
    'Batch-create all visual assets for the week in one session — context-switching between creation and design kills productivity',
    'Review next week\'s content calendar TODAY — flag any gaps or missing briefs before they become emergencies',
    'Check content bank — if below 5 evergreen pieces, schedule a "bank building" session this week',
  ];

  const weeklyRhythm = [
    'Monday AM: Review week\'s schedule, confirm all drafts and assets are on track. Flag any at-risk items.',
    'Monday PM: Create/finalize content for Tuesday-Wednesday. Batch visual assets.',
    'Tuesday: Long-form content day — blog posts, newsletters, video scripts. Deep work, no meetings.',
    'Wednesday: Video production and editing. Review and approve Thursday-Friday content.',
    'Thursday: Engagement and community — respond to comments, DMs, mentions. Light content creation.',
    'Friday AM: Review week\'s performance. Plan next week. Create content briefs for Monday.',
    'Friday PM: Content bank — create 1-2 evergreen pieces. Repurpose top performer from this week.',
    'Weekend: Scheduled posts only. No creation. Rest and recharge for next week\'s sprint.',
  ];

  return { weeklyCapacity, utilizationRate, missedDeadlineRisk, deadlines, schedule, risks, automations, capacityMetrics, urgentActions, weeklyRhythm };
}

export default function DeadlineTrackerPage() {
  const [team, setTeam] = useState<string>(teamSizes[0]);
  const [cadence, setCadence] = useState<string>(contentCadences[1]);
  const [platform, setPlatform] = useState<string>(platforms[0]);
  const [industry, setIndustry] = useState<string>(industries[0]);
  const [brand, setBrand] = useState('');
  const [report, setReport] = useState<DeadlineReport | null>(null);

  const generate = () => { if (brand.trim()) setReport(trackDeadlines(team, cadence, platform, industry, brand)); };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <span className="px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full text-sm font-medium">Content Operations</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Content Deadline Tracker</h1>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">Never miss a posting deadline again. Get urgency scoring, capacity analysis, and automated workflow recommendations for your content calendar.</p>
        </div>

        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Team Size</label>
              <select value={team} onChange={e => setTeam(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white">{teamSizes.map(t => <option key={t}>{t}</option>)}</select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Content Cadence</label>
              <select value={cadence} onChange={e => setCadence(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white">{contentCadences.map(c => <option key={c}>{c}</option>)}</select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Primary Platforms</label>
              <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white">{platforms.map(p => <option key={p}>{p}</option>)}</select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Industry</label>
              <select value={industry} onChange={e => setIndustry(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white">{industries.map(i => <option key={i}>{i}</option>)}</select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-1">Brand / Business Name</label>
            <input value={brand} onChange={e => setBrand(e.target.value)} placeholder="e.g., Acme Corp" className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white" />
          </div>
          <button onClick={generate} className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all">Track My Deadlines</button>
        </div>

        {report && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-orange-400">{report.weeklyCapacity}</div>
                <div className="text-sm text-gray-400 mt-1">Pieces / Week</div>
              </div>
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 text-center">
                <div className={`text-3xl font-bold ${report.utilizationRate > 85 ? 'text-red-400' : 'text-green-400'}`}>{report.utilizationRate}%</div>
                <div className="text-sm text-gray-400 mt-1">Utilization Rate</div>
              </div>
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 text-center">
                <div className={`text-3xl font-bold ${report.missedDeadlineRisk > 30 ? 'text-red-400' : report.missedDeadlineRisk > 20 ? 'text-yellow-400' : 'text-green-400'}`}>{report.missedDeadlineRisk}%</div>
                <div className="text-sm text-gray-400 mt-1">Missed Deadline Risk</div>
              </div>
            </div>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-orange-300">Urgent Actions</h2>
              <div className="space-y-2">{report.urgentActions.map((a, i) => <div key={i} className={`p-3 rounded-lg border ${i === 0 ? 'bg-red-500/10 border-red-500/30 text-red-300' : 'bg-gray-800/50 border-gray-700/50 text-gray-300'}`}>{a}</div>)}</div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-orange-300">Active Deadlines</h2>
              <div className="space-y-3">{report.deadlines.map((d, i) => (
                <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">{d.title}</h3>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${d.priority === 'Critical' ? 'bg-red-500/20 text-red-400' : d.priority === 'High' ? 'bg-orange-500/20 text-orange-400' : d.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-500/20 text-gray-400'}`}>{d.priority}</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    <div><span className="text-gray-500">Due in:</span> <span className="text-orange-300">{d.dueIn}</span></div>
                    <div><span className="text-gray-500">Status:</span> <span className="text-gray-300">{d.status}</span></div>
                    <div><span className="text-gray-500">Owner:</span> <span className="text-gray-300">{d.owner}</span></div>
                    <div><span className="text-gray-500">Dependencies:</span> <span className="text-gray-300">{d.dependencies}</span></div>
                  </div>
                  <div className="mt-2 text-sm text-red-400/80">Risk if missed: {d.riskIfMissed}</div>
                </div>
              ))}</div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-orange-300">Weekly Content Schedule</h2>
              <div className="overflow-x-auto"><table className="w-full text-sm">
                <thead><tr className="border-b border-gray-700">{['Day', 'Platform', 'Content Type', 'Deadline', 'Buffer', 'Status'].map(h => <th key={h} className="text-left py-2 px-3 text-gray-400 font-medium">{h}</th>)}</tr></thead>
                <tbody>{report.schedule.map((s, i) => <tr key={i} className="border-b border-gray-800"><td className="py-2 px-3 text-white font-medium">{s.day}</td><td className="py-2 px-3 text-gray-300">{s.platform}</td><td className="py-2 px-3 text-gray-300">{s.type}</td><td className="py-2 px-3 text-orange-300">{s.deadline}</td><td className="py-2 px-3 text-gray-400">{s.bufferTime}</td><td className="py-2 px-3 text-gray-300">{s.status}</td></tr>)}</tbody>
              </table></div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-orange-300">Bottleneck Risks</h2>
              <div className="space-y-3">{report.risks.map((r, i) => (
                <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                  <h3 className="font-semibold text-white mb-2">{r.risk}</h3>
                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    <div><span className="text-gray-500">Probability:</span> <span className="text-yellow-300">{r.probability}</span></div>
                    <div><span className="text-gray-500">Impact:</span> <span className="text-red-300">{r.impact}</span></div>
                    <div className="md:col-span-2"><span className="text-gray-500">Mitigation:</span> <span className="text-green-300">{r.mitigation}</span></div>
                    <div className="md:col-span-2"><span className="text-gray-500">Early warning:</span> <span className="text-orange-300">{r.earlyWarning}</span></div>
                  </div>
                </div>
              ))}</div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-orange-300">Automation Opportunities</h2>
              <div className="overflow-x-auto"><table className="w-full text-sm">
                <thead><tr className="border-b border-gray-700">{['Trigger', 'Action', 'Tool', 'Time Saved'].map(h => <th key={h} className="text-left py-2 px-3 text-gray-400 font-medium">{h}</th>)}</tr></thead>
                <tbody>{report.automations.map((a, i) => <tr key={i} className="border-b border-gray-800"><td className="py-2 px-3 text-white">{a.trigger}</td><td className="py-2 px-3 text-gray-300">{a.action}</td><td className="py-2 px-3 text-blue-300">{a.tool}</td><td className="py-2 px-3 text-green-300">{a.timeSaved}</td></tr>)}</tbody>
              </table></div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-orange-300">Capacity Analysis</h2>
              <div className="space-y-3">{report.capacityMetrics.map((m, i) => (
                <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                  <h3 className="font-semibold text-white mb-2">{m.metric}</h3>
                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    <div><span className="text-gray-500">Current:</span> <span className="text-gray-300">{m.current}</span></div>
                    <div><span className="text-gray-500">Optimal:</span> <span className="text-green-300">{m.optimal}</span></div>
                    <div><span className="text-gray-500">Gap:</span> <span className="text-yellow-300">{m.gap}</span></div>
                    <div><span className="text-gray-500">Action:</span> <span className="text-blue-300">{m.recommendation}</span></div>
                  </div>
                </div>
              ))}</div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-orange-300">Ideal Weekly Rhythm</h2>
              <div className="space-y-2">{report.weeklyRhythm.map((r, i) => <div key={i} className="p-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-sm text-gray-300"><span className="text-orange-400 font-medium">{r.split(':')[0]}:</span>{r.split(':').slice(1).join(':')}</div>)}</div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
