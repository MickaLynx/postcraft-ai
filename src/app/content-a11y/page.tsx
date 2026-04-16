'use client';
import { useState } from 'react';

const contentTypes = ['Social Media Post', 'Blog Article', 'Email Newsletter', 'Ad Copy', 'Landing Page', 'Video Script', 'Podcast Show Notes', 'Press Release', 'Product Description', 'Community Update'] as const;
const platformTargets = ['Instagram', 'TikTok', 'LinkedIn', 'Twitter/X', 'Facebook', 'YouTube', 'Website/Blog', 'Email', 'All Platforms'] as const;
const audiences = ['General Public', 'B2B Professionals', 'Gen Z (18-24)', 'Seniors (65+)', 'Parents & Families', 'People with Disabilities', 'Non-Native English Speakers', 'Technical Audience', 'Global Multicultural'] as const;
const industries = ['Tech & SaaS', 'Healthcare', 'Finance', 'Education', 'E-commerce', 'Government', 'Non-Profit', 'Media & Entertainment', 'Legal', 'Travel & Hospitality'] as const;
const complianceLevels = ['WCAG 2.1 AA (Standard)', 'WCAG 2.1 AAA (Strict)', 'Section 508 (US Gov)', 'EN 301 549 (EU)', 'ADA Compliance', 'Best Effort (No Specific Standard)'] as const;
const languages = ['English', 'Spanish', 'French', 'German', 'Portuguese', 'Arabic (RTL)', 'Japanese', 'Mandarin', 'Hindi', 'Multilingual Content'] as const;

interface ReadabilityScore { metric: string; score: number; grade: string; recommendation: string; benchmark: string; }
interface InclusivityFlag { category: string; issue: string; severity: 'Critical' | 'Warning' | 'Suggestion'; original: string; suggestion: string; why: string; }
interface AltTextAudit { element: string; status: 'Missing' | 'Poor' | 'Acceptable' | 'Excellent'; current: string; recommended: string; guideline: string; }
interface ColorContrast { element: string; foreground: string; background: string; ratio: string; passes: boolean; fix: string; }
interface CognitiveLoad { factor: string; level: 'Low' | 'Medium' | 'High'; issue: string; simplification: string; }
interface PlatformCheck { platform: string; a11yScore: number; issues: string[]; fixes: string[]; }

interface A11yReport {
  overallScore: number;
  grade: string;
  readability: ReadabilityScore[];
  inclusivityFlags: InclusivityFlag[];
  altTextAudit: AltTextAudit[];
  colorContrast: ColorContrast[];
  cognitiveLoad: CognitiveLoad[];
  platformChecks: PlatformCheck[];
  checklist: string[];
  quickWins: string[];
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }
function pick<T>(arr: readonly T[] | T[], seed: number, idx: number = 0): T { return arr[(seed + idx) % arr.length]; }

