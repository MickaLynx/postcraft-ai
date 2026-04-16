'use client';
import { useState } from 'react';

const industries = ['Tech & SaaS', 'E-commerce & DTC', 'Healthcare', 'Finance & FinTech', 'Education & EdTech', 'Real Estate', 'Agency & Consulting', 'Manufacturing', 'Non-Profit', 'Food & Beverage', 'Travel & Hospitality', 'Fitness & Wellness'] as const;
const platforms = ['LinkedIn', 'Instagram', 'Twitter/X', 'TikTok', 'Facebook', 'YouTube', 'Threads', 'All Platforms'] as const;
const trendTypes = ['Breaking News', 'Viral Meme', 'Industry Announcement', 'Cultural Moment', 'Seasonal Event', 'Tech Launch', 'Award/Achievement', 'Controversy/Debate'] as const;
const tones = ['Witty & Clever', 'Professional & Insightful', 'Bold & Provocative', 'Educational & Helpful', 'Empathetic & Thoughtful', 'Playful & Fun'] as const;
const responseWindows = ['Instant (< 1 hour)', 'Same Day (1-4 hours)', 'Next Day (12-24 hours)', 'Planned (2-5 days)'] as const;
const riskLevels = ['Safe (Low Risk)', 'Moderate (Some Risk)', 'Bold (Higher Risk)', 'Edgy (Proceed with Caution)'] as const;

interface TrendPost { platform: string; format: string; hook: string; body: string; cta: string; timing: string; hashtags: string[]; }
interface AngleFramework { angle: string; connection: string; yourExpertise: string; bridgePhrase: string; example: string; }
interface RiskAssessment { factor: string; level: string; mitigation: string; redLine: string; }
interface TimelineAction { phase: string; timeframe: string; action: string; content: string; goal: string; }
interface TrendOpportunity { signal: string; source: string; relevanceScore: string; actionability: string; expiryWindow: string; }

interface TrendHijack {
  viralPotential: number;
  posts: TrendPost[];
  angles: AngleFramework[];
  risks: RiskAssessment[];
  timeline: TimelineAction[];
  opportunities: TrendOpportunity[];
  dosAndDonts: { dos: string[]; donts: string[] };
  recoveryPlan: string[];
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }

function generateTrendHijack(industry: string, platform: string, trendType: string, tone: string, window: string, risk: string, trendTopic: string, yourBrand: string): TrendHijack {
  const seed = hash(`${industry}-${platform}-${trendType}-${tone}-${window}-${risk}-${trendTopic}-${yourBrand}`);
  const score = 40 + seed % 55;

  const hooks = [
    `Everyone's talking about ${trendTopic}. But here's what nobody in ${industry.toLowerCase()} is saying...`,
    `${trendTopic} just changed the game. Here's how ${yourBrand} was already ahead of the curve.`,
    `Hot take: ${trendTopic} isn't what most people think it is. Let me explain (from a ${industry.toLowerCase()} perspective).`,
    `The ${trendTopic} conversation is missing one crucial point — and it matters for every ${industry.toLowerCase()} professional.`,
    `${yourBrand}'s take on ${trendTopic}: 3 lessons we learned that apply to everyone.`,
    `While everyone reacts to ${trendTopic}, smart ${industry.toLowerCase()} teams are already doing THIS.`,
    `${trendTopic} has the internet divided. Here's the nuanced take from someone who's been in ${industry.toLowerCase()} for years.`,
    `"What does ${trendTopic} mean for us?" — This is the first question our team asked. Here's the answer.`,
  ];
  const bodies = [
    `When ${trendTopic} broke, our Slack channel lit up. Not because we were surprised — but because we'd been preparing for exactly this scenario. Here's what we're telling our ${industry.toLowerCase()} clients: 1) Don't panic-react. 2) Assess the 90-day impact. 3) Find the opportunity others are missing. At ${yourBrand}, we've already adjusted our approach. Here's exactly how...`,
    `Everyone's rushing to comment on ${trendTopic}. But the real question isn't "what happened" — it's "what's next?" In ${industry.toLowerCase()}, we've seen this pattern before. The winners aren't the first to react — they're the ones who connect the dots others miss. Here's our framework for turning trending moments into lasting advantage...`,
    `${trendTopic} is dominating every feed right now. But here's the angle that matters for ${industry.toLowerCase()} professionals: this isn't new — it's the acceleration of a trend we've been tracking for 18 months at ${yourBrand}. The playbook: acknowledge the moment, add unique value, and position your expertise. Here's how we're applying this...`,
    `Quick thread on ${trendTopic} and why it matters more than most people realize for the ${industry.toLowerCase()} space. We've been following this at ${yourBrand} and here's our honest take: the surface-level reactions are wrong. Here's what's actually happening, why it matters, and what you should do about it this week...`,
    `If ${trendTopic} taught us anything, it's that the ${industry.toLowerCase()} landscape moves fast — and the brands that win are the ones who add perspective, not noise. At ${yourBrand}, we focus on three things when a trend hits: 1) Is this relevant to our audience? 2) Can we add genuine value? 3) Does this align with our brand? Only when all three are yes do we post. And today, all three are yes.`,
    `The ${trendTopic} discourse has reached peak noise. Time for signal. As someone who's worked in ${industry.toLowerCase()} for years, here's what I wish more people understood about this moment. It's not about jumping on a bandwagon — it's about connecting your expertise to what people are already paying attention to.`,
  ];
  const ctas = [
    `What's your ${industry.toLowerCase()} take on ${trendTopic}? Drop your thoughts below — best insight gets featured in our newsletter.`,
    `Follow ${yourBrand} for more ${industry.toLowerCase()} takes that go beyond the headlines. We post daily insights.`,
    `Want our full analysis? We just published a deep-dive on our blog → link in bio.`,
    `Save this for the next time a trend hits your industry. You'll thank yourself later.`,
    `Agree? Disagree? Let's debate in the comments. Tag someone who needs to see this.`,
    `Repost if this resonated. More ${industry.toLowerCase()} professionals need to hear this perspective.`,
  ];
  const platformNames = ['LinkedIn', 'Instagram', 'Twitter/X', 'TikTok', 'Facebook', 'YouTube', 'Threads', 'Newsletter'];
  const formats = ['Long-form thought leadership post', 'Carousel: trend breakdown (6 slides)', 'Thread (5 tweets) with hot take', 'Duet/Stitch with trend video, 60s take', 'Community post + poll', 'YouTube Short: 45s commentary', 'Thread with engagement hooks', 'Email: trend analysis + implications'];
  const timings = ['Post within 2 hours for maximum reach', 'Post during lunch break (12-1pm) for carousel engagement', 'Post within 30 min for trending topic visibility', 'Post within 4 hours before TikTok algo catches up', 'Post next morning for Facebook audience peak', 'Upload within 24 hours while search volume is high', 'Post within 1 hour while conversation is active', 'Send same-day if subscriber base is large enough'];

  const posts: TrendPost[] = Array.from({ length: 8 }, (_, i) => ({
    platform: platformNames[i],
    format: formats[i],
    hook: hooks[(seed + i * 2) % hooks.length],
    body: bodies[(seed + i * 3) % bodies.length],
    cta: ctas[(seed + i * 4) % ctas.length],
    timing: timings[i],
    hashtags: [
      `#${trendTopic.replace(/\s+/g, '')}`,
      `#${industry.replace(/[&\s]+/g, '')}`,
      '#TrendAlert',
      `#${yourBrand.replace(/\s+/g, '')}`,
      '#MarketingTips',
    ],
  }));

  const angles: AngleFramework[] = [
    { angle: 'Expert Analysis', connection: `Link ${trendTopic} to ${industry.toLowerCase()} best practices`, yourExpertise: `Years of ${industry.toLowerCase()} experience give you unique insight`, bridgePhrase: `"What most people miss about ${trendTopic} is..."`, example: `Analyze the trend through your industry lens — data-backed, not opinion-based` },
    { angle: 'Counter-Narrative', connection: `Challenge the mainstream ${trendTopic} take with evidence`, yourExpertise: `${yourBrand} has data/experience that contradicts popular opinion`, bridgePhrase: `"Actually, ${trendTopic} shows us the opposite of what everyone's saying..."`, example: `Present contrarian view backed by your real results or customer data` },
    { angle: 'Prediction', connection: `Use ${trendTopic} as a springboard for future forecasting`, yourExpertise: `Pattern recognition from ${industry.toLowerCase()} trend cycles`, bridgePhrase: `"If ${trendTopic} taught us anything, here's what's coming next..."`, example: `Make a specific, time-bound prediction your audience can track` },
    { angle: 'How-To', connection: `Turn ${trendTopic} into actionable steps for your audience`, yourExpertise: `${yourBrand}'s methodology applies directly to this trend`, bridgePhrase: `"Here's exactly how to apply ${trendTopic} to your ${industry.toLowerCase()} business..."`, example: `3-5 step framework your audience can implement this week` },
    { angle: 'Behind-the-Scenes', connection: `Share how ${yourBrand} reacted internally to ${trendTopic}`, yourExpertise: `Authentic, real-time decision-making process`, bridgePhrase: `"Here's what happened in our team Slack when ${trendTopic} broke..."`, example: `Show the human side — screenshots, team reactions, quick pivots` },
    { angle: 'Cultural Commentary', connection: `Place ${trendTopic} in broader ${industry.toLowerCase()} context`, yourExpertise: `Big-picture thinking and historical pattern awareness`, bridgePhrase: `"${trendTopic} is part of a bigger shift that started 3 years ago..."`, example: `Connect 3+ data points to tell a bigger story than anyone else is telling` },
  ];

  const risks: RiskAssessment[] = [
    { factor: 'Brand Alignment', level: risk.includes('Safe') ? 'Low' : risk.includes('Moderate') ? 'Medium' : 'High', mitigation: 'Run content past brand guidelines checklist before posting', redLine: 'If the trend contradicts your brand values, do not engage — silence is better than misalignment' },
    { factor: 'Audience Sensitivity', level: 'Medium', mitigation: `Check if ${trendTopic} touches political, religious, or social issues your audience cares about`, redLine: 'If marginalized communities are affected, listen first — do not co-opt their moment for reach' },
    { factor: 'Timing Decay', level: 'High', mitigation: 'Set a hard deadline — if you miss the window, pivot to an evergreen angle', redLine: 'If 48+ hours have passed and your take adds nothing new, skip it entirely' },
    { factor: 'Competitor Saturation', level: 'Medium', mitigation: 'Search your niche before posting — if 5+ competitors already posted similar takes, find a unique angle or skip', redLine: 'Never post a "me too" take — either add genuine value or stay silent' },
    { factor: 'Factual Accuracy', level: 'High', mitigation: 'Verify all claims with 2+ sources before posting, especially for breaking news', redLine: 'Never post about unconfirmed news — the reputational risk far exceeds the first-mover advantage' },
  ];

  const timeline: TimelineAction[] = [
    { phase: 'Monitor', timeframe: '0-15 min', action: 'Detect trend early via alerts and social listening', content: 'No public content yet — internal assessment only', goal: 'Determine if this is worth engaging with' },
    { phase: 'Assess', timeframe: '15-30 min', action: 'Run through risk checklist, check brand alignment', content: 'Draft 2-3 angle options, select strongest', goal: 'Confirm go/no-go decision and primary angle' },
    { phase: 'Create', timeframe: '30-60 min', action: 'Write content for primary platform, adapt for others', content: 'Primary post + 2 platform adaptations', goal: 'Quality content ready for review/approval' },
    { phase: 'Publish', timeframe: '1-2 hours', action: 'Post on primary platform first, stagger others', content: 'Primary post live, others scheduled at optimal times', goal: 'Maximum reach within trend window' },
    { phase: 'Engage', timeframe: '2-6 hours', action: 'Monitor comments, respond thoughtfully, amplify best responses', content: 'Reply to top comments, share best UGC reactions', goal: 'Drive conversation and build community around your take' },
    { phase: 'Extend', timeframe: '24-48 hours', action: 'Repurpose into blog post, newsletter, or long-form content', content: 'Evergreen version that lives beyond the trend cycle', goal: 'Extract lasting SEO and content value from the moment' },
  ];

  const opportunities: TrendOpportunity[] = [
    { signal: `${trendTopic} search volume spike on Google Trends`, source: 'Google Trends alerts', relevanceScore: 'High', actionability: 'Create SEO-optimized blog post within 24h', expiryWindow: '3-5 days before volume normalizes' },
    { signal: `Competitor silence on ${trendTopic}`, source: 'Social media monitoring', relevanceScore: 'High', actionability: 'First-mover advantage in your niche', expiryWindow: '12-24 hours before competitors catch up' },
    { signal: `Journalists covering ${trendTopic} angles`, source: 'HARO / media monitoring', relevanceScore: 'Medium', actionability: 'Pitch your expert take for media coverage', expiryWindow: '24-48 hours for news cycle relevance' },
    { signal: `Related hashtags trending on Twitter/X`, source: 'Twitter trending + Brandwatch', relevanceScore: 'Medium', actionability: 'Join conversation with unique ${industry.toLowerCase()} angle', expiryWindow: '4-8 hours for hashtag visibility' },
    { signal: `${trendTopic} generating debate in LinkedIn comments`, source: 'LinkedIn notifications + Sales Navigator', relevanceScore: 'High', actionability: 'Post thought-leadership take, engage in threads', expiryWindow: '24-72 hours (LinkedIn has longer trend cycles)' },
  ];

  const dosAndDonts = {
    dos: [
      'Add genuine value — your take should inform, not just acknowledge',
      'Move fast but verify facts — speed without accuracy destroys trust',
      'Connect the trend to your expertise naturally — forced connections backfire',
      'Have a pre-approved rapid-response framework so you can move quickly',
      'Credit original sources and creators — riding trends ethically builds reputation',
      'Save your hottest takes for trends you genuinely understand — silence is strategic',
      'Track performance of trend-jacking posts separately — build a playbook from data',
      'Set up Google Alerts, Twitter Lists, and Reddit monitoring for early detection',
    ],
    donts: [
      'Never co-opt tragedy, grief, or social justice movements for brand promotion',
      'Never post unverified information — one wrong fact can undo years of credibility',
      'Never jump on trends that contradict your brand values — consistency beats virality',
      'Never make it 100% self-promotional — the ratio should be 80% value, 20% brand',
      'Never delete a trend-jacking post if it gets negative reactions — address it publicly',
      'Never use trendjacking for controversial political takes unless that IS your brand',
      'Never copy another brand\'s trend take — even small variations aren\'t enough',
      'Never ignore the community\'s reaction — engagement is a two-way conversation',
    ],
  };

  const recoveryPlan = [
    'Acknowledge the misstep within 2 hours — speed of response matters more than perfection of response',
    'Issue a genuine apology (not "sorry if you were offended") — own the specific mistake',
    'Explain what you\'ve learned and what you\'re changing — concrete actions, not vague promises',
    'Do NOT delete the original post unless it contains factual errors — deleting looks like hiding',
    'Pause all scheduled content for 24-48 hours — appearing to carry on as normal looks tone-deaf',
    'Brief your entire team so everyone gives consistent responses to questions',
    'Follow up in 1 week with a thoughtful reflection — show that the lesson stuck',
    'Update your trend-jacking guidelines to prevent the same mistake — document the learning',
  ];

  return { viralPotential: score, posts, angles, risks, timeline, opportunities, dosAndDonts, recoveryPlan };
}

