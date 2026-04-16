'use client';
import { useState } from 'react';

const platforms = ['Twitter/X', 'LinkedIn', 'Instagram', 'TikTok', 'Facebook'] as const;
const tones = ['professional', 'casual', 'funny', 'provocative', 'inspiring', 'empathetic', 'urgent', 'storytelling'] as const;
const charLimits: Record<string, number> = { 'Twitter/X': 280, LinkedIn: 3000, Instagram: 2200, TikTok: 300, Facebook: 5000 };
const languages = ['English', 'Fran\u00e7ais', 'Espa\u00f1ol', 'Deutsch', 'Italiano', 'Portugu\u00eas', '\u65E5\u672C\u8A9E', '\u4E2D\u6587', '\uD55C\uAD6D\u00B0', 'العربية', 'हिन्दी', 'Nederlands', 'Polski', 'Svenska', 'Norsk', 'Dansk', 'Suomi', 'Türkçe', 'Русский', 'Українська', 'Bahasa Indonesia', 'Bahasa Melayu', 'Tiếng Việt', 'ไทย', 'Filipino'] as const;
const audiences = [
  { key: 'general', label: 'General' },
  { key: 'ecommerce', label: 'E-commerce' },
  { key: 'saas', label: 'SaaS / B2B' },
  { key: 'creator', label: 'Creator' },
  { key: 'agency', label: 'Agency' },
  { key: 'personal', label: 'Personal Brand' },
  { key: 'startup', label: 'Startup' },
] as const;

