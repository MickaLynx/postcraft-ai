'use client';
import { useState } from 'react';

const niches = ['Tech', 'Marketing', 'Finance', 'Health', 'E-commerce', 'SaaS', 'Fitness', 'Education', 'AI/ML', 'Design', 'Crypto', 'Productivity'] as const;
const frequencies = ['Daily', 'Weekly', 'Bi-weekly', 'Monthly'] as const;
const formats = ['Curated Links', 'Deep Dive', 'News Roundup', 'Tutorial/How-To', 'Case Study', 'Industry Digest'] as const;
const tones = ['Professional', 'Conversational', 'Witty & Playful', 'Data-Driven', 'Storytelling', 'Direct & Punchy'] as const;
const platforms = ['Substack', 'Beehiiv', 'ConvertKit', 'Mailchimp', 'Ghost', 'Buttondown', 'Revue'] as const;
const audienceSizes = ['0-500', '500-2K', '2K-10K', '10K-50K', '50K+'] as const;

interface SubjectLine {
  line: string;
  style: string;
  predictedOpenRate: number;
}

interface NewsletterSection {
  title: string;
  description: string;
  wordCount: string;
  contentTip: string;
}

interface GrowthTactic {
  tactic: string;
  effort: 'Low' | 'Medium' | 'High';
  expectedGrowth: string;
  timeToResult: string;
  howTo: string;
}

interface MonetizationPath {
  method: string;
  subscribersNeeded: string;
  revenueRange: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  firstStep: string;
}

interface WelcomeEmail {
  subject: string;
  preheader: string;
  bodyPreview: string;
  ctaText: string;
}

interface ContentBlock {
  heading: string;
  body: string;
  internalLink: string;
}

interface NewsletterResult {
  subjectLines: SubjectLine[];
  sections: NewsletterSection[];
  issueOutline: ContentBlock[];
  growthTactics: GrowthTactic[];
  monetization: MonetizationPath[];
  welcomeEmail: WelcomeEmail;
  deliverabilityTips: string[];
  segmentationIdeas: string[];
}

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function pick<T>(arr: readonly T[] | T[], seed: number, idx: number = 0): T {
  return arr[(seed + idx) % arr.length];
}

