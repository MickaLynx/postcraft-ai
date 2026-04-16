'use client';
import { useState } from 'react';

const contentVolumes = ['1-20 Assets/month', '20-100 Assets/month', '100-500 Assets/month', '500+ Assets/month'] as const;
const assetTypes = ['Stock Photos', 'Stock Video', 'Music & Audio', 'UGC Content', 'Influencer Content', 'All Asset Types'] as const;
const platforms = ['Instagram + TikTok', 'YouTube + LinkedIn', 'All Social Platforms', 'Social + Paid Ads', 'Social + Website + Ads'] as const;
const industries = ['E-commerce', 'Tech & SaaS', 'Agency (Multi-client)', 'Media & Publishing', 'Healthcare', 'Finance', 'Education'] as const;

interface LicenseAsset { name: string; type: string; source: string; license: string; platforms: string; expires: string; usageLimit: string; usedCount: number; attribution: string; risk: string; }
interface PlatformRight { platform: string; organic: string; paid: string; stories: string; reels: string; restriction: string; }
interface ComplianceCheck { area: string; status: string; issue: string; action: string; deadline: string; penalty: string; }
interface CostEntry { category: string; monthly: string; annual: string; perAsset: string; trend: string; optimization: string; }
interface AuditItem { asset: string; lastUsed: string; timesUsed: number; license: string; compliant: boolean; issue: string; action: string; }

interface LicensingReport {
  complianceScore: number;
  totalAssets: number;
  atRisk: number;
  expiringSoon: number;
  assets: LicenseAsset[];
  platformRights: PlatformRight[];
  complianceChecks: ComplianceCheck[];
  costs: CostEntry[];
  auditTrail: AuditItem[];
  bestPractices: string[];
  riskAlerts: string[];
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }

function trackLicensing(volume: string, asset: string, platform: string, industry: string, brand: string): LicensingReport {
  const seed = hash(`${volume}-${asset}-${platform}-${industry}-${brand}`);
  const complianceScore = 35 + seed % 55;
  const totalAssets = 20 + seed % 200;
  const atRisk = 2 + seed % 8;
  const expiringSoon = 3 + seed % 6;

  const assets: LicenseAsset[] = [
    { name: 'Hero Campaign Image Set', type: 'Stock Photo', source: 'Shutterstock', license: 'Standard — 500K impressions max', platforms: 'Organic social only', expires: `2026-${String(5 + seed % 7).padStart(2, '0')}-${String(1 + seed % 28).padStart(2, '0')}`, usageLimit: '500,000 impressions', usedCount: 120000 + seed % 380000, attribution: 'Not required', risk: seed % 3 === 0 ? 'Over impression limit — upgrade to Enhanced license' : 'Within limits' },
    { name: 'Product Lifestyle Video B-Roll', type: 'Stock Video', source: 'Artgrid', license: 'Social — 1 year, unlimited organic', platforms: 'All social organic', expires: `2026-${String(3 + seed % 9).padStart(2, '0')}-15`, usageLimit: 'Unlimited organic, no paid ads', usedCount: 34 + seed % 50, attribution: 'Not required for social', risk: seed % 4 === 0 ? 'Used in paid ad — license violation' : 'Compliant' },
    { name: 'Background Music Track — Upbeat Corporate', type: 'Music', source: 'Epidemic Sound', license: 'Commercial — subscription active', platforms: 'All platforms including ads', expires: 'Subscription renewal: monthly', usageLimit: 'Unlimited while subscribed', usedCount: 18 + seed % 30, attribution: 'Not required', risk: 'Ensure subscription stays active — all content becomes unlicensed if canceled' },
    { name: 'Customer Testimonial Videos (UGC)', type: 'UGC', source: 'Customer submissions', license: 'Release form signed — perpetual, all platforms', platforms: 'All platforms', expires: 'Perpetual', usageLimit: 'Unlimited', usedCount: 8 + seed % 15, attribution: 'Customer name optional (consent given)', risk: seed % 5 === 0 ? 'Missing release form for 2 videos — pull immediately' : 'All releases on file' },
    { name: 'Influencer Collaboration Content', type: 'Influencer', source: '@' + brand.toLowerCase().replace(/\s/g, '') + '_collab', license: 'Contract — 90-day social usage rights', platforms: 'Instagram + TikTok only', expires: `2026-${String(4 + seed % 3).padStart(2, '0')}-${String(10 + seed % 18).padStart(2, '0')}`, usageLimit: '90 days from delivery, specified platforms only', usedCount: 12 + seed % 8, attribution: 'Must tag creator in every post', risk: seed % 3 === 0 ? 'Expiring in < 30 days — renew or stop using' : 'Active' },
    { name: 'Brand Icon Set & Illustrations', type: 'Custom Design', source: 'Freelance designer (Fiverr)', license: 'Full buyout — work-for-hire agreement', platforms: 'All platforms, all uses', expires: 'Perpetual (owned IP)', usageLimit: 'Unlimited — company owns all rights', usedCount: 45 + seed % 60, attribution: 'None required (owned)', risk: 'Verify work-for-hire agreement is signed — verbal agreements are not enforceable' },
    { name: 'Data Visualization Templates', type: 'Stock Graphics', source: 'Envato Elements', license: 'Subscription — single end-product per download', platforms: 'All platforms', expires: 'Subscription renewal: annual', usageLimit: '1 end product per download — re-download for each use', usedCount: 22 + seed % 30, attribution: 'Not required', risk: seed % 4 === 0 ? 'Same download used in 3 different campaigns — license violation' : 'Properly licensed' },
  ];

  const platformRights: PlatformRight[] = [
    { platform: 'Instagram', organic: 'Most standard licenses allow organic posts', paid: 'Requires Enhanced/Extended license for paid promotion', stories: 'Same as organic — covered under standard', reels: 'Covered if social use is permitted', restriction: 'Paid partnership posts may require Extended license even for "organic" content' },
    { platform: 'TikTok', organic: 'Standard social licenses generally cover TikTok', paid: 'Spark Ads using organic posts — gray area, treat as paid', stories: 'N/A', reels: 'All TikTok is essentially short-form video — check video licensing', restriction: 'Duets/Stitches create derivative works — some licenses prohibit this' },
    { platform: 'YouTube', organic: 'Standard licenses cover uploads', paid: 'Pre-roll/mid-roll ads using stock = Extended license required', stories: 'YouTube Shorts — same as organic', reels: 'Shorts covered under standard social', restriction: 'Monetized videos may trigger Extended license requirements even for organic' },
    { platform: 'LinkedIn', organic: 'Standard social license covers LinkedIn posts', paid: 'Sponsored Content requires Extended/Commercial license', stories: 'N/A', reels: 'N/A', restriction: 'B2B thought leadership with stock photos — verify commercial use rights' },
    { platform: 'Facebook', organic: 'Standard social license covers organic posts', paid: 'Facebook Ads require Enhanced/Extended license', stories: 'Covered under organic social', reels: 'Facebook Reels — same as organic', restriction: 'Boosted posts are paid ads — standard organic license may not cover boosting' },
    { platform: 'Website / Blog', organic: 'Web license usually separate from social', paid: 'Display ads on site need separate ad license', stories: 'N/A', reels: 'Embedded social posts are usually fine', restriction: 'Blog hero images need web license, not just social license — different category' },
  ];

  const complianceChecks: ComplianceCheck[] = [
    { area: 'License Expiration Tracking', status: expiringSoon > 4 ? 'At Risk' : 'Needs Attention', issue: `${expiringSoon} assets expiring within 30 days — continued use after expiry = copyright infringement`, action: 'Set up 30/14/7-day expiration alerts — auto-pull expired content from scheduling tools', deadline: 'Immediate', penalty: '$750-$30,000 per infringement (US statutory damages)' },
    { area: 'Platform Usage Compliance', status: atRisk > 4 ? 'Violation Found' : 'Review Needed', issue: 'Assets licensed for organic social being used in paid ads without Extended license', action: 'Audit all paid campaigns — verify every asset has paid/commercial use rights', deadline: '48 hours', penalty: 'License revocation + statutory damages + potential platform ad account suspension' },
    { area: 'Attribution Requirements', status: seed % 3 === 0 ? 'Missing' : 'Partial', issue: 'Some licenses require attribution (photographer credit) — missing from multiple posts', action: 'Audit attribution requirements per asset — add required credits to post captions or image overlays', deadline: '7 days', penalty: 'License violation — copyright holder can issue DMCA takedown + invoice for unlicensed use' },
    { area: 'Model & Property Releases', status: seed % 4 === 0 ? 'Incomplete' : 'Needs Review', issue: 'UGC and influencer content may include recognizable people/locations without proper releases', action: 'Verify model releases for all content featuring identifiable individuals — especially for commercial/ad use', deadline: '14 days', penalty: 'Right of publicity lawsuits — $10K-$100K+ per occurrence' },
    { area: 'Music & Audio Licensing', status: 'Active', issue: 'Subscription-based music licenses become void if subscription lapses — all published content becomes unlicensed retroactively', action: 'Set subscription auto-renewal with payment alerts — maintain backup payment method', deadline: 'Ongoing', penalty: 'Every video with that music becomes infringing — potential mass DMCA takedowns' },
    { area: 'Work-for-Hire Documentation', status: seed % 3 === 0 ? 'Missing Agreements' : 'Incomplete', issue: 'Freelancer-created content without signed work-for-hire agreement — freelancer may still own copyright', action: 'Retroactively obtain IP assignment agreements — future contracts must include work-for-hire clause', deadline: '30 days', penalty: 'Freelancer could demand licensing fees or issue cease-and-desist for content they created' },
  ];

  const costs: CostEntry[] = [
    { category: 'Stock Photo Subscriptions', monthly: `$${79 + seed % 120}`, annual: `$${(79 + seed % 120) * 12}`, perAsset: `$${(0.5 + (seed % 30) / 10).toFixed(2)}`, trend: seed % 2 === 0 ? 'Increasing — more campaigns, more assets needed' : 'Stable', optimization: 'Consolidate to 1-2 providers — bulk annual plans save 30-50% vs monthly' },
    { category: 'Stock Video & B-Roll', monthly: `$${149 + seed % 200}`, annual: `$${(149 + seed % 200) * 12}`, perAsset: `$${(3 + (seed % 50) / 10).toFixed(2)}`, trend: 'Increasing — video-first content strategy driving higher usage', optimization: 'Build a reusable B-roll library — shoot custom footage for frequently needed scenes' },
    { category: 'Music & Audio Licensing', monthly: `$${15 + seed % 35}`, annual: `$${(15 + seed % 35) * 12}`, perAsset: `$${(1 + (seed % 20) / 10).toFixed(2)}`, trend: 'Stable', optimization: 'Subscription model (Epidemic Sound, Artlist) vs per-track licensing — subscription wins at 10+ tracks/month' },
    { category: 'Influencer Content Rights', monthly: `$${500 + seed % 2000}`, annual: `$${(500 + seed % 2000) * 12}`, perAsset: `$${(50 + seed % 200)}`, trend: 'Increasing — more influencer partnerships, longer usage rights needed', optimization: 'Negotiate perpetual usage rights upfront — 15-25% more expensive but eliminates renewal costs and risk' },
    { category: 'Custom Design & Freelance', monthly: `$${300 + seed % 1500}`, annual: `$${(300 + seed % 1500) * 12}`, perAsset: `$${(25 + seed % 100)}`, trend: seed % 2 === 0 ? 'Decreasing — building in-house capability' : 'Stable', optimization: 'Always use work-for-hire agreements — own the IP outright instead of licensing it' },
  ];

  const auditTrail: AuditItem[] = [
    { asset: 'Summer Campaign Hero Image', lastUsed: '2026-04-10', timesUsed: 23, license: 'Standard — 500K impressions', compliant: seed % 3 !== 0, issue: seed % 3 === 0 ? 'Exceeded impression cap — used in boosted post without Extended license' : 'Within usage limits', action: seed % 3 === 0 ? 'Upgrade to Enhanced license or replace asset immediately' : 'No action needed' },
    { asset: 'Product Demo Video Clip', lastUsed: '2026-04-08', timesUsed: 15, license: 'Social organic only', compliant: seed % 4 !== 0, issue: seed % 4 === 0 ? 'Used in YouTube pre-roll ad — requires Extended license' : 'Used in organic posts only', action: seed % 4 === 0 ? 'Pull from ad campaign — obtain Extended license before re-using' : 'No action needed' },
    { asset: 'Customer Review Compilation', lastUsed: '2026-04-12', timesUsed: 8, license: 'UGC — release forms', compliant: true, issue: 'All release forms on file and verified', action: 'Archive releases securely — they must be accessible for legal review' },
    { asset: 'Background Music — Chill Beats', lastUsed: '2026-04-14', timesUsed: 31, license: 'Epidemic Sound subscription', compliant: true, issue: 'Subscription active — auto-renew enabled', action: 'Verify payment method is current — failed payment = instant unlicensing' },
    { asset: 'Influencer Reel — @creator_handle', lastUsed: '2026-04-05', timesUsed: 6, license: '90-day usage contract', compliant: seed % 3 !== 0, issue: seed % 3 === 0 ? 'Usage period expired 5 days ago — content still live' : '45 days remaining on usage rights', action: seed % 3 === 0 ? 'Remove from all platforms immediately — contact creator for extension' : 'Set reminder for 30 days before expiry' },
    { asset: 'Infographic Template Set', lastUsed: '2026-04-11', timesUsed: 12, license: 'Envato Elements — single end-product', compliant: seed % 5 !== 0, issue: seed % 5 === 0 ? 'Same download used across 3 campaigns — violates single end-product clause' : 'Re-downloaded for each campaign use', action: seed % 5 === 0 ? 'Re-download and re-register for each campaign — document per-use licensing' : 'Compliant — maintain download records' },
  ];

  const bestPractices = [
    'Maintain a central asset registry with license type, expiration, platform rights, and attribution requirements for every piece of content',
    'Never assume organic social license covers paid ads — always verify. Boosted posts are paid ads even though they start as organic',
    'Set 30/14/7-day expiration alerts — auto-pull expired content rather than risking infringement',
    'Negotiate perpetual usage rights with influencers upfront — costs 15-25% more but eliminates renewal risk and expired content issues',
    'Always use signed work-for-hire agreements with freelancers — verbal agreements do not transfer copyright ownership',
    'Keep subscription payment methods current — a failed payment on Epidemic Sound unlicenses every video you have ever made with their music',
    'Document every asset use: which campaign, which platform, which dates — this audit trail is your legal defense',
    'Consolidate stock providers — 1-2 annual subscriptions are cheaper and easier to manage than 5+ per-asset purchases',
  ];

  const riskAlerts = [
    `${atRisk} assets currently at risk of license violation — immediate audit required`,
    `${expiringSoon} licenses expiring within 30 days — review and renew or replace`,
    seed % 2 === 0 ? 'Paid ad campaigns detected using Standard-licensed assets — potential violation' : 'No paid ad violations detected in current scan',
    seed % 3 === 0 ? 'Missing model releases for UGC content used in commercial context' : 'All model releases on file for current UGC assets',
    'Music subscription renewal in ' + (5 + seed % 25) + ' days — ensure payment method is valid',
    seed % 4 === 0 ? 'Freelancer content without work-for-hire agreement detected — IP ownership unclear' : 'All freelancer agreements documented',
  ];

  return { complianceScore, totalAssets, atRisk, expiringSoon, assets, platformRights, complianceChecks, costs, auditTrail, bestPractices, riskAlerts };
}

