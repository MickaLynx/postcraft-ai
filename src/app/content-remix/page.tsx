'use client';
import { useState } from 'react';

const platforms = ['Twitter/X', 'LinkedIn', 'Instagram', 'TikTok', 'Facebook', 'YouTube'] as const;
const remixAngles = ['Contrarian Take', 'Personal Experience', 'Data-Backed', 'Beginner-Friendly', 'Advanced/Expert', 'Controversial Hot Take', 'Storytelling', 'Listicle', 'Question-Led', 'Myth Busting'] as const;

interface RemixVersion {
  angle: string;
  hook: string;
  body: string;
  cta: string;
  platform: string;
  engagementPrediction: string;
}

interface RemixResult {
  original: string;
  remixes: RemixVersion[];
  publishCalendar: { day: string; version: string; platform: string }[];
  tips: string[];
}

function remixContent(platform: string, originalPost: string, selectedAngles: string[]): RemixResult {
  const topic = originalPost.slice(0, 60).replace(/[.!?\n]/g, '');

  const angleTemplates: Record<string, { hook: string; bodyStyle: string; cta: string; engagement: string }> = {
    'Contrarian Take': { hook: `Everyone says "${topic}." They're wrong. Here's why →`, bodyStyle: 'Challenge conventional wisdom with evidence. Present the unpopular truth.', cta: 'Agree or disagree? Comment your take.', engagement: 'High comments (controversial = engagement)' },
    'Personal Experience': { hook: `I tried "${topic}" for 30 days. Here's what actually happened →`, bodyStyle: 'First-person story arc: expectation → reality → lesson learned.', cta: 'Have you tried this? DM me your experience.', engagement: 'High saves (personal stories = relatable)' },
    'Data-Backed': { hook: `The data on "${topic}" is clear: [specific stat]. Here's what it means →`, bodyStyle: 'Lead with a surprising statistic. Break down what it means for your audience.', cta: 'Save this for your next strategy session.', engagement: 'High shares (data = credibility)' },
    'Beginner-Friendly': { hook: `New to "${topic}"? Here's everything you need to know in 60 seconds →`, bodyStyle: 'ELI5 style. No jargon. Step-by-step with examples.', cta: 'Tag someone who needs to see this.', engagement: 'High shares (accessible = viral)' },
    'Advanced/Expert': { hook: `If you already know "${topic}", here's the next level most people miss →`, bodyStyle: 'Skip basics. Deep-dive into advanced tactics that separate pros from amateurs.', cta: 'What advanced tip would you add? Reply below.', engagement: 'High engagement from niche experts' },
    'Controversial Hot Take': { hook: `Hot take: "${topic}" is a waste of time. Here's what to do instead →`, bodyStyle: 'Bold claim + reasoning + better alternative. Expect pushback.', cta: 'Fight me in the comments. 🥊', engagement: 'Very high comments (polarizing = algorithmic gold)' },
    'Storytelling': { hook: `This is the story of how "${topic}" changed everything for me →`, bodyStyle: 'Narrative arc: setup → conflict → resolution → lesson.', cta: 'Follow for more stories like this.', engagement: 'High completion rate (stories hook attention)' },
    'Listicle': { hook: `7 things about "${topic}" that nobody tells you →`, bodyStyle: 'Numbered list with one insight per point. Easy to scan, easy to save.', cta: 'Which one surprised you? Comment the number.', engagement: 'High saves (listicles = reference content)' },
    'Question-Led': { hook: `Why does "${topic}" work for some people and not others? →`, bodyStyle: 'Open with a genuine question. Explore multiple angles. Don\'t give one answer.', cta: 'What\'s your experience? Reply with your answer.', engagement: 'High comments (questions invite responses)' },
    'Myth Busting': { hook: `3 myths about "${topic}" that are costing you money →`, bodyStyle: 'Myth → Truth format. Each myth gets debunked with evidence.', cta: 'Share this to save someone from these mistakes.', engagement: 'High shares (myth-busting = shareable education)' },
  };

  const remixes: RemixVersion[] = selectedAngles.map(angle => {
    const template = angleTemplates[angle] || angleTemplates['Contrarian Take'];
    return {
      angle,
      hook: template.hook,
      body: template.bodyStyle,
      cta: template.cta,
      platform,
      engagementPrediction: template.engagement,
    };
  });

  const publishCalendar = remixes.map((r, i) => ({
    day: `Day ${(i + 1) * 2}`,
    version: r.angle,
    platform: i % 2 === 0 ? platform : platforms[(platforms.indexOf(platform as typeof platforms[number]) + 1) % platforms.length],
  }));

  return {
    original: originalPost.slice(0, 200) + (originalPost.length > 200 ? '...' : ''),
    remixes,
    publishCalendar,
    tips: [
      'Space remixed versions 2-3 days apart — same audience, fresh angle',
      'Cross-post: original on platform A, remix on platform B',
      'The contrarian take almost always outperforms the original — lean into debate',
      'Listicle versions get saved more, story versions get shared more — know your goal',
      'Test which angle resonates most, then double down on that format for this topic',
      'One piece of content → 10 remixed versions = 3 weeks of content from 1 idea',
    ],
  };
}

