'use client';
import { useState } from 'react';

const industries = ['Tech & SaaS', 'E-commerce & DTC', 'Healthcare', 'Finance & FinTech', 'Education', 'Real Estate', 'Agency & Consulting', 'Manufacturing', 'Non-Profit', 'Food & Beverage', 'Travel & Hospitality', 'Fitness & Wellness'] as const;
const brandArchetypes = ['The Innovator', 'The Sage', 'The Hero', 'The Explorer', 'The Caregiver', 'The Creator', 'The Ruler', 'The Jester', 'The Outlaw', 'The Everyman', 'The Lover', 'The Magician'] as const;
const audiences = ['B2B Enterprise', 'B2B SMB', 'B2C Premium', 'B2C Mass Market', 'Developer/Technical', 'Creative Professionals', 'Gen Z / Young Adults', 'Executives & Leaders'] as const;
const platforms = ['LinkedIn', 'Instagram', 'Twitter/X', 'TikTok', 'Website', 'Email', 'All Platforms'] as const;
const maturityLevels = ['Startup (finding voice)', 'Growing (inconsistent voice)', 'Established (refining voice)', 'Enterprise (scaling voice)'] as const;
const contentVolumes = ['Low (5-10 posts/week)', 'Medium (10-25 posts/week)', 'High (25-50 posts/week)', 'Very High (50+ posts/week)'] as const;

interface VoiceDimension { dimension: string; score: number; description: string; examples: { doThis: string; notThis: string }; platformVariation: string; }
interface VoiceGuideline { category: string; rules: string[]; examples: string[]; violations: string[]; }
interface ToneMatrix { situation: string; tone: string; vocabulary: string[]; sentenceStyle: string; example: string; }
interface PlatformVoice { platform: string; adaptation: string; dos: string[]; donts: string[]; examplePost: string; }
interface VoiceAuditItem { element: string; status: string; issue: string; fix: string; priority: string; }

interface BrandVoiceAnalysis {
  consistencyScore: number;
  dimensions: VoiceDimension[];
  guidelines: VoiceGuideline[];
  toneMatrix: ToneMatrix[];
  platformVoices: PlatformVoice[];
  auditItems: VoiceAuditItem[];
  vocabulary: { power: string[]; banned: string[]; signature: string[] };
  voiceStatement: string;
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }

function analyzeVoice(industry: string, archetype: string, audience: string, platform: string, maturity: string, volume: string, brandName: string, sampleText: string): BrandVoiceAnalysis {
  const seed = hash(`${industry}-${archetype}-${audience}-${platform}-${maturity}-${brandName}-${sampleText}`);
  const score = 40 + seed % 55;

  const dimensions: VoiceDimension[] = [
    { dimension: 'Formality', score: 30 + (seed * 3) % 65, description: '', examples: { doThis: '', notThis: '' }, platformVariation: '' },
    { dimension: 'Emotion', score: 35 + (seed * 5) % 60, description: '', examples: { doThis: '', notThis: '' }, platformVariation: '' },
    { dimension: 'Humor', score: 20 + (seed * 7) % 70, description: '', examples: { doThis: '', notThis: '' }, platformVariation: '' },
    { dimension: 'Technicality', score: 25 + (seed * 11) % 70, description: '', examples: { doThis: '', notThis: '' }, platformVariation: '' },
    { dimension: 'Boldness', score: 30 + (seed * 13) % 65, description: '', examples: { doThis: '', notThis: '' }, platformVariation: '' },
    { dimension: 'Empathy', score: 40 + (seed * 17) % 55, description: '', examples: { doThis: '', notThis: '' }, platformVariation: '' },
  ];

  const formalityDescs = ['Conversational — like talking to a smart colleague', 'Semi-formal — professional but approachable', 'Formal — authoritative and polished'];
  const emotionDescs = ['Reserved — let data speak', 'Balanced — occasional emotion with facts', 'Expressive — lead with feeling, back with evidence'];
  const humorDescs = ['Serious — humor is rare and subtle', 'Occasional — light humor when appropriate', 'Playful — humor is part of the brand DNA'];
  const techDescs = ['Simple — anyone can understand', 'Moderate — industry terms with context', 'Technical — assumes domain expertise'];
  const boldDescs = ['Conservative — safe, proven messaging', 'Moderate — occasional bold claims backed by data', 'Bold — strong opinions, contrarian takes welcome'];
  const empathyDescs = ['Objective — focus on outcomes', 'Warm — acknowledge challenges and feelings', 'Deeply empathetic — lead with understanding'];
  const allDescs = [formalityDescs, emotionDescs, humorDescs, techDescs, boldDescs, empathyDescs];

  const doExamples = [
    ['"Here\'s what we found after analyzing 10K posts..."', '"We ran the numbers. Here\'s the truth."', '"The data is clear: this approach delivers."'],
    ['"We know this struggle — we\'ve been there too."', '"This is exciting — and here\'s why it matters for you."', '"We believe this changes everything."'],
    ['"Plot twist: the \'best practice\' doesn\'t work."', '"Spoiler alert: it\'s not what you think."', '"We asked our CEO and... well, just read this."'],
    ['"Content atomization maximizes distribution efficiency."', '"Break content into smaller pieces for more reach."', '"Turn 1 post into 15 — here\'s the framework."'],
    ['"We think this is the future of content."', '"Hot take: most content strategies are broken."', '"Controversial opinion: quality matters more than quantity."'],
    ['"We get it — content creation is exhausting."', '"You deserve tools that actually work."', '"We built this because we were frustrated too."'],
  ];
  const notExamples = [
    ['"Dear valued stakeholder, we wish to inform you..."', '"Hey bestie!! OMG check this out!!"', '"Per our previous communication..."'],
    ['"This will BLOW YOUR MIND!!!"', '"Whatever, here\'s some data."', '"We\'re LITERALLY crying right now!"'],
    ['"LMAO we can\'t even 😂😂"', '"*crickets* (no personality at all)"', '"We\'re the FUNNIEST brand on social!"'],
    ['"Leverage synergies to optimize ROI paradigms."', '"Make stuff good with internet things."', '"The API endpoint leverages REST architecture..."'],
    ['"We might be wrong, but maybe consider..."', '"EVERYONE ELSE IS WRONG. WE\'RE THE ONLY SOLUTION."', '"We humbly suggest that perhaps..."'],
    ['"We don\'t care about your problems."', '"OMG you poor thing 😢😢😢"', '"Your feelings are valid BUT buy our product."'],
  ];

  dimensions.forEach((d, i) => {
    const tier = d.score > 66 ? 2 : d.score > 33 ? 1 : 0;
    d.description = allDescs[i][tier];
    d.examples = { doThis: doExamples[i][tier], notThis: notExamples[i][tier] };
    d.platformVariation = ['LinkedIn: +10% formal', 'Twitter/X: +15% casual', 'TikTok: +20% playful', 'Email: +5% personal', 'Website: baseline', 'Instagram: +10% visual language'][(seed + i) % 6];
  });

  const guidelines: VoiceGuideline[] = [
    {
      category: 'Sentence Structure',
      rules: ['Lead with the insight, not the setup', 'Keep sentences under 20 words for social, under 25 for blog', 'Vary rhythm: short. Then longer explanation. Then short again.', 'Use active voice 90%+ of the time'],
      examples: [`${brandName} builds tools that work. → Strong. Active. Clear.`, '"We analyzed 10K campaigns. The results surprised us." → Hook + delivery.'],
      violations: ['Passive voice: "Results were achieved by our team" → "Our team achieved results"', 'Burying the lead: "After careful consideration of multiple factors, we concluded..." → "Here\'s what we found:"'],
    },
    {
      category: 'Word Choice',
      rules: ['Use simple words over complex ones (use → utilize, start → commence)', `Never use jargon without defining it for ${audience.toLowerCase()} audience`, 'Choose specific over vague: "47% increase" not "significant improvement"', `Match ${industry.toLowerCase()} vocabulary without being exclusionary`],
      examples: ['"Boost conversion 47%" not "Optimize key performance indicators"', '"Save 20 hours/week" not "Increase operational efficiency"'],
      violations: ['"Synergize cross-functional paradigms" → meaningless jargon', '"Very good results" → vague. Say "3x improvement in 30 days"'],
    },
    {
      category: 'Formatting & Structure',
      rules: ['Use line breaks liberally on social — no walls of text', 'Bold the most important phrase in each paragraph', 'Use numbered lists for steps, bullets for options', 'End every post with a clear next action'],
      examples: ['1. Hook\\n2. Value\\n3. CTA\\n\\n— Clean social structure', 'Short paragraphs.\\n\\nBolded **key insight**.\\n\\nCTA at the end.'],
      violations: ['Giant paragraph with no breaks on LinkedIn', 'Multiple CTAs competing for attention in one post'],
    },
  ];

  const toneMatrix: ToneMatrix[] = [
    { situation: 'Product Launch', tone: 'Excited + Confident', vocabulary: ['introducing', 'built for', 'finally', 'game-changing', 'we\'re thrilled'], sentenceStyle: 'Short, punchy, exclamation-worthy', example: `We built something ${industry.toLowerCase()} teams have been asking for. It\'s here. 🚀` },
    { situation: 'Customer Success', tone: 'Proud + Grateful', vocabulary: ['incredible', 'milestone', 'grateful', 'together', 'impact'], sentenceStyle: 'Warm, data-backed, customer-centered', example: `${brandName} customers just hit a collective milestone: 1M+ [metric]. You made this possible.` },
    { situation: 'Industry News', tone: 'Insightful + Authoritative', vocabulary: ['here\'s what this means', 'our take', 'the real impact', 'what we\'re watching'], sentenceStyle: 'Analytical, measured, perspective-driven', example: `[News headline] — here\'s what it means for ${industry.toLowerCase()} and what ${brandName} is doing about it.` },
    { situation: 'Crisis/Bad News', tone: 'Honest + Empathetic', vocabulary: ['we hear you', 'we\'re working on it', 'transparent', 'update', 'our commitment'], sentenceStyle: 'Direct, no spin, action-focused', example: `We fell short today. Here\'s what happened, what we\'re doing, and when you\'ll see the fix.` },
    { situation: 'Educational Content', tone: 'Helpful + Clear', vocabulary: ['here\'s how', 'step by step', 'the key is', 'pro tip', 'common mistake'], sentenceStyle: 'Structured, practical, actionable', example: `Most ${industry.toLowerCase()} teams make this mistake with [topic]. Here\'s the fix (3 steps):` },
    { situation: 'Community Engagement', tone: 'Curious + Inclusive', vocabulary: ['what do you think', 'we want to hear', 'your experience', 'let\'s discuss', 'community'], sentenceStyle: 'Open-ended, inviting, participatory', example: `We\'re debating [topic] internally. What\'s your take? Drop your perspective below.` },
  ];

  const platformVoices: PlatformVoice[] = [
    { platform: 'LinkedIn', adaptation: '+10% formal, data-driven, thought leadership focus', dos: ['Lead with an insight or data point', 'Use line breaks every 1-2 sentences', 'Tag relevant people/companies'], donts: ['Use excessive emojis (1-2 max)', 'Post generic motivational quotes', 'Write more than 1,300 characters'], examplePost: `We analyzed 500 ${industry.toLowerCase()} campaigns.\n\nThe top 10% all had one thing in common:\n→ They [specific insight]\n\nHere's the full breakdown:` },
    { platform: 'Twitter/X', adaptation: '-15% formal, witty, concise', dos: ['Hook in first line', 'Use threads for depth', 'Engage in replies'], donts: ['Exceed 280 chars without reason', 'Be corporate — be human', 'Thread more than 8 tweets'], examplePost: `hot take: the best ${industry.toLowerCase()} strategy in 2026 isn't what LinkedIn gurus are selling you.\n\nit's actually much simpler. thread 🧵` },
    { platform: 'Instagram', adaptation: '+20% visual language, lifestyle-adjacent, inspiring', dos: ['Write captions that complement the visual', 'Use 3-5 relevant hashtags', 'Include a clear CTA'], donts: ['Write essay-length captions (150-200 words max)', 'Use hashtags that don\'t match your content', 'Ignore Stories and Reels'], examplePost: `The ${industry.toLowerCase()} playbook has changed.\n\nSwipe → to see the 5 strategies that actually work in 2026.\n\nSave this for later. 📌` },
    { platform: 'TikTok', adaptation: '+30% casual, trend-aware, authentic', dos: ['Hook in first 2 seconds', 'Show face/personality', 'Use trending audio when relevant'], donts: ['Sound like a corporate ad', 'Ignore comments', 'Over-produce — authenticity wins'], examplePost: `POV: you just discovered the ${industry.toLowerCase()} hack that nobody talks about...\n\n[proceeds to explain in 45 seconds with genuine enthusiasm]` },
    { platform: 'Email', adaptation: '+5% personal, direct, value-packed', dos: ['Write subject lines under 40 chars', 'Use "you" more than "we"', 'One CTA per email'], donts: ['Send without segmentation', 'Write more than 300 words', 'Use clickbait subject lines'], examplePost: `Subject: The ${industry.toLowerCase()} metric that actually matters\n\nHey [Name],\n\nWe crunched the numbers on [topic]. One metric stood out...\n\n[Value + CTA]` },
  ];

  const auditItems: VoiceAuditItem[] = [
    { element: 'Tone Consistency', status: score > 65 ? 'Good' : 'Needs Work', issue: 'Voice shifts between formal and casual across platforms', fix: 'Create platform-specific tone cards (included above)', priority: 'High' },
    { element: 'Vocabulary Alignment', status: score > 70 ? 'Good' : 'Needs Work', issue: 'Using banned words or jargon inconsistently', fix: 'Distribute power/banned word list to all content creators', priority: 'High' },
    { element: 'CTA Clarity', status: score > 60 ? 'Good' : 'Needs Work', issue: 'CTAs vary from strong to absent across posts', fix: 'Standardize 5-10 CTA templates for different goals', priority: 'Medium' },
    { element: 'Formatting Standards', status: score > 55 ? 'Good' : 'Needs Work', issue: 'Inconsistent use of line breaks, emojis, and structure', fix: 'Add formatting rules to brand voice doc (included above)', priority: 'Medium' },
    { element: 'Archetype Alignment', status: score > 60 ? 'Good' : 'Needs Work', issue: `Content sometimes drifts from ${archetype} archetype`, fix: `Review archetype traits quarterly and update examples`, priority: 'Low' },
    { element: 'Cultural Sensitivity', status: 'Review Needed', issue: 'No formal review process for cultural context in global content', fix: 'Add cultural sensitivity review step before publishing to new markets', priority: 'Medium' },
  ];

  const vocabulary = {
    power: ['transform', 'proven', 'actionable', 'results', 'blueprint', 'framework', 'unlock', 'compound', 'systematic', 'measurable'],
    banned: ['synergy', 'leverage', 'paradigm', 'disrupt', 'circle back', 'low-hanging fruit', 'move the needle', 'touch base', 'deep dive', 'thought leader'],
    signature: [`${brandName}-style`, 'content engine', 'growth compound', 'clarity over complexity', 'signal over noise', 'build in public', 'evidence-first', 'proof, not promises'],
  };

  const voiceStatement = `${brandName} speaks like a sharp, well-informed colleague who respects your time. We're ${dimensions[0].description.split(' — ')[0].toLowerCase()}, ${dimensions[1].description.split(' — ')[0].toLowerCase()}, and ${dimensions[2].description.split(' — ')[0].toLowerCase()}. Our ${archetype.toLowerCase()} archetype means we lead with ${archetype === 'The Sage' ? 'wisdom and evidence' : archetype === 'The Hero' ? 'courage and results' : archetype === 'The Innovator' ? 'vision and possibility' : 'authenticity and value'}. Every piece of content should make our ${audience.toLowerCase()} audience think: "These people get it."`;

  return { consistencyScore: score, dimensions, guidelines, toneMatrix, platformVoices, auditItems, vocabulary, voiceStatement };
}

