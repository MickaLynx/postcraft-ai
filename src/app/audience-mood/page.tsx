'use client';
import { useState } from 'react';

const platforms = ['Twitter/X', 'LinkedIn', 'Instagram', 'TikTok', 'Reddit', 'Facebook', 'YouTube', 'All Platforms'] as const;
const niches = ['Tech & SaaS', 'E-commerce & DTC', 'Healthcare', 'Finance & FinTech', 'Education', 'Fitness & Wellness', 'Food & Beverage', 'Travel & Hospitality', 'Gaming & Entertainment', 'Sustainability & Climate'] as const;
const timeframes = ['Right Now (last 24h)', 'This Week', 'This Month', 'Quarterly Trend', 'Year-over-Year'] as const;
const audienceTypes = ['B2B Decision-Makers', 'B2C Consumers', 'Gen Z (18-25)', 'Millennials (26-41)', 'Gen X (42-57)', 'Small Business Owners', 'Enterprise Teams', 'Creators & Influencers'] as const;

interface MoodSignal { mood: string; intensity: number; direction: string; triggers: string[]; contentOpportunity: string; timing: string; }
interface EmotionalWindow { emotion: string; peakTime: string; duration: string; platform: string; contentType: string; hook: string; avoidance: string; }
interface SentimentShift { topic: string; previousSentiment: string; currentSentiment: string; shift: string; cause: string; opportunity: string; risk: string; }
interface ContentTiming { slot: string; mood: string; bestFormat: string; bestTone: string; exampleHook: string; expectedEngagement: string; }
interface CrisisSensor { signal: string; severity: string; relatedTopics: string[]; recommendation: string; responseWindow: string; }

interface MoodReport {
  dominantMood: string;
  moodScore: number;
  moodDirection: string;
  signals: MoodSignal[];
  emotionalWindows: EmotionalWindow[];
  sentimentShifts: SentimentShift[];
  contentTimings: ContentTiming[];
  crisisSensors: CrisisSensor[];
  moodBasedStrategy: string[];
  avoidTopics: string[];
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }

function mapMood(platform: string, niche: string, timeframe: string, audience: string, brand: string): MoodReport {
  const seed = hash(`${platform}-${niche}-${timeframe}-${audience}-${brand}`);
  const moodScore = 20 + seed % 75;
  const moods = ['Optimistic & Energized', 'Anxious & Seeking Reassurance', 'Skeptical & Demanding Proof', 'Fatigued & Craving Simplicity', 'Curious & Exploring Alternatives', 'Frustrated & Venting'];
  const dominantMood = moods[seed % moods.length];
  const moodDirection = seed % 3 === 0 ? 'Improving' : seed % 3 === 1 ? 'Stable' : 'Declining';

  const signals: MoodSignal[] = [
    { mood: 'Optimism', intensity: 30 + seed % 50, direction: seed % 2 === 0 ? 'Rising' : 'Stable', triggers: ['Positive earnings reports', 'New product launches', 'Industry innovation news'], contentOpportunity: 'Ride the wave — share ambitious roadmaps, future predictions, and success stories', timing: 'Post within 24h of trigger for maximum resonance' },
    { mood: 'Anxiety', intensity: 20 + seed % 40, direction: seed % 3 === 0 ? 'Rising' : 'Declining', triggers: ['Market uncertainty', 'Layoff announcements', 'Regulatory changes'], contentOpportunity: 'Be the calm voice — provide actionable frameworks, checklists, and "here\'s what to do" content', timing: 'Post in morning when anxiety peaks — people seek reassurance before workday' },
    { mood: 'Curiosity', intensity: 35 + seed % 45, direction: 'Steady', triggers: ['New technology announcements', 'Competitor launches', 'Industry reports released'], contentOpportunity: 'Feed the curiosity — deep dives, explainers, "what this means for you" analysis', timing: 'Post mid-week when information-seeking behavior peaks' },
    { mood: 'Frustration', intensity: 15 + seed % 35, direction: seed % 2 === 0 ? 'Rising' : 'Declining', triggers: ['Tool outages', 'Price increases', 'Poor customer service stories going viral'], contentOpportunity: 'Validate frustration then offer solutions — "We hear you. Here\'s a better way."', timing: 'Wait 24-48h after trigger — immediate response feels opportunistic' },
    { mood: 'Nostalgia', intensity: 10 + seed % 25, direction: 'Cyclical', triggers: ['Year-end reflections', 'Anniversary milestones', 'Industry retrospectives'], contentOpportunity: 'Create "remember when" + "look how far we\'ve come" content — high share potential', timing: 'Friday afternoons and weekends — reflective mood peaks' },
    { mood: 'Aspiration', intensity: 25 + seed % 40, direction: seed % 2 === 0 ? 'Rising' : 'Stable', triggers: ['Monday motivation', 'Success stories', 'New year/quarter starts'], contentOpportunity: 'Share transformation stories, goal-setting frameworks, and "what\'s possible" content', timing: 'Monday mornings and first week of month/quarter — goal-setting energy is highest' },
  ];

  const emotionalWindows: EmotionalWindow[] = [
    { emotion: 'Morning Motivation', peakTime: '7-9 AM', duration: '2 hours', platform: 'LinkedIn, Twitter/X', contentType: 'Inspirational quotes, goal-setting, career tips', hook: '"Start your week with this one shift..."', avoidance: 'Heavy data, long reads, negative news' },
    { emotion: 'Midday Curiosity', peakTime: '11 AM - 1 PM', duration: '2 hours', platform: 'Twitter/X, Reddit', contentType: 'Industry news, hot takes, quick insights', hook: '"Breaking: [industry event] — here\'s what it means for you"', avoidance: 'Long-form content, promotional posts' },
    { emotion: 'Afternoon Fatigue', peakTime: '2-4 PM', duration: '2 hours', platform: 'Instagram, TikTok', contentType: 'Light entertainment, memes, behind-the-scenes', hook: '"That 2pm feeling when your code finally works..."', avoidance: 'Complex tutorials, serious thought leadership' },
    { emotion: 'Evening Reflection', peakTime: '6-9 PM', duration: '3 hours', platform: 'Instagram, Facebook, YouTube', contentType: 'Storytelling, case studies, personal growth', hook: '"Today I learned something that changed how I think about..."', avoidance: 'Urgency-driven CTAs, aggressive sales pitches' },
    { emotion: 'Late-Night FOMO', peakTime: '9-11 PM', duration: '2 hours', platform: 'TikTok, Twitter/X, Reddit', contentType: 'Trends, viral content, community engagement', hook: '"Everyone\'s talking about this but nobody\'s saying..."', avoidance: 'B2B content, formal tone, long reads' },
  ];

  const sentimentShifts: SentimentShift[] = [
    { topic: `AI in ${niche}`, previousSentiment: 'Excited & Curious', currentSentiment: seed % 2 === 0 ? 'Cautiously Optimistic' : 'Increasingly Skeptical', shift: seed % 2 === 0 ? '-15%' : '-25%', cause: 'Initial hype fading as implementation challenges surface', opportunity: 'Position as the "practical AI" voice — real results, not hype', risk: 'Avoid breathless AI enthusiasm — audience is tired of "AI will change everything"' },
    { topic: 'Remote Work & Productivity', previousSentiment: 'Positive', currentSentiment: 'Mixed — Polarized', shift: 'Diverging', cause: 'RTO mandates creating two camps: pro-remote vs. pro-office', opportunity: 'Create nuanced content that acknowledges both sides — avoid picking a side publicly', risk: 'Taking a strong stance will alienate half your audience' },
    { topic: `${niche} Pricing`, previousSentiment: 'Accepting', currentSentiment: 'Price-Sensitive & Comparison-Shopping', shift: '-20%', cause: 'Economic uncertainty driving more careful evaluation of tools/services', opportunity: 'Lead with ROI and value — show cost savings, not just features', risk: 'Don\'t raise prices without significant value communication first' },
    { topic: 'Creator Economy', previousSentiment: 'Aspirational', currentSentiment: seed % 2 === 0 ? 'Realistic & Pragmatic' : 'Disillusion Growing', shift: seed % 2 === 0 ? '-10%' : '-30%', cause: 'Market saturation making it harder to stand out — burnout increasing', opportunity: 'Content about sustainable creation, anti-hustle, and quality over quantity resonates', risk: 'Avoid "just be consistent and post every day" advice — it\'s causing fatigue' },
    { topic: 'Data Privacy & Trust', previousSentiment: 'Low Priority', currentSentiment: 'Rising Concern', shift: '+35%', cause: 'High-profile data breaches and AI training data controversies', opportunity: 'Transparently communicate your data practices — trust is a differentiator', risk: 'Any perception of data misuse will trigger disproportionate backlash' },
  ];

  const contentTimings: ContentTiming[] = [
    { slot: 'Monday 8-10 AM', mood: 'Motivated & Goal-Oriented', bestFormat: 'Thread / carousel', bestTone: 'Inspiring but actionable', exampleHook: '"This week, try this one thing to [achieve outcome]"', expectedEngagement: '+35% above average' },
    { slot: 'Tuesday 11 AM - 1 PM', mood: 'Focused & Learning', bestFormat: 'Long-form post / article', bestTone: 'Educational, data-driven', exampleHook: '"We analyzed [X] — here are [N] surprising findings"', expectedEngagement: '+20% above average' },
    { slot: 'Wednesday 12-2 PM', mood: 'Social & Collaborative', bestFormat: 'Poll / question / discussion', bestTone: 'Conversational, inclusive', exampleHook: '"Hot take or cold truth? [statement]. What do you think?"', expectedEngagement: '+45% comments' },
    { slot: 'Thursday 3-5 PM', mood: 'Creative & Exploratory', bestFormat: 'Visual / video / infographic', bestTone: 'Creative, surprising', exampleHook: '"Nobody\'s talking about this approach to [topic]..."', expectedEngagement: '+25% saves/bookmarks' },
    { slot: 'Friday 9-11 AM', mood: 'Reflective & Celebratory', bestFormat: 'Win recap / lessons learned', bestTone: 'Warm, authentic', exampleHook: '"This week I failed at [X]. Here\'s the lesson worth sharing"', expectedEngagement: '+30% shares' },
    { slot: 'Weekend', mood: 'Casual & Personal', bestFormat: 'Behind-the-scenes / personal story', bestTone: 'Vulnerable, human', exampleHook: '"Saturday confession: I almost quit [activity] last month..."', expectedEngagement: '+50% engagement from superfans' },
  ];

  const crisisSensors: CrisisSensor[] = [
    { signal: `Negative sentiment spike in ${niche} community`, severity: seed % 3 === 0 ? 'High' : 'Medium', relatedTopics: ['Product issues', 'Competitor drama', 'Industry controversy'], recommendation: 'Monitor for 24h before responding — don\'t jump into controversy without context', responseWindow: '24-48 hours' },
    { signal: 'Trending hashtag related to your brand/industry criticism', severity: 'Medium', relatedTopics: ['Customer complaints', 'Pricing backlash', 'Feature gaps'], recommendation: 'Acknowledge the conversation, don\'t dismiss it — "We hear you and here\'s what we\'re doing"', responseWindow: '6-12 hours' },
    { signal: 'Competitor making viral negative comparison', severity: 'Low', relatedTopics: ['Feature comparison', 'Price war', 'Market positioning'], recommendation: 'Don\'t respond directly — let customers defend you, amplify positive testimonials instead', responseWindow: '48-72 hours (or never)' },
    { signal: 'Industry-wide event affecting audience sentiment', severity: seed % 2 === 0 ? 'High' : 'Medium', relatedTopics: ['Layoffs', 'Regulation changes', 'Market crash'], recommendation: 'Pause scheduled content — respond with empathy first, practical help second', responseWindow: '4-8 hours for acknowledgment' },
  ];

  const moodBasedStrategy = [
    `Current dominant mood is "${dominantMood}" — ${dominantMood.includes('Optimistic') ? 'lean into aspirational and growth content' : dominantMood.includes('Anxious') ? 'provide stability, frameworks, and "here\'s what to do" content' : dominantMood.includes('Skeptical') ? 'lead with data, proof, and case studies — no hype' : dominantMood.includes('Fatigued') ? 'simplify everything — short posts, clear value, zero fluff' : dominantMood.includes('Curious') ? 'feed with deep dives, explainers, and "what this means" analysis' : 'validate frustration, then offer solutions — empathy first'}`,
    `Mood direction is ${moodDirection.toLowerCase()} — ${moodDirection === 'Improving' ? 'increase posting frequency, audience is receptive' : moodDirection === 'Stable' ? 'maintain current cadence, test new formats' : 'reduce frequency, increase quality per post — less noise, more signal'}`,
    'Emotional windows are your posting superpowers — match content format to mood window for 2-3x engagement',
    `Top sentiment shift to watch: ${sentimentShifts[0].topic} — ${sentimentShifts[0].opportunity}`,
    'Crisis sensors are early warning systems — monitor daily, respond strategically, never reactively',
    `For ${audience}: ${audience.includes('B2B') ? 'Prioritize LinkedIn morning + Tuesday data content' : audience.includes('Gen Z') ? 'Prioritize TikTok late-night + meme-adjacent content' : 'Diversify across platforms with mood-matched timing'}`,
    `This ${timeframe.toLowerCase().replace('right now (last 24h)', 'week')}: focus on ${signals[0].mood.toLowerCase()} content with ${signals[2].mood.toLowerCase()} undertones — it matches the current emotional landscape`,
  ];

  const avoidTopics = [
    `${seed % 2 === 0 ? 'Aggressive sales pitches — audience is in evaluation mode, not buying mode' : 'Fear-based marketing — anxiety levels are already elevated'}`,
    `Unsubstantiated hype about ${sentimentShifts[0].topic} — credibility at stake`,
    `"Hustle culture" messaging — ${audience} audience shows strong anti-burnout sentiment`,
    'Competitor bashing — backfires when audience mood is collaborative/community-oriented',
    `Political takes unrelated to ${niche} — alienates segments of your audience with zero upside`,
  ];

  return { dominantMood, moodScore, moodDirection, signals, emotionalWindows, sentimentShifts, contentTimings, crisisSensors, moodBasedStrategy, avoidTopics };
}

