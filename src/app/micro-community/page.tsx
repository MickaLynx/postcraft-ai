'use client';
import { useState } from 'react';

// Option arrays (as const)
const communityPlatforms = ['Discord', 'Slack', 'Facebook Groups', 'Reddit', 'Circle', 'Mighty Networks', 'Telegram', 'WhatsApp'] as const;
const communitySizes = ['Seed (0-50)', 'Early (50-200)', 'Growing (200-500)', 'Established (500-2000)', 'Thriving (2000-5000)', 'Scale (5000+)'] as const;
const industries = ['SaaS/Tech', 'E-commerce', 'Healthcare', 'Finance', 'Education', 'Creative/Design', 'Fitness/Wellness', 'Food & Beverage'] as const;
const monetizationModels = ['Free (Brand Building)', 'Freemium', 'Paid Membership', 'Sponsorship', 'Product-Led', 'Course/Workshop', 'Affiliate', 'No Monetization'] as const;
const engagementStyles = ['Discussion-Heavy', 'Content Sharing', 'Challenges & Gamification', 'Expert AMAs', 'Peer Support', 'Co-Creation', 'Networking', 'Learning Cohorts'] as const;
const communityGoals = ['Customer Retention', 'Lead Generation', 'Brand Advocacy', 'Product Feedback', 'Knowledge Sharing', 'User Onboarding', 'Thought Leadership', 'Support Deflection'] as const;

// Result interfaces
interface BlueprintItem {
  channel: string;
  purpose: string;
  rules: string;
  contentCadence: string;
  moderationTip: string;
}

interface EngagementRitual {
  ritual: string;
  frequency: string;
  description: string;
  expectedParticipation: string;
  growthImpact: string;
}

interface MemberJourneyStep {
  stage: string;
  trigger: string;
  action: string;
  content: string;
  milestone: string;
}

interface GrowthTactic {
  tactic: string;
  channel: string;
  timeline: string;
  expectedGrowth: string;
  cost: string;
}

interface ContentPillar {
  pillar: string;
  description: string;
  formats: string;
  frequency: string;
  ownerRole: string;
}

interface RetentionStrategy {
  strategy: string;
  trigger: string;
  action: string;
  expectedImpact: string;
  measurement: string;
}

interface CommunityResult {
  healthScore: number;
  projectedMAR: number;
  blueprint: BlueprintItem[];
  engagementRituals: EngagementRitual[];
  memberJourney: MemberJourneyStep[];
  growthTactics: GrowthTactic[];
  contentPillars: ContentPillar[];
  retentionStrategies: RetentionStrategy[];
  communityHook: string;
  engagementCTA: string;
}

// Utility functions
function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }
function pick<T>(arr: readonly T[] | T[], seed: number, idx: number = 0): T { return arr[(seed + idx) % arr.length]; }

// Large data pools for deterministic generation
const channelNamesPool = [
  '#welcome-lounge', '#introductions', '#general-chat', '#wins-and-celebrations', '#ask-the-experts',
  '#resource-library', '#weekly-challenges', '#feedback-corner', '#off-topic', '#events-and-meetups',
  '#show-your-work', '#job-board', '#hot-takes', '#tools-and-tech', '#accountability-partners',
  '#content-drops', '#founder-stories', '#learning-lab', '#community-pulse', '#vip-inner-circle',
];

const channelPurposesPool = [
  'First touchpoint for new members to introduce themselves and feel welcomed',
  'Dedicated space for sharing victories, milestones, and progress updates',
  'Open forum for daily discussions, questions, and real-time conversations',
  'Curated collection of guides, templates, tools, and educational resources',
  'Weekly structured challenges that drive engagement and skill-building',
  'Direct feedback channel connecting members with product teams or leadership',
  'Casual space for non-topic conversations to build personal connections',
  'Event coordination hub for webinars, AMAs, meetups, and live sessions',
  'Portfolio and project showcase encouraging peer recognition and feedback',
  'Exclusive space for top contributors with premium content and early access',
  'Job opportunities and collaboration requests within the community network',
  'Debate-friendly zone for sharing contrarian opinions and sparking dialogue',
  'Tool recommendations and tech stack discussions relevant to the niche',
  'Accountability pairings and group check-ins for goal tracking',
  'Scheduled content drops from experts, leaders, and guest contributors',
];

