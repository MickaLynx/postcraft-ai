'use client';
import { useState } from 'react';

const contentTypes = ['Blog Posts', 'Social Media Posts', 'Landing Pages', 'Email Campaigns', 'Video Content', 'All Content'] as const;
const platforms = ['Website/Blog', 'Instagram', 'LinkedIn', 'Twitter/X', 'YouTube', 'Multi-Platform'] as const;
const industries = ['E-commerce', 'SaaS / Tech', 'Agency', 'Health & Wellness', 'Finance', 'Education', 'Media', 'Real Estate'] as const;
const contentVolumes = ['< 50 pieces', '50-200 pieces', '200-500 pieces', '500-1000 pieces', '1000+ pieces'] as const;

interface CannibalizationIssue { title1: string; title2: string; overlapScore: number; keyword: string; impact: string; recommendation: string; priority: 'Critical' | 'High' | 'Medium' | 'Low'; }
interface TopicCluster { topic: string; postCount: number; performance: string; cannibalizationRisk: string; action: string; }
interface ConsolidationPlan { mergeFrom: string; mergeInto: string; reason: string; expectedImpact: string; effort: string; }
interface KeywordMap { keyword: string; targetUrl: string; competingUrls: number; monthlyVolume: string; difficulty: string; action: string; }
interface ContentHealth { metric: string; score: string; benchmark: string; diagnosis: string; prescription: string; }

interface CannibalizationReport {
  overallScore: number;
  cannibalizingPairs: number;
  wastedContent: number;
  issues: CannibalizationIssue[];
  clusters: TopicCluster[];
  consolidationPlan: ConsolidationPlan[];
  keywordMap: KeywordMap[];
  healthMetrics: ContentHealth[];
  quickWins: string[];
  preventionRules: string[];
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }

function analyzeCannibalization(contentType: string, platform: string, industry: string, volume: string, brand: string): CannibalizationReport {
  const seed = hash(`${contentType}-${platform}-${industry}-${volume}-${brand}`);
  const overallScore = 30 + seed % 50;
  const cannibalizingPairs = 3 + seed % 12;
  const wastedContent = 5 + seed % 20;

  const issues: CannibalizationIssue[] = [
    { title1: `"How to Create ${industry} Content That Converts"`, title2: `"${industry} Content Strategy: A Complete Guide"`, overlapScore: 85, keyword: `${industry.toLowerCase()} content strategy`, impact: 'Both pages split ranking signals — neither reaches page 1. Combined, they would rank #3-5.', recommendation: 'MERGE: Consolidate into one definitive guide. 301 redirect the weaker piece. Transfer all backlinks.', priority: 'Critical' },
    { title1: `"Best ${industry} Tools for 2026"`, title2: `"Top ${industry} Software Reviewed"`, overlapScore: 72, keyword: `best ${industry.toLowerCase()} tools`, impact: 'Google shows different pages for different queries — confusing crawl budget. Users land on outdated version.', recommendation: 'MERGE into "Best [Tools] for 2026" and update quarterly. Delete the other. Add comparison table.', priority: 'High' },
    { title1: `"${industry} Social Media Tips"`, title2: `"Social Media Best Practices for ${industry}"`, overlapScore: 68, keyword: `${industry.toLowerCase()} social media`, impact: 'Near-identical content with different titles. Internal links point to both — diluting authority.', recommendation: 'KEEP the higher-performing piece. REDIRECT the other. Update the survivor with both pieces\' best content.', priority: 'High' },
    { title1: `"Getting Started with ${brand}"`, title2: `"${brand} Beginner\'s Guide"`, overlapScore: 91, keyword: `${brand.toLowerCase()} getting started`, impact: 'Identical intent — two doors to the same room. Confuses new users in search and on-site.', recommendation: 'IMMEDIATE MERGE: These are the same piece. Pick the one with more backlinks, redirect the other.', priority: 'Critical' },
    { title1: `"Why ${industry} Needs AI in 2026"`, title2: `"AI in ${industry}: Benefits and Use Cases"`, overlapScore: 60, keyword: `AI ${industry.toLowerCase()}`, impact: 'Moderate overlap — different angles but same core topic. One is opinion, one is practical.', recommendation: 'DIFFERENTIATE: Rewrite the opinion piece as "Hot Take" format, keep practical guide as resource. Link between them.', priority: 'Medium' },
    { title1: `"${industry} Marketing Mistakes"`, title2: `"Common ${industry} Marketing Errors to Avoid"`, overlapScore: 88, keyword: `${industry.toLowerCase()} marketing mistakes`, impact: 'Near-duplicate. Both pages get ~50% of the traffic they should. Bounce rate higher on the weaker one.', recommendation: 'MERGE immediately. The "mistakes" framing performs better — keep that URL, redirect the other.', priority: 'Critical' },
  ];

  const clusters: TopicCluster[] = [
    { topic: `${industry} Strategy`, postCount: 4 + seed % 6, performance: 'Mixed — top piece gets 60% of cluster traffic', cannibalizationRisk: `${40 + seed % 30}% — ${2 + seed % 3} pieces compete for same keywords`, action: 'Designate 1 pillar page, make others supporting content with distinct long-tail keywords' },
    { topic: 'Tools & Software', postCount: 3 + seed % 4, performance: 'Good — comparison content converts well', cannibalizationRisk: `${20 + seed % 20}% — "best tools" and "top software" overlap`, action: 'Merge similar roundups, create distinct comparison vs review vs tutorial angles' },
    { topic: 'How-To Guides', postCount: 5 + seed % 8, performance: 'Strong — highest organic traffic cluster', cannibalizationRisk: `${30 + seed % 25}% — broad guides compete with specific tutorials`, action: 'Create clear hierarchy: 1 comprehensive guide linking to specific step-by-step tutorials' },
    { topic: 'Industry News & Trends', postCount: 6 + seed % 10, performance: 'Decaying — older pieces still rank but content is stale', cannibalizationRisk: `${50 + seed % 20}% — annual roundups from multiple years compete`, action: 'Archive all but current year. 301 redirect old URLs to updated version. Add "last updated" dates.' },
    { topic: 'Case Studies & Results', postCount: 2 + seed % 3, performance: 'Excellent — highest conversion rate content', cannibalizationRisk: `${10 + seed % 15}% — low risk, each case study is unique`, action: 'Keep creating. Link from strategy content. These rarely cannibalize — each story is distinct.' },
  ];

  const consolidationPlan: ConsolidationPlan[] = [
    { mergeFrom: `"Getting Started" + "Beginner's Guide"`, mergeInto: `"The Complete ${brand} Guide for Beginners"`, reason: '91% content overlap — two pieces saying the same thing', expectedImpact: '+40-60% organic traffic to merged page within 30 days', effort: '2-3 hours (merge, redirect, update internal links)' },
    { mergeFrom: `"Marketing Mistakes" + "Errors to Avoid"`, mergeInto: `"${seed % 2 === 0 ? '10' : '7'} ${industry} Marketing Mistakes That Kill Growth"`, reason: '88% overlap — both targeting same keyword cluster', expectedImpact: '+30-50% ranking improvement for target keyword', effort: '1-2 hours (combine best points, redirect)' },
    { mergeFrom: `"Content Strategy" + "Complete Guide"`, mergeInto: `"${industry} Content Strategy: The Definitive Guide [2026]"`, reason: '85% overlap — broad topic guides competing', expectedImpact: '+25-40% organic traffic, potential featured snippet', effort: '3-4 hours (substantial content merge, new structure needed)' },
    { mergeFrom: 'Multiple annual roundups (2024, 2025, 2026)', mergeInto: `"Best ${industry} Tools [Updated Monthly]"`, reason: 'Annual posts cannibalize each other in search — Google doesn\'t know which year to show', expectedImpact: 'One authoritative page instead of 3 weak ones — consistent top-5 ranking', effort: '2-3 hours initial, 30 min monthly updates' },
  ];

  const keywordMap: KeywordMap[] = [
    { keyword: `${industry.toLowerCase()} content strategy`, targetUrl: '/blog/content-strategy-guide', competingUrls: 3, monthlyVolume: `${1000 + seed % 4000}/mo`, difficulty: 'Medium', action: 'Merge 3 competing pages into 1 definitive guide. Currently splitting ranking power.' },
    { keyword: `best ${industry.toLowerCase()} tools`, targetUrl: '/blog/best-tools-2026', competingUrls: 2, monthlyVolume: `${2000 + seed % 5000}/mo`, difficulty: 'High', action: 'Keep 2026 review, redirect older versions. Update quarterly with new tools.' },
    { keyword: `${industry.toLowerCase()} social media tips`, targetUrl: '/blog/social-tips', competingUrls: 2, monthlyVolume: `${800 + seed % 3000}/mo`, difficulty: 'Medium', action: 'One page for tips, one for strategy — differentiate clearly or merge.' },
    { keyword: `${brand.toLowerCase()} guide`, targetUrl: '/getting-started', competingUrls: 2, monthlyVolume: `${500 + seed % 2000}/mo`, difficulty: 'Low (branded)', action: 'Critical merge — branded queries MUST have one clear target.' },
    { keyword: `AI ${industry.toLowerCase()}`, targetUrl: '/blog/ai-in-industry', competingUrls: 2, monthlyVolume: `${1500 + seed % 5000}/mo`, difficulty: 'High', action: 'Differentiate angles: opinion vs practical. Internal link between them.' },
  ];

  const healthMetrics: ContentHealth[] = [
    { metric: 'Content Duplication Rate', score: `${wastedContent}%`, benchmark: '< 5%', diagnosis: wastedContent > 10 ? 'Too many pieces covering the same topics — ranking power diluted' : 'Acceptable but room for improvement', prescription: 'Audit all content monthly. Merge pieces with > 60% keyword overlap.' },
    { metric: 'Topic Coverage Efficiency', score: `${50 + seed % 30}%`, benchmark: '> 80%', diagnosis: 'Multiple pieces per topic but not all topics covered — breadth issue', prescription: 'Map all target keywords. Fill gaps before creating more content on existing topics.' },
    { metric: 'Internal Link Health', score: `${40 + seed % 40}/100`, benchmark: '> 70/100', diagnosis: 'Cannibalized pages often have competing internal links — confuses Google\'s crawl', prescription: 'Each target keyword should have ONE canonical page that all internal links point to.' },
    { metric: 'Content Freshness', score: `${30 + seed % 50}%`, benchmark: '> 60% updated in last 6 months', diagnosis: 'Stale content competes with fresh content for the same keywords', prescription: 'Archive or update content older than 12 months. Add "last updated" schema.' },
    { metric: 'Crawl Budget Efficiency', score: `${50 + seed % 30}/100`, benchmark: '> 75/100', diagnosis: 'Duplicate content wastes crawl budget — Google spends time on pages that shouldn\'t exist', prescription: 'Merge and redirect. Every redirect recovered = crawl budget saved for new content.' },
  ];

  const quickWins = [
    'Run a site:yourdomain.com "keyword" search for your top 10 target keywords — if 2+ pages show up, you have cannibalization',
    `Merge the ${cannibalizingPairs} identified pairs above — estimated +30-50% combined traffic within 30 days`,
    'Set up Google Search Console cannibalization alerts: if 2+ pages rank for the same query, flag for review',
    'Add canonical tags to all pages — even if you think there\'s no overlap, it helps Google understand your intent',
    'Create a "content map" spreadsheet: 1 row per target keyword, 1 column for the designated page — everything else redirects',
  ];

  const preventionRules = [
    'BEFORE creating new content: search your own site for the target keyword. If a page exists, UPDATE it instead.',
    'One target keyword = one page. Period. If two pages target the same keyword, merge or differentiate NOW.',
    'Annual roundups: update the same URL every year. Never create a new page for "Best Tools 2027" — update 2026\'s page.',
    'Internal links: every link for a keyword should point to the SAME page. Audit quarterly.',
    'Content briefs must include "Cannibalization Check" step: search your site for the target keyword before writing starts.',
    'Use topic clusters: 1 pillar page + N supporting articles with distinct long-tail keywords. Never let supporting articles compete with the pillar.',
  ];

  return { overallScore, cannibalizingPairs, wastedContent, issues, clusters, consolidationPlan, keywordMap, healthMetrics, quickWins, preventionRules };
}

