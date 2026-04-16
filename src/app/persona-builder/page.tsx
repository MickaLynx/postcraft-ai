'use client';
import { useState } from 'react';

const industries = ['Tech/SaaS', 'E-commerce', 'Health/Fitness', 'Finance', 'Education', 'Food/Beverage', 'Travel', 'Fashion/Beauty', 'Gaming', 'Real Estate', 'Sustainability', 'Parenting'] as const;
const ageGroups = ['18-24 (Gen Z)', '25-34 (Millennials)', '35-44 (Elder Millennials)', '45-54 (Gen X)', '55-64 (Boomers)', '65+ (Silent Gen)'] as const;
const goals = ['Brand Awareness', 'Lead Generation', 'Product Sales', 'Community Building', 'Thought Leadership', 'App Downloads', 'Event Promotion', 'Recruiting'] as const;

interface Persona {
  name: string;
  avatar: string;
  demographics: { age: string; gender: string; location: string; income: string; education: string };
  psychographics: { values: string[]; interests: string[]; painPoints: string[]; motivations: string[] };
  socialBehavior: { platforms: { name: string; usage: string; contentPreference: string }[]; bestTimes: string; deviceSplit: string };
  contentPreferences: { formats: string[]; tones: string[]; topics: string[]; turnoffs: string[] };
  buyingBehavior: { triggers: string[]; objections: string[]; decisionTime: string; influencers: string[] };
  messagingGuide: { doSay: string[]; dontSay: string[]; ctaStyle: string; emotionalTriggers: string[] };
}

const avatars = ['👩‍💻', '👨‍💼', '🧑‍🎓', '👩‍🔬', '🧑‍🍳', '👨‍🎨', '👩‍⚕️', '🧑‍🏫'];

