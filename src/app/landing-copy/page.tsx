'use client';
import { useState } from 'react';

const frameworks = ['PAS (Problem-Agitation-Solution)', 'AIDA (Attention-Interest-Desire-Action)', 'BAB (Before-After-Bridge)', 'Question Hook', 'Bold Statement', 'Story Arc', 'Social Proof Led', 'Feature Stack'] as const;
const pageTypes = ['SaaS Product', 'Mobile App', 'Agency/Service', 'E-commerce Product', 'Course/Membership', 'Newsletter', 'Event/Webinar', 'Open Source Tool'] as const;
const tones = ['Confident & Bold', 'Friendly & Approachable', 'Professional & Clean', 'Urgent & Direct', 'Playful & Fun', 'Data-Driven'] as const;
const audiences = ['Developers', 'Marketers', 'Founders/Entrepreneurs', 'Enterprise Teams', 'Creators/Freelancers', 'Small Business Owners', 'Students', 'General Consumer'] as const;

interface LandingResult {
  heroSection: { headline: string; subheadline: string; cta: string; socialProof: string; microCopy: string };
  alternativeHeadlines: string[];
  sections: { name: string; headline: string; body: string; tip: string }[];
  ctaVariants: { text: string; style: string; expectedCTR: string }[];
  socialProofFormats: string[];
  objectionHandlers: { objection: string; response: string }[];
  seoMeta: { title: string; description: string; h1: string };
  conversionChecklist: string[];
  abTestPlan: string[];
}

