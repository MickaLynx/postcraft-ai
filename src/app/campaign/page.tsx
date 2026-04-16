'use client';
import { useState } from 'react';

const allPlatforms = [
  { key: 'Twitter/X', label: 'Twitter/X', limit: 280 },
  { key: 'LinkedIn', label: 'LinkedIn', limit: 3000 },
  { key: 'Instagram', label: 'Instagram', limit: 2200 },
  { key: 'TikTok', label: 'TikTok', limit: 300 },
  { key: 'Facebook', label: 'Facebook', limit: 5000 },
] as const;

const tones = ['professional', 'casual', 'funny', 'provocative', 'inspiring', 'empathetic', 'urgent', 'storytelling'] as const;
const languages = ['English', 'Fran\u00e7ais', 'Espa\u00f1ol', 'Deutsch', 'Italiano', 'Portugu\u00eas', '\u65E5\u672C\u8A9E', '\u4E2D\u6587', '\uD55C\uAD6D\u00B0', '\u0627\u0644\u0639\u0631\u0628\u064A\u0629', '\u0939\u093F\u0928\u094D\u0926\u0940', 'Nederlands', 'Polski', 'Svenska', 'Norsk', 'Dansk', 'Suomi', 'T\u00FCrk\u00E7e', '\u0420\u0443\u0441\u0441\u043A\u0438\u0439', '\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430', 'Bahasa Indonesia', 'Bahasa Melayu', 'Ti\u1EBFng Vi\u1EC7t', '\u0E44\u0E17\u0E22', 'Filipino'] as const;

type CampaignResults = Record<string, string[]>;

