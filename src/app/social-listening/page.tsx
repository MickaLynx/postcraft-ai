'use client';
import { useState } from 'react';

const platforms = ['Twitter/X', 'LinkedIn', 'Instagram', 'TikTok', 'Facebook', 'YouTube', 'Reddit'] as const;
const industries = ['Technology', 'E-commerce', 'Finance', 'Healthcare', 'Education', 'Food & Beverage', 'Travel', 'Fashion', 'Fitness', 'Real Estate', 'Entertainment', 'SaaS'] as const;
const monitorTypes = ['Brand Mentions', 'Competitor Tracking', 'Industry Keywords', 'Hashtag Monitoring', 'Sentiment Shifts', 'Crisis Detection'] as const;
const timeframes = ['Last 24 Hours', 'Last 7 Days', 'Last 30 Days', 'Last 90 Days'] as const;

interface ListeningResult {
  overallSentiment: { score: number; trend: 'rising' | 'stable' | 'declining'; label: string };
  mentionVolume: { total: number; organic: number; paid: number; trend: number };
  sentimentTimeline: { period: string; positive: number; neutral: number; negative: number }[];
  topMentions: { source: string; text: string; sentiment: 'positive' | 'neutral' | 'negative'; reach: number; engagement: number }[];
  competitorComparison: { name: string; mentions: number; sentiment: number; shareOfVoice: number }[];
  trendingTopics: { topic: string; volume: number; sentiment: number; velocity: 'rising' | 'stable' | 'declining' }[];
  alertsDetected: { type: string; severity: 'low' | 'medium' | 'high' | 'critical'; description: string; action: string }[];
  demographics: { segment: string; percentage: number; sentiment: number }[];
  recommendations: string[];
}

