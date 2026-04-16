import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Social Listening & Crisis Management: The Complete 2026 Guide — PostCraft AI',
  description: 'Master social listening to detect crises before they escalate. Complete guide to brand monitoring, sentiment tracking, crisis response templates, recovery timelines, and prevention strategies.',
  keywords: ['social listening', 'crisis management', 'brand monitoring', 'sentiment tracking', 'crisis response', 'social media crisis', 'brand reputation'],
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Social Listening & Crisis Management: The Complete 2026 Guide',
  description: 'Master social listening to detect crises before they escalate. Complete guide to brand monitoring, sentiment tracking, crisis response templates, recovery timelines, and prevention strategies.',
  datePublished: '2026-04-16',
  dateModified: '2026-04-16',
  author: { '@type': 'Organization', name: 'PostCraft AI' },
  publisher: { '@type': 'Organization', name: 'PostCraft AI', url: 'https://postcraft.ai' },
  mainEntityOfPage: 'https://postcraft.ai/blog/social-listening-crisis-management-guide',
  wordCount: 3200,
  timeRequired: 'PT20M',
};

export default function SocialListeningCrisisGuide() {
  return (
    <main className="min-h-screen px-6 py-20 max-w-3xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <time className="text-xs text-zinc-500">2026-04-16</time>
          <span className="text-xs text-zinc-600">|</span>
          <span className="text-xs text-zinc-500">20 min read</span>
          <span className="text-xs text-zinc-600">|</span>
          <span className="text-xs text-teal-400">Social Intelligence</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">Social Listening & Crisis Management: The Complete 2026 Guide</h1>
        <p className="text-zinc-400 text-lg">From proactive brand monitoring to rapid crisis response — everything you need to protect and grow your brand reputation on social media.</p>
      </div>

      <div className="glass rounded-2xl p-6 mb-10">
        <p className="text-sm font-semibold mb-3">In This Guide</p>
        <ol className="text-sm text-zinc-400 space-y-1 list-decimal list-inside">
          <li>What Is Social Listening (and Why It&apos;s Different from Monitoring)</li>
          <li>The 5 Pillars of Effective Social Listening</li>
          <li>Setting Up Your Social Listening Stack</li>
          <li>Sentiment Analysis Deep Dive</li>
          <li>Competitive Intelligence Through Social Listening</li>
          <li>Crisis Detection: The Early Warning System</li>
          <li>Anatomy of a Social Media Crisis</li>
          <li>The Crisis Response Framework (RACE Model)</li>
          <li>Response Templates by Crisis Type</li>
          <li>Recovery & Reputation Repair</li>
          <li>Prevention: Building Crisis Resilience</li>
          <li>Case Studies & Lessons Learned</li>
        </ol>
      </div>

      <article className="prose-custom space-y-8">
        {/* Section 1 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">1. What Is Social Listening (and Why It&apos;s Different from Monitoring)</h2>
          <p className="text-zinc-400 mb-4">Social media monitoring tells you <em>what</em> people are saying. Social listening tells you <em>why</em> they&apos;re saying it — and what it means for your business. While monitoring tracks mentions, likes, and shares as metrics, social listening analyzes the sentiment, context, and patterns behind those conversations to extract actionable intelligence.</p>
          <p className="text-zinc-400 mb-4">In 2026, the distinction matters more than ever. With AI-powered tools analyzing millions of conversations in real time, brands that listen — not just monitor — gain a decisive competitive advantage:</p>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li className="flex gap-2"><span className="text-teal-400">&#10003;</span> <strong>Monitoring</strong>: &quot;We got 500 mentions this week&quot;</li>
            <li className="flex gap-2"><span className="text-teal-400">&#10003;</span> <strong>Listening</strong>: &quot;Mentions spiked 300% because our competitor&apos;s outage drove users to compare alternatives — and 72% of the conversation is positive about our reliability&quot;</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">2. The 5 Pillars of Effective Social Listening</h2>
          <div className="space-y-4">
            <div className="glass rounded-xl p-5">
              <h3 className="font-semibold mb-2">Pillar 1: Brand Health Monitoring</h3>
              <p className="text-sm text-zinc-400">Track overall brand sentiment, mention volume trends, and share of voice versus competitors. This is your baseline — without it, you can&apos;t detect anomalies that signal opportunities or threats.</p>
            </div>
            <div className="glass rounded-xl p-5">
              <h3 className="font-semibold mb-2">Pillar 2: Audience Intelligence</h3>
              <p className="text-sm text-zinc-400">Understand who&apos;s talking about you: demographics, psychographics, platform preferences, and peak activity times. Use tools like <a href="/persona-builder" className="text-teal-400 hover:underline">PostCraft&apos;s Persona Builder</a> to translate this data into actionable audience profiles.</p>
            </div>
            <div className="glass rounded-xl p-5">
              <h3 className="font-semibold mb-2">Pillar 3: Competitive Intelligence</h3>
              <p className="text-sm text-zinc-400">Monitor competitor mentions, product launches, and customer complaints. Your <a href="/competitor-analysis" className="text-teal-400 hover:underline">Competitor Analysis</a> should include share of voice tracking and sentiment comparison.</p>
            </div>
            <div className="glass rounded-xl p-5">
              <h3 className="font-semibold mb-2">Pillar 4: Trend Detection</h3>
              <p className="text-sm text-zinc-400">Identify emerging topics, hashtags, and conversations relevant to your industry before they peak. <a href="/trend-tracker" className="text-teal-400 hover:underline">Trend tracking</a> gives you a 24-48 hour head start on content creation.</p>
            </div>
            <div className="glass rounded-xl p-5">
              <h3 className="font-semibold mb-2">Pillar 5: Crisis Early Warning</h3>
              <p className="text-sm text-zinc-400">The most critical pillar. Set up alerts for sudden sentiment shifts, unusual mention volumes, and specific keywords that indicate brewing trouble. Every hour of early detection reduces crisis damage by approximately 15%.</p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">3. Setting Up Your Social Listening Stack</h2>
          <p className="text-zinc-400 mb-4">An effective social listening setup covers three layers:</p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm">
              <thead><tr className="text-zinc-500 text-xs uppercase"><th className="text-left py-2">Layer</th><th className="text-left py-2">Purpose</th><th className="text-left py-2">Key Metrics</th></tr></thead>
              <tbody>
                <tr className="border-t border-zinc-800"><td className="py-3 text-zinc-300">Data Collection</td><td className="py-3 text-zinc-400">Aggregate mentions from all platforms</td><td className="py-3 text-zinc-400">Volume, sources, reach</td></tr>
                <tr className="border-t border-zinc-800"><td className="py-3 text-zinc-300">Analysis</td><td className="py-3 text-zinc-400">NLP sentiment, topic clustering, intent detection</td><td className="py-3 text-zinc-400">Sentiment score, themes, urgency</td></tr>
                <tr className="border-t border-zinc-800"><td className="py-3 text-zinc-300">Action</td><td className="py-3 text-zinc-400">Alerts, reports, response workflows</td><td className="py-3 text-zinc-400">Response time, resolution rate</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-zinc-400">Use <a href="/social-listening" className="text-teal-400 hover:underline">PostCraft&apos;s Social Listening Dashboard</a> to set up all three layers in minutes — monitoring 7 platforms with AI-powered sentiment analysis and automated alerts.</p>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">4. Sentiment Analysis Deep Dive</h2>
          <p className="text-zinc-400 mb-4">Modern sentiment analysis goes far beyond positive/negative binary classification. In 2026, leading tools analyze:</p>
          <ul className="space-y-2 text-sm text-zinc-400 mb-4">
            <li className="flex gap-2"><span className="text-teal-400">&#8226;</span> <strong>Emotional dimensions</strong>: Joy, trust, urgency, curiosity, empathy, authority, FOMO, inspiration (see <a href="/sentiment-analyzer" className="text-teal-400 hover:underline">Sentiment Analyzer</a>)</li>
            <li className="flex gap-2"><span className="text-teal-400">&#8226;</span> <strong>Contextual sentiment</strong>: Understanding sarcasm, irony, and cultural nuance</li>
            <li className="flex gap-2"><span className="text-teal-400">&#8226;</span> <strong>Intent classification</strong>: Is this a complaint, a question, praise, or a purchase signal?</li>
            <li className="flex gap-2"><span className="text-teal-400">&#8226;</span> <strong>Velocity tracking</strong>: How fast is sentiment changing? A 10% drop over a week is different from a 10% drop in an hour</li>
          </ul>
          <p className="text-zinc-400">The key insight: absolute sentiment score matters less than the <em>rate of change</em>. A brand with 60% positive sentiment that&apos;s been stable for months is in better shape than one at 75% that dropped from 90% last week.</p>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">5. Competitive Intelligence Through Social Listening</h2>
          <p className="text-zinc-400 mb-4">Social listening is one of the most powerful (and underused) competitive intelligence tools available. What to track:</p>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li className="flex gap-2"><span className="text-teal-400">1.</span> <strong>Share of Voice</strong>: What percentage of industry conversations mention your brand vs. competitors?</li>
            <li className="flex gap-2"><span className="text-teal-400">2.</span> <strong>Competitor Complaints</strong>: What are customers unhappy about with competitors? These are your content and product opportunities.</li>
            <li className="flex gap-2"><span className="text-teal-400">3.</span> <strong>Feature Requests</strong>: What are people asking competitors for? Build it first.</li>
            <li className="flex gap-2"><span className="text-teal-400">4.</span> <strong>Sentiment Gaps</strong>: Where is competitor sentiment weakest? Position your brand as the alternative.</li>
          </ul>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">6. Crisis Detection: The Early Warning System</h2>
          <p className="text-zinc-400 mb-4">A social media crisis doesn&apos;t appear out of nowhere. There are always warning signs — the question is whether you&apos;re equipped to detect them. Key early warning indicators:</p>
          <div className="glass rounded-xl p-5 mb-4">
            <h3 className="font-semibold text-red-400 mb-3">Red Alert Triggers</h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>Mention volume spike &gt; 200% above 7-day average</li>
              <li>Negative sentiment ratio exceeds 40% (vs. normal &lt; 15%)</li>
              <li>Media or journalist accounts start engaging with negative threads</li>
              <li>Branded hashtag hijacked with negative content</li>
              <li>Customer support ticket volume doubles within 2 hours</li>
              <li>Influencer with &gt; 50K followers posts negative content about your brand</li>
            </ul>
          </div>
          <p className="text-zinc-400">Configure your <a href="/social-listening" className="text-teal-400 hover:underline">Social Listening Dashboard</a> to trigger instant alerts when any of these thresholds are breached.</p>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">7. Anatomy of a Social Media Crisis</h2>
          <p className="text-zinc-400 mb-4">Every crisis follows a predictable lifecycle. Understanding the stages helps you respond appropriately at each phase:</p>
          <div className="space-y-3">
            {[
              ['Stage 1: Trigger', '0-1 hour', 'An incident occurs — product failure, bad PR, viral complaint. Initial mentions are low but the content is emotionally charged.'],
              ['Stage 2: Amplification', '1-4 hours', 'Early mentions get shared and commented on. Influencers and media start paying attention. Negative sentiment accelerates.'],
              ['Stage 3: Peak', '4-24 hours', 'Maximum visibility. Mainstream media coverage, trending hashtags, maximum negative sentiment. This is where most brand damage occurs.'],
              ['Stage 4: Plateau', '1-3 days', 'Conversation volume remains high but growth stops. New angles emerge. Brand response (or lack thereof) becomes part of the story.'],
              ['Stage 5: Decline', '3-14 days', 'Attention shifts to other topics. Sentiment begins recovering if the response was adequate. Long-tail conversations continue.'],
            ].map(([stage, time, desc]) => (
              <div key={stage} className="glass rounded-xl p-4">
                <div className="flex items-center justify-between mb-2"><h3 className="font-semibold text-sm">{stage}</h3><span className="text-xs text-zinc-500">{time}</span></div>
                <p className="text-xs text-zinc-400">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 8 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">8. The Crisis Response Framework (RACE Model)</h2>
          <p className="text-zinc-400 mb-4">Use the RACE model for structured crisis response:</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="glass rounded-xl p-5"><h3 className="font-semibold text-red-400 mb-2">R — Recognize</h3><p className="text-sm text-zinc-400">Acknowledge the situation immediately. &quot;We&apos;re aware and investigating.&quot; This buys you time while showing you&apos;re engaged. Aim for under 30 minutes.</p></div>
            <div className="glass rounded-xl p-5"><h3 className="font-semibold text-orange-400 mb-2">A — Assess</h3><p className="text-sm text-zinc-400">Evaluate severity: How many affected? What&apos;s the reach? Is media involved? Activate the appropriate response level (1-4).</p></div>
            <div className="glass rounded-xl p-5"><h3 className="font-semibold text-yellow-400 mb-2">C — Communicate</h3><p className="text-sm text-zinc-400">Deploy stakeholder-specific messages using pre-approved templates. Customers, employees, investors, and media all need different communications.</p></div>
            <div className="glass rounded-xl p-5"><h3 className="font-semibold text-green-400 mb-2">E — Evaluate</h3><p className="text-sm text-zinc-400">Post-crisis debrief. What worked? What didn&apos;t? Update your playbook. Track sentiment recovery over 30-90 days.</p></div>
          </div>
          <p className="text-zinc-400 mt-4">Use <a href="/crisis-management" className="text-red-400 hover:underline">PostCraft&apos;s Crisis Management Toolkit</a> to generate a complete RACE-based response plan with templates, timelines, and stakeholder communication plans.</p>
        </section>

        {/* Section 9 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">9. Response Templates by Crisis Type</h2>
          <p className="text-zinc-400 mb-4">Every crisis type requires a different communication approach. Here are the key principles by category:</p>
          <div className="space-y-3">
            <div className="glass rounded-xl p-4"><h3 className="font-semibold text-sm mb-1">Product Failure/Outage</h3><p className="text-xs text-zinc-400">Lead with the impact on users, not technical details. &quot;We know this affected your [workflow/experience]. Here&apos;s what we&apos;re doing...&quot;</p></div>
            <div className="glass rounded-xl p-4"><h3 className="font-semibold text-sm mb-1">Data Breach</h3><p className="text-xs text-zinc-400">Transparency is non-negotiable. Disclose what was affected, what you&apos;re doing, and what users should do. Legal compliance (GDPR, CCPA) dictates timing.</p></div>
            <div className="glass rounded-xl p-4"><h3 className="font-semibold text-sm mb-1">Viral Complaint</h3><p className="text-xs text-zinc-400">Respond publicly, then move to DM. Show empathy first, then resolve. Never argue in public threads.</p></div>
            <div className="glass rounded-xl p-4"><h3 className="font-semibold text-sm mb-1">Employee Misconduct</h3><p className="text-xs text-zinc-400">Separate the individual from the brand. State your values clearly. &quot;This does not reflect who we are. We&apos;re taking [specific action].&quot;</p></div>
          </div>
        </section>

        {/* Section 10 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">10. Recovery & Reputation Repair</h2>
          <p className="text-zinc-400 mb-4">The crisis is contained. Now what? Recovery is where most brands fail — they stop communicating too soon. The 30-60-90 day recovery plan:</p>
          <div className="glass rounded-xl p-5">
            <div className="space-y-4">
              <div><h3 className="font-semibold text-sm text-green-400">Days 1-30: Stabilize</h3><p className="text-xs text-zinc-400">Publish a post-mortem (transparency builds trust). Resume normal content gradually. Continue monitoring at 2x normal frequency. Respond to every mention — positive and negative.</p></div>
              <div><h3 className="font-semibold text-sm text-blue-400">Days 31-60: Rebuild</h3><p className="text-xs text-zinc-400">Launch a goodwill campaign (customer spotlights, community initiatives). Share progress on prevention measures. Partner with trusted <a href="/influencer-score" className="text-teal-400 hover:underline">influencers</a> for authentic endorsements.</p></div>
              <div><h3 className="font-semibold text-sm text-purple-400">Days 61-90: Strengthen</h3><p className="text-xs text-zinc-400">Use <a href="/engagement-calculator" className="text-teal-400 hover:underline">engagement metrics</a> to verify recovery. Reactivate growth campaigns. Document everything in your crisis playbook for next time.</p></div>
            </div>
          </div>
        </section>

        {/* Section 11 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">11. Prevention: Building Crisis Resilience</h2>
          <p className="text-zinc-400 mb-4">The best crisis management is prevention. Build resilience with these practices:</p>
          <ol className="space-y-3 text-sm text-zinc-400">
            <li className="flex gap-2"><span className="text-teal-400 font-bold">1.</span> <strong>Quarterly crisis drills</strong>: Simulate different crisis scenarios with your team. Time your response. Identify gaps.</li>
            <li className="flex gap-2"><span className="text-teal-400 font-bold">2.</span> <strong>Pre-approved template library</strong>: Have response templates ready for the 8 most common crisis types (use <a href="/crisis-management" className="text-red-400 hover:underline">Crisis Management Toolkit</a>).</li>
            <li className="flex gap-2"><span className="text-teal-400 font-bold">3.</span> <strong>Always-on social listening</strong>: Continuous monitoring catches problems at the &quot;spark&quot; stage, not the &quot;fire&quot; stage.</li>
            <li className="flex gap-2"><span className="text-teal-400 font-bold">4.</span> <strong>Brand voice consistency</strong>: A strong <a href="/brand-voice" className="text-teal-400 hover:underline">brand voice</a> provides guardrails that prevent tone-deaf responses.</li>
            <li className="flex gap-2"><span className="text-teal-400 font-bold">5.</span> <strong>Positive content bank</strong>: Maintain a library of customer stories, UGC, and testimonials ready to deploy during recovery.</li>
            <li className="flex gap-2"><span className="text-teal-400 font-bold">6.</span> <strong>Stakeholder contact list</strong>: Know exactly who needs to be contacted for each severity level, and how.</li>
          </ol>
        </section>

        {/* Section 12 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">12. Key Takeaways</h2>
          <div className="glass rounded-xl p-5">
            <ul className="space-y-2 text-sm text-zinc-400">
              <li className="flex gap-2"><span className="text-teal-400">&#10003;</span> Social listening is your early warning system — invest in it before you need it</li>
              <li className="flex gap-2"><span className="text-teal-400">&#10003;</span> Every crisis follows a predictable lifecycle (Trigger → Amplification → Peak → Plateau → Decline)</li>
              <li className="flex gap-2"><span className="text-teal-400">&#10003;</span> The RACE framework (Recognize, Assess, Communicate, Evaluate) provides structure under pressure</li>
              <li className="flex gap-2"><span className="text-teal-400">&#10003;</span> Response speed matters more than response perfection — acknowledge within 30 minutes</li>
              <li className="flex gap-2"><span className="text-teal-400">&#10003;</span> Recovery takes 60-90 days — don&apos;t stop communicating after the crisis fades from headlines</li>
              <li className="flex gap-2"><span className="text-teal-400">&#10003;</span> Prevention through drills, templates, and continuous monitoring reduces crisis impact by up to 60%</li>
            </ul>
          </div>
        </section>
      </article>

      {/* CTA */}
      <div className="mt-12 glass rounded-2xl p-8 text-center">
        <h2 className="text-xl font-bold mb-3">Protect Your Brand Today</h2>
        <p className="text-zinc-400 mb-6 max-w-md mx-auto">Set up social listening and crisis preparedness before you need it. PostCraft&apos;s tools give you the intelligence and templates to respond instantly.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href="/social-listening" className="px-6 py-3 btn-primary rounded-xl font-semibold text-white text-sm">Start Social Listening</a>
          <a href="/crisis-management" className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl font-semibold text-white text-sm transition">Crisis Toolkit</a>
        </div>
      </div>

      {/* Internal Links */}
      <div className="mt-8 text-center">
        <p className="text-sm text-zinc-500 mb-3">Related Articles & Tools</p>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            ['/social-listening', 'Social Listening Dashboard'],
            ['/crisis-management', 'Crisis Management Toolkit'],
            ['/sentiment-analyzer', 'Sentiment Analyzer'],
            ['/competitor-analysis', 'Competitor Analysis'],
            ['/trend-tracker', 'Trend Tracker'],
            ['/brand-voice', 'Brand Voice Generator'],
            ['/social-audit', 'Social Media Audit'],
            ['/engagement-calculator', 'Engagement Calculator'],
          ].map(([href, label]) => (
            <a key={href} href={href} className="text-xs text-teal-400 hover:text-teal-300 transition underline underline-offset-2">{label}</a>
          ))}
        </div>
      </div>
    </main>
  );
}
