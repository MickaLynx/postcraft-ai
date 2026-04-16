'use client';
import { useState } from 'react';

const platforms = ['Twitter/X', 'LinkedIn', 'Instagram', 'TikTok', 'Facebook', 'YouTube'] as const;
const contentAges = ['1-2 weeks old', '1 month old', '2-3 months old', '6+ months old', 'Evergreen (timeless)'] as const;
const recycleStrategies = ['Fresh Angle', 'Updated Data', 'Different Format', 'New Audience Segment', 'Seasonal Tie-In', 'Controversial Spin'] as const;

interface RecycledPost {
  strategy: string;
  newVersion: string;
  whyItWorks: string;
  bestPlatform: string;
  expectedLift: string;
}

interface RecycleResult {
  originalAnalysis: string;
  recycledVersions: RecycledPost[];
  recycleCalendar: { week: number; strategy: string; note: string }[];
  rulesOfRecycling: string[];
  platformRotation: { from: string; to: string; adaptation: string }[];
  metrics: { name: string; value: string }[];
}

function generateRecycleStrategy(
  platform: string, originalPost: string, performance: string, contentAge: string
): RecycleResult {
  const recycledVersions: RecycledPost[] = [
    {
      strategy: 'Fresh Angle',
      newVersion: `Different perspective on "${originalPost.slice(0, 50)}..." — Instead of [original angle], try the contrarian take or a different audience\'s viewpoint.`,
      whyItWorks: 'Same data, new frame. 70% of your audience missed it the first time. A new angle catches the rest.',
      bestPlatform: platform,
      expectedLift: '+40-60% of original engagement',
    },
    {
      strategy: 'Format Switch',
      newVersion: `Turn "${originalPost.slice(0, 40)}..." from ${platform === 'Twitter/X' ? 'a tweet into a carousel' : platform === 'LinkedIn' ? 'a text post into a PDF carousel' : 'a photo post into a Reel/video'}. The content stays the same — the package changes.`,
      whyItWorks: 'Different formats reach different segments of your audience. A carousel reaches people who scrolled past your text post.',
      bestPlatform: platform === 'Twitter/X' ? 'LinkedIn' : platform === 'LinkedIn' ? 'Instagram' : 'TikTok',
      expectedLift: '+80-120% of original (new format = new audience)',
    },
    {
      strategy: 'Data Update',
      newVersion: `"We shared this ${contentAge} — here\'s what changed since then." Add updated stats, new examples, or results from applying the original advice.`,
      whyItWorks: 'Updates feel fresh even when the core message is the same. "Updated for 2026" is a proven engagement trigger.',
      bestPlatform: 'LinkedIn',
      expectedLift: '+30-50% of original',
    },
    {
      strategy: 'Thread/Series Expansion',
      newVersion: `Expand "${originalPost.slice(0, 40)}..." into a 5-7 part thread or carousel series. Each point becomes its own deep-dive slide or tweet.`,
      whyItWorks: 'If one post did well, the audience wants MORE on this topic. Give them the full framework.',
      bestPlatform: platform === 'Instagram' ? 'Instagram (carousel)' : 'Twitter/X (thread)',
      expectedLift: '+150-200% total engagement (across all parts)',
    },
    {
      strategy: 'Audience Reframe',
      newVersion: `Same insight, different audience: "${originalPost.slice(0, 40)}..." rewritten for [beginners/advanced users/a different industry]. Change the examples, not the lesson.`,
      whyItWorks: 'Every insight applies to multiple audiences. Reframing expands your reach without creating from scratch.',
      bestPlatform: platform,
      expectedLift: '+50-70% of original',
    },
  ];

  const recycleCalendar = [
    { week: 1, strategy: 'Post original version', note: 'Track engagement metrics for the first 48 hours' },
    { week: 2, strategy: 'Cross-post to different platform', note: 'Adapt format for the new platform (carousel → thread, etc.)' },
    { week: 4, strategy: 'Fresh angle version', note: 'Contrarian or audience-shifted reframe of the original' },
    { week: 6, strategy: 'Format switch', note: 'Turn text into carousel, video, or infographic' },
    { week: 8, strategy: 'Data update or results post', note: 'Share what happened since the original — add new evidence' },
    { week: 12, strategy: 'Evergreen repost', note: 'If it\'s timeless, repost with minimal changes and "icymi" framing' },
  ];

  const rulesOfRecycling = [
    'Never repost word-for-word within 2 weeks — algorithms suppress exact duplicates',
    'Change at least 30% of the content (new hook, different examples, updated stats)',
    'Best posts to recycle: anything with above-average engagement (especially saves and shares)',
    'DON\'T recycle: trending/news content (it expires), holiday-specific posts, or anything time-stamped',
    'Cross-platform recycling works best: Twitter → LinkedIn → Instagram (different audiences)',
    'Track which recycled versions outperform originals — sometimes V2 beats V1',
    'Wait at least 7 days before recycling on the same platform',
    'Always add new value: updated data, new perspective, or additional context',
  ];

  const platformRotation = [
    { from: 'Twitter/X', to: 'LinkedIn', adaptation: 'Expand from 280 chars to 1300+ with professional context' },
    { from: 'LinkedIn', to: 'Instagram carousel', adaptation: 'Visualize key points as slides, add design elements' },
    { from: 'Instagram', to: 'TikTok', adaptation: 'Turn static content into talking-head or text-on-screen video' },
    { from: 'TikTok', to: 'YouTube Shorts', adaptation: 'Same video, add end screen and subscribe CTA' },
    { from: 'Blog post', to: 'Twitter thread', adaptation: 'Extract 7-10 key insights, one per tweet' },
  ];

  const performanceLabel = performance === 'high' ? 'Top performer' : performance === 'medium' ? 'Above average' : 'Average';

  return {
    originalAnalysis: `"${originalPost.slice(0, 80)}..." — ${performanceLabel} on ${platform}. Age: ${contentAge}. ${performance === 'high' ? 'High-performing posts should be recycled 3-5 times across formats and platforms.' : 'Good foundation — a format switch or angle change could unlock much more engagement.'}`,
    recycledVersions,
    recycleCalendar,
    rulesOfRecycling,
    platformRotation,
    metrics: [
      { name: 'Optimal recycle window', value: '2-4 weeks after original' },
      { name: 'Expected reach of V2', value: '60-80% of original (same platform)' },
      { name: 'Cross-platform reach', value: '+100-200% net new audience' },
      { name: 'Content lifespan extension', value: '3-6 months with strategic recycling' },
      { name: 'Time saved vs new content', value: '70-80% faster to recycle than create' },
    ],
  };
}