function generatePersona(industry: string, ageGroup: string, goal: string, productDesc: string): Persona {
  const ageNum = parseInt(ageGroup);
  const isYoung = ageNum < 30;
  const isMidAge = ageNum >= 30 && ageNum < 50;

  const industryData: Record<string, { names: string[]; locations: string[]; incomes: string[]; values: string[]; interests: string[] }> = {
    'Tech/SaaS': { names: ['Alex Chen', 'Sarah Dev', 'Jordan Tech'], locations: ['San Francisco, CA', 'Austin, TX', 'Berlin, Germany'], incomes: ['$80K-$120K', '$120K-$180K'], values: ['Efficiency', 'Innovation', 'Work-life balance', 'Continuous learning'], interests: ['Startups', 'AI/ML', 'Productivity tools', 'Open source', 'Remote work'] },
    'E-commerce': { names: ['Maya Shop', 'Chris Buyer', 'Priya Retail'], locations: ['New York, NY', 'London, UK', 'Toronto, CA'], incomes: ['$40K-$80K', '$60K-$100K'], values: ['Convenience', 'Value for money', 'Brand trust', 'Sustainability'], interests: ['Online shopping', 'Deals & coupons', 'Product reviews', 'Unboxing', 'Trends'] },
    'Health/Fitness': { names: ['Jake Fit', 'Mia Wellness', 'Sam Active'], locations: ['Los Angeles, CA', 'Miami, FL', 'Sydney, AU'], incomes: ['$50K-$90K', '$70K-$120K'], values: ['Health', 'Self-improvement', 'Discipline', 'Community'], interests: ['Workouts', 'Nutrition', 'Mental health', 'Supplements', 'Athleisure'] },
    'Finance': { names: ['David Wealth', 'Ava Invest', 'Marcus Budget'], locations: ['New York, NY', 'Chicago, IL', 'Singapore'], incomes: ['$60K-$150K', '$100K-$250K'], values: ['Financial freedom', 'Security', 'Growth', 'Education'], interests: ['Investing', 'Real estate', 'Crypto', 'Budgeting', 'Side hustles'] },
    default: { names: ['Alex User', 'Sam Customer', 'Jordan Target'], locations: ['New York, NY', 'London, UK', 'Sydney, AU'], incomes: ['$50K-$100K', '$70K-$130K'], values: ['Quality', 'Convenience', 'Trust', 'Value'], interests: ['Technology', 'Entertainment', 'Self-improvement', 'Travel', 'Food'] },
  };

  const data = industryData[industry] || industryData['default'];
  const nameIdx = Math.floor(Math.random() * data.names.length);

  const painPoints: Record<string, string[]> = {
    'Tech/SaaS': ['Too many tools, not enough integration', 'Information overload', 'Difficulty measuring ROI', 'Context switching between apps'],
    'E-commerce': ['Hard to find trustworthy brands', 'Shipping costs too high', 'Returns process too complex', 'Product quality uncertainty'],
    'Health/Fitness': ['Lack of motivation', 'No time for workouts', 'Conflicting nutrition advice', 'Plateaus in progress'],
    'Finance': ['Not saving enough', 'Confused by investing options', 'Fear of market volatility', 'No financial plan'],
    default: ['Finding reliable information', 'Making purchase decisions', 'Time management', 'Keeping up with changes'],
  };

  const platformUsage = isYoung
    ? [{ name: 'TikTok', usage: '2+ hrs/day', contentPreference: 'Short-form video, authentic' }, { name: 'Instagram', usage: '1.5 hrs/day', contentPreference: 'Reels, Stories, aesthetic carousels' }, { name: 'Twitter/X', usage: '45 min/day', contentPreference: 'Hot takes, threads, memes' }]
    : isMidAge
    ? [{ name: 'LinkedIn', usage: '1 hr/day', contentPreference: 'Professional insights, carousels' }, { name: 'Instagram', usage: '45 min/day', contentPreference: 'Stories, infographics' }, { name: 'Twitter/X', usage: '30 min/day', contentPreference: 'Industry news, threads' }]
    : [{ name: 'Facebook', usage: '1.5 hrs/day', contentPreference: 'Long posts, discussions, groups' }, { name: 'YouTube', usage: '1 hr/day', contentPreference: 'Tutorials, reviews, how-tos' }, { name: 'LinkedIn', usage: '30 min/day', contentPreference: 'Professional articles' }];

  const contentFormats = isYoung
    ? ['Short-form video (< 60s)', 'Memes & relatable content', 'Interactive polls', 'Behind-the-scenes']
    : isMidAge
    ? ['Carousels with data', 'Case studies', 'Expert interviews', 'How-to guides']
    : ['Long-form articles', 'Video tutorials', 'Email newsletters', 'Webinars'];

  const tones = isYoung
    ? ['Casual & authentic', 'Funny & relatable', 'Bold & controversial']
    : isMidAge
    ? ['Professional but human', 'Data-driven', 'Storytelling']
    : ['Authoritative', 'Trustworthy', 'Educational'];

  const turnoffs = isYoung
    ? ['Corporate speak', 'Hard sells', 'Fake positivity', 'Long paragraphs']
    : isMidAge
    ? ['Clickbait', 'Unsubstantiated claims', 'Too casual/meme-heavy', 'Generic advice']
    : ['Jargon overload', 'Condescending tone', 'Flashy without substance', 'Pressure tactics'];

  const buyingTriggers = isYoung
    ? ['Social proof (reviews, UGC)', 'Limited-time offers', 'Influencer recommendations', 'Free trial / freemium']
    : isMidAge
    ? ['ROI data & case studies', 'Peer recommendations', 'Free trial with real features', 'Integration with existing tools']
    : ['Brand reputation', 'Word of mouth', 'Detailed comparisons', 'Money-back guarantee'];

  const objections = isYoung
    ? ['Too expensive', 'Not sure if I need it', 'Will I actually use it?', 'Looks too corporate']
    : isMidAge
    ? ['Not enough time to learn', 'Already have a solution', 'Need team buy-in', 'Privacy concerns']
    : ['Too complicated', 'Prefer traditional methods', 'Don\'t trust new brands', 'Hidden costs'];

  return {
    name: data.names[nameIdx],
    avatar: avatars[nameIdx % avatars.length],
    demographics: {
      age: ageGroup.split(' ')[0],
      gender: 'Mixed (55% female, 45% male)',
      location: data.locations[nameIdx % data.locations.length],
      income: data.incomes[nameIdx % data.incomes.length],
      education: isMidAge ? 'Bachelor\'s degree or higher' : isYoung ? 'In college or recent graduate' : 'Established professional',
    },
    psychographics: {
      values: data.values,
      interests: data.interests,
      painPoints: (painPoints[industry] || painPoints['default']),
      motivations: goal === 'Brand Awareness' ? ['Discover new brands', 'Stay ahead of trends', 'Share with network'] : goal === 'Product Sales' ? ['Solve a specific problem', 'Get best value', 'Quick results'] : ['Learn & grow', 'Connect with community', 'Build skills'],
    },
    socialBehavior: {
      platforms: platformUsage,
      bestTimes: isYoung ? '7-9 PM, weekends' : isMidAge ? '7-8 AM, 12-1 PM, 8-9 PM' : '9-11 AM, 3-5 PM',
      deviceSplit: isYoung ? '90% mobile, 10% desktop' : isMidAge ? '60% mobile, 40% desktop' : '45% mobile, 55% desktop',
    },
    contentPreferences: {
      formats: contentFormats,
      tones,
      topics: data.interests.slice(0, 4),
      turnoffs,
    },
    buyingBehavior: {
      triggers: buyingTriggers,
      objections,
      decisionTime: isYoung ? '1-3 days (impulse-driven)' : isMidAge ? '1-2 weeks (research-driven)' : '2-4 weeks (trust-driven)',
      influencers: isYoung ? ['TikTok creators', 'YouTube reviewers', 'Friend recommendations'] : isMidAge ? ['Industry experts', 'LinkedIn thought leaders', 'Peer reviews'] : ['Trusted publications', 'Word of mouth', 'Brand history'],
    },
    messagingGuide: {
      doSay: isYoung ? ['Be real with them', 'Show, don\'t tell', 'Use their language'] : isMidAge ? ['Lead with data', 'Respect their time', 'Show ROI clearly'] : ['Build trust gradually', 'Be transparent', 'Provide detailed info'],
      dontSay: turnoffs.slice(0, 3),
      ctaStyle: isYoung ? 'Casual & low-pressure ("Try it free", "See for yourself")' : isMidAge ? 'Value-driven ("Start saving 10 hrs/week", "See the demo")' : 'Trust-based ("Learn more", "Request a consultation")',
      emotionalTriggers: isYoung ? ['FOMO', 'Belonging', 'Self-expression'] : isMidAge ? ['Achievement', 'Efficiency', 'Status'] : ['Security', 'Legacy', 'Trust'],
    },
  };
}

