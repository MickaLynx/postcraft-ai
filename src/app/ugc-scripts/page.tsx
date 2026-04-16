'use client';
import { useState } from 'react';

const scriptTypes = ['Product Review', 'Unboxing', 'Day in My Life', 'Get Ready With Me', 'Tutorial/How-To', 'Before & After', 'Story Time', 'Haul Video', 'Comparison/Versus', 'Challenge/Trend'] as const;
const platforms = ['TikTok', 'Instagram Reels', 'YouTube Shorts', 'YouTube Long-Form', 'Pinterest Idea Pins', 'Facebook Reels', 'Snapchat Spotlight'] as const;
const niches = ['Beauty/Skincare', 'Fashion', 'Tech/Gadgets', 'Food/Cooking', 'Fitness', 'Home/Interior', 'Travel', 'Parenting', 'Pets', 'Finance/Investing', 'SaaS/Productivity', 'Gaming'] as const;
const durations = ['15 seconds', '30 seconds', '60 seconds', '90 seconds', '3 minutes', '5+ minutes'] as const;
const hooks = ['Question Hook', 'Shocking Stat', 'Controversy', 'Before/After Reveal', 'POV Statement', 'Whisper/ASMR', 'Text Overlay Mystery', 'Trend Audio Sync'] as const;

interface UGCScript {
  hook: string;
  scenes: { time: string; visual: string; audio: string; text: string }[];
  callToAction: string;
  captionOptions: string[];
  hashtagStrategy: string[];
  musicSuggestions: string[];
  shootingTips: string[];
  editingNotes: string[];
  brandSafetyChecklist: string[];
  estimatedReach: string;
}

