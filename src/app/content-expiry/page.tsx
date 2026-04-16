'use client';
import { useState } from 'react';

const contentTypes = ['Blog', 'Social', 'Video', 'Email', 'Landing Pages', 'All'] as const;
const industries = ['E-commerce', 'SaaS / Tech', 'Agency', 'Health & Wellness', 'Finance', 'Education', 'Media', 'Real Estate'] as const;
const updateFrequencies = ['Weekly', 'Monthly', 'Quarterly'] as const;

interface LifespanEntry { contentType: string; avgLifespan: string; decayRate: string; refreshCost: string; roiAfterRefresh: string; }
interface ExpiryCalendarItem { content: string; expiresIn: string; urgency: 'Expired' | 'Critical' | 'Soon' | 'Healthy'; lastUpdated: string; action: string; }
interface RefreshPriority { content: string; currentTraffic: string; potentialAfterRefresh: string; effort: string; priority: 'Critical' | 'High' | 'Medium' | 'Low'; reason: string; }
interface DecaySignal { signal: string; severity: string; detection: string; response: string; }
interface RefreshEstimate { taskType: string; timeEstimate: string; skillRequired: string; frequency: string; automatable: string; }
interface AutomationOpportunity { process: string; tool: string; trigger: string; timeSaved: string; complexity: string; }

interface ExpiryReport {
  evergreenRatio: number;
  avgLifespanMonths: number;
  contentAtRisk: number;
  lifespans: LifespanEntry[];
  calendar: ExpiryCalendarItem[];
  priorities: RefreshPriority[];
  decaySignals: DecaySignal[];
  refreshEstimates: RefreshEstimate[];
  automations: AutomationOpportunity[];
  quickWins: string[];
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }

