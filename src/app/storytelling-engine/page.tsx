'use client';
import { useState } from 'react';

const storyGoals = ['Brand Awareness', 'Product Launch', 'Thought Leadership', 'Community Building', 'Customer Education', 'Crisis Communication', 'Recruitment', 'Fundraising'] as const;
const platforms = ['LinkedIn', 'Instagram', 'Twitter/X', 'TikTok', 'YouTube', 'Facebook', 'Newsletter', 'All Platforms'] as const;
const narrativeStyles = ['Hero Journey', 'Before/After', 'Problem-Solution', 'Behind the Scenes', 'Data-Driven', 'Emotional Arc', 'Contrast/Comparison', 'Serial/Episodic'] as const;
const audienceLevels = ['C-Suite', 'Manager/Director', 'Individual Contributor', 'Startup Founder', 'Student/Learner', 'General Consumer', 'Technical Expert', 'Creative Professional'] as const;
const contentLengths = ['Micro (< 100 words)', 'Short (100-300 words)', 'Medium (300-800 words)', 'Long (800-2000 words)', 'Epic (2000+ words)'] as const;

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }

function pick<T>(arr: T[], h: number, offset = 0): T { return arr[(h + offset) % arr.length]; }

function scoreColor(n: number): string {
  if (n >= 80) return '#34d399';
  if (n >= 60) return '#a3e635';
  if (n >= 40) return '#fbbf24';
  return '#f87171';
}

interface StoryBlueprint {
  title: string;
  hook: string;
  conflictPoint: string;
  climax: string;
  resolution: string;
  cta: string;
  emotionalArc: string;
  wordCount: number;
}

interface NarrativeArc {
  phase: string;
  content: string;
  purpose: string;
  timing: string;
  emotionalIntensity: number;
}

interface PlatformAdaptation {
  platform: string;
  format: string;
  characterLimit: number;
  adaptedHook: string;
  adaptedCta: string;
  bestTime: string;
  hashtags: string[];
}

interface StoryElement {
  element: string;
  description: string;
  example: string;
  impact: string;
}

interface EngagementPrediction {
  predictedReach: number;
  engagementRate: number;
  shareability: number;
  emotionalResonance: number;
  memorability: number;
}

interface ContentVariant {
  variant: string;
  angle: string;
  openingLine: string;
  tone: string;
  targetEmotion: string;
}

interface StorytellingResult {
  blueprint: StoryBlueprint;
  narrativeArcs: NarrativeArc[];
  platformAdaptations: PlatformAdaptation[];
  storyElements: StoryElement[];
  engagement: EngagementPrediction;
  contentVariants: ContentVariant[];
  serialPlan: string[];
  powerPhrases: string[];
}

