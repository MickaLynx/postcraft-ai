'use client';
import { useState } from 'react';

const communityTypes = ['Brand Community', 'Product User Group', 'Industry Network', 'Creator Community', 'Support Forum', 'Learning Hub', 'Open Source Project', 'Local/Regional Group', 'Employee Advocacy', 'VIP/Premium Club', 'Beta Tester Group', 'Fan Community'] as const;
const platforms = ['Discord', 'Facebook Group', 'Slack', 'Reddit', 'LinkedIn Group', 'Telegram Group', 'WhatsApp Community', 'All Platforms'] as const;
const sizes = ['Small (< 100)', 'Medium (100-1K)', 'Growing (1K-10K)', 'Large (10K-100K)', 'Massive (100K+)'] as const;
const tones = ['Professional & Formal', 'Friendly & Welcoming', 'Casual & Fun', 'Academic & Thoughtful', 'Bold & Energetic', 'Minimalist & Direct'] as const;
const industries = ['Tech & SaaS', 'E-commerce & DTC', 'Healthcare', 'Finance & FinTech', 'Education', 'Gaming', 'Creative/Design', 'Non-Profit', 'Food & Beverage', 'Fitness & Wellness', 'Real Estate', 'B2B Services'] as const;
const moderationLevels = ['Light Touch (self-governing)', 'Moderate (clear rules, active mods)', 'Strict (pre-approval, verified members)', 'Zero Tolerance (enterprise compliance)'] as const;

interface GuidelineSection { title: string; rules: string[]; examples: { good: string; bad: string }; consequence: string; }
interface ModerationWorkflow { trigger: string; action: string; escalation: string; timeframe: string; documentation: string; }
interface OnboardingStep { step: string; content: string; channel: string; timing: string; }
interface RoleDefinition { role: string; permissions: string; responsibilities: string; selection: string; badge: string; }
interface ConflictProtocol { scenario: string; response: string; escalation: string; prevention: string; }

interface CommunityGuidelines {
  healthScore: number;
  sections: GuidelineSection[];
  moderation: ModerationWorkflow[];
  onboarding: OnboardingStep[];
  roles: RoleDefinition[];
  conflicts: ConflictProtocol[];
  welcomeMessage: string;
  metricsToTrack: string[];
  toxicBehaviors: string[];
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }

function generateGuidelines(communityType: string, platform: string, size: string, tone: string, industry: string, modLevel: string, communityName: string): CommunityGuidelines {
  const seed = hash(`${communityType}-${platform}-${size}-${tone}-${industry}-${modLevel}-${communityName}`);
  const score = 50 + seed % 45;

  const sections: GuidelineSection[] = [
    {
      title: 'Respectful Communication',
      rules: [
        'Treat every member with respect regardless of experience level, background, or opinion',
        'No personal attacks, name-calling, or deliberately inflammatory language',
        'Disagree with ideas, not people — critique the argument, not the person making it',
        'Assume good intent — misunderstandings happen, ask for clarification before reacting',
        `Use inclusive language — ${communityName} welcomes everyone`,
      ],
      examples: { good: '"I see your point, but have you considered this angle? In my experience..."', bad: '"That\'s the dumbest thing I\'ve ever read. You clearly don\'t know what you\'re talking about."' },
      consequence: 'First offense: warning. Second: 24h mute. Third: permanent removal.',
    },
    {
      title: 'Content Quality Standards',
      rules: [
        'Share content that adds value — insights, questions, resources, experiences',
        'No low-effort spam, chain messages, or repetitive self-promotion',
        'Use appropriate channels/threads for different topics',
        `${industry}-specific content is welcome; off-topic posts go to #general or #off-topic`,
        'When sharing links, include a brief description of why it\'s relevant',
      ],
      examples: { good: '"Just published a deep-dive on [topic]. Key takeaway: [insight]. Full post: [link]"', bad: '"Check out my new product! Buy now! Link link link 🔥🔥🔥"' },
      consequence: 'Content removed + DM explaining why. Repeat: posting privileges restricted.',
    },
    {
      title: 'Self-Promotion Policy',
      rules: [
        'Share your work when it genuinely helps the community — not as a sales pitch',
        'Follow the 80/20 rule: 80% community contribution, 20% self-promotion max',
        'Disclose affiliations, sponsorships, and commercial relationships',
        'Use designated channels (#showcase, #launches, #feedback) for promotional content',
        'Never DM members unsolicited promotions — this is an instant ban',
      ],
      examples: { good: '"I built a tool that solves [problem we discussed]. Free tier available. Would love feedback from this community."', bad: '"Hey everyone! Use code SAVE20 for 20% off my course! DM me for bulk pricing!"' },
      consequence: 'Promotional content removed. Unsolicited DMs: immediate permanent ban.',
    },
    {
      title: 'Privacy & Safety',
      rules: [
        'Never share personal information about other members without their consent',
        'No doxxing, stalking, or harassment — online or offline',
        'Report suspicious accounts or behavior to moderators immediately',
        `What\'s shared in ${communityName} stays in ${communityName} (Chatham House Rule unless stated otherwise)`,
        'Do not screenshot or share private conversations publicly without consent',
      ],
      examples: { good: 'Using @moderator tag to report a suspicious DM attempt', bad: 'Posting a member\'s real name, employer, or location without their permission' },
      consequence: 'Immediate permanent ban + report to platform trust & safety.',
    },
    {
      title: 'Intellectual Property & Attribution',
      rules: [
        'Always credit original creators when sharing their content or ideas',
        'Do not pass off others\' work as your own',
        'Respect copyright — don\'t share paid content, pirated material, or confidential information',
        'When quoting, use proper attribution and keep it proportional (fair use)',
        'Community members retain ownership of their original contributions',
      ],
      examples: { good: '"Great framework by @author (source: [link]). Here\'s how I adapted it for [industry]..."', bad: 'Copy-pasting an entire blog post without attribution or permission' },
      consequence: 'Content removed + warning. Repeat infringers lose posting privileges.',
    },
    {
      title: 'Conflict Resolution',
      rules: [
        'If you disagree, engage constructively — focus on learning, not winning',
        'Take heated discussions to DMs if they\'re between two people — don\'t hijack the channel',
        'Use the @moderator tag if a discussion becomes unproductive or hostile',
        'Accept moderator decisions gracefully — appeals go through designated channels',
        'No sub-tweeting, passive-aggressive posts, or indirect callouts',
      ],
      examples: { good: '"Let\'s agree to disagree on this one. I appreciate the different perspective."', bad: '"Some people in this group really need to educate themselves... (you know who you are)"' },
      consequence: 'Both parties warned. Repeat offenders: temporary mute for cooling off.',
    },
  ];

  const moderation: ModerationWorkflow[] = [
    { trigger: 'Spam or bot-like behavior detected', action: 'Remove content + mute user + verify account', escalation: 'If verified human: warning. If bot: permanent ban.', timeframe: 'Within 15 minutes', documentation: 'Log in mod channel with screenshot + user ID' },
    { trigger: 'Personal attack or harassment report', action: 'Review context, remove if violating, DM both parties', escalation: 'If severe: immediate ban + platform report', timeframe: 'Within 1 hour', documentation: 'Full incident report with timestamps and evidence' },
    { trigger: 'Self-promotion exceeds 20% ratio', action: 'DM member with friendly reminder of policy', escalation: 'If continues: restrict to #showcase only', timeframe: 'Within 24 hours', documentation: 'Note in member log with specific posts cited' },
    { trigger: 'Off-topic content in focused channels', action: 'Move content to appropriate channel, reply with redirect', escalation: 'If repeated: DM with channel guide', timeframe: 'Within 2 hours', documentation: 'No formal log needed unless repeated' },
    { trigger: 'Member requests to leave or delete data', action: 'Process request within 48 hours per GDPR/CCPA', escalation: 'Confirm deletion via email', timeframe: 'Within 48 hours', documentation: 'Deletion confirmation record maintained for compliance' },
  ];

  const onboarding: OnboardingStep[] = [
    { step: 'Welcome Message', content: `Welcome to ${communityName}! Here\'s what makes this community special and how to get the most out of it.`, channel: '#welcome or DM bot', timing: 'Immediately on join' },
    { step: 'Guidelines Acknowledgment', content: 'Read and react to community guidelines with a checkmark to unlock full posting access.', channel: '#rules', timing: 'Within first 10 minutes' },
    { step: 'Introduction Post', content: 'Share who you are, what you do, and what you hope to get from this community.', channel: '#introductions', timing: 'Within first 24 hours' },
    { step: 'First Value Contribution', content: 'Answer a question, share a resource, or comment on someone\'s post — give before you ask.', channel: 'Any relevant channel', timing: 'Within first 48 hours' },
    { step: 'Buddy/Mentor Match', content: 'Get paired with an experienced member who can show you the ropes and answer questions.', channel: 'DM or #mentorship', timing: 'Within first week' },
  ];

  const roles: RoleDefinition[] = [
    { role: 'Admin', permissions: 'Full platform control, ban/unban, settings, integrations', responsibilities: 'Strategic direction, policy updates, team management', selection: 'Founding team or appointed by leadership', badge: 'Shield icon, distinct color' },
    { role: 'Senior Moderator', permissions: 'Mute/ban, pin/delete messages, manage channels', responsibilities: 'Escalation handling, mod team coordination, policy enforcement', selection: 'Promoted from Moderator after 3+ months of excellent service', badge: 'Star icon, gold color' },
    { role: 'Moderator', permissions: 'Mute, delete messages, move content', responsibilities: 'Daily monitoring, content moderation, member support', selection: 'Application + community vote + admin approval', badge: 'Wrench icon, blue color' },
    { role: 'Community Champion', permissions: 'Pin messages in designated channels, host events', responsibilities: 'Content curation, event hosting, new member mentoring', selection: 'Nominated by members, confirmed by mod team', badge: 'Trophy icon, purple color' },
    { role: 'Verified Member', permissions: 'Full posting access, can create threads/polls', responsibilities: 'Follow guidelines, contribute constructively', selection: 'Complete onboarding + guidelines acknowledgment', badge: 'Checkmark icon, green color' },
  ];

  const conflicts: ConflictProtocol[] = [
    { scenario: 'Two members in heated public argument', response: 'Lock thread, DM both parties separately, mediate resolution', escalation: 'If unresolved after 48h: temporary mute for both, admin review', prevention: 'Encourage #debate channel with structured format (thesis → evidence → response)' },
    { scenario: 'Member accuses moderator of bias', response: 'Acknowledge concern publicly, review decision with another mod', escalation: 'If pattern: mod rotation or recusal from related decisions', prevention: 'Transparent mod logs, clear appeals process, mod code of conduct' },
    { scenario: 'Coordinated harassment or brigading', response: 'Lock affected channels, mass-mute/ban participants, notify platform', escalation: 'Contact platform trust & safety, document for legal if needed', prevention: 'Verification gates for new members, anti-raid bot configuration' },
    { scenario: 'Cultural or language misunderstanding', response: 'Clarify intent with both parties, provide cultural context', escalation: 'If genuine offense: mediated apology. If bad faith: standard consequences.', prevention: 'Cultural sensitivity guidelines, multilingual mod team, inclusive language guide' },
    { scenario: 'Confidential information leaked', response: 'Remove content immediately, DM source and affected parties', escalation: 'If malicious: permanent ban + legal review. If accidental: warning + process fix.', prevention: 'Clear Chatham House Rule, content classification system, regular reminders' },
  ];

  const welcomeMessage = `Welcome to ${communityName}! 🎉\n\nWe're a community of ${industry.toLowerCase()} professionals who believe in sharing knowledge, supporting each other, and growing together.\n\nHere's how to get started:\n1. Read our guidelines in #rules\n2. Introduce yourself in #introductions\n3. Browse channels and jump into conversations that interest you\n4. Give before you ask — the best way to build reputation here\n\nQuestions? Tag @moderator or DM any team member with the colored badge.\n\nWe're glad you're here!`;

  const metricsToTrack = [
    'Daily Active Members (DAM) — target: 15-30% of total members',
    'Posts per Day — healthy range: 0.5-2 per member per week',
    'Response Time — first reply to new posts within 2 hours',
    'New Member Retention — 30-day retention above 60%',
    'Moderation Volume — actions per 1000 members per week (lower is healthier)',
    'NPS Score — quarterly survey, target 50+',
    'Content Quality Index — upvotes/reactions per post trend',
    'Channel Distribution — no single channel > 40% of all posts',
  ];

  const toxicBehaviors = [
    'Sea-lioning: asking endless "innocent" questions to exhaust someone arguing in good faith',
    'Concern trolling: pretending to care about an issue to derail productive discussion',
    'Gatekeeping: telling people they\'re not "real" enough to belong or have opinions',
    'Tone policing: dismissing valid points because of how they were expressed',
    'Whataboutism: deflecting criticism by pointing to unrelated issues',
    'Dog-piling: when multiple people pile on one person beyond productive critique',
    'DARVO: Deny, Attack, Reverse Victim and Offender — common in harassment denials',
    'Sealioning: persistent, bad-faith demands for evidence disguised as polite discourse',
  ];

  return { healthScore: score, sections, moderation, onboarding, roles, conflicts, welcomeMessage, metricsToTrack, toxicBehaviors };
}

