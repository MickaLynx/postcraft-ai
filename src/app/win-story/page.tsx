'use client';
import { useState } from 'react';

const industries = ['Tech & SaaS', 'E-commerce & DTC', 'Healthcare', 'Finance & FinTech', 'Education & EdTech', 'Real Estate', 'Agency & Consulting', 'Manufacturing', 'Non-Profit', 'Food & Beverage', 'Travel & Hospitality', 'Fitness & Wellness'] as const;
const platforms = ['LinkedIn', 'Instagram', 'Twitter/X', 'Facebook', 'Website Case Study', 'Email Newsletter', 'All Platforms'] as const;
const storyFormats = ['Quick Stat Highlight', 'Before/After Transformation', 'Customer Quote Feature', 'Data-Driven Case Study', 'Video Testimonial Script', 'Carousel Story Arc'] as const;
const tones = ['Professional & Data-Driven', 'Inspiring & Emotional', 'Casual & Relatable', 'Bold & Celebratory', 'Humble & Grateful', 'Educational & Insightful'] as const;
const metricTypes = ['Revenue Growth', 'Cost Reduction', 'Time Saved', 'User/Customer Growth', 'Efficiency Improvement', 'Conversion Rate Increase', 'Customer Satisfaction', 'Market Share Gain'] as const;
const audiences = ['C-Suite & Executives', 'Small Business Owners', 'Marketing Teams', 'Product Teams', 'Sales Teams', 'General Public'] as const;

interface StoryVariant { platform: string; format: string; headline: string; body: string; cta: string; visualDirection: string; }
interface DataPoint { metric: string; before: string; after: string; improvement: string; context: string; }
interface QuoteSuggestion { quote: string; attribution: string; context: string; usageTip: string; }
interface DistributionPlan { channel: string; timing: string; format: string; audience: string; goal: string; }
interface StoryFramework { stage: string; content: string; emotionalGoal: string; proofPoint: string; }

interface WinStory {
  impactScore: number;
  variants: StoryVariant[];
  dataPoints: DataPoint[];
  quotes: QuoteSuggestion[];
  distribution: DistributionPlan[];
  framework: StoryFramework[];
  amplificationTips: string[];
  mistakes: string[];
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }

function generateWinStory(industry: string, platform: string, format: string, tone: string, metric: string, audience: string, customerName: string, metricValue: string): WinStory {
  const seed = hash(`${industry}-${platform}-${format}-${tone}-${metric}-${audience}-${customerName}-${metricValue}`);
  const score = 45 + seed % 50;

  const headlines = [
    `How ${customerName} achieved ${metricValue} ${metric.toLowerCase()} in 90 days`,
    `${customerName}: From struggling with ${industry.toLowerCase()} to ${metricValue} ${metric.toLowerCase()}`,
    `"We didn't think ${metricValue} was possible." — ${customerName}'s transformation story`,
    `The ${metricValue} story: Why ${customerName} is now an industry benchmark`,
    `${customerName} + PostCraft: ${metricValue} ${metric.toLowerCase()} that changed everything`,
    `Case study: ${customerName} proves that ${metric.toLowerCase()} is achievable for any ${industry.toLowerCase()} business`,
  ];
  const bodies = [
    `When ${customerName} came to us, they were like most ${industry.toLowerCase()} businesses — talented team, great product, but struggling to get the results they deserved. Fast forward 90 days: ${metricValue} ${metric.toLowerCase()}. Here's exactly how they did it (and how you can too).`,
    `The numbers speak for themselves. ${customerName} went from industry average to top 5% in their category. But the real story isn't the ${metricValue} — it's the system they built to make these results repeatable. Let me break it down.`,
    `Three months ago, ${customerName}'s team was spending 40+ hours/week on manual processes that delivered inconsistent results. Today? ${metricValue} ${metric.toLowerCase()} — with half the effort. This is the power of working smarter, not harder.`,
    `"We tried everything before this." When ${customerName} said that, we knew the stakes were high. They needed ${metricValue} ${metric.toLowerCase()} — not as a stretch goal, but as a business requirement. Here's the playbook that delivered.`,
    `Every success story starts with a moment of decision. For ${customerName}, it was the day they decided to stop accepting "good enough" and start building for ${metricValue}. This is their journey.`,
    `In ${industry.toLowerCase()}, ${metricValue} ${metric.toLowerCase()} sounds impossible. ${customerName} proved it's not. But they didn't do it with shortcuts — they did it with a systematic approach that any team can replicate.`,
  ];
  const ctas = [
    `Want results like ${customerName}? Let's talk → link in bio`,
    'Book a free strategy call — same playbook, your business → postcraft.ai',
    `Download the ${customerName} case study (free PDF) → link in comments`,
    `Ready for your own ${metricValue} story? Start your free trial today`,
    'Comment "PLAYBOOK" and I\'ll DM you the exact framework',
    `Join 500+ businesses getting results like ${customerName} → link in bio`,
  ];
  const visuals = [
    'Split-screen before/after with key metric in center, brand colors, clean typography',
    'Carousel: slide 1 = hook stat, slides 2-4 = journey, slide 5 = results, slide 6 = CTA',
    'Customer photo with quote overlay, metric badge in corner, subtle brand watermark',
    'Data visualization: line chart showing growth trajectory with key milestone callouts',
    'Video thumbnail: customer headshot, metric in bold, play button overlay',
    'Infographic timeline: problem → solution → results → next steps',
  ];
  const platformNames = ['LinkedIn', 'Instagram', 'Twitter/X', 'Website', 'Email', 'Facebook'];
  const formats = ['Long-form post', 'Carousel (6 slides)', 'Thread (5 tweets)', 'Case study page', 'Newsletter feature', 'Video post'];

  const variants: StoryVariant[] = Array.from({ length: 6 }, (_, i) => ({
    platform: platformNames[i],
    format: formats[i],
    headline: headlines[(seed + i * 2) % headlines.length],
    body: bodies[(seed + i * 3) % bodies.length],
    cta: ctas[(seed + i * 4) % ctas.length],
    visualDirection: visuals[(seed + i * 5) % visuals.length],
  }));

  const metricNames = ['Primary KPI', 'Revenue Impact', 'Time Efficiency', 'Cost Savings', 'Team Productivity', 'Customer Satisfaction'];
  const befores = ['12% avg', '$45K/month', '40 hrs/week manual', '$8,200/month overhead', '3 projects/quarter', '67 NPS score'];
  const afters = [metricValue, '$128K/month', '12 hrs/week automated', '$2,100/month overhead', '11 projects/quarter', '89 NPS score'];
  const improvements = [metricValue + ' improvement', '184% revenue increase', '70% time reduction', '74% cost reduction', '267% throughput increase', '+22 NPS points'];
  const contexts = [
    'Industry benchmark is 8-15% — this puts them in top 3% of performers',
    'Revenue growth outpaced industry average by 4.2x in same period',
    'Freed 28 hrs/week for strategic work that directly contributed to revenue growth',
    'Savings exceeded initial investment within first 45 days (ROI: 290%)',
    'Team capacity tripled without adding headcount — pure efficiency gain',
    'Moved from "detractor risk" zone to "promoter" category across all segments',
  ];

  const dataPoints: DataPoint[] = Array.from({ length: 5 }, (_, i) => ({
    metric: metricNames[(seed + i) % metricNames.length],
    before: befores[(seed + i * 2) % befores.length],
    after: afters[(seed + i * 3) % afters.length],
    improvement: improvements[(seed + i * 4) % improvements.length],
    context: contexts[(seed + i * 5) % contexts.length],
  }));

  const quoteTexts = [
    `"We went from hoping for growth to engineering it. ${metricValue} wasn't luck — it was the direct result of a systematic approach."`,
    `"The ROI was obvious within the first month. By month three, we were asking ourselves why we didn't do this sooner."`,
    `"What surprised me most wasn't the ${metricValue} — it was how simple the process became once we had the right framework."`,
    `"Our board asked us to present the methodology. When the CEO of a $50M company asks 'how did you do this?' — you know you've found something special."`,
    `"I was skeptical. I'd seen too many tools promise big and deliver nothing. This was the first time the results actually exceeded the pitch."`,
  ];
  const attributions = [
    `${customerName}, CEO`, `${customerName}, Head of Marketing`, `${customerName}, VP Growth`,
    `${customerName}, Founder`, `${customerName}, Director of Operations`,
  ];
  const quoteContexts = [
    'Said during quarterly board presentation — unsolicited endorsement',
    'From post-implementation interview at 90-day mark',
    'Shared publicly on LinkedIn — generated 200+ comments',
    'From internal team retrospective — approved for external use',
    'From NPS survey follow-up — highest score in company history',
  ];
  const usageTips = [
    'Best for LinkedIn posts and website testimonials — authority-building quote',
    'Great for email subject lines and ad copy — ROI-focused messaging',
    'Perfect for carousel final slides and landing page hero sections',
    'Use in sales decks and investor materials — third-party credibility',
    'Ideal for retargeting ads and email nurture sequences — skeptic-conversion quote',
  ];

  const quotes: QuoteSuggestion[] = Array.from({ length: 5 }, (_, i) => ({
    quote: quoteTexts[(seed + i) % quoteTexts.length],
    attribution: attributions[(seed + i * 2) % attributions.length],
    context: quoteContexts[(seed + i * 3) % quoteContexts.length],
    usageTip: usageTips[(seed + i * 4) % usageTips.length],
  }));

  const channels = ['LinkedIn organic', 'Email newsletter', 'Website case study page', 'Instagram carousel', 'Sales enablement deck', 'Retargeting ads', 'Twitter/X thread', 'YouTube short'];
  const timingOptions = ['Day 1: Soft launch', 'Day 3: Email blast', 'Day 5: Social push', 'Day 7: Partner amplification', 'Day 14: Paid boost', 'Day 21: Repurpose cycle', 'Day 30: Evergreen placement', 'Ongoing: Sales collateral'];
  const distFormats = ['Long-form post with data viz', 'Featured story with CTA button', 'Full case study with download', '6-slide visual carousel', 'One-pager PDF', 'Static + video ad creative', '5-tweet thread with metrics', '60-sec story highlight reel'];
  const distAudiences = ['Industry peers + prospects', 'Existing subscribers + leads', 'Organic search visitors', 'Followers + explore page', 'Sales team → prospects', 'Website visitors (retarget)', 'Tech/industry community', 'Video-first audience'];
  const goals = ['Thought leadership + lead gen', 'Nurture leads toward demo', 'SEO + conversion', 'Brand awareness + engagement', 'Accelerate deal velocity', 'Re-engage warm prospects', 'Community credibility', 'Reach new audience segment'];

  const distribution: DistributionPlan[] = Array.from({ length: 6 }, (_, i) => ({
    channel: channels[(seed + i) % channels.length],
    timing: timingOptions[(seed + i * 2) % timingOptions.length],
    format: distFormats[(seed + i * 3) % distFormats.length],
    audience: distAudiences[(seed + i * 4) % distAudiences.length],
    goal: goals[(seed + i * 5) % goals.length],
  }));

  const framework: StoryFramework[] = [
    { stage: 'Hook', content: `${customerName} achieved ${metricValue} ${metric.toLowerCase()} — and the method is simpler than you think.`, emotionalGoal: 'Curiosity + "Is this possible for me?"', proofPoint: `Lead with the headline metric: ${metricValue}` },
    { stage: 'Context', content: `Before: ${customerName} was facing the same challenges as every ${industry.toLowerCase()} business — scaling without burning out the team or the budget.`, emotionalGoal: 'Recognition — "That\'s exactly my situation"', proofPoint: 'Specific pain points that mirror the target audience' },
    { stage: 'Turning Point', content: `The moment that changed everything: ${customerName} decided to stop doing things the old way and commit to a systematic approach.`, emotionalGoal: 'Inspiration — "I could make that same decision"', proofPoint: 'The specific decision or action that started the transformation' },
    { stage: 'Method', content: 'The 3-step framework: 1) Audit current state. 2) Implement the system. 3) Measure and optimize weekly.', emotionalGoal: 'Clarity — "This is actionable and specific"', proofPoint: 'Step-by-step breakdown with timeline' },
    { stage: 'Results', content: `${metricValue} ${metric.toLowerCase()} in 90 days. But the real win was the compound effect — each month built on the last.`, emotionalGoal: 'Desire — "I want those results"', proofPoint: 'Month-over-month data showing compounding growth' },
    { stage: 'CTA', content: `${customerName}'s playbook is available to you. Same framework, your business, your results.`, emotionalGoal: 'Confidence — "This will work for me too"', proofPoint: 'Low-risk entry point: free trial, free call, or case study download' },
  ];

  const amplificationTips = [
    `Tag ${customerName} in the post — their reshare multiplies reach by 3-5x on average`,
    'Pin the case study post to the top of your LinkedIn/Twitter profile for 30 days',
    'Create a "Results" highlight on Instagram Stories with the best data points',
    'Include the win story in your email signature for 2 weeks after publishing',
    'Brief your sales team — give them the one-pager to share in outbound sequences',
    'Submit the case study to industry publications and award programs',
    'Create a 60-second video version for YouTube Shorts and TikTok',
    'Add the metric to your website hero section: "Trusted by companies achieving X"',
  ];

  const mistakes = [
    'Making it about your product instead of the customer\'s journey — they are the hero, you are the guide',
    'Using vague metrics ("significant improvement") instead of specific numbers ("+147% in 90 days")',
    'Forgetting to get written approval from the customer before publishing',
    'Only publishing once — win stories need at least 5 distribution touches across channels',
    'Ignoring the "before" — transformation requires contrast to create impact',
    'Writing for your team instead of your prospects — use language your buyer persona uses',
    'Skipping the emotional arc — data convinces the mind, story convinces the heart',
    'Not updating the story — revisit at 6 months and 12 months for compound results',
  ];

  return { impactScore: score, variants, dataPoints, quotes, distribution, framework, amplificationTips, mistakes };
}

