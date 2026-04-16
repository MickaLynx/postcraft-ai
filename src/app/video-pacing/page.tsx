'use client';
import { useState } from 'react';

const platforms = ['TikTok', 'Instagram Reels', 'YouTube Shorts', 'LinkedIn Video', 'Facebook Reels', 'Pinterest Video', 'Snapchat Spotlight'] as const;
const contentTypes = ['Tutorial', 'Product Demo', 'Storytelling', 'Behind-the-Scenes', 'Testimonial', 'Comedy/Skit', 'Unboxing', 'Day-in-Life', 'Before/After', 'GRWM', 'Listicle', 'Trend/Challenge'] as const;
const pacePreferences = ['Fast Cuts', 'Medium Flow', 'Cinematic Slow', 'Dynamic Mix'] as const;
const hookStyles = ['Question', 'Bold Statement', 'Shocking Stat', 'Visual Surprise', 'Countdown', 'Pattern Interrupt'] as const;
const targetEmotions = ['Excitement', 'Trust', 'FOMO', 'Curiosity', 'Inspiration', 'Entertainment'] as const;
const musicTempos = ['Slow', 'Medium', 'Upbeat', 'Intense', 'No Music'] as const;

interface SceneBreakdown {
  index: number;
  timestamp: string;
  duration: number;
  sceneType: string;
  visualNote: string;
  textOverlay: string;
  transition: string;
}

interface PacingResult {
  pacingScore: number;
  scenes: SceneBreakdown[];
  hookStrategy: { halfSec: string; oneSec: string; threeSec: string };
  retentionCurve: { pct25: number; pct50: number; pct75: number; pct100: number };
  platformTips: string[];
  soundRecommendations: string[];
  cutFrequency: number;
  engagementPeaks: { timestamp: string; action: string }[];
  abSuggestions: { variant: string; change: string; expectedImpact: string }[];
  postingFormatTips: string[];
}

