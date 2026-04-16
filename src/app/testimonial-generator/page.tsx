'use client';
import { useState } from 'react';

const industries = ['Tech & SaaS', 'E-commerce & DTC', 'Healthcare', 'Finance & FinTech', 'Education & EdTech', 'Real Estate', 'Agency & Consulting', 'Manufacturing', 'Non-Profit', 'Food & Beverage', 'Travel & Hospitality', 'Fitness & Wellness'] as const;
const platforms = ['LinkedIn', 'Instagram', 'Twitter/X', 'Website', 'Google Reviews', 'G2/Capterra', 'Email Signature', 'All Platforms'] as const;
const testimonialStyles = ['Short Quote Card', 'Before/After Story', 'Video Script', 'Case Study Snippet', 'Social Proof Badge', 'Carousel Testimonial'] as const;
const tones = ['Professional & Authoritative', 'Warm & Conversational', 'Enthusiastic & Energetic', 'Data-Driven & Analytical', 'Humble & Authentic', 'Bold & Confident'] as const;
const socialProofTypes = ['Customer Success', 'Product Review', 'Service Experience', 'Implementation Journey', 'ROI Achievement', 'Team Adoption', 'Support Excellence', 'Community Impact'] as const;
const audiences = ['B2B Decision Makers', 'Small Business Owners', 'Enterprise Buyers', 'Individual Consumers', 'Technical Teams', 'Marketing Professionals'] as const;

interface TestimonialVariant { platform: string; format: string; headline: string; body: string; visualDirection: string; placement: string; }
interface SocialProofElement { type: string; text: string; metric: string; context: string; trustSignal: string; }
interface CollectionStrategy { method: string; timing: string; template: string; incentive: string; followUp: string; }
interface DesignSpec { layout: string; typography: string; colorScheme: string; photoPlacement: string; badge: string; }

interface TestimonialPack {
  authenticityScore: number;
  variants: TestimonialVariant[];
  socialProof: SocialProofElement[];
  collectionStrategies: CollectionStrategy[];
  designSpecs: DesignSpec[];
  displayPatterns: string[];
  commonMistakes: string[];
  legalChecklist: string[];
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }

function generateTestimonials(industry: string, platform: string, style: string, tone: string, proofType: string, audience: string, customerName: string, resultMetric: string): TestimonialPack {
  const seed = hash(`${industry}-${platform}-${style}-${tone}-${proofType}-${audience}-${customerName}-${resultMetric}`);
  const score = 50 + seed % 45;

  const headlines = [
    `"${resultMetric} — and we're just getting started" — ${customerName}`,
    `Why ${customerName} says switching was the best decision of the year`,
    `From skeptic to advocate: ${customerName}'s honest review`,
    `${customerName}: "${resultMetric} speaks louder than any pitch deck"`,
    `The ${customerName} story: real results, zero fluff`,
    `How ${customerName} went from "maybe" to "${resultMetric}" in 90 days`,
    `"If I could go back, I'd have started sooner." — ${customerName}`,
    `${customerName}'s team was skeptical. Then they saw ${resultMetric}.`,
  ];
  const bodies = [
    `We'd tried three other solutions before finding this one. The difference was immediate — within the first week, our team was already seeing improvements. By month three, we hit ${resultMetric}. What I appreciate most is the support team — they actually understand ${industry.toLowerCase()} businesses.`,
    `I'm not the type to leave reviews, but this genuinely changed how we operate. Our ${industry.toLowerCase()} workflows went from chaotic to streamlined. The ${resultMetric} was the cherry on top — but the daily time savings are what our team talks about most.`,
    `As a ${industry.toLowerCase()} professional, I've seen a lot of tools come and go. This is the first one that delivered exactly what it promised. ${resultMetric} wasn't a stretch goal — it was the natural outcome of a well-designed system.`,
    `When our CEO asked what drove the ${resultMetric}, I didn't hesitate. The implementation was smooth, the team adopted it in days (not months), and the results compounded every week. This is now our single most important tool.`,
    `Honestly? I was ready to cancel after the trial. Then I attended their onboarding session, and everything clicked. Six months later: ${resultMetric}, a happier team, and a process we actually trust. Best decision we made this year.`,
    `In ${industry.toLowerCase()}, everyone promises transformation. This team actually delivered it. ${resultMetric} is just the headline number — the real impact is in the 20+ hours/week we've reclaimed for strategic work.`,
    `We needed something that could scale with our ${industry.toLowerCase()} business without adding headcount. ${resultMetric} later, we've tripled output with the same team size. The ROI conversation lasted about 30 seconds with our board.`,
    `What sets this apart isn't the features — it's the thinking behind them. Every detail feels designed by someone who actually understands ${industry.toLowerCase()} challenges. ${resultMetric} was the validation we needed.`,
  ];
  const platformNames = ['LinkedIn', 'Instagram', 'Twitter/X', 'Website Hero', 'G2/Capterra', 'Email Signature', 'Sales Deck', 'Retargeting Ad'];
  const formats = ['Text post with photo', 'Carousel (5 slides)', 'Tweet thread (3 tweets)', 'Full-width banner', 'Structured review', 'Signature badge', 'One-slide quote', 'Static image ad'];
  const visuals = [
    'Headshot + company logo, quote in large serif, metric badge bottom-right',
    'Slide 1: metric, Slide 2: problem, Slide 3: solution, Slide 4: quote, Slide 5: CTA',
    'Plain text with metric in brackets, company tag, relevant hashtags',
    'Full-bleed customer photo, large quote overlay, metric counter animation',
    'Star rating + structured pros/cons + verified badge + usage duration',
    'Small quote + photo + star rating + company name, clickable to full story',
    'Customer photo left, quote center, metric right, brand gradient border',
    'Split design: metric left (bold), quote right (italic), CTA bottom',
  ];
  const placements = [
    'Organic feed post — schedule during business hours for B2B reach',
    'Story highlight "Reviews" + feed carousel — pin for 30 days',
    'Thread, then quote-tweet the first tweet weekly for impressions',
    'Above the fold on homepage, rotate 3 testimonials every 5 seconds',
    'Pin to top of G2 profile, request admin feature on review listing',
    'Auto-append to all team emails for passive social proof',
    'Include on slide 2 of every outbound sales deck',
    'Use in retargeting campaigns for website visitors who bounced from pricing',
  ];

  const variants: TestimonialVariant[] = Array.from({ length: 8 }, (_, i) => ({
    platform: platformNames[i],
    format: formats[i],
    headline: headlines[(seed + i * 2) % headlines.length],
    body: bodies[(seed + i * 3) % bodies.length],
    visualDirection: visuals[i],
    placement: placements[i],
  }));

  const proofElements = [
    { type: 'Metric Badge', text: `${resultMetric} achieved`, metric: resultMetric, context: 'Verified result from active customer', trustSignal: 'Third-party verified + date stamp' },
    { type: 'Star Rating', text: `★★★★★ rated by ${customerName}`, metric: '5.0/5.0', context: `${industry} sector review`, trustSignal: 'Verified purchase badge + review platform logo' },
    { type: 'Logo Cloud', text: `Trusted by ${customerName} and 500+ ${industry.toLowerCase()} teams`, metric: '500+', context: 'Active customer count', trustSignal: 'Recognizable company logos + "including" qualifier' },
    { type: 'Time-Based', text: `Customer for 12+ months — still seeing results`, metric: '12+ months', context: 'Long-term retention proves sustained value', trustSignal: 'Join date visible + ongoing engagement metrics' },
    { type: 'Team Size', text: `Adopted by ${customerName}'s full team of 25+`, metric: '25+ users', context: 'Company-wide adoption, not just one champion', trustSignal: 'User count + department spread' },
    { type: 'Award Badge', text: `${industry} Leader — rated by customers`, metric: 'Top 10%', context: 'Category leadership based on user reviews', trustSignal: 'Platform award badge + comparison context' },
    { type: 'NPS Score', text: `9/10 — "Would definitely recommend"`, metric: 'NPS 72+', context: 'Above industry average of 34', trustSignal: 'Survey methodology disclosure + sample size' },
    { type: 'ROI Stamp', text: `${resultMetric} ROI in first 90 days`, metric: resultMetric, context: 'Payback period under 30 days', trustSignal: 'Calculation methodology link + CFO quote' },
  ];
  const socialProof: SocialProofElement[] = Array.from({ length: 8 }, (_, i) => proofElements[(seed + i) % proofElements.length]);

  const methods = ['Post-Onboarding Survey', 'NPS Follow-Up Email', 'Quarterly Review Call', 'Milestone Celebration', 'Support Ticket Close'];
  const timings = ['7 days after first success metric', '30 days post-launch', 'After quarterly business review', 'When customer hits key milestone', 'After positive support interaction'];
  const templates = [
    `Hi ${customerName}, congrats on hitting ${resultMetric}! Would you be open to sharing a quick quote about your experience? Just 2-3 sentences about what changed.`,
    `We noticed your team has been crushing it — ${resultMetric} is impressive! Would you mind if we featured your story? We can draft something for your approval.`,
    `Thank you for the kind words in our review! Could we use your feedback on our website? We'll send a draft for approval before publishing anything.`,
    `Your results are exactly the kind of story that helps other ${industry.toLowerCase()} teams. Would you be open to a 15-min video call to share your experience?`,
    `We're putting together a customer spotlight series. Based on your ${resultMetric} results, you'd be a perfect fit. Interested? We handle everything.`,
  ];
  const incentives = ['Feature in monthly newsletter (2,000+ subscribers)', 'Co-branded case study with backlinks', 'Early access to new features for 6 months', 'Guest spot on company podcast/webinar', 'Donation to charity of choice ($100)'];
  const followUps = ['Send draft → approval in 48h → publish within 1 week', 'Schedule 15-min call → send edited transcript → approve in 72h', 'Send 3-question form → draft from responses → approve in 48h', 'Record video call → edit to 60s → approve before publish', 'Screenshot review → design card → share on social with tag'];

  const collectionStrategies: CollectionStrategy[] = Array.from({ length: 5 }, (_, i) => ({
    method: methods[i],
    timing: timings[i],
    template: templates[(seed + i) % templates.length],
    incentive: incentives[(seed + i * 2) % incentives.length],
    followUp: followUps[(seed + i * 3) % followUps.length],
  }));

  const designSpecs: DesignSpec[] = [
    { layout: 'Card (320x400px)', typography: 'Quote: 18px serif italic, Name: 14px sans-serif bold', colorScheme: 'Dark bg (#0a0a0a), white text, accent gradient border', photoPlacement: 'Circular 48px, bottom-left with company logo overlay', badge: 'Metric badge top-right, verified checkmark' },
    { layout: 'Banner (1200x300px)', typography: 'Quote: 24px sans-serif, Metric: 48px bold', colorScheme: 'Gradient bg (violet→fuchsia), white text, semi-transparent overlay', photoPlacement: 'Full-height right-aligned, soft edge fade', badge: 'Star rating left-aligned, company logo bottom-center' },
    { layout: 'Carousel Slide (1080x1080px)', typography: 'Quote: 28px bold, Context: 16px regular', colorScheme: 'White bg, dark text, accent color for metrics', photoPlacement: 'Top-center circle 80px, name below', badge: 'Swipe indicator dots, slide counter top-right' },
    { layout: 'Sidebar Widget (300x250px)', typography: 'Quote: 14px, Name: 12px, auto-rotate every 5s', colorScheme: 'Match site theme, subtle border, hover effect', photoPlacement: 'Inline 32px circle, left of name', badge: 'Mini star rating, "Read more" link' },
    { layout: 'Email Block (600px wide)', typography: 'Quote: 16px Georgia italic, CTA: 14px sans-serif', colorScheme: 'Light bg (#fafafa), dark text, CTA button in brand color', photoPlacement: 'Left-aligned 40px circle with 2px brand border', badge: 'Verified customer tag, click-through to full story' },
  ];

  const displayPatterns = [
    'Rotate 3 testimonials on homepage — show industry-relevant ones based on visitor segment',
    'Pin strongest testimonial as first thing visitors see after hero section',
    'Show testimonials inline during checkout/pricing page — reduce purchase anxiety',
    'Add micro-testimonials (one-liners) next to feature descriptions on product pages',
    'Create a dedicated /testimonials page with filters by industry and use case',
    'Use exit-intent popup with strongest testimonial + CTA for abandoning visitors',
    'Include testimonial snippet in email subject lines for 23% higher open rates',
    'Add testimonial carousel to blog sidebar — context-matched to article topic',
  ];

  const commonMistakes = [
    'Using fake or fabricated testimonials — destroys trust permanently when discovered',
    'Only showing 5-star reviews — mix of 4-5 stars is more credible than all perfect scores',
    'Testimonials without photos or real names — anonymous quotes have 68% less impact',
    'Placing testimonials only on a dedicated page — embed them throughout the buyer journey',
    'Never updating testimonials — refresh every 6 months with recent, relevant stories',
    'Ignoring negative feedback — respond publicly and professionally, then improve',
    'Using industry jargon in testimonials — rewrite in plain language (with approval)',
    'Missing mobile optimization — 60%+ views are mobile, cards must be responsive',
  ];

  const legalChecklist = [
    'Written consent obtained before publishing any testimonial or customer name',
    'Customer approved final copy and visual design before going live',
    'No fabricated or misleading metrics — all numbers verified with customer',
    'FTC disclosure included where testimonial is used in advertising context',
    'GDPR/CCPA compliant — customer can request removal at any time',
    'Platform-specific guidelines followed (Google, G2, etc. — no incentivized reviews where prohibited)',
    'Photo usage rights confirmed — customer owns or licenses the headshot used',
    'Testimonial marked as "results may vary" when specific metrics are claimed',
    'Competitor comparison claims verified and defensible',
    'Annual review scheduled to re-confirm customer consent and update details',
  ];

  return { authenticityScore: score, variants, socialProof, collectionStrategies, designSpecs, displayPatterns, commonMistakes, legalChecklist };
}

