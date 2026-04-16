'use client';
import { useState } from 'react';

const industries = ['Tech & SaaS', 'Finance & Banking', 'Health & Wellness', 'E-commerce & DTC', 'Beauty & Cosmetics', 'Food & Beverage', 'Travel & Hospitality', 'Education & EdTech', 'Real Estate', 'Crypto & Web3', 'Sustainability & ESG', 'Entertainment & Media'] as const;
const toneProfiles = ['Professional & Authoritative', 'Friendly & Approachable', 'Bold & Disruptive', 'Empathetic & Supportive', 'Witty & Playful', 'Luxurious & Premium', 'Educational & Informative', 'Activist & Purpose-Driven'] as const;
const contentContexts = ['Product Launch', 'Crisis Response', 'Social Issue Commentary', 'Holiday Campaign', 'Customer Complaint Reply', 'Thought Leadership', 'Partnership Announcement', 'Community Engagement'] as const;
const audiences = ['Gen Z (18-24)', 'Millennials (25-40)', 'Gen X (41-56)', 'Baby Boomers (57-75)', 'B2B Decision Makers', 'Global Multicultural'] as const;
const platforms = ['Instagram', 'TikTok', 'LinkedIn', 'Twitter/X', 'Facebook', 'YouTube', 'Threads', 'Email'] as const;
const markets = ['North America', 'Western Europe', 'APAC', 'Middle East & North Africa', 'Latin America', 'Global (Multi-Region)'] as const;

interface DriftAlert { dimension: string; currentTone: string; expectedTone: string; severity: 'Critical' | 'Warning' | 'Minor'; recommendation: string; }
interface ContextFit { context: string; fitScore: number; risk: string; adjustment: string; }
interface AudienceResonance { segment: string; resonanceScore: number; positiveSignals: string; riskFactors: string; suggestion: string; }
interface CulturalFlag { market: string; issue: string; severity: 'High' | 'Medium' | 'Low'; culturalNote: string; fix: string; }
interface IronyCheck { phrase: string; risk: string; interpretation: string; rewrite: string; }
interface TonePhase { phase: string; recommendedTone: string; emotionalRange: string; doNot: string; }
interface ToneAnalysis {
  toneScore: number;
  overallGrade: string;
  driftAlerts: DriftAlert[];
  contextFitAnalysis: ContextFit[];
  audienceResonance: AudienceResonance[];
  culturalFlags: CulturalFlag[];
  ironySubtextCheck: IronyCheck[];
  toneGradient: TonePhase[];
  consistencyChecklist: string[];
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }
function pick<T>(arr: readonly T[] | T[], seed: number, idx: number = 0): T { return arr[(seed + idx) % arr.length]; }

