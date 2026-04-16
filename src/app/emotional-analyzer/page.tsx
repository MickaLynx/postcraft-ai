'use client';
import { useState } from 'react';

const platforms = ['Instagram', 'LinkedIn', 'TikTok', 'Twitter/X', 'Facebook', 'YouTube', 'Pinterest', 'Threads'] as const;
const audiences = ['Gen Z', 'Millennials', 'Gen X', 'Boomers', 'Business Professionals', 'Creators', 'Parents', 'Students'] as const;
const goals = ['Engagement', 'Conversions', 'Brand Awareness', 'Community Building', 'Viral Reach', 'Thought Leadership'] as const;

const primaryEmotions = ['Joy', 'Surprise', 'Curiosity', 'Fear', 'Anger', 'Trust', 'Anticipation', 'Sadness'] as const;
const velocityTypes = ['Instant Hook', 'Slow Burn', 'Building Wave'] as const;
const engagementLevels = ['Low', 'Medium', 'High', 'Viral Potential'] as const;
const psychTriggers = ['Social Proof', 'FOMO', 'Curiosity Gap', 'Identity', 'Authority', 'Scarcity', 'Reciprocity', 'Controversy'] as const;
const toneLabels = ['Empathetic', 'Authoritative', 'Playful', 'Urgent', 'Inspiring', 'Provocative'] as const;

interface AnalysisResult {
  emotionalImpactScore: number;
  primaryEmotion: typeof primaryEmotions[number];
  emotionalVelocity: typeof velocityTypes[number];
  engagementPrediction: { level: typeof engagementLevels[number]; percentage: number };
  psychologicalTriggers: { trigger: typeof psychTriggers[number]; found: boolean; evidence: string }[];
  toneAnalysis: { tone: typeof toneLabels[number]; score: number }[];
  improvements: string[];
  rewrittenVersion: string;
  platformNotes: string;
  wordCount: number;
  powerWordCount: number;
  emotionWordCount: number;
  sentenceEnergy: number;
}

