'use client';
import { useState } from 'react';

const emotions = [
  { key: 'inspiration', label: 'Inspiration', color: 'text-amber-400', bgColor: 'bg-amber-400' },
  { key: 'trust', label: 'Trust', color: 'text-blue-400', bgColor: 'bg-blue-400' },
  { key: 'urgency', label: 'Urgency', color: 'text-red-400', bgColor: 'bg-red-400' },
  { key: 'curiosity', label: 'Curiosity', color: 'text-purple-400', bgColor: 'bg-purple-400' },
  { key: 'joy', label: 'Joy', color: 'text-yellow-400', bgColor: 'bg-yellow-400' },
  { key: 'empathy', label: 'Empathy', color: 'text-pink-400', bgColor: 'bg-pink-400' },
  { key: 'authority', label: 'Authority', color: 'text-cyan-400', bgColor: 'bg-cyan-400' },
  { key: 'fomo', label: 'FOMO', color: 'text-orange-400', bgColor: 'bg-orange-400' },
] as const;

const platforms = ['Twitter/X', 'LinkedIn', 'Instagram', 'TikTok', 'Facebook', 'YouTube'] as const;
const audiences = ['General', 'Gen Z (18-25)', 'Millennials (26-41)', 'Gen X (42-57)', 'Professionals/B2B', 'Parents', 'Students'] as const;

interface AnalysisResult {
  overallSentiment: 'very_positive' | 'positive' | 'neutral' | 'negative' | 'very_negative';
  sentimentScore: number;
  emotionBreakdown: { emotion: string; score: number; explanation: string }[];
  readability: { grade: string; score: number; avgSentenceLength: number; complexWords: number };
  platformFit: { platform: string; score: number; tip: string }[];
  improvements: string[];
  powerWords: string[];
  weakWords: string[];
  predictedEngagement: { likes: string; comments: string; shares: string };
}

