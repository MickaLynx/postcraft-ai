'use client';
import { useState } from 'react';

const platformOptions = ['Instagram', 'Twitter/X', 'LinkedIn', 'TikTok', 'Facebook', 'YouTube', 'Pinterest'] as const;
const categoryOptions = ['Product Launch', 'Educational', 'Behind-the-Scenes', 'User Testimonial', 'Promotional', 'Engagement Bait', 'Trending/Reactive', 'Storytelling', 'Authority Building', 'Community'] as const;
const toneOptions = ['Professional', 'Casual & Fun', 'Inspirational', 'Bold & Edgy', 'Warm & Empathetic', 'Data-Driven', 'Humorous', 'Minimalist'] as const;
const industries = ['E-commerce', 'SaaS / Tech', 'Health & Wellness', 'Finance', 'Education', 'Real Estate', 'Food & Beverage', 'Fashion', 'Travel', 'Agency'] as const;

interface PostTemplate { id: number; name: string; platform: string; category: string; structure: string; example: string; hook: string; cta: string; bestTime: string; expectedEngagement: string; hashtags: string; }
interface CarouselTemplate { title: string; slides: string[]; designTip: string; engagementBoost: string; }
interface VideoTemplate { name: string; duration: string; structure: string; hookSeconds: string; script: string; musicTip: string; }
interface CaptionFormula { name: string; formula: string; example: string; bestFor: string; conversionRate: string; }
interface PlatformGuide { platform: string; optimalLength: string; bestFormats: string; postFrequency: string; peakTimes: string; doNot: string; }

interface TemplateLibrary {
  totalTemplates: number;
  postTemplates: PostTemplate[];
  carouselTemplates: CarouselTemplate[];
  videoTemplates: VideoTemplate[];
  captionFormulas: CaptionFormula[];
  platformGuides: PlatformGuide[];
  weeklyPlan: string[];
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }

function generateLibrary(plat: string, category: string, tone: string, industry: string, brand: string): TemplateLibrary {
  const seed = hash(`${plat}-${category}-${tone}-${industry}-${brand}`);
  const brandUpper = brand.charAt(0).toUpperCase() + brand.slice(1);

  const postTemplates: PostTemplate[] = [
    { id: 1, name: 'The Problem-Agitate-Solve', platform: plat, category: 'Educational', structure: 'Line 1: Name the problem (pain point)\nLine 2: Agitate (show consequences)\nLine 3-4: Present solution\nLine 5: CTA', example: `Tired of spending 3 hours on a single post?\n\nThat's 15 hours/week you'll never get back. While your competitors are publishing 5x more content.\n\n${brandUpper} cuts that to 10 minutes. AI-powered, brand-consistent, ready to publish.\n\nTry free — link in bio`, hook: 'Start with the exact pain your audience feels daily', cta: 'Try free / Link in bio / Start now', bestTime: plat === 'LinkedIn' ? '8-10 AM Tue-Thu' : '12-1 PM & 7-9 PM', expectedEngagement: '3-5% engagement rate', hashtags: `#${industry.replace(/[^a-zA-Z]/g, '')} #ContentCreation #Productivity` },
    { id: 2, name: 'The Hot Take', platform: plat, category: 'Authority Building', structure: 'Line 1: Controversial opinion (bold statement)\nLine 2: Why most people are wrong\nLine 3-4: Your evidence/experience\nLine 5: Reframe with insight', example: `Unpopular opinion: Posting every day is killing your brand.\n\nI've seen accounts with 3 posts/week outperform daily posters by 2x. Why? Because quality compounds. Spam doesn't.\n\n${brandUpper} posts 3x/week. Every piece is crafted, not rushed.\n\nQuality > quantity. Always.`, hook: 'Open with "Unpopular opinion" or "Hot take"', cta: 'Agree or disagree? Comment below', bestTime: plat === 'Twitter/X' ? '8 AM & 5 PM' : '11 AM - 1 PM', expectedEngagement: '5-8% (controversy drives comments)', hashtags: '#HotTake #SocialMediaStrategy #ContentMarketing' },
    { id: 3, name: 'The Before/After', platform: plat, category: 'User Testimonial', structure: 'Line 1: "Before" state (relatable struggle)\nLine 2: The turning point\nLine 3: "After" state (transformation)\nLine 4: Proof/metric\nLine 5: CTA', example: `Before: 200 followers, 2% engagement, posting into the void\nAfter 90 days with ${brandUpper}: 12K followers, 8% engagement, 3 brand deals\n\nThe difference? A system. Not luck.\n\nSame content quality. Better strategy. Consistent execution.\n\nDM "SYSTEM" for the framework`, hook: 'Lead with the "before" state your audience is living right now', cta: 'DM keyword / Save this / Tag someone who needs this', bestTime: '6-8 PM (end of day reflection)', expectedEngagement: '4-6% (transformation content saves well)', hashtags: '#Transformation #GrowthMindset #Results' },
    { id: 4, name: 'The Numbered List', platform: plat, category: 'Educational', structure: 'Line 1: "X [things] that [outcome]"\nLine 2-6: List items (1 per line, actionable)\nLine 7: Summary insight\nLine 8: CTA', example: `5 ${industry.toLowerCase()} posts that get 10x more saves:\n\n1. "How I..." stories (personal experience)\n2. "X mistakes" lists (fear of missing out)\n3. Step-by-step tutorials (save for later)\n4. Tool/resource roundups (reference value)\n5. Industry myth-busting (shareability)\n\nThe common thread? Utility. People save what helps them.\n\nSave this for your next content batch`, hook: 'Number + benefit in first line', cta: 'Save this / Which is your favorite? / Add #6 in comments', bestTime: '10 AM - 12 PM (learning mode)', expectedEngagement: '3-5% (high save rate)', hashtags: '#ContentTips #SocialMediaTips #MarketingStrategy' },
    { id: 5, name: 'The Story Arc', platform: plat, category: 'Storytelling', structure: 'Line 1: Hook (dramatic moment)\nLine 2-3: Context/backstory\nLine 4-5: The struggle/conflict\nLine 6: The breakthrough\nLine 7: The lesson\nLine 8: CTA', example: `I almost quit ${industry.toLowerCase()} last March.\n\n6 months of content. Zero traction. My best post got 12 likes (4 were family).\n\nThen I changed ONE thing: I stopped creating for algorithms and started creating for 1 specific person.\n\nMonth 7: 1,200 followers. Month 9: first paying client. Month 12: full-time.\n\nThe algorithm follows attention. Create for humans first.\n\nWho's your "one person"? Comment below`, hook: 'Start at the emotional peak — not the beginning', cta: 'Share your story / Comment your experience', bestTime: '7-9 PM (evening storytelling)', expectedEngagement: '6-10% (stories drive comments + shares)', hashtags: '#MyStory #Entrepreneurship #RealTalk' },
    { id: 6, name: 'The Comparison Post', platform: plat, category: 'Product Launch', structure: 'Line 1: "X vs Y" or "What [audience] think vs reality"\nLine 2-3: Column A (common belief)\nLine 4-5: Column B (your insight)\nLine 6: Why B wins\nLine 7: CTA', example: `What people think ${industry.toLowerCase()} content needs:\n❌ Perfect graphics\n❌ Viral hooks\n❌ Daily posting\n❌ Trending audio\n\nWhat actually works:\n✅ Clear message\n✅ Genuine value\n✅ Consistent cadence\n✅ Authentic voice\n\nPerfection is the enemy of progress. Ship it.\n\nAgree? Share with your team`, hook: 'Use ❌/✅ or "Think vs Reality" format', cta: 'Tag your team / Share if you agree', bestTime: '9-11 AM (comparison content)', expectedEngagement: '4-7% (shareable format)', hashtags: '#ContentStrategy #MarketingMyths #RealTalk' },
  ];

  const carouselTemplates: CarouselTemplate[] = [
    { title: 'The "How To" Tutorial', slides: ['Slide 1: Bold title + problem statement — "How to [achieve X] in [timeframe]"', 'Slide 2: Why most approaches fail (the mistake)', 'Slide 3-7: Step-by-step process (1 step per slide, visual + short text)', 'Slide 8: Summary of all steps in one view', 'Slide 9: Before/after result or proof', 'Slide 10: CTA — "Save this for later" + "Follow for more"'], designTip: 'Use consistent brand colors, large text (24pt+), one idea per slide. Arrow or number to show progression.', engagementBoost: '2-3x higher save rate than single image posts' },
    { title: 'The "Myth vs Reality"', slides: ['Slide 1: "X Myths About [Topic] — Debunked"', 'Slide 2-3: Myth #1 + Reality (red vs green color coding)', 'Slide 4-5: Myth #2 + Reality', 'Slide 6-7: Myth #3 + Reality', 'Slide 8: "The truth is..." summary', 'Slide 9: Your solution/approach', 'Slide 10: CTA + Follow'], designTip: 'Use red/green or X/checkmark for visual contrast. Bold myth text, softer reality text.', engagementBoost: '3-4x higher share rate (people tag friends who believe the myths)' },
    { title: 'The "Resource Dump"', slides: ['Slide 1: "X Tools/Resources for [Outcome]" — value-first title', 'Slide 2-8: One tool per slide (name, what it does, why it matters, free/paid)', 'Slide 9: Comparison table of all tools', 'Slide 10: "Which do you use? Comment below" + save CTA'], designTip: 'Include tool logos/screenshots. Make it scannable — people swipe fast.', engagementBoost: 'Highest save rate of any carousel type — 4-5x average' },
  ];

  const videoTemplates: VideoTemplate[] = [
    { name: 'The 30-Second Hook-Value-CTA', duration: '15-30 seconds', structure: '0-3s: Visual hook (text on screen + movement)\n3-10s: Problem statement\n10-25s: Solution/tip (actionable)\n25-30s: CTA (follow for more)', hookSeconds: 'First 1.5 seconds determine if viewer stays — use pattern interrupt', script: `[TEXT ON SCREEN: "Stop doing THIS on ${plat}"]\n\n"If you're spending more than 30 minutes on a single ${industry.toLowerCase()} post, you're doing it wrong.\n\nHere's what top creators do instead: they batch. 1 hour, 7 posts, scheduled for the week.\n\nThe secret? Templates. Not starting from scratch every time.\n\nFollow for more ${industry.toLowerCase()} tips."`, musicTip: 'Trending audio for discoverability OR original audio for authority — never generic stock music' },
    { name: 'The "Day in My Life" (Business Edition)', duration: '45-90 seconds', structure: '0-3s: "A day running a [industry] brand"\n3-30s: Morning routine (work setup, planning)\n30-60s: Peak moment (creating, meeting, shipping)\n60-80s: Honest moment (challenge, real talk)\n80-90s: End with result or lesson', hookSeconds: 'Show the most visually interesting moment FIRST, then loop back', script: `"Here's what running a ${industry.toLowerCase()} brand actually looks like...\n\n7 AM: Coffee + content calendar review. 3 posts to create today.\n9 AM: Batch filming — this is where the magic happens.\n12 PM: Analytics check — yesterday's post hit 50K reach.\n3 PM: Client call went sideways — this is the part nobody shows.\n6 PM: Tomorrow's content scheduled. Time to decompress.\n\nThe highlight reel is 10%. The grind is 90%. But that's the job."`, musicTip: 'Soft lo-fi for daily routines, upbeat for energetic days — match energy to content' },
  ];

  const captionFormulas: CaptionFormula[] = [
    { name: 'AIDA (Attention-Interest-Desire-Action)', formula: '[Attention hook] → [Interesting fact/story] → [Desire: paint the outcome] → [Action: clear CTA]', example: `"Your competitors are posting 3x more than you." (A)\n"But here's the thing — 80% of their content gets zero engagement." (I)\n"Imagine posting half as much but getting 5x the results. That's what happens when you focus on quality + strategy." (D)\n"DM 'STRATEGY' and I'll send you the exact framework." (A)`, bestFor: 'Product launches, lead generation, conversion-focused posts', conversionRate: '2-4% click-through on CTA (highest of all formulas)' },
    { name: 'PAS (Problem-Agitate-Solve)', formula: '[Problem your audience has] → [Agitate: make them feel it] → [Solve: your solution]', example: `"Creating content for ${industry.toLowerCase()} is exhausting." (P)\n"You spend hours crafting the perfect post, hit publish, and... 12 likes. Meanwhile, some teenager goes viral with a 5-second clip." (A)\n"The difference isn't talent. It's templates. Here are 6 that work every time." (S)`, bestFor: 'Educational content, pain-point marketing, service promotion', conversionRate: '3-5% engagement rate (agitation drives comments)' },
    { name: 'BAB (Before-After-Bridge)', formula: '[Before: current painful state] → [After: desired future state] → [Bridge: how to get there]', example: `"Before: Spending 20 hours/week on social media with nothing to show for it." (B)\n"After: 5 hours/week, 3x engagement, and actual leads coming in." (A)\n"The bridge? A content system that works FOR you, not against you. Here's how..." (B)`, bestFor: 'Transformation content, course/coaching promotion, SaaS products', conversionRate: '2-3% save rate (people save the "bridge" for later)' },
    { name: 'The One-Liner + Thread', formula: '[Single powerful statement that makes people stop scrolling] → [Thread/carousel that delivers on the promise]', example: `"The best ${industry.toLowerCase()} content is boring to create and exciting to consume."\n\nThread: why the boring work (research, outlines, editing) creates the content people actually share...`, bestFor: 'Twitter/X threads, LinkedIn posts, authority building', conversionRate: '5-8% engagement (controversy + value = high interaction)' },
  ];

  const platformGuides: PlatformGuide[] = [
    { platform: 'Instagram', optimalLength: 'Caption: 150-300 chars (feed), 2200 max. Stories: 5-7 slides.', bestFormats: 'Carousels (highest reach), Reels (15-30s), Stories (polls/questions)', postFrequency: '4-7x/week (feed) + daily Stories', peakTimes: '11 AM, 1 PM, 7-9 PM (local time)', doNot: 'Post without alt text, use banned hashtags, post blurry images, ignore DMs for 24h+' },
    { platform: 'Twitter/X', optimalLength: '100-180 characters for single tweets, 5-7 tweets for threads', bestFormats: 'Threads (highest engagement), quote tweets, polls, single image + hot take', postFrequency: '3-5x/day (mix of original + replies + retweets)', peakTimes: '8-10 AM, 12-1 PM, 5-6 PM', doNot: 'Tweet without engaging in replies, use more than 2 hashtags, post walls of text without line breaks' },
    { platform: 'LinkedIn', optimalLength: '150-300 words. First 2 lines visible before "see more" — make them count.', bestFormats: 'Text posts with line breaks, document carousels (PDF), polls, personal stories', postFrequency: '3-5x/week (quality over quantity)', peakTimes: '8-10 AM Tue-Thu (B2B), 12 PM (lunch readers)', doNot: 'Use Instagram-style hashtags (max 3-5), be overly salesy, ignore comments for hours' },
    { platform: 'TikTok', optimalLength: '15-60 seconds (sweet spot: 21-34 seconds). Caption: short + keywords.', bestFormats: 'Talking head + text overlay, tutorials, trending sounds, stitches/duets', postFrequency: '1-3x/day (algorithm rewards consistency)', peakTimes: '7-9 AM, 12-3 PM, 7-11 PM', doNot: 'Delete underperforming posts (hurts algorithm), ignore comments in first hour, use stock footage without personality' },
    { platform: 'YouTube', optimalLength: 'Shorts: 30-60s. Long-form: 8-15 min (sweet spot for ad revenue).', bestFormats: 'Tutorials, listicles, behind-the-scenes, reaction/commentary', postFrequency: '1-2x/week (long-form) + 3-5x/week (Shorts)', peakTimes: '2-4 PM (publishing) for next-day algorithm pickup', doNot: 'Skip custom thumbnails, ignore first 30 seconds (hook critical), publish without chapters' },
  ];

  const weeklyPlan = [
    `Monday: Authority Post — ${postTemplates[1].name} format on ${plat}. Establish thought leadership.`,
    `Tuesday: Educational Content — ${postTemplates[3].name} (numbered list). High save potential.`,
    `Wednesday: Story/Personal — ${postTemplates[4].name}. Build connection and trust.`,
    `Thursday: Engagement Post — Poll, question, or ${postTemplates[5].name} comparison. Drive comments.`,
    `Friday: Promotional — ${postTemplates[0].name} (PAS). Soft sell with value-first approach.`,
    `Saturday: User Content — ${postTemplates[2].name} (testimonial/before-after). Social proof day.`,
    `Sunday: Repurpose — Take best performer of the week, adapt for another platform or format.`,
  ];

  return { totalTemplates: postTemplates.length + carouselTemplates.length + videoTemplates.length + captionFormulas.length, postTemplates, carouselTemplates, videoTemplates, captionFormulas, platformGuides, weeklyPlan };
}

