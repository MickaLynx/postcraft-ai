'use client';
import { useState } from 'react';

const teamSizes = ['2-3 People', '4-8 People', '9-20 People', '20-50 People', '50+ People'] as const;
const workflows = ['Centralized (1 approver)', 'Distributed (multiple owners)', 'Hybrid (teams + central review)', 'Agile Sprints', 'Kanban Flow'] as const;
const contentVolumes = ['5-10 pieces/week', '10-25 pieces/week', '25-50 pieces/week', '50-100 pieces/week', '100+ pieces/week'] as const;
const challenges = ['Approval Bottlenecks', 'Inconsistent Brand Voice', 'Missed Deadlines', 'Duplicate Work', 'Poor Communication', 'No Clear Ownership'] as const;

interface RoleDefinition { role: string; responsibilities: string; approvalAuth: string; tools: string; kpis: string; timeAllocation: string; }
interface WorkflowStage { stage: string; owner: string; duration: string; input: string; output: string; qualityGate: string; automatable: string; }
interface CollabFramework { framework: string; bestFor: string; structure: string; pros: string; cons: string; tools: string; }
interface ConflictResolution { scenario: string; trigger: string; resolution: string; prevention: string; escalation: string; }
interface EfficiencyGain { area: string; currentState: string; optimizedState: string; timeSaved: string; implementation: string; }

interface CollabReport {
  roles: RoleDefinition[];
  workflowStages: WorkflowStage[];
  frameworks: CollabFramework[];
  conflictResolutions: ConflictResolution[];
  efficiencyGains: EfficiencyGain[];
  communicationRules: string[];
  meetingCadence: string[];
  toolStack: string[];
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }

function buildCollabHub(teamSize: string, workflow: string, volume: string, challenge: string, brand: string): CollabReport {
  const seed = hash(`${teamSize}-${workflow}-${volume}-${challenge}-${brand}`);

  const roles: RoleDefinition[] = [
    { role: 'Content Strategist', responsibilities: 'Content calendar, topic selection, audience research, performance analysis, strategy pivots', approvalAuth: 'Final say on what gets created and when — owns the editorial calendar', tools: 'PostCraft Content Calendar + Analytics dashboard', kpis: 'Content output vs. plan (>90%), topic performance hit rate (>60%)', timeAllocation: '30% strategy, 30% analysis, 20% coordination, 20% creation' },
    { role: 'Content Creator', responsibilities: 'Writing, designing, recording — the actual content production', approvalAuth: 'Self-approves drafts for review, no final publish authority', tools: 'PostCraft AI tools + design tools (Canva/Figma) + video tools', kpis: 'Pieces per week, on-brief rate (>85%), revision rounds (<2 avg)', timeAllocation: '70% creation, 15% research, 10% revisions, 5% meetings' },
    { role: 'Editor / Brand Guardian', responsibilities: 'Quality control, brand voice consistency, fact-checking, final polish', approvalAuth: 'Can block publication — quality gatekeeper', tools: 'PostCraft Brand Voice Analyzer + style guide + grammar tools', kpis: 'Review turnaround (<4h), consistency score (>90%), error catch rate', timeAllocation: '50% reviewing, 20% style guide updates, 20% coaching creators, 10% meetings' },
    { role: 'Distribution Manager', responsibilities: 'Scheduling, cross-platform formatting, community engagement, amplification', approvalAuth: 'Owns publish timing and platform-specific adaptations', tools: 'PostCraft Social Simulator + scheduling tools + analytics', kpis: 'On-time publish rate (>95%), platform-specific engagement, response time (<1h)', timeAllocation: '30% scheduling, 30% community management, 20% analytics, 20% optimization' },
    { role: 'Content Ops Lead', responsibilities: 'Workflow management, tool administration, process optimization, team coordination', approvalAuth: 'Can change workflows and processes — operational authority', tools: 'Project management (Notion/Asana) + PostCraft Velocity Tracker', kpis: 'Workflow efficiency score, bottleneck reduction, team satisfaction', timeAllocation: '40% process optimization, 30% coordination, 20% reporting, 10% tooling' },
  ];

  const workflowStages: WorkflowStage[] = [
    { stage: 'Ideation & Brief', owner: 'Content Strategist', duration: '1-2 hours per brief', input: 'Content calendar, audience data, trending topics, brand priorities', output: 'Detailed content brief with topic, angle, audience, format, CTA, references', qualityGate: 'Brief must include: target audience, key message, desired action, success metric', automatable: 'Topic suggestions (AI), trending topic alerts, brief templates — save ~40% of ideation time' },
    { stage: 'Assignment & Planning', owner: 'Content Ops Lead', duration: '30 min per batch', input: 'Approved briefs, creator availability, skill match', output: 'Assigned tasks with deadlines, creator confirmed, resources shared', qualityGate: 'Creator confirms understanding of brief — no silent assignments', automatable: 'Auto-assignment based on skill tags + availability calendar — eliminate manual matching' },
    { stage: 'Creation & Drafting', owner: 'Content Creator', duration: `${1 + seed % 4}h per piece (varies by format)`, input: 'Content brief, brand guidelines, reference materials, templates', output: 'First draft in correct format, ready for review', qualityGate: 'Self-review checklist: on-brief, brand voice, no factual errors, CTA included', automatable: 'AI first drafts, template auto-fill, image generation — reduce creation time by 30-50%' },
    { stage: 'Review & Approval', owner: 'Editor / Brand Guardian', duration: `Target: <${2 + seed % 3}h turnaround`, input: 'Draft content, style guide, brand voice parameters', output: 'Approved content or specific revision requests (max 2 rounds)', qualityGate: 'Revision requests must be specific and actionable — no vague "make it better"', automatable: 'AI brand voice check, grammar/style auto-scan, approval routing — cut review time 40%' },
    { stage: 'Formatting & Scheduling', owner: 'Distribution Manager', duration: '15-30 min per piece', input: 'Approved content, platform specs, optimal timing data', output: 'Platform-formatted content scheduled at optimal times', qualityGate: 'Preview on each platform before scheduling — formatting issues caught early', automatable: 'Auto-formatting per platform, AI timing optimization, bulk scheduling — nearly fully automatable' },
    { stage: 'Publish & Engage', owner: 'Distribution Manager', duration: 'Ongoing (first 2h critical)', input: 'Published content, community guidelines, response templates', output: 'Engaged community, monitored comments, escalated issues', qualityGate: 'First response within 30 min, all comments addressed within 2h', automatable: 'Comment sorting by priority, response suggestions, sentiment alerts — reduce manual monitoring 50%' },
    { stage: 'Analyze & Learn', owner: 'Content Strategist', duration: '2h weekly review', input: 'Performance data across all platforms, engagement metrics, conversion data', output: 'Weekly performance report, insights for next cycle, strategy adjustments', qualityGate: 'Insights must be actionable — "engagement was low" is not insight, "short-form video outperformed carousels 3:1" is', automatable: 'Auto-generated weekly reports, anomaly detection, format performance comparison — save 60% of analysis time' },
  ];

  const frameworks: CollabFramework[] = [
    { framework: 'Content Sprint (2-week cycles)', bestFor: 'Teams of 4-15 doing 10-50 pieces/week', structure: 'Sprint planning (Monday) → Daily standups (15 min) → Creation blocks (Tue-Thu) → Review Friday → Retro bi-weekly', pros: 'Predictable output, clear deadlines, built-in improvement cycles', cons: 'Less flexible for reactive content (trending topics, news)', tools: 'Sprint board (Notion/Asana) + PostCraft tools + Slack for async updates' },
    { framework: 'Kanban Content Flow', bestFor: 'Teams handling variable volume or reactive content', structure: 'WIP limits per stage → Pull-based (creators pull next brief when ready) → Daily board review → Weekly flow metrics', pros: 'Flexible, visual, handles variable workload well, easy to spot bottlenecks', cons: 'Can lack urgency without deadlines, needs discipline on WIP limits', tools: 'Kanban board (Trello/Notion) + WIP limit alerts + PostCraft Velocity Tracker' },
    { framework: 'Pod Model (Cross-functional teams)', bestFor: 'Large teams (20+) with multiple brands or product lines', structure: 'Self-contained pods (strategist + creator + editor) → Pod owns end-to-end → Central brand review for consistency', pros: 'Fast execution, ownership, less coordination overhead, scalable', cons: 'Risk of brand inconsistency between pods, resource duplication', tools: 'Pod-specific channels + shared brand guidelines + PostCraft Brand Guardian' },
    { framework: 'Assembly Line (Specialized stages)', bestFor: 'High-volume content factories (50+ pieces/week)', structure: 'Specialized roles per stage → Content moves through pipeline → QA gates between stages → Metrics per stage', pros: 'Maximum throughput, consistent quality, easy to scale individual stages', cons: 'Less creative ownership, can feel factory-like, single point of failure per stage', tools: 'Stage-based workflow tool + SLAs per stage + PostCraft Content Workflow Builder' },
  ];

  const conflictResolutions: ConflictResolution[] = [
    { scenario: 'Creator disagrees with editorial feedback', trigger: 'Subjective feedback like "I don\'t like the tone" without specific guidance', resolution: 'Editor must reference specific brand guideline or metric — if it\'s preference not guideline, creator\'s voice wins', prevention: 'Clear style guide with examples of "this, not that" — reduces subjective feedback by 80%', escalation: 'If unresolved after 1 round, Content Strategist makes final call within 2 hours' },
    { scenario: 'Missed deadline causing cascade delays', trigger: 'Creator, reviewer, or approver misses their SLA', resolution: 'Immediate notification to next-in-line + Ops Lead assesses: can we fast-track or reschedule?', prevention: 'Buffer days between creation deadline and publish date — never schedule creation and publish same day', escalation: 'Ops Lead reassigns if blocker is person-dependent, adjusts calendar if systemic' },
    { scenario: 'Two teams want the same publish slot', trigger: 'Product launch conflicts with planned content, or two campaigns overlap', resolution: 'Audience impact score decides — which piece drives more business value this week?', prevention: 'Quarterly content calendar review with all stakeholders — flag conflicts 2+ weeks ahead', escalation: 'Content Strategist arbitrates based on business priorities, VP/Director if equal priority' },
    { scenario: 'Brand voice inconsistency across creators', trigger: 'Different creators produce content that feels like different brands', resolution: 'Immediate brand voice audit + coaching session, not punishment', prevention: 'Monthly brand voice calibration session — review 5 pieces together, align on what "good" looks like', escalation: 'Editor creates creator-specific style notes, flagged content gets extra review round' },
    { scenario: 'Scope creep on content briefs', trigger: '"Can we also add X?" after creation has started', resolution: 'If change is <15 min work, creator decides. If >15 min, it\'s a new brief with a new deadline', prevention: 'Brief sign-off step — once signed, changes go through formal request', escalation: 'Ops Lead tracks scope creep frequency — if chronic, process review with requesting team' },
  ];

  const efficiencyGains: EfficiencyGain[] = [
    { area: 'Brief-to-Draft Time', currentState: `${3 + seed % 5} days average`, optimizedState: '1-2 days with templates + AI assist', timeSaved: `${2 + seed % 3} days per piece`, implementation: 'Create 10 brief templates + connect PostCraft AI for first draft generation' },
    { area: 'Review Turnaround', currentState: `${24 + seed % 48}h average`, optimizedState: '2-4 hours with structured review', timeSaved: `${12 + seed % 24}h per piece`, implementation: 'Implement review SLA + checklist-based review (not open-ended) + AI pre-scan' },
    { area: 'Cross-Platform Formatting', currentState: `${20 + seed % 30} min manual per platform`, optimizedState: '5 min with auto-formatting tools', timeSaved: `${15 + seed % 25} min per piece per platform`, implementation: 'Use PostCraft Cross-Platform Adapter + platform-specific templates' },
    { area: 'Status Communication', currentState: `${3 + seed % 5} Slack messages per piece asking "where is this?"`, optimizedState: 'Zero — dashboard shows real-time status', timeSaved: `${2 + seed % 3}h/week team-wide`, implementation: 'Shared Kanban board with auto-status updates + daily async standup bot' },
    { area: 'Performance Reporting', currentState: `${2 + seed % 3}h weekly manual data pull`, optimizedState: '15 min automated report review', timeSaved: `${1.5 + seed % 2}h per week`, implementation: 'Auto-generated weekly report pulling from all platforms + PostCraft analytics' },
  ];

  const communicationRules = [
    'Async by default, sync by exception — most content collaboration does NOT need a meeting',
    'All feedback in the tool, never in DMs — if it\'s not in the workflow tool, it didn\'t happen',
    'Feedback must be specific and actionable: "Change headline to focus on benefit X" not "make it more engaging"',
    'Response SLAs: Urgent (2h), Standard (same business day), FYI (48h) — label everything',
    'Weekly content standup: 15 min max, 3 questions: what shipped, what\'s blocked, what\'s next',
    'No "reply-all" brainstorms — use dedicated ideation sessions with timeboxed structure',
    'Celebrate wins publicly — share top-performing content with the whole team weekly',
    'Retrospectives monthly: what worked, what didn\'t, one process change to try next month',
  ];

  const meetingCadence = [
    `Monday: Sprint/week planning (30 min) — Content Strategist leads, assign briefs for the week`,
    `Daily: Async standup in Slack/tool (5 min write-up) — blockers only need a sync call`,
    `Wednesday: Mid-week check-in (15 min, optional) — only if blockers exist from async updates`,
    `Friday: Content review + scheduling confirmation (30 min) — Editor + Distribution Manager`,
    `Bi-weekly: Retrospective (30 min) — whole content team, 1 process improvement per retro`,
    `Monthly: Performance deep-dive (45 min) — Content Strategist presents, team discusses pivots`,
    `Quarterly: Content strategy review (2h) — align with business goals, plan next quarter themes`,
  ];

  const toolStack = [
    `Content Planning: PostCraft Content Calendar + Notion/Asana for project management`,
    `Creation: PostCraft AI suite (hooks, captions, threads, video scripts) + Canva/Figma for design`,
    `Review: PostCraft Brand Voice Analyzer + Grammarly/style checker + structured review templates`,
    `Scheduling: PostCraft Social Simulator for timing + Buffer/Hootsuite for multi-platform publish`,
    `Communication: Slack (async) + Loom (async video feedback) + workflow tool comments (primary)`,
    `Analytics: PostCraft engagement tools + platform native analytics + Google Analytics for web traffic`,
    `Knowledge: Shared drive for brand assets, style guides, templates — single source of truth`,
    `Automation: Zapier/Make for workflow triggers (brief approved → auto-assign, content approved → auto-schedule)`,
  ];

  return { roles, workflowStages, frameworks, conflictResolutions, efficiencyGains, communicationRules, meetingCadence, toolStack };
}

