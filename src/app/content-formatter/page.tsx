'use client';
import { useState } from 'react';

const sourcePlatforms = ['Instagram', 'TikTok', 'Twitter/X', 'LinkedIn', 'YouTube', 'Facebook', 'Blog/Website', 'Email Newsletter'] as const;
const targetPlatforms = ['Instagram', 'TikTok', 'Twitter/X', 'LinkedIn', 'YouTube', 'Facebook', 'Threads', 'Pinterest', 'Bluesky'] as const;
const contentTypes = ['Post/Caption', 'Video Caption', 'Story', 'Carousel', 'Thread', 'Article Excerpt', 'Ad Copy', 'Newsletter Snippet'] as const;
const adaptationStyles = ['Exact Reformat', 'Creative Adaptation', 'Platform Native', 'Minimal Changes', 'Viral Spin', 'Professional Upgrade'] as const;
const toneShifts = ['Keep Original', 'More Professional', 'More Casual', 'More Viral/Edgy', 'More Educational', 'More Emotional', 'More Data-Driven'] as const;

interface PlatformOutput {
  platform: string;
  formattedContent: string;
  charCount: number;
  charLimit: number;
  hashtags: string[];
  bestPostTime: string;
  engagementPrediction: number;
  formatTips: string[];
  emoji: string;
  color: string;
}

