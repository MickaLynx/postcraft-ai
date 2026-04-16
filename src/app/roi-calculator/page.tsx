'use client';
import { useState } from 'react';

const platforms = ['Twitter/X', 'LinkedIn', 'Instagram', 'TikTok', 'Facebook', 'YouTube'] as const;
const campaignTypes = ['Organic', 'Paid Ads', 'Hybrid'] as const;

interface ROIResult {
  roiPercentage: number;
  totalInvestment: number;
  netProfit: number;
  costPerLead: number;
  costPerFollower: number;
  costPerClick: number;
  revenuePerFollower: number;
  rating: string;
  tips: string[];
  projections: { metric: string; current: string; optimized: string }[];
}

const platformBenchmarks: Record<string, { avgROI: number; avgCPC: number; avgCPL: number; conversionRate: number }> = {
  'Twitter/X': { avgROI: 180, avgCPC: 0.58, avgCPL: 8.50, conversionRate: 2.1 },
  LinkedIn: { avgROI: 280, avgCPC: 3.20, avgCPL: 45.00, conversionRate: 3.5 },
  Instagram: { avgROI: 320, avgCPC: 0.72, avgCPL: 12.00, conversionRate: 3.1 },
  TikTok: { avgROI: 250, avgCPC: 0.35, avgCPL: 6.80, conversionRate: 2.8 },
  Facebook: { avgROI: 200, avgCPC: 0.95, avgCPL: 15.50, conversionRate: 2.4 },
  YouTube: { avgROI: 350, avgCPC: 1.10, avgCPL: 22.00, conversionRate: 4.2 },
};

