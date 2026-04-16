'use client';
import { useState } from 'react';

const industries = ['SaaS/Tech', 'E-commerce', 'Coaching/Consulting', 'Health/Wellness', 'Finance', 'Education', 'Agency', 'Creator/Influencer', 'Real Estate', 'Food/Restaurant', 'Legal', 'Non-Profit'] as const;
const contentGoals = ['Thought Leadership', 'Lead Generation', 'Community Building', 'Brand Awareness', 'Sales/Revenue', 'Education', 'Entertainment', 'Recruitment'] as const;
const allPlatforms = ['Instagram', 'LinkedIn', 'Twitter/X', 'TikTok', 'YouTube', 'Newsletter', 'Blog', 'Podcast'] as const;
const frequencies = ['Daily', '3-5x/week', '2-3x/week', 'Weekly', 'Bi-weekly'] as const;
const audienceStages = ['Cold (Unaware)', 'Warm (Problem-Aware)', 'Hot (Solution-Aware)', 'Existing Customers'] as const;
const maturities = ['Startup (0-1yr)', 'Growing (1-3yr)', 'Established (3-10yr)', 'Enterprise (10yr+)'] as const;

interface PillarResult {
  pillars: { name: string; description: string; allocation: string; formats: string[]; topics: string[] }[];
  weeklyCalendar: { day: string; pillar: string; format: string; note: string }[];
  platformMatrix: { platform: string; bestPillars: string[]; format: string }[];
  contentRatio: { type: string; percentage: string; description: string }[];
  roadmap: { month: string; focus: string; actions: string[] }[];
  pillarMetrics: { pillar: string; kpis: string[] }[];
  repurposingMap: { source: string; adaptations: string[] }[];
}

