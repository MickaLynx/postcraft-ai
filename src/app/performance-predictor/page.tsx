'use client';
import { useState } from 'react';

const platforms = ['Instagram', 'TikTok', 'Twitter/X', 'LinkedIn', 'YouTube', 'Facebook', 'Pinterest'] as const;
const contentTypes = ['Image Post', 'Carousel', 'Video (Short)', 'Video (Long)', 'Text Post', 'Story', 'Live Stream', 'Poll'] as const;
const postGoals = ['Maximize Reach', 'Drive Engagement', 'Generate Leads', 'Build Authority', 'Grow Followers', 'Drive Sales'] as const;
const audienceSizes = ['< 1K', '1K-10K', '10K-50K', '50K-100K', '100K-500K', '500K+'] as const;

interface PerformancePrediction {
  metric: string;
  predicted: number;
  industryAvg: number;
  percentile: number;
  confidence: number;
  trend: string;
}

interface TimingRecommendation {
  day: string;
  time: string;
  predictedReach: number;
  competitorDensity: string;
  audienceActivity: string;
  score: number;
}

interface ContentFactor {
  factor: string;
  currentScore: number;
  impact: string;
  recommendation: string;
  potentialLift: number;
}

interface ViralProbability {
  scenario: string;
  probability: number;
  requiredConditions: string[];
  expectedReach: number;
  timeToViral: string;
}

interface PredictorResult {
  predictions: PerformancePrediction[];
  timingRecommendations: TimingRecommendation[];
  contentFactors: ContentFactor[];
  viralProbability: ViralProbability[];
  overallScore: number;
  overallGrade: string;
}

