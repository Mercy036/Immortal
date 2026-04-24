import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

const aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function run() {
  try {
    const models = await aiClient.models.list();
    for await (const m of models) {
        if (m.name.includes('embed')) console.log(m.name, m.supportedActions);
    }
    console.log('done');
  } catch(e) {
    console.error(e);
  }
}
run();
