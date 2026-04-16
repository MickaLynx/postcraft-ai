'use client';
import { useState } from 'react';

const appTypes = ['SaaS/Web App', 'Mobile App', 'E-commerce', 'Marketplace', 'Community/Forum', 'Newsletter/Media', 'Content Platform', 'Productivity Tool'] as const;
const stages = ['Pre-launch (0 users)', 'Early (1-100 users)', 'Growing (100-1K users)', 'Scaling (1K-10K users)', 'Mature (10K+ users)'] as const;
const churnReasons = ['Users don\'t understand value', 'Onboarding too complex', 'Price sensitivity', 'Competitor switching', 'Feature gaps', 'Poor UX/performance', 'Lack of engagement hooks', 'No community/support'] as const;
const verticals = ['Social Media', 'Health/Fitness', 'Finance', 'Education', 'Productivity', 'Gaming', 'Travel', 'Food/Delivery', 'Developer Tools', 'Creative Tools'] as const;

interface RetentionResult {
  retentionCurve: { day: string; target: string; action: string }[];
  onboardingFlow: { step: string; goal: string; metric: string }[];
  engagementLoops: { loop: string; trigger: string; action: string; reward: string; frequency: string }[];
  reEngagement: { channel: string; timing: string; message: string; expectedLift: string }[];
  cohortActions: { cohort: string; strategy: string; kpi: string }[];
  notificationStrategy: { type: string; timing: string; content: string; frequency: string }[];
  churnPrevention: string[];
  gamification: string[];
  metrics: { metric: string; target: string; formula: string }[];
  quickWins: string[];
}

