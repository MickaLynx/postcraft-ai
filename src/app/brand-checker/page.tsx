'use client';
import { useState } from 'react';

const platforms = ['Instagram', 'TikTok', 'LinkedIn', 'Twitter/X', 'YouTube', 'Facebook', 'Pinterest', 'Threads'] as const;
const contentCategories = ['Product Posts', 'Educational', 'Behind-the-Scenes', 'User-Generated', 'Promotional', 'Customer Service', 'Thought Leadership'] as const;
const brandArchetypes = ['Innocent', 'Explorer', 'Sage', 'Hero', 'Outlaw', 'Magician', 'Everyman', 'Lover', 'Jester', 'Caregiver', 'Creator', 'Ruler'] as const;
const toneTargets = ['Authoritative', 'Playful', 'Inspirational', 'Educational', 'Conversational', 'Premium'] as const;
const industries = ['E-commerce', 'SaaS/Tech', 'Healthcare', 'Finance', 'Education', 'Real Estate', 'Food & Beverage', 'Fashion', 'Travel', 'Fitness'] as const;

interface VoiceDimension {
  dimension: string;
  score: number;
  assessment: string;
  recommendation: string;
}

interface PlatformRecommendation {
  platform: string;
  doThis: string[];
  avoidThis: string[];
  idealPostMix: string;
}

interface ContentTemplate {
  platform: string;
  template: string;
  tone: string;
  length: string;
  hashtags: string;
}

interface BrandCheckResult {
  consistencyScore: number;
  overallAssessment: string;
  voiceAudit: VoiceDimension[];
  platformRecommendations: PlatformRecommendation[];
  toneDeviationAlerts: { alert: string; severity: string; fix: string }[];
  vocabularySuggestions: { wordsToUse: string[]; wordsToAvoid: string[] };
  visualConsistencyChecklist: { item: string; status: string; tip: string }[];
  contentTemplates: ContentTemplate[];
}

