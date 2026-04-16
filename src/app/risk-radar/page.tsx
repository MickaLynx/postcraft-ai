'use client';
import { useState } from 'react';

const industries = ['E-commerce', 'SaaS / Tech', 'Agency', 'Health & Wellness', 'Finance', 'Education', 'Media', 'Real Estate'] as const;
const audienceSizes = ['< 1K', '1K - 10K', '10K - 100K', '100K - 1M', '1M+'] as const;
const sensitivityLevels = ['Low', 'Medium', 'High', 'Regulated'] as const;

interface RiskCategory { category: string; score: number; trend: string; topThreat: string; mitigation: string; }
interface ScenarioSimulation { scenario: string; probability: string; impact: string; responseTime: string; estimatedDamage: string; playbookAction: string; }
interface ResponseBenchmark { crisisType: string; idealResponse: string; industryAvg: string; bestInClass: string; yourTarget: string; }
interface MitigationPlay { risk: string; preventionAction: string; owner: string; frequency: string; cost: string; effectiveness: string; }
interface WarningIndicator { indicator: string; source: string; threshold: string; action: string; urgency: 'Critical' | 'High' | 'Medium' | 'Low'; }
interface CrisisTemplate { crisisType: string; firstResponse: string; escalationPath: string; publicStatement: string; recoveryTimeline: string; }

interface RiskReport {
  overallRiskScore: number;
  highestRisk: string;
  readinessLevel: string;
  categories: RiskCategory[];
  scenarios: ScenarioSimulation[];
  benchmarks: ResponseBenchmark[];
  playbook: MitigationPlay[];
  warnings: WarningIndicator[];
  templates: CrisisTemplate[];
  immediateActions: string[];
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }

function assessRisk(industry: string, audienceSize: string, sensitivity: string, brand: string): RiskReport {
  const seed = hash(`${industry}-${audienceSize}-${sensitivity}-${brand}`);
  const sensIdx = sensitivityLevels.indexOf(sensitivity as typeof sensitivityLevels[number]);
  const baseRisk = 20 + sensIdx * 15;
  const overallRiskScore = baseRisk + seed % 25;
  const readinessLevels = ['Unprepared', 'Basic', 'Moderate', 'Strong', 'Excellent'];
  const readinessLevel = readinessLevels[Math.min(4, Math.max(0, 3 - sensIdx + (seed % 2)))];
  const highRisks = ['Reputation damage from viral negative content', 'Regulatory non-compliance in content', 'Cultural misstep in global campaign', 'Data privacy violation in social content', 'Influencer partnership controversy'];
  const highestRisk = highRisks[seed % highRisks.length];

  const categories: RiskCategory[] = [
    { category: 'Reputation Risk', score: 30 + seed % 50, trend: seed % 3 === 0 ? 'Rising — negative mentions up 12% this quarter' : 'Stable — sentiment holding steady', topThreat: `Viral negative post from dissatisfied customer — ${industry} audiences share complaints 3x more than praise`, mitigation: 'Social listening alerts + pre-approved response templates + 1-hour response SLA for negative mentions' },
    { category: 'Legal & Compliance Risk', score: sensIdx >= 2 ? 50 + seed % 30 : 15 + seed % 25, trend: sensIdx >= 2 ? 'Increasing — new regulations taking effect Q2 2026' : 'Low — minimal regulatory exposure', topThreat: `FTC disclosure violations in influencer content — fines up to $50K per violation for ${industry}`, mitigation: 'Mandatory compliance review for all sponsored content. Disclosure checklist before every publish.' },
    { category: 'Crisis & PR Risk', score: 25 + seed % 40, trend: 'Unpredictable — one incident can escalate in hours', topThreat: 'Employee social media mishap goes viral — personal account linked to brand causes backlash', mitigation: 'Social media policy for all employees. Crisis playbook with pre-approved holding statements.' },
    { category: 'Cultural Sensitivity Risk', score: 20 + seed % 35, trend: 'Rising — audiences increasingly sensitive to tone-deaf content', topThreat: `Campaign using cultural reference without proper context — ${industry} brands face 40% more scrutiny on inclusivity`, mitigation: 'Diverse review panel for campaigns. Cultural sensitivity checklist. Regional market review for global content.' },
    { category: 'Platform Policy Risk', score: 15 + seed % 30, trend: 'Volatile — platforms change rules without notice', topThreat: 'Account suspension due to automated policy enforcement — appeals take 2-4 weeks during which you lose all reach', mitigation: 'Multi-platform presence (never 100% on one platform). Content backup system. Platform policy monitoring.' },
  ];

  const scenarios: ScenarioSimulation[] = [
    { scenario: 'Viral negative review gains 100K+ impressions', probability: `${20 + seed % 25}%`, impact: 'High — brand sentiment drops 15-20 points. Sales inquiries decrease 10-15% for 2 weeks.', responseTime: 'Must respond within 1 hour', estimatedDamage: `$${5 + seed % 20}K-$${20 + seed % 50}K in lost revenue + recovery costs`, playbookAction: 'Acknowledge publicly within 60 min. Take conversation to DM. Offer resolution. Follow up publicly with outcome.' },
    { scenario: 'Influencer partnership turns controversial', probability: `${10 + seed % 15}%`, impact: 'Severe — guilt by association. Audience demands brand takes a stand.', responseTime: 'Must respond within 4 hours', estimatedDamage: `$${10 + seed % 30}K-$${50 + seed % 100}K including contract termination + audience recovery`, playbookAction: 'Pause all co-branded content immediately. Issue values-aligned statement. Evaluate contract exit. Never delete — screenshot culture makes deletion worse.' },
    { scenario: 'Employee posts offensive content linked to brand', probability: `${15 + seed % 20}%`, impact: 'Medium-High — audience questions brand culture and values.', responseTime: 'Must respond within 2 hours', estimatedDamage: `$${3 + seed % 10}K in HR + PR costs. Harder to quantify trust damage.`, playbookAction: 'Remove post if on brand account. If personal account, issue statement separating brand from individual views. Internal review + action.' },
    { scenario: `Regulatory body flags ${industry} content as non-compliant`, probability: sensIdx >= 2 ? `${25 + seed % 20}%` : `${5 + seed % 10}%`, impact: 'Critical for regulated industries — potential fines, mandatory content removal, public warning.', responseTime: 'Must respond within 24 hours', estimatedDamage: `$${20 + seed % 80}K+ in fines, legal fees, and content remediation`, playbookAction: 'Legal team lead response. Remove flagged content immediately. Audit all live content for similar issues. Public compliance commitment.' },
    { scenario: 'Platform algorithm change tanks organic reach overnight', probability: `${30 + seed % 20}%`, impact: 'Medium — not a crisis but a strategic shock. Organic reach drops 40-60%.', responseTime: 'Strategic response within 48 hours', estimatedDamage: `$${5 + seed % 15}K/month in lost organic value until adaptation`, playbookAction: 'Activate paid budget reserve. Shift to platform-favored format. Diversify to less-affected platforms. Communicate transparently with audience.' },
    { scenario: 'Data breach exposes customer information from social campaign', probability: `${5 + seed % 10}%`, impact: 'Catastrophic — legal liability, regulatory fines, permanent trust damage.', responseTime: 'Must notify affected users within 72 hours (GDPR)', estimatedDamage: `$${100 + seed % 400}K+ including fines, legal, remediation, and customer churn`, playbookAction: 'Activate breach response plan. Notify legal immediately. Contain the breach. Notify affected users. Public transparency statement. Offer protection services.' },
  ];

  const benchmarks: ResponseBenchmark[] = [
    { crisisType: 'Negative viral post', idealResponse: '< 30 minutes', industryAvg: '2-4 hours', bestInClass: '15 minutes (pre-approved templates)', yourTarget: '< 1 hour' },
    { crisisType: 'Influencer controversy', idealResponse: '< 2 hours', industryAvg: '6-12 hours', bestInClass: '1 hour (crisis team on standby)', yourTarget: '< 4 hours' },
    { crisisType: 'Compliance violation', idealResponse: '< 4 hours (content removal)', industryAvg: '24-48 hours', bestInClass: '2 hours (automated compliance scanning)', yourTarget: '< 8 hours' },
    { crisisType: 'Data breach notification', idealResponse: '< 24 hours', industryAvg: '48-72 hours', bestInClass: '12 hours (pre-staged notification system)', yourTarget: '< 48 hours' },
    { crisisType: 'Cultural insensitivity backlash', idealResponse: '< 1 hour (acknowledgment)', industryAvg: '4-8 hours', bestInClass: '30 minutes (diverse review prevents most incidents)', yourTarget: '< 2 hours' },
  ];

  const playbook: MitigationPlay[] = [
    { risk: 'Negative brand mentions', preventionAction: 'Real-time social listening with sentiment alerts. Pre-approved response templates for common complaints.', owner: 'Community Manager', frequency: 'Continuous monitoring', cost: '$50-200/mo (tool cost)', effectiveness: 'Catches 80% of issues before they escalate' },
    { risk: 'Compliance violations', preventionAction: 'Pre-publish compliance checklist. Automated FTC disclosure scanning. Legal review for regulated claims.', owner: 'Legal + Content Lead', frequency: 'Every piece of sponsored/regulated content', cost: '30 min per piece review time', effectiveness: 'Reduces violation risk by 95%' },
    { risk: 'Cultural missteps', preventionAction: 'Diverse review panel for campaigns. Cultural sensitivity training quarterly. Regional market sign-off for global content.', owner: 'Content Director', frequency: 'Every campaign + quarterly training', cost: '2-3 hours per campaign review', effectiveness: 'Prevents 70% of cultural incidents' },
    { risk: 'Employee social media incidents', preventionAction: 'Clear social media policy. Annual training. Separation between personal and brand accounts.', owner: 'HR + Marketing', frequency: 'Annual policy review + onboarding', cost: 'Minimal — policy + 1 hour training', effectiveness: 'Reduces incidents by 60% but cannot prevent all' },
    { risk: 'Platform dependency', preventionAction: 'Maintain presence on 3+ platforms. Email list as owned channel. Content backup system. Never put 100% on one platform.', owner: 'Content Strategist', frequency: 'Quarterly platform health review', cost: 'Time investment in multi-platform management', effectiveness: 'Ensures survival of any single platform disruption' },
    { risk: 'Data privacy in campaigns', preventionAction: 'GDPR/CCPA compliance audit for all data collection. Privacy impact assessment for new campaigns. Consent management.', owner: 'Legal + Tech', frequency: 'Before every data-collecting campaign', cost: '$200-500 per audit + tool costs', effectiveness: 'Essential — non-negotiable for regulated audiences' },
  ];

  const warnings: WarningIndicator[] = [
    { indicator: 'Negative sentiment spike (> 20% increase in 24h)', source: 'Social listening tool (Brandwatch, Sprout Social)', threshold: '20% increase from baseline', action: 'Investigate source immediately. Prepare response if trending.', urgency: 'Critical' },
    { indicator: 'Competitor crisis in your industry', source: 'Google Alerts + industry monitoring', threshold: 'Any major competitor facing public backlash', action: 'Review your own content for similar vulnerabilities. Prepare proactive statement if needed.', urgency: 'High' },
    { indicator: 'Regulatory announcement affecting your industry', source: 'Government/regulator RSS feeds + legal team alerts', threshold: 'Any new rule affecting content marketing', action: 'Audit all live content for compliance. Update processes. Brief content team.', urgency: 'High' },
    { indicator: 'Unusual engagement patterns (bot activity, coordinated attacks)', source: 'Platform analytics + social listening', threshold: 'Engagement from accounts with < 30 days age or suspicious patterns', action: 'Document evidence. Report to platform. Do not engage with bots. Consider temporary comment moderation.', urgency: 'Medium' },
    { indicator: 'Brand mention by controversial figure', source: 'Social listening + Google Alerts', threshold: 'Any mention by politically divisive or controversial public figure', action: 'Monitor but do not engage unless brand values are misrepresented. Prepare neutral statement.', urgency: 'Medium' },
    { indicator: 'Platform policy update announcement', source: 'Platform official blogs + creator newsletters', threshold: 'Any policy change affecting content format, reach, or monetization', action: 'Analyze impact on current strategy. Adapt content plan within 48 hours. Brief team.', urgency: 'Low' },
  ];

  const templates: CrisisTemplate[] = [
    { crisisType: 'Customer Complaint Gone Viral', firstResponse: `"We hear you and we take this seriously. We\'re looking into this right now and will follow up within [X hours] with a resolution. DM us so we can make this right."`, escalationPath: 'Community Manager (0-30 min) → Content Director (30-60 min) → VP Marketing (if 10K+ impressions)', publicStatement: `"At ${brand}, [value statement]. We fell short here. Here\'s what happened and what we\'re doing about it: [specific action]. We appreciate you holding us accountable."`, recoveryTimeline: '24-48 hours for initial resolution. 1-2 weeks for sentiment recovery. 30 days for full trust rebuild.' },
    { crisisType: 'Offensive Content Published', firstResponse: '"We\'ve removed the post. This does not reflect our values. We\'re investigating how this happened and will share what we learn."', escalationPath: 'Immediate removal (any team member) → Content Director (within 15 min) → CEO (within 1 hour)', publicStatement: `"We made a mistake. [Specific acknowledgment of what was wrong]. We\'ve [specific corrective actions]. We\'re implementing [prevention measures] to ensure this doesn\'t happen again."`, recoveryTimeline: 'Immediate removal. Public statement within 2 hours. Process changes within 1 week. Ongoing sensitivity training.' },
    { crisisType: 'Data Privacy Incident', firstResponse: '"We\'re aware of a potential data issue and our security team is investigating. We\'ll provide an update within [timeline]."', escalationPath: 'Security team (immediate) → Legal (within 30 min) → CEO + Board (within 2 hours) → Regulators (within 72 hours)', publicStatement: `"On [date], we discovered [brief description]. We immediately [containment actions]. [Number] users may be affected. We\'re offering [protection services]. Here\'s what we\'re doing to prevent this: [measures]."`, recoveryTimeline: '72 hours for notification. 30 days for investigation. 90 days for remediation. 6-12 months for trust recovery.' },
  ];

  const immediateActions = [
    overallRiskScore > 60 ? `HIGH ALERT: Risk score is ${overallRiskScore}/100 — activate crisis preparation mode. Review all playbook items this week.` : `Risk score is ${overallRiskScore}/100 — ${readinessLevel} readiness. Focus on prevention and monitoring.`,
    'Set up social listening alerts for brand name + industry + "scandal" / "controversy" / "boycott" — early warning saves millions',
    'Create a crisis response team with clear roles: who responds first, who escalates, who approves public statements',
    'Pre-write 5 crisis response templates (complaint, offensive content, data breach, influencer issue, platform outage) — in a crisis, you don\'t have time to write from scratch',
    'Run a "fire drill" crisis simulation quarterly — pick a scenario from above, time your team\'s response, identify gaps',
    `Your highest risk is: ${highestRisk} — prioritize mitigation for this category first`,
  ];

  return { overallRiskScore, highestRisk, readinessLevel, categories, scenarios, benchmarks, playbook, warnings, templates, immediateActions };
}

