'use client';
import { useState } from 'react';

const funnelStages = ['Awareness', 'Interest', 'Consideration', 'Decision', 'Retention', 'Advocacy'] as const;
const contentTypes = ['Blog Post', 'Social Post', 'Video', 'Email Sequence', 'Landing Page', 'Case Study', 'Webinar', 'Podcast'] as const;
const audiences = ['Cold Traffic', 'Warm Leads', 'Engaged Followers', 'Trial Users', 'Paying Customers', 'Power Users'] as const;
const industries = ['SaaS', 'E-commerce', 'Agency', 'Creator Economy', 'Health & Wellness', 'Finance', 'Education', 'Real Estate'] as const;

interface FrictionPoint {
  stage: string;
  friction: string;
  severity: number;
  cause: string;
  fix: string;
}

interface ClarityScore {
  section: string;
  score: number;
  complexityLevel: string;
  prerequisiteKnowledge: string;
  simplification: string;
}

interface CognitiveLadder {
  step: number;
  userState: string;
  contentGoal: string;
  format: string;
  emotionalTone: string;
  keyMessage: string;
}

interface AttentionCurve {
  phase: string;
  attentionLevel: number;
  informationDensity: string;
  technique: string;
  duration: string;
}

interface OverloadAlert {
  trigger: string;
  risk: number;
  symptom: string;
  remedy: string;
}

interface FlowResult {
  frictionPoints: FrictionPoint[];
  clarityScores: ClarityScore[];
  cognitiveLadder: CognitiveLadder[];
  attentionCurve: AttentionCurve[];
  overloadAlerts: OverloadAlert[];
}