export default function CampaignPage() {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState<string>('professional');
  const [language, setLanguage] = useState<string>('English');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['Twitter/X', 'LinkedIn', 'Instagram']);
  const [results, setResults] = useState<CampaignResults>({});
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  function togglePlatform(key: string) {
    setSelectedPlatforms(prev =>
      prev.includes(key) ? prev.filter(p => p !== key) : [...prev, key]
    );
  }

  async function generateCampaign() {
    if (!topic.trim() || selectedPlatforms.length === 0) return;
    setLoading(true);
    setResults({});

    const newResults: CampaignResults = {};

    for (const platform of selectedPlatforms) {
      setProgress(`Generating ${platform} posts...`);
      try {
        const r = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ topic, platform, tone, language, count: 3 }),
        });
        const data = await r.json();
        newResults[platform] = data.posts || [];
      } catch {
        newResults[platform] = ['Error generating posts.'];
      }
      setResults({ ...newResults });
    }

    setProgress('');
    setLoading(false);
  }

  function copyPost(text: string, key: string) {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }

  function copyAll() {
    const allText = Object.entries(results)
      .map(([platform, posts]) => `--- ${platform} ---\n${posts.join('\n\n')}`)
      .join('\n\n');
    navigator.clipboard.writeText(allText);
    setCopied('all');
    setTimeout(() => setCopied(null), 2000);
  }

  const totalPosts = Object.values(results).reduce((sum, posts) => sum + posts.length, 0);

  return (
    <main className="min-h-screen">
      <section className="px-6 py-20 max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">
          <span className="gradient-text">Campaign Mode</span>
        </h1>
        <p className="text-zinc-400 text-lg mb-4 max-w-2xl mx-auto">
          One topic, multiple platforms. Generate an entire cross-platform campaign in seconds.
          Each post is automatically adapted to the platform&apos;s tone, format, and character limits.
        </p>
        <p className="text-zinc-500 text-sm mb-12">Free. No signup. Save hours of content adaptation work.</p>

        <div className="glass rounded-2xl p-6 text-left">
          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Campaign topic or goal</label>
          <input value={topic} onChange={e => setTopic(e.target.value)}
            placeholder="e.g. Launch of our new AI productivity tool, announce 40% off summer sale..."
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-pink-500 transition mb-5" />

          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Platforms (select 2+)</label>
          <div className="flex flex-wrap gap-2 mb-5">
            {allPlatforms.map(p => (
              <button key={p.key} onClick={() => togglePlatform(p.key)}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition ${
                  selectedPlatforms.includes(p.key)
                    ? 'bg-pink-600 text-white'
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}>
                {p.label} <span className="text-zinc-400 ml-1">({p.limit})</span>
              </button>
            ))}
          </div>

          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Tone</label>
          <div className="flex flex-wrap gap-2 mb-5">
            {tones.map(t => (
              <button key={t} onClick={() => setTone(t)}
                className={`px-4 py-2 rounded-lg text-xs font-medium capitalize transition ${
                  tone === t ? 'bg-purple-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}>
                {t}
              </button>
            ))}
          </div>

          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Language</label>
          <select value={language} onChange={e => setLanguage(e.target.value)}
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-pink-500 transition mb-6">
            {languages.map(l => <option key={l} value={l}>{l}</option>)}
          </select>

          <button onClick={generateCampaign}
            disabled={loading || !topic.trim() || selectedPlatforms.length < 2}
            className="w-full py-3.5 btn-primary rounded-xl font-semibold text-white">
            {loading ? progress || 'Generating campaign...' : `Generate Campaign (${selectedPlatforms.length} platforms)`}
          </button>
        </div>
      </section>

      {/* Results */}
      {totalPosts > 0 && (
        <section className="px-6 pb-20 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">
              Your Campaign — {totalPosts} posts across {Object.keys(results).length} platforms
            </h2>
            <button onClick={copyAll}
              className={`text-xs px-4 py-2 rounded-lg transition ${
                copied === 'all' ? 'bg-green-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}>
              {copied === 'all' ? 'Copied all!' : 'Copy entire campaign'}
            </button>
          </div>

          <div className="space-y-8">
            {Object.entries(results).map(([platform, posts]) => {
              const limit = allPlatforms.find(p => p.key === platform)?.limit || 280;
              return (
                <div key={platform}>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <span className="px-3 py-1 bg-pink-600/20 text-pink-400 rounded-lg text-xs font-bold">{platform}</span>
                    <span className="text-zinc-500 text-xs">{posts.length} posts</span>
                  </h3>
                  <div className="space-y-3">
                    {posts.map((p, i) => {
                      const key = `${platform}-${i}`;
                      return (
                        <div key={key} onClick={() => copyPost(p, key)}
                          className="glass rounded-xl p-5 cursor-pointer hover:border-pink-500/40 transition fade-in">
                          <p className="text-sm whitespace-pre-wrap leading-relaxed">{p}</p>
                          <div className="flex items-center justify-between mt-3 text-xs text-zinc-500">
                            <span>{p.length} / {limit.toLocaleString()} chars</span>
                            <span className={copied === key ? 'text-green-400' : ''}>
                              {copied === key ? 'Copied!' : 'Click to copy'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Value Prop */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">Why Campaign Mode?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass rounded-xl p-5">
              <h3 className="font-semibold mb-2">One Topic, All Platforms</h3>
              <p className="text-sm text-zinc-400">Enter your campaign goal once. Get posts adapted to each platform&apos;s format, character limits, and audience expectations.</p>
            </div>
            <div className="glass rounded-xl p-5">
              <h3 className="font-semibold mb-2">Platform-Native Tone</h3>
              <p className="text-sm text-zinc-400">LinkedIn gets professional thought leadership. Twitter/X gets punchy one-liners. TikTok gets hook-first scripts. Automatically.</p>
            </div>
            <div className="glass rounded-xl p-5">
              <h3 className="font-semibold mb-2">Copy Entire Campaign</h3>
              <p className="text-sm text-zinc-400">One click exports all posts, organized by platform. Paste into your scheduler and you&apos;re done for the week.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cross Links */}
      <section className="px-6 py-12 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-zinc-500 text-sm mb-4">Or generate for a single platform:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="/instagram-captions" className="text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg transition">Instagram Captions</a>
            <a href="/linkedin-posts" className="text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg transition">LinkedIn Posts</a>
            <a href="/twitter-posts" className="text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg transition">Twitter/X Posts</a>
            <a href="/tiktok-scripts" className="text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg transition">TikTok Scripts</a>
          </div>
        </div>
      </section>

      <footer className="px-6 py-8 border-t border-zinc-800/50 text-center text-xs text-zinc-600">
        <p>&copy; {new Date().getFullYear()} PostCraft AI. All rights reserved.</p>
      </footer>
    </main>
  );
}