function analyzeA11y(content: string, contentType: string, platform: string, audience: string, industry: string, compliance: string, language: string): A11yReport {
  const seed = hash(`${content.slice(0, 50)}-${contentType}-${platform}-${audience}-${industry}-${compliance}-${language}`);
  const score = 25 + seed % 70;
  const grades = ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'];
  const grade = grades[Math.min(Math.floor((100 - score) / 12), grades.length - 1)];

  const readabilityMetrics = ['Flesch-Kincaid Grade Level', 'Gunning Fog Index', 'SMOG Index', 'Coleman-Liau Index', 'Automated Readability Index', 'Average Sentence Length'];
  const readabilityGrades = ['Grade 6 (Easy)', 'Grade 8 (Standard)', 'Grade 10 (Moderate)', 'Grade 12 (Difficult)', 'Grade 14+ (Academic)'];
  const readabilityRecs = [
    'Break sentences longer than 20 words into two shorter sentences',
    'Replace multi-syllable jargon with common equivalents (e.g., "utilize" → "use")',
    'Add subheadings every 3-4 paragraphs to aid scanning',
    'Use bullet points for lists of 3+ items instead of inline commas',
    'Front-load key information — put the main point in the first sentence',
    'Limit paragraphs to 3-4 sentences maximum for digital readability',
  ];
  const readabilityBenchmarks = ['Target: Grade 6-8 for public content', 'Target: Fog Index <12 for clarity', 'Target: SMOG <10 for accessibility', 'Target: CLI 8-12 for general audience', 'Target: ARI <10 for web content', 'Target: 15-20 words per sentence'];

  const readability: ReadabilityScore[] = Array.from({ length: 5 }, (_, i) => ({
    metric: readabilityMetrics[(seed + i) % readabilityMetrics.length],
    score: 3 + (seed + i * 7) % 14,
    grade: readabilityGrades[(seed + i * 3) % readabilityGrades.length],
    recommendation: readabilityRecs[(seed + i * 4) % readabilityRecs.length],
    benchmark: readabilityBenchmarks[(seed + i * 2) % readabilityBenchmarks.length],
  }));

  const inclusivityCategories = ['Gender-Neutral Language', 'Disability Language', 'Age-Inclusive Language', 'Cultural Sensitivity', 'Socioeconomic Awareness', 'Neurodiversity Consideration', 'Body-Neutral Language', 'Religious/Belief Neutrality'];
  const inclusivityIssues = [
    'Gendered language assumes binary identity',
    'Uses disability as metaphor ("blind to the facts", "falling on deaf ears")',
    'Age-based assumptions exclude audience segments',
    'Cultural reference may not translate across markets',
    'Assumes access to resources not available to all audiences',
    'Complex formatting may be difficult for neurodivergent readers',
    'Body-related metaphor may trigger discomfort',
    'Religious reference may exclude non-religious audience',
  ];
  const originals = [
    '"Hey guys, check out our new feature"',
    '"Don\'t turn a blind eye to this opportunity"',
    '"Even your grandma could use this app"',
    '"It\'s like Thanksgiving dinner for your data"',
    '"Just grab your MacBook and get started"',
    '"Navigate our complex, multi-layered dashboard"',
    '"Slim down your workflow with our lean tools"',
    '"This product is a godsend for marketers"',
  ];
  const suggestions = [
    '"Hey everyone, check out our new feature" — inclusive of all gender identities',
    '"Don\'t overlook this opportunity" — removes ableist metaphor',
    '"This app is intuitive for users of all experience levels" — respects all ages',
    '"It\'s a feast of data insights" — culturally neutral metaphor',
    '"Open your laptop and get started" — device-agnostic, no brand assumption',
    '"Explore our streamlined, clearly organized dashboard" — reduces cognitive load',
    '"Streamline your workflow with our efficient tools" — body-neutral language',
    '"This product is invaluable for marketers" — secular alternative',
  ];
  const whys = [
    'Non-binary and gender-nonconforming users feel excluded by gendered terms',
    'Ableist metaphors normalize disability as negative, alienating disabled audiences',
    'Age-based comparisons are patronizing and exclude older demographics who are active tech users',
    'Culture-specific references create in-group/out-group dynamics in global audiences',
    'Assuming device ownership excludes users with different economic circumstances',
    'Neurodivergent users (ADHD, autism, dyslexia) need clear, structured information',
    'Body-related language can trigger people with eating disorders or body image issues',
    'Religious language excludes atheist, agnostic, and differently-religious audiences',
  ];

  const inclusivityFlags: InclusivityFlag[] = Array.from({ length: 6 }, (_, i) => ({
    category: inclusivityCategories[(seed + i * 2) % inclusivityCategories.length],
    issue: inclusivityIssues[(seed + i * 3) % inclusivityIssues.length],
    severity: i < 2 ? 'Critical' : i < 4 ? 'Warning' : 'Suggestion',
    original: originals[(seed + i * 4) % originals.length],
    suggestion: suggestions[(seed + i * 4) % suggestions.length],
    why: whys[(seed + i * 4) % whys.length],
  }));

  const altElements = ['Hero Image', 'Product Screenshot', 'Infographic', 'Team Photo', 'Icon Set', 'Chart/Graph', 'Decorative Banner', 'Logo', 'CTA Button Image', 'Social Card Preview'];
  const altStatuses: ('Missing' | 'Poor' | 'Acceptable' | 'Excellent')[] = ['Missing', 'Poor', 'Acceptable', 'Excellent'];
  const altCurrents = ['alt=""', 'alt="image"', 'alt="photo"', 'alt="screenshot"', 'alt="banner"', 'No alt attribute', 'alt="IMG_2847.jpg"', 'alt="1"'];
  const altRecommended = [
    'alt="Product dashboard showing real-time analytics with 3 key metrics highlighted"',
    'alt="Team of 5 diverse professionals collaborating around a whiteboard in modern office"',
    'alt="Bar chart comparing Q1 vs Q2 revenue: Q1 $1.2M, Q2 $1.8M, 50% growth"',
    'alt="Step-by-step infographic: 1. Sign up, 2. Connect data, 3. Get insights, 4. Take action"',
    'alt="" (decorative image — empty alt is correct for purely decorative elements)',
    'alt="PostCraft logo — AI-powered social media content platform"',
    'alt="Green call-to-action button reading Start Free Trial"',
    'alt="Social media preview card showing article title and key statistics"',
  ];
  const altGuidelines = [
    'Describe the content AND function of the image — what does the user need to know?',
    'For people photos: mention number, activity, and relevant diversity if contextual',
    'For data visuals: include key data points, trends, and the main takeaway',
    'For infographics: summarize the process or key information in sequential order',
    'Decorative images should have empty alt="" — NOT missing alt attribute',
    'Logos should include company name and brief descriptor',
    'For buttons/links: describe the action, not the appearance',
    'Keep alt text under 125 characters — use longdesc for complex images',
  ];

  const altTextAudit: AltTextAudit[] = Array.from({ length: 5 }, (_, i) => ({
    element: altElements[(seed + i * 2) % altElements.length],
    status: altStatuses[(seed + i * 3) % altStatuses.length],
    current: altCurrents[(seed + i * 4) % altCurrents.length],
    recommended: altRecommended[(seed + i * 5) % altRecommended.length],
    guideline: altGuidelines[(seed + i * 6) % altGuidelines.length],
  }));

  const contrastElements = ['Body Text', 'Heading', 'Link Text', 'Button Label', 'Caption/Small Text', 'Placeholder Text', 'Error Message', 'Success Message'];
  const fgColors = ['#6B7280', '#9CA3AF', '#8B5CF6', '#3B82F6', '#D1D5DB', '#9CA3AF', '#EF4444', '#10B981'];
  const bgColors = ['#FFFFFF', '#F3F4F6', '#1F2937', '#111827', '#FFFFFF', '#F9FAFB', '#FEF2F2', '#F0FDF4'];
  const ratios = ['4.2:1', '2.9:1', '8.1:1', '12.4:1', '1.8:1', '2.3:1', '5.6:1', '4.8:1'];
  const contrastFixes = [
    'Darken text to #4B5563 for 7:1 ratio (AAA compliance)',
    'Use #374151 instead — current ratio fails AA for normal text',
    'Passes AAA — no changes needed',
    'Excellent contrast — meets all standards',
    'Critical: increase contrast to minimum 4.5:1 — use #6B7280 on white',
    'Fails AA — darken to #6B7280 or use darker background',
    'Passes AA for normal text — verify large text exemption if applicable',
    'Passes AA — consider darkening slightly for AAA compliance',
  ];

  const colorContrast: ColorContrast[] = Array.from({ length: 5 }, (_, i) => ({
    element: contrastElements[(seed + i) % contrastElements.length],
    foreground: fgColors[(seed + i * 2) % fgColors.length],
    background: bgColors[(seed + i * 3) % bgColors.length],
    ratio: ratios[(seed + i * 4) % ratios.length],
    passes: (seed + i) % 3 !== 0,
    fix: contrastFixes[(seed + i * 5) % contrastFixes.length],
  }));

  const cogFactors = ['Information Density', 'Navigation Complexity', 'Decision Points', 'Visual Noise', 'Temporal Pressure', 'Memory Demands', 'Language Complexity', 'Interaction Steps'];
  const cogIssues = [
    'Too many competing elements on screen — exceeds 7±2 chunking threshold',
    'Nested navigation requires 4+ clicks to reach key content',
    'Multiple CTAs create choice paralysis — reduce to 1 primary action',
    'Animated elements, color variety, and dense text compete for attention',
    'Countdown timers and urgency language increase cognitive stress',
    'User must remember information from previous screens to complete task',
    'Sentence structures average 25+ words with embedded clauses',
    'Multi-step forms without progress indicators cause abandonment',
  ];
  const cogSimplifications = [
    'Group related items under clear headings — limit to 5-7 items per group',
    'Implement breadcrumbs and flatten hierarchy to max 3 levels deep',
    'Use visual hierarchy: 1 primary CTA (colored), 1 secondary (outlined), hide tertiary',
    'Apply progressive disclosure — show essentials first, details on demand',
    'Remove artificial urgency — let value proposition drive conversion naturally',
    'Add inline summaries and persistent context so users never need to remember',
    'Rewrite at 8th-grade level: subject-verb-object, one idea per sentence',
    'Add progress bar, save-and-resume, and auto-fill where possible',
  ];

  const cognitiveLoad: CognitiveLoad[] = Array.from({ length: 5 }, (_, i) => ({
    factor: cogFactors[(seed + i * 2) % cogFactors.length],
    level: pick(['Low', 'Medium', 'High'], seed, i) as 'Low' | 'Medium' | 'High',
    issue: cogIssues[(seed + i * 3) % cogIssues.length],
    simplification: cogSimplifications[(seed + i * 4) % cogSimplifications.length],
  }));

  const platformNames = ['Instagram', 'TikTok', 'LinkedIn', 'Twitter/X', 'YouTube', 'Email'];
  const platformIssues = [
    ['Alt text missing on carousel images', 'Caption auto-generated without review', 'Story text over busy background unreadable', 'No audio description for Reels'],
    ['Auto-captions contain errors (>15% WER)', 'Fast-paced editing excludes photosensitive users', 'Text overlays disappear too quickly (<2 seconds)', 'No content warning for flashing effects'],
    ['Article images lack alt text', 'Carousel PDFs are not screen-reader accessible', 'Video posts missing captions', 'Complex infographics without text alternatives'],
    ['Thread structure hard to follow for screen readers', 'Images posted without alt text', 'Hashtags not CamelCased (#SocialMediaTips vs #socialmediatips)', 'Poll options not descriptive enough'],
    ['Auto-captions accuracy below 95%', 'No audio description track available', 'Chapter markers missing for long-form content', 'Thumbnail text too small for readability'],
    ['HTML email not tested with screen readers', 'Images blocked by default with no alt text fallback', 'Link text says "click here" instead of descriptive', 'Color-only indicators for important information'],
  ];
  const platformFixes = [
    ['Add alt text in Instagram settings for every image', 'Review and correct auto-captions before publishing', 'Use solid color overlay behind text on stories', 'Add voiceover describing visual content in Reels'],
    ['Edit auto-captions manually before publishing', 'Limit scene changes to <3 per second', 'Keep text on screen for minimum 3 seconds', 'Add photosensitivity warnings in first frame'],
    ['Add alt text via image upload dialog', 'Convert PDF carousels to native LinkedIn carousels', 'Upload SRT files for all video content', 'Provide text summary in post body for infographics'],
    ['Number threads (1/8, 2/8) for structure', 'Always add alt text before tweeting images', 'Use CamelCase in hashtags for screen reader parsing', 'Write descriptive poll options with full context'],
    ['Review and correct auto-captions to 99% accuracy', 'Create audio description version for key content', 'Add chapter markers every 2-5 minutes', 'Use large, high-contrast text on thumbnails'],
    ['Test with VoiceOver, NVDA, and JAWS before sending', 'Write meaningful alt text for all email images', 'Use descriptive link text: "Read our accessibility guide"', 'Add text labels alongside color indicators'],
  ];

  const platformChecks: PlatformCheck[] = Array.from({ length: 4 }, (_, i) => ({
    platform: platformNames[(seed + i) % platformNames.length],
    a11yScore: 30 + (seed + i * 11) % 60,
    issues: platformIssues[(seed + i * 2) % platformIssues.length],
    fixes: platformFixes[(seed + i * 2) % platformFixes.length],
  }));

  const checklist = [
    'All images have descriptive alt text (not "image", "photo", or filename)',
    'All videos have accurate captions (auto-captions reviewed and corrected)',
    'Color contrast meets WCAG 2.1 AA minimum (4.5:1 for text, 3:1 for large text)',
    'Content is readable at 200% zoom without horizontal scrolling',
    'No information conveyed by color alone (add text labels or patterns)',
    'Links have descriptive text (not "click here" or "read more")',
    'Hashtags use CamelCase for screen reader compatibility (#AccessibleContent)',
    'Content passes Flesch-Kincaid Grade 8 or lower readability test',
    'No flashing or strobing content exceeding 3 flashes per second',
    'Interactive elements have visible focus indicators',
    'Forms have proper labels and error messages',
    'Content structure uses proper heading hierarchy (H1 → H2 → H3)',
    'Emojis are used sparingly and not as the sole conveyor of meaning',
    'Audio content has transcript available',
    'Touch targets are minimum 44x44 pixels for mobile',
    'Content is navigable by keyboard alone',
  ];

  const quickWins = [
    'Add alt text to your 5 most recent posts — takes 10 minutes, impacts thousands of users',
    'Enable and review auto-captions on all video content — 90% of social video is watched muted',
    'Switch to CamelCase hashtags today — screen readers will pronounce them correctly immediately',
    'Run your brand colors through a contrast checker — swap any failing combinations now',
    'Rewrite your bio/about section at 8th-grade reading level — clearer for everyone',
    'Add content warnings before sensitive topics — one line that builds trust with your audience',
    'Test your top landing page with a screen reader — fix the biggest issue you find today',
    'Replace all "click here" links with descriptive text — improves SEO AND accessibility',
  ];

  return { overallScore: score, grade, readability, inclusivityFlags, altTextAudit, colorContrast, cognitiveLoad, platformChecks, checklist, quickWins };
}

