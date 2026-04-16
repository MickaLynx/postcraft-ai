'use client';
import { useState } from 'react';

const sourceTypes = ['Blog Post', 'Podcast Episode', 'Webinar Recording', 'Case Study', 'Research Report', 'Newsletter Issue', 'Conference Talk', 'YouTube Video', 'White Paper', 'Product Launch'] as const;
const platforms = ['LinkedIn', 'Instagram', 'Twitter/X', 'TikTok', 'YouTube', 'Facebook', 'Email', 'All Platforms'] as const;
const timelines = ['7 Days (Sprint)', '14 Days (Standard)', '30 Days (Extended)', '90 Days (Evergreen)'] as const;
const goals = ['Brand Awareness', 'Lead Generation', 'Thought Leadership', 'Community Growth', 'Sales Enablement', 'SEO/Traffic'] as const;
const industries = ['Tech & SaaS', 'E-commerce & DTC', 'Healthcare', 'Finance & FinTech', 'Education', 'Agency & Consulting', 'Real Estate', 'Fitness & Wellness', 'Food & Beverage', 'Travel & Hospitality', 'Non-Profit', 'Manufacturing'] as const;
const contentVolumes = ['Light (3-5 pieces/week)', 'Medium (5-10 pieces/week)', 'Heavy (10-15 pieces/week)', 'Maximum (15+ pieces/week)'] as const;

interface CalendarEntry { day: number; platform: string; format: string; title: string; hook: string; cta: string; bestTime: string; effort: string; }
interface RepurposeAtom { format: string; platform: string; sourceSection: string; adaptation: string; effort: string; expectedReach: string; }
interface DistributionWave { wave: string; timing: string; platforms: string; strategy: string; goal: string; }
interface PerformanceTrigger { metric: string; threshold: string; action: string; when: string; }

interface RepurposeCalendar {
  efficiencyScore: number;
  reachMultiplier: string;
  calendar: CalendarEntry[];
  atoms: RepurposeAtom[];
  waves: DistributionWave[];
  triggers: PerformanceTrigger[];
  tips: string[];
  mistakes: string[];
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }

function generateCalendar(source: string, platform: string, timeline: string, goal: string, industry: string, volume: string, contentTitle: string): RepurposeCalendar {
  const seed = hash(`${source}-${platform}-${timeline}-${goal}-${industry}-${volume}-${contentTitle}`);
  const score = 50 + seed % 45;
  const multiplier = `${3 + seed % 8}x`;

  const formats = ['Carousel post', 'Twitter/X thread', 'Short-form video (60s)', 'Infographic', 'Quote card', 'LinkedIn article', 'Email snippet', 'Blog summary', 'Podcast audio clip', 'YouTube Short', 'Instagram Reel', 'Poll/Question', 'Behind-the-scenes story', 'Data visualization', 'Checklist post'];
  const platformNames = ['LinkedIn', 'Instagram', 'Twitter/X', 'TikTok', 'YouTube', 'Facebook', 'Email', 'Website'];
  const hooks = [
    `The #1 takeaway from "${contentTitle}" that nobody is talking about...`,
    `We analyzed ${contentTitle} and found something surprising:`,
    `3 lessons from "${contentTitle}" you can apply today:`,
    `Stop scrolling. This insight from "${contentTitle}" could change your ${industry.toLowerCase()} strategy:`,
    `"${contentTitle}" in 60 seconds — here's what you need to know:`,
    `The data behind "${contentTitle}" tells a different story than you'd expect:`,
    `We turned "${contentTitle}" into a visual guide. Save this:`,
    `Quick poll: After reading "${contentTitle}", which approach do you prefer?`,
  ];
  const ctas = [
    `Full ${source.toLowerCase()} → link in bio`,
    'Save this for later — you\'ll need it',
    'Share with someone who needs to see this',
    'Comment your biggest takeaway below',
    `Read the full analysis → postcraft.ai`,
    'Follow for more ${industry.toLowerCase()} insights',
  ];
  const times = ['8:00 AM (B2B professionals)', '12:00 PM (lunch break peak)', '5:30 PM (commute engagement)', '9:00 PM (evening browsing)', '7:00 AM (early morning)', '3:00 PM (afternoon boost)', '10:00 AM (mid-morning)', '6:00 PM (post-work)'];
  const efforts = ['15 min', '20 min', '30 min', '45 min', '10 min', '60 min', '25 min', '35 min'];

  const daysCount = timeline.includes('7') ? 7 : timeline.includes('14') ? 14 : timeline.includes('30') ? 14 : 14;
  const calendar: CalendarEntry[] = Array.from({ length: daysCount }, (_, i) => ({
    day: i + 1,
    platform: platformNames[(seed + i) % platformNames.length],
    format: formats[(seed + i * 2) % formats.length],
    title: `${contentTitle} — ${formats[(seed + i * 2) % formats.length]}`,
    hook: hooks[(seed + i * 3) % hooks.length],
    cta: ctas[(seed + i * 4) % ctas.length],
    bestTime: times[(seed + i * 5) % times.length],
    effort: efforts[(seed + i * 6) % efforts.length],
  }));

  const sections = ['Key statistic / data point', 'Main argument / thesis', 'Step-by-step process', 'Customer quote / testimonial', 'Contrarian viewpoint', 'Visual diagram / framework', 'FAQ / common objection', 'Summary / conclusion'];
  const adaptations = [
    'Extract stat → create bold quote card with branded template',
    'Summarize thesis → write LinkedIn thought leadership post',
    'Break into steps → create carousel (1 step per slide)',
    'Pull quote → design testimonial graphic with headshot',
    'Isolate contrarian point → write provocative tweet thread',
    'Recreate visually → design infographic for Instagram',
    'List FAQs → create poll or question post',
    'Condense → write email newsletter teaser',
  ];
  const reaches = ['500-2K impressions', '1K-5K impressions', '2K-10K impressions', '3K-15K impressions', '1K-8K impressions', '500-3K impressions', '800-4K impressions', '2K-12K impressions'];

  const atoms: RepurposeAtom[] = Array.from({ length: 8 }, (_, i) => ({
    format: formats[(seed + i * 3) % formats.length],
    platform: platformNames[(seed + i * 2) % platformNames.length],
    sourceSection: sections[i],
    adaptation: adaptations[i],
    effort: efforts[(seed + i) % efforts.length],
    expectedReach: reaches[(seed + i * 4) % reaches.length],
  }));

  const waves: DistributionWave[] = [
    { wave: 'Launch Wave', timing: 'Day 1-2', platforms: 'Primary platform + email list', strategy: 'Full-length share with strong hook — capture early engaged audience', goal: 'Initial reach + engagement baseline' },
    { wave: 'Amplification Wave', timing: 'Day 3-5', platforms: 'All social platforms', strategy: 'Platform-adapted versions: carousel, thread, short video — maximize cross-platform reach', goal: 'Multiply reach 3-5x across channels' },
    { wave: 'Engagement Wave', timing: 'Day 6-10', platforms: 'Community + DMs + comments', strategy: 'Reply to comments, share in relevant groups, engage thought leaders — drive conversation', goal: 'Community building + relationship deepening' },
    { wave: 'Remix Wave', timing: 'Day 11-20', platforms: 'Visual platforms (IG, TikTok, YouTube)', strategy: 'Create derivative content: infographics, reels, short clips — new formats for new audiences', goal: 'Reach audiences who prefer visual/video formats' },
    { wave: 'Evergreen Wave', timing: 'Day 21-90', platforms: 'SEO + email nurture + sales', strategy: 'Update with new data, reshare quarterly, add to sales collateral — extract long-term value', goal: 'Sustained traffic + lead generation' },
  ];

  const triggers: PerformanceTrigger[] = [
    { metric: 'Engagement rate', threshold: '> 5% on any post', action: 'Boost with paid ($20-50) and create 3 more variations of the same angle', when: 'Within 24 hours of detection' },
    { metric: 'Shares/reposts', threshold: '> 20 organic shares', action: 'Identify which audience segment shared most → create targeted follow-up content', when: 'Within 48 hours' },
    { metric: 'Comments with questions', threshold: '> 5 questions in comments', action: 'Create FAQ post or follow-up thread answering the questions', when: 'Within 72 hours' },
    { metric: 'Click-through rate', threshold: '> 3% CTR to full content', action: 'Create dedicated landing page with lead magnet related to topic', when: 'Within 1 week' },
    { metric: 'Performance decline', threshold: 'Engagement drops 50% vs day 1', action: 'Refresh hook, try new format (video if text was first, or vice versa)', when: 'At 2-week mark' },
  ];

  const tips = [
    `One ${source.toLowerCase()} should produce 15-25 pieces of derivative content — if you're getting fewer, you're leaving reach on the table`,
    'Create all derivatives in one batch session (2-3 hours) — context-switching between creation and repurposing kills efficiency',
    'Schedule the full calendar upfront — use a tool like Buffer, Hootsuite, or native scheduling',
    'Track which derivative format performs best for each platform — build a format playbook over time',
    'Repurpose your top 20% of content 5x more — don\'t treat all content equally',
    'Add a "repurpose checklist" to your content creation workflow — make it automatic, not an afterthought',
    'Update evergreen content every 90 days with new data points — compounds SEO value',
    'Cross-promote between formats: "Loved this thread? The full breakdown is on our blog →"',
  ];

  const mistakes = [
    'Copy-pasting the same text across platforms — each platform has its own language and format expectations',
    'Repurposing everything — only repurpose content that performed above average on its original platform',
    'Ignoring platform-native features — use polls on Twitter, carousels on LinkedIn, Reels on Instagram',
    'Publishing all derivatives on the same day — spread across 7-14 days for sustained visibility',
    'Skipping the hook adaptation — what works as a blog title won\'t work as a tweet hook',
    'Not updating the CTA — each platform needs a platform-appropriate call-to-action',
    'Forgetting attribution — always link back to the original piece for SEO juice',
    'Treating repurposing as "lesser" content — derivatives often outperform originals with the right hook',
  ];

  return { efficiencyScore: score, reachMultiplier: multiplier, calendar, atoms, waves, triggers, tips, mistakes };
}

