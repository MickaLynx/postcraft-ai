'use client';
import { useState } from 'react';

const platforms = ['Twitter/X', 'LinkedIn', 'Instagram', 'TikTok', 'Facebook', 'YouTube', 'Pinterest', 'Threads'] as const;
const contentTypes = [
  { key: 'organic', label: 'Organic Post' },
  { key: 'ad', label: 'Paid Ad / Sponsored' },
  { key: 'story', label: 'Story / Reel' },
  { key: 'carousel', label: 'Carousel / Thread' },
  { key: 'live', label: 'Live Stream' },
  { key: 'dm', label: 'DM / Outreach' },
] as const;
const checkCategories = [
  { key: 'policy', label: 'Platform Policy', desc: 'Terms of service violations' },
  { key: 'algorithm', label: 'Algorithm Risk', desc: 'Shadowban triggers' },
  { key: 'legal', label: 'Legal / FTC', desc: 'Disclosure requirements' },
  { key: 'accessibility', label: 'Accessibility', desc: 'Alt text, captions, readability' },
  { key: 'brand-safety', label: 'Brand Safety', desc: 'Reputation risk signals' },
  { key: 'engagement', label: 'Engagement Bait', desc: 'Flagged engagement patterns' },
] as const;
const languages = ['English', 'Français', 'Español', 'Deutsch', 'Italiano', 'Português', '日本語', '中文', '한국어', 'العربية', 'हिन्दी', 'Nederlands', 'Polski', 'Svenska', 'Türkçe', 'Русский', 'Bahasa Indonesia', 'Tiếng Việt', 'ไทย', 'Filipino'] as const;

interface ComplianceResult {
  overallScore: number;
  riskLevel: string;
  checks: { category: string; status: string; score: number; details: string; fix: string }[];
  warnings: string[];
  recommendations: string[];
}

