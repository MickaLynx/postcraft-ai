'use client';
import { useState } from 'react';

const contentTypes = ['Social Media Post', 'Blog Article', 'Video Content', 'Podcast Episode', 'Infographic', 'User-Generated Content', 'Stock Photography', 'AI-Generated Content', 'Brand Collateral', 'Influencer Content'] as const;
const industries = ['Tech & SaaS', 'E-commerce', 'Healthcare', 'Finance', 'Entertainment', 'Education', 'Real Estate', 'Food & Beverage'] as const;
const regions = ['United States', 'European Union (GDPR)', 'United Kingdom', 'Canada (PIPEDA)', 'Australia', 'Asia-Pacific', 'Latin America', 'Global / Multi-Region'] as const;
const usageScopes = ['Commercial Use', 'Editorial Only', 'Personal / Internal', 'Social Media Only', 'Print & Digital', 'Broadcast / Streaming'] as const;
const licenseTypes = ['Royalty-Free', 'Rights-Managed', 'Creative Commons', 'Custom License', 'Public Domain', 'Fair Use'] as const;
const riskLevels = ['Conservative', 'Moderate', 'Aggressive', 'Enterprise Compliance'] as const;

interface IPAuditItem {
  asset: string;
  status: string;
  risk: string;
  action: string;
  deadline: string;
}

interface ComplianceFlag {
  regulation: string;
  requirement: string;
  status: string;
  severity: string;
  recommendation: string;
}

interface UsageRight {
  scope: string;
  permitted: boolean;
  conditions: string;
  expiry: string;
}

interface AssetFingerprint {
  assetType: string;
  hash: string;
  registeredDate: string;
  protection: string;
}

interface DeepfakeScan {
  element: string;
  authenticity: number;
  flagged: boolean;
  details: string;
}

interface RightsResult {
  complianceScore: number;
  riskScore: number;
  ipAudit: IPAuditItem[];
  complianceFlags: ComplianceFlag[];
  usageRights: UsageRight[];
  fingerprints: AssetFingerprint[];
  deepfakeScans: DeepfakeScan[];
  summary: string;
  nextReviewDate: string;
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }
function pick<T>(arr: readonly T[] | T[], seed: number, idx: number = 0): T { return arr[(seed + idx) % arr.length]; }

const assetNames = ['Hero image', 'Background music track', 'Product screenshot', 'Customer testimonial video', 'Brand logo variant', 'Stock footage clip', 'Illustration set', 'Font license', 'Audio voiceover', 'Animated graphic'];
const statuses = ['Licensed - Active', 'License Expiring', 'Unlicensed', 'Pending Review', 'Public Domain', 'Fair Use Claimed'];
const risks = ['Low', 'Medium', 'High', 'Critical'];
const actions = ['Renew license before expiry', 'Obtain commercial license', 'Replace with owned asset', 'Document fair use rationale', 'Verify attribution requirements', 'Contact rights holder for extension'];
const regulations = ['GDPR Art. 6', 'CCPA §1798.100', 'DMCA §512', 'FTC Endorsement Guidelines', 'EU AI Act Art. 52', 'Copyright Directive Art. 17', 'CAN-SPAM Act', 'COPPA'];
const requirements = ['Consent documentation for personal data in content', 'Right to deletion compliance for user-generated content', 'DMCA takedown response procedure', 'Clear disclosure of sponsored/AI content', 'Transparency labeling for AI-generated media', 'Licensing proof for third-party content', 'Opt-out mechanism for email campaigns', 'Age verification for youth-targeted content'];
const severities = ['Info', 'Warning', 'Action Required', 'Critical'];
const recommendations = ['Implement consent management platform', 'Add automated takedown workflow', 'Create content licensing registry', 'Deploy AI content watermarking', 'Establish rights clearance checklist', 'Set up periodic license audit schedule', 'Build attribution tracking database', 'Configure automated compliance scanning'];
const scopes = ['Web Display', 'Social Media Distribution', 'Print Reproduction', 'Video Embedding', 'Email Marketing', 'Resale / Sublicensing'];
const protections = ['SHA-256 fingerprint registered', 'Blockchain timestamp recorded', 'EXIF metadata preserved', 'Invisible watermark applied', 'Content ID registered', 'Copyright registry filed'];
const elements = ['Primary visual content', 'Audio track', 'Text overlay / copy', 'Brand elements', 'Human faces detected', 'AI-generated segments'];
const scanDetails = ['No manipulation detected — original content verified', 'Minor color grading detected — consistent with standard editing', 'Text overlay added post-production — verify license for fonts used', 'Brand elements match registered assets — no tampering found', 'Faces verified against consent database — all releases on file', 'AI generation markers detected — ensure disclosure compliance'];

