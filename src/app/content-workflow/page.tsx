'use client';
import { useState } from 'react';

const teamSizes = ['Solo Creator', 'Small Team (2-5)', 'Medium Team (6-15)', 'Large Team (16-50)', 'Enterprise (50+)'] as const;
const contentTypes = ['Blog Posts', 'Social Media', 'Email Campaigns', 'Video Content', 'Landing Pages', 'All Content Types'] as const;
const cadences = ['Daily', '3x per Week', 'Weekly', 'Biweekly', 'Monthly'] as const;
const industries = ['Tech & SaaS', 'E-commerce & DTC', 'Healthcare', 'Finance & FinTech', 'Education', 'Real Estate', 'Agency & Consulting', 'Media & Publishing'] as const;
const complexities = ['Simple (draft → publish)', 'Standard (draft → review → publish)', 'Complex (draft → review → design → approve → publish)', 'Enterprise (brief → draft → SME review → legal → design → approve → QA → publish)'] as const;

interface WorkflowStage { name: string; owner: string; duration: string; dependencies: string; deliverable: string; qualityGate: string; automatable: string; }
interface Bottleneck { stage: string; severity: string; avgDelay: string; rootCause: string; impact: string; fix: string; expectedImprovement: string; }
interface ApprovalChain { level: number; role: string; responsibility: string; turnaround: string; escalation: string; bypass: string; }
interface ResourceAllocation { role: string; capacity: string; currentLoad: string; utilization: number; recommendation: string; }
interface AutomationOpportunity { task: string; currentTime: string; automatedTime: string; tool: string; savingsPerWeek: string; implementation: string; }
interface QualityCheckpoint { stage: string; checks: string[]; passRate: string; commonFailures: string; }

interface WorkflowReport {
  efficiencyScore: number;
  bottleneckRisk: string;
  stages: WorkflowStage[];
  bottlenecks: Bottleneck[];
  approvalChain: ApprovalChain[];
  resources: ResourceAllocation[];
  automations: AutomationOpportunity[];
  qualityCheckpoints: QualityCheckpoint[];
  weeklyCapacity: string;
  timeToPublish: string;
  optimizedTimeToPublish: string;
  quickWins: string[];
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }

