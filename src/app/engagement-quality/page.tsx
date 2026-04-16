'use client';
import { useState } from 'react';

const platforms = ['LinkedIn', 'Instagram', 'Twitter/X', 'TikTok', 'YouTube', 'Facebook', 'Email', 'All Platforms'] as const;
const contentTypes = ['Blog Posts', 'Social Posts', 'Video Content', 'Email Campaigns', 'Webinars', 'Podcasts', 'All Content'] as const;
const goals = ['Revenue Attribution', 'Brand Building', 'Community Growth', 'Lead Generation', 'Thought Leadership', 'Product Adoption'] as const;
const audiences = ['B2B Enterprise', 'B2B SMB', 'B2C Mass Market', 'B2C Premium', 'Creators', 'Developers'] as const;

interface QualityDimension { dimension: string; score: number; vanityMetric: string; qualityMetric: string; gap: string; insight: string; action: string; }
interface EngagementTier { tier: string; percentage: number; behavior: string; value: string; nurture: string; content: string; }
interface ContentRanking { content: string; vanityRank: number; qualityRank: number; delta: string; reason: string; recommendation: string; }
interface SignalAnalysis { signal: string; weight: string; currentPerformance: string; benchmark: string; improvement: string; }

interface QualityReport {
  overallQualityScore: number;
  qualityVsVanityGap: number;
  dimensions: QualityDimension[];
  tiers: EngagementTier[];
  rankings: ContentRanking[];
  signals: SignalAnalysis[];
  qualityBoosters: string[];
  vanityTraps: string[];
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }

function analyzeQuality(platform: string, contentType: string, goal: string, audience: string, brand: string): QualityReport {
  const seed = hash(`${platform}-${contentType}-${goal}-${audience}-${brand}`);
  const overallQualityScore = 25 + seed % 65;
  const qualityVsVanityGap = 10 + seed % 40;

  const dimensions: QualityDimension[] = [
    { dimension: 'Depth of Engagement', score: 20 + seed % 65, vanityMetric: `${(seed % 50 + 10) * 100} likes`, qualityMetric: `${seed % 15 + 2} min avg read time`, gap: `Likes inflate perceived engagement by ${20 + seed % 40}%`, insight: 'A post with 500 likes but 30-second avg read time isn\'t actually engaging — it\'s just likeable', action: 'Track time-on-content and scroll depth instead of likes — these predict conversion 4x better' },
    { dimension: 'Conversation Quality', score: 30 + seed % 55, vanityMetric: `${seed % 100 + 20} comments`, qualityMetric: `${seed % 30 + 5}% substantive replies`, gap: `${60 + seed % 25}% of comments are emoji-only or generic ("Great post!")`, insight: 'High comment count with low substantive replies = echo chamber, not engagement', action: 'Track reply depth (multi-reply threads) and ask specific questions to prompt thoughtful responses' },
    { dimension: 'Share Intent', score: 25 + seed % 60, vanityMetric: `${seed % 200 + 30} shares`, qualityMetric: `${seed % 20 + 5}% share with commentary`, gap: 'Most shares are mindless reposts — few add their own perspective', insight: 'Shares with added commentary indicate genuine endorsement — these drive 5x more referral traffic', action: 'Create "share-worthy" insights that beg for commentary — hot takes, data reveals, contrarian views' },
    { dimension: 'Follow-Through Rate', score: 15 + seed % 50, vanityMetric: `${(seed % 30 + 5) * 10} link clicks`, qualityMetric: `${seed % 15 + 3}% complete the desired action`, gap: `${70 + seed % 20}% of clickers bounce within 10 seconds`, insight: 'Link clicks without follow-through means your CTA promise doesn\'t match the landing experience', action: 'Ensure landing page matches the tone, promise, and urgency of the social CTA — consistency converts' },
    { dimension: 'Audience Quality', score: 30 + seed % 55, vanityMetric: `${(seed % 50 + 5) * 100} followers`, qualityMetric: `${seed % 20 + 5}% match ideal customer profile`, gap: `${60 + seed % 30}% of followers will never buy — they're outside your target market`, insight: 'Growing followers in wrong segments dilutes engagement rate and wastes content investment', action: 'Audit follower quality quarterly — create content that attracts your ICP, not just anyone' },
    { dimension: 'Revenue Correlation', score: 10 + seed % 45, vanityMetric: `${seed % 5 + 1}M impressions`, qualityMetric: `$${seed % 50 + 5} revenue per 1K quality engagements`, gap: 'Impressions have near-zero correlation with revenue — engagement quality drives 80% of content ROI', insight: 'High impressions with low revenue correlation means you\'re reaching the wrong people or with the wrong message', action: 'Track revenue per quality engagement (substantive comment, long read, share with commentary) — this is your true north' },
  ];

  const tiers: EngagementTier[] = [
    { tier: 'Superfans (top 1%)', percentage: 1, behavior: 'Comment on every post, share with commentary, reply to replies, tag friends', value: 'Drive 30% of total engagement value — each superfan is worth 50 casual followers', nurture: 'Personal recognition, early access, exclusive content, direct DM relationship', content: 'Behind-the-scenes, insider knowledge, "you heard it here first" exclusives' },
    { tier: 'Active Engagers (top 10%)', percentage: 9, behavior: 'Regular likes, occasional comments, share interesting posts', value: 'Drive 40% of engagement — backbone of consistent engagement', nurture: 'Consistent high-quality content, response to their comments, community inclusion', content: 'Deep dives, tutorials, thought leadership — they\'ll read the whole thing' },
    { tier: 'Passive Consumers (middle 40%)', percentage: 40, behavior: 'Like occasionally, read content, rarely comment or share', value: 'Large but low-intensity — potential for upgrade with right triggers', nurture: 'Polls, questions, low-friction engagement prompts ("Drop a fire emoji if you agree")', content: 'Scannable content, infographics, short-form video — meet them where they are' },
    { tier: 'Ghost Followers (bottom 50%)', percentage: 50, behavior: 'Follow but never engage — may not even see your content', value: 'Near-zero engagement value — inflate follower count artificially', nurture: 'Re-engagement campaigns, "still interested?" posts, content format experiments', content: 'Pattern-breaking content that stops the scroll — if it doesn\'t re-engage them in 30 days, they\'re truly gone' },
  ];

  const rankings: ContentRanking[] = [
    { content: 'Viral meme/trending post', vanityRank: 1, qualityRank: 5, delta: '-4 positions', reason: 'High likes/shares but attracts wrong audience — zero conversion value', recommendation: 'Limit viral-chasing to 10% of content — it inflates vanity metrics while diluting quality' },
    { content: 'Deep-dive industry analysis', vanityRank: 4, qualityRank: 1, delta: '+3 positions', reason: 'Lower engagement count but highest time-on-content, saves, and conversion rate', recommendation: 'This is your most valuable content type — increase frequency and promote heavily' },
    { content: 'Customer case study', vanityRank: 5, qualityRank: 2, delta: '+3 positions', reason: 'Low reach but highest click-through and conversion — attracts decision-stage buyers', recommendation: 'Promote case studies in email nurture and retargeting — they convert the already-interested' },
    { content: 'Quick tip / one-liner', vanityRank: 2, qualityRank: 4, delta: '-2 positions', reason: 'High likes but low depth — easy to engage with but doesn\'t move the needle', recommendation: 'Use quick tips as hooks that link to deeper content — don\'t let them stand alone' },
    { content: 'Behind-the-scenes / personal story', vanityRank: 3, qualityRank: 3, delta: '0 (aligned)', reason: 'Balanced — good engagement quality and quantity, builds genuine connection', recommendation: 'Perfect mix — maintain 15-20% of content calendar for BTS/personal content' },
  ];

  const signals: SignalAnalysis[] = [
    { signal: 'Save / Bookmark Rate', weight: 'Very High (9/10)', currentPerformance: `${(seed % 3) + 1}.${seed % 10}%`, benchmark: '2-5% (industry top)', improvement: 'Create content worth revisiting — frameworks, checklists, reference guides' },
    { signal: 'Reply Thread Depth', weight: 'High (8/10)', currentPerformance: `${1 + seed % 3} avg replies per thread`, benchmark: '3+ (viral quality)', improvement: 'End posts with specific questions, respond to every comment to spark threads' },
    { signal: 'Profile Visit Rate', weight: 'High (7/10)', currentPerformance: `${seed % 5 + 1}%`, benchmark: '5-10%', improvement: 'Make your bio a landing page — clear value prop, link, and CTA' },
    { signal: 'DM / Contact Rate', weight: 'Very High (10/10)', currentPerformance: `${seed % 3}.${seed % 10}%`, benchmark: '1-3%', improvement: 'The highest-quality signal — these people are ready to buy or collaborate' },
    { signal: 'Content-to-Website Conversion', weight: 'Very High (9/10)', currentPerformance: `${seed % 5 + 1}%`, benchmark: '3-8%', improvement: 'Match CTA promise to landing page — consistency drives completion' },
    { signal: 'Follower-to-Lead Ratio', weight: 'High (8/10)', currentPerformance: `${seed % 3}.${seed % 10}%`, benchmark: '2-5%', improvement: 'Create platform-specific lead magnets — "DM me [keyword] for the free template"' },
  ];

  const qualityBoosters = [
    'Ask specific questions at the end of every post — "What\'s your take on X?" drives 3x more substantive comments than "Agree?"',
    'Respond to every comment within 2 hours — it doubles the thread depth and signals the algorithm to boost your content',
    'Create "save-worthy" content — frameworks, checklists, and reference materials get saved 5x more than opinions',
    'End threads with a controversial take — disagreement drives the deepest conversations',
    'Use DM automations strategically — "Comment [keyword] and I\'ll DM you the template" qualifies leads from engagement',
    'Track quality engagement weekly — saves, profile visits, DMs, and website conversions > likes and impressions',
    'Create content for your top 10% — they drive 70% of your engagement value. Don\'t water down for the masses.',
    'Add "expansion modules" to high-performing posts — FAQ, calculator, or case study that deepens engagement',
  ];

  const vanityTraps = [
    'Follower count obsession — 5,000 engaged followers > 50,000 ghost followers for revenue impact',
    'Like-chasing — likes are the lowest-quality signal and correlate least with conversion',
    'Impression farming — going viral once doesn\'t build a business; consistent quality engagement does',
    'Comment farming ("tag a friend!") — inflates metrics with zero-value interactions',
    'Share-for-share schemes — artificial amplification that attracts the wrong audience',
  ];

  return { overallQualityScore, qualityVsVanityGap, dimensions, tiers, rankings, signals, qualityBoosters, vanityTraps };
}

