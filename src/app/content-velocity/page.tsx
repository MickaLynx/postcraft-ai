'use client';
import { useState } from 'react';

const platforms = ['Instagram', 'TikTok', 'LinkedIn', 'Twitter/X', 'YouTube', 'Facebook', 'Pinterest'] as const;
const frequencies = ['Daily', '2-3x/week', 'Weekly', 'Bi-weekly', 'Monthly', 'Irregular'] as const;
const contentTypes = ['Posts', 'Reels/Shorts', 'Stories', 'Carousels', 'Threads', 'Lives', 'Blogs', 'Newsletters', 'Podcasts'] as const;
const teamSizes = ['Solo creator', '2-3 people', 'Small team (4-10)', 'Agency (10+)'] as const;
const budgets = ['$0', 'Under $500', '$500-$2K', '$2K-$5K', '$5K+'] as const;
const goals = ['Grow followers', 'Drive sales', 'Build authority', 'Generate leads', 'Community building', 'Brand awareness'] as const;

interface VelocityResult {
  velocityScore: number;
  currentAnalysis: { postsPerWeek: number; diversityScore: number; consistencyRating: string; platformFitScore: number };
  optimalRecommendation: {
    recommendedPostsPerWeek: number;
    contentMix: { type: string; percentage: number }[];
    schedule: { day: string; time: string; contentType: string }[];
    batchPlan: { session: string; quantity: number; types: string[] }[];
  };
  growthProjection: { period: string; metric: string; detail: string }[];
  accelerationPlan: { phase: string; items: string[] }[];
  pipeline: { weekday: string; slots: string[]; status: string }[];
  bottlenecks: string[];
  efficiencyScore: number;
  competitorBenchmark: { metric: string; industryAvg: string; topPerformer: string; yours: string; gap: string }[];
}

