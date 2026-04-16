'use client';
import { useState } from 'react';

const platforms = ['Instagram', 'TikTok', 'Twitter/X', 'LinkedIn', 'YouTube', 'Facebook', 'Pinterest', 'Threads'] as const;
const followerTiers = ['0-1K', '1K-10K', '10K-50K', '50K-100K', '100K-500K', '500K+'] as const;
const growthGoals = ['Double Followers', '10x Growth', 'First 1K', 'Monetization Ready', 'Brand Authority', 'Viral Breakthrough'] as const;
const timelines = ['30 Days', '60 Days', '90 Days', '6 Months', '1 Year'] as const;
const contentStyles = ['Educational', 'Entertainment', 'Inspirational', 'Behind-the-Scenes', 'News & Commentary', 'Tutorial'] as const;

interface GrowthSnapshot {
  platform: string;
  currentTier: string;
  projectedFollowers: number;
  monthlyGrowthRate: number;
  keyMetric: string;
  confidenceLevel: number;
}

interface GrowthMilestone {
  label: string;
  targetFollowers: number;
  keyAction: string;
  metric: string;
  status: 'upcoming' | 'in-progress';
}

interface ContentStrategy {
  contentType: string;
  frequency: number;
  bestTime: string;
  expectedEngagement: number;
  whyItWorks: string;
}

interface GrowthTactic {
  name: string;
  effort: 'Low' | 'Medium' | 'High';
  impact: number;
  timeToResults: string;
  description: string;
}

interface PlatformHack {
  name: string;
  trick: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  potentialUpside: string;
}

interface MonetizationPath {
  method: string;
  requiredFollowers: string;
  estimatedRevenue: string;
  timeToFirstDollar: string;
}

interface WeeklyAction {
  day: string;
  morning: string;
  afternoon: string;
  evening: string;
}

interface GrowthResult {
  snapshot: GrowthSnapshot;
  milestones: GrowthMilestone[];
  contentStrategy: ContentStrategy[];
  tactics: GrowthTactic[];
  hacks: PlatformHack[];
  monetization: MonetizationPath[];
  weeklyPlan: WeeklyAction[];
}

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function pick<T>(arr: T[], seed: number, idx: number = 0): T {
  return arr[(seed + idx) % arr.length];
}