function buildWorkflow(teamSize: string, contentType: string, cadence: string, industry: string, complexity: string, brand: string): WorkflowReport {
  const seed = hash(`${teamSize}-${contentType}-${cadence}-${industry}-${complexity}-${brand}`);
  const efficiencyScore = 20 + seed % 70;
  const bottleneckRisk = efficiencyScore >= 80 ? 'Low — Streamlined Pipeline' : efficiencyScore >= 60 ? 'Moderate — Some Friction Points' : efficiencyScore >= 40 ? 'High — Multiple Bottlenecks Detected' : 'Critical — Workflow Needs Restructuring';

  const stages: WorkflowStage[] = [
    { name: 'Content Brief & Ideation', owner: seed % 2 === 0 ? 'Content Strategist' : 'Marketing Lead', duration: `${seed % 3 + 1} hours`, dependencies: 'Content calendar, keyword research, competitor analysis', deliverable: 'Approved brief with target keywords, audience persona, and success metrics', qualityGate: 'Brief must include: topic, angle, target persona, primary CTA, SEO keywords, and deadline', automatable: 'Brief template generation, keyword suggestions, competitor gap detection' },
    { name: 'Research & Outline', owner: seed % 2 === 0 ? 'Content Writer' : 'Subject Matter Expert', duration: `${seed % 4 + 2} hours`, dependencies: 'Approved brief, access to research tools and SME interviews', deliverable: 'Structured outline with H2/H3 hierarchy, source list, and key data points', qualityGate: 'Outline must cover all brief requirements, include 3+ credible sources, and follow brand voice guidelines', automatable: 'Source aggregation, outline structure suggestions, fact-checking against existing content' },
    { name: 'First Draft', owner: 'Content Writer', duration: `${seed % 8 + 4} hours`, dependencies: 'Approved outline, brand voice guidelines, style guide', deliverable: 'Complete first draft with all sections, CTAs, meta description, and internal links', qualityGate: 'Draft meets word count target, includes all required sections, passes readability score (Flesch 60+)', automatable: 'Grammar check, readability scoring, SEO optimization suggestions, internal link recommendations' },
    { name: 'Editorial Review', owner: seed % 2 === 0 ? 'Editor' : 'Content Lead', duration: `${seed % 3 + 1} hours`, dependencies: 'First draft, editorial checklist, brand style guide', deliverable: 'Marked-up draft with tracked changes and editorial comments', qualityGate: 'No factual errors, brand voice alignment 90%+, SEO checklist 100% complete', automatable: 'Automated style guide enforcement, duplicate content detection, SEO audit' },
    { name: 'Design & Visual Assets', owner: 'Designer', duration: `${seed % 6 + 2} hours`, dependencies: 'Final copy, brand asset library, image specifications per platform', deliverable: 'All visual assets: featured image, social graphics, infographics, video thumbnails', qualityGate: 'Assets match brand guidelines, correct dimensions per platform, accessibility (alt text, contrast)', automatable: 'Template-based design generation, image resizing for platforms, alt text suggestions' },
    { name: 'Stakeholder Approval', owner: seed % 2 === 0 ? 'Marketing Director' : 'Product Manager', duration: `${seed % 24 + 4} hours`, dependencies: 'Final content + visuals package, compliance checklist', deliverable: 'Written approval with any final change requests', qualityGate: 'Compliance check passed, brand alignment confirmed, legal review (if required)', automatable: 'Automated routing to correct approver, deadline reminders, approval status dashboard' },
    { name: 'Publishing & Distribution', owner: 'Content Operations', duration: `${seed % 2 + 1} hours`, dependencies: 'Approved content, CMS access, distribution channels configured', deliverable: 'Published content across all target platforms with correct scheduling', qualityGate: 'Links working, tracking pixels active, social shares scheduled, email notification sent', automatable: 'Multi-platform publishing, social scheduling, UTM parameter generation, notification triggers' },
  ];

  const bottlenecks: Bottleneck[] = [
    { stage: 'Stakeholder Approval', severity: 'Critical', avgDelay: `${seed % 48 + 24} hours`, rootCause: 'Single approver bottleneck — all content funnels through one person who has competing priorities', impact: `Delays ${seed % 5 + 3} pieces per week, creating a publishing backlog that compounds weekly`, fix: 'Implement tiered approval: routine content auto-approved by editor, only strategic pieces need director sign-off', expectedImprovement: '70-80% reduction in approval wait time' },
    { stage: 'Design & Visual Assets', severity: 'High', avgDelay: `${seed % 24 + 12} hours`, rootCause: `Designer overloaded — ${seed % 3 + 1} designers handling ${seed % 20 + 15} content pieces per week across ${seed % 3 + 2} channels`, impact: 'Content sits in "waiting for design" queue for 2-3 days, missing optimal publish windows', fix: 'Create a template library for 80% of recurring formats. Reserve designer time only for custom/hero content', expectedImprovement: '60% faster asset turnaround for templated content' },
    { stage: 'Editorial Review', severity: 'Medium', avgDelay: `${seed % 12 + 4} hours`, rootCause: 'No editorial calendar visibility — editor receives drafts without warning, causing batch reviews instead of flow', impact: 'Writers wait 1-2 days for feedback, breaking creative momentum and causing context-switching costs', fix: 'Add editorial slots to content calendar — editor reviews 2-3 pieces daily at fixed times instead of batching', expectedImprovement: '50% faster review turnaround, smoother writer flow' },
    { stage: 'Research & Outline', severity: 'Medium', avgDelay: `${seed % 8 + 3} hours`, rootCause: 'SME interviews not scheduled proactively — writers chase experts who are in back-to-back meetings', impact: 'Technical content delayed by 3-5 days waiting for expert input, reducing content accuracy and depth', fix: 'Block recurring "content office hours" for SMEs. Pre-schedule interviews when brief is approved', expectedImprovement: '40% reduction in research phase duration' },
    { stage: 'Content Brief & Ideation', severity: 'Low', avgDelay: `${seed % 4 + 1} hours`, rootCause: 'Brief template is too vague — writers interpret requirements differently, causing rework downstream', impact: 'Misaligned expectations lead to 30% of drafts requiring major revisions', fix: 'Create a detailed brief template with mandatory fields, examples, and a "definition of done" checklist', expectedImprovement: '25% reduction in revision rounds' },
  ];

  const approvalChain: ApprovalChain[] = [
    { level: 1, role: 'Content Writer (Self-Review)', responsibility: 'Grammar, style guide compliance, SEO checklist, internal links', turnaround: '30 min', escalation: 'Auto-forwards to editor after self-review checklist is complete', bypass: 'Never — self-review is mandatory for all content' },
    { level: 2, role: 'Editor / Content Lead', responsibility: 'Brand voice, factual accuracy, editorial quality, content strategy alignment', turnaround: `${seed % 4 + 2} hours`, escalation: `If no response in ${seed % 8 + 4} hours, auto-notify team lead + add to daily standup`, bypass: 'Pre-approved templates (social posts, recurring formats) skip to Level 3' },
    { level: 3, role: 'Design Review', responsibility: 'Visual brand compliance, asset quality, platform-specific formatting', turnaround: `${seed % 4 + 1} hours`, escalation: 'Templated content auto-approved if using brand-approved templates', bypass: 'Text-only content (emails, simple social posts) skips design review' },
    { level: 4, role: seed % 2 === 0 ? 'Marketing Director' : 'VP Marketing', responsibility: 'Strategic alignment, campaign coherence, high-stakes content approval', turnaround: `${seed % 24 + 8} hours`, escalation: `Auto-approved after ${seed % 48 + 24} hours if no response (with notification)`, bypass: 'Only required for: product launches, PR statements, partnership announcements, paid campaigns > $5K' },
    { level: 5, role: 'Legal / Compliance (if flagged)', responsibility: 'Regulatory compliance, claim substantiation, trademark/copyright review', turnaround: `${seed % 48 + 24} hours`, escalation: 'Cannot be bypassed or auto-approved — escalate to General Counsel if overdue', bypass: `Only triggered for: ${industry} regulatory content, testimonials with specific claims, competitive comparisons` },
  ];

  const resources: ResourceAllocation[] = [
    { role: 'Content Strategist', capacity: `${seed % 3 + 2} briefs/day`, currentLoad: `${seed % 5 + 3} briefs/day`, utilization: Math.min(95, 60 + seed % 35), recommendation: seed % 2 === 0 ? 'At capacity — automate brief generation for recurring content types' : 'Overloaded — delegate routine briefs to AI-assisted template system' },
    { role: 'Content Writer', capacity: `${seed % 3 + 2} pieces/week`, currentLoad: `${seed % 5 + 3} pieces/week`, utilization: Math.min(95, 55 + seed % 40), recommendation: 'Use AI drafting for first 60% of routine content — writer focuses on expert editing and original insights' },
    { role: 'Editor', capacity: `${seed % 5 + 5} reviews/day`, currentLoad: `${seed % 8 + 6} reviews/day`, utilization: Math.min(95, 65 + seed % 30), recommendation: 'Implement tiered review: AI auto-checks grammar/style, editor focuses on strategy and brand voice' },
    { role: 'Designer', capacity: `${seed % 3 + 3} assets/day`, currentLoad: `${seed % 6 + 5} assets/day`, utilization: Math.min(95, 70 + seed % 25), recommendation: 'Build a Canva/Figma template library for 80% of formats — designer only handles custom/hero work' },
    { role: 'Approver / Stakeholder', capacity: `${seed % 5 + 5} approvals/week`, currentLoad: `${seed % 10 + 8} approvals/week`, utilization: Math.min(95, 50 + seed % 45), recommendation: 'Implement auto-approval for routine content that passes all quality gates. Reserve human approval for strategic pieces only' },
  ];

  const automations: AutomationOpportunity[] = [
    { task: 'Content brief generation', currentTime: `${seed % 30 + 30} min`, automatedTime: '5 min', tool: 'PostCraft AI + brief template engine', savingsPerWeek: `${seed % 3 + 2} hours`, implementation: 'Connect PostCraft to your content calendar — auto-generate briefs from planned topics with pre-filled SEO data' },
    { task: 'SEO optimization check', currentTime: `${seed % 20 + 15} min per piece`, automatedTime: '2 min (auto-scan)', tool: 'Automated SEO audit + PostCraft Intent Flow', savingsPerWeek: `${seed % 4 + 3} hours`, implementation: 'Add SEO auto-check as a quality gate — content cannot advance to review without passing minimum SEO score' },
    { task: 'Social media asset resizing', currentTime: `${seed % 15 + 10} min per platform`, automatedTime: '1 min (batch resize)', tool: 'Template system + auto-resize API', savingsPerWeek: `${seed % 5 + 4} hours`, implementation: 'Create master templates in 3 sizes. Auto-generate platform variants from hero asset' },
    { task: 'Multi-platform scheduling', currentTime: `${seed % 20 + 10} min per piece`, automatedTime: '2 min (one-click)', tool: 'Social scheduler + PostCraft campaign mode', savingsPerWeek: `${seed % 3 + 2} hours`, implementation: 'Configure once: publish trigger auto-schedules to all platforms with platform-optimized variants' },
    { task: 'Approval routing & reminders', currentTime: `${seed % 15 + 5} min (manual follow-up)`, automatedTime: '0 min (automated)', tool: 'Workflow automation (Zapier/n8n + Slack)', savingsPerWeek: `${seed % 3 + 1} hours`, implementation: 'Auto-route content to correct approver based on content type. Auto-escalate after SLA breach' },
    { task: 'Performance reporting', currentTime: `${seed % 60 + 30} min per report`, automatedTime: '5 min (auto-generated)', tool: 'PostCraft Monthly Report + analytics API', savingsPerWeek: `${seed % 2 + 1} hours`, implementation: 'Auto-pull metrics at T+7 days post-publish. Generate performance card per piece and aggregate dashboard' },
  ];

  const qualityCheckpoints: QualityCheckpoint[] = [
    { stage: 'Brief Approval', checks: ['Target persona defined', 'Primary keyword with search volume', 'Clear success metric', 'Deadline realistic for team capacity', 'No duplicate topic in last 90 days'], passRate: `${60 + seed % 35}%`, commonFailures: 'Missing success metrics (42%), vague persona (28%), keyword cannibalization (18%)' },
    { stage: 'Draft Review', checks: ['Word count within 10% of target', 'All H2/H3 from outline present', 'Readability Flesch 60+', 'Internal links (min 3)', 'CTA present in intro + conclusion'], passRate: `${55 + seed % 35}%`, commonFailures: 'Missing CTAs (35%), readability too low (25%), outline sections skipped (22%)' },
    { stage: 'Editorial Sign-off', checks: ['Brand voice score 90%+', 'Zero factual errors', 'No plagiarism detected', 'Meta description 150-160 chars', 'All claims sourced'], passRate: `${70 + seed % 25}%`, commonFailures: 'Unsourced statistics (30%), brand voice drift (25%), weak meta descriptions (20%)' },
    { stage: 'Pre-Publish QA', checks: ['All links functional', 'Images optimized + alt text', 'Schema markup correct', 'Mobile rendering verified', 'UTM tracking configured'], passRate: `${65 + seed % 30}%`, commonFailures: 'Missing alt text (40%), broken internal links (22%), missing UTMs (20%)' },
  ];

  const totalHours = stages.reduce((sum, s) => sum + parseInt(s.duration), 0);
  const timeToPublish = `${totalHours} hours (${Math.ceil(totalHours / 8)} business days)`;
  const optimizedHours = Math.ceil(totalHours * 0.45);
  const optimizedTimeToPublish = `${optimizedHours} hours (${Math.ceil(optimizedHours / 8)} business days) — ${Math.round((1 - optimizedHours / totalHours) * 100)}% faster`;
  const weeklyCapacity = `${Math.floor(40 / totalHours * (teamSize.includes('Solo') ? 1 : teamSize.includes('2-5') ? 3 : teamSize.includes('6-15') ? 8 : 15))} pieces/week at current efficiency`;

  const quickWins = [
    'Create a content brief template with mandatory fields — eliminate 30% of revision rounds caused by misaligned expectations',
    `Implement auto-approval for routine ${contentType.toLowerCase()} that pass all quality gates — free up ${seed % 10 + 5} hours/week of stakeholder time`,
    'Build a visual asset template library for your top 5 formats — reduce design turnaround from days to hours',
    'Add fixed "editorial review slots" to the calendar — stop batch reviews that create 2-day delays',
    'Set up automated SEO checks as a draft quality gate — catch optimization gaps before review, not after',
    'Block recurring SME office hours — proactive scheduling saves 3-5 days per technical content piece',
    'Implement a content status dashboard visible to all team members — eliminate "where is my piece?" Slack messages',
    `Use PostCraft AI to generate first drafts for routine ${contentType.toLowerCase()} — writer becomes editor, not author`,
  ];

  return { efficiencyScore, bottleneckRisk, stages, bottlenecks, approvalChain, resources, automations, qualityCheckpoints, weeklyCapacity, timeToPublish, optimizedTimeToPublish, quickWins };
}

