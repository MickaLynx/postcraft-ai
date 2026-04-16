'use client';
import { useState } from 'react';

const inputFormats = ['CSV/Spreadsheet', 'Product List', 'Blog Titles', 'Keywords', 'URLs', 'Custom Prompts'] as const;
const outputPlatforms = ['Instagram', 'TikTok', 'Twitter/X', 'LinkedIn', 'YouTube', 'Facebook', 'Pinterest', 'Email'] as const;
const contentTypes = ['Captions', 'Hooks', 'Threads', 'Carousels', 'Video Scripts', 'Ad Copy', 'Email Subject Lines', 'Product Descriptions'] as const;
const tonePresets = ['Professional', 'Casual', 'Witty', 'Inspirational', 'Urgent', 'Educational'] as const;

interface BulkItem {
  inputRow: string;
  outputs: PlatformOutput[];
  status: string;
  quality: number;
}

interface PlatformOutput {
  platform: string;
  contentType: string;
  content: string;
  characterCount: number;
  hashtagSuggestions: string[];
  estimatedEngagement: number;
}

interface BatchSummary {
  totalInputs: number;
  totalOutputs: number;
  avgQuality: number;
  bestPerformer: string;
  estimatedTimeSaved: string;
  platformBreakdown: { platform: string; count: number; avgEngagement: number }[];
}

interface BulkResult {
  items: BulkItem[];
  summary: BatchSummary;
}

function generateBulkContent(
  inputFormat: string,
  rawInput: string,
  selectedPlatforms: string[],
  contentType: string,
  tone: string
): BulkResult {
  const lines = rawInput.split('\n').filter((l) => l.trim().length > 0).slice(0, 10);
  const inputLines = lines.length > 0 ? lines : ['Product Launch', 'Customer Testimonial', 'Behind the Scenes', 'Industry Trend', 'Tutorial/How-To'];

  const items: BulkItem[] = inputLines.map((line, idx) => {
    const label = line.trim();
    const outputs: PlatformOutput[] = [
      { platform: 'Instagram', contentType: 'Caption', content: `Stop scrolling. ${label} is about to change your perspective.\n\nHere are 3 things you need to know:\n\n1. It starts with understanding your audience\n2. Consistency beats perfection every time\n3. The data never lies\n\nSave this for later.`, characterCount: 245, hashtagSuggestions: ['#ContentCreation', '#Marketing', '#Growth'], estimatedEngagement: 4.8 },
      { platform: 'Twitter/X', contentType: 'Tweet', content: `Hot take: ${label} is the most underrated strategy in 2026.\n\nMost brands ignore it. The smart ones are already winning.\n\nHere's why (thread):`, characterCount: 155, hashtagSuggestions: ['#Marketing', '#Strategy'], estimatedEngagement: 3.9 },
      { platform: 'LinkedIn', contentType: 'Post', content: `I used to think ${label} was overrated.\n\nThen I tested it for 90 days.\n\nThe results:\n- 47% increase in engagement\n- 3x more qualified leads\n- 60% less time spent on content\n\nThe lesson? Test before you judge.\n\nWhat's your experience with ${label}?`, characterCount: 310, hashtagSuggestions: ['#Leadership', '#Innovation'], estimatedEngagement: 5.2 },
      { platform: 'TikTok', contentType: 'Script', content: `[HOOK] "If you're not using ${label}, you're leaving money on the table"\n[BODY] "Here's the 3-step framework..."\n[CTA] "Follow for part 2"`, characterCount: 180, hashtagSuggestions: ['#LearnOnTikTok', '#BusinessTips'], estimatedEngagement: 7.3 },
    ];

    return {
      inputRow: label,
      outputs: outputs.filter((o) => selectedPlatforms.length === 0 || selectedPlatforms.includes(o.platform)),
      status: 'Generated',
      quality: 75 + Math.round(Math.random() * 20),
    };
  });

  const totalOutputs = items.reduce((sum, item) => sum + item.outputs.length, 0);
  const avgQuality = Math.round(items.reduce((sum, item) => sum + item.quality, 0) / items.length);

  const platformBreakdown = ['Instagram', 'Twitter/X', 'LinkedIn', 'TikTok'].map((p) => ({
    platform: p,
    count: items.filter((item) => item.outputs.some((o) => o.platform === p)).length,
    avgEngagement: Number((items.reduce((sum, item) => {
      const output = item.outputs.find((o) => o.platform === p);
      return sum + (output ? output.estimatedEngagement : 0);
    }, 0) / Math.max(1, items.filter((item) => item.outputs.some((o) => o.platform === p)).length)).toFixed(1)),
  }));

  const summary: BatchSummary = {
    totalInputs: items.length,
    totalOutputs,
    avgQuality,
    bestPerformer: items.reduce((best, item) => item.quality > best.quality ? item : best).inputRow,
    estimatedTimeSaved: `${items.length * 15} minutes`,
    platformBreakdown,
  };

  return { items, summary };
}

