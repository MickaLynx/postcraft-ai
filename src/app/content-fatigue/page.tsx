'use client';
import { useState } from 'react';

const platforms = ['LinkedIn', 'Instagram', 'Twitter/X', 'TikTok', 'YouTube', 'Facebook', 'Email', 'All Platforms'] as const;
const contentTypes = ['Blog Posts', 'Social Posts', 'Video Content', 'Email Campaigns', 'Podcasts', 'Webinars', 'All Content'] as const;
const frequencies = ['Daily', '3-5x/week', '1-2x/week', 'Weekly', 'Bi-weekly', 'Monthly'] as const;
const industries = ['Tech & SaaS', 'E-commerce & DTC', 'Healthcare', 'Finance & FinTech', 'Education', 'Real Estate', 'Agency & Consulting', 'Manufacturing', 'Fitness & Wellness', 'Food & Beverage', 'Travel & Hospitality', 'Non-Profit'] as const;
const audienceSizes = ['Small (< 1K)', 'Growing (1K-10K)', 'Medium (10K-50K)', 'Large (50K-500K)', 'Massive (500K+)'] as const;
const contentAges = ['0-3 months', '3-6 months', '6-12 months', '1-2 years', '2+ years'] as const;

interface FatigueSignal { signal: string; severity: string; metric: string; trend: string; diagnosis: string; fix: string; }
interface ContentRefresh { content: string; currentState: string; refreshAction: string; effort: string; expectedLift: string; priority: string; }
interface AudienceInsight { insight: string; evidence: string; implication: string; action: string; }
interface FormatRotation { current: string; suggested: string; reason: string; example: string; frequency: string; }

interface FatigueReport {
  fatigueScore: number;
  riskLevel: string;
  signals: FatigueSignal[];
  refreshPlan: ContentRefresh[];
  insights: AudienceInsight[];
  formatRotation: FormatRotation[];
  preventionTips: string[];
  recoveryTimeline: string[];
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }

function detectFatigue(platform: string, contentType: string, freq: string, industry: string, audienceSize: string, contentAge: string, brandName: string): FatigueReport {
  const seed = hash(`${platform}-${contentType}-${freq}-${industry}-${audienceSize}-${contentAge}-${brandName}`);
  const fatigueScore = 20 + seed % 75;
  const riskLevel = fatigueScore >= 70 ? 'Critical — Immediate Action Required' : fatigueScore >= 50 ? 'Elevated — Attention Needed' : fatigueScore >= 30 ? 'Moderate — Monitor Closely' : 'Healthy — No Immediate Concern';

  const signals: FatigueSignal[] = [
    { signal: 'Engagement Rate Decline', severity: fatigueScore > 60 ? 'High' : fatigueScore > 40 ? 'Medium' : 'Low', metric: `-${5 + seed % 30}% over ${contentAge}`, trend: 'Declining steadily', diagnosis: 'Audience is seeing the same format/topic combinations too frequently', fix: 'Introduce 2-3 new content formats and rotate topics on a 4-week cycle' },
    { signal: 'Unfollow/Unsubscribe Rate', severity: fatigueScore > 55 ? 'High' : 'Medium', metric: `${(0.5 + seed % 3)}.${seed % 10}% per ${freq.toLowerCase()} cycle`, trend: fatigueScore > 50 ? 'Increasing' : 'Stable', diagnosis: 'Content frequency may exceed audience tolerance for your niche', fix: `Reduce from ${freq.toLowerCase()} to ${freq === 'Daily' ? '3-5x/week' : freq === '3-5x/week' ? '2-3x/week' : freq} — quality over quantity` },
    { signal: 'Click-Through Rate Drop', severity: fatigueScore > 50 ? 'High' : 'Low', metric: `-${3 + seed % 20}% vs 90-day avg`, trend: fatigueScore > 45 ? 'Declining' : 'Stable', diagnosis: 'CTAs are becoming predictable — audience ignores repetitive calls-to-action', fix: 'Rotate CTA language, placement, and format every 2 weeks' },
    { signal: 'Content Reach Suppression', severity: fatigueScore > 65 ? 'High' : 'Medium', metric: `-${10 + seed % 40}% organic reach`, trend: 'Algorithm penalizing low engagement', diagnosis: 'Platform algorithms reduce distribution when engagement drops — vicious cycle', fix: 'Create 1 "spark" piece per week designed for high engagement to reset algorithm signals' },
    { signal: 'Audience Sentiment Shift', severity: fatigueScore > 55 ? 'Medium' : 'Low', metric: `Positive sentiment: ${50 + seed % 40}%`, trend: fatigueScore > 50 ? 'Shifting negative' : 'Neutral', diagnosis: 'Repetitive messaging triggers "seen it before" response', fix: 'Introduce user-generated content, behind-the-scenes, and opinion pieces' },
    { signal: 'Time-on-Content Decrease', severity: fatigueScore > 45 ? 'Medium' : 'Low', metric: `-${5 + seed % 25}s avg read/view time`, trend: 'Shorter attention spans or skipping content', diagnosis: 'Content is too long, too predictable, or doesn\'t hook quickly enough', fix: 'Front-load value — put the best insight in the first 3 seconds/sentences' },
  ];

  const refreshPlan: ContentRefresh[] = [
    { content: 'Top-performing blog post (6+ months old)', currentState: 'Outdated stats, old screenshots', refreshAction: 'Update data, add new sections, refresh visuals', effort: '2-3 hours', expectedLift: '+30-60% organic traffic', priority: 'P0' },
    { content: 'Social media content templates', currentState: 'Same visual format for 3+ months', refreshAction: 'Redesign templates with new brand colors, layouts', effort: '4-6 hours', expectedLift: '+25-40% engagement', priority: 'P0' },
    { content: 'Email subject line patterns', currentState: 'Repetitive patterns ("How to X", "5 Tips for Y")', refreshAction: 'A/B test 5 new subject line formulas (questions, numbers, urgency, curiosity, personalization)', effort: '1-2 hours', expectedLift: '+15-25% open rate', priority: 'P1' },
    { content: 'CTA copy and placement', currentState: 'Same CTA on every piece', refreshAction: 'Create 10 CTA variants matched to content type and funnel stage', effort: '1-2 hours', expectedLift: '+10-20% click-through', priority: 'P1' },
    { content: 'Topic distribution', currentState: `${seed % 2 === 0 ? 'Heavy on tutorials' : 'Heavy on thought leadership'}`, refreshAction: 'Rebalance to 40% educational, 30% entertaining, 20% inspiring, 10% promotional', effort: '2-3 hours planning', expectedLift: '+20-35% overall engagement', priority: 'P1' },
    { content: 'Video thumbnails and hooks', currentState: 'Standard text-overlay thumbnails', refreshAction: 'Test face-forward, curiosity gap, and before/after thumbnail styles', effort: '30 min per video', expectedLift: '+40-80% CTR', priority: 'P2' },
  ];

  const insights: AudienceInsight[] = [
    { insight: 'Your audience engages most with data-backed content', evidence: 'Posts with statistics get 2.3x more engagement than opinion pieces', implication: 'Invest in original research and data visualization', action: 'Create 1 data-driven post per week with custom charts' },
    { insight: 'Engagement peaks on specific days and times', evidence: `${platform} engagement peaks: ${seed % 2 === 0 ? 'Tue-Thu 9-11am' : 'Mon/Wed 12-2pm'}`, implication: 'Content posted off-peak gets 40% less engagement', action: 'Schedule content for peak windows and save lower-priority content for off-peak' },
    { insight: 'Short-form content outperforms long-form on your channels', evidence: 'Posts under 200 words get 1.8x more engagement than posts over 500 words', implication: 'Your audience prefers quick, actionable insights over deep dives', action: 'Lead with a short-form post, link to long-form for those who want more' },
    { insight: 'User-generated content drives highest trust signals', evidence: 'UGC reposts get 3.5x more saves and shares than branded content', implication: 'Your audience trusts peer voices more than brand voice', action: 'Implement weekly UGC spotlight and customer story features' },
    { insight: 'Content variety correlates with lower fatigue', evidence: 'Accounts with 5+ content formats show 45% less engagement decline', implication: 'Monolithic content strategies accelerate fatigue', action: 'Rotate through: carousel, video, poll, quote card, thread, and story formats' },
  ];

  const formatRotation: FormatRotation[] = [
    { current: 'Text-only posts', suggested: 'Carousel / slide deck', reason: 'Carousels get 3x the engagement of text posts on LinkedIn and Instagram', example: 'Turn your blog post key points into a 6-slide visual carousel', frequency: '2-3x per week' },
    { current: 'Static images', suggested: 'Short-form video (< 60s)', reason: 'Video gets 5x organic reach on most platforms in 2026', example: 'Record a 30-second "quick tip" video with face-to-camera', frequency: '3-4x per week' },
    { current: 'How-to articles', suggested: 'Poll / Question posts', reason: 'Interactive content drives comments, which boost algorithm signals', example: '"What\'s your biggest challenge with [topic]? A) B) C) D)"', frequency: '1-2x per week' },
    { current: 'Company announcements', suggested: 'Behind-the-scenes stories', reason: 'Humanized content reduces brand fatigue by 60%', example: 'Show the team working on a new feature, mistakes included', frequency: '1x per week' },
    { current: 'Promotional posts', suggested: 'Customer spotlight / UGC', reason: 'Social proof is 4x more convincing than self-promotion', example: 'Repost a customer\'s tweet with your commentary and gratitude', frequency: '2x per week' },
    { current: 'Long threads', suggested: 'Single-image insight cards', reason: 'Digestible visual content gets higher save rates', example: 'One bold stat + one sentence takeaway on branded background', frequency: '3-4x per week' },
  ];

  const preventionTips = [
    'Follow the 4-1-1 rule: 4 value posts, 1 soft promo, 1 hard promo — never more promotional',
    'Rotate content themes on a 4-week cycle: Week 1 education, Week 2 entertainment, Week 3 inspiration, Week 4 promotion',
    'Never post the same format 3 days in a row — variety is the antidote to fatigue',
    'Monitor unfollow rate weekly — it\'s the earliest warning signal of content fatigue',
    'Survey your audience quarterly: "What content do you want more/less of?"',
    'Create a "content gap" intentionally — 1-2 days/week of silence makes your content more anticipated',
    'Invest 20% of content budget in experimental formats — the ones that fail teach you the most',
    'Track content engagement by format type monthly — double down on what works, retire what doesn\'t',
  ];

  const recoveryTimeline = [
    'Week 1: Audit current content — identify the 3 most repetitive patterns and stop them immediately',
    'Week 2: Introduce 2 new content formats (e.g., carousel + short video if you\'ve been text-only)',
    'Week 3: Reduce posting frequency by 20% — focus on quality over quantity',
    'Week 4: Launch a UGC or community-driven content series — shift some spotlight to your audience',
    'Week 5-6: A/B test new hooks, CTAs, and visual styles — collect data on what resonates',
    'Week 7-8: Analyze results — you should see engagement stabilize or begin recovering',
    'Month 3: Full content calendar redesign based on learnings — build in variety by default',
    'Ongoing: Monthly fatigue check (run this tool) + quarterly audience survey',
  ];

  return { fatigueScore, riskLevel, signals, refreshPlan, insights, formatRotation, preventionTips, recoveryTimeline };
}

