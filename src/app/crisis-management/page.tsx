'use client';
import { useState } from 'react';

const crisisTypes = ['Negative PR/Media Coverage', 'Product Failure/Outage', 'Customer Complaint Going Viral', 'Employee Misconduct', 'Data Breach/Security', 'Misleading Marketing Claims', 'Social Media Backlash', 'Competitor Attack Campaign'] as const;
const platforms = ['Twitter/X', 'LinkedIn', 'Instagram', 'TikTok', 'Facebook', 'YouTube', 'Reddit'] as const;
const industries = ['Technology', 'E-commerce', 'Finance', 'Healthcare', 'Education', 'Food & Beverage', 'Travel', 'Fashion', 'Fitness', 'Real Estate', 'Entertainment', 'SaaS'] as const;
const severityLevels = ['Low — Isolated complaints', 'Medium — Growing negative trend', 'High — Viral negative coverage', 'Critical — Brand-threatening situation'] as const;
const audienceTypes = ['Customers', 'Investors', 'Employees', 'Media/Press', 'General Public', 'Partners/Vendors'] as const;

interface CrisisResult {
  assessmentScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  estimatedReach: number;
  timeToRespond: string;
  immediateActions: { action: string; priority: 'now' | '1h' | '4h' | '24h'; owner: string }[];
  responseTemplates: { channel: string; tone: string; template: string }[];
  stakeholderPlan: { audience: string; message: string; channel: string; timing: string }[];
  monitoringChecklist: { item: string; frequency: string; tool: string }[];
  recoveryTimeline: { phase: string; duration: string; actions: string[]; kpis: string[] }[];
  preventionTips: string[];
  doList: string[];
  dontList: string[];
}

