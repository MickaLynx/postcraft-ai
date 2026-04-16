'use client';
import { useState } from 'react';

const platforms = ['Instagram', 'Twitter/X', 'LinkedIn', 'TikTok', 'Facebook', 'YouTube', 'Reddit'] as const;
const messageTypes = ['Complaint', 'Question', 'Praise', 'Feature Request', 'Bug Report', 'Spam', 'Collaboration Inquiry'] as const;
const tones = ['Professional', 'Friendly', 'Empathetic', 'Witty', 'Formal'] as const;
const industries = ['Tech/SaaS', 'E-commerce', 'Finance', 'Healthcare', 'Education', 'Food & Beverage', 'Fashion', 'Real Estate', 'Fitness', 'Agency'] as const;

interface ResponseVariant {
  label: string;
  response: string;
  bestFor: string;
}

interface InboxResult {
  sentimentAnalysis: { score: string; label: string; keywords: string[]; urgency: string; emotionalTone: string };
  responseVariants: ResponseVariant[];
  escalationCriteria: { condition: string; action: string; priority: string }[];
  responseTimeRec: { ideal: string; acceptable: string; warning: string; reason: string };
  followUpSequence: { timing: string; message: string; goal: string }[];
  bestPractices: string[];
  platformTips: string[];
}

