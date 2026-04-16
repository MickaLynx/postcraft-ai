'use client';
import { useState } from 'react';

const platforms = ['Twitter/X', 'LinkedIn', 'Instagram', 'TikTok', 'Facebook', 'YouTube'] as const;

interface ScoreCategory {
  name: string;
  score: number;
  maxScore: number;
  feedback: string;
  improvement: string;
}

interface ScorecardResult {
  overallScore: number;
  grade: string;
  categories: ScoreCategory[];
  topStrengths: string[];
  topWeaknesses: string[];
  quickFixes: string[];
  rewriteSuggestion: string;
  competitorComparison: string;
}

function scoreContent(platform: string, content: string): ScorecardResult {
  const words = content.split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;
  const charCount = content.length;
  const hasEmoji = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}]/u.test(content);
  const hasHashtag = /#\w+/.test(content);
  const hashtagCount = (content.match(/#\w+/g) || []).length;
  const hasCTA = /\b(click|follow|share|save|comment|reply|dm|link|subscribe|swipe|tap|join|grab|get|download|try)\b/i.test(content);
  const hasQuestion = /\?/.test(content);
  const hasNumber = /\d/.test(content);
  const hasLineBreaks = /\n/.test(content);
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const avgSentenceLength = wordCount / Math.max(sentences.length, 1);
  const firstLine = content.split('\n')[0] || '';
  const firstLineWords = firstLine.split(/\s+/).length;

  const categories: ScoreCategory[] = [];

  // Hook Strength (0-20)
  let hookScore = 5;
  if (firstLineWords <= 10) hookScore += 5;
  if (hasQuestion && content.indexOf('?') < 50) hookScore += 4;
  if (hasNumber && content.indexOf(content.match(/\d/)?.[0] || '') < 30) hookScore += 3;
  if (/^(stop|wait|pov|hot take|unpopular|here|did you|what if|imagine|most people)/i.test(firstLine)) hookScore += 3;
  hookScore = Math.min(hookScore, 20);
  categories.push({
    name: 'Hook Strength', score: hookScore, maxScore: 20,
    feedback: hookScore >= 15 ? 'Strong opening — stops the scroll' : hookScore >= 10 ? 'Decent hook but could be sharper' : 'Weak opening — most viewers will scroll past',
    improvement: hookScore < 15 ? 'Start with a number, question, or bold statement. First 5-7 words determine everything.' : 'Your hook is solid — keep this pattern.',
  });

  // Readability (0-15)
  let readScore = 5;
  if (avgSentenceLength <= 15) readScore += 3;
  if (hasLineBreaks) readScore += 3;
  if (wordCount <= 150 || (platform === 'Twitter/X' && charCount <= 280)) readScore += 2;
  if (avgSentenceLength <= 10) readScore += 2;
  readScore = Math.min(readScore, 15);
  categories.push({
    name: 'Readability', score: readScore, maxScore: 15,
    feedback: readScore >= 12 ? 'Easy to scan and read on mobile' : readScore >= 8 ? 'Mostly readable — watch sentence length' : 'Too dense — needs more line breaks and shorter sentences',
    improvement: readScore < 12 ? 'Break long sentences. Add line breaks every 1-2 sentences. Mobile readers scan, not read.' : 'Good readability.',
  });

  // Platform Fit (0-15)
  let platformScore = 7;
  const idealLengths: Record<string, [number, number]> = {
    'Twitter/X': [20, 70], 'LinkedIn': [50, 300], 'Instagram': [30, 150],
    'TikTok': [10, 50], 'Facebook': [25, 100], 'YouTube': [20, 80],
  };
  const [min, max] = idealLengths[platform] || [20, 150];
  if (wordCount >= min && wordCount <= max) platformScore += 4;
  if (platform === 'LinkedIn' && hasLineBreaks) platformScore += 2;
  if (platform === 'Instagram' && hasHashtag) platformScore += 2;
  if (platform === 'TikTok' && wordCount <= 50) platformScore += 2;
  platformScore = Math.min(platformScore, 15);
  categories.push({
    name: 'Platform Fit', score: platformScore, maxScore: 15,
    feedback: platformScore >= 12 ? `Well-optimized for ${platform}` : `Could be better adapted to ${platform} norms`,
    improvement: `${platform} ideal: ${min}-${max} words. Current: ${wordCount} words.`,
  });

  // CTA Strength (0-15)
  let ctaScore = 3;
  if (hasCTA) ctaScore += 5;
  if (hasQuestion) ctaScore += 3;
  if (/\b(link in bio|link below|swipe up|check out)\b/i.test(content)) ctaScore += 4;
  ctaScore = Math.min(ctaScore, 15);
  categories.push({
    name: 'CTA Strength', score: ctaScore, maxScore: 15,
    feedback: ctaScore >= 12 ? 'Clear call-to-action — readers know what to do next' : ctaScore >= 7 ? 'Has a CTA but could be stronger' : 'Missing a clear call-to-action',
    improvement: ctaScore < 10 ? 'End with a specific action: "Save this", "Comment your take", "Link in bio for the full guide".' : 'CTA is effective.',
  });

  // Engagement Triggers (0-15)
  let engScore = 3;
  if (hasEmoji) engScore += 2;
  if (hasQuestion) engScore += 3;
  if (hasNumber) engScore += 2;
  if (/\b(you|your)\b/i.test(content)) engScore += 3;
  if (/\b(secret|mistake|truth|myth|hack|trick|strategy|framework)\b/i.test(content)) engScore += 2;
  engScore = Math.min(engScore, 15);
  categories.push({
    name: 'Engagement Triggers', score: engScore, maxScore: 15,
    feedback: engScore >= 12 ? 'Multiple engagement triggers present' : engScore >= 7 ? 'Some triggers but room to add more' : 'Low engagement potential — add hooks',
    improvement: engScore < 10 ? 'Add personal pronouns (you/your), questions, numbers, or power words (secret, mistake, truth).' : 'Strong engagement setup.',
  });

  // Hashtag & SEO (0-10)
  let seoScore = 3;
  if (hasHashtag && hashtagCount >= 3 && hashtagCount <= 10) seoScore += 4;
  else if (hasHashtag) seoScore += 2;
  if (platform === 'LinkedIn' && hashtagCount >= 3 && hashtagCount <= 5) seoScore += 3;
  if (platform === 'Twitter/X' && hashtagCount <= 2) seoScore += 3;
  seoScore = Math.min(seoScore, 10);
  categories.push({
    name: 'Hashtags & Discoverability', score: seoScore, maxScore: 10,
    feedback: seoScore >= 8 ? 'Good hashtag usage for discoverability' : `${hashtagCount} hashtags — ${platform === 'Instagram' ? 'add more (5-15 ideal)' : platform === 'Twitter/X' ? 'keep it minimal (1-2)' : 'adjust for platform'}`,
    improvement: `${platform} ideal hashtags: ${platform === 'Instagram' ? '5-15' : platform === 'LinkedIn' ? '3-5' : platform === 'Twitter/X' ? '1-2' : '3-5'}. You have: ${hashtagCount}.`,
  });

  // Formatting (0-10)
  let formatScore = 3;
  if (hasLineBreaks) formatScore += 3;
  if (hasEmoji) formatScore += 2;
  if (content.includes('→') || content.includes('•') || content.includes('—')) formatScore += 2;
  formatScore = Math.min(formatScore, 10);
  categories.push({
    name: 'Visual Formatting', score: formatScore, maxScore: 10,
    feedback: formatScore >= 8 ? 'Well-formatted for mobile reading' : 'Needs better visual structure',
    improvement: formatScore < 7 ? 'Use line breaks, emoji bullets (→ • ✅), and whitespace. Mobile feeds are visual.' : 'Formatting looks good.',
  });

  const overallScore = categories.reduce((sum, c) => sum + c.score, 0);
  const grade = overallScore >= 85 ? 'A+' : overallScore >= 75 ? 'A' : overallScore >= 65 ? 'B+' : overallScore >= 55 ? 'B' : overallScore >= 45 ? 'C+' : overallScore >= 35 ? 'C' : 'D';

  const sorted = [...categories].sort((a, b) => (b.score / b.maxScore) - (a.score / a.maxScore));
  const topStrengths = sorted.slice(0, 2).map(c => `${c.name}: ${c.feedback}`);
  const topWeaknesses = sorted.slice(-2).map(c => `${c.name}: ${c.improvement}`);

  const quickFixes = categories.filter(c => c.score / c.maxScore < 0.6).map(c => c.improvement).slice(0, 3);
  if (quickFixes.length === 0) quickFixes.push('This post scores well — test it and iterate based on real performance data.');

  return {
    overallScore,
    grade,
    categories,
    topStrengths,
    topWeaknesses,
    quickFixes,
    rewriteSuggestion: overallScore < 60 ? `Consider a stronger opening, clearer CTA, and better ${platform} formatting.` : 'Post is strong — minor tweaks only.',
    competitorComparison: `Average ${platform} post scores 45-55/100. Yours: ${overallScore}/100 (${overallScore >= 55 ? 'above' : 'below'} average).`,
  };
}

export default function ContentScorecardPage() {
  const [platform, setPlatform] = useState<string>('LinkedIn');
  const [content, setContent] = useState('');
  const [result, setResult] = useState<ScorecardResult | null>(null);

  const handleScore = () => {
    if (!content.trim()) return;
    setResult(scoreContent(platform, content.trim()));
  };

  return (
    <main className="min-h-screen bg-zinc-950 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Content Score Card</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Rate any post against platform best practices. Get an instant <strong className="text-white">score out of 100</strong> with specific improvements to boost engagement.</p>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Platform</label>
            <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {platforms.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-zinc-400 mb-1">Paste Your Post</label>
          <textarea value={content} onChange={e => setContent(e.target.value)} rows={6} placeholder="Paste your social media post here to get scored..." className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600 resize-none" />
          <p className="text-xs text-zinc-600 mt-1">{content.split(/\s+/).filter(w => w.length > 0).length} words · {content.length} characters</p>
        </div>

        <button onClick={handleScore} className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition">
          Score My Post
        </button>

        {result && (
          <div className="mt-10 space-y-6">
            <div className="bg-zinc-900 border border-violet-500/30 rounded-xl p-8 text-center">
              <div className={`text-6xl font-bold mb-2 ${result.overallScore >= 70 ? 'text-green-400' : result.overallScore >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                {result.overallScore}/100
              </div>
              <p className="text-2xl font-bold text-white">Grade: {result.grade}</p>
              <p className="text-sm text-zinc-400 mt-2">{result.competitorComparison}</p>
            </div>

            <div className="grid gap-3">
              {result.categories.map((cat, i) => (
                <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-white">{cat.name}</span>
                    <span className={`text-sm font-bold ${cat.score / cat.maxScore >= 0.7 ? 'text-green-400' : cat.score / cat.maxScore >= 0.5 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {cat.score}/{cat.maxScore}
                    </span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-2 mb-2">
                    <div className={`h-2 rounded-full ${cat.score / cat.maxScore >= 0.7 ? 'bg-green-500' : cat.score / cat.maxScore >= 0.5 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${(cat.score / cat.maxScore) * 100}%` }} />
                  </div>
                  <p className="text-xs text-zinc-400">{cat.feedback}</p>
                  {cat.score / cat.maxScore < 0.7 && <p className="text-xs text-violet-400 mt-1">{cat.improvement}</p>}
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-zinc-900 border border-green-500/20 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-green-400 mb-3">Strengths</h3>
                <ul className="space-y-2">{result.topStrengths.map((s, i) => <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-green-400">+</span>{s}</li>)}</ul>
              </div>
              <div className="bg-zinc-900 border border-red-500/20 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-red-400 mb-3">Improve</h3>
                <ul className="space-y-2">{result.topWeaknesses.map((w, i) => <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-red-400">!</span>{w}</li>)}</ul>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Quick Fixes</h3>
              <ul className="space-y-2">{result.quickFixes.map((f, i) => <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-violet-400">→</span>{f}</li>)}</ul>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-zinc-400 mb-3">Improve Your Score</h3>
              <div className="flex flex-wrap gap-2 text-sm">
                <a href="/hooks" className="text-violet-400 hover:text-violet-300 underline">Hook Generator</a>
                <a href="/caption-optimizer" className="text-violet-400 hover:text-violet-300 underline">Caption Optimizer</a>
                <a href="/hashtags" className="text-violet-400 hover:text-violet-300 underline">Hashtags</a>
                <a href="/cta-generator" className="text-violet-400 hover:text-violet-300 underline">CTA Generator</a>
                <a href="/virality-score" className="text-violet-400 hover:text-violet-300 underline">Virality Score</a>
                <a href="/brand-voice" className="text-violet-400 hover:text-violet-300 underline">Brand Voice</a>
              </div>
            </div>
          </div>
        )}

        <footer className="mt-20 border-t border-zinc-800 pt-8 pb-12">
          <div className="grid md:grid-cols-4 gap-8 text-sm text-zinc-500">
            <div><h4 className="font-semibold text-white mb-3">Creation</h4><ul className="space-y-1"><li><a href="/" className="hover:text-white transition">Posts</a></li><li><a href="/carousel-generator" className="hover:text-white transition">Carousel</a></li><li><a href="/story-planner" className="hover:text-white transition">Stories</a></li><li><a href="/poll-quiz" className="hover:text-white transition">Polls</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Scoring</h4><ul className="space-y-1"><li><a href="/content-scorecard" className="hover:text-white transition">Score Card</a></li><li><a href="/virality-score" className="hover:text-white transition">Virality</a></li><li><a href="/caption-optimizer" className="hover:text-white transition">Captions</a></li><li><a href="/sentiment-analyzer" className="hover:text-white transition">Sentiment</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Analytics</h4><ul className="space-y-1"><li><a href="/growth-calculator" className="hover:text-white transition">Growth</a></li><li><a href="/engagement-calculator" className="hover:text-white transition">Engagement</a></li><li><a href="/roi-calculator" className="hover:text-white transition">ROI</a></li><li><a href="/influencer-score" className="hover:text-white transition">Influencer</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Strategy</h4><ul className="space-y-1"><li><a href="/content-calendar" className="hover:text-white transition">Calendar</a></li><li><a href="/brand-voice" className="hover:text-white transition">Brand Voice</a></li><li><a href="/campaign" className="hover:text-white transition">Campaign</a></li><li><a href="/content-recycler" className="hover:text-white transition">Recycler</a></li></ul></div>
          </div>
          <p className="text-center text-zinc-600 text-xs mt-8">© 2026 PostCraft AI. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
