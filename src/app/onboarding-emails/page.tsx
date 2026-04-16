'use client';
import { useState } from 'react';

const productTypes = ['SaaS/Web App', 'Mobile App', 'E-commerce', 'Newsletter', 'Course/Community', 'Marketplace', 'Agency/Service', 'Developer Tool'] as const;
const sequenceLengths = ['5 emails (7 days)', '7 emails (14 days)', '10 emails (21 days)', '3 emails (3 days — quick)'] as const;
const goals = ['Activate Free Users', 'Convert Trial to Paid', 'Reduce Day-1 Churn', 'Drive Feature Adoption', 'Build Community', 'Upsell to Pro/Team'] as const;
const tones = ['Friendly & Casual', 'Professional & Clean', 'Playful & Fun', 'Data-Driven & Direct', 'Warm & Personal'] as const;

interface EmailSequence {
  emails: { day: string; subject: string; preview: string; body: string; cta: string; goal: string; metric: string }[];
  subjectLineVariants: { original: string; variantA: string; variantB: string }[];
  automationTriggers: { trigger: string; action: string; condition: string }[];
  benchmarks: { metric: string; target: string }[];
  segmentationRules: string[];
  tools: { tool: string; purpose: string; cost: string }[];
  tips: string[];
}

function generateEmailSequence(productType: string, length: string, goal: string, tone: string, productName: string): EmailSequence {
  const name = productName || 'YourProduct';
  const emailCount = parseInt(length) || 7;
  const isCasual = tone.includes('Casual') || tone.includes('Playful');
  const greeting = isCasual ? 'Hey' : 'Hi';

  const fullSequence = [
    { day: 'Day 0 (immediate)', subject: `Welcome to ${name} — here is your first step`, preview: `${greeting} {{firstName}}! Your account is ready...`, body: `${greeting} {{firstName}},\n\nWelcome to ${name}! ${isCasual ? "We're stoked you're here." : "Thank you for joining us."}\n\nHere is the ONE thing to do right now:\n\n[Primary CTA Button: Complete Your First {{action}}]\n\nIt takes less than 60 seconds, and you will immediately see why ${isCasual ? "people are obsessed with" : "teams rely on"} ${name}.\n\n${isCasual ? "Let's go!" : "Looking forward to helping you succeed,"}\n{{senderName}}`, cta: 'Complete Your First [Action]', goal: 'Get user to take first meaningful action', metric: 'CTR > 30%, Activation > 25%' },
    { day: 'Day 1', subject: `Quick win: Try ${name}'s most-loved feature`, preview: `Most users say this is where the magic happens...`, body: `${greeting} {{firstName}},\n\nYou signed up yesterday — ${isCasual ? "nice move!" : "great decision."}\n\nHere is the feature our power users love most:\n\n**[Feature Name]**: [1-sentence description of what it does + benefit]\n\n[Screenshot or GIF showing the feature]\n\nTry it now — it takes 2 minutes:\n\n[CTA Button: Try [Feature Name]]\n\n${isCasual ? "You're going to love this." : "This is where most users have their 'aha' moment."}\n\n{{senderName}}`, cta: 'Try [Feature Name]', goal: 'Feature discovery + second session', metric: 'Open rate > 50%, Feature usage +20%' },
    { day: 'Day 2', subject: `How {{companyName}} grew 300% with ${name}`, preview: `Real results from a team just like yours...`, body: `${greeting} {{firstName}},\n\nI wanted to share a quick story.\n\n**{{companyName}}** was struggling with [problem your product solves]. After switching to ${name}:\n\n- [Metric 1]: +300% improvement\n- [Metric 2]: Saved 10 hours/week\n- [Metric 3]: ROI in first month\n\n"${name} changed how we work. We can not imagine going back." — {{customerName}}, {{role}} at {{companyName}}\n\n[CTA: See How They Did It]\n\nYour results could be next.\n\n{{senderName}}`, cta: 'See How They Did It', goal: 'Social proof + aspiration', metric: 'Open rate > 45%, Trust score +15%' },
    { day: 'Day 3', subject: `3 things you haven't tried yet in ${name}`, preview: `You are only using 20% of what ${name} can do...`, body: `${greeting} {{firstName}},\n\nYou have been using ${name} for 3 days — ${isCasual ? "awesome!" : "great start."}\n\nBut you might be missing these gems:\n\n1. **[Feature A]** — [benefit in 1 sentence]\n2. **[Feature B]** — [benefit in 1 sentence]\n3. **[Feature C]** — [benefit in 1 sentence]\n\nMost users who try all three stay with ${name} for the long run.\n\n[CTA: Explore All Features]\n\nWhich one will you try first?\n\n{{senderName}}`, cta: 'Explore All Features', goal: 'Deepen engagement + feature breadth', metric: 'Feature adoption +30%' },
    { day: 'Day 5', subject: `Your ${name} weekly report is ready`, preview: `Here is what you accomplished this week...`, body: `${greeting} {{firstName}},\n\nHere is your first ${name} weekly report:\n\n**This Week:**\n- [Actions taken]: {{count}}\n- [Results achieved]: {{metric}}\n- [Time saved]: {{hours}} hours\n\n**Next Steps:**\n- Try [next feature] to unlock [benefit]\n- Invite a teammate for [collaborative feature]\n\n[CTA: View Full Report]\n\n${isCasual ? "Not bad for your first week!" : "Great progress so far."}\n\n{{senderName}}`, cta: 'View Full Report', goal: 'Value demonstration + habit building', metric: 'Open rate > 40%, Return rate +25%' },
    { day: 'Day 7', subject: `Join 5,000+ ${name} users in our community`, preview: `Connect with people who use ${name} like you...`, body: `${greeting} {{firstName}},\n\nOne thing that makes ${name} users special: they help each other.\n\nOur community has 5,000+ members sharing:\n- Tips and templates\n- Feedback and feature requests\n- Success stories and strategies\n\n[CTA: Join the Community]\n\nBonus: Community members get early access to new features.\n\nSee you there!\n\n{{senderName}}`, cta: 'Join the Community', goal: 'Community building + retention', metric: 'Community join rate > 10%' },
    { day: 'Day 10', subject: `Your trial ends in 4 days — here is what you will lose`, preview: `Don't lose access to [key feature]...`, body: `${greeting} {{firstName}},\n\nYour ${name} trial ends in 4 days.\n\nHere is what you have built so far:\n- {{projects_count}} projects created\n- {{actions_count}} actions taken\n- {{time_saved}} hours saved\n\n**What you will lose without Pro:**\n- [Premium feature 1]\n- [Premium feature 2]\n- [Premium feature 3]\n\nUpgrade now to keep everything:\n\n[CTA: Upgrade to Pro — $19/mo]\n\nOr reply to this email with any questions. ${isCasual ? "I read every reply!" : "We are here to help."}\n\n{{senderName}}`, cta: 'Upgrade to Pro', goal: 'Trial conversion', metric: 'Conversion rate > 8%' },
    { day: 'Day 12', subject: `Last chance: 20% off ${name} Pro (expires tomorrow)`, preview: `Your exclusive discount expires in 24 hours...`, body: `${greeting} {{firstName}},\n\nI do not do this often, but since you have been an active user:\n\n**20% off ${name} Pro — for your first 3 months.**\n\nThat is just $15.20/mo instead of $19/mo.\n\n[CTA: Claim 20% Off]\n\nThis offer expires tomorrow at midnight.\n\nAfter that, standard pricing applies.\n\n{{senderName}}\n\nP.S. If ${name} is not the right fit, no hard feelings. But I think you will love Pro.`, cta: 'Claim 20% Off', goal: 'Urgency + conversion', metric: 'Conversion rate > 12% with discount' },
    { day: 'Day 14', subject: `Your ${name} trial has ended`, preview: `But you can still access your data...`, body: `${greeting} {{firstName}},\n\nYour ${name} trial ended today.\n\nDo not worry — your data is safe for 30 days.\n\nYou have three options:\n\n1. **Upgrade to Pro** ($19/mo) — Full access to everything\n2. **Downgrade to Free** — Keep basic features forever\n3. **Export your data** — Take everything with you\n\n[CTA: Choose Your Plan]\n\nWhichever you choose, ${isCasual ? "thanks for giving us a shot!" : "we appreciate you trying ${name}."}\n\n{{senderName}}`, cta: 'Choose Your Plan', goal: 'Final conversion or graceful offboarding', metric: 'Conversion > 5%, Export < 10%' },
    { day: 'Day 21 (win-back)', subject: `We made ${name} better since you left`, preview: `3 new features you have not seen yet...`, body: `${greeting} {{firstName}},\n\nIt has been a week since your trial ended. We have been busy:\n\n**New since you left:**\n- [New Feature 1] — [benefit]\n- [New Feature 2] — [benefit]\n- [Improvement] — [benefit]\n\nWant to give ${name} another try?\n\n[CTA: Restart Free Trial (7 more days)]\n\nNo strings attached.\n\n{{senderName}}`, cta: 'Restart Free Trial', goal: 'Win-back churned trials', metric: 'Reactivation > 5%' },
  ];

  const emails = fullSequence.slice(0, emailCount);

  return {
    emails,
    subjectLineVariants: [
      { original: `Welcome to ${name}`, variantA: `Your ${name} account is live`, variantB: `${isCasual ? "You're in!" : "Account confirmed"} — start with ${name}` },
      { original: `Quick win: Try the most-loved feature`, variantA: `The #1 feature you need to try today`, variantB: `Most users start here (and never look back)` },
      { original: `Your trial ends in 4 days`, variantA: `4 days left — keep your ${name} progress`, variantB: `${isCasual ? "Heads up!" : "Important"}: Your trial is ending soon` },
    ],
    automationTriggers: [
      { trigger: 'User signs up', action: 'Send Welcome email immediately', condition: 'Always' },
      { trigger: 'User completes first action', action: 'Skip Day 1 "quick win" email, send Day 2', condition: 'If activated within 24h' },
      { trigger: 'User inactive 3+ days', action: 'Send re-engagement email early', condition: 'If no login in 72h' },
      { trigger: 'User clicks "Upgrade" but does not pay', action: 'Send cart abandonment email in 1h', condition: 'Upgrade page visited, no purchase' },
      { trigger: 'User invites teammate', action: 'Send team collaboration tips email', condition: 'When invite sent' },
      { trigger: 'Trial expires without conversion', action: 'Start win-back sequence (Day 21+)', condition: 'No paid plan after trial end' },
    ],
    benchmarks: [
      { metric: 'Welcome email open rate', target: '> 60%' },
      { metric: 'Overall sequence open rate', target: '> 40%' },
      { metric: 'Click-through rate (CTR)', target: '> 15%' },
      { metric: 'First action within 24h', target: '> 25%' },
      { metric: 'Trial to paid conversion', target: '> 8-12%' },
      { metric: 'Unsubscribe rate', target: '< 0.5% per email' },
      { metric: 'Sequence completion rate', target: '> 70%' },
    ],
    segmentationRules: [
      'Segment by activation status: activated (completed key action) vs. not activated',
      'Segment by engagement: opened 3+ emails vs. low engagement (skip sales-y emails)',
      'Segment by plan interest: visited pricing page = send pricing-focused content',
      'Segment by team size: solo users get individual tips, team users get collaboration content',
      'Segment by source: organic vs. paid vs. referral = different welcome messaging',
      'Segment by role: technical users get API/integration content, non-technical get UX tips',
    ],
    tools: [
      { tool: 'Resend', purpose: 'Transactional + marketing emails, React email templates', cost: 'Free up to 3K/mo' },
      { tool: 'Loops', purpose: 'SaaS-focused email automation with event triggers', cost: '$49/mo' },
      { tool: 'Customer.io', purpose: 'Advanced behavioral segmentation + workflows', cost: '$100/mo' },
      { tool: 'Beehiiv', purpose: 'Newsletter + drip with built-in analytics', cost: 'Free tier' },
      { tool: 'ConvertKit (Kit)', purpose: 'Creator-focused automation + landing pages', cost: 'Free up to 1K subs' },
      { tool: 'Postmark', purpose: 'High-deliverability transactional emails', cost: '$15/mo' },
    ],
    tips: [
      'Send from a real person (founder@), not noreply@ — reply rates 3x higher',
      'Plain text outperforms HTML for onboarding (feels personal, avoids promo tab)',
      'ONE CTA per email — multiple CTAs reduce click rate by 28%',
      'Subject line < 50 characters — mobile preview cuts off at 35-40 chars',
      'Send welcome email within 60 seconds of signup (delayed = 50% lower open rate)',
      'A/B test subject lines on every email (minimum 2 variants)',
      'Include unsubscribe link AND "too many emails?" frequency preference option',
      'Track email-to-feature-usage correlation to optimize sequence content',
    ],
  };
}

