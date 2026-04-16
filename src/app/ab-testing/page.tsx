'use client';
import { useState } from 'react';

const platforms = ['Twitter/X', 'LinkedIn', 'Instagram', 'TikTok', 'Facebook', 'YouTube'] as const;
const testVariables = ['Hook/Opening Line', 'CTA Type', 'Hashtag Strategy', 'Emoji Usage', 'Caption Length', 'Content Format', 'Posting Time', 'Tone/Voice', 'Visual Style', 'Audience Targeting'] as const;
const goals = ['Engagement Rate', 'Click-Through Rate', 'Conversions', 'Reach/Impressions', 'Saves/Bookmarks', 'Shares', 'Comments', 'Follower Growth'] as const;

interface TestPlan {
  testName: string;
  hypothesis: string;
  variantA: { name: string; description: string; prediction: string };
  variantB: { name: string; description: string; prediction: string };
  sampleSize: string;
  duration: string;
  primaryMetric: string;
  secondaryMetrics: string[];
  setupSteps: string[];
  analysisTips: string[];
  statisticalNote: string;
  expectedLift: string;
  confidence: string;
}

function generateTestPlan(variable: string, platform: string, goal: string, context: string): TestPlan {
  const testTemplates: Record<string, { hypothesis: string; varA: string; varADesc: string; varB: string; varBDesc: string; predA: string; predB: string; lift: string }> = {
    'Hook/Opening Line': {
      hypothesis: `A question-based hook will generate more ${goal.toLowerCase()} than a statement hook on ${platform}`,
      varA: 'Question Hook', varADesc: `Open with a direct question related to "${context || 'your topic'}" that creates curiosity`,
      varB: 'Bold Statement Hook', varBDesc: `Open with a surprising statistic or contrarian claim about "${context || 'your topic'}"`,
      predA: 'Higher comments and replies (questions prompt responses)', predB: 'Higher shares and saves (bold claims provoke sharing)',
      lift: '15-30%',
    },
    'CTA Type': {
      hypothesis: `A specific action CTA will outperform a generic CTA for ${goal.toLowerCase()} on ${platform}`,
      varA: 'Specific CTA', varADesc: '"Save this post for your next campaign" — tells exactly what to do and why',
      varB: 'Generic CTA', varBDesc: '"Like and share if you agree" — standard engagement request',
      predA: 'Higher save rate and meaningful engagement', predB: 'Higher like count but lower quality interactions',
      lift: '20-40%',
    },
    'Hashtag Strategy': {
      hypothesis: `Fewer, targeted hashtags will drive more ${goal.toLowerCase()} than broad hashtags on ${platform}`,
      varA: 'Targeted (3-5)', varADesc: 'Use 3-5 niche-specific hashtags with moderate volume (10K-100K posts)',
      varB: 'Broad (10-15)', varBDesc: 'Use 10-15 popular hashtags mixing broad and niche (100K+ posts)',
      predA: 'Better reach-to-engagement ratio, higher quality traffic', predB: 'More total impressions but lower engagement rate',
      lift: '10-25%',
    },
    'Emoji Usage': {
      hypothesis: `Strategic emoji placement will improve ${goal.toLowerCase()} vs no emojis on ${platform}`,
      varA: 'With Emojis (2-3)', varADesc: 'Place 2-3 relevant emojis at line breaks and next to the CTA',
      varB: 'No Emojis', varBDesc: 'Clean text-only caption with no emoji decoration',
      predA: 'Higher engagement on casual platforms (TikTok, Instagram)', predB: 'Higher credibility on professional platforms (LinkedIn)',
      lift: '10-20%',
    },
    'Caption Length': {
      hypothesis: `${platform === 'LinkedIn' || platform === 'Instagram' ? 'Long-form' : 'Short-form'} captions will generate more ${goal.toLowerCase()} on ${platform}`,
      varA: 'Short Caption', varADesc: `Under ${platform === 'Twitter/X' ? '100' : '200'} characters — punchy, direct, single-message`,
      varB: 'Long Caption', varBDesc: `${platform === 'Twitter/X' ? '200-280' : '1000+'} characters — detailed, value-packed, storytelling`,
      predA: 'Higher share rate, better for quick-scroll feeds', predB: 'Higher save rate, better for establishing authority',
      lift: '15-35%',
    },
    'Content Format': {
      hypothesis: `${platform === 'LinkedIn' ? 'Carousel' : 'Video'} format will outperform static image for ${goal.toLowerCase()} on ${platform}`,
      varA: 'Static Image + Caption', varADesc: 'Single high-quality image with an optimized caption',
      varB: platform === 'LinkedIn' ? 'Carousel/Document' : 'Short Video', varBDesc: platform === 'LinkedIn' ? 'Multi-slide document with key takeaways' : 'Under-60s video with text overlay',
      predA: 'Lower production cost, good baseline performance', predB: 'Higher engagement but requires more production effort',
      lift: '25-50%',
    },
    'Posting Time': {
      hypothesis: `Morning posts will generate more ${goal.toLowerCase()} than evening posts on ${platform}`,
      varA: 'Morning (9-11 AM)', varADesc: 'Post during morning commute/work start when users check feeds',
      varB: 'Evening (7-9 PM)', varBDesc: 'Post during leisure time when users browse more casually',
      predA: 'Higher professional engagement (LinkedIn, Twitter/X)', predB: 'Higher casual engagement (TikTok, Instagram)',
      lift: '10-20%',
    },
    'Tone/Voice': {
      hypothesis: `A ${platform === 'LinkedIn' ? 'vulnerable/personal' : 'casual/relatable'} tone will outperform a ${platform === 'LinkedIn' ? 'formal/corporate' : 'polished/professional'} tone for ${goal.toLowerCase()}`,
      varA: 'Professional/Polished', varADesc: 'Clean, authoritative language with industry terminology',
      varB: 'Personal/Relatable', varBDesc: 'Conversational, first-person, admitting mistakes or sharing struggles',
      predA: 'Higher credibility with senior audiences', predB: 'Higher engagement and emotional connection',
      lift: '15-30%',
    },
    'Visual Style': {
      hypothesis: `Bold graphics with text will outperform photography for ${goal.toLowerCase()} on ${platform}`,
      varA: 'Photography/Real Image', varADesc: 'Authentic photo or screenshot with minimal editing',
      varB: 'Designed Graphic', varBDesc: 'Bold text overlay, brand colors, clean design with key message',
      predA: 'Higher authenticity and trust signals', predB: 'Higher readability and shareability',
      lift: '15-25%',
    },
    'Audience Targeting': {
      hypothesis: `Niche targeting will produce better ${goal.toLowerCase()} than broad targeting on ${platform}`,
      varA: 'Broad Audience', varADesc: 'General language and topics that appeal to a wide audience',
      varB: 'Niche Specific', varBDesc: `Content tailored specifically for "${context || 'your niche'}" with insider language`,
      predA: 'More total impressions, wider reach', predB: 'Higher engagement rate, better conversion, stronger community',
      lift: '20-40%',
    },
  };

  const t = testTemplates[variable] || testTemplates['Hook/Opening Line'];

  const sampleSizes: Record<string, string> = {
    'Twitter/X': '2,000+ impressions per variant', LinkedIn: '1,500+ impressions per variant',
    Instagram: '3,000+ impressions per variant', TikTok: '5,000+ impressions per variant',
    Facebook: '2,500+ impressions per variant', YouTube: '2,000+ views per variant',
  };

  const setupSteps = [
    `Create Variant A: ${t.varA} — ${t.varADesc}`,
    `Create Variant B: ${t.varB} — ${t.varBDesc}`,
    `Schedule both within the same ${platform === 'TikTok' ? '24-hour' : '48-hour'} window to control for timing`,
    `Ensure same audience targeting (don't change other variables)`,
    `Track: ${goal} as primary metric`,
    `Wait for ${sampleSizes[platform] || '2,000+ impressions'} before analyzing results`,
    `Calculate statistical significance (aim for 95% confidence)`,
  ];

  const analysisTips = [
    `Compare ${goal.toLowerCase()} between variants — the winner must outperform by at least ${t.lift} to be meaningful`,
    'Check secondary metrics to understand WHY one variant won (reach, saves, shares, comments)',
    'Look at audience composition — did the variants attract different types of followers?',
    `Run the test across 3 cycles (3 separate A/B tests) to confirm the pattern isn't random`,
    'Document the winner in your brand playbook for future content',
  ];

  return {
    testName: `${variable} Test on ${platform}`,
    hypothesis: t.hypothesis,
    variantA: { name: t.varA, description: t.varADesc, prediction: t.predA },
    variantB: { name: t.varB, description: t.varBDesc, prediction: t.predB },
    sampleSize: sampleSizes[platform] || '2,000+ impressions per variant',
    duration: platform === 'TikTok' ? '3-7 days' : '5-14 days',
    primaryMetric: goal,
    secondaryMetrics: ['Reach', 'Saves', 'Shares', 'Comments', 'Profile Visits'].filter(m => m !== goal),
    setupSteps,
    analysisTips,
    statisticalNote: 'For reliable results, each variant needs enough impressions to reach 95% statistical significance. Use a sample size calculator if testing conversion rates.',
    expectedLift: t.lift,
    confidence: '95%',
  };
}

