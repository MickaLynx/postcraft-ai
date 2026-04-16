'use client';
import { useState } from 'react';

const formats = [
  { key: 'twitter-thread', label: 'Twitter/X Thread', desc: '5-10 tweets' },
  { key: 'linkedin-carousel', label: 'LinkedIn Carousel', desc: '8-12 slides' },
  { key: 'linkedin-thread', label: 'LinkedIn + Comments', desc: 'Post + 3 comments' },
  { key: 'twitter-essay', label: 'Twitter/X Essay', desc: '10-15 tweet deep dive' },
  { key: 'instagram-carousel', label: 'Instagram Carousel', desc: '7-10 slides' },
] as const;
const tones = [
  { key: 'educational', label: 'Educational' },
  { key: 'storytelling', label: 'Storytelling' },
  { key: 'controversial', label: 'Controversial' },
  { key: 'tactical', label: 'Tactical' },
  { key: 'inspirational', label: 'Inspirational' },
  { key: 'analytical', label: 'Analytical' },
] as const;
const languages = ['English', 'Français', 'Español', 'Deutsch', 'Italiano', 'Português', '日本語', '中文', '한국°', 'العربية', 'हिन्दी', 'Nederlands', 'Polski', 'Svenska', 'Norsk', 'Dansk', 'Suomi', 'Türkçe', 'Русский', 'Українська', 'Bahasa Indonesia', 'Bahasa Melayu', 'Tiếng Việt', 'ไทย', 'Filipino'] as const;