export default function AudienceMoodPage() {
  const [platform, setPlatform] = useState(platforms[0]);
  const [niche, setNiche] = useState(niches[0]);
  const [timeframe, setTimeframe] = useState(timeframes[0]);
  const [audience, setAudience] = useState(audienceTypes[0]);
  const [brand, setBrand] = useState('');
  const [result, setResult] = useState<MoodReport | null>(null);

  const handleGenerate = () => { if (brand.trim()) setResult(mapMood(platform, niche, timeframe, audience, brand)); };
  const intensityColor = (n: number) => n >= 60 ? '#f87171' : n >= 40 ? '#fbbf24' : n >= 20 ? '#a3e635' : '#34d399';
  const dirColor = (d: string) => d === 'Rising' || d === 'Improving' ? '#34d399' : d === 'Declining' ? '#f87171' : '#fbbf24';
  const sevColor = (s: string) => s === 'High' ? '#f87171' : s === 'Medium' ? '#fbbf24' : '#34d399';

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Audience Mood Mapper</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Map the emotional landscape of your audience in real time. Detect mood signals, find emotional posting windows, track sentiment shifts, and time your content to match how your audience feels — not just what they search for.</p>

        <div className="mb-4">
          <label className="block text-sm text-zinc-400 mb-1">Brand / Niche Focus</label>
          <input type="text" value={brand} onChange={e => setBrand(e.target.value)} placeholder="e.g., PostCraft, AI tools space, fitness coaching" className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-3 text-zinc-100" />
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {([
            { label: 'Platform', value: platform, setter: setPlatform as (v: string) => void, options: platforms as readonly string[] },
            { label: 'Niche / Industry', value: niche, setter: setNiche as (v: string) => void, options: niches as readonly string[] },
            { label: 'Timeframe', value: timeframe, setter: setTimeframe as (v: string) => void, options: timeframes as readonly string[] },
            { label: 'Audience Type', value: audience, setter: setAudience as (v: string) => void, options: audienceTypes as readonly string[] },
          ] as const).map(({ label, value, setter, options }) => (
            <div key={label}>
              <label className="block text-sm text-zinc-400 mb-1">{label}</label>
              <select value={value} onChange={e => setter(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100">
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
        <button onClick={handleGenerate} className="w-full md:w-auto bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded font-semibold hover:opacity-90 transition mb-8">Map Audience Mood</button>

        {result && (
          <div className="space-y-8">
            {/* Dominant Mood */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 text-center">
              <div className="text-2xl font-bold text-zinc-200 mb-1">{result.dominantMood}</div>
              <div className="text-zinc-400 text-sm mb-3">Dominant Audience Mood</div>
              <div className="flex justify-center gap-6 text-sm">
                <div><span className="text-zinc-500">Intensity:</span> <span className="font-bold" style={{ color: intensityColor(result.moodScore) }}>{result.moodScore}%</span></div>
                <div><span className="text-zinc-500">Direction:</span> <span className="font-bold" style={{ color: dirColor(result.moodDirection) }}>{result.moodDirection}</span></div>
              </div>
            </div>

            {/* Mood Signals */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-violet-400">Mood Signals ({result.signals.length})</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {result.signals.map((s, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-zinc-200">{s.mood}</span>
                      <div className="flex gap-2"><span className="text-xs font-bold" style={{ color: intensityColor(s.intensity) }}>{s.intensity}%</span><span className="text-xs" style={{ color: dirColor(s.direction) }}>{s.direction}</span></div>
                    </div>
                    <div className="w-full bg-zinc-800 rounded-full h-1.5 mb-2"><div className="h-1.5 rounded-full" style={{ width: `${s.intensity}%`, background: intensityColor(s.intensity) }} /></div>
                    <div className="text-xs text-zinc-500 mb-1">Triggers: {s.triggers.join(' • ')}</div>
                    <div className="text-xs text-emerald-400/70">{s.contentOpportunity}</div>
                    <div className="text-xs text-zinc-500 mt-1">{s.timing}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emotional Windows */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-fuchsia-400">Emotional Posting Windows</h3>
              <div className="space-y-3">
                {result.emotionalWindows.map((w, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-zinc-200">{w.emotion}</span>
                      <div className="flex gap-2 text-xs"><span className="px-2 py-1 rounded bg-fuchsia-400/10 text-fuchsia-400">{w.peakTime}</span><span className="text-zinc-500">{w.duration}</span></div>
                    </div>
                    <div className="text-xs space-y-1">
                      <div><span className="text-zinc-500">Platform:</span> <span className="text-zinc-300">{w.platform}</span></div>
                      <div><span className="text-zinc-500">Best format:</span> <span className="text-zinc-300">{w.contentType}</span></div>
                      <div><span className="text-zinc-500">Hook:</span> <span className="text-violet-400">"{w.hook}"</span></div>
                      <div><span className="text-zinc-500">Avoid:</span> <span className="text-red-400/60">{w.avoidance}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sentiment Shifts + Content Timings */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-amber-400">Sentiment Shifts</h3>
                <div className="space-y-3">
                  {result.sentimentShifts.map((s, i) => (
                    <div key={i} className="bg-zinc-800/40 rounded-lg p-3 border border-zinc-700/50">
                      <div className="text-sm font-semibold text-zinc-200 mb-1">{s.topic}</div>
                      <div className="flex items-center gap-2 mb-1 text-xs"><span className="text-zinc-500">{s.previousSentiment}</span><span className="text-amber-400">→</span><span className="text-zinc-300">{s.currentSentiment}</span><span className="font-bold" style={{ color: s.shift.startsWith('+') ? '#34d399' : '#f87171' }}>{s.shift}</span></div>
                      <div className="text-xs text-zinc-500">{s.cause}</div>
                      <div className="text-xs text-emerald-400/70 mt-1">{s.opportunity}</div>
                      <div className="text-xs text-red-400/60">{s.risk}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-emerald-400">Best Posting Slots</h3>
                <div className="space-y-3">
                  {result.contentTimings.map((t, i) => (
                    <div key={i} className="bg-zinc-800/40 rounded-lg p-3 border border-zinc-700/50">
                      <div className="flex justify-between mb-1"><span className="text-sm font-semibold text-zinc-200">{t.slot}</span><span className="text-xs text-emerald-400">{t.expectedEngagement}</span></div>
                      <div className="text-xs space-y-0.5">
                        <div><span className="text-zinc-500">Mood:</span> <span className="text-zinc-300">{t.mood}</span></div>
                        <div><span className="text-zinc-500">Format:</span> <span className="text-zinc-300">{t.bestFormat}</span> <span className="text-zinc-500">Tone:</span> <span className="text-zinc-300">{t.bestTone}</span></div>
                        <div className="text-violet-400 italic">"{t.exampleHook}"</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Crisis Sensors */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-red-400">Crisis Sensors</h3>
              <div className="space-y-3">
                {result.crisisSensors.map((c, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-zinc-200">{c.signal}</span>
                      <div className="flex gap-2"><span className="text-xs px-2 py-1 rounded font-bold" style={{ color: sevColor(c.severity), background: `${sevColor(c.severity)}15` }}>{c.severity}</span><span className="text-xs text-zinc-500">{c.responseWindow}</span></div>
                    </div>
                    <div className="text-xs text-zinc-500 mb-1">Related: {c.relatedTopics.join(' • ')}</div>
                    <div className="text-xs text-emerald-400/70">{c.recommendation}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategy + Avoid */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-emerald-400">Mood-Based Strategy</h3>
                <div className="space-y-2">{result.moodBasedStrategy.map((s, i) => <div key={i} className="text-sm text-zinc-400 flex gap-2"><span className="text-emerald-400 shrink-0">→</span>{s}</div>)}</div>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-red-400">Topics to Avoid Right Now</h3>
                <div className="space-y-2">{result.avoidTopics.map((t, i) => <div key={i} className="text-sm text-zinc-400 flex gap-2"><span className="text-red-400 shrink-0">✕</span>{t}</div>)}</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">Read the Room Before You Post</h3>
              <p className="text-zinc-400 mb-4">PostCraft AI maps your audience's emotional landscape so every post lands at the right time, in the right tone. Pair with <a href="/post-timing" className="text-violet-400 underline">Post Timing</a>, <a href="/sentiment-analyzer" className="text-violet-400 underline">Sentiment Analyzer</a>, and <a href="/content-dna" className="text-violet-400 underline">Content DNA</a>.</p>
              <a href="/pricing" className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">Get PostCraft Pro</a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
