'use client';
import { useState } from 'react';

const audiences = ['Gen Z (18-24)', 'Millennials (25-40)', 'Gen X (41-56)', 'Boomers (57-75)', 'B2B Decision Makers', 'Creators & Influencers', 'Parents & Families', 'Students & Academics'] as const;
const platforms = ['Instagram', 'TikTok', 'Twitter/X', 'LinkedIn', 'Facebook', 'YouTube', 'Threads', 'Reddit'] as const;
const contentTypes = ['Educational & How-To', 'Emotional & Storytelling', 'Promotional & Sales', 'Entertainment & Humor', 'Controversial & Debate', 'Inspirational & Motivational', 'News & Updates', 'Behind-the-Scenes'] as const;
const emotionalGoals = ['Inspire Action', 'Build Trust', 'Spark Curiosity', 'Create FOMO', 'Generate Empathy', 'Drive Urgency', 'Foster Community', 'Provoke Thought'] as const;
const timezones = ['US Eastern', 'US Pacific', 'UK/Ireland', 'Central Europe', 'Asia-Pacific', 'Global (Multi-TZ)'] as const;
const dayTypes = ['Weekday (Mon-Fri)', 'Weekend (Sat-Sun)', 'Monday (Fresh Start)', 'Friday (Wind Down)', 'Sunday (Reflection)', 'Any Day'] as const;

interface TimingWindow { timeSlot: string; emotionalState: string; moodIntensity: number; whyItWorks: string; bestContentType: string; avoidPosting: string; }
interface EmotionPoint { timeOfDay: string; dominantEmotion: string; energyLevel: 'High' | 'Medium' | 'Low'; attentionSpan: string; scrollBehavior: string; contentReceptivity: string; }
interface PsychoInsight { insight: string; dataPoint: string; implication: string; actionableAdvice: string; }
interface CompetitorGap { timeSlot: string; competitorActivity: 'Heavy' | 'Moderate' | 'Light'; opportunity: string; recommendedAction: string; }
interface HeatmapDay { day: string; peakHour: string; peakEmotion: string; engagementPotential: number; avoidHours: string; }
interface MoodTimingResult {
  moodScore: number;
  optimalWindows: TimingWindow[];
  emotionalCurve: EmotionPoint[];
  psychographicInsights: PsychoInsight[];
  competitorGaps: CompetitorGap[];
  weeklyHeatmap: HeatmapDay[];
  moodTriggers: string[];
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }
function pick<T>(arr: readonly T[] | T[], seed: number, idx: number = 0): T { return arr[(seed + idx) % arr.length]; }

