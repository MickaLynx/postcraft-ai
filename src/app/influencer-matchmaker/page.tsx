'use client';
import { useState } from 'react';

const niches = ['Tech & SaaS', 'Fashion & Beauty', 'Health & Fitness', 'Food & Beverage', 'Travel & Lifestyle', 'Finance & Crypto', 'Gaming & Esports', 'Education & Courses'] as const;
const budgets = ['$500-$1K', '$1K-$5K', '$5K-$15K', '$15K-$50K', '$50K+'] as const;
const goals = ['Brand Awareness', 'Lead Generation', 'Product Launch', 'Content Creation', 'Community Building', 'Sales & Conversions'] as const;
const platforms = ['Instagram', 'TikTok', 'YouTube', 'Twitter/X', 'LinkedIn', 'All Platforms'] as const;

interface InfluencerMatch { name: string; handle: string; platform: string; followers: string; engagementRate: string; niche: string; matchScore: number; avgCPE: string; contentStyle: string; audienceDemo: string; whyMatch: string; redFlags: string; }
interface OutreachTemplate { subject: string; body: string; channel: string; timing: string; followUp: string; }
interface CampaignStructure { phase: string; duration: string; deliverables: string; budget: string; kpi: string; risk: string; }
interface NegotiationTip { topic: string; yourPosition: string; theirPosition: string; sweetSpot: string; leverage: string; }

interface MatchmakerReport {
  topMatches: InfluencerMatch[];
  outreachTemplates: OutreachTemplate[];
  campaignStructure: CampaignStructure[];
  negotiationTips: NegotiationTip[];
  budgetAllocation: string[];
  redFlags: string[];
  successMetrics: string[];
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }

function matchInfluencers(niche: string, budget: string, goal: string, platform: string, brand: string): MatchmakerReport {
  const seed = hash(`${niche}-${budget}-${goal}-${platform}-${brand}`);

  const influencerNames = [
    { name: 'Sarah Chen', handle: '@sarahcreates', style: 'Educational storytelling with data-backed insights' },
    { name: 'Marcus Rivera', handle: '@marcusbuilds', style: 'Behind-the-scenes authenticity with humor' },
    { name: 'Aisha Patel', handle: '@aishainsights', style: 'Polished aesthetic with deep expertise threads' },
    { name: 'Jake Thompson', handle: '@jakethinks', style: 'Controversial takes with strong community engagement' },
    { name: 'Luna Kim', handle: '@lunaexplains', style: 'Explainer content with visual breakdowns' },
    { name: 'David Okafor', handle: '@davidgrows', style: 'Growth-focused case studies with real numbers' },
    { name: 'Emma Brooks', handle: '@emmareview', style: 'Honest reviews with comparison frameworks' },
    { name: 'Alex Moreno', handle: '@alexscales', style: 'Tactical how-to content with templates' },
  ];

  const topMatches: InfluencerMatch[] = influencerNames.slice(0, 6).map((inf, i) => {
    const s = (seed + i * 137) % 100;
    const followers = ['12.5K', '45K', '120K', '250K', '500K', '1.2M', '85K', '320K'][i];
    const er = (2.1 + (s % 60) / 10).toFixed(1);
    return {
      name: inf.name, handle: inf.handle, platform: platform === 'All Platforms' ? ['Instagram', 'TikTok', 'YouTube', 'Twitter/X', 'LinkedIn'][i % 5] : platform,
      followers, engagementRate: `${er}%`, niche: niche, matchScore: 65 + s % 30,
      avgCPE: `$${(0.05 + (s % 30) / 100).toFixed(2)}`, contentStyle: inf.style,
      audienceDemo: `${55 + s % 25}% age 25-44, ${40 + s % 30}% ${niche} interest, ${50 + s % 30}% purchasing intent`,
      whyMatch: [`Audience overlap ${60 + s % 30}% with your target demo — high conversion potential`, `Content style aligns with your brand voice — minimal creative direction needed`, `Previous ${niche} campaigns averaged ${3 + s % 5}x ROAS — proven performer`, `Growing fast (+${10 + s % 30}K/month) — get in early before rates increase`, `Strong community trust score — recommendations drive actual purchases`, `Multi-format creator — can deliver reels, stories, posts, and long-form`][i],
      redFlags: s % 4 === 0 ? 'Promoted a competitor 3 months ago — check exclusivity' : s % 4 === 1 ? 'Engagement dipped 15% last quarter — monitor before committing' : s % 4 === 2 ? 'None detected — clean history' : 'Has worked with 8 brands this month — potential audience fatigue',
    };
  });

  const outreachTemplates: OutreachTemplate[] = [
    { subject: `Collaboration opportunity: ${brand} x [Influencer Name]`, body: `Hi [Name],\n\nI've been following your ${niche} content for a while — your [specific post/video] really resonated with our audience. At ${brand}, we're looking for authentic voices to help us [goal]. Your content style and audience align perfectly with what we're building.\n\nWould you be open to a quick call this week to explore a potential collaboration? We have budget allocated and flexible on format.\n\nBest,\n[Your name]`, channel: 'Email (preferred)', timing: 'Tuesday-Thursday, 10am-2pm their timezone', followUp: 'If no response in 5 days, send a brief DM on their primary platform referencing the email' },
    { subject: `[Brand] wants to feature you — ${goal.toLowerCase()} campaign`, body: `Hey [Name]! 👋\n\nLove what you're doing with [recent content]. We're launching a ${goal.toLowerCase()} campaign and immediately thought of you.\n\nQuick details:\n- Campaign: [brief description]\n- Timeline: [dates]\n- Compensation: [range from budget]\n- Creative freedom: High — we trust your voice\n\nInterested? Happy to share more details.\n\n[Your name] @ ${brand}`, channel: 'DM on their most active platform', timing: 'Send within 24 hours of them posting new content (shows you actually follow them)', followUp: 'Like and comment on 2-3 of their posts before following up — build familiarity first' },
    { subject: `Paid collaboration: ${brand} x [Name] — ${niche}`, body: `Hi [Name],\n\nI'm [role] at ${brand}. We've analyzed your audience metrics and believe there's strong overlap with our target customers.\n\nProposal overview:\n- ${goal} campaign, [duration]\n- [X] deliverables across [platforms]\n- Budget: [specific range]\n- Usage rights: [terms]\n\nWe've attached a brief for your review. Open to discussing adjustments that work for both sides.\n\nLooking forward to your thoughts.\n\n[Your name]`, channel: 'Email with media kit attached', timing: 'Monday morning — starts their week with a clear opportunity', followUp: 'Follow up with a simplified 1-page brief if no response — long proposals get ignored' },
  ];

  const campaignStructure: CampaignStructure[] = [
    { phase: 'Discovery & Vetting', duration: 'Week 1-2', deliverables: 'Shortlist 10 influencers, deep-vet top 5, check audience authenticity (fake follower audit)', budget: '0% (research phase)', kpi: 'Audience overlap score > 60%, engagement authenticity > 85%', risk: 'Fake followers — always verify with 3rd party tools before committing budget' },
    { phase: 'Outreach & Negotiation', duration: 'Week 2-3', deliverables: 'Send personalized outreach to top 5, negotiate rates and deliverables, sign contracts', budget: '0% (pre-production)', kpi: 'Response rate > 40%, close rate > 20%', risk: 'Influencer ghosting — always have backup options and don\'t over-invest in one creator' },
    { phase: 'Content Creation', duration: 'Week 3-5', deliverables: 'Brief delivery, content drafts, revision rounds (max 2), final approval', budget: `60% of ${budget} (creator fees)`, kpi: 'On-brief rate > 80%, content quality score > 7/10', risk: 'Off-brand content — provide clear guidelines but leave room for authentic voice' },
    { phase: 'Publishing & Amplification', duration: 'Week 5-6', deliverables: 'Scheduled posts, story takeovers, community engagement, paid amplification of top content', budget: `25% of ${budget} (amplification)`, kpi: `Reach, engagement rate, ${goal === 'Sales & Conversions' ? 'conversion rate' : goal === 'Lead Generation' ? 'lead volume' : 'brand lift'}`, risk: 'Algorithm changes — diversify across platforms and formats' },
    { phase: 'Analysis & Optimization', duration: 'Week 6-8', deliverables: 'Performance report, ROI analysis, relationship assessment, re-engagement plan', budget: `15% of ${budget} (tools + reporting)`, kpi: 'Overall ROAS, cost per engagement, audience growth, sentiment score', risk: 'Vanity metrics — focus on business outcomes (leads, sales, signups) not just reach' },
  ];

  const negotiationTips: NegotiationTip[] = [
    { topic: 'Rate Negotiation', yourPosition: `Budget: ${budget} total campaign`, theirPosition: 'Creators typically quote 2-3x their minimum', sweetSpot: 'Offer performance bonuses on top of base rate — creators earn more if campaign succeeds, you pay less if it doesn\'t', leverage: 'Long-term partnership potential is worth more than a single high-paying gig — lead with relationship' },
    { topic: 'Content Rights', yourPosition: 'Want full usage rights for paid amplification', theirPosition: 'Creators want to limit usage to organic only', sweetSpot: '90-day usage rights for paid ads at 20-30% premium — renewable if campaign performs', leverage: 'Paid amplification benefits both sides — their content gets more reach, you get more conversions' },
    { topic: 'Exclusivity', yourPosition: 'Want category exclusivity during campaign', theirPosition: 'Creators resist exclusivity (limits income)', sweetSpot: '30-day exclusivity window around launch + 15-day buffer — pay 15-25% premium for the restriction', leverage: 'Offer guaranteed minimum posts/month in exchange for exclusivity — steady income vs. one-off deals' },
    { topic: 'Deliverables', yourPosition: 'Want maximum content for budget', theirPosition: 'Creators prefer fewer, higher-quality pieces', sweetSpot: 'Focus on 2-3 hero pieces + derivative content (stories, behind-scenes) — quality core + volume extras', leverage: 'Derivative content is low-effort for creators but high-value for brands — win-win to include' },
  ];

  const budgetAllocation = [
    `Total campaign budget: ${budget}`,
    `Creator fees: 50-60% — the actual content creation and posting`,
    `Paid amplification: 20-25% — boost top-performing influencer content as ads`,
    `Tools & vetting: 5-10% — audience analysis, fake follower detection, tracking`,
    `Contingency: 10-15% — extra content rounds, bonus for viral performance, unexpected costs`,
    `Pro tip: Start with micro-influencers (10K-50K followers) — 3-5x better engagement rate than mega-influencers at 1/10th the cost`,
    `Never pay 100% upfront — structure as 50% on contract signing, 50% on content delivery and approval`,
  ];

  const redFlags = [
    'Follower-to-engagement ratio below 1% — likely purchased followers or dead audience',
    'Sudden follower spikes without viral content — bot purchases are easy to spot in growth charts',
    'Won\'t share audience demographics or analytics screenshots — hiding poor audience quality',
    'Promotes competing products the same week — no brand loyalty, pure pay-to-post behavior',
    'History of controversial statements outside their niche — brand safety risk',
    'Engagement mostly from other influencers, not real consumers — echo chamber, not real reach',
    'Refuses any form of performance tracking — they know results won\'t justify the spend',
    'More sponsored posts than organic content — audience trust is already eroded',
  ];

  const successMetrics = [
    `Primary: ${goal === 'Sales & Conversions' ? 'Revenue attributed to influencer content (use UTM links + promo codes)' : goal === 'Lead Generation' ? 'Leads generated with influencer-specific landing pages' : goal === 'Brand Awareness' ? 'Reach + brand mention increase + share of voice change' : goal === 'Product Launch' ? 'Launch day traffic + waitlist signups + social mentions' : goal === 'Content Creation' ? 'Content pieces generated + content quality score + repurpose potential' : 'Community growth rate + engagement depth + member-to-customer conversion'}`,
    `Secondary: Cost per engagement (CPE) — target under $0.10 for ${niche}`,
    `Tertiary: Content longevity — how long does influencer content drive traffic (evergreen vs. spike)?`,
    `Track: Unique promo codes per influencer — this is the only reliable way to measure direct sales attribution`,
    `Track: Brand search volume before vs. after campaign — captures the "halo effect" that UTMs miss`,
    `Report frequency: Weekly during campaign, monthly for 3 months post-campaign (long tail matters)`,
  ];

  return { topMatches, outreachTemplates, campaignStructure, negotiationTips, budgetAllocation, redFlags, successMetrics };
}