export default function TemplateLibraryPage() {
  const [platform, setPlatform] = useState<string>(platformOptions[0]);
  const [category, setCategory] = useState<string>(categoryOptions[0]);
  const [tone, setTone] = useState<string>(toneOptions[0]);
  const [industry, setIndustry] = useState<string>(industries[0]);
  const [brand, setBrand] = useState('');
  const [library, setLibrary] = useState<TemplateLibrary | null>(null);

  const generate = () => { if (brand.trim()) setLibrary(generateLibrary(platform, category, tone, industry, brand)); };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <span className="px-3 py-1 bg-violet-500/10 text-violet-400 rounded-full text-sm font-medium">Content Templates</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">Social Media Template Library</h1>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">Platform-specific, industry-tailored post templates. Copy, customize, publish. Stop staring at blank screens.</p>
        </div>

        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Platform</label>
              <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white">{platformOptions.map(p => <option key={p}>{p}</option>)}</select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Content Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white">{categoryOptions.map(c => <option key={c}>{c}</option>)}</select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Tone</label>
              <select value={tone} onChange={e => setTone(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white">{toneOptions.map(t => <option key={t}>{t}</option>)}</select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Industry</label>
              <select value={industry} onChange={e => setIndustry(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white">{industries.map(i => <option key={i}>{i}</option>)}</select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-1">Brand / Business Name</label>
            <input value={brand} onChange={e => setBrand(e.target.value)} placeholder="e.g., PostCraft" className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white" />
          </div>
          <button onClick={generate} className="w-full py-3 bg-gradient-to-r from-violet-500 to-pink-500 rounded-lg font-semibold hover:from-violet-600 hover:to-pink-600 transition-all">Generate My Template Library</button>
        </div>

        {library && (
          <div className="space-y-8">
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 text-center">
              <div className="text-3xl font-bold text-violet-400">{library.totalTemplates}</div>
              <div className="text-sm text-gray-400 mt-1">Templates Generated (posts + carousels + videos + formulas)</div>
            </div>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-violet-300">Post Templates</h2>
              <div className="space-y-4">{library.postTemplates.map(t => (
                <div key={t.id} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2 py-0.5 bg-violet-500/20 text-violet-400 rounded text-xs">{t.category}</span>
                    <h3 className="font-semibold text-white text-lg">{t.name}</h3>
                  </div>
                  <div className="mb-3 text-sm"><span className="text-gray-500">Structure:</span><pre className="mt-1 text-gray-300 whitespace-pre-wrap font-sans">{t.structure}</pre></div>
                  <div className="bg-gray-900/50 p-4 rounded-lg mb-3"><span className="text-xs text-gray-500 block mb-1">EXAMPLE:</span><p className="text-gray-200 whitespace-pre-wrap text-sm">{t.example}</p></div>
                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    <div><span className="text-gray-500">Hook tip:</span> <span className="text-violet-300">{t.hook}</span></div>
                    <div><span className="text-gray-500">CTA:</span> <span className="text-pink-300">{t.cta}</span></div>
                    <div><span className="text-gray-500">Best time:</span> <span className="text-gray-300">{t.bestTime}</span></div>
                    <div><span className="text-gray-500">Expected:</span> <span className="text-green-300">{t.expectedEngagement}</span></div>
                  </div>
                </div>
              ))}</div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-violet-300">Carousel Templates</h2>
              <div className="space-y-4">{library.carouselTemplates.map((c, i) => (
                <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
                  <h3 className="font-semibold text-white text-lg mb-3">{c.title}</h3>
                  <div className="space-y-1 mb-3">{c.slides.map((s, j) => <div key={j} className="text-sm text-gray-300 flex gap-2"><span className="text-violet-400 shrink-0">{j + 1}.</span>{s}</div>)}</div>
                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    <div><span className="text-gray-500">Design tip:</span> <span className="text-blue-300">{c.designTip}</span></div>
                    <div><span className="text-gray-500">Engagement:</span> <span className="text-green-300">{c.engagementBoost}</span></div>
                  </div>
                </div>
              ))}</div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-violet-300">Video Script Templates</h2>
              <div className="space-y-4">{library.videoTemplates.map((v, i) => (
                <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-semibold text-white text-lg">{v.name}</h3>
                    <span className="px-2 py-0.5 bg-pink-500/20 text-pink-400 rounded text-xs">{v.duration}</span>
                  </div>
                  <pre className="text-sm text-gray-300 whitespace-pre-wrap font-sans mb-3">{v.structure}</pre>
                  <div className="bg-gray-900/50 p-4 rounded-lg mb-3"><span className="text-xs text-gray-500 block mb-1">SAMPLE SCRIPT:</span><p className="text-gray-200 whitespace-pre-wrap text-sm">{v.script}</p></div>
                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    <div><span className="text-gray-500">Hook:</span> <span className="text-orange-300">{v.hookSeconds}</span></div>
                    <div><span className="text-gray-500">Music:</span> <span className="text-blue-300">{v.musicTip}</span></div>
                  </div>
                </div>
              ))}</div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-violet-300">Caption Formulas</h2>
              <div className="space-y-4">{library.captionFormulas.map((f, i) => (
                <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
                  <h3 className="font-semibold text-white text-lg mb-2">{f.name}</h3>
                  <div className="text-sm text-violet-300 mb-2">{f.formula}</div>
                  <div className="bg-gray-900/50 p-3 rounded-lg mb-3 text-sm text-gray-200 whitespace-pre-wrap">{f.example}</div>
                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    <div><span className="text-gray-500">Best for:</span> <span className="text-gray-300">{f.bestFor}</span></div>
                    <div><span className="text-gray-500">Conversion:</span> <span className="text-green-300">{f.conversionRate}</span></div>
                  </div>
                </div>
              ))}</div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-violet-300">Platform Quick Guides</h2>
              <div className="space-y-3">{library.platformGuides.map((g, i) => (
                <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                  <h3 className="font-semibold text-white mb-2">{g.platform}</h3>
                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    <div><span className="text-gray-500">Optimal length:</span> <span className="text-gray-300">{g.optimalLength}</span></div>
                    <div><span className="text-gray-500">Best formats:</span> <span className="text-violet-300">{g.bestFormats}</span></div>
                    <div><span className="text-gray-500">Frequency:</span> <span className="text-gray-300">{g.postFrequency}</span></div>
                    <div><span className="text-gray-500">Peak times:</span> <span className="text-orange-300">{g.peakTimes}</span></div>
                    <div className="md:col-span-2"><span className="text-gray-500">Avoid:</span> <span className="text-red-300">{g.doNot}</span></div>
                  </div>
                </div>
              ))}</div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-violet-300">Weekly Content Plan</h2>
              <div className="space-y-2">{library.weeklyPlan.map((d, i) => <div key={i} className="p-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-sm text-gray-300"><span className="text-violet-400 font-medium">{d.split(':')[0]}:</span>{d.split(':').slice(1).join(':')}</div>)}</div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
