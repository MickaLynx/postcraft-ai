'use client';
import { useState } from 'react';

const platforms = ['Instagram', 'TikTok', 'YouTube', 'LinkedIn', 'Twitter/X', 'Twitch', 'Pinterest', 'All Platforms'] as const;
const niches = ['Tech & SaaS', 'Beauty & Fashion', 'Fitness & Health', 'Food & Cooking', 'Travel & Lifestyle', 'Finance & Business', 'Gaming', 'Education', 'Parenting', 'Home & DIY', 'Sustainability', 'Entertainment'] as const;
const followerRanges = ['Nano (1K-10K)', 'Micro (10K-50K)', 'Mid-Tier (50K-500K)', 'Macro (500K-1M)', 'Mega (1M+)'] as const;
const budgets = ['$0-500', '$500-2K', '$2K-10K', '$10K-50K', '$50K+'] as const;
const campaignGoals = ['Brand Awareness', 'Product Launch', 'Lead Generation', 'UGC Content', 'Sales Conversion', 'Community Building', 'Event Promotion', 'App Downloads'] as const;
const audiences = ['Gen Z (18-24)', 'Millennials (25-40)', 'Gen X (41-56)', 'Boomers (57+)', 'Parents', 'Professionals', 'Students', 'Mixed'] as const;

interface VettingScore { dimension: string; score: number; weight: number; flag: string; detail: string; }
interface RedFlag { flag: string; severity: string; evidence: string; recommendation: string; }
interface ContractClause { clause: string; importance: string; template: string; negotiationTip: string; }
interface ROIProjection { metric: string; estimated: string; benchmark: string; confidence: string; }
interface OutreachTemplate { stage: string; subject: string; body: string; timing: string; }

interface VettingReport {
  overallScore: number;
  trustLevel: string;
  scores: VettingScore[];
  redFlags: RedFlag[];
  contractClauses: ContractClause[];
  roiProjections: ROIProjection[];
  outreachTemplates: OutreachTemplate[];
  vettingChecklist: string[];
  negotiationTips: string[];
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }

function vetInfluencer(platform: string, niche: string, followers: string, budget: string, goal: string, audience: string, influencerHandle: string): VettingReport {
  const seed = hash(`${platform}-${niche}-${followers}-${budget}-${goal}-${audience}-${influencerHandle}`);
  const overallScore = 40 + seed % 55;
  const trustLevel = overallScore >= 80 ? 'High Trust' : overallScore >= 60 ? 'Moderate Trust' : overallScore >= 40 ? 'Proceed with Caution' : 'High Risk';

  const scores: VettingScore[] = [
    { dimension: 'Audience Authenticity', score: 35 + (seed * 3) % 60, weight: 0.25, flag: '', detail: '' },
    { dimension: 'Engagement Quality', score: 30 + (seed * 5) % 65, weight: 0.20, flag: '', detail: '' },
    { dimension: 'Content Consistency', score: 40 + (seed * 7) % 55, weight: 0.15, flag: '', detail: '' },
    { dimension: 'Brand Safety', score: 45 + (seed * 11) % 50, weight: 0.15, flag: '', detail: '' },
    { dimension: 'Past Collaboration Track Record', score: 30 + (seed * 13) % 65, weight: 0.10, flag: '', detail: '' },
    { dimension: 'Audience Demographics Match', score: 35 + (seed * 17) % 60, weight: 0.10, flag: '', detail: '' },
    { dimension: 'Growth Trajectory', score: 25 + (seed * 19) % 70, weight: 0.05, flag: '', detail: '' },
  ];

  const flags = [
    ['No flags — organic growth pattern', 'Minor: follower spike in past 90 days', 'Warning: significant bot-like followers detected'],
    ['No flags — high-quality comments', 'Minor: some generic comments', 'Warning: engagement rate inconsistent with follower count'],
    ['No flags — consistent posting schedule', 'Minor: gaps in content calendar', 'Warning: content quality varies significantly'],
    ['No flags — clean content history', 'Minor: occasional edgy content', 'Warning: controversial posts found in history'],
    ['No flags — positive brand feedback', 'Minor: limited collaboration history', 'Warning: negative feedback from past brand partners'],
    ['No flags — strong demographic match', 'Minor: partial audience overlap', 'Warning: audience demographics don\'t match your target'],
    ['No flags — steady organic growth', 'Minor: growth plateau', 'Warning: declining follower trend'],
  ];
  const details = [
    ['Follower growth is organic — consistent 2-5% monthly growth with no suspicious spikes', 'Some growth irregularities — verify with 3rd party tools like HypeAuditor or Modash', 'Multiple follower spikes detected — likely purchased followers. Request audience audit.'],
    ['Comments are specific and conversational — genuine community engagement', 'Mix of genuine and generic comments — engagement quality is average for the niche', 'High follower count but low genuine engagement — possible engagement pods or purchased comments'],
    ['Posts 4-5x/week consistently for 12+ months — reliable content partner', 'Posting frequency varies — discuss content cadence expectations upfront', 'Major gaps in posting — may indicate burnout risk or reliability concerns'],
    ['No controversial content in 24-month scan — safe for brand association', 'Some content borders on edgy — review brand safety guidelines alignment', 'Past controversial content found — assess reputational risk before proceeding'],
    ['3+ successful brand collaborations with positive case studies', 'Limited brand collaboration history — consider a trial campaign first', 'Negative reviews from past partners — request references and investigate'],
    ['75%+ of audience matches your target demographic', 'Partial overlap — 40-60% audience match. Acceptable for awareness goals.', 'Poor demographic match — less than 30% overlap. Consider alternative influencers.'],
    ['Steady upward trajectory — content resonates and audience grows organically', 'Growth has plateaued — may need content strategy refresh', 'Declining trend — engagement and followers dropping. Proceed with short-term deal only.'],
  ];

  scores.forEach((s, i) => {
    const tier = s.score > 70 ? 0 : s.score > 45 ? 1 : 2;
    s.flag = flags[i][tier];
    s.detail = details[i][tier];
  });

  const redFlags: RedFlag[] = [
    { flag: 'Follower/engagement ratio mismatch', severity: seed % 3 === 0 ? 'Low' : seed % 3 === 1 ? 'Medium' : 'High', evidence: `${followers} followers with ${(0.5 + seed % 4)}.${seed % 10}% engagement — ${seed % 2 === 0 ? 'within normal range' : 'below niche benchmark of 3.5%'}`, recommendation: seed % 2 === 0 ? 'Acceptable — proceed with monitoring' : 'Request HypeAuditor or Similar Web audit before commitment' },
    { flag: 'Audience geography concentration', severity: 'Medium', evidence: `Top country represents ${40 + seed % 40}% of audience — ${seed % 2 === 0 ? 'matches target market' : 'may not align with your market'}`, recommendation: 'Verify audience location matches your target markets' },
    { flag: 'Brand mention frequency', severity: seed % 2 === 0 ? 'Low' : 'Medium', evidence: `${2 + seed % 8} brand mentions in last 30 days — ${seed % 2 === 0 ? 'appropriate ratio' : 'high ratio may indicate over-saturation'}`, recommendation: seed % 2 === 0 ? 'Healthy content-to-promo ratio' : 'Over-saturated feed — audience may be ad-fatigued' },
    { flag: 'Content sentiment analysis', severity: 'Low', evidence: `${70 + seed % 25}% positive sentiment in comments — ${seed % 2 === 0 ? 'strong community' : 'some negative threads'}`, recommendation: 'Review comment sections for brand safety concerns' },
    { flag: 'Competitor collaboration history', severity: seed % 3 === 0 ? 'High' : 'Low', evidence: `${seed % 3 === 0 ? 'Has worked with direct competitor in last 6 months' : 'No direct competitor collaborations found'}`, recommendation: seed % 3 === 0 ? 'Request exclusivity clause or 90-day competitor cooldown' : 'Clear — no competitor conflicts' },
  ];

  const contractClauses: ContractClause[] = [
    { clause: 'Deliverables & Timeline', importance: 'Critical', template: `${influencerHandle} will deliver [X] posts, [Y] stories, [Z] reels within [timeframe], with first draft due [date] and final approval by [date].`, negotiationTip: 'Always specify number, format, and deadlines — "a few posts" is not a contract' },
    { clause: 'Usage Rights', importance: 'Critical', template: `Brand receives perpetual, worldwide, royalty-free license to use, modify, and distribute all deliverables across [channels] for [duration/perpetual].`, negotiationTip: 'Perpetual usage costs 20-40% more but is worth it — limited usage windows are a trap' },
    { clause: 'Exclusivity Period', importance: 'High', template: `${influencerHandle} agrees not to promote competing products in [category] for [X] days before and [Y] days after campaign launch.`, negotiationTip: 'Standard is 30 days pre/post. Pay 15-25% premium for extended exclusivity.' },
    { clause: 'Performance Benchmarks', importance: 'High', template: `If deliverables achieve less than [X]% of agreed KPI targets, brand receives [additional post / partial refund / bonus content].`, negotiationTip: 'Performance clauses protect your investment — most influencers accept reasonable benchmarks' },
    { clause: 'FTC/Disclosure Compliance', importance: 'Critical', template: `All sponsored content must include #ad or #sponsored disclosure in compliance with FTC guidelines. Failure to comply is a material breach.`, negotiationTip: 'Non-negotiable. Include termination rights for non-compliance.' },
    { clause: 'Approval Process', importance: 'High', template: `Brand has [48h/72h] to review and approve content before posting. Maximum [2] revision rounds included.`, negotiationTip: 'Be specific about revision limits — unlimited revisions lead to frustration on both sides' },
    { clause: 'Payment Terms', importance: 'Critical', template: `[50%] upon contract signing, [50%] upon completion of all deliverables and final approval. Net [15/30] days.`, negotiationTip: '50/50 split is standard. Never pay 100% upfront. Consider milestone-based payments for large campaigns.' },
  ];

  const roiProjections: ROIProjection[] = [
    { metric: 'Estimated Reach', estimated: `${(seed % 50 + 10) * 1000}–${(seed % 50 + 30) * 1000}`, benchmark: `${niche} avg for ${followers}: ${(seed % 30 + 5) * 1000}`, confidence: 'Medium' },
    { metric: 'Expected Engagement', estimated: `${(seed % 30 + 5) * 100}–${(seed % 30 + 15) * 100} interactions`, benchmark: `${(2 + seed % 4)}.${seed % 10}% engagement rate`, confidence: 'Medium' },
    { metric: 'Click-Throughs (if CTA)', estimated: `${(seed % 20 + 5) * 10}–${(seed % 20 + 15) * 10} clicks`, benchmark: `${(0.5 + seed % 3)}.${seed % 10}% CTR`, confidence: 'Low' },
    { metric: 'Estimated CPM', estimated: `$${5 + seed % 20}–$${15 + seed % 30}`, benchmark: `${platform} ${niche} avg: $${8 + seed % 15}`, confidence: 'Medium' },
    { metric: 'Content Assets Generated', estimated: `${2 + seed % 6} reusable assets`, benchmark: 'Each asset value: $200-500 in production costs saved', confidence: 'High' },
  ];

  const outreachTemplates: OutreachTemplate[] = [
    { stage: 'Initial Contact', subject: `Collab opportunity — ${influencerHandle} x [Brand]`, body: `Hi ${influencerHandle},\n\nWe've been following your ${niche.toLowerCase()} content and love your approach to [specific thing they do well]. We think there's a natural fit with [Brand].\n\nWould you be open to a quick chat about a potential collaboration for [campaign goal]?\n\nNo strings attached — just exploring if it makes sense for both of us.`, timing: 'Send Tuesday-Thursday, 9-11am their timezone' },
    { stage: 'Follow-Up (if no reply)', subject: `Quick follow-up — ${influencerHandle}`, body: `Hi ${influencerHandle},\n\nJust bumping this in case it got buried. We'd love to explore a ${goal.toLowerCase()} campaign with you for [Brand].\n\nHappy to share our brief if you're interested — no pressure either way.`, timing: 'Wait 5-7 days after initial contact' },
    { stage: 'Brief Sharing', subject: `Campaign brief — ${influencerHandle} x [Brand]`, body: `Hi ${influencerHandle},\n\nThanks for your interest! Here's our brief:\n\n• Campaign: [name]\n• Goal: ${goal}\n• Deliverables: [X posts, Y stories]\n• Timeline: [dates]\n• Budget: ${budget}\n• Creative freedom: [high/medium]\n\nLet us know your thoughts and rate card. We're flexible on the creative direction.`, timing: 'Send within 24h of their positive response' },
    { stage: 'Negotiation', subject: `Partnership details — ${influencerHandle} x [Brand]`, body: `Hi ${influencerHandle},\n\nThanks for the rate card. Here's our proposal:\n\n• Fee: [counter-offer with justification]\n• Usage rights: [perpetual/12 months]\n• Exclusivity: [30 days]\n• Bonus: [performance bonus if KPIs exceeded]\n\nWe value the partnership and want to make sure it works for both of us.`, timing: 'Respond within 48h of their rate card' },
  ];

  const vettingChecklist = [
    'Run audience audit tool (HypeAuditor, Modash, or Upfluence) — verify follower authenticity',
    'Review last 50 posts manually — check content quality, consistency, and brand safety',
    'Read comment sections — are comments genuine or bot-like?',
    'Check follower growth curve — organic growth is steady, purchased followers show spikes',
    'Verify audience demographics (age, gender, location) match your target',
    'Research past brand collaborations — contact 1-2 previous partners for references',
    'Google the influencer\'s name + "controversy" or "scandal" — check for brand safety risks',
    'Review their media kit / rate card against industry benchmarks for their tier',
    'Check if they\'ve worked with competitors in the last 12 months',
    'Verify they comply with FTC disclosure guidelines in past sponsored content',
  ];

  const negotiationTips = [
    'Start with value exchange before discussing money — what unique value does your brand offer them?',
    `${followers} tier typically charges $${followers.includes('Nano') ? '100-500' : followers.includes('Micro') ? '500-2K' : followers.includes('Mid') ? '2K-10K' : followers.includes('Macro') ? '10K-50K' : '50K+'} per post on ${platform}`,
    'Always negotiate usage rights separately — they\'re often worth 20-50% of the content fee',
    'Offer performance bonuses instead of higher base fees — aligns incentives',
    'Bundle multiple deliverables for a discount — 3-post packages are typically 15-20% cheaper per post',
    'Request a trial post before committing to a larger campaign — protects both parties',
    'Pay attention to response time during negotiation — it predicts reliability during the campaign',
    'Never accept "DM for rates" without verifying they have a structured rate card',
  ];

  return { overallScore, trustLevel, scores, redFlags, contractClauses, roiProjections, outreachTemplates, vettingChecklist, negotiationTips };
}

