import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { platform, accountType, followers, postsPerWeek, avgLikes, avgComments, avgShares, bio, hasLinktree, usesHashtags, usesReels, postsStories } = body;

  const engagementRate = followers > 0 ? ((avgLikes + avgComments + avgShares) / followers) * 100 : 0;

  // Scoring categories
  const profileScore = calculateProfileScore(bio, hasLinktree, platform);
  const engagementScore = calculateEngagementScore(engagementRate, platform);
  const consistencyScore = calculateConsistencyScore(postsPerWeek, platform);
  const contentMixScore = calculateContentMixScore(usesReels, postsStories, usesHashtags, platform);
  const growthScore = calculateGrowthScore(followers, engagementRate, accountType);
  const strategyScore = calculateStrategyScore(postsPerWeek, usesHashtags, usesReels, postsStories, hasLinktree);

  const categories = [
    { name: 'Profile Optimization', score: profileScore, tips: getProfileTips(bio, hasLinktree, platform) },
    { name: 'Engagement Quality', score: engagementScore, tips: getEngagementTips(engagementRate, avgComments, avgLikes, platform) },
    { name: 'Posting Consistency', score: consistencyScore, tips: getConsistencyTips(postsPerWeek, platform) },
    { name: 'Content Mix', score: contentMixScore, tips: getContentMixTips(usesReels, postsStories, usesHashtags, platform) },
    { name: 'Growth Potential', score: growthScore, tips: getGrowthTips(followers, engagementRate, accountType) },
    { name: 'Strategy & Optimization', score: strategyScore, tips: getStrategyTips(postsPerWeek, usesHashtags, usesReels, postsStories) },
  ];

  const overallScore = Math.round(categories.reduce((sum, c) => sum + c.score, 0) / categories.length);

  const strengths = categories.filter(c => c.score >= 70).map(c => `${c.name} — ${c.score}/100`);
  if (strengths.length === 0) strengths.push('Room for improvement across all areas — focus on the top priorities below');

  const topPriorities = categories
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)
    .map(c => `Improve ${c.name} (currently ${c.score}/100): ${c.tips[0]}`);

  const competitorInsights = getCompetitorInsights(platform, accountType, followers, engagementRate);

  return NextResponse.json({ overallScore, categories, topPriorities, strengths, competitorInsights });
}

function calculateProfileScore(bio: string, hasLinktree: boolean, platform: string): number {
  let score = 40;
  if (bio && bio.length > 20) score += 25;
  if (bio && bio.length > 80) score += 10;
  if (hasLinktree) score += 15;
  if (bio && (bio.includes('|') || bio.includes('•') || bio.includes('→'))) score += 10;
  return Math.min(score, 100);
}

function calculateEngagementScore(rate: number, platform: string): number {
  const benchmarks: Record<string, { avg: number; good: number; exc: number }> = {
    'Twitter/X': { avg: 0.5, good: 1.5, exc: 3 },
    LinkedIn: { avg: 2, good: 4, exc: 6 },
    Instagram: { avg: 1.5, good: 3.5, exc: 6 },
    TikTok: { avg: 3, good: 6, exc: 10 },
    Facebook: { avg: 0.5, good: 1, exc: 3 },
  };
  const b = benchmarks[platform] || benchmarks['Instagram'];
  if (rate >= b.exc) return 95;
  if (rate >= b.good) return 75;
  if (rate >= b.avg) return 55;
  if (rate >= b.avg * 0.5) return 35;
  return 20;
}

function calculateConsistencyScore(postsPerWeek: number, platform: string): number {
  const ideal: Record<string, number> = { 'Twitter/X': 7, LinkedIn: 4, Instagram: 5, TikTok: 5, Facebook: 3 };
  const target = ideal[platform] || 5;
  const ratio = postsPerWeek / target;
  if (ratio >= 0.8 && ratio <= 1.3) return 90;
  if (ratio >= 0.5 && ratio <= 1.8) return 65;
  if (ratio >= 0.3) return 40;
  return 20;
}

function calculateContentMixScore(usesReels: boolean, postsStories: boolean, usesHashtags: boolean, platform: string): number {
  let score = 30;
  if (usesReels) score += 25;
  if (postsStories) score += 20;
  if (usesHashtags) score += 25;
  return Math.min(score, 100);
}

function calculateGrowthScore(followers: number, engagementRate: number, accountType: string): number {
  let score = 50;
  if (engagementRate > 3) score += 20;
  if (engagementRate > 5) score += 10;
  if (followers > 1000) score += 10;
  if (followers > 10000) score += 10;
  return Math.min(score, 100);
}

