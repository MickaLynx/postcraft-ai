'use client';
import { useState } from 'react';

const platforms = ['Instagram', 'Twitter/X', 'LinkedIn', 'TikTok', 'Facebook', 'YouTube', 'Pinterest'] as const;
const strategies = [
  { key: 'reach', label: 'Max Reach', desc: 'Trending + niche mix' },
  { key: 'engagement', label: 'Engagement', desc: 'Community-focused' },
  { key: 'branded', label: 'Branded', desc: 'Brand recognition' },
  { key: 'trending', label: 'Trending', desc: 'Ride viral waves' },
  { key: 'local', label: 'Local', desc: 'Geo-targeted' },
] as const;
const languages = ['English', 'Français', 'Español', 'Deutsch', 'Italiano', 'Português', '日本語', '中文', '한국°', 'العربية', 'हिन्दी', 'Nederlands', 'Polski', 'Svenska', 'Norsk', 'Dansk', 'Suomi', 'Türkçe', 'Русский', 'Українська', 'Bahasa Indonesia', 'Bahasa Melayu', 'Tiếng Việt', 'ไทย', 'Filipino'] as const;

type TagItem = { tag: string; reach: string };
type HashtagSet = { name: string; tags: TagItem[] };

const reachColors: Record<string, string> = {
  L: 'text-green-400',
  M: 'text-yellow-400',
  S: 'text-blue-400',
};

