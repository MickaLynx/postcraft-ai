'use client';
import { useState } from 'react';

const industries = ['Tech & SaaS', 'E-commerce & DTC', 'Healthcare', 'Finance & FinTech', 'Education', 'Real Estate', 'Agency & Consulting', 'Manufacturing', 'Non-Profit', 'Food & Beverage', 'Travel & Hospitality', 'Fitness & Wellness'] as const;
const platforms = ['All Platforms', 'LinkedIn', 'Instagram', 'Twitter/X', 'TikTok', 'YouTube', 'Facebook', 'Email'] as const;
const goals = ['Brand Awareness', 'Lead Generation', 'Sales Conversion', 'Community Engagement', 'Thought Leadership', 'Customer Retention', 'Product Adoption', 'Upsell/Cross-sell'] as const;
const budgetLevels = ['Bootstrap ($0-500/mo)', 'Starter ($500-2K/mo)', 'Growth ($2K-10K/mo)', 'Scale ($10K-50K/mo)', 'Enterprise ($50K+/mo)'] as const;
const audienceSizes = ['1-1K followers', '1K-10K followers', '10K-50K followers', '50K-250K followers', '250K-1M followers', '1M+ followers'] as const;
const contentFrequencies = ['Daily', '3-5x/week', '1-2x/week', 'Bi-weekly', 'Monthly'] as const;

interface Segment {
  name: string;
  size: string;
  demographics: string;
  psychographics: string;
  behavior: string;
  contentPreference: string;
  bestPlatform: string;
  engagementStyle: string;
  buyingStage: string;
  priority: string;
  ltv: string;
  contentCadence: string;
}

interface PersonaCard {
  name: string;
  role: string;
  age: string;
  painPoints: string[];
  goals: string[];
  objections: string[];
  contentHooks: string[];
  bestTime: string;
  preferredFormat: string;
}

interface ChannelStrategy {
  channel: string;
  segmentFit: string;
  contentType: string;
  frequency: string;
  expectedCTR: string;
  budgetAllocation: string;
  kpi: string;
}

interface ContentMap {
  stage: string;
  segment: string;
  contentIdea: string;
  format: string;
  cta: string;
  metric: string;
}

interface GrowthTactic {
  tactic: string;
  targetSegment: string;
  effort: string;
  impact: string;
  timeline: string;
  expectedGrowth: string;
}

interface SegmentationResult {
  segments: Segment[];
  personas: PersonaCard[];
  channelStrategy: ChannelStrategy[];
  contentMap: ContentMap[];
  growthTactics: GrowthTactic[];
  overlapWarnings: string[];
  segmentHealthScore: number;
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }

function generateSegmentation(industry: string, platform: string, goal: string, budget: string, audienceSize: string, contentFreq: string, brandName: string): SegmentationResult {
  const seed = hash(`${industry}-${platform}-${goal}-${budget}-${audienceSize}-${contentFreq}-${brandName}`);

  const segmentNames = [
    ['Power Users', 'Casual Browsers', 'Decision Makers', 'Brand Advocates', 'Price Sensitives', 'Early Adopters'],
    ['Enterprise Buyers', 'SMB Owners', 'Solopreneurs', 'Tech Enthusiasts', 'Budget Watchers', 'Innovation Seekers'],
    ['Active Engagers', 'Silent Followers', 'Content Sharers', 'Conversion-Ready', 'Nurture Needed', 'Lapsed Users'],
  ];
  const names = segmentNames[seed % segmentNames.length];

  const segments: Segment[] = names.map((name, i) => {
    const s = (seed + i * 7) % 100;
    const sizes = ['8-12%', '15-22%', '25-35%', '10-15%', '18-25%', '5-8%'];
    const demos = [
      `Age 25-34, Urban, $60K-90K income, College+`,
      `Age 35-44, Suburban, $80K-120K income, Manager+`,
      `Age 22-30, Urban, $35K-55K income, Digital-first`,
      `Age 40-55, Mixed, $100K+, VP/C-level`,
      `Age 18-28, Urban, $25K-45K income, Mobile-first`,
      `Age 30-45, Urban, $70K-100K income, Tech-savvy`,
    ];
    const psychos = [
      'Values efficiency, data-driven decisions, prefers actionable content over theory',
      'Values community, social proof, prefers peer recommendations over brand messaging',
      'Values innovation, early adoption, prefers exclusive access and beta features',
      'Values ROI, bottom-line impact, prefers case studies and benchmarks',
      'Values simplicity, quick wins, prefers templates and checklists',
      'Values authenticity, mission-driven brands, prefers behind-the-scenes content',
    ];
    const behaviors = [
      `Visits 3-5x/week, avg session 4.2 min, 2.3 pages/visit, clicks CTAs 12% of visits`,
      `Visits 1-2x/week, avg session 2.1 min, 1.5 pages/visit, mostly reads headlines`,
      `Visits 2-3x/week, avg session 5.8 min, shares 15% of content consumed`,
      `Visits daily, avg session 6+ min, high comment rate, downloads resources`,
      `Visits weekly, avg session 1.8 min, high bounce rate on pricing pages`,
      `Visits monthly, avg session 3.5 min, re-engages through email mostly`,
    ];
    const prefs = [
      'Long-form guides, data reports, video tutorials (8-15 min)',
      'Short posts, infographics, quick tips (<2 min reads)',
      'Case studies, comparison posts, ROI calculators',
      'Carousels, behind-the-scenes, community Q&A',
      'Templates, checklists, how-to threads',
      'Podcasts, newsletter deep-dives, webinars',
    ];
    const bestPlats = ['LinkedIn', 'Instagram', 'Twitter/X', 'YouTube', 'TikTok', 'Email'];
    const engStyles = [
      'Comment debates, thoughtful replies, saves content for later',
      'Quick likes, occasional shares, rarely comments',
      'DM conversations, poll participation, user-generated content',
      'Long comment threads, tag friends, attend live events',
      'Repost with commentary, quote tweets, newsletter replies',
      'Silent consumption, email click-throughs, late-night browsing',
    ];
    const stages = ['Awareness', 'Consideration', 'Decision', 'Retention', 'Advocacy', 'Re-engagement'];
    const priorities = ['High', 'High', 'Medium', 'Medium', 'Low', 'Low'];
    const ltvs = ['$2,400-4,800/yr', '$1,200-2,400/yr', '$600-1,200/yr', '$4,800-12,000/yr', '$200-600/yr', '$800-2,000/yr'];
    const cadences = ['3-5 posts/week', '1-2 posts/week', 'Daily', '2-3 posts/week', 'Weekly', 'Bi-weekly'];

    return {
      name,
      size: sizes[i],
      demographics: demos[(i + seed) % demos.length],
      psychographics: psychos[(i + seed) % psychos.length],
      behavior: behaviors[(i + seed) % behaviors.length],
      contentPreference: prefs[(i + seed) % prefs.length],
      bestPlatform: bestPlats[(i + seed) % bestPlats.length],
      engagementStyle: engStyles[(i + seed) % engStyles.length],
      buyingStage: stages[i],
      priority: priorities[i],
      ltv: ltvs[(i + seed) % ltvs.length],
      contentCadence: cadences[(i + seed) % cadences.length],
    };
  });

  const personas: PersonaCard[] = [
    {
      name: 'Sarah the Strategist',
      role: `Marketing Director at mid-size ${industry.split(' ')[0]} company`,
      age: '32-38',
      painPoints: ['Content takes too long to produce', 'Can\'t prove ROI to leadership', 'Team is too small for the content volume needed'],
      goals: ['Scale content without scaling headcount', 'Build predictable content pipeline', 'Show measurable business impact'],
      objections: ['We tried AI tools before — output was generic', 'Our brand voice is too nuanced for automation', 'Budget is already allocated this quarter'],
      contentHooks: ['ROI case studies with real numbers', '"Before/After" workflow comparisons', 'Industry benchmark reports'],
      bestTime: 'Tue-Thu 7-9am, LinkedIn',
      preferredFormat: 'Long-form posts, carousels, video case studies',
    },
    {
      name: 'Marcus the Maker',
      role: `Solo creator / ${industry.split(' ')[0]} content entrepreneur`,
      age: '24-30',
      painPoints: ['Burnout from daily posting', 'Algorithm changes kill reach overnight', 'Monetization is inconsistent'],
      goals: ['Build a sustainable content engine', 'Diversify across platforms', 'Create passive income from content'],
      objections: ['I can\'t afford another subscription', 'I need to keep my authentic voice', 'Tools are overwhelming'],
      contentHooks: ['Creator economy stats and trends', 'Time-saving hacks with real examples', 'Platform algorithm decoded posts'],
      bestTime: 'Mon/Wed/Fri 12-2pm, Instagram/TikTok',
      preferredFormat: 'Reels, threads, quick tips, memes',
    },
    {
      name: 'Diana the Director',
      role: `VP of Growth at ${industry.split(' ')[0]} enterprise`,
      age: '40-50',
      painPoints: ['Content doesn\'t align with sales pipeline', 'Multiple teams, no unified voice', 'Compliance slows content approval'],
      goals: ['Unified brand across 10+ channels', 'Content that directly drives pipeline', 'Reduce approval bottlenecks'],
      objections: ['We need enterprise-grade security', 'Integration with our existing stack is critical', 'Need to prove value in 30-day pilot'],
      contentHooks: ['Enterprise transformation stories', 'Compliance-friendly content frameworks', 'Multi-team coordination templates'],
      bestTime: 'Tue-Thu 8-10am, LinkedIn/Email',
      preferredFormat: 'Whitepapers, webinars, executive briefs',
    },
  ];

  const channelStrategy: ChannelStrategy[] = [
    { channel: 'LinkedIn', segmentFit: segments[0].name, contentType: 'Thought leadership, case studies, data posts', frequency: '4-5x/week', expectedCTR: '2.8-4.2%', budgetAllocation: '30%', kpi: 'Lead gen form fills' },
    { channel: 'Instagram', segmentFit: segments[1].name, contentType: 'Carousels, Reels, Stories, UGC', frequency: '5-7x/week', expectedCTR: '1.5-3.0%', budgetAllocation: '25%', kpi: 'Engagement rate + saves' },
    { channel: 'Twitter/X', segmentFit: segments[2].name, contentType: 'Threads, hot takes, polls, quote tweets', frequency: '7-10x/week', expectedCTR: '1.2-2.5%', budgetAllocation: '15%', kpi: 'Retweets + profile visits' },
    { channel: 'TikTok', segmentFit: segments[4].name, contentType: 'Short tutorials, trends, behind-scenes', frequency: '3-5x/week', expectedCTR: '3.0-6.0%', budgetAllocation: '10%', kpi: 'Watch time + follows' },
    { channel: 'YouTube', segmentFit: segments[3].name, contentType: 'Tutorials, interviews, product demos', frequency: '1-2x/week', expectedCTR: '4.0-8.0%', budgetAllocation: '10%', kpi: 'Subscribers + watch hours' },
    { channel: 'Email', segmentFit: segments[5].name, contentType: 'Newsletter, drip sequences, re-engagement', frequency: '2-3x/week', expectedCTR: '2.5-4.5%', budgetAllocation: '10%', kpi: 'Open rate + click rate' },
  ];

  const contentMap: ContentMap[] = [
    { stage: 'Awareness', segment: segments[0].name, contentIdea: `"${industry} in 2026: 5 Trends You Can\'t Ignore"`, format: 'Blog + LinkedIn carousel', cta: 'Follow for more insights', metric: 'Impressions + new followers' },
    { stage: 'Awareness', segment: segments[1].name, contentIdea: `Behind-the-scenes: How top ${industry.toLowerCase()} brands create content`, format: 'Instagram Reel + TikTok', cta: 'Save this for later', metric: 'Saves + shares' },
    { stage: 'Consideration', segment: segments[2].name, contentIdea: `${brandName || 'Our Tool'} vs. Manual: Real results from 30-day test`, format: 'Twitter thread + blog', cta: 'Start free trial', metric: 'Click-throughs to trial' },
    { stage: 'Consideration', segment: segments[3].name, contentIdea: `ROI Calculator: What ${brandName || 'automation'} saves your team per month`, format: 'Interactive tool + YouTube demo', cta: 'Calculate your savings', metric: 'Calculator completions' },
    { stage: 'Decision', segment: segments[0].name, contentIdea: `Case Study: How [Client] grew 300% in 6 months`, format: 'Long-form blog + LinkedIn post', cta: 'Book a demo', metric: 'Demo bookings' },
    { stage: 'Decision', segment: segments[3].name, contentIdea: `Enterprise Security & Compliance: Everything you need to know`, format: 'Whitepaper + webinar', cta: 'Download the guide', metric: 'Gated downloads' },
    { stage: 'Retention', segment: segments[4].name, contentIdea: `Power User Tips: 10 features you\'re not using yet`, format: 'Email series + YouTube shorts', cta: 'Try this feature now', metric: 'Feature adoption rate' },
    { stage: 'Advocacy', segment: segments[5].name, contentIdea: `Creator Spotlight: How ${segments[5].name} are winning with ${brandName || 'our platform'}`, format: 'UGC compilation + testimonial post', cta: 'Share your story', metric: 'UGC submissions' },
  ];

  const growthTactics: GrowthTactic[] = [
    { tactic: 'Lookalike Audience Campaigns', targetSegment: segments[0].name, effort: 'Medium', impact: 'High', timeline: '2-4 weeks', expectedGrowth: '+15-25% qualified reach' },
    { tactic: 'Referral Program for Power Users', targetSegment: segments[3].name, effort: 'High', impact: 'Very High', timeline: '4-6 weeks', expectedGrowth: '+20-35% organic growth' },
    { tactic: 'Cross-Platform Content Repurposing', targetSegment: segments[1].name, effort: 'Low', impact: 'Medium', timeline: '1-2 weeks', expectedGrowth: '+30-50% content reach' },
    { tactic: 'Micro-Influencer Partnerships', targetSegment: segments[4].name, effort: 'Medium', impact: 'High', timeline: '3-5 weeks', expectedGrowth: '+10-20% new followers' },
    { tactic: 'Community-Led Growth (Discord/Slack)', targetSegment: segments[5].name, effort: 'High', impact: 'Very High', timeline: '6-8 weeks', expectedGrowth: '+40% retention rate' },
    { tactic: 'Email Re-engagement Drip Campaign', targetSegment: segments[5].name, effort: 'Low', impact: 'Medium', timeline: '1-2 weeks', expectedGrowth: '+8-15% reactivation rate' },
    { tactic: 'SEO Content Cluster Strategy', targetSegment: segments[2].name, effort: 'Medium', impact: 'High', timeline: '4-8 weeks', expectedGrowth: '+50-100% organic traffic' },
    { tactic: 'Live Event + Webinar Series', targetSegment: segments[0].name, effort: 'High', impact: 'High', timeline: '3-4 weeks', expectedGrowth: '+25% qualified leads' },
  ];

  const overlapWarnings = [
    `${segments[0].name} and ${segments[2].name} have 18% audience overlap on ${platform} — consider differentiating messaging`,
    `${segments[1].name} content on Instagram may cannibalize ${segments[4].name} reach — stagger posting times`,
    `${segments[3].name} and ${segments[0].name} share similar demographics — use behavioral triggers to separate`,
    `Email segments show 12% overlap between ${segments[5].name} and ${segments[1].name} — review list hygiene`,
  ];

  const segmentHealthScore = 55 + seed % 35;

  return { segments, personas, channelStrategy, contentMap, growthTactics, overlapWarnings, segmentHealthScore };
}

