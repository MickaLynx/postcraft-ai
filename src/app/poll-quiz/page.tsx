'use client';
import { useState } from 'react';

const platforms = ['Twitter/X', 'LinkedIn', 'Instagram', 'TikTok', 'Facebook', 'YouTube'] as const;
const pollTypes = ['Opinion Poll', 'Knowledge Quiz', 'This or That', 'Would You Rather', 'Prediction Poll', 'Rating Scale', 'Trivia', 'Debate Starter'] as const;
const industries = ['Tech/SaaS', 'Marketing', 'Finance', 'Health/Wellness', 'Education', 'E-commerce', 'Entertainment', 'Food/Beverage', 'Travel', 'Real Estate', 'Fitness', 'General'] as const;
const goals = ['Boost Engagement', 'Market Research', 'Lead Generation', 'Community Building', 'Brand Awareness', 'Content Ideas', 'Product Feedback', 'Audience Segmentation'] as const;

interface PollOption {
  text: string;
  expectedVoteShare: string;
  followUpHook: string;
}

interface PollResult {
  question: string;
  pollType: string;
  options: PollOption[];
  caption: string;
  whyItWorks: string[];
  followUpContent: string[];
  engagementTips: string[];
  platformSpecific: string;
  expectedEngagement: string;
  bestTiming: string;
  hashtags: string[];
  variations: { question: string; angle: string }[];
}

