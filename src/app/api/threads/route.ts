import { generateText } from 'ai';
import { NextResponse } from 'next/server';

const threadFormats = {
  'twitter-thread': {
    name: 'Twitter/X Thread',
    notes: 'Generate a 5-10 tweet thread. Each tweet under 280 chars. First tweet is the hook. Last tweet is the CTA. Number each tweet (1/, 2/, etc). Use line breaks between tweets.',
  },
  'linkedin-carousel': {
    name: 'LinkedIn Carousel',
    notes: 'Generate 8-12 slides for a LinkedIn carousel post. Each slide: 1 bold headline (under 10 words) + 1-2 supporting sentences. First slide is the hook title. Last slide is the CTA. Format as SLIDE 1:, SLIDE 2:, etc.',
  },
  'linkedin-thread': {
    name: 'LinkedIn Post + Comments',
    notes: 'Generate a main LinkedIn post (under 1300 chars, hook in first 2 lines) + 3 follow-up comments that add depth. Format: MAIN POST: then COMMENT 1:, COMMENT 2:, COMMENT 3:.',
  },
  'twitter-essay': {
    name: 'Twitter/X Essay Thread',
    notes: 'Generate a 10-15 tweet mega-thread. Deep dive educational content. Each tweet under 280 chars. First tweet is a bold claim or hook. Include data points and examples. Number each tweet.',
  },
  'instagram-carousel': {
    name: 'Instagram Carousel',
    notes: 'Generate 7-10 slides for an Instagram carousel. Each slide: short headline + key insight. First slide is the scroll-stopping cover. Last slide is a save/share CTA. Format as SLIDE 1:, SLIDE 2:, etc.',
  },
} as const;

const tones = {
  educational: 'Teach something valuable. Use clear explanations, examples, and frameworks.',
  storytelling: 'Tell a story arc across the thread. Hook → tension → resolution → lesson.',
  controversial: 'Challenge conventional wisdom. Bold claims backed by reasoning.',
  tactical: 'Step-by-step actionable advice. Numbered steps, specific examples, zero fluff.',
  inspirational: 'Motivate and uplift. Personal journey, lessons learned, encouragement.',
  analytical: 'Data-driven analysis. Stats, comparisons, trends, conclusions.',
} as const;

export async function POST(req: Request) {
  try {
    const { topic, format = 'twitter-thread', tone = 'educational', language = 'English' } = await req.json();

    if (!topic?.trim()) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    const fmt = threadFormats[format as keyof typeof threadFormats] || threadFormats['twitter-thread'];
    const toneNote = tones[tone as keyof typeof tones] || tones.educational;

    const { text } = await generateText({
      model: 'anthropic/claude-sonnet-4.6',
      system: `You are an expert content strategist who creates viral long-form social content.
Generate a ${fmt.name} about the given topic.
Language: ${language}. Write ALL content in ${language}.
Tone: ${toneNote}
Format rules: ${fmt.notes}
Rules:
- Hook MUST be scroll-stopping — use curiosity gaps, bold claims, or surprising data
- Each piece must standalone but also build on the previous
- Include specific examples, not generic advice
- End with a strong CTA (follow, share, save, comment)
- Culturally adapt to ${language}
Return ONLY valid JSON: {"title":"thread title","parts":["part1","part2",...]}`,
      prompt: topic,
    });

    try {
      const parsed = JSON.parse(text);
      return NextResponse.json({ title: parsed.title, parts: parsed.parts });
    } catch {
      const lines = text.split('\n').filter(l => l.trim().length > 5);
      return NextResponse.json({ title: topic, parts: lines });
    }
  } catch (err) {
    console.error('Threads error:', err);
    return NextResponse.json({ error: 'Failed to generate thread' }, { status: 500 });
  }
}
