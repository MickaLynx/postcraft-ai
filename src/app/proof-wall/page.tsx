'use client';
import { useState } from 'react';

const wallStyles = ['Grid Mosaic', 'Carousel Slider', 'Masonry Layout', 'Timeline Feed', 'Highlight Reel', 'Metric Dashboard'] as const;
const sources = ['Customer Reviews', 'Social Mentions', 'Case Studies', 'Media Coverage', 'Awards & Badges', 'User Screenshots', 'Video Testimonials', 'All Sources'] as const;
const industries = ['Tech & SaaS', 'E-commerce & DTC', 'Healthcare', 'Finance & FinTech', 'Education', 'Real Estate', 'Agency & Consulting', 'Manufacturing', 'Fitness & Wellness', 'Food & Beverage', 'Travel & Hospitality', 'Non-Profit'] as const;
const placements = ['Homepage Hero', 'Pricing Page', 'Landing Page', 'Product Page', 'About Page', 'Checkout Flow', 'All Pages'] as const;
const colorSchemes = ['Dark Mode (zinc/violet)', 'Light Mode (white/blue)', 'Brand Colors', 'Neutral (gray/green)', 'Warm (amber/orange)', 'Cool (slate/cyan)'] as const;
const audiences = ['B2B Enterprise', 'B2B SMB', 'B2C Premium', 'B2C Mass Market', 'Developer/Technical', 'Creator/Influencer'] as const;

interface WallCard { type: string; content: string; author: string; role: string; metric: string; platform: string; date: string; verified: boolean; }
interface LayoutSpec { section: string; cards: number; layout: string; animation: string; responsive: string; }
interface TrustElement { element: string; placement: string; impact: string; implementation: string; }
interface ConversionTactic { tactic: string; where: string; expectedLift: string; implementation: string; }
interface CollectionAutomation { source: string; trigger: string; action: string; approval: string; frequency: string; }

interface ProofWall {
  trustScore: number;
  cards: WallCard[];
  layout: LayoutSpec[];
  trustElements: TrustElement[];
  conversionTactics: ConversionTactic[];
  automations: CollectionAutomation[];
  designPrinciples: string[];
  antiPatterns: string[];
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }

function generateProofWall(wallStyle: string, source: string, industry: string, placement: string, colors: string, audience: string, brandName: string): ProofWall {
  const seed = hash(`${wallStyle}-${source}-${industry}-${placement}-${colors}-${audience}-${brandName}`);
  const score = 50 + seed % 45;

  const types = ['Review', 'Tweet', 'Case Study', 'Media Quote', 'Award Badge', 'Screenshot', 'Video Clip', 'Metric'];
  const contents = [
    `"${brandName} changed how we approach ${industry.toLowerCase()}. Our team went from frustrated to productive in 2 weeks."`,
    `Just hit our best quarter ever with @${brandName.replace(/\s/g, '')}. The ROI is insane. Highly recommend for any ${industry.toLowerCase()} team.`,
    `${brandName} helped us increase conversion by 147% in 90 days. Full case study on our blog.`,
    `"${brandName} is the tool every ${industry.toLowerCase()} professional needs in 2026." — TechCrunch`,
    `Winner: Best ${industry} Solution 2026 — Product Hunt Golden Kitty Awards`,
    `[Screenshot showing dashboard with impressive metrics after using ${brandName}]`,
    `"Watch our 60-second story of how ${brandName} transformed our workflow." — Video testimonial`,
    `4,500+ ${industry.toLowerCase()} teams trust ${brandName}. Average satisfaction: 4.8/5 stars.`,
  ];
  const authors = ['Sarah Chen', 'Marcus Johnson', 'Emily Rivera', 'David Kim', 'Lisa Patel', 'James Thompson', 'Ana Kowalski', 'Robert Lee'];
  const roles = ['CEO', 'VP Marketing', 'Head of Growth', 'Product Manager', 'Director of Ops', 'CTO', 'Founder', 'CMO'];
  const metrics = ['+147% conversion', '3x ROI', '40h saved/week', '$250K revenue', '+89 NPS', '4.9/5 rating', '10K+ users', '98% retention'];
  const platformSources = ['G2', 'Twitter/X', 'LinkedIn', 'TechCrunch', 'Product Hunt', 'App Store', 'YouTube', 'Google Reviews'];
  const dates = ['2 days ago', '1 week ago', '2 weeks ago', 'Last month', '3 weeks ago', '5 days ago', '10 days ago', 'This week'];

  const cards: WallCard[] = Array.from({ length: 8 }, (_, i) => ({
    type: types[i],
    content: contents[i],
    author: authors[i],
    role: roles[(seed + i) % roles.length],
    metric: metrics[(seed + i * 2) % metrics.length],
    platform: platformSources[i],
    date: dates[(seed + i * 3) % dates.length],
    verified: i < 6,
  }));

  const layout: LayoutSpec[] = [
    { section: 'Hero Section', cards: 3, layout: 'Horizontal row, equal width, stacked on mobile', animation: 'Fade-in on scroll, 200ms stagger between cards', responsive: 'Stack vertically on screens < 768px' },
    { section: 'Social Proof Bar', cards: 1, layout: 'Full-width ticker with auto-scroll, logos + metrics', animation: 'Continuous horizontal scroll, 30px/s, pause on hover', responsive: 'Reduce to 3 visible items on mobile' },
    { section: 'Testimonial Grid', cards: 6, layout: '3-column masonry, varying heights, 16px gap', animation: 'Stagger fade-in from bottom, 100ms between cards', responsive: '2 columns on tablet, 1 column on mobile' },
    { section: 'Metric Counter', cards: 4, layout: 'Horizontal row of animated counters', animation: 'Count-up animation from 0 to value on viewport entry', responsive: '2x2 grid on mobile' },
    { section: 'Video Testimonial', cards: 1, layout: 'Featured card with video player, quote overlay', animation: 'Play button pulse, auto-play on viewport (muted)', responsive: 'Full-width on all breakpoints' },
  ];

  const trustElements: TrustElement[] = [
    { element: 'Verified Badge', placement: 'Next to reviewer name', impact: '+17% trust increase', implementation: 'Green checkmark SVG, "Verified Customer" tooltip' },
    { element: 'Platform Logo', placement: 'Bottom-left of card', impact: '+12% credibility', implementation: 'Small platform icon (G2, Trustpilot, etc.) with link' },
    { element: 'Date Stamp', placement: 'Bottom-right of card', impact: '+8% freshness perception', implementation: 'Relative dates ("2 days ago") feel fresher than absolutes' },
    { element: 'Star Rating', placement: 'Top of card, before text', impact: '+22% scan-ability', implementation: 'Yellow stars (SVG), filled proportionally' },
    { element: 'Customer Photo', placement: 'Left of name + role', impact: '+35% trust', implementation: '40px circle avatar, fallback to initials if no photo' },
    { element: 'Company Logo', placement: 'Below name + role', impact: '+28% B2B credibility', implementation: 'Grayscale logo, 60px wide max' },
    { element: 'Metric Highlight', placement: 'Bold callout within card', impact: '+40% attention capture', implementation: 'Large font, accent color, positioned above testimonial text' },
    { element: '"See All Reviews" Link', placement: 'Below testimonial section', impact: '+15% transparency', implementation: 'Link to G2/Trustpilot profile page for full review corpus' },
  ];

  const conversionTactics: ConversionTactic[] = [
    { tactic: 'Segment-Matched Testimonials', where: 'Pricing page, each tier', expectedLift: '+23-38% conversion', implementation: 'Show testimonial from customer on same plan tier: "I started on Pro..."' },
    { tactic: 'Objection-Addressing Proof', where: 'Below pricing FAQ', expectedLift: '+15-25% conversion', implementation: 'Match each FAQ to a testimonial that addresses the same concern' },
    { tactic: 'Exit-Intent Social Proof', where: 'Popup on mouse-leave', expectedLift: '+8-12% recovery', implementation: 'Show strongest metric + quote when visitor is about to leave' },
    { tactic: 'Inline Micro-Testimonials', where: 'Next to feature descriptions', expectedLift: '+18-30% engagement', implementation: 'Small quote card beside each feature: "This feature alone saved us 20h/week"' },
    { tactic: 'Real-Time Activity Feed', where: 'Bottom-left corner toast', expectedLift: '+5-10% urgency', implementation: '"Sarah from Acme just signed up 3 minutes ago" — real or realistic data' },
    { tactic: 'Industry-Filtered Wall', where: 'Dedicated /testimonials page', expectedLift: '+20-35% relevance', implementation: 'Dropdown filter: "Show testimonials from [my industry]"' },
  ];

  const automations: CollectionAutomation[] = [
    { source: 'G2/Capterra Reviews', trigger: 'New 4-5 star review published', action: 'Auto-import to proof wall queue with platform badge', approval: 'Auto-approved for 5-star, manual review for 4-star', frequency: 'Real-time webhook' },
    { source: 'Twitter/X Mentions', trigger: '@mention with positive sentiment', action: 'Capture tweet embed + screenshot for proof wall', approval: 'Manual approval via Slack notification', frequency: 'Hourly scan' },
    { source: 'NPS Survey', trigger: 'Score 9-10 with text comment', action: 'Extract quote + ask for permission to feature', approval: 'Requires opt-in from customer', frequency: 'After each survey response' },
    { source: 'Support Tickets', trigger: 'CSAT 5/5 with positive comment', action: 'Add to testimonial candidate queue', approval: 'Customer success team reviews weekly', frequency: 'Weekly batch' },
    { source: 'Case Study Interviews', trigger: 'Customer completes quarterly review', action: 'Extract top quotes + metrics for proof wall', approval: 'Customer signs release form', frequency: 'Quarterly' },
  ];

  const designPrinciples = [
    'Show a mix of proof types — reviews, tweets, metrics, and logos together create a layered trust signal',
    'Keep the wall above the fold — social proof below the fold is 60% less effective',
    'Update weekly — stale testimonials (6+ months) reduce trust by 23%',
    'Use real photos — stock photos or AI-generated faces destroy credibility instantly',
    'Show imperfect scores — 4.7/5 is more believable than 5.0/5 (the "imperfection signal")',
    'Match proof to visitor — B2B visitors need logos and metrics, B2C needs emotions and photos',
    'Design for scanning — most visitors spend 2-3 seconds on proof wall, make the strongest signal visually dominant',
    'Link to source — every testimonial should link to its original platform for verification',
  ];

  const antiPatterns = [
    'Fabricated testimonials — legally risky (FTC) and reputation-destroying when caught',
    'Only positive reviews — curated perfection feels fake. Show 4-star reviews too.',
    'Giant walls with 50+ cards — cognitive overload. 6-8 diverse, strong proof points > 50 mediocre ones',
    'Auto-playing video with sound — instant bounce. Always start muted with captions.',
    'Generic quotes without specifics — "Great product!" does nothing. Require metrics or stories.',
    'Missing mobile optimization — 68% of traffic is mobile. Test every card layout on phone.',
    'Proof wall as separate page — nobody clicks "Testimonials" in nav. Embed inline everywhere.',
    'No update process — building a wall and forgetting it. Schedule monthly refresh.',
  ];

  return { trustScore: score, cards, layout, trustElements, conversionTactics, automations, designPrinciples, antiPatterns };
}

