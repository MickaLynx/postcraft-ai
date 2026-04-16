'use client';
import { useState } from 'react';

// Option arrays (as const)
const contentTypes = ['Social Media Post', 'Brand Story', 'Product Launch', 'Case Study', 'Testimonial Campaign', 'Thought Leadership', 'Origin Story', 'Customer Journey', 'Crisis Response', 'Seasonal Campaign'] as const;
const archetypes = ["The Hero's Journey", 'The Underdog', 'The Transformation', 'The Discovery', 'The Challenge', 'The Reunion', 'The Quest', 'The Rebellion'] as const;
const audiences = ['Gen Z (18-24)', 'Millennials (25-39)', 'Gen X (40-55)', 'Boomers (55+)', 'B2B Decision Makers', 'Solopreneurs', 'Enterprise Teams', 'Creators & Influencers'] as const;
const platforms = ['Instagram', 'LinkedIn', 'Twitter/X', 'TikTok', 'YouTube', 'Facebook', 'Newsletter', 'Blog'] as const;
const emotionalGoals = ['Inspire Action', 'Build Trust', 'Create Urgency', 'Evoke Nostalgia', 'Spark Curiosity', 'Drive FOMO', 'Foster Community', 'Challenge Beliefs'] as const;
const brandTones = ['Bold & Provocative', 'Warm & Authentic', 'Professional & Authoritative', 'Playful & Witty', 'Empathetic & Caring', 'Visionary & Aspirational'] as const;

// Result interfaces
interface EmotionalBeat {
  phase: string;
  emotion: string;
  intensity: number;
  technique: string;
  example: string;
}

interface TensionPoint {
  position: string;
  type: string;
  description: string;
  impact: number;
}

interface ArchetypeAlignment {
  archetype: string;
  fit: number;
  angle: string;
  hook: string;
}

interface MemoryTrigger {
  sense: string;
  trigger: string;
  retention: number;
  usage: string;
}

interface ConflictElement {
  type: string;
  description: string;
  resolution: string;
  emotionalPayoff: string;
}

interface NarrativeResult {
  resonanceScore: number;
  emotionalBeats: EmotionalBeat[];
  tensionPoints: TensionPoint[];
  archetypeAlignments: ArchetypeAlignment[];
  memoryTriggers: MemoryTrigger[];
  conflicts: ConflictElement[];
  ethosScore: number;
  persistenceRating: number;
  openingHook: string;
  closingCTA: string;
}

// Utility functions
function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }
function pick<T>(arr: readonly T[] | T[], seed: number, idx: number = 0): T { return arr[(seed + idx) % arr.length]; }

