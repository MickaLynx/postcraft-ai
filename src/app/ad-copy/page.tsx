'use client';
import { useState } from 'react';

const platforms = ['Facebook Ads', 'Instagram Ads', 'TikTok Ads', 'LinkedIn Ads', 'Twitter/X Ads', 'Google Ads', 'Pinterest Ads'] as const;
const frameworks = ['AIDA (Attention-Interest-Desire-Action)', 'PAS (Problem-Agitate-Solution)', 'BAB (Before-After-Bridge)', 'FAB (Features-Advantages-Benefits)', '4Ps (Promise-Picture-Proof-Push)', 'SLAP (Stop-Look-Act-Purchase)', 'Star-Chain-Hook'] as const;
const objectives = ['Conversions/Sales', 'Lead Generation', 'App Installs', 'Traffic', 'Brand Awareness', 'Engagement', 'Video Views', 'Catalog Sales'] as const;
const industries = ['E-commerce/DTC', 'SaaS/Tech', 'Health & Wellness', 'Finance/Fintech', 'Education/Courses', 'Real Estate', 'Food & Restaurant', 'Fashion/Beauty', 'Travel/Hospitality', 'B2B Services', 'Agency/Consulting', 'Fitness/Sports'] as const;
const toneOptions = ['Professional', 'Casual/Friendly', 'Urgent/FOMO', 'Inspirational', 'Humorous', 'Empathetic', 'Bold/Provocative', 'Data-Driven'] as const;
const adFormats = ['Single Image', 'Carousel', 'Video', 'Stories/Reels', 'Collection', 'Lead Form'] as const;

interface AdVariation {
  label: string;
  headline: string;
  primaryText: string;
  description: string;
  cta: string;
  hookAngle: string;
}

interface AdCopyResult {
  variations: AdVariation[];
  headlineOptions: string[];
  platformSpecs: { charLimits: string; bestPractices: string[]; avgCPC: string; avgCTR: string };
  frameworkBreakdown: { step: string; content: string }[];
  targetingTips: string[];
  complianceNotes: string[];
  abTestIdeas: string[];
  performanceScore: number;
}

