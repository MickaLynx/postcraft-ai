'use client';
import { useState } from 'react';

const niches = ['Tech', 'Fitness', 'Beauty', 'Fashion', 'Food', 'Travel', 'Finance', 'Gaming', 'Lifestyle', 'Education', 'Parenting', 'Health'] as const;
const platforms = ['Instagram', 'TikTok', 'YouTube', 'Twitter/X', 'LinkedIn', 'Podcast', 'Newsletter', 'Blog'] as const;
const audienceSizes = ['Nano (1K-10K)', 'Micro (10K-50K)', 'Mid-tier (50K-200K)', 'Macro (200K-1M)', 'Mega (1M+)'] as const;
const pitchTypes = ['Product Review', 'Sponsored Post', 'Brand Ambassador', 'Affiliate Deal', 'Event Coverage', 'Content Series'] as const;
const brandCategories = ['SaaS', 'E-commerce', 'DTC Brand', 'Consumer Tech', 'Health & Wellness', 'Food & Beverage', 'Financial Services', 'Fashion & Apparel'] as const;
const tones = ['Professional', 'Casual & Friendly', 'Bold & Confident', 'Data-Driven', 'Storytelling'] as const;

interface PitchOverview {
  subjectLine: string;
  openingHook: string;
  valueProposition: string;
  uniqueSellingPoint: string;
  estimatedDealRange: string;
}

interface MediaKitStat {
  metric: string;
  value: string;
  trend: 'Up' | 'Stable';
  vsIndustry: string;
}

interface PitchTemplate {
  greeting: string;
  intro: string;
  whyThisBrand: string;
  whatIOffer: string;
  audienceAlignment: string;
  deliverables: string[];
  pricing: string;
  closingCta: string;
}

interface DeliverablePackage {
  name: string;
  includes: string[];
  priceRange: string;
  turnaround: string;
  expectedRoi: string;
}

interface NegotiationTip {
  tip: string;
  context: string;
  exampleResponse: string;
  confidenceLevel: number;
}

interface FollowUp {
  dayNumber: number;
  subjectLine: string;
  bodyPreview: string;
  strategyNote: string;
}

interface RedFlag {
  warning: string;
  whatItMeans: string;
  howToRespond: string;
}

interface PitchResult {
  overview: PitchOverview;
  mediaKit: MediaKitStat[];
  template: PitchTemplate;
  packages: DeliverablePackage[];
  negotiationTips: NegotiationTip[];
  followUps: FollowUp[];
  redFlags: RedFlag[];
}

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function pick<T>(arr: T[], seed: number, idx: number = 0): T {
  return arr[(seed + idx) % arr.length];
}

