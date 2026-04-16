'use client';
import { useState } from 'react';

const contentTypes = ['Blog Post', 'Video Script', 'Carousel', 'Twitter Thread', 'Newsletter', 'Case Study', 'Infographic', 'Podcast Episode'] as const;
const platforms = ['Instagram', 'TikTok', 'Twitter/X', 'LinkedIn', 'YouTube', 'Facebook', 'Threads', 'Pinterest'] as const;
const goals = ['Brand Awareness', 'Lead Generation', 'Engagement', 'Education', 'Sales Conversion', 'Community Building'] as const;
const tones = ['Professional', 'Casual', 'Inspirational', 'Data-Driven', 'Storytelling', 'Provocative'] as const;
const audienceLevels = ['Beginner', 'Intermediate', 'Advanced', 'Mixed'] as const;

// metadata moved to layout.tsx (client components cannot export metadata)

interface BriefOverview {
  title: string;
  objective: string;
  targetAudience: string;
  keyMessage: string;
  uniqueAngle: string;
  deadline: string;
}

interface OutlineSection {
  section: string;
  description: string;
  keyPoints: string[];
  estimatedLength: string;
}

interface SeoGuidance {
  primaryKeyword: string;
  secondaryKeywords: string[];
  searchIntent: string;
  targetWordCount: number;
  metaTitle: string;
  metaDescription: string;
}

interface CreativeDirection {
  visualStyle: string;
  colorPalette: string;
  imageGuidance: string;
  videoDirection: string;
  toneExamples: string[];
}

interface DistributionEntry {
  platform: string;
  format: string;
  timing: string;
  hashtags: string[];
  cta: string;
}

interface SuccessMetric {
  metric: string;
  target: string;
  measurementTool: string;
}

interface Reference {
  type: string;
  description: string;
  url: string;
}

interface ChecklistItem {
  item: string;
  priority: 'High' | 'Medium' | 'Low';
}

interface ContentBriefResult {
  briefOverview: BriefOverview;
  contentOutline: OutlineSection[];
  seoGuidance: SeoGuidance;
  creativeDirection: CreativeDirection;
  distributionPlan: DistributionEntry[];
  successMetrics: SuccessMetric[];
  references: Reference[];
  checklist: ChecklistItem[];
}

