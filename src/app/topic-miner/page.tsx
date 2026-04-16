'use client';
import { useState } from 'react';
import Link from 'next/link';

/* ------------------------------------------------------------------ */
/* CONSTANTS                                                           */
/* ------------------------------------------------------------------ */

const industries = [
  'Tech/SaaS', 'Health & Wellness', 'Finance', 'Education', 'Entertainment',
  'Fashion', 'Food & Beverage', 'Travel', 'Fitness', 'Real Estate',
  'E-commerce', 'Gaming',
] as const;

const contentFocuses = [
  'Thought Leadership', 'How-To/Tutorial', 'News & Updates',
  'Entertainment', 'Product Marketing', 'Community Building',
] as const;

const researchDepths = [
  'Surface Scan', 'Deep Dive', 'Full Research',
] as const;

const sources = [
  'All Sources', 'Academic/Research', 'Industry News',
  'Social Trends', 'Competitor Content', 'Reddit & Forums',
] as const;

/* ------------------------------------------------------------------ */
/* HELPERS                                                             */
/* ------------------------------------------------------------------ */

function hash(str: string): number {
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h + str.charCodeAt(i)) & 0x7fffffff;
  }
  return h;
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

function pick<T>(arr: readonly T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)];
}

function randInt(min: number, max: number, rng: () => number): number {
  return Math.floor(rng() * (max - min + 1)) + min;
}

/* ------------------------------------------------------------------ */
/* TYPES                                                               */
/* ------------------------------------------------------------------ */

interface GoldenTopic {
  topic: string;
  untappedScore: number;
  searchVolume: string;
  competition: string;
  contentAngle: string;
  whyNow: string;
}

interface AdjacentIndustry {
  industry: string;
  crossoverPotential: number;
  bridgeTopic: string;
  exampleTitle: string;
}

interface EmergingNarrative {
  narrative: string;
  momentum: number;
  source: string;
  timeToMainstream: string;
  firstMoverAdvantage: number;
}

interface ContentGap {
  gap: string;
  demandScore: number;
  existingCoverage: string;
  suggestedFormat: string;
  estimatedTraffic: string;
}

interface WeeklyCalendarItem {
  day: string;
  topic: string;
  format: string;
  hook: string;
}

interface SourceInsight {
  source: string;
  hotTopic: string;
  engagement: string;
  relevanceScore: number;
}

interface TopicMinerResult {
  goldenTopics: GoldenTopic[];
  adjacentIndustries: AdjacentIndustry[];
  emergingNarratives: EmergingNarrative[];
  contentGaps: ContentGap[];
  weeklyCalendar: WeeklyCalendarItem[];
  sourceInsights: SourceInsight[];
}

/* ------------------------------------------------------------------ */
/* DATA POOLS                                                          */
/* ------------------------------------------------------------------ */

