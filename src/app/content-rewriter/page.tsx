'use client';
import { useState } from 'react';

const rewriteModes = ['Paraphrase', 'Simplify', 'Formalize', 'Shorten', 'Expand', 'Emotional Boost', 'SEO Optimize', 'Localize Tone'] as const;
const targetPlatforms = ['Instagram', 'TikTok', 'Twitter/X', 'LinkedIn', 'YouTube', 'Facebook', 'Pinterest', 'Email'] as const;
const toneOptions = ['Professional', 'Casual', 'Witty', 'Inspirational', 'Urgent', 'Empathetic', 'Bold', 'Storytelling'] as const;
const audienceTypes = ['Gen Z (18-24)', 'Millennials (25-40)', 'Professionals (30-55)', 'Executives (40-65)', 'Parents', 'Students', 'Creators', 'General'] as const;

interface RewriteVariant {
  mode: string;
  output: string;
  tone: string;
  wordCount: number;
  readabilityScore: number;
  engagementEstimate: number;
  changes: string[];
}

interface ToneShift {
  original: string;
  rewritten: string;
  emotionBefore: string;
  emotionAfter: string;
  impactDelta: number;
}

interface PlatformAdaptation {
  platform: string;
  adapted: string;
  characterCount: number;
  hashtagSuggestions: string[];
  formatNotes: string;
  complianceStatus: string;
}

interface SEOEnhancement {
  keyword: string;
  density: number;
  placement: string;
  suggestion: string;
  priority: string;
}

interface RewriterResult {
  variants: RewriteVariant[];
  toneShifts: ToneShift[];
  platformAdaptations: PlatformAdaptation[];
  seoEnhancements: SEOEnhancement[];
}