function generateAdCopy(
  platform: string, framework: string, objective: string, industry: string,
  tone: string, format: string, product: string, audience: string, usp: string, budget: string
): AdCopyResult {
  const frameworkSteps: Record<string, { steps: string[]; angles: string[] }> = {
    'AIDA (Attention-Interest-Desire-Action)': {
      steps: ['Attention: Hook with a bold claim or question', 'Interest: Present the value proposition', 'Desire: Paint the outcome they want', 'Action: Clear CTA with urgency'],
      angles: ['Curiosity gap', 'Bold statistic', 'Controversial take'],
    },
    'PAS (Problem-Agitate-Solution)': {
      steps: ['Problem: Name their exact pain point', 'Agitate: Make the pain feel urgent', 'Solution: Position your product as the answer'],
      angles: ['Fear of missing out', 'Frustration amplifier', 'Relief promise'],
    },
    'BAB (Before-After-Bridge)': {
      steps: ['Before: Describe their current struggle', 'After: Show the transformed state', 'Bridge: Your product is the bridge'],
      angles: ['Transformation story', 'Contrast visualization', 'Future pacing'],
    },
    'FAB (Features-Advantages-Benefits)': {
      steps: ['Features: What it does', 'Advantages: Why it matters', 'Benefits: How it changes their life'],
      angles: ['Product spotlight', 'Competitive edge', 'User outcome'],
    },
    '4Ps (Promise-Picture-Proof-Push)': {
      steps: ['Promise: Make a bold promise', 'Picture: Help them visualize', 'Proof: Show social proof/data', 'Push: Drive action now'],
      angles: ['Guarantee-led', 'Testimonial-driven', 'Data-backed'],
    },
    'SLAP (Stop-Look-Act-Purchase)': {
      steps: ['Stop: Pattern interrupt', 'Look: Visual hook', 'Act: Engagement trigger', 'Purchase: Conversion push'],
      angles: ['Shock value', 'Visual disruption', 'Scroll-stopper'],
    },
    'Star-Chain-Hook': {
      steps: ['Star: Introduce the star (product/person)', 'Chain: Chain of benefits and proof', 'Hook: Hook them with an irresistible offer'],
      angles: ['Hero narrative', 'Benefit chain', 'Offer-first'],
    },
  };

  const platformData: Record<string, { headlineLimit: number; textLimit: number; descLimit: number; cpc: string; ctr: string; tips: string[] }> = {
    'Facebook Ads': { headlineLimit: 40, textLimit: 125, descLimit: 30, cpc: '$0.44-$1.72', ctr: '0.90-1.61%', tips: ['Use social proof in primary text', 'Emojis boost CTR by 15%', 'Question-based headlines +23% CTR', 'Video ads get 10-30% lower CPC', 'First 3 seconds decide video ad fate'] },
    'Instagram Ads': { headlineLimit: 40, textLimit: 125, descLimit: 30, cpc: '$0.50-$2.00', ctr: '0.58-1.20%', tips: ['UGC-style creatives outperform polished', 'Reels ads: 67% lower CPA', 'Stories ads: swipe-up CTA is king', 'Carousel ads: 72% higher conversion', 'Native-looking content beats branded'] },
    'TikTok Ads': { headlineLimit: 100, textLimit: 100, descLimit: 100, cpc: '$0.10-$1.00', ctr: '1.00-3.00%', tips: ['Don\'t make ads, make TikToks', 'Hook in first 1 second', 'Trending sounds boost 22%', 'Creator-style > brand-style', 'Spark Ads get 142% more engagement'] },
    'LinkedIn Ads': { headlineLimit: 70, textLimit: 150, descLimit: 70, cpc: '$2.00-$7.00', ctr: '0.44-0.65%', tips: ['Thought leadership angles work best', 'Use job titles in targeting copy', 'Lead gen forms: 5x lower CPA than landing pages', 'Document ads: highest organic reach', 'B2B: value > hype'] },
    'Twitter/X Ads': { headlineLimit: 70, textLimit: 280, descLimit: 200, cpc: '$0.26-$0.50', ctr: '1.00-3.00%', tips: ['Thread-style ads build trust', 'Conversational ads boost engagement 3x', 'Use hashtags sparingly (1-2 max)', 'Polls drive cheap engagement', 'Breaking news angle works'] },
    'Google Ads': { headlineLimit: 30, textLimit: 90, descLimit: 90, cpc: '$1.00-$5.00', ctr: '3.17-6.00%', tips: ['Include keyword in headline', 'Use numbers and specifics', 'Test responsive search ads', 'Add all available extensions', 'Match search intent exactly'] },
    'Pinterest Ads': { headlineLimit: 100, textLimit: 500, descLimit: 500, cpc: '$0.10-$1.50', ctr: '0.20-1.50%', tips: ['Vertical pins (2:3) perform best', 'Text overlay boosts action 6x', 'Lifestyle imagery > product shots', 'Seasonal content: plan 45 days ahead', 'Rich pins drive 2x more engagement'] },
  };

  const toneMap: Record<string, { modifier: string; urgencyWord: string; ctaStyle: string }> = {
    'Professional': { modifier: 'Proven', urgencyWord: 'Start today', ctaStyle: 'Learn More' },
    'Casual/Friendly': { modifier: 'Game-changing', urgencyWord: 'Don\'t wait', ctaStyle: 'Try It Free' },
    'Urgent/FOMO': { modifier: 'Last chance', urgencyWord: 'Ending soon', ctaStyle: 'Claim Now' },
    'Inspirational': { modifier: 'Transform your', urgencyWord: 'Begin today', ctaStyle: 'Start Your Journey' },
    'Humorous': { modifier: 'Finally,', urgencyWord: 'Seriously though', ctaStyle: 'See For Yourself' },
    'Empathetic': { modifier: 'We get it.', urgencyWord: 'You deserve better', ctaStyle: 'Get Help Now' },
    'Bold/Provocative': { modifier: 'WARNING:', urgencyWord: 'Act now or regret later', ctaStyle: 'Prove Us Wrong' },
    'Data-Driven': { modifier: 'Data shows:', urgencyWord: 'The numbers don\'t lie', ctaStyle: 'See The Data' },
  };

  const fw = frameworkSteps[framework] || frameworkSteps['AIDA (Attention-Interest-Desire-Action)'];
  const pd = platformData[platform] || platformData['Facebook Ads'];
  const tm = toneMap[tone] || toneMap['Professional'];

  const angles = ['Benefit-Led', 'Problem-Led', 'Social Proof', 'Urgency/Scarcity', 'Curiosity Gap'];

  const variations: AdVariation[] = angles.slice(0, 3).map((angle, i) => {
    const headlines = [
      `${tm.modifier} ${product} for ${audience}`,
      `Stop wasting time on ${industry.toLowerCase()} — try ${product}`,
      `${audience} are switching to ${product}. Here's why.`,
    ];
    const texts = [
      `${usp}. Join thousands of ${audience.toLowerCase()} who already use ${product} to get better results. ${tm.urgencyWord}.`,
      `Tired of the same old ${industry.toLowerCase()} problems? ${product} solves ${usp.toLowerCase()}. See why ${audience.toLowerCase()} rate it 4.8/5.`,
      `"I wish I found ${product} sooner." — That's what ${audience.toLowerCase()} say after trying it. ${usp}. ${tm.urgencyWord}.`,
    ];
    const descriptions = [
      `${usp}. Free trial available.`,
      `Rated #1 by ${audience}. Try risk-free.`,
      `${tm.urgencyWord}. Limited offer for ${audience}.`,
    ];

    return {
      label: `Variation ${i + 1}: ${angle}`,
      headline: headlines[i].substring(0, pd.headlineLimit),
      primaryText: texts[i].substring(0, pd.textLimit * 3),
      description: descriptions[i].substring(0, pd.descLimit * 2),
      cta: tm.ctaStyle,
      hookAngle: angle,
    };
  });

  const headlineOptions = [
    `${tm.modifier} ${product} — ${usp.split('.')[0]}`,
    `Why ${audience} Choose ${product}`,
    `${product}: The ${industry} Solution You Need`,
    `Get ${usp.split('.')[0]} with ${product}`,
    `${audience}? Meet ${product}.`,
    `The #1 ${industry} Tool for ${audience}`,
    `${product} vs. Everything Else`,
    `How ${product} Saves ${audience} Time & Money`,
  ];

  const frameworkBreakdown = fw.steps.map((step, i) => ({
    step: step.split(':')[0],
    content: `${step.split(':')[1]?.trim() || step} — Applied to ${product}: ${i === 0 ? `Hook ${audience.toLowerCase()} with ${usp.split('.')[0].toLowerCase()}` : i === fw.steps.length - 1 ? `Drive action: "${tm.ctaStyle}"` : `Build ${['interest', 'desire', 'urgency', 'proof', 'trust'][i % 5]} around ${product}`}`,
  }));

  const targetingTips = [
    `Lookalike audience from existing ${objective.toLowerCase() === 'conversions/sales' ? 'purchasers' : 'leads'} (1-3% best performers)`,
    `Interest-based: ${industry} + related tools/competitors`,
    `Retargeting: website visitors (7-30 day window)`,
    `Exclude existing customers to reduce wasted spend`,
    `Test broad targeting with strong creative — algorithms learn faster`,
    budget ? `At $${budget}/day: start with 2-3 ad sets, $${Math.max(5, parseInt(budget) / 3).toFixed(0)} each` : 'Start with $20-50/day per ad set for learning phase',
  ];

  const complianceNotes = [
    platform.includes('Facebook') || platform.includes('Instagram') ? 'Meta: No before/after claims without evidence. No personal attributes ("Are you overweight?").' : '',
    platform.includes('TikTok') ? 'TikTok: No exaggerated claims. Content must match landing page. Disclaimers required for health/finance.' : '',
    platform.includes('LinkedIn') ? 'LinkedIn: Professional tone required. No misleading job offers. B2B claims need substantiation.' : '',
    industry === 'Health & Wellness' ? 'Health claims require disclaimers. No guaranteed cure/result language.' : '',
    industry === 'Finance/Fintech' ? 'Financial disclaimers required. No guaranteed returns. Risk warnings mandatory.' : '',
    'Always include required disclaimers for your industry and region.',
    'Ensure landing page matches ad claims — platform auditors check.',
  ].filter(Boolean);

  const abTestIdeas = [
    'Test headline: benefit-led vs. problem-led (run 7 days minimum)',
    'Test creative: UGC-style vs. polished brand (same copy)',
    'Test CTA: soft ("Learn More") vs. hard ("Buy Now")',
    `Test audience: broad vs. ${industry}-specific interests`,
    'Test format: static image vs. video (same message)',
    'Test copy length: short (1-2 lines) vs. long (paragraph with proof)',
  ];

  const scoreFactors = [
    usp.length > 20 ? 15 : 5,
    audience.length > 10 ? 15 : 5,
    tone === 'Urgent/FOMO' ? 12 : tone === 'Data-Driven' ? 11 : 8,
    format === 'Video' || format === 'Stories/Reels' ? 15 : format === 'Carousel' ? 13 : 10,
    objective === 'Conversions/Sales' ? 10 : objective === 'Lead Generation' ? 12 : 8,
    budget ? (parseInt(budget) >= 50 ? 15 : 8) : 5,
  ];
  const performanceScore = Math.min(98, scoreFactors.reduce((a, b) => a + b, 0) + 15);

  return {
    variations,
    headlineOptions,
    platformSpecs: {
      charLimits: `Headline: ${pd.headlineLimit} chars | Primary: ${pd.textLimit} chars | Description: ${pd.descLimit} chars`,
      bestPractices: pd.tips,
      avgCPC: pd.cpc,
      avgCTR: pd.ctr,
    },
    frameworkBreakdown,
    targetingTips,
    complianceNotes,
    abTestIdeas,
    performanceScore,
  };
}

