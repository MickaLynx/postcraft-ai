import { generateText } from 'ai';
import { NextResponse } from 'next/server';

const stylePrompts: Record<string, string> = {
  professional: 'Write a polished, corporate bio that builds instant credibility. Use strong action verbs and quantifiable achievements.',
  creative: 'Write an unconventional, bold bio that stands out. Use unexpected metaphors, creative formatting, or a unique angle.',
  minimal: 'Write an ultra-concise bio. Every word earns its place. No fluff, maximum impact.',
  funny: 'Write a witty, self-aware bio with humor. Make them smile and remember you. Balance personality with professionalism.',
  authoritative: 'Write an expert-positioning bio. Emphasize credentials, results, and thought leadership. Make them respect you immediately.',
  personal: 'Write a warm, approachable bio. Show the human behind the title. Balance vulnerability with competence.',
};

const platformRules: Record<string, string> = {
  'Twitter/X': 'Max 160 characters. Use | or emojis as separators. Punchy and scannable. Include a hook or CTA.',
  LinkedIn: 'Up to 2600 chars. Use line breaks generously. Lead with value proposition. Include metrics. Professional but human.',
  Instagram: 'Max 150 characters. Emoji-friendly. Line breaks allowed. Ultra-concise. Niche keywords for discovery.',
  TikTok: 'Max 80 characters. 2-3 words about your niche. Fun and memorable. Emojis compress meaning.',
  YouTube: 'Up to 1000 chars. First 2 lines visible above fold. Include upload schedule. SEO keywords matter.',
  GitHub: 'Max 256 chars. Tech stack mention. Developer-focused. Open source cred. Clean and technical.',
  'Personal Website': 'Up to 500 chars. Can be longer-form. Tell a micro-story. Include your mission and what visitors get.',
};

export async function POST(req: Request) {
  try {
    const { role, keywords = '', platform = 'Twitter/X', style = 'professional', language = 'English' } = await req.json();

    if (!role?.trim()) {
      return NextResponse.json({ error: 'Role is required' }, { status: 400 });
    }

    const styleNote = stylePrompts[style] || stylePrompts.professional;
    const platRule = platformRules[platform] || '';

    const { text } = await generateText({
      model: 'anthropic/claude-sonnet-4.6',
      system: `You are an expert personal branding copywriter who has written bios for CEOs, creators, and influencers.
Generate exactly 5 unique bios for ${platform}.
Language: ${language}. Write ALL bios in ${language}.
Style: ${styleNote}
Platform rules: ${platRule}
${keywords ? `Incorporate these keywords/achievements naturally: ${keywords}` : ''}
Rules:
- STRICTLY respect the platform character limit
- Each bio must take a different angle (achievement-led, mission-led, personality-led, niche-led, CTA-led)
- Use platform-appropriate formatting (emojis for social, line breaks for LinkedIn)
- Make each bio feel complete, not like a fragment
- Include a subtle CTA or hook where appropriate
- Culturally adapt to ${language}
Return ONLY valid JSON: {"bios":["bio1","bio2","bio3","bio4","bio5"]}`,
      prompt: `Role: ${role}${keywords ? `\nKeywords: ${keywords}` : ''}`,
    });

    try {
      const parsed = JSON.parse(text);
      return NextResponse.json({ bios: parsed.bios.slice(0, 5) });
    } catch {
      const lines = text.split('\n').filter(l => l.trim().length > 5).slice(0, 5);
      return NextResponse.json({ bios: lines });
    }
  } catch (err) {
    console.error('Bios error:', err);
    return NextResponse.json({ error: 'Failed to generate bios' }, { status: 500 });
  }
}
