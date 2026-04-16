import { generateText } from 'ai';
import { NextResponse } from 'next/server';

const archetypePrompts: Record<string, string> = {
  visionary: 'Bold, aspirational, future-focused. Uses words like "reimagine", "transform", "tomorrow". Confident assertions. Short, punchy sentences mixed with inspiring longer ones.',
  mentor: 'Warm, educational, encouraging. Uses "you can", "here\'s how", "let me show you". Patient tone. Clear explanations with actionable takeaways.',
  rebel: 'Provocative, irreverent, challenging. Uses slang, contractions, bold claims. Breaks grammar rules intentionally. Anti-corporate tone.',
  friend: 'Casual, warm, relatable. Uses "we", "us", contractions. Conversational flow. Personal anecdotes welcome. Feels like texting a smart friend.',
  expert: 'Data-driven, precise, authoritative. Uses statistics, technical terms (explained). Measured claims. Clear structure. Professional but not boring.',
  entertainer: 'Witty, fun, playful. Uses puns, pop culture references, unexpected angles. Self-aware humor. Meme-literate. Never takes itself too seriously.',
};

const industryContext: Record<string, string> = {
  tech: 'Technology & SaaS industry. Audience expects innovation, speed, efficiency. Technical credibility matters.',
  ecommerce: 'E-commerce & retail. Audience expects deals, product benefits, lifestyle aspirations. Visual-first.',
  finance: 'Finance & fintech. Audience expects trust, security, clarity. Regulatory awareness important.',
  health: 'Health & wellness. Audience expects empathy, expertise, evidence-based claims. Sensitivity required.',
  education: 'Education & learning. Audience expects clarity, patience, inspiration. Accessibility matters.',
  creative: 'Creative & design. Audience expects originality, aesthetics, cultural awareness. Visual storytelling.',
  food: 'Food & beverage. Audience expects sensory language, lifestyle, community. Authenticity matters.',
  travel: 'Travel & hospitality. Audience expects wanderlust, experiences, reliability. Escapism + practicality.',
  fitness: 'Fitness & sports. Audience expects motivation, results, community. Energy and action words.',
  realestate: 'Real estate & property. Audience expects trust, local expertise, investment returns. Professional.',
};

export async function POST(req: Request) {
  try {
    const { brandName, description, industry = 'tech', archetype = 'visionary', values = '', targetAudience = '', platforms = ['Twitter/X', 'LinkedIn', 'Instagram'], language = 'English' } = await req.json();

    if (!brandName?.trim() || !description?.trim()) {
      return NextResponse.json({ error: 'Brand name and description are required' }, { status: 400 });
    }

    const archetypeNote = archetypePrompts[archetype] || archetypePrompts.visionary;
    const industryNote = industryContext[industry] || '';

    const { text } = await generateText({
      model: 'anthropic/claude-sonnet-4.6',
      system: `You are a world-class brand strategist who has built voice guidelines for Fortune 500 companies and viral startups.
Generate a complete brand voice guide for "${brandName}".
Language: ${language}. Write ALL content in ${language}.

Brand archetype: ${archetype}. ${archetypeNote}
Industry: ${industryNote}
${values ? `Core values: ${values}` : ''}
${targetAudience ? `Target audience: ${targetAudience}` : ''}

Return ONLY valid JSON with this exact structure:
{
  "result": {
    "tagline": "A memorable 5-10 word brand tagline",
    "voiceProfile": {
      "tone": "2-3 sentence description of the overall tone",
      "vocabulary": "2-3 sentence description of word choices and language style",
      "sentenceStyle": "2-3 sentence description of sentence structure and rhythm",
      "emojiUsage": "1-2 sentence guideline on emoji usage",
      "doList": ["5 specific things to DO in brand communication"],
      "dontList": ["5 specific things to NEVER DO in brand communication"]
    },
    "samples": [${platforms.map((p: string) => `{"platform":"${p}","post":"A sample post for ${p} in this brand voice"}`).join(',')}]
  }
}

Rules:
- Make the voice guide SPECIFIC to this brand, not generic
- Sample posts must feel authentic to the archetype
- Each platform sample must respect platform conventions (length, format, hashtags)
- Do/Don't lists should be actionable and specific, not vague
- Culturally adapt everything to ${language}`,
      prompt: `Brand: ${brandName}\nDescription: ${description}${values ? `\nValues: ${values}` : ''}${targetAudience ? `\nTarget Audience: ${targetAudience}` : ''}`,
    });

    try {
      const parsed = JSON.parse(text);
      return NextResponse.json(parsed);
    } catch {
      return NextResponse.json({ error: 'Failed to parse response' }, { status: 500 });
    }
  } catch (err) {
    console.error('Brand voice error:', err);
    return NextResponse.json({ error: 'Failed to generate brand voice' }, { status: 500 });
  }
}
