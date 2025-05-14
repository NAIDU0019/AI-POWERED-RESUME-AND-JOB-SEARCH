// lib/chatPrompt.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function getCareerAdvice(message) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
    You are an AI Career Coach. Answer the following user query in a friendly and insightful manner:
    ${message}
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}