function generateNewsletter(niche: string, frequency: string, format: string, tone: string, platform: string, audience: string): NewsletterResult {
  const seed = hash(`${niche}-${frequency}-${format}-${tone}-${platform}-${audience}`);

  const subjectLines: SubjectLine[] = [
    { line: `The ${niche} Signal: What Actually Matters This ${frequency === 'Daily' ? 'Morning' : 'Week'}`, style: 'Curiosity Gap', predictedOpenRate: 38 + seed % 12 },
    { line: `${seed % 2 === 0 ? '🔥' : '⚡'} ${3 + seed % 5} ${niche} Trends You Can't Ignore Right Now`, style: 'Urgency + Number', predictedOpenRate: 42 + seed % 10 },
    { line: `Why ${72 + seed % 20}% of ${niche} Professionals Are Wrong About This`, style: 'Contrarian', predictedOpenRate: 35 + seed % 15 },
    { line: `Inside Look: How Top ${niche} Teams Actually Work`, style: 'Exclusive Access', predictedOpenRate: 40 + seed % 8 },
    { line: `The ${frequency} ${niche} Briefing — Issue #${100 + seed % 200}`, style: 'Consistent Branding', predictedOpenRate: 32 + seed % 10 },
    { line: `I Tested ${3 + seed % 4} ${niche} Strategies So You Don't Have To`, style: 'Personal Experience', predictedOpenRate: 44 + seed % 8 },
  ];

  const sections: NewsletterSection[] = [
    { title: 'The Hook / Opening', description: `A punchy ${tone.toLowerCase()} opener that sets the theme. Reference a trending ${niche.toLowerCase()} topic or personal anecdote.`, wordCount: '50-100 words', contentTip: 'Write this last — it should preview the best content in the issue.' },
    { title: 'Main Feature', description: `The ${format.toLowerCase()} core — your deepest, most valuable ${niche.toLowerCase()} insight. This is why people subscribed.`, wordCount: '300-600 words', contentTip: `For ${format}, use a clear narrative arc: problem → insight → application.` },
    { title: 'Quick Hits / Links', description: `${3 + seed % 3} curated ${niche.toLowerCase()} links with 1-2 sentence commentary on each. Add your unique take.`, wordCount: '150-250 words', contentTip: 'Don\'t just summarize — tell readers why each link matters to them specifically.' },
    { title: 'Actionable Takeaway', description: 'One concrete thing readers can do this week based on the main feature. Be specific and time-bound.', wordCount: '50-100 words', contentTip: 'Frame it as "Your action item this week: [specific task]" — people love clear instructions.' },
    { title: 'Community Spotlight / Reader Q&A', description: `Feature a reader question, poll result, or community highlight. Builds loyalty and engagement.`, wordCount: '50-150 words', contentTip: 'Ask a question at the end to generate replies — replies boost deliverability.' },
    { title: 'Closing + CTA', description: 'Brief sign-off with a forward or share CTA. Keep it warm and on-brand.', wordCount: '30-50 words', contentTip: `On ${platform}, the share/refer CTA placement here converts 2-3x better than mid-content.` },
  ];

  const issueOutline: ContentBlock[] = [
    { heading: `${niche} Market Pulse`, body: `Open with the biggest ${niche.toLowerCase()} development this ${frequency === 'Daily' ? 'day' : 'week'}. Use a single stat or quote to hook attention. Transition into why this matters for your readers' day-to-day work.`, internalLink: '/trend-tracker' },
    { heading: `Deep Dive: ${pick(['The Hidden Cost of', 'Why Nobody Talks About', 'The Counterintuitive Truth About', 'What I Learned From'], seed, 0)} ${niche} ${pick(['Automation', 'Growth', 'Strategy', 'Tools'], seed, 1)}`, body: `Your main ${format.toLowerCase()} piece. Start with a surprising fact, walk through ${2 + seed % 3} key points with examples, and end with a clear recommendation. Use subheadings every 150 words.`, internalLink: '/content-pillars' },
    { heading: 'Tool of the ${frequency === "Daily" ? "Day" : "Week"}', body: `Feature one ${niche.toLowerCase()} tool with a mini-review: what it does, who it's for, pricing, and your honest take. Include an affiliate link if applicable.`, internalLink: '/content-brief' },
    { heading: 'Reader Spotlight', body: 'Share a reader success story, interesting reply from last issue, or poll results. This section drives the highest reply rates and builds community.', internalLink: '/community-manager' },
    { heading: 'This Week\'s Action Item', body: `One specific, actionable task related to the main feature. Format: "This week, try [X]. Here's exactly how: [steps]." Keep it achievable in 30 minutes or less.`, internalLink: '/content-calendar' },
  ];

  const growthTactics: GrowthTactic[] = [
    { tactic: 'Cross-Promotion Swaps', effort: 'Medium', expectedGrowth: '+200-500 subs/swap', timeToResult: '1-2 weeks', howTo: `Find 5 newsletters in adjacent ${niche.toLowerCase()} niches with similar subscriber counts. Propose a mutual recommendation — you feature them, they feature you. Use SparkLoop or manual outreach.` },
    { tactic: 'Twitter/X Thread → Newsletter Funnel', effort: 'High', expectedGrowth: '+50-200 subs/thread', timeToResult: '1-3 days per thread', howTo: `Turn your best newsletter content into Twitter threads. End with "I go deeper on this in my newsletter — link in bio." Repurpose ${frequency.toLowerCase()} with the social media tools.` },
    { tactic: `${platform} Referral Program`, effort: 'Low', expectedGrowth: '+10-30% organic growth', timeToResult: '2-4 weeks', howTo: `${platform === 'Beehiiv' || platform === 'Substack' ? 'Enable built-in referral program' : 'Set up SparkLoop or ReferralHero'}. Offer milestone rewards: 3 referrals = bonus content, 10 = exclusive access.` },
    { tactic: 'SEO Blog Posts → Signup', effort: 'High', expectedGrowth: '+100-500 subs/month', timeToResult: '2-3 months', howTo: `Write 4-6 SEO-optimized blog posts on ${niche.toLowerCase()} topics with high search volume. Embed newsletter signup forms throughout. Target "best ${niche.toLowerCase()} newsletter" keywords.` },
    { tactic: 'LinkedIn Carousel Repurposing', effort: 'Medium', expectedGrowth: '+30-100 subs/post', timeToResult: '1-7 days', howTo: `Turn newsletter insights into LinkedIn carousels. Each slide = one key takeaway. Last slide: "Get this analysis weekly → [newsletter link]."` },
    { tactic: 'Podcast Guest Appearances', effort: 'Medium', expectedGrowth: '+50-300 subs/episode', timeToResult: '2-6 weeks', howTo: `Pitch yourself as a ${niche.toLowerCase()} expert to podcasts in your space. Prepare a compelling CTA: "Get my weekly ${niche.toLowerCase()} analysis free at [URL]."` },
  ];

  const sizeMultiplier: Record<string, number> = { '0-500': 0.5, '500-2K': 1, '2K-10K': 3, '10K-50K': 10, '50K+': 30 };
  const mult = sizeMultiplier[audience] || 1;

  const monetization: MonetizationPath[] = [
    { method: 'Sponsorship / Ads', subscribersNeeded: '2,000+', revenueRange: `$${Math.round(50 * mult)}-$${Math.round(200 * mult)}/issue`, difficulty: 'Medium', firstStep: 'Create a media kit with open rates, click rates, and audience demographics. Reach out to 10 brands in your niche.' },
    { method: 'Paid Subscription Tier', subscribersNeeded: '1,000+ free', revenueRange: `$${Math.round(100 * mult)}-$${Math.round(500 * mult)}/month`, difficulty: 'Medium', firstStep: `${platform === 'Substack' || platform === 'Ghost' ? 'Enable paid subscriptions and offer a premium deep-dive weekly' : 'Set up Stripe integration and gate exclusive content'}.` },
    { method: 'Affiliate Revenue', subscribersNeeded: '500+', revenueRange: `$${Math.round(30 * mult)}-$${Math.round(150 * mult)}/month`, difficulty: 'Easy', firstStep: `Join affiliate programs for ${niche.toLowerCase()} tools (Partnerstack, Impact). Naturally weave recommendations into your "Tool of the Week" section.` },
    { method: 'Digital Products', subscribersNeeded: '2,000+', revenueRange: `$${Math.round(200 * mult)}-$${Math.round(1000 * mult)}/launch`, difficulty: 'Hard', firstStep: `Survey your audience on their biggest ${niche.toLowerCase()} challenge. Package your expertise into a PDF guide, template pack, or mini-course.` },
    { method: 'Consulting Leads', subscribersNeeded: '500+', revenueRange: `$${Math.round(500 * mult)}-$${Math.round(3000 * mult)}/client`, difficulty: 'Easy', firstStep: `Add a subtle "Work with me" section. Your newsletter is the best proof of ${niche.toLowerCase()} expertise — let it generate inbound leads.` },
  ];

  const welcomeEmail: WelcomeEmail = {
    subject: `Welcome to [Newsletter Name] — Here's What to Expect`,
    preheader: `You're in! Here's what ${audience === '50K+' ? '50,000+' : 'thousands of'} ${niche.toLowerCase()} professionals read every ${frequency.toLowerCase()}.`,
    bodyPreview: `Hey [First Name],\n\nWelcome aboard! You've just joined the ${niche.toLowerCase()} newsletter that ${audience === '50K+' ? '50,000+' : audience} professionals trust for ${format.toLowerCase()} content every ${frequency.toLowerCase()}.\n\nHere's what you can expect:\n• ${sections[1].title}: ${sections[1].description.split('.')[0]}\n• ${sections[2].title}: ${sections[2].description.split('.')[0]}\n• ${sections[3].title}: ${sections[3].description.split('.')[0]}\n\nTo make sure you never miss an issue, move this email to your Primary tab and add [email] to your contacts.\n\nHit reply and tell me: what's your biggest ${niche.toLowerCase()} challenge right now? I read every response.\n\nSee you ${frequency === 'Daily' ? 'tomorrow' : frequency === 'Weekly' ? 'next week' : 'soon'},\n[Your Name]`,
    ctaText: `Read Our Most Popular Issue →`,
  };

  const deliverabilityTips = [
    `Warm up your ${platform} sending domain — start with your most engaged subscribers for the first 2 weeks`,
    'Ask new subscribers to reply to the welcome email — replies signal "not spam" to inbox providers',
    'Keep your subject line under 50 characters — longer subjects get clipped on mobile',
    `Clean your list every 90 days — remove subscribers who haven't opened in ${frequency === 'Daily' ? '30' : '60'} days`,
    'Avoid spam trigger words: "free," "guaranteed," "act now" in subject lines',
    `Send at a consistent time — ${frequency === 'Daily' ? '7-8 AM' : frequency === 'Weekly' ? 'Tuesday or Thursday 10 AM' : 'First Tuesday of the month 10 AM'} in your audience's timezone`,
    'Use plain text or minimal HTML — text-heavy emails have 20-30% higher deliverability',
    'Include an unsubscribe link at the top, not just the bottom — it reduces spam complaints by 40%',
  ];

  const segmentationIdeas = [
    `By ${niche.toLowerCase()} sub-interest: split your list by topic preference (e.g., strategy vs. tactics vs. tools)`,
    'By engagement level: create VIP segment for top 20% openers — send them early access or bonus content',
    'By signup source: customize content based on whether they came from Twitter, SEO, or referral',
    `By experience level: beginner vs. advanced ${niche.toLowerCase()} content tracks`,
    'By purchase intent: track link clicks on product recommendations to identify buyers',
    `By ${frequency.toLowerCase()} engagement pattern: some readers engage with every issue, others only monthly — adjust frequency accordingly`,
  ];

  return { subjectLines, sections, issueOutline, growthTactics, monetization, welcomeEmail, deliverabilityTips, segmentationIdeas };
}

