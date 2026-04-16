'use client';
import { useState } from 'react';

const proofTypes = ['Customer Testimonial', 'Case Study Snippet', 'Stats/Numbers', 'Before/After', 'Social Mention/Quote', 'Award/Recognition', 'User Count/Milestone', 'Expert Endorsement'] as const;
const platforms = ['Website', 'Instagram', 'LinkedIn', 'Twitter/X', 'TikTok', 'Email', 'Landing Page'] as const;
const industries = ['SaaS/Tech', 'E-commerce', 'Coaching/Consulting', 'Health/Wellness', 'Finance', 'Education', 'Agency', 'Creator/Influencer', 'Real Estate', 'General'] as const;

interface ProofResult {
  proofs: { type: string; text: string; placement: string; designTip: string }[];
  collectionStrategies: string[];
  displayPatterns: { pattern: string; bestFor: string; example: string }[];
  psychologyTips: string[];
  platformSpecific: string[];
  metrics: { name: string; value: string }[];
}

function generateSocialProof(
  proofType: string, platform: string, industry: string,
  productName: string, metric: string, customerName: string
): ProofResult {
  const typeTemplates: Record<string, { texts: string[]; placement: string }> = {
    'Customer Testimonial': {
      texts: [
        `"${productName || 'This tool'} completely changed how I ${industry === 'SaaS/Tech' ? 'manage my workflow' : 'run my business'}. ${metric || 'Saved 10 hours/week'} in the first month." — ${customerName || 'Sarah K., Marketing Director'}`,
        `"I was skeptical at first, but after ${metric || '2 weeks'} I can't imagine going back. ${productName || 'This'} is the real deal." — ${customerName || 'James M., Founder'}`,
        `"Finally, something that actually works. ${metric || '3x more leads'} since we started using ${productName || 'this'}." — ${customerName || 'Rachel T., CEO'}`,
      ],
      placement: 'Above the fold on landing pages, near CTAs, in email sequences',
    },
    'Case Study Snippet': {
      texts: [
        `${customerName || 'Company X'} increased ${metric || 'revenue by 40%'} in 90 days using ${productName || 'our solution'}. Here's how →`,
        `From ${metric || '0 to $50K MRR'} in 6 months: How ${customerName || 'a solo founder'} used ${productName || 'our tool'} to scale`,
        `"We tried everything else first." How ${customerName || 'Brand Y'} finally achieved ${metric || '10x ROI'} with ${productName || 'our approach'}`,
      ],
      placement: 'Dedicated section on homepage, pricing page sidebar, blog',
    },
    'Stats/Numbers': {
      texts: [
        `${metric || '10,000+'} ${industry === 'SaaS/Tech' ? 'teams' : 'users'} trust ${productName || 'us'} to ${industry === 'E-commerce' ? 'grow their sales' : 'streamline their workflow'}`,
        `${metric || '4.9/5'} average rating from ${industry === 'SaaS/Tech' ? '2,000+ reviews on G2' : '500+ verified customers'}`,
        `${metric || '50M+'} ${industry === 'Creator/Influencer' ? 'posts generated' : 'tasks completed'} and counting`,
      ],
      placement: 'Hero section, above pricing, email subject lines, ad copy',
    },
    'Before/After': {
      texts: [
        `Before ${productName || 'us'}: ${metric || '5 hours/day on manual tasks'}. After: ${metric || '30 minutes with automation'}. That's ${industry === 'Agency' ? 'time back for your clients' : 'your life back'}.`,
        `Before: "${metric || 'I was posting randomly and hoping for the best'}." After: "${metric || 'Consistent 5% engagement with a system that works'}."`,
        `${customerName || 'Their team'} went from ${metric || 'struggling with 2% conversion'} to ${metric || '8.5% conversion in 60 days'}. The difference? ${productName || 'A proven system'}.`,
      ],
      placement: 'Landing page comparison section, carousel posts, case study pages',
    },
    'Social Mention/Quote': {
      texts: [
        `"Just discovered ${productName || '@brand'} and it's a game-changer for ${industry === 'Creator/Influencer' ? 'content creation' : 'our team'}. ${metric || 'Wish I found this sooner'}." — @user on ${platform}`,
        `"${productName || 'This tool'} just saved me ${metric || '3 hours'}. Not an ad, just genuinely impressed." — organic mention on ${platform}`,
        `"If you're not using ${productName || 'this'} yet, you're working too hard. ${metric || 'Seriously.'}" — @user_handle`,
      ],
      placement: 'Social media feed, website testimonial wall, retweeted/reshared',
    },
    'User Count/Milestone': {
      texts: [
        `Join ${metric || '10,000+'} ${industry === 'Creator/Influencer' ? 'creators' : 'professionals'} who use ${productName || 'our tool'} daily`,
        `${metric || '1 million'} ${industry === 'SaaS/Tech' ? 'API calls' : 'actions'} processed this month. Thank you for trusting us.`,
        `We just hit ${metric || '50K users'}! 🎉 From 0 to ${metric || '50K'} in ${industry === 'SaaS/Tech' ? '18 months' : '2 years'} — and it's just the beginning.`,
      ],
      placement: 'Hero section, milestone post on social, email announcement',
    },
    'Award/Recognition': {
      texts: [
        `${productName || 'Product'}: #1 on Product Hunt | Featured in TechCrunch | ${metric || '4.8★ on G2'}`,
        `Rated "${metric || 'Best in Category'}" by ${industry === 'SaaS/Tech' ? 'G2, Capterra, and TrustRadius' : 'industry experts'} — 2026`,
        `${metric || 'Winner'}: ${industry === 'SaaS/Tech' ? 'SaaS Awards 2026' : 'Industry Innovation Award'} for ${productName || 'our platform'}`,
      ],
      placement: 'Logo bar on homepage, pricing page trust badges, email signatures',
    },
    'Expert Endorsement': {
      texts: [
        `"${productName || 'This'} is what I recommend to every ${industry === 'Agency' ? 'client' : 'founder'} I advise." — ${customerName || 'Industry Expert, 100K followers'}`,
        `Featured in ${customerName || 'Expert'}'s "Top 10 ${industry} Tools for 2026" roundup`,
        `"The team at ${productName || 'this company'} understands ${industry === 'Creator/Influencer' ? 'creators' : 'the market'} better than anyone." — ${customerName || 'Thought Leader'}`,
      ],
      placement: 'Homepage below hero, about page, PR section',
    },
  };

  const template = typeTemplates[proofType] || typeTemplates['Customer Testimonial'];
  const proofs = template.texts.map(text => ({
    type: proofType,
    text,
    placement: template.placement,
    designTip: proofType === 'Stats/Numbers' ? 'Use large, bold numbers with supporting text below' : proofType === 'Customer Testimonial' ? 'Add a real photo and job title — increases trust by 35%' : 'Keep it visual — screenshots and logos > text alone',
  }));

  return {
    proofs,
    collectionStrategies: [
      'Set up an automated post-purchase email asking for a review (day 7 and day 30)',
      'Screenshot and save every positive DM, comment, and mention — build a swipe file',
      'Offer a small incentive (discount, feature) for detailed video testimonials',
      'Create a dedicated #hashtag for users to share their results',
      'After a support ticket is resolved positively, ask for a testimonial within 24h',
      'Use tools like Testimonial.to or Senja to collect video testimonials at scale',
    ],
    displayPatterns: [
      { pattern: 'Logo Bar', bestFor: 'B2B, SaaS — show "trusted by" logos', example: 'Row of 5-8 client logos below hero section' },
      { pattern: 'Testimonial Carousel', bestFor: 'Any — rotating quotes with photos', example: '3-card carousel with quote, name, photo, star rating' },
      { pattern: 'Numbers Strip', bestFor: 'High-volume products — show scale', example: '"10K+ users • 4.9★ rating • 50M posts generated"' },
      { pattern: 'Case Study Card', bestFor: 'High-ticket — show ROI', example: 'Before/after with specific metrics and CTA to full case study' },
      { pattern: 'Wall of Love', bestFor: 'Creators, communities — show volume', example: 'Masonry grid of tweets/comments/screenshots from real users' },
    ],
    psychologyTips: [
      'Specificity beats superlatives: "Saved 4.2 hours/week" > "Amazing time saver"',
      'Show faces — testimonials with photos get 35% more trust than text-only',
      'Odd numbers feel more authentic: "4,827 users" > "5,000+ users"',
      'Place social proof NEAR the decision point (next to CTA, on pricing page)',
      'Fresh > old: update testimonials quarterly to show the product is actively loved',
      'Negative-turned-positive is powerful: "I was skeptical, but..."',
    ],
    platformSpecific: platform === 'Website'
      ? ['Place testimonials above the fold AND near every CTA', 'Use a "Wall of Love" page for SEO (long-tail social proof keywords)', 'Add structured data (Review schema) for Google rich snippets']
      : platform === 'Instagram'
      ? ['Create a Highlights reel called "Reviews" or "Results"', 'Reshare user mentions to Stories with "Thank you" stickers', 'Use carousel posts for before/after case studies']
      : ['Share user testimonials as native posts — they outperform promotional content', 'Quote-tweet/share real user mentions with your commentary', 'Pin your best testimonial post to your profile'],
    metrics: [
      { name: 'Trust increase with social proof', value: '+270% conversion rate' },
      { name: 'Testimonials with photos', value: '+35% trust vs text-only' },
      { name: 'Specific numbers vs vague claims', value: '+83% believability' },
      { name: 'Video testimonials vs written', value: '+25% conversion lift' },
      { name: 'Social proof near CTA', value: '+15% click-through rate' },
    ],
  };
}

