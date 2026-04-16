'use client';
import { useState } from 'react';

const journeyTypes = ['Awareness → Purchase', 'Free Trial → Paid', 'Subscriber → Advocate', 'Visitor → Lead', 'Lead → Customer', 'One-Time → Repeat'] as const;
const channels = ['Blog + Social', 'Email + Blog', 'Social + Ads', 'Content + Webinars', 'Podcast + Email', 'All Channels'] as const;
const industries = ['Tech & SaaS', 'E-commerce & DTC', 'Healthcare', 'Finance & FinTech', 'Education', 'Agency & Consulting', 'Fitness & Wellness', 'Real Estate', 'Media & Publishing', 'Non-Profit'] as const;
const contentVolumes = ['< 50 pieces', '50-200 pieces', '200-500 pieces', '500+ pieces'] as const;

interface Touchpoint { step: number; content: string; channel: string; emotionalState: string; dropoffRate: string; timeToNext: string; optimization: string; }
interface ContentGap { gap: string; currentState: string; impact: string; suggestedContent: string; format: string; priority: string; }
interface AttributionInsight { content: string; firstTouch: string; assistedConversions: string; lastTouch: string; trueValue: string; recommendation: string; }
interface VelocityMetric { segment: string; avgTouchpoints: number; avgDaysToConvert: number; fastestPath: string; bottleneck: string; acceleration: string; }
interface JourneyAnomaly { anomaly: string; description: string; affectedSegment: string; impact: string; action: string; }

interface JourneyReport {
  journeyEfficiency: number;
  avgTouchpoints: number;
  avgDaysToConvert: number;
  touchpoints: Touchpoint[];
  gaps: ContentGap[];
  attribution: AttributionInsight[];
  velocity: VelocityMetric[];
  anomalies: JourneyAnomaly[];
  optimizations: string[];
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }

function mapJourney(journey: string, channel: string, industry: string, volume: string, brand: string): JourneyReport {
  const seed = hash(`${journey}-${channel}-${industry}-${volume}-${brand}`);
  const journeyEfficiency = 20 + seed % 70;
  const avgTouchpoints = 4 + seed % 8;
  const avgDaysToConvert = 7 + seed % 60;

  const touchpoints: Touchpoint[] = [
    { step: 1, content: 'Discovery content (blog post / social post / ad)', channel: channel.split(' + ')[0] || 'Social', emotionalState: 'Curious but uncommitted', dropoffRate: `${40 + seed % 25}%`, timeToNext: `${1 + seed % 3} days`, optimization: 'Add a compelling CTA to subscribe/follow — capture the curious before they forget' },
    { step: 2, content: 'Educational deep-dive (guide / video / webinar)', channel: channel.split(' + ')[1] || 'Blog', emotionalState: 'Interested, evaluating options', dropoffRate: `${30 + seed % 20}%`, timeToNext: `${2 + seed % 5} days`, optimization: 'Include comparison content and social proof at this stage — readers are weighing alternatives' },
    { step: 3, content: 'Social proof (case study / testimonial / review)', channel: 'Email + Social', emotionalState: 'Wanting validation from peers', dropoffRate: `${20 + seed % 15}%`, timeToNext: `${1 + seed % 4} days`, optimization: 'Feature customers in the same industry/size as the prospect — relevance drives trust' },
    { step: 4, content: 'Product experience (demo / free trial / sample)', channel: 'Website + Email', emotionalState: 'Ready to test but risk-averse', dropoffRate: `${25 + seed % 20}%`, timeToNext: `${3 + seed % 7} days`, optimization: 'Remove friction — no credit card required, quick setup guide, onboarding email sequence' },
    { step: 5, content: 'Decision content (pricing comparison / ROI calculator)', channel: 'Website', emotionalState: 'Comparing cost vs. value', dropoffRate: `${15 + seed % 15}%`, timeToNext: `${1 + seed % 3} days`, optimization: 'Show ROI calculator and "pay for itself" framing — make cost feel like investment' },
    { step: 6, content: 'Conversion trigger (limited offer / personal outreach)', channel: 'Email + Direct', emotionalState: 'Convinced but needs final push', dropoffRate: `${10 + seed % 10}%`, timeToNext: 'Immediate', optimization: 'Time-limited incentive + personal touch (founder email, 1:1 demo) closes the deal' },
  ];

  const gaps: ContentGap[] = [
    { gap: 'Between Awareness and Consideration', currentState: 'Blog posts drive traffic but no clear next step', impact: `${40 + seed % 25}% of visitors leave without engaging further`, suggestedContent: 'Create a "bridge" piece: blog post summary → email opt-in → nurture sequence', format: 'Lead magnet + email sequence', priority: 'P0' },
    { gap: 'Between Consideration and Decision', currentState: 'Good educational content but no comparison or pricing content', impact: `${30 + seed % 20}% of educated prospects research competitors instead`, suggestedContent: 'Add VS pages, pricing calculator, and "why switch" content', format: 'Landing page + interactive tool', priority: 'P0' },
    { gap: 'Between Trial and Paid', currentState: `Trial-to-paid conversion at ${5 + seed % 10}% (industry avg: ${10 + seed % 5}%)`, impact: 'Losing qualified users who never experience the "aha" moment', suggestedContent: 'Onboarding email sequence with use-case-specific tutorials', format: 'Email sequence (5-7 emails over 14 days)', priority: 'P1' },
    { gap: 'Between Purchase and Advocacy', currentState: 'No post-purchase content or referral program', impact: 'Missing word-of-mouth amplification — cheapest acquisition channel', suggestedContent: 'Customer success stories, referral incentives, community invitations', format: 'Email + in-app prompts', priority: 'P1' },
    { gap: 'Between Channels', currentState: `${channel} content doesn't cross-reference or link across channels`, impact: 'Siloed experience — users get stuck in one channel', suggestedContent: 'Add cross-channel CTAs: "Read the full guide on our blog" in social, "Follow for daily tips" in blog', format: 'Cross-channel CTAs and links', priority: 'P2' },
  ];

  const attribution: AttributionInsight[] = [
    { content: 'Top blog post (SEO traffic driver)', firstTouch: `${20 + seed % 30}% of conversions`, assistedConversions: `${30 + seed % 25}% of all journeys`, lastTouch: `${5 + seed % 10}% direct conversion`, trueValue: `$${(seed % 50 + 10) * 100}/mo in attributed revenue`, recommendation: 'This content drives 3x more value than last-click shows — increase investment' },
    { content: 'Email nurture sequence', firstTouch: `${5 + seed % 8}%`, assistedConversions: `${40 + seed % 20}% of journeys pass through email`, lastTouch: `${25 + seed % 20}%`, trueValue: `$${(seed % 40 + 20) * 100}/mo`, recommendation: 'Email is your highest-assist channel — optimize subject lines and sequence timing' },
    { content: 'Social media posts', firstTouch: `${25 + seed % 25}%`, assistedConversions: `${20 + seed % 15}%`, lastTouch: `${3 + seed % 5}%`, trueValue: `$${(seed % 30 + 5) * 100}/mo`, recommendation: 'Social drives awareness but rarely converts directly — value it for reach, not direct ROI' },
    { content: 'Case studies / testimonials', firstTouch: `${3 + seed % 5}%`, assistedConversions: `${35 + seed % 20}% of decision-stage journeys`, lastTouch: `${15 + seed % 15}%`, trueValue: `$${(seed % 60 + 15) * 100}/mo`, recommendation: 'Case studies punch above their weight — create 1 new case study per month minimum' },
    { content: 'Webinar / demo content', firstTouch: `${2 + seed % 3}%`, assistedConversions: `${15 + seed % 10}%`, lastTouch: `${30 + seed % 20}%`, trueValue: `$${(seed % 80 + 30) * 100}/mo`, recommendation: 'Webinars have the highest last-touch conversion — increase frequency to bi-weekly' },
  ];

  const velocity: VelocityMetric[] = [
    { segment: 'Fast converters (< 7 days)', avgTouchpoints: 3 + seed % 2, avgDaysToConvert: 2 + seed % 5, fastestPath: 'Ad → Landing page → Free trial → Purchase', bottleneck: 'None — these users know what they want', acceleration: 'Reduce friction: fewer form fields, instant access, skip onboarding option' },
    { segment: 'Standard converters (7-30 days)', avgTouchpoints: 5 + seed % 3, avgDaysToConvert: 10 + seed % 20, fastestPath: 'Blog → Email signup → Nurture → Demo → Purchase', bottleneck: `${seed % 2 === 0 ? 'Email to demo gap (avg 8 days)' : 'Blog to email signup (60% bounce)'}`, acceleration: `${seed % 2 === 0 ? 'Add automated demo booking in email sequence' : 'Improve blog CTAs and lead magnets'}` },
    { segment: 'Slow converters (30-90 days)', avgTouchpoints: 8 + seed % 4, avgDaysToConvert: 45 + seed % 45, fastestPath: 'Multiple blog visits → Social follow → Webinar → Email → Demo → Purchase', bottleneck: 'Too many touchpoints before commitment — need trust accelerators', acceleration: 'Add social proof earlier in journey — case studies at touchpoint 2, not touchpoint 5' },
    { segment: 'Lost prospects (abandoned)', avgTouchpoints: 2 + seed % 2, avgDaysToConvert: 0, fastestPath: 'Blog → Bounce (no capture)', bottleneck: 'No email capture — losing 70% of interested visitors forever', acceleration: 'Implement exit-intent capture, content upgrades, and retargeting pixels' },
  ];

  const anomalies: JourneyAnomaly[] = [
    { anomaly: 'Reverse funnel behavior', description: `${seed % 5 + 8}% of customers visit pricing before reading any content`, affectedSegment: 'Price-sensitive buyers', impact: 'These users need transparent pricing — hiding it loses them', action: 'Make pricing easily findable from every page — add to main nav' },
    { anomaly: 'Channel switching friction', description: 'Users who switch from social to website have 2x higher bounce rate', affectedSegment: 'Social-first audiences', impact: 'Website doesn\'t match the voice/tone of social content — jarring transition', action: 'Create social-specific landing pages that match the tone of the referring post' },
    { anomaly: 'Content overload stall', description: `Users who consume ${seed % 3 + 5}+ pieces convert less than those who consume 3-4`, affectedSegment: 'Research-heavy prospects', impact: 'Too much content creates analysis paralysis — more is not always better', action: 'Add "recommended next step" CTAs to guide instead of overwhelm' },
  ];

  const optimizations = [
    'Map every piece of content to a specific journey stage — unassigned content is wasted content',
    'Create "bridge content" between stages — the gap between awareness and consideration is where you lose the most prospects',
    `Reduce average touchpoints from ${avgTouchpoints} to ${Math.max(3, avgTouchpoints - 2)} by improving content quality at each stage`,
    `Speed up journey by ${seed % 20 + 10}% with automated email triggers based on content consumption signals`,
    'Implement multi-touch attribution — last-click is lying to you about what content actually drives revenue',
    'Add cross-channel CTAs to every piece — don\'t let users dead-end in a single channel',
    `Fix the biggest gap first: ${gaps[0].gap} — this is where you\'re losing ${gaps[0].impact}`,
    'Create a "fast path" for high-intent visitors — direct to demo/trial, skip the nurture sequence',
  ];

  return { journeyEfficiency, avgTouchpoints, avgDaysToConvert, touchpoints, gaps, attribution, velocity, anomalies, optimizations };
}

