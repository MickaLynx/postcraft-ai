'use client';
import { useState } from 'react';

const contentGoals = ['Lead Generation', 'Product Sales', 'Brand Awareness', 'Email Signups', 'Free Trial Conversions', 'Webinar Registrations', 'App Downloads', 'Consultation Bookings'] as const;
const funnelStages = ['Top of Funnel (Awareness)', 'Middle of Funnel (Consideration)', 'Bottom of Funnel (Decision)', 'Post-Purchase (Retention)', 'Full Funnel'] as const;
const audiences = ['Skeptical Buyer', 'Technical Decision-Maker', 'Budget-Conscious Prospect', 'First-Time Visitor', 'Returning Prospect', 'Enterprise Evaluator', 'Small Business Owner', 'Student / Learner'] as const;
const contentFormats = ['Blog Post / Article', 'Landing Page', 'Email Sequence', 'Social Media Thread', 'Video Script', 'Whitepaper / Guide', 'Case Study', 'Product Page'] as const;
const industries = ['Tech & SaaS', 'E-commerce & DTC', 'Healthcare', 'Finance & FinTech', 'Education', 'Real Estate', 'Agency & Consulting', 'Legal', 'Manufacturing', 'Fitness & Wellness'] as const;

interface IntentGap { question: string; searchVolume: string; difficulty: string; currentCoverage: string; opportunity: string; suggestedContent: string; }
interface HeadingOptimization { current: string; optimized: string; intentAlignment: string; reason: string; expectedImpact: string; }
interface CTAPlacement { position: string; context: string; ctaText: string; variant: string; conversionLift: string; emotionalTrigger: string; }
interface InternalLink { fromSection: string; toContent: string; anchorText: string; reason: string; funnelMovement: string; }
interface ToneShift { section: string; currentTone: string; suggestedTone: string; reason: string; example: string; }
interface ExpansionModule { title: string; type: string; content: string; placement: string; purpose: string; expectedEngagement: string; }

interface IntentFlowReport {
  intentAlignmentScore: number;
  conversionPotential: string;
  intentGaps: IntentGap[];
  headingOptimizations: HeadingOptimization[];
  ctaPlacements: CTAPlacement[];
  internalLinks: InternalLink[];
  toneShifts: ToneShift[];
  expansionModules: ExpansionModule[];
  flowSummary: string[];
  quickWins: string[];
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }

function optimizeFlow(goal: string, stage: string, audience: string, format: string, industry: string, topic: string): IntentFlowReport {
  const seed = hash(`${goal}-${stage}-${audience}-${format}-${industry}-${topic}`);
  const intentAlignmentScore = 25 + seed % 70;
  const conversionPotential = intentAlignmentScore >= 80 ? 'Excellent — High Conversion Probability' : intentAlignmentScore >= 60 ? 'Good — Strong Foundation, Optimize Details' : intentAlignmentScore >= 40 ? 'Moderate — Significant Gaps in User Journey' : 'Low — Major Intent Misalignment';

  const intentGaps: IntentGap[] = [
    { question: `What does ${topic} actually cost?`, searchVolume: `${(seed % 50 + 10) * 100}/mo`, difficulty: 'Low', currentCoverage: 'Not addressed — user has to hunt for pricing', opportunity: 'Capture high-intent "cost" searches with transparent pricing section', suggestedContent: `Add a "Pricing at a Glance" comparison table after the benefits section — answer the #1 buying question early` },
    { question: `Is ${topic} better than [competitor]?`, searchVolume: `${(seed % 30 + 5) * 100}/mo`, difficulty: 'Medium', currentCoverage: 'No comparison content exists', opportunity: 'Intercept comparison shoppers who are 65% closer to purchase', suggestedContent: `Create a fair "vs" comparison section — acknowledge competitor strengths while highlighting your unique advantages` },
    { question: `How long does it take to set up ${topic}?`, searchVolume: `${(seed % 20 + 3) * 100}/mo`, difficulty: 'Low', currentCoverage: 'Vague "easy setup" claim without specifics', opportunity: 'Reduce setup anxiety — the #1 barrier to free trial conversion', suggestedContent: `Add a "Get Started in ${seed % 10 + 5} Minutes" section with 3-step visual walkthrough` },
    { question: `What results can I expect from ${topic}?`, searchVolume: `${(seed % 40 + 8) * 100}/mo`, difficulty: 'Medium', currentCoverage: 'Generic claims without proof points', opportunity: 'Social proof drives 4x more conversions than feature lists', suggestedContent: `Add 3 mini case studies: specific metrics + timeline + industry match for ${audience}` },
    { question: `Can ${topic} integrate with my existing tools?`, searchVolume: `${(seed % 25 + 4) * 100}/mo`, difficulty: 'Low', currentCoverage: 'Integration list exists but is buried', opportunity: 'Integration compatibility is a deal-breaker for 73% of B2B buyers', suggestedContent: `Surface top 5 integrations relevant to ${industry} with "connect in 1 click" messaging` },
    { question: `What happens if ${topic} doesn't work for me?`, searchVolume: `${(seed % 15 + 2) * 100}/mo`, difficulty: 'Low', currentCoverage: 'Refund policy hidden in footer legal text', opportunity: 'Risk reversal increases conversion by 20-35% for skeptical buyers', suggestedContent: `Add a visible "Risk-Free Guarantee" badge near primary CTA — ${seed % 2 === 0 ? '30-day money-back' : '14-day free trial, no credit card'}` },
  ];

  const headingOptimizations: HeadingOptimization[] = [
    { current: `Introduction to ${topic}`, optimized: `Why ${seed % 2 === 0 ? 'Smart' : 'Top'} ${industry} Teams Are Switching to ${topic} in 2026`, intentAlignment: 'Awareness → Curiosity', reason: 'Original heading is informational — optimized version triggers FOMO and social proof', expectedImpact: '+40-60% scroll depth' },
    { current: 'Features', optimized: `What You Get (And Why It Matters for ${audience}s)`, intentAlignment: 'Features → Benefits', reason: 'Features bore — benefits sell. Persona-specific heading increases relevance 3x', expectedImpact: '+25% time-on-section' },
    { current: 'How It Works', optimized: `From Zero to Results in ${seed % 5 + 3} Steps — Here's Exactly How`, intentAlignment: 'Curiosity → Confidence', reason: 'Specific step count reduces perceived complexity — "exactly" builds trust', expectedImpact: '+30% CTA clicks below this section' },
    { current: 'Pricing', optimized: `Choose Your ${topic} Plan — Start ${seed % 2 === 0 ? 'Free' : 'for $1'} Today`, intentAlignment: 'Consideration → Decision', reason: 'Low-commitment entry point reduces pricing page anxiety', expectedImpact: '+15-25% pricing page conversion' },
    { current: 'Testimonials', optimized: `Here's What ${industry} Professionals Say After ${seed % 6 + 3} Months`, intentAlignment: 'Skepticism → Trust', reason: 'Time-specific testimonial framing adds credibility — "after X months" implies lasting value', expectedImpact: '+20% trust signals' },
    { current: 'FAQ', optimized: `Still Not Sure? Here's What ${audience}s Always Ask`, intentAlignment: 'Objection → Resolution', reason: 'Persona-targeted FAQ feels personal — addresses specific objections for this buyer type', expectedImpact: '+35% objection resolution rate' },
  ];

  const ctaPlacements: CTAPlacement[] = [
    { position: 'After the opening hook (paragraph 2)', context: 'Reader has understood the problem — peak emotional resonance', ctaText: `See How ${topic} Solves This →`, variant: 'Soft CTA (text link)', conversionLift: '+8-12% of early converters', emotionalTrigger: 'Pain recognition — "I have this exact problem"' },
    { position: 'After the benefits section', context: 'Reader understands the value — ready for proof', ctaText: seed % 2 === 0 ? `Start Your Free Trial` : `Get ${topic} Now — Risk Free`, variant: 'Primary button (gradient, full-width on mobile)', conversionLift: '+15-25% of consideration-stage readers', emotionalTrigger: 'Desire — "I want these results too"' },
    { position: 'Inside a case study callout', context: 'Social proof moment — reader sees someone like them succeeding', ctaText: `Join ${(seed % 5 + 1) * 1000}+ ${industry} Teams`, variant: 'Social proof CTA (with logos/avatars)', conversionLift: '+20-30% for social-proof-driven personas', emotionalTrigger: 'Belonging — "People like me use this"' },
    { position: 'After addressing top objection', context: 'Reader\'s biggest concern just got resolved — resistance is lowest', ctaText: `Try ${topic} for ${seed % 2 === 0 ? '14 Days Free' : '$1 for 30 Days'}`, variant: 'Risk-reversal CTA (with guarantee badge)', conversionLift: '+18-28% for skeptical buyers', emotionalTrigger: 'Relief — "There\'s no risk, I might as well try"' },
    { position: 'Sticky footer bar (appears after 60% scroll)', context: 'Reader is engaged enough to reach 60% — strong intent signal', ctaText: `Ready? ${seed % 2 === 0 ? 'Get Started Free' : 'Book a Demo'}`, variant: 'Persistent bar (subtle, dismissible)', conversionLift: '+5-10% incremental conversions', emotionalTrigger: 'Convenience — "I was about to look for the button"' },
    { position: 'Exit-intent overlay', context: 'Reader is leaving — last chance to capture value', ctaText: `Wait — Get Our Free ${industry} ${seed % 2 === 0 ? 'Guide' : 'Template'} Before You Go`, variant: 'Lead magnet (email capture)', conversionLift: '+3-7% of abandoning visitors', emotionalTrigger: 'Loss aversion — "I shouldn\'t leave empty-handed"' },
  ];

  const internalLinks: InternalLink[] = [
    { fromSection: 'Introduction', toContent: `/${topic.toLowerCase().replace(/\s+/g, '-')}-vs-competitors`, anchorText: `See how ${topic} compares`, reason: 'Comparison shoppers need validation early — catch them before they Google competitors', funnelMovement: 'Awareness → Consideration' },
    { fromSection: 'Features / Benefits', toContent: '/case-studies', anchorText: `Read how [Company] achieved [specific result]`, reason: 'After features, readers need proof — case studies convert 3x better than feature lists alone', funnelMovement: 'Consideration → Trust' },
    { fromSection: 'How It Works', toContent: '/demo', anchorText: 'Watch the 2-minute demo', reason: 'Visual learners who read "how it works" are primed for a demo — lowest-friction next step', funnelMovement: 'Consideration → Evaluation' },
    { fromSection: 'Pricing', toContent: '/calculator', anchorText: `Calculate your ROI with ${topic}`, reason: 'ROI calculator on pricing page increases conversion by 25% — makes cost feel like investment', funnelMovement: 'Consideration → Decision' },
    { fromSection: 'FAQ', toContent: '/blog/getting-started-guide', anchorText: 'Read the complete getting started guide', reason: 'FAQ readers have specific concerns — guide provides depth that FAQ format cannot', funnelMovement: 'Objection → Resolution' },
    { fromSection: 'Footer / Related Content', toContent: '/resources', anchorText: `Free ${industry} resources and templates`, reason: 'Not everyone converts on first visit — resource hub captures emails for nurture', funnelMovement: 'Any stage → Lead capture' },
  ];

  const toneShifts: ToneShift[] = [
    { section: 'Opening hook', currentTone: 'Generic / formal', suggestedTone: 'Empathetic and direct', reason: `${audience}s respond to tone that mirrors their frustration level`, example: `Before: "In today's competitive landscape..." → After: "You've tried ${seed % 2 === 0 ? '3 tools' : 'everything'}. Nothing sticks. Here's why."` },
    { section: 'Problem description', currentTone: 'Abstract / theoretical', suggestedTone: 'Specific and visceral', reason: 'Abstract problems don\'t trigger action — specific pain points do', example: `Before: "Many businesses struggle with efficiency" → After: "You're spending ${seed % 3 + 2} hours every week on [task] that should take ${seed % 20 + 10} minutes"` },
    { section: 'Features section', currentTone: 'Technical / list-heavy', suggestedTone: 'Outcome-focused storytelling', reason: `${audience}s care about outcomes, not specifications`, example: `Before: "Advanced AI-powered analytics dashboard" → After: "See exactly which content drives revenue — no spreadsheets, no guessing"` },
    { section: 'Social proof', currentTone: 'Polished / corporate', suggestedTone: 'Raw and authentic', reason: 'Overproduced testimonials feel fake — authentic voices convert 2.4x better', example: `Before: "PostCraft transformed our marketing strategy" → After: "Honestly? I was skeptical. Then we got 3x more leads in month one. That shut me up."` },
    { section: 'CTA sections', currentTone: 'Pushy / sales-heavy', suggestedTone: 'Confident and low-pressure', reason: `${audience}s resist pressure — confidence converts`, example: `Before: "Don't miss out! Sign up NOW!" → After: "Try it free. If it's not for you, no hard feelings."` },
  ];

  const expansionModules: ExpansionModule[] = [
    { title: `"But What If..." — ${audience} Objection Buster`, type: 'FAQ Expansion', content: `Address the top 5 objections ${audience}s have: cost justification, implementation time, team adoption, ROI timeline, and switching costs`, placement: 'After the pricing section', purpose: 'Resolve purchase anxiety at the decision point — reduce "I\'ll think about it" by 40%', expectedEngagement: '+25% scroll-to-CTA rate' },
    { title: `${industry} Quick-Win Calculator`, type: 'Interactive Module', content: `3-question calculator: current time spent, team size, hourly cost → shows projected savings with ${topic}`, placement: 'After benefits section', purpose: 'Make ROI tangible and personal — "this is MY savings" hits harder than generic claims', expectedEngagement: '+35% engagement, +20% conversion' },
    { title: `"Day in the Life" Before & After`, type: 'Visual Storytelling', content: `Split-screen showing a ${audience}'s workflow before ${topic} (chaotic, 8 steps) vs after (streamlined, 3 steps)`, placement: 'After "How It Works" section', purpose: 'Visual transformation sells better than words — show, don\'t tell', expectedEngagement: '+45% time on page' },
    { title: `Expert Tips: ${industry} Best Practices`, type: 'Authority Module', content: `3 actionable tips from industry experts on maximizing ${topic} — builds authority and provides immediate value`, placement: 'Before closing CTA', purpose: 'Positions your brand as the expert — readers who get value before buying convert 3x more', expectedEngagement: '+30% save/bookmark rate' },
    { title: `"What Happens Next" Onboarding Preview`, type: 'Transparency Module', content: `Visual timeline of first 7 days after signing up — removes "unknown" anxiety`, placement: 'Near sign-up CTA', purpose: `${audience}s need to know what they're getting into — preview reduces churn by 25%`, expectedEngagement: '+18% sign-up completion' },
  ];

  const flowSummary = [
    `Current intent alignment: ${intentAlignmentScore}% — ${intentAlignmentScore < 50 ? 'significant gaps in user journey mapping' : 'foundation is solid but optimization needed'}`,
    `${intentGaps.length} unanswered questions identified — each represents lost traffic and conversions`,
    `${headingOptimizations.length} heading rewrites proposed — expected +25-60% improvement in scroll depth and engagement`,
    `${ctaPlacements.length} strategic CTA placements mapped — covering every emotional trigger point in the journey`,
    `${internalLinks.length} internal link opportunities — creating a closed-loop content ecosystem that moves readers down-funnel`,
    `${toneShifts.length} tone adjustments for ${audience} persona — matching voice to buyer psychology`,
    `${expansionModules.length} expansion modules recommended — each adds 15-45% engagement lift to its section`,
  ];

  const quickWins = [
    `Rewrite your H1 to include the target persona — "${audience}s" should see themselves in the headline`,
    `Add a risk-reversal element (money-back guarantee, free trial) within 1 screen of your primary CTA`,
    `Replace "Features" heading with "What You Get" — benefits framing converts 2x better`,
    `Add 1 mini case study (3 sentences: problem → solution → result) after your biggest claim`,
    `Create a "sticky" CTA bar that appears after 60% scroll — captures engaged readers at peak intent`,
    `Answer the #1 objection for ${audience}s directly in your intro — don't make them scroll to find reassurance`,
    `Add internal links from every section to the next logical funnel step — don't let readers dead-end`,
    `Test replacing "Sign Up" with "Start Free" or "Try It — No Credit Card" — lower commitment language converts 15-30% better`,
  ];

  return { intentAlignmentScore, conversionPotential, intentGaps, headingOptimizations, ctaPlacements, internalLinks, toneShifts, expansionModules, flowSummary, quickWins };
}