export default function ContentCollab() {
  const [teamSize, setTeamSize] = useState('');
  const [workflow, setWorkflow] = useState('');
  const [volume, setVolume] = useState('');
  const [challenge, setChallenge] = useState('');
  const [brand, setBrand] = useState('');
  const [report, setReport] = useState<CollabReport | null>(null);

  const generate = () => { if (teamSize && workflow && volume && challenge && brand) setReport(buildCollabHub(teamSize, workflow, volume, challenge, brand)); };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950/30 to-gray-950 text-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <nav className="mb-8"><a href="/" className="text-blue-400 hover:text-blue-300 transition">← Back to PostCraft AI</a></nav>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">Content Collaboration Hub</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">Design the perfect content team workflow. Get role definitions, collaboration frameworks, conflict resolution playbooks, and efficiency optimization for your team size.</p>
        </div>

        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 mb-10">
          <div className="grid md:grid-cols-2 gap-6">
            <div><label className="block text-sm text-gray-400 mb-2">Team Size *</label><select className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white" value={teamSize} onChange={e => setTeamSize(e.target.value)}><option value="">Select size...</option>{teamSizes.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
            <div><label className="block text-sm text-gray-400 mb-2">Current Workflow *</label><select className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white" value={workflow} onChange={e => setWorkflow(e.target.value)}><option value="">Select workflow...</option>{workflows.map(w => <option key={w} value={w}>{w}</option>)}</select></div>
            <div><label className="block text-sm text-gray-400 mb-2">Content Volume *</label><select className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white" value={volume} onChange={e => setVolume(e.target.value)}><option value="">Select volume...</option>{contentVolumes.map(v => <option key={v} value={v}>{v}</option>)}</select></div>
            <div><label className="block text-sm text-gray-400 mb-2">Biggest Challenge *</label><select className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white" value={challenge} onChange={e => setChallenge(e.target.value)}><option value="">Select challenge...</option>{challenges.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
            <div className="md:col-span-2"><label className="block text-sm text-gray-400 mb-2">Brand / Company Name *</label><input className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white" placeholder="e.g. PostCraft AI" value={brand} onChange={e => setBrand(e.target.value)} /></div>
          </div>
          <button onClick={generate} className="mt-6 w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold py-3 px-6 rounded-xl transition-all">Build My Collaboration Hub</button>
        </div>

        {report && (
          <div className="space-y-10">
            {/* Roles */}
            <section className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-blue-300">Team Role Definitions</h2>
              <div className="space-y-4">
                {report.roles.map((r, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <h3 className="text-lg font-bold text-white mb-3">{r.role}</h3>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div><span className="text-gray-400">Responsibilities:</span> <span className="text-white">{r.responsibilities}</span></div>
                      <div><span className="text-gray-400">Authority:</span> <span className="text-cyan-300">{r.approvalAuth}</span></div>
                      <div><span className="text-gray-400">KPIs:</span> <span className="text-green-300">{r.kpis}</span></div>
                      <div><span className="text-gray-400">Time Split:</span> <span className="text-white">{r.timeAllocation}</span></div>
                      <div className="md:col-span-2"><span className="text-gray-400">Tools:</span> <span className="text-purple-300">{r.tools}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Workflow Stages */}
            <section className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-cyan-300">Content Workflow Pipeline</h2>
              <div className="space-y-4">
                {report.workflowStages.map((w, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm font-semibold">Stage {i + 1}</span>
                      <h3 className="font-bold text-white">{w.stage}</h3>
                      <span className="text-gray-400 text-sm ml-auto">{w.owner} · {w.duration}</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-2 text-sm">
                      <div><span className="text-gray-400">Input:</span> <span className="text-white">{w.input}</span></div>
                      <div><span className="text-gray-400">Output:</span> <span className="text-white">{w.output}</span></div>
                      <div><span className="text-gray-400">Quality gate:</span> <span className="text-yellow-300">{w.qualityGate}</span></div>
                      <div><span className="text-gray-400">Automate:</span> <span className="text-green-300">{w.automatable}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Frameworks */}
            <section className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-teal-300">Collaboration Frameworks</h2>
              <div className="space-y-4">
                {report.frameworks.map((f, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <h3 className="text-lg font-bold text-white mb-1">{f.framework}</h3>
                    <p className="text-sm text-teal-300 mb-3">Best for: {f.bestFor}</p>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div className="md:col-span-2"><span className="text-gray-400">Structure:</span> <span className="text-white">{f.structure}</span></div>
                      <div><span className="text-green-300">Pros:</span> <span className="text-white">{f.pros}</span></div>
                      <div><span className="text-red-300">Cons:</span> <span className="text-white">{f.cons}</span></div>
                      <div className="md:col-span-2"><span className="text-gray-400">Tools:</span> <span className="text-purple-300">{f.tools}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Conflict Resolution */}
            <section className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-orange-300">Conflict Resolution Playbook</h2>
              <div className="space-y-4">
                {report.conflictResolutions.map((c, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <h3 className="font-bold text-white mb-3">{c.scenario}</h3>
                    <div className="grid md:grid-cols-2 gap-2 text-sm">
                      <div><span className="text-red-300">Trigger:</span> <span className="text-white">{c.trigger}</span></div>
                      <div><span className="text-green-300">Resolution:</span> <span className="text-white">{c.resolution}</span></div>
                      <div><span className="text-blue-300">Prevention:</span> <span className="text-white">{c.prevention}</span></div>
                      <div><span className="text-yellow-300">Escalation:</span> <span className="text-white">{c.escalation}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Efficiency Gains */}
            <section className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-emerald-300">Efficiency Gains</h2>
              <div className="space-y-4">
                {report.efficiencyGains.map((e, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <h3 className="font-bold text-white mb-2">{e.area}</h3>
                    <div className="grid md:grid-cols-2 gap-2 text-sm">
                      <div><span className="text-red-300">Current:</span> <span className="text-white">{e.currentState}</span></div>
                      <div><span className="text-green-300">Optimized:</span> <span className="text-white">{e.optimizedState}</span></div>
                      <div><span className="text-cyan-300">Time saved:</span> <span className="text-white">{e.timeSaved}</span></div>
                      <div><span className="text-purple-300">How:</span> <span className="text-white">{e.implementation}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Communication Rules */}
            <section className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-violet-300">Communication Rules</h2>
              <ul className="space-y-2">{report.communicationRules.map((r, i) => <li key={i} className="text-gray-300 flex gap-2"><span className="text-violet-400">→</span>{r}</li>)}</ul>
            </section>

            {/* Meeting Cadence */}
            <section className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-indigo-300">Meeting Cadence</h2>
              <ul className="space-y-2">{report.meetingCadence.map((m, i) => <li key={i} className="text-gray-300 flex gap-2"><span className="text-indigo-400">→</span>{m}</li>)}</ul>
            </section>

            {/* Tool Stack */}
            <section className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-pink-300">Recommended Tool Stack</h2>
              <ul className="space-y-2">{report.toolStack.map((t, i) => <li key={i} className="text-gray-300 flex gap-2"><span className="text-pink-400">→</span>{t}</li>)}</ul>
            </section>

            <div className="text-center py-8"><p className="text-gray-500 text-sm">Generated by PostCraft AI — Content Collaboration Hub</p></div>
          </div>
        )}
      </div>
    </main>
  );
}
