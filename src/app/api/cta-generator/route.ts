import { generateText } from 'ai';
import { NextResponse } from 'next/server';

const ctaGoals: Record<string, string> = {
  click: 'Drive clicks to a link or page. Focus on curiosity gaps and value promises.',
  signup: 'Capture email signups or account creation. Emphasize free value and low commitment.',
  buy: 'Direct purchase or checkout. Focus on value, urgency, and removing objections.',
  download: 'Drive downloads of lead magnets, apps, or resources. Highlight instant value.',
  engage: 'Drive comments, shares, saves, or other engagement actions. Make it conversational.',
  follow: 'Grow followers or subscribers. Emphasize what they will get by following.',
};

const urgencyNotes: Record<string, string> = {
  low: 'Gentle, no-pressure tone. Soft suggestion. No deadlines or scarcity.',
  medium: 'Clear and direct. Moderate urgency. State the benefit of acting now.',
  high: 'Strong FOMO. Limited time, limited spots, or exclusive access. Create urgency without being manipulative.',
};

const platformContext: Record<string, string> = {
  'Twitter/X': 'Short, punchy. Max 1-2 lines. Can use thread hooks or quote-tweet formats.',
  LinkedIn: 'Professional but human. Can be longer. Often ends with a question or soft ask.',
  Instagram: 'Visual-first platform. Bio link, swipe up, DM me. Emoji-friendly. Caption CTAs.',
  TikTok: 'Ultra-short. Comment-based engagement. Follow for Part 2. Link in bio.',
  Facebook: 'Can be longer. Share-focused. Community-oriented language.',
  Email: 'Button text + surrounding copy. Subject line hooks. PS line CTAs.',
  'Landing Page': 'Above-fold button text + supporting microcopy. Hero CTAs and exit-intent.',
};

export async function POST(req: Request) {
  try {
    const { topic, ctaType = 'click', platform = 'Twitter/X', urgency = 'medium', language = 'English' } = await req.json();

    if (!topic?.trim()) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    const goalNote = ctaGoals[ctaType] || ctaGoals.click;
    const urgencyNote = urgencyNotes[urgency] || urgencyNotes.medium;
    const platNote = platformContext[platform] || '';

    const { text } = await generateText({
      model: 'anthropic/claude-sonnet-4.6',
      system: `You are an expert conversion copywriter specializing in calls-to-action.
Generate CTAs organized into 3 categories for ${platform}.
Language: ${language}. Write ALL CTAs in ${language}.
Goal: ${goalNote}
Urgency: ${urgencyNote}
Platform: ${platNote}
Rules:
- Return 3 categories with 4 CTAs each (12 total)
- Categories: "Button Text" (short, 2-6 words), "One-Liner CTAs" (single sentence with context), "Post-Ending CTAs" (how to close a post with this CTA)
- Use first-person where possible ("Start My..." not "Start Your...")
- Each CTA must be specific to the product/offer, not generic
- Include power words: free, instant, exclusive, proven, guaranteed, secret, limited
- Vary urgency and angle across CTAs
- Culturally adapt to ${language}
Return ONLY valid JSON: {"sets":[{"category":"Category Name","ctas":["cta1","cta2","cta3","cta4"]}]}`,
      prompt: topic,
    });

    try {
      const parsed = JSON.parse(text);
      return NextResponse.json({ sets: parsed.sets });
    } catch {
      return NextResponse.json({ sets: [{ category: 'Generated CTAs', ctas: text.split('\n').filter(l => l.trim().length > 3).slice(0, 8) }] });
    }
  } catch (err) {
    console.error('CTA generator error:', err);
    return NextResponse.json({ error: 'Failed to generate CTAs' }, { status: 500 });
  }
}