function generateFormattedContent(
  originalContent: string,
  source: string,
  targets: string[],
  contentType: string,
  style: string,
  toneShift: string
): PlatformOutput[] {
  const content = originalContent || 'Your amazing product just launched! After months of hard work, we are thrilled to share it with the world. Check it out and let us know what you think.';
  const isViral = style === 'Viral Spin';
  const isPro = toneShift === 'More Professional' || style === 'Professional Upgrade';
  const isNative = style === 'Platform Native';

  const platformConfigs: Record<string, { limit: number; emoji: string; color: string; time: string; base: number }> = {
    'Instagram': { limit: 2200, emoji: '📸', color: 'from-pink-500 to-purple-600', time: '11:00 AM - 1:00 PM', base: 72 },
    'TikTok': { limit: 2200, emoji: '🎵', color: 'from-gray-900 to-pink-600', time: '7:00 PM - 9:00 PM', base: 85 },
    'Twitter/X': { limit: 280, emoji: '𝕏', color: 'from-gray-800 to-gray-900', time: '9:00 AM - 12:00 PM', base: 65 },
    'LinkedIn': { limit: 3000, emoji: '💼', color: 'from-blue-600 to-blue-800', time: '8:00 AM - 10:00 AM', base: 68 },
    'YouTube': { limit: 5000, emoji: '▶️', color: 'from-red-500 to-red-700', time: '2:00 PM - 4:00 PM', base: 74 },
    'Facebook': { limit: 63206, emoji: '👍', color: 'from-blue-500 to-blue-700', time: '1:00 PM - 4:00 PM', base: 58 },
    'Threads': { limit: 500, emoji: '🧵', color: 'from-gray-900 to-gray-700', time: '10:00 AM - 12:00 PM', base: 62 },
    'Pinterest': { limit: 500, emoji: '📌', color: 'from-red-600 to-red-800', time: '8:00 PM - 11:00 PM', base: 70 },
    'Bluesky': { limit: 300, emoji: '🦋', color: 'from-sky-400 to-blue-600', time: '9:00 AM - 11:00 AM', base: 60 },
  };

  return targets.map(platform => {
    const config = platformConfigs[platform] || { limit: 280, emoji: '📝', color: 'from-gray-500 to-gray-700', time: '12:00 PM', base: 60 };
    let formatted = '';
    const hashtags: string[] = [];
    const tips: string[] = [];

    if (platform === 'Twitter/X' || platform === 'Bluesky') {
      const maxLen = config.limit - 30;
      const short = content.length > maxLen ? content.slice(0, maxLen - 3) + '...' : content;
      formatted = isViral
        ? `🚀 ${short}\n\nThis changes everything.`
        : isPro
        ? `${short}\n\nThoughts?`
        : isNative
        ? `${short}\n\n🧵 Thread below ↓`
        : short;
      hashtags.push('#launch', '#buildinpublic', '#startup');
      tips.push('Keep under 280 chars for max engagement', 'Add a hook in the first 5 words', 'Use 1-2 hashtags max on X');
    } else if (platform === 'Instagram') {
      formatted = isViral
        ? `🔥 Stop scrolling. This is important.\n\n${content}\n\n💡 Save this for later.\n👉 Follow @yourbrand for more\n.\n.\n.`
        : isPro
        ? `${content}\n\n📌 Save this post for reference.\n🔗 Link in bio for details.`
        : isNative
        ? `✨ ${content}\n\n💬 Drop a "🙌" if you agree!\n📲 Share to your stories\n\n#postcraft #contentcreator #socialmedia`
        : `${content}\n\n👉 Link in bio`;
      hashtags.push('#contentcreator', '#socialmedia', '#digitalmarketing', '#growthhacking', '#ai', '#postcraft');
      tips.push('First line is the hook — make it scroll-stopping', 'Use 20-30 hashtags in a comment', 'Add a CTA: save, share, or comment');
    } else if (platform === 'TikTok') {
      formatted = isViral
        ? `POV: You just discovered something that changes everything 🤯\n\n${content}\n\nStitch this if you agree 👇`
        : isNative
        ? `Wait for it... 👀\n\n${content}\n\n#fyp #viral #contentcreator`
        : `${content}\n\n#fyp #foryoupage`;
      hashtags.push('#fyp', '#viral', '#contentcreator', '#techtok', '#learnontiktok');
      tips.push('Hook viewers in first 1-3 seconds', 'Use trending sounds for algorithm boost', 'Ask a question to drive comments', 'Optimal video length: 21-34 seconds');
    } else if (platform === 'LinkedIn') {
      formatted = isPro
        ? `${content}\n\nKey takeaway: Innovation doesn't happen in isolation — it happens when teams ship fast and iterate.\n\n♻️ Repost if this resonates.\n💬 What's your experience?`
        : isViral
        ? `I used to think launching a product was hard.\n\nThen I tried it.\n\nIt was harder.\n\nBut here's what I learned:\n\n${content}\n\nAgree? ♻️`
        : isNative
        ? `Excited to share: ${content}\n\nWe built this because the market needed a better solution. Here are 3 things we learned:\n\n1️⃣ Start with user pain\n2️⃣ Ship fast, iterate faster\n3️⃣ Listen to feedback relentlessly\n\nWhat would you add to this list?`
        : `${content}\n\n#innovation #startup #product`;
      hashtags.push('#innovation', '#startup', '#leadership', '#growth', '#product');
      tips.push('First 2 lines must hook — LinkedIn truncates at ~140 chars', 'Use line breaks for readability', 'Tag relevant people/companies', 'Post between 8-10 AM local time');
    } else if (platform === 'YouTube') {
      formatted = `📹 VIDEO DESCRIPTION:\n\n${content}\n\n⏱️ TIMESTAMPS:\n00:00 Intro\n00:30 The Problem\n02:00 Our Solution\n04:00 Demo\n06:00 Results\n\n🔗 LINKS:\n→ Try it free: [link]\n→ Follow us: [social links]\n\n📌 TAGS: product launch, startup, tech, innovation\n\n👋 Don't forget to LIKE, SUBSCRIBE, and hit the 🔔`;
      hashtags.push('#tech', '#startup', '#productlaunch', '#innovation');
      tips.push('First 150 chars appear in search — front-load keywords', 'Add timestamps for chapters', 'Include relevant links and CTAs', 'Use 3-5 tags max');
    } else if (platform === 'Facebook') {
      formatted = isViral
        ? `📢 BIG NEWS!\n\n${content}\n\n❤️ React if you're excited\n💬 Tell us what feature you want most\n↗️ Share with someone who needs this`
        : `${content}\n\n👉 Learn more: [link]\n💬 What do you think?`;
      hashtags.push('#launch', '#newproduct', '#excited');
      tips.push('Facebook favors native content over links', 'Use Facebook-specific features (polls, events)', 'Engage in comments within first hour');
    } else if (platform === 'Threads') {
      const maxLen = 480;
      const short = content.length > maxLen ? content.slice(0, maxLen - 3) + '...' : content;
      formatted = isNative
        ? `${short}\n\nthoughts? 👇`
        : isViral
        ? `hot take: ${short}\n\nagree or disagree?`
        : short;
      tips.push('Keep it conversational — Threads rewards authenticity', 'No hashtags needed (yet)', 'Reply to your own post to extend');
    } else if (platform === 'Pinterest') {
      formatted = `📌 ${content}\n\n✅ Save this pin for later!\n🔗 Click through for the full guide\n\nKeywords: product launch, startup tips, marketing strategy, growth hacking`;
      hashtags.push('#startup', '#marketing', '#productlaunch', '#tips', '#growth');
      tips.push('Use vertical images (2:3 ratio)', 'Include keywords naturally in description', 'Link to landing page or blog post', 'Rich pins drive 20% more traffic');
    }

    const engagementBoost = isViral ? 15 : isNative ? 10 : isPro ? 5 : 0;
    const sourceMatch = source === platform ? -5 : 3;

    return {
      platform,
      formattedContent: formatted,
      charCount: formatted.length,
      charLimit: config.limit,
      hashtags,
      bestPostTime: config.time,
      engagementPrediction: Math.min(99, config.base + engagementBoost + sourceMatch + Math.floor(Math.random() * 8)),
      formatTips: tips,
      emoji: config.emoji,
      color: config.color,
    };
  });
}

