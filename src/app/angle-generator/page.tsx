'use client';
import { useState } from 'react';

const industries = ['E-commerce/DTC', 'SaaS/Tech', 'Health & Wellness', 'Finance/Fintech', 'Education/Courses', 'Real Estate', 'Food & Restaurant', 'Fashion/Beauty', 'Travel/Hospitality', 'B2B Services', 'Agency/Consulting', 'Fitness/Sports', 'Entertainment/Media', 'Crypto/Web3'] as const;
const platforms = ['Instagram', 'TikTok', 'LinkedIn', 'Twitter/X', 'YouTube', 'Facebook', 'Pinterest'] as const;
const contentTypes = ['Educational', 'Entertaining', 'Inspirational', 'Controversial', 'Case Study', 'Tutorial', 'Listicle', 'Storytelling', 'Behind-the-Scenes', 'Data Breakdown'] as const;
const angleCategories = ['Contrarian Take', 'Data-Driven', 'Story-Based', 'Comparison', 'Prediction', 'Behind-the-Scenes', 'Myth-Busting', 'Underdog Narrative', 'Hot Take Remix', 'Framework Reveal'] as const;

const seasonalWindows: Record<string, { label: string; boost: number }> = {
  'Jan': { label: 'New Year / Goal Setting', boost: 15 },
  'Feb': { label: 'Valentine\'s / Love & Relationships', boost: 10 },
  'Mar': { label: 'Spring Reset / Women\'s Month', boost: 12 },
  'Apr': { label: 'Tax Season / Spring Cleaning', boost: 8 },
  'May': { label: 'Mental Health Awareness / Graduation', boost: 11 },
  'Jun': { label: 'Summer Kickoff / Pride Month', boost: 10 },
  'Jul': { label: 'Mid-Year Review / Summer Content', boost: 7 },
  'Aug': { label: 'Back to School / Prep Season', boost: 9 },
  'Sep': { label: 'Q4 Planning / Fall Relaunch', boost: 14 },
  'Oct': { label: 'Halloween / Spooky Content / BFCM Prep', boost: 13 },
  'Nov': { label: 'Black Friday / Gratitude / Year Wrap Prep', boost: 18 },
  'Dec': { label: 'Year in Review / Holiday / Predictions', boost: 16 },
};

interface ContentAngle {
  category: string;
  hookHeadline: string;
  description: string;
  whyItWorks: string;
  engagementPrediction: string;
  bestPlatform: string;
  contentFormat: string;
  angleScore: number;
  seasonalTip: string;
  contentBrief: { objective: string; keyPoints: string[]; openingHook: string; callToAction: string; estimatedLength: string };
}

interface AngleResult {
  angles: ContentAngle[];
  overallStrategy: string;
  timingRecommendation: string;
  nicheInsight: string;
}