export default function NewsletterGenPage() {
  const [niche, setNiche] = useState<string>(niches[0]);
  const [frequency, setFrequency] = useState<string>(frequencies[1]);
  const [format, setFormat] = useState<string>(formats[0]);
  const [tone, setTone] = useState<string>(tones[0]);
  const [platform, setPlatform] = useState<string>(platforms[0]);
  const [audience, setAudience] = useState<string>(audienceSizes[1]);
  const [result, setResult] = useState<NewsletterResult | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Newsletter Generator</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Generate complete newsletter blueprints with subject lines, section templates, growth tactics, monetization paths, welcome emails, and deliverability tips.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Newsletter Niche</label>
              <select value={niche} onChange={e => setNiche(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                {niches.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Frequency</label>
              <select value={frequency} onChange={e => setFrequency(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                {frequencies.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Content Format</label>
              <select value={format} onChange={e => setFormat(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                {formats.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tone</label>
              <select value={tone} onChange={e => setTone(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                {tones.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Platform</label>
              <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                {platforms.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Subscriber Count</label>
              <select value={audience} onChange={e => setAudience(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                {audienceSizes.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => setResult(generateNewsletter(niche, frequency, format, tone, platform, audience))} className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold text-lg hover:from-emerald-700 hover:to-teal-700 transition-all shadow-md">
            Generate Newsletter Blueprint
          </button>
        </div>

        {result && (
          <div className="space-y-8">
            {/* Subject Lines */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">✉️ Subject Line Ideas</h2>
              <div className="space-y-3">
                {result.subjectLines.map((s, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{s.line}</div>
                      <div className="text-xs text-emerald-600 mt-1">Style: {s.style}</div>
                    </div>
                    <div className="text-center ml-4">
                      <div className="text-lg font-bold text-emerald-700">{s.predictedOpenRate}%</div>
                      <div className="text-xs text-gray-500">Open Rate</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter Structure */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📐 Newsletter Structure</h2>
              <div className="space-y-4">
                {result.sections.map((s, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-900">{i + 1}. {s.title}</h3>
                      <span className="text-xs px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full font-medium">{s.wordCount}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{s.description}</p>
                    <p className="text-xs text-teal-600 italic">Tip: {s.contentTip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sample Issue Outline */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📝 Sample Issue Outline</h2>
              <div className="space-y-4">
                {result.issueOutline.map((block, i) => (
                  <div key={i} className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                    <h3 className="font-bold text-gray-900 mb-2">{block.heading}</h3>
                    <p className="text-sm text-gray-600 mb-2">{block.body}</p>
                    <a href={block.internalLink} className="text-xs text-emerald-600 hover:text-emerald-800 font-medium">Use {block.internalLink.replace('/', '')} tool →</a>
                  </div>
                ))}
              </div>
            </div>

            {/* Growth Tactics */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🚀 Growth Tactics</h2>
              <div className="space-y-4">
                {result.growthTactics.map((g, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-900">{g.tactic}</h3>
                      <div className="flex gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${g.effort === 'Low' ? 'bg-green-100 text-green-700' : g.effort === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{g.effort} effort</span>
                        <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full font-semibold">{g.expectedGrowth}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{g.howTo}</p>
                    <p className="text-xs text-gray-500">Time to result: {g.timeToResult}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Monetization */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">💰 Monetization Paths</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {result.monetization.map((m, i) => (
                  <div key={i} className={`p-6 rounded-xl border-2 ${i === 0 ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 bg-gray-50'}`}>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{m.method}</h3>
                    <div className="text-xl font-bold text-emerald-700 mb-2">{m.revenueRange}</div>
                    <div className="flex gap-2 mb-3">
                      <span className="text-xs px-2 py-1 bg-gray-200 text-gray-600 rounded-full">{m.subscribersNeeded} subs</span>
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${m.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : m.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{m.difficulty}</span>
                    </div>
                    <p className="text-sm text-gray-600">{m.firstStep}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Welcome Email */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">👋 Welcome Email Template</h2>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="mb-4">
                  <div className="text-sm font-semibold text-emerald-600 mb-1">Subject</div>
                  <div className="font-bold text-gray-900">{result.welcomeEmail.subject}</div>
                </div>
                <div className="mb-4">
                  <div className="text-sm font-semibold text-emerald-600 mb-1">Preheader</div>
                  <div className="text-sm text-gray-600">{result.welcomeEmail.preheader}</div>
                </div>
                <div className="mb-4">
                  <div className="text-sm font-semibold text-emerald-600 mb-1">Body Preview</div>
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">{result.welcomeEmail.bodyPreview}</pre>
                </div>
                <div className="text-center">
                  <span className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold">{result.welcomeEmail.ctaText}</span>
                </div>
              </div>
            </div>

            {/* Deliverability Tips */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📬 Deliverability Tips</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {result.deliverabilityTips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                    <p className="text-sm text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Segmentation Ideas */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🎯 Segmentation Ideas</h2>
              <div className="space-y-3">
                {result.segmentationIdeas.map((idea, i) => (
                  <div key={i} className="p-3 bg-teal-50 rounded-xl border border-teal-100">
                    <p className="text-sm text-gray-700">{idea}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
