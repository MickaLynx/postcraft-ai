import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Use Cases — PostCraft AI | Social Media Content for Every Industry',
  description: 'Discover how marketers, creators, agencies, and e-commerce brands use PostCraft AI to generate engaging social media posts across 5 platforms.',
};

const useCases = [
  {
    title: 'E-commerce & Product Launches',
    description: 'Generate product announcements, flash sale posts, and customer testimonials across all platforms. Optimize each post for the platform\'s format and audience.',
    platforms: ['Instagram', 'Facebook', 'TikTok'],
    example: 'Launch your new product line with 50 platform-optimized posts in under 5 minutes.',
  },
  {
    title: 'SaaS & B2B Marketing',
    description: 'Create thought leadership posts for LinkedIn, feature announcements for Twitter/X, and educational content that positions your brand as an authority.',
    platforms: ['LinkedIn', 'Twitter/X'],
    example: 'Turn a product update into 10 LinkedIn posts with different angles and tones.',
  },
  {
    title: 'Content Creators & Influencers',
    description: 'Never run out of content ideas. Generate viral hooks, storytelling posts, and engagement-driving captions tailored to your niche and audience.',
    platforms: ['TikTok', 'Instagram', 'Twitter/X'],
    example: 'Batch-create a week of content in one sitting with consistent brand voice.',
  },
  {
    title: 'Agencies & Freelancers',
    description: 'Manage multiple client voices efficiently. Generate draft posts for review, A/B test messaging, and maintain consistent posting schedules across accounts.',
    platforms: ['All Platforms'],
    example: 'Handle 10 client accounts with the productivity of a full content team.',
  },
  {
    title: 'Personal Branding',
    description: 'Build your professional presence on LinkedIn and Twitter/X. Share insights, wins, and lessons learned with posts that sound like you, not a robot.',
    platforms: ['LinkedIn', 'Twitter/X'],
    example: 'Go from posting once a month to daily without the mental overhead.',
  },
  {
    title: 'Event & Conference Marketing',
    description: 'Generate pre-event hype, live coverage posts, and post-event recap content. Create countdowns, speaker highlights, and attendee engagement posts.',
    platforms: ['Twitter/X', 'LinkedIn', 'Instagram'],
    example: 'Create a full 2-week event promotion campaign in 15 minutes.',
  },
];

export default function UseCasesPage() {
  return (
    <main className="min-h-screen px-6 py-20 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-3">Built for Every Content Need</h1>
      <p className="text-zinc-400 text-center mb-12 max-w-2xl mx-auto">
        From solo creators to enterprise teams, PostCraft AI adapts to your industry and goals.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {useCases.map(uc => (
          <div key={uc.title} className="glass rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-2">{uc.title}</h2>
            <p className="text-sm text-zinc-400 mb-4">{uc.description}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {uc.platforms.map(p => (
                <span key={p} className="text-xs bg-pink-600/20 text-pink-400 px-2 py-0.5 rounded">{p}</span>
              ))}
            </div>
            <p className="text-xs text-zinc-500 italic">{uc.example}</p>
          </div>
        ))}
      </div>

      {/* Platform Links */}
      <div className="mt-12">
        <h2 className="text-lg font-bold text-center mb-4">Try Platform-Specific Generators</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
          <a href="/instagram-captions" className="glass rounded-xl p-4 text-center hover:border-pink-500/30 transition">
            <p className="font-semibold text-sm">Instagram</p>
          </a>
          <a href="/linkedin-posts" className="glass rounded-xl p-4 text-center hover:border-pink-500/30 transition">
            <p className="font-semibold text-sm">LinkedIn</p>
          </a>
          <a href="/twitter-posts" className="glass rounded-xl p-4 text-center hover:border-pink-500/30 transition">
            <p className="font-semibold text-sm">Twitter/X</p>
          </a>
          <a href="/tiktok-scripts" className="glass rounded-xl p-4 text-center hover:border-pink-500/30 transition">
            <p className="font-semibold text-sm">TikTok</p>
          </a>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Content?</h2>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="/" className="inline-block px-8 py-3 btn-primary rounded-xl font-semibold text-white">
            Try PostCraft AI Free
          </a>
          <a href="/pricing" className="inline-block px-8 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl font-semibold text-zinc-200 transition">
            See Pricing
          </a>
        </div>
      </div>
    </main>
  );
}
