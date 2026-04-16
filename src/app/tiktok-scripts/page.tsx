import type { Metadata } from 'next';
import PlatformGenerator from '@/components/PlatformGenerator';

export const metadata: Metadata = {
  title: 'AI TikTok Script Generator — PostCraft AI | Viral Scripts in Seconds',
  description: 'Generate viral TikTok scripts and captions in seconds. Hook-first structure, trending formats. 8 tones, 25+ languages. Free, no signup.',
};

const seoContent = (
  <>
    <p>TikTok is the fastest-growing social platform with over 1.5 billion active users. The key to viral TikToks? A killer hook in the first 1-2 seconds and a script that keeps viewers watching until the end.</p>
    <p>PostCraft AI generates TikTok scripts optimized for watch time and engagement. We follow trending formats — POVs, storytime, listicles, day-in-my-life, tutorials — and adapt them to your niche.</p>

    <h3 className="text-lg font-semibold text-zinc-200 pt-4">TikTok Script Structures That Work</h3>
    <ul className="list-disc pl-5 space-y-2">
      <li><strong>The Hook-Value-CTA:</strong> Open with a bold hook, deliver value in the middle, end with &ldquo;follow for more.&rdquo;</li>
      <li><strong>The POV Format:</strong> &ldquo;POV: you just discovered an AI that writes all your social content.&rdquo; Relatable = shareable.</li>
      <li><strong>The Listicle:</strong> &ldquo;3 things nobody tells you about starting a business.&rdquo; Numbers in hooks increase watch time by 30%.</li>
      <li><strong>The Storytime:</strong> Personal stories with a twist ending get 5x the shares of tutorial content.</li>
      <li><strong>The Duet/Stitch Bait:</strong> End with a question or controversial statement that invites duets and stitches.</li>
    </ul>

    <h3 className="text-lg font-semibold text-zinc-200 pt-4">TikTok Algorithm Tips (2026)</h3>
    <ul className="list-disc pl-5 space-y-2">
      <li>Average watch time is the #1 ranking factor. Scripts should be 15-45 seconds for maximum completion rate.</li>
      <li>Post 1-3 times per day consistently. The algorithm rewards frequency.</li>
      <li>Use 3-5 relevant hashtags max. One trending + niche-specific ones.</li>
      <li>Captions matter — TikTok&apos;s SEO now indexes caption text for search results.</li>
      <li>Reply to comments with video — each reply is a new video that gets its own distribution.</li>
    </ul>
  </>
);

export default function TikTokScriptsPage() {
  return (
    <PlatformGenerator config={{
      platform: 'TikTok',
      title: 'AI',
      gradientWord: 'TikTok Script',
      subtitle: 'Generate viral TikTok scripts and captions in seconds. Hook-first structure, trending formats — in 25+ languages.',
      charNote: 'Free. No signup required. Short-form video optimized.',
      placeholder: 'e.g. Day in my life as a startup founder, 3 cooking hacks, POV you just got promoted...',
      defaultTone: 'casual',
      loadingText: 'Scripting your TikToks...',
      buttonText: 'Generate 5 TikTok Scripts',
      resultTitle: 'Your TikTok Scripts',
      seoTitle: 'Why Use an AI TikTok Script Generator?',
      seoContent,
      crossLinks: [
        { href: '/instagram-captions', label: 'Instagram Captions' },
        { href: '/linkedin-posts', label: 'LinkedIn Posts' },
        { href: '/twitter-posts', label: 'Twitter/X Posts' },
        { href: '/campaign', label: 'Campaign Mode' },
        { href: '/pricing', label: 'See Pricing' },
      ],
    }} />
  );
}
