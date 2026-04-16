'use client';
import { useState } from 'react';

const platforms = ['Twitter/X', 'LinkedIn', 'Instagram', 'TikTok', 'Facebook', 'YouTube'] as const;
const contentTypes = ['Text Post', 'Image + Caption', 'Short Video (< 60s)', 'Long Video (> 60s)', 'Carousel/Slides', 'Thread', 'Story', 'Live Stream', 'Poll/Quiz', 'Infographic'] as const;
const topics = ['Breaking News', 'How-to/Tutorial', 'Personal Story', 'Controversial Take', 'Data/Research', 'Behind-the-Scenes', 'Product Launch', 'Industry Trend', 'Meme/Humor', 'Challenge/Trend', 'Giveaway', 'Inspirational', 'Educational', 'Review/Comparison', 'User Story/Testimonial'] as const;
const hookTypes = ['Question', 'Bold Claim', 'Statistic', 'Story Opening', 'Controversy', 'POV/Scenario', 'List/Number', 'None/Weak'] as const;

interface ViralityResult {
  overallScore: number;
  label: string;
  dimensions: { name: string; score: number; weight: number; tip: string }[];
  viralProbability: string;
  estimatedReach: string;
  shareability: number;
  saveability: number;
  commentability: number;
  topBoosts: string[];
  topRisks: string[];
  optimizations: string[];
  benchmarkComparison: string;
  historicalPattern: string;
}

