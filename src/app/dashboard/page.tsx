'use client';
import { useState } from 'react';

const platforms = ['Twitter/X', 'LinkedIn', 'Instagram', 'TikTok', 'Facebook'] as const;
const tones = ['professional', 'casual', 'funny', 'provocative', 'inspiring'] as const;

interface HistoryEntry {
  id: string;
  topic: string;
  platform: string;
  tone: string;
  posts: string[];
  createdAt: string;
}

export default function DashboardPage() {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState<string>('Twitter/X');
  const [tone, setTone] = useState<string>('professional');
  const [count, setCount] = useState(5);
  const [posts, setPosts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [tab, setTab] = useState<'generate' | 'history'>('generate');
  const [copied, setCopied] = useState<number | null>(null);

  async function generate() {
    setLoading(true);
    try {
      const r = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, platform, tone, count }),
      });
      const data = await r.json();
      const newPosts = data.posts || [];
      setPosts(newPosts);
      if (newPosts.length > 0) {
        setHistory(prev => [{
          id: Date.now().toString(),
          topic, platform, tone, posts: newPosts,
          createdAt: new Date().toISOString(),
        }, ...prev].slice(0, 50));
      }
    } catch {
      setPosts(['Error generating posts.']);
    }
    setLoading(false);
  }

  function copy(text: string, idx: number) {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  }

  function copyAll() {
    navigator.clipboard.writeText(posts.join('\n\n---\n\n'));
    setCopied(-1);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <main className="min-h-screen px-6 py-10 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <button onClick={() => setTab('generate')}
            className={`px-4 py-2 rounded-lg text-sm ${tab === 'generate' ? 'bg-pink-600' : 'bg-zinc-800'}`}>Generator</button>
          <button onClick={() => setTab('history')}
            className={`px-4 py-2 rounded-lg text-sm ${tab === 'history' ? 'bg-pink-600' : 'bg-zinc-800'}`}>History ({history.length})</button>
        </div>
      </div>

      {tab === 'generate' ? (
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Controls */}
          <div className="lg:col-span-2 glass rounded-2xl p-5 h-fit">
            <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Topic</label>
            <textarea value={topic} onChange={e => setTopic(e.target.value)}
              placeholder="Describe what you want to post about..."
              rows={4}
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-pink-500 transition resize-none mb-4" />

            <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Platform</label>
            <select value={platform} onChange={e => setPlatform(e.target.value)}
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm mb-4">
              {platforms.map(p => <option key={p} value={p}>{p}</option>)}
            </select>

            <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Tone</label>
            <select value={tone} onChange={e => setTone(e.target.value)}
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm mb-4">
              {tones.map(t => <option key={t} value={t} className="capitalize">{t}</option>)}
            </select>

            <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Number of posts</label>
            <input type="number" min={1} max={10} value={count} onChange={e => setCount(+e.target.value)}
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm mb-5" />

            <button onClick={generate} disabled={loading || !topic.trim()}
              className="w-full py-3 btn-primary rounded-xl font-semibold text-white">
              {loading ? 'Generating...' : `Generate ${count} Posts`}
            </button>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {posts.length > 0 && (
              <>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold">{posts.length} Posts Ready</h2>
                  <button onClick={copyAll} className="text-xs text-pink-400 hover:text-pink-300">
                    {copied === -1 ? 'All copied!' : 'Copy all'}
                  </button>
                </div>
                <div className="space-y-3">
                  {posts.map((p, i) => (
                    <div key={i} onClick={() => copy(p, i)}
                      className="glass rounded-xl p-4 cursor-pointer hover:border-pink-500/40 transition fade-in">
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">{p}</p>
                      <div className="flex items-center justify-between mt-2 text-xs text-zinc-500">
                        <span>{p.length} chars</span>
                        <span className={copied === i ? 'text-green-400' : ''}>{copied === i ? 'Copied!' : 'Click to copy'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            {posts.length === 0 && !loading && (
              <div className="glass rounded-2xl p-12 text-center text-zinc-500">
                <p className="text-4xl mb-3">&#9997;</p>
                <p>Configure your post and hit Generate</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {history.length === 0 ? (
            <div className="glass rounded-2xl p-12 text-center text-zinc-500">
              <p>No generation history yet. Start creating!</p>
            </div>
          ) : history.map(entry => (
            <div key={entry.id} className="glass rounded-xl p-5 fade-in">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs bg-pink-600/20 text-pink-400 px-2 py-0.5 rounded">{entry.platform}</span>
                <span className="text-xs bg-purple-600/20 text-purple-400 px-2 py-0.5 rounded">{entry.tone}</span>
                <span className="text-xs text-zinc-500 ml-auto">{new Date(entry.createdAt).toLocaleString()}</span>
              </div>
              <p className="text-sm font-medium mb-2">{entry.topic}</p>
              <p className="text-xs text-zinc-500">{entry.posts.length} posts generated</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
