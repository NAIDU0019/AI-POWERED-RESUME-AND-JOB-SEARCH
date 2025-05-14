// app/api/recommend-jobs/route.js
import { getJobRecommendations } from '@/lib/jobMatcher';

export async function POST(req, res) {
  const userProfile = await req.json();
  const recommendations = await getJobRecommendations(userProfile);
  return new Response(JSON.stringify({ recommendations }), { status: 200 });
}