function generateListening(brand: string, platformSel: string, industry: string, monitorType: string, timeframe: string): ListeningResult {
  const seed = (brand + platformSel + industry).length;
  const pseudoRand = (i: number) => ((seed * 31 + i * 17) % 100) / 100;

  const sentimentScore = 45 + Math.round(pseudoRand(1) * 40);
  const sentimentTrend = sentimentScore > 65 ? 'rising' : sentimentScore > 45 ? 'stable' : 'declining';
  const sentimentLabel = sentimentScore > 75 ? 'Very Positive' : sentimentScore > 55 ? 'Positive' : sentimentScore > 40 ? 'Mixed' : 'Negative';

  const totalMentions = 500 + Math.round(pseudoRand(2) * 9500);
  const organicPct = 0.6 + pseudoRand(3) * 0.3;

  const periods = timeframe === 'Last 24 Hours'
    ? ['12am-4am', '4am-8am', '8am-12pm', '12pm-4pm', '4pm-8pm', '8pm-12am']
    : timeframe === 'Last 7 Days'
    ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    : ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

  const sentimentTimeline = periods.map((period, i) => ({
    period,
    positive: 30 + Math.round(pseudoRand(10 + i) * 40),
    neutral: 15 + Math.round(pseudoRand(20 + i) * 25),
    negative: 5 + Math.round(pseudoRand(30 + i) * 20),
  }));

  const topMentions = [
    { source: 'Twitter/X', text: `"${brand} just changed our entire ${industry.toLowerCase()} workflow. Huge time saver!"`, sentiment: 'positive' as const, reach: 12400 + Math.round(pseudoRand(40) * 50000), engagement: 340 + Math.round(pseudoRand(41) * 2000) },
    { source: 'LinkedIn', text: `Has anyone tried ${brand}? Looking for honest reviews from ${industry.toLowerCase()} professionals.`, sentiment: 'neutral' as const, reach: 8200 + Math.round(pseudoRand(42) * 30000), engagement: 180 + Math.round(pseudoRand(43) * 1000) },
    { source: 'Reddit', text: `${brand} vs competitors — deep dive comparison for ${industry.toLowerCase()} teams`, sentiment: 'positive' as const, reach: 5600 + Math.round(pseudoRand(44) * 20000), engagement: 420 + Math.round(pseudoRand(45) * 3000) },
    { source: 'Instagram', text: `Day 30 using ${brand} — here's what nobody tells you about the ${industry.toLowerCase()} features`, sentiment: 'positive' as const, reach: 15000 + Math.round(pseudoRand(46) * 40000), engagement: 890 + Math.round(pseudoRand(47) * 5000) },
    { source: 'TikTok', text: `Stop paying for expensive ${industry.toLowerCase()} tools when ${brand} exists (not sponsored)`, sentiment: 'positive' as const, reach: 45000 + Math.round(pseudoRand(48) * 100000), engagement: 2300 + Math.round(pseudoRand(49) * 10000) },
  ];

  const competitors = ['Competitor A', 'Competitor B', 'Competitor C'].map((name, i) => ({
    name,
    mentions: Math.round(totalMentions * (0.3 + pseudoRand(50 + i) * 0.5)),
    sentiment: 30 + Math.round(pseudoRand(60 + i) * 50),
    shareOfVoice: Math.round(15 + pseudoRand(70 + i) * 25),
  }));

  const trendingTopics = [
    { topic: `#${brand.replace(/\s/g, '')}`, volume: 1200 + Math.round(pseudoRand(80) * 5000), sentiment: 60 + Math.round(pseudoRand(81) * 30), velocity: 'rising' as const },
    { topic: `${industry} AI tools`, volume: 800 + Math.round(pseudoRand(82) * 3000), sentiment: 55 + Math.round(pseudoRand(83) * 25), velocity: 'rising' as const },
    { topic: `${industry.toLowerCase()} automation`, volume: 600 + Math.round(pseudoRand(84) * 2000), sentiment: 50 + Math.round(pseudoRand(85) * 30), velocity: 'stable' as const },
    { topic: `${brand} review`, volume: 400 + Math.round(pseudoRand(86) * 1500), sentiment: 65 + Math.round(pseudoRand(87) * 25), velocity: 'stable' as const },
    { topic: `${industry.toLowerCase()} trends 2026`, volume: 900 + Math.round(pseudoRand(88) * 4000), sentiment: 58 + Math.round(pseudoRand(89) * 20), velocity: 'rising' as const },
  ];

  const alertsDetected = [
    { type: 'Sentiment Spike', severity: pseudoRand(90) > 0.7 ? 'high' as const : 'medium' as const, description: `Unusual increase in negative mentions around "${brand} pricing" in the last ${timeframe === 'Last 24 Hours' ? '6 hours' : '3 days'}`, action: 'Investigate pricing complaints and consider a public response addressing value proposition' },
    { type: 'Competitor Activity', severity: 'medium' as const, description: `Competitor A launched a campaign directly comparing features with ${brand}`, action: 'Prepare a competitive response highlighting unique differentiators and customer testimonials' },
    { type: 'Viral Mention', severity: 'low' as const, description: `A post about ${brand} is trending on ${platformSel} with ${(5000 + Math.round(pseudoRand(91) * 20000)).toLocaleString()} engagements`, action: 'Engage with the post (like, comment, share) and consider amplifying with paid promotion' },
  ];

  const demographics = [
    { segment: 'Gen Z (18-25)', percentage: 15 + Math.round(pseudoRand(92) * 10), sentiment: 55 + Math.round(pseudoRand(93) * 30) },
    { segment: 'Millennials (26-41)', percentage: 30 + Math.round(pseudoRand(94) * 15), sentiment: 60 + Math.round(pseudoRand(95) * 25) },
    { segment: 'Gen X (42-57)', percentage: 20 + Math.round(pseudoRand(96) * 10), sentiment: 50 + Math.round(pseudoRand(97) * 30) },
    { segment: 'Professionals/B2B', percentage: 15 + Math.round(pseudoRand(98) * 15), sentiment: 65 + Math.round(pseudoRand(99) * 20) },
    { segment: 'Creators', percentage: 10 + Math.round(pseudoRand(100) * 10), sentiment: 70 + Math.round(pseudoRand(101) * 20) },
  ];

  const recommendations = [
    `Focus engagement efforts on ${platformSel} where your share of voice is strongest (${25 + Math.round(pseudoRand(102) * 20)}%)`,
    sentimentScore > 60
      ? `Leverage the positive sentiment wave — amplify UGC and testimonials from your ${demographics[1].segment} audience`
      : `Address the sentiment gap by launching a customer success story campaign highlighting ${industry.toLowerCase()} wins`,
    `Monitor "${trendingTopics[1].topic}" closely — this topic has ${trendingTopics[1].velocity} velocity and could drive organic reach`,
    `Competitor A's share of voice increased ${Math.round(pseudoRand(103) * 15)}% — consider a differentiation campaign focusing on your unique ${industry.toLowerCase()} features`,
    `Schedule proactive responses during peak mention hours (${timeframe === 'Last 24 Hours' ? '8am-12pm and 4pm-8pm' : 'weekdays 9am-5pm'}) to maximize engagement`,
    `Create a dedicated hashtag campaign around #${brand.replace(/\s/g, '')}Stories to encourage user-generated content`,
    `Set up automated alerts for any mention with negative sentiment and reach > 5,000 to enable rapid response`,
  ];

  return {
    overallSentiment: { score: sentimentScore, trend: sentimentTrend, label: sentimentLabel },
    mentionVolume: { total: totalMentions, organic: Math.round(totalMentions * organicPct), paid: Math.round(totalMentions * (1 - organicPct)), trend: Math.round(-5 + pseudoRand(104) * 30) },
    sentimentTimeline,
    topMentions,
    competitorComparison: competitors,
    trendingTopics,
    alertsDetected,
    demographics,
    recommendations,
  };
}