const rulesPool = [
  'Lead with value: every post should teach, inspire, or spark a meaningful conversation',
  'No self-promotion without context — share what you learned, not just what you sell',
  'Respectful disagreement encouraged; personal attacks result in immediate removal',
  'Use thread replies to keep conversations organized and easy to follow',
  'Tag your posts with relevant categories so members can filter content',
  'Share your failures alongside your wins — vulnerability builds trust',
  'Give before you ask: contribute 3 valuable replies before posting your own question',
  'No DM spam — unsolicited pitches to members will result in a ban',
  'Weekly participation minimum: engage at least once per week to maintain active status',
  'Credit original creators when sharing external content or resources',
  'Constructive feedback only — critique the idea, never the person',
  'Keep introductions genuine: share your story, not your resume',
];

const cadencePool = [
  'Daily discussion prompt at 9 AM + weekly deep-dive on Thursdays',
  '3x/week curated resource drops + monthly expert spotlight',
  'Daily micro-challenge + bi-weekly live Q&A session',
  'Weekly roundup newsletter + daily community highlight',
  'Mon/Wed/Fri themed content days + monthly masterclass',
  'Daily open thread + weekly case study breakdown',
  'Twice daily engagement prompts + weekly member spotlight',
  'Weekly themed days (Motivation Monday, Tutorial Tuesday, etc.)',
  'Daily quick-tip drops + monthly community retrospective',
  'Bi-weekly structured debates + weekly resource compilations',
  'Daily accountability check-ins + monthly goal-setting sessions',
  'Weekly challenge drops + quarterly community summits',
];

const moderationTipsPool = [
  'Assign a dedicated welcome committee of 3-5 active members to greet newcomers within 2 hours',
  'Use bot automation to flag posts with zero replies after 24 hours for moderator attention',
  'Rotate moderator spotlight weekly to prevent burnout and distribute community ownership',
  'Create a public moderation log so members understand enforcement decisions and feel trust',
  'Implement a 3-strike system with clear escalation: warning, mute, removal',
  'Schedule daily moderator check-ins at peak activity hours for your timezone mix',
  'Use reaction-based triage: moderators prioritize posts with the most emoji reactions',
  'Build a moderation playbook document so all mods enforce rules consistently',
  'Empower top contributors with limited mod powers to handle simple issues quickly',
  'Run monthly moderator retros to discuss what is working and what needs adjustment',
  'Set up auto-moderation for spam keywords while keeping human review for edge cases',
  'Create a private mod channel for real-time coordination during high-activity events',
];

const ritualsPool = [
  'Monday Momentum', 'Win Wednesday', 'Feedback Friday', 'Sunday Spotlight',
  'AMA Hour', 'Challenge Drop', 'Resource Roundup', 'Hot Seat Session',
  'Accountability Circle', 'Show & Tell', 'Expert Office Hours', 'Community Retro',
  'Newcomer Welcome Wave', 'Monthly Mastermind', 'Tool Tuesday', 'Story Time Saturday',
  'Goal Check-In', 'Debate Club', 'Pair Programming Hour', 'Creative Jam',
];

