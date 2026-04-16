import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Social SEO & Caption Optimization: The Complete 2026 Guide | PostCraft AI',
  description: 'Master social search optimization and cross-platform caption writing. Learn how to rank on TikTok, Instagram, YouTube Shorts, and Pinterest with keyword strategies and caption formulas.',
  keywords: ['social SEO', 'caption optimization', 'TikTok SEO', 'Instagram SEO', 'social search', 'caption writing', 'social media keywords'],
  openGraph: {
    title: 'Social SEO & Caption Optimization: The Complete 2026 Guide',
    description: 'Master social search and write captions that rank AND convert on every platform.',
    type: 'article',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Social SEO & Caption Optimization: The Complete 2026 Guide',
  description: 'Master social search optimization and cross-platform caption writing for TikTok, Instagram, YouTube Shorts, and Pinterest.',
  author: { '@type': 'Organization', name: 'PostCraft AI' },
  publisher: { '@type': 'Organization', name: 'PostCraft AI' },
  datePublished: '2026-04-16',
  dateModified: '2026-04-16',
  mainEntityOfPage: 'https://postcraft.ai/blog/social-seo-caption-optimization-guide',
  wordCount: 3200,
};

export default function BlogPost() {
  return (
    <main className="min-h-screen px-6 py-20 max-w-3xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <p className="text-xs text-pink-400 uppercase tracking-widest mb-3">Blog — 20 min read</p>
      <h1 className="text-4xl font-bold mb-4">Social SEO & Caption Optimization: The Complete 2026 Guide</h1>
      <p className="text-zinc-500 text-sm mb-8">Published April 16, 2026 • Updated April 16, 2026</p>

      <div className="prose-custom space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-3">1. The Rise of Social Search</h2>
          <p className="text-sm text-zinc-400 mb-3">In 2026, social platforms are search engines. Google confirmed that 40% of Gen Z uses TikTok or Instagram as their primary search tool. Pinterest processes 5 billion searches monthly. YouTube Shorts search queries grew 38% year-over-year.</p>
          <p className="text-sm text-zinc-400 mb-3">This shift created a new discipline: <strong className="text-zinc-200">Social SEO</strong> — optimizing content to rank in platform-native search results rather than Google.</p>
          <p className="text-sm text-zinc-400">The opportunity is massive because most creators still optimize for feeds and algorithms, not search. Those who master social SEO get compounding organic discovery — content that surfaces months after posting.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">2. How Social Search Algorithms Work</h2>
          <p className="text-sm text-zinc-400 mb-3">Each platform indexes different signals:</p>
          <div className="glass rounded-xl p-4 space-y-3 text-sm">
            <p className="text-zinc-300"><strong>TikTok:</strong> Caption text, text overlay, spoken words (auto-transcribed), hashtags, sounds, user engagement patterns. Watch time is the primary ranking factor.</p>
            <p className="text-zinc-300"><strong>Instagram:</strong> Caption keywords, alt text, hashtag relevance, profile bio keywords, saves (strongest signal), and shares.</p>
            <p className="text-zinc-300"><strong>YouTube Shorts:</strong> Title, description, subtitles (auto-generated), tags, CTR from search results, and retention percentage.</p>
            <p className="text-zinc-300"><strong>Pinterest:</strong> Pin description, board title, board description, image text overlay, and engagement velocity.</p>
            <p className="text-zinc-300"><strong>LinkedIn:</strong> Post text (first 2 lines heavily weighted), dwell time, comments, and keyword density in posts and articles.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">3. Finding Social SEO Keywords</h2>
          <p className="text-sm text-zinc-400 mb-3">Traditional keyword tools (Ahrefs, SEMrush) don&apos;t track social search volume. You need platform-specific methods:</p>
          <div className="space-y-2 text-sm text-zinc-400">
            <p><strong className="text-zinc-200">TikTok Search Bar:</strong> Type your topic and note autocomplete suggestions. These represent real search queries with volume.</p>
            <p><strong className="text-zinc-200">Pinterest Trends:</strong> Free tool showing search trends by category, season, and region.</p>
            <p><strong className="text-zinc-200">YouTube Search Suggest:</strong> Works like Google suggest but for video content queries.</p>
            <p><strong className="text-zinc-200">Instagram Explore Search:</strong> Type keywords and note &quot;Top&quot; results — these show what the algorithm considers relevant.</p>
            <p><strong className="text-zinc-200">PostCraft&apos;s Social SEO Analyzer:</strong> Our <a href="/social-seo" className="text-cyan-400 hover:underline">Social SEO Keyword Analyzer</a> generates 15 long-tail keywords with search volume estimates, difficulty scores, and recommended content formats for each platform.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">4. The Keyword Placement Framework</h2>
          <p className="text-sm text-zinc-400 mb-3">Once you have your keywords, place them in every indexable location:</p>
          <div className="glass rounded-xl p-4 text-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-500 text-xs uppercase">
                  <th className="text-left py-2">Platform</th>
                  <th className="text-left py-2">Where to Place Keywords</th>
                </tr>
              </thead>
              <tbody className="text-zinc-400">
                <tr className="border-b border-zinc-800/50"><td className="py-2">TikTok</td><td className="py-2">Caption, text overlay, spoken words, hashtags, sound name</td></tr>
                <tr className="border-b border-zinc-800/50"><td className="py-2">Instagram</td><td className="py-2">Caption (first line), alt text, hashtags, location tag, bio</td></tr>
                <tr className="border-b border-zinc-800/50"><td className="py-2">YouTube Shorts</td><td className="py-2">Title, description, subtitles, tags, channel name</td></tr>
                <tr className="border-b border-zinc-800/50"><td className="py-2">Pinterest</td><td className="py-2">Pin description, board title, board description, image text, profile</td></tr>
                <tr className="border-b border-zinc-800/50"><td className="py-2">LinkedIn</td><td className="py-2">First 2 lines, body text, headline, experience descriptions</td></tr>
                <tr><td className="py-2">Twitter/X</td><td className="py-2">Tweet text, thread title, profile bio, list names</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">5. Caption Optimization: The 8-Point Framework</h2>
          <p className="text-sm text-zinc-400 mb-3">A perfect caption scores high on 8 dimensions. Here&apos;s what our <a href="/caption-optimizer" className="text-purple-400 hover:underline">Caption Optimizer</a> analyzes:</p>
          <div className="space-y-3">
            {[
              ['Hook Strength', 'The first 1-2 lines determine if someone reads or scrolls. Questions, bold claims, "POV:" statements, and specific numbers work best.'],
              ['CTA Presence', 'Every caption needs a call-to-action aligned with your goal. "Save this for later" (saves), "Drop a fire emoji if you agree" (comments), "Link in bio" (traffic).'],
              ['Character Optimization', 'Each platform has sweet spots. Twitter/X: 71-100 chars. LinkedIn: 1300-2000. Instagram: 138-150 OR 2000+. TikTok: 100-300.'],
              ['Hashtag Strategy', 'Quality over quantity in 2026. Use 3-5 highly relevant hashtags that match actual search terms.'],
              ['Emoji Density', '1-3 strategic emojis boost engagement 15-25%. 8+ emojis hurt credibility.'],
              ['Readability', 'Short sentences (15-20 words), line breaks between ideas, and simple vocabulary.'],
              ['Tone Alignment', 'Professional on LinkedIn, casual on TikTok, inspirational on Instagram. Mismatched tone costs engagement.'],
              ['Platform-Specific Formatting', 'LinkedIn: line breaks. Instagram: front-load value. TikTok: match caption energy to video.'],
            ].map(([title, desc], i) => (
              <div key={i} className="glass rounded-xl p-4">
                <h3 className="font-semibold text-sm mb-1">{i + 1}. {title}</h3>
                <p className="text-sm text-zinc-400">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">6. Platform-Specific Caption Formulas</h2>
          <div className="space-y-4">
            <div className="glass rounded-xl p-4">
              <h3 className="font-semibold text-sm mb-2">Twitter/X Formula (280 chars)</h3>
              <p className="text-sm text-zinc-400 mb-2">Hook (bold claim or question) + Value (1 key insight) + CTA (reply/retweet prompt)</p>
              <p className="text-sm text-zinc-500 italic">&quot;90% of social media managers waste 4 hours/week writing captions nobody reads. The fix? A 3-step framework that takes 10 minutes. Thread below.&quot;</p>
            </div>
            <div className="glass rounded-xl p-4">
              <h3 className="font-semibold text-sm mb-2">LinkedIn Formula (1500+ chars)</h3>
              <p className="text-sm text-zinc-400 mb-2">Hook (personal story or contrarian take) + Context (3-5 paragraphs) + Framework (numbered list) + CTA (question)</p>
              <p className="text-sm text-zinc-500 italic">&quot;I spent $50,000 on social media ads last year. The ROI? Negative. Then I discovered social SEO...&quot;</p>
            </div>
            <div className="glass rounded-xl p-4">
              <h3 className="font-semibold text-sm mb-2">Instagram Formula (2000+ chars for Reels)</h3>
              <p className="text-sm text-zinc-400 mb-2">Hook (first line before fold) + Value dump (tips/steps) + Hashtags (5-10) + CTA (save/share)</p>
              <p className="text-sm text-zinc-500 italic">&quot;The algorithm changed again. Here&apos;s what&apos;s working in April 2026... [5 tips] Save this before it gets buried.&quot;</p>
            </div>
            <div className="glass rounded-xl p-4">
              <h3 className="font-semibold text-sm mb-2">TikTok Formula (100-300 chars)</h3>
              <p className="text-sm text-zinc-400 mb-2">Keyword-rich hook + Context (match video energy) + 3-5 hashtags</p>
              <p className="text-sm text-zinc-500 italic">&quot;social media tips that actually work in 2026 — most people skip #3 #socialmediatips #tiktoktips #contentcreator&quot;</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">7. Content Clusters for Social SEO</h2>
          <p className="text-sm text-zinc-400 mb-3">Like web SEO, social SEO benefits from topic clustering. Create a pillar piece and 5-10 supporting pieces:</p>
          <div className="glass rounded-xl p-4 text-sm text-zinc-400">
            <p className="mb-2"><strong className="text-zinc-200">Pillar:</strong> &quot;Complete guide to meal prep for beginners&quot; (high-volume)</p>
            <p className="mb-2"><strong className="text-zinc-200">Supporting:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>&quot;Meal prep containers — which size?&quot;</li>
              <li>&quot;5 meal prep mistakes beginners make&quot;</li>
              <li>&quot;Meal prep for weight loss — weekly plan&quot;</li>
              <li>&quot;How long does meal prep last in the fridge?&quot;</li>
              <li>&quot;Meal prep on a budget — under $30/week&quot;</li>
            </ul>
            <p className="mt-3">Cross-link in captions. TikTok: &quot;Part 3 of my meal prep series.&quot; Instagram: carousel slides. Pinterest: dedicated board.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">8. Measuring Social SEO Performance</h2>
          <div className="glass rounded-xl p-4 text-sm text-zinc-400 space-y-2">
            <p><strong className="text-zinc-200">Search impressions:</strong> Available in TikTok and Pinterest Analytics. How often your content appeared in search.</p>
            <p><strong className="text-zinc-200">Save rate:</strong> Strongest ranking signal on Instagram and TikTok. Aim for 3%+.</p>
            <p><strong className="text-zinc-200">Content shelf life:</strong> SEO-optimized content should get views 30-90 days after posting.</p>
            <p><strong className="text-zinc-200">Keyword position:</strong> Search your target keywords weekly. Use our <a href="/social-seo" className="text-cyan-400 hover:underline">Social SEO Analyzer</a> for new opportunities.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">9. A/B Testing Captions</h2>
          <p className="text-sm text-zinc-400 mb-3">Our <a href="/caption-optimizer" className="text-purple-400 hover:underline">Caption Optimizer</a> generates A/B variants automatically. Manual testing rules:</p>
          <div className="space-y-2 text-sm text-zinc-400">
            <p><strong className="text-zinc-200">Test one variable at a time:</strong> Hook, CTA, emojis, or hashtags.</p>
            <p><strong className="text-zinc-200">Sample size:</strong> 1,000+ impressions per variant for significance.</p>
            <p><strong className="text-zinc-200">Measure the right metric:</strong> Hooks → CTR. CTAs → conversion. Hashtags → reach.</p>
            <p><strong className="text-zinc-200">Document winners:</strong> Build a swipe file of best-performing formulas.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">10. Common Social SEO Mistakes</h2>
          <div className="space-y-2 text-sm text-zinc-400">
            <p>- <strong className="text-zinc-200">Copy-pasting captions across platforms.</strong> Each platform needs different length, formatting, and hashtags.</p>
            <p>- <strong className="text-zinc-200">Using generic hashtags (#fyp, #viral).</strong> These don&apos;t help search. Use specific, keyword-rich tags.</p>
            <p>- <strong className="text-zinc-200">Ignoring text overlays.</strong> TikTok and YouTube Shorts index on-screen text.</p>
            <p>- <strong className="text-zinc-200">Not adding alt text on Instagram.</strong> Alt text is indexed for search.</p>
            <p>- <strong className="text-zinc-200">Publishing inconsistently.</strong> 3-5 posts/week builds topic authority.</p>
            <p>- <strong className="text-zinc-200">Skipping the hook.</strong> Without it, people find your content but scroll past.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">11. 30-Day Action Plan</h2>
          <div className="glass rounded-xl p-4 text-sm text-zinc-400 space-y-2">
            <p><strong className="text-zinc-200">Week 1:</strong> Audit content. Use <a href="/social-seo" className="text-cyan-400 hover:underline">Social SEO Analyzer</a> for top 5 keywords. Optimize bio.</p>
            <p><strong className="text-zinc-200">Week 2:</strong> Create content cluster — 1 pillar + 5 supporting. Optimize captions with <a href="/caption-optimizer" className="text-purple-400 hover:underline">Caption Optimizer</a>.</p>
            <p><strong className="text-zinc-200">Week 3:</strong> Publish daily. Test 2 hook styles. Track search impressions.</p>
            <p><strong className="text-zinc-200">Week 4:</strong> Analyze. Double down on winning keywords. Repurpose with <a href="/repurpose" className="text-pink-400 hover:underline">Content Repurposer</a>.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">12. The Future of Social Search</h2>
          <p className="text-sm text-zinc-400 mb-3">AI-powered search on TikTok and Instagram is becoming more sophisticated — understanding intent, not just keywords. Voice search on social platforms is emerging.</p>
          <p className="text-sm text-zinc-400">Creators who invest in social SEO now build compounding organic reach. Start free: <a href="/social-seo" className="text-cyan-400 hover:underline">Social SEO Keyword Analyzer</a> and <a href="/caption-optimizer" className="text-purple-400 hover:underline">Caption Optimizer</a>.</p>
        </section>
      </div>

      {/* Related Tools */}
      <section className="mt-12 glass rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-4">Tools Mentioned in This Article</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            ['/social-seo', 'Social SEO Analyzer', 'Find ranking keywords'],
            ['/caption-optimizer', 'Caption Optimizer', 'Score your captions'],
            ['/hashtags', 'Hashtag Generator', 'Optimized tag sets'],
            ['/hooks', 'Hook Generator', '10 scroll-stopping hooks'],
            ['/repurpose', 'Content Repurposer', 'Cross-platform adaptation'],
            ['/post-timing', 'Post Timing', 'Best times to post'],
          ].map(([href, title, desc]) => (
            <a key={href} href={href} className="glass rounded-xl p-3 hover:border-pink-500/30 transition">
              <p className="font-semibold text-xs">{title}</p>
              <p className="text-xs text-zinc-500 mt-1">{desc}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-8 glass rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-4">More Articles</h2>
        <div className="space-y-2">
          {[
            ['/blog/social-media-roi-posting-times-guide', 'Social Media ROI & Posting Times Guide'],
            ['/blog/content-repurposing-persona-builder-guide', 'Content Repurposing & Persona Builder Guide'],
            ['/blog/competitor-analysis-content-ideas-guide', 'Competitor Analysis & Content Ideas Guide'],
          ].map(([href, title]) => (
            <a key={href} href={href} className="block text-sm text-zinc-400 hover:text-white transition">→ {title}</a>
          ))}
        </div>
      </section>
    </main>
  );
}
