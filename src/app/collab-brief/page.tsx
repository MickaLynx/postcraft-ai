'use client';
import { useState } from 'react';

const platforms = ['Instagram', 'TikTok', 'YouTube', 'Twitter/X', 'LinkedIn', 'Multi-Platform'] as const;
const collabTypes = ['Sponsored Post', 'Product Review', 'Giveaway/Contest', 'Takeover', 'Co-Created Content', 'Affiliate Partnership', 'UGC Campaign', 'Event/Launch Collab'] as const;
const budgetRanges = ['$0 (Barter/Trade)', '$100-$500', '$500-$2K', '$2K-$5K', '$5K-$10K', '$10K+'] as const;

interface BriefResult {
  briefSections: { title: string; content: string }[];
  deliverables: { item: string; specs: string; deadline: string }[];
  dosAndDonts: { dos: string[]; donts: string[] };
  pricingGuide: { tier: string; followers: string; rate: string }[];
  outreachTemplate: string;
  negotiationTips: string[];
  legalChecklist: string[];
  kpis: { metric: string; target: string }[];
}

function generateBrief(
  platform: string, collabType: string, brand: string, creator: string,
  budget: string, goal: string, niche: string
): BriefResult {
  const briefSections = [
    { title: 'Campaign Overview', content: `${brand || 'Brand'} × ${creator || 'Creator'} — ${collabType} on ${platform}. Goal: ${goal || 'Increase brand awareness and drive engagement'}. Niche: ${niche || 'General'}.` },
    { title: 'Brand Guidelines', content: `Tone: Authentic and natural — avoid scripted/salesy language. Brand must be mentioned within the first 15 seconds (video) or first 2 lines (post). Use brand hashtag + personal hashtag. Tag brand account.` },
    { title: 'Creative Direction', content: `Content should feel native to ${creator || 'creator'}'s feed — not an ad. Show genuine use/experience with the product. Include a personal story or reaction. ${collabType === 'Product Review' ? 'Honest review required — share both pros and a minor con for authenticity.' : 'Creative freedom within guidelines.'}` },
    { title: 'Timeline', content: `Brief received → Content draft (3-5 business days) → Brand review (48h turnaround) → Revisions if needed (1 round included) → Final approval → Publish within agreed window.` },
    { title: 'Compensation', content: `Budget: ${budget}. Payment terms: 50% upfront, 50% on publish (or net-30 for agencies). Usage rights: ${collabType === 'UGC Campaign' ? '6-month usage rights for brand channels' : '90 days organic, paid usage negotiable'}.` },
  ];

  const deliverablesByType: Record<string, { item: string; specs: string; deadline: string }[]> = {
    'Sponsored Post': [
      { item: '1 Feed Post (carousel or single image)', specs: `${platform === 'Instagram' ? '1080×1350px (4:5)' : platform === 'LinkedIn' ? '1200×1200px or PDF' : '1080×1080px'}`, deadline: 'Day 5' },
      { item: '3 Story slides', specs: '1080×1920px (9:16), include link/CTA sticker', deadline: 'Day 5' },
      { item: 'Caption with brand mention + hashtags', specs: 'Min 100 words, max 2200 chars', deadline: 'Day 3 (draft)' },
    ],
    'Product Review': [
      { item: '1 Video Review (60-90s)', specs: `${platform === 'TikTok' ? '9:16 vertical' : platform === 'YouTube' ? '16:9 horizontal' : '9:16 or 4:5'}`, deadline: 'Day 7' },
      { item: 'Written review caption', specs: 'Honest pros/cons, personal experience, recommendation', deadline: 'Day 5 (draft)' },
      { item: 'B-roll/product shots', specs: '3-5 high-quality images for brand use', deadline: 'Day 7' },
    ],
    'Giveaway/Contest': [
      { item: 'Announcement post', specs: 'Clear rules, entry mechanics, prize value', deadline: 'Day 3' },
      { item: '3 reminder Stories', specs: 'Countdown sticker, engagement prompts', deadline: 'Days 3-7' },
      { item: 'Winner announcement', specs: 'Post or Story, tag winner with brand mention', deadline: 'Day 10' },
    ],
    'Takeover': [
      { item: '5-10 Story slides over 24h', specs: 'Behind-the-scenes, authentic moments', deadline: 'Takeover day' },
      { item: '1 Feed post from takeover', specs: 'Best moment recap, brand tag', deadline: 'Takeover day' },
      { item: 'Cross-promotion on own account', specs: 'Story + post linking to takeover', deadline: 'Takeover day' },
    ],
  };

  const deliverables = deliverablesByType[collabType] || deliverablesByType['Sponsored Post'];

  const pricingGuide = [
    { tier: 'Nano (1K-10K)', followers: '1,000-10,000', rate: '$50-$250/post' },
    { tier: 'Micro (10K-50K)', followers: '10,000-50,000', rate: '$250-$1,000/post' },
    { tier: 'Mid-Tier (50K-250K)', followers: '50,000-250,000', rate: '$1,000-$5,000/post' },
    { tier: 'Macro (250K-1M)', followers: '250,000-1M', rate: '$5,000-$15,000/post' },
    { tier: 'Mega (1M+)', followers: '1,000,000+', rate: '$15,000-$100K+/post' },
  ];

  const outreachTemplate = `Hey ${creator || '[Creator Name]'},

I'm [Your Name] from ${brand || '[Brand]'}. We love your content on ${niche || 'your niche'} — especially [reference a specific recent post].

We're looking for a ${collabType.toLowerCase()} partner on ${platform} and think your audience would genuinely benefit from our [product/service].

Quick details:
- Type: ${collabType}
- Budget: ${budget}
- Timeline: Flexible, ideally within the next 2-3 weeks
- Creative freedom: Fully yours within brand guidelines

Would you be open to a quick call to discuss? No pressure either way.

Best,
[Your Name]`;

  return {
    briefSections,
    deliverables,
    dosAndDonts: {
      dos: [
        'Give creators creative freedom — their audience trusts their voice',
        'Reference specific content you liked in outreach (shows you did homework)',
        'Include clear deadlines and revision limits in the brief',
        'Provide product samples/access well before the content deadline',
        'Track UTM links and unique discount codes for attribution',
      ],
      donts: [
        'Don\'t send the same template to 50 creators — personalize each outreach',
        'Don\'t demand word-for-word scripts — it kills authenticity',
        'Don\'t expect free content — even nano-influencers deserve compensation',
        'Don\'t ask for usage rights without paying extra for them',
        'Don\'t ghost after the campaign — long-term relationships perform 3x better',
      ],
    },
    pricingGuide,
    outreachTemplate,
    negotiationTips: [
      'Start with your ideal rate, not your floor — leave room to negotiate',
      'Bundle deliverables: "1 post + 3 Stories + usage rights" is stronger than per-item pricing',
      'Offer performance bonuses: base rate + bonus if engagement exceeds benchmark',
      'Lock in multi-post deals at a discount — better for both parties',
      'Always get it in writing — even a simple email confirmation protects everyone',
    ],
    legalChecklist: [
      'FTC disclosure: #ad or #sponsored must be clearly visible (not hidden in hashtag soup)',
      'Contract: payment terms, deliverables, deadlines, revision limits, kill fee',
      'Usage rights: specify duration, channels, and whether paid ads are included',
      'Exclusivity clause: clarify competitor restrictions and duration',
      'Content ownership: who owns the content after the campaign?',
      'Cancellation terms: what happens if either party needs to back out?',
    ],
    kpis: [
      { metric: 'Engagement Rate', target: `>${platform === 'TikTok' ? '5%' : '3%'} on sponsored content` },
      { metric: 'Reach/Impressions', target: `${collabType === 'Giveaway/Contest' ? '3-5x' : '1.5-2x'} follower count` },
      { metric: 'Click-Through Rate', target: '>2% on link/CTA' },
      { metric: 'Cost Per Engagement', target: `<$${budget === '$100-$500' ? '0.50' : budget === '$500-$2K' ? '0.30' : '0.20'}` },
      { metric: 'Brand Sentiment', target: 'Positive comments > 80% on collab post' },
    ],
  };
}

