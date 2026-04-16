import type { Metadata } from 'next';
import PlatformGenerator from '@/components/PlatformGenerator';

export const metadata: Metadata = {
  title: 'AI LinkedIn Post Generator — PostCraft AI | Thought Leadership in Seconds',
  description: 'Generate thought-leadership LinkedIn posts that drive impressions, comments & inbound leads. 8 tones, 25+ languages. Free, no signup.',
};

const seoContent = (
  <>
    <p>LinkedIn is the #1 platform for B2B marketing, personal branding, and thought leadership. But writing posts that actually get engagement is time-consuming. The algorithm rewards consistent, high-quality posting — and most professionals struggle to post more than once a week.</p>
    <p>PostCraft AI generates LinkedIn posts that follow proven engagement formulas: hook-first structure, storytelling arcs, value-driven content, and strategic CTAs. Our AI has been trained on patterns from the top 1% of LinkedIn creators.</p>

    <h3 className="text-lg font-semibold text-zinc-200 pt-4">LinkedIn Post Formulas That Work</h3>
    <ul className="list-disc pl-5 space-y-2">
      <li><strong>The Hot Take:</strong> Start with a bold, contrarian opinion. &ldquo;Unpopular opinion: cold emails still work better than LinkedIn DMs.&rdquo;</li>
      <li><strong>The Lesson Learned:</strong> Share a failure or unexpected insight. Vulnerability drives 3x more comments.</li>
      <li><strong>The List Post:</strong> &ldquo;5 things I wish I knew before scaling to 50 employees.&rdquo; Easy to read, high save rate.</li>
      <li><strong>The Before/After:</strong> Show transformation. Revenue, skills, team size — any measurable growth.</li>
      <li><strong>The Question Post:</strong> End with a question to drive comments. LinkedIn boosts posts with high comment velocity.</li>
    </ul>

    <h3 className="text-lg font-semibold text-zinc-200 pt-4">LinkedIn Algorithm Tips (2026)</h3>
    <ul className="list-disc pl-5 space-y-2">
      <li>Posts with 1,200-1,500 characters get the most engagement (not too short, not too long).</li>
      <li>First 2 lines are critical — LinkedIn truncates after ~210 characters on mobile.</li>
      <li>Carousel posts get 3x the reach of text-only posts.</li>
      <li>Posting between 7-9 AM local time on Tue/Wed/Thu gets maximum visibility.</li>
      <li>Respond to every comment within 1 hour — LinkedIn rewards active engagement.</li>
    </ul>
  </>
);

export default function LinkedInPostsPage() {
  return (
    <PlatformGenerator config={{
      platform: 'LinkedIn',
      title: 'AI',
      gradientWord: 'LinkedIn Post',
      subtitle: 'Generate thought-leadership LinkedIn posts that drive impressions, comments & inbound leads — in 25+ languages.',
      charNote: 'Free. No signup required. 3,000 character limit optimized.',
      placeholder: 'e.g. Lessons from scaling our startup to $1M ARR, hiring remote engineers...',
      defaultTone: 'professional',
      loadingText: 'Crafting your LinkedIn posts...',
      buttonText: 'Generate 5 LinkedIn Posts',
      resultTitle: 'Your LinkedIn Posts',
      seoTitle: 'Why Use an AI LinkedIn Post Generator?',
      seoContent,
      crossLinks: [
        { href: '/instagram-captions', label: 'Instagram Captions' },
        { href: '/twitter-posts', label: 'Twitter/X Posts' },
        { href: '/tiktok-scripts', label: 'TikTok Scripts' },
        { href: '/campaign', label: 'Campaign Mode' },
        { href: '/pricing', label: 'See Pricing' },
      ],
    }} />
  );
}
