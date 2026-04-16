'use client';
import { useState } from 'react';

const platforms = ['Instagram', 'LinkedIn', 'Twitter/X', 'TikTok', 'Facebook'] as const;
const dmGoals = ['Cold Outreach', 'Follow-Up After Engagement', 'Collaboration Pitch', 'Sales/Lead Gen', 'Networking', 'Customer Retention', 'Feedback Request', 'Event Invitation'] as const;
const tones = ['Professional', 'Casual/Friendly', 'Bold/Direct', 'Empathetic', 'Playful'] as const;

interface DMScript {
  subject: string;
  message: string;
  followUp1: string;
  followUp2: string;
  tips: string[];
}

interface DMResult {
  scripts: DMScript[];
  bestPractices: string[];
  timingGuide: string[];
  responseRates: { approach: string; rate: string }[];
  doNots: string[];
}

function generateDMs(platform: string, goal: string, tone: string, context: string, recipientType: string): DMResult {
  const goalTemplates: Record<string, { scripts: Omit<DMScript, 'tips'>[]; tips: string[] }> = {
    'Cold Outreach': {
      scripts: [
        { subject: 'Quick question about your content', message: `Hey ${recipientType || 'there'}! Noticed your post about ${context || '[topic]'} — it really resonated. I'm working on something similar and thought we might have synergies. Would you be open to a 5-min chat? No pitch, just genuine connection.`, followUp1: `Hey! Just following up — totally understand if you're busy. My question was about ${context || '[topic]'}. Happy to share what I've learned too.`, followUp2: `Last follow-up, promise! If now's not the right time, no worries at all. Would love to connect when it makes sense.` },
        { subject: 'Loved your take on [topic]', message: `Hi ${recipientType || 'there'}, your ${context || 'recent post'} caught my eye because [specific reason]. I'm ${context ? `also working in ${context}` : 'in a similar space'} and think there's a real opportunity to [collaborate/learn from each other]. Open to connecting?`, followUp1: `Hey, hope your week's going well! Just wanted to bump this — thought our work in ${context || 'this space'} could complement each other.`, followUp2: `Totally get it if DMs are overwhelming. If you ever want to chat about ${context || 'the industry'}, my door's open.` },
      ],
      tips: ['Reference a SPECIFIC post or insight (proves you did homework)', 'Keep under 50 words for the first message', 'Never pitch in message #1 — build rapport first'],
    },
    'Follow-Up After Engagement': {
      scripts: [
        { subject: 'Thanks for the like/comment!', message: `Hey! Thanks for engaging with my post about ${context || '[topic]'}. Glad it resonated! I noticed you're into ${context || 'similar topics'} — your content is great. What are you working on right now?`, followUp1: `BTW, I just posted something you might find useful — it's about ${context || '[related topic]'}. Would love your take on it!`, followUp2: `No pressure to reply — just wanted to say I appreciate the support. Looking forward to more of your content!` },
      ],
      tips: ['Follow up within 24h of their engagement', 'Mention the specific post they engaged with', 'Ask an open-ended question to start a conversation'],
    },
    'Collaboration Pitch': {
      scripts: [
        { subject: 'Collab idea 🤝', message: `Hey ${recipientType || 'there'}! I've been following your work on ${context || '[niche]'} and have an idea for a collab that could benefit both our audiences:\n\n[Collab idea in 1 sentence]\n\nI have ${context || '[your audience size/value]'} and think our audiences overlap perfectly. Interested?`, followUp1: `Hi again! Just wanted to bump my collab idea. I put together a quick outline of how it could work. Want me to share it?`, followUp2: `Totally understand if the timing isn't right! If you're ever open to collabs in the future, I'm here.` },
      ],
      tips: ['Lead with what THEY get out of it, not what you get', 'Include your audience size/metrics', 'Have a specific collab idea ready, not just "let\'s collab"'],
    },
    'Sales/Lead Gen': {
      scripts: [
        { subject: 'Quick question', message: `Hi ${recipientType || 'there'}, I noticed you're ${context || 'working on [challenge]'}. We help people in your position ${context || 'solve [specific problem]'} — typically seeing ${context || '[specific result]'} in the first month.\n\nWould a quick 5-min overview be useful? No strings attached.`, followUp1: `Hey! I know DMs are noisy. Quick update: we just helped someone in ${context || 'your industry'} achieve [result]. Thought you might find it relevant.`, followUp2: `Last note from me! Here's a free resource on ${context || '[topic]'} that might help regardless: [link]. Hope it's useful!` },
      ],
      tips: ['Lead with the RESULT, not the product', 'Personalize based on their recent activity', 'Offer value before asking for anything'],
    },
    'Networking': {
      scripts: [
        { subject: 'Fellow [industry] person here 👋', message: `Hi ${recipientType || 'there'}! We're both in ${context || 'the same space'} and I've been really impressed by your work on ${context || '[specific thing]'}. Not pitching anything — just wanted to say hi and see if you'd be open to connecting. Always great to know people doing similar work.`, followUp1: `Hey! Just saw your latest post and it confirmed we should connect. Your perspective on ${context || '[topic]'} is spot on.`, followUp2: `No worries if you're swamped! Just know I'm a fan of your work. Maybe we'll cross paths at an event.` },
      ],
      tips: ['Be genuine — people can smell fake networking', 'No ask in the first message', 'Engage with their content for 1-2 weeks BEFORE DMing'],
    },
    'Customer Retention': {
      scripts: [
        { subject: 'Checking in!', message: `Hey ${recipientType || 'there'}! It's been a while since we connected. How's ${context || 'everything going with [product/service]'}? Anything I can help with?\n\nWe just released [new feature/update] that I think you'd love.`, followUp1: `Also wanted to let you know — as a valued [customer/member], you get early access to ${context || '[new thing]'}. Check it out!`, followUp2: `Hope everything's going well! We're always here if you need anything. Thanks for being part of the community.` },
      ],
      tips: ['Check in at 30, 60, and 90 days', 'Share new features relevant to their use case', 'Ask for feedback — it makes them feel valued'],
    },
    'Feedback Request': {
      scripts: [
        { subject: 'Would love your opinion', message: `Hey ${recipientType || 'there'}! I really respect your expertise in ${context || '[area]'}. I'm working on ${context || '[project]'} and would love your honest feedback. It would take < 2 minutes. Would you be open to sharing your thoughts?`, followUp1: `Hi! Just bumping this — your perspective would be incredibly valuable. Even a quick "I like X, change Y" would help!`, followUp2: `Totally understand if you're too busy. Thanks for considering it!` },
      ],
      tips: ['Make it easy — give them specific questions, not open-ended "what do you think?"', 'Offer something in return (shoutout, early access, coffee)', 'Follow up with how their feedback helped'],
    },
    'Event Invitation': {
      scripts: [
        { subject: 'You\'re invited! 🎉', message: `Hey ${recipientType || 'there'}! We're hosting ${context || '[event name]'} on [date] and I immediately thought of you. It's about ${context || '[topic]'} and features [speakers/activities]. Would love to have you there!\n\nDetails: [link]`, followUp1: `Quick reminder about ${context || 'our event'} — spots are filling up! Your expertise would add so much to the conversation.`, followUp2: `Last chance to grab a spot at ${context || 'the event'}! Here's the link: [link]. Hope to see you there!` },
      ],
      tips: ['Send invites 2-3 weeks before the event', 'Personalize why THEY specifically should attend', 'Create FOMO with limited spots or early-bird pricing'],
    },
  };

  const template = goalTemplates[goal] || goalTemplates['Cold Outreach'];
  const scripts = template.scripts.map(s => ({ ...s, tips: template.tips }));

  const responseRates = [
    { approach: 'Cold DM (no prior engagement)', rate: '2-5%' },
    { approach: 'After engaging their content for 1 week', rate: '15-25%' },
    { approach: 'After they engaged YOUR content', rate: '30-50%' },
    { approach: 'Mutual connection intro', rate: '40-60%' },
    { approach: 'Personalized video DM', rate: '50-70%' },
  ];

  return {
    scripts,
    bestPractices: [
      'Engage with their content for 3-5 days BEFORE sending a DM',
      'Keep first message under 50 words — long DMs get ignored',
      'Reference something specific (a post, quote, or achievement)',
      'One CTA per message — "Would you be open to a 5-min chat?" not multiple asks',
      'Follow up max 2 times, spaced 3-5 days apart',
      'Send DMs Tuesday-Thursday 9-11am for best open rates',
      `${platform}: ${platform === 'LinkedIn' ? 'Use InMail for cold outreach — higher open rate than connection requests' : platform === 'Instagram' ? 'Voice notes get 3x more replies than text DMs' : 'Quote-tweet their content first to build familiarity before DMing'}`,
    ],
    timingGuide: [
      'Best days: Tuesday, Wednesday, Thursday',
      'Best times: 9-11am recipient\'s timezone',
      'Worst times: Friday afternoon, weekends, Monday morning',
      'Follow-up #1: 3 days after initial DM',
      'Follow-up #2: 5-7 days after follow-up #1',
      'After 2 follow-ups with no response: stop. Engage their content instead.',
    ],
    responseRates,
    doNots: [
      'Never send a pitch as the first message — build rapport first',
      'Never use copy-paste templates without personalizing (people can tell)',
      'Never follow up more than 2 times — it becomes harassment',
      'Never send voice notes to people you don\'t know on LinkedIn',
      'Never ask "Can I pick your brain?" — offer value, not extraction',
    ],
  };
}

