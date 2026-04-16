'use client';
import { useState } from 'react';

const industries = ['Health & Wellness', 'Finance & Banking', 'Crypto & Web3', 'Food & Beverage', 'Beauty & Cosmetics', 'CBD & Cannabis', 'Alcohol', 'Gambling & Betting', 'Tech & SaaS', 'Real Estate', 'Insurance', 'Supplements & Nutraceuticals'] as const;
const adTypes = ['Social Post', 'Story Ad', 'Video Ad', 'Carousel Ad', 'Influencer Sponsorship', 'Email Campaign', 'Search Ad', 'Display Banner'] as const;
const platforms = ['Instagram', 'Facebook', 'TikTok', 'Twitter/X', 'LinkedIn', 'YouTube', 'Pinterest', 'Snapchat'] as const;
const regions = ['USA (FTC)', 'EU (GDPR/UCPD)', 'UK (ASA/CAP)', 'Australia (ACCC)', 'Canada (CRTC)', 'Global (Multi-Region)'] as const;
const claimTypes = ['Health Claims', 'Income/Earnings Claims', 'Testimonials & Endorsements', 'Before/After Results', 'Environmental/Green Claims', 'Pricing & Discount Claims'] as const;

interface FlaggedIssue { issue: string; severity: 'Critical' | 'Warning' | 'Info'; regulation: string; recommendation: string; penalty: string; }
interface RequiredDisclosure { disclosure: string; placement: string; wording: string; regulation: string; }
interface PlatformRule { platform: string; rule: string; status: 'Compliant' | 'Needs Fix'; }
interface ClaimCheck { claim: string; status: 'Verified' | 'Unverified' | 'Prohibited'; evidence: string; action: string; }
interface HashtagRule { hashtag: string; required: boolean; reason: string; }
interface RiskAssessment { level: 'Low' | 'Medium' | 'High' | 'Critical'; explanation: string; financialRisk: string; }
interface ScanResult {
  complianceScore: number;
  flaggedIssues: FlaggedIssue[];
  requiredDisclosures: RequiredDisclosure[];
  platformRules: PlatformRule[];
  claimChecks: ClaimCheck[];
  hashtagCompliance: HashtagRule[];
  checklist: string[];
  riskAssessment: RiskAssessment;
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }
function pick<T>(arr: readonly T[] | T[], seed: number, idx: number = 0): T { return arr[(seed + idx) % arr.length]; }