function planExpiry(contentType: string, industry: string, frequency: string, brand: string): ExpiryReport {
  const seed = hash(`${contentType}-${industry}-${frequency}-${brand}`);
  const evergreenRatio = 20 + seed % 40;
  const avgLifespanMonths = 3 + seed % 18;
  const contentAtRisk = 5 + seed % 25;

  const lifespans: LifespanEntry[] = [
    { contentType: 'Blog Posts (How-To)', avgLifespan: '12-18 months', decayRate: '~5% traffic loss/month after peak', refreshCost: '1-2 hours per piece', roiAfterRefresh: '+35-60% traffic recovery within 30 days' },
    { contentType: 'Social Media Posts', avgLifespan: '24-72 hours', decayRate: '90% of engagement in first 6 hours', refreshCost: '15-30 min (repurpose as new post)', roiAfterRefresh: 'Repurposed posts get 60-80% of original engagement' },
    { contentType: 'Video Content', avgLifespan: '6-24 months (YouTube) / 48h (TikTok)', decayRate: 'YouTube: slow decay. Short-form: cliff after 48h', refreshCost: '2-4 hours (re-edit, new thumbnail)', roiAfterRefresh: 'Updated thumbnails alone boost CTR 15-25%' },
    { contentType: 'Email Campaigns', avgLifespan: 'Single-use (campaigns) / 6 months (sequences)', decayRate: 'Open rates drop 2-3% per month on automated sequences', refreshCost: '30-60 min per email in sequence', roiAfterRefresh: 'Refreshed sequences see 10-20% higher conversion' },
    { contentType: 'Landing Pages', avgLifespan: '3-6 months before performance dip', decayRate: 'Conversion rate drops ~1% per month as competitors update', refreshCost: '2-3 hours (copy + design refresh)', roiAfterRefresh: '+15-30% conversion rate improvement' },
    { contentType: 'Case Studies', avgLifespan: '18-24 months', decayRate: 'Slow — credibility decays as data ages', refreshCost: '3-5 hours (new data, updated results)', roiAfterRefresh: 'Updated case studies close 40% more deals' },
  ];

  const calendar: ExpiryCalendarItem[] = [
    { content: `"${industry} Trends for 2025" — Annual Roundup`, expiresIn: 'EXPIRED', urgency: 'Expired', lastUpdated: '11 months ago', action: 'IMMEDIATE: Update to 2026 or redirect to current version. Stale annual content actively hurts credibility.' },
    { content: `"Getting Started with ${brand}" — Onboarding Guide`, expiresIn: `${1 + seed % 3} weeks`, urgency: 'Critical', lastUpdated: '5 months ago', action: 'Screenshots and UI references are outdated. Update visuals and steps. High-traffic page — every day stale costs conversions.' },
    { content: `"Best ${industry} Tools" — Comparison Post`, expiresIn: `${2 + seed % 4} weeks`, urgency: 'Critical', lastUpdated: '4 months ago', action: 'Competitor landscape changed. 2 tools sunset, 3 new entrants. Update pricing, features, and recommendations.' },
    { content: `"${industry} Social Media Strategy" — Pillar Content`, expiresIn: `${1 + seed % 2} months`, urgency: 'Soon', lastUpdated: '3 months ago', action: 'Core strategy still valid but examples are dated. Refresh examples, add 2026 platform updates, update statistics.' },
    { content: `"How ${brand} Increased ROI by ${20 + seed % 40}%" — Case Study`, expiresIn: `${3 + seed % 4} months`, urgency: 'Healthy', lastUpdated: '2 months ago', action: 'Still performing well. Schedule review in 90 days. Consider adding updated numbers if available.' },
    { content: `"${industry} Email Templates Pack" — Lead Magnet`, expiresIn: `${2 + seed % 3} months`, urgency: 'Soon', lastUpdated: '4 months ago', action: 'Templates still work but design feels dated. Refresh visuals, add 2 new templates, update download page copy.' },
    { content: `"Why ${industry} Needs AI" — Thought Leadership`, expiresIn: `${1 + seed % 2} months`, urgency: 'Critical', lastUpdated: '6 months ago', action: 'AI landscape evolves weekly. Statistics and tool references are outdated. Major refresh needed — rewrite 40% of content.' },
  ];

  const priorities: RefreshPriority[] = [
    { content: 'Annual trend/roundup posts', currentTraffic: `${500 + seed % 2000}/mo (declining)`, potentialAfterRefresh: `${2000 + seed % 5000}/mo`, effort: '2-3 hours', priority: 'Critical', reason: 'Stale annual content ranks for high-volume keywords but actively damages brand trust' },
    { content: 'Product/tool comparison pages', currentTraffic: `${1000 + seed % 3000}/mo`, potentialAfterRefresh: `${3000 + seed % 6000}/mo`, effort: '3-4 hours', priority: 'Critical', reason: 'Outdated comparisons send users to wrong tools — high conversion intent wasted' },
    { content: 'Getting started / onboarding guides', currentTraffic: `${800 + seed % 2000}/mo`, potentialAfterRefresh: `${2000 + seed % 4000}/mo`, effort: '2-3 hours', priority: 'High', reason: 'First-touch content for new users — outdated steps create support tickets and churn' },
    { content: 'Statistics and data-driven posts', currentTraffic: `${600 + seed % 1500}/mo`, potentialAfterRefresh: `${1500 + seed % 3000}/mo`, effort: '1-2 hours', priority: 'High', reason: 'Citing 2024 stats in 2026 signals neglect — update numbers and sources' },
    { content: 'Evergreen how-to tutorials', currentTraffic: `${1200 + seed % 3000}/mo`, potentialAfterRefresh: `${1500 + seed % 3500}/mo`, effort: '1 hour', priority: 'Medium', reason: 'Core advice still valid — minor updates keep it ranking without major rewrite' },
    { content: 'Case studies and testimonials', currentTraffic: `${400 + seed % 1000}/mo`, potentialAfterRefresh: `${800 + seed % 2000}/mo`, effort: '3-5 hours', priority: 'Low', reason: 'Still credible but adding recent results would strengthen social proof' },
  ];

  const decaySignals: DecaySignal[] = [
    { signal: 'Organic traffic declining month-over-month', severity: 'High — content losing relevance in search', detection: 'Set up monthly traffic alerts in Google Analytics — flag any page dropping > 10% MoM', response: 'Audit content freshness. Check if competitors updated their version. Refresh or consolidate.' },
    { signal: 'Bounce rate increasing on key pages', severity: 'Medium — visitors arrive but content doesn\'t match expectations', detection: 'Monitor bounce rate by page weekly. Flag pages above 70% bounce rate.', response: 'Content likely outdated or misaligned with search intent. Update intro, add current examples.' },
    { signal: 'Comments/shares dropping to zero', severity: 'Medium — content no longer sparks engagement', detection: 'Track engagement per post over 90-day windows. Flag posts with zero engagement for 30+ days.', response: 'Content is "dead" socially. Either refresh with new angle or archive and redirect.' },
    { signal: 'Competitor content outranking yours for target keywords', severity: 'Critical — you\'re losing position to fresher content', detection: 'Weekly rank tracking for top 20 keywords. Alert if you drop 3+ positions.', response: 'Analyze competitor\'s updated content. Match or exceed their freshness, depth, and format.' },
    { signal: 'Internal team avoiding linking to the content', severity: 'Low but telling — your own team doesn\'t trust it', detection: 'Quarterly internal content survey: "Which content would you share with a prospect?"', response: 'If your sales team won\'t link to it, customers shouldn\'t see it either. Update or remove.' },
    { signal: 'Broken links, outdated screenshots, or deprecated tools mentioned', severity: 'High — visible decay that destroys credibility instantly', detection: 'Monthly automated link check + manual screenshot audit quarterly', response: 'Fix immediately — broken links and wrong screenshots are the fastest credibility killers.' },
  ];

  const refreshEstimates: RefreshEstimate[] = [
    { taskType: 'Statistics & Data Update', timeEstimate: '30-60 minutes', skillRequired: 'Research + basic editing', frequency: 'Every 3-6 months', automatable: 'Partially — alerts can flag stale stats, human updates the text' },
    { taskType: 'Screenshot & UI Refresh', timeEstimate: '1-2 hours', skillRequired: 'Design tool access + product knowledge', frequency: 'Every product update or 6 months', automatable: 'No — requires manual screenshots and annotation' },
    { taskType: 'Full Content Rewrite (40%+)', timeEstimate: '3-5 hours', skillRequired: 'Senior content writer + subject matter expert', frequency: 'Annually for evergreen, semi-annually for trend content', automatable: 'AI can draft, human must review and add original insights' },
    { taskType: 'SEO Meta & Schema Update', timeEstimate: '15-30 minutes', skillRequired: 'Basic SEO knowledge', frequency: 'Every 6 months or when intent shifts', automatable: 'Yes — bulk update tool can handle meta, human reviews for quality' },
    { taskType: 'Internal Link Restructuring', timeEstimate: '30-60 minutes', skillRequired: 'SEO + site architecture knowledge', frequency: 'Quarterly', automatable: 'Partially — tools flag broken links, human decides redirect targets' },
    { taskType: 'Competitive Refresh (match competitor updates)', timeEstimate: '2-4 hours', skillRequired: 'Content strategist + industry knowledge', frequency: 'When competitor outranks you', automatable: 'Alerts can detect rank drops, human creates the updated content' },
  ];

  const automations: AutomationOpportunity[] = [
    { process: 'Content age tracking', tool: 'Custom dashboard or CMS plugin', trigger: 'Content reaches age threshold (e.g., 6 months)', timeSaved: '2-3 hours/month on manual tracking', complexity: 'Low — date comparison against publish date' },
    { process: 'Traffic decay alerts', tool: 'Google Analytics + Slack/Email alerts', trigger: 'Page traffic drops > 15% month-over-month', timeSaved: '1-2 hours/week on manual monitoring', complexity: 'Low — standard GA alert configuration' },
    { process: 'Broken link detection', tool: 'Ahrefs, Screaming Frog, or custom crawler', trigger: 'Weekly automated crawl flags broken links', timeSaved: '3-4 hours/month on manual checking', complexity: 'Low — run crawler on schedule, review report' },
    { process: 'Competitor content monitoring', tool: 'Ahrefs Content Explorer or Visualping', trigger: 'Competitor updates a competing page', timeSaved: '5+ hours/month on manual competitive research', complexity: 'Medium — set up page-level monitoring for key competitors' },
    { process: 'Refresh task auto-creation', tool: 'Zapier/Make → Project management tool', trigger: 'When decay alert fires, auto-create refresh task with priority and template', timeSaved: '30 min per refresh cycle (task creation + assignment)', complexity: 'Medium — requires template setup and priority rules' },
    { process: 'Automated "last updated" badges', tool: 'CMS plugin or custom component', trigger: 'Display dynamic "Last updated: X" on every page — builds trust', timeSaved: 'Indirect — reduces user bounce from stale-looking content', complexity: 'Low — simple date display from CMS metadata' },
  ];

  const quickWins = [
    `${contentAtRisk}% of your content is at risk of expiry — start with the ${priorities.filter(p => p.priority === 'Critical').length} Critical items above`,
    'Add "Last Updated: [date]" to every piece of content — Google rewards freshness signals and users trust dated content more',
    'Set up a monthly "Content Health Check" calendar event — 1 hour to review top 20 pages for decay signals',
    'Create a content refresh SOP template — standardize the process so any team member can execute a refresh in under 2 hours',
    `Your evergreen ratio is ${evergreenRatio}% — aim for 60%+ to reduce the refresh burden. Convert time-sensitive content to evergreen formats where possible.`,
    'Run a "content expiry audit" on your top 50 pages today — sort by last modified date and flag anything older than 6 months',
  ];

  return { evergreenRatio, avgLifespanMonths, contentAtRisk, lifespans, calendar, priorities, decaySignals, refreshEstimates, automations, quickWins };
}

