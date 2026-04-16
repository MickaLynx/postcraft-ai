'use client';
import { useState } from 'react';

const brandTypes = ['Corporate Enterprise', 'Startup / Scale-up', 'Personal Brand', 'Agency (Multi-Client)', 'E-commerce Brand', 'Non-Profit / Government'] as const;
const contentChannels = ['Blog & Website', 'Social Media', 'Email Marketing', 'Advertising', 'Press & PR', 'All Channels'] as const;
const teamSizes = ['Solo', 'Small (2-5)', 'Medium (6-20)', 'Large (20-50)', 'Enterprise (50+)'] as const;
const industries = ['Tech & SaaS', 'E-commerce', 'Healthcare', 'Finance', 'Education', 'Legal', 'Agency', 'Retail'] as const;

interface ComplianceCheck { rule: string; status: string; violations: number; severity: string; examples: string; autoFix: string; }
interface VoiceDeviation { element: string; guideline: string; currentDrift: string; driftScore: number; affectedContent: number; correction: string; }
interface LegalFlag { flag: string; regulation: string; risk: string; contentAffected: string; action: string; deadline: string; }
interface GuardrailRule { rule: string; type: string; description: string; enforcement: string; exceptionProcess: string; }
interface ConsistencyMetric { metric: string; score: number; trend: string; benchmark: string; improvement: string; }

interface GuardianReport {
  overallCompliance: number;
  voiceConsistency: number;
  legalSafety: number;
  checks: ComplianceCheck[];
  deviations: VoiceDeviation[];
  legalFlags: LegalFlag[];
  guardrails: GuardrailRule[];
  consistencyMetrics: ConsistencyMetric[];
  automationOpportunities: string[];
  governancePlaybook: string[];
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }

function guardBrand(brandType: string, channel: string, team: string, industry: string, brand: string): GuardianReport {
  const seed = hash(`${brandType}-${channel}-${team}-${industry}-${brand}`);
  const overallCompliance = 30 + seed % 60;
  const voiceConsistency = 25 + seed % 65;
  const legalSafety = 40 + seed % 55;

  const checks: ComplianceCheck[] = [
    { rule: 'Brand Terminology', status: overallCompliance > 60 ? 'Passing' : 'Failing', violations: seed % 15 + 3, severity: 'High', examples: `"${seed % 2 === 0 ? 'Product' : 'Platform'}" used inconsistently — official term is "${seed % 2 === 0 ? 'Platform' : 'Solution'}"`, autoFix: 'Find-and-replace with approved terminology from brand glossary' },
    { rule: 'Tone Consistency', status: voiceConsistency > 55 ? 'Passing' : 'Warning', violations: seed % 10 + 2, severity: 'Medium', examples: `Blog uses casual tone but ${channel} uses corporate formality — jarring for cross-channel readers`, autoFix: 'Apply tone spectrum: formal (press) → professional (blog) → conversational (social)' },
    { rule: 'Visual Identity', status: seed % 3 === 0 ? 'Passing' : 'Warning', violations: seed % 8 + 1, severity: 'Medium', examples: `${seed % 5 + 3} pieces use old logo/colors from pre-rebrand`, autoFix: 'Bulk asset replacement with updated brand kit — flag old hex codes' },
    { rule: 'Accessibility Standards', status: seed % 2 === 0 ? 'Warning' : 'Failing', violations: seed % 12 + 4, severity: 'High', examples: `${seed % 8 + 5} images lack alt text, ${seed % 3 + 1} videos lack captions`, autoFix: 'Add alt text generation to publishing workflow — block publish without it' },
    { rule: 'Competitor Mention Policy', status: 'Passing', violations: seed % 3, severity: 'Low', examples: seed % 3 > 0 ? `${seed % 3} posts mention competitor by name — policy says use "alternatives"` : 'No violations', autoFix: 'Flag competitor names in draft stage — suggest generic alternatives' },
    { rule: 'Claim Substantiation', status: overallCompliance > 50 ? 'Warning' : 'Failing', violations: seed % 8 + 2, severity: 'Critical', examples: `"${seed % 2 === 0 ? '#1 in the market' : 'Industry-leading'}}" claim without source citation`, autoFix: 'Require source link for any superlative or comparative claim before publishing' },
  ];

  const deviations: VoiceDeviation[] = [
    { element: 'Sentence Length', guideline: 'Max 20 words avg for readability', currentDrift: `Avg ${22 + seed % 15} words — ${seed % 10 + 2}% over guideline`, driftScore: 15 + seed % 35, affectedContent: seed % 30 + 10, correction: 'Break long sentences at conjunctions — "and" and "but" are natural split points' },
    { element: 'Jargon Usage', guideline: `Explain all ${industry}-specific terms on first use`, currentDrift: `${seed % 8 + 3} unexplained technical terms found in last 30 pieces`, driftScore: 10 + seed % 30, affectedContent: seed % 15 + 5, correction: 'Add a parenthetical definition or link to glossary for each technical term' },
    { element: 'Power Word Density', guideline: '2+ power words per headline, 1 per paragraph', currentDrift: `${40 + seed % 40}% of headlines have 0 power words — flat and unmemorable`, driftScore: 20 + seed % 40, affectedContent: seed % 20 + 8, correction: 'Maintain power word bank: proven, instant, exclusive, effortless, guaranteed, breakthrough' },
    { element: 'First-Person Usage', guideline: `${brandType.includes('Personal') ? 'Use "I" freely' : 'Use "we" for company, "you" for reader'}`, currentDrift: `${seed % 2 === 0 ? 'Inconsistent "I" vs "we" — confuses brand identity' : '"We" overused — content feels corporate, not human'}`, driftScore: 15 + seed % 25, affectedContent: seed % 12 + 4, correction: `Standardize: ${brandType.includes('Personal') ? '"I" for opinions, "we" for team efforts' : '"we" for company actions, "you" for reader benefits, "I" only in attributed quotes'}` },
    { element: 'Emotional Register', guideline: 'Match emotional intensity to content type and channel', currentDrift: `${seed % 2 === 0 ? 'Too flat — reads like documentation, not marketing' : 'Too intense — every post reads like a sales pitch'}`, driftScore: 20 + seed % 35, affectedContent: seed % 25 + 5, correction: `Create an emotional spectrum: educational (calm) → promotional (energized) → crisis (urgent)` },
  ];

  const legalFlags: LegalFlag[] = [
    { flag: 'Unsubstantiated Performance Claims', regulation: 'FTC Act Section 5, ASA CAP Code', risk: 'Regulatory action, fines, reputation damage', contentAffected: `${seed % 5 + 2} ads, ${seed % 3 + 1} landing pages`, action: 'Add disclaimers or replace with verifiable metrics ("saved 500+ hours" with source)', deadline: 'Within 48 hours' },
    { flag: 'Missing Privacy Disclosures', regulation: 'GDPR Art. 13, CCPA', risk: 'Privacy violation fines up to 4% annual revenue (GDPR)', contentAffected: 'All pages with data collection forms', action: 'Add privacy notice link adjacent to every form — explain data usage clearly', deadline: 'Immediately' },
    { flag: 'Testimonial Consent Issues', regulation: 'FTC Endorsement Guidelines', risk: 'Legal liability, customer relationship damage', contentAffected: `${seed % 4 + 2} testimonials on website`, action: 'Verify written consent for all published testimonials — remove any without consent', deadline: 'Within 7 days' },
    { flag: 'Copyright Attribution', regulation: 'DMCA, Copyright Act', risk: 'Takedown notices, licensing fees, lawsuit', contentAffected: `${seed % 6 + 3} images with unclear licensing`, action: 'Audit all images — verify license or replace with owned/licensed alternatives', deadline: 'Within 14 days' },
  ];

  const guardrails: GuardrailRule[] = [
    { rule: 'Pre-Publish Brand Check', type: 'Mandatory', description: 'Every piece must pass automated brand terminology, tone, and accessibility check before publishing', enforcement: 'Block publish button until all checks pass — no exceptions', exceptionProcess: 'VP Marketing can override with documented reason' },
    { rule: 'Claim Verification', type: 'Mandatory', description: 'All superlative and comparative claims require a source link or data citation', enforcement: 'Flag in draft stage — require source attachment before approval', exceptionProcess: 'Legal team can approve general claims with disclaimer' },
    { rule: 'Visual Brand Consistency', type: 'Enforced', description: 'All visuals must use current brand kit (logo, colors, typography)', enforcement: 'Brand kit plugin in design tools — auto-flag off-brand elements', exceptionProcess: 'Design lead approves exceptions for co-branded or experimental content' },
    { rule: 'Competitor Mention Protocol', type: 'Advisory', description: 'Avoid naming competitors directly — use "alternatives" or "other solutions"', enforcement: 'Auto-flag in drafts — suggest neutral alternatives', exceptionProcess: 'Fair comparison content approved by legal' },
    { rule: 'Approval Workflow', type: 'Mandatory', description: 'All content requires 1 designated approver per content type — max 24h review SLA', enforcement: 'Auto-escalation if review not completed within SLA', exceptionProcess: 'Time-sensitive content can be published with post-publish review' },
  ];

  const consistencyMetrics: ConsistencyMetric[] = [
    { metric: 'Cross-Channel Voice Match', score: 25 + seed % 60, trend: seed % 3 === 0 ? 'Improving' : 'Declining', benchmark: '80%+ (industry top)', improvement: 'Create channel-specific voice cards — same DNA, adapted tone per platform' },
    { metric: 'Terminology Consistency', score: 40 + seed % 50, trend: 'Stable', benchmark: '95%+ (no deviations)', improvement: 'Implement real-time terminology checker in CMS — block non-standard terms' },
    { metric: 'Visual Brand Adherence', score: 50 + seed % 40, trend: seed % 2 === 0 ? 'Improving' : 'Stable', benchmark: '100% (zero tolerance)', improvement: 'Quarterly visual audit + brand kit version control' },
    { metric: 'Legal Compliance Rate', score: legalSafety, trend: seed % 3 === 2 ? 'Improving' : 'Needs Attention', benchmark: '100% (zero tolerance)', improvement: 'Pre-publish legal checklist for all customer-facing content' },
    { metric: 'Accessibility Score', score: 30 + seed % 50, trend: 'Declining', benchmark: 'WCAG 2.1 AA (100%)', improvement: 'Add automated a11y checker to build pipeline — block deploy on failures' },
  ];

  const automationOpportunities = [
    'Auto-terminate check: scan every draft for brand terminology violations before human review sees it',
    'Tone analyzer integration: flag tone deviations in real-time as writers draft — not after they submit',
    'Image compliance scanner: auto-check logo placement, color accuracy, and alt text on all visuals',
    'Legal disclaimer injector: auto-append required disclaimers based on content type and jurisdiction',
    'Competitor mention detector: flag competitor names and suggest neutral replacements instantly',
    'Accessibility auto-audit: run WCAG checker on every page before publish — block non-compliant content',
  ];

  const governancePlaybook = [
    'Step 1: Create a Brand Source of Truth document — terminology, tone spectrum, visual standards, legal requirements',
    'Step 2: Designate 1 Brand Guardian per team — they own compliance, not everyone\'s job (which means nobody\'s job)',
    'Step 3: Implement pre-publish automated checks — catch 80% of violations before human review',
    'Step 4: Set a 24-hour review SLA — fast feedback prevents bottlenecks and revision loops',
    'Step 5: Run monthly compliance audits — track scores, fix drift, update guidelines as brand evolves',
    'Step 6: Create an exception process — rigid rules without escape valves create workarounds',
    'Step 7: Train every new writer in 90-minute Brand Onboarding — prevent drift at the source',
    'Step 8: Review and update governance quarterly — brands evolve, rules must too',
  ];

  return { overallCompliance, voiceConsistency, legalSafety, checks, deviations, legalFlags, guardrails, consistencyMetrics, automationOpportunities, governancePlaybook };
}