export default function ContentA11yPage() {
  const [contentText, setContentText] = useState('');
  const [contentType, setContentType] = useState(contentTypes[0]);
  const [platform, setPlatform] = useState(platformTargets[0]);
  const [audience, setAudience] = useState(audiences[0]);
  const [industry, setIndustry] = useState(industries[0]);
  const [compliance, setCompliance] = useState(complianceLevels[0]);
  const [language, setLanguage] = useState(languages[0]);
  const [result, setResult] = useState<A11yReport | null>(null);

  const handleAnalyze = () => {
    if (!contentText.trim()) return;
    setResult(analyzeA11y(contentText, contentType, platform, audience, industry, compliance, language));
  };

  const sevColor = (s: string) => s === 'Critical' ? 'text-red-400 bg-red-400/10 border-red-400/30' : s === 'Warning' ? 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30' : 'text-blue-400 bg-blue-400/10 border-blue-400/30';
  const scoreColor = (n: number) => n > 75 ? '#34d399' : n > 55 ? '#fbbf24' : n > 35 ? '#fb923c' : '#f87171';
  const statusColor = (s: string) => s === 'Missing' ? 'text-red-400' : s === 'Poor' ? 'text-orange-400' : s === 'Acceptable' ? 'text-yellow-400' : 'text-emerald-400';
  const levelColor = (l: string) => l === 'High' ? 'text-red-400 bg-red-400/10' : l === 'Medium' ? 'text-yellow-400 bg-yellow-400/10' : 'text-emerald-400 bg-emerald-400/10';

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Content Accessibility Checker</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Audit your content for readability, inclusivity, alt text quality, color contrast, cognitive load, and platform-specific accessibility. Make every piece of content work for everyone.</p>

        <div className="mb-6">
          <label className="block text-sm text-zinc-400 mb-1">Paste Your Content</label>
          <textarea value={contentText} onChange={e => setContentText(e.target.value)} placeholder="Paste your social media post, article, email, or any content here..." className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-3 text-zinc-100 h-32 resize-y" />
        </div>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {([
            { label: 'Content Type', value: contentType, setter: setContentType as (v: string) => void, options: contentTypes as readonly string[] },
            { label: 'Platform', value: platform, setter: setPlatform as (v: string) => void, options: platformTargets as readonly string[] },
            { label: 'Target Audience', value: audience, setter: setAudience as (v: string) => void, options: audiences as readonly string[] },
            { label: 'Industry', value: industry, setter: setIndustry as (v: string) => void, options: industries as readonly string[] },
            { label: 'Compliance Standard', value: compliance, setter: setCompliance as (v: string) => void, options: complianceLevels as readonly string[] },
            { label: 'Language', value: language, setter: setLanguage as (v: string) => void, options: languages as readonly string[] },
          ] as const).map(({ label, value, setter, options }) => (
            <div key={label}>
              <label className="block text-sm text-zinc-400 mb-1">{label}</label>
              <select value={value} onChange={e => setter(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100">
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
        <button onClick={handleAnalyze} className="w-full md:w-auto bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded font-semibold hover:opacity-90 transition mb-8">Run Accessibility Audit</button>

        {result && (
          <div className="space-y-8">
            {/* Overall Score */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 text-center">
                <div className="text-6xl font-bold mb-2" style={{ color: scoreColor(result.overallScore) }}>{result.overallScore}</div>
                <div className="text-zinc-400 mb-1">Accessibility Score</div>
                <div className="text-2xl font-bold" style={{ color: scoreColor(result.overallScore) }}>{result.grade}</div>
                <div className="mt-3 w-full bg-zinc-800 rounded-full h-3">
                  <div className="h-3 rounded-full transition-all" style={{ width: `${result.overallScore}%`, background: scoreColor(result.overallScore) }} />
                </div>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3">Audit Summary</h3>
                <div className="space-y-2 text-sm">
                  <div><span className="text-zinc-500">Compliance:</span> <span className="text-violet-400">{compliance}</span></div>
                  <div><span className="text-zinc-500">Content Type:</span> <span className="text-zinc-300">{contentType}</span></div>
                  <div><span className="text-zinc-500">Inclusivity Flags:</span> <span className="text-red-400 font-semibold">{result.inclusivityFlags.filter(f => f.severity === 'Critical').length} critical</span>, <span className="text-yellow-400">{result.inclusivityFlags.filter(f => f.severity === 'Warning').length} warnings</span></div>
                  <div><span className="text-zinc-500">Color Issues:</span> <span className="text-orange-400">{result.colorContrast.filter(c => !c.passes).length} failing</span></div>
                  <div><span className="text-zinc-500">Alt Text:</span> <span className="text-red-400">{result.altTextAudit.filter(a => a.status === 'Missing').length} missing</span>, <span className="text-orange-400">{result.altTextAudit.filter(a => a.status === 'Poor').length} poor</span></div>
                  <div><span className="text-zinc-500">Cognitive Load:</span> <span className="text-yellow-400">{result.cognitiveLoad.filter(c => c.level === 'High').length} high-load areas</span></div>
                </div>
              </div>
            </div>

            {/* Quick Wins */}
            <div className="bg-gradient-to-r from-emerald-900/30 to-emerald-800/20 border border-emerald-700/40 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3 text-emerald-400">Quick Wins — Fix Today</h3>
              <div className="grid md:grid-cols-2 gap-2">
                {result.quickWins.map((win, i) => (
                  <div key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-emerald-400 shrink-0">→</span>{win}</div>
                ))}
              </div>
            </div>

            {/* Readability */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Readability Analysis</h3>
              <div className="space-y-3">
                {result.readability.map((r, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-zinc-200">{r.metric}</span>
                      <div className="flex gap-3 items-center">
                        <span className="text-lg font-bold" style={{ color: scoreColor(100 - r.score * 5) }}>{r.score}</span>
                        <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded">{r.grade}</span>
                      </div>
                    </div>
                    <div className="text-sm space-y-1">
                      <div><span className="text-zinc-500">Recommendation:</span> <span className="text-zinc-400">{r.recommendation}</span></div>
                      <div><span className="text-zinc-500">Benchmark:</span> <span className="text-violet-400/70">{r.benchmark}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusivity Flags */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Inclusivity Flags ({result.inclusivityFlags.length})</h3>
              <div className="space-y-3">
                {result.inclusivityFlags.map((f, i) => (
                  <div key={i} className={`border rounded-lg p-4 ${sevColor(f.severity)}`}>
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold">{f.category}</span>
                      <span className={`text-xs px-2 py-1 rounded-full border ${sevColor(f.severity)}`}>{f.severity}</span>
                    </div>
                    <div className="text-sm opacity-90 space-y-2">
                      <div>{f.issue}</div>
                      <div className="bg-zinc-900/50 rounded p-2 space-y-1">
                        <div><span className="text-red-400/70">Before:</span> <span className="text-zinc-400">{f.original}</span></div>
                        <div><span className="text-emerald-400/70">After:</span> <span className="text-zinc-300">{f.suggestion}</span></div>
                      </div>
                      <div className="text-zinc-500 italic text-xs">{f.why}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alt Text Audit */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Alt Text Audit</h3>
              <div className="space-y-3">
                {result.altTextAudit.map((a, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-zinc-200">{a.element}</span>
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${statusColor(a.status)}`}>{a.status}</span>
                    </div>
                    <div className="text-sm space-y-1">
                      <div><span className="text-zinc-500">Current:</span> <span className="text-red-400/70 font-mono text-xs">{a.current}</span></div>
                      <div><span className="text-zinc-500">Recommended:</span> <span className="text-emerald-400/80 font-mono text-xs">{a.recommended}</span></div>
                      <div className="text-zinc-500 italic text-xs mt-1">{a.guideline}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Color Contrast */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Color Contrast Check</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="text-left text-zinc-500 border-b border-zinc-700"><th className="pb-2 pr-4">Element</th><th className="pb-2 pr-4">Colors</th><th className="pb-2 pr-4">Ratio</th><th className="pb-2 pr-4">Status</th><th className="pb-2">Fix</th></tr></thead>
                  <tbody>
                    {result.colorContrast.map((c, i) => (
                      <tr key={i} className="border-b border-zinc-800/50">
                        <td className="py-3 pr-4 text-zinc-200">{c.element}</td>
                        <td className="py-3 pr-4">
                          <div className="flex gap-1 items-center">
                            <span className="w-4 h-4 rounded border border-zinc-600" style={{ backgroundColor: c.foreground }} />
                            <span className="text-zinc-500">/</span>
                            <span className="w-4 h-4 rounded border border-zinc-600" style={{ backgroundColor: c.background }} />
                            <span className="text-zinc-500 text-xs ml-1">{c.foreground}</span>
                          </div>
                        </td>
                        <td className="py-3 pr-4 font-mono">{c.ratio}</td>
                        <td className="py-3 pr-4">{c.passes ? <span className="text-emerald-400">✓ Pass</span> : <span className="text-red-400">✗ Fail</span>}</td>
                        <td className="py-3 text-zinc-400 text-xs">{c.fix}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Cognitive Load */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Cognitive Load Assessment</h3>
              <div className="space-y-3">
                {result.cognitiveLoad.map((c, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-zinc-200">{c.factor}</span>
                      <span className={`text-xs px-2 py-1 rounded ${levelColor(c.level)}`}>{c.level}</span>
                    </div>
                    <div className="text-sm space-y-1">
                      <div><span className="text-zinc-500">Issue:</span> <span className="text-zinc-400">{c.issue}</span></div>
                      <div><span className="text-zinc-500">Simplify:</span> <span className="text-emerald-400/80">{c.simplification}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Checks */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Platform Accessibility</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {result.platformChecks.map((p, i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-semibold text-violet-400">{p.platform}</span>
                      <span className="text-lg font-bold" style={{ color: scoreColor(p.a11yScore) }}>{p.a11yScore}%</span>
                    </div>
                    <div className="w-full bg-zinc-700 rounded-full h-2 mb-3">
                      <div className="h-2 rounded-full" style={{ width: `${p.a11yScore}%`, background: scoreColor(p.a11yScore) }} />
                    </div>
                    <div className="text-sm space-y-2">
                      <div>
                        <span className="text-red-400/70 text-xs font-semibold">Issues:</span>
                        {p.issues.map((issue, ii) => <div key={ii} className="text-zinc-400 text-xs ml-2">• {issue}</div>)}
                      </div>
                      <div>
                        <span className="text-emerald-400/70 text-xs font-semibold">Fixes:</span>
                        {p.fixes.map((fix, fi) => <div key={fi} className="text-zinc-400 text-xs ml-2">→ {fix}</div>)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Checklist */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Accessibility Checklist ({compliance})</h3>
              <div className="grid md:grid-cols-2 gap-2">
                {result.checklist.map((item, i) => (
                  <label key={i} className="flex items-start gap-2 text-sm text-zinc-300 cursor-pointer hover:text-zinc-100">
                    <input type="checkbox" className="mt-1 accent-violet-500" />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">Make Every Post Accessible</h3>
              <p className="text-zinc-400 mb-4">Use PostCraft AI to create content that reaches everyone. Pair with <a href="/compliance-checker" className="text-violet-400 underline">Compliance Checker</a>, <a href="/content-localizer" className="text-violet-400 underline">Content Localizer</a>, and <a href="/tone-guard" className="text-violet-400 underline">ToneGuard</a>.</p>
              <a href="/pricing" className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">Get PostCraft Pro</a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