function generateCrisisplan(brand: string, crisisType: string, platform: string, industry: string, severity: string, description: string): CrisisResult {
  const seed = (brand + crisisType + platform).length;
  const pseudoRand = (i: number) => ((seed * 31 + i * 17) % 100) / 100;

  const severityIdx = severityLevels.indexOf(severity as typeof severityLevels[number]);
  const assessmentScore = Math.min(100, 20 + severityIdx * 20 + Math.round(pseudoRand(1) * 15));
  const riskLevel = severityIdx >= 3 ? 'critical' : severityIdx >= 2 ? 'high' : severityIdx >= 1 ? 'medium' : 'low';
  const estimatedReach = (severityIdx + 1) * 25000 + Math.round(pseudoRand(2) * 100000);
  const timeToRespond = severityIdx >= 3 ? '15 minutes' : severityIdx >= 2 ? '1 hour' : severityIdx >= 1 ? '4 hours' : '24 hours';

  const immediateActions = [
    { action: `Acknowledge the ${crisisType.toLowerCase()} publicly on ${platform}`, priority: 'now' as const, owner: 'Social Media Manager' },
    { action: `Brief internal team and leadership on the situation`, priority: 'now' as const, owner: 'Communications Lead' },
    { action: `Pause all scheduled posts and ads across platforms`, priority: 'now' as const, owner: 'Social Media Manager' },
    { action: `Prepare a detailed response addressing the specific concerns raised`, priority: '1h' as const, owner: 'PR Team' },
    { action: `Set up real-time monitoring for brand mentions and related keywords`, priority: '1h' as const, owner: 'Social Listening Team' },
    { action: `Identify key influencers and stakeholders discussing the issue`, priority: '1h' as const, owner: 'Community Manager' },
    { action: `Draft an official statement for press inquiries`, priority: '4h' as const, owner: 'PR Director' },
    { action: `Update FAQ page and support channels with relevant information`, priority: '4h' as const, owner: 'Customer Support' },
    { action: `Prepare recovery content strategy for post-crisis period`, priority: '24h' as const, owner: 'Content Team' },
    { action: `Schedule post-crisis debrief with all stakeholders`, priority: '24h' as const, owner: 'Crisis Lead' },
  ];

  const responseTemplates = [
    {
      channel: 'Twitter/X (Initial Response)',
      tone: 'Empathetic, transparent',
      template: `We're aware of the ${crisisType.toLowerCase()} affecting our ${industry.toLowerCase()} community. We take this seriously and are actively investigating. We'll share updates here as we learn more. If you're affected, please DM us — our team is standing by to help.`,
    },
    {
      channel: 'LinkedIn (Official Statement)',
      tone: 'Professional, accountable',
      template: `A message from ${brand} leadership:\n\nWe want to address the recent ${crisisType.toLowerCase()} that has concerned our community. We understand the impact this has on the ${industry.toLowerCase()} professionals who rely on us daily.\n\nHere's what we know:\n- [Specific facts about the situation]\n- [Steps already taken]\n- [Timeline for resolution]\n\nTransparency is core to how we operate. We will continue providing updates as the situation evolves. For immediate assistance, please contact [support channel].\n\nThank you for your patience and trust.`,
    },
    {
      channel: 'Instagram Stories',
      tone: 'Human, personal',
      template: `Hey ${brand} community \u2764\uFE0F\n\nWe hear you. The ${crisisType.toLowerCase()} is unacceptable and we own that completely.\n\nHere's what we're doing RIGHT NOW:\n\u2705 [Action 1]\n\u2705 [Action 2]\n\u2705 [Action 3]\n\nYour trust matters more than anything. DM us for direct help.\n\nMore updates coming today.`,
    },
    {
      channel: 'Email to Affected Users',
      tone: 'Detailed, solution-oriented',
      template: `Subject: Important Update from ${brand} — Action We're Taking\n\nDear valued customer,\n\nWe're writing to inform you about a ${crisisType.toLowerCase()} that may have affected your experience with ${brand}.\n\nWhat happened: [Clear, honest explanation]\nWhat we've done: [Immediate actions taken]\nWhat's next: [Timeline and planned resolution]\nHow we're preventing this: [Long-term measures]\n\nAs a gesture of our commitment to you, we're [offering compensation/extending service/providing additional support].\n\nIf you have questions or concerns, please reach out to [support email] — our team will prioritize your case.\n\nSincerely,\n[Name], [Title] at ${brand}`,
    },
  ];

  const stakeholderPlan = [
    { audience: 'Customers', message: `Acknowledge impact, share resolution timeline, offer direct support channel`, channel: `${platform}, Email, Support chat`, timing: 'Within 30 minutes' },
    { audience: 'Employees', message: `Internal briefing with facts, talking points, and escalation procedures`, channel: 'Slack/Teams, All-hands meeting', timing: 'Within 1 hour' },
    { audience: 'Investors/Board', message: `Situation brief with risk assessment, response plan, and projected impact on metrics`, channel: 'Email, Emergency call', timing: 'Within 2 hours' },
    { audience: 'Media/Press', message: `Official statement with facts, accountability, and remediation plan`, channel: 'Press release, Media contacts', timing: 'Within 4 hours' },
    { audience: 'Partners/Vendors', message: `Impact assessment, joint response coordination, service continuity plan`, channel: 'Direct call, Email', timing: 'Within 4 hours' },
    { audience: 'General Public', message: `Transparent update on resolution progress, commitment to improvement`, channel: 'Blog post, Social media update', timing: 'Within 24 hours' },
  ];

  const monitoringChecklist = [
    { item: 'Brand mention volume and sentiment', frequency: 'Every 15 minutes during crisis', tool: 'Social Listening Dashboard' },
    { item: 'Related hashtag tracking', frequency: 'Every 30 minutes', tool: 'Hashtag monitoring tool' },
    { item: 'Competitor response tracking', frequency: 'Hourly', tool: 'Competitor Analysis' },
    { item: 'Customer support ticket volume', frequency: 'Every 30 minutes', tool: 'Help desk dashboard' },
    { item: 'Media coverage and press mentions', frequency: 'Hourly', tool: 'PR monitoring' },
    { item: 'Employee social media activity', frequency: 'Every 2 hours', tool: 'Internal monitoring' },
    { item: 'Influencer commentary', frequency: 'Hourly', tool: 'Influencer tracking' },
    { item: 'SEO impact (search rankings, featured snippets)', frequency: 'Daily', tool: 'SEO monitoring' },
  ];

  const recoveryTimeline = [
    {
      phase: 'Phase 1: Immediate Response',
      duration: '0-4 hours',
      actions: ['Acknowledge the crisis publicly', 'Activate crisis team', 'Pause scheduled content', 'Begin real-time monitoring'],
      kpis: ['Response time < 1 hour', 'All stakeholders briefed', 'Monitoring active on all channels'],
    },
    {
      phase: 'Phase 2: Containment',
      duration: '4-24 hours',
      actions: ['Deploy response templates across channels', 'Engage with affected users individually', 'Issue official statement', 'Address misinformation'],
      kpis: ['Negative mention velocity decreasing', 'Response rate > 90%', 'Official statement published'],
    },
    {
      phase: 'Phase 3: Resolution',
      duration: '1-7 days',
      actions: ['Implement fix/solution', 'Provide regular updates', 'Launch positive content campaign', 'Engage advocates and supporters'],
      kpis: ['Sentiment trending positive', 'Support ticket volume normalizing', 'Positive mentions increasing'],
    },
    {
      phase: 'Phase 4: Recovery',
      duration: '1-4 weeks',
      actions: ['Publish post-mortem (if appropriate)', 'Launch goodwill campaign', 'Reactivate normal content calendar', 'Implement prevention measures'],
      kpis: ['Sentiment returned to baseline', 'Follower count stabilized', 'Engagement rates recovered', 'Trust metrics improving'],
    },
    {
      phase: 'Phase 5: Prevention',
      duration: 'Ongoing',
      actions: ['Document learnings in crisis playbook', 'Update response templates', 'Train team on updated procedures', 'Schedule quarterly crisis drills'],
      kpis: ['Playbook updated within 2 weeks', 'Team trained within 30 days', 'First drill completed within 60 days'],
    },
  ];

  const preventionTips = [
    'Create a crisis communication plan BEFORE a crisis happens — 54% of brands have no plan in place',
    'Build a "crisis response team" with clear roles: spokesperson, social media lead, customer support lead, legal advisor',
    'Maintain a pre-approved response template library for common crisis scenarios in your industry',
    'Run quarterly crisis simulation drills to keep your team sharp and identify gaps in your playbook',
    'Set up automated social listening alerts for sudden sentiment shifts or mention volume spikes',
    'Build a bank of positive UGC, testimonials, and case studies to deploy during recovery phase',
    `Monitor industry-specific ${industry.toLowerCase()} forums and communities where early warning signals often appear`,
    'Establish a clear escalation chain: who needs to know what, when, and through which channel',
  ];

  const doList = [
    'Respond quickly — silence is interpreted as guilt or indifference',
    'Take responsibility when appropriate — accountability builds trust',
    'Be transparent about what you know and don\'t know',
    'Show empathy first, then provide facts and solutions',
    'Keep all teams aligned with consistent messaging',
    'Document everything for the post-crisis debrief',
    'Engage individually with severely affected customers',
    'Provide regular updates even when there\'s no new information',
  ];

  const dontList = [
    'Don\'t delete negative comments — it always makes things worse',
    'Don\'t blame customers, employees, or partners publicly',
    'Don\'t use humor or sarcasm during an active crisis',
    'Don\'t make promises you can\'t keep or give unrealistic timelines',
    'Don\'t ignore the situation hoping it will go away',
    'Don\'t send tone-deaf marketing messages during the crisis',
    'Don\'t let unauthorized people speak on behalf of the brand',
    'Don\'t forget to follow up once the crisis has passed',
  ];

  return {
    assessmentScore,
    riskLevel,
    estimatedReach,
    timeToRespond,
    immediateActions,
    responseTemplates,
    stakeholderPlan,
    monitoringChecklist,
    recoveryTimeline,
    preventionTips,
    doList,
    dontList,
  };
}