function generateInboxResponse(platform: string, messageType: string, tone: string, brand: string, industry: string, originalMessage: string): InboxResult {
  const isNegative = messageType === 'Complaint' || messageType === 'Bug Report';
  const isPositive = messageType === 'Praise';
  const isOpportunity = messageType === 'Collaboration Inquiry' || messageType === 'Feature Request';

  const sentimentMap: Record<string, { score: string; label: string; emotionalTone: string }> = {
    'Complaint': { score: '2/10', label: 'Negative', emotionalTone: 'Frustrated / Disappointed' },
    'Question': { score: '5/10', label: 'Neutral', emotionalTone: 'Curious / Seeking Help' },
    'Praise': { score: '9/10', label: 'Positive', emotionalTone: 'Happy / Enthusiastic' },
    'Feature Request': { score: '6/10', label: 'Neutral-Positive', emotionalTone: 'Hopeful / Constructive' },
    'Bug Report': { score: '3/10', label: 'Negative', emotionalTone: 'Frustrated / Concerned' },
    'Spam': { score: '1/10', label: 'Irrelevant', emotionalTone: 'N/A — Automated' },
    'Collaboration Inquiry': { score: '7/10', label: 'Positive', emotionalTone: 'Professional / Eager' },
  };

  const sentiment = sentimentMap[messageType] || sentimentMap['Question'];

  const urgencyMap: Record<string, string> = {
    'Complaint': 'HIGH — respond within 30 minutes',
    'Bug Report': 'HIGH — respond within 1 hour',
    'Question': 'MEDIUM — respond within 2 hours',
    'Feature Request': 'LOW — respond within 24 hours',
    'Praise': 'MEDIUM — respond within 4 hours',
    'Spam': 'NONE — flag and ignore',
    'Collaboration Inquiry': 'LOW — respond within 24 hours',
  };

  const tonePrefix: Record<string, string> = {
    'Professional': 'Thank you for reaching out.',
    'Friendly': 'Hey there! Thanks for your message!',
    'Empathetic': 'We completely understand your concern.',
    'Witty': 'Well, you definitely caught our attention!',
    'Formal': 'Dear valued customer, thank you for contacting us.',
  };

  const brandName = brand || 'our team';
  const prefix = tonePrefix[tone] || tonePrefix['Professional'];

  const variantsByType: Record<string, ResponseVariant[]> = {
    'Complaint': [
      { label: 'Acknowledge & Resolve', response: `${prefix} We sincerely apologize for this experience. ${brandName} takes this seriously — we are investigating right now and will have a solution for you within [timeframe]. Can you DM us your order/account details so we can prioritize your case?`, bestFor: 'Standard complaints requiring immediate action' },
      { label: 'Empathy First', response: `${prefix} That is absolutely not the experience we want you to have. We hear you, and we are sorry. Let us make this right — our support lead is looking into this personally. Please DM us and we will fast-track your resolution.`, bestFor: 'Emotionally charged complaints' },
      { label: 'Public Accountability', response: `${prefix} You are right to call this out, and we appreciate your honesty. This is not up to ${brandName} standards. We are fixing this, and here is what we are doing: [specific action]. We will follow up within 24 hours.`, bestFor: 'Public-facing complaints with visibility' },
      { label: 'Offer Compensation', response: `${prefix} We dropped the ball here, and we own it. We would like to make this right with [specific compensation]. Please DM us your details and we will get this sorted immediately.`, bestFor: 'Repeat customers or severe issues' },
      { label: 'Redirect to DM', response: `${prefix} We want to resolve this for you as quickly as possible. To protect your privacy and get into the details, could you DM us? Our team is standing by to help.`, bestFor: 'Sensitive issues requiring private discussion' },
    ],
    'Question': [
      { label: 'Direct Answer', response: `${prefix} Great question! [Answer]. Let us know if you need anything else — we are here to help!`, bestFor: 'Simple factual questions' },
      { label: 'Answer + Resource', response: `${prefix} [Answer]. We also have a detailed guide on this: [link]. Feel free to reach out if you have more questions!`, bestFor: 'Questions that benefit from deeper resources' },
      { label: 'Answer + Upsell', response: `${prefix} [Answer]. By the way, our [product/feature] makes this even easier — check it out at [link]!`, bestFor: 'Questions related to product capabilities' },
      { label: 'Community Redirect', response: `${prefix} This is a popular question! [Brief answer]. Our community has great discussions about this at [community link]. Would love to see you there!`, bestFor: 'Questions that benefit from community engagement' },
      { label: 'Personalized Help', response: `${prefix} That depends on your specific situation! Can you DM us a few details so we can give you the most accurate answer? Our ${industry} specialists are ready to help.`, bestFor: 'Complex questions requiring context' },
    ],
    'Praise': [
      { label: 'Grateful + Share', response: `${prefix} This absolutely made our day! Thank you for the kind words. Would you mind if we shared this? People like you are why ${brandName} exists!`, bestFor: 'Testimonial-worthy praise' },
      { label: 'Humble + Engage', response: `${prefix} You are too kind! We are so glad you are enjoying [product/service]. What is your favorite feature? We would love to know!`, bestFor: 'Building deeper engagement' },
      { label: 'Celebrate + Reward', response: `${prefix} WOW, thank you! As a thank you, we would love to send you [reward/exclusive access]. DM us and we will set it up!`, bestFor: 'Loyal customers worth rewarding' },
      { label: 'Community Highlight', response: `${prefix} Amazing feedback! We are featuring you in our community spotlight this week. You are exactly the kind of [customer/creator] we love working with!`, bestFor: 'Active community members' },
      { label: 'Referral Nudge', response: `${prefix} Thank you so much! If you know anyone who could benefit from ${brandName}, we would love for you to spread the word. Here is a special link: [referral link]`, bestFor: 'Converting satisfied customers into advocates' },
    ],
    'Feature Request': [
      { label: 'Acknowledge + Log', response: `${prefix} Love this idea! We have added it to our product roadmap and will keep you updated on progress. Your input shapes what we build next!`, bestFor: 'Valid feature requests aligned with roadmap' },
      { label: 'Already Planned', response: `${prefix} Great minds think alike — this is actually in development! We expect to launch it [timeframe]. Want to be a beta tester? DM us!`, bestFor: 'Features already on the roadmap' },
      { label: 'Alternative Exists', response: `${prefix} We appreciate the suggestion! Did you know you can already do something similar with [existing feature]? Here is how: [explanation]. We are also exploring a dedicated solution!`, bestFor: 'Requests that existing features partially solve' },
      { label: 'Community Vote', response: `${prefix} Excellent suggestion! We have added this to our public feature board at [link]. If others vote for it, it will move up our priority list. Go rally the troops!`, bestFor: 'Building community engagement around product' },
      { label: 'Needs Research', response: `${prefix} Interesting idea! We need to think through the implications. Would you be open to a quick 10-minute call so we can understand your use case better? DM us to schedule!`, bestFor: 'Complex requests requiring deeper understanding' },
    ],
    'Bug Report': [
      { label: 'Acknowledge + Fix', response: `${prefix} Thank you for reporting this — we have reproduced the issue and our engineering team is on it. Expected fix: [timeframe]. We will notify you when it is resolved.`, bestFor: 'Confirmed bugs' },
      { label: 'Need More Info', response: `${prefix} We want to fix this ASAP. Could you DM us: 1) Your device/browser, 2) Steps to reproduce, 3) Any screenshots? This will help us resolve it faster.`, bestFor: 'Bugs needing reproduction steps' },
      { label: 'Known Issue + Workaround', response: `${prefix} We are aware of this issue and actively working on a fix. In the meantime, here is a workaround: [steps]. We will update you as soon as the permanent fix is live.`, bestFor: 'Known bugs with existing workarounds' },
      { label: 'Fixed Already', response: `${prefix} Good news — we actually just pushed a fix for this! Can you try clearing your cache and refreshing? Let us know if it is still happening.`, bestFor: 'Recently fixed bugs' },
      { label: 'Escalate + Compensate', response: `${prefix} This is a serious issue and we apologize for the disruption. We have escalated this to our senior engineering team. As a gesture of goodwill, we have [compensation]. DM us for details.`, bestFor: 'Critical bugs affecting user experience' },
    ],
    'Spam': [
      { label: 'Ignore', response: '[No response needed — flag as spam and block if repeated]', bestFor: 'Obvious spam' },
      { label: 'Polite Decline', response: 'Thank you for your message, but this does not align with our current needs. Wishing you the best!', bestFor: 'Borderline spam that might be legitimate' },
      { label: 'Report', response: '[Report to platform and block user — do not engage]', bestFor: 'Malicious spam or phishing' },
      { label: 'Humor Deflect', response: 'We appreciate the enthusiasm, but our social team has a strict "no unsolicited crypto/MLM" policy. Have a great day!', bestFor: 'Spam from real accounts (visible to followers)' },
      { label: 'Template Block', response: '[Auto-filter: Add keywords to spam filter list and block sender]', bestFor: 'Repeated spam patterns' },
    ],
    'Collaboration Inquiry': [
      { label: 'Interested + Qualify', response: `${prefix} We love collaborating with creators in the ${industry} space! Can you DM us your media kit and what you have in mind? We will review and get back to you within 48 hours.`, bestFor: 'Promising collaborators worth exploring' },
      { label: 'Application Process', response: `${prefix} Thanks for reaching out! We have a formal collaboration process — please apply here: [link]. Our partnerships team reviews applications weekly.`, bestFor: 'High volume of inquiries' },
      { label: 'Not Right Now', response: `${prefix} We appreciate your interest! We are not taking on new collaborations this quarter, but we would love to revisit in [month]. Follow us to stay updated on partnership opportunities!`, bestFor: 'Pausing collaborations temporarily' },
      { label: 'Counter-Offer', response: `${prefix} Interesting proposal! We typically structure our collaborations as [your preferred format]. Would this work for you? DM us to discuss details.`, bestFor: 'Reshaping proposals to fit your model' },
      { label: 'Refer Out', response: `${prefix} While this is not quite the right fit for ${brandName}, we think [partner/alternative] might be perfect for what you are looking for. Good luck!`, bestFor: 'Well-intentioned but mismatched proposals' },
    ],
  };

  const responseVariants = variantsByType[messageType] || variantsByType['Question'];

  const escalationCriteria = [
    { condition: 'Message contains legal threats or mentions of lawyers', action: 'Immediately escalate to legal team — do NOT respond publicly', priority: 'CRITICAL' },
    { condition: 'Customer reports data breach or security concern', action: 'Escalate to security team within 15 minutes', priority: 'CRITICAL' },
    { condition: 'Same complaint received 3+ times from different users', action: 'Escalate to product team — potential systemic issue', priority: 'HIGH' },
    { condition: 'Message from verified/high-follower account (10K+)', action: 'Escalate to senior community manager for personalized response', priority: 'HIGH' },
    { condition: 'Message involves discrimination, harassment, or threats', action: 'Document, report to platform, escalate to management', priority: 'CRITICAL' },
    { condition: 'Customer explicitly requests manager/supervisor', action: 'Acknowledge and transfer to team lead within 30 minutes', priority: 'MEDIUM' },
    { condition: 'Issue unresolved after 3 back-and-forth exchanges', action: 'Escalate to dedicated support agent with full context', priority: 'MEDIUM' },
  ];

  const responseTimeMap: Record<string, { ideal: string; acceptable: string; warning: string; reason: string }> = {
    'Complaint': { ideal: '15-30 minutes', acceptable: '1 hour', warning: 'After 2 hours, negative sentiment compounds', reason: 'Fast response reduces public damage by 70%' },
    'Question': { ideal: '1-2 hours', acceptable: '4 hours', warning: 'After 8 hours, customer likely found answer elsewhere', reason: 'Quick answers convert browsers to buyers' },
    'Praise': { ideal: '2-4 hours', acceptable: '12 hours', warning: 'After 24 hours, the moment has passed', reason: 'Timely acknowledgment increases loyalty' },
    'Feature Request': { ideal: '4-8 hours', acceptable: '24 hours', warning: 'After 48 hours, user feels ignored', reason: 'Shows you listen to your community' },
    'Bug Report': { ideal: '30-60 minutes', acceptable: '2 hours', warning: 'After 4 hours, user assumes you do not care', reason: 'Speed of acknowledgment matters more than speed of fix' },
    'Spam': { ideal: 'N/A', acceptable: 'N/A', warning: 'Do not engage', reason: 'Any response validates spammer behavior' },
    'Collaboration Inquiry': { ideal: '24 hours', acceptable: '48 hours', warning: 'After 72 hours, they move to competitors', reason: 'Professional courtesy in partnership discussions' },
  };

  const platformTipsMap: Record<string, string[]> = {
    'Instagram': ['Use Stories to acknowledge complaints publicly (shows transparency)', 'Reply to comments within the first 30 min for algorithm boost', 'DM for detailed support conversations', 'Use Quick Replies for common questions'],
    'Twitter/X': ['Quote-tweet praise to amplify positive sentiment', 'Use threads for detailed responses to complex issues', 'Pin important service updates during outages', 'Monitor mentions AND keywords (not just tags)'],
    'LinkedIn': ['Keep responses professional — your CEO might see them', 'Feature request responses can become thought leadership', 'Tag relevant team members for authentic responses', 'Long-form replies perform well on LinkedIn'],
    'TikTok': ['Reply with video for maximum engagement (10x text replies)', 'Use duet/stitch for praise and collaboration responses', 'Keep written replies under 150 characters', 'Humor works better than corporate speak on TikTok'],
    'Facebook': ['Use Facebook Messenger for support escalation', 'Respond to reviews (they affect your Page score)', 'Utilize auto-responses for after-hours messages', 'Pin FAQ responses in Group discussions'],
    'YouTube': ['Heart comments to show you read them (even without reply)', 'Pin the best praise comment on each video', 'Reply within 24 hours for the YouTube algorithm', 'Creator heart + pin = maximum engagement signal'],
    'Reddit': ['Never use corporate speak — Redditors will destroy you', 'Be transparent and honest (Reddit detects BS instantly)', 'Engage with the community, not just your mentions', 'Give awards to valuable feedback and bug reports'],
  };

  return {
    sentimentAnalysis: {
      score: sentiment.score,
      label: sentiment.label,
      keywords: isNegative ? ['issue', 'problem', 'frustrating', 'disappointed', 'broken'] : isPositive ? ['love', 'amazing', 'excellent', 'thank you', 'perfect'] : ['question', 'wondering', 'possible', 'how to', 'feature'],
      urgency: urgencyMap[messageType] || 'MEDIUM',
      emotionalTone: sentiment.emotionalTone,
    },
    responseVariants,
    escalationCriteria,
    responseTimeRec: responseTimeMap[messageType] || responseTimeMap['Question'],
    followUpSequence: isNegative ? [
      { timing: '2 hours after initial response', message: `Just checking in — has the issue been resolved? ${brandName} wants to make sure you are taken care of.`, goal: 'Confirm resolution and show continued care' },
      { timing: '48 hours after resolution', message: `Hi again! We wanted to follow up and make sure everything is working perfectly now. Your feedback helped us improve — thank you for your patience!`, goal: 'Rebuild trust and confirm satisfaction' },
      { timing: '1 week after resolution', message: `We made some improvements based on feedback like yours. Would love for you to try [feature/update] and let us know what you think!`, goal: 'Convert detractor to advocate' },
    ] : isPositive ? [
      { timing: '24 hours later', message: `By the way, we are launching [new feature/product] next week that you might love! Want early access?`, goal: 'Capitalize on positive sentiment for upsell' },
      { timing: '1 week later', message: `We featured your feedback in our team meeting — you inspired us! Here is a little thank you: [exclusive offer]`, goal: 'Deepen relationship with brand champions' },
      { timing: '1 month later', message: `We have not forgotten about you! Here is an exclusive preview of what is coming next at ${brandName}. Thoughts?`, goal: 'Maintain long-term engagement' },
    ] : [
      { timing: '24 hours after response', message: `Did our answer help? Let us know if you need anything else — we are always here!`, goal: 'Confirm satisfaction and close the loop' },
      { timing: '1 week later', message: `We have updated our [FAQ/docs/feature] based on questions like yours. Check it out: [link]`, goal: 'Show continuous improvement' },
      { timing: '2 weeks later', message: `Quick question — how has your experience with ${brandName} been? Any other feedback? We are all ears!`, goal: 'Proactive relationship building' },
    ],
    bestPractices: [
      'Always acknowledge the message within your response time SLA — even if you do not have a full answer yet',
      'Mirror the customer tone: formal message = formal reply, casual = casual',
      'Never delete negative comments (unless abusive) — respond publicly, resolve privately',
      'Use the customer name when available to personalize the response',
      'End every response with a clear next step or invitation to continue the conversation',
      'Log every interaction for pattern analysis and monthly reporting',
      'Train your AI/team to recognize escalation triggers before they escalate publicly',
      'Maintain a response template library but always customize 20% for authenticity',
    ],
    platformTips: platformTipsMap[platform] || platformTipsMap['Instagram'],
  };
}

