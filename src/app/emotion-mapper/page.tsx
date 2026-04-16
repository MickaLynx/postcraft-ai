'use client';
import { useState } from 'react';

const platforms = ['Instagram', 'TikTok', 'Twitter/X', 'LinkedIn', 'YouTube', 'Facebook', 'Pinterest', 'Snapchat'] as const;
const contentTypes = ['Post', 'Video', 'Story', 'Carousel', 'Reel', 'Thread', 'Article', 'Ad Copy'] as const;
const emotionalGoals = ['Inspire Action', 'Build Trust', 'Create Urgency', 'Spark Curiosity', 'Drive Empathy', 'Generate Excitement'] as const;
const toneStyles = ['Warm & Personal', 'Bold & Confident', 'Calm & Reassuring', 'Playful & Fun', 'Professional & Expert', 'Raw & Vulnerable'] as const;

interface EmotionProfile {
  primaryEmotion: string;
  intensity: number;
  secondaryEmotion: string;
  emotionalArc: string;
  audienceResonance: number;
}

interface ToneShift {
  from: string;
  to: string;
  technique: string;
  example: string;
  effectiveness: number;
}

interface EmotionalHook {
  hook: string;
  emotion: string;
  impact: number;
  format: string;
  why: string;
}

interface SentimentGap {
  gap: string;
  opportunity: string;
  contentAngle: string;
  competitorBlindSpot: string;
  potentialReach: number;
}

interface EmotionalTrigger {
  trigger: string;
  category: string;
  universality: number;
  bestFormat: string;
  cautionNote: string;
}

interface ResonanceBooster {
  technique: string;
  emotionalImpact: number;
  effort: string;
  platform: string;
  example: string;
}

interface EmotionMapResult {
  emotionProfile: EmotionProfile;
  toneShifts: ToneShift[];
  emotionalHooks: EmotionalHook[];
  sentimentGaps: SentimentGap[];
  emotionalTriggers: EmotionalTrigger[];
  resonanceBoosters: ResonanceBooster[];
}