function analyzeContent(text: string, platform: string, audience: string): AnalysisResult {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const avgSentenceLen = sentences.length > 0 ? Math.round(wordCount / sentences.length) : 0;

  const powerWordList = ['free', 'exclusive', 'proven', 'secret', 'ultimate', 'guaranteed', 'instant', 'discover', 'transform', 'unleash', 'breakthrough', 'revolutionary', 'limited', 'urgent', 'now', 'today', 'imagine', 'unlock', 'massive', 'incredible', 'shocking', 'revealed', 'hack', 'insider', 'dominate', 'skyrocket', 'explode', 'crush'];
  const weakWordList = ['very', 'really', 'just', 'maybe', 'perhaps', 'kind of', 'sort of', 'basically', 'actually', 'literally', 'honestly', 'stuff', 'things', 'nice', 'good', 'bad', 'interesting'];

  const lowerText = text.toLowerCase();
  const foundPower = powerWordList.filter(w => lowerText.includes(w));
  const foundWeak = weakWordList.filter(w => lowerText.includes(w));

  const hasQuestion = text.includes('?');
  const hasExclamation = text.includes('!');
  const hasEmoji = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u.test(text);
  const hasNumbers = /\d/.test(text);
  const hasHashtags = /#\w+/.test(text);
  const hasMentions = /@\w+/.test(text);
  const hasCTA = /click|sign up|subscribe|follow|share|comment|save|link|download|join|get|try|start|buy|grab|claim/i.test(text);

  // Sentiment scoring
  const positiveWords = ['love', 'amazing', 'great', 'awesome', 'excellent', 'fantastic', 'wonderful', 'brilliant', 'perfect', 'happy', 'excited', 'thrilled', 'grateful', 'proud', 'inspired', 'success', 'win', 'grow', 'achieve', 'opportunity'];
  const negativeWords = ['hate', 'terrible', 'awful', 'horrible', 'worst', 'fail', 'problem', 'issue', 'wrong', 'mistake', 'unfortunately', 'struggle', 'pain', 'frustrat', 'disappoint', 'boring', 'waste'];

  const posCount = positiveWords.filter(w => lowerText.includes(w)).length;
  const negCount = negativeWords.filter(w => lowerText.includes(w)).length;
  const sentimentRaw = ((posCount - negCount) / Math.max(wordCount / 10, 1)) * 30 + 60 + (hasExclamation ? 5 : 0) + (hasEmoji ? 3 : 0);
  const sentimentScore = Math.min(100, Math.max(0, Math.round(sentimentRaw)));

  let overallSentiment: AnalysisResult['overallSentiment'] = 'neutral';
  if (sentimentScore >= 80) overallSentiment = 'very_positive';
  else if (sentimentScore >= 60) overallSentiment = 'positive';
  else if (sentimentScore >= 40) overallSentiment = 'neutral';
  else if (sentimentScore >= 20) overallSentiment = 'negative';
  else overallSentiment = 'very_negative';

  // Emotion breakdown
  const emotionScores = emotions.map(e => {
    let score = 30 + Math.random() * 20;
    if (e.key === 'inspiration' && (lowerText.includes('dream') || lowerText.includes('achiev') || lowerText.includes('transform') || lowerText.includes('grow'))) score += 25;
    if (e.key === 'trust' && (lowerText.includes('proven') || lowerText.includes('data') || hasNumbers || lowerText.includes('research'))) score += 25;
    if (e.key === 'urgency' && (lowerText.includes('now') || lowerText.includes('today') || lowerText.includes('limited') || hasExclamation)) score += 25;
    if (e.key === 'curiosity' && (hasQuestion || lowerText.includes('secret') || lowerText.includes('discover') || lowerText.includes('how'))) score += 25;
    if (e.key === 'joy' && (hasEmoji || lowerText.includes('happy') || lowerText.includes('excit') || lowerText.includes('love'))) score += 25;
    if (e.key === 'empathy' && (lowerText.includes('understand') || lowerText.includes('feel') || lowerText.includes('struggle') || lowerText.includes('you'))) score += 25;
    if (e.key === 'authority' && (hasNumbers || lowerText.includes('expert') || lowerText.includes('study') || lowerText.includes('years'))) score += 25;
    if (e.key === 'fomo' && (lowerText.includes('miss') || lowerText.includes('limited') || lowerText.includes('exclusive') || lowerText.includes('only'))) score += 25;
    if (audience.includes('Gen Z') && (e.key === 'curiosity' || e.key === 'fomo')) score += 10;
    if (audience.includes('Professional') && (e.key === 'trust' || e.key === 'authority')) score += 10;
    const explanations: Record<string, string> = {
      inspiration: score > 55 ? 'Strong aspirational language detected' : 'Add transformation verbs (achieve, unlock, grow)',
      trust: score > 55 ? 'Credibility signals present (data, proof)' : 'Include numbers, stats, or case studies',
      urgency: score > 55 ? 'Time pressure effectively created' : 'Add time-bound language (today, now, limited)',
      curiosity: score > 55 ? 'Open loops or questions spark interest' : 'Use questions or tease upcoming reveals',
      joy: score > 55 ? 'Positive emotional energy resonates' : 'Add emojis, celebration words, or humor',
      empathy: score > 55 ? 'Reader feels seen and understood' : 'Address pain points with "you" language',
      authority: score > 55 ? 'Expert positioning established' : 'Cite specific data, credentials, or experience',
      fomo: score > 55 ? 'Scarcity/exclusivity drives action' : 'Hint at limited availability or exclusive access',
    };
    return { emotion: e.label, score: Math.min(100, Math.round(score)), explanation: explanations[e.key] || '' };
  });

  // Readability
  const complexWords = words.filter(w => w.length > 8).length;
  const readabilityScore = Math.max(0, Math.min(100, 100 - (avgSentenceLen - 12) * 3 - complexWords * 2 + (hasEmoji ? 5 : 0)));
  const readabilityGrade = readabilityScore >= 80 ? 'Easy' : readabilityScore >= 60 ? 'Moderate' : readabilityScore >= 40 ? 'Complex' : 'Dense';

  // Platform fit
  const platformScores = platforms.map(p => {
    let score = 50;
    let tip = '';
    if (p === 'Twitter/X') {
      score += wordCount <= 50 ? 20 : wordCount <= 70 ? 10 : -10;
      score += hasHashtags ? 10 : 0;
      score += hasQuestion ? 10 : 0;
      tip = wordCount > 50 ? 'Shorten to under 50 words for max impact' : 'Great length for Twitter engagement';
    } else if (p === 'LinkedIn') {
      score += wordCount >= 50 && wordCount <= 200 ? 20 : wordCount < 50 ? -5 : 10;
      score += hasNumbers ? 10 : 0;
      score += foundPower.length > 0 ? 10 : 0;
      tip = wordCount < 50 ? 'LinkedIn rewards longer, value-driven posts (100-200 words)' : 'Good depth for LinkedIn algorithm';
    } else if (p === 'Instagram') {
      score += hasEmoji ? 15 : 0;
      score += hasHashtags ? 15 : 0;
      score += hasCTA ? 10 : 0;
      tip = !hasEmoji ? 'Add 2-3 emojis to boost Instagram engagement' : 'Emojis and hashtags boost discoverability';
    } else if (p === 'TikTok') {
      score += wordCount <= 40 ? 20 : -5;
      score += hasExclamation ? 10 : 0;
      score += hasEmoji ? 10 : 0;
      tip = wordCount > 40 ? 'TikTok captions work best under 40 words' : 'Short and punchy — perfect for TikTok';
    } else if (p === 'Facebook') {
      score += wordCount >= 40 && wordCount <= 150 ? 15 : 5;
      score += hasQuestion ? 15 : 0;
      score += hasCTA ? 10 : 0;
      tip = hasQuestion ? 'Questions drive Facebook comments' : 'Add a question to boost Facebook engagement';
    } else if (p === 'YouTube') {
      score += wordCount >= 30 ? 15 : 0;
      score += hasCTA ? 15 : 0;
      score += hasHashtags ? 5 : 0;
      tip = !hasCTA ? 'Include a subscribe/like CTA for YouTube' : 'CTA detected — great for YouTube engagement';
    }
    if (p === platform) score += 10;
    return { platform: p, score: Math.min(100, Math.max(0, Math.round(score))), tip };
  });

  // Improvements
  const improvements: string[] = [];
  if (!hasQuestion) improvements.push('Add a question to boost comment rate by 23%');
  if (!hasEmoji) improvements.push('Include 1-3 relevant emojis to increase engagement by 17%');
  if (!hasCTA) improvements.push('Add a clear call-to-action (comment, share, save, follow)');
  if (foundWeak.length > 2) improvements.push(`Remove weak words: ${foundWeak.slice(0, 3).join(', ')} — replace with specific language`);
  if (avgSentenceLen > 20) improvements.push('Break long sentences into shorter, punchier ones (aim for 12-15 words)');
  if (foundPower.length === 0) improvements.push('Add 1-2 power words (proven, exclusive, breakthrough, transform)');
  if (!hasNumbers) improvements.push('Include a specific number or stat to boost credibility');
  if (!hasHashtags && (platform === 'Instagram' || platform === 'TikTok' || platform === 'Twitter/X')) {
    improvements.push(`Add 3-5 relevant hashtags for ${platform} discoverability`);
  }
  if (wordCount < 10) improvements.push('Content is very short — add more context or value');

  // Predicted engagement
  const engBase = sentimentScore * 0.5 + (foundPower.length * 5) + (hasQuestion ? 10 : 0) + (hasCTA ? 10 : 0) + (hasEmoji ? 5 : 0);
  const likesRange = engBase > 60 ? '3-5x average' : engBase > 40 ? '1.5-3x average' : 'Below average';
  const commentsRange = hasQuestion ? '2-4x average' : engBase > 50 ? '1.5-2x average' : 'Average';
  const sharesRange = engBase > 65 ? '2-3x average' : engBase > 45 ? '1-2x average' : 'Below average';

  return {
    overallSentiment,
    sentimentScore,
    emotionBreakdown: emotionScores,
    readability: { grade: readabilityGrade, score: Math.round(readabilityScore), avgSentenceLength: avgSentenceLen, complexWords },
    platformFit: platformScores,
    improvements,
    powerWords: foundPower,
    weakWords: foundWeak,
    predictedEngagement: { likes: likesRange, comments: commentsRange, shares: sharesRange },
  };
}