function generateRights(contentType: string, industry: string, region: string, usageScope: string, licenseType: string, riskLevel: string): RightsResult {
  const seed = hash(`${contentType}-${industry}-${region}-${usageScope}-${licenseType}-${riskLevel}`);
  const complianceScore = 50 + seed % 46;
  const riskScore = 20 + (seed * 3) % 60;

  const ipAudit: IPAuditItem[] = Array.from({ length: 6 }, (_, i) => ({
    asset: pick(assetNames, seed, i * 3),
    status: pick(statuses, seed, i * 5),
    risk: pick(risks, seed, i * 7),
    action: pick(actions, seed, i * 2),
    deadline: `${2026}-${String(4 + (seed + i) % 9).padStart(2, '0')}-${String(1 + (seed + i * 3) % 28).padStart(2, '0')}`,
  }));

  const complianceFlags: ComplianceFlag[] = Array.from({ length: 6 }, (_, i) => ({
    regulation: regulations[i % regulations.length],
    requirement: requirements[i % requirements.length],
    status: pick(['Compliant', 'Partial', 'Non-Compliant', 'Under Review'], seed, i * 4),
    severity: pick(severities, seed, i * 6),
    recommendation: pick(recommendations, seed, i * 3),
  }));

  const usageRightsResult: UsageRight[] = scopes.map((scope, i) => ({
    scope,
    permitted: (seed + i) % 3 !== 0,
    conditions: pick(['Standard terms apply', 'Requires attribution', 'Geographic restrictions apply', 'Time-limited to 12 months', 'Platform-specific only', 'Non-exclusive rights'], seed, i * 5),
    expiry: `${2026}-${String(6 + (seed + i * 2) % 7).padStart(2, '0')}-${String(1 + (seed + i * 4) % 28).padStart(2, '0')}`,
  }));

  const fingerprints: AssetFingerprint[] = Array.from({ length: 5 }, (_, i) => ({
    assetType: pick(assetNames, seed, i * 4),
    hash: `${(seed * (i + 1) * 7919).toString(16).padStart(12, '0').slice(0, 12)}...`,
    registeredDate: `2026-04-${String(1 + (seed + i) % 28).padStart(2, '0')}`,
    protection: pick(protections, seed, i * 3),
  }));

  const deepfakeScans: DeepfakeScan[] = elements.map((element, i) => ({
    element,
    authenticity: 70 + ((seed + i * 11) % 28),
    flagged: (seed + i * 13) % 7 === 0,
    details: scanDetails[i % scanDetails.length],
  }));

  return {
    complianceScore,
    riskScore,
    ipAudit,
    complianceFlags,
    usageRights: usageRightsResult,
    fingerprints,
    deepfakeScans,
    summary: `${contentType} content for ${industry} in ${region}: ${complianceScore > 75 ? 'Strong' : complianceScore > 55 ? 'Moderate' : 'Weak'} compliance posture under ${licenseType} licensing. ${riskScore > 50 ? 'Elevated' : 'Acceptable'} risk level for ${usageScope.toLowerCase()} usage.`,
    nextReviewDate: `2026-05-${String(1 + seed % 28).padStart(2, '0')}`,
  };
}

