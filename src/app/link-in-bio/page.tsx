'use client';
import { useState } from 'react';

const platforms = ['Instagram', 'TikTok', 'Twitter/X', 'LinkedIn', 'YouTube', 'Multi-Platform'] as const;
const bioStyles = ['Minimalist', 'Creator/Influencer', 'Business/SaaS', 'E-commerce/Shop', 'Portfolio/Creative', 'Personal Brand'] as const;
const linkCategories = ['Lead Magnet', 'Product/Service', 'Social Profile', 'Latest Content', 'Newsletter', 'Booking/Calendar', 'Shop/Store', 'Community/Discord', 'Free Resource', 'Case Study/Portfolio'] as const;

interface BioLink {
  label: string;
  url: string;
  category: string;
  priority: number;
  emoji: string;
  ctaTip: string;
}

interface LinkInBioResult {
  headline: string;
  subheadline: string;
  links: BioLink[];
  layoutTips: string[];
  conversionTips: string[];
  platformSpecific: string;
  analyticsSetup: string[];
  alternativeTools: { name: string; bestFor: string; pricing: string }[];
  seoTips: string[];
}

function generateLinkInBio(
  platform: string, niche: string, style: string, selectedCategories: string[],
  name: string, tagline: string
): LinkInBioResult {
  const styleTemplates: Record<string, { headlineFormat: string; subFormat: string; accentNote: string }> = {
    'Minimalist': { headlineFormat: name || 'Your Name', subFormat: tagline || 'One line that says it all.', accentNote: 'Clean, single accent color, lots of white space' },
    'Creator/Influencer': { headlineFormat: `${name || 'Creator'} ✨`, subFormat: tagline || 'Creating content that matters', accentNote: 'Vibrant colors, avatar prominent, personality-driven' },
    'Business/SaaS': { headlineFormat: name || 'Company Name', subFormat: tagline || 'The tool that does X for Y', accentNote: 'Professional, brand colors, trust badges' },
    'E-commerce/Shop': { headlineFormat: `${name || 'Brand'} 🛍`, subFormat: tagline || 'Shop the latest collection', accentNote: 'Product imagery, sale badges, urgency elements' },
    'Portfolio/Creative': { headlineFormat: name || 'Creative Name', subFormat: tagline || 'Design • Photo • Brand', accentNote: 'Showcase-style, large imagery, minimal text' },
    'Personal Brand': { headlineFormat: name || 'Your Name', subFormat: tagline || 'Helping X achieve Y', accentNote: 'Professional headshot, clear value proposition, credibility markers' },
  };

  const st = styleTemplates[style] || styleTemplates['Minimalist'];

  const categoryLinks: Record<string, BioLink> = {
    'Lead Magnet': { label: 'Free [Resource] →', url: '/free-guide', category: 'Lead Magnet', priority: 1, emoji: '🎁', ctaTip: 'This should be your #1 link — email capture is the most valuable action' },
    'Product/Service': { label: 'Get [Product] — Try Free', url: '/product', category: 'Product/Service', priority: 2, emoji: '🚀', ctaTip: 'Include social proof ("Used by 10K+") next to the link' },
    'Social Profile': { label: 'Follow on [Platform]', url: '/social', category: 'Social Profile', priority: 7, emoji: '👋', ctaTip: 'Cross-pollinate followers. Link your fastest-growing platform' },
    'Latest Content': { label: 'New: [Latest Post Title]', url: '/latest', category: 'Latest Content', priority: 3, emoji: '🔥', ctaTip: 'Update this weekly — fresh content link = higher CTR' },
    'Newsletter': { label: 'Join [X]K subscribers', url: '/newsletter', category: 'Newsletter', priority: 2, emoji: '📧', ctaTip: 'Show subscriber count for social proof. "Join 12K creators" > "Subscribe"' },
    'Booking/Calendar': { label: 'Book a Call', url: '/book', category: 'Booking/Calendar', priority: 4, emoji: '📅', ctaTip: 'Use Calendly/Cal.com — reduce friction to zero' },
    'Shop/Store': { label: 'Shop Now — [X]% Off', url: '/shop', category: 'Shop/Store', priority: 3, emoji: '🛒', ctaTip: 'Always have a current offer or urgency element' },
    'Community/Discord': { label: 'Join the Community ([X] members)', url: '/community', category: 'Community/Discord', priority: 5, emoji: '💬', ctaTip: 'Show member count. "Join 5K creators" converts better than just "Join us"' },
    'Free Resource': { label: 'Free [Template/Toolkit/Course]', url: '/free', category: 'Free Resource', priority: 2, emoji: '✅', ctaTip: 'Lead with value. Free resources build trust and capture emails' },
    'Case Study/Portfolio': { label: 'See My Work / Results', url: '/work', category: 'Case Study/Portfolio', priority: 6, emoji: '📊', ctaTip: 'Show outcomes ("Grew X by 300%"), not just deliverables' },
  };

  const links = selectedCategories
    .map(cat => categoryLinks[cat])
    .filter(Boolean)
    .sort((a, b) => a.priority - b.priority)
    .map(link => ({
      ...link,
      label: link.label.replace('[Resource]', niche || 'Guide').replace('[Product]', niche || 'Product').replace('[Platform]', platform).replace('[Latest Post Title]', `${niche} Strategy 2026`).replace('[X]K', '10K').replace('[X]', '20').replace('[Template/Toolkit/Course]', `${niche} Toolkit`),
    }));

  const platformTips: Record<string, string> = {
    'Instagram': 'Instagram allows one clickable link in bio. Use Linktree/Stan Store/your own page. Update the link when you mention "link in bio" in Stories.',
    'TikTok': 'TikTok bio link requires 1K followers for clickable link. Use a URL shortener with tracking. Pin a comment with the link on key videos.',
    'Twitter/X': 'Twitter allows one bio link + pinned tweet link. Use both strategically. Change pinned tweet to match your current campaign.',
    'LinkedIn': 'LinkedIn allows a website link + featured section (up to 6 items). Use featured section for your top resources.',
    'YouTube': 'YouTube allows links on channel page + video descriptions. First link in description gets most clicks. Use channel banner for primary CTA.',
    'Multi-Platform': 'Use a universal landing page that works across all platforms. Track UTM parameters per platform to measure which drives the most conversions.',
  };

  const conversionTips = [
    'Keep 5-7 links maximum — more choices = fewer clicks (paradox of choice)',
    'Put your highest-value link first (lead magnet or main product)',
    'Update your "Latest Content" link weekly for returning visitors',
    'Use action verbs: "Get", "Join", "Download", "Book" — not "Click here"',
    'Add social proof numbers: "Join 10K+", "Used by 5K creators", "4.9★ rated"',
    'Test link order monthly — your audience\'s priorities change',
    'Add urgency when appropriate: "Limited spots", "Sale ends Friday"',
  ];

  const layoutTips = [
    `Style: ${st.accentNote}`,
    'Profile photo: clear headshot or logo (not a landscape photo cropped)',
    'Headline: max 5 words — name or brand, not a tagline',
    'Subheadline: your value proposition in one sentence',
    'Buttons: consistent sizing, enough contrast to read, adequate spacing',
    'Mobile-first: 85%+ of link-in-bio traffic comes from mobile',
    'Load speed matters: under 2 seconds or you lose 30% of clicks',
  ];

  const analyticsSetup = [
    'Add UTM parameters to every link: ?utm_source=linkinbio&utm_medium=social&utm_campaign=[platform]',
    'Use a link-in-bio tool with built-in analytics (Stan Store, Beacons, or custom)',
    'Track: CTR per link, total page views, conversion rate, top referrer platform',
    'Set up Google Analytics goals for each key action (email signup, purchase, booking)',
    'Review analytics weekly — kill underperforming links, promote winners',
  ];

  const alternativeTools = [
    { name: 'Linktree', bestFor: 'Simple, free tier, most popular', pricing: 'Free / $5-24/mo' },
    { name: 'Stan Store', bestFor: 'Selling digital products + link page', pricing: '$29/mo' },
    { name: 'Beacons', bestFor: 'Creators — media kit + email capture + links', pricing: 'Free / $10-30/mo' },
    { name: 'Carrd', bestFor: 'Custom design — full landing page control', pricing: '$9-49/year' },
    { name: 'Custom (Next.js)', bestFor: 'Full control, own domain, SEO benefits', pricing: '$0 (self-hosted)' },
  ];

  return {
    headline: st.headlineFormat,
    subheadline: st.subFormat,
    links,
    layoutTips,
    conversionTips,
    platformSpecific: platformTips[platform] || platformTips['Multi-Platform'],
    analyticsSetup,
    alternativeTools,
    seoTips: [
      'Use your own domain (yourbrand.com/links) for SEO juice instead of linktree URLs',
      'Add meta title and description to your link page',
      'Include your target keyword in the page title',
      'A custom domain builds brand trust vs a third-party URL',
    ],
  };
}

