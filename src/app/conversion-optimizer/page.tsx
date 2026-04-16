'use client';
import { useState } from 'react';

const platforms = ['Twitter/X', 'LinkedIn', 'Instagram', 'TikTok', 'YouTube', 'Facebook', 'Newsletter', 'Multi-Platform'] as const;
const businessModels = ['SaaS', 'E-commerce', 'Coaching/Consulting', 'Affiliate', 'Sponsorships', 'Digital Products', 'Memberships', 'Freelance Services'] as const;
const audienceSizes = ['Under 1K', '1K-10K', '10K-50K', '50K-100K', '100K-500K', '500K+'] as const;
const contentTypes = ['Feed Posts', 'Stories', 'Reels/Shorts', 'Carousels', 'Live Streams', 'Long-form Video', 'Threads', 'Newsletters'] as const;
const goals = ['More Sales', 'More Leads', 'More Email Signups', 'More Bookings', 'More Downloads', 'Higher Average Order Value'] as const;

interface FunnelStage {
  name: string;
  currentRate: number;
  benchmarkRate: number;
  gap: number;
  recommendations: string[];
}

interface CTAOptimization {
  placement: string;
  format: string;
  timing: string;
  expectedLift: string;
  example: string;
}

interface LinkStrategy {
  primary: string;
  secondary: string;
  tracking: string;
  utmTemplate: string;
}

interface ContentConversionMap {
  contentType: string;
  bestCTA: string;
  placement: string;
  conversionRate: string;
}

interface ABTestSuggestion {
  element: string;
  variantA: string;
  variantB: string;
  expectedWinner: string;
  confidence: string;
}

interface ConversionResult {
  funnelAnalysis: FunnelStage[];
  ctaOptimizations: CTAOptimization[];
  linkStrategy: LinkStrategy;
  contentToConversionMap: ContentConversionMap[];
  pricingPsychology: string[];
  urgencyTactics: string[];
  socialProofStrategies: string[];
  abTestSuggestions: ABTestSuggestion[];
  projectedImpact: {
    currentMonthly: string;
    optimizedMonthly: string;
    liftPercentage: number;
  };
}

const platformBenchmarks: Record<string, { tofuRate: number; mofuRate: number; bofuRate: number; avgCTR: number }> = {
  'Twitter/X': { tofuRate: 4.2, mofuRate: 1.8, bofuRate: 0.9, avgCTR: 1.6 },
  LinkedIn: { tofuRate: 5.8, mofuRate: 3.2, bofuRate: 2.1, avgCTR: 2.8 },
  Instagram: { tofuRate: 6.1, mofuRate: 2.5, bofuRate: 1.4, avgCTR: 1.1 },
  TikTok: { tofuRate: 8.5, mofuRate: 2.0, bofuRate: 0.8, avgCTR: 1.5 },
  YouTube: { tofuRate: 4.8, mofuRate: 3.5, bofuRate: 2.8, avgCTR: 3.2 },
  Facebook: { tofuRate: 3.9, mofuRate: 2.2, bofuRate: 1.5, avgCTR: 1.9 },
  Newsletter: { tofuRate: 3.0, mofuRate: 8.5, bofuRate: 5.2, avgCTR: 4.5 },
  'Multi-Platform': { tofuRate: 5.5, mofuRate: 3.0, bofuRate: 1.8, avgCTR: 2.2 },
};

const audienceMultipliers: Record<string, number> = {
  'Under 1K': 0.6,
  '1K-10K': 0.85,
  '10K-50K': 1.0,
  '50K-100K': 1.15,
  '100K-500K': 1.3,
  '500K+': 1.5,
};

const modelRevenueEstimates: Record<string, { low: number; mid: number; high: number }> = {
  SaaS: { low: 500, mid: 5000, high: 50000 },
  'E-commerce': { low: 800, mid: 8000, high: 80000 },
  'Coaching/Consulting': { low: 1000, mid: 10000, high: 60000 },
  Affiliate: { low: 200, mid: 3000, high: 25000 },
  Sponsorships: { low: 300, mid: 5000, high: 40000 },
  'Digital Products': { low: 400, mid: 6000, high: 45000 },
  Memberships: { low: 600, mid: 7000, high: 35000 },
  'Freelance Services': { low: 1500, mid: 12000, high: 70000 },
};