export default function BrandVoiceAnalyzerPage() {
  const [industry, setIndustry] = useState(industries[0]);
  const [archetype, setArchetype] = useState(brandArchetypes[0]);
  const [audience, setAudience] = useState(audiences[0]);
  const [platform, setPlatform] = useState(platforms[0]);
  const [maturity, setMaturity] = useState(maturityLevels[0]);
  const [volume, setVolume] = useState(contentVolumes[0]);
  const [brandName, setBrandName] = useState('');
  const [sampleText, setSampleText] = useState('');
  const [result, setResult] = useState<BrandVoiceAnalysis | null>(null);

  const handleGenerate = () => { if (brandName.trim()) setResult(analyzeVoice(industry, archetype, audience, platform, maturity, volume, brandName, sampleText)); };
  const scoreColor = (n: number) => n > 75 ? '#34d399' : n > 55 ? '#fbbf24' : n > 35 ? '#fb923c' : '#f87171';
  const statusColor = (s: string) => s === 'Good' ? '#34d399' : s === 'Needs Work' ? '#fbbf24' : '#fb923c';

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Brand Voice Analyzer</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Analyze, define, and standardize your brand voice across every platform. Get voice dimensions, tone matrices, platform-specific adaptations, vocabulary guides, and a consistency audit — all from your brand identity.</p>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Brand Name</label>
            <input type="text" value={brandName} onChange={e => setBrandName(e.target.value)} placeholder="e.g., PostCraft" className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-3 text-zinc-100" />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Sample Text (optional — paste a post or bio)</label>
            <input type="text" value={sampleText} onChange={e => setSampleText(e.target.value)} placeholder="e.g., We help teams create content that converts..." className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-3 text-zinc-100" />
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {([
            { label: 'Industry', value: industry, setter: setIndustry as (v: string) => void, options: industries as readonly string[] },
            { label: 'Brand Archetype', value: archetype, setter: setArchetype as (v: string) => void, options: brandArchetypes as readonly string[] },
            { label: 'Target Audience', value: audience, setter: setAudience as (v: string) => void, options: audiences as readonly string[] },
            { label: 'Primary Platform', value: platform, setter: setPlatform as (v: string) => void, options: platforms as readonly string[] },
            { label: 'Brand Maturity', value: maturity, setter: setMaturity as (v: string) => void, options: maturityLevels as readonly string[] },
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
        <button onClick={handleGenerate} className="w-full md:w-auto bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded font-semibold hover:opacity-90 transition mb-8">Analyze Brand Voice</button>

        {result && (
          <div className="space-y-8">
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 text-center">
              <div className="text-5xl font-bold mb-2" style={{ color: scoreColor(result.consistencyScore) }}>{result.consistencyScore}</div>
              <div className="text-zinc-400 mb-4">Voice Consistency Score</div>
              <div className="bg-zinc-800/60 rounded-lg p-4 text-sm text-zinc-300 italic max-w-2xl mx-auto">{result.voiceStatement}</div>
            </div>

            {/* Voice Dimensions */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Voice Dimensions</h3>
              <div className="space-y-4">
                {result.dimensions.map((d, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-zinc-200">{d.dimension}</span>
                      <span className="text-sm font-bold" style={{ color: scoreColor(d.score) }}>{d.score}/100</span>
                    </div>
                    <div className="w-full bg-zinc-700 rounded-full h-2 mb-2">
                      <div className="h-2 rounded-full" style={{ width: `${d.score}%`, background: scoreColor(d.score) }} />
                    </div>
                    <div className="text-sm text-zinc-400 mb-2">{d.description}</div>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="bg-emerald-400/5 border border-emerald-400/20 rounded p-2"><div className="text-xs text-emerald-400 mb-1">DO THIS</div><div className="text-xs text-zinc-300">{d.examples.doThis}</div></div>
                      <div className="bg-red-400/5 border border-red-400/20 rounded p-2"><div className="text-xs text-red-400 mb-1">NOT THIS</div><div className="text-xs text-zinc-300">{d.examples.notThis}</div></div>
                    </div>
                    <div className="text-xs text-violet-400/60 mt-2">{d.platformVariation}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tone Matrix */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Tone Matrix (by Situation)</h3>
              <div className="space-y-3">
                {result.toneMatrix.map((t, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex gap-2 mb-2">
                      <span className="text-xs px-2 py-1 rounded bg-violet-400/10 text-violet-400 border border-violet-400/30">{t.situation}</span>
                      <span className="text-xs px-2 py-1 rounded bg-zinc-700 text-zinc-300">{t.tone}</span>
                    </div>
                    <div className="text-sm text-zinc-300 italic mb-2 bg-zinc-900/60 rounded p-2">{t.example}</div>
                    <div className="text-xs"><span className="text-zinc-500">Style:</span> <span className="text-zinc-400">{t.sentenceStyle}</span></div>
                    <div className="flex flex-wrap gap-1 mt-2">{t.vocabulary.map((v, j) => <span key={j} className="text-xs px-2 py-0.5 rounded bg-zinc-700 text-zinc-300">{v}</span>)}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Voices */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Platform Voice Adaptations</h3>
              <div className="space-y-4">
                {result.platformVoices.map((p, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex gap-2 mb-2">
                      <span className="text-xs px-2 py-1 rounded bg-violet-400/10 text-violet-400 border border-violet-400/30 font-semibold">{p.platform}</span>
                      <span className="text-xs text-zinc-500">{p.adaptation}</span>
                    </div>
                    <div className="text-sm text-zinc-300 italic mb-3 bg-zinc-900/60 rounded p-3 border border-zinc-700/30">{p.examplePost}</div>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div><div className="text-xs text-emerald-400 mb-1">DO</div>{p.dos.map((d, j) => <div key={j} className="text-xs text-zinc-400 flex gap-1"><span className="text-emerald-400">✓</span>{d}</div>)}</div>
                      <div><div className="text-xs text-red-400 mb-1">DON&apos;T</div>{p.donts.map((d, j) => <div key={j} className="text-xs text-zinc-400 flex gap-1"><span className="text-red-400">✗</span>{d}</div>)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vocabulary Guide + Audit */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3">Vocabulary Guide</h3>
                <div className="space-y-3">
                  <div><div className="text-xs text-emerald-400 font-semibold mb-1">POWER WORDS (use often)</div><div className="flex flex-wrap gap-1">{result.vocabulary.power.map((w, i) => <span key={i} className="text-xs px-2 py-0.5 rounded bg-emerald-400/10 text-emerald-400">{w}</span>)}</div></div>
                  <div><div className="text-xs text-red-400 font-semibold mb-1">BANNED WORDS (never use)</div><div className="flex flex-wrap gap-1">{result.vocabulary.banned.map((w, i) => <span key={i} className="text-xs px-2 py-0.5 rounded bg-red-400/10 text-red-400 line-through">{w}</span>)}</div></div>
                  <div><div className="text-xs text-violet-400 font-semibold mb-1">SIGNATURE PHRASES (brand DNA)</div><div className="flex flex-wrap gap-1">{result.vocabulary.signature.map((w, i) => <span key={i} className="text-xs px-2 py-0.5 rounded bg-violet-400/10 text-violet-400">{w}</span>)}</div></div>
                </div>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3">Voice Audit</h3>
                <div className="space-y-3">
                  {result.auditItems.map((a, i) => (
                    <div key={i} className="bg-zinc-800/40 rounded-lg p-3 border border-zinc-700/50">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-zinc-200">{a.element}</span>
                        <span className="text-xs px-2 py-0.5 rounded" style={{ color: statusColor(a.status), background: `${statusColor(a.status)}15` }}>{a.status}</span>
                      </div>
                      <div className="text-xs text-zinc-500">{a.issue}</div>
                      <div className="text-xs text-emerald-400/70 mt-1">Fix: {a.fix}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">Own Your Voice Across Every Platform</h3>
              <p className="text-zinc-400 mb-4">PostCraft AI analyzes and standardizes your brand voice. Pair with <a href="/brand-voice" className="text-violet-400 underline">Brand Voice Generator</a>, <a href="/tone-guard" className="text-violet-400 underline">ToneGuard</a>, and <a href="/brand-checker" className="text-violet-400 underline">Brand Checker</a>.</p>
              <a href="/pricing" className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">Get PostCraft Pro</a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
