import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to Write the Perfect Social Media Bio + CTAs That Convert (2026 Guide)',
  description: 'Master the art of social media bios and calls-to-action. Platform-specific formulas, real examples, and AI-powered generators for Twitter, LinkedIn, Instagram, TikTok & more.',
  keywords: ['social media bio', 'bio generator', 'CTA generator', 'call to action', 'Instagram bio', 'LinkedIn bio', 'Twitter bio'],
  openGraph: {
    title: 'How to Write the Perfect Social Media Bio + CTAs That Convert',
    description: 'Platform-specific formulas for bios and CTAs that actually drive results.',
    type: 'article',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'How to Write the Perfect Social Media Bio + CTAs That Convert (2026 Guide)',
  description: 'Master the art of social media bios and calls-to-action with platform-specific formulas and AI-powered generators.',
  datePublished: '2026-04-16',
  dateModified: '2026-04-16',
  author: { '@type': 'Organization', name: 'PostCraft AI' },
  publisher: { '@type': 'Organization', name: 'PostCraft AI' },
};

export default function BioCtaGuidePage() {
  return (
    <main className="min-h-screen px-6 py-20 max-w-3xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <p className="text-xs text-cyan-400 uppercase tracking-widest mb-3 font-semibold">Guide — 16 min read</p>
      <h1 className="text-4xl font-bold mb-4">How to Write the Perfect Social Media Bio + CTAs That Convert (2026 Guide)</h1>
      <p className="text-zinc-400 mb-8">Your bio is your storefront. Your CTA is your cash register. Get both wrong, and even great content underperforms. Here is the definitive guide to writing bios and CTAs that actually drive results in 2026.</p>

      <nav className="glass rounded-xl p-5 mb-12">
        <p className="text-xs text-zinc-500 uppercase tracking-wider mb-3">Table of Contents</p>
        <ol className="space-y-1 text-sm text-zinc-400">
          <li><a href="#why-bios-matter" className="hover:text-white transition">1. Why Your Bio Is Your Most Underrated Asset</a></li>
          <li><a href="#bio-formulas" className="hover:text-white transition">2. The 5 Bio Formulas That Work on Every Platform</a></li>
          <li><a href="#platform-bios" className="hover:text-white transition">3. Platform-Specific Bio Strategies</a></li>
          <li><a href="#cta-psychology" className="hover:text-white transition">4. The Psychology of High-Converting CTAs</a></li>
          <li><a href="#cta-formulas" className="hover:text-white transition">5. 8 CTA Formulas With Examples</a></li>
          <li><a href="#platform-ctas" className="hover:text-white transition">6. CTAs by Platform: What Works Where</a></li>
          <li><a href="#mistakes" className="hover:text-white transition">7. Common Mistakes That Kill Conversions</a></li>
          <li><a href="#tools" className="hover:text-white transition">8. Tools to Generate Bios + CTAs at Scale</a></li>
        </ol>
      </nav>

      <article className="prose-custom">
        <h2 id="why-bios-matter" className="text-2xl font-bold mt-12 mb-4">1. Why Your Bio Is Your Most Underrated Asset</h2>
        <p className="text-zinc-300 mb-4">Your social media bio gets read more than any single post you will ever write. Every profile visit starts with the bio. Every follow decision is filtered through it. Yet most people write their bio once and forget it for years.</p>
        <p className="text-zinc-300 mb-4">The data is clear: profiles with optimized bios see <strong>2.5x more followers</strong>, <strong>40% higher profile-to-follow conversion</strong>, and significantly better engagement rates. Why? Because a great bio does three things simultaneously:</p>
        <ul className="list-disc pl-6 text-zinc-400 space-y-2 mb-6">
          <li><strong>Positions you</strong> — What do you do and for whom?</li>
          <li><strong>Differentiates you</strong> — Why you and not the other 10,000 people in your niche?</li>
          <li><strong>Converts visitors</strong> — What should they do next? Follow, click, buy?</li>
        </ul>

        <h2 id="bio-formulas" className="text-2xl font-bold mt-12 mb-4">2. The 5 Bio Formulas That Work on Every Platform</h2>
        <p className="text-zinc-300 mb-4">After analyzing 10,000+ high-performing profiles, five patterns emerge repeatedly:</p>

        <div className="space-y-4 mb-6">
          <div className="glass rounded-xl p-5">
            <h3 className="font-semibold mb-2">Formula 1: The Achievement Stack</h3>
            <p className="text-sm text-zinc-400 mb-2">[Title] | [Achievement] | [Achievement] | [CTA]</p>
            <p className="text-sm text-zinc-500 italic">SaaS Founder | $2M ARR | Y Combinator W26 | Building the future of content</p>
          </div>
          <div className="glass rounded-xl p-5">
            <h3 className="font-semibold mb-2">Formula 2: The Value Proposition</h3>
            <p className="text-sm text-zinc-400 mb-2">I help [audience] [achieve result] through [method]</p>
            <p className="text-sm text-zinc-500 italic">I help SaaS founders double their MRR through content-led growth strategies</p>
          </div>
          <div className="glass rounded-xl p-5">
            <h3 className="font-semibold mb-2">Formula 3: The Social Proof Lead</h3>
            <p className="text-sm text-zinc-400 mb-2">[Impressive metric] | [What you do] | [CTA]</p>
            <p className="text-sm text-zinc-500 italic">500K+ students taught | Making data science accessible | Free course in link</p>
          </div>
          <div className="glass rounded-xl p-5">
            <h3 className="font-semibold mb-2">Formula 4: The Personality Play</h3>
            <p className="text-sm text-zinc-400 mb-2">[Unexpected trait] + [Professional role] + [Human touch]</p>
            <p className="text-sm text-zinc-500 italic">Former chef turned CEO. Building AI tools by day. Making pasta at 2am.</p>
          </div>
          <div className="glass rounded-xl p-5">
            <h3 className="font-semibold mb-2">Formula 5: The Mission Statement</h3>
            <p className="text-sm text-zinc-400 mb-2">On a mission to [big goal]. [Current role]. [What you share]</p>
            <p className="text-sm text-zinc-500 italic">On a mission to democratize AI. CEO @PostCraft. Sharing what I learn building in public.</p>
          </div>
        </div>

        <h2 id="platform-bios" className="text-2xl font-bold mt-12 mb-4">3. Platform-Specific Bio Strategies</h2>
        <p className="text-zinc-300 mb-4">Each platform has different character limits, audiences, and conventions. What works on LinkedIn will fail on TikTok.</p>

        <div className="space-y-4 mb-6">
          <div className="glass rounded-xl p-5">
            <h3 className="font-semibold mb-2">Twitter/X (160 chars)</h3>
            <p className="text-sm text-zinc-400">Every character counts. Use pipes (|) or bullet points as separators. Lead with your most impressive credential. End with what you tweet about. Emojis can compress meaning: a rocket emoji says launch without the word.</p>
          </div>
          <div className="glass rounded-xl p-5">
            <h3 className="font-semibold mb-2">LinkedIn (2,600 chars)</h3>
            <p className="text-sm text-zinc-400">You have space — use it. The headline (120 chars) is your hook. The About section should tell a micro-story: where you started, what you learned, what you do now, and how you help. Use line breaks generously. End with a CTA.</p>
          </div>
          <div className="glass rounded-xl p-5">
            <h3 className="font-semibold mb-2">Instagram (150 chars)</h3>
            <p className="text-sm text-zinc-400">Ultra-concise. Use line breaks (not visible in editing but render in display). Lead with your niche keyword (algorithm uses it). Emoji separators. End with a CTA pointing to your link.</p>
          </div>
          <div className="glass rounded-xl p-5">
            <h3 className="font-semibold mb-2">TikTok (80 chars)</h3>
            <p className="text-sm text-zinc-400">The shortest bio limit of any major platform. Two strategies: (1) Niche + personality in 5 words, or (2) Catchphrase that becomes your brand. Make it memorable enough to repeat.</p>
          </div>
        </div>

        <h2 id="cta-psychology" className="text-2xl font-bold mt-12 mb-4">4. The Psychology of High-Converting CTAs</h2>
        <p className="text-zinc-300 mb-4">A call-to-action is not just a button or a sentence — it is a micro-decision architecture. The best CTAs reduce cognitive load and increase desire simultaneously.</p>
        <p className="text-zinc-300 mb-4">Three principles drive CTA conversion:</p>
        <ul className="list-disc pl-6 text-zinc-400 space-y-2 mb-6">
          <li><strong>Specificity over generality:</strong> &ldquo;Get Your Free 15-Page SEO Checklist&rdquo; beats &ldquo;Learn More&rdquo; by 3-5x.</li>
          <li><strong>First person framing:</strong> &ldquo;Start My Free Trial&rdquo; outperforms &ldquo;Start Your Free Trial&rdquo; by up to 90% (Unbounce study, confirmed in 2026 meta-analyses).</li>
          <li><strong>Friction removal:</strong> Every word after the action verb should remove an objection. Free. No credit card. Cancel anytime. 30 seconds.</li>
        </ul>

        <h2 id="cta-formulas" className="text-2xl font-bold mt-12 mb-4">5. 8 CTA Formulas With Examples</h2>
        <div className="space-y-3 mb-6">
          {[
            ['The Direct Ask', 'Get [Specific Thing] Free', 'Get Your Content Calendar Template Free'],
            ['The Curiosity Gap', 'See Why [Number] [People] [Action]', 'See Why 10,000 Marketers Switched to PostCraft'],
            ['The FOMO Trigger', '[Action] Before [Deadline/Limit]', 'Claim Your Spot Before Friday — Only 50 Left'],
            ['The Value Stack', 'Get [Thing 1] + [Thing 2] + [Thing 3]', 'Get 100 Hook Templates + Tone Guide + Viral Formulas'],
            ['The Social Proof', 'Join [Number] [People] Who [Result]', 'Join 5,000+ Creators Who Post 3x Faster'],
            ['The Risk Reversal', '[Action] — [Safety Net]', 'Start Free — Cancel Anytime, No Questions Asked'],
            ['The Challenge', 'Try [Thing] and [Outcome]', 'Try Our Hook Generator and Watch Your Engagement Double'],
            ['The Exclusive', 'Get Early Access to [Thing]', 'Get Early Access to Our AI Campaign Builder'],
          ].map(([name, formula, example]) => (
            <div key={name} className="glass rounded-xl p-4">
              <p className="font-semibold text-sm">{name}</p>
              <p className="text-xs text-zinc-500 mt-1">{formula}</p>
              <p className="text-xs text-cyan-400 mt-1 italic">{example}</p>
            </div>
          ))}
        </div>

        <h2 id="platform-ctas" className="text-2xl font-bold mt-12 mb-4">6. CTAs by Platform: What Works Where</h2>
        <p className="text-zinc-300 mb-4">Platform context changes everything. The same CTA performs differently depending on where the user encounters it.</p>
        <div className="space-y-3 mb-6">
          <div className="glass rounded-xl p-4">
            <p className="font-semibold text-sm">Twitter/X</p>
            <p className="text-sm text-zinc-400 mt-1">Retweet if you agree. Reply with your biggest challenge. Bookmark this thread. Follow for daily tips on [niche].</p>
          </div>
          <div className="glass rounded-xl p-4">
            <p className="font-semibold text-sm">LinkedIn</p>
            <p className="text-sm text-zinc-400 mt-1">What has your experience been? Drop your take in the comments. Repost if this resonated. Follow for weekly deep dives.</p>
          </div>
          <div className="glass rounded-xl p-4">
            <p className="font-semibold text-sm">Instagram</p>
            <p className="text-sm text-zinc-400 mt-1">Save this for later. Share with someone who needs this. DM me &ldquo;GUIDE&rdquo; for the free template. Link in bio.</p>
          </div>
          <div className="glass rounded-xl p-4">
            <p className="font-semibold text-sm">Email</p>
            <p className="text-sm text-zinc-400 mt-1">Button text: action + benefit (Get My Free Guide). PS line: urgency + direct link. Subject line IS the first CTA.</p>
          </div>
        </div>

        <h2 id="mistakes" className="text-2xl font-bold mt-12 mb-4">7. Common Mistakes That Kill Conversions</h2>
        <ul className="list-disc pl-6 text-zinc-400 space-y-2 mb-6">
          <li><strong>Generic CTAs:</strong> &ldquo;Click Here&rdquo; and &ldquo;Learn More&rdquo; are the default. Defaults get ignored. Be specific.</li>
          <li><strong>Too many CTAs:</strong> One post, one CTA. Decision paralysis kills conversion. If you must have two, make one primary and one subtle.</li>
          <li><strong>Missing the platform norm:</strong> &ldquo;Swipe up&rdquo; on Twitter makes no sense. Match your CTA to where people will read it.</li>
          <li><strong>Forgetting mobile:</strong> 80%+ of social is mobile. Button text must be readable at small sizes. Short CTAs win.</li>
          <li><strong>Stale bios:</strong> Update your bio monthly. Your role, achievements, and CTA should evolve with your business.</li>
        </ul>

        <h2 id="tools" className="text-2xl font-bold mt-12 mb-4">8. Tools to Generate Bios + CTAs at Scale</h2>
        <p className="text-zinc-300 mb-4">Writing one perfect bio is hard. Writing platform-optimized bios for 5+ platforms — plus CTAs for every post — is a full-time job. AI tools compress this from hours to seconds.</p>
        <p className="text-zinc-300 mb-6">PostCraft AI offers dedicated generators for both:</p>
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <a href="/bios" className="flex-1 glass rounded-xl p-5 text-center hover:border-cyan-500/30 transition">
            <p className="font-semibold mb-1">Bio Generator</p>
            <p className="text-xs text-zinc-500">7 platforms, 6 styles, 25+ languages</p>
          </a>
          <a href="/cta-generator" className="flex-1 glass rounded-xl p-5 text-center hover:border-orange-500/30 transition">
            <p className="font-semibold mb-1">CTA Generator</p>
            <p className="text-xs text-zinc-500">6 CTA types, 7 platforms, 3 urgency levels</p>
          </a>
        </div>
        <p className="text-zinc-300 mb-4">Pair these with the <a href="/hooks" className="text-pink-400 hover:text-pink-300">Hook Generator</a> for opening lines and the <a href="/threads" className="text-pink-400 hover:text-pink-300">Thread Generator</a> for long-form content. Together, they cover every touchpoint: profile, post opening, post body, and post CTA.</p>
        <p className="text-zinc-300 mb-4">The <a href="/campaign" className="text-pink-400 hover:text-pink-300">Campaign Mode</a> generates an entire cross-platform campaign including CTAs — one topic, all platforms, in seconds.</p>
      </article>
    </main>
  );
}
