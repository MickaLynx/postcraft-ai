'use client';
import { useState } from 'react';

const businessTypes = ['SaaS/Software', 'Agency/Services', 'E-commerce', 'Creator/Course', 'Marketplace', 'Mobile App', 'Newsletter/Media', 'Consulting'] as const;
const pricingModels = ['Freemium + Pro', 'Free Trial + Paid', 'Three Tiers (Good/Better/Best)', 'Usage-Based (Credits)', 'Per-Seat (Team Pricing)', 'Annual Only (Premium)', 'Lifetime Deal + Subscription', 'Hybrid (PLG + Sales)'] as const;
const goals = ['Maximize Free-to-Paid Conversion', 'Increase Annual Plan Uptake', 'Drive Team/Enterprise Expansion', 'Reduce Churn', 'Launch Product-Led Growth', 'Test Price Sensitivity'] as const;
const verticals = ['Marketing', 'Developer Tools', 'Design', 'Finance', 'Health/Fitness', 'Education', 'Real Estate', 'Food/Restaurant', 'Legal', 'HR/Recruiting'] as const;

interface PricingResult {
  tiers: { name: string; price: string; billing: string; badge: string; features: string[]; cta: string; highlighted: boolean }[];
  annualDiscount: string;
  psychologyTips: string[];
  conversionTactics: string[];
  faqSuggestions: { q: string; a: string }[];
  socialProof: string[];
  urgencyTactics: string[];
  metrics: { metric: string; benchmark: string }[];
  copyTemplates: { section: string; copy: string }[];
  abTestIdeas: string[];
}