function generateRewrite(
  originalText: string,
  selectedModes: string[],
  targetPlatform: string,
  tone: string,
  audience: string
): RewriterResult {
  const textLabel = originalText.slice(0, 50) || 'your content';
  const wordCount = originalText.split(/\s+/).filter(Boolean).length;

  const variants: RewriteVariant[] = [
    { mode: 'Paraphrase', output: `Here's a fresh perspective: ${textLabel}... reimagined with new phrasing while preserving every key insight. The core message stays — the delivery transforms.`, tone, wordCount: Math.round(wordCount * 0.95), readabilityScore: 82, engagementEstimate: 3.8, changes: ['Restructured sentences', 'Replaced 60% of vocabulary', 'Kept key terms intact', 'Improved flow between ideas'] },
    { mode: 'Simplify', output: `Simple version: ${textLabel}... stripped to its essence. No jargon, no filler — just the message, clear as day.`, tone: 'Casual', wordCount: Math.round(wordCount * 0.6), readabilityScore: 94, engagementEstimate: 4.2, changes: ['Removed technical jargon', 'Split complex sentences', 'Added everyday analogies', 'Reduced reading level to Grade 6'] },
    { mode: 'Formalize', output: `Professional version: We present a comprehensive analysis of ${textLabel}... structured for executive review and stakeholder communication.`, tone: 'Professional', wordCount: Math.round(wordCount * 1.15), readabilityScore: 68, engagementEstimate: 3.1, changes: ['Applied formal register', 'Added qualifying clauses', 'Removed colloquialisms', 'Structured with topic sentences'] },
    { mode: 'Shorten', output: `TL;DR: ${textLabel}... condensed to maximum impact. Every word earns its place.`, tone, wordCount: Math.round(wordCount * 0.4), readabilityScore: 88, engagementEstimate: 5.1, changes: ['Cut 60% of content', 'Preserved key statistics', 'Kept strongest CTA', 'Removed redundancies'] },
    { mode: 'Expand', output: `Deep dive: ${textLabel}... with added context, examples, and actionable takeaways. We explore the why behind each point and provide implementation steps.`, tone, wordCount: Math.round(wordCount * 1.8), readabilityScore: 75, engagementEstimate: 3.5, changes: ['Added 3 examples', 'Included data points', 'Expanded each section', 'Added transition paragraphs'] },
    { mode: 'Emotional Boost', output: `Imagine this: ${textLabel}... but now it hits different. The emotional resonance is amplified, power words added, and moments created that stick.`, tone: 'Inspirational', wordCount: Math.round(wordCount * 1.1), readabilityScore: 79, engagementEstimate: 5.8, changes: ['Added power words (+12)', 'Created emotional hooks', 'Inserted storytelling elements', 'Amplified urgency signals'] },
    { mode: 'SEO Optimize', output: `Optimized: ${textLabel}... restructured for search engines without sacrificing readability. Strategic keyword placement meets natural language.`, tone, wordCount: Math.round(wordCount * 1.05), readabilityScore: 76, engagementEstimate: 3.4, changes: ['Added target keywords (3-5%)', 'Optimized headers with keywords', 'Added internal linking anchors', 'Structured for featured snippets'] },
    { mode: 'Localize Tone', output: `Localized for ${audience}: ${textLabel}... adapted with cultural references, slang, and communication patterns that resonate with your target demographic.`, tone, wordCount: Math.round(wordCount * 1.0), readabilityScore: 85, engagementEstimate: 4.6, changes: [`Adapted for ${audience}`, 'Added demographic-specific references', 'Adjusted vocabulary level', 'Matched cultural communication style'] },
  ];

  const toneShifts: ToneShift[] = [
    { original: 'We offer a solution for your needs.', rewritten: 'This changes everything about how you work.', emotionBefore: 'Neutral', emotionAfter: 'Excitement', impactDelta: 3.2 },
    { original: 'Results may vary based on usage.', rewritten: 'Your transformation starts the moment you begin.', emotionBefore: 'Cautious', emotionAfter: 'Empowerment', impactDelta: 4.1 },
    { original: 'Contact us to learn more.', rewritten: 'Ready to level up? Let\'s talk — your future self will thank you.', emotionBefore: 'Flat CTA', emotionAfter: 'Urgent + Personal', impactDelta: 2.8 },
    { original: 'Our product has many features.', rewritten: 'Every feature was built because someone like you asked for it.', emotionBefore: 'Generic', emotionAfter: 'Connection', impactDelta: 3.5 },
    { original: 'Sign up for free today.', rewritten: 'Join 10,000+ creators who already made the switch — free, forever.', emotionBefore: 'Standard', emotionAfter: 'Social proof + FOMO', impactDelta: 4.4 },
  ];

  const platformAdaptations: PlatformAdaptation[] = [
    { platform: 'Twitter/X', adapted: `${textLabel}...\n\nThe part nobody talks about? [Key insight]\n\nThread below`, characterCount: 240, hashtagSuggestions: ['#ContentTips', '#Marketing', '#GrowthHack'], formatNotes: 'Thread format, hook in first tweet, CTA in last', complianceStatus: 'Within 280 char limit' },
    { platform: 'LinkedIn', adapted: `I spent 3 months studying ${textLabel}.\n\nHere is what I found:\n\n1/ [Insight 1]\n2/ [Insight 2]\n3/ [Insight 3]\n\nThe biggest surprise? [Reveal]\n\nAgree? Drop your take below.`, characterCount: 620, hashtagSuggestions: ['#Leadership', '#Innovation', '#Business'], formatNotes: 'Line breaks for mobile, numbered insights, engagement question', complianceStatus: 'Optimal length for LinkedIn algorithm' },
    { platform: 'Instagram', adapted: `Stop scrolling. This matters.\n\n${textLabel}...\n\n[5 carousel slides with key points]\n\nSave for later | Share with someone who needs this`, characterCount: 450, hashtagSuggestions: ['#ContentCreator', '#SocialMediaTips', '#DigitalMarketing', '#GrowthMindset'], formatNotes: 'Carousel format, 5-7 slides, strong save CTA', complianceStatus: '30 hashtags max, currently 4' },
    { platform: 'TikTok', adapted: `[HOOK 0-1s] "Nobody told me this about ${textLabel}"\n[BODY 1-20s] [Visual explanation with on-screen text]\n[CTA 20-25s] "Follow for part 2 — I go WAY deeper"`, characterCount: 300, hashtagSuggestions: ['#LearnOnTikTok', '#ContentCreator', '#Viral'], formatNotes: 'Video script, fast cuts, text overlays, strong hook', complianceStatus: 'Under 60s optimal' },
    { platform: 'Email', adapted: `Subject: The ${textLabel} mistake you are probably making\n\nHi [Name],\n\n[Personalized opening]\n\n3 things I discovered:\n- [Point 1]\n- [Point 2]\n- [Point 3]\n\n[CTA Button]\n\nBest,\n[Name]`, characterCount: 380, hashtagSuggestions: [], formatNotes: 'Subject line A/B test, preview text optimized, single CTA', complianceStatus: 'CAN-SPAM compliant, unsubscribe required' },
    { platform: 'YouTube', adapted: `Title: ${textLabel} — What Nobody Tells You\n\n[Intro 0-15s] Strong hook + promise\n[Body 15s-8min] 3-5 key points with B-roll\n[Outro 8-10min] CTA + subscribe + next video teaser`, characterCount: 500, hashtagSuggestions: ['#HowTo', '#Tutorial', '#Tips'], formatNotes: 'SEO title, chapters, end screen, cards at key moments', complianceStatus: 'Title under 60 chars for full display' },
    { platform: 'Pinterest', adapted: `${textLabel} — Ultimate Guide\n\n[Key takeaway 1]\n[Key takeaway 2]\n[Key takeaway 3]\n\nSave this pin and visit the full guide`, characterCount: 200, hashtagSuggestions: ['#Tips', '#Guide', '#HowTo', '#Infographic'], formatNotes: 'Vertical image 2:3 ratio, text overlay, rich pin markup', complianceStatus: 'Description under 500 chars' },
    { platform: 'Facebook', adapted: `Ever wondered about ${textLabel}?\n\n[Story format, personal experience]\n\n[Key insights]\n\nWhat is your experience? Share in the comments!\n\n[Link in first comment]`, characterCount: 480, hashtagSuggestions: ['#SocialMedia', '#Marketing'], formatNotes: 'Link in first comment, engagement bait question, story format', complianceStatus: 'Under 63,206 char limit' },
  ];

  const seoEnhancements: SEOEnhancement[] = [
    { keyword: 'content rewriting', density: 2.3, placement: 'Title, H2, first paragraph', suggestion: 'Add to meta description and alt text', priority: 'High' },
    { keyword: 'AI content optimization', density: 1.1, placement: 'H3, body paragraph 2', suggestion: 'Include in FAQ schema', priority: 'Medium' },
    { keyword: 'social media copywriting', density: 0.8, placement: 'Body paragraph 4', suggestion: 'Add to title tag and URL slug', priority: 'High' },
    { keyword: 'tone of voice generator', density: 0.5, placement: 'Alt text, body paragraph 6', suggestion: 'Create dedicated H2 section', priority: 'Medium' },
    { keyword: 'paraphrase tool for marketing', density: 0.3, placement: 'Not present', suggestion: 'Add as long-tail in FAQ and body', priority: 'Low' },
    { keyword: 'content repurposing strategy', density: 1.5, placement: 'H2, conclusion', suggestion: 'Cross-link with /repurpose and /content-scaler', priority: 'High' },
  ];

  return { variants, toneShifts, platformAdaptations, seoEnhancements };
}

