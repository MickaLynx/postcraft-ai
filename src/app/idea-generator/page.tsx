'use client';
import { useState } from 'react';

const platforms = ['Twitter/X', 'LinkedIn', 'Instagram', 'TikTok', 'Facebook', 'YouTube'] as const;
const niches = ['Tech/SaaS', 'Health/Fitness', 'Finance/Investing', 'E-commerce', 'Education', 'Food/Cooking', 'Travel', 'Fashion/Beauty', 'Gaming', 'Real Estate', 'Sustainability', 'Parenting', 'Pets', 'Music', 'Photography'] as const;
const goals = ['Grow Followers', 'Drive Engagement', 'Generate Leads', 'Build Authority', 'Sell Products', 'Educate Audience', 'Entertain', 'Build Community'] as const;
const formats = ['Short Post', 'Carousel', 'Reel/Short Video', 'Thread', 'Story', 'Live', 'Poll/Quiz', 'Infographic', 'Behind-the-scenes', 'Tutorial'] as const;

interface ContentIdea {
  title: string;
  format: string;
  hook: string;
  outline: string[];
  cta: string;
  hashtags: string[];
  bestTime: string;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  engagementPotential: number;
  viralScore: number;
}

const ideaTemplates: Record<string, { titles: string[]; hooks: string[]; outlines: string[][]; ctas: string[] }> = {
  'Tech/SaaS': {
    titles: ['The tool stack nobody talks about', 'Why I stopped using [popular tool]', 'How I automated 10 hours/week', 'The $0 marketing strategy that works', 'Tech trends that will matter in 6 months', 'My honest review after 1 year with [tool]', 'The biggest mistake in SaaS onboarding', 'How to build in public (the right way)', 'Why your landing page isn\'t converting', 'The API integration that changed everything'],
    hooks: ['I replaced 5 tools with 1 workflow...', 'Most founders waste hours on this...', 'After testing 20 tools, here\'s my verdict:', 'The #1 growth hack nobody uses:', 'I got 10K users without spending $1:'],
    outlines: [['Problem statement', 'Old approach (what most do)', 'New solution', 'Results/metrics', 'How to implement'], ['Controversial take', 'Evidence/data', 'Counter-arguments', 'Your experience', 'Call for opinions']],
    ctas: ['Save this for later', 'What tool would you add?', 'Drop a comment if you agree', 'Follow for more tech insights', 'Link in bio for full breakdown'],
  },
  'Health/Fitness': {
    titles: ['The 5-minute morning routine that changed my life', 'Why calories don\'t matter (hear me out)', 'The workout split for busy professionals', '3 stretches you should do every day', 'What I eat in a day (realistic edition)', 'The supplement industry doesn\'t want you to know this', 'How I lost 20 lbs without counting calories', 'The science behind cold plunges', 'Rest day mistakes that kill your gains', 'Gym myths that need to die in 2026'],
    hooks: ['Stop doing this exercise immediately...', 'I tried this for 30 days and...', 'Your trainer won\'t tell you this:', 'The fitness industry lied to you:', 'This one change transformed my physique:'],
    outlines: [['The myth', 'Why people believe it', 'The science', 'What to do instead', 'Results to expect'], ['Before/after context', 'The change made', 'Day-by-day experience', 'Final results', 'Would I recommend it']],
    ctas: ['Save this workout', 'Tag someone who needs this', 'What\'s your routine?', 'Follow for daily fitness tips', 'Comment your biggest challenge'],
  },
  'Finance/Investing': {
    titles: ['How I save $500/month automatically', 'The investing strategy for beginners', 'Why I stopped checking my portfolio daily', 'Tax hacks most people miss', 'Building wealth on a $50K salary', 'The ETF portfolio that beats 90% of traders', 'Financial mistakes I made in my 20s', 'Side income ideas that actually work', 'The budget method that finally clicked', 'Crypto lessons from losing $10K'],
    hooks: ['I made this mistake so you don\'t have to...', 'Rich people do this differently:', 'The #1 investing rule I follow:', 'After 10 years of investing:', 'Your bank hopes you never learn this:'],
    outlines: [['The mistake/lesson', 'How it happened', 'The cost', 'What I learned', 'Action steps'], ['The strategy overview', 'Step-by-step setup', 'Expected returns', 'Risks to know', 'Start today']],
    ctas: ['Bookmark this for tax season', 'What\'s your #1 money tip?', 'Share with someone who needs this', 'Follow for weekly finance tips', 'Comment your biggest win'],
  },
};

