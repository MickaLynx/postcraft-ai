'use client';
import { useState } from 'react';

const industries = ['SaaS/Tech', 'E-commerce/DTC', 'Health & Wellness', 'Finance/Fintech', 'Education/Courses', 'Real Estate', 'Food & Restaurant', 'Fashion/Beauty', 'Travel/Hospitality', 'B2B Services', 'Agency/Marketing', 'Fitness/Sports', 'Entertainment/Media', 'Non-Profit'] as const;
const platformOptions = ['Instagram', 'TikTok', 'LinkedIn', 'Twitter/X', 'Facebook', 'YouTube', 'Pinterest'] as const;
const contentGoals = ['Brand Awareness', 'Lead Generation', 'Sales/Conversions', 'Community Building', 'Thought Leadership', 'Customer Retention', 'Recruitment', 'Education'] as const;
const audienceStages = ['Cold (Unaware)', 'Warm (Problem-Aware)', 'Hot (Solution-Aware)', 'Loyal (Customer)', 'All Stages'] as const;
const postFrequencies = ['1-2x/week', '3-4x/week', '5-7x/week (daily)', '10-14x/week (2x daily)', '15+/week'] as const;

interface GapItem {
  topic: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  reason: string;
  contentIdeas: string[];
  expectedImpact: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  format: string;
}

interface ContentGapResult {
  overallScore: number;
  missingPillars: GapItem[];
  underservedTopics: GapItem[];
  formatGaps: { format: string; currentUsage: string; recommended: string; gap: string }[];
  funnelAnalysis: { stage: string; coverage: string; gaps: string[]; priority: string }[];
  competitorInsights: { tactic: string; opportunity: string; action: string }[];
  contentMix: { type: string; current: number; ideal: number; action: string }[];
  weeklyActionPlan: { day: string; action: string; topic: string; format: string }[];
  quickWins: string[];
  longTermPlays: string[];
}

