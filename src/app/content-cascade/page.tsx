'use client';
import { useState } from 'react';

const sourceFormats = ['Blog Post', 'Podcast Episode', 'YouTube Video', 'Webinar Recording', 'Case Study', 'Research Report', 'Interview Transcript', 'Product Launch', 'Conference Talk', 'Newsletter Issue', 'White Paper', 'Social Thread'] as const;
const industries = ['Tech & SaaS', 'E-commerce & DTC', 'Finance & Fintech', 'Health & Wellness', 'Education & EdTech', 'Real Estate', 'Creator Economy', 'B2B Services', 'Sustainability', 'Food & Beverage', 'Travel & Hospitality', 'Entertainment'] as const;
const targetPlatformOptions = ['All Platforms (Max Reach)', 'Social-First (IG+TT+X)', 'Professional (LI+Email+Blog)', 'Video-First (YT+TT+Reels)', 'Community (Reddit+Discord+FB)', 'Search-First (Blog+YT+Pinterest)'] as const;
const cascadeDepths = ['Quick Cascade (10 pieces)', 'Standard Cascade (20 pieces)', 'Deep Cascade (30+ pieces)', 'Mega Cascade (50+ pieces)'] as const;
const brandTones = ['Professional & Authoritative', 'Casual & Conversational', 'Bold & Provocative', 'Educational & Helpful', 'Witty & Entertaining', 'Inspirational & Motivational'] as const;
const timeframes = ['Same Day Blitz', '1-Week Drip', '2-Week Campaign', '30-Day Content Plan'] as const;

interface CascadePiece { platform: string; format: string; title: string; hook: string; adaptationNotes: string; bestTime: string; estimatedReach: string; }
interface AtomizationStep { step: number; action: string; inputPiece: string; outputPieces: string[]; toolsNeeded: string; timeEstimate: string; }
interface PlatformAdaptation { platform: string; toneShift: string; formatRules: string; hashtagStrategy: string; cta: string; doNot: string; }
interface RepurposeLink { from: string; to: string; transformation: string; effortLevel: 'Low' | 'Medium' | 'High'; qualityRetention: number; }
interface ScheduleSlot { day: string; platform: string; contentType: string; caption: string; engagementTactic: string; }
interface CascadeResult {
  cascadeScore: number;
  cascadeMap: CascadePiece[];
  atomizationPlan: AtomizationStep[];
  platformAdaptations: PlatformAdaptation[];
  repurposeChain: RepurposeLink[];
  schedulePlan: ScheduleSlot[];
  amplificationTactics: string[];
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }
function pick<T>(arr: readonly T[] | T[], seed: number, idx: number = 0): T { return arr[(seed + idx) % arr.length]; }