function calculateVirality(
  platform: string, contentType: string, topic: string, hookType: string,
  hasEmoji: boolean, hasCTA: boolean, hasHashtags: boolean, charCount: number,
  hasVisual: boolean, isTimely: boolean
): ViralityResult {
  const dimensions: { name: string; score: number; weight: number; tip: string }[] = [];

  // Hook strength (25% weight)
  let hookScore = 30;
  if (hookType === 'Question') hookScore = 85;
  else if (hookType === 'Bold Claim') hookScore = 90;
  else if (hookType === 'Statistic') hookScore = 80;
  else if (hookType === 'Story Opening') hookScore = 75;
  else if (hookType === 'Controversy') hookScore = 95;
  else if (hookType === 'POV/Scenario') hookScore = 82;
  else if (hookType === 'List/Number') hookScore = 70;
  dimensions.push({ name: 'Hook Strength', score: hookScore, weight: 25, tip: hookScore < 70 ? 'Add a stronger hook — controversy and bold claims get 3x more engagement' : 'Strong hook detected — this will stop scrollers' });

  // Topic virality (20%)
  const topicScores: Record<string, number> = {
    'Breaking News': 95, 'Controversial Take': 92, 'Challenge/Trend': 90, 'Meme/Humor': 88,
    'Personal Story': 80, 'Giveaway': 78, 'Data/Research': 75, 'Behind-the-Scenes': 72,
    'How-to/Tutorial': 68, 'Industry Trend': 65, 'Inspirational': 63, 'Product Launch': 55,
    'Educational': 52, 'User Story/Testimonial': 58, 'Review/Comparison': 50,
  };
  const topicScore = topicScores[topic] || 50;
  dimensions.push({ name: 'Topic Virality', score: topicScore, weight: 20, tip: topicScore < 60 ? 'This topic has lower viral potential — pair it with a strong emotional hook' : 'High-viral topic category — capitalize on timing' });

  // Format-Platform fit (20%)
  const formatFit: Record<string, Record<string, number>> = {
    TikTok: { 'Short Video (< 60s)': 95, 'Challenge/Trend': 90, 'Story': 70, 'Poll/Quiz': 65, 'Text Post': 30 },
    Instagram: { 'Carousel/Slides': 90, 'Short Video (< 60s)': 88, 'Image + Caption': 80, 'Story': 75, 'Infographic': 70 },
    'Twitter/X': { 'Thread': 90, 'Text Post': 85, 'Poll/Quiz': 80, 'Image + Caption': 70, 'Short Video (< 60s)': 65 },
    LinkedIn: { 'Carousel/Slides': 92, 'Text Post': 85, 'Long Video (> 60s)': 70, 'Infographic': 80, 'Image + Caption': 65 },
    YouTube: { 'Long Video (> 60s)': 90, 'Short Video (< 60s)': 85, 'Live Stream': 75, 'Tutorial': 80, 'Text Post': 20 },
    Facebook: { 'Short Video (< 60s)': 80, 'Image + Caption': 75, 'Live Stream': 85, 'Poll/Quiz': 70, 'Text Post': 60 },
  };
  const fitScore = formatFit[platform]?.[contentType] || 55;
  dimensions.push({ name: 'Format-Platform Fit', score: fitScore, weight: 20, tip: fitScore < 60 ? `${contentType} underperforms on ${platform} — consider switching to ${Object.entries(formatFit[platform] || {}).sort((a, b) => b[1] - a[1])[0]?.[0] || 'video'}` : 'Great format choice for this platform' });

  // Engagement triggers (15%)
  let engScore = 40;
  if (hasEmoji) engScore += 10;
  if (hasCTA) engScore += 20;
  if (hasHashtags) engScore += 10;
  if (isTimely) engScore += 15;
  engScore = Math.min(100, engScore);
  dimensions.push({ name: 'Engagement Triggers', score: engScore, weight: 15, tip: engScore < 60 ? 'Add a CTA, emojis, and trending hashtags to boost engagement signals' : 'Strong engagement triggers in place' });

  // Visual appeal (10%)
  let visualScore = hasVisual ? 80 : 30;
  if (contentType.includes('Video')) visualScore = 90;
  if (contentType === 'Infographic') visualScore = 85;
  if (contentType === 'Carousel/Slides') visualScore = 85;
  dimensions.push({ name: 'Visual Appeal', score: visualScore, weight: 10, tip: visualScore < 50 ? 'Add visuals — posts with images get 2.3x more engagement' : 'Visual content detected' });

  // Length optimization (10%)
  const idealLengths: Record<string, [number, number]> = {
    'Twitter/X': [71, 100], LinkedIn: [1300, 2000], Instagram: [138, 2200],
    TikTok: [100, 300], Facebook: [40, 80], YouTube: [200, 500],
  };
  const [min, max] = idealLengths[platform] || [100, 500];
  let lengthScore = 70;
  if (charCount >= min && charCount <= max) lengthScore = 95;
  else if (charCount < min) lengthScore = 50;
  else if (charCount > max * 1.5) lengthScore = 40;
  dimensions.push({ name: 'Length Optimization', score: lengthScore, weight: 10, tip: lengthScore < 70 ? `Ideal length for ${platform}: ${min}-${max} chars (you have ${charCount})` : 'Caption length is optimized' });

  // Calculate weighted score
  const overallScore = Math.round(dimensions.reduce((sum, d) => sum + (d.score * d.weight / 100), 0));

  let label = 'Low Viral Potential';
  if (overallScore >= 85) label = 'Viral Explosion';
  else if (overallScore >= 75) label = 'High Viral Potential';
  else if (overallScore >= 65) label = 'Good Engagement';
  else if (overallScore >= 50) label = 'Average Performance';

  const viralProbability = overallScore >= 85 ? '15-25%' : overallScore >= 75 ? '8-15%' : overallScore >= 65 ? '3-8%' : overallScore >= 50 ? '1-3%' : '<1%';

  const reachMultipliers: Record<string, number> = { TikTok: 15, 'YouTube Shorts': 12, Instagram: 8, 'Twitter/X': 10, LinkedIn: 6, Facebook: 5, YouTube: 8 };
  const mult = reachMultipliers[platform] || 5;
  const estimatedReach = `${Math.round(overallScore * mult * 10).toLocaleString()} - ${Math.round(overallScore * mult * 50).toLocaleString()} impressions`;

  const shareability = Math.round(overallScore * (topic === 'Meme/Humor' || topic === 'Controversial Take' ? 1.3 : topic === 'Data/Research' ? 1.1 : 0.9));
  const saveability = Math.round(overallScore * (topic === 'How-to/Tutorial' || topic === 'Data/Research' ? 1.4 : topic === 'Educational' ? 1.3 : 0.8));
  const commentability = Math.round(overallScore * (hookType === 'Question' || hookType === 'Controversy' ? 1.4 : hasCTA ? 1.1 : 0.7));

  const topBoosts: string[] = [];
  const topRisks: string[] = [];
  const optimizations: string[] = [];

  if (hookScore >= 80) topBoosts.push('Strong hook will capture attention in the first 1-2 seconds');
  if (topicScore >= 80) topBoosts.push('High-virality topic — timing is everything, post NOW');
  if (fitScore >= 80) topBoosts.push(`${contentType} is the top format on ${platform}`);
  if (isTimely) topBoosts.push('Timely content gets 2-3x more impressions in the first hour');

  if (hookScore < 60) topRisks.push('Weak hook — 80% of viewers will scroll past in the first second');
  if (fitScore < 60) topRisks.push(`${contentType} typically underperforms on ${platform}`);
  if (!hasCTA) topRisks.push('No CTA detected — you\'re leaving engagement on the table');
  if (!hasVisual && platform !== 'Twitter/X') topRisks.push('No visual content — adding media could double your reach');

  dimensions.filter(d => d.score < 60).forEach(d => {
    optimizations.push(`Improve ${d.name} (${d.score}/100): ${d.tip}`);
  });
  if (optimizations.length === 0) optimizations.push('Your content is well-optimized! Consider A/B testing hooks for further improvement.');

  const benchmarkComparison = `Your virality score of ${overallScore}/100 is ${overallScore >= 75 ? 'above' : overallScore >= 55 ? 'at' : 'below'} the ${platform} average of 55/100 for ${contentType.toLowerCase()} content.`;
  const historicalPattern = `Posts with similar attributes (${topic} + ${contentType} on ${platform}) have historically achieved ${viralProbability} viral probability. Peak engagement occurs within the first ${platform === 'TikTok' ? '4 hours' : platform === 'Twitter/X' ? '30 minutes' : '2 hours'}.`;

  return {
    overallScore, label, dimensions, viralProbability, estimatedReach,
    shareability: Math.min(100, shareability), saveability: Math.min(100, saveability), commentability: Math.min(100, commentability),
    topBoosts, topRisks, optimizations, benchmarkComparison, historicalPattern,
  };
}