function analyzeContentGap(
  industry: string, platforms: string[], goals: string[], stage: string,
  frequency: string, currentTopics: string, competitors: string
): ContentGapResult {
  const industryTopics: Record<string, { pillars: string[]; trending: string[]; underserved: string[] }> = {
    'SaaS/Tech': {
      pillars: ['Product updates & features', 'Use cases & tutorials', 'Industry thought leadership', 'Customer success stories', 'Behind-the-scenes/team', 'Comparisons & alternatives', 'Data & research reports', 'Community & user content'],
      trending: ['AI integration stories', 'Workflow automation tips', 'Tool stack reveals', 'Founder journey content', 'Product-led growth tactics'],
      underserved: ['Pricing transparency content', 'Migration guides from competitors', 'Failed experiment stories', 'Customer onboarding content', 'Integration ecosystem content'],
    },
    'E-commerce/DTC': {
      pillars: ['Product showcases', 'Customer reviews/UGC', 'Behind-the-scenes', 'Lifestyle content', 'Educational (how-to)', 'Seasonal/trending', 'Brand story/values', 'Community highlights'],
      trending: ['Unboxing/ASMR content', 'Creator collaborations', 'Sustainable practices', 'Supply chain transparency', 'TikTok Shop integration'],
      underserved: ['Post-purchase content', 'Product care guides', 'Ingredient/material deep-dives', 'Customer journey stories', 'Loyalty program content'],
    },
    'Health & Wellness': {
      pillars: ['Expert advice', 'Success stories', 'Myth-busting', 'Daily tips', 'Science-backed content', 'Community support', 'Product education', 'Seasonal wellness'],
      trending: ['Mental health awareness', 'Biohacking basics', 'Sleep optimization', 'Gut health content', 'Wearable data insights'],
      underserved: ['Long-term journey content', 'Failure/setback stories', 'Budget-friendly wellness', 'Accessibility in wellness', 'Cultural wellness practices'],
    },
    'Finance/Fintech': {
      pillars: ['Financial literacy', 'Product features', 'Market updates', 'Security & trust', 'Customer stories', 'Expert insights', 'Regulatory updates', 'Tips & tools'],
      trending: ['AI in finance', 'Crypto education', 'Gen-Z money habits', 'Financial wellness', 'Open banking benefits'],
      underserved: ['Money anxiety content', 'Couple finance guides', 'Small business finance', 'Financial recovery stories', 'Cross-border finance tips'],
    },
    'Education/Courses': {
      pillars: ['Course previews', 'Student success', 'Free value content', 'Industry insights', 'Teaching methodology', 'Community', 'Career outcomes', 'Expert interviews'],
      trending: ['Micro-learning content', 'AI-assisted learning', 'Skill stacking guides', 'Remote work skills', 'Career pivot stories'],
      underserved: ['Learning difficulty content', 'ROI of education', 'Alumni network stories', 'Instructor behind-scenes', 'Scholarship/access content'],
    },
  };

  const defaultTopics = {
    pillars: ['Product/service content', 'Educational content', 'Behind-the-scenes', 'Customer stories', 'Industry news', 'Tips & guides', 'Community content', 'Thought leadership'],
    trending: ['AI/automation content', 'Authenticity & transparency', 'Short-form video', 'Community-driven content', 'Value-first content'],
    underserved: ['Failure & learning stories', 'Data-driven insights', 'Customer journey content', 'Cultural relevance', 'Accessibility content'],
  };

  const topics = industryTopics[industry] || defaultTopics;
  const currentTopicsList = currentTopics.toLowerCase().split(',').map(t => t.trim()).filter(Boolean);

  const missingPillars: GapItem[] = topics.pillars
    .filter(p => !currentTopicsList.some(ct => p.toLowerCase().includes(ct) || ct.includes(p.toLowerCase().split(' ')[0])))
    .slice(0, 5)
    .map((pillar, i) => ({
      topic: pillar,
      priority: i < 2 ? 'Critical' as const : i < 4 ? 'High' as const : 'Medium' as const,
      reason: `Missing from your current content mix. ${i < 2 ? 'This is a foundational pillar for ' + industry + '.' : 'Competitors likely cover this regularly.'}`,
      contentIdeas: [
        `Create a ${platforms[0] || 'social'} series on "${pillar}"`,
        `Interview an expert about ${pillar.toLowerCase()}`,
        `Share a case study featuring ${pillar.toLowerCase()}`,
      ],
      expectedImpact: i < 2 ? 'High — fills critical gap in content strategy' : 'Medium — diversifies your content mix',
      difficulty: i < 2 ? 'Medium' as const : 'Easy' as const,
      format: i % 2 === 0 ? 'Carousel + Reel' : 'Thread + Story',
    }));

  const underservedTopics: GapItem[] = [...topics.trending, ...topics.underserved]
    .filter(t => !currentTopicsList.some(ct => t.toLowerCase().includes(ct)))
    .slice(0, 6)
    .map((topic, i) => ({
      topic,
      priority: i < 2 ? 'High' as const : i < 4 ? 'Medium' as const : 'Low' as const,
      reason: i < topics.trending.length ? 'Trending in your industry — early mover advantage' : 'Underserved niche — low competition, high value',
      contentIdeas: [
        `Deep-dive post: "${topic}"`,
        `Quick tips carousel on ${topic.toLowerCase()}`,
        `Video: "What nobody tells you about ${topic.toLowerCase()}"`,
      ],
      expectedImpact: i < 2 ? 'High — trending topics get algorithm boost' : 'Medium — builds authority in underserved areas',
      difficulty: i < 3 ? 'Easy' as const : 'Medium' as const,
      format: platforms.includes('TikTok') ? 'Short-form video' : 'Carousel',
    }));

  const formatGaps = [
    { format: 'Short-form Video (Reels/TikTok)', currentUsage: frequency.includes('daily') ? '30%' : '15%', recommended: '40-50%', gap: 'Video gets 2-3x more reach. Increase video output.' },
    { format: 'Carousels/Slideshows', currentUsage: '20%', recommended: '25-30%', gap: 'Carousels drive saves and shares. Add 1-2/week.' },
    { format: 'Stories/Ephemeral', currentUsage: '10%', recommended: '20-25%', gap: 'Stories keep you top-of-feed. Post daily.' },
    { format: 'Long-form (Articles/Threads)', currentUsage: '10%', recommended: '10-15%', gap: 'Good for SEO and thought leadership. Maintain current or slight increase.' },
    { format: 'User-Generated Content', currentUsage: '5%', recommended: '15-20%', gap: 'UGC builds trust 4x more than brand content. Start a UGC campaign.' },
    { format: 'Live/Interactive', currentUsage: '2%', recommended: '5-10%', gap: 'Live content gets priority in algorithms. Schedule weekly Q&A.' },
  ];

  const funnelStages = [
    { stage: 'Awareness (TOFU)', coverage: stage === 'Cold (Unaware)' || stage === 'All Stages' ? '60%' : '25%', gaps: ['Viral/shareable content', 'Trending topic participation', 'Broad educational content', 'Collaboration content'], priority: goals.includes('Brand Awareness') ? 'Critical' : 'Medium' },
    { stage: 'Consideration (MOFU)', coverage: stage === 'Warm (Problem-Aware)' || stage === 'All Stages' ? '55%' : '20%', gaps: ['Comparison content', 'Deep-dive tutorials', 'Case studies', 'FAQ content'], priority: goals.includes('Lead Generation') ? 'Critical' : 'High' },
    { stage: 'Conversion (BOFU)', coverage: stage === 'Hot (Solution-Aware)' || stage === 'All Stages' ? '50%' : '15%', gaps: ['Testimonials/social proof', 'Limited-time offers', 'Demo/walkthrough content', 'Pricing transparency'], priority: goals.includes('Sales/Conversions') ? 'Critical' : 'High' },
    { stage: 'Retention/Advocacy', coverage: stage === 'Loyal (Customer)' || stage === 'All Stages' ? '45%' : '10%', gaps: ['Customer spotlight content', 'Exclusive tips for customers', 'Community highlights', 'Referral program content'], priority: goals.includes('Customer Retention') ? 'Critical' : 'Medium' },
  ];

  const competitorInsights = competitors.split(',').filter(Boolean).length > 0
    ? [
        { tactic: 'Content frequency', opportunity: 'Competitors likely post more consistently', action: `Increase to ${frequency.includes('daily') ? '2x daily' : 'daily'} with batch creation` },
        { tactic: 'Video content', opportunity: 'Top competitors use 50%+ video', action: 'Create a weekly video series on your core topic' },
        { tactic: 'User-generated content', opportunity: 'Competitors leverage customer content', action: 'Launch a branded hashtag campaign + UGC incentive' },
        { tactic: 'Engagement tactics', opportunity: 'Competitors use polls, quizzes, AMAs', action: 'Add 2 interactive posts/week (polls, questions, quizzes)' },
        { tactic: 'SEO + Social synergy', opportunity: 'Top brands repurpose blog content to social', action: 'Use our Content Repurposer to turn blog posts into social series' },
      ]
    : [
        { tactic: 'No competitors listed', opportunity: 'Add competitor names to get specific insights', action: 'Enter 2-3 competitor brand names above for tailored analysis' },
      ];

  const contentMix = [
    { type: 'Educational/Value', current: 25, ideal: 35, action: '+10% — Create more how-to and tip content' },
    { type: 'Entertaining/Engaging', current: 15, ideal: 25, action: '+10% — Add memes, trends, relatable content' },
    { type: 'Promotional/Sales', current: 30, ideal: 15, action: '-15% — Reduce hard sells; let value content sell for you' },
    { type: 'Community/UGC', current: 5, ideal: 15, action: '+10% — Feature customers, run hashtag campaigns' },
    { type: 'Behind-the-scenes', current: 10, ideal: 10, action: 'On track — maintain current level' },
    { type: 'Thought Leadership', current: 15, ideal: 10, action: '-5% — Convert some to more accessible formats' },
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const weeklyActionPlan = days.map((day, i) => {
    const actions = [
      { action: 'Publish educational content', topic: missingPillars[0]?.topic || 'Core topic deep-dive', format: 'Carousel' },
      { action: 'Post trending/reactive content', topic: underservedTopics[0]?.topic || 'Industry trend', format: 'Reel/TikTok' },
      { action: 'Share customer story or UGC', topic: 'Customer success spotlight', format: 'Image + story' },
      { action: 'Publish thought leadership', topic: missingPillars[1]?.topic || 'Industry insight', format: 'Thread/Article' },
      { action: 'Interactive content day', topic: 'Community engagement', format: 'Poll/Quiz/AMA' },
      { action: 'Behind-the-scenes content', topic: 'Team/process showcase', format: 'Story/Reel' },
      { action: 'Repurpose best-performing content', topic: 'Top post from the week', format: 'Cross-platform repost' },
    ];
    return { day, ...actions[i] };
  });

  const quickWins = [
    'Repurpose your top 5 performing posts into new formats (carousel → reel, thread → carousel)',
    'Start a weekly series (e.g., "Tip Tuesday", "Friday Feature")',
    'Create a branded hashtag and encourage customer usage',
    'Turn customer DMs/questions into content (FAQ series)',
    'Batch-create 2 weeks of content in one session',
  ];

  const longTermPlays = [
    'Build a content pillar strategy with 4-5 core themes rotating weekly',
    'Develop a UGC flywheel: incentivize creation → curate → amplify → repeat',
    'Create an evergreen content library that can be reshared seasonally',
    'Establish thought leadership through original research and data reports',
    `Develop ${platforms.length > 1 ? 'cross-platform' : 'platform-native'} content workflows for maximum efficiency`,
  ];

  const gapCount = missingPillars.filter(p => p.priority === 'Critical').length + underservedTopics.filter(t => t.priority === 'High').length;
  const overallScore = Math.max(15, Math.min(95, 85 - (gapCount * 8) - (currentTopicsList.length < 3 ? 15 : 0) + (platforms.length > 2 ? 5 : 0)));

  return {
    overallScore,
    missingPillars,
    underservedTopics,
    formatGaps,
    funnelAnalysis: funnelStages,
    competitorInsights,
    contentMix,
    weeklyActionPlan,
    quickWins,
    longTermPlays,
  };
}

export default function ContentGapPage() {
  const [industry, setIndustry] = useState<string>('SaaS/Tech');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['Instagram', 'LinkedIn']);
  const [selectedGoals, setSelectedGoals] = useState<string[]>(['Brand Awareness']);
  const [stage, setStage] = useState<string>('All Stages');
  const [frequency, setFrequency] = useState<string>('3-4x/week');
  const [currentTopics, setCurrentTopics] = useState('');
  const [competitors, setCompetitors] = useState('');
  const [result, setResult] = useState<ContentGapResult | null>(null);

  const togglePlatform = (p: string) => setSelectedPlatforms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  const toggleGoal = (g: string) => setSelectedGoals(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);

  const handleAnalyze = () => {
    if (selectedPlatforms.length === 0 || selectedGoals.length === 0) return;
    setResult(analyzeContentGap(industry, selectedPlatforms, selectedGoals, stage, frequency, currentTopics, competitors));
  };

  return (
    <main className="min-h-screen bg-zinc-950 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Content Gap Analyzer</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Find the missing pieces in your social media strategy. Discover <strong className="text-white">untapped topics, underserved formats, and funnel gaps</strong> that your competitors are exploiting.</p>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Industry</label>
            <select value={industry} onChange={e => setIndustry(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {industries.map(i => <option key={i}>{i}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Audience Stage</label>
            <select value={stage} onChange={e => setStage(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {audienceStages.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-zinc-400 mb-2">Platforms (select all that apply)</label>
          <div className="flex flex-wrap gap-2">
            {platformOptions.map(p => (
              <button key={p} onClick={() => togglePlatform(p)} className={`px-3 py-1.5 rounded-lg text-sm border transition ${selectedPlatforms.includes(p) ? 'bg-violet-600/20 border-violet-500 text-violet-300' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-600'}`}>{p}</button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-zinc-400 mb-2">Content Goals (select all that apply)</label>
          <div className="flex flex-wrap gap-2">
            {contentGoals.map(g => (
              <button key={g} onClick={() => toggleGoal(g)} className={`px-3 py-1.5 rounded-lg text-sm border transition ${selectedGoals.includes(g) ? 'bg-fuchsia-600/20 border-fuchsia-500 text-fuchsia-300' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-600'}`}>{g}</button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Posting Frequency</label>
            <select value={frequency} onChange={e => setFrequency(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {postFrequencies.map(f => <option key={f}>{f}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Competitor Names (comma-separated)</label>
            <input type="text" value={competitors} onChange={e => setCompetitors(e.target.value)} placeholder="e.g., Buffer, Hootsuite, Later" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600" />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-zinc-400 mb-1">Topics You Currently Cover (comma-separated)</label>
          <input type="text" value={currentTopics} onChange={e => setCurrentTopics(e.target.value)} placeholder="e.g., product updates, tips, behind-the-scenes" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600" />
        </div>

        <button onClick={handleAnalyze} className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition">
          Analyze Content Gaps
        </button>

        {result && (
          <div className="mt-10 space-y-6">
            {/* Overall Score */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex items-center gap-6">
              <div className={`text-5xl font-bold ${result.overallScore >= 70 ? 'text-green-400' : result.overallScore >= 45 ? 'text-yellow-400' : 'text-red-400'}`}>
                {result.overallScore}%
              </div>
              <div>
                <div className="text-white font-semibold text-lg">Content Strategy Coverage Score</div>
                <div className="text-zinc-400 text-sm">{result.overallScore >= 70 ? 'Your strategy is solid. Focus on the gaps below to reach excellence.' : result.overallScore >= 45 ? 'Significant gaps found. Address critical items first for quick wins.' : 'Major gaps detected. Your content strategy needs restructuring.'}</div>
              </div>
            </div>

            {/* Missing Pillars */}
            {result.missingPillars.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Missing Content Pillars</h2>
                <div className="space-y-3">
                  {result.missingPillars.map((gap, i) => (
                    <div key={i} className={`bg-zinc-900 border rounded-xl p-5 ${gap.priority === 'Critical' ? 'border-red-500/50' : gap.priority === 'High' ? 'border-yellow-500/50' : 'border-zinc-800'}`}>
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${gap.priority === 'Critical' ? 'bg-red-600/20 text-red-300' : gap.priority === 'High' ? 'bg-yellow-600/20 text-yellow-300' : 'bg-zinc-800 text-zinc-400'}`}>{gap.priority}</span>
                        <span className="text-white font-semibold">{gap.topic}</span>
                        <span className="text-xs text-zinc-500 ml-auto">{gap.difficulty} to implement</span>
                      </div>
                      <p className="text-zinc-400 text-sm mb-2">{gap.reason}</p>
                      <div className="text-sm"><span className="text-zinc-500">Ideas: </span>{gap.contentIdeas.join(' | ')}</div>
                      <div className="text-sm mt-1"><span className="text-zinc-500">Impact: </span><span className="text-green-400">{gap.expectedImpact}</span></div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Underserved Topics */}
            {result.underservedTopics.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Underserved & Trending Topics</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {result.underservedTopics.map((topic, i) => (
                    <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${topic.priority === 'High' ? 'bg-yellow-600/20 text-yellow-300' : topic.priority === 'Medium' ? 'bg-blue-600/20 text-blue-300' : 'bg-zinc-800 text-zinc-400'}`}>{topic.priority}</span>
                        <span className="text-white text-sm font-medium">{topic.topic}</span>
                      </div>
                      <p className="text-zinc-500 text-xs mb-1">{topic.reason}</p>
                      <p className="text-zinc-400 text-xs">Format: {topic.format} | {topic.difficulty}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Content Mix */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-4">Content Mix Analysis</h3>
              <div className="space-y-3">
                {result.contentMix.map((mix, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-40 text-sm text-zinc-300 shrink-0">{mix.type}</div>
                    <div className="flex-1">
                      <div className="flex gap-1 h-4">
                        <div className="bg-zinc-700 rounded-l" style={{ width: `${mix.current}%` }}>
                          <div className="h-full bg-violet-600 rounded-l" style={{ width: '100%' }} />
                        </div>
                        <div className="bg-zinc-800 rounded-r" style={{ width: `${Math.max(0, mix.ideal - mix.current)}%` }}>
                          <div className="h-full bg-violet-600/30 rounded-r" style={{ width: '100%' }} />
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-zinc-500 w-24 text-right">{mix.current}% / {mix.ideal}%</div>
                    <div className="text-xs text-zinc-400 w-64">{mix.action}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Funnel Analysis */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-4">Funnel Coverage Analysis</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {result.funnelAnalysis.map((f, i) => (
                  <div key={i} className={`border rounded-lg p-4 ${f.priority === 'Critical' ? 'border-red-500/30 bg-red-950/10' : 'border-zinc-800'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium text-sm">{f.stage}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${f.priority === 'Critical' ? 'bg-red-600/20 text-red-300' : f.priority === 'High' ? 'bg-yellow-600/20 text-yellow-300' : 'bg-zinc-800 text-zinc-400'}`}>{f.priority}</span>
                    </div>
                    <div className="text-zinc-500 text-xs mb-2">Coverage: {f.coverage}</div>
                    <ul className="space-y-1">{f.gaps.map((g, j) => <li key={j} className="text-zinc-400 text-xs flex gap-1"><span className="text-violet-400">-</span>{g}</li>)}</ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Format Gaps */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-4">Format Gap Analysis</h3>
              <div className="space-y-3">
                {result.formatGaps.map((fg, i) => (
                  <div key={i} className="flex items-start gap-4 text-sm">
                    <div className="w-48 text-zinc-300 shrink-0 font-medium">{fg.format}</div>
                    <div className="text-zinc-500">Now: {fg.currentUsage}</div>
                    <div className="text-green-400">Target: {fg.recommended}</div>
                    <div className="text-zinc-400 flex-1">{fg.gap}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Competitor Insights */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Competitor Gap Opportunities</h3>
              <div className="space-y-3">
                {result.competitorInsights.map((ci, i) => (
                  <div key={i} className="flex gap-4 text-sm">
                    <span className="text-violet-400 font-medium w-36 shrink-0">{ci.tactic}</span>
                    <span className="text-zinc-400 flex-1">{ci.opportunity}</span>
                    <span className="text-zinc-300 w-64">{ci.action}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Action Plan */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-4">7-Day Gap-Filling Action Plan</h3>
              <div className="space-y-2">
                {result.weeklyActionPlan.map((day, i) => (
                  <div key={i} className={`flex items-center gap-4 text-sm p-2 rounded-lg ${i % 2 === 0 ? 'bg-zinc-800/30' : ''}`}>
                    <span className="text-violet-400 font-medium w-24">{day.day}</span>
                    <span className="text-zinc-300 flex-1">{day.action}</span>
                    <span className="text-zinc-400 w-48">{day.topic}</span>
                    <span className="text-zinc-500 w-32 text-right">{day.format}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Wins & Long Term */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Quick Wins (This Week)</h3>
                <ul className="space-y-2">{result.quickWins.map((w, i) => <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-green-400">-</span>{w}</li>)}</ul>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Long-Term Plays (Next 90 Days)</h3>
                <ul className="space-y-2">{result.longTermPlays.map((p, i) => <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-fuchsia-400">-</span>{p}</li>)}</ul>
              </div>
            </div>

            {/* Internal Links */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-zinc-400 mb-3">Fill Your Content Gaps With</h3>
              <div className="flex flex-wrap gap-2 text-sm">
                <a href="/content-pillars" className="text-violet-400 hover:text-violet-300 underline">Content Pillars</a>
                <a href="/content-calendar" className="text-violet-400 hover:text-violet-300 underline">Content Calendar</a>
                <a href="/idea-generator" className="text-violet-400 hover:text-violet-300 underline">Idea Generator</a>
                <a href="/repurpose" className="text-violet-400 hover:text-violet-300 underline">Content Repurposer</a>
                <a href="/competitor-tracker" className="text-violet-400 hover:text-violet-300 underline">Competitor Tracker</a>
                <a href="/persona-builder" className="text-violet-400 hover:text-violet-300 underline">Persona Builder</a>
                <a href="/ad-copy" className="text-violet-400 hover:text-violet-300 underline">Ad Copy Generator</a>
                <a href="/social-audit" className="text-violet-400 hover:text-violet-300 underline">Social Audit</a>
              </div>
            </div>
          </div>
        )}

        {/* FAQ */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">Content Gap Analyzer FAQ</h2>
          <div className="space-y-4">
            {[
              { q: 'What is a content gap analysis?', a: 'A content gap analysis identifies topics, formats, and funnel stages that your current content strategy is missing. It reveals opportunities where competitors are active but you\'re not, where your audience has unmet needs, and where algorithm changes favor formats you\'re underusing. Regular gap analysis (monthly) keeps your strategy competitive.' },
              { q: 'How often should I run a content gap analysis?', a: 'Run a full analysis monthly and a quick check weekly. Social media trends shift fast — what worked 3 months ago may be saturated now. After major algorithm changes (Instagram, TikTok, LinkedIn all update quarterly), run an immediate analysis to spot new format opportunities.' },
              { q: 'What\'s the difference between content pillars and content gaps?', a: 'Content pillars are your chosen strategic themes (what you want to be known for). Content gaps are the missing pieces in your execution — topics within your pillars you haven\'t covered, formats you\'re underusing, or funnel stages you\'re neglecting. Use our Content Pillars tool to define strategy, then this tool to audit execution.' },
              { q: 'How do I prioritize which gaps to fill first?', a: 'Follow the ICE framework: Impact (how much will filling this gap move your KPIs?), Confidence (how sure are you it will work?), Ease (how quickly can you create this content?). Critical missing pillars and trending topics with high impact and low difficulty should come first. Our tool marks priorities to help you decide.' },
              { q: 'Can content gaps hurt my social media growth?', a: 'Absolutely. Missing content at key funnel stages means losing potential customers at each step. If you have great awareness content but no consideration content, followers won\'t convert. If you lack engagement-driving formats (video, carousels), algorithms deprioritize your reach. Gaps compound over time.' },
            ].map((faq, i) => (
              <details key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 group">
                <summary className="font-semibold text-white cursor-pointer">{faq.q}</summary>
                <p className="text-zinc-400 text-sm mt-2">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 border-t border-zinc-800 pt-8 pb-12">
          <div className="grid md:grid-cols-4 gap-8 text-sm text-zinc-500">
            <div>
              <h4 className="font-semibold text-white mb-3">Content Creation</h4>
              <ul className="space-y-1"><li><a href="/" className="hover:text-white transition">Post Generator</a></li><li><a href="/hooks" className="hover:text-white transition">Hook Generator</a></li><li><a href="/video-scripts" className="hover:text-white transition">Video Scripts</a></li><li><a href="/threads" className="hover:text-white transition">Thread Generator</a></li><li><a href="/carousel-generator" className="hover:text-white transition">Carousel Generator</a></li><li><a href="/ad-copy" className="hover:text-white transition">Ad Copy Generator</a></li></ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Optimization</h4>
              <ul className="space-y-1"><li><a href="/caption-optimizer" className="hover:text-white transition">Caption Optimizer</a></li><li><a href="/hashtags" className="hover:text-white transition">Hashtags</a></li><li><a href="/post-timing" className="hover:text-white transition">Post Timing</a></li><li><a href="/social-seo" className="hover:text-white transition">Social SEO</a></li><li><a href="/virality-score" className="hover:text-white transition">Virality Score</a></li><li><a href="/conversion-optimizer" className="hover:text-white transition">Conversion Optimizer</a></li></ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Analytics</h4>
              <ul className="space-y-1"><li><a href="/engagement-calculator" className="hover:text-white transition">Engagement</a></li><li><a href="/sentiment-analyzer" className="hover:text-white transition">Sentiment</a></li><li><a href="/roi-calculator" className="hover:text-white transition">ROI Calculator</a></li><li><a href="/competitor-analysis" className="hover:text-white transition">Competitors</a></li><li><a href="/content-gap" className="hover:text-white transition">Content Gap</a></li></ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Strategy</h4>
              <ul className="space-y-1"><li><a href="/brand-voice" className="hover:text-white transition">Brand Voice</a></li><li><a href="/content-calendar" className="hover:text-white transition">Calendar</a></li><li><a href="/campaign" className="hover:text-white transition">Campaign Mode</a></li><li><a href="/persona-builder" className="hover:text-white transition">Persona Builder</a></li><li><a href="/content-pillars" className="hover:text-white transition">Content Pillars</a></li></ul>
            </div>
          </div>
          <p className="text-center text-zinc-600 text-xs mt-8">© 2026 PostCraft AI. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
