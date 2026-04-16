'use client';
import { useState } from 'react';

const writerStyles = ['Thought Leader', 'Storyteller', 'Data-Driven Expert', 'Casual & Relatable', 'Provocative Contrarian', 'Inspirational Coach'] as const;
const contentGoals = ['Build Authority', 'Drive Traffic', 'Generate Leads', 'Grow Following', 'Nurture Community', 'Launch Product'] as const;
const targetAudiences = ['C-Suite / Executives', 'Marketers & Growth Teams', 'Developers & Engineers', 'Entrepreneurs & Founders', 'Content Creators', 'General Consumer'] as const;
const tonePrefs = ['Professional & Polished', 'Conversational & Warm', 'Bold & Opinionated', 'Educational & Clear', 'Witty & Entertaining', 'Empathetic & Supportive'] as const;

interface GhostContent { title: string; platform: string; hook: string; body: string; cta: string; estimatedReach: string; engagementPotential: string; }
interface VoiceProfile { trait: string; doThis: string; avoidThis: string; example: string; frequency: string; }
interface ContentPlan { day: string; platform: string; type: string; topic: string; angle: string; keyMessage: string; }
interface PersonalBrand { element: string; current: string; target: string; gap: string; action: string; }
interface WritingFormula { name: string; structure: string; bestFor: string; example: string; conversionRate: string; }

interface GhostwriterReport {
  voiceMatchScore: number;
  contentReadiness: number;
  brandClarity: number;
  generatedContent: GhostContent[];
  voiceProfile: VoiceProfile[];
  weeklyPlan: ContentPlan[];
  brandAnalysis: PersonalBrand[];
  formulas: WritingFormula[];
  ghostwriterTips: string[];
  contentPillars: string[];
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }

function ghostwrite(style: string, goal: string, audience: string, tone: string, topic: string): GhostwriterReport {
  const seed = hash(`${style}-${goal}-${audience}-${tone}-${topic}`);
  const voiceMatchScore = 60 + seed % 35;
  const contentReadiness = 50 + seed % 45;
  const brandClarity = 40 + seed % 55;

  const generatedContent: GhostContent[] = [
    {
      title: `LinkedIn Post: Why ${topic} Changes Everything`,
      platform: 'LinkedIn',
      hook: seed % 2 === 0
        ? `Hot take: 90% of ${audience.toLowerCase()} are doing ${topic.toLowerCase()} wrong. Here's the framework I use instead →`
        : `I spent 3 years failing at ${topic.toLowerCase()}. Then I discovered this one principle that changed everything:`,
      body: `The biggest mistake in ${topic.toLowerCase()} is thinking it's about tactics.\n\nIt's actually about systems.\n\nHere's my 5-step framework:\n\n1. Audit your current approach (most skip this)\n2. Identify the 20% driving 80% of results\n3. Build repeatable processes around winners\n4. Automate the routine, humanize the creative\n5. Measure what matters, ignore vanity metrics\n\nThe result? ${seed % 2 === 0 ? '3x output in half the time' : '10x engagement with less effort'}.`,
      cta: `Want the full playbook? Drop "SYSTEM" in the comments and I'll send it over.`,
      estimatedReach: `${(seed % 50 + 10) * 100} impressions`,
      engagementPotential: `${3 + seed % 5}.${seed % 9}% (${seed % 2 === 0 ? 'above' : 'well above'} platform avg)`,
    },
    {
      title: `Twitter/X Thread: The ${topic} Playbook`,
      platform: 'Twitter/X',
      hook: `🧵 Thread: The ultimate ${topic.toLowerCase()} playbook for ${audience.toLowerCase()}\n\n(Save this — you'll need it)\n\n↓`,
      body: `1/ Most people approach ${topic.toLowerCase()} like it's 2020.\n\nBut the landscape has shifted dramatically.\n\nHere's what actually works in 2026:\n\n2/ First, forget everything about "best practices."\n\nThey're average practices at best.\n\nWhat separates top 1% performers:\n→ They test faster\n→ They fail smaller\n→ They compound wins\n\n3/ The secret weapon? Systematic experimentation.\n\nRun 10 small tests instead of 1 big bet.\n\nWinners emerge fast. Double down ruthlessly.\n\n4/ Framework I use with every client:\n\nWeek 1: Audit + baseline\nWeek 2: 10 micro-experiments\nWeek 3: Kill losers, scale winners\nWeek 4: Document + systematize\n\nRepeat monthly. Compound quarterly.`,
      cta: `5/ Want the complete framework + templates?\n\nRetweet this thread and follow me.\n\nI'm dropping the full guide this Friday.`,
      estimatedReach: `${(seed % 30 + 5) * 100} impressions`,
      engagementPotential: `${4 + seed % 4}.${seed % 9}% engagement rate`,
    },
    {
      title: `Instagram Caption: Behind the Scenes`,
      platform: 'Instagram',
      hook: `The "overnight success" that took ${1 + seed % 4} years. 🎯`,
      body: `Everyone sees the results.\n\nNobody sees the ${50 + seed % 100} failed experiments.\nThe ${3 + seed % 5} pivots.\nThe ${seed % 12 + 1} months with zero traction.\n\nBut here's what I learned about ${topic.toLowerCase()}:\n\nIt's not about being the best. It's about being the most consistent.\n\nThe person who shows up every day beats the genius who shows up sometimes.\n\nEvery. Single. Time.`,
      cta: `Double tap if you're building something special 👊\n\n#${topic.replace(/\s/g, '')} #BuildInPublic #${style.replace(/\s.*/, '')}`,
      estimatedReach: `${(seed % 20 + 5) * 100} reach`,
      engagementPotential: `${5 + seed % 6}.${seed % 9}% engagement rate`,
    },
  ];

  const voiceProfile: VoiceProfile[] = [
    { trait: 'Authority Level', doThis: `Use data points and frameworks — cite specific numbers ("3x improvement in 30 days")`, avoidThis: 'Hedging language ("maybe", "I think", "it could be")', example: `"After testing this with ${20 + seed % 80} clients, the data is clear..."`, frequency: 'Every post' },
    { trait: 'Storytelling', doThis: `Open with personal anecdotes and failures — vulnerability builds trust with ${audience.toLowerCase()}`, avoidThis: 'Generic advice without personal context', example: '"I lost $12K on my first campaign. Here\'s what that expensive lesson taught me..."', frequency: '3-4x/week' },
    { trait: 'Engagement Hooks', doThis: `Use pattern interrupts — start with a bold claim or counterintuitive insight`, avoidThis: 'Starting with "In today\'s fast-paced world..." (generic opener)', example: '"Delete half your content calendar. Seriously. Here\'s why:"', frequency: 'Every post opening' },
    { trait: 'Call to Action', doThis: `Be specific and give a reason — "Comment GROWTH for the template" > "Let me know what you think"`, avoidThis: 'Passive CTAs or no CTA at all', example: '"Drop your biggest challenge with [topic] below — I\'ll reply with a custom tip"', frequency: 'Every post' },
    { trait: 'Formatting', doThis: `Short paragraphs (1-2 lines), strategic whitespace, emoji as bullet points (not decoration)`, avoidThis: 'Wall of text, excessive emojis, ALL CAPS for emphasis', example: 'Line break after every sentence on LinkedIn. Thread numbering on Twitter.', frequency: 'Always' },
  ];

  const weeklyPlan: ContentPlan[] = [
    { day: 'Monday', platform: 'LinkedIn', type: 'Educational Post', topic: `${topic} Framework`, angle: 'Authority builder — share proprietary methodology', keyMessage: `Position as the go-to expert on ${topic.toLowerCase()} for ${audience.toLowerCase()}` },
    { day: 'Tuesday', platform: 'Twitter/X', type: 'Thread (5-8 tweets)', topic: `${topic} Case Study`, angle: 'Data-driven proof — show real results', keyMessage: 'Build credibility through specific numbers and timelines' },
    { day: 'Wednesday', platform: 'Instagram', type: 'Carousel (8 slides)', topic: `${topic} Common Mistakes`, angle: 'Relatable pain points — "you\'re not alone"', keyMessage: `Help ${audience.toLowerCase()} avoid costly mistakes` },
    { day: 'Thursday', platform: 'LinkedIn', type: 'Story Post', topic: 'Personal Lesson', angle: `Vulnerability + lesson — failure story related to ${topic.toLowerCase()}`, keyMessage: 'Build emotional connection and trust' },
    { day: 'Friday', platform: 'Twitter/X', type: 'Hot Take', topic: `Contrarian ${topic} Opinion`, angle: `Challenge conventional wisdom — stand out in ${audience.toLowerCase()} feeds`, keyMessage: 'Spark debate and increase engagement through polarization' },
    { day: 'Saturday', platform: 'Instagram', type: 'Behind the Scenes', topic: 'Process Reveal', angle: 'Authenticity — show the real work behind the results', keyMessage: 'Humanize the brand, build community connection' },
    { day: 'Sunday', platform: 'All', type: 'Engagement / Repurpose', topic: 'Best of Week', angle: 'Repurpose top performer across other platforms', keyMessage: 'Maximize reach of proven content' },
  ];

  const brandAnalysis: PersonalBrand[] = [
    { element: 'Unique Perspective', current: `Generic ${topic.toLowerCase()} advice`, target: `Known for contrarian ${style.toLowerCase()} approach to ${topic.toLowerCase()}`, gap: 'Need stronger differentiation from competitors', action: `Develop 3 signature frameworks named after your methodology` },
    { element: 'Content Consistency', current: `Sporadic posting (${1 + seed % 3}x/week)`, target: '5-7 posts/week across platforms', gap: `Need ${4 + seed % 3} more posts per week`, action: 'Batch content weekly, use templates, automate scheduling' },
    { element: 'Audience Connection', current: 'Broadcasts content, limited replies', target: 'Active community with 50+ meaningful conversations/week', gap: 'Low engagement reciprocity', action: 'Spend 20min/day replying to comments + engaging with audience posts' },
    { element: 'Visual Identity', current: 'Inconsistent colors/fonts across platforms', target: 'Instantly recognizable brand aesthetic', gap: 'No brand kit applied to content', action: 'Create 5 Canva templates with brand colors, fonts, and logo placement' },
    { element: 'Social Proof', current: `${seed % 3 + 1} testimonials, rarely shared`, target: 'Weekly social proof integration in content', gap: 'Under-leveraging success stories', action: 'Create "client win" template, share 2x/week' },
  ];

  const formulas: WritingFormula[] = [
    { name: 'AIDA', structure: 'Attention → Interest → Desire → Action', bestFor: 'Sales posts, product launches', example: 'Bold stat → Problem → Solution → CTA', conversionRate: `${2 + seed % 4}.${seed % 9}% avg CTR` },
    { name: 'PAS', structure: 'Problem → Agitate → Solve', bestFor: 'Pain-point content, lead gen', example: '"Struggling with X? It gets worse... Unless you try Y"', conversionRate: `${3 + seed % 3}.${seed % 9}% avg CTR` },
    { name: 'BAB', structure: 'Before → After → Bridge', bestFor: 'Transformation stories, case studies', example: '"Was doing X → Now doing Y → Here\'s how"', conversionRate: `${2 + seed % 5}.${seed % 9}% avg CTR` },
    { name: 'STEPPS', structure: 'Social Currency → Triggers → Emotion → Public → Practical → Stories', bestFor: 'Viral content, shareability', example: 'Insider knowledge + emotional hook + practical takeaway', conversionRate: `${4 + seed % 4}.${seed % 9}% share rate` },
    { name: '4U', structure: 'Useful → Urgent → Unique → Ultra-specific', bestFor: 'Headlines, hooks, subject lines', example: '"How to [specific result] in [timeframe] (without [pain])"', conversionRate: `${5 + seed % 3}.${seed % 9}% open rate` },
  ];

  const ghostwriterTips = [
    `Match the ${tone.toLowerCase()} tone consistently — even one off-brand post breaks the spell for ${audience.toLowerCase()}`,
    'Write 10 hooks for every post, then pick the best one — the hook determines 80% of performance',
    'Study 5 top creators in your niche weekly — not to copy, but to understand what resonates',
    `For ${audience.toLowerCase()}: lead with outcomes and ROI, not features or process`,
    'The best ghostwritten content sounds MORE like you than you do — it\'s your best thoughts, polished',
    'Keep a "swipe file" of your own best-performing content — recycle frameworks with fresh angles',
    'Write in spoken language first, edit for platform second — authentic voice > perfect grammar',
    'Every piece needs ONE clear takeaway — if the reader remembers one thing, what should it be?',
  ];

  const contentPillars = [
    `${topic} Frameworks & Methodologies — share proprietary systems that ${audience.toLowerCase()} can implement`,
    `Personal Stories & Lessons — vulnerability builds trust, failures teach more than wins`,
    `Industry Hot Takes — challenge conventional wisdom in ${topic.toLowerCase()}, spark debate`,
    `Client/Case Study Results — specific numbers, timelines, and transformations`,
    `Behind the Scenes — process, tools, daily routines that make the work possible`,
  ];

  return { voiceMatchScore, contentReadiness, brandClarity, generatedContent, voiceProfile, weeklyPlan, brandAnalysis, formulas, ghostwriterTips, contentPillars };
}