function generateContentBrief(
  topic: string, contentType: string, platform: string, goal: string, tone: string, audienceLevel: string
): ContentBriefResult {
  const t = topic || 'Content Marketing';
  const seed = (t.length * 7 + contentType.length * 11 + platform.length * 3 + goal.length * 5) % 100;

  // --- Brief Overview ---
  const titleTemplates: Record<string, string[]> = {
    'Blog Post': [`The Ultimate Guide to ${t}`, `${t}: Everything You Need to Know in 2026`, `How ${t} Is Changing the Game`],
    'Video Script': [`Why ${t} Matters More Than Ever`, `${t} Explained in Under 5 Minutes`, `The Truth About ${t}`],
    'Carousel': [`${t}: 10 Things You Need to Know`, `A Visual Guide to ${t}`, `${t} Breakdown: Slide by Slide`],
    'Twitter Thread': [`A thread on ${t} that will change how you think`, `${t}: The thread your timeline needs`, `Unpacking ${t} \u2014 1/12`],
    'Newsletter': [`This Week in ${t}`, `The ${t} Digest: Insights & Trends`, `${t} Insider: What You Missed`],
    'Case Study': [`How We Used ${t} to 3x Results`, `${t} Case Study: From Zero to Hero`, `Real Results with ${t}`],
    'Infographic': [`${t} by the Numbers`, `The State of ${t} in 2026`, `${t}: A Visual Deep Dive`],
    'Podcast Episode': [`Deep Dive: ${t} with Industry Experts`, `The ${t} Episode You\u2019ve Been Waiting For`, `Conversations on ${t}`],
  };
  const titles = titleTemplates[contentType] || titleTemplates['Blog Post'];
  const title = titles[seed % titles.length];

  const objectiveMap: Record<string, string> = {
    'Brand Awareness': `Position the brand as a thought leader in ${t} and increase top-of-funnel visibility by 25% within 30 days of publishing.`,
    'Lead Generation': `Generate qualified leads by offering actionable ${t} insights gated behind a CTA, targeting 150+ email sign-ups within the first 2 weeks.`,
    'Engagement': `Spark meaningful conversations around ${t}, aiming for 500+ comments/shares and a 5%+ engagement rate across all distribution channels.`,
    'Education': `Educate the audience on ${t} fundamentals and advanced strategies, reducing support queries by 20% and building trust with the community.`,
    'Sales Conversion': `Drive direct conversions by demonstrating ${t} ROI with proof points, targeting a 3% click-to-purchase rate from content consumers.`,
    'Community Building': `Foster a sense of belonging around ${t} enthusiasts, growing community membership by 15% and increasing user-generated content contributions.`,
  };

  const audienceMap: Record<string, string> = {
    'Beginner': `Newcomers to ${t} who need foundational knowledge, clear definitions, and step-by-step guidance. Avoid jargon; use analogies and relatable examples.`,
    'Intermediate': `Practitioners with 1-3 years of experience in ${t} who understand basics but want advanced tactics, frameworks, and optimization strategies.`,
    'Advanced': `Senior professionals and experts in ${t} seeking cutting-edge techniques, data-driven insights, and contrarian perspectives that challenge conventional wisdom.`,
    'Mixed': `A diverse audience spanning beginners to experts. Structure content with progressive depth: start accessible, layer in advanced insights, and provide skip-ahead options.`,
  };

  const uniqueAngles = [
    `Contrarian take: challenge the most common ${t} advice by presenting data that disproves popular assumptions.`,
    `First-person narrative: weave personal experience and failure stories into the ${t} framework for authenticity.`,
    `Data-first approach: lead every section with original statistics or research findings about ${t}.`,
    `Future-forward lens: position ${t} within 2026-2028 trends and emerging technologies.`,
    `Cross-industry insight: apply ${t} principles from unexpected industries (e.g., applying restaurant ${t} to SaaS).`,
    `Minimalist angle: strip ${t} down to its simplest, most actionable form \u2014 the 80/20 approach.`,
  ];

  const keyMessages = [
    `${t} isn\u2019t optional anymore \u2014 it\u2019s the foundation of sustainable growth in 2026.`,
    `The brands winning at ${t} share one trait: they prioritize consistency over perfection.`,
    `Most ${t} strategies fail because they skip the fundamentals. This brief ensures you don\u2019t.`,
    `The future of ${t} belongs to creators who combine authenticity with data-driven decision-making.`,
  ];

  const briefOverview: BriefOverview = {
    title,
    objective: objectiveMap[goal],
    targetAudience: audienceMap[audienceLevel],
    keyMessage: keyMessages[seed % keyMessages.length],
    uniqueAngle: uniqueAngles[seed % uniqueAngles.length],
    deadline: `${Math.floor(seed % 5) + 3} business days from brief approval`,
  };

  // --- Content Outline ---
  const outlineTemplates: Record<string, OutlineSection[]> = {
    'Blog Post': [
      { section: 'Hook & Introduction', description: `Open with a compelling statistic or question about ${t} that immediately establishes relevance and urgency.`, keyPoints: [`Shocking stat about ${t} adoption/failure rates`, 'Why this matters now more than ever', 'What the reader will walk away with', 'Brief credibility statement'], estimatedLength: '150-200 words' },
      { section: 'The Current Landscape', description: `Set the stage by analyzing where ${t} stands today \u2014 trends, challenges, and market dynamics.`, keyPoints: ['Industry overview and market size', `Key trends shaping ${t} in 2026`, 'Common pain points and misconceptions', 'Data points from recent studies'], estimatedLength: '300-400 words' },
      { section: 'Core Framework / Strategy', description: `Present the main framework or methodology for mastering ${t}. This is the heart of the content.`, keyPoints: ['Step-by-step process breakdown', 'Visual framework or diagram', 'Real-world application examples', 'Common pitfalls at each step', 'Pro tips for acceleration'], estimatedLength: '500-700 words' },
      { section: 'Case Studies & Proof Points', description: `Validate the framework with concrete examples and results from ${t} implementations.`, keyPoints: ['2-3 mini case studies with metrics', 'Before/after comparisons', 'Direct quotes or testimonials', 'Lessons learned from each example'], estimatedLength: '400-500 words' },
      { section: 'Advanced Tactics & Optimization', description: `Layer in expert-level strategies for those ready to take their ${t} to the next level.`, keyPoints: ['Advanced technique breakdowns', 'A/B testing recommendations', 'Tool stack recommendations', 'Automation opportunities', 'Scaling strategies'], estimatedLength: '350-450 words' },
      { section: 'Common Mistakes to Avoid', description: `Address the top pitfalls that derail ${t} efforts and how to prevent them.`, keyPoints: [`Top 5-7 mistakes in ${t}`, 'Why each mistake happens', 'How to identify if you\'re making them', 'Quick fixes and preventive measures'], estimatedLength: '250-350 words' },
      { section: 'Action Plan & Next Steps', description: `Give readers a clear, prioritized roadmap to implement what they\u2019ve learned about ${t}.`, keyPoints: ['30-60-90 day implementation plan', 'Quick wins (do this today)', 'Resources and tools needed', 'How to measure success'], estimatedLength: '200-300 words' },
      { section: 'Conclusion & CTA', description: `Reinforce the key message and drive the reader toward the next action.`, keyPoints: ['Summary of key takeaways', 'Emotional reinforcement of the opportunity', 'Primary CTA (newsletter, product, consultation)', 'Secondary CTA (share, comment, bookmark)'], estimatedLength: '100-150 words' },
    ],
    'Video Script': [
      { section: 'Cold Open / Hook', description: `The first 3 seconds must stop the scroll. Use a bold claim, question, or visual about ${t}.`, keyPoints: ['Pattern interrupt statement', 'On-screen text hook', 'Visual hook element', 'Sound/music cue'], estimatedLength: '15-30 seconds' },
      { section: 'Context & Setup', description: `Quickly establish why the viewer should care about ${t} and what they\u2019ll learn.`, keyPoints: ['Credibility establishment', 'Problem framing', 'Promise statement', '"Stay until the end" retention hook'], estimatedLength: '30-45 seconds' },
      { section: 'Main Content Block 1', description: `First major insight or step in the ${t} breakdown.`, keyPoints: ['Key point with visual support', 'Example or demonstration', 'Transition hook to next section'], estimatedLength: '45-90 seconds' },
      { section: 'Main Content Block 2', description: `Second major insight \u2014 deepen the ${t} narrative with a twist or deeper layer.`, keyPoints: ['Surprising data or contrarian take', 'Screen recording or B-roll', 'Audience engagement prompt'], estimatedLength: '45-90 seconds' },
      { section: 'Main Content Block 3', description: `Third insight or the climax of the ${t} story arc.`, keyPoints: ['Most valuable or shocking point', 'Results/proof demonstration', 'Emotional peak moment'], estimatedLength: '45-90 seconds' },
      { section: 'Recap & CTA', description: `Summarize the value delivered and direct viewers to take action.`, keyPoints: ['Quick recap of 3 main points', 'Clear CTA (follow, link, comment)', 'Teaser for next video', 'End screen elements'], estimatedLength: '15-30 seconds' },
    ],
    'Carousel': [
      { section: 'Slide 1: Cover Hook', description: `Bold, scroll-stopping title slide about ${t} with a visual hook.`, keyPoints: ['Headline: max 8 words', 'Subheadline with benefit', 'Eye-catching visual/color', 'Brand logo placement'], estimatedLength: '1 slide' },
      { section: 'Slide 2: Problem Statement', description: `Frame the pain point that makes ${t} relevant to your audience.`, keyPoints: ['Relatable problem description', 'Statistic or data point', 'Visual metaphor'], estimatedLength: '1 slide' },
      { section: 'Slides 3-7: Core Content', description: `5 key insights, tips, or steps related to ${t} \u2014 one per slide.`, keyPoints: ['One idea per slide', 'Visual + text balance', 'Numbered progression', 'Consistent design system', 'Icons or illustrations for each point'], estimatedLength: '5 slides' },
      { section: 'Slide 8: Summary / Recap', description: `Quick visual summary of all key points about ${t}.`, keyPoints: ['Bullet point recap', 'Clean visual hierarchy', 'Reinforcement of value'], estimatedLength: '1 slide' },
      { section: 'Slide 9: Social Proof', description: `Add credibility with results, testimonials, or data about ${t}.`, keyPoints: ['Metric or testimonial', 'Before/after visual', 'Trust signals'], estimatedLength: '1 slide' },
      { section: 'Slide 10: CTA Slide', description: `Drive action with a clear next step.`, keyPoints: ['Save + Share prompt', 'Follow CTA', 'Link to resource or bio', 'Engagement question'], estimatedLength: '1 slide' },
    ],
  };

  // Default outline for types not specifically mapped
  const defaultOutline: OutlineSection[] = [
    { section: 'Opening Hook', description: `Start with a compelling entry point about ${t} that grabs attention immediately.`, keyPoints: ['Attention-grabbing opening', `Why ${t} matters now`, 'Audience relevance statement', 'Content promise'], estimatedLength: '100-150 words' },
    { section: 'Context & Background', description: `Establish the landscape and foundational knowledge around ${t}.`, keyPoints: ['Current state of the industry', 'Key terminology defined', 'Historical context if relevant', 'Market data or trends'], estimatedLength: '200-300 words' },
    { section: 'Core Insight #1', description: `The first major takeaway or strategy related to ${t}.`, keyPoints: ['Primary insight with evidence', 'Step-by-step breakdown', 'Real-world example', 'Quick-win application'], estimatedLength: '300-400 words' },
    { section: 'Core Insight #2', description: `Second major teaching point that builds on the first.`, keyPoints: ['Deeper layer of strategy', 'Data-backed reasoning', 'Common objections addressed', 'Expert tip or hack'], estimatedLength: '300-400 words' },
    { section: 'Core Insight #3', description: `Third insight that brings the ${t} narrative to its peak value.`, keyPoints: ['Advanced or surprising angle', 'Case study or proof point', 'Actionable framework', 'Tool or resource recommendation'], estimatedLength: '300-400 words' },
    { section: 'Practical Application', description: `Show the audience exactly how to apply ${t} knowledge starting today.`, keyPoints: ['Implementation checklist', 'Template or framework', 'Timeline for results', 'Resource list'], estimatedLength: '200-300 words' },
    { section: 'Expert Perspectives', description: `Incorporate authoritative voices and social proof around ${t}.`, keyPoints: ['Expert quotes or insights', 'Industry benchmarks', 'Contrarian viewpoints', 'Future predictions'], estimatedLength: '200-250 words' },
    { section: 'Conclusion & Call to Action', description: `Wrap up with key takeaways and a clear next step for the audience.`, keyPoints: ['3-5 key takeaway bullets', 'Emotional closing statement', 'Primary CTA', 'Engagement prompt'], estimatedLength: '100-150 words' },
  ];

  const contentOutline = outlineTemplates[contentType] || defaultOutline;

  // --- SEO Guidance ---
  const topicSlug = t.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const wordCountMap: Record<string, number> = {
    'Blog Post': 2500, 'Video Script': 1200, 'Carousel': 500, 'Twitter Thread': 800,
    'Newsletter': 1500, 'Case Study': 3000, 'Infographic': 600, 'Podcast Episode': 4000,
  };

  const secondaryKeywordsPool = [
    `${t} strategy`, `${t} tips`, `${t} best practices`, `${t} examples`,
    `${t} for beginners`, `how to ${t.toLowerCase()}`, `${t} tools`, `${t} framework`,
    `${t} trends 2026`, `${t} guide`, `${t} mistakes`, `${t} ROI`,
  ];

  const intentMap: Record<string, string> = {
    'Brand Awareness': 'Informational \u2014 user wants to learn and understand the topic broadly',
    'Lead Generation': 'Commercial Investigation \u2014 user is comparing options and evaluating solutions',
    'Engagement': 'Informational / Navigational \u2014 user seeks shareable, discussion-worthy content',
    'Education': 'Informational \u2014 user wants comprehensive, structured learning content',
    'Sales Conversion': 'Transactional \u2014 user is ready to take action and needs final persuasion',
    'Community Building': 'Informational / Social \u2014 user seeks belonging and shared experiences',
  };

  const seoGuidance: SeoGuidance = {
    primaryKeyword: t.toLowerCase(),
    secondaryKeywords: secondaryKeywordsPool.sort(() => (seed % 3) - 1).slice(0, 6),
    searchIntent: intentMap[goal] || intentMap['Education'],
    targetWordCount: wordCountMap[contentType] || 2000,
    metaTitle: `${title} | PostCraft AI`,
    metaDescription: `Discover actionable ${t.toLowerCase()} strategies with our comprehensive ${contentType.toLowerCase()}. Data-driven insights, expert frameworks, and step-by-step implementation guides for ${audienceLevel.toLowerCase()}-level professionals.`,
  };

  // --- Creative Direction ---
  const visualStyles: Record<string, string> = {
    'Professional': 'Clean, corporate-modern aesthetic with structured layouts, sans-serif typography, and generous whitespace. Think Stripe or Linear design language.',
    'Casual': 'Warm, approachable design with rounded elements, playful illustrations, and conversational visual tone. Think Notion or Duolingo.',
    'Inspirational': 'Bold, aspirational imagery with hero shots, gradient overlays, and empowering typography. Think Nike or Apple campaign style.',
    'Data-Driven': 'Information-dense with charts, graphs, and data visualizations. Clean grid layouts with accent colors highlighting key metrics. Think Bloomberg or Statista.',
    'Storytelling': 'Cinematic feel with editorial photography, pull quotes, and narrative flow. Think longform journalism (NYT, The Atlantic) visual style.',
    'Provocative': 'High-contrast, bold typography with unexpected color combinations and disruptive layouts. Think Vice or unconventional startup branding.',
  };

  const colorPalettes: Record<string, string> = {
    'Professional': 'Primary: Navy (#1a237e) + White (#ffffff). Accent: Teal (#00897b). Neutral: Slate gray (#64748b).',
    'Casual': 'Primary: Coral (#ff6b6b) + Cream (#fef5e7). Accent: Sky blue (#74b9ff). Neutral: Warm gray (#9e9e9e).',
    'Inspirational': 'Primary: Deep purple (#6c5ce7) + Gold (#ffd93d). Accent: Sunset orange (#fd7272). Neutral: Charcoal (#2d3436).',
    'Data-Driven': 'Primary: Dark blue (#0d47a1) + Electric green (#00e676). Accent: Amber (#ffab00). Neutral: Cool gray (#78909c).',
    'Storytelling': 'Primary: Burgundy (#880e4f) + Ivory (#fffde7). Accent: Forest green (#2e7d32). Neutral: Taupe (#8d6e63).',
    'Provocative': 'Primary: Hot pink (#e91e63) + Black (#000000). Accent: Electric yellow (#eeff41). Neutral: White (#ffffff).',
  };

  const imageGuidanceMap: Record<string, string> = {
    'Blog Post': `Use 3-5 custom graphics: hero image, framework diagrams, data charts, and screenshot examples related to ${t}. Avoid generic stock photos.`,
    'Video Script': `B-roll should include screen recordings, talking head segments, and motion graphics explaining ${t} concepts. Thumbnail must feature face + bold text.`,
    'Carousel': `Each slide needs a consistent design template. Use icons, minimal text (max 30 words/slide), and a swipe-worthy progression about ${t}.`,
    'Twitter Thread': `Include 2-3 embedded images: a hook image for tweet 1, a data chart mid-thread, and a summary graphic for the final tweet about ${t}.`,
    'Newsletter': `Header image + 1-2 inline graphics. Keep email-safe (no videos). Use clear visual hierarchy with ${t} branding elements.`,
    'Case Study': `Before/after screenshots, metric dashboards, timeline graphics, and customer photos. Document the ${t} journey visually.`,
    'Infographic': `Single long-form vertical graphic with sections. Use icons, charts, and illustrated data points about ${t}. Optimized for Pinterest (2:3 ratio).`,
    'Podcast Episode': `Episode cover art, audiogram clips for social, and show notes header graphic. Consider a visual companion blog post for ${t} topics.`,
  };

  const creativeDirection: CreativeDirection = {
    visualStyle: visualStyles[tone],
    colorPalette: colorPalettes[tone],
    imageGuidance: imageGuidanceMap[contentType] || imageGuidanceMap['Blog Post'],
    videoDirection: contentType === 'Video Script' || contentType === 'Podcast Episode'
      ? `Shoot in ${tone === 'Professional' ? 'a clean studio or office setting' : tone === 'Casual' ? 'a natural, lived-in space with warm lighting' : 'a visually dynamic environment with intentional framing'}. Use ${tone === 'Data-Driven' ? 'screen recordings and data animations as primary B-roll' : 'a mix of talking head (60%) and B-roll (40%)'}. Pacing should match the ${tone.toLowerCase()} tone with ${tone === 'Provocative' ? 'fast cuts and dynamic transitions' : 'smooth, intentional transitions'}.`
      : `If repurposing to video: create a 60-90 second summary reel highlighting the top 3 insights from the ${contentType.toLowerCase()} about ${t}. Use text overlays and voiceover.`,
    toneExamples: [
      tone === 'Professional' ? `"Our analysis reveals three critical factors driving ${t} performance in 2026."` : tone === 'Casual' ? `"Okay so here's the thing about ${t} that nobody talks about..."` : `"What if everything you knew about ${t} was about to change?"`,
      tone === 'Data-Driven' ? `"The data is clear: companies investing in ${t} see a 47% increase in ROI within 6 months."` : tone === 'Storytelling' ? `"It was 3 AM when the notification came in. Our ${t} strategy had just gone viral."` : `"${t} isn't just a trend \u2014 it's the new standard for growth."`,
      `"Here's what separates the top 1% of ${t} practitioners from everyone else."`,
      `"Let me break down exactly how we used ${t} to achieve these results."`,
      `"If you're still ignoring ${t}, you're leaving serious results on the table."`,
    ],
  };

  // --- Distribution Plan ---
  const allPlatforms = ['Instagram', 'TikTok', 'Twitter/X', 'LinkedIn', 'YouTube', 'Facebook', 'Threads', 'Pinterest'];
  const distributionPlatforms = [platform, ...allPlatforms.filter(p => p !== platform)].slice(0, 5);

  const distributionFormats: Record<string, Record<string, string>> = {
    'Instagram': {
      'Blog Post': 'Carousel summarizing key points + Reel teaser',
      'Video Script': 'Reel (60-90s) + Story series with polls',
      'Carousel': 'Native carousel post (10 slides)',
      'Twitter Thread': 'Carousel adaptation + Stories',
      'Newsletter': 'Story series driving to bio link',
      'Case Study': 'Before/after carousel + Reel breakdown',
      'Infographic': 'Multi-slide carousel from infographic sections',
      'Podcast Episode': 'Audiogram Reel + quote graphics in Stories',
    },
    'TikTok': {
      'Blog Post': 'Talking head summary (60s) + text overlay',
      'Video Script': 'Full native video with trending sound',
      'Carousel': 'Photo mode carousel or slideshow video',
      'Twitter Thread': 'Green screen reading the thread with commentary',
      'Newsletter': 'Quick-hit video summarizing key insight',
      'Case Study': 'Story time format with results reveal',
      'Infographic': 'Animated slideshow with voiceover',
      'Podcast Episode': 'Best clip (30-60s) with captions',
    },
    'Twitter/X': {
      'Blog Post': 'Thread (8-12 tweets) + link in final tweet',
      'Video Script': 'Clip embed + thread breakdown',
      'Carousel': 'Thread with image per tweet',
      'Twitter Thread': 'Native thread (primary format)',
      'Newsletter': 'Key takeaway thread + subscribe CTA',
      'Case Study': 'Results thread with data screenshots',
      'Infographic': 'Image post + data thread',
      'Podcast Episode': 'Quote thread + episode link',
    },
    'LinkedIn': {
      'Blog Post': 'Long-form native post (1300 chars) + article',
      'Video Script': 'Native video upload + written companion post',
      'Carousel': 'PDF document upload (carousel format)',
      'Twitter Thread': 'Adapted long-form post',
      'Newsletter': 'LinkedIn Newsletter cross-post',
      'Case Study': 'Detailed post with metrics + PDF',
      'Infographic': 'Document post with commentary',
      'Podcast Episode': 'Key insight post + episode link in comments',
    },
    'YouTube': {
      'Blog Post': 'Video essay adaptation (8-15 min)',
      'Video Script': 'Full-length upload + Shorts clip',
      'Carousel': 'YouTube Short slideshow with narration',
      'Twitter Thread': 'Community post + Short',
      'Newsletter': 'Channel update / Community post',
      'Case Study': 'Full case study video (10-20 min)',
      'Infographic': 'Animated explainer Short',
      'Podcast Episode': 'Full episode upload + timestamps',
    },
    'Facebook': {
      'Blog Post': 'Link post with custom preview + native text post',
      'Video Script': 'Native video upload + Reel',
      'Carousel': 'Multi-image post or album',
      'Twitter Thread': 'Long-form text post adaptation',
      'Newsletter': 'Group post + Page post',
      'Case Study': 'Story post with link + Group discussion',
      'Infographic': 'Image post with description',
      'Podcast Episode': 'Audio clip post + discussion prompt',
    },
    'Threads': {
      'Blog Post': 'Thread-style breakdown (5-8 posts)',
      'Video Script': 'Text summary thread with key quotes',
      'Carousel': 'Image series with commentary',
      'Twitter Thread': 'Direct cross-post / adaptation',
      'Newsletter': 'Highlight thread with subscribe CTA',
      'Case Study': 'Results-focused thread',
      'Infographic': 'Image post with data callouts',
      'Podcast Episode': 'Quote highlights thread',
    },
    'Pinterest': {
      'Blog Post': '3-5 pin graphics linking to full post',
      'Video Script': 'Idea Pin with key frames',
      'Carousel': 'Multi-image Idea Pin',
      'Twitter Thread': 'Quote graphic pins',
      'Newsletter': 'Teaser pin linking to signup',
      'Case Study': 'Results infographic pin',
      'Infographic': 'Full infographic pin (primary format)',
      'Podcast Episode': 'Episode cover pin + quote pins',
    },
  };

  const timingMap: Record<string, string> = {
    'Instagram': 'Tue/Wed/Thu 11AM-1PM or 7PM-9PM (local time)',
    'TikTok': 'Tue-Thu 10AM-12PM or 7PM-10PM (peak discovery)',
    'Twitter/X': 'Mon-Fri 8AM-10AM or 12PM-1PM (business hours)',
    'LinkedIn': 'Tue-Thu 7AM-9AM or 12PM (B2B prime time)',
    'YouTube': 'Thu-Sat 2PM-4PM (algorithm indexing window)',
    'Facebook': 'Wed-Fri 1PM-4PM (peak engagement)',
    'Threads': 'Mon-Wed 9AM-11AM (early adopter activity)',
    'Pinterest': 'Sat-Sun 8PM-11PM (browsing peak)',
  };

  const hashtagSets: Record<string, string[]> = {
    'Instagram': [`#${topicSlug}`, '#contentcreator', '#digitalmarketing', '#socialmediatips', `#${topicSlug}tips`],
    'TikTok': [`#${topicSlug}`, '#learnontiktok', '#businesstok', '#marketingtips', '#fyp'],
    'Twitter/X': [`#${topicSlug}`, '#MarketingTwitter', '#ContentStrategy', '#GrowthHacking'],
    'LinkedIn': [`#${topicSlug}`, '#ContentMarketing', '#ThoughtLeadership', '#ProfessionalDevelopment'],
    'YouTube': [`${t} tutorial`, `${t} guide`, `how to ${t.toLowerCase()}`, `${t} 2026`],
    'Facebook': [`#${topicSlug}`, '#smallbusiness', '#marketing', '#tips'],
    'Threads': [`#${topicSlug}`, '#contentcreation', '#marketing', '#growth'],
    'Pinterest': [`${t}`, `${t} tips`, `${t} ideas`, `${t} guide`, `${t} strategy`],
  };

  const ctaMap: Record<string, string> = {
    'Instagram': `Save this for later and follow @yourbrand for more ${t} insights`,
    'TikTok': `Follow for part 2! Drop a comment if you want more ${t} content`,
    'Twitter/X': `Repost this if useful. Follow for daily ${t} insights`,
    'LinkedIn': `Agree? Disagree? Share your ${t} experience in the comments`,
    'YouTube': `Subscribe and hit the bell for weekly ${t} deep dives`,
    'Facebook': `Share this with someone who needs help with ${t}`,
    'Threads': `Follow for daily ${t} drops. What's your biggest challenge?`,
    'Pinterest': `Save this pin to your ${t} board for later reference`,
  };

  const distributionPlan: DistributionEntry[] = distributionPlatforms.map(p => ({
    platform: p,
    format: (distributionFormats[p] && distributionFormats[p][contentType]) || `Adapted ${contentType.toLowerCase()} format`,
    timing: timingMap[p] || 'Weekdays 10AM-2PM',
    hashtags: hashtagSets[p] || [`#${topicSlug}`, '#content', '#marketing'],
    cta: ctaMap[p] || `Check out more ${t} content on our profile`,
  }));

  // --- Success Metrics ---
  const successMetrics: SuccessMetric[] = [
    { metric: 'Reach / Impressions', target: goal === 'Brand Awareness' ? '50K+ impressions in first 7 days' : '10K+ impressions in first 7 days', measurementTool: `${platform} native analytics + Google Analytics UTM tracking` },
    { metric: 'Engagement Rate', target: platform === 'TikTok' ? '6-10% engagement rate' : platform === 'LinkedIn' ? '3-5% engagement rate' : '4-7% engagement rate', measurementTool: `${platform} Insights + PostCraft AI analytics dashboard` },
    { metric: 'Click-Through Rate (CTR)', target: goal === 'Lead Generation' ? '3-5% CTR on primary CTA' : '2-3% CTR on primary CTA', measurementTool: 'Bitly / UTM tracking + Google Analytics landing page data' },
    { metric: 'Saves / Bookmarks', target: platform === 'Instagram' ? '500+ saves (algorithmic boost signal)' : '200+ saves/bookmarks', measurementTool: `${platform} post insights \u2014 track save-to-impression ratio` },
    { metric: 'Shares / Reposts', target: '100+ shares within 48 hours of publishing', measurementTool: `${platform} analytics + social listening tools (Brandwatch, Sprout)` },
    { metric: 'Follower Growth', target: '+200-500 new followers attributed to this content piece', measurementTool: `${platform} follower analytics \u2014 compare pre/post publish counts` },
    { metric: 'Conversion / Lead Capture', target: goal === 'Sales Conversion' ? '50+ conversions within 14 days' : goal === 'Lead Generation' ? '150+ email sign-ups' : '25+ qualified leads', measurementTool: 'CRM (HubSpot, Salesforce) + landing page analytics + pixel tracking' },
    { metric: 'Content Lifespan', target: 'Sustained engagement for 30+ days (evergreen indicator)', measurementTool: 'Weekly performance tracking in analytics dashboard \u2014 monitor decay rate' },
  ];

  // --- References ---
  const references: Reference[] = [
    { type: 'Industry Report', description: `State of ${t} Report 2026 \u2014 comprehensive industry benchmarks and trends`, url: `https://example.com/state-of-${topicSlug}-2026` },
    { type: 'Competitor Analysis', description: `Top 10 ${t} examples from leading brands in your space`, url: `https://example.com/${topicSlug}-competitor-examples` },
    { type: 'Data Source', description: `${t} statistics and market research database`, url: `https://example.com/${topicSlug}-statistics` },
    { type: 'Style Reference', description: `Visual and tonal reference board for ${tone.toLowerCase()} ${contentType.toLowerCase()} content`, url: `https://example.com/${topicSlug}-style-guide` },
    { type: 'SEO Research', description: `Keyword research and SERP analysis for "${t}" cluster`, url: `https://example.com/${topicSlug}-seo-research` },
  ];

  // --- Checklist ---
  const checklist: ChecklistItem[] = [
    { item: `Research: Complete competitive analysis of top 5 ${t} content pieces`, priority: 'High' },
    { item: `Outline: Review and approve content outline with stakeholders`, priority: 'High' },
    { item: `SEO: Validate primary keyword "${t.toLowerCase()}" search volume and difficulty`, priority: 'High' },
    { item: `Draft: Write first draft following the approved outline and tone guidelines`, priority: 'High' },
    { item: `Visuals: Create or source all required images, graphics, and media assets`, priority: 'High' },
    { item: `Review: Internal review for accuracy, brand voice, and ${tone.toLowerCase()} tone consistency`, priority: 'Medium' },
    { item: `SEO: Add meta title, meta description, alt tags, and internal links`, priority: 'Medium' },
    { item: `Edit: Proofread for grammar, clarity, and readability (target Flesch score: 60+)`, priority: 'Medium' },
    { item: `Distribution: Prepare platform-specific adaptations for all ${distributionPlan.length} channels`, priority: 'Medium' },
    { item: `Schedule: Set publishing time and queue all distribution posts`, priority: 'Medium' },
    { item: `Tracking: Set up UTM parameters and conversion tracking for all links`, priority: 'Medium' },
    { item: `Legal: Verify all claims, citations, and image usage rights`, priority: 'Low' },
    { item: `Accessibility: Add captions, alt text, and ensure color contrast compliance`, priority: 'Low' },
    { item: `Archive: Save final assets to content library for future repurposing`, priority: 'Low' },
  ];

  return {
    briefOverview,
    contentOutline,
    seoGuidance,
    creativeDirection,
    distributionPlan,
    successMetrics,
    references,
    checklist,
  };
}