function generateAngles(
  niche: string, platform: string, contentType: string, painPoints: string, trendingTopics: string
): AngleResult {
  const now = new Date();
  const monthKey = now.toLocaleString('en-US', { month: 'short' });
  const seasonal = seasonalWindows[monthKey] || { label: 'Evergreen Content', boost: 5 };

  const painList = painPoints.split(',').map(p => p.trim()).filter(Boolean);
  const trendList = trendingTopics.split(',').map(t => t.trim()).filter(Boolean);
  const mainPain = painList[0] || 'common frustrations';
  const secondPain = painList[1] || 'wasted time';
  const mainTrend = trendList[0] || 'industry shifts';
  const secondTrend = trendList[1] || 'emerging tools';

  const platformStrengths: Record<string, { format: string; lengthGuide: string; engRange: string }> = {
    'Instagram': { format: 'Carousel or Reel', lengthGuide: '30-60 sec reel or 7-10 slide carousel', engRange: '2.5-6.0%' },
    'TikTok': { format: 'Short-form Video', lengthGuide: '15-60 seconds', engRange: '4.0-12.0%' },
    'LinkedIn': { format: 'Text Post or Document', lengthGuide: '1,200-1,500 characters or 8-12 slide doc', engRange: '2.0-5.5%' },
    'Twitter/X': { format: 'Thread (5-10 tweets)', lengthGuide: '5-10 tweets, 200-280 chars each', engRange: '1.5-4.0%' },
    'YouTube': { format: 'Long-form Video or Short', lengthGuide: '8-15 minutes or 30-60 sec Short', engRange: '3.0-8.0%' },
    'Facebook': { format: 'Video or Image Post', lengthGuide: '60-90 seconds video or 100-250 word post', engRange: '1.0-3.5%' },
    'Pinterest': { format: 'Idea Pin or Infographic', lengthGuide: '5-8 pages or 1000x1500px infographic', engRange: '0.5-2.5%' },
  };

  const ps = platformStrengths[platform] || platformStrengths['Instagram'];

  const contrarianHooks = [
    `Stop ${mainPain} — it's actually making things worse`,
    `Everything you know about ${niche} is wrong (here's proof)`,
    `I stopped following ${niche} "best practices" and here's what happened`,
    `The ${niche} advice that's secretly holding you back`,
  ];

  const dataDrivenHooks = [
    `We analyzed 10,000 ${niche} accounts. Here's what top 1% do differently`,
    `${niche} by the numbers: the data nobody talks about`,
    `The ${mainTrend} data that changes everything about ${niche}`,
    `87% of ${niche} professionals get this wrong (data inside)`,
  ];

  const storyHooks = [
    `How a complete beginner in ${niche} outperformed 10-year veterans`,
    `The ${niche} failure that taught me more than any success`,
    `From ${mainPain} to breakthrough: a ${niche} story`,
    `I interviewed 50 ${niche} experts. One answer changed everything`,
  ];

  const comparisonHooks = [
    `${mainTrend} vs. traditional ${niche}: which actually wins?`,
    `We tested 5 ${niche} strategies for 90 days — clear winner inside`,
    `${niche} in 2024 vs 2026: the shifts nobody expected`,
    `Budget vs. premium ${niche} approaches: honest comparison`,
  ];

  const predictionHooks = [
    `${niche} in 2027: 5 predictions that will age well`,
    `The ${mainTrend} shift that will reshape ${niche} forever`,
    `Why 80% of ${niche} strategies will be obsolete by next year`,
    `3 ${niche} trends about to explode (get in early)`,
  ];

  const btsHooks = [
    `Behind the scenes: how we actually handle ${mainPain}`,
    `The ugly truth about running a ${niche} business`,
    `What a typical day in ${niche} really looks like (unfiltered)`,
    `Our ${niche} process exposed — tools, mistakes, and all`,
  ];

  const mythBustHooks = [
    `"${mainPain}" is a myth — here's what's really going on`,
    `3 ${niche} myths that cost you money every month`,
    `The biggest lie in ${niche} that experts keep repeating`,
    `Debunking the #1 ${niche} misconception with real data`,
  ];

  const underdogHooks = [
    `How we went from zero to leader in ${niche} with no budget`,
    `Small ${niche} player vs. industry giants: our honest journey`,
    `Nobody believed our ${niche} approach would work — until it did`,
    `The unconventional ${niche} path that beat the odds`,
  ];

  const hotTakeHooks = [
    `Hot take: ${mainTrend} is overrated and here's why`,
    `Unpopular opinion: the best ${niche} strategy is the boring one`,
    `I disagree with every ${niche} guru on this one thing`,
    `The ${niche} conversation everyone is having wrong`,
  ];

  const frameworkHooks = [
    `The 3-step framework that solved ${mainPain} for our clients`,
    `Steal this ${niche} framework — it took us 2 years to build`,
    `The ${niche} playbook nobody shares (until now)`,
    `Our exact ${niche} system for handling ${secondPain}`,
  ];

  const allAngleData: { category: string; hooks: string[]; whyBase: string; formatBias: string }[] = [
    { category: 'Contrarian Take', hooks: contrarianHooks, whyBase: 'Contrarian content triggers curiosity and debate. People share opinions they strongly agree or disagree with, boosting organic reach.', formatBias: 'Opinion-led carousel or talking-head video' },
    { category: 'Data-Driven', hooks: dataDrivenHooks, whyBase: 'Data-backed content earns trust and gets saved/bookmarked at 3x the rate of opinion content. It positions you as the authority.', formatBias: 'Infographic carousel or data breakdown video' },
    { category: 'Story-Based', hooks: storyHooks, whyBase: 'Stories activate mirror neurons — readers feel the journey. Narrative content gets 22x more engagement than facts alone.', formatBias: 'Long-form text post or storytelling video' },
    { category: 'Comparison', hooks: comparisonHooks, whyBase: 'Comparison content answers the "which one?" question your audience already has. It drives high save rates and attracts search traffic.', formatBias: 'Side-by-side carousel or breakdown video' },
    { category: 'Prediction', hooks: predictionHooks, whyBase: 'Prediction content positions you as a forward-thinker. It generates discussion, quote-retweets, and ages into evergreen reference material.', formatBias: 'Thread or numbered-list post' },
    { category: 'Behind-the-Scenes', hooks: btsHooks, whyBase: 'BTS content builds parasocial connection. Transparency is the fastest trust-builder — 86% of consumers say authenticity drives brand loyalty.', formatBias: 'Raw video or photo dump carousel' },
    { category: 'Myth-Busting', hooks: mythBustHooks, whyBase: 'Myth-busting triggers the "I knew it!" response and gets aggressive sharing. It positions you against the mainstream, earning authority.', formatBias: 'Fact-check carousel or debate-style video' },
    { category: 'Underdog Narrative', hooks: underdogHooks, whyBase: 'Everyone roots for the underdog. This angle builds emotional investment and community loyalty that polished content cannot replicate.', formatBias: 'Documentary-style video or personal text post' },
    { category: 'Hot Take Remix', hooks: hotTakeHooks, whyBase: 'Hot takes hijack trending conversations and funnel attention to your profile. Controversial (but substantiated) opinions drive comment storms.', formatBias: 'Short text post or reaction-style video' },
    { category: 'Framework Reveal', hooks: frameworkHooks, whyBase: 'Frameworks are the most saved and bookmarked content type. They provide instant actionable value, positioning you as the go-to resource.', formatBias: 'Step-by-step carousel or tutorial video' },
  ];

  const shuffled = [...allAngleData].sort(() => Math.random() - 0.5);
  const selectedAngles = shuffled.slice(0, 9);

  const contentBriefObjectives = [
    `Establish authority in ${niche} by challenging conventional wisdom`,
    `Drive engagement through data-backed insights about ${mainTrend}`,
    `Build community trust with transparent, authentic content`,
    `Generate saves and shares with actionable frameworks`,
    `Spark conversation around ${mainPain} solutions`,
    `Position as thought leader with forward-looking analysis`,
    `Create viral-potential content through emotional storytelling`,
    `Drive traffic with comparison content that answers key buying questions`,
    `Build brand loyalty through relatable underdog narratives`,
  ];

  const ctaOptions = [
    `Save this for when you need it. Follow for more ${niche} insights.`,
    `Drop a "${niche}" in the comments if you agree.`,
    `Share this with someone who needs to hear it.`,
    `Which one surprised you most? Comment below.`,
    `Follow for the breakdown next week.`,
    `Link in bio to get the full framework.`,
    `Tag someone who still believes the myth.`,
    `Repost this before the algorithm buries it.`,
    `DM me "${mainTrend}" for the full guide.`,
  ];

  const angles: ContentAngle[] = selectedAngles.map((data, i) => {
    const hook = data.hooks[Math.floor(Math.random() * data.hooks.length)];

    const baseScore = 45 + Math.floor(Math.random() * 25);
    const painBonus = painList.length >= 2 ? 8 : painList.length >= 1 ? 4 : 0;
    const trendBonus = trendList.length >= 2 ? 7 : trendList.length >= 1 ? 3 : 0;
    const seasonalBonus = Math.floor(seasonal.boost / 3);
    const typeBonus = contentType === 'Controversial' || contentType === 'Storytelling' ? 6 : contentType === 'Case Study' || contentType === 'Data Breakdown' ? 5 : 3;
    const platformBonus = platform === 'TikTok' || platform === 'LinkedIn' ? 5 : platform === 'Instagram' ? 4 : 2;
    const angleScore = Math.min(98, baseScore + painBonus + trendBonus + seasonalBonus + typeBonus + platformBonus);

    const engagementLevels = ['Moderate — steady shares', 'High — strong save rate', 'Very High — comment storm expected', 'Viral potential — shareable + debatable', 'High — bookmark magnet'];
    const engPrediction = angleScore >= 85 ? engagementLevels[3] : angleScore >= 75 ? engagementLevels[2] : angleScore >= 65 ? engagementLevels[1] : engagementLevels[0];

    const bestPlatforms: Record<string, string> = {
      'Contrarian Take': 'Twitter/X or LinkedIn',
      'Data-Driven': 'LinkedIn or Instagram',
      'Story-Based': 'Instagram or TikTok',
      'Comparison': 'YouTube or Instagram',
      'Prediction': 'LinkedIn or Twitter/X',
      'Behind-the-Scenes': 'TikTok or Instagram',
      'Myth-Busting': 'Twitter/X or TikTok',
      'Underdog Narrative': 'LinkedIn or YouTube',
      'Hot Take Remix': 'Twitter/X or TikTok',
      'Framework Reveal': 'Instagram or LinkedIn',
    };

    const keyPoints = [
      `Address the core pain point: ${painList[i % painList.length] || mainPain}`,
      `Reference ${trendList[i % trendList.length] || mainTrend} to stay timely`,
      `Include a specific example or data point for credibility`,
      `End with a clear takeaway the audience can act on immediately`,
    ];

    return {
      category: data.category,
      hookHeadline: hook,
      description: `A ${data.category.toLowerCase()} angle targeting ${niche} audiences who struggle with ${mainPain}. This approach leverages ${contentType.toLowerCase()} content to reframe the conversation around ${trendList[i % trendList.length] || mainTrend}, making your perspective stand out in a crowded feed.`,
      whyItWorks: data.whyBase,
      engagementPrediction: engPrediction,
      bestPlatform: bestPlatforms[data.category] || platform,
      contentFormat: data.formatBias,
      angleScore,
      seasonalTip: `${seasonal.label} — tie this angle to ${seasonal.label.toLowerCase()} themes for a +${seasonal.boost}% reach boost this month.`,
      contentBrief: {
        objective: contentBriefObjectives[i % contentBriefObjectives.length],
        keyPoints,
        openingHook: hook,
        callToAction: ctaOptions[i % ctaOptions.length],
        estimatedLength: ps.lengthGuide,
      },
    };
  });

  angles.sort((a, b) => b.angleScore - a.angleScore);

  const overallStrategy = `For ${niche} on ${platform}, focus on ${contentType.toLowerCase()} content that addresses "${mainPain}". Mix high-score angles (80+) for growth posts with lower-score evergreen angles for consistency. Aim for a 3:1 ratio of value-to-promotional content. Current trend "${mainTrend}" creates a timely hook — ride it within the next 2-4 weeks for maximum impact.`;

  const timingRecommendation = `Best posting window for ${platform}: ${platform === 'LinkedIn' ? 'Tue-Thu, 8-10 AM' : platform === 'TikTok' ? 'Mon-Fri, 7-9 PM' : platform === 'Instagram' ? 'Tue-Fri, 11 AM-1 PM' : platform === 'Twitter/X' ? 'Mon-Fri, 8-10 AM & 6-9 PM' : platform === 'YouTube' ? 'Thu-Sun, 2-4 PM' : 'Weekdays, 10 AM-2 PM'}. Seasonal window: ${seasonal.label} (current month boost: +${seasonal.boost}%).`;

  const nicheInsight = `The ${niche} space is currently saturated with generic advice content. The angles with highest differentiation potential are contrarian takes and framework reveals — these two categories consistently outperform in ${niche} because audiences crave specificity over generalities. Pair any angle with real numbers (even small sample sizes) to 3x your credibility.`;

  return { angles, overallStrategy, timingRecommendation, nicheInsight };
}

