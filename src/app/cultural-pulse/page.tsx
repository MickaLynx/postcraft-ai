'use client';
import { useState } from 'react';

const niches = ['Tech & Innovation', 'Fashion & Style', 'Health & Biohacking', 'Finance & Investing', 'Sustainability & Climate', 'Food & Gastronomy', 'Gaming & Esports', 'Wellness & Mental Health', 'Creator Economy', 'AI & Automation', 'Gen Z Culture', 'Remote Work & Digital Nomads'] as const;
const platformOptions = ['TikTok', 'Instagram', 'Twitter/X', 'LinkedIn', 'Reddit', 'YouTube', 'Threads', 'Discord'] as const;
const contentGoals = ['Thought Leadership', 'Viral Potential', 'Community Building', 'Brand Differentiation', 'Audience Education', 'Cultural Relevance'] as const;
const timeHorizons = ['Next 2 Weeks', 'Next 30 Days', 'Next Quarter', 'Next 6 Months'] as const;
const brandTones = ['Bold & Provocative', 'Empathetic & Inclusive', 'Data-Driven & Analytical', 'Witty & Irreverent', 'Premium & Aspirational', 'Grassroots & Authentic'] as const;
const regions = ['North America', 'Europe', 'Asia-Pacific', 'Latin America', 'Middle East & Africa', 'Global'] as const;

interface EmergingSignal { signal: string; source: string; momentum: 'Rising Fast' | 'Building' | 'Early Signal'; confidence: number; contentAngle: string; bestFormat: string; }
interface CulturalTension { tension: string; sideA: string; sideB: string; contentOpportunity: string; riskLevel: 'Low' | 'Medium' | 'High'; exampleHook: string; }
interface CrossIndustry { industry1: string; industry2: string; connection: string; contentIdea: string; viralPotential: number; }
interface HistoricalPattern { pattern: string; lastOccurrence: string; prediction: string; confidence: number; actionWindow: string; }
interface RipSheetItem { topic: string; emergingConflict: string; optimalAngle: string; idealFormat: string; urgency: 'Act Now' | 'This Week' | 'This Month' | 'Watch'; hashtags: string[]; }
interface MicroMoment { moment: string; timing: string; platform: string; contentType: string; exampleCaption: string; }
interface CulturalPulseResult {
  pulseScore: number;
  emergingSignals: EmergingSignal[];
  culturalTensions: CulturalTension[];
  crossIndustryConnections: CrossIndustry[];
  historicalPatterns: HistoricalPattern[];
  ripSheet: RipSheetItem[];
  microMoments: MicroMoment[];
  avoidList: string[];
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }
function pick<T>(arr: readonly T[] | T[], seed: number, idx: number = 0): T { return arr[(seed + idx) % arr.length]; }