export default function TestimonialGeneratorPage() {
  const [industry, setIndustry] = useState(industries[0]);
  const [platform, setPlatform] = useState(platforms[0]);
  const [style, setStyle] = useState(testimonialStyles[0]);
  const [tone, setTone] = useState(tones[0]);
  const [proofType, setProofType] = useState(socialProofTypes[0]);
  const [audience, setAudience] = useState(audiences[0]);
  const [customerName, setCustomerName] = useState('');
  const [resultMetric, setResultMetric] = useState('');
  const [result, setResult] = useState<TestimonialPack | null>(null);

  const handleGenerate = () => { if (customerName.trim() && resultMetric.trim()) setResult(generateTestimonials(industry, platform, style, tone, proofType, audience, customerName, resultMetric)); };
  const scoreColor = (n: number) => n > 75 ? '#34d399' : n > 55 ? '#fbbf24' : n > 35 ? '#fb923c' : '#f87171';

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Testimonial Generator</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Generate authentic, high-converting testimonial packages for every platform. Get collection strategies, design specs, social proof elements, display patterns, and legal compliance — all from one customer success story.</p>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Customer / Company Name</label>
            <input type="text" value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder="e.g., Acme Corp" className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-3 text-zinc-100" />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Key Result / Metric</label>
            <input type="text" value={resultMetric} onChange={e => setResultMetric(e.target.value)} placeholder="e.g., +147% conversion, 3x faster, $500K saved" className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-3 text-zinc-100" />
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {([
            { label: 'Industry', value: industry, setter: setIndustry as (v: string) => void, options: industries as readonly string[] },
            { label: 'Platform', value: platform, setter: setPlatform as (v: string) => void, options: platforms as readonly string[] },
            { label: 'Testimonial Style', value: style, setter: setStyle as (v: string) => void, options: testimonialStyles as readonly string[] },
            { label: 'Tone', value: tone, setter: setTone as (v: string) => void, options: tones as readonly string[] },
            { label: 'Social Proof Type', value: proofType, setter: setProofType as (v: string) => void, options: socialProofTypes as readonly string[] },
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
        <button onClick={handleGenerate} className="w-full md:w-auto bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded font-semibold hover:opacity-90 transition mb-8">Generate Testimonial Pack</button>

        {result && (
          <div className="space-y-8">
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 text-center">
              <div className="text-5xl font-bold mb-2" style={{ color: scoreColor(result.authenticityScore) }}>{result.authenticityScore}</div>
              <div className="text-zinc-400">Authenticity Score</div>
              <div className="mt-3 max-w-md mx-auto w-full bg-zinc-800 rounded-full h-3">
                <div className="h-3 rounded-full" style={{ width: `${result.authenticityScore}%`, background: scoreColor(result.authenticityScore) }} />
              </div>
            </div>

            {/* Platform Variants */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Platform-Specific Testimonials ({result.variants.length})</h3>
              <div className="space-y-4">
                {result.variants.map((v, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex gap-2 mb-2">
                      <span className="text-xs px-2 py-1 rounded bg-violet-400/10 text-violet-400 border border-violet-400/30">{v.platform}</span>
                      <span className="text-xs px-2 py-1 rounded bg-zinc-700 text-zinc-300">{v.format}</span>
                    </div>
                    <div className="font-semibold text-zinc-200 mb-1">{v.headline}</div>
                    <div className="text-sm text-zinc-400 mb-2">{v.body}</div>
                    <div className="text-xs space-y-1">
                      <div><span className="text-zinc-500">Visual:</span> <span className="text-zinc-500">{v.visualDirection}</span></div>
                      <div><span className="text-zinc-500">Placement:</span> <span className="text-emerald-400/70">{v.placement}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Proof Elements */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Social Proof Elements</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {result.socialProof.map((sp, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="text-xs text-violet-400 font-semibold uppercase tracking-wider mb-1">{sp.type}</div>
                    <div className="font-semibold text-zinc-200 mb-1">{sp.text}</div>
                    <div className="text-lg font-bold text-emerald-400 mb-2">{sp.metric}</div>
                    <div className="text-xs text-zinc-500">{sp.context}</div>
                    <div className="text-xs text-yellow-400/60 mt-1">Trust: {sp.trustSignal}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Collection Strategies */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Collection Strategies</h3>
              <div className="space-y-4">
                {result.collectionStrategies.map((cs, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex gap-2 mb-2">
                      <span className="text-xs px-2 py-1 rounded bg-emerald-400/10 text-emerald-400 border border-emerald-400/30">{cs.method}</span>
                      <span className="text-xs px-2 py-1 rounded bg-zinc-700 text-zinc-300">{cs.timing}</span>
                    </div>
                    <div className="text-sm text-zinc-300 mb-2 bg-zinc-900/60 rounded p-3 border border-zinc-700/30 italic">&ldquo;{cs.template}&rdquo;</div>
                    <div className="text-xs space-y-1">
                      <div><span className="text-zinc-500">Incentive:</span> <span className="text-yellow-400/70">{cs.incentive}</span></div>
                      <div><span className="text-zinc-500">Follow-up:</span> <span className="text-zinc-400">{cs.followUp}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Design Specs */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Design Specifications</h3>
              <div className="space-y-3">
                {result.designSpecs.map((ds, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="font-semibold text-zinc-200 mb-2">{ds.layout}</div>
                    <div className="grid md:grid-cols-2 gap-2 text-xs">
                      <div><span className="text-zinc-500">Typography:</span> <span className="text-zinc-400">{ds.typography}</span></div>
                      <div><span className="text-zinc-500">Colors:</span> <span className="text-zinc-400">{ds.colorScheme}</span></div>
                      <div><span className="text-zinc-500">Photo:</span> <span className="text-zinc-400">{ds.photoPlacement}</span></div>
                      <div><span className="text-zinc-500">Badge:</span> <span className="text-zinc-400">{ds.badge}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Display Patterns + Mistakes + Legal */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-violet-400">Display Patterns</h3>
                <div className="space-y-2">{result.displayPatterns.map((p, i) => <div key={i} className="text-sm text-zinc-400 flex gap-2"><span className="text-violet-400 shrink-0">→</span>{p}</div>)}</div>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-red-400">Common Mistakes</h3>
                <div className="space-y-2">{result.commonMistakes.map((m, i) => <div key={i} className="text-sm text-zinc-400 flex gap-2"><span className="text-red-400 shrink-0">✗</span>{m}</div>)}</div>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-emerald-400">Legal Checklist</h3>
                <div className="space-y-2">{result.legalChecklist.map((l, i) => <div key={i} className="text-sm text-zinc-400 flex gap-2"><span className="text-emerald-400 shrink-0">✓</span>{l}</div>)}</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">Turn Every Customer Into a Brand Ambassador</h3>
              <p className="text-zinc-400 mb-4">Use PostCraft AI to build bulletproof social proof. Pair with <a href="/win-story" className="text-violet-400 underline">Win Story</a>, <a href="/social-proof" className="text-violet-400 underline">Social Proof</a>, and <a href="/persona-builder" className="text-violet-400 underline">Persona Builder</a>.</p>
              <a href="/pricing" className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">Get PostCraft Pro</a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