function generateStorytelling(
  brandTopic: string, storyGoal: string, platform: string, narrativeStyle: string,
  audienceLevel: string, contentLength: string
): StorytellingResult {
  const b = brandTopic;
  const h = hash(b + storyGoal + platform + narrativeStyle + audienceLevel + contentLength);
  const h2 = hash(b + narrativeStyle + audienceLevel);
  const h3 = hash(storyGoal + platform + contentLength);
  const h4 = hash(b + platform);
  const h5 = hash(b + storyGoal);

  const wordCounts: Record<string, number> = {
    'Micro (< 100 words)': 75 + (h % 25),
    'Short (100-300 words)': 150 + (h % 150),
    'Medium (300-800 words)': 400 + (h % 400),
    'Long (800-2000 words)': 900 + (h % 1100),
    'Epic (2000+ words)': 2200 + (h % 1800),
  };

  const hookBank = [
    `What if everything you knew about ${b} was holding you back?`,
    `In 2024, a small team discovered something about ${b} that changed their entire trajectory.`,
    `Most people approach ${b} completely wrong. Here's what the top 1% do differently.`,
    `The moment I realized ${b} could transform everything was the moment I almost gave up.`,
    `"This can't be real." That was my first reaction when I saw what ${b} could actually do.`,
    `There's a hidden pattern in ${b} that separates the amateurs from the legends.`,
    `I spent 3 years studying ${b}. The truth shocked me more than I expected.`,
    `Behind every successful ${b} story, there's a moment of doubt nobody talks about.`,
    `What happens when you combine ${b} with an unconventional strategy? Pure magic.`,
    `The ${b} revolution isn't coming — it's already here, and most people are missing it.`,
  ];

  const conflictBank = [
    `The real challenge isn't understanding ${b} — it's overcoming the fear of doing it differently. Most ${audienceLevel.toLowerCase()} professionals hit a wall when conventional wisdom stops working.`,
    `Every ${audienceLevel.toLowerCase()} in the ${b} space faces the same dilemma: follow the crowd or forge a new path. The data says one thing, but instinct says another.`,
    `The tension between what ${b} promises and what it delivers creates a gap. That gap is where the real story begins — and where most people give up.`,
    `When ${storyGoal.toLowerCase()} meets reality, the conflict is inevitable. The old playbook for ${b} no longer works in today's landscape.`,
    `The biggest obstacle in ${b} isn't external competition — it's internal resistance to change. And that resistance has a cost most ${audienceLevel.toLowerCase()} leaders can't afford.`,
  ];

  const climaxBank = [
    `The breakthrough came when we stopped treating ${b} as a tactic and started treating it as a narrative. The shift from transactional to transformational changed everything.`,
    `Here's the insight that unlocked everything: ${b} isn't about perfection — it's about resonance. When you tell stories that mirror your audience's inner world, magic happens.`,
    `The data was clear. Teams that embraced ${b} with a storytelling-first approach saw 3.7x higher engagement and 2.1x better conversion. But the real win? Loyalty that money can't buy.`,
    `The moment of clarity: every piece of ${b} content should answer one question — "Why should I care?" When we reframed everything through that lens, the results were extraordinary.`,
    `We discovered that the ${narrativeStyle.toLowerCase()} approach to ${b} created a compound effect. Each story built on the last, creating a narrative momentum that competitors couldn't replicate.`,
  ];

  const resolutionBank = [
    `By implementing this storytelling framework for ${b}, teams consistently achieve ${storyGoal.toLowerCase()} outcomes that exceed projections. The key is consistency, authenticity, and strategic narrative design.`,
    `The transformation isn't overnight — but it's inevitable. When ${b} content is driven by genuine stories rather than marketing speak, ${audienceLevel.toLowerCase()} audiences respond with trust, loyalty, and action.`,
    `What started as an experiment with ${b} became a movement. The ${narrativeStyle.toLowerCase()} approach doesn't just achieve ${storyGoal.toLowerCase()} — it creates advocates who carry your story forward.`,
    `The resolution is clear: ${b} thrives when it's human, specific, and emotionally intelligent. The brands that win aren't the loudest — they're the ones that tell the truest stories.`,
  ];

  const ctaBank = [
    `Ready to transform your ${b} narrative? Start with one story this week. Make it real, make it specific, make it matter.`,
    `Your next step: take the ${narrativeStyle.toLowerCase()} framework and apply it to your biggest ${b} challenge. Share the result — the community wants to hear your story.`,
    `Don't just consume this — act on it. Pick one ${b} story from your experience and craft it using these principles. Tag us when you publish.`,
    `The world needs more authentic ${b} stories. Yours could be the one that inspires a thousand others. Start today.`,
    `Save this blueprint. Share it with your team. And when you're ready to take your ${b} storytelling to the next level, you know where to find us.`,
  ];

  const emotionalArcBank = [
    `Curiosity → Tension → Surprise → Empowerment → Resolve`,
    `Skepticism → Recognition → Revelation → Excitement → Commitment`,
    `Comfort → Disruption → Struggle → Breakthrough → Transformation`,
    `Intrigue → Concern → Discovery → Relief → Inspiration`,
    `Wonder → Challenge → Doubt → Clarity → Determination`,
    `Familiarity → Shock → Adaptation → Mastery → Advocacy`,
  ];

  const blueprint: StoryBlueprint = {
    title: pick([
      `The ${b} Transformation: A ${narrativeStyle} Narrative`,
      `How ${b} Rewrites the Rules of ${storyGoal}`,
      `The Untold Story of ${b}: From Challenge to Triumph`,
      `${b} Decoded: The ${narrativeStyle} That Changes Everything`,
      `Beyond the Surface: The ${b} Story Nobody Expected`,
      `The ${b} Blueprint: A ${audienceLevel} Guide to ${storyGoal}`,
    ], h, 0),
    hook: pick(hookBank, h, 1),
    conflictPoint: pick(conflictBank, h2, 0),
    climax: pick(climaxBank, h3, 0),
    resolution: pick(resolutionBank, h, 3),
    cta: pick(ctaBank, h2, 2),
    emotionalArc: pick(emotionalArcBank, h, 5),
    wordCount: wordCounts[contentLength] || 500,
  };

  // Narrative Arcs
  const arcPhases = [
    { phase: 'Opening Hook', purpose: 'Capture attention and create immediate curiosity', intensityBase: 7 },
    { phase: 'Context Setting', purpose: 'Establish the world, stakes, and relatable scenario', intensityBase: 4 },
    { phase: 'Rising Tension', purpose: 'Introduce the core conflict and build emotional investment', intensityBase: 6 },
    { phase: 'Climax / Revelation', purpose: 'Deliver the key insight or transformation moment', intensityBase: 9 },
    { phase: 'Resolution & Proof', purpose: 'Show the outcome, provide evidence, and satisfy the narrative promise', intensityBase: 7 },
    { phase: 'Call to Action', purpose: 'Channel emotional momentum into a specific next step', intensityBase: 8 },
  ];

  const arcContents: Record<string, string[]> = {
    'Hero Journey': [
      `Open in the "ordinary world" of ${b}. Your ${audienceLevel.toLowerCase()} audience should see themselves in this moment — the daily grind, the familiar challenges.`,
      `Introduce the call to adventure: a new approach to ${b} that challenges everything they thought they knew. Plant the seed of doubt about the status quo.`,
      `The hero (your audience) crosses the threshold. Show the trials of implementing ${b} differently — the skeptics, the setbacks, the moments of doubt that test commitment.`,
      `The supreme ordeal: the moment when everything about ${b} crystallizes. Use a specific data point, story, or revelation that proves the new approach works.`,
      `The hero returns transformed. Show the tangible results of the ${b} journey — metrics, testimonials, before/after comparisons that validate the transformation.`,
      `Send the hero forward with the elixir: actionable ${b} steps they can implement immediately for ${storyGoal.toLowerCase()}.`,
    ],
    'Before/After': [
      `Paint a vivid "before" picture of ${b}. Make the pain palpable — missed opportunities, wasted resources, frustration that every ${audienceLevel.toLowerCase()} has felt.`,
      `Establish exactly what was broken about the old approach to ${b}. Use specific numbers, timelines, and scenarios your audience recognizes.`,
      `Build the transition moment — the catalyst that forced a change in the ${b} strategy. This is where tension peaks and change becomes inevitable.`,
      `Reveal the "after" in its full glory. Show the ${b} transformation with specifics: numbers, emotions, outcomes that feel almost too good to be true (but are real).`,
      `Provide the proof layer — testimonials, data, case studies that confirm the ${b} transformation is repeatable and scalable.`,
      `Bridge from their current "before" to their potential "after" with a clear ${storyGoal.toLowerCase()} action step.`,
    ],
    'Problem-Solution': [
      `Hit the pain point immediately: the #1 ${b} challenge that keeps ${audienceLevel.toLowerCase()} professionals up at night. Make them feel seen.`,
      `Agitate the problem — show the cascading effects of not solving this ${b} challenge. Every day of inaction costs more than they think.`,
      `Introduce the solution framework for ${b}. Don't reveal everything yet — create a "lean in" moment where they need to keep reading.`,
      `The full solution reveal: the ${narrativeStyle.toLowerCase()} approach to ${b} that solves the core problem. Be specific, actionable, and generous with value.`,
      `Stack the proof: show how this ${b} solution has worked across different contexts, industries, and scales. Anticipate and address objections.`,
      `Simplify the next step: here's exactly how to start solving your ${b} challenge today for ${storyGoal.toLowerCase()}.`,
    ],
    'Behind the Scenes': [
      `Pull back the curtain on ${b} with an unexpected, raw moment. Vulnerability is your hook — show what nobody usually sees.`,
      `Set the scene: the real environment, the real challenges, the unfiltered reality of working on ${b} at the ${audienceLevel.toLowerCase()} level.`,
      `Share the messy middle — the failures, the pivots, the 2 AM moments that shaped the ${b} strategy. Authenticity beats perfection.`,
      `The breakthrough moment caught in real-time. Show the actual process of discovering what works for ${b} — including the wrong turns.`,
      `Connect the behind-the-scenes journey to the polished result your audience sees. Bridge the gap between process and outcome.`,
      `Invite them behind your curtain: share how they can apply this raw, authentic approach to their own ${b} story.`,
    ],
    'Data-Driven': [
      `Lead with a shocking statistic about ${b} that challenges conventional wisdom. Numbers hook analytical ${audienceLevel.toLowerCase()} minds instantly.`,
      `Build the data landscape: establish the key metrics, benchmarks, and trends that frame the ${b} conversation for ${storyGoal.toLowerCase()}.`,
      `Introduce the data anomaly — the unexpected finding that changes how we understand ${b}. This is your "wait, what?" moment.`,
      `The deep analysis: break down what the ${b} data actually means. Translate numbers into narrative, insights into implications.`,
      `Present the predictive model: based on the data, here's where ${b} is headed and what ${audienceLevel.toLowerCase()} professionals need to prepare for.`,
      `Data-to-action bridge: convert the ${b} insights into specific, measurable steps for ${storyGoal.toLowerCase()}.`,
    ],
    'Emotional Arc': [
      `Start with a universal emotion that every ${audienceLevel.toLowerCase()} feels about ${b}. Tap into something deeply human and relatable.`,
      `Deepen the emotional connection: share a specific story or moment that captures the emotional truth of the ${b} experience.`,
      `Escalate the emotional stakes — what's really at risk when ${b} goes wrong? Move beyond business metrics to human impact.`,
      `The emotional climax: the moment of catharsis, triumph, or revelation that transforms how they feel about ${b} forever.`,
      `Channel the emotion into meaning: what does this ${b} story teach us about ourselves, our work, and our potential?`,
      `Close with emotional resonance: a call to action that feels like an invitation, not a demand. ${storyGoal} through shared humanity.`,
    ],
    'Contrast/Comparison': [
      `Present two worlds: the way most people approach ${b} vs. the way the most successful ${audienceLevel.toLowerCase()} professionals do it.`,
      `Deepen the contrast — show specific examples, metrics, and outcomes that make the difference impossible to ignore.`,
      `Escalate: reveal why the gap between the two approaches to ${b} is widening, and what that means for ${storyGoal.toLowerCase()}.`,
      `The decisive comparison: lay out the evidence side-by-side. Make the superior approach to ${b} undeniable.`,
      `Show the path from one side to the other — it's not a leap, it's a series of intentional shifts that any ${audienceLevel.toLowerCase()} can make.`,
      `Choose your side: a compelling CTA that frames the decision as obvious for anyone serious about ${b} and ${storyGoal.toLowerCase()}.`,
    ],
    'Serial/Episodic': [
      `Episode hook: open with a cliffhanger or provocative question about ${b} that demands continuation. This is part of a bigger story.`,
      `Recap and recontextualize: quickly orient the audience in the ${b} narrative, then introduce the new wrinkle or revelation.`,
      `This episode's central conflict: a specific ${b} challenge that escalates the overall story arc and deepens engagement.`,
      `The episode climax: deliver a satisfying but incomplete answer about ${b}. Resolve one thread while opening another.`,
      `Plant the seeds for next time: introduce a question, tease, or revelation about ${b} that makes the next installment unmissable.`,
      `Episode-specific CTA: engage the audience in the ongoing ${b} narrative — ask predictions, invite stories, build community around ${storyGoal.toLowerCase()}.`,
    ],
  };

  const selectedArcContents = arcContents[narrativeStyle] || arcContents['Hero Journey'];
  const timingLabels = ['0-10%', '10-25%', '25-50%', '50-70%', '70-85%', '85-100%'];

  const narrativeArcs: NarrativeArc[] = arcPhases.map((ap, i) => ({
    phase: ap.phase,
    content: selectedArcContents[i],
    purpose: ap.purpose,
    timing: timingLabels[i],
    emotionalIntensity: Math.min(10, Math.max(1, ap.intensityBase + (hash(b + ap.phase) % 3) - 1)),
  }));

  // Platform Adaptations
  const allPlatforms = ['LinkedIn', 'Instagram', 'Twitter/X', 'TikTok', 'YouTube', 'Facebook', 'Newsletter'];
  const platformData: Record<string, { format: string; charLimit: number; bestTime: string }> = {
    'LinkedIn': { format: 'Long-form post or document carousel', charLimit: 3000, bestTime: 'Tue-Thu, 8-10 AM' },
    'Instagram': { format: 'Carousel (10 slides) or Reel', charLimit: 2200, bestTime: 'Mon/Wed/Fri, 11 AM-1 PM' },
    'Twitter/X': { format: 'Thread (6-12 tweets) or single tweet', charLimit: 280, bestTime: 'Tue-Thu, 9 AM or 5 PM' },
    'TikTok': { format: 'Short-form video (60-90 sec)', charLimit: 4000, bestTime: 'Tue/Thu/Sat, 7-9 PM' },
    'YouTube': { format: 'Short (60s) or long-form (8-15 min)', charLimit: 5000, bestTime: 'Fri-Sun, 2-4 PM' },
    'Facebook': { format: 'Video post or story series', charLimit: 63206, bestTime: 'Wed-Fri, 1-4 PM' },
    'Newsletter': { format: 'Long-form essay with sections', charLimit: 10000, bestTime: 'Tue/Thu, 6-8 AM' },
  };

  const hookAdaptations: Record<string, (topic: string) => string> = {
    'LinkedIn': (t) => pick([
      `I spent 6 months studying ${t}. Here are the 7 insights that changed my perspective (thread):`,
      `Unpopular opinion about ${t}: most ${audienceLevel.toLowerCase()} professionals are overthinking this.`,
      `The ${t} playbook that helped us achieve ${storyGoal.toLowerCase()}. Saving this could save you months.`,
    ], h4, 0),
    'Instagram': (t) => pick([
      `Swipe to see the ${t} framework that's changing the game for ${audienceLevel.toLowerCase()} pros -->`,
      `POV: You just discovered the ${t} secret nobody's sharing. Save this.`,
      `The ${t} truth bomb you need today (slide 4 will surprise you)`,
    ], h4, 1),
    'Twitter/X': (t) => pick([
      `${t} is misunderstood. Here's what 99% get wrong (and how to fix it):`,
      `Hot take: ${t} doesn't work the way most people think.`,
      `A thread on ${t} that I wish someone wrote 5 years ago:`,
    ], h4, 2),
    'TikTok': (t) => pick([
      `Wait for it... this ${t} hack is going to blow your mind`,
      `POV: You're about to learn the ${t} secret that changed everything for me`,
      `Storytime: How ${t} taught me the most valuable lesson of my career`,
    ], h4, 3),
    'YouTube': (t) => pick([
      `In this video, I'm breaking down the ${t} strategy that nobody talks about`,
      `${t}: The Complete Guide (everything you need in ${contentLength.toLowerCase().replace(/[()]/g, '')})`,
      `I tested every ${t} strategy so you don't have to. Here are the results.`,
    ], h4, 4),
    'Facebook': (t) => pick([
      `I need to share something about ${t} that completely changed my approach...`,
      `Can we talk about ${t}? Because what I just discovered changes everything.`,
      `My ${t} journey: from clueless to confident (with receipts)`,
    ], h4, 5),
    'Newsletter': (t) => pick([
      `This week's deep dive: The ${t} framework that Fortune 500 companies don't want you to know`,
      `Dear reader, if ${t} is on your radar, this edition will change how you think about it`,
      `Inside: The ${t} playbook — research, frameworks, and actionable steps for ${storyGoal.toLowerCase()}`,
    ], h4, 6),
  };

  const ctaAdaptations: Record<string, string> = {
    'LinkedIn': `If this resonated, repost to help your network. Follow for more ${b} insights every week.`,
    'Instagram': `Save this for later. Drop a "${pick(['fire', 'mindblown', 'yes', 'facts'], h5, 0)}" in the comments if this hit different. Link in bio for the full framework.`,
    'Twitter/X': `RT if this changed how you think about ${b}. Follow for daily threads on ${storyGoal.toLowerCase()}.`,
    'TikTok': `Follow for Part 2. Comment "STORY" and I'll send you the full ${b} blueprint.`,
    'YouTube': `Smash subscribe if this was valuable. The next video goes even deeper into ${b}.`,
    'Facebook': `Share this with someone who needs to hear it. Join our community for weekly ${b} insights.`,
    'Newsletter': `Forward this to a colleague who's working on ${b}. Reply with your biggest takeaway — I read every response.`,
  };

  const hashtagBank: Record<string, string[]> = {
    'LinkedIn': [`#${b.replace(/\s/g, '')}`, '#Leadership', '#BusinessStrategy', '#ProfessionalGrowth', `#${storyGoal.replace(/\s/g, '')}`, '#ContentStrategy'],
    'Instagram': [`#${b.replace(/\s/g, '')}`, '#ContentCreator', '#DigitalMarketing', '#GrowthMindset', `#${storyGoal.replace(/\s/g, '')}`, '#Storytelling', '#MarketingTips', '#BrandBuilding'],
    'Twitter/X': [`#${b.replace(/\s/g, '')}`, '#Thread', `#${storyGoal.replace(/\s/g, '')}`, '#Marketing'],
    'TikTok': [`#${b.replace(/\s/g, '')}`, '#LearnOnTikTok', '#BusinessTok', '#StorytimeBusiness', `#${storyGoal.replace(/\s/g, '')}`, '#Viral'],
    'YouTube': [`#${b.replace(/\s/g, '')}`, '#HowTo', `#${storyGoal.replace(/\s/g, '')}`, '#Strategy', '#Tutorial'],
    'Facebook': [`#${b.replace(/\s/g, '')}`, '#BusinessTips', `#${storyGoal.replace(/\s/g, '')}`, '#Entrepreneurship'],
    'Newsletter': [],
  };

  const selectedPlatforms = platform === 'All Platforms' ? allPlatforms : [platform];
  const platformAdaptations: PlatformAdaptation[] = selectedPlatforms.map(p => {
    const pd = platformData[p] || platformData['LinkedIn'];
    const hookFn = hookAdaptations[p] || hookAdaptations['LinkedIn'];
    return {
      platform: p,
      format: pd.format,
      characterLimit: pd.charLimit,
      adaptedHook: hookFn(b),
      adaptedCta: ctaAdaptations[p] || ctaAdaptations['LinkedIn'],
      bestTime: pd.bestTime,
      hashtags: hashtagBank[p] || [],
    };
  });

  // Story Elements
  const storyElements: StoryElement[] = [
    {
      element: 'The Protagonist',
      description: `Your ${audienceLevel.toLowerCase()} audience member who faces the core ${b} challenge. They must see themselves in this character.`,
      example: `"Meet Sarah, a ${audienceLevel.toLowerCase()} who was drowning in ${b} complexity until she discovered a simpler path."`,
      impact: 'Creates immediate identification and emotional investment — viewers stay 2.3x longer when they see themselves in the story.',
    },
    {
      element: 'The Stakes',
      description: `What's at risk if ${b} goes wrong? Emotional stakes > logical stakes for memorability.`,
      example: `"Every day without a clear ${b} strategy costs more than money — it costs credibility, momentum, and team morale."`,
      impact: 'Stakes create urgency. Content with clear stakes sees 67% higher save rates and 41% more shares.',
    },
    {
      element: 'The Unexpected Turn',
      description: `The moment in your ${b} narrative where assumptions are challenged and the audience is genuinely surprised.`,
      example: `"We assumed more ${b} content meant more results. The data showed the opposite — less content, better stories, 3x the impact."`,
      impact: 'Pattern interrupts spike attention by 89%. The unexpected turn is the most shared moment in any story.',
    },
    {
      element: 'The Specific Detail',
      description: `Concrete, vivid details that make the ${b} story feel real and credible rather than generic.`,
      example: `"It was 11:47 PM on a Tuesday when the ${b} dashboard showed numbers we'd never seen before — a 340% spike."`,
      impact: 'Specificity builds trust. Stories with concrete details are rated 2.8x more credible than abstract claims.',
    },
    {
      element: 'The Emotional Bridge',
      description: `The moment that connects ${b} logic to human emotion, making the story resonate on a deeper level.`,
      example: `"This isn't just about ${b} metrics. It's about the feeling of knowing your work actually matters."`,
      impact: 'Emotional content is shared 3x more than purely informational content. This is your viral catalyst.',
    },
    {
      element: 'The Callback',
      description: `Reference the opening hook later in the ${b} narrative to create satisfying closure and narrative coherence.`,
      example: `"Remember when I said everything you knew about ${b} was wrong? Now you see exactly what I meant."`,
      impact: 'Callbacks increase content completion rates by 34% and make the story feel intentionally crafted.',
    },
  ];

  // Engagement Prediction
  const goalMod: Record<string, number> = {
    'Brand Awareness': 12, 'Product Launch': 8, 'Thought Leadership': 15, 'Community Building': 10,
    'Customer Education': 6, 'Crisis Communication': 4, 'Recruitment': 7, 'Fundraising': 5,
  };
  const platMod: Record<string, number> = {
    'LinkedIn': 10, 'Instagram': 14, 'Twitter/X': 8, 'TikTok': 18,
    'YouTube': 12, 'Facebook': 6, 'Newsletter': 9, 'All Platforms': 11,
  };
  const styleMod: Record<string, number> = {
    'Hero Journey': 14, 'Before/After': 12, 'Problem-Solution': 10, 'Behind the Scenes': 16,
    'Data-Driven': 8, 'Emotional Arc': 15, 'Contrast/Comparison': 9, 'Serial/Episodic': 13,
  };

  const baseScore = 40 + (h % 15);
  const gm = goalMod[storyGoal] || 8;
  const pm = platMod[platform] || 10;
  const sm = styleMod[narrativeStyle] || 10;

  const clamp = (v: number) => Math.min(97, Math.max(22, v));
  const engagement: EngagementPrediction = {
    predictedReach: clamp(baseScore + pm + (h % 10)),
    engagementRate: clamp(baseScore + gm + ((h2 % 12) - 4)),
    shareability: clamp(baseScore + sm + ((h3 % 10) - 3)),
    emotionalResonance: clamp(baseScore + sm + gm - 10 + (h4 % 8)),
    memorability: clamp(baseScore + sm + ((h5 % 14) - 5)),
  };

  // Content Variants
  const variantData: { variant: string; angles: string[]; tones: string[]; emotions: string[]; openings: string[] }[] = [
    {
      variant: 'The Authority',
      angles: [`Position ${b} as the definitive expert take — back every claim with proof`, `Lead with proprietary data on ${b} that nobody else has`, `Frame ${b} through the lens of hard-won experience and battle-tested wisdom`],
      tones: ['Confident & Direct', 'Authoritative & Generous', 'Bold & Evidence-Based'],
      emotions: ['Trust', 'Respect', 'Admiration'],
      openings: [
        `After 10,000 hours in ${b}, here's what I know for certain:`,
        `The ${b} landscape has shifted. Here's exactly what's changed and why it matters:`,
        `Let me share the ${b} framework that's been tested across 50+ use cases:`,
      ],
    },
    {
      variant: 'The Rebel',
      angles: [`Challenge every ${b} convention — be the contrarian voice that speaks truth`, `Expose the ${b} myths that are costing people real results`, `Take the opposite stance on ${b} from what everyone else is saying`],
      tones: ['Provocative & Honest', 'Contrarian & Energetic', 'Raw & Unfiltered'],
      emotions: ['Shock', 'Curiosity', 'Excitement'],
      openings: [
        `Everything the ${b} industry tells you is designed to keep you dependent. Here's the truth:`,
        `Unpopular opinion: the conventional approach to ${b} is actively hurting your results.`,
        `I'm going to say what nobody in ${b} wants to hear:`,
      ],
    },
    {
      variant: 'The Storyteller',
      angles: [`Wrap ${b} insights inside a compelling personal narrative`, `Use a client/user story to illustrate the ${b} transformation`, `Create a cinematic, story-first approach to ${b} content`],
      tones: ['Warm & Narrative', 'Conversational & Vivid', 'Intimate & Engaging'],
      emotions: ['Empathy', 'Connection', 'Inspiration'],
      openings: [
        `It was 3 AM and I was staring at my ${b} dashboard, wondering if any of this would work...`,
        `She walked into our office with a ${b} problem that everyone said was unsolvable. 90 days later:`,
        `The moment I almost gave up on ${b} was the moment everything changed. Here's that story:`,
      ],
    },
    {
      variant: 'The Educator',
      angles: [`Break ${b} into a step-by-step framework anyone can follow`, `Create the definitive tutorial on ${b} for ${audienceLevel.toLowerCase()} audiences`, `Simplify ${b} complexity into clear, actionable lessons`],
      tones: ['Clear & Structured', 'Patient & Thorough', 'Encouraging & Practical'],
      emotions: ['Empowerment', 'Clarity', 'Confidence'],
      openings: [
        `${b} doesn't have to be complicated. Here's the 5-step framework:`,
        `A ${audienceLevel.toLowerCase()}'s guide to ${b}: everything I wish someone told me on day one.`,
        `Let me break down ${b} in a way that actually makes sense (with real examples):`,
      ],
    },
  ];

  const contentVariants: ContentVariant[] = variantData.map((v, i) => ({
    variant: v.variant,
    angle: pick(v.angles, h + i, 0),
    openingLine: pick(v.openings, h2 + i, 0),
    tone: pick(v.tones, h3 + i, 0),
    targetEmotion: pick(v.emotions, h4 + i, 0),
  }));

  // Serial Plan
  const serialPlan: string[] = [
    `Episode 1: "The ${b} Problem Nobody Talks About" — Introduce the core tension and establish why ${audienceLevel.toLowerCase()} professionals need to pay attention. End with a cliffhanger question.`,
    `Episode 2: "What I Discovered About ${b}" — Share the research, the data, the unexpected findings. Build credibility and deepen the narrative. Tease the framework.`,
    `Episode 3: "The ${b} Framework Revealed" — Deliver the main value: the step-by-step methodology for ${storyGoal.toLowerCase()}. This is your pillar episode — make it the most shareable.`,
    `Episode 4: "Real Results: ${b} in Action" — Case studies, testimonials, before/after proof. Show the framework working in real scenarios for ${audienceLevel.toLowerCase()} audiences.`,
    `Episode 5: "The Future of ${b}" — Predictions, advanced strategies, and a call to join the movement. Create FOMO for those who haven't engaged and reward loyal followers.`,
  ];

  // Power Phrases
  const powerPhraseBank = [
    `"The ${b} revolution isn't coming — it's already here."`,
    `"What got you here won't get you there. Especially with ${b}."`,
    `"The gap between good and great in ${b} is smaller than you think — but it matters more than you realize."`,
    `"Stop optimizing for vanity metrics. Start optimizing for ${storyGoal.toLowerCase()} that actually compounds."`,
    `"Every ${audienceLevel.toLowerCase()} who masters ${b} storytelling gains an unfair advantage."`,
    `"The best ${b} content doesn't feel like content. It feels like a conversation you didn't want to end."`,
    `"In a world of ${b} noise, the signal is always a better story."`,
    `"Your audience doesn't need more ${b} information. They need a ${b} transformation."`,
    `"The ROI of authentic ${b} storytelling can't be measured in clicks alone."`,
    `"Most ${b} strategies fail not because of bad tactics — but because of missing narrative."`,
    `"The future belongs to ${audienceLevel.toLowerCase()} professionals who can turn ${b} data into ${b} stories."`,
    `"Don't just tell your ${b} story. Make your audience the hero of it."`,
  ];

  const powerPhrases: string[] = [];
  const usedIdx = new Set<number>();
  for (let i = 0; i < 8; i++) {
    let idx = (h + i * 3) % powerPhraseBank.length;
    while (usedIdx.has(idx)) idx = (idx + 1) % powerPhraseBank.length;
    usedIdx.add(idx);
    powerPhrases.push(powerPhraseBank[idx]);
  }

  return { blueprint, narrativeArcs, platformAdaptations, storyElements, engagement, contentVariants, serialPlan, powerPhrases };
}

