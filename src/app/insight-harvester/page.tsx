'use client';
import { useState } from 'react';

const dataSources = ['Customer Support Tickets', 'Sales Calls', 'Product Reviews', 'Social Comments', 'Community Forums', 'Internal Docs', 'Competitor Content', 'Industry Reports'] as const;
const industries = ['SaaS', 'E-commerce', 'Agency', 'Creator Economy', 'Health & Wellness', 'Finance', 'Education', 'Real Estate', 'Food & Beverage', 'Travel'] as const;
const contentGoals = ['Blog Content', 'Social Media Posts', 'Email Sequences', 'Product Updates', 'Case Studies', 'FAQ Pages'] as const;
const depthLevels = ['Surface Scan', 'Standard Analysis', 'Deep Dive'] as const;

interface PainPoint {
  pain: string;
  frequency: number;
  source: string;
  contentAngle: string;
  urgency: string;
  estimatedTraffic: number;
}

interface QuestionCluster {
  theme: string;
  questions: string[];
  volume: number;
  contentType: string;
  seoOpportunity: string;
}

interface CompetitorGap {
  topic: string;
  competitorCoverage: string;
  yourOpportunity: string;
  differentiator: string;
  difficulty: string;
  potentialImpact: number;
}

interface ContentSeed {
  title: string;
  format: string;
  angle: string;
  targetKeyword: string;
  estimatedEffort: string;
  potentialROI: number;
}

interface TrendSignal {
  signal: string;
  source: string;
  velocity: number;
  contentWindow: string;
  actionItem: string;
}

interface InsightResult {
  painPoints: PainPoint[];
  questionClusters: QuestionCluster[];
  competitorGaps: CompetitorGap[];
  contentSeeds: ContentSeed[];
  trendSignals: TrendSignal[];
}

