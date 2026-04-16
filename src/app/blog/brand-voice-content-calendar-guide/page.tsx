import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to Build a Brand Voice + Content Calendar That Scales (2026 Guide)',
  description: 'Define your brand voice with proven archetypes, then plan a week of content in minutes. AI-powered brand voice generator and content calendar for Twitter, LinkedIn, Instagram, TikTok.',
  keywords: ['brand voice', 'brand voice generator', 'content calendar', 'social media calendar', 'brand personality', 'content planning', 'brand archetype'],
  openGraph: {
    title: 'How to Build a Brand Voice + Content Calendar That Scales',
    description: 'The complete guide to defining your brand personality and planning content that converts.',
    type: 'article',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'How to Build a Brand Voice + Content Calendar That Scales (2026 Guide)',
  description: 'Define your brand voice with proven archetypes, then plan a week of content in minutes with AI.',
  datePublished: '2026-04-16',
  dateModified: '2026-04-16',
  author: { '@type': 'Organization', name: 'PostCraft AI' },
  publisher: { '@type': 'Organization', name: 'PostCraft AI' },
};

export default function BrandVoiceCalendarGuidePage() {
  return (
    <main className="min-h-screen px-6 py-20 max-w-3xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <p className="text-xs text-amber-400 uppercase tracking-widest mb-3 font-semibold">Guide — 18 min read</p>
      <h1 className="text-4xl font-bold mb-4">How to Build a Brand Voice + Content Calendar That Scales (2026 Guide)</h1>
      <p className="text-zinc-400 mb-8">Your brand voice is the invisible thread that connects every post, email, and ad. Your content calendar is the engine that keeps it running. Master both, and you have a social media machine that scales without losing authenticity.</p>

      <nav className="glass rounded-xl p-5 mb-12">
        <p className="text-xs text-zinc-500 uppercase tracking-wider mb-3">Table of Contents</p>
        <ol className="space-y-1 text-sm text-zinc-400">
          <li><a href="#why-voice-matters" className="hover:text-white transition">1. Why Brand Voice Is Your Competitive Moat</a></li>
          <li><a href="#six-archetypes" className="hover:text-white transition">2. The 6 Brand Archetypes (With Real Examples)</a></li>
          <li><a href="#voice-framework" className="hover:text-white transition">3. The 4-Part Brand Voice Framework</a></li>
          <li><a href="#voice-by-platform" className="hover:text-white transition">4. Adapting Your Voice Across Platforms</a></li>
          <li><a href="#calendar-basics" className="hover:text-white transition">5. Content Calendar Fundamentals</a></li>
          <li><a href="#content-mix" className="hover:text-white transition">6. The 40-20-20-20 Content Mix</a></li>
          <li><a href="#posting-times" className="hover:text-white transition">7. Best Posting Times by Platform (2026 Data)</a></li>
          <li><a href="#ai-tools" className="hover:text-white transition">8. Using AI to Build Both in Minutes</a></li>
          <li><a href="#mistakes" className="hover:text-white transition">9. 7 Mistakes That Kill Brand Consistency</a></li>
          <li><a href="#checklist" className="hover:text-white transition">10. Your Weekly Content Launch Checklist</a></li>
        </ol>
      </nav>

      {/* Section 1 */}
      <section id="why-voice-matters" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">1. Why Brand Voice Is Your Competitive Moat</h2>
        <p className="text-zinc-300 mb-4">In a sea of AI-generated content, voice is the only thing that cannot be copied. Tools can replicate your format, your hashtags, even your strategy — but they cannot replicate how you say things.</p>
        <p className="text-zinc-300 mb-4">Research shows that <strong>81% of consumers</strong> need to trust a brand before buying. Trust comes from consistency. And consistency starts with a defined voice.</p>
        <div className="glass rounded-xl p-5 my-6">
          <p className="text-sm text-zinc-400"><strong>The math is simple:</strong> Brands with consistent voice see 3.5x more engagement and 23% more revenue. That is not a nice-to-have — it is the difference between a brand that grows and one that plateaus.</p>
        </div>
        <p className="text-zinc-300 mb-4">The problem? Most brands define their voice vaguely. &ldquo;We are professional but friendly.&rdquo; That describes 90% of brands. Your voice needs to be specific enough that someone could identify your post without seeing your name.</p>
      </section>

      {/* Section 2 */}
      <section id="six-archetypes" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">2. The 6 Brand Archetypes (With Real Examples)</h2>
        <p className="text-zinc-300 mb-4">Instead of starting from scratch, start with an archetype. These are proven personality patterns that audiences already respond to:</p>

        <div className="space-y-4 my-6">
          <div className="glass rounded-xl p-5">
            <h3 className="font-semibold text-amber-400 mb-2">The Visionary</h3>
            <p className="text-sm text-zinc-400 mb-2">Apple, Tesla, SpaceX. Bold claims, future-focused language, inspiring calls to action.</p>
            <p className="text-sm text-zinc-500 italic">&ldquo;We did not just build a product. We built the future of how 10 million people will work.&rdquo;</p>
          </div>
          <div className="glass rounded-xl p-5">
            <h3 className="font-semibold text-blue-400 mb-2">The Mentor</h3>
            <p className="text-sm text-zinc-400 mb-2">HubSpot, Khan Academy, Notion. Helpful, educational, encouraging.</p>
            <p className="text-sm text-zinc-500 italic">&ldquo;Here are 5 things I wish someone told me before scaling to $1M ARR.&rdquo;</p>
          </div>
          <div className="glass rounded-xl p-5">
            <h3 className="font-semibold text-red-400 mb-2">The Rebel</h3>
            <p className="text-sm text-zinc-400 mb-2">Oatly, Liquid Death, Cards Against Humanity. Provocative and irreverent.</p>
            <p className="text-sm text-zinc-500 italic">&ldquo;Everyone in your industry is lying about their metrics. Here is why we publish ours.&rdquo;</p>
          </div>
          <div className="glass rounded-xl p-5">
            <h3 className="font-semibold text-green-400 mb-2">The Friend</h3>
            <p className="text-sm text-zinc-400 mb-2">Mailchimp, Slack, Innocent. Warm, casual, relatable.</p>
            <p className="text-sm text-zinc-500 italic">&ldquo;Monday emails do not have to feel like Monday emails.&rdquo;</p>
          </div>
          <div className="glass rounded-xl p-5">
            <h3 className="font-semibold text-purple-400 mb-2">The Expert</h3>
            <p className="text-sm text-zinc-400 mb-2">McKinsey, Bloomberg, Gartner. Data-driven, authoritative.</p>
            <p className="text-sm text-zinc-500 italic">&ldquo;Our analysis of 50,000 posts reveals the 3 metrics that actually predict virality.&rdquo;</p>
          </div>
          <div className="glass rounded-xl p-5">
            <h3 className="font-semibold text-pink-400 mb-2">The Entertainer</h3>
            <p className="text-sm text-zinc-400 mb-2">Wendy&apos;s, Netflix, Duolingo. Witty, fun, meme-friendly.</p>
            <p className="text-sm text-zinc-500 italic">&ldquo;We would explain our algorithm but honestly even we are surprised it works this well.&rdquo;</p>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section id="voice-framework" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">3. The 4-Part Brand Voice Framework</h2>
        <p className="text-zinc-300 mb-4">Once you pick your archetype, define these four dimensions:</p>
        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="glass rounded-xl p-5">
            <h3 className="font-semibold mb-2">Tone</h3>
            <p className="text-sm text-zinc-400">The emotional quality. Not just &ldquo;professional&rdquo; but &ldquo;confidently casual with occasional dry humor.&rdquo;</p>
          </div>
          <div className="glass rounded-xl p-5">
            <h3 className="font-semibold mb-2">Vocabulary</h3>
            <p className="text-sm text-zinc-400">Words you always/never use. Contractions? Slang? Technical jargon? Define the boundaries.</p>
          </div>
          <div className="glass rounded-xl p-5">
            <h3 className="font-semibold mb-2">Sentence Style</h3>
            <p className="text-sm text-zinc-400">Short and punchy? Long and flowing? Mix of both? One-word paragraphs allowed?</p>
          </div>
          <div className="glass rounded-xl p-5">
            <h3 className="font-semibold mb-2">Formatting Rules</h3>
            <p className="text-sm text-zinc-400">Emoji policy, capitalization, hashtag style, paragraph breaks. The details that create consistency.</p>
          </div>
        </div>
        <div className="glass rounded-xl p-5 border-l-4 border-l-amber-500">
          <p className="text-sm text-zinc-300"><strong>Pro tip:</strong> Create a &ldquo;Do&apos;s and Don&apos;ts&rdquo; list. It is faster for team members and AI tools to follow concrete rules than abstract descriptions. <a href="/brand-voice" className="text-amber-400 hover:text-amber-300 underline">Try our Brand Voice Generator</a> to create this automatically.</p>
        </div>
      </section>

      {/* Section 4 */}
      <section id="voice-by-platform" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">4. Adapting Your Voice Across Platforms</h2>
        <p className="text-zinc-300 mb-4">Your voice stays constant. Your register changes. Think of it like talking to your friend (Instagram) versus presenting to investors (LinkedIn) — still you, but adapted.</p>
        <div className="space-y-3 my-6">
          {[
            ['Twitter/X', 'Sharpest version of your voice. Shorter sentences, bolder claims, more personality. Hot takes welcome.'],
            ['LinkedIn', 'Most polished version. Same personality but measured, data-backed, professional formatting.'],
            ['Instagram', 'Most visual and emotional. Emoji-friendly, storytelling-first, lifestyle-adjacent.'],
            ['TikTok', 'Most casual and raw. Authenticity over polish. Trends and humor matter more than structure.'],
            ['Email', 'Most personal. Feels like a 1-on-1 conversation. Longer-form, value-dense, relationship-building.'],
          ].map(([platform, desc]) => (
            <div key={platform} className="glass rounded-xl p-4">
              <h3 className="font-semibold text-sm mb-1">{platform}</h3>
              <p className="text-sm text-zinc-400">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5 */}
      <section id="calendar-basics" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">5. Content Calendar Fundamentals</h2>
        <p className="text-zinc-300 mb-4">A content calendar is not just &ldquo;what to post when.&rdquo; It is a strategic document that ensures every post serves a purpose.</p>
        <p className="text-zinc-300 mb-4">Every calendar entry should answer:</p>
        <ul className="list-disc list-inside space-y-2 text-zinc-400 my-4">
          <li><strong>What platform?</strong> — Where this content lives</li>
          <li><strong>What type?</strong> — Educational, engagement, story, or promotional</li>
          <li><strong>What topic?</strong> — The specific angle</li>
          <li><strong>What time?</strong> — Optimized for each platform&apos;s peak hours</li>
          <li><strong>What goal?</strong> — Awareness, engagement, leads, or sales</li>
        </ul>
        <div className="glass rounded-xl p-5 border-l-4 border-l-emerald-500">
          <p className="text-sm text-zinc-300">Skip the spreadsheets. <a href="/content-calendar" className="text-emerald-400 hover:text-emerald-300 underline">Our AI Content Calendar</a> generates a complete 7-day plan with captions, hashtags, and posting times in seconds.</p>
        </div>
      </section>

      {/* Section 6 */}
      <section id="content-mix" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">6. The 40-20-20-20 Content Mix</h2>
        <p className="text-zinc-300 mb-4">The most successful accounts follow a balanced content mix:</p>
        <div className="space-y-3 my-6">
          <div className="glass rounded-xl p-4 border-l-4 border-l-blue-500">
            <p className="text-sm"><strong className="text-blue-400">40% Value Content</strong> — Tips, tutorials, how-tos, educational threads. This is why people follow you.</p>
          </div>
          <div className="glass rounded-xl p-4 border-l-4 border-l-purple-500">
            <p className="text-sm"><strong className="text-purple-400">20% Engagement Content</strong> — Questions, polls, hot takes, debates. This feeds the algorithm.</p>
          </div>
          <div className="glass rounded-xl p-4 border-l-4 border-l-amber-500">
            <p className="text-sm"><strong className="text-amber-400">20% Story Content</strong> — Behind the scenes, personal stories, journey updates. This builds connection.</p>
          </div>
          <div className="glass rounded-xl p-4 border-l-4 border-l-pink-500">
            <p className="text-sm"><strong className="text-pink-400">20% Promotional</strong> — Products, launches, testimonials, offers. Keep this at or below 20%.</p>
          </div>
        </div>
        <p className="text-zinc-300">Most accounts fail because they are 80% promotional. If your content does not provide value 80% of the time, the 20% promotional content will not convert.</p>
      </section>

      {/* Section 7 */}
      <section id="posting-times" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">7. Best Posting Times by Platform (2026 Data)</h2>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left py-2 text-zinc-500">Platform</th>
                <th className="text-left py-2 text-zinc-500">Best Days</th>
                <th className="text-left py-2 text-zinc-500">Best Times (EST)</th>
              </tr>
            </thead>
            <tbody className="text-zinc-400">
              <tr className="border-b border-zinc-800/50"><td className="py-2">Twitter/X</td><td>Tue-Thu</td><td>8-10 AM, 12-1 PM</td></tr>
              <tr className="border-b border-zinc-800/50"><td className="py-2">LinkedIn</td><td>Tue-Thu</td><td>7-9 AM, 12 PM</td></tr>
              <tr className="border-b border-zinc-800/50"><td className="py-2">Instagram</td><td>Mon, Wed, Fri</td><td>11 AM-1 PM, 7-9 PM</td></tr>
              <tr className="border-b border-zinc-800/50"><td className="py-2">TikTok</td><td>Tue, Thu, Sat</td><td>10 AM, 2 PM, 8 PM</td></tr>
              <tr><td className="py-2">Facebook</td><td>Wed-Fri</td><td>9-11 AM, 1-3 PM</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-zinc-500 text-sm">Data aggregated from Sprout Social, Hootsuite, and Buffer research (Q1 2026). Your specific audience may vary — test and iterate.</p>
      </section>

      {/* Section 8 */}
      <section id="ai-tools" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">8. Using AI to Build Both in Minutes</h2>
        <p className="text-zinc-300 mb-4">Manually building a brand voice guide takes weeks of workshops and revisions. Planning a content calendar takes hours every week. AI compresses both to minutes.</p>
        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="glass rounded-xl p-5 border-l-4 border-l-amber-500">
            <h3 className="font-semibold mb-2">Brand Voice Generator</h3>
            <p className="text-sm text-zinc-400 mb-3">Input your brand, industry, and archetype. Get a complete voice guide with tone rules, vocabulary, do&apos;s &amp; don&apos;ts, and sample posts for every platform.</p>
            <a href="/brand-voice" className="text-amber-400 text-sm hover:text-amber-300 underline">Try it free</a>
          </div>
          <div className="glass rounded-xl p-5 border-l-4 border-l-emerald-500">
            <h3 className="font-semibold mb-2">Content Calendar</h3>
            <p className="text-sm text-zinc-400 mb-3">Input your niche, platforms, and goals. Get a 7-day plan with topics, captions, hashtags, and posting times — all ready to copy-paste.</p>
            <a href="/content-calendar" className="text-emerald-400 text-sm hover:text-emerald-300 underline">Try it free</a>
          </div>
        </div>
        <p className="text-zinc-300">The best workflow: generate your brand voice first, then use it as context when generating your calendar. Consistency is built into the process.</p>
      </section>

      {/* Section 9 */}
      <section id="mistakes" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">9. 7 Mistakes That Kill Brand Consistency</h2>
        <ol className="space-y-4 my-6">
          {[
            ['Defining voice too vaguely', '"Professional but friendly" describes everyone. Be specific: "Confident, data-backed, with occasional dry humor and zero corporate buzzwords."'],
            ['Changing voice per platform identity', 'Your voice should adapt, not transform. A different register is fine — a different personality is not.'],
            ['No written voice guide', 'If your voice only exists in your head, your team cannot follow it. Write it down with examples.'],
            ['Posting without a content mix', 'All promotional = unfollows. All value = no revenue. Balance is everything.'],
            ['Ignoring posting times', 'The best content at the wrong time gets buried. Platform algorithms favor recency.'],
            ['No review process', 'Even with AI, have someone check that posts match your voice before publishing.'],
            ['Not evolving', 'Review your voice guide quarterly. Audiences change, platforms evolve, your brand grows.'],
          ].map(([title, desc], i) => (
            <li key={i} className="glass rounded-xl p-4">
              <p className="font-semibold text-sm text-red-400 mb-1">{i + 1}. {title}</p>
              <p className="text-sm text-zinc-400">{desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Section 10 */}
      <section id="checklist" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">10. Your Weekly Content Launch Checklist</h2>
        <div className="glass rounded-xl p-5 my-6">
          <ul className="space-y-2 text-sm text-zinc-400">
            <li className="flex gap-2"><span className="text-emerald-400">1.</span> Review brand voice guide (5 min)</li>
            <li className="flex gap-2"><span className="text-emerald-400">2.</span> <a href="/content-calendar" className="text-emerald-400 hover:text-emerald-300 underline">Generate 7-day calendar</a> with AI (2 min)</li>
            <li className="flex gap-2"><span className="text-emerald-400">3.</span> Review and customize captions for brand voice (15 min)</li>
            <li className="flex gap-2"><span className="text-emerald-400">4.</span> <a href="/hashtags" className="text-cyan-400 hover:text-cyan-300 underline">Generate optimized hashtags</a> for each post (5 min)</li>
            <li className="flex gap-2"><span className="text-emerald-400">5.</span> <a href="/hooks" className="text-purple-400 hover:text-purple-300 underline">Generate scroll-stopping hooks</a> (5 min)</li>
            <li className="flex gap-2"><span className="text-emerald-400">6.</span> Schedule all posts in your scheduling tool (10 min)</li>
            <li className="flex gap-2"><span className="text-emerald-400">7.</span> Set reminders to engage with comments same-day</li>
          </ul>
          <p className="text-xs text-zinc-500 mt-4">Total time: ~42 minutes for a full week of strategic, on-brand content.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="glass rounded-2xl p-8 text-center mb-12">
        <h2 className="text-2xl font-bold mb-3">Build Your Brand Voice + Calendar Now</h2>
        <p className="text-zinc-400 mb-6 max-w-lg mx-auto">Stop posting randomly. Define your voice, plan your week, and watch your engagement compound.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="/brand-voice" className="inline-block px-8 py-3.5 btn-primary rounded-xl font-semibold text-white">
            Generate Brand Voice
          </a>
          <a href="/content-calendar" className="inline-block px-8 py-3.5 bg-zinc-800 hover:bg-zinc-700 rounded-xl font-semibold text-white transition">
            Plan Content Calendar
          </a>
        </div>
      </section>

      {/* Related */}
      <section className="mb-12">
        <h2 className="text-lg font-bold mb-4">Related Guides</h2>
        <div className="grid md:grid-cols-2 gap-3">
          <a href="/blog/social-media-bio-cta-guide" className="glass rounded-xl p-4 hover:border-pink-500/30 transition">
            <p className="font-semibold text-sm">Bio + CTA Guide</p>
            <p className="text-xs text-zinc-500 mt-1">Write bios and CTAs that convert</p>
          </a>
          <a href="/blog/scroll-stopping-hooks-guide" className="glass rounded-xl p-4 hover:border-pink-500/30 transition">
            <p className="font-semibold text-sm">Hook Writing Guide</p>
            <p className="text-xs text-zinc-500 mt-1">First lines that stop the scroll</p>
          </a>
          <a href="/blog/content-atomization-strategy" className="glass rounded-xl p-4 hover:border-pink-500/30 transition">
            <p className="font-semibold text-sm">Content Atomization</p>
            <p className="text-xs text-zinc-500 mt-1">One piece, 15+ posts</p>
          </a>
          <a href="/blog/multi-platform-content-strategy" className="glass rounded-xl p-4 hover:border-pink-500/30 transition">
            <p className="font-semibold text-sm">Multi-Platform Strategy</p>
            <p className="text-xs text-zinc-500 mt-1">Adapt content across platforms</p>
          </a>
        </div>
      </section>
    </main>
  );
}
