import { generateText } from 'ai';
import { NextResponse } from 'next/server';

const goalStrategies: Record<string, string> = {
  awareness: 'Focus on shareable, educational, and viral-potential content. Maximize reach with trending topics, controversial takes, and visual content.',
  engagement: 'Focus on conversation starters: questions, polls, hot takes, and relatable content. Encourage comments and shares.',
  leads: 'Focus on value-first content with clear CTAs. Offer free resources, checklists, and insights that build email lists.',
  sales: 'Focus on social proof, case studies, limited offers, and urgency. Mix testimonials with product showcases.',
  authority: 'Focus on original insights, data-backed takes, industry analysis, and thought leadership. Position as the go-to expert.',
};

export async function POST(req: Request) {
  try {
    const { niche, platforms = ['Twitter/X', 'LinkedIn', 'Instagram'], frequency = '5', goal = 'engagement', language = 'English' } = await req.json();

    if (!niche?.trim()) {
      return NextResponse.json({ error: 'Niche is required' }, { status: 400 });
    }

    const goalNote = goalStrategies[goal] || goalStrategies.engagement;
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const postsPerWeek = Math.min(parseInt(frequency) || 5, 14);

    const { text } = await generateText({
      model: 'anthropic/claude-sonnet-4.6',
      system: `You are a world-class social media strategist who has managed content calendars for brands generating millions in revenue.
Generate a 7-day content calendar for the "${niche}" niche.
Language: ${language}. Write ALL content in ${language}.

Available platforms: ${platforms.join(', ')}
Frequency: ~${postsPerWeek} posts per week
Goal: ${goal}. ${goalNote}

Content types to rotate: educational, engagement, story, promotional, trending, behind-the-scenes, carousel/thread, video/reel

Return ONLY valid JSON:
{
  "result": {
    "weekTheme": "A catchy 3-5 word theme for this content week",
    "strategy": "1-2 sentence overall strategy for the week",
    "calendar": [
      ${days.map(d => `{
        "day": "${d}",
        "platform": "One of: ${platforms.join(', ')}",
        "contentType": "e.g. Educational, Engagement, Story, Promotional, Trending",
        "topic": "Specific topic title",
        "caption": "Ready-to-post caption (platform-optimized length and format)",
        "hashtags": "3-5 relevant hashtags",
        "bestTime": "Best posting time like 9:00 AM EST"
      }`).join(',')}
    ],
    "tips": ["5 actionable strategy tips for this specific week and niche"]
  }
}

Rules:
- Rotate platforms evenly across the week
- Mix content types (40% value, 20% engagement, 20% story, 20% promo)
- Each caption must be FULLY written, ready to copy-paste
- Hashtags must be niche-specific and realistic
- Best times must be research-backed for each platform
- Make topics specific to the niche, not generic
- Captions should use the appropriate tone and format for each platform
- Culturally adapt everything to ${language}`,
      prompt: `Niche: ${niche}\nPlatforms: ${platforms.join(', ')}\nGoal: ${goal}\nFrequency: ${postsPerWeek}x/week`,
    });

    try {
      const parsed = JSON.parse(text);
      return NextResponse.json(parsed);
    } catch {
      return NextResponse.json({ error: 'Failed to parse response' }, { status: 500 });
    }
  } catch (err) {
    console.error('Content calendar error:', err);
    return NextResponse.json({ error: 'Failed to generate content calendar' }, { status: 500 });
  }
}
