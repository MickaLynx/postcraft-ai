'use client';
import { useState } from 'react';
import Link from 'next/link';

const industries = [
  'E-commerce', 'SaaS/B2B', 'Health & Fitness', 'Finance', 'Education',
  'Food & Beverage', 'Fashion', 'Technology', 'Real Estate', 'Travel',
  'Entertainment', 'Gaming',
] as const;

const platforms = ['Instagram', 'TikTok', 'Twitter/X', 'YouTube', 'LinkedIn', 'Facebook'] as const;

const campaignTypes = [
  'Product Review', 'Testimonial', 'Unboxing', 'Tutorial',
  'Challenge', 'Contest', 'Ambassador', 'Collaboration',
] as const;

const budgetRanges = ['$0-500', '$500-2K', '$2K-10K', '$10K-50K', '$50K+'] as const;

const contentVolumes = ['1-10/month', '10-50/month', '50-200/month', '200+/month'] as const;

function hash(str: string): number {
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h + str.charCodeAt(i)) & 0x7fffffff;
  }
  return h;
}

function seeded(seed: number, index: number): number {
  const x = Math.sin(seed + index * 9301 + 49297) * 49979;
  return x - Math.floor(x);
}

interface SubScore { label: string; value: number }

interface CreatorTier {
  name: string;
  range: string;
  budgetPct: number;
  deliverables: string;
  costRange: string;
  quality: number;
}

interface LicenseRow {
  type: string;
  duration: string;
  platforms: string;
  multiplier: string;
  recommended: string;
}

interface Benchmark {
  metric: string;
  ugc: string;
  branded: string;
  lift: string;
}

interface CalendarWeek {
  week: string;
  title: string;
  tasks: string[];
}

interface UGCResult {
  overallScore: number;
  subScores: SubScore[];
  creatorTiers: CreatorTier[];
  licenses: LicenseRow[];
  brief: string;
  benchmarks: Benchmark[];
  calendar: CalendarWeek[];
}