export default function SocialInboxPage() {
  const [platform, setPlatform] = useState<string>(platforms[0]);
  const [messageType, setMessageType] = useState<string>(messageTypes[0]);
  const [tone, setTone] = useState<string>(tones[0]);
  const [industry, setIndustry] = useState<string>(industries[0]);
  const [brand, setBrand] = useState('');
  const [originalMessage, setOriginalMessage] = useState('');
  const [result, setResult] = useState<InboxResult | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Social Inbox Response Generator</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Generate professional response templates for social media comments and DMs. Includes sentiment analysis, escalation criteria, and follow-up sequences.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Platform</label>
              <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent">
                {platforms.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Message Type</label>
              <select value={messageType} onChange={e => setMessageType(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent">
                {messageTypes.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Response Tone</label>
              <select value={tone} onChange={e => setTone(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent">
                {tones.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Industry</label>
              <select value={industry} onChange={e => setIndustry(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent">
                {industries.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Brand Name</label>
              <input type="text" value={brand} onChange={e => setBrand(e.target.value)} placeholder="e.g., Acme Corp" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Original Message (optional)</label>
              <input type="text" value={originalMessage} onChange={e => setOriginalMessage(e.target.value)} placeholder="Paste the comment/DM here..." className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent" />
            </div>
          </div>
          <button onClick={() => setResult(generateInboxResponse(platform, messageType, tone, brand, industry, originalMessage))} className="w-full py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold rounded-xl hover:from-violet-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl">Generate Responses</button>
        </div>

        {result && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Sentiment Analysis</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Score</p>
                  <p className="text-2xl font-bold text-violet-600">{result.sentimentAnalysis.score}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Sentiment</p>
                  <p className={`text-lg font-bold ${result.sentimentAnalysis.label === 'Positive' ? 'text-green-600' : result.sentimentAnalysis.label === 'Negative' ? 'text-red-600' : 'text-amber-600'}`}>{result.sentimentAnalysis.label}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Urgency</p>
                  <p className="text-sm font-bold text-gray-900">{result.sentimentAnalysis.urgency.split(' — ')[0]}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Emotional Tone</p>
                  <p className="text-sm font-medium text-gray-700">{result.sentimentAnalysis.emotionalTone}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Keywords</p>
                  <div className="flex flex-wrap gap-1 justify-center">{result.sentimentAnalysis.keywords.map((k, i) => <span key={i} className="bg-violet-100 text-violet-700 px-2 py-0.5 rounded text-xs">{k}</span>)}</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Response Variants (5 Options)</h2>
              <div className="space-y-4">{result.responseVariants.map((v, i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-lg text-xs font-bold">Option {i + 1}</span>
                    <span className="font-bold text-gray-900">{v.label}</span>
                  </div>
                  <p className="text-gray-700 text-sm bg-gray-50 rounded-lg p-3 mb-2">{v.response}</p>
                  <p className="text-gray-500 text-xs">Best for: {v.bestFor}</p>
                </div>
              ))}</div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Response Time Recommendation</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-green-600 font-semibold mb-1">Ideal</p>
                  <p className="text-lg font-bold text-green-700">{result.responseTimeRec.ideal}</p>
                </div>
                <div className="bg-amber-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-amber-600 font-semibold mb-1">Acceptable</p>
                  <p className="text-lg font-bold text-amber-700">{result.responseTimeRec.acceptable}</p>
                </div>
                <div className="bg-red-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-red-600 font-semibold mb-1">Warning</p>
                  <p className="text-sm font-bold text-red-700">{result.responseTimeRec.warning}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm text-center">{result.responseTimeRec.reason}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Follow-Up Sequence (3 Messages)</h2>
              <div className="space-y-4">{result.followUpSequence.map((f, i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-4 flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-violet-100 text-violet-700 rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</div>
                  <div>
                    <p className="text-xs text-violet-600 font-semibold mb-1">{f.timing}</p>
                    <p className="text-gray-700 text-sm mb-1">{f.message}</p>
                    <p className="text-gray-500 text-xs">Goal: {f.goal}</p>
                  </div>
                </div>
              ))}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Escalation Criteria</h2>
                <div className="space-y-3">{result.escalationCriteria.map((e, i) => (
                  <div key={i} className="bg-red-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${e.priority === 'CRITICAL' ? 'bg-red-200 text-red-800' : e.priority === 'HIGH' ? 'bg-orange-200 text-orange-800' : 'bg-amber-200 text-amber-800'}`}>{e.priority}</span>
                    </div>
                    <p className="text-gray-900 text-sm font-medium">{e.condition}</p>
                    <p className="text-gray-600 text-xs mt-1">{e.action}</p>
                  </div>
                ))}</div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Platform Tips ({platform})</h2>
                <ul className="space-y-2">{result.platformTips.map((t, i) => <li key={i} className="text-gray-700 text-sm bg-gray-50 rounded-lg p-3">{t}</li>)}</ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Community Management Best Practices</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{result.bestPractices.map((b, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-4 text-gray-700 text-sm">{b}</div>
              ))}</div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