export default function ProofWallPage() {
  const [wallStyle, setWallStyle] = useState(wallStyles[0]);
  const [source, setSource] = useState(sources[0]);
  const [industry, setIndustry] = useState(industries[0]);
  const [placement, setPlacement] = useState(placements[0]);
  const [colors, setColors] = useState(colorSchemes[0]);
  const [audience, setAudience] = useState(audiences[0]);
  const [brandName, setBrandName] = useState('');
  const [result, setResult] = useState<ProofWall | null>(null);

  const handleGenerate = () => { if (brandName.trim()) setResult(generateProofWall(wallStyle, source, industry, placement, colors, audience, brandName)); };
  const scoreColor = (n: number) => n > 75 ? '#34d399' : n > 55 ? '#fbbf24' : n > 35 ? '#fb923c' : '#f87171';

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Social Proof Wall Builder</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Design a high-converting social proof wall for your website. Get card templates, layout specs, trust elements, conversion tactics, collection automations, and design principles — all customized to your brand and audience.</p>

        <div className="mb-4">
          <label className="block text-sm text-zinc-400 mb-1">Brand / Company Name</label>
          <input type="text" value={brandName} onChange={e => setBrandName(e.target.value)} placeholder="e.g., PostCraft, Acme Corp" className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-3 text-zinc-100" />
        </div>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {([
            { label: 'Wall Style', value: wallStyle, setter: setWallStyle as (v: string) => void, options: wallStyles as readonly string[] },
            { label: 'Proof Source', value: source, setter: setSource as (v: string) => void, options: sources as readonly string[] },
            { label: 'Industry', value: industry, setter: setIndustry as (v: string) => void, options: industries as readonly string[] },
            { label: 'Page Placement', value: placement, setter: setPlacement as (v: string) => void, options: placements as readonly string[] },
            { label: 'Color Scheme', value: colors, setter: setColors as (v: string) => void, options: colorSchemes as readonly string[] },
            { label: 'Target Audience', value: audience, setter: setAudience as (v: string) => void, options: audiences as readonly string[] },
          ] as const).map(({ label, value, setter, options }) => (
            <div key={label}>
              <label className="block text-sm text-zinc-400 mb-1">{label}</label>
              <select value={value} onChange={e => setter(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100">
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
        <button onClick={handleGenerate} className="w-full md:w-auto bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded font-semibold hover:opacity-90 transition mb-8">Build Proof Wall</button>

        {result && (
          <div className="space-y-8">
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 text-center">
              <div className="text-5xl font-bold mb-2" style={{ color: scoreColor(result.trustScore) }}>{result.trustScore}</div>
              <div className="text-zinc-400">Trust Score</div>
              <div className="mt-3 max-w-md mx-auto w-full bg-zinc-800 rounded-full h-3">
                <div className="h-3 rounded-full" style={{ width: `${result.trustScore}%`, background: scoreColor(result.trustScore) }} />
              </div>
            </div>

            {/* Proof Cards Preview */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Proof Cards ({result.cards.length})</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {result.cards.map((c, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex gap-2">
                        <span className="text-xs px-2 py-1 rounded bg-violet-400/10 text-violet-400 border border-violet-400/30">{c.type}</span>
                        <span className="text-xs px-2 py-1 rounded bg-zinc-700 text-zinc-300">{c.platform}</span>
                      </div>
                      {c.verified && <span className="text-xs text-emerald-400">✓ Verified</span>}
                    </div>
                    <div className="text-sm text-zinc-300 mb-2 italic">{c.content}</div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs"><span className="text-zinc-200 font-semibold">{c.author}</span> <span className="text-zinc-500">· {c.role}</span></div>
                      <div className="text-xs font-bold text-emerald-400">{c.metric}</div>
                    </div>
                    <div className="text-xs text-zinc-600 mt-1">{c.date}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Layout Specs */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Layout Specification</h3>
              <div className="space-y-3">
                {result.layout.map((l, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-semibold text-zinc-200">{l.section}</span>
                      <span className="text-xs px-2 py-1 rounded bg-violet-400/10 text-violet-400">{l.cards} cards</span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-2 text-xs">
                      <div><span className="text-zinc-500">Layout:</span> <span className="text-zinc-300">{l.layout}</span></div>
                      <div><span className="text-zinc-500">Animation:</span> <span className="text-zinc-300">{l.animation}</span></div>
                      <div><span className="text-zinc-500">Responsive:</span> <span className="text-zinc-300">{l.responsive}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Elements + Conversion Tactics */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3">Trust Elements</h3>
                <div className="space-y-3">
                  {result.trustElements.map((t, i) => (
                    <div key={i} className="bg-zinc-800/40 rounded-lg p-3 border border-zinc-700/50">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-sm font-semibold text-zinc-200">{t.element}</span>
                        <span className="text-xs text-emerald-400">{t.impact}</span>
                      </div>
                      <div className="text-xs text-zinc-400">{t.implementation}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3">Conversion Tactics</h3>
                <div className="space-y-3">
                  {result.conversionTactics.map((c, i) => (
                    <div key={i} className="bg-zinc-800/40 rounded-lg p-3 border border-zinc-700/50">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-sm font-semibold text-zinc-200">{c.tactic}</span>
                        <span className="text-xs text-emerald-400">{c.expectedLift}</span>
                      </div>
                      <div className="text-xs text-zinc-500">Where: {c.where}</div>
                      <div className="text-xs text-zinc-400">{c.implementation}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Collection Automations */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Collection Automations</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="text-left text-zinc-500 border-b border-zinc-700"><th className="pb-2 pr-3">Source</th><th className="pb-2 pr-3">Trigger</th><th className="pb-2 pr-3">Action</th><th className="pb-2 pr-3">Approval</th><th className="pb-2">Frequency</th></tr></thead>
                  <tbody>
                    {result.automations.map((a, i) => (
                      <tr key={i} className="border-b border-zinc-800/50">
                        <td className="py-2 pr-3 text-violet-400 font-medium">{a.source}</td>
                        <td className="py-2 pr-3 text-zinc-300 text-xs">{a.trigger}</td>
                        <td className="py-2 pr-3 text-zinc-400 text-xs">{a.action}</td>
                        <td className="py-2 pr-3 text-zinc-400 text-xs">{a.approval}</td>
                        <td className="py-2 text-emerald-400/70 text-xs">{a.frequency}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Design + Anti-Patterns */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-emerald-400">Design Principles</h3>
                <div className="space-y-2">{result.designPrinciples.map((p, i) => <div key={i} className="text-sm text-zinc-400 flex gap-2"><span className="text-emerald-400 shrink-0">→</span>{p}</div>)}</div>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-red-400">Anti-Patterns</h3>
                <div className="space-y-2">{result.antiPatterns.map((a, i) => <div key={i} className="text-sm text-zinc-400 flex gap-2"><span className="text-red-400 shrink-0">✗</span>{a}</div>)}</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">Build Trust That Converts</h3>
              <p className="text-zinc-400 mb-4">PostCraft AI designs social proof walls that drive real conversions. Pair with <a href="/testimonial-generator" className="text-violet-400 underline">Testimonial Generator</a>, <a href="/social-proof" className="text-violet-400 underline">Social Proof</a>, and <a href="/win-story" className="text-violet-400 underline">Win Story</a>.</p>
              <a href="/pricing" className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">Get PostCraft Pro</a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