export default function ContentExpiryPage() {
  const [contentType, setContentType] = useState<string>(contentTypes[0]);
  const [industry, setIndustry] = useState<string>(industries[0]);
  const [frequency, setFrequency] = useState<string>(updateFrequencies[1]);
  const [brand, setBrand] = useState('');
  const [report, setReport] = useState<ExpiryReport | null>(null);

  const generate = () => { if (brand.trim()) setReport(planExpiry(contentType, industry, frequency, brand)); };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <span className="px-3 py-1 bg-teal-500/10 text-teal-400 rounded-full text-sm font-medium">Content Lifecycle</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">Content Expiry Planner</h1>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">Plan content shelf life and refresh cycles. Know when your content expires, what to refresh first, and how to automate the entire lifecycle.</p>
        </div>

        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Content Type</label>
              <select value={contentType} onChange={e => setContentType(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white">{contentTypes.map(c => <option key={c}>{c}</option>)}</select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Industry</label>
              <select value={industry} onChange={e => setIndustry(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white">{industries.map(i => <option key={i}>{i}</option>)}</select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Update Frequency</label>
              <select value={frequency} onChange={e => setFrequency(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white">{updateFrequencies.map(f => <option key={f}>{f}</option>)}</select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Brand Name</label>
              <input value={brand} onChange={e => setBrand(e.target.value)} placeholder="e.g., Acme Corp" className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white" />
            </div>
          </div>
          <button onClick={generate} className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg font-semibold hover:from-teal-600 hover:to-emerald-600 transition-all">Plan Content Expiry</button>
        </div>

        {report && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 text-center">
                <div className={`text-3xl font-bold ${report.evergreenRatio > 50 ? 'text-green-400' : report.evergreenRatio > 30 ? 'text-yellow-400' : 'text-red-400'}`}>{report.evergreenRatio}%</div>
                <div className="text-sm text-gray-400 mt-1">Evergreen Ratio</div>
              </div>
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-teal-400">{report.avgLifespanMonths} mo</div>
                <div className="text-sm text-gray-400 mt-1">Avg Content Lifespan</div>
              </div>
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 text-center">
                <div className={`text-3xl font-bold ${report.contentAtRisk > 20 ? 'text-red-400' : report.contentAtRisk > 10 ? 'text-yellow-400' : 'text-green-400'}`}>{report.contentAtRisk}%</div>
                <div className="text-sm text-gray-400 mt-1">Content at Risk</div>
              </div>
            </div>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-teal-300">Average Content Lifespan by Type</h2>
              <div className="overflow-x-auto"><table className="w-full text-sm">
                <thead><tr className="border-b border-gray-700">{['Content Type', 'Avg Lifespan', 'Decay Rate', 'Refresh Cost', 'ROI After Refresh'].map(h => <th key={h} className="text-left py-2 px-3 text-gray-400 font-medium">{h}</th>)}</tr></thead>
                <tbody>{report.lifespans.map((l, i) => <tr key={i} className="border-b border-gray-800"><td className="py-2 px-3 text-white font-medium">{l.contentType}</td><td className="py-2 px-3 text-teal-300">{l.avgLifespan}</td><td className="py-2 px-3 text-red-300">{l.decayRate}</td><td className="py-2 px-3 text-gray-300">{l.refreshCost}</td><td className="py-2 px-3 text-green-300">{l.roiAfterRefresh}</td></tr>)}</tbody>
              </table></div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-teal-300">Expiry Calendar</h2>
              <div className="space-y-3">{report.calendar.map((c, i) => (
                <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">{c.content}</h3>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${c.urgency === 'Expired' ? 'bg-red-500/20 text-red-400' : c.urgency === 'Critical' ? 'bg-orange-500/20 text-orange-400' : c.urgency === 'Soon' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>{c.urgency}</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    <div><span className="text-gray-500">Expires in:</span> <span className="text-orange-300">{c.expiresIn}</span></div>
                    <div><span className="text-gray-500">Last updated:</span> <span className="text-gray-300">{c.lastUpdated}</span></div>
                  </div>
                  <div className="mt-2 text-sm"><span className="text-gray-500">Action:</span> <span className="text-teal-300">{c.action}</span></div>
                </div>
              ))}</div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-teal-300">Refresh Priority Matrix</h2>
              <div className="space-y-3">{report.priorities.map((p, i) => (
                <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">{p.content}</h3>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${p.priority === 'Critical' ? 'bg-red-500/20 text-red-400' : p.priority === 'High' ? 'bg-orange-500/20 text-orange-400' : p.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-500/20 text-gray-400'}`}>{p.priority}</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    <div><span className="text-gray-500">Current traffic:</span> <span className="text-gray-300">{p.currentTraffic}</span></div>
                    <div><span className="text-gray-500">Potential after refresh:</span> <span className="text-green-300">{p.potentialAfterRefresh}</span></div>
                    <div><span className="text-gray-500">Effort:</span> <span className="text-blue-300">{p.effort}</span></div>
                    <div><span className="text-gray-500">Why:</span> <span className="text-yellow-300">{p.reason}</span></div>
                  </div>
                </div>
              ))}</div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-teal-300">Content Decay Signals</h2>
              <div className="space-y-3">{report.decaySignals.map((d, i) => (
                <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                  <h3 className="font-semibold text-white mb-2">{d.signal}</h3>
                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    <div><span className="text-gray-500">Severity:</span> <span className="text-red-300">{d.severity}</span></div>
                    <div><span className="text-gray-500">Detection:</span> <span className="text-blue-300">{d.detection}</span></div>
                    <div className="md:col-span-2"><span className="text-gray-500">Response:</span> <span className="text-green-300">{d.response}</span></div>
                  </div>
                </div>
              ))}</div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-teal-300">Refresh Effort Estimates</h2>
              <div className="overflow-x-auto"><table className="w-full text-sm">
                <thead><tr className="border-b border-gray-700">{['Task', 'Time', 'Skill Required', 'Frequency', 'Automatable?'].map(h => <th key={h} className="text-left py-2 px-3 text-gray-400 font-medium">{h}</th>)}</tr></thead>
                <tbody>{report.refreshEstimates.map((r, i) => <tr key={i} className="border-b border-gray-800"><td className="py-2 px-3 text-white">{r.taskType}</td><td className="py-2 px-3 text-teal-300">{r.timeEstimate}</td><td className="py-2 px-3 text-gray-300">{r.skillRequired}</td><td className="py-2 px-3 text-gray-400">{r.frequency}</td><td className="py-2 px-3 text-blue-300">{r.automatable}</td></tr>)}</tbody>
              </table></div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-teal-300">Automation Opportunities</h2>
              <div className="space-y-3">{report.automations.map((a, i) => (
                <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                  <h3 className="font-semibold text-white mb-2">{a.process}</h3>
                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    <div><span className="text-gray-500">Tool:</span> <span className="text-blue-300">{a.tool}</span></div>
                    <div><span className="text-gray-500">Trigger:</span> <span className="text-teal-300">{a.trigger}</span></div>
                    <div><span className="text-gray-500">Time saved:</span> <span className="text-green-300">{a.timeSaved}</span></div>
                    <div><span className="text-gray-500">Complexity:</span> <span className="text-gray-300">{a.complexity}</span></div>
                  </div>
                </div>
              ))}</div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-teal-300">Quick Wins</h2>
              <div className="space-y-2">{report.quickWins.map((w, i) => <div key={i} className="p-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-sm text-gray-300">{w}</div>)}</div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