function formatTimestamp(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  const ms = Math.round((seconds % 1) * 10);
  return `${m}:${s.toString().padStart(2, '0')}.${ms}`;
}

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function generatePacing(
  duration: number,
  platform: string,
  contentType: string,
  pace: string,
  hookStyle: string,
  sceneCount: number,
  emotion: string,
  musicTempo: string
): PacingResult {
  const seed = hashStr(`${platform}${contentType}${pace}${hookStyle}${emotion}${musicTempo}${duration}${sceneCount}`);

  // Pace multipliers
  const paceMultipliers: Record<string, number> = {
    'Fast Cuts': 1.6,
    'Medium Flow': 1.0,
    'Cinematic Slow': 0.6,
    'Dynamic Mix': 1.2,
  };
  const paceMult = paceMultipliers[pace] || 1.0;

  // Platform ideal durations and characteristics
  const platformData: Record<string, { idealDuration: number; maxDuration: number; algoWeight: number; tips: string[] }> = {
    'TikTok': {
      idealDuration: 21,
      maxDuration: 180,
      algoWeight: 1.3,
      tips: [
        'TikTok rewards 95%+ watch-through rate — keep total duration under the viewer\'s patience threshold',
        'First frame must be visually arresting — the algorithm measures 0.5s swipe-away rate',
        'Use trending sounds for a 27% average boost in distribution',
        'Loop your ending seamlessly into the beginning for 2-3x replay value',
        'Text overlay in the first 1s increases average watch time by 15%',
      ],
    },
    'Instagram Reels': {
      idealDuration: 15,
      maxDuration: 90,
      algoWeight: 1.2,
      tips: [
        'Reels under 15s get 22% more shares — the algorithm favors replays',
        'Cover frame matters: 60% of Reel discovery is from the Explore grid thumbnail',
        'Use native Instagram audio or Reels-trending music for algorithmic priority',
        'Add closed captions — 85% of Reels are watched without sound initially',
        'Save the CTA for the final 2 seconds to maximize watch-through before action',
      ],
    },
    'YouTube Shorts': {
      idealDuration: 30,
      maxDuration: 60,
      algoWeight: 1.1,
      tips: [
        'YouTube Shorts algorithm weights subscriber conversion — include channel mention at 50% mark',
        'Shorts with a clear title overlay in the first frame get 35% higher CTR',
        'Retention above 70% at the midpoint signals the algorithm to push wider',
        'Cross-promote from long-form videos to Shorts for channel authority boost',
        'Vertical framing with subject centered works best — avoid letterboxing',
      ],
    },
    'LinkedIn Video': {
      idealDuration: 45,
      maxDuration: 600,
      algoWeight: 0.8,
      tips: [
        'LinkedIn rewards dwell time — educational content outperforms entertainment 3:1',
        'First 3 seconds must communicate professional value or lose the scroll',
        'Add subtitles: 79% of LinkedIn video is watched on mute in a professional setting',
        'Include a text-based hook in the post copy that teases the video insight',
        'Tag relevant companies/people to expand reach beyond your network',
      ],
    },
    'Facebook Reels': {
      idealDuration: 20,
      maxDuration: 90,
      algoWeight: 0.9,
      tips: [
        'Facebook Reels prioritize shares — content that prompts "tag a friend" comments wins',
        'The Facebook algorithm deranks recycled TikTok watermarks — always re-export clean',
        'Reels posted to Groups get 4x distribution vs personal profile posts',
        'Engagement in first 30 minutes determines Reel distribution trajectory',
        'Native Facebook music library tracks are weighted higher than imported audio',
      ],
    },
    'Pinterest Video': {
      idealDuration: 18,
      maxDuration: 60,
      algoWeight: 0.7,
      tips: [
        'Pinterest favors "how-to" and aspirational video — pure entertainment underperforms',
        'Add keyword-rich text overlay — Pinterest indexes on-screen text for search',
        'Vertical 2:3 aspect ratio gets 60% more impressions than 9:16 on Pinterest',
        'Include a clear step-by-step structure — listicle format performs best',
        'Pin videos to niche boards with 200+ followers for maximum initial distribution',
      ],
    },
    'Snapchat Spotlight': {
      idealDuration: 15,
      maxDuration: 60,
      algoWeight: 1.0,
      tips: [
        'Snapchat Spotlight rewards raw, unpolished content — over-produced videos underperform',
        'Content that triggers screen taps or replays gets boosted by the algorithm',
        'Keep text overlays minimal — Spotlight is sound-on by default unlike other platforms',
        'POV and reaction-style content gets 40% higher engagement on Spotlight',
        'Post between 6-10 PM local time for maximum Spotlight placement probability',
      ],
    },
  };

  const pd = platformData[platform] || platformData['TikTok'];

  // Calculate pacing score (0-100)
  const durationFit = 1 - Math.min(1, Math.abs(duration - pd.idealDuration) / pd.maxDuration);
  const cutsPerScene = paceMult;
  const sceneDensity = Math.min(1, sceneCount / (duration / 3));
  const basePacingScore = Math.round(
    (durationFit * 35) +
    (cutsPerScene * 15) +
    (sceneDensity * 25) +
    (pd.algoWeight * 20) +
    ((seed % 10) * 0.5)
  );
  const pacingScore = Math.max(20, Math.min(100, basePacingScore));

  // Scene-by-scene breakdown
  const sceneTypes: Record<string, string[]> = {
    'Tutorial': ['Hook/Problem', 'Setup/Context', 'Step 1', 'Step 2', 'Step 3', 'Key Tip', 'Result Reveal', 'CTA/Recap', 'Bonus Tip', 'End Card', 'Transition', 'Close-up Detail', 'Wide Establishing', 'B-Roll Insert', 'Text Summary'],
    'Product Demo': ['Hook/Teaser', 'Problem Statement', 'Product Intro', 'Feature Highlight', 'Usage Demo', 'Close-up Detail', 'Comparison Shot', 'Result/Before-After', 'Social Proof', 'CTA/Buy Now', 'Pricing Flash', 'Unbox Moment', 'Lifestyle Shot', 'Testimonial Clip', 'End Card'],
    'Storytelling': ['Cold Open', 'Setting the Scene', 'Character Intro', 'Tension Build', 'Conflict/Problem', 'Turning Point', 'Resolution Build', 'Climax', 'Resolution', 'Reflection/Lesson', 'Emotional Beat', 'Flashback', 'Dialogue Moment', 'Visual Metaphor', 'Closing'],
    'Behind-the-Scenes': ['Hook/Curiosity', 'Location Reveal', 'Process Start', 'Detailed Work', 'Mistake/Outtake', 'Problem Solving', 'Progress Shot', 'Team Moment', 'Final Touch', 'Reveal/Result', 'Fun Fact', 'Close-up Detail', 'Time-Lapse', 'Reaction Shot', 'End Card'],
    'Testimonial': ['Hook Quote', 'Person Intro', 'Problem Context', 'Discovery Moment', 'Experience Detail', 'Key Benefit', 'Emotional Moment', 'Result/Outcome', 'Recommendation', 'CTA', 'Stats Overlay', 'B-Roll Support', 'Before Context', 'After Context', 'Social Proof'],
    'Comedy/Skit': ['Setup/Premise', 'Character Intro', 'Situation Build', 'Escalation', 'Comedic Beat', 'Plot Twist', 'Reaction Shot', 'Punchline', 'Tag/Extra Joke', 'End/Credits', 'Physical Comedy', 'Callback', 'Break Character', 'Sound Effect Beat', 'Blooper'],
    'Unboxing': ['Package Tease', 'First Impression', 'Opening Moment', 'Item Reveal', 'Reaction Shot', 'Close-up Detail', 'Feature Tour', 'Size Comparison', 'First Use', 'Verdict', 'Accessory Check', 'Quality Check', 'Vs Expectation', 'Rating Moment', 'End Card'],
    'Day-in-Life': ['Morning Hook', 'Wake-up/Start', 'Morning Routine', 'Commute/Travel', 'Work Highlight', 'Lunch/Break', 'Afternoon Activity', 'Creative Moment', 'Evening Wind-down', 'Reflection/Close', 'Unexpected Moment', 'Transition Shot', 'Detail Insert', 'Time Stamp', 'Night Closing'],
    'Before/After': ['Dramatic Before', 'Problem Context', 'Decision Point', 'Process Start', 'Mid-Process', 'Challenge Moment', 'Breakthrough', 'Final Steps', 'The Reveal', 'Side-by-Side', 'Stats Comparison', 'Reaction', 'Key Learning', 'Tips Card', 'CTA/Follow'],
    'GRWM': ['Outfit Tease', 'Starting Look', 'Product 1', 'Application/Step', 'Product 2', 'Technique Tip', 'Halfway Check', 'Product 3', 'Final Touches', 'Full Reveal', 'Mirror Check', 'Products Lineup', 'Close-up Detail', 'Outfit Match', 'Out the Door'],
    'Listicle': ['Hook/Count Tease', 'Item #1', 'Item #2', 'Item #3', 'Surprise Pick', 'Item #4', 'Honorable Mention', 'Item #5', 'Top Pick Reveal', 'CTA/Comment', 'Transition Card', 'Detail Shot', 'Comparison', 'Audience Pick', 'End Recap'],
    'Trend/Challenge': ['Trend Hook', 'Context/Origin', 'Attempt Start', 'Building Up', 'Key Moment', 'Reaction', 'Nailed It/Fail', 'Slow-Mo Replay', 'Commentary', 'Call to Action', 'Behind Attempt', 'Bloopers', 'Side Angle', 'Celebration', 'Challenge Others'],
  };

  const transitionTypes = ['Hard Cut', 'Swipe', 'Zoom In', 'Zoom Out', 'Whip Pan', 'Fade', 'Match Cut', 'J-Cut', 'L-Cut', 'Jump Cut', 'Morph', 'Flash', 'Slide', 'Spin', 'Dissolve'];
  const visualNotes: Record<string, string[]> = {
    'Excitement': ['High contrast, saturated colors', 'Dynamic camera movement', 'Quick zoom punches', 'Particle/confetti effects', 'Bright lighting pop'],
    'Trust': ['Warm neutral tones', 'Steady camera, eye-level', 'Clean composition', 'Soft natural lighting', 'Professional backdrop'],
    'FOMO': ['Countdown timer overlay', 'Urgent color accents (red/orange)', 'Crowd/social proof shots', 'Limited stock indicators', 'Fast-paced montage'],
    'Curiosity': ['Partial reveal/blur', 'Slow zoom into detail', 'Split screen tease', 'Text question overlay', 'Shadowed/mysterious lighting'],
    'Inspiration': ['Golden hour lighting', 'Wide establishing shots', 'Slow motion highlights', 'Cinematic letterbox', 'Aspirational lifestyle framing'],
    'Entertainment': ['Bright poppy colors', 'Snappy whip pans', 'Reaction face close-ups', 'Comic text overlays', 'Sound effect sync points'],
  };

  const typeScenes = sceneTypes[contentType] || sceneTypes['Tutorial'];

  // Calculate scene durations using golden ratio distribution
  const phi = 1.618;
  const rawWeights: number[] = [];
  for (let i = 0; i < sceneCount; i++) {
    // First and last scenes slightly shorter, middle scenes weighted by importance
    const positionFactor = i === 0 ? 0.7 : i === sceneCount - 1 ? 0.6 : 1.0;
    // Create a curve: scenes near 30-40% mark get more time (key content)
    const normalizedPos = i / (sceneCount - 1 || 1);
    const importanceCurve = 0.5 + 0.5 * Math.sin(normalizedPos * Math.PI * 0.8 + 0.3);
    const paceAdjust = pace === 'Dynamic Mix'
      ? (i % 2 === 0 ? 1.2 : 0.8)
      : 1.0;
    rawWeights.push(positionFactor * importanceCurve * paceAdjust);
  }
  const totalWeight = rawWeights.reduce((a, b) => a + b, 0);
  const sceneDurations = rawWeights.map(w => Math.max(0.5, (w / totalWeight) * duration));
  // Normalize to exact duration
  const durationSum = sceneDurations.reduce((a, b) => a + b, 0);
  const correctionFactor = duration / durationSum;
  const finalDurations = sceneDurations.map(d => Math.round(d * correctionFactor * 10) / 10);
  // Fix rounding error on last scene
  const finalSum = finalDurations.reduce((a, b) => a + b, 0);
  finalDurations[finalDurations.length - 1] += Math.round((duration - finalSum) * 10) / 10;

  let currentTime = 0;
  const scenes: SceneBreakdown[] = finalDurations.map((dur, i) => {
    const sceneType = typeScenes[i % typeScenes.length];
    const emotionVisuals = visualNotes[emotion] || visualNotes['Excitement'];
    const visualNote = emotionVisuals[i % emotionVisuals.length];
    const transition = i < sceneCount - 1
      ? transitionTypes[(seed + i * 7) % transitionTypes.length]
      : 'End';

    const textOverlays: Record<string, string[]> = {
      'Tutorial': ['Watch this...', 'Step ' + (i + 1), 'Pro tip:', 'Result:', 'Save this!', 'Try this now', 'Key takeaway', 'Don\'t skip this', 'Here\'s the trick', 'Mind = blown'],
      'Product Demo': ['Wait for it...', 'The problem:', 'Meet [product]', 'Look at this', 'Game changer', 'Before vs After', 'Only $XX', 'Link in bio', 'You need this', 'Swipe up now'],
      'Storytelling': ['Story time...', 'It started when...', 'Then this happened', 'Nobody expected', 'The turning point', 'And then...', 'Plot twist:', 'Lesson learned:', 'The truth is...', 'Never forget this'],
      'Behind-the-Scenes': ['Ever wondered how?', 'Behind the scenes', 'The process:', 'Real talk:', 'Oops...', 'The fix:', 'Almost there', 'Team effort', 'Final touch', 'The reveal...'],
      'Testimonial': ['"This changed everything"', 'My story:', 'The problem was...', 'I discovered...', 'The difference:', 'Best part?', 'Honestly...', 'The results:', 'I recommend...', 'Try it yourself'],
      'Comedy/Skit': ['POV:', 'When you...', 'Nobody:', 'Me:', 'Wait for it...', 'Plot twist:', '*record scratch*', 'The end... or is it?', 'Bonus:', 'Credits'],
      'Unboxing': ['Let\'s unbox!', 'First look:', 'Packaging: A+', 'The reveal!', 'My reaction:', 'Up close:', 'Features:', 'Size check:', 'First test:', 'Verdict:'],
      'Day-in-Life': ['A day with me', '6:00 AM', 'Morning routine', 'On the way', 'Work mode', 'Lunch break', 'Afternoon vibes', 'Creative time', 'Winding down', 'Good night'],
      'Before/After': ['Before:', 'The problem', 'Time to change', 'Starting...', 'In progress', 'Almost...', 'Breakthrough!', 'Final steps', 'After:', 'Side by side'],
      'GRWM': ['GRWM!', 'Starting base', 'Product 1:', 'Blending...', 'Product 2:', 'Quick tip:', 'Halfway check', 'Product 3:', 'Final touches', 'Ready!'],
      'Listicle': ['Top [X] list:', '#1', '#2', '#3', 'Surprise pick:', '#4', 'Honorable mention', '#5', 'The BEST one:', 'Follow for more'],
      'Trend/Challenge': ['Trying the trend!', 'Context:', 'Attempt #1', 'Building up...', 'The moment:', 'My reaction:', 'Nailed it? / Failed?', 'Slow mo:', 'My take:', 'Your turn!'],
    };
    const overlays = textOverlays[contentType] || textOverlays['Tutorial'];
    const textOverlay = overlays[i % overlays.length];

    const scene: SceneBreakdown = {
      index: i + 1,
      timestamp: formatTimestamp(currentTime),
      duration: dur,
      sceneType,
      visualNote,
      textOverlay,
      transition,
    };
    currentTime += dur;
    return scene;
  });

  // Hook strategy
  const hookStrategies: Record<string, { halfSec: string; oneSec: string; threeSec: string }> = {
    'Question': {
      halfSec: 'Display a provocative question as bold text overlay with zoom-in effect',
      oneSec: 'Add voice-over reading the question + eye-catching visual that relates to the answer',
      threeSec: 'Tease the answer with a "you won\'t believe" framing, then pivot into the first real scene',
    },
    'Bold Statement': {
      halfSec: 'Flash a controversial one-liner in large bold text — no context yet',
      oneSec: 'Add a confident face-to-camera delivery or dramatic voice-over of the statement',
      threeSec: 'Follow the statement with "here\'s proof" or "let me show you why" to justify the hook',
    },
    'Shocking Stat': {
      halfSec: 'Large animated number with a dramatic sound effect (whoosh/impact)',
      oneSec: 'Add context overlay: "X% of people don\'t know this about [topic]"',
      threeSec: 'Transition from the stat to a visual that proves it — graph, demo, or real example',
    },
    'Visual Surprise': {
      halfSec: 'Start mid-action or with an unexpected image that breaks pattern',
      oneSec: 'Hold the surprising visual, add subtle text "yes, this is real" or "watch what happens"',
      threeSec: 'Reveal context for the surprise and transition into the main content with a match cut',
    },
    'Countdown': {
      halfSec: 'Flash "3... 2... 1..." with rapid cuts or a countdown sound effect',
      oneSec: 'Reach zero and reveal the first impactful visual or statement',
      threeSec: 'Build anticipation by showing quick flashes of what\'s coming before the full reveal',
    },
    'Pattern Interrupt': {
      halfSec: 'Start with something completely unexpected — wrong orientation, silence, black screen',
      oneSec: 'Break into the real content abruptly — the contrast grabs attention',
      threeSec: 'Acknowledge the interrupt ("bet that got your attention") and smoothly transition to content',
    },
  };
  const hookStrategy = hookStrategies[hookStyle] || hookStrategies['Question'];

  // Retention curve — based on platform, duration, and pacing
  const baseRetention = {
    pct25: Math.min(98, 70 + (pacingScore * 0.25) + (pd.algoWeight * 5)),
    pct50: Math.min(90, 50 + (pacingScore * 0.3) + (pd.algoWeight * 5)),
    pct75: Math.min(80, 30 + (pacingScore * 0.35) + (pd.algoWeight * 8)),
    pct100: Math.min(70, 15 + (pacingScore * 0.4) + (pd.algoWeight * 10)),
  };
  // Shorter videos have higher retention
  const durationBonus = Math.max(0, (30 - duration) * 0.3);
  const retentionCurve = {
    pct25: Math.round(Math.min(99, baseRetention.pct25 + durationBonus)),
    pct50: Math.round(Math.min(95, baseRetention.pct50 + durationBonus * 0.8)),
    pct75: Math.round(Math.min(85, baseRetention.pct75 + durationBonus * 0.6)),
    pct100: Math.round(Math.min(75, baseRetention.pct100 + durationBonus * 0.4)),
  };

  // Platform tips (pick 5)
  const platformTips = pd.tips.slice(0, 5);

  // Sound/music recommendations
  const soundRecs: Record<string, string[]> = {
    'Slow': [
      'Use ambient pads or lo-fi beats at 60-80 BPM to match cinematic pacing',
      'Layer subtle foley sounds (nature, room tone) under the music for depth',
      'Place musical swells at scene transitions to guide viewer emotion',
    ],
    'Medium': [
      'Use chill pop or indie tracks at 90-110 BPM for comfortable viewing pace',
      'Sync scene transitions to musical beats for satisfying rhythm',
      'Add subtle risers before key reveals to build micro-tension',
    ],
    'Upbeat': [
      'Use energetic pop/electronic tracks at 120-140 BPM to maintain momentum',
      'Cut on every beat or every other beat for a music-video feel',
      'Use bass drops or beat switches at your engagement peak moments',
    ],
    'Intense': [
      'Use dramatic orchestral or trap beats at 140-160 BPM for high energy',
      'Layer impact sound effects (booms, whooshes) at every major transition',
      'Use silence-to-drop contrasts at your climax scene for maximum impact',
    ],
    'No Music': [
      'Use high-quality voice-over as the primary audio — invest in a good mic',
      'Add intentional foley (footsteps, clicks, ambient sound) to prevent audio emptiness',
      'Strategic silence can be more powerful than music — use it before key reveals',
    ],
  };
  const soundRecommendations = soundRecs[musicTempo] || soundRecs['Medium'];

  // Cut frequency (cuts per minute)
  const baseCPM: Record<string, number> = {
    'Fast Cuts': 24,
    'Medium Flow': 12,
    'Cinematic Slow': 6,
    'Dynamic Mix': 16,
  };
  const cutFrequency = Math.round((baseCPM[pace] || 12) * pd.algoWeight);

  // Engagement peaks — place at key moments
  const engagementPeaks: { timestamp: string; action: string }[] = [];
  const peakActions = [
    'Place your most shareable visual/statement here',
    'Insert a pattern interrupt to recapture attention',
    'Deliver your key value proposition / main takeaway',
    'Show social proof or result to build credibility',
    'CTA moment — tell viewers what to do next',
  ];
  const peakPositions = [0.08, 0.25, 0.5, 0.75, 0.92];
  peakPositions.forEach((pos, i) => {
    const peakTime = pos * duration;
    engagementPeaks.push({
      timestamp: formatTimestamp(peakTime),
      action: peakActions[i],
    });
  });

  // A/B test suggestions
  const abSuggestions: { variant: string; change: string; expectedImpact: string }[] = [
    {
      variant: 'A: Current Pacing',
      change: `${sceneCount} scenes at ${pace.toLowerCase()} pace`,
      expectedImpact: `Baseline — ${retentionCurve.pct50}% retention at midpoint`,
    },
    {
      variant: 'B: Faster Start',
      change: `Reduce first 3 scenes to 60% duration, redistribute time to middle`,
      expectedImpact: `+5-12% improvement in first-3-second retention`,
    },
    {
      variant: 'C: Different Hook',
      change: `Swap "${hookStyle}" hook for a "${hookStyles[(hookStyles.indexOf(hookStyle as typeof hookStyles[number]) + 1) % hookStyles.length]}" hook`,
      expectedImpact: `+3-8% change in swipe-away rate (test both to confirm)`,
    },
    {
      variant: 'D: Shorter Version',
      change: `Cut to ${Math.max(5, Math.round(duration * 0.7))}s — remove lowest-value scenes`,
      expectedImpact: `+10-20% completion rate, potentially lower total watch time`,
    },
    {
      variant: 'E: Loop Edit',
      change: 'Edit the last frame to seamlessly match the first frame for auto-loop',
      expectedImpact: '+15-30% replay rate — algorithms count replays as engagement',
    },
  ];

  // Posting format tips
  const postingFormatTips = [
    `Aspect ratio: 9:16 vertical (${platform === 'Pinterest Video' ? '2:3 also works well on Pinterest' : '1080x1920px'})`,
    `Export at ${platform === 'YouTube Shorts' ? '1080p minimum — YouTube downscales but quality matters for discovery' : '1080p, H.264 codec, 30fps minimum'}`,
    duration > 60
      ? 'Consider splitting into a multi-part series — each part becomes its own piece of content'
      : `${duration}s is ${duration <= pd.idealDuration ? 'within' : 'above'} the ${platform} sweet spot of ~${pd.idealDuration}s`,
    `File size: keep under ${platform === 'LinkedIn Video' ? '200MB' : '100MB'} for optimal upload processing speed`,
    'Add captions/subtitles file (.SRT) or burn them in — accessibility boosts reach by 16% on average',
    `Thumbnail: ${platform === 'YouTube Shorts' ? 'Custom thumbnail with text + face for Shorts shelf' : 'First frame should be thumbnail-worthy — high contrast, clear subject, readable text'}`,
  ];

  return {
    pacingScore,
    scenes,
    hookStrategy,
    retentionCurve,
    platformTips,
    soundRecommendations,
    cutFrequency,
    engagementPeaks,
    abSuggestions,
    postingFormatTips,
  };
}

