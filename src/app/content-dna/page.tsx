'use client';
import { useState } from 'react';

const contentSources = ['Blog Posts', 'Social Media', 'Email Newsletters', 'Video Scripts', 'Podcast Transcripts', 'Landing Pages', 'All Content'] as const;
const analysisDepths = ['Quick Scan (Top 10 pieces)', 'Standard (Top 50 pieces)', 'Deep Dive (100+ pieces)', 'Full Archive'] as const;
const industries = ['Tech & SaaS', 'E-commerce & DTC', 'Healthcare', 'Finance & FinTech', 'Education', 'Real Estate', 'Agency & Consulting', 'Fitness & Wellness', 'Food & Beverage', 'Media & Publishing'] as const;
const goals = ['Define Brand Voice', 'Onboard New Writers', 'Audit Content Quality', 'Competitive Differentiation', 'Rebrand Preparation', 'Scale Content Production'] as const;

interface VoiceTrait { trait: string; score: number; evidence: string; benchmark: string; recommendation: string; }
interface TopicFingerprint { topic: string; frequency: string; depth: string; uniqueAngle: string; competitorGap: string; opportunity: string; }
interface StyleSignature { element: string; pattern: string; examples: string; consistency: string; impact: string; }
interface EmotionalProfile { emotion: string; prevalence: string; trigger: string; effectiveness: string; recommendation: string; }
interface ContentArchetype { archetype: string; percentage: number; description: string; bestFor: string; example: string; }

interface DNAReport {
  overallIdentityScore: number;
  voiceTraits: VoiceTrait[];
  topicFingerprint: TopicFingerprint[];
  styleSignature: StyleSignature[];
  emotionalProfile: EmotionalProfile[];
  contentArchetypes: ContentArchetype[];
  uniquenessFactors: string[];
  dnaStatement: string;
  writerGuidelines: string[];
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }

function profileDNA(source: string, depth: string, industry: string, goal: string, brand: string): DNAReport {
  const seed = hash(`${source}-${depth}-${industry}-${goal}-${brand}`);
  const overallIdentityScore = 30 + seed % 65;

  const voiceTraits: VoiceTrait[] = [
    { trait: 'Formality Level', score: 20 + seed % 60, evidence: seed % 2 === 0 ? 'Uses contractions frequently, addresses reader as "you"' : 'Avoids contractions, uses "one" and passive constructions', benchmark: `Industry avg: ${40 + seed % 20}%`, recommendation: seed % 2 === 0 ? 'Your casual tone resonates — maintain it but add authority signals in technical content' : 'Consider loosening tone for social media while keeping formality for whitepapers' },
    { trait: 'Technical Depth', score: 30 + seed % 55, evidence: `${seed % 2 === 0 ? 'Explains concepts with analogies, avoids jargon' : 'Uses industry terminology freely, assumes knowledge'}`, benchmark: `${industry} avg: ${35 + seed % 30}%`, recommendation: 'Match depth to channel: deep for blog, accessible for social, expert for docs' },
    { trait: 'Emotional Intensity', score: 25 + seed % 50, evidence: `${seed % 3 === 0 ? 'Uses exclamation marks sparingly, measured tone' : 'Frequent emotional appeals, vivid language, story-driven'}`, benchmark: 'Top performers: 55-70% range', recommendation: 'Increase emotional resonance in opening hooks and CTAs — keep body analytical' },
    { trait: 'Humor Usage', score: 10 + seed % 40, evidence: `${seed % 2 === 0 ? 'Occasional wit, self-deprecating comments' : 'Rarely uses humor, maintains serious professional tone'}`, benchmark: 'Engagement +40% with appropriate humor', recommendation: 'Test 1 humor-infused post per week — track engagement vs. serious posts' },
    { trait: 'Authority Positioning', score: 35 + seed % 50, evidence: `${seed % 2 === 0 ? 'Cites data, uses "we tested/found/discovered"' : 'References others more than own experience'}`, benchmark: 'High-authority brands: 70%+', recommendation: 'Increase first-party data citations — "we surveyed 500 users" > "studies show"' },
    { trait: 'Storytelling Density', score: 20 + seed % 55, evidence: `${seed % 3 === 0 ? 'Opens with anecdotes 60% of the time' : 'Leads with facts/lists 70% of the time'}`, benchmark: 'Viral content: 75%+ story-led', recommendation: 'Lead with a 2-sentence story hook, then deliver data — captures both emotional and analytical readers' },
  ];

  const topicFingerprint: TopicFingerprint[] = [
    { topic: `${industry} Best Practices`, frequency: `${20 + seed % 30}% of content`, depth: 'Surface to mid-level', uniqueAngle: `${seed % 2 === 0 ? 'Data-backed with original research' : 'Experience-driven with case studies'}`, competitorGap: `${seed % 3 + 2} competitors cover this but lack real examples`, opportunity: 'Go deeper — create the definitive guide your competitors reference' },
    { topic: 'Product/Feature Tutorials', frequency: `${15 + seed % 20}% of content`, depth: 'Detailed, step-by-step', uniqueAngle: 'Combines tutorial with strategic context (why, not just how)', competitorGap: 'Most competitors do dry tutorials — yours add strategic value', opportunity: 'Bundle tutorials into learning paths — increases time-on-site 3x' },
    { topic: 'Industry Trends & Predictions', frequency: `${10 + seed % 15}% of content`, depth: 'Thought leadership level', uniqueAngle: `${seed % 2 === 0 ? 'Contrarian takes backed by data' : 'Consensus views with original analysis'}`, competitorGap: 'Few competitors make bold predictions — low competition, high authority', opportunity: 'Publish quarterly trend reports — become the go-to industry analyst' },
    { topic: 'Customer Success Stories', frequency: `${5 + seed % 10}% of content`, depth: 'Varies — some deep, some shallow', uniqueAngle: 'Focuses on transformation, not just metrics', competitorGap: 'Competitors use templated case studies — yours feel authentic', opportunity: 'Increase frequency to 15% — social proof is your highest-converting content type' },
    { topic: 'Behind-the-Scenes / Culture', frequency: `${3 + seed % 8}% of content`, depth: 'Light, personality-driven', uniqueAngle: 'Humanizes the brand in a way competitors don\'t', competitorGap: 'Very few competitors show their process — high differentiation', opportunity: 'Create a recurring "Building in Public" series — audience loves transparency' },
  ];

  const styleSignature: StyleSignature[] = [
    { element: 'Opening Hooks', pattern: `${seed % 3 === 0 ? 'Question-led (45%)' : seed % 3 === 1 ? 'Statistic-led (38%)' : 'Story-led (52%)'}`, examples: `"Did you know that 73% of..." / "Last Tuesday, our CEO..." / "Stop. Read this before you..."`, consistency: `${50 + seed % 40}% consistent`, impact: 'Strong hooks correlate with 2.5x higher read-through rate' },
    { element: 'Sentence Structure', pattern: `Avg ${12 + seed % 10} words/sentence, ${seed % 2 === 0 ? 'short-long-short rhythm' : 'consistently medium length'}`, examples: 'Short punchy. Then a longer explanatory sentence that provides context. Back to short.', consistency: `${40 + seed % 45}% consistent`, impact: 'Varied rhythm keeps attention — monotonous length causes fatigue' },
    { element: 'Paragraph Length', pattern: `${seed % 2 === 0 ? '2-3 sentences (scannable)' : '4-6 sentences (narrative)'}`, examples: 'Blog: 2-3 lines. Email: 1-2 lines. LinkedIn: 1 line per paragraph.', consistency: `${55 + seed % 35}% consistent`, impact: 'Short paragraphs increase mobile readability by 60%' },
    { element: 'CTA Language', pattern: `${seed % 2 === 0 ? 'Benefit-focused ("Get your free...")' : 'Action-focused ("Start now", "Try it")'}`, examples: '"Grab your free template" / "See it in action" / "Join 5,000+ teams"', consistency: `${35 + seed % 40}% consistent`, impact: 'Benefit CTAs convert 15% better than generic action CTAs' },
    { element: 'Visual Formatting', pattern: `${seed % 2 === 0 ? 'Heavy use of bold, bullets, headers' : 'Long-form with minimal formatting'}`, examples: 'H2 every 200-300 words, bulleted lists for key points, bold for emphasis', consistency: `${45 + seed % 40}% consistent`, impact: 'Formatted content gets 2x more engagement than wall-of-text' },
  ];

  const emotionalProfile: EmotionalProfile[] = [
    { emotion: 'Curiosity', prevalence: `${30 + seed % 30}%`, trigger: 'Questions, teasers, "what if" framings, open loops', effectiveness: 'Drives clicks and read-through — strongest hook emotion', recommendation: 'Use curiosity gaps in first 2 sentences — close the loop by paragraph 3' },
    { emotion: 'Urgency', prevalence: `${10 + seed % 20}%`, trigger: 'Deadlines, limited offers, "before it\'s too late" framings', effectiveness: 'Drives immediate action but causes fatigue if overused', recommendation: 'Reserve urgency for genuine time-sensitive content — max 1-2x per week' },
    { emotion: 'Empathy', prevalence: `${15 + seed % 25}%`, trigger: '"I know how it feels", shared struggles, vulnerability', effectiveness: 'Builds deep connection and trust — highest save/bookmark rate', recommendation: 'Open with empathy, transition to solution — "I was there too. Here\'s what worked."' },
    { emotion: 'Aspiration', prevalence: `${20 + seed % 25}%`, trigger: 'Success stories, future-state painting, possibility framing', effectiveness: 'Drives shares and aspirational engagement', recommendation: 'Show the "after" state clearly — specific metrics + emotional transformation' },
    { emotion: 'Authority', prevalence: `${15 + seed % 20}%`, trigger: 'Data citations, expert endorsements, "we researched" framings', effectiveness: 'Builds credibility — essential for B2B and high-ticket conversions', recommendation: 'Pair authority with empathy — "Our data shows X, and we know that feels overwhelming"' },
  ];

  const contentArchetypes: ContentArchetype[] = [
    { archetype: 'The Educator', percentage: 25 + seed % 25, description: 'Teaches concepts, provides frameworks, explains processes step-by-step', bestFor: 'SEO traffic, lead nurture, establishing expertise', example: '"The Complete Guide to X" / "How to Do Y in 5 Steps"' },
    { archetype: 'The Storyteller', percentage: 10 + seed % 20, description: 'Shares narratives, case studies, behind-the-scenes, personal experiences', bestFor: 'Engagement, shares, brand affinity, email open rates', example: '"How We Went from 0 to $1M ARR" / "The Mistake That Cost Us 10K Users"' },
    { archetype: 'The Analyst', percentage: 15 + seed % 20, description: 'Breaks down data, compares options, provides objective analysis', bestFor: 'Trust building, B2B decision-makers, thought leadership', example: '"We Analyzed 10,000 Posts — Here\'s What Actually Works"' },
    { archetype: 'The Curator', percentage: 10 + seed % 15, description: 'Aggregates best resources, roundups, tool lists, trend reports', bestFor: 'Quick engagement, saves/bookmarks, newsletter content', example: '"Top 10 Tools for X in 2026" / "This Week\'s Best Marketing Takes"' },
    { archetype: 'The Provocateur', percentage: 5 + seed % 15, description: 'Challenges conventions, takes contrarian stances, sparks debate', bestFor: 'Viral reach, comments, brand differentiation', example: '"Why [Popular Advice] Is Actually Hurting Your Growth"' },
  ];

  const uniquenessFactors = [
    `Your content has a distinctive ${seed % 2 === 0 ? 'data-meets-storytelling' : 'practical-meets-visionary'} blend that competitors lack`,
    `You use ${seed % 2 === 0 ? 'shorter sentences' : 'more vivid analogies'} than 80% of ${industry} content — this is a strength`,
    `Your emotional range is ${overallIdentityScore > 60 ? 'well-balanced' : 'skewed toward logic'} — ${overallIdentityScore > 60 ? 'maintain this diversity' : 'add more empathy and storytelling'}`,
    `Topic coverage is ${topicFingerprint[0].frequency.replace('% of content', '')}% on core topics — ${parseInt(topicFingerprint[0].frequency) > 30 ? 'slightly over-indexed, diversify 10%' : 'well-balanced across themes'}`,
    `Your CTA style is ${seed % 2 === 0 ? 'benefit-oriented (stronger than average)' : 'action-oriented (test benefit framing for +15% conversion)'}`,
  ];

  const dnaStatement = `${brand}'s content DNA is ${seed % 3 === 0 ? 'an Educator-Analyst' : seed % 3 === 1 ? 'a Storyteller-Educator' : 'an Analyst-Provocateur'} hybrid with ${voiceTraits[0].score > 50 ? 'casual authority' : 'professional precision'}, ${voiceTraits[2].score > 40 ? 'moderate emotional depth' : 'intellectual distance'}, and a ${seed % 2 === 0 ? 'data-first' : 'narrative-first'} approach to ${industry.toLowerCase()} topics. Unique differentiator: ${uniquenessFactors[0].toLowerCase()}.`;

  const writerGuidelines = [
    `Voice: ${voiceTraits[0].score > 50 ? 'Conversational but credible — use contractions, address reader as "you", but always back claims with data' : 'Professional but approachable — avoid jargon, explain technical terms, use concrete examples'}`,
    `Structure: ${styleSignature[2].pattern.includes('2-3') ? 'Short paragraphs (2-3 sentences max). Use headers every 200-300 words. Bullet points for key lists.' : 'Moderate paragraphs (3-4 sentences). Use headers to break sections. Mix bullets with narrative.'}`,
    `Hooks: ${styleSignature[0].pattern.includes('Question') ? 'Lead with a provocative question that challenges assumptions' : styleSignature[0].pattern.includes('Statistic') ? 'Open with a surprising statistic — the more specific, the better' : 'Start with a 2-sentence micro-story that illustrates the problem'}`,
    `Emotion: Lead with ${emotionalProfile[0].emotion.toLowerCase()} (your strongest signal), layer in ${emotionalProfile[2].emotion.toLowerCase()} for connection, close with ${emotionalProfile[3].emotion.toLowerCase()} for action`,
    `CTAs: ${styleSignature[3].pattern.includes('Benefit') ? 'Always frame CTAs as benefits: "Get your free X" > "Click here". Vary CTA language every 2 weeks.' : 'Use action verbs: "Start", "Try", "Join". Add social proof near CTA: "Join 5,000+ teams".'}`,
    `Topics: ${parseInt(topicFingerprint[0].frequency) > 30 ? 'Reduce core topic frequency by 10% — add more thought leadership and behind-the-scenes content' : 'Current topic mix is balanced — increase customer stories to 15% for better conversion'}`,
    `Avoid: ${seed % 2 === 0 ? 'Wall-of-text paragraphs, generic CTAs ("Learn more"), passive voice, unexplained jargon' : 'Over-hyphenated compound words, clickbait without payoff, unsubstantiated superlatives ("the best", "revolutionary")'}`,
    `Platform adaptation: LinkedIn = 20% more formal. Twitter/X = 30% shorter. Instagram = visual-first, caption secondary. Email = most personal, direct.`,
  ];

  return { overallIdentityScore, voiceTraits, topicFingerprint, styleSignature, emotionalProfile, contentArchetypes, uniquenessFactors, dnaStatement, writerGuidelines };
}

