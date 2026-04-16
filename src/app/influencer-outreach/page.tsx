'use client';
import { useState } from 'react';

const outreachTypes = ['Cold DM', 'Warm DM', 'Email Pitch', 'Follow-Up', 'Collaboration Proposal', 'Gifting Request', 'Affiliate Invite', 'Event Invitation'] as const;
const platforms = ['Instagram', 'TikTok', 'YouTube', 'LinkedIn', 'Twitter/X', 'Podcast', 'Newsletter'] as const;
const creatorTiers = ['Nano (1-10K)', 'Micro (10-50K)', 'Mid (50-250K)', 'Macro (250K-1M)', 'Mega (1M+)'] as const;
const niches = ['Fashion', 'Beauty', 'Tech', 'Fitness', 'Food', 'Travel', 'Business', 'Lifestyle', 'Gaming', 'Parenting', 'Finance', 'Education'] as const;
const campaignGoals = ['Brand Awareness', 'Product Launch', 'User-Generated Content', 'Affiliate Sales', 'Event Promotion', 'Content Collab', 'Review/Unboxing'] as const;
const brandTones = ['Professional', 'Casual/Friendly', 'Luxury', 'Playful', 'Bold/Edgy'] as const;

interface OutreachResult {
  messages: { angle: string; text: string; tip: string }[];
  subjectLines: string[];
  followUp: { day: string; message: string }[];
  negotiationTips: string[];
  redFlags: string[];
  rateCard: { format: string; range: string }[];
  bestPractices: string[];
}

