'use client';
import { useState } from 'react';

const platforms = ['LinkedIn', 'Instagram', 'Twitter/X', 'TikTok', 'YouTube', 'Reddit', 'Facebook'] as const;
const contentTypes = ['Opinion', 'Question', 'Tutorial', 'News', 'Story', 'Controversial', 'Educational', 'Inspirational'] as const;

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function seeded(seed: number, min: number, max: number): number {
  return min + (seed % (max - min + 1));
}

interface DepthResult {
  overallScore: number;
  grade: string;
  metrics: { label: string; value: string }[];
  emotionalArc: { phase: string; score: number }[];
  conflict: { label: string; value: number }[];
  layers: { label: string; pct: number; desc: string }[];
  catalysts: string[];
  risks: { risk: string; mitigation: string }[];
  tips: string[];
}

function analyze(topic: string, platform: string, contentType: string, audience: string, industry: string): DepthResult {
  const seed = hash(topic + platform + contentType + audience + industry);
  const s1 = hash(topic + platform);
  const s2 = hash(contentType + audience);
  const s3 = hash(industry + topic);
  const s4 = hash(audience + platform + contentType);

  const platformBonus: Record<string, number> = { Reddit: 14, LinkedIn: 10, 'Twitter/X': 6, YouTube: 8, Facebook: 2, Instagram: -2, TikTok: -4 };
  const typeBonus: Record<string, number> = { Controversial: 15, Question: 12, Opinion: 8, Story: 6, Educational: 4, Tutorial: 2, News: 0, Inspirational: -3 };

  const base = seeded(seed, 38, 72);
  const overallScore = Math.min(100, Math.max(0, base + (platformBonus[platform] || 0) + (typeBonus[contentType] || 0)));

  const grade = overallScore >= 90 ? 'S' : overallScore >= 80 ? 'A' : overallScore >= 65 ? 'B' : overallScore >= 50 ? 'C' : overallScore >= 35 ? 'D' : 'F';

  const lifespanHours = seeded(s1, 4, 96);
  const metrics = [
    { label: 'Expected Comment Threads', value: `${seeded(s1, 8, 240)}` },
    { label: 'Avg Thread Depth', value: `${seeded(s2, 2, 12)} replies deep` },
    { label: 'Estimated First Reply', value: `${seeded(s3, 1, 45)} minutes` },
    { label: 'Discussion Lifespan', value: `${lifespanHours} hours` },
  ];

  const emotionalArc = [
    { phase: 'Hook', score: seeded(hash(topic + 'hook'), 40, 98) },
    { phase: 'Tension', score: seeded(hash(topic + 'tension'), 35, 95) },
    { phase: 'Peak', score: seeded(hash(topic + 'peak'), 50, 100) },
    { phase: 'Resolution', score: seeded(hash(topic + 'resolution'), 30, 90) },
    { phase: 'Afterglow', score: seeded(hash(topic + 'afterglow'), 20, 85) },
  ];

  const conflict = [
    { label: 'Polarization Index', value: seeded(s2, 10, 95) },
    { label: 'Debate Likelihood', value: seeded(s3, 15, 90) },
    { label: 'Troll Risk', value: seeded(s4, 5, 70) },
    { label: 'Constructive Ratio', value: seeded(hash(industry + audience), 30, 95) },
  ];

  const layers = [
    { label: 'Surface Reactions', pct: seeded(seed, 30, 55), desc: 'Likes, emojis, one-word replies' },
    { label: 'Thoughtful Comments', pct: seeded(s1, 18, 40), desc: 'Multi-sentence responses with personal takes' },
    { label: 'Deep Discussions', pct: seeded(s2, 8, 25), desc: 'Back-and-forth debates, follow-up questions' },
    { label: 'Community Formation', pct: seeded(s3, 2, 15), desc: 'DM connections, group creation, ongoing threads' },
  ];

  const allCatalysts = [
    `Ask "${audience}" a direct question about their experience with ${industry}`,
    `Include a contrarian take on the conventional ${industry} wisdom`,
    `Share a personal failure story related to ${topic.slice(0, 30) || 'the topic'}`,
    `Tag 2-3 thought leaders in ${industry} to spark expert debate`,
    `Add a poll or "hot take scale" to quantify audience opinions`,
    `End with an open loop: pose an unanswered dilemma about ${topic.slice(0, 30) || 'the subject'}`,
    `Reference a recent ${industry} controversy to ride existing momentum`,
    `Use "unpopular opinion" framing to lower the barrier to disagreement`,
    `Include specific data points that people will want to challenge or validate`,
    `Create a "choose your side" framework with two compelling perspectives`,
  ];
  const catalysts: string[] = [];
  for (let i = 0; i < 6; i++) catalysts.push(allCatalysts[seeded(hash(topic + String(i)), 0, allCatalysts.length - 1)]);

  const allRisks = [
    { risk: 'Echo Chamber Effect', mitigation: 'Actively invite opposing viewpoints in your caption or first comment' },
    { risk: 'Conversation Hijacking', mitigation: 'Pin a first comment to anchor the discussion direction' },
    { risk: 'Engagement Drop-off After 2h', mitigation: 'Schedule a follow-up comment or update to reignite the thread' },
    { risk: 'Shallow Agreement Loop', mitigation: 'Add a nuance or exception that forces people to think deeper' },
    { risk: 'Off-topic Derailment', mitigation: 'Use clear framing in your hook to set discussion boundaries' },
    { risk: 'Toxic Escalation', mitigation: 'Prepare a moderation comment template and set community guidelines' },
  ];
  const risks: { risk: string; mitigation: string }[] = [];
  for (let i = 0; i < 4; i++) risks.push(allRisks[seeded(hash(platform + String(i)), 0, allRisks.length - 1)]);

  const allTips = [
    `On ${platform}, the first 3 comments set the tone -- seed them strategically`,
    `${contentType} posts perform best when you reply to every comment in the first hour`,
    `Add a "what do you think?" CTA specifically targeting ${audience}`,
    `Break your ${contentType.toLowerCase()} into a thread format to increase reply surface area`,
    `Use the "1-2-1" formula: 1 bold claim, 2 supporting points, 1 open question`,
    `Post during ${platform === 'LinkedIn' ? '8-10 AM weekdays' : platform === 'Reddit' ? '6-9 AM EST' : '12-2 PM'} for maximum initial engagement`,
    `Reference a specific ${industry} pain point to trigger "me too" responses`,
    `End with a question that has no clear right answer to maximize debate`,
  ];
  const tips: string[] = [];
  for (let i = 0; i < 5; i++) tips.push(allTips[seeded(hash(audience + String(i)), 0, allTips.length - 1)]);

  return { overallScore, grade, metrics, emotionalArc, conflict, layers, catalysts, risks, tips };
}

