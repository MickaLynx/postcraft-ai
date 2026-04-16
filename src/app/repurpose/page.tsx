'use client';
import { useState } from 'react';

const platforms = ['Twitter/X', 'LinkedIn', 'Instagram', 'TikTok', 'Facebook', 'YouTube'] as const;
const contentTypes = ['Blog Post', 'Podcast Transcript', 'Newsletter', 'Video Script', 'Webinar Notes', 'Case Study', 'Press Release', 'Research Report'] as const;

interface RepurposedContent {
  platform: string;
  format: string;
  content: string;
  charCount: number;
  charLimit: number;
  tips: string[];
  hashtags: string[];
  bestTime: string;
  engagementEstimate: string;
}

function extractKeyPoints(text: string): string[] {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 20);
  const points: string[] = [];
  for (let i = 0; i < Math.min(sentences.length, 8); i++) {
    points.push(sentences[i].trim());
  }
  return points.length > 0 ? points : ['Key insight from your content'];
}

function repurpose(sourceText: string, sourceType: string, targetPlatforms: string[]): RepurposedContent[] {
  const keyPoints = extractKeyPoints(sourceText);
  const words = sourceText.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  const platformConfig: Record<string, { charLimit: number; format: string; bestTime: string; hashtagCount: number }> = {
    'Twitter/X': { charLimit: 280, format: 'Thread (5-8 posts)', bestTime: '8-9 AM, 12-1 PM', hashtagCount: 2 },
    'LinkedIn': { charLimit: 3000, format: 'Professional Carousel', bestTime: '7-8 AM, 12 PM', hashtagCount: 5 },
    'Instagram': { charLimit: 2200, format: 'Carousel + Caption', bestTime: '11 AM-1 PM, 7-9 PM', hashtagCount: 15 },
    'TikTok': { charLimit: 300, format: 'Script (30-60s)', bestTime: '7-9 AM, 12-3 PM', hashtagCount: 5 },
    'Facebook': { charLimit: 5000, format: 'Long Post + Discussion', bestTime: '1-4 PM, 6-9 PM', hashtagCount: 3 },
    'YouTube': { charLimit: 5000, format: 'Video Script (3-5 min)', bestTime: '2-4 PM, 6-9 PM', hashtagCount: 8 },
  };

  const hashtagSets: Record<string, string[]> = {
    'Blog Post': ['#blogging', '#contentmarketing', '#digitalmarketing', '#writing', '#marketing', '#blogger', '#content', '#strategy', '#growth', '#tips', '#business', '#entrepreneur', '#socialmedia', '#branding', '#storytelling'],
    'Podcast Transcript': ['#podcast', '#podcasting', '#interview', '#conversation', '#insights', '#leadership', '#learning', '#audio', '#podcastlife', '#listen', '#episodes', '#guests', '#knowledge', '#wisdom', '#talks'],
    'Newsletter': ['#newsletter', '#email', '#emailmarketing', '#subscribers', '#updates', '#insights', '#weekly', '#digest', '#curated', '#community', '#build', '#audience', '#growth', '#engage', '#value'],
    default: ['#content', '#socialmedia', '#marketing', '#digital', '#strategy', '#growth', '#tips', '#business', '#brand', '#engagement', '#create', '#share', '#viral', '#trending', '#community'],
  };

  const tags = hashtagSets[sourceType] || hashtagSets['default'];

  return targetPlatforms.map(platform => {
    const config = platformConfig[platform] || platformConfig['Twitter/X'];
    let content = '';

    if (platform === 'Twitter/X') {
      const threadPosts = keyPoints.slice(0, 6).map((point, i) => {
        if (i === 0) return `🧵 ${point.slice(0, 250)}\n\nA thread 👇`;
        return `${i}/ ${point.slice(0, 260)}`;
      });
      threadPosts.push(`${threadPosts.length}/ If this was helpful:\n• Follow for more\n• RT the first tweet\n• Drop a comment 👇`);
      content = threadPosts.join('\n\n---\n\n');
    } else if (platform === 'LinkedIn') {
      content = `${keyPoints[0] || 'Key insight'}\n\n`;
      content += keyPoints.slice(1, 5).map((p, i) => `${i + 1}. ${p}`).join('\n');
      content += `\n\n💡 Key Takeaway: ${keyPoints[0] || 'This changes everything'}\n\n`;
      content += `What's your take? Drop a comment 👇\n\n`;
      content += tags.slice(0, 5).join(' ');
    } else if (platform === 'Instagram') {
      content = `✨ ${keyPoints[0] || 'Key insight'}\n\n`;
      content += `Swipe to learn more 👉\n\n`;
      content += keyPoints.slice(0, 4).map((p, i) => `Slide ${i + 2}: ${p}`).join('\n');
      content += `\n\nSave this for later 🔖\n.\n.\n.\n`;
      content += tags.slice(0, 15).join(' ');
    } else if (platform === 'TikTok') {
      content = `[HOOK - 3 seconds]\n"${keyPoints[0]?.slice(0, 80) || 'Stop scrolling'}..."\n\n`;
      content += `[BODY - 20 seconds]\n`;
      content += keyPoints.slice(1, 3).map(p => `• ${p.slice(0, 100)}`).join('\n');
      content += `\n\n[CTA - 5 seconds]\n"Follow for more tips like this"\n\n`;
      content += tags.slice(0, 5).join(' ');
    } else if (platform === 'Facebook') {
      content = `🔥 ${keyPoints[0] || 'Key insight'}\n\n`;
      content += `Here's what I learned:\n\n`;
      content += keyPoints.slice(0, 5).map((p, i) => `${i + 1}. ${p}`).join('\n\n');
      content += `\n\nWhat do you think? Have you experienced this?\n\n`;
      content += tags.slice(0, 3).join(' ');
    } else {
      content = `[INTRO - 30s]\nHey everyone, today we're diving into something important.\n"${keyPoints[0] || 'Key topic'}"\n\n`;
      content += `[MAIN CONTENT - 3 min]\n`;
      content += keyPoints.slice(0, 5).map((p, i) => `Point ${i + 1}: ${p}`).join('\n\n');
      content += `\n\n[OUTRO - 30s]\nIf you found this helpful, like and subscribe.\nDrop a comment with your experience.\n\n`;
      content += `Tags: ${tags.slice(0, 8).join(', ')}`;
    }

    const tips: string[] = [];
    if (platform === 'Twitter/X') tips.push('Post thread during morning hours for max engagement', 'Add a relevant image to the first tweet', 'Quote-tweet your own thread 24h later for extra reach');
    else if (platform === 'LinkedIn') tips.push('Open with a bold statement or question', 'Use line breaks for readability', 'Tag relevant people in comments, not the post');
    else if (platform === 'Instagram') tips.push('Use high-contrast visuals for carousel slides', 'Add text overlays on each slide', 'First slide = hook, last slide = CTA');
    else if (platform === 'TikTok') tips.push('Film vertically (9:16)', 'Use trending audio if relevant', 'Hook in first 3 seconds or lose them');
    else if (platform === 'Facebook') tips.push('Ask a question to encourage comments', 'Post in relevant groups too', 'Long posts outperform short ones');
    else tips.push('First 30 seconds decide if viewers stay', 'Add timestamps in description', 'End with a clear CTA');

    const engEstimates: Record<string, string> = {
      'Twitter/X': wordCount > 200 ? 'High (threads from long content perform well)' : 'Medium',
      'LinkedIn': wordCount > 300 ? 'High (professional content resonates)' : 'Medium',
      'Instagram': 'High (carousels get 3x more reach)',
      'TikTok': 'Very High (short-form video dominates)',
      'Facebook': wordCount > 500 ? 'Medium-High (long posts drive discussion)' : 'Medium',
      'YouTube': 'High (long-form video has best retention)',
    };

    return {
      platform,
      format: config.format,
      content,
      charCount: content.length,
      charLimit: config.charLimit,
      tips,
      hashtags: tags.slice(0, config.hashtagCount),
      bestTime: config.bestTime,
      engagementEstimate: engEstimates[platform] || 'Medium',
    };
  });
}