export default function WinStoryPage() {
  const [industry, setIndustry] = useState(industries[0]);
  const [platform, setPlatform] = useState(platforms[0]);
  const [format, setFormat] = useState(storyFormats[0]);
  const [tone, setTone] = useState(tones[0]);
  const [metric, setMetric] = useState(metricTypes[0]);
  const [audience, setAudience] = useState(audiences[0]);
  const [customerName, setCustomerName] = useState('');
  const [metricValue, setMetricValue] = useState('');
  const [result, setResult] = useState<WinStory | null>(null);

  const handleGenerate = () => { if (customerName.trim() && metricValue.trim()) setResult(generateWinStory(industry, platform, format, tone, metric, audience, customerName, metricValue)); };
  const scoreColor = (n: number) => n > 75 ? '#34d399' : n > 55 ? '#fbbf24' : n > 35 ? '#fb923c' : '#f87171';

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Win Story Generator</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Turn customer success metrics into compelling social proof stories. Generate multi-platform narratives, data visualizations, quote packages, and distribution plans from one customer win.</p>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Customer / Company Name</label>
            <input type="text" value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder="e.g., Acme Corp" className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-3 text-zinc-100" />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Key Metric Result</label>
            <input type="text" value={metricValue} onChange={e => setMetricValue(e.target.value)} placeholder="e.g., +147%, 3x growth, $500K saved" className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-3 text-zinc-100" />
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {([
            { label: 'Industry', value: industry, setter: setIndustry as (v: string) => void, options: industries as readonly string[] },
            { label: 'Platform', value: platform, setter: setPlatform as (v: string) => void, options: platforms as readonly string[] },
            { label: 'Story Format', value: format, setter: setFormat as (v: string) => void, options: storyFormats as readonly string[] },
            { label: 'Tone', value: tone, setter: setTone as (v: string) => void, options: tones as readonly string[] },
            { label: 'Primary Metric', value: metric, setter: setMetric as (v: string) => void, options: metricTypes as readonly string[] },
            { label: 'Target Audience', value: audience, setter: setAudience as (v: string) => void, options: audiences as readonly string[] },
          ] as const).map(({ label, value, setter, options }) => (
            <div key={label}>
              <label className="block text-sm text-zinc-400 mb-1">{label}</label>
              <select value={value} onChange={e => setter(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100">
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
        <button onClick={handleGenerate} className="w-full md:w-auto bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded font-semibold hover:opacity-90 transition mb-8">Generate Win Story</button>

        {result && (
          <div className="space-y-8">
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 text-center">
              <div className="text-5xl font-bold mb-2" style={{ color: scoreColor(result.impactScore) }}>{result.impactScore}</div>
              <div className="text-zinc-400">Story Impact Score</div>
              <div className="mt-3 max-w-md mx-auto w-full bg-zinc-800 rounded-full h-3">
                <div className="h-3 rounded-full" style={{ width: `${result.impactScore}%`, background: scoreColor(result.impactScore) }} />
              </div>
            </div>

            {/* Story Framework */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Story Arc Framework</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {result.framework.map((f, i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700">
                    <div className="text-xs text-violet-400 font-semibold uppercase tracking-wider mb-1">Stage {i + 1}</div>
                    <div className="font-semibold text-zinc-200 mb-2">{f.stage}</div>
                    <div className="text-sm text-zinc-400 mb-2">{f.content}</div>
                    <div className="text-xs space-y-1">
                      <div><span className="text-zinc-500">Emotion:</span> <span className="text-yellow-400/70">{f.emotionalGoal}</span></div>
                      <div><span className="text-zinc-500">Proof:</span> <span className="text-emerald-400/70">{f.proofPoint}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Variants */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Platform-Specific Variants ({result.variants.length})</h3>
              <div className="space-y-4">
                {result.variants.map((v, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex gap-2 mb-2">
                      <span className="text-xs px-2 py-1 rounded bg-violet-400/10 text-violet-400 border border-violet-400/30">{v.platform}</span>
                      <span className="text-xs px-2 py-1 rounded bg-zinc-700 text-zinc-300">{v.format}</span>
                    </div>
                    <div className="font-semibold text-zinc-200 mb-1">{v.headline}</div>
                    <div className="text-sm text-zinc-400 mb-2">{v.body}</div>
                    <div className="text-sm space-y-1">
                      <div><span className="text-zinc-500">CTA:</span> <span className="text-emerald-400">{v.cta}</span></div>
                      <div><span className="text-zinc-500">Visual:</span> <span className="text-zinc-500 text-xs">{v.visualDirection}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Points */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Key Data Points</h3>
              <div className="space-y-3">
                {result.dataPoints.map((d, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="font-semibold text-zinc-200 mb-2">{d.metric}</div>
                    <div className="flex gap-6 mb-2 text-sm">
                      <div><span className="text-red-400/70">Before:</span> <span className="text-zinc-400">{d.before}</span></div>
                      <div className="text-zinc-600">→</div>
                      <div><span className="text-emerald-400">After:</span> <span className="text-zinc-200 font-semibold">{d.after}</span></div>
                      <div><span className="text-violet-400 font-bold">{d.improvement}</span></div>
                    </div>
                    <div className="text-xs text-zinc-500">{d.context}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quotes */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Quote Package</h3>
              <div className="space-y-4">
                {result.quotes.map((q, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border-l-4 border-violet-500">
                    <div className="text-zinc-200 italic mb-2">{q.quote}</div>
                    <div className="text-sm text-violet-400 font-medium mb-2">— {q.attribution}</div>
                    <div className="text-xs space-y-1">
                      <div><span className="text-zinc-500">Context:</span> <span className="text-zinc-400">{q.context}</span></div>
                      <div><span className="text-zinc-500">Best for:</span> <span className="text-emerald-400/70">{q.usageTip}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Distribution */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Distribution Plan</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="text-left text-zinc-500 border-b border-zinc-700"><th className="pb-2 pr-3">Channel</th><th className="pb-2 pr-3">Timing</th><th className="pb-2 pr-3">Format</th><th className="pb-2 pr-3">Audience</th><th className="pb-2">Goal</th></tr></thead>
                  <tbody>
                    {result.distribution.map((d, i) => (
                      <tr key={i} className="border-b border-zinc-800/50">
                        <td className="py-3 pr-3 text-violet-400 font-medium">{d.channel}</td>
                        <td className="py-3 pr-3 text-zinc-300">{d.timing}</td>
                        <td className="py-3 pr-3 text-zinc-400 text-xs">{d.format}</td>
                        <td className="py-3 pr-3 text-zinc-400 text-xs">{d.audience}</td>
                        <td className="py-3 text-emerald-400/70 text-xs">{d.goal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Amplification + Mistakes */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-emerald-400">Amplification Tips</h3>
                <div className="space-y-2">{result.amplificationTips.map((tip, i) => <div key={i} className="text-sm text-zinc-400 flex gap-2"><span className="text-emerald-400 shrink-0">→</span>{tip}</div>)}</div>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-red-400">Common Mistakes to Avoid</h3>
                <div className="space-y-2">{result.mistakes.map((m, i) => <div key={i} className="text-sm text-zinc-400 flex gap-2"><span className="text-red-400 shrink-0">✗</span>{m}</div>)}</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">Turn Every Customer Win Into Growth</h3>
              <p className="text-zinc-400 mb-4">Use PostCraft AI to transform metrics into compelling narratives. Pair with <a href="/social-proof" className="text-violet-400 underline">Social Proof</a>, <a href="/persona-builder" className="text-violet-400 underline">Persona Builder</a>, and <a href="/content-pillars" className="text-violet-400 underline">Content Pillars</a>.</p>
              <a href="/pricing" className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">Get PostCraft Pro</a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