const topicPools: Record<string, {
  topics: string[];
  angles: string[];
  whyNows: string[];
  adjacents: { industry: string; bridge: string; title: string }[];
  narratives: { narrative: string; source: string }[];
  gaps: string[];
}> = {
  'Tech/SaaS': {
    topics: [
      'AI Agent Orchestration for SMBs', 'Zero-Trust API Security for Startups',
      'Vertical SaaS for Niche Trades', 'Usage-Based Pricing Psychology',
      'Developer Experience as Competitive Moat', 'Composable Architecture Adoption',
      'AI-Native Onboarding Flows', 'PLG Metrics Beyond Activation Rate',
      'Embedded Finance in B2B SaaS', 'Edge Computing for Real-Time SaaS',
      'No-Code Internal Tool Builders', 'LLM-Powered Customer Support Tiers',
    ],
    angles: [
      'Contrarian take: why most teams are over-investing', 'Data-backed breakdown with benchmarks',
      'Step-by-step migration playbook', 'Founder story + lessons learned',
      'Comparison framework for decision-makers', 'Future predictions with evidence',
      'Hidden cost analysis', 'ROI calculator walkthrough',
    ],
    whyNows: [
      'GPT-5 launch reshaping enterprise buying criteria', 'Series A funding shifting to vertical plays',
      'AWS re:Invent announcements creating new integration opportunities', 'Regulatory changes forcing security upgrades',
      'Competitor exits creating market gaps', 'Remote-first workforce demanding new tooling',
      'Enterprise budgets resetting Q1 2027', 'Open-source alternatives gaining traction',
    ],
    adjacents: [
      { industry: 'FinTech', bridge: 'Embedded payments in SaaS', title: 'Why Every SaaS Will Become a FinTech by 2028' },
      { industry: 'EdTech', bridge: 'Interactive product education', title: 'The SaaS Onboarding Revolution Borrowed from EdTech' },
      { industry: 'Healthcare IT', bridge: 'HIPAA-compliant workflows', title: 'What SaaS Builders Can Learn from Healthcare Compliance' },
      { industry: 'Logistics', bridge: 'Supply chain visibility APIs', title: 'APIs Are Eating Supply Chains: A SaaS Opportunity Map' },
      { industry: 'Climate Tech', bridge: 'Carbon tracking integrations', title: 'The Untapped SaaS Market in Corporate Sustainability' },
    ],
    narratives: [
      { narrative: 'The "anti-AI" movement in developer tools', source: 'Hacker News + Reddit' },
      { narrative: 'Micro-SaaS founders outperforming VC-backed competitors', source: 'Indie Hackers + Twitter/X' },
      { narrative: 'Platform consolidation fatigue driving best-of-breed revival', source: 'Industry Reports' },
      { narrative: 'AI replacing junior developer roles faster than expected', source: 'LinkedIn + Stack Overflow Survey' },
      { narrative: 'Open-source monetization models maturing', source: 'GitHub Trends + VC Blogs' },
      { narrative: 'Enterprise buyers demanding AI ROI proof before renewal', source: 'Gartner + Forrester' },
    ],
    gaps: [
      'Practical AI implementation budgets for seed-stage startups',
      'Security compliance checklists for solo founders',
      'Pricing page teardowns with conversion data',
      'Churn prediction models for low-touch SaaS',
      'Integration marketplace strategy playbooks',
      'Customer success metrics for PLG companies',
    ],
  },
  'Health & Wellness': {
    topics: [
      'Gut Microbiome Personalization', 'Sleep Architecture Optimization',
      'Peptide Therapy Demystified', 'Functional Lab Testing for Beginners',
      'Wearable Data Interpretation Guide', 'Metabolic Health for Desk Workers',
      'Breathwork Protocols Backed by Science', 'Cold Exposure Dose-Response',
      'Continuous Glucose Monitoring Insights', 'Nervous System Regulation Techniques',
      'Anti-Inflammatory Meal Frameworks', 'Circadian Rhythm Reset Protocols',
    ],
    angles: [
      'Myth vs. evidence breakdown', 'Personal experiment with data',
      'Beginner-friendly explainer', 'Expert interview summary',
      'Cost-benefit analysis for consumers', 'Weekly protocol with tracking template',
      'Comparison of popular approaches', 'Scientific review simplified',
    ],
    whyNows: [
      'New longevity research published in Nature Medicine', 'Wearable tech prices dropping below $100 threshold',
      'GLP-1 medications sparking metabolic health conversations', 'Insurance companies starting to cover preventive labs',
      'WHO updating physical activity guidelines', 'Social media wellness misinformation reaching critical mass',
      'Corporate wellness budgets expanding post-RTO', 'Gen Z driving demand for evidence-based wellness',
    ],
    adjacents: [
      { industry: 'Food Tech', bridge: 'Personalized nutrition apps', title: 'How Food Tech Is Reinventing the Wellness Industry' },
      { industry: 'Mental Health', bridge: 'Mind-body connection protocols', title: 'The Convergence of Physical and Mental Wellness' },
      { industry: 'Insurance', bridge: 'Preventive health incentives', title: 'How Insurers Are Quietly Funding the Wellness Revolution' },
      { industry: 'Fitness Tech', bridge: 'Recovery optimization tools', title: 'Beyond the Workout: Where Fitness Meets Medical Wellness' },
      { industry: 'Workplace', bridge: 'Employee wellness ROI', title: 'The Business Case for Workplace Wellness Nobody Talks About' },
    ],
    narratives: [
      { narrative: 'Backlash against hustle-culture wellness', source: 'TikTok + Instagram' },
      { narrative: 'Functional medicine going mainstream', source: 'Google Trends + Podcast Charts' },
      { narrative: '"Wellness privilege" debate reshaping content tone', source: 'Twitter/X + Substack' },
      { narrative: 'Male wellness content exploding in engagement', source: 'YouTube Analytics + Reddit' },
      { narrative: 'DIY lab testing disrupting traditional healthcare', source: 'Reddit + Health Forums' },
      { narrative: 'Ancestral health revival among Gen Z', source: 'TikTok + Academic Papers' },
    ],
    gaps: [
      'Evidence-rated supplement guides with dosage ranges',
      'Wellness protocol cost comparisons by income level',
      'Wearable accuracy reviews from independent researchers',
      'Beginner breathwork routines under 5 minutes',
      'Sleep optimization for shift workers',
      'Gut health protocols for specific conditions',
    ],
  },
  'Finance': {
    topics: [
      'Fractional Real Estate Investing Platforms', 'Tax-Loss Harvesting Automation',
      'Private Credit Democratization', 'Financial Independence Retire Early for Gen Z',
      'AI-Powered Portfolio Rebalancing', 'Embedded Finance Consumer Impact',
      'Stablecoin Yield Strategies', 'Cash Flow Forecasting for Freelancers',
      'ESG Investing Performance Myths', 'Micro-Investing Behavioral Psychology',
      'Alternative Asset Allocation Frameworks', 'Cross-Border Payment Innovation',
    ],
    angles: [
      'Data-driven myth busting', 'Step-by-step tutorial with screenshots',
      'Risk assessment framework', 'Historical comparison analysis',
      'Regulatory landscape explainer', 'Personal finance case study',
      'Tool comparison with scoring', 'Beginner to advanced pathway',
    ],
    whyNows: [
      'SEC finalizing new retail investment regulations', 'Interest rate environment shifting strategies',
      'AI wealth management tools hitting mainstream', 'Gen Z entering peak earning years',
      'Crypto regulatory clarity emerging in 2026', 'Bank failures driving alternative finance interest',
      'Inflation-adjusted returns changing asset allocations', 'Open banking APIs enabling new products',
    ],
    adjacents: [
      { industry: 'Real Estate', bridge: 'Tokenized property investment', title: 'Real Estate Meets DeFi: The $300B Opportunity' },
      { industry: 'Insurance', bridge: 'Parametric insurance products', title: 'How Smart Insurance Is Changing Risk Management' },
      { industry: 'HR Tech', bridge: 'Financial wellness benefits', title: 'Why CFOs Should Care About Employee Financial Literacy' },
      { industry: 'Gaming', bridge: 'Financial gamification', title: 'What Finance Can Learn from Mobile Game Monetization' },
      { industry: 'Climate', bridge: 'Carbon credit markets', title: 'Carbon Credits: The Next Alternative Asset Class' },
    ],
    narratives: [
      { narrative: 'Anti-financial-advisor movement gaining steam', source: 'Reddit r/personalfinance + YouTube' },
      { narrative: 'Salary transparency reshaping compensation expectations', source: 'LinkedIn + Glassdoor' },
      { narrative: '"Doom spending" counter-movement toward intentional budgeting', source: 'TikTok + Twitter/X' },
      { narrative: 'Treasury management becoming a startup competitive advantage', source: 'VC Twitter + Substack' },
      { narrative: 'Financial literacy content outperforming entertainment on YouTube', source: 'YouTube Analytics' },
      { narrative: 'Community-based investing clubs growing rapidly', source: 'Discord + Reddit' },
    ],
    gaps: [
      'Tax optimization guides for multi-state remote workers',
      'Investment strategy comparisons for $5K vs $50K vs $500K portfolios',
      'International money transfer fee comparisons updated 2026',
      'Emergency fund alternatives with better yields',
      'Freelancer retirement planning step-by-step',
      'Crypto tax reporting simplified workflows',
    ],
  },
  'Education': {
    topics: [
      'Micro-Credential Stacking Strategies', 'AI Tutoring Effectiveness Research',
      'Skills-Based Hiring Impact on Curriculum', 'Cohort-Based Course Design',
      'Learning Analytics for Student Retention', 'Gamification Beyond Points and Badges',
      'Spaced Repetition System Optimization', 'Peer-to-Peer Learning Platforms',
      'Corporate L&D Budget Justification', 'Neuroscience of Memory Formation',
      'Hybrid Classroom Technology Stack', 'Creator-Led Education Economics',
    ],
    angles: [
      'Research-backed methodology breakdown', 'Implementation case study',
      'Tool and platform comparison', 'Student outcome analysis',
      'Budget and ROI framework', 'Future of learning predictions',
      'Step-by-step curriculum design', 'Learner experience optimization',
    ],
    whyNows: [
      'AI tutoring tools reaching human-parity in studies', 'Corporate training budgets shifting to skills-based',
      'University enrollment declining for 5th consecutive year', 'EdTech consolidation creating new market gaps',
      'State-level micro-credential recognition expanding', 'Remote learning infrastructure finally maturing',
      'Gen Alpha entering formal education with AI fluency', 'Creator economy education sector hitting $10B',
    ],
    adjacents: [
      { industry: 'Gaming', bridge: 'Immersive learning environments', title: 'What Education Can Steal from Game Design' },
      { industry: 'Healthcare', bridge: 'Medical simulation training', title: 'How VR Surgery Training Is Reshaping All of Education' },
      { industry: 'Entertainment', bridge: 'Edutainment content formats', title: 'Netflix for Learning: Why Entertainment Formats Win' },
      { industry: 'HR Tech', bridge: 'Skills taxonomy alignment', title: 'The Bridge Between Learning Platforms and Hiring Algorithms' },
      { industry: 'AI/ML', bridge: 'Adaptive learning systems', title: 'AI Tutors Are Here: What Every Educator Needs to Know' },
    ],
    narratives: [
      { narrative: 'Degree skepticism reaching mainstream acceptance', source: 'LinkedIn + Major News' },
      { narrative: 'Students using AI to learn faster, not cheat', source: 'Reddit + EdTech Blogs' },
      { narrative: '"Learn in public" movement reshaping career development', source: 'Twitter/X + Dev.to' },
      { narrative: 'Parents demanding AI literacy in K-12 curriculum', source: 'Facebook Groups + Surveys' },
      { narrative: 'Community colleges becoming innovation leaders', source: 'Education Week + Podcasts' },
      { narrative: 'Subscription fatigue hitting online course platforms', source: 'Trustpilot + Reddit' },
    ],
    gaps: [
      'AI-assisted lesson planning templates by subject',
      'Micro-credential program ROI calculators',
      'Student engagement metrics beyond completion rates',
      'Accessibility-first course design checklists',
      'Corporate training program comparison frameworks',
      'Learning community management playbooks',
    ],
  },
};