export default function RepurposeCalendarPage() {
  const [source, setSource] = useState(sourceTypes[0]);
  const [platform, setPlatform] = useState(platforms[0]);
  const [timeline, setTimeline] = useState(timelines[0]);
  const [goal, setGoal] = useState(goals[0]);
  const [industry, setIndustry] = useState(industries[0]);
  const [volume, setVolume] = useState(contentVolumes[0]);
  const [contentTitle, setContentTitle] = useState('');
  const [result, setResult] = useState<RepurposeCalendar | null>(null);

  const handleGenerate = () => { if (contentTitle.trim()) setResult(generateCalendar(source, platform, timeline, goal, industry, volume, contentTitle)); };
  const scoreColor = (n: number) => n > 75 ? '#34d399' : n > 55 ? '#fbbf24' : n > 35 ? '#fb923c' : '#f87171';

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Content Repurpose Calendar</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Turn one piece of content into a multi-platform distribution calendar. Get day-by-day scheduling, content atoms, distribution waves, performance triggers, and reach multiplier analysis — all from a single source piece.</p>

        <div className="mb-4">
          <label className="block text-sm text-zinc-400 mb-1">Original Content Title</label>
          <input type="text" value={contentTitle} onChange={e => setContentTitle(e.target.value)} placeholder="e.g., The Complete Guide to SaaS Content Marketing in 2026" className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-3 text-zinc-100" />
        </div>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {([
            { label: 'Source Type', value: source, setter: setSource as (v: string) => void, options: sourceTypes as readonly string[] },
            { label: 'Primary Platform', value: platform, setter: setPlatform as (v: string) => void, options: platforms as readonly string[] },
            { label: 'Timeline', value: timeline, setter: setTimeline as (v: string) => void, options: timelines as readonly string[] },
            { label: 'Primary Goal', value: goal, setter: setGoal as (v: string) => void, options: goals as readonly string[] },
            { label: 'Industry', value: industry, setter: setIndustry as (v: string) => void, options: industries as readonly string[] },
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
        <button onClick={handleGenerate} className="w-full md:w-auto bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded font-semibold hover:opacity-90 transition mb-8">Generate Repurpose Calendar</button>

        {result && (
          <div className="space-y-8">
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                  <div className="text-5xl font-bold mb-1" style={{ color: scoreColor(result.efficiencyScore) }}>{result.efficiencyScore}</div>
                  <div className="text-zinc-400 text-sm">Efficiency Score</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-violet-400 mb-1">{result.reachMultiplier}</div>
                  <div className="text-zinc-400 text-sm">Reach Multiplier</div>
                </div>
              </div>
            </div>

            {/* Distribution Waves */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Distribution Waves</h3>
              <div className="space-y-3">
                {result.waves.map((w, i) => (
                  <div key={i} className="flex gap-4 items-start bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="shrink-0 w-24 text-center">
                      <div className="text-xs text-violet-400 font-semibold uppercase">{w.wave}</div>
                      <div className="text-xs text-zinc-500 mt-1">{w.timing}</div>
                    </div>
                    <div>
                      <div className="text-sm text-zinc-200 mb-1">{w.strategy}</div>
                      <div className="text-xs"><span className="text-zinc-500">Platforms:</span> <span className="text-zinc-400">{w.platforms}</span></div>
                      <div className="text-xs"><span className="text-zinc-500">Goal:</span> <span className="text-emerald-400/70">{w.goal}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Calendar */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Day-by-Day Calendar ({result.calendar.length} days)</h3>
              <div className="space-y-3">
                {result.calendar.map((c, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-violet-400/10 text-violet-400 font-bold text-sm">D{c.day}</span>
                      <div className="flex gap-2">
                        <span className="text-xs px-2 py-1 rounded bg-violet-400/10 text-violet-400 border border-violet-400/30">{c.platform}</span>
                        <span className="text-xs px-2 py-1 rounded bg-zinc-700 text-zinc-300">{c.format}</span>
                        <span className="text-xs px-2 py-1 rounded bg-zinc-700 text-zinc-400">{c.bestTime}</span>
                        <span className="text-xs px-2 py-1 rounded bg-emerald-400/10 text-emerald-400">{c.effort}</span>
                      </div>
                    </div>
                    <div className="text-sm text-zinc-200 mb-1">{c.hook}</div>
                    <div className="text-xs text-emerald-400/70">{c.cta}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Atoms */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Content Atoms ({result.atoms.length})</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="text-left text-zinc-500 border-b border-zinc-700"><th className="pb-2 pr-3">Source Section</th><th className="pb-2 pr-3">Format</th><th className="pb-2 pr-3">Platform</th><th className="pb-2 pr-3">Adaptation</th><th className="pb-2 pr-3">Effort</th><th className="pb-2">Reach</th></tr></thead>
                  <tbody>
                    {result.atoms.map((a, i) => (
                      <tr key={i} className="border-b border-zinc-800/50">
                        <td className="py-2 pr-3 text-zinc-300">{a.sourceSection}</td>
                        <td className="py-2 pr-3 text-violet-400 text-xs">{a.format}</td>
                        <td className="py-2 pr-3 text-zinc-400 text-xs">{a.platform}</td>
                        <td className="py-2 pr-3 text-zinc-400 text-xs">{a.adaptation}</td>
                        <td className="py-2 pr-3 text-zinc-500 text-xs">{a.effort}</td>
                        <td className="py-2 text-emerald-400/70 text-xs">{a.expectedReach}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Performance Triggers */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Performance Triggers</h3>
              <div className="space-y-3">
                {result.triggers.map((t, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-semibold text-zinc-200">{t.metric}</span>
                      <span className="text-xs px-2 py-1 rounded bg-yellow-400/10 text-yellow-400 border border-yellow-400/30">{t.threshold}</span>
                    </div>
                    <div className="text-sm text-zinc-400">{t.action}</div>
                    <div className="text-xs text-zinc-500 mt-1">When: {t.when}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips + Mistakes */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-emerald-400">Repurposing Tips</h3>
                <div className="space-y-2">{result.tips.map((t, i) => <div key={i} className="text-sm text-zinc-400 flex gap-2"><span className="text-emerald-400 shrink-0">→</span>{t}</div>)}</div>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-red-400">Common Mistakes</h3>
                <div className="space-y-2">{result.mistakes.map((m, i) => <div key={i} className="text-sm text-zinc-400 flex gap-2"><span className="text-red-400 shrink-0">✗</span>{m}</div>)}</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">Multiply Your Content Reach Automatically</h3>
              <p className="text-zinc-400 mb-4">PostCraft AI turns one piece into a full distribution calendar. Pair with <a href="/repurpose" className="text-violet-400 underline">Content Repurposer</a>, <a href="/content-calendar" className="text-violet-400 underline">Content Calendar</a>, and <a href="/cross-platform" className="text-violet-400 underline">Cross-Platform Adapter</a>.</p>
              <a href="/pricing" className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">Get PostCraft Pro</a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
