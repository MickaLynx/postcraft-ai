'use client';
import { useState } from 'react';

const genres = ['Business', 'Tech', 'True Crime', 'Health & Wellness', 'Comedy', 'Education', 'News', 'Finance', 'Self-Improvement', 'Marketing', 'Science', 'Culture'] as const;
const episodeTypes = ['Interview', 'Solo Deep Dive', 'Panel Discussion', 'News Commentary', 'Story/Narrative', 'Tutorial/How-To'] as const;
const platforms = ['Instagram', 'TikTok', 'Twitter/X', 'LinkedIn', 'YouTube Shorts', 'Facebook', 'Threads', 'Reddit'] as const;
const durations = ['15-30 min', '30-60 min', '60-90 min', '90+ min'] as const;
const goals = ['Grow Listeners', 'Promote Guest', 'Drive Downloads', 'Build Community', 'Monetize/Sponsors', 'Cross-Platform Growth'] as const;
const tones = ['Professional', 'Casual & Fun', 'Hype & Energy', 'Thoughtful', 'Provocative', 'Educational'] as const;

interface EpisodeTeaser {
  platform: string;
  hook: string;
  body: string;
  cta: string;
  hashtags: string[];
  bestTime: string;
}

interface AudiogramSpec {
  format: string;
  duration: string;
  visualStyle: string;
  quoteOverlay: string;
  captionTip: string;
}

interface ShowNotesSection {
  title: string;
  content: string;
}

interface GuestPromo {
  draftDm: string;
  socialTag: string;
  assetToProvide: string;
  crossPromoIdea: string;
}

interface GrowthHack {
  hack: string;
  effort: 'Low' | 'Medium' | 'High';
  impact: string;
  howTo: string;
}

interface RepurposeIdea {
  format: string;
  platform: string;
  description: string;
  timeToCreate: string;
}

interface MonetizationTip {
  method: string;
  threshold: string;
  revenueRange: string;
  nextStep: string;
}

interface PromoResult {
  teasers: EpisodeTeaser[];
  audiograms: AudiogramSpec[];
  showNotes: ShowNotesSection[];
  guestPromo: GuestPromo;
  growthHacks: GrowthHack[];
  repurpose: RepurposeIdea[];
  monetization: MonetizationTip[];
  launchChecklist: string[];
}

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function pick<T>(arr: readonly T[] | T[], seed: number, idx: number = 0): T {
  return arr[(seed + idx) % arr.length];
}

