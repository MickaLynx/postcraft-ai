'use client';
import { useState } from 'react';

const allPlatforms = [
  { key: 'Twitter/X', label: 'Twitter/X', limit: 280, icon: 'X' },
  { key: 'LinkedIn', label: 'LinkedIn', limit: 3000, icon: 'in' },
  { key: 'Instagram', label: 'Instagram', limit: 2200, icon: 'IG' },
  { key: 'TikTok', label: 'TikTok', limit: 300, icon: 'TT' },
  { key: 'Facebook', label: 'Facebook', limit: 5000, icon: 'FB' },
] as const;

const tones = ['professional', 'casual', 'funny', 'provocative', 'inspiring', 'empathetic', 'urgent', 'storytelling'] as const;
const languages = ['English', 'Fran\u00e7ais', 'Espa\u00f1ol', 'Deutsch', 'Italiano', 'Portugu\u00eas', '\u65e5\u672c\u8a9e', '\u4e2d\u6587', '\ud55c\uad6d\u00b0', '\u0627\u0644\u0639\u0631\u0628\u064a\u0629', '\u0939\u093f\u0928\u094d\u0926\u0940', 'Nederlands', 'Polski', 'Svenska', 'Norsk', 'Dansk', 'Suomi', 'T\u00fcrk\u00e7e', '\u0420\u0443\u0441\u0441\u043a\u0438\u0439', '\u0423\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430', 'Bahasa Indonesia', 'Bahasa Melayu', 'Ti\u1ebfng Vi\u1ec7t', '\u0e44\u0e17\u0e22', 'Filipino'] as const;

const audiences = [
  { key: 'general', label: 'General Audience' },
  { key: 'ecommerce', label: 'E-commerce / DTC' },
  { key: 'saas', label: 'SaaS / B2B' },
  { key: 'creator', label: 'Content Creator' },
  { key: 'agency', label: 'Marketing Agency' },
  { key: 'personal', label: 'Personal Brand' },
  { key: 'startup', label: 'Startup Founder' },
] as const;

type AtomizerResults = Record<string, string[]>;

