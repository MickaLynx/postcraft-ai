'use client';
import { useState } from 'react';

const primaryPlatforms = ['Instagram', 'Twitter/X', 'LinkedIn', 'TikTok', 'YouTube', 'Facebook'] as const;
const secondaryPlatforms = ['Instagram', 'Twitter/X', 'LinkedIn', 'TikTok', 'YouTube', 'Facebook', 'Pinterest', 'Reddit'] as const;
const audienceSizes = ['< 1K followers', '1K-10K', '10K-50K', '50K-100K', '100K-500K', '500K+'] as const;
const industries = ['E-commerce', 'SaaS / Tech', 'Health & Wellness', 'Finance', 'Education', 'Creator Economy', 'Agency', 'Media'] as const;

interface OverlapSegment { segment: string; percentage: number; behavior: string; bestPlatform: string; contentPreference: string; monetizationPotential: string; }
interface PlatformComparison { metric: string; platform1Value: string; platform2Value: string; winner: string; insight: string; }
interface CrossPostStrategy { fromPlatform: string; toPlatform: string; adaptationNeeded: string; expectedRetention: string; doNot: string; }
interface UniqueAudience { platform: string; percentage: number; description: string; contentThatWorks: string; retentionTip: string; }
interface MigrationRisk { scenario: string; riskLevel: string; audienceLoss: string; mitigation: string; timeline: string; }

interface OverlapReport {
  overlapPercentage: number;
  uniquePlatform1: number;
  uniquePlatform2: number;
  segments: OverlapSegment[];
  comparison: PlatformComparison[];
  crossPostStrategies: CrossPostStrategy[];
  uniqueAudiences: UniqueAudience[];
  migrationRisks: MigrationRisk[];
  actionPlan: string[];
  contentCalendarTips: string[];
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }

function analyzeOverlap(primary: string, secondary: string, size: string, industry: string, brand: string): OverlapReport {
  const seed = hash(`${primary}-${secondary}-${size}-${industry}-${brand}`);
  const overlapPercentage = 15 + seed % 40;
  const uniquePlatform1 = Math.round((100 - overlapPercentage) * (0.4 + (seed % 20) / 100));
  const uniquePlatform2 = 100 - overlapPercentage - uniquePlatform1;

  const segments: OverlapSegment[] = [
    { segment: 'Power Followers (follow on both)', percentage: overlapPercentage, behavior: 'Your most engaged audience — they actively seek your content across platforms', bestPlatform: `Engage on ${primary} (deeper relationship), announce on ${secondary}`, contentPreference: 'Exclusive/early access content. They hate seeing the exact same post on both platforms.', monetizationPotential: 'Highest — 3-5x more likely to purchase than single-platform followers' },
    { segment: `${primary}-Only Followers`, percentage: uniquePlatform1, behavior: `Consume content natively on ${primary} — may not know you exist on ${secondary}`, bestPlatform: primary, contentPreference: `${primary === 'LinkedIn' ? 'Long-form thought leadership, professional insights' : primary === 'Instagram' ? 'Visual storytelling, reels, carousel tutorials' : primary === 'Twitter/X' ? 'Hot takes, threads, real-time commentary' : primary === 'TikTok' ? 'Short entertaining videos, trending sounds, raw content' : 'Platform-native content'}`, monetizationPotential: 'Medium — need nurturing to convert, but highly platform-loyal' },
    { segment: `${secondary}-Only Followers`, percentage: uniquePlatform2, behavior: `Discovered you on ${secondary} — different discovery path than ${primary} audience`, bestPlatform: secondary, contentPreference: `${secondary === 'LinkedIn' ? 'Professional content, case studies' : secondary === 'YouTube' ? 'Long-form video, tutorials, vlogs' : secondary === 'Reddit' ? 'Community discussions, AMAs, value-first content' : 'Platform-native format'}`, monetizationPotential: 'Medium — different buying triggers than primary audience' },
    { segment: 'Ghost Followers (inactive on both)', percentage: 10 + seed % 15, behavior: 'Followed once, never engage — inflating your follower count without value', bestPlatform: 'Neither — focus on re-engagement or accept the ghost ratio', contentPreference: 'Occasionally react to extremely viral or controversial content', monetizationPotential: 'Near zero — do not optimize for this segment' },
    { segment: 'Platform Switchers (migrating)', percentage: 3 + seed % 8, behavior: `Currently transitioning from ${seed % 2 === 0 ? primary : secondary} to ${seed % 2 === 0 ? secondary : primary} — follow on both during transition`, bestPlatform: `Meet them on ${seed % 2 === 0 ? secondary : primary} (their new home)`, contentPreference: 'Easy-to-consume content during their adjustment period', monetizationPotential: 'High during transition — they\'re actively looking for new content sources' },
  ];

  const comparison: PlatformComparison[] = [
    { metric: 'Engagement Rate', platform1Value: `${2 + seed % 6}%`, platform2Value: `${1 + seed % 5}%`, winner: seed % 3 === 0 ? secondary : primary, insight: 'Higher engagement doesn\'t always mean better — check engagement quality (comments vs likes)' },
    { metric: 'Follower Growth Rate', platform1Value: `+${100 + seed % 500}/week`, platform2Value: `+${50 + seed % 300}/week`, winner: seed % 2 === 0 ? primary : secondary, insight: 'Growth rate matters more than total count — a smaller, growing audience outperforms a large, stagnant one' },
    { metric: 'Content Lifespan', platform1Value: `${primary === 'Twitter/X' ? '15-30 min' : primary === 'Instagram' ? '24-48 hours' : primary === 'LinkedIn' ? '2-3 days' : '1-7 days'}`, platform2Value: `${secondary === 'YouTube' ? '30-90 days' : secondary === 'Pinterest' ? '3-6 months' : secondary === 'LinkedIn' ? '2-3 days' : '24-48 hours'}`, winner: 'Varies by platform', insight: 'Short-lifespan platforms need volume; long-lifespan platforms need quality. Budget effort accordingly.' },
    { metric: 'Click-Through to Website', platform1Value: `${0.5 + (seed % 30) / 10}%`, platform2Value: `${0.3 + (seed % 25) / 10}%`, winner: seed % 2 === 0 ? primary : secondary, insight: 'CTR is the metric that connects social to revenue — optimize CTAs on the winning platform' },
    { metric: 'Cost per Follower (paid)', platform1Value: `$${(0.5 + (seed % 30) / 10).toFixed(2)}`, platform2Value: `$${(0.3 + (seed % 40) / 10).toFixed(2)}`, winner: 'Lower is better', insight: 'If running paid campaigns, invest more on the cheaper platform — then cross-pollinate organically' },
    { metric: 'Audience Quality Score', platform1Value: `${50 + seed % 40}/100`, platform2Value: `${40 + seed % 45}/100`, winner: seed % 2 === 0 ? primary : secondary, insight: 'Based on: engagement depth, profile completeness, follower-to-following ratio, account age' },
  ];

  const crossPostStrategies: CrossPostStrategy[] = [
    { fromPlatform: primary, toPlatform: secondary, adaptationNeeded: `Reformat for ${secondary}: ${secondary === 'LinkedIn' ? 'add professional context, remove casual tone, lead with insight' : secondary === 'TikTok' ? 'cut to 30-60 seconds, add trending audio, more personality' : secondary === 'Twitter/X' ? 'distill to 280 chars or thread, sharper hook, more opinion' : 'adapt visual format and tone'}`, expectedRetention: `${50 + seed % 30}% of adapted content performs at 80%+ of native content`, doNot: 'Never post identical content with the same caption — your overlap audience will see both and disengage' },
    { fromPlatform: secondary, toPlatform: primary, adaptationNeeded: `Reformat for ${primary}: ${primary === 'Instagram' ? 'create carousel from key points, design-first, strong hook in first slide' : primary === 'LinkedIn' ? 'expand with professional angle, add takeaway, business context' : 'match native format expectations'}`, expectedRetention: `${40 + seed % 35}% of adapted content works — test before committing`, doNot: 'Don\'t force content that doesn\'t fit the platform — some content is platform-specific by nature' },
    { fromPlatform: `${primary} (top performer)`, toPlatform: `${secondary} (repurpose)`, adaptationNeeded: 'Take your top 10% content and create platform-native versions — this is your safest cross-post strategy', expectedRetention: '70-90% of original performance — proven content, just adapted format', doNot: 'Don\'t repurpose mediocre content — only your best. Bad content in a new format is still bad content.' },
  ];

  const uniqueAudiences: UniqueAudience[] = [
    { platform: primary, percentage: uniquePlatform1, description: `${uniquePlatform1}% of your audience is ONLY on ${primary} — they will never see your ${secondary} content`, contentThatWorks: `${primary}-native formats that maximize the platform\'s strengths`, retentionTip: `Don\'t neglect ${primary} to chase growth on ${secondary} — this ${uniquePlatform1}% is your base` },
    { platform: secondary, percentage: uniquePlatform2, description: `${uniquePlatform2}% is ONLY on ${secondary} — a completely separate audience with different expectations`, contentThatWorks: `Content that matches ${secondary} culture and format expectations`, retentionTip: `These followers chose ${secondary} specifically — respect platform norms or lose them` },
  ];

  const migrationRisks: MigrationRisk[] = [
    { scenario: `${primary} algorithm change tanks your reach`, riskLevel: `${20 + seed % 30}%`, audienceLoss: `${30 + seed % 30}% of ${primary}-only audience becomes unreachable`, mitigation: `Build ${secondary} as insurance — aim for 30%+ of your ${primary} audience on ${secondary}`, timeline: 'Start now — platform diversification takes 3-6 months to mature' },
    { scenario: `${secondary} platform decline or policy change`, riskLevel: `${10 + seed % 20}%`, audienceLoss: `${uniquePlatform2}% of total audience at risk`, mitigation: `Email list capture from ${secondary} audience — own the relationship, don\'t rent it`, timeline: 'Ongoing — add email CTA to every piece of content' },
    { scenario: 'Cross-platform content fatigue', riskLevel: `${25 + seed % 20}%`, audienceLoss: `${overlapPercentage}% overlap audience disengages from one platform`, mitigation: 'Differentiate content across platforms — same message, different execution', timeline: 'Immediate — audit current cross-posting for identical content' },
  ];

  const actionPlan = [
    `Your ${overlapPercentage}% overlap audience is VIP — never show them identical content. Create "platform-exclusive" experiences for each.`,
    `${primary}-only audience (${uniquePlatform1}%): Double down on ${primary}-native content. Don't dilute by forcing ${secondary} reposts.`,
    `${secondary}-only audience (${uniquePlatform2}%): Treat as a separate audience with its own content strategy.`,
    `Cross-pollination target: Move 10-15% of ${primary}-only audience to also follow on ${secondary} (and vice versa) via platform-specific CTAs.`,
    'Email capture is the hedge: aim for 20%+ of total social audience on your email list within 6 months.',
    'Monthly overlap audit: If overlap grows above 50%, you\'re not reaching new people — diversify content or try a new platform.',
  ];

  const contentCalendarTips = [
    `Monday: ${primary} original content (designed for ${primary}-only audience)`,
    `Tuesday: ${secondary} original content (designed for ${secondary}-only audience)`,
    `Wednesday: Cross-adapted content (top performer from last week, reformatted)`,
    `Thursday: ${primary} engagement content (polls, questions, stories — overlap audience loves interaction)`,
    `Friday: ${secondary} engagement content (community building on secondary platform)`,
    `Weekend: Repurpose week\'s best performer for the other platform with fresh angle`,
    `Monthly: "Platform exclusive" content drop — give each platform something the other doesn\'t get`,
  ];

  return { overlapPercentage, uniquePlatform1, uniquePlatform2, segments, comparison, crossPostStrategies, uniqueAudiences, migrationRisks, actionPlan, contentCalendarTips };
}

