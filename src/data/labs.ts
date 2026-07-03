import { Lab } from '../types/academy';

export const LABS: Lab[] = [
  // Course 1 (Firebase & GCP)
  {
    id: "lab-fb-1",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-1",
    title: "Lab 1: Firebase Project Setup & Health Verification",
    summary: "Configure environment variables, write a singleton initialization module, and verify live Firestore connection.",
    instructions: [
      "Create `.env` containing your project credentials (`VITE_FIREBASE_PROJECT_ID=ndn-analytics-academy`).",
      "Initialize `firebase/app` and `firebase/firestore` singleton exported instances.",
      "Execute the connection health test script in the terminal and confirm status output.",
      "Submit your source code or GitHub repository link for automated rubric evaluation."
    ],
    starterCode: `import { initializeApp } from 'firebase/app';\nimport { getFirestore } from 'firebase/firestore';\n\nconst config = {\n  projectId: "ndn-analytics-academy"\n};\n\nexport const app = initializeApp(config);\nexport const db = getFirestore(app);\nconsole.log("[LAB 1] Connection established successfully!");`,
    expectedOutput: "[LAB 1] Connection established successfully!",
    validationType: "unit_test",
    requiredEvidence: ["code", "repo_url", "reflection"],
    rubric: [
      { id: "rub-1", label: "Singleton Config", description: "Firebase singleton pattern correctly configured without duplicate init.", maxPoints: 25 },
      { id: "rub-2", label: "Environment Variables", description: "Credentials loaded from process.env / import.meta.env safely.", maxPoints: 25 },
      { id: "rub-3", label: "Firestore Instance", description: "Exported db instance successfully initialized.", maxPoints: 25 },
      { id: "rub-4", label: "Execution & Log Output", description: "Code runs without throwing exceptions and emits expected logs.", maxPoints: 25 }
    ]
  },
  {
    id: "lab-fb-4",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-4",
    title: "Lab 4: Writing & Deploying Zero-Trust Firestore Security Rules",
    summary: "Write unit-tested Firestore Security Rules enforcing user ownership and role-based access control.",
    instructions: [
      "Define rules for `match /users/{userId}` enforcing `request.auth.uid == userId`.",
      "Define rules for `match /certificates/{certId}` allowing read access for all, but write access only for custom claim `request.auth.token.role == 'INSTRUCTOR'`.",
      "Paste your completed `firestore.rules` snippet and submit for verification."
    ],
    starterCode: `rules_version = '2';\nservice cloud.firestore {\n  match /databases/{database}/documents {\n    match /users/{userId} {\n      allow read, write: if request.auth != null && request.auth.uid == userId;\n    }\n    match /certificates/{certId} {\n      allow read: if true;\n      allow write: if request.auth != null && request.auth.token.role == "INSTRUCTOR";\n    }\n  }\n}`,
    expectedOutput: "Rules compiled and validated: 0 syntax errors",
    validationType: "repo_scan",
    requiredEvidence: ["code", "reflection"],
    rubric: [
      { id: "rub-sec-1", label: "User Ownership", description: "Enforces request.auth.uid matching target userId.", maxPoints: 35 },
      { id: "rub-sec-2", label: "Role Check", description: "Verifies custom claim token role for instructor actions.", maxPoints: 35 },
      { id: "rub-sec-3", label: "Syntax Correctness", description: "Rules file compiles cleanly without syntax errors.", maxPoints: 30 }
    ]
  },
  {
    id: "lab-ai-1",
    courseId: "course-applied-ai-engineering",
    moduleId: "mod-ai-1",
    title: "Lab 1: Gemini 3.5 System Prompt & Structured Output Engineering",
    summary: "Implement a Python script using `google.genai` SDK that generates structured Pydantic JSON outputs.",
    instructions: [
      "Instantiate `genai.Client()` with system instructions for an architectural auditor.",
      "Define a Pydantic class `CourseAuditResult` with fields: `score`, `vulnerabilities`, `recommendations`.",
      "Execute the prompt generator and verify output matches JSON schema perfectly."
    ],
    starterCode: `from google import genai\nfrom pydantic import BaseModel\n\nclass AuditResult(BaseModel):\n    score: int\n    summary: str\n\nprint("[AI LAB 1] Pydantic Schema Defined & Ready")`,
    expectedOutput: "[AI LAB 1] Pydantic Schema Defined & Ready",
    validationType: "unit_test",
    requiredEvidence: ["code", "repo_url", "reflection"],
    rubric: [
      { id: "rub-ai-1", label: "Pydantic Schema", description: "Structured data class defined with typed fields.", maxPoints: 35 },
      { id: "rub-ai-2", label: "SDK Configuration", description: "genai.Client initialized with system instructions.", maxPoints: 35 },
      { id: "rub-ai-3", label: "JSON Output", description: "Response parsed cleanly into schema without hallucination.", maxPoints: 30 }
    ]
  }
];