function generatePricing(business: string, model: string, goal: string, vertical: string, productName: string): PricingResult {
  const name = productName || 'YourProduct';

  const tiersByModel: Record<string, { name: string; price: string; billing: string; badge: string; features: string[]; cta: string; highlighted: boolean }[]> = {
    'Freemium + Pro': [
      { name: 'Free', price: '$0', billing: 'forever', badge: '', features: [`5 ${vertical.toLowerCase()} projects/month`, 'Basic templates', 'Community support', `${name} watermark on exports`, '1 user'], cta: 'Get Started Free', highlighted: false },
      { name: 'Pro', price: '$19', billing: '/month', badge: 'MOST POPULAR', features: [`Unlimited ${vertical.toLowerCase()} projects`, 'All premium templates', 'Priority support', 'No watermark', 'Custom branding', 'Analytics dashboard', 'API access'], cta: 'Start Pro Trial', highlighted: true },
      { name: 'Team', price: '$49', billing: '/month', badge: '', features: ['Everything in Pro', 'Up to 10 team members', 'Shared workspace', 'Role-based permissions', 'Team analytics', 'SSO integration', 'Dedicated account manager'], cta: 'Contact Sales', highlighted: false },
    ],
    'Three Tiers (Good/Better/Best)': [
      { name: 'Starter', price: '$9', billing: '/month', badge: '', features: ['Core features', `10 ${vertical.toLowerCase()} items`, 'Email support', 'Basic analytics'], cta: 'Start Free Trial', highlighted: false },
      { name: 'Growth', price: '$29', billing: '/month', badge: 'BEST VALUE', features: ['Everything in Starter', `100 ${vertical.toLowerCase()} items`, 'Priority support', 'Advanced analytics', 'Integrations', 'Custom domain'], cta: 'Start Free Trial', highlighted: true },
      { name: 'Scale', price: '$79', billing: '/month', badge: '', features: ['Everything in Growth', 'Unlimited items', 'Phone support', 'White-label', 'API access', 'Custom integrations', 'SLA guarantee'], cta: 'Start Free Trial', highlighted: false },
    ],
    'Usage-Based (Credits)': [
      { name: 'Pay As You Go', price: '$0.10', billing: '/credit', badge: '', features: ['No monthly commitment', 'Buy credits in bulk for discounts', '100 credits = $8 (20% off)', `1 credit = 1 ${vertical.toLowerCase()} action`, 'Basic support'], cta: 'Buy Credits', highlighted: false },
      { name: 'Pro Bundle', price: '$29', billing: '/month', badge: 'MOST POPULAR', features: ['500 credits/month included', 'Overage at $0.05/credit', 'Priority support', 'Analytics dashboard', 'API access', 'Unused credits roll over (1 month)'], cta: 'Start Pro', highlighted: true },
      { name: 'Enterprise', price: 'Custom', billing: 'annual', badge: '', features: ['Custom credit volume', 'Lowest per-credit rate', 'Dedicated support', 'Custom integrations', 'SLA + uptime guarantee', 'Invoice billing'], cta: 'Talk to Sales', highlighted: false },
    ],
  };

  const defaultTiers = tiersByModel[model] || tiersByModel['Freemium + Pro'];

  return {
    tiers: defaultTiers,
    annualDiscount: goal.includes('Annual') ? '40% off annual plans (2 months free)' : '35% off annual plans — show monthly price crossed out',
    psychologyTips: [
      'Price anchor: Show the most expensive tier first (or in the middle with "BEST VALUE" badge)',
      'Decoy effect: Middle tier should be clearly the best value vs. cheapest and most expensive',
      'Charm pricing: $19 converts 24% better than $20 for consumer products',
      'Round pricing: $50 converts better than $49 for B2B/premium (signals quality)',
      `For ${business}: use ${business.includes('SaaS') || business.includes('Agency') ? 'round pricing ($29, $49, $99)' : 'charm pricing ($19, $29, $79)'}`,
      'Show monthly price even for annual billing: "$19/mo billed annually" > "$228/year"',
      'Feature comparison table below tiers — helps justify upgrade decisions',
    ],
    conversionTactics: [
      'Add "No credit card required" under free/trial CTA (increases signups 25%+)',
      'Show logos of known customers near pricing (social proof at decision point)',
      'Include a money-back guarantee badge (30-day, no questions asked)',
      'Add live chat/support widget on pricing page (catches hesitant buyers)',
      'Show "X people signed up today" counter (real or near-real)',
      'Toggle between monthly/annual with visual savings ("Save $78/year")',
      'Add comparison with competitors: "${name} vs. [Competitor] pricing"',
    ],
    faqSuggestions: [
      { q: 'Can I switch plans anytime?', a: 'Yes! Upgrade or downgrade at any time. Changes take effect immediately, and we prorate your billing.' },
      { q: 'Is there a free trial?', a: `Yes, all paid plans include a ${model.includes('Trial') ? '14' : '7'}-day free trial with full features. No credit card required.` },
      { q: 'What happens when I hit my limits?', a: `We'll notify you at 80% usage. You can upgrade anytime, or we'll gracefully limit new ${vertical.toLowerCase()} items until the next billing cycle.` },
      { q: 'Do you offer discounts for nonprofits/startups?', a: 'Yes! Contact us for 50% off any plan for registered nonprofits and early-stage startups.' },
      { q: 'Can I cancel anytime?', a: 'Absolutely. No contracts, no cancellation fees. Your data is exportable at any time.' },
      { q: 'Do you offer refunds?', a: 'Yes, we offer a full refund within the first 30 days, no questions asked.' },
    ],
    socialProof: [
      `"${name} saved us 10+ hours/week on ${vertical.toLowerCase()} tasks" — [Customer Name], [Company]`,
      `Join 5,000+ ${vertical.toLowerCase()} professionals using ${name}`,
      `Rated 4.8/5 on G2 and Product Hunt`,
      `"Best ${vertical.toLowerCase()} tool we've used in 2026" — [Industry Publication]`,
    ],
    urgencyTactics: [
      `Early bird: "First 100 users get ${model.includes('Lifetime') ? 'lifetime access' : '50% off'} — ${Math.floor(Math.random() * 30 + 20)} spots left"`,
      'Limited-time annual offer: "Lock in 2026 pricing before our Q3 increase"',
      'Countdown timer on pricing page (72h offer for new visitors)',
      '"This price is grandfathered — existing users keep it even when we raise prices"',
    ],
    metrics: [
      { metric: 'Free → Paid conversion', benchmark: model.includes('Freemium') ? '5-12%' : '15-25% (trial)' },
      { metric: 'Monthly → Annual upgrade', benchmark: '25-40%' },
      { metric: 'Pricing page → Signup', benchmark: '8-15%' },
      { metric: 'Time to first "wow moment"', benchmark: '< 5 minutes' },
      { metric: 'Trial → Paid (if applicable)', benchmark: '15-25%' },
      { metric: 'Churn rate (monthly)', benchmark: '< 5% for SMB, < 2% for enterprise' },
    ],
    copyTemplates: [
      { section: 'Headline', copy: `Simple, transparent pricing for every ${vertical.toLowerCase()} team` },
      { section: 'Subheadline', copy: `Start free. Upgrade when ${name} becomes essential to your workflow.` },
      { section: 'Annual Toggle', copy: 'Save 35% with annual billing' },
      { section: 'Enterprise CTA', copy: `Need custom ${vertical.toLowerCase()} solutions? Let\u2019s talk.` },
      { section: 'FAQ Intro', copy: "Questions? We\u2019ve got answers." },
      { section: 'Guarantee', copy: '30-day money-back guarantee. No risk, no questions.' },
    ],
    abTestIdeas: [
      'Test 3 tiers vs 2 tiers (remove cheapest — forces decision between free and mid)',
      'Test monthly-first vs annual-first toggle default',
      'Test CTA copy: "Start Free" vs "Get Started" vs "Try [Feature]"',
      `Test price points: $${model.includes('Usage') ? '0.08 vs $0.10 vs $0.12' : '19 vs $24 vs $29'}/mo`,
      'Test social proof placement: above vs below pricing cards',
      'Test with/without feature comparison table',
      'Test urgency: countdown timer vs "X spots left" vs no urgency',
    ],
  };
}

