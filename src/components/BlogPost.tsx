import type { Metadata } from 'next';

interface BlogMeta {
  title: string;
  date: string;
  readTime: string;
  tags: string[];
}

export function blogMetadata(title: string, description: string): Metadata {
  return {
    title: `${title} — PostCraft AI Blog`,
    description,
  };
}

export default function BlogPost({ meta, children }: { meta: BlogMeta; children: React.ReactNode }) {
  return (
    <main className="min-h-screen px-6 py-20 max-w-3xl mx-auto">
      <a href="/blog" className="text-sm text-zinc-500 hover:text-zinc-300 transition mb-6 inline-block">&larr; Back to Blog</a>

      <article>
        <div className="flex items-center gap-3 mb-4">
          <time className="text-xs text-zinc-500">{meta.date}</time>
          <span className="text-xs text-zinc-600">|</span>
          <span className="text-xs text-zinc-500">{meta.readTime}</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">{meta.title}</h1>
        <div className="flex flex-wrap gap-2 mb-8">
          {meta.tags.map(tag => (
            <span key={tag} className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded">{tag}</span>
          ))}
        </div>
        <div className="prose prose-invert prose-zinc max-w-none text-sm leading-relaxed space-y-4">
          {children}
        </div>
      </article>

      {/* CTA */}
      <div className="mt-12 glass rounded-2xl p-6 text-center">
        <h2 className="text-lg font-bold mb-2">Ready to create content like this?</h2>
        <p className="text-sm text-zinc-400 mb-4">PostCraft AI generates platform-optimized posts in seconds.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href="/" className="px-6 py-2.5 btn-primary rounded-xl font-semibold text-white text-sm">Try Free Generator</a>
          <a href="/campaign" className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 rounded-xl font-semibold text-zinc-300 text-sm transition">Campaign Mode</a>
        </div>
      </div>

      {/* Related */}
      <div className="mt-8 glass rounded-xl p-4">
        <h3 className="text-sm font-semibold mb-3">Platform Generators</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <a href="/instagram-captions" className="text-xs text-center p-2 bg-zinc-800/50 rounded-lg hover:bg-zinc-700/50 transition">Instagram</a>
          <a href="/linkedin-posts" className="text-xs text-center p-2 bg-zinc-800/50 rounded-lg hover:bg-zinc-700/50 transition">LinkedIn</a>
          <a href="/twitter-posts" className="text-xs text-center p-2 bg-zinc-800/50 rounded-lg hover:bg-zinc-700/50 transition">Twitter/X</a>
          <a href="/tiktok-scripts" className="text-xs text-center p-2 bg-zinc-800/50 rounded-lg hover:bg-zinc-700/50 transition">TikTok</a>
        </div>
      </div>
    </main>
  );
}
