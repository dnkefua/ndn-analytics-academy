export interface LabEvidenceGuide {
  labId: string;
  focus: string;
  screenshot: {
    src: string;
    alt: string;
    caption: string;
  };
  docs: Array<{
    name: string;
    url: string;
  }>;
  walkthrough: string[];
  evidence: string[];
  pitfalls: string[];
}

const img = (labId: string) => `/lesson-assets/lab-guides/${labId}.jpg`;

export const LAB_EVIDENCE_GUIDES: Record<string, LabEvidenceGuide> = {
  "lab-fb-1": {
    labId: "lab-fb-1",
    focus: "Initialize Firebase for the web and prove the project configuration is wired to the correct app.",
    screenshot: {
      src: img("lab-fb-1"),
      alt: "Official Firebase web setup documentation screenshot.",
      caption: "Official Firebase web setup docs - use this as the setup and SDK initialization reference."
    },
    docs: [
      { name: "Firebase Web Setup", url: "https://firebase.google.com/docs/web/setup" },
      { name: "Firebase Console", url: "https://console.firebase.google.com/" }
    ],
    walkthrough: [
      "Create or select the Firebase project and register the web app.",
      "Install the Firebase SDK, initialize the app, and keep environment-specific values outside hard-coded components.",
      "Render a health panel that shows project ID, auth domain, and app initialization status."
    ],
    evidence: [
      "Firebase console project/web-app screenshot.",
      "SDK initialization code snippet.",
      "Local health panel screenshot or terminal output."
    ],
    pitfalls: [
      "Using config from the wrong Firebase project.",
      "Initializing Firebase more than once in hot reload.",
      "Skipping a visible health check and relying only on console logs."
    ]
  },
  "lab-fb-2": {
    labId: "lab-fb-2",
    focus: "Build an authenticated flow and enforce role-aware UI behavior with custom claims.",
    screenshot: {
      src: img("lab-fb-2"),
      alt: "Official Firebase Authentication web documentation screenshot.",
      caption: "Official Firebase Authentication web docs - follow the SDK initialization and sign-in flow."
    },
    docs: [
      { name: "Firebase Auth Web", url: "https://firebase.google.com/docs/auth/web/start" },
      { name: "Custom Claims", url: "https://firebase.google.com/docs/auth/admin/custom-claims" }
    ],
    walkthrough: [
      "Enable the provider, create a test user, and wire sign-in/sign-out state.",
      "Add a role claim through the Admin SDK or emulator seed script.",
      "Show user identity and role-gated UI in the app, then refresh the ID token to prove claims update."
    ],
    evidence: [
      "Auth provider configuration screenshot.",
      "Signed-in user screenshot with role state.",
      "Redacted token/claims verification output."
    ],
    pitfalls: [
      "Expecting custom claims to appear before refreshing the token.",
      "Trusting client-side role checks without server/rules enforcement.",
      "Mixing emulator users with production auth users."
    ]
  },
  "lab-fb-3": {
    labId: "lab-fb-3",
    focus: "Design Firestore collections, indexes, and paginated reads that can survive production scale.",
    screenshot: {
      src: img("lab-fb-3"),
      alt: "Official Cloud Firestore documentation screenshot.",
      caption: "Official Cloud Firestore docs - use this as the source for document, collection, and query behavior."
    },
    docs: [
      { name: "Cloud Firestore", url: "https://firebase.google.com/docs/firestore" },
      { name: "Query Cursors", url: "https://firebase.google.com/docs/firestore/query-data/query-cursors" }
    ],
    walkthrough: [
      "Model collections and documents around the screen query patterns.",
      "Create the required composite index before the query fails in production.",
      "Implement cursor-based pagination and record the read count for each page."
    ],
    evidence: [
      "Schema diagram or collection screenshot.",
      "Index definition screenshot or JSON.",
      "Pagination screenshot with first and next page proof."
    ],
    pitfalls: [
      "Using offset pagination and paying for skipped reads.",
      "Forgetting that collection group queries need matching rules and indexes.",
      "Embedding unbounded arrays in documents."
    ]
  },
  "lab-fb-4": {
    labId: "lab-fb-4",
    focus: "Write, test, and deploy Firestore Security Rules as a zero-trust authorization layer.",
    screenshot: {
      src: img("lab-fb-4"),
      alt: "Official Firebase Security Rules documentation screenshot.",
      caption: "Official Firebase Security Rules docs - anchor your rule tests and deploy proof here."
    },
    docs: [
      { name: "Firebase Security Rules", url: "https://firebase.google.com/docs/rules" },
      { name: "Rules Unit Testing", url: "https://firebase.google.com/docs/rules/unit-tests" }
    ],
    walkthrough: [
      "Write rules for owner, admin, and anonymous contexts.",
      "Run emulator tests for allowed and denied reads/writes.",
      "Deploy rules and capture the ruleset version."
    ],
    evidence: [
      "Rules file excerpt.",
      "Passing emulator test output.",
      "Firebase console rules version screenshot."
    ],
    pitfalls: [
      "Testing only happy paths.",
      "Letting list queries bypass per-document assumptions.",
      "Deploying rules without versioned test evidence."
    ]
  },
  "lab-fb-5": {
    labId: "lab-fb-5",
    focus: "Build idempotent Cloud Functions triggers with clear logs and retry-safe writes.",
    screenshot: {
      src: img("lab-fb-5"),
      alt: "Official Cloud Functions for Firebase documentation screenshot.",
      caption: "Official Cloud Functions for Firebase docs - reference trigger behavior, deployment, and logging."
    },
    docs: [
      { name: "Cloud Functions for Firebase", url: "https://firebase.google.com/docs/functions" },
      { name: "Firestore Triggers", url: "https://firebase.google.com/docs/functions/firestore-events" }
    ],
    walkthrough: [
      "Create the event trigger and make the write path idempotent.",
      "Deploy to the intended region and capture logs for one successful event.",
      "Replay or duplicate the event path to prove it does not double-write."
    ],
    evidence: [
      "Function source code.",
      "Deployment output or Firebase console function screenshot.",
      "Logs showing one event and one durable result."
    ],
    pitfalls: [
      "Assuming triggers run exactly once.",
      "Writing to the same document path that triggers the function without a guard.",
      "Skipping structured logs."
    ]
  },
  "lab-fb-6": {
    labId: "lab-fb-6",
    focus: "Deploy an authenticated Cloud Run service and prove the Firebase token boundary.",
    screenshot: {
      src: img("lab-fb-6"),
      alt: "Official Cloud Run deploy from source documentation screenshot.",
      caption: "Official Cloud Run source deploy docs - use this for deployment and service verification."
    },
    docs: [
      { name: "Deploy From Source", url: "https://docs.cloud.google.com/run/docs/deploying-source-code" },
      { name: "Cloud Run Authentication", url: "https://cloud.google.com/run/docs/authenticating/service-to-service" }
    ],
    walkthrough: [
      "Implement the PORT and 0.0.0.0 server contract.",
      "Verify Firebase ID tokens in middleware before protected routes.",
      "Deploy and capture the 401 without token and 200 with token evidence pair."
    ],
    evidence: [
      "Middleware code snippet.",
      "Cloud Run service URL.",
      "Two terminal captures: unauthorized 401 and authorized 200."
    ],
    pitfalls: [
      "Listening on localhost inside the container.",
      "Treating decoded client claims as trusted without Admin SDK verification.",
      "Returning 500 instead of explicit 401/403 errors."
    ]
  },
  "lab-fb-7": {
    labId: "lab-fb-7",
    focus: "Complete a production App Hosting rollout with repo, secret, YAML, and live URL proof.",
    screenshot: {
      src: img("lab-fb-7"),
      alt: "Official Firebase App Hosting rollouts documentation screenshot.",
      caption: "Official App Hosting rollout docs - use the Rollouts tab as the green deployment evidence target."
    },
    docs: [
      { name: "App Hosting Overview", url: "https://firebase.google.com/docs/app-hosting" },
      { name: "Manage Rollouts", url: "https://firebase.google.com/docs/app-hosting/rollouts" }
    ],
    walkthrough: [
      "Connect GitHub, set the live branch, and confirm automatic rollouts.",
      "Bind Secret Manager values in apphosting.yaml with correct BUILD/RUNTIME availability.",
      "Push a commit, watch the rollout, and verify the hosted URL."
    ],
    evidence: [
      "apphosting.yaml.",
      "Green rollout screenshot.",
      "Live URL and curl output."
    ],
    pitfalls: [
      "Putting secret values directly in YAML.",
      "Using RUNTIME-only availability for Vite build variables.",
      "Ignoring failed health checks after a successful build."
    ]
  },
  "lab-gcp-1": {
    labId: "lab-gcp-1",
    focus: "Bootstrap GCP resources from the CLI with a reproducible project, API, VPC, subnet, and firewall trail.",
    screenshot: {
      src: img("lab-gcp-1"),
      alt: "Official Google Cloud resource hierarchy documentation screenshot.",
      caption: "Official Google Cloud resource hierarchy docs - anchor project and folder decisions here."
    },
    docs: [
      { name: "Resource Hierarchy", url: "https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy" },
      { name: "gcloud Cheat Sheet", url: "https://cloud.google.com/sdk/docs/cheatsheet" }
    ],
    walkthrough: [
      "Set the active project and enable every API required by later modules.",
      "Create the custom-mode VPC, subnet, and scoped firewall rule.",
      "Save commands into a repeatable bootstrap script and re-run it safely."
    ],
    evidence: [
      "bootstrap.sh.",
      "Enabled services output.",
      "Network/subnet/firewall describe output."
    ],
    pitfalls: [
      "Relying on console clicks instead of a script.",
      "Creating auto-mode networks by accident.",
      "Leaving broad 0.0.0.0/0 firewall rules."
    ]
  },
  "lab-gcp-2": {
    labId: "lab-gcp-2",
    focus: "Build a minimal container, scan it, tag it, and push it to Artifact Registry.",
    screenshot: {
      src: img("lab-gcp-2"),
      alt: "Official Artifact Registry Docker image documentation screenshot.",
      caption: "Official Artifact Registry Docker docs - follow repository, image name, and push conventions."
    },
    docs: [
      { name: "Artifact Registry Docker Images", url: "https://cloud.google.com/artifact-registry/docs/docker/store-docker-container-images" },
      { name: "Docker Multi-stage Builds", url: "https://docs.docker.com/build/building/multi-stage/" }
    ],
    walkthrough: [
      "Write a multi-stage Dockerfile with lockfile-first dependency install.",
      "Build and inspect image size, user, exposed port, and layer history.",
      "Tag with a version or git SHA and push to Artifact Registry."
    ],
    evidence: [
      "Dockerfile and .dockerignore.",
      "Image size and user proof.",
      "Artifact Registry path and scan status screenshot."
    ],
    pitfalls: [
      "Copying node_modules into the final image.",
      "Running as root without a reason.",
      "Using latest tags for review evidence."
    ]
  },
  "lab-gcp-3": {
    labId: "lab-gcp-3",
    focus: "Use Cloud Run revisions, tags, smoke tests, and traffic splitting for a controlled canary release.",
    screenshot: {
      src: img("lab-gcp-3"),
      alt: "Official Cloud Run rollouts and traffic migration documentation screenshot.",
      caption: "Official Cloud Run rollout docs - use this as the traffic split and rollback reference."
    },
    docs: [
      { name: "Cloud Run Traffic Migration", url: "https://docs.cloud.google.com/run/docs/rollouts-rollbacks-traffic-migration" },
      { name: "Cloud Run Revisions", url: "https://cloud.google.com/run/docs/managing/revisions" }
    ],
    walkthrough: [
      "Deploy the new revision with no traffic and a canary tag.",
      "Smoke-test the tagged URL before sending user traffic.",
      "Shift 10 percent, monitor, then promote or roll back."
    ],
    evidence: [
      "No-traffic deploy command.",
      "Canary smoke-test output.",
      "Traffic split screenshot or describe output."
    ],
    pitfalls: [
      "Sending traffic before health checks pass.",
      "Not preserving the rollback target.",
      "Testing the old production URL instead of the tagged revision."
    ]
  },
  "lab-gcp-4": {
    labId: "lab-gcp-4",
    focus: "Lock down service access with least-privilege IAM, dedicated service accounts, and Secret Manager.",
    screenshot: {
      src: img("lab-gcp-4"),
      alt: "Official Google Cloud IAM documentation screenshot.",
      caption: "Official IAM overview docs - use this as the role and policy design reference."
    },
    docs: [
      { name: "IAM Overview", url: "https://cloud.google.com/iam/docs/overview" },
      { name: "Secret Manager Access Control", url: "https://cloud.google.com/secret-manager/docs/access-control" }
    ],
    walkthrough: [
      "Create one runtime service account per workload.",
      "Grant only the roles required for the service and secret access.",
      "Verify allowed and denied paths with impersonation or curl evidence."
    ],
    evidence: [
      "IAM policy diff.",
      "Secret access proof.",
      "403/200 access-control captures."
    ],
    pitfalls: [
      "Granting roles/editor for convenience.",
      "Sharing one service account across unrelated workloads.",
      "Forgetting to remove temporary human access."
    ]
  },
  "lab-gcp-5": {
    labId: "lab-gcp-5",
    focus: "Codify a Cloud Run stack with Terraform modules, state, outputs, and a reviewable plan.",
    screenshot: {
      src: img("lab-gcp-5"),
      alt: "Official Terraform on Google Cloud documentation screenshot.",
      caption: "Official Terraform on Google Cloud docs - anchor provider, state, and module structure here."
    },
    docs: [
      { name: "Terraform on Google Cloud", url: "https://cloud.google.com/docs/terraform" },
      { name: "Google Terraform Provider", url: "https://registry.terraform.io/providers/hashicorp/google/latest/docs" }
    ],
    walkthrough: [
      "Define provider, variables, service, IAM, and outputs.",
      "Run format, validate, plan, and apply with reviewed diffs.",
      "Capture state backend and output URLs without exposing secrets."
    ],
    evidence: [
      "Terraform files.",
      "terraform plan summary.",
      "terraform output and deployed service screenshot."
    ],
    pitfalls: [
      "Committing local state files.",
      "Using hard-coded project IDs where variables belong.",
      "Applying without reviewing the plan."
    ]
  },
  "lab-gcp-6": {
    labId: "lab-gcp-6",
    focus: "Create a keyless merge-to-production path with Cloud Build or GitHub Actions.",
    screenshot: {
      src: img("lab-gcp-6"),
      alt: "Official Cloud Build GitHub connection documentation screenshot.",
      caption: "Official Cloud Build GitHub connection docs - use this as the repo trigger reference."
    },
    docs: [
      { name: "Connect GitHub to Cloud Build", url: "https://docs.cloud.google.com/build/docs/automating-builds/github/connect-repo-github" },
      { name: "Workload Identity Federation", url: "https://cloud.google.com/iam/docs/workload-identity-federation" }
    ],
    walkthrough: [
      "Connect the repository and define branch or tag trigger criteria.",
      "Use keyless identity rather than downloaded JSON keys.",
      "Run tests, deploy no-traffic, smoke-test, and promote."
    ],
    evidence: [
      "Workflow or cloudbuild.yaml.",
      "Successful run link or screenshot.",
      "Deployment URL and smoke-test output."
    ],
    pitfalls: [
      "Storing service account keys in repo secrets.",
      "Deploying before tests finish.",
      "Not pinning environment promotion rules."
    ]
  },
  "lab-mob-1": {
    labId: "lab-mob-1",
    focus: "Generate a release-ready Android project with target SDK, build config, and Capacitor packaging in order.",
    screenshot: {
      src: img("lab-mob-1"),
      alt: "Official Android build documentation screenshot.",
      caption: "Official Android build docs - use this for Gradle, variants, and release build structure."
    },
    docs: [
      { name: "Android Build", url: "https://developer.android.com/build" },
      { name: "Capacitor Android", url: "https://capacitorjs.com/docs/android" }
    ],
    walkthrough: [
      "Sync the web app into Android and inspect Gradle configuration.",
      "Set package ID, app label, version code, and target SDK.",
      "Run a release build dry run and capture the artifact path."
    ],
    evidence: [
      "Android project tree screenshot.",
      "Gradle config excerpt.",
      "Release build output."
    ],
    pitfalls: [
      "Changing package ID after Play Console setup.",
      "Ignoring target SDK deadlines.",
      "Shipping debug-only config."
    ]
  },
  "lab-mob-2": {
    labId: "lab-mob-2",
    focus: "Sign and build a release Android App Bundle with Play App Signing assumptions documented.",
    screenshot: {
      src: img("lab-mob-2"),
      alt: "Official Android App Bundle documentation screenshot.",
      caption: "Official Android App Bundle docs - use this for AAB packaging and upload expectations."
    },
    docs: [
      { name: "Android App Bundles", url: "https://developer.android.com/guide/app-bundle" },
      { name: "Play App Signing", url: "https://support.google.com/googleplay/android-developer/answer/9842756?hl=en" }
    ],
    walkthrough: [
      "Create or identify the upload key and keep secrets outside git.",
      "Build the signed AAB and verify the signature.",
      "Document version code, version name, and upload key ownership."
    ],
    evidence: [
      "Signing config with secrets redacted.",
      "AAB build output.",
      "Signature verification output."
    ],
    pitfalls: [
      "Committing keystore files or passwords.",
      "Reusing debug signing for release.",
      "Forgetting to increment versionCode."
    ]
  },
  "lab-mob-3": {
    labId: "lab-mob-3",
    focus: "Complete Play Console policy and listing declarations with a defensible SDK/data audit.",
    screenshot: {
      src: img("lab-mob-3"),
      alt: "Official Google Play data safety documentation screenshot.",
      caption: "Official Google Play data safety docs - use this for policy and declaration evidence."
    },
    docs: [
      { name: "Play Data Safety", url: "https://support.google.com/googleplay/android-developer/answer/9859455?hl=en" },
      { name: "Play Policy Center", url: "https://play.google.com/about/developer-content-policy/" }
    ],
    walkthrough: [
      "Inventory SDKs, collected data types, and sharing behavior.",
      "Fill Data Safety, content rating, app access, and privacy policy fields.",
      "Capture the dashboard state and unresolved policy items."
    ],
    evidence: [
      "SDK-to-data audit table.",
      "Privacy policy URL.",
      "Play Console declaration screenshots."
    ],
    pitfalls: [
      "Guessing data safety answers without SDK evidence.",
      "Forgetting app access credentials for reviewers.",
      "Leaving privacy policy pages unpublished."
    ]
  },
  "lab-mob-4": {
    labId: "lab-mob-4",
    focus: "Run a closed beta cycle, review pre-launch reports, and make a data-backed promotion decision.",
    screenshot: {
      src: img("lab-mob-4"),
      alt: "Official Google Play testing documentation screenshot.",
      caption: "Official Play testing docs - use this for closed testing setup and tester evidence."
    },
    docs: [
      { name: "Set Up Testing", url: "https://support.google.com/googleplay/android-developer/answer/9845334?hl=en" },
      { name: "Pre-launch Reports", url: "https://support.google.com/googleplay/android-developer/answer/7002270?hl=en" }
    ],
    walkthrough: [
      "Create the testing track and add testers or a Google Group.",
      "Upload the same signed artifact intended for promotion.",
      "Review crash, screenshot, and vitals signals before writing the ship/hold memo."
    ],
    evidence: [
      "Closed track tester setup screenshot.",
      "Pre-launch report findings.",
      "Promotion decision memo."
    ],
    pitfalls: [
      "Testing a different artifact than production.",
      "Ignoring pre-launch screenshots on small devices.",
      "Treating tester opt-in as immediate availability."
    ]
  },
  "lab-mob-5": {
    labId: "lab-mob-5",
    focus: "Verify Play Integrity verdicts end to end and enforce them server-side.",
    screenshot: {
      src: img("lab-mob-5"),
      alt: "Official Play Integrity API documentation screenshot.",
      caption: "Official Play Integrity API docs - use this for verdict request and server verification flow."
    },
    docs: [
      { name: "Play Integrity API", url: "https://developer.android.com/google/play/integrity" },
      { name: "Integrity Verdicts", url: "https://developer.android.com/google/play/integrity/verdicts" }
    ],
    walkthrough: [
      "Request an integrity token only at meaningful risk checkpoints.",
      "Send the token to the backend and verify the verdict server-side.",
      "Log allow, warn, and block decisions with non-sensitive identifiers."
    ],
    evidence: [
      "Client request code.",
      "Server verification code.",
      "Real or mocked verdict decision log."
    ],
    pitfalls: [
      "Making the trust decision only on the device.",
      "Logging raw tokens.",
      "Blocking users without remediation guidance."
    ]
  },
  "lab-mob-6": {
    labId: "lab-mob-6",
    focus: "Build a conversion-ready store listing and staged rollout plan with halt criteria.",
    screenshot: {
      src: img("lab-mob-6"),
      alt: "Official Google Play store listing documentation screenshot.",
      caption: "Official Play store listing docs - use this for metadata, screenshots, and release readiness."
    },
    docs: [
      { name: "Play Preview Assets", url: "https://support.google.com/googleplay/android-developer/answer/9866151?hl=en" },
      { name: "Staged Releases", url: "https://support.google.com/googleplay/android-developer/answer/6346149?hl=en" }
    ],
    walkthrough: [
      "Prepare title, short description, full description, icon, feature graphic, and screenshots.",
      "Localize at least one additional market if relevant.",
      "Write staged rollout percentages and numeric halt criteria."
    ],
    evidence: [
      "Store listing screenshot or asset folder.",
      "Screenshot sequence with captions.",
      "Rollout plan with vitals thresholds."
    ],
    pitfalls: [
      "Treating screenshots as decoration instead of conversion evidence.",
      "Changing many listing variables at once.",
      "Launching without halt criteria."
    ]
  },
  "lab-ai-1": {
    labId: "lab-ai-1",
    focus: "Create a versioned prompt contract and regression set that proves behavior, refusal, and format stability.",
    screenshot: {
      src: img("lab-ai-1"),
      alt: "Official Gemini prompting strategies documentation screenshot.",
      caption: "Official Gemini prompting docs - use this as the source for prompt pattern decisions."
    },
    docs: [
      { name: "Gemini Prompting Strategies", url: "https://ai.google.dev/gemini-api/docs/prompting-strategies" },
      { name: "Gemini API Docs", url: "https://ai.google.dev/gemini-api/docs" }
    ],
    walkthrough: [
      "Write scope, tone, refusal, and output-format instructions.",
      "Create at least ten regression cases, including adversarial inputs.",
      "Run the suite at fixed sampling settings and record pass/fail outcomes."
    ],
    evidence: [
      "Prompt contract file.",
      "Regression cases.",
      "Test run output."
    ],
    pitfalls: [
      "Testing only ideal user prompts.",
      "Changing temperature between runs.",
      "Leaving refusal behavior undefined."
    ]
  },
  "lab-ai-2": {
    labId: "lab-ai-2",
    focus: "Expose a streaming Gemini endpoint with retry, timeout, metering, and safe error handling.",
    screenshot: {
      src: img("lab-ai-2"),
      alt: "Official Gemini API quickstart documentation screenshot.",
      caption: "Official Gemini API quickstart - use this for SDK setup and request shape."
    },
    docs: [
      { name: "Gemini API Quickstart", url: "https://ai.google.dev/gemini-api/docs/quickstart" },
      { name: "Gemini Streaming", url: "https://ai.google.dev/gemini-api/docs/text-generation#streaming" }
    ],
    walkthrough: [
      "Keep the API key server-side and expose only your controlled endpoint.",
      "Stream chunks to the client while enforcing timeout and retry policy.",
      "Log usage metadata and cost estimates without logging sensitive prompts."
    ],
    evidence: [
      "Endpoint implementation.",
      "Streaming client screenshot.",
      "Backoff or timeout test output."
    ],
    pitfalls: [
      "Putting API keys in browser code.",
      "Retrying unsafe operations without idempotency.",
      "Failing open when quota or safety errors occur."
    ]
  },
  "lab-ai-3": {
    labId: "lab-ai-3",
    focus: "Build a schema-enforced extraction pipeline with strict validation and repair behavior.",
    screenshot: {
      src: img("lab-ai-3"),
      alt: "Official Gemini structured output documentation screenshot.",
      caption: "Official Gemini structured output docs - use this for JSON schema and validation design."
    },
    docs: [
      { name: "Gemini Structured Output", url: "https://ai.google.dev/gemini-api/docs/structured-output" },
      { name: "Pydantic", url: "https://docs.pydantic.dev/latest/" }
    ],
    walkthrough: [
      "Define the target JSON schema and validator.",
      "Run valid, noisy, and adversarial input cases.",
      "Capture raw output, parsed object, validation errors, and repair outcomes."
    ],
    evidence: [
      "Schema and parser code.",
      "Passing/failed validation examples.",
      "Extraction output screenshot."
    ],
    pitfalls: [
      "Trusting JSON-looking text without validation.",
      "Hiding raw model output during debugging.",
      "Allowing extra fields that downstream code does not expect."
    ]
  },
  "lab-ai-4": {
    labId: "lab-ai-4",
    focus: "Create a grounded RAG flow with chunking, embeddings, retrieval, citations, and answer validation.",
    screenshot: {
      src: img("lab-ai-4"),
      alt: "Official Gemini embeddings documentation screenshot.",
      caption: "Official Gemini embeddings docs - use this for vector representation and retrieval setup."
    },
    docs: [
      { name: "Gemini Embeddings", url: "https://ai.google.dev/gemini-api/docs/embeddings" },
      { name: "Vertex AI Vector Search", url: "https://cloud.google.com/vertex-ai/docs/vector-search/overview" }
    ],
    walkthrough: [
      "Chunk source material with IDs, titles, and stable citation metadata.",
      "Embed chunks and retrieve the top matches for a test question set.",
      "Generate answers only from retrieved context and include citations."
    ],
    evidence: [
      "Chunking and embedding script.",
      "Retrieval trace.",
      "Cited answer examples."
    ],
    pitfalls: [
      "Chunking without source IDs.",
      "Returning answers with no citation trail.",
      "Letting the model answer outside retrieved context."
    ]
  },
  "lab-ai-5": {
    labId: "lab-ai-5",
    focus: "Build a tool-using support agent with explicit tool schemas, authorization checks, and transcript logging.",
    screenshot: {
      src: img("lab-ai-5"),
      alt: "Official Gemini function calling documentation screenshot.",
      caption: "Official Gemini function calling docs - use this as the tool schema and orchestration reference."
    },
    docs: [
      { name: "Gemini Function Calling", url: "https://ai.google.dev/gemini-api/docs/function-calling" },
      { name: "Gemini API Tools", url: "https://ai.google.dev/gemini-api/docs/tools" }
    ],
    walkthrough: [
      "Define tool schemas with narrow arguments and clear output contracts.",
      "Run the agent loop with tool authorization before execution.",
      "Capture transcripts showing correct tool use and refusal when a tool is not allowed."
    ],
    evidence: [
      "Tool schema definitions.",
      "Agent orchestration code.",
      "Transcript with tool calls and final answer."
    ],
    pitfalls: [
      "Letting model text execute tools directly.",
      "Using broad tool arguments that bypass authorization.",
      "Skipping transcript logs."
    ]
  },
  "lab-ai-6": {
    labId: "lab-ai-6",
    focus: "Red-team an AI workflow and turn safety failures into repeatable evaluation gates.",
    screenshot: {
      src: img("lab-ai-6"),
      alt: "Official Gemini safety settings documentation screenshot.",
      caption: "Official Gemini safety settings docs - use this for safety, blocking, and evaluation behavior."
    },
    docs: [
      { name: "Gemini Safety Settings", url: "https://ai.google.dev/gemini-api/docs/safety-settings" },
      { name: "Responsible Generative AI Toolkit", url: "https://ai.google.dev/responsible" }
    ],
    walkthrough: [
      "Create adversarial cases for prompt injection, data exfiltration, and unsafe outputs.",
      "Run the eval harness before and after guardrail changes.",
      "Summarize remaining risks and production monitoring signals."
    ],
    evidence: [
      "Red-team test suite.",
      "Eval report with pass/fail rates.",
      "Guardrail changes and residual risk note."
    ],
    pitfalls: [
      "Only testing content safety and ignoring data leakage.",
      "Treating one manual red-team run as enough.",
      "Not preserving failed examples."
    ]
  },
  "lab-data-1": {
    labId: "lab-data-1",
    focus: "Bootstrap a BigQuery warehouse with datasets, tables, labels, budgets, and a cost audit trail.",
    screenshot: {
      src: img("lab-data-1"),
      alt: "Official BigQuery introduction documentation screenshot.",
      caption: "Official BigQuery overview docs - use this as the warehouse capability reference."
    },
    docs: [
      { name: "BigQuery Overview", url: "https://cloud.google.com/bigquery/docs/introduction" },
      { name: "BigQuery Pricing", url: "https://cloud.google.com/bigquery/pricing" }
    ],
    walkthrough: [
      "Create datasets with region and labels documented.",
      "Load or create the starting tables and inspect schema.",
      "Run a dry run and capture bytes processed before executing queries."
    ],
    evidence: [
      "Dataset/table screenshot.",
      "Cost controls or budget screenshot.",
      "Dry-run and query output."
    ],
    pitfalls: [
      "Running exploratory queries without dry runs.",
      "Mixing regions across datasets.",
      "Skipping labels and ownership metadata."
    ]
  },
  "lab-data-2": {
    labId: "lab-data-2",
    focus: "Optimize a slow query using partitioning, clustering, pruning, and query-plan inspection.",
    screenshot: {
      src: img("lab-data-2"),
      alt: "Official BigQuery performance best practices documentation screenshot.",
      caption: "Official BigQuery performance docs - use this to explain every optimization choice."
    },
    docs: [
      { name: "BigQuery Performance Overview", url: "https://cloud.google.com/bigquery/docs/best-practices-performance-overview" },
      { name: "Optimize Query Computation", url: "https://cloud.google.com/bigquery/docs/best-practices-performance-compute" }
    ],
    walkthrough: [
      "Record the baseline query text, slot time, and bytes processed.",
      "Apply partition filters, selected columns, and clustering where appropriate.",
      "Compare before/after query plans and cost metrics."
    ],
    evidence: [
      "Baseline and optimized SQL.",
      "Before/after bytes processed.",
      "Query plan screenshot."
    ],
    pitfalls: [
      "Using SELECT * in production analysis.",
      "Filtering partitioned tables without the partition column.",
      "Claiming optimization without numeric comparison."
    ]
  },
  "lab-data-3": {
    labId: "lab-data-3",
    focus: "Schedule a reliable nightly pipeline with observable success, failure, and data freshness checks.",
    screenshot: {
      src: img("lab-data-3"),
      alt: "Official BigQuery scheduled queries documentation screenshot.",
      caption: "Official BigQuery scheduled queries docs - use this as the automation reference."
    },
    docs: [
      { name: "Scheduled Queries", url: "https://cloud.google.com/bigquery/docs/scheduling-queries" },
      { name: "Data Transfer Service", url: "https://cloud.google.com/bigquery/docs/dts-introduction" }
    ],
    walkthrough: [
      "Write the transformation query with idempotent output behavior.",
      "Schedule it and configure notification or monitoring hooks.",
      "Run once manually and verify freshness in the target table."
    ],
    evidence: [
      "Scheduled query configuration screenshot.",
      "Target table freshness output.",
      "Failure-handling or alert configuration."
    ],
    pitfalls: [
      "Appending duplicate rows every run.",
      "Not setting a schedule owner or service account.",
      "Ignoring late-arriving source data."
    ]
  },
  "lab-data-4": {
    labId: "lab-data-4",
    focus: "Train, evaluate, and audit an at-risk student predictor using BigQuery ML and leakage checks.",
    screenshot: {
      src: img("lab-data-4"),
      alt: "Official BigQuery ML introduction documentation screenshot.",
      caption: "Official BigQuery ML docs - use this for SQL-native model creation and evaluation."
    },
    docs: [
      { name: "BigQuery ML Introduction", url: "https://docs.cloud.google.com/bigquery/docs/bqml-introduction" },
      { name: "Create a BigQuery ML Model", url: "https://docs.cloud.google.com/bigquery/docs/create-machine-learning-model" }
    ],
    walkthrough: [
      "Build a leakage audit table before training.",
      "Create the model in SQL and evaluate it on held-out data.",
      "Export predictions with confidence and action labels."
    ],
    evidence: [
      "CREATE MODEL SQL.",
      "ML.EVALUATE output.",
      "Leakage audit table."
    ],
    pitfalls: [
      "Using future-only features at prediction time.",
      "Reporting accuracy without class balance context.",
      "Skipping explainability for interventions."
    ]
  },
  "lab-data-5": {
    labId: "lab-data-5",
    focus: "Serve predictions with monitoring signals and a retraining gate that catches drift.",
    screenshot: {
      src: img("lab-data-5"),
      alt: "Official Vertex AI model monitoring documentation screenshot.",
      caption: "Official Vertex AI model monitoring docs - use this for drift and monitoring design."
    },
    docs: [
      { name: "Vertex AI Model Monitoring", url: "https://cloud.google.com/vertex-ai/docs/model-monitoring/overview" },
      { name: "BigQuery ML Inference", url: "https://docs.cloud.google.com/bigquery/docs/inference-overview" }
    ],
    walkthrough: [
      "Log predictions, features, model version, and outcome when available.",
      "Define drift and performance thresholds.",
      "Trigger retraining only when gates and review criteria are met."
    ],
    evidence: [
      "Prediction log schema.",
      "Monitoring chart or query.",
      "Retraining gate decision output."
    ],
    pitfalls: [
      "Serving predictions without logging inputs.",
      "Retraining on every schedule regardless of quality.",
      "Ignoring data drift until users report failures."
    ]
  },
  "lab-data-6": {
    labId: "lab-data-6",
    focus: "Publish an executive KPI dashboard that is fast, governed, and tied to trusted BigQuery sources.",
    screenshot: {
      src: img("lab-data-6"),
      alt: "Official Looker Studio documentation screenshot.",
      caption: "Official Looker Studio docs - use this for dashboard and sharing decisions."
    },
    docs: [
      { name: "Looker Studio Docs", url: "https://docs.cloud.google.com/looker/docs/studio" },
      { name: "Connect BigQuery to Looker Studio", url: "https://cloud.google.com/looker/docs/studio/connect-to-google-bigquery" }
    ],
    walkthrough: [
      "Create the dashboard from governed BigQuery views or extracts.",
      "Add KPI cards, trend charts, filters, and stakeholder-ready labels.",
      "Set sharing permissions and schedule delivery or review cadence."
    ],
    evidence: [
      "Dashboard screenshot.",
      "Data source configuration screenshot.",
      "Access and refresh settings."
    ],
    pitfalls: [
      "Connecting directly to raw tables with unclear semantics.",
      "Publishing dashboards without access review.",
      "Using visuals that obscure the decision being asked."
    ]
  }
};