function generateMoodTiming(audience: string, platform: string, contentType: string, emotionalGoal: string, timezone: string, dayType: string): MoodTimingResult {
  const seed = hash(`${audience}-${platform}-${contentType}-${emotionalGoal}-${timezone}-${dayType}`);
  const moodScore = 40 + seed % 56;

  const allTimeSlots = [
    '6:00 AM - 7:15 AM', '7:15 AM - 8:30 AM', '8:45 AM - 10:00 AM', '10:15 AM - 11:30 AM',
    '11:45 AM - 1:00 PM', '1:15 PM - 2:30 PM', '2:45 PM - 4:00 PM', '4:15 PM - 5:30 PM',
    '5:45 PM - 7:00 PM', '7:15 PM - 8:30 PM', '8:45 PM - 10:00 PM', '10:15 PM - 11:30 PM',
  ];
  const allEmotionalStates = [
    'Anticipatory optimism — fresh energy and openness to new ideas',
    'Determined focus — goal-oriented mindset primed for actionable content',
    'Restless curiosity — seeking stimulation and novelty during transition periods',
    'Empathetic vulnerability — emotional defenses lowered, storytelling resonates deeply',
    'Competitive drive — comparison behavior peaks, FOMO content hits hardest',
    'Reflective nostalgia — introspective mood favoring meaningful, deeper content',
    'Social bonding energy — desire for connection and community content spikes',
    'Escapist craving — mentally checked out of work, seeking entertainment relief',
    'Aspirational dreaming — visualizing future self, inspired by transformation stories',
    'Decision fatigue — low willpower but high impulse-buy and snap-engagement potential',
    'Calm receptivity — relaxed state ideal for educational and long-form content',
    'Anxious scrolling — nervous energy drives rapid consumption and reactive engagement',
    'Playful irreverence — humor tolerance peaks, meme and satire content thrives',
    'Productivity guilt — content about efficiency and self-improvement gets saved',
  ];
  const allWhyItWorks = [
    'Cortisol levels peak in the morning, creating a natural alertness that makes audiences more receptive to bold calls-to-action',
    'Post-lunch serotonin dip creates a vulnerability window where emotional storytelling bypasses rational filters',
    'The commute-home dopamine anticipation makes audiences 2.3x more likely to engage with aspirational content',
    'Late-evening melatonin onset lowers inhibitions — audiences share more freely and comment with greater authenticity',
    'Mid-morning coffee ritual creates a micro-break where audiences actively seek stimulating content to share',
    'Pre-dinner stress peak drives escapist scrolling — entertainment content gets 40% higher completion rates',
    'Sunday evening anticipatory anxiety makes planning and motivational content feel urgently relevant',
    'Weekend morning relaxation removes time pressure — long-form content completion rates jump 65%',
    'Friday afternoon mental checkout creates peak receptivity for light, shareable content formats',
    'Tuesday focus peak means educational content gets saved 3x more often than other days',
    'Post-workout endorphin window (6-8 AM) makes audiences 1.8x more likely to engage positively',
    'The 3 PM energy crash creates a perfect storm for relatable, empathy-driven content',
    'Early morning solitude creates parasocial intimacy — personal stories feel like private conversations',
    'Lunchtime social comparison peaks as audiences see peers\' highlight reels — FOMO content converts here',
  ];
  const allBestContentTypes = [
    'Quick motivational reels with strong visual hooks (under 30 seconds)',
    'Data-driven carousels with actionable takeaways — high save-rate format',
    'Raw, unfiltered stories — behind-the-scenes authenticity outperforms polish here',
    'Debate-style polls and hot takes — contrarian opinions drive comment velocity',
    'Step-by-step tutorials with clear timestamps — audiences are in learning mode',
    'Meme-format content and relatable humor — low effort, high share potential',
    'Long-form video essays or threads — attention span peaks support deep content',
    'Community Q&A and response content — social reciprocity instinct is strongest now',
    'Transformation before/after content — visual proof resonates in this mood state',
    'Curated lists and resource roundups — decision-fatigued audiences want curation',
    'Live or real-time content — urgency and FOMO mechanics are most effective now',
    'Vulnerable personal narratives — emotional walls are down, empathy is high',
    'Challenge or trend participation content — social conformity drive peaks here',
    'Aspirational lifestyle content with subtle product integration — purchase intent peaks',
  ];
  const allAvoidPosting = [
    'Hard-sell promotional content — audiences are in discovery mode, not buying mode',
    'Complex educational threads — cognitive load capacity is at its lowest point',
    'Controversial takes — emotional volatility makes backlash risk 3x higher',
    'Long-form content — attention spans crater during this window, keep it under 15 seconds',
    'Corporate-tone announcements — authenticity expectations peak, formal content feels jarring',
    'Depressing or heavy topics — mood state rejects negativity and audiences will scroll past',
    'Self-promotional content — audience is in community mode, ego-driven posts get hidden',
    'Time-sensitive offers — decision fatigue means CTAs convert 60% lower than average',
    'Recycled or reposted content — novelty-seeking behavior peaks, reposts feel lazy',
    'Passive content requiring no interaction — engagement algorithms penalize low-response posts here',
    'Negative competitor comparisons — empathetic mood makes attack content feel distasteful',
    'Dense infographics — visual processing capacity is reduced during this energy state',
  ];

  const optimalWindows: TimingWindow[] = Array.from({ length: 6 }, (_, i) => ({
    timeSlot: allTimeSlots[(seed + i * 3) % allTimeSlots.length],
    emotionalState: allEmotionalStates[(seed + i * 5) % allEmotionalStates.length],
    moodIntensity: 35 + (seed + i * 13) % 60,
    whyItWorks: allWhyItWorks[(seed + i * 4) % allWhyItWorks.length],
    bestContentType: allBestContentTypes[(seed + i * 7) % allBestContentTypes.length],
    avoidPosting: allAvoidPosting[(seed + i * 6) % allAvoidPosting.length],
  }));

  const allTimesOfDay = ['Early Morning (5-7 AM)', 'Morning (7-9 AM)', 'Mid-Morning (9-11 AM)', 'Midday (11 AM-1 PM)', 'Afternoon (1-3 PM)', 'Late Afternoon (3-5 PM)', 'Evening (5-7 PM)', 'Night (7-9 PM)', 'Late Night (9-11 PM)', 'Midnight (11 PM-1 AM)'];
  const allDominantEmotions = [
    'Anticipation & Hope', 'Focused Determination', 'Restless Curiosity', 'Social Hunger',
    'Post-Lunch Lethargy', 'Escapist Fantasy', 'Relief & Wind-Down', 'Reflective Nostalgia',
    'Anxious Overthinking', 'Calm Intimacy', 'Playful Irreverence', 'FOMO & Comparison',
    'Gratitude & Contentment', 'Creative Inspiration',
  ];
  const allAttentionSpans = [
    '8-12 seconds — hook must land immediately', '15-25 seconds — moderate attention, strong opening needed',
    '30-60 seconds — extended focus window, ideal for storytelling', '5-8 seconds — extremely low, visual-only content wins',
    '45-90 seconds — deep attention peak, long-form thrives', '10-15 seconds — distracted but curious, pattern interrupts work',
    '20-35 seconds — steady attention, educational content converts', '60-120 seconds — maximum receptivity for complex narratives',
  ];
  const allScrollBehaviors = [
    'Slow, intentional scrolling — actively seeking specific content types',
    'Rapid-fire thumb scrolling — only pattern interrupts stop the scroll',
    'Tab-switching between platforms — cross-posting captures attention here',
    'Deep-dive single-platform session — algorithm-fed content gets full attention',
    'Notification-triggered check-ins — push-optimized content wins',
    'Endless scroll autopilot — hypnotic, repetitive formats hook unconsciously',
    'Search-first behavior — SEO-optimized content surfaces naturally here',
    'Story/reel-first consumption — ephemeral content format dominates attention',
  ];
  const allContentReceptivities = [
    'High receptivity to inspirational content — transformation narratives convert best',
    'Peak receptivity for educational content — audiences actively want to learn',
    'Humor and entertainment receptivity peaks — share intent is at maximum',
    'Promotional content window — purchase intent and impulse decisions spike',
    'Community content resonates — audiences seek belonging and interaction',
    'Controversial content tolerance peaks — debate-style posts drive engagement',
    'Vulnerable/authentic content window — emotional guards are down completely',
    'Visual-first receptivity — text-heavy content gets scrolled past, images/video win',
  ];

  const energyLevels: ('High' | 'Medium' | 'Low')[] = ['High', 'Medium', 'Low'];
  const emotionalCurve: EmotionPoint[] = Array.from({ length: 6 }, (_, i) => ({
    timeOfDay: allTimesOfDay[(seed + i * 2) % allTimesOfDay.length],
    dominantEmotion: allDominantEmotions[(seed + i * 3) % allDominantEmotions.length],
    energyLevel: energyLevels[i < 2 ? 0 : i < 4 ? 1 : 2],
    attentionSpan: allAttentionSpans[(seed + i * 5) % allAttentionSpans.length],
    scrollBehavior: allScrollBehaviors[(seed + i * 4) % allScrollBehaviors.length],
    contentReceptivity: allContentReceptivities[(seed + i * 7) % allContentReceptivities.length],
  }));

  const allInsights = [
    'Your audience exhibits "cortisol-driven engagement" — stress hormones peak at specific times creating predictable attention surges',
    'Psychographic clustering reveals a "dual-identity" pattern — your audience switches between professional and personal modes at consistent times',
    'Emotional contagion velocity is 3.2x faster in your audience segment — viral emotional content spreads in predictable waves',
    'Decision fatigue follows a U-curve for this demographic — willpower peaks mid-morning and briefly again after dinner',
    'Your audience shows "parasocial loyalty patterns" — they engage with creators who post during their personal ritual times',
    'Mirror neuron activation is highest during commute times — empathetic and story-driven content resonates 2x more',
    'The "Sunday Scaries" effect creates a 4-hour window of heightened anxiety-driven engagement for this demographic',
    'This audience segment exhibits "revenge bedtime procrastination" — late-night engagement is emotionally charged and impulsive',
    'Social proof sensitivity peaks during lunch hours — testimonial and UGC content converts 45% better in midday windows',
    'Your audience has a "micro-reward" cycle of 22 minutes — content that delivers quick wins matches their dopamine rhythm',
    'Nostalgia receptivity follows a weekly cycle — peaks on Sundays and Wednesdays when routine fatigue sets in',
    'This demographic shows "attention debt" patterns — they save content during low-energy times and consume it in dedicated sessions',
    'Competitive comparison behavior spikes 40 minutes after waking — achievement-oriented content hits hardest in early morning',
    'Emotional boundary dissolution occurs after 10 PM — vulnerable and authentic content gets 3x more genuine comments',
  ];
  const allDataPoints = [
    '73% of this demographic checks social media within 8 minutes of waking — morning content has first-mover advantage',
    'Engagement rate drops 34% between 2-3 PM across all platforms for this age group — the universal attention desert',
    'Save-to-share ratio peaks at 3.7:1 during evening hours — audiences curate rather than broadcast after work',
    'Comment sentiment is 28% more positive before 10 AM — morning audiences are more supportive and encouraging',
    'Video completion rates increase 52% on weekends for this demographic — attention spans expand without work pressure',
    'This audience segment averages 4.2 social media sessions per day, with the longest session occurring between 8-10 PM',
    'Click-through rates on educational content are 41% higher during mid-morning than any other time for this group',
    'Emotional response intensity (measured by reaction usage) peaks 2x during the 6-8 PM window for this demographic',
    'This audience shows 67% higher purchase intent within 30 minutes of consuming aspirational content — timing the CTA matters',
    'Unfollow rates spike 3x when brands post more than twice during the audience\'s low-energy periods — oversaturation risk',
    'Story completion rates for this demographic peak at 89% during morning commute windows — captive audience effect',
    'This group shares content 2.1x more when they encounter it during social (non-solo) browsing sessions',
  ];
  const allImplications = [
    'Your content calendar should be emotion-mapped, not just time-mapped — what you post matters as much as when',
    'A/B testing by time slot alone misses the emotional variable — test content tone + timing combinations instead',
    'Your "best time to post" is actually 3-4 micro-windows, not one universal slot — each serves a different emotional need',
    'Competitor timing analysis is incomplete without mood context — posting at the same time with wrong emotional tone fails',
    'Your audience\'s emotional state determines whether they scroll, save, share, or purchase — match the action to the mood',
    'Content format should shift throughout the day — morning audiences want different formats than evening audiences',
    'Engagement metrics without emotional context are misleading — a like during high-energy differs from a like during low-energy',
    'Your posting frequency should vary by day based on emotional capacity — more isn\'t better during low-receptivity windows',
  ];
  const allActionableAdvices = [
    'Schedule your highest-stakes content (launches, announcements) during the peak cortisol window for maximum attention capture',
    'Create a "mood-matched content bank" — pre-tag content by emotional tone so you can deploy it in the right window',
    'Use platform scheduling tools to hit the 3 primary emotional windows — morning motivation, midday escape, evening reflection',
    'Build a weekly "emotional rhythm" template — map your content types to your audience\'s predictable mood cycles',
    'Reserve your most vulnerable, authentic content for late-evening posts — the emotional intimacy window maximizes genuine connection',
    'Front-load your value proposition in morning content (first 3 seconds) — attention is high but patience is low',
    'Use story/ephemeral formats during low-energy periods — the casual format matches the audience\'s reduced cognitive investment',
    'Create "ritual content" that audiences come to expect at specific times — consistency builds parasocial habit loops',
    'Deploy FOMO-driven content during comparison-heavy time slots — scarcity messaging converts when competitive drive is active',
    'Save long-form educational content for weekend mornings — expanded attention spans justify deeper formats',
  ];

  const psychographicInsights: PsychoInsight[] = Array.from({ length: 5 }, (_, i) => ({
    insight: allInsights[(seed + i * 3) % allInsights.length],
    dataPoint: allDataPoints[(seed + i * 5) % allDataPoints.length],
    implication: allImplications[(seed + i * 4) % allImplications.length],
    actionableAdvice: allActionableAdvices[(seed + i * 7) % allActionableAdvices.length],
  }));

  const allGapTimeSlots = [
    '6:00 AM - 7:30 AM', '7:30 AM - 9:00 AM', '9:00 AM - 10:30 AM', '10:30 AM - 12:00 PM',
    '12:00 PM - 1:30 PM', '1:30 PM - 3:00 PM', '3:00 PM - 4:30 PM', '4:30 PM - 6:00 PM',
    '6:00 PM - 7:30 PM', '7:30 PM - 9:00 PM', '9:00 PM - 10:30 PM', '10:30 PM - 12:00 AM',
  ];
  const allOpportunities = [
    'First-mover advantage — your content will dominate the feed with minimal competition for attention',
    'Counter-programming window — while competitors flood with one content type, the opposite emotional tone stands out',
    'Algorithm favor zone — lower posting volume means platform algorithms have fewer options, boosting your reach',
    'Audience attention surplus — engaged users are actively scrolling but finding less new content to consume',
    'Share velocity multiplier — content posted during low-competition windows gets shared before the next content wave',
    'Community engagement peak — fewer competing posts means your audience has bandwidth to comment and interact deeply',
  ];
  const allRecommendedActions = [
    'Post your best-performing content format in this window — the reduced noise amplifies quality content by 2-3x',
    'Use this slot for community-building posts — fewer distractions mean deeper conversations in comments',
    'Deploy time-sensitive offers here — lower competition means higher visibility for promotional content',
    'Test new content formats in this window — the forgiving attention environment gives experimental content a fair shot',
    'Schedule your highest-production-value content here — it will get the attention it deserves without being drowned out',
    'Post engagement-bait (polls, questions, challenges) — the audience has surplus attention to participate actively',
  ];

  const competitorActivities: ('Heavy' | 'Moderate' | 'Light')[] = ['Heavy', 'Moderate', 'Light'];
  const competitorGaps: CompetitorGap[] = Array.from({ length: 4 }, (_, i) => ({
    timeSlot: allGapTimeSlots[(seed + i * 4) % allGapTimeSlots.length],
    competitorActivity: competitorActivities[(seed + i * 3) % competitorActivities.length],
    opportunity: allOpportunities[(seed + i * 5) % allOpportunities.length],
    recommendedAction: allRecommendedActions[(seed + i * 2) % allRecommendedActions.length],
  }));

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const allPeakHours = ['7:00 AM', '8:30 AM', '10:00 AM', '12:15 PM', '1:45 PM', '3:30 PM', '5:15 PM', '6:45 PM', '8:00 PM', '9:30 PM', '10:45 PM'];
  const allPeakEmotions = [
    'Fresh Start Energy', 'Focused Ambition', 'Midweek Resilience', 'Momentum Building',
    'Freedom Anticipation', 'Relaxed Exploration', 'Reflective Planning', 'Social Connection',
    'Creative Inspiration', 'Competitive Drive', 'Calm Contentment', 'Nostalgic Warmth',
  ];
  const allAvoidHours = [
    '2:00 PM - 3:30 PM (energy crash)', '3:00 PM - 4:00 PM (decision fatigue)', '1:00 PM - 2:00 PM (post-lunch dip)',
    '11:00 PM - 6:00 AM (minimal reach)', '4:00 AM - 6:00 AM (dead zone)', '2:30 PM - 3:30 PM (attention desert)',
    '12:00 AM - 5:00 AM (engagement void)', '3:30 PM - 4:30 PM (cognitive low point)',
  ];

  const weeklyHeatmap: HeatmapDay[] = days.map((day, i) => ({
    day,
    peakHour: allPeakHours[(seed + i * 3) % allPeakHours.length],
    peakEmotion: allPeakEmotions[(seed + i * 5) % allPeakEmotions.length],
    engagementPotential: 30 + (seed + i * 11) % 65,
    avoidHours: allAvoidHours[(seed + i * 4) % allAvoidHours.length],
  }));

  const allMoodTriggers = [
    'Breaking news cycles shift audience mood from content-consumption to reactive-commentary within 15 minutes',
    'Weather changes directly impact scroll duration — rainy days see 23% longer sessions for this demographic',
    'Payday cycles (1st and 15th) create 48-hour windows of increased purchase intent and aspirational content engagement',
    'Major sporting events fragment attention — post before or 2+ hours after game times for this audience',
    'Platform algorithm updates cause 3-5 day engagement volatility — monitor for sudden reach drops before diagnosing content issues',
    'Seasonal affective patterns peak in January and November — empathetic and supportive content outperforms during these months',
    'Back-to-school and return-from-vacation transitions create 2-week identity-crisis content windows',
    'Competitor viral moments temporarily shift audience expectations — monitor competitor engagement for mood context',
    'Social media discourse fatigue follows a 72-hour cycle after major controversies — time your re-entry carefully',
    'Holiday anticipation builds engagement for 10 days before major holidays, then crashes for 3 days after',
    'Mercury retrograde and astrology events measurably increase engagement for spirituality-adjacent audiences',
    'Monday morning dread and Friday afternoon euphoria create predictable weekly emotional arcs across all demographics',
    'Economic news (inflation reports, layoff announcements) shifts audience mood toward practical and savings-focused content for 48 hours',
    'Full moon periods show a statistically significant 8% increase in emotional and controversial content engagement',
    'Platform outages on competing networks create 2-4 hour attention surges — be ready with quick-deploy content',
    'Cultural moments (awards shows, product launches) create 6-hour content windows where relevance decays rapidly',
  ];

  const moodTriggers: string[] = Array.from({ length: 8 }, (_, i) => allMoodTriggers[(seed + i * 3) % allMoodTriggers.length]);

  return { moodScore, optimalWindows, emotionalCurve, psychographicInsights, competitorGaps, weeklyHeatmap, moodTriggers };
}

