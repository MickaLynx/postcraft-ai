'use client';
import { useState } from 'react';

const sourceFormats = ['Blog Post', 'Podcast Episode', 'YouTube Video', 'Webinar', 'Newsletter', 'Case Study', 'Research Report', 'Interview'] as const;
const outputPlatforms = ['Instagram', 'TikTok', 'Twitter/X', 'LinkedIn', 'YouTube Shorts', 'Pinterest', 'Email', 'Blog'] as const;
const toneVariants = ['Professional', 'Casual', 'Provocative', 'Educational', 'Entertaining', 'Inspirational'] as const;
const scalingGoals = ['Maximize Reach', 'Drive Engagement', 'Generate Leads', 'Build Authority', 'Grow Community', 'Increase Sales'] as const;

interface ContentAtom {
  type: string;
  content: string;
  platform: string;
  format: string;
  characterCount: number;
  estimatedEngagement: number;
}

interface VisualAsset {
  assetType: string;
  description: string;
  dimensions: string;
  platform: string;
  designNotes: string;
  effort: string;
}

interface CTAVariation {
  cta: string;
  tone: string;
  platform: string;
  action: string;
  urgency: string;
  conversionEstimate: number;
}

interface ComplianceCheck {
  platform: string;
  requirement: string;
  status: string;
  fix: string;
}

interface RepurposeTimeline {
  day: number;
  platform: string;
  contentPiece: string;
  format: string;
  purpose: string;
}

interface ScalerResult {
  contentAtoms: ContentAtom[];
  visualAssets: VisualAsset[];
  ctaVariations: CTAVariation[];
  complianceChecks: ComplianceCheck[];
  repurposeTimeline: RepurposeTimeline[];
}

