import { generateText } from 'ai';
import { NextResponse } from 'next/server';

const charLimits: Record<string, number> = {
  'Twitter/X': 280, LinkedIn: 3000, Instagram: 2200, TikTok: 300, Facebook: 5000,
};

const audiencePrompts: Record<string, string> = {
  general: '',
  ecommerce: 'Target audience: e-commerce buyers, DTC brand followers, and online shoppers. Use product-centric language, urgency, and social proof.',
  saas: 'Target audience: B2B decision-makers, SaaS users, and tech professionals. Use data-driven language, ROI focus, and thought leadership.',
  creator: 'Target audience: content creators, influencers, and their engaged followers. Use relatable, authentic, creator-community language.',
  agency: 'Target audience: marketing professionals and agency clients. Use industry expertise, results-focused language, and strategic framing.',
  personal: 'Target audience: professionals building a personal brand. Use first-person perspective, vulnerability, and career insights.',
  startup: 'Target audience: startup founders and the entrepreneurial community. Use hustle-aware, data-backed, founder-to-founder language.',
};

export async function POST(req: Request) {
  try {
    const { topic, platform, tone, count = 5, language = 'English', audience = 'general', abVariants = false } = await req.json();

    if (!topic?.trim()) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    const limit = charLimits[platform] || 280;
    const safeCount = Math.min(Math.max(1, count), 10);
    const audienceNote = audiencePrompts[audience] || '';
    const abNote = abVariants ? '\n- For each post, generate TWO versions: version A (safe/proven approach) and version B (bold/experimental approach). Format each pair as "A: [post]\\n\\nB: [post]".' : '';

    const { text } = await generateText({
      model: 'anthropic/claude-sonnet-4.6',
      system: `You are an expert social media copywriter. Generate exactly ${safeCount} ${platform} posts about the given topic.
Language: ${language}. Write ALL posts in ${language}.
Tone: ${tone}.
Character limit per post: ${limit} characters.
${audienceNote}
Rules:
- Each post must be under ${limit} characters
- Write in ${language} with culturally appropriate expressions and idioms
- Optimize for ${platform} (hashtags for IG/TikTok, professional for LinkedIn, concise for Twitter/X)
- Include relevant emojis where appropriate
- Make posts engaging, shareable, and conversion-oriented${abNote}
Return ONLY valid JSON: {"posts":["post1","post2",...]}`,
      prompt: topic,
    });

    try {
      const parsed = JSON.parse(text);
      return NextResponse.json({ posts: parsed.posts.slice(0, safeCount) });
    } catch {
      const lines = text.split('\n').filter(l => l.trim().length > 5).slice(0, safeCount);
      return NextResponse.json({ posts: lines });
    }
  } catch (err) {
    console.error('Generate error:', err);
    return NextResponse.json({ error: 'Failed to generate posts' }, { status: 500 });
  }
}
