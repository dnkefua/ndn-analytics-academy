import { QuizQuestion } from '../../types/academy';

// Course 1: NDN-FB-401 — 7 modules × 3 questions
// Question ids follow "quiz-<course>-<module>-q<n>"; the module's quiz group id is "quiz-fb-<module>"

export const FIREBASE_QUIZZES: QuizQuestion[] = [
  // ── Module 1 ──
  {
    id: "quiz-fb-1-q1",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-1",
    type: "multiple_choice",
    difficulty: "medium",
    question: "When initializing Firebase Web SDK v12 in a single-page application, what is the primary benefit of guarding initializeApp() with a getApps() check?",
    options: [
      { key: "A", text: "It prevents storing credentials in environment variables." },
      { key: "B", text: "It makes initialization idempotent, preventing 'app/duplicate-app' errors under hot reload and StrictMode re-execution." },
      { key: "C", text: "It bypasses Firestore Security Rules during development." },
      { key: "D", text: "It automatically compiles TypeScript to JavaScript." }
    ],
    correctAnswer: "B",
    explanation: "Vite HMR and React StrictMode re-run module code. getApps().length > 0 ? getApp() : initializeApp(config) makes initialization idempotent, so re-execution reuses the singleton instead of throwing app/duplicate-app.",
    technicalResources: [{ name: "Firebase Web Setup", url: "https://firebase.google.com/docs/web/setup", type: "docs" }]
  },
  {
    id: "quiz-fb-1-q2",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-1",
    type: "multiple_choice",
    difficulty: "easy",
    question: "Why is the Firebase web API key safe to include in a client bundle (with referrer restrictions), while a service account key is not?",
    options: [
      { key: "A", text: "The web API key only identifies the project; access is enforced by Security Rules. A service account key grants privileged server access that bypasses rules." },
      { key: "B", text: "The web API key is encrypted in the bundle." },
      { key: "C", text: "They are equally dangerous to expose." },
      { key: "D", text: "Service account keys expire hourly so exposure doesn't matter." }
    ],
    correctAnswer: "A",
    explanation: "Client config identifies your project — Security Rules are the actual access control. Admin SDK service-account credentials bypass rules entirely, which is why they must never reach a client.",
    technicalResources: [{ name: "API Keys in Firebase", url: "https://firebase.google.com/docs/projects/api-keys", type: "docs" }]
  },
  {
    id: "quiz-fb-1-q3",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-1",
    type: "multi_select",
    difficulty: "medium",
    question: "Which statements about the Firebase/GCP relationship are true? (Select all that apply)",
    options: [
      { key: "A", text: "A Firebase project is a full GCP project visible in the GCP Console." },
      { key: "B", text: "Cloud Functions and App Hosting require the Blaze (pay-as-you-go) plan." },
      { key: "C", text: "Firebase projects cannot use non-Firebase GCP services like BigQuery." },
      { key: "D", text: "Budget alerts in GCP Billing are a recommended day-one setup." }
    ],
    correctAnswer: ["A", "B", "D"],
    explanation: "Firebase projects ARE GCP projects, so all GCP services (BigQuery, Cloud Run, etc.) are available. Blaze is required for Functions/App Hosting, and budget alerts protect you from cost surprises.",
    technicalResources: [{ name: "Firebase Pricing", url: "https://firebase.google.com/pricing", type: "docs" }]
  },

  // ── Module 2 ──
  {
    id: "quiz-fb-2-q1",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-2",
    type: "multi_select",
    difficulty: "hard",
    question: "Which are valid security practices when working with Firebase Authentication custom claims? (Select all that apply)",
    options: [
      { key: "A", text: "Set custom claims exclusively from server-side environments using the Firebase Admin SDK." },
      { key: "B", text: "Hardcode role claims directly inside client-side JavaScript." },
      { key: "C", text: "Force token refresh with getIdToken(true) after updating claims so the client receives the updated JWT." },
      { key: "D", text: "Ship the Admin SDK service account private key inside the client bundle." }
    ],
    correctAnswer: ["A", "C"],
    explanation: "Claims are written server-side only, and they only appear in the next minted token — so the client must force a refresh to see a newly granted role.",
    technicalResources: [{ name: "Custom Claims", url: "https://firebase.google.com/docs/auth/admin/custom-claims", type: "docs" }]
  },
  {
    id: "quiz-fb-2-q2",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-2",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Why should UI never be gated on a one-time auth check instead of onAuthStateChanged?",
    options: [
      { key: "A", text: "One-time checks are slower than listeners." },
      { key: "B", text: "Session restoration from persistence is asynchronous — at first render currentUser may be null even though the user is signed in." },
      { key: "C", text: "onAuthStateChanged encrypts the session." },
      { key: "D", text: "One-time checks consume extra Firestore reads." }
    ],
    correctAnswer: "B",
    explanation: "The SDK restores sessions from IndexedDB asynchronously. onAuthStateChanged fires once restoration resolves, making it the only reliable source of truth for sign-in state.",
    technicalResources: [{ name: "Auth State Persistence", url: "https://firebase.google.com/docs/auth/web/auth-state-persistence", type: "docs" }]
  },
  {
    id: "quiz-fb-2-q3",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-2",
    type: "code_output",
    difficulty: "hard",
    question: "An Express API verifies tokens with admin.auth().verifyIdToken(token). An attacker sends a well-formed but self-signed JWT with { uid: 'victim', academyRole: 'INSTRUCTOR' }. What happens?",
    codeSnippet: `const decoded = await admin.auth().verifyIdToken(bearerToken);\nif (decoded.academyRole !== 'INSTRUCTOR') throw new Error('Forbidden');\n// ...privileged operation`,
    options: [
      { key: "A", text: "The privileged operation runs — the payload says INSTRUCTOR." },
      { key: "B", text: "verifyIdToken rejects the token because its signature was not produced by Google's keys for this project; the request fails before the role check." },
      { key: "C", text: "The request succeeds only if sent over HTTP." },
      { key: "D", text: "Express blocks it automatically via CORS." }
    ],
    correctAnswer: "B",
    explanation: "JWT security rests on signature verification. verifyIdToken validates the token against Google's public keys and the project's issuer/audience — a self-signed token throws, so the payload is never trusted.",
    technicalResources: [{ name: "Verify ID Tokens", url: "https://firebase.google.com/docs/auth/admin/verify-id-tokens", type: "docs" }]
  },

  // ── Module 3 ──
  {
    id: "quiz-fb-3-q1",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-3",
    type: "code_output",
    difficulty: "medium",
    question: "What happens when this Firestore query runs for the first time with no matching index configured?",
    codeSnippet: `const q = query(\n  collection(db, "enrollments"),\n  where("status", "==", "PASSED"),\n  orderBy("score", "desc"),\n  limit(5)\n);\nconst snapshot = await getDocs(q);`,
    options: [
      { key: "A", text: "It fails with a failed-precondition error containing a console link that creates the required compound index." },
      { key: "B", text: "It always returns 5 documents without needing an index." },
      { key: "C", text: "It throws a syntax error on orderBy." },
      { key: "D", text: "It silently returns an empty result set forever." }
    ],
    correctAnswer: "A",
    explanation: "Combining an equality filter with orderBy on a different field requires a compound index. Firestore fails fast and helpfully — the error includes a link that creates the exact index.",
    technicalResources: [{ name: "Firestore Indexing", url: "https://firebase.google.com/docs/firestore/query-data/indexing", type: "docs" }]
  },
  {
    id: "quiz-fb-3-q2",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-3",
    type: "architecture_scenario",
    difficulty: "hard",
    question: "You must show 'all enrollments for a student across all courses' on one screen. Which schema choice supports this with a single query?",
    options: [
      { key: "A", text: "Subcollection courses/{courseId}/enrollments/{id} — query each course separately." },
      { key: "B", text: "A root 'enrollments' collection with a userId field (optionally denormalizing courseTitle into each doc)." },
      { key: "C", text: "Store an array of all enrollments inside the user document regardless of size." },
      { key: "D", text: "Use SQL JOINs across collections." }
    ],
    correctAnswer: "B",
    explanation: "Cross-parent queries favor root collections: where('userId','==',uid) is one query. Denormalizing courseTitle avoids N+1 follow-up reads. Firestore has no joins, and unbounded arrays risk the 1 MiB doc limit.",
    technicalResources: [{ name: "Firestore Data Model", url: "https://firebase.google.com/docs/firestore/data-model", type: "docs" }]
  },
  {
    id: "quiz-fb-3-q3",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-3",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Why is cursor pagination (startAfter) preferred over offset-style pagination in Firestore?",
    options: [
      { key: "A", text: "Offsets are not supported in any form." },
      { key: "B", text: "With offsets you are billed for all skipped documents; cursors read (and bill) only the page you return." },
      { key: "C", text: "Cursors automatically create indexes." },
      { key: "D", text: "startAfter enables writes during reads." }
    ],
    correctAnswer: "B",
    explanation: "Reads are Firestore's billing unit. An offset of 10,000 bills 10,000 reads before returning your page; a cursor jumps straight to position via the index.",
    technicalResources: [{ name: "Query Cursors", url: "https://firebase.google.com/docs/firestore/query-data/query-cursors", type: "docs" }]
  },

  // ── Module 4 ──
  {
    id: "quiz-fb-4-q1",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-4",
    type: "architecture_scenario",
    difficulty: "hard",
    question: "Students may edit only their own profile; instructors may read all profiles. Which rule enforces this correctly?",
    options: [
      { key: "A", text: "allow read, write: if true;" },
      { key: "B", text: "allow read: if isOwner(userId) || hasRole('INSTRUCTOR'); allow write: if isOwner(userId); — with helpers checking request.auth.uid and request.auth.token.academyRole" },
      { key: "C", text: "allow read, write: if request.auth != null;" },
      { key: "D", text: "allow read, write: if request.origin == 'https://ndnanalytics.com';" }
    ],
    correctAnswer: "B",
    explanation: "Ownership comes from request.auth.uid == userId; role comes from the JWT custom claim via request.auth.token. Option C lets any signed-in stranger read/write everything; D relies on a spoofable notion that rules don't even support.",
    technicalResources: [{ name: "Rules Conditions", url: "https://firebase.google.com/docs/firestore/security/rules-conditions", type: "docs" }]
  },
  {
    id: "quiz-fb-4-q2",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-4",
    type: "debugging",
    difficulty: "hard",
    question: "A rule validates writes with resource.data.score <= 100, yet clients successfully create documents with score: 999. Why?",
    codeSnippet: `match /enrollments/{id} {\n  allow create: if request.auth != null\n    && resource.data.score <= 100;\n}`,
    options: [
      { key: "A", text: "Numbers can't be compared in rules." },
      { key: "B", text: "On create, resource.data refers to the (non-existent) existing document — the incoming payload is request.resource.data, so the check never sees the new score." },
      { key: "C", text: "The rule needs allow write instead of allow create." },
      { key: "D", text: "score must be quoted as a string." }
    ],
    correctAnswer: "B",
    explanation: "resource.data is the pre-write document; request.resource.data is the incoming write. Confusing the two is the classic rules bug — validation must read request.resource.data.score.",
    technicalResources: [{ name: "Rules Data Validation", url: "https://firebase.google.com/docs/firestore/security/rules-conditions#data_validation", type: "docs" }]
  },
  {
    id: "quiz-fb-4-q3",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-4",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Why does the query getDocs(query(collection(db,'users'))) fail for a signed-in user when rules only allow reading your own profile?",
    options: [
      { key: "A", text: "Rules are not filters: a query must be provably safe for every possible result, so an unrestricted collection read is rejected outright rather than silently filtered." },
      { key: "B", text: "The user's token expired." },
      { key: "C", text: "Collection reads require an index." },
      { key: "D", text: "getDocs cannot be used on the users collection." }
    ],
    correctAnswer: "A",
    explanation: "Firestore evaluates whether the query could ever return a disallowed document. The fix is querying within your permission envelope, e.g. where(documentId(), '==', uid) or a direct doc get.",
    technicalResources: [{ name: "Rules and Queries", url: "https://firebase.google.com/docs/firestore/security/rules-query", type: "docs" }]
  },

  // ── Module 5 ──
  {
    id: "quiz-fb-5-q1",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-5",
    type: "multiple_choice",
    difficulty: "hard",
    question: "A Firestore-triggered function occasionally sends duplicate welcome emails. What is the root cause and correct fix?",
    options: [
      { key: "A", text: "A Firebase bug — add a try/catch." },
      { key: "B", text: "Event delivery is at-least-once; make the handler idempotent, e.g. key the side effect by event/document ID so replays overwrite instead of duplicate." },
      { key: "C", text: "Increase function memory to 1GiB." },
      { key: "D", text: "Switch the trigger to onDocumentUpdated." }
    ],
    correctAnswer: "B",
    explanation: "At-least-once delivery means occasional replays are by design. Idempotent handlers (deterministic side-effect keys, existence checks) are the required engineering response.",
    technicalResources: [{ name: "Functions Tips", url: "https://firebase.google.com/docs/functions/tips", type: "docs" }]
  },
  {
    id: "quiz-fb-5-q2",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-5",
    type: "multiple_choice",
    difficulty: "medium",
    question: "What does an onCall (callable) function give you that a raw onRequest HTTPS function does not?",
    options: [
      { key: "A", text: "Automatic CORS handling and pre-verified Firebase auth context (request.auth) without writing middleware." },
      { key: "B", text: "Faster cold starts." },
      { key: "C", text: "The ability to be triggered by Firestore writes." },
      { key: "D", text: "Free execution on the Spark plan." }
    ],
    correctAnswer: "A",
    explanation: "Callables integrate with the client SDK: the ID token is attached and verified automatically, CORS is handled, and typed errors (HttpsError) propagate cleanly to the client.",
    technicalResources: [{ name: "Callable Functions", url: "https://firebase.google.com/docs/functions/callable", type: "docs" }]
  },
  {
    id: "quiz-fb-5-q3",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-5",
    type: "multi_select",
    difficulty: "medium",
    question: "Which techniques genuinely reduce Cloud Functions cold-start latency? (Select all that apply)",
    options: [
      { key: "A", text: "Set minInstances: 1 on latency-critical functions." },
      { key: "B", text: "Lazy-import heavy SDKs inside the handler instead of at module top-level." },
      { key: "C", text: "Initialize reusable clients at module scope so warm instances reuse them." },
      { key: "D", text: "Add more console.log statements." }
    ],
    correctAnswer: ["A", "B", "C"],
    explanation: "minInstances keeps an instance warm; smaller startup bundles load faster; module-scope clients amortize initialization across invocations. Logging does nothing for startup latency.",
    technicalResources: [{ name: "Manage Functions Performance", url: "https://firebase.google.com/docs/functions/manage-functions", type: "docs" }]
  },

  // ── Module 6 ──
  {
    id: "quiz-fb-6-q1",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-6",
    type: "debugging",
    difficulty: "hard",
    question: "A container deploys to Cloud Run but the revision fails: 'container failed to start and listen on the port'. Locally it works with 'node server.js'. The most likely bug?",
    codeSnippet: `app.listen(3000, "localhost", () => {\n  console.log("listening on 3000");\n});`,
    options: [
      { key: "A", text: "Cloud Run doesn't support Express." },
      { key: "B", text: "The server binds a hardcoded port on localhost — it must listen on process.env.PORT and bind 0.0.0.0 to pass Cloud Run's health check." },
      { key: "C", text: "The Dockerfile is missing an EXPOSE line, which is mandatory." },
      { key: "D", text: "Node 22 is not supported on Cloud Run." }
    ],
    correctAnswer: "B",
    explanation: "Cloud Run injects PORT and probes it over the container's external interface. Binding localhost:3000 makes the health check unreachable. EXPOSE is documentation only.",
    technicalResources: [{ name: "Container Contract", url: "https://cloud.google.com/run/docs/container-contract", type: "docs" }]
  },
  {
    id: "quiz-fb-6-q2",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-6",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Your Cloud Run API is deployed with --allow-unauthenticated yet is still secure for user data. What makes this correct?",
    options: [
      { key: "A", text: "Nothing — it's always a misconfiguration." },
      { key: "B", text: "Application-level auth: middleware verifies the Firebase ID token on every request, so 'unauthenticated' only refers to the IAM layer for public reachability." },
      { key: "C", text: "Cloud Run encrypts all traffic, which is sufficient." },
      { key: "D", text: "The VPC firewall blocks external users." }
    ],
    correctAnswer: "B",
    explanation: "There are two auth layers: IAM invoker permissions (service-to-service) and application auth (end users). Public web APIs typically allow unauthenticated invocation and enforce identity in middleware via verifyIdToken.",
    technicalResources: [{ name: "Cloud Run Authentication", url: "https://cloud.google.com/run/docs/authenticating/overview", type: "docs" }]
  },
  {
    id: "quiz-fb-6-q3",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-6",
    type: "multiple_choice",
    difficulty: "medium",
    question: "For a memory-heavy PDF-rendering endpoint on Cloud Run, why would you lower concurrency from the default 80 to ~8?",
    options: [
      { key: "A", text: "Lower concurrency reduces per-request billing." },
      { key: "B", text: "Each instance handles fewer simultaneous heavy requests, preventing memory exhaustion; the autoscaler adds instances instead." },
      { key: "C", text: "Cloud Run requires concurrency below 10 for binary responses." },
      { key: "D", text: "It disables cold starts." }
    ],
    correctAnswer: "B",
    explanation: "Concurrency is a per-instance protection dial. Heavy per-request memory means fewer concurrent requests per instance; capacity comes from horizontal scaling instead of overloading one container.",
    technicalResources: [{ name: "Concurrency Settings", url: "https://cloud.google.com/run/docs/about-concurrency", type: "docs" }]
  },

  // ── Module 7 ──
  {
    id: "quiz-fb-7-q1",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-7",
    type: "debugging",
    difficulty: "hard",
    question: "After deploying to App Hosting, import.meta.env.VITE_FIREBASE_API_KEY is undefined in the browser, though the secret is bound in apphosting.yaml with availability: [RUNTIME]. Why?",
    codeSnippet: `env:\n  - variable: VITE_FIREBASE_API_KEY\n    secret: firebaseApiKey\n    availability: [RUNTIME]`,
    options: [
      { key: "A", text: "The secret name must be uppercase." },
      { key: "B", text: "Vite inlines VITE_* variables at build time — the variable needs BUILD availability, otherwise the compiled bundle never received the value." },
      { key: "C", text: "App Hosting cannot serve Vite apps." },
      { key: "D", text: "Secrets cannot be used for client variables under any configuration." }
    ],
    correctAnswer: "B",
    explanation: "RUNTIME availability exposes values to the server process only. Vite substitutes import.meta.env.* during compilation, so client-visible variables need availability: [BUILD] (or [BUILD, RUNTIME]).",
    technicalResources: [{ name: "Configure App Hosting", url: "https://firebase.google.com/docs/app-hosting/configure", type: "docs" }]
  },
  {
    id: "quiz-fb-7-q2",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-7",
    type: "multiple_choice",
    difficulty: "medium",
    question: "What happens when an App Hosting rollout's new revision fails its health checks?",
    options: [
      { key: "A", text: "The site goes down until you fix it." },
      { key: "B", text: "The rollout halts automatically and the previous healthy revision continues serving traffic." },
      { key: "C", text: "Traffic splits 50/50 between broken and healthy revisions." },
      { key: "D", text: "GitHub reverts your commit automatically." }
    ],
    correctAnswer: "B",
    explanation: "Rollouts are health-gated: a failing revision never takes traffic, and the last good revision keeps serving. This is the safety property that makes push-to-deploy viable.",
    technicalResources: [{ name: "App Hosting Rollouts", url: "https://firebase.google.com/docs/app-hosting", type: "docs" }]
  },
  {
    id: "quiz-fb-7-q3",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-7",
    type: "multi_select",
    difficulty: "medium",
    question: "Which are correct practices for secrets on App Hosting? (Select all that apply)",
    options: [
      { key: "A", text: "Store values in Secret Manager and reference them by name in apphosting.yaml." },
      { key: "B", text: "Commit a .env.production file to the repo so builds can read it." },
      { key: "C", text: "Grant the backend access with firebase apphosting:secrets:grantaccess." },
      { key: "D", text: "Rotate by adding a new secret version rather than editing code." }
    ],
    correctAnswer: ["A", "C", "D"],
    explanation: "Secrets live in Secret Manager with explicit backend grants; the YAML holds references only. Committing production secrets to git is the anti-pattern all of this exists to prevent.",
    technicalResources: [{ name: "App Hosting Secrets", url: "https://firebase.google.com/docs/app-hosting/configure#secret-parameters", type: "docs" }]
  }
];