function generateLandingCopy(framework: string, pageType: string, tone: string, audience: string, productName: string, valueProposition: string): LandingResult {
  const name = productName || 'YourProduct';
  const value = valueProposition || 'save time and grow faster';
  const isBold = tone.includes('Bold') || tone.includes('Urgent');
  const isFriendly = tone.includes('Friendly') || tone.includes('Playful');

  const heroByFramework: Record<string, { headline: string; subheadline: string }> = {
    'PAS (Problem-Agitation-Solution)': {
      headline: `Stop wasting hours on ${value.split(' ')[0]}. ${name} does it in minutes.`,
      subheadline: `Every day you spend manually handling this is a day your competitors get ahead. ${name} automates the entire process so you can focus on what actually grows your business.`,
    },
    'AIDA (Attention-Interest-Desire-Action)': {
      headline: `${isBold ? 'The' : 'Meet the'} ${pageType.toLowerCase()} that helps you ${value}`,
      subheadline: `Join thousands of ${audience.toLowerCase()} who use ${name} to work smarter, not harder. See results in your first session.`,
    },
    'BAB (Before-After-Bridge)': {
      headline: `Before ${name}: Frustration. After: ${value.charAt(0).toUpperCase() + value.slice(1)}.`,
      subheadline: `The bridge? A ${pageType.toLowerCase()} built specifically for ${audience.toLowerCase()} who are tired of the old way. Try it free.`,
    },
    'Question Hook': {
      headline: `What if you could ${value} without the hassle?`,
      subheadline: `${name} is the answer ${audience.toLowerCase()} have been looking for. No learning curve. No complexity. Just results.`,
    },
    'Bold Statement': {
      headline: `${name} is the fastest way to ${value}. Period.`,
      subheadline: `We built ${name} because everything else was too slow, too complex, or too expensive. ${isFriendly ? 'You deserve better.' : 'Your time deserves better.'}`,
    },
    'Story Arc': {
      headline: `We built ${name} because we were frustrated too.`,
      subheadline: `After years of struggling to ${value}, we created the tool we wished existed. Now ${audience.toLowerCase()} everywhere are using it to transform their workflow.`,
    },
    'Social Proof Led': {
      headline: `10,000+ ${audience.toLowerCase()} already ${value} with ${name}`,
      subheadline: `Rated 4.9/5 on Product Hunt. See why teams are switching from [competitor] to ${name}.`,
    },
    'Feature Stack': {
      headline: `Everything you need to ${value}. Nothing you don't.`,
      subheadline: `${name} combines [feature 1], [feature 2], and [feature 3] in one simple ${pageType.toLowerCase()}. No bloat. No learning curve.`,
    },
  };

  const hero = heroByFramework[framework] || heroByFramework['PAS (Problem-Agitation-Solution)'];

  return {
    heroSection: {
      headline: hero.headline,
      subheadline: hero.subheadline,
      cta: `Start My Free ${pageType.includes('Course') ? 'Lesson' : 'Trial'}`,
      socialProof: `Trusted by 5,000+ ${audience.toLowerCase()} worldwide`,
      microCopy: 'No credit card required. Cancel anytime.',
    },
    alternativeHeadlines: [
      `${name}: ${value.charAt(0).toUpperCase() + value.slice(1)} in half the time`,
      `The ${pageType.toLowerCase()} ${audience.toLowerCase()} actually love using`,
      `${isBold ? 'Finally.' : 'Meet'} ${name} — built to ${value}`,
      `Why 10,000+ ${audience.toLowerCase()} switched to ${name}`,
      `${value.charAt(0).toUpperCase() + value.slice(1)} — without the complexity`,
    ],
    sections: [
      { name: 'Problem Statement', headline: `${audience} shouldn't have to struggle with this`, body: `You've tried [old solution]. It's slow, complicated, and expensive. ${name} was built from the ground up to solve this specific problem for ${audience.toLowerCase()}.`, tip: 'Use specific pain points from customer interviews. Generic = ignored.' },
      { name: 'How It Works (3 Steps)', headline: `${value.charAt(0).toUpperCase() + value.slice(1)} in 3 simple steps`, body: `1. **Sign up** (takes 30 seconds)\n2. **[Core action]** (guided, no learning curve)\n3. **See results** (your first [outcome] in under 5 minutes)`, tip: '3 steps is the magic number. More = overwhelming. Fewer = not credible.' },
      { name: 'Features/Benefits', headline: `Everything you need. Nothing you don't.`, body: `**[Feature 1]** — [Benefit in user terms]\n**[Feature 2]** — [Benefit in user terms]\n**[Feature 3]** — [Benefit in user terms]`, tip: 'Lead with benefit, not feature name. "Save 10 hours/week" > "Automation engine"' },
      { name: 'Social Proof', headline: `${audience} love ${name}`, body: `"[Testimonial from real customer]" — Name, Role at Company\n\nRated 4.9/5 on [Platform]. Used by teams at [Logo] [Logo] [Logo].`, tip: 'Testimonials with specific results > generic praise. Include photo + role.' },
      { name: 'Pricing', headline: 'Simple, transparent pricing', body: `**Free** — Get started, no limits on core features\n**Pro ($19/mo)** — Everything + [premium features]\n**Team ($49/mo)** — Collaboration + analytics`, tip: 'Show monthly price crossed out next to annual. Toggle switch for billing period.' },
      { name: 'FAQ', headline: 'Questions? Answers.', body: `**Can I cancel anytime?** Yes. No contracts, no fees.\n**Is there a free trial?** Yes, 14 days full access.\n**Is my data safe?** [Security certification] + encrypted.`, tip: 'Address top 3-5 purchase objections. FAQ schema = Google rich results.' },
      { name: 'Final CTA', headline: `Ready to ${value}?`, body: `Start your free trial today. No credit card required.\n\n[CTA Button: Start My Free Trial]`, tip: 'Mirror the hero CTA. Repeat social proof. This is for scrollers who needed convincing.' },
    ],
    ctaVariants: [
      { text: `Start My Free Trial`, style: 'First-person, low commitment', expectedCTR: '+90% vs "Start Your Trial"' },
      { text: `Try ${name} Free`, style: 'Product-focused, inviting', expectedCTR: 'Baseline performance' },
      { text: `Get Started in 30 Seconds`, style: 'Speed-focused, urgency', expectedCTR: '+15% for impatient audiences' },
      { text: `See ${name} in Action`, style: 'Demo-focused, visual learners', expectedCTR: 'Best for complex products' },
      { text: `Join 10,000+ ${audience}`, style: 'Social proof CTA', expectedCTR: '+20% for community-driven products' },
      { text: `Claim My Free Account`, style: 'Ownership language', expectedCTR: '+25% for premium positioning' },
    ],
    socialProofFormats: [
      `"${name} saved us 10+ hours per week" — [Name], [Company] (text testimonial)`,
      `Video testimonial embed (30-60 seconds) — highest trust signal`,
      `Logo bar: "Trusted by teams at [5-8 recognizable logos]"`,
      `Counter: "10,000+ ${audience.toLowerCase()} and growing" (live or near-live)`,
      `Star rating: "4.9/5 on G2 from 500+ reviews" (with review platform logo)`,
      `Case study link: "See how [Company] grew 300% with ${name}"`,
      `Press mentions: "As featured in [TechCrunch, ProductHunt, Forbes]"`,
    ],
    objectionHandlers: [
      { objection: 'Is this worth the price?', response: `${name} pays for itself in the first week. Users save an average of [X hours/month]. That's $[Y] in time value.` },
      { objection: 'I already use [competitor]', response: `${name} offers [key differentiator]. Plus, we make switching easy — import your data in 2 minutes.` },
      { objection: 'I don\'t have time to learn a new tool', response: `${name} takes 5 minutes to set up. No training needed. If you can use [simple tool], you can use ${name}.` },
      { objection: 'Is my data safe?', response: `We use [encryption standard], are [SOC2/GDPR] compliant, and never sell your data. Full privacy policy at [link].` },
      { objection: 'What if I don\'t like it?', response: '14-day free trial, no credit card required. Cancel anytime with one click. We even help you export your data.' },
    ],
    seoMeta: {
      title: `${name} — ${value.charAt(0).toUpperCase() + value.slice(1)} | ${pageType}`,
      description: `${name} helps ${audience.toLowerCase()} ${value}. Free to start, no credit card required. Join 10,000+ users. Try it today.`,
      h1: hero.headline,
    },
    conversionChecklist: [
      'Headline answers "What is this?" in under 5 words',
      'Subheadline answers "Is it for me?" with audience-specific language',
      'CTA is visible above the fold without scrolling',
      'CTA uses first-person language ("My" not "Your")',
      'Social proof appears within first viewport',
      '"No credit card required" is visible near CTA',
      'Page loads in under 2 seconds on mobile',
      'Only ONE primary CTA per section (no competing actions)',
      'FAQ addresses top 5 purchase objections',
      'Testimonials include name, photo, role, and specific result',
      'Pricing section has toggle for monthly/annual',
      'Mobile layout tested — CTA thumb-reachable',
    ],
    abTestPlan: [
      'Test headline: PAS vs Bold Statement framework',
      'Test CTA: "Start My Free Trial" vs "Try Free" vs "See Demo"',
      'Test hero image: product screenshot vs abstract illustration vs video',
      'Test social proof: logo bar vs counter vs testimonial quote',
      'Test pricing: 2 tiers vs 3 tiers vs single price',
      'Test page length: long-form (7 sections) vs short (hero + CTA + FAQ)',
    ],
  };
}

