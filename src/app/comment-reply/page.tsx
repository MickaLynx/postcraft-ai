'use client';
import { useState } from 'react';

const platforms = ['Twitter/X', 'LinkedIn', 'Instagram', 'TikTok', 'Facebook', 'YouTube'] as const;
const replyGoals = ['Boost Engagement', 'Build Authority', 'Drive Traffic', 'Customer Support', 'Community Building', 'Lead Generation', 'Humor/Entertainment', 'Educate'] as const;
const commentTypes = ['Positive/Praise', 'Question', 'Criticism/Negative', 'Troll/Spam', 'Feature Request', 'Comparison (competitor mention)', 'Personal Story', 'Generic/Short'] as const;
const tones = ['Professional', 'Casual/Friendly', 'Witty/Humorous', 'Empathetic', 'Bold/Confident', 'Educational'] as const;

interface ReplyResult {
  replies: { text: string; tone: string; strategy: string; engagementTip: string }[];
  bestPractices: string[];
  algorithmTips: string[];
  responseTime: string;
  doNots: string[];
  followUpStrategy: string;
}

function generateReplies(
  platform: string, comment: string, commentType: string, goal: string,
  tone: string, brandVoice: string
): ReplyResult {
  const typeStrategies: Record<string, { approach: string; avoid: string; follow: string }> = {
    'Positive/Praise': { approach: 'Amplify and redirect — thank them, then give them a next step', avoid: 'Generic "thanks!" with no substance', follow: 'Ask them to share/tag a friend who needs this' },
    'Question': { approach: 'Answer concisely, then expand with value — become their go-to expert', avoid: 'One-word answers or "DM me"', follow: 'Create a post/carousel answering the question in depth' },
    'Criticism/Negative': { approach: 'Acknowledge, don\'t defend. Show you listened. Offer a path forward', avoid: 'Getting defensive, deleting the comment, or ignoring it', follow: 'If valid, share what you\'re changing. If not, move on gracefully' },
    'Troll/Spam': { approach: 'One witty response max, then disengage. Let your community handle it', avoid: 'Engaging in a back-and-forth. Never punch down', follow: 'No follow-up needed. Hide/block if harmful' },
    'Feature Request': { approach: 'Validate the idea, share your roadmap stance, make them feel heard', avoid: 'Promising features you can\'t deliver', follow: 'Create a poll asking if others want this feature too' },
    'Comparison (competitor mention)': { approach: 'Acknowledge the competitor positively, then highlight your unique value', avoid: 'Bashing competitors — it always backfires', follow: 'Create a comparison post that\'s factual, not adversarial' },
    'Personal Story': { approach: 'Show genuine interest. Ask follow-up questions. Make them feel seen', avoid: 'Making it about you or your product', follow: 'With permission, feature their story in your content' },
    'Generic/Short': { approach: 'Ask an engaging follow-up question to deepen the conversation', avoid: 'Matching their energy with another generic reply', follow: 'Use it as a prompt for a new post topic' },
  };

  const strategy = typeStrategies[commentType] || typeStrategies['Generic/Short'];

  const toneModifiers: Record<string, (base: string) => string> = {
    'Professional': (b) => b,
    'Casual/Friendly': (b) => `Hey! ${b} 😊`,
    'Witty/Humorous': (b) => `${b} (and yes, I'm as surprised as you are 😄)`,
    'Empathetic': (b) => `I hear you. ${b}`,
    'Bold/Confident': (b) => `Here's the thing — ${b}`,
    'Educational': (b) => `Great point. Here's what the data shows: ${b}`,
  };

  const modifier = toneModifiers[tone] || toneModifiers['Professional'];

  const baseReplies: Record<string, string[]> = {
    'Positive/Praise': [
      `This means a lot — thank you! What part resonated most with you?`,
      `Appreciate you saying that! If you found this helpful, you'll love what's coming next 👀`,
      `Made my day! Tag someone who needs to see this too.`,
    ],
    'Question': [
      `Great question! ${comment.length > 20 ? 'The short answer' : 'Here\'s the deal'}: [answer]. Want me to go deeper on this in a full post?`,
      `I get asked this a lot. Quick answer: [answer]. Saving this to make a detailed breakdown soon.`,
      `Love this question. [Answer in 1-2 sentences]. If you want the full framework, check the link in bio.`,
    ],
    'Criticism/Negative': [
      `I appreciate the honest feedback. You raise a fair point about [specific]. Here's what we're doing about it...`,
      `Thanks for flagging this. We've heard similar feedback and are working on [specific improvement].`,
      `Fair criticism. I'd love to hear more about what would make this better for you — DM always open.`,
    ],
    'Troll/Spam': [
      `Appreciate the enthusiasm! 🙃`,
      `That's one take! Here's ours: [redirect to value].`,
      ``,
    ],
    'Feature Request': [
      `Love this idea! It's on our radar. Would you use it for [specific use case]?`,
      `Great suggestion — we've heard this from a few people. Can you tell me more about how you'd use it?`,
      `This is actually something we're exploring for Q3. Stay tuned, and thanks for the input!`,
    ],
    'Comparison (competitor mention)': [
      `[Competitor] does great work! What sets us apart is [unique value]. Have you tried both?`,
      `Good comparison! We focus specifically on [differentiator] — that's where most of our users see the biggest impact.`,
      `Both solid options! We built ours for [specific persona/use case]. Happy to share a more detailed comparison if helpful.`,
    ],
    'Personal Story': [
      `Wow, thanks for sharing that! Your experience with [topic] is exactly why we built this. How are things going now?`,
      `This is incredible — would you be open to sharing more? Your story could help a lot of people.`,
      `I love hearing this. Stories like yours remind me why this work matters. What was the biggest turning point for you?`,
    ],
    'Generic/Short': [
      `Thanks! Curious — what brought you here? What are you working on?`,
      `Appreciate it! What's the biggest challenge you're facing with [topic] right now?`,
      `🙌 If you could change one thing about [topic], what would it be?`,
    ],
  };

  const replies = (baseReplies[commentType] || baseReplies['Generic/Short']).filter(r => r.length > 0).map((text, i) => ({
    text: modifier(text),
    tone: tone,
    strategy: i === 0 ? strategy.approach : i === 1 ? 'Value-add approach' : 'Community-building approach',
    engagementTip: i === 0 ? 'Reply within 30 min for max algorithm boost' : i === 1 ? 'Ask a question to keep the thread going' : 'End with a micro-CTA',
  }));

  const platformTiming: Record<string, string> = {
    'Twitter/X': 'Under 15 min for best visibility. Twitter rewards fast conversations.',
    'LinkedIn': 'Within 1 hour. LinkedIn comments have a longer shelf life.',
    'Instagram': 'Within 30 min. Reply to Story mentions ASAP for best reciprocity.',
    'TikTok': 'Within 1 hour. Video replies to comments get 10x more views.',
    'Facebook': 'Within 2 hours for Pages. Group replies can be slower.',
    'YouTube': 'Within 24 hours. Pinning a creator reply boosts engagement.',
  };

  const algorithmTips = [
    `${platform}: Every reply you post counts as engagement — the algorithm rewards active creators`,
    `Reply to comments in the first hour for maximum visibility boost`,
    platform === 'TikTok' ? 'Create VIDEO REPLIES to top comments — they appear as new content in feeds' : `Ask a question in your reply to keep the thread going (more comments = more reach)`,
    `Pin your best reply or a fan's great comment to encourage more conversation`,
    `Reply to comments on OTHER creators' posts to get noticed by new audiences`,
    `Use the commenter's name or handle — personalization increases reply-to-reply rate by 40%`,
  ];

  return {
    replies,
    bestPractices: [
      'Always reply to questions and criticism first — these have the highest visibility impact',
      'Use the commenter\'s language style (formal to formal, casual to casual)',
      'Add value in every reply — no "thanks" without substance',
      'Ask questions to extend threads — longer threads = more algorithm signals',
      brandVoice ? `Stay in ${brandVoice} voice — consistency builds brand recognition` : 'Maintain consistent tone across all replies',
    ],
    algorithmTips,
    responseTime: platformTiming[platform] || 'Within 1 hour for best results.',
    doNots: [
      'Never delete negative comments (unless truly harmful/abusive) — it destroys trust',
      'Never copy-paste the same reply — algorithms detect and suppress this',
      'Never respond emotionally to trolls — one measured response, then move on',
      'Never redirect every reply to "link in bio" or DMs — it looks spammy',
      strategy.avoid,
    ],
    followUpStrategy: strategy.follow,
  };
}

