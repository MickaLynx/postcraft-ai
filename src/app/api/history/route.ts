import { NextResponse } from 'next/server';

// In-memory store for demo; production uses Supabase
const history: Array<{
  id: string;
  topic: string;
  platform: string;
  tone: string;
  posts: string[];
  createdAt: string;
  userId: string;
}> = [];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId') || 'anonymous';
  const userHistory = history.filter(h => h.userId === userId).slice(0, 50);
  return NextResponse.json({ history: userHistory });
}

export async function POST(req: Request) {
  const body = await req.json();
  const entry = {
    id: Date.now().toString(36),
    topic: body.topic,
    platform: body.platform,
    tone: body.tone,
    posts: body.posts,
    createdAt: new Date().toISOString(),
    userId: body.userId || 'anonymous',
  };
  history.unshift(entry);
  if (history.length > 500) history.pop();
  return NextResponse.json({ entry });
}