export default function HashtagsPage() {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState<string>('Instagram');
  const [strategy, setStrategy] = useState<string>('reach');
  const [language, setLanguage] = useState<string>('English');
  const [brand, setBrand] = useState('');
  const [sets, setSets] = useState<HashtagSet[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  async function generate() {
    setLoading(true);
    try {
      const r = await fetch('/api/hashtags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, platform, strategy, language, brand }),
      });
      const data = await r.json();
      setSets(data.sets || []);
    } catch {
      setSets([]);
    }
    setLoading(false);
  }

  function copySet(set: HashtagSet) {
    const text = set.tags.map(t => `#${t.tag}`).join(' ');
    navigator.clipboard.writeText(text);
    setCopied(set.name);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <main className="min-h-screen">
      <section className="px-6 py-20 max-w-3xl mx-auto text-center">
        <p className="text-xs text-green-400 uppercase tracking-widest mb-3 font-semibold">New Tool</p>
        <h1 className="text-5xl font-bold mb-4">
          AI <span className="gradient-text">Hashtag Generator</span>
        </h1>
        <p className="text-zinc-400 text-lg mb-4 max-w-xl mx-auto">
          Generate 3 optimized hashtag sets per platform. A/B test reach vs. engagement vs. branded strategies. Platform-specific algorithms decoded.
        </p>
        <p className="text-zinc-500 text-sm mb-12">Free. No signup. 7 platforms, 5 strategies, 25+ languages.</p>

        <div className="glass rounded-2xl p-6 text-left">
          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Topic or niche</label>
          <input value={topic} onChange={e => setTopic(e.target.value)}
            placeholder="e.g. SaaS marketing, fitness coaching, travel photography, AI tools..."
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-pink-500 transition mb-5" />

          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Brand name (optional)</label>
          <input value={brand} onChange={e => setBrand(e.target.value)}
            placeholder="e.g. PostCraft, Nike, YourBrand..."
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-pink-500 transition mb-5" />

          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Platform</label>
          <div className="flex flex-wrap gap-2 mb-5">
            {platforms.map(p => (
              <button key={p} onClick={() => setPlatform(p)}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition ${platform === p ? 'bg-pink-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
                {p}
              </button>
            ))}
          </div>

          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Strategy</label>
          <div className="flex flex-wrap gap-2 mb-5">
            {strategies.map(s => (
              <button key={s.key} onClick={() => setStrategy(s.key)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition ${strategy === s.key ? 'bg-purple-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
                {s.label}
                <span className="text-zinc-500 ml-1 hidden sm:inline">({s.desc})</span>
              </button>
            ))}
          </div>

          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Language</label>
          <select value={language} onChange={e => setLanguage(e.target.value)}
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-pink-500 transition mb-6">
            {languages.map(l => <option key={l} value={l}>{l}</option>)}
          </select>

          <button onClick={generate} disabled={loading || !topic.trim()}
            className="w-full py-3.5 btn-primary rounded-xl font-semibold text-white">
            {loading ? 'Analyzing algorithms...' : 'Generate 3 Hashtag Sets'}
          </button>
        </div>
      </section>

      {/* Results */}
      {sets.length > 0 && (
        <section className="px-6 pb-16 max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold mb-6">Your Hashtag Sets for {platform}</h2>
          <div className="space-y-6">
            {sets.map((set) => (
              <div key={set.name} className="glass rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-zinc-200">{set.name}</h3>
                  <button onClick={() => copySet(set)}
                    className={`text-xs px-4 py-2 rounded-lg transition ${copied === set.name ? 'bg-green-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
                    {copied === set.name ? 'Copied!' : 'Copy set'}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {set.tags.map((t, i) => (
                    <span key={i} className="inline-flex items-center gap-1 bg-zinc-800/80 rounded-lg px-3 py-1.5 text-sm">
                      <span className="text-zinc-300">#{t.tag}</span>
                      <span className={`text-xs font-bold ${reachColors[t.reach] || 'text-zinc-500'}`}>{t.reach}</span>
                    </span>
                  ))}
                </div>
                <p className="text-xs text-zinc-600 mt-3">
                  {set.tags.length} tags | L = 1M+ reach | M = 10K-1M | S = under 10K
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Hashtag Science */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">The Science of Hashtag Strategy</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass rounded-xl p-5">
              <h3 className="font-semibold mb-2">Size Mixing</h3>
              <p className="text-sm text-zinc-400">Combine large (1M+), medium (10K-1M), and small (under 10K) hashtags. You rank faster in small tags, which feeds momentum into larger ones.</p>
            </div>
            <div className="glass rounded-xl p-5">
              <h3 className="font-semibold mb-2">Platform Limits</h3>
              <p className="text-sm text-zinc-400">Instagram: 20-30 tags. Twitter/X: 3-5 max. LinkedIn: 3-5. TikTok: 4-6. More isn&apos;t always better — each platform has its sweet spot.</p>
            </div>
            <div className="glass rounded-xl p-5">
              <h3 className="font-semibold mb-2">A/B Testing</h3>
              <p className="text-sm text-zinc-400">We generate 3 sets per query so you can test different strategies. Track which set drives more impressions and engagement, then double down.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Guide */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Platform-Specific Hashtag Rules</h2>
          <div className="space-y-4">
            {[
              ['Instagram', '20-30 hashtags', 'Mix 5 large + 10 medium + 10 small. Place in first comment or caption. Rotate sets every 3-5 posts to avoid shadowban.'],
              ['Twitter/X', '3-5 hashtags', 'Less is more. 1-2 trending + 2-3 niche. Place at end of tweet. Never mid-sentence.'],
              ['LinkedIn', '3-5 hashtags', 'Professional tags only. Mix industry (#SaaS) with skill (#ContentMarketing). Bottom of post.'],
              ['TikTok', '4-6 hashtags', 'Always include 1-2 trending/viral tags. Niche + trending combo. Short tags preferred — TikTok search is hashtag-first.'],
              ['YouTube', '8-15 tags', 'Think SEO keywords. Include exact phrases people search. Mix broad + long-tail. First 3 tags matter most.'],
              ['Pinterest', '5-8 hashtags', 'Descriptive and search-oriented. Think like a user typing in the search bar. Seasonal tags perform exceptionally.'],
              ['Facebook', '2-3 hashtags max', 'Facebook penalizes over-tagging. 1 branded + 1-2 topical. In the post body, not at the end.'],
            ].map(([plat, count, desc]) => (
              <div key={plat} className="glass rounded-xl p-5">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-zinc-200 font-semibold">{plat}</h3>
                  <span className="text-xs text-pink-400 font-medium">{count}</span>
                </div>
                <p className="text-sm text-zinc-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross Links */}
      <section className="px-6 py-12 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-zinc-500 text-sm mb-4">Generate the content to go with your hashtags:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="/threads" className="text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg transition">Thread Generator</a>
            <a href="/hooks" className="text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg transition">Hook Generator</a>
            <a href="/video-scripts" className="text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg transition">Video Scripts</a>
            <a href="/" className="text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg transition">Post Generator</a>
            <a href="/campaign" className="text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg transition">Campaign Mode</a>
          </div>
        </div>
      </section>

      <footer className="px-6 py-8 border-t border-zinc-800/50 text-center text-xs text-zinc-600">
        <p>&copy; {new Date().getFullYear()} PostCraft AI. All rights reserved.</p>
      </footer>
    </main>
  );
}