const defaultPool = {
  topics: [
    'Cross-Industry Innovation Patterns', 'Community-Led Growth Strategies',
    'Sustainable Business Model Design', 'Personal Brand Authority Building',
    'Data-Driven Decision Frameworks', 'Customer Journey Mapping Tactics',
    'Micro-Influencer Partnership Models', 'Content Repurposing Automation',
    'Audience Segmentation Deep Dives', 'Retention Psychology Principles',
    'Viral Loop Engineering', 'Brand Storytelling Frameworks',
  ],
  angles: [
    'Contrarian viewpoint with evidence', 'Practical step-by-step guide',
    'Data-backed analysis', 'Expert roundup insights',
    'Case study deep dive', 'Trend prediction with signals',
    'Tool comparison framework', 'Beginner-friendly explainer',
  ],
  whyNows: [
    'Market dynamics shifting in Q2 2026', 'Consumer behavior post-pandemic evolution continuing',
    'New platform features enabling fresh strategies', 'Competitor landscape consolidating',
    'Budget cycles resetting for new fiscal year', 'Algorithm updates rewarding this content type',
    'Industry report revealing untapped demand', 'Cultural moment creating organic interest',
  ],
  adjacents: [
    { industry: 'Technology', bridge: 'Automation and AI tools', title: 'How Tech Innovation Is Reshaping Every Industry' },
    { industry: 'Psychology', bridge: 'Behavioral science applications', title: 'The Psychology Behind Successful Content Strategies' },
    { industry: 'Design', bridge: 'Visual communication trends', title: 'What Content Creators Can Learn from Product Designers' },
    { industry: 'Sustainability', bridge: 'Ethical business practices', title: 'Sustainability as a Content Differentiator in 2026' },
    { industry: 'Data Science', bridge: 'Analytics-driven decisions', title: 'Data Literacy: The Skill Every Content Creator Needs' },
  ],
  narratives: [
    { narrative: 'Authenticity over polish becoming dominant', source: 'Social Media Trends' },
    { narrative: 'Community-first brands outperforming ad-heavy competitors', source: 'Industry Reports' },
    { narrative: 'Short-form fatigue driving long-form revival', source: 'Platform Analytics' },
    { narrative: 'AI-generated content backlash creating human-premium', source: 'Twitter/X + Reddit' },
    { narrative: 'Niche audiences willing to pay premium for depth', source: 'Substack + Patreon Data' },
    { narrative: 'Cross-platform storytelling becoming table stakes', source: 'Creator Economy Reports' },
  ],
  gaps: [
    'ROI frameworks for content marketing efforts',
    'Audience research methodologies for small teams',
    'Content calendar templates with strategic rationale',
    'Brand voice development exercises',
    'Analytics dashboard setup guides by platform',
    'Collaboration workflow templates for content teams',
  ],
};