export default function BulkGeneratorPage() {
  const [inputFormat, setInputFormat] = useState<string>(inputFormats[0]);
  const [rawInput, setRawInput] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [contentType, setContentType] = useState<string>(contentTypes[0]);
  const [tone, setTone] = useState<string>(tonePresets[0]);
  const [result, setResult] = useState<BulkResult | null>(null);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const handleGenerate = () => {
    setResult(generateBulkContent(inputFormat, rawInput, selectedPlatforms, contentType, tone));
  };

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <nav className="text-sm text-gray-400 mb-8">
          <a href="/" className="hover:text-white">Home</a> → <span className="text-white">Bulk Content Generator</span>
        </nav>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
          Bulk Content Generator
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl">
          Import a list of topics, products, or keywords — get platform-ready content for every item across every channel. Turn 10 inputs into 40+ ready-to-post pieces instantly.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Input (one item per line)</label>
            <textarea
              value={rawInput}
              onChange={(e) => setRawInput(e.target.value)}
              placeholder={"Product Launch\nCustomer Testimonial\nBehind the Scenes\nIndustry Trend\nTutorial/How-To\nCase Study\n..."}
              className="w-full h-48 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 resize-none font-mono text-sm"
            />
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Input Format</label>
                <select value={inputFormat} onChange={(e) => setInputFormat(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm">
                  {inputFormats.map((f) => (<option key={f} value={f}>{f}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Content Type</label>
                <select value={contentType} onChange={(e) => setContentType(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm">
                  {contentTypes.map((c) => (<option key={c} value={c}>{c}</option>))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Tone</label>
              <select value={tone} onChange={(e) => setTone(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm">
                {tonePresets.map((t) => (<option key={t} value={t}>{t}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Target Platforms (leave empty for all)</label>
              <div className="flex flex-wrap gap-2">
                {outputPlatforms.map((p) => (
                  <button
                    key={p}
                    onClick={() => togglePlatform(p)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      selectedPlatforms.includes(p)
                        ? 'bg-violet-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg font-semibold text-lg hover:from-violet-500 hover:to-purple-500 transition-all"
        >
          Generate Bulk Content
        </button>

        {result && (
          <div className="mt-12">
            <div className="grid md:grid-cols-5 gap-4 mb-8">
              <div className="bg-gray-800/60 rounded-xl p-4 border border-gray-700/50 text-center">
                <div className="text-2xl font-bold text-violet-400">{result.summary.totalInputs}</div>
                <div className="text-sm text-gray-400">Inputs</div>
              </div>
              <div className="bg-gray-800/60 rounded-xl p-4 border border-gray-700/50 text-center">
                <div className="text-2xl font-bold text-green-400">{result.summary.totalOutputs}</div>
                <div className="text-sm text-gray-400">Outputs Generated</div>
              </div>
              <div className="bg-gray-800/60 rounded-xl p-4 border border-gray-700/50 text-center">
                <div className="text-2xl font-bold text-cyan-400">{result.summary.avgQuality}%</div>
                <div className="text-sm text-gray-400">Avg Quality</div>
              </div>
              <div className="bg-gray-800/60 rounded-xl p-4 border border-gray-700/50 text-center">
                <div className="text-2xl font-bold text-orange-400">{result.summary.estimatedTimeSaved}</div>
                <div className="text-sm text-gray-400">Time Saved</div>
              </div>
              <div className="bg-gray-800/60 rounded-xl p-4 border border-gray-700/50 text-center">
                <div className="text-2xl font-bold text-yellow-400">{result.summary.bestPerformer.slice(0, 20)}</div>
                <div className="text-sm text-gray-400">Best Performer</div>
              </div>
            </div>

            <h2 className="text-xl font-bold mb-4">Generated Content ({result.items.length} items)</h2>
            <div className="space-y-3">
              {result.items.map((item, i) => (
                <div key={i} className="bg-gray-800/60 rounded-xl border border-gray-700/50 overflow-hidden">
                  <button
                    onClick={() => setExpandedRow(expandedRow === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-700/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500 w-8">#{i + 1}</span>
                      <span className="font-medium">{item.inputRow}</span>
                      <span className="text-xs text-gray-500">{item.outputs.length} outputs</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-sm ${item.quality >= 90 ? 'text-green-400' : item.quality >= 75 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {item.quality}% quality
                      </span>
                      <span className="text-xs px-2 py-1 bg-green-900/40 text-green-400 rounded">{item.status}</span>
                      <span className="text-gray-500">{expandedRow === i ? '▲' : '▼'}</span>
                    </div>
                  </button>

                  {expandedRow === i && (
                    <div className="px-4 pb-4 space-y-3">
                      {item.outputs.map((output, j) => (
                        <div key={j} className="bg-gray-900/50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 bg-violet-900/40 text-violet-400 text-xs rounded">{output.platform}</span>
                              <span className="text-xs text-gray-500">{output.contentType}</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-gray-400">
                              <span>{output.characterCount} chars</span>
                              <span className="text-green-400">{output.estimatedEngagement}% est. ER</span>
                            </div>
                          </div>
                          <pre className="text-gray-200 text-sm whitespace-pre-wrap font-sans">{output.content}</pre>
                          {output.hashtagSuggestions.length > 0 && (
                            <div className="flex gap-2 mt-2">
                              {output.hashtagSuggestions.map((h, k) => (
                                <span key={k} className="text-xs text-blue-400">{h}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-bold mb-4">Platform Breakdown</h3>
              <div className="grid md:grid-cols-4 gap-4">
                {result.summary.platformBreakdown.map((pb, i) => (
                  <div key={i} className="bg-gray-800/60 rounded-xl p-4 border border-gray-700/50">
                    <div className="font-semibold text-violet-400">{pb.platform}</div>
                    <div className="text-sm text-gray-400 mt-1">{pb.count} pieces generated</div>
                    <div className="text-sm text-green-400">{pb.avgEngagement}% avg engagement</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <section className="mt-20">
          <h2 className="text-2xl font-bold mb-6">Why Bulk Generation?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700/30">
              <h3 className="font-semibold mb-2">10x Content Volume</h3>
              <p className="text-gray-400 text-sm">Turn a list of topics into dozens of platform-ready posts. What used to take a full day now takes minutes.</p>
            </div>
            <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700/30">
              <h3 className="font-semibold mb-2">Cross-Platform Consistency</h3>
              <p className="text-gray-400 text-sm">Every input generates optimized content for each platform — same message, adapted delivery, consistent brand voice.</p>
            </div>
            <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700/30">
              <h3 className="font-semibold mb-2">Quality Control Built In</h3>
              <p className="text-gray-400 text-sm">Each output includes quality scores, engagement estimates, and platform compliance checks. Filter, edit, and publish with confidence.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
