// app/api/career-chat/route.js
import { getCareerAdvice } from '@/lib/chatPrompt';

export async function POST(req, res) {
  const { message } = await req.json();
  const reply = await getCareerAdvice(message);
  return new Response(JSON.stringify({ reply }), { status: 200 });
}