function generatePulse(niche: string, platform: string, goal: string, horizon: string, tone: string, region: string): CulturalPulseResult {
  const seed = hash(`${niche}-${platform}-${goal}-${horizon}-${tone}-${region}`);
  const pulseScore = 40 + seed % 55;

  const allSignals = [
    'De-influencing 2.0 — creators reviewing what NOT to buy, pivoting to "value audits"',
    'Quiet ambition — rejection of hustle culture in favor of sustainable career growth',
    'AI-assisted creativity backlash — audiences demanding "100% human-made" labels',
    'Micro-community monetization — niche Discord/Telegram groups charging $50+/month',
    'Grief tech — apps and AI tools for processing loss gaining mainstream traction',
    'Dopamine menus — structured daily pleasure planning replacing mindless scrolling',
    'Soft life movement — aspirational content shifting from luxury to peace and ease',
    'Polywork identity — people embracing multiple careers/passions as primary identity',
    'Rage applying — job-switching as protest content going viral across platforms',
    'Climate optimism — solution-focused environmental content outperforming doom narratives',
    'Friendship recession content — loneliness epidemic driving connection-focused communities',
    'Third place revival — content around physical community spaces replacing digital ones',
  ];
  const allSources = ['TikTok subcommunities', 'Reddit r/GenZ + r/millennials', 'Academic papers + Twitter discourse', 'Discord server trends', 'Substack newsletter ecosystem', 'Instagram close-friends stories', 'YouTube long-form commentary', 'Threads early-adopter conversations'];
  const allAngles = [
    'Position your brand as the ethical alternative — lead with transparency',
    'Create a framework/template that helps your audience apply this trend',
    'Document your own brand\'s journey with this shift — behind-the-scenes authenticity',
    'Build a community around this movement — your brand as facilitator, not leader',
    'Use data storytelling to validate what people are feeling but can\'t articulate',
    'Create a counterpoint series — challenge the trend intelligently to spark debate',
  ];
  const allFormats = ['Long-form video essay (8-15 min)', 'Carousel with data + personal stories', 'Thread/text post with hot take + receipts', 'Short-form reaction/stitch series', 'Podcast episode with community voices', 'Interactive poll series leading to pillar content'];

  const momenta: ('Rising Fast' | 'Building' | 'Early Signal')[] = ['Rising Fast', 'Building', 'Early Signal'];
  const emergingSignals: EmergingSignal[] = Array.from({ length: 6 }, (_, i) => ({
    signal: allSignals[(seed + i * 3) % allSignals.length],
    source: allSources[(seed + i * 5) % allSources.length],
    momentum: momenta[i < 2 ? 0 : i < 4 ? 1 : 2],
    confidence: 45 + (seed + i * 7) % 50,
    contentAngle: allAngles[(seed + i * 4) % allAngles.length],
    bestFormat: allFormats[(seed + i * 2) % allFormats.length],
  }));

  const allTensions = [
    'Authenticity vs. Aesthetic — audiences want "real" but still engage more with polished content',
    'AI adoption vs. Human craft — professionals torn between efficiency and artisanal pride',
    'Globalization vs. Local identity — brands scaling internationally while audiences crave local roots',
    'Privacy vs. Personalization — users want tailored experiences but distrust data collection',
    'Hustle culture vs. Rest culture — conflicting aspirational narratives competing for attention',
    'Free content vs. Paid expertise — creators struggling with monetization while audiences expect free',
    'Digital connection vs. Physical presence — remote-first world craving in-person experiences',
    'Optimization vs. Spontaneity — algorithm-driven strategy clashing with organic creativity',
  ];
  const allSideAs = [
    '"Keep it raw and unfiltered — perfection is dead"',
    '"AI tools make me 10x more productive — adapt or die"',
    '"Think global, act local is outdated — think global, BE global"',
    '"I want Netflix-level recommendations for everything in my life"',
    '"Rise and grind — your competition is working while you sleep"',
    '"If it\'s valuable, it should be free — gatekeeping is elitist"',
    '"I can build deep relationships entirely online"',
    '"Every post should be data-optimized for maximum reach"',
  ];
  const allSideBs = [
    '"Curated feeds still win — I follow creators for their aesthetic, not chaos"',
    '"AI-generated content feels hollow — I pay premium for human-made"',
    '"I only buy from brands that understand my local culture and language"',
    '"I deleted all tracking apps — I\'d rather have generic than surveilled"',
    '"Slow living is the new luxury — I optimize for peace, not productivity"',
    '"I happily pay $20/month for expert content that saves me hours"',
    '"Online friends aren\'t real friends — we need third places back"',
    '"My best-performing posts were the unplanned, off-brand ones"',
  ];
  const allOpportunities = [
    'Create a "both/and" narrative — show how your brand bridges this tension instead of picking a side',
    'Survey your audience on where they stand — turn results into viral content + community discussion',
    'Build a content series exploring both perspectives with real stories from your community',
    'Position your brand as the pragmatic middle ground with a unique framework',
    'Create debate-style content that presents both sides — drives massive engagement',
  ];
  const allHooks = [
    '"The uncomfortable truth about [X] that nobody in [industry] wants to admit"',
    '"I tried both sides of [tension] for 30 days. Here\'s what actually happened."',
    '"Your audience is split on [topic]. Here\'s how smart brands are navigating it."',
    '"[Side A] people and [Side B] people are both wrong. Here\'s why."',
    '"The hidden cost of choosing [Side A] over [Side B] — a data deep-dive"',
  ];

  const riskLevels: ('Low' | 'Medium' | 'High')[] = ['Low', 'Medium', 'High'];
  const culturalTensions: CulturalTension[] = Array.from({ length: 5 }, (_, i) => ({
    tension: allTensions[(seed + i * 3) % allTensions.length],
    sideA: allSideAs[(seed + i * 5) % allSideAs.length],
    sideB: allSideBs[(seed + i * 4) % allSideBs.length],
    contentOpportunity: allOpportunities[(seed + i * 2) % allOpportunities.length],
    riskLevel: riskLevels[(seed + i) % riskLevels.length],
    exampleHook: allHooks[(seed + i * 6) % allHooks.length],
  }));

  const ind1 = ['Fashion', 'Healthcare', 'Gaming', 'Finance', 'Food', 'Education', 'Music', 'Sports'];
  const ind2 = ['AI & Tech', 'Sustainability', 'Mental Health', 'Creator Economy', 'Crypto', 'Space Tech', 'Neuroscience', 'Urban Design'];
  const allConnections = [
    'Both industries are experiencing a trust crisis — audiences demanding transparency simultaneously',
    'The "gamification" trend is crossing over — engagement mechanics from one are transforming the other',
    'Sustainability pressure is forcing unexpected collaboration between these two sectors',
    'Creator-led disruption is hitting both industries — incumbents losing to individual voices',
    'AI adoption timeline is nearly identical — content opportunities mirror each other',
  ];
  const allIdeas = [
    'Create a cross-industry trend report comparing adoption curves — first-mover content advantage',
    'Interview creators from both spaces in a "collision" series — unexpected perspectives drive shares',
    'Build a "what [Industry A] can learn from [Industry B]" framework post — high save rate content',
    'Launch a cross-industry community challenge that bridges both audiences — exponential reach',
  ];

  const crossIndustryConnections: CrossIndustry[] = Array.from({ length: 4 }, (_, i) => ({
    industry1: ind1[(seed + i * 3) % ind1.length],
    industry2: ind2[(seed + i * 5) % ind2.length],
    connection: allConnections[(seed + i * 4) % allConnections.length],
    contentIdea: allIdeas[(seed + i * 2) % allIdeas.length],
    viralPotential: 40 + (seed + i * 9) % 55,
  }));

  const allPatterns = [
    'Economic downturn + humor content surge — comedy accounts grow 3x during recessions',
    'Platform algorithm shift → creator migration wave → new platform content gold rush',
    'Major tech layoff cycle → freelance/creator economy content spike → 6-month engagement window',
    'Election year → political fatigue → escapist/comfort content outperforms by 2x',
    'New year resolution cycle → anti-resolution movement → authentic goal-setting content wins',
    'Summer slowdown → B2B thought leadership vacuum → contrarian takes get 4x engagement',
  ];
  const allLastOccurrences = ['Q2 2025', 'Q4 2024', 'Q1 2025', 'Q3 2024', 'Q1 2026', 'Q2 2024'];
  const allPredictions = [
    'Pattern repeating now — content created in next 2-4 weeks will capture peak attention',
    'Early indicators suggest this cycle is starting — prepare content pipeline now',
    'Pattern is 60% likely to repeat — build flexible content that works either way',
    'Strong signal this will intensify — position thought leadership content ahead of the curve',
  ];
  const allWindows = ['Immediate — next 2 weeks', '2-4 weeks from now', 'Next quarter peak', 'Building — 3-6 month runway'];

  const historicalPatterns: HistoricalPattern[] = Array.from({ length: 4 }, (_, i) => ({
    pattern: allPatterns[(seed + i * 3) % allPatterns.length],
    lastOccurrence: allLastOccurrences[(seed + i * 2) % allLastOccurrences.length],
    prediction: allPredictions[(seed + i * 5) % allPredictions.length],
    confidence: 40 + (seed + i * 11) % 50,
    actionWindow: allWindows[(seed + i * 4) % allWindows.length],
  }));

  const allTopics = [
    'The "underconsumption core" movement in ' + niche,
    'AI disclosure fatigue — audiences tuning out "made with AI" labels',
    'Community-owned brands disrupting traditional ' + niche + ' companies',
    'The "boring phone" trend — digital minimalism hitting mainstream',
    'Micro-credentialing replacing traditional expertise in ' + niche,
    'Loneliness economy — products and content filling the social void',
    '"Loud budgeting" — financial transparency as social currency',
    'Post-algorithm content — creators optimizing for depth over reach',
  ];
  const allConflicts = [
    'Early adopters vs. mainstream skeptics — the conversation is splitting',
    'Brands co-opting the movement vs. authentic practitioners pushing back',
    'Platform policies lagging behind creator innovation — tension escalating',
    'Generational divide intensifying — Gen Z and Boomers in direct opposition',
    'Global movement meeting local resistance — cultural friction creating content opportunities',
    'Industry incumbents dismissing the trend while startups ride it to growth',
  ];
  const allOptimalAngles = [
    'Be the explainer — most people have heard of this but don\'t understand the nuance',
    'Take a contrarian but data-backed position — the hot take that\'s actually substantiated',
    'Document your brand\'s real-time adoption — authenticity over expertise',
    'Amplify community voices — curate perspectives rather than adding another opinion',
    'Build a practical toolkit/framework — move from theory to action',
    'Create the definitive comparison — help people make informed decisions',
  ];
  const allIdealFormats = ['TikTok series (3-5 parts, 90s each)', 'LinkedIn carousel with data', 'Twitter/X thread with real examples', 'YouTube deep-dive (10-15 min)', 'Instagram Reels + carousel combo', 'Newsletter deep-dive + social snippets'];
  const urgencies: ('Act Now' | 'This Week' | 'This Month' | 'Watch')[] = ['Act Now', 'This Week', 'This Month', 'Watch'];
  const allHashtagSets = [
    ['#underconsumption', '#minimalism', '#intentionalliving', '#lessismore'],
    ['#AIcontent', '#humanmade', '#authenticity', '#creatoreconomy'],
    ['#communityowned', '#brandbuilding', '#disruptors', '#futureofbusiness'],
    ['#digitalminimalism', '#boringphone', '#touchgrass', '#screendetox'],
    ['#microcredentials', '#futureofwork', '#skillsbased', '#learnontiktok'],
    ['#lonelinessepidemic', '#connection', '#thirdplace', '#community'],
    ['#loudbudgeting', '#moneytok', '#financialfreedom', '#transparentliving'],
    ['#postalgorithm', '#slowcontent', '#depthoverreach', '#qualityoverquantity'],
  ];

  const ripSheet: RipSheetItem[] = Array.from({ length: 6 }, (_, i) => ({
    topic: allTopics[(seed + i * 3) % allTopics.length],
    emergingConflict: allConflicts[(seed + i * 5) % allConflicts.length],
    optimalAngle: allOptimalAngles[(seed + i * 4) % allOptimalAngles.length],
    idealFormat: allIdealFormats[(seed + i * 2) % allIdealFormats.length],
    urgency: urgencies[i < 1 ? 0 : i < 3 ? 1 : i < 5 ? 2 : 3],
    hashtags: allHashtagSets[(seed + i * 6) % allHashtagSets.length],
  }));

  const allMoments = [
    'Monday morning scroll — audiences seeking motivation and fresh perspective',
    'Lunch break discovery — 12-1pm peak for snackable, shareable content',
    'Wednesday mid-week slump — relatable content about fatigue outperforms',
    'Friday celebration energy — aspirational and feel-good content peaks',
    'Sunday evening planning — audiences preparing for the week ahead',
    'Late night scroll (11pm-1am) — vulnerable, authentic content resonates most',
    'Post-news-cycle reaction window — 2-4 hours after major events',
  ];
  const allTimings = ['Monday 7-9 AM', 'Tuesday-Thursday 12-1 PM', 'Wednesday 3-5 PM', 'Friday 5-7 PM', 'Sunday 7-9 PM', 'Daily 11 PM-1 AM', 'Event-triggered (within 4 hours)'];
  const allContentTypes = ['Motivational carousel', 'Quick-hit video (30-60s)', 'Meme/relatable reel', 'Aspirational photo + story', 'Planning framework post', 'Raw/vulnerable text post', 'Hot take reaction thread'];
  const allCaptions = [
    '"New week, new opportunity to [niche-specific goal]. Here\'s the framework I\'m using this week..."',
    '"3 things I learned about [topic] this week that changed my approach (save this)..."',
    '"Tell me you\'re in [niche] without telling me you\'re in [niche]. I\'ll go first..."',
    '"This is your sign to [aspirational action]. Here\'s exactly how to start..."',
    '"Mapping out next week. Steal my content planning framework..."',
    '"2 AM thought: what if everything we know about [topic] is wrong? Here\'s what I mean..."',
    '"[News event] just happened. Here\'s what it means for [niche] and what to do about it..."',
  ];

  const microMoments: MicroMoment[] = Array.from({ length: 5 }, (_, i) => ({
    moment: allMoments[(seed + i * 3) % allMoments.length],
    timing: allTimings[(seed + i * 4) % allTimings.length],
    platform: pick(platformOptions, seed, i),
    contentType: allContentTypes[(seed + i * 5) % allContentTypes.length],
    exampleCaption: allCaptions[(seed + i * 2) % allCaptions.length],
  }));

  const avoidList = [
    `"Hot take" threads with no original insight — audiences are fatigued by contrarianism for its own sake`,
    `Jumping on tragedies or crises for engagement — the backlash cycle is now under 2 hours`,
    `"Day in my life" content without a unique angle — format is oversaturated by 400%`,
    `AI-generated content without human editing — audiences can detect it and engagement drops 60%`,
    `Hustle porn / "sigma grindset" content — cultural tide has turned definitively against this`,
    `Fake vulnerability / trauma dumping for engagement — audiences now call this out instantly`,
    `Overusing trending audio without relevance to your niche — algorithm is deprioritizing this`,
    `"Reply with [emoji] if you agree" engagement bait — platforms are actively suppressing it`,
  ];

  return { pulseScore, emergingSignals, culturalTensions, crossIndustryConnections, historicalPatterns, ripSheet, microMoments, avoidList };
}