function generateUGCScript(type: string, platform: string, niche: string, duration: string, hookType: string, product: string): UGCScript {
  const productRef = product || '[your product]';
  const durSeconds = parseInt(duration) || 30;

  const hookMap: Record<string, string> = {
    'Question Hook': `"Wait, have you tried ${productRef} yet? Because..."`,
    'Shocking Stat': `"I didn't believe this until I saw the numbers — ${productRef} changed everything"`,
    'Controversy': `"Unpopular opinion: ${productRef} is NOT what you think it is..."`,
    'Before/After Reveal': `*Show 'before' state* "Watch what happens when I use ${productRef}"`,
    'POV Statement': `"POV: You just discovered ${productRef} and your whole routine changes"`,
    'Whisper/ASMR': `*Whisper* "Okay I need to tell you about ${productRef} before it blows up"`,
    'Text Overlay Mystery': `*Text on screen: "The product my dermatologist BEGGED me to use"* → reveal ${productRef}`,
    'Trend Audio Sync': `*Sync trending audio beat drop to ${productRef} reveal*`,
  };

  const scenesByType: Record<string, { time: string; visual: string; audio: string; text: string }[]> = {
    'Product Review': [
      { time: '0-3s', visual: 'Close-up of face with surprised expression', audio: hookMap[hookType] || hookMap['Question Hook'], text: 'Hook text overlay' },
      { time: '3-8s', visual: `Show ${productRef} packaging, unbox slowly`, audio: `"So I've been using ${productRef} for 2 weeks now..."`, text: '"2 weeks later..." overlay' },
      { time: '8-15s', visual: 'Show product texture/details with good lighting', audio: '"What I love about it is..." (list 2-3 benefits)', text: 'Bullet point overlays of benefits' },
      { time: '15-22s', visual: 'Show yourself using the product', audio: '"The application is so smooth/easy/satisfying"', text: 'Step-by-step labels' },
      { time: '22-27s', visual: 'Show results or before/after', audio: '"And look at the difference!"', text: '"Before → After" split screen text' },
      { time: '27-30s', visual: 'Face to camera, genuine smile', audio: '"Link in bio, trust me on this one"', text: 'CTA overlay + product name' },
    ],
    'Unboxing': [
      { time: '0-3s', visual: 'Hands hovering over sealed package', audio: hookMap[hookType] || '"Okay this just arrived and I\'m SO excited"', text: '"Unboxing 📦" text overlay' },
      { time: '3-10s', visual: 'Slowly open package, ASMR sounds', audio: 'Natural sounds + light narration', text: 'Product name reveal text' },
      { time: '10-18s', visual: 'Remove each item, show details', audio: '"Look at the packaging, the quality..."', text: 'Label each item' },
      { time: '18-25s', visual: 'First use/try on', audio: '"First impressions..."', text: '"First Try" overlay' },
      { time: '25-30s', visual: 'Genuine reaction shot', audio: '"Okay this is definitely a [rating]/10"', text: 'Score overlay + CTA' },
    ],
    'Day in My Life': [
      { time: '0-3s', visual: 'Morning alarm/wake up shot', audio: hookMap[hookType] || '"Day in my life using ONLY [product category]"', text: '"5:30 AM" overlay' },
      { time: '3-10s', visual: `Morning routine featuring ${productRef}`, audio: 'Trending audio or voiceover', text: 'Time stamps as you go' },
      { time: '10-20s', visual: 'Mid-day usage of product in context', audio: '"This is where [product] really shines..."', text: 'Scene transition overlays' },
      { time: '20-25s', visual: 'Evening/results shot', audio: '"End of day results..."', text: 'Results text overlay' },
      { time: '25-30s', visual: 'Cozy wrap-up shot', audio: '"Would I do this again? Absolutely"', text: 'CTA + link' },
    ],
  };

  const defaultScenes = [
    { time: '0-3s', visual: 'Eye-catching opening shot', audio: hookMap[hookType] || 'Trending audio hook', text: 'Hook text overlay' },
    { time: '3-10s', visual: `Introduce ${productRef} naturally`, audio: 'Natural voiceover about discovery', text: 'Product name overlay' },
    { time: '10-20s', visual: 'Show product in use with good lighting', audio: 'Explain key benefits conversationally', text: 'Benefit bullet points' },
    { time: '20-27s', visual: 'Results or transformation shot', audio: '"And here\'s what happened..."', text: 'Before/After or results text' },
    { time: '27-30s', visual: 'Face to camera, genuine emotion', audio: 'CTA — "Link in bio" or "Comment for link"', text: 'CTA overlay' },
  ];

  const scenes = scenesByType[type] || defaultScenes;

  const platformCaptions: Record<string, string[]> = {
    'TikTok': [
      `${productRef} just changed the game 🤯 #${niche.replace(/[/ ]/g, '')} #fyp #viral`,
      `I wasn't paid to say this but ${productRef} is THAT good 😭 #honest #review`,
      `POV: you finally found THE ${niche.toLowerCase()} product #${niche.replace(/[/ ]/g, '')}tok`,
    ],
    'Instagram Reels': [
      `Not sponsored, just obsessed ✨ ${productRef} really does what it claims.\n.\n.\n#${niche.replace(/[/ ]/g, '')} #reels #trending #musthaave`,
      `Save this for later → My honest take on ${productRef} after 2 weeks 📌`,
      `The ${niche.toLowerCase()} product you didn't know you needed 👇`,
    ],
    'YouTube Shorts': [
      `${productRef} — Honest Review in 60 Seconds ⏱️ #shorts #${niche.replace(/[/ ]/g, '')}`,
      `Is ${productRef} worth the hype? Let me show you... #shorts #review`,
    ],
  };

  return {
    hook: hookMap[hookType] || hookMap['Question Hook'],
    scenes,
    callToAction: platform === 'TikTok' ? `"Comment '${productRef.toUpperCase()}' and I'll send you the link!"` : `"Link in bio for ${productRef} — use my code for 15% off"`,
    captionOptions: platformCaptions[platform] || platformCaptions['TikTok'],
    hashtagStrategy: [
      `#${niche.replace(/[/ ]/g, '')} (niche — high intent)`,
      `#${productRef.replace(/\s/g, '')}Review (branded — trackable)`,
      '#fyp #viral #trending (discovery — broad reach)',
      `#${type.replace(/[/ ]/g, '').toLowerCase()} (format — helps algorithm categorize)`,
      `#ugc #contentcreator (community — networking)`,
    ],
    musicSuggestions: [
      'Trending audio of the week (check TikTok Creative Center)',
      'Lo-fi beats for tutorial/review content',
      'Upbeat pop for unboxing/haul energy',
      'Original audio with voiceover (best for SEO)',
      'ASMR/natural sounds for product texture shots',
    ],
    shootingTips: [
      'Natural lighting — face a window, golden hour is chef\'s kiss',
      'Clean background — minimize clutter, use a shelf or desk setup',
      'Rule of thirds — place product or face at intersection points',
      `Film in ${platform === 'YouTube Long-Form' ? '16:9 landscape' : '9:16 vertical'} ratio`,
      'Multiple angles — wide, medium, close-up for editing variety',
      'Hands in frame — shows scale and makes it more personal',
      'Film 3x more than you need — gives editing flexibility',
    ],
    editingNotes: [
      `Keep cuts under ${durSeconds > 30 ? '3' : '2'} seconds each — maintain pace`,
      'Add text overlays at EVERY scene change',
      'Use zoom-ins for emphasis on key product features',
      'Color grade for consistency across clips',
      'Add subtle sound effects at transitions',
      `Export at ${platform.includes('YouTube') ? '4K' : '1080p'} for best quality`,
    ],
    brandSafetyChecklist: [
      '✅ Disclose partnership: "Ad", "Sponsored", or "Gifted" in first 3 seconds',
      '✅ No false claims — only state verifiable benefits',
      '✅ Include "Results may vary" for transformation content',
      '✅ No competitor bashing — focus on YOUR experience',
      '✅ Music rights cleared for commercial use',
      '✅ No copyrighted logos visible in background',
      '✅ Age-appropriate content for platform guidelines',
    ],
    estimatedReach: durSeconds <= 30 ? '5K-50K views (short-form sweet spot)' : durSeconds <= 60 ? '3K-30K views (standard engagement)' : '1K-15K views (longer form, higher intent)',
  };
}

