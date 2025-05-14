// lib/jobMatcher.js
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function getJobRecommendations(userProfile) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.0-pro' });

  const prompt = `
    Based on the following user profile:
    Experience: ${userProfile.experience}
    Domain: ${userProfile.domain}
    Skills: ${userProfile.skills}

    Provide 5 job recommendations in the following JSON format:
    {
      "recommendations": [
        {
          "title": "Job Title",
          "description": "Brief job description and why it matches the profile",
          "requiredSkills": ["skill1", "skill2"],
          "experienceLevel": "Required experience level",
          "domainFit": "How this role fits their domain"
        }
      ]
    }

    Ensure recommendations are specific to their experience level and domain.
    IMPORTANT: Return ONLY valid JSON, no additional text.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = await response.text();
  
  try {
    const parsedResponse = JSON.parse(text.replace(/```json\n?|```/g, '').trim());
    return parsedResponse.recommendations;
  } catch (error) {
    console.error('Error parsing AI response:', error);
    return [];
  }
}
