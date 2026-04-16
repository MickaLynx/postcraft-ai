'use client';
import { useState } from 'react';

const platforms = ['Instagram', 'TikTok', 'Twitter/X', 'LinkedIn', 'YouTube', 'Facebook', 'Pinterest', 'Threads'] as const;
const industries = ['SaaS/Tech', 'E-commerce', 'Health & Fitness', 'Finance', 'Education', 'Food & Beverage', 'Travel', 'Fashion', 'Real Estate', 'Agency/Consulting'] as const;
const analysisDepth = ['Quick Scan', 'Standard Analysis', 'Deep Dive'] as const;
const timeRanges = ['Last 7 days', 'Last 30 days', 'Last 90 days', 'Last 6 months'] as const;

interface TopPost {
  platform: string;
  type: string;
  hook: string;
  estimatedReach: number;
  engagementRate: number;
  viralFactors: string[];
  replicableElements: string[];
  postingTime: string;
}

interface ContentPattern {
  pattern: string;
  frequency: string;
  avgEngagement: number;
  trend: string;
  examples: string[];
  adaptationTip: string;
}

interface WeaknessGap {
  area: string;
  description: string;
  opportunity: string;
  difficulty: string;
  potentialImpact: string;
  actionSteps: string[];
}

interface PostingSchedule {
  day: string;
  bestTime: string;
  platform: string;
  contentType: string;
  competitorActivity: string;
  yourOpportunity: string;
}

interface HashtagIntel {
  hashtag: string;
  competitorUsage: number;
  avgReach: number;
  saturation: string;
  recommendation: string;
  alternatives: string[];
}

interface SpyResult {
  topPosts: TopPost[];
  contentPatterns: ContentPattern[];
  weaknessGaps: WeaknessGap[];
  postingSchedule: PostingSchedule[];
  hashtagIntel: HashtagIntel[];
}