export default function ThreadsPage() {
  const [topic, setTopic] = useState('');
  const [format, setFormat] = useState<string>('twitter-thread');
  const [tone, setTone] = useState<string>('educational');
  const [language, setLanguage] = useState<string>('English');
  const [title, setTitle] = useState('');
  const [parts, setParts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);

  async function generate() {
    setLoading(true);
    try {
      const r = await fetch('/api/threads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, format, tone, language }),
      });
      const data = await r.json();
      setTitle(data.title || topic);
      setParts(data.parts || []);
    } catch {
      setParts(['Error generating thread. Please try again.']);
    }
    setLoading(false);
  }

  function copy(text: string, idx: number) {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  }

  function copyAll() {
    navigator.clipboard.writeText(parts.join('\n\n'));
    setCopied(-1);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <main className="min-h-screen">
      <section className="px-6 py-20 max-w-3xl mx-auto text-center">
        <p className="text-xs text-purple-400 uppercase tracking-widest mb-3 font-semibold">New Tool</p>
        <h1 className="text-5xl font-bold mb-4">
          AI <span className="gradient-text">Thread Generator</span>
        </h1>
        <p className="text-zinc-400 text-lg mb-4 max-w-xl mx-auto">
          Turn any topic into a viral thread or carousel. Twitter/X threads, LinkedIn carousels, Instagram slides — all format-optimized.
        </p>
        <p className="text-zinc-500 text-sm mb-12">Free. No signup. 5 formats, 6 tones, 25+ languages.</p>

        <div className="glass rounded-2xl p-6 text-left">
          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Topic or idea</label>
          <input value={topic} onChange={e => setTopic(e.target.value)}
            placeholder="e.g. 10 lessons I learned building a $1M SaaS, Why most startups fail at marketing..."
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-pink-500 transition mb-5" />

          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Format</label>
          <div className="flex flex-wrap gap-2 mb-5">
            {formats.map(f => (
              <button key={f.key} onClick={() => setFormat(f.key)}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition ${format === f.key ? 'bg-pink-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
                {f.label}
                <span className="text-zinc-500 ml-1 hidden sm:inline">({f.desc})</span>
              </button>
            ))}
          </div>

          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Tone</label>
          <div className="flex flex-wrap gap-2 mb-5">
            {tones.map(t => (
              <button key={t.key} onClick={() => setTone(t.key)}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition ${tone === t.key ? 'bg-purple-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
                {t.label}
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
            {loading ? 'Crafting your thread...' : 'Generate Thread'}
          </button>
        </div>
      </section>

      {/* Results */}
      {parts.length > 0 && (
        <section className="px-6 pb-16 max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="text-xs text-zinc-500 mt-1">{parts.length} parts</p>
            </div>
            <button onClick={copyAll}
              className={`text-xs px-4 py-2 rounded-lg transition ${copied === -1 ? 'bg-green-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
              {copied === -1 ? 'Copied all!' : 'Copy entire thread'}
            </button>
          </div>
          <div className="space-y-3">
            {parts.map((p, i) => (
              <div key={i} onClick={() => copy(p, i)}
                className="glass rounded-xl p-5 cursor-pointer hover:border-pink-500/40 transition fade-in">
                <div className="flex items-start gap-3">
                  <span className="text-purple-400 font-bold text-lg mt-0.5">{i + 1}</span>
                  <div className="flex-1">
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{p}</p>
                    {format.includes('twitter') && (
                      <p className="text-xs text-zinc-600 mt-2">{p.length}/280 chars</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-end mt-2 text-xs text-zinc-500">
                  <span className={copied === i ? 'text-green-400' : ''}>{copied === i ? 'Copied!' : 'Click to copy'}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Why Threads Work */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">Why Threads Outperform Single Posts</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass rounded-xl p-5">
              <h3 className="font-semibold mb-2">3x More Impressions</h3>
              <p className="text-sm text-zinc-400">Twitter/X threads get 3x the impressions of single tweets. Each tweet in the thread is a new entry point in the algorithm.</p>
            </div>
            <div className="glass rounded-xl p-5">
              <h3 className="font-semibold mb-2">10x More Saves</h3>
              <p className="text-sm text-zinc-400">LinkedIn carousels are saved 10x more than text posts. Saves signal high value, boosting algorithmic reach.</p>
            </div>
            <div className="glass rounded-xl p-5">
              <h3 className="font-semibold mb-2">Build Authority</h3>
              <p className="text-sm text-zinc-400">Long-form threads position you as a thought leader. One viral thread can gain you 1,000+ followers overnight.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Format Comparison */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">5 Thread Formats Explained</h2>
          <div className="space-y-4">
            {[
              ['Twitter/X Thread (5-10 tweets)', 'Classic thread format. Hook tweet → value tweets → CTA. Each tweet stands alone but builds on the previous. Best for tips, lessons, and frameworks.'],
              ['LinkedIn Carousel (8-12 slides)', 'Visual slide-by-slide content. Each slide has a bold headline + supporting text. Highest save rate on LinkedIn. Perfect for step-by-step guides.'],
              ['LinkedIn Post + Comments', 'Main post as the hook (first 2 lines matter most). Then 3 follow-up comments adding depth, examples, or resources. Boosts comment count = more reach.'],
              ['Twitter/X Essay Thread (10-15 tweets)', 'Deep dive educational mega-thread. More detailed than a standard thread. Best for comprehensive breakdowns, case studies, or analysis.'],
              ['Instagram Carousel (7-10 slides)', 'Swipeable visual content. Cover slide is the hook. Each slide delivers one key insight. Last slide is the save/share CTA. Highest engagement format on IG.'],
            ].map(([title, desc]) => (
              <div key={title} className="glass rounded-xl p-5">
                <h3 className="text-zinc-200 font-semibold mb-1">{title}</h3>
                <p className="text-sm text-zinc-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross Links */}
      <section className="px-6 py-12 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-zinc-500 text-sm mb-4">More content tools:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="/hooks" className="text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg transition">Hook Generator</a>
            <a href="/hashtags" className="text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg transition">Hashtag Generator</a>
            <a href="/video-scripts" className="text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg transition">Video Scripts</a>
            <a href="/campaign" className="text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg transition">Campaign Mode</a>
            <a href="/atomizer" className="text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg transition">Content Atomizer</a>
          </div>
        </div>
      </section>

      <footer className="px-6 py-8 border-t border-zinc-800/50 text-center text-xs text-zinc-600">
        <p>&copy; {new Date().getFullYear()} PostCraft AI. All rights reserved.</p>
      </footer>
    </main>
  );
}