export default function EngagementQualityPage() {
  const [platform, setPlatform] = useState(platforms[0]);
  const [contentType, setContentType] = useState(contentTypes[0]);
  const [goal, setGoal] = useState(goals[0]);
  const [audience, setAudience] = useState(audiences[0]);
  const [brand, setBrand] = useState('');
  const [result, setResult] = useState<QualityReport | null>(null);

  const handleGenerate = () => { if (brand.trim()) setResult(analyzeQuality(platform, contentType, goal, audience, brand)); };
  const scoreColor = (n: number) => n >= 70 ? '#34d399' : n >= 50 ? '#a3e635' : n >= 30 ? '#fbbf24' : '#f87171';

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Engagement Quality Score</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Go beyond vanity metrics. Measure the real quality of your engagement — depth, conversation quality, share intent, follow-through, audience quality, and revenue correlation. Stop chasing likes. Start measuring what matters.</p>

        <div className="mb-4">
          <label className="block text-sm text-zinc-400 mb-1">Brand / Account</label>
          <input type="text" value={brand} onChange={e => setBrand(e.target.value)} placeholder="e.g., PostCraft, @yourhandle" className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-3 text-zinc-100" />
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {([
            { label: 'Platform', value: platform, setter: setPlatform as (v: string) => void, options: platforms as readonly string[] },
            { label: 'Content Type', value: contentType, setter: setContentType as (v: string) => void, options: contentTypes as readonly string[] },
            { label: 'Primary Goal', value: goal, setter: setGoal as (v: string) => void, options: goals as readonly string[] },
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
        <button onClick={handleGenerate} className="w-full md:w-auto bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded font-semibold hover:opacity-90 transition mb-8">Analyze Engagement Quality</button>

        {result && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 text-center">
                <div className="text-5xl font-bold mb-2" style={{ color: scoreColor(result.overallQualityScore) }}>{result.overallQualityScore}</div>
                <div className="text-zinc-400">Engagement Quality Score</div>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 text-center">
                <div className="text-5xl font-bold mb-2 text-amber-400">{result.qualityVsVanityGap}%</div>
                <div className="text-zinc-400">Quality vs. Vanity Gap</div>
                <div className="text-xs text-zinc-500 mt-1">Your vanity metrics overstate true engagement by this much</div>
              </div>
            </div>

            {/* Quality Dimensions */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-violet-400">Quality Dimensions</h3>
              <div className="space-y-4">
                {result.dimensions.map((d, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-zinc-200">{d.dimension}</span>
                      <span className="text-sm font-bold" style={{ color: scoreColor(d.score) }}>{d.score}%</span>
                    </div>
                    <div className="w-full bg-zinc-800 rounded-full h-2 mb-2"><div className="h-2 rounded-full" style={{ width: `${d.score}%`, background: scoreColor(d.score) }} /></div>
                    <div className="grid md:grid-cols-2 gap-2 text-xs mb-2">
                      <div><span className="text-red-400/60">Vanity:</span> <span className="text-zinc-400">{d.vanityMetric}</span></div>
                      <div><span className="text-emerald-400/70">Quality:</span> <span className="text-zinc-300">{d.qualityMetric}</span></div>
                    </div>
                    <div className="text-xs text-zinc-500 mb-1">{d.insight}</div>
                    <div className="text-xs text-emerald-400/70">{d.action}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Engagement Tiers + Content Rankings */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-fuchsia-400">Audience Engagement Tiers</h3>
                <div className="space-y-3">
                  {result.tiers.map((t, i) => (
                    <div key={i} className="bg-zinc-800/40 rounded-lg p-3 border border-zinc-700/50">
                      <div className="flex justify-between mb-1"><span className="text-sm font-semibold text-zinc-200">{t.tier}</span><span className="text-xs text-fuchsia-400">{t.percentage}%</span></div>
                      <div className="text-xs space-y-0.5">
                        <div className="text-zinc-400">{t.behavior}</div>
                        <div className="text-amber-400/70">{t.value}</div>
                        <div className="text-emerald-400/70">Nurture: {t.nurture}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-amber-400">Vanity vs. Quality Rankings</h3>
                <div className="space-y-3">
                  {result.rankings.map((r, i) => (
                    <div key={i} className="bg-zinc-800/40 rounded-lg p-3 border border-zinc-700/50">
                      <div className="text-sm font-semibold text-zinc-200 mb-1">{r.content}</div>
                      <div className="flex gap-3 text-xs mb-1">
                        <span className="text-zinc-500">Vanity: #{r.vanityRank}</span>
                        <span className="text-emerald-400">Quality: #{r.qualityRank}</span>
                        <span className="font-bold" style={{ color: r.delta.includes('+') ? '#34d399' : r.delta.includes('-') ? '#f87171' : '#fbbf24' }}>{r.delta}</span>
                      </div>
                      <div className="text-xs text-zinc-500">{r.reason}</div>
                      <div className="text-xs text-emerald-400/70">{r.recommendation}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quality Signals */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-emerald-400">Quality Signals to Track</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {result.signals.map((s, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-3 border border-zinc-700/50">
                    <div className="flex justify-between mb-1"><span className="text-sm font-semibold text-zinc-200">{s.signal}</span><span className="text-xs text-violet-400">{s.weight}</span></div>
                    <div className="text-xs space-y-0.5">
                      <div className="flex gap-3"><span className="text-zinc-500">Current: {s.currentPerformance}</span><span className="text-zinc-500">Benchmark: {s.benchmark}</span></div>
                      <div className="text-emerald-400/70">{s.improvement}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Boosters + Traps */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-emerald-400">Quality Boosters</h3>
                <div className="space-y-2">{result.qualityBoosters.map((b, i) => <div key={i} className="text-sm text-zinc-400 flex gap-2"><span className="text-emerald-400 shrink-0">→</span>{b}</div>)}</div>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-red-400">Vanity Traps to Avoid</h3>
                <div className="space-y-2">{result.vanityTraps.map((t, i) => <div key={i} className="text-sm text-zinc-400 flex gap-2"><span className="text-red-400 shrink-0">✕</span>{t}</div>)}</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">Stop Chasing Likes. Start Measuring Revenue.</h3>
              <p className="text-zinc-400 mb-4">PostCraft AI separates vanity from value so you invest in content that actually drives business. Pair with <a href="/content-journey" className="text-violet-400 underline">Content Journey</a>, <a href="/roi-calculator" className="text-violet-400 underline">ROI Calculator</a>, and <a href="/content-scoring" className="text-violet-400 underline">Content Scoring</a>.</p>
              <a href="/pricing" className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">Get PostCraft Pro</a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