export default function LinkInBioPage() {
  const [platform, setPlatform] = useState<string>('Instagram');
  const [niche, setNiche] = useState('');
  const [style, setStyle] = useState<string>('Personal Brand');
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [categories, setCategories] = useState<string[]>(['Lead Magnet', 'Latest Content', 'Newsletter', 'Product/Service', 'Community/Discord']);
  const [result, setResult] = useState<LinkInBioResult | null>(null);

  const toggleCategory = (cat: string) => {
    setCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  };

  const handleGenerate = () => {
    if (categories.length === 0) return;
    setResult(generateLinkInBio(platform, niche.trim(), style, categories, name.trim(), tagline.trim()));
  };

  return (
    <main className="min-h-screen bg-zinc-950 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Link in Bio Builder</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Optimize your link-in-bio page for maximum conversions. <strong className="text-white">The average bio link gets 2-5% CTR</strong> — our framework pushes it to 8-12%.</p>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Primary Platform</label>
            <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {platforms.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Page Style</label>
            <select value={style} onChange={e => setStyle(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {bioStyles.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Niche / Industry</label>
            <input type="text" value={niche} onChange={e => setNiche(e.target.value)} placeholder="e.g., Social Media Marketing" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600" />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Your Name / Brand</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g., PostCraft AI" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-zinc-400 mb-1">Tagline / Value Prop</label>
            <input type="text" value={tagline} onChange={e => setTagline(e.target.value)} placeholder="e.g., Helping creators grow 10x faster with AI" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600" />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-zinc-400 mb-2">Link Categories (select 3-7)</label>
          <div className="flex flex-wrap gap-2">
            {linkCategories.map(cat => (
              <button key={cat} onClick={() => toggleCategory(cat)} className={`px-3 py-1.5 rounded-lg text-sm transition ${categories.includes(cat) ? 'bg-violet-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <button onClick={handleGenerate} className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition">
          Build Link Page
        </button>

        {result && (
          <div className="mt-10 space-y-6">
            {/* Preview */}
            <div className="bg-zinc-900 border border-violet-500/30 rounded-2xl p-8 max-w-sm mx-auto">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl font-bold text-white">
                  {(result.headline[0] || 'P').toUpperCase()}
                </div>
                <h2 className="text-xl font-bold text-white">{result.headline}</h2>
                <p className="text-sm text-zinc-400 mt-1">{result.subheadline}</p>
              </div>
              <div className="space-y-3">
                {result.links.map((link, i) => (
                  <div key={i} className="bg-zinc-800 hover:bg-zinc-700 rounded-xl py-3 px-4 text-center cursor-pointer transition">
                    <span className="text-white text-sm">{link.emoji} {link.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Link Strategy */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Link Strategy</h3>
              <div className="space-y-3">
                {result.links.map((link, i) => (
                  <div key={i} className="flex justify-between items-start bg-zinc-800 rounded-lg p-3">
                    <div>
                      <span className="text-white text-sm">{link.emoji} {link.label}</span>
                      <p className="text-xs text-zinc-500 mt-1">{link.ctaTip}</p>
                    </div>
                    <span className="text-xs text-violet-400 whitespace-nowrap ml-3">Priority #{link.priority}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Conversion Tips</h3>
                <ul className="space-y-2">{result.conversionTips.map((t, i) => <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-green-400">✓</span>{t}</li>)}</ul>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Layout Tips</h3>
                <ul className="space-y-2">{result.layoutTips.map((t, i) => <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-violet-400">•</span>{t}</li>)}</ul>
              </div>
            </div>

            {/* Platform + Analytics */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-2">Platform Specific</h3>
              <p className="text-zinc-300 text-sm">{result.platformSpecific}</p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Analytics Setup</h3>
              <ul className="space-y-2">{result.analyticsSetup.map((a, i) => <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-fuchsia-400">{i + 1}.</span>{a}</li>)}</ul>
            </div>

            {/* Tools Comparison */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Link-in-Bio Tools</h3>
              <div className="space-y-2">
                {result.alternativeTools.map((tool, i) => (
                  <div key={i} className="flex justify-between items-center bg-zinc-800 rounded-lg p-3">
                    <div><span className="text-white text-sm font-medium">{tool.name}</span><p className="text-xs text-zinc-500">{tool.bestFor}</p></div>
                    <span className="text-xs text-zinc-400">{tool.pricing}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Internal Links */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-zinc-400 mb-3">Optimize Your Bio</h3>
              <div className="flex flex-wrap gap-2 text-sm">
                <a href="/bios" className="text-violet-400 hover:text-violet-300 underline">Bio Generator</a>
                <a href="/cta-generator" className="text-violet-400 hover:text-violet-300 underline">CTA Generator</a>
                <a href="/brand-voice" className="text-violet-400 hover:text-violet-300 underline">Brand Voice</a>
                <a href="/social-audit" className="text-violet-400 hover:text-violet-300 underline">Social Audit</a>
                <a href="/engagement-calculator" className="text-violet-400 hover:text-violet-300 underline">Engagement Calculator</a>
                <a href="/roi-calculator" className="text-violet-400 hover:text-violet-300 underline">ROI Calculator</a>
              </div>
            </div>
          </div>
        )}

        {/* FAQ */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">Link in Bio FAQ</h2>
          <div className="space-y-4">
            {[
              { q: 'How many links should I have?', a: '5-7 links is the sweet spot. Fewer than 3 wastes the opportunity. More than 8 creates decision paralysis — your visitor clicks nothing. Each link should serve a distinct purpose.' },
              { q: 'Should I use Linktree or build my own?', a: 'Start with Linktree or Beacons (free tier). Once you hit 10K+ followers or are driving real revenue, build your own on your domain — you get SEO benefits, full analytics, and 100% brand control.' },
              { q: 'How often should I update my links?', a: 'Update your "latest content" link weekly. Rotate your lead magnet monthly. Review performance quarterly and kill any link with under 1% CTR.' },
              { q: 'What\'s a good CTR for link-in-bio?', a: 'Average is 2-5%. Good is 5-8%. Great is 8-12%. To improve: reduce link count, add social proof numbers, use action verbs, and update the page regularly.' },
              { q: 'Should I use a URL shortener?', a: 'Yes for tracking, but use branded shorteners (yourbrand.link) when possible. Generic bit.ly links look spammy. Most link-in-bio tools have built-in tracking, making separate shorteners unnecessary.' },
            ].map((faq, i) => (
              <details key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 group">
                <summary className="font-semibold text-white cursor-pointer">{faq.q}</summary>
                <p className="text-zinc-400 text-sm mt-2">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <footer className="mt-20 border-t border-zinc-800 pt-8 pb-12">
          <div className="grid md:grid-cols-4 gap-8 text-sm text-zinc-500">
            <div><h4 className="font-semibold text-white mb-3">Content Creation</h4><ul className="space-y-1"><li><a href="/" className="hover:text-white transition">Post Generator</a></li><li><a href="/hooks" className="hover:text-white transition">Hook Generator</a></li><li><a href="/carousel-generator" className="hover:text-white transition">Carousel</a></li><li><a href="/poll-quiz" className="hover:text-white transition">Poll & Quiz</a></li><li><a href="/comment-reply" className="hover:text-white transition">Comment Replies</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Optimization</h4><ul className="space-y-1"><li><a href="/caption-optimizer" className="hover:text-white transition">Captions</a></li><li><a href="/hashtags" className="hover:text-white transition">Hashtags</a></li><li><a href="/post-timing" className="hover:text-white transition">Post Timing</a></li><li><a href="/virality-score" className="hover:text-white transition">Virality</a></li><li><a href="/link-in-bio" className="hover:text-white transition">Link in Bio</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Analytics</h4><ul className="space-y-1"><li><a href="/engagement-calculator" className="hover:text-white transition">Engagement</a></li><li><a href="/sentiment-analyzer" className="hover:text-white transition">Sentiment</a></li><li><a href="/roi-calculator" className="hover:text-white transition">ROI</a></li><li><a href="/influencer-score" className="hover:text-white transition">Influencer</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Strategy</h4><ul className="space-y-1"><li><a href="/brand-voice" className="hover:text-white transition">Brand Voice</a></li><li><a href="/content-calendar" className="hover:text-white transition">Calendar</a></li><li><a href="/bios" className="hover:text-white transition">Bio Generator</a></li><li><a href="/campaign" className="hover:text-white transition">Campaign</a></li></ul></div>
          </div>
          <p className="text-center text-zinc-600 text-xs mt-8">© 2026 PostCraft AI. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
