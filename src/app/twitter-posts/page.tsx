import type { Metadata } from 'next';
import PlatformGenerator from '@/components/PlatformGenerator';

export const metadata: Metadata = {
  title: 'AI Twitter/X Post Generator — PostCraft AI | Viral Tweets in Seconds',
  description: 'Generate viral tweets and threads in seconds. Optimized for retweets, likes & follows. 8 tones, 25+ languages. Free, no signup.',
};

const seoContent = (
  <>
    <p>Twitter/X rewards concise, punchy content. With a 280-character limit, every word counts. The best tweets combine wit, insight, and timing — and most people overthink them.</p>
    <p>PostCraft AI generates tweets that follow viral patterns: strong hooks, contrarian takes, thread starters, and engagement bait. Write a week of Twitter content in 60 seconds.</p>

    <h3 className="text-lg font-semibold text-zinc-200 pt-4">Tweet Formulas That Go Viral</h3>
    <ul className="list-disc pl-5 space-y-2">
      <li><strong>The Bold Claim:</strong> &ldquo;99% of founders waste 5 hours/week on social media. Here&apos;s how to do it in 20 minutes.&rdquo;</li>
      <li><strong>The Thread Hook:</strong> &ldquo;I spent 6 months studying the top 100 Twitter/X accounts. Here&apos;s what they all have in common (thread):&rdquo;</li>
      <li><strong>The Ratio Bait:</strong> Share a hot take that forces people to agree or disagree publicly.</li>
      <li><strong>The Value Drop:</strong> Give away one actionable tip. Generosity builds followers.</li>
      <li><strong>The Before/After:</strong> Show your growth in one tweet. Screenshots of metrics work best.</li>
    </ul>

    <h3 className="text-lg font-semibold text-zinc-200 pt-4">Twitter/X Algorithm Tips (2026)</h3>
    <ul className="list-disc pl-5 space-y-2">
      <li>Tweets under 100 characters get 17% more engagement than longer ones.</li>
      <li>Posting 3-5 times per day is optimal. Quality over quantity, but consistency matters.</li>
      <li>Reply to big accounts within 5 minutes of their tweets for maximum visibility.</li>
      <li>Threads with 5-7 tweets outperform single tweets by 8x on impressions.</li>
      <li>Images and polls boost engagement 2-3x vs text-only tweets.</li>
    </ul>
  </>
);

export default function TwitterPostsPage() {
  return (
    <PlatformGenerator config={{
      platform: 'Twitter/X',
      title: 'AI',
      gradientWord: 'Twitter/X Post',
      subtitle: 'Generate viral tweets and threads in seconds. Optimized for retweets, likes & follows — in 25+ languages.',
      charNote: 'Free. No signup required. 280 character limit optimized.',
      placeholder: 'e.g. Hot take on AI replacing content writers, product launch announcement...',
      defaultTone: 'casual',
      loadingText: 'Crafting your tweets...',
      buttonText: 'Generate 5 Tweets',
      resultTitle: 'Your Tweets',
      seoTitle: 'Why Use an AI Tweet Generator?',
      seoContent,
      crossLinks: [
        { href: '/instagram-captions', label: 'Instagram Captions' },
        { href: '/linkedin-posts', label: 'LinkedIn Posts' },
        { href: '/tiktok-scripts', label: 'TikTok Scripts' },
        { href: '/campaign', label: 'Campaign Mode' },
        { href: '/pricing', label: 'See Pricing' },
      ],
    }} />
  );
}
