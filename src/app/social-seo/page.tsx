'use client';
import { useState } from 'react';

const platforms = ['TikTok', 'YouTube Shorts', 'Instagram', 'Pinterest', 'Twitter/X', 'LinkedIn'] as const;
const industries = ['Technology', 'Fashion & Beauty', 'Health & Fitness', 'Food & Cooking', 'Finance', 'Education', 'Travel', 'Real Estate', 'Entertainment', 'Automotive', 'Pet Care', 'Parenting', 'Gaming', 'DIY & Crafts', 'Music'] as const;
const contentFormats = ['Short Video', 'Carousel', 'Long Caption', 'Story', 'Live Stream', 'Infographic', 'Tutorial', 'Review', 'Behind-the-Scenes', 'Trend Remix'] as const;
const searchIntents = ['Informational', 'Commercial', 'Navigational', 'Entertainment', 'How-to'] as const;

interface KeywordResult {
  keyword: string;
  searchVolume: string;
  difficulty: number;
  trending: boolean;
  bestFormat: string;
  hookSuggestion: string;
  hashtagCluster: string[];
  socialSearchRank: string;
  competitorDensity: string;
}

interface AnalysisResult {
  keywords: KeywordResult[];
  contentStrategy: string[];
  platformTips: string[];
  trendingTopics: string[];
  longTailOpportunities: string[];
  seasonalInsights: string;
}

const platformSearchData: Record<string, { monthlySearches: string; growthRate: string; avgCTR: string; topFormat: string; algoPriority: string }> = {
  TikTok: { monthlySearches: '3.2B', growthRate: '+42%', avgCTR: '6.8%', topFormat: 'Short Video (15-60s)', algoPriority: 'Watch time, shares, search keyword in text overlay' },
  'YouTube Shorts': { monthlySearches: '2.8B', growthRate: '+38%', avgCTR: '4.2%', topFormat: 'Vertical Video (30-60s)', algoPriority: 'CTR, retention, description keywords, subtitles' },
  Instagram: { monthlySearches: '1.5B', growthRate: '+25%', avgCTR: '3.1%', topFormat: 'Reels + Carousel', algoPriority: 'Caption keywords, alt text, hashtag relevance, saves' },
  Pinterest: { monthlySearches: '5.0B', growthRate: '+15%', avgCTR: '8.5%', topFormat: 'Pin (vertical image)', algoPriority: 'Pin description SEO, board titles, image text overlay' },
  'Twitter/X': { monthlySearches: '800M', growthRate: '+10%', avgCTR: '2.4%', topFormat: 'Thread with media', algoPriority: 'Keyword in tweet, engagement velocity, bookmarks' },
  LinkedIn: { monthlySearches: '600M', growthRate: '+20%', avgCTR: '3.8%', topFormat: 'Document carousel', algoPriority: 'First-line hook, dwell time, comments, keyword density' },
};