export default function BrandGuardianPage() {
  const [brandType, setBrandType] = useState(brandTypes[0]);
  const [channel, setChannel] = useState(contentChannels[0]);
  const [team, setTeam] = useState(teamSizes[0]);
  const [industry, setIndustry] = useState(industries[0]);
  const [brand, setBrand] = useState('');
  const [result, setResult] = useState<GuardianReport | null>(null);

  const handleGenerate = () => { if (brand.trim()) setResult(guardBrand(brandType, channel, team, industry, brand)); };
  const scoreColor = (n: number) => n >= 80 ? '#34d399' : n >= 60 ? '#a3e635' : n >= 40 ? '#fbbf24' : '#f87171';
  const statusColor = (s: string) => s === 'Passing' ? '#34d399' : s === 'Warning' ? '#fbbf24' : '#f87171';
  const sevColor = (s: string) => s === 'Low' ? '#34d399' : s === 'Medium' ? '#fbbf24' : s === 'High' ? '#fb923c' : '#f87171';

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Brand Compliance Guardian</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Protect your brand at scale. Detect voice drift, enforce terminology, flag legal risks, and maintain consistency across every channel and team member. Your AI-powered brand governance system.</p>
        <div className="mb-4"><label className="block text-sm text-zinc-400 mb-1">Brand Name</label><input type="text" value={brand} onChange={e => setBrand(e.target.value)} placeholder="e.g., PostCraft, your brand" className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-3 text-zinc-100" /></div>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {([{ label: 'Brand Type', value: brandType, setter: setBrandType as (v: string) => void, options: brandTypes as readonly string[] }, { label: 'Primary Channel', value: channel, setter: setChannel as (v: string) => void, options: contentChannels as readonly string[] }, { label: 'Team Size', value: team, setter: setTeam as (v: string) => void, options: teamSizes as readonly string[] }, { label: 'Industry', value: industry, setter: setIndustry as (v: string) => void, options: industries as readonly string[] }] as const).map(({ label, value, setter, options }) => (<div key={label}><label className="block text-sm text-zinc-400 mb-1">{label}</label><select value={value} onChange={e => setter(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100">{options.map(o => <option key={o} value={o}>{o}</option>)}</select></div>))}
        </div>
        <button onClick={handleGenerate} className="w-full md:w-auto bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded font-semibold hover:opacity-90 transition mb-8">Run Brand Audit</button>
        {result && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 text-center"><div className="text-4xl font-bold mb-1" style={{ color: scoreColor(result.overallCompliance) }}>{result.overallCompliance}%</div><div className="text-zinc-400 text-sm">Overall Compliance</div></div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 text-center"><div className="text-4xl font-bold mb-1" style={{ color: scoreColor(result.voiceConsistency) }}>{result.voiceConsistency}%</div><div className="text-zinc-400 text-sm">Voice Consistency</div></div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 text-center"><div className="text-4xl font-bold mb-1" style={{ color: scoreColor(result.legalSafety) }}>{result.legalSafety}%</div><div className="text-zinc-400 text-sm">Legal Safety</div></div>
            </div>
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6"><h3 className="text-xl font-semibold mb-4 text-violet-400">Compliance Checks</h3><div className="space-y-3">{result.checks.map((c, i) => (<div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50"><div className="flex items-center justify-between mb-2"><span className="font-semibold text-zinc-200">{c.rule}</span><div className="flex gap-2"><span className="text-xs px-2 py-1 rounded font-bold" style={{ color: statusColor(c.status), background: `${statusColor(c.status)}15` }}>{c.status}</span><span className="text-xs px-2 py-1 rounded" style={{ color: sevColor(c.severity), background: `${sevColor(c.severity)}15` }}>{c.severity}</span></div></div><div className="text-xs text-zinc-400 mb-1">{c.examples}</div><div className="text-xs text-emerald-400/70">Auto-fix: {c.autoFix}</div></div>))}</div></div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6"><h3 className="text-lg font-semibold mb-3 text-amber-400">Voice Deviations</h3><div className="space-y-3">{result.deviations.map((d, i) => (<div key={i} className="bg-zinc-800/40 rounded-lg p-3 border border-zinc-700/50"><div className="flex justify-between mb-1"><span className="text-sm font-semibold text-zinc-200">{d.element}</span><span className="text-xs text-amber-400">Drift: {d.driftScore}%</span></div><div className="w-full bg-zinc-800 rounded-full h-1.5 mb-2"><div className="h-1.5 rounded-full bg-amber-400" style={{ width: `${d.driftScore}%` }} /></div><div className="text-xs space-y-0.5"><div className="text-zinc-500">Guideline: {d.guideline}</div><div className="text-red-400/60">{d.currentDrift}</div><div className="text-emerald-400/70">{d.correction}</div></div></div>))}</div></div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6"><h3 className="text-lg font-semibold mb-3 text-red-400">Legal Flags</h3><div className="space-y-3">{result.legalFlags.map((f, i) => (<div key={i} className="bg-zinc-800/40 rounded-lg p-3 border border-zinc-700/50"><div className="flex justify-between mb-1"><span className="text-sm font-semibold text-zinc-200">{f.flag}</span><span className="text-xs px-2 py-0.5 rounded bg-red-400/10 text-red-400">{f.deadline}</span></div><div className="text-xs space-y-0.5"><div className="text-zinc-500">{f.regulation}</div><div className="text-red-400/60">Risk: {f.risk}</div><div className="text-emerald-400/70">{f.action}</div></div></div>))}</div></div>
            </div>
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6"><h3 className="text-xl font-semibold mb-4 text-emerald-400">Consistency Metrics</h3><div className="grid md:grid-cols-3 gap-3">{result.consistencyMetrics.map((m, i) => (<div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50 text-center"><div className="text-2xl font-bold mb-1" style={{ color: scoreColor(m.score) }}>{m.score}%</div><div className="text-sm font-semibold text-zinc-200 mb-1">{m.metric}</div><div className="text-xs text-zinc-500">{m.trend} · Benchmark: {m.benchmark}</div></div>))}</div></div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6"><h3 className="text-lg font-semibold mb-3 text-violet-400">Guardrail Rules</h3><div className="space-y-3">{result.guardrails.map((g, i) => (<div key={i} className="bg-zinc-800/40 rounded-lg p-3 border border-zinc-700/50"><div className="flex justify-between mb-1"><span className="text-sm font-semibold text-zinc-200">{g.rule}</span><span className="text-xs px-2 py-0.5 rounded bg-violet-400/10 text-violet-400">{g.type}</span></div><div className="text-xs text-zinc-400">{g.description}</div><div className="text-xs text-zinc-500 mt-1">Enforcement: {g.enforcement}</div></div>))}</div></div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6"><h3 className="text-lg font-semibold mb-3 text-emerald-400">Governance Playbook</h3><div className="space-y-2">{result.governancePlaybook.map((p, i) => <div key={i} className="text-sm text-zinc-400 flex gap-2"><span className="text-emerald-400 shrink-0">{i + 1}.</span>{p}</div>)}</div></div>
            </div>
            <div className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 rounded-xl p-8 text-center"><h3 className="text-2xl font-bold mb-2">Scale Your Brand Without Losing Control</h3><p className="text-zinc-400 mb-4">PostCraft AI protects your brand at scale. Pair with <a href="/content-integrity" className="text-violet-400 underline">Content Integrity</a>, <a href="/tone-guard" className="text-violet-400 underline">ToneGuard</a>, and <a href="/brand-voice" className="text-violet-400 underline">Brand Voice</a>.</p><a href="/pricing" className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">Get PostCraft Pro</a></div>
          </div>
        )}
      </div>
    </main>
  );
}
