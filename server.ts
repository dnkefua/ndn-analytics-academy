import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 8080;
const HOST = '0.0.0.0';

app.use(cors());
app.use(express.json());

// API route for AI Mentor Chat (Gemini LLM / Fallback Context Engine)
app.post('/api/chat', async (req, res) => {
  try {
    const { message, context } = req.body;
    const msgLower = (message || '').toLowerCase();

    const courseTitle = context?.courseTitle || "General Cloud & AI Engineering";
    const studentName = context?.studentName || "MSc Desmond Nkefua Student";

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Intelligent fallback logic with contextual awareness
      let fallbackReply = `Greetings ${studentName}!\n\nI am your NDN Analytics AI Mentor for **${courseTitle}**.\n\n`;

      if (msgLower.includes("gcp") || msgLower.includes("cloud run") || msgLower.includes("deploy")) {
        fallbackReply += "To deploy microservices to **Google Cloud Platform (GCP) Cloud Run**:\n\n" +
          "1. Containerize your app using Docker (`docker build -t gcr.io/ndn-analytics/app:v1 .`).\n" +
          "2. Authenticate gcloud CLI: `gcloud auth configure-docker`.\n" +
          "3. Push container to Google Artifact Registry / GCR.\n" +
          "4. Execute deployment: `gcloud run deploy --image gcr.io/ndn-analytics/app:v1 --platform managed --region us-east4`.\n\n" +
          "You can verify cold start latencies and continuous deployment inside our Practical Lab Studio!";
      } else if (msgLower.includes("firebase") || msgLower.includes("firestore")) {
        fallbackReply += "To integrate **Firebase & GCP Cloud Functions**:\n\n" +
          "1. Initialize Firebase Admin SDK using Application Default Credentials (`cred = credentials.ApplicationDefault()`).\n" +
          "2. Configure Cloud Firestore Security Rules to enforce client-side database authentication.\n" +
          "3. Set up event triggers on Firestore document mutations to fire serverless GCP Cloud Functions.";
      } else if (msgLower.includes("play store") || msgLower.includes("android") || msgLower.includes("integrity")) {
        fallbackReply += "For **Google Play Store App Publishing & Security**:\n\n" +
          "1. Configure Android App Bundle (AAB) with R8 / ProGuard minification.\n" +
          "2. Integrate **Google Play Integrity API** to verify app binary authenticity against tamper attempts.\n" +
          "3. Setup Play Console Testing Tracks (Internal -> Closed -> Open -> Production Release).";
      } else if (msgLower.includes("ai") || msgLower.includes("gemini") || msgLower.includes("agent")) {
        fallbackReply += "For **Applied Gemini 3.5 AI Engineering**:\n\n" +
          "1. Use `google.genai` SDK with `gemini-3.5-flash` or `gemini-3.5-pro`.\n" +
          "2. Enforce Pydantic/JSON Schema structured output for predictable subagent function calling.\n" +
          "3. Connect Vertex AI Vector Search to supply enterprise RAG ground truth.";
      } else {
        fallbackReply += `I am ready to assist you with your coursework in ${courseTitle}. Ask any specific technical question about code implementations, lab evaluations, or capstone deliverables!`;
      }

      return res.json({ reply: fallbackReply });
    }

    // If Gemini API key is configured
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: `You are an AI Mentor for NDN Analytics Inc. Academy, assisting student ${studentName} enrolled in course ${courseTitle}. Answer technically, concisely, and encouragingly.\n\nUser Question: ${message}` }]
          }
        ]
      })
    });

    const data = await response.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Answer received from Gemini AI Engine.";
    res.json({ reply: replyText });
  } catch (error) {
    console.error("AI Mentor Error:", error);
    res.status(500).json({ reply: "Error communicating with NDN AI Gateway. Please check server logs." });
  }
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`[ NDN ACADEMY APP ] Server running on http://${HOST}:${PORT}`);
  });
}

startServer();