export default function GhostwriterPage() {
  const [style, setStyle] = useState('');
  const [goal, setGoal] = useState('');
  const [audience, setAudience] = useState('');
  const [tone, setTone] = useState('');
  const [topic, setTopic] = useState('');
  const [report, setReport] = useState<GhostwriterReport | null>(null);

  return (
    <main className="max-w-5xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold gradient-text mb-2">AI Ghostwriter</h1>
      <p className="text-zinc-400 mb-8 max-w-2xl">Your personal AI writing partner. Get platform-specific content, voice profiles, weekly plans, and brand-building strategies — all in your unique voice.</p>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Writing Style</label>
          <select value={style} onChange={e => setStyle(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100">
            <option value="">Select style...</option>
            {writerStyles.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Content Goal</label>
          <select value={goal} onChange={e => setGoal(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100">
            <option value="">Select goal...</option>
            {contentGoals.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Target Audience</label>
          <select value={audience} onChange={e => setAudience(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100">
            <option value="">Select audience...</option>
            {targetAudiences.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Tone Preference</label>
          <select value={tone} onChange={e => setTone(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100">
            <option value="">Select tone...</option>
            {tonePrefs.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm text-zinc-400 mb-1">Topic / Niche</label>
        <input value={topic} onChange={e => setTopic(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100" placeholder="e.g. SaaS growth, personal branding, AI marketing..." />
      </div>

      <button onClick={() => { if (style && goal && audience && tone && topic) setReport(ghostwrite(style, goal, audience, tone, topic)); }} className="bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition">
        Generate Ghostwritten Content
      </button>

      {report && (
        <div className="mt-10 space-y-8">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800 text-center">
              <div className="text-3xl font-bold text-green-400">{report.voiceMatchScore}%</div>
              <div className="text-sm text-zinc-400 mt-1">Voice Match</div>
            </div>
            <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800 text-center">
              <div className="text-3xl font-bold text-violet-400">{report.contentReadiness}%</div>
              <div className="text-sm text-zinc-400 mt-1">Content Readiness</div>
            </div>
            <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800 text-center">
              <div className="text-3xl font-bold text-fuchsia-400">{report.brandClarity}%</div>
              <div className="text-sm text-zinc-400 mt-1">Brand Clarity</div>
            </div>
          </div>

          <section>
            <h2 className="text-xl font-bold text-zinc-100 mb-4">✍️ Generated Content (Ready to Post)</h2>
            <div className="space-y-4">
              {report.generatedContent.map((c, i) => (
                <div key={i} className="bg-zinc-900/50 rounded-xl p-5 border border-zinc-800">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-violet-600/20 text-violet-400 px-2 py-0.5 rounded text-xs font-bold">{c.platform}</span>
                    <span className="font-semibold text-zinc-100">{c.title}</span>
                  </div>
                  <div className="mb-2 p-3 bg-zinc-800/50 rounded-lg">
                    <div className="text-sm text-zinc-300 font-medium mb-1">Hook:</div>
                    <div className="text-zinc-100 whitespace-pre-line">{c.hook}</div>
                  </div>
                  <div className="mb-2 p-3 bg-zinc-800/50 rounded-lg">
                    <div className="text-sm text-zinc-300 font-medium mb-1">Body:</div>
                    <div className="text-zinc-200 whitespace-pre-line text-sm">{c.body}</div>
                  </div>
                  <div className="mb-3 p-3 bg-zinc-800/50 rounded-lg">
                    <div className="text-sm text-zinc-300 font-medium mb-1">CTA:</div>
                    <div className="text-zinc-100 whitespace-pre-line">{c.cta}</div>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <span className="text-zinc-400">Est. reach: <span className="text-green-400">{c.estimatedReach}</span></span>
                    <span className="text-zinc-400">Engagement: <span className="text-violet-400">{c.engagementPotential}</span></span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-100 mb-4">🎭 Voice Profile</h2>
            <div className="overflow-x-auto"><table className="w-full text-sm">
              <thead><tr className="text-zinc-400 border-b border-zinc-800">
                <th className="text-left py-2 px-3">Trait</th><th className="text-left py-2 px-3">Do This</th><th className="text-left py-2 px-3">Avoid This</th><th className="text-left py-2 px-3">Example</th>
              </tr></thead>
              <tbody>{report.voiceProfile.map((v, i) => (
                <tr key={i} className="border-b border-zinc-800/50">
                  <td className="py-2 px-3 text-violet-300 font-medium">{v.trait}</td>
                  <td className="py-2 px-3 text-green-400">{v.doThis}</td>
                  <td className="py-2 px-3 text-red-400">{v.avoidThis}</td>
                  <td className="py-2 px-3 text-zinc-300 italic">{v.example}</td>
                </tr>
              ))}</tbody>
            </table></div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-100 mb-4">📅 Weekly Content Plan</h2>
            <div className="space-y-2">
              {report.weeklyPlan.map((p, i) => (
                <div key={i} className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800 flex items-start gap-4">
                  <div className="min-w-[80px]">
                    <div className="text-violet-400 font-bold text-sm">{p.day}</div>
                    <div className="text-zinc-500 text-xs">{p.platform}</div>
                  </div>
                  <div>
                    <div className="text-zinc-100 font-medium">{p.type}: {p.topic}</div>
                    <div className="text-sm text-zinc-400">{p.angle}</div>
                    <div className="text-xs text-zinc-500 mt-1">Key message: {p.keyMessage}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-100 mb-4">🎯 Brand Gap Analysis</h2>
            <div className="overflow-x-auto"><table className="w-full text-sm">
              <thead><tr className="text-zinc-400 border-b border-zinc-800">
                <th className="text-left py-2 px-3">Element</th><th className="text-left py-2 px-3">Current</th><th className="text-left py-2 px-3">Target</th><th className="text-left py-2 px-3">Gap</th><th className="text-left py-2 px-3">Action</th>
              </tr></thead>
              <tbody>{report.brandAnalysis.map((b, i) => (
                <tr key={i} className="border-b border-zinc-800/50">
                  <td className="py-2 px-3 text-violet-300 font-medium">{b.element}</td>
                  <td className="py-2 px-3 text-red-400">{b.current}</td>
                  <td className="py-2 px-3 text-green-400">{b.target}</td>
                  <td className="py-2 px-3 text-zinc-400">{b.gap}</td>
                  <td className="py-2 px-3 text-zinc-300">{b.action}</td>
                </tr>
              ))}</tbody>
            </table></div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-100 mb-4">📝 Writing Formulas</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {report.formulas.map((f, i) => (
                <div key={i} className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800">
                  <div className="font-semibold text-violet-300">{f.name}</div>
                  <div className="text-sm text-zinc-100 mt-1">{f.structure}</div>
                  <div className="text-sm text-zinc-400 mt-1">Best for: {f.bestFor}</div>
                  <div className="text-sm text-zinc-500 italic mt-1">{f.example}</div>
                  <div className="text-sm text-green-400 mt-1">{f.conversionRate}</div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-100 mb-4">🏛 Content Pillars</h2>
            <div className="space-y-2">
              {report.contentPillars.map((p, i) => (
                <div key={i} className="bg-zinc-900/50 rounded-lg p-3 border border-zinc-800 text-sm text-zinc-300">
                  <span className="text-violet-400 mr-2">#{i + 1}</span>{p}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-100 mb-4">💡 Ghostwriter Pro Tips</h2>
            <div className="space-y-2">
              {report.ghostwriterTips.map((t, i) => (
                <div key={i} className="bg-zinc-900/50 rounded-lg p-3 border border-zinc-800 text-sm text-zinc-300">
                  <span className="text-green-400 mr-2">✓</span>{t}
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
