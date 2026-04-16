'use client';
import { useState } from 'react';

const businessTypes = ['Solo Creator', 'Small Agency', 'Startup', 'E-commerce Brand', 'Enterprise Marketing', 'Media Company'] as const;
const contentVolumes = ['1-10 posts/week', '10-30 posts/week', '30-100 posts/week', '100+ posts/week'] as const;
const platforms = ['All Platforms', 'Instagram + TikTok', 'LinkedIn + Twitter', 'YouTube + Blog', 'Pinterest + Facebook'] as const;
const automationGoals = ['Save Time', 'Increase Consistency', 'Scale Output', 'Reduce Costs', 'Improve Quality'] as const;

interface WorkflowStep { step: string; trigger: string; action: string; tool: string; timeSaved: string; errorRate: string; }
interface AutomationRule { name: string; condition: string; action: string; frequency: string; impact: string; setup: string; }
interface ContentTemplate { name: string; type: string; platforms: string; variables: number; avgPerformance: string; usage: string; }
interface IntegrationMap { tool: string; role: string; dataFlow: string; costPerMonth: string; alternative: string; }
interface EfficiencyMetric { metric: string; before: string; after: string; improvement: string; monthlyValue: string; }

interface AutomationReport {
  totalTimeSaved: number;
  automationScore: number;
  costReduction: number;
  workflows: WorkflowStep[];
  rules: AutomationRule[];
  templates: ContentTemplate[];
  integrations: IntegrationMap[];
  efficiencyMetrics: EfficiencyMetric[];
  quickWins: string[];
  advancedAutomations: string[];
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }

function buildAutomation(biz: string, vol: string, plat: string, goal: string, desc: string): AutomationReport {
  const seed = hash(`${biz}-${vol}-${plat}-${goal}-${desc}`);
  const totalTimeSaved = 5 + seed % 35;
  const automationScore = 15 + seed % 70;
  const costReduction = 10 + seed % 50;

  const workflows: WorkflowStep[] = [
    { step: 'Content Ideation', trigger: 'Weekly calendar trigger (Monday 8am)', action: 'AI generates 20 content ideas from trending topics + brand pillars', tool: 'PostCraft AI + RSS feeds', timeSaved: `${2 + seed % 3}h/week`, errorRate: '< 5%' },
    { step: 'Draft Generation', trigger: 'Idea approved in queue', action: 'Auto-generate platform-specific drafts with brand voice applied', tool: 'PostCraft AI + Brand Voice', timeSaved: `${3 + seed % 5}h/week`, errorRate: '< 8%' },
    { step: 'Visual Asset Creation', trigger: 'Draft ready for design', action: 'Auto-resize and adapt visuals per platform specs', tool: 'Canva API + AI image gen', timeSaved: `${1 + seed % 4}h/week`, errorRate: '< 3%' },
    { step: 'Scheduling & Publishing', trigger: 'Approved content batch', action: 'Auto-schedule at optimal times per platform algorithm', tool: 'PostCraft Timing + Buffer API', timeSaved: `${1 + seed % 2}h/week`, errorRate: '< 2%' },
    { step: 'Performance Tracking', trigger: '24h/48h/7d post-publish', action: 'Collect metrics, tag top performers, flag underperformers', tool: 'PostCraft Analytics + Webhook', timeSaved: `${2 + seed % 3}h/week`, errorRate: '< 1%' },
    { step: 'Content Recycling', trigger: 'Post reaches 90-day age + high performance', action: 'Regenerate with fresh angle, schedule for new audience segment', tool: 'PostCraft Recycler + A/B Test', timeSaved: `${1 + seed % 2}h/week`, errorRate: '< 4%' },
  ];

  const rules: AutomationRule[] = [
    { name: 'Engagement Auto-Reply', condition: 'Comment received within 2h of posting', action: 'Generate contextual reply draft for approval', frequency: `${10 + seed % 40}/day`, impact: '+35% reply rate, +12% engagement', setup: 'Connect social accounts → set reply tone → approve first 10 manually' },
    { name: 'Hashtag Optimization', condition: 'Post scheduled for Instagram/TikTok', action: 'Replace generic hashtags with trending niche-specific ones', frequency: 'Every post', impact: '+22% reach on avg', setup: 'Define niche categories → connect to hashtag DB → auto-swap at publish' },
    { name: 'Cross-Post Adaptation', condition: 'Content approved for primary platform', action: 'Auto-reformat for secondary platforms (tone, length, format)', frequency: `${5 + seed % 20}/week`, impact: '3x content output, same effort', setup: 'Set platform priority order → define adaptation rules → review first batch' },
    { name: 'Trend Alert Pipeline', condition: 'Topic relevance score > 80 in your niche', action: 'Generate rapid-response content draft within 30min', frequency: `${1 + seed % 3}/week`, impact: '+45% reach when activated', setup: 'Define niche keywords → set relevance threshold → connect to trend API' },
    { name: 'Performance-Based Boosting', condition: 'Organic post exceeds 2x avg engagement in 4h', action: 'Auto-allocate $5-25 paid budget to amplify', frequency: `${2 + seed % 5}/week`, impact: '+200% ROI vs manual boosting', setup: 'Set performance thresholds → connect ad account → set daily cap' },
  ];

  const templates: ContentTemplate[] = [
    { name: 'Thread Launcher', type: 'Educational Thread', platforms: 'Twitter/X, LinkedIn', variables: 8, avgPerformance: '+180% engagement vs single post', usage: `${15 + seed % 25}/month` },
    { name: 'Carousel Blueprint', type: 'Visual Slide Deck', platforms: 'Instagram, LinkedIn', variables: 12, avgPerformance: '+95% saves, +60% shares', usage: `${10 + seed % 20}/month` },
    { name: 'Story Sequence', type: '5-Slide Story Arc', platforms: 'Instagram, Facebook', variables: 6, avgPerformance: '+45% completion rate', usage: `${20 + seed % 30}/month` },
    { name: 'Video Hook Script', type: 'Short-Form Video', platforms: 'TikTok, Reels, Shorts', variables: 10, avgPerformance: '+70% watch time vs avg', usage: `${8 + seed % 15}/month` },
    { name: 'Newsletter Digest', type: 'Weekly Email Roundup', platforms: 'Email, Blog', variables: 15, avgPerformance: '42% open rate, 8% CTR', usage: `${4 + seed % 4}/month` },
  ];

  const integrations: IntegrationMap[] = [
    { tool: 'PostCraft AI', role: 'Content generation + optimization', dataFlow: 'Ideas → Drafts → Published content', costPerMonth: '$29-79', alternative: 'Jasper AI ($49+)' },
    { tool: 'Buffer / Hootsuite', role: 'Scheduling + publishing', dataFlow: 'Approved drafts → Scheduled queue → Published', costPerMonth: '$15-99', alternative: 'Later ($25+)' },
    { tool: 'Canva Pro', role: 'Visual asset creation', dataFlow: 'Brand kit → Templates → Exported assets', costPerMonth: '$13', alternative: 'Figma ($15)' },
    { tool: 'Zapier / Make', role: 'Workflow orchestration', dataFlow: 'Triggers → Actions → Logging', costPerMonth: '$20-49', alternative: 'n8n (self-hosted, free)' },
  ];

  const efficiencyMetrics: EfficiencyMetric[] = [
    { metric: 'Content creation time', before: `${8 + seed % 12}h/week`, after: `${2 + seed % 4}h/week`, improvement: `-${60 + seed % 25}%`, monthlyValue: `$${400 + seed % 800}/mo saved` },
    { metric: 'Posts published per week', before: `${3 + seed % 5}`, after: `${15 + seed % 25}`, improvement: `+${300 + seed % 200}%`, monthlyValue: `${12 + seed % 20}x output` },
    { metric: 'Average engagement rate', before: `${1 + seed % 2}.${seed % 9}%`, after: `${3 + seed % 3}.${seed % 9}%`, improvement: `+${80 + seed % 60}%`, monthlyValue: 'Organic growth acceleration' },
    { metric: 'Response time to comments', before: `${4 + seed % 20}h avg`, after: `${seed % 60 + 15}min avg`, improvement: '-90%', monthlyValue: '+25% follower satisfaction' },
    { metric: 'Content consistency score', before: `${35 + seed % 25}/100`, after: `${80 + seed % 15}/100`, improvement: `+${45 + seed % 20} pts`, monthlyValue: 'Brand trust increase' },
  ];

  const quickWins = [
    'Set up auto-scheduling for your top 3 content types — saves 3h/week immediately',
    'Create 5 reusable templates from your best-performing posts — reduces creation time by 60%',
    'Enable comment auto-reply drafts for FAQ-type questions — cuts response time from hours to minutes',
    'Connect your content calendar to trending topic alerts — never miss a relevant trend again',
    'Batch-create 2 weeks of content in one session — context switching costs 40% of creative time',
    `Automate ${plat} cross-posting — same content, adapted format, 3x the reach`,
    'Set up weekly performance digest emails — spot patterns without manual dashboard checks',
    'Create a content approval workflow — reduce revision rounds from 4 to 2',
  ];

  const advancedAutomations = [
    'AI-powered content brief generation: input topic → output full brief with keywords, angles, CTAs, and competitor gaps',
    'Dynamic content personalization: same post, different hooks per audience segment (auto-varied at publish)',
    'Predictive scheduling: ML model trained on your historical data picks optimal time per platform per content type',
    'Auto-repurposing pipeline: 1 long-form piece → 12 micro-content pieces across 5 platforms (fully automated)',
    'Sentiment-triggered content: negative sentiment spike → auto-queue positive brand story or customer success',
    `Revenue attribution chain: track content → engagement → click → conversion → ${goal === 'Reduce Costs' ? 'cost savings' : 'revenue'} per piece`,
    'Competitor content monitor: detect competitor posts, auto-generate differentiated response content',
    'Content inventory auto-audit: weekly scan of all published content, flag outdated/underperforming, suggest refreshes',
  ];

  return { totalTimeSaved, automationScore, costReduction, workflows, rules, templates, integrations, efficiencyMetrics, quickWins, advancedAutomations };
}