const ritualDescriptionsPool = [
  'Members share their biggest win from the past week and what they learned from it',
  'A randomly selected member gets 15 minutes of focused community feedback on their challenge',
  'Guest expert answers live questions in a time-boxed, high-energy session',
  'Members post work-in-progress for constructive peer review and encouragement',
  'Weekly challenge with clear deliverables, accountability partners, and recognition',
  'Curated list of the best resources, tools, and links shared during the week',
  'Members pair up for 30-minute focused work sessions with check-ins',
  'Community-wide retrospective on what content resonated most and what to do next',
  'New member introduction thread with structured prompts to spark connections',
  'Small-group deep-dive sessions on advanced topics with rotating facilitators',
  'Members share their favorite tools with quick demos or screenshots',
  'Storytelling session where members share their journey, pivots, and lessons',
  'Goal-setting ritual where members declare weekly intentions and review progress',
  'Structured debate on a polarizing topic with moderated discussion rules',
  'Collaborative creation session where the community builds something together live',
];

const journeyStagesPool = [
  'Newcomer', 'Explorer', 'Contributor', 'Regular', 'Champion', 'Ambassador',
  'Mentor', 'Leader', 'Founding Member', 'VIP', 'Alumni', 'Lurker-to-Participant',
];

const journeyTriggersPool = [
  'Joins the community for the first time and lands on the welcome channel',
  'Completes their profile and introduces themselves to the group',
  'Makes their first meaningful reply or comment on another member post',
  'Participates in their first weekly challenge or event',
  'Receives their first reply or reaction from another member',
  'Achieves their first community milestone (7-day streak, 10 posts, etc.)',
  'Gets tagged or mentioned by another member in a discussion',
  'Shares their first original resource, tip, or piece of content',
  'Reaches 30 days of active membership with consistent engagement',
  'Receives a moderator shoutout or community spotlight feature',
  'Invites their first friend or colleague to join the community',
  'Completes an advanced challenge or earns a special badge',
];

const journeyActionsPool = [
  'Send personalized welcome DM with quick-start guide and key channels to follow',
  'Trigger automated onboarding sequence with daily tips for the first 7 days',
  'Assign an accountability buddy from the existing active member pool',
  'Unlock access to exclusive channel or resource after first contribution milestone',
  'Feature their introduction post in the weekly community highlight newsletter',
  'Invite to a small-group onboarding call with community manager and 5-8 peers',
  'Grant contributor badge and unlock ability to create polls and events',
  'Send milestone celebration message with personalized stats and encouragement',
  'Offer moderator or ambassador role application after consistent engagement',
  'Provide VIP access to early product features, beta testing, or exclusive content',
  'Connect with a mentor for 1-on-1 guidance on their specific goals',
  'Invite to leadership council or advisory group for community direction input',
];

const growthTacticsPool = [
  'Partner cross-promotion', 'SEO content funnel', 'Referral program launch',
  'Social proof campaign', 'Influencer seeding', 'Content repurposing engine',
  'Podcast guest circuit', 'Free workshop series', 'Challenge-based viral loop',
  'Community-led content creation', 'Strategic Twitter/X threads', 'LinkedIn thought leadership',
  'Product Hunt community launch', 'Newsletter swap partnerships', 'Event co-hosting',
  'Reddit value-first strategy', 'YouTube community building', 'Waitlist exclusivity play',
];

const growthChannelsPool = [
  'Organic social media', 'Email marketing', 'Partner networks', 'Paid ads (targeted)',
  'Content marketing / SEO', 'Influencer partnerships', 'Referral / word-of-mouth',
  'Event marketing', 'Product integration', 'Community directories', 'Podcast appearances',
  'Cross-community partnerships', 'PR and media coverage', 'Webinar funnels',
];

const pillarNamesPool = [
  'Industry Insights', 'Member Spotlights', 'How-To Guides', 'Trend Analysis',
  'Behind the Scenes', 'Tool Reviews', 'Case Studies', 'Expert Interviews',
  'Data Deep Dives', 'Community Challenges', 'Quick Tips', 'Debate Topics',
  'Resource Roundups', 'Success Stories', 'Failure Post-Mortems', 'Future Predictions',
];