function getScoreColor(s: number): string {
  if (s >= 85) return 'text-green-400';
  if (s >= 70) return 'text-emerald-400';
  if (s >= 55) return 'text-yellow-400';
  if (s >= 40) return 'text-orange-400';
  return 'text-red-400';
}

export default function ViralityScorePage() {
  const [platform, setPlatform] = useState<string>('TikTok');
  const [contentType, setContentType] = useState<string>('Short Video (< 60s)');
  const [topic, setTopic] = useState<string>('How-to/Tutorial');
  const [hookType, setHookType] = useState<string>('Question');
  const [caption, setCaption] = useState('');
  const [hasEmoji, setHasEmoji] = useState(true);
  const [hasCTA, setHasCTA] = useState(true);
  const [hasHashtags, setHasHashtags] = useState(true);
  const [hasVisual, setHasVisual] = useState(true);
  const [isTimely, setIsTimely] = useState(false);
  const [result, setResult] = useState<ViralityResult | null>(null);

  function predict() {
    setResult(calculateVirality(platform, contentType, topic, hookType, hasEmoji, hasCTA, hasHashtags, caption.length, hasVisual, isTimely));
  }

  return (
    <main className="min-h-screen px-6 py-20 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-xs text-orange-400 uppercase tracking-widest mb-2 font-semibold">New Tool</p>
        <h1 className="text-4xl font-bold mb-3">
          Virality Score <span className="gradient-text">Predictor</span>
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          Predict how likely your content is to go viral before you post. AI-powered scoring across 6 dimensions —
          hook strength, topic virality, format fit, engagement triggers, visual appeal, and length optimization.
        </p>
      </div>

      {/* Input */}
      <div className="glass rounded-2xl p-6 mb-8">
        <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Platform</label>
        <div className="flex flex-wrap gap-2 mb-5">
          {platforms.map(p => (
            <button key={p} onClick={() => setPlatform(p)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition ${platform === p ? 'bg-orange-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
              {p}
            </button>
          ))}
        </div>

        <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Content Type</label>
        <div className="flex flex-wrap gap-2 mb-5">
          {contentTypes.map(c => (
            <button key={c} onClick={() => setContentType(c)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition ${contentType === c ? 'bg-purple-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
              {c}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-5">
          <div>
            <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Topic Category</label>
            <select value={topic} onChange={e => setTopic(e.target.value)}
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-orange-500 transition">
              {topics.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Hook Type</label>
            <select value={hookType} onChange={e => setHookType(e.target.value)}
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-orange-500 transition">
              {hookTypes.map(h => <option key={h} value={h}>{h}</option>)}
            </select>
          </div>
        </div>

        <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Caption/Text (optional — for length analysis)</label>
        <textarea
          value={caption}
          onChange={e => setCaption(e.target.value)}
          rows={3}
          placeholder="Paste your caption to analyze length optimization..."
          className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-orange-500 transition mb-2 resize-none"
        />
        <p className="text-xs text-zinc-600 mb-5">{caption.length} characters</p>

        <label className="text-xs text-zinc-500 uppercase tracking-wider mb-3 block">Content Attributes</label>
        <div className="flex flex-wrap gap-4 mb-6">
          {[
            { label: 'Has Emojis', state: hasEmoji, setter: setHasEmoji },
            { label: 'Has CTA', state: hasCTA, setter: setHasCTA },
            { label: 'Has Hashtags', state: hasHashtags, setter: setHasHashtags },
            { label: 'Has Visual/Media', state: hasVisual, setter: setHasVisual },
            { label: 'Timely/Trending', state: isTimely, setter: setIsTimely },
          ].map(({ label, state, setter }) => (
            <button key={label} onClick={() => setter(!state)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition ${state ? 'bg-green-600/20 text-green-400 border border-green-600/30' : 'bg-zinc-800 text-zinc-500'}`}>
              {state ? '✓' : '○'} {label}
            </button>
          ))}
        </div>

        <button onClick={predict}
          className="w-full py-3.5 btn-primary rounded-xl font-semibold text-white">
          Predict Virality Score
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-8 fade-in">
          {/* Score Hero */}
          <div className="glass rounded-2xl p-8 text-center">
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Virality Score</p>
            <p className={`text-7xl font-bold ${getScoreColor(result.overallScore)}`}>{result.overallScore}</p>
            <p className="text-lg font-semibold mt-2">{result.label}</p>
            <div className="grid grid-cols-3 gap-6 mt-6">
              <div>
                <p className="text-2xl font-bold text-orange-400">{result.viralProbability}</p>
                <p className="text-xs text-zinc-500">Viral Probability</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-400">{result.estimatedReach}</p>
                <p className="text-xs text-zinc-500">Estimated Reach</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-cyan-400">{platform}</p>
                <p className="text-xs text-zinc-500">Platform</p>
              </div>
            </div>
          </div>

          {/* Dimensions */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Score Breakdown (6 Dimensions)</h2>
            <div className="space-y-4">
              {result.dimensions.map((d, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{d.name} <span className="text-xs text-zinc-600">({d.weight}% weight)</span></span>
                    <span className={`text-sm font-bold ${getScoreColor(d.score)}`}>{d.score}/100</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-2 mb-1">
                    <div className={`h-2 rounded-full ${d.score >= 80 ? 'bg-green-500' : d.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${d.score}%` }} />
                  </div>
                  <p className="text-xs text-zinc-500">{d.tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Engagement Breakdown */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="glass rounded-xl p-5 text-center">
              <p className="text-3xl font-bold text-pink-400">{result.shareability}</p>
              <p className="text-xs text-zinc-500 mt-1">Shareability Score</p>
              <p className="text-xs text-zinc-600 mt-2">How likely people are to share/retweet</p>
            </div>
            <div className="glass rounded-xl p-5 text-center">
              <p className="text-3xl font-bold text-blue-400">{result.saveability}</p>
              <p className="text-xs text-zinc-500 mt-1">Saveability Score</p>
              <p className="text-xs text-zinc-600 mt-2">How likely people are to bookmark/save</p>
            </div>
            <div className="glass rounded-xl p-5 text-center">
              <p className="text-3xl font-bold text-green-400">{result.commentability}</p>
              <p className="text-xs text-zinc-500 mt-1">Commentability Score</p>
              <p className="text-xs text-zinc-600 mt-2">How likely people are to comment/reply</p>
            </div>
          </div>

          {/* Boosts & Risks */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-3 text-green-400">Viral Boosts</h2>
              <div className="space-y-2">
                {result.topBoosts.length > 0 ? result.topBoosts.map((b, i) => (
                  <div key={i} className="flex gap-2 text-sm"><span className="text-green-400">+</span><span className="text-zinc-300">{b}</span></div>
                )) : <p className="text-sm text-zinc-500">No major boosts detected. See optimizations below.</p>}
              </div>
            </div>
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-3 text-red-400">Viral Risks</h2>
              <div className="space-y-2">
                {result.topRisks.length > 0 ? result.topRisks.map((r, i) => (
                  <div key={i} className="flex gap-2 text-sm"><span className="text-red-400">!</span><span className="text-zinc-300">{r}</span></div>
                )) : <p className="text-sm text-zinc-500">No major risks. Your content is well-positioned!</p>}
              </div>
            </div>
          </div>

          {/* Optimizations */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-3">Optimization Recommendations</h2>
            <div className="space-y-2">
              {result.optimizations.map((o, i) => (
                <div key={i} className="flex gap-2 text-sm"><span className="text-orange-400">{i + 1}.</span><span className="text-zinc-300">{o}</span></div>
              ))}
            </div>
          </div>

          {/* Benchmark */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-3">Benchmark & Historical Data</h2>
            <p className="text-sm text-zinc-400 mb-2">{result.benchmarkComparison}</p>
            <p className="text-sm text-zinc-400">{result.historicalPattern}</p>
          </div>
        </div>
      )}

      {/* SEO */}
      <section className="mt-16 space-y-8">
        <div className="glass rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">What is a Virality Score?</h2>
          <p className="text-sm text-zinc-400 mb-3">A virality score predicts how likely your content is to be widely shared and reach beyond your existing audience. It&apos;s calculated from 6 dimensions: hook strength, topic virality, format-platform fit, engagement triggers, visual appeal, and length optimization.</p>
          <p className="text-sm text-zinc-400">Unlike vanity metrics that measure past performance, our Virality Score Predictor analyzes your content BEFORE you post — giving you the opportunity to optimize and increase your chances of going viral.</p>
        </div>

        <div className="glass rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">Virality Score FAQ</h2>
          <div className="space-y-4">
            {[
              ['What score do I need to go viral?', 'Scores above 85 have a 15-25% chance of viral reach (100K+ impressions). But even scores of 65-75 can perform well with good timing and audience fit.'],
              ['Does the score guarantee virality?', 'No. Virality depends on timing, audience, algorithm mood, and luck. Our score maximizes your odds by optimizing controllable factors.'],
              ['Which dimension matters most?', 'Hook Strength (25% weight). If people don\'t stop scrolling in the first 1-2 seconds, nothing else matters.'],
              ['Should I always aim for controversy?', 'Controversy scores highest but carries brand risk. For most creators, Bold Claims and Questions provide high virality with low risk.'],
              ['How often should I test?', 'Score every piece of content before posting. Over time, you\'ll develop intuition for what works on each platform.'],
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
            ['/caption-optimizer', 'Caption Optimizer', 'Score your captions'],
            ['/social-seo', 'Social SEO', 'Rank on social search'],
            ['/hooks', 'Hook Generator', '10 scroll-stopping hooks'],
            ['/sentiment-analyzer', 'Sentiment Analyzer', 'Emotional impact'],
            ['/engagement-calculator', 'Engagement Calc', 'Rate performance'],
            ['/post-timing', 'Post Timing', 'Best times to post'],
            ['/hashtags', 'Hashtag Generator', 'Optimized tags'],
            ['/ab-testing', 'A/B Testing', 'Split test planner'],
          ].map(([href, title, desc]) => (
            <a key={href} href={href} className="glass rounded-xl p-3 hover:border-orange-500/30 transition">
              <p className="font-semibold text-xs">{title}</p>
              <p className="text-xs text-zinc-500 mt-1">{desc}</p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