export default function ContentBriefPage() {
  const [topic, setTopic] = useState('');
  const [contentType, setContentType] = useState<string>('Blog Post');
  const [platform, setPlatform] = useState<string>('Instagram');
  const [goal, setGoal] = useState<string>('Brand Awareness');
  const [tone, setTone] = useState<string>('Professional');
  const [audienceLevel, setAudienceLevel] = useState<string>('Intermediate');
  const [result, setResult] = useState<ContentBriefResult | null>(null);

  const handleGenerate = () => {
    if (!topic.trim()) return;
    setResult(generateContentBrief(topic, contentType, platform, goal, tone, audienceLevel));
  };

  const getPriorityColor = (priority: string) => {
    if (priority === 'High') return 'text-red-400 bg-red-500/10 border-red-500/30';
    if (priority === 'Medium') return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
    return 'text-green-400 bg-green-500/10 border-green-500/30';
  };

  return (
    <main className="min-h-screen bg-zinc-950 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Content Brief Generator</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Generate comprehensive content briefs in seconds. SEO guidance, creative direction, distribution plans, and success metrics — all AI-powered.</p>

        {/* Input: Topic */}
        <div className="mb-4">
          <label className="block text-sm text-zinc-400 mb-1">Content Topic</label>
          <input
            type="text"
            value={topic}
            onChange={e => setTopic(e.target.value)}
            placeholder="e.g. AI-Powered Content Marketing"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600"
          />
        </div>

        {/* Inputs: Selects Row 1 */}
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Content Type</label>
            <select value={contentType} onChange={e => setContentType(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {contentTypes.map(ct => <option key={ct}>{ct}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Target Platform</label>
            <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {platforms.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Goal</label>
            <select value={goal} onChange={e => setGoal(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {goals.map(g => <option key={g}>{g}</option>)}
            </select>
          </div>
        </div>

        {/* Inputs: Selects Row 2 */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Tone</label>
            <select value={tone} onChange={e => setTone(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {tones.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Audience Level</label>
            <select value={audienceLevel} onChange={e => setAudienceLevel(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {audienceLevels.map(a => <option key={a}>{a}</option>)}
            </select>
          </div>
        </div>

        {/* Generate Button */}
        <button onClick={handleGenerate} className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition">
          Generate Content Brief
        </button>

        {/* Results */}
        {result && (
          <div className="mt-10 space-y-6">

            {/* Brief Overview */}
            <div className="bg-zinc-900 border border-violet-500/30 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Brief Overview</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Title</p>
                  <p className="text-xl font-semibold text-violet-300">{result.briefOverview.title}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Objective</p>
                    <p className="text-sm text-zinc-300">{result.briefOverview.objective}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Target Audience</p>
                    <p className="text-sm text-zinc-300">{result.briefOverview.targetAudience}</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Key Message</p>
                    <p className="text-sm text-zinc-300 italic">{result.briefOverview.keyMessage}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Unique Angle</p>
                    <p className="text-sm text-zinc-300">{result.briefOverview.uniqueAngle}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Deadline</p>
                  <p className="text-sm text-violet-400 font-medium">{result.briefOverview.deadline}</p>
                </div>
              </div>
            </div>

            {/* Content Outline */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Content Outline</h2>
              <div className="space-y-4">
                {result.contentOutline.map((section, i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-violet-400 bg-violet-500/10 border border-violet-500/30 rounded-full w-7 h-7 flex items-center justify-center">{i + 1}</span>
                        <h3 className="text-base font-semibold text-white">{section.section}</h3>
                      </div>
                      <span className="text-xs text-zinc-500 bg-zinc-700/50 px-2 py-1 rounded">{section.estimatedLength}</span>
                    </div>
                    <p className="text-sm text-zinc-400 mb-3 ml-10">{section.description}</p>
                    <div className="ml-10 flex flex-wrap gap-2">
                      {section.keyPoints.map((point, j) => (
                        <span key={j} className="text-xs text-zinc-300 bg-zinc-700/50 px-2.5 py-1 rounded-full border border-zinc-600/50">{point}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SEO Guidance */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">SEO Guidance</h2>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-zinc-800/50 rounded-lg p-4">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Primary Keyword</p>
                  <p className="text-lg font-semibold text-violet-300">{result.seoGuidance.primaryKeyword}</p>
                </div>
                <div className="bg-zinc-800/50 rounded-lg p-4">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Target Word Count</p>
                  <p className="text-lg font-semibold text-white">{result.seoGuidance.targetWordCount.toLocaleString()} words</p>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Secondary Keywords</p>
                <div className="flex flex-wrap gap-2">
                  {result.seoGuidance.secondaryKeywords.map((kw, i) => (
                    <span key={i} className="text-xs text-violet-300 bg-violet-500/10 border border-violet-500/30 px-3 py-1.5 rounded-full">{kw}</span>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Search Intent</p>
                <p className="text-sm text-zinc-300">{result.seoGuidance.searchIntent}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-zinc-800/50 rounded-lg p-4">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Meta Title</p>
                  <p className="text-sm text-zinc-300">{result.seoGuidance.metaTitle}</p>
                  <p className="text-xs text-zinc-600 mt-1">{result.seoGuidance.metaTitle.length}/60 characters</p>
                </div>
                <div className="bg-zinc-800/50 rounded-lg p-4">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Meta Description</p>
                  <p className="text-sm text-zinc-300">{result.seoGuidance.metaDescription}</p>
                  <p className="text-xs text-zinc-600 mt-1">{result.seoGuidance.metaDescription.length}/160 characters</p>
                </div>
              </div>
            </div>

            {/* Creative Direction */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Creative Direction</h2>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-zinc-800/50 rounded-lg p-4">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Visual Style</p>
                  <p className="text-sm text-zinc-300">{result.creativeDirection.visualStyle}</p>
                </div>
                <div className="bg-zinc-800/50 rounded-lg p-4">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Color Palette</p>
                  <p className="text-sm text-zinc-300">{result.creativeDirection.colorPalette}</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-zinc-800/50 rounded-lg p-4">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Image Guidance</p>
                  <p className="text-sm text-zinc-300">{result.creativeDirection.imageGuidance}</p>
                </div>
                <div className="bg-zinc-800/50 rounded-lg p-4">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Video Direction</p>
                  <p className="text-sm text-zinc-300">{result.creativeDirection.videoDirection}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Tone Examples</p>
                <div className="space-y-2">
                  {result.creativeDirection.toneExamples.map((example, i) => (
                    <div key={i} className="bg-zinc-800/50 rounded-lg p-3 border-l-2 border-violet-500">
                      <p className="text-sm text-zinc-300 italic">{example}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Distribution Plan */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Distribution Plan</h2>
              <div className="space-y-4">
                {result.distributionPlan.map((dist, i) => (
                  <div key={i} className={`bg-zinc-800/50 rounded-lg p-4 border ${i === 0 ? 'border-violet-500/40' : 'border-zinc-700/50'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-base font-semibold text-white flex items-center gap-2">
                        {i === 0 && <span className="text-xs bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full border border-violet-500/30">Primary</span>}
                        {dist.platform}
                      </h3>
                      <span className="text-xs text-zinc-500">{dist.timing}</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3 mb-3">
                      <div>
                        <p className="text-xs text-zinc-500 mb-1">Format</p>
                        <p className="text-sm text-zinc-300">{dist.format}</p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500 mb-1">CTA</p>
                        <p className="text-sm text-zinc-300 italic">{dist.cta}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 mb-1">Hashtags</p>
                      <div className="flex flex-wrap gap-1.5">
                        {dist.hashtags.map((tag, j) => (
                          <span key={j} className="text-xs text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Success Metrics */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Success Metrics</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {result.successMetrics.map((sm, i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
                    <p className="text-sm font-semibold text-white mb-1">{sm.metric}</p>
                    <p className="text-sm text-violet-300 font-medium mb-2">{sm.target}</p>
                    <p className="text-xs text-zinc-500">{sm.measurementTool}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* References */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">References & Resources</h2>
              <div className="space-y-3">
                {result.references.map((ref, i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-lg p-4 flex items-start gap-4 border border-zinc-700/50">
                    <span className="text-xs font-bold text-violet-400 bg-violet-500/10 border border-violet-500/30 rounded px-2 py-1 whitespace-nowrap">{ref.type}</span>
                    <div className="flex-1">
                      <p className="text-sm text-zinc-300">{ref.description}</p>
                      <p className="text-xs text-purple-400 mt-1 truncate">{ref.url}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Checklist */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Production Checklist</h2>
              <div className="space-y-2">
                {result.checklist.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-zinc-800/50 rounded-lg px-4 py-3 border border-zinc-700/50">
                    <div className="w-5 h-5 rounded border-2 border-zinc-600 flex-shrink-0" />
                    <p className="text-sm text-zinc-300 flex-1">{item.item}</p>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${getPriorityColor(item.priority)}`}>{item.priority}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
    </main>
  );
}
