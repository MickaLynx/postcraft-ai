'use client';
import { useState } from 'react';

const platforms = ['Twitter/X', 'LinkedIn', 'Instagram', 'TikTok', 'Facebook', 'YouTube', 'Newsletter'] as const;
const hookStyles = [
  { key: 'question', label: 'Question', desc: 'Provocative questions' },
  { key: 'statistic', label: 'Statistic', desc: 'Surprising data' },
  { key: 'story', label: 'Story', desc: 'Mini anecdotes' },
  { key: 'controversial', label: 'Controversial', desc: 'Bold statements' },
  { key: 'howto', label: 'How-To', desc: 'Actionable value' },
  { key: 'pov', label: 'POV', desc: 'Point of view' },
  { key: 'listicle', label: 'Listicle', desc: 'Numbered hooks' },
] as const;
const languages = ['English', 'Français', 'Español', 'Deutsch', 'Italiano', 'Português', '日本語', '中文', '한국°', 'العربية', 'हिन्दी', 'Nederlands', 'Polski', 'Svenska', 'Norsk', 'Dansk', 'Suomi', 'Türkçe', 'Русский', 'Українська', 'Bahasa Indonesia', 'Bahasa Melayu', 'Tiếng Việt', 'ไทย', 'Filipino'] as const;

