'use client';
import { useState } from 'react';

const sourcePlatforms = ['Instagram', 'TikTok', 'Twitter/X', 'LinkedIn', 'YouTube', 'Facebook', 'Blog/Article', 'Podcast'] as const;
const targetPlatforms = ['Instagram', 'TikTok', 'Twitter/X', 'LinkedIn', 'YouTube', 'Facebook', 'Pinterest', 'Snapchat'] as const;
const contentFormats = ['Long-Form Post', 'Short Video', 'Carousel/Slides', 'Thread', 'Story/Reel', 'Infographic', 'Audio Clip', 'Newsletter'] as const;
const brandVoices = ['Professional', 'Casual', 'Playful', 'Authoritative', 'Inspirational', 'Educational'] as const;

interface PlatformVariant {
  platform: string;
  format: string;
  charLimit: string;
  adaptedContent: string;
  captionStyle: string;
  hashtagStrategy: string;
  bestTimeToPost: string;
  estimatedReach: number;
}

interface FormatBlueprint {
  originalFormat: string;
  targetFormat: string;
  transformationSteps: string[];
  effortLevel: string;
  qualityRetention: number;
}

interface StyleConsistency {
  element: string;
  rule: string;
  platform: string;
  adaptation: string;
}

interface EngagementPrediction {
  platform: string;
  predictedRate: number;
  bestMetric: string;
  boostTip: string;
}

interface LocalizationHint {
  region: string;
  culturalNote: string;
  languageTip: string;
  avoidThis: string;
  localTrend: string;
}

interface CrossPostSchedule {
  platform: string;
  day: string;
  time: string;
  reason: string;
  priority: number;
}

interface CrossPlatformResult {
  platformVariants: PlatformVariant[];
  formatBlueprints: FormatBlueprint[];
  styleConsistency: StyleConsistency[];
  engagementPredictions: EngagementPrediction[];
  localizationHints: LocalizationHint[];
  crossPostSchedule: CrossPostSchedule[];
}