function generatePoll(
  platform: string, topic: string, pollType: string, industry: string,
  goal: string, optionCount: number
): PollResult {
  const typeTemplates: Record<string, { questionTemplate: string; optionStyle: string; engagementMultiplier: number }> = {
    'Opinion Poll': { questionTemplate: 'What\'s your take on [TOPIC]?', optionStyle: 'opinion', engagementMultiplier: 1.8 },
    'Knowledge Quiz': { questionTemplate: 'True or False: [TOPIC] — did you know this?', optionStyle: 'factual', engagementMultiplier: 2.1 },
    'This or That': { questionTemplate: '[OPTION A] or [OPTION B]? (No middle ground!)', optionStyle: 'binary', engagementMultiplier: 2.5 },
    'Would You Rather': { questionTemplate: 'Would you rather [A] or [B]?', optionStyle: 'scenario', engagementMultiplier: 2.3 },
    'Prediction Poll': { questionTemplate: 'What will happen with [TOPIC] by 2027?', optionStyle: 'future', engagementMultiplier: 1.9 },
    'Rating Scale': { questionTemplate: 'How would you rate [TOPIC] on a scale?', optionStyle: 'scale', engagementMultiplier: 1.5 },
    'Trivia': { questionTemplate: 'Pop quiz: What % of [INDUSTRY] professionals [TOPIC]?', optionStyle: 'numbers', engagementMultiplier: 2.0 },
    'Debate Starter': { questionTemplate: 'Hot take: [TOPIC]. Agree or disagree?', optionStyle: 'debate', engagementMultiplier: 2.8 },
  };

  const tt = typeTemplates[pollType] || typeTemplates['Opinion Poll'];
  const question = tt.questionTemplate.replace('[TOPIC]', topic).replace('[INDUSTRY]', industry);

  const optionGenerators: Record<string, (t: string) => PollOption[]> = {
    opinion: (t) => [
      { text: `Strongly agree — ${t} is the future`, expectedVoteShare: '35%', followUpHook: 'Here\'s why the majority agrees...' },
      { text: `It depends on context`, expectedVoteShare: '30%', followUpHook: 'The nuance matters. Let me explain...' },
      { text: `Disagree — overrated hype`, expectedVoteShare: '25%', followUpHook: 'Contrarian take? You\'re not alone.' },
      { text: `Not sure yet — need more data`, expectedVoteShare: '10%', followUpHook: 'Fair! Here are the facts you need...' },
    ],
    factual: (t) => [
      { text: 'True ✅', expectedVoteShare: '45%', followUpHook: `Correct! Here's the data behind ${t}...` },
      { text: 'False ❌', expectedVoteShare: '40%', followUpHook: `Surprising? Here's what most people get wrong...` },
      { text: 'Partially true', expectedVoteShare: '10%', followUpHook: 'The full picture is more nuanced...' },
      { text: 'No idea 🤷', expectedVoteShare: '5%', followUpHook: `No shame! Here's a quick breakdown...` },
    ],
    binary: (t) => [
      { text: `${t} — Option A`, expectedVoteShare: '55%', followUpHook: 'The majority picked A. Here\'s why it wins...' },
      { text: `${t} — Option B`, expectedVoteShare: '45%', followUpHook: 'Close race! Team B makes a strong case...' },
    ],
    scenario: (t) => [
      { text: `Scenario A: The safe choice`, expectedVoteShare: '40%', followUpHook: 'Playing it safe has its advantages...' },
      { text: `Scenario B: The bold move`, expectedVoteShare: '35%', followUpHook: 'Bold moves create the biggest wins...' },
      { text: `Neither — third option`, expectedVoteShare: '15%', followUpHook: 'Creative thinkers always find another way...' },
      { text: `Both! Why choose?`, expectedVoteShare: '10%', followUpHook: 'The "both" crowd is onto something...' },
    ],
    future: (t) => [
      { text: `Major growth — it's going up`, expectedVoteShare: '40%', followUpHook: 'The optimists see the trends...' },
      { text: `Plateau — stays about the same`, expectedVoteShare: '30%', followUpHook: 'Stability isn\'t boring, it\'s realistic...' },
      { text: `Decline — peak has passed`, expectedVoteShare: '20%', followUpHook: 'The skeptics have data too...' },
      { text: `Wildcard — something unexpected`, expectedVoteShare: '10%', followUpHook: 'The biggest shifts come from nowhere...' },
    ],
    scale: (t) => [
      { text: '⭐⭐⭐⭐⭐ Excellent', expectedVoteShare: '25%', followUpHook: 'What makes it 5-star for you?' },
      { text: '⭐⭐⭐⭐ Good', expectedVoteShare: '35%', followUpHook: 'Solid! What would make it perfect?' },
      { text: '⭐⭐⭐ Average', expectedVoteShare: '25%', followUpHook: 'Room for improvement — here\'s how...' },
      { text: '⭐⭐ or below', expectedVoteShare: '15%', followUpHook: 'Tough crowd! Tell us what\'s missing.' },
    ],
    numbers: (t) => [
      { text: 'Under 25%', expectedVoteShare: '20%', followUpHook: 'Lower than you\'d think? Or right on target?' },
      { text: '25-50%', expectedVoteShare: '35%', followUpHook: 'The middle ground is where most guesses land...' },
      { text: '50-75%', expectedVoteShare: '30%', followUpHook: 'Higher than expected? The data tells a story...' },
      { text: 'Over 75%', expectedVoteShare: '15%', followUpHook: 'Go big or go home! Here\'s the real answer...' },
    ],
    debate: (t) => [
      { text: '🔥 Agree 100%', expectedVoteShare: '40%', followUpHook: 'The majority backs this hot take...' },
      { text: '❄️ Disagree completely', expectedVoteShare: '35%', followUpHook: 'Strong opposition! Here\'s their argument...' },
      { text: '🤔 It\'s complicated', expectedVoteShare: '20%', followUpHook: 'The nuanced take often wins long-term...' },
      { text: '😴 Don\'t care', expectedVoteShare: '5%', followUpHook: 'Apathy is data too — here\'s what it means...' },
    ],
  };

  const allOptions = (optionGenerators[tt.optionStyle] || optionGenerators.opinion)(topic);
  const options = allOptions.slice(0, optionCount);

  const platformEngagement: Record<string, { base: number; pollSupport: string; tip: string; timing: string }> = {
    'Twitter/X': { base: 4.5, pollSupport: 'Native polls (up to 4 options, 24h-7d duration)', tip: 'Quote-tweet your own poll with a hot take to boost reach. Pin it.', timing: 'Tue-Thu 9-11am, 12-1pm' },
    'LinkedIn': { base: 3.8, pollSupport: 'Native polls (up to 4 options, 1-2 week duration)', tip: 'Add a paragraph of context BEFORE the poll. Tag people who\'d have strong opinions.', timing: 'Tue-Thu 8-10am, 12pm' },
    'Instagram': { base: 3.2, pollSupport: 'Story polls (2 options) or Quiz stickers (4 options)', tip: 'Use Story polls for quick engagement. Share results in a follow-up post.', timing: 'Tue-Fri 10am-12pm, 7-9pm' },
    'TikTok': { base: 2.8, pollSupport: 'Video polls in comments or text overlay', tip: 'Create a video showing both options, then ask viewers to comment their choice.', timing: 'Mon-Fri 6-9pm, weekends 10am-12pm' },
    'Facebook': { base: 2.5, pollSupport: 'Native polls in Groups and Pages', tip: 'Facebook Group polls get 5x more engagement than Page polls. Post in relevant groups.', timing: 'Wed-Fri 1-3pm' },
    'YouTube': { base: 2.0, pollSupport: 'Community tab polls (up to 5 options)', tip: 'Use Community polls to let subscribers vote on next video topics. Great for retention.', timing: 'Sat-Sun 10am-12pm' },
  };

  const pe = platformEngagement[platform] || platformEngagement['Twitter/X'];
  const expectedRate = (pe.base * tt.engagementMultiplier * 0.5).toFixed(1);

  const whyItWorks = [
    `${pollType}s trigger the "opinion gap" — people can\'t resist sharing their take`,
    `Low friction: tapping a poll takes < 2 seconds, lowering the engagement barrier`,
    `Algorithm boost: polls signal interaction, pushing your post to more feeds`,
    goal === 'Market Research' ? `Doubles as free market research — real data from your exact audience` : `Creates conversation threads that boost comment count`,
    `Follow-up content from results keeps the engagement loop going for days`,
  ];

  const followUpContent = [
    `Results reveal post: "X% of you chose [winning option]. Here's why that matters..."`,
    `Deep-dive thread/carousel breaking down the winning answer`,
    `Contrarian take post: "The minority was actually right. Here's the data..."`,
    `Behind-the-scenes: "I asked this because I'm building [PRODUCT/CONTENT]"`,
    `Weekly poll series: make it recurring for consistent engagement spikes`,
  ];

  const engagementTips = [
    'Post the poll at peak hours, then comment first with your own answer',
    'Share the poll to Stories/DMs to boost initial velocity',
    'Reply to EVERY comment in the first hour — this signals the algorithm',
    'Reveal results with a follow-up post within 24-48h to re-engage voters',
    pollType === 'Debate Starter' ? 'Tag someone who\'d disagree to spark organic debate' : 'Ask voters to explain their choice in comments for deeper engagement',
    'A/B test different question phrasings to optimize engagement rate',
  ];

  const variations = [
    { question: question.replace('?', '... (wrong answers only)?'), angle: 'Humor/meme angle' },
    { question: `If you could only pick ONE: ${topic}`, angle: 'Scarcity/FOMO angle' },
    { question: `Unpopular opinion about ${topic}?`, angle: 'Controversy angle' },
  ];

  const hashtags = [
    '#poll', `#${industry.toLowerCase().replace(/[\s/]+/g, '')}`, `#${topic.replace(/\s+/g, '')}`,
    '#engagement', '#socialmedia', `#${platform.toLowerCase().replace(/[\\/]/g, '')}`,
    '#community', '#question',
  ];

  const caption = `${question}\n\nDrop your answer below 👇 — I'll share the results and my take tomorrow.\n\n${hashtags.slice(0, 5).join(' ')}`;

  return {
    question,
    pollType,
    options,
    caption,
    whyItWorks,
    followUpContent,
    engagementTips,
    platformSpecific: `${platform}: ${pe.pollSupport}. ${pe.tip}`,
    expectedEngagement: `~${expectedRate}% engagement rate (${parseFloat(expectedRate) > 3 ? 'Excellent' : parseFloat(expectedRate) > 2 ? 'Above average' : 'Average'} for ${platform} polls)`,
    bestTiming: pe.timing,
    hashtags,
    variations,
  };
}