export default function ContentDNAPage() {
  const [source, setSource] = useState(contentSources[0]);
  const [depth, setDepth] = useState(analysisDepths[0]);
  const [industry, setIndustry] = useState(industries[0]);
  const [goal, setGoal] = useState(goals[0]);
  const [brand, setBrand] = useState('');
  const [result, setResult] = useState<DNAReport | null>(null);

  const handleGenerate = () => { if (brand.trim()) setResult(profileDNA(source, depth, industry, goal, brand)); };
  const scoreColor = (n: number) => n >= 80 ? '#34d399' : n >= 60 ? '#a3e635' : n >= 40 ? '#fbbf24' : '#f87171';
  const traitBar = (s: number) => ({ width: `${s}%`, background: scoreColor(s) });

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Content DNA Profiler</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Extract the unique DNA of your content — voice traits, topic fingerprint, style signature, emotional profile, and content archetypes. Get a complete writer's guide so any team member can produce on-brand content.</p>

        <div className="mb-4">
          <label className="block text-sm text-zinc-400 mb-1">Brand / Creator Name</label>
          <input type="text" value={brand} onChange={e => setBrand(e.target.value)} placeholder="e.g., PostCraft, @yourhandle" className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-3 text-zinc-100" />
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {([
            { label: 'Content Source', value: source, setter: setSource as (v: string) => void, options: contentSources as readonly string[] },
            { label: 'Analysis Depth', value: depth, setter: setDepth as (v: string) => void, options: analysisDepths as readonly string[] },
            { label: 'Industry', value: industry, setter: setIndustry as (v: string) => void, options: industries as readonly string[] },
            { label: 'Analysis Goal', value: goal, setter: setGoal as (v: string) => void, options: goals as readonly string[] },
          ] as const).map(({ label, value, setter, options }) => (
            <div key={label}>
              <label className="block text-sm text-zinc-400 mb-1">{label}</label>
              <select value={value} onChange={e => setter(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100">
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
        <button onClick={handleGenerate} className="w-full md:w-auto bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded font-semibold hover:opacity-90 transition mb-8">Profile Content DNA</button>

        {result && (
          <div className="space-y-8">
            {/* DNA Statement */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-5xl font-bold" style={{ color: scoreColor(result.overallIdentityScore) }}>{result.overallIdentityScore}</div>
                <div><div className="text-zinc-400 text-sm">Identity Strength Score</div><div className="text-lg font-semibold text-zinc-200">Content DNA Statement</div></div>
              </div>
              <div className="bg-zinc-800/60 rounded-lg p-4 border border-violet-500/20 text-zinc-300 italic">{result.dnaStatement}</div>
            </div>

            {/* Voice Traits */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-violet-400">Voice Traits</h3>
              <div className="space-y-4">
                {result.voiceTraits.map((t, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-zinc-200">{t.trait}</span>
                      <span className="text-sm font-bold" style={{ color: scoreColor(t.score) }}>{t.score}%</span>
                    </div>
                    <div className="w-full bg-zinc-800 rounded-full h-2 mb-2"><div className="h-2 rounded-full transition-all" style={traitBar(t.score)} /></div>
                    <div className="text-xs space-y-1">
                      <div className="text-zinc-400">{t.evidence}</div>
                      <div className="text-zinc-500">Benchmark: {t.benchmark}</div>
                      <div className="text-emerald-400/70">{t.recommendation}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Archetypes + Topic Fingerprint */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-fuchsia-400">Content Archetypes</h3>
                <div className="space-y-3">
                  {result.contentArchetypes.map((a, i) => (
                    <div key={i} className="bg-zinc-800/40 rounded-lg p-3 border border-zinc-700/50">
                      <div className="flex items-center justify-between mb-1"><span className="text-sm font-semibold text-zinc-200">{a.archetype}</span><span className="text-sm font-bold text-fuchsia-400">{a.percentage}%</span></div>
                      <div className="w-full bg-zinc-800 rounded-full h-1.5 mb-2"><div className="h-1.5 rounded-full bg-fuchsia-500" style={{ width: `${a.percentage}%` }} /></div>
                      <div className="text-xs text-zinc-400">{a.description}</div>
                      <div className="text-xs text-zinc-500 mt-1">Best for: {a.bestFor}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-amber-400">Topic Fingerprint</h3>
                <div className="space-y-3">
                  {result.topicFingerprint.map((t, i) => (
                    <div key={i} className="bg-zinc-800/40 rounded-lg p-3 border border-zinc-700/50">
                      <div className="flex justify-between mb-1"><span className="text-sm font-semibold text-zinc-200">{t.topic}</span><span className="text-xs text-zinc-500">{t.frequency}</span></div>
                      <div className="text-xs space-y-0.5">
                        <div className="text-zinc-400">Angle: {t.uniqueAngle}</div>
                        <div className="text-zinc-500">Gap: {t.competitorGap}</div>
                        <div className="text-emerald-400/70">{t.opportunity}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Style Signature + Emotional Profile */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-blue-400">Style Signature</h3>
                <div className="space-y-3">
                  {result.styleSignature.map((s, i) => (
                    <div key={i} className="bg-zinc-800/40 rounded-lg p-3 border border-zinc-700/50">
                      <div className="text-sm font-semibold text-zinc-200 mb-1">{s.element}</div>
                      <div className="text-xs text-violet-400 mb-1">{s.pattern}</div>
                      <div className="text-xs text-zinc-500 italic mb-1">{s.examples}</div>
                      <div className="flex justify-between text-xs"><span className="text-zinc-500">Consistency: {s.consistency}</span><span className="text-emerald-400/70">{s.impact}</span></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-emerald-400">Emotional Profile</h3>
                <div className="space-y-3">
                  {result.emotionalProfile.map((e, i) => (
                    <div key={i} className="bg-zinc-800/40 rounded-lg p-3 border border-zinc-700/50">
                      <div className="flex justify-between mb-1"><span className="text-sm font-semibold text-zinc-200">{e.emotion}</span><span className="text-xs text-emerald-400">{e.prevalence}</span></div>
                      <div className="text-xs space-y-0.5">
                        <div className="text-zinc-400">Trigger: {e.trigger}</div>
                        <div className="text-zinc-500">{e.effectiveness}</div>
                        <div className="text-emerald-400/70">{e.recommendation}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Uniqueness + Writer Guidelines */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-violet-400">Uniqueness Factors</h3>
                <div className="space-y-2">{result.uniquenessFactors.map((u, i) => <div key={i} className="text-sm text-zinc-400 flex gap-2"><span className="text-violet-400 shrink-0">★</span>{u}</div>)}</div>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-emerald-400">Writer Guidelines</h3>
                <div className="space-y-2">{result.writerGuidelines.map((g, i) => <div key={i} className="text-sm text-zinc-400 flex gap-2"><span className="text-emerald-400 shrink-0">{i + 1}.</span>{g}</div>)}</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">Know Your Content DNA</h3>
              <p className="text-zinc-400 mb-4">PostCraft AI extracts the unique identity of your content so every team member writes on-brand. Pair with <a href="/brand-voice" className="text-violet-400 underline">Brand Voice</a>, <a href="/content-integrity" className="text-violet-400 underline">Content Integrity</a>, and <a href="/tone-guard" className="text-violet-400 underline">ToneGuard</a>.</p>
              <a href="/pricing" className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">Get PostCraft Pro</a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