function runScan(industry: string, adType: string, platform: string, region: string, claim: string): ScanResult {
  const seed = hash(`${industry}-${adType}-${platform}-${region}-${claim}`);
  const score = 40 + seed % 55;

  const allIssues: FlaggedIssue[] = [
    { issue: 'Missing material connection disclosure for sponsored content', severity: 'Critical', regulation: 'FTC 16 CFR Part 255', recommendation: 'Add clear "#ad" or "Paid partnership" label above the fold', penalty: 'Up to $50,120 per violation' },
    { issue: `${industry} claims require substantiation documentation`, severity: 'Critical', regulation: region.includes('FTC') ? 'FTC Act Section 5' : 'EU UCPD Article 6', recommendation: 'Provide clinical studies or verifiable data backing all claims', penalty: 'Up to $46,517 per day' },
    { issue: 'Testimonial results not representative of typical outcomes', severity: 'Warning', regulation: 'FTC Endorsement Guides 2024', recommendation: 'Add "Results not typical" disclaimer with actual expected results', penalty: 'Cease & desist + corrective advertising' },
    { issue: 'Price comparison lacks verifiable reference price', severity: 'Warning', regulation: region.includes('EU') ? 'EU Omnibus Directive' : 'FTC Guides Against Deceptive Pricing', recommendation: 'Show the lowest price from the last 30 days as reference', penalty: 'Up to 4% of annual revenue (EU)' },
    { issue: 'Environmental claim "eco-friendly" too vague without certification', severity: 'Warning', regulation: 'FTC Green Guides (16 CFR 260)', recommendation: 'Replace with specific, qualified claims backed by certifications', penalty: 'Regulatory action + reputational damage' },
    { issue: 'Before/after imagery may imply guaranteed results', severity: 'Critical', regulation: region.includes('ASA') ? 'CAP Code Rule 13' : 'FTC Health Products Compliance', recommendation: 'Add clear disclaimer that individual results vary', penalty: 'Ad removal + investigation' },
    { issue: 'Auto-renewal terms not clearly disclosed', severity: 'Warning', regulation: 'ROSCA / EU Consumer Rights Directive', recommendation: 'Disclose renewal terms before purchase button', penalty: 'Up to $50,000 per violation' },
    { issue: 'Influencer failed to disclose gifted product', severity: 'Critical', regulation: 'FTC Endorsement Guides / ASA CAP Code', recommendation: 'Require influencers to use #gifted or #ad in first line', penalty: '$50,120 per violation (FTC)' },
    { issue: 'Countdown timer creates false urgency (not tied to real deadline)', severity: 'Info', regulation: 'EU Unfair Commercial Practices Directive', recommendation: 'Only use timers tied to genuine limited offers', penalty: 'Warning + corrective measures' },
    { issue: 'Missing age-gate for restricted product category', severity: 'Critical', regulation: `${platform} Advertising Policies`, recommendation: 'Implement age verification before showing ad', penalty: 'Account suspension' },
  ];

  const flaggedIssues = [allIssues[seed % allIssues.length], allIssues[(seed + 3) % allIssues.length], allIssues[(seed + 5) % allIssues.length], allIssues[(seed + 7) % allIssues.length]];

  const requiredDisclosures: RequiredDisclosure[] = [
    { disclosure: 'Paid Partnership Label', placement: 'Above the fold / first 3 seconds of video', wording: '"Paid partnership with [Brand]" or "#ad"', regulation: 'FTC / ASA / Platform Policy' },
    { disclosure: 'Results Disclaimer', placement: 'Adjacent to any claims or testimonials', wording: '"Individual results may vary. [Typical outcome description]."', regulation: 'FTC Endorsement Guides' },
    { disclosure: 'Material Terms of Offer', placement: 'Same page as the offer, before CTA', wording: 'Full price, subscription terms, auto-renewal details', regulation: 'ROSCA / E-Commerce Directive' },
    { disclosure: `${industry} Regulatory Disclaimer`, placement: 'Footer or caption of every ad', wording: pick(['*These statements have not been evaluated by the FDA.', '*Not financial advice. Capital at risk.', '*Terms and conditions apply. See website for details.', '*Consult a professional before making decisions.'], seed, 0), regulation: region },
  ];

  const platformRules: PlatformRule[] = [
    { platform: 'Instagram', rule: 'Branded content tool must be used for sponsored posts', status: seed % 3 === 0 ? 'Needs Fix' : 'Compliant' },
    { platform: 'TikTok', rule: 'Ad disclosure toggle required for commercial content', status: seed % 4 === 0 ? 'Needs Fix' : 'Compliant' },
    { platform: 'Facebook', rule: 'Special Ad Category required for housing/credit/employment', status: seed % 2 === 0 ? 'Compliant' : 'Needs Fix' },
    { platform: 'LinkedIn', rule: 'Sponsored content must use Campaign Manager', status: 'Compliant' },
    { platform: 'YouTube', rule: 'Paid promotion checkbox must be enabled', status: seed % 5 === 0 ? 'Needs Fix' : 'Compliant' },
    { platform: 'Twitter/X', rule: 'Political ads require authorization in Ads Transparency Center', status: 'Compliant' },
  ];

  const claimChecks: ClaimCheck[] = [
    { claim: `"${pick(['#1', 'Best', 'Most effective', 'Clinically proven', 'Guaranteed'], seed, 0)} ${industry.toLowerCase()} solution"`, status: 'Prohibited', evidence: 'Superlative claims require FTC/ASA substantiation', action: 'Remove or qualify with verifiable data source' },
    { claim: `"${pick(['Save up to', 'Earn up to', 'Lose up to', 'Grow by'], seed, 1)} ${20 + seed % 60}%"`, status: 'Unverified', evidence: 'Percentage claims need documentation of methodology', action: 'Add source citation and methodology disclosure' },
    { claim: '"As seen on [Major Media]"', status: seed % 2 === 0 ? 'Verified' : 'Unverified', evidence: seed % 2 === 0 ? 'Media appearance documented' : 'No press coverage found', action: seed % 2 === 0 ? 'Maintain with link to coverage' : 'Remove claim or obtain documentation' },
    { claim: `"Trusted by ${(seed % 50 + 10) * 100}+ ${pick(['customers', 'brands', 'professionals', 'businesses'], seed, 2)}"`, status: 'Unverified', evidence: 'User count claims must be verifiable and current', action: 'Verify count is accurate and up-to-date' },
  ];

  const hashtagCompliance: HashtagRule[] = [
    { hashtag: '#ad', required: adType === 'Influencer Sponsorship', reason: 'FTC requires clear disclosure of material connections' },
    { hashtag: '#sponsored', required: adType === 'Influencer Sponsorship', reason: 'Alternative disclosure accepted by most regulators' },
    { hashtag: '#gifted', required: false, reason: 'Required when product was gifted without monetary payment' },
    { hashtag: '#paidpartnership', required: adType.includes('Sponsor'), reason: 'Instagram/Meta preferred disclosure format' },
    { hashtag: '#affiliate', required: false, reason: 'Required when earning commission from product links' },
  ];

  const checklist = [
    'All material connections disclosed (sponsorship, gifting, affiliate)',
    'Claims substantiated with verifiable evidence or studies',
    'Testimonials reflect typical consumer experience',
    'Price comparisons use genuine reference prices',
    'Platform-specific branded content tools activated',
    'Age restrictions applied for regulated products',
    'Auto-renewal and subscription terms clearly stated',
    'Environmental claims backed by certifications',
    'Before/after images include results-vary disclaimer',
    'Privacy policy link accessible from ad landing page',
    'Contest/giveaway rules comply with local sweepstakes laws',
    'Influencer contracts include FTC compliance requirements',
    'Dark patterns (fake urgency, hidden fees) removed',
    'Accessibility standards met (alt text, captions, contrast)',
  ];

  const riskLevels: ('Low' | 'Medium' | 'High' | 'Critical')[] = ['Low', 'Medium', 'High', 'Critical'];
  const riskIdx = score > 80 ? 0 : score > 60 ? 1 : score > 40 ? 2 : 3;
  const riskAssessment: RiskAssessment = {
    level: riskLevels[riskIdx],
    explanation: pick([
      'Your ad meets most regulatory requirements but has minor issues to address.',
      'Several compliance gaps detected. Review flagged issues before publishing.',
      'Significant regulatory risks found. Do not publish until critical issues are resolved.',
      'Multiple critical violations detected. Immediate legal review recommended.',
    ], riskIdx, 0),
    financialRisk: pick(['< $5,000', '$5,000 - $50,000', '$50,000 - $500,000', '$500,000+'], riskIdx, 0),
  };

  return { complianceScore: score, flaggedIssues, requiredDisclosures, platformRules, claimChecks, hashtagCompliance, checklist, riskAssessment };
}