export default function ABTestingPage() {
  const [platform, setPlatform] = useState<string>('Instagram');
  const [variable, setVariable] = useState<string>('Hook/Opening Line');
  const [goal, setGoal] = useState<string>('Engagement Rate');
  const [context, setContext] = useState('');
  const [result, setResult] = useState<TestPlan | null>(null);

  function generate() {
    setResult(generateTestPlan(variable, platform, goal, context));
  }

  return (
    <main className="min-h-screen px-6 py-20 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-xs text-lime-400 uppercase tracking-widest mb-2 font-semibold">New Tool</p>
        <h1 className="text-4xl font-bold mb-3">
          A/B Split Test <span className="gradient-text">Planner</span>
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          Generate a complete A/B testing plan for your social media content. Hypothesis, variants, sample sizes,
          duration, analysis framework — everything you need to test smarter and grow faster.
        </p>
      </div>

      {/* Input */}
      <div className="glass rounded-2xl p-6 mb-8">
        <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Platform</label>
        <div className="flex flex-wrap gap-2 mb-5">
          {platforms.map(p => (
            <button key={p} onClick={() => setPlatform(p)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition ${platform === p ? 'bg-lime-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
              {p}
            </button>
          ))}
        </div>

        <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">What to Test</label>
        <div className="flex flex-wrap gap-2 mb-5">
          {testVariables.map(v => (
            <button key={v} onClick={() => setVariable(v)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition ${variable === v ? 'bg-purple-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
              {v}
            </button>
          ))}
        </div>

        <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Success Metric</label>
        <div className="flex flex-wrap gap-2 mb-5">
          {goals.map(g => (
            <button key={g} onClick={() => setGoal(g)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition ${goal === g ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
              {g}
            </button>
          ))}
        </div>

        <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Context (your topic/niche)</label>
        <input
          value={context}
          onChange={e => setContext(e.target.value)}
          placeholder="e.g. SaaS marketing, fitness coaching, e-commerce fashion..."
          className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-lime-500 transition mb-6"
        />

        <button onClick={generate}
          className="w-full py-3.5 btn-primary rounded-xl font-semibold text-white">
          Generate Test Plan
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-8 fade-in">
          {/* Test Overview */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-1">{result.testName}</h2>
            <p className="text-sm text-zinc-400 mb-4">{result.hypothesis}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-zinc-900/40 rounded-lg p-3 text-center">
                <p className="text-lg font-bold text-lime-400">{result.expectedLift}</p>
                <p className="text-xs text-zinc-500">Expected Lift</p>
              </div>
              <div className="bg-zinc-900/40 rounded-lg p-3 text-center">
                <p className="text-lg font-bold text-purple-400">{result.sampleSize}</p>
                <p className="text-xs text-zinc-500">Sample Size</p>
              </div>
              <div className="bg-zinc-900/40 rounded-lg p-3 text-center">
                <p className="text-lg font-bold text-cyan-400">{result.duration}</p>
                <p className="text-xs text-zinc-500">Duration</p>
              </div>
              <div className="bg-zinc-900/40 rounded-lg p-3 text-center">
                <p className="text-lg font-bold text-orange-400">{result.confidence}</p>
                <p className="text-xs text-zinc-500">Confidence Level</p>
              </div>
            </div>
          </div>

          {/* Variants */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass rounded-2xl p-6 border-l-4 border-blue-500">
              <h3 className="text-lg font-semibold mb-2 text-blue-400">Variant A: {result.variantA.name}</h3>
              <p className="text-sm text-zinc-300 mb-3">{result.variantA.description}</p>
              <p className="text-xs text-zinc-500"><strong>Prediction:</strong> {result.variantA.prediction}</p>
            </div>
            <div className="glass rounded-2xl p-6 border-l-4 border-pink-500">
              <h3 className="text-lg font-semibold mb-2 text-pink-400">Variant B: {result.variantB.name}</h3>
              <p className="text-sm text-zinc-300 mb-3">{result.variantB.description}</p>
              <p className="text-xs text-zinc-500"><strong>Prediction:</strong> {result.variantB.prediction}</p>
            </div>
          </div>

          {/* Setup Steps */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Setup Checklist</h2>
            <div className="space-y-2">
              {result.setupSteps.map((step, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <span className="text-lime-400 font-mono text-xs mt-0.5">{i + 1}</span>
                  <span className="text-zinc-300">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Tracking Metrics</h2>
            <div className="flex flex-wrap gap-3">
              <div className="bg-lime-600/20 border border-lime-600/30 rounded-lg px-4 py-2">
                <p className="text-xs text-zinc-500">Primary</p>
                <p className="text-sm font-semibold text-lime-400">{result.primaryMetric}</p>
              </div>
              {result.secondaryMetrics.map((m, i) => (
                <div key={i} className="bg-zinc-800 rounded-lg px-4 py-2">
                  <p className="text-xs text-zinc-600">Secondary</p>
                  <p className="text-sm text-zinc-400">{m}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Analysis Tips */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">How to Analyze Results</h2>
            <div className="space-y-2">
              {result.analysisTips.map((tip, i) => (
                <div key={i} className="flex gap-2 text-sm">
                  <span className="text-purple-400">→</span>
                  <span className="text-zinc-300">{tip}</span>
                </div>
              ))}
            </div>
            <div className="bg-zinc-900/40 rounded-xl p-4 mt-4">
              <p className="text-xs text-zinc-500">{result.statisticalNote}</p>
            </div>
          </div>
        </div>
      )}

      {/* SEO */}
      <section className="mt-16 space-y-8">
        <div className="glass rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">Why A/B Test Social Media Content?</h2>
          <p className="text-sm text-zinc-400 mb-3">Most creators post and hope for the best. Smart creators test systematically. A/B testing removes guesswork by comparing two variants of a single variable and measuring which one performs better.</p>
          <p className="text-sm text-zinc-400">Even a 15% improvement in hook effectiveness, compounded across 100 posts per year, can double your annual engagement. Our A/B Test Planner gives you the scientific framework to run meaningful tests.</p>
        </div>

        <div className="glass rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">A/B Testing FAQ</h2>
          <div className="space-y-4">
            {[
              ['How many variables should I test at once?', 'ONE. Always test one variable at a time. If you change the hook AND the hashtags, you won\'t know which change caused the result.'],
              ['How long should I run each test?', 'Minimum 3-7 days on TikTok (fast algorithm), 5-14 days on other platforms. You need enough data for statistical significance.'],
              ['What if both variants perform similarly?', 'That\'s a valid result! It means that variable doesn\'t significantly impact your performance. Move on to testing a different variable.'],
              ['How many impressions do I need?', 'At least 1,000-5,000 per variant depending on the platform. More impressions = more reliable results.'],
              ['Should I test on my best or worst content?', 'Test on your average-performing content type. Testing extremes gives skewed results that don\'t generalize.'],
            ].map(([q, a], i) => (
              <div key={i}>
                <h3 className="font-semibold text-sm mb-1">{q}</h3>
                <p className="text-sm text-zinc-400">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="mt-12 glass rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-4">Related Tools</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            ['/virality-score', 'Virality Score', 'Predict viral potential'],
            ['/caption-optimizer', 'Caption Optimizer', 'Score your captions'],
            ['/hooks', 'Hook Generator', '10 hooks to test'],
            ['/post-timing', 'Post Timing', 'Test posting times'],
            ['/hashtags', 'Hashtag Generator', 'Test hashtag strategies'],
            ['/engagement-calculator', 'Engagement Calc', 'Measure results'],
            ['/social-seo', 'Social SEO', 'Test keywords'],
            ['/sentiment-analyzer', 'Sentiment', 'Test emotional impact'],
          ].map(([href, title, desc]) => (
            <a key={href} href={href} className="glass rounded-xl p-3 hover:border-lime-500/30 transition">
              <p className="font-semibold text-xs">{title}</p>
              <p className="text-xs text-zinc-500 mt-1">{desc}</p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