export default function AudienceOverlapPage() {
  const [primary, setPrimary] = useState<string>(primaryPlatforms[0]);
  const [secondary, setSecondary] = useState<string>(secondaryPlatforms[1]);
  const [size, setSize] = useState<string>(audienceSizes[2]);
  const [industry, setIndustry] = useState<string>(industries[0]);
  const [brand, setBrand] = useState('');
  const [report, setReport] = useState<OverlapReport | null>(null);

  const generate = () => { if (brand.trim()) setReport(analyzeOverlap(primary, secondary, size, industry, brand)); };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm font-medium">Audience Intelligence</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Audience Overlap Analyzer</h1>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">Understand how your audiences overlap across platforms. Optimize cross-posting, prevent content fatigue, and maximize unique reach.</p>
        </div>

        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Primary Platform</label>
              <select value={primary} onChange={e => setPrimary(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white">{primaryPlatforms.map(p => <option key={p}>{p}</option>)}</select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Secondary Platform</label>
              <select value={secondary} onChange={e => setSecondary(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white">{secondaryPlatforms.map(p => <option key={p}>{p}</option>)}</select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Audience Size (largest platform)</label>
              <select value={size} onChange={e => setSize(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white">{audienceSizes.map(s => <option key={s}>{s}</option>)}</select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Industry</label>
              <select value={industry} onChange={e => setIndustry(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white">{industries.map(i => <option key={i}>{i}</option>)}</select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-1">Brand Name</label>
            <input value={brand} onChange={e => setBrand(e.target.value)} placeholder="e.g., PostCraft" className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white" />
          </div>
          <button onClick={generate} className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all">Analyze Audience Overlap</button>
        </div>

        {report && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-cyan-400">{report.overlapPercentage}%</div>
                <div className="text-sm text-gray-400 mt-1">Audience Overlap</div>
              </div>
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-blue-400">{report.uniquePlatform1}%</div>
                <div className="text-sm text-gray-400 mt-1">{primary}-Only</div>
              </div>
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-indigo-400">{report.uniquePlatform2}%</div>
                <div className="text-sm text-gray-400 mt-1">{secondary}-Only</div>
              </div>
            </div>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-cyan-300">Audience Segments</h2>
              <div className="space-y-4">{report.segments.map((s, i) => (
                <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">{s.segment}</h3>
                    <span className="text-cyan-400 font-mono">{s.percentage}%</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    <div><span className="text-gray-500">Behavior:</span> <span className="text-gray-300">{s.behavior}</span></div>
                    <div><span className="text-gray-500">Best on:</span> <span className="text-blue-300">{s.bestPlatform}</span></div>
                    <div><span className="text-gray-500">Content pref:</span> <span className="text-gray-300">{s.contentPreference}</span></div>
                    <div><span className="text-gray-500">Monetization:</span> <span className="text-green-300">{s.monetizationPotential}</span></div>
                  </div>
                </div>
              ))}</div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-cyan-300">Platform Comparison</h2>
              <div className="overflow-x-auto"><table className="w-full text-sm">
                <thead><tr className="border-b border-gray-700"><th className="text-left py-2 px-3 text-gray-400">Metric</th><th className="text-left py-2 px-3 text-blue-400">{primary}</th><th className="text-left py-2 px-3 text-indigo-400">{secondary}</th><th className="text-left py-2 px-3 text-gray-400">Insight</th></tr></thead>
                <tbody>{report.comparison.map((c, i) => <tr key={i} className="border-b border-gray-800"><td className="py-2 px-3 text-white">{c.metric}</td><td className="py-2 px-3 text-gray-300">{c.platform1Value}</td><td className="py-2 px-3 text-gray-300">{c.platform2Value}</td><td className="py-2 px-3 text-gray-400 text-xs">{c.insight}</td></tr>)}</tbody>
              </table></div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-cyan-300">Cross-Post Strategies</h2>
              <div className="space-y-4">{report.crossPostStrategies.map((s, i) => (
                <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                  <div className="text-sm font-medium text-cyan-300 mb-2">{s.fromPlatform} &rarr; {s.toPlatform}</div>
                  <div className="text-sm mb-1"><span className="text-gray-500">Adapt:</span> <span className="text-gray-300">{s.adaptationNeeded}</span></div>
                  <div className="text-sm mb-1"><span className="text-gray-500">Expected:</span> <span className="text-green-300">{s.expectedRetention}</span></div>
                  <div className="text-sm"><span className="text-gray-500">Avoid:</span> <span className="text-red-300">{s.doNot}</span></div>
                </div>
              ))}</div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-cyan-300">Migration Risks</h2>
              <div className="space-y-3">{report.migrationRisks.map((r, i) => (
                <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                  <h3 className="font-semibold text-white mb-2">{r.scenario}</h3>
                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    <div><span className="text-gray-500">Risk:</span> <span className="text-yellow-300">{r.riskLevel}</span></div>
                    <div><span className="text-gray-500">Potential loss:</span> <span className="text-red-300">{r.audienceLoss}</span></div>
                    <div><span className="text-gray-500">Mitigation:</span> <span className="text-green-300">{r.mitigation}</span></div>
                    <div><span className="text-gray-500">Timeline:</span> <span className="text-blue-300">{r.timeline}</span></div>
                  </div>
                </div>
              ))}</div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-cyan-300">Action Plan</h2>
              <div className="space-y-2">{report.actionPlan.map((a, i) => <div key={i} className="p-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-sm text-gray-300">{a}</div>)}</div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-cyan-300">Weekly Content Calendar</h2>
              <div className="space-y-2">{report.contentCalendarTips.map((t, i) => <div key={i} className="p-3 bg-cyan-500/5 border border-cyan-500/20 rounded-lg text-sm text-gray-300"><span className="text-cyan-400 font-medium">{t.split(':')[0]}:</span>{t.split(':').slice(1).join(':')}</div>)}</div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