export default function CulturalPulsePage() {
  const [niche, setNiche] = useState(niches[0]);
  const [platform, setPlatform] = useState(platformOptions[0]);
  const [goal, setGoal] = useState(contentGoals[0]);
  const [horizon, setHorizon] = useState(timeHorizons[0]);
  const [tone, setTone] = useState(brandTones[0]);
  const [region, setRegion] = useState(regions[0]);
  const [result, setResult] = useState<CulturalPulseResult | null>(null);

  const handleGenerate = () => setResult(generatePulse(niche, platform, goal, horizon, tone, region));

  const urgencyColor = (u: string) => u === 'Act Now' ? 'text-red-400 bg-red-400/10 border-red-400/30' : u === 'This Week' ? 'text-orange-400 bg-orange-400/10 border-orange-400/30' : u === 'This Month' ? 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30' : 'text-blue-400 bg-blue-400/10 border-blue-400/30';
  const momentumColor = (m: string) => m === 'Rising Fast' ? 'text-red-400' : m === 'Building' ? 'text-yellow-400' : 'text-blue-400';
  const riskColor = (r: string) => r === 'High' ? 'text-red-400' : r === 'Medium' ? 'text-yellow-400' : 'text-emerald-400';
  const scoreColor = (n: number) => n > 75 ? '#34d399' : n > 55 ? '#fbbf24' : n > 35 ? '#fb923c' : '#f87171';

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Cultural Pulse — Emerging Trend Intelligence</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Stop following trends. Start anticipating culture. Discover emerging signals, unaddressed tensions, and untapped content opportunities before your competitors.</p>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {([
            { label: 'Niche', value: niche, setter: setNiche as (v: string) => void, options: niches as readonly string[] },
            { label: 'Platform', value: platform, setter: setPlatform as (v: string) => void, options: platformOptions as readonly string[] },
            { label: 'Content Goal', value: goal, setter: setGoal as (v: string) => void, options: contentGoals as readonly string[] },
            { label: 'Time Horizon', value: horizon, setter: setHorizon as (v: string) => void, options: timeHorizons as readonly string[] },
            { label: 'Brand Tone', value: tone, setter: setTone as (v: string) => void, options: brandTones as readonly string[] },
            { label: 'Region', value: region, setter: setRegion as (v: string) => void, options: regions as readonly string[] },
          ] as const).map(({ label, value, setter, options }) => (
            <div key={label}>
              <label className="block text-sm text-zinc-400 mb-1">{label}</label>
              <select value={value} onChange={e => setter(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100">
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
        <button onClick={handleGenerate} className="w-full md:w-auto bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded font-semibold hover:opacity-90 transition mb-8">Generate Cultural Pulse</button>

        {result && (
          <div className="space-y-8">
            {/* Pulse Score + Quick Stats */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 text-center">
                <div className="text-6xl font-bold mb-2" style={{ color: scoreColor(result.pulseScore) }}>{result.pulseScore}</div>
                <div className="text-zinc-400 mb-1">Cultural Pulse Score</div>
                <div className="mt-3 w-full bg-zinc-800 rounded-full h-3">
                  <div className="h-3 rounded-full transition-all" style={{ width: `${result.pulseScore}%`, background: scoreColor(result.pulseScore) }} />
                </div>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3">Pulse Summary</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-zinc-800/50 rounded-lg p-3 text-center"><div className="text-2xl font-bold text-violet-400">{result.emergingSignals.length}</div><div className="text-zinc-500">Signals Found</div></div>
                  <div className="bg-zinc-800/50 rounded-lg p-3 text-center"><div className="text-2xl font-bold text-fuchsia-400">{result.culturalTensions.length}</div><div className="text-zinc-500">Tensions Mapped</div></div>
                  <div className="bg-zinc-800/50 rounded-lg p-3 text-center"><div className="text-2xl font-bold text-orange-400">{result.ripSheet.filter(r => r.urgency === 'Act Now' || r.urgency === 'This Week').length}</div><div className="text-zinc-500">Urgent Topics</div></div>
                  <div className="bg-zinc-800/50 rounded-lg p-3 text-center"><div className="text-2xl font-bold text-emerald-400">{result.microMoments.length}</div><div className="text-zinc-500">Micro-Moments</div></div>
                </div>
              </div>
            </div>

            {/* Rip-Sheet — Main Output */}
            <div className="bg-zinc-900/60 border border-violet-500/30 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-1">Cultural Rip-Sheet</h3>
              <p className="text-zinc-500 text-sm mb-4">Your actionable cultural intelligence dossier — prioritized by urgency</p>
              <div className="space-y-4">
                {result.ripSheet.map((r, i) => (
                  <div key={i} className={`border rounded-lg p-5 ${urgencyColor(r.urgency)}`}>
                    <div className="flex justify-between items-start mb-3">
                      <span className="font-bold text-lg">{r.topic}</span>
                      <span className={`text-xs px-3 py-1 rounded-full border font-semibold ${urgencyColor(r.urgency)}`}>{r.urgency}</span>
                    </div>
                    <div className="text-sm opacity-90 space-y-2">
                      <div><strong>Emerging Conflict:</strong> {r.emergingConflict}</div>
                      <div><strong>Optimal Angle:</strong> {r.optimalAngle}</div>
                      <div><strong>Ideal Format:</strong> {r.idealFormat}</div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {r.hashtags.map((h, hi) => <span key={hi} className="text-xs bg-zinc-800/80 text-violet-400 px-2 py-1 rounded font-mono">{h}</span>)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emerging Signals */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Emerging Signals ({result.emergingSignals.length})</h3>
              <div className="space-y-3">
                {result.emergingSignals.map((s, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold text-zinc-200">{s.signal}</span>
                      <span className={`text-xs font-semibold ${momentumColor(s.momentum)}`}>{s.momentum}</span>
                    </div>
                    <div className="w-full bg-zinc-700 rounded-full h-1.5 mb-3">
                      <div className="h-1.5 rounded-full bg-violet-500" style={{ width: `${s.confidence}%` }} />
                    </div>
                    <div className="text-sm text-zinc-400 space-y-1">
                      <div><span className="text-zinc-500">Source:</span> {s.source}</div>
                      <div><span className="text-zinc-500">Content Angle:</span> {s.contentAngle}</div>
                      <div><span className="text-zinc-500">Best Format:</span> <span className="text-violet-400">{s.bestFormat}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cultural Tensions */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Cultural Tensions</h3>
              <div className="space-y-4">
                {result.culturalTensions.map((t, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-5 border border-zinc-700/50">
                    <div className="flex justify-between items-start mb-3">
                      <span className="font-bold text-zinc-200">{t.tension}</span>
                      <span className={`text-xs font-semibold ${riskColor(t.riskLevel)}`}>{t.riskLevel} Risk</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3 mb-3">
                      <div className="bg-emerald-400/5 border border-emerald-400/20 rounded-lg p-3">
                        <div className="text-xs text-emerald-400 font-semibold mb-1">Side A</div>
                        <div className="text-sm text-zinc-300">{t.sideA}</div>
                      </div>
                      <div className="bg-fuchsia-400/5 border border-fuchsia-400/20 rounded-lg p-3">
                        <div className="text-xs text-fuchsia-400 font-semibold mb-1">Side B</div>
                        <div className="text-sm text-zinc-300">{t.sideB}</div>
                      </div>
                    </div>
                    <div className="text-sm space-y-1">
                      <div><span className="text-zinc-500">Content Opportunity:</span> <span className="text-zinc-300">{t.contentOpportunity}</span></div>
                      <div><span className="text-zinc-500">Example Hook:</span> <span className="text-violet-400">{t.exampleHook}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cross-Industry */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Cross-Industry Connections</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {result.crossIndustryConnections.map((c, i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-violet-400 font-semibold">{c.industry1}</span>
                      <span className="text-zinc-600">x</span>
                      <span className="text-fuchsia-400 font-semibold">{c.industry2}</span>
                    </div>
                    <div className="text-sm text-zinc-400 space-y-2">
                      <div>{c.connection}</div>
                      <div><span className="text-zinc-500">Content Idea:</span> <span className="text-zinc-300">{c.contentIdea}</span></div>
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-500">Viral Potential:</span>
                        <div className="flex-1 bg-zinc-700 rounded-full h-2">
                          <div className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" style={{ width: `${c.viralPotential}%` }} />
                        </div>
                        <span className="text-xs font-bold" style={{ color: scoreColor(c.viralPotential) }}>{c.viralPotential}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Historical Patterns */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Historical Pattern Projections</h3>
              <div className="space-y-3">
                {result.historicalPatterns.map((p, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="font-semibold text-zinc-200 mb-2">{p.pattern}</div>
                    <div className="grid md:grid-cols-4 gap-3 text-sm">
                      <div><span className="text-zinc-500">Last:</span> <span className="text-zinc-400">{p.lastOccurrence}</span></div>
                      <div><span className="text-zinc-500">Confidence:</span> <span className="font-bold" style={{ color: scoreColor(p.confidence) }}>{p.confidence}%</span></div>
                      <div className="md:col-span-2"><span className="text-zinc-500">Window:</span> <span className="text-orange-400">{p.actionWindow}</span></div>
                    </div>
                    <div className="text-sm text-zinc-400 mt-2">{p.prediction}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Micro-Moments */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Micro-Moment Opportunities</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {result.microMoments.map((m, i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700">
                    <div className="font-semibold text-zinc-200 mb-1">{m.moment}</div>
                    <div className="text-sm space-y-1">
                      <div><span className="text-zinc-500">When:</span> <span className="text-orange-400">{m.timing}</span></div>
                      <div><span className="text-zinc-500">Platform:</span> <span className="text-violet-400">{m.platform}</span></div>
                      <div><span className="text-zinc-500">Format:</span> <span className="text-zinc-300">{m.contentType}</span></div>
                      <div className="text-zinc-500 italic mt-1">{m.exampleCaption}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Avoid List */}
            <div className="bg-red-400/5 border border-red-400/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-red-400">Topics & Approaches to Avoid</h3>
              <div className="space-y-2">
                {result.avoidList.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <span className="text-red-400 mt-0.5 font-bold">x</span>
                    <span className="text-zinc-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">Stay Ahead of the Cultural Curve</h3>
              <p className="text-zinc-400 mb-4">Use PostCraft AI to turn cultural intelligence into viral content. Pair with <a href="/trend-predictor" className="text-violet-400 underline">Trend Predictor</a>, <a href="/topic-miner" className="text-violet-400 underline">Topic Miner</a>, and <a href="/algorithm-tracker" className="text-violet-400 underline">Algorithm Tracker</a>.</p>
              <a href="/pricing" className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">Get PostCraft Pro</a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
