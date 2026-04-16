'use client';
import { useState } from 'react';

const platforms = ['Twitter/X', 'LinkedIn', 'Instagram', 'TikTok', 'Facebook', 'YouTube'] as const;
const goals = ['Engagement', 'Traffic', 'Conversions', 'Brand Awareness', 'Community', 'Thought Leadership'] as const;
const tones = ['Professional', 'Casual', 'Witty', 'Inspirational', 'Provocative', 'Educational', 'Storytelling', 'Urgent'] as const;

interface OptimizedCaption {
  platform: string;
  caption: string;
  charCount: number;
  charLimit: number;
  score: number;
  improvements: string[];
  hookStrength: string;
  ctaStrength: string;
  hashtagStrategy: string;
  emojiDensity: string;
  readabilityGrade: string;
  estimatedEngagement: string;
}

interface AnalysisResult {
  optimized: OptimizedCaption[];
  overallScore: number;
  crossPlatformTips: string[];
  abVariants: { platform: string; variantA: string; variantB: string }[];
}

const charLimits: Record<string, number> = { 'Twitter/X': 280, LinkedIn: 3000, Instagram: 2200, TikTok: 2200, Facebook: 5000, YouTube: 5000 };
const idealLengths: Record<string, string> = { 'Twitter/X': '71-100 chars', LinkedIn: '1300-2000 chars', Instagram: '138-150 or 2000+ chars', TikTok: '100-300 chars', Facebook: '40-80 chars', YouTube: '200-500 chars' };

