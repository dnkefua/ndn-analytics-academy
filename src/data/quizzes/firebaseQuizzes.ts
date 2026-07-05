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

  {
    id: "quiz-fb-1-q4",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-1",
    type: "multiple_choice",
    difficulty: "easy",
    question: "In a Vite app, why must client-exposed Firebase config variables be prefixed with VITE_?",
    options: [
      { key: "A", text: "Vite only exposes variables prefixed with VITE_ to client code via import.meta.env; unprefixed vars stay server-only." },
      { key: "B", text: "VITE_ encrypts the variable in the bundle." },
      { key: "C", text: "Firebase requires the prefix." },
      { key: "D", text: "It is only a naming convention with no effect." }
    ],
    correctAnswer: "A",
    explanation: "Vite deliberately withholds env vars from the client unless they carry the VITE_ prefix, preventing accidental exposure of server secrets in the browser bundle.",
    technicalResources: [{ name: "Vite Env Variables", url: "https://vitejs.dev/guide/env-and-mode", type: "docs" }]
  },
  {
    id: "quiz-fb-1-q5",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-1",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Which Firebase billing plan is required to use Cloud Functions and App Hosting?",
    options: [
      { key: "A", text: "Spark (free) plan." },
      { key: "B", text: "Blaze (pay-as-you-go) plan, because these services incur outbound networking and compute billing." },
      { key: "C", text: "Any plan — they are always free." },
      { key: "D", text: "A separate GCP-only plan unrelated to Firebase." }
    ],
    correctAnswer: "B",
    explanation: "Cloud Functions, App Hosting, and outbound networking require the Blaze pay-as-you-go plan; the Spark plan cannot provision them.",
    technicalResources: [{ name: "Firebase Pricing", url: "https://firebase.google.com/pricing", type: "docs" }]
  },
  {
    id: "quiz-fb-1-q6",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-1",
    type: "code_output",
    difficulty: "medium",
    question: "What error does calling initializeApp(config) twice with the same default name throw, and how is it avoided?",
    codeSnippet: `initializeApp(firebaseConfig);\ninitializeApp(firebaseConfig); // second call`,
    options: [
      { key: "A", text: "It throws 'app/duplicate-app'; guard with getApps().length ? getApp() : initializeApp(config)." },
      { key: "B", text: "It silently returns the same app; no guard needed." },
      { key: "C", text: "It throws 'auth/invalid-api-key'." },
      { key: "D", text: "It creates two independent apps with no error." }
    ],
    correctAnswer: "A",
    explanation: "Re-initializing the default app throws app/duplicate-app. The getApps() guard makes initialization idempotent under HMR and StrictMode re-execution.",
    technicalResources: [{ name: "Firebase Web Setup", url: "https://firebase.google.com/docs/web/setup", type: "docs" }]
  },
  {
    id: "quiz-fb-1-q7",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-1",
    type: "multiple_choice",
    difficulty: "easy",
    question: "Where should you restrict a Firebase web API key before production launch?",
    options: [
      { key: "A", text: "In the .env file with a comment." },
      { key: "B", text: "In GCP Console → Credentials, by restricting it to your production HTTP referrer origins." },
      { key: "C", text: "It cannot be restricted." },
      { key: "D", text: "In firestore.rules." }
    ],
    correctAnswer: "B",
    explanation: "Although the web API key isn't a secret, restricting it to your referrer origins in GCP Credentials limits where it can be used, reducing abuse.",
    technicalResources: [{ name: "API Keys in Firebase", url: "https://firebase.google.com/docs/projects/api-keys", type: "docs" }]
  },
  {
    id: "quiz-fb-1-q8",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-1",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Why is separating dev, staging, and prod into distinct Firebase projects recommended?",
    options: [
      { key: "A", text: "It is cheaper." },
      { key: "B", text: "Each Firebase project is an isolation boundary for data, security rules, quotas, and billing — preventing dev activity from touching prod." },
      { key: "C", text: "Firebase requires at least three projects." },
      { key: "D", text: "It disables Security Rules in dev." }
    ],
    correctAnswer: "B",
    explanation: "Project-level isolation keeps environments' data, rules, and billing fully separate, so testing can't corrupt or read production data.",
    technicalResources: [{ name: "Firebase Projects", url: "https://firebase.google.com/docs/projects/learn-more", type: "docs" }]
  },
  {
    id: "quiz-fb-1-q9",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-1",
    type: "multiple_choice",
    difficulty: "easy",
    question: "What is the purpose of a connection health-check script right after SDK initialization?",
    options: [
      { key: "A", text: "To seed the database with demo data." },
      { key: "B", text: "To verify the backend is reachable and configured correctly before building UI, isolating config errors from app bugs." },
      { key: "C", text: "To bypass Security Rules." },
      { key: "D", text: "To compile TypeScript." }
    ],
    correctAnswer: "B",
    explanation: "A minimal health check confirms connectivity and configuration early, so silent misconfigurations don't surface later as confusing UI failures.",
    technicalResources: [{ name: "Firebase CLI", url: "https://firebase.google.com/docs/cli", type: "docs" }]
  },
  {
    id: "quiz-fb-1-q10",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-1",
    type: "multiple_choice",
    difficulty: "medium",
    question: "A learner gets 'invalid-api-key' at initialization even though the key is correct in .env. What is the most likely cause?",
    options: [
      { key: "A", text: "The .env file isn't being loaded — wrong filename or missing VITE_ prefix, so import.meta.env values are undefined." },
      { key: "B", text: "The Firebase project was deleted." },
      { key: "C", text: "Firestore rules deny reads." },
      { key: "D", text: "Node version is too old." }
    ],
    correctAnswer: "A",
    explanation: "invalid-api-key with a correct key almost always means the env values are undefined at runtime — log import.meta.env; usually the .env filename or VITE_ prefix is wrong.",
    technicalResources: [{ name: "Vite Env Variables", url: "https://vitejs.dev/guide/env-and-mode", type: "docs" }]
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

  {
    id: "quiz-fb-2-q4",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-2",
    type: "multiple_choice",
    difficulty: "easy",
    question: "How long is a Firebase ID token (JWT) valid before it must be refreshed?",
    options: [
      { key: "A", text: "One hour; the SDK refreshes it automatically." },
      { key: "B", text: "24 hours." },
      { key: "C", text: "It never expires." },
      { key: "D", text: "Five minutes." }
    ],
    correctAnswer: "A",
    explanation: "Firebase ID tokens expire after one hour. The client SDK transparently refreshes them, but newly granted custom claims only appear after a refresh.",
    technicalResources: [{ name: "ID Tokens", url: "https://firebase.google.com/docs/auth/admin/verify-id-tokens", type: "docs" }]
  },
  {
    id: "quiz-fb-2-q5",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-2",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Which observer should gate your app's authenticated UI, and why?",
    options: [
      { key: "A", text: "A one-time check of auth.currentUser at startup." },
      { key: "B", text: "onAuthStateChanged, because session restoration from persistence is asynchronous and currentUser may be null at first render." },
      { key: "C", text: "A setInterval polling loop." },
      { key: "D", text: "The Firestore snapshot listener." }
    ],
    correctAnswer: "B",
    explanation: "onAuthStateChanged is the source of truth: it fires after the SDK asynchronously restores the session, unlike a one-time currentUser read.",
    technicalResources: [{ name: "Auth State Persistence", url: "https://firebase.google.com/docs/auth/web/auth-state-persistence", type: "docs" }]
  },
  {
    id: "quiz-fb-2-q6",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-2",
    type: "architecture_scenario",
    difficulty: "medium",
    question: "You need role-based permission checks in Firestore rules without extra database reads. What is the idiomatic approach?",
    options: [
      { key: "A", text: "Store roles in a separate collection and read it inside every rule." },
      { key: "B", text: "Set a custom claim server-side; rules read it via request.auth.token with zero extra reads." },
      { key: "C", text: "Encode the role in the document ID." },
      { key: "D", text: "Trust a role field sent by the client." }
    ],
    correctAnswer: "B",
    explanation: "Custom claims live in the JWT, so request.auth.token.<claim> is available in rules at no read cost — unlike a lookup collection which bills a read per evaluation.",
    technicalResources: [{ name: "Custom Claims", url: "https://firebase.google.com/docs/auth/admin/custom-claims", type: "docs" }]
  },
  {
    id: "quiz-fb-2-q7",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-2",
    type: "debugging",
    difficulty: "medium",
    question: "After granting a user an INSTRUCTOR claim server-side, the client still sees no role. What's missing?",
    options: [
      { key: "A", text: "The client must call getIdToken(true) to force a token refresh and pick up the new claim." },
      { key: "B", text: "The user must be deleted and recreated." },
      { key: "C", text: "Custom claims don't work on the web." },
      { key: "D", text: "The Firestore rules must be redeployed." }
    ],
    correctAnswer: "A",
    explanation: "Claims apply to the next minted token. Forcing a refresh with getIdToken(true) delivers the updated JWT immediately instead of waiting up to an hour.",
    technicalResources: [{ name: "Propagating Claims", url: "https://firebase.google.com/docs/auth/admin/custom-claims#propagate_custom_claims_to_the_client", type: "docs" }]
  },
  {
    id: "quiz-fb-2-q8",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-2",
    type: "multiple_choice",
    difficulty: "hard",
    question: "Why must a custom backend API verify Firebase ID tokens with admin.auth().verifyIdToken rather than trusting the decoded payload?",
    options: [
      { key: "A", text: "To decompress the token." },
      { key: "B", text: "verifyIdToken checks the cryptographic signature against Google's keys and the issuer/audience; a self-signed forgery is rejected before any claim is trusted." },
      { key: "C", text: "It caches the token for speed." },
      { key: "D", text: "It is only needed in development." }
    ],
    correctAnswer: "B",
    explanation: "JWT security rests on signature verification. Decoding alone trusts attacker-controlled data; verifyIdToken validates authenticity against Google's public keys.",
    technicalResources: [{ name: "Verify ID Tokens", url: "https://firebase.google.com/docs/auth/admin/verify-id-tokens", type: "docs" }]
  },
  {
    id: "quiz-fb-2-q9",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-2",
    type: "multiple_choice",
    difficulty: "medium",
    question: "For mobile web where popups are frequently blocked, which sign-in method is more reliable?",
    options: [
      { key: "A", text: "signInWithPopup." },
      { key: "B", text: "signInWithRedirect, which navigates the full page instead of opening a popup window." },
      { key: "C", text: "signInAnonymously only." },
      { key: "D", text: "Disabling auth entirely." }
    ],
    correctAnswer: "B",
    explanation: "Embedded and mobile browsers often block popups; signInWithRedirect uses a full-page redirect flow that survives those restrictions.",
    technicalResources: [{ name: "Google Sign-In (Web)", url: "https://firebase.google.com/docs/auth/web/google-signin", type: "docs" }]
  },
  {
    id: "quiz-fb-2-q10",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-2",
    type: "multiple_choice",
    difficulty: "easy",
    question: "Before email/password or Google sign-in works, what must you do in the Firebase Console?",
    options: [
      { key: "A", text: "Nothing — all providers are enabled by default." },
      { key: "B", text: "Explicitly enable each authentication provider under the Authentication → Sign-in method section." },
      { key: "C", text: "Upgrade to a paid plan." },
      { key: "D", text: "Write custom Cloud Functions." }
    ],
    correctAnswer: "B",
    explanation: "Providers are disabled until you enable them per-project in the Console's Sign-in method tab; code alone won't authenticate against a disabled provider.",
    technicalResources: [{ name: "Password Auth (Web)", url: "https://firebase.google.com/docs/auth/web/password-auth", type: "docs" }]
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

  {
    id: "quiz-fb-3-q4",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-3",
    type: "multiple_choice",
    difficulty: "easy",
    question: "What is the maximum size of a single Firestore document?",
    options: [
      { key: "A", text: "1 MiB." },
      { key: "B", text: "10 MB." },
      { key: "C", text: "256 KB." },
      { key: "D", text: "Unlimited." }
    ],
    correctAnswer: "A",
    explanation: "Firestore caps a document at 1 MiB, which is why unbounded arrays or embedding large child lists in a parent document is risky.",
    technicalResources: [{ name: "Firestore Limits", url: "https://firebase.google.com/docs/firestore/quotas", type: "docs" }]
  },
  {
    id: "quiz-fb-3-q5",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-3",
    type: "architecture_scenario",
    difficulty: "medium",
    question: "Each screen should ideally be served by how many Firestore queries, and what technique enables this?",
    options: [
      { key: "A", text: "One query per field; use joins." },
      { key: "B", text: "One query; deliberately denormalize (duplicate) data so a screen's data lives together, since reads are the billing unit." },
      { key: "C", text: "As many as needed; reads are free." },
      { key: "D", text: "Zero; always use client-side caching only." }
    ],
    correctAnswer: "B",
    explanation: "Firestore has no joins and bills per read, so denormalizing to serve each screen with a single query is the standard performance/cost pattern.",
    technicalResources: [{ name: "Firestore Data Model", url: "https://firebase.google.com/docs/firestore/data-model", type: "docs" }]
  },
  {
    id: "quiz-fb-3-q6",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-3",
    type: "multiple_choice",
    difficulty: "medium",
    question: "When should you model children as a subcollection rather than a root collection?",
    options: [
      { key: "A", text: "When children are always fetched through their parent and you don't query across parents." },
      { key: "B", text: "Always — subcollections are strictly better." },
      { key: "C", text: "Never — subcollections are deprecated." },
      { key: "D", text: "Only for documents over 1 MiB." }
    ],
    correctAnswer: "A",
    explanation: "Subcollections fit parent-scoped access (a course's modules); root collections fit cross-parent queries (all of a user's enrollments regardless of course).",
    technicalResources: [{ name: "Data Model", url: "https://firebase.google.com/docs/firestore/data-model", type: "docs" }]
  },
  {
    id: "quiz-fb-3-q7",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-3",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Why should firestore.indexes.json be committed to git and deployed via the CLI?",
    options: [
      { key: "A", text: "It documents the app." },
      { key: "B", text: "So compound indexes stay reproducible across environments; index drift between dev and prod is a classic cause of prod query failures." },
      { key: "C", text: "Firestore requires it in the repo root." },
      { key: "D", text: "It improves write speed." }
    ],
    correctAnswer: "B",
    explanation: "Declaring indexes as code and deploying them keeps every environment consistent, avoiding 'works in dev, fails in prod' index errors.",
    technicalResources: [{ name: "Managing Indexes", url: "https://firebase.google.com/docs/firestore/query-data/indexing", type: "docs" }]
  },
  {
    id: "quiz-fb-3-q8",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-3",
    type: "code_output",
    difficulty: "hard",
    question: "In a React component, what happens if you call onSnapshot inside useEffect but forget to return the unsubscribe function?",
    codeSnippet: `useEffect(() => {\n  onSnapshot(q, snap => setDocs(snap.docs));\n  // no cleanup returned\n}, []);`,
    options: [
      { key: "A", text: "Nothing; Firestore auto-cleans listeners." },
      { key: "B", text: "The listener leaks — it keeps running (and billing) after unmount, the most common Firestore memory bug." },
      { key: "C", text: "It throws a compile error." },
      { key: "D", text: "The query never fires." }
    ],
    correctAnswer: "B",
    explanation: "onSnapshot returns an unsubscribe function; returning it from useEffect tears the listener down on unmount. Omitting it leaks the listener and its billed reads.",
    technicalResources: [{ name: "Realtime Updates", url: "https://firebase.google.com/docs/firestore/query-data/listen", type: "docs" }]
  },
  {
    id: "quiz-fb-3-q9",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-3",
    type: "multiple_choice",
    difficulty: "medium",
    question: "What makes Firestore apps feel real-time even before the server confirms a write?",
    options: [
      { key: "A", text: "Server-side rendering." },
      { key: "B", text: "Latency compensation: local writes are reflected immediately in listeners, then reconciled with the server." },
      { key: "C", text: "A polling loop every 100ms." },
      { key: "D", text: "WebRTC." }
    ],
    correctAnswer: "B",
    explanation: "Firestore applies local mutations optimistically and surfaces them to onSnapshot listeners instantly, reconciling with the authoritative server result afterward.",
    technicalResources: [{ name: "Realtime Updates", url: "https://firebase.google.com/docs/firestore/query-data/listen", type: "docs" }]
  },
  {
    id: "quiz-fb-3-q10",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-3",
    type: "multiple_choice",
    difficulty: "hard",
    question: "A compound query filters status == 'ACTIVE' and orders by createdAt. What index is required?",
    options: [
      { key: "A", text: "None; single-field indexes cover it." },
      { key: "B", text: "A composite index on (status ASC, createdAt) because equality plus an orderBy on a different field needs a compound index." },
      { key: "C", text: "A full-text search index." },
      { key: "D", text: "A geospatial index." }
    ],
    correctAnswer: "B",
    explanation: "Combining an equality filter with an orderBy on a different field requires a composite index; Firestore fails fast with a link to create the exact one.",
    technicalResources: [{ name: "Index Types", url: "https://firebase.google.com/docs/firestore/query-data/index-overview", type: "docs" }]
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

  {
    id: "quiz-fb-4-q4",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-4",
    type: "multiple_choice",
    difficulty: "medium",
    question: "What is the correct default posture for a Firestore ruleset?",
    options: [
      { key: "A", text: "Allow everything, then block specific paths." },
      { key: "B", text: "Deny by default (implicit), then explicitly allow specific, verified operations — zero trust." },
      { key: "C", text: "Allow all reads, deny all writes." },
      { key: "D", text: "Rules should be left empty in production." }
    ],
    correctAnswer: "B",
    explanation: "Zero-trust rules start from implicit deny and grant only verified operations. A broad 'allow ... if true' anywhere is a total breach.",
    technicalResources: [{ name: "Get Started with Rules", url: "https://firebase.google.com/docs/firestore/security/get-started", type: "docs" }]
  },
  {
    id: "quiz-fb-4-q5",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-4",
    type: "debugging",
    difficulty: "hard",
    question: "A rule uses `allow update: if request.resource.data.userId == resource.data.userId`. What does this enforce?",
    options: [
      { key: "A", text: "It makes userId immutable — an update cannot change the document's owner." },
      { key: "B", text: "It allows anyone to update." },
      { key: "C", text: "It deletes the userId field." },
      { key: "D", text: "It is a syntax error." }
    ],
    correctAnswer: "A",
    explanation: "Comparing the incoming (request.resource.data) userId to the existing (resource.data) userId forbids reassigning ownership, making the field immutable on update.",
    technicalResources: [{ name: "Rules Conditions", url: "https://firebase.google.com/docs/firestore/security/rules-conditions", type: "docs" }]
  },
  {
    id: "quiz-fb-4-q6",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-4",
    type: "multiple_choice",
    difficulty: "hard",
    question: "Why is `allow read, write: if request.auth != null;` an insecure pattern?",
    options: [
      { key: "A", text: "It blocks all access." },
      { key: "B", text: "It grants any signed-in user (including strangers) full read/write to the matched path, providing no ownership or role scoping." },
      { key: "C", text: "It only works in the emulator." },
      { key: "D", text: "It requires a compound index." }
    ],
    correctAnswer: "B",
    explanation: "Authenticated is not authorized: this lets every logged-in user touch the data. Real rules also check ownership (uid) and/or role claims.",
    technicalResources: [{ name: "Rules Conditions", url: "https://firebase.google.com/docs/firestore/security/rules-conditions", type: "docs" }]
  },
  {
    id: "quiz-fb-4-q7",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-4",
    type: "multiple_choice",
    difficulty: "medium",
    question: "How should Security Rules be tested before deployment?",
    options: [
      { key: "A", text: "Deploy to prod and watch for complaints." },
      { key: "B", text: "Unit-test against the Firestore emulator with @firebase/rules-unit-testing, covering both happy paths and attack scenarios." },
      { key: "C", text: "Rules can't be tested." },
      { key: "D", text: "Manually click through the app once." }
    ],
    correctAnswer: "B",
    explanation: "The emulator plus rules-unit-testing lets you assertSucceeds/assertFails for different authenticated contexts, making rules a CI-gated, testable artifact.",
    technicalResources: [{ name: "Test Rules", url: "https://firebase.google.com/docs/firestore/security/test-rules-emulator", type: "docs" }]
  },
  {
    id: "quiz-fb-4-q8",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-4",
    type: "code_output",
    difficulty: "medium",
    question: "Which validation ensures a created enrollment's status is one of a fixed set?",
    codeSnippet: `allow create: if request.resource.data.status in ['ACTIVE','PASSED','WITHDRAWN'];`,
    options: [
      { key: "A", text: "It restricts status to the allowed enum values, rejecting any other string at write time." },
      { key: "B", text: "It sets a default status." },
      { key: "C", text: "It reads status from another document." },
      { key: "D", text: "It has no effect." }
    ],
    correctAnswer: "A",
    explanation: "The `in` operator against a literal list enforces an enum on writes, turning an invalid status from a runtime surprise into a rejected write.",
    technicalResources: [{ name: "Data Validation", url: "https://firebase.google.com/docs/firestore/security/rules-conditions#data_validation", type: "docs" }]
  },
  {
    id: "quiz-fb-4-q9",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-4",
    type: "multiple_choice",
    difficulty: "hard",
    question: "Why does an unrestricted collection query fail under ownership-only rules instead of returning just the allowed documents?",
    options: [
      { key: "A", text: "Rules are filters that silently drop rows." },
      { key: "B", text: "Rules are not filters: a query must be provably safe for every possible result, so an over-broad query is rejected entirely." },
      { key: "C", text: "Queries always require an index." },
      { key: "D", text: "The emulator is required." }
    ],
    correctAnswer: "B",
    explanation: "Firestore rejects any query that could return a disallowed document. Constrain the query (e.g. where userId == uid) to stay within your permission envelope.",
    technicalResources: [{ name: "Rules and Queries", url: "https://firebase.google.com/docs/firestore/security/rules-query", type: "docs" }]
  },
  {
    id: "quiz-fb-4-q10",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-4",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Where does request.auth.token expose the roles you set as custom claims?",
    options: [
      { key: "A", text: "It doesn't; claims are only server-side." },
      { key: "B", text: "In request.auth.token.<claimName>, letting rules perform RBAC with zero extra reads." },
      { key: "C", text: "In resource.data." },
      { key: "D", text: "In request.query." }
    ],
    correctAnswer: "B",
    explanation: "The JWT payload — including custom claims — is available as request.auth.token, so role checks like request.auth.token.academyRole == 'INSTRUCTOR' cost no reads.",
    technicalResources: [{ name: "Rules Conditions", url: "https://firebase.google.com/docs/firestore/security/rules-conditions", type: "docs" }]
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

  {
    id: "quiz-fb-5-q4",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-5",
    type: "multiple_choice",
    difficulty: "medium",
    question: "2nd-gen Cloud Functions for Firebase are built on top of which service?",
    options: [
      { key: "A", text: "App Engine." },
      { key: "B", text: "Cloud Run, which is why they share concurrency and container semantics." },
      { key: "C", text: "Compute Engine VMs." },
      { key: "D", text: "Firebase Hosting." }
    ],
    correctAnswer: "B",
    explanation: "2nd-gen functions run on Cloud Run under the hood, inheriting concurrency, min/max instances, and container-based scaling.",
    technicalResources: [{ name: "Cloud Functions", url: "https://firebase.google.com/docs/functions", type: "docs" }]
  },
  {
    id: "quiz-fb-5-q5",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-5",
    type: "multiple_choice",
    difficulty: "easy",
    question: "What delivery guarantee do Firestore-triggered functions have?",
    options: [
      { key: "A", text: "Exactly-once." },
      { key: "B", text: "At-least-once, so a handler can occasionally receive the same event more than once." },
      { key: "C", text: "At-most-once." },
      { key: "D", text: "No guarantee at all." }
    ],
    correctAnswer: "B",
    explanation: "Event delivery is at-least-once; occasional replays are by design, which is why handlers must be idempotent.",
    technicalResources: [{ name: "Functions Tips", url: "https://firebase.google.com/docs/functions/tips", type: "docs" }]
  },
  {
    id: "quiz-fb-5-q6",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-5",
    type: "code_output",
    difficulty: "hard",
    question: "How do you make a welcome-email trigger idempotent under at-least-once delivery?",
    codeSnippet: `// trigger on enrollments/{id}`,
    options: [
      { key: "A", text: "Wrap the send in try/catch." },
      { key: "B", text: "Key the side effect by a deterministic id (e.g. event/document id) so a replay overwrites instead of duplicating." },
      { key: "C", text: "Increase memory to 1GiB." },
      { key: "D", text: "Switch to an HTTP trigger." }
    ],
    correctAnswer: "B",
    explanation: "Writing derived state under a deterministic key (like `emails/{docId}-welcome`) makes replays no-ops, achieving idempotency.",
    technicalResources: [{ name: "Functions Tips", url: "https://firebase.google.com/docs/functions/tips", type: "docs" }]
  },
  {
    id: "quiz-fb-5-q7",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-5",
    type: "multiple_choice",
    difficulty: "medium",
    question: "What is a cold start in Cloud Functions?",
    options: [
      { key: "A", text: "A function that returns cached data." },
      { key: "B", text: "The latency of provisioning a new instance to serve a request when none is warm (typically 1–4s for Node)." },
      { key: "C", text: "A deployment failure." },
      { key: "D", text: "A scheduled function." }
    ],
    correctAnswer: "B",
    explanation: "Cold starts are the spin-up cost of a fresh instance. They're mitigated with smaller bundles, module-scope client reuse, and minInstances.",
    technicalResources: [{ name: "Manage Functions", url: "https://firebase.google.com/docs/functions/manage-functions", type: "docs" }]
  },
  {
    id: "quiz-fb-5-q8",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-5",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Where should you initialize the Admin SDK and reusable API clients in a Cloud Function?",
    options: [
      { key: "A", text: "Inside the handler on every invocation." },
      { key: "B", text: "At module scope, so warm instances reuse the same clients across invocations." },
      { key: "C", text: "In a separate microservice." },
      { key: "D", text: "It doesn't matter." }
    ],
    correctAnswer: "B",
    explanation: "Module-scope initialization lets warm instances reuse connections, dramatically reducing per-invocation latency versus re-initializing in the handler.",
    technicalResources: [{ name: "Functions Tips", url: "https://firebase.google.com/docs/functions/tips", type: "docs" }]
  },
  {
    id: "quiz-fb-5-q9",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-5",
    type: "multiple_choice",
    difficulty: "medium",
    question: "How can you run and test Firestore triggers locally for free?",
    options: [
      { key: "A", text: "You cannot; triggers only run in production." },
      { key: "B", text: "With the Emulator Suite (firebase emulators:start --only functions,firestore), which fires triggers on local writes." },
      { key: "C", text: "By deploying to a staging project each time." },
      { key: "D", text: "With Docker Compose only." }
    ],
    correctAnswer: "B",
    explanation: "The Emulator Suite runs Functions against local Firestore, executing the full trigger event loop offline and for free.",
    technicalResources: [{ name: "Emulator Suite", url: "https://firebase.google.com/docs/emulator-suite", type: "docs" }]
  },
  {
    id: "quiz-fb-5-q10",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-5",
    type: "multiple_choice",
    difficulty: "hard",
    question: "Which setting eliminates cold-start latency for a user-facing callable at the cost of a small monthly charge?",
    options: [
      { key: "A", text: "concurrency: 1" },
      { key: "B", text: "minInstances: 1, which keeps one instance warm at all times." },
      { key: "C", text: "maxInstances: 1" },
      { key: "D", text: "timeoutSeconds: 540" }
    ],
    correctAnswer: "B",
    explanation: "Setting minInstances keeps warm instances ready, removing cold starts for latency-critical functions for roughly a few dollars per instance per month.",
    technicalResources: [{ name: "Manage Functions", url: "https://firebase.google.com/docs/functions/manage-functions", type: "docs" }]
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

  {
    id: "quiz-fb-6-q4",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-6",
    type: "multiple_choice",
    difficulty: "easy",
    question: "What environment variable does Cloud Run inject that your server MUST listen on?",
    options: [
      { key: "A", text: "HOST" },
      { key: "B", text: "PORT — the container must bind to it on 0.0.0.0 or the health check fails." },
      { key: "C", text: "NODE_ENV" },
      { key: "D", text: "GOOGLE_CLOUD_PROJECT" }
    ],
    correctAnswer: "B",
    explanation: "Cloud Run sets PORT and probes it. Binding a hardcoded port or localhost fails the health check and the revision never serves traffic.",
    technicalResources: [{ name: "Container Contract", url: "https://cloud.google.com/run/docs/container-contract", type: "docs" }]
  },
  {
    id: "quiz-fb-6-q5",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-6",
    type: "multiple_choice",
    difficulty: "medium",
    question: "What does an immutable Cloud Run revision enable?",
    options: [
      { key: "A", text: "Nothing useful." },
      { key: "B", text: "Instant rollback and traffic splitting, because each deploy is a fixed snapshot of image + config." },
      { key: "C", text: "Automatic code editing in production." },
      { key: "D", text: "Free egress." }
    ],
    correctAnswer: "B",
    explanation: "Because revisions are immutable, rollback is just reassigning traffic to a previous revision, and canaries are percentage splits between revisions.",
    technicalResources: [{ name: "Managing Revisions", url: "https://cloud.google.com/run/docs/managing/revisions", type: "docs" }]
  },
  {
    id: "quiz-fb-6-q6",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-6",
    type: "code_output",
    difficulty: "medium",
    question: "How does a Firebase client authenticate a call to your Cloud Run API?",
    codeSnippet: `const token = await auth.currentUser!.getIdToken();\nfetch(url, { headers: { Authorization: 'Bearer ' + token } });`,
    options: [
      { key: "A", text: "It sends the ID token as a Bearer header; the server verifies it with the Admin SDK before trusting the caller." },
      { key: "B", text: "It sends the raw password." },
      { key: "C", text: "It relies on cookies only." },
      { key: "D", text: "No auth is possible cross-service." }
    ],
    correctAnswer: "A",
    explanation: "The client attaches the Firebase ID token as a Bearer credential; middleware calls verifyIdToken to extend the zero-trust perimeter to your custom API.",
    technicalResources: [{ name: "Verify ID Tokens", url: "https://firebase.google.com/docs/auth/admin/verify-id-tokens", type: "docs" }]
  },
  {
    id: "quiz-fb-6-q7",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-6",
    type: "architecture_scenario",
    difficulty: "medium",
    question: "When should you choose Cloud Run over individual Cloud Functions?",
    options: [
      { key: "A", text: "Never; functions are always better." },
      { key: "B", text: "For custom runtimes, long-running requests, WebSockets, or a full web framework — Functions suit event glue." },
      { key: "C", text: "Only for static files." },
      { key: "D", text: "Only for cron jobs." }
    ],
    correctAnswer: "B",
    explanation: "Rule of thumb: Functions for event glue, Cloud Run for APIs and anything with its own framework, custom runtime, or long/streaming requests.",
    technicalResources: [{ name: "Cloud Run Docs", url: "https://cloud.google.com/run/docs", type: "docs" }]
  },
  {
    id: "quiz-fb-6-q8",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-6",
    type: "multiple_choice",
    difficulty: "medium",
    question: "What does 'scale-to-zero' mean for a Cloud Run service with min-instances 0?",
    options: [
      { key: "A", text: "The service is deleted when idle." },
      { key: "B", text: "It runs no instances (and costs nothing) while idle, spinning up on the next request." },
      { key: "C", text: "It caps at zero requests per second." },
      { key: "D", text: "It disables logging." }
    ],
    correctAnswer: "B",
    explanation: "With min-instances 0, idle services run no instances and incur no compute cost; the trade-off is a cold start on the next request.",
    technicalResources: [{ name: "Autoscaling", url: "https://cloud.google.com/run/docs/about-instance-autoscaling", type: "docs" }]
  },
  {
    id: "quiz-fb-6-q9",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-6",
    type: "debugging",
    difficulty: "medium",
    question: "A `gcloud run deploy --source .` build succeeds but the revision is 'unhealthy'. Where do you look first?",
    options: [
      { key: "A", text: "The Firestore rules." },
      { key: "B", text: "The revision's service logs (gcloud run services logs read) — the container's stdout usually shows why startup/health failed." },
      { key: "C", text: "The DNS records." },
      { key: "D", text: "The billing account." }
    ],
    correctAnswer: "B",
    explanation: "Service logs capture the container's stdout/stderr per revision and are the first stop for diagnosing startup and health-check failures.",
    technicalResources: [{ name: "Deploy from Source", url: "https://cloud.google.com/run/docs/deploying-source-code", type: "docs" }]
  },
  {
    id: "quiz-fb-6-q10",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-6",
    type: "multiple_choice",
    difficulty: "hard",
    question: "Why is `--allow-unauthenticated` acceptable for a public web API that verifies Firebase tokens in middleware?",
    options: [
      { key: "A", text: "It disables all security." },
      { key: "B", text: "It only opens the IAM invoker layer; your application middleware still enforces end-user identity via verifyIdToken." },
      { key: "C", text: "It is never acceptable." },
      { key: "D", text: "It encrypts the database." }
    ],
    correctAnswer: "B",
    explanation: "There are two auth layers: IAM invocation and application auth. Public web APIs allow unauthenticated invocation and enforce user identity in middleware.",
    technicalResources: [{ name: "Cloud Run Authentication", url: "https://cloud.google.com/run/docs/authenticating/overview", type: "docs" }]
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
  },
  {
    id: "quiz-fb-7-q4",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-7",
    type: "multiple_choice",
    difficulty: "medium",
    question: "What does apphosting.yaml declare?",
    options: [
      { key: "A", text: "Only the app's name." },
      { key: "B", text: "Compute resources (runConfig), environment variables, and secret bindings for the App Hosting backend." },
      { key: "C", text: "Firestore security rules." },
      { key: "D", text: "The Git commit message." }
    ],
    correctAnswer: "B",
    explanation: "apphosting.yaml is the declarative config controlling instance sizing/scaling, env vars, and Secret Manager references for the backend.",
    technicalResources: [{ name: "Configure App Hosting", url: "https://firebase.google.com/docs/app-hosting/configure", type: "docs" }]
  },
  {
    id: "quiz-fb-7-q5",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-7",
    type: "debugging",
    difficulty: "hard",
    question: "A VITE_ variable is undefined in the browser though it's bound with availability [RUNTIME]. Why?",
    options: [
      { key: "A", text: "The secret name must be uppercase." },
      { key: "B", text: "Vite inlines VITE_* variables at build time, so the variable needs BUILD availability, not just RUNTIME." },
      { key: "C", text: "App Hosting can't serve Vite apps." },
      { key: "D", text: "Secrets can't be client variables at all." }
    ],
    correctAnswer: "B",
    explanation: "RUNTIME exposes values to the server process only. Vite substitutes import.meta.env.* during compilation, so client-visible vars need BUILD (or BUILD+RUNTIME) availability.",
    technicalResources: [{ name: "Configure App Hosting", url: "https://firebase.google.com/docs/app-hosting/configure", type: "docs" }]
  },
  {
    id: "quiz-fb-7-q6",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-7",
    type: "multiple_choice",
    difficulty: "medium",
    question: "What happens when an App Hosting rollout's new revision fails its health checks?",
    options: [
      { key: "A", text: "The site goes down." },
      { key: "B", text: "The rollout halts automatically and the previous healthy revision keeps serving traffic." },
      { key: "C", text: "Traffic splits 50/50 with the broken revision." },
      { key: "D", text: "GitHub reverts the commit." }
    ],
    correctAnswer: "B",
    explanation: "Rollouts are health-gated: a failing revision never takes traffic, and the last good revision continues serving — the safety property behind push-to-deploy.",
    technicalResources: [{ name: "App Hosting", url: "https://firebase.google.com/docs/app-hosting", type: "docs" }]
  },
  {
    id: "quiz-fb-7-q7",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-7",
    type: "multiple_choice",
    difficulty: "medium",
    question: "App Hosting runs your server on Cloud Run, so your package.json must include what?",
    options: [
      { key: "A", text: "A 'dev' script only." },
      { key: "B", text: "A real 'start' script that launches the built production server binding to process.env.PORT on 0.0.0.0." },
      { key: "C", text: "A 'test' script." },
      { key: "D", text: "Nothing special." }
    ],
    correctAnswer: "B",
    explanation: "App Hosting runs `npm run start` in the production container; the server must bind PORT on 0.0.0.0 to pass Cloud Run's health check.",
    technicalResources: [{ name: "App Hosting Architecture", url: "https://firebase.google.com/docs/app-hosting/about-app-hosting", type: "docs" }]
  },
  {
    id: "quiz-fb-7-q8",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-7",
    type: "multiple_choice",
    difficulty: "medium",
    question: "How are secrets rotated for an App Hosting backend?",
    options: [
      { key: "A", text: "Edit the value in apphosting.yaml." },
      { key: "B", text: "Add a new version in Secret Manager; consumers pinned to :latest pick it up on next start — no code change." },
      { key: "C", text: "Redeploy the whole app manually with the value inline." },
      { key: "D", text: "Secrets cannot be rotated." }
    ],
    correctAnswer: "B",
    explanation: "Rotation is a Secret Manager version bump. The YAML holds only a reference, so no code redeploy is needed to change the value.",
    technicalResources: [{ name: "Secret Manager", url: "https://cloud.google.com/secret-manager/docs", type: "docs" }]
  },
  {
    id: "quiz-fb-7-q9",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-7",
    type: "multiple_choice",
    difficulty: "medium",
    question: "What triggers an App Hosting rollout in the default configuration?",
    options: [
      { key: "A", text: "A manual FTP upload." },
      { key: "B", text: "A push to the connected GitHub branch, which runs Cloud Build → new Cloud Run revision → gradual traffic rollout." },
      { key: "C", text: "Editing Firestore data." },
      { key: "D", text: "A cron job only." }
    ],
    correctAnswer: "B",
    explanation: "App Hosting connects to a GitHub branch; each push builds an image and rolls out a new revision with health-gated traffic shifting.",
    technicalResources: [{ name: "Get Started", url: "https://firebase.google.com/docs/app-hosting/get-started", type: "docs" }]
  },
  {
    id: "quiz-fb-7-q10",
    courseId: "course-firebase-gcp",
    moduleId: "mod-fb-7",
    type: "debugging",
    difficulty: "hard",
    question: "A build succeeds but the rollout hangs 'unhealthy'. What is the most common cause?",
    options: [
      { key: "A", text: "A missing favicon." },
      { key: "B", text: "The server isn't binding process.env.PORT on 0.0.0.0, or the start script is missing/incorrect." },
      { key: "C", text: "Too many CSS files." },
      { key: "D", text: "The repository is public." }
    ],
    correctAnswer: "B",
    explanation: "An unhealthy rollout after a successful build almost always means the container never bound the injected PORT on 0.0.0.0, or `npm run start` doesn't launch the server. Check revision logs.",
    technicalResources: [{ name: "Container Contract", url: "https://cloud.google.com/run/docs/container-contract", type: "docs" }]
  }
];
