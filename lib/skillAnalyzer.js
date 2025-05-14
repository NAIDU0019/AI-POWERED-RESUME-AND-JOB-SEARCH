// lib/skillAnalyzer.js

export async function analyzeSkillGap(userSkills, targetRole) {
  const prompt = `
    User Skills: ${userSkills.join(', ')}
    Target Role: ${targetRole}
    Identify the skill gaps and suggest resources to acquire these skills.
  `;

  const apiKey = process.env.GEMINI_API_KEY; // Make sure this is defined in your .env.local
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    }),
  });

  const data = await res.json();
  console.log("Skill Gap Analysis Response:", data); // Log the response for debugging
  if (!res.ok) {
    console.error("Error in Skill Gap Analysis:", data); // Log the error for debugging
    throw new Error('Failed to fetch skill gap analysis');
  }

  const result =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    'No skill gap analysis available.';

  return result;
}