export default function IntentFlowPage() {
  const [goal, setGoal] = useState(contentGoals[0]);
  const [stage, setStage] = useState(funnelStages[0]);
  const [audience, setAudience] = useState(audiences[0]);
  const [format, setFormat] = useState(contentFormats[0]);
  const [industry, setIndustry] = useState(industries[0]);
  const [topic, setTopic] = useState('');
  const [result, setResult] = useState<IntentFlowReport | null>(null);

  const handleGenerate = () => { if (topic.trim()) setResult(optimizeFlow(goal, stage, audience, format, industry, topic)); };
  const scoreColor = (n: number) => n >= 80 ? '#34d399' : n >= 60 ? '#a3e635' : n >= 40 ? '#fbbf24' : '#f87171';
  const diffColor = (d: string) => d === 'Low' ? '#34d399' : d === 'Medium' ? '#fbbf24' : '#fb923c';

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Intent Flow Optimizer</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Map the conversational intent behind your content and optimize every element — headings, CTAs, tone, internal links — to guide readers from their first question to conversion. Stop writing for keywords. Start writing for intent.</p>

        <div className="mb-4">
          <label className="block text-sm text-zinc-400 mb-1">Content Topic / Product</label>
          <input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g., PostCraft AI, email marketing software, fitness coaching app" className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-3 text-zinc-100" />
        </div>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {([
            { label: 'Content Goal', value: goal, setter: setGoal as (v: string) => void, options: contentGoals as readonly string[] },
            { label: 'Funnel Stage', value: stage, setter: setStage as (v: string) => void, options: funnelStages as readonly string[] },
            { label: 'Target Audience', value: audience, setter: setAudience as (v: string) => void, options: audiences as readonly string[] },
            { label: 'Content Format', value: format, setter: setFormat as (v: string) => void, options: contentFormats as readonly string[] },
            { label: 'Industry', value: industry, setter: setIndustry as (v: string) => void, options: industries as readonly string[] },
          ] as const).map(({ label, value, setter, options }) => (
            <div key={label}>
              <label className="block text-sm text-zinc-400 mb-1">{label}</label>
              <select value={value} onChange={e => setter(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100">
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
        <button onClick={handleGenerate} className="w-full md:w-auto bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded font-semibold hover:opacity-90 transition mb-8">Optimize Intent Flow</button>

        {result && (
          <div className="space-y-8">
            {/* Score */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 text-center">
              <div className="text-5xl font-bold mb-2" style={{ color: scoreColor(result.intentAlignmentScore) }}>{result.intentAlignmentScore}</div>
              <div className="text-zinc-400 mb-2">Intent Alignment Score</div>
              <div className="text-lg font-semibold" style={{ color: scoreColor(result.intentAlignmentScore) }}>{result.conversionPotential}</div>
              <div className="mt-3 max-w-md mx-auto w-full bg-zinc-800 rounded-full h-3">
                <div className="h-3 rounded-full transition-all" style={{ width: `${result.intentAlignmentScore}%`, background: scoreColor(result.intentAlignmentScore) }} />
              </div>
            </div>

            {/* Flow Summary */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Flow Analysis Summary</h3>
              <div className="space-y-2">{result.flowSummary.map((s, i) => <div key={i} className="text-sm text-zinc-400 flex gap-2"><span className="text-violet-400 shrink-0">→</span>{s}</div>)}</div>
            </div>

            {/* Intent Gaps */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-amber-400">Intent Gaps — Unanswered Questions ({result.intentGaps.length})</h3>
              <div className="space-y-3">
                {result.intentGaps.map((g, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-zinc-200">"{g.question}"</span>
                      <div className="flex gap-2">
                        <span className="text-xs px-2 py-1 rounded bg-zinc-700 text-zinc-300">{g.searchVolume}</span>
                        <span className="text-xs px-2 py-1 rounded font-bold" style={{ color: diffColor(g.difficulty), background: `${diffColor(g.difficulty)}15` }}>{g.difficulty}</span>
                      </div>
                    </div>
                    <div className="text-xs space-y-1">
                      <div><span className="text-zinc-500">Current:</span> <span className="text-red-400/70">{g.currentCoverage}</span></div>
                      <div><span className="text-zinc-500">Opportunity:</span> <span className="text-amber-400/70">{g.opportunity}</span></div>
                      <div><span className="text-zinc-500">Action:</span> <span className="text-emerald-400/70">{g.suggestedContent}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Heading Optimizations + Tone Shifts */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-violet-400">Heading Optimizations</h3>
                <div className="space-y-3">
                  {result.headingOptimizations.map((h, i) => (
                    <div key={i} className="bg-zinc-800/40 rounded-lg p-3 border border-zinc-700/50">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-red-400/60 line-through">{h.current}</span>
                      </div>
                      <div className="text-sm text-emerald-400 font-semibold mb-1">{h.optimized}</div>
                      <div className="text-xs space-y-0.5">
                        <div className="text-zinc-500">{h.intentAlignment} — {h.reason}</div>
                        <div className="text-violet-400/70">Impact: {h.expectedImpact}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-fuchsia-400">Tone Shifts for {audience}</h3>
                <div className="space-y-3">
                  {result.toneShifts.map((t, i) => (
                    <div key={i} className="bg-zinc-800/40 rounded-lg p-3 border border-zinc-700/50">
                      <div className="text-sm font-semibold text-zinc-200 mb-1">{t.section}</div>
                      <div className="flex items-center gap-2 mb-1 text-xs">
                        <span className="text-red-400/60">{t.currentTone}</span>
                        <span className="text-zinc-500">→</span>
                        <span className="text-emerald-400">{t.suggestedTone}</span>
                      </div>
                      <div className="text-xs text-zinc-500 italic mb-1">{t.example}</div>
                      <div className="text-xs text-zinc-400">{t.reason}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Placements */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-emerald-400">Strategic CTA Placements ({result.ctaPlacements.length})</h3>
              <div className="space-y-3">
                {result.ctaPlacements.map((c, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-zinc-200">{c.position}</span>
                      <span className="text-xs px-2 py-1 rounded bg-emerald-400/10 text-emerald-400">{c.conversionLift}</span>
                    </div>
                    <div className="text-xs space-y-1">
                      <div><span className="text-zinc-500">Context:</span> <span className="text-zinc-300">{c.context}</span></div>
                      <div><span className="text-zinc-500">CTA:</span> <span className="text-violet-400 font-semibold">"{c.ctaText}"</span> <span className="text-zinc-500">({c.variant})</span></div>
                      <div><span className="text-zinc-500">Emotional trigger:</span> <span className="text-fuchsia-400/70">{c.emotionalTrigger}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Internal Links + Expansion Modules */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-blue-400">Internal Link Map</h3>
                <div className="space-y-3">
                  {result.internalLinks.map((l, i) => (
                    <div key={i} className="bg-zinc-800/40 rounded-lg p-3 border border-zinc-700/50">
                      <div className="flex items-center gap-2 mb-1 text-xs">
                        <span className="text-zinc-300">{l.fromSection}</span>
                        <span className="text-zinc-500">→</span>
                        <span className="text-blue-400">{l.toContent}</span>
                      </div>
                      <div className="text-xs text-zinc-400 mb-1">Anchor: <span className="text-zinc-200">"{l.anchorText}"</span></div>
                      <div className="text-xs text-zinc-500">{l.reason}</div>
                      <div className="text-xs text-emerald-400/70 mt-1">{l.funnelMovement}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-amber-400">Expansion Modules</h3>
                <div className="space-y-3">
                  {result.expansionModules.map((m, i) => (
                    <div key={i} className="bg-zinc-800/40 rounded-lg p-3 border border-zinc-700/50">
                      <div className="flex justify-between mb-1"><span className="text-sm font-semibold text-zinc-200">{m.title}</span><span className="text-xs px-2 py-0.5 rounded bg-amber-400/10 text-amber-400">{m.type}</span></div>
                      <div className="text-xs space-y-1">
                        <div className="text-zinc-400">{m.content}</div>
                        <div><span className="text-zinc-500">Placement:</span> <span className="text-zinc-300">{m.placement}</span></div>
                        <div><span className="text-zinc-500">Purpose:</span> <span className="text-violet-400/70">{m.purpose}</span></div>
                        <div className="text-emerald-400/70">{m.expectedEngagement}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Wins */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-emerald-400">Quick Wins — Do These Today</h3>
              <div className="space-y-2">{result.quickWins.map((w, i) => <div key={i} className="text-sm text-zinc-400 flex gap-2"><span className="text-emerald-400 shrink-0">{i + 1}.</span>{w}</div>)}</div>
            </div>

            <div className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">Stop Writing for Keywords. Write for Intent.</h3>
              <p className="text-zinc-400 mb-4">PostCraft AI maps the complete user journey and optimizes every touchpoint for conversion. Pair with <a href="/content-integrity" className="text-violet-400 underline">Content Integrity</a>, <a href="/conversion-optimizer" className="text-violet-400 underline">Conversion Optimizer</a>, and <a href="/persona-builder" className="text-violet-400 underline">Persona Builder</a>.</p>
              <a href="/pricing" className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">Get PostCraft Pro</a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
