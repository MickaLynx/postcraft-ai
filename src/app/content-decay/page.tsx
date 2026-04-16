'use client';
import { useState } from 'react';

const contentTypes = ['Blog Post', 'Social Media Post', 'Video Content', 'Email Campaign', 'Landing Page', 'Infographic', 'Podcast Episode', 'Newsletter', 'Case Study', 'Product Page'] as const;
const platforms = ['Instagram', 'LinkedIn', 'Twitter/X', 'TikTok', 'YouTube', 'Facebook', 'Google Search', 'Blog/Website'] as const;
const contentAges = ['1 week', '2 weeks', '1 month', '3 months', '6 months', '1 year', '2+ years'] as const;
const industries = ['SaaS/Tech', 'E-commerce', 'Healthcare', 'Finance', 'Education', 'Real Estate', 'Food & Beverage', 'Fashion/Beauty'] as const;
const metrics = ['Engagement Rate', 'Click-Through Rate', 'Impressions', 'Shares', 'Conversions', 'Organic Reach', 'Comments', 'Saves'] as const;
const refreshStrategies = ['Full Rewrite', 'Update Statistics', 'Add New Section', 'Visual Refresh', 'Repurpose Format', 'SEO Optimization'] as const;

interface DecayCurve {
  week: number;
  engagementPercent: number;
  impressionPercent: number;
  clickPercent: number;
  status: string;
}

interface RefreshRecommendation {
  priority: number;
  action: string;
  reasoning: string;
  expectedLift: string;
  effort: string;
  deadline: string;
}

interface EvergreenScore {
  factor: string;
  score: number;
  weight: number;
  contribution: number;
  improvementTip: string;
}

interface CompetitorShift {
  competitor: string;
  theirAction: string;
  impact: string;
  yourResponse: string;
  urgency: string;
}

interface ContentLifecycle {
  phase: string;
  duration: string;
  characteristics: string;
  actions: string;
  kpis: string;
}

interface DecayResult {
  decayScore: number;
  halfLifeDays: number;
  refreshUrgency: string;
  decayCurve: DecayCurve[];
  refreshRecommendations: RefreshRecommendation[];
  evergreenScores: EvergreenScore[];
  competitorShifts: CompetitorShift[];
  contentLifecycle: ContentLifecycle[];
  optimalRefreshDate: string;
  estimatedLifeExtension: string;
}

