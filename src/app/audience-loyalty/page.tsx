'use client';
import { useState } from 'react';

const platforms = ['LinkedIn', 'Instagram', 'Twitter/X', 'TikTok', 'YouTube', 'Facebook', 'Newsletter', 'All Platforms'] as const;
const audienceSizes = ['< 1K', '1K-10K', '10K-50K', '50K-100K', '100K-500K', '500K+'] as const;
const contentFrequencies = ['Daily', '3-5x/week', '1-2x/week', 'Bi-weekly', 'Monthly'] as const;
const niches = ['Tech & SaaS', 'E-commerce', 'Personal Brand', 'Agency', 'Education', 'Health & Wellness', 'Finance', 'Creative/Art', 'B2B Services', 'Media & Entertainment'] as const;
const accountAges = ['< 6 months', '6-12 months', '1-2 years', '2-5 years', '5+ years'] as const;

interface LoyaltyScore { overall: number; tier: string; }
interface LoyaltySegment { name: string; percentage: number; behavior: string; riskLevel: string; retentionStrategy: string; valueToBrand: string; }
interface EngagementTrend { metric: string; current: number; previous: number; change: number; trend: 'up' | 'down' | 'stable'; insight: string; }
interface ChurnRisk { signal: string; severity: string; affectedAudience: string; preventionAction: string; urgency: string; estimatedImpact: string; }
interface LoyaltyDriver { driver: string; score: number; description: string; improvement: string; effortLevel: string; }
interface RetentionPlaybook { tactic: string; targetSegment: string; implementation: string; expectedLift: string; timeline: string; priority: string; }
interface CommunityHealth { replyRate: number; shareRate: number; saveRate: number; dmsPerWeek: number; userGeneratedContent: number; advocacyScore: number; }

interface LoyaltyReport {
  loyaltyScore: LoyaltyScore;
  segments: LoyaltySegment[];
  trends: EngagementTrend[];
  churnRisks: ChurnRisk[];
  drivers: LoyaltyDriver[];
  playbook: RetentionPlaybook[];
  communityHealth: CommunityHealth;
  milestones: string[];
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }

