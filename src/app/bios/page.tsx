'use client';
import { useState } from 'react';

const platforms = ['Twitter/X', 'LinkedIn', 'Instagram', 'TikTok', 'YouTube', 'GitHub', 'Personal Website'] as const;
const styles = [
  { key: 'professional', label: 'Professional', desc: 'Corporate & credible' },
  { key: 'creative', label: 'Creative', desc: 'Bold & unique' },
  { key: 'minimal', label: 'Minimal', desc: 'Short & punchy' },
  { key: 'funny', label: 'Funny', desc: 'Witty & memorable' },
  { key: 'authoritative', label: 'Authoritative', desc: 'Expert positioning' },
  { key: 'personal', label: 'Personal', desc: 'Warm & relatable' },
] as const;
const languages = ['English', 'Français', 'Español', 'Deutsch', 'Italiano', 'Português', '日本語', '中文', '한국어', 'العربية', 'हिन्दी', 'Nederlands', 'Polski', 'Svenska', 'Norsk', 'Dansk', 'Suomi', 'Türkçe', 'Русский', 'Українська', 'Bahasa Indonesia', 'Bahasa Melayu', 'Tiếng Việt', 'ไทย', 'Filipino'] as const;

const charLimits: Record<string, number> = {
  'Twitter/X': 160,
  LinkedIn: 2600,
  Instagram: 150,
  TikTok: 80,
  YouTube: 1000,
  GitHub: 256,
  'Personal Website': 500,
};

export default function BiosPage() {
  const [role, setRole] = useState('');
  const [keywords, setKeywords] = useState('');
  const [platform, setPlatform] = useState<string>('Twitter/X');
  const [style, setStyle] = useState<string>('professional');
  const [language, setLanguage] = useState<string>('English');
  const [bios, setBios] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);

  async function generate() {
    setLoading(true);
    try {
      const r = await fetch('/api/bios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, keywords, platform, style, language }),
      });
      const data = await r.json();
      setBios(data.bios || []);
    } catch {
      setBios(['Error generating bios. Please try again.']);
    }
    setLoading(false);
  }

  function copy(text: string, idx: number) {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <main className="min-h-screen">
      <section className="px-6 py-20 max-w-3xl mx-auto text-center">
        <p className="text-xs text-cyan-400 uppercase tracking-widest mb-3 font-semibold">New Tool</p>
        <h1 className="text-5xl font-bold mb-4">
          AI <span className="gradient-text">Bio Generator</span>
        </h1>
        <p className="text-zinc-400 text-lg mb-4 max-w-xl mx-auto">
          Generate 5 platform-optimized bios that position you as an authority. Your bio is your first impression — make it unforgettable.
        </p>
        <p className="text-zinc-500 text-sm mb-12">Free. No signup. 7 platforms, 6 styles, 25+ languages.</p>

        <div className="glass rounded-2xl p-6 text-left">
          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Your role or title</label>
          <input value={role} onChange={e => setRole(e.target.value)}
            placeholder="e.g. SaaS Founder, Fitness Coach, Marketing Director, UX Designer..."
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-pink-500 transition mb-5" />

          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Keywords / achievements (optional)</label>
          <input value={keywords} onChange={e => setKeywords(e.target.value)}
            placeholder="e.g. Y Combinator, 10K followers, published author, ex-Google, $1M ARR..."
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-pink-500 transition mb-5" />

          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Platform</label>
          <div className="flex flex-wrap gap-2 mb-5">
            {platforms.map(p => (
              <button key={p} onClick={() => setPlatform(p)}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition ${platform === p ? 'bg-cyan-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
                {p} <span className="text-zinc-500 ml-1">({charLimits[p]})</span>
              </button>
            ))}
          </div>

          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Style</label>
          <div className="flex flex-wrap gap-2 mb-5">
            {styles.map(s => (
              <button key={s.key} onClick={() => setStyle(s.key)}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition ${style === s.key ? 'bg-purple-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
                {s.label}
              </button>
            ))}
          </div>

          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Language</label>
          <select value={language} onChange={e => setLanguage(e.target.value)}
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-pink-500 transition mb-6">
            {languages.map(l => <option key={l} value={l}>{l}</option>)}
          </select>

          <button onClick={generate} disabled={loading || !role.trim()}
            className="w-full py-3.5 btn-primary rounded-xl font-semibold text-white">
            {loading ? 'Crafting your bios...' : 'Generate 5 Bios'}
          </button>
        </div>
      </section>

      {bios.length > 0 && (
        <section className="px-6 pb-20 max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Your Bios</h2>
          <div className="space-y-3">
            {bios.map((b, i) => (
              <div key={i} onClick={() => copy(b, i)}
                className="glass rounded-xl p-5 cursor-pointer hover:border-pink-500/40 transition fade-in">
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{b}</p>
                <div className="flex items-center justify-between mt-3 text-xs text-zinc-500">
                  <span className={b.length > charLimits[platform] ? 'text-red-400' : ''}>{b.length} / {charLimits[platform]} chars</span>
                  <span className={copied === i ? 'text-green-400' : ''}>{copied === i ? 'Copied!' : 'Click to copy'}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Why Your Bio Matters */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">Why Your Bio Matters</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass rounded-xl p-5 text-center">
              <p className="text-3xl font-bold gradient-text mb-2">73%</p>
              <p className="text-sm text-zinc-400">of people judge credibility from the bio alone</p>
            </div>
            <div className="glass rounded-xl p-5 text-center">
              <p className="text-3xl font-bold gradient-text mb-2">2.5x</p>
              <p className="text-sm text-zinc-400">more followers with an optimized bio</p>
            </div>
            <div className="glass rounded-xl p-5 text-center">
              <p className="text-3xl font-bold gradient-text mb-2">3 sec</p>
              <p className="text-sm text-zinc-400">average time someone reads your bio</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">Bio Best Practices by Platform</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              ['Twitter/X (160 chars)', 'Lead with what you do, add personality. Use | or emojis as separators. Include a CTA or link mention.'],
              ['LinkedIn (2,600 chars)', 'Start with your value proposition. Use line breaks. Include metrics and achievements. End with a CTA.'],
              ['Instagram (150 chars)', 'Short, punchy, emoji-friendly. Include niche keywords. Line breaks for readability. Link in bio mention.'],
              ['TikTok (80 chars)', 'Ultra-concise. Focus on niche + personality. Emojis help compress. Make it memorable in 2 words.'],
              ['YouTube (1,000 chars)', 'First 2 lines are visible. Hook immediately. Include upload schedule. SEO keywords for discovery.'],
              ['GitHub (256 chars)', 'Tech stack + role. Open source contributions. Location optional. Keep it developer-focused.'],
            ].map(([title, desc]) => (
              <div key={title} className="glass rounded-xl p-5">
                <h3 className="font-semibold mb-2 text-sm">{title}</h3>
                <p className="text-sm text-zinc-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