function checkBrandConsistency(platform: string, category: string, archetype: string, tone: string, industry: string): BrandCheckResult {
  const archetypeTraits: Record<string, { core: string; voice: string; risk: string }> = {
    'Innocent': { core: 'Optimism, simplicity, trust', voice: 'Warm, sincere, straightforward — never cynical or complex', risk: 'Can seem naive or boring if overused' },
    'Explorer': { core: 'Freedom, discovery, adventure', voice: 'Bold, curious, action-oriented — never restrictive or routine', risk: 'May alienate comfort-seekers or stability-driven audiences' },
    'Sage': { core: 'Knowledge, truth, expertise', voice: 'Authoritative, analytical, educational — never condescending', risk: 'Can come across as cold or inaccessible without warmth' },
    'Hero': { core: 'Courage, achievement, mastery', voice: 'Empowering, direct, motivational — never passive or victim-mindset', risk: 'May intimidate or alienate audiences seeking empathy' },
    'Outlaw': { core: 'Disruption, revolution, liberation', voice: 'Provocative, bold, unconventional — never conformist or safe', risk: 'Can alienate mainstream audiences or attract controversy' },
    'Magician': { core: 'Transformation, vision, innovation', voice: 'Visionary, inspiring, transformative — never mundane or predictable', risk: 'May seem unrealistic or overpromising without substance' },
    'Everyman': { core: 'Belonging, relatability, authenticity', voice: 'Friendly, humble, down-to-earth — never elitist or pretentious', risk: 'Can blend in and lose distinctiveness without a strong POV' },
    'Lover': { core: 'Passion, intimacy, desire', voice: 'Sensual, emotional, appreciative — never cold or transactional', risk: 'May seem superficial without genuine emotional depth' },
    'Jester': { core: 'Joy, humor, spontaneity', voice: 'Witty, irreverent, entertaining — never boring or too serious', risk: 'Humor that misses can damage trust faster than any other tone' },
    'Caregiver': { core: 'Nurturing, protection, service', voice: 'Compassionate, supportive, reassuring — never self-serving', risk: 'Can seem patronizing if not balanced with respect for autonomy' },
    'Creator': { core: 'Innovation, self-expression, craft', voice: 'Original, inspiring, detail-oriented — never derivative or generic', risk: 'May alienate practical-minded audiences who want simplicity' },
    'Ruler': { core: 'Control, stability, premium quality', voice: 'Commanding, confident, polished — never chaotic or discount-oriented', risk: 'Can seem arrogant or exclusive without accessibility signals' },
  };

  const traits = archetypeTraits[archetype] || archetypeTraits['Sage'];

  const toneAlignmentScores: Record<string, Record<string, number>> = {
    'Innocent': { 'Authoritative': 55, 'Playful': 82, 'Inspirational': 88, 'Educational': 70, 'Conversational': 90, 'Premium': 45 },
    'Explorer': { 'Authoritative': 60, 'Playful': 75, 'Inspirational': 92, 'Educational': 65, 'Conversational': 80, 'Premium': 55 },
    'Sage': { 'Authoritative': 95, 'Playful': 40, 'Inspirational': 70, 'Educational': 98, 'Conversational': 55, 'Premium': 80 },
    'Hero': { 'Authoritative': 88, 'Playful': 45, 'Inspirational': 95, 'Educational': 65, 'Conversational': 50, 'Premium': 82 },
    'Outlaw': { 'Authoritative': 60, 'Playful': 70, 'Inspirational': 65, 'Educational': 40, 'Conversational': 85, 'Premium': 50 },
    'Magician': { 'Authoritative': 72, 'Playful': 60, 'Inspirational': 95, 'Educational': 75, 'Conversational': 65, 'Premium': 88 },
    'Everyman': { 'Authoritative': 35, 'Playful': 78, 'Inspirational': 60, 'Educational': 70, 'Conversational': 95, 'Premium': 25 },
    'Lover': { 'Authoritative': 40, 'Playful': 72, 'Inspirational': 85, 'Educational': 45, 'Conversational': 80, 'Premium': 92 },
    'Jester': { 'Authoritative': 20, 'Playful': 98, 'Inspirational': 50, 'Educational': 55, 'Conversational': 90, 'Premium': 30 },
    'Caregiver': { 'Authoritative': 55, 'Playful': 60, 'Inspirational': 82, 'Educational': 85, 'Conversational': 88, 'Premium': 50 },
    'Creator': { 'Authoritative': 70, 'Playful': 65, 'Inspirational': 88, 'Educational': 80, 'Conversational': 60, 'Premium': 85 },
    'Ruler': { 'Authoritative': 98, 'Playful': 25, 'Inspirational': 70, 'Educational': 65, 'Conversational': 35, 'Premium': 95 },
  };

  const baseScore = (toneAlignmentScores[archetype] || toneAlignmentScores['Sage'])[tone] || 60;
  const categoryBonus = category === 'Product Posts' ? 5 : category === 'Thought Leadership' ? 8 : category === 'Behind-the-Scenes' ? -3 : category === 'User-Generated' ? -5 : 0;
  const consistencyScore = Math.min(100, Math.max(10, baseScore + categoryBonus));

  const voiceAudit: VoiceDimension[] = [
    { dimension: 'Tone Alignment', score: Math.min(100, baseScore + Math.round(Math.random() * 10 - 5)), assessment: baseScore >= 75 ? 'Strong alignment between archetype and tone target' : 'Moderate tension between archetype personality and chosen tone', recommendation: baseScore >= 75 ? 'Maintain current tone — it resonates well with your archetype' : `Consider shifting toward ${archetype === 'Sage' ? 'Educational' : archetype === 'Jester' ? 'Playful' : 'Inspirational'} tone for better archetype alignment` },
    { dimension: 'Vocabulary Consistency', score: Math.min(100, consistencyScore + 3), assessment: consistencyScore >= 70 ? 'Word choices align with brand personality across content' : 'Vocabulary drift detected — some content uses off-brand language', recommendation: 'Create a brand dictionary with 50 core terms and anti-terms. Review all content against it before publishing.' },
    { dimension: 'Emotional Resonance', score: Math.min(100, consistencyScore - 2), assessment: `${archetype} archetype should evoke ${traits.core.split(',')[0].toLowerCase().trim()}`, recommendation: `Every post should trigger at least one emotional response aligned with: ${traits.core}` },
    { dimension: 'Platform Adaptation', score: Math.min(100, consistencyScore + (platform === 'LinkedIn' && tone === 'Authoritative' ? 12 : platform === 'TikTok' && tone === 'Playful' ? 15 : -5)), assessment: 'Brand voice must adapt to platform culture while maintaining core identity', recommendation: `For ${platform}: ${platform === 'LinkedIn' ? 'lean into thought leadership and data' : platform === 'TikTok' ? 'prioritize authenticity and trends' : platform === 'Instagram' ? 'balance visual storytelling with voice' : 'match platform energy while staying on-brand'}` },
    { dimension: 'Audience Perception Match', score: Math.min(100, consistencyScore + 5), assessment: 'How closely your intended brand voice matches audience perception', recommendation: 'Run quarterly brand perception surveys. Ask: "In 3 words, how would you describe our brand?" Compare to archetype traits.' },
    { dimension: 'Cross-Platform Coherence', score: Math.min(100, consistencyScore - 8), assessment: 'Consistency of voice across all active platforms', recommendation: 'Audit 10 recent posts across each platform. Score each for archetype alignment. Gaps over 20 points indicate voice fragmentation.' },
  ];

  const allPlatformRecs: Record<string, PlatformRecommendation> = {
    'Instagram': { platform: 'Instagram', doThis: [`Use ${archetype}-aligned captions with strong first lines`, 'Maintain consistent visual filter/color palette across feed', 'Stories: show the human side while staying in brand voice', `Reels: adapt ${tone.toLowerCase()} tone to trending formats`], avoidThis: ['Generic stock photo aesthetics that dilute brand identity', `Overly ${tone === 'Authoritative' ? 'stiff' : tone === 'Playful' ? 'chaotic' : 'salesy'} captions that break voice consistency`, 'Inconsistent posting frequency that confuses the algorithm', 'Ignoring comment replies — every reply reinforces brand voice'], idealPostMix: '40% value/educational, 25% product/service, 20% behind-the-scenes, 15% UGC/community' },
    'TikTok': { platform: 'TikTok', doThis: ['Hook viewers in first 0.5 seconds with brand-aligned opening', `Adapt ${archetype} personality to trending sounds and formats`, 'Show authentic behind-the-scenes that reinforces brand values', 'Respond to comments with video replies in brand voice'], avoidThis: ['Over-produced content that feels inauthentic to the platform', 'Ignoring trends entirely — adapt them to your brand, do not avoid them', 'Using corporate language that alienates TikTok audiences', 'Posting without captions — accessibility matters for brand perception'], idealPostMix: '35% trending/entertainment, 30% educational, 20% behind-the-scenes, 15% product features' },
    'LinkedIn': { platform: 'LinkedIn', doThis: ['Lead with insights and data that reinforce thought leadership', `Write in ${archetype} voice: ${traits.voice.split('—')[0].trim()}`, 'Share industry perspectives that position you as an authority', 'Engage meaningfully on others posts to build network visibility'], avoidThis: ['Copying viral LinkedIn formats without adding unique perspective', 'Over-casual tone that undermines professional credibility', 'Pure self-promotion without value — follow the 80/20 rule', 'Ignoring comments on your posts — engagement begets engagement'], idealPostMix: '40% thought leadership, 25% industry insights, 20% case studies, 15% culture/hiring' },
    'Twitter/X': { platform: 'Twitter/X', doThis: ['Develop a recognizable tweet style (length, structure, punctuation)', `Use ${tone.toLowerCase()} tone consistently across tweets and replies`, 'Quote tweet with added value rather than simple retweets', 'Build threads for complex topics — establish expertise depth'], avoidThis: ['Engaging in arguments that contradict brand archetype values', 'Inconsistent tweeting frequency — algorithms reward consistency', 'Auto-posting from other platforms without native formatting', 'Deleting tweets frequently — it signals brand insecurity'], idealPostMix: '35% original insights, 25% engagement/replies, 20% curated content, 20% announcements' },
    'YouTube': { platform: 'YouTube', doThis: ['Maintain consistent intro/outro that reinforces brand identity', `Script videos in ${archetype} voice with clear brand messaging`, 'Thumbnail style should be instantly recognizable as yours', 'Community tab posts should match video content voice'], avoidThis: ['Clickbait titles that contradict brand archetype values', 'Inconsistent upload schedule that breaks subscriber expectations', 'Ignoring comments — YouTube rewards active community management', 'Drastically changing content style without audience communication'], idealPostMix: '40% educational/how-to, 25% industry analysis, 20% tutorials, 15% community/Q&A' },
    'Facebook': { platform: 'Facebook', doThis: ['Build community through Groups with clear brand voice guidelines', `Post in ${tone.toLowerCase()} tone that invites conversation`, 'Use longer-form content that encourages meaningful discussion', 'Leverage Events and Live features for real-time brand interaction'], avoidThis: ['Treating Facebook as a broadcast channel — prioritize two-way conversation', 'Ignoring negative comments — address them in brand voice', 'Posting only links — native content gets 10x more reach', 'Inconsistent response times that damage community trust'], idealPostMix: '35% community discussion, 25% value content, 20% events/live, 20% product updates' },
    'Pinterest': { platform: 'Pinterest', doThis: ['Design pins with consistent brand colors, fonts, and style', `Write pin descriptions in ${archetype} voice with searchable keywords`, 'Organize boards to tell a cohesive brand story', 'Create idea pins that showcase expertise and brand values'], avoidThis: ['Inconsistent visual style across pins and boards', 'Ignoring SEO in pin descriptions — Pinterest is a search engine', 'Pinning competitor content without adding your own perspective', 'Abandoning boards — dead boards signal inactive brand presence'], idealPostMix: '40% original pins, 25% idea pins, 20% curated/repins, 15% product pins' },
    'Threads': { platform: 'Threads', doThis: ['Establish a distinct voice that complements your Instagram presence', `Use ${tone.toLowerCase()} tone for text-first conversations`, 'Engage in trending discussions with brand-aligned perspectives', 'Cross-reference Instagram content to build cohesive brand presence'], avoidThis: ['Simply reposting tweets without adapting to Threads culture', 'Being overly promotional — Threads rewards authentic conversation', 'Ignoring the community feel — Threads is more intimate than Twitter', 'Inconsistent posting that makes your presence feel abandoned'], idealPostMix: '35% original thoughts, 30% conversation/replies, 20% curated insights, 15% product mentions' },
  };

  const archetypeVocab: Record<string, { wordsToUse: string[]; wordsToAvoid: string[] }> = {
    'Innocent': { wordsToUse: ['simple', 'pure', 'trust', 'honest', 'natural', 'wholesome', 'genuine', 'clean', 'fresh', 'joy', 'easy', 'clear'], wordsToAvoid: ['complex', 'disrupt', 'aggressive', 'dominate', 'exploit', 'hack', 'manipulate', 'dark', 'edgy', 'risk'] },
    'Explorer': { wordsToUse: ['discover', 'journey', 'adventure', 'freedom', 'explore', 'uncharted', 'bold', 'frontier', 'beyond', 'quest', 'pioneer', 'trail'], wordsToAvoid: ['safe', 'routine', 'predictable', 'standard', 'conventional', 'ordinary', 'settle', 'comfortable', 'traditional', 'basic'] },
    'Sage': { wordsToUse: ['insight', 'research', 'data', 'analysis', 'truth', 'knowledge', 'evidence', 'expertise', 'framework', 'methodology', 'strategy', 'intelligence'], wordsToAvoid: ['guess', 'probably', 'maybe', 'feel', 'trendy', 'hype', 'vibes', 'random', 'yolo', 'wing it'] },
    'Hero': { wordsToUse: ['achieve', 'conquer', 'master', 'power', 'strength', 'courage', 'overcome', 'victory', 'champion', 'unstoppable', 'transform', 'elite'], wordsToAvoid: ['easy', 'shortcut', 'luck', 'passive', 'victim', 'helpless', 'weak', 'surrender', 'compromise', 'settle'] },
    'Outlaw': { wordsToUse: ['disrupt', 'revolution', 'break', 'rebel', 'challenge', 'radical', 'unconventional', 'defy', 'liberate', 'shake up', 'overthrow', 'bold'], wordsToAvoid: ['traditional', 'standard', 'comply', 'mainstream', 'approved', 'conventional', 'safe', 'regulated', 'proper', 'polished'] },
    'Magician': { wordsToUse: ['transform', 'vision', 'imagine', 'unlock', 'catalyst', 'breakthrough', 'shift', 'evolve', 'manifest', 'alchemy', 'metamorphosis', 'transcend'], wordsToAvoid: ['incremental', 'ordinary', 'basic', 'standard', 'routine', 'expected', 'normal', 'typical', 'regular', 'mundane'] },
    'Everyman': { wordsToUse: ['together', 'real', 'honest', 'everyday', 'community', 'relatable', 'down-to-earth', 'practical', 'common sense', 'genuine', 'approachable', 'no-nonsense'], wordsToAvoid: ['exclusive', 'elite', 'luxury', 'premium', 'VIP', 'sophisticated', 'curated', 'bespoke', 'artisanal', 'refined'] },
    'Lover': { wordsToUse: ['passion', 'desire', 'beautiful', 'intimate', 'experience', 'sensation', 'indulge', 'luxurious', 'alluring', 'captivating', 'irresistible', 'enchanting'], wordsToAvoid: ['cheap', 'basic', 'functional', 'efficient', 'standard', 'generic', 'mass-produced', 'budget', 'practical', 'utilitarian'] },
    'Jester': { wordsToUse: ['fun', 'play', 'wild', 'hilarious', 'unexpected', 'ridiculous', 'epic', 'absurd', 'legendary', 'unhinged', 'shenanigans', 'plot twist'], wordsToAvoid: ['serious', 'formal', 'professional', 'corporate', 'strategic', 'optimize', 'leverage', 'synergy', 'stakeholder', 'deliverable'] },
    'Caregiver': { wordsToUse: ['support', 'nurture', 'protect', 'care', 'safe', 'comfort', 'help', 'serve', 'compassion', 'wellbeing', 'community', 'empower'], wordsToAvoid: ['aggressive', 'dominate', 'compete', 'crush', 'exploit', 'disrupt', 'attack', 'force', 'demand', 'pressure'] },
    'Creator': { wordsToUse: ['design', 'craft', 'build', 'imagine', 'create', 'innovate', 'original', 'vision', 'artistic', 'express', 'signature', 'handcrafted'], wordsToAvoid: ['copy', 'template', 'generic', 'standard', 'mass', 'cookie-cutter', 'duplicate', 'replicate', 'clone', 'off-the-shelf'] },
    'Ruler': { wordsToUse: ['premium', 'excellence', 'authority', 'command', 'exclusive', 'superior', 'prestige', 'standard', 'legacy', 'definitive', 'benchmark', 'gold standard'], wordsToAvoid: ['budget', 'cheap', 'DIY', 'hack', 'workaround', 'scrappy', 'hustle', 'bootstrap', 'discount', 'bargain'] },
  };

  const vocab = archetypeVocab[archetype] || archetypeVocab['Sage'];

  const toneDeviationAlerts = [];
  if (consistencyScore < 50) {
    toneDeviationAlerts.push({ alert: `Critical mismatch: ${archetype} archetype with ${tone} tone creates brand confusion`, severity: 'HIGH', fix: `Consider switching to ${archetype === 'Jester' ? 'Playful' : archetype === 'Ruler' ? 'Authoritative' : archetype === 'Hero' ? 'Inspirational' : 'Conversational'} tone or reconsidering your archetype choice` });
  }
  if (category === 'User-Generated' || category === 'Behind-the-Scenes') {
    toneDeviationAlerts.push({ alert: `${category} content naturally drifts from brand voice — requires extra monitoring`, severity: 'MEDIUM', fix: 'Create UGC guidelines for contributors and BTS content templates that maintain core voice elements' });
  }
  if ((tone === 'Premium' && (platform === 'TikTok' || platform === 'Threads')) || (tone === 'Authoritative' && platform === 'TikTok')) {
    toneDeviationAlerts.push({ alert: `${tone} tone may feel inauthentic on ${platform} — platform culture conflict`, severity: 'MEDIUM', fix: `Soften ${tone.toLowerCase()} tone for ${platform} while keeping core ${archetype} personality intact` });
  }
  if (tone === 'Playful' && (industry === 'Healthcare' || industry === 'Finance')) {
    toneDeviationAlerts.push({ alert: `Playful tone in ${industry} requires careful calibration to maintain credibility`, severity: 'MEDIUM', fix: 'Use light humor in educational content but maintain gravity in service/compliance messaging' });
  }
  toneDeviationAlerts.push({ alert: 'Cross-platform voice drift is the #1 brand consistency killer', severity: 'LOW', fix: 'Conduct monthly voice audits: score 5 posts per platform against your brand voice scorecard' });

  const visualConsistencyChecklist = [
    { item: 'Color palette consistency across all platforms', status: 'CHECK', tip: 'Use maximum 3 primary colors + 2 accent colors. Document exact hex codes in brand guide.' },
    { item: 'Typography matches brand archetype personality', status: 'CHECK', tip: `${archetype} archetype works best with ${archetype === 'Ruler' ? 'serif, elegant' : archetype === 'Jester' ? 'rounded, bold' : archetype === 'Sage' ? 'clean, modern sans-serif' : 'humanist, approachable'} typography` },
    { item: 'Profile photos/avatars identical across platforms', status: 'CHECK', tip: 'Use the same profile image everywhere. Different images fragment brand recognition.' },
    { item: 'Bio/About sections use consistent brand language', status: 'CHECK', tip: `Lead with ${archetype} archetype language: "${traits.core.split(',')[0].trim()}" should be reflected in every bio` },
    { item: 'Post visual templates maintain brand identity', status: 'CHECK', tip: 'Create 3-5 post templates that lock brand elements (logo placement, colors, fonts) while allowing content flexibility' },
    { item: 'Video intro/outro consistent across platforms', status: 'CHECK', tip: 'Use the same 2-3 second branded intro across all video content. Builds instant recognition.' },
    { item: 'Story/Reel highlight covers follow brand style', status: 'CHECK', tip: 'Design highlight covers as brand touchpoints — consistent icons, colors, and naming convention' },
    { item: 'Link-in-bio page matches brand visual identity', status: 'CHECK', tip: 'Your link-in-bio is the bridge between social and website — it must feel like a seamless brand transition' },
  ];

  const contentTemplates: ContentTemplate[] = [
    { platform: 'Instagram', template: `[${archetype} Hook] + Value statement + CTA\n\nLine 1: ${traits.voice.split('—')[0].trim()} opening hook\nLine 2-3: Core value or insight\nLine 4: Brand-aligned CTA`, tone: `${tone} with visual storytelling emphasis`, length: '125-150 words caption, 3-5 sentences', hashtags: '15-20 hashtags, mix of branded (3), niche (7), broad (5-10)' },
    { platform: 'LinkedIn', template: `[Insight Hook]\n\nParagraph 1: Challenge or observation (${archetype} perspective)\nParagraph 2: Data or evidence\nParagraph 3: Actionable takeaway\nClosing: Engagement question`, tone: `${tone} adapted for professional context`, length: '200-300 words, 5-7 paragraphs with line breaks', hashtags: '3-5 relevant industry hashtags maximum' },
    { platform: 'TikTok', template: `Hook (0-1s): "${archetype === 'Jester' ? 'Wait for it...' : archetype === 'Sage' ? 'Here is what nobody tells you about...' : archetype === 'Hero' ? 'Stop making this mistake...' : 'You need to see this...'}"\nBody (1-15s): Core content in ${tone.toLowerCase()} voice\nCTA (last 3s): Follow/save/share prompt`, tone: `${tone} adapted for short-form authenticity`, length: '15-60 seconds, 3-5 key points', hashtags: '3-5 trending + niche hashtags' },
    { platform: 'Twitter/X', template: `[${archetype} perspective in 1 sentence]\n\n[Supporting point or data]\n\n[Brand-aligned CTA or question]`, tone: `Concise ${tone.toLowerCase()} — every word earns its place`, length: '100-280 characters for single tweets, 5-8 tweets for threads', hashtags: '0-2 hashtags maximum — Twitter penalizes hashtag spam' },
  ];

  return {
    consistencyScore,
    overallAssessment: consistencyScore >= 80
      ? `Strong brand consistency. Your ${archetype} archetype with ${tone} tone creates a powerful, recognizable brand voice. Focus on maintaining this across all platforms and content types.`
      : consistencyScore >= 60
      ? `Moderate brand consistency. Your ${archetype} archetype and ${tone} tone have some natural tension. This can work if managed intentionally — but requires clear guidelines and regular audits.`
      : `Brand consistency needs attention. The ${archetype} archetype and ${tone} tone create conflicting signals that may confuse your audience. Consider realigning your tone or archetype selection.`,
    voiceAudit,
    platformRecommendations: [allPlatformRecs[platform] || allPlatformRecs['Instagram']],
    toneDeviationAlerts,
    vocabularySuggestions: vocab,
    visualConsistencyChecklist,
    contentTemplates,
  };
}