function generateCascade(sourceFormat: string, industry: string, targetPlatforms: string, cascadeDepth: string, brandTone: string, timeframe: string): CascadeResult {
  const seed = hash(`${sourceFormat}-${industry}-${targetPlatforms}-${cascadeDepth}-${brandTone}-${timeframe}`);
  const cascadeScore = 50 + seed % 46;

  const allPlatforms = ['Instagram Reels', 'TikTok', 'LinkedIn', 'Twitter/X', 'YouTube Shorts', 'Facebook', 'Pinterest', 'Reddit', 'Email Newsletter', 'Blog Post', 'Threads', 'Discord', 'YouTube Long-form', 'Podcast Clip'];
  const allFormats = ['Short-form vertical video (30-60s)', 'Carousel post (8-10 slides)', 'Text thread (5-8 tweets)', 'Long-form article (1500+ words)', 'Infographic', 'Audio snippet (2-3 min)', 'Story series (5 frames)', 'Quote card', 'Behind-the-scenes reel', 'Data visualization post', 'Poll + discussion starter', 'Tutorial walkthrough', 'Meme adaptation', 'Live Q&A recap'];
  const allTitles = [
    'The 3-Minute Breakdown: Key Insights Visualized',
    'What Nobody Tells You About ' + industry + ' Content Strategy',
    '"I Tested This for 30 Days" — Real Results Revealed',
    'The Framework That Changed How We Approach ' + industry,
    'Stop Doing This: The #1 Mistake in ' + industry + ' Marketing',
    'Steal My Content System: From Idea to 30 Posts',
    'The Data Behind Our Best-Performing ' + industry + ' Content',
    'Hot Take: Why Most ' + industry + ' Content Fails (And How to Fix It)',
    'Behind the Scenes: How We Create ' + industry + ' Content at Scale',
    'The Complete Guide to ' + industry + ' Content That Converts',
    'Audience Q&A: Your Top ' + industry + ' Questions Answered',
    'Case Study Breakdown: What Worked and What Didn\'t',
    'The Counterintuitive ' + industry + ' Strategy That 10x\'d Our Reach',
    'Mini Documentary: A Day in ' + industry + ' Content Creation',
  ];
  const allHooks = [
    'Most people in ' + industry + ' are leaving 80% of their content potential on the table. Here\'s the cascade method...',
    'I turned one blog post into 47 pieces of content in a single afternoon. Let me show you how.',
    'Your competitors are posting 5x more than you — but they\'re only creating once. Here\'s their secret...',
    'This single framework generates a month of content from one idea. Save this.',
    'The content cascade strategy that helped us grow from 0 to 100K followers in ' + industry + '.',
    'You don\'t need more ideas. You need a better system. Here\'s mine.',
    'Every piece of content you create should become 10 more. Here\'s the exact process.',
    'The reason your content isn\'t working? You\'re creating, not cascading.',
    'I analyzed 500 top ' + industry + ' accounts. They all use this content multiplication framework.',
    'Stop creating content from scratch. Start cascading. Here\'s the difference.',
    'One podcast episode = 30 pieces of content. Here\'s the breakdown step by step.',
    'The 80/20 of content creation: create once, distribute everywhere, adapt for each platform.',
    'Your best content is already created — you just haven\'t repurposed it yet.',
    'This is the exact workflow we use to turn 1 idea into a 30-day content calendar.',
  ];
  const allAdaptationNotes = [
    'Shorten to under 60 seconds, use native captions, hook in first 3 seconds with pattern interrupt',
    'Convert key stats into slide-by-slide carousel with bold typography and brand colors',
    'Rewrite in professional first-person, add data points, include industry-specific hashtags',
    'Break into 5-part thread, lead with contrarian take, end with CTA to full content',
    'Extract 3 key quotes as visual cards with branded template, optimize for save-ability',
    'Add chapter markers, SEO-optimized title, custom thumbnail with curiosity gap',
    'Strip to audio-only highlights, add intro/outro bumper, optimize for commute listening',
    'Create searchable pin with keyword-rich description, link to full resource',
    'Summarize into 3-paragraph email with personal angle, add exclusive insight not in original',
    'Adapt for community discussion format, lead with question, share data as supporting context',
    'Use trending audio overlay, match visual style to platform aesthetic, add text overlays',
    'Create step-by-step tutorial format, slow pacing, numbered sections for clarity',
    'Adapt humor/meme angle for platform culture, reference trending formats, keep it relatable',
    'Add interactive elements: polls, quizzes, swipe-up links for deeper engagement',
  ];
  const allBestTimes = ['Monday 8-9 AM', 'Tuesday 12-1 PM', 'Wednesday 5-6 PM', 'Thursday 9-10 AM', 'Friday 2-3 PM', 'Saturday 10-11 AM', 'Sunday 7-8 PM', 'Weekdays 7-8 AM', 'Tue/Thu 11 AM-12 PM', 'Mon/Wed/Fri 6-7 PM', 'Daily 12-1 PM', 'Weekend 9-10 AM', 'Weekday evenings 8-9 PM', 'Tuesday/Thursday 3-4 PM'];
  const allReach = ['5K-15K impressions', '10K-30K views', '2K-8K engagements', '15K-50K reach', '1K-5K clicks', '8K-25K views', '3K-12K impressions', '20K-75K potential reach', '500-2K high-intent clicks', '12K-40K combined reach', '25K-80K viral potential', '5K-20K targeted impressions', '50K-150K max cascade reach', '7K-22K qualified views'];

  const cascadeMap: CascadePiece[] = Array.from({ length: 8 }, (_, i) => ({
    platform: allPlatforms[(seed + i * 3) % allPlatforms.length],
    format: allFormats[(seed + i * 5) % allFormats.length],
    title: allTitles[(seed + i * 4) % allTitles.length],
    hook: allHooks[(seed + i * 7) % allHooks.length],
    adaptationNotes: allAdaptationNotes[(seed + i * 6) % allAdaptationNotes.length],
    bestTime: allBestTimes[(seed + i * 2) % allBestTimes.length],
    estimatedReach: allReach[(seed + i * 9) % allReach.length],
  }));

  const allActions = [
    'Extract key quotes and statistics from source content',
    'Create visual assets (thumbnails, quote cards, infographics)',
    'Write platform-specific captions and hooks for each channel',
    'Record short-form video adaptations with native platform features',
    'Build carousel/slide content from main talking points',
    'Compile email newsletter version with exclusive angle',
    'Create community discussion prompts and poll questions',
    'Edit audio clips for podcast snippets and audiograms',
    'Optimize SEO metadata for search-first platforms',
    'Design Pinterest-optimized pins and blog header images',
    'Draft thread/text-only adaptations for Twitter/X and Threads',
    'Create behind-the-scenes content showing the creation process',
  ];
  const allInputPieces = [
    'Original ' + sourceFormat, 'Key quotes document', 'Visual asset library', 'Platform caption drafts',
    'Video raw footage', 'Audio extracted clips', 'Data points spreadsheet', 'Brand template kit',
    'SEO keyword research', 'Audience persona profiles', 'Competitor analysis notes', 'Performance data from past content',
  ];
  const allOutputSets = [
    ['3 quote cards', '1 infographic', '2 story frames'],
    ['5 carousel slides', '1 cover image', '3 alternate thumbnails'],
    ['8 platform captions', '4 hook variations', '2 CTA options'],
    ['3 vertical videos (30s)', '1 horizontal cut (90s)', '2 story clips'],
    ['1 LinkedIn article draft', '1 blog summary', '1 email version'],
    ['4 tweet-length snippets', '1 thread outline', '2 poll questions'],
    ['1 podcast teaser (60s)', '2 audiogram clips', '1 full audio extract'],
    ['5 Pinterest pins', '3 SEO-optimized descriptions', '1 board strategy'],
    ['1 Reddit post draft', '2 Discord discussion starters', '1 community recap'],
    ['3 meme adaptations', '2 trend-jacked versions', '1 duet/stitch prompt'],
    ['1 newsletter draft', '3 subject line options', '1 preview text'],
    ['2 BTS reels', '1 process breakdown', '3 raw moment clips'],
  ];
  const allTools = [
    'Canva + Brand Kit, Figma templates', 'CapCut + Auto-captions, Descript', 'ChatGPT + PostCraft AI caption generator',
    'Opus Clip for video repurposing', 'Headliner for audiograms', 'Buffer/Hootsuite for scheduling',
    'Ahrefs/SEMrush for SEO keywords', 'Notion for content calendar', 'Riverside for audio extraction',
    'Adobe Express for quick graphics', 'Repurpose.io for auto-distribution', 'Taplio for LinkedIn optimization',
  ];
  const allTimeEstimates = ['15-20 minutes', '30-45 minutes', '1-2 hours', '20-30 minutes', '45 min-1 hour', '10-15 minutes', '2-3 hours', '25-35 minutes', '1-1.5 hours', '5-10 minutes', '30-40 minutes', '15-25 minutes'];

  const atomizationPlan: AtomizationStep[] = Array.from({ length: 6 }, (_, i) => ({
    step: i + 1,
    action: allActions[(seed + i * 3) % allActions.length],
    inputPiece: allInputPieces[(seed + i * 5) % allInputPieces.length],
    outputPieces: allOutputSets[(seed + i * 4) % allOutputSets.length],
    toolsNeeded: allTools[(seed + i * 7) % allTools.length],
    timeEstimate: allTimeEstimates[(seed + i * 2) % allTimeEstimates.length],
  }));

  const allPlatformNames = ['Instagram', 'TikTok', 'LinkedIn', 'Twitter/X', 'YouTube', 'Pinterest', 'Reddit', 'Email', 'Facebook', 'Threads', 'Discord', 'Blog/SEO'];
  const allToneShifts = [
    'Shift from formal to visual storytelling — show, don\'t tell. Use casual voice-over style.',
    'Go full conversational — talk TO the audience, not AT them. Use trending language naturally.',
    'Elevate to thought-leader register — data-first, insight-heavy, professional but not stiff.',
    'Compress to punchy, quotable fragments — every sentence should stand alone as a screenshot.',
    'Long-form educational — slower pace, deeper context, chapter-based structure.',
    'Aspirational and search-optimized — descriptive, keyword-rich, visually driven.',
    'Community-native tone — authentic, discussion-oriented, avoid promotional language entirely.',
    'Personal and direct — write as if emailing one person. Warm, exclusive, value-packed.',
    'Broad and inclusive — accessible language, emotional hooks, share-worthy framing.',
    'Hot-take conversational — opinion-forward, engagement-bait-free but discussion-sparking.',
    'Niche and enthusiast — insider language welcome, deep-dive format, community credibility.',
    'SEO-formal with personality — structured, scannable, H2/H3 heavy, but not robotic.',
  ];
  const allFormatRules = [
    'Square or 4:5 ratio for feed, 9:16 for Reels/Stories. Carousel max 10 slides. First slide = hook.',
    '9:16 vertical only. 15-60s optimal. Hook in first 1.5 seconds. Native captions mandatory.',
    'Text-heavy posts perform best. 1300+ characters for articles. Use line breaks every 2-3 sentences.',
    '280 chars max per tweet. Thread = 5-12 tweets. First tweet = standalone hook. Add media to tweet 1.',
    '16:9 horizontal. 8-15 min for long-form. Shorts = under 60s vertical. Custom thumbnails required.',
    'Vertical pins 2:3 ratio. Text overlay on image. Keyword-rich description (500 chars). Link required.',
    'Text post with context. No self-promotion in first paragraph. Add genuine question at the end.',
    'Subject line under 50 chars. Preview text = second hook. 3-minute read max. One clear CTA.',
    'Vertical video or link post. Longer captions OK. Groups outperform pages. Add discussion question.',
    'Text-first, 500 char sweet spot. Reply to own post for thread effect. No external links in main post.',
    'Embed media directly. Use channel-appropriate formatting. Pin important messages. Add reaction prompts.',
    'H1 title, meta description under 160 chars. 1500-3000 words. Internal links. FAQ schema.',
  ];
  const allHashtagStrategies = [
    'Mix of 3 broad (#contentmarketing), 3 niche (#' + industry.toLowerCase().replace(/[^a-z]/g, '') + 'tips), 3 community (#creatorsof2026). Total: 9-12.',
    'Use 3-5 trending hashtags only. Check Discover page for current viral tags. Avoid overused generics.',
    'Max 3-5 hashtags. Industry-specific only (#B2Bmarketing, #SaaSgrowth). No trending/viral tags.',
    'No hashtags in tweets — use keywords naturally. Add 1-2 relevant hashtags only on high-reach tweets.',
    'Tags in description, not title. Use 5-8 specific tags. Include misspellings of common search terms.',
    'Keyword-stuff the description (not the pin). Use 2-3 hashtags. Focus on search terms over trending.',
    'Use subreddit flair instead. No hashtags. Tag relevant communities in crosspost.',
    'No hashtags in email body. Use topic tags for internal segmentation only.',
    '3-5 hashtags maximum. Mix branded (#YourBrand) with topical. Avoid Facebook-specific tags.',
    'Minimal hashtags (2-3). Test hashtag vs. no-hashtag performance. Focus on keyword-rich text.',
    'Use channel-specific tags and roles. No traditional hashtags. @mention relevant members.',
    'No hashtags in body. Use in meta tags and categories. Focus on long-tail keywords in content.',
  ];
  const allCTAs = [
    '"Save this for later" + "Follow for more [industry] breakdowns"',
    '"Stitch this with your take" + "Follow for Part 2"',
    '"Drop your thoughts in the comments" + "Connect with me for more"',
    '"Repost if this resonates" + "Read the full thread"',
    '"Subscribe for weekly deep-dives" + "Check the link in description"',
    '"Pin this to your [topic] board" + "Visit the full guide"',
    '"What\'s your experience with this?" + "Join the discussion"',
    '"Reply to this email with your take" + "Forward to a colleague who needs this"',
    '"Share in your favorite group" + "Tag someone who needs to see this"',
    '"What would you add to this?" + "Follow for daily insights"',
    '"React if you agree" + "Share your perspective in the thread"',
    '"Bookmark this resource" + "Subscribe for the next deep-dive"',
  ];
  const allDoNots = [
    'Don\'t use low-res images or unbranded templates. Don\'t post without alt text. Don\'t ignore Story replies.',
    'Don\'t use horizontal video. Don\'t add text in the "dead zone" (top/bottom 15%). Don\'t hard-sell in caption.',
    'Don\'t use emojis excessively. Don\'t post memes or casual humor. Don\'t tag-spam people for engagement.',
    'Don\'t post threads longer than 12 tweets. Don\'t use all caps. Don\'t quote-tweet yourself repeatedly.',
    'Don\'t upload without custom thumbnail. Don\'t skip end screen. Don\'t use misleading titles.',
    'Don\'t use dark/low-contrast images. Don\'t forget to add link. Don\'t use horizontal images.',
    'Don\'t self-promote in first comment. Don\'t use marketing speak. Don\'t ignore community rules.',
    'Don\'t send without preview text. Don\'t use more than one CTA. Don\'t use "no-reply" sender.',
    'Don\'t use engagement bait language. Don\'t post the same content as Instagram. Don\'t ignore comments.',
    'Don\'t post links as main content. Don\'t repost from other platforms without adaptation. Don\'t spam.',
    'Don\'t post without context in the channel. Don\'t @ everyone unless critical. Don\'t cross-post blindly.',
    'Don\'t publish without meta description. Don\'t keyword-stuff unnaturally. Don\'t skip internal linking.',
  ];

  const platformAdaptations: PlatformAdaptation[] = Array.from({ length: 6 }, (_, i) => ({
    platform: allPlatformNames[(seed + i * 3) % allPlatformNames.length],
    toneShift: allToneShifts[(seed + i * 5) % allToneShifts.length],
    formatRules: allFormatRules[(seed + i * 4) % allFormatRules.length],
    hashtagStrategy: allHashtagStrategies[(seed + i * 7) % allHashtagStrategies.length],
    cta: allCTAs[(seed + i * 6) % allCTAs.length],
    doNot: allDoNots[(seed + i * 2) % allDoNots.length],
  }));

  const allFromFormats = ['Original ' + sourceFormat, 'LinkedIn Article', 'YouTube Long-form', 'Blog Post', 'Podcast Episode', 'Email Newsletter', 'Twitter/X Thread', 'Instagram Carousel', 'Webinar Recording', 'Case Study', 'Infographic', 'Conference Talk Recording'];
  const allToFormats = ['Instagram Carousel', 'TikTok Series (3 parts)', 'LinkedIn Text Post', 'Twitter/X Thread', 'YouTube Shorts', 'Pinterest Pin Series', 'Reddit Discussion Post', 'Email Newsletter', 'Blog Article', 'Podcast Clip (2 min)', 'Discord Discussion', 'Facebook Group Post'];
  const allTransformations = [
    'Extract 5 key points, design slide-by-slide with bold stats and branded visuals, add swipe CTA',
    'Identify 3 most engaging segments, cut to 30-60s vertical clips, add native captions and trending audio',
    'Distill main argument into 1300-char personal narrative, lead with contrarian hook, end with question',
    'Break into 8-tweet thread with one insight per tweet, add data/examples, first tweet = standalone hook',
    'Pull most visual/dramatic 45-second segment, add text overlays and fast-paced editing',
    'Convert key data points into vertical infographic pins with keyword-rich descriptions and UTM links',
    'Rewrite as genuine discussion starter, add context without promotional angle, include question prompt',
    'Summarize into 3-min read with personal angle, add exclusive insight not in public version, one CTA',
    'Expand with SEO research, add H2/H3 structure, internal links, FAQ section, and schema markup',
    'Extract best 2-minute audio segment, add intro bumper, optimize levels, create audiogram visual',
    'Create discussion prompt with key takeaways, format for channel, add reaction prompts and follow-up Qs',
    'Adapt for casual community tone, lead with question, provide value before asking for engagement',
  ];
  const effortLevels: ('Low' | 'Medium' | 'High')[] = ['Low', 'Medium', 'High'];

  const repurposeChain: RepurposeLink[] = Array.from({ length: 5 }, (_, i) => ({
    from: allFromFormats[(seed + i * 3) % allFromFormats.length],
    to: allToFormats[(seed + i * 5) % allToFormats.length],
    transformation: allTransformations[(seed + i * 4) % allTransformations.length],
    effortLevel: effortLevels[(seed + i * 2) % effortLevels.length],
    qualityRetention: 55 + (seed + i * 7) % 40,
  }));

  const allDays = ['Day 1 (Monday)', 'Day 2 (Tuesday)', 'Day 3 (Wednesday)', 'Day 4 (Thursday)', 'Day 5 (Friday)', 'Day 6 (Saturday)', 'Day 7 (Sunday)', 'Day 8', 'Day 10', 'Day 12', 'Day 14', 'Day 21'];
  const allSchedulePlatforms = ['Instagram', 'TikTok', 'LinkedIn', 'Twitter/X', 'YouTube', 'Email', 'Pinterest', 'Reddit', 'Facebook', 'Threads', 'Blog', 'Discord'];
  const allContentTypes = ['Teaser reel (30s)', 'Full carousel (10 slides)', 'Thought leadership post', 'Thread (8 tweets)', 'YouTube Short', 'Newsletter deep-dive', 'Pin series (5 pins)', 'Discussion post', 'Community recap', 'Hot take text post', 'SEO article', 'AMA announcement'];
  const allCaptions = [
    '"Something big dropping this week. Here\'s a sneak peek at the insight that changed our ' + industry + ' strategy..."',
    '"I broke down [topic] into 10 actionable slides. Swipe through and save for later. Slide 7 is the game-changer."',
    '"Unpopular opinion: most ' + industry + ' content strategies are broken. Here\'s the framework we use instead (data inside)..."',
    '"Thread: The content cascade method that turned 1 idea into 30+ pieces. Every step, tool, and template included."',
    '"60 seconds. One framework. Everything you need to know about cascading content in ' + industry + '. Full breakdown below."',
    '"This week\'s exclusive: the complete cascade blueprint with templates you won\'t find anywhere else. Open rate last week: 47%."',
    '"The complete visual guide to content cascading for ' + industry + '. Pin this to your marketing strategy board."',
    '"Genuine question for the ' + industry + ' community: how do you handle content repurposing at scale? Here\'s what we\'ve found..."',
    '"Bringing this discussion to the group: the #1 content multiplication tactic we\'ve tested this quarter."',
    '"Hot take: creating original content for every platform is a waste of time. Here\'s why cascading wins."',
    '"The definitive guide to content cascading for ' + industry + ' [2026 edition]. Includes templates, tools, and real results."',
    '"Live AMA this Thursday: ask me anything about content cascading, repurposing, and scaling your ' + industry + ' reach."',
  ];
  const allEngagementTactics = [
    'Ask followers to guess the full topic in comments — reveal in next post',
    'End with "Save this" CTA + pin the first comment with a bonus tip',
    'Tag 3 industry leaders in comments and ask for their take on the framework',
    'Quote-retweet your own thread with a hot take that sparks debate',
    'Pin a comment with a question to boost comment velocity in first hour',
    'Include a "reply to this email" prompt — replies boost deliverability',
    'Create a "Pin collection" and invite followers to add their own related pins',
    'Engage with every comment in the first 2 hours — Reddit rewards early engagement',
    'Post in 3 relevant groups within 1 hour — cross-pollinate the discussion',
    'Reply to your own post with additional context — creates thread effect',
    'Add a related internal link in the first comment and respond to every blog comment',
    'Create a dedicated thread for Q&A and react to every contribution',
  ];

  const schedulePlan: ScheduleSlot[] = Array.from({ length: 6 }, (_, i) => ({
    day: allDays[(seed + i * 3) % allDays.length],
    platform: allSchedulePlatforms[(seed + i * 5) % allSchedulePlatforms.length],
    contentType: allContentTypes[(seed + i * 4) % allContentTypes.length],
    caption: allCaptions[(seed + i * 7) % allCaptions.length],
    engagementTactic: allEngagementTactics[(seed + i * 6) % allEngagementTactics.length],
  }));

  const amplificationTactics = [
    'Cross-post the top-performing piece to 3 secondary platforms within 24 hours of peak engagement',
    'Email your list within 4 hours of publishing the anchor content — early traffic signals boost algorithms',
    'Engage with every comment in the first 60 minutes on each platform — response rate directly impacts reach',
    'Repurpose top comments and questions from the cascade into new standalone content pieces',
    'Share behind-the-scenes of the cascade creation process — meta-content about content performs well',
    'Collaborate with 2-3 industry peers to co-cascade — cross-audience exposure multiplies reach by 3-5x',
    'Boost the top-performing organic piece with $20-50 paid amplification on its best-performing platform',
    'Create a "cascade results" follow-up post showing real metrics — transparency content drives trust and saves',
    'Syndicate the long-form version to Medium, Substack, and LinkedIn Articles with canonical links',
    'Schedule a "cascade refresh" for 30 days later — evergreen content gets a second life with minor updates',
    'Use each platform\'s native features (polls, quizzes, Q&A stickers) to extend cascade engagement by 48 hours',
    'Pin the best-performing cascade piece to your profile on every platform for 7 days',
  ];

  const selectedTactics = Array.from({ length: 8 }, (_, i) => amplificationTactics[(seed + i * 3) % amplificationTactics.length]);

  return { cascadeScore, cascadeMap, atomizationPlan, platformAdaptations, repurposeChain, schedulePlan, amplificationTactics: selectedTactics };
}