export default function VideoPacingPage() {
  const [duration, setDuration] = useState(30);
  const [platform, setPlatform] = useState<string>('TikTok');
  const [contentType, setContentType] = useState<string>('Tutorial');
  const [pace, setPace] = useState<string>('Medium Flow');
  const [hookStyle, setHookStyle] = useState<string>('Question');
  const [sceneCount, setSceneCount] = useState(6);
  const [emotion, setEmotion] = useState<string>('Excitement');
  const [musicTempo, setMusicTempo] = useState<string>('Upbeat');
  const [result, setResult] = useState<PacingResult | null>(null);

  const handleGenerate = () => {
    setResult(generatePacing(duration, platform, contentType, pace, hookStyle, sceneCount, emotion, musicTempo));
  };

  return (
    <main className="min-h-screen bg-zinc-950 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Video Pacing Optimizer</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">AI-powered pacing engine that generates <strong className="text-white">scene-by-scene timing, hook strategy, and retention predictions</strong> optimized for each platform&apos;s algorithm.</p>

        {/* Inputs */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Video Duration (seconds)</label>
            <input type="number" min={3} max={600} value={duration} onChange={e => setDuration(Math.max(3, Math.min(600, Number(e.target.value))))} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white" />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Platform</label>
            <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {platforms.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Content Type</label>
            <select value={contentType} onChange={e => setContentType(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {contentTypes.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Pace Preference</label>
            <select value={pace} onChange={e => setPace(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {pacePreferences.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Hook Style</label>
            <select value={hookStyle} onChange={e => setHookStyle(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {hookStyles.map(h => <option key={h}>{h}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Scene Count (2-15)</label>
            <input type="number" min={2} max={15} value={sceneCount} onChange={e => setSceneCount(Math.max(2, Math.min(15, Number(e.target.value))))} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white" />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Target Emotion</label>
            <select value={emotion} onChange={e => setEmotion(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {targetEmotions.map(e => <option key={e}>{e}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Music Tempo</label>
            <select value={musicTempo} onChange={e => setMusicTempo(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {musicTempos.map(m => <option key={m}>{m}</option>)}
            </select>
          </div>
        </div>

        <button onClick={handleGenerate} className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition">
          Optimize Pacing
        </button>

        {result && (
          <div className="mt-10 space-y-6">
            {/* Pacing Score */}
            <div className="bg-zinc-900 border border-violet-500/30 rounded-xl p-6 text-center">
              <h2 className="text-sm text-zinc-400 mb-2 uppercase tracking-wider">Overall Pacing Score</h2>
              <div className="text-6xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">{result.pacingScore}</div>
              <p className="text-zinc-500 text-sm mt-2">
                {result.pacingScore >= 80 ? 'Excellent pacing — algorithm-optimized for maximum retention' :
                 result.pacingScore >= 60 ? 'Good pacing — minor adjustments could boost performance' :
                 result.pacingScore >= 40 ? 'Average pacing — consider the A/B suggestions below' :
                 'Needs work — review scene timing and platform recommendations'}
              </p>
              <div className="w-full bg-zinc-800 rounded-full h-2 mt-4 max-w-md mx-auto">
                <div className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all" style={{ width: `${result.pacingScore}%` }} />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
                <p className="text-xs text-zinc-500 uppercase">Cut Frequency</p>
                <p className="text-2xl font-bold text-white mt-1">{result.cutFrequency}</p>
                <p className="text-xs text-zinc-500">cuts/min</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
                <p className="text-xs text-zinc-500 uppercase">Total Scenes</p>
                <p className="text-2xl font-bold text-white mt-1">{result.scenes.length}</p>
                <p className="text-xs text-zinc-500">scenes</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
                <p className="text-xs text-zinc-500 uppercase">Avg Scene</p>
                <p className="text-2xl font-bold text-white mt-1">{(duration / sceneCount).toFixed(1)}s</p>
                <p className="text-xs text-zinc-500">duration</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
                <p className="text-xs text-zinc-500 uppercase">Est. Completion</p>
                <p className="text-2xl font-bold text-green-400 mt-1">{result.retentionCurve.pct100}%</p>
                <p className="text-xs text-zinc-500">watch-through</p>
              </div>
            </div>

            {/* Hook Strategy */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Hook Strategy: {hookStyle}</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-zinc-800/50 rounded-lg p-4">
                  <div className="text-xs text-fuchsia-400 font-semibold mb-2 uppercase">First 0.5 seconds</div>
                  <p className="text-sm text-zinc-300">{result.hookStrategy.halfSec}</p>
                </div>
                <div className="bg-zinc-800/50 rounded-lg p-4">
                  <div className="text-xs text-violet-400 font-semibold mb-2 uppercase">First 1 second</div>
                  <p className="text-sm text-zinc-300">{result.hookStrategy.oneSec}</p>
                </div>
                <div className="bg-zinc-800/50 rounded-lg p-4">
                  <div className="text-xs text-blue-400 font-semibold mb-2 uppercase">First 3 seconds</div>
                  <p className="text-sm text-zinc-300">{result.hookStrategy.threeSec}</p>
                </div>
              </div>
            </div>

            {/* Scene-by-Scene Breakdown */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Scene-by-Scene Breakdown</h3>
              <div className="space-y-3">
                {result.scenes.map((scene) => (
                  <div key={scene.index} className="bg-zinc-800/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="bg-violet-500/20 text-violet-300 text-xs font-mono px-2 py-1 rounded">{scene.timestamp}</span>
                        <span className="text-white font-medium text-sm">Scene {scene.index}: {scene.sceneType}</span>
                      </div>
                      <span className="text-zinc-500 text-xs">{scene.duration}s</span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-2 text-xs">
                      <div>
                        <span className="text-zinc-500">Visual: </span>
                        <span className="text-zinc-300">{scene.visualNote}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500">Text overlay: </span>
                        <span className="text-zinc-300">&quot;{scene.textOverlay}&quot;</span>
                      </div>
                      <div>
                        <span className="text-zinc-500">Transition: </span>
                        <span className="text-fuchsia-400">{scene.transition}</span>
                      </div>
                    </div>
                    {/* Duration bar */}
                    <div className="w-full bg-zinc-700 rounded-full h-1 mt-2">
                      <div className="h-1 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" style={{ width: `${Math.min(100, (scene.duration / duration) * 100 * sceneCount)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Retention Curve */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Retention Curve Prediction</h3>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: '25%', value: result.retentionCurve.pct25, time: formatTimestamp(duration * 0.25) },
                  { label: '50%', value: result.retentionCurve.pct50, time: formatTimestamp(duration * 0.5) },
                  { label: '75%', value: result.retentionCurve.pct75, time: formatTimestamp(duration * 0.75) },
                  { label: '100%', value: result.retentionCurve.pct100, time: formatTimestamp(duration) },
                ].map((point) => (
                  <div key={point.label} className="text-center">
                    <div className="text-xs text-zinc-500 mb-2">At {point.label} ({point.time})</div>
                    <div className="relative mx-auto w-16 h-16">
                      <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#27272a" strokeWidth="3" />
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={point.value >= 70 ? '#22c55e' : point.value >= 40 ? '#eab308' : '#ef4444'} strokeWidth="3" strokeDasharray={`${point.value}, 100`} />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">{point.value}%</span>
                    </div>
                    <div className="text-xs text-zinc-500 mt-1">viewers</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Engagement Peaks */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Engagement Peaks</h3>
              <div className="space-y-3">
                {result.engagementPeaks.map((peak, i) => (
                  <div key={i} className="flex items-center gap-4 bg-zinc-800/50 rounded-lg p-3">
                    <span className="bg-fuchsia-500/20 text-fuchsia-300 text-xs font-mono px-2 py-1 rounded whitespace-nowrap">{peak.timestamp}</span>
                    <span className="text-sm text-zinc-300">{peak.action}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Tips + Sound Recommendations */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">{platform} Algorithm Tips</h3>
                <ul className="space-y-2">
                  {result.platformTips.map((tip, i) => (
                    <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-violet-400 shrink-0">{i + 1}.</span><span>{tip}</span></li>
                  ))}
                </ul>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Sound & Music ({musicTempo})</h3>
                <ul className="space-y-2">
                  {result.soundRecommendations.map((rec, i) => (
                    <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-green-400 shrink-0">♪</span><span>{rec}</span></li>
                  ))}
                </ul>
              </div>
            </div>

            {/* A/B Test Suggestions */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">A/B Test Suggestions</h3>
              <div className="space-y-3">
                {result.abSuggestions.map((ab, i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-lg p-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                    <span className="text-violet-300 font-medium text-sm whitespace-nowrap">{ab.variant}</span>
                    <span className="text-zinc-400 text-sm flex-1">{ab.change}</span>
                    <span className="text-green-400 text-xs whitespace-nowrap">{ab.expectedImpact}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Posting Format Tips */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Optimal Posting Format</h3>
              <ul className="space-y-2">
                {result.postingFormatTips.map((tip, i) => (
                  <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-fuchsia-400 shrink-0">-</span><span>{tip}</span></li>
                ))}
              </ul>
            </div>

            {/* Internal Links */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-zinc-400 mb-3">Enhance Your Video Strategy</h3>
              <div className="flex flex-wrap gap-2 text-sm">
                <a href="/video-scripts" className="text-violet-400 hover:text-violet-300 underline">Video Scripts</a>
                <a href="/hooks" className="text-violet-400 hover:text-violet-300 underline">Hook Generator</a>
                <a href="/caption-optimizer" className="text-violet-400 hover:text-violet-300 underline">Caption Optimizer</a>
                <a href="/hashtags" className="text-violet-400 hover:text-violet-300 underline">Hashtag Generator</a>
                <a href="/post-timing" className="text-violet-400 hover:text-violet-300 underline">Post Timing</a>
                <a href="/engagement-calculator" className="text-violet-400 hover:text-violet-300 underline">Engagement Calculator</a>
                <a href="/virality-score" className="text-violet-400 hover:text-violet-300 underline">Virality Score</a>
                <a href="/trend-tracker" className="text-violet-400 hover:text-violet-300 underline">Trend Tracker</a>
              </div>
            </div>
          </div>
        )}

        {/* FAQ */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">Video Pacing FAQ</h2>
          <div className="space-y-4">
            {[
              { q: 'What is video pacing and why does it matter?', a: 'Video pacing is the rhythm and timing of your cuts, scenes, and transitions. On social media, pacing directly impacts retention — the algorithm measures how long viewers watch. Optimal pacing keeps viewers engaged past critical drop-off points (3s, 7s, 15s) where most viewers leave.' },
              { q: 'How many cuts per minute is ideal for short-form video?', a: 'It depends on platform and content type. TikTok and Reels perform best with 15-25 cuts per minute (fast pace). YouTube Shorts can be slightly slower at 10-18. LinkedIn Video prefers 6-12 cuts per minute for a professional feel. The key is matching cut frequency to your audience\'s attention patterns.' },
              { q: 'How important is the first 0.5 seconds of a video?', a: 'Critical. TikTok\'s algorithm measures swipe-away rate within the first 0.5-1 second. If your opening frame doesn\'t stop the scroll, the algorithm deprioritizes your video. A strong visual hook, bold text, or pattern interrupt in the first half-second can improve retention by 20-40%.' },
              { q: 'Should I use music in every video?', a: 'For TikTok and Instagram Reels, trending audio can boost distribution by 15-30%. For LinkedIn and educational content, voice-over without music often performs better. The key is matching audio to intent — entertainment videos benefit from music, while trust-building content may not.' },
              { q: 'What is the ideal video length for each platform?', a: 'TikTok: 15-30s for virality, up to 60s for depth. Instagram Reels: 7-15s for shares, up to 30s for engagement. YouTube Shorts: 30-45s (longer watch time signals). LinkedIn: 30-90s for thought leadership. These are starting points — test with your specific audience.' },
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
              <ul className="space-y-1"><li><a href="/" className="hover:text-white transition">Post Generator</a></li><li><a href="/hooks" className="hover:text-white transition">Hook Generator</a></li><li><a href="/video-scripts" className="hover:text-white transition">Video Scripts</a></li><li><a href="/video-pacing" className="hover:text-white transition">Video Pacing</a></li><li><a href="/carousel-generator" className="hover:text-white transition">Carousel Generator</a></li><li><a href="/poll-quiz" className="hover:text-white transition">Poll & Quiz</a></li></ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Optimization</h4>
              <ul className="space-y-1"><li><a href="/caption-optimizer" className="hover:text-white transition">Caption Optimizer</a></li><li><a href="/hashtags" className="hover:text-white transition">Hashtags</a></li><li><a href="/post-timing" className="hover:text-white transition">Post Timing</a></li><li><a href="/social-seo" className="hover:text-white transition">Social SEO</a></li><li><a href="/virality-score" className="hover:text-white transition">Virality Score</a></li></ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Analytics</h4>
              <ul className="space-y-1"><li><a href="/engagement-calculator" className="hover:text-white transition">Engagement</a></li><li><a href="/sentiment-analyzer" className="hover:text-white transition">Sentiment</a></li><li><a href="/roi-calculator" className="hover:text-white transition">ROI Calculator</a></li><li><a href="/competitor-analysis" className="hover:text-white transition">Competitors</a></li><li><a href="/influencer-score" className="hover:text-white transition">Influencer Score</a></li></ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Strategy</h4>
              <ul className="space-y-1"><li><a href="/brand-voice" className="hover:text-white transition">Brand Voice</a></li><li><a href="/content-calendar" className="hover:text-white transition">Calendar</a></li><li><a href="/campaign" className="hover:text-white transition">Campaign Mode</a></li><li><a href="/persona-builder" className="hover:text-white transition">Persona Builder</a></li><li><a href="/ab-testing" className="hover:text-white transition">A/B Testing</a></li></ul>
            </div>
          </div>
          <p className="text-center text-zinc-600 text-xs mt-8">&copy; 2026 PostCraft AI. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