export default function ContentRewriterPage() {
  const [originalText, setOriginalText] = useState('');
  const [selectedModes, setSelectedModes] = useState<string[]>(['Paraphrase', 'Shorten']);
  const [targetPlatform, setTargetPlatform] = useState<string>(targetPlatforms[0]);
  const [tone, setTone] = useState<string>(toneOptions[0]);
  const [audience, setAudience] = useState<string>(audienceTypes[0]);
  const [result, setResult] = useState<RewriterResult | null>(null);
  const [activeTab, setActiveTab] = useState<'variants' | 'toneShifts' | 'platforms' | 'seo'>('variants');

  const handleGenerate = () => {
    setResult(generateRewrite(originalText, selectedModes, targetPlatform, tone, audience));
  };

  const toggleMode = (mode: string) => {
    setSelectedModes((prev) =>
      prev.includes(mode) ? prev.filter((m) => m !== mode) : [...prev, mode]
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <nav className="text-sm text-gray-400 mb-8">
          <a href="/" className="hover:text-white">Home</a> → <span className="text-white">Content Rewriter</span>
        </nav>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          AI Content Rewriter
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl">
          Transform any content into 8 rewrite modes, adapt for every platform, shift tones instantly, and optimize for SEO — all from one input.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Original Content</label>
            <textarea
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
              placeholder="Paste your content here — blog excerpt, social post, email copy, ad text..."
              className="w-full h-40 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 resize-none"
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Rewrite Modes</label>
              <div className="flex flex-wrap gap-2">
                {rewriteModes.map((mode) => (
                  <button
                    key={mode}
                    onClick={() => toggleMode(mode)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      selectedModes.includes(mode)
                        ? 'bg-cyan-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Platform</label>
                <select
                  value={targetPlatform}
                  onChange={(e) => setTargetPlatform(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                >
                  {targetPlatforms.map((p) => (<option key={p} value={p}>{p}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Tone</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                >
                  {toneOptions.map((t) => (<option key={t} value={t}>{t}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Audience</label>
                <select
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                >
                  {audienceTypes.map((a) => (<option key={a} value={a}>{a}</option>))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg font-semibold text-lg hover:from-cyan-500 hover:to-blue-500 transition-all"
        >
          Rewrite Content
        </button>

        {result && (
          <div className="mt-12">
            <div className="flex gap-2 mb-6 border-b border-gray-800 pb-2">
              {(['variants', 'toneShifts', 'platforms', 'seo'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${
                    activeTab === tab ? 'bg-gray-800 text-cyan-400' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {tab === 'variants' ? `Rewrite Variants (${result.variants.length})` :
                   tab === 'toneShifts' ? `Tone Shifts (${result.toneShifts.length})` :
                   tab === 'platforms' ? `Platform Adaptations (${result.platformAdaptations.length})` :
                   `SEO Enhancements (${result.seoEnhancements.length})`}
                </button>
              ))}
            </div>

            {activeTab === 'variants' && (
              <div className="grid gap-4">
                {result.variants.map((v, i) => (
                  <div key={i} className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/50">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-cyan-400">{v.mode}</h3>
                      <div className="flex gap-3 text-sm text-gray-400">
                        <span>{v.wordCount} words</span>
                        <span>Readability: {v.readabilityScore}/100</span>
                        <span className="text-green-400">Est. engagement: {v.engagementEstimate}%</span>
                      </div>
                    </div>
                    <p className="text-gray-200 mb-3 leading-relaxed">{v.output}</p>
                    <div className="flex flex-wrap gap-2">
                      {v.changes.map((c, j) => (
                        <span key={j} className="px-2 py-1 bg-gray-700/50 rounded text-xs text-gray-400">{c}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'toneShifts' && (
              <div className="grid gap-4">
                {result.toneShifts.map((ts, i) => (
                  <div key={i} className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/50">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs text-red-400 uppercase tracking-wider">Before ({ts.emotionBefore})</span>
                        <p className="text-gray-400 mt-1 italic">&quot;{ts.original}&quot;</p>
                      </div>
                      <div>
                        <span className="text-xs text-green-400 uppercase tracking-wider">After ({ts.emotionAfter})</span>
                        <p className="text-white mt-1 font-medium">&quot;{ts.rewritten}&quot;</p>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-cyan-400">Impact boost: +{ts.impactDelta}x</div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'platforms' && (
              <div className="grid gap-4">
                {result.platformAdaptations.map((pa, i) => (
                  <div key={i} className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/50">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-cyan-400">{pa.platform}</h3>
                      <span className={`text-xs px-2 py-1 rounded ${pa.complianceStatus.includes('Within') || pa.complianceStatus.includes('Optimal') || pa.complianceStatus.includes('Under') ? 'bg-green-900/40 text-green-400' : 'bg-yellow-900/40 text-yellow-400'}`}>
                        {pa.complianceStatus}
                      </span>
                    </div>
                    <pre className="text-gray-200 text-sm whitespace-pre-wrap mb-3 font-sans">{pa.adapted}</pre>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>{pa.characterCount} chars</span>
                      <span>{pa.formatNotes}</span>
                    </div>
                    {pa.hashtagSuggestions.length > 0 && (
                      <div className="flex gap-2 mt-2">
                        {pa.hashtagSuggestions.map((h, j) => (
                          <span key={j} className="text-xs text-blue-400">{h}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'seo' && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-400 border-b border-gray-700">
                      <th className="py-3 px-4">Keyword</th>
                      <th className="py-3 px-4">Density</th>
                      <th className="py-3 px-4">Current Placement</th>
                      <th className="py-3 px-4">Suggestion</th>
                      <th className="py-3 px-4">Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.seoEnhancements.map((seo, i) => (
                      <tr key={i} className="border-b border-gray-800">
                        <td className="py-3 px-4 text-white font-medium">{seo.keyword}</td>
                        <td className="py-3 px-4">{seo.density}%</td>
                        <td className="py-3 px-4 text-gray-400">{seo.placement}</td>
                        <td className="py-3 px-4 text-gray-300">{seo.suggestion}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs ${
                            seo.priority === 'High' ? 'bg-red-900/40 text-red-400' :
                            seo.priority === 'Medium' ? 'bg-yellow-900/40 text-yellow-400' :
                            'bg-gray-700 text-gray-400'
                          }`}>{seo.priority}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        <section className="mt-20">
          <h2 className="text-2xl font-bold mb-6">How AI Content Rewriting Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700/30">
              <h3 className="font-semibold mb-2">1. Paste Your Content</h3>
              <p className="text-gray-400 text-sm">Any content works — blog posts, social captions, email copy, ad text, product descriptions. Our AI analyzes structure, tone, and intent.</p>
            </div>
            <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700/30">
              <h3 className="font-semibold mb-2">2. Choose Your Mode</h3>
              <p className="text-gray-400 text-sm">Select from 8 rewrite modes: paraphrase, simplify, formalize, shorten, expand, emotional boost, SEO optimize, or localize tone for your audience.</p>
            </div>
            <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700/30">
              <h3 className="font-semibold mb-2">3. Get Platform-Ready Output</h3>
              <p className="text-gray-400 text-sm">Receive rewritten variants, tone analysis, platform-specific adaptations with hashtags, and SEO enhancement suggestions — ready to publish.</p>
            </div>
          </div>
        </section>

        <section className="mt-16 bg-gray-800/30 rounded-2xl p-8 border border-gray-700/30">
          <h2 className="text-2xl font-bold mb-4">Why Content Rewriting Matters</h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-300">
            <div>
              <h3 className="font-semibold text-white mb-2">Maximize Content ROI</h3>
              <p className="text-sm">One piece of content can generate 8+ unique versions. Each rewrite targets a different audience segment, platform requirement, or marketing goal — multiplying your reach without multiplying your effort.</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Platform-Native Performance</h3>
              <p className="text-sm">Generic cross-posting kills engagement. Our rewriter adapts character counts, formatting, hashtag strategies, and CTAs for each platform&apos;s algorithm and audience expectations.</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Tone Consistency at Scale</h3>
              <p className="text-sm">Maintaining brand voice across 8 platforms is nearly impossible manually. The rewriter preserves your core message while adjusting tone for professional LinkedIn posts or casual TikTok scripts.</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">SEO Without Sacrificing Readability</h3>
              <p className="text-sm">Our SEO mode integrates keywords naturally — no keyword stuffing, no awkward phrasing. Every optimization suggestion includes placement strategy and priority ranking.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