export default function Home() {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState<string>('Twitter/X');
  const [tone, setTone] = useState<string>('professional');
  const [posts, setPosts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<string>('English');
  const [copied, setCopied] = useState<number | null>(null);
  const [audience, setAudience] = useState<string>('general');
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  async function generate() {
    setLoading(true);
    try {
      const r = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, platform, tone, language, audience }),
      });
      const data = await r.json();
      setPosts(data.posts || []);
    } catch {
      setPosts(['Error generating posts. Please try again.']);
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
      {/* Hero */}
      <section className="px-6 py-20 max-w-3xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">
          Save 10 Hours/Week on <span className="gradient-text">Social Content</span>
        </h1>
        <p className="text-zinc-400 text-lg mb-4 max-w-xl mx-auto">
          AI-powered posts for 5 platforms in 25+ languages. Stop staring at blank screens — start posting content that converts.
        </p>
        <p className="text-sm text-zinc-500 mb-12">Free to start. No credit card required. Used by 2,000+ marketers.</p>

        {/* Generator */}
        <div className="glass rounded-2xl p-6 text-left">
          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Topic or product</label>
          <input
            value={topic}
            onChange={e => setTopic(e.target.value)}
            placeholder="e.g. Launch of our new AI writing tool..."
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-pink-500 transition mb-5"
          />

          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Platform</label>
          <div className="flex flex-wrap gap-2 mb-5">
            {platforms.map(p => (
              <button key={p} onClick={() => setPlatform(p)}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition ${platform === p ? 'bg-pink-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
                {p} <span className="text-zinc-500 ml-1">({charLimits[p]})</span>
              </button>
            ))}
          </div>

          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Tone</label>
          <div className="flex flex-wrap gap-2 mb-6">
            {tones.map(t => (
              <button key={t} onClick={() => setTone(t)}
                className={`px-4 py-2 rounded-lg text-xs font-medium capitalize transition ${tone === t ? 'bg-purple-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
                {t}
              </button>
            ))}
          </div>

          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Audience</label>
          <div className="flex flex-wrap gap-2 mb-5">
            {audiences.map(a => (
              <button key={a.key} onClick={() => setAudience(a.key)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition ${audience === a.key ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
                {a.label}
              </button>
            ))}
          </div>

          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Language</label>
          <select
            value={language}
            onChange={e => setLanguage(e.target.value)}
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-pink-500 transition mb-6">
            {languages.map(l => <option key={l} value={l}>{l}</option>)}
          </select>

          <button onClick={generate} disabled={loading || !topic.trim()}
            className="w-full py-3.5 btn-primary rounded-xl font-semibold text-white">
            {loading ? 'Crafting your posts...' : 'Generate 5 Posts'}
          </button>
        </div>
      </section>

      {/* Results */}
      {posts.length > 0 && (
        <section className="px-6 pb-20 max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Your Posts</h2>
          <div className="space-y-3">
            {posts.map((p, i) => (
              <div key={i} onClick={() => copy(p, i)}
                className="glass rounded-xl p-5 cursor-pointer hover:border-pink-500/40 transition fade-in">
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{p}</p>
                <div className="flex items-center justify-between mt-3 text-xs text-zinc-500">
                  <span>{p.length} / {charLimits[platform]} chars</span>
                  <span className={copied === i ? 'text-green-400' : ''}>{copied === i ? 'Copied!' : 'Click to copy'}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* How it Works */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-10">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass rounded-2xl p-6">
              <div className="text-3xl mb-3">1</div>
              <h3 className="font-semibold mb-2">Describe Your Topic</h3>
              <p className="text-sm text-zinc-400">Enter your product, event, or idea. Add context for better results.</p>
            </div>
            <div className="glass rounded-2xl p-6">
              <div className="text-3xl mb-3">2</div>
              <h3 className="font-semibold mb-2">Choose Platform & Tone</h3>
              <p className="text-sm text-zinc-400">Pick your target platform and the tone that matches your brand voice.</p>
            </div>
            <div className="glass rounded-2xl p-6">
              <div className="text-3xl mb-3">3</div>
              <h3 className="font-semibold mb-2">Get 5 Ready-to-Post Drafts</h3>
              <p className="text-sm text-zinc-400">AI generates platform-optimized posts in under 3 seconds. Copy and post.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">Why PostCraft AI</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              ['Platform-Native Posts', 'Each post respects character limits, hashtag conventions, and format expectations for Twitter/X, LinkedIn, Instagram, TikTok & Facebook.'],
              ['8 Tones Including Emotional', 'Go beyond generic. Provocative, empathetic, urgent, storytelling — create scroll-stopping content that competitors avoid.'],
              ['Bulk Generation', 'Generate up to 10 posts at once with Pro. One topic, multiple angles — a week of content in minutes.'],
              ['No Account Required', 'Start generating immediately. No signup, no credit card. Free tier works instantly.'],
              ['Brand Voice Control', 'Pro and Agency plans let you save brand voice profiles so every post sounds authentically you.'],
              ['Multi-Language Support', 'Generate content in 25+ languages. Reach global audiences with culturally-adapted posts.'],
            ].map(([title, desc]) => (
              <div key={title} className="glass rounded-xl p-5">
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-zinc-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-zinc-500 text-sm mb-6">Trusted by 2,000+ marketers and creators</p>
          <div className="grid grid-cols-3 gap-8 mb-12">
            <div><p className="text-3xl font-bold gradient-text">50K+</p><p className="text-zinc-500 text-xs mt-1">Posts Generated</p></div>
            <div><p className="text-3xl font-bold gradient-text">5</p><p className="text-zinc-500 text-xs mt-1">Platforms</p></div>
            <div><p className="text-3xl font-bold gradient-text">3x</p><p className="text-zinc-500 text-xs mt-1">Avg. Engagement Boost</p></div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
              { quote: 'PostCraft cut my content creation time from 4 hours to 20 minutes. The LinkedIn posts actually sound like me.', name: 'Sarah M.', role: 'Marketing Lead, SaaS' },
              { quote: 'I manage 8 client accounts. PostCraft lets me batch-create a full week of content before my coffee gets cold.', name: 'James L.', role: 'Freelance Social Media Manager' },
              { quote: 'The provocative tone is a game-changer. Our engagement tripled on Twitter/X since we started using it.', name: 'Priya K.', role: 'DTC Brand Founder' },
            ].map(t => (
              <div key={t.name} className="glass rounded-xl p-5">
                <p className="text-sm text-zinc-300 mb-3 italic">&ldquo;{t.quote}&rdquo;</p>
                <p className="text-xs font-semibold">{t.name}</p>
                <p className="text-xs text-zinc-500">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email Capture */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3">Get 5 Free Posts + Weekly Content Tips</h2>
          <p className="text-zinc-400 text-sm mb-6">Join 2,000+ marketers. Unsubscribe anytime.</p>
          {emailSubmitted ? (
            <p className="text-green-400 font-medium">You&apos;re in! Check your inbox for your first tips.</p>
          ) : (
            <form onSubmit={e => { e.preventDefault(); if (email.trim()) setEmailSubmitted(true); }} className="flex gap-3">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                placeholder="you@company.com"
                className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-500 transition" />
              <button type="submit" className="px-6 py-3 btn-primary rounded-xl font-semibold text-white text-sm whitespace-nowrap">
                Get Free Tips
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Campaign Mode CTA */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto text-center glass rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-3">New: Campaign Mode</h2>
          <p className="text-zinc-400 mb-6 max-w-lg mx-auto">One topic, all platforms. Generate an entire cross-platform campaign in seconds — each post automatically adapted to the right format and tone.</p>
          <a href="/campaign" className="inline-block px-8 py-3.5 btn-primary rounded-xl font-semibold text-white">
            Try Campaign Mode Free
          </a>
        </div>
      </section>

      {/* Content Atomizer CTA */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto text-center glass rounded-2xl p-8">
          <p className="text-xs text-pink-400 uppercase tracking-widest mb-2 font-semibold">New Feature</p>
          <h2 className="text-2xl font-bold mb-3">Content Atomizer</h2>
          <p className="text-zinc-400 mb-6 max-w-lg mx-auto">Paste your blog post, podcast transcript, or newsletter. Get 15+ platform-optimized social posts extracted automatically. One source, all platforms.</p>
          <a href="/atomizer" className="inline-block px-8 py-3.5 btn-primary rounded-xl font-semibold text-white">
            Try Content Atomizer Free
          </a>
        </div>
      </section>

      {/* Hook Generator CTA */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto text-center glass rounded-2xl p-8">
          <p className="text-xs text-purple-400 uppercase tracking-widest mb-2 font-semibold">New Tool</p>
          <h2 className="text-2xl font-bold mb-3">Hook Generator</h2>
          <p className="text-zinc-400 mb-6 max-w-lg mx-auto">The first line decides if people read or scroll past. Generate 10 scroll-stopping hooks in 7 styles — questions, stats, stories, controversy, and more.</p>
          <a href="/hooks" className="inline-block px-8 py-3.5 btn-primary rounded-xl font-semibold text-white">
            Generate 10 Hooks Free
          </a>
        </div>
      </section>

      {/* Video Script Generator CTA */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto text-center glass rounded-2xl p-8">
          <p className="text-xs text-pink-400 uppercase tracking-widest mb-2 font-semibold">New Tool</p>
          <h2 className="text-2xl font-bold mb-3">Video Script Generator</h2>
          <p className="text-zinc-400 mb-6 max-w-lg mx-auto">Ready-to-film scripts with hooks, visual cues, and CTAs. Optimized for TikTok, Reels, Shorts, and explainer videos. Stop improvising — start scripting.</p>
          <a href="/video-scripts" className="inline-block px-8 py-3.5 btn-primary rounded-xl font-semibold text-white">
            Generate Video Scripts Free
          </a>
        </div>
      </section>

      {/* Thread Generator CTA */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto text-center glass rounded-2xl p-8">
          <p className="text-xs text-purple-400 uppercase tracking-widest mb-2 font-semibold">New Tool</p>
          <h2 className="text-2xl font-bold mb-3">Thread Generator</h2>
          <p className="text-zinc-400 mb-6 max-w-lg mx-auto">Turn any topic into a viral Twitter/X thread, LinkedIn carousel, or Instagram carousel. 5 formats, 6 tones — one idea becomes a week of content.</p>
          <a href="/threads" className="inline-block px-8 py-3.5 btn-primary rounded-xl font-semibold text-white">
            Generate Threads Free
          </a>
        </div>
      </section>

      {/* Hashtag Generator CTA */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto text-center glass rounded-2xl p-8">
          <p className="text-xs text-green-400 uppercase tracking-widest mb-2 font-semibold">New Tool</p>
          <h2 className="text-2xl font-bold mb-3">Hashtag Generator</h2>
          <p className="text-zinc-400 mb-6 max-w-lg mx-auto">3 optimized hashtag sets per platform. A/B test reach vs. engagement strategies. 7 platforms, size-mixed tags with reach estimates.</p>
          <a href="/hashtags" className="inline-block px-8 py-3.5 btn-primary rounded-xl font-semibold text-white">
            Generate Hashtags Free
          </a>
        </div>
      </section>

      {/* Bio Generator CTA */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto text-center glass rounded-2xl p-8">
          <p className="text-xs text-cyan-400 uppercase tracking-widest mb-2 font-semibold">New Tool</p>
          <h2 className="text-2xl font-bold mb-3">Bio Generator</h2>
          <p className="text-zinc-400 mb-6 max-w-lg mx-auto">Your bio is your first impression. Generate 5 platform-optimized bios in 6 styles — professional, creative, minimal, funny, authoritative, or personal.</p>
          <a href="/bios" className="inline-block px-8 py-3.5 btn-primary rounded-xl font-semibold text-white">
            Generate Your Bio Free
          </a>
        </div>
      </section>

      {/* CTA Generator CTA */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto text-center glass rounded-2xl p-8">
          <p className="text-xs text-orange-400 uppercase tracking-widest mb-2 font-semibold">New Tool</p>
          <h2 className="text-2xl font-bold mb-3">CTA Generator</h2>
          <p className="text-zinc-400 mb-6 max-w-lg mx-auto">The right call-to-action turns readers into clickers and buyers. Generate high-converting CTAs with 6 goal types, 3 urgency levels, for any platform.</p>
          <a href="/cta-generator" className="inline-block px-8 py-3.5 btn-primary rounded-xl font-semibold text-white">
            Generate CTAs Free
          </a>
        </div>
      </section>

      {/* Brand Voice Generator CTA */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto text-center glass rounded-2xl p-8">
          <p className="text-xs text-amber-400 uppercase tracking-widest mb-2 font-semibold">New Tool</p>
          <h2 className="text-2xl font-bold mb-3">Brand Voice Generator</h2>
          <p className="text-zinc-400 mb-6 max-w-lg mx-auto">Define your brand personality with 6 archetypes, 10 industries. Get a complete voice guide with tone rules, vocabulary, do&apos;s &amp; don&apos;ts, and sample posts for every platform.</p>
          <a href="/brand-voice" className="inline-block px-8 py-3.5 btn-primary rounded-xl font-semibold text-white">
            Generate Brand Voice Free
          </a>
        </div>
      </section>

      {/* Content Calendar CTA */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto text-center glass rounded-2xl p-8">
          <p className="text-xs text-emerald-400 uppercase tracking-widest mb-2 font-semibold">New Tool</p>
          <h2 className="text-2xl font-bold mb-3">Content Calendar</h2>
          <p className="text-zinc-400 mb-6 max-w-lg mx-auto">Get a full week of content planned in seconds. Topics, captions, hashtags, and best posting times — tailored to your niche and goals across 5 platforms.</p>
          <a href="/content-calendar" className="inline-block px-8 py-3.5 btn-primary rounded-xl font-semibold text-white">
            Plan Your Week Free
          </a>
        </div>
      </section>

      {/* Social Media Audit CTA */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto text-center glass rounded-2xl p-8">
          <p className="text-xs text-teal-400 uppercase tracking-widest mb-2 font-semibold">New Tool</p>
          <h2 className="text-2xl font-bold mb-3">Social Media Audit</h2>
          <p className="text-zinc-400 mb-6 max-w-lg mx-auto">Get a comprehensive score for your social media presence. 6 categories, industry benchmarks, and actionable priorities — all in 60 seconds.</p>
          <a href="/social-audit" className="inline-block px-8 py-3.5 btn-primary rounded-xl font-semibold text-white">
            Run Free Audit
          </a>
        </div>
      </section>

      {/* Engagement Rate Calculator CTA */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto text-center glass rounded-2xl p-8">
          <p className="text-xs text-sky-400 uppercase tracking-widest mb-2 font-semibold">New Tool</p>
          <h2 className="text-2xl font-bold mb-3">Engagement Rate Calculator</h2>
          <p className="text-zinc-400 mb-6 max-w-lg mx-auto">Calculate your real engagement rate on any platform. Compare against 2026 benchmarks, get growth projections, and personalized recommendations.</p>
          <a href="/engagement-calculator" className="inline-block px-8 py-3.5 btn-primary rounded-xl font-semibold text-white">
            Calculate Engagement Free
          </a>
        </div>
      </section>

      {/* Sentiment Analyzer CTA */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto text-center glass rounded-2xl p-8">
          <p className="text-xs text-violet-400 uppercase tracking-widest mb-2 font-semibold">New Tool</p>
          <h2 className="text-2xl font-bold mb-3">Sentiment Analyzer</h2>
          <p className="text-zinc-400 mb-6 max-w-lg mx-auto">Predict the emotional impact of your content before you post. Get an Empathy Index score across 8 dimensions, readability analysis, platform fit ratings, and power word detection.</p>
          <a href="/sentiment-analyzer" className="inline-block px-8 py-3.5 btn-primary rounded-xl font-semibold text-white">
            Analyze Sentiment Free
          </a>
        </div>
      </section>

      {/* Influencer Score CTA */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto text-center glass rounded-2xl p-8">
          <p className="text-xs text-rose-400 uppercase tracking-widest mb-2 font-semibold">New Tool</p>
          <h2 className="text-2xl font-bold mb-3">Influencer Score Calculator</h2>
          <p className="text-zinc-400 mb-6 max-w-lg mx-auto">Calculate your influencer score, estimated post value, and brand readiness. 6 scoring categories, 12 niches, collaboration fit analysis, and growth recommendations.</p>
          <a href="/influencer-score" className="inline-block px-8 py-3.5 btn-primary rounded-xl font-semibold text-white">
            Calculate Score Free
          </a>
        </div>
      </section>

      {/* Competitor Analysis CTA */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto text-center glass rounded-2xl p-8">
          <p className="text-xs text-indigo-400 uppercase tracking-widest mb-2 font-semibold">New Tool</p>
          <h2 className="text-2xl font-bold mb-3">Competitor Analysis</h2>
          <p className="text-zinc-400 mb-6 max-w-lg mx-auto">Analyze any competitor&apos;s social media presence. Get a full SWOT analysis, identify content gaps, and build a strategy to outperform them — with industry benchmarks.</p>
          <a href="/competitor-analysis" className="inline-block px-8 py-3.5 btn-primary rounded-xl font-semibold text-white">
            Analyze Competitor Free
          </a>
        </div>
      </section>

      {/* Content Idea Generator CTA */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto text-center glass rounded-2xl p-8">
          <p className="text-xs text-lime-400 uppercase tracking-widest mb-2 font-semibold">New Tool</p>
          <h2 className="text-2xl font-bold mb-3">Content Idea Generator</h2>
          <p className="text-zinc-400 mb-6 max-w-lg mx-auto">Never run out of content ideas. Generate platform-specific ideas with hooks, outlines, CTAs, and hashtags — complete with engagement and virality scores.</p>
          <a href="/idea-generator" className="inline-block px-8 py-3.5 btn-primary rounded-xl font-semibold text-white">
            Generate Ideas Free
          </a>
        </div>
      </section>

      {/* ROI Calculator CTA */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto text-center glass rounded-2xl p-8">
          <p className="text-xs text-yellow-400 uppercase tracking-widest mb-2 font-semibold">New Tool</p>
          <h2 className="text-2xl font-bold mb-3">Social Media ROI Calculator</h2>
          <p className="text-zinc-400 mb-6 max-w-lg mx-auto">Calculate the true return on investment of your social media efforts. Track ad spend, revenue attribution, cost per lead, and get actionable recommendations.</p>
          <a href="/roi-calculator" className="inline-block px-8 py-3.5 btn-primary rounded-xl font-semibold text-white">
            Calculate ROI Free
          </a>
        </div>
      </section>

      {/* Post Timing Optimizer CTA */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto text-center glass rounded-2xl p-8">
          <p className="text-xs text-blue-400 uppercase tracking-widest mb-2 font-semibold">New Tool</p>
          <h2 className="text-2xl font-bold mb-3">Best Time to Post Calculator</h2>
          <p className="text-zinc-400 mb-6 max-w-lg mx-auto">Find the optimal posting times for maximum engagement. Data-driven 2026 benchmarks with weekly heatmap, platform insights, and frequency recommendations.</p>
          <a href="/post-timing" className="inline-block px-8 py-3.5 btn-primary rounded-xl font-semibold text-white">
            Find Best Times Free
          </a>
        </div>
      </section>

      {/* Content Repurposer CTA */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto text-center glass rounded-2xl p-8">
          <p className="text-xs text-fuchsia-400 uppercase tracking-widest mb-2 font-semibold">New Tool</p>
          <h2 className="text-2xl font-bold mb-3">Content Repurposer</h2>
          <p className="text-zinc-400 mb-6 max-w-lg mx-auto">Paste any long-form content and get platform-optimized versions for every social channel. One blog post becomes 6 platform-native posts with hashtags, tips, and best times.</p>
          <a href="/repurpose" className="inline-block px-8 py-3.5 btn-primary rounded-xl font-semibold text-white">
            Repurpose Content Free
          </a>
        </div>
      </section>

      {/* Persona Builder CTA */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto text-center glass rounded-2xl p-8">
          <p className="text-xs text-cyan-400 uppercase tracking-widest mb-2 font-semibold">New Tool</p>
          <h2 className="text-2xl font-bold mb-3">Audience Persona Builder</h2>
          <p className="text-zinc-400 mb-6 max-w-lg mx-auto">Build detailed audience personas with demographics, psychographics, social behavior, content preferences, buying triggers, and a complete messaging guide.</p>
          <a href="/persona-builder" className="inline-block px-8 py-3.5 btn-primary rounded-xl font-semibold text-white">
            Build Persona Free
          </a>
        </div>
      </section>

      {/* Trend Tracker CTA */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto text-center glass rounded-2xl p-8">
          <p className="text-xs text-red-400 uppercase tracking-widest mb-2 font-semibold">New Tool</p>
          <h2 className="text-2xl font-bold mb-3">Social Media Trend Tracker</h2>
          <p className="text-zinc-400 mb-6 max-w-lg mx-auto">Identify emerging trends before your competitors. Get trend velocity scores, platform heatmaps, emerging hashtags, and 30-day forecasts across 12 industries and 7 regions.</p>
          <a href="/trend-tracker" className="inline-block px-8 py-3.5 btn-primary rounded-xl font-semibold text-white">
            Track Trends Free
          </a>
        </div>
      </section>

      {/* UGC Manager CTA */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto text-center glass rounded-2xl p-8">
          <p className="text-xs text-emerald-400 uppercase tracking-widest mb-2 font-semibold">New Tool</p>
          <h2 className="text-2xl font-bold mb-3">UGC Manager & Rights Tracker</h2>
          <p className="text-zinc-400 mb-6 max-w-lg mx-auto">Build a complete UGC strategy with creator sourcing plans, rights frameworks, content briefs, performance benchmarks, and legal checklists — for any budget and industry.</p>
          <a href="/ugc-manager" className="inline-block px-8 py-3.5 btn-primary rounded-xl font-semibold text-white">
            Plan UGC Strategy Free
          </a>
        </div>
      </section>

      {/* Social Listening CTA */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto text-center glass rounded-2xl p-8">
          <p className="text-xs text-teal-400 uppercase tracking-widest mb-2 font-semibold">New Tool</p>
          <h2 className="text-2xl font-bold mb-3">Social Listening Dashboard</h2>
          <p className="text-zinc-400 mb-6 max-w-lg mx-auto">Monitor brand mentions, track competitor activity, analyze sentiment trends, and detect crises before they escalate — across 7 platforms with AI-powered intelligence.</p>
          <a href="/social-listening" className="inline-block px-8 py-3.5 btn-primary rounded-xl font-semibold text-white">
            Start Listening Free
          </a>
        </div>
      </section>

      {/* Crisis Management CTA */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto text-center glass rounded-2xl p-8">
          <p className="text-xs text-red-400 uppercase tracking-widest mb-2 font-semibold">New Tool</p>
          <h2 className="text-2xl font-bold mb-3">Crisis Management Toolkit</h2>
          <p className="text-zinc-400 mb-6 max-w-lg mx-auto">Generate a complete crisis response plan in seconds. Response templates, stakeholder communication plans, recovery timelines, and monitoring checklists — customized to any situation.</p>
          <a href="/crisis-management" className="inline-block px-8 py-3.5 btn-primary rounded-xl font-semibold text-white">
            Generate Crisis Plan Free
          </a>
        </div>
      </section>

      {/* Social SEO Keyword Analyzer CTA */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto text-center glass rounded-2xl p-8">
          <p className="text-xs text-cyan-400 uppercase tracking-widest mb-2 font-semibold">New Tool</p>
          <h2 className="text-2xl font-bold mb-3">Social SEO Keyword Analyzer</h2>
          <p className="text-zinc-400 mb-6 max-w-lg mx-auto">Discover high-volume, low-competition keywords for TikTok, YouTube Shorts, Instagram, and Pinterest search. Find what people are searching and create content that ranks.</p>
          <a href="/social-seo" className="inline-block px-8 py-3.5 btn-primary rounded-xl font-semibold text-white">
            Analyze Keywords Free
          </a>
        </div>
      </section>

      {/* Caption Optimizer CTA */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto text-center glass rounded-2xl p-8">
          <p className="text-xs text-purple-400 uppercase tracking-widest mb-2 font-semibold">New Tool</p>
          <h2 className="text-2xl font-bold mb-3">Cross-Platform Caption Optimizer</h2>
          <p className="text-zinc-400 mb-6 max-w-lg mx-auto">Paste your caption and get a detailed optimization score for every platform. Hook strength, CTA analysis, readability, hashtag strategy, and engagement estimates.</p>
          <a href="/caption-optimizer" className="inline-block px-8 py-3.5 btn-primary rounded-xl font-semibold text-white">
            Optimize Captions Free
          </a>
        </div>
      </section>

      {/* Virality Score Predictor CTA */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto text-center glass rounded-2xl p-8">
          <p className="text-xs text-orange-400 uppercase tracking-widest mb-2 font-semibold">New Tool</p>
          <h2 className="text-2xl font-bold mb-3">Virality Score Predictor</h2>
          <p className="text-zinc-400 mb-6 max-w-lg mx-auto">Predict how likely your content is to go viral before you post. 6-dimension scoring: hook strength, topic virality, format fit, engagement triggers, visual appeal, and length optimization.</p>
          <a href="/virality-score" className="inline-block px-8 py-3.5 btn-primary rounded-xl font-semibold text-white">
            Predict Virality Free
          </a>
        </div>
      </section>

      {/* A/B Test Planner CTA */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto text-center glass rounded-2xl p-8">
          <p className="text-xs text-lime-400 uppercase tracking-widest mb-2 font-semibold">New Tool</p>
          <h2 className="text-2xl font-bold mb-3">A/B Split Test Planner</h2>
          <p className="text-zinc-400 mb-6 max-w-lg mx-auto">Generate a complete A/B testing plan for your social content. Hypothesis, variants, sample sizes, analysis framework — stop guessing, start testing.</p>
          <a href="/ab-testing" className="inline-block px-8 py-3.5 btn-primary rounded-xl font-semibold text-white">
            Plan A/B Test Free
          </a>
        </div>
      </section>

      {/* Platform-Specific Tools */}
      <section className="px-6 py-12 border-t border-zinc-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl font-bold mb-6">Platform-Specific Generators</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <a href="/instagram-captions" className="glass rounded-xl p-4 hover:border-pink-500/30 transition">
              <p className="font-semibold text-sm">Instagram Captions</p>
              <p className="text-xs text-zinc-500 mt-1">2,200 chars optimized</p>
            </a>
            <a href="/linkedin-posts" className="glass rounded-xl p-4 hover:border-pink-500/30 transition">
              <p className="font-semibold text-sm">LinkedIn Posts</p>
              <p className="text-xs text-zinc-500 mt-1">Thought leadership</p>
            </a>
            <a href="/twitter-posts" className="glass rounded-xl p-4 hover:border-pink-500/30 transition">
              <p className="font-semibold text-sm">Twitter/X Posts</p>
              <p className="text-xs text-zinc-500 mt-1">280-char viral tweets</p>
            </a>
            <a href="/tiktok-scripts" className="glass rounded-xl p-4 hover:border-pink-500/30 transition">
              <p className="font-semibold text-sm">TikTok Scripts</p>
              <p className="text-xs text-zinc-500 mt-1">Hook-first scripts</p>
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 border-t border-zinc-800/50 text-center">
        <h2 className="text-2xl font-bold mb-3">Stop Staring at Blank Screens</h2>
        <p className="text-zinc-400 mb-6 max-w-md mx-auto">Join 2,000+ creators saving hours every week with AI-generated social content.</p>
        <a href="#top" className="inline-block px-8 py-3.5 btn-primary rounded-xl font-semibold text-white">
          Start Creating for Free
        </a>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-zinc-800/50 text-center text-xs text-zinc-600">
        <div className="flex justify-center gap-6 mb-4">
          <a href="/pricing" className="hover:text-zinc-400 transition">Pricing</a>
          <a href="/campaign" className="hover:text-zinc-400 transition">Campaign</a>
          <a href="/atomizer" className="hover:text-zinc-400 transition">Atomizer</a>
          <a href="/hooks" className="hover:text-zinc-400 transition">Hooks</a>
          <a href="/video-scripts" className="hover:text-zinc-400 transition">Video Scripts</a>
          <a href="/threads" className="hover:text-zinc-400 transition">Threads</a>
          <a href="/hashtags" className="hover:text-zinc-400 transition">Hashtags</a>
          <a href="/bios" className="hover:text-zinc-400 transition">Bios</a>
          <a href="/cta-generator" className="hover:text-zinc-400 transition">CTAs</a>
          <a href="/brand-voice" className="hover:text-zinc-400 transition">Brand Voice</a>
          <a href="/content-calendar" className="hover:text-zinc-400 transition">Calendar</a>
          <a href="/social-audit" className="hover:text-zinc-400 transition">Audit</a>
          <a href="/engagement-calculator" className="hover:text-zinc-400 transition">Engagement</a>
          <a href="/sentiment-analyzer" className="hover:text-zinc-400 transition">Sentiment</a>
          <a href="/influencer-score" className="hover:text-zinc-400 transition">Influencer</a>
          <a href="/competitor-analysis" className="hover:text-zinc-400 transition">Competitor</a>
          <a href="/idea-generator" className="hover:text-zinc-400 transition">Ideas</a>
          <a href="/roi-calculator" className="hover:text-zinc-400 transition">ROI</a>
          <a href="/post-timing" className="hover:text-zinc-400 transition">Timing</a>
          <a href="/repurpose" className="hover:text-zinc-400 transition">Repurpose</a>
          <a href="/persona-builder" className="hover:text-zinc-400 transition">Persona</a>
          <a href="/trend-tracker" className="hover:text-zinc-400 transition">Trends</a>
          <a href="/ugc-manager" className="hover:text-zinc-400 transition">UGC</a>
          <a href="/social-listening" className="hover:text-zinc-400 transition">Listening</a>
          <a href="/crisis-management" className="hover:text-zinc-400 transition">Crisis</a>
          <a href="/social-seo" className="hover:text-zinc-400 transition">Social SEO</a>
          <a href="/caption-optimizer" className="hover:text-zinc-400 transition">Captions</a>
          <a href="/virality-score" className="hover:text-zinc-400 transition">Virality</a>
          <a href="/ab-testing" className="hover:text-zinc-400 transition">A/B Test</a>
          <a href="/use-cases" className="hover:text-zinc-400 transition">Use Cases</a>
          <a href="/blog" className="hover:text-zinc-400 transition">Blog</a>
        </div>
        <p>&copy; {new Date().getFullYear()} PostCraft AI. All rights reserved.</p>
      </footer>
    </main>
  );
}