const volumeLabels = ['1.2K/mo', '3.4K/mo', '5.8K/mo', '8.1K/mo', '12K/mo', '18K/mo', '24K/mo', '45K/mo', '67K/mo', '2.9K/mo', '7.6K/mo', '15K/mo'] as const;
const competitionLabels = ['Very Low', 'Low', 'Low-Medium', 'Medium', 'Medium-High', 'High'] as const;
const coverageLabels = ['Minimal — few quality articles exist', 'Sparse — mostly surface-level', 'Moderate — but lacking depth', 'Saturated with low-quality', 'Fragmented across sources', 'Outdated content dominates'] as const;
const formatLabels = ['Long-form guide (3,000+ words)', 'Video series (5 parts)', 'Interactive calculator/tool', 'Infographic + thread', 'Carousel + newsletter', 'Podcast series + show notes', 'Template/checklist download', 'Case study collection'] as const;
const trafficLabels = ['2,500-5,000 visits/mo', '5,000-10,000 visits/mo', '10,000-25,000 visits/mo', '25,000-50,000 visits/mo', '1,000-3,000 visits/mo', '50,000+ visits/mo'] as const;
const momentumSources = ['Google Trends', 'Reddit r/popular', 'Twitter/X trending', 'LinkedIn pulse', 'TikTok discovery', 'YouTube suggested', 'Podcast charts', 'Hacker News'] as const;
const mainstreamLabels = ['2-4 weeks', '1-2 months', '3-6 months', '6-12 months', 'Already emerging', '1-3 weeks'] as const;
const engagementLabels = ['Rising fast (+340%)', 'Steady growth (+85%)', 'Viral spike (+1,200%)', 'Emerging (+45%)', 'High engagement (+210%)', 'Breakout (+560%)'] as const;
const dayFormats = ['Thread + carousel', 'Short-form video', 'Long-form article', 'Infographic', 'Newsletter deep dive', 'Podcast/audio', 'Community post + poll'] as const;