export default function CommunityGuidelinesPage() {
  const [communityType, setCommunityType] = useState(communityTypes[0]);
  const [platform, setPlatform] = useState(platforms[0]);
  const [size, setSize] = useState(sizes[0]);
  const [tone, setTone] = useState(tones[0]);
  const [industry, setIndustry] = useState(industries[0]);
  const [modLevel, setModLevel] = useState(moderationLevels[0]);
  const [communityName, setCommunityName] = useState('');
  const [result, setResult] = useState<CommunityGuidelines | null>(null);

  const handleGenerate = () => { if (communityName.trim()) setResult(generateGuidelines(communityType, platform, size, tone, industry, modLevel, communityName)); };
  const scoreColor = (n: number) => n > 75 ? '#34d399' : n > 55 ? '#fbbf24' : n > 35 ? '#fb923c' : '#f87171';

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Community Guidelines Generator</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Generate comprehensive, copy-paste-ready community guidelines for any platform. Get moderation workflows, onboarding sequences, role definitions, conflict protocols, and health metrics — customized to your community type and culture.</p>

        <div className="grid md:grid-cols-1 gap-4 mb-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Community Name</label>
            <input type="text" value={communityName} onChange={e => setCommunityName(e.target.value)} placeholder="e.g., PostCraft Community, Design Leaders Hub" className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-3 text-zinc-100" />
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {([
            { label: 'Community Type', value: communityType, setter: setCommunityType as (v: string) => void, options: communityTypes as readonly string[] },
            { label: 'Platform', value: platform, setter: setPlatform as (v: string) => void, options: platforms as readonly string[] },
            { label: 'Size', value: size, setter: setSize as (v: string) => void, options: sizes as readonly string[] },
            { label: 'Tone', value: tone, setter: setTone as (v: string) => void, options: tones as readonly string[] },
            { label: 'Industry', value: industry, setter: setIndustry as (v: string) => void, options: industries as readonly string[] },
            { label: 'Moderation Level', value: modLevel, setter: setModLevel as (v: string) => void, options: moderationLevels as readonly string[] },
          ] as const).map(({ label, value, setter, options }) => (
            <div key={label}>
              <label className="block text-sm text-zinc-400 mb-1">{label}</label>
              <select value={value} onChange={e => setter(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100">
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
        <button onClick={handleGenerate} className="w-full md:w-auto bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded font-semibold hover:opacity-90 transition mb-8">Generate Community Guidelines</button>

        {result && (
          <div className="space-y-8">
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 text-center">
              <div className="text-5xl font-bold mb-2" style={{ color: scoreColor(result.healthScore) }}>{result.healthScore}</div>
              <div className="text-zinc-400">Community Health Score</div>
              <div className="mt-3 max-w-md mx-auto w-full bg-zinc-800 rounded-full h-3">
                <div className="h-3 rounded-full" style={{ width: `${result.healthScore}%`, background: scoreColor(result.healthScore) }} />
              </div>
            </div>

            {/* Welcome Message */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3">Welcome Message Template</h3>
              <div className="bg-zinc-800/60 rounded-lg p-4 border border-zinc-700/50 whitespace-pre-line text-sm text-zinc-300">{result.welcomeMessage}</div>
            </div>

            {/* Guideline Sections */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Community Rules ({result.sections.length} Sections)</h3>
              <div className="space-y-6">
                {result.sections.map((s, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-5 border border-zinc-700/50">
                    <h4 className="text-lg font-semibold text-zinc-200 mb-3">{i + 1}. {s.title}</h4>
                    <div className="space-y-2 mb-4">
                      {s.rules.map((r, j) => <div key={j} className="text-sm text-zinc-300 flex gap-2"><span className="text-violet-400 shrink-0">•</span>{r}</div>)}
                    </div>
                    <div className="grid md:grid-cols-2 gap-3 mb-3">
                      <div className="bg-emerald-400/5 border border-emerald-400/20 rounded p-3">
                        <div className="text-xs text-emerald-400 font-semibold mb-1">GOOD EXAMPLE</div>
                        <div className="text-sm text-zinc-300 italic">{s.examples.good}</div>
                      </div>
                      <div className="bg-red-400/5 border border-red-400/20 rounded p-3">
                        <div className="text-xs text-red-400 font-semibold mb-1">BAD EXAMPLE</div>
                        <div className="text-sm text-zinc-300 italic">{s.examples.bad}</div>
                      </div>
                    </div>
                    <div className="text-xs text-yellow-400/70"><span className="text-zinc-500">Consequence:</span> {s.consequence}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Moderation Workflows */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Moderation Workflows</h3>
              <div className="space-y-3">
                {result.moderation.map((m, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="font-semibold text-zinc-200 mb-2">{m.trigger}</div>
                    <div className="grid md:grid-cols-2 gap-2 text-xs">
                      <div><span className="text-zinc-500">Action:</span> <span className="text-zinc-300">{m.action}</span></div>
                      <div><span className="text-zinc-500">Escalation:</span> <span className="text-yellow-400/70">{m.escalation}</span></div>
                      <div><span className="text-zinc-500">Timeframe:</span> <span className="text-emerald-400/70">{m.timeframe}</span></div>
                      <div><span className="text-zinc-500">Documentation:</span> <span className="text-zinc-400">{m.documentation}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Onboarding */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Onboarding Sequence</h3>
              <div className="space-y-3">
                {result.onboarding.map((o, i) => (
                  <div key={i} className="flex gap-4 items-start bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-violet-400/10 text-violet-400 font-bold text-sm">{i + 1}</div>
                    <div>
                      <div className="font-semibold text-zinc-200">{o.step}</div>
                      <div className="text-sm text-zinc-400 mb-1">{o.content}</div>
                      <div className="text-xs"><span className="text-zinc-500">Channel:</span> <span className="text-violet-400">{o.channel}</span> · <span className="text-zinc-500">Timing:</span> <span className="text-emerald-400/70">{o.timing}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Roles */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Role Definitions</h3>
              <div className="space-y-3">
                {result.roles.map((r, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-zinc-200">{r.role}</span>
                      <span className="text-xs px-2 py-1 rounded bg-violet-400/10 text-violet-400 border border-violet-400/30">{r.badge}</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-2 text-xs">
                      <div><span className="text-zinc-500">Permissions:</span> <span className="text-zinc-300">{r.permissions}</span></div>
                      <div><span className="text-zinc-500">Responsibilities:</span> <span className="text-zinc-300">{r.responsibilities}</span></div>
                      <div className="md:col-span-2"><span className="text-zinc-500">Selection:</span> <span className="text-emerald-400/70">{r.selection}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Conflict Protocols */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Conflict Resolution Protocols</h3>
              <div className="space-y-3">
                {result.conflicts.map((c, i) => (
                  <div key={i} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700/50">
                    <div className="font-semibold text-zinc-200 mb-2">{c.scenario}</div>
                    <div className="space-y-1 text-xs">
                      <div><span className="text-zinc-500">Response:</span> <span className="text-zinc-300">{c.response}</span></div>
                      <div><span className="text-zinc-500">Escalation:</span> <span className="text-yellow-400/70">{c.escalation}</span></div>
                      <div><span className="text-zinc-500">Prevention:</span> <span className="text-emerald-400/70">{c.prevention}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Metrics + Toxic Behaviors */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-emerald-400">Health Metrics to Track</h3>
                <div className="space-y-2">{result.metricsToTrack.map((m, i) => <div key={i} className="text-sm text-zinc-400 flex gap-2"><span className="text-emerald-400 shrink-0">→</span>{m}</div>)}</div>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-red-400">Toxic Behaviors to Watch For</h3>
                <div className="space-y-2">{result.toxicBehaviors.map((t, i) => <div key={i} className="text-sm text-zinc-400 flex gap-2"><span className="text-red-400 shrink-0">⚠</span>{t}</div>)}</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">Build a Thriving Community That Scales</h3>
              <p className="text-zinc-400 mb-4">Use PostCraft AI to create professional community guidelines. Pair with <a href="/social-policy" className="text-violet-400 underline">Social Policy</a>, <a href="/crisis-management" className="text-violet-400 underline">Crisis Management</a>, and <a href="/community-manager" className="text-violet-400 underline">Community Manager</a>.</p>
              <a href="/pricing" className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">Get PostCraft Pro</a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