export default function RepurposePage() {
  const [sourceText, setSourceText] = useState('');
  const [sourceType, setSourceType] = useState<string>('Blog Post');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['Twitter/X', 'LinkedIn', 'Instagram']);
  const [results, setResults] = useState<RepurposedContent[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  const togglePlatform = (p: string) => {
    setSelectedPlatforms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  };

  const handleRepurpose = () => {
    if (!sourceText.trim() || selectedPlatforms.length === 0) return;
    setResults(repurpose(sourceText, sourceType, selectedPlatforms));
  };

  const copy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold gradient-text mb-4">Content Repurposer</h1>
      <p className="text-zinc-400 mb-8 max-w-2xl">Paste any long-form content and instantly get platform-optimized versions for every social channel. One piece of content becomes 6 platform-native posts.</p>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Source Content Type</label>
          <select value={sourceType} onChange={e => setSourceType(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none max-w-xs">
            {contentTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Paste Your Content</label>
          <textarea value={sourceText} onChange={e => setSourceText(e.target.value)} rows={8} placeholder="Paste your blog post, podcast transcript, newsletter, or any long-form content here..." className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none resize-y" />
          <p className="text-xs text-zinc-600 mt-1">{sourceText.trim().split(/\s+/).filter(Boolean).length} words</p>
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Target Platforms</label>
          <div className="flex flex-wrap gap-2">
            {platforms.map(p => (
              <button key={p} onClick={() => togglePlatform(p)} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${selectedPlatforms.includes(p) ? 'bg-purple-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button onClick={handleRepurpose} disabled={!sourceText.trim() || selectedPlatforms.length === 0} className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 mb-10">Repurpose Content</button>

      {results.length > 0 && (
        <div className="space-y-6">
          <p className="text-sm text-zinc-400">Generated {results.length} platform-optimized versions from your {sourceType.toLowerCase()}</p>
          {results.map((r, i) => (
            <div key={i} className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">{r.platform}</h3>
                  <span className="text-xs text-purple-400">{r.format}</span>
                </div>
                <div className="text-right text-sm">
                  <div><span className="text-zinc-400">Best Time:</span> <span className="text-zinc-300">{r.bestTime}</span></div>
                  <div><span className="text-zinc-400">Engagement:</span> <span className="text-green-400">{r.engagementEstimate}</span></div>
                </div>
              </div>

              <div className="bg-zinc-900/50 rounded-lg p-4 mb-4 cursor-pointer hover:bg-zinc-800/50 transition" onClick={() => copy(r.content, i)}>
                <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-sans">{r.content}</pre>
                <div className="flex justify-between mt-3 text-xs text-zinc-500">
                  <span>{r.charCount} chars</span>
                  <span className={copied === i ? 'text-green-400' : ''}>{copied === i ? 'Copied!' : 'Click to copy'}</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-purple-400 mb-2">Platform Tips</h4>
                  <ul className="text-sm text-zinc-400 space-y-1">
                    {r.tips.map((t, j) => <li key={j}>• {t}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-purple-400 mb-2">Suggested Hashtags</h4>
                  <div className="flex flex-wrap gap-1">
                    {r.hashtags.map(h => <span key={h} className="text-xs bg-purple-900/20 text-purple-400 px-2 py-0.5 rounded">{h}</span>)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <section className="mt-16 space-y-8 text-zinc-400">
        <h2 className="text-2xl font-bold text-white">The Complete Guide to Content Repurposing in 2026</h2>
        <p>Content repurposing is the practice of transforming one piece of content into multiple formats optimized for different platforms. A single blog post can become a Twitter thread, LinkedIn carousel, Instagram reel script, TikTok video, Facebook post, and YouTube script — each tailored to the platform&apos;s audience and algorithm.</p>

        <h3 className="text-xl font-semibold text-white">Why Repurpose?</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong className="text-white">10x your reach</strong> without 10x the effort</li>
          <li><strong className="text-white">Feed every algorithm</strong> with platform-native content</li>
          <li><strong className="text-white">Reinforce your message</strong> — people need 7+ touches before taking action</li>
          <li><strong className="text-white">Save 15+ hours/week</strong> on content creation</li>
        </ul>

        <h3 className="text-xl font-semibold text-white">Best Practices</h3>
        <p>Never copy-paste the same content across platforms. Each platform has different character limits, audience expectations, and content formats. A LinkedIn post should feel professional and insightful; a TikTok script should be punchy and visual. PostCraft&apos;s repurposer automatically adapts format, length, tone, and hashtags for each platform.</p>

        <div className="border-t border-zinc-800 pt-8">
          <h3 className="text-xl font-semibold text-white">FAQ</h3>
          <div className="space-y-4 mt-4">
            <div><h4 className="font-medium text-white">What content types work best for repurposing?</h4><p className="text-sm">Blog posts and podcast transcripts are ideal — they contain enough depth to extract multiple platform-native pieces. Newsletters and case studies also work well.</p></div>
            <div><h4 className="font-medium text-white">How many platforms should I repurpose to?</h4><p className="text-sm">Start with 3 platforms where your audience is most active. Quality over quantity — 3 great platform-native posts beat 6 mediocre ones.</p></div>
            <div><h4 className="font-medium text-white">Should I post all versions at once?</h4><p className="text-sm">No. Stagger posts across 2-3 days. This extends the life of your content and prevents audience fatigue if people follow you on multiple platforms.</p></div>
          </div>
        </div>
      </section>
    </main>
  );
}