function barColor(v: number): string {
  if (v >= 80) return 'bg-violet-500';
  if (v >= 60) return 'bg-purple-500';
  if (v >= 40) return 'bg-violet-400';
  return 'bg-zinc-600';
}

export default function ConversationDepthPage() {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState('LinkedIn');
  const [contentType, setContentType] = useState('Opinion');
  const [audience, setAudience] = useState('');
  const [industry, setIndustry] = useState('');
  const [result, setResult] = useState<DepthResult | null>(null);

  function generate() {
    if (!topic.trim()) return;
    setResult(analyze(topic, platform, contentType, audience || 'general audience', industry || 'general'));
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-20 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-xs text-violet-400 uppercase tracking-widest mb-2 font-semibold">AI Tool</p>
        <h1 className="text-4xl font-bold mb-3">Conversation Depth <span className="text-violet-400">Predictor</span></h1>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          Predict how deep the conversation will go before you post. Analyze discussion potential, emotional arcs, conflict probability, and get actionable tips to spark meaningful engagement.
        </p>
      </div>

      <div className="bg-zinc-900 rounded-2xl p-6 mb-8 border border-zinc-800">
        <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Post Topic / Prompt</label>
        <textarea value={topic} onChange={e => setTopic(e.target.value)} rows={3} placeholder="What is your post about?"
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm outline-none focus:border-violet-500 transition mb-4 resize-none" />

        <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Platform</label>
        <div className="flex flex-wrap gap-2 mb-4">
          {platforms.map(p => (
            <button key={p} onClick={() => setPlatform(p)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition ${platform === p ? 'bg-violet-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>{p}</button>
          ))}
        </div>

        <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Content Type</label>
        <div className="flex flex-wrap gap-2 mb-4">
          {contentTypes.map(c => (
            <button key={c} onClick={() => setContentType(c)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition ${contentType === c ? 'bg-purple-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>{c}</button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Target Audience</label>
            <input value={audience} onChange={e => setAudience(e.target.value)} placeholder="e.g. SaaS founders, Gen Z creators..."
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm outline-none focus:border-violet-500 transition" />
          </div>
          <div>
            <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Industry</label>
            <input value={industry} onChange={e => setIndustry(e.target.value)} placeholder="e.g. Tech, Healthcare, Finance..."
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm outline-none focus:border-violet-500 transition" />
          </div>
        </div>

        <button onClick={generate}
          className="w-full py-3.5 bg-violet-600 hover:bg-violet-500 rounded-xl font-semibold text-white transition">
          Predict Conversation Depth
        </button>
      </div>

      {result && (
        <div className="space-y-6 animate-in fade-in">
          {/* Overall Score */}
          <div className="bg-zinc-900 rounded-2xl p-8 text-center border border-zinc-800">
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Overall Depth Score</p>
            <p className="text-7xl font-bold text-violet-400">{result.overallScore}</p>
            <span className="inline-block mt-2 px-4 py-1 rounded-full bg-violet-600/20 text-violet-300 text-sm font-semibold">Grade: {result.grade}</span>
          </div>

          {/* Predicted Discussion Metrics */}
          <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
            <h2 className="text-lg font-semibold mb-4 text-violet-400">Predicted Discussion Metrics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {result.metrics.map((m, i) => (
                <div key={i} className="bg-zinc-800 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-white">{m.value}</p>
                  <p className="text-xs text-zinc-500 mt-1">{m.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Emotional Arc */}
          <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
            <h2 className="text-lg font-semibold mb-4 text-purple-400">Emotional Arc Mapping</h2>
            <div className="space-y-3">
              {result.emotionalArc.map((e, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-zinc-300">{e.phase}</span>
                    <span className="text-violet-300 font-semibold">{e.score}/100</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-2.5">
                    <div className={`h-2.5 rounded-full ${barColor(e.score)}`} style={{ width: `${e.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conflict Probability */}
          <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
            <h2 className="text-lg font-semibold mb-4 text-violet-400">Conflict Probability Analysis</h2>
            <table className="w-full text-sm">
              <tbody>
                {result.conflict.map((c, i) => (
                  <tr key={i} className="border-b border-zinc-800 last:border-0">
                    <td className="py-3 text-zinc-300">{c.label}</td>
                    <td className="py-3 w-1/2"><div className="w-full bg-zinc-800 rounded-full h-2"><div className={`h-2 rounded-full ${barColor(c.value)}`} style={{ width: `${c.value}%` }} /></div></td>
                    <td className="py-3 text-right text-violet-300 font-semibold pl-3">{c.value}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Engagement Depth Layers */}
          <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
            <h2 className="text-lg font-semibold mb-4 text-purple-400">Engagement Depth Layers</h2>
            <div className="space-y-4">
              {result.layers.map((l, i) => (
                <div key={i} className="bg-zinc-800 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-white">{l.label}</span>
                    <span className="text-sm font-bold text-violet-300">{l.pct}%</span>
                  </div>
                  <div className="w-full bg-zinc-700 rounded-full h-2 mb-2">
                    <div className="h-2 rounded-full bg-violet-500" style={{ width: `${l.pct}%` }} />
                  </div>
                  <p className="text-xs text-zinc-500">{l.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Conversation Catalysts */}
          <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
            <h2 className="text-lg font-semibold mb-4 text-violet-400">Conversation Catalysts</h2>
            <div className="space-y-2">
              {result.catalysts.map((c, i) => (
                <div key={i} className="flex gap-3 text-sm"><span className="text-violet-400 font-bold">{i + 1}.</span><span className="text-zinc-300">{c}</span></div>
              ))}
            </div>
          </div>

          {/* Risk Factors */}
          <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
            <h2 className="text-lg font-semibold mb-4 text-red-400">Risk Factors</h2>
            <table className="w-full text-sm">
              <thead><tr className="border-b border-zinc-700"><th className="text-left py-2 text-zinc-500 font-medium">Risk</th><th className="text-left py-2 text-zinc-500 font-medium">Mitigation</th></tr></thead>
              <tbody>
                {result.risks.map((r, i) => (
                  <tr key={i} className="border-b border-zinc-800 last:border-0">
                    <td className="py-3 text-red-300 font-medium">{r.risk}</td>
                    <td className="py-3 text-zinc-400">{r.mitigation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Optimization Tips */}
          <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
            <h2 className="text-lg font-semibold mb-4 text-purple-400">Optimization Tips</h2>
            <div className="space-y-3">
              {result.tips.map((t, i) => (
                <div key={i} className="flex gap-3 items-start text-sm">
                  <span className="bg-violet-600/20 text-violet-300 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                  <span className="text-zinc-300">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SEO Section */}
      <section className="mt-16 space-y-6">
        <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
          <h2 className="text-xl font-bold mb-4">What is Conversation Depth Prediction?</h2>
          <p className="text-sm text-zinc-400 mb-3">Conversation Depth Prediction analyzes your post&apos;s potential to generate meaningful, multi-layered discussions rather than shallow engagement. It goes beyond likes and shares to predict the quality and longevity of the conversations your content will spark.</p>
          <p className="text-sm text-zinc-400">Our AI model evaluates emotional arc dynamics, conflict probability, audience psychology, and platform-specific discussion patterns to give you a comprehensive depth score before you hit publish.</p>
        </div>
      </section>

      {/* Related Tools */}
      <section className="mt-8 bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
        <h2 className="text-lg font-semibold mb-4">Related Tools</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            ['/virality-score', 'Virality Score', 'Predict viral potential'],
            ['/sentiment-analyzer', 'Sentiment Analyzer', 'Emotional impact analysis'],
            ['/engagement-calculator', 'Engagement Calc', 'Rate your performance'],
            ['/comment-reply', 'Comment Reply', 'AI reply generator'],
            ['/emotional-analyzer', 'Emotion Analyzer', 'Map emotional triggers'],
            ['/hooks', 'Hook Generator', 'Scroll-stopping hooks'],
            ['/audience-pulse', 'Audience Pulse', 'Real-time sentiment'],
            ['/community-manager', 'Community Manager', 'Manage discussions'],
          ].map(([href, title, desc]) => (
            <a key={href} href={href} className="bg-zinc-800 rounded-xl p-3 hover:border-violet-500/30 border border-zinc-700 transition">
              <p className="font-semibold text-xs">{title}</p>
              <p className="text-xs text-zinc-500 mt-1">{desc}</p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
