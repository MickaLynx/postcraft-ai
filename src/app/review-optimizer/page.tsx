'use client';
import { useState } from 'react';

const teamSizes = ['Solo + Client', '2-3 Reviewers', '4-6 Reviewers', '7-15 Reviewers', '15+ (Enterprise)'] as const;
const contentTypes = ['Blog Posts', 'Social Media', 'Video Content', 'Email Campaigns', 'Advertising', 'All Content'] as const;
const reviewChallenges = ['Too Many Revision Rounds', 'Slow Approval Times', 'Unclear Feedback', 'Stakeholder Overload', 'Brand Inconsistency', 'All Challenges'] as const;
const industries = ['Tech & SaaS', 'E-commerce', 'Healthcare', 'Finance', 'Education', 'Agency', 'Legal', 'Media'] as const;

interface ReviewBottleneck { stage: string; avgTime: string; idealTime: string; revisionRounds: number; cause: string; fix: string; timeSaved: string; }
interface FeedbackPattern { pattern: string; frequency: string; impact: string; root: string; prevention: string; example: string; }
interface WorkflowStep { step: number; name: string; owner: string; sla: string; automate: string; checklist: string; }
interface ApprovalMetric { metric: string; current: string; target: string; gap: string; action: string; }
interface StakeholderGuide { role: string; reviewFocus: string; avoid: string; feedbackFormat: string; slaExpectation: string; }

interface ReviewReport {
  reviewEfficiency: number;
  avgRevisionRounds: number;
  avgApprovalTime: string;
  bottlenecks: ReviewBottleneck[];
  feedbackPatterns: FeedbackPattern[];
  workflow: WorkflowStep[];
  metrics: ApprovalMetric[];
  stakeholderGuides: StakeholderGuide[];
  speedTips: string[];
  qualityChecklist: string[];
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }

function optimizeReview(team: string, content: string, challenge: string, industry: string, brand: string): ReviewReport {
  const seed = hash(`${team}-${content}-${challenge}-${industry}-${brand}`);
  const reviewEfficiency = 20 + seed % 65;
  const avgRevisionRounds = 2 + seed % 4;
  const avgApprovalTime = `${1 + seed % 4} days`;

  const bottlenecks: ReviewBottleneck[] = [
    { stage: 'Brief-to-Draft Handoff', avgTime: `${2 + seed % 3} days`, idealTime: '4-8 hours', revisionRounds: 0, cause: 'Briefs are vague — "make it pop" is not actionable feedback', fix: 'Use structured briefs with: goal, audience, tone, key messages, CTA, and reference examples', timeSaved: '1-2 days per piece' },
    { stage: 'First Review Round', avgTime: `${1 + seed % 3} days`, idealTime: '4-8 hours', revisionRounds: 1, cause: `${seed % 2 === 0 ? 'Reviewer rewrites instead of providing actionable edits' : 'Multiple reviewers give conflicting feedback'}`, fix: `${seed % 2 === 0 ? 'Train reviewers to comment, not rewrite — "make the opening more urgent" > rewriting it' : 'Designate 1 primary reviewer per content type — others provide optional input only'}`, timeSaved: '0.5-1 day per piece' },
    { stage: 'Revision Loop', avgTime: `${1 + seed % 2} days per round`, idealTime: '2-4 hours per round', revisionRounds: avgRevisionRounds - 1, cause: 'No clear "good enough" standard — perfectionism disguised as quality', fix: 'Define "publish-ready" criteria: brand check pass, no factual errors, CTA present, a11y pass — done', timeSaved: '1-3 days per piece (eliminating extra rounds)' },
    { stage: 'Legal/Compliance Review', avgTime: `${2 + seed % 4} days`, idealTime: '24 hours', revisionRounds: seed % 2, cause: 'Legal reviews everything instead of risk-based triage', fix: 'Create risk tiers: Tier 1 (claims, pricing) = legal review. Tier 2 (educational) = brand check only', timeSaved: '1-3 days per piece' },
    { stage: 'Final Approval', avgTime: `${1 + seed % 2} days`, idealTime: '2-4 hours', revisionRounds: 0, cause: 'Final approver is a bottleneck — too busy, too important, or just slow', fix: 'Set 24-hour auto-approval with notification — if not reviewed, it publishes automatically', timeSaved: '0.5-1 day per piece' },
  ];

  const feedbackPatterns: FeedbackPattern[] = [
    { pattern: 'Subjective Tone Feedback', frequency: `${30 + seed % 25}% of all feedback`, impact: 'Creates 1-2 extra revision rounds per piece', root: 'No documented tone guidelines — reviewers apply personal preference', prevention: 'Create a tone spectrum document with examples for each channel and content type', example: 'Instead of "make it more engaging" → "add a question hook in the first sentence and a data point in paragraph 2"' },
    { pattern: 'Scope Creep via Review', frequency: `${15 + seed % 20}% of reviews`, impact: 'Turns a 500-word blog edit into a complete rewrite', root: 'Reviewer adds new ideas during review instead of during briefing', prevention: 'Rule: reviews are for fixing, not adding. New ideas go in the backlog for the next piece', example: 'Reviewer: "Can we also add a section about X?" → "Great idea — let\'s make that a separate post"' },
    { pattern: 'Contradictory Feedback', frequency: `${10 + seed % 15}% of multi-reviewer situations`, impact: 'Writer freezes — doesn\'t know which feedback to follow', root: 'Too many reviewers with equal authority', prevention: '1 primary reviewer decides. Others provide advisory comments marked as "optional"', example: 'Reviewer A: "Make it shorter" + Reviewer B: "Add more detail" → Primary reviewer decides which' },
    { pattern: 'Late-Stage Direction Changes', frequency: `${5 + seed % 10}% of pieces`, impact: 'Complete restart — days of work discarded', root: 'Stakeholder wasn\'t involved in brief approval — sees draft for first time at review', prevention: 'Brief sign-off before writing starts — 15 min brief review saves days of rework', example: 'CMO at final review: "Actually, let\'s target a different audience" → Brief sign-off would have caught this' },
    { pattern: 'Formatting Nitpicks', frequency: `${20 + seed % 20}% of feedback`, impact: 'Wastes review time on things automation should handle', root: 'No automated formatting/style checks before human review', prevention: 'Run automated checks first: spelling, grammar, brand terms, formatting — humans review strategy and voice', example: 'Reviewer spending 10 min fixing Oxford commas → auto-linter catches this in 2 seconds' },
  ];

  const workflow: WorkflowStep[] = [
    { step: 1, name: 'Brief Creation & Approval', owner: 'Content Manager', sla: '2-4 hours', automate: 'Brief template auto-fills from content calendar — pre-populates audience, goal, tone', checklist: 'Goal defined, audience specified, tone selected, key messages listed, CTA decided, references attached' },
    { step: 2, name: 'Draft Creation', owner: 'Writer / Creator', sla: '1-2 days', automate: 'AI-assisted first draft from brief — writer edits and adds voice', checklist: 'Matches brief requirements, brand terminology used, CTA included, sources cited' },
    { step: 3, name: 'Automated Pre-Check', owner: 'System', sla: '< 1 minute', automate: 'Auto-run: spelling, grammar, brand terms, tone analysis, accessibility, plagiarism', checklist: 'All automated checks pass — no human time wasted on fixable issues' },
    { step: 4, name: 'Primary Review', owner: 'Designated Reviewer', sla: '4-8 hours', automate: 'Reviewer gets pre-checked draft with automated scores — focuses only on strategy and voice', checklist: 'Strategy aligned, voice on-brand, key messages clear, CTA effective, no legal red flags' },
    { step: 5, name: 'Revision (if needed)', owner: 'Writer', sla: '2-4 hours', automate: 'Reviewer feedback auto-categorized: Must Fix / Should Fix / Optional', checklist: 'All "Must Fix" items addressed, "Should Fix" considered, response to each comment' },
    { step: 6, name: 'Final Approval & Publish', owner: 'Content Manager', sla: '2-4 hours (auto-approve at 24h)', automate: 'Auto-schedule for optimal posting time — auto-approve if no objection within SLA', checklist: 'All checks pass, reviewer approved, metadata complete, scheduled for optimal time' },
  ];

  const metrics: ApprovalMetric[] = [
    { metric: 'Brief-to-Publish Time', current: `${3 + seed % 7} days`, target: '1-2 days', gap: `${1 + seed % 5} days over target`, action: 'Reduce revision rounds from ' + avgRevisionRounds + ' to 1 with better briefs and pre-checks' },
    { metric: 'Revision Rounds per Piece', current: `${avgRevisionRounds} rounds`, target: '1 round max', gap: `${avgRevisionRounds - 1} extra rounds`, action: 'Implement "one draft, one review" rule with structured feedback format' },
    { metric: 'Reviewer Response Time', current: `${12 + seed % 36} hours`, target: '< 8 hours', gap: `${seed % 28 + 4} hours over SLA`, action: 'Set auto-escalation at 8 hours — auto-approve at 24 hours' },
    { metric: 'Feedback Clarity Score', current: `${30 + seed % 40}/100`, target: '80/100', gap: 'Vague feedback causing unnecessary revision loops', action: 'Require structured feedback: what to change, why, and specific suggestion' },
    { metric: 'First-Time Approval Rate', current: `${15 + seed % 35}%`, target: '60%+', gap: `${45 - seed % 20}% of pieces require revision`, action: 'Better briefs + pre-checks would make 60%+ of pieces approval-ready on first submit' },
    { metric: 'Content Waste Rate', current: `${5 + seed % 15}% of content never published`, target: '< 2%', gap: 'Content killed during review — wasted writer time', action: 'Brief sign-off before writing prevents late-stage kills' },
  ];

  const stakeholderGuides: StakeholderGuide[] = [
    { role: 'Content Creator / Writer', reviewFocus: 'Implement feedback, push back on unclear requests', avoid: 'Making changes without understanding the "why"', feedbackFormat: 'Respond to each comment with action taken or reason for not implementing', slaExpectation: 'Submit draft within 1-2 days of brief approval' },
    { role: 'Primary Reviewer / Editor', reviewFocus: 'Strategy alignment, voice consistency, CTA effectiveness', avoid: 'Rewriting the piece, formatting nitpicks (automation handles these)', feedbackFormat: 'Categorize each comment as Must Fix / Should Fix / Optional with specific suggestion', slaExpectation: 'Complete review within 8 hours of submission' },
    { role: 'Subject Matter Expert', reviewFocus: 'Factual accuracy, technical correctness only', avoid: 'Tone or style feedback (outside their expertise)', feedbackFormat: 'Flag only factual errors with correction and source', slaExpectation: 'Complete review within 24 hours — optional input only' },
    { role: 'Legal / Compliance', reviewFocus: 'Claims substantiation, regulatory compliance, risk assessment', avoid: 'Marketing effectiveness or creative feedback', feedbackFormat: 'Flag with regulation reference and required action', slaExpectation: 'Tier 1 (high-risk) within 24 hours, Tier 2 skips legal review' },
    { role: 'Final Approver / Stakeholder', reviewFocus: 'Strategic alignment with business goals — high-level only', avoid: 'Word-level edits, tone preferences, rewriting', feedbackFormat: 'Approve, approve with 1-2 strategic notes, or flag strategic misalignment only', slaExpectation: '24 hours — auto-approval if no response' },
  ];

  const speedTips = [
    'Invest 30 minutes in a detailed brief to save 3 days of revision — the brief is the most valuable document',
    'Run automated pre-checks before human review — catch 80% of issues in seconds instead of hours',
    'One primary reviewer per content type — multiple reviewers create contradictions and delays',
    'Structured feedback only: what to change + why + specific suggestion. "Make it better" is not feedback.',
    'Set auto-approval timers — content should never wait more than 24h for a review',
    'Brief sign-off before writing starts — 15 min review of the brief prevents days of rework on the draft',
    'Separate "must fix" from "nice to have" — only must-fix items require revision',
    'Review in batches — 30 min reviewing 5 pieces is more efficient than 5 separate 10-min sessions',
  ];

  const qualityChecklist = [
    'Does the content match the brief? (goal, audience, tone, key messages, CTA)',
    'Brand terminology check — all product names and terms match the approved glossary',
    'Tone consistency — matches the channel-specific tone spectrum',
    'Claims substantiation — every superlative/comparative has a source',
    'CTA is clear, compelling, and matches the conversion goal',
    'Accessibility — alt text on images, captions on video, sufficient contrast',
    'No competitor names used (unless approved comparison content)',
    'Metadata complete — title, description, tags, scheduled time',
  ];

  return { reviewEfficiency, avgRevisionRounds, avgApprovalTime, bottlenecks, feedbackPatterns, workflow, metrics, stakeholderGuides, speedTips, qualityChecklist };
}

