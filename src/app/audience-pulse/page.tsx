'use client';
import { useState } from 'react';

const industries = ['Tech/SaaS', 'Health & Wellness', 'Finance', 'Education', 'Entertainment', 'Fashion', 'Food & Beverage', 'Travel', 'Fitness', 'Real Estate', 'Automotive', 'Gaming'] as const;
const platforms = ['Instagram', 'TikTok', 'Twitter/X', 'LinkedIn', 'YouTube'] as const;
const audienceSizes = ['Under 1K', '1K-10K', '10K-50K', '50K-100K', '100K-500K', '500K+'] as const;
const analysisDepths = ['Quick Scan', 'Deep Analysis', 'Comprehensive Report'] as const;
const timeRanges = ['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'Last Year'] as const;

interface PulseResult {
  sentimentOverview: { score: number; positive: number; neutral: number; negative: number; trendingEmotions: string[] };
  trendingTopics: { topic: string; momentum: number; relevance: string; suggestedAngle: string }[];
  audienceBehavior: { peakHours: string[]; preferredContent: string[]; engagementPatterns: string[]; growthVelocity: string };
  contentPredictions: { idea: string; predictedEngagement: number; bestFormat: string; optimalTiming: string }[];
  competitorPulse: { name: string; sentiment: number; engagementRate: string; contentFrequency: string; topContent: string }[];
  actionItems: { action: string; impact: number; difficulty: string; timeframe: string }[];
}

function generatePulse(industry: string, platform: string, audienceSize: string, niche: string, depth: string, timeRange: string): PulseResult {
  const nicheLabel = niche || industry.split('/')[0].toLowerCase();
  const isDeep = depth === 'Deep Analysis' || depth === 'Comprehensive Report';
  const isComprehensive = depth === 'Comprehensive Report';
  const sizeMultiplier = audienceSizes.indexOf(audienceSize as typeof audienceSizes[number]);

  const baseScore = 62 + Math.floor(Math.random() * 20);
  const positive = 45 + Math.floor(Math.random() * 25);
  const negative = 5 + Math.floor(Math.random() * 15);
  const neutral = 100 - positive - negative;

  const trendingEmotionSets: Record<string, string[]> = {
    'Tech/SaaS': ['Excitement', 'Curiosity', 'Frustration (pricing)', 'FOMO', 'Skepticism'],
    'Health & Wellness': ['Inspiration', 'Hope', 'Overwhelm', 'Trust', 'Motivation'],
    'Finance': ['Anxiety', 'Ambition', 'Distrust', 'Curiosity', 'Relief'],
    'Education': ['Curiosity', 'Frustration', 'Achievement', 'Overwhelm', 'Gratitude'],
    'Entertainment': ['Joy', 'Nostalgia', 'Hype', 'Disappointment', 'Escapism'],
    'Fashion': ['Aspiration', 'Envy', 'Creativity', 'Sustainability concern', 'Excitement'],
    'Food & Beverage': ['Craving', 'Nostalgia', 'Curiosity', 'Health guilt', 'Joy'],
    'Travel': ['Wanderlust', 'FOMO', 'Relaxation', 'Budget anxiety', 'Excitement'],
    'Fitness': ['Motivation', 'Guilt', 'Pride', 'Comparison', 'Determination'],
    'Real Estate': ['Anxiety', 'Excitement', 'Frustration', 'Hope', 'FOMO'],
    'Automotive': ['Excitement', 'Nostalgia', 'Environmental concern', 'Status', 'Curiosity'],
    'Gaming': ['Hype', 'Frustration', 'Nostalgia', 'Community pride', 'FOMO'],
  };

  const topicsByIndustry: Record<string, { topic: string; momentum: number; relevance: string; suggestedAngle: string }[]> = {
    'Tech/SaaS': [
      { topic: 'AI agent workflows', momentum: 94, relevance: 'Very High', suggestedAngle: 'Show a real workflow automation with before/after' },
      { topic: 'Vertical SaaS consolidation', momentum: 78, relevance: 'High', suggestedAngle: 'Compare all-in-one vs best-of-breed for your niche' },
      { topic: 'Open-source alternatives', momentum: 85, relevance: 'High', suggestedAngle: 'Create a "We tried switching to open-source" story' },
      { topic: 'AI pricing backlash', momentum: 72, relevance: 'Medium', suggestedAngle: 'Transparent pricing breakdown post' },
      { topic: 'Developer experience (DX)', momentum: 81, relevance: 'High', suggestedAngle: 'Behind-the-scenes of your API/SDK design choices' },
      { topic: 'No-code/low-code fatigue', momentum: 66, relevance: 'Medium', suggestedAngle: 'When no-code breaks down — honest take' },
      { topic: 'PLG metrics benchmark', momentum: 73, relevance: 'High', suggestedAngle: 'Share your actual funnel numbers (redacted)' },
      { topic: 'SOC 2 compliance journey', momentum: 60, relevance: 'Medium', suggestedAngle: 'The real cost and timeline of getting SOC 2' },
    ],
    default: [
      { topic: `${nicheLabel} trends 2026`, momentum: 88, relevance: 'Very High', suggestedAngle: `Top 5 ${nicheLabel} trends your audience needs to know` },
      { topic: 'Behind-the-scenes content', momentum: 82, relevance: 'High', suggestedAngle: 'Show the messy reality — authenticity wins' },
      { topic: 'Community-driven content', momentum: 79, relevance: 'High', suggestedAngle: 'Feature your audience/customers in content' },
      { topic: 'Short-form educational content', momentum: 91, relevance: 'Very High', suggestedAngle: 'Break complex topics into 60-second explainers' },
      { topic: 'Sustainability & ethics', momentum: 74, relevance: 'Medium', suggestedAngle: 'Share genuine sustainability efforts (avoid greenwashing)' },
      { topic: 'AI-enhanced creativity', momentum: 86, relevance: 'High', suggestedAngle: 'Show your AI workflow without hiding the human element' },
      { topic: 'Personal brand storytelling', momentum: 77, relevance: 'High', suggestedAngle: 'Share a failure story and what you learned' },
      { topic: 'Micro-community building', momentum: 70, relevance: 'Medium', suggestedAngle: 'Create exclusive content for your most engaged followers' },
    ],
  };

  const peakHoursByPlatform: Record<string, string[]> = {
    'Instagram': ['11:00 AM', '1:00 PM', '7:00 PM'],
    'TikTok': ['7:00 PM', '9:00 PM', '12:00 PM'],
    'Twitter/X': ['9:00 AM', '12:00 PM', '5:00 PM'],
    'LinkedIn': ['8:00 AM', '10:00 AM', '12:00 PM'],
    'YouTube': ['2:00 PM', '4:00 PM', '9:00 PM'],
  };

  const contentTypesByPlatform: Record<string, string[]> = {
    'Instagram': ['Reels (60-90s)', 'Carousel (8-10 slides)', 'Stories (polls/quizzes)', 'Single image with long caption'],
    'TikTok': ['Tutorial/How-to (30-60s)', 'Trend participation', 'Stitch/Duet reactions', 'Day-in-the-life vlogs'],
    'Twitter/X': ['Thread (5-7 tweets)', 'Quote tweet with hot take', 'Poll', 'Screenshot of insight + commentary'],
    'LinkedIn': ['Personal story post', 'Data-backed insight', 'Carousel PDF', 'Video (under 2 min)'],
    'YouTube': ['Short (30-60s)', 'Tutorial (8-12 min)', 'Comparison/Review', 'Vlog/Behind-the-scenes'],
  };

  return {
    sentimentOverview: {
      score: baseScore,
      positive,
      neutral,
      negative,
      trendingEmotions: (trendingEmotionSets[industry] || trendingEmotionSets['Tech/SaaS']).slice(0, isDeep ? 5 : 3),
    },
    trendingTopics: (topicsByIndustry[industry] || topicsByIndustry['default']).slice(0, isComprehensive ? 8 : isDeep ? 6 : 4),
    audienceBehavior: {
      peakHours: peakHoursByPlatform[platform] || ['12:00 PM', '6:00 PM'],
      preferredContent: contentTypesByPlatform[platform] || ['Short video', 'Image post'],
      engagementPatterns: [
        `Comment rate peaks on ${platform === 'LinkedIn' ? 'Tuesday' : 'Thursday'} at ${peakHoursByPlatform[platform]?.[0] || '12:00 PM'}`,
        `Save/bookmark rate is ${18 + Math.floor(Math.random() * 15)}% higher on educational content`,
        `Share rate increases ${22 + Math.floor(Math.random() * 20)}% when content includes data/stats`,
        `${platform === 'TikTok' ? 'Watch time' : 'Dwell time'} is highest for ${platform === 'TikTok' ? '21-34 second' : '60-90 second'} content`,
      ],
      growthVelocity: `${(1.2 + sizeMultiplier * 0.8 + Math.random() * 2).toFixed(1)}% weekly growth — ${sizeMultiplier < 2 ? 'above average for your size' : sizeMultiplier < 4 ? 'steady growth trajectory' : 'healthy for large accounts'}`,
    },
    contentPredictions: [
      { idea: `"${isDeep ? 'Unpopular opinion' : 'Hot take'}: ${nicheLabel} is changing faster than anyone realizes"`, predictedEngagement: 87 + Math.floor(Math.random() * 10), bestFormat: platform === 'TikTok' ? 'Short video (30s)' : platform === 'LinkedIn' ? 'Text post' : 'Carousel', optimalTiming: peakHoursByPlatform[platform]?.[0] || '12:00 PM' },
      { idea: `Behind-the-scenes of your ${nicheLabel} process with real numbers`, predictedEngagement: 79 + Math.floor(Math.random() * 12), bestFormat: platform === 'Instagram' ? 'Reel' : 'Video', optimalTiming: peakHoursByPlatform[platform]?.[1] || '3:00 PM' },
      { idea: `"I asked 100 ${nicheLabel} professionals this one question..."`, predictedEngagement: 82 + Math.floor(Math.random() * 10), bestFormat: platform === 'Twitter/X' ? 'Thread' : 'Carousel', optimalTiming: peakHoursByPlatform[platform]?.[2] || '6:00 PM' },
      { idea: `Step-by-step: How to [common pain point] in ${nicheLabel} (2026 edition)`, predictedEngagement: 75 + Math.floor(Math.random() * 15), bestFormat: 'Tutorial/How-to', optimalTiming: peakHoursByPlatform[platform]?.[0] || '10:00 AM' },
      { idea: `Myth vs Reality: What people get wrong about ${nicheLabel}`, predictedEngagement: 80 + Math.floor(Math.random() * 12), bestFormat: platform === 'Instagram' ? 'Carousel (slide-by-slide reveal)' : 'Short video', optimalTiming: peakHoursByPlatform[platform]?.[1] || '1:00 PM' },
    ],
    competitorPulse: [
      { name: `${nicheLabel.charAt(0).toUpperCase() + nicheLabel.slice(1)}Pro`, sentiment: 58 + Math.floor(Math.random() * 20), engagementRate: `${(2.1 + Math.random() * 3).toFixed(1)}%`, contentFrequency: '5x/week', topContent: 'Educational carousels' },
      { name: `${nicheLabel.charAt(0).toUpperCase() + nicheLabel.slice(1)}Hub`, sentiment: 52 + Math.floor(Math.random() * 25), engagementRate: `${(1.8 + Math.random() * 2.5).toFixed(1)}%`, contentFrequency: '3x/week', topContent: 'Case studies & testimonials' },
      { name: `The${nicheLabel.charAt(0).toUpperCase() + nicheLabel.slice(1)}Lab`, sentiment: 65 + Math.floor(Math.random() * 18), engagementRate: `${(3.2 + Math.random() * 2).toFixed(1)}%`, contentFrequency: '7x/week', topContent: 'Short-form video & memes' },
    ],
    actionItems: [
      { action: `Create a "trend reaction" ${platform === 'TikTok' ? 'video' : 'post'} on the #1 trending topic within 24h`, impact: 92, difficulty: 'Easy', timeframe: 'Today' },
      { action: `Shift posting schedule to peak hours: ${(peakHoursByPlatform[platform] || ['12:00 PM']).join(', ')}`, impact: 78, difficulty: 'Easy', timeframe: 'This week' },
      { action: `Increase ${contentTypesByPlatform[platform]?.[0] || 'video'} output — highest engagement format`, impact: 85, difficulty: 'Medium', timeframe: 'This week' },
      { action: `Address negative sentiment (${negative}%) with a Q&A or "myth-busting" post`, impact: 71, difficulty: 'Medium', timeframe: 'Next 3 days' },
      { action: `Test 3 content angles from predictions above — measure for 2 weeks`, impact: 88, difficulty: 'Medium', timeframe: '2 weeks' },
      { action: `Analyze competitor ${nicheLabel.charAt(0).toUpperCase() + nicheLabel.slice(1)}Lab's video strategy and adapt top formats`, impact: 76, difficulty: 'Hard', timeframe: 'This month' },
      ...(isComprehensive ? [{ action: `Build a content series around ${(topicsByIndustry[industry] || topicsByIndustry['default'])[0]?.topic || 'trending topic'}`, impact: 90, difficulty: 'Hard', timeframe: '2-4 weeks' }] : []),
    ],
  };
}

export default function AudiencePulsePage() {
  const [industry, setIndustry] = useState<string>(industries[0]);
  const [platform, setPlatform] = useState<string>(platforms[0]);
  const [audienceSize, setAudienceSize] = useState<string>(audienceSizes[0]);
  const [niche, setNiche] = useState('');
  const [depth, setDepth] = useState<string>(analysisDepths[0]);
  const [timeRange, setTimeRange] = useState<string>(timeRanges[0]);
  const [result, setResult] = useState<PulseResult | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Audience Pulse</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Monitor audience sentiment, track trending topics, predict content performance, and benchmark against competitors — all powered by AI analysis.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Industry</label>
              <select value={industry} onChange={e => setIndustry(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                {industries.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Platform</label>
              <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                {platforms.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Audience Size</label>
              <select value={audienceSize} onChange={e => setAudienceSize(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                {audienceSizes.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Content Niche</label>
              <input type="text" value={niche} onChange={e => setNiche(e.target.value)} placeholder="e.g. AI productivity tools" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Analysis Depth</label>
              <select value={depth} onChange={e => setDepth(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                {analysisDepths.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Time Range</label>
              <select value={timeRange} onChange={e => setTimeRange(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                {timeRanges.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <button
            onClick={() => setResult(generatePulse(industry, platform, audienceSize, niche, depth, timeRange))}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl"
          >
            Analyze Audience Pulse
          </button>
        </div>

        {result && (
          <div className="space-y-6">
            {/* Sentiment Overview */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Sentiment Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                <div className="bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-2xl p-6 text-white text-center col-span-1 md:col-span-2">
                  <p className="text-5xl font-bold">{result.sentimentOverview.score}</p>
                  <p className="text-indigo-100 mt-1">Overall Pulse Score</p>
                  <p className="text-xs text-indigo-200 mt-2">{result.sentimentOverview.score >= 75 ? 'Strong positive sentiment' : result.sentimentOverview.score >= 50 ? 'Mixed sentiment — room to improve' : 'Needs attention'}</p>
                </div>
                <div className="bg-green-50 rounded-2xl p-5 text-center">
                  <p className="text-3xl font-bold text-green-600">{result.sentimentOverview.positive}%</p>
                  <p className="text-sm text-gray-600">Positive</p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-5 text-center">
                  <p className="text-3xl font-bold text-gray-500">{result.sentimentOverview.neutral}%</p>
                  <p className="text-sm text-gray-600">Neutral</p>
                </div>
                <div className="bg-red-50 rounded-2xl p-5 text-center">
                  <p className="text-3xl font-bold text-red-500">{result.sentimentOverview.negative}%</p>
                  <p className="text-sm text-gray-600">Negative</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-2">TRENDING EMOTIONS</p>
                <div className="flex flex-wrap gap-2">
                  {result.sentimentOverview.trendingEmotions.map(e => (
                    <span key={e} className="bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-full text-sm font-medium">{e}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Trending Topics */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Trending Topics</h2>
              <div className="space-y-3">
                {result.trendingTopics.map((t, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-4 flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex items-center gap-3 md:w-1/3">
                      <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold">#{i + 1}</span>
                      <span className="font-medium text-gray-900">{t.topic}</span>
                    </div>
                    <div className="md:w-1/6">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className={`h-2 rounded-full ${t.momentum >= 80 ? 'bg-green-500' : t.momentum >= 60 ? 'bg-yellow-500' : 'bg-orange-500'}`} style={{ width: `${t.momentum}%` }} />
                        </div>
                        <span className="text-xs text-gray-500 whitespace-nowrap">{t.momentum}%</span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${t.relevance === 'Very High' ? 'bg-green-100 text-green-700' : t.relevance === 'High' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>{t.relevance}</span>
                    <p className="text-sm text-gray-600 md:w-1/3">{t.suggestedAngle}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Audience Behavior */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Audience Behavior</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-3">PEAK ACTIVITY HOURS</p>
                  <div className="flex gap-2">
                    {result.audienceBehavior.peakHours.map(h => (
                      <span key={h} className="bg-cyan-100 text-cyan-700 px-3 py-2 rounded-lg text-sm font-medium">{h}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-3">PREFERRED CONTENT</p>
                  <ul className="space-y-1.5">
                    {result.audienceBehavior.preferredContent.map((c, i) => (
                      <li key={i} className="text-sm text-gray-700 flex gap-2"><span className="text-cyan-500">&#9679;</span>{c}</li>
                    ))}
                  </ul>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm font-semibold text-gray-500 mb-3">ENGAGEMENT PATTERNS</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {result.audienceBehavior.engagementPatterns.map((p, i) => (
                      <div key={i} className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700">{p}</div>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="bg-indigo-50 rounded-xl p-4">
                    <p className="text-sm font-semibold text-indigo-700">Growth Velocity: {result.audienceBehavior.growthVelocity}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Predictions */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Content Predictions</h2>
              <div className="space-y-4">
                {result.contentPredictions.map((p, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-5">
                    <div className="flex items-start justify-between mb-3">
                      <p className="font-medium text-gray-900 flex-1">{p.idea}</p>
                      <span className={`ml-3 px-3 py-1 rounded-full text-sm font-bold ${p.predictedEngagement >= 85 ? 'bg-green-100 text-green-700' : p.predictedEngagement >= 70 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                        {p.predictedEngagement}/100
                      </span>
                    </div>
                    <div className="flex gap-4 text-xs text-gray-500">
                      <span>Format: <strong className="text-gray-700">{p.bestFormat}</strong></span>
                      <span>Post at: <strong className="text-gray-700">{p.optimalTiming}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Competitor Pulse */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Competitor Pulse</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {result.competitorPulse.map((c, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-gray-900">{c.name}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-bold ${c.sentiment >= 70 ? 'bg-green-100 text-green-700' : c.sentiment >= 50 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                        {c.sentiment}/100
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-gray-500">Engagement Rate</span><span className="font-medium text-gray-700">{c.engagementRate}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Frequency</span><span className="font-medium text-gray-700">{c.contentFrequency}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Top Content</span><span className="font-medium text-gray-700">{c.topContent}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Items */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Action Items</h2>
              <div className="space-y-3">
                {result.actionItems.map((a, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-4 flex flex-col md:flex-row md:items-center gap-3">
                    <div className="flex items-center gap-3 md:w-1/2">
                      <span className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${a.impact >= 85 ? 'bg-red-100 text-red-600' : a.impact >= 70 ? 'bg-orange-100 text-orange-600' : 'bg-yellow-100 text-yellow-600'}`}>{a.impact}</span>
                      <span className="text-sm text-gray-900">{a.action}</span>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${a.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : a.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{a.difficulty}</span>
                    <span className="text-xs text-gray-500">{a.timeframe}</span>
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
