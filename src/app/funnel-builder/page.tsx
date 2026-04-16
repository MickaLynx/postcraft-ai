'use client';
import { useState } from 'react';

// Option arrays (as const)
const funnelStages = ['Awareness (TOFU)', 'Consideration (MOFU)', 'Conversion (BOFU)', 'Retention', 'Advocacy'] as const;
const contentFormats = ['Short Video', 'Long-form Post', 'Carousel', 'Story/Reel', 'Live Stream', 'Newsletter', 'Infographic', 'Podcast Clip', 'Webinar Teaser', 'Case Study'] as const;
const industries = ['SaaS/Tech', 'E-commerce', 'Healthcare', 'Finance', 'Education', 'Real Estate', 'Food & Beverage', 'Fashion/Beauty'] as const;
const platforms = ['Instagram', 'LinkedIn', 'Twitter/X', 'TikTok', 'YouTube', 'Facebook', 'Newsletter', 'Blog'] as const;
const goals = ['Lead Generation', 'Brand Awareness', 'Direct Sales', 'Community Growth', 'Thought Leadership', 'Product Launch', 'Event Promotion', 'Customer Retention'] as const;
const audiences = ['Cold Traffic', 'Warm Leads', 'Hot Prospects', 'Existing Customers', 'Brand Advocates', 'Competitor Audience'] as const;

// Result interfaces
interface FunnelStageContent {
  stage: string;
  contentIdeas: string[];
  hooks: string[];
  ctas: string[];
  kpis: string[];
}

interface ContentJourney {
  touchpoint: string;
  format: string;
  message: string;
  conversionGoal: string;
  estimatedConversionRate: number;
}

interface RetargetingStrategy {
  trigger: string;
  audience: string;
  content: string;
  timing: string;
  expectedROI: string;
}

interface LeadMagnet {
  type: string;
  title: string;
  description: string;
  funnelPosition: string;
  captureMethod: string;
}

interface FunnelMetric {
  metric: string;
  benchmark: string;
  target: string;
  measurement: string;
  optimizationTip: string;
}

interface FunnelResult {
  funnelScore: number;
  estimatedConversionRate: number;
  stageContents: FunnelStageContent[];
  contentJourneys: ContentJourney[];
  retargetingStrategies: RetargetingStrategy[];
  leadMagnets: LeadMagnet[];
  funnelMetrics: FunnelMetric[];
  topOfFunnelHook: string;
  bottomOfFunnelCTA: string;
}

// Utility functions
function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }
function pick<T>(arr: readonly T[] | T[], seed: number, idx: number = 0): T { return arr[(seed + idx) % arr.length]; }

// Large data arrays for generation
const contentIdeasPool = [
  'Behind-the-scenes look at your process',
  '3 myths about [industry] debunked',
  'Customer success story with real metrics',
  'Quick tip carousel with actionable advice',
  'Day-in-the-life content showing brand personality',
  'Comparison post: old way vs new way',
  'Mini tutorial solving a specific pain point',
  'User-generated content compilation',
  'Industry trend analysis with your hot take',
  'Before/after transformation showcase',
  'Common mistakes your audience makes',
  'Expert interview snippet or quote card',
  'Product demo in under 60 seconds',
  'FAQ response turned into educational content',
  'Controversial opinion that sparks discussion',
  'Step-by-step guide with numbered slides',
  'Seasonal content tied to current events',
  'Free resource announcement with preview',
  'Team spotlight building trust and relatability',
  'Data visualization from your own analytics',
];

const hooksPool = [
  'Stop scrolling if you want to [benefit]...',
  'Nobody tells you this about [topic], but...',
  'I wasted $10K before discovering this simple trick',
  'The #1 reason your [thing] is not working',
  'POV: You just discovered the secret to [outcome]',
  'Here is what [industry] leaders do differently',
  'This changed everything for our business',
  'You are leaving money on the table if you ignore this',
  'Unpopular opinion: [contrarian take]',
  'We analyzed 1,000 [things] and here is what we found',
  'The 3-second test that reveals your biggest gap',
  'What I wish someone told me before I started',
];