export default function RiskRadarPage() {
  const [industry, setIndustry] = useState<string>(industries[0]);
  const [audienceSize, setAudienceSize] = useState<string>(audienceSizes[1]);
  const [sensitivity, setSensitivity] = useState<string>(sensitivityLevels[1]);
  const [brand, setBrand] = useState('');
  const [report, setReport] = useState<RiskReport | null>(null);

  const generate = () => { if (brand.trim()) setReport(assessRisk(industry, audienceSize, sensitivity, brand)); };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 rounded-full text-sm font-medium">Brand Safety</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">Social Media Risk Radar</h1>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">Identify brand risks before they escalate. Get risk scoring, crisis simulations, response playbooks, and early warning systems for your social presence.</p>
        </div>

        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Industry</label>
              <select value={industry} onChange={e => setIndustry(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white">{industries.map(i => <option key={i}>{i}</option>)}</select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Audience Size</label>
              <select value={audienceSize} onChange={e => setAudienceSize(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white">{audienceSizes.map(a => <option key={a}>{a}</option>)}</select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Content Sensitivity Level</label>
              <select value={sensitivity} onChange={e => setSensitivity(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white">{sensitivityLevels.map(s => <option key={s}>{s}</option>)}</select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Brand Name</label>
              <input value={brand} onChange={e => setBrand(e.target.value)} placeholder="e.g., Acme Corp" className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white" />
            </div>
          </div>
          <button onClick={generate} className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg font-semibold hover:from-rose-600 hover:to-pink-600 transition-all">Scan for Risks</button>
        </div>

        {report && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 text-center">
                <div className={`text-3xl font-bold ${report.overallRiskScore > 60 ? 'text-red-400' : report.overallRiskScore > 40 ? 'text-yellow-400' : 'text-green-400'}`}>{report.overallRiskScore}/100</div>
                <div className="text-sm text-gray-400 mt-1">Overall Risk Score</div>
              </div>
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 text-center">
                <div className="text-xl font-bold text-rose-400">{report.highestRisk.split(' — ')[0]}</div>
                <div className="text-sm text-gray-400 mt-1">Highest Risk Area</div>
              </div>
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 text-center">
                <div className={`text-3xl font-bold ${report.readinessLevel === 'Excellent' || report.readinessLevel === 'Strong' ? 'text-green-400' : report.readinessLevel === 'Moderate' ? 'text-yellow-400' : 'text-red-400'}`}>{report.readinessLevel}</div>
                <div className="text-sm text-gray-400 mt-1">Crisis Readiness</div>
              </div>
            </div>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-rose-300">Immediate Actions</h2>
              <div className="space-y-2">{report.immediateActions.map((a, i) => <div key={i} className={`p-3 rounded-lg border ${i === 0 ? 'bg-red-500/10 border-red-500/30 text-red-300' : 'bg-gray-800/50 border-gray-700/50 text-gray-300'}`}>{a}</div>)}</div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-rose-300">Risk Categories</h2>
              <div className="space-y-3">{report.categories.map((c, i) => (
                <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">{c.category}</h3>
                    <span className={`text-lg font-bold ${c.score > 60 ? 'text-red-400' : c.score > 35 ? 'text-yellow-400' : 'text-green-400'}`}>{c.score}/100</span>
                  </div>
                  <div className="grid md:grid-cols-1 gap-2 text-sm">
                    <div><span className="text-gray-500">Trend:</span> <span className="text-gray-300">{c.trend}</span></div>
                    <div><span className="text-gray-500">Top threat:</span> <span className="text-red-300">{c.topThreat}</span></div>
                    <div><span className="text-gray-500">Mitigation:</span> <span className="text-green-300">{c.mitigation}</span></div>
                  </div>
                </div>
              ))}</div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-rose-300">Scenario Simulations</h2>
              <div className="space-y-4">{report.scenarios.map((s, i) => (
                <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
                  <h3 className="font-semibold text-white mb-3">{s.scenario}</h3>
                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    <div><span className="text-gray-500">Probability:</span> <span className="text-yellow-300">{s.probability}</span></div>
                    <div><span className="text-gray-500">Response window:</span> <span className="text-orange-300">{s.responseTime}</span></div>
                    <div className="md:col-span-2"><span className="text-gray-500">Impact:</span> <span className="text-red-300">{s.impact}</span></div>
                    <div className="md:col-span-2"><span className="text-gray-500">Estimated damage:</span> <span className="text-red-400">{s.estimatedDamage}</span></div>
                    <div className="md:col-span-2"><span className="text-gray-500">Playbook:</span> <span className="text-green-300">{s.playbookAction}</span></div>
                  </div>
                </div>
              ))}</div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-rose-300">Response Time Benchmarks</h2>
              <div className="overflow-x-auto"><table className="w-full text-sm">
                <thead><tr className="border-b border-gray-700">{['Crisis Type', 'Ideal', 'Industry Avg', 'Best in Class', 'Your Target'].map(h => <th key={h} className="text-left py-2 px-3 text-gray-400 font-medium">{h}</th>)}</tr></thead>
                <tbody>{report.benchmarks.map((b, i) => <tr key={i} className="border-b border-gray-800"><td className="py-2 px-3 text-white">{b.crisisType}</td><td className="py-2 px-3 text-green-300">{b.idealResponse}</td><td className="py-2 px-3 text-yellow-300">{b.industryAvg}</td><td className="py-2 px-3 text-teal-300">{b.bestInClass}</td><td className="py-2 px-3 text-rose-300">{b.yourTarget}</td></tr>)}</tbody>
              </table></div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-rose-300">Risk Mitigation Playbook</h2>
              <div className="space-y-3">{report.playbook.map((p, i) => (
                <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                  <h3 className="font-semibold text-white mb-2">{p.risk}</h3>
                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    <div className="md:col-span-2"><span className="text-gray-500">Prevention:</span> <span className="text-green-300">{p.preventionAction}</span></div>
                    <div><span className="text-gray-500">Owner:</span> <span className="text-blue-300">{p.owner}</span></div>
                    <div><span className="text-gray-500">Frequency:</span> <span className="text-gray-300">{p.frequency}</span></div>
                    <div><span className="text-gray-500">Cost:</span> <span className="text-yellow-300">{p.cost}</span></div>
                    <div><span className="text-gray-500">Effectiveness:</span> <span className="text-teal-300">{p.effectiveness}</span></div>
                  </div>
                </div>
              ))}</div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-rose-300">Early Warning Indicators</h2>
              <div className="space-y-3">{report.warnings.map((w, i) => (
                <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">{w.indicator}</h3>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${w.urgency === 'Critical' ? 'bg-red-500/20 text-red-400' : w.urgency === 'High' ? 'bg-orange-500/20 text-orange-400' : w.urgency === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-500/20 text-gray-400'}`}>{w.urgency}</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    <div><span className="text-gray-500">Source:</span> <span className="text-blue-300">{w.source}</span></div>
                    <div><span className="text-gray-500">Threshold:</span> <span className="text-yellow-300">{w.threshold}</span></div>
                    <div className="md:col-span-2"><span className="text-gray-500">Action:</span> <span className="text-green-300">{w.action}</span></div>
                  </div>
                </div>
              ))}</div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-rose-300">Crisis Response Templates</h2>
              <div className="space-y-4">{report.templates.map((t, i) => (
                <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
                  <h3 className="font-semibold text-white mb-3">{t.crisisType}</h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-500">First response:</span> <span className="text-rose-300">{t.firstResponse}</span></div>
                    <div><span className="text-gray-500">Escalation:</span> <span className="text-orange-300">{t.escalationPath}</span></div>
                    <div><span className="text-gray-500">Public statement:</span> <span className="text-green-300">{t.publicStatement}</span></div>
                    <div><span className="text-gray-500">Recovery timeline:</span> <span className="text-blue-300">{t.recoveryTimeline}</span></div>
                  </div>
                </div>
              ))}</div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
