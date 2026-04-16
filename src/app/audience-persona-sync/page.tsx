'use client';
import { useState } from 'react';

const platforms = ['Instagram', 'LinkedIn', 'Twitter/X', 'TikTok', 'YouTube', 'Facebook', 'Pinterest', 'All Platforms'] as const;
const industries = ['SaaS/Tech', 'E-commerce', 'Coaching/Consulting', 'Health/Wellness', 'Finance', 'Education', 'Agency', 'Creator/Influencer', 'Real Estate', 'General'] as const;
const goals = ['Brand Awareness', 'Lead Generation', 'Community Building', 'Direct Sales', 'Thought Leadership', 'Recruitment', 'Product Launch'] as const;

interface PersonaResult {
  personas: { name: string; age: string; role: string; painPoints: string[]; contentPrefs: string[]; buyingTriggers: string[]; platforms: string[]; postTimes: string }[];
  syncStrategy: { platform: string; personaFocus: string; contentType: string; frequency: string; tone: string }[];
  contentMapping: { persona: string; awareness: string; consideration: string; decision: string }[];
  gapAnalysis: { gap: string; severity: string; fix: string }[];
  metrics: { name: string; value: string }[];
}

function generatePersonaSync(
  platform: string, industry: string, goal: string,
  productDesc: string, currentAudience: string, avgAge: string
): PersonaResult {
  const ageNum = parseInt(avgAge) || 30;
  const isB2B = ['SaaS/Tech', 'Agency', 'Finance'].includes(industry);
  const isCreator = industry === 'Creator/Influencer';

  const personas: PersonaResult['personas'] = [
    {
      name: isB2B ? 'Decision-Maker Dana' : isCreator ? 'Aspiring Creator Alex' : 'Motivated Buyer Maya',
      age: `${ageNum - 5}-${ageNum + 5}`,
      role: isB2B ? 'VP/Director at mid-size company, manages team of 10-50' : isCreator ? 'Part-time creator, 1K-10K followers, wants to go full-time' : `Active ${industry.toLowerCase()} consumer, researches before buying`,
      painPoints: isB2B
        ? ['Too many tools, not enough integration', 'Reporting to C-suite with unclear ROI', 'Team adoption of new software', 'Budget constraints vs. growth pressure']
        : isCreator
        ? ['Inconsistent posting schedule', 'Algorithm changes killing reach', 'Monetization plateau', 'Content burnout and idea fatigue']
        : ['Information overload — too many options', 'Trust issues with online brands', 'Price sensitivity vs. quality expectations', 'Fear of making the wrong choice'],
      contentPrefs: isB2B
        ? ['Case studies with real numbers', 'LinkedIn thought leadership', 'Comparison guides', 'ROI calculators']
        : isCreator
        ? ['Behind-the-scenes content', 'Growth hacks and tutorials', 'Income reports and transparency', 'Short-form video tips']
        : ['Visual testimonials', 'Before/after results', 'Influencer recommendations', 'Quick-win tips and hacks'],
      buyingTriggers: isB2B
        ? ['Peer recommendation', 'Free trial with onboarding', 'Case study from same industry', 'Integration with existing stack']
        : ['Social proof (reviews, UGC)', 'Limited-time offer', 'Influencer endorsement', 'Free value first (lead magnet)'],
      platforms: platform === 'All Platforms'
        ? (isB2B ? ['LinkedIn', 'Twitter/X', 'YouTube'] : ['Instagram', 'TikTok', 'YouTube'])
        : [platform],
      postTimes: isB2B ? 'Tue-Thu 8-10am, LinkedIn articles Wed 7am' : 'Mon/Wed/Fri 12pm, Reels daily 6-8pm',
    },
    {
      name: isB2B ? 'End-User Evan' : isCreator ? 'Established Creator Emma' : 'Skeptical Searcher Sam',
      age: `${ageNum - 10}-${ageNum}`,
      role: isB2B ? 'Individual contributor, daily user of tools, influences purchase decisions' : isCreator ? 'Full-time creator, 50K+ followers, diversified income' : 'Compares 3-5 options before buying, reads reviews religiously',
      painPoints: isB2B
        ? ['Clunky UX in current tools', 'Lack of automation for repetitive tasks', 'No time for training', 'Disconnect between promise and reality']
        : isCreator
        ? ['Scaling content without losing authenticity', 'Brand deal negotiation', 'Audience retention across platforms', 'Work-life balance']
        : ['Overwhelmed by marketing claims', 'Previous bad purchase experiences', 'Needs peer validation', 'Wants to see real results first'],
      contentPrefs: isB2B
        ? ['Quick video demos', 'Feature comparison tables', 'Community forums', 'Templates and shortcuts']
        : isCreator
        ? ['Long-form strategy content', 'Podcast interviews', 'Exclusive community access', 'Advanced analytics breakdowns']
        : ['Detailed product reviews', 'Comparison articles', 'User-generated content', 'Free samples or trials'],
      buyingTriggers: isB2B
        ? ['Colleague already uses it', 'Solves a specific daily pain', 'Easy onboarding, no learning curve', 'Freemium tier available']
        : ['Data-driven proof of results', 'Community of similar users', 'Money-back guarantee', 'Exclusive early access'],
      platforms: platform === 'All Platforms'
        ? (isB2B ? ['Twitter/X', 'YouTube', 'Reddit'] : ['YouTube', 'Instagram', 'Twitter/X'])
        : [platform],
      postTimes: isB2B ? 'Daily micro-content 9am, deep dives Thu 2pm' : 'Tue/Thu/Sat 10am, Stories daily',
    },
    {
      name: isB2B ? 'Champion Charlie' : isCreator ? 'Hobby Creator Harper' : 'Impulse Explorer Iris',
      age: `${ageNum}-${ageNum + 10}`,
      role: isB2B ? 'Internal advocate who pushes for tool adoption, often a manager' : isCreator ? 'Creates for fun, 100-1K followers, might monetize someday' : 'Discovers through social media, buys on emotion, shares finds',
      painPoints: isB2B
        ? ['Needs ammo to convince leadership', 'ROI proof for budget approval', 'Competitive pressure from rivals using better tools', 'Change management fatigue']
        : isCreator
        ? ['No idea where to start with strategy', 'Feels behind compared to bigger creators', 'Overwhelmed by platform choices', 'Limited time outside day job']
        : ['FOMO on trending products', 'Short attention span for content', 'Wants instant gratification', 'Influenced by aesthetic and branding'],
      contentPrefs: isB2B
        ? ['Internal pitch decks', 'ROI projection tools', 'Competitor benchmarks', 'Success metrics dashboards']
        : isCreator
        ? ['Beginner-friendly tutorials', 'Templates and swipe files', 'Motivational success stories', 'Simple tools with quick wins']
        : ['Eye-catching visuals', 'Short video testimonials', 'Unboxing and first-impression content', 'Flash sales and limited drops'],
      buyingTriggers: isB2B
        ? ['Clear ROI framework to present to CFO', 'Competitor analysis showing risk of not switching', 'White-glove onboarding for team', 'Annual discount with exec buy-in']
        : ['Beautiful branding and UX', 'Viral moment or trending mention', 'Instant sign-up with no friction', 'Referral from trusted friend'],
      platforms: platform === 'All Platforms'
        ? (isB2B ? ['LinkedIn', 'Email', 'Slack communities'] : ['TikTok', 'Instagram', 'Pinterest'])
        : [platform],
      postTimes: isB2B ? 'Mon morning strategy posts, Fri recaps' : 'Daily short-form, long-form Sun 11am',
    },
  ];

  const syncStrategy = personas.flatMap(p =>
    p.platforms.map(plat => ({
      platform: plat,
      personaFocus: p.name,
      contentType: p.contentPrefs[0],
      frequency: plat === 'TikTok' || plat === 'Instagram' ? 'Daily' : plat === 'LinkedIn' ? '3x/week' : '2-4x/week',
      tone: isB2B ? 'Professional, data-driven, consultative' : isCreator ? 'Authentic, relatable, encouraging' : 'Engaging, visual, benefit-focused',
    }))
  );

  const contentMapping = personas.map(p => ({
    persona: p.name,
    awareness: isB2B ? `${p.contentPrefs[0]} addressing "${p.painPoints[0]}"` : `Viral ${p.contentPrefs[0]} highlighting "${p.painPoints[0]}"`,
    consideration: `Comparison content: "${productDesc || 'Your solution'}" vs alternatives for ${p.role.split(',')[0]}`,
    decision: `${p.buyingTriggers[0]} — direct CTA with ${p.buyingTriggers[1]?.toLowerCase() || 'urgency'}`,
  }));

  const gapAnalysis = [
    { gap: 'No persona-specific content calendar', severity: 'High', fix: 'Create separate content pillars per persona with dedicated posting schedule' },
    { gap: `Missing ${isB2B ? 'end-user' : 'skeptic'} content — focusing too much on ${isB2B ? 'decision-makers' : 'enthusiasts'}`, severity: 'High', fix: `Allocate 30% of content to ${isB2B ? 'end-user pain points and UX demos' : 'trust-building content (reviews, comparisons, guarantees)'}` },
    { gap: 'Same tone across all platforms', severity: 'Medium', fix: 'Adapt voice per platform: casual on TikTok, professional on LinkedIn, visual on Instagram' },
    { gap: 'No funnel alignment — all content is awareness-stage', severity: 'High', fix: 'Map 40% awareness / 35% consideration / 25% decision content per persona' },
    { gap: `${currentAudience ? 'Current audience skews ' + currentAudience : 'No audience data'} — persona 3 underserved`, severity: 'Medium', fix: `Create targeted campaigns for ${personas[2].name} on ${personas[2].platforms[0]}` },
  ];

  return {
    personas,
    syncStrategy,
    contentMapping,
    gapAnalysis,
    metrics: [
      { name: 'Persona-aligned content lift', value: '+45% engagement' },
      { name: 'Funnel-mapped content', value: '+62% conversion' },
      { name: 'Platform-native formatting', value: '+38% reach' },
      { name: 'Consistent posting schedule', value: '+28% follower growth' },
      { name: 'Audience-persona match rate target', value: '>80%' },
    ],
  };
}

