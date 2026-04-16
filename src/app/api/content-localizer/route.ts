import { generateText } from 'ai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { content, platform = 'Instagram', regions = [], adaptation = 'medium', tone = 'Professional' } = await req.json();

    if (!content?.trim()) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    if (!regions.length) {
      return NextResponse.json({ error: 'At least one region is required' }, { status: 400 });
    }

    const regionList = regions.map((r: { label: string; flag: string; key: string }) => `${r.flag} ${r.label} (${r.key})`).join(', ');

    const adaptationGuides: Record<string, string> = {
      light: 'Translate the content accurately with minor cultural adjustments. Keep the structure and messaging close to the original.',
      medium: 'Fully adapt the content for each culture. Replace cultural references, idioms, humor, and examples with locally relevant ones. Adjust tone to match regional norms.',
      deep: 'Completely rewrite the content for each market. Keep the core intent and message but create entirely new copy that feels 100% native. Use local trends, slang, memes, and cultural touchpoints.',
    };
    const adaptationGuide = adaptationGuides[adaptation] || 'Medium adaptation.';

    const { text } = await generateText({
      model: 'anthropic/claude-sonnet-4.6',
      system: `You are an expert content localizer and cultural adaptation specialist. You don't just translate — you adapt content to feel completely native in each target market.

Platform: ${platform}
Tone: ${tone}
Adaptation level: ${adaptation}
Guide: ${adaptationGuide}

Target regions: ${regionList}

For EACH region, provide:
1. The localized content in the local language
2. Cultural notes explaining adaptations made
3. Relevant local hashtags in the local language
4. Best time to post for that region (local timezone)
5. Platform-specific tip for that market

Return ONLY valid JSON:
{
  "versions": [
    {
      "region": "Country Name",
      "flag": "🇫🇷",
      "language": "Français",
      "content": "localized content here",
      "culturalNotes": ["note1", "note2"],
      "hashtags": ["#tag1", "#tag2"],
      "bestTimeToPost": "9:00 AM - 11:00 AM CET",
      "platformTip": "tip for this market"
    }
  ]
}`,
      prompt: content,
    });

    try {
      const parsed = JSON.parse(text);
      return NextResponse.json({ versions: parsed.versions || [] });
    } catch {
      return NextResponse.json({ versions: [] });
    }
  } catch (err) {
    console.error('Content localizer error:', err);
    return NextResponse.json({ error: 'Failed to localize content' }, { status: 500 });
  }
}