function generateOutreach(
  type: string, platform: string, tier: string, niche: string,
  goal: string, tone: string, brand: string, product: string,
  budget: string, usp: string
): OutreachResult {
  const b = brand || 'our brand';
  const p = product || 'our product';
  const u = usp || 'industry-leading results';
  const budgetStr = budget || 'flexible budget';

  const toneAdj: Record<string, { greeting: string; close: string; style: string }> = {
    'Professional': { greeting: 'Hi', close: 'Best regards', style: 'formal and polished' },
    'Casual/Friendly': { greeting: 'Hey', close: 'Cheers', style: 'warm and conversational' },
    'Luxury': { greeting: 'Dear', close: 'Warmest regards', style: 'elegant and exclusive' },
    'Playful': { greeting: 'Hiii', close: 'Talk soon!', style: 'fun and energetic' },
    'Bold/Edgy': { greeting: 'Yo', close: 'Let\'s make noise', style: 'direct and confident' },
  };
  const t = toneAdj[tone] || toneAdj['Professional'];

  const typeMessages: Record<string, { angles: string[]; texts: string[]; tips: string[] }> = {
    'Cold DM': {
      angles: ['The Genuine Fan', 'The Value-First', 'The Straight Shooter'],
      texts: [
        `${t.greeting}! I've been following your ${niche.toLowerCase()} content for a while — your recent post about [specific topic] really resonated with me. I'm ${brand ? `the founder of ${b}` : `with ${b}`}, and I think there's a natural fit between your audience and ${p}. ${u} — and I'd love to explore a collab if you're open to it. No pressure at all, just thought I'd reach out! ${t.close}`,
        `${t.greeting}! Quick question — have you ever tried ${p}? I noticed you talk a lot about [related topic] and I think your audience would genuinely find value in it. We've been getting amazing feedback (${u}) and I'd love to send you one to try, completely free, no strings attached. If you love it, we can talk about a partnership. If not, enjoy it on us! ${t.close}`,
        `${t.greeting}! I'll keep this short — I run ${b} and we're looking for ${tier.split(' ')[0].toLowerCase()}-tier ${niche.toLowerCase()} creators to partner with. Budget: ${budgetStr}. Goal: ${goal.toLowerCase()}. Your content style is exactly what we're after. Interested? I can send over the full brief. ${t.close}`,
      ],
      tips: [
        'Reference a SPECIFIC post or video — generic compliments get ignored',
        'Lead with value, not your ask — what do THEY get out of this?',
        'Keep cold DMs under 100 words — attention spans are short',
      ],
    },
    'Warm DM': {
      angles: ['The Callback', 'The Mutual Connection', 'The Engaged Follower'],
      texts: [
        `${t.greeting}! We chatted briefly in [context — comments, event, etc.] and I loved what you said about [topic]. I'm with ${b} and I think there's something really cool we could do together around ${goal.toLowerCase()}. Would you be open to a quick call this week? ${t.close}`,
        `${t.greeting}! [Mutual contact] mentioned you might be interested in collaborating with ${niche.toLowerCase()} brands. We're ${b} — ${u}. I'd love to share what we have in mind. It's a ${goal.toLowerCase()} campaign with ${budgetStr}. Can I send you the brief? ${t.close}`,
        `${t.greeting}! I've been engaging with your content for months (loved the ${niche.toLowerCase()} series!) and finally wanted to reach out properly. ${b} is launching ${p} and your take on it would be incredible. We have ${budgetStr} and full creative freedom for you. Interested? ${t.close}`,
      ],
      tips: [
        'Reference your history — "we chatted at X" or "I commented on your post about Y"',
        'Warm outreach converts 3x better than cold — invest time in the warm-up',
        'If you have a mutual connection, ask them to intro you instead of DMing directly',
      ],
    },
    'Email Pitch': {
      angles: ['The Data-Driven', 'The Story Angle', 'The Win-Win'],
      texts: [
        `Subject: Collab idea — ${b} x [Creator Name]\n\n${t.greeting} [Name],\n\nI've been following your ${niche.toLowerCase()} content and the engagement you drive is seriously impressive. At ${b}, we're planning a ${goal.toLowerCase()} campaign and your audience aligns perfectly with what we're building.\n\nQuick stats:\n- ${u}\n- Budget: ${budgetStr}\n- Timeline: [X weeks]\n- Creative freedom: 100% yours\n\nWould love to hop on a 15-min call to share the full brief. What does your week look like?\n\n${t.close},\n[Your Name]\n${b}`,
        `Subject: You + ${b} = 🔥\n\n${t.greeting} [Name],\n\nHere's what happened: I showed your [recent content piece] to our entire team and everyone agreed — you GET ${niche.toLowerCase()} content in a way most creators don't.\n\nWe're launching ${p} and instead of running ads, we want to partner with creators who actually care about the space. ${u}, and we think your authentic take would resonate way more than any ad ever could.\n\nBudget is ${budgetStr}, and we're flexible on format — whether that's a dedicated post, story series, or something totally different.\n\nWorth a conversation?\n\n${t.close},\n[Your Name]`,
        `Subject: Partnership opportunity — ${budgetStr} budget\n\n${t.greeting} [Name],\n\nI'll get straight to it: ${b} is looking for ${tier.split(' ')[0].toLowerCase()}-tier ${niche.toLowerCase()} creators for a ${goal.toLowerCase()} campaign. Here's what's in it for you:\n\n1. Competitive compensation (${budgetStr})\n2. Free ${p} (${u})\n3. Full creative control — we trust your voice\n4. Long-term partnership potential (not just a one-off)\n5. Cross-promotion to our ${niche.toLowerCase()} audience\n\nInterested? I'll send the full brief + rate discussion.\n\n${t.close},\n[Your Name]\n${b}`,
      ],
      tips: [
        'Subject line is everything — personalize it with their name or a specific reference',
        'Keep the email scannable — use bullet points and short paragraphs',
        'Include a clear, low-commitment CTA: "Worth a conversation?" beats "Let\'s schedule a call"',
      ],
    },
    'Follow-Up': {
      angles: ['The Gentle Nudge', 'The New Angle', 'The FOMO'],
      texts: [
        `${t.greeting}! Just wanted to bump this in case it got buried — I know your inbox is probably crazy. The ${goal.toLowerCase()} campaign with ${b} is still open and you'd be perfect for it. No worries if the timing isn't right — just didn't want you to miss it! ${t.close}`,
        `${t.greeting}! Following up with some news — since I last reached out, ${p} just hit [milestone]. Given your ${niche.toLowerCase()} focus, I think the story angle is even stronger now. We still have ${budgetStr} allocated and would love to work together. Thoughts? ${t.close}`,
        `${t.greeting}! Quick update — we've started locking in creators for the ${b} ${goal.toLowerCase()} campaign and spots are filling up. Wanted to give you first priority before we finalize the roster. Let me know if you're interested and I'll send the brief over today! ${t.close}`,
      ],
      tips: [
        'Wait 3-5 days before following up — too soon feels desperate',
        'Add new value in each follow-up — don\'t just copy-paste "bumping this"',
        'Max 3 follow-ups total — after that, move on and revisit in 3 months',
      ],
    },
    'Collaboration Proposal': {
      angles: ['The Full Brief', 'The Creative Freedom', 'The Long-Term Vision'],
      texts: [
        `${t.greeting}! Here's the full collaboration proposal for ${b} x [Creator Name]:\n\n📋 Campaign: ${goal}\n📦 Product: ${p} (${u})\n💰 Compensation: ${budgetStr}\n📅 Timeline: [Start] — [End]\n🎨 Creative direction: [Brief outline]\n📊 Deliverables: [X posts, X stories, etc.]\n\nWe handle all logistics — you focus on creating amazing content. Full creative freedom within brand guidelines. Interested in discussing? ${t.close}`,
        `${t.greeting}! Instead of sending you a rigid brief, I want to hear YOUR vision. Here's the canvas:\n\n- Brand: ${b}\n- Product: ${p}\n- Goal: ${goal.toLowerCase()}\n- Budget: ${budgetStr}\n- Your audience knows ${niche.toLowerCase()} — what format would feel most natural?\n\nWe believe the best content comes from creators who have full ownership. Tell us what YOU would do, and we'll make it happen. ${t.close}`,
        `${t.greeting}! We're not looking for a one-off post — we want to build something lasting. Here's the vision:\n\nMonth 1: ${goal.toLowerCase()} campaign with ${p}\nMonth 2-3: Ambassador role with recurring content\nMonth 4+: Revenue share / affiliate partnership\n\nBudget starts at ${budgetStr} and scales with performance. ${u} — and we want someone who genuinely believes in what we're building. Is this the kind of partnership you're looking for? ${t.close}`,
      ],
      tips: [
        'Lead with what THEY get, not what you need from them',
        'Be specific about deliverables but flexible on creative direction',
        'Include timeline, budget, and next steps — don\'t make them ask',
      ],
    },
    'Gifting Request': {
      angles: ['The No-Strings Gift', 'The Exclusive Preview', 'The Community Pick'],
      texts: [
        `${t.greeting}! I'd love to send you ${p} — completely free, no strings attached. We're fans of your ${niche.toLowerCase()} content and think you'd genuinely enjoy it (${u}). If you love it and want to share with your audience, amazing. If not, enjoy it on us. No contracts, no obligations. Where should I send it? ${t.close}`,
        `${t.greeting}! ${b} is launching something new and we're giving exclusive early access to a handful of ${niche.toLowerCase()} creators before the public launch. You're one of [X] people getting this. ${p} — ${u}. Would love to send it your way. Interested? ${t.close}`,
        `${t.greeting}! Our community actually voted on which creators should try ${p} next — and your name came up! 🎉 We'd love to send you one. ${u} and we think your honest take (positive or critical) would be super valuable. Want us to ship one out? ${t.close}`,
      ],
      tips: [
        'Gifting works best with nano/micro creators — they\'re more likely to post organically',
        'NEVER require a post in exchange for a gift — it kills authenticity',
        'Follow up 7-10 days after delivery to ask what they think (not to ask for a post)',
      ],
    },
    'Affiliate Invite': {
      angles: ['The Earning Opportunity', 'The Exclusive Program', 'The Proven Results'],
      texts: [
        `${t.greeting}! I wanted to share a revenue opportunity with you. ${b} just launched an affiliate program for ${niche.toLowerCase()} creators — you earn [X%] on every sale through your unique link. ${u}, so conversions are strong. Some of our top affiliates are earning $[X]/month. Want me to set you up? ${t.close}`,
        `${t.greeting}! We're building an exclusive affiliate network for ${b} — limited to [X] ${niche.toLowerCase()} creators. Why exclusive? Higher commission rates ([X%] vs industry standard), early access to new products, and dedicated support. ${u}. Your content style would be a perfect fit. Applications close [date]. Interested? ${t.close}`,
        `${t.greeting}! Quick stats from our affiliate program: average creator earns $[X]/month, top performer hit $[X] last quarter, and our conversion rate is [X%] (well above industry average). ${p} sells itself because ${u}. We're looking for ${niche.toLowerCase()} creators on ${platform} to join. Want the details? ${t.close}`,
      ],
      tips: [
        'Share real affiliate earnings data — transparency builds trust',
        'Offer tiered commissions — higher rates for higher volume incentivize effort',
        'Provide creators with a landing page, not just a link — it converts better',
      ],
    },
    'Event Invitation': {
      angles: ['The VIP Experience', 'The Content Opportunity', 'The Community Invite'],
      texts: [
        `${t.greeting}! ${b} is hosting [event name] on [date] and we'd love for you to attend as a VIP guest. We're covering travel + accommodation, and you'll get exclusive access to ${p}, backstage content opportunities, and a chance to connect with other ${niche.toLowerCase()} creators. ${u}. Want me to reserve your spot? ${t.close}`,
        `${t.greeting}! Imagine this: [event description]. ${b} is putting it together on [date] and it's going to be a content goldmine. We're inviting [X] ${niche.toLowerCase()} creators to document the experience — full creative freedom, all expenses covered, plus ${budgetStr} for your time. Interested? ${t.close}`,
        `${t.greeting}! We're building a community of ${niche.toLowerCase()} creators and kicking it off with [event type] on [date]. No sales pitch — just [X] creators, great conversations, and early access to ${p}. We'd love you to be part of it. ${u}. RSVP? ${t.close}`,
      ],
      tips: [
        'Give creators enough lead time — at least 3-4 weeks for events',
        'Clearly state what\'s covered (travel, hotel, meals, compensation)',
        'Create Instagrammable/TikTok-worthy moments at the event for organic content',
      ],
    },
  };

  const msgs = typeMessages[type] || typeMessages['Cold DM'];
  const messages = msgs.angles.map((angle, i) => ({
    angle,
    text: msgs.texts[i],
    tip: msgs.tips[i],
  }));

  const subjectLines = [
    `Collab idea: ${b} x [Your Name] 🤝`,
    `${niche} partnership — ${budgetStr} budget`,
    `Loved your recent post — quick question`,
    `Exclusive ${goal.toLowerCase()} opportunity for ${niche.toLowerCase()} creators`,
    `You + ${b} = your audience will love this`,
    `Quick pitch — 2 min read, ${budgetStr} opportunity`,
  ];

  const followUp = [
    { day: 'Day 3', message: `${t.greeting}! Just wanted to make sure my message didn't get lost — I'd love to chat about the ${goal.toLowerCase()} campaign with ${b}. Totally understand if the timing isn't right, but didn't want you to miss this one. ${t.close}` },
    { day: 'Day 7', message: `${t.greeting}! One more nudge 😊 We're finalizing our creator roster for the ${b} campaign this week. ${u} and I think your audience would genuinely benefit. If you're interested, just say the word and I'll send the full brief. If not, no hard feelings at all! ${t.close}` },
    { day: 'Day 14 (Final)', message: `${t.greeting}! Last message from me, promise! The ${b} ${goal.toLowerCase()} campaign kicks off soon and I wanted to give you one final chance to jump in before we close the roster. ${budgetStr}, full creative freedom, and ${p} included. Let me know either way so I can plan accordingly. Thanks for your time! ${t.close}` },
  ];

  const tierNegotiation: Record<string, string[]> = {
    'Nano (1-10K)': [
      'Nano creators often accept product-only deals — but paying them builds loyalty and better content',
      'Expect $50-$250 per post; $100-$500 for video content',
      'Bundle deals work well: 3 posts + stories for a package rate',
      'Many nano creators don\'t have rate cards — propose a fair rate proactively',
      'Long-term partnerships (3-6 months) get better rates than one-offs',
    ],
    'Micro (10-50K)': [
      'Micro creators deliver the best ROI — 60% higher engagement than macro creators',
      'Expect $250-$1,500 per post; $500-$3,000 for video content',
      'Always ask for usage rights upfront — it\'s cheaper to negotiate now than later',
      'Offer performance bonuses (e.g., +$X per 1K views above baseline)',
      'Exclusivity clauses should come with 2-3x premium — don\'t underpay for exclusivity',
    ],
    'Mid (50-250K)': [
      'Mid-tier creators usually have managers — reach out to them directly for faster responses',
      'Expect $1,500-$5,000 per post; $3,000-$10,000 for video content',
      'Request analytics screenshots (not just follower count) before committing',
      'Negotiate content usage rights separately — organic + paid usage = different rates',
      'Ask about their audience demographics — follower count means nothing without fit',
    ],
    'Macro (250K-1M)': [
      'Macro creators have talent agencies — expect a formal media kit and rate card',
      'Expect $5,000-$20,000 per post; $10,000-$50,000 for video content',
      'Negotiate deliverables clearly: number of revisions, approval process, timeline',
      'Ask for case studies from previous brand partnerships — what ROI did they drive?',
      'Consider splitting budget: half upfront, half on performance milestones',
    ],
    'Mega (1M+)': [
      'Mega creators are essentially media companies — treat negotiations accordingly',
      'Expect $20,000-$100,000+ per post; video content starts at $50,000+',
      'Always work through their management team — direct DMs rarely work at this level',
      'Negotiate a content package (multiple touchpoints) rather than single posts',
      'Require detailed performance guarantees and define what "success" looks like contractually',
    ],
  };

  const redFlags = [
    'Follower-to-engagement ratio below 1% — possible fake followers or disengaged audience',
    'They won\'t share analytics or demographics — they might be hiding something',
    'Sudden follower spikes without viral content — likely purchased followers',
    'They\'ve promoted 10+ brands this month — their audience has ad fatigue',
    'No signed contract or clear deliverables — always get it in writing',
    'They demand full payment upfront with no milestone structure — standard is 50/50',
    'Comments are mostly bots, emojis, or "nice post" — low-quality engagement',
    'They refuse to disclose other brand deals — potential competitor conflicts',
  ];

  const rateCards: Record<string, { format: string; range: string }[]> = {
    'Instagram': [
      { format: 'Feed Post (static)', range: tier.includes('Nano') ? '$50-$250' : tier.includes('Micro') ? '$250-$1.5K' : tier.includes('Mid') ? '$1.5K-$5K' : tier.includes('Macro') ? '$5K-$20K' : '$20K-$100K+' },
      { format: 'Carousel Post', range: tier.includes('Nano') ? '$75-$350' : tier.includes('Micro') ? '$350-$2K' : tier.includes('Mid') ? '$2K-$7K' : tier.includes('Macro') ? '$7K-$25K' : '$25K-$120K+' },
      { format: 'Reel (15-60s)', range: tier.includes('Nano') ? '$100-$500' : tier.includes('Micro') ? '$500-$3K' : tier.includes('Mid') ? '$3K-$10K' : tier.includes('Macro') ? '$10K-$40K' : '$40K-$150K+' },
      { format: 'Story Set (3-5 slides)', range: tier.includes('Nano') ? '$30-$150' : tier.includes('Micro') ? '$150-$800' : tier.includes('Mid') ? '$800-$3K' : tier.includes('Macro') ? '$3K-$10K' : '$10K-$50K+' },
    ],
    'TikTok': [
      { format: 'Organic Video (15-60s)', range: tier.includes('Nano') ? '$50-$300' : tier.includes('Micro') ? '$300-$2K' : tier.includes('Mid') ? '$2K-$8K' : tier.includes('Macro') ? '$8K-$30K' : '$30K-$150K+' },
      { format: 'Branded Series (3 videos)', range: tier.includes('Nano') ? '$120-$700' : tier.includes('Micro') ? '$700-$5K' : tier.includes('Mid') ? '$5K-$20K' : tier.includes('Macro') ? '$20K-$75K' : '$75K-$400K+' },
      { format: 'Live Stream (30 min)', range: tier.includes('Nano') ? '$100-$400' : tier.includes('Micro') ? '$400-$2K' : tier.includes('Mid') ? '$2K-$8K' : tier.includes('Macro') ? '$8K-$25K' : '$25K-$100K+' },
    ],
    'YouTube': [
      { format: 'Dedicated Video', range: tier.includes('Nano') ? '$200-$1K' : tier.includes('Micro') ? '$1K-$5K' : tier.includes('Mid') ? '$5K-$20K' : tier.includes('Macro') ? '$20K-$75K' : '$75K-$500K+' },
      { format: 'Integration (60-90s)', range: tier.includes('Nano') ? '$100-$500' : tier.includes('Micro') ? '$500-$3K' : tier.includes('Mid') ? '$3K-$12K' : tier.includes('Macro') ? '$12K-$40K' : '$40K-$200K+' },
      { format: 'YouTube Shorts', range: tier.includes('Nano') ? '$50-$250' : tier.includes('Micro') ? '$250-$1.5K' : tier.includes('Mid') ? '$1.5K-$6K' : tier.includes('Macro') ? '$6K-$20K' : '$20K-$80K+' },
    ],
    'LinkedIn': [
      { format: 'Thought Leadership Post', range: tier.includes('Nano') ? '$100-$500' : tier.includes('Micro') ? '$500-$2K' : tier.includes('Mid') ? '$2K-$8K' : tier.includes('Macro') ? '$8K-$25K' : '$25K-$75K+' },
      { format: 'Article + Post', range: tier.includes('Nano') ? '$200-$800' : tier.includes('Micro') ? '$800-$3K' : tier.includes('Mid') ? '$3K-$12K' : tier.includes('Macro') ? '$12K-$35K' : '$35K-$100K+' },
    ],
    'Twitter/X': [
      { format: 'Tweet + Thread', range: tier.includes('Nano') ? '$30-$150' : tier.includes('Micro') ? '$150-$800' : tier.includes('Mid') ? '$800-$3K' : tier.includes('Macro') ? '$3K-$12K' : '$12K-$50K+' },
      { format: 'Spaces Appearance', range: tier.includes('Nano') ? '$50-$200' : tier.includes('Micro') ? '$200-$1K' : tier.includes('Mid') ? '$1K-$5K' : tier.includes('Macro') ? '$5K-$15K' : '$15K-$50K+' },
    ],
    'Podcast': [
      { format: 'Host-Read Ad (60s)', range: tier.includes('Nano') ? '$50-$200' : tier.includes('Micro') ? '$200-$1K' : tier.includes('Mid') ? '$1K-$5K' : tier.includes('Macro') ? '$5K-$20K' : '$20K-$75K+' },
      { format: 'Dedicated Episode', range: tier.includes('Nano') ? '$200-$800' : tier.includes('Micro') ? '$800-$3K' : tier.includes('Mid') ? '$3K-$15K' : tier.includes('Macro') ? '$15K-$50K' : '$50K-$200K+' },
    ],
    'Newsletter': [
      { format: 'Dedicated Send', range: tier.includes('Nano') ? '$100-$500' : tier.includes('Micro') ? '$500-$2K' : tier.includes('Mid') ? '$2K-$8K' : tier.includes('Macro') ? '$8K-$25K' : '$25K-$100K+' },
      { format: 'Sponsored Section', range: tier.includes('Nano') ? '$50-$250' : tier.includes('Micro') ? '$250-$1K' : tier.includes('Mid') ? '$1K-$5K' : tier.includes('Macro') ? '$5K-$15K' : '$15K-$50K+' },
    ],
  };

  const practicesByPlatform: Record<string, string[]> = {
    'Instagram': [
      'DM is king — emails get ignored, but a thoughtful DM with a voice note gets replies',
      'Engage with their content for 1-2 weeks before reaching out — warm the relationship',
      'Reels partnerships outperform feed posts 3:1 for engagement and reach',
      'Request content rights for paid amplification — Reels + Spark Ads = powerful combo',
      'Story mentions convert better than feed posts for direct-response campaigns',
    ],
    'TikTok': [
      'Creator Marketplace gives you verified data — always cross-reference before partnering',
      'Spark Ads (boosting creator content) are the secret weapon — negotiate this upfront',
      'Don\'t over-script TikTok content — authenticity is everything on this platform',
      'Trending sounds + creator voice = highest performing branded content',
      'TikTok Shop integration is a game-changer for e-commerce brands',
    ],
    'YouTube': [
      'Dedicated videos drive 5-10x more conversions than integrations — budget accordingly',
      'Always negotiate for a pinned comment with your link + a description link',
      'YouTube content has the longest shelf life — a video can drive leads for years',
      'Pre-roll integrations (first 60s) outperform mid-roll for brand recall',
      'Request raw analytics (not just screenshots) — watch time matters more than views',
    ],
    'LinkedIn': [
      'LinkedIn influencers are often B2B decision-makers — the ROI per impression is massive',
      'Thought leadership posts outperform promotional content 10:1 on LinkedIn',
      'Tag your brand in the post — LinkedIn\'s algorithm favors posts with company mentions',
      'Document-style posts (carousels) get 3x the engagement of text-only posts',
      'Ask the creator to engage with comments for 2 hours after posting — it boosts reach',
    ],
    'Twitter/X': [
      'Threads drive 5x more engagement than single tweets for brand partnerships',
      'Quote-tweet campaigns (creator QTs your announcement) feel organic and perform well',
      'Twitter Spaces collaborations are underpriced — great for B2B and tech brands',
      'Pin the sponsored tweet for 48 hours — negotiate this as part of the deal',
      'Pair tweet content with a LinkedIn cross-post for maximum B2B reach',
    ],
    'Podcast': [
      'Host-read ads convert 3-5x better than pre-produced ads — let the host use their voice',
      'Sponsor multiple episodes (3-5) for compound effect — one episode rarely moves the needle',
      'Provide a unique URL/code for tracking — "use code PODCAST at checkout"',
      'Mid-roll ads have 25% higher completion rate than pre-roll',
      'Ask for show notes placement + website mention in addition to the audio ad',
    ],
    'Newsletter': [
      'Dedicated sends outperform sponsored sections — but cost 3-5x more',
      'Ask for open rate and click rate data from previous sponsorships',
      'Provide the copy but let the creator adapt it to their voice — readers notice when it\'s canned',
      'Negotiate a re-send to non-openers (adds 15-20% more reach for free)',
      'Include a trackable link + UTM parameters — newsletter attribution is tricky otherwise',
    ],
  };

  return {
    messages,
    subjectLines,
    followUp,
    negotiationTips: tierNegotiation[tier] || tierNegotiation['Micro (10-50K)'],
    redFlags,
    rateCard: rateCards[platform] || rateCards['Instagram'],
    bestPractices: practicesByPlatform[platform] || practicesByPlatform['Instagram'],
  };
}