export default function StorytellingEnginePage() {
  const [brandTopic, setBrandTopic] = useState('');
  const [storyGoal, setStoryGoal] = useState<string>('Brand Awareness');
  const [platform, setPlatform] = useState<string>('LinkedIn');
  const [narrativeStyle, setNarrativeStyle] = useState<string>('Hero Journey');
  const [audienceLevel, setAudienceLevel] = useState<string>('Startup Founder');
  const [contentLength, setContentLength] = useState<string>('Medium (300-800 words)');
  const [result, setResult] = useState<StorytellingResult | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleGenerate = () => {
    if (!brandTopic.trim()) return;
    setResult(generateStorytelling(brandTopic.trim(), storyGoal, platform, narrativeStyle, audienceLevel, contentLength));
  };

  const copyPhrase = (phrase: string, idx: number) => {
    navigator.clipboard.writeText(phrase);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  const intensityBar = (val: number) => {
    const color = val >= 8 ? 'bg-fuchsia-500' : val >= 6 ? 'bg-violet-500' : val >= 4 ? 'bg-indigo-500' : 'bg-zinc-600';
    return (
      <div className="flex items-center gap-2">
        <div className="w-28 h-2.5 bg-zinc-800 rounded-full overflow-hidden">
          <div className={`h-full rounded-full ${color}`} style={{ width: `${val * 10}%` }} />
        </div>
        <span className="text-xs text-zinc-400">{val}/10</span>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-zinc-950 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">AI Storytelling Engine</h1>
        <p className="text-zinc-400 mb-8 max-w-3xl">Transform any brand message into compelling multi-platform narratives. Generate <strong className="text-white">story blueprints, narrative arcs, platform-specific adaptations, and engagement predictions</strong> — all from a single topic.</p>

        {/* Form */}
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Brand / Topic</label>
            <input type="text" value={brandTopic} onChange={e => setBrandTopic(e.target.value)} placeholder="e.g., sustainable fashion, AI productivity" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600" />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Story Goal</label>
            <select value={storyGoal} onChange={e => setStoryGoal(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {storyGoals.map(g => <option key={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Platform</label>
            <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {platforms.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Narrative Style</label>
            <select value={narrativeStyle} onChange={e => setNarrativeStyle(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {narrativeStyles.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Audience Level</label>
            <select value={audienceLevel} onChange={e => setAudienceLevel(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {audienceLevels.map(a => <option key={a}>{a}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Content Length</label>
            <select value={contentLength} onChange={e => setContentLength(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {contentLengths.map(l => <option key={l}>{l}</option>)}
            </select>
          </div>
        </div>

        <button onClick={handleGenerate} className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition">
          Generate Story Blueprint
        </button>

        {result && (
          <div className="mt-10 space-y-6">

            {/* Story Blueprint */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-1">{result.blueprint.title}</h2>
              <div className="flex flex-wrap gap-2 text-xs mb-4">
                <span className="px-2 py-1 rounded-full bg-violet-600/20 text-violet-300">{narrativeStyle}</span>
                <span className="px-2 py-1 rounded-full bg-fuchsia-600/20 text-fuchsia-300">{storyGoal}</span>
                <span className="px-2 py-1 rounded-full bg-indigo-600/20 text-indigo-300">{platform}</span>
                <span className="px-2 py-1 rounded-full bg-zinc-700 text-zinc-300">~{result.blueprint.wordCount} words</span>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-violet-400 mb-1">Hook</h3>
                  <p className="text-zinc-300 text-sm leading-relaxed">{result.blueprint.hook}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-amber-400 mb-1">Conflict Point</h3>
                  <p className="text-zinc-300 text-sm leading-relaxed">{result.blueprint.conflictPoint}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-fuchsia-400 mb-1">Climax</h3>
                  <p className="text-zinc-300 text-sm leading-relaxed">{result.blueprint.climax}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-green-400 mb-1">Resolution</h3>
                  <p className="text-zinc-300 text-sm leading-relaxed">{result.blueprint.resolution}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-cyan-400 mb-1">Call to Action</h3>
                  <p className="text-zinc-300 text-sm leading-relaxed">{result.blueprint.cta}</p>
                </div>
                <div className="pt-2 border-t border-zinc-800">
                  <h3 className="text-sm font-semibold text-zinc-500 mb-1">Emotional Arc</h3>
                  <p className="text-zinc-400 text-sm italic">{result.blueprint.emotionalArc}</p>
                </div>
              </div>
            </div>

            {/* Narrative Arc Timeline */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Narrative Arc Timeline</h2>
              <div className="space-y-4">
                {result.narrativeArcs.map((arc, i) => (
                  <div key={i} className="border border-zinc-800 rounded-lg p-4 hover:border-zinc-700 transition">
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded">{arc.timing}</span>
                        <h3 className="text-sm font-semibold text-white">{arc.phase}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-zinc-500">Intensity:</span>
                        {intensityBar(arc.emotionalIntensity)}
                      </div>
                    </div>
                    <p className="text-zinc-300 text-sm leading-relaxed mb-1">{arc.content}</p>
                    <p className="text-zinc-500 text-xs italic">Purpose: {arc.purpose}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Adaptations */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Platform Adaptations</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {result.platformAdaptations.map((pa, i) => (
                  <div key={i} className="border border-zinc-800 rounded-lg p-4 hover:border-violet-500/30 transition">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-bold text-white">{pa.platform}</h3>
                      <span className="text-xs text-zinc-500">{pa.characterLimit.toLocaleString()} chars</span>
                    </div>
                    <p className="text-xs text-zinc-500 mb-2">Format: <span className="text-zinc-400">{pa.format}</span></p>
                    <p className="text-xs text-zinc-500 mb-1">Best posting time: <span className="text-emerald-400">{pa.bestTime}</span></p>
                    <div className="mt-3">
                      <p className="text-xs font-semibold text-violet-400 mb-1">Adapted Hook</p>
                      <p className="text-zinc-300 text-sm leading-relaxed">{pa.adaptedHook}</p>
                    </div>
                    <div className="mt-2">
                      <p className="text-xs font-semibold text-fuchsia-400 mb-1">Adapted CTA</p>
                      <p className="text-zinc-400 text-sm">{pa.adaptedCta}</p>
                    </div>
                    {pa.hashtags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {pa.hashtags.map((tag, j) => (
                          <span key={j} className="text-xs px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Engagement Predictions */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Engagement Predictions</h2>
              <div className="space-y-3">
                {(Object.entries(result.engagement) as [string, number][]).map(([key, val]) => {
                  const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
                  return (
                    <div key={key} className="flex items-center gap-4">
                      <span className="text-sm text-zinc-400 w-48">{label}</span>
                      <div className="flex-1 h-4 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${val}%`, backgroundColor: scoreColor(val) }} />
                      </div>
                      <span className="text-sm font-bold w-12 text-right" style={{ color: scoreColor(val) }}>{val}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Story Elements */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Story Elements</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {result.storyElements.map((el, i) => (
                  <div key={i} className="border border-zinc-800 rounded-lg p-4">
                    <h3 className="text-sm font-bold text-white mb-1">{el.element}</h3>
                    <p className="text-zinc-400 text-sm mb-2">{el.description}</p>
                    <p className="text-zinc-300 text-sm italic border-l-2 border-violet-500/40 pl-3 mb-2">{el.example}</p>
                    <p className="text-xs text-emerald-400/80">{el.impact}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Variants */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Content Variants</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {result.contentVariants.map((cv, i) => (
                  <div key={i} className="border border-zinc-800 rounded-lg p-4 hover:border-fuchsia-500/30 transition">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-bold text-white">{cv.variant}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-fuchsia-600/20 text-fuchsia-300">{cv.targetEmotion}</span>
                    </div>
                    <p className="text-xs text-zinc-500 mb-1">Tone: <span className="text-zinc-400">{cv.tone}</span></p>
                    <p className="text-zinc-400 text-sm mb-2">{cv.angle}</p>
                    <div className="bg-zinc-800/50 rounded p-2">
                      <p className="text-xs text-zinc-500 mb-0.5">Opening Line:</p>
                      <p className="text-zinc-300 text-sm italic">{cv.openingLine}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Serial Content Plan */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Serial Content Plan</h2>
              <div className="space-y-3">
                {result.serialPlan.map((ep, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center text-white text-sm font-bold">
                      {i + 1}
                    </div>
                    <p className="text-zinc-300 text-sm leading-relaxed pt-1">{ep}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Power Phrases */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Power Phrases</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {result.powerPhrases.map((phrase, i) => (
                  <div
                    key={i}
                    onClick={() => copyPhrase(phrase, i)}
                    className="border border-zinc-800 rounded-lg p-3 hover:border-violet-500/40 transition cursor-pointer group"
                  >
                    <p className="text-zinc-300 text-sm">{phrase}</p>
                    <p className="text-xs text-zinc-600 mt-1 group-hover:text-violet-400 transition">
                      {copiedIdx === i ? 'Copied!' : 'Click to copy'}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Box */}
            <div className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 rounded-xl p-6 text-center">
              <h3 className="text-lg font-bold text-white mb-2">Take Your Storytelling Further</h3>
              <p className="text-zinc-400 text-sm mb-4">Combine this blueprint with our other narrative tools for maximum impact.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="/story-arc" className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition">Story Arc Generator</a>
                <a href="/content-pillars" className="px-4 py-2 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-sm font-medium transition">Content Pillars</a>
                <a href="/hooks" className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition">Hook Generator</a>
              </div>
            </div>

          </div>
        )}
      </div>
    </main>
  );
}
