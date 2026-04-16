'use client';
import { useState } from 'react';

const platforms = ['Instagram', 'TikTok', 'LinkedIn', 'Twitter/X', 'YouTube', 'Facebook', 'Pinterest', 'Threads'] as const;
const businessGoals = ['Brand Awareness', 'Lead Generation', 'Sales/Revenue', 'Community Building', 'Customer Support', 'Thought Leadership'] as const;
const reportPeriods = ['Weekly', 'Monthly', 'Quarterly', 'Annual'] as const;
const audienceSizes = ['Under 1K', '1K-10K', '10K-50K', '50K-100K', '100K+'] as const;

interface KPIResult {
  primaryKPIs: { kpi: string; formula: string; benchmark: string; priority: string; why: string }[];
  secondaryKPIs: { kpi: string; formula: string; benchmark: string }[];
  dashboardLayout: { section: string; metrics: string[]; visualization: string }[];
  reportTemplate: { section: string; content: string }[];
  alertRules: { metric: string; condition: string; action: string }[];
  benchmarksByPlatform: { platform: string; engagementRate: string; ctr: string; bestPostTime: string }[];
  weeklyChecklist: string[];
  toolStack: { tool: string; purpose: string; cost: string }[];
}

function generateKPIDashboard(selectedPlatforms: string[], goal: string, period: string, audience: string): KPIResult {
  const isSmall = audience.includes('Under') || audience === '1K-10K';

  const goalKPIs: Record<string, { kpi: string; formula: string; benchmark: string; priority: string; why: string }[]> = {
    'Brand Awareness': [
      { kpi: 'Reach Growth Rate', formula: '(This period reach - Last period reach) / Last period reach x 100', benchmark: '> 5% MoM growth', priority: 'P0', why: 'Direct measure of brand visibility expansion' },
      { kpi: 'Share of Voice', formula: 'Your brand mentions / Total industry mentions x 100', benchmark: '> 10% in your niche', priority: 'P0', why: 'Contextualizes reach against competitors' },
      { kpi: 'Impressions per Post', formula: 'Total impressions / Number of posts', benchmark: `> ${isSmall ? '2x' : '5x'} follower count`, priority: 'P1', why: 'Measures content amplification beyond followers' },
      { kpi: 'Follower Growth Rate', formula: 'New followers / Total followers x 100', benchmark: `> ${isSmall ? '5%' : '2%'}/month`, priority: 'P1', why: 'Sustainable audience building indicator' },
      { kpi: 'Brand Mention Sentiment', formula: 'Positive mentions / Total mentions x 100', benchmark: '> 70% positive', priority: 'P2', why: 'Quality of awareness matters as much as quantity' },
    ],
    'Lead Generation': [
      { kpi: 'Click-Through Rate (CTR)', formula: 'Clicks / Impressions x 100', benchmark: '> 2% average, > 5% for targeted content', priority: 'P0', why: 'Direct measure of content-to-interest conversion' },
      { kpi: 'Cost Per Lead (CPL)', formula: 'Total ad spend / Number of leads', benchmark: `< $${isSmall ? '15' : '50'} per lead`, priority: 'P0', why: 'Efficiency of social as a lead channel' },
      { kpi: 'Lead Conversion Rate', formula: 'Leads from social / Total social visitors x 100', benchmark: '> 3%', priority: 'P0', why: 'Quality of traffic from social' },
      { kpi: 'Content Save Rate', formula: 'Saves / Impressions x 100', benchmark: '> 2%', priority: 'P1', why: 'Saves indicate high purchase/action intent' },
      { kpi: 'DM Inquiry Rate', formula: 'DM inquiries / Profile visits x 100', benchmark: '> 1%', priority: 'P1', why: 'High-intent engagement metric' },
    ],
    'Sales/Revenue': [
      { kpi: 'Revenue Per Post', formula: 'Attributed revenue / Number of posts', benchmark: `> $${isSmall ? '10' : '100'}/post`, priority: 'P0', why: 'Direct ROI measurement per content piece' },
      { kpi: 'Social Attribution Revenue', formula: 'Revenue from social-referred customers', benchmark: '> 15% of total revenue', priority: 'P0', why: 'Justifies social media investment' },
      { kpi: 'ROAS (Return on Ad Spend)', formula: 'Revenue from ads / Ad spend', benchmark: '> 4x for e-commerce, > 2x for SaaS', priority: 'P0', why: 'Profitability of paid social' },
      { kpi: 'Average Order Value from Social', formula: 'Total social revenue / Social orders', benchmark: 'On par or above site average', priority: 'P1', why: 'Measures quality of social-driven customers' },
      { kpi: 'Customer Acquisition Cost (Social)', formula: 'Social spend / New customers from social', benchmark: `< $${isSmall ? '30' : '100'}`, priority: 'P1', why: 'Efficiency vs other channels' },
    ],
    'Community Building': [
      { kpi: 'Engagement Rate by Reach', formula: '(Likes + Comments + Shares + Saves) / Reach x 100', benchmark: `> ${isSmall ? '8%' : '4%'}`, priority: 'P0', why: 'True engagement beyond follower vanity metrics' },
      { kpi: 'Comment-to-Like Ratio', formula: 'Comments / Likes x 100', benchmark: '> 5% (higher = deeper engagement)', priority: 'P0', why: 'Comments indicate genuine community interaction' },
      { kpi: 'UGC Volume', formula: 'User-created posts mentioning brand', benchmark: `> ${isSmall ? '5' : '50'}/month`, priority: 'P1', why: 'Community members creating content = strongest signal' },
      { kpi: 'Response Rate', formula: 'Responded comments / Total comments x 100', benchmark: '> 80% within 2 hours', priority: 'P1', why: 'Active community management builds loyalty' },
      { kpi: 'Community Growth via Referral', formula: 'New members from member referrals / Total new members', benchmark: '> 20%', priority: 'P2', why: 'Organic community expansion = healthy community' },
    ],
    'Customer Support': [
      { kpi: 'Average Response Time', formula: 'Sum of response times / Number of inquiries', benchmark: '< 1 hour during business hours', priority: 'P0', why: 'Speed = satisfaction in social support' },
      { kpi: 'Resolution Rate', formula: 'Resolved inquiries / Total inquiries x 100', benchmark: '> 85%', priority: 'P0', why: 'Effectiveness of social as support channel' },
      { kpi: 'CSAT from Social', formula: 'Satisfied ratings / Total ratings x 100', benchmark: '> 4.2/5', priority: 'P0', why: 'Customer satisfaction with social support' },
      { kpi: 'Deflection Rate', formula: 'Issues resolved via self-service / Total issues', benchmark: '> 30%', priority: 'P1', why: 'Efficiency through proactive content' },
      { kpi: 'Negative Mention Trend', formula: 'Negative mentions this period vs last', benchmark: 'Declining MoM', priority: 'P1', why: 'Leading indicator of product/service issues' },
    ],
    'Thought Leadership': [
      { kpi: 'Content Save Rate', formula: 'Saves / Impressions x 100', benchmark: '> 3%', priority: 'P0', why: 'Saves = "I want to reference this later" = authority signal' },
      { kpi: 'Profile Visit Rate', formula: 'Profile visits / Impressions x 100', benchmark: '> 1%', priority: 'P0', why: 'People want to know more about the author' },
      { kpi: 'Repost/Share Rate', formula: 'Shares / Impressions x 100', benchmark: '> 2%', priority: 'P0', why: 'Sharing = endorsement of your expertise' },
      { kpi: 'Mention by Industry Peers', formula: 'Mentions by accounts with > 10K followers', benchmark: `> ${isSmall ? '2' : '10'}/month`, priority: 'P1', why: 'Peer validation = highest credibility' },
      { kpi: 'Newsletter Signup from Social', formula: 'Signups / Link clicks x 100', benchmark: '> 10%', priority: 'P1', why: 'Converting attention to owned audience' },
    ],
  };

  const primaryKPIs = goalKPIs[goal] || goalKPIs['Brand Awareness'];

  return {
    primaryKPIs,
    secondaryKPIs: [
      { kpi: 'Post Frequency', formula: 'Posts published per week', benchmark: '3-7x/week (platform dependent)' },
      { kpi: 'Best Performing Content Type', formula: 'Engagement by format (video, image, text, carousel)', benchmark: 'Track to double down on winners' },
      { kpi: 'Audience Demographics Shift', formula: 'Age/location/interest changes MoM', benchmark: 'Align with target persona' },
      { kpi: 'Hashtag Performance', formula: 'Reach per hashtag used', benchmark: 'Top 5 hashtags driving 80% of discovery' },
      { kpi: 'Story/Reel Completion Rate', formula: 'Completions / Total views x 100', benchmark: '> 70% for stories, > 50% for reels' },
    ],
    dashboardLayout: [
      { section: 'Top Row — Key Numbers', metrics: ['Total Reach', 'Engagement Rate', 'CTR', 'Followers Change'], visualization: '4 large number cards with trend arrows (green/red)' },
      { section: 'Mid Row — Trends', metrics: ['Engagement over time (line chart)', 'Reach over time (area chart)'], visualization: '2 line/area charts side by side, 30/90 day toggle' },
      { section: 'Content Performance', metrics: ['Top 5 posts by engagement', 'Content type breakdown', 'Best posting times heatmap'], visualization: 'Table + donut chart + heatmap grid' },
      { section: 'Platform Breakdown', metrics: ['Per-platform engagement rates', 'Per-platform follower growth', 'Cross-platform content performance'], visualization: 'Grouped bar chart + comparison table' },
      { section: 'Competitive', metrics: ['Share of Voice', 'Competitor engagement comparison', 'Industry benchmark vs your performance'], visualization: 'Radar chart + benchmark bar chart' },
      { section: 'Action Items', metrics: ['Low-performing content to optimize', 'High-performing content to amplify', 'Emerging trends to capitalize on'], visualization: 'Prioritized list with severity tags' },
    ],
    reportTemplate: [
      { section: 'Executive Summary', content: `${period} performance: [total reach], [engagement rate], [top achievement]. Key insight: [one sentence].` },
      { section: 'KPI Scorecard', content: 'Table with each KPI, target, actual, status (green/yellow/red), trend arrow.' },
      { section: 'Top Content', content: 'Top 3 posts with screenshots, engagement data, and why they worked.' },
      { section: 'Platform Analysis', content: 'Per-platform breakdown with specific insights and recommendations.' },
      { section: 'Competitive Landscape', content: 'Share of voice changes, competitor moves, opportunities identified.' },
      { section: 'Recommendations', content: '3-5 actionable items for next period, prioritized by expected impact.' },
      { section: 'Forecast', content: 'Projected KPIs for next period based on current trajectory.' },
    ],
    alertRules: [
      { metric: 'Engagement Rate', condition: 'Drops below 50% of 30-day average', action: 'Review last 5 posts for content quality issues' },
      { metric: 'Follower Count', condition: 'Drops by > 2% in a single day', action: 'Check for bot purge, controversial post, or algorithm change' },
      { metric: 'Negative Mentions', condition: 'Spike > 3x daily average', action: 'Activate crisis management protocol — check for PR issue' },
      { metric: 'CTR', condition: 'Below 1% for 7 consecutive days', action: 'A/B test new CTA styles and post formats' },
      { metric: 'Response Time', condition: 'Average exceeds 2 hours', action: 'Review staffing or chatbot coverage gaps' },
    ],
    benchmarksByPlatform: [
      { platform: 'Instagram', engagementRate: '3-6% (small), 1-3% (large)', ctr: '0.5-1.5%', bestPostTime: 'Tue-Thu 11am-1pm, 7-9pm' },
      { platform: 'TikTok', engagementRate: '8-15% (FYP dependent)', ctr: '1-3%', bestPostTime: '7-9am, 12-3pm, 7-11pm' },
      { platform: 'LinkedIn', engagementRate: '2-5%', ctr: '2-5% (highest B2B CTR)', bestPostTime: 'Tue-Thu 8-10am business hours' },
      { platform: 'Twitter/X', engagementRate: '0.5-2%', ctr: '0.5-1.5%', bestPostTime: 'Mon-Fri 8-10am, 12-1pm' },
      { platform: 'YouTube', engagementRate: '1-5% (likes+comments/views)', ctr: '2-10% (thumbnail CTR)', bestPostTime: 'Thu-Sat 2-4pm' },
      { platform: 'Facebook', engagementRate: '0.5-2%', ctr: '0.5-1.5%', bestPostTime: 'Wed-Fri 1-4pm' },
    ],
    weeklyChecklist: [
      'Review top 3 performing posts — what made them work?',
      'Check engagement rate trend — up or down vs last week?',
      'Respond to all unanswered comments/DMs',
      'Review competitor activity — any notable content or campaigns?',
      'Plan next week content based on this week performance data',
      'Update content calendar with trending topics/formats',
      'Check follower growth — organic vs paid breakdown',
      'Export analytics snapshot for monthly report compilation',
    ],
    toolStack: [
      { tool: 'PostCraft', purpose: 'Content generation + optimization', cost: 'Free' },
      { tool: 'Metricool', purpose: 'Cross-platform analytics + scheduling', cost: '$20/mo' },
      { tool: 'Sprout Social', purpose: 'Enterprise analytics + listening', cost: '$249/mo' },
      { tool: 'Google Looker Studio', purpose: 'Custom dashboard visualization', cost: 'Free' },
      { tool: 'Notion', purpose: 'Content calendar + report templates', cost: 'Free-$10/mo' },
      { tool: 'Brandwatch', purpose: 'Social listening + competitive intelligence', cost: 'Custom pricing' },
    ],
  };
}