export default function PollQuizPage() {
  const [platform, setPlatform] = useState<string>('Twitter/X');
  const [topic, setTopic] = useState('');
  const [pollType, setPollType] = useState<string>('Opinion Poll');
  const [industry, setIndustry] = useState<string>('Tech/SaaS');
  const [goal, setGoal] = useState<string>('Boost Engagement');
  const [optionCount, setOptionCount] = useState(4);
  const [result, setResult] = useState<PollResult | null>(null);

  const handleGenerate = () => {
    if (!topic.trim()) return;
    setResult(generatePoll(platform, topic.trim(), pollType, industry, goal, optionCount));
  };

  return (
    <main className="min-h-screen bg-zinc-950 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Poll & Quiz Creator</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Generate high-engagement polls and quizzes. Polls get <strong className="text-white">2-3x more interactions</strong> than regular posts — the easiest engagement hack.</p>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Platform</label>
            <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {platforms.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Poll Type</label>
            <select value={pollType} onChange={e => setPollType(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {pollTypes.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Industry</label>
            <select value={industry} onChange={e => setIndustry(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {industries.map(i => <option key={i}>{i}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Goal</label>
            <select value={goal} onChange={e => setGoal(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {goals.map(g => <option key={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Number of Options</label>
            <select value={optionCount} onChange={e => setOptionCount(Number(e.target.value))} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {[2, 3, 4].map(n => <option key={n} value={n}>{n} options</option>)}
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-zinc-400 mb-1">Topic / Subject</label>
          <input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g., remote work vs office, AI replacing jobs, best programming language" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600" />
        </div>

        <button onClick={handleGenerate} className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition">
          Generate Poll
        </button>

        {result && (
          <div className="mt-10 space-y-6">
            {/* Poll Preview */}
            <div className="bg-zinc-900 border border-violet-500/30 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">{result.question}</h2>
              <div className="space-y-3">
                {result.options.map((opt, i) => (
                  <div key={i} className="bg-zinc-800 rounded-lg p-4 flex justify-between items-center">
                    <span className="text-white">{opt.text}</span>
                    <span className="text-zinc-500 text-sm">{opt.expectedVoteShare}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-zinc-500 mt-3">Expected vote distribution based on topic sentiment analysis</p>
            </div>

            {/* Caption */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-2">Ready-to-Post Caption</h3>
              <pre className="text-zinc-300 text-sm whitespace-pre-wrap font-sans">{result.caption}</pre>
            </div>

            {/* Why It Works + Tips */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Why This Works</h3>
                <ul className="space-y-2">
                  {result.whyItWorks.map((w, i) => (
                    <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-green-400">✓</span>{w}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Engagement Tips</h3>
                <ul className="space-y-2">
                  {result.engagementTips.map((t, i) => (
                    <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-violet-400">{i + 1}.</span>{t}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Follow-up Content */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Follow-Up Content Ideas (Post-Poll)</h3>
              <ul className="space-y-2">
                {result.followUpContent.map((f, i) => (
                  <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-fuchsia-400">→</span>{f}</li>
                ))}
              </ul>
            </div>

            {/* Platform & Metrics */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h4 className="text-sm text-zinc-400 mb-1">Platform</h4>
                <p className="text-white text-sm">{result.platformSpecific}</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h4 className="text-sm text-zinc-400 mb-1">Expected Engagement</h4>
                <p className="text-green-400 font-medium text-sm">{result.expectedEngagement}</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h4 className="text-sm text-zinc-400 mb-1">Best Timing</h4>
                <p className="text-white text-sm">{result.bestTiming}</p>
              </div>
            </div>

            {/* Variations */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Question Variations</h3>
              <div className="space-y-3">
                {result.variations.map((v, i) => (
                  <div key={i} className="flex justify-between items-center bg-zinc-800 rounded-lg p-3">
                    <span className="text-zinc-300 text-sm">{v.question}</span>
                    <span className="text-xs text-violet-400 ml-3 whitespace-nowrap">{v.angle}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hashtags */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Suggested Hashtags</h3>
              <div className="flex flex-wrap gap-2">
                {result.hashtags.map((h, i) => (
                  <span key={i} className="bg-zinc-800 text-violet-300 text-sm px-3 py-1 rounded-full">{h}</span>
                ))}
              </div>
            </div>

            {/* Internal Links */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-zinc-400 mb-3">Boost Your Poll Performance</h3>
              <div className="flex flex-wrap gap-2 text-sm">
                <a href="/hooks" className="text-violet-400 hover:text-violet-300 underline">Hook Generator</a>
                <a href="/engagement-calculator" className="text-violet-400 hover:text-violet-300 underline">Engagement Calculator</a>
                <a href="/post-timing" className="text-violet-400 hover:text-violet-300 underline">Post Timing</a>
                <a href="/hashtags" className="text-violet-400 hover:text-violet-300 underline">Hashtag Generator</a>
                <a href="/carousel-generator" className="text-violet-400 hover:text-violet-300 underline">Carousel Generator</a>
                <a href="/virality-score" className="text-violet-400 hover:text-violet-300 underline">Virality Score</a>
                <a href="/repurpose" className="text-violet-400 hover:text-violet-300 underline">Content Repurposer</a>
                <a href="/trend-tracker" className="text-violet-400 hover:text-violet-300 underline">Trend Tracker</a>
              </div>
            </div>
          </div>
        )}

        {/* FAQ */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">Poll & Quiz FAQ</h2>
          <div className="space-y-4">
            {[
              { q: 'Which poll type gets the most engagement?', a: 'Debate Starters and "This or That" polls consistently get 2.5-2.8x more engagement than regular posts. Hot takes polarize — and polarization drives comments, shares, and saves.' },
              { q: 'How many options should a poll have?', a: '2 options for maximum engagement (forces a choice). 4 options for market research (more nuanced data). Twitter/X and LinkedIn support up to 4. Instagram Stories support 2 (Poll sticker) or 4 (Quiz sticker).' },
              { q: 'What should I do with poll results?', a: 'Always create follow-up content! Share results with your analysis, create a thread/carousel breaking down the winning answer, or use the data to inform your next product/content decision. This doubles your content from one poll.' },
              { q: 'How often should I post polls?', a: '1-2 polls per week is optimal. More than that and your audience gets "poll fatigue." Space them out and alternate with other content types for best results.' },
              { q: 'Can polls replace market research?', a: 'Polls are great for quick directional insights but shouldn\'t replace proper research. Use them to validate hypotheses, test messaging, or gauge interest — then follow up with deeper surveys or interviews for decisions that matter.' },
            ].map((faq, i) => (
              <details key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 group">
                <summary className="font-semibold text-white cursor-pointer">{faq.q}</summary>
                <p className="text-zinc-400 text-sm mt-2">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 border-t border-zinc-800 pt-8 pb-12">
          <div className="grid md:grid-cols-4 gap-8 text-sm text-zinc-500">
            <div>
              <h4 className="font-semibold text-white mb-3">Content Creation</h4>
              <ul className="space-y-1"><li><a href="/" className="hover:text-white transition">Post Generator</a></li><li><a href="/hooks" className="hover:text-white transition">Hook Generator</a></li><li><a href="/video-scripts" className="hover:text-white transition">Video Scripts</a></li><li><a href="/threads" className="hover:text-white transition">Thread Generator</a></li><li><a href="/carousel-generator" className="hover:text-white transition">Carousel Generator</a></li><li><a href="/poll-quiz" className="hover:text-white transition">Poll & Quiz</a></li></ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Optimization</h4>
              <ul className="space-y-1"><li><a href="/caption-optimizer" className="hover:text-white transition">Caption Optimizer</a></li><li><a href="/hashtags" className="hover:text-white transition">Hashtags</a></li><li><a href="/post-timing" className="hover:text-white transition">Post Timing</a></li><li><a href="/social-seo" className="hover:text-white transition">Social SEO</a></li><li><a href="/virality-score" className="hover:text-white transition">Virality Score</a></li></ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Analytics</h4>
              <ul className="space-y-1"><li><a href="/engagement-calculator" className="hover:text-white transition">Engagement</a></li><li><a href="/sentiment-analyzer" className="hover:text-white transition">Sentiment</a></li><li><a href="/roi-calculator" className="hover:text-white transition">ROI Calculator</a></li><li><a href="/competitor-analysis" className="hover:text-white transition">Competitors</a></li><li><a href="/influencer-score" className="hover:text-white transition">Influencer Score</a></li></ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Strategy</h4>
              <ul className="space-y-1"><li><a href="/brand-voice" className="hover:text-white transition">Brand Voice</a></li><li><a href="/content-calendar" className="hover:text-white transition">Calendar</a></li><li><a href="/campaign" className="hover:text-white transition">Campaign Mode</a></li><li><a href="/persona-builder" className="hover:text-white transition">Persona Builder</a></li><li><a href="/ab-testing" className="hover:text-white transition">A/B Testing</a></li></ul>
            </div>
          </div>
          <p className="text-center text-zinc-600 text-xs mt-8">© 2026 PostCraft AI. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