export default function AtomizerPage() {
  const [sourceContent, setSourceContent] = useState('');
  const [tone, setTone] = useState<string>('professional');
  const [language, setLanguage] = useState<string>('English');
  const [audience, setAudience] = useState<string>('general');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['Twitter/X', 'LinkedIn', 'Instagram', 'TikTok', 'Facebook']);
  const [results, setResults] = useState<AtomizerResults>({});
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  function togglePlatform(key: string) {
    setSelectedPlatforms(prev =>
      prev.includes(key) ? prev.filter(p => p !== key) : [...prev, key]
    );
  }

  async function atomize() {
    if (!sourceContent.trim() || selectedPlatforms.length === 0) return;
    setLoading(true);
    setResults({});

    const newResults: AtomizerResults = {};

    for (const platform of selectedPlatforms) {
      setProgress(`Atomizing for ${platform}...`);
      try {
        const r = await fetch('/api/atomize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sourceContent, platform, tone, language, audience }),
        });
        const data = await r.json();
        newResults[platform] = data.posts || [];
      } catch {
        newResults[platform] = ['Error atomizing content.'];
      }
      setResults({ ...newResults });
    }

    setProgress('');
    setLoading(false);
  }

  function copyPost(text: string, key: string) {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }

  function copyAll() {
    const allText = Object.entries(results)
      .map(([platform, posts]) => `--- ${platform} ---\n${posts.join('\n\n')}`)
      .join('\n\n');
    navigator.clipboard.writeText(allText);
    setCopied('all');
    setTimeout(() => setCopied(null), 2000);
  }

  const totalPosts = Object.values(results).reduce((sum, posts) => sum + posts.length, 0);
  const wordCount = sourceContent.trim().split(/\s+/).filter(Boolean).length;

  return (
    <main className="min-h-screen">
      <section className="px-6 py-20 max-w-4xl mx-auto text-center">
        <p className="text-xs text-pink-400 uppercase tracking-widest mb-3 font-semibold">New Feature</p>
        <h1 className="text-5xl font-bold mb-4">
          <span className="gradient-text">Content Atomizer</span>
        </h1>
        <p className="text-zinc-400 text-lg mb-4 max-w-2xl mx-auto">
          Paste your blog post, podcast transcript, newsletter, or any long-form content.
          Get platform-optimized social posts extracted automatically.
        </p>
        <p className="text-zinc-500 text-sm mb-12">
          One source, {selectedPlatforms.length} platforms, {selectedPlatforms.length * 3} posts. 95% ready-to-post.
        </p>

        <div className="glass rounded-2xl p-6 text-left">
          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">
            Source content (blog post, transcript, newsletter, article...)
          </label>
          <textarea
            value={sourceContent}
            onChange={e => setSourceContent(e.target.value)}
            placeholder="Paste your long-form content here... Blog post, podcast transcript, webinar notes, newsletter draft, press release, or any source material you want to repurpose for social media."
            rows={8}
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-pink-500 transition mb-2 resize-y"
          />
          <p className="text-xs text-zinc-600 mb-5">{wordCount} words</p>

          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Target audience</label>
          <div className="flex flex-wrap gap-2 mb-5">
            {audiences.map(a => (
              <button key={a.key} onClick={() => setAudience(a.key)}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition ${
                  audience === a.key ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}>
                {a.label}
              </button>
            ))}
          </div>

          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Output platforms (select 1+)</label>
          <div className="flex flex-wrap gap-2 mb-5">
            {allPlatforms.map(p => (
              <button key={p.key} onClick={() => togglePlatform(p.key)}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition ${
                  selectedPlatforms.includes(p.key)
                    ? 'bg-pink-600 text-white'
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}>
                {p.label} <span className="text-zinc-400 ml-1">({p.limit})</span>
              </button>
            ))}
          </div>

          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Tone</label>
          <div className="flex flex-wrap gap-2 mb-5">
            {tones.map(t => (
              <button key={t} onClick={() => setTone(t)}
                className={`px-4 py-2 rounded-lg text-xs font-medium capitalize transition ${
                  tone === t ? 'bg-purple-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}>
                {t}
              </button>
            ))}
          </div>

          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Language</label>
          <select value={language} onChange={e => setLanguage(e.target.value)}
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-pink-500 transition mb-6">
            {languages.map(l => <option key={l} value={l}>{l}</option>)}
          </select>

          <button onClick={atomize}
            disabled={loading || !sourceContent.trim() || selectedPlatforms.length === 0}
            className="w-full py-3.5 btn-primary rounded-xl font-semibold text-white">
            {loading ? progress || 'Atomizing content...' : `Atomize into ${selectedPlatforms.length * 3} Posts`}
          </button>
        </div>
      </section>

      {/* Results */}
      {totalPosts > 0 && (
        <section className="px-6 pb-20 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">
              Atomized Content — {totalPosts} posts from {wordCount} words
            </h2>
            <button onClick={copyAll}
              className={`text-xs px-4 py-2 rounded-lg transition ${
                copied === 'all' ? 'bg-green-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}>
              {copied === 'all' ? 'Copied all!' : 'Copy all posts'}
            </button>
          </div>

          <div className="space-y-8">
            {Object.entries(results).map(([platform, posts]) => {
              const info = allPlatforms.find(p => p.key === platform);
              const limit = info?.limit || 280;
              return (
                <div key={platform}>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <span className="px-3 py-1 bg-pink-600/20 text-pink-400 rounded-lg text-xs font-bold">{platform}</span>
                    <span className="text-zinc-500 text-xs">{posts.length} posts extracted</span>
                  </h3>
                  <div className="space-y-3">
                    {posts.map((p, i) => {
                      const key = `${platform}-${i}`;
                      return (
                        <div key={key} onClick={() => copyPost(p, key)}
                          className="glass rounded-xl p-5 cursor-pointer hover:border-pink-500/40 transition fade-in">
                          <p className="text-sm whitespace-pre-wrap leading-relaxed">{p}</p>
                          <div className="flex items-center justify-between mt-3 text-xs text-zinc-500">
                            <span>{p.length} / {limit.toLocaleString()} chars</span>
                            <span className={copied === key ? 'text-green-400' : ''}>
                              {copied === key ? 'Copied!' : 'Click to copy'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* How Atomization Works */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">How Content Atomization Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="glass rounded-xl p-5 text-center">
              <div className="text-2xl mb-2">1</div>
              <h3 className="font-semibold mb-2 text-sm">Paste Source</h3>
              <p className="text-xs text-zinc-400">Blog post, podcast transcript, newsletter, webinar notes — any long-form content.</p>
            </div>
            <div className="glass rounded-xl p-5 text-center">
              <div className="text-2xl mb-2">2</div>
              <h3 className="font-semibold mb-2 text-sm">AI Extracts Key Ideas</h3>
              <p className="text-xs text-zinc-400">Our AI identifies the most impactful quotes, insights, and data points from your content.</p>
            </div>
            <div className="glass rounded-xl p-5 text-center">
              <div className="text-2xl mb-2">3</div>
              <h3 className="font-semibold mb-2 text-sm">Platform Optimization</h3>
              <p className="text-xs text-zinc-400">Each extracted insight is rewritten for the specific platform, tone, and character limits.</p>
            </div>
            <div className="glass rounded-xl p-5 text-center">
              <div className="text-2xl mb-2">4</div>
              <h3 className="font-semibold mb-2 text-sm">Copy & Schedule</h3>
              <p className="text-xs text-zinc-400">Copy individual posts or the entire batch. Paste into your scheduler — done for the week.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">What Can You Atomize?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              ['Blog Posts', 'Turn a 1,500-word article into 15+ social posts. Each post highlights a different insight, statistic, or takeaway.'],
              ['Podcast Transcripts', 'Extract the best quotes, key moments, and actionable tips from your episodes. One 30-minute episode = 2 weeks of content.'],
              ['Newsletters', 'Repurpose your email content for social. Every section becomes a standalone post for a different platform.'],
              ['Webinar Notes', 'Turn your presentation key points, Q&A highlights, and audience insights into shareable content.'],
              ['Press Releases', 'Extract announcements, key quotes, and data points. Distribute across all social channels simultaneously.'],
              ['Research Reports', 'Turn data, findings, and insights into digestible social posts. Make complex information accessible and shareable.'],
            ].map(([title, desc]) => (
              <div key={title} className="glass rounded-xl p-5">
                <h3 className="font-semibold mb-2 text-sm">{title}</h3>
                <p className="text-xs text-zinc-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Why Content Atomization is the #1 Strategy for 2026</h2>
          <div className="space-y-4 text-sm text-zinc-400 leading-relaxed">
            <p>Content atomization — the practice of breaking one long-form piece into multiple platform-specific micro-assets — has become the dominant content strategy for 2026. Marketers who atomize report 3-5x more output from the same source material, with minimal additional effort.</p>
            <p>The challenge has always been adaptation. A LinkedIn post needs a completely different structure than a tweet. An Instagram caption requires different hooks than a TikTok script. Manually rewriting the same idea for 5 platforms takes hours — or it produces generic cross-posts that underperform by 60-80%.</p>
            <p>PostCraft&apos;s Content Atomizer uses AI to understand the key ideas, data points, and emotional hooks in your source content, then automatically generates platform-native posts that sound like they were written by a specialist for each channel.</p>
            <h3 className="text-white font-semibold mt-6">The Math of Atomization</h3>
            <p>One 1,500-word blog post contains enough material for approximately 15-20 social posts. If you publish one blog post per week, atomization gives you 3-4 posts per platform per week — a full content calendar from a single source. That&apos;s why 73% of top-performing brands now use some form of content atomization in their workflow.</p>
            <h3 className="text-white font-semibold mt-6">Better Than Cross-Posting</h3>
            <p>Cross-posting (sharing the exact same content across platforms) results in 60-80% lower engagement compared to platform-native content. Each platform has different audience expectations, format requirements, and algorithm preferences. Atomization respects these differences while maintaining message consistency.</p>
          </div>
        </div>
      </section>

      {/* Cross Links */}
      <section className="px-6 py-12 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-zinc-500 text-sm mb-4">Or try these tools:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="/campaign" className="text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg transition">Campaign Mode</a>
            <a href="/instagram-captions" className="text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg transition">Instagram Captions</a>
            <a href="/linkedin-posts" className="text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg transition">LinkedIn Posts</a>
            <a href="/twitter-posts" className="text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg transition">Twitter/X Posts</a>
            <a href="/tiktok-scripts" className="text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg transition">TikTok Scripts</a>
            <a href="/blog/multi-platform-content-strategy" className="text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg transition">Read: Multi-Platform Strategy</a>
          </div>
        </div>
      </section>

      <footer className="px-6 py-8 border-t border-zinc-800/50 text-center text-xs text-zinc-600">
        <p>&copy; {new Date().getFullYear()} PostCraft AI. All rights reserved.</p>
      </footer>
    </main>
  );
}