export default function BrandCheckerPage() {
  const [platform, setPlatform] = useState<string>(platforms[0]);
  const [category, setCategory] = useState<string>(contentCategories[0]);
  const [archetype, setArchetype] = useState<string>(brandArchetypes[0]);
  const [tone, setTone] = useState<string>(toneTargets[0]);
  const [industry, setIndustry] = useState<string>(industries[0]);
  const [result, setResult] = useState<BrandCheckResult | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Brand Consistency Checker</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Audit your brand voice consistency across platforms. Get archetype-aligned recommendations, vocabulary guides, visual checklists, and content templates.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Platform</label>
              <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                {platforms.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Content Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                {contentCategories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Brand Archetype</label>
              <select value={archetype} onChange={e => setArchetype(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                {brandArchetypes.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tone Target</label>
              <select value={tone} onChange={e => setTone(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                {toneTargets.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Industry</label>
            <select value={industry} onChange={e => setIndustry(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              {industries.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>
          <button onClick={() => setResult(checkBrandConsistency(platform, category, archetype, tone, industry))} className="w-full py-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-fuchsia-700 transition-all shadow-lg hover:shadow-xl">Check Brand Consistency</button>
        </div>

        {result && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Brand Consistency Score</h2>
              <div className="flex items-center gap-6 mb-4">
                <div className={`text-5xl font-bold ${result.consistencyScore >= 80 ? 'text-green-600' : result.consistencyScore >= 60 ? 'text-amber-600' : 'text-red-600'}`}>{result.consistencyScore}/100</div>
                <div className="flex-1">
                  <div className="w-full bg-gray-100 rounded-full h-4">
                    <div className={`h-4 rounded-full ${result.consistencyScore >= 80 ? 'bg-green-500' : result.consistencyScore >= 60 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${result.consistencyScore}%` }} />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm bg-gray-50 rounded-xl p-4">{result.overallAssessment}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Brand Voice Audit (6 Dimensions)</h2>
              <div className="space-y-4">{result.voiceAudit.map((d, i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-900 text-sm">{d.dimension}</span>
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold ${d.score >= 80 ? 'bg-green-100 text-green-700' : d.score >= 60 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{d.score}/100</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                    <div className={`h-2 rounded-full ${d.score >= 80 ? 'bg-green-500' : d.score >= 60 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${d.score}%` }} />
                  </div>
                  <p className="text-gray-600 text-xs mb-1">{d.assessment}</p>
                  <p className="text-purple-600 text-xs font-medium">{d.recommendation}</p>
                </div>
              ))}</div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Platform-Specific Recommendations ({platform})</h2>
              {result.platformRecommendations.map((r, i) => (
                <div key={i} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-50 rounded-xl p-4">
                      <h3 className="text-sm font-bold text-green-700 mb-2">DO THIS</h3>
                      <ul className="space-y-2">{r.doThis.map((d, j) => <li key={j} className="text-gray-700 text-sm flex gap-2"><span className="text-green-500 font-bold">+</span>{d}</li>)}</ul>
                    </div>
                    <div className="bg-red-50 rounded-xl p-4">
                      <h3 className="text-sm font-bold text-red-700 mb-2">AVOID THIS</h3>
                      <ul className="space-y-2">{r.avoidThis.map((a, j) => <li key={j} className="text-gray-700 text-sm flex gap-2"><span className="text-red-500 font-bold">-</span>{a}</li>)}</ul>
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4">
                    <h3 className="text-sm font-bold text-purple-700 mb-1">IDEAL POST MIX</h3>
                    <p className="text-gray-700 text-sm">{r.idealPostMix}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Tone Deviation Alerts</h2>
              <div className="space-y-3">{result.toneDeviationAlerts.map((a, i) => (
                <div key={i} className={`rounded-xl p-4 ${a.severity === 'HIGH' ? 'bg-red-50 border border-red-200' : a.severity === 'MEDIUM' ? 'bg-amber-50 border border-amber-200' : 'bg-blue-50 border border-blue-200'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${a.severity === 'HIGH' ? 'bg-red-200 text-red-800' : a.severity === 'MEDIUM' ? 'bg-amber-200 text-amber-800' : 'bg-blue-200 text-blue-800'}`}>{a.severity}</span>
                    <span className="text-gray-900 text-sm font-medium">{a.alert}</span>
                  </div>
                  <p className="text-gray-600 text-xs ml-16">{a.fix}</p>
                </div>
              ))}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Words to Use</h2>
                <div className="flex flex-wrap gap-2">{result.vocabularySuggestions.wordsToUse.map((w, i) => (
                  <span key={i} className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-medium">{w}</span>
                ))}</div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Words to Avoid</h2>
                <div className="flex flex-wrap gap-2">{result.vocabularySuggestions.wordsToAvoid.map((w, i) => (
                  <span key={i} className="bg-red-100 text-red-700 px-3 py-1 rounded-lg text-sm font-medium line-through">{w}</span>
                ))}</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Visual Consistency Checklist</h2>
              <div className="space-y-3">{result.visualConsistencyChecklist.map((c, i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-4 flex items-start gap-3">
                  <input type="checkbox" className="rounded mt-1" />
                  <div>
                    <p className="text-gray-900 text-sm font-medium">{c.item}</p>
                    <p className="text-gray-500 text-xs mt-1">{c.tip}</p>
                  </div>
                </div>
              ))}</div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Content Templates by Platform</h2>
              <div className="space-y-4">{result.contentTemplates.map((t, i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-5">
                  <h3 className="text-sm font-bold text-purple-600 mb-3">{t.platform}</h3>
                  <div className="bg-gray-50 rounded-lg p-3 mb-3"><pre className="text-gray-700 text-sm whitespace-pre-wrap font-sans">{t.template}</pre></div>
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div><span className="font-semibold text-gray-500">TONE:</span><p className="text-gray-700">{t.tone}</p></div>
                    <div><span className="font-semibold text-gray-500">LENGTH:</span><p className="text-gray-700">{t.length}</p></div>
                    <div><span className="font-semibold text-gray-500">HASHTAGS:</span><p className="text-gray-700">{t.hashtags}</p></div>
                  </div>
                </div>
              ))}</div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