export default function ComplianceCheckerPage() {
  const [content, setContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['Twitter/X']);
  const [contentType, setContentType] = useState<string>('organic');
  const [language, setLanguage] = useState<string>('English');
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [result, setResult] = useState<ComplianceResult | null>(null);
  const [loading, setLoading] = useState(false);

  function togglePlatform(p: string) {
    setSelectedPlatforms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  }

  async function analyze() {
    setLoading(true);
    try {
      const r = await fetch('/api/compliance-checker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, platforms: selectedPlatforms, contentType, language, includeHashtags }),
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

  function statusIcon(status: string) {
    if (status === 'pass') return '✅';
    if (status === 'warning') return '⚠️';
    return '❌';
  }

  return (
    <main className="min-h-screen">
      <section className="px-6 py-20 max-w-3xl mx-auto text-center">
        <p className="text-xs text-pink-400 uppercase tracking-widest mb-3 font-semibold">New Tool</p>
        <h1 className="text-5xl font-bold mb-4">
          AI <span className="gradient-text">Compliance Checker</span>
        </h1>
        <p className="text-zinc-400 text-lg mb-4 max-w-xl mx-auto">
          Check your posts against platform policies, algorithm rules, FTC guidelines, and accessibility standards before publishing. Avoid shadowbans and policy strikes.
        </p>
        <p className="text-zinc-500 text-sm mb-12">Free. No signup. 8 platforms, 6 check categories, 20+ languages.</p>

        <div className="glass rounded-2xl p-6 text-left">
          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Your post content</label>
          <textarea value={content} onChange={e => setContent(e.target.value)} rows={5}
            placeholder="Paste your post, ad copy, caption, or outreach message here..."
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-pink-500 transition mb-5 resize-none" />

          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Platforms (select all that apply)</label>
          <div className="flex flex-wrap gap-2 mb-5">
            {platforms.map(p => (
              <button key={p} onClick={() => togglePlatform(p)}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition ${selectedPlatforms.includes(p) ? 'bg-pink-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
                {p}
              </button>
            ))}
          </div>

          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Content Type</label>
          <div className="flex flex-wrap gap-2 mb-5">
            {contentTypes.map(t => (
              <button key={t.key} onClick={() => setContentType(t.key)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition ${contentType === t.key ? 'bg-purple-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
                {t.label}
              </button>
            ))}
          </div>

          <div className="flex gap-4 mb-5">
            <div className="flex-1">
              <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Language</label>
              <select value={language} onChange={e => setLanguage(e.target.value)}
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-pink-500 transition">
                {languages.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 text-sm text-zinc-400 cursor-pointer">
                <input type="checkbox" checked={includeHashtags} onChange={e => setIncludeHashtags(e.target.checked)}
                  className="rounded border-zinc-700" />
                Check hashtags
              </label>
            </div>
          </div>

          <button onClick={analyze} disabled={loading || !content.trim() || selectedPlatforms.length === 0}
            className="w-full py-3.5 btn-primary rounded-xl font-semibold text-white">
            {loading ? 'Analyzing compliance...' : 'Check Compliance'}
          </button>
        </div>
      </section>

      {result && (
        <section className="px-6 pb-16 max-w-3xl mx-auto fade-in">
          <div className="glass rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Compliance Report</h2>
              <div className="text-right">
                <div className={`text-4xl font-bold ${scoreColor(result.overallScore)}`}>{result.overallScore}/100</div>
                <div className={`text-sm ${scoreColor(result.overallScore)}`}>{result.riskLevel}</div>
              </div>
            </div>

            <div className="w-full bg-zinc-800 rounded-full h-3 mb-6">
              <div className={`h-3 rounded-full transition-all ${result.overallScore >= 80 ? 'bg-green-500' : result.overallScore >= 60 ? 'bg-yellow-500' : result.overallScore >= 40 ? 'bg-orange-500' : 'bg-red-500'}`}
                style={{ width: `${result.overallScore}%` }} />
            </div>

            <div className="space-y-3">
              {result.checks.map((check, i) => (
                <div key={i} className="glass rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span>{statusIcon(check.status)}</span>
                      <span className="font-medium text-sm">{check.category}</span>
                    </div>
                    <span className={`text-sm font-semibold ${scoreColor(check.score)}`}>{check.score}/100</span>
                  </div>
                  <p className="text-xs text-zinc-400 mb-1">{check.details}</p>
                  {check.status !== 'pass' && (
                    <p className="text-xs text-pink-400">Fix: {check.fix}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {result.warnings.length > 0 && (
            <div className="glass rounded-2xl p-6 mb-6 border-yellow-500/20">
              <h3 className="font-semibold mb-3 text-yellow-400">Warnings</h3>
              <ul className="space-y-2">
                {result.warnings.map((w, i) => (
                  <li key={i} className="text-sm text-zinc-400 flex items-start gap-2">
                    <span className="text-yellow-400 mt-0.5">⚠️</span>{w}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.recommendations.length > 0 && (
            <div className="glass rounded-2xl p-6">
              <h3 className="font-semibold mb-3 text-green-400">Recommendations</h3>
              <ul className="space-y-2">
                {result.recommendations.map((r, i) => (
                  <li key={i} className="text-sm text-zinc-400 flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">💡</span>{r}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">Why Compliance Checking Matters</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass rounded-xl p-5">
              <h3 className="font-semibold mb-2">Shadowban Prevention</h3>
              <p className="text-sm text-zinc-400">Platform algorithms silently reduce reach for policy-violating content. A single flagged post can tank your entire account&apos;s distribution for weeks.</p>
            </div>
            <div className="glass rounded-xl p-5">
              <h3 className="font-semibold mb-2">FTC Compliance</h3>
              <p className="text-sm text-zinc-400">Sponsored content, affiliate links, and partnerships require proper disclosures. Fines can reach $50,000+ per violation in the US alone.</p>
            </div>
            <div className="glass rounded-xl p-5">
              <h3 className="font-semibold mb-2">Algorithm-Friendly</h3>
              <p className="text-sm text-zinc-400">Each platform has unique rules about hashtag limits, link placement, and engagement patterns. Optimizing for these rules maximizes organic reach.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">The 6 Compliance Categories Explained</h2>
          <div className="space-y-4 text-sm text-zinc-400 leading-relaxed">
            {checkCategories.map(cat => (
              <div key={cat.key} className="glass rounded-xl p-5">
                <h3 className="text-zinc-200 font-semibold mb-1">{cat.label}</h3>
                <p>{cat.key === 'policy' && 'Checks content against each platform\'s Terms of Service and Community Guidelines. Flags restricted words, prohibited claims, and content that could trigger manual review or account suspension.'}
                {cat.key === 'algorithm' && 'Identifies patterns that trigger algorithmic suppression: excessive hashtags, engagement bait phrases ("comment YES"), link-in-bio workarounds, and other shadowban triggers specific to each platform in 2026.'}
                {cat.key === 'legal' && 'Ensures FTC disclosure compliance for sponsored content, proper #ad/#sponsored tags, affiliate link disclosures, health/financial claim disclaimers, and GDPR-compliant data collection language.'}
                {cat.key === 'accessibility' && 'Checks for alt text presence, caption availability, readability score, emoji density, color contrast references, and other accessibility best practices that also boost algorithm ranking.'}
                {cat.key === 'brand-safety' && 'Scans for potentially controversial statements, unintended double meanings, cultural sensitivity issues, and brand reputation risks that could lead to PR incidents.'}
                {cat.key === 'engagement' && 'Detects engagement bait patterns that platforms actively penalize: "like if you agree," follow-for-follow language, fake urgency, and manipulation tactics flagged by 2026 algorithm updates.'}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Platform-Specific Rules (2026)</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="glass rounded-xl p-5">
              <h3 className="text-zinc-200 font-semibold mb-2">Twitter/X</h3>
              <ul className="text-sm text-zinc-400 space-y-1">
                <li>Max 280 chars (or 25K for X Premium)</li>
                <li>External links reduce reach by ~40%</li>
                <li>Max 3-5 hashtags recommended</li>
                <li>Engagement bait actively suppressed</li>
              </ul>
            </div>
            <div className="glass rounded-xl p-5">
              <h3 className="text-zinc-200 font-semibold mb-2">Instagram</h3>
              <ul className="text-sm text-zinc-400 space-y-1">
                <li>Max 30 hashtags (5-15 optimal)</li>
                <li>Reels prioritized over static posts</li>
                <li>Alt text boosts discoverability</li>
                <li>Watermarked content from TikTok penalized</li>
              </ul>
            </div>
            <div className="glass rounded-xl p-5">
              <h3 className="text-zinc-200 font-semibold mb-2">LinkedIn</h3>
              <ul className="text-sm text-zinc-400 space-y-1">
                <li>External links reduce reach significantly</li>
                <li>3-5 hashtags maximum</li>
                <li>Engagement pods detectable and penalized</li>
                <li>Personal stories outperform corporate content</li>
              </ul>
            </div>
            <div className="glass rounded-xl p-5">
              <h3 className="text-zinc-200 font-semibold mb-2">TikTok</h3>
              <ul className="text-sm text-zinc-400 space-y-1">
                <li>First 3 seconds determine distribution</li>
                <li>Trending sounds boost reach 2-5x</li>
                <li>Text overlays improve accessibility score</li>
                <li>Recycled content from other platforms flagged</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'What is a social media compliance checker?', a: 'A compliance checker analyzes your social media content against platform policies, algorithm rules, legal requirements (FTC, GDPR), and accessibility standards before you publish, preventing shadowbans, policy strikes, and legal issues.' },
              { q: 'How do I avoid getting shadowbanned?', a: 'Avoid engagement bait phrases, excessive hashtags, rapid follow/unfollow, posting links in captions (use comments instead), and recycling content across platforms without adaptation. Our tool flags all these patterns.' },
              { q: 'Do I need FTC disclosures for affiliate links?', a: 'Yes. The FTC requires clear and conspicuous disclosure of material connections. Use #ad or #sponsored at the beginning of your post, not buried in hashtags. Our tool checks for proper disclosure placement.' },
              { q: 'How many hashtags should I use per platform?', a: 'Twitter/X: 1-3, LinkedIn: 3-5, Instagram: 5-15 (not 30), TikTok: 3-5 relevant ones, Facebook: 1-2 or none. Our tool checks against current 2026 best practices.' },
              { q: 'Can this tool check content in multiple languages?', a: 'Yes. Our compliance checker supports 20+ languages and adjusts its analysis for region-specific regulations, cultural sensitivity, and platform-specific rules that vary by country.' },
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
            <a href="/social-audit" className="text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg transition">Social Audit</a>
            <a href="/caption-optimizer" className="text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg transition">Caption Optimizer</a>
            <a href="/brand-voice" className="text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg transition">Brand Voice</a>
            <a href="/sentiment-analyzer" className="text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg transition">Sentiment Analyzer</a>
            <a href="/content-localizer" className="text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg transition">Content Localizer</a>
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