function calculateStrategyScore(postsPerWeek: number, usesHashtags: boolean, usesReels: boolean, postsStories: boolean, hasLinktree: boolean): number {
  let score = 20;
  if (postsPerWeek >= 3) score += 15;
  if (usesHashtags) score += 20;
  if (usesReels) score += 20;
  if (postsStories) score += 15;
  if (hasLinktree) score += 10;
  return Math.min(score, 100);
}

function getProfileTips(bio: string, hasLinktree: boolean, platform: string): string[] {
  const tips: string[] = [];
  if (!bio || bio.length < 20) tips.push('Write a compelling bio with your value proposition, niche, and a call-to-action');
  if (!hasLinktree) tips.push('Add a link-in-bio tool (Linktree, Stan Store, or Beacons) to capture traffic');
  if (bio && !bio.includes('|') && !bio.includes('•')) tips.push('Use separators (|, •, →) in your bio to improve readability');
  if (tips.length === 0) tips.push('Your profile looks well-optimized — consider A/B testing your bio monthly');
  return tips;
}

function getEngagementTips(rate: number, comments: number, likes: number, platform: string): string[] {
  const tips: string[] = [];
  if (rate < 1) tips.push('Focus on creating more engaging content — ask questions, share personal stories, use strong hooks');
  if (comments < likes * 0.05) tips.push('Your comment-to-like ratio is low — end posts with questions to spark conversation');
  if (rate < 2) tips.push('Reply to every comment within 1 hour to boost algorithm signals and build community');
  if (tips.length === 0) tips.push('Strong engagement — focus on maintaining consistency and testing new content formats');
  return tips;
}

function getConsistencyTips(postsPerWeek: number, platform: string): string[] {
  const tips: string[] = [];
  if (postsPerWeek < 3) tips.push('Increase posting frequency to at least 3-5x per week for algorithm favor');
  if (postsPerWeek > 10) tips.push('Consider reducing frequency — quality trumps quantity. Focus on 5-7 high-quality posts per week');
  if (tips.length === 0) tips.push('Good posting cadence — batch-create content weekly to maintain consistency');
  return tips;
}

function getContentMixTips(usesReels: boolean, postsStories: boolean, usesHashtags: boolean, platform: string): string[] {
  const tips: string[] = [];
  if (!usesReels) tips.push('Start posting short-form video (Reels/Shorts) — they get 2-3x more reach than static posts in 2026');
  if (!postsStories) tips.push('Use Stories/Fleets daily to stay top-of-mind and boost profile visibility');
  if (!usesHashtags) tips.push('Use 5-15 targeted hashtags per post — mix niche (500K-2M) and broad (2M+) tags');
  if (tips.length === 0) tips.push('Great content mix — experiment with live video and collaborative posts for even more reach');
  return tips;
}

function getGrowthTips(followers: number, engagementRate: number, accountType: string): string[] {
  const tips: string[] = [];
  if (followers < 1000) tips.push('Focus on niche content to build a loyal core audience before scaling');
  if (engagementRate > 3 && followers < 10000) tips.push('High engagement + small audience = prime growth phase. Collaborate with similar-sized accounts');
  if (followers > 10000 && engagementRate < 2) tips.push('Large audience but low engagement — audit followers for bots and refocus on your core niche');
  if (tips.length === 0) tips.push('Solid growth trajectory — consider launching a newsletter or community to own your audience');
  return tips;
}

function getStrategyTips(postsPerWeek: number, usesHashtags: boolean, usesReels: boolean, postsStories: boolean): string[] {
  const tips: string[] = [];
  if (postsPerWeek < 3 && !usesReels) tips.push('Start with 3 posts/week including at least 1 Reel — this alone can double your reach');
  if (!usesHashtags && !usesReels) tips.push('You\'re missing two major growth levers — start using hashtags and short-form video');
  if (tips.length === 0) tips.push('Good strategy fundamentals — focus on analyzing your best-performing content and creating more of it');
  return tips;
}

function getCompetitorInsights(platform: string, accountType: string, followers: number, engagementRate: number): string[] {
  const insights: string[] = [];
  const sizeLabel = followers < 1000 ? 'nano' : followers < 10000 ? 'micro' : followers < 100000 ? 'mid-tier' : 'macro';

  insights.push(`${sizeLabel} ${accountType} accounts on ${platform} average 2-4% engagement rate`);
  insights.push(`Top 10% of ${platform} ${accountType} accounts post 5-7x per week with 60% video content`);
  insights.push(`Average sponsorship rate for ${sizeLabel} accounts: $${followers < 10000 ? '50-250' : followers < 100000 ? '250-2,500' : '2,500-25,000'} per post`);

  if (engagementRate > 3) {
    insights.push(`Your engagement rate puts you in the top 25% of ${sizeLabel} ${accountType} accounts`);
  } else {
    insights.push(`Most ${sizeLabel} accounts that break through focus on one content pillar and post consistently for 90+ days`);
  }

  return insights;
}