export default function ContentRightsPage() {
  const [contentType, setContentType] = useState<string>(contentTypes[0]);
  const [industry, setIndustry] = useState<string>(industries[0]);
  const [region, setRegion] = useState<string>(regions[0]);
  const [usageScope, setUsageScope] = useState<string>(usageScopes[0]);
  const [licenseType, setLicenseType] = useState<string>(licenseTypes[0]);
  const [riskLevel, setRiskLevel] = useState<string>(riskLevels[0]);
  const [result, setResult] = useState<RightsResult | null>(null);

  const handleGenerate = () => setResult(generateRights(contentType, industry, region, usageScope, licenseType, riskLevel));
  const scoreColor = (n: number) => n > 75 ? '#34d399' : n > 55 ? '#fbbf24' : n > 35 ? '#fb923c' : '#f87171';
  const riskColor = (r: string) => r === 'Critical' ? '#f87171' : r === 'High' ? '#fb923c' : r === 'Medium' ? '#fbbf24' : '#34d399';

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Content Rights Vault</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Manage intellectual property, licensing compliance, and digital rights across all your content assets and jurisdictions.</p>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Content Type', value: contentType, setter: setContentType, options: contentTypes },
            { label: 'Industry', value: industry, setter: setIndustry, options: industries },
            { label: 'Region / Jurisdiction', value: region, setter: setRegion, options: regions },
            { label: 'Usage Scope', value: usageScope, setter: setUsageScope, options: usageScopes },
            { label: 'License Type', value: licenseType, setter: setLicenseType, options: licenseTypes },
            { label: 'Risk Tolerance', value: riskLevel, setter: setRiskLevel, options: riskLevels },
          ].map(({ label, value, setter, options }) => (
            <div key={label}>
              <label className="text-xs text-zinc-400 mb-1 block">{label}</label>
              <select value={value} onChange={e => setter(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100">
                {options.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
        <button onClick={handleGenerate} className="btn-primary px-8 py-3 rounded-lg font-semibold text-lg w-full md:w-auto">Audit Content Rights</button>

        {result && (
          <div className="space-y-8 mt-10 fade-in">
            {/* Scores */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 rounded-lg p-6 border border-zinc-800 text-center">
                <div className="text-xs text-zinc-500 mb-2">Compliance Score</div>
                <div className="text-4xl font-bold mb-2" style={{ color: scoreColor(result.complianceScore) }}>{result.complianceScore}<span className="text-lg text-zinc-500">/100</span></div>
                <div className="w-full bg-zinc-800 rounded-full h-2"><div className="h-2 rounded-full" style={{ width: `${result.complianceScore}%`, background: `linear-gradient(90deg, ${scoreColor(result.complianceScore)}, #a78bfa)` }} /></div>
              </div>
              <div className="bg-zinc-900/60 rounded-lg p-6 border border-zinc-800 text-center">
                <div className="text-xs text-zinc-500 mb-2">Risk Exposure</div>
                <div className="text-4xl font-bold mb-2" style={{ color: result.riskScore > 50 ? '#f87171' : '#34d399' }}>{result.riskScore}<span className="text-lg text-zinc-500">/100</span></div>
                <div className="w-full bg-zinc-800 rounded-full h-2"><div className="h-2 rounded-full" style={{ width: `${result.riskScore}%`, background: result.riskScore > 50 ? 'linear-gradient(90deg, #fb923c, #f87171)' : 'linear-gradient(90deg, #34d399, #a78bfa)' }} /></div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-zinc-900/60 rounded-lg p-5 border border-violet-500/30">
              <div className="text-xs text-violet-400 mb-2">Rights Assessment Summary</div>
              <p className="text-zinc-200">{result.summary}</p>
              <p className="text-xs text-zinc-500 mt-2">Next scheduled review: {result.nextReviewDate}</p>
            </div>

            {/* IP Audit */}
            <div>
              <h2 className="text-xl font-bold text-zinc-100 mb-4">IP Audit Trail</h2>
              <div className="space-y-3">
                {result.ipAudit.map((item, i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-violet-600 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                        <span className="font-semibold text-zinc-100">{item.asset}</span>
                      </div>
                      <span className="text-xs px-2 py-1 rounded" style={{ color: riskColor(item.risk), border: `1px solid ${riskColor(item.risk)}40` }}>{item.risk} Risk</span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-2 text-sm">
                      <div><span className="text-zinc-500">Status:</span> <span className="text-emerald-400">{item.status}</span></div>
                      <div><span className="text-zinc-500">Action:</span> <span className="text-violet-400">{item.action}</span></div>
                      <div><span className="text-zinc-500">Deadline:</span> <span className="text-zinc-300">{item.deadline}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance Flags */}
            <div>
              <h2 className="text-xl font-bold text-zinc-100 mb-4">Regulatory Compliance Flags</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {result.complianceFlags.map((flag, i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-fuchsia-400">{flag.regulation}</span>
                      <span className="text-xs px-2 py-1 rounded" style={{
                        color: flag.status === 'Compliant' ? '#34d399' : flag.status === 'Non-Compliant' ? '#f87171' : '#fbbf24',
                        border: `1px solid ${flag.status === 'Compliant' ? '#34d39940' : flag.status === 'Non-Compliant' ? '#f8717140' : '#fbbf2440'}`
                      }}>{flag.status}</span>
                    </div>
                    <p className="text-sm text-zinc-400 mb-2">{flag.requirement}</p>
                    <div className="text-sm"><span className="text-zinc-500">Recommendation:</span> <span className="text-emerald-400">{flag.recommendation}</span></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Usage Rights Matrix */}
            <div>
              <h2 className="text-xl font-bold text-zinc-100 mb-4">Usage Rights Matrix</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {result.usageRights.map((right, i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-zinc-100">{right.scope}</span>
                      <span className={`text-xs font-bold ${right.permitted ? 'text-emerald-400' : 'text-red-400'}`}>{right.permitted ? 'PERMITTED' : 'RESTRICTED'}</span>
                    </div>
                    <p className="text-sm text-zinc-400 mb-1">{right.conditions}</p>
                    <p className="text-xs text-zinc-500">Expires: {right.expiry}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Digital Fingerprints */}
            <div>
              <h2 className="text-xl font-bold text-zinc-100 mb-4">Digital Asset Fingerprints</h2>
              <div className="space-y-3">
                {result.fingerprints.map((fp, i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-zinc-100">{fp.assetType}</span>
                      <span className="text-xs text-zinc-500 ml-3 font-mono">{fp.hash}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-violet-400">{fp.protection}</div>
                      <div className="text-xs text-zinc-500">{fp.registeredDate}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Deepfake Scan */}
            <div>
              <h2 className="text-xl font-bold text-zinc-100 mb-4">Authenticity & Deepfake Scan</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {result.deepfakeScans.map((scan, i) => (
                  <div key={i} className={`bg-zinc-800/50 rounded-lg p-4 border ${scan.flagged ? 'border-red-500/50' : 'border-zinc-700/50'}`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-zinc-100">{scan.element}</span>
                      <span className="text-sm font-mono" style={{ color: scoreColor(scan.authenticity) }}>{scan.authenticity}% authentic</span>
                    </div>
                    <p className="text-sm text-zinc-400">{scan.details}</p>
                    {scan.flagged && <div className="text-xs text-red-400 mt-2 font-semibold">FLAGGED FOR REVIEW</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="rounded-xl p-8 text-center" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(219,39,119,0.2))' }}>
              <h3 className="text-2xl font-bold mb-2">Protect Your Content Empire</h3>
              <p className="text-zinc-400 mb-4">Full IP protection meets our 110+ content creation and optimization tools.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="/narrative-engine" className="text-violet-400 hover:text-violet-300 text-sm">Narrative Engine</a>
                <a href="/compliance-checker" className="text-violet-400 hover:text-violet-300 text-sm">Compliance Checker</a>
                <a href="/content-localizer" className="text-violet-400 hover:text-violet-300 text-sm">Content Localizer</a>
                <a href="/ad-scanner" className="text-violet-400 hover:text-violet-300 text-sm">Ad Scanner</a>
                <a href="/pricing" className="text-violet-400 hover:text-violet-300 text-sm">View Pricing</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