function generateCrossPlatformPlan(
  sourcePlatform: string,
  targetPlatformsList: string[],
  contentFormat: string,
  brandVoice: string,
  niche: string,
  originalContent: string
): CrossPlatformResult {
  const nicheLabel = niche || 'general content';

  const variantsData: Record<string, { format: string; charLimit: string; captionStyle: string; hashtagStrategy: string; bestTime: string; reach: number }> = {
    'Instagram': { format: 'Carousel or Reel', charLimit: '2,200 chars (first 125 visible)', captionStyle: 'Hook in first line, storytelling body, CTA at end', hashtagStrategy: '5-8 niche-specific + 2-3 broad. Place in caption, not comments.', bestTime: '11 AM or 7 PM (audience timezone)', reach: 85 },
    'TikTok': { format: 'Short Video (15-90s)', charLimit: '4,000 chars caption', captionStyle: 'Short, punchy, curiosity-driven. Use 1-2 sentences max.', hashtagStrategy: '3-5 hashtags: 2 niche + 1 trending + 1 branded', bestTime: '7-9 PM or 12-1 PM', reach: 92 },
    'Twitter/X': { format: 'Thread (3-12 tweets) or Long Post', charLimit: '25,000 chars per post / 280 per tweet in thread', captionStyle: 'Bold opener, concise points, bookmark-worthy value', hashtagStrategy: '1-2 relevant hashtags max. Often better with none.', bestTime: '8-10 AM or 5-6 PM weekdays', reach: 78 },
    'LinkedIn': { format: 'Text Post or Document/Carousel', charLimit: '3,000 chars (first 210 visible)', captionStyle: 'Personal story opener, data-driven body, reflective question ending', hashtagStrategy: '3-5 industry hashtags. Avoid generic ones.', bestTime: '7:30-8:30 AM Tue-Thu', reach: 82 },
    'YouTube': { format: 'Short (< 60s) or Long-Form Video', charLimit: '5,000 chars description', captionStyle: 'SEO-rich title, keyword description, timestamps in long-form', hashtagStrategy: '3-5 in description. First 3 appear above title.', bestTime: '2-4 PM Fri-Sat or 5-7 PM weekdays', reach: 75 },
    'Facebook': { format: 'Reel or Native Video', charLimit: '63,206 chars (first 477 visible)', captionStyle: 'Conversational, question-driven, group-shareable', hashtagStrategy: '2-3 hashtags. Less is more on Facebook.', bestTime: '1-3 PM weekdays', reach: 68 },
    'Pinterest': { format: 'Pin (Static or Video)', charLimit: '500 chars Pin description', captionStyle: 'Keyword-rich, actionable description. Think search intent.', hashtagStrategy: 'No hashtags needed. Use keywords in description instead.', bestTime: '8-11 PM or 2-4 PM weekends', reach: 71 },
    'Snapchat': { format: 'Spotlight or Story', charLimit: 'Minimal text overlay', captionStyle: 'Visual-first, text overlays for key points only', hashtagStrategy: 'Topics/tags within Spotlight submission', bestTime: '10 PM-1 AM (younger demographic)', reach: 62 },
  };

  const platformVariants: PlatformVariant[] = targetPlatformsList.map(tp => {
    const data = variantsData[tp] || variantsData['Instagram'];
    const adaptedContentMap: Record<string, string> = {
      'Instagram': `Transform your ${contentFormat} into a visually-driven ${data.format} for ${nicheLabel}. Lead with an eye-catching visual hook. Break key points into carousel slides or use text overlays on Reels. End with a save-worthy takeaway that encourages bookmarks.`,
      'TikTok': `Condense your ${contentFormat} into a fast-paced ${data.format} for ${nicheLabel}. Start with a 1-second hook ("Wait for it..." or a bold claim). Show, don't tell. Use trending audio if it fits. Keep the energy high and the pacing tight.`,
      'Twitter/X': `Restructure your ${contentFormat} into a ${data.format} for ${nicheLabel}. Open with your most provocative or insightful point. Each tweet in the thread should stand alone as a valuable insight. End with a bookmark-worthy summary.`,
      'LinkedIn': `Adapt your ${contentFormat} into a ${data.format} for ${nicheLabel}. Open with "I" and a personal anecdote. Add specific numbers and results. Use white space generously. End with a reflective question to drive comments.`,
      'YouTube': `Convert your ${contentFormat} into ${data.format} for ${nicheLabel}. For Shorts: hook in 1 second, deliver value by second 15, end with a cliffhanger. For long-form: structured chapters, pattern interrupts every 2 minutes, strong thumbnail.`,
      'Facebook': `Reformat your ${contentFormat} as ${data.format} for ${nicheLabel}. Make it shareable — content that people want to tag friends on or share to Groups. Use conversational language and ask questions to drive comments.`,
      'Pinterest': `Transform your ${contentFormat} into a ${data.format} optimized for ${nicheLabel} search. Use vertical 2:3 ratio. Include keyword-rich text overlay. Create 5-10 Pin variations from the same content for maximum discovery.`,
      'Snapchat': `Adapt your ${contentFormat} for ${data.format} targeting ${nicheLabel}. Keep it raw and authentic — Snapchat users expect unpolished, real content. Use AR lenses if relevant. Keep text minimal, visuals maximal.`,
    };
    return {
      platform: tp,
      format: data.format,
      charLimit: data.charLimit,
      adaptedContent: adaptedContentMap[tp] || adaptedContentMap['Instagram'],
      captionStyle: data.captionStyle,
      hashtagStrategy: data.hashtagStrategy,
      bestTimeToPost: data.bestTime,
      estimatedReach: data.reach,
    };
  });

  const formatBlueprintsMap: Record<string, FormatBlueprint[]> = {
    'Long-Form Post': [
      { originalFormat: 'Long-Form Post', targetFormat: 'Twitter/X Thread', transformationSteps: ['Extract 7-10 key insights from the post', 'Write each as a standalone tweet (under 280 chars)', 'Add a bold hook as tweet #1', 'Add a summary + CTA as the final tweet', 'Space the thread for readability'], effortLevel: 'Medium', qualityRetention: 88 },
      { originalFormat: 'Long-Form Post', targetFormat: 'Instagram Carousel', transformationSteps: ['Identify 8-10 main points or steps', 'Design one slide per point (large text, minimal design)', 'Create a hook slide as page 1', 'Add a CTA slide at the end', 'Write a storytelling caption that adds context'], effortLevel: 'Medium', qualityRetention: 85 },
      { originalFormat: 'Long-Form Post', targetFormat: 'TikTok Video', transformationSteps: ['Identify the single most impactful insight', 'Write a 30-second script around that insight', 'Open with a pattern-interrupt hook', 'Add text overlays for key points', 'Record with energy and direct eye contact'], effortLevel: 'High', qualityRetention: 72 },
      { originalFormat: 'Long-Form Post', targetFormat: 'LinkedIn Document', transformationSteps: ['Create a PDF with 1 insight per page', 'Use clean typography and brand colors', 'Start with a provocative question slide', 'Include data/numbers where possible', 'End with your perspective + question'], effortLevel: 'Medium', qualityRetention: 92 },
    ],
    'Short Video': [
      { originalFormat: 'Short Video', targetFormat: 'Instagram Reel', transformationSteps: ['Re-edit to 30-60 seconds if needed', 'Add captions/subtitles', 'Replace audio with trending Instagram sound if fitting', 'Add text overlay hook in first frame', 'Optimize thumbnail for grid display'], effortLevel: 'Low', qualityRetention: 95 },
      { originalFormat: 'Short Video', targetFormat: 'Twitter/X Post', transformationSteps: ['Extract the key insight as a text post', 'Add the video as native upload', 'Write a 1-2 sentence teaser above', 'Remove watermarks from other platforms', 'Add 1 relevant hashtag'], effortLevel: 'Low', qualityRetention: 80 },
      { originalFormat: 'Short Video', targetFormat: 'LinkedIn Post', transformationSteps: ['Upload video natively (never link to YouTube/TikTok)', 'Write a professional context paragraph above', 'Add specific results or data the video discusses', 'End with a question for your network', 'Keep video under 2 minutes'], effortLevel: 'Medium', qualityRetention: 78 },
      { originalFormat: 'Short Video', targetFormat: 'YouTube Short', transformationSteps: ['Ensure vertical format (9:16 ratio)', 'Keep under 60 seconds for Shorts shelf', 'Add a compelling title with keywords', 'Include a subscribe CTA overlay', 'Add relevant tags in the description'], effortLevel: 'Low', qualityRetention: 93 },
    ],
    'Carousel/Slides': [
      { originalFormat: 'Carousel/Slides', targetFormat: 'TikTok Photo Mode', transformationSteps: ['Export slides as individual images', 'Add a trending audio track', 'Ensure text is readable on mobile', 'Add a hook as the first image', 'Write a curiosity-driven caption'], effortLevel: 'Low', qualityRetention: 82 },
      { originalFormat: 'Carousel/Slides', targetFormat: 'LinkedIn Document', transformationSteps: ['Export as PDF (not images)', 'Upload as native document post', 'Write a personal story caption to accompany', 'Ensure branding is consistent', 'Optimize for mobile readability'], effortLevel: 'Low', qualityRetention: 96 },
      { originalFormat: 'Carousel/Slides', targetFormat: 'Twitter/X Thread', transformationSteps: ['Convert each slide into a tweet', 'Add slide images to corresponding tweets', 'Write a hook tweet as the opener', 'Add a "bookmark this" reminder', 'Include a summary tweet at the end'], effortLevel: 'Medium', qualityRetention: 85 },
      { originalFormat: 'Carousel/Slides', targetFormat: 'Pinterest Pins', transformationSteps: ['Resize each slide to 2:3 vertical ratio', 'Add keyword-rich text overlay to each', 'Create 5-10 Pin variations with different titles', 'Write SEO descriptions for each Pin', 'Link back to original content'], effortLevel: 'Medium', qualityRetention: 75 },
    ],
    'Thread': [
      { originalFormat: 'Thread', targetFormat: 'Instagram Carousel', transformationSteps: ['Convert each tweet into a carousel slide', 'Design with consistent branding', 'Add visual elements (icons, highlights)', 'Create a hook slide from tweet #1', 'Write an expanded caption with context'], effortLevel: 'Medium', qualityRetention: 88 },
      { originalFormat: 'Thread', targetFormat: 'LinkedIn Post', transformationSteps: ['Combine thread into one cohesive narrative', 'Add personal context and "I" language', 'Include specific numbers from the thread', 'Format with white space for readability', 'End with a reflective question'], effortLevel: 'Medium', qualityRetention: 90 },
      { originalFormat: 'Thread', targetFormat: 'TikTok Video', transformationSteps: ['Pick the single best insight from the thread', 'Write a 30-45 second script', 'Record with enthusiasm and direct address', 'Add key points as text overlays', 'End with "follow for part 2" if multiple insights'], effortLevel: 'High', qualityRetention: 70 },
      { originalFormat: 'Thread', targetFormat: 'Blog Post', transformationSteps: ['Expand each tweet into a paragraph', 'Add supporting data and examples', 'Include internal links and images', 'Optimize headings for SEO', 'Add a CTA at the end'], effortLevel: 'High', qualityRetention: 95 },
    ],
  };

  const defaultBlueprints: FormatBlueprint[] = [
    { originalFormat: contentFormat, targetFormat: 'Multi-Platform Bundle', transformationSteps: ['Identify the core message or insight', 'Create a visual version (image/video)', 'Create a text version (post/thread)', 'Create an audio version (if applicable)', 'Adapt tone and length for each target platform'], effortLevel: 'High', qualityRetention: 80 },
    { originalFormat: contentFormat, targetFormat: 'Micro-Content Series', transformationSteps: ['Break into 5-7 standalone micro-pieces', 'Each piece = 1 insight + 1 visual', 'Stagger posting over 7 days', 'Cross-reference between pieces', 'End series with a compilation post'], effortLevel: 'Medium', qualityRetention: 85 },
  ];

  const styleConsistencyRules: StyleConsistency[] = [
    { element: 'Brand Colors', rule: 'Use identical hex codes across all platforms', platform: 'All', adaptation: 'Adjust contrast for dark-mode platforms (TikTok, Twitter dark). Test readability on both light and dark backgrounds.' },
    { element: 'Tone of Voice', rule: `Maintain ${brandVoice} tone consistently`, platform: 'All', adaptation: 'LinkedIn can be 10% more formal. TikTok can be 15% more casual. Never deviate more than that.' },
    { element: 'Visual Identity', rule: 'Same fonts, logo placement, and design system', platform: 'Instagram + LinkedIn', adaptation: 'Use the same carousel template across platforms. Only adjust dimensions (1:1 for Instagram, 4:5 for LinkedIn docs).' },
    { element: 'Hashtag Voice', rule: 'Create 1 branded hashtag used everywhere', platform: 'Instagram + TikTok + Twitter/X', adaptation: `Use #${nicheLabel.replace(/\s+/g, '')}Tips or similar. Consistent branded hashtag builds discoverability.` },
    { element: 'CTA Style', rule: 'Same CTA structure adapted to platform norms', platform: 'All', adaptation: 'Instagram: "Save this for later." LinkedIn: "What\'s your take?" TikTok: "Follow for part 2." Twitter: "Bookmark this thread."' },
    { element: 'Content Cadence', rule: 'Same content theme published across platforms within 48h', platform: 'All', adaptation: 'Post original on primary platform first. Adapt and publish on secondary platforms within 24-48 hours.' },
    { element: 'Bio & Link', rule: 'Consistent bio messaging and link destination', platform: 'All', adaptation: 'Use the same value proposition in every bio. Update link-in-bio tool to match current campaign.' },
    { element: 'Response Style', rule: 'Reply with same warmth and speed on every platform', platform: 'All', adaptation: 'Set up notification priorities. Reply within 1 hour on primary platform, within 4 hours on secondary.' },
  ];

  const engagementPredictions: EngagementPrediction[] = targetPlatformsList.map(tp => {
    const predictionData: Record<string, { rate: number; metric: string; tip: string }> = {
      'Instagram': { rate: 4.2, metric: 'Saves + Shares', tip: 'Add a "Save this for later" CTA — carousels with save prompts get 2x more reach' },
      'TikTok': { rate: 6.8, metric: 'Watch-Through Rate', tip: 'Hook in first second, deliver payoff by second 15 — completion rate drives everything' },
      'Twitter/X': { rate: 2.1, metric: 'Bookmarks + Retweets', tip: 'Write for bookmarks — actionable lists and frameworks get saved and shared most' },
      'LinkedIn': { rate: 3.8, metric: 'Comments (length matters)', tip: 'End with a reflective question — comments over 50 chars boost post 3x more than reactions' },
      'YouTube': { rate: 5.1, metric: 'Average View Duration', tip: 'First 30 seconds determine everything — front-load value, add pattern interrupts' },
      'Facebook': { rate: 1.9, metric: 'Shares + Group Posts', tip: 'Create content people want to share in Groups — community-relevant content wins' },
      'Pinterest': { rate: 3.4, metric: 'Pin Saves + Click-Through', tip: 'Keyword-optimize everything — Pinterest is a search engine, not a social feed' },
      'Snapchat': { rate: 2.8, metric: 'Story Completion Rate', tip: 'Keep stories under 6 snaps — completion drops dramatically after that' },
    };
    const data = predictionData[tp] || predictionData['Instagram'];
    return { platform: tp, predictedRate: data.rate, bestMetric: data.metric, boostTip: data.tip };
  });

  const localizationHints: LocalizationHint[] = [
    { region: 'North America', culturalNote: 'Direct communication style. Value efficiency and actionable content.', languageTip: 'Use conversational English. Contractions are natural. Avoid British spellings.', avoidThis: 'Overly formal language, excessive politeness markers, vague promises', localTrend: 'Short-form video dominates. Authentic > polished. Creator economy is mainstream.' },
    { region: 'Europe (Western)', culturalNote: 'Values nuance and depth. Less tolerance for hype.', languageTip: 'Adapt to local language when possible. Even basic translations show respect.', avoidThis: 'American-centric references, aggressive sales language, ignoring GDPR', localTrend: 'LinkedIn is huge for B2B. Instagram Reels growing fast. Privacy-conscious audience.' },
    { region: 'Latin America', culturalNote: 'Warm, relationship-driven. Community and family values are strong.', languageTip: 'Spanish varies by country. Brazilian Portuguese is distinct from European. Use local slang carefully.', avoidThis: 'Assuming all Spanish-speaking countries are the same, cold/transactional tone', localTrend: 'TikTok and Instagram dominate. WhatsApp is a major content distribution channel.' },
    { region: 'Asia-Pacific', culturalNote: 'Platform preferences vary wildly. LINE (Japan), KakaoTalk (Korea), WeChat (China).', languageTip: 'Professional translations essential. Machine translation often misses cultural nuance.', avoidThis: 'Assuming Western platforms are universal, ignoring local platform dominance', localTrend: 'Short video (Douyin/TikTok) is king. Live commerce is mainstream. Super-apps dominate.' },
    { region: 'Middle East & Africa', culturalNote: 'Growing digital adoption. Mobile-first. Value community and storytelling.', languageTip: 'Arabic is RTL (right-to-left) — ensure designs accommodate this. French widely spoken in North/West Africa.', avoidThis: 'Culturally insensitive imagery, ignoring religious considerations, desktop-first design', localTrend: 'Instagram and TikTok are primary. Mobile data costs affect content consumption patterns.' },
  ];

  const scheduleData: Record<string, { day: string; time: string; reason: string; priority: number }> = {
    'Instagram': { day: 'Tuesday', time: '11:00 AM', reason: 'Mid-morning engagement peak. Users check Instagram during work breaks.', priority: 90 },
    'TikTok': { day: 'Wednesday', time: '7:00 PM', reason: 'Evening scroll time. Highest For You page activity.', priority: 95 },
    'Twitter/X': { day: 'Tuesday', time: '8:00 AM', reason: 'Morning commute + work start. Professionals checking feeds.', priority: 82 },
    'LinkedIn': { day: 'Thursday', time: '7:30 AM', reason: 'Pre-work professional browsing. Document posts get peak engagement.', priority: 88 },
    'YouTube': { day: 'Friday', time: '3:00 PM', reason: 'Pre-weekend viewing. Shorts shelf activity peaks.', priority: 75 },
    'Facebook': { day: 'Wednesday', time: '1:00 PM', reason: 'Lunch break engagement. Share-worthy content circulates fastest.', priority: 65 },
    'Pinterest': { day: 'Saturday', time: '8:00 PM', reason: 'Weekend planning and inspiration browsing.', priority: 70 },
    'Snapchat': { day: 'Friday', time: '10:00 PM', reason: 'Late night younger demographic activity peak.', priority: 58 },
  };

  const crossPostSchedule: CrossPostSchedule[] = targetPlatformsList.map(tp => {
    const data = scheduleData[tp] || scheduleData['Instagram'];
    return { platform: tp, day: data.day, time: data.time, reason: data.reason, priority: data.priority };
  }).sort((a, b) => b.priority - a.priority);

  return {
    platformVariants,
    formatBlueprints: formatBlueprintsMap[contentFormat] || defaultBlueprints,
    styleConsistency: styleConsistencyRules,
    engagementPredictions,
    localizationHints,
    crossPostSchedule,
  };
}