export default function AngleGeneratorPage() {
  const [niche, setNiche] = useState('');
  const [platform, setPlatform] = useState<string>('Instagram');
  const [contentType, setContentType] = useState<string>('Educational');
  const [painPoints, setPainPoints] = useState('');
  const [trendingTopics, setTrendingTopics] = useState('');
  const [result, setResult] = useState<AngleResult | null>(null);
  const [expandedBrief, setExpandedBrief] = useState<number | null>(null);

  const handleGenerate = () => {
    if (!niche.trim() || !painPoints.trim()) return;
    setExpandedBrief(null);
    setResult(generateAngles(niche.trim(), platform, contentType, painPoints.trim(), trendingTopics.trim()));
  };

  return (
    <main className="min-h-screen bg-zinc-950 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Content Angle Generator</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Generate unique, high-impact content angles for any niche. Get <strong className="text-white">contrarian takes, data-driven hooks, story angles</strong> and more — each with a virality score, content brief, and platform recommendation.</p>

        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Niche / Industry</label>
            <select value={niche ? undefined : ''} onChange={e => setNiche(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white hidden">
              {industries.map(i => <option key={i}>{i}</option>)}
            </select>
            <input type="text" value={niche} onChange={e => setNiche(e.target.value)} placeholder="e.g., SaaS marketing, fitness coaching" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600" />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Target Platform</label>
            <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {platforms.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Content Type</label>
            <select value={contentType} onChange={e => setContentType(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {contentTypes.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Audience Pain Points (comma-separated)</label>
            <input type="text" value={painPoints} onChange={e => setPainPoints(e.target.value)} placeholder="e.g., low engagement, no leads, content burnout" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600" />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Trending Topics (comma-separated, optional)</label>
            <input type="text" value={trendingTopics} onChange={e => setTrendingTopics(e.target.value)} placeholder="e.g., AI tools, short-form video, community building" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600" />
          </div>
        </div>

        <button onClick={handleGenerate} className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition">
          Generate Content Angles
        </button>

        {result && (
          <div className="mt-10 space-y-6">
            {/* Strategy Overview */}
            <div className="bg-zinc-900 border border-violet-500/30 rounded-xl p-5">
              <h2 className="text-lg font-semibold text-white mb-2">Strategy Overview</h2>
              <p className="text-zinc-300 text-sm mb-3">{result.overallStrategy}</p>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="bg-zinc-800/50 rounded-lg p-3">
                  <span className="text-zinc-500 text-xs uppercase">Timing</span>
                  <p className="text-zinc-300 mt-1">{result.timingRecommendation}</p>
                </div>
                <div className="bg-zinc-800/50 rounded-lg p-3">
                  <span className="text-zinc-500 text-xs uppercase">Niche Insight</span>
                  <p className="text-zinc-300 mt-1">{result.nicheInsight}</p>
                </div>
              </div>
            </div>

            {/* Angles */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Generated Angles ({result.angles.length})</h2>
              {result.angles.map((angle, i) => (
                <div key={i} className={`bg-zinc-900 border rounded-xl p-5 ${i === 0 ? 'border-violet-500/50' : 'border-zinc-800'}`}>
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${i === 0 ? 'bg-violet-600/20 text-violet-300' : 'bg-zinc-800 text-zinc-400'}`}>#{i + 1}</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-fuchsia-600/20 text-fuchsia-300">{angle.category}</span>
                      {i === 0 && <span className="text-xs px-2 py-1 rounded-full bg-green-600/20 text-green-300">Top Pick</span>}
                    </div>
                    <div className={`text-2xl font-bold ${angle.angleScore >= 80 ? 'text-green-400' : angle.angleScore >= 65 ? 'text-yellow-400' : 'text-orange-400'}`}>
                      {angle.angleScore}<span className="text-xs text-zinc-500 ml-1">/ 100</span>
                    </div>
                  </div>

                  <h3 className="text-white font-semibold text-lg mb-2">{angle.hookHeadline}</h3>
                  <p className="text-zinc-400 text-sm mb-3">{angle.description}</p>

                  <div className="grid md:grid-cols-2 gap-3 text-sm mb-3">
                    <div>
                      <span className="text-xs text-zinc-500 uppercase">Why It Works</span>
                      <p className="text-zinc-300 mt-1">{angle.whyItWorks}</p>
                    </div>
                    <div className="space-y-2">
                      <div><span className="text-xs text-zinc-500 uppercase">Engagement: </span><span className="text-zinc-300">{angle.engagementPrediction}</span></div>
                      <div><span className="text-xs text-zinc-500 uppercase">Best Platform: </span><span className="text-violet-400">{angle.bestPlatform}</span></div>
                      <div><span className="text-xs text-zinc-500 uppercase">Format: </span><span className="text-zinc-300">{angle.contentFormat}</span></div>
                      <div><span className="text-xs text-zinc-500 uppercase">Seasonal: </span><span className="text-fuchsia-300 text-xs">{angle.seasonalTip}</span></div>
                    </div>
                  </div>

                  {/* Content Brief Toggle */}
                  <button
                    onClick={() => setExpandedBrief(expandedBrief === i ? null : i)}
                    className="text-sm text-violet-400 hover:text-violet-300 transition flex items-center gap-1"
                  >
                    {expandedBrief === i ? 'Hide' : 'Show'} Content Brief
                    <span className={`inline-block transition-transform ${expandedBrief === i ? 'rotate-180' : ''}`}>&#9660;</span>
                  </button>

                  {expandedBrief === i && (
                    <div className="mt-3 bg-zinc-800/50 rounded-lg p-4 space-y-3 text-sm">
                      <div>
                        <span className="text-zinc-500 text-xs uppercase">Objective</span>
                        <p className="text-zinc-300">{angle.contentBrief.objective}</p>
                      </div>
                      <div>
                        <span className="text-zinc-500 text-xs uppercase">Opening Hook</span>
                        <p className="text-white font-medium">{angle.contentBrief.openingHook}</p>
                      </div>
                      <div>
                        <span className="text-zinc-500 text-xs uppercase">Key Points to Cover</span>
                        <ul className="mt-1 space-y-1">
                          {angle.contentBrief.keyPoints.map((kp, j) => (
                            <li key={j} className="text-zinc-300 flex gap-2"><span className="text-violet-400">-</span>{kp}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="text-zinc-500 text-xs uppercase">Call to Action</span>
                        <p className="text-fuchsia-300">{angle.contentBrief.callToAction}</p>
                      </div>
                      <div>
                        <span className="text-zinc-500 text-xs uppercase">Estimated Length</span>
                        <p className="text-zinc-300">{angle.contentBrief.estimatedLength}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Score Legend */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Angle Score Guide</h3>
              <div className="grid md:grid-cols-3 gap-3 text-sm">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-400"></span><span className="text-zinc-300">80-100: High virality potential — prioritize these</span></div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-yellow-400"></span><span className="text-zinc-300">65-79: Strong performer — great for consistency</span></div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-orange-400"></span><span className="text-zinc-300">Below 65: Niche play — add more specificity</span></div>
              </div>
            </div>

            {/* Internal Links */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-zinc-400 mb-3">Build on Your Angles</h3>
              <div className="flex flex-wrap gap-2 text-sm">
                <a href="/hooks" className="text-violet-400 hover:text-violet-300 underline">Hook Generator</a>
                <a href="/content-pillars" className="text-violet-400 hover:text-violet-300 underline">Content Pillars</a>
                <a href="/content-calendar" className="text-violet-400 hover:text-violet-300 underline">Content Calendar</a>
                <a href="/caption-optimizer" className="text-violet-400 hover:text-violet-300 underline">Caption Optimizer</a>
                <a href="/content-recycler" className="text-violet-400 hover:text-violet-300 underline">Content Recycler</a>
                <a href="/virality-score" className="text-violet-400 hover:text-violet-300 underline">Virality Score</a>
                <a href="/ad-copy" className="text-violet-400 hover:text-violet-300 underline">Ad Copy Generator</a>
                <a href="/content-gap" className="text-violet-400 hover:text-violet-300 underline">Content Gap Analyzer</a>
              </div>
            </div>
          </div>
        )}

        {/* FAQ */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">Content Angle Generator FAQ</h2>
          <div className="space-y-4">
            {[
              { q: 'What is a content angle and why does it matter?', a: 'A content angle is the unique perspective or framing you use to present a topic. The same topic (e.g., "email marketing") can be covered from a contrarian angle ("Why email marketing is dead"), a data angle ("We sent 1M emails — here\'s what worked"), or a story angle ("How one email saved our company"). The right angle determines whether your content gets scrolled past or goes viral.' },
              { q: 'How many angles should I use per week?', a: 'For most creators and brands, 3-5 posts per week using 2-3 different angle types creates the ideal mix. Rotate between high-engagement angles (contrarian, hot takes) and high-value angles (frameworks, data) to build both reach and authority. Never use the same angle type more than twice in a row.' },
              { q: 'Which angle type gets the most engagement?', a: 'Contrarian takes and hot take remixes consistently drive the highest comment counts. Data-driven and framework reveals get the most saves and bookmarks. Story-based angles get the highest completion rates on video. The best strategy combines all three — controversy for reach, data for credibility, stories for connection.' },
              { q: 'How does the angle score work?', a: 'The angle score (1-100) is calculated based on multiple factors: the specificity of your pain points and trending topics, platform-content fit, content type engagement benchmarks, and seasonal timing bonuses. Scores above 80 indicate high virality potential, while scores below 65 suggest adding more specificity to your inputs for better results.' },
              { q: 'Can I use these angles for paid ads too?', a: 'Absolutely. Contrarian and data-driven angles make excellent ad hooks — they stop the scroll. Use the generated hook headlines as ad primary text openers, then pair with our Ad Copy Generator to build full ad variations. Framework reveals also convert well as lead magnets in paid campaigns.' },
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
              <ul className="space-y-1"><li><a href="/" className="hover:text-white transition">Post Generator</a></li><li><a href="/hooks" className="hover:text-white transition">Hook Generator</a></li><li><a href="/video-scripts" className="hover:text-white transition">Video Scripts</a></li><li><a href="/threads" className="hover:text-white transition">Thread Generator</a></li><li><a href="/carousel-generator" className="hover:text-white transition">Carousel Generator</a></li><li><a href="/ad-copy" className="hover:text-white transition">Ad Copy Generator</a></li><li><a href="/angle-generator" className="hover:text-white transition">Angle Generator</a></li></ul>
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
          <p className="text-center text-zinc-600 text-xs mt-8">&copy; 2026 PostCraft AI. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
