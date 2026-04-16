'use client';
import { useState } from 'react';

const companyTypes = ['Startup (1-50)', 'SMB (51-500)', 'Enterprise (500+)', 'Agency', 'Non-Profit', 'Government', 'E-commerce Brand', 'Creator/Influencer', 'Healthcare Organization', 'Financial Institution', 'Educational Institution', 'Media & Publishing'] as const;
const industries = ['Tech & SaaS', 'Finance & Banking', 'Health & Wellness', 'Retail & E-commerce', 'Food & Beverage', 'Travel & Hospitality', 'Real Estate', 'Legal & Compliance', 'Education', 'Entertainment', 'Manufacturing', 'Energy & Sustainability'] as const;
const toneStyles = ['Professional & Corporate', 'Friendly & Approachable', 'Bold & Disruptive', 'Educational & Thought Leadership', 'Community-First', 'Premium & Luxurious'] as const;
const regions = ['Global (Multi-Region)', 'North America', 'European Union (GDPR)', 'United Kingdom', 'APAC', 'Middle East & North Africa', 'Latin America', 'Sub-Saharan Africa'] as const;
const riskLevels = ['Conservative (Low Risk)', 'Moderate (Balanced)', 'Progressive (Higher Tolerance)', 'Industry-Regulated (Strict)'] as const;
const platforms = ['All Major Platforms', 'Instagram + TikTok Focus', 'LinkedIn + Twitter/X Focus', 'YouTube + Podcast Focus', 'Facebook + Community Focus', 'Emerging Platforms (Threads, BlueSky)'] as const;

interface GuidelineSection { title: string; rules: string[]; doList: string[]; dontList: string[]; }
interface CrisisProtocol { scenario: string; severity: 'Critical' | 'High' | 'Medium'; responseTime: string; steps: string[]; escalationPath: string; templateResponse: string; }
interface ComplianceRule { regulation: string; requirement: string; impact: string; action: string; penalty: string; }
interface RoleDefinition { role: string; responsibilities: string[]; approvalAuthority: string; escalationTrigger: string; }
interface ContentApproval { contentType: string; requiredApprovals: string; turnaround: string; reviewCriteria: string[]; }
interface MetricTarget { metric: string; target: string; frequency: string; owner: string; benchmark: string; }

interface PolicyDocument {
  guidelines: GuidelineSection[];
  crisisProtocols: CrisisProtocol[];
  complianceRules: ComplianceRule[];
  roles: RoleDefinition[];
  approvalWorkflows: ContentApproval[];
  metrics: MetricTarget[];
  escalationMatrix: string[];
  trainingItems: string[];
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }
function pick<T>(arr: readonly T[] | T[], seed: number, idx: number = 0): T { return arr[(seed + idx) % arr.length]; }

