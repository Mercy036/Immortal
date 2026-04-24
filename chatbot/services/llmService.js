import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

// Initialize the Google GenAI SDK
// It automatically picks up GEMINI_API_KEY from process.env
const apiKey = process.env.GEMINI_API_KEY;
export const aiClient = apiKey ? new GoogleGenAI({ apiKey }) : null;

/**
 * Generate a response using Gemini
 * @param {string} prompt 
 * @param {string} systemInstruction Optional system instruction to guide the persona
 * @returns {Promise<string>}
 */
export async function generateResponse(prompt, systemInstruction = "You are a helpful coding assistant.") {
  if (!aiClient) {
    return "Error: GEMINI_API_KEY is missing in .env";
  }
  
  try {
    const response = await aiClient.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7
      }
    });
    return response.text;
  } catch (err) {
    console.error("Error generating LLM response:", err);
    throw new Error('Failed to generate response from LLM');
  }
}