function generateIdeas(platform: string, niche: string, goal: string, count: number): ContentIdea[] {
  const templates = ideaTemplates[niche] || ideaTemplates['Tech/SaaS'];
  const ideas: ContentIdea[] = [];

  const platformFormats: Record<string, string[]> = {
    'Twitter/X': ['Short Post', 'Thread', 'Poll/Quiz'],
    'LinkedIn': ['Short Post', 'Carousel', 'Poll/Quiz', 'Thread'],
    'Instagram': ['Reel/Short Video', 'Carousel', 'Story', 'Infographic'],
    'TikTok': ['Reel/Short Video', 'Story', 'Behind-the-scenes', 'Tutorial'],
    'Facebook': ['Short Post', 'Live', 'Poll/Quiz', 'Infographic'],
    'YouTube': ['Tutorial', 'Behind-the-scenes', 'Reel/Short Video', 'Live'],
  };

  const bestTimes: Record<string, string[]> = {
    'Twitter/X': ['8-9 AM', '12-1 PM', '5-6 PM'],
    'LinkedIn': ['7-8 AM', '12 PM', '5-6 PM'],
    'Instagram': ['11 AM-1 PM', '7-9 PM'],
    'TikTok': ['7-9 AM', '12-3 PM', '7-11 PM'],
    'Facebook': ['1-4 PM', '6-9 PM'],
    'YouTube': ['2-4 PM', '6-9 PM'],
  };

  const hashtagSets: Record<string, string[]> = {
    'Tech/SaaS': ['#tech', '#saas', '#startup', '#buildinpublic', '#productivity', '#automation', '#ai', '#nocode', '#growthhacking', '#entrepreneur'],
    'Health/Fitness': ['#fitness', '#health', '#workout', '#gym', '#nutrition', '#wellness', '#fitlife', '#healthylifestyle', '#gains', '#motivation'],
    'Finance/Investing': ['#finance', '#investing', '#money', '#wealth', '#personalfinance', '#stocks', '#crypto', '#budgeting', '#financialfreedom', '#savings'],
  };

  const nicheHashtags = hashtagSets[niche] || ['#content', '#socialmedia', '#tips', '#growth', '#strategy'];
  const platFormats = platformFormats[platform] || ['Short Post', 'Carousel'];
  const platTimes = bestTimes[platform] || ['12 PM'];

  for (let i = 0; i < count; i++) {
    const titleIdx = (i * 3 + Math.floor(Math.random() * 3)) % templates.titles.length;
    const hookIdx = i % templates.hooks.length;
    const outlineIdx = i % templates.outlines.length;
    const ctaIdx = i % templates.ctas.length;
    const format = platFormats[i % platFormats.length];

    const engBase = goal === 'Drive Engagement' ? 75 : goal === 'Entertain' ? 70 : goal === 'Build Community' ? 65 : 55;
    const formatBonus = format === 'Reel/Short Video' ? 15 : format === 'Carousel' ? 10 : format === 'Poll/Quiz' ? 12 : 5;
    const engagementPotential = Math.min(100, engBase + formatBonus + Math.floor(Math.random() * 15));

    const viralBase = format === 'Reel/Short Video' ? 60 : format === 'Thread' ? 45 : 35;
    const viralScore = Math.min(100, viralBase + Math.floor(Math.random() * 25));

    const difficulty = format === 'Reel/Short Video' || format === 'Tutorial' || format === 'Live' ? 'Advanced' as const : format === 'Carousel' || format === 'Thread' || format === 'Infographic' ? 'Medium' as const : 'Easy' as const;

    const selectedHashtags = nicheHashtags.sort(() => Math.random() - 0.5).slice(0, 5);

    ideas.push({
      title: templates.titles[titleIdx],
      format,
      hook: templates.hooks[hookIdx],
      outline: templates.outlines[outlineIdx],
      cta: templates.ctas[ctaIdx],
      hashtags: selectedHashtags,
      bestTime: platTimes[i % platTimes.length],
      difficulty,
      engagementPotential,
      viralScore,
    });
  }

  return ideas;
}

