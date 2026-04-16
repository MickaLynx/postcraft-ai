'use client';
import { useState } from 'react';

const platforms = ['Instagram', 'TikTok', 'LinkedIn', 'Twitter/X', 'YouTube', 'Facebook', 'Pinterest', 'Threads'] as const;
const contentTypes = ['Product Review', 'Comparison Question', 'Feature Request', 'Price Inquiry', 'Competitor Mention', 'Testimonial', 'Complaint', 'General Discussion'] as const;
const industries = ['E-commerce', 'SaaS/Tech', 'Healthcare', 'Finance', 'Education', 'Real Estate', 'Food & Beverage', 'Fashion', 'Travel', 'Fitness'] as const;
const audienceSegments = ['New Visitors', 'Returning Users', 'Loyal Customers', 'Churned Users', "Competitors' Customers"] as const;

interface BuyingSignal {
  signal: string;
  confidence: number;
  description: string;
}

interface NurtureStep {
  step: number;
  action: string;
  timing: string;
  content: string;
}

interface IntentResult {
  intentScore: number;
  intentLevel: string;
  intentLevelDescription: string;
  buyingSignals: BuyingSignal[];
  recommendedActions: { level: string; action: string; why: string }[];
  conversionProbability: number;
  optimalResponseStrategy: { channel: string; tone: string; timing: string; template: string }[];
  nurtureSequence: NurtureStep[];
  competitivePositioning: string[];
}