const ctasPool = [
  'Download our free guide (link in bio)',
  'Comment "FUNNEL" to get the full strategy',
  'Save this for later and share with your team',
  'Book a free strategy call today',
  'Try it free for 14 days - no credit card needed',
  'DM us "READY" to get started',
  'Click the link to unlock your custom plan',
  'Tag someone who needs to see this',
  'Follow for daily [industry] tips',
  'Join 10,000+ in our free community',
  'Grab the template before we take it down',
  'Start your free trial - link in bio',
];

const kpisPool = [
  'Impressions & Reach',
  'Engagement Rate (likes/comments/shares)',
  'Click-Through Rate (CTR)',
  'Cost Per Click (CPC)',
  'Lead Capture Rate',
  'Email Signup Rate',
  'Time on Page',
  'Video Watch-Through Rate',
  'Conversion Rate',
  'Customer Acquisition Cost (CAC)',
  'Return on Ad Spend (ROAS)',
  'Lifetime Value (LTV)',
  'Net Promoter Score (NPS)',
  'Social Share Rate',
  'Follower Growth Rate',
];

const journeyMessages = [
  'Introduce the problem your audience faces in a relatable, visual way',
  'Share educational content that positions your brand as the go-to expert',
  'Present social proof and testimonials that eliminate buying objections',
  'Offer a time-sensitive incentive to drive immediate action',
  'Deliver unexpected value post-purchase to build loyalty',
  'Invite satisfied customers to share their experience publicly',
  'Provide exclusive insider access for your most engaged followers',
  'Retarget engaged users with case studies matching their pain points',
  'Send personalized follow-ups based on content interaction patterns',
  'Create FOMO through limited availability or early access programs',
];

const conversionGoals = [
  'Awareness: Maximize reach and impressions',
  'Engagement: Drive comments and saves',
  'Traffic: Send to landing page',
  'Lead: Capture email or phone',
  'Sale: Drive purchase or signup',
  'Upsell: Increase average order value',
  'Referral: Generate word-of-mouth',
  'Review: Collect social proof',
];

const retargetingTriggers = [
  'Viewed product page but did not purchase',
  'Watched 75%+ of video content',
  'Clicked CTA but abandoned form',
  'Engaged with 3+ posts in 7 days',
  'Opened email but did not click',
  'Added to cart but did not checkout',
  'Visited pricing page twice',
  'Downloaded lead magnet',
];

const retargetingTimings = [
  'Within 24 hours of trigger',
  '48-72 hours after initial engagement',
  '1 week follow-up sequence',
  '14-day nurture drip',
  '30-day re-engagement campaign',
  'Real-time dynamic retargeting',
];

const retargetingROIs = [
  '3.2x average return on spend',
  '2.8x with 15% conversion lift',
  '4.1x for warm audience segments',
  '5.5x on high-intent retargeting',
  '2.1x with gradual trust building',
  '3.7x through personalized sequences',
];

const leadMagnetTypes = ['Checklist', 'Template', 'Mini-Course', 'Calculator', 'Swipe File', 'Webinar Replay', 'Free Trial', 'Case Study PDF', 'Audit/Assessment', 'Community Access'];
const leadMagnetTitles = [
  'The Ultimate [Industry] Funnel Checklist',
  '30-Day Content Calendar Template',
  'Free 5-Day [Skill] Masterclass',
  'ROI Calculator for [Service]',
  '50 High-Converting Hook Templates',
  '[Topic] Strategy Webinar Recording',
  '14-Day Full Access Trial',
  'How [Brand] Grew 300% Case Study',
  'Free [Industry] Performance Audit',
  'Exclusive [Topic] Mastermind Group',
];
const captureMethods = [
  'Landing page with email gate',
  'Instagram DM automation',
  'LinkedIn lead gen form',
  'Chatbot conversation flow',
  'In-content popup with exit intent',
  'Comment trigger + DM sequence',
  'QR code on video overlay',
  'Pinned comment with link',
];