const pillarFormatsPool = [
  'Long-form posts, carousel breakdowns, video walkthroughs',
  'Short text posts, quote cards, podcast clips',
  'Infographics, data visualizations, comparison tables',
  'Live sessions, recorded tutorials, screen shares',
  'Discussion threads, polls, debate prompts',
  'Templates, checklists, downloadable guides',
  'Interview clips, Q&A summaries, expert panels',
  'Weekly newsletters, curated link roundups, digest emails',
  'Photo stories, behind-the-scenes videos, day-in-the-life',
  'Challenge prompts, leaderboards, badge unlocks',
  'Micro-content, tweet threads, story sequences',
  'Case study writeups, before/after showcases, metric breakdowns',
];

const retentionTriggersPool = [
  'Member inactive for 7+ days', 'Engagement rate drops below personal average',
  'Member completes their first 30 days', 'Negative sentiment detected in posts',
  'Member reaches 100th contribution', 'First-time event attendance',
  'Member referred 3+ new members', 'Content gets zero engagement after 48 hours',
  'Member anniversary date approaching', 'Sudden spike in member departures',
  'New feature launch or community update', 'Seasonal engagement dip detected',
];

const retentionActionsPool = [
  'Send personalized re-engagement message highlighting what they missed',
  'Offer exclusive access to a new channel, resource, or upcoming event',
  'Pair with an active accountability buddy for weekly check-ins',
  'Feature their past contributions in a throwback spotlight post',
  'Invite to a small-group call with the community manager for direct feedback',
  'Send a surprise gift, badge, or recognition for their milestone',
  'Create a personalized content recommendation based on their interests',
  'Launch a targeted re-engagement challenge with incentives to return',
  'Schedule a 1-on-1 check-in to understand blockers and gather feedback',
  'Grant early access to upcoming features or community initiatives',
  'Send a community impact report showing their contribution stats',
  'Offer a free month of premium membership or upgraded access tier',
];

const communityHooksPool = [
  'The loneliest entrepreneurs build the biggest empires — unless they find their tribe first.',
  'Your next breakthrough idea is one conversation away. The right community makes it inevitable.',
  'Stop consuming content alone. Start building alongside people who get it.',
  'The brands winning in 2026 are not just building audiences — they are building movements.',
  'Every thriving business has a hidden advantage: a community that sells for them.',
  'You do not need 10,000 followers. You need 100 true believers in the same room.',
  'The difference between a brand and a commodity? A community that would riot if you disappeared.',
  'Your competitors are building products. You should be building a home for your people.',
  'The fastest path to product-market fit? A community that tells you exactly what they need.',
  'In a world of algorithms, community is the only growth channel you truly own.',
  'The best marketing does not feel like marketing — it feels like belonging.',
  'Forget virality. Build a space so valuable that members recruit for you.',
];

const engagementCTAsPool = [
  'Start your community blueprint today and turn strangers into your strongest brand advocates.',
  'Launch your first community ritual this week — your most engaged members are waiting to be activated.',
  'Take this blueprint and build the space your audience has been searching for.',
  'Your community is one conversation away from critical mass. Start the first one today.',
  'Download this strategy, pick your platform, and open the doors to your micro-community.',
  'The best time to build community was yesterday. The second best time is right now.',
  'Stop waiting for the perfect moment — your first 50 members are already out there.',
  'Share this blueprint with your team and align on your community launch plan this week.',
  'Your community playbook is ready. The only missing piece is your first welcome message.',
  'Turn this blueprint into action: set up your first channel and post your founding story today.',
];

