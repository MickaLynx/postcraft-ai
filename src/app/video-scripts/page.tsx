'use client';
import { useState } from 'react';

const videoFormats = [
  { key: 'tiktok-reels', label: 'TikTok / Reels / Shorts', duration: '15-60s' },
  { key: 'youtube-short', label: 'YouTube Short', duration: '30-60s' },
  { key: 'explainer', label: 'Explainer Video', duration: '60-90s' },
  { key: 'product-demo', label: 'Product Demo', duration: '30-60s' },
  { key: 'testimonial', label: 'Testimonial Script', duration: '30-45s' },
] as const;

const scriptStyles = [
  { key: 'hook-value-cta', label: 'Hook → Value → CTA' },
  { key: 'storytime', label: 'Storytime' },
  { key: 'tutorial', label: 'Step-by-Step Tutorial' },
  { key: 'before-after', label: 'Before / After' },
  { key: 'myth-busting', label: 'Myth Busting' },
  { key: 'day-in-life', label: 'Day in My Life' },
] as const;

const languages = ['English', 'Français', 'Español', 'Deutsch', 'Italiano', 'Português', '日本語', '中文', '한국°', 'العربية', 'हिन्दी', 'Nederlands', 'Polski', 'Svenska', 'Norsk', 'Dansk', 'Suomi', 'Türkçe', 'Русский', 'Українська', 'Bahasa Indonesia', 'Bahasa Melayu', 'Tiếng Việt', 'ไทย', 'Filipino'] as const;

