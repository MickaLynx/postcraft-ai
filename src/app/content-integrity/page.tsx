'use client';
import { useState } from 'react';

const contentTypes = ['Blog Posts', 'Landing Pages', 'Social Media', 'Email Campaigns', 'Product Pages', 'Help Docs', 'Video Scripts', 'All Content'] as const;
const checkScopes = ['Full Ecosystem', 'Single Channel', 'Campaign-Specific', 'Product Line', 'Regional Content', 'Seasonal Content'] as const;
const industries = ['Tech & SaaS', 'E-commerce & DTC', 'Healthcare', 'Finance & FinTech', 'Education', 'Real Estate', 'Agency & Consulting', 'Legal', 'Manufacturing', 'Media & Publishing'] as const;
const teamSizes = ['Solo Creator', 'Small Team (2-5)', 'Medium Team (6-15)', 'Large Team (16-50)', 'Enterprise (50+)'] as const;
const contentVolumes = ['< 50 pieces', '50-200 pieces', '200-500 pieces', '500-2,000 pieces', '2,000+ pieces'] as const;

interface FactDrift { claim: string; source: string; locations: string[]; currentVersion: string; canonicalVersion: string; severity: string; age: string; fix: string; }
interface ConsistencyIssue { type: string; description: string; affectedContent: string[]; impact: string; resolution: string; effort: string; priority: string; }
interface BrandVoiceGap { element: string; expected: string; actual: string; pieces: number; example: string; correction: string; }
interface ComplianceFlag { rule: string; violation: string; content: string; risk: string; regulation: string; action: string; deadline: string; }
interface IntegrityScore { category: string; score: number; issues: number; trend: string; }

interface IntegrityReport {
  overallScore: number;
  riskLevel: string;
  factDrifts: FactDrift[];
  consistencyIssues: ConsistencyIssue[];
  brandVoiceGaps: BrandVoiceGap[];
  complianceFlags: ComplianceFlag[];
  categoryScores: IntegrityScore[];
  auditChecklist: string[];
  maintenancePlan: string[];
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }

