'use client';
import { useState } from 'react';

const memeStyles = ['Classic Top/Bottom Text', 'Reaction Image', 'Drake Format', 'Expanding Brain', 'Distracted Boyfriend', 'Is This a Pigeon?', 'Two Buttons', 'Gru Plan', 'Change My Mind', 'Stonks'] as const;
const platforms = ['Twitter/X', 'Instagram', 'Reddit', 'TikTok', 'LinkedIn', 'Facebook', 'Discord'] as const;
const industries = ['Tech/SaaS', 'Marketing', 'Finance', 'Fitness', 'Food', 'Gaming', 'Education', 'E-commerce', 'Real Estate', 'Healthcare'] as const;
const tones = ['Absurd/Surreal', 'Self-Deprecating', 'Relatable', 'Sarcastic', 'Wholesome', 'Dark Humor', 'Industry Insider'] as const;

interface MemeResult {
  memes: { format: string; topText: string; bottomText: string; context: string; viralPotential: string; bestPlatform: string }[];
  captionVariants: string[];
  hashtagSets: string[];
  timingAdvice: string[];
  rules: string[];
  avoid: string[];
  trendingFormats: { format: string; description: string; usage: string }[];
}

function generateMemes(style: string, platform: string, industry: string, tone: string, topic: string): MemeResult {
  const topicRef = topic || '[your topic]';

  const memeTemplates: Record<string, { topText: string; bottomText: string }[]> = {
    'Classic Top/Bottom Text': [
      { topText: `When ${topicRef} finally works`, bottomText: 'After 47 attempts and 3 existential crises' },
      { topText: `Nobody: \nAbsolutely nobody:`, bottomText: `Me at 3am researching ${topicRef}` },
      { topText: `My ${industry} career expectation:`, bottomText: `Reality: debugging ${topicRef} at midnight` },
    ],
    'Drake Format': [
      { topText: `❌ Spending 5 hours doing ${topicRef} manually`, bottomText: `✅ Spending 10 hours automating ${topicRef}` },
      { topText: `❌ Reading the ${topicRef} documentation`, bottomText: `✅ Stack Overflow + vibes` },
      { topText: `❌ "Let me explain ${topicRef} simply"`, bottomText: `✅ *Proceeds to write a 47-tweet thread*` },
    ],
    'Expanding Brain': [
      { topText: `Level 1: Using ${topicRef} normally\nLevel 2: Optimizing ${topicRef}\nLevel 3: Building ${topicRef} from scratch`, bottomText: `Level 4: Explaining ${topicRef} to your mom and she gets it` },
      { topText: `Brain 1: Ignoring ${topicRef}\nBrain 2: Learning ${topicRef}\nBrain 3: Mastering ${topicRef}`, bottomText: `Galaxy Brain: Teaching ${topicRef} on LinkedIn for clout` },
    ],
    'Distracted Boyfriend': [
      { topText: `Me → Shiny new ${topicRef}`, bottomText: `My perfectly working current solution → 😢` },
      { topText: `Team lead → New framework`, bottomText: `Deadline in 2 days → 😭` },
    ],
    'Change My Mind': [
      { topText: `${topicRef} is just ${industry}'s version of duct tape`, bottomText: 'Change my mind' },
      { topText: `90% of ${industry} thought leaders just repackage common sense about ${topicRef}`, bottomText: 'Change my mind' },
    ],
    'Reaction Image': [
      { topText: `When the client says "${topicRef} should be easy"`, bottomText: '*internal screaming intensifies*' },
      { topText: `POV: You just discovered ${topicRef}`, bottomText: '*life before vs after meme*' },
    ],
    'Is This a Pigeon?': [
      { topText: `Is this ${topicRef}?`, bottomText: `*Points at literally anything in ${industry}*` },
      { topText: `Is this a viable ${industry} strategy?`, bottomText: `*Points at ${topicRef} with zero testing*` },
    ],
    'Two Buttons': [
      { topText: `Button 1: Ship ${topicRef} now with bugs\nButton 2: Perfect it and miss the window`, bottomText: '*sweating intensifies*' },
      { topText: `Button 1: Follow ${industry} best practices\nButton 2: Move fast and break things`, bottomText: '*every startup ever*' },
    ],
    'Gru Plan': [
      { topText: `Step 1: Learn ${topicRef}\nStep 2: Build a project with ${topicRef}\nStep 3: Realize ${topicRef} has changed completely`, bottomText: `Step 4: Realize ${topicRef} has changed completely 😐` },
    ],
    'Stonks': [
      { topText: `When your ${topicRef} post gets 3 likes`, bottomText: 'STONKS 📈 (viral content creator mode activated)' },
      { topText: `Spending $0 on ${topicRef} and getting 10 customers`, bottomText: 'STONKS 📈' },
    ],
  };

  const templates = memeTemplates[style] || memeTemplates['Classic Top/Bottom Text'];
  const memes = templates.map(t => ({
    format: style,
    topText: t.topText,
    bottomText: t.bottomText,
    context: `Best for ${platform} audience in ${industry}`,
    viralPotential: ['🔥 High', '⚡ Medium-High', '💥 Very High'][Math.floor(Math.random() * 3)],
    bestPlatform: platform,
  }));

  return {
    memes,
    captionVariants: [
      `This is too real 😂 #${industry.replace(/[/ ]/g, '')}`,
      `Tag someone who does this with ${topicRef} 👇`,
      `POV: every ${industry} professional right now`,
      `If you know, you know 💀 #${topicRef.replace(/\s/g, '')}Memes`,
      `Rate this take on ${topicRef}: 1-10 🤔`,
    ],
    hashtagSets: [
      `#${industry.replace(/[/ ]/g, '')}Memes #Relatable #FunnyMemes`,
      `#${topicRef.replace(/\s/g, '')} #Humor #Industry`,
      `#MemeMarketing #ViralContent #${platform.replace(/[/ ]/g, '')}`,
    ],
    timingAdvice: [
      'Post memes between 12-2pm (lunch scroll time) for max engagement',
      'Tuesday & Wednesday get highest meme engagement',
      'Reply to trending topics with relevant memes within 2 hours',
      `${platform === 'LinkedIn' ? 'LinkedIn memes work best Sunday evening (professionals planning their week)' : platform === 'Reddit' ? 'Post in niche subreddits first, then cross-post to larger ones' : 'Trending sounds + meme = maximum discoverability'}`,
      'Save memes for slow content days — they boost your average engagement rate',
    ],
    rules: [
      'Make it relatable to a SPECIFIC group, not everyone (niche > broad)',
      'The punchline should be in the image, NOT the caption',
      'One meme format per post — mixing formats confuses people',
      'Reference current events/trends when possible (24-48h window)',
      `${industry} insider jokes perform 3x better than generic humor`,
      'Test memes in Stories before posting to feed (gauge reaction)',
      'Credits the original meme creator if you remix their work',
    ],
    avoid: [
      'Punching down — humor at the expense of customers/users',
      'Dead meme formats (keep it current, not 2020 formats)',
      'Too much text — memes should be instant, not a paragraph',
      'Brand logos plastered everywhere — it kills the organic feel',
      'Controversial takes disguised as memes — they always backfire',
      'Overusing the same format — rotate monthly',
    ],
    trendingFormats: [
      { format: 'AI-Generated Imagery + Caption', description: 'Use AI to create absurd images with relatable captions', usage: 'Works on all platforms, especially Twitter/X and Instagram' },
      { format: 'Mini Video Memes (< 7s)', description: 'Short clip with text overlay — the new standard', usage: 'TikTok, Reels, YouTube Shorts' },
      { format: 'Screenshot DM Meme', description: 'Fake DM conversation screenshots (clearly labeled satire)', usage: 'Twitter/X, Instagram Stories' },
      { format: 'Corporate vs Reality Split', description: 'Left side: corporate speak. Right side: what they actually mean', usage: 'LinkedIn, Twitter/X — huge in B2B' },
      { format: 'POV Carousel', description: '4-slide carousel each with a POV twist', usage: 'Instagram, LinkedIn — high save/share ratio' },
    ],
  };
}