function analyzeTone(industry: string, tone: string, context: string, audience: string, platform: string, market: string): ToneAnalysis {
  const seed = hash(`${industry}-${tone}-${context}-${audience}-${platform}-${market}`);
  const score = 35 + seed % 60;
  const grades = ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'];
  const grade = grades[Math.min(Math.floor((100 - score) / 12), grades.length - 1)];

  const allDimensions = ['Formality Level', 'Emotional Warmth', 'Urgency & Pressure', 'Humor Appropriateness', 'Authority vs. Peer Tone', 'Sensitivity Calibration', 'Jargon Density', 'Inclusivity Language', 'Cultural Directness', 'Empathy Depth'];
  const allCurrentTones = ['Overly casual for context', 'Too corporate and stiff', 'Aggressively promotional', 'Dismissively brief', 'Patronizing undertone detected', 'Tone-deaf to current events', 'Excessive jargon alienating audience', 'Passive-aggressive phrasing', 'Culturally presumptuous', 'Emotionally flat'];
  const allExpectedTones = ['Measured professional with warmth', 'Conversational yet credible', 'Value-first with soft CTA', 'Empathetic and detailed', 'Peer-level collaborative', 'Culturally aware and sensitive', 'Plain language with strategic terms', 'Direct and constructive', 'Locally adapted messaging', 'Emotionally resonant storytelling'];
  const allRecs = [
    'Lower formality by 2 levels — use contractions and first-person pronouns',
    'Add human stories or anecdotes to break corporate monotone',
    'Lead with value proposition before any ask — current CTA-to-value ratio is 3:1',
    'Expand response length and add acknowledgment phrases ("I understand", "That makes sense")',
    'Replace directive language ("You should") with collaborative ("Let\'s explore")',
    'Add a contextual acknowledgment of current events before pivoting to brand message',
    'Replace 60% of technical terms with everyday equivalents — keep only industry-standard ones',
    'Rewrite using direct, positive framing — remove hedging and double negatives',
    'Consult local cultural advisor — phrasing carries unintended meaning in target market',
    'Add emotional anchors (specific scenarios, outcomes) to abstract claims',
  ];

  const driftAlerts: DriftAlert[] = Array.from({ length: 6 }, (_, i) => ({
    dimension: allDimensions[(seed + i * 3) % allDimensions.length],
    currentTone: allCurrentTones[(seed + i * 7) % allCurrentTones.length],
    expectedTone: allExpectedTones[(seed + i * 4) % allExpectedTones.length],
    severity: i < 2 ? 'Critical' : i < 4 ? 'Warning' : 'Minor',
    recommendation: allRecs[(seed + i * 5) % allRecs.length],
  }));

  const contextOptions = ['Product Launch', 'Crisis Response', 'Social Issue Commentary', 'Customer Complaint Reply'];
  const contextRisks = [
    'Over-hyped language may trigger skepticism in this audience segment',
    'Defensive tone detected — shift to accountability-first messaging',
    'Brand positioning on social issues feels performative without concrete action',
    'Response lacks urgency acknowledgment — customer may escalate publicly',
  ];
  const contextAdj = [
    'Lead with proof points and social proof instead of superlatives',
    'Open with empathy statement, follow with transparent action steps, close with accountability commitment',
    'Pair commentary with specific brand actions — link to initiatives, partnerships, or policies',
    'Acknowledge within first sentence, provide solution by second, offer escalation path by third',
  ];

  const contextFitAnalysis: ContextFit[] = Array.from({ length: 4 }, (_, i) => ({
    context: contextOptions[(seed + i) % contextOptions.length],
    fitScore: 30 + (seed + i * 13) % 60,
    risk: contextRisks[(seed + i * 3) % contextRisks.length],
    adjustment: contextAdj[(seed + i * 5) % contextAdj.length],
  }));

  const segments = ['Gen Z (18-24)', 'Millennials (25-40)', 'Gen X (41-56)', 'B2B Decision Makers'];
  const posSignals = [
    'Authentic voice, meme-literate references, value-aligned messaging',
    'Relatable storytelling, actionable takeaways, community-building tone',
    'Clear value proposition, no-nonsense approach, quality emphasis',
    'Data-backed claims, ROI focus, professional credibility signals',
  ];
  const riskFactors = [
    'Corporate jargon triggers instant disengagement; "fellow kids" tone is worse than formal',
    'Overuse of urgency tactics erodes trust; this cohort is ad-fatigue resistant',
    'Trendy language may feel inauthentic; prefer substance over style',
    'Casual tone may undermine perceived expertise; balance warmth with authority',
  ];
  const suggestions = [
    'Use platform-native language, reference shared cultural moments, keep it real over polished',
    'Focus on transformation stories, practical frameworks, and community validation',
    'Lead with credentials and outcomes, minimize buzzwords, respect their time',
    'Open with metric or case study, maintain executive tone, close with clear next step',
  ];

  const audienceResonance: AudienceResonance[] = Array.from({ length: 4 }, (_, i) => ({
    segment: segments[(seed + i) % segments.length],
    resonanceScore: 25 + (seed + i * 11) % 65,
    positiveSignals: posSignals[(seed + i * 2) % posSignals.length],
    riskFactors: riskFactors[(seed + i * 3) % riskFactors.length],
    suggestion: suggestions[(seed + i * 4) % suggestions.length],
  }));

  const allMarkets = ['Japan', 'Germany', 'Brazil', 'Saudi Arabia', 'India', 'South Korea', 'France', 'Nigeria'];
  const allIssues = [
    'Direct self-promotion is culturally inappropriate — perceived as arrogant',
    'Humor style relies on sarcasm which translates as hostility',
    'Informal "you" form inappropriate for business communication',
    'Color symbolism in imagery carries negative connotations',
    'Individualistic messaging clashes with collectivist cultural values',
    'Holiday reference is region-specific and excludes target audience',
    'Idiom has no cultural equivalent and confuses rather than connects',
    'Assertive CTA style perceived as disrespectful or pushy',
  ];
  const allNotes = [
    'Japanese business culture values indirectness — let achievements speak through third-party validation',
    'German audiences expect precise, substantiated claims — vague promises damage credibility',
    'Brazilian audiences respond to warmth and emotional connection — overly formal feels cold',
    'Gulf region requires respect for local customs, religious sensitivities, and formal address',
    'Indian market is highly diverse — avoid pan-Asian generalizations, respect regional differences',
    'Korean audiences value group harmony — frame benefits in collective rather than individual terms',
    'French audiences appreciate intellectual depth — superficial messaging is quickly dismissed',
    'Nigerian market values community and aspiration — frame success as shared achievement',
  ];
  const allFixes = [
    'Use customer testimonials and case studies instead of self-praising copy',
    'Replace sarcasm with observational wit — humor should unite, not divide',
    'Use formal address (Sie/Vous/Usted) and professional register',
    'Audit visual assets with local cultural consultant before publishing',
    'Reframe "your success" as "our community\'s growth" or "together we achieve"',
    'Use inclusive seasonal greetings or skip holiday references for evergreen messaging',
    'Replace idioms with universal metaphors or direct statements',
    'Soften CTAs to invitations: "Discover more" instead of "Buy now"',
  ];

  const culturalFlags: CulturalFlag[] = Array.from({ length: 5 }, (_, i) => ({
    market: allMarkets[(seed + i * 3) % allMarkets.length],
    issue: allIssues[(seed + i * 5) % allIssues.length],
    severity: i < 2 ? 'High' : i < 4 ? 'Medium' : 'Low',
    culturalNote: allNotes[(seed + i * 4) % allNotes.length],
    fix: allFixes[(seed + i * 6) % allFixes.length],
  }));

  const allPhrases = [
    '"We\'re disrupting the industry" — may sound tone-deaf during layoff season',
    '"Obviously, the best choice" — dismissive of audience intelligence',
    '"You won\'t believe what happened next" — clickbait undermines brand authority',
    '"We\'re like a family here" — ironic given current workplace culture discourse',
    '"Crushing it" — aggressive metaphor alienates empathy-seeking audiences',
    '"It\'s not rocket science" — belittles the audience\'s learning journey',
    '"Game-changing solution" — overused to the point of meaning nothing',
    '"We hear you" — without action, reads as dismissive corporate script',
  ];
  const allInterpretations = [
    'Audience may read this as out-of-touch or insensitive to current economic climate',
    'Creates an adversarial dynamic — implies audience is wrong for considering alternatives',
    'Erodes trust with sophisticated audiences who recognize manipulation tactics',
    'Post-pandemic workforce sees this phrase as red flag for toxic culture',
    'Aggressive language creates cognitive dissonance with supportive brand positioning',
    'Condescending subtext makes audience feel stupid rather than empowered',
    'Audience mentally files this with every other "game-changer" they\'ve ignored',
    'Without specific follow-up actions, this phrase amplifies frustration rather than soothing it',
  ];
  const allRewrites = [
    '"We\'re rethinking how [specific thing] works — here\'s what we\'ve learned"',
    '"Here\'s why [X] customers chose this approach" — let social proof do the work',
    '"Here\'s what we discovered about [topic] — and how it changes the approach"',
    '"Our team thrives on [specific value] — here\'s how that shows up day-to-day"',
    '"Making real progress on [specific metric]" — concrete over hyperbolic',
    '"This concept has layers — let\'s break it down together"',
    '"A meaningful shift in how [specific workflow] operates — here\'s the data"',
    '"We hear you — and here\'s exactly what we\'re doing about it: [specific actions]"',
  ];

  const ironySubtextCheck: IronyCheck[] = Array.from({ length: 4 }, (_, i) => ({
    phrase: allPhrases[(seed + i * 3) % allPhrases.length],
    risk: pick(['High — likely misinterpreted', 'Medium — context-dependent', 'Medium — audience-dependent', 'Low — minor concern'], seed, i),
    interpretation: allInterpretations[(seed + i * 5) % allInterpretations.length],
    rewrite: allRewrites[(seed + i * 4) % allRewrites.length],
  }));

  const toneGradient: TonePhase[] = [
    {
      phase: 'Opening',
      recommendedTone: pick(['Warm acknowledgment', 'Bold statement', 'Curious question', 'Empathetic hook'], seed, 0),
      emotionalRange: pick(['Intrigue to trust', 'Confidence to curiosity', 'Empathy to hope', 'Surprise to engagement'], seed, 1),
      doNot: pick(['Don\'t open with a sales pitch or self-promotion', 'Avoid starting with statistics without context', 'Don\'t lead with negativity or fear', 'Skip generic greetings that waste attention'], seed, 2),
    },
    {
      phase: 'Body',
      recommendedTone: pick(['Educational with proof points', 'Storytelling with data', 'Conversational authority', 'Empathetic problem-solving'], seed, 3),
      emotionalRange: pick(['Trust to conviction', 'Curiosity to understanding', 'Recognition to aspiration', 'Frustration to relief'], seed, 4),
      doNot: pick(['Don\'t pile features without benefits', 'Avoid jargon without explanation', 'Don\'t make claims without evidence', 'Skip lengthy paragraphs — use scannable formats'], seed, 5),
    },
    {
      phase: 'CTA',
      recommendedTone: pick(['Confident invitation', 'Gentle nudge with value', 'Urgency with integrity', 'Community-driven motivation'], seed, 6),
      emotionalRange: pick(['Conviction to action', 'Desire to commitment', 'Trust to decision', 'Belonging to participation'], seed, 7),
      doNot: pick(['Don\'t use false scarcity or fake urgency', 'Avoid aggressive "Buy NOW" language', 'Don\'t make the CTA about you — make it about them', 'Skip multiple competing CTAs — one clear action'], seed, 8),
    },
    {
      phase: 'Sign-off',
      recommendedTone: pick(['Warm reinforcement', 'Forward-looking optimism', 'Community gratitude', 'Quiet confidence'], seed, 9),
      emotionalRange: pick(['Satisfaction to anticipation', 'Connection to loyalty', 'Gratitude to belonging', 'Assurance to excitement'], seed, 10),
      doNot: pick(['Don\'t end abruptly without emotional closure', 'Avoid new information in the sign-off', 'Don\'t undermine the CTA with hedging language', 'Skip the sign-off if it adds nothing'], seed, 11),
    },
  ];

  const consistencyChecklist = [
    'Brand voice guidelines document is current and accessible to all creators',
    'Tone adapts appropriately for content context (crisis vs. celebration)',
    'No jargon that excludes the target audience segment',
    'Humor style matches brand personality and audience expectations',
    'Cultural references are validated for all target markets',
    'Pronouns and address style are consistent across platforms',
    'Emotional intensity matches the topic sensitivity level',
    'CTAs use brand-approved language and urgency levels',
    'Third-party content (UGC, influencer) aligns with tone guidelines',
    'Automated responses (chatbot, email) match human tone standards',
  ];

  return { toneScore: score, overallGrade: grade, driftAlerts, contextFitAnalysis, audienceResonance, culturalFlags, ironySubtextCheck, toneGradient, consistencyChecklist };
}