const metricNames = ['Funnel Velocity', 'Stage Conversion Rate', 'Content Attribution Score', 'Engagement-to-Lead Ratio', 'Retargeting Efficiency', 'Lead-to-Customer Rate', 'Content ROI Score', 'Audience Quality Index'];
const benchmarks = ['Industry avg: 2.3%', 'Top 10%: 5.8%', 'Median: 3.1%', 'Industry avg: 1.7%', 'Top performers: 4.2%', 'Average: 12%', 'Baseline: 2.5x', 'Standard: 65/100'];
const targets = ['Target: 4.5%+ for competitive edge', 'Aim for: 7.2% within 90 days', 'Goal: 5.0% by end of quarter', 'Target: 3.5% with nurture sequence', 'Aim for: 6.0%+ with retargeting', 'Goal: 18% with optimized funnel', 'Target: 4.0x within 6 months', 'Goal: 80/100 with content mix'];
const measurements = ['Track via UTM parameters + analytics dashboard', 'Monitor weekly via funnel stage reports', 'Measure through multi-touch attribution model', 'Calculate using engagement/lead ratio formula', 'Track through pixel-based retargeting analytics', 'Measure via CRM pipeline stage tracking', 'Calculate content spend vs revenue generated', 'Score based on engagement depth + demographics'];
const optimizationTips = [
  'A/B test CTAs at each stage to find highest converters',
  'Reduce friction by removing unnecessary form fields',
  'Use video testimonials at MOFU to boost trust by 32%',
  'Implement exit-intent offers to capture abandoning visitors',
  'Segment retargeting audiences by engagement level for 2x ROI',
  'Add urgency elements to BOFU content for 18% conversion lift',
  'Personalize content by industry vertical for 45% higher engagement',
  'Shorten time-to-value in onboarding for 25% better retention',
];

const topHooks = [
  'Your marketing funnel has a leak - and it is costing you 67% of potential revenue. Here is how to fix it.',
  'We mapped 500+ successful funnels and found the 3 content types that drive 80% of conversions.',
  'Stop creating random content. Start building a strategic funnel that turns followers into customers.',
  'The difference between a $10K month and a $100K month? A content funnel that actually converts.',
  'Most brands lose prospects at Stage 2. Here is the exact content sequence that keeps them moving forward.',
  'What if every piece of content you posted had a strategic purpose in your sales funnel?',
  'Cold traffic to paying customer in 7 touchpoints - here is the content blueprint.',
  'Your competitors are running funnels. You are posting randomly. Let us fix that today.',
];

const bottomCTAs = [
  'Ready to build a content funnel that converts? Start your free PostCraft trial today.',
  'Stop guessing. Start strategizing. Get your custom funnel blueprint now.',
  'Turn your content into a conversion machine. Try PostCraft AI free for 14 days.',
  'Your funnel strategy is one click away. Generate yours with PostCraft AI.',
  'Join 15,000+ marketers building smarter funnels. Get started free.',
  'From awareness to advocacy in one platform. Explore PostCraft AI tools.',
  'Map your entire content funnel in minutes. No credit card required.',
  'Every follower is a potential customer. Build the bridge with PostCraft AI.',
];

