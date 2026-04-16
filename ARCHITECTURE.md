# PostCraft AI — Architecture
# Clone type: Social Media Content Generator
# Created: 2026-04-15 | Status: MVP BUILT

---

## Stack

| Layer | Tech | Why |
|-------|------|-----|
| Frontend | Next.js 16 + React 19 + Tailwind v4 | SSR/SSG, SEO, fast dev |
| AI | Vercel AI SDK + Anthropic Claude | Best quality for creative writing |
| Auth | Supabase Auth (TODO) | Free tier, social logins |
| DB | Supabase PostgreSQL (TODO) | History, user prefs, usage tracking |
| Payments | Stripe Checkout | Industry standard, webhooks |
| Hosting | Vercel (primary) / Infomaniak (alt) | CDG1 region, edge functions |
| Analytics | PostHog (TODO) | Open-source, GDPR-friendly |

## Routes

```
/ ..................... Landing page + generator (public)
/pricing .............. 3 plans: Free/$19/$79
/dashboard ............ Auth-gated generator + history
/api/generate ......... POST: AI content generation
/api/stripe ........... POST: Stripe checkout session
/api/history .......... GET/POST: user generation history
/sitemap.xml .......... Auto-generated
/robots.txt ........... Auto-generated
```

## Database Schema (Supabase — TODO)

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free','pro','agency')),
  generations_today INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  topic TEXT NOT NULL,
  platform TEXT NOT NULL,
  tone TEXT NOT NULL,
  posts JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_gen_user ON generations(user_id, created_at DESC);

-- RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE generations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users read own generations" ON generations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own generations" ON generations FOR INSERT WITH CHECK (auth.uid() = user_id);
```

## Pricing Model

| Plan | Price | Limits | Target |
|------|-------|--------|--------|
| Free | $0/mo | 5 posts/day, 3 platforms | Lead gen |
| Pro | $19/mo | Unlimited, all platforms, history | Creators |
| Agency | $79/mo | Team (5), API, brand profiles, export | Agencies |

**Revenue projection:** 2% conversion on 10K users = 200 Pro + 20 Agency = $5,400 MRR

## Competitive Advantage

1. **Speed** — 5 posts in <3 seconds (streaming)
2. **Platform-native** — char limits, hashtag styles, emoji density per platform
3. **Tone control** — 5 tones including provocative (competitors avoid)
4. **Bulk generation** — up to 10 posts at once (Pro)
5. **No account needed** — free tier works instantly

## File Structure

```
src/app/
├── page.tsx ............. Landing + generator
├── layout.tsx ........... Root layout + nav + SEO
├── globals.css .......... Tailwind + custom classes
├── pricing/page.tsx ..... Pricing plans
├── dashboard/page.tsx ... Auth dashboard
├── sitemap.ts ........... SEO sitemap
├── robots.ts ............ SEO robots
├── api/
│   ├── generate/route.ts  AI generation endpoint
│   ├── stripe/route.ts ... Payment endpoint
│   └── history/route.ts .. History CRUD
```

## Deployment Checklist

- [ ] Set ANTHROPIC_API_KEY in Vercel env
- [ ] Create Supabase project + apply schema
- [ ] Configure Stripe products (pro_monthly, agency_monthly)
- [ ] Set Stripe webhook URL in dashboard
- [ ] vercel deploy --prod
- [ ] Verify all routes work
- [ ] Set up PostHog analytics
- [ ] Domain: postcraft.ai or postcraft-ai.com