function generatePolicy(company: string, industry: string, tone: string, region: string, risk: string, platform: string): PolicyDocument {
  const seed = hash(`${company}-${industry}-${tone}-${region}-${risk}-${platform}`);

  const allTitles = ['Brand Voice & Tone Standards', 'Content Creation Guidelines', 'Community Engagement Rules', 'Crisis Communication Protocol', 'Employee Social Media Use', 'Influencer & Partnership Standards', 'Data Privacy & Consent', 'Visual Identity on Social', 'Competitive Intelligence Rules', 'Accessibility & Inclusion Standards'];
  const allRules = [
    ['All posts must align with brand voice guide v3.0+', 'No content published without at least one peer review', 'All statistics must link to primary sources', 'User-generated content requires written consent before resharing', 'No personal opinions presented as company positions'],
    ['Response time SLA: <2h for complaints, <4h for questions, <24h for suggestions', 'Never argue publicly — move heated exchanges to DM within 2 exchanges', 'Acknowledge mistakes transparently — never delete and pretend', 'Competitor mentions: acknowledge respectfully, never disparage', 'Escalate any legal threats immediately to legal@company'],
    ['Employees may post personal views with clear disclaimer', 'Company credentials (logo, titles) require approval for personal use', 'Confidential information includes roadmaps, financials, client names', 'Departing employees must remove company affiliation within 30 days', 'No social media activity during active litigation without legal approval'],
    ['Every image must have meaningful alt text (not "image" or "photo")', 'Captions must be added to all video content within 48h of posting', 'Color contrast must meet WCAG 2.1 AA standards in graphics', 'No flashing animations exceeding 3Hz in any video content', 'Language must be at 8th-grade reading level or below for public content'],
    ['Partner/influencer content must include proper FTC disclosure', 'All paid partnerships require signed agreement before first post', 'Influencer content must be pre-approved if using brand assets', 'Terminate partnerships immediately if partner engages in hate speech', 'Gifted product disclosure required even when no payment exchanged'],
  ];
  const allDos = [
    ['Use inclusive language (they/them as default singular)', 'Cite sources for all data claims', 'Respond to every tagged mention within SLA', 'Archive all published content monthly', 'A/B test headlines before major campaigns'],
    ['Humanize responses with empathy and first names', 'Share team wins and behind-the-scenes content', 'Cross-promote partner content that aligns with values', 'Update social bios quarterly with current campaigns', 'Use platform-native features (polls, stories, lives)'],
    ['Credit original creators when resharing', 'Localize content for target markets', 'Include CTAs that provide genuine value', 'Maintain consistent posting schedule (min 3x/week)', 'Document and share learnings from viral content'],
  ];
  const allDonts = [
    ['Never engage in political debates from brand account', 'Never use copyrighted music/images without license', 'Never auto-DM new followers', 'Never buy followers, likes, or engagement', 'Never post during active crises without crisis team approval'],
    ['Never screenshot private conversations for public posts', 'Never use tragedy for marketing opportunities', 'Never make promises the company cannot fulfill', 'Never ignore negative feedback hoping it disappears', 'Never repost without verifying the original source'],
    ['Never share internal metrics without CFO approval', 'Never use customer data for content without explicit consent', 'Never disparage former employees or partners', 'Never use dark patterns in social commerce', 'Never delete legitimate criticism without documentation'],
  ];

  const guidelines: GuidelineSection[] = Array.from({ length: 5 }, (_, i) => ({
    title: allTitles[(seed + i * 2) % allTitles.length],
    rules: allRules[(seed + i) % allRules.length],
    doList: allDos[(seed + i * 3) % allDos.length],
    dontList: allDonts[(seed + i * 4) % allDonts.length],
  }));

  const crisisScenarios = ['Data breach affecting customer information', 'Viral negative customer experience post', 'Employee misconduct caught on camera', 'Product recall or safety issue', 'CEO/executive controversial statement', 'Fake news or misinformation about company', 'Lawsuit filed by customer or competitor', 'Platform outage affecting service delivery', 'Influencer partnership scandal'];
  const responseTimes = ['< 30 minutes', '< 1 hour', '< 2 hours', '< 4 hours'];
  const allSteps = [
    ['Activate crisis Slack channel immediately', 'Pull all scheduled posts within 15 minutes', 'Draft holding statement using approved template', 'Brief executive team with situation summary', 'Monitor sentiment every 30 minutes'],
    ['Identify scope and verify facts before responding', 'Coordinate with legal on public statement', 'Assign dedicated community manager to monitor', 'Prepare FAQ document for customer support team', 'Schedule post-crisis debrief within 48 hours'],
    ['Isolate the source — do not engage until facts confirmed', 'Prepare internal talking points for all team members', 'Contact platform trust & safety if content violates TOS', 'Document timeline of events for legal record', 'Plan recovery content calendar for following week'],
  ];
  const escalationPaths = [
    'Social Manager → Head of Marketing → VP Communications → CEO → Board',
    'Community Manager → Brand Director → Legal → Chief Communications Officer',
    'Social Team Lead → PR Director → General Counsel → Executive Committee',
  ];
  const templateResponses = [
    'We are aware of [situation] and are actively investigating. We take this seriously and will provide an update within [timeframe]. For immediate assistance, please contact [support channel].',
    'Thank you for bringing this to our attention. We are looking into this matter with urgency and will share a full response shortly. Your trust means everything to us.',
    'We want to address [issue] directly. Here is what we know so far: [facts]. Here is what we are doing: [actions]. We will update you as we learn more.',
  ];

  const crisisProtocols: CrisisProtocol[] = Array.from({ length: 5 }, (_, i) => ({
    scenario: crisisScenarios[(seed + i * 3) % crisisScenarios.length],
    severity: i < 2 ? 'Critical' : i < 4 ? 'High' : 'Medium',
    responseTime: responseTimes[(seed + i) % responseTimes.length],
    steps: allSteps[(seed + i * 2) % allSteps.length],
    escalationPath: escalationPaths[(seed + i) % escalationPaths.length],
    templateResponse: templateResponses[(seed + i * 4) % templateResponses.length],
  }));

  const regulations = ['GDPR (EU)', 'CCPA/CPRA (California)', 'FTC Endorsement Guidelines', 'COPPA (Children\'s Privacy)', 'ADA/WCAG Accessibility', 'CAN-SPAM Act', 'Platform-Specific Policies', 'HIPAA (Healthcare)', 'SEC Social Media Rules (Finance)'];
  const requirements = [
    'Explicit consent required before collecting user data through social campaigns',
    'Paid partnerships must include clear #ad or #sponsored disclosure',
    'Content targeting minors must comply with age-verification requirements',
    'All social media content must meet accessibility standards (alt text, captions)',
    'Financial claims require compliance review before publishing',
    'Health-related claims must be substantiated by peer-reviewed sources',
    'Contest/giveaway rules must include official rules and void-where-prohibited disclaimers',
    'Employee advocacy content must distinguish personal from professional views',
    'Data retention policies must be documented and enforced across all platforms',
  ];
  const impacts = [
    'Non-compliance can result in fines up to 4% of global annual revenue',
    'FTC can issue cease-and-desist orders and require corrective advertising',
    'Platform can permanently ban accounts for repeated violations',
    'Lawsuits from affected individuals can result in class action exposure',
    'Reputational damage from compliance failures can reduce brand trust by 30-60%',
  ];
  const actions = [
    'Implement consent management platform (CMP) for all social data collection',
    'Create mandatory disclosure checklist for all influencer collaborations',
    'Conduct quarterly accessibility audit of all social media profiles and content',
    'Train all social media team members on compliance requirements annually',
    'Establish automated monitoring for regulatory keywords and phrases',
  ];
  const penalties = [
    '€20M or 4% global revenue (whichever higher)',
    '$50,000+ per violation, potential injunctive relief',
    'Account suspension/permanent ban, content removal',
    '$43,792 per violation (FTC adjusted annually)',
    'Varies by jurisdiction — typically $10K-$500K per incident',
  ];

  const complianceRules: ComplianceRule[] = Array.from({ length: 5 }, (_, i) => ({
    regulation: regulations[(seed + i * 2) % regulations.length],
    requirement: requirements[(seed + i * 3) % requirements.length],
    impact: impacts[(seed + i) % impacts.length],
    action: actions[(seed + i * 4) % actions.length],
    penalty: penalties[(seed + i * 5) % penalties.length],
  }));

  const roleNames = ['Social Media Manager', 'Community Manager', 'Content Strategist', 'Brand Guardian', 'Crisis Communications Lead', 'Compliance Officer'];
  const allResponsibilities = [
    ['Manage daily posting schedule across all platforms', 'Monitor brand mentions and sentiment in real-time', 'Coordinate with content creators on publishing calendar', 'Report weekly metrics to marketing leadership'],
    ['Respond to all community interactions within SLA', 'Moderate user-generated content and comments', 'Identify and escalate potential crises early', 'Build and maintain community ambassador program'],
    ['Develop content pillars and editorial calendar', 'Ensure brand voice consistency across all content', 'Conduct competitive content analysis monthly', 'Brief external creators and agencies on brand standards'],
    ['Final approval authority on sensitive content', 'Conduct quarterly brand voice audit', 'Update and maintain brand guidelines document', 'Train new team members on voice and tone standards'],
    ['Lead crisis response when activated', 'Maintain crisis playbook and templates', 'Conduct post-crisis analysis and retrospectives', 'Coordinate with legal and PR during active incidents'],
    ['Review all campaign content for regulatory compliance', 'Maintain disclosure and disclaimer library', 'Conduct annual compliance training for social team', 'Audit partner and influencer contracts quarterly'],
  ];
  const approvalAuth = ['Standard posts, stories, community replies', 'Community responses, UGC reshares, comment moderation', 'Campaign concepts, content pillars, editorial direction', 'Sensitive topics, crisis responses, executive content', 'All crisis communications, public statements during incidents', 'Regulated content, financial claims, health claims, legal matters'];
  const escalationTriggers = [
    'Content involving legal, political, or controversial topics',
    'Negative sentiment spike >20% or viral complaint (>1K engagements)',
    'Brand voice drift detected across 3+ consecutive posts',
    'Any content mentioning competitors, pricing, or unreleased features',
    'Media inquiry, legal threat, or government/regulatory contact',
    'Content making financial, health, or safety claims',
  ];

  const roles: RoleDefinition[] = Array.from({ length: 5 }, (_, i) => ({
    role: roleNames[(seed + i) % roleNames.length],
    responsibilities: allResponsibilities[(seed + i * 2) % allResponsibilities.length],
    approvalAuthority: approvalAuth[(seed + i * 3) % approvalAuth.length],
    escalationTrigger: escalationTriggers[(seed + i * 4) % escalationTriggers.length],
  }));

  const contentTypes = ['Standard organic posts', 'Paid/sponsored content', 'Influencer collaborations', 'Crisis communications', 'Executive/thought leadership', 'User-generated content reshares', 'Campaign launches', 'Partnership announcements'];
  const reqApprovals = ['Social Media Manager only', 'Social Manager + Brand Guardian', 'Brand Guardian + Legal', 'Crisis Lead + VP Comms + Legal', 'Executive + Brand Guardian + PR', 'Social Manager + Legal'];
  const turnarounds = ['Same day', '24 hours', '48 hours', '2-4 hours (expedited)', '1 week (complex review)', '72 hours'];
  const reviewCriteria = [
    ['Brand voice alignment', 'Spelling and grammar', 'Hashtag strategy', 'Visual quality'],
    ['Legal compliance', 'Disclosure requirements', 'Target audience appropriateness', 'Competitive sensitivity'],
    ['Cultural sensitivity', 'Accessibility standards', 'Platform best practices', 'SEO optimization'],
    ['Crisis messaging alignment', 'Stakeholder impact assessment', 'Legal exposure review', 'Public sentiment forecast'],
  ];

  const approvalWorkflows: ContentApproval[] = Array.from({ length: 5 }, (_, i) => ({
    contentType: contentTypes[(seed + i * 2) % contentTypes.length],
    requiredApprovals: reqApprovals[(seed + i * 3) % reqApprovals.length],
    turnaround: turnarounds[(seed + i) % turnarounds.length],
    reviewCriteria: reviewCriteria[(seed + i * 4) % reviewCriteria.length],
  }));

  const metricNames = ['Engagement Rate', 'Response Time (avg)', 'Sentiment Score', 'Brand Mention Volume', 'Content Quality Score', 'Compliance Adherence', 'Crisis Response Time', 'Audience Growth Rate', 'Share of Voice', 'Content Accessibility Score'];
  const targets = ['>3.5% across platforms', '<2 hours for all platforms', '>75% positive sentiment', '+15% QoQ growth', '>85/100 quality score', '100% disclosure compliance', '<30 min for Critical severity', '>5% MoM follower growth', '>25% in industry vertical', '>90% WCAG AA compliance'];
  const frequencies = ['Weekly', 'Daily', 'Weekly', 'Monthly', 'Bi-weekly', 'Per campaign', 'Per incident', 'Monthly', 'Quarterly', 'Quarterly'];
  const owners = ['Social Media Manager', 'Community Manager', 'Content Strategist', 'Brand Guardian', 'Compliance Officer'];
  const benchmarks = ['Industry avg: 2.1%', 'Industry avg: 4.2 hours', 'Industry avg: 62%', 'Competitors: +8% QoQ', 'Top performers: 92/100', 'Industry standard: 94%', 'Best-in-class: <15 min', 'Industry avg: 2.3% MoM', 'Market leader: 35%', 'Industry avg: 72%'];

  const metrics: MetricTarget[] = Array.from({ length: 6 }, (_, i) => ({
    metric: metricNames[(seed + i * 2) % metricNames.length],
    target: targets[(seed + i * 2) % targets.length],
    frequency: frequencies[(seed + i * 3) % frequencies.length],
    owner: owners[(seed + i) % owners.length],
    benchmark: benchmarks[(seed + i * 2) % benchmarks.length],
  }));

  const escalationMatrix = [
    'Level 1 (Green): Routine content questions → Social Media Manager resolves within SLA',
    'Level 2 (Yellow): Negative feedback trend or minor policy question → Brand Guardian consulted within 4 hours',
    'Level 3 (Orange): Viral complaint, media mention, or compliance concern → Crisis Lead activated within 1 hour',
    'Level 4 (Red): Legal threat, data breach, executive incident → Full crisis team activated within 30 minutes',
    'Level 5 (Black): Existential threat, regulatory action, major safety issue → Board notified, external crisis firm engaged',
  ];

  const trainingItems = [
    'Onboarding: Complete brand voice certification (2-hour module) within first week',
    'Monthly: Review updated crisis playbook and practice tabletop exercise',
    'Quarterly: Compliance refresher covering new regulations and platform policy changes',
    'Bi-annually: Accessibility audit training — creating inclusive content across platforms',
    'Annually: Full social media policy review and acknowledgment signing',
    'Ad-hoc: Platform algorithm update briefings within 48h of major changes',
    'Ad-hoc: Cultural sensitivity training when entering new geographic markets',
    'Ongoing: Weekly team stand-up reviewing top-performing and flagged content',
  ];

  return { guidelines, crisisProtocols, complianceRules, roles, approvalWorkflows, metrics, escalationMatrix, trainingItems };
}

