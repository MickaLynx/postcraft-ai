'use client';
import { useState } from 'react';

const platforms = ['Twitter/X', 'LinkedIn', 'Instagram', 'TikTok', 'Facebook', 'YouTube', 'Newsletter'] as const;
const targetRegions = [
  { key: 'us', label: 'United States', flag: '🇺🇸' },
  { key: 'uk', label: 'United Kingdom', flag: '🇬🇧' },
  { key: 'fr', label: 'France', flag: '🇫🇷' },
  { key: 'de', label: 'Germany', flag: '🇩🇪' },
  { key: 'es', label: 'Spain', flag: '🇪🇸' },
  { key: 'br', label: 'Brazil', flag: '🇧🇷' },
  { key: 'mx', label: 'Mexico', flag: '🇲🇽' },
  { key: 'jp', label: 'Japan', flag: '🇯🇵' },
  { key: 'kr', label: 'South Korea', flag: '🇰🇷' },
  { key: 'in', label: 'India', flag: '🇮🇳' },
  { key: 'ae', label: 'UAE / Middle East', flag: '🇦🇪' },
  { key: 'sa', label: 'Saudi Arabia', flag: '🇸🇦' },
  { key: 'id', label: 'Indonesia', flag: '🇮🇩' },
  { key: 'ng', label: 'Nigeria', flag: '🇳🇬' },
  { key: 'au', label: 'Australia', flag: '🇦🇺' },
  { key: 'ca', label: 'Canada', flag: '🇨🇦' },
  { key: 'nl', label: 'Netherlands', flag: '🇳🇱' },
  { key: 'it', label: 'Italy', flag: '🇮🇹' },
  { key: 'pl', label: 'Poland', flag: '🇵🇱' },
  { key: 'se', label: 'Sweden', flag: '🇸🇪' },
  { key: 'tr', label: 'Turkey', flag: '🇹🇷' },
  { key: 'th', label: 'Thailand', flag: '🇹🇭' },
  { key: 'ph', label: 'Philippines', flag: '🇵🇭' },
  { key: 'vn', label: 'Vietnam', flag: '🇻🇳' },
] as const;
const adaptationLevels = [
  { key: 'light', label: 'Light', desc: 'Translate + minor cultural tweaks' },
  { key: 'medium', label: 'Medium', desc: 'Full cultural adaptation + local references' },
  { key: 'deep', label: 'Deep', desc: 'Complete rewrite for local audience' },
] as const;
const tones = ['Professional', 'Casual', 'Playful', 'Inspirational', 'Educational', 'Provocative'] as const;

interface LocalizedVersion {
  region: string;
  flag: string;
  language: string;
  content: string;
  culturalNotes: string[];
  hashtags: string[];
  bestTimeToPost: string;
  platformTip: string;
}

