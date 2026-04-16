'use client';
import { useState } from 'react';

const industries = [
  { key: 'tech', label: 'Tech / SaaS' },
  { key: 'ecommerce', label: 'E-commerce' },
  { key: 'finance', label: 'Finance' },
  { key: 'health', label: 'Health & Wellness' },
  { key: 'education', label: 'Education' },
  { key: 'creative', label: 'Creative / Design' },
  { key: 'food', label: 'Food & Beverage' },
  { key: 'travel', label: 'Travel' },
  { key: 'fitness', label: 'Fitness' },
  { key: 'realestate', label: 'Real Estate' },
] as const;

const archetypes = [
  { key: 'visionary', label: 'The Visionary', desc: 'Bold, future-focused, inspiring' },
  { key: 'mentor', label: 'The Mentor', desc: 'Helpful, wise, encouraging' },
  { key: 'rebel', label: 'The Rebel', desc: 'Provocative, disruptive, challenging' },
  { key: 'friend', label: 'The Friend', desc: 'Warm, casual, relatable' },
  { key: 'expert', label: 'The Expert', desc: 'Data-driven, credible, precise' },
  { key: 'entertainer', label: 'The Entertainer', desc: 'Witty, fun, engaging' },
] as const;

const platforms = ['Twitter/X', 'LinkedIn', 'Instagram', 'TikTok', 'Facebook', 'Email', 'Website'] as const;
const languages = ['English', 'Français', 'Español', 'Deutsch', 'Italiano', 'Português', '日本語', '中文', '한국어', 'العربية', 'हिन्दी', 'Nederlands', 'Polski', 'Svenska', 'Norsk', 'Dansk', 'Suomi', 'Türkçe', 'Русский', 'Українська', 'Bahasa Indonesia', 'Bahasa Melayu', 'Tiếng Việt', 'ไทย', 'Filipino'] as const;

interface VoiceResult {
  voiceProfile: {
    tone: string;
    vocabulary: string;
    sentenceStyle: string;
    emojiUsage: string;
    doList: string[];
    dontList: string[];
  };
  samples: { platform: string; post: string }[];
  tagline: string;
}

