'use client';
import { useState } from 'react';

const platforms = ['Instagram', 'TikTok', 'Facebook', 'LinkedIn', 'YouTube', 'Snapchat'] as const;
const storyGoals = ['Drive Traffic (Swipe Up)', 'Boost Engagement', 'Build Anticipation', 'Behind-the-Scenes', 'Product Launch', 'Day-in-the-Life', 'Tutorial/How-To', 'Q&A/AMA', 'User Poll/Quiz', 'Countdown/Event'] as const;
const storyLengths = [3, 5, 7, 10, 15] as const;

interface StorySlide {
  slideNumber: number;
  type: string;
  content: string;
  stickerSuggestion: string;
  duration: string;
  designNote: string;
}

interface StoryPlanResult {
  title: string;
  narrative: string;
  slides: StorySlide[];
  bestTime: string;
  platformTips: string[];
  stickerStrategy: string[];
  retentionTips: string[];
  cta: string;
  hashtagSuggestions: string[];
  musicSuggestion: string;
}

function generateStoryPlan(
  platform: string, topic: string, goal: string, numSlides: number
): StoryPlanResult {
  const goalStructures: Record<string, { narrative: string; slideTypes: string[]; cta: string }> = {
    'Drive Traffic (Swipe Up)': { narrative: 'Tease → Value → Problem → Solution → CTA', slideTypes: ['Hook/Tease', 'Problem', 'Value Preview', 'Social Proof', 'CTA with Link'], cta: 'Swipe up / Link in bio for the full [resource]' },
    'Boost Engagement': { narrative: 'Question → Engage → Reveal → React', slideTypes: ['Question/Poll', 'This or That', 'Behind the Answer', 'Reaction/Results', 'Share Prompt'], cta: 'Reply with your answer / DM me your thoughts' },
    'Build Anticipation': { narrative: 'Hint → Tease → Countdown → Reveal', slideTypes: ['Mystery Hint', 'Sneak Peek', 'Countdown', 'Context/Why', 'Save the Date'], cta: 'Turn on notifications so you don\'t miss it' },
    'Behind-the-Scenes': { narrative: 'Setup → Process → Struggle → Win → Lesson', slideTypes: ['The Setup', 'In Progress', 'The Challenge', 'The Breakthrough', 'Final Result'], cta: 'Follow for more behind-the-scenes' },
    'Product Launch': { narrative: 'Problem → Intro → Demo → Proof → Get It', slideTypes: ['The Problem', 'Introducing...', 'Feature Demo', 'Testimonial/Proof', 'How to Get It'], cta: 'Link in bio to get [product] — launch offer expires [date]' },
    'Day-in-the-Life': { narrative: 'Morning → Work → Challenge → Win → Evening', slideTypes: ['Morning Routine', 'Getting Started', 'The Work', 'A Moment', 'End of Day Recap'], cta: 'What does your day look like? Reply!' },
    'Tutorial/How-To': { narrative: 'What → Step 1 → Step 2 → Step 3 → Result', slideTypes: ['What We\'re Making', 'Step 1', 'Step 2', 'Step 3', 'Final Result + Save'], cta: 'Save this for later — you\'ll need it' },
    'Q&A/AMA': { narrative: 'Announce → Q1 → Q2 → Q3 → Wrap', slideTypes: ['AMA Announcement', 'Question 1', 'Question 2', 'Question 3', 'Thanks + Next AMA'], cta: 'Send your questions for the next AMA' },
    'User Poll/Quiz': { narrative: 'Hook → Poll 1 → Poll 2 → Reveal → Results', slideTypes: ['Topic Hook', 'Poll/Quiz 1', 'Poll/Quiz 2', 'The Answer', 'Results Reveal'], cta: 'Tap to vote — results tomorrow!' },
    'Countdown/Event': { narrative: 'Announce → Why → What to Expect → Prep → Countdown', slideTypes: ['Big Announcement', 'Why This Matters', 'What to Expect', 'How to Prepare', 'Countdown Sticker'], cta: 'Add the countdown sticker — don\'t miss it' },
  };

  const gs = goalStructures[goal] || goalStructures['Boost Engagement'];

  const actualSlides = Math.min(numSlides, gs.slideTypes.length + 3);
  const slides: StorySlide[] = [];

  for (let i = 0; i < actualSlides; i++) {
    const slideType = i < gs.slideTypes.length ? gs.slideTypes[i] : i === actualSlides - 1 ? 'CTA / Close' : 'Bonus Content';
    const stickers = ['Poll', 'Quiz', 'Question Box', 'Countdown', 'Emoji Slider', 'Link', 'Music', 'Location', 'Mention'];
    const stickerIdx = i % stickers.length;

    slides.push({
      slideNumber: i + 1,
      type: slideType,
      content: `[${topic}] — ${slideType}. ${i === 0 ? 'Start with movement or text animation to stop the scroll.' : i === actualSlides - 1 ? gs.cta : 'Keep text under 20 words. Use high-contrast text overlay.'}`,
      stickerSuggestion: i === 0 ? 'None — clean hook' : stickers[stickerIdx],
      duration: i === 0 ? '3-5s (hook fast)' : i === actualSlides - 1 ? '5-7s (CTA needs reading time)' : '4-6s',
      designNote: i === 0 ? 'Full-bleed visual, bold text, no stickers' : i === actualSlides - 1 ? 'Clear CTA button, arrow pointing to action' : 'Consistent brand colors, one sticker max',
    });
  }

  const platformTips: Record<string, string[]> = {
    'Instagram': ['Stories last 24h — use Highlights to save the best ones', 'Use the Close Friends list for exclusive content (builds FOMO)', 'Polls/Quizzes in Stories boost your reach by 40%', 'Reply to Story reactions in DMs — builds community'],
    'TikTok': ['TikTok Stories are still underused — less competition, more visibility', 'Keep each slide under 5 seconds for TikTok attention spans', 'Use trending sounds on Story slides for extra reach', 'Stories can drive traffic to your main TikTok videos'],
    'Facebook': ['Facebook Stories auto-cross-post to Instagram if linked', 'Use the "Share to Story" button after posting a feed post', 'Facebook Story links work for all pages (no follower threshold)', 'Story ads on Facebook have lower CPM than feed ads'],
    'LinkedIn': ['LinkedIn Stories were discontinued but newsletter/event Stories are back', 'Use document-style Stories for professional content', 'Best time: weekday mornings 8-9am', 'Professional tone required — no memes'],
    'YouTube': ['YouTube Shorts can be cross-posted as Stories', 'Community tab polls serve a similar function to Stories', 'Use Stories to tease upcoming videos', 'Stories visible to subscribers only — great for loyalty'],
    'Snapchat': ['Snapchat is the OG Stories platform — still huge with Gen Z', 'Spotlight is separate from Stories — use both', 'Snap Map Stories for local businesses', 'AR filters drive massive engagement on Snapchat Stories'],
  };

  const retentionTips = [
    'First slide: 0.5s to hook — use movement, text animation, or a surprising visual',
    'Each slide should make the viewer WANT to tap to the next one (cliffhanger each slide)',
    'Mix media types: photo → video → text → poll — variety keeps attention',
    'Keep total Story under 7 slides for best completion rate (5 is optimal)',
    'Use the progress bar strategically — viewers tap faster as they see it\'s almost done',
    'End with a strong CTA on the last slide — don\'t let them just tap out',
  ];

  return {
    title: `${topic} — ${goal} Story`,
    narrative: gs.narrative,
    slides,
    bestTime: platform === 'Instagram' ? 'Tue-Fri 10am-12pm, 7-9pm' : platform === 'TikTok' ? 'Mon-Fri 6-9pm' : 'Weekdays 9-11am',
    platformTips: platformTips[platform] || platformTips['Instagram'],
    stickerStrategy: ['Use ONE interactive sticker per Story (poll, quiz, or question)', 'Emoji Sliders get 2x more engagement than Polls on Instagram', 'Place stickers in the bottom third — easier to tap on mobile', 'Countdown stickers for launches — users get notified when it hits zero'],
    retentionTips,
    cta: gs.cta,
    hashtagSuggestions: [`#${topic.replace(/\s+/g, '')}`, '#storytime', `#${platform.toLowerCase()}stories`, '#behindthescenes', '#dailycontent'],
    musicSuggestion: goal.includes('Behind') ? 'Chill lo-fi or indie acoustic' : goal.includes('Launch') ? 'Upbeat trending pop' : goal.includes('Tutorial') ? 'Minimal ambient' : 'Trending audio on the platform',
  };
}