function generateEmotionMap(
  platform: string,
  contentType: string,
  emotionalGoal: string,
  toneStyle: string,
  niche: string,
  contentDraft: string
): EmotionMapResult {
  const nicheLabel = niche || 'general audience';
  const draftLabel = contentDraft || 'your content';

  const profileData: Record<string, { primary: string; secondary: string; arc: string; intensity: number; resonance: number }> = {
    'Inspire Action': { primary: 'Motivation', secondary: 'Hope', arc: 'Challenge → Empowerment → Call to Action', intensity: 88, resonance: 85 },
    'Build Trust': { primary: 'Safety', secondary: 'Reliability', arc: 'Vulnerability → Evidence → Reassurance', intensity: 72, resonance: 91 },
    'Create Urgency': { primary: 'FOMO', secondary: 'Anticipation', arc: 'Problem → Escalation → Limited Solution', intensity: 94, resonance: 78 },
    'Spark Curiosity': { primary: 'Wonder', secondary: 'Intrigue', arc: 'Mystery → Revelation → Cliffhanger', intensity: 80, resonance: 87 },
    'Drive Empathy': { primary: 'Compassion', secondary: 'Connection', arc: 'Story → Shared Experience → Unity', intensity: 85, resonance: 92 },
    'Generate Excitement': { primary: 'Joy', secondary: 'Anticipation', arc: 'Tease → Build-Up → Payoff', intensity: 90, resonance: 83 },
  };

  const profile = profileData[emotionalGoal] || profileData['Inspire Action'];

  const toneShiftsData: Record<string, ToneShift[]> = {
    'Warm & Personal': [
      { from: 'Neutral', to: 'Intimate', technique: 'Use "you" and "I" instead of "we" or "one"', example: `Instead of "People in ${nicheLabel} often struggle with..." → "I know you've been through this..."`, effectiveness: 89 },
      { from: 'Formal', to: 'Conversational', technique: 'Replace jargon with everyday analogies', example: 'Instead of "leverage synergies" → "work together like puzzle pieces"', effectiveness: 85 },
      { from: 'Distant', to: 'Empathetic', technique: 'Share a personal micro-story before your point', example: `"Last Tuesday I almost gave up on ${nicheLabel}. Then I realized..."`, effectiveness: 92 },
      { from: 'Generic', to: 'Specific', technique: 'Add sensory details and concrete numbers', example: 'Instead of "it was hard" → "I stared at my screen for 3 hours, coffee going cold"', effectiveness: 87 },
      { from: 'Preachy', to: 'Relatable', technique: 'Acknowledge your own imperfections first', example: '"I used to make this exact mistake — here\'s what I learned the hard way"', effectiveness: 90 },
    ],
    'Bold & Confident': [
      { from: 'Hesitant', to: 'Assertive', technique: 'Remove hedging language (maybe, perhaps, kind of)', example: 'Instead of "This might help you..." → "This will change how you think about..."', effectiveness: 91 },
      { from: 'Agreeable', to: 'Provocative', technique: 'Challenge a commonly held belief in your niche', example: `"Everything you've been told about ${nicheLabel} is backwards. Here's proof."`, effectiveness: 88 },
      { from: 'Passive', to: 'Commanding', technique: 'Use imperative verbs to open sentences', example: '"Stop scrolling. Read this. Apply it today."', effectiveness: 86 },
      { from: 'Safe', to: 'Contrarian', technique: 'Take a clear stance on a divisive topic', example: `"Unpopular opinion: the #1 ${nicheLabel} advice is actually holding you back."`, effectiveness: 84 },
      { from: 'Wordy', to: 'Punchy', technique: 'Cut sentences to under 10 words for key points', example: '"3 words. Consistency beats talent. Always."', effectiveness: 90 },
    ],
    'Calm & Reassuring': [
      { from: 'Alarming', to: 'Grounding', technique: 'Acknowledge the problem, then immediately offer perspective', example: '"Yes, the market is volatile. But here\'s what history tells us..."', effectiveness: 88 },
      { from: 'Overwhelming', to: 'Simple', technique: 'Break complex info into 3 digestible points', example: `"${nicheLabel} simplified: 1) Start here. 2) Focus on this. 3) Ignore everything else."`, effectiveness: 91 },
      { from: 'Urgent', to: 'Patient', technique: 'Use "when you\'re ready" language instead of deadlines', example: '"No rush. When you\'re ready, this framework will be here."', effectiveness: 82 },
      { from: 'Judgmental', to: 'Understanding', technique: 'Replace "you should" with "many people find that"', example: '"Many people in your position find that starting small works best."', effectiveness: 86 },
      { from: 'Cold', to: 'Warm', technique: 'Add phrases that normalize the struggle', example: '"It\'s completely normal to feel lost at this stage. I did too."', effectiveness: 89 },
    ],
    'Playful & Fun': [
      { from: 'Boring', to: 'Entertaining', technique: 'Add unexpected comparisons or pop culture references', example: `"${nicheLabel} is like dating — if you\'re trying too hard, it shows."`, effectiveness: 87 },
      { from: 'Serious', to: 'Light', technique: 'Use self-deprecating humor before the lesson', example: '"I spent 6 months doing this wrong so you don\'t have to (you\'re welcome)"', effectiveness: 90 },
      { from: 'Dry', to: 'Vivid', technique: 'Turn data points into visual metaphors', example: '"Your engagement rate is a garden — stop watering the weeds"', effectiveness: 84 },
      { from: 'Corporate', to: 'Human', technique: 'Write like you\'re texting a smart friend', example: '"ok but hear me out — what if we just... didn\'t do that?"', effectiveness: 88 },
      { from: 'Predictable', to: 'Surprising', technique: 'End with a twist or unexpected takeaway', example: '"The secret to viral content? Stop trying to go viral. (No, seriously.)"', effectiveness: 86 },
    ],
    'Professional & Expert': [
      { from: 'Opinion', to: 'Evidence', technique: 'Cite specific data, studies, or case results', example: `"Our ${nicheLabel} clients saw a 340% increase after implementing this framework."`, effectiveness: 93 },
      { from: 'Surface', to: 'Deep', technique: 'Explain the "why behind the why"', example: '"Most people know X works. But here\'s the neuroscience behind WHY it works..."', effectiveness: 89 },
      { from: 'Trendy', to: 'Timeless', technique: 'Frame advice as principles, not hacks', example: '"Hacks expire. Principles compound. Here are 5 that will outlast any algorithm."', effectiveness: 91 },
      { from: 'Generic', to: 'Niche-specific', technique: 'Use industry-specific vocabulary precisely', example: `"In ${nicheLabel}, the difference between good and great is [specific metric]."`, effectiveness: 87 },
      { from: 'Theoretical', to: 'Practical', technique: 'Always include a "do this today" action step', example: '"Here\'s the framework. Now here\'s exactly how to implement it in 15 minutes."', effectiveness: 90 },
    ],
    'Raw & Vulnerable': [
      { from: 'Polished', to: 'Authentic', technique: 'Share the messy middle, not just the outcome', example: `"I almost quit ${nicheLabel} last month. Here's the text I drafted to my partner..."`, effectiveness: 94 },
      { from: 'Perfect', to: 'Human', technique: 'Admit what you still don\'t know', example: '"5 years in and I still struggle with this. But here\'s what I\'ve figured out so far."', effectiveness: 91 },
      { from: 'Teaching', to: 'Processing', technique: 'Write as if thinking out loud, not lecturing', example: '"I\'m not sure I have the answer yet, but here\'s what I\'m noticing..."', effectiveness: 86 },
      { from: 'Curated', to: 'Unfiltered', technique: 'Start with the uncomfortable truth', example: '"I lost $50K on this mistake. Here\'s exactly how it happened."', effectiveness: 93 },
      { from: 'Defensive', to: 'Open', technique: 'Invite criticism and different perspectives', example: '"I might be wrong about this. Tell me why in the comments."', effectiveness: 85 },
    ],
  };

  const emotionalHooksData: Record<string, EmotionalHook[]> = {
    'Inspire Action': [
      { hook: `"I was exactly where you are in ${nicheLabel}. This one shift changed everything."`, emotion: 'Hope', impact: 92, format: 'Story opener', why: 'Creates identification + promise of transformation' },
      { hook: '"Stop waiting for the perfect moment. Here\'s your permission slip to start today."', emotion: 'Empowerment', impact: 88, format: 'Direct address', why: 'Removes self-doubt barrier, creates agency' },
      { hook: '"The gap between where you are and where you want to be is exactly 3 steps."', emotion: 'Clarity', impact: 85, format: 'Framework tease', why: 'Makes overwhelming goals feel achievable' },
      { hook: `"Everyone in ${nicheLabel} talks about X. Nobody talks about what actually moves the needle."`, emotion: 'Revelation', impact: 90, format: 'Contrarian opening', why: 'Positions you as insider with real knowledge' },
      { hook: '"Your future self will thank you for reading this right now."', emotion: 'Self-investment', impact: 83, format: 'Future pacing', why: 'Creates emotional stake in consuming the content' },
      { hook: '"I\'m going to share something I\'ve never posted publicly before."', emotion: 'Exclusivity', impact: 91, format: 'Vulnerability opener', why: 'Creates intimacy and urgency to read' },
    ],
    'Build Trust': [
      { hook: '"Here\'s exactly how much money I made last month — and how."', emotion: 'Transparency', impact: 94, format: 'Income report', why: 'Radical transparency builds instant credibility' },
      { hook: `"I've helped 847 ${nicheLabel} professionals. Here are the 3 patterns I see in ALL of them."`, emotion: 'Authority', impact: 89, format: 'Data-backed claim', why: 'Specific numbers + pattern recognition = expertise' },
      { hook: '"Honest review: I tried every tool in this category. Most are garbage. Here are the 2 that work."', emotion: 'Reliability', impact: 87, format: 'Honest curation', why: 'Willingness to be negative builds trust in positives' },
      { hook: '"This is the advice I give my closest friends (for free)."', emotion: 'Generosity', impact: 86, format: 'Insider knowledge', why: 'Framing as personal advice creates trust' },
      { hook: '"I was wrong about this for 3 years. Here\'s what changed my mind."', emotion: 'Intellectual honesty', impact: 91, format: 'Correction narrative', why: 'Admitting mistakes builds more trust than being right' },
      { hook: '"Before you buy anything, read this. It will save you thousands."', emotion: 'Protection', impact: 88, format: 'Guardian angle', why: 'Positioning as protector, not seller' },
    ],
    'Create Urgency': [
      { hook: '"This window closes in 48 hours. Here\'s why that matters for you."', emotion: 'Time pressure', impact: 90, format: 'Deadline', why: 'Genuine scarcity triggers loss aversion' },
      { hook: `"${nicheLabel} is changing faster than anyone realizes. Here's what's coming."`, emotion: 'Fear of obsolescence', impact: 88, format: 'Industry shift', why: 'Professional survival instinct is powerful' },
      { hook: '"Every day you wait, your competitors are doing this."', emotion: 'Competitive anxiety', impact: 85, format: 'Comparison', why: 'Social comparison drives action' },
      { hook: '"I wish someone had told me this 5 years ago. Don\'t make my mistake."', emotion: 'Regret prevention', impact: 92, format: 'Hindsight wisdom', why: 'Regret is a stronger motivator than aspiration' },
      { hook: '"The cost of inaction is higher than the cost of getting it wrong."', emotion: 'Calculated risk', impact: 84, format: 'Risk framing', why: 'Reframes doing nothing as the risky choice' },
      { hook: '"3 months from now you\'ll wish you started today."', emotion: 'Future regret', impact: 87, format: 'Time projection', why: 'Connects present action to future emotion' },
    ],
    'Spark Curiosity': [
      { hook: `"There's a hidden pattern in ${nicheLabel} that nobody is talking about."`, emotion: 'Intrigue', impact: 93, format: 'Mystery opener', why: 'Information gap theory — brain needs closure' },
      { hook: '"I analyzed 10,000 posts. The #1 factor isn\'t what you think."', emotion: 'Surprise anticipation', impact: 91, format: 'Data reveal tease', why: 'Challenges assumptions + promises insight' },
      { hook: '"What if everything you know about X is based on a myth?"', emotion: 'Cognitive dissonance', impact: 88, format: 'Belief challenge', why: 'Forces re-evaluation, impossible to ignore' },
      { hook: '"The most successful people in this space do something counterintuitive."', emotion: 'Fascination', impact: 86, format: 'Paradox tease', why: 'Counterintuitive claims demand explanation' },
      { hook: '"I found a loophole that changes the entire game."', emotion: 'Discovery', impact: 84, format: 'Secret reveal', why: 'Everyone wants an unfair advantage' },
      { hook: '"This took me 2 years to figure out. I\'m giving it away in 60 seconds."', emotion: 'Value compression', impact: 90, format: 'Effort-to-reward', why: 'Massive value with minimal effort = irresistible' },
    ],
    'Drive Empathy': [
      { hook: '"Nobody talks about how lonely this journey can be."', emotion: 'Validation', impact: 93, format: 'Shared struggle', why: 'Naming unspoken feelings creates instant bond' },
      { hook: `"If you're in ${nicheLabel} and feeling overwhelmed, this is for you."`, emotion: 'Being seen', impact: 90, format: 'Direct identification', why: 'Specificity makes people feel personally addressed' },
      { hook: '"I got this DM yesterday and it broke my heart."', emotion: 'Compassion', impact: 88, format: 'Story seed', why: 'Real messages from real people create connection' },
      { hook: '"Behind every successful post is a person who almost didn\'t hit publish."', emotion: 'Humanization', impact: 85, format: 'Behind-the-scenes', why: 'Reveals universal vulnerability in success' },
      { hook: '"You\'re not behind. You\'re not broken. Here\'s the truth about timelines."', emotion: 'Relief', impact: 92, format: 'Reassurance', why: 'Addresses comparison anxiety directly' },
      { hook: '"The best advice I ever got was: stop comparing your chapter 1 to someone else\'s chapter 20."', emotion: 'Perspective', impact: 86, format: 'Wisdom share', why: 'Reframes comparison as unfair measurement' },
    ],
    'Generate Excitement': [
      { hook: '"Something big is coming and I can finally share it."', emotion: 'Anticipation', impact: 91, format: 'Reveal tease', why: 'Exclusivity + anticipation = maximum engagement' },
      { hook: `"We just broke our own record in ${nicheLabel}. Here's how."`, emotion: 'Celebration', impact: 87, format: 'Win share', why: 'Success energy is contagious' },
      { hook: '"This is the most exciting development in our space in years."', emotion: 'Wonder', impact: 85, format: 'Industry excitement', why: 'Positions you as enthusiastic insider' },
      { hook: '"I\'ve been working on this for 6 months. It\'s finally ready."', emotion: 'Payoff', impact: 89, format: 'Launch build-up', why: 'Effort + patience = perceived value' },
      { hook: '"Drop everything and watch this. I\'m not exaggerating."', emotion: 'Urgency + Joy', impact: 83, format: 'Interruption pattern', why: 'Bold confidence creates immediate action' },
      { hook: `"If you love ${nicheLabel}, today is your lucky day."`, emotion: 'Serendipity', impact: 86, format: 'Gift framing', why: 'Positions content as unexpected treasure' },
    ],
  };

  const sentimentGapsData: Record<string, SentimentGap[]> = {
    'Instagram': [
      { gap: 'Over-polished content fatigue', opportunity: 'Raw, unedited behind-the-scenes content', contentAngle: `Show the messy reality of ${nicheLabel} — mistakes, failures, real process`, competitorBlindSpot: 'Most creators still over-produce — authenticity is scarce', potentialReach: 88 },
      { gap: 'Inspiration without action steps', opportunity: 'Motivational content with specific how-tos', contentAngle: 'Every inspirational post should end with 1 concrete action item', competitorBlindSpot: 'Inspirational accounts rarely provide actionable next steps', potentialReach: 85 },
      { gap: 'Highlight reel comparison anxiety', opportunity: 'Normalize the journey content', contentAngle: `Share your actual timeline in ${nicheLabel} — including the slow months`, competitorBlindSpot: 'Creators hide their struggles to maintain authority', potentialReach: 91 },
      { gap: 'Generic advice recycling', opportunity: 'Niche-specific deep dives', contentAngle: `Ultra-specific ${nicheLabel} strategies that only work for your exact audience`, competitorBlindSpot: 'Broad advice gets likes but niche advice gets saves', potentialReach: 82 },
      { gap: 'Missing community feeling', opportunity: 'Interactive collective experiences', contentAngle: 'Create challenges, polls, and collaborative content series', competitorBlindSpot: 'Most accounts broadcast; few build genuine community', potentialReach: 79 },
    ],
    'TikTok': [
      { gap: 'Entertainment without education', opportunity: 'Edu-tainment hybrid content', contentAngle: `Teach ${nicheLabel} concepts through storytelling and humor`, competitorBlindSpot: 'Entertainment creators rarely add value; educators are boring', potentialReach: 93 },
      { gap: 'Trend-chasing without identity', opportunity: 'Trend + niche fusion content', contentAngle: 'Adapt trending formats to deliver your unique perspective', competitorBlindSpot: 'Creators either follow trends blindly or ignore them entirely', potentialReach: 87 },
      { gap: 'Short-form depth deficit', opportunity: 'Series-based deep dives (Part 1/7)', contentAngle: `Break complex ${nicheLabel} topics into bingeable series`, competitorBlindSpot: 'Few creators structure content for return viewing', potentialReach: 85 },
      { gap: 'Lack of genuine vulnerability', opportunity: 'Real-time emotional storytelling', contentAngle: 'Share experiences as they happen, not polished retrospectives', competitorBlindSpot: 'Most "vulnerable" content is carefully scripted', potentialReach: 90 },
      { gap: 'Algorithm anxiety content', opportunity: 'Creator mental health awareness', contentAngle: 'Talk about the emotional toll of content creation openly', competitorBlindSpot: 'Creator burnout is universal but rarely addressed authentically', potentialReach: 84 },
    ],
    'LinkedIn': [
      { gap: 'Humble-brag culture saturation', opportunity: 'Genuine failure stories with lessons', contentAngle: `Share a real ${nicheLabel} failure — what went wrong and what you\'d do differently`, competitorBlindSpot: 'LinkedIn rewards vulnerability but few practice it genuinely', potentialReach: 92 },
      { gap: 'Corporate jargon overload', opportunity: 'Plain-language business insights', contentAngle: 'Explain complex concepts as if talking to a smart friend', competitorBlindSpot: 'Most professionals hide behind jargon for perceived credibility', potentialReach: 88 },
      { gap: 'Achievement-only narratives', opportunity: 'Process and learning content', contentAngle: `Document your ${nicheLabel} learning journey in real-time`, competitorBlindSpot: 'LinkedIn is full of outcomes, starved for processes', potentialReach: 85 },
      { gap: 'Missing emotional depth', opportunity: 'Personal stories with professional relevance', contentAngle: 'Connect life experiences to professional insights', competitorBlindSpot: 'The human behind the title is what people connect with', potentialReach: 90 },
      { gap: 'Recycled motivational quotes', opportunity: 'Original frameworks and mental models', contentAngle: `Create your own ${nicheLabel} framework and name it`, competitorBlindSpot: 'Original thinking is rare and extremely shareable', potentialReach: 86 },
    ],
  };

  const defaultSentimentGaps: SentimentGap[] = [
    { gap: 'Content oversaturation in surface-level advice', opportunity: 'Deep, specific, actionable insights', contentAngle: `Go deeper on ${nicheLabel} topics than anyone else — specificity wins`, competitorBlindSpot: 'Most content stays surface-level to appeal broadly', potentialReach: 87 },
    { gap: 'Emotional disconnection in professional content', opportunity: 'Human stories behind expertise', contentAngle: 'Lead with emotion, follow with expertise', competitorBlindSpot: 'Expertise without empathy fails to convert', potentialReach: 89 },
    { gap: 'Missing community and belonging', opportunity: 'Build tribe identity around shared values', contentAngle: `Create an in-group identity for your ${nicheLabel} audience`, competitorBlindSpot: 'Individual creators rarely build community feeling', potentialReach: 84 },
    { gap: 'Inspiration without implementation', opportunity: 'Motivational content + step-by-step guides', contentAngle: 'Every inspiring post deserves a "here\'s how" companion', competitorBlindSpot: 'Inspiration alone doesn\'t drive action or loyalty', potentialReach: 86 },
    { gap: 'Success bias — only showing wins', opportunity: 'Honest journey content including failures', contentAngle: 'Share the 90% of invisible work behind the 10% visible success', competitorBlindSpot: 'Audiences are starved for realistic narratives', potentialReach: 91 },
  ];

  const emotionalTriggersData: EmotionalTrigger[] = [
    { trigger: 'Identity Affirmation', category: 'Self-Concept', universality: 95, bestFormat: 'Statement post', cautionNote: 'Avoid gatekeeping or excluding people from the identity' },
    { trigger: 'Social Proof (Numbers)', category: 'Validation', universality: 90, bestFormat: 'Data visualization', cautionNote: 'Numbers must be verifiable — fake metrics destroy trust' },
    { trigger: 'Fear of Missing Out', category: 'Scarcity', universality: 88, bestFormat: 'Time-limited offer', cautionNote: 'Overuse creates "boy who cried wolf" effect — use sparingly' },
    { trigger: 'Nostalgia', category: 'Memory', universality: 92, bestFormat: 'Before/after or throwback', cautionNote: 'Ensure the reference resonates with YOUR audience\'s age group' },
    { trigger: 'Underdog Story', category: 'Narrative', universality: 94, bestFormat: 'Video storytelling', cautionNote: 'Must be genuine — audiences detect manufactured underdog narratives' },
    { trigger: 'Righteous Anger', category: 'Justice', universality: 82, bestFormat: 'Thread or carousel', cautionNote: 'Channel toward action, not just outrage — anger without direction backfires' },
    { trigger: 'Surprise / Pattern Break', category: 'Attention', universality: 91, bestFormat: 'Hook opener', cautionNote: 'The surprise must deliver on its promise — clickbait erodes trust' },
    { trigger: 'Belonging / Tribe Signal', category: 'Community', universality: 93, bestFormat: 'Interactive content', cautionNote: 'Include, don\'t exclude — tribal content should attract, not alienate' },
  ];

  const resonanceBoostersData: Record<string, ResonanceBooster[]> = {
    'Instagram': [
      { technique: 'Open with a face close-up showing genuine emotion', emotionalImpact: 92, effort: 'Low', platform: 'Instagram', example: 'Start your Reel with an unfiltered close-up of your reaction to a result or news' },
      { technique: 'Use the "pause and breathe" moment before a reveal', emotionalImpact: 86, effort: 'Low', platform: 'Instagram', example: 'Add a 2-second pause in your Reel before sharing the outcome — builds tension' },
      { technique: 'End carousels with a personal note, not a CTA', emotionalImpact: 84, effort: 'Low', platform: 'Instagram', example: 'Last slide: a handwritten-style note saying "this took me 3 years to learn. I hope it saves you time"' },
      { technique: 'Reply to comments with voice notes or video', emotionalImpact: 90, effort: 'Medium', platform: 'Instagram', example: 'Record a 15-second personal response to top comments — human connection amplified' },
      { technique: 'Share DM screenshots (with permission) as social proof', emotionalImpact: 88, effort: 'Low', platform: 'Instagram', example: 'Share a heartfelt DM from someone your content helped — real impact > numbers' },
    ],
    'TikTok': [
      { technique: 'Talk directly to camera as if confiding in a friend', emotionalImpact: 93, effort: 'Low', platform: 'TikTok', example: 'Lower your voice slightly, make eye contact, speak like you\'re sharing a secret' },
      { technique: 'Use silence strategically (2-3 second pauses)', emotionalImpact: 87, effort: 'Low', platform: 'TikTok', example: 'After a big reveal, let the silence sit — viewers fill the gap with their own emotions' },
      { technique: 'Show your real workspace/environment unedited', emotionalImpact: 85, effort: 'Low', platform: 'TikTok', example: 'Film in your actual messy desk/kitchen — perfection is the enemy of relatability' },
      { technique: 'React to your own old content with current perspective', emotionalImpact: 89, effort: 'Medium', platform: 'TikTok', example: 'Duet your earliest video and share how much you\'ve grown — journey content resonates' },
      { technique: 'End with a vulnerable question, not a CTA', emotionalImpact: 88, effort: 'Low', platform: 'TikTok', example: '"Am I the only one who feels this way?" — invites genuine conversation' },
    ],
    'LinkedIn': [
      { technique: 'Start with "I need to be honest about something"', emotionalImpact: 94, effort: 'Low', platform: 'LinkedIn', example: 'Open with a confession or admission — LinkedIn audiences reward authenticity disproportionately' },
      { technique: 'Use white space and one-line paragraphs for emphasis', emotionalImpact: 82, effort: 'Low', platform: 'LinkedIn', example: 'One insight per line.\n\nLet each thought breathe.\n\nThis forces the reader to slow down and feel.' },
      { technique: 'End with a question that makes people reflect', emotionalImpact: 88, effort: 'Low', platform: 'LinkedIn', example: '"What\'s the one thing you wish you knew when you started?" — reflective questions get longer comments' },
      { technique: 'Tag the person who inspired the thought', emotionalImpact: 85, effort: 'Low', platform: 'LinkedIn', example: 'Give credit: "This idea came from a conversation with @person — they changed my perspective"' },
      { technique: 'Share a screenshot of your actual notes/brainstorm', emotionalImpact: 86, effort: 'Low', platform: 'LinkedIn', example: 'Post a photo of your handwritten notes or whiteboard — shows genuine thinking process' },
    ],
  };

  const defaultResonanceBoosters: ResonanceBooster[] = [
    { technique: 'Lead with emotion, follow with logic', emotionalImpact: 90, effort: 'Low', platform: 'Any', example: 'Start with how something made you FEEL, then explain WHY it matters' },
    { technique: 'Use specific numbers instead of vague claims', emotionalImpact: 85, effort: 'Low', platform: 'Any', example: '"I spent 847 hours on this" hits harder than "I spent a lot of time"' },
    { technique: 'Include a personal photo or genuine reaction', emotionalImpact: 88, effort: 'Low', platform: 'Any', example: 'Unpolished selfies and real reactions outperform stock imagery for emotional content' },
    { technique: 'End with the most emotionally charged line', emotionalImpact: 87, effort: 'Low', platform: 'Any', example: 'Save your most powerful sentence for the last line — it\'s what people remember' },
    { technique: 'Address a single person, not a crowd', emotionalImpact: 91, effort: 'Low', platform: 'Any', example: 'Write as if sending a personal message to one reader — intimacy scales' },
  ];

  return {
    emotionProfile: {
      primaryEmotion: profile.primary,
      intensity: profile.intensity,
      secondaryEmotion: profile.secondary,
      emotionalArc: profile.arc,
      audienceResonance: profile.resonance,
    },
    toneShifts: toneShiftsData[toneStyle] || toneShiftsData['Warm & Personal'],
    emotionalHooks: emotionalHooksData[emotionalGoal] || emotionalHooksData['Inspire Action'],
    sentimentGaps: sentimentGapsData[platform] || defaultSentimentGaps,
    emotionalTriggers: emotionalTriggersData,
    resonanceBoosters: resonanceBoostersData[platform] || defaultResonanceBoosters,
  };
}

