'use client';
import { useState } from 'react';

const industries = ['E-commerce/DTC', 'SaaS/Tech', 'Health & Wellness', 'Finance/Fintech', 'Education/Courses', 'Real Estate', 'Food & Restaurant', 'Fashion/Beauty', 'Travel/Hospitality', 'B2B Services', 'Agency/Consulting', 'Fitness/Sports', 'Entertainment/Media', 'Crypto/Web3'] as const;
const platforms = ['Instagram Reel', 'TikTok', 'YouTube Short', 'YouTube Long', 'LinkedIn Video', 'Twitter/X Thread', 'Podcast', 'Blog Post'] as const;
const durations = ['15 sec', '30 sec', '60 sec', '3 min', '5 min', '10 min', '15+ min'] as const;
const narrativeStyles = ['Hero\'s Journey', 'Problem-Solution', 'Listicle Flow', 'Suspense Build', 'Tutorial Arc', 'Before/After', 'Day-in-the-Life', 'Interview Format', 'Rant-to-Revelation', 'Myth Deconstruction'] as const;
const emotionalTargets = ['Inspired', 'Curious', 'Shocked', 'Empowered', 'Amused', 'Nostalgic', 'Urgency', 'Vulnerable'] as const;

interface StoryBeat {
  name: string;
  timing: string;
  percentage: string;
  description: string;
  emotionalIntensity: number;
  retentionPrediction: number;
  visualSuggestion: string;
}

interface PacingAnalysis {
  overallScore: number;
  pacingType: string;
  dropOffZones: { zone: string; risk: string; suggestion: string }[];
  transitions: string[];
}

interface ScriptSkeleton {
  openingHook: string;
  transitionPhrases: string[];
  closingCTA: string;
}

interface StoryArcResult {
  beats: StoryBeat[];
  pacing: PacingAnalysis;
  script: ScriptSkeleton;
  platformTips: string[];
  retentionCurve: { label: string; value: number }[];
  arcType: string;
  summary: string;
}

function getDurationSeconds(duration: string): number {
  const map: Record<string, number> = { '15 sec': 15, '30 sec': 30, '60 sec': 60, '3 min': 180, '5 min': 300, '10 min': 600, '15+ min': 900 };
  return map[duration] || 60;
}

function formatTime(seconds: number, totalSeconds: number): string {
  if (totalSeconds <= 60) return `${Math.round(seconds)} sec`;
  if (totalSeconds <= 300) return `${Math.floor(seconds / 60)}:${String(Math.round(seconds % 60)).padStart(2, '0')}`;
  return `${Math.floor(seconds / 60)} min ${Math.round(seconds % 60)}s`;
}