function generateRetentionPlaybook(appType: string, stage: string, churn: string, vertical: string, productName: string): RetentionResult {
  const name = productName || 'YourApp';

  return {
    retentionCurve: [
      { day: 'Day 0', target: '100%', action: `Seamless signup → immediate value (< 2 min to "${name} moment")` },
      { day: 'Day 1', target: '> 40%', action: 'Welcome email/push with 1 clear action. Show progress indicator.' },
      { day: 'Day 3', target: '> 25%', action: `"Did you try [key feature]?" notification. Social proof: "X users did this today"` },
      { day: 'Day 7', target: '> 20%', action: `Weekly digest email with personalized insights. Re-engagement push if inactive.` },
      { day: 'Day 14', target: '> 15%', action: `Feature discovery nudge. "You haven't tried [advanced feature] yet"` },
      { day: 'Day 30', target: '> 10%', action: `Monthly recap: "Here's what you accomplished with ${name} this month"` },
      { day: 'Day 60', target: '> 8%', action: 'Loyalty reward or upgrade offer. Community invitation.' },
      { day: 'Day 90', target: '> 7%', action: `Power user path: "Become a ${name} expert" badge/certification` },
    ],
    onboardingFlow: [
      { step: '1. Welcome Screen', goal: 'Set expectations + collect intent', metric: 'Completion rate > 95%' },
      { step: '2. Quick Win (30 sec)', goal: `Show ${name}'s core value immediately`, metric: 'Time to first value < 60s' },
      { step: '3. Personalization', goal: 'Ask 2-3 questions to customize experience', metric: 'Personalization rate > 80%' },
      { step: '4. Core Action', goal: `Guide user to complete THE key action`, metric: 'Activation rate > 60%' },
      { step: '5. Social Hook', goal: 'Connect with friends/team or share first result', metric: 'Social connection > 20%' },
      { step: '6. Notification Opt-in', goal: 'Ask for push/email permission with clear value prop', metric: 'Opt-in > 50%' },
    ],
    engagementLoops: [
      { loop: 'Content Loop', trigger: 'New content available', action: `Open ${name}, consume content`, reward: 'Personalized recommendations improve', frequency: 'Daily' },
      { loop: 'Creation Loop', trigger: 'Inspiration or need', action: `Create something with ${name}`, reward: 'Social validation (likes, shares, saves)', frequency: '2-3x/week' },
      { loop: 'Progress Loop', trigger: 'Streak or goal reminder', action: 'Complete daily task/check-in', reward: 'Streak badge, progress visualization', frequency: 'Daily' },
      { loop: 'Social Loop', trigger: 'Friend activity notification', action: 'View and respond to friend activity', reward: 'Social connection, FOMO reduction', frequency: 'Daily' },
      { loop: 'Discovery Loop', trigger: 'Weekly "What\'s New" digest', action: 'Explore new features or content', reward: 'Novelty, learning, mastery feeling', frequency: 'Weekly' },
    ],
    reEngagement: [
      { channel: 'Push Notification', timing: 'Day 1 after inactivity', message: `"${name} misses you! Your [streak/project] is waiting"`, expectedLift: '+15-25% DAU recovery' },
      { channel: 'Email', timing: 'Day 3 after inactivity', message: `"Here's what you missed on ${name} this week" + personalized content`, expectedLift: '+8-12% reactivation' },
      { channel: 'In-App Message', timing: 'On return after 3+ day absence', message: '"Welcome back! Here\'s what changed while you were away"', expectedLift: '+20% session depth' },
      { channel: 'SMS (if opted in)', timing: 'Day 7 after inactivity', message: `"Quick: your ${vertical.toLowerCase()} goal is 80% done. Finish it now?"`, expectedLift: '+5-10% reactivation' },
      { channel: 'Retargeting Ads', timing: 'Day 7-30 of inactivity', message: `"Come back to ${name} — here's what 10,000 users created this week"`, expectedLift: '+3-5% reactivation' },
      { channel: 'Personal Outreach', timing: 'Day 14 (high-value users only)', message: `Founder email: "Hey [Name], I noticed you haven't been active..."`, expectedLift: '+15-30% for high-LTV users' },
    ],
    cohortActions: [
      { cohort: 'New Users (Day 0-7)', strategy: 'Focus on activation: guide to "aha moment" in first session', kpi: 'Day 1 retention > 40%' },
      { cohort: 'Activated (completed key action)', strategy: 'Deepen engagement: introduce second and third features', kpi: 'Day 7 retention > 25%' },
      { cohort: 'Habitual (3+ sessions/week)', strategy: 'Expand: introduce premium features, community, sharing', kpi: 'Day 30 retention > 15%' },
      { cohort: 'Power Users (daily active)', strategy: 'Monetize & advocate: premium upsell, referral program, testimonials', kpi: 'NPS > 50, referral rate > 10%' },
      { cohort: 'At-Risk (declining usage)', strategy: 'Re-engage: personalized nudges, "we miss you" campaign, feature education', kpi: 'Reactivation rate > 15%' },
      { cohort: 'Churned (30+ days inactive)', strategy: 'Win-back: major update announcement, special offer, "here\'s what changed"', kpi: 'Win-back rate > 5%' },
    ],
    notificationStrategy: [
      { type: 'Transactional', timing: 'Immediate', content: 'Action confirmations, receipts, security alerts', frequency: 'As needed' },
      { type: 'Progress', timing: 'Daily at user\'s active time', content: `"You're 3 days into your streak!" or "2 ${vertical.toLowerCase()} tasks left today"`, frequency: 'Daily max' },
      { type: 'Social', timing: 'Within 30 min of event', content: '"[Friend] just [action] — check it out"', frequency: '2-3x/day max' },
      { type: 'Discovery', timing: 'Weekly (Tue/Wed morning)', content: `"New in ${name}: [feature/content]"`, frequency: 'Weekly' },
      { type: 'Re-engagement', timing: 'After 24h inactivity', content: `"Your ${vertical.toLowerCase()} update is ready"`, frequency: '1x per inactive period' },
      { type: 'Win-back', timing: 'After 7d inactivity', content: '"We\'ve made things better — come see"', frequency: '1x then stop' },
    ],
    churnPrevention: [
      `Identify "red flag" behaviors: users who don't complete onboarding, skip 3+ days, or never use core feature`,
      'Implement "save" moments: when user clicks cancel, show personalized usage stats + offer alternatives',
      'Cancellation flow: pause option (1 month free) before cancel — saves 20-30% of churners',
      'Exit survey: max 3 questions, feed directly into product roadmap',
      'Downgrade option: "Keep access to basic features for $5/mo" instead of full cancel',
      'Annual plan promotion: annual users churn 50-70% less than monthly users',
      `Build switching costs gradually: more data, customization, and integrations = harder to leave ${name}`,
    ],
    gamification: [
      `Streaks: "${vertical} streak — 7 days and counting!" (Duolingo-style, proven to lift D7 retention 30%)`,
      'Progress bars: show completion toward next level/milestone (endowed progress effect)',
      'Achievements/badges: "First Post", "7-Day Streak", "Power User", "Community Helper"',
      `Leaderboards: "Top ${vertical.toLowerCase()} creators this week" (competitive users engage 2.5x more)`,
      'Points/Credits: earn through usage, spend on premium features (hybrid monetization)',
      'Challenges: "Complete 5 [actions] this week for a bonus" (weekly engagement driver)',
    ],
    metrics: [
      { metric: 'Day 1 Retention', target: '> 40%', formula: 'Users active on D1 / Users who signed up on D0' },
      { metric: 'Day 7 Retention', target: '> 20%', formula: 'Users active on D7 / Users who signed up on D0' },
      { metric: 'Day 30 Retention', target: '> 10%', formula: 'Users active on D30 / Users who signed up on D0' },
      { metric: 'Activation Rate', target: '> 60%', formula: 'Users who complete key action / Total signups' },
      { metric: 'Stickiness (DAU/MAU)', target: '> 20%', formula: 'Daily Active Users / Monthly Active Users' },
      { metric: 'Churn Rate', target: '< 5%/month', formula: 'Users lost this month / Users at start of month' },
      { metric: 'Net Revenue Retention', target: '> 110%', formula: '(Starting MRR + Expansion - Contraction - Churn) / Starting MRR' },
      { metric: 'Time to Value', target: '< 5 min', formula: 'Time from signup to first meaningful action' },
    ],
    quickWins: [
      `Add progress indicator to onboarding (increases completion 20%+)`,
      'Send "What you missed" email to Day 3 inactive users (free, high impact)',
      'Add streak counter to home screen (Duolingo effect — 30% D7 lift)',
      'Implement "welcome back" screen for returning users after 3+ day absence',
      'Add social proof to key screens: "X people are using this right now"',
      'Reduce time to first value: audit signup flow, remove every unnecessary step',
      'Add in-app feedback widget: "How can we improve?" (reduces passive churn)',
      'Implement pause subscription option before cancel (saves 20-30%)',
    ],
  };
}

