import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateResponse } from './services/llmService.js';
import { initRAG, retrieveContext } from './services/ragService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Redirect browser GET requests on the API route to the frontend
app.get('/api/chat', (req, res) => {
  res.redirect('/');
});

// Main chat endpoint
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  try {
    // 1. Retrieve context using RAG
    const ragContext = await retrieveContext(message);

    // 2. Formulate the enriched prompt
    const enrichedPrompt = `
You are the "Arena Mentor" for a gamified PvP coding platform. Your goal is to guide the user towards better time/space complexity. You CAN provide full code implementations for data structures and algorithms when the user asks for them.

RAG Context Data:
${ragContext}

User Message:
${message}

Please provide your helpful response based on the context rules above, blending into the platform's gamified environment.
`;

    // 3. Generate response from LLM
    const aiResponse = await generateResponse(enrichedPrompt, "You are a helpful and engaging game character named 'Arena Mentor'. Keep your responses reasonably concise but educational.");

    res.json({
      reply: aiResponse,
      debugContextUsed: ragContext // Returning for debugging/verification purposes
    });
  } catch (error) {
    console.error("Error in /api/chat handler:", error);
    res.status(500).json({ error: "An error occurred while generating a response." });
  }
});

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  
  // Initialize the RAG system (loads embeddings)
  await initRAG();
});