export default function ROICalculatorPage() {
  const [platform, setPlatform] = useState<string>('Instagram');
  const [campaignType, setCampaignType] = useState<string>('Hybrid');
  const [adSpend, setAdSpend] = useState('');
  const [contentHours, setContentHours] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [conversions, setConversions] = useState('');
  const [customerValue, setCustomerValue] = useState('');
  const [socialRevenue, setSocialRevenue] = useState('');
  const [newFollowers, setNewFollowers] = useState('');
  const [websiteClicks, setWebsiteClicks] = useState('');
  const [result, setResult] = useState<ROIResult | null>(null);

  function calculate() {
    const spend = Number(adSpend) || 0;
    const hours = Number(contentHours) || 0;
    const rate = Number(hourlyRate) || 0;
    const conv = Number(conversions) || 0;
    const custVal = Number(customerValue) || 0;
    const revenue = Number(socialRevenue) || 0;
    const followers = Number(newFollowers) || 0;
    const clicks = Number(websiteClicks) || 0;

    const contentCost = hours * rate;
    const totalInvestment = spend + contentCost;
    const netProfit = revenue - totalInvestment;
    const roiPercentage = totalInvestment > 0 ? (netProfit / totalInvestment) * 100 : 0;
    const costPerLead = conv > 0 ? totalInvestment / conv : 0;
    const costPerFollower = followers > 0 ? totalInvestment / followers : 0;
    const costPerClick = clicks > 0 ? totalInvestment / clicks : 0;
    const revenuePerFollower = followers > 0 ? revenue / followers : 0;

    let rating = 'Negative ROI';
    if (roiPercentage >= 500) rating = 'Exceptional';
    else if (roiPercentage >= 200) rating = 'Excellent';
    else if (roiPercentage >= 100) rating = 'Good';
    else if (roiPercentage >= 0) rating = 'Break Even';

    const bench = platformBenchmarks[platform] || platformBenchmarks['Instagram'];

    const tips: string[] = [];
    if (roiPercentage < 0) tips.push('Your social media spend is not profitable yet. Focus on reducing costs or improving conversion rates before scaling.');
    if (costPerLead > bench.avgCPL * 1.5) tips.push(`Your cost per lead ($${costPerLead.toFixed(2)}) is above the ${platform} average ($${bench.avgCPL}). Test different ad creatives and audience segments.`);
    if (costPerLead > 0 && costPerLead <= bench.avgCPL * 0.8) tips.push(`Great CPL! You're ${Math.round((1 - costPerLead / bench.avgCPL) * 100)}% below the ${platform} average. Consider scaling your budget.`);
    if (costPerClick > bench.avgCPC * 1.5) tips.push(`Your CPC ($${costPerClick.toFixed(2)}) is high. Improve your ad copy, targeting, and landing page relevance.`);
    if (campaignType === 'Paid Ads' && contentHours === '0') tips.push('Purely paid strategies miss organic compound growth. Dedicate even 5 hours/month to organic content for long-term gains.');
    if (campaignType === 'Organic' && roiPercentage > 100) tips.push('Strong organic ROI! Adding a small paid budget ($200-500/mo) could amplify your best-performing organic content.');
    if (revenuePerFollower < 0.1 && followers > 0) tips.push('Low revenue per follower suggests audience-offer mismatch. Survey your followers to understand their needs better.');
    if (revenuePerFollower >= 1) tips.push(`$${revenuePerFollower.toFixed(2)} per follower is excellent. Focus on growing your follower base — each new follower is worth real revenue.`);
    if (conv > 0 && custVal > 0 && revenue < conv * custVal * 0.5) tips.push('You may be undervaluing social attribution. Implement multi-touch attribution to capture the full revenue impact.');
    if (spend > 0 && spend > contentCost * 3) tips.push('Your ad spend heavily outweighs content investment. Reallocate 20% of ad budget to high-quality content creation for better long-term ROI.');
    if (clicks > 0 && conv > 0 && conv / clicks < 0.02) tips.push(`Your click-to-conversion rate (${((conv / clicks) * 100).toFixed(1)}%) is low. Optimize your landing pages for mobile and reduce form friction.`);
    if (tips.length === 0) tips.push('Your social media ROI is solid. Keep testing new formats and audiences to maintain growth momentum.');

    const projections = [
      { metric: 'Monthly Revenue', current: `$${revenue.toLocaleString()}`, optimized: `$${Math.round(revenue * 3).toLocaleString()}` },
      { metric: 'ROI', current: `${roiPercentage.toFixed(0)}%`, optimized: `${Math.min(roiPercentage * 2.5, 800).toFixed(0)}%` },
      { metric: 'Cost Per Lead', current: costPerLead > 0 ? `$${costPerLead.toFixed(2)}` : 'N/A', optimized: costPerLead > 0 ? `$${(costPerLead * 0.4).toFixed(2)}` : 'N/A' },
      { metric: 'Conversions', current: conv.toLocaleString(), optimized: Math.round(conv * 3).toLocaleString() },
    ];

    setResult({ roiPercentage, totalInvestment, netProfit, costPerLead, costPerFollower, costPerClick, revenuePerFollower, rating, tips, projections });
  }

  function roiColor(roi: number) {
    if (roi >= 200) return 'text-green-400';
    if (roi >= 100) return 'text-blue-400';
    if (roi >= 0) return 'text-yellow-400';
    return 'text-red-400';
  }

  const canCalculate = socialRevenue || adSpend || contentHours;

  return (
    <main className="min-h-screen">
      <section className="px-6 py-20 max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">
          Free <span className="gradient-text">Social Media ROI Calculator</span>
        </h1>
        <p className="text-zinc-400 text-lg mb-2 max-w-2xl mx-auto">
          Calculate the true return on investment of your social media efforts. Track ad spend, organic growth, and revenue attribution across all platforms.
        </p>
        <p className="text-zinc-500 text-sm mb-8">Used by 15,000+ marketers and agencies</p>
      </section>

      <section className="px-6 pb-10 max-w-4xl mx-auto">
        <div className="glass rounded-2xl p-8">
          <h2 className="text-xl font-semibold mb-6">Enter Your Campaign Data</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-zinc-400 text-sm mb-1">Platform</label>
              <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full bg-zinc-800 rounded-lg px-4 py-3 text-white">
                {platforms.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-zinc-400 text-sm mb-1">Campaign Type</label>
              <select value={campaignType} onChange={e => setCampaignType(e.target.value)} className="w-full bg-zinc-800 rounded-lg px-4 py-3 text-white">
                {campaignTypes.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-zinc-400 text-sm mb-1">Monthly Ad Spend ($)</label>
              <input type="number" value={adSpend} onChange={e => setAdSpend(e.target.value)} placeholder="500" className="w-full bg-zinc-800 rounded-lg px-4 py-3 text-white" />
            </div>
            <div>
              <label className="block text-zinc-400 text-sm mb-1">Content Creation Hours</label>
              <input type="number" value={contentHours} onChange={e => setContentHours(e.target.value)} placeholder="20" className="w-full bg-zinc-800 rounded-lg px-4 py-3 text-white" />
            </div>
            <div>
              <label className="block text-zinc-400 text-sm mb-1">Hourly Rate ($)</label>
              <input type="number" value={hourlyRate} onChange={e => setHourlyRate(e.target.value)} placeholder="50" className="w-full bg-zinc-800 rounded-lg px-4 py-3 text-white" />
            </div>
            <div>
              <label className="block text-zinc-400 text-sm mb-1">Conversions/Leads</label>
              <input type="number" value={conversions} onChange={e => setConversions(e.target.value)} placeholder="25" className="w-full bg-zinc-800 rounded-lg px-4 py-3 text-white" />
            </div>
            <div>
              <label className="block text-zinc-400 text-sm mb-1">Avg Customer Value ($)</label>
              <input type="number" value={customerValue} onChange={e => setCustomerValue(e.target.value)} placeholder="200" className="w-full bg-zinc-800 rounded-lg px-4 py-3 text-white" />
            </div>
            <div>
              <label className="block text-zinc-400 text-sm mb-1">Revenue from Social ($)</label>
              <input type="number" value={socialRevenue} onChange={e => setSocialRevenue(e.target.value)} placeholder="5000" className="w-full bg-zinc-800 rounded-lg px-4 py-3 text-white" />
            </div>
            <div>
              <label className="block text-zinc-400 text-sm mb-1">New Followers Gained</label>
              <input type="number" value={newFollowers} onChange={e => setNewFollowers(e.target.value)} placeholder="500" className="w-full bg-zinc-800 rounded-lg px-4 py-3 text-white" />
            </div>
            <div>
              <label className="block text-zinc-400 text-sm mb-1">Website Clicks from Social</label>
              <input type="number" value={websiteClicks} onChange={e => setWebsiteClicks(e.target.value)} placeholder="1200" className="w-full bg-zinc-800 rounded-lg px-4 py-3 text-white" />
            </div>
          </div>

          <button onClick={calculate} disabled={!canCalculate} className="w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition disabled:opacity-50">
            Calculate ROI
          </button>
        </div>
      </section>

      {result && (
        <section className="px-6 pb-10 max-w-4xl mx-auto space-y-6">
          {/* ROI Score */}
          <div className="glass rounded-2xl p-8 text-center">
            <p className="text-zinc-400 text-sm mb-2">Your Social Media ROI on {platform}</p>
            <p className={`text-7xl font-bold ${roiColor(result.roiPercentage)}`}>
              {result.roiPercentage > 0 ? '+' : ''}{result.roiPercentage.toFixed(0)}<span className="text-3xl">%</span>
            </p>
            <p className={`text-xl font-semibold mt-2 ${roiColor(result.roiPercentage)}`}>{result.rating}</p>
            <p className="text-zinc-500 text-sm mt-2">Formula: ((Revenue - Investment) / Investment) x 100</p>
          </div>

          {/* Key Metrics Grid */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-4">Key Metrics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-zinc-800/50 rounded-xl p-4 text-center">
                <p className="text-zinc-400 text-xs mb-1">Total Investment</p>
                <p className="text-xl font-bold text-white">${result.totalInvestment.toLocaleString()}</p>
              </div>
              <div className="bg-zinc-800/50 rounded-xl p-4 text-center">
                <p className="text-zinc-400 text-xs mb-1">Revenue from Social</p>
                <p className="text-xl font-bold text-white">${Number(socialRevenue || 0).toLocaleString()}</p>
              </div>
              <div className="bg-zinc-800/50 rounded-xl p-4 text-center">
                <p className="text-zinc-400 text-xs mb-1">Net Profit</p>
                <p className={`text-xl font-bold ${result.netProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {result.netProfit >= 0 ? '+' : ''}${result.netProfit.toLocaleString()}
                </p>
              </div>
              <div className="bg-zinc-800/50 rounded-xl p-4 text-center">
                <p className="text-zinc-400 text-xs mb-1">ROI Percentage</p>
                <p className={`text-xl font-bold ${roiColor(result.roiPercentage)}`}>
                  {result.roiPercentage > 0 ? '+' : ''}{result.roiPercentage.toFixed(1)}%
                </p>
              </div>
              <div className="bg-zinc-800/50 rounded-xl p-4 text-center">
                <p className="text-zinc-400 text-xs mb-1">Cost Per Lead</p>
                <p className="text-xl font-bold text-white">{result.costPerLead > 0 ? `$${result.costPerLead.toFixed(2)}` : 'N/A'}</p>
              </div>
              <div className="bg-zinc-800/50 rounded-xl p-4 text-center">
                <p className="text-zinc-400 text-xs mb-1">Cost Per Follower</p>
                <p className="text-xl font-bold text-white">{result.costPerFollower > 0 ? `$${result.costPerFollower.toFixed(2)}` : 'N/A'}</p>
              </div>
              <div className="bg-zinc-800/50 rounded-xl p-4 text-center">
                <p className="text-zinc-400 text-xs mb-1">Cost Per Click</p>
                <p className="text-xl font-bold text-white">{result.costPerClick > 0 ? `$${result.costPerClick.toFixed(2)}` : 'N/A'}</p>
              </div>
              <div className="bg-zinc-800/50 rounded-xl p-4 text-center">
                <p className="text-zinc-400 text-xs mb-1">Revenue Per Follower</p>
                <p className="text-xl font-bold text-white">{result.revenuePerFollower > 0 ? `$${result.revenuePerFollower.toFixed(2)}` : 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Platform Benchmarks */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-4">Platform Benchmarks (2026)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-zinc-400 border-b border-zinc-800">
                    <th className="text-left py-2">Platform</th>
                    <th className="text-center py-2">Avg ROI</th>
                    <th className="text-center py-2">Avg CPC</th>
                    <th className="text-center py-2">Avg CPL</th>
                    <th className="text-center py-2">Conv. Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(platformBenchmarks).map(([p, b]) => (
                    <tr key={p} className={`border-b border-zinc-800/50 ${p === platform ? 'bg-zinc-800/30' : ''}`}>
                      <td className="py-2 font-medium">{p}</td>
                      <td className="text-center text-green-400">{b.avgROI}%</td>
                      <td className="text-center text-blue-400">${b.avgCPC.toFixed(2)}</td>
                      <td className="text-center text-yellow-400">${b.avgCPL.toFixed(2)}</td>
                      <td className="text-center text-purple-400">{b.conversionRate}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Monthly Projections */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-4">Monthly Projections</h3>
            <p className="text-zinc-400 text-sm mb-4">Current performance vs. optimized strategy (3x improvement target):</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {result.projections.map(p => (
                <div key={p.metric} className="bg-zinc-800/50 rounded-xl p-4 text-center">
                  <p className="text-zinc-400 text-xs mb-2">{p.metric}</p>
                  <p className="text-zinc-500 text-sm line-through">{p.current}</p>
                  <p className="text-green-400 text-lg font-bold">{p.optimized}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-4">Actionable Recommendations</h3>
            <ul className="space-y-3">
              {result.tips.map((tip, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="text-purple-400 font-bold mt-0.5">&#8594;</span>
                  <span className="text-zinc-300">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="glass rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">Maximize Your Social Media ROI</h3>
            <p className="text-zinc-400 mb-4">Use PostCraft AI tools to create high-converting content and grow your revenue.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a href="/engagement-calculator" className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 font-semibold hover:from-purple-500 hover:to-pink-500 transition">Check Engagement Rate</a>
              <a href="/social-audit" className="px-6 py-3 rounded-xl border border-zinc-700 font-semibold hover:bg-zinc-800 transition">Full Profile Audit</a>
              <a href="/hooks" className="px-6 py-3 rounded-xl border border-zinc-700 font-semibold hover:bg-zinc-800 transition">Write Better Hooks</a>
            </div>
          </div>
        </section>
      )}

      {/* How to Calculate Social Media ROI */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">How to Calculate Social Media ROI</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass rounded-xl p-6">
            <div className="text-3xl font-bold text-purple-400 mb-3">1</div>
            <h3 className="text-lg font-semibold mb-3">Calculate Total Investment</h3>
            <p className="text-zinc-400 text-sm">Add up all costs: ad spend, content creation time (hours x hourly rate), tools/software, and any agency fees. Most marketers undercount by 30-40% because they forget to include their own time.</p>
          </div>
          <div className="glass rounded-xl p-6">
            <div className="text-3xl font-bold text-purple-400 mb-3">2</div>
            <h3 className="text-lg font-semibold mb-3">Track Revenue Attribution</h3>
            <p className="text-zinc-400 text-sm">Use UTM parameters, conversion pixels, and CRM tracking to attribute revenue to social media. Include direct sales, lead value (leads x conversion rate x customer value), and brand awareness impact.</p>
          </div>
          <div className="glass rounded-xl p-6">
            <div className="text-3xl font-bold text-purple-400 mb-3">3</div>
            <h3 className="text-lg font-semibold mb-3">Apply the ROI Formula</h3>
            <p className="text-zinc-400 text-sm">ROI = ((Revenue from Social - Total Investment) / Total Investment) x 100. A 200% ROI means you earned $3 for every $1 invested. Track monthly and compare against platform benchmarks to optimize.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 pb-12 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">FAQ</h2>
        <div className="space-y-4">
          {[
            { q: 'How do you calculate social media ROI?', a: 'Social media ROI is calculated with the formula: ((Revenue from Social Media - Total Investment) / Total Investment) x 100. Total investment includes ad spend, content creation costs (hours x hourly rate), tools, and agency fees. A result of 200% means you earned $3 for every $1 spent.' },
            { q: 'What is a good social media ROI in 2026?', a: 'A positive ROI (above 0%) means you\'re profitable. Most businesses aim for 200-500% ROI. Top-performing brands achieve 800%+ through optimized targeting, high-quality content, and strategic retargeting. B2B companies on LinkedIn average 280% while e-commerce brands on Instagram average 320%.' },
            { q: 'How do I track revenue from social media?', a: 'Use UTM parameters on all social links, install conversion pixels (Meta Pixel, TikTok Pixel), set up Google Analytics goals, and use your CRM to track lead sources. Multi-touch attribution models give the most accurate picture of social media\'s revenue contribution.' },
            { q: 'Which social media platform has the best ROI?', a: 'It depends on your business. LinkedIn leads for B2B (avg 280% ROI, higher CPL but higher customer value). Instagram and TikTok lead for e-commerce and DTC brands (320% and 250% respectively). YouTube has the highest long-form content ROI at 350% due to evergreen content value.' },
            { q: 'Should I include organic content costs in my ROI calculation?', a: 'Absolutely. Time spent creating content has a real cost — your hourly rate or employee wages. A common mistake is only counting ad spend. Including all costs (content creation, strategy, community management) gives you a realistic view of your true ROI and helps you make better budget decisions.' },
          ].map(faq => (
            <details key={faq.q} className="glass rounded-xl p-4 cursor-pointer group">
              <summary className="font-semibold list-none flex justify-between items-center">
                {faq.q}
                <span className="text-zinc-500 group-open:rotate-180 transition-transform">&#9660;</span>
              </summary>
              <p className="text-zinc-400 text-sm mt-3">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 py-12 max-w-4xl mx-auto text-center">
        <div className="glass rounded-2xl p-10">
          <p className="text-4xl font-bold mb-2">
            <span className="gradient-text">3.2x</span> Average ROI Improvement
          </p>
          <p className="text-zinc-400 text-lg">PostCraft users see 3.2x average ROI improvement in 90 days through optimized content and data-driven strategy.</p>
        </div>
      </section>

      {/* Internal Links */}
      <section className="px-6 pb-20 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">More Free Tools</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a href="/engagement-calculator" className="glass rounded-xl p-4 text-center hover:bg-zinc-800/50 transition">
            <p className="font-semibold mb-1">Engagement Calculator</p>
            <p className="text-zinc-400 text-xs">Check your engagement rate</p>
          </a>
          <a href="/social-audit" className="glass rounded-xl p-4 text-center hover:bg-zinc-800/50 transition">
            <p className="font-semibold mb-1">Social Audit</p>
            <p className="text-zinc-400 text-xs">Full profile analysis</p>
          </a>
          <a href="/influencer-score" className="glass rounded-xl p-4 text-center hover:bg-zinc-800/50 transition">
            <p className="font-semibold mb-1">Influencer Score</p>
            <p className="text-zinc-400 text-xs">Rate any profile</p>
          </a>
          <a href="/sentiment-analyzer" className="glass rounded-xl p-4 text-center hover:bg-zinc-800/50 transition">
            <p className="font-semibold mb-1">Sentiment Analyzer</p>
            <p className="text-zinc-400 text-xs">Analyze content tone</p>
          </a>
        </div>
      </section>
    </main>
  );
}