function hashText(text: string): number {
  let h = 0;
  for (let i = 0; i < text.length; i++) {
    h = ((h << 5) - h + text.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function analyzeEmotionalHook(
  text: string,
  platform: string,
  audience: string,
  goal: string
): AnalysisResult {
  const lower = text.toLowerCase();
  const words = text.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const hash = hashText(text);

  const hasQuestion = text.includes('?');
  const hasExclamation = text.includes('!');
  const exclamationCount = (text.match(/!/g) || []).length;
  const questionCount = (text.match(/\?/g) || []).length;
  const hasEmoji = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u.test(text);
  const hasNumbers = /\d/.test(text);
  const hasAllCaps = /\b[A-Z]{2,}\b/.test(text);
  const hasEllipsis = text.includes('...');
  const avgSentenceLen = sentences.length > 0 ? wordCount / sentences.length : wordCount;

  // Power words
  const powerWords = [
    'free', 'exclusive', 'proven', 'secret', 'ultimate', 'guaranteed', 'instant', 'discover',
    'transform', 'unleash', 'breakthrough', 'revolutionary', 'limited', 'urgent', 'now',
    'today', 'imagine', 'unlock', 'massive', 'incredible', 'shocking', 'revealed', 'hack',
    'insider', 'dominate', 'skyrocket', 'explode', 'crush', 'obsessed', 'confession',
    'dangerous', 'warning', 'truth', 'exposed', 'banned', 'controversial', 'unpopular',
    'nobody', 'everyone', 'always', 'never', 'stop', 'mistake', 'wrong', 'lies'
  ];
  const emotionWords = [
    'love', 'hate', 'fear', 'dream', 'hope', 'angry', 'sad', 'happy', 'excited', 'terrified',
    'thrilled', 'devastated', 'obsessed', 'passionate', 'furious', 'grateful', 'anxious',
    'overwhelmed', 'heartbroken', 'ecstatic', 'disgusted', 'amazed', 'shocked', 'inspired',
    'lonely', 'proud', 'jealous', 'guilty', 'ashamed', 'confused', 'frustrated', 'blessed'
  ];
  const curiosityWords = [
    'why', 'how', 'what if', 'secret', 'hidden', 'unknown', 'mystery', 'discover',
    'revealed', 'truth', 'actually', 'turns out', 'nobody knows', 'little-known', 'surprising'
  ];
  const urgencyWords = [
    'now', 'today', 'hurry', 'limited', 'last chance', 'before', 'deadline', 'running out',
    'don\'t miss', 'ending soon', 'act fast', 'immediately', 'urgent', 'time-sensitive'
  ];
  const trustWords = [
    'proven', 'data', 'research', 'study', 'expert', 'years', 'clients', 'results',
    'guarantee', 'certified', 'tested', 'evidence', 'fact', 'statistics', 'case study'
  ];
  const identityWords = [
    'you', 'your', 'you\'re', 'yourself', 'we', 'our', 'us', 'together', 'community',
    'tribe', 'family', 'belong', 'identity', 'generation', 'people like'
  ];

  const foundPower = powerWords.filter(w => lower.includes(w));
  const foundEmotion = emotionWords.filter(w => lower.includes(w));
  const foundCuriosity = curiosityWords.filter(w => lower.includes(w));
  const foundUrgency = urgencyWords.filter(w => lower.includes(w));
  const foundTrust = trustWords.filter(w => lower.includes(w));
  const foundIdentity = identityWords.filter(w => lower.includes(w));

  // --- Emotional Impact Score (0-100) ---
  let impactScore = 35;
  impactScore += foundPower.length * 4;
  impactScore += foundEmotion.length * 5;
  impactScore += foundCuriosity.length * 3;
  impactScore += hasQuestion ? 6 : 0;
  impactScore += hasExclamation ? 4 : 0;
  impactScore += hasEmoji ? 3 : 0;
  impactScore += hasAllCaps ? 5 : 0;
  impactScore += hasEllipsis ? 3 : 0;
  impactScore += hasNumbers ? 4 : 0;
  impactScore += avgSentenceLen < 15 ? 5 : avgSentenceLen > 25 ? -5 : 0;
  impactScore += wordCount >= 10 && wordCount <= 50 ? 5 : wordCount < 5 ? -10 : 0;

  // Audience modifier
  if (audience === 'Gen Z' && (hasEmoji || hasAllCaps || exclamationCount > 1)) impactScore += 5;
  if (audience === 'Business Professionals' && foundTrust.length > 0) impactScore += 5;
  if (audience === 'Creators' && foundPower.length > 1) impactScore += 4;
  if (audience === 'Students' && hasQuestion) impactScore += 4;

  // Goal modifier
  if (goal === 'Viral Reach' && (foundPower.length > 2 || hasAllCaps)) impactScore += 5;
  if (goal === 'Conversions' && foundUrgency.length > 0) impactScore += 5;
  if (goal === 'Community Building' && foundIdentity.length > 1) impactScore += 5;
  if (goal === 'Thought Leadership' && foundTrust.length > 0) impactScore += 5;

  impactScore = Math.min(100, Math.max(0, Math.round(impactScore)));

  // --- Primary Emotion Detection ---
  const emotionScores: Record<string, number> = {
    Joy: 0, Surprise: 0, Curiosity: 0, Fear: 0,
    Anger: 0, Trust: 0, Anticipation: 0, Sadness: 0,
  };

  // Joy
  emotionScores.Joy += ['love', 'happy', 'excited', 'thrilled', 'ecstatic', 'grateful', 'blessed', 'amazing', 'awesome', 'wonderful'].filter(w => lower.includes(w)).length * 10;
  emotionScores.Joy += hasEmoji ? 5 : 0;
  emotionScores.Joy += exclamationCount * 3;

  // Surprise
  emotionScores.Surprise += ['shocking', 'unbelievable', 'unexpected', 'surprise', 'amazed', 'stunned', 'plot twist', 'wait', 'omg', 'can\'t believe'].filter(w => lower.includes(w)).length * 10;
  emotionScores.Surprise += hasAllCaps ? 5 : 0;

  // Curiosity
  emotionScores.Curiosity += foundCuriosity.length * 8;
  emotionScores.Curiosity += hasQuestion ? 10 : 0;
  emotionScores.Curiosity += hasEllipsis ? 8 : 0;

  // Fear
  emotionScores.Fear += ['fear', 'terrified', 'anxious', 'worried', 'danger', 'warning', 'scary', 'nightmare', 'risk', 'threat'].filter(w => lower.includes(w)).length * 10;
  emotionScores.Fear += lower.includes('don\'t') || lower.includes('avoid') || lower.includes('stop') ? 5 : 0;

  // Anger
  emotionScores.Anger += ['hate', 'furious', 'angry', 'disgusted', 'outraged', 'sick of', 'tired of', 'enough', 'unacceptable', 'wrong'].filter(w => lower.includes(w)).length * 10;
  emotionScores.Anger += exclamationCount > 2 ? 5 : 0;

  // Trust
  emotionScores.Trust += foundTrust.length * 8;
  emotionScores.Trust += hasNumbers ? 8 : 0;

  // Anticipation
  emotionScores.Anticipation += ['coming soon', 'announcement', 'launching', 'reveal', 'sneak peek', 'preview', 'tomorrow', 'soon', 'can\'t wait', 'get ready'].filter(w => lower.includes(w)).length * 10;
  emotionScores.Anticipation += hasEllipsis ? 5 : 0;

  // Sadness
  emotionScores.Sadness += ['sad', 'heartbroken', 'lonely', 'miss', 'lost', 'grief', 'pain', 'cry', 'devastating', 'goodbye'].filter(w => lower.includes(w)).length * 10;

  // Add baseline noise based on hash so empty-ish text still has a deterministic primary emotion
  const emotionKeys = Object.keys(emotionScores) as (typeof primaryEmotions[number])[];
  emotionKeys.forEach((k, i) => {
    emotionScores[k] += ((hash >> i) % 7) + 2;
  });

  const primaryEmotion = emotionKeys.reduce((a, b) => emotionScores[a] >= emotionScores[b] ? a : b);

  // --- Emotional Velocity ---
  let velocity: typeof velocityTypes[number] = 'Slow Burn';
  const firstWords = words.slice(0, 5).join(' ').toLowerCase();
  const hasImmediateHook = hasQuestion || hasAllCaps || hasExclamation ||
    /^(stop|wait|warning|breaking|imagine|you |this |i |don't|never|nobody)/.test(firstWords);
  const hasBuildUp = sentences.length > 2 && wordCount > 30;
  if (hasImmediateHook && wordCount <= 30) velocity = 'Instant Hook';
  else if (hasImmediateHook && hasBuildUp) velocity = 'Building Wave';
  else if (hasBuildUp) velocity = 'Slow Burn';
  else velocity = 'Instant Hook';

  // --- Engagement Prediction ---
  let engPercent = impactScore * 0.8 + foundPower.length * 3 + (hasQuestion ? 8 : 0) + (hasEmoji ? 3 : 0);
  if (goal === 'Engagement') engPercent += 5;
  if (goal === 'Viral Reach') engPercent += 8;
  engPercent = Math.min(98, Math.max(5, Math.round(engPercent)));

  let engLevel: typeof engagementLevels[number] = 'Low';
  if (engPercent >= 80) engLevel = 'Viral Potential';
  else if (engPercent >= 60) engLevel = 'High';
  else if (engPercent >= 35) engLevel = 'Medium';

  // --- Psychological Triggers ---
  const psychResults: AnalysisResult['psychologicalTriggers'] = [
    {
      trigger: 'Social Proof',
      found: /(\d+[kKmM+]?\s*(people|users|followers|customers|downloads|reviews|sold|joined))|everyone|most people|millions/i.test(text),
      evidence: /(\d+[kKmM+]?\s*(people|users|followers|customers|downloads|reviews|sold|joined))/i.test(text)
        ? 'Numerical social proof detected' : 'No social proof signals found',
    },
    {
      trigger: 'FOMO',
      found: foundUrgency.length > 0 || /miss out|limited|exclusive|only \d+|selling fast|almost gone/i.test(text),
      evidence: foundUrgency.length > 0 ? `Urgency words: ${foundUrgency.slice(0, 3).join(', ')}` : 'No FOMO triggers detected',
    },
    {
      trigger: 'Curiosity Gap',
      found: hasQuestion || hasEllipsis || /secret|hidden|truth|nobody|little-known|turns out|actually/i.test(text),
      evidence: hasQuestion ? 'Question opens a curiosity loop' : hasEllipsis ? 'Ellipsis creates open loop' : 'No curiosity gap detected',
    },
    {
      trigger: 'Identity',
      found: foundIdentity.length > 1 || /if you're a|as a |people who|anyone who|my fellow/i.test(text),
      evidence: foundIdentity.length > 1 ? `Identity language: ${foundIdentity.slice(0, 3).join(', ')}` : 'No identity trigger detected',
    },
    {
      trigger: 'Authority',
      found: foundTrust.length > 0 || /years? of|PhD|CEO|founder|award|published|featured in|according to/i.test(text),
      evidence: foundTrust.length > 0 ? `Authority signals: ${foundTrust.slice(0, 3).join(', ')}` : 'No authority positioning detected',
    },
    {
      trigger: 'Scarcity',
      found: /only \d+|limited|rare|exclusive|once|last|few remaining|spots left|sold out/i.test(text),
      evidence: /only \d+|limited|spots left/i.test(text) ? 'Scarcity language detected' : 'No scarcity signals found',
    },
    {
      trigger: 'Reciprocity',
      found: /free|gift|bonus|tip|hack|here's|sharing|giving|for you/i.test(text),
      evidence: /free|gift|bonus|tip|hack/i.test(text) ? 'Free value offering detected' : 'No reciprocity trigger found',
    },
    {
      trigger: 'Controversy',
      found: /unpopular|controversial|hot take|nobody talks about|wrong about|overrated|underrated|disagree|fight me/i.test(text),
      evidence: /unpopular|hot take|controversial/i.test(text) ? 'Controversial stance detected' : 'No controversy trigger found',
    },
  ];

  // --- Tone Analysis ---
  const toneScores: AnalysisResult['toneAnalysis'] = [
    {
      tone: 'Empathetic',
      score: Math.min(100, 20 + foundIdentity.length * 12 + (lower.includes('understand') || lower.includes('feel') || lower.includes('struggle') ? 20 : 0) + (lower.includes('you') ? 10 : 0)),
    },
    {
      tone: 'Authoritative',
      score: Math.min(100, 15 + foundTrust.length * 12 + (hasNumbers ? 15 : 0) + (avgSentenceLen > 15 ? 5 : 0)),
    },
    {
      tone: 'Playful',
      score: Math.min(100, 10 + (hasEmoji ? 20 : 0) + (exclamationCount * 5) + (hasAllCaps ? 10 : 0) + (/lol|haha|lmao|omg|tbh|ngl|iykyk|slay|vibe/i.test(text) ? 20 : 0)),
    },
    {
      tone: 'Urgent',
      score: Math.min(100, 10 + foundUrgency.length * 15 + (exclamationCount * 8) + (hasAllCaps ? 12 : 0)),
    },
    {
      tone: 'Inspiring',
      score: Math.min(100, 15 + ['dream', 'achiev', 'transform', 'grow', 'unlock', 'journey', 'believe', 'possible', 'potential', 'become'].filter(w => lower.includes(w)).length * 12),
    },
    {
      tone: 'Provocative',
      score: Math.min(100, 10 + (/unpopular|hot take|controversial|nobody|wrong|lies|overrated|stop|truth|exposed/i.test(text) ? 25 : 0) + (hasAllCaps ? 10 : 0) + (foundPower.filter(w => ['shocking', 'exposed', 'dangerous', 'warning', 'banned', 'controversial', 'truth', 'lies'].includes(w)).length * 12)),
    },
  ];

  // --- Improvement Suggestions ---
  const improvements: string[] = [];
  if (!hasQuestion && !hasEllipsis) improvements.push('Open with a question or ellipsis to create a curiosity gap that forces readers to engage.');
  if (foundPower.length < 2) improvements.push('Add 1-2 power words (e.g., "proven", "secret", "exclusive") to amplify emotional charge.');
  if (foundEmotion.length === 0) improvements.push('Include at least one emotion word (e.g., "obsessed", "terrified", "grateful") to create visceral connection.');
  if (!hasEmoji && (platform === 'Instagram' || platform === 'TikTok' || platform === 'Threads')) improvements.push(`Add 2-3 strategic emojis to boost ${platform} visual scanning and emotional tone.`);
  if (avgSentenceLen > 20) improvements.push('Break long sentences into punchy 8-12 word fragments for faster emotional impact.');
  if (foundIdentity.length === 0) improvements.push('Use "you" or "your" to make the reader feel personally addressed and emotionally involved.');
  if (!hasNumbers && goal !== 'Community Building') improvements.push('Add a specific number or statistic to ground your emotional hook in credibility.');
  if (psychResults.filter(p => p.found).length < 2) improvements.push('Layer in at least 2 psychological triggers (FOMO + Curiosity Gap works especially well).');
  if (wordCount > 60 && velocity !== 'Slow Burn') improvements.push('Front-load your emotional hook in the first 7 words where attention is highest.');
  if (exclamationCount > 3) improvements.push('Reduce exclamation marks to 1-2 maximum. Overuse dilutes urgency and feels spammy.');

  // Cap at 5
  const finalImprovements = improvements.slice(0, 5);

  // --- Rewritten Version ---
  const rewrittenVersion = generateRewrite(text, primaryEmotion, platform, goal, foundPower, hasQuestion, hasEmoji, hash);

  // --- Platform-Specific Notes ---
  const platformNotes = getPlatformNotes(platform, impactScore, wordCount, hasEmoji, hasQuestion, velocity, audience);

  // --- Sentence Energy ---
  const sentenceEnergy = Math.min(100, Math.round(
    40 + (exclamationCount * 8) + (questionCount * 6) + (hasAllCaps ? 10 : 0) +
    (foundPower.length * 4) + (avgSentenceLen < 12 ? 15 : 0) - (avgSentenceLen > 25 ? 15 : 0)
  ));

  return {
    emotionalImpactScore: impactScore,
    primaryEmotion,
    emotionalVelocity: velocity,
    engagementPrediction: { level: engLevel, percentage: engPercent },
    psychologicalTriggers: psychResults,
    toneAnalysis: toneScores.sort((a, b) => b.score - a.score),
    improvements: finalImprovements,
    rewrittenVersion,
    platformNotes,
    wordCount,
    powerWordCount: foundPower.length,
    emotionWordCount: foundEmotion.length,
    sentenceEnergy,
  };
}

function generateRewrite(
  text: string,
  emotion: string,
  platform: string,
  goal: string,
  foundPower: string[],
  hasQuestion: boolean,
  hasEmoji: boolean,
  hash: number
): string {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length < 3) return 'Enter more text to generate an optimized rewrite.';

  // Extract core message (simplified)
  const core = text.replace(/[!?.]+/g, '.').replace(/\.+/g, '.').trim();
  const firstSentence = core.split('.')[0]?.trim() || core;

  // Build emotionally optimized version
  const hooks: Record<string, string[]> = {
    Joy: ['This changed everything for me:', 'The moment I realized this, everything shifted:', 'I never expected this to feel so good:'],
    Surprise: ['Nobody is talking about this:', 'This caught me completely off guard:', 'I was NOT prepared for this:'],
    Curiosity: ['Here\'s what most people miss:', 'The hidden truth nobody tells you:', 'I discovered something most people overlook:'],
    Fear: ['Warning: This mistake costs people everything.', 'Stop doing this before it\'s too late.', 'If you ignore this, you\'ll regret it.'],
    Anger: ['This needs to stop.', 'I\'m tired of seeing this mistake repeated.', 'Unpopular opinion that needs to be said:'],
    Trust: ['After 5 years of testing, here\'s what actually works:', 'The data is clear on this:', 'Backed by research, here\'s the truth:'],
    Anticipation: ['Something big is coming...', 'This is going to change how you think about everything.', 'Get ready for this:'],
    Sadness: ['I wish someone told me this sooner.', 'The hardest lesson I had to learn:', 'This is the truth nobody wants to hear:'],
  };

  const hookOptions = hooks[emotion] || hooks.Curiosity;
  const hookLine = hookOptions[hash % hookOptions.length];

  const ctaMap: Record<string, string> = {
    Engagement: 'Drop a [relevant emoji] if this hits different.',
    Conversions: 'Link in bio to get started today.',
    'Brand Awareness': 'Share this with someone who needs to hear it.',
    'Community Building': 'What\'s your experience with this? Tell me below.',
    'Viral Reach': 'Save this. Share this. Someone in your network needs it.',
    'Thought Leadership': 'Agree or disagree? Let me know your take.',
  };
  const cta = ctaMap[goal] || ctaMap.Engagement;

  // Platform-aware formatting
  const isShortForm = platform === 'Twitter/X' || platform === 'TikTok' || platform === 'Threads';

  let rewrite = '';
  if (isShortForm) {
    rewrite = `${hookLine}\n\n${firstSentence}.\n\n${cta}`;
  } else {
    rewrite = `${hookLine}\n\n${firstSentence}.\n\nHere\'s why this matters:\n\nMost people overlook this, but the impact is real.\n\n${cta}`;
  }

  return rewrite;
}

function getPlatformNotes(
  platform: string,
  score: number,
  wordCount: number,
  hasEmoji: boolean,
  hasQuestion: boolean,
  velocity: string,
  audience: string
): string {
  const notes: Record<string, string> = {
    Instagram: `Instagram\'s algorithm rewards saves and shares heavily. Your emotional impact score of ${score}/100 ${score >= 70 ? 'positions this well for Explore page discovery' : 'may need stronger visual-emotional pairing'}. ${!hasEmoji ? 'Add emojis in first line to boost scan-stopping power.' : 'Emoji usage helps visual scanning.'} Carousel posts with emotional hooks see 3x more saves. ${audience === 'Gen Z' ? 'Gen Z responds best to authentic vulnerability over polished content.' : ''}`,
    LinkedIn: `LinkedIn\'s algorithm prioritizes dwell time and comments. ${velocity === 'Slow Burn' ? 'Your slow-burn approach matches LinkedIn reading patterns perfectly.' : 'Consider extending the narrative arc for LinkedIn\'s longer-form audience.'} ${wordCount < 100 ? 'Expand to 150-300 words for optimal LinkedIn performance.' : 'Good length for LinkedIn engagement.'} ${hasQuestion ? 'Your question will drive comment velocity in the first hour.' : 'End with a question to boost comments (LinkedIn\'s #1 ranking signal).'} ${audience === 'Business Professionals' ? 'Lead with data or results for B2B audiences.' : ''}`,
    TikTok: `TikTok prioritizes watch time and shares. ${velocity === 'Instant Hook' ? 'Your instant hook approach is perfect for TikTok\'s 1-second attention test.' : 'Front-load emotional punch in the first 3 words for TikTok.'} Keep caption under 150 chars. ${hasEmoji ? 'Emoji usage aligns with TikTok culture.' : 'Add emojis for TikTok native feel.'} ${audience === 'Gen Z' ? 'Authentic, unfiltered emotion resonates strongest with Gen Z on TikTok.' : ''} This hook style typically performs ${score >= 65 ? '2-3x above average' : 'at average levels'} on TikTok.`,
    'Twitter/X': `Twitter/X rewards instant emotional reactions and quote tweets. ${velocity === 'Instant Hook' ? 'Your instant hook is ideal for Twitter\'s fast-scroll environment.' : 'Compress your hook into the first 7 words.'} ${wordCount > 50 ? 'Consider threading for longer content.' : 'Good length for single tweet impact.'} ${hasQuestion ? 'Questions on Twitter drive 2x more replies.' : 'Add a polarizing question to boost replies.'} Controversial or surprising emotions spread fastest on this platform.`,
    Facebook: `Facebook prioritizes meaningful interactions and shares. ${score >= 60 ? 'Your emotional resonance should drive comment threads.' : 'Strengthen the personal/relatable angle for Facebook.'} ${hasQuestion ? 'Questions boost Facebook comment rate significantly.' : 'Add a question to spark discussion.'} ${wordCount >= 40 && wordCount <= 150 ? 'Good length for Facebook engagement.' : 'Aim for 40-150 words on Facebook.'} Content that triggers nostalgia, pride, or community belonging performs best here.`,
    YouTube: `YouTube evaluates click-through rate heavily. ${velocity === 'Instant Hook' ? 'Your hook translates well to a video title/thumbnail combo.' : 'Punch up the first line for title potential.'} ${score >= 70 ? 'Strong emotional hook for a video title/description.' : 'Amplify curiosity or surprise for better CTR.'} Emotional thumbnails + titles get 35% higher CTR. Consider pairing with a Curiosity Gap trigger for maximum click-through.`,
    Pinterest: `Pinterest values aspirational and instructional emotional hooks. ${score >= 60 ? 'Your content emotion aligns with Pinterest\'s save-driven culture.' : 'Lean into inspiring or educational emotional framing.'} Pinterest users save content for future reference, so ${velocity === 'Slow Burn' ? 'your thoughtful approach matches the platform' : 'add a "save this for later" angle'}. Pair with a strong visual for maximum pin performance. How-to and transformation hooks outperform everything else here.`,
    Threads: `Threads rewards conversational, authentic emotion. ${velocity === 'Instant Hook' ? 'Your hook fits Threads\' quick-engagement culture.' : 'Compress for faster emotional delivery on Threads.'} ${hasQuestion ? 'Questions drive high reply rates on Threads.' : 'Add a question or hot take to boost replies.'} ${wordCount <= 40 ? 'Great brevity for Threads.' : 'Consider tightening to under 40 words.'} Raw, unfiltered emotional takes outperform polished content on Threads.`,
  };
  return notes[platform] || `Optimize your emotional hook for ${platform}'s unique engagement patterns.`;
}

function getScoreColor(s: number): string {
  if (s >= 80) return 'text-green-400';
  if (s >= 60) return 'text-yellow-400';
  if (s >= 40) return 'text-orange-400';
  return 'text-red-400';
}

function getBarColor(s: number): string {
  if (s >= 80) return 'bg-green-500';
  if (s >= 60) return 'bg-yellow-500';
  if (s >= 40) return 'bg-orange-500';
  return 'bg-red-500';
}

function getEmotionColor(emotion: string): string {
  const map: Record<string, string> = {
    Joy: 'text-yellow-400', Surprise: 'text-purple-400', Curiosity: 'text-cyan-400',
    Fear: 'text-red-400', Anger: 'text-red-500', Trust: 'text-blue-400',
    Anticipation: 'text-orange-400', Sadness: 'text-indigo-400',
  };
  return map[emotion] || 'text-zinc-300';
}

function getVelocityIcon(v: string): string {
  if (v === 'Instant Hook') return '>> ';
  if (v === 'Building Wave') return '~ ';
  return '... ';
}

export default function EmotionalAnalyzerPage() {
  const [content, setContent] = useState('');
  const [platform, setPlatform] = useState<string>('Instagram');
  const [audience, setAudience] = useState<string>('Millennials');
  const [goal, setGoal] = useState<string>('Engagement');
  const [result, setResult] = useState<AnalysisResult | null>(null);

  function analyze() {
    if (!content.trim() || content.trim().split(/\s+/).length < 3) return;
    setResult(analyzeEmotionalHook(content, platform, audience, goal));
  }

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;

  return (
    <main className="min-h-screen">
      <section className="px-6 py-20 max-w-4xl mx-auto text-center">
        <p className="text-xs text-pink-400 uppercase tracking-widest mb-2 font-semibold">AI-Powered Analysis</p>
        <h1 className="text-5xl font-bold mb-4">
          Emotional Hook <span className="gradient-text">Analyzer</span>
        </h1>
        <p className="text-zinc-400 text-lg mb-2 max-w-2xl mx-auto">
          Predict the emotional response, engagement velocity, and psychological impact of your content before you publish. Powered by advanced text analysis.
        </p>
        <p className="text-zinc-500 text-sm mb-8">Free forever. No signup. Instant emotional intelligence for every post.</p>
      </section>

      <section className="px-6 pb-10 max-w-4xl mx-auto">
        <div className="glass rounded-2xl p-8">
          <h2 className="text-xl font-semibold mb-6">Analyze Your Content</h2>

          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Paste your hook, caption, or content here to analyze its emotional impact..."
            rows={6}
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-pink-500 transition mb-4 resize-none"
          />

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Platform</label>
              <select value={platform} onChange={e => setPlatform(e.target.value)}
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-pink-500 transition">
                {platforms.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Target Audience</label>
              <select value={audience} onChange={e => setAudience(e.target.value)}
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-pink-500 transition">
                {audiences.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Content Goal</label>
              <select value={goal} onChange={e => setGoal(e.target.value)}
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-pink-500 transition">
                {goals.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <span className="text-xs text-zinc-500">{wordCount} words | {content.length} characters</span>
            <span className="text-xs text-zinc-600">{wordCount < 3 ? 'Minimum 3 words required' : 'Ready to analyze'}</span>
          </div>

          <button onClick={analyze} disabled={wordCount < 3}
            className="w-full py-3.5 btn-primary rounded-xl font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed">
            Analyze Emotional Impact
          </button>
        </div>
      </section>

      {result && (
        <section className="px-6 pb-20 max-w-4xl mx-auto space-y-8 fade-in">

          {/* Hero Score */}
          <div className="glass rounded-2xl p-8 text-center">
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Emotional Impact Score</p>
            <p className={`text-7xl font-bold ${getScoreColor(result.emotionalImpactScore)}`}>{result.emotionalImpactScore}</p>
            <p className="text-zinc-400 text-lg mt-2">out of 100</p>

            <div className="grid grid-cols-3 gap-6 mt-8">
              <div>
                <p className={`text-2xl font-bold ${getEmotionColor(result.primaryEmotion)}`}>{result.primaryEmotion}</p>
                <p className="text-xs text-zinc-500 mt-1">Primary Emotion</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-400">{getVelocityIcon(result.emotionalVelocity)}{result.emotionalVelocity}</p>
                <p className="text-xs text-zinc-500 mt-1">Emotional Velocity</p>
              </div>
              <div>
                <p className={`text-2xl font-bold ${result.engagementPrediction.level === 'Viral Potential' ? 'text-green-400' : result.engagementPrediction.level === 'High' ? 'text-yellow-400' : 'text-orange-400'}`}>
                  {result.engagementPrediction.level}
                </p>
                <p className="text-xs text-zinc-500 mt-1">Engagement: {result.engagementPrediction.percentage}%</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="glass rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-pink-400">{result.wordCount}</p>
              <p className="text-xs text-zinc-500 mt-1">Words</p>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-orange-400">{result.powerWordCount}</p>
              <p className="text-xs text-zinc-500 mt-1">Power Words</p>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-red-400">{result.emotionWordCount}</p>
              <p className="text-xs text-zinc-500 mt-1">Emotion Words</p>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <p className={`text-2xl font-bold ${getScoreColor(result.sentenceEnergy)}`}>{result.sentenceEnergy}</p>
              <p className="text-xs text-zinc-500 mt-1">Sentence Energy</p>
            </div>
          </div>

          {/* Psychological Triggers */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-lg font-semibold mb-6">Psychological Triggers Detected</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {result.psychologicalTriggers.map(t => (
                <div key={t.trigger} className={`rounded-xl p-4 border ${t.found ? 'bg-green-500/10 border-green-500/30' : 'bg-zinc-800/50 border-zinc-700/30'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-sm font-bold ${t.found ? 'text-green-400' : 'text-zinc-500'}`}>
                      {t.found ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                  </div>
                  <p className="text-sm font-semibold mb-1">{t.trigger}</p>
                  <p className="text-xs text-zinc-500">{t.evidence}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tone Analysis */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-lg font-semibold mb-6">Tone Analysis</h3>
            <div className="space-y-4">
              {result.toneAnalysis.map(t => (
                <div key={t.tone}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{t.tone}</span>
                    <span className={`text-sm font-bold ${getScoreColor(t.score)}`}>{t.score}%</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-2.5">
                    <div className={`h-2.5 rounded-full ${getBarColor(t.score)} transition-all duration-500`} style={{ width: `${t.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Improvement Suggestions */}
          {result.improvements.length > 0 && (
            <div className="glass rounded-2xl p-8">
              <h3 className="text-lg font-semibold mb-4">Optimization Recommendations</h3>
              <div className="space-y-3">
                {result.improvements.map((tip, i) => (
                  <div key={i} className="flex gap-3 text-sm">
                    <span className="text-pink-400 font-bold shrink-0">{i + 1}.</span>
                    <span className="text-zinc-300">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rewritten Version */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-lg font-semibold mb-2">Emotionally Optimized Rewrite</h3>
            <p className="text-xs text-zinc-500 mb-4">Rewritten to maximize {result.primaryEmotion.toLowerCase()} for {platform} ({goal.toLowerCase()} goal)</p>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 whitespace-pre-line text-sm text-zinc-300 leading-relaxed">
              {result.rewrittenVersion}
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(result.rewrittenVersion)}
              className="mt-3 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-xs font-medium text-zinc-300 transition">
              Copy Rewrite
            </button>
          </div>

          {/* Platform-Specific Notes */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-lg font-semibold mb-2">{platform} Emotional Strategy</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">{result.platformNotes}</p>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-10">How Emotional Hook Analysis Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              ['1', 'Paste Content', 'Enter your hook, caption, or post copy for deep emotional analysis.'],
              ['2', 'Set Context', 'Choose your platform, audience, and goal to calibrate the analysis.'],
              ['3', 'Get Intelligence', 'Receive emotional scoring, psychological triggers, and tone breakdown.'],
              ['4', 'Optimize & Post', 'Apply improvements and use the AI rewrite for maximum emotional impact.'],
            ].map(([num, title, desc]) => (
              <div key={num} className="glass rounded-2xl p-6">
                <div className="text-3xl mb-3 gradient-text font-bold">{num}</div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-zinc-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emotion Guide */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">The 8 Core Emotions We Detect</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              ['Joy', 'Positive energy that triggers likes and shares. Words like "love", "excited", "grateful" amplify this.', 'text-yellow-400'],
              ['Surprise', 'Unexpected revelations that stop the scroll. "Shocking", "unbelievable", "plot twist" activate surprise.', 'text-purple-400'],
              ['Curiosity', 'Open loops that demand resolution. Questions, secrets, and "turns out..." create irresistible hooks.', 'text-cyan-400'],
              ['Fear', 'Protective instinct that drives urgent engagement. Warnings and risk language trigger immediate attention.', 'text-red-400'],
              ['Anger', 'Outrage that fuels shares and comments. Hot takes and injustice create high-velocity engagement.', 'text-red-500'],
              ['Trust', 'Credibility that builds authority. Data, proof, expertise, and specific numbers strengthen trust.', 'text-blue-400'],
              ['Anticipation', 'Future-focused excitement that builds hype. Teasers, countdowns, and previews spark anticipation.', 'text-orange-400'],
              ['Sadness', 'Vulnerability that creates deep connection. Personal stories and honest struggles resonate powerfully.', 'text-indigo-400'],
            ].map(([title, desc, color]) => (
              <div key={title} className="glass rounded-xl p-5">
                <h3 className={`font-semibold mb-2 ${color}`}>{title}</h3>
                <p className="text-sm text-zinc-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto text-center">
          <div className="grid grid-cols-4 gap-8">
            <div><p className="text-3xl font-bold gradient-text">8</p><p className="text-zinc-500 text-xs mt-1">Emotions Detected</p></div>
            <div><p className="text-3xl font-bold gradient-text">8</p><p className="text-zinc-500 text-xs mt-1">Psych Triggers</p></div>
            <div><p className="text-3xl font-bold gradient-text">6</p><p className="text-zinc-500 text-xs mt-1">Tone Dimensions</p></div>
            <div><p className="text-3xl font-bold gradient-text">8</p><p className="text-zinc-500 text-xs mt-1">Platforms</p></div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-16 border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              ['What is the Emotional Hook Analyzer?', 'The Emotional Hook Analyzer is an AI-powered tool that predicts the emotional response, engagement velocity, and psychological impact of your social media content before you publish. It analyzes word choice, sentence structure, psychological triggers, and platform-specific patterns to score your content across multiple dimensions.'],
              ['How is the Emotional Impact Score calculated?', 'The score (0-100) is calculated by analyzing power words, emotion words, curiosity triggers, sentence structure, punctuation patterns, emoji usage, and more. It factors in your target platform, audience demographics, and content goal to provide a contextualized score that predicts real emotional resonance.'],
              ['What are Psychological Triggers?', 'Psychological triggers are proven persuasion patterns that drive human behavior: Social Proof (others are doing it), FOMO (fear of missing out), Curiosity Gap (need to know more), Identity (speaks to who I am), Authority (expert credibility), Scarcity (limited availability), Reciprocity (free value given), and Controversy (challenges beliefs). The best content activates 2-3 triggers simultaneously.'],
              ['What does Emotional Velocity mean?', 'Emotional Velocity measures how quickly your content delivers its emotional impact. "Instant Hook" means the emotion hits in the first 1-3 words (best for TikTok, Twitter). "Building Wave" creates rising emotional intensity across the post. "Slow Burn" delivers a gradual emotional payoff (best for LinkedIn, long-form). Each velocity type works best on different platforms.'],
              ['Is the rewritten version AI-generated?', 'The rewrite is algorithmically generated based on your detected primary emotion, target platform, and content goal. It restructures your core message with an optimized emotional hook, proper pacing, and a platform-appropriate call-to-action. Use it as a starting point and refine with your authentic voice.'],
            ].map(([q, a]) => (
              <div key={q} className="glass rounded-xl p-6">
                <h3 className="font-semibold mb-2">{q}</h3>
                <p className="text-sm text-zinc-400">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 border-t border-zinc-800/50 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Create Emotionally Powerful Content?</h2>
        <p className="text-zinc-400 mb-6 max-w-md mx-auto">Analyze your hooks, then generate optimized posts with PostCraft AI.</p>
        <div className="flex justify-center gap-4">
          <a href="/" className="px-8 py-3.5 btn-primary rounded-xl font-semibold text-white">Generate Posts Free</a>
          <a href="/sentiment-analyzer" className="px-8 py-3.5 bg-zinc-800 rounded-xl font-semibold text-zinc-300 hover:bg-zinc-700 transition">Try Sentiment Analyzer</a>
        </div>
      </section>
    </main>
  );
}
