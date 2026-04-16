'use client';
import { useState } from 'react';

const categories = ['Social Media Tools', 'AI Writing', 'Email Marketing', 'Project Management', 'CRM', 'Design Tools', 'Analytics', 'E-commerce', 'Video Editing', 'Customer Support'] as const;
const comparisonAngles = ['Feature-by-Feature', 'Pricing Focused', 'Use Case Match', 'Migration Guide', 'Speed/Performance', 'Integration Ecosystem'] as const;
const tones = ['Objective/Balanced', 'Confident (We Win)', 'Educational', 'Data-Driven', 'Story-Driven'] as const;

interface ComparisonResult {
  pageStructure: { section: string; content: string; seoTip: string }[];
  featureMatrix: { feature: string; yourProduct: string; competitor: string; verdict: string }[];
  copyTemplates: { element: string; copy: string }[];
  seoStrategy: string[];
  conversionElements: string[];
  fairnessChecklist: string[];
  distributionPlan: string[];
}

function generateComparison(category: string, angle: string, tone: string, yourProduct: string, competitor: string): ComparisonResult {
  const you = yourProduct || 'YourProduct';
  const them = competitor || 'Competitor';

  return {
    pageStructure: [
      { section: 'Hero Header', content: `${you} vs ${them}: Which ${category} Tool is Right for You in 2026?`, seoTip: `Target "${you} vs ${them}" and "${them} alternative" keywords` },
      { section: 'Quick Verdict', content: `TL;DR: ${you} is best for [use case A], ${them} excels at [use case B]. Here is the full breakdown.`, seoTip: 'Featured snippet bait — keep under 300 characters' },
      { section: 'At-a-Glance Table', content: 'Side-by-side comparison table with key metrics: price, features, ease of use, support, integrations', seoTip: 'Tables get rich snippets in Google — include pricing data' },
      { section: 'Feature Deep Dive', content: 'Detailed comparison of 8-12 features with screenshots and examples', seoTip: 'Use H3 for each feature — targets long-tail "does X have Y" queries' },
      { section: 'Pricing Comparison', content: `${you}: $X/mo vs ${them}: $Y/mo — show feature overlap at each tier`, seoTip: `Target "${them} pricing" — high commercial intent keyword` },
      { section: 'User Reviews', content: `Aggregate ratings from G2, Capterra, Product Hunt for both ${you} and ${them}`, seoTip: 'Review schema markup for rich stars in SERP' },
      { section: 'Migration Guide', content: `How to switch from ${them} to ${you} in 15 minutes — step by step`, seoTip: `Target "switch from ${them}" and "migrate from ${them}" queries` },
      { section: 'FAQ', content: `Is ${you} better than ${them}? Can I import my data? What about support?`, seoTip: 'FAQ schema markup — targets People Also Ask boxes' },
      { section: 'CTA', content: `Try ${you} free — no credit card required. See why teams switch from ${them}.`, seoTip: 'Place CTA after verdict section AND at page bottom' },
    ],
    featureMatrix: [
      { feature: 'Starting Price', yourProduct: 'Free tier available', competitor: `$${Math.floor(Math.random() * 20 + 15)}/mo minimum`, verdict: `${you} wins on accessibility` },
      { feature: 'AI Content Generation', yourProduct: 'Built-in, unlimited on Pro', competitor: 'Add-on, limited credits', verdict: `${you} offers more AI value` },
      { feature: 'Platform Coverage', yourProduct: '7+ platforms (incl. Threads, Bluesky)', competitor: '5-6 platforms', verdict: `${you} covers more platforms` },
      { feature: 'Team Collaboration', yourProduct: 'Available on Team plan', competitor: 'Available on all plans', verdict: `${them} better for teams on budget` },
      { feature: 'Analytics Depth', yourProduct: 'Basic (growing)', competitor: 'Advanced, AI-powered', verdict: `${them} wins on analytics maturity` },
      { feature: 'Ease of Use', yourProduct: 'Instant, no setup required', competitor: 'Setup wizard, 15-min onboarding', verdict: `${you} faster time to value` },
      { feature: 'Customer Support', yourProduct: 'Email + community', competitor: 'Live chat + phone', verdict: `${them} better support channels` },
      { feature: 'API Access', yourProduct: 'On Pro plan', competitor: 'On Enterprise plan only', verdict: `${you} more developer-friendly` },
    ],
    copyTemplates: [
      { element: 'Meta Title', copy: `${you} vs ${them} (2026): Honest Comparison + Which to Choose` },
      { element: 'Meta Description', copy: `Detailed comparison of ${you} and ${them}. Features, pricing, pros & cons, and which ${category.toLowerCase()} tool is best for your needs in 2026.` },
      { element: 'H1', copy: `${you} vs ${them}: The Definitive ${category} Comparison for 2026` },
      { element: 'Intro Paragraph', copy: `Choosing between ${you} and ${them}? Both are solid ${category.toLowerCase()} tools, but they serve different needs. This unbiased comparison breaks down features, pricing, and real user experiences to help you decide.` },
      { element: 'Verdict CTA', copy: `Ready to try ${you}? Start free today and see the difference for yourself.` },
      { element: 'Fairness Statement', copy: `We built ${you}, so we are biased — but we have done our best to be fair. We encourage you to try both tools before deciding.` },
    ],
    seoStrategy: [
      `Primary keyword: "${you} vs ${them}" (exact match in title, H1, URL)`,
      `Secondary: "${them} alternative", "${them} pricing", "switch from ${them}"`,
      `Long-tail: "is ${you} better than ${them}", "${them} vs ${you} for [use case]"`,
      `URL structure: /compare/${them.toLowerCase().replace(/\s/g, '-')} (clean, keyword-rich)`,
      'Internal links: link from pricing page, blog posts, and homepage',
      `Create comparison pages for ALL major competitors (each gets own URL)`,
      'Update quarterly: refresh pricing data, feature changes, review scores',
      'Add FAQ schema, Review schema, and Comparison Table schema markup',
    ],
    conversionElements: [
      'Sticky CTA bar at top of page ("Try [Product] Free")',
      'Comparison table with green checkmarks for your wins',
      'Customer testimonials from users who switched FROM competitor',
      '"Start Free" button after each section (not just at bottom)',
      'Live chat widget specifically for comparison page visitors',
      'Exit intent popup: "Still deciding? Here is a personalized recommendation"',
      'Social proof counter: "X,XXX teams switched from [Competitor] this month"',
    ],
    fairnessChecklist: [
      'Acknowledge areas where competitor genuinely excels',
      'Use accurate, up-to-date competitor pricing (check monthly)',
      'Do not misrepresent competitor features or limitations',
      'Include a "Fairness Statement" disclosing your bias',
      'Link to competitor site (builds trust, good SEO practice)',
      'Use real user reviews, not fabricated testimonials',
      'Show both free-tier comparison AND paid-tier comparison',
    ],
    distributionPlan: [
      `SEO: Target "${them} alternative" and "${you} vs ${them}" keywords`,
      `Paid: Google Ads on competitor brand keywords (controversial but effective)`,
      `Reddit: Post in r/${category.replace(/\s/g, '').toLowerCase()} with genuine comparison`,
      'Product Hunt: Launch as "alternative to [Competitor]" positioning',
      `Email: Send to users who signed up but did not convert ("Comparing us to ${them}?")`,
      'Social: Create comparison infographic for LinkedIn and Twitter',
      `Blog: Write "Why we built ${you} (and how it compares to ${them})" founder story`,
    ],
  };
}

