'use client';
import { useState } from 'react';

const ctaTypes = [
  { key: 'click', label: 'Click / Link', desc: 'Drive traffic' },
  { key: 'signup', label: 'Sign Up', desc: 'Capture leads' },
  { key: 'buy', label: 'Buy / Purchase', desc: 'Direct sales' },
  { key: 'download', label: 'Download', desc: 'Lead magnets' },
  { key: 'engage', label: 'Engage', desc: 'Comments & shares' },
  { key: 'follow', label: 'Follow / Subscribe', desc: 'Grow audience' },
] as const;

const platforms = ['Twitter/X', 'LinkedIn', 'Instagram', 'TikTok', 'Facebook', 'Email', 'Landing Page'] as const;
const urgencyLevels = [
  { key: 'low', label: 'Soft', desc: 'Gentle nudge' },
  { key: 'medium', label: 'Medium', desc: 'Clear direction' },
  { key: 'high', label: 'Urgent', desc: 'FOMO & scarcity' },
] as const;
const languages = ['English', 'Français', 'Español', 'Deutsch', 'Italiano', 'Português', '日本語', '中文', '한국어', 'العربية', 'हिन्दी', 'Nederlands', 'Polski', 'Svenska', 'Norsk', 'Dansk', 'Suomi', 'Türkçe', 'Русский', 'Українська', 'Bahasa Indonesia', 'Bahasa Melayu', 'Tiếng Việt', 'ไทย', 'Filipino'] as const;

type CTASet = { category: string; ctas: string[] };

export default function CTAGeneratorPage() {
  const [topic, setTopic] = useState('');
  const [ctaType, setCtaType] = useState<string>('click');
  const [platform, setPlatform] = useState<string>('Twitter/X');
  const [urgency, setUrgency] = useState<string>('medium');
  const [language, setLanguage] = useState<string>('English');
  const [sets, setSets] = useState<CTASet[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  async function generate() {
    setLoading(true);
    try {
      const r = await fetch('/api/cta-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, ctaType, platform, urgency, language }),
      });
      const data = await r.json();
      setSets(data.sets || []);
    } catch {
      setSets([]);
    }
    setLoading(false);
  }

  function copyText(text: string, id: string) {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <main className="min-h-screen">
      <section className="px-6 py-20 max-w-3xl mx-auto text-center">
        <p className="text-xs text-orange-400 uppercase tracking-widest mb-3 font-semibold">New Tool</p>
        <h1 className="text-5xl font-bold mb-4">
          AI <span className="gradient-text">CTA Generator</span>
        </h1>
        <p className="text-zinc-400 text-lg mb-4 max-w-xl mx-auto">
          Generate high-converting calls-to-action for any platform. The right CTA turns readers into clickers, followers, and buyers.
        </p>
        <p className="text-zinc-500 text-sm mb-12">Free. No signup. 6 CTA types, 7 platforms, 3 urgency levels, 25+ languages.</p>

        <div className="glass rounded-2xl p-6 text-left">
          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Product or offer</label>
          <input value={topic} onChange={e => setTopic(e.target.value)}
            placeholder="e.g. Free AI writing tool, fitness coaching program, SaaS free trial, ebook download..."
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-pink-500 transition mb-5" />

          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">CTA Goal</label>
          <div className="flex flex-wrap gap-2 mb-5">
            {ctaTypes.map(c => (
              <button key={c.key} onClick={() => setCtaType(c.key)}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition ${ctaType === c.key ? 'bg-orange-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
                {c.label}
              </button>
            ))}
          </div>

          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Platform</label>
          <div className="flex flex-wrap gap-2 mb-5">
            {platforms.map(p => (
              <button key={p} onClick={() => setPlatform(p)}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition ${platform === p ? 'bg-pink-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
                {p}
              </button>
            ))}
          </div>

          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Urgency</label>
          <div className="flex flex-wrap gap-2 mb-5">
            {urgencyLevels.map(u => (
              <button key={u.key} onClick={() => setUrgency(u.key)}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition ${urgency === u.key ? 'bg-purple-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
                {u.label} <span className="text-zinc-500 ml-1">({u.desc})</span>
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
            {loading ? 'Crafting your CTAs...' : 'Generate CTAs'}
          </button>
        </div>
      </section>

      {sets.length > 0 && (
        <section className="px-6 pb-20 max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Your CTAs</h2>
          <div className="space-y-6">
            {sets.map((set, si) => (
              <div key={si} className="glass rounded-xl p-5">
                <h3 className="text-sm font-semibold mb-3 text-zinc-300">{set.category}</h3>
                <div className="space-y-2">
                  {set.ctas.map((cta, ci) => (
                    <div key={ci} onClick={() => copyText(cta, `${si}-${ci}`)}
                      className="flex items-center justify-between bg-zinc-900/50 rounded-lg px-4 py-3 cursor-pointer hover:bg-zinc-800/50 transition">
                      <p className="text-sm">{cta}</p>
                      <span className={`text-xs ml-3 whitespace-nowrap ${copied === `${si}-${ci}` ? 'text-green-400' : 'text-zinc-500'}`}>
                        {copied === `${si}-${ci}` ? 'Copied!' : 'Copy'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA Psychology */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">The Psychology Behind High-Converting CTAs</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              ['Specificity Wins', 'Get Your Free Guide beats Learn More every time. Tell people exactly what they get.'],
              ['Urgency Without Manipulation', 'Real deadlines and limited availability work. Fake scarcity destroys trust.'],
              ['First Person Converts More', 'Start My Free Trial outperforms Start Your Free Trial by up to 90%.'],
              ['Action Verbs Only', 'Start, Get, Claim, Join, Discover. Never passive, always active.'],
              ['Reduce Friction', 'No credit card. Free forever. Cancel anytime. Remove every objection before the click.'],
              ['Platform Context', 'Swipe up on Stories, Link in bio on Instagram, Comment below on LinkedIn. Match the medium.'],
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