export default function ContentJourneyPage() {
  const [journey, setJourney] = useState(journeyTypes[0]);
  const [channel, setChannel] = useState(channels[0]);
  const [industry, setIndustry] = useState(industries[0]);
  const [volume, setVolume] = useState(contentVolumes[0]);
  const [brand, setBrand] = useState('');
  const [result, setResult] = useState<JourneyReport | null>(null);

  const handleGenerate = () => { if (brand.trim()) setResult(mapJourney(journey, channel, industry, volume, brand)); };
  const scoreColor = (n: number) => n >= 70 ? '#34d399' : n >= 50 ? '#a3e635' : n >= 30 ? '#fbbf24' : '#f87171';
  const prioColor = (p: string) => p === 'P0' ? '#f87171' : p === 'P1' ? '#fbbf24' : '#60a5fa';

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Content Journey Mapper</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Map the complete content journey from first touch to conversion. Identify gaps, bottlenecks, attribution blind spots, and velocity metrics — then optimize every touchpoint to accelerate conversions.</p>

        <div className="mb-4">
          <label className="block text-sm text-zinc-400 mb-1">Brand / Product</label>
          <input type="text" value={brand} onChange={e => setBrand(e.target.value)} placeholder="e.g., PostCraft, your SaaS product" className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-3 text-zinc-100" />
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {([
            { label: 'Journey Type', value: journey, setter: setJourney as (v: string) => void, options: journeyTypes as readonly string[] },
            { label: 'Primary Channels', value: channel, setter: setChannel as (v: string) => void, options: channels as readonly string[] },
            { label: 'Industry', value: industry, setter: setIndustry as (v: string) => void, options: industries as readonly string[] },
            { label: 'Content Volume', value: volume, setter: setVolume as (v: string) => void, options: contentVolumes as readonly string[] },
          ] as const).map(({ label, value, setter, options }) => (
            <div key={label}>
              <label className="block text-sm text-zinc-400 mb-1">{label}</label>
              <select value={value} onChange={e => setter(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100">
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
        <button onClick={handleGenerate} className="w-full md:w-auto bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded font-semibold hover:opacity-90 transition mb-8">Map Content Journey</button>

        {result && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold mb-1" style={{ color: scoreColor(result.journeyEfficiency) }}>{result.journeyEfficiency}%</div>
                <div className="text-zinc-400 text-sm">Journey Efficiency</div>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold mb-1 text-violet-400">{result.avgTouchpoints}</div>
                <div className="text-zinc-400 text-sm">Avg Touchpoints</div>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold mb-1 text-fuchsia-400">{result.avgDaysToConvert}d</div>
                <div className="text-zinc-400 text-sm">Avg Days to Convert</div>
              </div>
            </div>

            {/* Journey Touchpoints */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-violet-400">Journey Touchpoints</h3>
              <div className="space-y-3">
                {result.touchpoints.map((t, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3"><span className="text-violet-400 font-bold text-lg">{t.step}</span><span className="font-semibold text-zinc-200">{t.content}</span></div>
                      <span className="text-xs px-2 py-1 rounded bg-zinc-700 text-zinc-300">{t.channel}</span>
                    </div>
                    <div className="text-xs space-y-1">
                      <div className="flex gap-4"><span className="text-zinc-500">Emotion: {t.emotionalState}</span><span className="text-red-400/70">Dropoff: {t.dropoffRate}</span><span className="text-zinc-500">→ Next: {t.timeToNext}</span></div>
                      <div className="text-emerald-400/70">{t.optimization}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Gaps + Attribution */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-red-400">Content Gaps</h3>
                <div className="space-y-3">
                  {result.gaps.map((g, i) => (
                    <div key={i} className="bg-zinc-800/40 rounded-lg p-3 border border-zinc-700/50">
                      <div className="flex justify-between mb-1"><span className="text-sm font-semibold text-zinc-200">{g.gap}</span><span className="text-xs px-2 py-0.5 rounded font-bold" style={{ color: prioColor(g.priority), background: `${prioColor(g.priority)}15` }}>{g.priority}</span></div>
                      <div className="text-xs space-y-0.5">
                        <div className="text-zinc-500">{g.currentState}</div>
                        <div className="text-red-400/60">Impact: {g.impact}</div>
                        <div className="text-emerald-400/70">{g.suggestedContent}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-amber-400">True Attribution</h3>
                <div className="space-y-3">
                  {result.attribution.map((a, i) => (
                    <div key={i} className="bg-zinc-800/40 rounded-lg p-3 border border-zinc-700/50">
                      <div className="text-sm font-semibold text-zinc-200 mb-1">{a.content}</div>
                      <div className="text-xs space-y-0.5">
                        <div className="flex gap-3"><span className="text-zinc-500">1st: {a.firstTouch}</span><span className="text-zinc-500">Assist: {a.assistedConversions}</span><span className="text-zinc-500">Last: {a.lastTouch}</span></div>
                        <div className="text-amber-400/70">True value: {a.trueValue}</div>
                        <div className="text-emerald-400/70">{a.recommendation}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Velocity + Anomalies */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-emerald-400">Conversion Velocity</h3>
                <div className="space-y-3">
                  {result.velocity.map((v, i) => (
                    <div key={i} className="bg-zinc-800/40 rounded-lg p-3 border border-zinc-700/50">
                      <div className="text-sm font-semibold text-zinc-200 mb-1">{v.segment}</div>
                      <div className="text-xs space-y-0.5">
                        <div className="flex gap-3"><span className="text-zinc-500">{v.avgTouchpoints} touches</span><span className="text-zinc-500">{v.avgDaysToConvert}d to convert</span></div>
                        <div className="text-zinc-400">Path: {v.fastestPath}</div>
                        <div className="text-red-400/60">Bottleneck: {v.bottleneck}</div>
                        <div className="text-emerald-400/70">{v.acceleration}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-fuchsia-400">Journey Anomalies</h3>
                <div className="space-y-3">
                  {result.anomalies.map((a, i) => (
                    <div key={i} className="bg-zinc-800/40 rounded-lg p-3 border border-zinc-700/50">
                      <div className="text-sm font-semibold text-zinc-200 mb-1">{a.anomaly}</div>
                      <div className="text-xs space-y-0.5">
                        <div className="text-zinc-400">{a.description}</div>
                        <div className="text-zinc-500">Segment: {a.affectedSegment}</div>
                        <div className="text-red-400/60">{a.impact}</div>
                        <div className="text-emerald-400/70">{a.action}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Optimizations */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-emerald-400">Journey Optimizations</h3>
              <div className="space-y-2">{result.optimizations.map((o, i) => <div key={i} className="text-sm text-zinc-400 flex gap-2"><span className="text-emerald-400 shrink-0">{i + 1}.</span>{o}</div>)}</div>
            </div>

            <div className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">See the Full Picture</h3>
              <p className="text-zinc-400 mb-4">PostCraft AI maps every touchpoint from first click to conversion. Pair with <a href="/intent-flow" className="text-violet-400 underline">Intent Flow</a>, <a href="/funnel-builder" className="text-violet-400 underline">Funnel Builder</a>, and <a href="/conversion-optimizer" className="text-violet-400 underline">Conversion Optimizer</a>.</p>
              <a href="/pricing" className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">Get PostCraft Pro</a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