export default function InfluencerMatchmaker() {
  const [niche, setNiche] = useState('');
  const [budget, setBudget] = useState('');
  const [goal, setGoal] = useState('');
  const [platform, setPlatform] = useState('');
  const [brand, setBrand] = useState('');
  const [report, setReport] = useState<MatchmakerReport | null>(null);

  const generate = () => { if (niche && budget && goal && platform && brand) setReport(matchInfluencers(niche, budget, goal, platform, brand)); };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/30 to-gray-950 text-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <nav className="mb-8"><a href="/" className="text-purple-400 hover:text-purple-300 transition">← Back to PostCraft AI</a></nav>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">Influencer Matchmaker</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">Find, vet, and negotiate with the perfect influencers for your brand. Get matched profiles, outreach templates, campaign structures, and negotiation playbooks.</p>
        </div>

        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 mb-10">
          <div className="grid md:grid-cols-2 gap-6">
            <div><label className="block text-sm text-gray-400 mb-2">Your Niche *</label><select className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white" value={niche} onChange={e => setNiche(e.target.value)}><option value="">Select niche...</option>{niches.map(n => <option key={n} value={n}>{n}</option>)}</select></div>
            <div><label className="block text-sm text-gray-400 mb-2">Campaign Budget *</label><select className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white" value={budget} onChange={e => setBudget(e.target.value)}><option value="">Select budget...</option>{budgets.map(b => <option key={b} value={b}>{b}</option>)}</select></div>
            <div><label className="block text-sm text-gray-400 mb-2">Campaign Goal *</label><select className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white" value={goal} onChange={e => setGoal(e.target.value)}><option value="">Select goal...</option>{goals.map(g => <option key={g} value={g}>{g}</option>)}</select></div>
            <div><label className="block text-sm text-gray-400 mb-2">Target Platform *</label><select className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white" value={platform} onChange={e => setPlatform(e.target.value)}><option value="">Select platform...</option>{platforms.map(p => <option key={p} value={p}>{p}</option>)}</select></div>
            <div className="md:col-span-2"><label className="block text-sm text-gray-400 mb-2">Brand Name *</label><input className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white" placeholder="e.g. PostCraft AI" value={brand} onChange={e => setBrand(e.target.value)} /></div>
          </div>
          <button onClick={generate} className="mt-6 w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-3 px-6 rounded-xl transition-all">Find My Perfect Influencers</button>
        </div>

        {report && (
          <div className="space-y-10">
            {/* Top Matches */}
            <section className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-purple-300">Top Influencer Matches</h2>
              <div className="grid gap-6">
                {report.topMatches.map((m, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-white">{m.name} <span className="text-purple-400 font-normal">{m.handle}</span></h3>
                        <p className="text-sm text-gray-400">{m.platform} · {m.followers} followers · {m.engagementRate} engagement</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-400">{m.matchScore}%</div>
                        <div className="text-xs text-gray-400">match score</div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div><span className="text-gray-400">Avg CPE:</span> <span className="text-white">{m.avgCPE}</span></div>
                      <div><span className="text-gray-400">Style:</span> <span className="text-white">{m.contentStyle}</span></div>
                      <div className="md:col-span-2"><span className="text-gray-400">Audience:</span> <span className="text-white">{m.audienceDemo}</span></div>
                      <div className="md:col-span-2"><span className="text-gray-400">Why match:</span> <span className="text-green-300">{m.whyMatch}</span></div>
                      {m.redFlags !== 'None detected — clean history' && <div className="md:col-span-2"><span className="text-gray-400">⚠️ Flag:</span> <span className="text-yellow-300">{m.redFlags}</span></div>}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Outreach Templates */}
            <section className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-pink-300">Outreach Templates</h2>
              <div className="space-y-6">
                {report.outreachTemplates.map((t, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-2">Template {i + 1}: {t.channel}</h3>
                    <p className="text-sm text-purple-300 mb-3">Subject: {t.subject}</p>
                    <pre className="text-sm text-gray-300 whitespace-pre-wrap bg-black/30 rounded-lg p-4 mb-3">{t.body}</pre>
                    <div className="flex gap-4 text-sm">
                      <span className="text-gray-400">Best timing: <span className="text-white">{t.timing}</span></span>
                    </div>
                    <p className="text-sm text-yellow-300 mt-2">Follow-up: {t.followUp}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Campaign Structure */}
            <section className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-orange-300">Campaign Structure</h2>
              <div className="space-y-4">
                {report.campaignStructure.map((c, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-sm font-semibold">Phase {i + 1}</span>
                      <h3 className="font-bold text-white">{c.phase}</h3>
                      <span className="text-gray-400 text-sm ml-auto">{c.duration}</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-2 text-sm">
                      <div><span className="text-gray-400">Deliverables:</span> <span className="text-white">{c.deliverables}</span></div>
                      <div><span className="text-gray-400">Budget:</span> <span className="text-white">{c.budget}</span></div>
                      <div><span className="text-gray-400">KPI:</span> <span className="text-green-300">{c.kpi}</span></div>
                      <div><span className="text-gray-400">Risk:</span> <span className="text-yellow-300">{c.risk}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Negotiation Tips */}
            <section className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-green-300">Negotiation Playbook</h2>
              <div className="space-y-4">
                {report.negotiationTips.map((n, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <h3 className="font-bold text-white mb-3">{n.topic}</h3>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div><span className="text-blue-300">Your position:</span> <span className="text-white">{n.yourPosition}</span></div>
                      <div><span className="text-red-300">Their position:</span> <span className="text-white">{n.theirPosition}</span></div>
                      <div><span className="text-green-300">Sweet spot:</span> <span className="text-white">{n.sweetSpot}</span></div>
                      <div><span className="text-purple-300">Leverage:</span> <span className="text-white">{n.leverage}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Budget Allocation */}
            <section className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-cyan-300">Budget Allocation</h2>
              <ul className="space-y-2">{report.budgetAllocation.map((b, i) => <li key={i} className="text-gray-300 flex gap-2"><span className="text-cyan-400">→</span>{b}</li>)}</ul>
            </section>

            {/* Red Flags */}
            <section className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-red-300">Red Flags to Watch</h2>
              <ul className="space-y-2">{report.redFlags.map((f, i) => <li key={i} className="text-gray-300 flex gap-2"><span className="text-red-400">⚠</span>{f}</li>)}</ul>
            </section>

            {/* Success Metrics */}
            <section className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-emerald-300">Success Metrics</h2>
              <ul className="space-y-2">{report.successMetrics.map((m, i) => <li key={i} className="text-gray-300 flex gap-2"><span className="text-emerald-400">✓</span>{m}</li>)}</ul>
            </section>

            <div className="text-center py-8"><p className="text-gray-500 text-sm">Generated by PostCraft AI — Influencer Matchmaker</p></div>
          </div>
        )}
      </div>
    </main>
  );
}