function generateDecayAnalysis(
  contentType: string,
  platform: string,
  contentAge: string,
  industry: string,
  metric: string,
  strategy: string,
  contentDescription: string
): DecayResult {
  const label = contentDescription.slice(0, 40) || 'your content';

  const ageMultiplier = contentAge === '1 week' ? 0.95 : contentAge === '2 weeks' ? 0.88 : contentAge === '1 month' ? 0.72 :
    contentAge === '3 months' ? 0.55 : contentAge === '6 months' ? 0.38 : contentAge === '1 year' ? 0.22 : 0.10;

  const decayScore = Math.round(ageMultiplier * 100);
  const halfLifeDays = platform === 'TikTok' ? 3 : platform === 'Twitter/X' ? 1 : platform === 'Instagram' ? 7 :
    platform === 'LinkedIn' ? 5 : platform === 'YouTube' ? 90 : platform === 'Facebook' ? 4 :
    platform === 'Google Search' ? 180 : 14;

  const refreshUrgency = decayScore >= 70 ? 'Low - Content still performing well' :
    decayScore >= 40 ? 'Medium - Refresh within 2 weeks recommended' :
    decayScore >= 20 ? 'High - Immediate refresh needed' : 'Critical - Content is effectively dead';

  const decayCurve: DecayCurve[] = [
    { week: 1, engagementPercent: 100, impressionPercent: 100, clickPercent: 100, status: 'peak' },
    { week: 2, engagementPercent: 82, impressionPercent: 88, clickPercent: 85, status: 'peak' },
    { week: 3, engagementPercent: 65, impressionPercent: 72, clickPercent: 68, status: 'declining' },
    { week: 4, engagementPercent: 51, impressionPercent: 58, clickPercent: 52, status: 'declining' },
    { week: 6, engagementPercent: 34, impressionPercent: 40, clickPercent: 35, status: 'stale' },
    { week: 8, engagementPercent: 22, impressionPercent: 28, clickPercent: 21, status: 'stale' },
    { week: 10, engagementPercent: 14, impressionPercent: 18, clickPercent: 13, status: 'dead' },
    { week: 12, engagementPercent: 8, impressionPercent: 11, clickPercent: 7, status: 'dead' },
  ];

  const refreshRecommendations: RefreshRecommendation[] = [
    { priority: 1, action: 'Update statistics and data points', reasoning: `${label} contains outdated numbers that reduce credibility and SEO ranking signals`, expectedLift: '+35% engagement recovery', effort: 'Low (1-2 hours)', deadline: 'Within 3 days' },
    { priority: 2, action: 'Add new section addressing recent trends', reasoning: `${industry} landscape has shifted since publication — competitors have newer content ranking above yours`, expectedLift: '+28% organic impressions', effort: 'Medium (3-4 hours)', deadline: 'Within 1 week' },
    { priority: 3, action: 'Refresh visual assets and media', reasoning: 'Visual content ages faster than text — outdated graphics signal stale content to users and algorithms', expectedLift: '+22% click-through rate', effort: 'Medium (2-3 hours)', deadline: 'Within 2 weeks' },
    { priority: 4, action: 'Optimize meta tags and heading structure for current SEO', reasoning: 'Search intent may have evolved — update title tags, meta descriptions, and H2s to match current query patterns', expectedLift: '+18% search traffic', effort: 'Low (1 hour)', deadline: 'Within 1 week' },
    { priority: 5, action: `Repurpose as ${contentType === 'Blog Post' ? 'video content or carousel' : 'blog post or newsletter'}`, reasoning: 'Cross-format repurposing extends content lifespan by reaching new audience segments on different platforms', expectedLift: '+45% total reach across platforms', effort: 'High (4-6 hours)', deadline: 'Within 3 weeks' },
  ];

  const evergreenScores: EvergreenScore[] = [
    { factor: 'Topic Relevance', score: 72, weight: 0.25, contribution: 18, improvementTip: 'Focus on foundational concepts rather than tool-specific tutorials that become outdated' },
    { factor: 'Data Freshness', score: 45, weight: 0.20, contribution: 9, improvementTip: 'Replace specific year references with "current" or auto-updating data widgets' },
    { factor: 'SEO Alignment', score: 68, weight: 0.20, contribution: 13.6, improvementTip: 'Target informational queries with stable search volume rather than trending terms' },
    { factor: 'Visual Quality', score: 55, weight: 0.15, contribution: 8.25, improvementTip: 'Use timeless design patterns — avoid trendy gradients or specific year-branded graphics' },
    { factor: 'Internal Linking', score: 82, weight: 0.10, contribution: 8.2, improvementTip: 'Add links from newer content back to this piece to maintain link equity flow' },
    { factor: 'User Engagement Signals', score: 38, weight: 0.10, contribution: 3.8, improvementTip: 'Add interactive elements (quiz, calculator, expandable FAQ) to boost time-on-page' },
  ];

  const competitorShifts: CompetitorShift[] = [
    { competitor: 'Competitor A', theirAction: `Published updated ${contentType.toLowerCase()} on same topic with 2026 data`, impact: 'Ranking above you for 3 target keywords', yourResponse: 'Update your piece with fresher data and add unique insights they missed', urgency: 'High' },
    { competitor: 'Competitor B', theirAction: `Created video version of similar content on ${platform}`, impact: 'Capturing video SERP features you are missing', yourResponse: `Create a complementary video and embed it in your existing ${contentType.toLowerCase()}`, urgency: 'Medium' },
    { competitor: 'Competitor C', theirAction: `Built an interactive tool around the same ${industry.toLowerCase()} topic`, impact: 'Getting 3x more backlinks due to tool-based content', yourResponse: 'Add an interactive calculator or assessment to your content to match', urgency: 'Medium' },
    { competitor: 'Industry Publication', theirAction: 'Released comprehensive report contradicting some of your claims', impact: 'Your content credibility at risk if not updated', yourResponse: 'Review claims, update with latest research, add "last updated" date prominently', urgency: 'High' },
    { competitor: 'New Entrant', theirAction: `Aggressive ${platform} campaign targeting your audience segment`, impact: 'Attention shifting to fresher, more visually appealing content', yourResponse: 'Refresh visuals, add expert quotes, and promote updated version across channels', urgency: 'Low' },
  ];

  const contentLifecycle: ContentLifecycle[] = [
    { phase: 'Launch & Peak', duration: '0-7 days', characteristics: 'Maximum visibility, algorithm boost, social sharing spike', actions: 'Promote aggressively, engage with every comment, cross-post to all channels', kpis: '100% baseline engagement, peak impressions, highest CTR' },
    { phase: 'Early Decline', duration: '1-4 weeks', characteristics: 'Gradual drop in social signals, still ranking well in search', actions: 'Share in communities, add to email sequences, internal link from new posts', kpis: '60-80% of peak engagement, stable search position' },
    { phase: 'Plateau', duration: '1-3 months', characteristics: 'Organic traffic stabilizes, social engagement minimal, SEO carries the load', actions: 'Monitor rankings, update if competitor publishes on same topic', kpis: '30-50% of peak, steady organic traffic if SEO-optimized' },
    { phase: 'Decay', duration: '3-6 months', characteristics: 'Rankings slipping, data becoming outdated, visual fatigue setting in', actions: 'Plan refresh: update stats, add new sections, refresh visuals', kpis: '15-30% of peak, declining search positions' },
    { phase: 'Stale', duration: '6-12 months', characteristics: 'Content appears dated, competitors have overtaken, minimal new traffic', actions: 'Execute major refresh or repurpose into new format entirely', kpis: '5-15% of peak, page 2+ in search results' },
    { phase: 'Dead', duration: '12+ months', characteristics: 'No meaningful traffic, outdated information may harm brand credibility', actions: 'Full rewrite, 301 redirect to new version, or archive with noindex', kpis: 'Below 5% of peak, potential negative brand impact' },
  ];

  const today = new Date();
  const refreshDays = decayScore >= 70 ? 30 : decayScore >= 40 ? 14 : decayScore >= 20 ? 3 : 0;
  const refreshDate = new Date(today.getTime() + refreshDays * 86400000);
  const optimalRefreshDate = refreshDays === 0 ? 'Immediately — content is past due' : refreshDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  const estimatedLifeExtension = strategy === 'Full Rewrite' ? '6-12 months of renewed performance' :
    strategy === 'Update Statistics' ? '2-4 months of extended relevance' :
    strategy === 'Add New Section' ? '3-5 months with expanded search coverage' :
    strategy === 'Visual Refresh' ? '1-3 months of improved engagement' :
    strategy === 'Repurpose Format' ? '4-8 months across new audience segments' :
    '3-6 months of improved search visibility';

  return {
    decayScore,
    halfLifeDays,
    refreshUrgency,
    decayCurve,
    refreshRecommendations,
    evergreenScores,
    competitorShifts,
    contentLifecycle,
    optimalRefreshDate,
    estimatedLifeExtension,
  };
}