export default function MemeGeneratorPage() {
  const [style, setStyle] = useState<string>('Drake Format');
  const [platform, setPlatform] = useState<string>('Twitter/X');
  const [industry, setIndustry] = useState<string>('Tech/SaaS');
  const [tone, setTone] = useState<string>('Relatable');
  const [topic, setTopic] = useState('');
  const [result, setResult] = useState<MemeResult | null>(null);

  const handleGenerate = () => setResult(generateMemes(style, platform, industry, tone, topic.trim()));

  return (
    <main className="min-h-screen bg-zinc-950 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Meme Generator</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Create viral meme text for any platform and industry. <strong className="text-white">Memes get 60% more engagement</strong> than standard posts and are the #1 shared content type.</p>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div><label className="block text-sm text-zinc-400 mb-1">Meme Format</label><select value={style} onChange={e => setStyle(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">{memeStyles.map(s => <option key={s}>{s}</option>)}</select></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Platform</label><select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">{platforms.map(p => <option key={p}>{p}</option>)}</select></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Industry</label><select value={industry} onChange={e => setIndustry(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">{industries.map(i => <option key={i}>{i}</option>)}</select></div>
          <div><label className="block text-sm text-zinc-400 mb-1">Tone</label><select value={tone} onChange={e => setTone(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">{tones.map(t => <option key={t}>{t}</option>)}</select></div>
          <div className="md:col-span-2"><label className="block text-sm text-zinc-400 mb-1">Topic / Subject</label><input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g., AI tools, Monday meetings, code reviews" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600" /></div>
        </div>

        <button onClick={handleGenerate} className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition">Generate Meme Text</button>

        {result && (
          <div className="mt-10 space-y-6">
            {result.memes.map((m, i) => (
              <div key={i} className="bg-zinc-900 border border-violet-500/30 rounded-xl p-6">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs bg-violet-500/20 text-violet-300 px-2 py-1 rounded">{m.format}</span>
                  <span className="text-xs text-yellow-400">{m.viralPotential}</span>
                </div>
                <div className="bg-zinc-800 rounded-lg p-4 mb-3 border-l-4 border-violet-500">
                  <p className="text-white font-bold text-sm whitespace-pre-line">{m.topText}</p>
                </div>
                <div className="bg-zinc-800 rounded-lg p-4 border-l-4 border-fuchsia-500">
                  <p className="text-white font-bold text-sm whitespace-pre-line">{m.bottomText}</p>
                </div>
                <p className="text-xs text-zinc-500 mt-2">{m.context}</p>
              </div>
            ))}

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Caption Variants</h3>
              {result.captionVariants.map((c, i) => (
                <div key={i} className="text-sm text-zinc-300 mb-2 flex gap-2"><span className="text-violet-400">{i + 1}.</span>{c}</div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Hashtag Sets</h3>
                {result.hashtagSets.map((h, i) => <p key={i} className="text-sm text-blue-400 mb-2">{h}</p>)}
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Posting Timing</h3>
                <ul className="space-y-2">{result.timingAdvice.map((t, i) => <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-violet-400">•</span>{t}</li>)}</ul>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Trending Meme Formats (2026)</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {result.trendingFormats.map((f, i) => (
                  <div key={i} className="bg-zinc-800 rounded-lg p-3">
                    <h4 className="text-sm font-semibold text-violet-300">{f.format}</h4>
                    <p className="text-xs text-zinc-400 mt-1">{f.description}</p>
                    <p className="text-xs text-zinc-500 mt-1">{f.usage}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-zinc-900 border border-green-500/20 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-green-400 mb-3">Meme Rules</h3>
                <ul className="space-y-2">{result.rules.map((r, i) => <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-green-400">✓</span>{r}</li>)}</ul>
              </div>
              <div className="bg-zinc-900 border border-red-500/20 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-red-400 mb-3">Avoid</h3>
                <ul className="space-y-2">{result.avoid.map((a, i) => <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-red-400">✕</span>{a}</li>)}</ul>
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-zinc-400 mb-3">Related Tools</h3>
              <div className="flex flex-wrap gap-2 text-sm">
                <a href="/hooks" className="text-violet-400 hover:text-violet-300 underline">Hook Generator</a>
                <a href="/carousel-generator" className="text-violet-400 hover:text-violet-300 underline">Carousel Generator</a>
                <a href="/virality-score" className="text-violet-400 hover:text-violet-300 underline">Virality Score</a>
                <a href="/content-remix" className="text-violet-400 hover:text-violet-300 underline">Content Remix</a>
                <a href="/trend-tracker" className="text-violet-400 hover:text-violet-300 underline">Trend Tracker</a>
                <a href="/emotional-analyzer" className="text-violet-400 hover:text-violet-300 underline">Emotional Analyzer</a>
              </div>
            </div>
          </div>
        )}

        <footer className="mt-20 border-t border-zinc-800 pt-8 pb-12">
          <div className="grid md:grid-cols-4 gap-8 text-sm text-zinc-500">
            <div><h4 className="font-semibold text-white mb-3">Creation</h4><ul className="space-y-1"><li><a href="/" className="hover:text-white transition">Posts</a></li><li><a href="/meme-generator" className="hover:text-white transition">Memes</a></li><li><a href="/carousel-generator" className="hover:text-white transition">Carousel</a></li><li><a href="/hooks" className="hover:text-white transition">Hooks</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Video</h4><ul className="space-y-1"><li><a href="/video-scripts" className="hover:text-white transition">Video Scripts</a></li><li><a href="/tiktok-scripts" className="hover:text-white transition">TikTok</a></li><li><a href="/video-pacing" className="hover:text-white transition">Pacing</a></li><li><a href="/story-planner" className="hover:text-white transition">Stories</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Analytics</h4><ul className="space-y-1"><li><a href="/virality-score" className="hover:text-white transition">Virality</a></li><li><a href="/engagement-calculator" className="hover:text-white transition">Engagement</a></li><li><a href="/sentiment-analyzer" className="hover:text-white transition">Sentiment</a></li><li><a href="/trend-tracker" className="hover:text-white transition">Trends</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Strategy</h4><ul className="space-y-1"><li><a href="/content-calendar" className="hover:text-white transition">Calendar</a></li><li><a href="/brand-voice" className="hover:text-white transition">Brand Voice</a></li><li><a href="/campaign" className="hover:text-white transition">Campaign</a></li><li><a href="/content-pillars" className="hover:text-white transition">Pillars</a></li></ul></div>
          </div>
          <p className="text-center text-zinc-600 text-xs mt-8">© 2026 PostCraft AI. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