/* ------------------------------------------------------------------ */
/* GENERATE FUNCTION                                                   */
/* ------------------------------------------------------------------ */

function generate(
  industry: string,
  focus: string,
  depth: string,
  source: string,
  niche: string,
): TopicMinerResult {
  const seed = hash(`${industry}-${focus}-${depth}-${source}-${niche || 'general'}`);
  const rng = seededRandom(seed);

  const pool = topicPools[industry] || defaultPool;
  const depthMultiplier = depth === 'Full Research' ? 1.15 : depth === 'Deep Dive' ? 1.05 : 0.95;

  // --- goldenTopics (8) ---
  const goldenTopics: GoldenTopic[] = Array.from({ length: 8 }, (_, i) => {
    const topic = niche
      ? `${pool.topics[i % pool.topics.length]} for ${niche}`
      : pool.topics[i % pool.topics.length];
    const score = Math.min(98, Math.round((randInt(62, 96, rng) * depthMultiplier)));
    return {
      topic,
      untappedScore: score,
      searchVolume: pick(volumeLabels, rng),
      competition: pick(competitionLabels, rng),
      contentAngle: `${pick(pool.angles, rng)} — targeting ${focus.toLowerCase()} content`,
      whyNow: pool.whyNows[i % pool.whyNows.length],
    };
  });

  // --- adjacentIndustries (5) ---
  const adjacentIndustries: AdjacentIndustry[] = pool.adjacents.slice(0, 5).map((adj) => ({
    industry: adj.industry,
    crossoverPotential: randInt(55, 95, rng),
    bridgeTopic: adj.bridge,
    exampleTitle: adj.title,
  }));

  // --- emergingNarratives (6) ---
  const emergingNarratives: EmergingNarrative[] = pool.narratives.slice(0, 6).map((n) => ({
    narrative: n.narrative,
    momentum: randInt(40, 97, rng),
    source: n.source,
    timeToMainstream: pick(mainstreamLabels, rng),
    firstMoverAdvantage: randInt(60, 98, rng),
  }));

  // --- contentGaps (6) ---
  const contentGaps: ContentGap[] = pool.gaps.slice(0, 6).map((gap) => ({
    gap,
    demandScore: randInt(55, 98, rng),
    existingCoverage: pick(coverageLabels, rng),
    suggestedFormat: pick(formatLabels, rng),
    estimatedTraffic: pick(trafficLabels, rng),
  }));

  // --- weeklyCalendar (7) ---
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const hooks = [
    `"Most ${industry.toLowerCase()} creators are ignoring this..."`,
    `"I analyzed 500 posts and found a pattern..."`,
    `"Stop doing X. Start doing Y instead."`,
    `"The hidden metric that predicts virality..."`,
    `"Why your ${niche || 'content'} strategy is backwards..."`,
    `"I tested this for 30 days. Here's what happened."`,
    `"The ${industry.toLowerCase()} trend nobody is talking about..."`,
  ];
  const weeklyCalendar: WeeklyCalendarItem[] = days.map((day, i) => ({
    day,
    topic: goldenTopics[i % goldenTopics.length].topic,
    format: dayFormats[i % dayFormats.length],
    hook: hooks[i],
  }));

  // --- sourceInsights (5) ---
  const sourceNames = ['Reddit & Forums', 'Twitter/X', 'LinkedIn', 'Google Trends', 'YouTube'];
  const sourceInsights: SourceInsight[] = sourceNames.map((s, i) => ({
    source: s,
    hotTopic: goldenTopics[(i + 2) % goldenTopics.length].topic,
    engagement: pick(engagementLabels, rng),
    relevanceScore: randInt(60, 98, rng),
  }));

  return { goldenTopics, adjacentIndustries, emergingNarratives, contentGaps, weeklyCalendar, sourceInsights };
}