export default function StoryPlannerPage() {
  const [platform, setPlatform] = useState<string>('Instagram');
  const [topic, setTopic] = useState('');
  const [goal, setGoal] = useState<string>('Boost Engagement');
  const [numSlides, setNumSlides] = useState<number>(5);
  const [result, setResult] = useState<StoryPlanResult | null>(null);

  const handleGenerate = () => {
    if (!topic.trim()) return;
    setResult(generateStoryPlan(platform, topic.trim(), goal, numSlides));
  };

  return (
    <main className="min-h-screen bg-zinc-950 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Story Planner</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Plan high-retention Stories for Instagram, TikTok, and more. <strong className="text-white">Stories with a plan get 2x higher completion rates</strong> than improvised ones.</p>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Platform</label>
            <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {platforms.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Story Goal</label>
            <select value={goal} onChange={e => setGoal(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {storyGoals.map(g => <option key={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Number of Slides</label>
            <select value={numSlides} onChange={e => setNumSlides(Number(e.target.value))} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {storyLengths.map(n => <option key={n} value={n}>{n} slides</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Topic</label>
            <input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g., Morning routine, Product launch, Weekly Q&A" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600" />
          </div>
        </div>

        <button onClick={handleGenerate} className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition">
          Plan My Story
        </button>

        {result && (
          <div className="mt-10 space-y-6">
            <div className="bg-zinc-900 border border-violet-500/30 rounded-xl p-5">
              <h2 className="text-xl font-bold text-white mb-1">{result.title}</h2>
              <p className="text-sm text-zinc-400">Narrative arc: <span className="text-violet-300">{result.narrative}</span></p>
              <p className="text-xs text-zinc-500 mt-1">Music: {result.musicSuggestion} | Best time: {result.bestTime}</p>
            </div>

            <div className="grid gap-3">
              {result.slides.map(slide => (
                <div key={slide.slideNumber} className={`bg-zinc-900 border rounded-xl p-5 ${slide.slideNumber === 1 ? 'border-violet-500/50' : slide.slideNumber === result.slides.length ? 'border-fuchsia-500/50' : 'border-zinc-800'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${slide.slideNumber === 1 ? 'bg-violet-600' : slide.slideNumber === result.slides.length ? 'bg-fuchsia-600' : 'bg-zinc-700'}`}>{slide.slideNumber}</span>
                      <span className="text-sm font-medium text-white">{slide.type}</span>
                    </div>
                    <span className="text-xs text-zinc-500">{slide.duration}</span>
                  </div>
                  <p className="text-sm text-zinc-300 mb-2">{slide.content}</p>
                  <div className="flex gap-4 text-xs text-zinc-500">
                    <span>Sticker: {slide.stickerSuggestion}</span>
                    <span>Design: {slide.designNote}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Platform Tips</h3>
                <ul className="space-y-2">{result.platformTips.map((t, i) => <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-violet-400">•</span>{t}</li>)}</ul>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Retention Tips</h3>
                <ul className="space-y-2">{result.retentionTips.map((t, i) => <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-green-400">→</span>{t}</li>)}</ul>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Sticker Strategy</h3>
              <ul className="space-y-2">{result.stickerStrategy.map((s, i) => <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-fuchsia-400">{i + 1}.</span>{s}</li>)}</ul>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-zinc-400 mb-3">Plan More Content</h3>
              <div className="flex flex-wrap gap-2 text-sm">
                <a href="/carousel-generator" className="text-violet-400 hover:text-violet-300 underline">Carousel Generator</a>
                <a href="/video-scripts" className="text-violet-400 hover:text-violet-300 underline">Video Scripts</a>
                <a href="/poll-quiz" className="text-violet-400 hover:text-violet-300 underline">Poll & Quiz</a>
                <a href="/content-calendar" className="text-violet-400 hover:text-violet-300 underline">Content Calendar</a>
                <a href="/hooks" className="text-violet-400 hover:text-violet-300 underline">Hook Generator</a>
                <a href="/post-timing" className="text-violet-400 hover:text-violet-300 underline">Post Timing</a>
              </div>
            </div>
          </div>
        )}

        <section className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">Story Planner FAQ</h2>
          <div className="space-y-4">
            {[
              { q: 'How many Story slides is optimal?', a: '5-7 slides is the sweet spot for completion rate. Under 3 feels too short to tell a story. Over 10 and most viewers drop off. Instagram data shows 5-slide Stories have the highest completion rate at 72%.' },
              { q: 'Do Stories still matter in 2026?', a: 'Absolutely. Instagram Stories reach 500M+ daily users. Stories are the #1 place for direct engagement (polls, DMs, reactions). They\'re also the primary driver for "Close Friends" lists and exclusive content.' },
              { q: 'Should I use all available stickers?', a: 'No — one interactive sticker per Story maximum. Too many stickers look cluttered and reduce tap-through rates. Choose the sticker that best matches your goal: Poll for engagement, Link for traffic, Countdown for launches.' },
              { q: 'What\'s better: photo or video Stories?', a: 'Mix both for optimal retention. Start with a video (movement hooks attention), then alternate. Pure photo Stories feel static; pure video Stories exhaust attention. The ideal is video → photo → video → poll → CTA.' },
            ].map((faq, i) => (
              <details key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <summary className="font-semibold text-white cursor-pointer">{faq.q}</summary>
                <p className="text-zinc-400 text-sm mt-2">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <footer className="mt-20 border-t border-zinc-800 pt-8 pb-12">
          <div className="grid md:grid-cols-4 gap-8 text-sm text-zinc-500">
            <div><h4 className="font-semibold text-white mb-3">Content Creation</h4><ul className="space-y-1"><li><a href="/" className="hover:text-white transition">Post Generator</a></li><li><a href="/carousel-generator" className="hover:text-white transition">Carousel</a></li><li><a href="/story-planner" className="hover:text-white transition">Story Planner</a></li><li><a href="/poll-quiz" className="hover:text-white transition">Polls</a></li><li><a href="/video-scripts" className="hover:text-white transition">Video Scripts</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Optimization</h4><ul className="space-y-1"><li><a href="/caption-optimizer" className="hover:text-white transition">Captions</a></li><li><a href="/hashtags" className="hover:text-white transition">Hashtags</a></li><li><a href="/post-timing" className="hover:text-white transition">Timing</a></li><li><a href="/virality-score" className="hover:text-white transition">Virality</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Analytics</h4><ul className="space-y-1"><li><a href="/engagement-calculator" className="hover:text-white transition">Engagement</a></li><li><a href="/roi-calculator" className="hover:text-white transition">ROI</a></li><li><a href="/sentiment-analyzer" className="hover:text-white transition">Sentiment</a></li><li><a href="/influencer-score" className="hover:text-white transition">Influencer</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Strategy</h4><ul className="space-y-1"><li><a href="/brand-voice" className="hover:text-white transition">Brand Voice</a></li><li><a href="/content-calendar" className="hover:text-white transition">Calendar</a></li><li><a href="/link-in-bio" className="hover:text-white transition">Bio Links</a></li><li><a href="/campaign" className="hover:text-white transition">Campaign</a></li></ul></div>
          </div>
          <p className="text-center text-zinc-600 text-xs mt-8">© 2026 PostCraft AI. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