export default function CommentReplyPage() {
  const [platform, setPlatform] = useState<string>('Instagram');
  const [comment, setComment] = useState('');
  const [commentType, setCommentType] = useState<string>('Question');
  const [goal, setGoal] = useState<string>('Boost Engagement');
  const [tone, setTone] = useState<string>('Casual/Friendly');
  const [brandVoice, setBrandVoice] = useState('');
  const [result, setResult] = useState<ReplyResult | null>(null);

  const handleGenerate = () => {
    if (!comment.trim()) return;
    setResult(generateReplies(platform, comment.trim(), commentType, goal, tone, brandVoice.trim()));
  };

  return (
    <main className="min-h-screen bg-zinc-950 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-2">Comment Reply Generator</h1>
        <p className="text-zinc-400 mb-8 max-w-2xl">Generate engagement-boosting replies to comments. <strong className="text-white">Every reply is a content opportunity</strong> — turn comments into conversations that grow your reach.</p>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Platform</label>
            <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {platforms.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Comment Type</label>
            <select value={commentType} onChange={e => setCommentType(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {commentTypes.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Reply Goal</label>
            <select value={goal} onChange={e => setGoal(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {replyGoals.map(g => <option key={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Tone</label>
            <select value={tone} onChange={e => setTone(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white">
              {tones.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-zinc-400 mb-1">Brand Voice (optional)</label>
            <input type="text" value={brandVoice} onChange={e => setBrandVoice(e.target.value)} placeholder="e.g., Playful tech startup, Luxury minimalist, Edgy streetwear" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600" />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-zinc-400 mb-1">The Comment You Received</label>
          <textarea value={comment} onChange={e => setComment(e.target.value)} rows={3} placeholder="Paste the comment you want to reply to..." className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600 resize-none" />
        </div>

        <button onClick={handleGenerate} className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition">
          Generate Replies
        </button>

        {result && (
          <div className="mt-10 space-y-6">
            {/* Reply Options */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Reply Options</h2>
              {result.replies.map((reply, i) => (
                <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs bg-violet-600/20 text-violet-300 px-2 py-1 rounded">{reply.strategy}</span>
                    <span className="text-xs text-zinc-500">{reply.tone}</span>
                  </div>
                  <p className="text-white text-lg mb-3">&ldquo;{reply.text}&rdquo;</p>
                  <p className="text-xs text-zinc-500 italic">Tip: {reply.engagementTip}</p>
                </div>
              ))}
            </div>

            {/* Response Time + Follow-Up */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-2">Response Time</h3>
                <p className="text-zinc-300 text-sm">{result.responseTime}</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-2">Follow-Up Strategy</h3>
                <p className="text-zinc-300 text-sm">{result.followUpStrategy}</p>
              </div>
            </div>

            {/* Best Practices + Algorithm Tips */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Best Practices</h3>
                <ul className="space-y-2">
                  {result.bestPractices.map((p, i) => (
                    <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-green-400">✓</span>{p}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Algorithm Tips</h3>
                <ul className="space-y-2">
                  {result.algorithmTips.map((t, i) => (
                    <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-violet-400">→</span>{t}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Do Nots */}
            <div className="bg-zinc-900 border border-red-500/20 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-red-400 mb-3">Never Do This</h3>
              <ul className="space-y-2">
                {result.doNots.map((d, i) => (
                  <li key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-red-400">✕</span>{d}</li>
                ))}
              </ul>
            </div>

            {/* Internal Links */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-zinc-400 mb-3">Related Tools</h3>
              <div className="flex flex-wrap gap-2 text-sm">
                <a href="/brand-voice" className="text-violet-400 hover:text-violet-300 underline">Brand Voice</a>
                <a href="/sentiment-analyzer" className="text-violet-400 hover:text-violet-300 underline">Sentiment Analyzer</a>
                <a href="/engagement-calculator" className="text-violet-400 hover:text-violet-300 underline">Engagement Calculator</a>
                <a href="/crisis-management" className="text-violet-400 hover:text-violet-300 underline">Crisis Management</a>
                <a href="/hooks" className="text-violet-400 hover:text-violet-300 underline">Hook Generator</a>
                <a href="/poll-quiz" className="text-violet-400 hover:text-violet-300 underline">Poll & Quiz</a>
              </div>
            </div>
          </div>
        )}

        {/* FAQ */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">Comment Reply FAQ</h2>
          <div className="space-y-4">
            {[
              { q: 'Why should I reply to every comment?', a: 'Each reply signals the algorithm that your post is generating conversation. More replies = more distribution. On Instagram, replying to every comment in the first hour can increase reach by 30-50%.' },
              { q: 'How do I handle trolls?', a: 'One witty or measured response, then disengage. Never delete unless it\'s abusive (deleting negative comments destroys trust). Let your community defend you — that\'s even more powerful.' },
              { q: 'Should I reply to my own posts\' comments or others\' posts?', a: 'Both! Reply to yours within 1 hour for algorithm boost. Comment on others\' posts (especially bigger accounts) for visibility. On TikTok, creating video replies to comments can go viral on their own.' },
              { q: 'What\'s the ideal reply length?', a: '1-3 sentences. Long enough to add value, short enough to read quickly. Always end with a question or micro-CTA to keep the conversation going.' },
              { q: 'How do I maintain brand voice across hundreds of replies?', a: 'Create a "Reply Playbook" with templates for each comment type. Use our Brand Voice Generator to establish your voice, then adapt each template to the specific comment while staying on-brand.' },
            ].map((faq, i) => (
              <details key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 group">
                <summary className="font-semibold text-white cursor-pointer">{faq.q}</summary>
                <p className="text-zinc-400 text-sm mt-2">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <footer className="mt-20 border-t border-zinc-800 pt-8 pb-12">
          <div className="grid md:grid-cols-4 gap-8 text-sm text-zinc-500">
            <div><h4 className="font-semibold text-white mb-3">Content Creation</h4><ul className="space-y-1"><li><a href="/" className="hover:text-white transition">Post Generator</a></li><li><a href="/hooks" className="hover:text-white transition">Hook Generator</a></li><li><a href="/carousel-generator" className="hover:text-white transition">Carousel</a></li><li><a href="/poll-quiz" className="hover:text-white transition">Poll & Quiz</a></li><li><a href="/comment-reply" className="hover:text-white transition">Comment Replies</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Optimization</h4><ul className="space-y-1"><li><a href="/caption-optimizer" className="hover:text-white transition">Caption Optimizer</a></li><li><a href="/hashtags" className="hover:text-white transition">Hashtags</a></li><li><a href="/post-timing" className="hover:text-white transition">Post Timing</a></li><li><a href="/virality-score" className="hover:text-white transition">Virality Score</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Analytics</h4><ul className="space-y-1"><li><a href="/engagement-calculator" className="hover:text-white transition">Engagement</a></li><li><a href="/sentiment-analyzer" className="hover:text-white transition">Sentiment</a></li><li><a href="/roi-calculator" className="hover:text-white transition">ROI Calculator</a></li><li><a href="/influencer-score" className="hover:text-white transition">Influencer Score</a></li></ul></div>
            <div><h4 className="font-semibold text-white mb-3">Strategy</h4><ul className="space-y-1"><li><a href="/brand-voice" className="hover:text-white transition">Brand Voice</a></li><li><a href="/content-calendar" className="hover:text-white transition">Calendar</a></li><li><a href="/link-in-bio" className="hover:text-white transition">Link in Bio</a></li><li><a href="/campaign" className="hover:text-white transition">Campaign Mode</a></li></ul></div>
          </div>
          <p className="text-center text-zinc-600 text-xs mt-8">© 2026 PostCraft AI. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