export default function TrendHijackingPage() {
  const [industry, setIndustry] = useState(industries[0]);
  const [platform, setPlatform] = useState(platforms[0]);
  const [trendType, setTrendType] = useState(trendTypes[0]);
  const [tone, setTone] = useState(tones[0]);
  const [window, setWindow] = useState(responseWindows[0]);
  const [risk, setRisk] = useState(riskLevels[0]);
  const [trendTopic, setTrendTopic] = useState('');
  const [yourBrand, setYourBrand] = useState('');
  const [result, setResult] = useState<TrendHijack | null>(null);

  const handleGenerate = () => { if (trendTopic.trim() && yourBrand.trim()) setResult(generateTrendHijack(industry, platform, trendType, tone, window, risk, trendTopic, yourBrand)); };
  const scoreColor = (n: number) => n > 75 ? '#34d399' : n > 55 ? '#fbbf24' : n > 35 ? '#fb923c' : '#f87171';
  const riskColor = (l: string) => l === 'Low' ? '#34d399' : l === 'Medium' ? '#fbbf24' : '#f87171';

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Trend Hijacking Generator</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Turn trending topics into branded content that goes viral. Get multi-platform posts, angle frameworks, risk assessments, response timelines, and recovery plans — all customized to your industry and brand voice.</p>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Trending Topic / Event</label>
            <input type="text" value={trendTopic} onChange={e => setTrendTopic(e.target.value)} placeholder="e.g., Apple Vision Pro 3, AI regulation, viral TikTok trend" className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-3 text-zinc-100" />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Your Brand / Company</label>
            <input type="text" value={yourBrand} onChange={e => setYourBrand(e.target.value)} placeholder="e.g., PostCraft, Acme Corp" className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-3 text-zinc-100" />
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {([
            { label: 'Industry', value: industry, setter: setIndustry as (v: string) => void, options: industries as readonly string[] },
            { label: 'Primary Platform', value: platform, setter: setPlatform as (v: string) => void, options: platforms as readonly string[] },
            { label: 'Trend Type', value: trendType, setter: setTrendType as (v: string) => void, options: trendTypes as readonly string[] },
            { label: 'Tone', value: tone, setter: setTone as (v: string) => void, options: tones as readonly string[] },
            { label: 'Response Window', value: window, setter: setWindow as (v: string) => void, options: responseWindows as readonly string[] },
            { label: 'Risk Tolerance', value: risk, setter: setRisk as (v: string) => void, options: riskLevels as readonly string[] },
          ] as const).map(({ label, value, setter, options }) => (
            <div key={label}>
              <label className="block text-sm text-zinc-400 mb-1">{label}</label>
              <select value={value} onChange={e => setter(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100">
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
        <button onClick={handleGenerate} className="w-full md:w-auto bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded font-semibold hover:opacity-90 transition mb-8">Generate Trend Hijack Plan</button>

        {result && (
          <div className="space-y-8">
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 text-center">
              <div className="text-5xl font-bold mb-2" style={{ color: scoreColor(result.viralPotential) }}>{result.viralPotential}</div>
              <div className="text-zinc-400">Viral Potential Score</div>
              <div className="mt-3 max-w-md mx-auto w-full bg-zinc-800 rounded-full h-3">
                <div className="h-3 rounded-full" style={{ width: `${result.viralPotential}%`, background: scoreColor(result.viralPotential) }} />
              </div>
            </div>

            {/* Response Timeline */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Response Timeline</h3>
              <div className="space-y-3">
                {result.timeline.map((t, i) => (
                  <div key={i} className="flex gap-4 items-start bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="shrink-0 w-20 text-center">
                      <div className="text-xs text-violet-400 font-semibold uppercase">{t.phase}</div>
                      <div className="text-xs text-zinc-500 mt-1">{t.timeframe}</div>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-zinc-200 text-sm mb-1">{t.action}</div>
                      <div className="text-xs text-zinc-400 mb-1">{t.content}</div>
                      <div className="text-xs text-emerald-400/70">Goal: {t.goal}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Angle Frameworks */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Angle Frameworks ({result.angles.length})</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {result.angles.map((a, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="text-xs text-violet-400 font-semibold uppercase tracking-wider mb-2">{a.angle}</div>
                    <div className="text-sm text-zinc-300 mb-2 italic bg-zinc-900/60 rounded p-2 border border-zinc-700/30">{a.bridgePhrase}</div>
                    <div className="text-xs space-y-1">
                      <div><span className="text-zinc-500">Connection:</span> <span className="text-zinc-400">{a.connection}</span></div>
                      <div><span className="text-zinc-500">Your edge:</span> <span className="text-emerald-400/70">{a.yourExpertise}</span></div>
                      <div><span className="text-zinc-500">Example:</span> <span className="text-zinc-400">{a.example}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Posts */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Platform-Specific Posts ({result.posts.length})</h3>
              <div className="space-y-4">
                {result.posts.map((p, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex gap-2 mb-2">
                      <span className="text-xs px-2 py-1 rounded bg-violet-400/10 text-violet-400 border border-violet-400/30">{p.platform}</span>
                      <span className="text-xs px-2 py-1 rounded bg-zinc-700 text-zinc-300">{p.format}</span>
                      <span className="text-xs px-2 py-1 rounded bg-yellow-400/10 text-yellow-400 border border-yellow-400/30">{p.timing}</span>
                    </div>
                    <div className="font-semibold text-zinc-200 mb-1">{p.hook}</div>
                    <div className="text-sm text-zinc-400 mb-2">{p.body}</div>
                    <div className="text-sm text-emerald-400 mb-2">{p.cta}</div>
                    <div className="flex flex-wrap gap-1">{p.hashtags.map((h, j) => <span key={j} className="text-xs text-violet-400/60">{h}</span>)}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Assessment */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Risk Assessment</h3>
              <div className="space-y-3">
                {result.risks.map((r, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-semibold text-zinc-200">{r.factor}</span>
                      <span className="text-xs px-2 py-1 rounded font-semibold" style={{ color: riskColor(r.level), background: `${riskColor(r.level)}15`, border: `1px solid ${riskColor(r.level)}40` }}>{r.level}</span>
                    </div>
                    <div className="text-sm text-zinc-400 mb-1"><span className="text-zinc-500">Mitigation:</span> {r.mitigation}</div>
                    <div className="text-sm text-red-400/70"><span className="text-zinc-500">Red line:</span> {r.redLine}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trend Opportunities */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Trend Opportunities</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="text-left text-zinc-500 border-b border-zinc-700"><th className="pb-2 pr-3">Signal</th><th className="pb-2 pr-3">Source</th><th className="pb-2 pr-3">Relevance</th><th className="pb-2 pr-3">Action</th><th className="pb-2">Expiry</th></tr></thead>
                  <tbody>
                    {result.opportunities.map((o, i) => (
                      <tr key={i} className="border-b border-zinc-800/50">
                        <td className="py-3 pr-3 text-zinc-300">{o.signal}</td>
                        <td className="py-3 pr-3 text-violet-400 text-xs">{o.source}</td>
                        <td className="py-3 pr-3"><span className="text-xs px-2 py-1 rounded" style={{ color: o.relevanceScore === 'High' ? '#34d399' : '#fbbf24', background: o.relevanceScore === 'High' ? '#34d39915' : '#fbbf2415' }}>{o.relevanceScore}</span></td>
                        <td className="py-3 pr-3 text-zinc-400 text-xs">{o.actionability}</td>
                        <td className="py-3 text-red-400/70 text-xs">{o.expiryWindow}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Dos and Don'ts + Recovery */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-emerald-400">Do This</h3>
                <div className="space-y-2">{result.dosAndDonts.dos.map((d, i) => <div key={i} className="text-sm text-zinc-400 flex gap-2"><span className="text-emerald-400 shrink-0">✓</span>{d}</div>)}</div>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-red-400">Don&apos;t Do This</h3>
                <div className="space-y-2">{result.dosAndDonts.donts.map((d, i) => <div key={i} className="text-sm text-zinc-400 flex gap-2"><span className="text-red-400 shrink-0">✗</span>{d}</div>)}</div>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-yellow-400">Recovery Plan</h3>
                <div className="space-y-2">{result.recoveryPlan.map((r, i) => <div key={i} className="text-sm text-zinc-400 flex gap-2"><span className="text-yellow-400 shrink-0">{i + 1}.</span>{r}</div>)}</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">Ride Every Trend Like a Pro</h3>
              <p className="text-zinc-400 mb-4">Use PostCraft AI to turn trending moments into brand growth. Pair with <a href="/algorithm-tracker" className="text-violet-400 underline">Algorithm Tracker</a>, <a href="/cultural-pulse" className="text-violet-400 underline">Cultural Pulse</a>, and <a href="/virality-score" className="text-violet-400 underline">Virality Score</a>.</p>
              <a href="/pricing" className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">Get PostCraft Pro</a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