function generatePromo(genre: string, episodeType: string, platform: string, duration: string, goal: string, tone: string): PromoResult {
  const seed = hash(`${genre}-${episodeType}-${platform}-${duration}-${goal}-${tone}`);

  const teasers: EpisodeTeaser[] = [
    {
      platform: 'Instagram',
      hook: `New episode alert 🎙️ — ${episodeType === 'Interview' ? 'My guest dropped a truth bomb' : 'I went deep on something nobody talks about'} in ${genre.toLowerCase()}.`,
      body: `In this ${duration} episode, ${episodeType === 'Interview' ? 'we cover the real story behind' : 'I break down'} what's actually happening in ${genre.toLowerCase()} right now. ${seed % 2 === 0 ? 'The insight at the 22-minute mark changed my perspective entirely.' : 'Fair warning: this one might change how you think about everything.'}`,
      cta: 'Link in bio to listen now — or save this for your commute 🎧',
      hashtags: [`#${genre.toLowerCase().replace(/\s+/g, '')}podcast`, '#newpodcastepisode', '#podcastlife', `#${genre.toLowerCase().replace(/\s+/g, '')}`, '#mustlisten'],
      bestTime: 'Wed or Thu, 11 AM-1 PM',
    },
    {
      platform: 'Twitter/X',
      hook: `Just dropped a ${duration} ${episodeType.toLowerCase()} on ${genre.toLowerCase()} that I've been working on for weeks.`,
      body: `${3 + seed % 3} things I learned:\n\n1. ${pick(['The conventional wisdom is wrong about', 'Nobody is talking about', 'The hidden opportunity in'], seed, 0)} [topic]\n2. ${pick(['The framework that actually works', 'Why most people fail at this', 'The counterintuitive approach to'], seed, 1)} [topic]\n3. ${pick(['The one change that made all the difference', 'What the data actually shows', 'The uncomfortable truth about'], seed, 2)} [topic]`,
      cta: 'Full episode: [link]\n\nRT if this resonates 🔁',
      hashtags: [`#${genre.toLowerCase().replace(/\s+/g, '')}`, '#podcast', '#thread'],
      bestTime: 'Tue-Thu, 8-10 AM or 5-7 PM',
    },
    {
      platform: 'LinkedIn',
      hook: `I sat down for ${duration} to ${episodeType === 'Interview' ? 'interview someone who completely changed my thinking on' : 'explore a topic that most professionals overlook in'} ${genre.toLowerCase()}.`,
      body: `Here's what surprised me most:\n\n→ ${pick(['The industry is moving faster than anyone realizes', 'Most professionals are optimizing for the wrong metric', 'There\'s a massive gap between what experts say and what actually works'], seed, 3)}\n\nThis episode is for anyone who wants to stay ahead in ${genre.toLowerCase()} — whether you're a founder, practitioner, or just intellectually curious.`,
      cta: 'Listen on [Spotify/Apple] — link in comments 👇',
      hashtags: [`#${genre.toLowerCase().replace(/\s+/g, '')}`, '#podcastrecommendation', '#professionaldevelopment'],
      bestTime: 'Tue-Thu, 7-9 AM',
    },
    {
      platform: 'TikTok',
      hook: `POV: You're listening to my latest ${genre.toLowerCase()} podcast and the guest says THIS 😳`,
      body: `[Clip the most surprising or controversial 15-30 second moment from the episode. Add captions. Use trending audio underneath at low volume if applicable.]`,
      cta: `Full episode link in bio 🎙️ #${genre.toLowerCase().replace(/\s+/g, '')}podcast`,
      hashtags: ['#podcastclips', '#podtok', `#${genre.toLowerCase().replace(/\s+/g, '')}tok`, '#mustlisten', '#newpodcast'],
      bestTime: 'Mon-Fri, 6-9 AM or 7-11 PM',
    },
    {
      platform: 'YouTube Shorts',
      hook: `"${pick([`This changes everything about ${genre.toLowerCase()}`, `Nobody told me this about ${genre.toLowerCase()}`, `The ${genre.toLowerCase()} industry doesn't want you to know this`], seed, 4)}"`,
      body: `[Extract a 30-60 second clip with the highest emotional moment. Add bold captions, zoom cuts, and a compelling thumbnail with the quote. Keep the pacing tight.]`,
      cta: `Full episode on the channel — subscribe for more ${genre.toLowerCase()} insights 🔔`,
      hashtags: ['#podcast', '#shorts', `#${genre.toLowerCase().replace(/\s+/g, '')}`, '#clips'],
      bestTime: 'Daily, 2-4 PM or 7-9 PM',
    },
  ];

  const audiograms: AudiogramSpec[] = [
    { format: 'Square (1:1) — Feed Post', duration: '30-60s', visualStyle: `Waveform animation with ${genre.toLowerCase()}-themed background gradient. Speaker photo centered.`, quoteOverlay: `"[Most impactful quote from the episode]" — [Guest/Host Name]`, captionTip: 'Use bold, large captions (3-5 words per line). White text with dark shadow for contrast.' },
    { format: 'Vertical (9:16) — Reels/TikTok/Shorts', duration: '15-30s', visualStyle: `Full-screen waveform with dynamic captions. Add subtle ${genre.toLowerCase()}-related B-roll if available.`, quoteOverlay: `[Pull a controversial or surprising statement — shorter is better for vertical]`, captionTip: 'Animate captions word-by-word or phrase-by-phrase. Use yellow or green highlight on key words.' },
    { format: 'Landscape (16:9) — YouTube/LinkedIn', duration: '60-90s', visualStyle: `Split screen: speaker photo left, waveform + captions right. Clean, professional layout.`, quoteOverlay: `[Use a longer, more nuanced quote — LinkedIn/YouTube audiences prefer depth]`, captionTip: 'Smaller font, full sentences. Include speaker name and title below the quote.' },
    { format: 'Story (9:16) — Instagram/Facebook Stories', duration: '15s', visualStyle: `Bold text overlay on branded background. "New Episode" badge at top. Swipe-up CTA.`, quoteOverlay: `[Teaser question: "What if everything you knew about ${genre.toLowerCase()} was wrong?"]`, captionTip: 'Keep text minimal — 10 words max. Let the audio and visuals do the work.' },
  ];

  const showNotes: ShowNotesSection[] = [
    { title: 'Episode Summary', content: `In this ${duration} ${episodeType.toLowerCase()}, ${episodeType === 'Interview' ? 'we sit down with [Guest Name] to explore' : 'we dive deep into'} the latest developments in ${genre.toLowerCase()}. ${pick(['From emerging trends to actionable strategies', 'Covering both the theory and practical application', 'With real-world examples and data-backed insights'], seed, 5)}, this episode is packed with value for anyone in the ${genre.toLowerCase()} space.` },
    { title: 'Key Timestamps', content: `[00:00] Intro & context\n[${2 + seed % 4}:${10 + seed % 50}] ${pick(['The big shift happening right now', 'Why the old playbook doesn\'t work', 'Setting the stage'], seed, 6)}\n[${12 + seed % 8}:${seed % 60}] ${pick(['The framework that changes everything', 'Deep dive: strategies that actually work', 'Guest\'s biggest lesson learned'], seed, 7)}\n[${25 + seed % 15}:${seed % 60}] ${pick(['Rapid-fire Q&A', 'Actionable takeaways', 'Lightning round + predictions'], seed, 8)}\n[${35 + seed % 20}:${seed % 60}] ${pick(['Final thoughts + resources', 'Where to go from here', 'Closing wisdom'], seed, 9)}` },
    { title: 'Key Takeaways', content: `1. ${pick(['The market is shifting toward', 'The most successful practitioners focus on', 'The data suggests that'], seed, 10)} [insight 1]\n2. ${pick(['The counterintuitive approach is to', 'Most people overlook', 'The framework for success involves'], seed, 11)} [insight 2]\n3. ${pick(['The one thing everyone should do this week', 'The resource that changed everything', 'The prediction for the next 12 months'], seed, 12)} [insight 3]` },
    { title: 'Resources Mentioned', content: `• [Book/Tool/Resource 1] — [1-line description]\n• [Book/Tool/Resource 2] — [1-line description]\n• [Guest's Website/Project] — [URL]\n• PostCraft AI — Generate your podcast promotion assets → postcraft.ai` },
    { title: 'SEO Description', content: `${genre} podcast episode: ${episodeType === 'Interview' ? '[Guest Name] shares' : 'A deep dive into'} ${pick(['the strategies behind', 'the future of', 'actionable insights for'], seed, 13)} ${genre.toLowerCase()} in 2026. ${pick(['Learn practical frameworks', 'Discover surprising data', 'Get actionable tips'], seed, 14)} in this ${duration} ${episodeType.toLowerCase()}. Subscribe for new episodes every week.` },
  ];

  const guestPromo: GuestPromo = {
    draftDm: `Hey [Guest Name]! 🎙️\n\nOur episode just went live! Here's the link: [LINK]\n\nI've also created some promo assets for you:\n• Audiogram clip (attached)\n• Quote graphic (attached)\n• Suggested caption (below)\n\nFeel free to share on your channels whenever works for you. I'll be promoting it all week on ${platform} and tagging you. Thanks again for an incredible conversation!\n\nBest,\n[Your Name]`,
    socialTag: `@[GuestHandle] on ${platform} — tag them in ALL promotional posts. ${seed % 2 === 0 ? 'Their repost typically 3-5x your reach.' : 'Guests who reshare drive 40% of new listeners.'}`,
    assetToProvide: `1. Square audiogram (1:1) with their best quote\n2. Quote graphic optimized for ${platform}\n3. Pre-written caption they can copy/paste\n4. Episode link with UTM parameters to track their shares`,
    crossPromoIdea: `Propose a "content swap": they share the episode with their audience, you promote their latest [project/course/book] to yours. ${episodeType === 'Interview' ? 'Ask if they\'d like to do a LinkedIn article together summarizing key insights.' : 'Offer to create a highlight reel they can use on their channels.'}`,
  };

  const growthHacks: GrowthHack[] = [
    { hack: 'Clip-First Strategy', effort: 'Medium', impact: '+30-50% new listeners/episode', howTo: `Create 3-5 short clips (15-60s) from each episode BEFORE publishing. Post them across ${platform}, TikTok, and YouTube Shorts over the week. The best clip becomes your teaser, posted 24h before the full episode drops.` },
    { hack: 'Podcast SEO Optimization', effort: 'Low', impact: '+20-40% organic discovery', howTo: `Write 300+ word show notes with target keywords ("${genre.toLowerCase()} podcast", "${genre.toLowerCase()} tips", etc.). Include timestamps, guest names, and topic keywords. Apple Podcasts and Spotify index this for search.` },
    { hack: 'Strategic Guest Selection', effort: 'High', impact: '+100-500 listeners/guest', howTo: `Target guests with engaged audiences of 5K-50K followers in ${genre.toLowerCase()} adjacent niches. Micro-influencers share more actively than macro ones. Build a guest wish list of 20 names and pitch 5 per month.` },
    { hack: 'Episode Title A/B Testing', effort: 'Low', impact: '+15-25% click-through', howTo: `Test two title formats: benefit-driven ("How to X") vs. curiosity-driven ("Why Nobody Talks About X"). Track downloads for 48 hours. Use the ${goal === 'Grow Listeners' ? 'curiosity format — it drives 20% more clicks from new listeners' : 'benefit format — it converts better for returning listeners'}.` },
    { hack: 'Community-Driven Content', effort: 'Medium', impact: '+25% listener retention', howTo: `Create a private community (Discord, Slack, or Circle) for dedicated listeners. Crowdsource episode topics and questions. Feature listener stories on the show. Engaged communities have 60% higher retention than passive audiences.` },
    { hack: 'Cross-Podcast Appearances', effort: 'Medium', impact: '+50-200 listeners/appearance', howTo: `Be a guest on ${3 + seed % 3} podcasts per month in adjacent ${genre.toLowerCase()} niches. Prepare a compelling 30-second CTA for your show. Track with unique landing pages or UTM links per appearance.` },
  ];

  const repurpose: RepurposeIdea[] = [
    { format: 'Blog Post', platform: 'Website/SEO', description: `Convert show notes into a 1,500-2,000 word blog post. Add context, visuals, and internal links. Targets long-tail ${genre.toLowerCase()} keywords.`, timeToCreate: '45-60 min' },
    { format: 'Twitter/X Thread', platform: 'Twitter/X', description: 'Extract 5-8 key insights into a numbered thread. Each tweet = one standalone insight. Pin the thread and link to full episode.', timeToCreate: '15-20 min' },
    { format: 'LinkedIn Article', platform: 'LinkedIn', description: `Write a professional deep-dive based on the episode's main theme. Tag the guest. LinkedIn articles get 5-10x more reach than regular posts for ${genre.toLowerCase()} topics.`, timeToCreate: '30-45 min' },
    { format: 'Instagram Carousel', platform: 'Instagram', description: 'Create a 7-10 slide carousel with key takeaways. Slide 1 = hook, slides 2-9 = insights with visuals, slide 10 = CTA to listen.', timeToCreate: '20-30 min' },
    { format: 'Newsletter Section', platform: 'Email', description: `Feature the episode in your weekly newsletter with a personal commentary on what surprised you most. Include a one-click play link.`, timeToCreate: '10-15 min' },
    { format: 'YouTube Full Episode', platform: 'YouTube', description: `Upload the full episode with a compelling thumbnail, timestamps, and optimized title. YouTube is the #1 podcast discovery platform for ${genre.toLowerCase()} in 2026.`, timeToCreate: '30-45 min' },
  ];

  const monetization: MonetizationTip[] = [
    { method: 'Mid-Roll Sponsorships', threshold: '1,000+ downloads/episode', revenueRange: '$18-50 CPM', nextStep: `Join a podcast ad network (Podcorn, AdvertiseCast) or pitch ${genre.toLowerCase()} brands directly with your download stats and audience demographics.` },
    { method: 'Premium Episodes', threshold: '500+ regular listeners', revenueRange: '$5-15/month per subscriber', nextStep: 'Launch a paid tier on Apple Podcasts Subscriptions or Supercast. Offer bonus episodes, early access, or ad-free listening.' },
    { method: 'Affiliate Marketing', threshold: 'Any size', revenueRange: '$50-500/month', nextStep: `Recommend ${genre.toLowerCase()} tools, books, and courses with affiliate links. Mention them naturally in episodes and include links in show notes.` },
    { method: 'Live Events / Workshops', threshold: '2,000+ listeners', revenueRange: '$500-5,000/event', nextStep: `Host a virtual ${genre.toLowerCase()} workshop or live podcast recording. Charge $20-50/ticket. Your podcast audience is pre-qualified and engaged.` },
  ];

  const launchChecklist = [
    `Record and edit the ${episodeType.toLowerCase()} episode (${duration})`,
    'Write SEO-optimized show notes with timestamps and key takeaways',
    'Create 3-5 audiogram clips (square + vertical formats)',
    'Design episode artwork / thumbnail with compelling quote',
    `Write ${platform} teaser post — schedule for 24h before launch`,
    'Prepare guest promo pack (DM, assets, suggested caption)',
    'Schedule launch day posts across all social platforms',
    'Submit to podcast directories (Apple, Spotify, Google, Amazon)',
    'Send newsletter announcement to email list',
    'Engage with comments and shares for 48h post-launch',
    'Track downloads, social engagement, and new subscriber sources',
    'Repurpose into blog post, thread, and carousel within 7 days',
  ];

  return { teasers, audiograms, showNotes, guestPromo, growthHacks, repurpose, monetization, launchChecklist };
}

