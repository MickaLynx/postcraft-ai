import { generateText } from 'ai';
import { NextResponse } from 'next/server';

const platformRules: Record<string, string> = {
  'Twitter/X': '3-5 hashtags max. Mix trending + niche. Place at end of tweet or in reply. No spaces in multi-word tags.',
  LinkedIn: '3-5 hashtags. Professional/industry-specific. Place at bottom of post. Mix broad (#marketing) with niche (#B2BSaaS).',
  Instagram: '20-30 hashtags. Mix sizes: 5 large (1M+), 10 medium (10K-1M), 10 small (under 10K). Group by theme.',
  TikTok: '4-6 hashtags. Trending + niche + branded. Always include 1-2 trending/viral tags. Short tags preferred.',
  Facebook: '2-3 hashtags max. Less is more. Focus on branded + 1 topical. Place in post body, not at end.',
  YouTube: '8-15 tags. Mix broad + specific. Include misspellings of common searches. Think SEO keywords.',
  Pinterest: '5-8 hashtags in pin description. Descriptive and specific. Think search terms people type.',
};

const strategies = {
  reach: 'Maximize reach. Mix high-volume trending hashtags with medium-volume niche tags. Priority: discoverability by new audiences.',
  engagement: 'Maximize engagement. Focus on community-specific and niche hashtags where conversations happen. Smaller, more targeted audiences.',
  branded: 'Build brand recognition. Include branded hashtags, campaign tags, and community tags. Mix with 2-3 discovery tags.',
  trending: 'Ride trending waves. Prioritize currently trending and viral hashtags. Mix with 2-3 evergreen niche tags for relevance.',
  local: 'Target local audiences. Include city/region/country specific hashtags. Mix with 2-3 industry tags.',
} as const;

export async function POST(req: Request) {
  try {
    const { topic, platform = 'Instagram', strategy = 'reach', language = 'English', brand = '' } = await req.json();

    if (!topic?.trim()) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    const platRule = platformRules[platform] || platformRules.Instagram;
    const stratNote = strategies[strategy as keyof typeof strategies] || strategies.reach;

    const { text } = await generateText({
      model: 'anthropic/claude-sonnet-4.6',
      system: `You are a social media hashtag strategist who understands algorithm optimization for every platform.
Generate optimized hashtag sets for ${platform} about the given topic.
Language: ${language}. Adapt hashtags to ${language} where relevant (use local hashtags for non-English).
Strategy: ${stratNote}
Platform rules: ${platRule}
${brand ? `Brand name for branded hashtags: ${brand}` : ''}
Rules:
- Generate 3 distinct hashtag sets (so users can A/B test)
- Each set labeled: "High Reach", "Niche Engagement", "Balanced Mix"
- Include estimated reach category per tag: L (1M+), M (10K-1M), S (under 10K)
- Sort each set by estimated reach (largest first)
- Do NOT include # in the JSON — just the tag text
- Culturally adapt to ${language} — use local trending patterns
Return ONLY valid JSON: {"sets":[{"name":"High Reach","tags":[{"tag":"tagname","reach":"L"},...]},{"name":"Niche Engagement","tags":[...]},{"name":"Balanced Mix","tags":[...]}]}`,
      prompt: topic,
    });

    try {
      const parsed = JSON.parse(text);
      return NextResponse.json({ sets: parsed.sets });
    } catch {
      return NextResponse.json({ sets: [{ name: 'Generated', tags: [{ tag: 'error', reach: 'M' }] }] });
    }
  } catch (err) {
    console.error('Hashtags error:', err);
    return NextResponse.json({ error: 'Failed to generate hashtags' }, { status: 500 });
  }
}