export default function ContentWorkflowPage() {
  const [teamSize, setTeamSize] = useState(teamSizes[0]);
  const [contentType, setContentType] = useState(contentTypes[0]);
  const [cadence, setCadence] = useState(cadences[0]);
  const [industry, setIndustry] = useState(industries[0]);
  const [complexity, setComplexity] = useState(complexities[0]);
  const [brand, setBrand] = useState('');
  const [result, setResult] = useState<WorkflowReport | null>(null);

  const handleGenerate = () => { if (brand.trim()) setResult(buildWorkflow(teamSize, contentType, cadence, industry, complexity, brand)); };
  const scoreColor = (n: number) => n >= 80 ? '#34d399' : n >= 60 ? '#a3e635' : n >= 40 ? '#fbbf24' : '#f87171';
  const sevColor = (s: string) => s === 'Low' ? '#34d399' : s === 'Medium' ? '#fbbf24' : s === 'High' ? '#fb923c' : '#f87171';

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Content Workflow Builder</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Design automated content production workflows with stages, assignments, deadlines, approval chains, and bottleneck detection. Stop managing chaos — build a system that scales with your team.</p>

        <div className="mb-4">
          <label className="block text-sm text-zinc-400 mb-1">Brand / Company Name</label>
          <input type="text" value={brand} onChange={e => setBrand(e.target.value)} placeholder="e.g., PostCraft, Acme Corp" className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-3 text-zinc-100" />
        </div>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {([
            { label: 'Team Size', value: teamSize, setter: setTeamSize as (v: string) => void, options: teamSizes as readonly string[] },
            { label: 'Content Type', value: contentType, setter: setContentType as (v: string) => void, options: contentTypes as readonly string[] },
            { label: 'Publishing Cadence', value: cadence, setter: setCadence as (v: string) => void, options: cadences as readonly string[] },
            { label: 'Industry', value: industry, setter: setIndustry as (v: string) => void, options: industries as readonly string[] },
            { label: 'Workflow Complexity', value: complexity, setter: setComplexity as (v: string) => void, options: complexities as readonly string[] },
          ] as const).map(({ label, value, setter, options }) => (
            <div key={label}>
              <label className="block text-sm text-zinc-400 mb-1">{label}</label>
              <select value={value} onChange={e => setter(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100">
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
        <button onClick={handleGenerate} className="w-full md:w-auto bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded font-semibold hover:opacity-90 transition mb-8">Build Workflow</button>

        {result && (
          <div className="space-y-8">
            {/* Efficiency Score */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 text-center">
              <div className="text-5xl font-bold mb-2" style={{ color: scoreColor(result.efficiencyScore) }}>{result.efficiencyScore}</div>
              <div className="text-zinc-400 mb-2">Workflow Efficiency Score</div>
              <div className="text-lg font-semibold mb-3" style={{ color: scoreColor(result.efficiencyScore) }}>{result.bottleneckRisk}</div>
              <div className="mt-3 max-w-md mx-auto w-full bg-zinc-800 rounded-full h-3">
                <div className="h-3 rounded-full transition-all" style={{ width: `${result.efficiencyScore}%`, background: scoreColor(result.efficiencyScore) }} />
              </div>
              <div className="mt-4 grid md:grid-cols-3 gap-3 text-sm">
                <div className="bg-zinc-800/40 rounded-lg p-3"><span className="text-zinc-500">Current Time-to-Publish</span><div className="text-amber-400 font-semibold">{result.timeToPublish}</div></div>
                <div className="bg-zinc-800/40 rounded-lg p-3"><span className="text-zinc-500">Optimized Time-to-Publish</span><div className="text-emerald-400 font-semibold">{result.optimizedTimeToPublish}</div></div>
                <div className="bg-zinc-800/40 rounded-lg p-3"><span className="text-zinc-500">Weekly Capacity</span><div className="text-violet-400 font-semibold">{result.weeklyCapacity}</div></div>
              </div>
            </div>

            {/* Workflow Stages */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Workflow Stages ({result.stages.length})</h3>
              <div className="space-y-3">
                {result.stages.map((s, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-1 rounded bg-violet-400/10 text-violet-400 font-mono">Stage {i + 1}</span>
                        <span className="font-semibold text-zinc-200">{s.name}</span>
                      </div>
                      <span className="text-xs text-zinc-400">{s.duration}</span>
                    </div>
                    <div className="text-xs space-y-1">
                      <div><span className="text-zinc-500">Owner:</span> <span className="text-zinc-300">{s.owner}</span></div>
                      <div><span className="text-zinc-500">Dependencies:</span> <span className="text-zinc-300">{s.dependencies}</span></div>
                      <div><span className="text-zinc-500">Deliverable:</span> <span className="text-emerald-400/70">{s.deliverable}</span></div>
                      <div><span className="text-zinc-500">Quality Gate:</span> <span className="text-amber-400/70">{s.qualityGate}</span></div>
                      <div><span className="text-zinc-500">Automatable:</span> <span className="text-violet-400/70">{s.automatable}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottlenecks */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-red-400">Bottleneck Detection ({result.bottlenecks.length})</h3>
              <div className="space-y-3">
                {result.bottlenecks.map((b, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-zinc-200">{b.stage}</span>
                      <div className="flex gap-2">
                        <span className="text-xs px-2 py-1 rounded font-bold" style={{ color: sevColor(b.severity), background: `${sevColor(b.severity)}15` }}>{b.severity}</span>
                        <span className="text-xs px-2 py-1 rounded bg-zinc-700 text-zinc-300">Avg delay: {b.avgDelay}</span>
                      </div>
                    </div>
                    <div className="text-xs space-y-1">
                      <div><span className="text-zinc-500">Root Cause:</span> <span className="text-zinc-300">{b.rootCause}</span></div>
                      <div><span className="text-zinc-500">Impact:</span> <span className="text-red-400/70">{b.impact}</span></div>
                      <div><span className="text-zinc-500">Fix:</span> <span className="text-emerald-400/70">{b.fix}</span></div>
                      <div><span className="text-zinc-500">Expected Improvement:</span> <span className="text-violet-400/70">{b.expectedImprovement}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Approval Chain + Resources */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-violet-400">Approval Chain</h3>
                <div className="space-y-3">
                  {result.approvalChain.map((a, i) => (
                    <div key={i} className="bg-zinc-800/40 rounded-lg p-3 border border-zinc-700/50">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs px-2 py-0.5 rounded bg-violet-400/10 text-violet-400">L{a.level}</span>
                        <span className="text-sm font-semibold text-zinc-200">{a.role}</span>
                        <span className="text-xs text-zinc-500 ml-auto">{a.turnaround}</span>
                      </div>
                      <div className="text-xs space-y-1">
                        <div className="text-zinc-400">{a.responsibility}</div>
                        <div><span className="text-zinc-500">Escalation:</span> <span className="text-amber-400/70">{a.escalation}</span></div>
                        <div><span className="text-zinc-500">Bypass:</span> <span className="text-zinc-300">{a.bypass}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-amber-400">Resource Allocation</h3>
                <div className="space-y-3">
                  {result.resources.map((r, i) => (
                    <div key={i} className="bg-zinc-800/40 rounded-lg p-3 border border-zinc-700/50">
                      <div className="flex justify-between mb-1"><span className="text-sm font-semibold text-zinc-200">{r.role}</span><span className="text-xs font-bold" style={{ color: scoreColor(100 - r.utilization) }}>{r.utilization}%</span></div>
                      <div className="w-full bg-zinc-700 rounded-full h-2 mb-2"><div className="h-2 rounded-full" style={{ width: `${r.utilization}%`, background: r.utilization > 85 ? '#f87171' : r.utilization > 70 ? '#fbbf24' : '#34d399' }} /></div>
                      <div className="text-xs space-y-0.5">
                        <div className="flex gap-3"><span className="text-zinc-500">Capacity: {r.capacity}</span><span className="text-zinc-500">Load: {r.currentLoad}</span></div>
                        <div className="text-emerald-400/70">{r.recommendation}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Automation Opportunities */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-emerald-400">Automation Opportunities ({result.automations.length})</h3>
              <div className="space-y-3">
                {result.automations.map((a, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-zinc-200">{a.task}</span>
                      <span className="text-xs px-2 py-1 rounded bg-emerald-400/10 text-emerald-400">Saves {a.savingsPerWeek}/week</span>
                    </div>
                    <div className="text-xs space-y-1">
                      <div className="flex gap-4"><span className="text-red-400/60">Manual: {a.currentTime}</span><span className="text-emerald-400">Automated: {a.automatedTime}</span></div>
                      <div><span className="text-zinc-500">Tool:</span> <span className="text-zinc-300">{a.tool}</span></div>
                      <div><span className="text-zinc-500">How:</span> <span className="text-violet-400/70">{a.implementation}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality Checkpoints */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Quality Checkpoints</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {result.qualityCheckpoints.map((q, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex justify-between mb-2"><span className="font-semibold text-zinc-200">{q.stage}</span><span className="text-xs font-bold" style={{ color: parseInt(q.passRate) >= 75 ? '#34d399' : parseInt(q.passRate) >= 60 ? '#fbbf24' : '#f87171' }}>{q.passRate} pass rate</span></div>
                    <div className="space-y-1 mb-2">{q.checks.map((c, j) => <div key={j} className="text-xs text-zinc-400 flex gap-1"><span className="text-emerald-400/50 shrink-0">&#x2713;</span>{c}</div>)}</div>
                    <div className="text-xs"><span className="text-zinc-500">Common failures:</span> <span className="text-red-400/70">{q.commonFailures}</span></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Wins */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-emerald-400">Quick Wins — Implement This Week</h3>
              <div className="space-y-2">{result.quickWins.map((w, i) => <div key={i} className="text-sm text-zinc-400 flex gap-2"><span className="text-emerald-400 shrink-0">{i + 1}.</span>{w}</div>)}</div>
            </div>

            <div className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">Stop Managing Chaos. Build a Content Machine.</h3>
              <p className="text-zinc-400 mb-4">PostCraft AI designs production-ready workflows that scale with your team. Pair with <a href="/content-calendar" className="text-violet-400 underline">Content Calendar</a>, <a href="/content-flow" className="text-violet-400 underline">Content Flow Optimizer</a>, and <a href="/bulk-generator" className="text-violet-400 underline">Bulk Content Generator</a>.</p>
              <a href="/pricing" className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">Get PostCraft Pro</a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