export default function ContentRecyclerPage() {
  const [platform, setPlatform] = useState<string>('Twitter/X');
  const [originalPost, setOriginalPost] = useState('');
  const [performance, setPerformance] = useState('high');
  const [contentAge, setContentAge] = useState<string>('1 month old');
  const [result, setResult] = useState<RecycleResult | null>(null);

  const handleGenerate = () => {
    if (!originalPost.trim()) return;
    setResult(generateRecycleStrategy(platform, originalPost.trim(), performance, contentAge));
  };

  return (
    <main className="min-h-screen bg-zinc-950 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Content Recycler</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Turn your best-performing posts into 5+ new pieces of content. <strong className="text-white">80% of your audience missed your post the first time</strong> — recycling is not lazy, it&apos;s strategic.</p>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Original Platform</label>
            <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {platforms.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Performance Level</label>
            <select value={performance} onChange={e => setPerformance(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              <option value="high">High performer (top 10%)</option>
              <option value="medium">Above average</option>
              <option value="low">Average</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Content Age</label>
            <select value={contentAge} onChange={e => setContentAge(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {contentAges.map(a => <option key={a}>{a}</option>)}
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-zinc-400 mb-1">Original Post Content</label>
          <textarea value={originalPost} onChange={e => setOriginalPost(e.target.value)} rows={4} placeholder="Paste your original post here..." className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600 resize-none" />
        </div>

        <button onClick={handleGenerate} className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition">
          Generate Recycled Versions
        </button>

        {result && (
          <div className="mt-10 space-y-6">
            <div className="bg-zinc-900 border border-violet-500/30 rounded-xl p-5">
              <h3 className="text-sm text-zinc-400 mb-1">Original Analysis</h3>
              <p className="text-white text-sm">{result.originalAnalysis}</p>
            </div>

            <h2 className="text-2xl font-bold text-white">5 Recycled Versions</h2>
            {result.recycledVersions.map((v, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs bg-violet-600/20 text-violet-300 px-2 py-1 rounded">{v.strategy}</span>
                  <span className="text-xs text-green-400">{v.expectedLift}</span>
                </div>
                <p className="text-white text-sm mb-2">{v.newVersion}</p>
                <p className="text-xs text-zinc-500">{v.whyItWorks}</p>
                <p className="text-xs text-zinc-500 mt-1">Best on: {v.bestPlatform}</p>
              </div>
            ))}

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Recycle Calendar</h3>
                {result.recycleCalendar.map((w, i) => (
                  <div key={i} className="flex gap-3 mb-3">
                    <span className="text-xs text-violet-400 whitespace-nowrap">Week {w.week}</span>
                    <div><p className="text-sm text-white">{w.strategy}</p><p className="text-xs text-zinc-500">{w.note}</p></div>
                  </div>
                ))}
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Key Metrics</h3>
                {result.metrics.map((m, i) => (
                  <div key={i} className="flex justify-between mb-2">
                    <span className="text-sm text-zinc-400">{m.name}</span>
                    <span className="text-sm text-white font-medium">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Rules of Recycling</h3>
              <ul className="space-y-2">{result.rulesOfRecycling.map((r, i) => <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-green-400">✓</span>{r}</li>)}</ul>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Platform Rotation Guide</h3>
              {result.platformRotation.map((r, i) => (
                <div key={i} className="flex items-center gap-3 mb-3 bg-zinc-800 rounded-lg p-3">
                  <span className="text-sm text-white">{r.from}</span>
                  <span className="text-violet-400">→</span>
                  <span className="text-sm text-white">{r.to}</span>
                  <span className="text-xs text-zinc-500 ml-auto">{r.adaptation}</span>
                </div>
              ))}
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-zinc-400 mb-3">Related Tools</h3>
              <div className="flex flex-wrap gap-2 text-sm">
                <a href="/repurpose" className="text-violet-400 hover:text-violet-300 underline">Content Repurposer</a>
                <a href="/carousel-generator" className="text-violet-400 hover:text-violet-300 underline">Carousel Generator</a>
                <a href="/content-calendar" className="text-violet-400 hover:text-violet-300 underline">Content Calendar</a>
                <a href="/post-timing" className="text-violet-400 hover:text-violet-300 underline">Post Timing</a>
                <a href="/atomizer" className="text-violet-400 hover:text-violet-300 underline">Content Atomizer</a>
                <a href="/virality-score" className="text-violet-400 hover:text-violet-300 underline">Virality Score</a>
              </div>
            </div>
          </div>
        )}

        <section className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">Content Recycling FAQ</h2>
          <div className="space-y-4">
            {[
              { q: 'Isn\'t recycling content lazy?', a: 'No — it\'s what every major brand and top creator does. Gary Vee famously turns one keynote into 30+ pieces. Seth Godin reposts blog ideas as tweets. 80% of your audience missed your post the first time. Strategic recycling is smart, not lazy.' },
              { q: 'How often can I recycle the same content?', a: '3-5 times over 3-6 months, if each version adds something new: different format, fresh angle, updated data, or new platform. Never word-for-word repost within 2 weeks on the same platform.' },
              { q: 'Which posts should I recycle?', a: 'Your top 10% performers — posts with high saves, shares, and comments. Evergreen content (not time-sensitive) recycles best. Don\'t recycle trending takes, holiday posts, or anything with a date stamp.' },
              { q: 'Does recycling hurt my algorithm ranking?', a: 'Not if you change 30%+ of the content. Exact duplicates may be suppressed, but new angles, formats, and platforms are treated as fresh content by algorithms. Cross-platform recycling is always safe.' },
            ].map((faq, i) => (
              <details key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <summary className="font-semibold text-white cursor-pointer">{faq.q}</summary>
                <p className="text-zinc-400 text-sm mt-2">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <footer className="mt-20 border-t border-zinc-800 pt-8 pb-12">
          <div className="grid md:grid-cols-4 gap-8 text-sm text-zinc-500">
            <div><h4 className="font-semibold text-white mb-3">Content Creation</h4><ul className="space-y-1"><li><a href="/" className="hover:text-white transition">Post Generator</a></li><li><a href="/carousel-generator" className="hover:text-white transition">Carousel</a></li><li><a href="/story-planner" className="hover:text-white transition">Story Planner</a></li><li><a href="/content-recycler" className="hover:text-white transition">Content Recycler</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Optimization</h4><ul className="space-y-1"><li><a href="/caption-optimizer" className="hover:text-white transition">Captions</a></li><li><a href="/hashtags" className="hover:text-white transition">Hashtags</a></li><li><a href="/post-timing" className="hover:text-white transition">Timing</a></li><li><a href="/virality-score" className="hover:text-white transition">Virality</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Analytics</h4><ul className="space-y-1"><li><a href="/engagement-calculator" className="hover:text-white transition">Engagement</a></li><li><a href="/roi-calculator" className="hover:text-white transition">ROI</a></li><li><a href="/sentiment-analyzer" className="hover:text-white transition">Sentiment</a></li><li><a href="/competitor-analysis" className="hover:text-white transition">Competitors</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Strategy</h4><ul className="space-y-1"><li><a href="/repurpose" className="hover:text-white transition">Repurpose</a></li><li><a href="/atomizer" className="hover:text-white transition">Atomizer</a></li><li><a href="/content-calendar" className="hover:text-white transition">Calendar</a></li><li><a href="/campaign" className="hover:text-white transition">Campaign</a></li></ul></div>
          </div>
          <p className="text-center text-zinc-600 text-xs mt-8">© 2026 PostCraft AI. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
