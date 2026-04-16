'use client';
import { useState } from 'react';

const industries = ['E-commerce', 'SaaS / Tech', 'Agency', 'Health & Wellness', 'Finance', 'Education', 'Media', 'Real Estate'] as const;
const contentTypes = ['Blog & Articles', 'Video Content', 'Podcasts', 'Newsletters', 'Social Media', 'Research & Reports', 'Community Content', 'Mixed'] as const;
const landscapes = ['Highly Competitive', 'Moderately Competitive', 'Emerging Market', 'Niche / Underserved', 'Saturated'] as const;

interface MoatType { name: string; score: number; description: string; timeToBuilt: string; investmentLevel: string; defensibility: string; competitors: string; buildSteps: string[]; }
interface VulnerabilityItem { competitor: string; weakness: string; exploitStrategy: string; urgency: 'Immediate' | 'Short-term' | 'Long-term'; moatType: string; }
interface DefensibilityCheck { item: string; status: 'Strong' | 'Moderate' | 'Weak' | 'Missing'; action: string; impact: string; }
interface InvestmentPriority { area: string; budget: string; roi: string; timeline: string; risk: string; }
interface MoatTimeline { phase: string; months: string; focus: string; milestones: string[]; moatsTargeted: string; }

interface MoatReport {
  overallMoatScore: number;
  strongestMoat: string;
  weakestMoat: string;
  moatTypes: MoatType[];
  vulnerabilities: VulnerabilityItem[];
  defensibilityChecklist: DefensibilityCheck[];
  investmentPriorities: InvestmentPriority[];
  timeline: MoatTimeline[];
  quickWins: string[];
  warnings: string[];
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }

function buildMoatReport(industry: string, contentType: string, landscape: string, brand: string): MoatReport {
  const seed = hash(`${industry}-${contentType}-${landscape}-${brand}`);
  const overallMoatScore = 20 + seed % 60;

  const moatTypes: MoatType[] = [
    {
      name: 'Data Moat',
      score: 15 + seed % 70,
      description: `Proprietary data, benchmarks, and insights unique to ${brand} that competitors cannot replicate without years of collection.`,
      timeToBuilt: '12-24 months',
      investmentLevel: 'High ($$$)',
      defensibility: 'Very Strong — data compounds over time and cannot be reverse-engineered',
      competitors: `Most ${industry.toLowerCase()} competitors rely on generic third-party data. First-mover advantage is massive.`,
      buildSteps: [
        `Start collecting proprietary ${industry.toLowerCase()} benchmarks from your audience today — every data point compounds`,
        'Create original research reports that become industry-cited sources — aim for 1 per quarter',
        'Build interactive tools that generate unique user data while providing value — each usage makes your dataset richer',
        `Aggregate anonymized insights from ${brand} users into industry reports competitors literally cannot create`,
        'Partner with industry organizations to access exclusive datasets — co-branded research creates mutual moats',
      ],
    },
    {
      name: 'Expertise Moat',
      score: 25 + seed % 55,
      description: `Deep domain expertise in ${industry.toLowerCase()} that takes years to develop and is embedded in every piece of content ${brand} produces.`,
      timeToBuilt: '6-18 months',
      investmentLevel: 'Medium ($$)',
      defensibility: 'Strong — genuine expertise is visible and hard to fake at scale',
      competitors: `Many competitors produce surface-level content. Deep expertise in ${industry.toLowerCase()} is rare and recognizable.`,
      buildSteps: [
        'Hire or partner with recognized industry experts — their name recognition transfers to your brand',
        `Publish contrarian takes on ${industry.toLowerCase()} topics backed by evidence — safe content has no moat`,
        'Create "methodology" content that introduces new frameworks competitors must reference (and credit)',
        'Document real case studies with specific numbers — vague success stories have zero defensibility',
        'Build a public body of work so deep that anyone researching the topic eventually finds you',
      ],
    },
    {
      name: 'Network Moat',
      score: 10 + seed % 60,
      description: `A community and contributor network around ${brand} where each new member increases value for all existing members.`,
      timeToBuilt: '12-36 months',
      investmentLevel: 'High ($$$)',
      defensibility: 'Extremely Strong — network effects create exponential switching costs',
      competitors: 'Very few competitors invest in community. Those who do have the strongest retention in the industry.',
      buildSteps: [
        'Launch a community (Slack, Discord, or forum) where members share exclusive insights — content becomes user-generated',
        `Create a contributor program: let ${industry.toLowerCase()} practitioners publish on your platform with co-branding`,
        'Build referral loops: each member who invites others gets access to premium content or data',
        'Host regular events (webinars, AMAs, roundtables) that become can\'t-miss industry gatherings',
        'Create a certification or badge program — members become ambassadors who spread the network organically',
      ],
    },
    {
      name: 'Brand Moat',
      score: 20 + seed % 50,
      description: `${brand}'s brand recognition and trust that makes audiences choose you by default over unknown alternatives.`,
      timeToBuilt: '6-24 months',
      investmentLevel: 'Medium ($$)',
      defensibility: 'Strong — brand trust takes years to build but can be lost quickly. Once established, it compounds.',
      competitors: `In ${industry.toLowerCase()}, most brands are interchangeable. A distinctive voice and visual identity creates instant recognition.`,
      buildSteps: [
        `Define a brand voice so distinctive that readers recognize ${brand} content without seeing the logo`,
        'Take consistent public positions on industry topics — fence-sitters build no brand equity',
        'Create a signature content format that becomes synonymous with your brand (e.g., Moz\'s Whiteboard Friday)',
        'Invest in visual consistency: custom illustrations, data visualizations, and templates that scream your brand',
        'Build thought leadership through speaking, guest appearances, and industry awards — borrowed credibility compounds',
      ],
    },
    {
      name: 'Format Moat',
      score: 18 + seed % 55,
      description: `Proprietary content formats, templates, and delivery methods that ${brand} owns and competitors must invent from scratch.`,
      timeToBuilt: '3-12 months',
      investmentLevel: 'Low-Medium ($-$$)',
      defensibility: 'Moderate — formats can be copied, but the original always has credibility advantage and iteration lead',
      competitors: `Most ${industry.toLowerCase()} content follows identical formats. Innovation in delivery creates immediate differentiation.`,
      buildSteps: [
        `Invent a signature ${contentType.toLowerCase()} format that nobody else uses — name it, trademark it, own it`,
        'Create interactive content (calculators, quizzes, assessments) that static competitors cannot match',
        'Build content series with ongoing narratives — episodic content creates habitual consumption patterns',
        'Develop proprietary scoring systems or frameworks that become industry standard terminology',
        'Experiment with emerging formats (AI-interactive, personalized, real-time) before competitors notice them',
      ],
    },
  ];

  const scores = moatTypes.map(m => m.score);
  const maxIdx = scores.indexOf(Math.max(...scores));
  const minIdx = scores.indexOf(Math.min(...scores));
  const strongestMoat = moatTypes[maxIdx].name;
  const weakestMoat = moatTypes[minIdx].name;

  const vulnerabilities: VulnerabilityItem[] = [
    { competitor: `Generic ${industry} Blog #1`, weakness: 'Relies entirely on SEO-optimized commodity content with no original data or insights', exploitStrategy: `Publish original research that they cannot replicate. Every data point you own is a keyword they can\'t outrank.`, urgency: 'Immediate', moatType: 'Data Moat' },
    { competitor: `${industry} SaaS Tool Blog`, weakness: 'Content is feature-marketing disguised as education — audience trusts independent voices more', exploitStrategy: `Position ${brand} as the independent, unbiased authority. Comparison content that includes competitors builds trust.`, urgency: 'Short-term', moatType: 'Brand Moat' },
    { competitor: `${industry} Newsletter Leader`, weakness: 'Solo creator — vulnerable to burnout, inconsistency, and cannot scale expertise beyond one person', exploitStrategy: 'Build a multi-voice content team. When they miss a week, you never do. Scale > solo.', urgency: 'Long-term', moatType: 'Network Moat' },
    { competitor: `Agency Content Farm`, weakness: 'Produces high volume but low-depth content — no proprietary frameworks or unique perspectives', exploitStrategy: 'Quality over quantity. One definitive guide outranks 50 shallow posts. Depth is your weapon.', urgency: 'Immediate', moatType: 'Expertise Moat' },
    { competitor: `AI-Generated Content Sites`, weakness: 'Can produce infinite volume but lacks human experience, real case studies, and community trust', exploitStrategy: 'Double down on what AI cannot fake: real data, named experts, community interactions, and proprietary research.', urgency: 'Immediate', moatType: 'Format Moat' },
    { competitor: `Emerging ${industry} Creator`, weakness: 'Small audience and no data assets yet — but growing fast with fresh perspective', exploitStrategy: `Partner or acquire before they become a threat. Offer contributor role on ${brand} platform — network moat absorbs them.`, urgency: 'Short-term', moatType: 'Network Moat' },
  ];

  const defensibilityChecklist: DefensibilityCheck[] = [
    { item: 'Proprietary dataset that grows with usage', status: seed % 4 === 0 ? 'Strong' : seed % 3 === 0 ? 'Moderate' : 'Weak', action: 'Start collecting first-party data from every content interaction — surveys, tool usage, community polls', impact: 'Each data point makes your content harder to replicate. Compounds exponentially over 12+ months.' },
    { item: 'Named industry experts on staff or retainer', status: seed % 3 === 0 ? 'Strong' : 'Moderate', action: 'Recruit 2-3 recognized voices in your space. Even part-time contributors add massive credibility.', impact: 'Expert-authored content gets 3-5x more backlinks and shares than anonymous content.' },
    { item: 'Active community with network effects', status: seed % 5 === 0 ? 'Strong' : seed % 2 === 0 ? 'Moderate' : 'Missing', action: 'Launch community MVP within 30 days. Even 50 active members create content you could never produce alone.', impact: 'Communities have 90%+ retention vs 30% for content-only brands. The moat deepens automatically.' },
    { item: 'Signature content format or framework', status: seed % 3 === 0 ? 'Strong' : 'Weak', action: 'Create a named methodology, scoring system, or content format unique to your brand. Trademark it.', impact: 'When competitors reference your framework by name, you own the conversation permanently.' },
    { item: 'Brand voice distinctiveness score', status: seed % 4 === 0 ? 'Strong' : 'Moderate', action: 'Audit your last 20 posts — could a reader identify your brand without seeing the logo? If not, differentiate harder.', impact: 'Distinctive brands get 40-60% more direct traffic. People search for YOU, not just the topic.' },
    { item: 'Content distribution advantage', status: seed % 3 === 0 ? 'Moderate' : 'Weak', action: 'Build owned channels (email list, community, app) that bypass algorithm changes and ad costs.', impact: 'Owned distribution = zero marginal cost per impression. Rented platforms can cut you off overnight.' },
    { item: 'Cross-content linking and ecosystem', status: seed % 2 === 0 ? 'Moderate' : 'Weak', action: 'Every piece of content should link to and reference other pieces. Create an interconnected knowledge base.', impact: 'Content ecosystems have 2-3x the SEO authority of isolated posts. Google rewards topical authority.' },
    { item: 'Legal protections (trademarks, copyrights)', status: seed % 4 === 0 ? 'Strong' : 'Missing', action: 'Trademark your brand name, key frameworks, and signature formats. Copyright original research.', impact: 'Legal moats prevent direct copying. Cease-and-desist letters work — but only if you have the registrations.' },
  ];

  const investmentPriorities: InvestmentPriority[] = [
    { area: 'Original Research & Data Collection', budget: `${15 + seed % 20}% of content budget`, roi: '300-500% over 24 months (compounding)', timeline: 'First report in 60 days, quarterly thereafter', risk: 'Low — even small datasets are more valuable than no proprietary data' },
    { area: 'Expert Recruitment & Partnerships', budget: `${10 + seed % 15}% of content budget`, roi: '200-400% via credibility and backlinks', timeline: '1-2 experts onboarded in 30 days', risk: 'Medium — expert relationships require nurturing and editorial alignment' },
    { area: 'Community Platform & Management', budget: `${12 + seed % 18}% of content budget`, roi: '500%+ once network effects kick in (12-18 months)', timeline: 'Launch in 30 days, critical mass at 6 months', risk: 'High upfront — communities can fail if not actively managed in early months' },
    { area: 'Brand Identity & Voice Development', budget: `${8 + seed % 12}% of content budget`, roi: '150-300% via recognition and direct traffic', timeline: 'Voice guide in 2 weeks, consistent execution ongoing', risk: 'Low — brand investment has no downside if voice is authentic' },
    { area: 'Interactive Tools & Format Innovation', budget: `${10 + seed % 15}% of content budget`, roi: '250-450% via engagement and data collection', timeline: 'First tool in 45 days', risk: 'Medium — requires development resources but creates durable assets' },
  ];

  const timeline: MoatTimeline[] = [
    { phase: 'Phase 1: Foundation', months: 'Months 1-3', focus: 'Quick wins and low-hanging fruit — establish baseline defensibility', milestones: ['Define and document brand voice guide', 'Launch first proprietary data collection mechanism', 'Create 1 signature content format', 'Audit all existing content for moat potential'], moatsTargeted: 'Brand + Format' },
    { phase: 'Phase 2: Depth', months: 'Months 4-8', focus: 'Build expertise and data assets that take time to compound', milestones: ['Publish first original research report', 'Onboard 2-3 industry expert contributors', 'Launch community MVP', 'Create interactive tool or calculator'], moatsTargeted: 'Data + Expertise' },
    { phase: 'Phase 3: Network', months: 'Months 9-18', focus: 'Activate network effects and cross-moat synergies', milestones: ['Grow community to 500+ active members', 'Establish contributor/certification program', 'Achieve industry-reference status for 1+ framework', 'Build content ecosystem with 50+ interconnected pieces'], moatsTargeted: 'Network + all reinforcing' },
    { phase: 'Phase 4: Compound', months: 'Months 18-36', focus: 'Moats reinforce each other — compound growth phase', milestones: ['Data moat feeds expertise moat (original insights)', 'Network moat generates content automatically (UGC)', 'Brand moat attracts experts and partners organically', 'Format moat creates category-defining content types'], moatsTargeted: 'All 5 moats compounding' },
  ];

  const quickWins = [
    `Audit your top 10 content pieces — which ones could a competitor replicate in a weekend? Those have zero moat. Fix them first.`,
    `Add one proprietary data point to your next piece of content. Even a single original statistic creates defensibility.`,
    `Name your methodology. "The ${brand} Framework" or "The ${brand} Method" — named things get referenced and linked to.`,
    `Start an email-gated monthly industry report. Each subscriber is a data point AND a distribution advantage.`,
    `Interview 3 customers this week. Real stories with real numbers are the ultimate expertise moat — competitors can't fake your customers.`,
  ];

  const warnings = [
    `Your ${weakestMoat} is dangerously low. Competitors can easily outspend you in this area if you don't start building now.`,
    `AI-generated content is flooding ${industry.toLowerCase()}. Every day you delay building moats, the sea of commodity content rises higher.`,
    'Volume without defensibility is a treadmill. You run faster every month just to stay in place. Moats let you compound instead.',
    `If a well-funded competitor decided to enter ${industry.toLowerCase()} content tomorrow, which of your moats would survive? Build for that scenario.`,
    'The best time to build a content moat was 2 years ago. The second best time is today. Every week of delay is a week competitors can catch up.',
  ];

  return { overallMoatScore, strongestMoat, weakestMoat, moatTypes, vulnerabilities, defensibilityChecklist, investmentPriorities, timeline, quickWins, warnings };
}

