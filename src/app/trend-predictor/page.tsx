'use client';
import { useState } from 'react';

const platforms = ['Instagram', 'TikTok', 'Twitter/X', 'LinkedIn', 'YouTube', 'Facebook', 'Pinterest', 'All Platforms'] as const;
const niches = ['Tech/SaaS', 'Fashion', 'Fitness', 'Food', 'Finance', 'Travel', 'Education', 'Entertainment', 'Health', 'Real Estate'] as const;
const timeHorizons = ['Next 7 Days', 'Next 30 Days', 'Next Quarter', 'Next 6 Months'] as const;
const contentStyles = ['Trend-Riding', 'Thought Leadership', 'Evergreen', 'Reactive/Newsjacking', 'Community-Driven'] as const;

interface TrendForecast {
  trend: string;
  confidence: number;
  peakWindow: string;
  saturationDate: string;
  platform: string;
  contentAngle: string;
}

interface DecayCurve {
  contentFormat: string;
  peakHours: number;
  halfLife: string;
  extendStrategy: string;
  bestDay: string;
  avgLifespan: string;
}

interface TopicCorrelation {
  topicA: string;
  topicB: string;
  correlationScore: number;
  fusionAngle: string;
  exampleContent: string;
  viralPotential: number;
}

interface VelocityWindow {
  dayOfWeek: string;
  timeSlot: string;
  platformVelocity: number;
  competitorActivity: string;
  recommendation: string;
}

interface MicroEvent {
  event: string;
  relevanceScore: number;
  contentHook: string;
  urgency: string;
  platformFit: string;
}

interface PredictorResult {
  trendForecasts: TrendForecast[];
  decayCurves: DecayCurve[];
  topicCorrelations: TopicCorrelation[];
  velocityWindows: VelocityWindow[];
  microEvents: MicroEvent[];
}