export default function CrisisManagementPage() {
  const [brand, setBrand] = useState('');
  const [crisisType, setCrisisType] = useState<string>(crisisTypes[0]);
  const [platform, setPlatform] = useState<string>('Twitter/X');
  const [industry, setIndustry] = useState<string>('Technology');
  const [severity, setSeverity] = useState<string>(severityLevels[1]);
  const [description, setDescription] = useState('');
  const [result, setResult] = useState<CrisisResult | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  function generate() {
    if (!brand.trim()) return;
    setResult(generateCrisisplan(brand, crisisType, platform, industry, severity, description));
  }

  function copyTemplate(text: string, idx: number) {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  }

  const riskColor = (r: string) => r === 'critical' ? 'text-red-500' : r === 'high' ? 'text-orange-400' : r === 'medium' ? 'text-yellow-400' : 'text-green-400';
  const riskBg = (r: string) => r === 'critical' ? 'bg-red-500/10 border-red-500/20' : r === 'high' ? 'bg-orange-400/10 border-orange-400/20' : r === 'medium' ? 'bg-yellow-400/10 border-yellow-400/20' : 'bg-green-400/10 border-green-400/20';
  const priorityColor = (p: string) => p === 'now' ? 'text-red-400 bg-red-400/10' : p === '1h' ? 'text-orange-400 bg-orange-400/10' : p === '4h' ? 'text-yellow-400 bg-yellow-400/10' : 'text-blue-400 bg-blue-400/10';

  return (
    <main className="min-h-screen px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs text-red-400 uppercase tracking-widest mb-2 font-semibold">Crisis Response</p>
        <h1 className="text-4xl font-bold mb-3">Crisis Management <span className="gradient-text">Toolkit</span></h1>
        <p className="text-zinc-400 mb-10 max-w-2xl">Generate a complete crisis response plan in seconds. Get response templates, stakeholder communication plans, recovery timelines, and monitoring checklists — customized to your situation.</p>

        <div className="glass rounded-2xl p-6 mb-10">
          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Brand or company name</label>
          <input value={brand} onChange={e => setBrand(e.target.value)} placeholder="e.g. PostCraft, your company name..."
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-red-500 transition mb-5" />

          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Crisis type</label>
          <div className="flex flex-wrap gap-2 mb-5">
            {crisisTypes.map(c => (
              <button key={c} onClick={() => setCrisisType(c)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition ${crisisType === c ? 'bg-red-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
                {c}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-5">
            <div>
              <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Primary platform</label>
              <select value={platform} onChange={e => setPlatform(e.target.value)}
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-red-500 transition">
                {platforms.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Industry</label>
              <select value={industry} onChange={e => setIndustry(e.target.value)}
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-red-500 transition">
                {industries.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Severity</label>
              <select value={severity} onChange={e => setSeverity(e.target.value)}
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-red-500 transition">
                {severityLevels.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Describe the situation (optional)</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} placeholder="What happened? Any specific details that would help generate a better response plan..."
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-red-500 transition mb-5 resize-none" />

          <button onClick={generate} disabled={!brand.trim()}
            className="w-full py-3.5 btn-primary rounded-xl font-semibold text-white">
            Generate Crisis Response Plan
          </button>
        </div>

        {result && (
          <div className="space-y-8 fade-in">
            {/* Risk Assessment */}
            <div className="grid md:grid-cols-4 gap-4">
              <div className={`glass rounded-xl p-5 text-center border ${riskBg(result.riskLevel)}`}>
                <p className="text-xs text-zinc-500 uppercase mb-1">Risk Level</p>
                <p className={`text-2xl font-bold uppercase ${riskColor(result.riskLevel)}`}>{result.riskLevel}</p>
                <p className="text-xs text-zinc-400 mt-1">Score: {result.assessmentScore}/100</p>
              </div>
              <div className="glass rounded-xl p-5 text-center">
                <p className="text-xs text-zinc-500 uppercase mb-1">Estimated Reach</p>
                <p className="text-2xl font-bold text-white">{result.estimatedReach.toLocaleString()}</p>
                <p className="text-xs text-zinc-400 mt-1">potential impressions</p>
              </div>
              <div className="glass rounded-xl p-5 text-center">
                <p className="text-xs text-zinc-500 uppercase mb-1">Response Window</p>
                <p className={`text-2xl font-bold ${riskColor(result.riskLevel)}`}>{result.timeToRespond}</p>
                <p className="text-xs text-zinc-400 mt-1">recommended max</p>
              </div>
              <div className="glass rounded-xl p-5 text-center">
                <p className="text-xs text-zinc-500 uppercase mb-1">Actions Required</p>
                <p className="text-2xl font-bold text-white">{result.immediateActions.length}</p>
                <p className="text-xs text-zinc-400 mt-1">{result.immediateActions.filter(a => a.priority === 'now').length} immediate</p>
              </div>
            </div>

            {/* Immediate Actions */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Immediate Action Plan</h3>
              <div className="space-y-2">
                {result.immediateActions.map((action, i) => (
                  <div key={i} className="flex items-center gap-3 bg-zinc-900/50 rounded-xl p-3 border border-zinc-800">
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase shrink-0 ${priorityColor(action.priority)}`}>{action.priority}</span>
                    <p className="text-sm text-zinc-300 flex-1">{action.action}</p>
                    <span className="text-xs text-zinc-500 shrink-0">{action.owner}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Response Templates */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Response Templates</h3>
              <div className="space-y-4">
                {result.responseTemplates.map((tmpl, i) => (
                  <div key={i} className="bg-zinc-900/50 rounded-xl p-5 border border-zinc-800">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-sm font-medium">{tmpl.channel}</p>
                        <p className="text-xs text-zinc-500">Tone: {tmpl.tone}</p>
                      </div>
                      <button onClick={() => copyTemplate(tmpl.template, i)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${copiedIdx === i ? 'bg-green-600 text-white' : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'}`}>
                        {copiedIdx === i ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <pre className="text-sm text-zinc-400 whitespace-pre-wrap font-sans leading-relaxed">{tmpl.template}</pre>
                  </div>
                ))}
              </div>
            </div>

            {/* Stakeholder Communication */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Stakeholder Communication Plan</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-zinc-500 text-xs uppercase">
                      <th className="text-left py-2">Audience</th>
                      <th className="text-left py-2">Key Message</th>
                      <th className="text-left py-2">Channel</th>
                      <th className="text-left py-2">Timing</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.stakeholderPlan.map((row, i) => (
                      <tr key={i} className="border-t border-zinc-800">
                        <td className="py-3 text-zinc-300 font-medium">{row.audience}</td>
                        <td className="py-3 text-zinc-400">{row.message}</td>
                        <td className="py-3 text-zinc-500 text-xs">{row.channel}</td>
                        <td className="py-3 text-red-400 text-xs font-medium">{row.timing}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recovery Timeline */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Recovery Timeline</h3>
              <div className="space-y-4">
                {result.recoveryTimeline.map((phase, i) => (
                  <div key={i} className="bg-zinc-900/50 rounded-xl p-5 border border-zinc-800">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-sm">{phase.phase}</h4>
                      <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded">{phase.duration}</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-zinc-500 uppercase mb-2">Actions</p>
                        <ul className="space-y-1">
                          {phase.actions.map((a, j) => (
                            <li key={j} className="text-xs text-zinc-400 flex gap-2"><span className="text-red-400">&#8226;</span>{a}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500 uppercase mb-2">KPIs</p>
                        <ul className="space-y-1">
                          {phase.kpis.map((k, j) => (
                            <li key={j} className="text-xs text-zinc-400 flex gap-2"><span className="text-green-400">&#10003;</span>{k}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Monitoring Checklist */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Monitoring Checklist</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-zinc-500 text-xs uppercase">
                      <th className="text-left py-2">What to Monitor</th>
                      <th className="text-left py-2">Frequency</th>
                      <th className="text-left py-2">Tool</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.monitoringChecklist.map((item, i) => (
                      <tr key={i} className="border-t border-zinc-800">
                        <td className="py-3 text-zinc-300">{item.item}</td>
                        <td className="py-3 text-zinc-400 text-xs">{item.frequency}</td>
                        <td className="py-3 text-zinc-500 text-xs">{item.tool}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Do's and Don'ts */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass rounded-2xl p-6">
                <h3 className="font-semibold mb-4 text-green-400">Do&apos;s</h3>
                <ul className="space-y-2">
                  {result.doList.map((item, i) => (
                    <li key={i} className="text-sm text-zinc-400 flex gap-2"><span className="text-green-400 shrink-0">&#10003;</span>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="glass rounded-2xl p-6">
                <h3 className="font-semibold mb-4 text-red-400">Don&apos;ts</h3>
                <ul className="space-y-2">
                  {result.dontList.map((item, i) => (
                    <li key={i} className="text-sm text-zinc-400 flex gap-2"><span className="text-red-400 shrink-0">&#10007;</span>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Prevention Tips */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Crisis Prevention Tips</h3>
              <div className="space-y-3">
                {result.preventionTips.map((tip, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="text-red-400 font-bold text-sm mt-0.5">{i + 1}.</span>
                    <p className="text-sm text-zinc-300">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SEO Content */}
        <section className="mt-16 glass rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Social Media Crisis Management Guide</h2>
          <p className="text-zinc-400 mb-4">A social media crisis can damage years of brand building in hours. The difference between brands that survive and those that don&apos;t? Preparation. PostCraft&apos;s Crisis Management Toolkit helps you create a comprehensive response plan before, during, and after any social media crisis.</p>
          <h3 className="text-lg font-semibold mb-3">2026 Crisis Statistics</h3>
          <ul className="space-y-2 text-sm text-zinc-400 mb-6">
            <li className="flex gap-2"><span className="text-red-400">&#10003;</span> 69% of brands experienced a social media crisis in the past 2 years</li>
            <li className="flex gap-2"><span className="text-red-400">&#10003;</span> Brands that respond within 1 hour see 40% less negative sentiment spread</li>
            <li className="flex gap-2"><span className="text-red-400">&#10003;</span> 46% of consumers permanently stop buying from brands after a poorly handled crisis</li>
            <li className="flex gap-2"><span className="text-red-400">&#10003;</span> Companies with a crisis plan recover 3x faster than those without</li>
          </ul>
          <h3 className="text-lg font-semibold mb-3">Types of Social Media Crises</h3>
          <div className="grid md:grid-cols-2 gap-3 mb-6">
            {crisisTypes.map(c => (
              <div key={c} className="bg-zinc-900/50 rounded-lg p-3"><p className="text-sm text-zinc-300">{c}</p></div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-8 glass rounded-2xl p-8">
          <h2 className="text-xl font-bold mb-4">Crisis Management FAQ</h2>
          <div className="space-y-4">
            {[
              ['How fast should I respond to a social media crisis?', 'The golden rule is to respond within 1 hour for high-severity crises. For critical situations (data breaches, safety issues), aim for 15 minutes. Even a simple "We\'re aware and investigating" is better than silence.'],
              ['Should I delete negative comments during a crisis?', 'Almost never. Deleting comments is perceived as censorship and typically amplifies backlash. The only exception is comments that contain threats, hate speech, or private information that could harm individuals.'],
              ['What should I include in my first crisis response?', 'Three things: (1) Acknowledgment that you\'re aware of the issue, (2) Empathy for those affected, and (3) A commitment to investigate and share updates. Avoid assigning blame or making promises you can\'t keep.'],
              ['How do I know when a situation becomes a crisis?', 'Key indicators: sudden spike in negative mentions (2x or more above baseline), mainstream media pickup, trending hashtags about your brand, customer support volume spike, or influencer/celebrity involvement.'],
              ['What role does social listening play in crisis prevention?', 'Social listening is your early warning system. By monitoring sentiment trends, mention velocity, and emerging narratives, you can detect potential crises 24-48 hours before they reach critical mass — giving you time to prepare.'],
            ].map(([q, a]) => (
              <div key={q}>
                <h3 className="font-medium text-sm mb-1">{q}</h3>
                <p className="text-xs text-zinc-500">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal Links */}
        <section className="mt-8 text-center">
          <p className="text-sm text-zinc-500 mb-3">Related Tools</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              ['/social-listening', 'Social Listening'],
              ['/sentiment-analyzer', 'Sentiment Analyzer'],
              ['/brand-voice', 'Brand Voice'],
              ['/competitor-analysis', 'Competitor Analysis'],
              ['/content-calendar', 'Content Calendar'],
              ['/engagement-calculator', 'Engagement Calculator'],
            ].map(([href, label]) => (
              <a key={href} href={href} className="text-xs text-red-400 hover:text-red-300 transition underline underline-offset-2">{label}</a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