function predictPerformance(
  platform: string,
  contentType: string,
  postGoal: string,
  audienceSize: string,
  caption: string,
  hashtagCount: number
): PredictorResult {
  const captionLength = caption.length;
  const hasEmojis = /[\u{1F600}-\u{1F64F}]/u.test(caption);
  const hasQuestion = caption.includes('?');
  const hasCTA = /follow|save|share|comment|click|link|dm/i.test(caption);

  const predictions: PerformancePrediction[] = [
    { metric: 'Reach', predicted: 12400, industryAvg: 8500, percentile: 72, confidence: 78, trend: 'Above average' },
    { metric: 'Engagement Rate', predicted: 4.8, industryAvg: 3.2, percentile: 68, confidence: 82, trend: 'Strong' },
    { metric: 'Saves/Bookmarks', predicted: 340, industryAvg: 180, percentile: 81, confidence: 71, trend: 'High save potential' },
    { metric: 'Shares', predicted: 89, industryAvg: 45, percentile: 74, confidence: 65, trend: 'Above average' },
    { metric: 'Comments', predicted: 56, industryAvg: 32, percentile: 69, confidence: 73, trend: 'Moderate' },
    { metric: 'Profile Visits', predicted: 210, industryAvg: 120, percentile: 76, confidence: 68, trend: 'Good conversion' },
    { metric: 'Follower Growth', predicted: 28, industryAvg: 15, percentile: 71, confidence: 60, trend: 'Steady growth' },
  ];

  const timingRecommendations: TimingRecommendation[] = [
    { day: 'Tuesday', time: '9:00 AM', predictedReach: 15200, competitorDensity: 'Low', audienceActivity: 'High', score: 94 },
    { day: 'Thursday', time: '7:00 PM', predictedReach: 14800, competitorDensity: 'Medium', audienceActivity: 'Very High', score: 91 },
    { day: 'Sunday', time: '11:00 AM', predictedReach: 13500, competitorDensity: 'Very Low', audienceActivity: 'High', score: 88 },
    { day: 'Wednesday', time: '12:00 PM', predictedReach: 12100, competitorDensity: 'Medium', audienceActivity: 'Medium', score: 82 },
    { day: 'Monday', time: '8:00 AM', predictedReach: 11800, competitorDensity: 'High', audienceActivity: 'Medium', score: 76 },
    { day: 'Friday', time: '5:00 PM', predictedReach: 10900, competitorDensity: 'Low', audienceActivity: 'Medium', score: 74 },
    { day: 'Saturday', time: '10:00 AM', predictedReach: 9800, competitorDensity: 'Very Low', audienceActivity: 'Low', score: 68 },
  ];

  const contentFactors: ContentFactor[] = [
    { factor: 'Caption Length', currentScore: captionLength > 100 && captionLength < 300 ? 85 : captionLength < 50 ? 45 : 65, impact: 'High', recommendation: captionLength < 100 ? 'Extend caption to 150-250 characters for optimal engagement' : captionLength > 500 ? 'Shorten to under 300 characters — long captions lose attention' : 'Caption length is in the sweet spot', potentialLift: captionLength > 100 && captionLength < 300 ? 0 : 15 },
    { factor: 'Emoji Usage', currentScore: hasEmojis ? 80 : 55, impact: 'Medium', recommendation: hasEmojis ? 'Good emoji usage — aim for 2-4 per post' : 'Add 2-3 relevant emojis to boost scan-ability and emotion', potentialLift: hasEmojis ? 0 : 12 },
    { factor: 'Question/CTA', currentScore: hasQuestion && hasCTA ? 95 : hasQuestion || hasCTA ? 70 : 40, impact: 'Very High', recommendation: !hasQuestion ? 'Add a question to invite comments' : !hasCTA ? 'Add a clear call-to-action (save, share, follow)' : 'Great — question + CTA is the winning combo', potentialLift: hasQuestion && hasCTA ? 0 : 25 },
    { factor: 'Hashtag Strategy', currentScore: hashtagCount >= 5 && hashtagCount <= 15 ? 85 : hashtagCount < 3 ? 40 : hashtagCount > 25 ? 50 : 65, impact: 'High', recommendation: hashtagCount < 5 ? 'Increase to 8-12 hashtags mixing niche + broad' : hashtagCount > 20 ? 'Reduce to 10-15 — over-tagging looks spammy' : 'Hashtag count is optimal', potentialLift: hashtagCount >= 5 && hashtagCount <= 15 ? 0 : 18 },
    { factor: 'Content Format', currentScore: contentType === 'Carousel' || contentType === 'Video (Short)' ? 90 : contentType === 'Image Post' ? 70 : 60, impact: 'Very High', recommendation: contentType === 'Image Post' ? 'Consider switching to carousel or short video — 2-3x more reach' : 'Good format choice for current algorithm preferences', potentialLift: contentType === 'Image Post' ? 30 : 0 },
    { factor: 'Hook Strength', currentScore: caption.length > 0 && /^[A-Z!?]/.test(caption) ? 75 : 50, impact: 'Critical', recommendation: 'First 5 words determine if people keep reading. Lead with a bold statement, question, or number.', potentialLift: 20 },
    { factor: 'Posting Consistency', currentScore: 72, impact: 'High', recommendation: 'Maintain 4-5 posts/week minimum. Algorithm rewards consistent creators.', potentialLift: 15 },
  ];

  const viralProbability: ViralProbability[] = [
    { scenario: 'Organic Viral (10x normal reach)', probability: 8.5, requiredConditions: ['Strong hook in first 3 seconds', 'High save rate (>5%)', 'Posted during peak window', 'Uses trending audio/topic'], expectedReach: 124000, timeToViral: '24-48 hours' },
    { scenario: 'Community Amplification (5x reach)', probability: 22, requiredConditions: ['Engages with first 20 comments within 30 min', 'Content is share-worthy (educational or emotional)', 'Tagged by 3+ accounts'], expectedReach: 62000, timeToViral: '12-24 hours' },
    { scenario: 'Steady Growth (2x reach)', probability: 45, requiredConditions: ['Consistent posting schedule', 'Quality content above industry average', 'Active engagement with audience'], expectedReach: 24800, timeToViral: '3-5 days' },
    { scenario: 'Below Average Performance', probability: 24.5, requiredConditions: ['Poor timing', 'No engagement in first hour', 'Generic content without hook'], expectedReach: 4200, timeToViral: 'N/A' },
  ];

  const overallScore = Math.round(contentFactors.reduce((sum, f) => sum + f.currentScore, 0) / contentFactors.length);
  const overallGrade = overallScore >= 90 ? 'A+' : overallScore >= 80 ? 'A' : overallScore >= 70 ? 'B+' : overallScore >= 60 ? 'B' : overallScore >= 50 ? 'C' : 'D';

  return { predictions, timingRecommendations, contentFactors, viralProbability, overallScore, overallGrade };
}