export default function ContentFormatterPage() {
  const [originalContent, setOriginalContent] = useState('');
  const [source, setSource] = useState<string>(sourcePlatforms[0]);
  const [selectedTargets, setSelectedTargets] = useState<string[]>(['Instagram', 'TikTok', 'Twitter/X', 'LinkedIn']);
  const [contentType, setContentType] = useState<string>(contentTypes[0]);
  const [style, setStyle] = useState<string>(adaptationStyles[0]);
  const [tone, setTone] = useState<string>(toneShifts[0]);
  const [results, setResults] = useState<PlatformOutput[] | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const toggleTarget = (p: string) => {
    setSelectedTargets(prev => prev.includes(p) ? prev.filter(t => t !== p) : [...prev, p]);
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Content Formatter</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Paste your content once, get platform-optimized versions for every social network. AI adapts tone, length, hashtags, and formatting for maximum engagement.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Original Content</label>
            <textarea
              value={originalContent}
              onChange={e => setOriginalContent(e.target.value)}
              placeholder="Paste your original post, caption, or content here..."
              rows={5}
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
            />
            <p className="text-xs text-gray-400 mt-1">{originalContent.length} characters</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Source Platform</label>
              <select value={source} onChange={e => setSource(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent">
                {sourcePlatforms.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Content Type</label>
              <select value={contentType} onChange={e => setContentType(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent">
                {contentTypes.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Adaptation Style</label>
              <select value={style} onChange={e => setStyle(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent">
                {adaptationStyles.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tone Shift</label>
              <select value={tone} onChange={e => setTone(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent">
                {toneShifts.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Target Platforms</label>
            <div className="flex flex-wrap gap-2">
              {targetPlatforms.map(p => (
                <button
                  key={p}
                  onClick={() => toggleTarget(p)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedTargets.includes(p)
                      ? 'bg-violet-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2">{selectedTargets.length} platform{selectedTargets.length !== 1 ? 's' : ''} selected</p>
          </div>

          <button
            onClick={() => setResults(generateFormattedContent(originalContent, source, selectedTargets, contentType, style, tone))}
            disabled={selectedTargets.length === 0}
            className="w-full py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold rounded-xl hover:from-violet-700 hover:to-fuchsia-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Format for {selectedTargets.length} Platform{selectedTargets.length !== 1 ? 's' : ''}
          </button>
        </div>

        {results && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-violet-50 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-violet-600">{results.length}</p>
                  <p className="text-sm text-gray-600">Platforms</p>
                </div>
                <div className="bg-fuchsia-50 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-fuchsia-600">{Math.round(results.reduce((a, r) => a + r.engagementPrediction, 0) / results.length)}</p>
                  <p className="text-sm text-gray-600">Avg Engagement Score</p>
                </div>
                <div className="bg-emerald-50 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-emerald-600">{results.reduce((a, r) => a + r.hashtags.length, 0)}</p>
                  <p className="text-sm text-gray-600">Total Hashtags</p>
                </div>
                <div className="bg-amber-50 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-amber-600">{results.reduce((a, r) => a + r.charCount, 0).toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Total Characters</p>
                </div>
              </div>
            </div>

            {results.map((r, i) => (
              <div key={r.platform} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className={`bg-gradient-to-r ${r.color} p-4 flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{r.emoji}</span>
                    <h3 className="text-xl font-bold text-white">{r.platform}</h3>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-white/80 text-sm">{r.charCount}/{r.charLimit} chars</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${r.engagementPrediction >= 80 ? 'bg-green-400 text-green-900' : r.engagementPrediction >= 60 ? 'bg-yellow-400 text-yellow-900' : 'bg-red-400 text-red-900'}`}>
                      {r.engagementPrediction}/100
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="bg-gray-50 rounded-xl p-4 mb-4 relative">
                    <pre className="text-gray-800 text-sm whitespace-pre-wrap font-sans">{r.formattedContent}</pre>
                    <button
                      onClick={() => handleCopy(r.formattedContent, i)}
                      className="absolute top-3 right-3 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      {copiedIdx === i ? '✓ Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 mb-2">HASHTAGS</p>
                      <div className="flex flex-wrap gap-1">
                        {r.hashtags.map(h => (
                          <span key={h} className="bg-violet-100 text-violet-700 px-2 py-1 rounded text-xs">{h}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 mb-2">BEST POST TIME</p>
                      <p className="text-sm text-gray-700 font-medium">{r.bestPostTime}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 mb-2">FORMAT TIPS</p>
                      <ul className="space-y-1">
                        {r.formatTips.map((t, j) => <li key={j} className="text-xs text-gray-600 flex gap-1"><span className="text-violet-500">&#9679;</span>{t}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