function generateFunnelPlan(
  stage: string,
  format: string,
  industry: string,
  platform: string,
  goal: string,
  audience: string,
  description: string,
): FunnelResult {
  const seed = hash(`${stage}-${format}-${industry}-${platform}-${goal}-${audience}-${description}`);

  const funnelScore = 48 + seed % 49;
  const estimatedConversionRate = parseFloat((1.2 + ((seed * 3) % 58) / 10).toFixed(1));

  const stageContents: FunnelStageContent[] = funnelStages.map((s, i) => ({
    stage: s,
    contentIdeas: Array.from({ length: 3 }, (_, j) => pick(contentIdeasPool, seed, i * 7 + j * 3)),
    hooks: Array.from({ length: 2 }, (_, j) => pick(hooksPool, seed, i * 5 + j * 4)),
    ctas: Array.from({ length: 2 }, (_, j) => pick(ctasPool, seed, i * 4 + j * 5)),
    kpis: Array.from({ length: 3 }, (_, j) => pick(kpisPool, seed, i * 6 + j * 2)),
  }));

  const contentJourneys: ContentJourney[] = Array.from({ length: 7 }, (_, i) => ({
    touchpoint: `Touchpoint ${i + 1}: ${pick([...funnelStages], seed, i * 2)}`,
    format: pick([...contentFormats], seed, i * 3),
    message: pick(journeyMessages, seed, i * 4),
    conversionGoal: pick(conversionGoals, seed, i * 5),
    estimatedConversionRate: parseFloat((0.8 + ((seed + i * 17) % 72) / 10).toFixed(1)),
  }));

  const retargetingStrategies: RetargetingStrategy[] = Array.from({ length: 5 }, (_, i) => ({
    trigger: pick(retargetingTriggers, seed, i * 3),
    audience: pick([...audiences], seed, i * 4),
    content: pick(contentIdeasPool, seed, i * 6 + 2),
    timing: pick(retargetingTimings, seed, i * 2),
    expectedROI: pick(retargetingROIs, seed, i * 5),
  }));

  const leadMagnets: LeadMagnet[] = Array.from({ length: 5 }, (_, i) => ({
    type: pick(leadMagnetTypes, seed, i * 3),
    title: pick(leadMagnetTitles, seed, i * 4),
    description: `A high-value ${pick(leadMagnetTypes, seed, i * 3).toLowerCase()} designed for ${pick([...audiences], seed, i * 2).toLowerCase()} in the ${pick([...industries], seed, i).toLowerCase()} space`,
    funnelPosition: pick([...funnelStages], seed, i * 5),
    captureMethod: pick(captureMethods, seed, i * 6),
  }));

  const funnelMetrics: FunnelMetric[] = Array.from({ length: 6 }, (_, i) => ({
    metric: pick(metricNames, seed, i * 2),
    benchmark: pick(benchmarks, seed, i * 3),
    target: pick(targets, seed, i * 4),
    measurement: pick(measurements, seed, i * 5),
    optimizationTip: pick(optimizationTips, seed, i * 6),
  }));

  return {
    funnelScore,
    estimatedConversionRate,
    stageContents,
    contentJourneys,
    retargetingStrategies,
    leadMagnets,
    funnelMetrics,
    topOfFunnelHook: pick(topHooks, seed, 0),
    bottomOfFunnelCTA: pick(bottomCTAs, seed, 1),
  };
}