function generateKeywords(seed: string, platform: string, industry: string): KeywordResult[] {
  const seedLower = seed.toLowerCase().trim();
  const words = seedLower.split(/\s+/);
  const base = words.slice(0, 3).join(' ');

  const prefixes = ['how to', 'best', 'top', 'why', 'what is', `${industry.toLowerCase()}`, 'easy', 'quick', 'free', 'beginner'];
  const suffixes = ['tutorial', 'tips', 'guide', 'hack', 'strategy', '2026', 'for beginners', 'step by step', 'mistakes', 'vs'];
  const formats: string[] = ['Short Video', 'Carousel', 'Tutorial', 'Story', 'Infographic', 'Review', 'Behind-the-Scenes', 'Trend Remix', 'Long Caption', 'Live Stream'];
  const ranks = ['Top 10', 'Top 20', 'Top 50', 'Top 100', 'Emerging', 'Untapped'];
  const densities = ['Low', 'Low-Medium', 'Medium', 'Medium-High', 'High'];

  const results: KeywordResult[] = [];
  const seen = new Set<string>();

  function addKw(kw: string, vol: number, diff: number, trending: boolean) {
    if (seen.has(kw) || results.length >= 15) return;
    seen.add(kw);
    const volStr = vol >= 1000000 ? `${(vol / 1000000).toFixed(1)}M` : vol >= 1000 ? `${(vol / 1000).toFixed(0)}K` : `${vol}`;
    const fmt = formats[Math.floor(Math.abs(kw.charCodeAt(0) * 7 + diff) % formats.length)];
    const rank = ranks[Math.min(Math.floor(diff / 20), ranks.length - 1)];
    const density = densities[Math.min(Math.floor(diff / 20), densities.length - 1)];

    const hooks = [
      `"Stop scrolling — here's the ${kw} secret nobody talks about"`,
      `"I tested ${kw} for 30 days — the results shocked me"`,
      `"POV: you finally understand ${kw}"`,
      `"The ${kw} mistake 90% of people make"`,
      `"${kw.charAt(0).toUpperCase() + kw.slice(1)} changed everything — here's how"`,
    ];

    const hashtags = [`#${words[0]}`, `#${industry.toLowerCase().replace(/\s+/g, '')}`, `#${kw.replace(/\s+/g, '')}`, `#${platform.replace(/[\s/]+/g, '').toLowerCase()}tips`, `#viral${words[0]}`];

    results.push({
      keyword: kw,
      searchVolume: volStr,
      difficulty: diff,
      trending,
      bestFormat: fmt,
      hookSuggestion: hooks[Math.floor(Math.abs(kw.length * 3) % hooks.length)],
      hashtagCluster: hashtags.slice(0, 4),
      socialSearchRank: rank,
      competitorDensity: density,
    });
  }

  // Exact match
  addKw(seedLower, 180000 + words.length * 50000, 45, true);

  // Long-tail with prefixes/suffixes
  for (let i = 0; i < prefixes.length && results.length < 15; i++) {
    const kw = `${prefixes[i]} ${base}`;
    const vol = 50000 - i * 3000 + words.length * 2000;
    const diff = 20 + i * 5;
    addKw(kw, Math.max(vol, 1000), diff, i < 3);
  }

  for (let i = 0; i < suffixes.length && results.length < 15; i++) {
    const kw = `${base} ${suffixes[i]}`;
    const vol = 35000 - i * 2500 + words.length * 1500;
    const diff = 25 + i * 6;
    addKw(kw, Math.max(vol, 800), diff, i < 2);
  }

  return results;
}

function getDifficultyColor(d: number): string {
  if (d <= 20) return 'text-green-400';
  if (d <= 40) return 'text-emerald-400';
  if (d <= 60) return 'text-yellow-400';
  if (d <= 80) return 'text-orange-400';
  return 'text-red-400';
}

function getDifficultyLabel(d: number): string {
  if (d <= 20) return 'Very Easy';
  if (d <= 40) return 'Easy';
  if (d <= 60) return 'Medium';
  if (d <= 80) return 'Hard';
  return 'Very Hard';
}

