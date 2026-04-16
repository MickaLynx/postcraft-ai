'use client';
import { useState } from 'react';

const eventTypes = ['Webinar / Live Session', 'Product Launch', 'Conference / Summit', 'Workshop / Training', 'Community Meetup', 'Sales Event / Flash Sale', 'Charity / Fundraiser', 'Podcast Episode Launch', 'Award Ceremony', 'Beta Access / Early Bird', 'Partnership Announcement', 'Annual Report / Recap'] as const;
const industries = ['Tech & SaaS', 'Finance', 'Health & Wellness', 'E-commerce', 'Education', 'Real Estate', 'Creative & Design', 'Food & Beverage', 'Travel & Hospitality', 'Non-Profit', 'Entertainment', 'B2B Services'] as const;
const platforms = ['Instagram', 'LinkedIn', 'Twitter/X', 'TikTok', 'Facebook', 'YouTube', 'Email', 'All Platforms'] as const;
const tones = ['Professional & Polished', 'Casual & Exciting', 'Exclusive & Premium', 'Urgent & FOMO-Free', 'Educational & Informative', 'Community-Driven'] as const;
const timelines = ['1 Week Out', '2 Weeks Out', '1 Month Out', '3 Months Out'] as const;
const audiences = ['B2B Decision Makers', 'Developers & Engineers', 'Marketers & Creators', 'General Consumers', 'Students & Educators', 'Investors & Stakeholders'] as const;

interface PromoPost { platform: string; timing: string; postType: string; caption: string; cta: string; hashtags: string; visualSuggestion: string; }
interface CountdownPlan { daysOut: string; action: string; platform: string; content: string; goal: string; }
interface EmailSequence { timing: string; subject: string; preheader: string; keyMessage: string; cta: string; }
interface PartnerKit { asset: string; specs: string; usage: string; deliveryFormat: string; }
interface PostEventAction { timing: string; action: string; content: string; goal: string; }

interface EventPromo {
  promoScore: number;
  posts: PromoPost[];
  countdown: CountdownPlan[];
  emails: EmailSequence[];
  partnerKit: PartnerKit[];
  postEvent: PostEventAction[];
  checklist: string[];
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }

function generatePromo(eventType: string, industry: string, platform: string, tone: string, timeline: string, audience: string, eventName: string): EventPromo {
  const seed = hash(`${eventType}-${industry}-${platform}-${tone}-${timeline}-${audience}-${eventName}`);
  const score = 40 + seed % 55;

  const postTypes = ['Announcement', 'Speaker Spotlight', 'Countdown', 'Behind-the-Scenes', 'Testimonial/Social Proof', 'Value Teaser', 'Last Call', 'Live Update'];
  const timings = ['4 weeks before', '3 weeks before', '2 weeks before', '1 week before', '3 days before', 'Day before', 'Day of (morning)', 'Day of (live)'];
  const captions = [
    `🗓 Mark your calendar. ${eventName} is coming. We've been working on something special — and we want YOU in the room. Early access link in bio.`,
    `"The best insights happen when the right people are in the same room." ${eventName} brings together the minds shaping ${industry.toLowerCase()} — and one seat has your name on it.`,
    `3 things you'll walk away with from ${eventName}: 1) Actionable frameworks you can use Monday morning. 2) Connections that matter. 3) The competitive edge you've been looking for.`,
    `Behind the scenes: our team has been preparing for ${eventName} for months. Here's a peek at what's coming (and why you don't want to miss it).`,
    `"${eventName} changed how I think about ${industry.toLowerCase()}." — Last year's attendee. This year, we're going bigger. Link in bio to secure your spot.`,
    `⚡ ${eventName} starts in 48 hours. Here's the one session you absolutely cannot miss — and why it matters more than ever right now.`,
    `Final call: ${eventName} registration closes tonight. 87% of seats are taken. If you've been on the fence, this is your sign.`,
    `We're LIVE. ${eventName} is happening right now. Join us — link in stories. Drop a 🔥 if you're watching.`,
  ];
  const ctas = [
    'Register Free → link in bio', 'Save Your Seat → postcraft.ai/events', 'Get Early Bird Pricing → 48 hours only',
    'Watch Live → link in stories', 'Download the Agenda → DM us "AGENDA"', 'Join the Waitlist → spots are limited',
    'Share with someone who needs this ↓', 'Comment "IN" and we\'ll DM you the link',
  ];
  const hashtagSets = [
    `#${eventName.replace(/\s+/g, '')} #${industry.replace(/\s+&?\s*/g, '')}Event #LiveEvent #MarkYourCalendar`,
    `#${eventName.replace(/\s+/g, '')} #ProfessionalDevelopment #IndustryInsights #Networking`,
    `#${eventName.replace(/\s+/g, '')} #LearnAndGrow #ExpertPanel #FutureOf${industry.replace(/\s+&?\s*/g, '')}`,
    `#${eventName.replace(/\s+/g, '')} #DontMissThis #LimitedSeats #RegisterNow`,
  ];
  const visuals = [
    'Event banner: bold typography, date overlay, speaker photos grid, brand gradient background',
    'Countdown carousel: 5 slides — each reveals one reason to attend, final slide = CTA',
    'Speaker spotlight reel: 15-sec clip per speaker with name lower third and topic preview',
    'Behind-the-scenes story: raw video of team setting up, rehearsing, testing tech',
    'Testimonial card: quote from previous attendee, their photo, company logo, 5-star rating',
    'Animated countdown timer: Instagram story sticker style, share-friendly format',
    'Agenda infographic: timeline layout, color-coded tracks, speaker avatars',
    'Live stream thumbnail: "WE ARE LIVE" badge, current speaker, viewer count overlay',
  ];

  const posts: PromoPost[] = Array.from({ length: 8 }, (_, i) => ({
    platform: ['Instagram', 'LinkedIn', 'Twitter/X', 'TikTok', 'Instagram Stories', 'LinkedIn', 'Twitter/X', 'All'][(seed + i) % 8],
    timing: timings[i],
    postType: postTypes[i],
    caption: captions[(seed + i * 3) % captions.length],
    cta: ctas[(seed + i * 2) % ctas.length],
    hashtags: hashtagSets[(seed + i) % hashtagSets.length],
    visualSuggestion: visuals[(seed + i * 4) % visuals.length],
  }));

  const countdownActions = [
    { action: 'Launch event landing page', content: 'Publish SEO-optimized event page with agenda, speakers, and registration form', goal: 'Establish event presence and begin organic traffic capture' },
    { action: 'Send speaker/partner announcement', content: 'Individual spotlight posts for each speaker with their bio, topic, and why attendees should care', goal: 'Leverage speaker networks for organic reach expansion' },
    { action: 'Release early bird pricing', content: 'Limited-time pricing with countdown timer and clear savings messaging', goal: 'Drive urgency-based conversions in first registration wave' },
    { action: 'Publish content teaser series', content: '3-5 posts revealing key insights or previews of what attendees will learn', goal: 'Build anticipation and demonstrate event value before asking for commitment' },
    { action: 'Activate partner cross-promotion', content: 'Co-branded content with sponsors and partners, shared across all networks', goal: 'Tap into partner audiences for incremental reach' },
    { action: 'Launch referral incentive', content: '"Bring a colleague" campaign with bonus content or upgraded access for referrals', goal: 'Turn registered attendees into acquisition channels' },
    { action: 'Send final reminder sequence', content: '72h, 24h, and 1h reminder emails with calendar add links and last-chance messaging', goal: 'Maximize show-up rate from registered attendees' },
    { action: 'Go live and engage real-time', content: 'Live tweets, stories, polls, Q&A — make remote audience feel present', goal: 'Create FOMO content that drives registrations for next event' },
  ];
  const countdownDays = ['D-30', 'D-21', 'D-14', 'D-10', 'D-7', 'D-3', 'D-1', 'D-Day'];
  const countdownPlatforms = ['Website + SEO', 'LinkedIn + Twitter/X', 'Email + Instagram', 'All Social', 'Partner Channels', 'Email', 'Email + SMS', 'All Platforms'];

  const countdown: CountdownPlan[] = Array.from({ length: 8 }, (_, i) => ({
    daysOut: countdownDays[i],
    action: countdownActions[i].action,
    platform: countdownPlatforms[i],
    content: countdownActions[i].content,
    goal: countdownActions[i].goal,
  }));

  const emailSubjects = [
    `You're invited: ${eventName} — ${industry} leaders are gathering`,
    `[Early Bird] Save 40% on ${eventName} — 72 hours only`,
    `The agenda is live: here's what you'll learn at ${eventName}`,
    `"This changed everything" — why 500+ professionals are joining ${eventName}`,
    `Final reminder: ${eventName} starts tomorrow`,
  ];
  const preheaders = [
    'Limited spots available — secure yours today',
    'Early bird pricing ends Friday at midnight',
    '12 sessions, 8 speakers, 1 day that changes your approach',
    'Read what last year\'s attendees said (and why they\'re coming back)',
    'Don\'t forget to add it to your calendar — here\'s the link',
  ];
  const keyMessages = [
    `${eventName} brings together the top minds in ${industry.toLowerCase()} for a day of actionable insights, networking, and strategic planning. Whether you're a founder, manager, or individual contributor — this event is designed to give you frameworks you can implement immediately.`,
    `For the next 72 hours, we're offering 40% off all ${eventName} tickets. This is the lowest price we'll offer — and it includes full access to recordings, worksheets, and the private community channel.`,
    `We just finalized the agenda and it's our strongest lineup yet. From opening keynote to closing workshop, every session is designed around one question: what will you do differently on Monday morning?`,
    `Don't take our word for it — here's what attendees said last year: "Best professional event I attended all year." "Finally, an event with zero fluff." "I made 3 connections that turned into clients."`,
    `${eventName} starts tomorrow at 9 AM. Here's everything you need: your access link, the full agenda, speaker bios, and tips for getting the most out of the day.`,
  ];
  const emailCtas = ['Register Now', 'Claim Early Bird Price', 'View Full Agenda', 'Read Testimonials → Register', 'Add to Calendar'];
  const emailTimings = ['4 weeks before', '2 weeks before', '1 week before', '3 days before', '1 day before'];

  const emails: EmailSequence[] = Array.from({ length: 5 }, (_, i) => ({
    timing: emailTimings[i],
    subject: emailSubjects[(seed + i) % emailSubjects.length],
    preheader: preheaders[(seed + i * 2) % preheaders.length],
    keyMessage: keyMessages[(seed + i * 3) % keyMessages.length],
    cta: emailCtas[(seed + i * 4) % emailCtas.length],
  }));

  const partnerAssets = ['Event Banner (Digital)', 'Social Media Kit', 'Email Template', 'Press Release Draft', 'Speaker Headshots Pack', 'Brand Guidelines Extract'];
  const specs = ['1200x628 (OG), 1080x1080 (IG), 1920x1080 (LinkedIn Cover)', '10 templates: 5 static + 5 story/reel, Canva + Figma', 'HTML responsive, 600px width, dark mode compatible', 'Word doc, AP style, with boilerplate and quotes', 'High-res JPG + PNG transparent, 300dpi + 72dpi versions', 'Logo files (SVG/PNG), color codes, font names, spacing rules'];
  const usages = ['Website headers, social shares, email banners, digital ads', 'Organic social posts, stories, partner reshares', 'Partner email lists, internal announcements, sponsor newsletters', 'Media outreach, blog announcements, LinkedIn articles', 'Event page, social posts, printed materials, video thumbnails', 'Co-branded materials, partner landing pages, presentation decks'];
  const formats = ['ZIP: Figma link + exported PNG/JPG in 6 sizes', 'Canva template links + Figma file + exported assets', 'HTML file + Mailchimp/SendGrid template import', 'Google Doc (editable) + PDF (final)', 'Google Drive folder with organized subfolders', 'PDF brand guide + asset download links'];

  const partnerKit: PartnerKit[] = Array.from({ length: 5 }, (_, i) => ({
    asset: partnerAssets[(seed + i) % partnerAssets.length],
    specs: specs[(seed + i * 2) % specs.length],
    usage: usages[(seed + i * 3) % usages.length],
    deliveryFormat: formats[(seed + i * 4) % formats.length],
  }));

  const postEventActions: { timing: string; action: string; content: string; goal: string; }[] = [
    { timing: 'Day of (after)', action: 'Thank you post + highlight reel', content: 'Photo/video montage of best moments, attendee reactions, key quotes', goal: 'Create shareable content that extends event reach post-live' },
    { timing: 'Day +1', action: 'Send recordings + resources', content: 'Email with replay links, slide decks, worksheets, and bonus materials', goal: 'Deliver immediate value and justify ticket price for future events' },
    { timing: 'Day +3', action: 'Publish key takeaways blog', content: 'Top 10 insights from the event with speaker quotes and actionable frameworks', goal: 'SEO content that drives organic traffic and positions next event' },
    { timing: 'Day +7', action: 'Attendee feedback survey', content: 'NPS survey + open questions about content quality, format, and improvement areas', goal: 'Collect testimonials and identify improvements for next event' },
    { timing: 'Day +14', action: 'Announce next event date', content: 'Save-the-date with early bird pricing for return attendees', goal: 'Lock in committed audience while enthusiasm is high' },
    { timing: 'Day +30', action: 'Impact report', content: 'Community growth, connections made, deals closed — quantify the event value', goal: 'Build business case for sponsorship and justify increased pricing' },
  ];

  const postEvent: PostEventAction[] = postEventActions.slice(0, 6);

  const checklist = [
    'Event landing page live with registration form and agenda',
    'Speaker bios and headshots collected and approved',
    'Email sequence scheduled (5 emails across 4 weeks)',
    'Social content calendar created with platform-specific assets',
    'Partner/sponsor kit distributed with co-branding guidelines',
    'Countdown timer added to website and email signature',
    'Referral incentive program set up and tested',
    'Live-day social plan: who posts what, when, on which platform',
    'Recording setup confirmed: video, audio, screen capture',
    'Post-event follow-up sequence scheduled',
    'Feedback survey drafted and ready to send D+7',
    'Next event date selected for immediate re-engagement announcement',
  ];

  return { promoScore: score, posts, countdown, emails, partnerKit, postEvent, checklist };
}