function generatePredictions(
  platform: string,
  niche: string,
  timeHorizon: string,
  contentStyle: string,
  currentFocus: string
): PredictorResult {
  const focusLabel = currentFocus || niche;

  const trendForecastsData: Record<string, TrendForecast[]> = {
    'Tech/SaaS': [
      { trend: 'AI-native workflows replacing traditional SaaS dashboards', confidence: 92, peakWindow: 'May-July 2026', saturationDate: 'December 2026', platform: 'LinkedIn + Twitter/X', contentAngle: `"The Dashboard Is Dead: Why ${focusLabel} Is Moving to AI-First Interfaces"` },
      { trend: 'Vertical AI agents for specific business functions', confidence: 88, peakWindow: 'April-June 2026', saturationDate: 'September 2026', platform: 'Twitter/X + YouTube', contentAngle: '"Why Generic AI Assistants Are Losing to Specialized Agents — And What It Means for Your Stack"' },
      { trend: 'No-code automation backlash — return to code-first', confidence: 74, peakWindow: 'June-August 2026', saturationDate: 'Not yet saturated', platform: 'Twitter/X + Reddit', contentAngle: '"We Went All-In on No-Code. Here\'s Why We\'re Writing Code Again."' },
      { trend: 'Privacy-first analytics replacing cookie-based tracking', confidence: 85, peakWindow: 'May-September 2026', saturationDate: 'Q1 2027', platform: 'LinkedIn', contentAngle: '"Your Analytics Are About to Break: The Privacy Shift Every Marketer Must Prepare For"' },
      { trend: 'Community-led growth replacing paid acquisition', confidence: 80, peakWindow: 'Ongoing — accelerating', saturationDate: 'Not saturated', platform: 'All Platforms', contentAngle: `"How ${focusLabel} Communities Are Outperforming Paid Ads 3:1"` },
      { trend: 'Micro-SaaS acquisitions and portfolio building', confidence: 78, peakWindow: 'Q2-Q3 2026', saturationDate: 'Q4 2026', platform: 'Twitter/X + LinkedIn', contentAngle: '"The New SaaS Playbook: Buy Small, Grow Fast, Stack Value"' },
    ],
    'Fitness': [
      { trend: 'Wearable-integrated content (real-time health data sharing)', confidence: 90, peakWindow: 'May-August 2026', saturationDate: 'Q1 2027', platform: 'TikTok + Instagram', contentAngle: '"My Apple Watch Says I Burned 800 Calories — Let Me Show You How"' },
      { trend: 'Zone 2 training going mainstream (beyond fitness enthusiasts)', confidence: 86, peakWindow: 'April-June 2026', saturationDate: 'October 2026', platform: 'YouTube + TikTok', contentAngle: `"Why ${focusLabel} Experts Are Obsessed with Zone 2 — The Science in 60 Seconds"` },
      { trend: 'Anti-hustle fitness (recovery, sleep, gentle movement)', confidence: 82, peakWindow: 'Ongoing — growing', saturationDate: 'Not saturated', platform: 'Instagram + Pinterest', contentAngle: '"The Fitness Industry Lied to You: Why Rest Is the Most Productive Thing You Can Do"' },
      { trend: 'Hybrid home-gym content (no equipment + equipment)', confidence: 76, peakWindow: 'May-July 2026', saturationDate: 'August 2026', platform: 'YouTube + TikTok', contentAngle: '"Same Workout, Two Ways: With Gym vs. At Home — Results Compared"' },
      { trend: 'Nutrition transparency (exact macros, brand comparisons)', confidence: 84, peakWindow: 'April-September 2026', saturationDate: 'Q1 2027', platform: 'TikTok + Instagram', contentAngle: '"I Scanned 100 Protein Bars — Only 7 Are Worth Buying"' },
      { trend: 'Longevity-focused fitness for millennials', confidence: 80, peakWindow: 'Q2-Q4 2026', saturationDate: 'Not saturated', platform: 'LinkedIn + YouTube', contentAngle: '"Training for 80, Not 30: The Longevity Workout Revolution"' },
    ],
  };

  const defaultForecasts: TrendForecast[] = [
    { trend: 'AI-enhanced content creation becoming standard practice', confidence: 91, peakWindow: 'Ongoing — accelerating Q2 2026', saturationDate: 'Q4 2026', platform: 'All Platforms', contentAngle: `"How ${focusLabel} Creators Are Using AI to 10x Output Without Losing Authenticity"` },
    { trend: 'Short-form educational content replacing long-form blog posts', confidence: 87, peakWindow: 'April-August 2026', saturationDate: 'Q1 2027', platform: 'TikTok + YouTube Shorts', contentAngle: '"The 60-Second Masterclass: Teaching Complex Topics in Under a Minute"' },
    { trend: 'Personal brand as primary distribution channel', confidence: 84, peakWindow: 'Ongoing — long-term trend', saturationDate: 'Not saturated', platform: 'LinkedIn + Twitter/X', contentAngle: '"Your Personal Brand Is Worth More Than Your Company Page — Here\'s the Data"' },
    { trend: 'Interactive and participatory content over passive consumption', confidence: 80, peakWindow: 'May-September 2026', saturationDate: 'Not saturated', platform: 'Instagram + TikTok', contentAngle: `"Stop Broadcasting, Start Conversing: The ${focusLabel} Creator Shift"` },
    { trend: 'Niche communities outperforming mass audiences', confidence: 82, peakWindow: 'Q2-Q3 2026', saturationDate: 'Not saturated', platform: 'All Platforms', contentAngle: '"1,000 True Fans Was Right All Along — Here\'s How to Find Yours"' },
    { trend: 'Authenticity backlash against over-produced content', confidence: 78, peakWindow: 'April-July 2026', saturationDate: 'September 2026', platform: 'Instagram + TikTok', contentAngle: '"The Polish Penalty: Why Your Best Content Looks Terrible (And That\'s the Point)"' },
  ];

  const decayCurvesData: DecayCurve[] = [
    { contentFormat: 'TikTok Video', peakHours: 4, halfLife: '24-48 hours', extendStrategy: 'Reply to comments with video responses — each reply gets its own FYP push', bestDay: 'Wednesday or Thursday', avgLifespan: '3-7 days' },
    { contentFormat: 'Instagram Reel', peakHours: 6, halfLife: '48-72 hours', extendStrategy: 'Share to Stories at 24h and 48h marks. Cross-post to Explore-optimized hashtags.', bestDay: 'Tuesday or Friday', avgLifespan: '5-14 days' },
    { contentFormat: 'Instagram Carousel', peakHours: 12, halfLife: '3-5 days', extendStrategy: 'Reshare individual slides as Stories. Pin to profile. Reference in future Reels.', bestDay: 'Monday or Wednesday', avgLifespan: '14-30 days' },
    { contentFormat: 'Twitter/X Thread', peakHours: 2, halfLife: '6-12 hours', extendStrategy: 'Self-retweet the hook tweet at 8h mark. Quote tweet with a new angle at 24h.', bestDay: 'Tuesday morning', avgLifespan: '1-3 days' },
    { contentFormat: 'LinkedIn Post', peakHours: 8, halfLife: '2-4 days', extendStrategy: 'Comment on your own post at 4h and 24h to re-trigger algorithmic push.', bestDay: 'Tuesday-Thursday', avgLifespan: '7-14 days' },
    { contentFormat: 'YouTube Video', peakHours: 48, halfLife: '14-30 days', extendStrategy: 'Add end screens linking to it from newer videos. Update title/thumbnail at 30 days.', bestDay: 'Friday or Saturday', avgLifespan: '90+ days (evergreen potential)' },
    { contentFormat: 'Blog Post (SEO)', peakHours: 168, halfLife: '30-90 days', extendStrategy: 'Update with fresh data quarterly. Add internal links from newer posts.', bestDay: 'Any day (search-driven)', avgLifespan: '6-24 months' },
    { contentFormat: 'Pinterest Pin', peakHours: 72, halfLife: '30-90 days', extendStrategy: 'Create 5-10 Pin variations with different titles. Re-pin to relevant boards monthly.', bestDay: 'Saturday or Sunday', avgLifespan: '3-12 months' },
  ];

  const topicCorrelationsData: TopicCorrelation[] = [
    { topicA: 'AI Tools', topicB: 'Productivity Hacks', correlationScore: 94, fusionAngle: `"The ${focusLabel} AI Toolkit: 5 Tools That Save Me 10 Hours Per Week"`, exampleContent: 'List post showing your actual AI workflow with time savings for each tool', viralPotential: 88 },
    { topicA: 'Mental Health', topicB: 'Entrepreneurship', correlationScore: 89, fusionAngle: '"The Entrepreneur Burnout Nobody Talks About — And 3 Things That Actually Help"', exampleContent: 'Vulnerable story post about personal burnout experience with actionable recovery tips', viralPotential: 92 },
    { topicA: 'Sustainability', topicB: 'Budget Living', correlationScore: 82, fusionAngle: '"Going Green Saved Me $3,000 This Year — Here\'s Every Change I Made"', exampleContent: 'Data-driven carousel showing eco-friendly swaps with actual cost savings', viralPotential: 85 },
    { topicA: 'Remote Work', topicB: 'Travel', correlationScore: 86, fusionAngle: '"I Work From 12 Countries a Year. Here\'s My Exact Setup and Budget."', exampleContent: 'Behind-the-scenes video tour of portable work setup with cost breakdown', viralPotential: 90 },
    { topicA: 'Parenting', topicB: 'Career Growth', correlationScore: 80, fusionAngle: '"How I Got Promoted While Working 30 Hours/Week as a Parent"', exampleContent: 'Thread or carousel about unconventional career strategies for working parents', viralPotential: 86 },
    { topicA: 'Data Privacy', topicB: 'Social Media Tips', correlationScore: 78, fusionAngle: '"Your Social Media Settings Are Leaking Data — Fix These 7 Things Now"', exampleContent: 'Actionable checklist post/video showing exact privacy settings to change per platform', viralPotential: 83 },
  ];

  const velocityWindowsData: VelocityWindow[] = [
    { dayOfWeek: 'Monday', timeSlot: '7:00-8:30 AM', platformVelocity: 72, competitorActivity: 'Low — most schedule for Tuesday', recommendation: 'Good for LinkedIn thought leadership — less competition, high professional attention' },
    { dayOfWeek: 'Tuesday', timeSlot: '8:00-10:00 AM', platformVelocity: 91, competitorActivity: 'High — peak posting day', recommendation: 'Only post if your content is strong enough to compete. Otherwise wait for Wednesday.' },
    { dayOfWeek: 'Wednesday', timeSlot: '11:00 AM-1:00 PM', platformVelocity: 85, competitorActivity: 'Medium — lunch break scrolling', recommendation: 'Ideal for Instagram and TikTok — users browse during midday break' },
    { dayOfWeek: 'Thursday', timeSlot: '7:30-9:00 AM', platformVelocity: 88, competitorActivity: 'Medium-High', recommendation: 'Best for LinkedIn documents/carousels — professional engagement peaks Thursday AM' },
    { dayOfWeek: 'Friday', timeSlot: '12:00-2:00 PM', platformVelocity: 78, competitorActivity: 'Low — many pause for weekend', recommendation: 'Great for YouTube uploads — weekend viewing starts Friday afternoon' },
    { dayOfWeek: 'Saturday', timeSlot: '9:00-11:00 AM', platformVelocity: 68, competitorActivity: 'Very Low', recommendation: 'Low competition window — good for Pinterest and casual Instagram content' },
    { dayOfWeek: 'Sunday', timeSlot: '7:00-9:00 PM', platformVelocity: 80, competitorActivity: 'Low', recommendation: 'Sunday evening planning mode — great for "start your week" content and motivation posts' },
  ];

  const microEventsData: MicroEvent[] = [
    { event: 'Major tech product launch week', relevanceScore: 92, contentHook: `"What [Product Launch] Means for ${focusLabel} Creators — 3 Things to Do Right Now"`, urgency: 'Same day', platformFit: 'Twitter/X + LinkedIn' },
    { event: 'Seasonal shift (spring/summer transition)', relevanceScore: 78, contentHook: '"Your Content Calendar Needs a Seasonal Reset — Here\'s the Spring Template"', urgency: 'Within 1 week', platformFit: 'Instagram + Pinterest' },
    { event: 'Platform algorithm update announcement', relevanceScore: 95, contentHook: '"[Platform] Just Changed Everything: What the New Algorithm Means and How to Adapt"', urgency: 'Within 24 hours', platformFit: 'Same platform + Twitter/X' },
    { event: 'Industry conference or event', relevanceScore: 85, contentHook: '"5 Takeaways from [Event] That You Can Apply Today — Even If You Were Not There"', urgency: 'During or next day', platformFit: 'LinkedIn + Twitter/X' },
    { event: 'Viral moment in adjacent niche', relevanceScore: 82, contentHook: `"What the Viral [Topic] Teaches ${focusLabel} Creators About Attention"`, urgency: 'Within 48 hours', platformFit: 'TikTok + Twitter/X' },
    { event: 'Cultural moment or holiday', relevanceScore: 75, contentHook: '"The [Holiday/Moment] Content Playbook: 7 Ideas That Are Not Cringey"', urgency: 'Plan 1-2 weeks ahead', platformFit: 'All Platforms' },
    { event: 'Competitor controversy or failure', relevanceScore: 88, contentHook: '"What [Competitor Event] Reveals About the Industry — And What to Do Differently"', urgency: 'Within 24-48 hours', platformFit: 'LinkedIn + YouTube' },
  ];

  return {
    trendForecasts: trendForecastsData[niche] || defaultForecasts,
    decayCurves: decayCurvesData,
    topicCorrelations: topicCorrelationsData,
    velocityWindows: velocityWindowsData,
    microEvents: microEventsData,
  };
}