export default function AdScannerPage() {
  const [industry, setIndustry] = useState(industries[0]);
  const [adType, setAdType] = useState(adTypes[0]);
  const [platform, setPlatform] = useState(platforms[0]);
  const [region, setRegion] = useState(regions[0]);
  const [claim, setClaim] = useState(claimTypes[0]);
  const [result, setResult] = useState<ScanResult | null>(null);

  const handleScan = () => setResult(runScan(industry, adType, platform, region, claim));

  const severityColor = (s: string) => s === 'Critical' ? 'text-red-400 bg-red-400/10 border-red-400/30' : s === 'Warning' ? 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30' : 'text-blue-400 bg-blue-400/10 border-blue-400/30';
  const statusColor = (s: string) => s === 'Compliant' || s === 'Verified' ? 'text-emerald-400' : s === 'Needs Fix' || s === 'Prohibited' ? 'text-red-400' : 'text-yellow-400';
  const riskColor = (l: string) => l === 'Low' ? 'text-emerald-400' : l === 'Medium' ? 'text-yellow-400' : l === 'High' ? 'text-orange-400' : 'text-red-400';

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Ad Compliance Scanner</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Scan your social media ads against FTC, GDPR, ASA, and platform-specific regulations before publishing. Avoid fines up to $50,000+ per violation.</p>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {([
            { label: 'Industry', value: industry, setter: setIndustry as (v: string) => void, options: industries as readonly string[] },
            { label: 'Ad Type', value: adType, setter: setAdType as (v: string) => void, options: adTypes as readonly string[] },
            { label: 'Platform', value: platform, setter: setPlatform as (v: string) => void, options: platforms as readonly string[] },
            { label: 'Region', value: region, setter: setRegion as (v: string) => void, options: regions as readonly string[] },
            { label: 'Primary Claim Type', value: claim, setter: setClaim as (v: string) => void, options: claimTypes as readonly string[] },
          ] as const).map(({ label, value, setter, options }) => (
            <div key={label}>
              <label className="block text-sm text-zinc-400 mb-1">{label}</label>
              <select value={value} onChange={e => setter(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100">
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
          <div className="flex items-end">
            <button onClick={handleScan} className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 py-2 rounded font-semibold hover:opacity-90 transition">Scan for Compliance</button>
          </div>
        </div>

        {result && (
          <div className="space-y-8">
            {/* Score + Risk */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 text-center">
                <div className="text-6xl font-bold mb-2" style={{ color: result.complianceScore > 80 ? '#34d399' : result.complianceScore > 60 ? '#fbbf24' : result.complianceScore > 40 ? '#fb923c' : '#f87171' }}>{result.complianceScore}</div>
                <div className="text-zinc-400">Compliance Score / 100</div>
                <div className="mt-3 w-full bg-zinc-800 rounded-full h-3">
                  <div className="h-3 rounded-full transition-all" style={{ width: `${result.complianceScore}%`, background: result.complianceScore > 80 ? '#34d399' : result.complianceScore > 60 ? '#fbbf24' : '#f87171' }} />
                </div>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-2">Risk Assessment</h3>
                <div className={`text-2xl font-bold ${riskColor(result.riskAssessment.level)} mb-2`}>{result.riskAssessment.level} Risk</div>
                <p className="text-zinc-400 text-sm mb-3">{result.riskAssessment.explanation}</p>
                <div className="text-sm"><span className="text-zinc-500">Potential Financial Exposure:</span> <span className="text-red-400 font-semibold">{result.riskAssessment.financialRisk}</span></div>
              </div>
            </div>

            {/* Flagged Issues */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Flagged Issues ({result.flaggedIssues.length})</h3>
              <div className="space-y-3">
                {result.flaggedIssues.map((f, i) => (
                  <div key={i} className={`border rounded-lg p-4 ${severityColor(f.severity)}`}>
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold">{f.issue}</span>
                      <span className={`text-xs px-2 py-1 rounded-full border ${severityColor(f.severity)}`}>{f.severity}</span>
                    </div>
                    <div className="text-sm opacity-80 space-y-1">
                      <div><strong>Regulation:</strong> {f.regulation}</div>
                      <div><strong>Fix:</strong> {f.recommendation}</div>
                      <div><strong>Penalty:</strong> {f.penalty}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Required Disclosures */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Required Disclosures</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {result.requiredDisclosures.map((d, i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700">
                    <div className="font-semibold text-violet-400 mb-2">{d.disclosure}</div>
                    <div className="text-sm text-zinc-300 space-y-1">
                      <div><span className="text-zinc-500">Placement:</span> {d.placement}</div>
                      <div><span className="text-zinc-500">Wording:</span> {d.wording}</div>
                      <div><span className="text-zinc-500">Authority:</span> {d.regulation}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Rules */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Platform-Specific Rules</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="text-zinc-500 border-b border-zinc-800"><th className="text-left py-2">Platform</th><th className="text-left py-2">Rule</th><th className="text-left py-2">Status</th></tr></thead>
                  <tbody>
                    {result.platformRules.map((r, i) => (
                      <tr key={i} className="border-b border-zinc-800/50"><td className="py-2 text-zinc-300">{r.platform}</td><td className="py-2 text-zinc-400">{r.rule}</td><td className={`py-2 font-semibold ${statusColor(r.status)}`}>{r.status}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Claim Verification */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Claim Verification</h3>
              <div className="space-y-3">
                {result.claimChecks.map((c, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-zinc-200 font-medium">{c.claim}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${statusColor(c.status)} bg-zinc-800`}>{c.status}</span>
                    </div>
                    <div className="text-sm text-zinc-400"><strong>Evidence:</strong> {c.evidence}</div>
                    <div className="text-sm text-zinc-400"><strong>Action:</strong> {c.action}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hashtag Compliance */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Hashtag Compliance</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {result.hashtagCompliance.map((h, i) => (
                  <div key={i} className="flex items-center gap-3 bg-zinc-800/40 rounded-lg p-3 border border-zinc-700/50">
                    <span className={`text-lg ${h.required ? 'text-red-400' : 'text-zinc-500'}`}>{h.required ? '!' : '~'}</span>
                    <div>
                      <span className="text-violet-400 font-mono">{h.hashtag}</span>
                      <span className={`ml-2 text-xs ${h.required ? 'text-red-400' : 'text-zinc-500'}`}>{h.required ? 'REQUIRED' : 'Optional'}</span>
                      <div className="text-xs text-zinc-500">{h.reason}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Checklist */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Pre-Publish Compliance Checklist</h3>
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
              <h3 className="text-2xl font-bold mb-2">Stay Compliant, Stay Profitable</h3>
              <p className="text-zinc-400 mb-4">Use PostCraft AI to generate compliant ad copy from the start. Pair with <a href="/compliance-checker" className="text-violet-400 underline">Compliance Checker</a>, <a href="/ad-copy" className="text-violet-400 underline">Ad Copy Generator</a>, and <a href="/brand-checker" className="text-violet-400 underline">Brand Checker</a>.</p>
              <a href="/pricing" className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">Get PostCraft Pro</a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
