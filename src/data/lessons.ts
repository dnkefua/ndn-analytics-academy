import { Lesson } from '../types/academy';

export const LESSONS: Lesson[] = [
  // Course 1: Firebase & GCP Full-Stack (Module 1)
  {
    id: "les-fb-1-1",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-1",
    order: 1,
    type: "reading",
    title: "Lesson 1.1: Firebase Project Setup & SDK Initialization",
    summary: "Learn how to configure Firebase project credentials, environment variables, and client SDK initialization in TypeScript.",
    durationMinutes: 20,
    videoPoster: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    readingMarkdown: `
# Firebase Project Setup & SDK Initialization

Google Firebase provides a unified suite of cloud services for mobile and web development. In this lesson, we initialize Firebase SDK v12 within a TypeScript Vite application.

## 1. Firebase Credentials Setup
Create a \`.env\` file storing your Firebase web configuration values safely without hard-coding secret keys into source code:

\`\`\`bash
VITE_FIREBASE_API_KEY=AIzaSyA_ExampleKeyHere
VITE_FIREBASE_AUTH_DOMAIN=ndn-analytics-academy.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=ndn-analytics-academy
VITE_FIREBASE_STORAGE_BUCKET=ndn-analytics-academy.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
VITE_FIREBASE_APP_ID=1:1234567890:web:abcdef123456
\`\`\`

## 2. Initializing the Firebase App Engine
Create your core initialize file at \`src/lib/firebase.ts\`:

\`\`\`typescript
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Singleton initialization pattern
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
\`\`\`
`,
    terminalLanguage: "typescript",
    starterCode: `import { initializeApp } from 'firebase/app';\nimport { getFirestore } from 'firebase/firestore';\n\nconst firebaseConfig = {\n  projectId: "ndn-analytics-academy"\n};\n\nexport const app = initializeApp(firebaseConfig);\nexport const db = getFirestore(app);\nconsole.log("Firebase App Initialized Successfully!");`,
    expectedOutput: "Firebase App Initialized Successfully!",
    notes: {
      coreConcepts: "Singleton Firebase app initialization ensures connections are reused across React component re-renders.",
      proTip: "Never commit API keys into GitHub repositories without restricting HTTP referrer origins in GCP Console.",
      keyTerms: [
        { term: "Singleton Pattern", definition: "A software design pattern that restricts class instantiation to a single object instance." },
        { term: "Firebase SDK v12", definition: "Modular tree-shakeable JavaScript client library for Google Firebase." }
      ]
    },
    resources: [
      { name: "Firebase Web SDK Docs", url: "https://firebase.google.com/docs/web/setup", type: "docs" },
      { name: "NDN Firebase Boilerplate Repo", url: "https://github.com/dnkefua/ndn-analytics-academy", type: "repo" }
    ]
  },
  {
    id: "les-fb-1-2",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-1",
    order: 2,
    type: "video",
    title: "Lesson 1.2: Architecture Overview & Cloud Console Navigation",
    summary: "Video walkthrough of GCP Console, Firebase Console project linking, and billing setup.",
    durationMinutes: 15,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoPoster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    readingMarkdown: "Watch the architectural overview video above detailing GCP project isolation and service linking.",
    terminalLanguage: "bash",
    starterCode: "gcloud config set project ndn-analytics-academy\ngcloud services list --enabled",
    expectedOutput: "Enabled services: firestore.googleapis.com, run.googleapis.com, apphosting.googleapis.com",
    notes: {
      coreConcepts: "Firebase projects are full GCP projects under the hood, allowing seamless access to BigQuery and Cloud Run.",
      proTip: "Set up GCP budget alerts at $10/month early during development to avoid unexpected costs.",
      keyTerms: [
        { term: "GCP Resource Hierarchy", definition: "Organization -> Folder -> Project -> Resource structure." }
      ]
    },
    resources: [
      { name: "GCP Console Gateway", url: "https://console.cloud.google.com", type: "docs" }
    ]
  },
  {
    id: "les-fb-1-3",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-1",
    order: 3,
    type: "lab",
    title: "Lesson 1.3: Practical Lab — Firebase SDK Integration",
    summary: "Connect your local environment to Firebase project and verify connection via health check script.",
    durationMinutes: 35,
    notes: {
      coreConcepts: "Verifying connection before building UI components prevents silent API failure downstream.",
      proTip: "Use console log assertions during test runs.",
      keyTerms: [{ term: "Health Check", definition: "A diagnostic test verifying external backend availability." }]
    },
    resources: [
      { name: "Firebase CLI Reference", url: "https://firebase.google.com/docs/cli", type: "docs" }
    ]
  },

  // Course 1 (Module 2)
  {
    id: "les-fb-2-1",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-2",
    order: 1,
    type: "reading",
    title: "Lesson 2.1: Firebase Authentication & JWT Token Handling",
    summary: "Implement Google OAuth and Custom Claims verification using Firebase Authentication.",
    durationMinutes: 25,
    readingMarkdown: `
# Firebase Authentication & JWT Verification

Firebase Auth handles user sign-in securely using JSON Web Tokens (JWT).

## Custom Claims for Role-Based Access Control
You can attach custom admin roles to user tokens using Firebase Admin SDK:

\`\`\`typescript
import * as admin from 'firebase-admin';

async function grantAdminRole(uid: string) {
  await admin.auth().setCustomUserClaims(uid, { admin: true, academyRole: "INSTRUCTOR" });
  console.log(\`Custom claims granted to user \${uid}\`);
}
\`\`\`
`,
    terminalLanguage: "typescript",
    starterCode: `import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';\n// Auth login test snippet`,
    expectedOutput: "User authenticated: user@ndnanalytics.com",
    notes: {
      coreConcepts: "Custom claims are embedded directly inside user ID tokens, reducing database calls for permission checks.",
      proTip: "Force token refresh with `getIdToken(true)` after updating custom claims.",
      keyTerms: [
        { term: "JWT Custom Claims", definition: "Attributes attached to a user's Firebase auth token." }
      ]
    },
    resources: [
      { name: "Firebase Auth Docs", url: "https://firebase.google.com/docs/auth", type: "docs" }
    ]
  },

  // Course 4: Applied AI Engineering (Module 1)
  {
    id: "les-ai-1-1",
    courseId: "course-applied-ai-engineering",
    moduleId: "mod-ai-1",
    order: 1,
    type: "reading",
    title: "Lesson 1.1: Gemini 3.5 System Prompting & Architectural Design",
    summary: "Master systematic system instruction design, zero-shot chain of thought, and persona alignment.",
    durationMinutes: 30,
    readingMarkdown: `
# Gemini 3.5 System Prompting & Architecture

Designing prompt pipelines for production LLMs requires deterministic structure.

## System Instructions Pattern
When configuring Gemini 3.5 Flash or Pro, specify system instructions to bound response scope:

\`\`\`python
from google import genai
from google.genai import types

client = genai.Client(api_key="YOUR_GEMINI_KEY")

response = client.models.generate_content(
    model="gemini-2.5-flash",
    config=types.GenerateContentConfig(
        system_instruction="You are an AI Architecture Mentor under MSc Desmond Nkefua at NDN Analytics. Answer technically with code snippets.",
        temperature=0.2,
    ),
    contents="How do I configure Cloud Run autoscaling?"
)
print(response.text)
\`\`\`
`,
    terminalLanguage: "python",
    starterCode: `from google import genai\n\nclient = genai.Client()\nprint("Gemini 3.5 Client Ready for Prompt Execution")`,
    expectedOutput: "Gemini 3.5 Client Ready for Prompt Execution",
    notes: {
      coreConcepts: "System instructions enforce persona, constraints, and tone across all multi-turn conversation steps.",
      proTip: "Use temperature=0.0 to 0.2 for code generation and factual engineering queries.",
      keyTerms: [
        { term: "Chain of Thought", definition: "Prompting strategy encouraging step-by-step reasoning before final answer." }
      ]
    },
    resources: [
      { name: "Google GenAI SDK Docs", url: "https://ai.google.dev/docs", type: "docs" }
    ]
  }
];