export default function InfluencerOutreachPage() {
  const [outreachType, setOutreachType] = useState<string>('Cold DM');
  const [platform, setPlatform] = useState<string>('Instagram');
  const [creatorTier, setCreatorTier] = useState<string>('Micro (10-50K)');
  const [niche, setNiche] = useState<string>('Tech');
  const [campaignGoal, setCampaignGoal] = useState<string>('Brand Awareness');
  const [brandTone, setBrandTone] = useState<string>('Casual/Friendly');
  const [brand, setBrand] = useState('');
  const [product, setProduct] = useState('');
  const [budget, setBudget] = useState('');
  const [usp, setUsp] = useState('');
  const [result, setResult] = useState<OutreachResult | null>(null);

  const handleGenerate = () => {
    setResult(generateOutreach(outreachType, platform, creatorTier, niche, campaignGoal, brandTone, brand.trim(), product.trim(), budget.trim(), usp.trim()));
  };

  return (
    <main className="min-h-screen bg-zinc-950 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Influencer Outreach Generator</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Generate personalized DM and email templates that actually get replies. Micro-influencer campaigns deliver <strong className="text-white">60% higher engagement</strong> than traditional ads.</p>

        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div><label className="block text-sm text-zinc-400 mb-1">Outreach Type</label><select value={outreachType} onChange={e => setOutreachType(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">{outreachTypes.map(t => <option key={t}>{t}</option>)}</select></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Platform</label><select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">{platforms.map(p => <option key={p}>{p}</option>)}</select></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Creator Tier</label><select value={creatorTier} onChange={e => setCreatorTier(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">{creatorTiers.map(t => <option key={t}>{t}</option>)}</select></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Niche</label><select value={niche} onChange={e => setNiche(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">{niches.map(n => <option key={n}>{n}</option>)}</select></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Campaign Goal</label><select value={campaignGoal} onChange={e => setCampaignGoal(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">{campaignGoals.map(g => <option key={g}>{g}</option>)}</select></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Brand Tone</label><select value={brandTone} onChange={e => setBrandTone(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">{brandTones.map(t => <option key={t}>{t}</option>)}</select></div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div><label className="block text-sm text-zinc-400 mb-1">Brand Name</label><input type="text" value={brand} onChange={e => setBrand(e.target.value)} placeholder="e.g., PostCraft AI" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600" /></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Product/Offer</label><input type="text" value={product} onChange={e => setProduct(e.target.value)} placeholder="e.g., AI content generator" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600" /></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Budget Range</label><input type="text" value={budget} onChange={e => setBudget(e.target.value)} placeholder="e.g., $500-$2,000" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600" /></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Key Selling Point</label><input type="text" value={usp} onChange={e => setUsp(e.target.value)} placeholder="e.g., 10x faster content creation" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600" /></div>
        </div>

        <button onClick={handleGenerate} className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition">Generate Outreach</button>

        {result && (
          <div className="mt-10 space-y-6">
            <h2 className="text-2xl font-bold text-white">Outreach Templates</h2>
            {result.messages.map((m, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3"><span className="text-xs bg-violet-600/30 text-violet-300 px-2 py-0.5 rounded-full">{m.angle}</span></div>
                <p className="text-white text-sm whitespace-pre-wrap mb-3">{m.text}</p>
                <p className="text-xs text-violet-400">{m.tip}</p>
              </div>
            ))}

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Subject Lines (Email)</h3>
                <ul className="space-y-2">{result.subjectLines.map((s, i) => <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-violet-400">{i + 1}.</span>{s}</li>)}</ul>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Red Flags to Watch</h3>
                <ul className="space-y-2">{result.redFlags.map((r, i) => <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-red-400">!</span>{r}</li>)}</ul>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Follow-Up Sequence</h3>
              {result.followUp.map((f, i) => (
                <div key={i} className="bg-zinc-800 rounded-lg p-4 mb-3">
                  <div className="flex items-center gap-2 mb-2"><span className="text-xs bg-fuchsia-600/30 text-fuchsia-300 px-2 py-0.5 rounded-full">{f.day}</span></div>
                  <p className="text-sm text-zinc-300 whitespace-pre-wrap">{f.message}</p>
                </div>
              ))}
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Rate Card — {platform} ({creatorTier})</h3>
              <div className="grid gap-2">
                {result.rateCard.map((r, i) => (
                  <div key={i} className="flex justify-between bg-zinc-800 rounded-lg px-4 py-3">
                    <span className="text-sm text-zinc-300">{r.format}</span>
                    <span className="text-sm text-green-400 font-medium">{r.range}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Negotiation Tips ({creatorTier})</h3>
                <ul className="space-y-2">{result.negotiationTips.map((t, i) => <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-violet-400">*</span>{t}</li>)}</ul>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">{platform} Best Practices</h3>
                <ul className="space-y-2">{result.bestPractices.map((b, i) => <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-fuchsia-400">-&gt;</span>{b}</li>)}</ul>
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-zinc-400 mb-3">Related Tools</h3>
              <div className="flex flex-wrap gap-2 text-sm">
                <a href="/collab-brief" className="text-violet-400 hover:text-violet-300 underline">Collab Brief</a>
                <a href="/influencer-score" className="text-violet-400 hover:text-violet-300 underline">Influencer Score</a>
                <a href="/social-proof" className="text-violet-400 hover:text-violet-300 underline">Social Proof</a>
                <a href="/ugc-manager" className="text-violet-400 hover:text-violet-300 underline">UGC Manager</a>
                <a href="/brand-voice" className="text-violet-400 hover:text-violet-300 underline">Brand Voice</a>
                <a href="/conversion-optimizer" className="text-violet-400 hover:text-violet-300 underline">Conversion Optimizer</a>
              </div>
            </div>
          </div>
        )}

        <footer className="mt-20 border-t border-zinc-800 pt-8 pb-12">
          <div className="grid md:grid-cols-4 gap-8 text-sm text-zinc-500">
            <div><h4 className="font-semibold text-white mb-3">Outreach</h4><ul className="space-y-1"><li><a href="/influencer-outreach" className="hover:text-white transition">Outreach</a></li><li><a href="/collab-brief" className="hover:text-white transition">Collab Brief</a></li><li><a href="/influencer-score" className="hover:text-white transition">Influencer Score</a></li><li><a href="/ugc-manager" className="hover:text-white transition">UGC</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Strategy</h4><ul className="space-y-1"><li><a href="/content-pillars" className="hover:text-white transition">Content Pillars</a></li><li><a href="/brand-voice" className="hover:text-white transition">Brand Voice</a></li><li><a href="/campaign" className="hover:text-white transition">Campaign</a></li><li><a href="/content-calendar" className="hover:text-white transition">Calendar</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Analytics</h4><ul className="space-y-1"><li><a href="/roi-calculator" className="hover:text-white transition">ROI</a></li><li><a href="/engagement-calculator" className="hover:text-white transition">Engagement</a></li><li><a href="/conversion-optimizer" className="hover:text-white transition">Conversion</a></li><li><a href="/social-proof" className="hover:text-white transition">Social Proof</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Creation</h4><ul className="space-y-1"><li><a href="/" className="hover:text-white transition">Posts</a></li><li><a href="/carousel-generator" className="hover:text-white transition">Carousel</a></li><li><a href="/story-planner" className="hover:text-white transition">Stories</a></li><li><a href="/hooks" className="hover:text-white transition">Hooks</a></li></ul></div>
          </div>
          <p className="text-center text-zinc-600 text-xs mt-8">&copy; 2026 PostCraft AI. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
