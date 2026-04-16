'use client';
import { useState } from 'react';

const platforms = ['Twitter/X', 'LinkedIn', 'Instagram', 'TikTok', 'Facebook'] as const;
const frequencies = [
  { key: '3', label: '3x/week' },
  { key: '5', label: '5x/week (daily weekdays)' },
  { key: '7', label: '7x/week (daily)' },
  { key: '14', label: '14x/week (2x daily)' },
] as const;
const goals = [
  { key: 'awareness', label: 'Brand Awareness' },
  { key: 'engagement', label: 'Engagement & Community' },
  { key: 'leads', label: 'Lead Generation' },
  { key: 'sales', label: 'Sales & Conversions' },
  { key: 'authority', label: 'Thought Leadership' },
] as const;
const languages = ['English', 'Français', 'Español', 'Deutsch', 'Italiano', 'Português', '日本語', '中文', '한국어', 'العربية', 'हिन्दी', 'Nederlands', 'Polski', 'Svenska', 'Norsk', 'Dansk', 'Suomi', 'Türkçe', 'Русский', 'Українська', 'Bahasa Indonesia', 'Bahasa Melayu', 'Tiếng Việt', 'ไทย', 'Filipino'] as const;

interface CalendarDay {
  day: string;
  platform: string;
  contentType: string;
  topic: string;
  caption: string;
  hashtags: string;
  bestTime: string;
}

interface CalendarResult {
  strategy: string;
  weekTheme: string;
  calendar: CalendarDay[];
  tips: string[];
}

