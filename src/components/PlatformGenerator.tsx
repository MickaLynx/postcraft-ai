'use client';
import { useState } from 'react';

const tones = ['professional', 'casual', 'funny', 'provocative', 'inspiring', 'empathetic', 'urgent', 'storytelling'] as const;
const languages = ['English', 'Fran\u00e7ais', 'Espa\u00f1ol', 'Deutsch', 'Italiano', 'Portugu\u00eas', '\u65E5\u672C\u8A9E', '\u4E2D\u6587', '\uD55C\uAD6D\u00B0', '\u0627\u0644\u0639\u0631\u0628\u064A\u0629', '\u0939\u093F\u0928\u094D\u0926\u0940', 'Nederlands', 'Polski', 'Svenska', 'Norsk', 'Dansk', 'Suomi', 'T\u00FCrk\u00E7e', '\u0420\u0443\u0441\u0441\u043A\u0438\u0439', '\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430', 'Bahasa Indonesia', 'Bahasa Melayu', 'Ti\u1EBFng Vi\u1EC7t', '\u0E44\u0E17\u0E22', 'Filipino'] as const;
const charLimits: Record<string, number> = { 'Twitter/X': 280, LinkedIn: 3000, Instagram: 2200, TikTok: 300, Facebook: 5000 };

interface PlatformConfig {
  platform: string;
  title: string;
  gradientWord: string;
  subtitle: string;
  charNote: string;
  placeholder: string;
  defaultTone: string;
  loadingText: string;
  buttonText: string;
  resultTitle: string;
  seoTitle: string;
  seoContent: React.ReactNode;
  crossLinks: { href: string; label: string }[];
}

export default function PlatformGenerator({ config }: { config: PlatformConfig }) {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState<string>(config.defaultTone);
  const [language, setLanguage] = useState<string>('English');
  const [posts, setPosts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);
  const limit = charLimits[config.platform] || 280;

  async function generate() {
    setLoading(true);
    try {
      const r = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, platform: config.platform, tone, language }),
      });
      const data = await r.json();
      setPosts(data.posts || []);
    } catch {
      setPosts(['Error generating content. Please try again.']);
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
        <h1 className="text-5xl font-bold mb-4">
          {config.title} <span className="gradient-text">{config.gradientWord}</span> Generator
        </h1>
        <p className="text-zinc-400 text-lg mb-4 max-w-xl mx-auto">{config.subtitle}</p>
        <p className="text-zinc-500 text-sm mb-12">{config.charNote}</p>

        <div className="glass rounded-2xl p-6 text-left">
          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">What&apos;s your post about?</label>
          <input value={topic} onChange={e => setTopic(e.target.value)}
            placeholder={config.placeholder}
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-pink-500 transition mb-5" />

          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Tone</label>
          <div className="flex flex-wrap gap-2 mb-5">
            {tones.map(t => (
              <button key={t} onClick={() => setTone(t)}
                className={`px-4 py-2 rounded-lg text-xs font-medium capitalize transition ${tone === t ? 'bg-purple-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
                {t}
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
            {loading ? config.loadingText : config.buttonText}
          </button>
        </div>
      </section>

      {posts.length > 0 && (
        <section className="px-6 pb-16 max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">{config.resultTitle}</h2>
          <div className="space-y-3">
            {posts.map((p, i) => (
              <div key={i} onClick={() => copy(p, i)} className="glass rounded-xl p-5 cursor-pointer hover:border-pink-500/40 transition fade-in">
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{p}</p>
                <div className="flex items-center justify-between mt-3 text-xs text-zinc-500">
                  <span>{p.length} / {limit.toLocaleString()} chars</span>
                  <span className={copied === i ? 'text-green-400' : ''}>{copied === i ? 'Copied!' : 'Click to copy'}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SEO Content */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">{config.seoTitle}</h2>
          <div className="space-y-4 text-sm text-zinc-400 leading-relaxed">
            {config.seoContent}
          </div>
        </div>
      </section>

      {/* Cross Links */}
      <section className="px-6 py-12 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-zinc-500 text-sm mb-4">Generate content for other platforms too:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {config.crossLinks.map(link => (
              <a key={link.href} href={link.href} className="text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg transition">{link.label}</a>
            ))}
          </div>
        </div>
      </section>

      <footer className="px-6 py-8 border-t border-zinc-800/50 text-center text-xs text-zinc-600">
        <p>&copy; {new Date().getFullYear()} PostCraft AI. All rights reserved.</p>
      </footer>
    </main>
  );
}