export default function AudienceSegmentationPage() {
  const [industry, setIndustry] = useState(industries[0]);
  const [platform, setPlatform] = useState(platforms[0]);
  const [goal, setGoal] = useState(goals[0]);
  const [budget, setBudget] = useState(budgetLevels[0]);
  const [audienceSize, setAudienceSize] = useState(audienceSizes[0]);
  const [contentFreq, setContentFreq] = useState(contentFrequencies[0]);
  const [brandName, setBrandName] = useState('');
  const [result, setResult] = useState<SegmentationResult | null>(null);

  const handleGenerate = () => setResult(generateSegmentation(industry, platform, goal, budget, audienceSize, contentFreq, brandName));
  const prioColor = (p: string) => p === 'High' ? '#f87171' : p === 'Medium' ? '#fbbf24' : '#60a5fa';
  const impactColor = (i: string) => i === 'Very High' ? '#a78bfa' : i === 'High' ? '#34d399' : i === 'Medium' ? '#fbbf24' : '#60a5fa';
  const stageColor = (s: string) => s === 'Awareness' ? '#60a5fa' : s === 'Consideration' ? '#fbbf24' : s === 'Decision' ? '#f87171' : s === 'Retention' ? '#34d399' : '#a78bfa';

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Audience Segmentation Engine</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Segment your audience into 6 actionable groups with detailed personas, channel strategies, content maps, and growth tactics. Stop broadcasting — start targeting.</p>

        <div className="grid md:grid-cols-1 gap-4 mb-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Brand / Product Name</label>
            <input type="text" value={brandName} onChange={e => setBrandName(e.target.value)} placeholder="e.g., PostCraft AI" className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-3 text-zinc-100" />
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {([
            { label: 'Industry', value: industry, setter: setIndustry as (v: string) => void, options: industries as readonly string[] },
            { label: 'Primary Platform', value: platform, setter: setPlatform as (v: string) => void, options: platforms as readonly string[] },
            { label: 'Business Goal', value: goal, setter: setGoal as (v: string) => void, options: goals as readonly string[] },
            { label: 'Monthly Budget', value: budget, setter: setBudget as (v: string) => void, options: budgetLevels as readonly string[] },
            { label: 'Current Audience Size', value: audienceSize, setter: setAudienceSize as (v: string) => void, options: audienceSizes as readonly string[] },
            { label: 'Content Frequency', value: contentFreq, setter: setContentFreq as (v: string) => void, options: contentFrequencies as readonly string[] },
          ] as const).map(({ label, value, setter, options }) => (
            <div key={label}>
              <label className="block text-sm text-zinc-400 mb-1">{label}</label>
              <select value={value} onChange={e => setter(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100">
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
        <button onClick={handleGenerate} className="w-full md:w-auto bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded font-semibold hover:opacity-90 transition mb-8">Segment My Audience</button>

        {result && (
          <div className="space-y-8">
            {/* Health Score */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 text-center">
              <div className="text-5xl font-bold mb-2" style={{ color: result.segmentHealthScore > 75 ? '#34d399' : result.segmentHealthScore > 55 ? '#fbbf24' : '#f87171' }}>{result.segmentHealthScore}/100</div>
              <div className="text-zinc-400 mb-2">Segmentation Health Score</div>
              <div className="max-w-md mx-auto w-full bg-zinc-800 rounded-full h-3">
                <div className="h-3 rounded-full transition-all" style={{ width: `${result.segmentHealthScore}%`, background: result.segmentHealthScore > 75 ? '#34d399' : result.segmentHealthScore > 55 ? '#fbbf24' : '#f87171' }} />
              </div>
              <p className="text-xs text-zinc-500 mt-2">Based on audience diversity, overlap risk, and targeting precision</p>
            </div>

            {/* Segments */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">6 Audience Segments</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {result.segments.map((seg, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-zinc-100 text-lg">{seg.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-1 rounded font-semibold" style={{ color: prioColor(seg.priority), background: `${prioColor(seg.priority)}15` }}>{seg.priority}</span>
                        <span className="text-xs text-zinc-500">{seg.size}</span>
                      </div>
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <div><span className="text-zinc-500">Demographics:</span> <span className="text-zinc-300">{seg.demographics}</span></div>
                      <div><span className="text-zinc-500">Psychographics:</span> <span className="text-zinc-300">{seg.psychographics}</span></div>
                      <div><span className="text-zinc-500">Behavior:</span> <span className="text-zinc-300">{seg.behavior}</span></div>
                      <div><span className="text-zinc-500">Content Pref:</span> <span className="text-emerald-400/70">{seg.contentPreference}</span></div>
                      <div><span className="text-zinc-500">Best Platform:</span> <span className="text-violet-400">{seg.bestPlatform}</span></div>
                      <div><span className="text-zinc-500">Engagement:</span> <span className="text-zinc-300">{seg.engagementStyle}</span></div>
                      <div className="flex gap-4 pt-1 border-t border-zinc-700/50">
                        <span><span className="text-zinc-500">Stage:</span> <span style={{ color: stageColor(seg.buyingStage) }}>{seg.buyingStage}</span></span>
                        <span><span className="text-zinc-500">LTV:</span> <span className="text-emerald-400">{seg.ltv}</span></span>
                        <span><span className="text-zinc-500">Cadence:</span> <span className="text-zinc-400">{seg.contentCadence}</span></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Personas */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Buyer Personas</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {result.personas.map((p, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="text-lg font-bold text-violet-400 mb-1">{p.name}</div>
                    <div className="text-xs text-zinc-500 mb-3">{p.role} | Age {p.age}</div>
                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="text-red-400 font-semibold">Pain Points</span>
                        {p.painPoints.map((pp, j) => <div key={j} className="text-zinc-400 ml-2">- {pp}</div>)}
                      </div>
                      <div>
                        <span className="text-emerald-400 font-semibold">Goals</span>
                        {p.goals.map((g, j) => <div key={j} className="text-zinc-400 ml-2">- {g}</div>)}
                      </div>
                      <div>
                        <span className="text-yellow-400 font-semibold">Objections</span>
                        {p.objections.map((o, j) => <div key={j} className="text-zinc-400 ml-2">- {o}</div>)}
                      </div>
                      <div>
                        <span className="text-blue-400 font-semibold">Content Hooks</span>
                        {p.contentHooks.map((h, j) => <div key={j} className="text-zinc-400 ml-2">- {h}</div>)}
                      </div>
                      <div className="pt-2 border-t border-zinc-700/50">
                        <div><span className="text-zinc-500">Best Time:</span> <span className="text-zinc-300">{p.bestTime}</span></div>
                        <div><span className="text-zinc-500">Format:</span> <span className="text-zinc-300">{p.preferredFormat}</span></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Channel Strategy */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Channel Strategy Matrix</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="text-left text-zinc-500 border-b border-zinc-700"><th className="pb-2 pr-3">Channel</th><th className="pb-2 pr-3">Best Segment</th><th className="pb-2 pr-3">Content Type</th><th className="pb-2 pr-3">Frequency</th><th className="pb-2 pr-3">CTR</th><th className="pb-2 pr-3">Budget</th><th className="pb-2">KPI</th></tr></thead>
                  <tbody>
                    {result.channelStrategy.map((ch, i) => (
                      <tr key={i} className="border-b border-zinc-800/50">
                        <td className="py-3 pr-3 text-violet-400 font-medium">{ch.channel}</td>
                        <td className="py-3 pr-3 text-zinc-200">{ch.segmentFit}</td>
                        <td className="py-3 pr-3 text-zinc-400 text-xs">{ch.contentType}</td>
                        <td className="py-3 pr-3 text-zinc-300">{ch.frequency}</td>
                        <td className="py-3 pr-3 text-emerald-400">{ch.expectedCTR}</td>
                        <td className="py-3 pr-3 text-yellow-400">{ch.budgetAllocation}</td>
                        <td className="py-3 text-zinc-400 text-xs">{ch.kpi}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Content Map */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Content Map by Funnel Stage</h3>
              <div className="space-y-3">
                {result.contentMap.map((cm, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs px-2 py-1 rounded font-bold" style={{ color: stageColor(cm.stage), background: `${stageColor(cm.stage)}15` }}>{cm.stage}</span>
                      <span className="text-sm text-zinc-500">{cm.segment}</span>
                    </div>
                    <div className="text-sm text-zinc-200 font-medium mb-1">{cm.contentIdea}</div>
                    <div className="flex gap-4 text-xs">
                      <span><span className="text-zinc-500">Format:</span> <span className="text-violet-400">{cm.format}</span></span>
                      <span><span className="text-zinc-500">CTA:</span> <span className="text-emerald-400">{cm.cta}</span></span>
                      <span><span className="text-zinc-500">Metric:</span> <span className="text-zinc-400">{cm.metric}</span></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Growth Tactics */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Growth Tactics</h3>
              <div className="space-y-3">
                {result.growthTactics.map((gt, i) => (
                  <div key={i} className="flex gap-3 items-start bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <span className="shrink-0 text-xs px-2 py-1 rounded font-bold" style={{ color: impactColor(gt.impact), background: `${impactColor(gt.impact)}15` }}>{gt.impact}</span>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-zinc-200">{gt.tactic}</div>
                      <div className="text-xs text-zinc-500">Target: {gt.targetSegment}</div>
                      <div className="flex gap-4 mt-1 text-xs">
                        <span className="text-emerald-400/70">{gt.expectedGrowth}</span>
                        <span className="text-zinc-500">Effort: {gt.effort}</span>
                        <span className="text-zinc-500">Timeline: {gt.timeline}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Overlap Warnings */}
            <div className="bg-zinc-900/60 border border-yellow-800/40 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3 text-yellow-400">Overlap Warnings</h3>
              <div className="space-y-2">
                {result.overlapWarnings.map((w, i) => <div key={i} className="text-sm text-zinc-400 flex gap-2"><span className="text-yellow-400 shrink-0">!</span>{w}</div>)}
              </div>
            </div>

            <div className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">Stop Guessing Who Your Audience Is</h3>
              <p className="text-zinc-400 mb-4">Use PostCraft AI to segment, target, and convert every audience group. Pair with <a href="/content-scoring" className="text-violet-400 underline">Content Scoring</a>, <a href="/persona-builder" className="text-violet-400 underline">Persona Builder</a>, and <a href="/audience-growth" className="text-violet-400 underline">Audience Growth Planner</a>.</p>
              <a href="/pricing" className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">Get PostCraft Pro</a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
