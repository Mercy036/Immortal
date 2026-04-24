import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { aiClient } from './llmService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let knowledgeBase = [];
let embeddingsCache = [];

/**
 * Utility to calculate cosine similarity
 */
function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Initialize knowledge base by loading JSON and creating embeddings
 */
export async function initRAG() {
  if (!aiClient) {
    console.warn("Skipping RAG Init: GEMINI_API_KEY is not set.");
    return;
  }

  try {
    const dataPath = path.join(__dirname, '../data/knowledge.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    knowledgeBase = data;

    console.log(`Loaded ${knowledgeBase.length} knowledge items. Generating embeddings...`);
    
    // Generate embeddings in parallel or sequential
    // Gemini text-embedding-004 model is optimal for text embed
    embeddingsCache = await Promise.all(
      knowledgeBase.map(async (item) => {
        const textToEmbed = `Topic: ${item.topic}\nContent: ${item.content}`;
        const result = await aiClient.models.embedContent({
          model: 'gemini-embedding-001',
          contents: textToEmbed,
        });
        return {
          id: item.id,
          topic: item.topic,
          content: item.content,
          embedding: result.embeddings[0].values
        };
      })
    );
    
    console.log("Embeddings generated successfully.");
  } catch (err) {
    console.error("Error initializing RAG system:", err);
  }
}

/**
 * Retrieve the most relevant context for a given query
 */
export async function retrieveContext(query, topK = 2) {
  if (!aiClient || embeddingsCache.length === 0) {
    return "";
  }

  try {
    const queryEmbeddingResult = await aiClient.models.embedContent({
      model: 'gemini-embedding-001',
      contents: query,
    });
    const queryEmbedding = queryEmbeddingResult.embeddings[0].values;

    // Calculate similarity scores
    const scoredDocs = embeddingsCache.map(doc => ({
      ...doc,
      score: cosineSimilarity(queryEmbedding, doc.embedding)
    }));

    // Sort by score descending and take topK
    scoredDocs.sort((a, b) => b.score - a.score);
    const topDocs = scoredDocs.slice(0, topK);

    // Format context
    return topDocs.map(doc => `[${doc.topic}]: ${doc.content}`).join('\n\n');
  } catch (err) {
    console.error("Error retrieving context:", err);
    return "";
  }
}