export default function KPIDashboardPage() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['Instagram', 'TikTok']);
  const [goal, setGoal] = useState<string>(businessGoals[0]);
  const [period, setPeriod] = useState<string>(reportPeriods[1]);
  const [audience, setAudience] = useState<string>(audienceSizes[1]);
  const [result, setResult] = useState<KPIResult | null>(null);

  const togglePlatform = (p: string) => {
    setSelectedPlatforms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-sky-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Social Media KPI Dashboard Generator</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Generate a custom KPI framework aligned to your business goals. Includes benchmarks, dashboard layouts, alert rules, and report templates.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Platforms (select all that apply)</label>
            <div className="flex flex-wrap gap-2">{platforms.map(p => (
              <button key={p} onClick={() => togglePlatform(p)} className={`px-4 py-2 rounded-xl text-sm font-medium transition ${selectedPlatforms.includes(p) ? 'bg-cyan-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{p}</button>
            ))}</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Business Goal</label>
              <select value={goal} onChange={e => setGoal(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent">
                {businessGoals.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Report Period</label>
              <select value={period} onChange={e => setPeriod(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent">
                {reportPeriods.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Audience Size</label>
              <select value={audience} onChange={e => setAudience(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent">
                {audienceSizes.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => setResult(generateKPIDashboard(selectedPlatforms, goal, period, audience))} className="w-full py-4 bg-gradient-to-r from-cyan-600 to-sky-600 text-white font-bold rounded-xl hover:from-cyan-700 hover:to-sky-700 transition-all shadow-lg hover:shadow-xl">Generate KPI Dashboard</button>
        </div>

        {result && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Primary KPIs (Track These First)</h2>
              <div className="space-y-4">{result.primaryKPIs.map((k, i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${k.priority === 'P0' ? 'bg-red-100 text-red-700' : k.priority === 'P1' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>{k.priority}</span>
                    <span className="font-bold text-gray-900">{k.kpi}</span>
                    <span className="ml-auto bg-green-100 text-green-700 px-3 py-1 rounded-lg text-xs font-bold">Target: {k.benchmark}</span>
                  </div>
                  <p className="text-gray-600 text-sm font-mono bg-gray-50 rounded-lg p-2 mb-2">{k.formula}</p>
                  <p className="text-gray-500 text-xs">{k.why}</p>
                </div>
              ))}</div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Dashboard Layout Blueprint</h2>
              <div className="space-y-4">{result.dashboardLayout.map((s, i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-4">
                  <h3 className="font-bold text-gray-900 text-sm mb-2">{s.section}</h3>
                  <div className="flex flex-wrap gap-2 mb-2">{s.metrics.map((m, j) => <span key={j} className="bg-cyan-50 text-cyan-700 px-2 py-1 rounded text-xs">{m}</span>)}</div>
                  <p className="text-gray-500 text-xs">{s.visualization}</p>
                </div>
              ))}</div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Platform Benchmarks 2026</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-gray-200"><th className="text-left p-3">Platform</th><th className="text-left p-3">Engagement Rate</th><th className="text-left p-3">CTR</th><th className="text-left p-3">Best Post Time</th></tr></thead>
                  <tbody>{result.benchmarksByPlatform.filter(b => selectedPlatforms.includes(b.platform)).map((b, i) => <tr key={i} className="border-b border-gray-50"><td className="p-3 font-medium">{b.platform}</td><td className="p-3 text-cyan-700">{b.engagementRate}</td><td className="p-3 text-gray-700">{b.ctr}</td><td className="p-3 text-gray-600">{b.bestPostTime}</td></tr>)}</tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Alert Rules</h2>
                <div className="space-y-3">{result.alertRules.map((a, i) => (
                  <div key={i} className="bg-red-50 rounded-xl p-4">
                    <p className="text-gray-900 text-sm font-medium">{a.metric}</p>
                    <p className="text-red-700 text-xs mt-1">When: {a.condition}</p>
                    <p className="text-gray-600 text-xs mt-1">Then: {a.action}</p>
                  </div>
                ))}</div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Weekly Checklist</h2>
                <ul className="space-y-2">{result.weeklyChecklist.map((c, i) => <li key={i} className="text-gray-700 text-sm flex gap-2"><input type="checkbox" className="rounded" />{c}</li>)}</ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Report Template</h2>
              <div className="space-y-3">{result.reportTemplate.map((r, i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-4">
                  <span className="text-xs font-semibold text-cyan-600 uppercase">{r.section}</span>
                  <p className="text-gray-700 text-sm mt-1">{r.content}</p>
                </div>
              ))}</div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended Tool Stack</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{result.toolStack.map((t, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-4 flex justify-between items-center">
                  <div><span className="text-gray-900 text-sm font-medium">{t.tool}</span><p className="text-gray-500 text-xs">{t.purpose}</p></div>
                  <span className="text-cyan-600 text-xs font-medium">{t.cost}</span>
                </div>
              ))}</div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