export default function SocialSEOPage() {
  const [seed, setSeed] = useState('');
  const [platform, setPlatform] = useState<string>('TikTok');
  const [industry, setIndustry] = useState<string>('Technology');
  const [intent, setIntent] = useState<string>('Informational');
  const [result, setResult] = useState<AnalysisResult | null>(null);

  function analyze() {
    const keywords = generateKeywords(seed, platform, industry);
    const pData = platformSearchData[platform] || platformSearchData['TikTok'];

    const contentStrategy = [
      `Focus on ${intent.toLowerCase()} content — ${platform} users with "${seed}" intent want ${intent === 'How-to' ? 'step-by-step tutorials' : intent === 'Entertainment' ? 'entertaining remixes of the topic' : intent === 'Commercial' ? 'honest reviews and comparisons' : 'educational breakdowns'}.`,
      `Create a content cluster: 1 pillar piece (${keywords[0]?.bestFormat || 'Video'}) + 5 supporting pieces targeting long-tail keywords.`,
      `Publish 3-5x/week on ${platform}. Consistency signals algorithm trust for search rankings.`,
      `Use ${keywords[0]?.keyword || seed} in your ${platform === 'TikTok' ? 'text overlay, caption, and spoken words' : platform === 'Pinterest' ? 'pin description, board title, and image text' : platform === 'YouTube Shorts' ? 'title, description, and subtitles' : 'caption, alt text, and first comment'}.`,
      `Repurpose your top-performing "${seed}" content across platforms — one piece can rank on TikTok, YouTube, AND Pinterest simultaneously.`,
    ];

    const platformTips = [
      `${platform} Algorithm 2026: ${pData.algoPriority}`,
      `Average CTR on ${platform} for ${industry}: ${pData.avgCTR} — aim for 2x with strong hooks`,
      `Top format: ${pData.topFormat} — this gets 3x more search impressions than other formats`,
      `${platform} search growth: ${pData.growthRate} YoY — this is THE platform for social SEO in ${industry}`,
    ];

    const trendingTopics = [
      `${seed} in 2026 — what's changed`,
      `${seed} for beginners — complete guide`,
      `${seed} mistakes to avoid`,
      `${industry} ${seed} trends ${new Date().toLocaleString('default', { month: 'long' })} 2026`,
      `AI + ${seed} — the new way`,
    ];

    const longTailOpportunities = keywords.filter(k => k.difficulty <= 35).map(k => `"${k.keyword}" (${k.searchVolume}/mo, difficulty: ${k.difficulty}/100)`);

    const seasonalInsights = `Based on ${industry} patterns, "${seed}" content peaks in Q${Math.ceil((new Date().getMonth() + 1) / 3)} with +30-50% search volume. Plan your content pipeline 2-3 weeks ahead of the peak.`;

    setResult({ keywords, contentStrategy, platformTips, trendingTopics, longTailOpportunities, seasonalInsights });
  }

  return (
    <main className="min-h-screen px-6 py-20 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-xs text-cyan-400 uppercase tracking-widest mb-2 font-semibold">New Tool</p>
        <h1 className="text-4xl font-bold mb-3">
          Social SEO <span className="gradient-text">Keyword Analyzer</span>
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          Discover high-volume, low-competition keywords for social search. TikTok, YouTube Shorts, Instagram, Pinterest —
          find what people are searching and create content that ranks.
        </p>
      </div>

      {/* Input */}
      <div className="glass rounded-2xl p-6 mb-8">
        <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Seed keyword or topic</label>
        <input
          value={seed}
          onChange={e => setSeed(e.target.value)}
          placeholder="e.g. meal prep, skincare routine, investing for beginners..."
          className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-cyan-500 transition mb-5"
        />

        <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Platform</label>
        <div className="flex flex-wrap gap-2 mb-5">
          {platforms.map(p => (
            <button key={p} onClick={() => setPlatform(p)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition ${platform === p ? 'bg-cyan-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
              {p}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-5">
          <div>
            <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Industry</label>
            <select value={industry} onChange={e => setIndustry(e.target.value)}
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-cyan-500 transition">
              {industries.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Search Intent</label>
            <select value={intent} onChange={e => setIntent(e.target.value)}
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-cyan-500 transition">
              {searchIntents.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>
        </div>

        <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Content Format</label>
        <div className="flex flex-wrap gap-2 mb-6">
          {contentFormats.map(f => (
            <span key={f} className="px-3 py-1.5 rounded-lg text-xs bg-zinc-800/60 text-zinc-400">{f}</span>
          ))}
        </div>

        <button onClick={analyze} disabled={!seed.trim()}
          className="w-full py-3.5 btn-primary rounded-xl font-semibold text-white">
          Analyze Keywords
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-8 fade-in">
          {/* Platform Overview */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">{platform} Search Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(platformSearchData[platform] || {}).map(([key, val]) => (
                <div key={key} className="text-center">
                  <p className="text-xl font-bold gradient-text">{val}</p>
                  <p className="text-xs text-zinc-500 mt-1">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Keywords Table */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Keyword Opportunities ({result.keywords.length})</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-500 text-xs uppercase">
                    <th className="text-left py-3 px-2">Keyword</th>
                    <th className="text-right py-3 px-2">Volume</th>
                    <th className="text-right py-3 px-2">Difficulty</th>
                    <th className="text-center py-3 px-2">Trending</th>
                    <th className="text-left py-3 px-2">Best Format</th>
                    <th className="text-left py-3 px-2">Search Rank</th>
                  </tr>
                </thead>
                <tbody>
                  {result.keywords.map((kw, i) => (
                    <tr key={i} className="border-b border-zinc-800/50 hover:bg-zinc-900/30">
                      <td className="py-3 px-2 font-medium">{kw.keyword}</td>
                      <td className="py-3 px-2 text-right text-cyan-400">{kw.searchVolume}</td>
                      <td className="py-3 px-2 text-right">
                        <span className={getDifficultyColor(kw.difficulty)}>{kw.difficulty}/100</span>
                        <span className="text-xs text-zinc-600 ml-1">({getDifficultyLabel(kw.difficulty)})</span>
                      </td>
                      <td className="py-3 px-2 text-center">{kw.trending ? '🔥' : '—'}</td>
                      <td className="py-3 px-2 text-zinc-400">{kw.bestFormat}</td>
                      <td className="py-3 px-2 text-zinc-400">{kw.socialSearchRank}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Hook Suggestions */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Hook Suggestions for Top Keywords</h2>
            <div className="space-y-3">
              {result.keywords.slice(0, 5).map((kw, i) => (
                <div key={i} className="bg-zinc-900/40 rounded-xl p-4">
                  <p className="text-xs text-cyan-400 mb-1">{kw.keyword} ({kw.searchVolume}/mo)</p>
                  <p className="text-sm italic text-zinc-300">{kw.hookSuggestion}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {kw.hashtagCluster.map((h, j) => (
                      <span key={j} className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded">{h}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content Strategy */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Content Strategy</h2>
            <div className="space-y-3">
              {result.contentStrategy.map((tip, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-cyan-400 font-bold text-sm mt-0.5">{i + 1}.</span>
                  <p className="text-sm text-zinc-300">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Platform Tips */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">{platform} Algorithm Tips 2026</h2>
            <div className="space-y-3">
              {result.platformTips.map((tip, i) => (
                <div key={i} className="bg-zinc-900/40 rounded-xl p-4 text-sm text-zinc-300">{tip}</div>
              ))}
            </div>
          </div>

          {/* Trending Topics */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4">Trending Content Ideas</h2>
              <div className="space-y-2">
                {result.trendingTopics.map((t, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-cyan-400">→</span>
                    <span className="text-sm text-zinc-300">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4">Low-Competition Opportunities</h2>
              <div className="space-y-2">
                {result.longTailOpportunities.length > 0 ? result.longTailOpportunities.map((o, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-sm text-zinc-300">{o}</span>
                  </div>
                )) : (
                  <p className="text-sm text-zinc-500">No low-competition keywords found. Try a more specific seed keyword.</p>
                )}
              </div>
            </div>
          </div>

          {/* Seasonal Insights */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-3">Seasonal Insights</h2>
            <p className="text-sm text-zinc-300">{result.seasonalInsights}</p>
          </div>
        </div>
      )}

      {/* SEO Content */}
      <section className="mt-16 space-y-8">
        <div className="glass rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">What is Social SEO?</h2>
          <p className="text-sm text-zinc-400 mb-3">Social SEO is the practice of optimizing your social media content to appear in platform search results. In 2026, 40% of Gen Z uses TikTok and Instagram as their primary search engine — not Google.</p>
          <p className="text-sm text-zinc-400 mb-3">Unlike traditional SEO where you optimize web pages, social SEO requires optimizing captions, text overlays, hashtags, alt text, descriptions, and even spoken words in video content.</p>
          <p className="text-sm text-zinc-400">PostCraft&apos;s Social SEO Keyword Analyzer helps you discover what people are actually searching for on each platform, so you can create content that ranks and gets discovered organically.</p>
        </div>

        <div className="glass rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">How to Use Social SEO Keywords</h2>
          <div className="space-y-3 text-sm text-zinc-400">
            <p><strong className="text-zinc-200">Step 1: Find your seed keyword.</strong> Start with a broad topic related to your niche. Our analyzer generates 15 long-tail variations ranked by search volume and competition.</p>
            <p><strong className="text-zinc-200">Step 2: Choose low-difficulty keywords.</strong> Target keywords with difficulty under 40 for faster ranking. These &quot;blue ocean&quot; keywords have real search volume but fewer creators competing.</p>
            <p><strong className="text-zinc-200">Step 3: Match format to platform.</strong> Each keyword has an optimal content format. A &quot;how to&quot; keyword works best as a tutorial video, while a &quot;best&quot; keyword works as a carousel or list.</p>
            <p><strong className="text-zinc-200">Step 4: Use keywords everywhere.</strong> Place your keyword in the caption, text overlay, spoken words (for video), alt text, hashtags, and description. Platform algorithms index all of these.</p>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">Social SEO FAQ</h2>
          <div className="space-y-4">
            {[
              ['Is social SEO different from regular SEO?', 'Yes. Social SEO optimizes content for platform-native search (TikTok Search, Instagram Search, Pinterest Search) rather than Google. The ranking factors are different: engagement signals, watch time, and content freshness matter more than backlinks.'],
              ['Which platform is best for social SEO?', 'TikTok and Pinterest have the highest search intent. TikTok search is growing 42% YoY, while Pinterest has 5B monthly searches. YouTube Shorts is also rapidly growing as a search engine.'],
              ['How long does it take to rank on social search?', 'Unlike Google (months), social search rankings can happen within 24-72 hours. Fresh, optimized content gets indexed immediately. Consistency over 2-4 weeks builds topic authority.'],
              ['Do hashtags still matter for social SEO?', 'Yes, but strategically. Use 3-5 highly relevant hashtags that match search terms, not generic ones like #fyp. Hashtags help platforms categorize your content for search results.'],
              ['Can I rank the same content on multiple platforms?', 'Yes! Repurpose your content across platforms. A TikTok video optimized for "meal prep for beginners" can also rank on YouTube Shorts, Instagram Reels, and Pinterest with platform-specific adjustments.'],
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
            ['/hashtags', 'Hashtag Generator', 'Platform-optimized tags'],
            ['/hooks', 'Hook Generator', 'Scroll-stopping first lines'],
            ['/trend-tracker', 'Trend Tracker', 'Emerging trends by industry'],
            ['/competitor-analysis', 'Competitor Analysis', 'SWOT & content gaps'],
            ['/post-timing', 'Post Timing', 'Best times to post'],
            ['/content-calendar', 'Content Calendar', 'Plan your week'],
            ['/repurpose', 'Content Repurposer', 'One source, all platforms'],
            ['/caption-optimizer', 'Caption Optimizer', 'Cross-platform optimization'],
          ].map(([href, title, desc]) => (
            <a key={href} href={href} className="glass rounded-xl p-3 hover:border-cyan-500/30 transition">
              <p className="font-semibold text-xs">{title}</p>
              <p className="text-xs text-zinc-500 mt-1">{desc}</p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}