function generateSpyReport(
  competitorHandle: string,
  selectedPlatforms: string[],
  industry: string,
  depth: string,
  timeRange: string
): SpyResult {
  const handle = competitorHandle || '@competitor';

  const topPosts: TopPost[] = [
    { platform: 'Instagram', type: 'Carousel', hook: `"3 mistakes ${handle} says most beginners make"`, estimatedReach: 45200, engagementRate: 6.8, viralFactors: ['Numbered list', 'Pain point hook', 'Save-worthy slides'], replicableElements: ['Carousel format', 'Bold text overlay', 'Swipe CTA on slide 1', 'Actionable takeaway per slide'], postingTime: 'Tuesday 9:30 AM' },
    { platform: 'TikTok', type: 'Video (30s)', hook: `"POV: you finally understand ${industry}"`, estimatedReach: 128000, engagementRate: 12.4, viralFactors: ['POV format', 'Relatable humor', 'Quick transitions'], replicableElements: ['POV hook structure', 'Before/after reveal', 'Trending sound', 'Text overlay timing'], postingTime: 'Thursday 7:00 PM' },
    { platform: 'LinkedIn', type: 'Text post', hook: `"I lost $50K before learning this about ${industry}"`, estimatedReach: 22800, engagementRate: 4.2, viralFactors: ['Vulnerability', 'Financial stakes', 'Story arc'], replicableElements: ['Personal failure story', 'Numbered lessons', 'Line breaks every 2 lines', 'Question at end'], postingTime: 'Monday 8:00 AM' },
    { platform: 'Twitter/X', type: 'Thread (8 tweets)', hook: `"Everything I know about ${industry} in one thread:"`, estimatedReach: 67500, engagementRate: 3.9, viralFactors: ['Comprehensive thread', 'Promise of value', 'Bookmarkable'], replicableElements: ['Thread structure', 'One insight per tweet', 'Visual in tweet 4', 'Retweet CTA in last tweet'], postingTime: 'Wednesday 12:00 PM' },
    { platform: 'YouTube', type: 'Short (45s)', hook: `"The ${industry} hack nobody is talking about"`, estimatedReach: 89000, engagementRate: 8.1, viralFactors: ['Curiosity gap', 'Quick value delivery', 'Repeat loop'], replicableElements: ['3-second hook', 'B-roll cuts', 'On-screen text', 'Subscribe end screen'], postingTime: 'Friday 5:00 PM' },
    { platform: 'Instagram', type: 'Reel', hook: `"Day in my life as a ${industry} professional"`, estimatedReach: 56300, engagementRate: 7.5, viralFactors: ['Day-in-life format', 'Aspirational', 'Music sync'], replicableElements: ['Morning routine opening', 'Behind-the-scenes clips', 'Result reveal at end', 'Caption storytelling'], postingTime: 'Saturday 10:00 AM' },
    { platform: 'LinkedIn', type: 'Document/PDF', hook: `"The ${industry} playbook I wish I had 5 years ago"`, estimatedReach: 31400, engagementRate: 5.6, viralFactors: ['PDF carousel', 'Playbook format', 'Expert positioning'], replicableElements: ['Professional design', 'One concept per page', '10-15 slides optimal', 'Download CTA'], postingTime: 'Tuesday 11:00 AM' },
    { platform: 'TikTok', type: 'Stitch', hook: `"Replying to someone who said ${industry} is dead"`, estimatedReach: 203000, engagementRate: 15.2, viralFactors: ['Stitch/reply format', 'Controversial take', 'Fast-paced rebuttal'], replicableElements: ['React to popular take', 'Data-backed response', 'Confident delivery', 'Call for debate in comments'], postingTime: 'Sunday 6:00 PM' },
  ];

  const contentPatterns: ContentPattern[] = [
    { pattern: 'Educational Carousels', frequency: '3x/week', avgEngagement: 5.8, trend: 'Stable', examples: ['Step-by-step guides', 'Myth vs reality', 'Tool comparisons'], adaptationTip: 'Add your unique data/case studies to differentiate from generic advice' },
    { pattern: 'Personal Story Posts', frequency: '2x/week', avgEngagement: 7.2, trend: 'Growing', examples: ['Failure stories', 'Client wins', 'Behind-the-scenes'], adaptationTip: 'Their stories lack specificity — yours should include exact numbers and timelines' },
    { pattern: 'Trend Commentary', frequency: '1x/week', avgEngagement: 4.1, trend: 'Declining', examples: ['Hot takes on news', 'Industry predictions', 'Tool reviews'], adaptationTip: 'They post 24-48h late — beat them by reacting within 2 hours of a trend' },
    { pattern: 'User-Generated Content', frequency: '1x/week', avgEngagement: 8.9, trend: 'Growing fast', examples: ['Customer testimonials', 'Community reposts', 'Challenge entries'], adaptationTip: 'Create a branded hashtag challenge to generate your own UGC pipeline' },
    { pattern: 'Short-Form Video', frequency: '5x/week', avgEngagement: 11.3, trend: 'Dominant', examples: ['Quick tips', 'POV sketches', 'Before/after'], adaptationTip: 'Their editing is basic — invest in better transitions and sound design to stand out' },
    { pattern: 'Polls & Questions', frequency: '2x/week', avgEngagement: 6.4, trend: 'Stable', examples: ['This or that', 'Would you rather', 'Unpopular opinion'], adaptationTip: 'Follow up polls with data posts showing results — they never do this' },
  ];

  const weaknessGaps: WeaknessGap[] = [
    { area: 'Email List Building', description: `${handle} has no lead magnet or email capture on social`, opportunity: 'Create a free resource that converts their followers to your email list', difficulty: 'Low', potentialImpact: 'High', actionSteps: ['Create industry-specific template/checklist', 'Promote via carousel with "DM me FREE" CTA', 'Set up auto-DM sequence', 'Nurture via weekly newsletter'] },
    { area: 'Community Engagement', description: `${handle} rarely replies to comments (avg response: 0 of top 20 comments)`, opportunity: 'Be the brand that actually engages — reply to every comment within 1 hour', difficulty: 'Medium', potentialImpact: 'High', actionSteps: ['Set up comment monitoring', 'Create response templates', 'Prioritize first 30 minutes after posting', 'Turn top comments into content ideas'] },
    { area: 'Cross-Platform Presence', description: `${handle} dominates Instagram but ignores LinkedIn and Pinterest`, opportunity: 'Own the professional angle on LinkedIn and evergreen content on Pinterest', difficulty: 'Low', potentialImpact: 'Medium', actionSteps: ['Repurpose their Instagram content for LinkedIn format', 'Create Pinterest pins from their carousel content', 'Target keywords they rank for on different platforms'] },
    { area: 'Video SEO', description: `${handle}'s YouTube descriptions are empty, no chapters, no keywords`, opportunity: 'Rank above them on YouTube search by optimizing every video properly', difficulty: 'Low', potentialImpact: 'High', actionSteps: ['Use their video topics with proper SEO', 'Add chapters, timestamps, and keywords', 'Create playlists around their top themes', 'Engage in their comments to redirect traffic'] },
    { area: 'Consistent Branding', description: `${handle} uses inconsistent visuals — different fonts, colors, no template system`, opportunity: 'Build instant recognizability with a cohesive visual identity', difficulty: 'Medium', potentialImpact: 'Medium', actionSteps: ['Design 5-7 branded templates', 'Use consistent color palette across platforms', 'Create signature intro/outro for videos', 'Develop a visual style guide'] },
    { area: 'Data-Driven Content', description: `${handle} shares opinions but never original data or research`, opportunity: 'Become the go-to source for industry data and benchmarks', difficulty: 'High', potentialImpact: 'Very High', actionSteps: ['Run surveys in your audience', 'Create monthly industry reports', 'Visualize data as infographics', 'Get cited by other creators and media'] },
  ];

  const postingSchedule: PostingSchedule[] = [
    { day: 'Monday', bestTime: '8:00 AM', platform: 'LinkedIn', contentType: 'Motivational/Strategy', competitorActivity: 'High (3 posts avg)', yourOpportunity: 'Post at 7:30 AM to beat them in feed' },
    { day: 'Tuesday', bestTime: '9:30 AM', platform: 'Instagram', contentType: 'Educational Carousel', competitorActivity: 'Medium (2 posts)', yourOpportunity: 'Add Reel at 12 PM — their gap window' },
    { day: 'Wednesday', bestTime: '12:00 PM', platform: 'Twitter/X', contentType: 'Thread / Hot Take', competitorActivity: 'Low (1 post)', yourOpportunity: 'Dominate mid-week with 2-3 tweets + thread' },
    { day: 'Thursday', bestTime: '7:00 PM', platform: 'TikTok', contentType: 'Video / Trend', competitorActivity: 'High (4 posts)', yourOpportunity: 'Post at 6 PM to get ahead in algorithm' },
    { day: 'Friday', bestTime: '5:00 PM', platform: 'YouTube', contentType: 'Short / Long-form', competitorActivity: 'Medium (1-2 posts)', yourOpportunity: 'Weekend preview content performs well' },
    { day: 'Saturday', bestTime: '10:00 AM', platform: 'Instagram', contentType: 'Lifestyle / BTS', competitorActivity: 'Low (1 post)', yourOpportunity: 'They underpost weekends — fill the gap' },
    { day: 'Sunday', bestTime: '6:00 PM', platform: 'TikTok', contentType: 'Recap / Planning', competitorActivity: 'Very Low (0-1 posts)', yourOpportunity: 'Sunday evening gets high engagement, zero competition' },
  ];

  const hashtagIntel: HashtagIntel[] = [
    { hashtag: `#${industry.replace(/[^a-zA-Z]/g, '')}`, competitorUsage: 92, avgReach: 34000, saturation: 'High', recommendation: 'Use but pair with niche tags', alternatives: [`#${industry.replace(/[^a-zA-Z]/g, '')}Tips`, `#${industry.replace(/[^a-zA-Z]/g, '')}Strategy`] },
    { hashtag: '#ContentCreator', competitorUsage: 78, avgReach: 120000, saturation: 'Very High', recommendation: 'Avoid — too broad, low conversion', alternatives: ['#ContentStrategy2026', '#CreatorEconomy', '#ContentMarketing'] },
    { hashtag: '#GrowthHacking', competitorUsage: 45, avgReach: 28000, saturation: 'Medium', recommendation: 'Good for LinkedIn and Twitter', alternatives: ['#GrowthStrategy', '#StartupGrowth', '#ScaleUp'] },
    { hashtag: '#SocialMediaTips', competitorUsage: 88, avgReach: 95000, saturation: 'High', recommendation: 'Use on educational posts only', alternatives: ['#SocialMediaStrategy', '#SMM2026', '#DigitalMarketing'] },
    { hashtag: '#MarketingAutomation', competitorUsage: 12, avgReach: 15000, saturation: 'Low', recommendation: 'Underused by competitor — claim this space', alternatives: ['#AutomatedMarketing', '#MarTech', '#MarketingTools'] },
    { hashtag: '#PersonalBrand', competitorUsage: 56, avgReach: 42000, saturation: 'Medium', recommendation: 'Good fit for story posts', alternatives: ['#BuildYourBrand', '#BrandStrategy', '#PersonalBranding'] },
    { hashtag: '#AIMarketing', competitorUsage: 8, avgReach: 67000, saturation: 'Low', recommendation: 'Huge opportunity — competitor ignores AI angle', alternatives: ['#AIContent', '#AITools', '#MarketingAI'] },
    { hashtag: '#CreatorTools', competitorUsage: 22, avgReach: 18000, saturation: 'Low', recommendation: 'Perfect for tool review and comparison posts', alternatives: ['#ToolStack', '#CreatorStack', '#BestTools'] },
  ];

  return { topPosts, contentPatterns, weaknessGaps, postingSchedule, hashtagIntel };
}

