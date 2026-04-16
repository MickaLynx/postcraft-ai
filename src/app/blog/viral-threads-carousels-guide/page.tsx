import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to Create Viral Threads & Carousels in 2026 — PostCraft AI Blog',
  description: 'Master Twitter/X threads and LinkedIn carousels. 5 formats, proven structures, real examples, and data-backed strategies to grow your audience with long-form social content.',
  openGraph: {
    title: 'How to Create Viral Threads & Carousels in 2026',
    description: '5 thread/carousel formats that go viral. Real examples + growth strategies for Twitter/X, LinkedIn, and Instagram.',
    type: 'article',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'How to Create Viral Threads & Carousels in 2026',
  description: 'Master Twitter/X threads and LinkedIn carousels. 5 formats, proven structures, and data-backed strategies.',
  author: { '@type': 'Organization', name: 'PostCraft AI' },
  publisher: { '@type': 'Organization', name: 'PostCraft AI' },
  datePublished: '2026-04-16',
  dateModified: '2026-04-16',
};

export default function ViralThreadsGuide() {
  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="px-6 py-20 max-w-3xl mx-auto">
        <p className="text-pink-400 text-sm font-semibold mb-3">GROWTH STRATEGY</p>
        <h1 className="text-4xl font-bold mb-4">How to Create Viral Threads & Carousels in 2026</h1>
        <p className="text-zinc-500 text-sm mb-8">14 min read &middot; April 2026 &middot; By PostCraft AI Team</p>

        <div className="space-y-6 text-zinc-300 leading-relaxed">
          <p className="text-lg">Single posts are losing the algorithm war. In 2026, threads get 3x the impressions of standalone tweets, LinkedIn carousels are saved 10x more than text posts, and Instagram carousel posts have the highest engagement rate of any format. If you&apos;re not creating long-form social content, you&apos;re leaving massive growth on the table.</p>

          <div className="glass rounded-xl p-5 my-8">
            <p className="text-sm text-zinc-400"><strong className="text-zinc-200">TL;DR:</strong> Threads and carousels outperform single posts on every metric. This guide covers 5 formats, the anatomy of viral threads, platform-specific strategies, and how to create a week of long-form content in under 30 minutes.</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-12">Why Long-Form Social Content Wins in 2026</h2>
          <p>The social media algorithms have evolved. They no longer reward volume — they reward <strong>dwell time</strong>. A user spending 45 seconds reading your thread signals way more engagement than a 2-second scroll past a single post.</p>
          <p>Here&apos;s the data:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Twitter/X threads:</strong> 3x impressions, 2.5x profile visits vs single tweets</li>
            <li><strong>LinkedIn carousels:</strong> 10x saves, 3x comments vs text posts</li>
            <li><strong>Instagram carousels:</strong> 1.4x reach, 3.1x engagement rate vs single images</li>
            <li><strong>Thread creators</strong> grow followers 5x faster than single-post creators</li>
          </ul>
          <p>The reason is simple: each piece of a thread is a new entry point for the algorithm. A 10-tweet thread gives the algorithm 10 chances to surface your content. A single post gives it one.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-12">The 5 Thread Formats That Go Viral</h2>

          <h3 className="text-xl font-semibold text-zinc-200 mt-8">1. The Twitter/X Thread (5-10 Tweets)</h3>
          <p>The classic format. Hook tweet at the top, value tweets in the middle, CTA at the bottom. Each tweet should stand alone but build on the previous one.</p>
          <div className="glass rounded-xl p-5 my-4">
            <p className="text-sm text-zinc-400"><strong className="text-zinc-200">Structure:</strong></p>
            <ul className="text-sm text-zinc-400 list-disc pl-5 mt-2 space-y-1">
              <li>Tweet 1: Hook — bold claim, surprising stat, or question</li>
              <li>Tweets 2-4: Core value — lessons, tips, or framework</li>
              <li>Tweet 5-8: Examples, data, proof points</li>
              <li>Tweet 9: Summary/synthesis</li>
              <li>Tweet 10: CTA — follow, retweet, or link</li>
            </ul>
          </div>
          <p><strong>Pro tip:</strong> The hook tweet should be the kind of thing you&apos;d screenshot and share. If it doesn&apos;t stop YOUR scroll, it won&apos;t stop theirs.</p>

          <h3 className="text-xl font-semibold text-zinc-200 mt-8">2. The LinkedIn Carousel (8-12 Slides)</h3>
          <p>LinkedIn carousels are PDF documents uploaded as posts. Each &quot;slide&quot; is a page with a bold headline and supporting text. They&apos;re the highest-saved format on LinkedIn because users bookmark them as reference material.</p>
          <div className="glass rounded-xl p-5 my-4">
            <p className="text-sm text-zinc-400"><strong className="text-zinc-200">Structure:</strong></p>
            <ul className="text-sm text-zinc-400 list-disc pl-5 mt-2 space-y-1">
              <li>Slide 1: Cover — bold title + your name/brand</li>
              <li>Slide 2: The problem or question</li>
              <li>Slides 3-9: One key point per slide (headline + 1-2 sentences)</li>
              <li>Slide 10: Summary of all points</li>
              <li>Slide 11: CTA — follow, share, comment</li>
            </ul>
          </div>
          <p><strong>Pro tip:</strong> Use contrasting colors for headlines. The swipe gesture is addictive — once someone starts swiping, they rarely stop before the last slide.</p>

          <h3 className="text-xl font-semibold text-zinc-200 mt-8">3. The LinkedIn Post + Comments</h3>
          <p>A underrated format: write a main post with a compelling hook (first 2 lines visible before &quot;see more&quot;), then add 3 follow-up comments with additional depth, resources, or examples. This hacks the algorithm because comments boost your post&apos;s visibility.</p>

          <h3 className="text-xl font-semibold text-zinc-200 mt-8">4. The Twitter/X Essay Thread (10-15 Tweets)</h3>
          <p>The deep-dive format. This is where you establish thought leadership. Pick one topic and go deeper than anyone else. Include data, examples, case studies, and counterarguments. This format attracts high-quality followers who want substance.</p>

          <h3 className="text-xl font-semibold text-zinc-200 mt-8">5. The Instagram Carousel (7-10 Slides)</h3>
          <p>Similar to LinkedIn carousels but optimized for visual impact. The cover slide MUST stop the scroll — it competes with Reels and stories in the feed. Text-heavy carousels outperform image-only carousels on Instagram in 2026.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-12">The Anatomy of a Viral Hook Tweet</h2>
          <p>Your hook determines whether your thread gets 100 views or 100,000. Here are the 6 hook formulas that consistently go viral:</p>
          <div className="space-y-3 my-6">
            {[
              ['The Bold Claim', '"X is dead. Here\'s what\'s replacing it."', 'Creates controversy → engagement → reach'],
              ['The Surprising Stat', '"93% of LinkedIn posts get zero engagement. Here\'s what the top 7% do differently."', 'Data creates credibility + curiosity gap'],
              ['The Promise', '"I grew from 0 to 50K followers in 90 days. Here\'s the exact playbook (no paid ads):"', 'Specific result + accessible method'],
              ['The Question', '"What if everything you know about [topic] is wrong?"', 'Forces mental engagement — can\'t scroll past unanswered questions'],
              ['The Story', '"Last month I almost quit. Then this happened:"', 'Storytelling is neurologically irresistible'],
              ['The Contrarian', '"Everyone says X. But after [experience], I\'m convinced the opposite is true."', 'Contrarian takes trigger the "prove it" reflex'],
            ].map(([type, example, why]) => (
              <div key={type} className="glass rounded-xl p-4">
                <p className="text-zinc-200 font-semibold text-sm">{type}</p>
                <p className="text-zinc-400 text-sm italic mt-1">{example}</p>
                <p className="text-zinc-500 text-xs mt-2">{why}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-12">Platform-Specific Thread Strategies</h2>

          <h3 className="text-xl font-semibold text-zinc-200 mt-8">Twitter/X</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Post threads between 8-11 AM EST for max reach</li>
            <li>Reply to your own thread within 30 minutes with a &quot;bump&quot; (additional insight or question)</li>
            <li>Quote-tweet your hook tweet 4-6 hours later for a second wave</li>
            <li>Use line breaks liberally — white space is your friend on Twitter</li>
          </ul>

          <h3 className="text-xl font-semibold text-zinc-200 mt-8">LinkedIn</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>The first 2 lines must earn the &quot;see more&quot; click — this is your hook</li>
            <li>Reply to every comment in the first 2 hours (signals engagement to algorithm)</li>
            <li>Carousels posted Tuesday-Thursday 7-9 AM local time perform best</li>
            <li>Ask a question at the end — comment count is the strongest signal on LinkedIn</li>
          </ul>

          <h3 className="text-xl font-semibold text-zinc-200 mt-8">Instagram</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Cover slide must be visually striking — it competes with Reels</li>
            <li>Include &quot;Swipe &rarr;&quot; text on the first slide</li>
            <li>Last slide: &quot;Save this for later&quot; + &quot;Share with someone who needs this&quot;</li>
            <li>Use hashtags in the first comment, not the caption</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-12">Create a Week of Threads in 30 Minutes</h2>
          <p>Here&apos;s the workflow that top creators use:</p>
          <ol className="list-decimal pl-6 space-y-3">
            <li><strong>Batch your topics</strong> — Pick 5-7 topics from your expertise area</li>
            <li><strong>Use AI for first drafts</strong> — Tools like <a href="/threads" className="text-pink-400 hover:text-pink-300 underline">PostCraft&apos;s Thread Generator</a> create complete threads in seconds</li>
            <li><strong>Edit for voice</strong> — Spend 5 minutes per thread adding your personal touch, examples, and data</li>
            <li><strong>Schedule strategically</strong> — Space threads 1-2 days apart. Don&apos;t post threads back-to-back</li>
            <li><strong>Cross-platform adapt</strong> — A Twitter thread can become a LinkedIn carousel can become an IG carousel. Same content, different formats</li>
          </ol>

          <h2 className="text-2xl font-bold text-zinc-100 mt-12">The Thread-to-Content Flywheel</h2>
          <p>The most efficient content creators use threads as their content engine:</p>
          <div className="glass rounded-xl p-5 my-6">
            <p className="text-sm text-zinc-400">
              <strong className="text-zinc-200">Thread</strong> (Twitter/X) &rarr; <strong className="text-zinc-200">Carousel</strong> (LinkedIn) &rarr; <strong className="text-zinc-200">Blog Post</strong> (SEO) &rarr; <strong className="text-zinc-200">Video Script</strong> (TikTok/Reels) &rarr; <strong className="text-zinc-200">Newsletter</strong> (email) &rarr; back to <strong className="text-zinc-200">Thread</strong> (new angle)
            </p>
          </div>
          <p>One idea, 5+ formats. This is content atomization applied to threads — and it&apos;s how you create a week of content from a single brainstorm session.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-12">Common Thread Mistakes to Avoid</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Weak hook:</strong> If your first tweet/slide doesn&apos;t stop the scroll, the rest doesn&apos;t matter</li>
            <li><strong>No CTA:</strong> Always end with a clear ask — follow, share, save, comment</li>
            <li><strong>Too generic:</strong> &quot;10 tips for success&quot; doesn&apos;t work. &quot;10 things I learned losing $50K on my first startup&quot; does</li>
            <li><strong>Wall of text:</strong> Each tweet/slide should be scannable. Use line breaks, bold, and numbers</li>
            <li><strong>Not self-contained:</strong> Each piece should deliver value on its own, not just tease the next one</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-12">Start Creating Viral Threads Now</h2>
          <p>The best time to start was yesterday. The second best time is now. Use <a href="/threads" className="text-pink-400 hover:text-pink-300 underline">PostCraft&apos;s Thread Generator</a> to create your first thread in under 30 seconds — then edit, personalize, and post.</p>
          <p>Pair your threads with optimized <a href="/hashtags" className="text-pink-400 hover:text-pink-300 underline">hashtags</a> and scroll-stopping <a href="/hooks" className="text-pink-400 hover:text-pink-300 underline">hooks</a> for maximum reach.</p>

          <div className="glass rounded-xl p-6 my-8 text-center">
            <p className="text-zinc-200 font-semibold mb-3">Ready to go viral?</p>
            <a href="/threads" className="inline-block px-8 py-3 btn-primary rounded-xl font-semibold text-white">
              Generate Your First Thread Free
            </a>
          </div>
        </div>

        {/* Related Posts */}
        <div className="mt-16 pt-8 border-t border-zinc-800/50">
          <h3 className="font-semibold mb-4">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <a href="/blog/scroll-stopping-hooks-guide" className="glass rounded-xl p-4 hover:border-pink-500/30 transition">
              <p className="font-semibold text-sm">The Ultimate Guide to Scroll-Stopping Hooks</p>
              <p className="text-xs text-zinc-500 mt-1">7 hook styles that stop the scroll</p>
            </a>
            <a href="/blog/twitter-thread-strategy" className="glass rounded-xl p-4 hover:border-pink-500/30 transition">
              <p className="font-semibold text-sm">Twitter Thread Strategy for 2026</p>
              <p className="text-xs text-zinc-500 mt-1">Advanced tactics for viral threads</p>
            </a>
            <a href="/blog/content-atomization-strategy" className="glass rounded-xl p-4 hover:border-pink-500/30 transition">
              <p className="font-semibold text-sm">Content Atomization Strategy</p>
              <p className="text-xs text-zinc-500 mt-1">One piece, 15+ social posts</p>
            </a>
            <a href="/blog/linkedin-posts-that-convert" className="glass rounded-xl p-4 hover:border-pink-500/30 transition">
              <p className="font-semibold text-sm">LinkedIn Posts That Convert</p>
              <p className="text-xs text-zinc-500 mt-1">Turn impressions into leads</p>
            </a>
          </div>
        </div>
      </article>

      <footer className="px-6 py-8 border-t border-zinc-800/50 text-center text-xs text-zinc-600">
        <p>&copy; {new Date().getFullYear()} PostCraft AI. All rights reserved.</p>
      </footer>
    </main>
  );
}