function generateScaledContent(
  sourceFormat: string,
  selectedPlatforms: string[],
  toneVariant: string,
  scalingGoal: string,
  sourceTitle: string,
  keyInsights: string
): ScalerResult {
  const titleLabel = sourceTitle || 'your content';
  const insightsLabel = keyInsights || 'key insights from your content';

  const contentAtomsData: ContentAtom[] = [
    { type: 'Hook Tweet', content: `Most people get ${titleLabel} completely wrong. Here's what actually works (thread):`, platform: 'Twitter/X', format: 'Thread opener', characterCount: 95, estimatedEngagement: 4.2 },
    { type: 'LinkedIn Story Post', content: `Last year I made a costly mistake with ${titleLabel}.\n\nIt took me 3 months to recover.\n\nBut what I learned changed my entire approach.\n\nHere are the 5 lessons that turned failure into my biggest advantage:\n\n(Based on ${insightsLabel})`, platform: 'LinkedIn', format: 'Text post (1200+ chars)', characterCount: 280, estimatedEngagement: 3.8 },
    { type: 'Instagram Carousel Hook', content: `STOP doing ${titleLabel} the old way.\n\nSwipe → for the method that actually works in 2026.`, platform: 'Instagram', format: 'Carousel (slide 1)', characterCount: 88, estimatedEngagement: 4.5 },
    { type: 'TikTok Script', content: `[HOOK - 1 sec] "Nobody told me this about ${titleLabel}"\n[CONTEXT - 5 sec] "I spent 6 months figuring this out so you don't have to"\n[VALUE - 20 sec] "${insightsLabel} - explained simply"\n[CTA - 3 sec] "Follow for part 2 — I'll go deeper"`, platform: 'TikTok', format: 'Video script (30s)', characterCount: 250, estimatedEngagement: 6.1 },
    { type: 'YouTube Short Script', content: `"The biggest myth about ${titleLabel}?"\n[PAUSE 1 sec]\n"That you need [common assumption]. Here's the truth:"\n[Key insight in 15 seconds]\n"Subscribe for the full breakdown."`, platform: 'YouTube Shorts', format: 'Short video (45s)', characterCount: 200, estimatedEngagement: 5.2 },
    { type: 'Pinterest Pin Description', content: `${titleLabel} — Complete Guide | ${insightsLabel} | Save this pin for later and share with someone who needs to hear this. #${titleLabel.replace(/\s+/g, '')}`, platform: 'Pinterest', format: 'Pin description', characterCount: 180, estimatedEngagement: 3.4 },
    { type: 'Email Subject Line', content: `The ${titleLabel} mistake costing you money (+ how to fix it)`, platform: 'Email', format: 'Subject line', characterCount: 62, estimatedEngagement: 28.5 },
    { type: 'Email Body Preview', content: `Hi [Name],\n\nI just published my deepest analysis on ${titleLabel}.\n\nThe TL;DR: ${insightsLabel}\n\nBut the full breakdown has 5 actionable strategies you can implement today.\n\n→ Read the full guide here\n\nBest,\n[Your name]`, platform: 'Email', format: 'Email body', characterCount: 320, estimatedEngagement: 12.0 },
  ];

  const filteredAtoms = contentAtomsData.filter(a =>
    selectedPlatforms.some(p => a.platform.includes(p)) || selectedPlatforms.includes('All')
  );

  const visualAssetsData: VisualAsset[] = [
    { assetType: 'Quote Card', description: `Pull the most impactful one-liner from "${titleLabel}" and overlay on a branded background`, dimensions: '1080x1080 (Instagram) / 1200x627 (Twitter)', platform: 'Instagram + Twitter/X', designNotes: 'Large text, brand colors, minimal design. Should be screenshottable.', effort: 'Low' },
    { assetType: 'Carousel Template', description: `8-10 slides breaking down the key points of "${titleLabel}" into visual steps`, dimensions: '1080x1350 (Instagram) / 1080x1080 (LinkedIn)', platform: 'Instagram + LinkedIn', designNotes: 'One insight per slide, numbered, consistent typography. Hook slide with question.', effort: 'Medium' },
    { assetType: 'Infographic', description: `Data visualization of the key statistics and frameworks from "${titleLabel}"`, dimensions: '1000x2500 (Pinterest) / 1080x1920 (Stories)', platform: 'Pinterest + Instagram Stories', designNotes: 'Vertical layout, scannable sections, branded color palette, key stats highlighted.', effort: 'High' },
    { assetType: 'Audiogram', description: `30-60 second audio clip with waveform animation from the most compelling segment`, dimensions: '1080x1080 (square) / 1080x1920 (vertical)', platform: 'Instagram + Twitter/X + LinkedIn', designNotes: 'Add captions (85% watch without sound). Use brand colors for waveform.', effort: 'Medium' },
    { assetType: 'Thumbnail', description: `Click-worthy thumbnail for YouTube/blog featuring a bold claim from "${titleLabel}"`, dimensions: '1280x720 (YouTube) / 1200x630 (Blog OG)', platform: 'YouTube + Blog', designNotes: 'Face close-up + large text + 3 colors max. Test readability at mobile size.', effort: 'Low' },
    { assetType: 'Story Sequence', description: `5-7 story slides summarizing "${titleLabel}" with interactive elements`, dimensions: '1080x1920 (all platforms)', platform: 'Instagram + TikTok + Snapchat', designNotes: 'Add polls on slide 3, question sticker on slide 5, swipe-up/link on last slide.', effort: 'Medium' },
  ];

  const ctaVariationsData: CTAVariation[] = [
    { cta: 'Save this for when you need it', tone: 'Helpful', platform: 'Instagram', action: 'Bookmark/Save', urgency: 'Low', conversionEstimate: 8.2 },
    { cta: 'Drop a "YES" if this resonated', tone: 'Casual', platform: 'TikTok', action: 'Comment', urgency: 'Low', conversionEstimate: 12.5 },
    { cta: 'Bookmark this thread — you\'ll need it later', tone: 'Professional', platform: 'Twitter/X', action: 'Bookmark', urgency: 'Medium', conversionEstimate: 6.8 },
    { cta: 'What\'s your biggest challenge with this? Tell me in the comments.', tone: 'Engaging', platform: 'LinkedIn', action: 'Comment', urgency: 'Low', conversionEstimate: 4.1 },
    { cta: 'Get the full framework free — link in bio', tone: 'Direct', platform: 'Instagram + TikTok', action: 'Click', urgency: 'Medium', conversionEstimate: 3.2 },
    { cta: 'Reply YES and I\'ll send you the complete guide', tone: 'Exclusive', platform: 'Email', action: 'Reply', urgency: 'Medium', conversionEstimate: 18.0 },
    { cta: 'Share this with someone who needs to hear it', tone: 'Generous', platform: 'All', action: 'Share', urgency: 'Low', conversionEstimate: 2.8 },
    { cta: 'Limited spots — grab yours before Friday', tone: 'Urgent', platform: 'Email + LinkedIn', action: 'Purchase/Sign-up', urgency: 'High', conversionEstimate: 5.4 },
    { cta: 'Follow for part 2 — I go even deeper', tone: 'Teaser', platform: 'TikTok + Instagram', action: 'Follow', urgency: 'Low', conversionEstimate: 7.6 },
    { cta: 'Pin this for later — your future self will thank you', tone: 'Helpful', platform: 'Pinterest', action: 'Pin Save', urgency: 'Low', conversionEstimate: 9.1 },
  ];

  const complianceChecksData: ComplianceCheck[] = [
    { platform: 'Instagram', requirement: 'Caption under 2,200 characters (first 125 visible in feed)', status: 'Check', fix: 'Front-load hook + key message in first 125 characters. Use line breaks for readability.' },
    { platform: 'TikTok', requirement: 'Video under 90 seconds for distribution bonus', status: 'Check', fix: 'Edit ruthlessly — every second must earn its place. Cut intros under 2 seconds.' },
    { platform: 'Twitter/X', requirement: 'Thread tweets under 280 chars each (or 25K for long posts)', status: 'Check', fix: 'Each tweet should be standalone valuable. No tweet should just say "continued..."' },
    { platform: 'LinkedIn', requirement: 'No external links in post body (50% reach penalty)', status: 'Warning', fix: 'Put links in first comment only. Write "Link in comments" in the post.' },
    { platform: 'YouTube Shorts', requirement: 'Video must be vertical (9:16) and under 60 seconds', status: 'Check', fix: 'Record natively in vertical. Add subscribe CTA overlay. Use keywords in title.' },
    { platform: 'Pinterest', requirement: 'Pin image must be 2:3 ratio (1000x1500) for optimal display', status: 'Check', fix: 'Design vertical pins. Include keyword-rich text overlay and clear branding.' },
    { platform: 'Email', requirement: 'Subject under 60 chars, preview text under 90 chars', status: 'Check', fix: 'Test subject line with CoSchedule Headline Analyzer. Personalize with [Name].' },
    { platform: 'All', requirement: 'No watermarks from other platforms', status: 'Critical', fix: 'Always use original files. Never download from TikTok and upload to Instagram (or vice versa).' },
  ];

  const repurposeTimelineData: RepurposeTimeline[] = [
    { day: 1, platform: 'Primary Platform', contentPiece: `Original ${sourceFormat}: "${titleLabel}"`, format: sourceFormat, purpose: 'Launch — maximum effort on primary platform where your audience lives' },
    { day: 1, platform: 'Twitter/X', contentPiece: 'Thread summarizing key insights', format: 'Thread (7-10 tweets)', purpose: 'Quick distribution to professional audience — drives traffic to original' },
    { day: 2, platform: 'LinkedIn', contentPiece: 'Personal story post inspired by the content', format: 'Text post (1200+ chars)', purpose: 'Reframe insights as personal experience for professional audience' },
    { day: 2, platform: 'Instagram', contentPiece: 'Carousel breaking down the framework', format: 'Carousel (8-10 slides)', purpose: 'Visual learners + save-worthy format drives algorithm favor' },
    { day: 3, platform: 'TikTok', contentPiece: '30-second highlight of the most surprising insight', format: 'Short video', purpose: 'Reach new audience — TikTok has highest organic discovery rate' },
    { day: 3, platform: 'Email', contentPiece: 'Newsletter featuring the content + exclusive bonus', format: 'Email broadcast', purpose: 'Owned audience — deepest engagement, highest conversion potential' },
    { day: 4, platform: 'YouTube Shorts', contentPiece: '45-second teaser of the most actionable tip', format: 'Vertical short video', purpose: 'YouTube Shorts shelf drives passive discovery to your channel' },
    { day: 5, platform: 'Pinterest', contentPiece: '5-10 Pin variations from the content', format: 'Static Pins + Infographic', purpose: 'Long-tail discovery — Pins surface in search for months' },
    { day: 7, platform: 'Instagram Stories', contentPiece: '"One week later" follow-up with results/feedback', format: 'Story sequence (5-7 slides)', purpose: 'Re-engage audience and show social proof of impact' },
    { day: 14, platform: 'Blog', contentPiece: 'SEO-optimized article expanding on the content', format: 'Long-form blog post', purpose: 'Capture search traffic — evergreen content for organic growth' },
  ];

  return {
    contentAtoms: filteredAtoms.length > 0 ? filteredAtoms : contentAtomsData,
    visualAssets: visualAssetsData,
    ctaVariations: ctaVariationsData,
    complianceChecks: complianceChecksData,
    repurposeTimeline: repurposeTimelineData,
  };
}

