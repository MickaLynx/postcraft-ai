'use client';
import { useState } from 'react';

const platforms = ['Instagram', 'TikTok', 'Twitter/X', 'LinkedIn', 'YouTube', 'Facebook', 'Discord', 'Reddit'] as const;
const communitySizes = ['0-1K', '1K-10K', '10K-50K', '50K-100K', '100K+'] as const;
const goals = ['Grow Members', 'Increase Engagement', 'Reduce Churn', 'Build Ambassadors', 'Launch Product', 'Monetize'] as const;
const tones = ['Friendly', 'Professional', 'Edgy', 'Inclusive', 'Authoritative'] as const;

interface HealthScore {
  overall: number;
  growthRate: string;
  engagementRate: string;
  sentiment: string;
  churnRisk: string;
}

interface EngagementTactic {
  name: string;
  description: string;
  frequency: string;
  expectedImpact: number;
  effortLevel: string;
  example: string;
}

interface ContentMixItem {
  type: string;
  percentage: number;
  bestTime: string;
  tip: string;
  examplePost: string;
}

interface AmbassadorTier {
  tier: string;
  emoji: string;
  requirements: string[];
  perks: string[];
  conversionRate: string;
}

interface ModerationRule {
  name: string;
  trigger: string;
  action: string;
  escalation: string;
  autoResponse: string;
}

interface GrowthTactic {
  name: string;
  channel: string;
  cost: string;
  timeToResults: string;
  description: string;
  metric: string;
}

interface WeeklyRitual {
  day: string;
  ritual: string;
  time: string;
  activity: string;
  engagementTarget: string;
}