export default function OnboardingEmailsPage() {
  const [productType, setProductType] = useState<string>(productTypes[0]);
  const [length, setLength] = useState<string>(sequenceLengths[1]);
  const [goal, setGoal] = useState<string>(goals[0]);
  const [tone, setTone] = useState<string>(tones[0]);
  const [productName, setProductName] = useState('');
  const [result, setResult] = useState<EmailSequence | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Onboarding Email Sequence Generator</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Generate a complete SaaS onboarding email sequence with subject lines, body copy, automation triggers, and A/B test variants. Ready to paste into your email tool.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Product Type</label>
              <select value={productType} onChange={e => setProductType(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent">
                {productTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Sequence Length</label>
              <select value={length} onChange={e => setLength(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent">
                {sequenceLengths.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Primary Goal</label>
              <select value={goal} onChange={e => setGoal(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent">
                {goals.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tone</label>
              <select value={tone} onChange={e => setTone(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent">
                {tones.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
              <input type="text" value={productName} onChange={e => setProductName(e.target.value)} placeholder="e.g. PostCraft, NexusMind..." className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent" />
            </div>
          </div>
          <button onClick={() => setResult(generateEmailSequence(productType, length, goal, tone, productName))} className="w-full py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold rounded-xl hover:from-violet-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl">Generate Email Sequence</button>
        </div>

        {result && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Email Sequence</h2>
              <div className="space-y-6">
                {result.emails.map((email, i) => (
                  <div key={i} className="border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-lg text-sm font-bold">Email {i + 1}</span>
                      <span className="text-gray-500 text-sm">{email.day}</span>
                      <span className="ml-auto text-xs text-gray-400">{email.goal}</span>
                    </div>
                    <div className="mb-3">
                      <span className="text-xs font-semibold text-gray-500 uppercase">Subject</span>
                      <p className="text-gray-900 font-bold">{email.subject}</p>
                    </div>
                    <div className="mb-3">
                      <span className="text-xs font-semibold text-gray-500 uppercase">Preview Text</span>
                      <p className="text-gray-600 text-sm italic">{email.preview}</p>
                    </div>
                    <div className="mb-3 bg-gray-50 rounded-xl p-4">
                      <span className="text-xs font-semibold text-gray-500 uppercase">Body</span>
                      <pre className="text-gray-700 text-sm mt-2 whitespace-pre-wrap font-sans">{email.body}</pre>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="bg-violet-500 text-white px-4 py-2 rounded-lg text-sm font-bold">{email.cta}</span>
                      <span className="text-xs text-green-600 font-medium">{email.metric}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Subject Line A/B Variants</h2>
              <div className="space-y-4">{result.subjectLineVariants.map((v, i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div><span className="text-xs font-semibold text-gray-500">ORIGINAL</span><p className="text-gray-800 text-sm mt-1">{v.original}</p></div>
                    <div><span className="text-xs font-semibold text-violet-500">VARIANT A</span><p className="text-gray-800 text-sm mt-1">{v.variantA}</p></div>
                    <div><span className="text-xs font-semibold text-purple-500">VARIANT B</span><p className="text-gray-800 text-sm mt-1">{v.variantB}</p></div>
                  </div>
                </div>
              ))}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Automation Triggers</h2>
                <div className="space-y-3">{result.automationTriggers.map((t, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-4">
                    <p className="text-gray-900 text-sm font-medium">{t.trigger}</p>
                    <p className="text-violet-700 text-xs mt-1">{t.action}</p>
                    <p className="text-gray-500 text-xs mt-1">Condition: {t.condition}</p>
                  </div>
                ))}</div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Segmentation Rules</h2>
                <ul className="space-y-2">{result.segmentationRules.map((r, i) => <li key={i} className="text-gray-700 text-sm flex gap-2"><span className="text-violet-500">&#128100;</span>{r}</li>)}</ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Benchmarks</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b border-gray-200"><th className="text-left p-2">Metric</th><th className="text-left p-2">Target</th></tr></thead>
                    <tbody>{result.benchmarks.map((b, i) => <tr key={i} className="border-b border-gray-50"><td className="p-2 text-gray-700">{b.metric}</td><td className="p-2 text-green-700 font-medium">{b.target}</td></tr>)}</tbody>
                  </table>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended Tools</h2>
                <div className="space-y-3">{result.tools.map((t, i) => (
                  <div key={i} className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
                    <div><span className="text-gray-900 text-sm font-medium">{t.tool}</span><p className="text-gray-500 text-xs">{t.purpose}</p></div>
                    <span className="text-violet-600 text-xs font-medium">{t.cost}</span>
                  </div>
                ))}</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Pro Tips</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{result.tips.map((t, i) => <div key={i} className="bg-violet-50 rounded-xl p-4 text-gray-700 text-sm">{t}</div>)}</div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