export default function EventPromoPage() {
  const [eventType, setEventType] = useState(eventTypes[0]);
  const [industry, setIndustry] = useState(industries[0]);
  const [platform, setPlatform] = useState(platforms[0]);
  const [tone, setTone] = useState(tones[0]);
  const [timeline, setTimeline] = useState(timelines[0]);
  const [audience, setAudience] = useState(audiences[0]);
  const [eventName, setEventName] = useState('');
  const [result, setResult] = useState<EventPromo | null>(null);

  const handleGenerate = () => { if (eventName.trim()) setResult(generatePromo(eventType, industry, platform, tone, timeline, audience, eventName)); };
  const scoreColor = (n: number) => n > 75 ? '#34d399' : n > 55 ? '#fbbf24' : n > 35 ? '#fb923c' : '#f87171';

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Event Promo Generator</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Generate a complete multi-platform event promotion campaign. Social posts, countdown plan, email sequences, partner kits, and post-event follow-up — all from one brief.</p>

        <div className="mb-6">
          <label className="block text-sm text-zinc-400 mb-1">Event Name</label>
          <input type="text" value={eventName} onChange={e => setEventName(e.target.value)} placeholder="e.g., PostCraft Summit 2026" className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-3 text-zinc-100" />
        </div>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {([
            { label: 'Event Type', value: eventType, setter: setEventType as (v: string) => void, options: eventTypes as readonly string[] },
            { label: 'Industry', value: industry, setter: setIndustry as (v: string) => void, options: industries as readonly string[] },
            { label: 'Platform Focus', value: platform, setter: setPlatform as (v: string) => void, options: platforms as readonly string[] },
            { label: 'Tone', value: tone, setter: setTone as (v: string) => void, options: tones as readonly string[] },
            { label: 'Campaign Timeline', value: timeline, setter: setTimeline as (v: string) => void, options: timelines as readonly string[] },
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
        <button onClick={handleGenerate} className="w-full md:w-auto bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded font-semibold hover:opacity-90 transition mb-8">Generate Campaign</button>

        {result && (
          <div className="space-y-8">
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 text-center">
              <div className="text-5xl font-bold mb-2" style={{ color: scoreColor(result.promoScore) }}>{result.promoScore}</div>
              <div className="text-zinc-400">Campaign Readiness Score</div>
              <div className="mt-3 max-w-md mx-auto w-full bg-zinc-800 rounded-full h-3">
                <div className="h-3 rounded-full" style={{ width: `${result.promoScore}%`, background: scoreColor(result.promoScore) }} />
              </div>
            </div>

            {/* Social Posts */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Social Posts Timeline ({result.posts.length} posts)</h3>
              <div className="space-y-4">
                {result.posts.map((p, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="text-xs px-2 py-1 rounded bg-violet-400/10 text-violet-400 border border-violet-400/30">{p.platform}</span>
                      <span className="text-xs px-2 py-1 rounded bg-zinc-700 text-zinc-300">{p.timing}</span>
                      <span className="text-xs px-2 py-1 rounded bg-blue-400/10 text-blue-400 border border-blue-400/30">{p.postType}</span>
                    </div>
                    <div className="text-sm text-zinc-300 mb-2">{p.caption}</div>
                    <div className="text-sm space-y-1">
                      <div><span className="text-zinc-500">CTA:</span> <span className="text-emerald-400">{p.cta}</span></div>
                      <div><span className="text-zinc-500">Hashtags:</span> <span className="text-blue-400/70 text-xs">{p.hashtags}</span></div>
                      <div><span className="text-zinc-500">Visual:</span> <span className="text-zinc-400 text-xs">{p.visualSuggestion}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Countdown Plan */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Countdown Campaign Plan</h3>
              <div className="space-y-3">
                {result.countdown.map((c, i) => (
                  <div key={i} className="flex gap-4 items-start bg-zinc-800/30 rounded-lg p-3 border border-zinc-700/30">
                    <div className="shrink-0 w-14 text-center">
                      <div className="text-lg font-bold text-violet-400">{c.daysOut}</div>
                      <div className="text-xs text-zinc-500">{c.platform}</div>
                    </div>
                    <div className="text-sm">
                      <div className="font-semibold text-zinc-200 mb-1">{c.action}</div>
                      <div className="text-zinc-400">{c.content}</div>
                      <div className="text-emerald-400/70 text-xs mt-1">Goal: {c.goal}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Email Sequence */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Email Sequence ({result.emails.length} emails)</h3>
              <div className="space-y-4">
                {result.emails.map((e, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs px-2 py-1 rounded bg-zinc-700 text-zinc-300">{e.timing}</span>
                      <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">{e.cta}</span>
                    </div>
                    <div className="text-sm space-y-1">
                      <div><span className="text-zinc-500">Subject:</span> <span className="text-zinc-200 font-medium">{e.subject}</span></div>
                      <div><span className="text-zinc-500">Preheader:</span> <span className="text-zinc-400 italic">{e.preheader}</span></div>
                      <div className="text-zinc-400 mt-2">{e.keyMessage}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Partner Kit */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Partner / Sponsor Kit</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="text-left text-zinc-500 border-b border-zinc-700"><th className="pb-2 pr-4">Asset</th><th className="pb-2 pr-4">Specs</th><th className="pb-2 pr-4">Usage</th><th className="pb-2">Format</th></tr></thead>
                  <tbody>
                    {result.partnerKit.map((p, i) => (
                      <tr key={i} className="border-b border-zinc-800/50">
                        <td className="py-3 pr-4 text-violet-400 font-medium">{p.asset}</td>
                        <td className="py-3 pr-4 text-zinc-400 text-xs">{p.specs}</td>
                        <td className="py-3 pr-4 text-zinc-400 text-xs">{p.usage}</td>
                        <td className="py-3 text-zinc-400 text-xs">{p.deliveryFormat}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Post-Event */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Post-Event Follow-Up Plan</h3>
              <div className="space-y-3">
                {result.postEvent.map((p, i) => (
                  <div key={i} className="flex gap-4 items-start bg-zinc-800/30 rounded-lg p-3 border border-zinc-700/30">
                    <div className="shrink-0 w-16 text-center">
                      <div className="text-sm font-bold text-yellow-400">{p.timing}</div>
                    </div>
                    <div className="text-sm">
                      <div className="font-semibold text-zinc-200 mb-1">{p.action}</div>
                      <div className="text-zinc-400">{p.content}</div>
                      <div className="text-emerald-400/70 text-xs mt-1">Goal: {p.goal}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Checklist */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Campaign Launch Checklist</h3>
              <div className="grid md:grid-cols-2 gap-2">
                {result.checklist.map((item, i) => (
                  <label key={i} className="flex items-start gap-2 text-sm text-zinc-300 cursor-pointer hover:text-zinc-100">
                    <input type="checkbox" className="mt-1 accent-violet-500" />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">Promote Any Event Like a Pro</h3>
              <p className="text-zinc-400 mb-4">Use PostCraft AI to create complete event campaigns. Pair with <a href="/content-calendar" className="text-violet-400 underline">Content Calendar</a>, <a href="/onboarding-emails" className="text-violet-400 underline">Email Generator</a>, and <a href="/landing-copy" className="text-violet-400 underline">Landing Copy</a>.</p>
              <a href="/pricing" className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">Get PostCraft Pro</a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