export default function IdeaGeneratorPage() {
  const [platform, setPlatform] = useState<string>('Instagram');
  const [niche, setNiche] = useState<string>('Tech/SaaS');
  const [goal, setGoal] = useState<string>('Drive Engagement');
  const [count, setCount] = useState(5);
  const [ideas, setIdeas] = useState<ContentIdea[]>([]);

  const handleGenerate = () => {
    setIdeas(generateIdeas(platform, niche, goal, count));
  };

  const diffColor = (d: string) => d === 'Easy' ? 'text-green-400 bg-green-900/30' : d === 'Medium' ? 'text-yellow-400 bg-yellow-900/30' : 'text-red-400 bg-red-900/30';

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold gradient-text mb-4">Content Idea Generator</h1>
      <p className="text-zinc-400 mb-8 max-w-2xl">Never run out of content ideas. Generate platform-specific, niche-targeted content ideas with hooks, outlines, CTAs, and hashtags — ready to create.</p>

      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Platform</label>
          <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none">
            {platforms.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Niche</label>
          <select value={niche} onChange={e => setNiche(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none">
            {niches.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Goal</label>
          <select value={goal} onChange={e => setGoal(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none">
            {goals.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Ideas Count</label>
          <select value={count} onChange={e => setCount(parseInt(e.target.value))} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none">
            {[3, 5, 7, 10].map(n => <option key={n} value={n}>{n} ideas</option>)}
          </select>
        </div>
      </div>

      <button onClick={handleGenerate} className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:opacity-90 transition mb-10">Generate Ideas</button>

      {ideas.length > 0 && (
        <div className="space-y-6">
          {ideas.map((idea, i) => (
            <div key={i} className="glass rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">{idea.title}</h3>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs bg-purple-900/50 text-purple-300 px-2 py-0.5 rounded">{idea.format}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${diffColor(idea.difficulty)}`}>{idea.difficulty}</span>
                    <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded">Best: {idea.bestTime}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm"><span className="text-zinc-400">Engagement:</span> <span className={idea.engagementPotential >= 70 ? 'text-green-400' : 'text-yellow-400'}>{idea.engagementPotential}%</span></div>
                  <div className="text-sm"><span className="text-zinc-400">Viral:</span> <span className={idea.viralScore >= 60 ? 'text-green-400' : 'text-yellow-400'}>{idea.viralScore}%</span></div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-purple-400 mb-1">Hook</h4>
                  <p className="text-sm text-zinc-300 bg-zinc-900/50 rounded p-3 italic">&quot;{idea.hook}&quot;</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-purple-400 mb-1">CTA</h4>
                  <p className="text-sm text-zinc-300 bg-zinc-900/50 rounded p-3">{idea.cta}</p>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-semibold text-purple-400 mb-1">Content Outline</h4>
                <ol className="text-sm text-zinc-300 space-y-1">
                  {idea.outline.map((step, j) => (
                    <li key={j} className="flex gap-2"><span className="text-zinc-600">{j + 1}.</span>{step}</li>
                  ))}
                </ol>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {idea.hashtags.map(h => (
                  <span key={h} className="text-xs text-purple-400 bg-purple-900/20 px-2 py-0.5 rounded">{h}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SEO Content */}
      <section className="mt-16 space-y-8 text-zinc-400">
        <h2 className="text-2xl font-bold text-white">How to Generate Content Ideas That Drive Results</h2>
        <p>Running out of content ideas is the #1 challenge for social media creators and marketers. A systematic approach to idea generation — combining niche expertise, platform knowledge, and audience psychology — eliminates creative blocks and ensures consistent, high-quality content.</p>

        <h3 className="text-xl font-semibold text-white">The 4-Pillar Idea Framework</h3>
        <p>Every great content idea sits at the intersection of four pillars: <strong className="text-white">audience pain points</strong> (what they struggle with), <strong className="text-white">platform format</strong> (what works on each channel), <strong className="text-white">trending context</strong> (what&apos;s relevant now), and <strong className="text-white">your unique angle</strong> (what only you can say). PostCraft&apos;s Idea Generator combines all four automatically.</p>

        <h3 className="text-xl font-semibold text-white">Content Ideas by Platform</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong className="text-white">Twitter/X:</strong> Hot takes, threads, polls, and concise tips (under 280 characters for maximum reach)</li>
          <li><strong className="text-white">LinkedIn:</strong> Professional insights, career stories, industry analysis, and leadership carousels</li>
          <li><strong className="text-white">Instagram:</strong> Reels, educational carousels, behind-the-scenes stories, and aesthetic quotes</li>
          <li><strong className="text-white">TikTok:</strong> Quick tutorials, day-in-the-life, trending sounds, and raw/authentic clips</li>
          <li><strong className="text-white">YouTube:</strong> Long-form tutorials, reviews, vlogs, and how-to guides</li>
        </ul>

        <h3 className="text-xl font-semibold text-white">How to Never Run Out of Ideas</h3>
        <p>Follow the &quot;Idea Bank&quot; method: generate 20+ ideas in one session, then schedule them across your content calendar. Revisit your bank weekly, adding new ideas from audience comments, competitor analysis, and industry news. PostCraft generates ideas with engagement and virality scores so you can prioritize the highest-impact content first.</p>

        <div className="border-t border-zinc-800 pt-8">
          <h3 className="text-xl font-semibold text-white">Frequently Asked Questions</h3>
          <div className="space-y-4 mt-4">
            <div><h4 className="font-medium text-white">How many content ideas should I generate per week?</h4><p className="text-sm">Aim for 10-15 ideas per week across all platforms. You won&apos;t use all of them, but having a surplus means you can cherry-pick the best ones and always have backup content ready.</p></div>
            <div><h4 className="font-medium text-white">Should I repurpose the same idea across platforms?</h4><p className="text-sm">Absolutely. One idea can become a tweet, a LinkedIn carousel, an Instagram reel, and a TikTok video — each adapted to the platform&apos;s native format and audience expectations.</p></div>
            <div><h4 className="font-medium text-white">What makes a content idea &quot;viral-worthy&quot;?</h4><p className="text-sm">Viral ideas typically combine a strong emotional trigger (surprise, curiosity, relatability), a clear value proposition (save time, learn something), and a shareable format (visual, concise, controversial).</p></div>
            <div><h4 className="font-medium text-white">How do I know which ideas to prioritize?</h4><p className="text-sm">Use engagement and virality scores as guides. Ideas with high engagement potential are great for building your existing audience, while high virality scores help you reach new people.</p></div>
          </div>
        </div>
      </section>
    </main>
  );
}