export default function ContentScalerPage() {
  const [sourceFormat, setSourceFormat] = useState<string>(sourceFormats[0]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['Instagram', 'TikTok', 'Twitter/X', 'LinkedIn']);
  const [toneVariant, setToneVariant] = useState<string>(toneVariants[0]);
  const [scalingGoal, setScalingGoal] = useState<string>(scalingGoals[0]);
  const [sourceTitle, setSourceTitle] = useState('');
  const [keyInsights, setKeyInsights] = useState('');
  const [result, setResult] = useState<ScalerResult | null>(null);

  const togglePlatform = (p: string) => {
    setSelectedPlatforms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  };

  const effortColor = (e: string) => {
    switch (e) { case 'Low': return 'bg-green-100 text-green-700'; case 'Medium': return 'bg-yellow-100 text-yellow-700'; case 'High': return 'bg-red-100 text-red-700'; default: return 'bg-gray-100 text-gray-700'; }
  };

  const statusColor = (s: string) => {
    switch (s) { case 'Check': return 'bg-green-100 text-green-700'; case 'Warning': return 'bg-yellow-100 text-yellow-700'; case 'Critical': return 'bg-red-100 text-red-700'; default: return 'bg-gray-100 text-gray-700'; }
  };

  const urgencyColor = (u: string) => {
    switch (u) { case 'High': return 'bg-red-100 text-red-700'; case 'Medium': return 'bg-yellow-100 text-yellow-700'; default: return 'bg-green-100 text-green-700'; }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-orange-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Content Scaler</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform one piece of source content into a complete multi-platform content system. Get ready-to-use atoms, visual asset specs, CTA variations, compliance checks, and a 14-day repurpose timeline.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Source Format</label>
              <select value={sourceFormat} onChange={e => setSourceFormat(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent">
                {sourceFormats.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tone</label>
              <select value={toneVariant} onChange={e => setToneVariant(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent">
                {toneVariants.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Scaling Goal</label>
              <select value={scalingGoal} onChange={e => setScalingGoal(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent">
                {scalingGoals.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Source Title</label>
              <input type="text" value={sourceTitle} onChange={e => setSourceTitle(e.target.value)} placeholder="e.g. How to Build a Personal Brand in 2026" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Key Insights (comma-separated)</label>
              <input type="text" value={keyInsights} onChange={e => setKeyInsights(e.target.value)} placeholder="e.g. consistency beats talent, niche down first, content compounds" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent" />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Target Platforms</label>
            <div className="flex flex-wrap gap-2">
              {outputPlatforms.map(p => (
                <button key={p} onClick={() => togglePlatform(p)} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${selectedPlatforms.includes(p) ? 'bg-rose-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{p}</button>
              ))}
            </div>
          </div>
          <button onClick={() => setResult(generateScaledContent(sourceFormat, selectedPlatforms, toneVariant, scalingGoal, sourceTitle, keyInsights))} className="w-full py-4 bg-gradient-to-r from-rose-600 to-orange-600 text-white font-bold rounded-xl hover:from-rose-700 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl">
            Scale Content
          </button>
        </div>

        {result && (
          <div className="space-y-6">
            {/* 1. Content Atoms */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Content Atoms</h2>
              <div className="space-y-4">
                {result.contentAtoms.map((a, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-5">
                    <div className="flex flex-wrap items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-lg text-sm font-bold">{a.type}</span>
                        <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg text-xs font-bold">{a.platform}</span>
                        <span className="text-xs text-gray-400">{a.format}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500">{a.characterCount} chars</span>
                        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">{a.estimatedEngagement}% eng.</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-800 whitespace-pre-line">{a.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Visual Assets */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Visual Asset Specs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.visualAssets.map((v, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-900">{v.assetType}</h3>
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${effortColor(v.effort)}`}>{v.effort}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{v.description}</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="bg-rose-50 text-rose-700 px-2 py-0.5 rounded text-xs font-bold">{v.dimensions}</span>
                      <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">{v.platform}</span>
                    </div>
                    <p className="text-xs text-gray-500">{v.designNotes}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. CTA Variations */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">CTA Variations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {result.ctaVariations.map((c, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-4">
                    <p className="font-medium text-gray-900 italic mb-2">"{c.cta}"</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded text-xs font-bold">{c.tone}</span>
                      <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">{c.platform}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${urgencyColor(c.urgency)}`}>{c.urgency}</span>
                      <span className="ml-auto text-xs text-gray-500">{c.action} — {c.conversionEstimate}% est.</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Compliance Checks */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Platform Compliance</h2>
              <div className="space-y-3">
                {result.complianceChecks.map((c, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-4 flex flex-col md:flex-row md:items-center gap-3">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-bold md:w-28 text-center">{c.platform}</span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusColor(c.status)}`}>{c.status}</span>
                    <p className="text-sm text-gray-700 flex-1">{c.requirement}</p>
                    <p className="text-xs text-gray-500 md:w-64">{c.fix}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Repurpose Timeline */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">14-Day Repurpose Timeline</h2>
              <div className="space-y-3">
                {result.repurposeTimeline.map((r, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-4 flex flex-wrap items-center gap-4">
                    <span className="bg-gradient-to-r from-rose-500 to-orange-500 text-white w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0">D{r.day}</span>
                    <div className="md:w-28"><span className="font-bold text-gray-900">{r.platform}</span></div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{r.contentPiece}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded text-xs font-bold">{r.format}</span>
                        <span className="text-xs text-gray-500">{r.purpose}</span>
                      </div>
                    </div>
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