export default function FunnelBuilderPage() {
  const [stage, setStage] = useState<string>(funnelStages[0]);
  const [format, setFormat] = useState<string>(contentFormats[0]);
  const [industry, setIndustry] = useState<string>(industries[0]);
  const [platform, setPlatform] = useState<string>(platforms[0]);
  const [goal, setGoal] = useState<string>(goals[0]);
  const [audience, setAudience] = useState<string>(audiences[0]);
  const [description, setDescription] = useState<string>('');
  const [result, setResult] = useState<FunnelResult | null>(null);

  const handleGenerate = () => setResult(generateFunnelPlan(stage, format, industry, platform, goal, audience, description));
  const scoreColor = (n: number) => n > 75 ? '#34d399' : n > 55 ? '#fbbf24' : n > 35 ? '#fb923c' : '#f87171';

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Social Media Funnel Builder</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Map your social media content to marketing funnel stages (TOFU/MOFU/BOFU). Generate a complete conversion-optimized content strategy with retargeting sequences, lead magnets, and funnel metrics.</p>

        {/* Form selects */}
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          {[
            { label: 'Primary Funnel Stage', value: stage, setter: setStage, options: funnelStages },
            { label: 'Content Format', value: format, setter: setFormat, options: contentFormats },
            { label: 'Industry', value: industry, setter: setIndustry, options: industries },
            { label: 'Platform', value: platform, setter: setPlatform, options: platforms },
            { label: 'Campaign Goal', value: goal, setter: setGoal, options: goals },
            { label: 'Target Audience', value: audience, setter: setAudience, options: audiences },
          ].map(({ label, value, setter, options }) => (
            <div key={label}>
              <label className="text-xs text-zinc-400 mb-1 block">{label}</label>
              <select value={value} onChange={e => setter(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100">
                {options.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>

        {/* Textarea for product/service description */}
        <div className="mb-8">
          <label className="text-xs text-zinc-400 mb-1 block">Product / Service Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Describe your product or service to get a tailored funnel strategy..."
            className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100 h-24 resize-none"
          />
        </div>

        <button onClick={handleGenerate} className="btn-primary px-8 py-3 rounded-lg font-semibold text-lg w-full md:w-auto">Generate Funnel Strategy</button>

        {result && (
          <div className="space-y-8 mt-10 fade-in">
            {/* Score Overview */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 rounded-2xl p-6 border border-zinc-800 text-center">
                <div className="text-xs text-zinc-500 mb-2">Funnel Readiness Score</div>
                <div className="text-5xl font-bold mb-2" style={{ color: scoreColor(result.funnelScore) }}>{result.funnelScore}<span className="text-lg text-zinc-500">/100</span></div>
                <div className="w-full bg-zinc-800 rounded-full h-3"><div className="h-3 rounded-full" style={{ width: `${result.funnelScore}%`, background: `linear-gradient(90deg, ${scoreColor(result.funnelScore)}, #a78bfa)` }} /></div>
              </div>
              <div className="bg-zinc-900/60 rounded-2xl p-6 border border-zinc-800 text-center">
                <div className="text-xs text-zinc-500 mb-2">Estimated Conversion Rate</div>
                <div className="text-5xl font-bold mb-2" style={{ color: '#a78bfa' }}>{result.estimatedConversionRate}<span className="text-lg text-zinc-500">%</span></div>
                <div className="w-full bg-zinc-800 rounded-full h-3"><div className="h-3 rounded-full" style={{ width: `${Math.min(result.estimatedConversionRate * 10, 100)}%`, background: 'linear-gradient(90deg, #8b5cf6, #3b82f6)' }} /></div>
              </div>
            </div>

            {/* Top Hook & Bottom CTA */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 rounded-2xl p-5 border border-violet-500/30">
                <div className="text-xs text-violet-400 mb-2">Top-of-Funnel Hook</div>
                <p className="text-zinc-100 italic text-lg">&ldquo;{result.topOfFunnelHook}&rdquo;</p>
              </div>
              <div className="bg-zinc-900/60 rounded-2xl p-5 border border-fuchsia-500/30">
                <div className="text-xs text-fuchsia-400 mb-2">Bottom-of-Funnel CTA</div>
                <p className="text-zinc-100 italic text-lg">&ldquo;{result.bottomOfFunnelCTA}&rdquo;</p>
              </div>
            </div>

            {/* Funnel Stage Content Breakdown */}
            <div>
              <h2 className="text-xl font-bold text-zinc-100 mb-4">Funnel Stage Content Strategy</h2>
              <div className="space-y-4">
                {result.stageContents.map((sc, i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-2xl p-5 border border-zinc-700/50">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: `linear-gradient(135deg, #8b5cf6, #3b82f6)` }}>{i + 1}</span>
                      <span className="font-semibold text-zinc-100 text-lg">{sc.stage}</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-violet-400 mb-2 font-semibold uppercase tracking-wide">Content Ideas</div>
                        <ul className="space-y-1">{sc.contentIdeas.map((idea, j) => <li key={j} className="text-sm text-zinc-300 flex items-start gap-2"><span className="text-violet-500 mt-0.5">&#8226;</span>{idea}</li>)}</ul>
                      </div>
                      <div>
                        <div className="text-xs text-emerald-400 mb-2 font-semibold uppercase tracking-wide">Hooks</div>
                        <ul className="space-y-1">{sc.hooks.map((hook, j) => <li key={j} className="text-sm text-zinc-300 italic">&ldquo;{hook}&rdquo;</li>)}</ul>
                      </div>
                      <div>
                        <div className="text-xs text-fuchsia-400 mb-2 font-semibold uppercase tracking-wide">CTAs</div>
                        <ul className="space-y-1">{sc.ctas.map((cta, j) => <li key={j} className="text-sm text-zinc-300">{cta}</li>)}</ul>
                      </div>
                      <div>
                        <div className="text-xs text-blue-400 mb-2 font-semibold uppercase tracking-wide">KPIs to Track</div>
                        <ul className="space-y-1">{sc.kpis.map((kpi, j) => <li key={j} className="text-sm text-zinc-300 flex items-start gap-2"><span className="text-blue-500 mt-0.5">&#8226;</span>{kpi}</li>)}</ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Journey Map */}
            <div>
              <h2 className="text-xl font-bold text-zinc-100 mb-4">Content Journey Map</h2>
              <div className="space-y-3">
                {result.contentJourneys.map((cj, i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-2xl p-4 border border-zinc-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                        <span className="font-semibold text-zinc-100">{cj.touchpoint}</span>
                      </div>
                      <span className="text-sm font-mono" style={{ color: scoreColor(cj.estimatedConversionRate * 10) }}>{cj.estimatedConversionRate}% CVR</span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-2 text-sm">
                      <div><span className="text-zinc-500">Format:</span> <span className="text-violet-400">{cj.format}</span></div>
                      <div><span className="text-zinc-500">Goal:</span> <span className="text-emerald-400">{cj.conversionGoal}</span></div>
                      <div><span className="text-zinc-500">Message:</span> <span className="text-zinc-300">{cj.message}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Retargeting Strategies */}
            <div>
              <h2 className="text-xl font-bold text-zinc-100 mb-4">Retargeting Strategies</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {result.retargetingStrategies.map((rs, i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-2xl p-4 border border-zinc-700/50">
                    <div className="text-sm font-semibold text-fuchsia-400 mb-2">{rs.trigger}</div>
                    <div className="space-y-1 text-sm">
                      <div><span className="text-zinc-500">Audience:</span> <span className="text-zinc-300">{rs.audience}</span></div>
                      <div><span className="text-zinc-500">Content:</span> <span className="text-zinc-300">{rs.content}</span></div>
                      <div><span className="text-zinc-500">Timing:</span> <span className="text-violet-400">{rs.timing}</span></div>
                      <div><span className="text-zinc-500">Expected ROI:</span> <span className="text-emerald-400">{rs.expectedROI}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lead Magnets */}
            <div>
              <h2 className="text-xl font-bold text-zinc-100 mb-4">Lead Magnet Recommendations</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {result.leadMagnets.map((lm, i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-2xl p-4 border border-zinc-700/50">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-violet-600/30 text-violet-300 text-xs rounded-full font-semibold">{lm.type}</span>
                      <span className="px-2 py-0.5 bg-blue-600/30 text-blue-300 text-xs rounded-full font-semibold">{lm.funnelPosition}</span>
                    </div>
                    <div className="font-semibold text-zinc-100 mb-1">{lm.title}</div>
                    <p className="text-sm text-zinc-400 mb-2">{lm.description}</p>
                    <div className="text-xs text-zinc-500"><span className="text-emerald-400">Capture:</span> {lm.captureMethod}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Funnel Metrics Dashboard */}
            <div>
              <h2 className="text-xl font-bold text-zinc-100 mb-4">Funnel Metrics Dashboard</h2>
              <div className="space-y-3">
                {result.funnelMetrics.map((fm, i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-2xl p-4 border border-zinc-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-zinc-100">{fm.metric}</span>
                      <div className="flex gap-3">
                        <span className="text-xs px-2 py-0.5 bg-zinc-700 rounded-full text-zinc-400">{fm.benchmark}</span>
                        <span className="text-xs px-2 py-0.5 bg-violet-600/30 rounded-full text-violet-300">{fm.target}</span>
                      </div>
                    </div>
                    <p className="text-sm text-zinc-400 mb-1">{fm.measurement}</p>
                    <p className="text-sm text-emerald-400">{fm.optimizationTip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom CTA section */}
            <div className="rounded-2xl p-8 text-center" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(59,130,246,0.2))' }}>
              <h3 className="text-2xl font-bold mb-2">Build Funnels That Convert</h3>
              <p className="text-zinc-400 mb-4">Combine funnel strategy with our full suite of 110+ content tools for end-to-end marketing.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="/narrative-engine" className="text-violet-400 hover:text-violet-300 text-sm">Narrative Engine</a>
                <a href="/content-cascade" className="text-violet-400 hover:text-violet-300 text-sm">Content Cascade</a>
                <a href="/emotional-analyzer" className="text-violet-400 hover:text-violet-300 text-sm">Emotional Analyzer</a>
                <a href="/performance-predictor" className="text-violet-400 hover:text-violet-300 text-sm">Performance Predictor</a>
                <a href="/pricing" className="text-violet-400 hover:text-violet-300 text-sm">View Pricing</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