function analyzeIntent(platform: string, contentType: string, industry: string, segment: string): IntentResult {
  const contentScores: Record<string, number> = {
    'Product Review': 72, 'Comparison Question': 81, 'Feature Request': 55, 'Price Inquiry': 88,
    'Competitor Mention': 65, 'Testimonial': 40, 'Complaint': 35, 'General Discussion': 20,
  };

  const segmentMultipliers: Record<string, number> = {
    'New Visitors': 0.7, 'Returning Users': 1.0, 'Loyal Customers': 0.6,
    'Churned Users': 0.85, "Competitors' Customers": 1.15,
  };

  const baseScore = contentScores[contentType] || 50;
  const multiplier = segmentMultipliers[segment] || 1.0;
  const intentScore = Math.min(100, Math.round(baseScore * multiplier));

  const intentLevel = intentScore >= 80 ? 'Ready to Buy' : intentScore >= 60 ? 'Comparing' : intentScore >= 40 ? 'Researching' : 'Browsing';
  const intentDescriptions: Record<string, string> = {
    'Ready to Buy': 'This user is showing strong purchase signals and is likely in the final decision-making stage. Immediate, personalized outreach is critical.',
    'Comparing': 'The user is actively evaluating options. They need differentiation, social proof, and competitive advantages to tip the decision.',
    'Researching': 'Early-stage interest detected. The user is gathering information and forming initial impressions. Educational content and value demonstration are key.',
    'Browsing': 'Passive engagement with no clear purchase intent. Focus on awareness, brand recall, and nurturing toward deeper engagement.',
  };

  const allSignals: BuyingSignal[] = [
    { signal: 'Price Sensitivity Indicator', confidence: contentType === 'Price Inquiry' ? 94 : contentType === 'Comparison Question' ? 72 : 35, description: 'User is evaluating cost-value ratio, indicating budget allocation readiness' },
    { signal: 'Feature Comparison Behavior', confidence: contentType === 'Comparison Question' ? 91 : contentType === 'Feature Request' ? 68 : 28, description: 'Active comparison between solutions suggests shortlist formation' },
    { signal: 'Solution Urgency Signal', confidence: contentType === 'Complaint' ? 78 : contentType === 'Price Inquiry' ? 82 : 40, description: 'Timeline pressure or pain point urgency accelerating decision' },
    { signal: 'Social Proof Seeking', confidence: contentType === 'Product Review' ? 87 : contentType === 'Testimonial' ? 75 : 32, description: 'Validation-seeking behavior indicates near-decision confidence building' },
    { signal: 'Competitor Dissatisfaction', confidence: segment === "Competitors' Customers" ? 89 : contentType === 'Competitor Mention' ? 76 : 22, description: 'Negative sentiment toward current solution creates switching opportunity' },
    { signal: 'Engagement Depth Score', confidence: segment === 'Returning Users' ? 83 : segment === 'Loyal Customers' ? 71 : 45, description: 'Repeated interactions indicate deepening interest and familiarity' },
    { signal: 'Decision-Maker Language', confidence: contentType === 'Price Inquiry' ? 88 : contentType === 'Feature Request' ? 65 : 30, description: 'Use of budget, ROI, implementation language suggests authority to purchase' },
    { signal: 'Trial/Demo Request Proximity', confidence: contentType === 'Price Inquiry' ? 92 : contentType === 'Comparison Question' ? 78 : 25, description: 'Behavioral proximity to requesting hands-on evaluation of product' },
  ];

  const conversionProbability = Math.min(95, Math.round(intentScore * 0.85 + (segment === "Competitors' Customers" ? 10 : 0)));

  const platformStrategies: Record<string, { channel: string; tone: string; timing: string; template: string }> = {
    'Instagram': { channel: 'DM + Story Reply', tone: 'Casual, visual-first, emoji-friendly', timing: 'Within 1 hour, peak: 11am-1pm & 7-9pm', template: 'Hey [name]! Saw your comment about [topic]. We actually have something perfect for that. Want me to send you a quick walkthrough?' },
    'TikTok': { channel: 'Comment Reply + Video Response', tone: 'Authentic, trending, Gen-Z friendly', timing: 'Within 30 minutes of posting, peak: 7-11pm', template: 'Omg yes! We get this question a lot. Check our latest video where we break down exactly how [feature] works for [use case].' },
    'LinkedIn': { channel: 'Comment + InMail Follow-up', tone: 'Professional, data-driven, thought leadership', timing: 'Within 2 hours, peak: Tue-Thu 8-10am', template: 'Great question, [name]. We published a case study on this exact topic. The results were [stat]. Happy to share the full analysis.' },
    'Twitter/X': { channel: 'Reply Thread + DM', tone: 'Concise, witty, value-packed', timing: 'Within 15 minutes, peak: 8-10am weekdays', template: 'This. 100%. We built [product] specifically because [pain point] was costing teams [metric]. Quick thread on how it works:' },
    'YouTube': { channel: 'Pinned Comment + Community Post', tone: 'Informative, detailed, SEO-aware', timing: 'Within 4 hours, peak: Thu-Sat 2-4pm', template: 'Thanks for watching! To answer your question about [topic]: [brief answer]. Full deep-dive in our next video dropping [day].' },
    'Facebook': { channel: 'Comment Reply + Messenger', tone: 'Friendly, community-oriented, inclusive', timing: 'Within 1 hour, peak: Wed-Fri 1-4pm', template: 'Hi [name], thanks for bringing this up! A lot of our community members have asked about this. Here is what we recommend:' },
    'Pinterest': { channel: 'Pin Comment + Board Curation', tone: 'Aspirational, helpful, resource-focused', timing: 'Within 6 hours, peak: weekends', template: 'Love that you saved this! We have a whole board dedicated to [topic] with step-by-step guides. Check it out: [link]' },
    'Threads': { channel: 'Thread Reply + Follow', tone: 'Conversational, authentic, opinion-driven', timing: 'Within 30 minutes, peak: 9am-12pm', template: 'Totally agree with your take on [topic]. We have been thinking about this a lot. Here is our perspective and what we are building:' },
  };

  const optimalResponseStrategy = [platformStrategies[platform] || platformStrategies['Instagram']];

  const nurtureByLevel: Record<string, NurtureStep[]> = {
    'Ready to Buy': [
      { step: 1, action: 'Send personalized offer or demo link', timing: 'Immediately (within 15 min)', content: 'Direct CTA with exclusive pricing, limited-time offer, or 1-on-1 demo booking. Remove all friction from the purchase path.' },
      { step: 2, action: 'Share customer success story matching their use case', timing: '24 hours after initial contact', content: 'Case study or testimonial from a similar company/persona. Focus on measurable results and implementation timeline.' },
      { step: 3, action: 'Follow up with urgency driver', timing: '48-72 hours after step 2', content: 'Price increase notification, limited availability, or expiring bonus. Ethical urgency that aligns with real business constraints.' },
    ],
    'Comparing': [
      { step: 1, action: 'Deliver comparison resource', timing: 'Within 2 hours', content: 'Honest feature comparison chart, competitor analysis, or "why us vs them" content. Lead with unique differentiators, not FUD.' },
      { step: 2, action: 'Offer social proof package', timing: '2-3 days after step 1', content: 'Bundle of testimonials, case studies, and review highlights relevant to their industry. Include video testimonials if available.' },
      { step: 3, action: 'Propose trial or pilot program', timing: '5-7 days after step 2', content: 'Risk-free trial, pilot program, or money-back guarantee offer. Reduce perceived risk of switching from current solution.' },
    ],
    'Researching': [
      { step: 1, action: 'Share educational content', timing: 'Within 4 hours', content: 'Comprehensive guide, whitepaper, or webinar replay addressing their specific question or pain point. No hard sell — pure value.' },
      { step: 2, action: 'Invite to community or newsletter', timing: '1 week after step 1', content: 'Exclusive community access, expert newsletter, or industry report. Build ongoing relationship through consistent value delivery.' },
      { step: 3, action: 'Introduce product naturally', timing: '2 weeks after step 2', content: 'Show how your product solves the problem they were researching. Use their exact language and pain points from initial interaction.' },
    ],
    'Browsing': [
      { step: 1, action: 'Engage with value-add comment', timing: 'Within 6 hours', content: 'Helpful response that demonstrates expertise without selling. Answer their question, share a tip, or provide a relevant resource.' },
      { step: 2, action: 'Retarget with brand content', timing: '1-2 weeks after step 1', content: 'Brand awareness content: mission stories, behind-the-scenes, team culture. Build familiarity and positive brand association.' },
      { step: 3, action: 'Offer low-commitment entry point', timing: '3-4 weeks after step 2', content: 'Free tool, template, or micro-product that delivers immediate value. Convert passive browser into active user with zero risk.' },
    ],
  };

  const competitivePositioningByIndustry: Record<string, string[]> = {
    'E-commerce': [
      'Highlight faster shipping, easier returns, or superior customer service vs competitors',
      'Showcase real customer photos and UGC — authenticity beats polished competitor ads',
      'Emphasize price-match guarantees or loyalty rewards that competitors lack',
      'Use social proof volume as a moat: "Trusted by X customers" creates switching cost',
    ],
    'SaaS/Tech': [
      'Lead with integration ecosystem — more integrations = higher switching cost for competitors',
      'Publish transparent pricing when competitors hide theirs — trust converts',
      'Showcase migration tools that make switching from competitor painless',
      'Feature customer retention rate as proof of product-market fit vs competitor churn',
    ],
    'Healthcare': [
      'Emphasize compliance certifications (HIPAA, SOC2) that competitors may lack',
      'Lead with patient outcomes data and clinical validation studies',
      'Highlight data security and privacy practices as core differentiators',
      'Use practitioner endorsements and medical advisory board credibility',
    ],
    'Finance': [
      'Transparent fee structure vs hidden competitor costs builds lasting trust',
      'Regulatory compliance and audit trail capabilities as non-negotiable differentiators',
      'Performance benchmarks with verifiable data — avoid vague claims',
      'Security infrastructure and insurance coverage as competitive moats',
    ],
    'Education': [
      'Learning outcome metrics and completion rates vs industry averages',
      'Accessibility features and multilingual support as competitive advantages',
      'Institutional partnerships and accreditation as trust signals',
      'Student success stories with measurable career impact data',
    ],
    'Real Estate': [
      'Market data accuracy and update frequency vs competitor platforms',
      'Agent success metrics: listings sold, days on market, price-to-list ratio',
      'Local market expertise signals that national competitors cannot replicate',
      'Virtual tour quality and tech-forward features as differentiation',
    ],
    'Food & Beverage': [
      'Ingredient transparency and sourcing stories that competitors avoid sharing',
      'Community and sustainability initiatives as brand value propositions',
      'User-generated recipes and creative uses that build cultural relevance',
      'Speed-to-delivery and freshness guarantees vs competitor logistics',
    ],
    'Fashion': [
      'Sustainability practices and ethical sourcing as generational differentiators',
      'Size inclusivity and fit technology that reduces returns vs competitors',
      'Creator and influencer authentic partnerships vs competitor paid placements',
      'Styling content and outfit inspiration that adds value beyond the product',
    ],
    'Travel': [
      'Flexible booking and cancellation policies vs rigid competitor terms',
      'Local experience curation that mass-market competitors cannot offer',
      'Price transparency with no hidden fees as a trust differentiator',
      'User review depth and authenticity vs competitor curated testimonials',
    ],
    'Fitness': [
      'Personalization depth: AI-driven programs vs competitor one-size-fits-all',
      'Community engagement and accountability features as retention advantages',
      'Expert credentialing and coach quality vs competitor generic content',
      'Progress tracking and data visualization that competitors lack',
    ],
  };

  return {
    intentScore,
    intentLevel,
    intentLevelDescription: intentDescriptions[intentLevel],
    buyingSignals: allSignals.sort((a, b) => b.confidence - a.confidence),
    recommendedActions: [
      { level: 'Ready to Buy', action: 'Deploy personalized offer within 15 minutes. Remove all purchase friction. Assign to senior sales rep.', why: 'High-intent moments decay rapidly — 78% of ready-to-buy signals go cold within 24 hours without engagement.' },
      { level: 'Comparing', action: 'Send comparison content and schedule a live demo. Position against specific competitors mentioned.', why: 'Comparison-stage users convert 3x higher when they receive proactive competitive analysis vs passive browsing.' },
      { level: 'Researching', action: 'Nurture with educational content. Add to email sequence. Track engagement depth for scoring.', why: 'Research-stage prospects who receive 3+ valuable touchpoints convert 62% more than those who receive only sales pitches.' },
      { level: 'Browsing', action: 'Retarget with brand awareness content. Engage authentically. Build recognition for future consideration.', why: 'Brand familiarity reduces evaluation time by 40% when browsing users eventually enter the purchase cycle.' },
    ],
    conversionProbability,
    optimalResponseStrategy,
    nurtureSequence: nurtureByLevel[intentLevel],
    competitivePositioning: competitivePositioningByIndustry[industry] || competitivePositioningByIndustry['E-commerce'],
  };
}