export default function PodcastPromoPage() {
  const [genre, setGenre] = useState<string>(genres[0]);
  const [episodeType, setEpisodeType] = useState<string>(episodeTypes[0]);
  const [platform, setPlatform] = useState<string>(platforms[0]);
  const [duration, setDuration] = useState<string>(durations[1]);
  const [goal, setGoal] = useState<string>(goals[0]);
  const [tone, setTone] = useState<string>(tones[0]);
  const [result, setResult] = useState<PromoResult | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Podcast Promo Generator</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Generate complete podcast promotion kits with social teasers, audiogram specs, show notes, guest promo packs, growth hacks, repurposing ideas, and monetization strategies.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Podcast Genre</label>
              <select value={genre} onChange={e => setGenre(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                {genres.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Episode Type</label>
              <select value={episodeType} onChange={e => setEpisodeType(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                {episodeTypes.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Primary Platform</label>
              <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                {platforms.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Episode Duration</label>
              <select value={duration} onChange={e => setDuration(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                {durations.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Primary Goal</label>
              <select value={goal} onChange={e => setGoal(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                {goals.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tone</label>
              <select value={tone} onChange={e => setTone(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                {tones.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => setResult(generatePromo(genre, episodeType, platform, duration, goal, tone))} className="w-full py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl font-semibold text-lg hover:from-orange-700 hover:to-amber-700 transition-all shadow-md">
            Generate Promo Kit
          </button>
        </div>

        {result && (
          <div className="space-y-8">
            {/* Social Teasers */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📱 Social Media Teasers</h2>
              <div className="space-y-4">
                {result.teasers.map((t, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-gray-900">{t.platform}</h3>
                      <span className="text-xs px-3 py-1 bg-orange-100 text-orange-700 rounded-full font-medium">Best: {t.bestTime}</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p className="font-semibold text-orange-700">{t.hook}</p>
                      <p className="text-gray-600 whitespace-pre-line">{t.body}</p>
                      <p className="font-medium text-gray-900">{t.cta}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {t.hashtags.map((h, j) => <span key={j} className="text-xs text-orange-600">{h}</span>)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Audiogram Specs */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🎵 Audiogram Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.audiograms.map((a, i) => (
                  <div key={i} className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                    <h3 className="font-bold text-gray-900 mb-2">{a.format}</h3>
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-600"><span className="font-semibold text-amber-700">Duration:</span> {a.duration}</p>
                      <p className="text-gray-600"><span className="font-semibold text-amber-700">Visual:</span> {a.visualStyle}</p>
                      <p className="text-gray-600"><span className="font-semibold text-amber-700">Quote:</span> {a.quoteOverlay}</p>
                      <p className="text-gray-600 italic"><span className="font-semibold text-amber-700 not-italic">Caption tip:</span> {a.captionTip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Show Notes */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📝 Show Notes Template</h2>
              <div className="space-y-4">
                {result.showNotes.map((s, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-xl">
                    <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                    <pre className="text-sm text-gray-600 whitespace-pre-wrap font-sans leading-relaxed">{s.content}</pre>
                  </div>
                ))}
              </div>
            </div>

            {/* Guest Promo Pack */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🤝 Guest Promo Pack</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                  <h3 className="font-bold text-gray-900 mb-2">Draft DM to Guest</h3>
                  <pre className="text-sm text-gray-600 whitespace-pre-wrap font-sans leading-relaxed">{result.guestPromo.draftDm}</pre>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h3 className="font-bold text-gray-900 mb-2">Social Tagging</h3>
                    <p className="text-sm text-gray-600">{result.guestPromo.socialTag}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h3 className="font-bold text-gray-900 mb-2">Assets to Provide</h3>
                    <pre className="text-sm text-gray-600 whitespace-pre-wrap font-sans">{result.guestPromo.assetToProvide}</pre>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h3 className="font-bold text-gray-900 mb-2">Cross-Promo Idea</h3>
                    <p className="text-sm text-gray-600">{result.guestPromo.crossPromoIdea}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Growth Hacks */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🚀 Podcast Growth Hacks</h2>
              <div className="space-y-4">
                {result.growthHacks.map((g, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-900">{g.hack}</h3>
                      <div className="flex gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${g.effort === 'Low' ? 'bg-green-100 text-green-700' : g.effort === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{g.effort} effort</span>
                        <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-full font-semibold">{g.impact}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{g.howTo}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Repurpose Ideas */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">♻️ Repurpose Into</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {result.repurpose.map((r, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-xl">
                    <h3 className="font-bold text-gray-900 mb-1">{r.format}</h3>
                    <span className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-full font-medium">{r.platform}</span>
                    <p className="text-sm text-gray-600 mt-2">{r.description}</p>
                    <p className="text-xs text-gray-500 mt-2">Time: {r.timeToCreate}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Monetization */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">💰 Monetization</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.monetization.map((m, i) => (
                  <div key={i} className="p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{m.method}</h3>
                    <div className="text-xl font-bold text-orange-700 mb-2">{m.revenueRange}</div>
                    <span className="text-xs px-2 py-1 bg-gray-200 text-gray-600 rounded-full">{m.threshold}</span>
                    <p className="text-sm text-gray-600 mt-3">{m.nextStep}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Launch Checklist */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">✅ Episode Launch Checklist</h2>
              <div className="space-y-2">
                {result.launchChecklist.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-orange-300 flex items-center justify-center text-xs text-orange-600 font-bold">{i + 1}</span>
                    <p className="text-sm text-gray-700">{item}</p>
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