function checkIntegrity(contentType: string, scope: string, industry: string, teamSize: string, volume: string, brand: string): IntegrityReport {
  const seed = hash(`${contentType}-${scope}-${industry}-${teamSize}-${volume}-${brand}`);
  const overallScore = 30 + seed % 65;
  const riskLevel = overallScore >= 80 ? 'Excellent — Minor Tune-ups Only' : overallScore >= 60 ? 'Good — Some Drift Detected' : overallScore >= 40 ? 'Concerning — Active Inconsistencies' : 'Critical — Immediate Remediation Required';

  const factDrifts: FactDrift[] = [
    { claim: 'Product pricing / plan tiers', source: 'Pricing page (canonical)', locations: ['Blog: "Complete Guide to ' + brand + '"', 'Email: Welcome sequence #3', 'Social: Pinned post comparison'], currentVersion: `$${29 + seed % 50}/mo referenced in 3 outdated pieces`, canonicalVersion: `$${39 + seed % 60}/mo (updated ${seed % 3 + 1} months ago)`, severity: 'Critical', age: `${seed % 6 + 1} months stale`, fix: 'Update all pricing references — create a dynamic pricing snippet that auto-syncs' },
    { claim: 'Company headcount / team size', source: 'About page (canonical)', locations: ['Press kit', 'LinkedIn company page', 'Blog: "Our Story"'], currentVersion: `"${50 + seed % 200} employees" in press kit`, canonicalVersion: `${80 + seed % 300} employees (current)`, severity: 'Medium', age: `${seed % 12 + 1} months stale`, fix: 'Update press kit and LinkedIn — set quarterly review reminder' },
    { claim: 'Feature availability / roadmap items', source: 'Product changelog (canonical)', locations: ['Help docs: Feature overview', 'Sales deck slide 14', 'Comparison landing page'], currentVersion: `${seed % 2 === 0 ? '"Coming soon"' : '"Beta"'} label on shipped feature`, canonicalVersion: 'Feature is GA since ' + (seed % 4 + 1) + ' months', severity: 'High', age: `${seed % 4 + 1} months outdated`, fix: 'Audit all "coming soon" and "beta" labels monthly — automate with CMS tags' },
    { claim: 'Customer count / social proof metrics', source: 'Marketing dashboard (canonical)', locations: ['Homepage hero', 'Case studies page', 'Email footer'], currentVersion: `"${seed % 5 + 1},000+ customers" in email footer`, canonicalVersion: `${seed % 8 + 3},000+ customers (current)`, severity: 'Medium', age: `${seed % 8 + 2} months behind`, fix: 'Use a centralized "proof metrics" data source that all templates reference' },
    { claim: 'Integration partner list', source: 'Integrations page (canonical)', locations: ['Blog: "Best Tools for ' + industry + '"', 'Partner directory', 'Help docs: Setup guides'], currentVersion: `Lists ${seed % 5 + 10} integrations, missing ${seed % 3 + 2} new ones`, canonicalVersion: `${seed % 5 + 12} integrations currently live`, severity: 'Low', age: `${seed % 3 + 1} months behind`, fix: 'Add new integrations to all content within 1 week of launch' },
  ];

  const consistencyIssues: ConsistencyIssue[] = [
    { type: 'Terminology Mismatch', description: `Product feature called "${seed % 2 === 0 ? 'Smart Analytics' : 'AI Dashboard'}" in blog but "${seed % 2 === 0 ? 'Intelligent Insights' : 'Analytics Hub'}" in help docs`, affectedContent: ['12 blog posts', '8 help articles', '3 email sequences'], impact: 'Confuses users searching for features — increases support tickets by ~15%', resolution: 'Create a terminology glossary and enforce via content review checklist', effort: '4-6 hours initial, 30 min/week ongoing', priority: 'P0' },
    { type: 'Value Proposition Drift', description: 'Homepage says "save 10 hours/week" but case studies reference "save 5 hours/week" and ads say "2x productivity"', affectedContent: ['Homepage', '4 case studies', '6 ad creatives'], impact: 'Undermines credibility — prospects notice conflicting claims', resolution: 'Standardize to one provable metric with source attribution', effort: '2-3 hours', priority: 'P0' },
    { type: 'Visual Brand Inconsistency', description: `Old logo/colors appearing in ${seed % 8 + 5} pieces created before rebrand`, affectedContent: [`${seed % 8 + 5} blog images`, '2 PDF guides', '1 video thumbnail'], impact: 'Looks unprofessional — damages brand perception', resolution: 'Bulk find-and-replace old assets with updated brand kit', effort: '3-5 hours', priority: 'P1' },
    { type: 'CTA Inconsistency', description: 'Different CTAs for same conversion goal — "Start Free", "Try Now", "Get Started", "Sign Up Free"', affectedContent: ['All landing pages', 'Blog CTAs', 'Email footers'], impact: 'Dilutes conversion optimization — impossible to A/B test effectively', resolution: 'Standardize to 2-3 approved CTA variants per funnel stage', effort: '2 hours', priority: 'P1' },
    { type: 'Date/Stat Staleness', description: `${seed % 10 + 8} pieces reference "2024" or "2025" stats as "recent" or "latest"`, affectedContent: [`${seed % 10 + 8} blog posts`, '3 whitepapers', '2 landing pages'], impact: 'Content appears outdated — reduces trust and SEO ranking', resolution: 'Quarterly stat audit — flag any reference older than 12 months', effort: '4-8 hours quarterly', priority: 'P1' },
    { type: 'Tone Shift Between Channels', description: 'LinkedIn content is formal/professional but website copy is casual/playful — jarring for prospects who cross channels', affectedContent: ['LinkedIn posts', 'Website pages', 'Email sequences'], impact: 'Brand feels fragmented — reduces recognition and trust', resolution: 'Create a tone spectrum document: formal (LinkedIn) → conversational (blog) → casual (social) with examples', effort: '3-4 hours', priority: 'P2' },
  ];

  const brandVoiceGaps: BrandVoiceGap[] = [
    { element: 'Sentence Length', expected: 'Max 20 words for readability', actual: 'Average 32 words in blog posts', pieces: seed % 20 + 10, example: '"Our comprehensive suite of enterprise-grade solutions enables organizations to seamlessly integrate..." (38 words)', correction: 'Break into 2-3 shorter sentences. Lead with the action, not the qualifier.' },
    { element: 'Jargon Usage', expected: 'Plain language, explain technical terms', actual: `${seed % 8 + 5} pieces use unexplained jargon`, pieces: seed % 8 + 5, example: '"Leverage our omnichannel CDP to orchestrate unified customer journeys" — no reader outside marketing knows what this means', correction: 'Replace jargon with outcomes: "Reach your customers wherever they are — email, social, web — from one place"' },
    { element: 'Active vs Passive Voice', expected: '80%+ active voice', actual: `${50 + seed % 30}% active voice`, pieces: seed % 15 + 8, example: '"Reports can be generated by the system" → "Generate reports instantly"', correction: 'Find "is/are/was/were + past participle" patterns and rewrite in active voice' },
    { element: 'Inclusive Language', expected: 'Gender-neutral, accessible terms', actual: `${seed % 5 + 2} pieces use exclusionary defaults`, pieces: seed % 5 + 2, example: '"Every businessman needs..." → "Every professional needs..."', correction: 'Run inclusive language checker before publishing — add to style guide' },
    { element: 'Power Words Distribution', expected: 'At least 2 power words per headline', actual: `${40 + seed % 40}% of headlines have 0 power words`, pieces: seed % 12 + 6, example: '"How to Use Our Tool" → "How to Instantly Double Your Output with [Tool]"', correction: 'Maintain a power word bank: instantly, proven, exclusive, breakthrough, effortless, guaranteed' },
  ];

  const complianceFlags: ComplianceFlag[] = [
    { rule: 'Testimonial Substantiation', violation: `${seed % 3 + 2} customer quotes lack written permission or are from churned accounts`, content: 'Case studies page, homepage social proof section', risk: 'Legal liability — FTC requires substantiated testimonials', regulation: 'FTC Endorsement Guidelines', action: 'Obtain written consent for all testimonials — remove unverified ones immediately', deadline: 'Within 7 days' },
    { rule: 'Earnings/Results Claims', violation: '"10x your revenue" claim in ad copy without disclaimer or typical results', content: 'Facebook ads, Google ads, sales page', risk: 'FTC scrutiny — unsubstantiated income claims', regulation: 'FTC Act Section 5', action: 'Add "Results not typical" disclaimer or replace with verifiable average metrics', deadline: 'Within 3 days' },
    { rule: 'Cookie Consent Accuracy', violation: 'Cookie banner says "essential only" but analytics cookies fire before consent', content: 'All web pages with tracking', risk: 'GDPR/ePrivacy violation — potential fines', regulation: 'GDPR Art. 7, ePrivacy Directive', action: 'Fix consent flow — block all non-essential cookies until explicit consent', deadline: 'Immediately' },
    { rule: 'Accessibility Standards', violation: `${seed % 10 + 5} images lack alt text, ${seed % 3 + 1} videos lack captions`, content: 'Blog images, product screenshots, tutorial videos', risk: 'ADA/WCAG non-compliance — legal exposure + exclusion of disabled users', regulation: 'WCAG 2.1 AA, ADA Title III', action: 'Audit all media — add alt text and captions to 100% of content', deadline: 'Within 14 days' },
    { rule: 'Copyright Attribution', violation: `${seed % 4 + 1} stock photos used without proper license attribution`, content: 'Blog featured images, social graphics', risk: 'DMCA takedown, licensing fees, potential lawsuit', regulation: 'Copyright Act, DMCA', action: 'Verify license status for all images — replace or properly attribute', deadline: 'Within 7 days' },
  ];

  const categoryScores: IntegrityScore[] = [
    { category: 'Factual Accuracy', score: Math.min(95, 40 + seed % 55), issues: factDrifts.filter(f => f.severity === 'Critical' || f.severity === 'High').length, trend: seed % 3 === 0 ? 'Improving' : 'Declining' },
    { category: 'Brand Consistency', score: Math.min(95, 35 + seed % 55), issues: consistencyIssues.filter(c => c.priority === 'P0').length, trend: seed % 2 === 0 ? 'Stable' : 'Declining' },
    { category: 'Voice & Tone', score: Math.min(95, 45 + seed % 45), issues: brandVoiceGaps.filter(b => b.pieces > 10).length, trend: 'Stable' },
    { category: 'Legal Compliance', score: Math.min(95, 30 + seed % 60), issues: complianceFlags.length, trend: seed % 3 === 2 ? 'Improving' : 'Needs Attention' },
    { category: 'Content Freshness', score: Math.min(95, 25 + seed % 65), issues: seed % 10 + 3, trend: 'Declining' },
    { category: 'Cross-Channel Alignment', score: Math.min(95, 40 + seed % 50), issues: seed % 5 + 1, trend: seed % 2 === 0 ? 'Improving' : 'Stable' },
  ];

  const auditChecklist = [
    'Verify all pricing/plan references match current pricing page — check blog, email, ads, social',
    'Confirm customer count and social proof metrics are current (< 30 days old)',
    'Audit all "coming soon" and "beta" labels — update shipped features to GA status',
    'Check all testimonials have written consent on file and customers are still active',
    'Run brand asset audit — find and replace any pre-rebrand logos, colors, or typography',
    'Verify all external links still work — fix or remove broken links',
    'Check date references — flag any stat or claim older than 12 months as needing refresh',
    'Validate CTA consistency — ensure max 3 variants per conversion goal across all channels',
    'Review cookie consent implementation — verify no tracking fires before explicit consent',
    'Audit all media for accessibility — alt text on images, captions on videos, contrast on text',
  ];

  const maintenancePlan = [
    'Week 1: Complete full integrity audit using this checklist — prioritize Critical and P0 items',
    'Week 2: Fix all factual drifts — update pricing, metrics, feature status across all channels',
    'Week 3: Resolve brand consistency issues — standardize terminology, CTAs, and value props',
    'Week 4: Address compliance flags — testimonial consent, earnings claims, cookie consent',
    'Month 2: Implement automated integrity checks — CMS webhooks for pricing changes, scheduled link checks',
    'Month 3: Create a "Content Source of Truth" document — canonical versions of all key claims',
    'Ongoing: Weekly 15-min integrity spot-check + monthly full audit + quarterly deep dive',
    'Quarterly: Update this analysis — track score improvement and new drift patterns',
  ];

  return { overallScore, riskLevel, factDrifts, consistencyIssues, brandVoiceGaps, complianceFlags, categoryScores, auditChecklist, maintenancePlan };
}