export default function EmotionMapperPage() {
  const [platform, setPlatform] = useState<string>(platforms[0]);
  const [contentType, setContentType] = useState<string>(contentTypes[0]);
  const [emotionalGoal, setEmotionalGoal] = useState<string>(emotionalGoals[0]);
  const [toneStyle, setToneStyle] = useState<string>(toneStyles[0]);
  const [niche, setNiche] = useState('');
  const [contentDraft, setContentDraft] = useState('');
  const [result, setResult] = useState<EmotionMapResult | null>(null);

  const intensityColor = (value: number) => {
    if (value >= 85) return 'bg-purple-600';
    if (value >= 70) return 'bg-indigo-500';
    if (value >= 50) return 'bg-cyan-500';
    return 'bg-gray-400';
  };

  const effortColor = (effort: string) => {
    switch (effort) {
      case 'Low': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'High': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Emotion Mapper</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Analyze emotional resonance, craft tone-perfect content, and discover untapped sentiment gaps to create content that truly connects with your audience.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Platform</label>
              <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                {platforms.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Content Type</label>
              <select value={contentType} onChange={e => setContentType(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                {contentTypes.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Emotional Goal</label>
              <select value={emotionalGoal} onChange={e => setEmotionalGoal(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                {emotionalGoals.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tone Style</label>
              <select value={toneStyle} onChange={e => setToneStyle(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                {toneStyles.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Niche / Industry</label>
              <input type="text" value={niche} onChange={e => setNiche(e.target.value)} placeholder="e.g. wellness coaching, crypto trading, food blogging" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Content Draft (optional)</label>
              <input type="text" value={contentDraft} onChange={e => setContentDraft(e.target.value)} placeholder="Paste your draft to analyze its emotional tone" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
            </div>
          </div>
          <button
            onClick={() => setResult(generateEmotionMap(platform, contentType, emotionalGoal, toneStyle, niche, contentDraft))}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
          >
            Map Emotions
          </button>
        </div>

        {result && (
          <div className="space-y-6">

            {/* 1. Emotion Profile */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Emotion Profile</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white text-center">
                  <p className="text-3xl font-bold">{result.emotionProfile.primaryEmotion}</p>
                  <p className="text-purple-100 mt-1">Primary Emotion</p>
                </div>
                <div className="bg-purple-50 rounded-2xl p-6 text-center">
                  <p className="text-xl font-bold text-purple-700">{result.emotionProfile.secondaryEmotion}</p>
                  <p className="text-sm text-gray-600 mt-1">Secondary Emotion</p>
                </div>
                <div className="bg-pink-50 rounded-2xl p-6 text-center">
                  <p className="text-xl font-bold text-pink-700">{result.emotionProfile.audienceResonance}%</p>
                  <p className="text-sm text-gray-600 mt-1">Audience Resonance</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-5">
                  <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Emotional Arc</p>
                  <p className="text-lg font-medium text-gray-800">{result.emotionProfile.emotionalArc}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-5">
                  <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Emotional Intensity</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div className={`h-3 rounded-full ${intensityColor(result.emotionProfile.intensity)}`} style={{ width: `${result.emotionProfile.intensity}%` }} />
                    </div>
                    <span className="text-lg font-bold text-gray-700">{result.emotionProfile.intensity}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Tone Shifts */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Tone Shifts</h2>
              <div className="space-y-4">
                {result.toneShifts.map((s, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-5">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-lg text-sm font-bold">{s.from}</span>
                      <span className="text-gray-400 font-bold">&rarr;</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-bold">{s.to}</span>
                      <div className="ml-auto flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="h-2 rounded-full bg-purple-500" style={{ width: `${s.effectiveness}%` }} />
                        </div>
                        <span className="text-sm font-bold text-gray-500">{s.effectiveness}%</span>
                      </div>
                    </div>
                    <p className="font-medium text-gray-800 mb-2">{s.technique}</p>
                    <div className="bg-purple-50 rounded-lg p-3">
                      <p className="text-xs font-semibold text-purple-600 mb-1">EXAMPLE</p>
                      <p className="text-sm text-purple-800">{s.example}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Emotional Hooks */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Emotional Hooks</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.emotionalHooks.map((h, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-purple-100 text-purple-700 px-2.5 py-1 rounded-lg text-xs font-bold">{h.emotion}</span>
                      <span className="bg-pink-100 text-pink-700 px-2.5 py-1 rounded-lg text-xs font-bold">{h.format}</span>
                    </div>
                    <p className="font-medium text-gray-900 mb-3 italic">{h.hook}</p>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className={`h-2 rounded-full ${h.impact >= 85 ? 'bg-purple-500' : 'bg-cyan-500'}`} style={{ width: `${h.impact}%` }} />
                      </div>
                      <span className="text-sm font-bold text-gray-500">{h.impact}%</span>
                    </div>
                    <p className="text-sm text-gray-600">{h.why}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Sentiment Gaps */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Sentiment Gaps</h2>
              <div className="space-y-4">
                {result.sentimentGaps.map((g, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-5">
                    <div className="flex flex-wrap items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{g.gap}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Reach Potential</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="h-2 rounded-full bg-green-500" style={{ width: `${g.potentialReach}%` }} />
                        </div>
                        <span className="text-sm font-bold text-gray-600">{g.potentialReach}%</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="bg-green-50 rounded-lg p-3">
                        <p className="text-xs font-semibold text-green-600 mb-1">OPPORTUNITY</p>
                        <p className="text-sm text-green-800">{g.opportunity}</p>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-3">
                        <p className="text-xs font-semibold text-purple-600 mb-1">CONTENT ANGLE</p>
                        <p className="text-sm text-purple-800">{g.contentAngle}</p>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-3">
                        <p className="text-xs font-semibold text-orange-600 mb-1">COMPETITOR BLIND SPOT</p>
                        <p className="text-sm text-orange-800">{g.competitorBlindSpot}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Emotional Triggers */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Emotional Triggers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.emotionalTriggers.map((t, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{t.trigger}</h3>
                      <span className="bg-purple-100 text-purple-700 px-2.5 py-1 rounded-lg text-xs font-bold">{t.category}</span>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs text-gray-500">Universality</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="h-2 rounded-full bg-purple-500" style={{ width: `${t.universality}%` }} />
                      </div>
                      <span className="text-sm font-bold text-gray-600">{t.universality}%</span>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-lg text-xs font-bold">{t.bestFormat}</span>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-3">
                      <p className="text-xs font-semibold text-amber-600 mb-1">CAUTION</p>
                      <p className="text-sm text-amber-800">{t.cautionNote}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Resonance Boosters */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Resonance Boosters</h2>
              <div className="space-y-3">
                {result.resonanceBoosters.map((b, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-5">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-purple-100 text-purple-700 px-2.5 py-1 rounded-lg text-xs font-bold">{b.platform}</span>
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${effortColor(b.effort)}`}>{b.effort} Effort</span>
                        </div>
                        <p className="font-medium text-gray-900 mb-2">{b.technique}</p>
                        <p className="text-sm text-gray-600">{b.example}</p>
                      </div>
                      <div className="flex items-center gap-3 md:w-48">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className={`h-2.5 rounded-full ${b.emotionalImpact >= 85 ? 'bg-purple-500' : 'bg-cyan-500'}`} style={{ width: `${b.emotionalImpact}%` }} />
                        </div>
                        <span className="text-sm font-bold text-gray-600 whitespace-nowrap">{b.emotionalImpact}%</span>
                      </div>
                    </div>
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
