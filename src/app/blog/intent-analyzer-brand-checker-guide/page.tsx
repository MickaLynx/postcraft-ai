import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Purchase Intent Analysis & Brand Consistency: The 2026 Social Media Playbook | PostCraft AI',
  description: 'Master purchase intent detection and brand voice consistency across social platforms. Learn buying signal analysis, intent scoring, archetype-based brand auditing, and conversion optimization strategies for 2026.',
  keywords: ['purchase intent', 'buying signals', 'brand consistency', 'brand voice audit', 'social media conversion', 'brand archetype', 'intent scoring', 'brand checker', 'social selling', 'conversion optimization'],
  openGraph: { title: 'Purchase Intent & Brand Consistency: 2026 Social Media Playbook', description: 'The definitive guide to detecting purchase intent and maintaining brand consistency across every social platform in 2026.' },
};

export default function IntentAnalyzerBrandCheckerGuide() {
  return (
    <main className="min-h-screen bg-zinc-950 py-20 px-4">
      <article className="max-w-3xl mx-auto prose prose-invert">
        <header className="mb-12">
          <p className="text-violet-400 text-sm mb-2">PostCraft AI Blog — April 2026</p>
          <h1 className="text-4xl font-bold gradient-text mb-4">Purchase Intent Analysis & Brand Consistency: The 2026 Social Media Playbook</h1>
          <p className="text-zinc-400 text-lg">How to detect buying signals in every interaction and maintain a brand voice so consistent it becomes your competitive moat.</p>
        </header>

        <nav className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-10">
          <h2 className="text-sm font-semibold text-zinc-400 mb-3">Table of Contents</h2>
          <ol className="space-y-1 text-sm text-violet-400">
            <li><a href="#intent-matters" className="hover:text-violet-300">1. Why Purchase Intent Is the Most Valuable Social Metric</a></li>
            <li><a href="#buying-signals" className="hover:text-violet-300">2. The 8 Buying Signals Hidden in Every Comment</a></li>
            <li><a href="#intent-scoring" className="hover:text-violet-300">3. Intent Scoring: From Browsing to Ready-to-Buy</a></li>
            <li><a href="#content-types" className="hover:text-violet-300">4. Content Type Intent Mapping</a></li>
            <li><a href="#response-strategies" className="hover:text-violet-300">5. Response Strategies by Intent Level</a></li>
            <li><a href="#nurture-sequences" className="hover:text-violet-300">6. The 3-Step Nurture Sequence That Converts</a></li>
            <li><a href="#competitive-positioning" className="hover:text-violet-300">7. Competitive Positioning in High-Intent Moments</a></li>
            <li><a href="#brand-consistency" className="hover:text-violet-300">8. Brand Consistency: The Silent Revenue Driver</a></li>
            <li><a href="#archetypes" className="hover:text-violet-300">9. The 12 Brand Archetypes and Their Voice Signatures</a></li>
            <li><a href="#voice-audit" className="hover:text-violet-300">10. Running a Brand Voice Audit (6 Dimensions)</a></li>
            <li><a href="#platform-adaptation" className="hover:text-violet-300">11. Platform Adaptation Without Voice Fragmentation</a></li>
            <li><a href="#vocabulary" className="hover:text-violet-300">12. Building Your Brand Vocabulary System</a></li>
            <li><a href="#visual-consistency" className="hover:text-violet-300">13. Visual Consistency Across Platforms</a></li>
            <li><a href="#integration" className="hover:text-violet-300">14. Integrating Intent and Brand: The Complete System</a></li>
          </ol>
        </nav>

        <section id="intent-matters" className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">1. Why Purchase Intent Is the Most Valuable Social Metric</h2>
          <p className="text-zinc-300 mb-3">Every interaction on social media carries an invisible signal: how close is this person to making a purchase decision? While most marketers obsess over vanity metrics like follower counts and likes, the brands generating real revenue from social are obsessing over something entirely different — purchase intent.</p>
          <p className="text-zinc-300 mb-3">Purchase intent is the measurable likelihood that a social media interaction will lead to a conversion. A comment asking &quot;How much does this cost?&quot; has fundamentally different value than a comment saying &quot;Nice pic!&quot; Yet most social media management tools treat both identically. This is a massive missed opportunity.</p>
          <p className="text-zinc-300 mb-3">The data supports this obsession: brands that implement intent-based response prioritization see <strong className="text-white">34% higher conversion rates</strong> from social channels, 28% shorter sales cycles, and 41% improvement in customer acquisition cost. Intent analysis transforms your social presence from a broadcast channel into a precision revenue engine.</p>
          <p className="text-zinc-300">In 2026, with AI-powered intent detection becoming accessible to businesses of all sizes, there is no excuse for treating all social interactions equally. Every comment, DM, and mention contains data about where that person sits in your funnel — and the right response at the right moment can accelerate their journey dramatically.</p>
        </section>

        <section id="buying-signals" className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">2. The 8 Buying Signals Hidden in Every Comment</h2>
          <p className="text-zinc-300 mb-3">Not all engagement is created equal. Here are the eight buying signals that separate high-intent interactions from casual browsing:</p>
          <div className="space-y-3">
            {[
              { signal: 'Price Sensitivity Indicator', desc: 'When users ask about pricing, discounts, or payment plans, they have already decided they want the product — they are now evaluating affordability. This is one of the strongest buying signals, with a 94% correlation to purchase within 7 days.' },
              { signal: 'Feature Comparison Behavior', desc: 'Questions like "How does this compare to [competitor]?" or "Does this have [specific feature]?" indicate the user is building a shortlist. They are past awareness and deep into evaluation. Respond with specific, honest comparisons.' },
              { signal: 'Solution Urgency Signal', desc: 'Language like "I need this ASAP," "Is this available now?", or complaints about current solutions indicate time pressure. Urgency signals convert 3x faster than general inquiries when met with immediate, friction-free responses.' },
              { signal: 'Social Proof Seeking', desc: 'Requests for reviews, testimonials, or "Does anyone actually use this?" indicate the user is in the final confidence-building phase. They want validation before committing. Provide specific, relevant proof points.' },
              { signal: 'Competitor Dissatisfaction', desc: 'Negative mentions of competitors or current solutions are gold. "I am so frustrated with [competitor]" is an invitation to present your alternative. Respond with empathy first, solution second.' },
              { signal: 'Engagement Depth Score', desc: 'Users who comment on multiple posts, save content, and visit your profile repeatedly are building a mental case for purchase. Track engagement depth across sessions, not just individual interactions.' },
              { signal: 'Decision-Maker Language', desc: 'Words like "budget," "ROI," "implementation," and "team" indicate someone with purchasing authority. These interactions should be fast-tracked to senior sales or success teams.' },
              { signal: 'Trial/Demo Proximity', desc: 'Questions about how things work, setup time, or integration capabilities indicate someone mentally rehearsing the purchase. They are imagining themselves as a customer. Make that imagination easy.' },
            ].map((s, i) => (
              <div key={i} className="bg-zinc-900 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-violet-300 mb-1">{s.signal}</h3>
                <p className="text-zinc-400 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="intent-scoring" className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">3. Intent Scoring: From Browsing to Ready-to-Buy</h2>
          <p className="text-zinc-300 mb-3">Intent scoring assigns a numerical value (0-100) to every social interaction based on the buying signals detected. This score maps to four distinct intent levels, each requiring a different response strategy:</p>
          <div className="space-y-3">
            {[
              { level: 'Browsing (0-39)', desc: 'Passive engagement with no clear purchase intent. The user is casually consuming content without specific goals. Strategy: brand awareness, value delivery, and gentle nurturing. Do not sell — educate and entertain.', color: 'text-zinc-400' },
              { level: 'Researching (40-59)', desc: 'Early-stage interest with information-gathering behavior. The user is exploring a problem space and potential solutions. Strategy: educational content, thought leadership, and expertise demonstration. Build trust through knowledge.', color: 'text-blue-400' },
              { level: 'Comparing (60-79)', desc: 'Active evaluation of options. The user is building a shortlist and weighing alternatives. Strategy: competitive differentiation, social proof, and case studies. Show why you are the best choice with evidence, not claims.', color: 'text-amber-400' },
              { level: 'Ready to Buy (80-100)', desc: 'Strong purchase signals with high conversion probability. The user is in the final decision-making stage. Strategy: remove friction, provide personalized offers, and respond immediately. Every minute of delay reduces conversion probability by 5%.', color: 'text-green-400' },
            ].map((l, i) => (
              <div key={i} className="bg-zinc-900 rounded-lg p-4">
                <h3 className={`text-sm font-semibold ${l.color} mb-1`}>{l.level}</h3>
                <p className="text-zinc-400 text-sm">{l.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-zinc-300 mt-3">The key insight is that most brands apply the same response strategy to all four levels — typically a generic &quot;Thanks for your interest!&quot; This one-size-fits-all approach leaves enormous revenue on the table. A ready-to-buy user who receives a generic response instead of a personalized offer is 78% likely to go cold within 24 hours.</p>
        </section>

        <section id="content-types" className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">4. Content Type Intent Mapping</h2>
          <p className="text-zinc-300 mb-3">Different content types naturally attract different intent levels. Understanding this mapping helps you prioritize response resources:</p>
          <p className="text-zinc-300 mb-3"><strong className="text-white">Price Inquiries (88 base score)</strong> are the highest-intent content type. When someone asks about price, they have already completed their evaluation and are now making a financial decision. Treat every price inquiry as a sales opportunity in the final mile.</p>
          <p className="text-zinc-300 mb-3"><strong className="text-white">Comparison Questions (81 base score)</strong> indicate active evaluation. These users are building decision matrices and your response will directly influence which column you end up in. Respond with honest, data-backed comparisons.</p>
          <p className="text-zinc-300 mb-3"><strong className="text-white">Product Reviews (72 base score)</strong> show engaged customers who are either validating their own purchase decision or influencing others. Both scenarios are high-value — respond to reinforce their positive experience or address concerns before they solidify.</p>
          <p className="text-zinc-300 mb-3"><strong className="text-white">Competitor Mentions (65 base score)</strong> are switching signals. Whether positive or negative toward the competitor, these interactions indicate the user is aware of alternatives and actively thinking about their options.</p>
          <p className="text-zinc-300 mb-3"><strong className="text-white">Feature Requests (55 base score)</strong> show product-aware users who want more from you — a sign of engagement and potential loyalty. Even if you cannot build what they want immediately, acknowledging the request builds relationship capital.</p>
          <p className="text-zinc-300"><strong className="text-white">General Discussion (20 base score)</strong> and <strong className="text-white">Testimonials (40 base score)</strong> have lower immediate purchase intent but serve critical brand-building functions. Do not ignore them — they are the foundation of your awareness funnel.</p>
        </section>

        <section id="response-strategies" className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">5. Response Strategies by Intent Level</h2>
          <p className="text-zinc-300 mb-3">Each intent level demands a fundamentally different response approach. Here is the framework that top-performing brands use:</p>
          <p className="text-zinc-300 mb-3">For <strong className="text-white">Ready-to-Buy users</strong>, deploy personalized offers within 15 minutes. Remove all purchase friction. Assign to your senior sales team. The data shows that high-intent moments decay rapidly — 78% of ready-to-buy signals go cold within 24 hours without engagement. Speed is everything at this level.</p>
          <p className="text-zinc-300 mb-3">For <strong className="text-white">Comparing users</strong>, send comparison content and schedule live demos. Position against specific competitors mentioned in their interaction. Comparison-stage users convert 3x higher when they receive proactive competitive analysis versus passive browsing on their own.</p>
          <p className="text-zinc-300 mb-3">For <strong className="text-white">Researching users</strong>, nurture with educational content. Add to email sequences and track engagement depth for scoring. Research-stage prospects who receive 3 or more valuable touchpoints convert 62% more than those who receive only sales pitches.</p>
          <p className="text-zinc-300">For <strong className="text-white">Browsing users</strong>, retarget with brand awareness content. Engage authentically and build recognition for future consideration. Brand familiarity reduces evaluation time by 40% when browsing users eventually enter the purchase cycle. Patience at this stage pays compound interest.</p>
        </section>

        <section id="nurture-sequences" className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">6. The 3-Step Nurture Sequence That Converts</h2>
          <p className="text-zinc-300 mb-3">Every intent level has an optimal 3-step nurture sequence. The key principle: each step should escalate commitment while providing standalone value. Here is the universal framework adapted for social selling:</p>
          <p className="text-zinc-300 mb-3"><strong className="text-white">Step 1: Value First Contact.</strong> Your first interaction after detecting intent should deliver immediate, specific value. For ready-to-buy users, this means a personalized offer or demo link within 15 minutes. For researchers, it means a comprehensive educational resource addressing their exact question. The timing varies by intent level — from immediate for high-intent to within 6 hours for browsers — but the principle is identical: lead with value, not asks.</p>
          <p className="text-zinc-300 mb-3"><strong className="text-white">Step 2: Social Proof Delivery.</strong> After your initial value delivery, the second touchpoint should provide external validation. Customer success stories, testimonials, case studies, or community endorsements that match the user&apos;s industry, use case, or pain point. Timing: 24 hours to 2 weeks after Step 1, depending on intent level. The key is relevance — generic social proof is noise, specific social proof is persuasion.</p>
          <p className="text-zinc-300">       <strong className="text-white">Step 3: Commitment Escalation.</strong> The final step in the sequence moves the relationship forward. For high-intent users, this is a direct purchase facilitation with urgency. For comparison-stage users, it is a trial or pilot offer. For researchers, it is a natural product introduction tied to their pain points. For browsers, it is a low-commitment entry point like a free tool or template. Never skip to Step 3 without completing Steps 1 and 2 — premature commitment asks destroy trust.</p>
        </section>

        <section id="competitive-positioning" className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">7. Competitive Positioning in High-Intent Moments</h2>
          <p className="text-zinc-300 mb-3">When a high-intent interaction involves competitor awareness, your response strategy must include competitive positioning. But there is a right way and a wrong way to do this. The wrong way: bashing competitors, making unverifiable claims, or using fear-based messaging. The right way: honest differentiation based on genuine strengths.</p>
          <p className="text-zinc-300 mb-3">Effective competitive positioning follows the <strong className="text-white">AAD framework: Acknowledge, Affirm, Differentiate</strong>. Acknowledge that the competitor exists and has legitimate strengths (this builds your credibility). Affirm the user&apos;s smart approach to comparing options (this builds rapport). Differentiate on specific, provable dimensions where you genuinely excel (this builds preference).</p>
          <p className="text-zinc-300 mb-3">The positioning angles vary by industry. In SaaS, integration ecosystems and transparent pricing create switching costs and trust. In e-commerce, shipping speed, return policies, and authentic UGC build confidence. In healthcare, compliance certifications and clinical validation are non-negotiable differentiators. In finance, transparent fee structures beat hidden competitor costs every time.</p>
          <p className="text-zinc-300">The most powerful competitive positioning tactic in social media is this: respond faster and more helpfully than your competitor does. When a user mentions both your brand and a competitor, the first brand to respond with genuine value wins 67% of the time. Speed plus substance equals market share.</p>
        </section>

        <section id="brand-consistency" className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">8. Brand Consistency: The Silent Revenue Driver</h2>
          <p className="text-zinc-300 mb-3">While purchase intent detection tells you who to talk to, brand consistency determines whether they listen. Research from Lucidpress shows that <strong className="text-white">consistent brand presentation increases revenue by up to 33%</strong>. Yet 60% of marketers say their content is sometimes or rarely consistent with brand guidelines. This gap is a revenue leak.</p>
          <p className="text-zinc-300 mb-3">Brand consistency is not about being repetitive or boring. It is about creating a recognizable, trustworthy experience across every touchpoint. When a customer sees your Instagram story, reads your LinkedIn post, and visits your website, each interaction should feel like it came from the same entity — the same personality, the same values, the same quality standard.</p>
          <p className="text-zinc-300 mb-3">The challenge multiplies with every platform you add. Each platform has its own culture, content formats, and audience expectations. The art of brand consistency is adapting your voice to each platform while maintaining your core identity. Think of it like a person who speaks differently at a board meeting versus a casual dinner but is unmistakably the same person.</p>
          <p className="text-zinc-300">Inconsistent brand voice creates cognitive dissonance for your audience. When your Instagram is playful but your LinkedIn is corporate, users who encounter both feel uncertain about who you really are. Uncertainty is the enemy of trust, and trust is the foundation of purchase decisions. Every voice inconsistency is a small withdrawal from your trust bank.</p>
        </section>

        <section id="archetypes" className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">9. The 12 Brand Archetypes and Their Voice Signatures</h2>
          <p className="text-zinc-300 mb-3">The Jungian archetype framework provides the most effective foundation for brand voice consistency. Each of the 12 archetypes has a distinct voice signature — a set of personality traits, vocabulary patterns, and emotional tones that define how your brand communicates:</p>
          <div className="space-y-3">
            {[
              { arch: 'The Sage', voice: 'Authoritative, analytical, educational. Uses data and evidence. Never condescending.', brands: 'Google, Harvard Business Review, McKinsey' },
              { arch: 'The Hero', voice: 'Empowering, direct, motivational. Challenges audiences to be better. Never passive.', brands: 'Nike, FedEx, BMW' },
              { arch: 'The Jester', voice: 'Witty, irreverent, entertaining. Makes everything fun. Never boring.', brands: 'Old Spice, Wendy\'s, Dollar Shave Club' },
              { arch: 'The Creator', voice: 'Original, inspiring, detail-oriented. Celebrates craft and innovation. Never generic.', brands: 'Apple, Adobe, LEGO' },
              { arch: 'The Ruler', voice: 'Commanding, confident, polished. Sets the standard. Never chaotic.', brands: 'Rolex, Mercedes-Benz, American Express' },
              { arch: 'The Caregiver', voice: 'Compassionate, supportive, reassuring. Puts others first. Never self-serving.', brands: 'Johnson & Johnson, UNICEF, Volvo' },
              { arch: 'The Explorer', voice: 'Bold, curious, action-oriented. Seeks new frontiers. Never restrictive.', brands: 'Patagonia, The North Face, Jeep' },
              { arch: 'The Magician', voice: 'Visionary, inspiring, transformative. Makes the impossible possible. Never mundane.', brands: 'Tesla, Disney, Dyson' },
              { arch: 'The Innocent', voice: 'Warm, sincere, straightforward. Radiates optimism. Never cynical.', brands: 'Coca-Cola, Dove, Whole Foods' },
              { arch: 'The Outlaw', voice: 'Provocative, bold, unconventional. Challenges the status quo. Never conformist.', brands: 'Harley-Davidson, Virgin, Diesel' },
              { arch: 'The Everyman', voice: 'Friendly, humble, relatable. Belongs everywhere. Never elitist.', brands: 'IKEA, Target, Budweiser' },
              { arch: 'The Lover', voice: 'Passionate, emotional, appreciative. Creates intimate experiences. Never cold.', brands: 'Victoria\'s Secret, Godiva, Chanel' },
            ].map((a, i) => (
              <div key={i} className="bg-zinc-900 rounded-lg p-3">
                <h3 className="text-sm font-semibold text-violet-300">{a.arch}</h3>
                <p className="text-zinc-400 text-sm">{a.voice}</p>
                <p className="text-zinc-500 text-xs mt-1">Examples: {a.brands}</p>
              </div>
            ))}
          </div>
          <p className="text-zinc-300 mt-3">Choosing the right archetype is not about picking the one you like most — it is about finding the archetype that authentically represents your brand&apos;s core values and resonates with your target audience&apos;s aspirations. The wrong archetype creates inauthenticity that audiences detect instantly.</p>
        </section>

        <section id="voice-audit" className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">10. Running a Brand Voice Audit (6 Dimensions)</h2>
          <p className="text-zinc-300 mb-3">A comprehensive brand voice audit evaluates six critical dimensions. Each dimension receives a score from 0-100, and the aggregate tells you exactly where your brand consistency stands:</p>
          <p className="text-zinc-300 mb-3"><strong className="text-white">Tone Alignment</strong> measures how well your actual content matches your chosen archetype and tone target. Pull 20 recent posts across all platforms and score each against your archetype traits. A score below 70 indicates your content creators are drifting from brand guidelines — or worse, that guidelines do not exist.</p>
          <p className="text-zinc-300 mb-3"><strong className="text-white">Vocabulary Consistency</strong> tracks whether you use archetype-aligned language consistently. Create a brand dictionary with 50 core terms (words to use) and 50 anti-terms (words to avoid). Score each post against this dictionary. Vocabulary drift is the earliest warning sign of brand fragmentation.</p>
          <p className="text-zinc-300 mb-3"><strong className="text-white">Emotional Resonance</strong> evaluates whether your content triggers the emotional responses your archetype should evoke. A Sage brand should make people feel informed and confident. A Jester brand should make people laugh and feel light. When the emotional response does not match the archetype, you have a voice problem.</p>
          <p className="text-zinc-300 mb-3"><strong className="text-white">Platform Adaptation</strong> scores how well you adapt your voice to each platform&apos;s culture without losing brand identity. LinkedIn content should sound more professional than TikTok content — but both should be unmistakably your brand. A score below 60 indicates either platform-inappropriate content or identity fragmentation.</p>
          <p className="text-zinc-300 mb-3"><strong className="text-white">Audience Perception Match</strong> compares your intended brand personality with how your audience actually perceives you. Run quarterly surveys asking followers to describe your brand in three words. If their words do not match your archetype traits, perception and intention are misaligned.</p>
          <p className="text-zinc-300"><strong className="text-white">Cross-Platform Coherence</strong> measures consistency across all active platforms. Take 10 posts from each platform, shuffle them anonymously, and ask: &quot;Could these all come from the same brand?&quot; If the answer is anything but a confident yes, you have work to do.</p>
        </section>

        <section id="platform-adaptation" className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">11. Platform Adaptation Without Voice Fragmentation</h2>
          <p className="text-zinc-300 mb-3">The biggest brand consistency mistake is treating platform adaptation as an excuse for completely different voices. The solution is the <strong className="text-white">Core + Flex model</strong>: your core personality (archetype + values) stays identical everywhere, while your expression flexes to match platform culture.</p>
          <p className="text-zinc-300 mb-3">On <strong className="text-white">Instagram</strong>, your core personality shows through visual storytelling. Captions can be more casual, but your archetype vocabulary should still appear. Use Stories for behind-the-scenes content that reinforces brand values, and Reels to adapt trending formats to your brand voice.</p>
          <p className="text-zinc-300 mb-3">On <strong className="text-white">LinkedIn</strong>, the same personality appears through thought leadership and professional insight. The tone is naturally more polished, but the underlying perspective, values, and vocabulary remain constant. A Jester brand on LinkedIn is still funny — just boardroom-funny instead of party-funny.</p>
          <p className="text-zinc-300 mb-3">On <strong className="text-white">TikTok</strong>, authenticity is the currency. Your brand personality should feel unfiltered and genuine. Adapt trending formats but filter them through your archetype. A Sage brand on TikTok shares fascinating facts. A Hero brand on TikTok issues challenges. The format is TikTok; the soul is yours.</p>
          <p className="text-zinc-300">On <strong className="text-white">Twitter/X</strong>, brevity forces you to distill your brand voice to its essence. Every word must earn its place. Develop a recognizable tweet style — consistent length, structure, and punctuation patterns — that followers can identify even without seeing your name.</p>
        </section>

        <section id="vocabulary" className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">12. Building Your Brand Vocabulary System</h2>
          <p className="text-zinc-300 mb-3">Your vocabulary system is the most tactical tool in your brand consistency arsenal. It consists of two lists: <strong className="text-white">words to use</strong> and <strong className="text-white">words to avoid</strong>. These lists are archetype-specific and should be treated as sacred brand assets.</p>
          <p className="text-zinc-300 mb-3">For a Sage archetype, your vocabulary should include words like insight, research, data, analysis, truth, knowledge, evidence, expertise, framework, and methodology. These words signal intellectual authority and analytical rigor. They should appear naturally in every piece of content. Words to avoid: guess, probably, maybe, feel, trendy, hype, vibes, random. These words undermine the Sage&apos;s credibility.</p>
          <p className="text-zinc-300 mb-3">For a Jester archetype, the vocabulary flips entirely. Use words like fun, play, wild, hilarious, unexpected, ridiculous, epic, absurd, legendary, and plot twist. Avoid words like serious, formal, professional, corporate, strategic, optimize, leverage, synergy. A Jester who &quot;leverages synergies&quot; has lost the plot — literally.</p>
          <p className="text-zinc-300">Create your vocabulary system with 50 core terms and 50 anti-terms. Print it, share it with every content creator, and audit against it monthly. This single document will do more for your brand consistency than any style guide, brand book, or training session. Words are the atoms of voice — control them, and you control your brand.</p>
        </section>

        <section id="visual-consistency" className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">13. Visual Consistency Across Platforms</h2>
          <p className="text-zinc-300 mb-3">Brand consistency extends beyond words to visuals. Your visual identity should be as instantly recognizable as your voice. Here is the visual consistency checklist every brand should maintain:</p>
          <p className="text-zinc-300 mb-3"><strong className="text-white">Color palette:</strong> Use a maximum of 3 primary colors plus 2 accent colors. Document exact hex codes in your brand guide. Apply them consistently across all platform profiles, post templates, and stories. When someone sees your brand color, they should think of you before they even read your name.</p>
          <p className="text-zinc-300 mb-3"><strong className="text-white">Typography:</strong> Your font choices should match your archetype. Ruler brands use elegant serifs. Jester brands use rounded, bold typefaces. Sage brands use clean, modern sans-serifs. Use the same 2-3 fonts across all visual content — deviation signals inconsistency.</p>
          <p className="text-zinc-300 mb-3"><strong className="text-white">Profile consistency:</strong> Use identical profile photos and avatars across every platform. Different images on different platforms fragment recognition. Your bio language should also be consistent — same core message, adapted for platform character limits.</p>
          <p className="text-zinc-300 mb-3"><strong className="text-white">Post templates:</strong> Create 3-5 post templates that lock brand elements (logo placement, colors, fonts) while allowing content flexibility. Templates ensure that even when different team members create content, the visual output remains on-brand.</p>
          <p className="text-zinc-300"><strong className="text-white">Video consistency:</strong> Use the same 2-3 second branded intro and outro across all video content on all platforms. This repetition builds instant recognition. When viewers see your intro, their brain should already know whose content they are about to consume.</p>
        </section>

        <section id="integration" className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">14. Integrating Intent and Brand: The Complete System</h2>
          <p className="text-zinc-300 mb-3">The real power emerges when you combine intent analysis with brand consistency into a single system. Here is how the integration works: intent analysis tells you what to say and when to say it, while brand consistency tells you how to say it. Together, they create a social media presence that is both strategically effective and authentically recognizable.</p>
          <p className="text-zinc-300 mb-3">Build your integrated system in four phases. <strong className="text-white">Phase 1: Foundation.</strong> Choose your archetype, define your vocabulary, create visual templates, and establish your tone target. This takes one week of focused work and creates the infrastructure everything else builds on.</p>
          <p className="text-zinc-300 mb-3"><strong className="text-white">Phase 2: Detection.</strong> Implement intent scoring across all platforms. Train your team to recognize the 8 buying signals. Set up alert rules for high-intent interactions. This transforms your social monitoring from passive observation to active opportunity detection.</p>
          <p className="text-zinc-300 mb-3"><strong className="text-white">Phase 3: Response.</strong> Create response templates for each intent level, written in your brand voice. Build nurture sequences that maintain brand consistency across all 3 steps. Establish response time targets for each intent level. Assign high-intent interactions to your best team members.</p>
          <p className="text-zinc-300 mb-3"><strong className="text-white">Phase 4: Optimization.</strong> Run monthly voice audits across all 6 dimensions. Track conversion rates by intent level. A/B test response strategies within brand guidelines. Continuously refine your vocabulary system based on what resonates with your audience.</p>
          <p className="text-zinc-300 mb-3">The brands that master this integration become virtually unstoppable on social media. They respond to the right people, at the right time, in the right way, with the right voice — every single time. This is not a marketing advantage; it is a competitive moat that compounds over time.</p>
          <p className="text-zinc-300">PostCraft AI&apos;s <a href="/intent-analyzer" className="text-violet-400 hover:text-violet-300">Purchase Intent Analyzer</a> and <a href="/brand-checker" className="text-violet-400 hover:text-violet-300">Brand Consistency Checker</a> provide the tools you need to build this system. Start with your brand foundation, add intent detection, and watch your social media transform from a content calendar into a revenue engine.</p>
        </section>

        <footer className="border-t border-zinc-800 pt-8">
          <p className="text-zinc-500 text-sm">Published April 2026 by PostCraft AI. Explore our full suite of <a href="/" className="text-violet-400 hover:text-violet-300">social media tools</a> to build your complete content strategy.</p>
        </footer>
      </article>
    </main>
  );
}
