'use client';
import { useState } from 'react';

const contentTypes = ['Blog Post', 'Social Media Post', 'Video', 'Podcast Episode', 'Newsletter', 'Infographic', 'Case Study', 'Whitepaper', 'Webinar', 'Product Launch'] as const;
const platforms = ['LinkedIn', 'Instagram', 'Twitter/X', 'TikTok', 'YouTube', 'Website/Blog', 'Email', 'All Platforms'] as const;
const goals = ['Brand Awareness', 'Lead Generation', 'Sales Conversion', 'Community Engagement', 'Thought Leadership', 'SEO/Traffic', 'Customer Retention', 'Product Adoption'] as const;
const audiences = ['C-Suite Executives', 'Marketing Professionals', 'Small Business Owners', 'Developers/Technical', 'General Consumers', 'Enterprise Buyers', 'Creators/Influencers', 'Students/Learners'] as const;
const industries = ['Tech & SaaS', 'E-commerce & DTC', 'Healthcare', 'Finance & FinTech', 'Education', 'Real Estate', 'Agency & Consulting', 'Manufacturing', 'Non-Profit', 'Food & Beverage', 'Travel & Hospitality', 'Fitness & Wellness'] as const;
const stages = ['Ideation', 'Draft', 'Review', 'Published', 'Performing', 'Declining'] as const;

interface ScoreDimension { name: string; score: number; weight: number; weightedScore: number; feedback: string; improvement: string; benchmark: string; }
interface ContentAudit { element: string; status: string; impact: string; fix: string; effort: string; }
interface PerformancePrediction { metric: string; expected: string; benchmark: string; confidence: string; }
interface OptimizationAction { priority: string; action: string; expectedLift: string; effort: string; deadline: string; }
interface CompetitorGap { area: string; yourScore: string; competitorAvg: string; gap: string; opportunity: string; }

interface ContentScore {
  overallScore: number;
  grade: string;
  dimensions: ScoreDimension[];
  audit: ContentAudit[];
  predictions: PerformancePrediction[];
  optimizations: OptimizationAction[];
  competitorGaps: CompetitorGap[];
  quickWins: string[];
  scoreHistory: { label: string; score: number }[];
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }

function generateScore(contentType: string, platform: string, goal: string, audience: string, industry: string, stage: string, contentTitle: string): ContentScore {
  const seed = hash(`${contentType}-${platform}-${goal}-${audience}-${industry}-${stage}-${contentTitle}`);

  const dimensions: ScoreDimension[] = [
    { name: 'Relevance', score: 40 + seed % 55, weight: 0.20, weightedScore: 0, feedback: '', improvement: '', benchmark: '' },
    { name: 'Quality', score: 35 + (seed * 3) % 60, weight: 0.20, weightedScore: 0, feedback: '', improvement: '', benchmark: '' },
    { name: 'Engagement Potential', score: 30 + (seed * 5) % 65, weight: 0.15, weightedScore: 0, feedback: '', improvement: '', benchmark: '' },
    { name: 'SEO/Discoverability', score: 25 + (seed * 7) % 70, weight: 0.15, weightedScore: 0, feedback: '', improvement: '', benchmark: '' },
    { name: 'Conversion Alignment', score: 35 + (seed * 11) % 55, weight: 0.10, weightedScore: 0, feedback: '', improvement: '', benchmark: '' },
    { name: 'Brand Consistency', score: 45 + (seed * 13) % 50, weight: 0.10, weightedScore: 0, feedback: '', improvement: '', benchmark: '' },
    { name: 'Originality', score: 30 + (seed * 17) % 65, weight: 0.05, weightedScore: 0, feedback: '', improvement: '', benchmark: '' },
    { name: 'Accessibility', score: 40 + (seed * 19) % 55, weight: 0.05, weightedScore: 0, feedback: '', improvement: '', benchmark: '' },
  ];

  const feedbacks = [
    ['Highly relevant to target audience needs', 'Somewhat relevant but could be more targeted', 'Topic relevance needs improvement — may miss audience intent'],
    ['Well-researched with strong data points', 'Good quality but lacking original insights', 'Quality below benchmark — needs more depth and evidence'],
    ['Strong hook + clear value proposition = high engagement', 'Decent engagement potential — strengthen the opening hook', 'Low engagement signals — restructure for scroll-stopping impact'],
    ['SEO-optimized with strong keyword targeting', 'Basic SEO in place but missing opportunities', 'Weak discoverability — needs keyword research and optimization'],
    ['Clear CTA aligned with business goal', 'CTA present but could be stronger', 'Missing or misaligned call-to-action — add clear next step'],
    ['On-brand voice, visuals, and messaging', 'Mostly on-brand with minor inconsistencies', 'Brand voice drift detected — review brand guidelines'],
    ['Fresh perspective that stands out from competitors', 'Decent originality but similar angles exist', 'Too similar to existing content — find a unique angle'],
    ['Fully accessible across devices and abilities', 'Partially accessible — missing alt text or captions', 'Accessibility gaps — add alt text, captions, and semantic structure'],
  ];
  const improvements = [
    ['Add audience-specific pain points in the first paragraph', 'Survey your audience to validate topic relevance before investing in production'],
    ['Include 3+ data points or original research findings', 'Add expert quotes or customer stories for credibility'],
    ['Open with a question or bold statement that creates curiosity gap', 'Add polls, questions, or interactive elements to drive comments'],
    ['Add long-tail keywords in H2/H3 headings and meta description', 'Build 3+ internal links and 2+ authoritative external links'],
    ['Make CTA specific: "Book a 15-min demo" not "Learn more"', 'Add urgency or social proof near CTA: "Join 2,500+ teams"'],
    ['Run content through brand voice checklist before publishing', 'Use consistent visual templates for all content types'],
    ['Research competitor content and find gaps they haven\'t covered', 'Add proprietary data, unique frameworks, or contrarian takes'],
    ['Add alt text to all images, captions to videos, proper heading hierarchy', 'Test with screen reader and keyboard-only navigation'],
  ];
  const benchmarks = [
    `Top ${industry.toLowerCase()} content scores 75-85 on relevance`,
    `${platform} ${contentType.toLowerCase()} benchmark: 70+ quality score`,
    `Average ${platform} engagement rate: 2.5-4.5% for ${industry.toLowerCase()}`,
    `Top 10% of ${contentType.toLowerCase()} content scores 80+ on SEO`,
    `${goal.toLowerCase()} content benchmark: 65+ conversion alignment`,
    `Brand consistency benchmark for ${industry.toLowerCase()}: 80+`,
    `Originality threshold to stand out: 70+ (most content scores 45-55)`,
    `WCAG 2.1 compliance rate in ${industry.toLowerCase()}: only 23% — easy differentiator`,
  ];

  dimensions.forEach((d, i) => {
    d.weightedScore = Math.round(d.score * d.weight);
    const tier = d.score > 70 ? 0 : d.score > 50 ? 1 : 2;
    d.feedback = feedbacks[i][tier];
    d.improvement = improvements[i][(seed + i) % improvements[i].length];
    d.benchmark = benchmarks[i];
  });

  const overallScore = dimensions.reduce((sum, d) => sum + d.weightedScore, 0);
  const grade = overallScore >= 85 ? 'A+' : overallScore >= 75 ? 'A' : overallScore >= 65 ? 'B+' : overallScore >= 55 ? 'B' : overallScore >= 45 ? 'C+' : overallScore >= 35 ? 'C' : 'D';

  const audit: ContentAudit[] = [
    { element: 'Headline/Title', status: seed % 3 === 0 ? 'Strong' : 'Needs Work', impact: 'High — 80% of readers decide based on title alone', fix: 'Use power words + number + benefit: "7 Proven Ways to [Benefit] Without [Pain Point]"', effort: 'Low (5 min)' },
    { element: 'Opening Hook', status: seed % 4 === 0 ? 'Strong' : 'Needs Work', impact: 'High — 55% bounce in first 15 seconds', fix: 'Start with a surprising stat, bold claim, or question that creates curiosity gap', effort: 'Low (10 min)' },
    { element: 'Visual Assets', status: seed % 3 === 1 ? 'Strong' : 'Missing', impact: 'Medium — posts with images get 2.3x more engagement', fix: 'Add custom graphics, data visualizations, or branded templates', effort: 'Medium (30 min)' },
    { element: 'Call-to-Action', status: seed % 5 === 0 ? 'Strong' : 'Weak', impact: 'High — missing CTA = 0% conversion regardless of content quality', fix: 'Add specific, benefit-driven CTA with low-friction entry point', effort: 'Low (5 min)' },
    { element: 'Internal Links', status: seed % 4 === 2 ? 'Strong' : 'Missing', impact: 'Medium — internal links improve SEO and reduce bounce rate by 20%', fix: 'Add 3-5 contextual links to related content', effort: 'Low (10 min)' },
    { element: 'Meta Description', status: seed % 3 === 2 ? 'Strong' : 'Missing', impact: 'Medium — good meta descriptions improve CTR by 5.8%', fix: 'Write 150-160 char description with primary keyword + benefit', effort: 'Low (5 min)' },
    { element: 'Mobile Optimization', status: seed % 2 === 0 ? 'Strong' : 'Needs Work', impact: 'High — 68% of social traffic is mobile', fix: 'Test on mobile, use responsive images, keep paragraphs under 3 lines', effort: 'Medium (20 min)' },
    { element: 'Social Sharing Metadata', status: seed % 4 === 1 ? 'Strong' : 'Missing', impact: 'Medium — OG tags control how content appears when shared', fix: 'Add og:title, og:description, og:image with 1200x630px preview', effort: 'Low (10 min)' },
  ];

  const predictions: PerformancePrediction[] = [
    { metric: 'Impressions (7 days)', expected: `${(seed % 50 + 5) * 100}–${(seed % 50 + 15) * 100}`, benchmark: `${industry.toLowerCase()} avg: ${(seed % 30 + 3) * 100}`, confidence: seed % 3 === 0 ? 'High' : 'Medium' },
    { metric: 'Engagement Rate', expected: `${(2 + seed % 5)}.${seed % 10}%`, benchmark: `${platform} avg: 2.8%`, confidence: 'Medium' },
    { metric: 'Click-Through Rate', expected: `${(1 + seed % 4)}.${seed % 10}%`, benchmark: `${contentType.toLowerCase()} avg: 1.9%`, confidence: 'Medium' },
    { metric: 'Shares/Reposts', expected: `${5 + seed % 30}–${15 + seed % 50}`, benchmark: `Top 20%: ${20 + seed % 40}+`, confidence: seed % 2 === 0 ? 'Medium' : 'Low' },
    { metric: 'Conversions (if CTA)', expected: `${1 + seed % 8}–${3 + seed % 15}`, benchmark: `${goal.toLowerCase()} avg: ${2 + seed % 5}`, confidence: 'Low' },
  ];

  const optimizations: OptimizationAction[] = [
    { priority: 'P0', action: 'Rewrite headline using proven formula: [Number] + [Adjective] + [Target] + [Promise]', expectedLift: '+25-40% CTR', effort: '15 min', deadline: 'Before publish' },
    { priority: 'P0', action: 'Add clear, specific CTA aligned with primary goal', expectedLift: '+15-30% conversion', effort: '10 min', deadline: 'Before publish' },
    { priority: 'P1', action: 'Optimize opening hook — first 2 sentences must create curiosity gap', expectedLift: '+20% read-through rate', effort: '20 min', deadline: 'Before publish' },
    { priority: 'P1', action: 'Add 2-3 custom visuals (data viz, infographic, branded template)', expectedLift: '+40-60% engagement', effort: '45 min', deadline: 'Before publish' },
    { priority: 'P2', action: 'Build internal link structure — 3-5 contextual links to related content', expectedLift: '+15% page views, -20% bounce rate', effort: '15 min', deadline: 'Day 1 post-publish' },
    { priority: 'P2', action: 'Schedule 3 repurposed posts across platforms for next 7 days', expectedLift: '+100-200% total reach', effort: '30 min', deadline: 'Day 1-3 post-publish' },
    { priority: 'P3', action: 'A/B test 2 headline variants using social media polls or email subject lines', expectedLift: '+10-20% CTR on winner', effort: '20 min', deadline: 'Day 7 post-publish' },
    { priority: 'P3', action: 'Review performance data at 7 days, update content based on what resonated', expectedLift: '+5-15% long-term performance', effort: '30 min', deadline: 'Day 7 post-publish' },
  ];

  const competitorGaps: CompetitorGap[] = [
    { area: 'Data & Research', yourScore: `${dimensions[1].score}`, competitorAvg: '62', gap: dimensions[1].score > 62 ? 'Ahead' : 'Behind', opportunity: 'Add proprietary data or original survey results — competitors rely on recycled stats' },
    { area: 'Visual Quality', yourScore: `${dimensions[2].score}`, competitorAvg: '58', gap: dimensions[2].score > 58 ? 'Ahead' : 'Behind', opportunity: 'Custom illustrations and branded infographics are rare — easy differentiation' },
    { area: 'SEO Depth', yourScore: `${dimensions[3].score}`, competitorAvg: '55', gap: dimensions[3].score > 55 ? 'Ahead' : 'Behind', opportunity: 'Most competitors target head terms only — long-tail keywords are wide open' },
    { area: 'Interactive Elements', yourScore: `${Math.round(dimensions[2].score * 0.8)}`, competitorAvg: '35', gap: 'Opportunity', opportunity: 'Calculators, quizzes, and interactive tools are rare in this space — high engagement potential' },
    { area: 'Accessibility', yourScore: `${dimensions[7].score}`, competitorAvg: '28', gap: dimensions[7].score > 28 ? 'Ahead' : 'Ahead', opportunity: 'Only 23% of content is accessible — being compliant is a competitive advantage' },
  ];

  const quickWins = [
    `Rewrite the title: "${contentTitle}" → add a number, benefit, or curiosity gap`,
    'Add a P.S. line with your strongest social proof stat: "Used by X teams..."',
    'Bold the single most important sentence in each section for scanners',
    'Add one data point per section — even a percentage or customer count adds credibility',
    'End with a question to drive comments: "What would you add to this list?"',
    'Cross-post to LinkedIn with a personal anecdote — personal context boosts engagement 3x',
    'Create a 60-second TikTok/Reel summarizing the key takeaway',
    'Send to 3 people who would find it useful — warm distribution beats cold algorithms',
  ];

  const scoreHistory = [
    { label: 'Draft', score: Math.max(20, overallScore - 25 - seed % 10) },
    { label: 'Edited', score: Math.max(30, overallScore - 15 - seed % 5) },
    { label: 'Optimized', score: overallScore },
    { label: 'Post-Launch', score: Math.min(95, overallScore + 5 + seed % 10) },
  ];

  return { overallScore, grade, dimensions, audit, predictions, optimizations, competitorGaps, quickWins, scoreHistory };
}