export default function CompetitorComparisonPage() {
  const [category, setCategory] = useState<string>(categories[0]);
  const [angle, setAngle] = useState<string>(comparisonAngles[0]);
  const [tone, setTone] = useState<string>(tones[0]);
  const [yourProduct, setYourProduct] = useState('');
  const [competitor, setCompetitor] = useState('');
  const [result, setResult] = useState<ComparisonResult | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Competitor Comparison Page Generator</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Generate SEO-optimized comparison pages that rank for &quot;vs&quot; and &quot;alternative&quot; keywords. Includes feature matrices, copy templates, and conversion tactics.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent">
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Comparison Angle</label>
              <select value={angle} onChange={e => setAngle(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent">
                {comparisonAngles.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tone</label>
              <select value={tone} onChange={e => setTone(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent">
                {tones.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Your Product</label>
              <input type="text" value={yourProduct} onChange={e => setYourProduct(e.target.value)} placeholder="e.g. PostCraft" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Competitor</label>
              <input type="text" value={competitor} onChange={e => setCompetitor(e.target.value)} placeholder="e.g. Hootsuite, Buffer..." className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent" />
            </div>
          </div>
          <button onClick={() => setResult(generateComparison(category, angle, tone, yourProduct, competitor))} className="w-full py-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold rounded-xl hover:from-rose-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl">Generate Comparison Page</button>
        </div>

        {result && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Structure Blueprint</h2>
              <div className="space-y-4">{result.pageStructure.map((s, i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-2"><span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-lg text-sm font-bold">{s.section}</span></div>
                  <p className="text-gray-800 text-sm">{s.content}</p>
                  <p className="text-rose-600 text-xs mt-2 font-medium">SEO: {s.seoTip}</p>
                </div>
              ))}</div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Feature Comparison Matrix</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-gray-200"><th className="text-left p-3">Feature</th><th className="text-left p-3">{yourProduct || 'You'}</th><th className="text-left p-3">{competitor || 'Them'}</th><th className="text-left p-3">Verdict</th></tr></thead>
                  <tbody>{result.featureMatrix.map((f, i) => <tr key={i} className="border-b border-gray-50"><td className="p-3 font-medium">{f.feature}</td><td className="p-3 text-gray-700">{f.yourProduct}</td><td className="p-3 text-gray-700">{f.competitor}</td><td className="p-3 text-rose-700 font-medium text-xs">{f.verdict}</td></tr>)}</tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Copy Templates</h2>
                <div className="space-y-3">{result.copyTemplates.map((c, i) => <div key={i} className="bg-gray-50 rounded-xl p-4"><span className="text-xs font-semibold text-gray-500 uppercase">{c.element}</span><p className="text-gray-800 text-sm mt-1">{c.copy}</p></div>)}</div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">SEO Strategy</h2>
                <ul className="space-y-2">{result.seoStrategy.map((s, i) => <li key={i} className="text-gray-700 text-sm flex gap-2"><span className="text-rose-500">&#128269;</span>{s}</li>)}</ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Conversion Elements</h2>
                <ul className="space-y-2">{result.conversionElements.map((c, i) => <li key={i} className="text-gray-700 text-sm flex gap-2"><span className="text-green-500">&#128200;</span>{c}</li>)}</ul>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Fairness Checklist</h2>
                <ul className="space-y-2">{result.fairnessChecklist.map((f, i) => <li key={i} className="text-gray-700 text-sm flex gap-2"><span className="text-blue-500">&#9989;</span>{f}</li>)}</ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Distribution Plan</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{result.distributionPlan.map((d, i) => <div key={i} className="bg-rose-50 rounded-xl p-4 text-gray-700 text-sm">{d}</div>)}</div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