export default function AdCopyPage() {
  const [platform, setPlatform] = useState<string>('Facebook Ads');
  const [framework, setFramework] = useState<string>(frameworks[0]);
  const [objective, setObjective] = useState<string>('Conversions/Sales');
  const [industry, setIndustry] = useState<string>('SaaS/Tech');
  const [tone, setTone] = useState<string>('Professional');
  const [format, setFormat] = useState<string>('Single Image');
  const [product, setProduct] = useState('');
  const [audience, setAudience] = useState('');
  const [usp, setUsp] = useState('');
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState<AdCopyResult | null>(null);

  const handleGenerate = () => {
    if (!product.trim() || !audience.trim() || !usp.trim()) return;
    setResult(generateAdCopy(platform, framework, objective, industry, tone, format, product.trim(), audience.trim(), usp.trim(), budget.trim()));
  };

  return (
    <main className="min-h-screen bg-zinc-950 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Ad Copy Generator</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Generate high-converting paid social ad copy using proven copywriting frameworks. <strong className="text-white">AIDA, PAS, BAB</strong> and more — with platform-specific specs and A/B test ideas.</p>

        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Ad Platform</label>
            <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {platforms.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Copywriting Framework</label>
            <select value={framework} onChange={e => setFramework(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {frameworks.map(f => <option key={f}>{f}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Campaign Objective</label>
            <select value={objective} onChange={e => setObjective(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {objectives.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Industry</label>
            <select value={industry} onChange={e => setIndustry(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {industries.map(i => <option key={i}>{i}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Tone</label>
            <select value={tone} onChange={e => setTone(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {toneOptions.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Ad Format</label>
            <select value={format} onChange={e => setFormat(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {adFormats.map(f => <option key={f}>{f}</option>)}
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Product / Service Name</label>
            <input type="text" value={product} onChange={e => setProduct(e.target.value)} placeholder="e.g., PostCraft AI" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600" />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Target Audience</label>
            <input type="text" value={audience} onChange={e => setAudience(e.target.value)} placeholder="e.g., SaaS marketers, small business owners" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Unique Selling Proposition (USP)</label>
            <input type="text" value={usp} onChange={e => setUsp(e.target.value)} placeholder="e.g., Generate 30 days of content in 5 minutes" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600" />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Daily Budget (optional, $)</label>
            <input type="text" value={budget} onChange={e => setBudget(e.target.value)} placeholder="e.g., 50" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600" />
          </div>
        </div>

        <button onClick={handleGenerate} className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition">
          Generate Ad Copy
        </button>

        {result && (
          <div className="mt-10 space-y-6">
            {/* Performance Score */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex items-center gap-4">
              <div className={`text-4xl font-bold ${result.performanceScore >= 80 ? 'text-green-400' : result.performanceScore >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                {result.performanceScore}
              </div>
              <div>
                <div className="text-white font-semibold">Predicted Performance Score</div>
                <div className="text-zinc-400 text-sm">Based on platform, framework, targeting specificity, and ad format selection</div>
              </div>
            </div>

            {/* Ad Variations */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Ad Variations</h2>
              {result.variations.map((v, i) => (
                <div key={i} className={`bg-zinc-900 border rounded-xl p-5 ${i === 0 ? 'border-violet-500/50' : 'border-zinc-800'}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${i === 0 ? 'bg-violet-600/20 text-violet-300' : 'bg-zinc-800 text-zinc-400'}`}>{v.label}</span>
                    <span className="text-xs text-zinc-500">Angle: {v.hookAngle}</span>
                  </div>
                  <div className="space-y-2">
                    <div><span className="text-xs text-zinc-500 uppercase">Headline:</span> <span className="text-white font-semibold">{v.headline}</span></div>
                    <div><span className="text-xs text-zinc-500 uppercase">Primary Text:</span> <span className="text-zinc-300 text-sm">{v.primaryText}</span></div>
                    <div><span className="text-xs text-zinc-500 uppercase">Description:</span> <span className="text-zinc-400 text-sm">{v.description}</span></div>
                    <div><span className="text-xs text-zinc-500 uppercase">CTA Button:</span> <span className="text-violet-400 font-medium">{v.cta}</span></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Headline Options */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Headline Options ({result.headlineOptions.length})</h3>
              <div className="grid md:grid-cols-2 gap-2">
                {result.headlineOptions.map((h, i) => (
                  <div key={i} className="text-sm text-zinc-300 bg-zinc-800/50 rounded-lg px-3 py-2">{i + 1}. {h}</div>
                ))}
              </div>
            </div>

            {/* Framework Breakdown */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Framework Breakdown: {framework.split(' (')[0]}</h3>
              <div className="space-y-3">
                {result.frameworkBreakdown.map((step, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="w-8 h-8 rounded-full bg-violet-600/20 flex items-center justify-center text-violet-400 text-sm font-bold shrink-0">{i + 1}</span>
                    <div>
                      <div className="text-white font-medium text-sm">{step.step}</div>
                      <div className="text-zinc-400 text-sm">{step.content}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Specs & Targeting */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Platform Specs: {platform}</h3>
                <div className="space-y-2 text-sm">
                  <div><span className="text-zinc-500">Char Limits:</span> <span className="text-zinc-300">{result.platformSpecs.charLimits}</span></div>
                  <div><span className="text-zinc-500">Avg CPC:</span> <span className="text-green-400">{result.platformSpecs.avgCPC}</span></div>
                  <div><span className="text-zinc-500">Avg CTR:</span> <span className="text-green-400">{result.platformSpecs.avgCTR}</span></div>
                  <div className="pt-2 border-t border-zinc-800">
                    <div className="text-zinc-500 mb-1">Best Practices:</div>
                    {result.platformSpecs.bestPractices.map((t, i) => (
                      <div key={i} className="text-zinc-300 flex gap-2 mb-1"><span className="text-violet-400">-</span>{t}</div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Targeting Tips</h3>
                <ul className="space-y-2">
                  {result.targetingTips.map((tip, i) => (
                    <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-violet-400">-</span>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* A/B Tests & Compliance */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">A/B Test Ideas</h3>
                <ul className="space-y-2">
                  {result.abTestIdeas.map((idea, i) => (
                    <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-fuchsia-400">-</span>{idea}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Compliance Notes</h3>
                <ul className="space-y-2">
                  {result.complianceNotes.map((note, i) => (
                    <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-yellow-400">!</span>{note}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Internal Links */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-zinc-400 mb-3">Enhance Your Ads</h3>
              <div className="flex flex-wrap gap-2 text-sm">
                <a href="/hooks" className="text-violet-400 hover:text-violet-300 underline">Hook Generator</a>
                <a href="/cta-generator" className="text-violet-400 hover:text-violet-300 underline">CTA Generator</a>
                <a href="/ab-testing" className="text-violet-400 hover:text-violet-300 underline">A/B Testing</a>
                <a href="/conversion-optimizer" className="text-violet-400 hover:text-violet-300 underline">Conversion Optimizer</a>
                <a href="/brand-voice" className="text-violet-400 hover:text-violet-300 underline">Brand Voice</a>
                <a href="/caption-optimizer" className="text-violet-400 hover:text-violet-300 underline">Caption Optimizer</a>
                <a href="/content-gap" className="text-violet-400 hover:text-violet-300 underline">Content Gap Analyzer</a>
                <a href="/roi-calculator" className="text-violet-400 hover:text-violet-300 underline">ROI Calculator</a>
              </div>
            </div>
          </div>
        )}

        {/* FAQ */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">Ad Copy Generator FAQ</h2>
          <div className="space-y-4">
            {[
              { q: 'Which copywriting framework works best for ads?', a: 'It depends on your objective. AIDA is best for awareness campaigns, PAS excels at conversion-focused ads (it addresses pain points directly), and BAB is perfect for retargeting (showing the transformation). For cold audiences, start with PAS or AIDA. For warm audiences, try BAB or FAB.' },
              { q: 'How many ad variations should I test?', a: 'Start with 3-5 variations per ad set. Test different angles (benefit-led vs. problem-led), creative formats (image vs. video), and copy lengths. Run each variation for at least 7 days or 1,000 impressions before deciding winners. Kill underperformers at 2x target CPA.' },
              { q: 'What makes a high-converting Facebook ad headline?', a: 'The best headlines are specific, benefit-focused, and under 40 characters. Numbers perform well ("Save 10 hours/week"), as do questions ("Still doing X manually?"). Avoid clickbait — Meta\'s algorithm penalizes it. Test 3-5 headlines per variation.' },
              { q: 'How much budget do I need to test ad copy effectively?', a: 'Minimum $20-50/day per ad set for Meta/TikTok, $50-100/day for LinkedIn. You need at least 50 conversion events per week for the algorithm to optimize. With smaller budgets, optimize for upper-funnel events (clicks, add-to-cart) first, then retarget converters.' },
              { q: 'Should I use AI-generated ad copy directly?', a: 'Use AI copy as a strong starting draft, then customize. Add your brand voice, specific social proof (real numbers, real names), and compliance disclaimers. The best ads combine AI efficiency with human insight — especially for emotional hooks and cultural relevance.' },
            ].map((faq, i) => (
              <details key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 group">
                <summary className="font-semibold text-white cursor-pointer">{faq.q}</summary>
                <p className="text-zinc-400 text-sm mt-2">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 border-t border-zinc-800 pt-8 pb-12">
          <div className="grid md:grid-cols-4 gap-8 text-sm text-zinc-500">
            <div>
              <h4 className="font-semibold text-white mb-3">Content Creation</h4>
              <ul className="space-y-1"><li><a href="/" className="hover:text-white transition">Post Generator</a></li><li><a href="/hooks" className="hover:text-white transition">Hook Generator</a></li><li><a href="/video-scripts" className="hover:text-white transition">Video Scripts</a></li><li><a href="/threads" className="hover:text-white transition">Thread Generator</a></li><li><a href="/carousel-generator" className="hover:text-white transition">Carousel Generator</a></li><li><a href="/ad-copy" className="hover:text-white transition">Ad Copy Generator</a></li></ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Optimization</h4>
              <ul className="space-y-1"><li><a href="/caption-optimizer" className="hover:text-white transition">Caption Optimizer</a></li><li><a href="/hashtags" className="hover:text-white transition">Hashtags</a></li><li><a href="/post-timing" className="hover:text-white transition">Post Timing</a></li><li><a href="/social-seo" className="hover:text-white transition">Social SEO</a></li><li><a href="/virality-score" className="hover:text-white transition">Virality Score</a></li><li><a href="/conversion-optimizer" className="hover:text-white transition">Conversion Optimizer</a></li></ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Analytics</h4>
              <ul className="space-y-1"><li><a href="/engagement-calculator" className="hover:text-white transition">Engagement</a></li><li><a href="/sentiment-analyzer" className="hover:text-white transition">Sentiment</a></li><li><a href="/roi-calculator" className="hover:text-white transition">ROI Calculator</a></li><li><a href="/competitor-analysis" className="hover:text-white transition">Competitors</a></li><li><a href="/content-gap" className="hover:text-white transition">Content Gap</a></li></ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Strategy</h4>
              <ul className="space-y-1"><li><a href="/brand-voice" className="hover:text-white transition">Brand Voice</a></li><li><a href="/content-calendar" className="hover:text-white transition">Calendar</a></li><li><a href="/campaign" className="hover:text-white transition">Campaign Mode</a></li><li><a href="/persona-builder" className="hover:text-white transition">Persona Builder</a></li><li><a href="/content-pillars" className="hover:text-white transition">Content Pillars</a></li></ul>
            </div>
          </div>
          <p className="text-center text-zinc-600 text-xs mt-8">© 2026 PostCraft AI. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