function generateVelocityAnalysis(
  brand: string, platform: string, frequency: string, selectedTypes: string[],
  teamSize: string, budget: string, goal: string
): VelocityResult {
  const b = brand || 'Your Brand';
  const seed = (b.length * 7 + platform.length * 13 + goal.length * 3) % 100;

  // Frequency to posts/week mapping
  const freqMap: Record<string, number> = {
    'Daily': 7, '2-3x/week': 2.5, 'Weekly': 1, 'Bi-weekly': 0.5, 'Monthly': 0.25, 'Irregular': 1.5,
  };
  const currentPostsPerWeek = freqMap[frequency] || 1;

  // Platform optimal frequencies
  const platformOptimal: Record<string, number> = {
    'Instagram': 5, 'TikTok': 10, 'LinkedIn': 4, 'Twitter/X': 14,
    'YouTube': 2, 'Facebook': 4, 'Pinterest': 7,
  };
  const optimalPosts = platformOptimal[platform] || 5;

  // Team capacity multiplier
  const teamMultiplier: Record<string, number> = {
    'Solo creator': 0.6, '2-3 people': 0.85, 'Small team (4-10)': 1.1, 'Agency (10+)': 1.4,
  };
  const teamCap = teamMultiplier[teamSize] || 0.7;

  // Budget multiplier
  const budgetMultiplier: Record<string, number> = {
    '$0': 0.5, 'Under $500': 0.7, '$500-$2K': 0.9, '$2K-$5K': 1.1, '$5K+': 1.3,
  };
  const budgetCap = budgetMultiplier[budget] || 0.7;

  // Diversity score based on content types selected
  const diversityScore = Math.min(100, Math.round((selectedTypes.length / contentTypes.length) * 100 + seed % 10));

  // Consistency rating
  const consistencyRatings = ['Irregular', 'Needs Improvement', 'Developing', 'Consistent', 'Highly Consistent'];
  const consistencyIndex = frequency === 'Daily' ? 4 : frequency === '2-3x/week' ? 3 : frequency === 'Weekly' ? 2 : frequency === 'Irregular' ? 0 : 1;
  const consistencyRating = consistencyRatings[consistencyIndex];

  // Platform fit score
  const platformFitBase: Record<string, string[]> = {
    'Instagram': ['Posts', 'Reels/Shorts', 'Stories', 'Carousels'],
    'TikTok': ['Reels/Shorts', 'Lives'],
    'LinkedIn': ['Posts', 'Carousels', 'Threads', 'Newsletters'],
    'Twitter/X': ['Posts', 'Threads'],
    'YouTube': ['Reels/Shorts', 'Lives', 'Podcasts'],
    'Facebook': ['Posts', 'Reels/Shorts', 'Lives', 'Stories'],
    'Pinterest': ['Posts', 'Carousels', 'Blogs'],
  };
  const fitTypes = platformFitBase[platform] || ['Posts'];
  const matchCount = selectedTypes.filter(t => fitTypes.includes(t)).length;
  const platformFitScore = Math.min(100, Math.round((matchCount / Math.max(fitTypes.length, 1)) * 100));

  // Velocity Score (0-100)
  const volumeScore = Math.min(40, (currentPostsPerWeek / optimalPosts) * 40);
  const diversityComponent = diversityScore * 0.2;
  const consistencyComponent = (consistencyIndex / 4) * 25;
  const fitComponent = platformFitScore * 0.15;
  const velocityScore = Math.min(100, Math.round(volumeScore + diversityComponent + consistencyComponent + fitComponent));

  // Recommended posts per week (adjusted for team and budget)
  const recommendedPostsPerWeek = Math.round(optimalPosts * teamCap * budgetCap);

  // Content mix (varies by platform and goal)
  const goalMixes: Record<string, { type: string; percentage: number }[]> = {
    'Grow followers': [
      { type: 'Reels/Short-form Video', percentage: 35 },
      { type: 'Carousels/Infographics', percentage: 25 },
      { type: 'Trending/Reactive Content', percentage: 20 },
      { type: 'Community Engagement Posts', percentage: 12 },
      { type: 'Behind-the-Scenes', percentage: 8 },
    ],
    'Drive sales': [
      { type: 'Product Showcases', percentage: 30 },
      { type: 'Testimonials/Social Proof', percentage: 25 },
      { type: 'Educational Content', percentage: 20 },
      { type: 'Promotional/CTA Posts', percentage: 15 },
      { type: 'Stories/Urgency Content', percentage: 10 },
    ],
    'Build authority': [
      { type: 'Thought Leadership Posts', percentage: 30 },
      { type: 'Educational Deep-Dives', percentage: 25 },
      { type: 'Case Studies/Results', percentage: 20 },
      { type: 'Industry Commentary', percentage: 15 },
      { type: 'Personal Stories', percentage: 10 },
    ],
    'Generate leads': [
      { type: 'Value-First Education', percentage: 30 },
      { type: 'Problem/Solution Posts', percentage: 25 },
      { type: 'Lead Magnets/Freebies', percentage: 20 },
      { type: 'Social Proof/Results', percentage: 15 },
      { type: 'Direct CTA Content', percentage: 10 },
    ],
    'Community building': [
      { type: 'Discussion/Question Posts', percentage: 30 },
      { type: 'User-Generated Content', percentage: 25 },
      { type: 'Behind-the-Scenes', percentage: 20 },
      { type: 'Polls/Interactive Content', percentage: 15 },
      { type: 'Spotlight/Shoutouts', percentage: 10 },
    ],
    'Brand awareness': [
      { type: 'Viral-Format Content', percentage: 30 },
      { type: 'Brand Story/Values', percentage: 25 },
      { type: 'Collaborations/Features', percentage: 20 },
      { type: 'Reels/Short Video', percentage: 15 },
      { type: 'Trending Topics/Newsjacking', percentage: 10 },
    ],
  };
  const contentMix = goalMixes[goal] || goalMixes['Grow followers'];

  // Publishing schedule
  const platformSchedules: Record<string, { day: string; time: string; contentType: string }[]> = {
    'Instagram': [
      { day: 'Monday', time: '11:00 AM', contentType: 'Carousel' },
      { day: 'Tuesday', time: '7:00 PM', contentType: 'Reel' },
      { day: 'Wednesday', time: '12:00 PM', contentType: 'Story Series' },
      { day: 'Thursday', time: '6:00 PM', contentType: 'Feed Post' },
      { day: 'Friday', time: '10:00 AM', contentType: 'Reel' },
      { day: 'Saturday', time: '9:00 AM', contentType: 'Carousel' },
      { day: 'Sunday', time: '5:00 PM', contentType: 'Engagement Post' },
    ],
    'TikTok': [
      { day: 'Monday', time: '10:00 AM', contentType: 'Trending Audio' },
      { day: 'Monday', time: '7:00 PM', contentType: 'Original Content' },
      { day: 'Tuesday', time: '12:00 PM', contentType: 'Tutorial/How-To' },
      { day: 'Wednesday', time: '9:00 AM', contentType: 'Stitch/Duet' },
      { day: 'Wednesday', time: '6:00 PM', contentType: 'Storytelling' },
      { day: 'Thursday', time: '11:00 AM', contentType: 'Behind-the-Scenes' },
      { day: 'Friday', time: '3:00 PM', contentType: 'Trending Format' },
      { day: 'Saturday', time: '10:00 AM', contentType: 'Lifestyle/Casual' },
      { day: 'Sunday', time: '4:00 PM', contentType: 'Recap/Best-of' },
    ],
    'LinkedIn': [
      { day: 'Monday', time: '8:00 AM', contentType: 'Industry Insight' },
      { day: 'Tuesday', time: '10:00 AM', contentType: 'Personal Story' },
      { day: 'Wednesday', time: '9:00 AM', contentType: 'Document Carousel' },
      { day: 'Thursday', time: '8:30 AM', contentType: 'Hot Take/Opinion' },
      { day: 'Friday', time: '11:00 AM', contentType: 'Celebration/Milestone' },
    ],
    'Twitter/X': [
      { day: 'Monday', time: '8:00 AM', contentType: 'Thread' },
      { day: 'Monday', time: '12:00 PM', contentType: 'Quick Take' },
      { day: 'Tuesday', time: '9:00 AM', contentType: 'Value Tweet' },
      { day: 'Tuesday', time: '5:00 PM', contentType: 'Engagement Prompt' },
      { day: 'Wednesday', time: '10:00 AM', contentType: 'Thread' },
      { day: 'Thursday', time: '8:00 AM', contentType: 'Hot Take' },
      { day: 'Thursday', time: '3:00 PM', contentType: 'Visual/Infographic' },
      { day: 'Friday', time: '9:00 AM', contentType: 'Recap Thread' },
    ],
    'YouTube': [
      { day: 'Tuesday', time: '2:00 PM', contentType: 'Long-form Video' },
      { day: 'Thursday', time: '3:00 PM', contentType: 'Short' },
      { day: 'Saturday', time: '10:00 AM', contentType: 'Long-form Video' },
      { day: 'Sunday', time: '12:00 PM', contentType: 'Short' },
    ],
    'Facebook': [
      { day: 'Monday', time: '1:00 PM', contentType: 'Video Post' },
      { day: 'Wednesday', time: '11:00 AM', contentType: 'Photo/Link Post' },
      { day: 'Thursday', time: '2:00 PM', contentType: 'Reel' },
      { day: 'Friday', time: '10:00 AM', contentType: 'Group Discussion' },
      { day: 'Sunday', time: '9:00 AM', contentType: 'Story/Poll' },
    ],
    'Pinterest': [
      { day: 'Monday', time: '8:00 PM', contentType: 'Standard Pin' },
      { day: 'Tuesday', time: '9:00 PM', contentType: 'Idea Pin' },
      { day: 'Wednesday', time: '8:00 PM', contentType: 'Standard Pin' },
      { day: 'Thursday', time: '7:00 PM', contentType: 'Video Pin' },
      { day: 'Friday', time: '8:00 PM', contentType: 'Idea Pin' },
      { day: 'Saturday', time: '10:00 AM', contentType: 'Standard Pin' },
      { day: 'Sunday', time: '9:00 PM', contentType: 'Standard Pin' },
    ],
  };
  const schedule = (platformSchedules[platform] || platformSchedules['Instagram']).slice(0, recommendedPostsPerWeek);

  // Batch production plan
  const batchPlans: { session: string; quantity: number; types: string[] }[] = [];
  if (teamSize === 'Solo creator') {
    batchPlans.push(
      { session: 'Sunday Batch (2-3 hrs)', quantity: Math.ceil(recommendedPostsPerWeek * 0.6), types: ['Reels', 'Carousels', 'Graphics'] },
      { session: 'Wednesday Quick Session (1 hr)', quantity: Math.ceil(recommendedPostsPerWeek * 0.25), types: ['Text posts', 'Stories'] },
      { session: 'Daily (15 min)', quantity: Math.ceil(recommendedPostsPerWeek * 0.15), types: ['Engagement replies', 'Story updates'] },
    );
  } else if (teamSize === '2-3 people') {
    batchPlans.push(
      { session: 'Monday Production Day (4 hrs)', quantity: Math.ceil(recommendedPostsPerWeek * 0.5), types: ['Video content', 'Photography', 'Graphics'] },
      { session: 'Thursday Content Prep (2 hrs)', quantity: Math.ceil(recommendedPostsPerWeek * 0.3), types: ['Carousels', 'Threads', 'Copy'] },
      { session: 'Daily Engagement (30 min)', quantity: Math.ceil(recommendedPostsPerWeek * 0.2), types: ['Stories', 'Comments', 'Reactive posts'] },
    );
  } else if (teamSize === 'Small team (4-10)') {
    batchPlans.push(
      { session: 'Monday Sprint (Full day)', quantity: Math.ceil(recommendedPostsPerWeek * 0.4), types: ['Hero content', 'Long-form video', 'Premium graphics'] },
      { session: 'Wednesday Production (Half day)', quantity: Math.ceil(recommendedPostsPerWeek * 0.3), types: ['Short-form video', 'Carousels', 'Infographics'] },
      { session: 'Friday Polish & Schedule (2 hrs)', quantity: Math.ceil(recommendedPostsPerWeek * 0.2), types: ['Copy editing', 'Scheduling', 'QA'] },
      { session: 'Daily Community (1 hr)', quantity: Math.ceil(recommendedPostsPerWeek * 0.1), types: ['Engagement', 'Stories', 'Reactive content'] },
    );
  } else {
    batchPlans.push(
      { session: 'Monday Strategy & Production', quantity: Math.ceil(recommendedPostsPerWeek * 0.3), types: ['Campaign content', 'Hero videos', 'Premium assets'] },
      { session: 'Tuesday-Wednesday Execution', quantity: Math.ceil(recommendedPostsPerWeek * 0.35), types: ['Multi-platform adaptations', 'A/B variants', 'Carousels'] },
      { session: 'Thursday Review & Optimize', quantity: Math.ceil(recommendedPostsPerWeek * 0.2), types: ['Performance review', 'Content optimization', 'Repurposing'] },
      { session: 'Friday Scheduling & Community', quantity: Math.ceil(recommendedPostsPerWeek * 0.15), types: ['Bulk scheduling', 'Community management', 'Trending content'] },
    );
  }

  // Growth projections
  const velocityMultiplier = velocityScore >= 80 ? 1.3 : velocityScore >= 60 ? 1.1 : velocityScore >= 40 ? 0.9 : 0.7;
  const baseGrowth = platform === 'TikTok' ? 0.08 : platform === 'LinkedIn' ? 0.06 : platform === 'YouTube' ? 0.04 : 0.05;
  const adjustedGrowth = baseGrowth * velocityMultiplier * teamCap;

  const growthProjection = [
    {
      period: '30-Day Projection',
      metric: `+${Math.round(adjustedGrowth * 100)}% growth potential`,
      detail: `At ${recommendedPostsPerWeek} posts/week with optimized mix, expect measurable engagement lift within 2-3 weeks. First viral-format experiments should surface ${platform === 'TikTok' ? '1-3 breakout pieces' : '1 high-performing post'}.`,
    },
    {
      period: '90-Day Projection',
      metric: `+${Math.round(adjustedGrowth * 100 * 3.2)}% cumulative growth`,
      detail: `Consistent velocity builds compound momentum. By month 3, algorithm favorability increases as ${platform} recognizes ${b} as a reliable content source. Expect ${platform === 'TikTok' ? '5-15x' : '2-5x'} reach expansion vs. current.`,
    },
    {
      period: '6-Month Projection',
      metric: `+${Math.round(adjustedGrowth * 100 * 7.5)}% cumulative growth`,
      detail: `Content library becomes a compounding asset. SEO-driven discovery kicks in. ${b} should have established content pillars with predictable performance metrics and a growing content flywheel.`,
    },
    {
      period: 'Key Milestones',
      metric: 'Timeline markers',
      detail: `Week 2: Publishing rhythm established. Week 6: Algorithm recognition spike. Week 10: Community engagement loops active. Month 4: First organic viral moment likely. Month 6: Content system fully operational.`,
    },
  ];

  // Velocity Acceleration Plan
  const accelerationPlan = [
    {
      phase: 'Quick Wins (This Week)',
      items: [
        `Audit your last 20 posts and identify top 3 formats by engagement`,
        `Set up a content calendar with ${recommendedPostsPerWeek} slots per week`,
        `Batch-create ${Math.ceil(recommendedPostsPerWeek * 0.5)} posts in one session`,
        `Schedule posts using a tool (Buffer, Later, or native scheduling)`,
        `Identify 5 trending formats in your niche to adapt this week`,
      ],
    },
    {
      phase: 'Medium-Term (30 Days)',
      items: [
        `Build a content template library (5-10 reusable templates)`,
        `Create a swipe file of 50+ hooks, CTAs, and opening lines`,
        `Establish a consistent brand visual style (colors, fonts, layouts)`,
        `Set up a content repurposing workflow (1 piece to 5+ formats)`,
        `Start tracking velocity metrics: output, engagement rate, reach per post`,
      ],
    },
    {
      phase: 'Long-Term (90 Days)',
      items: [
        `Implement a full content production system with defined roles`,
        `Build an evergreen content library (20+ reusable posts)`,
        `Launch a content series (weekly show, recurring format)`,
        `Develop platform-specific content funnels`,
        `Create SOPs for every content type in your mix`,
      ],
    },
    {
      phase: 'Automation Opportunities',
      items: [
        budget === '$0' ? 'Free: Use Canva templates, native scheduling, and repurposing workflows' : `With your ${budget} budget: invest in scheduling tools and template systems`,
        teamSize === 'Solo creator' ? 'Solo tip: Batch 1 day/week, schedule everything, automate repurposing' : `With your ${teamSize} team: assign content roles (creator, editor, scheduler)`,
        'Automate: Social listening alerts, hashtag research, competitor tracking',
        'Semi-automate: Caption generation, image resizing, cross-posting',
        `Use AI tools for first drafts, then add ${b}'s unique voice and perspective`,
      ],
    },
  ];

  // Content Pipeline Visualization
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const scheduleMap: Record<string, string[]> = {};
  schedule.forEach(s => {
    if (!scheduleMap[s.day]) scheduleMap[s.day] = [];
    scheduleMap[s.day].push(`${s.time} - ${s.contentType}`);
  });
  const pipeline = days.map(day => ({
    weekday: day,
    slots: scheduleMap[day] || [],
    status: scheduleMap[day] ? (scheduleMap[day].length >= 2 ? 'High Output' : 'Active') : 'Rest Day',
  }));

  // Bottleneck identification
  const allBottlenecks = [
    { condition: selectedTypes.length <= 2, text: 'Low content diversity limits reach across different audience segments' },
    { condition: frequency === 'Irregular' || frequency === 'Monthly', text: 'Inconsistent posting frequency hurts algorithm favorability' },
    { condition: teamSize === 'Solo creator' && currentPostsPerWeek >= 5, text: 'Solo creator output near burnout threshold — consider batching or automation' },
    { condition: budget === '$0', text: 'Zero budget limits tool access for scheduling, design, and analytics' },
    { condition: !selectedTypes.includes('Reels/Shorts') && (platform === 'Instagram' || platform === 'TikTok'), text: `Not creating short-form video on ${platform} significantly limits organic reach` },
    { condition: !selectedTypes.includes('Carousels') && platform === 'LinkedIn', text: 'Missing document/carousel content on LinkedIn — highest organic reach format' },
    { condition: currentPostsPerWeek < optimalPosts * 0.5, text: `Publishing at ${Math.round((currentPostsPerWeek / optimalPosts) * 100)}% of optimal frequency for ${platform}` },
    { condition: !selectedTypes.includes('Stories') && platform === 'Instagram', text: 'No Stories content on Instagram — missing daily top-of-feed visibility' },
  ];
  const bottlenecks = allBottlenecks.filter(bn => bn.condition).map(bn => bn.text);
  if (bottlenecks.length === 0) bottlenecks.push('No major bottlenecks detected — maintain current trajectory and optimize incrementally');

  // Efficiency score
  const efficiencyScore = Math.min(100, Math.round(
    (diversityScore * 0.25) + (platformFitScore * 0.25) + ((consistencyIndex / 4) * 25) + (Math.min(currentPostsPerWeek / optimalPosts, 1) * 25)
  ));

  // Competitor Benchmark
  const industryAvgPosts: Record<string, string> = {
    'Instagram': '4-5/week', 'TikTok': '7-14/week', 'LinkedIn': '3-4/week',
    'Twitter/X': '7-21/week', 'YouTube': '1-2/week', 'Facebook': '3-5/week', 'Pinterest': '5-10/week',
  };
  const topPerformerPosts: Record<string, string> = {
    'Instagram': '7-10/week', 'TikTok': '14-21/week', 'LinkedIn': '5-7/week',
    'Twitter/X': '21-35/week', 'YouTube': '3-5/week', 'Facebook': '7-10/week', 'Pinterest': '15-25/week',
  };
  const competitorBenchmark = [
    {
      metric: 'Posts per week',
      industryAvg: industryAvgPosts[platform] || '3-5/week',
      topPerformer: topPerformerPosts[platform] || '7-10/week',
      yours: `${currentPostsPerWeek}/week`,
      gap: currentPostsPerWeek >= optimalPosts ? 'On track or above' : `+${Math.round(optimalPosts - currentPostsPerWeek)} posts needed to match average`,
    },
    {
      metric: 'Content formats used',
      industryAvg: '3-4 formats',
      topPerformer: '5-7 formats',
      yours: `${selectedTypes.length} formats`,
      gap: selectedTypes.length >= 5 ? 'Strong diversity' : `Add ${5 - selectedTypes.length} more format(s) for competitive parity`,
    },
    {
      metric: 'Publishing consistency',
      industryAvg: '80-85% on schedule',
      topPerformer: '95%+ on schedule',
      yours: consistencyRating,
      gap: consistencyIndex >= 3 ? 'Strong consistency' : 'Implement scheduling tools to improve consistency',
    },
    {
      metric: 'Avg. engagement rate',
      industryAvg: platform === 'TikTok' ? '4-8%' : platform === 'LinkedIn' ? '2-4%' : '1-3%',
      topPerformer: platform === 'TikTok' ? '10-15%' : platform === 'LinkedIn' ? '5-8%' : '3-6%',
      yours: 'Track in analytics',
      gap: 'Higher velocity + right mix = higher engagement over time',
    },
    {
      metric: 'Content repurposing',
      industryAvg: '1 to 2 platforms',
      topPerformer: '1 to 5+ platforms',
      yours: selectedTypes.length >= 4 ? 'Strong base for repurposing' : 'Limited repurposing potential',
      gap: 'Each piece should become 3-5 derivative assets',
    },
  ];

  return {
    velocityScore,
    currentAnalysis: {
      postsPerWeek: currentPostsPerWeek,
      diversityScore,
      consistencyRating,
      platformFitScore,
    },
    optimalRecommendation: {
      recommendedPostsPerWeek,
      contentMix,
      schedule,
      batchPlan: batchPlans,
    },
    growthProjection,
    accelerationPlan,
    pipeline,
    bottlenecks,
    efficiencyScore,
    competitorBenchmark,
  };
}

