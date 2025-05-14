// app/api/skill-gap/route.js
import { analyzeSkillGap } from '@/lib/skillAnalyzer';

export async function POST(req, res) {
  const { userSkills, targetRole } = await req.json();
  const analysis = await analyzeSkillGap(userSkills, targetRole);
  return new Response(JSON.stringify({ analysis }), { status: 200 });
}