export default function ContentRemixPage() {
  const [platform, setPlatform] = useState<string>('LinkedIn');
  const [originalPost, setOriginalPost] = useState('');
  const [selectedAngles, setSelectedAngles] = useState<string[]>(['Contrarian Take', 'Personal Experience', 'Data-Backed', 'Listicle', 'Myth Busting']);
  const [result, setResult] = useState<RemixResult | null>(null);

  const toggleAngle = (angle: string) => {
    setSelectedAngles(prev => prev.includes(angle) ? prev.filter(a => a !== angle) : [...prev, angle]);
  };

  const handleRemix = () => {
    if (!originalPost.trim() || selectedAngles.length === 0) return;
    setResult(remixContent(platform, originalPost.trim(), selectedAngles));
  };

  return (
    <main className="min-h-screen bg-zinc-950 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Content Remix Engine</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Take one idea and remix it into <strong className="text-white">10 different angles</strong>. Same topic, fresh perspective, new engagement — one idea fuels weeks of content.</p>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div><label className="block text-sm text-zinc-400 mb-1">Primary Platform</label><select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">{platforms.map(p => <option key={p}>{p}</option>)}</select></div>
        </div>

        <div className="mb-4"><label className="block text-sm text-zinc-400 mb-1">Original Content / Core Idea</label><textarea value={originalPost} onChange={e => setOriginalPost(e.target.value)} rows={4} placeholder="Paste your original post or describe the core idea you want to remix..." className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600 resize-none" /></div>

        <div className="mb-6"><label className="block text-sm text-zinc-400 mb-2">Remix Angles (select 3-10)</label><div className="flex flex-wrap gap-2">{remixAngles.map(a => <button key={a} onClick={() => toggleAngle(a)} className={`px-3 py-1.5 rounded-lg text-sm transition ${selectedAngles.includes(a) ? 'bg-violet-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}>{a}</button>)}</div></div>

        <button onClick={handleRemix} className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition">Remix Content</button>

        {result && (
          <div className="mt-10 space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-sm text-zinc-400 mb-1">Original</h3>
              <p className="text-white text-sm">{result.original}</p>
            </div>

            <h2 className="text-2xl font-bold text-white">{result.remixes.length} Remixed Versions</h2>
            {result.remixes.map((r, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs bg-violet-600/20 text-violet-300 px-2 py-1 rounded">{r.angle}</span>
                  <span className="text-xs text-green-400">{r.engagementPrediction}</span>
                </div>
                <h3 className="text-white font-medium mb-2">{r.hook}</h3>
                <p className="text-sm text-zinc-400 mb-2">Body: {r.body}</p>
                <p className="text-sm text-fuchsia-400">CTA: {r.cta}</p>
              </div>
            ))}

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Publish Calendar</h3>
                {result.publishCalendar.map((p, i) => (
                  <div key={i} className="flex justify-between items-center mb-2 bg-zinc-800 rounded-lg p-3">
                    <span className="text-sm text-white">{p.day}: {p.version}</span>
                    <span className="text-xs text-violet-400">{p.platform}</span>
                  </div>
                ))}
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Remix Tips</h3>
                <ul className="space-y-2">{result.tips.map((t, i) => <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-violet-400">→</span>{t}</li>)}</ul>
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-zinc-400 mb-3">Related Tools</h3>
              <div className="flex flex-wrap gap-2 text-sm">
                <a href="/content-recycler" className="text-violet-400 hover:text-violet-300 underline">Content Recycler</a>
                <a href="/repurpose" className="text-violet-400 hover:text-violet-300 underline">Repurposer</a>
                <a href="/atomizer" className="text-violet-400 hover:text-violet-300 underline">Atomizer</a>
                <a href="/hooks" className="text-violet-400 hover:text-violet-300 underline">Hook Generator</a>
                <a href="/ab-testing" className="text-violet-400 hover:text-violet-300 underline">A/B Testing</a>
                <a href="/content-calendar" className="text-violet-400 hover:text-violet-300 underline">Calendar</a>
              </div>
            </div>
          </div>
        )}

        <footer className="mt-20 border-t border-zinc-800 pt-8 pb-12">
          <div className="grid md:grid-cols-4 gap-8 text-sm text-zinc-500">
            <div><h4 className="font-semibold text-white mb-3">Creation</h4><ul className="space-y-1"><li><a href="/" className="hover:text-white transition">Posts</a></li><li><a href="/content-remix" className="hover:text-white transition">Remix Engine</a></li><li><a href="/carousel-generator" className="hover:text-white transition">Carousel</a></li><li><a href="/hooks" className="hover:text-white transition">Hooks</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Multiply</h4><ul className="space-y-1"><li><a href="/atomizer" className="hover:text-white transition">Atomizer</a></li><li><a href="/repurpose" className="hover:text-white transition">Repurpose</a></li><li><a href="/content-recycler" className="hover:text-white transition">Recycler</a></li><li><a href="/threads" className="hover:text-white transition">Threads</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Analyze</h4><ul className="space-y-1"><li><a href="/content-scorecard" className="hover:text-white transition">Score Card</a></li><li><a href="/virality-score" className="hover:text-white transition">Virality</a></li><li><a href="/ab-testing" className="hover:text-white transition">A/B Testing</a></li><li><a href="/engagement-calculator" className="hover:text-white transition">Engagement</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Strategy</h4><ul className="space-y-1"><li><a href="/content-calendar" className="hover:text-white transition">Calendar</a></li><li><a href="/brand-voice" className="hover:text-white transition">Brand Voice</a></li><li><a href="/campaign" className="hover:text-white transition">Campaign</a></li><li><a href="/persona-builder" className="hover:text-white transition">Persona</a></li></ul></div>
          </div>
          <p className="text-center text-zinc-600 text-xs mt-8">© 2026 PostCraft AI. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