function generateGrowthPlan(platform: string, tier: string, niche: string, goal: string, timeline: string, style: string): GrowthResult {
  const seed = hash(`${platform}-${tier}-${niche}-${goal}-${timeline}-${style}`);
  const nicheLabel = niche || 'general content';

  const tierMultiplier: Record<string, number> = { '0-1K': 500, '1K-10K': 5000, '10K-50K': 25000, '50K-100K': 70000, '100K-500K': 250000, '500K+': 750000 };
  const timeMultiplier: Record<string, number> = { '30 Days': 1.15, '60 Days': 1.35, '90 Days': 1.6, '6 Months': 2.5, '1 Year': 4.2 };
  const base = tierMultiplier[tier] || 5000;
  const mult = timeMultiplier[timeline] || 1.5;
  const projected = Math.round(base * mult * (1 + (seed % 20) / 100));
  const monthlyRate = +(((mult - 1) / (timeline === '1 Year' ? 12 : timeline === '6 Months' ? 6 : timeline === '90 Days' ? 3 : timeline === '60 Days' ? 2 : 1)) * 100).toFixed(1);

  const keyMetrics = ['Engagement Rate', 'Save-to-Impression Ratio', 'Watch Time', 'Share Rate', 'Profile Visit Rate', 'Comment Rate', 'Follower-to-View Ratio', 'Story Completion Rate'];
  const confidenceLevels = [72, 78, 85, 68, 81, 76, 88, 74, 82, 79];

  const snapshot: GrowthSnapshot = {
    platform,
    currentTier: tier,
    projectedFollowers: projected,
    monthlyGrowthRate: monthlyRate,
    keyMetric: pick(keyMetrics, seed, 0),
    confidenceLevel: pick(confidenceLevels, seed, 1),
  };

  const milestoneActions = [
    'Optimize profile bio and link-in-bio for conversion',
    'Launch signature content series (3x/week minimum)',
    'Collaborate with 5 micro-creators in your niche',
    'Run a viral giveaway or challenge campaign',
    'Implement hashtag rotation strategy with 30 targeted tags',
    'Go live weekly with Q&A sessions to boost algorithm favor',
    'Create a lead magnet to convert followers to email list',
    'Cross-promote on 2 secondary platforms daily',
    'Publish 3 pillar pieces of evergreen content',
    'Engage in 50+ genuine comments daily in your niche',
  ];
  const milestoneMetrics = ['engagement rate > 5%', 'save rate > 8%', '10K+ impressions per post', 'follower growth rate > 3%/week', 'avg 500+ likes per post', 'DM conversion rate > 2%'];

  const milestones: GrowthMilestone[] = Array.from({ length: 6 }, (_, i) => {
    const fraction = (i + 1) / 6;
    return {
      label: timeline === '1 Year' ? `Month ${Math.round(fraction * 12)}` : timeline === '6 Months' ? `Month ${Math.round(fraction * 6)}` : `Week ${Math.round(fraction * (timeline === '90 Days' ? 12 : timeline === '60 Days' ? 8 : 4))}`,
      targetFollowers: Math.round(base + (projected - base) * fraction),
      keyAction: pick(milestoneActions, seed, i),
      metric: pick(milestoneMetrics, seed, i + 3),
      status: i === 0 ? 'in-progress' : 'upcoming',
    };
  });

  const contentTypesMap: Record<string, string[]> = {
    'Instagram': ['Reels (15-30s)', 'Carousel Posts', 'Stories (daily)', 'Guides', 'Live Sessions', 'Collabs', 'Static Posts'],
    'TikTok': ['Trending Audio Videos', 'Duets & Stitches', 'Story Time', 'Tutorial Clips', 'Behind-the-Scenes', 'Series Content', 'LIVE'],
    'Twitter/X': ['Thread (5-10 tweets)', 'Hot Takes', 'Value Bombs', 'Polls', 'Quote Tweets', 'Lists Curation', 'Spaces'],
    'LinkedIn': ['Long-form Posts', 'Document Carousels', 'Video Posts', 'Polls', 'Newsletter', 'Articles', 'Company Updates'],
    'YouTube': ['Shorts (< 60s)', 'Tutorials (10-15 min)', 'Vlogs', 'Listicles', 'Community Posts', 'Live Streams', 'Collabs'],
    'Facebook': ['Reels', 'Group Posts', 'Live Videos', 'Stories', 'Link Posts', 'Photo Albums', 'Events'],
    'Pinterest': ['Idea Pins', 'Standard Pins', 'Video Pins', 'Boards Curation', 'Infographics', 'Step-by-Step Guides', 'Product Pins'],
    'Threads': ['Text Posts', 'Photo Carousels', 'Quote Replies', 'Polls', 'Conversation Starters', 'Hot Takes', 'Value Threads'],
  };

  const times = ['6:00 AM', '7:30 AM', '9:00 AM', '11:00 AM', '12:30 PM', '2:00 PM', '5:00 PM', '6:30 PM', '8:00 PM', '9:30 PM'];
  const whyReasons = [
    `${platform}'s algorithm heavily favors this format for ${nicheLabel} creators`,
    `High save and share rates in the ${nicheLabel} space drive organic reach`,
    `Builds parasocial connection — key for ${nicheLabel} audience retention`,
    `Leverages trending patterns that boost discovery for ${nicheLabel}`,
    `Encourages community engagement which signals quality to the algorithm`,
    `Evergreen format that continues driving followers months after posting`,
    `Creates binge-worthy series that increase watch time and profile visits`,
  ];

  const pTypes = contentTypesMap[platform] || contentTypesMap['Instagram'];
  const contentStrategy: ContentStrategy[] = pTypes.map((ct, i) => ({
    contentType: ct,
    frequency: [7, 4, 7, 2, 1, 3, 5][i % 7],
    bestTime: pick(times, seed, i),
    expectedEngagement: +((3 + (seed + i * 7) % 12) / 10 * 5).toFixed(1),
    whyItWorks: pick(whyReasons, seed, i),
  }));

  const allTactics = [
    { name: 'Hashtag Ladder Strategy', effort: 'Low' as const, time: '2-4 weeks', desc: `Use 10 small (< 50K posts), 10 medium (50K-500K), and 10 large hashtags. Rotate sets every 3 days to avoid shadowban flags in the ${nicheLabel} niche.` },
    { name: 'Comment-First Networking', effort: 'Medium' as const, time: '1-2 weeks', desc: `Leave 50+ genuine, thoughtful comments daily on accounts in ${nicheLabel}. This drives profile visits from engaged audiences who discover you organically.` },
    { name: 'Content Batching System', effort: 'High' as const, time: '1 week', desc: `Batch-create 2 weeks of content in one session. Use templates for ${nicheLabel} content to maintain consistency while reducing daily creative fatigue.` },
    { name: 'Collab Pod Formation', effort: 'Medium' as const, time: '2-3 weeks', desc: `Form a group of 8-12 ${nicheLabel} creators at similar follower counts. Share and engage with each other's content within 30 minutes of posting.` },
    { name: 'Trend-Jacking Framework', effort: 'Low' as const, time: '3-7 days', desc: `Monitor trending audio, formats, and topics daily. Adapt the top 3 trends to ${nicheLabel} within 6 hours of emergence for maximum viral potential.` },
    { name: 'SEO-Optimized Captions', effort: 'Low' as const, time: '2-4 weeks', desc: `Include 3-5 searchable keywords naturally in every caption. ${platform} search is growing — ${nicheLabel} keywords drive passive discovery.` },
    { name: 'Story Engagement Loops', effort: 'Medium' as const, time: '1-2 weeks', desc: `Post 8-12 stories daily with polls, quizzes, and sliders. High story engagement signals to ${platform}'s algorithm to boost your feed posts.` },
    { name: 'Viral Hook Library', effort: 'High' as const, time: '1-3 weeks', desc: `Build a swipe file of 50+ proven hooks for ${nicheLabel}. Test 3 hook variations per post. Top-performing hooks get reused with new content angles.` },
    { name: 'DM Automation Funnel', effort: 'Medium' as const, time: '1-2 weeks', desc: `Set up keyword-triggered auto-DMs that deliver value (free guides, templates). Converts passive ${nicheLabel} viewers into engaged community members.` },
    { name: 'Cross-Platform Repurposing', effort: 'Low' as const, time: '1-2 weeks', desc: `Repurpose every piece of ${nicheLabel} content to 3+ platforms with format-native tweaks. Multiply reach without multiplying content creation effort.` },
  ];

  const tactics: GrowthTactic[] = allTactics.slice(0, 8).map((t, i) => ({
    name: t.name,
    effort: t.effort,
    description: t.desc,
    impact: 60 + ((seed + i * 11) % 35),
    timeToResults: t.time,
  }));

  const hacksByPlatform: Record<string, PlatformHack[]> = {
    'Instagram': [
      { name: 'Reel Loop Trick', trick: 'Make the last frame seamlessly connect to the first — viewers auto-rewatch, boosting watch time 2-3x', riskLevel: 'Low', potentialUpside: '+40% views' },
      { name: 'Carousel Bait Slide', trick: 'Use "Swipe for the answer" on slide 1 — forces swipes which count as engagement signals', riskLevel: 'Low', potentialUpside: '+60% saves' },
      { name: 'Explore Page Timing', trick: 'Post at off-peak hours (5-6 AM) when competition is low but early-bird scrollers are active', riskLevel: 'Low', potentialUpside: '+25% reach' },
      { name: 'Alt-Text SEO', trick: 'Write keyword-rich alt text on every image — Instagram uses it for Explore page categorization', riskLevel: 'Low', potentialUpside: '+30% discovery' },
      { name: 'Close Friends Broadcast', trick: 'Use Close Friends stories for exclusive content — creates FOMO and increases DM engagement', riskLevel: 'Medium', potentialUpside: '+50% DMs' },
    ],
    'TikTok': [
      { name: 'Watch-Time Stacking', trick: 'Keep videos under 7 seconds for maximum completion rate — algorithm rewards 100%+ watch-through', riskLevel: 'Low', potentialUpside: '+80% FYP reach' },
      { name: 'Comment Pinning Strategy', trick: 'Pin a controversial or curiosity-driving comment to boost comment section engagement', riskLevel: 'Low', potentialUpside: '+45% comments' },
      { name: 'Series Feature Hack', trick: 'Use the Series feature to create binge-worthy episodes — algorithm promotes sequential content', riskLevel: 'Low', potentialUpside: '+35% profile visits' },
      { name: 'Sound Layering', trick: 'Layer a trending sound at 1% volume under your original audio — gets indexed under trending sound', riskLevel: 'Medium', potentialUpside: '+60% discovery' },
      { name: 'Stitch Controversy', trick: 'Stitch popular creators with a respectful counter-opinion — their audience discovers you', riskLevel: 'Medium', potentialUpside: '+100% new followers' },
    ],
    'Twitter/X': [
      { name: 'Thread Timing', trick: 'Post thread opener at 8 AM, add replies every 30 min — keeps thread in timeline all day', riskLevel: 'Low', potentialUpside: '+70% impressions' },
      { name: 'Quote-Tweet Chain', trick: 'Quote-tweet viral posts with unique insights — piggybacks on trending conversations', riskLevel: 'Low', potentialUpside: '+50% profile visits' },
      { name: 'Bookmark Bait', trick: 'End threads with "Bookmark this for later" — bookmarks are a strong ranking signal', riskLevel: 'Low', potentialUpside: '+40% reach' },
      { name: 'Spaces Co-Host', trick: 'Co-host Spaces with larger accounts — their followers get notified with your name attached', riskLevel: 'Low', potentialUpside: '+200 followers/session' },
      { name: 'Engagement Pod Timing', trick: 'Get 10+ replies in the first 5 minutes — signals virality to the algorithm', riskLevel: 'Medium', potentialUpside: '+80% distribution' },
    ],
  };
  const defaultHacks: PlatformHack[] = [
    { name: 'Algorithm Reset Post', trick: 'Post a high-engagement format (poll/question) to reset your algorithmic score after low-performing posts', riskLevel: 'Low', potentialUpside: '+30% next-post reach' },
    { name: 'Bio Link Rotation', trick: 'Change your bio link weekly to match your latest CTA — drives 2x more clicks than static links', riskLevel: 'Low', potentialUpside: '+50% link clicks' },
    { name: 'Peak Comment Window', trick: 'Reply to every comment within 30 minutes of posting — signals active engagement to the algorithm', riskLevel: 'Low', potentialUpside: '+25% reach' },
    { name: 'Content Velocity Burst', trick: 'Post 3x your normal frequency for 7 days — platforms reward consistency bursts with expanded reach', riskLevel: 'Medium', potentialUpside: '+40% followers' },
    { name: 'Niche Hashtag Domination', trick: `Find 5 hashtags with < 10K posts related to ${nicheLabel} and post 3x daily under them to become the top creator`, riskLevel: 'Medium', potentialUpside: '+60% niche authority' },
  ];
  const hacks = hacksByPlatform[platform] || defaultHacks;

  const monetization: MonetizationPath[] = [
    { method: 'Sponsored Posts', requiredFollowers: '5K+', estimatedRevenue: `$${100 + (seed % 400)}-$${500 + (seed % 2000)}/post`, timeToFirstDollar: '2-4 weeks' },
    { method: 'Affiliate Marketing', requiredFollowers: '1K+', estimatedRevenue: `$${200 + (seed % 800)}/month`, timeToFirstDollar: '1-2 weeks' },
    { method: 'Digital Products', requiredFollowers: '2K+', estimatedRevenue: `$${500 + (seed % 3000)}/month`, timeToFirstDollar: '4-6 weeks' },
    { method: 'Coaching / Consulting', requiredFollowers: '3K+', estimatedRevenue: `$${1000 + (seed % 5000)}/month`, timeToFirstDollar: '2-3 weeks' },
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const morningTasks = [
    `Review ${platform} analytics and top-performing posts`,
    'Research trending topics and sounds in your niche',
    `Engage with 20 ${nicheLabel} accounts (genuine comments)`,
    'Batch-create 3 content pieces using templates',
    `Plan and schedule weekend ${nicheLabel} content`,
    'Film 2 short-form videos with trending hooks',
    'Rest and review weekly growth metrics',
  ];
  const afternoonTasks = [
    'Publish primary content piece + engage for 30 min',
    'Create and schedule stories/ephemeral content',
    'Respond to all DMs and comments from yesterday',
    'Cross-post adapted content to secondary platform',
    'Reach out to 3 potential collaboration partners',
    'Publish secondary content + run engagement loop',
    'Plan next week\'s content calendar',
  ];
  const eveningTasks = [
    'Engage in niche communities (subreddits, groups)',
    'Research competitor content that performed well',
    'Draft hooks and captions for upcoming posts',
    'Go live for 15-30 min (Q&A or behind-the-scenes)',
    'Update link-in-bio and optimize profile',
    'Engage with new followers (welcome DMs)',
    'Review and iterate on content strategy',
  ];

  const weeklyPlan: WeeklyAction[] = days.map((day, i) => ({
    day,
    morning: morningTasks[i],
    afternoon: afternoonTasks[i],
    evening: eveningTasks[i],
  }));

  return { snapshot, milestones, contentStrategy, tactics, hacks, monetization, weeklyPlan };
}

export default function AudienceGrowthPage() {
  const [platform, setPlatform] = useState<string>(platforms[0]);
  const [tier, setTier] = useState<string>(followerTiers[0]);
  const [niche, setNiche] = useState('');
  const [goal, setGoal] = useState<string>(growthGoals[0]);
  const [timeline, setTimeline] = useState<string>(timelines[2]);
  const [style, setStyle] = useState<string>(contentStyles[0]);
  const [result, setResult] = useState<GrowthResult | null>(null);

  const effortColor = (e: string) => {
    switch (e) { case 'Low': return 'bg-green-100 text-green-700'; case 'Medium': return 'bg-yellow-100 text-yellow-700'; case 'High': return 'bg-red-100 text-red-700'; default: return 'bg-gray-100 text-gray-700'; }
  };
  const riskColor = (r: string) => {
    switch (r) { case 'Low': return 'bg-green-100 text-green-700'; case 'Medium': return 'bg-yellow-100 text-yellow-700'; case 'High': return 'bg-red-100 text-red-700'; default: return 'bg-gray-100 text-gray-700'; }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Audience Growth Planner</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Generate a strategic growth roadmap with milestones, content strategies, platform hacks, and weekly action plans to scale your audience predictably.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Platform</label>
              <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                {platforms.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Current Followers</label>
              <select value={tier} onChange={e => setTier(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                {followerTiers.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Growth Goal</label>
              <select value={goal} onChange={e => setGoal(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                {growthGoals.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Timeline</label>
              <select value={timeline} onChange={e => setTimeline(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                {timelines.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Content Style</label>
              <select value={style} onChange={e => setStyle(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                {contentStyles.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Niche / Industry</label>
              <input type="text" value={niche} onChange={e => setNiche(e.target.value)} placeholder="e.g. fitness coaching, SaaS, fashion" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
            </div>
          </div>
          <button onClick={() => setResult(generateGrowthPlan(platform, tier, niche, goal, timeline, style))} className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold text-lg hover:from-emerald-700 hover:to-teal-700 transition-all shadow-md">
            Generate Growth Plan
          </button>
        </div>

        {result && (
          <div className="space-y-8">
            {/* Growth Snapshot */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📊 Growth Snapshot</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-emerald-50 rounded-xl">
                  <div className="text-3xl font-bold text-emerald-700">{result.snapshot.projectedFollowers.toLocaleString()}</div>
                  <div className="text-sm text-gray-600 mt-1">Projected Followers</div>
                </div>
                <div className="text-center p-4 bg-teal-50 rounded-xl">
                  <div className="text-3xl font-bold text-teal-700">{result.snapshot.monthlyGrowthRate}%</div>
                  <div className="text-sm text-gray-600 mt-1">Monthly Growth Rate</div>
                </div>
                <div className="text-center p-4 bg-cyan-50 rounded-xl">
                  <div className="text-3xl font-bold text-cyan-700">{result.snapshot.confidenceLevel}%</div>
                  <div className="text-sm text-gray-600 mt-1">Confidence Level</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-sm font-bold text-green-700">{result.snapshot.keyMetric}</div>
                  <div className="text-sm text-gray-600 mt-1">Key Metric to Track</div>
                </div>
              </div>
            </div>

            {/* Growth Milestones */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🎯 Growth Milestones</h2>
              <div className="space-y-4">
                {result.milestones.map((m, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${m.status === 'in-progress' ? 'bg-emerald-500' : 'bg-gray-400'}`}>{i + 1}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-bold text-gray-900">{m.label}</span>
                        <span className="text-sm text-emerald-600 font-semibold">{m.targetFollowers.toLocaleString()} followers</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${m.status === 'in-progress' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-600'}`}>{m.status}</span>
                      </div>
                      <p className="text-sm text-gray-600">{m.keyAction}</p>
                      <p className="text-xs text-gray-500 mt-1">Target: {m.metric}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Strategy */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📝 Content Strategy</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Content Type</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">Frequency</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">Best Time</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">Engagement</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Why It Works</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.contentStrategy.map((cs, i) => (
                      <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">{cs.contentType}</td>
                        <td className="py-3 px-4 text-center">{cs.frequency}x/week</td>
                        <td className="py-3 px-4 text-center text-gray-600">{cs.bestTime}</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${cs.expectedEngagement >= 5 ? 'bg-emerald-100 text-emerald-700' : cs.expectedEngagement >= 3 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}>
                            {cs.expectedEngagement}%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600 text-xs">{cs.whyItWorks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Growth Tactics */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🚀 Growth Tactics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.tactics.map((t, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-900">{t.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${effortColor(t.effort)}`}>{t.effort} Effort</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{t.description}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                          <span>Impact</span><span>{t.impact}/100</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${t.impact}%` }} />
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{t.timeToResults}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Hacks */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">⚡ {platform} Growth Hacks</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {result.hacks.map((h, i) => (
                  <div key={i} className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-900 text-sm">{h.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${riskColor(h.riskLevel)}`}>{h.riskLevel} Risk</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{h.trick}</p>
                    <div className="text-xs font-semibold text-emerald-700">Potential: {h.potentialUpside}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Monetization */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">💰 Monetization Path</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {result.monetization.map((m, i) => (
                  <div key={i} className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl text-center">
                    <h3 className="font-bold text-gray-900 mb-2">{m.method}</h3>
                    <div className="text-xl font-bold text-emerald-700 mb-1">{m.estimatedRevenue}</div>
                    <div className="text-xs text-gray-500">Requires: {m.requiredFollowers}</div>
                    <div className="text-xs text-gray-500">First $: {m.timeToFirstDollar}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Action Plan */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📅 Weekly Action Plan</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {result.weeklyPlan.map((w, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-xl">
                    <h3 className="font-bold text-emerald-700 mb-3">{w.day}</h3>
                    <div className="space-y-2">
                      <div>
                        <span className="text-xs font-semibold text-orange-600">🌅 Morning</span>
                        <p className="text-xs text-gray-600">{w.morning}</p>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-blue-600">☀️ Afternoon</span>
                        <p className="text-xs text-gray-600">{w.afternoon}</p>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-purple-600">🌙 Evening</span>
                        <p className="text-xs text-gray-600">{w.evening}</p>
                      </div>
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