export default function SocialPolicyPage() {
  const [company, setCompany] = useState(companyTypes[0]);
  const [industry, setIndustry] = useState(industries[0]);
  const [tone, setTone] = useState(toneStyles[0]);
  const [region, setRegion] = useState(regions[0]);
  const [risk, setRisk] = useState(riskLevels[0]);
  const [platform, setPlatform] = useState(platforms[0]);
  const [result, setResult] = useState<PolicyDocument | null>(null);
  const [expandedCrisis, setExpandedCrisis] = useState<number | null>(null);

  const handleGenerate = () => setResult(generatePolicy(company, industry, tone, region, risk, platform));

  const sevColor = (s: string) => s === 'Critical' ? 'text-red-400 bg-red-400/10 border-red-400/30' : s === 'High' ? 'text-orange-400 bg-orange-400/10 border-orange-400/30' : 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Social Media Policy Generator</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Generate a comprehensive, legally-informed social media policy for your organization. Covers brand guidelines, crisis protocols, compliance, roles, approval workflows, and KPIs.</p>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {([
            { label: 'Company Type', value: company, setter: setCompany as (v: string) => void, options: companyTypes as readonly string[] },
            { label: 'Industry', value: industry, setter: setIndustry as (v: string) => void, options: industries as readonly string[] },
            { label: 'Tone Style', value: tone, setter: setTone as (v: string) => void, options: toneStyles as readonly string[] },
            { label: 'Region / Compliance', value: region, setter: setRegion as (v: string) => void, options: regions as readonly string[] },
            { label: 'Risk Tolerance', value: risk, setter: setRisk as (v: string) => void, options: riskLevels as readonly string[] },
            { label: 'Platform Focus', value: platform, setter: setPlatform as (v: string) => void, options: platforms as readonly string[] },
          ] as const).map(({ label, value, setter, options }) => (
            <div key={label}>
              <label className="block text-sm text-zinc-400 mb-1">{label}</label>
              <select value={value} onChange={e => setter(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100">
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
        <button onClick={handleGenerate} className="w-full md:w-auto bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded font-semibold hover:opacity-90 transition mb-8">Generate Policy Document</button>

        {result && (
          <div className="space-y-8">
            {/* Policy Overview */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-1">Policy Overview</h3>
              <p className="text-zinc-400 text-sm mb-4">{company} • {industry} • {region} • {risk}</p>
              <div className="grid md:grid-cols-4 gap-3 text-center">
                <div className="bg-zinc-800/50 rounded-lg p-3"><div className="text-2xl font-bold text-violet-400">{result.guidelines.length}</div><div className="text-xs text-zinc-500">Guideline Sections</div></div>
                <div className="bg-zinc-800/50 rounded-lg p-3"><div className="text-2xl font-bold text-red-400">{result.crisisProtocols.length}</div><div className="text-xs text-zinc-500">Crisis Protocols</div></div>
                <div className="bg-zinc-800/50 rounded-lg p-3"><div className="text-2xl font-bold text-blue-400">{result.complianceRules.length}</div><div className="text-xs text-zinc-500">Compliance Rules</div></div>
                <div className="bg-zinc-800/50 rounded-lg p-3"><div className="text-2xl font-bold text-emerald-400">{result.roles.length}</div><div className="text-xs text-zinc-500">Defined Roles</div></div>
              </div>
            </div>

            {/* Guidelines */}
            {result.guidelines.map((g, gi) => (
              <div key={gi} className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">{gi + 1}. {g.title}</h3>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-2">Core Rules</h4>
                  <div className="space-y-1">{g.rules.map((r, i) => <div key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-violet-400">•</span>{r}</div>)}</div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-emerald-400 mb-2">✓ Do</h4>
                    <div className="space-y-1">{g.doList.map((d, i) => <div key={i} className="text-sm text-zinc-400">{d}</div>)}</div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-red-400 mb-2">✗ Don&apos;t</h4>
                    <div className="space-y-1">{g.dontList.map((d, i) => <div key={i} className="text-sm text-zinc-400">{d}</div>)}</div>
                  </div>
                </div>
              </div>
            ))}

            {/* Crisis Protocols */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Crisis Communication Protocols</h3>
              <div className="space-y-3">
                {result.crisisProtocols.map((c, i) => (
                  <div key={i} className={`border rounded-lg overflow-hidden ${sevColor(c.severity)}`}>
                    <button onClick={() => setExpandedCrisis(expandedCrisis === i ? null : i)} className="w-full text-left p-4 flex justify-between items-center">
                      <div>
                        <span className="font-semibold">{c.scenario}</span>
                        <span className={`ml-3 text-xs px-2 py-1 rounded-full border ${sevColor(c.severity)}`}>{c.severity}</span>
                      </div>
                      <span className="text-zinc-500">{expandedCrisis === i ? '▼' : '▶'}</span>
                    </button>
                    {expandedCrisis === i && (
                      <div className="px-4 pb-4 space-y-3">
                        <div className="text-sm"><strong className="text-zinc-400">Response Time:</strong> <span className="text-yellow-400 font-semibold">{c.responseTime}</span></div>
                        <div>
                          <strong className="text-zinc-400 text-sm">Action Steps:</strong>
                          <ol className="text-sm text-zinc-300 mt-1 space-y-1">{c.steps.map((s, si) => <li key={si} className="flex gap-2"><span className="text-violet-400 shrink-0">{si + 1}.</span>{s}</li>)}</ol>
                        </div>
                        <div className="text-sm"><strong className="text-zinc-400">Escalation:</strong> <span className="text-zinc-300">{c.escalationPath}</span></div>
                        <div className="bg-zinc-800/60 rounded p-3 border border-zinc-700/50">
                          <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Template Response</div>
                          <div className="text-sm text-zinc-300 italic">&quot;{c.templateResponse}&quot;</div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Regulatory Compliance</h3>
              <div className="space-y-3">
                {result.complianceRules.map((c, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="font-semibold text-blue-400 mb-2">{c.regulation}</div>
                    <div className="text-sm space-y-1">
                      <div><span className="text-zinc-500">Requirement:</span> <span className="text-zinc-300">{c.requirement}</span></div>
                      <div><span className="text-zinc-500">Impact:</span> <span className="text-zinc-300">{c.impact}</span></div>
                      <div><span className="text-zinc-500">Action:</span> <span className="text-emerald-400">{c.action}</span></div>
                      <div><span className="text-zinc-500">Penalty:</span> <span className="text-red-400">{c.penalty}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Roles */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Team Roles & Responsibilities</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {result.roles.map((r, i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700">
                    <div className="font-semibold text-violet-400 mb-2">{r.role}</div>
                    <div className="text-sm space-y-1 mb-2">{r.responsibilities.map((resp, ri) => <div key={ri} className="text-zinc-400">• {resp}</div>)}</div>
                    <div className="text-xs mt-2 space-y-1">
                      <div><span className="text-zinc-500">Approval Authority:</span> <span className="text-zinc-300">{r.approvalAuthority}</span></div>
                      <div><span className="text-zinc-500">Escalates When:</span> <span className="text-yellow-400">{r.escalationTrigger}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Approval Workflows */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Content Approval Workflows</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="text-left text-zinc-500 border-b border-zinc-700"><th className="pb-2 pr-4">Content Type</th><th className="pb-2 pr-4">Required Approvals</th><th className="pb-2 pr-4">Turnaround</th><th className="pb-2">Review Criteria</th></tr></thead>
                  <tbody>
                    {result.approvalWorkflows.map((a, i) => (
                      <tr key={i} className="border-b border-zinc-800/50">
                        <td className="py-3 pr-4 text-violet-400 font-medium">{a.contentType}</td>
                        <td className="py-3 pr-4 text-zinc-300">{a.requiredApprovals}</td>
                        <td className="py-3 pr-4 text-zinc-300">{a.turnaround}</td>
                        <td className="py-3 text-zinc-400">{a.reviewCriteria.join(' • ')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Metrics */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Performance Metrics & KPIs</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="text-left text-zinc-500 border-b border-zinc-700"><th className="pb-2 pr-4">Metric</th><th className="pb-2 pr-4">Target</th><th className="pb-2 pr-4">Frequency</th><th className="pb-2 pr-4">Owner</th><th className="pb-2">Benchmark</th></tr></thead>
                  <tbody>
                    {result.metrics.map((m, i) => (
                      <tr key={i} className="border-b border-zinc-800/50">
                        <td className="py-3 pr-4 text-zinc-200 font-medium">{m.metric}</td>
                        <td className="py-3 pr-4 text-emerald-400">{m.target}</td>
                        <td className="py-3 pr-4 text-zinc-400">{m.frequency}</td>
                        <td className="py-3 pr-4 text-zinc-300">{m.owner}</td>
                        <td className="py-3 text-zinc-500">{m.benchmark}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Escalation Matrix */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Escalation Matrix</h3>
              <div className="space-y-2">
                {result.escalationMatrix.map((level, i) => {
                  const colors = ['bg-emerald-400/10 border-emerald-400/30 text-emerald-400', 'bg-yellow-400/10 border-yellow-400/30 text-yellow-400', 'bg-orange-400/10 border-orange-400/30 text-orange-400', 'bg-red-400/10 border-red-400/30 text-red-400', 'bg-zinc-400/10 border-zinc-400/30 text-zinc-300'];
                  return <div key={i} className={`text-sm p-3 rounded-lg border ${colors[i]}`}>{level}</div>;
                })}
              </div>
            </div>

            {/* Training */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Training & Certification Requirements</h3>
              <div className="space-y-2">
                {result.trainingItems.map((item, i) => (
                  <label key={i} className="flex items-start gap-2 text-sm text-zinc-300 cursor-pointer hover:text-zinc-100">
                    <input type="checkbox" className="mt-1 accent-violet-500" />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">Build Your Complete Social Strategy</h3>
              <p className="text-zinc-400 mb-4">Use PostCraft to generate, manage, and optimize your entire social media operation. Pair with <a href="/brand-voice" className="text-violet-400 underline">Brand Voice</a>, <a href="/compliance-checker" className="text-violet-400 underline">Compliance Checker</a>, and <a href="/crisis-management" className="text-violet-400 underline">Crisis Management</a>.</p>
              <a href="/pricing" className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">Get PostCraft Pro</a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