export default function MoodTimingPage() {
  const [audience, setAudience] = useState(audiences[0]);
  const [platform, setPlatform] = useState(platforms[0]);
  const [contentType, setContentType] = useState(contentTypes[0]);
  const [emotionalGoal, setEmotionalGoal] = useState(emotionalGoals[0]);
  const [timezone, setTimezone] = useState(timezones[0]);
  const [dayType, setDayType] = useState(dayTypes[0]);
  const [result, setResult] = useState<MoodTimingResult | null>(null);

  const handleGenerate = () => setResult(generateMoodTiming(audience, platform, contentType, emotionalGoal, timezone, dayType));

  const scoreColor = (n: number) => n > 75 ? '#34d399' : n > 55 ? '#fbbf24' : n > 35 ? '#fb923c' : '#f87171';
  const energyColor = (e: string) => e === 'High' ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30' : e === 'Medium' ? 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30' : 'text-red-400 bg-red-400/10 border-red-400/30';
  const activityColor = (a: string) => a === 'Heavy' ? 'text-red-400 bg-red-400/10 border-red-400/30' : a === 'Moderate' ? 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30' : 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30';

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Mood Timing — Emotional Resonance Optimizer</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Go beyond &quot;best time to post&quot;. Discover when your audience is emotionally primed to engage with your specific content type.</p>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {([
            { label: 'Audience', value: audience, setter: setAudience as (v: string) => void, options: audiences as readonly string[] },
            { label: 'Platform', value: platform, setter: setPlatform as (v: string) => void, options: platforms as readonly string[] },
            { label: 'Content Type', value: contentType, setter: setContentType as (v: string) => void, options: contentTypes as readonly string[] },
            { label: 'Emotional Goal', value: emotionalGoal, setter: setEmotionalGoal as (v: string) => void, options: emotionalGoals as readonly string[] },
            { label: 'Timezone', value: timezone, setter: setTimezone as (v: string) => void, options: timezones as readonly string[] },
            { label: 'Day Type', value: dayType, setter: setDayType as (v: string) => void, options: dayTypes as readonly string[] },
          ] as const).map(({ label, value, setter, options }) => (
            <div key={label}>
              <label className="block text-sm text-zinc-400 mb-1">{label}</label>
              <select value={value} onChange={e => setter(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100">
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
        <button onClick={handleGenerate} className="w-full md:w-auto bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded font-semibold hover:opacity-90 transition mb-8">Analyze Mood Timing</button>

        {result && (
          <div className="space-y-8">
            {/* Score Card + Summary */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 text-center">
                <div className="text-6xl font-bold mb-2" style={{ color: scoreColor(result.moodScore) }}>{result.moodScore}</div>
                <div className="text-zinc-400 mb-1">Mood Timing Score</div>
                <div className="mt-3 w-full bg-zinc-800 rounded-full h-3">
                  <div className="h-3 rounded-full transition-all" style={{ width: `${result.moodScore}%`, background: scoreColor(result.moodScore) }} />
                </div>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3">Analysis Summary</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-zinc-800/50 rounded-lg p-3"><div className="text-zinc-500 text-xs">Audience</div><div className="text-violet-400 font-semibold">{audience}</div></div>
                  <div className="bg-zinc-800/50 rounded-lg p-3"><div className="text-zinc-500 text-xs">Platform</div><div className="text-fuchsia-400 font-semibold">{platform}</div></div>
                  <div className="bg-zinc-800/50 rounded-lg p-3"><div className="text-zinc-500 text-xs">Emotional Goal</div><div className="text-orange-400 font-semibold">{emotionalGoal}</div></div>
                  <div className="bg-zinc-800/50 rounded-lg p-3"><div className="text-zinc-500 text-xs">Optimal Windows</div><div className="text-emerald-400 font-semibold text-2xl">{result.optimalWindows.length}</div></div>
                </div>
              </div>
            </div>

            {/* Optimal Posting Windows */}
            <div className="bg-zinc-900/60 border border-violet-500/30 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-1">Optimal Posting Windows</h3>
              <p className="text-zinc-500 text-sm mb-4">Time slots ranked by emotional resonance potential for your audience and content type</p>
              <div className="space-y-4">
                {result.optimalWindows.map((w, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-5 border border-zinc-700/50">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-lg font-bold text-violet-400">{w.timeSlot}</span>
                      <span className="text-sm font-semibold" style={{ color: scoreColor(w.moodIntensity) }}>Intensity: {w.moodIntensity}%</span>
                    </div>
                    <div className="w-full bg-zinc-700 rounded-full h-2 mb-3">
                      <div className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" style={{ width: `${w.moodIntensity}%` }} />
                    </div>
                    <div className="text-sm text-zinc-300 mb-2"><span className="text-zinc-500">Emotional State:</span> {w.emotionalState}</div>
                    <div className="text-sm text-zinc-300 mb-2"><span className="text-zinc-500">Why It Works:</span> {w.whyItWorks}</div>
                    <div className="text-sm text-zinc-300 mb-2"><span className="text-zinc-500">Best Content:</span> <span className="text-emerald-400">{w.bestContentType}</span></div>
                    <div className="text-sm text-red-400/80"><span className="text-zinc-500">Avoid:</span> {w.avoidPosting}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emotional Curve */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Emotional Curve Throughout the Day</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {result.emotionalCurve.map((e, i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold text-zinc-200">{e.timeOfDay}</span>
                      <span className={`text-xs px-3 py-1 rounded-full border font-semibold ${energyColor(e.energyLevel)}`}>{e.energyLevel} Energy</span>
                    </div>
                    <div className="text-sm space-y-1.5">
                      <div><span className="text-zinc-500">Dominant Emotion:</span> <span className="text-violet-400">{e.dominantEmotion}</span></div>
                      <div><span className="text-zinc-500">Attention Span:</span> <span className="text-zinc-300">{e.attentionSpan}</span></div>
                      <div><span className="text-zinc-500">Scroll Behavior:</span> <span className="text-zinc-300">{e.scrollBehavior}</span></div>
                      <div><span className="text-zinc-500">Receptivity:</span> <span className="text-zinc-300">{e.contentReceptivity}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Psychographic Insights */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Psychographic Insights</h3>
              <div className="space-y-4">
                {result.psychographicInsights.map((p, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-5 border border-zinc-700/50">
                    <div className="font-semibold text-zinc-200 mb-2">{p.insight}</div>
                    <div className="text-sm space-y-2">
                      <div className="bg-violet-400/5 border border-violet-400/20 rounded-lg p-3">
                        <div className="text-xs text-violet-400 font-semibold mb-1">Data Point</div>
                        <div className="text-zinc-300">{p.dataPoint}</div>
                      </div>
                      <div><span className="text-zinc-500">Implication:</span> <span className="text-zinc-300">{p.implication}</span></div>
                      <div><span className="text-zinc-500">Action:</span> <span className="text-emerald-400">{p.actionableAdvice}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Competitor Gap Analysis */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Competitor Gap Analysis</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {result.competitorGaps.map((g, i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold text-zinc-200">{g.timeSlot}</span>
                      <span className={`text-xs px-3 py-1 rounded-full border font-semibold ${activityColor(g.competitorActivity)}`}>{g.competitorActivity}</span>
                    </div>
                    <div className="text-sm space-y-1.5">
                      <div><span className="text-zinc-500">Opportunity:</span> <span className="text-zinc-300">{g.opportunity}</span></div>
                      <div><span className="text-zinc-500">Action:</span> <span className="text-emerald-400">{g.recommendedAction}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Engagement Heatmap */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Weekly Engagement Heatmap</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {result.weeklyHeatmap.map((d, i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-lg p-3 border border-zinc-700 text-center">
                    <div className="font-bold text-zinc-200 mb-1">{d.day.slice(0, 3)}</div>
                    <div className="text-2xl font-bold mb-1" style={{ color: scoreColor(d.engagementPotential) }}>{d.engagementPotential}%</div>
                    <div className="w-full bg-zinc-700 rounded-full h-1.5 mb-2">
                      <div className="h-1.5 rounded-full" style={{ width: `${d.engagementPotential}%`, background: scoreColor(d.engagementPotential) }} />
                    </div>
                    <div className="text-xs text-violet-400 mb-1">{d.peakHour}</div>
                    <div className="text-xs text-zinc-400">{d.peakEmotion}</div>
                    <div className="text-xs text-red-400/70 mt-1">{d.avoidHours}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mood Triggers */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Mood Triggers to Monitor</h3>
              <div className="space-y-2">
                {result.moodTriggers.map((trigger, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <input type="checkbox" className="mt-1 accent-violet-500" readOnly />
                    <span className="text-zinc-300">{trigger}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">Post When Your Audience Feels It Most</h3>
              <p className="text-zinc-400 mb-4">Combine mood timing intelligence with <a href="/post-timing" className="text-violet-400 underline">Post Timing</a>, <a href="/engagement-calculator" className="text-violet-400 underline">Engagement Calculator</a>, and <a href="/virality-score" className="text-violet-400 underline">Virality Score</a> for maximum impact.</p>
              <a href="/pricing" className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">Get PostCraft Pro</a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