export default function HooksPage() {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState<string>('Twitter/X');
  const [style, setStyle] = useState<string>('question');
  const [language, setLanguage] = useState<string>('English');
  const [hooks, setHooks] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);

  async function generate() {
    setLoading(true);
    try {
      const r = await fetch('/api/hooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, platform, style, language, count: 10 }),
      });
      const data = await r.json();
      setHooks(data.hooks || []);
    } catch {
      setHooks(['Error generating hooks. Please try again.']);
    }
    setLoading(false);
  }

  function copy(text: string, idx: number) {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  }

  function copyAll() {
    navigator.clipboard.writeText(hooks.join('\n\n'));
    setCopied(-1);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <main className="min-h-screen">
      <section className="px-6 py-20 max-w-3xl mx-auto text-center">
        <p className="text-xs text-pink-400 uppercase tracking-widest mb-3 font-semibold">New Tool</p>
        <h1 className="text-5xl font-bold mb-4">
          AI <span className="gradient-text">Hook Generator</span>
        </h1>
        <p className="text-zinc-400 text-lg mb-4 max-w-xl mx-auto">
          Generate 10 scroll-stopping hooks for any platform. The first line decides if people read or scroll past. Make it count.
        </p>
        <p className="text-zinc-500 text-sm mb-12">Free. No signup. 7 hook styles, 7 platforms, 25+ languages.</p>

        <div className="glass rounded-2xl p-6 text-left">
          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Topic or product</label>
          <input value={topic} onChange={e => setTopic(e.target.value)}
            placeholder="e.g. AI productivity tool launch, fitness coaching program, SaaS pricing strategy..."
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

          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Hook Style</label>
          <div className="flex flex-wrap gap-2 mb-5">
            {hookStyles.map(s => (
              <button key={s.key} onClick={() => setStyle(s.key)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition ${style === s.key ? 'bg-purple-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
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
            {loading ? 'Crafting your hooks...' : 'Generate 10 Hooks'}
          </button>
        </div>
      </section>

      {/* Results */}
      {hooks.length > 0 && (
        <section className="px-6 pb-16 max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Your Hooks</h2>
            <button onClick={copyAll}
              className={`text-xs px-4 py-2 rounded-lg transition ${copied === -1 ? 'bg-green-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
              {copied === -1 ? 'Copied all!' : 'Copy all hooks'}
            </button>
          </div>
          <div className="space-y-3">
            {hooks.map((h, i) => (
              <div key={i} onClick={() => copy(h, i)}
                className="glass rounded-xl p-5 cursor-pointer hover:border-pink-500/40 transition fade-in">
                <div className="flex items-start gap-3">
                  <span className="text-pink-400 font-bold text-lg mt-0.5">{i + 1}</span>
                  <p className="text-sm whitespace-pre-wrap leading-relaxed flex-1">{h}</p>
                </div>
                <div className="flex items-center justify-end mt-2 text-xs text-zinc-500">
                  <span className={copied === i ? 'text-green-400' : ''}>{copied === i ? 'Copied!' : 'Click to copy'}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Why Hooks Matter */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">Why Your Hook Is Everything</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass rounded-xl p-5">
              <h3 className="font-semibold mb-2">1.3 Seconds</h3>
              <p className="text-sm text-zinc-400">Average time a user spends deciding to scroll past or engage. Your hook is your only shot.</p>
            </div>
            <div className="glass rounded-xl p-5">
              <h3 className="font-semibold mb-2">80% of Readers</h3>
              <p className="text-sm text-zinc-400">Never make it past the first line. A great hook is the difference between 100 views and 100K views.</p>
            </div>
            <div className="glass rounded-xl p-5">
              <h3 className="font-semibold mb-2">7 Proven Styles</h3>
              <p className="text-sm text-zinc-400">Questions, stats, stories, POVs, controversy — each style triggers different psychological responses.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hook Styles Explained */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">The 7 Hook Styles Explained</h2>
          <div className="space-y-4 text-sm text-zinc-400 leading-relaxed">
            <div className="glass rounded-xl p-5">
              <h3 className="text-zinc-200 font-semibold mb-1">Question Hooks</h3>
              <p>Open with a question that challenges assumptions. &ldquo;What if everything you know about productivity is wrong?&rdquo; Forces the reader to engage mentally.</p>
            </div>
            <div className="glass rounded-xl p-5">
              <h3 className="text-zinc-200 font-semibold mb-1">Statistic Hooks</h3>
              <p>Lead with a surprising number. &ldquo;93% of marketers create content that nobody reads.&rdquo; Data creates instant credibility and curiosity.</p>
            </div>
            <div className="glass rounded-xl p-5">
              <h3 className="text-zinc-200 font-semibold mb-1">Story Hooks</h3>
              <p>Start with a micro-story. &ldquo;Last Tuesday, I lost a $50K client in 30 seconds.&rdquo; Stories are neurologically irresistible — we can&apos;t not find out what happened.</p>
            </div>
            <div className="glass rounded-xl p-5">
              <h3 className="text-zinc-200 font-semibold mb-1">Controversial Hooks</h3>
              <p>Make a bold claim. &ldquo;Posting daily on LinkedIn is destroying your brand.&rdquo; Controversy triggers the engagement reflex — agree or disagree, people react.</p>
            </div>
            <div className="glass rounded-xl p-5">
              <h3 className="text-zinc-200 font-semibold mb-1">How-To Hooks</h3>
              <p>Promise actionable value. &ldquo;How I grew from 0 to 10K followers in 60 days (exact playbook).&rdquo; The &ldquo;how&rdquo; framework signals immediate utility.</p>
            </div>
            <div className="glass rounded-xl p-5">
              <h3 className="text-zinc-200 font-semibold mb-1">POV Hooks</h3>
              <p>&ldquo;POV: You just discovered an AI that writes all your social content.&rdquo; The POV format creates immersion — readers project themselves into the scenario.</p>
            </div>
            <div className="glass rounded-xl p-5">
              <h3 className="text-zinc-200 font-semibold mb-1">Listicle Hooks</h3>
              <p>&ldquo;5 things nobody tells you about starting a business.&rdquo; Numbers in hooks increase click-through by 30%. They set expectations and promise structure.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cross Links */}
      <section className="px-6 py-12 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-zinc-500 text-sm mb-4">Generate full content too:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="/video-scripts" className="text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg transition">Video Scripts</a>
            <a href="/campaign" className="text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg transition">Campaign Mode</a>
            <a href="/atomizer" className="text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg transition">Content Atomizer</a>
            <a href="/twitter-posts" className="text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg transition">Twitter/X Posts</a>
            <a href="/linkedin-posts" className="text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg transition">LinkedIn Posts</a>
          </div>
        </div>
      </section>

      <footer className="px-6 py-8 border-t border-zinc-800/50 text-center text-xs text-zinc-600">
        <p>&copy; {new Date().getFullYear()} PostCraft AI. All rights reserved.</p>
      </footer>
    </main>
  );
}