export default function LandingCopyPage() {
  const [framework, setFramework] = useState<string>(frameworks[0]);
  const [pageType, setPageType] = useState<string>(pageTypes[0]);
  const [tone, setTone] = useState<string>(tones[0]);
  const [audience, setAudience] = useState<string>(audiences[0]);
  const [productName, setProductName] = useState('');
  const [valueProp, setValueProp] = useState('');
  const [result, setResult] = useState<LandingResult | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-lime-50 via-white to-green-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Landing Page Copy Generator</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Generate conversion-optimized landing page copy using proven frameworks. Hero sections, feature blocks, CTAs, objection handlers, and SEO meta — ready to build.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Copy Framework</label>
              <select value={framework} onChange={e => setFramework(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-lime-500 focus:border-transparent">
                {frameworks.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Page Type</label>
              <select value={pageType} onChange={e => setPageType(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-lime-500 focus:border-transparent">
                {pageTypes.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tone</label>
              <select value={tone} onChange={e => setTone(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-lime-500 focus:border-transparent">
                {tones.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Target Audience</label>
              <select value={audience} onChange={e => setAudience(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-lime-500 focus:border-transparent">
                {audiences.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
              <input type="text" value={productName} onChange={e => setProductName(e.target.value)} placeholder="e.g. PostCraft" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-lime-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Core Value Prop</label>
              <input type="text" value={valueProp} onChange={e => setValueProp(e.target.value)} placeholder="e.g. create social content 10x faster" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-lime-500 focus:border-transparent" />
            </div>
          </div>
          <button onClick={() => setResult(generateLandingCopy(framework, pageType, tone, audience, productName, valueProp))} className="w-full py-4 bg-gradient-to-r from-lime-600 to-green-600 text-white font-bold rounded-xl hover:from-lime-700 hover:to-green-700 transition-all shadow-lg hover:shadow-xl">Generate Landing Page Copy</button>
        </div>

        {result && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Hero Section</h2>
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
                <h1 className="text-3xl font-bold mb-3">{result.heroSection.headline}</h1>
                <p className="text-gray-300 text-lg mb-6">{result.heroSection.subheadline}</p>
                <div className="flex items-center gap-4 mb-4">
                  <button className="bg-lime-500 text-gray-900 px-6 py-3 rounded-xl font-bold">{result.heroSection.cta}</button>
                  <span className="text-gray-400 text-sm">{result.heroSection.microCopy}</span>
                </div>
                <p className="text-gray-400 text-sm">{result.heroSection.socialProof}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Alternative Headlines (A/B Test)</h2>
              <div className="space-y-2">{result.alternativeHeadlines.map((h, i) => <div key={i} className="bg-gray-50 rounded-xl p-4 text-gray-800 font-medium">{h}</div>)}</div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Page Sections</h2>
              <div className="space-y-6">{result.sections.map((s, i) => (
                <div key={i} className="border border-gray-100 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3"><span className="bg-lime-100 text-lime-700 px-3 py-1 rounded-lg text-sm font-bold">Section {i + 1}</span><span className="text-gray-500 text-sm">{s.name}</span></div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{s.headline}</h3>
                  <pre className="text-gray-700 text-sm whitespace-pre-wrap font-sans mb-3">{s.body}</pre>
                  <div className="bg-lime-50 rounded-lg p-3 text-lime-800 text-xs">Tip: {s.tip}</div>
                </div>
              ))}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">CTA Variants</h2>
                <div className="space-y-3">{result.ctaVariants.map((c, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-4">
                    <button className="bg-lime-500 text-gray-900 px-4 py-2 rounded-lg font-bold text-sm mb-2">{c.text}</button>
                    <p className="text-gray-500 text-xs">{c.style} — {c.expectedCTR}</p>
                  </div>
                ))}</div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Social Proof Formats</h2>
                <ul className="space-y-2">{result.socialProofFormats.map((s, i) => <li key={i} className="text-gray-700 text-sm flex gap-2"><span className="text-lime-500">&#9733;</span>{s}</li>)}</ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Objection Handlers</h2>
              <div className="space-y-3">{result.objectionHandlers.map((o, i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-4">
                  <p className="text-red-600 text-sm font-medium">{o.objection}</p>
                  <p className="text-gray-700 text-sm mt-1">{o.response}</p>
                </div>
              ))}</div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">SEO Meta Tags</h2>
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-xl p-4"><span className="text-xs font-semibold text-gray-500">TITLE TAG</span><p className="text-gray-800 text-sm mt-1 font-mono">{result.seoMeta.title}</p></div>
                <div className="bg-gray-50 rounded-xl p-4"><span className="text-xs font-semibold text-gray-500">META DESCRIPTION</span><p className="text-gray-800 text-sm mt-1 font-mono">{result.seoMeta.description}</p></div>
                <div className="bg-gray-50 rounded-xl p-4"><span className="text-xs font-semibold text-gray-500">H1</span><p className="text-gray-800 text-sm mt-1 font-mono">{result.seoMeta.h1}</p></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Conversion Checklist</h2>
                <ul className="space-y-2">{result.conversionChecklist.map((c, i) => <li key={i} className="text-gray-700 text-sm flex gap-2"><input type="checkbox" className="rounded" />{c}</li>)}</ul>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">A/B Test Plan</h2>
                <ul className="space-y-2">{result.abTestPlan.map((t, i) => <li key={i} className="text-gray-700 text-sm flex gap-2"><span className="text-purple-500">&#128300;</span>{t}</li>)}</ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