function analyzeCaption(caption: string, platform: string, goal: string, tone: string): OptimizedCaption {
  const limit = charLimits[platform] || 2200;
  const len = caption.length;
  const words = caption.split(/\s+/).filter(Boolean);
  const sentences = caption.split(/[.!?]+/).filter(s => s.trim());
  const hasQuestion = /\?/.test(caption);
  const hasEmoji = /[\u{1F300}-\u{1FAFF}]/u.test(caption);
  const hashtagCount = (caption.match(/#\w+/g) || []).length;
  const hasCTA = /\b(click|link|comment|share|follow|subscribe|save|tag|dm|check out|grab|get|try|visit|tap|swipe)\b/i.test(caption);
  const hasHook = words.length >= 3 && (hasQuestion || /^(stop|wait|here|this|i |you |the |did |what |how |why |pov|imagine|unpopular)/i.test(caption));
  const lineBreaks = (caption.match(/\n/g) || []).length;
  const hasNumbers = /\d/.test(caption);

  let score = 50;
  const improvements: string[] = [];

  // Length scoring
  if (platform === 'Twitter/X') {
    if (len <= 280) score += 10; else { score -= 20; improvements.push(`Shorten to ${limit} chars (currently ${len})`); }
    if (len >= 71 && len <= 100) score += 10;
    else if (len < 71) improvements.push('Tweets with 71-100 characters get 17% more engagement');
  } else if (platform === 'LinkedIn') {
    if (len >= 1300) score += 10;
    if (lineBreaks >= 3) score += 5; else improvements.push('Add line breaks every 1-2 sentences for LinkedIn readability');
    if (!hasHook) improvements.push('LinkedIn algorithm weights the first 2 lines heavily — add a strong hook');
  } else if (platform === 'Instagram') {
    if (len >= 2000) score += 5;
    else if (len >= 138 && len <= 150) score += 10;
    if (hashtagCount < 3) improvements.push('Add 3-5 relevant hashtags (Instagram still indexes them for search)');
    if (hashtagCount > 15) improvements.push('Reduce hashtags to 5-10 — Instagram 2026 algorithm penalizes hashtag stuffing');
  } else if (platform === 'TikTok') {
    if (len <= 300) score += 10; else improvements.push('TikTok captions under 300 chars get more saves');
    if (!hasEmoji) improvements.push('Add 1-2 emojis — TikTok users expect casual, visual captions');
  }

  // Hook
  if (hasHook) { score += 15; }
  else { improvements.push('Start with a hook — question, bold statement, or "POV:" to stop the scroll'); }
  const hookStrength = hasHook ? (hasQuestion ? 'Strong (Question)' : 'Good (Statement)') : 'Weak — needs attention';

  // CTA
  if (hasCTA) { score += 10; }
  else { improvements.push(`Add a CTA aligned with your ${goal.toLowerCase()} goal`); }
  const ctaStrength = hasCTA ? 'Present' : 'Missing — add one';

  // Hashtags
  let hashtagStrategy = 'None';
  if (hashtagCount >= 1 && hashtagCount <= 5) { hashtagStrategy = 'Optimal (1-5)'; score += 5; }
  else if (hashtagCount > 5 && hashtagCount <= 15) { hashtagStrategy = 'Moderate (6-15)'; score += 3; }
  else if (hashtagCount > 15) { hashtagStrategy = 'Overstuffed (15+)'; score -= 5; }

  // Emoji density
  const emojiCount = (caption.match(/[\u{1F300}-\u{1FAFF}]/gu) || []).length;
  let emojiDensity = 'None';
  if (emojiCount >= 1 && emojiCount <= 3) { emojiDensity = 'Light (1-3)'; score += 3; }
  else if (emojiCount > 3 && emojiCount <= 8) { emojiDensity = 'Moderate (4-8)'; score += 2; }
  else if (emojiCount > 8) { emojiDensity = 'Heavy (8+)'; score -= 3; }

  // Readability
  const avgWordsPerSentence = sentences.length > 0 ? words.length / sentences.length : words.length;
  let readabilityGrade = 'Good';
  if (avgWordsPerSentence > 25) { readabilityGrade = 'Complex'; improvements.push('Break long sentences into shorter ones (15-20 words ideal)'); }
  else if (avgWordsPerSentence <= 15) { readabilityGrade = 'Excellent'; score += 5; }

  // Numbers/data
  if (hasNumbers) { score += 5; } else { improvements.push('Add a specific number or stat — "3 tips" performs 40% better than "some tips"'); }

  // Tone alignment
  if (tone === 'Professional' && /lol|lmao|bruh|ngl/i.test(caption)) { score -= 5; improvements.push('Casual language detected — adjust for professional tone'); }
  if (tone === 'Casual' && /hereby|furthermore|consequently/i.test(caption)) { score -= 5; improvements.push('Formal language detected — adjust for casual tone'); }

  score = Math.max(0, Math.min(100, score));

  const engagementEstimates: Record<string, string> = {
    'Twitter/X': score >= 80 ? '2.5-4% CTR' : score >= 60 ? '1.5-2.5% CTR' : '0.5-1.5% CTR',
    LinkedIn: score >= 80 ? '5-8% engagement' : score >= 60 ? '2-5% engagement' : '1-2% engagement',
    Instagram: score >= 80 ? '4-7% engagement' : score >= 60 ? '2-4% engagement' : '0.5-2% engagement',
    TikTok: score >= 80 ? '8-15% engagement' : score >= 60 ? '4-8% engagement' : '1-4% engagement',
    Facebook: score >= 80 ? '3-5% engagement' : score >= 60 ? '1-3% engagement' : '0.5-1% engagement',
    YouTube: score >= 80 ? '5-10% CTR' : score >= 60 ? '2-5% CTR' : '1-2% CTR',
  };

  return {
    platform,
    caption,
    charCount: len,
    charLimit: limit,
    score,
    improvements,
    hookStrength,
    ctaStrength,
    hashtagStrategy,
    emojiDensity,
    readabilityGrade,
    estimatedEngagement: engagementEstimates[platform] || '2-4%',
  };
}

function getScoreColor(s: number): string {
  if (s >= 80) return 'text-green-400';
  if (s >= 60) return 'text-yellow-400';
  if (s >= 40) return 'text-orange-400';
  return 'text-red-400';
}

function getScoreLabel(s: number): string {
  if (s >= 90) return 'Exceptional';
  if (s >= 80) return 'Excellent';
  if (s >= 70) return 'Good';
  if (s >= 60) return 'Average';
  if (s >= 40) return 'Needs Work';
  return 'Poor';
}

export default function CaptionOptimizerPage() {
  const [caption, setCaption] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['Twitter/X', 'LinkedIn', 'Instagram']);
  const [goal, setGoal] = useState<string>('Engagement');
  const [tone, setTone] = useState<string>('Professional');
  const [result, setResult] = useState<AnalysisResult | null>(null);

  function togglePlatform(p: string) {
    setSelectedPlatforms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  }

  function optimize() {
    const optimized = selectedPlatforms.map(p => analyzeCaption(caption, p, goal, tone));
    const overallScore = Math.round(optimized.reduce((a, b) => a + b.score, 0) / optimized.length);

    const crossPlatformTips: string[] = [
      'Post your best-performing platform version first, then adapt based on early engagement data.',
      `For ${goal.toLowerCase()} goals, prioritize ${goal === 'Engagement' ? 'questions and polls' : goal === 'Traffic' ? 'clear link CTAs with value props' : goal === 'Conversions' ? 'urgency + social proof + benefit-first CTAs' : goal === 'Brand Awareness' ? 'shareable, relatable content' : goal === 'Community' ? 'conversation starters and user mentions' : 'data-backed insights and frameworks'}.`,
      'Repurpose, don\'t copy-paste — each platform has different engagement patterns, character sweet spots, and formatting expectations.',
      `Best posting window for ${goal.toLowerCase()}: ${goal === 'Engagement' ? '9-11 AM and 7-9 PM local time' : goal === 'Traffic' ? '11 AM - 1 PM (lunch break browsing)' : 'Tuesday-Thursday, 10 AM - 2 PM'}.`,
    ];

    const abVariants = selectedPlatforms.slice(0, 3).map(p => {
      const words = caption.split(/\s+/).filter(Boolean);
      const firstFew = words.slice(0, 5).join(' ');
      return {
        platform: p,
        variantA: `Did you know? ${caption.slice(0, Math.min(caption.length, charLimits[p] - 20))}`,
        variantB: `Here's what nobody tells you about ${firstFew}... ${caption.slice(firstFew.length + 4, Math.min(caption.length, charLimits[p] - 20))}`,
      };
    });

    setResult({ optimized, overallScore, crossPlatformTips, abVariants });
  }

  return (
    <main className="min-h-screen px-6 py-20 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-xs text-purple-400 uppercase tracking-widest mb-2 font-semibold">New Tool</p>
        <h1 className="text-4xl font-bold mb-3">
          Cross-Platform <span className="gradient-text">Caption Optimizer</span>
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          Paste your caption and get a detailed optimization score for every platform.
          Hook strength, CTA analysis, readability, hashtag strategy, and engagement estimates — all in one view.
        </p>
      </div>

      {/* Input */}
      <div className="glass rounded-2xl p-6 mb-8">
        <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Your caption</label>
        <textarea
          value={caption}
          onChange={e => setCaption(e.target.value)}
          rows={6}
          placeholder="Paste your social media caption here..."
          className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-purple-500 transition mb-2 resize-none"
        />
        <p className="text-xs text-zinc-600 mb-5">{caption.length} characters</p>

        <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Platforms to optimize for</label>
        <div className="flex flex-wrap gap-2 mb-5">
          {platforms.map(p => (
            <button key={p} onClick={() => togglePlatform(p)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition ${selectedPlatforms.includes(p) ? 'bg-purple-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
              {p} <span className="text-zinc-500 ml-1">({charLimits[p]})</span>
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Goal</label>
            <div className="flex flex-wrap gap-2">
              {goals.map(g => (
                <button key={g} onClick={() => setGoal(g)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition ${goal === g ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
                  {g}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Tone</label>
            <div className="flex flex-wrap gap-2">
              {tones.map(t => (
                <button key={t} onClick={() => setTone(t)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition ${tone === t ? 'bg-pink-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button onClick={optimize} disabled={!caption.trim() || selectedPlatforms.length === 0}
          className="w-full py-3.5 btn-primary rounded-xl font-semibold text-white">
          Optimize Caption
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-8 fade-in">
          {/* Overall Score */}
          <div className="glass rounded-2xl p-6 text-center">
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Overall Optimization Score</p>
            <p className={`text-6xl font-bold ${getScoreColor(result.overallScore)}`}>{result.overallScore}</p>
            <p className="text-sm text-zinc-400 mt-1">{getScoreLabel(result.overallScore)} — across {result.optimized.length} platforms</p>
          </div>

          {/* Per-Platform Analysis */}
          {result.optimized.map((opt, i) => (
            <div key={i} className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">{opt.platform}</h2>
                <div className="flex items-center gap-3">
                  <span className={`text-2xl font-bold ${getScoreColor(opt.score)}`}>{opt.score}/100</span>
                  <span className="text-xs text-zinc-500">{getScoreLabel(opt.score)}</span>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div className="bg-zinc-900/40 rounded-lg p-3">
                  <p className="text-xs text-zinc-500">Characters</p>
                  <p className="text-sm font-semibold">{opt.charCount} / {opt.charLimit}</p>
                  <p className="text-xs text-zinc-600">Ideal: {idealLengths[opt.platform]}</p>
                </div>
                <div className="bg-zinc-900/40 rounded-lg p-3">
                  <p className="text-xs text-zinc-500">Hook</p>
                  <p className="text-sm font-semibold">{opt.hookStrength}</p>
                </div>
                <div className="bg-zinc-900/40 rounded-lg p-3">
                  <p className="text-xs text-zinc-500">CTA</p>
                  <p className="text-sm font-semibold">{opt.ctaStrength}</p>
                </div>
                <div className="bg-zinc-900/40 rounded-lg p-3">
                  <p className="text-xs text-zinc-500">Est. Engagement</p>
                  <p className="text-sm font-semibold text-purple-400">{opt.estimatedEngagement}</p>
                </div>
                <div className="bg-zinc-900/40 rounded-lg p-3">
                  <p className="text-xs text-zinc-500">Hashtags</p>
                  <p className="text-sm font-semibold">{opt.hashtagStrategy}</p>
                </div>
                <div className="bg-zinc-900/40 rounded-lg p-3">
                  <p className="text-xs text-zinc-500">Emojis</p>
                  <p className="text-sm font-semibold">{opt.emojiDensity}</p>
                </div>
                <div className="bg-zinc-900/40 rounded-lg p-3">
                  <p className="text-xs text-zinc-500">Readability</p>
                  <p className="text-sm font-semibold">{opt.readabilityGrade}</p>
                </div>
                <div className="bg-zinc-900/40 rounded-lg p-3">
                  <p className="text-xs text-zinc-500">Score</p>
                  <div className="w-full bg-zinc-800 rounded-full h-2 mt-2">
                    <div className={`h-2 rounded-full ${opt.score >= 80 ? 'bg-green-500' : opt.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${opt.score}%` }} />
                  </div>
                </div>
              </div>

              {/* Improvements */}
              {opt.improvements.length > 0 && (
                <div className="bg-zinc-900/30 rounded-xl p-4">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Improvements</p>
                  <div className="space-y-1">
                    {opt.improvements.map((imp, j) => (
                      <div key={j} className="flex gap-2 text-sm">
                        <span className="text-yellow-400 mt-0.5">!</span>
                        <span className="text-zinc-300">{imp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* A/B Variants */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">A/B Test Variants</h2>
            <div className="space-y-4">
              {result.abVariants.map((v, i) => (
                <div key={i} className="bg-zinc-900/40 rounded-xl p-4">
                  <p className="text-xs text-purple-400 mb-2">{v.platform}</p>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="bg-zinc-900/50 rounded-lg p-3">
                      <p className="text-xs text-zinc-500 mb-1">Variant A (Question hook)</p>
                      <p className="text-sm text-zinc-300">{v.variantA.slice(0, charLimits[v.platform])}</p>
                    </div>
                    <div className="bg-zinc-900/50 rounded-lg p-3">
                      <p className="text-xs text-zinc-500 mb-1">Variant B (Curiosity gap)</p>
                      <p className="text-sm text-zinc-300">{v.variantB.slice(0, charLimits[v.platform])}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cross-Platform Tips */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Cross-Platform Strategy</h2>
            <div className="space-y-3">
              {result.crossPlatformTips.map((tip, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-purple-400 font-bold text-sm mt-0.5">{i + 1}.</span>
                  <p className="text-sm text-zinc-300">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SEO Content */}
      <section className="mt-16 space-y-8">
        <div className="glass rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">Why Optimize Captions for Each Platform?</h2>
          <p className="text-sm text-zinc-400 mb-3">A caption that works on LinkedIn will fail on TikTok. Each platform has different character limits, engagement patterns, algorithm priorities, and audience expectations.</p>
          <p className="text-sm text-zinc-400 mb-3">Our Caption Optimizer analyzes 8 dimensions of your caption: hook strength, CTA presence, hashtag strategy, emoji density, readability, length optimization, tone alignment, and platform-specific formatting.</p>
          <p className="text-sm text-zinc-400">The result: a detailed score and actionable improvements for every platform — so you can stop guessing and start posting captions that actually perform.</p>
        </div>

        <div className="glass rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">Caption Optimization FAQ</h2>
          <div className="space-y-4">
            {[
              ['What makes a good social media caption?', 'A strong hook (first 1-2 lines), clear value, appropriate length for the platform, a relevant CTA, strategic hashtags, and readability. Our optimizer scores all of these.'],
              ['Should I use the same caption on every platform?', 'No. Adapt your core message: shorter for Twitter/X, professional for LinkedIn, visual for Instagram, casual for TikTok. Same idea, different execution.'],
              ['How many hashtags should I use?', 'It depends: Twitter/X: 1-3, LinkedIn: 3-5, Instagram: 5-10 (2026 algorithm), TikTok: 3-5 (in caption), Facebook: 0-2, YouTube: none in description.'],
              ['Do emojis improve engagement?', 'Yes, when used strategically. 1-3 emojis increase engagement 15-25% on most platforms. Over-using them (8+) hurts credibility, especially on LinkedIn and Twitter/X.'],
              ['What is a "hook" in a caption?', 'The first line or sentence that makes someone stop scrolling. Questions, bold claims, statistics, "POV:" statements, and pattern interrupts are proven hooks.'],
            ].map(([q, a], i) => (
              <div key={i}>
                <h3 className="font-semibold text-sm mb-1">{q}</h3>
                <p className="text-sm text-zinc-400">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="mt-12 glass rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-4">Related Tools</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            ['/social-seo', 'Social SEO Keywords', 'Rank on social search'],
            ['/hooks', 'Hook Generator', '10 scroll-stopping hooks'],
            ['/hashtags', 'Hashtag Generator', 'Platform-optimized tags'],
            ['/cta-generator', 'CTA Generator', 'High-converting CTAs'],
            ['/repurpose', 'Content Repurposer', 'One source, all platforms'],
            ['/sentiment-analyzer', 'Sentiment Analyzer', 'Emotional impact score'],
            ['/brand-voice', 'Brand Voice', 'Define your tone'],
            ['/engagement-calculator', 'Engagement Calc', 'Rate your performance'],
          ].map(([href, title, desc]) => (
            <a key={href} href={href} className="glass rounded-xl p-3 hover:border-purple-500/30 transition">
              <p className="font-semibold text-xs">{title}</p>
              <p className="text-xs text-zinc-500 mt-1">{desc}</p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
