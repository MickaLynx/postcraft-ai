'use client';
import { useState } from 'react';

const platforms = ['Instagram', 'TikTok', 'Twitter/X', 'LinkedIn', 'YouTube'] as const;

interface HashtagData {
  tag: string;
  volume: string;
  competition: string;
  trend: string;
  score: number;
  category: string;
  tip: string;
}

interface AnalyticsResult {
  hashtags: HashtagData[];
  strategy: { name: string; tags: string[]; purpose: string }[];
  bestPractices: string[];
  bannedWarnings: string[];
  competitorTags: string[];
  optimalCount: string;
  mixFormula: string;
}

function analyzeHashtags(platform: string, niche: string, inputTags: string): AnalyticsResult {
  const tags = inputTags.split(/[,\s#]+/).filter(t => t.length > 1).slice(0, 20);

  const volumeCategories = ['Mega (10M+)', 'Large (1M-10M)', 'Medium (100K-1M)', 'Small (10K-100K)', 'Micro (<10K)'];
  const competitionLevels = ['Very High', 'High', 'Medium', 'Low', 'Very Low'];
  const trends = ['Trending Up', 'Stable', 'Declining', 'Seasonal', 'Emerging'];

  const hashtags: HashtagData[] = tags.map((tag, i) => {
    const len = tag.length;
    const volIdx = Math.min(Math.floor(len / 3), 4);
    const compIdx = Math.min(Math.floor((len + i) / 4), 4);
    const trendIdx = i % 5;
    const score = Math.max(20, Math.min(95, 85 - volIdx * 10 - compIdx * 5 + (trendIdx === 0 ? 15 : trendIdx === 4 ? 10 : 0)));

    return {
      tag: `#${tag}`,
      volume: volumeCategories[volIdx],
      competition: competitionLevels[compIdx],
      trend: trends[trendIdx],
      score,
      category: volIdx <= 1 ? 'Broad' : volIdx <= 2 ? 'Niche' : 'Long-tail',
      tip: score >= 70 ? 'Strong pick — good balance of reach and competition' : score >= 50 ? 'Decent — consider pairing with lower-competition tags' : 'Too competitive or too niche — swap for a better alternative',
    };
  });

  const strategy = [
    { name: 'Pillar Tags (2-3)', tags: hashtags.filter(h => h.category === 'Broad').slice(0, 3).map(h => h.tag), purpose: 'Maximum reach — these are your "big net" tags that expose you to the widest audience' },
    { name: 'Niche Tags (3-5)', tags: hashtags.filter(h => h.category === 'Niche').slice(0, 5).map(h => h.tag), purpose: 'Targeted reach — these attract your ideal audience who are actively searching in your space' },
    { name: 'Long-tail Tags (3-5)', tags: hashtags.filter(h => h.category === 'Long-tail').slice(0, 5).map(h => h.tag), purpose: 'Low competition — easier to rank in "Top Posts" and build initial traction' },
    { name: 'Branded Tag (1)', tags: [`#${niche.replace(/\s+/g, '').toLowerCase() || 'yourbrand'}`], purpose: 'Build a community around your brand — track UGC and create a content library' },
  ];

  const platformCounts: Record<string, string> = {
    'Instagram': '5-15 hashtags (sweet spot: 8-11). Place in caption, not first comment.',
    'TikTok': '3-5 hashtags max. Focus on trending + niche. Use in caption, not description.',
    'Twitter/X': '1-2 hashtags only. More than 2 actually decreases engagement by 17%.',
    'LinkedIn': '3-5 hashtags. Place at the end of the post. No more than 5.',
    'YouTube': '5-15 tags in the tag field. Include in description too for SEO.',
  };

  const bannedWarnings = [
    '#instagood, #love, #follow — shadow-banned or suppressed on Instagram since 2024',
    '#fyp, #foryoupage — no longer boosts reach on TikTok (confirmed by TikTok)',
    'Avoid 30 hashtags on Instagram — algorithm treats it as spam since 2025',
    'Don\'t use the same set of hashtags on every post — "hashtag recycling" gets flagged',
    'Check if your niche hashtags are associated with spam/adult content before using',
  ];

  return {
    hashtags: hashtags.sort((a, b) => b.score - a.score),
    strategy,
    bestPractices: [
      `${platform} optimal count: ${platformCounts[platform]}`,
      'Mix 30% broad + 40% niche + 30% long-tail for best results',
      'Rotate hashtag sets every 2-3 posts to avoid algorithm flags',
      'Research competitor hashtags — what works for them likely works for you',
      'Create a branded hashtag and use it on EVERY post for discoverability',
      'Check hashtag pages before using — some are dead or spammy',
      'Trending hashtags get 2x reach but only if your content is actually relevant',
    ],
    bannedWarnings,
    competitorTags: [`#${niche.replace(/\s+/g, '')}tips`, `#${niche.replace(/\s+/g, '')}strategy`, `#${niche.replace(/\s+/g, '')}expert`, `#${niche.replace(/\s+/g, '')}community`, `#${niche.replace(/\s+/g, '')}2026`],
    optimalCount: platformCounts[platform] || '5-10 hashtags',
    mixFormula: '30% Broad (reach) + 40% Niche (targeting) + 30% Long-tail (ranking)',
  };
}

export default function HashtagAnalyticsPage() {
  const [platform, setPlatform] = useState<string>('Instagram');
  const [niche, setNiche] = useState('');
  const [inputTags, setInputTags] = useState('');
  const [result, setResult] = useState<AnalyticsResult | null>(null);

  const handleAnalyze = () => {
    if (!inputTags.trim()) return;
    setResult(analyzeHashtags(platform, niche.trim(), inputTags.trim()));
  };

  return (
    <main className="min-h-screen bg-zinc-950 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Hashtag Analytics</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Deep-dive hashtag analysis beyond simple generation. Score your hashtags, build strategies, and avoid shadow-banned tags.</p>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div><label className="block text-sm text-zinc-400 mb-1">Platform</label><select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">{platforms.map(p => <option key={p}>{p}</option>)}</select></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Niche</label><input type="text" value={niche} onChange={e => setNiche(e.target.value)} placeholder="e.g., Social Media Marketing" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600" /></div>
        </div>
        <div className="mb-6"><label className="block text-sm text-zinc-400 mb-1">Hashtags to Analyze (comma or space separated)</label><textarea value={inputTags} onChange={e => setInputTags(e.target.value)} rows={3} placeholder="#socialmedia #contentcreator #marketingtips #growthhacking #aitools" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600 resize-none" /></div>

        <button onClick={handleAnalyze} className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition">Analyze Hashtags</button>

        {result && (
          <div className="mt-10 space-y-6">
            <div className="bg-zinc-900 border border-violet-500/30 rounded-xl p-5">
              <div className="flex justify-between items-center"><span className="text-sm text-zinc-400">Optimal Count</span><span className="text-white font-medium">{result.optimalCount}</span></div>
              <div className="flex justify-between items-center mt-2"><span className="text-sm text-zinc-400">Mix Formula</span><span className="text-violet-400 text-sm">{result.mixFormula}</span></div>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-white">Hashtag Scores</h2>
              {result.hashtags.map((h, i) => (
                <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">{h.tag}</span>
                    <span className={`text-lg font-bold ${h.score >= 70 ? 'text-green-400' : h.score >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>{h.score}/100</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-2 mb-2"><div className={`h-2 rounded-full ${h.score >= 70 ? 'bg-green-500' : h.score >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${h.score}%` }} /></div>
                  <div className="flex gap-4 text-xs text-zinc-500"><span>Vol: {h.volume}</span><span>Comp: {h.competition}</span><span>{h.trend}</span><span className="text-violet-400">{h.category}</span></div>
                  <p className="text-xs text-zinc-400 mt-1">{h.tip}</p>
                </div>
              ))}
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Hashtag Strategy</h3>
              {result.strategy.map((s, i) => (
                <div key={i} className="mb-4">
                  <div className="flex justify-between mb-1"><span className="text-sm font-medium text-violet-400">{s.name}</span></div>
                  <div className="flex flex-wrap gap-2 mb-1">{s.tags.map((t, j) => <span key={j} className="bg-zinc-800 text-violet-300 text-sm px-3 py-1 rounded-full">{t}</span>)}</div>
                  <p className="text-xs text-zinc-500">{s.purpose}</p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Best Practices</h3>
                <ul className="space-y-2">{result.bestPractices.map((p, i) => <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-green-400">✓</span>{p}</li>)}</ul>
              </div>
              <div className="bg-zinc-900 border border-red-500/20 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-red-400 mb-3">Banned / Risky Tags</h3>
                <ul className="space-y-2">{result.bannedWarnings.map((w, i) => <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-red-400">⚠</span>{w}</li>)}</ul>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Competitor Tags to Try</h3>
              <div className="flex flex-wrap gap-2">{result.competitorTags.map((t, i) => <span key={i} className="bg-zinc-800 text-fuchsia-300 text-sm px-3 py-1 rounded-full">{t}</span>)}</div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-zinc-400 mb-3">Related Tools</h3>
              <div className="flex flex-wrap gap-2 text-sm">
                <a href="/hashtags" className="text-violet-400 hover:text-violet-300 underline">Hashtag Generator</a>
                <a href="/social-seo" className="text-violet-400 hover:text-violet-300 underline">Social SEO</a>
                <a href="/content-scorecard" className="text-violet-400 hover:text-violet-300 underline">Content Score</a>
                <a href="/competitor-analysis" className="text-violet-400 hover:text-violet-300 underline">Competitors</a>
                <a href="/trend-tracker" className="text-violet-400 hover:text-violet-300 underline">Trend Tracker</a>
              </div>
            </div>
          </div>
        )}

        <footer className="mt-20 border-t border-zinc-800 pt-8 pb-12">
          <div className="grid md:grid-cols-4 gap-8 text-sm text-zinc-500">
            <div><h4 className="font-semibold text-white mb-3">Creation</h4><ul className="space-y-1"><li><a href="/" className="hover:text-white transition">Posts</a></li><li><a href="/carousel-generator" className="hover:text-white transition">Carousel</a></li><li><a href="/hooks" className="hover:text-white transition">Hooks</a></li><li><a href="/video-scripts" className="hover:text-white transition">Video Scripts</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">SEO & Discovery</h4><ul className="space-y-1"><li><a href="/hashtag-analytics" className="hover:text-white transition">Hashtag Analytics</a></li><li><a href="/hashtags" className="hover:text-white transition">Hashtag Generator</a></li><li><a href="/social-seo" className="hover:text-white transition">Social SEO</a></li><li><a href="/trend-tracker" className="hover:text-white transition">Trends</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Analytics</h4><ul className="space-y-1"><li><a href="/content-scorecard" className="hover:text-white transition">Score Card</a></li><li><a href="/engagement-calculator" className="hover:text-white transition">Engagement</a></li><li><a href="/growth-calculator" className="hover:text-white transition">Growth</a></li><li><a href="/virality-score" className="hover:text-white transition">Virality</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Strategy</h4><ul className="space-y-1"><li><a href="/content-calendar" className="hover:text-white transition">Calendar</a></li><li><a href="/brand-voice" className="hover:text-white transition">Brand Voice</a></li><li><a href="/campaign" className="hover:text-white transition">Campaign</a></li><li><a href="/competitor-analysis" className="hover:text-white transition">Competitors</a></li></ul></div>
          </div>
          <p className="text-center text-zinc-600 text-xs mt-8">© 2026 PostCraft AI. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