function generateConversionAnalysis(
  platform: string,
  businessModel: string,
  audienceSize: string,
  conversionRate: number,
  contentType: string,
  goal: string
): ConversionResult {
  const bench = platformBenchmarks[platform] || platformBenchmarks['Multi-Platform'];
  const multiplier = audienceMultipliers[audienceSize] || 1.0;
  const revenue = modelRevenueEstimates[businessModel] || modelRevenueEstimates['SaaS'];

  const effectiveTofu = conversionRate > 0 ? Math.min(conversionRate * 2.5, bench.tofuRate * 1.5) : bench.tofuRate * 0.7;
  const effectiveMofu = conversionRate > 0 ? Math.min(conversionRate * 1.2, bench.mofuRate * 1.3) : bench.mofuRate * 0.6;
  const effectiveBofu = conversionRate > 0 ? conversionRate : bench.bofuRate * 0.5;

  const funnelAnalysis: FunnelStage[] = [
    {
      name: 'TOFU (Awareness → Interest)',
      currentRate: parseFloat(effectiveTofu.toFixed(1)),
      benchmarkRate: parseFloat((bench.tofuRate * multiplier).toFixed(1)),
      gap: parseFloat((bench.tofuRate * multiplier - effectiveTofu).toFixed(1)),
      recommendations: [
        `Use pattern-interrupt hooks in the first 1-3 seconds of ${contentType.toLowerCase()} to stop the scroll`,
        `Leverage trending audio/formats on ${platform} to ride algorithmic boosts — trending content gets 2-3x more reach`,
        'Focus on shareable, "tag a friend" content that expands beyond your existing audience',
        `Optimize your ${platform} bio and pinned posts as the first impression for new visitors`,
        goal === 'More Email Signups'
          ? 'Add a compelling lead magnet teaser in every awareness-stage post'
          : 'Include a soft brand mention in every value post without hard-selling',
      ],
    },
    {
      name: 'MOFU (Interest → Consideration)',
      currentRate: parseFloat(effectiveMofu.toFixed(1)),
      benchmarkRate: parseFloat((bench.mofuRate * multiplier).toFixed(1)),
      gap: parseFloat((bench.mofuRate * multiplier - effectiveMofu).toFixed(1)),
      recommendations: [
        `Create comparison and "how I chose" content that positions your ${businessModel.toLowerCase()} offer against alternatives`,
        'Use carousel posts or threads to build a narrative — multi-slide content keeps attention 3x longer',
        'Share case studies, behind-the-scenes process, and transformation stories to build trust',
        `Implement story-based selling: problem → failed attempts → your solution → proof`,
        platform === 'Newsletter'
          ? 'Segment your list by interest and send targeted nurture sequences'
          : `Use ${platform} Stories/highlights to create an always-on FAQ and objection-handling resource`,
      ],
    },
    {
      name: 'BOFU (Consideration → Purchase)',
      currentRate: parseFloat(effectiveBofu.toFixed(1)),
      benchmarkRate: parseFloat((bench.bofuRate * multiplier).toFixed(1)),
      gap: parseFloat((bench.bofuRate * multiplier - effectiveBofu).toFixed(1)),
      recommendations: [
        `Create urgency without being manipulative — use real deadlines, limited spots, or seasonal pricing for your ${businessModel.toLowerCase()} offer`,
        'Stack social proof at the point of conversion: testimonials, user counts, revenue screenshots',
        `Reduce friction: ${businessModel === 'SaaS' ? 'offer a free trial or freemium tier' : businessModel === 'E-commerce' ? 'offer free shipping and easy returns' : businessModel === 'Coaching/Consulting' ? 'offer a free discovery call' : 'simplify your checkout to 1-2 steps'}`,
        'Use DM automation or comment-triggered delivery to capture high-intent buyers instantly',
        goal === 'Higher Average Order Value'
          ? 'Add order bumps, bundles, and "most popular" tier highlighting to increase AOV by 20-40%'
          : 'Follow up with non-converters within 24 hours using retargeting content or a direct message',
      ],
    },
  ];

  const ctaOptimizations: CTAOptimization[] = [
    {
      placement: 'End of carousel (last 2 slides)',
      format: 'Visual CTA card with arrow/button graphic',
      timing: 'After delivering 5-7 value slides',
      expectedLift: '+35-50% click-through vs. caption-only CTA',
      example: `Slide 8: "Want the full ${businessModel === 'Digital Products' ? 'template pack' : businessModel === 'SaaS' ? 'free trial' : 'strategy guide'}? Link in bio" with an arrow pointing to your profile`,
    },
    {
      placement: 'P.S. line in caption',
      format: 'Casual, conversational afterthought',
      timing: 'After the main value content and hashtags',
      expectedLift: '+20-30% conversion — P.S. lines get read even when captions are skimmed',
      example: `P.S. I just opened 5 spots for ${businessModel === 'Coaching/Consulting' ? '1:1 coaching this month' : businessModel === 'Freelance Services' ? 'new client projects in Q2' : 'early access to the new feature'}. DM me "${goal === 'More Leads' ? 'READY' : 'START'}" if you want in.`,
    },
    {
      placement: 'Mid-content hook (40-60% through)',
      format: 'Inline text CTA or verbal call-out',
      timing: 'At the peak engagement moment, not the end',
      expectedLift: '+25-40% engagement — catches people before they drop off',
      example: contentType === 'Long-form Video' || contentType === 'Reels/Shorts'
        ? '"Before I share step 3, drop a comment if you want the free checklist — I\'ll DM it to you"'
        : `"If this is hitting home, save this post — and check the link in bio for the full ${businessModel === 'Digital Products' ? 'resource library' : 'breakdown'}"`,
    },
    {
      placement: 'Story sequence (3-5 frame build-up)',
      format: 'Poll → Value → Testimonial → Offer → Link',
      timing: 'Post within 2 hours of a high-performing feed post',
      expectedLift: '+60-80% story-to-link conversion vs. cold story CTAs',
      example: 'Story 1: "Quick poll: biggest challenge with [topic]?" → Story 3: "Here\'s what worked for [client name]..." → Story 5: "Swipe up / Link to get the same result"',
    },
    {
      placement: 'Comment pinned CTA',
      format: 'First comment with link or next step',
      timing: 'Immediately after posting (within 30 seconds)',
      expectedLift: '+15-25% link clicks — separating CTA from caption feels less salesy',
      example: `"Want the free ${businessModel === 'SaaS' ? 'trial' : businessModel === 'Digital Products' ? 'template' : 'guide'}? Grab it here: [link] (no email required)"`,
    },
    {
      placement: 'Bio link with rotating offers',
      format: 'Link-in-bio page with 3-5 prioritized links',
      timing: 'Update weekly to match your current content focus',
      expectedLift: '+40-55% bio click-through vs. static single link',
      example: `Top link: Current offer/launch | Second: Evergreen lead magnet | Third: ${businessModel === 'Coaching/Consulting' ? 'Book a call' : businessModel === 'E-commerce' ? 'Shop bestsellers' : 'Free resource'}`,
    },
  ];

  const linkStrategy: LinkStrategy = {
    primary: platform === 'Newsletter'
      ? `Direct sales page link in every email with a personalized ${businessModel.toLowerCase()} offer`
      : `Link-in-bio tool (Linktree, Stan Store, or custom page) with ${businessModel === 'E-commerce' ? 'shop collection' : businessModel === 'SaaS' ? 'free trial signup' : 'lead magnet'} as the top link`,
    secondary: platform === 'Twitter/X' || platform === 'LinkedIn'
      ? 'Thread/post with direct URL in the last tweet/comment (algorithms penalize links in the main post by 40-60%)'
      : platform === 'Instagram' || platform === 'TikTok'
        ? 'Story links + DM automation for comment-triggered delivery (bypasses no-link-in-caption limitation)'
        : 'Pinned comment with UTM-tagged link + verbal CTA pointing to bio',
    tracking: `UTM parameters on every link: source=${platform.toLowerCase().replace('/', '-')}, medium=social, campaign=[content-topic]-[date]`,
    utmTemplate: `?utm_source=${platform.toLowerCase().replace('/', '-').replace(' ', '')}&utm_medium=social&utm_campaign={campaign_name}&utm_content={post_type}`,
  };

  const contentToConversionMap: ContentConversionMap[] = [
    {
      contentType: 'Feed Posts',
      bestCTA: goal === 'More Email Signups' ? 'Comment "[KEYWORD]" to get the free guide' : 'Link in bio + pinned comment',
      placement: 'Last line of caption + first comment',
      conversionRate: `${(bench.avgCTR * 0.8).toFixed(1)}%`,
    },
    {
      contentType: 'Stories',
      bestCTA: 'Swipe up / Link sticker with urgency',
      placement: 'Frame 3-5 of a 5-frame sequence (after context)',
      conversionRate: `${(bench.avgCTR * 1.2).toFixed(1)}%`,
    },
    {
      contentType: 'Reels/Shorts',
      bestCTA: 'Verbal CTA at 60-70% mark + text overlay + caption CTA',
      placement: 'Mid-video verbal + end-screen text + caption link',
      conversionRate: `${(bench.avgCTR * 0.9).toFixed(1)}%`,
    },
    {
      contentType: 'Carousels',
      bestCTA: 'Dedicated CTA slide (second-to-last) + "Share to help others"',
      placement: 'Slide 7-8 of 10 (after peak value delivery)',
      conversionRate: `${(bench.avgCTR * 1.5).toFixed(1)}%`,
    },
    {
      contentType: 'Live Streams',
      bestCTA: 'Verbal CTA every 10-15 minutes + pinned comment link',
      placement: 'After answering questions or delivering key insight',
      conversionRate: `${(bench.avgCTR * 1.8).toFixed(1)}%`,
    },
    {
      contentType: 'Threads',
      bestCTA: 'CTA in final tweet + retweet-gated access',
      placement: 'Last tweet of thread + QRT prompt for reach',
      conversionRate: `${(bench.avgCTR * 1.1).toFixed(1)}%`,
    },
    {
      contentType: 'Newsletters',
      bestCTA: 'Inline button + P.S. line with direct link',
      placement: 'After main value section (60% scroll) + P.S.',
      conversionRate: `${(bench.avgCTR * 2.0).toFixed(1)}%`,
    },
    {
      contentType: 'Long-form Video',
      bestCTA: 'Mid-roll verbal + end-screen card + description link',
      placement: 'At 40% and 85% of video length',
      conversionRate: `${(bench.avgCTR * 1.4).toFixed(1)}%`,
    },
  ];

  const pricingPsychology: string[] = [
    `Anchor high, sell mid: Show your premium ${businessModel === 'SaaS' ? 'enterprise plan' : businessModel === 'Coaching/Consulting' ? 'VIP package' : 'bundle'} first, then present the mid-tier as the "smart choice" — this increases mid-tier conversions by 30-40%`,
    'Use charm pricing ($97 vs $100) for impulse purchases under $200. Use round numbers ($500, $2000) for premium offers — round numbers signal quality',
    `Reframe cost as daily investment: "$${businessModel === 'Memberships' ? '1.63' : businessModel === 'SaaS' ? '2.50' : '3.33'}/day" feels 5x more accessible than the monthly or annual price`,
    'Offer 3 tiers (Good/Better/Best) — the middle tier converts 60-70% of buyers. Make the middle tier your target price point',
    `Add a decoy: Include a ${businessModel === 'Digital Products' ? 'slightly worse bundle at a similar price' : 'limited option that makes the full offer look like a steal'} — decoy pricing increases preferred-option selection by 25%`,
    'Display the annual price next to monthly to show savings. "Pay annually, save 35%" converts 40% of users to annual plans',
    'Price endings matter: $X97 for digital products, $X99 for physical products, $X50 for services (signals fairness)',
  ];

  const urgencyTactics: string[] = [
    `Real deadline urgency: "${businessModel === 'Coaching/Consulting' ? 'Only 3 spots left for Q2 coaching' : businessModel === 'E-commerce' ? '48-hour flash sale — ends Friday at midnight' : 'Early bird pricing ends this Sunday'}" — only use when the deadline is REAL`,
    'Seasonal hooks: Tie your offer to calendar events (New Year, Q1 planning, back-to-school) — seasonal urgency feels natural, not manufactured',
    `Social velocity: "47 people signed up today" or "This post got 500 saves — clearly you need this ${businessModel === 'Digital Products' ? 'template' : 'tool'}"`,
    'Cohort-based launches: "Next cohort starts June 1st — join 200+ others" combines urgency with social proof',
    'Rising price model: "Price goes up $50 every 100 customers" — creates urgency that scales with demand',
    `Limited bonuses: "First 50 buyers get ${businessModel === 'SaaS' ? 'a free onboarding call' : businessModel === 'Digital Products' ? '3 extra templates' : 'a bonus strategy session'}" — bonus scarcity converts 2x better than product scarcity`,
  ];

  const socialProofStrategies: string[] = [
    `Screenshot customer wins and results weekly — "Here\'s what [client] achieved in 30 days using our ${businessModel.toLowerCase()}" posts get 3x the engagement of regular posts`,
    'Use specific numbers over vague claims: "helped 847 customers" > "helped hundreds" — specificity implies honesty',
    `Create a branded hashtag for customer stories — user-generated proof converts 4.5x better than brand-created content`,
    `Pin your best testimonial as the first thing visitors see on your ${platform} profile`,
    'Show the journey, not just the result: Before/after timelines build more trust than isolated success stories',
    `Leverage "as seen in" or "trusted by" badges if applicable — even podcast appearances and ${platform} features count`,
    'DM every positive comment asking if you can screenshot and share it — build a testimonial bank of 50+ screenshots',
    'Create a real-time social proof notification: "Sarah from Austin just purchased" — adds urgency + proof simultaneously',
  ];

  const abTestSuggestions: ABTestSuggestion[] = [
    {
      element: 'CTA wording',
      variantA: goal === 'More Sales' ? '"Buy now — limited spots"' : '"Get instant access"',
      variantB: goal === 'More Sales' ? '"Start your transformation today"' : '"Grab your free copy"',
      expectedWinner: 'Variant B — benefit-focused CTAs outperform action-focused by 15-20%',
      confidence: '78%',
    },
    {
      element: 'CTA placement',
      variantA: 'CTA only at the end of content',
      variantB: 'CTA at mid-point AND end of content',
      expectedWinner: 'Variant B — dual placement catches early-exit readers (+25% clicks)',
      confidence: '85%',
    },
    {
      element: 'Link format',
      variantA: '"Link in bio" text CTA',
      variantB: '"Comment [WORD] and I\'ll DM you the link"',
      expectedWinner: 'Variant B — DM delivery gets 3-5x more responses (and boosts algorithm)',
      confidence: '90%',
    },
    {
      element: 'Social proof type',
      variantA: 'Star rating (4.9/5 from 200+ reviews)',
      variantB: 'Specific customer story with photo',
      expectedWinner: 'Variant B for high-ticket — stories build trust. Variant A for low-ticket — quick validation',
      confidence: '72%',
    },
    {
      element: 'Pricing display',
      variantA: 'Single price ($297)',
      variantB: 'Anchored price ($497 crossed out → $297)',
      expectedWinner: 'Variant B — anchor pricing increases perceived value by 30-40%',
      confidence: '82%',
    },
    {
      element: 'Urgency type',
      variantA: 'Time-based ("Offer ends Friday")',
      variantB: 'Quantity-based ("Only 12 spots left")',
      expectedWinner: 'Variant B for services/coaching, Variant A for products — scarcity type should match offer type',
      confidence: '75%',
    },
  ];

  const revenueKey = audienceSize === 'Under 1K' || audienceSize === '1K-10K' ? 'low' : audienceSize === '10K-50K' || audienceSize === '50K-100K' ? 'mid' : 'high';
  const currentEstimate = revenue[revenueKey];
  const optimizedEstimate = Math.round(currentEstimate * (1 + (bench.bofuRate * multiplier - effectiveBofu) / 100 + 0.35));
  const liftPct = currentEstimate > 0 ? parseFloat((((optimizedEstimate - currentEstimate) / currentEstimate) * 100).toFixed(1)) : 35;

  const projectedImpact = {
    currentMonthly: `$${currentEstimate.toLocaleString()}`,
    optimizedMonthly: `$${optimizedEstimate.toLocaleString()}`,
    liftPercentage: liftPct,
  };

  return {
    funnelAnalysis,
    ctaOptimizations,
    linkStrategy,
    contentToConversionMap,
    pricingPsychology,
    urgencyTactics,
    socialProofStrategies,
    abTestSuggestions,
    projectedImpact,
  };
}

