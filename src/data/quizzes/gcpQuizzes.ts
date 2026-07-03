import { QuizQuestion } from '../../types/academy';

// Course 2: NDN-GCP-501 — 6 modules × 3 questions

export const GCP_QUIZZES: QuizQuestion[] = [
  // ── Module 1 ──
  {
    id: "quiz-gcp-1-q1",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-1",
    type: "multiple_choice",
    difficulty: "medium",
    question: "An IAM role is granted on a GCP folder. What is its effect on projects created inside that folder next year?",
    options: [
      { key: "A", text: "No effect — bindings only apply to resources existing at grant time." },
      { key: "B", text: "The binding is inherited automatically by all current AND future projects (and their resources) under the folder." },
      { key: "C", text: "It applies only if re-granted per project." },
      { key: "D", text: "Folders cannot carry IAM bindings." }
    ],
    correctAnswer: "B",
    explanation: "IAM policies flow down the resource hierarchy and apply to all descendants, including resources created later — which is why hierarchy design is governance design.",
    technicalResources: [{ name: "Resource Hierarchy", url: "https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy", type: "docs" }]
  },
  {
    id: "quiz-gcp-1-q2",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-1",
    type: "architecture_scenario",
    difficulty: "medium",
    question: "Why should production and development workloads live in separate GCP projects rather than one project with naming conventions?",
    options: [
      { key: "A", text: "GCP charges less for multiple projects." },
      { key: "B", text: "Projects are the isolation boundary: separate IAM, quotas, billing attribution, and blast radius — a dev mistake can't touch prod resources." },
      { key: "C", text: "VPCs cannot contain more than ten services." },
      { key: "D", text: "Naming conventions are forbidden by policy." }
    ],
    correctAnswer: "B",
    explanation: "Access reviews, budget tracking, quota exhaustion, and accidental deletions all scope to the project. Isolation by project turns 'be careful' into 'can't happen'.",
    technicalResources: [{ name: "Project Best Practices", url: "https://cloud.google.com/resource-manager/docs/best-practices-projects", type: "docs" }]
  },
  {
    id: "quiz-gcp-1-q3",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-1",
    type: "multiple_choice",
    difficulty: "easy",
    question: "What is the relationship between GCP regions and zones?",
    options: [
      { key: "A", text: "Zones contain multiple regions." },
      { key: "B", text: "A region is a geographic area containing multiple zones, each an isolated failure domain; regional services replicate across zones automatically." },
      { key: "C", text: "Regions and zones are interchangeable terms." },
      { key: "D", text: "Zones are only used for storage buckets." }
    ],
    correctAnswer: "B",
    explanation: "europe-west1 contains zones -b, -c, -d. A zone can fail independently; regional services (Cloud Run, regional GKE) survive zone loss without intervention.",
    technicalResources: [{ name: "Regions & Zones", url: "https://cloud.google.com/compute/docs/regions-zones", type: "docs" }]
  },

  // ── Module 2 ──
  {
    id: "quiz-gcp-2-q1",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-2",
    type: "code_output",
    difficulty: "medium",
    question: "In this multi-stage Dockerfile, what ends up in the final production image?",
    codeSnippet: `FROM node:22-slim AS build\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM node:22-slim AS runtime\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --omit=dev\nCOPY --from=build /app/dist ./dist\nCMD ["node", "dist/server.cjs"]`,
    options: [
      { key: "A", text: "Everything from both stages, merged." },
      { key: "B", text: "Only the runtime stage's layers: production node_modules, package files, and the dist/ folder copied from the build stage — dev dependencies and source never ship." },
      { key: "C", text: "Only dist/ — node_modules are excluded automatically." },
      { key: "D", text: "The build stage, since it comes first." }
    ],
    correctAnswer: "B",
    explanation: "Only the final stage becomes the image. The build toolchain, dev dependencies, and raw source exist solely in the discarded build stage; COPY --from is the only bridge.",
    technicalResources: [{ name: "Multi-Stage Builds", url: "https://docs.docker.com/build/building/multi-stage/", type: "docs" }]
  },
  {
    id: "quiz-gcp-2-q2",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-2",
    type: "multi_select",
    difficulty: "medium",
    question: "Which practices improve Docker image security? (Select all that apply)",
    options: [
      { key: "A", text: "Add USER node so the process doesn't run as root." },
      { key: "B", text: "Maintain a .dockerignore excluding .env files and .git." },
      { key: "C", text: "Tag production images as :latest for consistency." },
      { key: "D", text: "Enable vulnerability scanning on the Artifact Registry repository." }
    ],
    correctAnswer: ["A", "B", "D"],
    explanation: "Non-root users limit container-escape value; .dockerignore keeps secrets and history out of layers; registry scanning flags CVEs. ':latest' harms traceability — it's the opposite of a best practice for production.",
    technicalResources: [{ name: "Artifact Analysis", url: "https://cloud.google.com/artifact-registry/docs/analysis", type: "docs" }]
  },
  {
    id: "quiz-gcp-2-q3",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-2",
    type: "debugging",
    difficulty: "hard",
    question: "Every code change triggers a full npm ci in the Docker build, taking minutes. Which reordering fixes the cache miss?",
    codeSnippet: `FROM node:22-slim\nWORKDIR /app\nCOPY . .\nRUN npm ci\nRUN npm run build`,
    options: [
      { key: "A", text: "COPY package*.json first, RUN npm ci, THEN copy the rest of the source — so source edits no longer invalidate the dependency layer." },
      { key: "B", text: "Use npm install instead of npm ci." },
      { key: "C", text: "Move WORKDIR below the COPY." },
      { key: "D", text: "Add --no-cache to the build for consistency." }
    ],
    correctAnswer: "A",
    explanation: "Docker invalidates all layers after the first changed one. COPY . . changes on every commit, busting the npm ci layer. Copying lockfiles first isolates dependencies into a stable cached layer.",
    technicalResources: [{ name: "Build Cache Optimization", url: "https://docs.docker.com/build/cache/", type: "docs" }]
  },

  // ── Module 3 ──
  {
    id: "quiz-gcp-3-q1",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-3",
    type: "multiple_choice",
    difficulty: "medium",
    question: "A Cloud Run service has concurrency 80. Traffic spikes to 800 simultaneous requests. Approximately how many instances does the autoscaler target?",
    options: [
      { key: "A", text: "1 — Cloud Run queues everything on one instance." },
      { key: "B", text: "About 10 (800 ÷ 80), bounded by the service's max-instances setting." },
      { key: "C", text: "800 — one per request." },
      { key: "D", text: "80 — equal to the concurrency setting." }
    ],
    correctAnswer: "B",
    explanation: "instances ≈ concurrent requests ÷ concurrency. Concurrency is the per-instance parallelism dial; max-instances caps the fleet.",
    technicalResources: [{ name: "Autoscaling", url: "https://cloud.google.com/run/docs/about-instance-autoscaling", type: "docs" }]
  },
  {
    id: "quiz-gcp-3-q2",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-3",
    type: "architecture_scenario",
    difficulty: "hard",
    question: "You must release a risky API change with the ability to verify it on real infrastructure before ANY user traffic reaches it. Which Cloud Run workflow achieves this?",
    options: [
      { key: "A", text: "Deploy normally — Cloud Run always verifies revisions first." },
      { key: "B", text: "Deploy with --no-traffic --tag=canary, smoke-test the tag's dedicated URL, then update-traffic --to-tags=canary=10 and promote gradually." },
      { key: "C", text: "Deploy to a different region and DNS-switch." },
      { key: "D", text: "Lower concurrency to 1 during the deploy." }
    ],
    correctAnswer: "B",
    explanation: "--no-traffic creates the revision without exposure; the tag provides a private URL for smoke tests; traffic splitting then shifts real users incrementally with instant rollback available.",
    technicalResources: [{ name: "Rollouts & Rollbacks", url: "https://cloud.google.com/run/docs/rollouts-rollbacks-traffic-migration", type: "docs" }]
  },
  {
    id: "quiz-gcp-3-q3",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-3",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Why must a Cloud Run service attach a Serverless VPC Connector to reach a private-IP Cloud SQL instance?",
    options: [
      { key: "A", text: "Cloud SQL only speaks HTTP." },
      { key: "B", text: "Cloud Run instances run outside your VPC by default; the connector bridges their egress into the private network." },
      { key: "C", text: "It's required for TLS certificates." },
      { key: "D", text: "Connectors increase concurrency limits." }
    ],
    correctAnswer: "B",
    explanation: "Serverless compute lives in Google-managed networks. Private resources (Cloud SQL private IP, Memorystore) need the VPC Access connector as the routed bridge.",
    technicalResources: [{ name: "VPC Connect", url: "https://cloud.google.com/run/docs/configuring/connecting-vpc", type: "docs" }]
  },

  // ── Module 4 ──
  {
    id: "quiz-gcp-4-q1",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-4",
    type: "architecture_scenario",
    difficulty: "hard",
    question: "A Cloud Run service only reads Firestore and one Secret Manager secret. Which identity setup is correct least privilege?",
    options: [
      { key: "A", text: "Run as the default compute service account — it already has editor access." },
      { key: "B", text: "A dedicated service account with roles/datastore.user on the project and roles/secretmanager.secretAccessor granted on that ONE secret." },
      { key: "C", text: "A dedicated service account with roles/owner for future flexibility." },
      { key: "D", text: "Export a JSON key for the default account and mount it in the container." }
    ],
    correctAnswer: "B",
    explanation: "Dedicated identity + narrowest predefined roles at the narrowest scope. The default account's project-wide editor role is exactly the skeleton key least privilege eliminates; JSON keys add leak risk for zero benefit on-platform.",
    technicalResources: [{ name: "IAM Best Practices", url: "https://cloud.google.com/iam/docs/using-iam-securely", type: "docs" }]
  },
  {
    id: "quiz-gcp-4-q2",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-4",
    type: "multiple_choice",
    difficulty: "hard",
    question: "How does Workload Identity Federation let GitHub Actions deploy to GCP without any stored service account key?",
    options: [
      { key: "A", text: "It embeds a hidden key in the workflow file." },
      { key: "B", text: "GitHub issues the workflow a short-lived OIDC token, which GCP's identity pool verifies and exchanges for temporary credentials to impersonate a service account." },
      { key: "C", text: "It disables authentication for trusted repositories." },
      { key: "D", text: "GitHub and Google share a master password." }
    ],
    correctAnswer: "B",
    explanation: "WIF trusts GitHub's OIDC issuer for specific repo/branch claims. The exchanged credentials are short-lived and unstealable at rest — nothing exists to leak or rotate.",
    technicalResources: [{ name: "Workload Identity Federation", url: "https://cloud.google.com/iam/docs/workload-identity-federation", type: "docs" }]
  },
  {
    id: "quiz-gcp-4-q3",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-4",
    type: "multi_select",
    difficulty: "medium",
    question: "Which statements about Secret Manager are correct? (Select all that apply)",
    options: [
      { key: "A", text: "secretAccessor should be granted per-secret to specific service accounts, not project-wide." },
      { key: "B", text: "Rotation is performed by adding a new secret version." },
      { key: "C", text: "Secrets referenced by Cloud Run are baked into the container image at deploy time." },
      { key: "D", text: "Secret payloads should never appear in Terraform state or CI logs." }
    ],
    correctAnswer: ["A", "B", "D"],
    explanation: "Per-secret grants + versioned rotation are the model. Cloud Run mounts secrets at runtime (not baked into images) — that separation is the entire point.",
    technicalResources: [{ name: "Secret Manager Best Practices", url: "https://cloud.google.com/secret-manager/docs/best-practices", type: "docs" }]
  },

  // ── Module 5 ──
  {
    id: "quiz-gcp-5-q1",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-5",
    type: "multiple_choice",
    difficulty: "medium",
    question: "What is the purpose of Terraform state, and why must it live in a remote backend for teams?",
    options: [
      { key: "A", text: "State caches provider downloads; remote backends make installs faster." },
      { key: "B", text: "State maps declared resources to real cloud objects; a shared remote backend (e.g. GCS with versioning) prevents divergence and concurrent-apply corruption." },
      { key: "C", text: "State stores the git history of .tf files." },
      { key: "D", text: "State is optional if you write good HCL." }
    ],
    correctAnswer: "B",
    explanation: "Without shared state, two engineers' applies would each think they own reality and destroy each other's changes. Remote, versioned, locked state is the collaboration contract.",
    technicalResources: [{ name: "GCS Backend", url: "https://developer.hashicorp.com/terraform/language/backend/gcs", type: "docs" }]
  },
  {
    id: "quiz-gcp-5-q2",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-5",
    type: "code_output",
    difficulty: "medium",
    question: "Given this configuration, what does Terraform guarantee about creation order?",
    codeSnippet: `resource "google_service_account" "api" {\n  account_id = "academy-api-sa"\n}\n\nresource "google_cloud_run_v2_service" "api" {\n  name     = "academy-api"\n  location = "europe-west1"\n  template {\n    service_account = google_service_account.api.email\n  }\n}`,
    options: [
      { key: "A", text: "Resources are created alphabetically." },
      { key: "B", text: "The service account is created before the Cloud Run service, because the reference google_service_account.api.email creates an implicit dependency edge." },
      { key: "C", text: "Order is random unless depends_on is specified." },
      { key: "D", text: "Both are created simultaneously and retried on failure." }
    ],
    correctAnswer: "B",
    explanation: "Terraform builds a dependency graph from attribute references. Explicit depends_on is only needed when a dependency exists without a data reference.",
    technicalResources: [{ name: "Resource Dependencies", url: "https://developer.hashicorp.com/terraform/language/resources/behavior", type: "docs" }]
  },
  {
    id: "quiz-gcp-5-q3",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-5",
    type: "debugging",
    difficulty: "hard",
    question: "terraform plan on an infra repo shows '-/+ destroy and then create replacement' for your production database. What is the professional response?",
    options: [
      { key: "A", text: "Apply — Terraform knows best." },
      { key: "B", text: "Stop and investigate which changed attribute forces replacement; use lifecycle prevent_destroy on stateful resources and find an in-place path (or plan a migration) before any apply." },
      { key: "C", text: "Delete the state file and re-import." },
      { key: "D", text: "Run apply with -auto-approve to skip the warning." }
    ],
    correctAnswer: "B",
    explanation: "Replacement means data loss on stateful resources. The plan is a review gate precisely for this moment: identify the ForceNew attribute, protect with prevent_destroy, and choose a migration strategy deliberately.",
    technicalResources: [{ name: "Lifecycle Meta-Arguments", url: "https://developer.hashicorp.com/terraform/language/meta-arguments/lifecycle", type: "docs" }]
  },

  // ── Module 6 ──
  {
    id: "quiz-gcp-6-q1",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-6",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Why should CI/CD pipelines tag container images with the git SHA rather than 'latest'?",
    options: [
      { key: "A", text: "SHA tags compress better in the registry." },
      { key: "B", text: "Traceability: any running revision maps to the exact source commit, making incident diagnosis and rollback deterministic." },
      { key: "C", text: "Cloud Run rejects the 'latest' tag." },
      { key: "D", text: "SHA tags are required for vulnerability scanning." }
    ],
    correctAnswer: "B",
    explanation: "'latest' is a moving pointer — you can never prove what's running. Immutable SHA tags make deployments auditable and rollbacks exact.",
    technicalResources: [{ name: "Artifact Registry Tags", url: "https://cloud.google.com/artifact-registry/docs/docker/names", type: "docs" }]
  },
  {
    id: "quiz-gcp-6-q2",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-6",
    type: "architecture_scenario",
    difficulty: "hard",
    question: "During a zero-downtime rollout, old and new Cloud Run revisions serve simultaneously. Your release renames a Firestore field the old code still reads. What is the correct pattern?",
    options: [
      { key: "A", text: "Deploy fast so the overlap window is short." },
      { key: "B", text: "Expand–migrate–contract: first ship code writing BOTH fields, backfill data, then in a later release remove the old field once no serving revision reads it." },
      { key: "C", text: "Schedule downtime at night." },
      { key: "D", text: "Firestore handles renames transparently." }
    ],
    correctAnswer: "B",
    explanation: "Overlapping revisions mean every schema change must be compatible with both versions. Expand-migrate-contract sequences the change so no revision ever reads a missing field.",
    technicalResources: [{ name: "Zero-Downtime Migrations", url: "https://cloud.google.com/architecture/database-migration-concepts-principles-part-1", type: "article" }]
  },
  {
    id: "quiz-gcp-6-q3",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-6",
    type: "multi_select",
    difficulty: "medium",
    question: "Which elements belong in a production-grade merge-to-deploy pipeline? (Select all that apply)",
    options: [
      { key: "A", text: "A test stage that can fail the pipeline before any build." },
      { key: "B", text: "Keyless auth via Workload Identity Federation (id-token: write)." },
      { key: "C", text: "A smoke test against the tagged, traffic-less revision gating promotion." },
      { key: "D", text: "A stored service-account JSON key in repository secrets, for simplicity." }
    ],
    correctAnswer: ["A", "B", "C"],
    explanation: "Tests gate builds, WIF eliminates stored keys, and smoke-gated promotion turns deploys into non-events. Stored JSON keys are the anti-pattern WIF replaces.",
    technicalResources: [{ name: "google-github-actions/auth", url: "https://github.com/google-github-actions/auth", type: "repo" }]
  }
];