export default function IntentAnalyzerPage() {
  const [platform, setPlatform] = useState<string>(platforms[0]);
  const [contentType, setContentType] = useState<string>(contentTypes[0]);
  const [industry, setIndustry] = useState<string>(industries[0]);
  const [segment, setSegment] = useState<string>(audienceSegments[0]);
  const [result, setResult] = useState<IntentResult | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Purchase Intent Analyzer</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Analyze social media interactions to predict purchase intent. Detect buying signals, score conversion probability, and get actionable response strategies.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Platform</label>
              <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                {platforms.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Content Type</label>
              <select value={contentType} onChange={e => setContentType(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                {contentTypes.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Industry</label>
              <select value={industry} onChange={e => setIndustry(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                {industries.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Audience Segment</label>
              <select value={segment} onChange={e => setSegment(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                {audienceSegments.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => setResult(analyzeIntent(platform, contentType, industry, segment))} className="w-full py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl">Analyze Purchase Intent</button>
        </div>

        {result && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Intent Analysis Results</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 text-center">
                  <p className="text-sm text-gray-600 mb-1">Intent Score</p>
                  <p className={`text-4xl font-bold ${result.intentScore >= 80 ? 'text-green-600' : result.intentScore >= 60 ? 'text-amber-600' : result.intentScore >= 40 ? 'text-blue-600' : 'text-gray-600'}`}>{result.intentScore}/100</p>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 text-center">
                  <p className="text-sm text-gray-600 mb-1">Intent Level</p>
                  <p className={`text-2xl font-bold ${result.intentLevel === 'Ready to Buy' ? 'text-green-600' : result.intentLevel === 'Comparing' ? 'text-amber-600' : result.intentLevel === 'Researching' ? 'text-blue-600' : 'text-gray-600'}`}>{result.intentLevel}</p>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 text-center">
                  <p className="text-sm text-gray-600 mb-1">Conversion Probability</p>
                  <p className={`text-4xl font-bold ${result.conversionProbability >= 70 ? 'text-green-600' : result.conversionProbability >= 45 ? 'text-amber-600' : 'text-gray-600'}`}>{result.conversionProbability}%</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm bg-gray-50 rounded-xl p-4">{result.intentLevelDescription}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Buying Signals Detected</h2>
              <div className="space-y-3">{result.buyingSignals.map((s, i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-900 text-sm">{s.signal}</span>
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold ${s.confidence >= 75 ? 'bg-green-100 text-green-700' : s.confidence >= 50 ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'}`}>{s.confidence}% confidence</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                    <div className={`h-2 rounded-full ${s.confidence >= 75 ? 'bg-green-500' : s.confidence >= 50 ? 'bg-amber-500' : 'bg-gray-400'}`} style={{ width: `${s.confidence}%` }} />
                  </div>
                  <p className="text-gray-500 text-xs">{s.description}</p>
                </div>
              ))}</div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended Actions by Intent Level</h2>
              <div className="space-y-3">{result.recommendedActions.map((a, i) => (
                <div key={i} className={`rounded-xl p-4 ${a.level === result.intentLevel ? 'bg-amber-50 border-2 border-amber-300' : 'bg-gray-50 border border-gray-100'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${a.level === 'Ready to Buy' ? 'bg-green-100 text-green-700' : a.level === 'Comparing' ? 'bg-amber-100 text-amber-700' : a.level === 'Researching' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>{a.level}</span>
                    {a.level === result.intentLevel && <span className="text-xs text-amber-600 font-semibold">CURRENT LEVEL</span>}
                  </div>
                  <p className="text-gray-900 text-sm font-medium mb-1">{a.action}</p>
                  <p className="text-gray-500 text-xs">{a.why}</p>
                </div>
              ))}</div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Optimal Response Strategy ({platform})</h2>
              {result.optimalResponseStrategy.map((s, i) => (
                <div key={i} className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-amber-50 rounded-xl p-4"><p className="text-xs font-semibold text-amber-600 mb-1">CHANNEL</p><p className="text-gray-900 text-sm">{s.channel}</p></div>
                    <div className="bg-amber-50 rounded-xl p-4"><p className="text-xs font-semibold text-amber-600 mb-1">TONE</p><p className="text-gray-900 text-sm">{s.tone}</p></div>
                    <div className="bg-amber-50 rounded-xl p-4"><p className="text-xs font-semibold text-amber-600 mb-1">TIMING</p><p className="text-gray-900 text-sm">{s.timing}</p></div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs font-semibold text-gray-500 mb-1">RESPONSE TEMPLATE</p>
                    <p className="text-gray-700 text-sm italic">&quot;{s.template}&quot;</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Nurture Sequence ({result.intentLevel})</h2>
              <div className="space-y-4">{result.nurtureSequence.map((n, i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-lg text-xs font-bold">Step {n.step}</span>
                    <span className="text-gray-500 text-xs">{n.timing}</span>
                  </div>
                  <p className="font-bold text-gray-900 text-sm mb-1">{n.action}</p>
                  <p className="text-gray-600 text-sm">{n.content}</p>
                </div>
              ))}</div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Competitive Positioning Tips ({industry})</h2>
              <div className="space-y-3">{result.competitivePositioning.map((tip, i) => (
                <div key={i} className="bg-orange-50 rounded-xl p-4 flex gap-3">
                  <span className="text-orange-600 font-bold text-sm">{i + 1}.</span>
                  <p className="text-gray-700 text-sm">{tip}</p>
                </div>
              ))}</div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