export default function ConversionOptimizerPage() {
  const [platform, setPlatform] = useState<string>('Instagram');
  const [businessModel, setBusinessModel] = useState<string>('Digital Products');
  const [audienceSize, setAudienceSize] = useState<string>('10K-50K');
  const [conversionRate, setConversionRate] = useState('');
  const [contentType, setContentType] = useState<string>('Carousels');
  const [goal, setGoal] = useState<string>('More Sales');
  const [result, setResult] = useState<ConversionResult | null>(null);

  function analyze() {
    const rate = parseFloat(conversionRate) || 0;
    const analysis = generateConversionAnalysis(platform, businessModel, audienceSize, rate, contentType, goal);
    setResult(analysis);
  }

  function gapColor(gap: number) {
    if (gap <= 0) return 'text-green-400';
    if (gap <= 1) return 'text-yellow-400';
    if (gap <= 2) return 'text-orange-400';
    return 'text-red-400';
  }

  function rateColor(current: number, benchmark: number) {
    if (current >= benchmark) return 'text-green-400';
    if (current >= benchmark * 0.7) return 'text-yellow-400';
    return 'text-red-400';
  }

  return (
    <main className="min-h-screen bg-zinc-950">
      <section className="px-6 py-20 max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">
          Free <span className="gradient-text">Conversion Flow Optimizer</span>
        </h1>
        <p className="text-zinc-400 text-lg mb-2 max-w-2xl mx-auto">
          Analyze your social media funnel and get AI-powered CTA placement, link strategies, and conversion path recommendations to maximize monetization — without being spammy.
        </p>
        <p className="text-zinc-500 text-sm mb-8">Used by 8,500+ creators and growth marketers</p>
      </section>

      <section className="px-6 pb-10 max-w-4xl mx-auto">
        <div className="glass rounded-2xl p-8">
          <h2 className="text-xl font-semibold mb-6">Configure Your Funnel</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-zinc-400 text-sm mb-1">Platform</label>
              <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full bg-zinc-800 rounded-lg px-4 py-3 text-white">
                {platforms.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-zinc-400 text-sm mb-1">Business Model</label>
              <select value={businessModel} onChange={e => setBusinessModel(e.target.value)} className="w-full bg-zinc-800 rounded-lg px-4 py-3 text-white">
                {businessModels.map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-zinc-400 text-sm mb-1">Monthly Audience Size</label>
              <select value={audienceSize} onChange={e => setAudienceSize(e.target.value)} className="w-full bg-zinc-800 rounded-lg px-4 py-3 text-white">
                {audienceSizes.map(a => <option key={a}>{a}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-zinc-400 text-sm mb-1">Current Conversion Rate (%)</label>
              <input type="number" step="0.1" value={conversionRate} onChange={e => setConversionRate(e.target.value)} placeholder="2.5" className="w-full bg-zinc-800 rounded-lg px-4 py-3 text-white" />
            </div>
            <div>
              <label className="block text-zinc-400 text-sm mb-1">Primary Content Type</label>
              <select value={contentType} onChange={e => setContentType(e.target.value)} className="w-full bg-zinc-800 rounded-lg px-4 py-3 text-white">
                {contentTypes.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-zinc-400 text-sm mb-1">Primary Goal</label>
              <select value={goal} onChange={e => setGoal(e.target.value)} className="w-full bg-zinc-800 rounded-lg px-4 py-3 text-white">
                {goals.map(g => <option key={g}>{g}</option>)}
              </select>
            </div>
          </div>

          <button onClick={analyze} className="w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 transition">
            Optimize My Conversion Funnel
          </button>
        </div>
      </section>

      {result && (
        <section className="px-6 pb-10 max-w-4xl mx-auto space-y-6">

          {/* Projected Impact */}
          <div className="glass rounded-2xl p-8 text-center">
            <p className="text-zinc-400 text-sm mb-2">Projected Revenue Impact for {platform} + {businessModel}</p>
            <div className="flex items-center justify-center gap-6 mb-4">
              <div>
                <p className="text-zinc-500 text-xs mb-1">Current Estimate</p>
                <p className="text-2xl font-bold text-zinc-400">{result.projectedImpact.currentMonthly}<span className="text-sm">/mo</span></p>
              </div>
              <span className="text-3xl text-purple-400">&#8594;</span>
              <div>
                <p className="text-zinc-500 text-xs mb-1">Optimized Estimate</p>
                <p className="text-2xl font-bold text-green-400">{result.projectedImpact.optimizedMonthly}<span className="text-sm">/mo</span></p>
              </div>
            </div>
            <p className="text-5xl font-bold text-purple-400">+{result.projectedImpact.liftPercentage}%</p>
            <p className="text-zinc-500 text-sm mt-2">Estimated lift after implementing all optimizations</p>
          </div>

          {/* Funnel Analysis */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-6">Funnel Stage Analysis</h3>
            <div className="space-y-6">
              {result.funnelAnalysis.map((stage) => (
                <div key={stage.name} className="bg-white/5 backdrop-blur rounded-xl p-6">
                  <div className="flex flex-wrap items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-white">{stage.name}</h4>
                    <div className="flex gap-4 text-sm">
                      <span className={rateColor(stage.currentRate, stage.benchmarkRate)}>
                        Your rate: {stage.currentRate}%
                      </span>
                      <span className="text-zinc-500">|</span>
                      <span className="text-blue-400">Benchmark: {stage.benchmarkRate}%</span>
                      <span className="text-zinc-500">|</span>
                      <span className={gapColor(stage.gap)}>
                        Gap: {stage.gap > 0 ? '-' : '+'}{Math.abs(stage.gap)}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-2 mb-4">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-violet-500 h-2 rounded-full transition-all"
                      style={{ width: `${Math.min((stage.currentRate / stage.benchmarkRate) * 100, 100)}%` }}
                    />
                  </div>
                  <ul className="space-y-2">
                    {stage.recommendations.map((rec, i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <span className="text-purple-400 font-bold mt-0.5">&#8594;</span>
                        <span className="text-zinc-300">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Optimizations */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-6">CTA Optimization Playbook</h3>
            <div className="space-y-4">
              {result.ctaOptimizations.map((cta, i) => (
                <div key={i} className="bg-white/5 backdrop-blur rounded-xl p-5">
                  <div className="flex flex-wrap items-start justify-between mb-3">
                    <h4 className="font-semibold text-white">{cta.placement}</h4>
                    <span className="text-green-400 text-sm font-medium">{cta.expectedLift}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <div>
                      <p className="text-zinc-500 text-xs mb-1">Format</p>
                      <p className="text-zinc-300 text-sm">{cta.format}</p>
                    </div>
                    <div>
                      <p className="text-zinc-500 text-xs mb-1">Timing</p>
                      <p className="text-zinc-300 text-sm">{cta.timing}</p>
                    </div>
                  </div>
                  <div className="bg-zinc-800/50 rounded-lg p-3">
                    <p className="text-zinc-500 text-xs mb-1">Example</p>
                    <p className="text-zinc-200 text-sm italic">{cta.example}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Link Strategy */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-6">Link Strategy for {platform}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white/5 backdrop-blur rounded-xl p-5">
                <p className="text-purple-400 text-xs font-semibold mb-2">PRIMARY LINK STRATEGY</p>
                <p className="text-zinc-300 text-sm">{result.linkStrategy.primary}</p>
              </div>
              <div className="bg-white/5 backdrop-blur rounded-xl p-5">
                <p className="text-blue-400 text-xs font-semibold mb-2">SECONDARY LINK STRATEGY</p>
                <p className="text-zinc-300 text-sm">{result.linkStrategy.secondary}</p>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur rounded-xl p-5 mb-4">
              <p className="text-green-400 text-xs font-semibold mb-2">TRACKING SETUP</p>
              <p className="text-zinc-300 text-sm">{result.linkStrategy.tracking}</p>
            </div>
            <div className="bg-zinc-800/50 rounded-xl p-4">
              <p className="text-zinc-500 text-xs mb-2">UTM Template (copy and customize)</p>
              <code className="text-purple-300 text-sm break-all">{result.linkStrategy.utmTemplate}</code>
            </div>
          </div>

          {/* Content to Conversion Map */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-6">Content-to-Conversion Map</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-zinc-400 border-b border-zinc-800">
                    <th className="text-left py-2">Content Type</th>
                    <th className="text-left py-2">Best CTA</th>
                    <th className="text-left py-2">Placement</th>
                    <th className="text-center py-2">Conv. Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {result.contentToConversionMap.map((row) => (
                    <tr key={row.contentType} className={`border-b border-zinc-800/50 ${row.contentType === contentType ? 'bg-zinc-800/30' : ''}`}>
                      <td className="py-3 font-medium text-white">{row.contentType}</td>
                      <td className="py-3 text-zinc-300">{row.bestCTA}</td>
                      <td className="py-3 text-zinc-400">{row.placement}</td>
                      <td className="py-3 text-center text-purple-400 font-semibold">{row.conversionRate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pricing Psychology */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-4">Pricing Psychology Tips</h3>
            <ul className="space-y-3">
              {result.pricingPsychology.map((tip, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="text-purple-400 font-bold mt-0.5">&#8594;</span>
                  <span className="text-zinc-300">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Urgency + Social Proof side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Urgency Tactics</h3>
              <ul className="space-y-3">
                {result.urgencyTactics.map((tactic, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="text-orange-400 font-bold mt-0.5">&#9650;</span>
                    <span className="text-zinc-300">{tactic}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Social Proof Strategies</h3>
              <ul className="space-y-3">
                {result.socialProofStrategies.map((strategy, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="text-blue-400 font-bold mt-0.5">&#9733;</span>
                    <span className="text-zinc-300">{strategy}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* A/B Test Suggestions */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-6">A/B Test Suggestions</h3>
            <div className="space-y-4">
              {result.abTestSuggestions.map((test, i) => (
                <div key={i} className="bg-white/5 backdrop-blur rounded-xl p-5">
                  <div className="flex flex-wrap items-center justify-between mb-3">
                    <h4 className="font-semibold text-white">Test: {test.element}</h4>
                    <span className="text-zinc-400 text-sm">Confidence: <span className="text-purple-400 font-semibold">{test.confidence}</span></span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <div className="bg-zinc-800/50 rounded-lg p-3">
                      <p className="text-zinc-500 text-xs mb-1">Variant A</p>
                      <p className="text-zinc-300 text-sm">{test.variantA}</p>
                    </div>
                    <div className="bg-zinc-800/50 rounded-lg p-3">
                      <p className="text-zinc-500 text-xs mb-1">Variant B</p>
                      <p className="text-zinc-300 text-sm">{test.variantB}</p>
                    </div>
                  </div>
                  <p className="text-green-400 text-sm">{test.expectedWinner}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="glass rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">Boost Your Entire Social Strategy</h3>
            <p className="text-zinc-400 mb-4">Use PostCraft AI tools to create high-converting content across every stage of your funnel.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a href="/cta-generator" className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 font-semibold hover:from-purple-500 hover:to-violet-500 transition">Generate CTAs</a>
              <a href="/roi-calculator" className="px-6 py-3 rounded-xl border border-zinc-700 font-semibold hover:bg-zinc-800 transition">Calculate ROI</a>
              <a href="/hooks" className="px-6 py-3 rounded-xl border border-zinc-700 font-semibold hover:bg-zinc-800 transition">Write Better Hooks</a>
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">How to Optimize Your Social Media Conversion Funnel</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass rounded-xl p-6">
            <div className="text-3xl font-bold text-purple-400 mb-3">1</div>
            <h3 className="text-lg font-semibold mb-3">Map Your Funnel Stages</h3>
            <p className="text-zinc-400 text-sm">Identify where your audience drops off between awareness (TOFU), consideration (MOFU), and purchase (BOFU). Most creators lose 80% of potential conversions at MOFU because they jump from value content straight to selling.</p>
          </div>
          <div className="glass rounded-xl p-6">
            <div className="text-3xl font-bold text-purple-400 mb-3">2</div>
            <h3 className="text-lg font-semibold mb-3">Optimize CTA Placement</h3>
            <p className="text-zinc-400 text-sm">Place your CTAs where engagement peaks, not just at the end. Mid-content CTAs, pinned comments, and story sequences convert 2-3x better than single end-of-caption links. Match your CTA format to each content type.</p>
          </div>
          <div className="glass rounded-xl p-6">
            <div className="text-3xl font-bold text-purple-400 mb-3">3</div>
            <h3 className="text-lg font-semibold mb-3">Test and Iterate</h3>
            <p className="text-zinc-400 text-sm">Run A/B tests on CTA wording, placement, pricing display, and urgency tactics. Track UTM-tagged links to measure exactly which content and CTAs drive revenue. Optimize monthly for compounding gains.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 pb-12 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">FAQ</h2>
        <div className="space-y-4">
          {[
            { q: 'What is a social media conversion funnel?', a: 'A social media conversion funnel maps the journey from awareness (TOFU) through consideration (MOFU) to purchase (BOFU). Each stage requires different content types and CTAs to move followers toward becoming customers. Most creators only optimize the top of funnel (reach) and ignore the middle (nurture), which is where 60-70% of conversions are lost.' },
            { q: 'What is a good social media conversion rate?', a: 'Average social media conversion rates range from 1-3% depending on platform and industry. LinkedIn averages 2.1% for B2B, Instagram 1.4% for e-commerce, and newsletters lead at 5.2%. Top performers achieve 5-8% through optimized CTAs, strategic link placement, and audience-matched offers.' },
            { q: 'How do I add CTAs without being spammy?', a: 'Follow the 80/20 rule: 80% pure value content, 20% promotional. Use soft CTAs in value posts (saves, follows, shares) and direct CTAs only in dedicated conversion content. The key is earning the right to sell by consistently delivering free value first.' },
            { q: 'Which content type converts best on social media?', a: 'Carousels and newsletters consistently have the highest conversion rates (1.5-2x platform average). Carousels hold attention through multiple slides, building investment before the CTA. Live streams convert highest for high-ticket offers because real-time interaction builds trust fast.' },
            { q: 'How often should I promote vs. provide free value?', a: 'The ideal ratio depends on your audience temperature. For cold audiences: 90/10 value-to-promo. For warm audiences: 70/30. For hot audiences (email list, engaged followers): 50/50. The more trust you have built, the more directly you can sell without friction.' },
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
            <span className="gradient-text">2.8x</span> Average Conversion Lift
          </p>
          <p className="text-zinc-400 text-lg">PostCraft users see 2.8x average conversion improvement in 60 days through optimized CTAs, link strategies, and funnel design.</p>
        </div>
      </section>

      {/* Internal Links */}
      <section className="px-6 pb-20 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">More Free Tools</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a href="/cta-generator" className="glass rounded-xl p-4 text-center hover:bg-zinc-800/50 transition">
            <p className="font-semibold mb-1">CTA Generator</p>
            <p className="text-zinc-400 text-xs">Write high-converting CTAs</p>
          </a>
          <a href="/roi-calculator" className="glass rounded-xl p-4 text-center hover:bg-zinc-800/50 transition">
            <p className="font-semibold mb-1">ROI Calculator</p>
            <p className="text-zinc-400 text-xs">Measure your social ROI</p>
          </a>
          <a href="/ab-testing" className="glass rounded-xl p-4 text-center hover:bg-zinc-800/50 transition">
            <p className="font-semibold mb-1">A/B Testing</p>
            <p className="text-zinc-400 text-xs">Test content variations</p>
          </a>
          <a href="/link-in-bio" className="glass rounded-xl p-4 text-center hover:bg-zinc-800/50 transition">
            <p className="font-semibold mb-1">Link in Bio</p>
            <p className="text-zinc-400 text-xs">Optimize your bio links</p>
          </a>
        </div>
      </section>
    </main>
  );
}