function generateStoryArc(
  topic: string, platform: string, duration: string, style: string, emotion: string, industry: string
): StoryArcResult {
  const totalSec = getDurationSeconds(duration);
  const isShort = totalSec <= 60;
  const isMedium = totalSec > 60 && totalSec <= 300;

  // Beat structures by narrative style
  const beatStructures: Record<string, { name: string; pctStart: number; pctEnd: number; intensityBase: number }[]> = {
    'Hero\'s Journey': [
      { name: 'The Hook (Ordinary World)', pctStart: 0, pctEnd: 8, intensityBase: 6 },
      { name: 'The Call to Adventure', pctStart: 8, pctEnd: 20, intensityBase: 7 },
      { name: 'Crossing the Threshold', pctStart: 20, pctEnd: 35, intensityBase: 5 },
      { name: 'Trials & Challenges', pctStart: 35, pctEnd: 55, intensityBase: 8 },
      { name: 'The Revelation (Climax)', pctStart: 55, pctEnd: 75, intensityBase: 10 },
      { name: 'The Transformation', pctStart: 75, pctEnd: 90, intensityBase: 7 },
      { name: 'Return with the Elixir (CTA)', pctStart: 90, pctEnd: 100, intensityBase: 8 },
    ],
    'Problem-Solution': [
      { name: 'Pain Point Hook', pctStart: 0, pctEnd: 10, intensityBase: 8 },
      { name: 'Agitate the Problem', pctStart: 10, pctEnd: 25, intensityBase: 9 },
      { name: 'Failed Attempts', pctStart: 25, pctEnd: 40, intensityBase: 6 },
      { name: 'The Breakthrough', pctStart: 40, pctEnd: 55, intensityBase: 10 },
      { name: 'Solution Breakdown', pctStart: 55, pctEnd: 80, intensityBase: 7 },
      { name: 'Proof / Results', pctStart: 80, pctEnd: 92, intensityBase: 8 },
      { name: 'Call to Action', pctStart: 92, pctEnd: 100, intensityBase: 7 },
    ],
    'Listicle Flow': [
      { name: 'Curiosity Hook', pctStart: 0, pctEnd: 10, intensityBase: 7 },
      { name: 'Item #1 (Strong Opener)', pctStart: 10, pctEnd: 25, intensityBase: 8 },
      { name: 'Item #2 (Build Momentum)', pctStart: 25, pctEnd: 40, intensityBase: 6 },
      { name: 'Item #3 (Surprise Entry)', pctStart: 40, pctEnd: 55, intensityBase: 9 },
      { name: 'Item #4 (Deep Dive)', pctStart: 55, pctEnd: 72, intensityBase: 7 },
      { name: 'Item #5 (Best for Last)', pctStart: 72, pctEnd: 90, intensityBase: 10 },
      { name: 'Recap + CTA', pctStart: 90, pctEnd: 100, intensityBase: 6 },
    ],
    'Suspense Build': [
      { name: 'Mystery Hook', pctStart: 0, pctEnd: 8, intensityBase: 8 },
      { name: 'Set the Scene', pctStart: 8, pctEnd: 20, intensityBase: 5 },
      { name: 'First Clue / Tension', pctStart: 20, pctEnd: 35, intensityBase: 7 },
      { name: 'Rising Stakes', pctStart: 35, pctEnd: 50, intensityBase: 8 },
      { name: 'False Peak / Misdirect', pctStart: 50, pctEnd: 65, intensityBase: 9 },
      { name: 'The Big Reveal', pctStart: 65, pctEnd: 85, intensityBase: 10 },
      { name: 'Aftermath + CTA', pctStart: 85, pctEnd: 100, intensityBase: 6 },
    ],
    'Tutorial Arc': [
      { name: 'Result Preview Hook', pctStart: 0, pctEnd: 10, intensityBase: 8 },
      { name: 'Context / Why This Matters', pctStart: 10, pctEnd: 20, intensityBase: 5 },
      { name: 'Step 1 — Foundation', pctStart: 20, pctEnd: 38, intensityBase: 6 },
      { name: 'Step 2 — Core Technique', pctStart: 38, pctEnd: 58, intensityBase: 7 },
      { name: 'Step 3 — Advanced Tip', pctStart: 58, pctEnd: 75, intensityBase: 9 },
      { name: 'Final Result Showcase', pctStart: 75, pctEnd: 90, intensityBase: 10 },
      { name: 'Next Steps + CTA', pctStart: 90, pctEnd: 100, intensityBase: 7 },
    ],
    'Before/After': [
      { name: 'Dramatic Contrast Hook', pctStart: 0, pctEnd: 10, intensityBase: 9 },
      { name: 'The "Before" State', pctStart: 10, pctEnd: 28, intensityBase: 6 },
      { name: 'The Turning Point', pctStart: 28, pctEnd: 42, intensityBase: 8 },
      { name: 'The Process / Journey', pctStart: 42, pctEnd: 60, intensityBase: 7 },
      { name: 'The "After" Reveal', pctStart: 60, pctEnd: 80, intensityBase: 10 },
      { name: 'Key Takeaway', pctStart: 80, pctEnd: 92, intensityBase: 7 },
      { name: 'Your Turn — CTA', pctStart: 92, pctEnd: 100, intensityBase: 8 },
    ],
    'Day-in-the-Life': [
      { name: 'Morning Hook / Teaser', pctStart: 0, pctEnd: 10, intensityBase: 7 },
      { name: 'Getting Started (Routine)', pctStart: 10, pctEnd: 25, intensityBase: 5 },
      { name: 'The Main Activity', pctStart: 25, pctEnd: 45, intensityBase: 7 },
      { name: 'Unexpected Moment', pctStart: 45, pctEnd: 60, intensityBase: 9 },
      { name: 'Peak of the Day', pctStart: 60, pctEnd: 78, intensityBase: 10 },
      { name: 'Wind Down / Reflection', pctStart: 78, pctEnd: 92, intensityBase: 6 },
      { name: 'Tomorrow Tease + CTA', pctStart: 92, pctEnd: 100, intensityBase: 7 },
    ],
    'Interview Format': [
      { name: 'Guest Intro Hook', pctStart: 0, pctEnd: 8, intensityBase: 7 },
      { name: 'Context / Credibility', pctStart: 8, pctEnd: 18, intensityBase: 5 },
      { name: 'First Key Question', pctStart: 18, pctEnd: 35, intensityBase: 7 },
      { name: 'Deep Dive / Story', pctStart: 35, pctEnd: 55, intensityBase: 8 },
      { name: 'Hot Take / Controversy', pctStart: 55, pctEnd: 72, intensityBase: 10 },
      { name: 'Rapid Fire / Fun', pctStart: 72, pctEnd: 88, intensityBase: 7 },
      { name: 'Key Takeaway + CTA', pctStart: 88, pctEnd: 100, intensityBase: 6 },
    ],
    'Rant-to-Revelation': [
      { name: 'Emotional Outburst Hook', pctStart: 0, pctEnd: 10, intensityBase: 10 },
      { name: 'The Rant (Frustration)', pctStart: 10, pctEnd: 28, intensityBase: 9 },
      { name: 'Evidence / Examples', pctStart: 28, pctEnd: 42, intensityBase: 7 },
      { name: 'The Pivot Moment', pctStart: 42, pctEnd: 55, intensityBase: 6 },
      { name: 'The Revelation', pctStart: 55, pctEnd: 75, intensityBase: 9 },
      { name: 'New Perspective', pctStart: 75, pctEnd: 90, intensityBase: 8 },
      { name: 'Invite Discussion + CTA', pctStart: 90, pctEnd: 100, intensityBase: 7 },
    ],
    'Myth Deconstruction': [
      { name: 'Bold Myth Statement', pctStart: 0, pctEnd: 10, intensityBase: 9 },
      { name: 'Why People Believe It', pctStart: 10, pctEnd: 25, intensityBase: 6 },
      { name: 'First Crack (Counter-Evidence)', pctStart: 25, pctEnd: 40, intensityBase: 8 },
      { name: 'The Full Debunk', pctStart: 40, pctEnd: 60, intensityBase: 10 },
      { name: 'What\'s Actually True', pctStart: 60, pctEnd: 78, intensityBase: 8 },
      { name: 'Real-World Proof', pctStart: 78, pctEnd: 92, intensityBase: 7 },
      { name: 'New Belief + CTA', pctStart: 92, pctEnd: 100, intensityBase: 7 },
    ],
  };

  const beats = beatStructures[style] || beatStructures['Problem-Solution'];

  // Emotional modifiers
  const emotionMod: Record<string, { hookBoost: number; climaxBoost: number; ctaBoost: number }> = {
    'Inspired': { hookBoost: 1, climaxBoost: 2, ctaBoost: 1 },
    'Curious': { hookBoost: 2, climaxBoost: 1, ctaBoost: 0 },
    'Shocked': { hookBoost: 2, climaxBoost: 2, ctaBoost: -1 },
    'Empowered': { hookBoost: 0, climaxBoost: 1, ctaBoost: 2 },
    'Amused': { hookBoost: 1, climaxBoost: 1, ctaBoost: 1 },
    'Nostalgic': { hookBoost: 1, climaxBoost: 0, ctaBoost: 1 },
    'Urgency': { hookBoost: 2, climaxBoost: 1, ctaBoost: 2 },
    'Vulnerable': { hookBoost: 0, climaxBoost: 2, ctaBoost: 0 },
  };
  const eMod = emotionMod[emotion] || { hookBoost: 1, climaxBoost: 1, ctaBoost: 1 };

  // Beat descriptions per style + emotion
  const hookDescriptions: Record<string, string[]> = {
    'Hero\'s Journey': [
      `Open with a relatable moment in the ${topic} space — the viewer should see themselves immediately.`,
      `Start in the "ordinary world" of ${topic}. Show the mundane reality before everything changes.`,
      `Paint the status quo of ${topic} that your audience lives in every day. Make it feel personal.`,
    ],
    'Problem-Solution': [
      `Hit them with the #1 pain point in ${topic}. Be specific — vague problems get scrolled past.`,
      `Start with a bold statement: "The biggest mistake in ${topic} is..." — then pause.`,
      `Show the painful "before" state that ${industry} professionals know too well.`,
    ],
    'Listicle Flow': [
      `"${Math.floor(Math.random() * 3) + 5} ${topic} secrets that changed everything for me" — set the count early.`,
      `Promise the list and tease the best item: "And #${Math.floor(Math.random() * 2) + 4} is the one nobody talks about."`,
      `Open with the total count and a bold claim about ${topic} to set curiosity.`,
    ],
    'Suspense Build': [
      `Start with the ending — a cryptic hint about what happened with ${topic}. Don't reveal it yet.`,
      `"Something happened in ${topic} that nobody expected..." — create an open loop immediately.`,
      `Drop a teaser visual or statement that makes zero sense without context. They HAVE to stay.`,
    ],
    'Tutorial Arc': [
      `Show the finished result FIRST. "Here's how to achieve this in ${topic}..." — proof drives watch-through.`,
      `"In the next ${duration}, you'll learn the exact ${topic} technique that took me months to figure out."`,
      `Flash the before/after of this ${topic} technique. The gap creates curiosity.`,
    ],
    'Before/After': [
      `Show the "after" result for 2 seconds. The contrast with "before" creates irresistible curiosity.`,
      `"This is what ${topic} looks like when you finally get it right." Flash the transformation.`,
      `Side-by-side preview: the old way vs. the new way of approaching ${topic}.`,
    ],
    'Day-in-the-Life': [
      `"5 AM. Here's what a real day in ${topic} actually looks like." — raw and unfiltered.`,
      `Start with the most interesting moment of the day, then rewind to the beginning.`,
      `"Most people think ${topic} is glamorous. Here's my actual Tuesday."`,
    ],
    'Interview Format': [
      `Lead with the most controversial or surprising quote from the interview about ${topic}.`,
      `"I asked a ${industry} expert the question everyone's afraid to ask about ${topic}..."`,
      `Clip the most jaw-dropping 3-second moment and put it first. Then go to the intro.`,
    ],
    'Rant-to-Revelation': [
      `"I'm tired of the ${topic} industry pretending that..." — channel genuine frustration.`,
      `Come in hot: "Nobody in ${industry} wants to hear this, but..." — raw emotion hooks.`,
      `Start mid-rant. No intro, no setup. Just pure energy about what's broken in ${topic}.`,
    ],
    'Myth Deconstruction': [
      `"Everyone in ${industry} says you need to [common advice]. They're wrong." — bold opener.`,
      `"The #1 ${topic} myth is costing you money every single day. Let me prove it."`,
      `State the myth as if it's a fact, pause, then say: "Actually, that's completely false."`,
    ],
  };

  const climaxDescriptions = [
    `This is your emotional peak — deliver the core insight about ${topic} with maximum impact. Slow down, change your tone, let it land.`,
    `The payoff moment. Everything has been building to this ${topic} revelation. Use silence or a pause before the key line.`,
    `Drop the biggest value bomb about ${topic} here. This is what they'll screenshot and share. Make it quotable.`,
    `The moment of maximum tension in your ${topic} story. The audience should be fully invested. Deliver the climax clearly.`,
  ];

  const ctaDescriptions = [
    `Drive action: "Follow for more ${topic} insights" or "Save this for later." Keep it natural, not salesy.`,
    `End with a question about ${topic} to drive comments: "What's your experience with this?" Discussion = algorithm fuel.`,
    `"If this changed how you think about ${topic}, share it with someone who needs to hear it." Social proof CTA.`,
    `Loop back to the hook — reframe the opening ${topic} statement with new context. Then ask for the follow.`,
  ];

  const visualTransitions = [
    'Hard cut with text overlay', 'Zoom transition + sound effect', 'B-roll montage',
    'Screen recording with voiceover', 'Face-to-camera switch', 'Split screen comparison',
    'Slow motion emphasis', 'Whip pan', 'Jump cut sequence', 'Text card interlude',
    'POV angle switch', 'Cinematic fade', 'Timelapse sequence', 'Green screen swap',
  ];

  const generatedBeats: StoryBeat[] = beats.map((beat, i) => {
    const startSec = Math.round((beat.pctStart / 100) * totalSec);
    const endSec = Math.round((beat.pctEnd / 100) * totalSec);

    let intensity = beat.intensityBase;
    if (i === 0) intensity = Math.min(10, intensity + eMod.hookBoost);
    if (beat.intensityBase >= 9) intensity = Math.min(10, intensity + eMod.climaxBoost);
    if (i === beats.length - 1) intensity = Math.min(10, Math.max(1, intensity + eMod.ctaBoost));
    intensity = Math.min(10, Math.max(1, intensity + Math.floor(Math.random() * 2) - 1));

    // Retention prediction
    const baseRetention = 100 - (beat.pctStart * 0.6) + (intensity * 2);
    const platformBonus = platform === 'TikTok' ? 5 : platform === 'Instagram Reel' ? 3 : platform === 'YouTube Short' ? 4 : 0;
    const retention = Math.min(100, Math.max(15, Math.round(baseRetention + platformBonus + (Math.random() * 6 - 3))));

    // Description
    let description = '';
    const styleHooks = hookDescriptions[style] || hookDescriptions['Problem-Solution'];
    if (i === 0) {
      description = styleHooks[Math.floor(Math.random() * styleHooks.length)];
    } else if (intensity >= 9) {
      description = climaxDescriptions[Math.floor(Math.random() * climaxDescriptions.length)];
    } else if (i === beats.length - 1) {
      description = ctaDescriptions[Math.floor(Math.random() * ctaDescriptions.length)];
    } else {
      const middleDescriptions = [
        `Build momentum on ${topic} — each sentence should raise the stakes slightly. Keep the energy ${intensity >= 7 ? 'high' : 'building'}.`,
        `This is the ${intensity >= 7 ? 'high-tension' : 'setup'} zone for ${topic}. ${intensity >= 7 ? 'Deliver value rapidly.' : 'Layer in context that makes the payoff stronger.'}`,
        `${beat.name} phase: create ${emotion.toLowerCase()} feelings by connecting ${topic} to the viewer's personal experience.`,
        `Transition smoothly — use a question or bold claim about ${topic} to maintain attention. The viewer should feel ${emotion.toLowerCase()}.`,
        `Reinforce the ${topic} narrative. ${intensity >= 7 ? 'Accelerate the pacing here — shorter sentences, quicker cuts.' : 'Take a beat to let previous points sink in before building again.'}`,
      ];
      description = middleDescriptions[Math.floor(Math.random() * middleDescriptions.length)];
    }

    return {
      name: beat.name,
      timing: `${formatTime(startSec, totalSec)} - ${formatTime(endSec, totalSec)}`,
      percentage: `${beat.pctStart}% - ${beat.pctEnd}%`,
      description,
      emotionalIntensity: intensity,
      retentionPrediction: retention,
      visualSuggestion: visualTransitions[Math.floor(Math.random() * visualTransitions.length)],
    };
  });

  // Pacing analysis
  const avgIntensity = generatedBeats.reduce((sum, b) => sum + b.emotionalIntensity, 0) / generatedBeats.length;
  const intensityVariance = generatedBeats.reduce((sum, b) => sum + Math.pow(b.emotionalIntensity - avgIntensity, 2), 0) / generatedBeats.length;
  const pacingType = avgIntensity >= 7.5 ? 'Fast & Intense' : avgIntensity >= 5.5 ? 'Medium & Balanced' : 'Slow & Atmospheric';

  const baseScore = 50 + Math.floor(avgIntensity * 3) + Math.floor(intensityVariance * 2);
  const styleBonus = ['Hero\'s Journey', 'Suspense Build', 'Rant-to-Revelation'].includes(style) ? 8 : 4;
  const emotionBonus = ['Shocked', 'Curious', 'Urgency'].includes(emotion) ? 6 : 3;
  const platformFit = isShort && ['TikTok', 'Instagram Reel', 'YouTube Short'].includes(platform) ? 8 : isMedium ? 5 : 3;
  const overallScore = Math.min(98, Math.max(35, Math.round(baseScore + styleBonus + emotionBonus + platformFit + (Math.random() * 6 - 3))));

  // Drop-off danger zones
  const dropOffZones: { zone: string; risk: string; suggestion: string }[] = [];
  generatedBeats.forEach((beat, i) => {
    if (i > 0 && i < generatedBeats.length - 1) {
      const prev = generatedBeats[i - 1];
      if (beat.emotionalIntensity < prev.emotionalIntensity - 2) {
        dropOffZones.push({
          zone: `${beat.percentage} (${beat.name})`,
          risk: `Intensity drops from ${prev.emotionalIntensity} to ${beat.emotionalIntensity} — viewers may lose interest`,
          suggestion: `Add a micro-hook or pattern interrupt here. Try a surprising fact, visual change, or direct address to camera about ${topic}.`,
        });
      }
      if (beat.retentionPrediction < 50) {
        dropOffZones.push({
          zone: `${beat.percentage} (${beat.name})`,
          risk: `Predicted retention falls below 50% — critical drop-off risk`,
          suggestion: `Shorten this section, add text overlays with key points, or insert a "wait for it..." teaser about what's coming next.`,
        });
      }
    }
  });
  if (dropOffZones.length === 0) {
    dropOffZones.push({
      zone: '25-40% (Mid-content)',
      risk: 'Standard mid-content dip — most content loses 10-20% of viewers here',
      suggestion: `Re-hook with a mini-cliffhanger: "But here's where ${topic} gets interesting..." — reset the curiosity loop.`,
    });
  }

  const transitionSuggestions = generatedBeats.slice(0, -1).map((beat, i) => {
    const next = generatedBeats[i + 1];
    const transitions = [
      `${beat.name} -> ${next.name}: Use a ${visualTransitions[Math.floor(Math.random() * visualTransitions.length)].toLowerCase()} to shift energy from ${beat.emotionalIntensity}/10 to ${next.emotionalIntensity}/10.`,
    ];
    return transitions[0];
  });

  // Script skeleton
  const openingHooks: Record<string, string[]> = {
    'Inspired': [
      `"What if I told you that ${topic} could completely transform your ${industry.toLowerCase()} game?"`,
      `"This one ${topic} strategy changed everything for me. And it can for you too."`,
    ],
    'Curious': [
      `"There's something about ${topic} that 99% of ${industry.toLowerCase()} people get completely wrong."`,
      `"I discovered a ${topic} secret that nobody in ${industry.toLowerCase()} is talking about."`,
    ],
    'Shocked': [
      `"I can't believe what I just found out about ${topic}. This changes everything."`,
      `"Stop everything. The ${topic} advice you've been following? It's been wrong this whole time."`,
    ],
    'Empowered': [
      `"You already have everything you need to master ${topic}. Let me show you how."`,
      `"After today, you'll never struggle with ${topic} again. Here's your blueprint."`,
    ],
    'Amused': [
      `"OK so ${topic} is getting ridiculous and we need to talk about it."`,
      `"The absolute state of ${topic} in ${industry.toLowerCase()} right now..."`,
    ],
    'Nostalgic': [
      `"Remember when ${topic} used to be simple? Here's what happened."`,
      `"3 years ago, ${topic} looked completely different. Let me take you back."`,
    ],
    'Urgency': [
      `"If you're not paying attention to ${topic} right now, you're already behind."`,
      `"${topic} is about to change forever. You have weeks to prepare."`,
    ],
    'Vulnerable': [
      `"I failed at ${topic} for 2 years before I finally figured it out. Here's my honest story."`,
      `"Nobody tells you how hard ${topic} actually is. Let me be real with you."`,
    ],
  };

  const hookOptions = openingHooks[emotion] || openingHooks['Curious'];
  const openingHook = hookOptions[Math.floor(Math.random() * hookOptions.length)];

  const transitionPhrases = [
    `"But here's where it gets interesting..."`,
    `"Now, most people stop here. Don't."`,
    `"And this is the part that changes everything about ${topic}..."`,
    `"Let me break this down step by step..."`,
    `"Here's what nobody tells you about this..."`,
    `"Watch what happens next..."`,
    `"The real secret? It's simpler than you think."`,
  ].sort(() => Math.random() - 0.5).slice(0, 3);

  const closingCTAs = [
    `"Save this for later and follow for more ${topic} breakdowns."`,
    `"If this shifted your perspective on ${topic}, share it with someone who needs to hear it."`,
    `"Drop a comment: what's your biggest ${topic} challenge? I'll answer every one."`,
    `"Follow for part 2 where I go even deeper into ${topic}."`,
    `"Link in bio for the full ${topic} guide. You don't want to miss this."`,
  ];
  const closingCTA = closingCTAs[Math.floor(Math.random() * closingCTAs.length)];

  // Platform-specific tips
  const platformTipsMap: Record<string, string[]> = {
    'Instagram Reel': [
      'Use on-screen text for the first 3 seconds — 40% of Reels are watched on mute.',
      'Keep aspect ratio at 9:16. Cover image should work as a standalone thumbnail.',
      `For ${topic} content, use 3-5 trending audio clips synced to your beat transitions.`,
      'Add a "Save for later" prompt mid-reel — saves boost algorithmic distribution by 3x.',
      'Use the caption for SEO: include 3-5 keywords related to ' + topic + '.',
    ],
    'TikTok': [
      'First frame must be visually arresting — TikTok users decide in 0.3 seconds.',
      `Loop potential: make the ending connect back to the start for ${topic} content.`,
      'Use TikTok native text and effects — the algorithm favors native editing tools.',
      'Post at peak hours (7-9 PM) and engage with comments in the first 30 minutes.',
      `For ${industry}, duet and stitch formats can 2x your reach on ${topic} topics.`,
    ],
    'YouTube Short': [
      'Title and description matter for YouTube search — optimize for "' + topic + '" keywords.',
      'First 2 seconds must hook — YouTube Shorts has a faster swipe rate than TikTok.',
      'End with a subscribe prompt — Shorts viewers convert to subscribers at 2x the rate of long-form.',
      `Vertical format only. Keep text in the safe zone — avoid edges for ${topic} overlays.`,
      'Cross-promote to your long-form channel in the comments.',
    ],
    'YouTube Long': [
      'Include a cold open (15-30 sec) before your intro — it reduces early bounce by 25%.',
      `For ${topic}, use chapters/timestamps in the description for SEO and viewer navigation.`,
      'Pattern interrupt every 2-3 minutes with a visual change, question, or angle shift.',
      'End screen should link to the most relevant next video about ' + topic + '.',
      'Thumbnail: use 3 words max, high contrast, and a face showing the target emotion: ' + emotion.toLowerCase() + '.',
      'Retention sweet spot: 8-15 minutes for ' + industry + ' content on ' + topic + '.',
    ],
    'LinkedIn Video': [
      'Square format (1:1) gets 78% more visibility in the LinkedIn feed than landscape.',
      `Open with a text hook before speaking — many LinkedIn users browse with sound off.`,
      `For ${industry} professionals, lead with a data point or contrarian take on ${topic}.`,
      'Keep to 1-3 minutes for maximum completion rate on LinkedIn.',
      'Add a strong first comment with a question to drive engagement in the algorithm.',
    ],
    'Twitter/X Thread': [
      'Tweet 1 must stand alone as a compelling hook about ' + topic + '. It does the heavy lifting.',
      'Use 7-12 tweets for optimal engagement. Each tweet should deliver standalone value.',
      'End with a "Repost if useful + follow for more" CTA — thread engagement lives on retweets.',
      `Space out key points about ${topic}: one idea per tweet, no walls of text.`,
      'Add a self-reply with additional context or a resource link to boost the thread.',
    ],
    'Podcast': [
      `Cold open with the most compelling 30-second clip about ${topic} from mid-episode.`,
      'Chapters every 5-10 minutes help podcast apps surface your content in search.',
      `For ${industry} audiences, guest credibility in the first 60 seconds is critical.`,
      'Create 3-5 "clip-worthy" moments designed for social media extraction.',
      'Show notes should include timestamps, links, and keyword-rich descriptions for ' + topic + '.',
    ],
    'Blog Post': [
      'H1 should include your primary keyword for ' + topic + '. Front-load the value proposition.',
      'Use the inverted pyramid: key insight first, supporting details after.',
      `For ${industry} readers, include data visualizations and original research on ${topic}.`,
      'Break content into scannable sections with H2s every 200-300 words.',
      'Add a table of contents for posts over 1,500 words. Internal link to 3-5 related tools.',
      'Include a "Key Takeaways" box at the top for skimmers.',
    ],
  };

  const platformTips = platformTipsMap[platform] || platformTipsMap['Instagram Reel'];

  // Retention curve
  const retentionCurve = generatedBeats.map(b => ({
    label: b.name.length > 18 ? b.name.substring(0, 18) + '...' : b.name,
    value: b.retentionPrediction,
  }));

  // Arc type naming
  const arcNames = [
    `The ${emotion} ${style.replace("'s", '')} Arc`,
    `${style} — ${emotion} Variant`,
    `${industry} ${style} Pattern`,
  ];
  const arcType = arcNames[Math.floor(Math.random() * arcNames.length)];

  const summary = `A ${pacingType.toLowerCase()} ${style.toLowerCase()} arc optimized for ${platform}, targeting ${emotion.toLowerCase()} emotions in the ${industry.toLowerCase()} space. The arc peaks at ${generatedBeats.reduce((max, b) => b.emotionalIntensity > max.emotionalIntensity ? b : max).name} with an intensity of ${generatedBeats.reduce((max, b) => b.emotionalIntensity > max.emotionalIntensity ? b : max).emotionalIntensity}/10. Best suited for ${duration} ${topic} content.`;

  return {
    beats: generatedBeats,
    pacing: { overallScore, pacingType, dropOffZones, transitions: transitionSuggestions },
    script: { openingHook, transitionPhrases, closingCTA },
    platformTips,
    retentionCurve,
    arcType,
    summary,
  };
}

