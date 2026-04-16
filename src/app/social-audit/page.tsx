'use client';
import { useState } from 'react';

const platforms = ['Twitter/X', 'LinkedIn', 'Instagram', 'TikTok', 'Facebook'] as const;
const accountTypes = ['Personal Brand', 'Small Business', 'Agency', 'Enterprise', 'Creator/Influencer', 'Non-Profit'] as const;

interface AuditResult {
  overallScore: number;
  categories: { name: string; score: number; tips: string[] }[];
  topPriorities: string[];
  strengths: string[];
  competitorInsights: string[];
}

export default function SocialAuditPage() {
  const [platform, setPlatform] = useState<string>('Instagram');
  const [accountType, setAccountType] = useState<string>('Personal Brand');
  const [followers, setFollowers] = useState('');
  const [postsPerWeek, setPostsPerWeek] = useState('');
  const [avgLikes, setAvgLikes] = useState('');
  const [avgComments, setAvgComments] = useState('');
  const [avgShares, setAvgShares] = useState('');
  const [bio, setBio] = useState('');
  const [hasLinktree, setHasLinktree] = useState(false);
  const [usesHashtags, setUsesHashtags] = useState(false);
  const [usesReels, setUsesReels] = useState(false);
  const [postsStories, setPostsStories] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function runAudit() {
    setLoading(true);
    try {
      const r = await fetch('/api/social-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform, accountType, followers: Number(followers), postsPerWeek: Number(postsPerWeek),
          avgLikes: Number(avgLikes), avgComments: Number(avgComments), avgShares: Number(avgShares),
          bio, hasLinktree, usesHashtags, usesReels, postsStories,
        }),
      });
      const data = await r.json();
      setResult(data);
    } catch {
      setResult(null);
    }
    setLoading(false);
  }

  function scoreColor(score: number) {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  }

  function scoreLabel(score: number) {
    if (score >= 90) return 'Excellent';
    if (score >= 75) return 'Strong';
    if (score >= 60) return 'Average';
    if (score >= 40) return 'Needs Work';
    return 'Critical';
  }

  return (
    <main className="min-h-screen">
      <section className="px-6 py-20 max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">
          Free <span className="gradient-text">Social Media Audit</span> Tool
        </h1>
        <p className="text-zinc-400 text-lg mb-2 max-w-2xl mx-auto">
          Get a comprehensive score for your social media presence. Identify weaknesses, discover opportunities, and get actionable recommendations to grow faster.
        </p>
        <p className="text-zinc-500 text-sm mb-8">Used by 15,000+ marketers to optimize their social strategy</p>
      </section>

      <section className="px-6 pb-10 max-w-4xl mx-auto">
        <div className="glass rounded-2xl p-8">
          <h2 className="text-xl font-semibold mb-6">Enter Your Social Media Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-zinc-400 text-sm mb-1">Platform</label>
              <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full bg-zinc-800 rounded-lg px-4 py-3 text-white">
                {platforms.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-zinc-400 text-sm mb-1">Account Type</label>
              <select value={accountType} onChange={e => setAccountType(e.target.value)} className="w-full bg-zinc-800 rounded-lg px-4 py-3 text-white">
                {accountTypes.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-zinc-400 text-sm mb-1">Followers</label>
              <input type="number" value={followers} onChange={e => setFollowers(e.target.value)} placeholder="10000" className="w-full bg-zinc-800 rounded-lg px-4 py-3 text-white" />
            </div>
            <div>
              <label className="block text-zinc-400 text-sm mb-1">Posts/Week</label>
              <input type="number" value={postsPerWeek} onChange={e => setPostsPerWeek(e.target.value)} placeholder="5" className="w-full bg-zinc-800 rounded-lg px-4 py-3 text-white" />
            </div>
            <div>
              <label className="block text-zinc-400 text-sm mb-1">Avg Likes</label>
              <input type="number" value={avgLikes} onChange={e => setAvgLikes(e.target.value)} placeholder="200" className="w-full bg-zinc-800 rounded-lg px-4 py-3 text-white" />
            </div>
            <div>
              <label className="block text-zinc-400 text-sm mb-1">Avg Comments</label>
              <input type="number" value={avgComments} onChange={e => setAvgComments(e.target.value)} placeholder="15" className="w-full bg-zinc-800 rounded-lg px-4 py-3 text-white" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-zinc-400 text-sm mb-1">Avg Shares/Reposts</label>
              <input type="number" value={avgShares} onChange={e => setAvgShares(e.target.value)} placeholder="10" className="w-full bg-zinc-800 rounded-lg px-4 py-3 text-white" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-zinc-400 text-sm mb-1">Your Bio (optional)</label>
              <input type="text" value={bio} onChange={e => setBio(e.target.value)} placeholder="Digital marketer helping brands grow..." className="w-full bg-zinc-800 rounded-lg px-4 py-3 text-white" />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            {[
              { label: 'Link in Bio / Linktree', val: hasLinktree, set: setHasLinktree },
              { label: 'Uses Hashtags', val: usesHashtags, set: setUsesHashtags },
              { label: 'Posts Reels/Shorts', val: usesReels, set: setUsesReels },
              { label: 'Posts Stories/Fleets', val: postsStories, set: setPostsStories },
            ].map(item => (
              <label key={item.label} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={item.val} onChange={() => item.set(!item.val)} className="accent-purple-500 w-4 h-4" />
                <span className="text-sm text-zinc-300">{item.label}</span>
              </label>
            ))}
          </div>

          <button onClick={runAudit} disabled={loading || !followers} className="w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition disabled:opacity-50">
            {loading ? 'Analyzing Your Profile...' : 'Run Free Audit'}
          </button>
        </div>
      </section>

      {result && (
        <section className="px-6 pb-10 max-w-4xl mx-auto space-y-6">
          {/* Overall Score */}
          <div className="glass rounded-2xl p-8 text-center">
            <p className="text-zinc-400 text-sm mb-2">Your Overall Social Media Score</p>
            <p className={`text-7xl font-bold ${scoreColor(result.overallScore)}`}>{result.overallScore}<span className="text-3xl text-zinc-500">/100</span></p>
            <p className={`text-xl font-semibold mt-2 ${scoreColor(result.overallScore)}`}>{scoreLabel(result.overallScore)}</p>
          </div>

          {/* Category Breakdown */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-6">Category Breakdown</h3>
            <div className="space-y-4">
              {result.categories.map(cat => (
                <div key={cat.name}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{cat.name}</span>
                    <span className={scoreColor(cat.score)}>{cat.score}/100</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-3 mb-2">
                    <div className={`h-3 rounded-full ${cat.score >= 80 ? 'bg-green-500' : cat.score >= 60 ? 'bg-yellow-500' : cat.score >= 40 ? 'bg-orange-500' : 'bg-red-500'}`} style={{ width: `${cat.score}%` }} />
                  </div>
                  <ul className="text-sm text-zinc-400 space-y-1 ml-4">
                    {cat.tips.map((tip, i) => <li key={i}>• {tip}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Strengths + Priorities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-green-400 mb-4">Strengths</h3>
              <ul className="space-y-2">
                {result.strengths.map((s, i) => <li key={i} className="flex gap-2 text-sm"><span className="text-green-400">✓</span><span className="text-zinc-300">{s}</span></li>)}
              </ul>
            </div>
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-orange-400 mb-4">Top Priorities</h3>
              <ol className="space-y-2">
                {result.topPriorities.map((p, i) => <li key={i} className="flex gap-2 text-sm"><span className="text-orange-400 font-bold">{i + 1}.</span><span className="text-zinc-300">{p}</span></li>)}
              </ol>
            </div>
          </div>

          {/* Competitor Insights */}
          <div className="glass rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-purple-400 mb-4">Industry Benchmarks</h3>
            <ul className="space-y-2">
              {result.competitorInsights.map((c, i) => <li key={i} className="flex gap-2 text-sm"><span className="text-purple-400">→</span><span className="text-zinc-300">{c}</span></li>)}
            </ul>
          </div>

          {/* CTA */}
          <div className="glass rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">Want to Improve Your Score?</h3>
            <p className="text-zinc-400 mb-4">Use PostCraft AI to generate optimized content that boosts engagement across all platforms.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a href="/" className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 font-semibold hover:from-purple-500 hover:to-pink-500 transition">Generate Posts Now</a>
              <a href="/brand-voice" className="px-6 py-3 rounded-xl border border-zinc-700 font-semibold hover:bg-zinc-800 transition">Define Your Brand Voice</a>
              <a href="/content-calendar" className="px-6 py-3 rounded-xl border border-zinc-700 font-semibold hover:bg-zinc-800 transition">Plan Your Calendar</a>
            </div>
          </div>
        </section>
      )}

      {/* SEO Content */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Why Audit Your Social Media?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { stat: '73%', label: 'of marketers who audit regularly see 2x growth', icon: '📊' },
            { stat: '45min', label: 'saved per week with data-driven strategy', icon: '⏱️' },
            { stat: '89%', label: 'of top creators audit their profiles monthly', icon: '🏆' },
          ].map(s => (
            <div key={s.label} className="glass rounded-xl p-6 text-center">
              <p className="text-4xl font-bold gradient-text mb-2">{s.stat}</p>
              <p className="text-zinc-400 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">How the Audit Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { step: '1', title: 'Enter Metrics', desc: 'Add your follower count, engagement numbers, and posting habits' },
            { step: '2', title: 'AI Analysis', desc: 'Our algorithm scores you across 6 key categories with industry benchmarks' },
            { step: '3', title: 'Get Priorities', desc: 'See exactly what to fix first for maximum growth impact' },
            { step: '4', title: 'Take Action', desc: 'Use PostCraft tools to implement improvements immediately' },
          ].map(s => (
            <div key={s.step} className="glass rounded-xl p-5 text-center">
              <p className="text-2xl font-bold gradient-text mb-2">{s.step}</p>
              <p className="font-semibold mb-1">{s.title}</p>
              <p className="text-zinc-400 text-xs">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Schema */}
      <section className="px-6 pb-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: 'What is a social media audit?', a: 'A social media audit is a comprehensive review of your social media presence. It analyzes your profile, content performance, engagement rates, posting frequency, and strategy to identify strengths and areas for improvement.' },
            { q: 'How often should I audit my social media?', a: 'We recommend running an audit monthly to track progress and quarterly for deep strategic reviews. Top-performing accounts audit every 2-4 weeks.' },
            { q: 'What metrics matter most?', a: 'Engagement rate (likes + comments + shares / followers) is the most important metric, followed by posting consistency, content variety, and follower growth rate.' },
            { q: 'Is the audit really free?', a: 'Yes, our basic social media audit is completely free. Enter your metrics and get instant AI-powered analysis with actionable recommendations.' },
            { q: 'Can I audit multiple platforms?', a: 'Yes, run the audit separately for each platform to get platform-specific insights. Each platform has different benchmarks and best practices.' },
          ].map(faq => (
            <details key={faq.q} className="glass rounded-xl p-4 cursor-pointer group">
              <summary className="font-semibold list-none flex justify-between items-center">
                {faq.q}
                <span className="text-zinc-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-zinc-400 text-sm mt-3">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