/* ------------------------------------------------------------------ */
/* SCORE BAR COMPONENT                                                 */
/* ------------------------------------------------------------------ */

function ScoreBar({ score, color = 'indigo' }: { score: number; color?: string }) {
  const colors: Record<string, string> = {
    indigo: 'bg-indigo-500',
    green: 'bg-emerald-500',
    cyan: 'bg-cyan-500',
    amber: 'bg-amber-500',
    violet: 'bg-violet-500',
  };
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
        <div className={`h-full rounded-full ${colors[color] || colors.indigo}`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-sm font-semibold text-gray-700 w-10 text-right">{score}%</span>
    </div>
  );
}

function UntappedBadge({ score }: { score: number }) {
  if (score >= 85) return <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 text-xs font-semibold">HIGH OPPORTUNITY</span>;
  if (score >= 70) return <span className="inline-flex items-center gap-1 rounded-full bg-cyan-100 text-cyan-700 border border-cyan-200 px-2.5 py-0.5 text-xs font-semibold">GOOD OPPORTUNITY</span>;
  return <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200 px-2.5 py-0.5 text-xs font-semibold">MODERATE</span>;
}

function CompetitionBadge({ level }: { level: string }) {
  const cl = level.toLowerCase();
  if (cl.includes('very low') || cl === 'low') return <span className="rounded-full bg-emerald-100 text-emerald-700 px-2.5 py-0.5 text-xs font-medium">{level}</span>;
  if (cl.includes('medium')) return <span className="rounded-full bg-amber-100 text-amber-700 px-2.5 py-0.5 text-xs font-medium">{level}</span>;
  return <span className="rounded-full bg-red-100 text-red-700 px-2.5 py-0.5 text-xs font-medium">{level}</span>;
}

/* ------------------------------------------------------------------ */
/* PAGE COMPONENT                                                      */
/* ------------------------------------------------------------------ */