export default function SocialProofPage() {
  const [proofType, setProofType] = useState<string>('Customer Testimonial');
  const [platform, setPlatform] = useState<string>('Website');
  const [industry, setIndustry] = useState<string>('SaaS/Tech');
  const [productName, setProductName] = useState('');
  const [metric, setMetric] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [result, setResult] = useState<ProofResult | null>(null);

  const handleGenerate = () => {
    setResult(generateSocialProof(proofType, platform, industry, productName.trim(), metric.trim(), customerName.trim()));
  };

  return (
    <main className="min-h-screen bg-zinc-950 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Social Proof Generator</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Create compelling social proof that converts. Social proof increases conversion rates by <strong className="text-white">up to 270%</strong> — the most underused growth lever.</p>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div><label className="block text-sm text-zinc-400 mb-1">Proof Type</label><select value={proofType} onChange={e => setProofType(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">{proofTypes.map(t => <option key={t}>{t}</option>)}</select></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Display Platform</label><select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">{platforms.map(p => <option key={p}>{p}</option>)}</select></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Industry</label><select value={industry} onChange={e => setIndustry(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">{industries.map(i => <option key={i}>{i}</option>)}</select></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Product/Brand Name</label><input type="text" value={productName} onChange={e => setProductName(e.target.value)} placeholder="e.g., PostCraft AI" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600" /></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Key Metric</label><input type="text" value={metric} onChange={e => setMetric(e.target.value)} placeholder="e.g., 10x more leads, saved $5K/mo" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600" /></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Customer/Source Name</label><input type="text" value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder="e.g., Sarah K., CEO at Acme" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600" /></div>
        </div>

        <button onClick={handleGenerate} className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition">Generate Social Proof</button>

        {result && (
          <div className="mt-10 space-y-6">
            <h2 className="text-2xl font-bold text-white">Generated Proof</h2>
            {result.proofs.map((p, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <p className="text-white text-lg mb-2">{p.text}</p>
                <div className="flex gap-4 text-xs text-zinc-500"><span>Placement: {p.placement}</span></div>
                <p className="text-xs text-violet-400 mt-2">{p.designTip}</p>
              </div>
            ))}

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Collection Strategies</h3>
                <ul className="space-y-2">{result.collectionStrategies.map((s, i) => <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-green-400">{i + 1}.</span>{s}</li>)}</ul>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Psychology of Proof</h3>
                <ul className="space-y-2">{result.psychologyTips.map((t, i) => <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-violet-400">•</span>{t}</li>)}</ul>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Display Patterns</h3>
              {result.displayPatterns.map((p, i) => (
                <div key={i} className="bg-zinc-800 rounded-lg p-3 mb-2">
                  <div className="flex justify-between"><span className="text-white text-sm font-medium">{p.pattern}</span><span className="text-xs text-violet-400">{p.bestFor}</span></div>
                  <p className="text-xs text-zinc-500 mt-1">{p.example}</p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Impact Metrics</h3>
                {result.metrics.map((m, i) => <div key={i} className="flex justify-between mb-2"><span className="text-sm text-zinc-400">{m.name}</span><span className="text-sm text-green-400 font-medium">{m.value}</span></div>)}
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Platform Tips</h3>
                <ul className="space-y-2">{result.platformSpecific.map((t, i) => <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-fuchsia-400">→</span>{t}</li>)}</ul>
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-zinc-400 mb-3">Related Tools</h3>
              <div className="flex flex-wrap gap-2 text-sm">
                <a href="/collab-brief" className="text-violet-400 hover:text-violet-300 underline">Collab Brief</a>
                <a href="/cta-generator" className="text-violet-400 hover:text-violet-300 underline">CTA Generator</a>
                <a href="/brand-voice" className="text-violet-400 hover:text-violet-300 underline">Brand Voice</a>
                <a href="/ugc-manager" className="text-violet-400 hover:text-violet-300 underline">UGC Manager</a>
                <a href="/roi-calculator" className="text-violet-400 hover:text-violet-300 underline">ROI Calculator</a>
                <a href="/content-scorecard" className="text-violet-400 hover:text-violet-300 underline">Content Score</a>
              </div>
            </div>
          </div>
        )}

        <footer className="mt-20 border-t border-zinc-800 pt-8 pb-12">
          <div className="grid md:grid-cols-4 gap-8 text-sm text-zinc-500">
            <div><h4 className="font-semibold text-white mb-3">Creation</h4><ul className="space-y-1"><li><a href="/" className="hover:text-white transition">Posts</a></li><li><a href="/carousel-generator" className="hover:text-white transition">Carousel</a></li><li><a href="/story-planner" className="hover:text-white transition">Stories</a></li><li><a href="/social-proof" className="hover:text-white transition">Social Proof</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Partnerships</h4><ul className="space-y-1"><li><a href="/collab-brief" className="hover:text-white transition">Collab Brief</a></li><li><a href="/influencer-score" className="hover:text-white transition">Influencer</a></li><li><a href="/ugc-manager" className="hover:text-white transition">UGC</a></li><li><a href="/competitor-analysis" className="hover:text-white transition">Competitors</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Analytics</h4><ul className="space-y-1"><li><a href="/growth-calculator" className="hover:text-white transition">Growth</a></li><li><a href="/content-scorecard" className="hover:text-white transition">Score Card</a></li><li><a href="/engagement-calculator" className="hover:text-white transition">Engagement</a></li><li><a href="/roi-calculator" className="hover:text-white transition">ROI</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Strategy</h4><ul className="space-y-1"><li><a href="/brand-voice" className="hover:text-white transition">Brand Voice</a></li><li><a href="/content-calendar" className="hover:text-white transition">Calendar</a></li><li><a href="/campaign" className="hover:text-white transition">Campaign</a></li><li><a href="/ab-testing" className="hover:text-white transition">A/B Testing</a></li></ul></div>
          </div>
          <p className="text-center text-zinc-600 text-xs mt-8">© 2026 PostCraft AI. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