export default function ContentLocalizerPage() {
  const [originalContent, setOriginalContent] = useState('');
  const [platform, setPlatform] = useState<string>('Instagram');
  const [selectedRegions, setSelectedRegions] = useState<string[]>(['fr', 'de', 'jp']);
  const [adaptation, setAdaptation] = useState<string>('medium');
  const [tone, setTone] = useState<string>('Professional');
  const [results, setResults] = useState<LocalizedVersion[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  function toggleRegion(key: string) {
    setSelectedRegions(prev => prev.includes(key) ? prev.filter(x => x !== key) : [...prev, key]);
  }

  async function localize() {
    setLoading(true);
    try {
      const regionLabels = selectedRegions.map(k => targetRegions.find(r => r.key === k)).filter(Boolean);
      const r = await fetch('/api/content-localizer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: originalContent, platform, regions: regionLabels, adaptation, tone }),
      });
      const data = await r.json();
      setResults(data.versions || []);
    } catch {
      setResults([]);
    }
    setLoading(false);
  }

  function copy(text: string, idx: number) {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  }

  return (
    <main className="min-h-screen">
      <section className="px-6 py-20 max-w-3xl mx-auto text-center">
        <p className="text-xs text-pink-400 uppercase tracking-widest mb-3 font-semibold">New Tool</p>
        <h1 className="text-5xl font-bold mb-4">
          AI <span className="gradient-text">Content Localizer</span>
        </h1>
        <p className="text-zinc-400 text-lg mb-4 max-w-xl mx-auto">
          Adapt your social media content for any market. Not just translation — full cultural adaptation with local slang, references, humor, and platform-specific optimization.
        </p>
        <p className="text-zinc-500 text-sm mb-12">Free. No signup. 24 regions, 3 adaptation levels, 6 tones.</p>

        <div className="glass rounded-2xl p-6 text-left">
          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Original content</label>
          <textarea value={originalContent} onChange={e => setOriginalContent(e.target.value)} rows={4}
            placeholder="Paste your original post, caption, or ad copy..."
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-pink-500 transition mb-5 resize-none" />

          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Platform</label>
          <div className="flex flex-wrap gap-2 mb-5">
            {platforms.map(p => (
              <button key={p} onClick={() => setPlatform(p)}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition ${platform === p ? 'bg-pink-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
                {p}
              </button>
            ))}
          </div>

          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Target Regions (select multiple)</label>
          <div className="flex flex-wrap gap-2 mb-5 max-h-36 overflow-y-auto">
            {targetRegions.map(r => (
              <button key={r.key} onClick={() => toggleRegion(r.key)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition ${selectedRegions.includes(r.key) ? 'bg-pink-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
                {r.flag} {r.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Adaptation Level</label>
              <div className="flex flex-col gap-2">
                {adaptationLevels.map(a => (
                  <button key={a.key} onClick={() => setAdaptation(a.key)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium text-left transition ${adaptation === a.key ? 'bg-purple-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
                    <span className="font-semibold">{a.label}</span>
                    <span className="text-zinc-400 ml-2">{a.desc}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Tone</label>
              <div className="flex flex-wrap gap-2">
                {tones.map(t => (
                  <button key={t} onClick={() => setTone(t)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition ${tone === t ? 'bg-purple-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button onClick={localize} disabled={loading || !originalContent.trim() || selectedRegions.length === 0}
            className="w-full py-3.5 btn-primary rounded-xl font-semibold text-white">
            {loading ? 'Localizing for ' + selectedRegions.length + ' regions...' : `Localize for ${selectedRegions.length} Region${selectedRegions.length > 1 ? 's' : ''}`}
          </button>
        </div>
      </section>

      {results.length > 0 && (
        <section className="px-6 pb-16 max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Localized Versions</h2>
          <div className="space-y-4">
            {results.map((v, i) => (
              <div key={i} className="glass rounded-2xl p-5 fade-in">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{v.flag}</span>
                    <div>
                      <span className="font-semibold text-sm">{v.region}</span>
                      <span className="text-xs text-zinc-500 ml-2">({v.language})</span>
                    </div>
                  </div>
                  <button onClick={() => copy(v.content, i)}
                    className={`text-xs px-4 py-2 rounded-lg transition ${copiedIdx === i ? 'bg-green-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
                    {copiedIdx === i ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <p className="text-sm whitespace-pre-wrap leading-relaxed mb-3 bg-zinc-900/50 rounded-lg p-3">{v.content}</p>
                {v.hashtags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {v.hashtags.map((h, j) => (
                      <span key={j} className="text-xs bg-pink-600/20 text-pink-300 px-2 py-1 rounded">{h}</span>
                    ))}
                  </div>
                )}
                {v.culturalNotes.length > 0 && (
                  <div className="mb-2">
                    <p className="text-xs text-zinc-500 mb-1">Cultural notes:</p>
                    <ul className="text-xs text-zinc-400 space-y-0.5">
                      {v.culturalNotes.map((n, j) => <li key={j}>• {n}</li>)}
                    </ul>
                  </div>
                )}
                <div className="flex gap-4 text-xs text-zinc-500 mt-2">
                  <span>Best time: {v.bestTimeToPost}</span>
                  <span>Tip: {v.platformTip}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">Why Localization Beats Translation</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass rounded-xl p-5">
              <h3 className="font-semibold mb-2">3x Higher Engagement</h3>
              <p className="text-sm text-zinc-400">Culturally adapted content gets 3x more engagement than directly translated posts. Local references and humor create genuine connection.</p>
            </div>
            <div className="glass rounded-xl p-5">
              <h3 className="font-semibold mb-2">Cultural Sensitivity</h3>
              <p className="text-sm text-zinc-400">Colors, gestures, holidays, and humor vary wildly across cultures. What works in the US can offend in Japan or confuse in Brazil.</p>
            </div>
            <div className="glass rounded-xl p-5">
              <h3 className="font-semibold mb-2">Platform Differences</h3>
              <p className="text-sm text-zinc-400">Each region has different platform preferences. LINE dominates Japan, WhatsApp rules Brazil, KakaoTalk leads Korea. Adapt accordingly.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'What is content localization?', a: 'Content localization goes beyond translation. It adapts your message for a specific market by incorporating local cultural references, slang, humor, holidays, and social norms to create content that feels native to each audience.' },
              { q: 'How is this different from Google Translate?', a: 'Google Translate provides literal translation. Our tool understands cultural context — it knows that a US sports metaphor needs to become a football reference in Europe, that humor styles differ between markets, and that platform usage varies by region.' },
              { q: 'How many regions can I localize for at once?', a: 'You can select up to 24 regions simultaneously. Each version is independently adapted with region-specific cultural notes, hashtags, best posting times, and platform tips.' },
              { q: 'What are the 3 adaptation levels?', a: 'Light: translation with minor cultural tweaks. Medium: full cultural adaptation with local references and adjusted tone. Deep: complete rewrite that captures the original intent but creates entirely new, locally-resonant content.' },
              { q: 'Does it handle right-to-left languages?', a: 'Yes. Arabic, Hebrew, and other RTL languages are fully supported with proper text direction, culturally appropriate expressions, and region-specific platform best practices for Middle Eastern markets.' },
            ].map((faq, i) => (
              <div key={i} className="glass rounded-xl p-5">
                <h3 className="text-zinc-200 font-semibold mb-2">{faq.q}</h3>
                <p className="text-sm text-zinc-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-zinc-500 text-sm mb-4">Related tools:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="/caption-optimizer" className="text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg transition">Caption Optimizer</a>
            <a href="/compliance-checker" className="text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg transition">Compliance Checker</a>
            <a href="/hashtags" className="text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg transition">Hashtag Generator</a>
            <a href="/brand-voice" className="text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg transition">Brand Voice</a>
            <a href="/repurpose" className="text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg transition">Content Repurposer</a>
            <a href="/social-seo" className="text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg transition">Social SEO</a>
          </div>
        </div>
      </section>

      <footer className="px-6 py-8 border-t border-zinc-800/50 text-center text-xs text-zinc-600">
        <p>&copy; {new Date().getFullYear()} PostCraft AI. All rights reserved.</p>
      </footer>
    </main>
  );
}