export default function TopicMinerPage() {
  const [industry, setIndustry] = useState<string>(industries[0]);
  const [focus, setFocus] = useState<string>(contentFocuses[0]);
  const [depth, setDepth] = useState<string>(researchDepths[0]);
  const [source, setSource] = useState<string>(sources[0]);
  const [niche, setNiche] = useState('');
  const [result, setResult] = useState<TopicMinerResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setResult(generate(industry, focus, depth, source, niche));
      setLoading(false);
    }, 1400);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* ---- HEADER ---- */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-4 text-sm text-indigo-500 hover:text-indigo-700 transition-colors">
            &larr; Back to PostCraft AI
          </Link>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
            Topic Miner
          </h1>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Discover untapped content opportunities from adjacent industries and trending conversations. Find the golden topics your competitors are missing.
          </p>
        </div>

        {/* ---- FORM ---- */}
        <div className="rounded-2xl bg-white shadow-lg p-6 sm:p-8 mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Configure Your Research</h2>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Industry */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">Industry</label>
              <select
                value={industry}
                onChange={e => setIndustry(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors"
              >
                {industries.map(i => <option key={i}>{i}</option>)}
              </select>
            </div>

            {/* Content Focus */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">Content Focus</label>
              <select
                value={focus}
                onChange={e => setFocus(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors"
              >
                {contentFocuses.map(f => <option key={f}>{f}</option>)}
              </select>
            </div>

            {/* Research Depth */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">Research Depth</label>
              <select
                value={depth}
                onChange={e => setDepth(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors"
              >
                {researchDepths.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>

            {/* Sources */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">Sources</label>
              <select
                value={source}
                onChange={e => setSource(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors"
              >
                {sources.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>

            {/* Your Niche */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-1.5">Your Niche <span className="text-gray-400">(optional)</span></label>
              <input
                type="text"
                value={niche}
                onChange={e => setNiche(e.target.value)}
                placeholder="e.g., B2B startup founders, vegan athletes, crypto beginners..."
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors"
              />
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="mt-8 w-full sm:w-auto rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-500 hover:to-cyan-500 disabled:opacity-50 transition-all"
          >
            {loading ? 'Mining Topics...' : 'Mine Topics'}
          </button>
        </div>

        {/* ---- RESULTS ---- */}
        {result && (
          <div className="space-y-10">

            {/* ---- GOLDEN TOPICS ---- */}
            <div className="rounded-2xl bg-white shadow-lg p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Golden Topics</h2>
              <p className="text-sm text-gray-500 mb-6">{result.goldenTopics.length} untapped opportunities discovered for {industry}{niche ? ` / ${niche}` : ''}</p>

              <div className="space-y-4">
                {result.goldenTopics.map((t, i) => (
                  <div key={i} className="rounded-xl border border-gray-200 bg-gray-50/50 p-5 hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <h3 className="text-base font-semibold text-gray-900">{t.topic}</h3>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <UntappedBadge score={t.untappedScore} />
                        <CompetitionBadge level={t.competition} />
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span>Untapped Score</span>
                        <span className="font-medium">{t.untappedScore}%</span>
                      </div>
                      <ScoreBar score={t.untappedScore} color={t.untappedScore >= 85 ? 'green' : t.untappedScore >= 70 ? 'cyan' : 'indigo'} />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm mb-3">
                      <div>
                        <span className="text-gray-500 text-xs">Search Volume</span>
                        <p className="text-gray-800 font-medium">{t.searchVolume}</p>
                      </div>
                      <div>
                        <span className="text-gray-500 text-xs">Competition</span>
                        <p className="text-gray-800 font-medium">{t.competition}</p>
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <span className="text-gray-500 text-xs">Content Angle</span>
                        <p className="text-gray-800 font-medium">{t.contentAngle}</p>
                      </div>
                    </div>

                    <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-100">
                      <p className="text-sm text-gray-700">
                        <span className="text-indigo-600 font-medium">Why Now:</span> {t.whyNow}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ---- ADJACENT INDUSTRIES ---- */}
            <div className="rounded-2xl bg-white shadow-lg p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Adjacent Industries</h2>
              <p className="text-sm text-gray-500 mb-6">Cross-industry opportunities with untapped crossover potential</p>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {result.adjacentIndustries.map((a, i) => (
                  <div key={i} className="rounded-xl border border-gray-200 bg-gray-50/50 p-5 hover:border-cyan-200 hover:bg-cyan-50/30 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-base font-semibold text-gray-900">{a.industry}</h3>
                      <span className="rounded-full bg-cyan-100 text-cyan-700 px-2.5 py-0.5 text-xs font-semibold">{a.crossoverPotential}%</span>
                    </div>

                    <div className="mb-3">
                      <span className="text-gray-500 text-xs">Crossover Potential</span>
                      <ScoreBar score={a.crossoverPotential} color="cyan" />
                    </div>

                    <div className="mb-2">
                      <span className="text-gray-500 text-xs">Bridge Topic</span>
                      <p className="text-sm text-gray-800 font-medium">{a.bridgeTopic}</p>
                    </div>

                    <div className="bg-cyan-50 rounded-lg p-3 border border-cyan-100">
                      <span className="text-gray-500 text-xs block mb-0.5">Example Title</span>
                      <p className="text-sm text-gray-700 italic">&ldquo;{a.exampleTitle}&rdquo;</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ---- EMERGING NARRATIVES ---- */}
            <div className="rounded-2xl bg-white shadow-lg p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Emerging Narratives</h2>
              <p className="text-sm text-gray-500 mb-6">Narratives gaining momentum — get ahead before they peak</p>

              <div className="space-y-4">
                {result.emergingNarratives.map((n, i) => (
                  <div key={i} className="rounded-xl border border-gray-200 bg-gray-50/50 p-5 hover:border-violet-200 hover:bg-violet-50/30 transition-colors">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <h3 className="text-base font-semibold text-gray-900 flex-1">{n.narrative}</h3>
                      <UntappedBadge score={n.firstMoverAdvantage} />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm mb-3">
                      <div>
                        <span className="text-gray-500 text-xs">Momentum</span>
                        <ScoreBar score={n.momentum} color="violet" />
                      </div>
                      <div>
                        <span className="text-gray-500 text-xs">Source</span>
                        <p className="text-gray-800 font-medium">{n.source}</p>
                      </div>
                      <div>
                        <span className="text-gray-500 text-xs">Time to Mainstream</span>
                        <p className="text-gray-800 font-medium">{n.timeToMainstream}</p>
                      </div>
                      <div>
                        <span className="text-gray-500 text-xs">First-Mover Advantage</span>
                        <ScoreBar score={n.firstMoverAdvantage} color="green" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ---- CONTENT GAPS ---- */}
            <div className="rounded-2xl bg-white shadow-lg p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Content Gaps</h2>
              <p className="text-sm text-gray-500 mb-6">High-demand topics with insufficient existing coverage</p>

              <div className="grid gap-4 sm:grid-cols-2">
                {result.contentGaps.map((g, i) => (
                  <div key={i} className="rounded-xl border border-gray-200 bg-gray-50/50 p-5 hover:border-emerald-200 hover:bg-emerald-50/30 transition-colors">
                    <h3 className="text-base font-semibold text-gray-900 mb-3">{g.gap}</h3>

                    <div className="mb-3">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span>Demand Score</span>
                      </div>
                      <ScoreBar score={g.demandScore} color="green" />
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                      <div>
                        <span className="text-gray-500 text-xs">Existing Coverage</span>
                        <p className="text-gray-800 text-xs mt-0.5">{g.existingCoverage}</p>
                      </div>
                      <div>
                        <span className="text-gray-500 text-xs">Estimated Traffic</span>
                        <p className="text-gray-800 font-medium">{g.estimatedTraffic}</p>
                      </div>
                    </div>

                    <div className="bg-emerald-50 rounded-lg p-2.5 border border-emerald-100">
                      <span className="text-gray-500 text-xs">Suggested Format</span>
                      <p className="text-sm text-gray-700 font-medium">{g.suggestedFormat}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ---- WEEKLY CALENDAR ---- */}
            <div className="rounded-2xl bg-white shadow-lg p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Weekly Content Calendar</h2>
              <p className="text-sm text-gray-500 mb-6">A ready-to-execute 7-day content plan based on mined topics</p>

              <div className="space-y-3">
                {result.weeklyCalendar.map((w, i) => (
                  <div key={i} className="rounded-xl border border-gray-200 bg-gray-50/50 p-4 hover:border-indigo-200 transition-colors">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="inline-flex items-center rounded-lg bg-indigo-100 text-indigo-700 px-3 py-1 text-sm font-bold min-w-[100px] justify-center">{w.day}</span>
                      <span className="rounded-full bg-gray-200 text-gray-700 px-2.5 py-0.5 text-xs font-medium">{w.format}</span>
                    </div>
                    <p className="text-sm text-gray-900 font-medium mb-1">{w.topic}</p>
                    <p className="text-sm text-indigo-600 italic">{w.hook}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ---- SOURCE INSIGHTS ---- */}
            <div className="rounded-2xl bg-white shadow-lg p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Source Insights</h2>
              <p className="text-sm text-gray-500 mb-6">What each source is signaling right now</p>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {result.sourceInsights.map((s, i) => (
                  <div key={i} className="rounded-xl border border-gray-200 bg-gray-50/50 p-5 hover:border-amber-200 hover:bg-amber-50/30 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-bold text-gray-900">{s.source}</h3>
                      <span className="rounded-full bg-amber-100 text-amber-700 px-2.5 py-0.5 text-xs font-semibold">{s.relevanceScore}%</span>
                    </div>

                    <div className="mb-3">
                      <span className="text-gray-500 text-xs">Hot Topic</span>
                      <p className="text-sm text-gray-800 font-medium mt-0.5">{s.hotTopic}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-gray-500 text-xs">Engagement</span>
                        <p className="text-sm text-emerald-600 font-semibold">{s.engagement}</p>
                      </div>
                      <div>
                        <span className="text-gray-500 text-xs">Relevance</span>
                        <ScoreBar score={s.relevanceScore} color="amber" />
                      </div>
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