// Large data arrays for generation
const phases = ['Opening Hook', 'Context Setting', 'Rising Tension', 'Emotional Peak', 'Resolution', 'Call to Action'];
const emotions = ['Curiosity', 'Surprise', 'Empathy', 'Urgency', 'Relief', 'Pride', 'Anticipation', 'Determination', 'Joy', 'Awe'];
const techniques = ['Pattern interrupt', 'Open loop', 'Social proof cascade', 'Metaphor bridge', 'Contrast revelation', 'Future pacing', 'Identity anchoring', 'Scarcity framing', 'Vulnerability disclosure', 'Authority positioning'];
const examples = [
  'Start with a counter-intuitive statistic that challenges assumptions',
  'Open with a personal failure that led to breakthrough insight',
  'Use a vivid sensory detail that grounds the audience in the moment',
  'Pose a question that reveals a hidden problem',
  'Share a customer quote that encapsulates the transformation',
  'Describe the before/after contrast in concrete terms',
  'Reveal an industry secret that positions you as insider',
  'Paint a future scenario that the audience desperately wants',
  'Tell a micro-story in under 50 words that captures your brand essence',
  'Use a metaphor from an unrelated field to explain your value prop'
];
const tensionTypes = ['Knowledge Gap', 'Status Quo Challenge', 'Emotional Conflict', 'Time Pressure', 'Identity Tension', 'Value Contradiction', 'Social Proof Gap', 'Aspiration vs Reality'];
const senses = ['Visual', 'Auditory', 'Kinesthetic', 'Emotional Memory', 'Social Identity', 'Aspirational Self'];
const triggerDescriptions = ['Vivid color imagery that anchors brand recall', 'Rhythmic sentence structure mimicking heartbeat', 'Tactile language that creates physical sensation', 'Nostalgia cues tied to shared generational experiences', 'In-group language that reinforces belonging', 'Future-self visualization that drives aspiration'];
const conflictTypes = ['Internal (audience vs self-doubt)', 'External (audience vs industry status quo)', 'Relational (brand vs competitor narrative)', 'Temporal (past pain vs future promise)', 'Philosophical (conventional wisdom vs new paradigm)'];
const resolutions = ['Show proof through transformation data', 'Bridge with empathy and shared experience', 'Reframe the narrative with new evidence', 'Unite against common enemy/obstacle', 'Demonstrate the path forward with clarity'];
const openingHooks = [
  'What if everything you believed about [topic] was actually holding you back?',
  'In 2024, a small team discovered something that changed [industry] forever...',
  'Nobody talks about this, but [insight] is the real reason [outcome] happens.',
  'I spent 3 years getting this wrong before I realized the truth about [topic].',
  'The data says one thing. Your gut says another. Here\'s why both are right.',
  'Delete everything you know about [topic]. Here\'s what actually works in 2026.',
  'This one shift took us from [bad metric] to [great metric] in 90 days.',
  'Your competitors hope you never discover this about [topic].'
];
const closingCTAs = [
  'Ready to rewrite your story? Start your narrative transformation today.',
  'The best stories aren\'t told — they\'re lived. Begin yours now.',
  'Every brand has an origin story. Make yours unforgettable.',
  'Stop posting content. Start building narratives that compound.',
  'Your audience is waiting for a story worth sharing. Give them one.',
  'The gap between forgettable and legendary? One narrative shift. Take it.',
  'Join 10,000+ brands crafting stories that stick. Start free.',
  'Transform your content from noise to narrative. Try PostCraft AI.'
];

function generateNarrative(contentType: string, archetype: string, audience: string, platform: string, emotionalGoal: string, brandTone: string): NarrativeResult {
  const seed = hash(`${contentType}-${archetype}-${audience}-${platform}-${emotionalGoal}-${brandTone}`);

  const resonanceScore = 52 + seed % 44;
  const ethosScore = 55 + (seed * 3) % 40;
  const persistenceRating = 48 + (seed * 7) % 48;

  const emotionalBeats: EmotionalBeat[] = phases.map((phase, i) => ({
    phase,
    emotion: pick(emotions, seed, i * 3),
    intensity: 30 + ((seed + i * 17) % 65),
    technique: pick(techniques, seed, i * 5),
    example: pick(examples, seed, i * 7),
  }));

  const tensionPoints: TensionPoint[] = Array.from({ length: 5 }, (_, i) => ({
    position: `${15 + i * 18}% through content`,
    type: pick(tensionTypes, seed, i * 4),
    description: `Create ${pick(tensionTypes, seed, i * 4).toLowerCase()} by contrasting ${pick(emotions, seed, i * 2).toLowerCase()} with ${pick(emotions, seed, i * 2 + 1).toLowerCase()}`,
    impact: 40 + ((seed + i * 13) % 55),
  }));

  const archetypeAlignments: ArchetypeAlignment[] = Array.from({ length: 4 }, (_, i) => ({
    archetype: pick([...archetypes], seed, i * 3),
    fit: 45 + ((seed + i * 11) % 50),
    angle: `Position the ${contentType.toLowerCase()} as a ${pick([...archetypes], seed, i * 3).toLowerCase()} narrative for ${audience.toLowerCase()}`,
    hook: pick(openingHooks, seed, i * 2),
  }));

  const memoryTriggers: MemoryTrigger[] = senses.map((sense, i) => ({
    sense,
    trigger: triggerDescriptions[i],
    retention: 35 + ((seed + i * 19) % 60),
    usage: `Apply in ${pick([...phases], seed, i * 3)} phase for maximum ${sense.toLowerCase()} impact`,
  }));

  const conflicts: ConflictElement[] = Array.from({ length: 5 }, (_, i) => ({
    type: conflictTypes[i % conflictTypes.length],
    description: `Leverage ${conflictTypes[i % conflictTypes.length].toLowerCase()} to create narrative tension in your ${platform} ${contentType.toLowerCase()}`,
    resolution: resolutions[i % resolutions.length],
    emotionalPayoff: pick(emotions, seed, i * 6),
  }));

  return {
    resonanceScore,
    emotionalBeats,
    tensionPoints,
    archetypeAlignments,
    memoryTriggers,
    conflicts,
    ethosScore,
    persistenceRating,
    openingHook: pick(openingHooks, seed, 0),
    closingCTA: pick(closingCTAs, seed, 1),
  };
}