export default function DMScriptsPage() {
  const [platform, setPlatform] = useState<string>('LinkedIn');
  const [goal, setGoal] = useState<string>('Cold Outreach');
  const [tone, setTone] = useState<string>('Professional');
  const [context, setContext] = useState('');
  const [recipientType, setRecipientType] = useState('');
  const [result, setResult] = useState<DMResult | null>(null);

  const handleGenerate = () => {
    setResult(generateDMs(platform, goal, tone, context.trim(), recipientType.trim()));
  };

  return (
    <main className="min-h-screen bg-zinc-950 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">DM Script Generator</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Create high-response DM scripts for outreach, networking, and sales. <strong className="text-white">Personalized DMs get 50-70% response rates</strong> vs 2-5% for cold templates.</p>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div><label className="block text-sm text-zinc-400 mb-1">Platform</label><select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">{platforms.map(p => <option key={p}>{p}</option>)}</select></div>
          <div><label className="block text-sm text-zinc-400 mb-1">DM Goal</label><select value={goal} onChange={e => setGoal(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">{dmGoals.map(g => <option key={g}>{g}</option>)}</select></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Tone</label><select value={tone} onChange={e => setTone(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">{tones.map(t => <option key={t}>{t}</option>)}</select></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Recipient (name/type)</label><input type="text" value={recipientType} onChange={e => setRecipientType(e.target.value)} placeholder="e.g., Sarah, Marketing Director" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600" /></div>
          <div className="md:col-span-2"><label className="block text-sm text-zinc-400 mb-1">Context (topic/niche/product)</label><input type="text" value={context} onChange={e => setContext(e.target.value)} placeholder="e.g., AI content tools, their recent post about SEO" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600" /></div>
        </div>

        <button onClick={handleGenerate} className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition">Generate DM Scripts</button>

        {result && (
          <div className="mt-10 space-y-6">
            {result.scripts.map((s, i) => (
              <div key={i} className="space-y-3">
                <div className="bg-zinc-900 border border-violet-500/30 rounded-xl p-5">
                  <h3 className="text-xs text-violet-400 mb-2">Message 1 — Opening</h3>
                  <p className="text-white text-sm">{s.message}</p>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                  <h3 className="text-xs text-zinc-500 mb-2">Follow-Up #1 (Day 3)</h3>
                  <p className="text-zinc-300 text-sm">{s.followUp1}</p>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                  <h3 className="text-xs text-zinc-500 mb-2">Follow-Up #2 (Day 7) — Final</h3>
                  <p className="text-zinc-300 text-sm">{s.followUp2}</p>
                </div>
                <div className="bg-zinc-800 rounded-lg p-3">
                  <h4 className="text-xs text-zinc-400 mb-1">Script Tips</h4>
                  <ul className="space-y-1">{s.tips.map((t, j) => <li key={j} className="text-xs text-zinc-300">{t}</li>)}</ul>
                </div>
              </div>
            ))}

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Response Rates by Approach</h3>
                {result.responseRates.map((r, i) => (
                  <div key={i} className="flex justify-between mb-2"><span className="text-sm text-zinc-400">{r.approach}</span><span className="text-sm text-green-400 font-medium">{r.rate}</span></div>
                ))}
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Timing Guide</h3>
                <ul className="space-y-2">{result.timingGuide.map((t, i) => <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-violet-400">•</span>{t}</li>)}</ul>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-zinc-900 border border-green-500/20 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-green-400 mb-3">Best Practices</h3>
                <ul className="space-y-2">{result.bestPractices.map((p, i) => <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-green-400">✓</span>{p}</li>)}</ul>
              </div>
              <div className="bg-zinc-900 border border-red-500/20 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-red-400 mb-3">Never Do This</h3>
                <ul className="space-y-2">{result.doNots.map((d, i) => <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-red-400">✕</span>{d}</li>)}</ul>
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-zinc-400 mb-3">Related Tools</h3>
              <div className="flex flex-wrap gap-2 text-sm">
                <a href="/collab-brief" className="text-violet-400 hover:text-violet-300 underline">Collab Brief</a>
                <a href="/comment-reply" className="text-violet-400 hover:text-violet-300 underline">Comment Replies</a>
                <a href="/brand-voice" className="text-violet-400 hover:text-violet-300 underline">Brand Voice</a>
                <a href="/social-proof" className="text-violet-400 hover:text-violet-300 underline">Social Proof</a>
                <a href="/persona-builder" className="text-violet-400 hover:text-violet-300 underline">Persona Builder</a>
                <a href="/growth-calculator" className="text-violet-400 hover:text-violet-300 underline">Growth Calculator</a>
              </div>
            </div>
          </div>
        )}

        <footer className="mt-20 border-t border-zinc-800 pt-8 pb-12">
          <div className="grid md:grid-cols-4 gap-8 text-sm text-zinc-500">
            <div><h4 className="font-semibold text-white mb-3">Outreach</h4><ul className="space-y-1"><li><a href="/dm-scripts" className="hover:text-white transition">DM Scripts</a></li><li><a href="/collab-brief" className="hover:text-white transition">Collab Brief</a></li><li><a href="/comment-reply" className="hover:text-white transition">Comment Replies</a></li><li><a href="/social-proof" className="hover:text-white transition">Social Proof</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Creation</h4><ul className="space-y-1"><li><a href="/" className="hover:text-white transition">Posts</a></li><li><a href="/carousel-generator" className="hover:text-white transition">Carousel</a></li><li><a href="/hooks" className="hover:text-white transition">Hooks</a></li><li><a href="/content-remix" className="hover:text-white transition">Remix</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Analytics</h4><ul className="space-y-1"><li><a href="/growth-calculator" className="hover:text-white transition">Growth</a></li><li><a href="/engagement-calculator" className="hover:text-white transition">Engagement</a></li><li><a href="/roi-calculator" className="hover:text-white transition">ROI</a></li><li><a href="/content-scorecard" className="hover:text-white transition">Score Card</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Strategy</h4><ul className="space-y-1"><li><a href="/brand-voice" className="hover:text-white transition">Brand Voice</a></li><li><a href="/persona-builder" className="hover:text-white transition">Persona</a></li><li><a href="/campaign" className="hover:text-white transition">Campaign</a></li><li><a href="/content-calendar" className="hover:text-white transition">Calendar</a></li></ul></div>
          </div>
          <p className="text-center text-zinc-600 text-xs mt-8">© 2026 PostCraft AI. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
