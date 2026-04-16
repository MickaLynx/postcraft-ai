import { generateText } from 'ai';
import { NextResponse } from 'next/server';

const charLimits: Record<string, number> = {
  'Twitter/X': 280, LinkedIn: 3000, Instagram: 2200, TikTok: 300, Facebook: 5000,
};

const audiencePrompts: Record<string, string> = {
  general: 'a general social media audience',
  ecommerce: 'e-commerce buyers, DTC brand followers, and online shoppers',
  saas: 'B2B decision-makers, SaaS users, and tech professionals',
  creator: 'content creators, influencers, and their engaged followers',
  agency: 'marketing professionals, agency clients, and brand managers',
  personal: 'professionals building a personal brand and thought leadership',
  startup: 'startup founders, investors, and the entrepreneurial community',
};

export async function POST(req: Request) {
  try {
    const { sourceContent, platform, tone, language = 'English', audience = 'general' } = await req.json();

    if (!sourceContent?.trim()) {
      return NextResponse.json({ error: 'Source content is required' }, { status: 400 });
    }

    const limit = charLimits[platform] || 280;
    const audienceDesc = audiencePrompts[audience] || audiencePrompts.general;

    const { text } = await generateText({
      model: 'anthropic/claude-sonnet-4.6',
      system: `You are an expert content atomizer. Your job is to extract the most impactful ideas, quotes, statistics, and insights from long-form content and transform them into platform-optimized social media posts.

Target platform: ${platform}
Character limit: ${limit} characters per post
Tone: ${tone}
Language: ${language}. Write ALL posts in ${language}.
Target audience: ${audienceDesc}

Rules:
- Generate exactly 3 posts from the source content
- Each post must be under ${limit} characters
- Extract DIFFERENT insights/angles from the source — no repetition
- Write in ${language} with culturally appropriate expressions
- Optimize for ${platform} (hashtags for IG/TikTok, professional for LinkedIn, concise for Twitter/X, engaging for Facebook)
- Each post should stand alone — someone who hasn't read the source should understand it
- Include relevant emojis where appropriate for the platform
- Make posts engaging, shareable, and tailored to ${audienceDesc}
- Preserve key data points, statistics, and quotes from the original

Return ONLY valid JSON: {"posts":["post1","post2","post3"]}`,
      prompt: `ATOMIZE THIS CONTENT:\n\n${sourceContent.slice(0, 8000)}`,
    });

    try {
      const parsed = JSON.parse(text);
      return NextResponse.json({ posts: parsed.posts.slice(0, 3) });
    } catch {
      const lines = text.split('\n').filter(l => l.trim().length > 5).slice(0, 3);
      return NextResponse.json({ posts: lines });
    }
  } catch (err) {
    console.error('Atomize error:', err);
    return NextResponse.json({ error: 'Failed to atomize content' }, { status: 500 });
  }
}