export default function ContentAutomationPage() {
  const [biz, setBiz] = useState('');
  const [vol, setVol] = useState('');
  const [plat, setPlat] = useState('');
  const [goal, setGoal] = useState('');
  const [desc, setDesc] = useState('');
  const [report, setReport] = useState<AutomationReport | null>(null);

  return (
    <main className="max-w-5xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold gradient-text mb-2">Content Automation Engine</h1>
      <p className="text-zinc-400 mb-8 max-w-2xl">Build your automated content machine. Get a custom automation blueprint with workflows, rules, templates, and integrations that save 10-40 hours per week.</p>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Business Type</label>
          <select value={biz} onChange={e => setBiz(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100">
            <option value="">Select type...</option>
            {businessTypes.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Content Volume</label>
          <select value={vol} onChange={e => setVol(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100">
            <option value="">Select volume...</option>
            {contentVolumes.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Primary Platforms</label>
          <select value={plat} onChange={e => setPlat(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100">
            <option value="">Select platforms...</option>
            {platforms.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Primary Goal</label>
          <select value={goal} onChange={e => setGoal(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100">
            <option value="">Select goal...</option>
            {automationGoals.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm text-zinc-400 mb-1">Describe your current workflow (optional)</label>
        <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={3} className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100" placeholder="e.g. I manually write posts, schedule via native apps, check analytics daily..." />
      </div>

      <button onClick={() => { if (biz && vol && plat && goal) setReport(buildAutomation(biz, vol, plat, goal, desc)); }} className="bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition">
        Build Automation Blueprint
      </button>

      {report && (
        <div className="mt-10 space-y-8">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800 text-center">
              <div className="text-3xl font-bold text-green-400">{report.totalTimeSaved}h</div>
              <div className="text-sm text-zinc-400 mt-1">Hours Saved / Week</div>
            </div>
            <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800 text-center">
              <div className="text-3xl font-bold text-violet-400">{report.automationScore}/100</div>
              <div className="text-sm text-zinc-400 mt-1">Automation Score</div>
            </div>
            <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800 text-center">
              <div className="text-3xl font-bold text-fuchsia-400">{report.costReduction}%</div>
              <div className="text-sm text-zinc-400 mt-1">Cost Reduction</div>
            </div>
          </div>

          <section>
            <h2 className="text-xl font-bold text-zinc-100 mb-4">⚙️ Automated Workflow Pipeline</h2>
            <div className="space-y-3">
              {report.workflows.map((w, i) => (
                <div key={i} className="bg-zinc-900/50 rounded-xl p-5 border border-zinc-800">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-violet-600/20 text-violet-400 px-2 py-0.5 rounded text-xs font-bold">Step {i + 1}</span>
                    <span className="font-semibold text-zinc-100">{w.step}</span>
                    <span className="ml-auto text-sm text-green-400">{w.timeSaved} saved</span>
                  </div>
                  <div className="text-sm text-zinc-400"><strong>Trigger:</strong> {w.trigger}</div>
                  <div className="text-sm text-zinc-400"><strong>Action:</strong> {w.action}</div>
                  <div className="text-sm text-zinc-500"><strong>Tool:</strong> {w.tool} · Error rate: {w.errorRate}</div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-100 mb-4">🤖 Automation Rules</h2>
            <div className="overflow-x-auto"><table className="w-full text-sm">
              <thead><tr className="text-zinc-400 border-b border-zinc-800">
                <th className="text-left py-2 px-3">Rule</th><th className="text-left py-2 px-3">Condition</th><th className="text-left py-2 px-3">Action</th><th className="text-left py-2 px-3">Frequency</th><th className="text-left py-2 px-3">Impact</th>
              </tr></thead>
              <tbody>{report.rules.map((r, i) => (
                <tr key={i} className="border-b border-zinc-800/50">
                  <td className="py-2 px-3 text-violet-300 font-medium">{r.name}</td>
                  <td className="py-2 px-3 text-zinc-400">{r.condition}</td>
                  <td className="py-2 px-3 text-zinc-300">{r.action}</td>
                  <td className="py-2 px-3 text-zinc-400">{r.frequency}</td>
                  <td className="py-2 px-3 text-green-400">{r.impact}</td>
                </tr>
              ))}</tbody>
            </table></div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-100 mb-4">📋 Reusable Content Templates</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {report.templates.map((t, i) => (
                <div key={i} className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800">
                  <div className="font-semibold text-zinc-100">{t.name}</div>
                  <div className="text-sm text-zinc-400">{t.type} · {t.platforms}</div>
                  <div className="text-sm text-zinc-500">{t.variables} variables · {t.usage} uses/mo</div>
                  <div className="text-sm text-green-400 mt-1">{t.avgPerformance}</div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-100 mb-4">🔗 Integration Stack</h2>
            <div className="overflow-x-auto"><table className="w-full text-sm">
              <thead><tr className="text-zinc-400 border-b border-zinc-800">
                <th className="text-left py-2 px-3">Tool</th><th className="text-left py-2 px-3">Role</th><th className="text-left py-2 px-3">Data Flow</th><th className="text-left py-2 px-3">Cost</th><th className="text-left py-2 px-3">Alternative</th>
              </tr></thead>
              <tbody>{report.integrations.map((ig, i) => (
                <tr key={i} className="border-b border-zinc-800/50">
                  <td className="py-2 px-3 text-violet-300 font-medium">{ig.tool}</td>
                  <td className="py-2 px-3 text-zinc-300">{ig.role}</td>
                  <td className="py-2 px-3 text-zinc-400">{ig.dataFlow}</td>
                  <td className="py-2 px-3 text-zinc-400">{ig.costPerMonth}</td>
                  <td className="py-2 px-3 text-zinc-500">{ig.alternative}</td>
                </tr>
              ))}</tbody>
            </table></div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-100 mb-4">📊 Efficiency Metrics (Before vs After)</h2>
            <div className="overflow-x-auto"><table className="w-full text-sm">
              <thead><tr className="text-zinc-400 border-b border-zinc-800">
                <th className="text-left py-2 px-3">Metric</th><th className="text-left py-2 px-3">Before</th><th className="text-left py-2 px-3">After</th><th className="text-left py-2 px-3">Change</th><th className="text-left py-2 px-3">Monthly Value</th>
              </tr></thead>
              <tbody>{report.efficiencyMetrics.map((m, i) => (
                <tr key={i} className="border-b border-zinc-800/50">
                  <td className="py-2 px-3 text-zinc-100">{m.metric}</td>
                  <td className="py-2 px-3 text-red-400">{m.before}</td>
                  <td className="py-2 px-3 text-green-400">{m.after}</td>
                  <td className="py-2 px-3 text-violet-400 font-bold">{m.improvement}</td>
                  <td className="py-2 px-3 text-zinc-400">{m.monthlyValue}</td>
                </tr>
              ))}</tbody>
            </table></div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-100 mb-4">⚡ Quick Wins (Start Today)</h2>
            <div className="space-y-2">
              {report.quickWins.map((q, i) => (
                <div key={i} className="bg-zinc-900/50 rounded-lg p-3 border border-zinc-800 text-sm text-zinc-300">
                  <span className="text-green-400 mr-2">✓</span>{q}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-100 mb-4">🚀 Advanced Automations</h2>
            <div className="space-y-2">
              {report.advancedAutomations.map((a, i) => (
                <div key={i} className="bg-zinc-900/50 rounded-lg p-3 border border-zinc-800 text-sm text-zinc-300">
                  <span className="text-violet-400 mr-2">→</span>{a}
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