export default function CrossPlatformPage() {
  const [sourcePlatform, setSourcePlatform] = useState<string>(sourcePlatforms[0]);
  const [selectedTargets, setSelectedTargets] = useState<string[]>(['TikTok', 'Twitter/X', 'LinkedIn']);
  const [contentFormat, setContentFormat] = useState<string>(contentFormats[0]);
  const [brandVoice, setBrandVoice] = useState<string>(brandVoices[0]);
  const [niche, setNiche] = useState('');
  const [originalContent, setOriginalContent] = useState('');
  const [result, setResult] = useState<CrossPlatformResult | null>(null);

  const toggleTarget = (platform: string) => {
    setSelectedTargets(prev =>
      prev.includes(platform) ? prev.filter(p => p !== platform) : [...prev, platform]
    );
  };

  const effortColor = (effort: string) => {
    switch (effort) {
      case 'Low': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'High': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const priorityColor = (priority: number) => {
    if (priority >= 85) return 'bg-green-500';
    if (priority >= 70) return 'bg-cyan-500';
    if (priority >= 50) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Cross-Platform Adapter</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform one piece of content into platform-native variants for every major social network. Maintain brand consistency while maximizing reach across platforms.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Source Platform</label>
              <select value={sourcePlatform} onChange={e => setSourcePlatform(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent">
                {sourcePlatforms.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Content Format</label>
              <select value={contentFormat} onChange={e => setContentFormat(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent">
                {contentFormats.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Brand Voice</label>
              <select value={brandVoice} onChange={e => setBrandVoice(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent">
                {brandVoices.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Niche / Industry</label>
              <input type="text" value={niche} onChange={e => setNiche(e.target.value)} placeholder="e.g. SaaS marketing, fitness, food blogging" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Original Content (optional)</label>
              <input type="text" value={originalContent} onChange={e => setOriginalContent(e.target.value)} placeholder="Paste your original content to get specific adaptation suggestions" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent" />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Target Platforms</label>
            <div className="flex flex-wrap gap-2">
              {targetPlatforms.map(tp => (
                <button
                  key={tp}
                  onClick={() => toggleTarget(tp)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    selectedTargets.includes(tp)
                      ? 'bg-cyan-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tp}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              if (selectedTargets.length === 0) return;
              setResult(generateCrossPlatformPlan(sourcePlatform, selectedTargets, contentFormat, brandVoice, niche, originalContent));
            }}
            className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
          >
            Generate Cross-Platform Plan
          </button>
        </div>

        {result && (
          <div className="space-y-6">

            {/* 1. Platform Variants */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Platform Variants</h2>
              <div className="space-y-4">
                {result.platformVariants.map((v, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-5">
                    <div className="flex flex-wrap items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold">{i + 1}</span>
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">{v.platform}</h3>
                          <span className="text-sm text-gray-500">{v.format}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Est. Reach</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="h-2 rounded-full bg-cyan-500" style={{ width: `${v.estimatedReach}%` }} />
                        </div>
                        <span className="text-sm font-bold text-gray-600">{v.estimatedReach}%</span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">{v.adaptedContent}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                      <div className="bg-cyan-50 rounded-lg p-3">
                        <p className="text-xs font-semibold text-cyan-600 mb-1">CHAR LIMIT</p>
                        <p className="text-sm text-cyan-800">{v.charLimit}</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-xs font-semibold text-blue-600 mb-1">CAPTION STYLE</p>
                        <p className="text-sm text-blue-800">{v.captionStyle}</p>
                      </div>
                      <div className="bg-indigo-50 rounded-lg p-3">
                        <p className="text-xs font-semibold text-indigo-600 mb-1">HASHTAG STRATEGY</p>
                        <p className="text-sm text-indigo-800">{v.hashtagStrategy}</p>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-3">
                        <p className="text-xs font-semibold text-purple-600 mb-1">BEST TIME</p>
                        <p className="text-sm text-purple-800">{v.bestTimeToPost}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Format Blueprints */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Format Blueprints</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.formatBlueprints.map((b, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-lg text-sm font-bold">{b.originalFormat}</span>
                        <span className="text-gray-400 font-bold">&rarr;</span>
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-bold">{b.targetFormat}</span>
                      </div>
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${effortColor(b.effortLevel)}`}>{b.effortLevel}</span>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs text-gray-500">Quality Retention</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className={`h-2 rounded-full ${b.qualityRetention >= 85 ? 'bg-green-500' : b.qualityRetention >= 70 ? 'bg-cyan-500' : 'bg-yellow-500'}`} style={{ width: `${b.qualityRetention}%` }} />
                      </div>
                      <span className="text-sm font-bold text-gray-600">{b.qualityRetention}%</span>
                    </div>
                    <ol className="space-y-1.5">
                      {b.transformationSteps.map((step, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="bg-gray-200 text-gray-600 w-5 h-5 rounded flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{j + 1}</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Style Consistency */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Style Consistency Guide</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.styleConsistency.map((s, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-cyan-100 text-cyan-700 px-2.5 py-1 rounded-lg text-xs font-bold">{s.element}</span>
                      <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg text-xs font-bold">{s.platform}</span>
                    </div>
                    <p className="font-medium text-gray-900 mb-2">{s.rule}</p>
                    <p className="text-sm text-gray-600">{s.adaptation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Engagement Predictions */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Engagement Predictions</h2>
              <div className="space-y-3">
                {result.engagementPredictions.map((e, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-5">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="md:w-48">
                        <h3 className="font-bold text-gray-900">{e.platform}</h3>
                        <span className="text-sm text-gray-500">{e.bestMetric}</span>
                      </div>
                      <div className="flex items-center gap-3 md:w-48">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className={`h-3 rounded-full ${e.predictedRate >= 5 ? 'bg-green-500' : e.predictedRate >= 3 ? 'bg-cyan-500' : 'bg-yellow-500'}`} style={{ width: `${Math.min(e.predictedRate * 10, 100)}%` }} />
                        </div>
                        <span className="text-lg font-bold text-gray-700 whitespace-nowrap">{e.predictedRate}%</span>
                      </div>
                      <p className="flex-1 text-sm text-gray-600">{e.boostTip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Localization Hints */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Global Localization Hints</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {result.localizationHints.map((l, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-5 flex flex-col">
                    <h3 className="font-bold text-gray-900 mb-3">{l.region}</h3>
                    <p className="text-sm text-gray-700 mb-3">{l.culturalNote}</p>
                    <div className="space-y-2 mt-auto">
                      <div className="bg-blue-50 rounded-lg p-2">
                        <p className="text-xs font-semibold text-blue-600">LANGUAGE</p>
                        <p className="text-xs text-blue-800">{l.languageTip}</p>
                      </div>
                      <div className="bg-red-50 rounded-lg p-2">
                        <p className="text-xs font-semibold text-red-600">AVOID</p>
                        <p className="text-xs text-red-800">{l.avoidThis}</p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-2">
                        <p className="text-xs font-semibold text-green-600">LOCAL TREND</p>
                        <p className="text-xs text-green-800">{l.localTrend}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Cross-Post Schedule */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Optimal Cross-Post Schedule</h2>
              <div className="space-y-3">
                {result.crossPostSchedule.map((s, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-5">
                    <div className="flex flex-wrap items-center gap-4">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold ${priorityColor(s.priority)}`}>{i + 1}</span>
                      <div className="md:w-32">
                        <h3 className="font-bold text-gray-900">{s.platform}</h3>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-lg text-sm font-bold">{s.day}</span>
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-bold">{s.time}</span>
                      </div>
                      <p className="flex-1 text-sm text-gray-600">{s.reason}</p>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div className={`h-2 rounded-full ${priorityColor(s.priority)}`} style={{ width: `${s.priority}%` }} />
                        </div>
                        <span className="text-sm font-bold text-gray-500">{s.priority}</span>
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