export default function PricingPageGenPage() {
  const [business, setBusiness] = useState<string>(businessTypes[0]);
  const [model, setModel] = useState<string>(pricingModels[0]);
  const [goal, setGoal] = useState<string>(goals[0]);
  const [vertical, setVertical] = useState<string>(verticals[0]);
  const [productName, setProductName] = useState('');
  const [result, setResult] = useState<PricingResult | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Pricing Page Generator</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Generate conversion-optimized pricing tiers with psychology-backed copy, FAQ templates, social proof, and A/B test ideas for your SaaS, app, or service.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Business Type</label>
              <select value={business} onChange={e => setBusiness(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                {businessTypes.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Pricing Model</label>
              <select value={model} onChange={e => setModel(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                {pricingModels.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Primary Goal</label>
              <select value={goal} onChange={e => setGoal(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                {goals.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Industry/Vertical</label>
              <select value={vertical} onChange={e => setVertical(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                {verticals.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
              <input type="text" value={productName} onChange={e => setProductName(e.target.value)} placeholder="e.g. PostCraft, FitPro..." className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
            </div>
          </div>
          <button onClick={() => setResult(generatePricing(business, model, goal, vertical, productName))} className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl">Generate Pricing Strategy</button>
        </div>

        {result && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Pricing Tiers</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {result.tiers.map((tier, i) => (
                  <div key={i} className={`rounded-2xl p-6 border-2 ${tier.highlighted ? 'border-emerald-500 shadow-xl scale-105' : 'border-gray-200'} relative`}>
                    {tier.badge && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-4 py-1 rounded-full">{tier.badge}</span>}
                    <h3 className="text-xl font-bold text-gray-900 mt-2">{tier.name}</h3>
                    <div className="mt-2"><span className="text-3xl font-bold text-gray-900">{tier.price}</span><span className="text-gray-500">{tier.billing}</span></div>
                    <ul className="mt-4 space-y-2">{tier.features.map((f, j) => <li key={j} className="text-gray-700 text-sm flex gap-2"><span className="text-emerald-500">&#10003;</span>{f}</li>)}</ul>
                    <button className={`w-full mt-6 py-3 rounded-xl font-bold ${tier.highlighted ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-800'}`}>{tier.cta}</button>
                  </div>
                ))}
              </div>
              <p className="text-center text-emerald-600 font-medium mt-4">{result.annualDiscount}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Pricing Psychology Tips</h2>
                <ul className="space-y-2">{result.psychologyTips.map((t, i) => <li key={i} className="text-gray-700 text-sm flex gap-2"><span className="text-emerald-500">&#129504;</span>{t}</li>)}</ul>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Conversion Tactics</h2>
                <ul className="space-y-2">{result.conversionTactics.map((t, i) => <li key={i} className="text-gray-700 text-sm flex gap-2"><span className="text-teal-500">&#9889;</span>{t}</li>)}</ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Copy Templates</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{result.copyTemplates.map((c, i) => <div key={i} className="bg-gray-50 rounded-xl p-4"><span className="text-xs font-semibold text-gray-500 uppercase">{c.section}</span><p className="text-gray-800 mt-1 font-medium">{c.copy}</p></div>)}</div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">FAQ Suggestions</h2>
              <div className="space-y-4">{result.faqSuggestions.map((faq, i) => <div key={i} className="border border-gray-100 rounded-xl p-4"><p className="font-semibold text-gray-900 text-sm">{faq.q}</p><p className="text-gray-600 text-sm mt-1">{faq.a}</p></div>)}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Social Proof Templates</h2>
                <div className="space-y-3">{result.socialProof.map((s, i) => <div key={i} className="bg-emerald-50 rounded-xl p-4 text-emerald-800 text-sm italic">{s}</div>)}</div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Urgency Tactics</h2>
                <ul className="space-y-2">{result.urgencyTactics.map((t, i) => <li key={i} className="text-gray-700 text-sm flex gap-2"><span className="text-red-500">&#9200;</span>{t}</li>)}</ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Key Metrics & Benchmarks</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-gray-200"><th className="text-left p-3 font-semibold text-gray-700">Metric</th><th className="text-left p-3 font-semibold text-gray-700">Benchmark</th></tr></thead>
                  <tbody>{result.metrics.map((m, i) => <tr key={i} className="border-b border-gray-50"><td className="p-3 text-gray-800">{m.metric}</td><td className="p-3 text-emerald-700 font-medium">{m.benchmark}</td></tr>)}</tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">A/B Test Ideas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{result.abTestIdeas.map((t, i) => <div key={i} className="bg-gray-50 rounded-xl p-4 text-gray-700 text-sm flex gap-2"><span className="text-purple-500">&#128300;</span>{t}</div>)}</div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