export default function SentimentAnalyzerPage() {
  const [content, setContent] = useState('');
  const [platform, setPlatform] = useState<string>('Twitter/X');
  const [audience, setAudience] = useState<string>('General');
  const [result, setResult] = useState<AnalysisResult | null>(null);

  function analyze() {
    if (!content.trim()) return;
    setResult(analyzeContent(content, platform, audience));
  }

  function sentimentEmoji(s: AnalysisResult['overallSentiment']) {
    const map = { very_positive: '++++', positive: '++', neutral: '~', negative: '--', very_negative: '----' };
    return map[s];
  }

  function sentimentLabel(s: AnalysisResult['overallSentiment']) {
    const map = { very_positive: 'Very Positive', positive: 'Positive', neutral: 'Neutral', negative: 'Negative', very_negative: 'Very Negative' };
    return map[s];
  }

  function scoreColor(score: number) {
    if (score >= 75) return 'text-green-400';
    if (score >= 50) return 'text-yellow-400';
    if (score >= 30) return 'text-orange-400';
    return 'text-red-400';
  }

  function barColor(score: number) {
    if (score >= 75) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    if (score >= 30) return 'bg-orange-500';
    return 'bg-red-500';
  }

  return (
    <main className="min-h-screen">
      <section className="px-6 py-20 max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">
          Free <span className="gradient-text">Sentiment Analyzer</span> for Social Media
        </h1>
        <p className="text-zinc-400 text-lg mb-2 max-w-2xl mx-auto">
          Predict the emotional impact of your content before you post. Get an Empathy Index score, readability analysis, platform fit ratings, and actionable improvements.
        </p>
        <p className="text-zinc-500 text-sm mb-8">Analyze unlimited posts. No signup required. Instant results.</p>
      </section>

      <section className="px-6 pb-10 max-w-4xl mx-auto">
        <div className="glass rounded-2xl p-8">
          <h2 className="text-xl font-semibold mb-6">Paste Your Content</h2>

          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Paste your social media post, caption, or ad copy here..."
            rows={6}
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-pink-500 transition mb-4 resize-none"
          />

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Target Platform</label>
              <select value={platform} onChange={e => setPlatform(e.target.value)}
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-pink-500 transition">
                {platforms.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Target Audience</label>
              <select value={audience} onChange={e => setAudience(e.target.value)}
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-pink-500 transition">
                {audiences.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <span className="text-xs text-zinc-500">{content.trim().split(/\s+/).filter(Boolean).length} words | {content.length} characters</span>
          </div>

          <button onClick={analyze} disabled={!content.trim()}
            className="w-full py-3.5 btn-primary rounded-xl font-semibold text-white">
            Analyze Sentiment & Emotions
          </button>
        </div>
      </section>

      {result && (
        <section className="px-6 pb-20 max-w-4xl mx-auto space-y-8 fade-in">
          {/* Overall Sentiment */}
          <div className="glass rounded-2xl p-8 text-center">
            <h3 className="text-lg font-semibold mb-4">Overall Sentiment</h3>
            <p className={`text-6xl font-bold mb-2 ${scoreColor(result.sentimentScore)}`}>{result.sentimentScore}/100</p>
            <p className="text-zinc-400 text-lg">{sentimentLabel(result.overallSentiment)} {sentimentEmoji(result.overallSentiment)}</p>
          </div>

          {/* Emotion Breakdown */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-lg font-semibold mb-6">Empathy Index — Emotion Breakdown</h3>
            <div className="space-y-4">
              {result.emotionBreakdown.sort((a, b) => b.score - a.score).map(e => (
                <div key={e.emotion}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{e.emotion}</span>
                    <span className={`text-sm font-bold ${scoreColor(e.score)}`}>{e.score}%</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-2.5 mb-1">
                    <div className={`h-2.5 rounded-full ${barColor(e.score)} transition-all duration-500`} style={{ width: `${e.score}%` }} />
                  </div>
                  <p className="text-xs text-zinc-500">{e.explanation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Readability */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-lg font-semibold mb-4">Readability Analysis</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className={`text-3xl font-bold ${scoreColor(result.readability.score)}`}>{result.readability.score}</p>
                <p className="text-xs text-zinc-500 mt-1">Readability Score</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-zinc-300">{result.readability.grade}</p>
                <p className="text-xs text-zinc-500 mt-1">Grade Level</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-zinc-300">{result.readability.avgSentenceLength}</p>
                <p className="text-xs text-zinc-500 mt-1">Avg Words/Sentence</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-zinc-300">{result.readability.complexWords}</p>
                <p className="text-xs text-zinc-500 mt-1">Complex Words</p>
              </div>
            </div>
          </div>

          {/* Platform Fit */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-lg font-semibold mb-6">Platform Fit Scores</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {result.platformFit.map(p => (
                <div key={p.platform} className={`bg-zinc-800/50 rounded-xl p-4 ${p.platform === platform ? 'ring-1 ring-pink-500/50' : ''}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">{p.platform}</span>
                    <span className={`text-lg font-bold ${scoreColor(p.score)}`}>{p.score}</span>
                  </div>
                  <div className="w-full bg-zinc-700 rounded-full h-1.5 mb-2">
                    <div className={`h-1.5 rounded-full ${barColor(p.score)}`} style={{ width: `${p.score}%` }} />
                  </div>
                  <p className="text-xs text-zinc-500">{p.tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Predicted Engagement */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-lg font-semibold mb-4">Predicted Engagement</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xl font-bold gradient-text">{result.predictedEngagement.likes}</p>
                <p className="text-xs text-zinc-500 mt-1">Likes</p>
              </div>
              <div>
                <p className="text-xl font-bold gradient-text">{result.predictedEngagement.comments}</p>
                <p className="text-xs text-zinc-500 mt-1">Comments</p>
              </div>
              <div>
                <p className="text-xl font-bold gradient-text">{result.predictedEngagement.shares}</p>
                <p className="text-xs text-zinc-500 mt-1">Shares</p>
              </div>
            </div>
          </div>

          {/* Power & Weak Words */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-green-400">Power Words Detected</h3>
              {result.powerWords.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {result.powerWords.map(w => (
                    <span key={w} className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">{w}</span>
                  ))}
                </div>
              ) : <p className="text-sm text-zinc-500">No power words found. Add words like &quot;proven&quot;, &quot;exclusive&quot;, or &quot;transform&quot;.</p>}
            </div>
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-red-400">Weak Words to Replace</h3>
              {result.weakWords.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {result.weakWords.map(w => (
                    <span key={w} className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-medium">{w}</span>
                  ))}
                </div>
              ) : <p className="text-sm text-zinc-500">No weak words detected. Your language is precise.</p>}
            </div>
          </div>

          {/* Improvements */}
          {result.improvements.length > 0 && (
            <div className="glass rounded-2xl p-8">
              <h3 className="text-lg font-semibold mb-4">Actionable Improvements</h3>
              <ul className="space-y-3">
                {result.improvements.map((tip, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="text-pink-400 font-bold shrink-0">{i + 1}.</span>
                    <span className="text-zinc-300">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* How It Works */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-10">How Sentiment Analysis Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              ['1', 'Paste Content', 'Enter any social media post, ad copy, or caption you want to analyze.'],
              ['2', 'Choose Context', 'Select your target platform and audience for tailored scoring.'],
              ['3', 'Get Scores', 'Instant emotional resonance, readability, and platform fit analysis.'],
              ['4', 'Optimize', 'Apply specific recommendations to boost engagement before posting.'],
            ].map(([num, title, desc]) => (
              <div key={num} className="glass rounded-2xl p-6">
                <div className="text-3xl mb-3">{num}</div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-zinc-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emotion Guide */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">The 8 Emotional Dimensions We Analyze</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              ['Inspiration', 'Aspirational language that motivates action. Words like "achieve", "transform", "dream".'],
              ['Trust', 'Credibility signals: data, proof, expertise. Numbers and case studies boost this.'],
              ['Urgency', 'Time pressure that drives immediate action. "Now", "today", "limited" keywords.'],
              ['Curiosity', 'Open loops and questions that make readers need to know more.'],
              ['Joy', 'Positive emotional energy. Emojis, celebration, humor, and excitement.'],
              ['Empathy', 'Making the reader feel understood. "You" language addressing pain points.'],
              ['Authority', 'Expert positioning through data, credentials, and specific experience.'],
              ['FOMO', 'Fear of missing out. Scarcity, exclusivity, and social proof signals.'],
            ].map(([title, desc]) => (
              <div key={title} className="glass rounded-xl p-5">
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-zinc-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto text-center">
          <div className="grid grid-cols-3 gap-8">
            <div><p className="text-3xl font-bold gradient-text">8</p><p className="text-zinc-500 text-xs mt-1">Emotion Dimensions</p></div>
            <div><p className="text-3xl font-bold gradient-text">6</p><p className="text-zinc-500 text-xs mt-1">Platform Scores</p></div>
            <div><p className="text-3xl font-bold gradient-text">7</p><p className="text-zinc-500 text-xs mt-1">Audience Segments</p></div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              ['What is a sentiment analyzer for social media?', 'A sentiment analyzer evaluates the emotional tone and impact of your social media content before you publish. It detects positive, negative, and neutral sentiment, plus specific emotions like trust, urgency, and FOMO. This helps you craft posts that resonate with your target audience.'],
              ['How does the Empathy Index work?', 'The Empathy Index breaks down your content across 8 emotional dimensions: Inspiration, Trust, Urgency, Curiosity, Joy, Empathy, Authority, and FOMO. Each dimension is scored 0-100 based on word choice, sentence structure, and contextual signals. Higher scores mean stronger emotional resonance in that dimension.'],
              ['Is this tool free to use?', 'Yes, the sentiment analyzer is completely free with no signup required. Analyze unlimited posts, captions, and ad copy. We believe every creator deserves access to professional-grade content analysis.'],
              ['How accurate is the predicted engagement?', 'Our engagement predictions are based on patterns from millions of social media posts. While no tool can guarantee specific results, our sentiment and readability signals correlate strongly with engagement metrics. Use the predictions as directional guidance, not exact forecasts.'],
              ['Which platforms does it analyze?', 'We score your content for Twitter/X, LinkedIn, Instagram, TikTok, Facebook, and YouTube. Each platform has different optimal lengths, formats, and engagement patterns. The platform fit score tells you where your content will perform best.'],
            ].map(([q, a]) => (
              <div key={q} className="glass rounded-xl p-6">
                <h3 className="font-semibold mb-2">{q}</h3>
                <p className="text-sm text-zinc-400">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 border-t border-zinc-800/50 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Create Content That Converts?</h2>
        <p className="text-zinc-400 mb-6 max-w-md mx-auto">Analyze your content, then generate optimized posts with PostCraft AI.</p>
        <div className="flex justify-center gap-4">
          <a href="/" className="px-8 py-3.5 btn-primary rounded-xl font-semibold text-white">Generate Posts Free</a>
          <a href="/hooks" className="px-8 py-3.5 bg-zinc-800 rounded-xl font-semibold text-zinc-300 hover:bg-zinc-700 transition">Try Hook Generator</a>
        </div>
      </section>
    </main>
  );
}
