import { Lesson } from '../../types/academy';

// Course 3: NDN-MOB-301 — Google Play Store App Publishing & Security
// 6 modules × 3 lessons (reading / video / lab)

export const MOBILE_LESSONS: Lesson[] = [
  // ─────────────────────────────────────────────────────────
  // MODULE 1 — Android Production Readiness & Build Tools
  // ─────────────────────────────────────────────────────────
  {
    id: "les-mob-1-1",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-1",
    order: 1,
    type: "reading",
    title: "Lesson 1.1: Android Build System, Target API Levels & Capacitor Packaging",
    summary: "Configure Gradle, target API 34+, and package a web app as a native Android project with Capacitor.",
    durationMinutes: 30,
    readingMarkdown: `
# Android Build System, Target API Levels & Capacitor Packaging

Before anything reaches the Play Store it must survive the Android build system. This lesson covers the Gradle anatomy every publisher needs, Google's API-level policy, and the Capacitor workflow for shipping web apps natively.

## 1. Gradle Anatomy

An Android project has two build files that matter to you:

\`\`\`kotlin
// android/build.gradle — project level: plugin & repo versions
// android/app/build.gradle — module level: YOUR app's identity
android {
    namespace = "com.ndnanalytics.academy"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.ndnanalytics.academy"   // permanent identity!
        minSdk = 23        // oldest device you support
        targetSdk = 35     // behavior contract you certify against
        versionCode = 12   // integer, must increase every upload
        versionName = "1.4.2" // human-readable, shown in the store
    }
}
\`\`\`

Three fields deserve respect:
- **applicationId** — your app's permanent identity on Google Play. It can never change after first upload.
- **versionCode** — Play rejects any upload whose versionCode isn't strictly greater than the last.
- **targetSdk** — Google Play requires new apps and updates to target a recent API level (API 34+ as an ongoing policy; the bar rises annually). Missing the deadline blocks updates entirely.

## 2. minSdk vs targetSdk

\`targetSdk\` is *not* about which devices run your app — that's \`minSdk\`. Targeting a new SDK opts you into that version's behavior changes (permission models, background limits). The professional cycle: raise targetSdk every year, test the behavior changes, keep minSdk as low as your feature set allows.

## 3. Capacitor: Web App → Android Project

Capacitor wraps your built web app in a native WebView shell with plugin access to native APIs:

\`\`\`bash
npm run build                 # produce dist/
npx cap add android           # one-time: generates android/ project
npx cap sync android          # copy web assets + update plugins
npx cap open android          # open in Android Studio
\`\`\`

\`capacitor.config.ts\` controls the mapping:

\`\`\`typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ndnanalytics.academy',
  appName: 'NDN Academy',
  webDir: 'dist',
  android: { allowMixedContent: false }
};
export default config;
\`\`\`

**The golden rule:** \`android/\` is generated-but-committed. Native config you edit (icons, permissions, gradle settings) lives there; web content flows in via \`cap sync\`. Never hand-edit the copied web assets.

## 4. Production Readiness Checklist

- [ ] targetSdk meets current Play policy (34+)
- [ ] versionCode strategy defined (e.g. CI auto-increment)
- [ ] App icons generated for all densities (mipmap-*)
- [ ] Permissions in AndroidManifest.xml are the minimum you use
- [ ] \`./gradlew assembleDebug\` passes clean from a fresh clone
`,
    terminalLanguage: "bash",
    starterCode: `npm run build\nnpx cap sync android\ncd android && ./gradlew assembleDebug`,
    expectedOutput: "BUILD SUCCESSFUL in 42s — app-debug.apk generated",
    notes: {
      coreConcepts: "applicationId is forever; versionCode must always increase; targetSdk is an annually-rising policy gate. Capacitor bridges web builds into a real Gradle project via cap sync.",
      proTip: "Automate versionCode from your CI run number or git commit count — manual version bumps are the #1 cause of rejected uploads.",
      keyTerms: [
        { term: "targetSdk", definition: "The API level whose behavior changes your app certifies against — required by Play policy to stay current." },
        { term: "versionCode", definition: "The monotonically increasing integer Play uses to order releases." },
        { term: "Capacitor", definition: "A native runtime that packages web apps into Android/iOS projects with access to native plugins." }
      ]
    },
    resources: [
      { name: "Capacitor Android Docs", url: "https://capacitorjs.com/docs/android", type: "docs" },
      { name: "Play Target API Requirements", url: "https://support.google.com/googleplay/android-developer/answer/11926878", type: "docs" },
      { name: "Configure Your Build (Gradle)", url: "https://developer.android.com/build", type: "docs" }
    ]
  },
  {
    id: "les-mob-1-2",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-1",
    order: 2,
    type: "video",
    title: "Lesson 1.2: Video — Publishing an Android App: The Full Journey",
    summary: "An end-to-end preview of the road ahead: from finished build to a live Play Store listing.",
    durationMinutes: 16,
    videoUrl: "https://www.youtube.com/embed/d8uEdeMgikU",
    videoPoster: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&w=1200&q=80",
    readingMarkdown: `
# Video Briefing

A full publish walkthrough — useful now as a map of the territory this course covers module by module.

**Watch for:**
- The overall sequence: build → sign → console setup → testing track → review → production.
- Which steps are one-time (developer account, app creation) vs. every-release (bundle upload, release notes).
- Where most first-time publishers get stuck (Data Safety form, content rating).

**Note-taking task:** list each console screen shown; you'll meet them formally in Modules 3, 4, and 6.
`,
    notes: {
      coreConcepts: "Publishing is a pipeline with one-time setup stages and per-release stages — knowing which is which keeps release day boring (the goal).",
      proTip: "Create your Google Play Developer account ($25, one-time) today — identity verification can take days and blocks everything downstream.",
      keyTerms: [
        { term: "Play Developer Account", definition: "The verified identity that owns your apps on Google Play; registration includes a one-time $25 fee." }
      ]
    },
    resources: [
      { name: "Play Console Sign-up", url: "https://play.google.com/console/signup", type: "docs" }
    ]
  },
  {
    id: "les-mob-1-3",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-1",
    order: 3,
    type: "lab",
    title: "Lesson 1.3: Practical Lab — Generate a Release-Ready Android Project",
    summary: "Wrap a web build with Capacitor, configure identity and API levels, and produce a clean debug build.",
    durationMinutes: 45,
    readingMarkdown: `
# Practical Lab

Produce the Android project you'll carry through the whole course: correct applicationId, targetSdk per policy, generated icons, and a green \`assembleDebug\` from a fresh clone.

Complete the lab in the **Lab Studio** panel below and submit your repo and build log for grading.
`,
    notes: {
      coreConcepts: "A project that builds only on your machine isn't production-ready — 'fresh clone to green build' is the bar.",
      proTip: "Commit the exact JDK and Gradle versions in .gitignore'd docs or gradle-wrapper.properties — 'works on my machine' in Android is usually a JDK mismatch.",
      keyTerms: [
        { term: "Gradle Wrapper", definition: "The committed gradlew scripts pinning the exact Gradle version for reproducible builds." }
      ]
    },
    resources: [
      { name: "Capacitor Getting Started", url: "https://capacitorjs.com/docs/getting-started", type: "docs" }
    ]
  },

  // ─────────────────────────────────────────────────────────
  // MODULE 2 — Android App Bundle (AAB) & Keystore Signing
  // ─────────────────────────────────────────────────────────
  {
    id: "les-mob-2-1",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-2",
    order: 1,
    type: "reading",
    title: "Lesson 2.1: Keystores, Play App Signing & Release AAB Compilation",
    summary: "Generate and protect an upload keystore, enable R8 minification, and compile a signed release Android App Bundle.",
    durationMinutes: 30,
    readingMarkdown: `
# Keystores, Play App Signing & Release AAB Compilation

Android proves app authenticity with cryptographic signing. Lose control of signing and you lose the ability to update your app — or worse, someone else gains it. This lesson makes the key ceremony safe and repeatable.

## 1. Generate the Upload Keystore

\`\`\`bash
keytool -genkeypair -v \\
  -keystore ndn-upload.keystore \\
  -alias ndn-upload \\
  -keyalg RSA -keysize 2048 -validity 10000
\`\`\`

Store it **outside the repository**, with the passwords in a password manager. A keystore committed to git is a security incident.

## 2. Play App Signing: Two Keys, Two Jobs

Modern publishing uses two keys:

- **Upload key** (yours) — signs what you upload; proves the upload came from you.
- **App signing key** (Google's, in their HSM) — signs what devices actually install.

Enroll in **Play App Signing** on first upload. The payoff: if your upload key leaks or is lost, Google can verify your identity and register a new one — without Play App Signing, a lost signing key permanently orphans your app.

## 3. Wire Signing into Gradle (Without Secrets in Git)

\`\`\`kotlin
// android/app/build.gradle
android {
    signingConfigs {
        release {
            storeFile file(System.getenv("NDN_KEYSTORE_PATH") ?: "missing.keystore")
            storePassword System.getenv("NDN_KEYSTORE_PASS")
            keyAlias "ndn-upload"
            keyPassword System.getenv("NDN_KEY_PASS")
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true       // R8 code shrinking + obfuscation
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
\`\`\`

Secrets flow in via environment variables — locally from your shell, in CI from the secret store.

## 4. R8: Smaller and Harder to Reverse

\`minifyEnabled true\` runs R8, which dead-strips unused code and obfuscates identifiers. Two duties come with it:

- **Keep rules** for reflection-accessed classes (\`proguard-rules.pro\`), or features break only in release builds.
- **Upload the mapping file** (\`app/build/outputs/mapping/release/mapping.txt\`) to Play so crash stack traces de-obfuscate.

## 5. Build the Bundle

\`\`\`bash
cd android && ./gradlew bundleRelease
# → app/build/outputs/bundle/release/app-release.aab
\`\`\`

**Why AAB, not APK?** You upload one bundle; Play generates optimized split APKs per device (ABI, density, language). Users download 20–40% less, and AAB is mandatory for new apps anyway.
`,
    terminalLanguage: "bash",
    starterCode: `keytool -genkeypair -v -keystore ndn-upload.keystore -alias ndn-upload -keyalg RSA -keysize 2048 -validity 10000\ncd android && ./gradlew bundleRelease`,
    expectedOutput: "BUILD SUCCESSFUL — app-release.aab (signed, 18.4 MB)",
    notes: {
      coreConcepts: "Two-key model: your upload key authenticates uploads; Google's app signing key signs installs. R8 shrinks and obfuscates release builds; the AAB lets Play serve device-optimized APKs.",
      proTip: "Test your release build (not just debug!) on a real device before every upload — R8 keep-rule bugs only manifest in minified builds.",
      keyTerms: [
        { term: "Play App Signing", definition: "Google-managed app signing where your upload key authenticates uploads and Google's HSM-held key signs installs." },
        { term: "R8", definition: "Android's code shrinker/obfuscator, enabled via minifyEnabled, requiring keep rules and mapping-file uploads." },
        { term: "Android App Bundle (AAB)", definition: "The publish format from which Play generates optimized per-device split APKs." }
      ]
    },
    resources: [
      { name: "Sign Your App", url: "https://developer.android.com/studio/publish/app-signing", type: "docs" },
      { name: "Play App Signing Help", url: "https://support.google.com/googleplay/android-developer/answer/9842756", type: "docs" },
      { name: "R8 Shrinking Docs", url: "https://developer.android.com/build/shrink-code", type: "docs" }
    ]
  },
  {
    id: "les-mob-2-2",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-2",
    order: 2,
    type: "video",
    title: "Lesson 2.2: Video — AAB Submission Checklist Walkthrough",
    summary: "A current checklist-style walkthrough of preparing and uploading an Android App Bundle.",
    durationMinutes: 15,
    videoUrl: "https://www.youtube.com/embed/0-ydSlKzsSw",
    videoPoster: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
    readingMarkdown: `
# Video Briefing

A practical checklist run for AAB preparation and submission.

**Watch for:**
- The signing configuration steps and where the upload key enters the flow.
- Common validation failures at upload time (versionCode conflicts, missing 64-bit support, targetSdk).
- What Play's pre-launch checks inspect automatically.

**Cross-check:** compare the video's checklist against Lesson 2.1's — anything the video adds, append to your own release checklist file.
`,
    notes: {
      coreConcepts: "Upload failures are almost always mechanical (versioning, signing, target API) — a maintained checklist converts them from surprises into non-events.",
      proTip: "Keep a RELEASING.md in your repo and update it after every release with anything that surprised you — future-you is your most important teammate.",
      keyTerms: [
        { term: "Pre-launch Report", definition: "Play's automatic device-lab test of your upload, catching crashes before real users do." }
      ]
    },
    resources: [
      { name: "About Android App Bundles", url: "https://developer.android.com/guide/app-bundle", type: "docs" }
    ]
  },
  {
    id: "les-mob-2-3",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-2",
    order: 3,
    type: "lab",
    title: "Lesson 2.3: Practical Lab — Sign & Build a Release AAB",
    summary: "Create your upload keystore, wire env-based signing into Gradle, enable R8, and produce a verified signed bundle.",
    durationMinutes: 50,
    readingMarkdown: `
# Practical Lab

Perform the key ceremony properly: generate the upload keystore, configure signing via environment variables, enable minification with working keep rules, and produce app-release.aab — then verify its signature with jarsigner.

Complete the lab in the **Lab Studio** panel below and submit for grading.
`,
    notes: {
      coreConcepts: "A signed AAB whose signature you have verified, built from config with zero secrets in git, is this module's deliverable.",
      proTip: "Run 'jarsigner -verify -verbose app-release.aab' after every release build — a silent signing misconfiguration wastes a full upload round-trip.",
      keyTerms: [
        { term: "jarsigner -verify", definition: "The JDK tool call that confirms an artifact's signature before you upload it." }
      ]
    },
    resources: [
      { name: "Build Your App Bundle", url: "https://developer.android.com/build/building-cmdline#build_bundle", type: "docs" }
    ]
  },

  // ─────────────────────────────────────────────────────────
  // MODULE 3 — Google Play Console Setup & Compliance
  // ─────────────────────────────────────────────────────────
  {
    id: "les-mob-3-1",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-3",
    order: 1,
    type: "reading",
    title: "Lesson 3.1: Play Console Compliance — Data Safety, Content Rating & Privacy Policy",
    summary: "Complete every mandatory declaration correctly: Data Safety form, content rating questionnaire, privacy policy, and app access notes.",
    durationMinutes: 30,
    readingMarkdown: `
# Play Console Compliance — Data Safety, Content Rating & Privacy Policy

Most first submissions are rejected not for code, but for **declarations**. Google cross-checks what you declare against what your binary actually does — inconsistency is treated as deception.

## 1. Create the App Entry

Console → All apps → Create app: name, default language, app/game, free/paid. Then the **Set up your app** dashboard lists every mandatory task. Work top to bottom; the release button stays locked until all are green.

## 2. Privacy Policy (Always Required)

Every app needs a privacy policy URL — even with zero data collection. It must be:
- publicly reachable (no login wall),
- specific to this app,
- consistent with your Data Safety answers.

Host it at a stable URL you control (e.g. \`https://ndnanalytics.com/academy/privacy\`).

## 3. The Data Safety Form — Where Apps Die

You declare, per data type: **collected?** shared? processed ephemerally? optional? purpose? encrypted in transit? user-deletable?

The traps:
- **Your SDKs count.** Firebase Analytics, Crashlytics, AdMob collect device identifiers — *you* must declare it. Check each SDK's published data-disclosure page.
- **WebView apps**: if your Capacitor app sends analytics from the web layer, that's collection.
- **"Collected" means leaves the device.** On-device-only processing isn't collection; your Firestore sync definitely is.

Mismatch between declaration and observed traffic → removal and strikes against the account.

## 4. Content Rating Questionnaire

An IARC questionnaire about violence, sexuality, gambling, user-generated content, etc. Answer truthfully — an education app with a chat feature must declare user interaction. Wrong answers (discovered later) are a policy strike; a conservative accurate rating costs you almost nothing.

## 5. App Access

If any feature sits behind login, provide **working demo credentials** for Google's reviewers. "Reviewer couldn't access the app" is a guaranteed rejection with a multi-day round trip.

## 6. The Compliance Mindset

Treat the console's declarations as a *legal interface to your binary*. Every SDK you add, every permission you request, every endpoint you call has a declaration consequence. Professional teams re-review the Data Safety form at every release that adds a dependency.
`,
    terminalLanguage: "bash",
    starterCode: `# Audit what your app actually collects before declaring:\n# 1) list SDKs\nnpm ls firebase @capacitor/app\n# 2) inspect manifest permissions\ngrep uses-permission android/app/src/main/AndroidManifest.xml`,
    expectedOutput: "firebase@12.x — INTERNET, ACCESS_NETWORK_STATE",
    notes: {
      coreConcepts: "Declarations are cross-checked against binary behavior. SDK data collection is your responsibility to declare; reviewers need working credentials for gated features.",
      proTip: "Keep a DATA_SAFETY.md mapping every SDK → data types → form answers. When Google updates the form (they do), you'll re-certify in minutes instead of re-auditing from scratch.",
      keyTerms: [
        { term: "Data Safety Form", definition: "Play's mandatory declaration of every data type your app and its SDKs collect or share, and why." },
        { term: "IARC Rating", definition: "The international age-rating generated from the content questionnaire." },
        { term: "Policy Strike", definition: "A recorded violation against your developer account; accumulation risks account termination." }
      ]
    },
    resources: [
      { name: "Data Safety Help", url: "https://support.google.com/googleplay/android-developer/answer/10787469", type: "docs" },
      { name: "Firebase Data Disclosure", url: "https://firebase.google.com/docs/android/play-data-disclosure", type: "docs" },
      { name: "Play Policy Center", url: "https://play.google.com/about/developer-content-policy/", type: "docs" }
    ]
  },
  {
    id: "les-mob-3-2",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-3",
    order: 2,
    type: "video",
    title: "Lesson 3.2: Video — Play Console Setup Walkthrough",
    summary: "Screen-by-screen tour of creating an app entry and completing the mandatory setup tasks.",
    durationMinutes: 16,
    videoUrl: "https://www.youtube.com/embed/cBn4CvkYHNY",
    videoPoster: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&w=1200&q=80",
    readingMarkdown: `
# Video Briefing

A current walkthrough of the Play Console app setup dashboard, screen by screen.

**Watch for:**
- The order dependencies: some tasks unlock others.
- How the dashboard communicates *why* a release button is still locked.
- Store listing draft vs. compliance declarations — different sections, both mandatory.

**Do-along:** if you have a developer account, mirror each step with your Module 1 app as the video plays.
`,
    notes: {
      coreConcepts: "The console's task dashboard is a dependency graph — completing tasks in its order avoids most 'why is this locked' confusion.",
      proTip: "Fill every console text field from a version-controlled listing.md — retyping store copy in a web form invites inconsistency across releases and languages.",
      keyTerms: [
        { term: "App Integrity Page", definition: "The console section managing signing, integrity, and related security settings for your app." }
      ]
    },
    resources: [
      { name: "Play Console Help Center", url: "https://support.google.com/googleplay/android-developer", type: "docs" }
    ]
  },
  {
    id: "les-mob-3-3",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-3",
    order: 3,
    type: "lab",
    title: "Lesson 3.3: Practical Lab — Complete a Compliant App Entry",
    summary: "Create the console entry and complete privacy policy, Data Safety, content rating, and app access — audit-backed.",
    durationMinutes: 45,
    readingMarkdown: `
# Practical Lab

Complete every mandatory declaration for your app: hosted privacy policy, SDK-audited Data Safety form, content rating, and app access credentials. Your submission evidence is the completed dashboard plus your SDK audit table.

Complete the lab in the **Lab Studio** panel below and submit for grading.
`,
    notes: {
      coreConcepts: "The audit table (SDK → data → declaration) is the artifact that separates guessed compliance from engineered compliance.",
      proTip: "Screenshot your completed Data Safety answers — the form has no export, and you'll want the record at your next release review.",
      keyTerms: [
        { term: "SDK Audit", definition: "Systematic review of each dependency's data collection against vendor disclosure docs." }
      ]
    },
    resources: [
      { name: "Google Play SDK Index", url: "https://play.google.com/sdks", type: "docs" }
    ]
  },

  // ─────────────────────────────────────────────────────────
  // MODULE 4 — Closed Testing Track & QA Management
  // ─────────────────────────────────────────────────────────
  {
    id: "les-mob-4-1",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-4",
    order: 1,
    type: "reading",
    title: "Lesson 4.1: Testing Tracks, Pre-Launch Reports & Android Vitals",
    summary: "Run internal and closed testing tracks, act on pre-launch reports, and monitor crash/ANR health via Android Vitals.",
    durationMinutes: 30,
    readingMarkdown: `
# Testing Tracks, Pre-Launch Reports & Android Vitals

Play's release tracks form a graduated exposure ladder. Skipping rungs is how 1-star launch reviews happen.

## 1. The Track Ladder

| Track | Audience | Review? | Purpose |
|---|---|---|---|
| Internal testing | ≤100 testers | No (instant) | Team smoke tests, minutes after upload |
| Closed testing | Invited lists/groups | Yes | Structured beta with real users |
| Open testing | Anyone via link | Yes | Public beta at scale |
| Production | Everyone | Yes | The real thing |

The same AAB **promotes** between tracks — you don't rebuild, so what you tested is byte-identical to what ships.

**New personal accounts** (created after Nov 2023) must run a closed test with 12+ testers for 14+ continuous days before production access — plan this into any launch timeline.

## 2. Managing Testers

Closed testing feeds from email lists or a Google Group (far easier to manage). Testers opt in through a web link, then receive builds via the normal Play Store — updates included, exactly like production users.

\`\`\`text
Console → Testing → Closed testing → Create track → Add Google Group
→ copy opt-in URL → send to testers
\`\`\`

## 3. Pre-Launch Report: Your Free Device Lab

Every upload to a testing track triggers automated crawls on a matrix of real physical devices. You get: crashes with stack traces, rendering screenshots per device, performance metrics, and basic security scan findings. It's free QA — read it every upload.

## 4. Android Vitals: The Numbers Google Judges You By

Vitals tracks your live quality metrics; two have **public thresholds with consequences**:

- **User-perceived crash rate**: bad behavior threshold 1.09%
- **ANR rate** (app not responding): threshold 0.47%

Exceed them and Play reduces your discoverability and may warn users on your listing. Crash clusters in Vitals + uploaded R8 mapping files (Module 2) = readable stack traces.

## 5. A Working Beta Loop

1. Upload to internal, team smoke test same day.
2. Promote to closed; announce changes to testers.
3. Triage pre-launch report + Vitals weekly.
4. Fix, bump versionCode, repeat.
5. Only promote to production a build that has soaked in closed testing for a full cycle.
`,
    terminalLanguage: "bash",
    starterCode: `# Promote the tested artifact — same bytes, new audience\n# Console → Closed testing → Promote release → Production\necho "Promoting build 12 (1.4.2) from closed → production"`,
    expectedOutput: "Promoting build 12 (1.4.2) from closed → production",
    notes: {
      coreConcepts: "Tracks are graduated exposure with byte-identical promotion. Pre-launch reports are a free device lab; Vitals thresholds (crash 1.09%, ANR 0.47%) carry real discoverability penalties.",
      proTip: "Use a Google Group for testers from day one — managing individual emails across releases becomes unmanageable past ten people.",
      keyTerms: [
        { term: "Release Track", definition: "A Play distribution channel (internal/closed/open/production) with its own audience and review requirements." },
        { term: "ANR", definition: "'Application Not Responding' — main-thread stalls over ~5s; tracked by Vitals with a 0.47% bad-behavior threshold." },
        { term: "Promotion", definition: "Moving the identical uploaded artifact from one track to the next — no rebuild, no drift." }
      ]
    },
    resources: [
      { name: "Set Up Testing Tracks", url: "https://support.google.com/googleplay/android-developer/answer/9845334", type: "docs" },
      { name: "Android Vitals Docs", url: "https://developer.android.com/topic/performance/vitals", type: "docs" },
      { name: "Pre-launch Reports", url: "https://support.google.com/googleplay/android-developer/answer/9842757", type: "docs" }
    ]
  },
  {
    id: "les-mob-4-2",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-4",
    order: 2,
    type: "video",
    title: "Lesson 4.2: Video — Managing App Releases in the Play Console (DevBytes)",
    summary: "Google's DevBytes tour of release management: tracks, staged rollouts, and release dashboards.",
    durationMinutes: 12,
    videoUrl: "https://www.youtube.com/embed/qGoCF0Et_CU",
    videoPoster: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80",
    readingMarkdown: `
# Video Briefing

Google's own DevBytes on the release-management workflow inside Play Console.

**Watch for:**
- Track promotion mechanics and where release notes enter.
- Staged rollout percentages — production's own canary mechanism (Module 6 uses this).
- The release dashboard signals that should gate promotion decisions.

**Connect it:** this is the mobile twin of Cloud Run traffic splitting from the GCP course — same philosophy, different platform.
`,
    notes: {
      coreConcepts: "Staged rollouts are canary deploys for mobile: expose a percentage, watch Vitals, expand or halt.",
      proTip: "Never start a production rollout on a Friday — halting at 5% on Monday morning beats debugging at 100% over the weekend.",
      keyTerms: [
        { term: "Staged Rollout", definition: "Releasing to a user percentage (1%→100%) with the ability to halt on quality regressions." }
      ]
    },
    resources: [
      { name: "Staged Rollouts Help", url: "https://support.google.com/googleplay/android-developer/answer/6346149", type: "docs" }
    ]
  },
  {
    id: "les-mob-4-3",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-4",
    order: 3,
    type: "lab",
    title: "Lesson 4.3: Practical Lab — Run a Closed Beta Cycle",
    summary: "Create internal and closed tracks, onboard testers via a Google Group, and triage your first pre-launch report.",
    durationMinutes: 50,
    readingMarkdown: `
# Practical Lab

Execute one full beta cycle: internal upload + smoke test, closed track with a tester group and opt-in link, pre-launch report triage with at least one filed issue, and a promotion decision memo.

Complete the lab in the **Lab Studio** panel below and submit for grading.
`,
    notes: {
      coreConcepts: "The promotion decision memo — 'ship/hold because X' backed by report data — is the professional habit this lab installs.",
      proTip: "Seed your closed test with the 14-day/12-tester requirement in mind if you're on a new personal account — start it before you *need* production access.",
      keyTerms: [
        { term: "Opt-in URL", definition: "The web link testers use to join a testing track before installing from Play." }
      ]
    },
    resources: [
      { name: "Closed Testing Requirements", url: "https://support.google.com/googleplay/android-developer/answer/14151465", type: "docs" }
    ]
  },

  // ─────────────────────────────────────────────────────────
  // MODULE 5 — Google Play Integrity API
  // ─────────────────────────────────────────────────────────
  {
    id: "les-mob-5-1",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-5",
    order: 1,
    type: "reading",
    title: "Lesson 5.1: Play Integrity API — Verdicts, Server Verification & Anti-Tamper",
    summary: "Request integrity tokens on-device, decrypt verdicts server-side, and act on device/app/licensing signals correctly.",
    durationMinutes: 35,
    readingMarkdown: `
# Play Integrity API — Verdicts, Server Verification & Anti-Tamper

The Play Integrity API answers three questions about a running client: is it **your unmodified binary**, installed **from Play**, on a **genuine Android device**? Used correctly, it neutralizes tampered clones, emulator farms, and API abuse.

## 1. The Golden Rule: Verdicts Are Verified Server-Side

The client never interprets its own integrity — a tampered app would simply lie. The flow:

\`\`\`text
1. Your server issues a one-time nonce (or you hash the request payload)
2. Client requests an integrity token, binding the nonce
3. Client sends token to YOUR server
4. Server decrypts/verifies via Google's API
5. Server checks nonce match + verdicts → allow or deny
\`\`\`

## 2. Client Side (Standard Request)

\`\`\`kotlin
val integrityManager = IntegrityManagerFactory.create(context)
val response = integrityManager.requestIntegrityToken(
    IntegrityTokenRequest.builder()
        .setNonce(nonceFromServer)      // binds token to THIS action
        .setCloudProjectNumber(123456789L)
        .build()
)
// send response.token() to your backend with the API call
\`\`\`

## 3. Server Side: Decode & Enforce

\`\`\`typescript
import { google } from "googleapis";

const playintegrity = google.playintegrity("v1");
const { data } = await playintegrity.v1.decodeIntegrityToken({
  packageName: "com.ndnanalytics.academy",
  requestBody: { integrityToken: token },
});

const v = data.tokenPayloadExternal!;
const nonceOk   = v.requestDetails?.nonce === expectedNonce;
const appOk     = v.appIntegrity?.appRecognitionVerdict === "PLAY_RECOGNIZED";
const deviceOk  = v.deviceIntegrity?.deviceRecognitionVerdict?.includes("MEETS_DEVICE_INTEGRITY");
const licenseOk = v.accountDetails?.appLicensingVerdict === "LICENSED";

if (!(nonceOk && appOk && deviceOk)) deny();
\`\`\`

## 4. Reading the Verdicts

- **appRecognitionVerdict**: \`PLAY_RECOGNIZED\` | \`UNRECOGNIZED_VERSION\` (modified or sideloaded build) | \`UNEVALUATED\`
- **deviceRecognitionVerdict**: \`MEETS_DEVICE_INTEGRITY\` (attested, unrooted) | \`MEETS_BASIC_INTEGRITY\` | \`MEETS_STRONG_INTEGRITY\` (hardware-backed, recent patch)
- **appLicensingVerdict**: \`LICENSED\` | \`UNLICENSED\` | \`UNEVALUATED\`

## 5. Enforcement Strategy — Don't Hard-Fail Everything

Blanket-blocking anything below STRONG locks out legitimate users on older devices. A production-grade policy is *tiered*:

| Action | Required bar |
|---|---|
| Browse content | none |
| Submit graded quiz | MEETS_DEVICE_INTEGRITY + PLAY_RECOGNIZED |
| Issue certificate / payment | + LICENSED, fresh nonce, request-hash binding |

Also respect the quotas: standard requests are for high-value actions, not every API call — cache a session-level result where the threat model allows.
`,
    terminalLanguage: "typescript",
    starterCode: `const verdict = {\n  appRecognitionVerdict: "PLAY_RECOGNIZED",\n  deviceRecognitionVerdict: ["MEETS_DEVICE_INTEGRITY"]\n};\nconsole.log("Integrity check:", verdict.appRecognitionVerdict === "PLAY_RECOGNIZED" ? "PASS" : "FAIL");`,
    expectedOutput: "Integrity check: PASS",
    notes: {
      coreConcepts: "Integrity is a server-side decision on Google-verified verdicts bound to a nonce. Tier enforcement by action value; never let the client judge itself.",
      proTip: "Always bind tokens to a server nonce or request hash — an unbound token can be harvested from a legitimate session and replayed by a bot.",
      keyTerms: [
        { term: "Nonce", definition: "A single-use server-issued value bound into the integrity token, preventing replay attacks." },
        { term: "Verdict", definition: "Google's signed judgment on app authenticity, device integrity, and license status." },
        { term: "MEETS_STRONG_INTEGRITY", definition: "The hardware-attested tier requiring a recent security patch — reserve it for the highest-value actions." }
      ]
    },
    resources: [
      { name: "Play Integrity Overview", url: "https://developer.android.com/google/play/integrity/overview", type: "docs" },
      { name: "Verdict Reference", url: "https://developer.android.com/google/play/integrity/verdicts", type: "docs" },
      { name: "Standard vs Classic Requests", url: "https://developer.android.com/google/play/integrity/standard", type: "docs" }
    ]
  },
  {
    id: "les-mob-5-2",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-5",
    order: 2,
    type: "video",
    title: "Lesson 5.2: Video — Play Integrity API for Android Developers",
    summary: "Google's explainer of the Integrity API threat model, verdict types, and integration guidance.",
    durationMinutes: 14,
    videoUrl: "https://www.youtube.com/embed/dqUTX6hR9Mk",
    videoPoster: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    readingMarkdown: `
# Video Briefing

Google's own walkthrough of what Play Integrity protects against and how the pieces fit.

**Watch for:**
- The attack taxonomy: repackaged apps, rooted devices, emulators, unlicensed installs.
- Why verdict evaluation must happen on your server (the video reinforces Lesson 5.1's golden rule).
- Guidance on graceful degradation vs. hard blocking.

**Threat-model exercise:** for the academy app, write one realistic attack each verdict type would stop.
`,
    notes: {
      coreConcepts: "Each verdict maps to a concrete attack class — design enforcement per attack you actually care about, not maximal paranoia.",
      proTip: "Log verdict distributions before enforcing — knowing that 3% of your real users are MEETS_BASIC_INTEGRITY-only stops you shipping a lockout.",
      keyTerms: [
        { term: "Graceful Degradation", definition: "Reducing functionality for lower-integrity clients instead of hard-blocking them." }
      ]
    },
    resources: [
      { name: "Device & App Attestation (video)", url: "https://www.youtube.com/watch?v=srA5zJMbebw", type: "video" }
    ]
  },
  {
    id: "les-mob-5-3",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-5",
    order: 3,
    type: "lab",
    title: "Lesson 5.3: Practical Lab — End-to-End Integrity Verification",
    summary: "Implement nonce issuance, client token requests, and server-side verdict enforcement with a tiered policy.",
    durationMinutes: 55,
    readingMarkdown: `
# Practical Lab

Build the full integrity loop: server nonce endpoint, client token request, server decode + nonce/verdict checks, and a tiered enforcement policy with logging. Include a replay-attack test proving the nonce check works.

Complete the lab in the **Lab Studio** panel below and submit for grading.
`,
    notes: {
      coreConcepts: "The replay test is the lab's teeth — proving a captured token fails on second use is proving the whole design.",
      proTip: "Return the same generic error for every integrity failure — detailed errors teach attackers exactly which check they tripped.",
      keyTerms: [
        { term: "Replay Attack", definition: "Re-submitting a previously valid token/credential — defeated by single-use nonces." }
      ]
    },
    resources: [
      { name: "Play Integrity Server Samples", url: "https://github.com/android/play-integrity-samples", type: "repo" }
    ]
  },

  // ─────────────────────────────────────────────────────────
  // MODULE 6 — Store Listing Optimization & Production Release
  // ─────────────────────────────────────────────────────────
  {
    id: "les-mob-6-1",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-6",
    order: 1,
    type: "reading",
    title: "Lesson 6.1: Store Listing ASO, Graphic Assets & the Production Rollout",
    summary: "Write a converting store listing, prepare compliant graphics, localize, and execute a staged production rollout.",
    durationMinutes: 30,
    readingMarkdown: `
# Store Listing ASO, Graphic Assets & the Production Rollout

App Store Optimization (ASO) is SEO for Play: the right users finding you, and the listing converting them to installs. Then production rollout puts everything from this course on the line — gently.

## 1. Listing Text That Works

- **Title (30 chars)**: brand + top keyword. \`NDN Academy: Cloud & AI Skills\` beats \`NDN Academy\`.
- **Short description (80 chars)**: your single conversion sentence, keyword-bearing — it's what users see before "read more".
- **Full description (4000 chars)**: first 3 lines carry the pitch (visible pre-expansion); then scannable feature blocks. Keyword *stuffing* is a policy violation; natural relevance wins.

Play indexes title, short and full description — iOS-style hidden keyword fields don't exist here.

## 2. Graphic Assets (Exact Specs)

| Asset | Spec | Notes |
|---|---|---|
| App icon | 512×512 PNG, ≤1 MB | No badges like "sale"/"new" |
| Feature graphic | 1024×500 | Shown in promos/video header |
| Phone screenshots | 2–8, 16:9 or 9:16 | First two do 90% of the convincing |
| Tablet screenshots | 7"/10" sets | Required for tablet ranking |

Screenshots may be *lightly* annotated (caption bars) but must show the real app — misleading imagery is enforceable.

## 3. Localization

Play auto-translates nothing you don't provide. Even 2–3 locales (e.g. EN + FR + DE) measurably lift conversion in those markets. Use the console's per-locale listing entries, and localize the *screenshots'* caption text too.

## 4. Pre-Launch Final Gate

- [ ] Closed-test soak complete, Vitals green (crash <1.09%, ANR <0.47%)
- [ ] Data Safety re-checked against final SDK set
- [ ] Listing assets pass spec; policy review of title/icon
- [ ] Rollback plan: previous AAB retained, release notes drafted

## 5. Staged Rollout — Production Is a Dial, Not a Switch

\`\`\`text
Day 0:  5%  → watch Vitals + reviews for 48h
Day 2:  20% → error budget holding?
Day 4:  50%
Day 6:  100% 🎉
\`\`\`

A halted rollout at 5% is a Tuesday; a bad build at 100% is a crisis. **Halting stops new users getting the bad build; it does not un-ship it** from those who already updated — which is why the ladder starts at 5%, not 50%.

## 6. Post-Launch Rhythm

Reviews are ranking signal *and* support channel — reply, especially to 1–2 stars (replies convert surprisingly often). Watch acquisition → conversion in the console's store performance reports, and A/B test listing changes with Store Listing Experiments rather than guessing.
`,
    terminalLanguage: "bash",
    starterCode: `# Final release gate\njarsigner -verify app-release.aab && echo "GATE 1: signature OK"\necho "GATE 2: Vitals green" && echo "GATE 3: rollout 5% → GO"`,
    expectedOutput: "GATE 1: signature OK\nGATE 2: Vitals green\nGATE 3: rollout 5% → GO",
    notes: {
      coreConcepts: "Title/short description carry ASO weight; screenshots carry conversion. Production is a staged dial with Vitals as the gate — halting protects new users but doesn't recall shipped builds.",
      proTip: "Run Store Listing Experiments on one variable at a time (icon OR screenshots) — Play's built-in A/B testing beats intuition every time.",
      keyTerms: [
        { term: "ASO", definition: "App Store Optimization — maximizing discovery (keywords) and conversion (assets) on the store." },
        { term: "Store Listing Experiment", definition: "Play's native A/B test for listing assets measured on real install conversion." },
        { term: "Rollout Halt", definition: "Stopping a staged rollout so no new users receive the release; already-updated users keep it." }
      ]
    },
    resources: [
      { name: "Graphic Asset Specs", url: "https://support.google.com/googleplay/android-developer/answer/9866151", type: "docs" },
      { name: "Store Listing Experiments", url: "https://support.google.com/googleplay/android-developer/answer/12922867", type: "docs" },
      { name: "Ratings & Reviews Best Practice", url: "https://developer.android.com/distribute/best-practices/engage/ratings-reviews", type: "docs" }
    ]
  },
  {
    id: "les-mob-6-2",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-6",
    order: 2,
    type: "video",
    title: "Lesson 6.2: Video — Device & App Attestation in Production",
    summary: "How Play Integrity signals combine with release practices to keep a production app trustworthy at scale.",
    durationMinutes: 13,
    videoUrl: "https://www.youtube.com/embed/srA5zJMbebw",
    videoPoster: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1200&q=80",
    readingMarkdown: `
# Video Briefing

A production-lens session on attestation: what integrity signals mean once you have real traffic.

**Watch for:**
- How attestation data informs abuse response after launch (not just at request time).
- The operational side: monitoring verdict rates as a production health metric.
- Balancing security posture against user friction at scale.

**Synthesis task:** add an 'integrity verdict rate' line to the launch-monitoring dashboard you'd build for the Module 6 rollout.
`,
    notes: {
      coreConcepts: "Post-launch, verdict-rate shifts are a security telemetry stream — a sudden UNRECOGNIZED_VERSION spike usually means a repackaged clone is circulating.",
      proTip: "Alert on verdict *rate changes*, not absolute numbers — baselines differ wildly by market and device mix.",
      keyTerms: [
        { term: "Abuse Telemetry", definition: "Monitoring integrity/licensing verdict distributions over time to detect attacks on a live app." }
      ]
    },
    resources: [
      { name: "Play Integrity in Production", url: "https://developer.android.com/google/play/integrity/setup", type: "docs" }
    ]
  },
  {
    id: "les-mob-6-3",
    courseId: "course-play-store-dev",
    moduleId: "mod-mob-6",
    order: 3,
    type: "lab",
    title: "Lesson 6.3: Practical Lab — Full Store Listing & Staged Launch Plan",
    summary: "Produce the complete listing asset kit, localized copy, and an executable staged rollout plan with halt criteria.",
    durationMinutes: 50,
    readingMarkdown: `
# Practical Lab

The course finale before the capstone: build the full listing kit (title/descriptions in two locales, icon, feature graphic, 4+ screenshots to spec) and a written staged rollout plan with numeric halt criteria tied to Vitals thresholds.

Complete the lab in the **Lab Studio** panel below and submit for grading.
`,
    notes: {
      coreConcepts: "Numeric halt criteria decided *before* launch ('halt if crash rate >1% at any stage') are what make rollout decisions calm instead of political.",
      proTip: "Design screenshots as a story sequence (problem → feature → outcome) — users swipe through them like a pitch deck.",
      keyTerms: [
        { term: "Halt Criteria", definition: "Pre-agreed numeric thresholds that automatically stop a rollout stage." }
      ]
    },
    resources: [
      { name: "Listing Best Practices", url: "https://developer.android.com/distribute/best-practices/launch/store-listing", type: "docs" }
    ]
  }
];