export default function ContentLicensingPage() {
  const [volume, setVolume] = useState(contentVolumes[0]);
  const [asset, setAsset] = useState(assetTypes[0]);
  const [platform, setPlatform] = useState(platforms[0]);
  const [industry, setIndustry] = useState(industries[0]);
  const [brand, setBrand] = useState('');
  const [result, setResult] = useState<LicensingReport | null>(null);

  const handleGenerate = () => { if (brand.trim()) setResult(trackLicensing(volume, asset, platform, industry, brand)); };
  const scoreColor = (n: number) => n >= 80 ? '#34d399' : n >= 60 ? '#a3e635' : n >= 40 ? '#fbbf24' : '#f87171';

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Content Licensing Tracker</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Stop risking copyright lawsuits. Track every licensed asset — know what you own, what expires, what platforms allow, and what violations lurk in your content library. Full compliance audit with cost optimization.</p>
        <div className="mb-4"><label className="block text-sm text-zinc-400 mb-1">Brand / Company</label><input type="text" value={brand} onChange={e => setBrand(e.target.value)} placeholder="e.g., PostCraft, your brand" className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-3 text-zinc-100" /></div>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {([{ label: 'Content Volume', value: volume, setter: setVolume as (v: string) => void, options: contentVolumes as readonly string[] }, { label: 'Primary Asset Type', value: asset, setter: setAsset as (v: string) => void, options: assetTypes as readonly string[] }, { label: 'Distribution Platforms', value: platform, setter: setPlatform as (v: string) => void, options: platforms as readonly string[] }, { label: 'Industry', value: industry, setter: setIndustry as (v: string) => void, options: industries as readonly string[] }] as const).map(({ label, value, setter, options }) => (<div key={label}><label className="block text-sm text-zinc-400 mb-1">{label}</label><select value={value} onChange={e => setter(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100">{options.map(o => <option key={o} value={o}>{o}</option>)}</select></div>))}
        </div>
        <button onClick={handleGenerate} className="w-full md:w-auto bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded font-semibold hover:opacity-90 transition mb-8">Run Licensing Audit</button>
        {result && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 text-center"><div className="text-4xl font-bold mb-1" style={{ color: scoreColor(result.complianceScore) }}>{result.complianceScore}%</div><div className="text-zinc-400 text-sm">Compliance Score</div></div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 text-center"><div className="text-4xl font-bold mb-1 text-violet-400">{result.totalAssets}</div><div className="text-zinc-400 text-sm">Total Assets</div></div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 text-center"><div className="text-4xl font-bold mb-1 text-red-400">{result.atRisk}</div><div className="text-zinc-400 text-sm">At Risk</div></div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 text-center"><div className="text-4xl font-bold mb-1 text-amber-400">{result.expiringSoon}</div><div className="text-zinc-400 text-sm">Expiring Soon</div></div>
            </div>

            {result.riskAlerts.some(a => a.includes('violation') || a.includes('Missing') || a.includes('without')) && (
              <div className="bg-red-950/30 border border-red-500/30 rounded-xl p-6"><h3 className="text-xl font-semibold mb-3 text-red-400">Risk Alerts</h3><div className="space-y-2">{result.riskAlerts.map((a, i) => <div key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-red-400 shrink-0">⚠</span>{a}</div>)}</div></div>
            )}

            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6"><h3 className="text-xl font-semibold mb-4 text-violet-400">Asset License Registry</h3><div className="space-y-3">{result.assets.map((a, i) => (<div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50"><div className="flex items-center justify-between mb-2"><span className="font-semibold text-zinc-200">{a.name}</span><span className={`text-xs px-2 py-0.5 rounded ${a.risk.includes('violation') || a.risk.includes('Over') || a.risk.includes('Missing') || a.risk.includes('Expiring') ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>{a.risk.length > 50 ? a.risk.slice(0, 50) + '...' : a.risk}</span></div><div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs"><div><span className="text-zinc-500">Type:</span> <span className="text-zinc-300">{a.type}</span></div><div><span className="text-zinc-500">Source:</span> <span className="text-zinc-300">{a.source}</span></div><div><span className="text-zinc-500">Expires:</span> <span className="text-zinc-300">{a.expires}</span></div><div><span className="text-zinc-500">Used:</span> <span className="text-zinc-300">{a.usedCount.toLocaleString()}x</span></div></div><div className="text-xs text-zinc-400 mt-1">License: {a.license}</div></div>))}</div></div>

            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6"><h3 className="text-xl font-semibold mb-4 text-fuchsia-400">Platform Rights Matrix</h3><div className="overflow-x-auto"><table className="w-full text-xs"><thead><tr className="text-zinc-500 border-b border-zinc-800"><th className="text-left p-2">Platform</th><th className="text-left p-2">Organic</th><th className="text-left p-2">Paid Ads</th><th className="text-left p-2">Stories</th><th className="text-left p-2">Reels/Shorts</th></tr></thead><tbody>{result.platformRights.map((p, i) => (<tr key={i} className="border-b border-zinc-800/50"><td className="p-2 text-zinc-200 font-medium">{p.platform}</td><td className="p-2 text-emerald-400/70">{p.organic}</td><td className="p-2 text-amber-400/70">{p.paid}</td><td className="p-2 text-zinc-400">{p.stories}</td><td className="p-2 text-zinc-400">{p.reels}</td></tr>))}</tbody></table></div></div>

            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6"><h3 className="text-xl font-semibold mb-4 text-red-400">Compliance Audit</h3><div className="space-y-3">{result.complianceChecks.map((c, i) => (<div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50"><div className="flex items-center justify-between mb-2"><span className="font-semibold text-zinc-200">{c.area}</span><span className={`text-xs px-2 py-0.5 rounded ${c.status.includes('Violation') || c.status.includes('Missing') ? 'bg-red-500/20 text-red-400' : c.status.includes('Risk') ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'}`}>{c.status}</span></div><div className="text-xs space-y-1"><div className="text-zinc-400">{c.issue}</div><div className="text-emerald-400/70">Action: {c.action}</div><div className="flex gap-4"><span className="text-zinc-500">Deadline: {c.deadline}</span><span className="text-red-400/60">Penalty: {c.penalty}</span></div></div></div>))}</div></div>

            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6"><h3 className="text-xl font-semibold mb-4 text-emerald-400">Licensing Cost Analysis</h3><div className="space-y-3">{result.costs.map((c, i) => (<div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50"><div className="flex items-center justify-between mb-2"><span className="font-semibold text-zinc-200">{c.category}</span><div className="flex gap-3 text-xs"><span className="text-violet-400">{c.monthly}/mo</span><span className="text-zinc-500">|</span><span className="text-emerald-400">{c.perAsset}/asset</span></div></div><div className="text-xs space-y-1"><div className="text-zinc-500">Trend: {c.trend}</div><div className="text-emerald-400/70">Optimize: {c.optimization}</div></div></div>))}</div></div>

            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6"><h3 className="text-xl font-semibold mb-4 text-amber-400">Usage Audit Trail</h3><div className="space-y-3">{result.auditTrail.map((a, i) => (<div key={i} className="bg-zinc-800/40 rounded-lg p-3 border border-zinc-700/50 flex items-center gap-4"><div className={`w-2 h-2 rounded-full shrink-0 ${a.compliant ? 'bg-emerald-400' : 'bg-red-400'}`} /><div className="flex-1 min-w-0"><div className="text-sm font-medium text-zinc-200">{a.asset}</div><div className="text-xs text-zinc-400">Used {a.timesUsed}x | Last: {a.lastUsed} | {a.license}</div></div><div className="text-xs text-right shrink-0">{a.compliant ? <span className="text-emerald-400">Compliant</span> : <span className="text-red-400">Issue Found</span>}</div></div>))}</div></div>

            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6"><h3 className="text-lg font-semibold mb-3 text-emerald-400">Licensing Best Practices</h3><div className="space-y-2">{result.bestPractices.map((b, i) => <div key={i} className="text-sm text-zinc-400 flex gap-2"><span className="text-emerald-400 shrink-0">{i + 1}.</span>{b}</div>)}</div></div>

            <div className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 rounded-xl p-8 text-center"><h3 className="text-2xl font-bold mb-2">Protect Your Content Legally</h3><p className="text-zinc-400 mb-4">PostCraft AI tracks licensing compliance automatically. Pair with <a href="/compliance-checker" className="text-violet-400 underline">Compliance Checker</a>, <a href="/content-rights" className="text-violet-400 underline">Content Rights Vault</a>, and <a href="/ad-scanner" className="text-violet-400 underline">Ad Scanner</a>.</p><a href="/pricing" className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">Get PostCraft Pro</a></div>
          </div>
        )}
      </div>
    </main>
  );
}
