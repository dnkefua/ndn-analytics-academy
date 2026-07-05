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

  {
    id: "quiz-mob-1-q4",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-1",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Play rejects an upload whose versionCode is not what?",
    options: [
      { key: "A", text: "A prime number." },
      { key: "B", text: "Strictly greater than the last uploaded versionCode." },
      { key: "C", text: "A multiple of 10." },
      { key: "D", text: "Equal to versionName." }
    ],
    correctAnswer: "B",
    explanation: "versionCode is a monotonically increasing integer; Play rejects any upload that doesn't exceed the previous one.",
    technicalResources: [{ name: "Configure Your Build", url: "https://developer.android.com/build/configure-app-module", type: "docs" }]
  },
  {
    id: "quiz-mob-1-q5",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-1",
    type: "multiple_choice",
    difficulty: "medium",
    question: "What does raising targetSdk actually opt your app into?",
    options: [
      { key: "A", text: "Support for older devices." },
      { key: "B", text: "That API level's behavior changes (permissions, background limits) which you must test and certify against." },
      { key: "C", text: "A faster build." },
      { key: "D", text: "Automatic dark mode." }
    ],
    correctAnswer: "B",
    explanation: "targetSdk declares the behavior contract you've certified against; each bump opts you into new platform behavior changes. minSdk governs device support.",
    technicalResources: [{ name: "Target API Requirements", url: "https://support.google.com/googleplay/android-developer/answer/11926878", type: "docs" }]
  },
  {
    id: "quiz-mob-1-q6",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-1",
    type: "code_output",
    difficulty: "easy",
    question: "Why must `npm run build` run before `npx cap sync android`?",
    codeSnippet: `npm run build && npx cap sync android`,
    options: [
      { key: "A", text: "cap sync copies whatever is in webDir (dist); syncing before building copies stale assets." },
      { key: "B", text: "The order doesn't matter." },
      { key: "C", text: "cap sync compiles the web app." },
      { key: "D", text: "build requires a device connected." }
    ],
    correctAnswer: "A",
    explanation: "cap sync copies the current webDir into the native project. Building first ensures fresh assets; syncing stale dist is the classic 'my change isn't showing' bug.",
    technicalResources: [{ name: "Capacitor Workflow", url: "https://capacitorjs.com/docs/basics/workflow", type: "docs" }]
  },
  {
    id: "quiz-mob-1-q7",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-1",
    type: "multiple_choice",
    difficulty: "medium",
    question: "What does Capacitor do for a web app?",
    options: [
      { key: "A", text: "Rewrites it in Kotlin." },
      { key: "B", text: "Wraps the built web app in a native WebView shell with plugin access to native APIs, producing a real Gradle project." },
      { key: "C", text: "Hosts it on the web only." },
      { key: "D", text: "Converts it to Flutter." }
    ],
    correctAnswer: "B",
    explanation: "Capacitor packages the web build into a native Android/iOS project (a WebView shell) and exposes native APIs through plugins.",
    technicalResources: [{ name: "Capacitor Android", url: "https://capacitorjs.com/docs/android", type: "docs" }]
  },
  {
    id: "quiz-mob-1-q8",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-1",
    type: "multiple_choice",
    difficulty: "easy",
    question: "In the Capacitor model, how does web content get into the android/ project?",
    options: [
      { key: "A", text: "By hand-editing the copied assets." },
      { key: "B", text: "Via cap sync; native config (icons, permissions, gradle) is edited in android/, but web assets flow in from the build." },
      { key: "C", text: "By deleting android/ each build." },
      { key: "D", text: "It doesn't; you copy files manually." }
    ],
    correctAnswer: "B",
    explanation: "android/ is generated-but-committed: you edit native config there, and web content is synced in — never hand-edit the copied web assets.",
    technicalResources: [{ name: "Capacitor Getting Started", url: "https://capacitorjs.com/docs/getting-started", type: "docs" }]
  },
  {
    id: "quiz-mob-1-q9",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-1",
    type: "multiple_choice",
    difficulty: "medium",
    question: "What is a robust way to manage versionCode in a team?",
    options: [
      { key: "A", text: "Increment it by hand each release." },
      { key: "B", text: "Automate it from the CI run number or git commit count." },
      { key: "C", text: "Use a random number." },
      { key: "D", text: "Keep it constant." }
    ],
    correctAnswer: "B",
    explanation: "Manual version bumps are the #1 cause of rejected uploads; deriving versionCode from CI run number or commit count makes it reliably monotonic.",
    technicalResources: [{ name: "Versioning", url: "https://developer.android.com/studio/publish/versioning", type: "docs" }]
  },
  {
    id: "quiz-mob-1-q10",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-1",
    type: "multiple_choice",
    difficulty: "easy",
    question: "What ensures a reproducible Gradle build across machines?",
    options: [
      { key: "A", text: "Everyone installing Gradle globally." },
      { key: "B", text: "The committed Gradle wrapper (gradlew), which pins the exact Gradle version." },
      { key: "C", text: "A README note." },
      { key: "D", text: "Deleting the .gradle cache." }
    ],
    correctAnswer: "B",
    explanation: "The Gradle wrapper pins the build tool version so a fresh clone builds identically — 'works on my machine' Android issues are usually version mismatches.",
    technicalResources: [{ name: "Gradle Wrapper", url: "https://docs.gradle.org/current/userguide/gradle_wrapper.html", type: "docs" }]
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

  {
    id: "quiz-mob-2-q4",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-2",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Under Play App Signing, which key signs what?",
    options: [
      { key: "A", text: "One key signs everything." },
      { key: "B", text: "Your upload key signs the upload; Google's app signing key (in their HSM) signs what devices install." },
      { key: "C", text: "The app signing key signs uploads; the upload key signs installs." },
      { key: "D", text: "Devices sign the app themselves." }
    ],
    correctAnswer: "B",
    explanation: "Two keys: the upload key authenticates your uploads and is replaceable; Google's app signing key signs installed artifacts.",
    technicalResources: [{ name: "Play App Signing", url: "https://support.google.com/googleplay/android-developer/answer/9842756", type: "docs" }]
  },
  {
    id: "quiz-mob-2-q5",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-2",
    type: "multiple_choice",
    difficulty: "easy",
    question: "Where should the release keystore live?",
    options: [
      { key: "A", text: "Committed in the repo for the team." },
      { key: "B", text: "Outside the repository, with passwords in a password manager." },
      { key: "C", text: "In the APK." },
      { key: "D", text: "In a public gist." }
    ],
    correctAnswer: "B",
    explanation: "A keystore committed to git is a security incident. Store it outside the repo and inject signing secrets via environment variables.",
    technicalResources: [{ name: "Sign Your App", url: "https://developer.android.com/studio/publish/app-signing", type: "docs" }]
  },
  {
    id: "quiz-mob-2-q6",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-2",
    type: "multiple_choice",
    difficulty: "medium",
    question: "What does `minifyEnabled true` run, and what duty comes with it?",
    options: [
      { key: "A", text: "The linter; none." },
      { key: "B", text: "R8 code shrinking/obfuscation; you must add keep rules for reflection-accessed classes and upload the mapping file." },
      { key: "C", text: "The emulator; nothing." },
      { key: "D", text: "A formatter; documentation." }
    ],
    correctAnswer: "B",
    explanation: "R8 strips and renames code. Reflectively-used classes need keep rules, and uploading mapping.txt de-obfuscates crash stack traces.",
    technicalResources: [{ name: "Shrink Code", url: "https://developer.android.com/build/shrink-code", type: "docs" }]
  },
  {
    id: "quiz-mob-2-q7",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-2",
    type: "debugging",
    difficulty: "hard",
    question: "A reflection-based feature works in debug but crashes ClassNotFoundException only in release. Cause?",
    options: [
      { key: "A", text: "A different JVM in release." },
      { key: "B", text: "R8 stripped or renamed the reflectively-accessed class; add a keep rule in proguard-rules.pro." },
      { key: "C", text: "The keystore corrupted bytecode." },
      { key: "D", text: "versionCode wasn't bumped." }
    ],
    correctAnswer: "B",
    explanation: "R8 can't see reflection usage, so it removes/renames the class. Keep rules exempt it — which is why you must test the release build before upload.",
    technicalResources: [{ name: "Keep Rules", url: "https://developer.android.com/build/shrink-code#keep-code", type: "docs" }]
  },
  {
    id: "quiz-mob-2-q8",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-2",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Why does Play require AAB instead of a fat APK for new apps?",
    options: [
      { key: "A", text: "AABs are encrypted." },
      { key: "B", text: "From one bundle, Play generates optimized split APKs per device (ABI, density, language), cutting downloads 20–40%." },
      { key: "C", text: "APKs can't be signed." },
      { key: "D", text: "AABs run faster." }
    ],
    correctAnswer: "B",
    explanation: "Dynamic delivery serves each device only what it needs from the bundle, reducing download size and improving install conversion.",
    technicalResources: [{ name: "About App Bundles", url: "https://developer.android.com/guide/app-bundle", type: "docs" }]
  },
  {
    id: "quiz-mob-2-q9",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-2",
    type: "multiple_choice",
    difficulty: "hard",
    question: "With Play App Signing, what happens if your upload key is compromised?",
    options: [
      { key: "A", text: "The app is permanently orphaned." },
      { key: "B", text: "You verify identity with Google and register a new upload key; users are unaffected because installs use Google's separate signing key." },
      { key: "C", text: "Attackers can push updates to users." },
      { key: "D", text: "Google unpublishes the app." }
    ],
    correctAnswer: "B",
    explanation: "The two-key model exists for this: a lost/leaked upload key is replaceable, while the HSM-held app signing key keeps installs trustworthy.",
    technicalResources: [{ name: "Play App Signing", url: "https://support.google.com/googleplay/android-developer/answer/9842756", type: "docs" }]
  },
  {
    id: "quiz-mob-2-q10",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-2",
    type: "multiple_choice",
    difficulty: "medium",
    question: "How should signing secrets reach Gradle without living in git?",
    options: [
      { key: "A", text: "Hardcoded in build.gradle." },
      { key: "B", text: "Read from environment variables (locally from the shell, in CI from the secret store)." },
      { key: "C", text: "In a committed keystore.properties." },
      { key: "D", text: "Typed at each build prompt." }
    ],
    correctAnswer: "B",
    explanation: "signingConfigs should read storeFile/passwords from environment variables so no secret is committed to the repository.",
    technicalResources: [{ name: "Sign From Command Line", url: "https://developer.android.com/build/building-cmdline#sign_cmdline", type: "docs" }]
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

  {
    id: "quiz-mob-3-q4",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-3",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Does an app with zero data collection still need a privacy policy URL?",
    options: [
      { key: "A", text: "No, it's optional." },
      { key: "B", text: "Yes — every app requires a public, app-specific privacy policy URL, consistent with the Data Safety answers." },
      { key: "C", text: "Only games need one." },
      { key: "D", text: "Only paid apps need one." }
    ],
    correctAnswer: "B",
    explanation: "A privacy policy is universally required, must be publicly reachable, and must match your Data Safety declarations.",
    technicalResources: [{ name: "Privacy Requirements", url: "https://support.google.com/googleplay/android-developer/answer/9859455", type: "docs" }]
  },
  {
    id: "quiz-mob-3-q5",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-3",
    type: "multiple_choice",
    difficulty: "medium",
    question: "On the Data Safety form, what does 'collected' mean?",
    options: [
      { key: "A", text: "Any data the app touches." },
      { key: "B", text: "Data that leaves the device; on-device-only processing is not collection." },
      { key: "C", text: "Only data you sell." },
      { key: "D", text: "Only passwords." }
    ],
    correctAnswer: "B",
    explanation: "Collection means data transmitted off the device. On-device-only processing isn't collection, but a Firestore sync definitely is.",
    technicalResources: [{ name: "Data Safety Help", url: "https://support.google.com/googleplay/android-developer/answer/10787469", type: "docs" }]
  },
  {
    id: "quiz-mob-3-q6",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-3",
    type: "architecture_scenario",
    difficulty: "hard",
    question: "Your app bundles Firebase Analytics but you declare 'no data collected' because you wrote no collection code. What happens?",
    options: [
      { key: "A", text: "Nothing; SDK collection is Google's responsibility." },
      { key: "B", text: "The declaration is false — you must declare your SDKs' collection; mismatches risk removal and policy strikes." },
      { key: "C", text: "Analytics is exempt." },
      { key: "D", text: "The form auto-corrects." }
    ],
    correctAnswer: "B",
    explanation: "SDK data collection counts as yours to declare. Google cross-checks declarations against observed binary behavior; use vendor disclosure pages.",
    technicalResources: [{ name: "Firebase Data Disclosure", url: "https://firebase.google.com/docs/android/play-data-disclosure", type: "docs" }]
  },
  {
    id: "quiz-mob-3-q7",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-3",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Your app's main features are behind login. What must you provide to avoid a review rejection?",
    options: [
      { key: "A", text: "A promise it works." },
      { key: "B", text: "Working demo credentials in the App Access section so reviewers can reach gated functionality." },
      { key: "C", text: "A marketing video." },
      { key: "D", text: "Nothing; reviewers bypass login." }
    ],
    correctAnswer: "B",
    explanation: "Reviewers must exercise your app; 'could not access features' is a guaranteed, avoidable rejection with a multi-day round trip.",
    technicalResources: [{ name: "App Access", url: "https://support.google.com/googleplay/android-developer/answer/9859455", type: "docs" }]
  },
  {
    id: "quiz-mob-3-q8",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-3",
    type: "multiple_choice",
    difficulty: "easy",
    question: "What generates your app's age rating?",
    options: [
      { key: "A", text: "A random assignment." },
      { key: "B", text: "The IARC content questionnaire — answer truthfully, as wrong answers discovered later are policy strikes." },
      { key: "C", text: "Your download count." },
      { key: "D", text: "The app category alone." }
    ],
    correctAnswer: "B",
    explanation: "The IARC questionnaire about violence, UGC, gambling, etc. produces the rating. A conservative accurate rating costs little; wrong answers are strikes.",
    technicalResources: [{ name: "Content Ratings", url: "https://support.google.com/googleplay/android-developer/answer/9859655", type: "docs" }]
  },
  {
    id: "quiz-mob-3-q9",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-3",
    type: "multiple_choice",
    difficulty: "medium",
    question: "What is the value of maintaining an SDK-to-data-type audit table?",
    options: [
      { key: "A", text: "It's required to compile the app." },
      { key: "B", text: "It maps each dependency to the data it collects and the form answer, turning guessed compliance into engineered, re-certifiable compliance." },
      { key: "C", text: "It speeds up Gradle." },
      { key: "D", text: "It has no value." }
    ],
    correctAnswer: "B",
    explanation: "The audit (SDK → data → form answer, with sources) makes Data Safety accurate and fast to re-verify when the form or your dependencies change.",
    technicalResources: [{ name: "Google Play SDK Index", url: "https://play.google.com/sdks", type: "docs" }]
  },
  {
    id: "quiz-mob-3-q10",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-3",
    type: "multiple_choice",
    difficulty: "hard",
    question: "What does Google do that makes a Data Safety mismatch dangerous?",
    options: [
      { key: "A", text: "Nothing automated." },
      { key: "B", text: "It cross-checks declarations against observed binary behavior; inconsistency is treated as deception, risking removal and account strikes." },
      { key: "C", text: "It emails a reminder." },
      { key: "D", text: "It lowers your rating only." }
    ],
    correctAnswer: "B",
    explanation: "Play compares what you declare against what your binary and SDKs actually do; mismatches are treated as deceptive and enforced.",
    technicalResources: [{ name: "Data Safety", url: "https://support.google.com/googleplay/android-developer/answer/10787469", type: "docs" }]
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

  {
    id: "quiz-mob-4-q4",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-4",
    type: "multiple_choice",
    difficulty: "easy",
    question: "What is the order of Play's release tracks from least to most exposure?",
    options: [
      { key: "A", text: "Production → Open → Closed → Internal." },
      { key: "B", text: "Internal → Closed → Open → Production." },
      { key: "C", text: "Closed → Internal → Production → Open." },
      { key: "D", text: "They are all equivalent." }
    ],
    correctAnswer: "B",
    explanation: "Tracks form a graduated exposure ladder: internal (team) → closed (invited beta) → open (public beta) → production.",
    technicalResources: [{ name: "Testing Tracks", url: "https://support.google.com/googleplay/android-developer/answer/9845334", type: "docs" }]
  },
  {
    id: "quiz-mob-4-q5",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-4",
    type: "multiple_choice",
    difficulty: "hard",
    question: "What are the Android Vitals bad-behavior thresholds for crashes and ANRs?",
    options: [
      { key: "A", text: "5% crash, 5% ANR." },
      { key: "B", text: "~1.09% user-perceived crash rate and ~0.47% ANR rate." },
      { key: "C", text: "0% for both." },
      { key: "D", text: "10% crash, 2% ANR." }
    ],
    correctAnswer: "B",
    explanation: "Exceeding ~1.09% crashes or ~0.47% ANRs reduces discoverability and may surface a warning on your listing.",
    technicalResources: [{ name: "Android Vitals", url: "https://developer.android.com/topic/performance/vitals", type: "docs" }]
  },
  {
    id: "quiz-mob-4-q6",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-4",
    type: "multiple_choice",
    difficulty: "medium",
    question: "What does 'promoting' a release between tracks preserve?",
    options: [
      { key: "A", text: "Nothing; it rebuilds." },
      { key: "B", text: "The artifact is byte-identical — what you tested is exactly what ships." },
      { key: "C", text: "The version name is reset." },
      { key: "D", text: "Release notes are deleted." }
    ],
    correctAnswer: "B",
    explanation: "Promotion moves the same AAB up the ladder with no rebuild, so there's zero drift between tested and shipped bytes.",
    technicalResources: [{ name: "Testing Tracks", url: "https://support.google.com/googleplay/android-developer/answer/9845334", type: "docs" }]
  },
  {
    id: "quiz-mob-4-q7",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-4",
    type: "multi_select",
    difficulty: "medium",
    question: "What does the Play pre-launch report provide automatically? (Select all that apply)",
    options: [
      { key: "A", text: "Crash stack traces from crawls on real physical devices." },
      { key: "B", text: "Per-device rendering screenshots." },
      { key: "C", text: "Guaranteed iOS compatibility." },
      { key: "D", text: "Basic security-issue findings." }
    ],
    correctAnswer: ["A", "B", "D"],
    explanation: "The pre-launch report is a free device lab: crashes, screenshots, performance, and security findings across a device matrix. iOS is out of scope.",
    technicalResources: [{ name: "Pre-launch Reports", url: "https://support.google.com/googleplay/android-developer/answer/9842757", type: "docs" }]
  },
  {
    id: "quiz-mob-4-q8",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-4",
    type: "multiple_choice",
    difficulty: "medium",
    question: "What is a new personal Play account's closed-testing requirement before production access?",
    options: [
      { key: "A", text: "No requirement." },
      { key: "B", text: "A closed test with 12+ testers for 14+ continuous days." },
      { key: "C", text: "100 testers for 1 day." },
      { key: "D", text: "A paid audit." }
    ],
    correctAnswer: "B",
    explanation: "New personal accounts (post-Nov 2023) must run a 12+ tester closed test for 14+ continuous days before unlocking production.",
    technicalResources: [{ name: "Closed Testing Requirements", url: "https://support.google.com/googleplay/android-developer/answer/14151465", type: "docs" }]
  },
  {
    id: "quiz-mob-4-q9",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-4",
    type: "multiple_choice",
    difficulty: "easy",
    question: "What is the easiest way to manage a growing tester list?",
    options: [
      { key: "A", text: "A spreadsheet of individual emails." },
      { key: "B", text: "A Google Group as the tester list, so membership changes propagate automatically." },
      { key: "C", text: "Re-inviting everyone each release." },
      { key: "D", text: "SMS invites." }
    ],
    correctAnswer: "B",
    explanation: "Feeding a closed track from a Google Group makes tester management scalable versus juggling individual emails across releases.",
    technicalResources: [{ name: "Testing Tracks", url: "https://support.google.com/googleplay/android-developer/answer/9845334", type: "docs" }]
  },
  {
    id: "quiz-mob-4-q10",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-4",
    type: "multiple_choice",
    difficulty: "medium",
    question: "How does a mapping.txt upload help you read Vitals crash clusters?",
    options: [
      { key: "A", text: "It disables obfuscation retroactively." },
      { key: "B", text: "It lets Play de-obfuscate R8-minified stack traces into readable class/method names." },
      { key: "C", text: "It increases the crash threshold." },
      { key: "D", text: "It has no effect on Vitals." }
    ],
    correctAnswer: "B",
    explanation: "R8 obfuscates release builds; uploading the mapping file lets Play show human-readable stack traces in Vitals crash clusters.",
    technicalResources: [{ name: "Deobfuscate Crashes", url: "https://developer.android.com/build/shrink-code#retracing", type: "docs" }]
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

  {
    id: "quiz-mob-5-q4",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-5",
    type: "multiple_choice",
    difficulty: "easy",
    question: "What three things does the Play Integrity API attest about a client?",
    options: [
      { key: "A", text: "Its color scheme, language, and font." },
      { key: "B", text: "Whether it's your unmodified binary, installed from Play, on a genuine Android device." },
      { key: "C", text: "Its download speed and battery." },
      { key: "D", text: "The user's age and location." }
    ],
    correctAnswer: "B",
    explanation: "Integrity verdicts cover app recognition (unmodified/from Play), device integrity (genuine device), and licensing.",
    technicalResources: [{ name: "Integrity Overview", url: "https://developer.android.com/google/play/integrity/overview", type: "docs" }]
  },
  {
    id: "quiz-mob-5-q5",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-5",
    type: "architecture_scenario",
    difficulty: "hard",
    question: "A developer checks the integrity verdict inside the app and sends {passed:true} to the backend. Why is this worthless?",
    options: [
      { key: "A", text: "It drains battery." },
      { key: "B", text: "A tampered client can simply lie; verdicts must be decrypted and evaluated server-side — the client is never trusted with the judgment." },
      { key: "C", text: "The verdict format changed." },
      { key: "D", text: "It exceeds quotas." }
    ],
    correctAnswer: "B",
    explanation: "Integrity exists because clients can be modified; any client-side evaluation is circular trust. Verification and enforcement must be server-side.",
    technicalResources: [{ name: "Integrity Overview", url: "https://developer.android.com/google/play/integrity/overview", type: "docs" }]
  },
  {
    id: "quiz-mob-5-q6",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-5",
    type: "multiple_choice",
    difficulty: "hard",
    question: "What attack does binding the integrity token to a server-issued nonce prevent?",
    options: [
      { key: "A", text: "SQL injection." },
      { key: "B", text: "Replay — a token harvested from one legit session can't be re-submitted by bots because the single-use nonce won't match." },
      { key: "C", text: "TLS downgrade." },
      { key: "D", text: "Keystore theft." }
    ],
    correctAnswer: "B",
    explanation: "The nonce ties each token to one action; the server checks the echoed nonce and burns it, so a replayed token fails immediately.",
    technicalResources: [{ name: "Standard Requests", url: "https://developer.android.com/google/play/integrity/standard", type: "docs" }]
  },
  {
    id: "quiz-mob-5-q7",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-5",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Why is requiring MEETS_STRONG_INTEGRITY for every action usually wrong?",
    options: [
      { key: "A", text: "STRONG costs money per check." },
      { key: "B", text: "It locks out legitimate users on older/unpatched devices; tiered enforcement matches strictness to action value." },
      { key: "C", text: "STRONG is deprecated." },
      { key: "D", text: "It only works on tablets." }
    ],
    correctAnswer: "B",
    explanation: "STRONG needs hardware attestation plus a recent patch — many genuine devices miss it. Reserve it for the highest-value actions.",
    technicalResources: [{ name: "Verdicts", url: "https://developer.android.com/google/play/integrity/verdicts", type: "docs" }]
  },
  {
    id: "quiz-mob-5-q8",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-5",
    type: "multiple_choice",
    difficulty: "medium",
    question: "What does appRecognitionVerdict = UNRECOGNIZED_VERSION indicate?",
    options: [
      { key: "A", text: "The device is offline." },
      { key: "B", text: "The running binary is a modified or sideloaded build, not the one distributed by Play." },
      { key: "C", text: "The app is up to date." },
      { key: "D", text: "The user isn't signed in." }
    ],
    correctAnswer: "B",
    explanation: "UNRECOGNIZED_VERSION means the app doesn't match a Play-distributed build — a sign of tampering or sideloading.",
    technicalResources: [{ name: "Verdicts", url: "https://developer.android.com/google/play/integrity/verdicts", type: "docs" }]
  },
  {
    id: "quiz-mob-5-q9",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-5",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Why return the same generic error for every integrity failure?",
    options: [
      { key: "A", text: "It's less code." },
      { key: "B", text: "Detailed errors teach attackers exactly which check they tripped; a generic denial withholds that intelligence." },
      { key: "C", text: "It's required by Play." },
      { key: "D", text: "It improves latency." }
    ],
    correctAnswer: "B",
    explanation: "Specific failure messages help attackers iterate. A single generic error avoids leaking which verdict or check failed.",
    technicalResources: [{ name: "Integrity Overview", url: "https://developer.android.com/google/play/integrity/overview", type: "docs" }]
  },
  {
    id: "quiz-mob-5-q10",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-5",
    type: "multiple_choice",
    difficulty: "hard",
    question: "Post-launch, why alert on integrity verdict-RATE changes rather than absolute numbers?",
    options: [
      { key: "A", text: "Absolute numbers are unavailable." },
      { key: "B", text: "Baselines differ wildly by market and device mix; a sudden UNRECOGNIZED_VERSION spike usually signals a circulating clone." },
      { key: "C", text: "Rates are cheaper to compute." },
      { key: "D", text: "Google requires it." }
    ],
    correctAnswer: "B",
    explanation: "Verdict distributions vary by audience, so monitor rate changes as security telemetry — a spike in bad verdicts flags an emerging attack.",
    technicalResources: [{ name: "Integrity in Production", url: "https://developer.android.com/google/play/integrity/setup", type: "docs" }]
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
  },
  {
    id: "quiz-mob-6-q4",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-6",
    type: "multi_select",
    difficulty: "medium",
    question: "Which listing fields does Play Search index for keyword ranking? (Select all that apply)",
    options: [
      { key: "A", text: "App title (30 chars)." },
      { key: "B", text: "Short description (80 chars)." },
      { key: "C", text: "A hidden keywords field like iOS." },
      { key: "D", text: "Full description." }
    ],
    correctAnswer: ["A", "B", "D"],
    explanation: "Play indexes visible listing text — title, short and full descriptions. There is no hidden keyword field; natural keyword-bearing copy is the mechanism.",
    technicalResources: [{ name: "Store Listing", url: "https://developer.android.com/distribute/best-practices/launch/store-listing", type: "docs" }]
  },
  {
    id: "quiz-mob-6-q5",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-6",
    type: "multiple_choice",
    difficulty: "hard",
    question: "You halt a staged rollout at 10% after a crash spike. What is true of users who already updated?",
    options: [
      { key: "A", text: "They are rolled back automatically." },
      { key: "B", text: "They keep the bad build — halting only stops NEW users from receiving it, which is why rollouts start small." },
      { key: "C", text: "Their app is disabled remotely." },
      { key: "D", text: "They get a refund." }
    ],
    correctAnswer: "B",
    explanation: "There is no un-ship button. Halting caps blast radius; recovery requires shipping a fixed release with a higher versionCode.",
    technicalResources: [{ name: "Staged Rollouts", url: "https://support.google.com/googleplay/android-developer/answer/6346149", type: "docs" }]
  },
  {
    id: "quiz-mob-6-q6",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-6",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Which two listing elements do most of the conversion work?",
    options: [
      { key: "A", text: "The privacy policy and content rating." },
      { key: "B", text: "The title/short description (ASO) and the first two screenshots (conversion)." },
      { key: "C", text: "The changelog and the app size." },
      { key: "D", text: "The developer name and category." }
    ],
    correctAnswer: "B",
    explanation: "Title and short description carry keyword/ASO weight; the first screenshots do most of the convincing. Design screenshots as a story sequence.",
    technicalResources: [{ name: "Launch Best Practices", url: "https://developer.android.com/distribute/best-practices/launch/store-listing", type: "docs" }]
  },
  {
    id: "quiz-mob-6-q7",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-6",
    type: "multiple_choice",
    difficulty: "easy",
    question: "What are the exact specs for the app icon asset?",
    options: [
      { key: "A", text: "1024×500 JPEG." },
      { key: "B", text: "512×512 PNG, ≤1 MB, no promotional badges." },
      { key: "C", text: "96×96 ICO." },
      { key: "D", text: "Any size PNG." }
    ],
    correctAnswer: "B",
    explanation: "The Play icon is a 512×512 PNG under 1 MB; badges like 'sale' or 'new' are not allowed on it.",
    technicalResources: [{ name: "Graphic Asset Specs", url: "https://support.google.com/googleplay/android-developer/answer/9866151", type: "docs" }]
  },
  {
    id: "quiz-mob-6-q8",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-6",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Why define numeric halt criteria before starting a staged rollout?",
    options: [
      { key: "A", text: "Play requires them." },
      { key: "B", text: "Pre-agreed thresholds (e.g. halt if crash rate >1%) make rollout decisions calm and objective instead of political." },
      { key: "C", text: "They speed up the rollout." },
      { key: "D", text: "They increase installs." }
    ],
    correctAnswer: "B",
    explanation: "Deciding 'halt if metric exceeds X' up front removes debate during an incident and ties the go/no-go to Vitals data.",
    technicalResources: [{ name: "Staged Rollouts", url: "https://support.google.com/googleplay/android-developer/answer/6346149", type: "docs" }]
  },
  {
    id: "quiz-mob-6-q9",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-6",
    type: "multiple_choice",
    difficulty: "easy",
    question: "Why provide localized listings for even a few extra locales?",
    options: [
      { key: "A", text: "Play auto-translates everything anyway." },
      { key: "B", text: "Localized title/description/screenshots measurably lift conversion in those markets." },
      { key: "C", text: "It is legally required everywhere." },
      { key: "D", text: "It reduces app size." }
    ],
    correctAnswer: "B",
    explanation: "Play doesn't translate what you don't provide. Even 2–3 locales (with localized screenshot captions) lift conversion in those markets.",
    technicalResources: [{ name: "Localization", url: "https://support.google.com/googleplay/android-developer/answer/9844778", type: "docs" }]
  },
  {
    id: "quiz-mob-6-q10",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-6",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Why reply to 1–2 star reviews?",
    options: [
      { key: "A", text: "It is mandatory." },
      { key: "B", text: "Reviews are both a ranking signal and a support channel; replies convert surprisingly often." },
      { key: "C", text: "It deletes the review." },
      { key: "D", text: "It has no effect." }
    ],
    correctAnswer: "B",
    explanation: "Ratings influence ranking and are a support surface; thoughtful replies to low reviews frequently turn users around and lift scores.",
    technicalResources: [{ name: "Ratings & Reviews", url: "https://developer.android.com/distribute/best-practices/engage/ratings-reviews", type: "docs" }]
  }
];