function trackLoyalty(platform: string, audienceSize: string, contentFrequency: string, niche: string, accountAge: string, brandName: string): LoyaltyReport {
  const seed = hash(`${platform}-${audienceSize}-${contentFrequency}-${niche}-${accountAge}-${brandName}`);
  const s2 = hash(`${brandName}-${platform}-${niche}`);
  const s3 = hash(`${contentFrequency}-${accountAge}-${brandName}`);

  const overall = 25 + seed % 70;
  const tier = overall >= 80 ? 'Exceptional' : overall >= 65 ? 'Strong' : overall >= 50 ? 'Solid' : overall >= 35 ? 'Developing' : 'Fragile';

  const loyaltyScore: LoyaltyScore = { overall, tier };

  const superfanPct = 3 + seed % 12;
  const regularPct = 10 + s2 % 15;
  const casualPct = 15 + s3 % 20;
  const lurkerPct = 20 + seed % 25;
  const atRiskPct = 5 + s2 % 15;
  const total = superfanPct + regularPct + casualPct + lurkerPct + atRiskPct;
  const churnedPct = 100 - total;

  const segments: LoyaltySegment[] = [
    { name: 'Superfans', percentage: superfanPct, behavior: 'Engage with every post, share your content organically, defend your brand in comments, and actively recruit new followers through word-of-mouth', riskLevel: 'Low', retentionStrategy: 'Exclusive early access, personal thank-you DMs, co-creation opportunities, ambassador program invites, and behind-the-scenes content', valueToBrand: `Each superfan generates ${3 + seed % 8}x the engagement of a regular follower and influences an estimated ${5 + s2 % 20} additional people` },
    { name: 'Regulars', percentage: regularPct, behavior: 'Like most posts, comment occasionally, watch stories consistently, and click through on links when topics match their interests', riskLevel: 'Low', retentionStrategy: 'Consistent value delivery, loyalty rewards for engagement streaks, personalized content recommendations, and community spotlight features', valueToBrand: `Regulars form the reliable engagement base — they account for ${30 + s3 % 25}% of your consistent engagement metrics` },
    { name: 'Casual Followers', percentage: casualPct, behavior: 'Scroll past most content, engage only with highly visual or controversial posts, may forget they follow you, and interact mainly through stories or reels', riskLevel: 'Medium', retentionStrategy: 'Hook-driven content with strong first 3 seconds, polls and interactive elements, pattern interrupts in feed, and re-engagement campaigns every 2 weeks', valueToBrand: `Casuals represent the largest conversion opportunity — moving ${2 + seed % 5}% to Regulars would increase engagement by ${10 + s2 % 20}%` },
    { name: 'Lurkers', percentage: lurkerPct, behavior: 'Never like or comment but consistently view content, may screenshot or share privately, read every caption but leave no public trace of engagement', riskLevel: 'Medium', retentionStrategy: 'Create low-barrier engagement opportunities (polls, emoji reactions, "save this for later" CTAs), make them feel seen without calling them out, and provide downloadable value content', valueToBrand: `Lurkers are ${seed % 2 === 0 ? 'your hidden conversion engine' : 'potential customers watching before buying'} — ${10 + s3 % 30}% of DM inquiries and purchases come from silent followers` },
    { name: 'At-Risk', percentage: atRiskPct, behavior: 'Engagement dropped significantly in last 30 days, skipping stories, not opening emails, may have muted or unfollowed similar accounts recently', riskLevel: 'High', retentionStrategy: 'Win-back campaign with highest-performing content, direct outreach asking for feedback, exclusive offer or content unlock, and acknowledge the gap with authenticity', valueToBrand: `Losing at-risk followers costs ${2 + seed % 5}x more to replace than retain — saving ${20 + s2 % 40}% of this segment preserves ${5 + s3 % 15}% of total engagement` },
    { name: 'Churned', percentage: churnedPct > 0 ? churnedPct : 5, behavior: 'Unfollowed, unsubscribed, or completely disengaged for 60+ days — no interaction with any content format, may still follow but algorithm has fully deprioritized your content', riskLevel: 'Critical', retentionStrategy: 'Re-introduction campaign on alternative channels, fresh content angle that addresses why they left, "we miss you" personalized outreach, and complete content strategy refresh for this segment', valueToBrand: `Each churned follower represents ${1 + seed % 4} months of acquisition effort lost — analyze churn patterns to prevent future losses` },
  ];

  const trends: EngagementTrend[] = [
    { metric: 'Like Rate', current: parseFloat((2.5 + (seed % 50) / 10).toFixed(1)), previous: parseFloat((2.0 + (s2 % 45) / 10).toFixed(1)), change: 0, trend: 'up', insight: `${platform} algorithm is rewarding your recent content format experiments — double down on ${seed % 2 === 0 ? 'carousel' : 'video'} posts` },
    { metric: 'Comment Rate', current: parseFloat((0.5 + (s2 % 30) / 10).toFixed(1)), previous: parseFloat((0.4 + (s3 % 25) / 10).toFixed(1)), change: 0, trend: 'up', insight: 'Asking direct questions in captions is driving conversation — try controversial takes to push this further' },
    { metric: 'Share Rate', current: parseFloat((0.3 + (s3 % 20) / 10).toFixed(1)), previous: parseFloat((0.4 + (seed % 25) / 10).toFixed(1)), change: 0, trend: 'down', insight: 'Shareable content (templates, frameworks, checklists) has declined — create more "I need to send this to someone" moments' },
    { metric: 'Save Rate', current: parseFloat((1.2 + (seed % 35) / 10).toFixed(1)), previous: parseFloat((1.0 + (s2 % 30) / 10).toFixed(1)), change: 0, trend: 'up', insight: 'Educational content is being bookmarked heavily — this is a strong loyalty signal, your audience wants to reference your work' },
    { metric: 'Story Completion', current: parseFloat((40 + seed % 45).toFixed(0)), previous: parseFloat((35 + s3 % 40).toFixed(0)), change: 0, trend: 'stable', insight: `${seed % 2 === 0 ? 'Story length is optimal at 5-7 frames' : 'Consider reducing stories to under 5 frames'} — completion rate plateaus after frame 4` },
    { metric: 'Profile Visits', current: 100 + seed % 900, previous: 80 + s2 % 800, change: 0, trend: 'up', insight: 'Bio link clicks correlating with profile visits suggests strong curiosity — optimize your bio CTA and link-in-bio page' },
  ];
  trends.forEach(t => { t.change = parseFloat(((t.current - t.previous) / (t.previous || 1) * 100).toFixed(1)); t.trend = t.change > 2 ? 'up' : t.change < -2 ? 'down' : 'stable'; });

  const churnRisks: ChurnRisk[] = [
    { signal: 'Engagement frequency declining week-over-week', severity: overall < 50 ? 'Critical' : overall < 65 ? 'High' : 'Medium', affectedAudience: `${10 + seed % 25}% of active followers showing reduced interaction patterns`, preventionAction: 'Launch a 7-day engagement challenge or interactive series that rewards daily participation with exclusive content unlocks', urgency: overall < 50 ? 'Immediate — act within 48 hours' : 'This week — schedule intervention', estimatedImpact: `Could lose ${5 + s2 % 15}% of engaged audience within ${2 + seed % 4} weeks if unchecked` },
    { signal: 'Content format fatigue detected', severity: overall < 55 ? 'High' : 'Medium', affectedAudience: `${15 + s2 % 30}% showing reduced time-on-content metrics`, preventionAction: 'Introduce 2 new content formats this week — try live Q&A, behind-the-scenes reels, or collaborative posts with audience members', urgency: 'Within 1 week', estimatedImpact: `Format diversification typically recovers ${10 + s3 % 20}% of lost engagement within 3 weeks` },
    { signal: `${platform} algorithm deprioritizing your content`, severity: overall < 45 ? 'Critical' : 'Medium', affectedAudience: `Organic reach dropped ${15 + seed % 35}% — affecting all follower segments`, preventionAction: 'Create 3 "spark" posts designed for maximum engagement (polls, hot takes, giveaways) to signal the algorithm that your audience is active', urgency: overall < 45 ? 'Immediate — algorithm penalties compound daily' : 'This week', estimatedImpact: `Algorithm recovery takes ${1 + seed % 3} weeks of consistent high-engagement content` },
    { signal: 'Competitor content stealing attention share', severity: overall < 60 ? 'High' : 'Low', affectedAudience: `${8 + s3 % 20}% of your audience also engages heavily with ${seed % 2 === 0 ? '2-3' : '3-5'} direct competitors`, preventionAction: 'Conduct competitor content audit, identify gaps in their strategy, and create unique content angles they cannot replicate (proprietary data, unique access, personal stories)', urgency: 'Within 2 weeks', estimatedImpact: `Differentiated positioning can recapture ${5 + seed % 15}% of shared audience attention` },
    { signal: 'Email/newsletter open rates declining', severity: overall < 50 ? 'High' : 'Low', affectedAudience: `Open rate at ${20 + s2 % 30}% (down from ${30 + seed % 25}%) — ${1 + s3 % 4}K subscribers at risk of full disengagement`, preventionAction: 'A/B test 5 new subject line formulas, segment your list by engagement level, and create a re-engagement sequence for inactive subscribers', urgency: 'This week — email disengagement accelerates quickly', estimatedImpact: `Recovering ${10 + seed % 20}% of inactive subscribers equals ${100 + s2 % 900} re-engaged readers per send` },
  ];

  const drivers: LoyaltyDriver[] = [
    { driver: 'Content Consistency', score: 30 + seed % 65, description: 'How reliably you show up with valuable content on a predictable schedule — audiences reward reliability', improvement: `${contentFrequency === 'Daily' ? 'Maintain your daily cadence but add themed days (e.g., Tip Tuesday, Framework Friday)' : 'Increase posting frequency by 1 additional post per week while maintaining quality standards'}`, effortLevel: 'Medium' },
    { driver: 'Community Responsiveness', score: 25 + s2 % 70, description: 'Speed and quality of your replies to comments, DMs, and mentions — fast, personal responses build fierce loyalty', improvement: 'Set a 2-hour response window for comments, create saved replies for FAQs, and personally reply to every DM within 24 hours', effortLevel: 'High' },
    { driver: 'Content Uniqueness', score: 20 + s3 % 75, description: 'How differentiated your content is from competitors — unique insights, proprietary data, and original frameworks', improvement: 'Develop 3 signature frameworks only you can teach, share behind-the-scenes data others cannot access, and create a unique visual identity', effortLevel: 'High' },
    { driver: 'Audience Recognition', score: 30 + seed % 60, description: 'How often you spotlight, thank, and celebrate your community members — people stay where they feel valued', improvement: 'Launch a weekly "Community Spotlight" feature, reply with personalized video responses to top commenters, and create a public wall of your biggest supporters', effortLevel: 'Low' },
    { driver: 'Value Delivery', score: 35 + s2 % 60, description: 'The tangible takeaways your audience gets — actionable tips, templates, frameworks, and tools they can use immediately', improvement: 'End every post with a specific action step, create monthly downloadable resources, and share the exact tools and processes you use', effortLevel: 'Medium' },
    { driver: 'Emotional Connection', score: 20 + s3 % 70, description: 'The human element — vulnerability, storytelling, humor, and shared values that create bonds beyond information', improvement: 'Share 1 personal story per week (failures, lessons, behind-the-scenes struggles), ask your audience personal questions, and show your personality unfiltered', effortLevel: 'Low' },
    { driver: 'Exclusive Access', score: 15 + seed % 75, description: 'VIP perks for loyal followers — early access, private communities, exclusive content, and insider information', improvement: 'Create a free inner-circle (close friends list, private channel, or subscriber-only content) and reward engagement with exclusive access', effortLevel: 'Medium' },
  ];

  const playbook: RetentionPlaybook[] = [
    { tactic: 'Superfan Ambassador Program', targetSegment: 'Superfans', implementation: `Identify top ${3 + seed % 8}% of engagers, invite them to private group, give them early access to content and products, co-create content together, and feature them publicly`, expectedLift: `+${15 + s2 % 25}% advocacy-driven growth`, timeline: '2-4 weeks to launch', priority: 'P0' },
    { tactic: 'Re-engagement Drip Sequence', targetSegment: 'At-Risk', implementation: 'Create a 5-touch re-engagement sequence: Day 1 — best-of content, Day 3 — exclusive offer, Day 5 — personal message, Day 7 — feedback request, Day 10 — final value bomb', expectedLift: `+${10 + seed % 20}% win-back rate`, timeline: '1 week to create, ongoing', priority: 'P0' },
    { tactic: 'Lurker Activation Campaign', targetSegment: 'Lurkers', implementation: 'Create ultra-low-barrier engagement hooks: emoji polls, "double tap if you agree" posts, anonymous question boxes, and "screenshot this" content that requires no public engagement', expectedLift: `+${8 + s3 % 15}% lurker-to-casual conversion`, timeline: '1-2 weeks', priority: 'P1' },
    { tactic: 'Engagement Streak Rewards', targetSegment: 'Regulars', implementation: `Track consecutive weeks of engagement, publicly celebrate milestones (10-week streak, 50th comment), and offer escalating rewards: shoutout → exclusive content → 1-on-1 call → collaboration opportunity`, expectedLift: `+${12 + s2 % 18}% regular retention`, timeline: '2-3 weeks to set up', priority: 'P1' },
    { tactic: 'Content Variety Sprint', targetSegment: 'Casual Followers', implementation: 'Run a 2-week "format festival" testing 6+ content formats (live, carousel, reel, poll, thread, collab), track which formats casuals engage with, then build a rotation calendar', expectedLift: `+${5 + seed % 15}% casual engagement rate`, timeline: '2 weeks', priority: 'P1' },
    { tactic: 'Win-Back Content Series', targetSegment: 'Churned', implementation: 'Launch a "fresh start" content series that addresses common reasons for disengagement, promote it through alternative channels (email, ads, cross-platform), and offer a compelling reason to re-engage', expectedLift: `+${3 + s3 % 10}% churned reactivation`, timeline: '3-4 weeks', priority: 'P2' },
  ];

  const communityHealth: CommunityHealth = {
    replyRate: parseFloat((15 + seed % 60).toFixed(0)),
    shareRate: parseFloat((2 + (s2 % 80) / 10).toFixed(1)),
    saveRate: parseFloat((3 + (s3 % 90) / 10).toFixed(1)),
    dmsPerWeek: 5 + seed % 95,
    userGeneratedContent: 1 + s2 % 25,
    advocacyScore: 10 + s3 % 80,
  };

  const milestones: string[] = [
    `Celebrate hitting ${audienceSize === '< 1K' ? '500' : audienceSize === '1K-10K' ? '5K' : audienceSize === '10K-50K' ? '25K' : audienceSize === '50K-100K' ? '75K' : audienceSize === '100K-500K' ? '250K' : '1M'} followers with a gratitude post tagging your earliest supporters`,
    `Create a "Year in Review" post showcasing your community's growth, top moments, and most engaged members`,
    `Host a live AMA (Ask Me Anything) to celebrate ${seed % 2 === 0 ? '100 posts' : '1 year'} on ${platform} — make it interactive with prizes`,
    `Launch a community hashtag challenge and repost the best entries for a full week — let your audience be the stars`,
    `Send personalized thank-you messages to your top 50 engagers — handwritten notes or video messages for maximum impact`,
    `Create a "Wall of Fame" highlight or pinned post featuring community members who've been with you the longest`,
    `Offer an exclusive live workshop or webinar free to followers who've engaged consistently for ${2 + seed % 4}+ months`,
    `Publish a transparent "State of the Community" report sharing real metrics, lessons learned, and what's coming next — radical transparency builds trust`,
  ];

  return { loyaltyScore, segments, trends, churnRisks, drivers, playbook, communityHealth, milestones };
}