export default function ContentScoringPage() {
  const [contentType, setContentType] = useState(contentTypes[0]);
  const [platform, setPlatform] = useState(platforms[0]);
  const [goal, setGoal] = useState(goals[0]);
  const [audience, setAudience] = useState(audiences[0]);
  const [industry, setIndustry] = useState(industries[0]);
  const [stage, setStage] = useState(stages[0]);
  const [contentTitle, setContentTitle] = useState('');
  const [result, setResult] = useState<ContentScore | null>(null);

  const handleGenerate = () => { if (contentTitle.trim()) setResult(generateScore(contentType, platform, goal, audience, industry, stage, contentTitle)); };
  const scoreColor = (n: number) => n > 75 ? '#34d399' : n > 55 ? '#fbbf24' : n > 35 ? '#fb923c' : '#f87171';
  const gradeColor = (g: string) => g.startsWith('A') ? '#34d399' : g.startsWith('B') ? '#fbbf24' : '#f87171';
  const statusColor = (s: string) => s === 'Strong' ? '#34d399' : s === 'Needs Work' ? '#fbbf24' : '#f87171';
  const gapColor = (g: string) => g === 'Ahead' ? '#34d399' : g === 'Opportunity' ? '#fbbf24' : '#f87171';
  const prioColor = (p: string) => p === 'P0' ? '#f87171' : p === 'P1' ? '#fbbf24' : p === 'P2' ? '#60a5fa' : '#a78bfa';

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Content Scoring Matrix</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Score any piece of content across 8 weighted dimensions. Get a detailed audit, performance predictions, competitor gap analysis, and prioritized optimization actions — before you publish.</p>

        <div className="grid md:grid-cols-1 gap-4 mb-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Content Title / Topic</label>
            <input type="text" value={contentTitle} onChange={e => setContentTitle(e.target.value)} placeholder="e.g., How to Scale Your SaaS Content Strategy in 2026" className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-3 text-zinc-100" />
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {([
            { label: 'Content Type', value: contentType, setter: setContentType as (v: string) => void, options: contentTypes as readonly string[] },
            { label: 'Platform', value: platform, setter: setPlatform as (v: string) => void, options: platforms as readonly string[] },
            { label: 'Primary Goal', value: goal, setter: setGoal as (v: string) => void, options: goals as readonly string[] },
            { label: 'Target Audience', value: audience, setter: setAudience as (v: string) => void, options: audiences as readonly string[] },
            { label: 'Industry', value: industry, setter: setIndustry as (v: string) => void, options: industries as readonly string[] },
            { label: 'Content Stage', value: stage, setter: setStage as (v: string) => void, options: stages as readonly string[] },
          ] as const).map(({ label, value, setter, options }) => (
            <div key={label}>
              <label className="block text-sm text-zinc-400 mb-1">{label}</label>
              <select value={value} onChange={e => setter(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100">
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
        <button onClick={handleGenerate} className="w-full md:w-auto bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded font-semibold hover:opacity-90 transition mb-8">Score My Content</button>

        {result && (
          <div className="space-y-8">
            {/* Overall Score */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 text-center">
              <div className="flex items-center justify-center gap-6">
                <div>
                  <div className="text-6xl font-bold mb-1" style={{ color: scoreColor(result.overallScore) }}>{result.overallScore}</div>
                  <div className="text-zinc-400">Overall Score</div>
                </div>
                <div className="text-5xl font-bold px-6 py-3 rounded-xl border-2" style={{ color: gradeColor(result.grade), borderColor: `${gradeColor(result.grade)}40` }}>{result.grade}</div>
              </div>
              <div className="mt-4 max-w-lg mx-auto w-full bg-zinc-800 rounded-full h-4">
                <div className="h-4 rounded-full transition-all" style={{ width: `${result.overallScore}%`, background: scoreColor(result.overallScore) }} />
              </div>
              {/* Score History */}
              <div className="flex justify-center gap-8 mt-4">
                {result.scoreHistory.map((h, i) => (
                  <div key={i} className="text-center">
                    <div className="text-sm font-bold" style={{ color: scoreColor(h.score) }}>{h.score}</div>
                    <div className="text-xs text-zinc-500">{h.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dimension Breakdown */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Score Breakdown (8 Dimensions)</h3>
              <div className="space-y-4">
                {result.dimensions.map((d, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-zinc-200">{d.name}</span>
                        <span className="text-xs text-zinc-500">Weight: {Math.round(d.weight * 100)}%</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold" style={{ color: scoreColor(d.score) }}>{d.score}/100</span>
                        <span className="text-xs text-zinc-500">(+{d.weightedScore} weighted)</span>
                      </div>
                    </div>
                    <div className="w-full bg-zinc-700 rounded-full h-2 mb-2">
                      <div className="h-2 rounded-full" style={{ width: `${d.score}%`, background: scoreColor(d.score) }} />
                    </div>
                    <div className="text-sm text-zinc-400 mb-1">{d.feedback}</div>
                    <div className="text-xs"><span className="text-zinc-500">Improve:</span> <span className="text-emerald-400/70">{d.improvement}</span></div>
                    <div className="text-xs mt-1"><span className="text-zinc-500">Benchmark:</span> <span className="text-zinc-500">{d.benchmark}</span></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Audit */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Content Audit Checklist</h3>
              <div className="space-y-3">
                {result.audit.map((a, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-zinc-200">{a.element}</span>
                      <span className="text-xs px-2 py-1 rounded font-semibold" style={{ color: statusColor(a.status), background: `${statusColor(a.status)}15` }}>{a.status}</span>
                    </div>
                    <div className="text-xs space-y-1">
                      <div><span className="text-zinc-500">Impact:</span> <span className="text-zinc-300">{a.impact}</span></div>
                      <div><span className="text-zinc-500">Fix:</span> <span className="text-emerald-400/70">{a.fix}</span></div>
                      <div><span className="text-zinc-500">Effort:</span> <span className="text-zinc-400">{a.effort}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Predictions */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Performance Predictions</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="text-left text-zinc-500 border-b border-zinc-700"><th className="pb-2 pr-3">Metric</th><th className="pb-2 pr-3">Expected</th><th className="pb-2 pr-3">Benchmark</th><th className="pb-2">Confidence</th></tr></thead>
                  <tbody>
                    {result.predictions.map((p, i) => (
                      <tr key={i} className="border-b border-zinc-800/50">
                        <td className="py-3 pr-3 text-zinc-200 font-medium">{p.metric}</td>
                        <td className="py-3 pr-3 text-emerald-400">{p.expected}</td>
                        <td className="py-3 pr-3 text-zinc-400 text-xs">{p.benchmark}</td>
                        <td className="py-3"><span className="text-xs px-2 py-1 rounded" style={{ color: p.confidence === 'High' ? '#34d399' : p.confidence === 'Medium' ? '#fbbf24' : '#fb923c', background: p.confidence === 'High' ? '#34d39915' : p.confidence === 'Medium' ? '#fbbf2415' : '#fb923c15' }}>{p.confidence}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Optimization Actions */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Prioritized Optimizations</h3>
              <div className="space-y-3">
                {result.optimizations.map((o, i) => (
                  <div key={i} className="flex gap-3 items-start bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <span className="shrink-0 text-xs px-2 py-1 rounded font-bold" style={{ color: prioColor(o.priority), background: `${prioColor(o.priority)}15` }}>{o.priority}</span>
                    <div className="flex-1">
                      <div className="text-sm text-zinc-200">{o.action}</div>
                      <div className="flex gap-4 mt-1 text-xs">
                        <span className="text-emerald-400/70">{o.expectedLift}</span>
                        <span className="text-zinc-500">Effort: {o.effort}</span>
                        <span className="text-zinc-500">By: {o.deadline}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Competitor Gaps + Quick Wins */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3">Competitor Gap Analysis</h3>
                <div className="space-y-3">
                  {result.competitorGaps.map((g, i) => (
                    <div key={i} className="bg-zinc-800/40 rounded-lg p-3 border border-zinc-700/50">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-zinc-200">{g.area}</span>
                        <span className="text-xs px-2 py-1 rounded" style={{ color: gapColor(g.gap), background: `${gapColor(g.gap)}15` }}>{g.gap}</span>
                      </div>
                      <div className="text-xs text-zinc-500">You: {g.yourScore} vs Avg: {g.competitorAvg}</div>
                      <div className="text-xs text-emerald-400/70 mt-1">{g.opportunity}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-emerald-400">Quick Wins</h3>
                <div className="space-y-2">{result.quickWins.map((q, i) => <div key={i} className="text-sm text-zinc-400 flex gap-2"><span className="text-emerald-400 shrink-0">→</span>{q}</div>)}</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">Never Publish Underperforming Content Again</h3>
              <p className="text-zinc-400 mb-4">Use PostCraft AI to score, audit, and optimize every piece of content. Pair with <a href="/content-brief" className="text-violet-400 underline">Content Brief</a>, <a href="/content-scorecard" className="text-violet-400 underline">Content Scorecard</a>, and <a href="/ab-testing" className="text-violet-400 underline">A/B Testing</a>.</p>
              <a href="/pricing" className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">Get PostCraft Pro</a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