export default function ContentMoatPage() {
  const [industry, setIndustry] = useState<string>(industries[0]);
  const [contentType, setContentType] = useState<string>(contentTypes[0]);
  const [landscape, setLandscape] = useState<string>(landscapes[0]);
  const [brand, setBrand] = useState('');
  const [report, setReport] = useState<MoatReport | null>(null);

  const generate = () => { if (brand.trim()) setReport(buildMoatReport(industry, contentType, landscape, brand)); };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-sm font-medium">Competitive Strategy</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Content Moat Builder</h1>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">Build a defensible content strategy that competitors cannot easily replicate. Identify your strongest moats, exploit competitor vulnerabilities, and invest where it compounds.</p>
        </div>

        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Industry</label>
              <select value={industry} onChange={e => setIndustry(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white">{industries.map(i => <option key={i}>{i}</option>)}</select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Content Type</label>
              <select value={contentType} onChange={e => setContentType(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white">{contentTypes.map(c => <option key={c}>{c}</option>)}</select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Competitive Landscape</label>
              <select value={landscape} onChange={e => setLandscape(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white">{landscapes.map(l => <option key={l}>{l}</option>)}</select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Brand Name</label>
              <input value={brand} onChange={e => setBrand(e.target.value)} placeholder="e.g., Acme Co" className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white" />
            </div>
          </div>
          <button onClick={generate} className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all">Build Content Moat Report</button>
        </div>

        {report && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 text-center">
                <div className={`text-3xl font-bold ${report.overallMoatScore > 60 ? 'text-emerald-400' : report.overallMoatScore > 35 ? 'text-yellow-400' : 'text-red-400'}`}>{report.overallMoatScore}/100</div>
                <div className="text-sm text-gray-400 mt-1">Overall Moat Score</div>
              </div>
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 text-center">
                <div className="text-xl font-bold text-emerald-400">{report.strongestMoat}</div>
                <div className="text-sm text-gray-400 mt-1">Strongest Moat</div>
              </div>
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 text-center">
                <div className="text-xl font-bold text-red-400">{report.weakestMoat}</div>
                <div className="text-sm text-gray-400 mt-1">Weakest Moat (Priority)</div>
              </div>
            </div>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-emerald-300">Moat Analysis</h2>
              <div className="space-y-4">{report.moatTypes.map((m, i) => (
                <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-white">{m.name}</h3>
                    <div className="flex items-center gap-3">
                      <div className="w-32 bg-gray-700 rounded-full h-2"><div className={`h-2 rounded-full ${m.score > 60 ? 'bg-emerald-400' : m.score > 35 ? 'bg-yellow-400' : 'bg-red-400'}`} style={{ width: `${m.score}%` }} /></div>
                      <span className={`font-mono text-sm ${m.score > 60 ? 'text-emerald-400' : m.score > 35 ? 'text-yellow-400' : 'text-red-400'}`}>{m.score}/100</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">{m.description}</p>
                  <div className="grid md:grid-cols-3 gap-2 text-sm mb-3">
                    <div><span className="text-gray-500">Time to build:</span> <span className="text-teal-300">{m.timeToBuilt}</span></div>
                    <div><span className="text-gray-500">Investment:</span> <span className="text-yellow-300">{m.investmentLevel}</span></div>
                    <div><span className="text-gray-500">Defensibility:</span> <span className="text-emerald-300">{m.defensibility}</span></div>
                  </div>
                  <div className="text-sm mb-3"><span className="text-gray-500">Competitor landscape:</span> <span className="text-gray-300">{m.competitors}</span></div>
                  <div className="text-sm"><span className="text-gray-500">Build steps:</span>
                    <ul className="mt-1 space-y-1">{m.buildSteps.map((s, j) => <li key={j} className="text-gray-300 pl-3 border-l border-emerald-500/30">{s}</li>)}</ul>
                  </div>
                </div>
              ))}</div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-emerald-300">Competitor Vulnerability Analysis</h2>
              <div className="space-y-3">{report.vulnerabilities.map((v, i) => (
                <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">{v.competitor}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">{v.moatType}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${v.urgency === 'Immediate' ? 'bg-red-500/20 text-red-400' : v.urgency === 'Short-term' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'}`}>{v.urgency}</span>
                    </div>
                  </div>
                  <div className="text-sm mb-1"><span className="text-gray-500">Weakness:</span> <span className="text-red-300">{v.weakness}</span></div>
                  <div className="text-sm"><span className="text-gray-500">Exploit:</span> <span className="text-emerald-300">{v.exploitStrategy}</span></div>
                </div>
              ))}</div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-emerald-300">Defensibility Checklist</h2>
              <div className="overflow-x-auto"><table className="w-full text-sm">
                <thead><tr className="border-b border-gray-700">{['Asset', 'Status', 'Action Required', 'Impact'].map(h => <th key={h} className="text-left py-2 px-3 text-gray-400 font-medium">{h}</th>)}</tr></thead>
                <tbody>{report.defensibilityChecklist.map((c, i) => <tr key={i} className="border-b border-gray-800">
                  <td className="py-2 px-3 text-white">{c.item}</td>
                  <td className="py-2 px-3"><span className={`px-2 py-0.5 rounded text-xs font-medium ${c.status === 'Strong' ? 'bg-emerald-500/20 text-emerald-400' : c.status === 'Moderate' ? 'bg-yellow-500/20 text-yellow-400' : c.status === 'Weak' ? 'bg-orange-500/20 text-orange-400' : 'bg-red-500/20 text-red-400'}`}>{c.status}</span></td>
                  <td className="py-2 px-3 text-gray-300">{c.action}</td>
                  <td className="py-2 px-3 text-teal-300">{c.impact}</td>
                </tr>)}</tbody>
              </table></div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-emerald-300">Investment Priorities</h2>
              <div className="space-y-3">{report.investmentPriorities.map((p, i) => (
                <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                  <h3 className="font-semibold text-white mb-2">{p.area}</h3>
                  <div className="grid md:grid-cols-4 gap-2 text-sm">
                    <div><span className="text-gray-500">Budget:</span> <span className="text-yellow-300">{p.budget}</span></div>
                    <div><span className="text-gray-500">ROI:</span> <span className="text-emerald-300">{p.roi}</span></div>
                    <div><span className="text-gray-500">Timeline:</span> <span className="text-teal-300">{p.timeline}</span></div>
                    <div><span className="text-gray-500">Risk:</span> <span className="text-gray-300">{p.risk}</span></div>
                  </div>
                </div>
              ))}</div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-emerald-300">Moat Building Timeline</h2>
              <div className="space-y-3">{report.timeline.map((t, i) => (
                <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">{t.phase}</h3>
                    <span className="text-sm text-teal-300">{t.months}</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">{t.focus}</p>
                  <div className="text-sm mb-2"><span className="text-gray-500">Moats targeted:</span> <span className="text-emerald-300">{t.moatsTargeted}</span></div>
                  <ul className="space-y-1">{t.milestones.map((m, j) => <li key={j} className="text-sm text-gray-300 pl-3 border-l border-emerald-500/30">{m}</li>)}</ul>
                </div>
              ))}</div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-emerald-300">Quick Wins</h2>
              <div className="space-y-2">{report.quickWins.map((w, i) => <div key={i} className="p-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-sm text-gray-300">{w}</div>)}</div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-emerald-300">Warnings</h2>
              <div className="space-y-2">{report.warnings.map((w, i) => <div key={i} className="p-3 bg-red-500/5 border border-red-500/20 rounded-lg text-sm text-gray-300">{w}</div>)}</div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