function generateCommunityBlueprint(
  platform: string,
  sizeGoal: string,
  industry: string,
  monetization: string,
  engagement: string,
  goal: string,
  vision: string
): CommunityResult {
  const seed = hash(platform + sizeGoal + industry + monetization + engagement + goal + vision.slice(0, 30));

  const sizeMultiplier = sizeGoal.includes('Seed') ? 0.3 : sizeGoal.includes('Early') ? 0.45 :
    sizeGoal.includes('Growing') ? 0.6 : sizeGoal.includes('Established') ? 0.72 :
    sizeGoal.includes('Thriving') ? 0.82 : 0.9;

  const engagementBoost = engagement === 'Challenges & Gamification' ? 12 : engagement === 'Co-Creation' ? 10 :
    engagement === 'Expert AMAs' ? 8 : engagement === 'Peer Support' ? 9 :
    engagement === 'Discussion-Heavy' ? 7 : engagement === 'Learning Cohorts' ? 11 : 5;

  const healthScore = Math.min(98, Math.round(40 + sizeMultiplier * 35 + engagementBoost + (seed % 15)));
  const projectedMAR = Math.min(85, Math.max(15, Math.round(sizeMultiplier * 55 + engagementBoost + (seed % 18))));

  const blueprint: BlueprintItem[] = Array.from({ length: 6 }, (_, i) => ({
    channel: pick(channelNamesPool, seed, i * 3),
    purpose: pick(channelPurposesPool, seed, i * 5 + 1),
    rules: pick(rulesPool, seed, i * 4 + 2),
    contentCadence: pick(cadencePool, seed, i * 3 + 7),
    moderationTip: pick(moderationTipsPool, seed, i * 2 + 3),
  }));

  const engagementRituals: EngagementRitual[] = Array.from({ length: 7 }, (_, i) => {
    const frequencies = ['Daily', 'Weekly', 'Bi-weekly', 'Monthly', 'Quarterly'];
    const participations = ['15-25% of active members', '30-45% of active members', '50-65% of active members', '10-20% of active members', '60-80% of active members'];
    const impacts = ['High — drives daily habit formation', 'Medium — builds weekly engagement rhythm', 'Very High — creates viral sharing loops', 'Medium — deepens member relationships', 'High — generates user-created content'];
    return {
      ritual: pick(ritualsPool, seed, i * 4),
      frequency: pick(frequencies, seed, i * 3 + 1),
      description: pick(ritualDescriptionsPool, seed, i * 5 + 2),
      expectedParticipation: pick(participations, seed, i * 2 + 4),
      growthImpact: pick(impacts, seed, i * 3 + 5),
    };
  });

  const memberJourney: MemberJourneyStep[] = Array.from({ length: 5 }, (_, i) => {
    const milestones = ['First introduction posted', 'First reply received from a peer', '7-day engagement streak achieved', 'First community challenge completed', 'Contributor badge earned',
      '30-day active member status', 'First resource shared', 'Mentor role unlocked', 'Ambassador nomination received', 'Community leader recognized'];
    const contents = ['Welcome guide + quick-start video', 'Personalized resource recommendations', 'Challenge invitation + buddy pairing',
      'Milestone celebration + badge unlock', 'Leadership opportunity + exclusive access', 'Onboarding email sequence', 'Curated content feed based on interests',
      'Advanced masterclass invitation', 'VIP channel access + early feature preview', 'Community impact report + recognition'];
    return {
      stage: pick(journeyStagesPool, seed, i * 2),
      trigger: pick(journeyTriggersPool, seed, i * 3 + 1),
      action: pick(journeyActionsPool, seed, i * 4 + 2),
      content: pick(contents, seed, i * 2 + 5),
      milestone: pick(milestones, seed, i * 3 + 3),
    };
  });

  const growthTactics: GrowthTactic[] = Array.from({ length: 6 }, (_, i) => {
    const timelines = ['Week 1-2', 'Week 2-4', 'Month 1-2', 'Month 2-3', 'Month 3-6', 'Ongoing'];
    const growths = ['+15-25 members/week', '+30-50 members/month', '+50-100 members/month', '+8-15 members/week', '+100-200 members/quarter', '+20-40 members/week'];
    const costs = ['$0 (time investment only)', '$50-200/month', '$200-500/month', '$0 (sweat equity)', '$100-300/month', '$500-1000/month'];
    return {
      tactic: pick(growthTacticsPool, seed, i * 3),
      channel: pick(growthChannelsPool, seed, i * 4 + 1),
      timeline: pick(timelines, seed, i * 2 + 3),
      expectedGrowth: pick(growths, seed, i * 5 + 2),
      cost: pick(costs, seed, i * 3 + 4),
    };
  });

  const contentPillars: ContentPillar[] = Array.from({ length: 5 }, (_, i) => {
    const frequencies = ['3x per week', 'Daily', '2x per week', 'Weekly', 'Bi-weekly', 'Monthly'];
    const owners = ['Community Manager', 'Guest Expert', 'Member-Generated', 'Founding Team', 'Moderator Team', 'Rotating Members'];
    return {
      pillar: pick(pillarNamesPool, seed, i * 4),
      description: `Core content theme for ${industry.toLowerCase()} community focused on ${pick(['education', 'inspiration', 'practical application', 'industry trends', 'peer learning'], seed, i * 2)}`,
      formats: pick(pillarFormatsPool, seed, i * 3 + 1),
      frequency: pick(frequencies, seed, i * 5 + 2),
      ownerRole: pick(owners, seed, i * 2 + 3),
    };
  });

  const retentionStrategies: RetentionStrategy[] = Array.from({ length: 5 }, (_, i) => {
    const impacts = ['+25% reactivation rate', '+40% monthly retention', '+15% engagement uplift', '+30% event attendance', '+20% content contribution'];
    const measurements = ['7-day return rate after intervention', 'Monthly active rate trend over 90 days', 'Weekly engagement score delta', 'Post-intervention NPS survey', 'Before/after contribution frequency'];
    const strategies = ['Re-engagement Sequence', 'Milestone Celebration', 'Buddy System Activation', 'Personalized Content Feed', 'Exclusive Access Unlock',
      'Community Impact Report', 'Surprise & Delight Drops', 'Feedback Loop Closure', 'Role Elevation Offer', 'Anniversary Recognition'];
    return {
      strategy: pick(strategies, seed, i * 3),
      trigger: pick(retentionTriggersPool, seed, i * 4 + 1),
      action: pick(retentionActionsPool, seed, i * 2 + 5),
      expectedImpact: pick(impacts, seed, i * 3 + 2),
      measurement: pick(measurements, seed, i * 5 + 3),
    };
  });

  const communityHook = pick(communityHooksPool, seed, 0);
  const engagementCTA = pick(engagementCTAsPool, seed, 3);

  return {
    healthScore,
    projectedMAR,
    blueprint,
    engagementRituals,
    memberJourney,
    growthTactics,
    contentPillars,
    retentionStrategies,
    communityHook,
    engagementCTA,
  };
}