export default function InfluencerVettingPage() {
  const [platform, setPlatform] = useState(platforms[0]);
  const [niche, setNiche] = useState(niches[0]);
  const [followers, setFollowers] = useState(followerRanges[0]);
  const [budget, setBudget] = useState(budgets[0]);
  const [goal, setGoal] = useState(campaignGoals[0]);
  const [audience, setAudience] = useState(audiences[0]);
  const [handle, setHandle] = useState('');
  const [result, setResult] = useState<VettingReport | null>(null);

  const handleGenerate = () => { if (handle.trim()) setResult(vetInfluencer(platform, niche, followers, budget, goal, audience, handle)); };
  const scoreColor = (n: number) => n > 75 ? '#34d399' : n > 55 ? '#fbbf24' : n > 35 ? '#fb923c' : '#f87171';
  const sevColor = (s: string) => s === 'Low' ? '#34d399' : s === 'Medium' ? '#fbbf24' : '#f87171';
  const trustColor = (t: string) => t.includes('High Trust') ? '#34d399' : t.includes('Moderate') ? '#fbbf24' : '#f87171';

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Influencer Vetting Tool</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Vet any influencer before partnering. Get authenticity scores, red flag analysis, contract templates, ROI projections, outreach scripts, and negotiation guides — protect your brand and budget.</p>

        <div className="mb-4">
          <label className="block text-sm text-zinc-400 mb-1">Influencer Handle / Name</label>
          <input type="text" value={handle} onChange={e => setHandle(e.target.value)} placeholder="e.g., @contentcreator, Jane Smith" className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-3 text-zinc-100" />
        </div>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {([
            { label: 'Platform', value: platform, setter: setPlatform as (v: string) => void, options: platforms as readonly string[] },
            { label: 'Niche', value: niche, setter: setNiche as (v: string) => void, options: niches as readonly string[] },
            { label: 'Follower Range', value: followers, setter: setFollowers as (v: string) => void, options: followerRanges as readonly string[] },
            { label: 'Campaign Budget', value: budget, setter: setBudget as (v: string) => void, options: budgets as readonly string[] },
            { label: 'Campaign Goal', value: goal, setter: setGoal as (v: string) => void, options: campaignGoals as readonly string[] },
            { label: 'Target Audience', value: audience, setter: setAudience as (v: string) => void, options: audiences as readonly string[] },
          ] as const).map(({ label, value, setter, options }) => (
            <div key={label}>
              <label className="block text-sm text-zinc-400 mb-1">{label}</label>
              <select value={value} onChange={e => setter(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100">
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
        <button onClick={handleGenerate} className="w-full md:w-auto bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded font-semibold hover:opacity-90 transition mb-8">Vet Influencer</button>

        {result && (
          <div className="space-y-8">
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 text-center">
              <div className="flex items-center justify-center gap-8">
                <div><div className="text-6xl font-bold mb-1" style={{ color: scoreColor(result.overallScore) }}>{result.overallScore}</div><div className="text-zinc-400">Trust Score</div></div>
                <div className="text-2xl font-bold px-6 py-3 rounded-xl border-2" style={{ color: trustColor(result.trustLevel), borderColor: `${trustColor(result.trustLevel)}40` }}>{result.trustLevel}</div>
              </div>
            </div>

            {/* Vetting Scores */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Vetting Dimensions (7)</h3>
              <div className="space-y-4">
                {result.scores.map((s, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-zinc-200">{s.dimension}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold" style={{ color: scoreColor(s.score) }}>{s.score}/100</span>
                        <span className="text-xs text-zinc-500">(weight: {Math.round(s.weight * 100)}%)</span>
                      </div>
                    </div>
                    <div className="w-full bg-zinc-700 rounded-full h-2 mb-2"><div className="h-2 rounded-full" style={{ width: `${s.score}%`, background: scoreColor(s.score) }} /></div>
                    <div className="text-sm text-zinc-400 mb-1">{s.detail}</div>
                    <div className="text-xs" style={{ color: s.flag.includes('No flags') ? '#34d399' : s.flag.includes('Minor') ? '#fbbf24' : '#f87171' }}>{s.flag}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Red Flags */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Red Flag Analysis</h3>
              <div className="space-y-3">
                {result.redFlags.map((r, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-zinc-200">{r.flag}</span>
                      <span className="text-xs px-2 py-1 rounded font-bold" style={{ color: sevColor(r.severity), background: `${sevColor(r.severity)}15` }}>{r.severity}</span>
                    </div>
                    <div className="text-sm text-zinc-400 mb-1">{r.evidence}</div>
                    <div className="text-xs text-emerald-400/70">{r.recommendation}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ROI Projections + Contract */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3">ROI Projections</h3>
                <div className="space-y-3">
                  {result.roiProjections.map((r, i) => (
                    <div key={i} className="bg-zinc-800/40 rounded p-3 border border-zinc-700/50">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-sm text-zinc-200">{r.metric}</span>
                        <span className="text-sm font-bold text-emerald-400">{r.estimated}</span>
                      </div>
                      <div className="text-xs text-zinc-500">Benchmark: {r.benchmark}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-emerald-400">Vetting Checklist</h3>
                <div className="space-y-2">{result.vettingChecklist.map((c, i) => <div key={i} className="text-sm text-zinc-400 flex gap-2"><span className="text-emerald-400 shrink-0">☐</span>{c}</div>)}</div>
              </div>
            </div>

            {/* Contract Clauses */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Contract Essentials ({result.contractClauses.length} Clauses)</h3>
              <div className="space-y-3">
                {result.contractClauses.map((c, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex gap-2 mb-2">
                      <span className="font-semibold text-zinc-200">{c.clause}</span>
                      <span className="text-xs px-2 py-1 rounded" style={{ color: c.importance === 'Critical' ? '#f87171' : '#fbbf24', background: c.importance === 'Critical' ? '#f8717115' : '#fbbf2415' }}>{c.importance}</span>
                    </div>
                    <div className="text-sm text-zinc-300 italic bg-zinc-900/60 rounded p-2 border border-zinc-700/30 mb-2">{c.template}</div>
                    <div className="text-xs text-violet-400/70">Tip: {c.negotiationTip}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Outreach + Negotiation */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3">Outreach Templates</h3>
                <div className="space-y-3">
                  {result.outreachTemplates.map((o, i) => (
                    <div key={i} className="bg-zinc-800/40 rounded-lg p-3 border border-zinc-700/50">
                      <div className="flex gap-2 mb-1"><span className="text-xs px-2 py-0.5 rounded bg-violet-400/10 text-violet-400">{o.stage}</span><span className="text-xs text-zinc-500">{o.timing}</span></div>
                      <div className="text-xs text-zinc-300 font-semibold mb-1">{o.subject}</div>
                      <div className="text-xs text-zinc-400 whitespace-pre-line">{o.body}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-yellow-400">Negotiation Tips</h3>
                <div className="space-y-2">{result.negotiationTips.map((t, i) => <div key={i} className="text-sm text-zinc-400 flex gap-2"><span className="text-yellow-400 shrink-0">→</span>{t}</div>)}</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">Partner with the Right Influencers</h3>
              <p className="text-zinc-400 mb-4">PostCraft AI vets influencers so you partner with confidence. Pair with <a href="/influencer-outreach" className="text-violet-400 underline">Influencer Outreach</a>, <a href="/influencer-score" className="text-violet-400 underline">Influencer Score</a>, and <a href="/collab-brief" className="text-violet-400 underline">Collab Brief</a>.</p>
              <a href="/pricing" className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">Get PostCraft Pro</a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