export default function VideoScriptsPage() {
  const [topic, setTopic] = useState('');
  const [format, setFormat] = useState<string>('tiktok-reels');
  const [style, setStyle] = useState<string>('hook-value-cta');
  const [language, setLanguage] = useState<string>('English');
  const [scripts, setScripts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);

  async function generate() {
    setLoading(true);
    try {
      const formatInfo = videoFormats.find(f => f.key === format);
      const styleInfo = scriptStyles.find(s => s.key === style);
      const r = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: `[VIDEO SCRIPT - ${formatInfo?.label || format} - ${formatInfo?.duration || '30-60s'} - Style: ${styleInfo?.label || style}]\n\nTopic: ${topic}\n\nGenerate a complete video script with:\n- HOOK (first 2 seconds, bold text)\n- BODY (main content with visual cues in [brackets])\n- CTA (call to action, last 3 seconds)\n- Include estimated timestamps\n- Add [visual direction] notes throughout`,
          platform: 'TikTok',
          tone: 'casual',
          language,
          count: 3,
        }),
      });
      const data = await r.json();
      setScripts(data.posts || []);
    } catch {
      setScripts(['Error generating scripts. Please try again.']);
    }
    setLoading(false);
  }

  function copy(text: string, idx: number) {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  }

  function copyAll() {
    navigator.clipboard.writeText(scripts.map((s, i) => `--- Script ${i + 1} ---\n${s}`).join('\n\n'));
    setCopied(-1);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <main className="min-h-screen">
      <section className="px-6 py-20 max-w-3xl mx-auto text-center">
        <p className="text-xs text-pink-400 uppercase tracking-widest mb-3 font-semibold">New Tool</p>
        <h1 className="text-5xl font-bold mb-4">
          AI <span className="gradient-text">Video Script</span> Generator
        </h1>
        <p className="text-zinc-400 text-lg mb-4 max-w-xl mx-auto">
          Generate ready-to-film video scripts with hooks, visual cues, and CTAs. Optimized for TikTok, Reels, Shorts, and more.
        </p>
        <p className="text-zinc-500 text-sm mb-12">Free. No signup. 5 formats, 6 script styles, 25+ languages.</p>

        <div className="glass rounded-2xl p-6 text-left">
          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Video topic</label>
          <input value={topic} onChange={e => setTopic(e.target.value)}
            placeholder="e.g. 3 morning habits that changed my life, how to use AI for content creation, product demo for our new app..."
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-pink-500 transition mb-5" />

          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Video Format</label>
          <div className="flex flex-wrap gap-2 mb-5">
            {videoFormats.map(f => (
              <button key={f.key} onClick={() => setFormat(f.key)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition ${format === f.key ? 'bg-pink-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
                {f.label}
                <span className="text-zinc-500 ml-1">({f.duration})</span>
              </button>
            ))}
          </div>

          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Script Style</label>
          <div className="flex flex-wrap gap-2 mb-5">
            {scriptStyles.map(s => (
              <button key={s.key} onClick={() => setStyle(s.key)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition ${style === s.key ? 'bg-purple-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
                {s.label}
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
            {loading ? 'Writing your scripts...' : 'Generate 3 Video Scripts'}
          </button>
        </div>
      </section>

      {/* Results */}
      {scripts.length > 0 && (
        <section className="px-6 pb-16 max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Your Video Scripts</h2>
            <button onClick={copyAll}
              className={`text-xs px-4 py-2 rounded-lg transition ${copied === -1 ? 'bg-green-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
              {copied === -1 ? 'Copied all!' : 'Copy all scripts'}
            </button>
          </div>
          <div className="space-y-4">
            {scripts.map((s, i) => (
              <div key={i} onClick={() => copy(s, i)}
                className="glass rounded-xl p-6 cursor-pointer hover:border-pink-500/40 transition fade-in">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-pink-600/20 text-pink-400 rounded text-xs font-bold">Script {i + 1}</span>
                  <span className="text-xs text-zinc-500">{videoFormats.find(f => f.key === format)?.duration}</span>
                </div>
                <p className="text-sm whitespace-pre-wrap leading-relaxed font-mono">{s}</p>
                <div className="flex items-center justify-end mt-3 text-xs text-zinc-500">
                  <span className={copied === i ? 'text-green-400' : ''}>{copied === i ? 'Copied!' : 'Click to copy'}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Why Video Scripts */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">Why Script Your Videos?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass rounded-xl p-5">
              <h3 className="font-semibold mb-2">3x Better Retention</h3>
              <p className="text-sm text-zinc-400">Scripted videos have 3x the watch time of improvised ones. Structure keeps viewers engaged to the end.</p>
            </div>
            <div className="glass rounded-xl p-5">
              <h3 className="font-semibold mb-2">Film in One Take</h3>
              <p className="text-sm text-zinc-400">A complete script with visual cues means no re-shoots, no editing rabbitholes. Read it, film it, post it.</p>
            </div>
            <div className="glass rounded-xl p-5">
              <h3 className="font-semibold mb-2">Algorithm-Optimized</h3>
              <p className="text-sm text-zinc-400">Hook in 2 seconds, value in the middle, CTA at the end. The structure that TikTok, Reels, and Shorts reward.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">How to Write Video Scripts That Go Viral</h2>
          <div className="space-y-4 text-sm text-zinc-400 leading-relaxed">
            <p>Short-form video dominates social media in 2026. TikTok, Instagram Reels, and YouTube Shorts collectively reach over 3 billion users. The creators who win are the ones who script — not improvise.</p>
            <h3 className="text-lg font-semibold text-zinc-200 pt-4">The Anatomy of a Viral Script</h3>
            <p>Every high-performing short video follows the same structure:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Hook (0-2s):</strong> The first words determine everything. Use a pattern interrupt, bold claim, or curiosity gap. &ldquo;Nobody talks about this...&rdquo; or &ldquo;Stop scrolling if you...&rdquo;</li>
              <li><strong>Setup (2-5s):</strong> Context for why this matters. Establish stakes quickly.</li>
              <li><strong>Body (5-45s):</strong> Deliver the value. Tips, story, tutorial — whatever you promised in the hook.</li>
              <li><strong>CTA (last 3s):</strong> Tell viewers exactly what to do. Follow, save, share, comment, link in bio.</li>
            </ul>
            <h3 className="text-lg font-semibold text-zinc-200 pt-4">Script Styles That Work in 2026</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Hook-Value-CTA:</strong> The universal structure. Works for every niche and platform.</li>
              <li><strong>Storytime:</strong> Personal narratives with a twist. 5x more shareable than tutorials.</li>
              <li><strong>Before/After:</strong> Show transformation. The visual contrast drives saves and shares.</li>
              <li><strong>Myth Busting:</strong> &ldquo;Everyone says X but actually Y.&rdquo; Controversy + education = engagement.</li>
              <li><strong>Day in My Life:</strong> Relatable content that humanizes your brand. Perfect for personal brands.</li>
            </ul>
            <h3 className="text-lg font-semibold text-zinc-200 pt-4">Pro Tips</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Write scripts for 15-30 second videos first. Shorter = higher completion rate = more algorithmic push.</li>
              <li>Include [visual direction] notes so you know exactly what to show on screen.</li>
              <li>Read your script aloud before filming. If it sounds unnatural, rewrite it.</li>
              <li>Film 3 variations of the hook. Test which one performs best.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Cross Links */}
      <section className="px-6 py-12 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-zinc-500 text-sm mb-4">More tools:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="/hooks" className="text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg transition">Hook Generator</a>
            <a href="/tiktok-scripts" className="text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg transition">TikTok Scripts</a>
            <a href="/campaign" className="text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg transition">Campaign Mode</a>
            <a href="/atomizer" className="text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg transition">Content Atomizer</a>
            <a href="/instagram-captions" className="text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg transition">Instagram Captions</a>
          </div>
        </div>
      </section>

      <footer className="px-6 py-8 border-t border-zinc-800/50 text-center text-xs text-zinc-600">
        <p>&copy; {new Date().getFullYear()} PostCraft AI. All rights reserved.</p>
      </footer>
    </main>
  );
}