export default function ContentCascadePage() {
  const [sourceFormat, setSourceFormat] = useState(sourceFormats[0]);
  const [industry, setIndustry] = useState(industries[0]);
  const [targetPlatforms, setTargetPlatforms] = useState(targetPlatformOptions[0]);
  const [cascadeDepth, setCascadeDepth] = useState(cascadeDepths[0]);
  const [brandTone, setBrandTone] = useState(brandTones[0]);
  const [timeframe, setTimeframe] = useState(timeframes[0]);
  const [result, setResult] = useState<CascadeResult | null>(null);

  const handleGenerate = () => setResult(generateCascade(sourceFormat, industry, targetPlatforms, cascadeDepth, brandTone, timeframe));

  const scoreColor = (n: number) => n > 75 ? '#34d399' : n > 55 ? '#fbbf24' : n > 35 ? '#fb923c' : '#f87171';
  const effortColor = (e: string) => e === 'Low' ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30' : e === 'Medium' ? 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30' : 'text-red-400 bg-red-400/10 border-red-400/30';

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Content Cascade — Multi-Platform Content Multiplier</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Transform one piece of content into 30+ platform-optimized pieces. Maximize reach, minimize effort.</p>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {([
            { label: 'Source Format', value: sourceFormat, setter: setSourceFormat as (v: string) => void, options: sourceFormats as readonly string[] },
            { label: 'Industry', value: industry, setter: setIndustry as (v: string) => void, options: industries as readonly string[] },
            { label: 'Target Platforms', value: targetPlatforms, setter: setTargetPlatforms as (v: string) => void, options: targetPlatformOptions as readonly string[] },
            { label: 'Cascade Depth', value: cascadeDepth, setter: setCascadeDepth as (v: string) => void, options: cascadeDepths as readonly string[] },
            { label: 'Brand Tone', value: brandTone, setter: setBrandTone as (v: string) => void, options: brandTones as readonly string[] },
            { label: 'Timeframe', value: timeframe, setter: setTimeframe as (v: string) => void, options: timeframes as readonly string[] },
          ] as const).map(({ label, value, setter, options }) => (
            <div key={label}>
              <label className="block text-sm text-zinc-400 mb-1">{label}</label>
              <select value={value} onChange={e => setter(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100">
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
        <button onClick={handleGenerate} className="w-full md:w-auto bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded font-semibold hover:opacity-90 transition mb-8">Generate Content Cascade</button>

        {result && (
          <div className="space-y-8">
            {/* Score + Summary */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 text-center">
                <div className="text-6xl font-bold mb-2" style={{ color: scoreColor(result.cascadeScore) }}>{result.cascadeScore}</div>
                <div className="text-zinc-400 mb-1">Cascade Potential Score</div>
                <div className="mt-3 w-full bg-zinc-800 rounded-full h-3">
                  <div className="h-3 rounded-full transition-all" style={{ width: `${result.cascadeScore}%`, background: scoreColor(result.cascadeScore) }} />
                </div>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3">Cascade Summary</h3>
                <div className="space-y-2 text-sm">
                  <div><span className="text-zinc-500">Source:</span> <span className="text-violet-400">{sourceFormat}</span></div>
                  <div><span className="text-zinc-500">Industry:</span> <span className="text-zinc-300">{industry}</span></div>
                  <div><span className="text-zinc-500">Distribution:</span> <span className="text-zinc-300">{targetPlatforms}</span></div>
                  <div><span className="text-zinc-500">Depth:</span> <span className="text-zinc-300">{cascadeDepth}</span></div>
                  <div><span className="text-zinc-500">Pieces Generated:</span> <span className="text-emerald-400 font-semibold">{result.cascadeMap.length} platform pieces</span></div>
                  <div><span className="text-zinc-500">Schedule:</span> <span className="text-fuchsia-400">{timeframe}</span></div>
                </div>
              </div>
            </div>

            {/* Cascade Map */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Cascade Map ({result.cascadeMap.length} Pieces)</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {result.cascadeMap.map((piece, i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-violet-400 font-semibold text-sm">{piece.platform}</span>
                      <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded">{piece.bestTime}</span>
                    </div>
                    <div className="text-zinc-200 font-semibold mb-1">{piece.title}</div>
                    <div className="text-xs text-fuchsia-400/80 mb-2">{piece.format}</div>
                    <div className="text-sm text-zinc-400 mb-2"><span className="text-zinc-500">Hook:</span> {piece.hook}</div>
                    <div className="text-sm text-zinc-500 mb-2">{piece.adaptationNotes}</div>
                    <div className="text-xs text-emerald-400">{piece.estimatedReach}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Atomization Plan */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Atomization Plan</h3>
              <div className="space-y-4">
                {result.atomizationPlan.map((step, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-5 border border-zinc-700/50">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400 font-bold text-lg">{step.step}</div>
                      <div className="flex-1">
                        <div className="font-semibold text-zinc-200 mb-1">{step.action}</div>
                        <div className="text-sm text-zinc-400 mb-2"><span className="text-zinc-500">Input:</span> {step.inputPiece}</div>
                        <div className="text-sm mb-2">
                          <span className="text-zinc-500">Outputs:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {step.outputPieces.map((o, oi) => (
                              <span key={oi} className="text-xs bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 px-2 py-0.5 rounded">{o}</span>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-between text-xs text-zinc-500">
                          <span>Tools: {step.toolsNeeded}</span>
                          <span className="text-orange-400">{step.timeEstimate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Adaptations */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Platform Adaptations</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {result.platformAdaptations.map((pa, i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700">
                    <div className="text-violet-400 font-bold mb-2">{pa.platform}</div>
                    <div className="text-sm space-y-2">
                      <div><span className="text-zinc-500">Tone Shift:</span> <span className="text-zinc-300">{pa.toneShift}</span></div>
                      <div><span className="text-zinc-500">Format Rules:</span> <span className="text-zinc-300">{pa.formatRules}</span></div>
                      <div><span className="text-zinc-500">Hashtags:</span> <span className="text-fuchsia-400/80">{pa.hashtagStrategy}</span></div>
                      <div><span className="text-zinc-500">CTA:</span> <span className="text-emerald-400/80">{pa.cta}</span></div>
                      <div className="text-red-400/70 text-xs mt-1">{pa.doNot}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Repurpose Chain */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Repurpose Chain</h3>
              <div className="space-y-4">
                {result.repurposeChain.map((link, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-5 border border-zinc-700/50">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-zinc-200 font-semibold">{link.from}</span>
                      <span className="text-violet-400 text-lg">-&gt;</span>
                      <span className="text-fuchsia-400 font-semibold">{link.to}</span>
                      <span className={`text-xs px-2 py-1 rounded-full border ml-auto ${effortColor(link.effortLevel)}`}>{link.effortLevel} Effort</span>
                    </div>
                    <div className="text-sm text-zinc-400 mb-3">{link.transformation}</div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-zinc-500">Quality Retention:</span>
                      <div className="flex-1 bg-zinc-700 rounded-full h-2">
                        <div className="h-2 rounded-full" style={{ width: `${link.qualityRetention}%`, background: scoreColor(link.qualityRetention) }} />
                      </div>
                      <span className="text-sm font-bold" style={{ color: scoreColor(link.qualityRetention) }}>{link.qualityRetention}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule Plan */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Schedule Plan</h3>
              <div className="space-y-3">
                {result.schedulePlan.map((slot, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50 flex gap-4">
                    <div className="flex-shrink-0 w-24 text-center">
                      <div className="text-xs text-zinc-500 uppercase tracking-wider">{slot.day}</div>
                      <div className="text-violet-400 font-semibold text-sm mt-1">{slot.platform}</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-zinc-200 mb-1">{slot.contentType}</div>
                      <div className="text-sm text-zinc-400 italic mb-2">{slot.caption}</div>
                      <div className="text-xs text-emerald-400/70">{slot.engagementTactic}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Amplification Tactics */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Amplification Tactics</h3>
              <div className="grid md:grid-cols-2 gap-2">
                {result.amplificationTactics.map((tactic, i) => (
                  <label key={i} className="flex items-start gap-2 text-sm text-zinc-300 cursor-pointer hover:text-zinc-100">
                    <input type="checkbox" className="mt-1 accent-violet-500" />
                    <span>{tactic}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">Multiply Your Content Impact</h3>
              <p className="text-zinc-400 mb-4">Use PostCraft AI to cascade every piece of content across all platforms. Pair with <a href="/atomizer" className="text-violet-400 underline">Content Atomizer</a>, <a href="/content-flow" className="text-violet-400 underline">Content Flow</a>, and <a href="/content-scaler" className="text-violet-400 underline">Content Scaler</a>.</p>
              <a href="/pricing" className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">Get PostCraft Pro</a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