export default function UGCManagerPage() {
  const [brandName, setBrandName] = useState('');
  const [industry, setIndustry] = useState<string>('E-commerce');
  const [platform, setPlatform] = useState<string>('Instagram');
  const [campaignType, setCampaignType] = useState<string>('Product Review');
  const [budget, setBudget] = useState<string>('$2K-10K');
  const [volume, setVolume] = useState<string>('10-50/month');
  const [result, setResult] = useState<UGCResult | null>(null);
  const [checklist, setChecklist] = useState<boolean[]>(Array(8).fill(false));
  const [copied, setCopied] = useState(false);

  function generate() {
    const seed = hash(`${brandName}${industry}${platform}${campaignType}${budget}${volume}`);

    const industryIdx = industries.indexOf(industry as typeof industries[number]);
    const platformIdx = platforms.indexOf(platform as typeof platforms[number]);
    const campaignIdx = campaignTypes.indexOf(campaignType as typeof campaignTypes[number]);
    const budgetIdx = budgetRanges.indexOf(budget as typeof budgetRanges[number]);
    const volumeIdx = contentVolumes.indexOf(volume as typeof contentVolumes[number]);

    // Sub-scores
    const qualityBase = [78, 72, 85, 70, 68, 82, 88, 75, 65, 80, 76, 83];
    const campaignBonus = [5, 8, 6, 10, 3, 2, 12, 7];
    const contentQuality = Math.min(99, qualityBase[industryIdx] + campaignBonus[campaignIdx] + Math.round(seeded(seed, 1) * 6));

    const rightsBase = 40 + volumeIdx * 12 + platformIdx * 3;
    const rightsComplexity = Math.min(99, rightsBase + Math.round(seeded(seed, 2) * 8));

    const sourcingBase = [55, 70, 50, 75, 60, 45, 40, 65, 72, 48, 52, 58];
    const budgetEase = [0, 5, 12, 18, 22];
    const creatorSourcing = Math.min(99, 100 - sourcingBase[industryIdx] + budgetEase[budgetIdx] + Math.round(seeded(seed, 3) * 6));

    const roiBase = 50 + budgetIdx * 8 + campaignIdx * 2 + Math.round(seeded(seed, 4) * 10);
    const roiProjection = Math.min(99, roiBase);

    const overallScore = Math.round((contentQuality + (100 - rightsComplexity) + creatorSourcing + roiProjection) / 4);

    const subScores: SubScore[] = [
      { label: 'Content Quality Potential', value: contentQuality },
      { label: 'Rights Management Complexity', value: rightsComplexity },
      { label: 'Creator Sourcing Difficulty', value: 100 - creatorSourcing },
      { label: 'ROI Projection', value: roiProjection },
    ];

    // Creator tiers
    const budgetMultipliers = [0.3, 0.6, 1, 2.5, 6];
    const bm = budgetMultipliers[budgetIdx];
    const creatorTiers: CreatorTier[] = [
      { name: 'Nano (1K-10K)', range: '1K-10K', budgetPct: Math.round(35 - budgetIdx * 4 + seeded(seed, 10) * 3), deliverables: `${Math.round(3 + seeded(seed, 11) * 2)} posts + ${Math.round(2 + seeded(seed, 12))} stories`, costRange: `$${Math.round(50 * bm)}-$${Math.round(150 * bm)}`, quality: 3 + (seeded(seed, 13) > 0.5 ? 1 : 0) },
      { name: 'Micro (10K-50K)', range: '10K-50K', budgetPct: Math.round(30 - budgetIdx * 2 + seeded(seed, 14) * 3), deliverables: `${Math.round(2 + seeded(seed, 15) * 2)} posts + ${Math.round(1 + seeded(seed, 16))} reels`, costRange: `$${Math.round(200 * bm)}-$${Math.round(500 * bm)}`, quality: 4 },
      { name: 'Mid-tier (50K-500K)', range: '50K-500K', budgetPct: Math.round(20 + budgetIdx * 2 + seeded(seed, 17) * 2), deliverables: `${Math.round(1 + seeded(seed, 18))} posts + ${Math.round(1 + seeded(seed, 19))} videos`, costRange: `$${Math.round(500 * bm)}-$${Math.round(2000 * bm)}`, quality: 4 + (seeded(seed, 20) > 0.4 ? 1 : 0) },
      { name: 'Macro (500K-1M)', range: '500K-1M', budgetPct: Math.round(10 + budgetIdx * 3 + seeded(seed, 21) * 2), deliverables: `${Math.round(1 + seeded(seed, 22))} posts + 1 dedicated video`, costRange: `$${Math.round(2000 * bm)}-$${Math.round(5000 * bm)}`, quality: 5 },
      { name: 'Mega (1M+)', range: '1M+', budgetPct: Math.max(5, Math.round(5 + budgetIdx * 2 + seeded(seed, 23) * 2)), deliverables: '1 hero post + brand mention', costRange: `$${Math.round(5000 * bm)}-$${Math.round(15000 * bm)}`, quality: 5 },
    ];

    // Licenses
    const licenses: LicenseRow[] = [
      { type: 'Organic Repost', duration: '30 days', platforms: platform, multiplier: '1x (included)', recommended: 'Testimonial, Product Review' },
      { type: 'Paid Usage Rights', duration: '90 days', platforms: `${platform} + 1 additional`, multiplier: '1.5-2x base rate', recommended: 'Tutorial, Unboxing' },
      { type: 'Whitelisting', duration: '1 year', platforms: 'All social platforms', multiplier: '2-3x base rate', recommended: 'Challenge, Contest' },
      { type: 'Full Buyout', duration: 'Perpetual', platforms: 'All channels incl. web/print', multiplier: '3-5x base rate', recommended: 'Ambassador, Collaboration' },
    ];

    // Brief
    const brand = brandName || 'Your Brand';
    const brief = `=== UGC CONTENT BRIEF ===
Brand: ${brand}
Industry: ${industry}
Platform: ${platform}
Campaign: ${campaignType}

OBJECTIVE:
Create authentic ${campaignType.toLowerCase()} content that resonates with ${industry.toLowerCase()} audiences on ${platform}. Drive engagement and build trust through genuine creator experiences with ${brand}.

CONTENT REQUIREMENTS:
- Format: ${platform === 'TikTok' || platform === 'YouTube' ? 'Vertical video (9:16)' : platform === 'Instagram' ? 'Reel (9:16) or Carousel (1:1)' : platform === 'LinkedIn' ? 'Native post with image/carousel' : 'Native format for ' + platform}
- Length: ${platform === 'TikTok' ? '15-60 seconds' : platform === 'YouTube' ? '3-10 minutes' : platform === 'Instagram' ? '15-90 seconds (Reel) or 5-10 slides (Carousel)' : '1-3 minutes'}
- Must include: Product/service in first 3 seconds, personal experience, clear CTA
- Hashtags: #${brand.replace(/\s+/g, '')} #${campaignType.replace(/\s+/g, '')} + 3-5 niche tags

BRAND GUIDELINES:
- Tone: Authentic, conversational, relatable
- Colors: Reference brand palette (provided separately)
- Messaging: Focus on real results and personal transformation

DO'S:
1. Show genuine personal experience with the product/service
2. Use natural lighting and authentic settings
3. Include a clear call-to-action in the final 5 seconds

DON'TS:
1. Do not use competitor products or mention rival brands
2. Do not use overly scripted or salesy language
3. Do not post without #ad or #sponsored disclosure

SUBMISSION:
- Deliver raw files via shared drive link (no compression)
- Include 2 caption options for brand to choose
- Submit ${Math.round(48 + seeded(seed, 30) * 24)} hours before scheduled post date
- Revisions: Up to 2 rounds included in base rate`;

    // Benchmarks
    const engBase = [3.2, 4.8, 2.1, 5.5, 2.8, 3.0];
    const engUGC = engBase[platformIdx] + seeded(seed, 40) * 0.8;
    const engBranded = engUGC * (0.35 + seeded(seed, 41) * 0.15);
    const benchmarks: Benchmark[] = [
      { metric: 'Avg Engagement Rate', ugc: `${engUGC.toFixed(1)}%`, branded: `${engBranded.toFixed(1)}%`, lift: `+${((engUGC / engBranded - 1) * 100).toFixed(0)}%` },
      { metric: 'Cost Per Engagement', ugc: `$${(0.08 + seeded(seed, 42) * 0.04).toFixed(2)}`, branded: `$${(0.25 + seeded(seed, 43) * 0.15).toFixed(2)}`, lift: `-${Math.round(60 + seeded(seed, 44) * 15)}%` },
      { metric: 'Conversion Rate Lift', ugc: `${(2.8 + seeded(seed, 45) * 1.5).toFixed(1)}%`, branded: `${(1.2 + seeded(seed, 46) * 0.5).toFixed(1)}%`, lift: `+${Math.round(80 + seeded(seed, 47) * 40)}%` },
      { metric: 'Content Production Time', ugc: `${Math.round(2 + seeded(seed, 48) * 2)} days`, branded: `${Math.round(10 + seeded(seed, 49) * 5)} days`, lift: `-${Math.round(65 + seeded(seed, 50) * 15)}%` },
      { metric: 'Authenticity Score', ugc: `${Math.round(82 + seeded(seed, 51) * 12)}/100`, branded: `${Math.round(45 + seeded(seed, 52) * 15)}/100`, lift: `+${Math.round(50 + seeded(seed, 53) * 20)}%` },
      { metric: 'Repurpose Potential', ugc: `${Math.round(6 + seeded(seed, 54) * 3)} formats`, branded: `${Math.round(2 + seeded(seed, 55) * 2)} formats`, lift: `+${Math.round(150 + seeded(seed, 56) * 80)}%` },
    ];

    // Calendar
    const calendar: CalendarWeek[] = [
      { week: 'Week 1', title: 'Brief & Outreach', tasks: ['Finalize campaign brief and brand guidelines', 'Identify and shortlist creators from sourcing plan', 'Send outreach emails/DMs with compensation details', `Target: ${Math.round(10 + seeded(seed, 60) * 20)} creators contacted`] },
      { week: 'Week 2', title: 'Creator Selection & Onboarding', tasks: ['Review creator applications and content samples', 'Sign creator agreements and define usage rights', 'Share product/service and brief materials', `Target: ${Math.round(3 + seeded(seed, 61) * 7)} creators onboarded`] },
      { week: 'Week 3', title: 'Content Creation & Review', tasks: ['Creators produce content per brief guidelines', 'First draft review and feedback (round 1)', 'Final approval and revision requests (round 2)', 'Collect raw files and caption options'] },
      { week: 'Week 4', title: 'Publishing & Amplification', tasks: ['Schedule and publish approved UGC content', 'Boost top-performing posts with paid amplification', 'Track engagement metrics and creator performance', 'Compile performance report and plan next cycle'] },
    ];

    setResult({ overallScore, subScores, creatorTiers, licenses, brief, benchmarks, calendar });
    setChecklist(Array(8).fill(false));
  }

  function scoreColor(score: number) {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  }

  function scoreBg(score: number) {
    if (score >= 80) return 'bg-green-400/20 border-green-400/30';
    if (score >= 60) return 'bg-yellow-400/20 border-yellow-400/30';
    return 'bg-red-400/20 border-red-400/30';
  }

  function toggleCheck(i: number) {
    setChecklist(prev => { const n = [...prev]; n[i] = !n[i]; return n; });
  }

  function copyBrief() {
    if (result) {
      navigator.clipboard.writeText(result.brief);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  const stars = (n: number) => '★'.repeat(n) + '☆'.repeat(5 - n);

  const checklistItems = [
    'Creator agreement signed',
    'Usage rights defined',
    'FTC/disclosure compliance',
    'Content approval workflow',
    'Payment terms agreed',
    'Exclusivity period defined',
    'Content ownership clause',
    'Termination conditions',
  ];

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      {/* Hero */}
      <section className="px-6 py-20 max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">
          <span className="gradient-text">UGC Manager & Rights Tracker</span> — Free 2026 Tool
        </h1>
        <p className="text-zinc-400 text-lg mb-2 max-w-2xl mx-auto">
          Plan your UGC campaigns, source creators, manage content rights, and track performance across 6 platforms and 12 industries.
        </p>
        <p className="text-zinc-500 text-sm mb-8">8 campaign types &middot; 6 platforms &middot; 5 budget ranges &middot; 12 industries</p>
      </section>

      {/* Inputs */}
      <section className="px-6 pb-10 max-w-4xl mx-auto">
        <div className="glass rounded-2xl p-8">
          <h2 className="text-xl font-semibold mb-6">Configure Your UGC Campaign</h2>

          {/* Brand Name */}
          <div className="mb-6">
            <label className="block text-zinc-400 text-sm mb-1">Brand Name</label>
            <input
              type="text"
              value={brandName}
              onChange={e => setBrandName(e.target.value)}
              placeholder="e.g. Acme Inc."
              className="w-full bg-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Industry */}
          <div className="mb-6">
            <label className="block text-zinc-400 text-sm mb-1">Industry</label>
            <select
              value={industry}
              onChange={e => setIndustry(e.target.value)}
              className="w-full bg-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {industries.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>

          {/* Platform */}
          <div className="mb-6">
            <label className="block text-zinc-400 text-sm mb-2">Platform</label>
            <div className="flex flex-wrap gap-2">
              {platforms.map(p => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    platform === p
                      ? 'bg-purple-600 text-white'
                      : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Campaign Type */}
          <div className="mb-6">
            <label className="block text-zinc-400 text-sm mb-2">Campaign Type</label>
            <div className="flex flex-wrap gap-2">
              {campaignTypes.map(c => (
                <button
                  key={c}
                  onClick={() => setCampaignType(c)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    campaignType === c
                      ? 'bg-purple-600 text-white'
                      : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Budget Range */}
          <div className="mb-6">
            <label className="block text-zinc-400 text-sm mb-2">Budget Range</label>
            <div className="flex flex-wrap gap-2">
              {budgetRanges.map(b => (
                <button
                  key={b}
                  onClick={() => setBudget(b)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    budget === b
                      ? 'bg-purple-600 text-white'
                      : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Content Volume */}
          <div className="mb-8">
            <label className="block text-zinc-400 text-sm mb-2">Content Volume</label>
            <div className="flex flex-wrap gap-2">
              {contentVolumes.map(v => (
                <button
                  key={v}
                  onClick={() => setVolume(v)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    volume === v
                      ? 'bg-purple-600 text-white'
                      : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generate}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            Generate UGC Strategy
          </button>
        </div>
      </section>

      {/* Results */}
      {result && (
        <section className="px-6 pb-20 max-w-4xl mx-auto space-y-8">

          {/* 1. UGC Strategy Score */}
          <div className="glass rounded-2xl p-8">
            <h2 className="text-xl font-semibold mb-6">UGC Strategy Score</h2>
            <div className="text-center mb-8">
              <div className={`text-7xl font-bold ${scoreColor(result.overallScore)}`}>
                {result.overallScore}
              </div>
              <div className="text-zinc-400 text-lg mt-1">/ 100</div>
              <div className={`inline-block mt-3 px-4 py-1 rounded-full text-sm font-medium border ${scoreBg(result.overallScore)}`}>
                {result.overallScore >= 80 ? 'Excellent Strategy' : result.overallScore >= 60 ? 'Good Potential' : 'Needs Improvement'}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.subScores.map(s => (
                <div key={s.label} className="bg-zinc-800/50 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-zinc-400 text-sm">{s.label}</span>
                    <span className={`font-bold ${scoreColor(s.label === 'Rights Management Complexity' || s.label === 'Creator Sourcing Difficulty' ? 100 - s.value : s.value)}`}>
                      {s.value}/100
                    </span>
                  </div>
                  <div className="w-full bg-zinc-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        s.value >= 80 ? 'bg-green-400' : s.value >= 60 ? 'bg-yellow-400' : 'bg-red-400'
                      }`}
                      style={{ width: `${s.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Creator Sourcing Plan */}
          <div className="glass rounded-2xl p-8">
            <h2 className="text-xl font-semibold mb-6">Creator Sourcing Plan</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-zinc-700 text-zinc-400">
                    <th className="pb-3 pr-4">Creator Tier</th>
                    <th className="pb-3 pr-4">Budget %</th>
                    <th className="pb-3 pr-4">Deliverables</th>
                    <th className="pb-3 pr-4">Cost/Post</th>
                    <th className="pb-3">Quality</th>
                  </tr>
                </thead>
                <tbody>
                  {result.creatorTiers.map(tier => (
                    <tr key={tier.name} className="border-b border-zinc-800">
                      <td className="py-3 pr-4 font-medium text-white">{tier.name}</td>
                      <td className="py-3 pr-4">
                        <span className="text-purple-400 font-semibold">{tier.budgetPct}%</span>
                      </td>
                      <td className="py-3 pr-4 text-zinc-300">{tier.deliverables}</td>
                      <td className="py-3 pr-4 text-zinc-300">{tier.costRange}</td>
                      <td className="py-3 text-yellow-400">{stars(tier.quality)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 3. Rights & Licensing Framework */}
          <div className="glass rounded-2xl p-8">
            <h2 className="text-xl font-semibold mb-6">Rights & Licensing Framework</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-zinc-700 text-zinc-400">
                    <th className="pb-3 pr-4">License Type</th>
                    <th className="pb-3 pr-4">Duration</th>
                    <th className="pb-3 pr-4">Platforms</th>
                    <th className="pb-3 pr-4">Cost Multiplier</th>
                    <th className="pb-3">Recommended For</th>
                  </tr>
                </thead>
                <tbody>
                  {result.licenses.map(lic => (
                    <tr key={lic.type} className="border-b border-zinc-800">
                      <td className="py-3 pr-4 font-medium text-white">{lic.type}</td>
                      <td className="py-3 pr-4 text-zinc-300">{lic.duration}</td>
                      <td className="py-3 pr-4 text-zinc-300">{lic.platforms}</td>
                      <td className="py-3 pr-4 text-purple-400 font-semibold">{lic.multiplier}</td>
                      <td className="py-3 text-zinc-300">{lic.recommended}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 4. UGC Content Brief Template */}
          <div className="glass rounded-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">UGC Content Brief Template</h2>
              <button
                onClick={copyBrief}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm font-medium transition-colors"
              >
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
            </div>
            <pre className="bg-zinc-900 rounded-xl p-6 text-sm text-zinc-300 whitespace-pre-wrap overflow-x-auto leading-relaxed">
              {result.brief}
            </pre>
          </div>

          {/* 5. Performance Benchmarks */}
          <div className="glass rounded-2xl p-8">
            <h2 className="text-xl font-semibold mb-6">Performance Benchmarks</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-zinc-700 text-zinc-400">
                    <th className="pb-3 pr-4">Metric</th>
                    <th className="pb-3 pr-4">UGC Content</th>
                    <th className="pb-3 pr-4">Branded Content</th>
                    <th className="pb-3">Lift</th>
                  </tr>
                </thead>
                <tbody>
                  {result.benchmarks.map(b => (
                    <tr key={b.metric} className="border-b border-zinc-800">
                      <td className="py-3 pr-4 font-medium text-white">{b.metric}</td>
                      <td className="py-3 pr-4 text-green-400 font-semibold">{b.ugc}</td>
                      <td className="py-3 pr-4 text-zinc-400">{b.branded}</td>
                      <td className="py-3">
                        <span className={`font-semibold ${b.lift.startsWith('+') ? 'text-green-400' : 'text-blue-400'}`}>
                          {b.lift}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 6. Legal Checklist */}
          <div className="glass rounded-2xl p-8">
            <h2 className="text-xl font-semibold mb-6">Legal Checklist</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {checklistItems.map((item, i) => (
                <button
                  key={item}
                  onClick={() => toggleCheck(i)}
                  className={`flex items-center gap-3 p-4 rounded-xl text-left transition-all ${
                    checklist[i]
                      ? 'bg-green-400/10 border border-green-400/30'
                      : 'bg-zinc-800/50 border border-zinc-700/50 hover:border-zinc-600'
                  }`}
                >
                  <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${
                    checklist[i] ? 'bg-green-400 text-black' : 'bg-zinc-700'
                  }`}>
                    {checklist[i] && <span className="text-xs font-bold">&#10003;</span>}
                  </div>
                  <span className={checklist[i] ? 'text-green-400' : 'text-zinc-300'}>{item}</span>
                </button>
              ))}
            </div>
            <div className="mt-4 text-center text-sm text-zinc-500">
              {checklist.filter(Boolean).length}/{checklistItems.length} completed
            </div>
          </div>

          {/* 7. Monthly UGC Calendar */}
          <div className="glass rounded-2xl p-8">
            <h2 className="text-xl font-semibold mb-6">Monthly UGC Calendar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.calendar.map((week, wi) => (
                <div key={week.week} className="bg-zinc-800/50 rounded-xl p-5 border border-zinc-700/50">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-purple-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      {week.week}
                    </span>
                    <span className="font-semibold text-white">{week.title}</span>
                  </div>
                  <ul className="space-y-2">
                    {week.tasks.map((task, ti) => (
                      <li key={ti} className="flex items-start gap-2 text-sm text-zinc-300">
                        <span className="text-purple-400 mt-0.5">&#8226;</span>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SEO Section */}
      <section className="px-6 pb-20 max-w-4xl mx-auto">
        <div className="glass rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <details className="group">
              <summary className="cursor-pointer text-lg font-medium text-zinc-200 hover:text-white transition-colors">
                What is UGC (User-Generated Content)?
              </summary>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                User-Generated Content (UGC) is any content — photos, videos, reviews, testimonials — created by real customers or hired creators rather than the brand itself. UGC is perceived as more authentic and trustworthy, often outperforming branded content in engagement rates by 2-3x. In 2026, UGC is the fastest-growing content strategy for e-commerce, SaaS, and direct-to-consumer brands.
              </p>
            </details>
            <details className="group">
              <summary className="cursor-pointer text-lg font-medium text-zinc-200 hover:text-white transition-colors">
                How do I get UGC rights from creators?
              </summary>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                UGC rights are obtained through creator agreements that specify the license type (organic repost, paid usage, whitelisting, or full buyout), duration, allowed platforms, and compensation. Always use a written contract — even for nano creators. Key clauses include usage rights scope, exclusivity period, content ownership, FTC disclosure requirements, and termination conditions. Our Rights & Licensing Framework above provides a complete breakdown of options and costs.
              </p>
            </details>
            <details className="group">
              <summary className="cursor-pointer text-lg font-medium text-zinc-200 hover:text-white transition-colors">
                What are the best platforms for UGC campaigns?
              </summary>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                TikTok and Instagram lead for UGC campaigns in 2026, with the highest engagement rates and most active creator ecosystems. YouTube excels for long-form UGC like unboxing and tutorials. LinkedIn is ideal for B2B UGC testimonials. Twitter/X works well for real-time UGC during launches and events. Facebook remains strong for community-driven UGC in specific demographics. The best platform depends on your industry, audience, and campaign type.
              </p>
            </details>
            <details className="group">
              <summary className="cursor-pointer text-lg font-medium text-zinc-200 hover:text-white transition-colors">
                How much should I pay UGC creators?
              </summary>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                UGC creator rates vary by tier: Nano creators (1K-10K followers) typically charge $50-$250 per post, Micro creators (10K-50K) charge $200-$1,000, Mid-tier (50K-500K) charge $500-$5,000, Macro (500K-1M) charge $2,000-$10,000, and Mega creators (1M+) charge $5,000-$25,000+. Rates also depend on content format (video costs more than photos), usage rights (whitelisting adds 2-3x), and exclusivity requirements. Always factor in the total cost including rights and revisions.
              </p>
            </details>
            <details className="group">
              <summary className="cursor-pointer text-lg font-medium text-zinc-200 hover:text-white transition-colors">
                How do I measure UGC ROI?
              </summary>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                Measure UGC ROI across three dimensions: engagement (likes, comments, shares, saves vs. branded content), conversion (click-through rate, landing page conversion, attributed revenue), and efficiency (cost per engagement, content production time saved, repurpose potential). Track authenticity scores using sentiment analysis. The most successful UGC programs see 80-150% higher engagement rates and 20-40% lower cost per acquisition compared to traditional branded content campaigns.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="px-6 pb-20 max-w-4xl mx-auto">
        <div className="glass rounded-2xl p-8 text-center">
          <h2 className="text-lg font-semibold mb-4 text-zinc-300">Explore More PostCraft AI Tools</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { href: '/brand-voice', label: 'Brand Voice' },
              { href: '/influencer-score', label: 'Influencer Score' },
              { href: '/content-calendar', label: 'Content Calendar' },
              { href: '/campaign', label: 'Campaign Generator' },
              { href: '/roi-calculator', label: 'ROI Calculator' },
              { href: '/engagement-calculator', label: 'Engagement Calculator' },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm text-zinc-300 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
