import { generateText } from 'ai';
import { NextResponse } from 'next/server';

const platformRules: Record<string, string> = {
  'Twitter/X': 'Max 280 chars (25K premium). External links reduce reach ~40%. Max 3-5 hashtags. Engagement bait suppressed. No automated bulk actions.',
  LinkedIn: 'External links in posts reduce reach. 3-5 hashtags max. Engagement pods penalized. Personal > corporate. No clickbait headlines.',
  Instagram: 'Max 30 hashtags (5-15 optimal). Reels > static. Alt text boosts discovery. TikTok watermarks penalized. No follow-for-follow.',
  TikTok: 'First 3s determine distribution. Trending sounds boost 2-5x. Text overlays help accessibility. Recycled content flagged. No fake engagement.',
  Facebook: 'Engagement bait heavily penalized. 1-2 hashtags max. Video prioritized. Groups > Pages for reach. No misleading health claims.',
  YouTube: 'Clickbait titles/thumbnails penalized. Proper ad disclosures required. Community Guidelines strict. Metadata accuracy matters.',
  Pinterest: 'Fresh pins prioritized. Keyword-rich descriptions. No affiliate-only pins. Spam pin behavior penalized. Idea Pins boost reach.',
  Threads: 'Similar to Instagram rules. Cross-posting from X penalized. Original content rewarded. Short-form text prioritized.',
};

export async function POST(req: Request) {
  try {
    const { content, platforms = ['Twitter/X'], contentType = 'organic', language = 'English', includeHashtags = true } = await req.json();

    if (!content?.trim()) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    const platformContext = platforms.map((p: string) => `${p}: ${platformRules[p] || 'Standard social media rules apply.'}`).join('\n');

    const { text } = await generateText({
      model: 'anthropic/claude-sonnet-4.6',
      system: `You are a social media compliance expert. Analyze the given content for compliance issues across multiple dimensions.
Language: ${language}. Write ALL analysis in ${language}.
Content type: ${contentType}
Platforms to check: ${platforms.join(', ')}
Platform-specific rules:
${platformContext}
${includeHashtags ? 'Also analyze hashtag usage and compliance.' : 'Skip hashtag analysis.'}

Check these 6 categories:
1. Platform Policy - ToS violations, restricted content, prohibited claims
2. Algorithm Risk - Shadowban triggers, suppression patterns, engagement bait detection
3. Legal / FTC - Disclosure requirements, health/financial claims, #ad/#sponsored compliance
4. Accessibility - Readability, emoji density, text clarity, alt text reminders
5. Brand Safety - Controversial statements, cultural sensitivity, PR risk
6. Engagement Bait - Manipulation tactics, fake urgency, follow-bait, like-bait

Return ONLY valid JSON:
{
  "overallScore": 0-100,
  "riskLevel": "Low Risk|Medium Risk|High Risk|Critical",
  "checks": [
    {"category":"Category Name","status":"pass|warning|fail","score":0-100,"details":"explanation","fix":"how to fix (empty if pass)"}
  ],
  "warnings": ["warning1", "warning2"],
  "recommendations": ["recommendation1", "recommendation2"]
}`,
      prompt: content,
    });

    try {
      const parsed = JSON.parse(text);
      return NextResponse.json(parsed);
    } catch {
      return NextResponse.json({
        overallScore: 50,
        riskLevel: 'Medium Risk',
        checks: [{ category: 'Analysis', status: 'warning', score: 50, details: 'Could not fully parse results. Please try again.', fix: 'Retry analysis' }],
        warnings: ['Analysis may be incomplete'],
        recommendations: ['Try again with more specific content'],
      });
    }
  } catch (err) {
    console.error('Compliance checker error:', err);
    return NextResponse.json({ error: 'Failed to analyze compliance' }, { status: 500 });
  }
}