export default function AudiencePersonaSyncPage() {
  const [platform, setPlatform] = useState<string>('All Platforms');
  const [industry, setIndustry] = useState<string>('SaaS/Tech');
  const [goal, setGoal] = useState<string>('Lead Generation');
  const [productDesc, setProductDesc] = useState('');
  const [currentAudience, setCurrentAudience] = useState('');
  const [avgAge, setAvgAge] = useState('30');
  const [result, setResult] = useState<PersonaResult | null>(null);

  const handleGenerate = () => {
    setResult(generatePersonaSync(platform, industry, goal, productDesc.trim(), currentAudience.trim(), avgAge));
  };

  return (
    <main className="min-h-screen bg-zinc-950 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Audience Persona Sync</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Generate detailed audience personas and sync your content strategy across platforms. Persona-aligned content gets <strong className="text-white">45% more engagement</strong>.</p>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div><label className="block text-sm text-zinc-400 mb-1">Primary Platform</label><select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">{platforms.map(p => <option key={p}>{p}</option>)}</select></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Industry</label><select value={industry} onChange={e => setIndustry(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">{industries.map(i => <option key={i}>{i}</option>)}</select></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Primary Goal</label><select value={goal} onChange={e => setGoal(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">{goals.map(g => <option key={g}>{g}</option>)}</select></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Product Description</label><input type="text" value={productDesc} onChange={e => setProductDesc(e.target.value)} placeholder="e.g., AI-powered social media tool" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600" /></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Current Audience</label><input type="text" value={currentAudience} onChange={e => setCurrentAudience(e.target.value)} placeholder="e.g., mostly 25-34 male marketers" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600" /></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Average Audience Age</label><input type="number" value={avgAge} onChange={e => setAvgAge(e.target.value)} min="18" max="65" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white" /></div>
        </div>

        <button onClick={handleGenerate} className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition">Generate Personas & Strategy</button>

        {result && (
          <div className="mt-10 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Audience Personas</h2>
              <div className="grid lg:grid-cols-3 gap-4">
                {result.personas.map((p, i) => (
                  <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center text-white font-bold text-sm">{p.name[0]}</div>
                      <div><h3 className="text-white font-semibold">{p.name}</h3><p className="text-xs text-zinc-500">Age {p.age}</p></div>
                    </div>
                    <p className="text-sm text-zinc-300 mb-3">{p.role}</p>
                    <div className="mb-3"><h4 className="text-xs font-semibold text-red-400 mb-1">Pain Points</h4><ul className="space-y-1">{p.painPoints.map((pp, j) => <li key={j} className="text-xs text-zinc-400">• {pp}</li>)}</ul></div>
                    <div className="mb-3"><h4 className="text-xs font-semibold text-violet-400 mb-1">Content Preferences</h4><ul className="space-y-1">{p.contentPrefs.map((c, j) => <li key={j} className="text-xs text-zinc-400">• {c}</li>)}</ul></div>
                    <div className="mb-3"><h4 className="text-xs font-semibold text-green-400 mb-1">Buying Triggers</h4><ul className="space-y-1">{p.buyingTriggers.map((b, j) => <li key={j} className="text-xs text-zinc-400">• {b}</li>)}</ul></div>
                    <div className="flex flex-wrap gap-1 mt-2">{p.platforms.map((pl, j) => <span key={j} className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded">{pl}</span>)}</div>
                    <p className="text-xs text-zinc-500 mt-2">Best times: {p.postTimes}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">Platform Sync Strategy</h2>
              <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-left text-zinc-500 border-b border-zinc-800"><th className="pb-2 pr-4">Platform</th><th className="pb-2 pr-4">Persona Focus</th><th className="pb-2 pr-4">Content Type</th><th className="pb-2 pr-4">Frequency</th><th className="pb-2">Tone</th></tr></thead><tbody>{result.syncStrategy.map((s, i) => <tr key={i} className="border-b border-zinc-800/50"><td className="py-2 pr-4 text-white">{s.platform}</td><td className="py-2 pr-4 text-zinc-300">{s.personaFocus}</td><td className="py-2 pr-4 text-zinc-300">{s.contentType}</td><td className="py-2 pr-4 text-violet-400">{s.frequency}</td><td className="py-2 text-zinc-400">{s.tone}</td></tr>)}</tbody></table></div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">Content Funnel Mapping</h2>
              <div className="space-y-3">{result.contentMapping.map((c, i) => (
                <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                  <h3 className="text-white font-semibold mb-2">{c.persona}</h3>
                  <div className="grid md:grid-cols-3 gap-3">
                    <div className="bg-zinc-800 rounded-lg p-3"><p className="text-xs text-blue-400 font-semibold mb-1">Awareness</p><p className="text-xs text-zinc-300">{c.awareness}</p></div>
                    <div className="bg-zinc-800 rounded-lg p-3"><p className="text-xs text-yellow-400 font-semibold mb-1">Consideration</p><p className="text-xs text-zinc-300">{c.consideration}</p></div>
                    <div className="bg-zinc-800 rounded-lg p-3"><p className="text-xs text-green-400 font-semibold mb-1">Decision</p><p className="text-xs text-zinc-300">{c.decision}</p></div>
                  </div>
                </div>
              ))}</div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Gap Analysis</h3>
                {result.gapAnalysis.map((g, i) => (
                  <div key={i} className="mb-3 last:mb-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded ${g.severity === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{g.severity}</span>
                      <span className="text-sm text-white">{g.gap}</span>
                    </div>
                    <p className="text-xs text-zinc-400 ml-1">Fix: {g.fix}</p>
                  </div>
                ))}
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Impact Metrics</h3>
                {result.metrics.map((m, i) => <div key={i} className="flex justify-between mb-3"><span className="text-sm text-zinc-400">{m.name}</span><span className="text-sm text-green-400 font-medium">{m.value}</span></div>)}
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-zinc-400 mb-3">Related Tools</h3>
              <div className="flex flex-wrap gap-2 text-sm">
                <a href="/persona-builder" className="text-violet-400 hover:text-violet-300 underline">Persona Builder</a>
                <a href="/audience-segmentation" className="text-violet-400 hover:text-violet-300 underline">Audience Segmentation</a>
                <a href="/audience-growth" className="text-violet-400 hover:text-violet-300 underline">Audience Growth</a>
                <a href="/content-calendar" className="text-violet-400 hover:text-violet-300 underline">Content Calendar</a>
                <a href="/post-timing" className="text-violet-400 hover:text-violet-300 underline">Post Timing</a>
                <a href="/content-pillars" className="text-violet-400 hover:text-violet-300 underline">Content Pillars</a>
              </div>
            </div>
          </div>
        )}

        <footer className="mt-20 border-t border-zinc-800 pt-8 pb-12">
          <div className="grid md:grid-cols-4 gap-8 text-sm text-zinc-500">
            <div><h4 className="font-semibold text-white mb-3">Creation</h4><ul className="space-y-1"><li><a href="/" className="hover:text-white transition">Posts</a></li><li><a href="/carousel-generator" className="hover:text-white transition">Carousel</a></li><li><a href="/story-planner" className="hover:text-white transition">Stories</a></li><li><a href="/social-proof" className="hover:text-white transition">Social Proof</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Audience</h4><ul className="space-y-1"><li><a href="/audience-persona-sync" className="hover:text-white transition">Persona Sync</a></li><li><a href="/audience-segmentation" className="hover:text-white transition">Segmentation</a></li><li><a href="/audience-growth" className="hover:text-white transition">Growth</a></li><li><a href="/persona-builder" className="hover:text-white transition">Persona Builder</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Analytics</h4><ul className="space-y-1"><li><a href="/growth-calculator" className="hover:text-white transition">Growth</a></li><li><a href="/content-scorecard" className="hover:text-white transition">Score Card</a></li><li><a href="/engagement-calculator" className="hover:text-white transition">Engagement</a></li><li><a href="/roi-calculator" className="hover:text-white transition">ROI</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Strategy</h4><ul className="space-y-1"><li><a href="/brand-voice" className="hover:text-white transition">Brand Voice</a></li><li><a href="/content-calendar" className="hover:text-white transition">Calendar</a></li><li><a href="/campaign" className="hover:text-white transition">Campaign</a></li><li><a href="/scheduling-optimizer" className="hover:text-white transition">Scheduling</a></li></ul></div>
          </div>
          <p className="text-center text-zinc-600 text-xs mt-8">© 2026 PostCraft AI. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