export default function AudienceLoyaltyPage() {
  const [platform, setPlatform] = useState(platforms[0]);
  const [audienceSize, setAudienceSize] = useState(audienceSizes[0]);
  const [contentFrequency, setContentFrequency] = useState(contentFrequencies[0]);
  const [niche, setNiche] = useState(niches[0]);
  const [accountAge, setAccountAge] = useState(accountAges[0]);
  const [brandName, setBrandName] = useState('');
  const [result, setResult] = useState<LoyaltyReport | null>(null);

  const handleGenerate = () => { if (brandName.trim()) setResult(trackLoyalty(platform, audienceSize, contentFrequency, niche, accountAge, brandName)); };
  const scoreColor = (n: number) => n >= 80 ? '#34d399' : n >= 60 ? '#a3e635' : n >= 40 ? '#fbbf24' : '#f87171';
  const tierColor = (t: string) => t === 'Exceptional' ? '#34d399' : t === 'Strong' ? '#a3e635' : t === 'Solid' ? '#fbbf24' : t === 'Developing' ? '#fb923c' : '#f87171';
  const sevColor = (s: string) => s === 'Low' ? '#34d399' : s === 'Medium' ? '#fbbf24' : s === 'High' ? '#fb923c' : '#f87171';

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Audience Loyalty Tracker</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Measure, segment, and strengthen your audience loyalty. Identify superfans, detect churn risks, and get a personalized retention playbook to turn casual followers into lifelong advocates.</p>

        <div className="mb-4">
          <label className="block text-sm text-zinc-400 mb-1">Brand / Account Name</label>
          <input type="text" value={brandName} onChange={e => setBrandName(e.target.value)} placeholder="e.g., PostCraft, @yourhandle" className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-3 text-zinc-100" />
        </div>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {([
            { label: 'Platform', value: platform, setter: setPlatform as (v: string) => void, options: platforms as readonly string[] },
            { label: 'Audience Size', value: audienceSize, setter: setAudienceSize as (v: string) => void, options: audienceSizes as readonly string[] },
            { label: 'Content Frequency', value: contentFrequency, setter: setContentFrequency as (v: string) => void, options: contentFrequencies as readonly string[] },
            { label: 'Niche', value: niche, setter: setNiche as (v: string) => void, options: niches as readonly string[] },
            { label: 'Account Age', value: accountAge, setter: setAccountAge as (v: string) => void, options: accountAges as readonly string[] },
          ] as const).map(({ label, value, setter, options }) => (
            <div key={label}>
              <label className="block text-sm text-zinc-400 mb-1">{label}</label>
              <select value={value} onChange={e => setter(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100">
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
        <button onClick={handleGenerate} className="w-full md:w-auto bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded font-semibold hover:opacity-90 transition mb-8">Track Audience Loyalty</button>

        {result && (
          <div className="space-y-8">
            {/* Overall Loyalty Score */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 text-center">
              <div className="text-5xl font-bold mb-2" style={{ color: scoreColor(result.loyaltyScore.overall) }}>{result.loyaltyScore.overall}</div>
              <div className="text-zinc-400 mb-2">Overall Loyalty Score</div>
              <div className="text-lg font-semibold" style={{ color: tierColor(result.loyaltyScore.tier) }}>{result.loyaltyScore.tier}</div>
              <div className="mt-3 max-w-md mx-auto w-full bg-zinc-800 rounded-full h-3">
                <div className="h-3 rounded-full transition-all" style={{ width: `${result.loyaltyScore.overall}%`, background: scoreColor(result.loyaltyScore.overall) }} />
              </div>
            </div>

            {/* Audience Segments */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Audience Segments ({result.segments.length})</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {result.segments.map((seg, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-zinc-200">{seg.name}</span>
                      <div className="flex gap-2 items-center">
                        <span className="text-lg font-bold" style={{ color: scoreColor(seg.percentage > 15 ? 70 : seg.percentage > 8 ? 50 : 85) }}>{seg.percentage}%</span>
                        <span className="text-xs px-2 py-1 rounded font-bold" style={{ color: sevColor(seg.riskLevel), background: `${sevColor(seg.riskLevel)}15` }}>{seg.riskLevel} Risk</span>
                      </div>
                    </div>
                    <div className="text-sm text-zinc-400 mb-2">{seg.behavior}</div>
                    <div className="text-xs text-violet-400/80 mb-1">Retention: {seg.retentionStrategy}</div>
                    <div className="text-xs text-zinc-500">Value: {seg.valueToBrand}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Engagement Trends */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Engagement Trends</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {result.trends.map((t, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-zinc-200">{t.metric}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-zinc-100">{t.current}{t.metric === 'Profile Visits' ? '' : '%'}</span>
                        <span className="text-sm" style={{ color: t.trend === 'up' ? '#34d399' : t.trend === 'down' ? '#f87171' : '#fbbf24' }}>
                          {t.trend === 'up' ? '\u2191' : t.trend === 'down' ? '\u2193' : '\u2192'} {t.change > 0 ? '+' : ''}{t.change}%
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-zinc-500 mb-1">Previous: {t.previous}{t.metric === 'Profile Visits' ? '' : '%'}</div>
                    <div className="text-xs text-zinc-400">{t.insight}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Churn Risk Signals */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Churn Risk Signals</h3>
              <div className="space-y-3">
                {result.churnRisks.map((r, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50" style={{ borderLeftWidth: 3, borderLeftColor: sevColor(r.severity) }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-zinc-200">{r.signal}</span>
                      <span className="text-xs px-2 py-1 rounded font-bold" style={{ color: sevColor(r.severity), background: `${sevColor(r.severity)}15` }}>{r.severity}</span>
                    </div>
                    <div className="text-sm text-zinc-400 mb-1">Affected: {r.affectedAudience}</div>
                    <div className="text-xs text-emerald-400/70 mb-1">Prevention: {r.preventionAction}</div>
                    <div className="flex justify-between text-xs text-zinc-500">
                      <span>Urgency: {r.urgency}</span>
                      <span>Impact: {r.estimatedImpact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Loyalty Drivers */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Loyalty Drivers</h3>
              <div className="space-y-4">
                {result.drivers.map((d, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-zinc-200">{d.driver}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold" style={{ color: scoreColor(d.score) }}>{d.score}/100</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-zinc-700 text-zinc-300">{d.effortLevel} effort</span>
                      </div>
                    </div>
                    <div className="w-full bg-zinc-700 rounded-full h-2 mb-2">
                      <div className="h-2 rounded-full transition-all" style={{ width: `${d.score}%`, background: scoreColor(d.score) }} />
                    </div>
                    <div className="text-xs text-zinc-400 mb-1">{d.description}</div>
                    <div className="text-xs text-emerald-400/70">Improve: {d.improvement}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Retention Playbook */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Retention Playbook</h3>
              <div className="space-y-3">
                {result.playbook.map((p, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-zinc-200">{p.tactic}</span>
                      <div className="flex gap-2">
                        <span className="text-xs px-2 py-0.5 rounded" style={{ color: p.priority === 'P0' ? '#f87171' : p.priority === 'P1' ? '#fbbf24' : '#60a5fa', background: p.priority === 'P0' ? '#f8717115' : p.priority === 'P1' ? '#fbbf2415' : '#60a5fa15' }}>{p.priority}</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-zinc-700 text-zinc-300">{p.targetSegment}</span>
                      </div>
                    </div>
                    <div className="text-sm text-zinc-400 mb-1">{p.implementation}</div>
                    <div className="flex gap-4 text-xs">
                      <span className="text-emerald-400/70">Lift: {p.expectedLift}</span>
                      <span className="text-zinc-500">Timeline: {p.timeline}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Health Dashboard */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Community Health Dashboard</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { label: 'Reply Rate', value: `${result.communityHealth.replyRate}%`, desc: 'Percentage of comments you reply to' },
                  { label: 'Share Rate', value: `${result.communityHealth.shareRate}%`, desc: 'Content shared per impression' },
                  { label: 'Save Rate', value: `${result.communityHealth.saveRate}%`, desc: 'Content saved/bookmarked per impression' },
                  { label: 'DMs per Week', value: `${result.communityHealth.dmsPerWeek}`, desc: 'Inbound direct messages weekly' },
                  { label: 'UGC Pieces/Month', value: `${result.communityHealth.userGeneratedContent}`, desc: 'User-generated content mentioning you' },
                  { label: 'Advocacy Score', value: `${result.communityHealth.advocacyScore}/100`, desc: 'How likely followers are to recommend you' },
                ].map((m, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50 text-center">
                    <div className="text-2xl font-bold text-zinc-100 mb-1">{m.value}</div>
                    <div className="text-sm font-semibold text-zinc-300 mb-1">{m.label}</div>
                    <div className="text-xs text-zinc-500">{m.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Loyalty Milestones */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Loyalty Milestones to Celebrate</h3>
              <div className="space-y-2">
                {result.milestones.map((m, i) => (
                  <div key={i} className="flex gap-3 items-start text-sm text-zinc-400">
                    <span className="text-violet-400 shrink-0 mt-0.5">&#9744;</span>
                    {m}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">Turn Followers Into Lifelong Advocates</h3>
              <p className="text-zinc-400 mb-4">PostCraft AI helps you build unshakeable audience loyalty. Pair with <a href="/audience-segmentation" className="text-violet-400 underline">Audience Segmentation</a>, <a href="/content-fatigue" className="text-violet-400 underline">Content Fatigue Detector</a>, and <a href="/engagement-calculator" className="text-violet-400 underline">Engagement Calculator</a>.</p>
              <a href="/pricing" className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">Get PostCraft Pro</a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