export default function PersonaBuilderPage() {
  const [industry, setIndustry] = useState<string>('Tech/SaaS');
  const [ageGroup, setAgeGroup] = useState<string>('25-34 (Millennials)');
  const [goal, setGoal] = useState<string>('Lead Generation');
  const [productDesc, setProductDesc] = useState('');
  const [persona, setPersona] = useState<Persona | null>(null);

  const handleGenerate = () => {
    setPersona(generatePersona(industry, ageGroup, goal, productDesc));
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold gradient-text mb-4">Audience Persona Builder</h1>
      <p className="text-zinc-400 mb-8 max-w-2xl">Build detailed audience personas for your social media strategy. Understand who you&apos;re talking to — their pain points, platform preferences, buying triggers, and content expectations.</p>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Industry</label>
          <select value={industry} onChange={e => setIndustry(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none">
            {industries.map(i => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Target Age Group</label>
          <select value={ageGroup} onChange={e => setAgeGroup(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none">
            {ageGroups.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Primary Goal</label>
          <select value={goal} onChange={e => setGoal(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none">
            {goals.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Product/Service (optional)</label>
          <input value={productDesc} onChange={e => setProductDesc(e.target.value)} placeholder="e.g. AI writing assistant for marketers" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none" />
        </div>
      </div>

      <button onClick={handleGenerate} className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:opacity-90 transition mb-10">Generate Persona</button>

      {persona && (
        <div className="space-y-6">
          {/* Header */}
          <div className="glass rounded-2xl p-6 flex items-center gap-6">
            <div className="text-6xl">{persona.avatar}</div>
            <div>
              <h2 className="text-2xl font-bold">{persona.name}</h2>
              <p className="text-zinc-400">{persona.demographics.age} | {persona.demographics.location} | {persona.demographics.income}</p>
              <p className="text-sm text-zinc-500">{persona.demographics.education} | {persona.demographics.gender}</p>
            </div>
          </div>

          {/* Psychographics */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-bold text-purple-400 mb-3">Values & Motivations</h3>
              <div className="space-y-2">
                <div><span className="text-sm text-zinc-500">Values:</span><div className="flex flex-wrap gap-1 mt-1">{persona.psychographics.values.map(v => <span key={v} className="text-xs bg-purple-900/30 text-purple-300 px-2 py-0.5 rounded">{v}</span>)}</div></div>
                <div><span className="text-sm text-zinc-500">Motivations:</span><ul className="text-sm text-zinc-300 mt-1">{persona.psychographics.motivations.map(m => <li key={m}>• {m}</li>)}</ul></div>
              </div>
            </div>
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-bold text-red-400 mb-3">Pain Points</h3>
              <ul className="space-y-2">{persona.psychographics.painPoints.map(p => <li key={p} className="text-sm text-zinc-300 flex gap-2"><span className="text-red-400">!</span>{p}</li>)}</ul>
            </div>
          </div>

          {/* Social Behavior */}
          <div className="glass rounded-2xl p-6">
            <h3 className="text-lg font-bold text-blue-400 mb-4">Social Media Behavior</h3>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              {persona.socialBehavior.platforms.map(p => (
                <div key={p.name} className="bg-zinc-900/50 rounded-lg p-4">
                  <h4 className="font-semibold text-white">{p.name}</h4>
                  <p className="text-xs text-zinc-400 mt-1">Usage: {p.usage}</p>
                  <p className="text-xs text-zinc-400">Prefers: {p.contentPreference}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-zinc-500">Best Times:</span> <span className="text-zinc-300">{persona.socialBehavior.bestTimes}</span></div>
              <div><span className="text-zinc-500">Device Split:</span> <span className="text-zinc-300">{persona.socialBehavior.deviceSplit}</span></div>
            </div>
          </div>

          {/* Content Preferences */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-bold text-green-400 mb-3">Content They Love</h3>
              <div className="space-y-2">
                <div><span className="text-sm text-zinc-500">Formats:</span><div className="flex flex-wrap gap-1 mt-1">{persona.contentPreferences.formats.map(f => <span key={f} className="text-xs bg-green-900/30 text-green-300 px-2 py-0.5 rounded">{f}</span>)}</div></div>
                <div><span className="text-sm text-zinc-500">Tones:</span><div className="flex flex-wrap gap-1 mt-1">{persona.contentPreferences.tones.map(t => <span key={t} className="text-xs bg-blue-900/30 text-blue-300 px-2 py-0.5 rounded">{t}</span>)}</div></div>
              </div>
            </div>
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-bold text-red-400 mb-3">Content They Hate</h3>
              <ul className="space-y-1">{persona.contentPreferences.turnoffs.map(t => <li key={t} className="text-sm text-zinc-300">✕ {t}</li>)}</ul>
            </div>
          </div>

          {/* Buying Behavior */}
          <div className="glass rounded-2xl p-6">
            <h3 className="text-lg font-bold text-amber-400 mb-4">Buying Behavior</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-green-400 mb-2">Purchase Triggers</h4>
                <ul className="text-sm text-zinc-300 space-y-1">{persona.buyingBehavior.triggers.map(t => <li key={t}>+ {t}</li>)}</ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-red-400 mb-2">Common Objections</h4>
                <ul className="text-sm text-zinc-300 space-y-1">{persona.buyingBehavior.objections.map(o => <li key={o}>- {o}</li>)}</ul>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
              <div><span className="text-zinc-500">Decision Time:</span> <span className="text-zinc-300">{persona.buyingBehavior.decisionTime}</span></div>
              <div><span className="text-zinc-500">Key Influencers:</span> <span className="text-zinc-300">{persona.buyingBehavior.influencers.join(', ')}</span></div>
            </div>
          </div>

          {/* Messaging Guide */}
          <div className="glass rounded-2xl p-6">
            <h3 className="text-lg font-bold text-pink-400 mb-4">Messaging Guide</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-green-900/10 border border-green-800/20 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-green-400 mb-2">Do Say</h4>
                <ul className="text-sm text-zinc-300 space-y-1">{persona.messagingGuide.doSay.map(d => <li key={d}>✓ {d}</li>)}</ul>
              </div>
              <div className="bg-red-900/10 border border-red-800/20 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-red-400 mb-2">Don&apos;t Say</h4>
                <ul className="text-sm text-zinc-300 space-y-1">{persona.messagingGuide.dontSay.map(d => <li key={d}>✕ {d}</li>)}</ul>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-zinc-500">CTA Style:</span> <span className="text-zinc-300">{persona.messagingGuide.ctaStyle}</span></div>
              <div><span className="text-zinc-500">Emotional Triggers:</span> <span className="text-zinc-300">{persona.messagingGuide.emotionalTriggers.join(', ')}</span></div>
            </div>
          </div>
        </div>
      )}

      <section className="mt-16 space-y-8 text-zinc-400">
        <h2 className="text-2xl font-bold text-white">Why Audience Personas Matter for Social Media</h2>
        <p>An audience persona is a semi-fictional representation of your ideal follower or customer. It combines demographics, psychographics, behavior patterns, and content preferences into a single profile that guides every piece of content you create.</p>

        <h3 className="text-xl font-semibold text-white">How to Use Your Persona</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong className="text-white">Content creation:</strong> Match formats and tones to what your persona prefers</li>
          <li><strong className="text-white">Posting schedule:</strong> Post when your persona is most active</li>
          <li><strong className="text-white">Ad targeting:</strong> Use demographics and interests for precise targeting</li>
          <li><strong className="text-white">Messaging:</strong> Address pain points directly, use emotional triggers wisely</li>
          <li><strong className="text-white">Platform selection:</strong> Focus on platforms where your persona spends time</li>
        </ul>

        <div className="border-t border-zinc-800 pt-8">
          <h3 className="text-xl font-semibold text-white">FAQ</h3>
          <div className="space-y-4 mt-4">
            <div><h4 className="font-medium text-white">How many personas do I need?</h4><p className="text-sm">Most brands need 2-4 personas. One primary and 1-3 secondary. Too many dilutes your messaging; too few misses audience segments.</p></div>
            <div><h4 className="font-medium text-white">How often should I update my personas?</h4><p className="text-sm">Review quarterly. Audience behavior shifts with platform algorithm changes, cultural trends, and life stage transitions. What worked 6 months ago may not work today.</p></div>
            <div><h4 className="font-medium text-white">Are personas the same as target audiences?</h4><p className="text-sm">No. A target audience is broad (e.g., &quot;25-34 professionals&quot;). A persona is specific (&quot;Sarah, 29, SaaS marketer, values efficiency, browses LinkedIn at 7 AM, buys based on peer reviews&quot;). Personas create empathy; target audiences create segments.</p></div>
          </div>
        </div>
      </section>
    </main>
  );
}