export default function CompetitorSpyPage() {
  const [competitorHandle, setCompetitorHandle] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['Instagram', 'TikTok']);
  const [industry, setIndustry] = useState<string>(industries[0]);
  const [depth, setDepth] = useState<string>(analysisDepth[1]);
  const [timeRange, setTimeRange] = useState<string>(timeRanges[1]);
  const [result, setResult] = useState<SpyResult | null>(null);
  const [activeTab, setActiveTab] = useState<'topPosts' | 'patterns' | 'gaps' | 'schedule' | 'hashtags'>('topPosts');

  const handleAnalyze = () => {
    setResult(generateSpyReport(competitorHandle, selectedPlatforms, industry, depth, timeRange));
  };

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    );
  };

  const formatNumber = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}K` : n.toString();

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <nav className="text-sm text-gray-400 mb-8">
          <a href="/" className="hover:text-white">Home</a> → <span className="text-white">Competitor Spy</span>
        </nav>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
          Competitor Content Spy
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl">
          Analyze any competitor&apos;s social strategy — top posts, content patterns, weakness gaps, optimal posting times, and hashtag intelligence. Find what works and exploit what they miss.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Competitor Handle</label>
              <input
                type="text"
                value={competitorHandle}
                onChange={(e) => setCompetitorHandle(e.target.value)}
                placeholder="@competitor or brand name"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Platforms to Analyze</label>
              <div className="flex flex-wrap gap-2">
                {platforms.map((p) => (
                  <button
                    key={p}
                    onClick={() => togglePlatform(p)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      selectedPlatforms.includes(p)
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Industry</label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                >
                  {industries.map((ind) => (<option key={ind} value={ind}>{ind}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Analysis Depth</label>
                <select
                  value={depth}
                  onChange={(e) => setDepth(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                >
                  {analysisDepth.map((d) => (<option key={d} value={d}>{d}</option>))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Time Range</label>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
              >
                {timeRanges.map((t) => (<option key={t} value={t}>{t}</option>))}
              </select>
            </div>
          </div>
        </div>

        <button
          onClick={handleAnalyze}
          className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg font-semibold text-lg hover:from-orange-500 hover:to-red-500 transition-all"
        >
          Analyze Competitor
        </button>

        {result && (
          <div className="mt-12">
            <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-800 pb-2">
              {(['topPosts', 'patterns', 'gaps', 'schedule', 'hashtags'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${
                    activeTab === tab ? 'bg-gray-800 text-orange-400' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {tab === 'topPosts' ? `Top Posts (${result.topPosts.length})` :
                   tab === 'patterns' ? `Content Patterns (${result.contentPatterns.length})` :
                   tab === 'gaps' ? `Weakness Gaps (${result.weaknessGaps.length})` :
                   tab === 'schedule' ? `Posting Schedule (${result.postingSchedule.length})` :
                   `Hashtag Intel (${result.hashtagIntel.length})`}
                </button>
              ))}
            </div>

            {activeTab === 'topPosts' && (
              <div className="grid gap-4">
                {result.topPosts.map((post, i) => (
                  <div key={i} className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-1 bg-orange-900/40 text-orange-400 text-xs rounded">{post.platform}</span>
                        <span className="text-sm text-gray-400">{post.type}</span>
                      </div>
                      <div className="flex gap-4 text-sm">
                        <span className="text-gray-400">Reach: <span className="text-white">{formatNumber(post.estimatedReach)}</span></span>
                        <span className="text-green-400">{post.engagementRate}% ER</span>
                        <span className="text-gray-500">{post.postingTime}</span>
                      </div>
                    </div>
                    <p className="text-white font-medium mb-3 text-lg">{post.hook}</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs text-gray-500 uppercase tracking-wider">Viral Factors</span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {post.viralFactors.map((f, j) => (
                            <span key={j} className="px-2 py-0.5 bg-green-900/30 text-green-400 text-xs rounded">{f}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 uppercase tracking-wider">Replicable Elements</span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {post.replicableElements.map((r, j) => (
                            <span key={j} className="px-2 py-0.5 bg-blue-900/30 text-blue-400 text-xs rounded">{r}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'patterns' && (
              <div className="grid gap-4">
                {result.contentPatterns.map((cp, i) => (
                  <div key={i} className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/50">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-orange-400">{cp.pattern}</h3>
                      <div className="flex gap-3 text-sm">
                        <span className="text-gray-400">{cp.frequency}</span>
                        <span className="text-green-400">{cp.avgEngagement}% avg ER</span>
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          cp.trend === 'Growing' || cp.trend === 'Growing fast' ? 'bg-green-900/40 text-green-400' :
                          cp.trend === 'Declining' ? 'bg-red-900/40 text-red-400' :
                          cp.trend === 'Dominant' ? 'bg-purple-900/40 text-purple-400' :
                          'bg-gray-700 text-gray-400'
                        }`}>{cp.trend}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {cp.examples.map((ex, j) => (
                        <span key={j} className="text-sm text-gray-300">{ex}{j < cp.examples.length - 1 ? ' /' : ''}</span>
                      ))}
                    </div>
                    <div className="bg-gray-900/50 rounded-lg p-3">
                      <span className="text-xs text-orange-400 uppercase tracking-wider">Your Adaptation</span>
                      <p className="text-gray-300 text-sm mt-1">{cp.adaptationTip}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'gaps' && (
              <div className="grid gap-4">
                {result.weaknessGaps.map((gap, i) => (
                  <div key={i} className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/50">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-red-400">{gap.area}</h3>
                      <div className="flex gap-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          gap.difficulty === 'Low' ? 'bg-green-900/40 text-green-400' :
                          gap.difficulty === 'Medium' ? 'bg-yellow-900/40 text-yellow-400' :
                          'bg-red-900/40 text-red-400'
                        }`}>Difficulty: {gap.difficulty}</span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          gap.potentialImpact.includes('High') || gap.potentialImpact.includes('Very') ? 'bg-green-900/40 text-green-400' : 'bg-yellow-900/40 text-yellow-400'
                        }`}>Impact: {gap.potentialImpact}</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">{gap.description}</p>
                    <p className="text-white text-sm mb-3">{gap.opportunity}</p>
                    <div className="space-y-1.5">
                      {gap.actionSteps.map((step, j) => (
                        <div key={j} className="flex items-start gap-2 text-sm text-gray-300">
                          <span className="text-orange-400 mt-0.5">{j + 1}.</span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'schedule' && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-400 border-b border-gray-700">
                      <th className="py-3 px-4">Day</th>
                      <th className="py-3 px-4">Best Time</th>
                      <th className="py-3 px-4">Platform</th>
                      <th className="py-3 px-4">Content Type</th>
                      <th className="py-3 px-4">Competitor Activity</th>
                      <th className="py-3 px-4">Your Opportunity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.postingSchedule.map((ps, i) => (
                      <tr key={i} className="border-b border-gray-800">
                        <td className="py-3 px-4 text-white font-medium">{ps.day}</td>
                        <td className="py-3 px-4 text-orange-400">{ps.bestTime}</td>
                        <td className="py-3 px-4">{ps.platform}</td>
                        <td className="py-3 px-4 text-gray-300">{ps.contentType}</td>
                        <td className="py-3 px-4">
                          <span className={`text-xs ${ps.competitorActivity.includes('High') ? 'text-red-400' : ps.competitorActivity.includes('Low') || ps.competitorActivity.includes('Very') ? 'text-green-400' : 'text-yellow-400'}`}>
                            {ps.competitorActivity}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-300">{ps.yourOpportunity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'hashtags' && (
              <div className="grid gap-4">
                {result.hashtagIntel.map((hi, i) => (
                  <div key={i} className="bg-gray-800/60 rounded-xl p-5 border border-gray-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-blue-400">{hi.hashtag}</h3>
                      <div className="flex gap-3 text-sm">
                        <span className="text-gray-400">Competitor uses: {hi.competitorUsage}%</span>
                        <span className="text-gray-400">Avg reach: {formatNumber(hi.avgReach)}</span>
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          hi.saturation === 'Low' ? 'bg-green-900/40 text-green-400' :
                          hi.saturation === 'Medium' ? 'bg-yellow-900/40 text-yellow-400' :
                          'bg-red-900/40 text-red-400'
                        }`}>{hi.saturation} saturation</span>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-2">{hi.recommendation}</p>
                    <div className="flex gap-2">
                      <span className="text-xs text-gray-500">Alternatives:</span>
                      {hi.alternatives.map((alt, j) => (
                        <span key={j} className="text-xs text-cyan-400">{alt}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <section className="mt-20">
          <h2 className="text-2xl font-bold mb-6">How Competitor Spying Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700/30">
              <h3 className="font-semibold mb-2">1. Enter Competitor</h3>
              <p className="text-gray-400 text-sm">Add their handle or brand name, select platforms to analyze, and choose your industry for contextual insights.</p>
            </div>
            <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700/30">
              <h3 className="font-semibold mb-2">2. Analyze Top Posts</h3>
              <p className="text-gray-400 text-sm">See their best-performing content, viral factors, engagement rates, and replicable elements you can adapt.</p>
            </div>
            <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700/30">
              <h3 className="font-semibold mb-2">3. Find Weaknesses</h3>
              <p className="text-gray-400 text-sm">Discover gaps in their strategy — platforms they ignore, content they miss, engagement they skip.</p>
            </div>
            <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700/30">
              <h3 className="font-semibold mb-2">4. Execute Your Plan</h3>
              <p className="text-gray-400 text-sm">Get a weekly posting schedule, hashtag intelligence, and step-by-step action plans to outperform them.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