export default function ContentVelocityPage() {
  const [brand, setBrand] = useState('');
  const [platform, setPlatform] = useState<string>('Instagram');
  const [frequency, setFrequency] = useState<string>('2-3x/week');
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['Posts', 'Reels/Shorts']);
  const [teamSize, setTeamSize] = useState<string>('Solo creator');
  const [budget, setBudget] = useState<string>('Under $500');
  const [goal, setGoal] = useState<string>('Grow followers');
  const [result, setResult] = useState<VelocityResult | null>(null);

  const toggleType = (type: string) => {
    setSelectedTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  };

  const handleGenerate = () => {
    if (selectedTypes.length === 0) return;
    setResult(generateVelocityAnalysis(brand, platform, frequency, selectedTypes, teamSize, budget, goal));
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Needs Improvement';
    return 'Critical';
  };

  return (
    <main className="min-h-screen bg-zinc-950 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Content Velocity Tracker</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Analyze your content publishing speed, volume, and consistency. Get a data-driven plan to optimize your content output and accelerate growth.</p>

        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Brand / Account Name</label>
            <input type="text" value={brand} onChange={e => setBrand(e.target.value)} placeholder="e.g. PostCraft" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600" />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Primary Platform</label>
            <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {platforms.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Current Posting Frequency</label>
            <select value={frequency} onChange={e => setFrequency(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {frequencies.map(f => <option key={f}>{f}</option>)}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-zinc-400 mb-2">Content Types You Produce</label>
          <div className="flex flex-wrap gap-2">
            {contentTypes.map(type => (
              <button
                key={type}
                onClick={() => toggleType(type)}
                className={`px-3 py-1.5 rounded-lg text-sm border transition ${selectedTypes.includes(type) ? 'bg-violet-600/20 border-violet-500 text-violet-300' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700'}`}
              >
                {selectedTypes.includes(type) && <span className="mr-1">&#10003;</span>}{type}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Team Size</label>
            <select value={teamSize} onChange={e => setTeamSize(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {teamSizes.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Monthly Content Budget</label>
            <select value={budget} onChange={e => setBudget(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {budgets.map(b => <option key={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Primary Goal</label>
            <select value={goal} onChange={e => setGoal(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {goals.map(g => <option key={g}>{g}</option>)}
            </select>
          </div>
        </div>

        <button onClick={handleGenerate} className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition">
          Analyze Content Velocity
        </button>

        {result && (
          <div className="mt-10 space-y-6">
            {/* Velocity Score Hero */}
            <div className="bg-zinc-900 border border-violet-500/30 rounded-xl p-6 text-center">
              <p className="text-sm text-zinc-400 mb-1">Content Velocity Score</p>
              <p className={`text-6xl font-black ${getScoreColor(result.velocityScore)}`}>{result.velocityScore}</p>
              <p className={`text-lg font-semibold mt-1 ${getScoreColor(result.velocityScore)}`}>{getScoreLabel(result.velocityScore)}</p>
              <div className="w-full bg-zinc-800 rounded-full h-3 mt-4 max-w-md mx-auto">
                <div className={`h-3 rounded-full transition-all ${result.velocityScore >= 80 ? 'bg-green-500' : result.velocityScore >= 60 ? 'bg-yellow-500' : result.velocityScore >= 40 ? 'bg-orange-500' : 'bg-red-500'}`} style={{ width: `${result.velocityScore}%` }} />
              </div>
            </div>

            {/* Current Analysis */}
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
                <p className="text-xs text-zinc-500">Posts/Week</p>
                <p className="text-2xl font-bold text-white">{result.currentAnalysis.postsPerWeek}</p>
                <p className="text-xs text-zinc-500 mt-1">current output</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
                <p className="text-xs text-zinc-500">Diversity Score</p>
                <p className={`text-2xl font-bold ${getScoreColor(result.currentAnalysis.diversityScore)}`}>{result.currentAnalysis.diversityScore}/100</p>
                <p className="text-xs text-zinc-500 mt-1">content variety</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
                <p className="text-xs text-zinc-500">Consistency</p>
                <p className="text-xl font-bold text-white">{result.currentAnalysis.consistencyRating}</p>
                <p className="text-xs text-zinc-500 mt-1">publishing rhythm</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
                <p className="text-xs text-zinc-500">Platform Fit</p>
                <p className={`text-2xl font-bold ${getScoreColor(result.currentAnalysis.platformFitScore)}`}>{result.currentAnalysis.platformFitScore}/100</p>
                <p className="text-xs text-zinc-500 mt-1">format alignment</p>
              </div>
            </div>

            {/* Optimal Content Mix */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-1">Ideal Content Mix</h3>
                <p className="text-xs text-zinc-500 mb-4">Optimized for: {goal}</p>
                {result.optimalRecommendation.contentMix.map((c, i) => (
                  <div key={i} className="mb-3">
                    <div className="flex justify-between text-sm mb-1"><span className="text-white">{c.type}</span><span className="text-violet-400">{c.percentage}%</span></div>
                    <div className="w-full bg-zinc-800 rounded-full h-2"><div className="bg-gradient-to-r from-violet-600 to-fuchsia-500 h-2 rounded-full" style={{ width: `${c.percentage}%` }} /></div>
                  </div>
                ))}
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-1">Recommended Output</h3>
                <p className="text-xs text-zinc-500 mb-4">Based on your team and budget capacity</p>
                <div className="bg-zinc-800 rounded-lg p-4 mb-3 text-center">
                  <p className="text-3xl font-black text-violet-400">{result.optimalRecommendation.recommendedPostsPerWeek}</p>
                  <p className="text-sm text-zinc-400">posts per week recommended</p>
                </div>
                <div className="space-y-2">
                  {result.optimalRecommendation.batchPlan.map((bp, i) => (
                    <div key={i} className="bg-zinc-800 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-white font-medium">{bp.session}</span>
                        <span className="text-xs text-violet-400">{bp.quantity} pieces</span>
                      </div>
                      <p className="text-xs text-zinc-500">{bp.types.join(', ')}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Publishing Schedule */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Optimal Publishing Schedule</h3>
              <div className="grid grid-cols-7 gap-2">
                {result.pipeline.map((day, i) => (
                  <div key={i} className={`rounded-lg p-3 text-center ${day.slots.length > 0 ? 'bg-violet-600/10 border border-violet-500/20' : 'bg-zinc-800/50 border border-zinc-800'}`}>
                    <p className="text-xs font-semibold text-zinc-400 mb-1">{day.weekday.slice(0, 3)}</p>
                    {day.slots.length > 0 ? day.slots.map((slot, j) => (
                      <p key={j} className="text-xs text-violet-300 mb-0.5">{slot}</p>
                    )) : (
                      <p className="text-xs text-zinc-600 italic">Rest</p>
                    )}
                    <p className={`text-xs mt-1 ${day.status === 'High Output' ? 'text-green-400' : day.status === 'Active' ? 'text-blue-400' : 'text-zinc-600'}`}>{day.status}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Growth Projections */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Growth Projections</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {result.growthProjection.map((gp, i) => (
                  <div key={i} className="bg-zinc-800 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-white">{gp.period}</span>
                      <span className="text-xs text-green-400 font-medium">{gp.metric}</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">{gp.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Velocity Acceleration Plan */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Velocity Acceleration Plan</h3>
              {result.accelerationPlan.map((phase, i) => (
                <div key={i} className="mb-4 last:mb-0">
                  <span className="text-sm font-medium text-violet-400">{phase.phase}</span>
                  <ul className="mt-2 space-y-1">{phase.items.map((item, j) => <li key={j} className="text-sm text-zinc-300 flex gap-2"><span className="text-green-400 shrink-0">&#8594;</span>{item}</li>)}</ul>
                </div>
              ))}
            </div>

            {/* Bottlenecks + Efficiency */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Bottleneck Analysis</h3>
                <ul className="space-y-2">
                  {result.bottlenecks.map((bn, i) => (
                    <li key={i} className="text-sm text-zinc-300 flex gap-2 bg-zinc-800 rounded-lg p-3">
                      <span className="text-orange-400 shrink-0">&#9888;</span>{bn}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Pipeline Efficiency</h3>
                <div className="text-center mb-4">
                  <p className={`text-5xl font-black ${getScoreColor(result.efficiencyScore)}`}>{result.efficiencyScore}</p>
                  <p className="text-sm text-zinc-400 mt-1">Efficiency Score</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-zinc-400">Content Diversity</span><span className="text-white">{result.currentAnalysis.diversityScore}%</span></div>
                  <div className="flex justify-between"><span className="text-zinc-400">Platform Alignment</span><span className="text-white">{result.currentAnalysis.platformFitScore}%</span></div>
                  <div className="flex justify-between"><span className="text-zinc-400">Publishing Rhythm</span><span className="text-white">{result.currentAnalysis.consistencyRating}</span></div>
                  <div className="flex justify-between"><span className="text-zinc-400">Volume vs. Optimal</span><span className="text-white">{Math.round((result.currentAnalysis.postsPerWeek / result.optimalRecommendation.recommendedPostsPerWeek) * 100)}%</span></div>
                </div>
              </div>
            </div>

            {/* Competitor Benchmark */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Competitor Velocity Benchmark</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-zinc-500 border-b border-zinc-800">
                      <th className="text-left py-2 pr-4">Metric</th>
                      <th className="text-left py-2 pr-4">Industry Avg</th>
                      <th className="text-left py-2 pr-4">Top Performers</th>
                      <th className="text-left py-2 pr-4">You</th>
                      <th className="text-left py-2">Gap Analysis</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.competitorBenchmark.map((cb, i) => (
                      <tr key={i} className="border-b border-zinc-800/50">
                        <td className="py-2.5 pr-4 text-white font-medium">{cb.metric}</td>
                        <td className="py-2.5 pr-4 text-zinc-400">{cb.industryAvg}</td>
                        <td className="py-2.5 pr-4 text-green-400">{cb.topPerformer}</td>
                        <td className="py-2.5 pr-4 text-violet-400">{cb.yours}</td>
                        <td className="py-2.5 text-zinc-400">{cb.gap}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Cross-links */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-zinc-400 mb-3">Optimize Further</h3>
              <div className="flex flex-wrap gap-2 text-sm">
                <a href="/content-calendar" className="text-violet-400 hover:text-violet-300 underline">Content Calendar</a>
                <a href="/post-timing" className="text-violet-400 hover:text-violet-300 underline">Post Timing</a>
                <a href="/growth-calculator" className="text-violet-400 hover:text-violet-300 underline">Growth Calculator</a>
                <a href="/content-pillars" className="text-violet-400 hover:text-violet-300 underline">Content Pillars</a>
                <a href="/brand-voice" className="text-violet-400 hover:text-violet-300 underline">Brand Voice</a>
                <a href="/roi-calculator" className="text-violet-400 hover:text-violet-300 underline">ROI Calculator</a>
                <a href="/engagement-calculator" className="text-violet-400 hover:text-violet-300 underline">Engagement Calculator</a>
                <a href="/competitor-tracker" className="text-violet-400 hover:text-violet-300 underline">Competitor Tracker</a>
              </div>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">Content Velocity FAQ</h2>
          <div className="space-y-4">
            {[
              { q: 'What is content velocity and why does it matter?', a: 'Content velocity measures how fast and consistently you publish content across platforms. It matters because algorithms reward consistent publishers with better reach. Higher velocity (when paired with quality) creates a compounding effect: more content means more data, more engagement signals, and faster audience growth.' },
              { q: 'How many posts per week should I publish?', a: 'It depends on your platform and resources. TikTok rewards 1-3 posts per day, Instagram 5-7 per week, LinkedIn 3-5 per week, and YouTube 1-2 per week. The key is finding a sustainable pace that maintains quality. Consistency beats volume every time — 3 great posts weekly outperform 10 mediocre ones.' },
              { q: 'How do I increase content velocity without sacrificing quality?', a: 'Three strategies: (1) Batch production — create a week of content in one focused session. (2) Repurpose — turn one piece into 5+ formats (a blog becomes a carousel, thread, reel script, newsletter, and quote graphics). (3) Use templates — build reusable frameworks for your recurring content types.' },
              { q: 'What is the difference between content velocity and posting frequency?', a: 'Posting frequency is just how often you publish. Content velocity is a holistic measure that includes frequency, consistency, diversity of formats, platform fit, and production efficiency. You can post daily but have low velocity if your content is all the same format, lacks strategic variety, or has gaps in your schedule.' },
              { q: 'How long before I see results from optimizing content velocity?', a: 'Most creators see measurable improvements within 2-4 weeks of consistent, optimized publishing. Algorithm recognition typically kicks in around week 6. By month 3, compound growth effects become visible. The full content flywheel — where your library of content drives sustained organic growth — usually takes 4-6 months to establish.' },
            ].map((faq, i) => (
              <details key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
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
              <ul className="space-y-1">
                <li><a href="/" className="hover:text-white transition">Post Generator</a></li>
                <li><a href="/hooks" className="hover:text-white transition">Hook Generator</a></li>
                <li><a href="/video-scripts" className="hover:text-white transition">Video Scripts</a></li>
                <li><a href="/threads" className="hover:text-white transition">Thread Generator</a></li>
                <li><a href="/carousel-generator" className="hover:text-white transition">Carousel Generator</a></li>
                <li><a href="/ad-copy" className="hover:text-white transition">Ad Copy</a></li>
                <li><a href="/story-arc" className="hover:text-white transition">Story Arc</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Optimization</h4>
              <ul className="space-y-1">
                <li><a href="/caption-optimizer" className="hover:text-white transition">Caption Optimizer</a></li>
                <li><a href="/hashtags" className="hover:text-white transition">Hashtags</a></li>
                <li><a href="/post-timing" className="hover:text-white transition">Post Timing</a></li>
                <li><a href="/social-seo" className="hover:text-white transition">Social SEO</a></li>
                <li><a href="/virality-score" className="hover:text-white transition">Virality Score</a></li>
                <li><a href="/content-velocity" className="hover:text-white transition">Content Velocity</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Analytics</h4>
              <ul className="space-y-1">
                <li><a href="/engagement-calculator" className="hover:text-white transition">Engagement</a></li>
                <li><a href="/sentiment-analyzer" className="hover:text-white transition">Sentiment</a></li>
                <li><a href="/roi-calculator" className="hover:text-white transition">ROI</a></li>
                <li><a href="/competitor-analysis" className="hover:text-white transition">Competitors</a></li>
                <li><a href="/growth-calculator" className="hover:text-white transition">Growth Calculator</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Strategy</h4>
              <ul className="space-y-1">
                <li><a href="/brand-voice" className="hover:text-white transition">Brand Voice</a></li>
                <li><a href="/content-calendar" className="hover:text-white transition">Calendar</a></li>
                <li><a href="/campaign" className="hover:text-white transition">Campaign</a></li>
                <li><a href="/persona-builder" className="hover:text-white transition">Persona Builder</a></li>
                <li><a href="/content-pillars" className="hover:text-white transition">Content Pillars</a></li>
              </ul>
            </div>
          </div>
          <p className="text-center text-zinc-600 text-xs mt-8">&copy; 2026 PostCraft AI. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