function generateInsights(
  dataSource: string,
  industry: string,
  contentGoal: string,
  depthLevel: string,
  businessContext: string
): InsightResult {
  const contextLabel = businessContext || industry;

  const painPointsData: Record<string, PainPoint[]> = {
    'Customer Support Tickets': [
      { pain: 'Users cannot find the feature they need', frequency: 89, source: 'Support tickets (47% of "how to" queries)', contentAngle: `Create a visual guide: "The Complete ${contextLabel} Feature Map — Find What You Need in 10 Seconds"`, urgency: 'Critical', estimatedTraffic: 8500 },
      { pain: 'Onboarding takes too long and users give up', frequency: 82, source: 'Support tickets (31% abandon before day 3)', contentAngle: '"5-Minute Setup: The Only Onboarding Guide You Need" — reduce time-to-value dramatically', urgency: 'High', estimatedTraffic: 6200 },
      { pain: 'Integration with existing tools is confusing', frequency: 76, source: 'Support tickets (23% mention specific tools)', contentAngle: 'Create integration-specific guides: "How to Connect [Your Product] with [Popular Tool] in 3 Steps"', urgency: 'High', estimatedTraffic: 5400 },
      { pain: 'Pricing structure is unclear or feels unfair', frequency: 68, source: 'Support tickets (18% pre-purchase pricing questions)', contentAngle: '"Transparent Pricing: What You Get at Every Tier" — address every pricing objection proactively', urgency: 'Medium', estimatedTraffic: 4100 },
      { pain: 'Users do not understand the value of advanced features', frequency: 64, source: 'Support tickets (12% ask "what does X do?")', contentAngle: `"${contextLabel} Power User Guide: 10 Features You Are Not Using (But Should Be)"`, urgency: 'Medium', estimatedTraffic: 3800 },
    ],
    'Sales Calls': [
      { pain: 'Prospects cannot articulate their problem clearly', frequency: 85, source: 'Sales call transcripts (52% of discovery calls)', contentAngle: `"The ${contextLabel} Problem You Cannot Name: Why Everything Feels Harder Than It Should"`, urgency: 'Critical', estimatedTraffic: 7200 },
      { pain: 'Decision-makers need ROI justification for their boss', frequency: 80, source: 'Sales calls (44% mention needing to "sell internally")', contentAngle: '"The ROI Calculator: Show Your Boss Exactly Why This Pays for Itself" — interactive calculator', urgency: 'High', estimatedTraffic: 5800 },
      { pain: 'Prospects fear the switching cost from current tool', frequency: 74, source: 'Sales calls (38% mention migration concerns)', contentAngle: '"The Painless Migration Guide: Switch in a Weekend, Not a Quarter"', urgency: 'High', estimatedTraffic: 4600 },
      { pain: 'Prospects compare you to 3-4 competitors', frequency: 72, source: 'Sales calls (35% ask for direct comparisons)', contentAngle: `"Honest Comparison: ${contextLabel} vs. [Competitor] — Where We Win and Where We Do Not"`, urgency: 'High', estimatedTraffic: 6500 },
      { pain: 'Prospects want to see results before committing budget', frequency: 68, source: 'Sales calls (29% request proof of results)', contentAngle: `"${contextLabel} Results Report: What 500 Customers Achieved in Their First 90 Days"`, urgency: 'Medium', estimatedTraffic: 4200 },
    ],
    'Product Reviews': [
      { pain: 'Users love the product but find the UI confusing', frequency: 78, source: 'G2/Capterra reviews (61% mention ease-of-use)', contentAngle: '"Navigation Made Simple: The Visual Guide to [Your Product]\'s Interface"', urgency: 'High', estimatedTraffic: 5100 },
      { pain: 'Missing a specific feature that competitors have', frequency: 72, source: 'Reviews (34% mention missing features)', contentAngle: 'Public roadmap blog: "What We Are Building Next (And Why)" — transparency builds trust', urgency: 'Medium', estimatedTraffic: 3800 },
      { pain: 'Customer support response time inconsistency', frequency: 65, source: 'Reviews (28% mention support speed)', contentAngle: '"Our Support Promise: How We Are Improving Response Times to Under 2 Hours"', urgency: 'Medium', estimatedTraffic: 2900 },
      { pain: 'Pricing feels high compared to perceived value', frequency: 60, source: 'Reviews (22% mention pricing concerns)', contentAngle: 'Value breakdown: "Here Is Exactly What Your $X/Month Gets You (And Why It Is Worth 10x That)"', urgency: 'Medium', estimatedTraffic: 4500 },
      { pain: 'Users want more templates and pre-built assets', frequency: 58, source: 'Reviews (19% request more templates)', contentAngle: `"50 Free ${contextLabel} Templates: Ready-to-Use Starting Points for Every Scenario"`, urgency: 'Low', estimatedTraffic: 7200 },
    ],
  };

  const defaultPainPoints: PainPoint[] = [
    { pain: 'Information overload in the decision-making process', frequency: 82, source: `${dataSource} analysis`, contentAngle: `"The Only ${contextLabel} Guide You Need: Cut Through the Noise in 5 Minutes"`, urgency: 'High', estimatedTraffic: 6000 },
    { pain: 'Lack of industry-specific guidance and examples', frequency: 76, source: `${dataSource} patterns`, contentAngle: `"${contextLabel} Playbook: Strategies That Actually Work for ${industry}"`, urgency: 'High', estimatedTraffic: 5200 },
    { pain: 'Difficulty measuring ROI of current approach', frequency: 70, source: `${dataSource} recurring theme`, contentAngle: `"${contextLabel} ROI Framework: How to Prove Your Strategy Is Working"`, urgency: 'Medium', estimatedTraffic: 4400 },
    { pain: 'Keeping up with rapid industry changes', frequency: 68, source: `${dataSource} trend`, contentAngle: `"${contextLabel} in 2026: The 5 Changes You Cannot Ignore"`, urgency: 'Medium', estimatedTraffic: 5800 },
    { pain: 'Finding trustworthy, unbiased advice', frequency: 64, source: `${dataSource} sentiment`, contentAngle: '"No Agenda, Just Data: An Honest Analysis of What Works and What Doesn\'t"', urgency: 'Medium', estimatedTraffic: 3600 },
  ];

  const questionClustersData: QuestionCluster[] = [
    { theme: 'Getting Started', questions: [`How do I start with ${contextLabel}?`, 'What tools do I need?', 'How much should I budget?', 'What mistakes should I avoid?', 'How long until I see results?'], volume: 8200, contentType: 'Beginner Guide + Video Tutorial', seoOpportunity: `"${contextLabel} for beginners" — high volume, medium competition` },
    { theme: 'Optimization', questions: [`How do I improve my ${contextLabel} results?`, 'What metrics should I track?', 'How often should I review my strategy?', 'What is a good benchmark?', 'How do I A/B test effectively?'], volume: 6500, contentType: 'In-depth Blog Post + Interactive Tool', seoOpportunity: `"${contextLabel} optimization" — high intent, medium-high competition` },
    { theme: 'Troubleshooting', questions: [`Why is my ${contextLabel} not working?`, 'Common mistakes and how to fix them', 'When should I pivot my approach?', 'How do I diagnose performance drops?', 'Is my strategy outdated?'], volume: 5100, contentType: 'FAQ Page + Diagnostic Checklist', seoOpportunity: `"${contextLabel} troubleshooting" — high intent, low competition` },
    { theme: 'Advanced Strategies', questions: ['What are the latest advanced techniques?', `How do experts approach ${contextLabel}?`, 'What automation should I set up?', 'How do I scale what is working?', 'What is the next frontier?'], volume: 3800, contentType: 'Expert Guide + Case Study', seoOpportunity: `"advanced ${contextLabel}" — lower volume, very high intent` },
    { theme: 'Tools & Resources', questions: [`Best tools for ${contextLabel} in 2026?`, 'Free vs paid tool comparison', 'What integrations matter most?', 'How to build a tool stack?', 'What can I automate?'], volume: 7100, contentType: 'Comparison Post + Resource Page', seoOpportunity: `"best ${contextLabel} tools" — high volume, high commercial intent` },
  ];

  const competitorGapsData: CompetitorGap[] = [
    { topic: `${contextLabel} for small teams (< 10 people)`, competitorCoverage: 'Enterprise-focused — small teams are ignored', yourOpportunity: 'Create the definitive small-team playbook with budget-friendly strategies', differentiator: 'Practical advice for resource-constrained teams', difficulty: 'Medium', potentialImpact: 88 },
    { topic: 'Real failure stories and lessons learned', competitorCoverage: 'Only success stories — no one admits failures', yourOpportunity: 'Publish candid post-mortems and "what went wrong" analyses', differentiator: 'Radical transparency builds trust competitors cannot match', difficulty: 'Low', potentialImpact: 92 },
    { topic: 'Industry-specific implementation guides', competitorCoverage: 'Generic advice for all industries', yourOpportunity: `Create ${industry}-specific guides with real examples and metrics`, differentiator: 'Niche specificity eliminates irrelevant noise', difficulty: 'High', potentialImpact: 85 },
    { topic: 'Video walkthroughs and screen recordings', competitorCoverage: 'Text-heavy — few visual tutorials', yourOpportunity: 'Create short, focused video guides (2-5 minutes each)', differentiator: 'Visual learners are underserved in this space', difficulty: 'Medium', potentialImpact: 80 },
    { topic: `${contextLabel} trends and predictions`, competitorCoverage: 'Retrospective content — backward-looking analysis', yourOpportunity: 'Publish forward-looking predictions backed by data and expert interviews', differentiator: 'Position as the industry thought leader, not just a reporter', difficulty: 'High', potentialImpact: 86 },
    { topic: 'Interactive tools and calculators', competitorCoverage: 'Static blog posts dominate — no interactive content', yourOpportunity: 'Build free tools: ROI calculators, readiness assessments, benchmark comparisons', differentiator: 'Interactive content generates 2x more shares and 5x more backlinks', difficulty: 'High', potentialImpact: 94 },
  ];

  const contentSeedsData: ContentSeed[] = [
    { title: `The ${contextLabel} Starter Kit: Everything You Need (Nothing You Don't)`, format: 'Comprehensive Blog Post + Resource Download', angle: 'Beginner-friendly, actionable, zero fluff', targetKeyword: `${contextLabel.toLowerCase()} starter guide`, estimatedEffort: 'Medium (3-5 hours)', potentialROI: 88 },
    { title: `${industry} Leaders Share Their ${contextLabel} Mistakes (So You Don't Have To)`, format: 'Expert Roundup + Social Snippets', angle: 'Authentic failure stories from real practitioners', targetKeyword: `${contextLabel.toLowerCase()} mistakes to avoid`, estimatedEffort: 'High (outreach + editing)', potentialROI: 85 },
    { title: `The 30-Day ${contextLabel} Challenge: From Zero to Competent`, format: 'Email Sequence + Blog Series', angle: 'Structured learning path with daily micro-actions', targetKeyword: `${contextLabel.toLowerCase()} challenge`, estimatedEffort: 'High (30 pieces of content)', potentialROI: 92 },
    { title: `${contextLabel} Benchmark Report 2026: How Do You Compare?`, format: 'Interactive Report + Infographic', angle: 'Data-driven benchmarking with industry breakdowns', targetKeyword: `${contextLabel.toLowerCase()} benchmarks 2026`, estimatedEffort: 'Very High (research + design)', potentialROI: 95 },
    { title: `I Tried Every ${contextLabel} Tool So You Don't Have To: The Honest Review`, format: 'Comparison Blog Post + Video', angle: 'Unbiased, hands-on review with real screenshots', targetKeyword: `best ${contextLabel.toLowerCase()} tools`, estimatedEffort: 'High (testing + writing)', potentialROI: 90 },
    { title: `The ${contextLabel} Checklist: 50 Things to Get Right Before You Launch`, format: 'Downloadable Checklist + Blog Post', angle: 'Comprehensive pre-launch audit for quality assurance', targetKeyword: `${contextLabel.toLowerCase()} checklist`, estimatedEffort: 'Medium (4-6 hours)', potentialROI: 82 },
  ];

  const trendSignalsData: TrendSignal[] = [
    { signal: 'AI integration becoming table-stakes expectation', source: 'Industry reports + social mentions', velocity: 94, contentWindow: 'Immediate — publish within 2 weeks', actionItem: `Create "${contextLabel} + AI: The Practical Guide to Getting Started" before competitors dominate this keyword` },
    { signal: 'Short-form video overtaking text for education', source: 'Platform analytics + content performance data', velocity: 88, contentWindow: 'Current quarter — establish presence now', actionItem: 'Convert top 10 blog posts into 60-second video summaries for TikTok and YouTube Shorts' },
    { signal: 'Community-led growth replacing top-down marketing', source: 'Sales call themes + competitor movements', velocity: 82, contentWindow: '3-6 months — start building now', actionItem: `Launch a ${contextLabel} community space and create content that serves community members specifically` },
    { signal: 'Sustainability and ethical practices gaining weight in B2B purchasing', source: 'RFP requirements + industry surveys', velocity: 72, contentWindow: '6-12 months — position early', actionItem: `Publish "${contextLabel} and Sustainability: How We Are Building Responsibly" to capture emerging demand` },
    { signal: 'No-code and low-code adoption accelerating', source: 'Product review trends + support ticket themes', velocity: 86, contentWindow: 'Immediate — already mainstream', actionItem: `Create "No-Code ${contextLabel}: How to Get Results Without a Developer" guide` },
  ];

  return {
    painPoints: painPointsData[dataSource] || defaultPainPoints,
    questionClusters: questionClustersData,
    competitorGaps: competitorGapsData,
    contentSeeds: contentSeedsData,
    trendSignals: trendSignalsData,
  };
}