export default function UGCScriptsPage() {
  const [type, setType] = useState<string>(scriptTypes[0]);
  const [platform, setPlatform] = useState<string>(platforms[0]);
  const [niche, setNiche] = useState<string>(niches[0]);
  const [duration, setDuration] = useState<string>(durations[1]);
  const [hookType, setHookType] = useState<string>(hooks[0]);
  const [product, setProduct] = useState('');
  const [result, setResult] = useState<UGCScript | null>(null);

  const handleGenerate = () => {
    setResult(generateUGCScript(type, platform, niche, duration, hookType, product));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">UGC Script Generator</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Create professional user-generated content scripts with scene-by-scene direction, shooting tips, and brand safety guidelines.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Script Type</label>
              <select value={type} onChange={e => setType(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                {scriptTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Platform</label>
              <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                {platforms.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Niche</label>
              <select value={niche} onChange={e => setNiche(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                {niches.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Duration</label>
              <select value={duration} onChange={e => setDuration(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                {durations.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Hook Style</label>
              <select value={hookType} onChange={e => setHookType(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                {hooks.map(h => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Product/Brand</label>
              <input type="text" value={product} onChange={e => setProduct(e.target.value)} placeholder="e.g. GlowSerum, FitPro App..." className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent" />
            </div>
          </div>
          <button onClick={handleGenerate} className="w-full py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold rounded-xl hover:from-pink-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl">Generate UGC Script</button>
        </div>

        {result && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Opening Hook</h2>
              <div className="bg-pink-50 rounded-xl p-6 text-lg font-medium text-pink-800 italic">{result.hook}</div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Scene-by-Scene Script</h2>
              <div className="space-y-4">
                {result.scenes.map((scene, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-lg text-sm font-bold">Scene {i + 1}</span>
                      <span className="text-gray-500 text-sm font-mono">{scene.time}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div><span className="text-xs font-semibold text-gray-500 uppercase">Visual</span><p className="text-gray-800 mt-1">{scene.visual}</p></div>
                      <div><span className="text-xs font-semibold text-gray-500 uppercase">Audio/Script</span><p className="text-gray-800 mt-1">{scene.audio}</p></div>
                      <div><span className="text-xs font-semibold text-gray-500 uppercase">Text Overlay</span><p className="text-gray-800 mt-1">{scene.text}</p></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Call to Action</h2>
              <div className="bg-purple-50 rounded-xl p-5 text-purple-800 font-medium">{result.callToAction}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Caption Options</h2>
                <div className="space-y-3">{result.captionOptions.map((c, i) => <div key={i} className="bg-gray-50 rounded-xl p-4 text-gray-700 text-sm">{c}</div>)}</div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Hashtag Strategy</h2>
                <div className="space-y-2">{result.hashtagStrategy.map((h, i) => <div key={i} className="text-gray-700 text-sm">{h}</div>)}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Shooting Tips</h2>
                <ul className="space-y-2">{result.shootingTips.map((t, i) => <li key={i} className="text-gray-700 text-sm flex gap-2"><span className="text-pink-500">📸</span>{t}</li>)}</ul>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Editing Notes</h2>
                <ul className="space-y-2">{result.editingNotes.map((n, i) => <li key={i} className="text-gray-700 text-sm flex gap-2"><span className="text-purple-500">✂️</span>{n}</li>)}</ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Music Suggestions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {result.musicSuggestions.map((m, i) => <div key={i} className="bg-gray-50 rounded-xl p-4 text-gray-700 text-sm flex gap-2"><span>🎵</span>{m}</div>)}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Brand Safety Checklist</h2>
              <div className="space-y-2">{result.brandSafetyChecklist.map((c, i) => <div key={i} className="text-gray-700 text-sm">{c}</div>)}</div>
              <div className="mt-4 bg-green-50 rounded-xl p-4 text-green-800 text-sm font-medium">Estimated Reach: {result.estimatedReach}</div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