export default function CollabBriefPage() {
  const [platform, setPlatform] = useState<string>('Instagram');
  const [collabType, setCollabType] = useState<string>('Sponsored Post');
  const [brand, setBrand] = useState('');
  const [creator, setCreator] = useState('');
  const [budget, setBudget] = useState<string>('$500-$2K');
  const [goal, setGoal] = useState('');
  const [niche, setNiche] = useState('');
  const [result, setResult] = useState<BriefResult | null>(null);

  const handleGenerate = () => {
    setResult(generateBrief(platform, collabType, brand.trim(), creator.trim(), budget, goal.trim(), niche.trim()));
  };

  return (
    <main className="min-h-screen bg-zinc-950 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Collaboration Brief Generator</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Create professional collaboration briefs for influencer partnerships. Includes deliverables, pricing guides, outreach templates, and legal checklists.</p>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div><label className="block text-sm text-zinc-400 mb-1">Platform</label><select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">{platforms.map(p => <option key={p}>{p}</option>)}</select></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Collaboration Type</label><select value={collabType} onChange={e => setCollabType(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">{collabTypes.map(t => <option key={t}>{t}</option>)}</select></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Budget Range</label><select value={budget} onChange={e => setBudget(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">{budgetRanges.map(b => <option key={b}>{b}</option>)}</select></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Brand Name</label><input type="text" value={brand} onChange={e => setBrand(e.target.value)} placeholder="e.g., PostCraft AI" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600" /></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Creator Name</label><input type="text" value={creator} onChange={e => setCreator(e.target.value)} placeholder="e.g., @creator_handle" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600" /></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Niche</label><input type="text" value={niche} onChange={e => setNiche(e.target.value)} placeholder="e.g., Social Media Marketing" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600" /></div>
        </div>
        <div className="mb-6"><label className="block text-sm text-zinc-400 mb-1">Campaign Goal</label><input type="text" value={goal} onChange={e => setGoal(e.target.value)} placeholder="e.g., Drive 500 signups to our free trial" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600" /></div>

        <button onClick={handleGenerate} className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition">Generate Brief</button>

        {result && (
          <div className="mt-10 space-y-6">
            {result.briefSections.map((s, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-zinc-300">{s.content}</p>
              </div>
            ))}

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Deliverables</h3>
              {result.deliverables.map((d, i) => (
                <div key={i} className="flex justify-between items-start bg-zinc-800 rounded-lg p-3 mb-2">
                  <div><span className="text-white text-sm">{d.item}</span><p className="text-xs text-zinc-500">{d.specs}</p></div>
                  <span className="text-xs text-violet-400 whitespace-nowrap ml-3">{d.deadline}</span>
                </div>
              ))}
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Outreach Template</h3>
              <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-sans bg-zinc-800 rounded-lg p-4">{result.outreachTemplate}</pre>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-zinc-900 border border-green-500/20 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-green-400 mb-3">Do</h3>
                <ul className="space-y-2">{result.dosAndDonts.dos.map((d, i) => <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-green-400">✓</span>{d}</li>)}</ul>
              </div>
              <div className="bg-zinc-900 border border-red-500/20 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-red-400 mb-3">Don&apos;t</h3>
                <ul className="space-y-2">{result.dosAndDonts.donts.map((d, i) => <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-red-400">✕</span>{d}</li>)}</ul>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Influencer Pricing Guide 2026</h3>
              {result.pricingGuide.map((p, i) => (
                <div key={i} className="flex justify-between items-center bg-zinc-800 rounded-lg p-3 mb-2">
                  <div><span className="text-white text-sm font-medium">{p.tier}</span><p className="text-xs text-zinc-500">{p.followers}</p></div>
                  <span className="text-green-400 text-sm font-medium">{p.rate}</span>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">KPIs</h3>
                {result.kpis.map((k, i) => <div key={i} className="flex justify-between mb-2"><span className="text-sm text-zinc-400">{k.metric}</span><span className="text-sm text-white">{k.target}</span></div>)}
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Legal Checklist</h3>
                <ul className="space-y-2">{result.legalChecklist.map((l, i) => <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-fuchsia-400">☐</span>{l}</li>)}</ul>
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-zinc-400 mb-3">Related Tools</h3>
              <div className="flex flex-wrap gap-2 text-sm">
                <a href="/influencer-score" className="text-violet-400 hover:text-violet-300 underline">Influencer Score</a>
                <a href="/roi-calculator" className="text-violet-400 hover:text-violet-300 underline">ROI Calculator</a>
                <a href="/brand-voice" className="text-violet-400 hover:text-violet-300 underline">Brand Voice</a>
                <a href="/ugc-manager" className="text-violet-400 hover:text-violet-300 underline">UGC Manager</a>
                <a href="/compliance-checker" className="text-violet-400 hover:text-violet-300 underline">Compliance Checker</a>
                <a href="/content-calendar" className="text-violet-400 hover:text-violet-300 underline">Content Calendar</a>
              </div>
            </div>
          </div>
        )}

        <footer className="mt-20 border-t border-zinc-800 pt-8 pb-12">
          <div className="grid md:grid-cols-4 gap-8 text-sm text-zinc-500">
            <div><h4 className="font-semibold text-white mb-3">Creation</h4><ul className="space-y-1"><li><a href="/" className="hover:text-white transition">Posts</a></li><li><a href="/carousel-generator" className="hover:text-white transition">Carousel</a></li><li><a href="/story-planner" className="hover:text-white transition">Stories</a></li><li><a href="/video-scripts" className="hover:text-white transition">Video Scripts</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Partnerships</h4><ul className="space-y-1"><li><a href="/collab-brief" className="hover:text-white transition">Collab Brief</a></li><li><a href="/influencer-score" className="hover:text-white transition">Influencer Score</a></li><li><a href="/ugc-manager" className="hover:text-white transition">UGC Manager</a></li><li><a href="/roi-calculator" className="hover:text-white transition">ROI</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Analytics</h4><ul className="space-y-1"><li><a href="/growth-calculator" className="hover:text-white transition">Growth</a></li><li><a href="/content-scorecard" className="hover:text-white transition">Score Card</a></li><li><a href="/engagement-calculator" className="hover:text-white transition">Engagement</a></li><li><a href="/sentiment-analyzer" className="hover:text-white transition">Sentiment</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Strategy</h4><ul className="space-y-1"><li><a href="/brand-voice" className="hover:text-white transition">Brand Voice</a></li><li><a href="/content-calendar" className="hover:text-white transition">Calendar</a></li><li><a href="/campaign" className="hover:text-white transition">Campaign</a></li><li><a href="/competitor-analysis" className="hover:text-white transition">Competitors</a></li></ul></div>
          </div>
          <p className="text-center text-zinc-600 text-xs mt-8">© 2026 PostCraft AI. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