function generatePitch(niche: string, platform: string, audience: string, pitchType: string, brand: string, tone: string): PitchResult {
  const seed = hash(`${niche}-${platform}-${audience}-${pitchType}-${brand}-${tone}`);

  const sizeMultiplier: Record<string, number> = { 'Nano (1K-10K)': 1, 'Micro (10K-50K)': 3, 'Mid-tier (50K-200K)': 8, 'Macro (200K-1M)': 25, 'Mega (1M+)': 80 };
  const mult = sizeMultiplier[audience] || 3;
  const baseDeal = 150 * mult;
  const maxDeal = 500 * mult;

  const subjectLines = [
    `Partnership Opportunity: ${niche} Content Creator × ${brand} Brand`,
    `Collaboration Proposal — Authentic ${niche} Content for ${brand}`,
    `Let's Create Something Amazing: ${niche} Creator × ${brand}`,
    `${pitchType} Partnership — Reaching ${audience.split(' ')[0]} ${niche} Audience`,
    `Exclusive ${brand} × ${niche} Creator Collaboration Idea`,
  ];

  const hooks = [
    `I've been a genuine fan of your brand for over a year, and my ${niche.toLowerCase()} audience consistently asks about products like yours.`,
    `After seeing your latest campaign, I knew there was a perfect alignment between your brand's mission and the community I've built in ${niche.toLowerCase()}.`,
    `My audience of engaged ${niche.toLowerCase()} enthusiasts has been asking for exactly what your brand offers — I'd love to bridge that gap authentically.`,
    `I recently featured a product similar to yours and received 300+ DMs asking for my recommendation — your brand was the most requested.`,
    `Your brand's commitment to quality in the ${brand.toLowerCase()} space aligns perfectly with the values I promote to my ${niche.toLowerCase()} community.`,
  ];

  const overview: PitchOverview = {
    subjectLine: pick(subjectLines, seed, 0),
    openingHook: pick(hooks, seed, 1),
    valueProposition: `As a ${niche.toLowerCase()} creator with a highly engaged ${audience.split(' ')[0].toLowerCase()}-level following on ${platform}, I deliver authentic, conversion-focused content that resonates with ${brand.toLowerCase()} audiences. My average engagement rate is 3x the platform average.`,
    uniqueSellingPoint: `I combine deep ${niche.toLowerCase()} expertise with ${platform}-native content creation, resulting in sponsored content that feels organic and drives measurable action — not just impressions.`,
    estimatedDealRange: `$${baseDeal.toLocaleString()} — $${maxDeal.toLocaleString()}`,
  };

  const followerCount: Record<string, string> = { 'Nano (1K-10K)': '7,200', 'Micro (10K-50K)': '34,500', 'Mid-tier (50K-200K)': '128,000', 'Macro (200K-1M)': '456,000', 'Mega (1M+)': '2,100,000' };
  const engRate: Record<string, string> = { 'Nano (1K-10K)': '8.4%', 'Micro (10K-50K)': '5.2%', 'Mid-tier (50K-200K)': '3.8%', 'Macro (200K-1M)': '2.6%', 'Mega (1M+)': '1.9%' };

  const mediaKit: MediaKitStat[] = [
    { metric: 'Total Followers', value: followerCount[audience] || '34,500', trend: 'Up', vsIndustry: '+22% above avg' },
    { metric: 'Engagement Rate', value: engRate[audience] || '5.2%', trend: 'Up', vsIndustry: '+180% above avg' },
    { metric: 'Avg. Impressions/Post', value: `${(120 * mult + seed % 500).toLocaleString()}`, trend: 'Up', vsIndustry: '+45% above avg' },
    { metric: 'Story Completion Rate', value: `${72 + seed % 18}%`, trend: 'Stable', vsIndustry: '+30% above avg' },
    { metric: 'Link Click-Through Rate', value: `${(2.5 + (seed % 30) / 10).toFixed(1)}%`, trend: 'Up', vsIndustry: '+95% above avg' },
    { metric: 'Audience Demographics Match', value: `${78 + seed % 15}%`, trend: 'Stable', vsIndustry: 'Highly aligned' },
  ];

  const greetings: Record<string, string> = {
    'Professional': `Dear ${brand} Marketing Team,`,
    'Casual & Friendly': `Hey ${brand} team! 👋`,
    'Bold & Confident': `${brand} — I have an idea that could drive serious results for your brand.`,
    'Data-Driven': `To the ${brand} partnerships team — I have data that suggests a high-ROI opportunity.`,
    'Storytelling': `Let me tell you about the moment I realized ${brand} and my audience were a perfect match.`,
  };

  const template: PitchTemplate = {
    greeting: greetings[tone] || greetings['Professional'],
    intro: `I'm [Your Name], a ${niche.toLowerCase()} content creator on ${platform} with a community of ${followerCount[audience] || '34,500'} highly engaged followers. I specialize in creating ${pitchType.toLowerCase()} content that drives real results — not just vanity metrics.`,
    whyThisBrand: `I've been following ${brand} brands closely, and your commitment to [specific brand value] resonates deeply with my audience. In a recent poll, ${65 + seed % 25}% of my followers expressed interest in ${brand.toLowerCase()} products, making this a natural partnership opportunity.`,
    whatIOffer: `For this ${pitchType.toLowerCase()} collaboration, I'll create ${platform}-native content that seamlessly integrates your product into the ${niche.toLowerCase()} content my audience already loves. Every piece is designed to drive action — whether that's clicks, sign-ups, or purchases.`,
    audienceAlignment: `My audience is primarily ${25 + seed % 15}-${35 + seed % 10} year olds, ${seed % 2 === 0 ? '65% female' : '55% male'}, with strong purchasing intent in the ${brand.toLowerCase()} space. ${82 + seed % 12}% have bought a product I recommended in the last 6 months.`,
    deliverables: [
      `${platform === 'YouTube' ? '1 dedicated video (10-15 min)' : platform === 'TikTok' ? '3 TikTok videos (15-60s each)' : '2 in-feed posts + 5 stories'}`,
      'Behind-the-scenes content showcasing authentic product use',
      'Usage rights for your brand channels (60 days)',
      'Detailed performance report within 14 days of posting',
      `Cross-promotion on ${platform === 'Instagram' ? 'Stories + Reels' : 'secondary platform'}`,
    ],
    pricing: `Based on my audience size, engagement rates, and the scope of this ${pitchType.toLowerCase()} project, my rate for this package starts at $${baseDeal.toLocaleString()}. I'm happy to discuss custom packages that fit your budget and goals.`,
    closingCta: `I'd love to hop on a quick 15-minute call to discuss how we can make this collaboration a win-win. Are you available this week? I've attached my full media kit for your reference.`,
  };

  const packages: DeliverablePackage[] = [
    {
      name: 'Starter',
      includes: ['1 sponsored post', '3 story frames', 'Basic analytics report'],
      priceRange: `$${Math.round(baseDeal * 0.5).toLocaleString()} — $${Math.round(baseDeal * 0.8).toLocaleString()}`,
      turnaround: '5-7 days',
      expectedRoi: '3-5x ad spend equivalent',
    },
    {
      name: 'Standard',
      includes: ['2 sponsored posts', '8 story frames', 'Behind-the-scenes reel', '30-day usage rights', 'Full analytics report'],
      priceRange: `$${baseDeal.toLocaleString()} — $${Math.round(baseDeal * 1.5).toLocaleString()}`,
      turnaround: '7-10 days',
      expectedRoi: '5-8x ad spend equivalent',
    },
    {
      name: 'Premium',
      includes: ['3 sponsored posts', '12 story frames', '2 reels/videos', 'Giveaway hosting', '60-day usage rights', 'Detailed ROI report', 'Content repurposing for brand channels'],
      priceRange: `$${Math.round(baseDeal * 1.5).toLocaleString()} — $${Math.round(baseDeal * 2.5).toLocaleString()}`,
      turnaround: '10-14 days',
      expectedRoi: '8-12x ad spend equivalent',
    },
    {
      name: 'Ambassador',
      includes: ['Monthly content (4 posts + stories)', 'Exclusive brand codes', 'Event appearances', 'Quarterly strategy calls', '90-day usage rights', 'Priority placement'],
      priceRange: `$${Math.round(baseDeal * 3).toLocaleString()} — $${Math.round(baseDeal * 5).toLocaleString()}/month`,
      turnaround: 'Ongoing (3-month minimum)',
      expectedRoi: '12-20x over contract duration',
    },
    {
      name: 'Custom',
      includes: ['Fully tailored deliverables', 'Content series (4-8 episodes)', 'Product co-creation opportunity', 'Full usage rights', 'Dedicated account management'],
      priceRange: 'Custom pricing',
      turnaround: 'Based on scope',
      expectedRoi: 'Highest ROI — aligned to brand KPIs',
    },
  ];

  const negotiationTips: NegotiationTip[] = [
    { tip: 'Never accept the first offer', context: 'Brands almost always start with their lowest budget. A 30-50% increase is standard.', exampleResponse: '"I appreciate the offer! Based on my engagement rates and the deliverables discussed, my standard rate for this scope is [X]. I\'m confident this investment will deliver [specific ROI metric]."', confidenceLevel: 92 },
    { tip: 'Anchor with value, not just price', context: 'Frame your rates in terms of the value you deliver, not the hours you spend.', exampleResponse: '"My last campaign for a similar brand drove 2,400 link clicks at a $0.38 CPC — significantly below the industry average of $1.20. My rate reflects this proven performance."', confidenceLevel: 88 },
    { tip: 'Offer package options instead of a single price', context: 'Giving 3 tiers lets the brand feel in control while anchoring them to the middle option.', exampleResponse: '"I\'ve put together three packages — Starter, Standard, and Premium. Most brands in the ' + brand.toLowerCase() + ' space find the Standard package delivers the best balance of reach and ROI."', confidenceLevel: 85 },
    { tip: 'Get everything in writing before starting', context: 'Verbal agreements change. A simple contract protects both parties.', exampleResponse: '"I\'m excited to move forward! Before we begin, I\'ll send over a brief agreement outlining deliverables, timeline, usage rights, and payment terms. This protects us both."', confidenceLevel: 95 },
    { tip: 'Negotiate usage rights separately', context: 'Content usage beyond your channels is worth 25-100% extra.', exampleResponse: '"The base rate covers posting on my channels. For usage rights on your brand\'s paid ads and channels, I offer a 60-day license at [X] or perpetual rights at [Y]."', confidenceLevel: 82 },
    { tip: 'Know your walk-away number', context: 'Having a minimum acceptable rate prevents underselling your value.', exampleResponse: '"I appreciate your budget constraints. Unfortunately, I\'m unable to go below [X] for this scope while maintaining the quality my audience expects. Perhaps we could adjust the deliverables to fit your budget?"', confidenceLevel: 90 },
  ];

  const followUps: FollowUp[] = [
    { dayNumber: 3, subjectLine: `Quick follow-up: ${niche} × ${brand} Partnership`, bodyPreview: `Hi [Name], I wanted to make sure my proposal didn't get lost in your inbox. I'm genuinely excited about the potential of this collaboration and would love to discuss how we can tailor it to your Q2 goals...`, strategyNote: 'Keep it short and reference a specific detail from your original pitch to show genuine interest' },
    { dayNumber: 7, subjectLine: `New idea for our potential collaboration`, bodyPreview: `I had another idea since my last email — what if we combined the ${pitchType.toLowerCase()} with a limited-time audience offer? My last similar activation drove a ${12 + seed % 20}% conversion rate...`, strategyNote: 'Add new value instead of just asking "did you see my email?" — give them a reason to respond' },
    { dayNumber: 14, subjectLine: `Last touch: ${niche} content opportunity`, bodyPreview: `I know you're busy, so I'll keep this brief. I have an opening in my content calendar next month and wanted to give ${brand} first dibs before I book another brand in this space...`, strategyNote: 'Create gentle urgency with scarcity — you have limited slots and other brands are interested' },
    { dayNumber: 30, subjectLine: `Checking in — still interested in ${niche} audience?`, bodyPreview: `It's been a month since I reached out. If the timing wasn't right, I completely understand. I'd love to stay on your radar for future campaigns. In the meantime, I just hit [new milestone]...`, strategyNote: 'Final follow-up — share a new achievement to keep your profile fresh and leave the door open' },
  ];

  const redFlags: RedFlag[] = [
    { warning: '"We\'ll pay you in exposure/products only"', whatItMeans: 'The brand either has no budget or doesn\'t value creator work. Product-only deals are acceptable only for nano creators building portfolios.', howToRespond: '"I appreciate the offer, but I\'ve moved past gifted collaborations. My audience trusts paid partnerships that are clearly labeled. I\'d be happy to discuss a budget-friendly package."' },
    { warning: 'No contract or vague terms', whatItMeans: 'Without written terms, you risk scope creep, delayed payments, or disputes over usage rights.', howToRespond: '"I\'m excited to work together! Before we start, I always use a simple agreement to protect both parties. Here\'s my standard template — happy to adjust terms."' },
    { warning: 'Requesting full content ownership in perpetuity', whatItMeans: 'The brand wants to use your content forever across all channels without additional compensation.', howToRespond: '"My standard package includes [X]-day usage rights. Perpetual/full-rights licensing is available as an add-on at [Y]. This ensures fair compensation for the ongoing value of the content."' },
    { warning: 'Extremely tight turnaround with no flexibility', whatItMeans: 'Rush jobs often mean poor planning on their side, which leads to unrealistic expectations and revision cycles.', howToRespond: '"I want to deliver my best work for your brand. My standard turnaround is [X] days. I can expedite for a [Y]% rush fee if the timeline is firm."' },
    { warning: 'Asking you to remove "sponsored" or "ad" disclosure', whatItMeans: 'This violates FTC guidelines and platform policies. It puts YOU at legal risk, not them.', howToRespond: '"I\'m committed to transparent partnerships that comply with FTC guidelines and platform policies. Properly disclosed content actually performs better because audiences trust authentic recommendations."' },
  ];

  return { overview, mediaKit, template, packages, negotiationTips, followUps, redFlags };
}

