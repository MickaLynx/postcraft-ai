import { generateText } from 'ai';
import { NextResponse } from 'next/server';

const hookStyles = {
  question: 'Open with a provocative question that challenges assumptions or creates curiosity gaps.',
  statistic: 'Open with a surprising stat or data point that stops the scroll.',
  story: 'Open with a mini-story or personal anecdote in 1-2 sentences.',
  controversial: 'Open with a bold, slightly controversial statement that demands attention.',
  howto: 'Open with a "How to" or "X ways to" framework that promises actionable value.',
  pov: 'Open with a POV (Point of View) format: "POV: you just..." — relatable and immersive.',
  listicle: 'Open with a numbered list hook: "3 things nobody tells you about..." — numbers increase engagement 30%.',
} as const;

const platformNotes: Record<string, string> = {
  'Twitter/X': 'Max 280 chars. Punchy, no fluff. Threads start with the hook tweet.',
  LinkedIn: 'First 2 lines visible before "see more". Hook must earn the click. Professional but human.',
  Instagram: 'First line of caption is the hook. Must work with or without the image context.',
  TikTok: 'First 1-2 seconds of spoken script. Must create immediate curiosity. Under 15 words ideal.',
  Facebook: 'First 2 lines visible in feed. Emotional or relatable hooks perform best.',
  YouTube: 'Thumbnail + title hook combo. Under 60 chars for title. Create a curiosity gap.',
  Newsletter: 'Subject line is the hook. Under 50 chars. Must earn the open.',
};

export async function POST(req: Request) {
  try {
    const { topic, platform = 'Twitter/X', style = 'question', count = 10, language = 'English' } = await req.json();

    if (!topic?.trim()) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    const safeCount = Math.min(Math.max(1, count), 15);
    const styleNote = hookStyles[style as keyof typeof hookStyles] || hookStyles.question;
    const platNote = platformNotes[platform] || '';

    const { text } = await generateText({
      model: 'anthropic/claude-sonnet-4.6',
      system: `You are an expert copywriter specializing in scroll-stopping hooks and opening lines.
Generate exactly ${safeCount} hooks for ${platform} about the given topic.
Language: ${language}. Write ALL hooks in ${language}.
Style: ${styleNote}
Platform context: ${platNote}
Rules:
- Each hook must be SHORT — one or two sentences max
- Create a curiosity gap, emotional trigger, or pattern interrupt
- Vary the angle for each hook (different emotions, perspectives, framings)
- Make them impossible to scroll past
- Include relevant emojis sparingly where they add impact
- Culturally adapt to ${language}
Return ONLY valid JSON: {"hooks":["hook1","hook2",...]}`,
      prompt: topic,
    });

    try {
      const parsed = JSON.parse(text);
      return NextResponse.json({ hooks: parsed.hooks.slice(0, safeCount) });
    } catch {
      const lines = text.split('\n').filter(l => l.trim().length > 5).slice(0, safeCount);
      return NextResponse.json({ hooks: lines });
    }
  } catch (err) {
    console.error('Hooks error:', err);
    return NextResponse.json({ error: 'Failed to generate hooks' }, { status: 500 });
  }
}