function generatePillars(
  industry: string, goal: string, selectedPlatforms: string[], frequency: string,
  audienceStage: string, maturity: string, brandName: string, offer: string, audience: string
): PillarResult {
  const b = brandName || 'Your Brand';
  const o = offer || 'your product';
  const a = audience || 'your target audience';

  const pillarTemplates: Record<string, { name: string; description: string; formats: string[]; topics: string[] }[]> = {
    'SaaS/Tech': [
      { name: 'Product Education', description: `Teach ${a} how to solve problems with ${o}. Tutorials, walkthroughs, feature deep-dives.`, formats: ['Screen recordings', 'Carousel tutorials', 'How-to threads', 'Short-form tips'], topics: [`5 hidden features of ${o} that save 2+ hours/week`, `Step-by-step: How to [common use case] with ${b}`, `${o} vs manual process: real-time comparison`] },
      { name: 'Thought Leadership', description: `Position ${b} as an industry authority. Hot takes, predictions, frameworks.`, formats: ['Long-form posts', 'Twitter/X threads', 'LinkedIn articles', 'Podcast clips'], topics: [`Why ${industry.toLowerCase()} is broken (and how we\'re fixing it)`, `Our ${new Date().getFullYear()} predictions for ${industry.toLowerCase()}`, `The framework we use internally to make product decisions`] },
      { name: 'Social Proof & Results', description: `Showcase real customer wins. Case studies, testimonials, before/after.`, formats: ['Quote graphics', 'Video testimonials', 'Case study carousels', 'Screenshot shares'], topics: [`How [Customer] achieved ${goal.toLowerCase()} using ${o}`, `From 0 to [metric] in 90 days — a ${b} customer story`, `"I wish I found ${b} sooner" — here\'s why`] },
      { name: 'Behind the Scenes', description: `Humanize ${b}. Team culture, building in public, failures and lessons.`, formats: ['Stories/Reels', 'Raw photos', 'Build logs', 'Team spotlights'], topics: [`A week in the life of building ${o}`, `The mistake that almost killed our launch`, `Meet the team: why we\'re obsessed with ${industry.toLowerCase()}`] },
      { name: 'Community & Engagement', description: `Start conversations. Polls, AMAs, user spotlights, trending takes.`, formats: ['Polls', 'Q&A Stories', 'User shoutouts', 'Memes/relatable content'], topics: [`What\'s your biggest ${industry.toLowerCase()} frustration? (poll)`, `AMA: Ask our founder anything about ${o}`, `Tag someone who needs to see this ${industry.toLowerCase()} hack`] },
    ],
    'E-commerce': [
      { name: 'Product Showcase', description: `Highlight ${o} in action. Lifestyle shots, unboxings, styling ideas.`, formats: ['Reels/TikToks', 'Carousel lookbooks', 'UGC reposts', 'Product photography'], topics: [`3 ways to style ${o} for [season]`, `Unboxing the new ${b} collection`, `${o}: what you see online vs. in real life`] },
      { name: 'Customer Stories', description: `Let your buyers sell for you. UGC, reviews, transformations.`, formats: ['Video testimonials', 'Before/after', 'Review screenshots', 'Customer photos'], topics: [`Why ${a} keep coming back (in their own words)`, `${b} customer of the month: [Name]\'s story`, `Real reviews, no filter — what people actually think`] },
      { name: 'Education & Value', description: `Teach something related to your niche. Guides, tips, how-tos.`, formats: ['Infographics', 'Tip carousels', 'Short-form video', 'Blog posts'], topics: [`The ultimate guide to choosing the right ${o}`, `${industry.toLowerCase()} trends you need to know in ${new Date().getFullYear()}`, `How to get 2x the value from your ${o}`] },
      { name: 'Brand Story', description: `Share why ${b} exists. Mission, values, sustainability, journey.`, formats: ['Founder videos', 'Timeline posts', 'Behind-the-scenes', 'Mission statements'], topics: [`Why I started ${b} (founder story)`, `From garage to [milestone]: the ${b} journey`, `Our sustainability commitment — and how we hold ourselves accountable`] },
      { name: 'Promotions & Launches', description: `Drive urgency. Sales, drops, limited editions, early access.`, formats: ['Countdown Stories', 'Launch Reels', 'Email blasts', 'Flash sale graphics'], topics: [`NEW DROP: ${o} is here`, `48-hour flash sale — up to [X]% off`, `Early access for ${b} insiders: link in bio`] },
    ],
    'Coaching/Consulting': [
      { name: 'Framework & Methods', description: `Share your proprietary processes. Frameworks, step-by-steps, models.`, formats: ['Carousel breakdowns', 'Whiteboard videos', 'Thread walkthroughs', 'PDF downloads'], topics: [`The 5-step framework I use with every ${a} client`, `Why most ${industry.toLowerCase()} advice is wrong (and what works)`, `My ${o} process: from chaos to clarity in 30 days`] },
      { name: 'Client Transformations', description: `Show results. Before/after, case studies, success milestones.`, formats: ['Transformation posts', 'Video testimonials', 'Metric screenshots', 'Journey timelines'], topics: [`How [Client] went from stuck to [result] in [timeframe]`, `"This changed everything" — client results spotlight`, `The ROI of investing in ${o}: real numbers`] },
      { name: 'Personal Brand', description: `Share your story. Credibility, relatability, vulnerability.`, formats: ['Story-time Reels', 'Personal essays', 'Photo carousels', 'Podcast episodes'], topics: [`What I learned from failing at ${industry.toLowerCase()} before succeeding`, `The truth about being a ${industry.toLowerCase()} professional`, `My morning routine (that actually impacts my work)`] },
      { name: 'Quick Wins', description: `Deliver instant value. One tip, one insight, one shift.`, formats: ['Single-image tips', 'Short videos', 'Tweet-length posts', 'Voice notes'], topics: [`One shift that will transform how ${a} thinks about [topic]`, `Try this today: the simplest ${industry.toLowerCase()} hack`, `Stop doing this one thing (your results will thank you)`] },
      { name: 'Community & Discussion', description: `Build your tribe. Questions, hot takes, relatable content.`, formats: ['Polls', 'This-or-that Stories', 'Comment prompts', 'Live Q&As'], topics: [`Hot take: [controversial opinion about ${industry.toLowerCase()}]`, `What\'s the #1 challenge you\'re facing right now? (poll)`, `Live Q&A this Friday — drop your questions below`] },
    ],
  };

  const defaultPillars = [
    { name: 'Education & Value', description: `Teach ${a} something useful about ${industry.toLowerCase()}. Position ${b} as the go-to expert.`, formats: ['How-to carousels', 'Tutorial videos', 'Tip threads', 'Infographics'], topics: [`The complete guide to ${industry.toLowerCase()} for beginners`, `${industry} mistakes that cost you money (and how to fix them)`, `Everything you need to know about ${o} in 5 minutes`] },
    { name: 'Social Proof', description: `Show that real people trust ${b}. Testimonials, results, milestones.`, formats: ['Quote graphics', 'Video testimonials', 'Case study carousels', 'Review screenshots'], topics: [`How [Customer] achieved [result] with ${o}`, `Real results from real ${a} — no BS`, `Why ${b} has a [X]% satisfaction rate`] },
    { name: 'Behind the Scenes', description: `Humanize ${b}. Building in public, team culture, day-in-the-life.`, formats: ['Stories/Reels', 'Vlogs', 'Team photos', 'Work-in-progress shares'], topics: [`What a typical day looks like at ${b}`, `The story behind ${o}`, `Meet the humans behind ${b}`] },
    { name: 'Industry Insights', description: `Stay relevant. Trends, news, predictions, hot takes.`, formats: ['Long-form posts', 'Thread breakdowns', 'Reaction videos', 'Newsletter issues'], topics: [`${new Date().getFullYear()} ${industry.toLowerCase()} trends that will change everything`, `Our take on [industry news]`, `Why ${industry.toLowerCase()} is headed in a new direction`] },
    { name: 'Engagement & Community', description: `Build relationships. Polls, AMAs, user-generated content, discussions.`, formats: ['Polls', 'Q&A sessions', 'UGC reposts', 'Memes'], topics: [`What does ${a} struggle with most? (poll)`, `AMA: Ask us anything about ${industry.toLowerCase()}`, `Shoutout to our community — you make ${b} possible`] },
  ];

  const pillars = (pillarTemplates[industry] || defaultPillars).map((p, i) => ({
    ...p,
    allocation: ['35%', '25%', '20%', '12%', '8%'][i],
  }));

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const weeklyCalendar = days.map((day, i) => {
    const pillarIdx = i % pillars.length;
    return {
      day,
      pillar: pillars[pillarIdx].name,
      format: pillars[pillarIdx].formats[i % pillars[pillarIdx].formats.length],
      note: i === 5 || i === 6 ? 'Lower effort / scheduled in advance' : 'Peak engagement day — prioritize quality',
    };
  });

  const platformMatrix = selectedPlatforms.map(plat => {
    const best: Record<string, { pillars: string[]; format: string }> = {
      'Instagram': { pillars: [pillars[0].name, pillars[2].name], format: 'Reels, Carousels, Stories' },
      'LinkedIn': { pillars: [pillars[1].name, pillars[3].name], format: 'Long posts, Documents, Articles' },
      'Twitter/X': { pillars: [pillars[3].name, pillars[4].name], format: 'Threads, Polls, Quote tweets' },
      'TikTok': { pillars: [pillars[2].name, pillars[4].name], format: 'Short videos, Duets, Stitches' },
      'YouTube': { pillars: [pillars[0].name, pillars[1].name], format: 'Tutorials, Case studies, Vlogs' },
      'Newsletter': { pillars: [pillars[0].name, pillars[3].name], format: 'Deep dives, Curated insights, Updates' },
      'Blog': { pillars: [pillars[0].name, pillars[1].name], format: 'Long-form, SEO content, Guides' },
      'Podcast': { pillars: [pillars[1].name, pillars[3].name], format: 'Interviews, Solo episodes, Roundtables' },
    };
    const match = best[plat] || { pillars: [pillars[0].name], format: 'Mixed formats' };
    return { platform: plat, bestPillars: match.pillars, format: match.format };
  });

  const stageRatios: Record<string, { type: string; percentage: string; description: string }[]> = {
    'Cold (Unaware)': [
      { type: 'Educational', percentage: '45%', description: 'Teach, inform, solve problems — earn their attention before asking for anything' },
      { type: 'Entertaining', percentage: '30%', description: 'Relatable memes, trends, storytelling — make them want to follow you' },
      { type: 'Inspirational', percentage: '15%', description: 'Motivational stories, vision, aspirational content' },
      { type: 'Promotional', percentage: '10%', description: 'Soft sells only — mention product naturally within value content' },
    ],
    'Warm (Problem-Aware)': [
      { type: 'Educational', percentage: '35%', description: 'Deepen understanding of the problem and possible solutions' },
      { type: 'Social Proof', percentage: '25%', description: 'Show others who had the same problem and solved it with you' },
      { type: 'Entertaining', percentage: '20%', description: 'Keep them engaged while they evaluate options' },
      { type: 'Promotional', percentage: '20%', description: 'Direct CTAs, product demos, comparison content' },
    ],
    'Hot (Solution-Aware)': [
      { type: 'Promotional', percentage: '35%', description: 'Clear CTAs, pricing, demos, onboarding content — they\'re ready to buy' },
      { type: 'Social Proof', percentage: '30%', description: 'Case studies, testimonials, reviews — remove last objections' },
      { type: 'Educational', percentage: '25%', description: 'Product-specific tutorials, use cases, implementation guides' },
      { type: 'Entertaining', percentage: '10%', description: 'Light content to maintain relationship during decision process' },
    ],
    'Existing Customers': [
      { type: 'Educational', percentage: '40%', description: 'Help them get max value — tutorials, tips, advanced features' },
      { type: 'Community', percentage: '25%', description: 'User spotlights, community events, feedback loops' },
      { type: 'Promotional', percentage: '20%', description: 'Upsells, new features, referral programs, loyalty rewards' },
      { type: 'Entertaining', percentage: '15%', description: 'Insider jokes, behind-the-scenes, team content' },
    ],
  };

  const roadmap = [
    {
      month: 'Month 1: Foundation',
      focus: `Establish ${b}\'s content voice and test which pillars resonate most with ${a}.`,
      actions: [
        `Create and publish 2-3 posts per pillar to test engagement`,
        `Set up analytics tracking for each pillar (engagement rate, saves, shares)`,
        `Build a 30-day content bank with at least 20 posts ready to go`,
        `Identify top 3 performing content formats and double down`,
        `Engage with 10 accounts in your niche daily to build visibility`,
      ],
    },
    {
      month: 'Month 2: Optimization',
      focus: `Double down on what works, cut what doesn't. Introduce repurposing.`,
      actions: [
        `Analyze Month 1 data — reallocate pillar percentages based on performance`,
        `Start repurposing top-performing content across platforms`,
        `Introduce one new content format (video if not yet, or carousel, etc.)`,
        `Begin building email list / newsletter from social followers`,
        `Collaborate with 2-3 creators in adjacent niches for cross-promotion`,
      ],
    },
    {
      month: 'Month 3: Scale',
      focus: `Systematize content production. Start measuring business impact, not just engagement.`,
      actions: [
        `Create SOPs for each pillar: topic ideation, creation, scheduling, engagement`,
        `Set up content batching: create 1 week of content in 1 session`,
        `Measure business KPIs: leads, signups, sales from each pillar`,
        `Launch a signature content series (weekly thread, monthly live, etc.)`,
        `Evaluate: is ${frequency.toLowerCase()} sustainable? Adjust cadence based on quality vs. quantity`,
      ],
    },
  ];

  const pillarMetrics = pillars.map(p => ({
    pillar: p.name,
    kpis: p.name.includes('Education') || p.name.includes('Framework') || p.name.includes('Product')
      ? ['Saves/bookmarks (value indicator)', 'Time on page / watch time', 'DMs asking follow-up questions', 'Newsletter signups from content']
      : p.name.includes('Proof') || p.name.includes('Client') || p.name.includes('Customer')
      ? ['Link clicks to case study / landing page', 'DMs mentioning social proof content', 'Conversion rate from proof-driven CTAs', 'Testimonial request rate from new customers']
      : p.name.includes('Behind') || p.name.includes('Brand') || p.name.includes('Personal')
      ? ['Comments and genuine replies', 'Follower growth rate', 'Story completion rate', 'Brand sentiment in comments']
      : p.name.includes('Insight') || p.name.includes('Thought') || p.name.includes('Quick')
      ? ['Shares and reposts (authority signal)', 'Quote tweets / LinkedIn reposts', 'Media mentions or citations', 'Inbound partnership requests']
      : ['Engagement rate (likes + comments / reach)', 'Poll participation rate', 'UGC submissions', 'Community growth and retention'],
  }));

  const repurposingMap = [
    { source: 'Blog post (1,500+ words)', adaptations: ['10 tweet thread (key takeaways)', 'LinkedIn carousel (8 slides)', 'Instagram Reel (60s summary)', 'Newsletter issue (curated version)', 'Podcast episode (expanded discussion)', '5 standalone social posts (one per section)'] },
    { source: 'Video (YouTube/Reel)', adaptations: ['Quote graphics from key moments', 'Audiogram for podcast promotion', 'GIF snippets for Twitter/X', 'Transcript → blog post', 'Short clips for TikTok/Reels/Shorts', 'Screenshot quotes for carousel'] },
    { source: 'Podcast episode', adaptations: ['Audiogram clips (3-5 per episode)', 'Blog post (transcript + editing)', 'Twitter thread (key insights)', 'Quote cards for Instagram', 'YouTube video (if recorded)', 'Newsletter highlight'] },
    { source: 'Customer testimonial', adaptations: ['Quote graphic for Instagram', 'Case study blog post', 'Video testimonial Reel', 'LinkedIn social proof post', 'Email signature quote', 'Landing page widget'] },
  ];

  return { pillars, weeklyCalendar, platformMatrix, contentRatio: stageRatios[audienceStage] || stageRatios['Cold (Unaware)'], roadmap, pillarMetrics, repurposingMap };
}