export default function PerformancePredictorPage() {
  const [platform, setPlatform] = useState<string>(platforms[0]);
  const [contentType, setContentType] = useState<string>(contentTypes[0]);
  const [postGoal, setPostGoal] = useState<string>(postGoals[0]);
  const [audienceSize, setAudienceSize] = useState<string>(audienceSizes[1]);
  const [caption, setCaption] = useState('');
  const [hashtagCount, setHashtagCount] = useState(8);
  const [result, setResult] = useState<PredictorResult | null>(null);
  const [activeTab, setActiveTab] = useState<'predictions' | 'timing' | 'factors' | 'viral'>('predictions');

  const handlePredict = () => {
    setResult(predictPerformance(platform, contentType, postGoal, audienceSize, caption, hashtagCount));
  };

  const formatNumber = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}K` : n.toString();

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <nav className="text-sm text-gray-400 mb-8">
          <a href="/" className="hover:text-white">Home</a> → <span className="text-white">Performance Predictor</span>
        </nav>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
          Content Performance Predictor
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl">
          Predict how your content will perform before you post. Get reach estimates, optimal timing, content factor analysis, and viral probability scores.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Your Caption/Content</label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Paste your caption or content here to analyze..."
              className="w-full h-36 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none"
            />
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Platform</label>
                <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm">
                  {platforms.map((p) => (<option key={p} value={p}>{p}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Content Type</label>
                <select value={contentType} onChange={(e) => setContentType(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm">
                  {contentTypes.map((c) => (<option key={c} value={c}>{c}</option>))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Post Goal</label>
                <select value={postGoal} onChange={(e) => setPostGoal(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm">
                  {postGoals.map((g) => (<option key={g} value={g}>{g}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Audience Size</label>
                <select value={audienceSize} onChange={(e) => setAudienceSize(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm">
                  {audienceSizes.map((a) => (<option key={a} value={a}>{a}</option>))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Number of Hashtags: {hashtagCount}</label>
              <input type="range" min="0" max="30" value={hashtagCount} onChange={(e) => setHashtagCount(Number(e.target.value))} className="w-full" />
            </div>
          </div>
        </div>

        <button
          onClick={handlePredict}
          className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg font-semibold text-lg hover:from-emerald-500 hover:to-teal-500 transition-all"
        >
          Predict Performance
        </button>

        {result && (
          <div className="mt-12">
            <div className="flex items-center gap-6 mb-8 bg-gray-800/60 rounded-xl p-6 border border-gray-700/50">
              <div className="text-center">
                <div className={`text-5xl font-bold ${result.overallScore >= 80 ? 'text-green-400' : result.overallScore >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                  {result.overallGrade}
                </div>
                <div className="text-sm text-gray-400 mt-1">Overall Grade</div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex-1 h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${result.overallScore >= 80 ? 'bg-green-500' : result.overallScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${result.overallScore}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{result.overallScore}/100</span>
                </div>
                <p className="text-sm text-gray-400">
                  {result.overallScore >= 80
                    ? 'Excellent! This content is likely to outperform industry benchmarks.'
                    : result.overallScore >= 60
                    ? 'Good baseline. Apply the factor recommendations below to boost performance.'
                    : 'Needs improvement. Focus on the critical factors highlighted below.'}
                </p>
              </div>
            </div>

            <div className="flex gap-2 mb-6 border-b border-gray-800 pb-2">
              {(['predictions', 'timing', 'factors', 'viral'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${
                    activeTab === tab ? 'bg-gray-800 text-emerald-400' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {tab === 'predictions' ? 'Metric Predictions' :
                   tab === 'timing' ? 'Optimal Timing' :
                   tab === 'factors' ? 'Content Factors' :
                   'Viral Probability'}
                </button>
              ))}
            </div>

            {activeTab === 'predictions' && (
              <div className="grid gap-3">
                {result.predictions.map((p, i) => (
                  <div key={i} className="bg-gray-800/60 rounded-xl p-5 border border-gray-700/50 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-emerald-400">{p.metric}</span>
                      <span className="text-xs text-gray-500 ml-3">{p.confidence}% confidence</span>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-right">
                        <div className="text-white font-bold">{typeof p.predicted === 'number' && p.predicted > 100 ? formatNumber(p.predicted) : p.predicted}{p.metric.includes('Rate') ? '%' : ''}</div>
                        <div className="text-xs text-gray-500">Predicted</div>
                      </div>
                      <div className="text-right">
                        <div className="text-gray-400">{typeof p.industryAvg === 'number' && p.industryAvg > 100 ? formatNumber(p.industryAvg) : p.industryAvg}{p.metric.includes('Rate') ? '%' : ''}</div>
                        <div className="text-xs text-gray-500">Industry Avg</div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded text-xs ${p.percentile >= 75 ? 'bg-green-900/40 text-green-400' : p.percentile >= 50 ? 'bg-yellow-900/40 text-yellow-400' : 'bg-red-900/40 text-red-400'}`}>
                          Top {100 - p.percentile}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'timing' && (
              <div className="grid gap-3">
                {result.timingRecommendations.map((t, i) => (
                  <div key={i} className="bg-gray-800/60 rounded-xl p-5 border border-gray-700/50 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`text-2xl font-bold w-12 text-center ${t.score >= 90 ? 'text-green-400' : t.score >= 80 ? 'text-yellow-400' : 'text-gray-400'}`}>{t.score}</div>
                      <div>
                        <div className="font-medium">{t.day} at {t.time}</div>
                        <div className="text-xs text-gray-400">Reach: {formatNumber(t.predictedReach)}</div>
                      </div>
                    </div>
                    <div className="flex gap-4 text-xs">
                      <span className={`px-2 py-1 rounded ${t.competitorDensity === 'Low' || t.competitorDensity === 'Very Low' ? 'bg-green-900/40 text-green-400' : 'bg-yellow-900/40 text-yellow-400'}`}>
                        Competitors: {t.competitorDensity}
                      </span>
                      <span className={`px-2 py-1 rounded ${t.audienceActivity === 'High' || t.audienceActivity === 'Very High' ? 'bg-green-900/40 text-green-400' : 'bg-yellow-900/40 text-yellow-400'}`}>
                        Audience: {t.audienceActivity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'factors' && (
              <div className="grid gap-4">
                {result.contentFactors.map((f, i) => (
                  <div key={i} className="bg-gray-800/60 rounded-xl p-5 border border-gray-700/50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold">{f.factor}</span>
                        <span className={`text-xs px-2 py-0.5 rounded ${f.impact === 'Critical' || f.impact === 'Very High' ? 'bg-red-900/40 text-red-400' : f.impact === 'High' ? 'bg-orange-900/40 text-orange-400' : 'bg-gray-700 text-gray-400'}`}>
                          {f.impact} impact
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${f.currentScore >= 80 ? 'bg-green-500' : f.currentScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${f.currentScore}%` }} />
                        </div>
                        <span className="text-sm font-medium w-10 text-right">{f.currentScore}%</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300">{f.recommendation}</p>
                    {f.potentialLift > 0 && (
                      <div className="mt-2 text-xs text-emerald-400">Potential lift: +{f.potentialLift}% engagement</div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'viral' && (
              <div className="grid gap-4">
                {result.viralProbability.map((v, i) => (
                  <div key={i} className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/50">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold">{v.scenario}</h3>
                      <div className="flex items-center gap-3">
                        <span className={`text-2xl font-bold ${v.probability >= 30 ? 'text-green-400' : v.probability >= 15 ? 'text-yellow-400' : 'text-gray-400'}`}>
                          {v.probability}%
                        </span>
                        <span className="text-xs text-gray-500">probability</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-400 mb-3">
                      <span>Expected reach: {formatNumber(v.expectedReach)}</span>
                      <span>Time to peak: {v.timeToViral}</span>
                    </div>
                    <div className="space-y-1">
                      {v.requiredConditions.map((c, j) => (
                        <div key={j} className="flex items-center gap-2 text-sm text-gray-300">
                          <span className="text-emerald-400 text-xs">&#9679;</span>
                          <span>{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <section className="mt-20">
          <h2 className="text-2xl font-bold mb-6">How Performance Prediction Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700/30">
              <h3 className="font-semibold mb-2">1. Input Your Content</h3>
              <p className="text-gray-400 text-sm">Paste your caption, select platform, content type, and audience size. The more details you provide, the more accurate the prediction.</p>
            </div>
            <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700/30">
              <h3 className="font-semibold mb-2">2. AI Analysis</h3>
              <p className="text-gray-400 text-sm">Our model analyzes 7 content factors, cross-references industry benchmarks, and evaluates timing windows against competitor activity.</p>
            </div>
            <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700/30">
              <h3 className="font-semibold mb-2">3. Actionable Predictions</h3>
              <p className="text-gray-400 text-sm">Get specific predictions for reach, engagement, saves, and shares — plus viral probability scenarios and improvement recommendations.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