export default function ContentDecayPage() {
  const [contentType, setContentType] = useState<string>(contentTypes[0]);
  const [platform, setPlatform] = useState<string>(platforms[0]);
  const [contentAge, setContentAge] = useState<string>(contentAges[2]);
  const [industry, setIndustry] = useState<string>(industries[0]);
  const [metric, setMetric] = useState<string>(metrics[0]);
  const [strategy, setStrategy] = useState<string>(refreshStrategies[0]);
  const [contentDescription, setContentDescription] = useState('');
  const [result, setResult] = useState<DecayResult | null>(null);
  const [activeTab, setActiveTab] = useState<'curve' | 'recommendations' | 'evergreen' | 'competitors' | 'lifecycle'>('curve');

  const handleGenerate = () => {
    setResult(generateDecayAnalysis(contentType, platform, contentAge, industry, metric, strategy, contentDescription));
  };

  const getScoreColor = (score: number) =>
    score >= 70 ? 'text-green-400' : score >= 40 ? 'text-yellow-400' : score >= 20 ? 'text-orange-400' : 'text-red-400';

  const getScoreBg = (score: number) =>
    score >= 70 ? 'bg-green-900/40 border-green-700/50' : score >= 40 ? 'bg-yellow-900/40 border-yellow-700/50' :
    score >= 20 ? 'bg-orange-900/40 border-orange-700/50' : 'bg-red-900/40 border-red-700/50';

  const getScoreLabel = (score: number) =>
    score >= 70 ? 'Fresh' : score >= 40 ? 'Aging' : score >= 20 ? 'Stale' : 'Dead';

  const getStatusColor = (status: string) =>
    status === 'peak' ? 'text-green-400' : status === 'declining' ? 'text-yellow-400' :
    status === 'stale' ? 'text-orange-400' : 'text-red-400';

  const getUrgencyColor = (urgency: string) =>
    urgency === 'High' ? 'bg-red-900/40 text-red-400' : urgency === 'Medium' ? 'bg-yellow-900/40 text-yellow-400' : 'bg-green-900/40 text-green-400';

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <nav className="text-sm text-gray-400 mb-8">
          <a href="/" className="hover:text-white">Home</a> → <span className="text-white">Content Decay Tracker</span>
        </nav>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
          Content Decay Tracker
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl">
          Analyze how your content performance decays over time. Get decay curves, evergreen scores, competitor shift alerts, and optimal refresh timing to maximize content ROI.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Content Type</label>
                <select
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm"
                >
                  {contentTypes.map((ct) => (<option key={ct} value={ct}>{ct}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Platform</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm"
                >
                  {platforms.map((p) => (<option key={p} value={p}>{p}</option>))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Content Age</label>
                <select
                  value={contentAge}
                  onChange={(e) => setContentAge(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm"
                >
                  {contentAges.map((ca) => (<option key={ca} value={ca}>{ca}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Industry</label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm"
                >
                  {industries.map((ind) => (<option key={ind} value={ind}>{ind}</option>))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Primary Metric</label>
                <select
                  value={metric}
                  onChange={(e) => setMetric(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm"
                >
                  {metrics.map((m) => (<option key={m} value={m}>{m}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Preferred Strategy</label>
                <select
                  value={strategy}
                  onChange={(e) => setStrategy(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm"
                >
                  {refreshStrategies.map((rs) => (<option key={rs} value={rs}>{rs}</option>))}
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Content URL or Description</label>
              <textarea
                value={contentDescription}
                onChange={(e) => setContentDescription(e.target.value)}
                placeholder="Paste your content URL or describe the piece you want to analyze (e.g., 'Blog post about SaaS pricing strategies published in January')"
                rows={7}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold text-lg hover:from-purple-500 hover:to-blue-500 transition-all"
        >
          Analyze Content Decay
        </button>

        {result && (
          <div className="mt-12">
            {/* Decay Score Header */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className={`rounded-2xl p-6 border ${getScoreBg(result.decayScore)}`}>
                <span className="text-xs text-gray-400 uppercase tracking-wider">Decay Score</span>
                <div className={`text-4xl font-bold mt-1 ${getScoreColor(result.decayScore)}`}>
                  {result.decayScore}/100
                </div>
                <span className={`text-sm ${getScoreColor(result.decayScore)}`}>{getScoreLabel(result.decayScore)}</span>
              </div>
              <div className="bg-zinc-800/60 rounded-2xl p-6 border border-zinc-700/50">
                <span className="text-xs text-gray-400 uppercase tracking-wider">Content Half-Life</span>
                <div className="text-4xl font-bold mt-1 text-purple-400">{result.halfLifeDays}d</div>
                <span className="text-sm text-gray-400">on {platform}</span>
              </div>
              <div className="bg-zinc-800/60 rounded-2xl p-6 border border-zinc-700/50">
                <span className="text-xs text-gray-400 uppercase tracking-wider">Optimal Refresh</span>
                <div className="text-lg font-semibold mt-2 text-blue-400">{result.optimalRefreshDate}</div>
              </div>
              <div className="bg-zinc-800/60 rounded-2xl p-6 border border-zinc-700/50">
                <span className="text-xs text-gray-400 uppercase tracking-wider">Life Extension</span>
                <div className="text-lg font-semibold mt-2 text-cyan-400">{result.estimatedLifeExtension}</div>
              </div>
            </div>

            {/* Urgency Banner */}
            <div className={`rounded-xl p-4 mb-8 border ${
              result.decayScore >= 70 ? 'bg-green-900/20 border-green-700/40 text-green-300' :
              result.decayScore >= 40 ? 'bg-yellow-900/20 border-yellow-700/40 text-yellow-300' :
              result.decayScore >= 20 ? 'bg-orange-900/20 border-orange-700/40 text-orange-300' :
              'bg-red-900/20 border-red-700/40 text-red-300'
            }`}>
              <span className="font-semibold">Refresh Urgency:</span> {result.refreshUrgency}
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-6 border-b border-zinc-800 pb-2">
              {(['curve', 'recommendations', 'evergreen', 'competitors', 'lifecycle'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${
                    activeTab === tab ? 'bg-zinc-800 text-purple-400' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {tab === 'curve' ? `Decay Curve (${result.decayCurve.length})` :
                   tab === 'recommendations' ? `Refresh Plan (${result.refreshRecommendations.length})` :
                   tab === 'evergreen' ? `Evergreen Score (${result.evergreenScores.length})` :
                   tab === 'competitors' ? `Competitor Shifts (${result.competitorShifts.length})` :
                   `Content Lifecycle (${result.contentLifecycle.length})`}
                </button>
              ))}
            </div>

            {/* Decay Curve Tab */}
            {activeTab === 'curve' && (
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-400 border-b border-zinc-700">
                        <th className="py-3 px-4">Week</th>
                        <th className="py-3 px-4">Engagement</th>
                        <th className="py-3 px-4">Impressions</th>
                        <th className="py-3 px-4">Clicks</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Visual</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.decayCurve.map((point, i) => (
                        <tr key={i} className="border-b border-zinc-800">
                          <td className="py-3 px-4 text-white font-medium">Week {point.week}</td>
                          <td className="py-3 px-4">
                            <span className={getScoreColor(point.engagementPercent)}>{point.engagementPercent}%</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={getScoreColor(point.impressionPercent)}>{point.impressionPercent}%</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={getScoreColor(point.clickPercent)}>{point.clickPercent}%</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-0.5 rounded text-xs ${
                              point.status === 'peak' ? 'bg-green-900/40 text-green-400' :
                              point.status === 'declining' ? 'bg-yellow-900/40 text-yellow-400' :
                              point.status === 'stale' ? 'bg-orange-900/40 text-orange-400' :
                              'bg-red-900/40 text-red-400'
                            }`}>{point.status}</span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="w-32 bg-zinc-700 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  point.engagementPercent >= 70 ? 'bg-green-500' :
                                  point.engagementPercent >= 40 ? 'bg-yellow-500' :
                                  point.engagementPercent >= 20 ? 'bg-orange-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${point.engagementPercent}%` }}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="bg-zinc-800/60 rounded-xl p-5 border border-zinc-700/50 mt-4">
                  <h3 className="text-sm font-semibold text-purple-400 mb-2">Decay Pattern Analysis</h3>
                  <p className="text-gray-300 text-sm">
                    Your {contentType.toLowerCase()} on {platform} shows a typical {result.halfLifeDays < 7 ? 'fast-decay' : result.halfLifeDays < 30 ? 'moderate-decay' : 'slow-decay'} pattern with a half-life of <span className="text-purple-400 font-medium">{result.halfLifeDays} days</span>. Content reaches 50% performance around week {Math.ceil(result.halfLifeDays / 7)} and enters the stale zone by week {Math.ceil(result.halfLifeDays * 2.5 / 7)}. {platform === 'Google Search' || platform === 'YouTube' ? 'Evergreen optimization can significantly extend this timeline.' : 'Regular refresh cycles are essential to maintain visibility on this platform.'}
                  </p>
                </div>
              </div>
            )}

            {/* Recommendations Tab */}
            {activeTab === 'recommendations' && (
              <div className="grid gap-4">
                {result.refreshRecommendations.map((rec, i) => (
                  <div key={i} className="bg-zinc-800/60 rounded-xl p-6 border border-zinc-700/50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          rec.priority <= 2 ? 'bg-red-900/60 text-red-400' :
                          rec.priority <= 3 ? 'bg-yellow-900/60 text-yellow-400' :
                          'bg-zinc-700 text-gray-400'
                        }`}>P{rec.priority}</span>
                        <h3 className="text-lg font-semibold text-white">{rec.action}</h3>
                      </div>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-purple-900/40 text-purple-400 text-xs rounded">{rec.effort}</span>
                        <span className="px-2 py-1 bg-blue-900/40 text-blue-400 text-xs rounded">{rec.deadline}</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{rec.reasoning}</p>
                    <div className="bg-zinc-900/50 rounded-lg p-3">
                      <span className="text-xs text-green-400 uppercase tracking-wider">Expected Lift</span>
                      <p className="text-green-300 text-sm mt-1 font-medium">{rec.expectedLift}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Evergreen Score Tab */}
            {activeTab === 'evergreen' && (
              <div className="space-y-4">
                <div className="bg-zinc-800/60 rounded-2xl p-6 border border-zinc-700/50 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-400 uppercase tracking-wider">Overall Evergreen Score</span>
                      <div className="text-3xl font-bold text-purple-400 mt-1">
                        {result.evergreenScores.reduce((sum, es) => sum + es.contribution, 0).toFixed(1)}/100
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-400">
                      Higher = more evergreen potential<br />
                      Lower = faster decay expected
                    </div>
                  </div>
                </div>
                {result.evergreenScores.map((es, i) => (
                  <div key={i} className="bg-zinc-800/60 rounded-xl p-5 border border-zinc-700/50">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-md font-semibold text-white">{es.factor}</h3>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-400">Weight: {(es.weight * 100).toFixed(0)}%</span>
                        <span className={`font-bold ${getScoreColor(es.score)}`}>{es.score}/100</span>
                        <span className="text-purple-400">Contrib: {es.contribution.toFixed(1)}</span>
                      </div>
                    </div>
                    <div className="w-full bg-zinc-700 rounded-full h-2.5 mb-3">
                      <div
                        className={`h-2.5 rounded-full ${
                          es.score >= 70 ? 'bg-green-500' : es.score >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${es.score}%` }}
                      />
                    </div>
                    <div className="bg-zinc-900/50 rounded-lg p-3">
                      <span className="text-xs text-cyan-400 uppercase tracking-wider">Improvement Tip</span>
                      <p className="text-gray-300 text-sm mt-1">{es.improvementTip}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Competitor Shifts Tab */}
            {activeTab === 'competitors' && (
              <div className="grid gap-4">
                {result.competitorShifts.map((cs, i) => (
                  <div key={i} className="bg-zinc-800/60 rounded-xl p-6 border border-zinc-700/50">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-white">{cs.competitor}</h3>
                      <span className={`px-2 py-1 rounded text-xs ${getUrgencyColor(cs.urgency)}`}>
                        {cs.urgency} Urgency
                      </span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-zinc-900/50 rounded-lg p-3">
                        <span className="text-xs text-red-400 uppercase tracking-wider">Their Action</span>
                        <p className="text-gray-300 text-sm mt-1">{cs.theirAction}</p>
                      </div>
                      <div className="bg-zinc-900/50 rounded-lg p-3">
                        <span className="text-xs text-yellow-400 uppercase tracking-wider">Impact on You</span>
                        <p className="text-gray-300 text-sm mt-1">{cs.impact}</p>
                      </div>
                      <div className="bg-zinc-900/50 rounded-lg p-3">
                        <span className="text-xs text-green-400 uppercase tracking-wider">Your Response</span>
                        <p className="text-gray-300 text-sm mt-1">{cs.yourResponse}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Content Lifecycle Tab */}
            {activeTab === 'lifecycle' && (
              <div className="space-y-4">
                {result.contentLifecycle.map((cl, i) => (
                  <div key={i} className={`bg-zinc-800/60 rounded-xl p-6 border ${
                    i === 0 ? 'border-green-700/50' : i <= 2 ? 'border-yellow-700/50' :
                    i <= 3 ? 'border-orange-700/50' : 'border-red-700/50'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          i === 0 ? 'bg-green-900/40 text-green-400' : i <= 2 ? 'bg-yellow-900/40 text-yellow-400' :
                          i <= 3 ? 'bg-orange-900/40 text-orange-400' : 'bg-red-900/40 text-red-400'
                        }`}>Phase {i + 1}</span>
                        <h3 className="text-lg font-semibold text-white">{cl.phase}</h3>
                      </div>
                      <span className="text-sm text-purple-400 font-medium">{cl.duration}</span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <span className="text-xs text-gray-500 uppercase tracking-wider">Characteristics</span>
                        <p className="text-gray-300 text-sm mt-1">{cl.characteristics}</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 uppercase tracking-wider">Recommended Actions</span>
                        <p className="text-gray-300 text-sm mt-1">{cl.actions}</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 uppercase tracking-wider">KPIs to Track</span>
                        <p className="text-gray-300 text-sm mt-1">{cl.kpis}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* How It Works Section */}
        <section className="mt-20">
          <h2 className="text-2xl font-bold mb-6">How Content Decay Tracking Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-zinc-800/40 rounded-2xl p-6 border border-zinc-700/30">
              <h3 className="font-semibold mb-2">1. Input Your Content</h3>
              <p className="text-gray-400 text-sm">Select content type, platform, age, and industry. Add a URL or description for contextual analysis.</p>
            </div>
            <div className="bg-zinc-800/40 rounded-2xl p-6 border border-zinc-700/30">
              <h3 className="font-semibold mb-2">2. View Decay Curve</h3>
              <p className="text-gray-400 text-sm">See exactly how engagement, impressions, and clicks decay week by week with color-coded status indicators.</p>
            </div>
            <div className="bg-zinc-800/40 rounded-2xl p-6 border border-zinc-700/30">
              <h3 className="font-semibold mb-2">3. Check Evergreen Score</h3>
              <p className="text-gray-400 text-sm">Understand which factors make your content age faster and get specific tips to improve longevity.</p>
            </div>
            <div className="bg-zinc-800/40 rounded-2xl p-6 border border-zinc-700/30">
              <h3 className="font-semibold mb-2">4. Execute Refresh Plan</h3>
              <p className="text-gray-400 text-sm">Follow prioritized recommendations with effort estimates, deadlines, and expected performance lifts.</p>
            </div>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-4">Why Content Decay Matters for Your Strategy</h2>
          <div className="prose prose-invert max-w-none">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-zinc-800/30 rounded-2xl p-6 border border-zinc-700/20">
                <h3 className="text-lg font-semibold text-purple-400 mb-3">The Hidden Cost of Stale Content</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Every piece of content you publish starts decaying the moment it goes live. On platforms like Twitter/X, the half-life can be as short as 18 minutes. Even long-form blog posts lose 50% of their organic traffic within 3-6 months without updates. The Content Decay Tracker helps you identify exactly when each piece needs attention, so you invest refresh effort where it delivers the highest ROI.
                </p>
              </div>
              <div className="bg-zinc-800/30 rounded-2xl p-6 border border-zinc-700/20">
                <h3 className="text-lg font-semibold text-blue-400 mb-3">Refresh Smarter, Not Harder</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Not all content needs a full rewrite. Sometimes updating a few statistics, refreshing a hero image, or adding a new section is enough to reset the decay clock. Our analysis breaks down exactly what type of refresh will give you the biggest lift with the least effort, complete with deadlines so nothing falls through the cracks.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