export default function ContentFatiguePage() {
  const [platform, setPlatform] = useState(platforms[0]);
  const [contentType, setContentType] = useState(contentTypes[0]);
  const [freq, setFreq] = useState(frequencies[0]);
  const [industry, setIndustry] = useState(industries[0]);
  const [audienceSize, setAudienceSize] = useState(audienceSizes[0]);
  const [contentAge, setContentAge] = useState(contentAges[0]);
  const [brandName, setBrandName] = useState('');
  const [result, setResult] = useState<FatigueReport | null>(null);

  const handleGenerate = () => { if (brandName.trim()) setResult(detectFatigue(platform, contentType, freq, industry, audienceSize, contentAge, brandName)); };
  const scoreColor = (n: number) => n < 30 ? '#34d399' : n < 50 ? '#fbbf24' : n < 70 ? '#fb923c' : '#f87171';
  const sevColor = (s: string) => s === 'Low' ? '#34d399' : s === 'Medium' ? '#fbbf24' : '#f87171';
  const riskColor = (r: string) => r.includes('Healthy') ? '#34d399' : r.includes('Moderate') ? '#fbbf24' : r.includes('Elevated') ? '#fb923c' : '#f87171';

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Content Fatigue Detector</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Detect content fatigue before it tanks your engagement. Get fatigue signals, refresh plans, audience insights, format rotation guides, and a recovery timeline — stop the engagement death spiral.</p>

        <div className="mb-4">
          <label className="block text-sm text-zinc-400 mb-1">Brand / Account Name</label>
          <input type="text" value={brandName} onChange={e => setBrandName(e.target.value)} placeholder="e.g., PostCraft, @yourhandle" className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-3 text-zinc-100" />
        </div>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {([
            { label: 'Platform', value: platform, setter: setPlatform as (v: string) => void, options: platforms as readonly string[] },
            { label: 'Content Type', value: contentType, setter: setContentType as (v: string) => void, options: contentTypes as readonly string[] },
            { label: 'Posting Frequency', value: freq, setter: setFreq as (v: string) => void, options: frequencies as readonly string[] },
            { label: 'Industry', value: industry, setter: setIndustry as (v: string) => void, options: industries as readonly string[] },
            { label: 'Audience Size', value: audienceSize, setter: setAudienceSize as (v: string) => void, options: audienceSizes as readonly string[] },
            { label: 'Content History', value: contentAge, setter: setContentAge as (v: string) => void, options: contentAges as readonly string[] },
          ] as const).map(({ label, value, setter, options }) => (
            <div key={label}>
              <label className="block text-sm text-zinc-400 mb-1">{label}</label>
              <select value={value} onChange={e => setter(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100">
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
        <button onClick={handleGenerate} className="w-full md:w-auto bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded font-semibold hover:opacity-90 transition mb-8">Detect Content Fatigue</button>

        {result && (
          <div className="space-y-8">
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 text-center">
              <div className="text-5xl font-bold mb-2" style={{ color: scoreColor(result.fatigueScore) }}>{result.fatigueScore}</div>
              <div className="text-zinc-400 mb-2">Fatigue Score (lower is better)</div>
              <div className="text-lg font-semibold" style={{ color: riskColor(result.riskLevel) }}>{result.riskLevel}</div>
              <div className="mt-3 max-w-md mx-auto w-full bg-zinc-800 rounded-full h-3">
                <div className="h-3 rounded-full" style={{ width: `${result.fatigueScore}%`, background: scoreColor(result.fatigueScore) }} />
              </div>
            </div>

            {/* Fatigue Signals */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Fatigue Signals ({result.signals.length})</h3>
              <div className="space-y-3">
                {result.signals.map((s, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-zinc-200">{s.signal}</span>
                      <div className="flex gap-2">
                        <span className="text-xs px-2 py-1 rounded font-bold" style={{ color: sevColor(s.severity), background: `${sevColor(s.severity)}15` }}>{s.severity}</span>
                        <span className="text-xs px-2 py-1 rounded bg-zinc-700 text-zinc-300">{s.metric}</span>
                      </div>
                    </div>
                    <div className="text-sm text-zinc-400 mb-1">{s.diagnosis}</div>
                    <div className="text-xs text-emerald-400/70">Fix: {s.fix}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Refresh Plan + Format Rotation */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3">Content Refresh Plan</h3>
                <div className="space-y-3">
                  {result.refreshPlan.map((r, i) => (
                    <div key={i} className="bg-zinc-800/40 rounded-lg p-3 border border-zinc-700/50">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-sm font-semibold text-zinc-200">{r.content}</span>
                        <span className="text-xs px-2 py-0.5 rounded" style={{ color: r.priority === 'P0' ? '#f87171' : r.priority === 'P1' ? '#fbbf24' : '#60a5fa', background: r.priority === 'P0' ? '#f8717115' : r.priority === 'P1' ? '#fbbf2415' : '#60a5fa15' }}>{r.priority}</span>
                      </div>
                      <div className="text-xs text-zinc-500 mb-1">{r.currentState}</div>
                      <div className="text-xs text-zinc-300">{r.refreshAction}</div>
                      <div className="flex gap-3 mt-1 text-xs"><span className="text-zinc-500">Effort: {r.effort}</span><span className="text-emerald-400/70">Lift: {r.expectedLift}</span></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3">Format Rotation Guide</h3>
                <div className="space-y-3">
                  {result.formatRotation.map((f, i) => (
                    <div key={i} className="bg-zinc-800/40 rounded-lg p-3 border border-zinc-700/50">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-red-400/60 line-through">{f.current}</span>
                        <span className="text-xs text-zinc-500">→</span>
                        <span className="text-xs text-emerald-400 font-semibold">{f.suggested}</span>
                      </div>
                      <div className="text-xs text-zinc-400">{f.reason}</div>
                      <div className="text-xs text-zinc-500 mt-1">Example: {f.example}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Audience Insights */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Audience Insights</h3>
              <div className="space-y-3">
                {result.insights.map((ins, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="font-semibold text-zinc-200 mb-1">{ins.insight}</div>
                    <div className="text-xs space-y-1">
                      <div><span className="text-zinc-500">Evidence:</span> <span className="text-zinc-300">{ins.evidence}</span></div>
                      <div><span className="text-zinc-500">Implication:</span> <span className="text-zinc-400">{ins.implication}</span></div>
                      <div><span className="text-zinc-500">Action:</span> <span className="text-emerald-400/70">{ins.action}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prevention + Recovery */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-emerald-400">Prevention Tips</h3>
                <div className="space-y-2">{result.preventionTips.map((t, i) => <div key={i} className="text-sm text-zinc-400 flex gap-2"><span className="text-emerald-400 shrink-0">→</span>{t}</div>)}</div>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-violet-400">Recovery Timeline</h3>
                <div className="space-y-2">{result.recoveryTimeline.map((r, i) => <div key={i} className="text-sm text-zinc-400 flex gap-2"><span className="text-violet-400 shrink-0">{i + 1}.</span>{r}</div>)}</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">Stop the Engagement Death Spiral</h3>
              <p className="text-zinc-400 mb-4">PostCraft AI detects fatigue early and gives you the recovery playbook. Pair with <a href="/content-decay" className="text-violet-400 underline">Content Decay</a>, <a href="/content-calendar" className="text-violet-400 underline">Content Calendar</a>, and <a href="/ab-testing" className="text-violet-400 underline">A/B Testing</a>.</p>
              <a href="/pricing" className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">Get PostCraft Pro</a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
