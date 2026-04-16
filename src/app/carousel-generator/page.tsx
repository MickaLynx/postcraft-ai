'use client';
import { useState } from 'react';

const platforms = ['Instagram', 'LinkedIn', 'TikTok', 'Twitter/X', 'Facebook'] as const;
const slideCountOptions = [3, 4, 5, 6, 7, 8, 9, 10] as const;
const carouselGoals = ['Educate/Teach', 'Tell a Story', 'Showcase Product', 'Share Tips/Hacks', 'Data/Statistics', 'Before/After', 'Step-by-Step Process', 'Myths vs Facts', 'Listicle/Ranking', 'Case Study'] as const;
const toneOptions = ['Professional', 'Casual/Fun', 'Bold/Provocative', 'Inspirational', 'Educational', 'Storytelling', 'Minimalist', 'Data-Driven'] as const;

interface SlideContent {
  slideNumber: number;
  headline: string;
  body: string;
  visualNote: string;
  cta?: string;
}

interface CarouselResult {
  title: string;
  hookSlide: SlideContent;
  contentSlides: SlideContent[];
  closingSlide: SlideContent;
  caption: string;
  hashtags: string[];
  designTips: string[];
  platformNotes: string;
  engagementPrediction: string;
  bestPostingTime: string;
}

function generateCarousel(
  platform: string, topic: string, goal: string, tone: string,
  slideCount: number, includeStats: boolean, includeEmoji: boolean
): CarouselResult {
  const toneModifiers: Record<string, { hookPrefix: string; style: string }> = {
    'Professional': { hookPrefix: 'Here\'s what top performers know about', style: 'Clean, serif fonts, muted palette' },
    'Casual/Fun': { hookPrefix: 'POV: You just discovered', style: 'Bright colors, rounded fonts, stickers' },
    'Bold/Provocative': { hookPrefix: 'STOP scrolling. You need to know', style: 'High contrast, bold sans-serif, red accents' },
    'Inspirational': { hookPrefix: 'This changed everything about', style: 'Gradient backgrounds, elegant type, quotes' },
    'Educational': { hookPrefix: 'The complete guide to', style: 'Diagrams, numbered points, clean layout' },
    'Storytelling': { hookPrefix: 'The untold story of', style: 'Cinematic feel, dark tones, narrative flow' },
    'Minimalist': { hookPrefix: 'One thing about', style: 'White space, single accent color, tight copy' },
    'Data-Driven': { hookPrefix: 'The data is clear on', style: 'Charts, metrics, dark dashboard aesthetic' },
  };

  const goalTemplates: Record<string, { slideStructure: string[]; ctaType: string }> = {
    'Educate/Teach': { slideStructure: ['What is it?', 'Why it matters', 'Key principle 1', 'Key principle 2', 'Common mistake', 'Pro tip', 'Action step'], ctaType: 'Save for later' },
    'Tell a Story': { slideStructure: ['The beginning', 'The challenge', 'The turning point', 'The lesson', 'The result', 'What I\'d do differently', 'Your turn'], ctaType: 'Share your story' },
    'Showcase Product': { slideStructure: ['The problem', 'The solution', 'Feature 1', 'Feature 2', 'Social proof', 'Pricing/Value', 'How to start'], ctaType: 'Try it free' },
    'Share Tips/Hacks': { slideStructure: ['Tip 1', 'Tip 2', 'Tip 3', 'Tip 4', 'Tip 5', 'Bonus tip', 'The big takeaway'], ctaType: 'Save this for later' },
    'Data/Statistics': { slideStructure: ['The headline stat', 'Context', 'Trend 1', 'Trend 2', 'Comparison', 'What this means', 'Source & takeaway'], ctaType: 'Share with your team' },
    'Before/After': { slideStructure: ['Before state', 'The problem', 'The change', 'After state', 'Key difference', 'How you can too', 'Results summary'], ctaType: 'Start your transformation' },
    'Step-by-Step Process': { slideStructure: ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Common pitfall', 'Expected result'], ctaType: 'Follow for more guides' },
    'Myths vs Facts': { slideStructure: ['Myth #1', 'Fact #1', 'Myth #2', 'Fact #2', 'Myth #3', 'Fact #3', 'The truth'], ctaType: 'Share to bust myths' },
    'Listicle/Ranking': { slideStructure: ['#1 pick', '#2 pick', '#3 pick', '#4 pick', '#5 pick', 'Honorable mention', 'The verdict'], ctaType: 'Agree? Comment below' },
    'Case Study': { slideStructure: ['The client/subject', 'The challenge', 'The approach', 'Key tactic 1', 'Key tactic 2', 'The results', 'Lessons learned'], ctaType: 'Want similar results?' },
  };

  const tm = toneModifiers[tone] || toneModifiers['Professional'];
  const gt = goalTemplates[goal] || goalTemplates['Educate/Teach'];

  const hookSlide: SlideContent = {
    slideNumber: 1,
    headline: `${tm.hookPrefix} ${topic}`,
    body: includeEmoji ? `${includeStats ? '📊 ' : ''}Swipe to discover →` : `${includeStats ? 'Data-backed. ' : ''}Swipe to discover →`,
    visualNote: `Eye-catching cover. ${tm.style}. Large headline text.`,
  };

  const actualContentSlides = Math.min(slideCount - 2, gt.slideStructure.length);
  const contentSlides: SlideContent[] = gt.slideStructure.slice(0, actualContentSlides).map((structure, i) => ({
    slideNumber: i + 2,
    headline: structure,
    body: `[${topic}] — ${structure.toLowerCase()} content. ${includeStats ? 'Include a relevant statistic or metric.' : 'Use a concrete example or analogy.'}`,
    visualNote: `Consistent with slide 1. ${i % 2 === 0 ? 'Add icon or illustration.' : 'Use a pull quote or key number.'}`,
  }));

  const closingSlide: SlideContent = {
    slideNumber: slideCount,
    headline: gt.ctaType,
    body: includeEmoji
      ? `💡 Found this valuable? Save it, share it, and follow for more on ${topic}.`
      : `Found this valuable? Save it, share it, and follow for more on ${topic}.`,
    visualNote: 'Strong CTA button. Profile tag. Consistent branding.',
    cta: gt.ctaType,
  };

  const platformSpecs: Record<string, { ratio: string; maxSlides: number; tip: string }> = {
    'Instagram': { ratio: '1080×1350px (4:5)', maxSlides: 20, tip: 'First slide = thumbnail in grid. Make it visually stunning.' },
    'LinkedIn': { ratio: '1080×1350px (4:5) or 1920×1080px (PDF)', maxSlides: 300, tip: 'PDF carousels get 3x more reach. Use document upload, not image carousel.' },
    'TikTok': { ratio: '1080×1920px (9:16) photo mode', maxSlides: 35, tip: 'Photo mode carousels are trending. Add trending audio.' },
    'Twitter/X': { ratio: '1600×900px (16:9)', maxSlides: 4, tip: 'Only 4 images per tweet. Use threads for longer carousels.' },
    'Facebook': { ratio: '1080×1080px (1:1)', maxSlides: 10, tip: 'Square format works best in Facebook feed.' },
  };

  const spec = platformSpecs[platform] || platformSpecs['Instagram'];

  const hashtags = [
    `#${topic.replace(/\s+/g, '')}`, '#carousel', `#${platform.toLowerCase().replace(/[\\/]/g, '')}tips`,
    '#contentcreator', '#socialmedia', '#growthhacks',
    `#${goal.replace(/[\s/]+/g, '').toLowerCase()}`, '#engagement',
  ];

  const designTips = [
    `Dimensions: ${spec.ratio}`,
    `Max slides on ${platform}: ${spec.maxSlides}`,
    `Use consistent fonts and colors across all ${slideCount} slides`,
    `Keep text under 30 words per slide for readability`,
    tone === 'Data-Driven' ? 'Visualize numbers with charts, not just text' : 'Use one key visual element per slide',
    'Add your brand watermark or handle on every slide',
    spec.tip,
  ];

  const engagementScores: Record<string, number> = {
    'Instagram': 3.1, 'LinkedIn': 4.2, 'TikTok': 2.8, 'Twitter/X': 1.5, 'Facebook': 2.0,
  };
  const baseEngagement = engagementScores[platform] || 2.0;
  const slideBonus = slideCount >= 7 ? 1.4 : slideCount >= 5 ? 1.2 : 1.0;
  const predicted = (baseEngagement * slideBonus * (includeStats ? 1.2 : 1.0)).toFixed(1);

  const timingMap: Record<string, string> = {
    'Instagram': 'Tue-Thu 10am-12pm, Sat 9-11am',
    'LinkedIn': 'Tue-Thu 7:30-8:30am, 12-1pm',
    'TikTok': 'Mon-Fri 6-9pm, Sat 10am-12pm',
    'Twitter/X': 'Mon-Fri 8-10am, 12-1pm',
    'Facebook': 'Wed-Fri 1-3pm, Sat 12-1pm',
  };

  return {
    title: `${topic} — ${goal} Carousel`,
    hookSlide,
    contentSlides,
    closingSlide,
    caption: `${includeEmoji ? '🧵 ' : ''}${tm.hookPrefix} ${topic}.\n\nSwipe through ${slideCount} slides to learn:\n${gt.slideStructure.slice(0, 3).map((s, i) => `${includeEmoji ? ['✅', '💡', '🔑'][i] : `${i + 1}.`} ${s}`).join('\n')}\n\nSave this for later ${includeEmoji ? '🔖' : ''}— you\'ll need it.\n\n${hashtags.slice(0, 6).join(' ')}`,
    hashtags,
    designTips,
    platformNotes: `${platform}: ${spec.ratio}. ${spec.tip}`,
    engagementPrediction: `~${predicted}% avg engagement rate (${parseFloat(predicted) > 3 ? 'Above' : 'At'} industry average for ${platform} carousels)`,
    bestPostingTime: timingMap[platform] || 'Weekdays 10am-12pm',
  };
}

export default function CarouselGeneratorPage() {
  const [platform, setPlatform] = useState<string>('Instagram');
  const [topic, setTopic] = useState('');
  const [goal, setGoal] = useState<string>('Educate/Teach');
  const [tone, setTone] = useState<string>('Professional');
  const [slideCount, setSlideCount] = useState<number>(7);
  const [includeStats, setIncludeStats] = useState(true);
  const [includeEmoji, setIncludeEmoji] = useState(true);
  const [result, setResult] = useState<CarouselResult | null>(null);

  const handleGenerate = () => {
    if (!topic.trim()) return;
    setResult(generateCarousel(platform, topic.trim(), goal, tone, slideCount, includeStats, includeEmoji));
  };

  return (
    <main className="min-h-screen bg-zinc-950 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Carousel Generator</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Create high-engagement carousel posts for Instagram, LinkedIn, TikTok and more. Carousels get <strong className="text-white">3x more engagement</strong> than single posts.</p>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Platform</label>
            <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {platforms.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Goal / Format</label>
            <select value={goal} onChange={e => setGoal(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {carouselGoals.map(g => <option key={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Tone</label>
            <select value={tone} onChange={e => setTone(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {toneOptions.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Number of Slides</label>
            <select value={slideCount} onChange={e => setSlideCount(Number(e.target.value))} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {slideCountOptions.map(n => <option key={n} value={n}>{n} slides</option>)}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-zinc-400 mb-1">Topic / Subject</label>
          <input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g., 10 AI tools that save 5 hours/week" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600" />
        </div>

        <div className="flex gap-6 mb-6">
          <label className="flex items-center gap-2 text-sm text-zinc-300">
            <input type="checkbox" checked={includeStats} onChange={e => setIncludeStats(e.target.checked)} className="accent-violet-500" />
            Include statistics
          </label>
          <label className="flex items-center gap-2 text-sm text-zinc-300">
            <input type="checkbox" checked={includeEmoji} onChange={e => setIncludeEmoji(e.target.checked)} className="accent-violet-500" />
            Include emojis
          </label>
        </div>

        <button onClick={handleGenerate} className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition">
          Generate Carousel
        </button>

        {result && (
          <div className="mt-10 space-y-6">
            <h2 className="text-2xl font-bold text-white">{result.title}</h2>

            {/* Slide Preview */}
            <div className="grid gap-4">
              {[result.hookSlide, ...result.contentSlides, result.closingSlide].map(slide => (
                <div key={slide.slideNumber} className={`bg-zinc-900 border rounded-xl p-5 ${slide.slideNumber === 1 ? 'border-violet-500/50' : slide.cta ? 'border-fuchsia-500/50' : 'border-zinc-800'}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${slide.slideNumber === 1 ? 'bg-violet-600' : slide.cta ? 'bg-fuchsia-600' : 'bg-zinc-700'}`}>
                      {slide.slideNumber}
                    </span>
                    <span className="text-xs text-zinc-500 uppercase tracking-wider">
                      {slide.slideNumber === 1 ? 'Hook Slide' : slide.cta ? 'CTA Slide' : `Content Slide`}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{slide.headline}</h3>
                  <p className="text-zinc-300 text-sm mb-2">{slide.body}</p>
                  <p className="text-xs text-zinc-500 italic">Visual: {slide.visualNote}</p>
                </div>
              ))}
            </div>

            {/* Caption */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-2">Ready-to-Post Caption</h3>
              <pre className="text-zinc-300 text-sm whitespace-pre-wrap font-sans">{result.caption}</pre>
            </div>

            {/* Design Tips & Metrics */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Design Tips</h3>
                <ul className="space-y-2">
                  {result.designTips.map((tip, i) => (
                    <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-violet-400">•</span>{tip}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Performance Prediction</h3>
                <div className="space-y-3 text-sm">
                  <div><span className="text-zinc-500">Engagement:</span> <span className="text-green-400 font-medium">{result.engagementPrediction}</span></div>
                  <div><span className="text-zinc-500">Best Posting Time:</span> <span className="text-white">{result.bestPostingTime}</span></div>
                  <div><span className="text-zinc-500">Platform:</span> <span className="text-white">{result.platformNotes}</span></div>
                </div>
              </div>
            </div>

            {/* Hashtags */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Suggested Hashtags</h3>
              <div className="flex flex-wrap gap-2">
                {result.hashtags.map((h, i) => (
                  <span key={i} className="bg-zinc-800 text-violet-300 text-sm px-3 py-1 rounded-full">{h}</span>
                ))}
              </div>
            </div>

            {/* Internal Links */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-zinc-400 mb-3">Enhance Your Carousel</h3>
              <div className="flex flex-wrap gap-2 text-sm">
                <a href="/hooks" className="text-violet-400 hover:text-violet-300 underline">Hook Generator</a>
                <a href="/caption-optimizer" className="text-violet-400 hover:text-violet-300 underline">Caption Optimizer</a>
                <a href="/hashtags" className="text-violet-400 hover:text-violet-300 underline">Hashtag Generator</a>
                <a href="/brand-voice" className="text-violet-400 hover:text-violet-300 underline">Brand Voice</a>
                <a href="/virality-score" className="text-violet-400 hover:text-violet-300 underline">Virality Score</a>
                <a href="/post-timing" className="text-violet-400 hover:text-violet-300 underline">Post Timing</a>
                <a href="/content-calendar" className="text-violet-400 hover:text-violet-300 underline">Content Calendar</a>
                <a href="/social-seo" className="text-violet-400 hover:text-violet-300 underline">Social SEO</a>
              </div>
            </div>
          </div>
        )}

        {/* FAQ */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">Carousel Generator FAQ</h2>
          <div className="space-y-4">
            {[
              { q: 'Why do carousels get more engagement?', a: 'Carousels require swiping, which increases time-on-post — a key algorithm signal. Instagram carousels get 3.1x more engagement than single images. LinkedIn document carousels get shown to 4x more people than text posts.' },
              { q: 'What\'s the ideal number of slides?', a: '7-10 slides is the sweet spot. Fewer than 5 feels thin; more than 10 and completion rates drop. The first slide (hook) and last slide (CTA) are the most important.' },
              { q: 'Should I use PDF or image carousels on LinkedIn?', a: 'PDF (document upload) every time. LinkedIn gives document carousels significantly more reach than native image carousels. They also allow more slides (up to 300 pages).' },
              { q: 'How do I design carousels without a designer?', a: 'Use Canva, Figma, or Adobe Express with a consistent template. Keep the same fonts, colors, and layout across all slides. Our generator provides the structure — just drop the text into your template.' },
              { q: 'Can I repurpose one carousel across platforms?', a: 'Yes, but resize for each platform. Instagram wants 4:5, TikTok wants 9:16, LinkedIn works with both 4:5 and PDF. Use our Content Repurposer tool to adapt copy for each platform\'s culture.' },
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
              <ul className="space-y-1"><li><a href="/" className="hover:text-white transition">Post Generator</a></li><li><a href="/hooks" className="hover:text-white transition">Hook Generator</a></li><li><a href="/video-scripts" className="hover:text-white transition">Video Scripts</a></li><li><a href="/threads" className="hover:text-white transition">Thread Generator</a></li><li><a href="/carousel-generator" className="hover:text-white transition">Carousel Generator</a></li></ul>
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
              <ul className="space-y-1"><li><a href="/brand-voice" className="hover:text-white transition">Brand Voice</a></li><li><a href="/content-calendar" className="hover:text-white transition">Calendar</a></li><li><a href="/campaign" className="hover:text-white transition">Campaign Mode</a></li><li><a href="/persona-builder" className="hover:text-white transition">Persona Builder</a></li><li><a href="/poll-quiz" className="hover:text-white transition">Poll & Quiz</a></li></ul>
            </div>
          </div>
          <p className="text-center text-zinc-600 text-xs mt-8">© 2026 PostCraft AI. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