export default function MicroCommunityPage() {
  const [platform, setPlatform] = useState<string>(communityPlatforms[0]);
  const [sizeGoal, setSizeGoal] = useState<string>(communitySizes[1]);
  const [industry, setIndustry] = useState<string>(industries[0]);
  const [monetization, setMonetization] = useState<string>(monetizationModels[0]);
  const [engagement, setEngagement] = useState<string>(engagementStyles[0]);
  const [goal, setGoal] = useState<string>(communityGoals[0]);
  const [vision, setVision] = useState('');
  const [result, setResult] = useState<CommunityResult | null>(null);
  const [activeTab, setActiveTab] = useState<'blueprint' | 'rituals' | 'journey' | 'growth' | 'pillars' | 'retention'>('blueprint');

  const handleGenerate = () => {
    setResult(generateCommunityBlueprint(platform, sizeGoal, industry, monetization, engagement, goal, vision));
  };

  const getScoreColor = (score: number) =>
    score >= 75 ? 'text-green-400' : score >= 50 ? 'text-yellow-400' : score >= 30 ? 'text-orange-400' : 'text-red-400';

  const getScoreBg = (score: number) =>
    score >= 75 ? 'bg-green-900/40 border-green-700/50' : score >= 50 ? 'bg-yellow-900/40 border-yellow-700/50' :
    score >= 30 ? 'bg-orange-900/40 border-orange-700/50' : 'bg-red-900/40 border-red-700/50';

  const getScoreLabel = (score: number) =>
    score >= 75 ? 'Thriving' : score >= 50 ? 'Growing' : score >= 30 ? 'Emerging' : 'At Risk';

  const tabs = [
    { key: 'blueprint' as const, label: 'Community Blueprint' },
    { key: 'rituals' as const, label: 'Engagement Rituals' },
    { key: 'journey' as const, label: 'Member Journey' },
    { key: 'growth' as const, label: 'Growth Tactics' },
    { key: 'pillars' as const, label: 'Content Pillars' },
    { key: 'retention' as const, label: 'Retention' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <nav className="text-sm text-gray-400 mb-8">
          <a href="/" className="hover:text-white">Home</a> → <span className="text-white">Micro-Community Builder</span>
        </nav>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          Micro-Community Builder
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl">
          Build and manage small, highly-engaged niche communities around specific topics or use cases. Generate complete community blueprints with engagement strategies, member journeys, and growth playbooks.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Community Platform</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm"
                >
                  {communityPlatforms.map((p) => (<option key={p} value={p}>{p}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Community Size Goal</label>
                <select
                  value={sizeGoal}
                  onChange={(e) => setSizeGoal(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm"
                >
                  {communitySizes.map((s) => (<option key={s} value={s}>{s}</option>))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Industry</label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm"
                >
                  {industries.map((ind) => (<option key={ind} value={ind}>{ind}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Monetization Model</label>
                <select
                  value={monetization}
                  onChange={(e) => setMonetization(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm"
                >
                  {monetizationModels.map((m) => (<option key={m} value={m}>{m}</option>))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Engagement Style</label>
                <select
                  value={engagement}
                  onChange={(e) => setEngagement(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm"
                >
                  {engagementStyles.map((es) => (<option key={es} value={es}>{es}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Community Goal</label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm"
                >
                  {communityGoals.map((cg) => (<option key={cg} value={cg}>{cg}</option>))}
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Community Vision</label>
              <textarea
                value={vision}
                onChange={(e) => setVision(e.target.value)}
                placeholder="Describe the community you want to build (e.g., 'A private Discord for SaaS founders sharing growth tactics, celebrating wins, and holding each other accountable on revenue goals')"
                rows={7}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          className="btn-primary w-full md:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold text-lg hover:from-purple-500 hover:to-blue-500 transition-all"
        >
          Build Community Blueprint
        </button>

        {result && (
          <div className="mt-12">
            {/* Health Score Header */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className={`rounded-2xl border p-6 text-center ${getScoreBg(result.healthScore)}`}>
                <div className="text-sm text-gray-400 mb-1">Community Health Score</div>
                <div className={`text-5xl font-bold ${getScoreColor(result.healthScore)}`}>{result.healthScore}</div>
                <div className={`text-sm mt-1 ${getScoreColor(result.healthScore)}`}>{getScoreLabel(result.healthScore)}</div>
              </div>
              <div className="bg-zinc-800/50 rounded-2xl border border-zinc-700 p-6 text-center">
                <div className="text-sm text-gray-400 mb-1">Projected Monthly Active Rate</div>
                <div className="text-5xl font-bold text-blue-400">{result.projectedMAR}%</div>
                <div className="text-sm mt-1 text-gray-400">of total members</div>
              </div>
              <div className="bg-zinc-800/50 rounded-2xl border border-zinc-700 p-6">
                <div className="text-sm text-gray-400 mb-2">Community Hook</div>
                <p className="text-sm text-purple-300 italic leading-relaxed">&ldquo;{result.communityHook}&rdquo;</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.key
                      ? 'bg-purple-600 text-white'
                      : 'bg-zinc-800 text-gray-400 hover:text-white hover:bg-zinc-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Blueprint Tab */}
            {activeTab === 'blueprint' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Community Blueprint</h2>
                {result.blueprint.map((item, i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-2xl border border-zinc-700 p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-purple-600/30 text-purple-300 px-3 py-1 rounded-full text-sm font-mono">{item.channel}</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Purpose:</span>
                        <p className="text-gray-200 mt-1">{item.purpose}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Key Rule:</span>
                        <p className="text-gray-200 mt-1">{item.rules}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Content Cadence:</span>
                        <p className="text-gray-200 mt-1">{item.contentCadence}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Moderation Tip:</span>
                        <p className="text-gray-200 mt-1">{item.moderationTip}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Rituals Tab */}
            {activeTab === 'rituals' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Engagement Rituals</h2>
                {result.engagementRituals.map((ritual, i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-2xl border border-zinc-700 p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-white">{ritual.ritual}</h3>
                      <span className="bg-blue-900/40 text-blue-300 px-3 py-1 rounded-full text-xs">{ritual.frequency}</span>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{ritual.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Expected Participation:</span>
                        <p className="text-green-400 mt-1">{ritual.expectedParticipation}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Growth Impact:</span>
                        <p className="text-purple-400 mt-1">{ritual.growthImpact}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Journey Tab */}
            {activeTab === 'journey' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Member Journey Map</h2>
                {result.memberJourney.map((step, i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-2xl border border-zinc-700 p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                      <h3 className="text-lg font-semibold text-white">{step.stage}</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Trigger:</span>
                        <p className="text-gray-200 mt-1">{step.trigger}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Action:</span>
                        <p className="text-gray-200 mt-1">{step.action}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Content:</span>
                        <p className="text-blue-300 mt-1">{step.content}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Milestone:</span>
                        <p className="text-green-300 mt-1">{step.milestone}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Growth Tab */}
            {activeTab === 'growth' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Growth Tactics</h2>
                {result.growthTactics.map((tactic, i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-2xl border border-zinc-700 p-6">
                    <h3 className="text-lg font-semibold text-white mb-3">{tactic.tactic}</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Channel:</span>
                        <p className="text-gray-200 mt-1">{tactic.channel}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Timeline:</span>
                        <p className="text-blue-300 mt-1">{tactic.timeline}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Expected Growth:</span>
                        <p className="text-green-400 mt-1">{tactic.expectedGrowth}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Cost:</span>
                        <p className="text-yellow-300 mt-1">{tactic.cost}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pillars Tab */}
            {activeTab === 'pillars' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Content Pillars</h2>
                {result.contentPillars.map((pillar, i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-2xl border border-zinc-700 p-6">
                    <h3 className="text-lg font-semibold text-white mb-2">{pillar.pillar}</h3>
                    <p className="text-gray-300 text-sm mb-3">{pillar.description}</p>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Formats:</span>
                        <p className="text-gray-200 mt-1">{pillar.formats}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Frequency:</span>
                        <p className="text-blue-300 mt-1">{pillar.frequency}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Owner:</span>
                        <p className="text-purple-300 mt-1">{pillar.ownerRole}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Retention Tab */}
            {activeTab === 'retention' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Retention Strategies</h2>
                {result.retentionStrategies.map((strategy, i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-2xl border border-zinc-700 p-6">
                    <h3 className="text-lg font-semibold text-white mb-3">{strategy.strategy}</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Trigger:</span>
                        <p className="text-gray-200 mt-1">{strategy.trigger}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Action:</span>
                        <p className="text-gray-200 mt-1">{strategy.action}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Expected Impact:</span>
                        <p className="text-green-400 mt-1">{strategy.expectedImpact}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Measurement:</span>
                        <p className="text-blue-300 mt-1">{strategy.measurement}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Engagement CTA */}
            <div className="mt-8 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl border border-purple-700/30 p-6 text-center">
              <p className="text-lg text-gray-200">{result.engagementCTA}</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