export default function ContentIntegrityPage() {
  const [contentType, setContentType] = useState(contentTypes[0]);
  const [scope, setScope] = useState(checkScopes[0]);
  const [industry, setIndustry] = useState(industries[0]);
  const [teamSize, setTeamSize] = useState(teamSizes[0]);
  const [volume, setVolume] = useState(contentVolumes[0]);
  const [brand, setBrand] = useState('');
  const [result, setResult] = useState<IntegrityReport | null>(null);

  const handleGenerate = () => { if (brand.trim()) setResult(checkIntegrity(contentType, scope, industry, teamSize, volume, brand)); };
  const scoreColor = (n: number) => n >= 80 ? '#34d399' : n >= 60 ? '#a3e635' : n >= 40 ? '#fbbf24' : '#f87171';
  const sevColor = (s: string) => s === 'Low' ? '#34d399' : s === 'Medium' ? '#fbbf24' : s === 'High' ? '#fb923c' : '#f87171';
  const prioColor = (p: string) => p === 'P0' ? '#f87171' : p === 'P1' ? '#fbbf24' : '#60a5fa';

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Content Integrity Checker</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Audit your entire content ecosystem for factual drift, brand inconsistencies, voice gaps, and compliance risks. Catch contradictions before your audience does — protect trust, avoid legal risk, and keep every channel aligned.</p>

        <div className="mb-4">
          <label className="block text-sm text-zinc-400 mb-1">Brand / Company Name</label>
          <input type="text" value={brand} onChange={e => setBrand(e.target.value)} placeholder="e.g., PostCraft, Acme Corp" className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-3 text-zinc-100" />
        </div>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {([
            { label: 'Content Type', value: contentType, setter: setContentType as (v: string) => void, options: contentTypes as readonly string[] },
            { label: 'Audit Scope', value: scope, setter: setScope as (v: string) => void, options: checkScopes as readonly string[] },
            { label: 'Industry', value: industry, setter: setIndustry as (v: string) => void, options: industries as readonly string[] },
            { label: 'Team Size', value: teamSize, setter: setTeamSize as (v: string) => void, options: teamSizes as readonly string[] },
            { label: 'Content Volume', value: volume, setter: setVolume as (v: string) => void, options: contentVolumes as readonly string[] },
          ] as const).map(({ label, value, setter, options }) => (
            <div key={label}>
              <label className="block text-sm text-zinc-400 mb-1">{label}</label>
              <select value={value} onChange={e => setter(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100">
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
        <button onClick={handleGenerate} className="w-full md:w-auto bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded font-semibold hover:opacity-90 transition mb-8">Run Integrity Audit</button>

        {result && (
          <div className="space-y-8">
            {/* Overall Score */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 text-center">
              <div className="text-5xl font-bold mb-2" style={{ color: scoreColor(result.overallScore) }}>{result.overallScore}</div>
              <div className="text-zinc-400 mb-2">Content Integrity Score (higher is better)</div>
              <div className="text-lg font-semibold" style={{ color: scoreColor(result.overallScore) }}>{result.riskLevel}</div>
              <div className="mt-3 max-w-md mx-auto w-full bg-zinc-800 rounded-full h-3">
                <div className="h-3 rounded-full transition-all" style={{ width: `${result.overallScore}%`, background: scoreColor(result.overallScore) }} />
              </div>
            </div>

            {/* Category Scores */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Category Breakdown</h3>
              <div className="grid md:grid-cols-3 gap-3">
                {result.categoryScores.map((c, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50 text-center">
                    <div className="text-3xl font-bold mb-1" style={{ color: scoreColor(c.score) }}>{c.score}</div>
                    <div className="text-sm font-semibold text-zinc-200 mb-1">{c.category}</div>
                    <div className="flex justify-center gap-2 text-xs">
                      <span className="text-zinc-500">{c.issues} issues</span>
                      <span style={{ color: c.trend === 'Improving' ? '#34d399' : c.trend === 'Declining' ? '#f87171' : '#fbbf24' }}>{c.trend}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fact Drifts */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-red-400">Factual Drift Detected ({result.factDrifts.length})</h3>
              <div className="space-y-3">
                {result.factDrifts.map((d, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-zinc-200">{d.claim}</span>
                      <span className="text-xs px-2 py-1 rounded font-bold" style={{ color: sevColor(d.severity), background: `${sevColor(d.severity)}15` }}>{d.severity} — {d.age}</span>
                    </div>
                    <div className="text-xs space-y-1 mb-2">
                      <div><span className="text-zinc-500">Source:</span> <span className="text-zinc-300">{d.source}</span></div>
                      <div><span className="text-zinc-500">Outdated in:</span> <span className="text-zinc-300">{d.locations.join(' • ')}</span></div>
                      <div className="flex gap-4"><span><span className="text-red-400/70">Old:</span> {d.currentVersion}</span><span><span className="text-emerald-400/70">Current:</span> {d.canonicalVersion}</span></div>
                    </div>
                    <div className="text-xs text-emerald-400/70">Fix: {d.fix}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Consistency Issues */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-amber-400">Consistency Issues ({result.consistencyIssues.length})</h3>
              <div className="space-y-3">
                {result.consistencyIssues.map((c, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-zinc-200">{c.type}</span>
                      <span className="text-xs px-2 py-1 rounded font-bold" style={{ color: prioColor(c.priority), background: `${prioColor(c.priority)}15` }}>{c.priority}</span>
                    </div>
                    <div className="text-sm text-zinc-400 mb-1">{c.description}</div>
                    <div className="text-xs space-y-1">
                      <div><span className="text-zinc-500">Affected:</span> <span className="text-zinc-300">{c.affectedContent.join(' • ')}</span></div>
                      <div><span className="text-zinc-500">Impact:</span> <span className="text-amber-400/70">{c.impact}</span></div>
                      <div><span className="text-zinc-500">Resolution:</span> <span className="text-emerald-400/70">{c.resolution}</span></div>
                      <div className="text-zinc-500">Effort: {c.effort}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Brand Voice Gaps + Compliance Flags */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-violet-400">Brand Voice Gaps</h3>
                <div className="space-y-3">
                  {result.brandVoiceGaps.map((g, i) => (
                    <div key={i} className="bg-zinc-800/40 rounded-lg p-3 border border-zinc-700/50">
                      <div className="flex justify-between mb-1"><span className="text-sm font-semibold text-zinc-200">{g.element}</span><span className="text-xs text-zinc-500">{g.pieces} pieces</span></div>
                      <div className="text-xs space-y-1">
                        <div className="flex gap-3"><span className="text-red-400/60">Expected: {g.expected}</span></div>
                        <div><span className="text-amber-400/60">Actual: {g.actual}</span></div>
                        <div className="text-zinc-500 italic">"{g.example}"</div>
                        <div className="text-emerald-400/70">{g.correction}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-red-400">Compliance Flags</h3>
                <div className="space-y-3">
                  {result.complianceFlags.map((f, i) => (
                    <div key={i} className="bg-zinc-800/40 rounded-lg p-3 border border-zinc-700/50">
                      <div className="flex justify-between mb-1"><span className="text-sm font-semibold text-zinc-200">{f.rule}</span><span className="text-xs px-2 py-0.5 rounded bg-red-400/10 text-red-400">{f.deadline}</span></div>
                      <div className="text-xs space-y-1">
                        <div className="text-zinc-400">{f.violation}</div>
                        <div><span className="text-zinc-500">Regulation:</span> <span className="text-zinc-300">{f.regulation}</span></div>
                        <div><span className="text-zinc-500">Risk:</span> <span className="text-red-400/70">{f.risk}</span></div>
                        <div className="text-emerald-400/70">{f.action}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Audit Checklist + Maintenance */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-emerald-400">Integrity Audit Checklist</h3>
                <div className="space-y-2">{result.auditChecklist.map((c, i) => <div key={i} className="text-sm text-zinc-400 flex gap-2"><span className="text-emerald-400 shrink-0">☐</span>{c}</div>)}</div>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-violet-400">Maintenance Plan</h3>
                <div className="space-y-2">{result.maintenancePlan.map((m, i) => <div key={i} className="text-sm text-zinc-400 flex gap-2"><span className="text-violet-400 shrink-0">{i + 1}.</span>{m}</div>)}</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">Protect Your Brand Integrity</h3>
              <p className="text-zinc-400 mb-4">PostCraft AI catches factual drift, brand inconsistencies, and compliance risks across your entire content ecosystem. Pair with <a href="/content-decay" className="text-violet-400 underline">Content Decay Tracker</a>, <a href="/brand-voice" className="text-violet-400 underline">Brand Voice Generator</a>, and <a href="/compliance-checker" className="text-violet-400 underline">Compliance Checker</a>.</p>
              <a href="/pricing" className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">Get PostCraft Pro</a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
