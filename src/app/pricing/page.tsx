'use client';
import { useState } from 'react';

const plans = [
  {
    name: 'Free', monthlyPrice: 0, yearlyPrice: 0,
    features: ['5 posts/day', '3 platforms', 'Basic tones', 'Copy to clipboard'],
    cta: 'Get Started', highlight: false,
  },
  {
    name: 'Pro', monthlyPrice: 19, yearlyPrice: 179,
    features: ['Unlimited posts', 'All 5 platforms', 'All tones + custom', 'Post history', 'Bulk generation', 'Priority AI'],
    cta: 'Start 14-Day Free Trial', highlight: true,
  },
  {
    name: 'Agency', monthlyPrice: 79, yearlyPrice: 749,
    features: ['Everything in Pro', 'Team workspace (5 seats)', 'Brand voice profiles', 'API access', 'CSV/Sheet export', 'Dedicated support'],
    cta: 'Start Free Trial', highlight: false,
  },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <main className="min-h-screen px-6 py-20 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-3">Simple, Transparent Pricing</h1>
      <p className="text-zinc-400 text-center mb-8">Start free. Upgrade when you need more power.</p>

      {/* Billing Toggle */}
      <div className="flex items-center justify-center gap-4 mb-12">
        <span className={`text-sm ${!annual ? 'text-white font-medium' : 'text-zinc-500'}`}>Monthly</span>
        <button onClick={() => setAnnual(!annual)}
          className={`relative w-14 h-7 rounded-full transition ${annual ? 'bg-pink-600' : 'bg-zinc-700'}`}>
          <span className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition-transform ${annual ? 'translate-x-7' : 'translate-x-0.5'}`} />
        </button>
        <span className={`text-sm ${annual ? 'text-white font-medium' : 'text-zinc-500'}`}>
          Annual <span className="text-green-400 text-xs font-medium ml-1">Save up to 21%</span>
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map(plan => {
          const price = annual ? plan.yearlyPrice : plan.monthlyPrice;
          const period = plan.monthlyPrice === 0 ? '/mo' : annual ? '/year' : '/mo';
          const monthlyEquivalent = annual && plan.yearlyPrice > 0 ? Math.round(plan.yearlyPrice / 12) : null;

          return (
            <div key={plan.name}
              className={`glass rounded-2xl p-6 flex flex-col ${plan.highlight ? 'border-pink-500/50 ring-1 ring-pink-500/20' : ''}`}>
              {plan.highlight && <span className="text-xs font-bold text-pink-400 uppercase mb-2">Most Popular</span>}
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <div className="mt-4 mb-1">
                <span className="text-4xl font-bold">${price}</span>
                <span className="text-zinc-500 text-sm">{period}</span>
              </div>
              {monthlyEquivalent && (
                <p className="text-xs text-green-400 mb-5">${monthlyEquivalent}/mo billed annually — save ${plan.monthlyPrice * 12 - plan.yearlyPrice}/year</p>
              )}
              {!monthlyEquivalent && <div className="mb-5" />}
              <ul className="space-y-2.5 flex-1">
                {plan.features.map(f => (
                  <li key={f} className="text-sm text-zinc-300 flex items-start gap-2">
                    <span className="text-pink-400 mt-0.5">&#10003;</span>{f}
                  </li>
                ))}
              </ul>
              <button className={`mt-6 w-full py-3 rounded-xl font-medium text-sm transition ${plan.highlight ? 'btn-primary text-white' : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'}`}>
                {plan.cta}
              </button>
              {plan.highlight && <p className="text-xs text-zinc-500 text-center mt-2">No credit card required</p>}
            </div>
          );
        })}
      </div>

      {/* Guarantee */}
      <div className="mt-12 text-center">
        <p className="text-sm text-zinc-400">14-day free trial on all paid plans. Cancel anytime. No questions asked.</p>
      </div>

      {/* FAQ with Schema */}
      <div className="mt-16 text-center">
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="max-w-2xl mx-auto text-left space-y-4">
          {[
            ['How does the free plan work?', 'Generate up to 5 posts per day on 3 platforms. No credit card required. No signup needed.'],
            ['Can I cancel anytime?', 'Yes, cancel anytime from your dashboard. No lock-in, no questions asked. You keep access until the end of your billing period.'],
            ['Is there a free trial?', 'Yes! All paid plans include a 14-day free trial. No credit card required to start.'],
            ['What happens after the trial?', 'You\'ll be asked to subscribe to continue using Pro/Agency features. Your generated content history is preserved.'],
            ['Do you offer annual billing?', 'Yes! Save up to 21% with annual billing. Pro is $179/year ($14.92/mo) and Agency is $749/year ($62.42/mo).'],
            ['What AI model do you use?', 'We use state-of-the-art LLMs fine-tuned for social media copywriting with platform-specific optimization.'],
            ['Can I switch plans?', 'Upgrade or downgrade anytime. When upgrading, you get immediate access. When downgrading, changes take effect at your next billing cycle.'],
          ].map(([q, a]) => (
            <details key={q} className="glass rounded-xl p-4 cursor-pointer">
              <summary className="text-sm font-medium">{q}</summary>
              <p className="text-sm text-zinc-400 mt-2">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </main>
  );
}
