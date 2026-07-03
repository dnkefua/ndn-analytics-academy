import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Proxy-shielded API route for AI Mentor Chat (Gemini 3.5 Flash)
  app.post("/api/chat", async (req, res) => {
    const { message, history } = req.body;
    const msgLower = (message || "").toLowerCase();
    
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        // Smart fallback logic if API key is not present in local env
        let fallbackReply = "Greeting from NDN Analytics AI Mentor (Dr. Desmond Nkefua Virtual Assistant)!\n\n";

        if (msgLower.includes("gcp") || msgLower.includes("cloud run") || msgLower.includes("deploy")) {
          fallbackReply += "To deploy microservices to **Google Cloud Platform (GCP) Cloud Run**:\n\n" +
            "1. **Containerize**: `gcloud builds submit --tag gcr.io/ndn-analytics/app:v1`\n" +
            "2. **Deploy**: `gcloud run deploy ndn-app --image gcr.io/ndn-analytics/app:v1 --platform managed --region us-central1`\n" +
            "3. **Secrets**: Bind API keys via GCP Secret Manager for maximum compliance.";
        } else if (msgLower.includes("play store") || msgLower.includes("android") || msgLower.includes("flutter") || msgLower.includes("app")) {
          fallbackReply += "For **Google Play Store App Development & Publishing**:\n\n" +
            "1. **Architecture**: Jetpack Compose / Flutter MVVM with Play Integrity API.\n" +
            "2. **Bundle**: Generate Android App Bundle (`.aab`) with release signing.\n" +
            "3. **Console**: Deploy to Google Play Console Internal Testing track before Production release.";
        } else if (msgLower.includes("gemini") || msgLower.includes("agent") || msgLower.includes("ai")) {
          fallbackReply += "For **Applied AI Engineering & Gemini 3.5 Agents**:\n\n" +
            "```python\nfrom google.genai import GoogleGenAI\nai = GoogleGenAI(api_key='YOUR_API_KEY')\nresponse = ai.models.generate_content(model='gemini-3.5-flash', contents='Analyze logs')\nprint(response.text)\n```";
        } else {
          fallbackReply += "I am your **NDN Analytics Inc. AI Mentor**! I specialize in:\n" +
            "- **Google Cloud Platform Architecture** (Cloud Run, Terraform, GKE)\n" +
            "- **Google Play Store App Development** (Android, Flutter, Play Console, Monetization)\n" +
            "- **AI Engineering** (Gemini 3.5 Flash, Autonomous Subagents, BigQuery ML)";
        }

        return res.json({ reply: fallbackReply });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });

      const systemInstruction = `You are the NDN Analytics Inc. AI Mentor, created by Dr. DN Kefua (Founder & Academic Director).
You are an expert in:
1. AI Engineering: Gemini 3.5 APIs, Multi-Agent Orchestration, Vector RAG, Vertex AI, BigQuery ML.
2. Google Play Store App Development: Android (Kotlin), Flutter, Play Console Deployment, Play Integrity API, App Monetization.
3. Google Cloud Platform (GCP): Serverless Cloud Run, GKE, Terraform IaC, App Engine, Cloud SQL.

Website: https://www.ndnanalytics.com/
GitHub: https://github.com/dnkefua/ndn-analytics.git

Provide structured, encouraging, compact, and clear responses with markdown formatting and code snippets.`;

      const contents = [];
      if (history && history.length > 0) {
        for (const turn of history) {
          contents.push({
            role: turn.role === 'model' ? 'model' : 'user',
            parts: [{ text: turn.text }]
          });
        }
      }
      
      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents,
        config: {
          systemInstruction,
        }
      });

      res.json({ reply: response.text });
    } catch (error: any) {
      console.error("Gemini Generation Error:", error);
      res.status(500).json({ reply: `Uplink Gateway Notice: ${error.message || 'Connecting to NDN Analytics AI.'}` });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server launched on http://0.0.0.0:${PORT}`);
  });
}

startServer();