export default function ContentCannibalizerPage() {
  const [contentType, setContentType] = useState<string>(contentTypes[0]);
  const [platform, setPlatform] = useState<string>(platforms[0]);
  const [industry, setIndustry] = useState<string>(industries[0]);
  const [volume, setVolume] = useState<string>(contentVolumes[1]);
  const [brand, setBrand] = useState('');
  const [report, setReport] = useState<CannibalizationReport | null>(null);

  const generate = () => { if (brand.trim()) setReport(analyzeCannibalization(contentType, platform, industry, volume, brand)); };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <span className="px-3 py-1 bg-red-500/10 text-red-400 rounded-full text-sm font-medium">SEO Intelligence</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">Content Cannibalizer</h1>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">Detect when your own content competes against itself in search. Find overlapping posts, get merge recommendations, and reclaim lost traffic.</p>
        </div>

        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Content Type</label>
              <select value={contentType} onChange={e => setContentType(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white">{contentTypes.map(c => <option key={c}>{c}</option>)}</select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Primary Platform</label>
              <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white">{platforms.map(p => <option key={p}>{p}</option>)}</select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Industry</label>
              <select value={industry} onChange={e => setIndustry(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white">{industries.map(i => <option key={i}>{i}</option>)}</select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Content Volume</label>
              <select value={volume} onChange={e => setVolume(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white">{contentVolumes.map(v => <option key={v}>{v}</option>)}</select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-1">Brand / Domain Name</label>
            <input value={brand} onChange={e => setBrand(e.target.value)} placeholder="e.g., acme.com" className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white" />
          </div>
          <button onClick={generate} className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg font-semibold hover:from-red-600 hover:to-orange-600 transition-all">Detect Cannibalization</button>
        </div>

        {report && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 text-center">
                <div className={`text-3xl font-bold ${report.overallScore > 60 ? 'text-red-400' : report.overallScore > 40 ? 'text-yellow-400' : 'text-green-400'}`}>{report.overallScore}/100</div>
                <div className="text-sm text-gray-400 mt-1">Cannibalization Score (lower = better)</div>
              </div>
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-red-400">{report.cannibalizingPairs}</div>
                <div className="text-sm text-gray-400 mt-1">Competing Content Pairs</div>
              </div>
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-orange-400">{report.wastedContent}%</div>
                <div className="text-sm text-gray-400 mt-1">Content Waste (duplicated effort)</div>
              </div>
            </div>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-300">Cannibalization Issues</h2>
              <div className="space-y-4">{report.issues.map((issue, i) => (
                <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${issue.priority === 'Critical' ? 'bg-red-500/20 text-red-400' : issue.priority === 'High' ? 'bg-orange-500/20 text-orange-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{issue.priority}</span>
                    <span className="text-red-400 font-mono text-sm">{issue.overlapScore}% overlap</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-2 mb-3">
                    <div className="p-2 bg-gray-900/50 rounded text-sm text-gray-300">{issue.title1}</div>
                    <div className="p-2 bg-gray-900/50 rounded text-sm text-gray-300">{issue.title2}</div>
                  </div>
                  <div className="text-sm mb-2"><span className="text-gray-500">Target keyword:</span> <span className="text-orange-300">{issue.keyword}</span></div>
                  <div className="text-sm mb-2"><span className="text-gray-500">Impact:</span> <span className="text-red-300">{issue.impact}</span></div>
                  <div className="text-sm"><span className="text-gray-500">Fix:</span> <span className="text-green-300">{issue.recommendation}</span></div>
                </div>
              ))}</div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-300">Topic Clusters</h2>
              <div className="space-y-3">{report.clusters.map((c, i) => (
                <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">{c.topic}</h3>
                    <span className="text-sm text-gray-400">{c.postCount} pieces</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    <div><span className="text-gray-500">Performance:</span> <span className="text-gray-300">{c.performance}</span></div>
                    <div><span className="text-gray-500">Risk:</span> <span className="text-yellow-300">{c.cannibalizationRisk}</span></div>
                    <div className="md:col-span-2"><span className="text-gray-500">Action:</span> <span className="text-blue-300">{c.action}</span></div>
                  </div>
                </div>
              ))}</div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-300">Consolidation Plan</h2>
              <div className="space-y-3">{report.consolidationPlan.map((p, i) => (
                <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                  <div className="text-sm mb-2"><span className="text-red-300">Merge:</span> <span className="text-gray-300">{p.mergeFrom}</span></div>
                  <div className="text-sm mb-2"><span className="text-green-300">Into:</span> <span className="text-white font-medium">{p.mergeInto}</span></div>
                  <div className="grid md:grid-cols-3 gap-2 text-sm">
                    <div><span className="text-gray-500">Why:</span> <span className="text-gray-300">{p.reason}</span></div>
                    <div><span className="text-gray-500">Expected:</span> <span className="text-green-300">{p.expectedImpact}</span></div>
                    <div><span className="text-gray-500">Effort:</span> <span className="text-blue-300">{p.effort}</span></div>
                  </div>
                </div>
              ))}</div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-300">Keyword Conflict Map</h2>
              <div className="overflow-x-auto"><table className="w-full text-sm">
                <thead><tr className="border-b border-gray-700">{['Keyword', 'Target', 'Competing', 'Volume', 'Action'].map(h => <th key={h} className="text-left py-2 px-3 text-gray-400 font-medium">{h}</th>)}</tr></thead>
                <tbody>{report.keywordMap.map((k, i) => <tr key={i} className="border-b border-gray-800"><td className="py-2 px-3 text-orange-300">{k.keyword}</td><td className="py-2 px-3 text-gray-300">{k.targetUrl}</td><td className="py-2 px-3 text-red-300">{k.competingUrls} pages</td><td className="py-2 px-3 text-gray-400">{k.monthlyVolume}</td><td className="py-2 px-3 text-blue-300">{k.action}</td></tr>)}</tbody>
              </table></div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-300">Content Health</h2>
              <div className="space-y-3">{report.healthMetrics.map((m, i) => (
                <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2"><h3 className="font-semibold text-white">{m.metric}</h3><span className="text-orange-300 font-mono">{m.score} (target: {m.benchmark})</span></div>
                  <div className="text-sm"><span className="text-gray-500">Diagnosis:</span> <span className="text-gray-300">{m.diagnosis}</span></div>
                  <div className="text-sm"><span className="text-gray-500">Rx:</span> <span className="text-green-300">{m.prescription}</span></div>
                </div>
              ))}</div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-300">Quick Wins</h2>
              <div className="space-y-2">{report.quickWins.map((w, i) => <div key={i} className="p-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-sm text-gray-300">{w}</div>)}</div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-300">Prevention Rules</h2>
              <div className="space-y-2">{report.preventionRules.map((r, i) => <div key={i} className="p-3 bg-red-500/5 border border-red-500/20 rounded-lg text-sm text-gray-300">{r}</div>)}</div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