export default function BrandVoicePage() {
  const [brandName, setBrandName] = useState('');
  const [description, setDescription] = useState('');
  const [industry, setIndustry] = useState<string>('tech');
  const [archetype, setArchetype] = useState<string>('visionary');
  const [values, setValues] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['Twitter/X', 'LinkedIn', 'Instagram']);
  const [language, setLanguage] = useState<string>('English');
  const [result, setResult] = useState<VoiceResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  function togglePlatform(p: string) {
    setSelectedPlatforms(prev =>
      prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]
    );
  }

  async function generate() {
    setLoading(true);
    try {
      const r = await fetch('/api/brand-voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brandName, description, industry, archetype, values, targetAudience, platforms: selectedPlatforms, language }),
      });
      const data = await r.json();
      setResult(data.result || null);
    } catch {
      setResult(null);
    }
    setLoading(false);
  }

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <main className="min-h-screen">
      <section className="px-6 py-20 max-w-3xl mx-auto text-center">
        <p className="text-xs text-amber-400 uppercase tracking-widest mb-3 font-semibold">New Tool</p>
        <h1 className="text-5xl font-bold mb-4">
          AI <span className="gradient-text">Brand Voice Generator</span>
        </h1>
        <p className="text-zinc-400 text-lg mb-4 max-w-xl mx-auto">
          Define your brand personality. Get a complete voice guide with tone rules, vocabulary, do&apos;s & don&apos;ts, and platform-specific sample posts.
        </p>
        <p className="text-zinc-500 text-sm mb-12">Free. No signup. 6 archetypes, 10 industries, 7 platforms, 25+ languages.</p>

        <div className="glass rounded-2xl p-6 text-left">
          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Brand name</label>
          <input value={brandName} onChange={e => setBrandName(e.target.value)}
            placeholder="e.g. PostCraft AI, Nike, Your Brand..."
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-pink-500 transition mb-5" />

          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">What does your brand do? (1-2 sentences)</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)}
            placeholder="e.g. We help small businesses create professional social media content with AI..."
            rows={2}
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-pink-500 transition mb-5 resize-none" />

          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Industry</label>
          <div className="flex flex-wrap gap-2 mb-5">
            {industries.map(ind => (
              <button key={ind.key} onClick={() => setIndustry(ind.key)}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition ${industry === ind.key ? 'bg-amber-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
                {ind.label}
              </button>
            ))}
          </div>

          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Brand Archetype</label>
          <div className="flex flex-wrap gap-2 mb-5">
            {archetypes.map(a => (
              <button key={a.key} onClick={() => setArchetype(a.key)}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition ${archetype === a.key ? 'bg-purple-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
                {a.label} <span className="text-zinc-500 ml-1 hidden sm:inline">— {a.desc}</span>
              </button>
            ))}
          </div>

          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Core values (optional)</label>
          <input value={values} onChange={e => setValues(e.target.value)}
            placeholder="e.g. Innovation, Transparency, Simplicity, Empowerment..."
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-pink-500 transition mb-5" />

          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Target audience (optional)</label>
          <input value={targetAudience} onChange={e => setTargetAudience(e.target.value)}
            placeholder="e.g. SaaS founders, Gen Z creators, busy professionals..."
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-pink-500 transition mb-5" />

          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Platforms (select all that apply)</label>
          <div className="flex flex-wrap gap-2 mb-5">
            {platforms.map(p => (
              <button key={p} onClick={() => togglePlatform(p)}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition ${selectedPlatforms.includes(p) ? 'bg-cyan-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
                {p}
              </button>
            ))}
          </div>

          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Language</label>
          <select value={language} onChange={e => setLanguage(e.target.value)}
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-pink-500 transition mb-6">
            {languages.map(l => <option key={l} value={l}>{l}</option>)}
          </select>

          <button onClick={generate} disabled={loading || !brandName.trim() || !description.trim()}
            className="w-full py-3.5 btn-primary rounded-xl font-semibold text-white">
            {loading ? 'Crafting your brand voice...' : 'Generate Brand Voice Guide'}
          </button>
        </div>
      </section>

      {result && (
        <section className="px-6 pb-20 max-w-3xl mx-auto space-y-8">
          {/* Tagline */}
          <div className="text-center">
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Your Brand Tagline</p>
            <p className="text-2xl font-bold gradient-text cursor-pointer" onClick={() => copy(result.tagline, 'tagline')}>
              &ldquo;{result.tagline}&rdquo;
            </p>
            <p className="text-xs text-zinc-500 mt-1">{copied === 'tagline' ? 'Copied!' : 'Click to copy'}</p>
          </div>

          {/* Voice Profile */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Voice Profile</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="glass rounded-xl p-5">
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Tone</p>
                <p className="text-sm">{result.voiceProfile.tone}</p>
              </div>
              <div className="glass rounded-xl p-5">
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Vocabulary</p>
                <p className="text-sm">{result.voiceProfile.vocabulary}</p>
              </div>
              <div className="glass rounded-xl p-5">
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Sentence Style</p>
                <p className="text-sm">{result.voiceProfile.sentenceStyle}</p>
              </div>
              <div className="glass rounded-xl p-5">
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Emoji Usage</p>
                <p className="text-sm">{result.voiceProfile.emojiUsage}</p>
              </div>
            </div>
          </div>

          {/* Do's & Don'ts */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="glass rounded-xl p-5">
              <h3 className="font-semibold mb-3 text-green-400">Do&apos;s</h3>
              <ul className="space-y-2">
                {result.voiceProfile.doList.map((d, i) => (
                  <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-green-400 shrink-0">+</span> {d}</li>
                ))}
              </ul>
            </div>
            <div className="glass rounded-xl p-5">
              <h3 className="font-semibold mb-3 text-red-400">Don&apos;ts</h3>
              <ul className="space-y-2">
                {result.voiceProfile.dontList.map((d, i) => (
                  <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-red-400 shrink-0">-</span> {d}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sample Posts */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Sample Posts in Your Voice</h2>
            <div className="space-y-3">
              {result.samples.map((s, i) => (
                <div key={i} onClick={() => copy(s.post, `sample-${i}`)}
                  className="glass rounded-xl p-5 cursor-pointer hover:border-pink-500/40 transition fade-in">
                  <p className="text-xs text-amber-400 font-semibold mb-2">{s.platform}</p>
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{s.post}</p>
                  <p className="text-xs text-zinc-500 mt-2 text-right">{copied === `sample-${i}` ? 'Copied!' : 'Click to copy'}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Brand Voice Matters */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">Why Brand Voice Matters</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass rounded-xl p-5 text-center">
              <p className="text-3xl font-bold gradient-text mb-2">81%</p>
              <p className="text-sm text-zinc-400">of consumers need to trust a brand before buying</p>
            </div>
            <div className="glass rounded-xl p-5 text-center">
              <p className="text-3xl font-bold gradient-text mb-2">3.5x</p>
              <p className="text-sm text-zinc-400">more engagement with consistent brand voice</p>
            </div>
            <div className="glass rounded-xl p-5 text-center">
              <p className="text-3xl font-bold gradient-text mb-2">23%</p>
              <p className="text-sm text-zinc-400">revenue increase from brand consistency</p>
            </div>
          </div>
        </div>
      </section>

      {/* Archetypes Explained */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">6 Brand Archetypes Explained</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              ['The Visionary', 'Think Apple, Tesla, SpaceX. Bold claims, future-focused language, inspiring calls to action. Best for tech, innovation, and mission-driven brands.'],
              ['The Mentor', 'Think HubSpot, Khan Academy. Helpful, educational, encouraging. Best for SaaS, education, and consulting brands.'],
              ['The Rebel', 'Think Oatly, Liquid Death, Cards Against Humanity. Provocative, irreverent, challenging norms. Best for DTC and disruptor brands.'],
              ['The Friend', 'Think Mailchimp, Slack, Innocent. Warm, casual, relatable. Best for community-driven and lifestyle brands.'],
              ['The Expert', 'Think McKinsey, Bloomberg, Gartner. Data-driven, authoritative, precise. Best for finance, B2B, and professional services.'],
              ['The Entertainer', 'Think Wendy\'s, Netflix, Duolingo. Witty, fun, meme-friendly. Best for consumer brands targeting younger audiences.'],
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