export default function ContentCalendarPage() {
  const [niche, setNiche] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['Twitter/X', 'LinkedIn', 'Instagram']);
  const [frequency, setFrequency] = useState<string>('5');
  const [goal, setGoal] = useState<string>('engagement');
  const [language, setLanguage] = useState<string>('English');
  const [result, setResult] = useState<CalendarResult | null>(null);
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
      const r = await fetch('/api/content-calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ niche, platforms: selectedPlatforms, frequency, goal, language }),
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

  const dayColors: Record<string, string> = {
    Monday: 'border-l-blue-500',
    Tuesday: 'border-l-purple-500',
    Wednesday: 'border-l-green-500',
    Thursday: 'border-l-amber-500',
    Friday: 'border-l-pink-500',
    Saturday: 'border-l-cyan-500',
    Sunday: 'border-l-red-500',
  };

  return (
    <main className="min-h-screen">
      <section className="px-6 py-20 max-w-3xl mx-auto text-center">
        <p className="text-xs text-emerald-400 uppercase tracking-widest mb-3 font-semibold">New Tool</p>
        <h1 className="text-5xl font-bold mb-4">
          AI <span className="gradient-text">Content Calendar</span>
        </h1>
        <p className="text-zinc-400 text-lg mb-4 max-w-xl mx-auto">
          Get a full week of content planned in seconds. Topics, captions, hashtags, and best posting times — all tailored to your niche and goals.
        </p>
        <p className="text-zinc-500 text-sm mb-12">Free. No signup. 5 platforms, 5 goals, 4 frequencies, 25+ languages.</p>

        <div className="glass rounded-2xl p-6 text-left">
          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Your niche or business</label>
          <input value={niche} onChange={e => setNiche(e.target.value)}
            placeholder="e.g. AI SaaS tools, Fitness coaching, Organic skincare, Real estate investing..."
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-pink-500 transition mb-5" />

          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Platforms</label>
          <div className="flex flex-wrap gap-2 mb-5">
            {platforms.map(p => (
              <button key={p} onClick={() => togglePlatform(p)}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition ${selectedPlatforms.includes(p) ? 'bg-emerald-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
                {p}
              </button>
            ))}
          </div>

          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Posting Frequency</label>
          <div className="flex flex-wrap gap-2 mb-5">
            {frequencies.map(f => (
              <button key={f.key} onClick={() => setFrequency(f.key)}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition ${frequency === f.key ? 'bg-purple-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
                {f.label}
              </button>
            ))}
          </div>

          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Primary Goal</label>
          <div className="flex flex-wrap gap-2 mb-5">
            {goals.map(g => (
              <button key={g.key} onClick={() => setGoal(g.key)}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition ${goal === g.key ? 'bg-amber-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
                {g.label}
              </button>
            ))}
          </div>

          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Language</label>
          <select value={language} onChange={e => setLanguage(e.target.value)}
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-pink-500 transition mb-6">
            {languages.map(l => <option key={l} value={l}>{l}</option>)}
          </select>

          <button onClick={generate} disabled={loading || !niche.trim() || selectedPlatforms.length === 0}
            className="w-full py-3.5 btn-primary rounded-xl font-semibold text-white">
            {loading ? 'Planning your week...' : 'Generate 7-Day Content Calendar'}
          </button>
        </div>
      </section>

      {result && (
        <section className="px-6 pb-20 max-w-4xl mx-auto space-y-8">
          {/* Strategy */}
          <div className="glass rounded-xl p-5 text-center">
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Week Theme</p>
            <p className="text-xl font-bold gradient-text mb-3">{result.weekTheme}</p>
            <p className="text-sm text-zinc-400">{result.strategy}</p>
          </div>

          {/* Calendar */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Your 7-Day Calendar</h2>
            <div className="space-y-3">
              {result.calendar.map((day, i) => (
                <div key={i} onClick={() => copy(day.caption, `day-${i}`)}
                  className={`glass rounded-xl p-5 cursor-pointer hover:border-pink-500/40 transition fade-in border-l-4 ${dayColors[day.day] || 'border-l-zinc-500'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold">{day.day}</span>
                      <span className="text-xs px-2 py-1 bg-zinc-800 rounded-full">{day.platform}</span>
                      <span className="text-xs px-2 py-1 bg-zinc-800/50 rounded-full text-zinc-400">{day.contentType}</span>
                    </div>
                    <span className="text-xs text-zinc-500">{day.bestTime}</span>
                  </div>
                  <p className="text-xs text-amber-400 font-medium mb-1">{day.topic}</p>
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{day.caption}</p>
                  <p className="text-xs text-zinc-500 mt-2">{day.hashtags}</p>
                  <p className="text-xs text-zinc-500 mt-1 text-right">{copied === `day-${i}` ? 'Copied!' : 'Click to copy caption'}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          {result.tips.length > 0 && (
            <div className="glass rounded-xl p-5">
              <h3 className="font-semibold mb-3">Weekly Strategy Tips</h3>
              <ul className="space-y-2">
                {result.tips.map((tip, i) => (
                  <li key={i} className="text-sm text-zinc-400 flex gap-2">
                    <span className="text-emerald-400 shrink-0">{i + 1}.</span> {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* Why Content Calendar Matters */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">Why You Need a Content Calendar</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass rounded-xl p-5 text-center">
              <p className="text-3xl font-bold gradient-text mb-2">60%</p>
              <p className="text-sm text-zinc-400">of marketers who plan content weekly see better results</p>
            </div>
            <div className="glass rounded-xl p-5 text-center">
              <p className="text-3xl font-bold gradient-text mb-2">4x</p>
              <p className="text-sm text-zinc-400">more consistent posting with a calendar vs. ad-hoc</p>
            </div>
            <div className="glass rounded-xl p-5 text-center">
              <p className="text-3xl font-bold gradient-text mb-2">2h</p>
              <p className="text-sm text-zinc-400">saved per week with pre-planned content</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Mix Strategy */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">The Perfect Content Mix</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              ['40% — Value Content', 'Educational posts, tips, how-tos, and tutorials. Build authority and trust. This is the content people save and share.'],
              ['20% — Engagement Content', 'Questions, polls, hot takes, controversial opinions. Drive comments and interaction. Feeds the algorithm.'],
              ['20% — Story Content', 'Behind the scenes, personal stories, journey updates. Build human connection. Makes followers feel invested.'],
              ['20% — Promotional Content', 'Product launches, offers, testimonials, case studies. Convert followers into customers. Keep it below 20%.'],
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