export default function ReviewOptimizerPage() {
  const [team, setTeam] = useState(teamSizes[0]);
  const [content, setContent] = useState(contentTypes[0]);
  const [challenge, setChallenge] = useState(reviewChallenges[0]);
  const [industry, setIndustry] = useState(industries[0]);
  const [brand, setBrand] = useState('');
  const [result, setResult] = useState<ReviewReport | null>(null);

  const handleGenerate = () => { if (brand.trim()) setResult(optimizeReview(team, content, challenge, industry, brand)); };
  const scoreColor = (n: number) => n >= 70 ? '#34d399' : n >= 50 ? '#a3e635' : n >= 30 ? '#fbbf24' : '#f87171';

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Content Review Optimizer</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Kill the revision loop. Optimize your content review process — find bottlenecks, fix feedback patterns, build efficient workflows, and set clear stakeholder guidelines. Publish faster without sacrificing quality.</p>
        <div className="mb-4"><label className="block text-sm text-zinc-400 mb-1">Brand / Team</label><input type="text" value={brand} onChange={e => setBrand(e.target.value)} placeholder="e.g., PostCraft, your team" className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-3 text-zinc-100" /></div>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {([{ label: 'Review Team Size', value: team, setter: setTeam as (v: string) => void, options: teamSizes as readonly string[] }, { label: 'Content Type', value: content, setter: setContent as (v: string) => void, options: contentTypes as readonly string[] }, { label: 'Biggest Challenge', value: challenge, setter: setChallenge as (v: string) => void, options: reviewChallenges as readonly string[] }, { label: 'Industry', value: industry, setter: setIndustry as (v: string) => void, options: industries as readonly string[] }] as const).map(({ label, value, setter, options }) => (<div key={label}><label className="block text-sm text-zinc-400 mb-1">{label}</label><select value={value} onChange={e => setter(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100">{options.map(o => <option key={o} value={o}>{o}</option>)}</select></div>))}
        </div>
        <button onClick={handleGenerate} className="w-full md:w-auto bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded font-semibold hover:opacity-90 transition mb-8">Optimize Review Process</button>
        {result && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 text-center"><div className="text-4xl font-bold mb-1" style={{ color: scoreColor(result.reviewEfficiency) }}>{result.reviewEfficiency}%</div><div className="text-zinc-400 text-sm">Review Efficiency</div></div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 text-center"><div className="text-4xl font-bold mb-1 text-amber-400">{result.avgRevisionRounds}</div><div className="text-zinc-400 text-sm">Avg Revision Rounds</div></div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 text-center"><div className="text-4xl font-bold mb-1 text-red-400">{result.avgApprovalTime}</div><div className="text-zinc-400 text-sm">Avg Approval Time</div></div>
            </div>
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6"><h3 className="text-xl font-semibold mb-4 text-red-400">Review Bottlenecks</h3><div className="space-y-3">{result.bottlenecks.map((b, i) => (<div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50"><div className="flex items-center justify-between mb-2"><span className="font-semibold text-zinc-200">{b.stage}</span><div className="flex gap-2 text-xs"><span className="text-red-400/70">{b.avgTime}</span><span className="text-zinc-500">→</span><span className="text-emerald-400/70">{b.idealTime}</span></div></div><div className="text-xs space-y-1"><div className="text-zinc-400">{b.cause}</div><div className="text-emerald-400/70">Fix: {b.fix}</div><div className="text-violet-400/70">Time saved: {b.timeSaved}</div></div></div>))}</div></div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6"><h3 className="text-lg font-semibold mb-3 text-amber-400">Feedback Anti-Patterns</h3><div className="space-y-3">{result.feedbackPatterns.map((f, i) => (<div key={i} className="bg-zinc-800/40 rounded-lg p-3 border border-zinc-700/50"><div className="flex justify-between mb-1"><span className="text-sm font-semibold text-zinc-200">{f.pattern}</span><span className="text-xs text-amber-400">{f.frequency}</span></div><div className="text-xs space-y-0.5"><div className="text-zinc-500">Root cause: {f.root}</div><div className="text-emerald-400/70">{f.prevention}</div><div className="text-zinc-400 italic mt-1">{f.example}</div></div></div>))}</div></div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6"><h3 className="text-lg font-semibold mb-3 text-violet-400">Optimized Workflow</h3><div className="space-y-3">{result.workflow.map((w, i) => (<div key={i} className="bg-zinc-800/40 rounded-lg p-3 border border-zinc-700/50"><div className="flex items-center gap-2 mb-1"><span className="text-violet-400 font-bold">{w.step}</span><span className="text-sm font-semibold text-zinc-200">{w.name}</span><span className="text-xs text-zinc-500 ml-auto">{w.sla}</span></div><div className="text-xs space-y-0.5"><div className="text-zinc-500">Owner: {w.owner}</div><div className="text-emerald-400/70">Automate: {w.automate}</div></div></div>))}</div></div>
            </div>
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6"><h3 className="text-xl font-semibold mb-4 text-emerald-400">Review Metrics</h3><div className="grid md:grid-cols-2 gap-3">{result.metrics.map((m, i) => (<div key={i} className="bg-zinc-800/40 rounded-lg p-3 border border-zinc-700/50"><div className="text-sm font-semibold text-zinc-200 mb-1">{m.metric}</div><div className="flex gap-3 text-xs mb-1"><span className="text-red-400/60">Current: {m.current}</span><span className="text-emerald-400/70">Target: {m.target}</span></div><div className="text-xs text-zinc-400">{m.action}</div></div>))}</div></div>
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6"><h3 className="text-xl font-semibold mb-4 text-fuchsia-400">Stakeholder Review Guides</h3><div className="space-y-3">{result.stakeholderGuides.map((s, i) => (<div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50"><div className="flex justify-between mb-2"><span className="font-semibold text-zinc-200">{s.role}</span><span className="text-xs text-zinc-500">SLA: {s.slaExpectation}</span></div><div className="text-xs space-y-1"><div><span className="text-zinc-500">Focus:</span> <span className="text-zinc-300">{s.reviewFocus}</span></div><div><span className="text-zinc-500">Avoid:</span> <span className="text-red-400/60">{s.avoid}</span></div><div><span className="text-zinc-500">Format:</span> <span className="text-emerald-400/70">{s.feedbackFormat}</span></div></div></div>))}</div></div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6"><h3 className="text-lg font-semibold mb-3 text-emerald-400">Speed Tips</h3><div className="space-y-2">{result.speedTips.map((t, i) => <div key={i} className="text-sm text-zinc-400 flex gap-2"><span className="text-emerald-400 shrink-0">{i + 1}.</span>{t}</div>)}</div></div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6"><h3 className="text-lg font-semibold mb-3 text-violet-400">Quality Checklist</h3><div className="space-y-2">{result.qualityChecklist.map((c, i) => <div key={i} className="text-sm text-zinc-400 flex gap-2"><span className="text-violet-400 shrink-0">☐</span>{c}</div>)}</div></div>
            </div>
            <div className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 rounded-xl p-8 text-center"><h3 className="text-2xl font-bold mb-2">Kill the Revision Loop</h3><p className="text-zinc-400 mb-4">PostCraft AI optimizes your review process for speed and quality. Pair with <a href="/brand-guardian" className="text-violet-400 underline">Brand Guardian</a>, <a href="/velocity-tracker" className="text-violet-400 underline">Velocity Tracker</a>, and <a href="/content-workflow" className="text-violet-400 underline">Content Workflow</a>.</p><a href="/pricing" className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">Get PostCraft Pro</a></div>
          </div>
        )}
      </div>
    </main>
  );
}
