import { QuizQuestion } from '../types/academy';

export const QUIZZES: QuizQuestion[] = [
  // Course 1 (Firebase & GCP)
  {
    id: "quiz-fb-1",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-1",
    type: "multiple_choice",
    difficulty: "medium",
    question: "When initializing Firebase Web SDK v12 in a single-page application (SPA), what is the primary benefit of using the singleton pattern?",
    options: [
      { key: "A", text: "It prevents storing credentials in environment variables." },
      { key: "B", text: "It ensures a single app instance is reused across React component re-renders, preventing duplicate connections." },
      { key: "C", text: "It bypasses Firestore Security Rules during development." },
      { key: "D", text: "It automatically compiles TypeScript to JavaScript." }
    ],
    correctAnswer: "B",
    explanation: "Reusing a single initialized FirebaseApp instance prevents redundant WebSocket/HTTP connection pooling across React re-renders.",
    technicalResources: [
      { name: "Firebase App Singleton Pattern", url: "https://firebase.google.com/docs/web/setup", type: "docs" }
    ]
  },
  {
    id: "quiz-fb-2",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-2",
    type: "multi_select",
    difficulty: "hard",
    question: "Which of the following are valid security practices when configuring Firebase Authentication and Custom Claims? (Select all that apply)",
    options: [
      { key: "A", text: "Set custom claims exclusively from server-side environments using Firebase Admin SDK." },
      { key: "B", text: "Hardcode custom claims directly inside client-side JavaScript." },
      { key: "C", text: "Force token refresh (`getIdToken(true)`) after updating user claims to receive the updated JWT." },
      { key: "D", text: "Expose Firebase Admin SDK service account private keys inside client bundle." }
    ],
    correctAnswer: ["A", "C"],
    explanation: "Custom claims must strictly be written server-side via Firebase Admin SDK. Clients must refresh tokens to retrieve updated claims.",
    technicalResources: [
      { name: "Control Access with Custom Claims", url: "https://firebase.google.com/docs/auth/admin/custom-claims", type: "docs" }
    ]
  },
  {
    id: "quiz-fb-3",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-3",
    type: "code_output",
    difficulty: "medium",
    question: "What will be the output of executing the following Cloud Firestore query snippet?",
    codeSnippet: `const queryRef = query(
  collection(db, "enrollments"),
  where("status", "==", "PASSED"),
  orderBy("score", "desc"),
  limit(5)
);
const snapshot = await getDocs(queryRef);
console.log(snapshot.size);`,
    options: [
      { key: "A", text: "Prints 0 if compound index `status ASC, score DESC` is missing and query fails with an index requirement error." },
      { key: "B", text: "Always prints 5 without needing an index." },
      { key: "C", text: "Throws a syntax error on `orderBy`." },
      { key: "D", text: "Deletes all non-matching documents." }
    ],
    correctAnswer: "A",
    explanation: "Firestore requires a compound index when combining equality (`==`) and inequality/sort (`orderBy`) on different fields.",
    technicalResources: [
      { name: "Firestore Compound Indexes", url: "https://firebase.google.com/docs/firestore/query-data/indexing", type: "docs" }
    ]
  },
  {
    id: "quiz-fb-4",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-4",
    type: "architecture_scenario",
    difficulty: "hard",
    question: "Architecture Scenario: You are designing zero-trust Firestore Security Rules for a learning platform where students can only edit their own profile, but instructors can review all student profiles. Which rule configuration enforces this?",
    options: [
      { key: "A", text: "allow write: if true;" },
      { key: "B", text: "allow read: if request.auth != null; allow write: if request.auth.uid == userId || request.auth.token.role == 'INSTRUCTOR';" },
      { key: "C", text: "allow write: if false;" },
      { key: "D", text: "allow read, write: if request.origin == 'https://ndnanalytics.com';" }
    ],
    correctAnswer: "B",
    explanation: "Rule B checks both request.auth.uid for self-edits and request.auth.token.role for instructor override.",
    technicalResources: [
      { name: "Firestore Security Rules Guide", url: "https://firebase.google.com/docs/firestore/security/get-started", type: "docs" }
    ]
  },

  // Course 4 (Applied AI Engineering)
  {
    id: "quiz-ai-1",
    courseId: "course-applied-ai-engineering",
    moduleId: "mod-ai-1",
    type: "debugging",
    difficulty: "hard",
    question: "Debugging Problem: An AI agent API endpoint powered by Gemini 3.5 is sporadically producing malformed JSON that fails `JSON.parse()`. How do you eliminate this non-deterministic formatting bug?",
    options: [
      { key: "A", text: "Increase temperature to 1.0." },
      { key: "B", text: "Use `responseMimeType: 'application/json'` and supply a strict `responseSchema` Pydantic model in model generation config." },
      { key: "C", text: "Wrap prompt string in quotes." },
      { key: "D", text: "Retry request in a while loop 100 times." }
    ],
    correctAnswer: "B",
    explanation: "Gemini native responseSchema forces the decoder to output syntactically guaranteed valid JSON adhering to the specified schema.",
    technicalResources: [
      { name: "Gemini Structured Outputs", url: "https://ai.google.dev/docs/structured_output", type: "docs" }
    ]
  }
];