export default function TrendPredictorPage() {
  const [platform, setPlatform] = useState<string>(platforms[0]);
  const [niche, setNiche] = useState<string>(niches[0]);
  const [timeHorizon, setTimeHorizon] = useState<string>(timeHorizons[0]);
  const [contentStyle, setContentStyle] = useState<string>(contentStyles[0]);
  const [currentFocus, setCurrentFocus] = useState('');
  const [result, setResult] = useState<PredictorResult | null>(null);

  const confidenceColor = (v: number) => {
    if (v >= 85) return 'bg-green-500';
    if (v >= 70) return 'bg-cyan-500';
    if (v >= 50) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  const urgencyBadge = (u: string) => {
    if (u.includes('24') || u.includes('Same')) return 'bg-red-100 text-red-700';
    if (u.includes('48') || u.includes('week')) return 'bg-orange-100 text-orange-700';
    return 'bg-yellow-100 text-yellow-700';
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Trend Predictor</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Predict emerging trends before they peak, map content decay curves, discover topic correlations, and find optimal velocity windows to post when competition is lowest.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Platform</label>
              <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent">
                {platforms.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Niche</label>
              <select value={niche} onChange={e => setNiche(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent">
                {niches.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Time Horizon</label>
              <select value={timeHorizon} onChange={e => setTimeHorizon(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent">
                {timeHorizons.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Content Style</label>
              <select value={contentStyle} onChange={e => setContentStyle(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent">
                {contentStyles.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Current Focus Area</label>
              <input type="text" value={currentFocus} onChange={e => setCurrentFocus(e.target.value)} placeholder="e.g. content marketing, strength training, budget cooking" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent" />
            </div>
          </div>
          <button onClick={() => setResult(generatePredictions(platform, niche, timeHorizon, contentStyle, currentFocus))} className="w-full py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold rounded-xl hover:from-violet-700 hover:to-fuchsia-700 transition-all shadow-lg hover:shadow-xl">
            Predict Trends
          </button>
        </div>

        {result && (
          <div className="space-y-6">
            {/* 1. Trend Forecasts */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Trend Forecasts</h2>
              <div className="space-y-4">
                {result.trendForecasts.map((f, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-5">
                    <div className="flex flex-wrap items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{f.trend}</h3>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2"><div className={`h-2 rounded-full ${confidenceColor(f.confidence)}`} style={{ width: `${f.confidence}%` }} /></div>
                        <span className="text-sm font-bold text-gray-600">{f.confidence}%</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                      <div className="bg-violet-50 rounded-lg p-3"><p className="text-xs font-semibold text-violet-600 mb-1">PEAK WINDOW</p><p className="text-sm text-violet-800">{f.peakWindow}</p></div>
                      <div className="bg-fuchsia-50 rounded-lg p-3"><p className="text-xs font-semibold text-fuchsia-600 mb-1">SATURATION</p><p className="text-sm text-fuchsia-800">{f.saturationDate}</p></div>
                      <div className="bg-indigo-50 rounded-lg p-3"><p className="text-xs font-semibold text-indigo-600 mb-1">BEST PLATFORM</p><p className="text-sm text-indigo-800">{f.platform}</p></div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3"><p className="text-xs font-semibold text-gray-500 mb-1">CONTENT ANGLE</p><p className="text-sm text-gray-800 italic">{f.contentAngle}</p></div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Decay Curves */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Content Decay Curves</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.decayCurves.map((d, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-5">
                    <h3 className="font-bold text-gray-900 mb-3">{d.contentFormat}</h3>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="bg-violet-50 rounded-lg p-2 text-center"><p className="text-xs text-violet-600 font-semibold">PEAK</p><p className="text-sm font-bold text-violet-800">{d.peakHours}h</p></div>
                      <div className="bg-fuchsia-50 rounded-lg p-2 text-center"><p className="text-xs text-fuchsia-600 font-semibold">HALF-LIFE</p><p className="text-sm font-bold text-fuchsia-800">{d.halfLife}</p></div>
                      <div className="bg-indigo-50 rounded-lg p-2 text-center"><p className="text-xs text-indigo-600 font-semibold">LIFESPAN</p><p className="text-sm font-bold text-indigo-800">{d.avgLifespan}</p></div>
                    </div>
                    <p className="text-xs text-gray-500 mb-1">Best day: <strong>{d.bestDay}</strong></p>
                    <p className="text-sm text-gray-600">{d.extendStrategy}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Topic Correlations */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Topic Correlations</h2>
              <div className="space-y-4">
                {result.topicCorrelations.map((c, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-5">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-lg text-sm font-bold">{c.topicA}</span>
                      <span className="text-gray-400 font-bold">+</span>
                      <span className="bg-fuchsia-100 text-fuchsia-700 px-3 py-1 rounded-lg text-sm font-bold">{c.topicB}</span>
                      <div className="ml-auto flex items-center gap-2">
                        <span className="text-xs text-gray-500">Correlation</span>
                        <div className="w-16 bg-gray-200 rounded-full h-2"><div className="h-2 rounded-full bg-violet-500" style={{ width: `${c.correlationScore}%` }} /></div>
                        <span className="text-sm font-bold text-gray-600">{c.correlationScore}%</span>
                      </div>
                    </div>
                    <p className="font-medium text-gray-900 italic mb-2">{c.fusionAngle}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">{c.exampleContent}</p>
                      <div className="flex items-center gap-2 ml-4">
                        <span className="text-xs text-gray-500">Viral</span>
                        <span className="text-sm font-bold text-fuchsia-600">{c.viralPotential}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Velocity Windows */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Optimal Velocity Windows</h2>
              <div className="space-y-3">
                {result.velocityWindows.map((w, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-5">
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="md:w-28"><h3 className="font-bold text-gray-900">{w.dayOfWeek}</h3><span className="text-sm text-violet-600 font-semibold">{w.timeSlot}</span></div>
                      <div className="flex items-center gap-3 md:w-40">
                        <div className="w-full bg-gray-200 rounded-full h-3"><div className="h-3 rounded-full bg-violet-500" style={{ width: `${w.platformVelocity}%` }} /></div>
                        <span className="text-sm font-bold text-gray-600">{w.platformVelocity}%</span>
                      </div>
                      <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg text-xs font-bold">Competition: {w.competitorActivity}</span>
                      <p className="flex-1 text-sm text-gray-600">{w.recommendation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Micro Events */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Micro-Event Opportunities</h2>
              <div className="space-y-4">
                {result.microEvents.map((m, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-5">
                    <div className="flex flex-wrap items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{m.event}</h3>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${urgencyBadge(m.urgency)}`}>{m.urgency}</span>
                        <span className="bg-violet-100 text-violet-700 px-2.5 py-1 rounded-lg text-xs font-bold">{m.platformFit}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs text-gray-500">Relevance</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2"><div className="h-2 rounded-full bg-fuchsia-500" style={{ width: `${m.relevanceScore}%` }} /></div>
                      <span className="text-sm font-bold text-gray-600">{m.relevanceScore}%</span>
                    </div>
                    <div className="bg-violet-50 rounded-lg p-3"><p className="text-xs font-semibold text-violet-600 mb-1">CONTENT HOOK</p><p className="text-sm text-violet-800 italic">{m.contentHook}</p></div>
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