function generateContentFlow(
  funnelStage: string,
  contentType: string,
  audience: string,
  industry: string,
  topic: string
): FlowResult {
  const topicLabel = topic || 'your topic';

  const frictionPointsData: Record<string, FrictionPoint[]> = {
    'Awareness': [
      { stage: 'First Impression', friction: 'Headline fails to communicate value in under 3 seconds', severity: 95, cause: 'Too much jargon or abstract language in the opening', fix: 'Lead with a specific outcome: "How [audience] can [achieve result] in [timeframe]"' },
      { stage: 'Hook Retention', friction: 'Reader drops off within first 10 seconds', severity: 90, cause: 'Opening paragraph is too general or theoretical', fix: 'Start with a surprising statistic, a bold claim, or a relatable micro-story' },
      { stage: 'Credibility Check', friction: 'Reader questions why they should listen to you', severity: 82, cause: 'No social proof or authority signals in the first 100 words', fix: 'Add a brief credibility marker: years of experience, number of clients, or a notable result' },
      { stage: 'Navigation Clarity', friction: 'Reader cannot predict what they will learn', severity: 78, cause: 'Missing table of contents, subheadings, or roadmap', fix: 'Add a visual roadmap or numbered list of what the content covers in the intro' },
      { stage: 'Visual Overload', friction: 'Too many competing visual elements cause scan fatigue', severity: 72, cause: 'Dense paragraphs, no white space, inconsistent formatting', fix: 'Use 2-3 sentence paragraphs, clear subheadings, and visual breaks every 150-200 words' },
    ],
    'Consideration': [
      { stage: 'Feature Comparison', friction: 'User cannot easily compare options side by side', severity: 92, cause: 'Features scattered across multiple pages without a comparison matrix', fix: 'Create a single comparison table with your top 3-5 differentiators highlighted' },
      { stage: 'Objection Handling', friction: 'Unaddressed concerns create invisible hesitation', severity: 88, cause: 'Common objections (price, complexity, risk) not proactively addressed', fix: 'Add an FAQ section that directly addresses the top 5 objections in your niche' },
      { stage: 'Social Proof Gap', friction: 'No relevant case study for the reader\'s specific situation', severity: 85, cause: 'Generic testimonials that don\'t match the reader\'s industry or scale', fix: `Include at least one case study from ${industry} with specific metrics and timeline` },
      { stage: 'Decision Paralysis', friction: 'Too many options without clear recommendation', severity: 80, cause: 'Presenting all features equally instead of guiding the decision', fix: 'Highlight "Most Popular" or "Best for [audience]" to reduce cognitive load' },
      { stage: 'Trust Verification', friction: 'Reader seeks third-party validation but finds none', severity: 76, cause: 'No external reviews, awards, or partner logos', fix: 'Add G2/Capterra ratings, press mentions, or industry certifications' },
    ],
    'Decision': [
      { stage: 'CTA Clarity', friction: 'User doesn\'t know exactly what happens when they click', severity: 94, cause: 'Vague CTAs like "Get Started" without context', fix: 'Use specific CTAs: "Start Your 14-Day Free Trial — No Credit Card Required"' },
      { stage: 'Risk Perception', friction: 'Perceived risk of commitment outweighs perceived value', severity: 90, cause: 'No money-back guarantee, free trial, or demo option visible', fix: 'Place risk-reversal messaging (guarantee, trial, cancellation policy) next to every CTA' },
      { stage: 'Pricing Confusion', friction: 'Complex pricing structure creates calculation anxiety', severity: 86, cause: 'Too many tiers, hidden fees, or per-unit pricing without examples', fix: 'Add a pricing calculator or "most popular for businesses like yours" recommendation' },
      { stage: 'Implementation Fear', friction: 'User worries about setup complexity or migration difficulty', severity: 82, cause: 'No mention of onboarding support, migration help, or time-to-value', fix: 'Add "Get set up in 15 minutes" or "Our team handles your migration" messaging' },
      { stage: 'Peer Validation', friction: 'User hesitates without seeing others in their position who chose this', severity: 78, cause: 'No industry-specific customer logos or relevant testimonials near CTA', fix: `Add "${industry} companies who chose us" section with logos and metrics` },
    ],
  };

  const defaultFrictionPoints: FrictionPoint[] = [
    { stage: 'Entry Point', friction: 'Content fails to establish relevance within 3 seconds', severity: 92, cause: 'Generic opening that could apply to anyone', fix: `Open with a specific problem that ${audience} faces in ${industry}` },
    { stage: 'Value Delivery', friction: 'Core insight buried under preamble', severity: 88, cause: 'Too much context before delivering actionable value', fix: 'Lead with your best insight. Context can follow — value cannot wait.' },
    { stage: 'Engagement Depth', friction: 'Reader skims instead of reads deeply', severity: 80, cause: 'Wall-of-text formatting without visual hierarchy', fix: 'Use bullet points, numbered lists, bold key phrases, and pull quotes' },
    { stage: 'Action Transition', friction: 'Content ends without clear next step', severity: 85, cause: 'Missing or weak CTA at the end of valuable content', fix: 'Every piece of content should end with one specific, actionable next step' },
    { stage: 'Retention Hook', friction: 'No reason for user to return or follow', severity: 75, cause: 'Content is complete but disposable — no series or community element', fix: 'Tease upcoming content, invite to a community, or offer a resource download' },
  ];

  const clarityScoresData: ClarityScore[] = [
    { section: 'Headline / Title', score: 72, complexityLevel: 'Low', prerequisiteKnowledge: 'None — must be instantly understandable', simplification: `Remove all jargon. A 12-year-old should understand what "${topicLabel}" content promises.` },
    { section: 'Opening Paragraph', score: 65, complexityLevel: 'Medium', prerequisiteKnowledge: 'Basic awareness of the problem', simplification: 'Start with the reader\'s felt experience: "You\'ve tried X. It didn\'t work. Here\'s why."' },
    { section: 'Core Argument', score: 58, complexityLevel: 'High', prerequisiteKnowledge: `Basic understanding of ${industry} concepts`, simplification: 'Use one analogy to make the core concept intuitive. Complex ideas need simple bridges.' },
    { section: 'Supporting Evidence', score: 62, complexityLevel: 'Medium-High', prerequisiteKnowledge: 'Comfort with data interpretation', simplification: 'Present data as "before vs after" stories rather than raw numbers. Context > precision.' },
    { section: 'Call to Action', score: 78, complexityLevel: 'Low', prerequisiteKnowledge: 'None', simplification: 'One CTA, one sentence, one action. "Click here to start your free trial" — nothing else.' },
    { section: 'Technical Details', score: 45, complexityLevel: 'Very High', prerequisiteKnowledge: `${industry}-specific terminology`, simplification: 'Move technical details into an expandable section or appendix. Lead with benefits, hide specs.' },
  ];

  const cognitiveLadderData: Record<string, CognitiveLadder[]> = {
    'Cold Traffic': [
      { step: 1, userState: 'Unaware of the problem', contentGoal: 'Create problem awareness without alarm', format: 'Relatable story or surprising statistic', emotionalTone: 'Curious, intrigued', keyMessage: `Did you know that most ${industry} professionals lose [X] hours per week on this?` },
      { step: 2, userState: 'Problem-aware but unsure of severity', contentGoal: 'Quantify the cost of inaction', format: 'Data visualization or calculator', emotionalTone: 'Concerned, motivated', keyMessage: 'The real cost of ignoring this is bigger than you think. Here are the numbers.' },
      { step: 3, userState: 'Seeking a general direction', contentGoal: 'Present the category of solutions', format: 'Comparison guide or framework', emotionalTone: 'Empowered, informed', keyMessage: 'There are 3 approaches to solving this. Here is how to choose the right one.' },
      { step: 4, userState: 'Evaluating specific options', contentGoal: 'Position your solution naturally', format: 'Case study or product demo', emotionalTone: 'Confident, decisive', keyMessage: `Here is how ${industry} leaders solved this exact problem — and the results they got.` },
      { step: 5, userState: 'Ready to commit but seeking validation', contentGoal: 'Remove final friction', format: 'Testimonial, guarantee, or free trial', emotionalTone: 'Safe, assured', keyMessage: 'Join 10,000+ professionals who already made this switch. Try it risk-free.' },
    ],
    'Warm Leads': [
      { step: 1, userState: 'Aware of you, not yet trusting', contentGoal: 'Demonstrate expertise depth', format: 'Deep-dive guide or original research', emotionalTone: 'Impressed, respectful', keyMessage: `We spent 6 months analyzing ${topicLabel}. Here is what nobody else is sharing.` },
      { step: 2, userState: 'Interested but comparing alternatives', contentGoal: 'Differentiate clearly', format: 'Comparison matrix or honest review', emotionalTone: 'Thoughtful, analytical', keyMessage: 'We are not the best fit for everyone. Here is who we are perfect for — and who should look elsewhere.' },
      { step: 3, userState: 'Leaning toward you but hesitant', contentGoal: 'Address specific objections', format: 'FAQ video or detailed case study', emotionalTone: 'Reassured, heard', keyMessage: 'We know your concern about [X]. Here is exactly how we handle it.' },
      { step: 4, userState: 'Ready for a conversation', contentGoal: 'Make the next step effortless', format: 'Personalized demo or guided walkthrough', emotionalTone: 'Excited, eager', keyMessage: 'Let us show you how this works for your specific situation. 15 minutes. No pressure.' },
      { step: 5, userState: 'Post-decision validation', contentGoal: 'Confirm their choice was right', format: 'Welcome sequence or quick-win guide', emotionalTone: 'Validated, optimistic', keyMessage: 'You made a great decision. Here is how to get your first result in 24 hours.' },
    ],
  };

  const defaultLadder: CognitiveLadder[] = [
    { step: 1, userState: 'Initial contact', contentGoal: 'Establish relevance and trust', format: 'Introductory content piece', emotionalTone: 'Welcoming, clear', keyMessage: `Welcome to the world of ${topicLabel}. Here is what matters most.` },
    { step: 2, userState: 'Learning phase', contentGoal: 'Educate without overwhelming', format: 'Step-by-step guide', emotionalTone: 'Patient, supportive', keyMessage: 'Let us break this down into 5 simple steps that anyone can follow.' },
    { step: 3, userState: 'Evaluation phase', contentGoal: 'Prove value through evidence', format: 'Case study or results showcase', emotionalTone: 'Confident, data-driven', keyMessage: `Here is proof that this approach works for ${industry} businesses.` },
    { step: 4, userState: 'Decision phase', contentGoal: 'Remove all remaining friction', format: 'Risk-reversal offer', emotionalTone: 'Secure, decisive', keyMessage: 'Try it free. Cancel anytime. We take on all the risk.' },
    { step: 5, userState: 'Onboarding phase', contentGoal: 'Deliver quick first win', format: 'Quick-start guide or walkthrough', emotionalTone: 'Energized, productive', keyMessage: 'Do this one thing in the first 10 minutes and you will see results immediately.' },
  ];

  const attentionCurveData: AttentionCurve[] = [
    { phase: 'Hook (0-3 seconds)', attentionLevel: 95, informationDensity: 'Minimal — one powerful idea', technique: 'Pattern interrupt, bold claim, or visceral visual. Zero context, pure hook.', duration: '1-3 seconds / 1-2 sentences' },
    { phase: 'Context (3-15 seconds)', attentionLevel: 80, informationDensity: 'Low — establish relevance', technique: 'Quickly establish why this matters to the reader specifically. Use "you" language.', duration: '10-15 seconds / 2-3 sentences' },
    { phase: 'Value Front-Load (15-60 seconds)', attentionLevel: 85, informationDensity: 'Medium-High — core insight', technique: 'Deliver your best insight early. Do not save it. Reward their attention immediately.', duration: '30-45 seconds / 1-2 paragraphs' },
    { phase: 'Deep Dive (1-5 minutes)', attentionLevel: 65, informationDensity: 'High — supporting details', technique: 'Break into scannable sections. Use visual hierarchy. Add pattern interrupts every 200 words.', duration: '2-4 minutes / multiple sections' },
    { phase: 'Re-engagement (midpoint)', attentionLevel: 70, informationDensity: 'Medium — fresh angle', technique: 'Introduce a surprising twist, a new perspective, or a practical tool. Reset attention.', duration: '30-60 seconds / 1 section' },
    { phase: 'Application (late content)', attentionLevel: 60, informationDensity: 'Medium — actionable steps', technique: 'Move from theory to practice. Checklists, templates, and "do this now" instructions.', duration: '1-2 minutes / step-by-step' },
    { phase: 'Close + CTA (final)', attentionLevel: 75, informationDensity: 'Low — single action', technique: 'Emotional summary sentence + one clear next step. End on a high note, not a whimper.', duration: '15-30 seconds / 1-3 sentences' },
  ];

  const overloadAlertsData: OverloadAlert[] = [
    { trigger: 'More than 3 concepts introduced without a break', risk: 90, symptom: 'Reader starts skimming or scrolling to the bottom', remedy: 'Add a summary box after every 3 new concepts: "Key takeaway: [one sentence]"' },
    { trigger: 'Technical jargon without immediate definition', risk: 85, symptom: 'Reader feels excluded and stops trusting the content', remedy: 'Define every technical term in plain language the first time it appears' },
    { trigger: 'Wall of text exceeding 200 words without visual break', risk: 82, symptom: 'Eye fatigue and reduced comprehension of subsequent content', remedy: 'Insert a subheading, bullet list, image, or quote every 150-200 words maximum' },
    { trigger: 'Multiple CTAs competing for attention', risk: 78, symptom: 'Decision paralysis — reader clicks nothing instead of choosing', remedy: 'One primary CTA per content section. Secondary CTAs should be visually subordinate.' },
    { trigger: 'Emotional intensity sustained too long without relief', risk: 75, symptom: 'Reader feels manipulated or exhausted by constant emotional pressure', remedy: 'Alternate between high-intensity and low-intensity sections. Give the reader room to breathe.' },
  ];

  return {
    frictionPoints: frictionPointsData[funnelStage] || defaultFrictionPoints,
    clarityScores: clarityScoresData,
    cognitiveLadder: cognitiveLadderData[audience] || defaultLadder,
    attentionCurve: attentionCurveData,
    overloadAlerts: overloadAlertsData,
  };
}