export default function StoryArcPage() {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState<string>('Instagram Reel');
  const [duration, setDuration] = useState<string>('60 sec');
  const [narrativeStyle, setNarrativeStyle] = useState<string>('Hero\'s Journey');
  const [emotionalTarget, setEmotionalTarget] = useState<string>('Curious');
  const [industry, setIndustry] = useState<string>('SaaS/Tech');
  const [result, setResult] = useState<StoryArcResult | null>(null);
  const [expandedBeat, setExpandedBeat] = useState<number | null>(null);

  const handleGenerate = () => {
    if (!topic.trim()) return;
    setExpandedBeat(null);
    setResult(generateStoryArc(topic.trim(), platform, duration, narrativeStyle, emotionalTarget, industry));
  };

  const intensityBar = (val: number) => {
    const color = val >= 8 ? 'bg-fuchsia-500' : val >= 6 ? 'bg-violet-500' : val >= 4 ? 'bg-indigo-500' : 'bg-zinc-600';
    return (
      <div className="flex items-center gap-2">
        <div className="w-24 h-2 bg-zinc-800 rounded-full overflow-hidden">
          <div className={`h-full rounded-full ${color}`} style={{ width: `${val * 10}%` }} />
        </div>
        <span className="text-xs text-zinc-400">{val}/10</span>
      </div>
    );
  };

  const retentionColor = (val: number) => val >= 75 ? 'text-green-400' : val >= 50 ? 'text-yellow-400' : 'text-red-400';

  return (
    <main className="min-h-screen bg-zinc-950 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Story Arc Generator</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Map the emotional and informational pacing of your content. Generate <strong className="text-white">narrative story arcs, beat-by-beat scripts, retention curves</strong> and pacing analysis — optimized for any platform and duration.</p>

        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Content Topic</label>
            <input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g., productivity tips, brand building" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600" />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Platform</label>
            <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {platforms.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Duration / Length</label>
            <select value={duration} onChange={e => setDuration(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {durations.map(d => <option key={d}>{d}</option>)}
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
            <label className="block text-sm text-zinc-400 mb-1">Emotional Target</label>
            <select value={emotionalTarget} onChange={e => setEmotionalTarget(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {emotionalTargets.map(e => <option key={e}>{e}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Industry</label>
            <select value={industry} onChange={e => setIndustry(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {industries.map(i => <option key={i}>{i}</option>)}
            </select>
          </div>
        </div>

        <button onClick={handleGenerate} className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition">
          Generate Story Arc
        </button>

        {result && (
          <div className="mt-10 space-y-6">
            {/* Arc Overview */}
            <div className="bg-zinc-900 border border-violet-500/30 rounded-xl p-5">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                <h2 className="text-lg font-semibold text-white">{result.arcType}</h2>
                <div className={`text-2xl font-bold ${result.pacing.overallScore >= 80 ? 'text-green-400' : result.pacing.overallScore >= 60 ? 'text-yellow-400' : 'text-orange-400'}`}>
                  {result.pacing.overallScore}<span className="text-xs text-zinc-500 ml-1">/ 100</span>
                </div>
              </div>
              <p className="text-zinc-300 text-sm mb-3">{result.summary}</p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 rounded-full bg-violet-600/20 text-violet-300">{result.pacing.pacingType}</span>
                <span className="px-2 py-1 rounded-full bg-fuchsia-600/20 text-fuchsia-300">{result.beats.length} Beats</span>
                <span className="px-2 py-1 rounded-full bg-indigo-600/20 text-indigo-300">{platform}</span>
                <span className="px-2 py-1 rounded-full bg-zinc-700 text-zinc-300">{duration}</span>
              </div>
            </div>

            {/* Retention Curve */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-4">Predicted Retention Curve</h3>
              <div className="space-y-2">
                {result.retentionCurve.map((point, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-xs text-zinc-500 w-40 truncate">{point.label}</span>
                    <div className="flex-1 h-4 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${point.value >= 75 ? 'bg-green-500/80' : point.value >= 50 ? 'bg-yellow-500/80' : 'bg-red-500/80'}`}
                        style={{ width: `${point.value}%` }}
                      />
                    </div>
                    <span className={`text-sm font-mono font-semibold w-12 text-right ${retentionColor(point.value)}`}>{point.value}%</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-zinc-600 mt-3">Retention estimates based on arc structure, emotional pacing, and platform benchmarks.</p>
            </div>

            {/* Story Beats */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Story Beats ({result.beats.length})</h2>
              {result.beats.map((beat, i) => (
                <div key={i} className={`bg-zinc-900 border rounded-xl p-5 ${i === 0 ? 'border-violet-500/50' : beat.emotionalIntensity >= 9 ? 'border-fuchsia-500/40' : 'border-zinc-800'}`}>
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${i === 0 ? 'bg-violet-600/20 text-violet-300' : beat.emotionalIntensity >= 9 ? 'bg-fuchsia-600/20 text-fuchsia-300' : 'bg-zinc-800 text-zinc-400'}`}>Beat {i + 1}</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-zinc-800 text-zinc-400">{beat.timing}</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-zinc-800 text-zinc-500">{beat.percentage}</span>
                      {beat.emotionalIntensity >= 9 && <span className="text-xs px-2 py-1 rounded-full bg-fuchsia-600/20 text-fuchsia-300">Peak</span>}
                    </div>
                    <span className={`font-semibold ${retentionColor(beat.retentionPrediction)}`}>
                      {beat.retentionPrediction}% <span className="text-xs text-zinc-500">retention</span>
                    </span>
                  </div>

                  <h3 className="text-white font-semibold text-lg mb-2">{beat.name}</h3>
                  <p className="text-zinc-400 text-sm mb-3">{beat.description}</p>

                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-xs text-zinc-500 uppercase">Emotional Intensity</span>
                      <div className="mt-1">{intensityBar(beat.emotionalIntensity)}</div>
                    </div>
                    <div>
                      <span className="text-xs text-zinc-500 uppercase">Visual Suggestion</span>
                      <p className="text-violet-400 mt-1">{beat.visualSuggestion}</p>
                    </div>
                  </div>

                  {i < result.pacing.transitions.length && (
                    <button
                      onClick={() => setExpandedBeat(expandedBeat === i ? null : i)}
                      className="text-sm text-violet-400 hover:text-violet-300 transition flex items-center gap-1 mt-3"
                    >
                      {expandedBeat === i ? 'Hide' : 'Show'} Transition
                      <span className={`inline-block transition-transform ${expandedBeat === i ? 'rotate-180' : ''}`}>&#9660;</span>
                    </button>
                  )}
                  {expandedBeat === i && i < result.pacing.transitions.length && (
                    <div className="mt-3 bg-zinc-800/50 rounded-lg p-4 text-sm">
                      <span className="text-zinc-500 text-xs uppercase">Transition to Next Beat</span>
                      <p className="text-zinc-300 mt-1">{result.pacing.transitions[i]}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Pacing Analysis */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Pacing Analysis</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-zinc-800/50 rounded-lg p-3">
                  <span className="text-zinc-500 text-xs uppercase">Arc Score</span>
                  <p className={`text-2xl font-bold mt-1 ${result.pacing.overallScore >= 80 ? 'text-green-400' : result.pacing.overallScore >= 60 ? 'text-yellow-400' : 'text-orange-400'}`}>
                    {result.pacing.overallScore}/100
                  </p>
                </div>
                <div className="bg-zinc-800/50 rounded-lg p-3">
                  <span className="text-zinc-500 text-xs uppercase">Pacing Type</span>
                  <p className="text-violet-400 text-lg font-semibold mt-1">{result.pacing.pacingType}</p>
                </div>
              </div>

              <h4 className="text-sm font-semibold text-white mb-2">Drop-Off Danger Zones</h4>
              <div className="space-y-3">
                {result.pacing.dropOffZones.map((zone, i) => (
                  <div key={i} className="bg-red-950/20 border border-red-800/30 rounded-lg p-3 text-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-red-400 font-semibold">{zone.zone}</span>
                    </div>
                    <p className="text-zinc-400 text-xs mb-1">{zone.risk}</p>
                    <p className="text-zinc-300 text-xs"><span className="text-green-400">Fix:</span> {zone.suggestion}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Script Skeleton */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Script Skeleton</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-zinc-500 text-xs uppercase">Opening Hook</span>
                  <p className="text-white font-medium mt-1 text-base">{result.script.openingHook}</p>
                </div>
                <div>
                  <span className="text-zinc-500 text-xs uppercase">Key Transition Phrases</span>
                  <ul className="mt-1 space-y-1">
                    {result.script.transitionPhrases.map((phrase, i) => (
                      <li key={i} className="text-zinc-300 flex gap-2"><span className="text-violet-400">-</span>{phrase}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-zinc-500 text-xs uppercase">Closing CTA</span>
                  <p className="text-fuchsia-300 font-medium mt-1">{result.script.closingCTA}</p>
                </div>
              </div>
            </div>

            {/* Platform Tips */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Platform Tips — {platform}</h3>
              <ul className="space-y-2 text-sm">
                {result.platformTips.map((tip, i) => (
                  <li key={i} className="text-zinc-300 flex gap-2"><span className="text-fuchsia-400">-</span>{tip}</li>
                ))}
              </ul>
            </div>

            {/* Score Legend */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Arc Score Guide</h3>
              <div className="grid md:grid-cols-3 gap-3 text-sm">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-400"></span><span className="text-zinc-300">80-100: Highly engaging arc — publish with confidence</span></div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-yellow-400"></span><span className="text-zinc-300">60-79: Solid structure — tweak danger zones for best results</span></div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-orange-400"></span><span className="text-zinc-300">Below 60: Needs work — try a different style or add intensity</span></div>
              </div>
            </div>

            {/* Internal Links */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-zinc-400 mb-3">Build on Your Story Arc</h3>
              <div className="flex flex-wrap gap-2 text-sm">
                <a href="/hooks" className="text-violet-400 hover:text-violet-300 underline">Hook Generator</a>
                <a href="/video-scripts" className="text-violet-400 hover:text-violet-300 underline">Video Scripts</a>
                <a href="/video-pacing" className="text-violet-400 hover:text-violet-300 underline">Video Pacing</a>
                <a href="/emotional-analyzer" className="text-violet-400 hover:text-violet-300 underline">Emotional Analyzer</a>
                <a href="/content-calendar" className="text-violet-400 hover:text-violet-300 underline">Content Calendar</a>
                <a href="/caption-optimizer" className="text-violet-400 hover:text-violet-300 underline">Caption Optimizer</a>
                <a href="/angle-generator" className="text-violet-400 hover:text-violet-300 underline">Angle Generator</a>
                <a href="/virality-score" className="text-violet-400 hover:text-violet-300 underline">Virality Score</a>
              </div>
            </div>
          </div>
        )}

        {/* FAQ */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">Story Arc Generator FAQ</h2>
          <div className="space-y-4">
            {[
              { q: 'What is a story arc and why does it matter for social media?', a: 'A story arc is the structured emotional and informational journey your content takes the viewer through. Even a 15-second TikTok has a beginning, middle, and end. Content with a clear arc retains 40-60% more viewers than unstructured content because human brains are wired for narrative patterns. The arc creates anticipation, delivers satisfaction, and drives action — the three pillars of viral content.' },
              { q: 'Which narrative style works best for short-form video?', a: 'For content under 60 seconds, Problem-Solution and Before/After arcs consistently outperform. They front-load tension and deliver a fast payoff. Suspense Build works well for 30-60 second content where you can create a single compelling open loop. For 15-second content, Rant-to-Revelation (compressed) creates the highest emotional density. Hero\'s Journey and Interview Format are better suited for 3+ minute content where you have room to develop the narrative.' },
              { q: 'How do I use the retention curve predictions?', a: 'The retention curve shows where viewers are likely to drop off based on your arc structure. Retention above 75% is excellent, 50-75% is average, and below 50% needs immediate attention. Use the "Drop-Off Danger Zones" to identify weak points and add pattern interrupts — a surprising visual, a direct question to the viewer, or a mini-cliffhanger — at those exact moments to prevent exits.' },
              { q: 'Can I combine multiple narrative styles in one piece of content?', a: 'Yes — hybrid arcs often outperform pure styles. A common winning combination is Problem-Solution structure with Hero\'s Journey emotional beats. Or a Tutorial Arc with Suspense Build pacing to keep educational content engaging. The key is choosing one primary style for your overall structure and borrowing 1-2 techniques from a secondary style. Generate arcs with different styles for the same topic and mix the best elements.' },
              { q: 'How does emotional target affect the story arc?', a: 'The emotional target shapes the intensity curve of your entire arc. "Shocked" front-loads intensity for maximum hook power. "Curious" distributes open loops throughout to maintain watch-through. "Vulnerable" creates a slower build with a deeper emotional climax. "Urgency" keeps intensity consistently high with a strong CTA. Choose the emotion your audience is most likely to act on — not just feel — for the best conversion results.' },
            ].map((faq, i) => (
              <details key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 group">
                <summary className="font-semibold text-white cursor-pointer">{faq.q}</summary>
                <p className="text-zinc-400 text-sm mt-2">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 border-t border-zinc-800 pt-8 pb-12">
          <div className="grid md:grid-cols-4 gap-8 text-sm text-zinc-500">
            <div>
              <h4 className="font-semibold text-white mb-3">Content Creation</h4>
              <ul className="space-y-1"><li><a href="/" className="hover:text-white transition">Post Generator</a></li><li><a href="/hooks" className="hover:text-white transition">Hook Generator</a></li><li><a href="/video-scripts" className="hover:text-white transition">Video Scripts</a></li><li><a href="/threads" className="hover:text-white transition">Thread Generator</a></li><li><a href="/carousel-generator" className="hover:text-white transition">Carousel Generator</a></li><li><a href="/ad-copy" className="hover:text-white transition">Ad Copy Generator</a></li><li><a href="/story-arc" className="hover:text-white transition">Story Arc</a></li></ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Optimization</h4>
              <ul className="space-y-1"><li><a href="/caption-optimizer" className="hover:text-white transition">Caption Optimizer</a></li><li><a href="/hashtags" className="hover:text-white transition">Hashtags</a></li><li><a href="/post-timing" className="hover:text-white transition">Post Timing</a></li><li><a href="/social-seo" className="hover:text-white transition">Social SEO</a></li><li><a href="/virality-score" className="hover:text-white transition">Virality Score</a></li><li><a href="/video-pacing" className="hover:text-white transition">Video Pacing</a></li></ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Analytics</h4>
              <ul className="space-y-1"><li><a href="/engagement-calculator" className="hover:text-white transition">Engagement</a></li><li><a href="/sentiment-analyzer" className="hover:text-white transition">Sentiment</a></li><li><a href="/roi-calculator" className="hover:text-white transition">ROI Calculator</a></li><li><a href="/competitor-analysis" className="hover:text-white transition">Competitors</a></li><li><a href="/content-gap" className="hover:text-white transition">Content Gap</a></li></ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Strategy</h4>
              <ul className="space-y-1"><li><a href="/brand-voice" className="hover:text-white transition">Brand Voice</a></li><li><a href="/content-calendar" className="hover:text-white transition">Calendar</a></li><li><a href="/campaign" className="hover:text-white transition">Campaign</a></li><li><a href="/persona-builder" className="hover:text-white transition">Persona Builder</a></li><li><a href="/content-pillars" className="hover:text-white transition">Content Pillars</a></li></ul>
            </div>
          </div>
          <p className="text-center text-zinc-600 text-xs mt-8">&copy; 2026 PostCraft AI. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