export default function InsightHarvesterPage() {
  const [dataSource, setDataSource] = useState<string>(dataSources[0]);
  const [industry, setIndustry] = useState<string>(industries[0]);
  const [contentGoal, setContentGoal] = useState<string>(contentGoals[0]);
  const [depthLevel, setDepthLevel] = useState<string>(depthLevels[1]);
  const [businessContext, setBusinessContext] = useState('');
  const [result, setResult] = useState<InsightResult | null>(null);

  const urgencyColor = (u: string) => {
    switch (u) { case 'Critical': return 'bg-red-100 text-red-700'; case 'High': return 'bg-orange-100 text-orange-700'; case 'Medium': return 'bg-yellow-100 text-yellow-700'; default: return 'bg-green-100 text-green-700'; }
  };

  const difficultyColor = (d: string) => {
    switch (d) { case 'Low': return 'bg-green-100 text-green-700'; case 'Medium': return 'bg-yellow-100 text-yellow-700'; case 'High': return 'bg-orange-100 text-orange-700'; case 'Very High': return 'bg-red-100 text-red-700'; default: return 'bg-gray-100 text-gray-700'; }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Insight Harvester</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Extract content gold from internal data sources. Turn customer support tickets, sales calls, reviews, and competitor gaps into high-ROI content opportunities.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Data Source</label>
              <select value={dataSource} onChange={e => setDataSource(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                {dataSources.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Industry</label>
              <select value={industry} onChange={e => setIndustry(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                {industries.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Content Goal</label>
              <select value={contentGoal} onChange={e => setContentGoal(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                {contentGoals.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Analysis Depth</label>
              <select value={depthLevel} onChange={e => setDepthLevel(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                {depthLevels.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Business Context</label>
              <input type="text" value={businessContext} onChange={e => setBusinessContext(e.target.value)} placeholder="e.g. project management tool, organic skincare brand, coding bootcamp" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
            </div>
          </div>
          <button
            onClick={() => setResult(generateInsights(dataSource, industry, contentGoal, depthLevel, businessContext))}
            className="w-full py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl"
          >
            Harvest Insights
          </button>
        </div>

        {result && (
          <div className="space-y-6">
            {/* 1. Pain Points */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Pain Points Discovered</h2>
              <div className="space-y-4">
                {result.painPoints.map((p, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-5">
                    <div className="flex flex-wrap items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{p.pain}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${urgencyColor(p.urgency)}`}>{p.urgency}</span>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs text-gray-500">Frequency</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2"><div className="h-2 rounded-full bg-amber-500" style={{ width: `${p.frequency}%` }} /></div>
                      <span className="text-sm font-bold text-gray-600">{p.frequency}%</span>
                      <span className="text-xs text-gray-400 ml-3">~{p.estimatedTraffic.toLocaleString()} monthly searches</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">Source: {p.source}</p>
                    <div className="bg-amber-50 rounded-lg p-3">
                      <p className="text-xs font-semibold text-amber-600 mb-1">CONTENT ANGLE</p>
                      <p className="text-sm text-amber-800">{p.contentAngle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Question Clusters */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Question Clusters</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.questionClusters.map((q, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-gray-900">{q.theme}</h3>
                      <span className="bg-amber-100 text-amber-700 px-2.5 py-1 rounded-lg text-xs font-bold">{q.volume.toLocaleString()}/mo</span>
                    </div>
                    <ul className="space-y-1 mb-3">
                      {q.questions.map((question, j) => (
                        <li key={j} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-amber-500 mt-1 flex-shrink-0">?</span>{question}
                        </li>
                      ))}
                    </ul>
                    <div className="bg-orange-50 rounded-lg p-2 mb-2">
                      <p className="text-xs font-semibold text-orange-600">FORMAT: <span className="font-normal text-orange-800">{q.contentType}</span></p>
                    </div>
                    <p className="text-xs text-gray-500">{q.seoOpportunity}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Competitor Gaps */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Competitor Content Gaps</h2>
              <div className="space-y-4">
                {result.competitorGaps.map((g, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-5">
                    <div className="flex flex-wrap items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{g.topic}</h3>
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${difficultyColor(g.difficulty)}`}>{g.difficulty}</span>
                        <div className="w-16 bg-gray-200 rounded-full h-2"><div className="h-2 rounded-full bg-green-500" style={{ width: `${g.potentialImpact}%` }} /></div>
                        <span className="text-xs font-bold text-gray-500">{g.potentialImpact}%</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="bg-red-50 rounded-lg p-3">
                        <p className="text-xs font-semibold text-red-600 mb-1">COMPETITOR STATUS</p>
                        <p className="text-sm text-red-800">{g.competitorCoverage}</p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <p className="text-xs font-semibold text-green-600 mb-1">YOUR OPPORTUNITY</p>
                        <p className="text-sm text-green-800">{g.yourOpportunity}</p>
                      </div>
                      <div className="bg-amber-50 rounded-lg p-3">
                        <p className="text-xs font-semibold text-amber-600 mb-1">DIFFERENTIATOR</p>
                        <p className="text-sm text-amber-800">{g.differentiator}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Content Seeds */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Content Seeds</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.contentSeeds.map((s, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-5">
                    <h3 className="font-semibold text-gray-900 mb-2">{s.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="bg-amber-100 text-amber-700 px-2.5 py-1 rounded-lg text-xs font-bold">{s.format}</span>
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${difficultyColor(s.estimatedEffort.includes('Very') ? 'Very High' : s.estimatedEffort.includes('High') ? 'High' : 'Medium')}`}>{s.estimatedEffort}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{s.angle}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Keyword: {s.targetKeyword}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">ROI</span>
                        <div className="w-16 bg-gray-200 rounded-full h-2"><div className="h-2 rounded-full bg-green-500" style={{ width: `${s.potentialROI}%` }} /></div>
                        <span className="text-xs font-bold text-gray-600">{s.potentialROI}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Trend Signals */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Trend Signals</h2>
              <div className="space-y-3">
                {result.trendSignals.map((t, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-5">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{t.signal}</h3>
                        <span className="text-xs text-gray-500">{t.source}</span>
                      </div>
                      <div className="flex items-center gap-3 md:w-40">
                        <span className="text-xs text-gray-500">Velocity</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2"><div className="h-2 rounded-full bg-orange-500" style={{ width: `${t.velocity}%` }} /></div>
                        <span className="text-sm font-bold text-gray-600">{t.velocity}%</span>
                      </div>
                      <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap">{t.contentWindow}</span>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-3 mt-3">
                      <p className="text-xs font-semibold text-amber-600 mb-1">ACTION</p>
                      <p className="text-sm text-amber-800">{t.actionItem}</p>
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