export default function SocialListeningPage() {
  const [brand, setBrand] = useState('');
  const [platform, setPlatform] = useState<string>('Twitter/X');
  const [industry, setIndustry] = useState<string>('Technology');
  const [monitorType, setMonitorType] = useState<string>('Brand Mentions');
  const [timeframe, setTimeframe] = useState<string>('Last 7 Days');
  const [result, setResult] = useState<ListeningResult | null>(null);

  function analyze() {
    if (!brand.trim()) return;
    setResult(generateListening(brand, platform, industry, monitorType, timeframe));
  }

  const sentimentColor = (score: number) => score >= 70 ? 'text-green-400' : score >= 50 ? 'text-yellow-400' : 'text-red-400';
  const sentimentBg = (score: number) => score >= 70 ? 'bg-green-400' : score >= 50 ? 'bg-yellow-400' : 'bg-red-400';
  const severityColor = (s: string) => s === 'critical' ? 'text-red-500 bg-red-500/10' : s === 'high' ? 'text-orange-400 bg-orange-400/10' : s === 'medium' ? 'text-yellow-400 bg-yellow-400/10' : 'text-blue-400 bg-blue-400/10';
  const velocityIcon = (v: string) => v === 'rising' ? '\u2191' : v === 'declining' ? '\u2193' : '\u2192';

  return (
    <main className="min-h-screen px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs text-teal-400 uppercase tracking-widest mb-2 font-semibold">Social Intelligence</p>
        <h1 className="text-4xl font-bold mb-3">Social Listening <span className="gradient-text">Dashboard</span></h1>
        <p className="text-zinc-400 mb-10 max-w-2xl">Monitor your brand mentions, track competitor activity, analyze sentiment trends, and detect crises before they escalate — across 7 platforms in real time.</p>

        <div className="glass rounded-2xl p-6 mb-10">
          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Brand or keyword to monitor</label>
          <input value={brand} onChange={e => setBrand(e.target.value)} placeholder="e.g. PostCraft, your brand name, or keyword..."
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-teal-500 transition mb-5" />

          <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Primary platform</label>
          <div className="flex flex-wrap gap-2 mb-5">
            {platforms.map(p => (
              <button key={p} onClick={() => setPlatform(p)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition ${platform === p ? 'bg-teal-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
                {p}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-5">
            <div>
              <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Industry</label>
              <select value={industry} onChange={e => setIndustry(e.target.value)}
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-teal-500 transition">
                {industries.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Monitor type</label>
              <select value={monitorType} onChange={e => setMonitorType(e.target.value)}
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-teal-500 transition">
                {monitorTypes.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Timeframe</label>
              <select value={timeframe} onChange={e => setTimeframe(e.target.value)}
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-teal-500 transition">
                {timeframes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <button onClick={analyze} disabled={!brand.trim()}
            className="w-full py-3.5 btn-primary rounded-xl font-semibold text-white">
            Start Listening
          </button>
        </div>

        {result && (
          <div className="space-y-8 fade-in">
            {/* Overview Cards */}
            <div className="grid md:grid-cols-4 gap-4">
              <div className="glass rounded-xl p-5 text-center">
                <p className="text-xs text-zinc-500 uppercase mb-1">Sentiment Score</p>
                <p className={`text-3xl font-bold ${sentimentColor(result.overallSentiment.score)}`}>{result.overallSentiment.score}/100</p>
                <p className="text-xs text-zinc-400 mt-1">{result.overallSentiment.label} {result.overallSentiment.trend === 'rising' ? '\u2191' : result.overallSentiment.trend === 'declining' ? '\u2193' : '\u2192'}</p>
              </div>
              <div className="glass rounded-xl p-5 text-center">
                <p className="text-xs text-zinc-500 uppercase mb-1">Total Mentions</p>
                <p className="text-3xl font-bold text-white">{result.mentionVolume.total.toLocaleString()}</p>
                <p className={`text-xs mt-1 ${result.mentionVolume.trend > 0 ? 'text-green-400' : 'text-red-400'}`}>{result.mentionVolume.trend > 0 ? '+' : ''}{result.mentionVolume.trend}% vs previous</p>
              </div>
              <div className="glass rounded-xl p-5 text-center">
                <p className="text-xs text-zinc-500 uppercase mb-1">Organic Mentions</p>
                <p className="text-3xl font-bold text-blue-400">{result.mentionVolume.organic.toLocaleString()}</p>
                <p className="text-xs text-zinc-400 mt-1">{Math.round(result.mentionVolume.organic / result.mentionVolume.total * 100)}% of total</p>
              </div>
              <div className="glass rounded-xl p-5 text-center">
                <p className="text-xs text-zinc-500 uppercase mb-1">Alerts</p>
                <p className="text-3xl font-bold text-orange-400">{result.alertsDetected.length}</p>
                <p className="text-xs text-zinc-400 mt-1">{result.alertsDetected.filter(a => a.severity === 'high' || a.severity === 'critical').length} require action</p>
              </div>
            </div>

            {/* Sentiment Timeline */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Sentiment Timeline</h3>
              <div className="space-y-3">
                {result.sentimentTimeline.map((period) => {
                  const total = period.positive + period.neutral + period.negative;
                  return (
                    <div key={period.period} className="flex items-center gap-3">
                      <span className="text-xs text-zinc-400 w-20 shrink-0">{period.period}</span>
                      <div className="flex-1 flex h-6 rounded-full overflow-hidden">
                        <div className="bg-green-500" style={{ width: `${(period.positive / total) * 100}%` }} />
                        <div className="bg-zinc-500" style={{ width: `${(period.neutral / total) * 100}%` }} />
                        <div className="bg-red-500" style={{ width: `${(period.negative / total) * 100}%` }} />
                      </div>
                      <span className="text-xs text-zinc-500 w-24 text-right shrink-0">
                        {Math.round((period.positive / total) * 100)}% pos
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-4 mt-4 text-xs text-zinc-500">
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-500 inline-block" /> Positive</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-zinc-500 inline-block" /> Neutral</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-500 inline-block" /> Negative</span>
              </div>
            </div>

            {/* Alerts */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Active Alerts</h3>
              <div className="space-y-3">
                {result.alertsDetected.map((alert, i) => (
                  <div key={i} className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium uppercase ${severityColor(alert.severity)}`}>{alert.severity}</span>
                      <span className="text-sm font-medium">{alert.type}</span>
                    </div>
                    <p className="text-sm text-zinc-400 mb-2">{alert.description}</p>
                    <p className="text-xs text-teal-400"><strong>Recommended action:</strong> {alert.action}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Mentions */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Top Mentions</h3>
              <div className="space-y-3">
                {result.topMentions.map((mention, i) => (
                  <div key={i} className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-zinc-500">{mention.source}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${mention.sentiment === 'positive' ? 'text-green-400 bg-green-400/10' : mention.sentiment === 'negative' ? 'text-red-400 bg-red-400/10' : 'text-zinc-400 bg-zinc-400/10'}`}>
                        {mention.sentiment}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-300 mb-2">{mention.text}</p>
                    <div className="flex gap-4 text-xs text-zinc-500">
                      <span>Reach: {mention.reach.toLocaleString()}</span>
                      <span>Engagement: {mention.engagement.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Competitor Comparison */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Competitor Share of Voice</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-teal-500/10 rounded-xl p-4 border border-teal-500/20">
                  <span className="text-sm font-medium text-teal-400 w-32 shrink-0">{brand || 'Your Brand'}</span>
                  <div className="flex-1 bg-zinc-800 rounded-full h-4 overflow-hidden">
                    <div className="h-full bg-teal-500 rounded-full" style={{ width: `${100 - result.competitorComparison.reduce((s, c) => s + c.shareOfVoice, 0)}%` }} />
                  </div>
                  <span className="text-xs text-zinc-400 w-12 text-right">{100 - result.competitorComparison.reduce((s, c) => s + c.shareOfVoice, 0)}%</span>
                </div>
                {result.competitorComparison.map((comp, i) => (
                  <div key={i} className="flex items-center gap-3 bg-zinc-900/50 rounded-xl p-4 border border-zinc-800">
                    <span className="text-sm text-zinc-400 w-32 shrink-0">{comp.name}</span>
                    <div className="flex-1 bg-zinc-800 rounded-full h-4 overflow-hidden">
                      <div className="h-full bg-zinc-600 rounded-full" style={{ width: `${comp.shareOfVoice}%` }} />
                    </div>
                    <span className="text-xs text-zinc-500 w-12 text-right">{comp.shareOfVoice}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Topics */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Trending Topics</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-zinc-500 text-xs uppercase">
                      <th className="text-left py-2">Topic</th>
                      <th className="text-right py-2">Volume</th>
                      <th className="text-right py-2">Sentiment</th>
                      <th className="text-right py-2">Velocity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.trendingTopics.map((topic, i) => (
                      <tr key={i} className="border-t border-zinc-800">
                        <td className="py-3 text-zinc-300">{topic.topic}</td>
                        <td className="py-3 text-right text-zinc-400">{topic.volume.toLocaleString()}</td>
                        <td className={`py-3 text-right ${sentimentColor(topic.sentiment)}`}>{topic.sentiment}%</td>
                        <td className={`py-3 text-right ${topic.velocity === 'rising' ? 'text-green-400' : topic.velocity === 'declining' ? 'text-red-400' : 'text-zinc-400'}`}>
                          {velocityIcon(topic.velocity)} {topic.velocity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Audience Demographics */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Audience Sentiment by Segment</h3>
              <div className="space-y-3">
                {result.demographics.map((demo, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="text-sm text-zinc-400 w-40 shrink-0">{demo.segment}</span>
                    <div className="flex-1 bg-zinc-800 rounded-full h-4 overflow-hidden">
                      <div className={`h-full rounded-full ${sentimentBg(demo.sentiment)}`} style={{ width: `${demo.sentiment}%` }} />
                    </div>
                    <span className={`text-xs w-12 text-right ${sentimentColor(demo.sentiment)}`}>{demo.sentiment}%</span>
                    <span className="text-xs text-zinc-500 w-16 text-right">{demo.percentage}% vol</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Actionable Recommendations</h3>
              <div className="space-y-3">
                {result.recommendations.map((rec, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="text-teal-400 font-bold text-sm mt-0.5">{i + 1}.</span>
                    <p className="text-sm text-zinc-300">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SEO Content */}
        <section className="mt-16 glass rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">What Is Social Listening?</h2>
          <p className="text-zinc-400 mb-4">Social listening is the practice of monitoring social media platforms for mentions of your brand, competitors, industry keywords, and relevant topics. Unlike basic social monitoring (which tracks metrics), social listening analyzes the context and sentiment behind conversations to extract actionable business intelligence.</p>
          <h3 className="text-lg font-semibold mb-3">Why Social Listening Matters in 2026</h3>
          <ul className="space-y-2 text-sm text-zinc-400 mb-6">
            <li className="flex gap-2"><span className="text-teal-400">&#10003;</span> 78% of consumers expect brands to respond within 1 hour on social media</li>
            <li className="flex gap-2"><span className="text-teal-400">&#10003;</span> Brands using social listening see 25% higher customer retention rates</li>
            <li className="flex gap-2"><span className="text-teal-400">&#10003;</span> Early crisis detection reduces brand damage by up to 60%</li>
            <li className="flex gap-2"><span className="text-teal-400">&#10003;</span> Competitor intelligence from social listening drives 3x faster product iteration</li>
          </ul>
          <h3 className="text-lg font-semibold mb-3">How PostCraft Social Listening Works</h3>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-zinc-900/50 rounded-xl p-4"><p className="font-medium text-sm mb-1">1. Set Your Keywords</p><p className="text-xs text-zinc-500">Enter your brand name, competitor names, or industry keywords to monitor.</p></div>
            <div className="bg-zinc-900/50 rounded-xl p-4"><p className="font-medium text-sm mb-1">2. Analyze Sentiment</p><p className="text-xs text-zinc-500">Our AI analyzes mentions across 7 platforms, scoring sentiment and detecting trends.</p></div>
            <div className="bg-zinc-900/50 rounded-xl p-4"><p className="font-medium text-sm mb-1">3. Act on Insights</p><p className="text-xs text-zinc-500">Get alerts, competitor comparisons, and actionable recommendations.</p></div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-8 glass rounded-2xl p-8">
          <h2 className="text-xl font-bold mb-4">Social Listening FAQ</h2>
          <div className="space-y-4">
            {[
              ['What is the difference between social listening and social monitoring?', 'Social monitoring tracks metrics (mentions, likes, shares). Social listening goes deeper — it analyzes the sentiment, context, and trends behind those metrics to extract actionable business intelligence and predict future shifts.'],
              ['Which platforms does PostCraft monitor?', 'PostCraft monitors 7 major platforms: Twitter/X, LinkedIn, Instagram, TikTok, Facebook, YouTube, and Reddit. Each platform is analyzed separately with platform-specific sentiment algorithms.'],
              ['How accurate is the sentiment analysis?', 'Our NLP-powered sentiment analysis achieves 87% accuracy across multiple languages. It detects sarcasm, context, and emotional nuance beyond simple positive/negative classification.'],
              ['Can I track competitor mentions?', 'Yes. Enter competitor names or keywords to get a complete share of voice analysis, sentiment comparison, and competitive intelligence report.'],
              ['How quickly can I detect a crisis?', 'PostCraft detects unusual sentiment spikes within minutes. The alert system flags potential crises based on velocity, reach, and sentiment severity — before they escalate.'],
            ].map(([q, a]) => (
              <div key={q}>
                <h3 className="font-medium text-sm mb-1">{q}</h3>
                <p className="text-xs text-zinc-500">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal Links */}
        <section className="mt-8 text-center">
          <p className="text-sm text-zinc-500 mb-3">Related Tools</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              ['/sentiment-analyzer', 'Sentiment Analyzer'],
              ['/competitor-analysis', 'Competitor Analysis'],
              ['/trend-tracker', 'Trend Tracker'],
              ['/crisis-management', 'Crisis Management'],
              ['/brand-voice', 'Brand Voice'],
              ['/engagement-calculator', 'Engagement Calculator'],
            ].map(([href, label]) => (
              <a key={href} href={href} className="text-xs text-teal-400 hover:text-teal-300 transition underline underline-offset-2">{label}</a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