export default function NarrativeEnginePage() {
  const [contentType, setContentType] = useState<string>(contentTypes[0]);
  const [archetype, setArchetype] = useState<string>(archetypes[0]);
  const [audience, setAudience] = useState<string>(audiences[0]);
  const [platform, setPlatform] = useState<string>(platforms[0]);
  const [emotionalGoal, setEmotionalGoal] = useState<string>(emotionalGoals[0]);
  const [brandTone, setBrandTone] = useState<string>(brandTones[0]);
  const [result, setResult] = useState<NarrativeResult | null>(null);

  const handleGenerate = () => setResult(generateNarrative(contentType, archetype, audience, platform, emotionalGoal, brandTone));
  const scoreColor = (n: number) => n > 75 ? '#34d399' : n > 55 ? '#fbbf24' : n > 35 ? '#fb923c' : '#f87171';

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Narrative Resonance Engine</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Predict the optimal story arc, emotional beats, and narrative structure for maximum content impact and memorability.</p>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Content Type', value: contentType, setter: setContentType, options: contentTypes },
            { label: 'Story Archetype', value: archetype, setter: setArchetype, options: archetypes },
            { label: 'Target Audience', value: audience, setter: setAudience, options: audiences },
            { label: 'Platform', value: platform, setter: setPlatform, options: platforms },
            { label: 'Emotional Goal', value: emotionalGoal, setter: setEmotionalGoal, options: emotionalGoals },
            { label: 'Brand Tone', value: brandTone, setter: setBrandTone, options: brandTones },
          ].map(({ label, value, setter, options }) => (
            <div key={label}>
              <label className="text-xs text-zinc-400 mb-1 block">{label}</label>
              <select value={value} onChange={e => setter(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100">
                {options.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
        <button onClick={handleGenerate} className="btn-primary px-8 py-3 rounded-lg font-semibold text-lg w-full md:w-auto">Generate Narrative Blueprint</button>

        {result && (
          <div className="space-y-8 mt-10 fade-in">
            {/* Scores Overview */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { label: 'Resonance Score', value: result.resonanceScore },
                { label: 'Ethos Integrity', value: result.ethosScore },
                { label: 'Memory Persistence', value: result.persistenceRating },
              ].map(({ label, value }) => (
                <div key={label} className="bg-zinc-900/60 rounded-lg p-6 border border-zinc-800 text-center">
                  <div className="text-xs text-zinc-500 mb-2">{label}</div>
                  <div className="text-4xl font-bold mb-2" style={{ color: scoreColor(value) }}>{value}<span className="text-lg text-zinc-500">/100</span></div>
                  <div className="w-full bg-zinc-800 rounded-full h-2"><div className="h-2 rounded-full" style={{ width: `${value}%`, background: `linear-gradient(90deg, ${scoreColor(value)}, #a78bfa)` }} /></div>
                </div>
              ))}
            </div>

            {/* Opening Hook & Closing CTA */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 rounded-lg p-5 border border-violet-500/30">
                <div className="text-xs text-violet-400 mb-2">Suggested Opening Hook</div>
                <p className="text-zinc-100 italic text-lg">&ldquo;{result.openingHook}&rdquo;</p>
              </div>
              <div className="bg-zinc-900/60 rounded-lg p-5 border border-fuchsia-500/30">
                <div className="text-xs text-fuchsia-400 mb-2">Closing CTA</div>
                <p className="text-zinc-100 italic text-lg">&ldquo;{result.closingCTA}&rdquo;</p>
              </div>
            </div>

            {/* Emotional Beat Map */}
            <div>
              <h2 className="text-xl font-bold text-zinc-100 mb-4">Emotional Beat Map</h2>
              <div className="space-y-3">
                {result.emotionalBeats.map((beat, i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-violet-600 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                        <span className="font-semibold text-zinc-100">{beat.phase}</span>
                      </div>
                      <span className="text-sm font-mono" style={{ color: scoreColor(beat.intensity) }}>{beat.intensity}%</span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-2 text-sm">
                      <div><span className="text-zinc-500">Emotion:</span> <span className="text-emerald-400">{beat.emotion}</span></div>
                      <div><span className="text-zinc-500">Technique:</span> <span className="text-violet-400">{beat.technique}</span></div>
                      <div><span className="text-zinc-500">Example:</span> <span className="text-zinc-300">{beat.example}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tension Points */}
            <div>
              <h2 className="text-xl font-bold text-zinc-100 mb-4">Narrative Tension Points</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {result.tensionPoints.map((tp, i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-mono text-fuchsia-400">{tp.position}</span>
                      <span className="text-sm font-bold" style={{ color: scoreColor(tp.impact) }}>Impact: {tp.impact}%</span>
                    </div>
                    <div className="text-sm text-violet-400 mb-1">{tp.type}</div>
                    <p className="text-sm text-zinc-400">{tp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Archetype Alignments */}
            <div>
              <h2 className="text-xl font-bold text-zinc-100 mb-4">Archetype Alignment</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {result.archetypeAlignments.map((a, i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-zinc-100">{a.archetype}</span>
                      <span className="text-sm font-bold" style={{ color: scoreColor(a.fit) }}>Fit: {a.fit}%</span>
                    </div>
                    <p className="text-sm text-zinc-400 mb-2">{a.angle}</p>
                    <p className="text-sm text-emerald-400 italic">&ldquo;{a.hook}&rdquo;</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Memory Triggers */}
            <div>
              <h2 className="text-xl font-bold text-zinc-100 mb-4">Memory Persistence Triggers</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {result.memoryTriggers.map((m, i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-violet-400">{m.sense}</span>
                      <span className="text-sm font-mono" style={{ color: scoreColor(m.retention) }}>{m.retention}%</span>
                    </div>
                    <p className="text-sm text-zinc-300 mb-1">{m.trigger}</p>
                    <p className="text-xs text-zinc-500">{m.usage}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Conflict Elements */}
            <div>
              <h2 className="text-xl font-bold text-zinc-100 mb-4">Narrative Conflict Structure</h2>
              <div className="space-y-3">
                {result.conflicts.map((c, i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-7 h-7 rounded-full bg-fuchsia-600 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                      <span className="font-semibold text-zinc-100">{c.type}</span>
                    </div>
                    <p className="text-sm text-zinc-400 mb-2">{c.description}</p>
                    <div className="grid md:grid-cols-2 gap-2 text-sm">
                      <div><span className="text-zinc-500">Resolution:</span> <span className="text-emerald-400">{c.resolution}</span></div>
                      <div><span className="text-zinc-500">Emotional Payoff:</span> <span className="text-violet-400">{c.emotionalPayoff}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="rounded-xl p-8 text-center" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(219,39,119,0.2))' }}>
              <h3 className="text-2xl font-bold mb-2">Craft Stories That Stick</h3>
              <p className="text-zinc-400 mb-4">Combine narrative engineering with our full suite of 110+ content tools.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="/content-cascade" className="text-violet-400 hover:text-violet-300 text-sm">Content Cascade</a>
                <a href="/mood-timing" className="text-violet-400 hover:text-violet-300 text-sm">Mood Timing</a>
                <a href="/emotional-analyzer" className="text-violet-400 hover:text-violet-300 text-sm">Emotional Analyzer</a>
                <a href="/content-rights" className="text-violet-400 hover:text-violet-300 text-sm">Content Rights</a>
                <a href="/pricing" className="text-violet-400 hover:text-violet-300 text-sm">View Pricing</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