export default function ContentFlowPage() {
  const [funnelStage, setFunnelStage] = useState<string>(funnelStages[0]);
  const [contentType, setContentType] = useState<string>(contentTypes[0]);
  const [audience, setAudience] = useState<string>(audiences[0]);
  const [industry, setIndustry] = useState<string>(industries[0]);
  const [topic, setTopic] = useState('');
  const [result, setResult] = useState<FlowResult | null>(null);

  const severityColor = (v: number) => {
    if (v >= 85) return 'bg-red-500';
    if (v >= 70) return 'bg-orange-500';
    if (v >= 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const severityLabel = (v: number) => {
    if (v >= 85) return { text: 'Critical', cls: 'bg-red-100 text-red-700' };
    if (v >= 70) return { text: 'High', cls: 'bg-orange-100 text-orange-700' };
    if (v >= 50) return { text: 'Medium', cls: 'bg-yellow-100 text-yellow-700' };
    return { text: 'Low', cls: 'bg-green-100 text-green-700' };
  };

  const scoreColor = (v: number) => {
    if (v >= 70) return 'bg-green-500';
    if (v >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Content Flow Optimizer</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Optimize the cognitive journey through your content. Identify friction points, map attention curves, build cognitive ladders, and eliminate information overload.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Funnel Stage</label>
              <select value={funnelStage} onChange={e => setFunnelStage(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                {funnelStages.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Content Type</label>
              <select value={contentType} onChange={e => setContentType(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                {contentTypes.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Audience</label>
              <select value={audience} onChange={e => setAudience(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                {audiences.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Industry</label>
              <select value={industry} onChange={e => setIndustry(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                {industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Topic / Subject</label>
              <input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. email marketing automation, meal prep for busy parents" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
            </div>
          </div>
          <button
            onClick={() => setResult(generateContentFlow(funnelStage, contentType, audience, industry, topic))}
            className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl"
          >
            Optimize Content Flow
          </button>
        </div>

        {result && (
          <div className="space-y-6">
            {/* 1. Friction Points */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Friction Points</h2>
              <div className="space-y-4">
                {result.frictionPoints.map((f, i) => {
                  const label = severityLabel(f.severity);
                  return (
                    <div key={i} className="border border-gray-100 rounded-xl p-5">
                      <div className="flex flex-wrap items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-lg text-sm font-bold">{f.stage}</span>
                          <span className="font-semibold text-gray-900">{f.friction}</span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${label.cls}`}>{label.text}</span>
                      </div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-full bg-gray-200 rounded-full h-2"><div className={`h-2 rounded-full ${severityColor(f.severity)}`} style={{ width: `${f.severity}%` }} /></div>
                        <span className="text-sm font-bold text-gray-500 whitespace-nowrap">{f.severity}/100</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="bg-red-50 rounded-lg p-3">
                          <p className="text-xs font-semibold text-red-600 mb-1">CAUSE</p>
                          <p className="text-sm text-red-800">{f.cause}</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-3">
                          <p className="text-xs font-semibold text-green-600 mb-1">FIX</p>
                          <p className="text-sm text-green-800">{f.fix}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Clarity Scores */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Clarity Scores</h2>
              <div className="space-y-4">
                {result.clarityScores.map((c, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-5">
                    <div className="flex flex-wrap items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{c.section}</h3>
                      <span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-lg text-xs font-bold">{c.complexityLevel}</span>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-full bg-gray-200 rounded-full h-2.5"><div className={`h-2.5 rounded-full ${scoreColor(c.score)}`} style={{ width: `${c.score}%` }} /></div>
                      <span className="text-sm font-bold text-gray-600 whitespace-nowrap">{c.score}/100</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">Prerequisite: {c.prerequisiteKnowledge}</p>
                    <div className="bg-teal-50 rounded-lg p-3">
                      <p className="text-xs font-semibold text-teal-600 mb-1">SIMPLIFICATION</p>
                      <p className="text-sm text-teal-800">{c.simplification}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Cognitive Ladder */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Cognitive Ladder</h2>
              <div className="space-y-4">
                {result.cognitiveLadder.map((l, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold">{l.step}</span>
                      <div>
                        <h3 className="font-bold text-gray-900">{l.userState}</h3>
                        <span className="text-sm text-gray-500">{l.emotionalTone}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="bg-emerald-50 rounded-lg p-3">
                        <p className="text-xs font-semibold text-emerald-600 mb-1">GOAL</p>
                        <p className="text-sm text-emerald-800">{l.contentGoal}</p>
                      </div>
                      <div className="bg-teal-50 rounded-lg p-3">
                        <p className="text-xs font-semibold text-teal-600 mb-1">FORMAT</p>
                        <p className="text-sm text-teal-800">{l.format}</p>
                      </div>
                      <div className="bg-cyan-50 rounded-lg p-3">
                        <p className="text-xs font-semibold text-cyan-600 mb-1">KEY MESSAGE</p>
                        <p className="text-sm text-cyan-800">{l.keyMessage}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Attention Curve */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Attention Curve</h2>
              <div className="space-y-3">
                {result.attentionCurve.map((a, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-5">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="md:w-56">
                        <h3 className="font-semibold text-gray-900">{a.phase}</h3>
                        <span className="text-xs text-gray-500">{a.duration}</span>
                      </div>
                      <div className="flex items-center gap-3 md:w-40">
                        <div className="w-full bg-gray-200 rounded-full h-3"><div className="h-3 rounded-full bg-emerald-500" style={{ width: `${a.attentionLevel}%` }} /></div>
                        <span className="text-sm font-bold text-gray-600 whitespace-nowrap">{a.attentionLevel}%</span>
                      </div>
                      <div className="flex-1">
                        <span className="bg-teal-100 text-teal-700 px-2 py-0.5 rounded text-xs font-bold">{a.informationDensity}</span>
                        <p className="text-sm text-gray-600 mt-1">{a.technique}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Overload Alerts */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Overload Alerts</h2>
              <div className="space-y-4">
                {result.overloadAlerts.map((o, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-5">
                    <div className="flex flex-wrap items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{o.trigger}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${severityLabel(o.risk).cls}`}>{severityLabel(o.risk).text} Risk</span>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-full bg-gray-200 rounded-full h-2"><div className={`h-2 rounded-full ${severityColor(o.risk)}`} style={{ width: `${o.risk}%` }} /></div>
                      <span className="text-sm font-bold text-gray-500">{o.risk}/100</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-amber-50 rounded-lg p-3">
                        <p className="text-xs font-semibold text-amber-600 mb-1">SYMPTOM</p>
                        <p className="text-sm text-amber-800">{o.symptom}</p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <p className="text-xs font-semibold text-green-600 mb-1">REMEDY</p>
                        <p className="text-sm text-green-800">{o.remedy}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