export default function ContentPillarsPage() {
  const [industry, setIndustry] = useState<string>('SaaS/Tech');
  const [goal, setGoal] = useState<string>('Thought Leadership');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['Instagram', 'LinkedIn', 'Twitter/X']);
  const [frequency, setFrequency] = useState<string>('3-5x/week');
  const [audienceStage, setAudienceStage] = useState<string>('Cold (Unaware)');
  const [maturity, setMaturity] = useState<string>('Startup (0-1yr)');
  const [brandName, setBrandName] = useState('');
  const [offer, setOffer] = useState('');
  const [audience, setAudience] = useState('');
  const [result, setResult] = useState<PillarResult | null>(null);

  const togglePlatform = (p: string) => {
    setSelectedPlatforms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  };

  const handleGenerate = () => {
    setResult(generatePillars(industry, goal, selectedPlatforms, frequency, audienceStage, maturity, brandName.trim(), offer.trim(), audience.trim()));
  };

  return (
    <main className="min-h-screen bg-zinc-950 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Content Pillar Planner</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Map out a strategic content pillar framework with themes, cadence, and platform distribution. Brands with defined content pillars see <strong className="text-white">3x more consistent engagement</strong>.</p>

        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div><label className="block text-sm text-zinc-400 mb-1">Industry</label><select value={industry} onChange={e => setIndustry(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">{industries.map(i => <option key={i}>{i}</option>)}</select></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Content Goal</label><select value={goal} onChange={e => setGoal(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">{contentGoals.map(g => <option key={g}>{g}</option>)}</select></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Posting Frequency</label><select value={frequency} onChange={e => setFrequency(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">{frequencies.map(f => <option key={f}>{f}</option>)}</select></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Audience Stage</label><select value={audienceStage} onChange={e => setAudienceStage(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">{audienceStages.map(s => <option key={s}>{s}</option>)}</select></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Brand Maturity</label><select value={maturity} onChange={e => setMaturity(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">{maturities.map(m => <option key={m}>{m}</option>)}</select></div>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-zinc-400 mb-2">Platforms</label>
          <div className="flex flex-wrap gap-2">
            {allPlatforms.map(p => (
              <button key={p} onClick={() => togglePlatform(p)} className={`px-3 py-1.5 rounded-lg text-sm border transition ${selectedPlatforms.includes(p) ? 'bg-violet-600/30 border-violet-500 text-violet-300' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300'}`}>{p}</button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div><label className="block text-sm text-zinc-400 mb-1">Brand Name</label><input type="text" value={brandName} onChange={e => setBrandName(e.target.value)} placeholder="e.g., PostCraft AI" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600" /></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Primary Offer</label><input type="text" value={offer} onChange={e => setOffer(e.target.value)} placeholder="e.g., AI content generator" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600" /></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Target Audience</label><input type="text" value={audience} onChange={e => setAudience(e.target.value)} placeholder="e.g., solo founders and marketers" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600" /></div>
        </div>

        <button onClick={handleGenerate} className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition">Generate Pillar Strategy</button>

        {result && (
          <div className="mt-10 space-y-6">
            <h2 className="text-2xl font-bold text-white">Your 5 Content Pillars</h2>
            {result.pillars.map((p, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white">{p.name}</h3>
                  <span className="text-xs bg-violet-600/30 text-violet-300 px-2 py-0.5 rounded-full">{p.allocation} of content</span>
                </div>
                <p className="text-sm text-zinc-400 mb-3">{p.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">{p.formats.map((f, j) => <span key={j} className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded">{f}</span>)}</div>
                <div className="space-y-1">{p.topics.map((t, j) => <p key={j} className="text-sm text-zinc-300 flex gap-2"><span className="text-fuchsia-400">{j + 1}.</span>{t}</p>)}</div>
              </div>
            ))}

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Weekly Content Calendar</h3>
              <div className="grid gap-2">
                {result.weeklyCalendar.map((d, i) => (
                  <div key={i} className="flex items-center gap-4 bg-zinc-800 rounded-lg px-4 py-3">
                    <span className="text-sm text-white font-medium w-24">{d.day}</span>
                    <span className="text-sm text-violet-400 flex-1">{d.pillar}</span>
                    <span className="text-xs text-zinc-500">{d.format}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Platform-Pillar Matrix</h3>
              {result.platformMatrix.map((p, i) => (
                <div key={i} className="bg-zinc-800 rounded-lg p-3 mb-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white text-sm font-medium">{p.platform}</span>
                    <span className="text-xs text-zinc-500">{p.format}</span>
                  </div>
                  <p className="text-xs text-violet-400 mt-1">Best pillars: {p.bestPillars.join(', ')}</p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Content Ratio ({audienceStage})</h3>
                {result.contentRatio.map((r, i) => (
                  <div key={i} className="mb-3">
                    <div className="flex justify-between mb-1"><span className="text-sm text-zinc-300">{r.type}</span><span className="text-sm text-green-400 font-medium">{r.percentage}</span></div>
                    <p className="text-xs text-zinc-500">{r.description}</p>
                    <div className="w-full bg-zinc-800 rounded-full h-1.5 mt-1"><div className="bg-gradient-to-r from-violet-600 to-fuchsia-500 h-1.5 rounded-full" style={{ width: r.percentage }} /></div>
                  </div>
                ))}
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Pillar Metrics (KPIs)</h3>
                {result.pillarMetrics.map((m, i) => (
                  <div key={i} className="mb-3">
                    <p className="text-sm text-violet-400 font-medium mb-1">{m.pillar}</p>
                    <ul>{m.kpis.map((k, j) => <li key={j} className="text-xs text-zinc-400 flex gap-1"><span className="text-zinc-600">-</span>{k}</li>)}</ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3">90-Day Content Roadmap</h3>
              {result.roadmap.map((r, i) => (
                <div key={i} className="bg-zinc-800 rounded-lg p-4 mb-3">
                  <h4 className="text-white font-medium mb-1">{r.month}</h4>
                  <p className="text-sm text-zinc-400 mb-2">{r.focus}</p>
                  <ul className="space-y-1">{r.actions.map((a, j) => <li key={j} className="text-xs text-zinc-300 flex gap-2"><span className="text-green-400">{j + 1}.</span>{a}</li>)}</ul>
                </div>
              ))}
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Repurposing Map</h3>
              {result.repurposingMap.map((r, i) => (
                <div key={i} className="bg-zinc-800 rounded-lg p-4 mb-3">
                  <p className="text-sm text-white font-medium mb-2">{r.source}</p>
                  <div className="flex flex-wrap gap-1">{r.adaptations.map((a, j) => <span key={j} className="text-xs bg-zinc-700 text-zinc-300 px-2 py-0.5 rounded">{a}</span>)}</div>
                </div>
              ))}
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-zinc-400 mb-3">Related Tools</h3>
              <div className="flex flex-wrap gap-2 text-sm">
                <a href="/content-calendar" className="text-violet-400 hover:text-violet-300 underline">Content Calendar</a>
                <a href="/brand-voice" className="text-violet-400 hover:text-violet-300 underline">Brand Voice</a>
                <a href="/campaign" className="text-violet-400 hover:text-violet-300 underline">Campaign Mode</a>
                <a href="/atomizer" className="text-violet-400 hover:text-violet-300 underline">Atomizer</a>
                <a href="/content-recycler" className="text-violet-400 hover:text-violet-300 underline">Content Recycler</a>
                <a href="/idea-generator" className="text-violet-400 hover:text-violet-300 underline">Idea Generator</a>
              </div>
            </div>
          </div>
        )}

        <footer className="mt-20 border-t border-zinc-800 pt-8 pb-12">
          <div className="grid md:grid-cols-4 gap-8 text-sm text-zinc-500">
            <div><h4 className="font-semibold text-white mb-3">Strategy</h4><ul className="space-y-1"><li><a href="/content-pillars" className="hover:text-white transition">Content Pillars</a></li><li><a href="/brand-voice" className="hover:text-white transition">Brand Voice</a></li><li><a href="/content-calendar" className="hover:text-white transition">Calendar</a></li><li><a href="/campaign" className="hover:text-white transition">Campaign</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Creation</h4><ul className="space-y-1"><li><a href="/" className="hover:text-white transition">Posts</a></li><li><a href="/atomizer" className="hover:text-white transition">Atomizer</a></li><li><a href="/hooks" className="hover:text-white transition">Hooks</a></li><li><a href="/carousel-generator" className="hover:text-white transition">Carousel</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Outreach</h4><ul className="space-y-1"><li><a href="/influencer-outreach" className="hover:text-white transition">Outreach</a></li><li><a href="/collab-brief" className="hover:text-white transition">Collab Brief</a></li><li><a href="/influencer-score" className="hover:text-white transition">Influencer</a></li><li><a href="/ugc-manager" className="hover:text-white transition">UGC</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Analytics</h4><ul className="space-y-1"><li><a href="/roi-calculator" className="hover:text-white transition">ROI</a></li><li><a href="/engagement-calculator" className="hover:text-white transition">Engagement</a></li><li><a href="/content-scorecard" className="hover:text-white transition">Score Card</a></li><li><a href="/growth-calculator" className="hover:text-white transition">Growth</a></li></ul></div>
          </div>
          <p className="text-center text-zinc-600 text-xs mt-8">&copy; 2026 PostCraft AI. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