export default function RetentionPlaybookPage() {
  const [appType, setAppType] = useState<string>(appTypes[0]);
  const [stage, setStage] = useState<string>(stages[2]);
  const [churn, setChurn] = useState<string>(churnReasons[0]);
  const [vertical, setVertical] = useState<string>(verticals[0]);
  const [productName, setProductName] = useState('');
  const [result, setResult] = useState<RetentionResult | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Retention Playbook Generator</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Generate a complete user retention strategy with onboarding flows, engagement loops, re-engagement campaigns, churn prevention, and gamification tactics.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">App/Product Type</label>
              <select value={appType} onChange={e => setAppType(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                {appTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Growth Stage</label>
              <select value={stage} onChange={e => setStage(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                {stages.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Primary Churn Reason</label>
              <select value={churn} onChange={e => setChurn(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                {churnReasons.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Industry/Vertical</label>
              <select value={vertical} onChange={e => setVertical(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                {verticals.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
              <input type="text" value={productName} onChange={e => setProductName(e.target.value)} placeholder="e.g. PostCraft, SunSpots..." className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
            </div>
          </div>
          <button onClick={() => setResult(generateRetentionPlaybook(appType, stage, churn, vertical, productName))} className="w-full py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl">Generate Retention Playbook</button>
        </div>

        {result && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Retention Curve Targets</h2>
              <div className="space-y-3">
                {result.retentionCurve.map((r, i) => (
                  <div key={i} className="flex items-start gap-4 border border-gray-100 rounded-xl p-4">
                    <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-lg text-sm font-bold whitespace-nowrap">{r.day}</span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-mono">{r.target}</span>
                    <span className="text-gray-700 text-sm">{r.action}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Onboarding Flow</h2>
              <div className="space-y-3">{result.onboardingFlow.map((s, i) => (
                <div key={i} className="grid grid-cols-3 gap-4 border border-gray-100 rounded-xl p-4">
                  <div><span className="text-xs font-semibold text-gray-500">STEP</span><p className="text-gray-900 text-sm font-medium mt-1">{s.step}</p></div>
                  <div><span className="text-xs font-semibold text-gray-500">GOAL</span><p className="text-gray-700 text-sm mt-1">{s.goal}</p></div>
                  <div><span className="text-xs font-semibold text-gray-500">METRIC</span><p className="text-amber-700 text-sm font-medium mt-1">{s.metric}</p></div>
                </div>
              ))}</div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Engagement Loops</h2>
              <div className="space-y-4">{result.engagementLoops.map((l, i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-5">
                  <h3 className="font-bold text-gray-900">{l.loop}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                    <div><span className="text-xs font-semibold text-gray-500">TRIGGER</span><p className="text-gray-700 text-sm mt-1">{l.trigger}</p></div>
                    <div><span className="text-xs font-semibold text-gray-500">ACTION</span><p className="text-gray-700 text-sm mt-1">{l.action}</p></div>
                    <div><span className="text-xs font-semibold text-gray-500">REWARD</span><p className="text-gray-700 text-sm mt-1">{l.reward}</p></div>
                    <div><span className="text-xs font-semibold text-gray-500">FREQUENCY</span><p className="text-amber-700 text-sm font-medium mt-1">{l.frequency}</p></div>
                  </div>
                </div>
              ))}</div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Re-Engagement Campaigns</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-gray-200"><th className="text-left p-3">Channel</th><th className="text-left p-3">Timing</th><th className="text-left p-3">Message</th><th className="text-left p-3">Expected Lift</th></tr></thead>
                  <tbody>{result.reEngagement.map((r, i) => <tr key={i} className="border-b border-gray-50"><td className="p-3 font-medium">{r.channel}</td><td className="p-3 text-gray-600">{r.timing}</td><td className="p-3 text-gray-700">{r.message}</td><td className="p-3 text-green-700 font-medium">{r.expectedLift}</td></tr>)}</tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Churn Prevention</h2>
                <ul className="space-y-2">{result.churnPrevention.map((c, i) => <li key={i} className="text-gray-700 text-sm flex gap-2"><span className="text-red-500">&#128737;</span>{c}</li>)}</ul>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Gamification Ideas</h2>
                <ul className="space-y-2">{result.gamification.map((g, i) => <li key={i} className="text-gray-700 text-sm flex gap-2"><span className="text-amber-500">&#127942;</span>{g}</li>)}</ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Cohort Strategies</h2>
              <div className="space-y-3">{result.cohortActions.map((c, i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-4 grid grid-cols-3 gap-4">
                  <div><span className="text-xs font-semibold text-gray-500">COHORT</span><p className="text-gray-900 text-sm font-medium mt-1">{c.cohort}</p></div>
                  <div><span className="text-xs font-semibold text-gray-500">STRATEGY</span><p className="text-gray-700 text-sm mt-1">{c.strategy}</p></div>
                  <div><span className="text-xs font-semibold text-gray-500">KPI</span><p className="text-amber-700 text-sm font-medium mt-1">{c.kpi}</p></div>
                </div>
              ))}</div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Key Retention Metrics</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-gray-200"><th className="text-left p-3">Metric</th><th className="text-left p-3">Target</th><th className="text-left p-3">Formula</th></tr></thead>
                  <tbody>{result.metrics.map((m, i) => <tr key={i} className="border-b border-gray-50"><td className="p-3 font-medium">{m.metric}</td><td className="p-3 text-green-700 font-medium">{m.target}</td><td className="p-3 text-gray-600 font-mono text-xs">{m.formula}</td></tr>)}</tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Wins (Implement This Week)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{result.quickWins.map((w, i) => <div key={i} className="bg-amber-50 rounded-xl p-4 text-gray-700 text-sm flex gap-2"><span className="text-amber-600">&#9889;</span>{w}</div>)}</div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