interface CommunityResult {
  healthScore: HealthScore;
  engagementPlaybook: EngagementTactic[];
  contentMix: ContentMixItem[];
  ambassadorProgram: AmbassadorTier[];
  moderationRules: ModerationRule[];
  growthTactics: GrowthTactic[];
  weeklyRituals: WeeklyRitual[];
}

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function generate(platform: string, size: string, niche: string, goal: string, tone: string): CommunityResult {
  const seed = hash(`${platform}${size}${niche}${goal}${tone}`);
  const p = (i: number) => ((seed * (i + 7)) % 100);
  const nicheLabel = niche || 'general';

  const healthScore: HealthScore = {
    overall: 40 + (p(1) % 55),
    growthRate: `+${1 + (p(2) % 18)}% /month`,
    engagementRate: `${2 + (p(3) % 12)}.${p(4) % 10}%`,
    sentiment: ['Very Positive', 'Positive', 'Neutral', 'Mixed'][p(5) % 4],
    churnRisk: ['Low', 'Medium', 'High'][p(6) % 3],
  };

  const allTactics: EngagementTactic[] = [
    { name: 'Welcome Ritual', description: `Personally welcome every new ${nicheLabel} community member within 2 hours with a custom message`, frequency: 'Daily', expectedImpact: 9, effortLevel: 'Low', example: `"Welcome to the ${nicheLabel} crew, @name! Drop your biggest ${nicheLabel} challenge below and we'll help you crush it 🔥"` },
    { name: 'AMA Sessions', description: `Host weekly Ask-Me-Anything on ${platform} about trending ${nicheLabel} topics`, frequency: 'Weekly', expectedImpact: 8, effortLevel: 'Medium', example: `"🎙️ LIVE AMA Thursday 7PM — Bring your toughest ${nicheLabel} questions. No gatekeeping."` },
    { name: 'User Spotlight', description: `Feature one outstanding community member's ${nicheLabel} journey each week`, frequency: 'Weekly', expectedImpact: 9, effortLevel: 'Medium', example: `"⭐ Member Spotlight: How @member grew their ${nicheLabel} from 0 to 10K in 90 days"` },
    { name: 'Challenge Series', description: `Launch themed ${nicheLabel} challenges with clear deliverables and prizes`, frequency: 'Monthly', expectedImpact: 10, effortLevel: 'High', example: `"🏆 30-Day ${nicheLabel} Challenge: Post daily, tag us, win $500 in prizes!"` },
    { name: 'Poll & Feedback Loop', description: `Run quick polls to let the community shape ${nicheLabel} content direction`, frequency: 'Twice Weekly', expectedImpact: 7, effortLevel: 'Low', example: `"Which ${nicheLabel} topic should we deep-dive next? A) Trends B) Tools C) Case Studies"` },
    { name: 'Content Co-Creation', description: `Invite members to co-create ${nicheLabel} content — threads, carousels, videos`, frequency: 'Weekly', expectedImpact: 9, effortLevel: 'Medium', example: `"We're making a collab thread on ${nicheLabel} mistakes. Drop yours 👇 Best one gets featured."` },
    { name: 'Exclusive Drops', description: `Share insider ${nicheLabel} knowledge or early access only to community members`, frequency: 'Monthly', expectedImpact: 8, effortLevel: 'Medium', example: `"🔒 Community exclusive: Our ${nicheLabel} playbook before it goes public. Save this."` },
    { name: 'Engagement Triggers', description: `Post controversial or thought-provoking ${nicheLabel} hot takes to spark debate`, frequency: 'Daily', expectedImpact: 8, effortLevel: 'Low', example: `"Hot take: 90% of ${nicheLabel} advice on ${platform} is wrong. Here's what actually works 🧵"` },
  ];

  const contentTypes: ContentMixItem[] = [
    { type: 'Educational Posts', percentage: 30, bestTime: '9:00 AM', tip: `Break down complex ${nicheLabel} concepts into bite-sized ${platform} posts`, examplePost: `"The 3 ${nicheLabel} metrics that actually matter (and the 7 everyone wastes time on)"` },
    { type: 'Community UGC', percentage: 25, bestTime: '12:00 PM', tip: `Reshare the best member-created ${nicheLabel} content with commentary`, examplePost: `"@member just dropped this ${nicheLabel} insight and we need to talk about it 👇"` },
    { type: 'Behind-the-Scenes', percentage: 15, bestTime: '5:00 PM', tip: `Show the raw, unfiltered ${nicheLabel} building process`, examplePost: `"Here's what running a ${nicheLabel} community actually looks like (it's messy)"` },
    { type: 'Engagement Bait', percentage: 10, bestTime: '7:00 PM', tip: `Use questions, polls, and hot takes to drive ${platform} comments`, examplePost: `"Unpopular ${nicheLabel} opinion: Drop yours 👇 Most controversial wins a shoutout"` },
    { type: 'Success Stories', percentage: 10, bestTime: '10:00 AM', tip: `Document member wins in ${nicheLabel} — transformation stories perform 3x better`, examplePost: `"From 0 to hero: How @member used our community to crush their ${nicheLabel} goals"` },
    { type: 'Announcements & Events', percentage: 10, bestTime: '8:00 AM', tip: `Hype upcoming ${nicheLabel} events, launches, and milestones on ${platform}`, examplePost: `"📢 BIG announcement: Our ${nicheLabel} summit is happening next month. Free for members."` },
  ];

  const ambassadorProgram: AmbassadorTier[] = [
    {
      tier: 'Bronze Ambassador', emoji: '🥉',
      requirements: ['Active for 30+ days', '10+ meaningful contributions', 'Invited 2+ new members'],
      perks: ['Exclusive badge', 'Early access to content', 'Monthly community newsletter'],
      conversionRate: `${8 + (p(10) % 12)}% of members`,
    },
    {
      tier: 'Silver Ambassador', emoji: '🥈',
      requirements: ['Active for 90+ days', '50+ contributions', 'Hosted 1+ community event', 'Invited 10+ members'],
      perks: ['Free premium access', 'Direct chat with founders', 'Co-creation opportunities', 'Exclusive merch'],
      conversionRate: `${2 + (p(11) % 5)}% of members`,
    },
    {
      tier: 'Gold Ambassador', emoji: '🥇',
      requirements: ['Active for 180+ days', '200+ contributions', 'Mentored 5+ members', 'Content featured 10+ times'],
      perks: ['Revenue share (10%)', 'Advisory board seat', 'Conference speaker slots', 'Personal branding support', 'Annual retreat invite'],
      conversionRate: `${(p(12) % 3) + 1}.${p(13) % 10}% of members`,
    },
  ];

  const moderationRules: ModerationRule[] = [
    { name: 'Spam Filter', trigger: 'Links in first message or repeated promotional content', action: 'Auto-hold for review', escalation: 'Flag to mod team if 3+ offenses', autoResponse: `"Hey! We love sharing but please introduce yourself first before posting links. Check our ${nicheLabel} community guidelines 🙏"` },
    { name: 'Toxic Language', trigger: 'Slurs, personal attacks, or targeted harassment', action: 'Immediate mute + warning', escalation: 'Ban after 2nd offense — zero tolerance', autoResponse: `"This message was flagged. We keep this ${nicheLabel} space respectful. Please review our code of conduct."` },
    { name: 'Off-Topic Police', trigger: 'Content unrelated to community theme for 3+ posts', action: 'Gentle redirect', escalation: 'Temporary post restriction', autoResponse: `"Great energy! This might fit better in our off-topic channel. Let's keep the main feed focused on ${nicheLabel} 🎯"` },
    { name: 'Self-Promo Guard', trigger: 'Unsolicited product/service promotion', action: 'Move to promo channel', escalation: 'Remove if no value added', autoResponse: `"We have a dedicated promo day (Fridays). Save this for then — our members will engage more when it's expected! 📅"` },
    { name: 'Misinformation Check', trigger: `Unverified ${nicheLabel} claims or dangerous advice`, action: 'Add context label + source request', escalation: 'Remove if no source provided within 24h', autoResponse: `"Interesting claim! Can you share your source? We want to make sure our ${nicheLabel} community gets accurate info 🔍"` },
    { name: 'Conflict Resolution', trigger: 'Heated debate escalating to personal level', action: 'Cool-down message + thread lock if needed', escalation: 'Private DM mediation for key members', autoResponse: `"Healthy debate is great! Let's keep it about ideas, not people. Taking a 30-min cool-down on this thread ❄️"` },
  ];

  const growthTactics: GrowthTactic[] = [
    { name: 'Cross-Platform Teasers', channel: platform, cost: 'Free', timeToResults: '2-4 weeks', description: `Post community highlights on ${platform} with "join for full access" CTAs`, metric: 'New member signups per post' },
    { name: 'Referral Program', channel: 'Word of Mouth', cost: 'Low', timeToResults: '1-2 months', description: `Give members a unique invite link with rewards for every ${nicheLabel} enthusiast they bring`, metric: 'Referral conversion rate' },
    { name: 'Guest Expert Sessions', channel: 'Partnerships', cost: 'Free', timeToResults: '1-2 weeks', description: `Invite ${nicheLabel} influencers to host sessions — they promote to their audience`, metric: 'Attendees → member conversion' },
    { name: 'SEO Content Funnel', channel: 'Blog/Search', cost: 'Medium', timeToResults: '2-3 months', description: `Create ${nicheLabel} guides that rank on Google with community join CTAs`, metric: 'Organic traffic → signups' },
    { name: 'Micro-Community Raids', channel: 'Other Communities', cost: 'Free', timeToResults: '1-3 weeks', description: `Add genuine value in adjacent ${nicheLabel} communities, then invite interested members`, metric: 'Cross-community joins' },
    { name: 'Launch Event Blitz', channel: platform, cost: 'Low', timeToResults: '1 week', description: `Run a 48-hour ${nicheLabel} event with exclusive content only accessible to new joiners`, metric: 'Event signups → retention at 30 days' },
    { name: 'Paid Acquisition', channel: `${platform} Ads`, cost: 'Medium', timeToResults: '1-2 weeks', description: `Run targeted ads to ${nicheLabel} audiences highlighting community wins and testimonials`, metric: 'Cost per member acquired' },
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const weeklyRituals: WeeklyRitual[] = [
    { day: days[0], ritual: 'Momentum Monday', time: '9:00 AM', activity: `Share weekly ${nicheLabel} goals — members post their #1 focus for the week`, engagementTarget: '50+ goal posts' },
    { day: days[1], ritual: 'Tip Tuesday', time: '12:00 PM', activity: `Community members share their best ${nicheLabel} tip — top tip gets pinned`, engagementTarget: '30+ tips shared' },
    { day: days[2], ritual: 'Win Wednesday', time: '10:00 AM', activity: `Celebrate ${nicheLabel} wins big and small — screenshot your progress`, engagementTarget: '40+ wins posted' },
    { day: days[3], ritual: 'AMA Thursday', time: '7:00 PM', activity: `Live Q&A with a ${nicheLabel} expert or top community member`, engagementTarget: '25+ questions asked' },
    { day: days[4], ritual: 'Feature Friday', time: '5:00 PM', activity: `Spotlight member of the week + open self-promo hour for ${nicheLabel} projects`, engagementTarget: '20+ promo posts' },
    { day: days[5], ritual: 'Study Saturday', time: '11:00 AM', activity: `Deep-dive into a ${nicheLabel} case study or resource — group discussion`, engagementTarget: '15+ discussion threads' },
    { day: days[6], ritual: 'Chill Sunday', time: '4:00 PM', activity: `Off-topic vibes — memes, life updates, and ${nicheLabel}-adjacent fun`, engagementTarget: '35+ casual interactions' },
  ];

  return { healthScore, engagementPlaybook: allTactics, contentMix: contentTypes, ambassadorProgram, moderationRules, growthTactics, weeklyRituals };
}

export default function CommunityManagerPage() {
  const [platform, setPlatform] = useState<string>(platforms[0]);
  const [size, setSize] = useState<string>(communitySizes[0]);
  const [niche, setNiche] = useState('');
  const [goal, setGoal] = useState<string>(goals[0]);
  const [tone, setTone] = useState<string>(tones[0]);
  const [result, setResult] = useState<CommunityResult | null>(null);

  const handleGenerate = () => { setResult(generate(platform, size, niche, goal, tone)); };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50 px-4 py-16 max-w-7xl mx-auto">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">Community Engagement Playbook</h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">Generate a complete community management strategy — engagement tactics, content mix, ambassador program, moderation rules, growth playbook, and weekly rituals.</p>
      </section>

      <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Platform</label>
            <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100">
              {platforms.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Community Size</label>
            <select value={size} onChange={e => setSize(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100">
              {communitySizes.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Niche / Topic</label>
            <input value={niche} onChange={e => setNiche(e.target.value)} placeholder="e.g. fitness, SaaS, crypto" className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Primary Goal</label>
            <select value={goal} onChange={e => setGoal(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100">
              {goals.map(g => <option key={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Community Tone</label>
            <select value={tone} onChange={e => setTone(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100">
              {tones.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <button onClick={handleGenerate} className="w-full py-3 rounded-xl font-bold text-lg bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 transition">Generate Community Playbook</button>
      </section>

      {result && (
        <div className="space-y-10">
          {/* Health Score */}
          <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4">🏥 Community Health Score</h2>
            <div className="flex items-center gap-6 mb-4">
              <div className="text-6xl font-extrabold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">{result.healthScore.overall}</div>
              <div className="w-full">
                <div className="w-full bg-zinc-800 rounded-full h-4">
                  <div className="h-4 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all" style={{ width: `${result.healthScore.overall}%` }} />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Growth Rate', value: result.healthScore.growthRate, color: 'text-emerald-400' },
                { label: 'Engagement Rate', value: result.healthScore.engagementRate, color: 'text-cyan-400' },
                { label: 'Sentiment', value: result.healthScore.sentiment, color: 'text-blue-400' },
                { label: 'Churn Risk', value: result.healthScore.churnRisk, color: result.healthScore.churnRisk === 'Low' ? 'text-emerald-400' : result.healthScore.churnRisk === 'Medium' ? 'text-yellow-400' : 'text-red-400' },
              ].map(m => (
                <div key={m.label} className="bg-zinc-800/50 rounded-xl p-3 text-center">
                  <div className="text-xs text-zinc-500 mb-1">{m.label}</div>
                  <div className={`font-bold ${m.color}`}>{m.value}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Engagement Playbook */}
          <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4">🎯 Engagement Playbook</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.engagementPlaybook.map((t, i) => (
                <div key={i} className="bg-zinc-800/50 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-emerald-400">{t.name}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-zinc-700 text-zinc-300">{t.frequency}</span>
                  </div>
                  <p className="text-sm text-zinc-400 mb-2">{t.description}</p>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="text-xs text-zinc-500">Impact</div>
                    <div className="flex-1 bg-zinc-700 rounded-full h-2"><div className="h-2 rounded-full bg-cyan-500" style={{ width: `${t.expectedImpact * 10}%` }} /></div>
                    <div className="text-xs text-cyan-400">{t.expectedImpact}/10</div>
                  </div>
                  <div className="text-xs text-zinc-500 italic">"{t.example}"</div>
                </div>
              ))}
            </div>
          </section>

          {/* Content Mix */}
          <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4">📊 Content Mix</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {result.contentMix.map((c, i) => (
                <div key={i} className="bg-zinc-800/50 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-teal-400">{c.type}</h3>
                    <span className="text-lg font-extrabold text-cyan-400">{c.percentage}%</span>
                  </div>
                  <div className="w-full bg-zinc-700 rounded-full h-2 mb-3"><div className="h-2 rounded-full bg-teal-500" style={{ width: `${c.percentage}%` }} /></div>
                  <p className="text-xs text-zinc-400 mb-1">⏰ Best time: {c.bestTime}</p>
                  <p className="text-xs text-zinc-400 mb-2">💡 {c.tip}</p>
                  <p className="text-xs text-zinc-500 italic">"{c.examplePost}"</p>
                </div>
              ))}
            </div>
          </section>

          {/* Ambassador Program */}
          <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4">🏅 Ambassador Program</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {result.ambassadorProgram.map((t, i) => (
                <div key={i} className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700">
                  <div className="text-center mb-3">
                    <span className="text-3xl">{t.emoji}</span>
                    <h3 className="font-bold text-lg mt-1">{t.tier}</h3>
                    <span className="text-xs text-cyan-400">{t.conversionRate}</span>
                  </div>
                  <div className="mb-3">
                    <div className="text-xs text-zinc-500 font-semibold mb-1">Requirements</div>
                    {t.requirements.map((r, j) => <div key={j} className="text-xs text-zinc-400 flex gap-1"><span>✅</span>{r}</div>)}
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 font-semibold mb-1">Perks</div>
                    {t.perks.map((pk, j) => <div key={j} className="text-xs text-emerald-400 flex gap-1"><span>🎁</span>{pk}</div>)}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Moderation Rules */}
          <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4">🛡️ Moderation Rules</h2>
            <div className="space-y-3">
              {result.moderationRules.map((r, i) => (
                <div key={i} className="bg-zinc-800/50 rounded-xl p-4">
                  <h3 className="font-bold text-red-400 mb-1">{r.name}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs mb-2">
                    <div><span className="text-zinc-500">Trigger:</span> <span className="text-zinc-300">{r.trigger}</span></div>
                    <div><span className="text-zinc-500">Action:</span> <span className="text-zinc-300">{r.action}</span></div>
                    <div><span className="text-zinc-500">Escalation:</span> <span className="text-zinc-300">{r.escalation}</span></div>
                  </div>
                  <div className="text-xs text-zinc-500 italic bg-zinc-900/50 rounded-lg p-2">Auto-response: {r.autoResponse}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Growth Tactics */}
          <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4">🚀 Growth Tactics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.growthTactics.map((t, i) => (
                <div key={i} className="bg-zinc-800/50 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-emerald-400">{t.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${t.cost === 'Free' ? 'bg-emerald-900/50 text-emerald-400' : t.cost === 'Low' ? 'bg-blue-900/50 text-blue-400' : 'bg-yellow-900/50 text-yellow-400'}`}>{t.cost}</span>
                  </div>
                  <p className="text-sm text-zinc-400 mb-2">{t.description}</p>
                  <div className="flex justify-between text-xs text-zinc-500">
                    <span>📡 {t.channel}</span>
                    <span>⏱ {t.timeToResults}</span>
                    <span>📏 {t.metric}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Weekly Ritual Calendar */}
          <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4">📅 Weekly Ritual Calendar</h2>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
              {result.weeklyRituals.map((r, i) => (
                <div key={i} className="bg-zinc-800/50 rounded-xl p-3 text-center">
                  <div className="text-xs text-zinc-500 mb-1">{r.day}</div>
                  <div className="font-bold text-sm text-cyan-400 mb-1">{r.ritual}</div>
                  <div className="text-xs text-zinc-500 mb-1">🕐 {r.time}</div>
                  <div className="text-xs text-zinc-400 mb-2">{r.activity}</div>
                  <div className="text-xs text-emerald-400">🎯 {r.engagementTarget}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