export default function ToneGuardPage() {
  const [industry, setIndustry] = useState(industries[0]);
  const [tone, setTone] = useState(toneProfiles[0]);
  const [context, setContext] = useState(contentContexts[0]);
  const [audience, setAudience] = useState(audiences[0]);
  const [platform, setPlatform] = useState(platforms[0]);
  const [market, setMarket] = useState(markets[0]);
  const [result, setResult] = useState<ToneAnalysis | null>(null);

  const handleScan = () => setResult(analyzeTone(industry, tone, context, audience, platform, market));

  const sevColor = (s: string) => s === 'Critical' || s === 'High' ? 'text-red-400 bg-red-400/10 border-red-400/30' : s === 'Warning' || s === 'Medium' ? 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30' : 'text-blue-400 bg-blue-400/10 border-blue-400/30';
  const scoreColor = (n: number) => n > 75 ? '#34d399' : n > 55 ? '#fbbf24' : n > 35 ? '#fb923c' : '#f87171';

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">ToneGuard — Brand Tone Integrity Scanner</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Analyze your content for tone drift, cultural missteps, and audience misalignment. Protect your brand voice across every platform and market.</p>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {([
            { label: 'Industry', value: industry, setter: setIndustry as (v: string) => void, options: industries as readonly string[] },
            { label: 'Tone Profile', value: tone, setter: setTone as (v: string) => void, options: toneProfiles as readonly string[] },
            { label: 'Content Context', value: context, setter: setContext as (v: string) => void, options: contentContexts as readonly string[] },
            { label: 'Target Audience', value: audience, setter: setAudience as (v: string) => void, options: audiences as readonly string[] },
            { label: 'Platform', value: platform, setter: setPlatform as (v: string) => void, options: platforms as readonly string[] },
            { label: 'Target Market', value: market, setter: setMarket as (v: string) => void, options: markets as readonly string[] },
          ] as const).map(({ label, value, setter, options }) => (
            <div key={label}>
              <label className="block text-sm text-zinc-400 mb-1">{label}</label>
              <select value={value} onChange={e => setter(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100">
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
        <button onClick={handleScan} className="w-full md:w-auto bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded font-semibold hover:opacity-90 transition mb-8">Scan Tone Integrity</button>

        {result && (
          <div className="space-y-8">
            {/* Score + Profile */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 text-center">
                <div className="text-6xl font-bold mb-2" style={{ color: scoreColor(result.toneScore) }}>{result.toneScore}</div>
                <div className="text-zinc-400 mb-1">Tone Integrity Score</div>
                <div className="text-2xl font-bold" style={{ color: scoreColor(result.toneScore) }}>{result.overallGrade}</div>
                <div className="mt-3 w-full bg-zinc-800 rounded-full h-3">
                  <div className="h-3 rounded-full transition-all" style={{ width: `${result.toneScore}%`, background: scoreColor(result.toneScore) }} />
                </div>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3">Tone Profile Summary</h3>
                <div className="space-y-2 text-sm">
                  <div><span className="text-zinc-500">Target Tone:</span> <span className="text-violet-400">{tone}</span></div>
                  <div><span className="text-zinc-500">Context:</span> <span className="text-zinc-300">{context}</span></div>
                  <div><span className="text-zinc-500">Audience:</span> <span className="text-zinc-300">{audience}</span></div>
                  <div><span className="text-zinc-500">Market:</span> <span className="text-zinc-300">{market}</span></div>
                  <div><span className="text-zinc-500">Drift Alerts:</span> <span className="text-red-400 font-semibold">{result.driftAlerts.filter(d => d.severity === 'Critical').length} critical</span>, <span className="text-yellow-400">{result.driftAlerts.filter(d => d.severity === 'Warning').length} warnings</span></div>
                  <div><span className="text-zinc-500">Cultural Flags:</span> <span className="text-orange-400 font-semibold">{result.culturalFlags.filter(f => f.severity === 'High').length} high-risk</span></div>
                </div>
              </div>
            </div>

            {/* Drift Alerts */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Tone Drift Alerts ({result.driftAlerts.length})</h3>
              <div className="space-y-3">
                {result.driftAlerts.map((d, i) => (
                  <div key={i} className={`border rounded-lg p-4 ${sevColor(d.severity)}`}>
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold">{d.dimension}</span>
                      <span className={`text-xs px-2 py-1 rounded-full border ${sevColor(d.severity)}`}>{d.severity}</span>
                    </div>
                    <div className="text-sm opacity-80 space-y-1">
                      <div><strong>Current:</strong> {d.currentTone}</div>
                      <div><strong>Expected:</strong> {d.expectedTone}</div>
                      <div><strong>Fix:</strong> {d.recommendation}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Context Fit */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Context Fit Analysis</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {result.contextFitAnalysis.map((c, i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-violet-400">{c.context}</span>
                      <span className="text-lg font-bold" style={{ color: scoreColor(c.fitScore) }}>{c.fitScore}%</span>
                    </div>
                    <div className="w-full bg-zinc-700 rounded-full h-2 mb-3">
                      <div className="h-2 rounded-full" style={{ width: `${c.fitScore}%`, background: scoreColor(c.fitScore) }} />
                    </div>
                    <div className="text-sm text-zinc-400 space-y-1">
                      <div><span className="text-zinc-500">Risk:</span> {c.risk}</div>
                      <div><span className="text-zinc-500">Adjustment:</span> {c.adjustment}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Audience Resonance */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Audience Resonance</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {result.audienceResonance.map((a, i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-zinc-200">{a.segment}</span>
                      <span className="text-lg font-bold" style={{ color: scoreColor(a.resonanceScore) }}>{a.resonanceScore}%</span>
                    </div>
                    <div className="w-full bg-zinc-700 rounded-full h-2 mb-3">
                      <div className="h-2 rounded-full" style={{ width: `${a.resonanceScore}%`, background: scoreColor(a.resonanceScore) }} />
                    </div>
                    <div className="text-sm space-y-1">
                      <div><span className="text-emerald-400/70">+</span> <span className="text-zinc-400">{a.positiveSignals}</span></div>
                      <div><span className="text-red-400/70">!</span> <span className="text-zinc-400">{a.riskFactors}</span></div>
                      <div className="text-violet-400/80 mt-1">{a.suggestion}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cultural Flags */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Cultural Sensitivity Flags</h3>
              <div className="space-y-3">
                {result.culturalFlags.map((f, i) => (
                  <div key={i} className={`border rounded-lg p-4 ${sevColor(f.severity)}`}>
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold">{f.market}</span>
                      <span className={`text-xs px-2 py-1 rounded-full border ${sevColor(f.severity)}`}>{f.severity}</span>
                    </div>
                    <div className="text-sm opacity-80 space-y-1">
                      <div><strong>Issue:</strong> {f.issue}</div>
                      <div><strong>Cultural Note:</strong> {f.culturalNote}</div>
                      <div><strong>Fix:</strong> {f.fix}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Irony & Subtext */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Irony & Subtext Detection</h3>
              <div className="space-y-3">
                {result.ironySubtextCheck.map((ir, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="text-zinc-200 font-medium mb-2">{ir.phrase}</div>
                    <div className="text-sm space-y-1">
                      <div><span className="text-zinc-500">Risk:</span> <span className="text-yellow-400">{ir.risk}</span></div>
                      <div><span className="text-zinc-500">Interpretation:</span> <span className="text-zinc-400">{ir.interpretation}</span></div>
                      <div><span className="text-zinc-500">Rewrite:</span> <span className="text-emerald-400">{ir.rewrite}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tone Gradient */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Tone Gradient Recommendations</h3>
              <div className="grid md:grid-cols-4 gap-4">
                {result.toneGradient.map((t, i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700 relative">
                    <div className="text-xs text-violet-400 font-semibold uppercase tracking-wider mb-2">Phase {i + 1}</div>
                    <div className="font-semibold text-zinc-200 mb-2">{t.phase}</div>
                    <div className="text-sm space-y-2">
                      <div><span className="text-zinc-500">Tone:</span> <span className="text-zinc-300">{t.recommendedTone}</span></div>
                      <div><span className="text-zinc-500">Emotion:</span> <span className="text-zinc-300">{t.emotionalRange}</span></div>
                      <div className="text-red-400/80 text-xs mt-2">{t.doNot}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Checklist */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Brand Tone Consistency Checklist</h3>
              <div className="grid md:grid-cols-2 gap-2">
                {result.consistencyChecklist.map((item, i) => (
                  <label key={i} className="flex items-start gap-2 text-sm text-zinc-300 cursor-pointer hover:text-zinc-100">
                    <input type="checkbox" className="mt-1 accent-violet-500" />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">Protect Your Brand Voice at Scale</h3>
              <p className="text-zinc-400 mb-4">Use PostCraft AI to maintain tone integrity across every platform and market. Pair with <a href="/brand-voice" className="text-violet-400 underline">Brand Voice Generator</a>, <a href="/brand-checker" className="text-violet-400 underline">Brand Checker</a>, and <a href="/compliance-checker" className="text-violet-400 underline">Compliance Checker</a>.</p>
              <a href="/pricing" className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">Get PostCraft Pro</a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
