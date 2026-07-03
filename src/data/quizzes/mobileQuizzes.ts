import { QuizQuestion } from '../../types/academy';

// Course 3: NDN-MOB-301 — 6 modules × 3 questions

export const MOBILE_QUIZZES: QuizQuestion[] = [
  // ── Module 1 ──
  {
    id: "quiz-mob-1-q1",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-1",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Which Gradle field is permanently fixed after your first Play Store upload?",
    options: [
      { key: "A", text: "versionName" },
      { key: "B", text: "applicationId — it is your app's permanent identity on Google Play and can never change." },
      { key: "C", text: "targetSdk" },
      { key: "D", text: "minSdk" }
    ],
    correctAnswer: "B",
    explanation: "versionCode/versionName change every release and SDK levels evolve annually, but applicationId is the app's identity — changing it means publishing a different app.",
    technicalResources: [{ name: "Configure Your Build", url: "https://developer.android.com/build/configure-app-module", type: "docs" }]
  },
  {
    id: "quiz-mob-1-q2",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-1",
    type: "multiple_choice",
    difficulty: "medium",
    question: "What is the difference between minSdk and targetSdk?",
    options: [
      { key: "A", text: "They must always be equal." },
      { key: "B", text: "minSdk sets the oldest device that can install the app; targetSdk declares which API level's behavior changes you have certified against — and Play policy requires it to stay recent." },
      { key: "C", text: "targetSdk sets the oldest supported device." },
      { key: "D", text: "minSdk is only used for emulators." }
    ],
    correctAnswer: "B",
    explanation: "Raising targetSdk opts you into new platform behaviors (permissions, background limits) and is mandated annually by Play; minSdk is purely a device-support floor.",
    technicalResources: [{ name: "Target API Requirements", url: "https://support.google.com/googleplay/android-developer/answer/11926878", type: "docs" }]
  },
  {
    id: "quiz-mob-1-q3",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-1",
    type: "code_output",
    difficulty: "easy",
    question: "After editing your web app, which command sequence updates the Android project with the new build?",
    codeSnippet: `# Option A:\nnpm run build && npx cap sync android\n\n# Option B:\nnpx cap sync android && npm run build`,
    options: [
      { key: "A", text: "Option A — build the web assets first, then cap sync copies dist/ into the native project." },
      { key: "B", text: "Option B — sync must always run first." },
      { key: "C", text: "Either order works identically." },
      { key: "D", text: "Neither; you must delete the android/ folder each time." }
    ],
    correctAnswer: "A",
    explanation: "cap sync copies whatever is currently in webDir (dist/). Syncing before building copies stale assets — the classic 'my change isn't showing' bug.",
    technicalResources: [{ name: "Capacitor Workflow", url: "https://capacitorjs.com/docs/basics/workflow", type: "docs" }]
  },

  // ── Module 2 ──
  {
    id: "quiz-mob-2-q1",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-2",
    type: "multiple_choice",
    difficulty: "hard",
    question: "Under Play App Signing, what happens if your upload key is compromised?",
    options: [
      { key: "A", text: "Your app is permanently orphaned — no more updates ever." },
      { key: "B", text: "Attackers can push updates directly to users." },
      { key: "C", text: "You verify your identity with Google, register a new upload key, and keep publishing — users are unaffected because installs are signed by Google's separately-held app signing key." },
      { key: "D", text: "Google unpublishes the app automatically." }
    ],
    correctAnswer: "C",
    explanation: "The two-key model exists exactly for this: the upload key authenticates you to Play and is replaceable; the app signing key in Google's HSM signs what devices install.",
    technicalResources: [{ name: "Play App Signing", url: "https://support.google.com/googleplay/android-developer/answer/9842756", type: "docs" }]
  },
  {
    id: "quiz-mob-2-q2",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-2",
    type: "debugging",
    difficulty: "hard",
    question: "A feature using reflection works in debug builds but crashes with ClassNotFoundException in release builds only. The cause?",
    options: [
      { key: "A", text: "Release builds run on a different JVM." },
      { key: "B", text: "R8 (minifyEnabled true) stripped or renamed the reflectively-accessed class; add a keep rule in proguard-rules.pro." },
      { key: "C", text: "The keystore corrupted the bytecode." },
      { key: "D", text: "versionCode wasn't incremented." }
    ],
    correctAnswer: "B",
    explanation: "R8 can't see reflection-based usage, so it removes or obfuscates the class. Keep rules declare such classes off-limits — and this is why release builds must be tested before upload.",
    technicalResources: [{ name: "Shrink & Obfuscate", url: "https://developer.android.com/build/shrink-code", type: "docs" }]
  },
  {
    id: "quiz-mob-2-q3",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-2",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Why does Play require the AAB format instead of a fat APK for new apps?",
    options: [
      { key: "A", text: "AABs are encrypted; APKs are not." },
      { key: "B", text: "From one uploaded bundle, Play generates optimized split APKs per device (ABI, screen density, language), cutting user download sizes 20–40%." },
      { key: "C", text: "APKs can't be signed." },
      { key: "D", text: "AABs run faster at runtime." }
    ],
    correctAnswer: "B",
    explanation: "The bundle contains everything; Play's dynamic delivery serves each device only what it needs. Smaller downloads measurably improve install conversion.",
    technicalResources: [{ name: "About App Bundles", url: "https://developer.android.com/guide/app-bundle", type: "docs" }]
  },

  // ── Module 3 ──
  {
    id: "quiz-mob-3-q1",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-3",
    type: "architecture_scenario",
    difficulty: "hard",
    question: "Your Capacitor app includes Firebase Analytics. On the Data Safety form you declare 'no data collected' because YOU wrote no collection code. What happens?",
    options: [
      { key: "A", text: "Nothing — SDK collection is Google's responsibility to declare." },
      { key: "B", text: "The declaration is false: Firebase Analytics collects device identifiers and usage events, and you are responsible for declaring your SDKs' collection. Mismatches risk removal and policy strikes." },
      { key: "C", text: "Analytics data is exempt from the form." },
      { key: "D", text: "The form auto-detects SDKs and fixes your answers." }
    ],
    correctAnswer: "B",
    explanation: "Google cross-checks declarations against observed binary behavior, and SDK data collection counts as YOUR collection. Vendor data-disclosure pages exist precisely to fill the form accurately.",
    technicalResources: [{ name: "Firebase Play Data Disclosure", url: "https://firebase.google.com/docs/android/play-data-disclosure", type: "docs" }]
  },
  {
    id: "quiz-mob-3-q2",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-3",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Your app's main features require login. What must you provide in Play Console to avoid a guaranteed review rejection?",
    options: [
      { key: "A", text: "A promise that the app works." },
      { key: "B", text: "Working demo credentials in the App Access section so reviewers can reach gated functionality." },
      { key: "C", text: "A video of the app instead of access." },
      { key: "D", text: "Nothing — reviewers bypass login automatically." }
    ],
    correctAnswer: "B",
    explanation: "Reviewers must be able to exercise your app. 'Could not access features' rejections cost a multi-day round trip and are entirely preventable.",
    technicalResources: [{ name: "App Access Help", url: "https://support.google.com/googleplay/android-developer/answer/9859455", type: "docs" }]
  },
  {
    id: "quiz-mob-3-q3",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-3",
    type: "multi_select",
    difficulty: "medium",
    question: "Which statements about the privacy policy requirement are true? (Select all that apply)",
    options: [
      { key: "A", text: "Required for every app, even with zero data collection." },
      { key: "B", text: "Must be publicly reachable without login." },
      { key: "C", text: "May contradict the Data Safety form if the policy is more detailed." },
      { key: "D", text: "Should live at a stable URL you control." }
    ],
    correctAnswer: ["A", "B", "D"],
    explanation: "The policy is universal, public, and stable — and must be CONSISTENT with Data Safety answers; contradictions are treated as deceptive declarations.",
    technicalResources: [{ name: "Privacy Policy Requirements", url: "https://support.google.com/googleplay/android-developer/answer/9859455", type: "docs" }]
  },

  // ── Module 4 ──
  {
    id: "quiz-mob-4-q1",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-4",
    type: "multiple_choice",
    difficulty: "medium",
    question: "What key property does 'promoting' a release between tracks preserve?",
    options: [
      { key: "A", text: "Nothing — promotion rebuilds the app for the new audience." },
      { key: "B", text: "The artifact is byte-identical: what you tested in closed testing is exactly what production users receive." },
      { key: "C", text: "The version name is reset." },
      { key: "D", text: "The release notes are deleted." }
    ],
    correctAnswer: "B",
    explanation: "Promotion moves the same AAB up the ladder — no rebuild, no drift between tested and shipped bytes. That's the entire QA value of the track system.",
    technicalResources: [{ name: "Testing Tracks", url: "https://support.google.com/googleplay/android-developer/answer/9845334", type: "docs" }]
  },
  {
    id: "quiz-mob-4-q2",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-4",
    type: "multiple_choice",
    difficulty: "hard",
    question: "Your user-perceived crash rate hits 1.5%. Beyond unhappy users, what does crossing Android Vitals' 1.09% bad-behavior threshold cost you?",
    options: [
      { key: "A", text: "Nothing measurable — Vitals is informational." },
      { key: "B", text: "Play reduces your discoverability (recommendations, search) and may surface a warning on your store listing." },
      { key: "C", text: "Immediate app removal." },
      { key: "D", text: "A fine charged to your developer account." }
    ],
    correctAnswer: "B",
    explanation: "Vitals thresholds carry algorithmic consequences: excessive crash/ANR rates suppress your acquisition channels. Quality is a ranking factor, not just a UX concern.",
    technicalResources: [{ name: "Android Vitals", url: "https://developer.android.com/topic/performance/vitals", type: "docs" }]
  },
  {
    id: "quiz-mob-4-q3",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-4",
    type: "multi_select",
    difficulty: "medium",
    question: "What does the Play pre-launch report give you automatically on every testing-track upload? (Select all that apply)",
    options: [
      { key: "A", text: "Crash stack traces from crawls on real physical devices." },
      { key: "B", text: "Per-device rendering screenshots." },
      { key: "C", text: "Guaranteed App Store (iOS) compatibility results." },
      { key: "D", text: "Basic security-issue findings." }
    ],
    correctAnswer: ["A", "B", "D"],
    explanation: "The pre-launch report is a free device lab: crawls across a device matrix with crashes, screenshots, performance and security findings. iOS is obviously out of scope.",
    technicalResources: [{ name: "Pre-launch Reports", url: "https://support.google.com/googleplay/android-developer/answer/9842757", type: "docs" }]
  },

  // ── Module 5 ──
  {
    id: "quiz-mob-5-q1",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-5",
    type: "architecture_scenario",
    difficulty: "hard",
    question: "A developer checks the Play Integrity verdict inside the Android app and sends { integrityPassed: true } to the backend. Why is this design worthless?",
    options: [
      { key: "A", text: "It drains battery." },
      { key: "B", text: "A tampered client simply lies — the entire point is that YOUR SERVER decrypts/verifies the token with Google and evaluates verdicts; the client is never trusted with the judgment." },
      { key: "C", text: "The verdict format changed in a recent API version." },
      { key: "D", text: "It exceeds API quotas." }
    ],
    correctAnswer: "B",
    explanation: "Integrity exists because clients can be modified. Any client-side evaluation is circular trust; verification and enforcement must live server-side.",
    technicalResources: [{ name: "Integrity Overview", url: "https://developer.android.com/google/play/integrity/overview", type: "docs" }]
  },
  {
    id: "quiz-mob-5-q2",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-5",
    type: "multiple_choice",
    difficulty: "hard",
    question: "What attack does binding the integrity token to a server-issued nonce prevent?",
    options: [
      { key: "A", text: "SQL injection." },
      { key: "B", text: "Replay: without a single-use nonce, a token harvested from one legitimate session could be re-submitted by bots to authenticate unlimited requests." },
      { key: "C", text: "Man-in-the-middle TLS downgrade." },
      { key: "D", text: "Keystore theft." }
    ],
    correctAnswer: "B",
    explanation: "The nonce (or request hash) ties each token to one specific action. Your server checks the echoed nonce matches and burns it — a replayed token fails immediately.",
    technicalResources: [{ name: "Standard Requests & Nonces", url: "https://developer.android.com/google/play/integrity/standard", type: "docs" }]
  },
  {
    id: "quiz-mob-5-q3",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-5",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Why is requiring MEETS_STRONG_INTEGRITY for every app action usually the wrong enforcement policy?",
    options: [
      { key: "A", text: "STRONG verdicts cost extra money per check." },
      { key: "B", text: "It locks out legitimate users on older devices without recent security patches; tiered enforcement matches verdict strictness to action value instead." },
      { key: "C", text: "STRONG is deprecated." },
      { key: "D", text: "It only works on tablets." }
    ],
    correctAnswer: "B",
    explanation: "STRONG requires hardware attestation plus a recent patch level — a bar many genuine devices miss. Reserve it for the highest-value actions; use DEVICE_INTEGRITY for routine protected operations.",
    technicalResources: [{ name: "Verdict Reference", url: "https://developer.android.com/google/play/integrity/verdicts", type: "docs" }]
  },

  // ── Module 6 ──
  {
    id: "quiz-mob-6-q1",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-6",
    type: "multiple_choice",
    difficulty: "medium",
    question: "You halt a staged rollout at 10% after a crash spike. What is true about users who already received the update?",
    options: [
      { key: "A", text: "They are rolled back automatically." },
      { key: "B", text: "They keep the bad build — halting only stops NEW users from receiving it, which is why rollouts start at small percentages." },
      { key: "C", text: "Their app is disabled remotely." },
      { key: "D", text: "They get a refund." }
    ],
    correctAnswer: "B",
    explanation: "There is no un-ship button. Halting caps the blast radius; recovery for affected users requires shipping a fixed release (with a higher versionCode) through the same pipeline.",
    technicalResources: [{ name: "Staged Rollouts", url: "https://support.google.com/googleplay/android-developer/answer/6346149", type: "docs" }]
  },
  {
    id: "quiz-mob-6-q2",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-6",
    type: "multi_select",
    difficulty: "medium",
    question: "Which listing elements does Play Search index for keyword ranking? (Select all that apply)",
    options: [
      { key: "A", text: "App title (30 chars)" },
      { key: "B", text: "Short description (80 chars)" },
      { key: "C", text: "A hidden keywords field like iOS App Store" },
      { key: "D", text: "Full description" }
    ],
    correctAnswer: ["A", "B", "D"],
    explanation: "Play indexes visible listing text — title, short and full descriptions. There is no hidden keyword field; natural keyword-bearing copy is the mechanism (stuffing is a violation).",
    technicalResources: [{ name: "Store Listing Best Practices", url: "https://developer.android.com/distribute/best-practices/launch/store-listing", type: "docs" }]
  },
  {
    id: "quiz-mob-6-q3",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-6",
    type: "architecture_scenario",
    difficulty: "hard",
    question: "You want to know whether new screenshots improve installs. What is the professional method?",
    options: [
      { key: "A", text: "Ship them and watch total installs for a week." },
      { key: "B", text: "Run a Store Listing Experiment: Play splits store visitors between variants and reports conversion difference with statistical confidence." },
      { key: "C", text: "Ask your team which they prefer." },
      { key: "D", text: "Change screenshots and title together to maximize effect." }
    ],
    correctAnswer: "B",
    explanation: "Raw install counts confound seasonality, campaigns, and rankings. Listing experiments isolate the variable — and changing one element at a time keeps the result interpretable.",
    technicalResources: [{ name: "Store Listing Experiments", url: "https://support.google.com/googleplay/android-developer/answer/12922867", type: "docs" }]
  }
];
