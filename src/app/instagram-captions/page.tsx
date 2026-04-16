import type { Metadata } from 'next';
import PlatformGenerator from '@/components/PlatformGenerator';

export const metadata: Metadata = {
  title: 'AI Instagram Caption Generator — PostCraft AI | Free, 25+ Languages',
  description: 'Generate scroll-stopping Instagram captions in seconds. Optimized for engagement, saves & shares. 8 tones, 25+ languages. Free, no signup.',
};

const seoContent = (
  <>
    <p>Writing Instagram captions that drive engagement is harder than it looks. The best captions combine a strong hook, value-driven body text, a clear call-to-action, and strategic hashtag placement — all within 2,200 characters.</p>
    <p>PostCraft AI analyzes top-performing Instagram content to generate captions that match your tone, niche, and audience. Whether you&apos;re a DTC brand launching products, a content creator building an audience, or an agency managing client accounts, our AI writes captions that get saves, shares, and comments.</p>

    <h3 className="text-lg font-semibold text-zinc-200 pt-4">How It Works</h3>
    <ol className="list-decimal pl-5 space-y-2">
      <li>Describe your post topic — product, behind-the-scenes, lifestyle, tutorial, or anything else.</li>
      <li>Pick your tone — casual for Stories, professional for brand launches, provocative for engagement bait, empathetic for community building.</li>
      <li>Choose your language — generate captions in 25+ languages for global audiences.</li>
      <li>Get 5 unique captions instantly — each optimized for Instagram&apos;s algorithm and format.</li>
    </ol>

    <h3 className="text-lg font-semibold text-zinc-200 pt-4">Instagram Caption Best Practices (2026)</h3>
    <ul className="list-disc pl-5 space-y-2">
      <li><strong>Front-load the hook:</strong> Instagram truncates captions after ~125 characters. Make the first line irresistible.</li>
      <li><strong>Use line breaks:</strong> Wall-of-text captions get skipped. Break your caption into readable chunks.</li>
      <li><strong>End with a CTA:</strong> &ldquo;Save this for later&rdquo;, &ldquo;Tag someone who needs this&rdquo;, &ldquo;Drop a fire emoji if you agree&rdquo;</li>
      <li><strong>Hashtags in comments:</strong> Put 5-15 relevant hashtags in the first comment, not the caption body.</li>
      <li><strong>Captions affect Reels too:</strong> Reels with strong captions get 40% more saves than those without.</li>
      <li><strong>Emotional resonance wins:</strong> Captions that evoke curiosity, nostalgia, or urgency get 2x more engagement than neutral ones.</li>
    </ul>
  </>
);

export default function InstagramCaptionsPage() {
  return (
    <PlatformGenerator config={{
      platform: 'Instagram',
      title: 'AI',
      gradientWord: 'Instagram Caption',
      subtitle: 'Generate scroll-stopping Instagram captions in seconds. Optimized for engagement, saves & shares — in 25+ languages.',
      charNote: 'Free. No signup required. 2,200 character limit respected.',
      placeholder: 'e.g. New summer collection launch, behind the scenes at our studio...',
      defaultTone: 'casual',
      loadingText: 'Writing your captions...',
      buttonText: 'Generate 5 Instagram Captions',
      resultTitle: 'Your Instagram Captions',
      seoTitle: 'Why Use an AI Instagram Caption Generator?',
      seoContent,
      crossLinks: [
        { href: '/linkedin-posts', label: 'LinkedIn Posts' },
        { href: '/twitter-posts', label: 'Twitter/X Posts' },
        { href: '/tiktok-scripts', label: 'TikTok Scripts' },
        { href: '/campaign', label: 'Campaign Mode' },
        { href: '/pricing', label: 'See Pricing' },
      ],
    }} />
  );
}