export default function SponsorshipPitchPage() {
  const [niche, setNiche] = useState<string>(niches[0]);
  const [platform, setPlatform] = useState<string>(platforms[0]);
  const [audience, setAudience] = useState<string>(audienceSizes[1]);
  const [pitchType, setPitchType] = useState<string>(pitchTypes[0]);
  const [brand, setBrand] = useState<string>(brandCategories[0]);
  const [tone, setTone] = useState<string>(tones[0]);
  const [result, setResult] = useState<PitchResult | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Sponsorship Pitch Generator</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Generate compelling brand partnership proposals with media kit stats, pitch templates, deliverable packages, negotiation tips, and follow-up sequences.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Creator Niche</label>
              <select value={niche} onChange={e => setNiche(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent">
                {niches.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Platform</label>
              <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent">
                {platforms.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Audience Size</label>
              <select value={audience} onChange={e => setAudience(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent">
                {audienceSizes.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Pitch Type</label>
              <select value={pitchType} onChange={e => setPitchType(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent">
                {pitchTypes.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Brand Category</label>
              <select value={brand} onChange={e => setBrand(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent">
                {brandCategories.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tone</label>
              <select value={tone} onChange={e => setTone(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent">
                {tones.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => setResult(generatePitch(niche, platform, audience, pitchType, brand, tone))} className="w-full py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-violet-700 hover:to-purple-700 transition-all shadow-md">
            Generate Pitch
          </button>
        </div>

        {result && (
          <div className="space-y-8">
            {/* Pitch Overview */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📋 Pitch Overview</h2>
              <div className="space-y-4">
                <div className="p-4 bg-violet-50 rounded-xl">
                  <div className="text-sm font-semibold text-violet-600 mb-1">Subject Line</div>
                  <div className="text-lg font-bold text-gray-900">{result.overview.subjectLine}</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-xl">
                  <div className="text-sm font-semibold text-purple-600 mb-1">Opening Hook</div>
                  <div className="text-gray-700">{result.overview.openingHook}</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-sm font-semibold text-gray-600 mb-1">Value Proposition</div>
                    <div className="text-sm text-gray-700">{result.overview.valueProposition}</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-sm font-semibold text-gray-600 mb-1">Unique Selling Point</div>
                    <div className="text-sm text-gray-700">{result.overview.uniqueSellingPoint}</div>
                  </div>
                </div>
                <div className="text-center p-6 bg-gradient-to-r from-violet-100 to-purple-100 rounded-xl">
                  <div className="text-sm text-violet-600 font-semibold">Estimated Deal Range</div>
                  <div className="text-3xl font-bold text-violet-800">{result.overview.estimatedDealRange}</div>
                </div>
              </div>
            </div>

            {/* Media Kit */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📊 Media Kit Stats</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {result.mediaKit.map((m, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-xl text-center">
                    <div className="text-2xl font-bold text-gray-900">{m.value}</div>
                    <div className="text-sm font-semibold text-gray-600 mt-1">{m.metric}</div>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${m.trend === 'Up' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                        {m.trend === 'Up' ? '↑' : '→'} {m.trend}
                      </span>
                      <span className="text-xs text-violet-600 font-medium">{m.vsIndustry}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Full Pitch Template */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">✉️ Full Pitch Template</h2>
              <div className="bg-gray-50 rounded-xl p-6 space-y-4 text-sm text-gray-700 leading-relaxed">
                <p className="font-semibold text-gray-900">{result.template.greeting}</p>
                <p>{result.template.intro}</p>
                <p><span className="font-semibold text-violet-700">Why Your Brand:</span> {result.template.whyThisBrand}</p>
                <p><span className="font-semibold text-violet-700">What I Offer:</span> {result.template.whatIOffer}</p>
                <p><span className="font-semibold text-violet-700">Audience Fit:</span> {result.template.audienceAlignment}</p>
                <div>
                  <span className="font-semibold text-violet-700">Deliverables:</span>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    {result.template.deliverables.map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
                </div>
                <p><span className="font-semibold text-violet-700">Investment:</span> {result.template.pricing}</p>
                <p className="font-medium text-gray-900">{result.template.closingCta}</p>
                <p className="text-gray-500">Best,<br />[Your Name]</p>
              </div>
            </div>

            {/* Deliverable Packages */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📦 Deliverable Packages</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {result.packages.map((p, i) => (
                  <div key={i} className={`p-6 rounded-xl border-2 ${i === 1 ? 'border-violet-500 bg-violet-50' : i === 2 ? 'border-purple-300 bg-purple-50' : 'border-gray-200 bg-gray-50'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900">{p.name}</h3>
                      {i === 1 && <span className="text-xs px-2 py-1 bg-violet-500 text-white rounded-full">Popular</span>}
                    </div>
                    <div className="text-xl font-bold text-violet-700 mb-3">{p.priceRange}</div>
                    <ul className="space-y-1 mb-4">
                      {p.includes.map((inc, j) => <li key={j} className="text-sm text-gray-600 flex items-start gap-2"><span className="text-violet-500 mt-0.5">✓</span>{inc}</li>)}
                    </ul>
                    <div className="text-xs text-gray-500">Turnaround: {p.turnaround}</div>
                    <div className="text-xs font-semibold text-emerald-600 mt-1">Expected ROI: {p.expectedRoi}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Negotiation Tips */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🤝 Negotiation Tips</h2>
              <div className="space-y-4">
                {result.negotiationTips.map((t, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-900">{t.tip}</h3>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div className="bg-violet-500 h-2 rounded-full" style={{ width: `${t.confidenceLevel}%` }} />
                        </div>
                        <span className="text-xs text-gray-500">{t.confidenceLevel}%</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{t.context}</p>
                    <div className="p-3 bg-violet-50 rounded-lg text-sm text-violet-800 italic">&ldquo;{t.exampleResponse}&rdquo;</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Follow-Up Sequence */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📬 Follow-Up Sequence</h2>
              <div className="space-y-4">
                {result.followUps.map((f, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center font-bold">
                      D{f.dayNumber}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900 mb-1">{f.subjectLine}</div>
                      <p className="text-sm text-gray-600 mb-2">{f.bodyPreview}</p>
                      <p className="text-xs text-violet-600 italic">Strategy: {f.strategyNote}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Red Flags */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🚩 Red Flags to Watch</h2>
              <div className="space-y-4">
                {result.redFlags.map((r, i) => (
                  <div key={i} className="p-4 bg-red-50 rounded-xl border border-red-100">
                    <h3 className="font-bold text-red-800 mb-1">{r.warning}</h3>
                    <p className="text-sm text-gray-700 mb-2">{r.whatItMeans}</p>
                    <div className="p-3 bg-white rounded-lg text-sm text-gray-700">
                      <span className="font-semibold text-emerald-700">How to respond: </span>{r.howToRespond}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
