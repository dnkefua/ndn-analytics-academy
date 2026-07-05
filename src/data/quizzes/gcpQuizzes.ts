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

  {
    id: "quiz-gcp-1-q4",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-1",
    type: "multiple_choice",
    difficulty: "easy",
    question: "What is the correct order of the GCP resource hierarchy from top to bottom?",
    options: [
      { key: "A", text: "Project → Organization → Folder → Resource." },
      { key: "B", text: "Organization → Folder → Project → Resource." },
      { key: "C", text: "Folder → Project → Organization → Resource." },
      { key: "D", text: "Resource → Project → Folder → Organization." }
    ],
    correctAnswer: "B",
    explanation: "The hierarchy is Organization → Folder → Project → Resource; IAM policies and billing flow down this tree.",
    technicalResources: [{ name: "Resource Hierarchy", url: "https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy", type: "docs" }]
  },
  {
    id: "quiz-gcp-1-q5",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-1",
    type: "multiple_choice",
    difficulty: "medium",
    question: "What is the difference between a GCP region and a zone?",
    options: [
      { key: "A", text: "They are the same thing." },
      { key: "B", text: "A region is a geographic area containing multiple zones; a zone is an isolated failure domain within it." },
      { key: "C", text: "A zone contains multiple regions." },
      { key: "D", text: "A region is only for storage." }
    ],
    correctAnswer: "B",
    explanation: "Regions group zones; each zone fails independently. Regional services replicate across zones automatically for resilience.",
    technicalResources: [{ name: "Regions & Zones", url: "https://cloud.google.com/compute/docs/regions-zones", type: "docs" }]
  },
  {
    id: "quiz-gcp-1-q6",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-1",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Serverless products like Cloud Run live outside your VPC by default. How do they reach a private-IP Cloud SQL instance?",
    options: [
      { key: "A", text: "They cannot." },
      { key: "B", text: "Via a Serverless VPC Access connector that bridges their egress into the VPC." },
      { key: "C", text: "By making the database public." },
      { key: "D", text: "Through Firebase Hosting." }
    ],
    correctAnswer: "B",
    explanation: "A Serverless VPC connector routes serverless egress into your VPC so services can reach private resources like Cloud SQL or Memorystore.",
    technicalResources: [{ name: "VPC Overview", url: "https://cloud.google.com/vpc/docs/vpc", type: "docs" }]
  },
  {
    id: "quiz-gcp-1-q7",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-1",
    type: "multiple_choice",
    difficulty: "easy",
    question: "In a custom-mode VPC, how are subnets created?",
    options: [
      { key: "A", text: "Google auto-creates one subnet per region." },
      { key: "B", text: "You create every subnet explicitly with a chosen region and IP range." },
      { key: "C", text: "Subnets are not allowed." },
      { key: "D", text: "One global subnet is created automatically." }
    ],
    correctAnswer: "B",
    explanation: "Custom-mode VPCs give you full control: you define each regional subnet and its CIDR range explicitly, unlike auto-mode.",
    technicalResources: [{ name: "VPC Networks", url: "https://cloud.google.com/vpc/docs/vpc", type: "docs" }]
  },
  {
    id: "quiz-gcp-1-q8",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-1",
    type: "architecture_scenario",
    difficulty: "medium",
    question: "What is the primary reason to keep prod and dev in separate projects rather than a shared one?",
    options: [
      { key: "A", text: "Lower cost." },
      { key: "B", text: "The project is the isolation unit for IAM, quotas, billing, and blast radius — a dev mistake can't touch prod resources." },
      { key: "C", text: "Faster networking." },
      { key: "D", text: "It is required by Terraform." }
    ],
    correctAnswer: "B",
    explanation: "Isolating by project makes access reviews, budgets, quota limits, and accidental-deletion blast radius trivial to reason about.",
    technicalResources: [{ name: "Project Best Practices", url: "https://cloud.google.com/resource-manager/docs/best-practices-projects", type: "docs" }]
  },
  {
    id: "quiz-gcp-1-q9",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-1",
    type: "multiple_choice",
    difficulty: "easy",
    question: "GCP firewall rules are stateful and target resources by what?",
    options: [
      { key: "A", text: "MAC address only." },
      { key: "B", text: "Network tags or service accounts (plus source ranges)." },
      { key: "C", text: "Hostname only." },
      { key: "D", text: "Random assignment." }
    ],
    correctAnswer: "B",
    explanation: "VPC firewall rules match on source ranges and target tags or service accounts, letting you scope traffic to specific workloads.",
    technicalResources: [{ name: "Firewall Rules", url: "https://cloud.google.com/vpc/docs/firewalls", type: "docs" }]
  },
  {
    id: "quiz-gcp-1-q10",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-1",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Why express infrastructure as gcloud commands (and later Terraform) rather than only Console clicks?",
    options: [
      { key: "A", text: "The Console is deprecated." },
      { key: "B", text: "Only scriptable/declarative infrastructure can be reliably automated, reviewed, and reproduced across environments." },
      { key: "C", text: "gcloud is faster to type." },
      { key: "D", text: "Console clicks aren't logged." }
    ],
    correctAnswer: "B",
    explanation: "If infrastructure exists only as console clicks it can't be automated or reproduced; commands and IaC make it repeatable and reviewable.",
    technicalResources: [{ name: "gcloud Cheat Sheet", url: "https://cloud.google.com/sdk/docs/cheatsheet", type: "docs" }]
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

  {
    id: "quiz-gcp-2-q4",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-2",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Why prefer `npm ci` over `npm install` in a Docker build?",
    options: [
      { key: "A", text: "It is slower but prettier." },
      { key: "B", text: "npm ci installs byte-exact versions from the lockfile, giving reproducible builds." },
      { key: "C", text: "It skips dependencies." },
      { key: "D", text: "It edits package.json." }
    ],
    correctAnswer: "B",
    explanation: "npm ci performs a clean, lockfile-exact install, making container builds deterministic — critical for reproducibility.",
    technicalResources: [{ name: "Node Docker Best Practices", url: "https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md", type: "article" }]
  },
  {
    id: "quiz-gcp-2-q5",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-2",
    type: "multiple_choice",
    difficulty: "medium",
    question: "What does adding USER node before CMD accomplish in a Dockerfile?",
    options: [
      { key: "A", text: "Nothing; it's cosmetic." },
      { key: "B", text: "It runs the process as non-root, so a container escape is far less valuable to an attacker." },
      { key: "C", text: "It speeds up the build." },
      { key: "D", text: "It installs Node." }
    ],
    correctAnswer: "B",
    explanation: "Running as a non-root user limits the impact of a container compromise — a standard hardening step.",
    technicalResources: [{ name: "Docker Best Practices", url: "https://docs.docker.com/build/building/best-practices/", type: "docs" }]
  },
  {
    id: "quiz-gcp-2-q6",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-2",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Why should you tag production images with a semantic version or git SHA instead of :latest?",
    options: [
      { key: "A", text: ":latest compresses better." },
      { key: "B", text: "Immutable version/SHA tags make deployments traceable to exact source commits; :latest is a moving pointer you can't audit." },
      { key: "C", text: "Cloud Run rejects versions." },
      { key: "D", text: "It has no effect." }
    ],
    correctAnswer: "B",
    explanation: "SHA/version tags let you answer 'what is running?' deterministically and roll back precisely; :latest destroys traceability.",
    technicalResources: [{ name: "Artifact Registry Names", url: "https://cloud.google.com/artifact-registry/docs/docker/names", type: "docs" }]
  },
  {
    id: "quiz-gcp-2-q7",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-2",
    type: "multiple_choice",
    difficulty: "easy",
    question: "What belongs in a .dockerignore file for a Node app?",
    options: [
      { key: "A", text: "The Dockerfile itself." },
      { key: "B", text: "node_modules, .git, and .env* — so secrets and bloat never enter image layers." },
      { key: "C", text: "package.json." },
      { key: "D", text: "The dist folder you need at runtime." }
    ],
    correctAnswer: "B",
    explanation: "Excluding node_modules, git history, and env files keeps images small and prevents secrets from being baked into extractable layers.",
    technicalResources: [{ name: "Dockerignore", url: "https://docs.docker.com/build/concepts/context/#dockerignore-files", type: "docs" }]
  },
  {
    id: "quiz-gcp-2-q8",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-2",
    type: "code_output",
    difficulty: "hard",
    question: "In `COPY --from=build /app/dist ./dist`, what does --from reference?",
    codeSnippet: `FROM node:22-slim AS build\n# ...\nFROM node:22-slim AS runtime\nCOPY --from=build /app/dist ./dist`,
    options: [
      { key: "A", text: "A remote registry image." },
      { key: "B", text: "An earlier named build stage; it copies artifacts out of that discarded stage into the final image." },
      { key: "C", text: "The host filesystem." },
      { key: "D", text: "A volume mount." }
    ],
    correctAnswer: "B",
    explanation: "COPY --from=<stage> is the only bridge between multi-stage builds; only what you copy into the final stage ships.",
    technicalResources: [{ name: "Multi-Stage Builds", url: "https://docs.docker.com/build/building/multi-stage/", type: "docs" }]
  },
  {
    id: "quiz-gcp-2-q9",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-2",
    type: "multiple_choice",
    difficulty: "medium",
    question: "What feature of Artifact Registry helps you catch vulnerable base image layers?",
    options: [
      { key: "A", text: "Auto-scaling." },
      { key: "B", text: "Built-in vulnerability (CVE) scanning on the repository." },
      { key: "C", text: "Traffic splitting." },
      { key: "D", text: "DNS management." }
    ],
    correctAnswer: "B",
    explanation: "Artifact Registry can scan images for known CVEs in their layers, surfacing vulnerabilities before they reach production.",
    technicalResources: [{ name: "Artifact Analysis", url: "https://cloud.google.com/artifact-registry/docs/analysis", type: "docs" }]
  },
  {
    id: "quiz-gcp-2-q10",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-2",
    type: "debugging",
    difficulty: "medium",
    question: "Every source change forces a full `npm ci` in the Docker build. What reordering fixes the cache miss?",
    options: [
      { key: "A", text: "Use npm install instead." },
      { key: "B", text: "COPY package*.json and run npm ci BEFORE copying the rest of the source, isolating deps into a stable cached layer." },
      { key: "C", text: "Add --no-cache." },
      { key: "D", text: "Move WORKDIR to the end." }
    ],
    correctAnswer: "B",
    explanation: "Docker invalidates all layers after the first change. Copying lockfiles and installing before the source keeps the dependency layer cached across code edits.",
    technicalResources: [{ name: "Build Cache", url: "https://docs.docker.com/build/cache/", type: "docs" }]
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

  {
    id: "quiz-gcp-3-q4",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-3",
    type: "multiple_choice",
    difficulty: "medium",
    question: "What is the approximate relationship between concurrency and instance count on Cloud Run?",
    options: [
      { key: "A", text: "instances = concurrency." },
      { key: "B", text: "instances ≈ ceil(concurrent_requests / concurrency), bounded by max-instances." },
      { key: "C", text: "instances are fixed at 1." },
      { key: "D", text: "instances = requests per second." }
    ],
    correctAnswer: "B",
    explanation: "Concurrency is per-instance parallelism; the autoscaler adds instances as concurrent requests exceed capacity, up to max-instances.",
    technicalResources: [{ name: "Autoscaling", url: "https://cloud.google.com/run/docs/about-instance-autoscaling", type: "docs" }]
  },
  {
    id: "quiz-gcp-3-q5",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-3",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Why lower concurrency (e.g. to ~8) for a memory-heavy PDF-rendering endpoint?",
    options: [
      { key: "A", text: "To reduce billing per request." },
      { key: "B", text: "So each instance handles fewer simultaneous heavy requests, preventing OOM; capacity comes from horizontal scaling instead." },
      { key: "C", text: "Cloud Run requires it for binaries." },
      { key: "D", text: "It disables cold starts." }
    ],
    correctAnswer: "B",
    explanation: "High per-request memory means fewer concurrent requests per instance. Lowering concurrency protects the instance; the autoscaler adds more instances.",
    technicalResources: [{ name: "About Concurrency", url: "https://cloud.google.com/run/docs/about-concurrency", type: "docs" }]
  },
  {
    id: "quiz-gcp-3-q6",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-3",
    type: "multiple_choice",
    difficulty: "medium",
    question: "What does deploying with `--no-traffic --tag=canary` achieve?",
    options: [
      { key: "A", text: "It deletes the old revision." },
      { key: "B", text: "It creates the revision without sending user traffic and gives it a dedicated URL for pre-traffic smoke tests." },
      { key: "C", text: "It sends 100% of traffic immediately." },
      { key: "D", text: "It rolls back." }
    ],
    correctAnswer: "B",
    explanation: "--no-traffic keeps the revision unexposed; the tag provides a private URL to validate before shifting any real traffic.",
    technicalResources: [{ name: "Rollouts & Traffic", url: "https://cloud.google.com/run/docs/rollouts-rollbacks-traffic-migration", type: "docs" }]
  },
  {
    id: "quiz-gcp-3-q7",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-3",
    type: "multiple_choice",
    difficulty: "hard",
    question: "How do you roll back an unhealthy Cloud Run release instantly?",
    options: [
      { key: "A", text: "Rebuild the previous image from scratch." },
      { key: "B", text: "Reassign 100% traffic to the last good revision with update-traffic — no rebuild needed." },
      { key: "C", text: "Delete the service." },
      { key: "D", text: "Wait for auto-recovery." }
    ],
    correctAnswer: "B",
    explanation: "Because revisions are immutable, rollback is just shifting traffic back to a known-good revision — an instant operation.",
    technicalResources: [{ name: "Rollbacks", url: "https://cloud.google.com/run/docs/rollouts-rollbacks-traffic-migration", type: "docs" }]
  },
  {
    id: "quiz-gcp-3-q8",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-3",
    type: "multiple_choice",
    difficulty: "medium",
    question: "How are secrets provided to a Cloud Run service at runtime?",
    options: [
      { key: "A", text: "Baked into the image." },
      { key: "B", text: "Mounted from Secret Manager via --set-secrets, never stored in the image." },
      { key: "C", text: "Hardcoded in the Dockerfile." },
      { key: "D", text: "Passed as URL query params." }
    ],
    correctAnswer: "B",
    explanation: "Cloud Run injects Secret Manager secrets at runtime with --set-secrets, keeping them out of images and source.",
    technicalResources: [{ name: "Cloud Run Secrets", url: "https://cloud.google.com/run/docs/configuring/services/secrets", type: "docs" }]
  },
  {
    id: "quiz-gcp-3-q9",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-3",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Why set min-instances to 1 on a latency-critical user-facing API?",
    options: [
      { key: "A", text: "To cap costs." },
      { key: "B", text: "To keep one instance warm, eliminating cold-start latency for the first request." },
      { key: "C", text: "To limit concurrency." },
      { key: "D", text: "To disable autoscaling." }
    ],
    correctAnswer: "B",
    explanation: "min-instances keeps warm capacity ready so users don't pay the cold-start penalty, for a small monthly cost.",
    technicalResources: [{ name: "Autoscaling", url: "https://cloud.google.com/run/docs/about-instance-autoscaling", type: "docs" }]
  },
  {
    id: "quiz-gcp-3-q10",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-3",
    type: "multiple_choice",
    difficulty: "easy",
    question: "Why must Cloud Run instances be stateless?",
    options: [
      { key: "A", text: "To save memory." },
      { key: "B", text: "Because instances are created and destroyed by autoscaling, any instance must be able to serve any request; state belongs in a database/cache." },
      { key: "C", text: "Stateful containers are illegal." },
      { key: "D", text: "To enable logging." }
    ],
    correctAnswer: "B",
    explanation: "Autoscaling and scale-to-zero mean instances are ephemeral. Persist anything you need across requests in Firestore, Cloud SQL, or Memorystore.",
    technicalResources: [{ name: "Container Contract", url: "https://cloud.google.com/run/docs/container-contract", type: "docs" }]
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

  {
    id: "quiz-gcp-4-q4",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-4",
    type: "multiple_choice",
    difficulty: "easy",
    question: "What are the three parts of an IAM binding?",
    options: [
      { key: "A", text: "User, password, resource." },
      { key: "B", text: "Member (principal) + Role + Resource." },
      { key: "C", text: "Project, region, zone." },
      { key: "D", text: "Key, value, scope." }
    ],
    correctAnswer: "B",
    explanation: "An IAM binding grants a member a role on a resource. Effective access is the union of all bindings up the hierarchy.",
    technicalResources: [{ name: "IAM Overview", url: "https://cloud.google.com/iam/docs/overview", type: "docs" }]
  },
  {
    id: "quiz-gcp-4-q5",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-4",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Why avoid the basic roles (owner/editor/viewer) in production?",
    options: [
      { key: "A", text: "They cost more." },
      { key: "B", text: "They are project-wide and enormously broad; predefined roles at the narrowest scope enforce least privilege." },
      { key: "C", text: "They are deprecated entirely." },
      { key: "D", text: "They only work in dev." }
    ],
    correctAnswer: "B",
    explanation: "Basic roles grant sweeping project-wide power. Least privilege uses predefined (or custom) roles scoped to specific resources.",
    technicalResources: [{ name: "Using IAM Securely", url: "https://cloud.google.com/iam/docs/using-iam-securely", type: "docs" }]
  },
  {
    id: "quiz-gcp-4-q6",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-4",
    type: "multiple_choice",
    difficulty: "medium",
    question: "What is the risk of the default Compute service account?",
    options: [
      { key: "A", text: "It has no permissions." },
      { key: "B", text: "It holds Editor on the whole project — a skeleton key; replace it with a dedicated least-privilege account per service." },
      { key: "C", text: "It expires hourly." },
      { key: "D", text: "It cannot be used by Cloud Run." }
    ],
    correctAnswer: "B",
    explanation: "The default account's project-wide Editor role means a service compromise leaks everything. Give each service its own narrowly-scoped account.",
    technicalResources: [{ name: "Service Accounts", url: "https://cloud.google.com/iam/docs/service-account-overview", type: "docs" }]
  },
  {
    id: "quiz-gcp-4-q7",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-4",
    type: "multiple_choice",
    difficulty: "hard",
    question: "How does an app running on GCP obtain credentials without a JSON key file?",
    options: [
      { key: "A", text: "It hardcodes a password." },
      { key: "B", text: "Via the attached service account and the metadata server (Application Default Credentials)." },
      { key: "C", text: "It downloads a key at startup." },
      { key: "D", text: "It cannot without a key." }
    ],
    correctAnswer: "B",
    explanation: "On GCP, the attached service account provides short-lived credentials through the metadata server — no key files to leak or rotate.",
    technicalResources: [{ name: "Application Default Credentials", url: "https://cloud.google.com/docs/authentication/application-default-credentials", type: "docs" }]
  },
  {
    id: "quiz-gcp-4-q8",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-4",
    type: "multiple_choice",
    difficulty: "hard",
    question: "What is the #1 leaked credential on GitHub, and what should you use instead from CI?",
    options: [
      { key: "A", text: "Passwords; use 2FA." },
      { key: "B", text: "Service account JSON keys; use Workload Identity Federation for keyless, short-lived credentials from GitHub Actions." },
      { key: "C", text: "API keys; use cookies." },
      { key: "D", text: "SSH keys; use FTP." }
    ],
    correctAnswer: "B",
    explanation: "SA JSON keys leak constantly. Workload Identity Federation exchanges GitHub's OIDC token for short-lived GCP credentials — nothing stored to leak.",
    technicalResources: [{ name: "Workload Identity Federation", url: "https://cloud.google.com/iam/docs/workload-identity-federation", type: "docs" }]
  },
  {
    id: "quiz-gcp-4-q9",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-4",
    type: "multiple_choice",
    difficulty: "medium",
    question: "At what scope should the roles/secretmanager.secretAccessor role be granted?",
    options: [
      { key: "A", text: "Project-wide to all service accounts." },
      { key: "B", text: "Per-secret, to the specific service account that needs it." },
      { key: "C", text: "Organization-wide." },
      { key: "D", text: "It is granted automatically." }
    ],
    correctAnswer: "B",
    explanation: "Grant secretAccessor per-secret to the precise identity that reads it, never project-wide — the narrowest scope that works.",
    technicalResources: [{ name: "Secret Manager Best Practices", url: "https://cloud.google.com/secret-manager/docs/best-practices", type: "docs" }]
  },
  {
    id: "quiz-gcp-4-q10",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-4",
    type: "debugging",
    difficulty: "medium",
    question: "You need to prove a second identity is denied a secret, without creating keys. Which technique?",
    options: [
      { key: "A", text: "Delete the secret." },
      { key: "B", text: "Use --impersonate-service-account to act as the other identity and confirm PERMISSION_DENIED." },
      { key: "C", text: "Grant it owner temporarily." },
      { key: "D", text: "Restart the service." }
    ],
    correctAnswer: "B",
    explanation: "Service account impersonation lets you run a negative test as another identity without minting or storing any key.",
    technicalResources: [{ name: "SA Impersonation", url: "https://cloud.google.com/iam/docs/service-account-impersonation", type: "docs" }]
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

  {
    id: "quiz-gcp-5-q4",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-5",
    type: "multiple_choice",
    difficulty: "medium",
    question: "What is the fundamental difference between Terraform and imperative gcloud scripting?",
    options: [
      { key: "A", text: "Terraform is slower." },
      { key: "B", text: "Terraform is declarative — you describe the desired end state and it computes the diff (plan) to reach it." },
      { key: "C", text: "gcloud is declarative; Terraform is imperative." },
      { key: "D", text: "There is no difference." }
    ],
    correctAnswer: "B",
    explanation: "Terraform declares end state and derives the change set. That plan is what makes infrastructure reviewable like code.",
    technicalResources: [{ name: "Terraform Intro", url: "https://developer.hashicorp.com/terraform/intro", type: "docs" }]
  },
  {
    id: "quiz-gcp-5-q5",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-5",
    type: "multiple_choice",
    difficulty: "hard",
    question: "Why must Terraform state live in a remote backend (e.g. GCS) for a team?",
    options: [
      { key: "A", text: "Local state is faster." },
      { key: "B", text: "State maps declared resources to real objects; a shared, locked, versioned backend prevents divergence and concurrent-apply corruption." },
      { key: "C", text: "It stores the git history." },
      { key: "D", text: "State is optional with good HCL." }
    ],
    correctAnswer: "B",
    explanation: "Without shared state, two engineers' applies would each think they own reality. Remote, versioned, locked state is the collaboration contract.",
    technicalResources: [{ name: "GCS Backend", url: "https://developer.hashicorp.com/terraform/language/backend/gcs", type: "docs" }]
  },
  {
    id: "quiz-gcp-5-q6",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-5",
    type: "multiple_choice",
    difficulty: "medium",
    question: "In the Terraform workflow, what is `terraform plan`?",
    options: [
      { key: "A", text: "It applies changes immediately." },
      { key: "B", text: "It computes and shows the diff (+ create, ~ change, - destroy) before you apply — review it like a code diff." },
      { key: "C", text: "It downloads providers only." },
      { key: "D", text: "It deletes state." }
    ],
    correctAnswer: "B",
    explanation: "plan is the reviewable contract of exactly what apply will do. A surprise '- destroy' on a database is caught here.",
    technicalResources: [{ name: "Terraform CLI", url: "https://developer.hashicorp.com/terraform/cli/commands/plan", type: "docs" }]
  },
  {
    id: "quiz-gcp-5-q7",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-5",
    type: "code_output",
    difficulty: "medium",
    question: "When resource B references google_service_account.a.email, what does Terraform guarantee?",
    codeSnippet: `resource "google_cloud_run_v2_service" "b" {\n  template { service_account = google_service_account.a.email }\n}`,
    options: [
      { key: "A", text: "Alphabetical creation order." },
      { key: "B", text: "The service account (a) is created before the service (b), via the implicit dependency edge from the reference." },
      { key: "C", text: "Random order." },
      { key: "D", text: "Both are created simultaneously." }
    ],
    correctAnswer: "B",
    explanation: "Attribute references build Terraform's dependency graph, so referenced resources are created first without explicit depends_on.",
    technicalResources: [{ name: "Resource Behavior", url: "https://developer.hashicorp.com/terraform/language/resources/behavior", type: "docs" }]
  },
  {
    id: "quiz-gcp-5-q8",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-5",
    type: "debugging",
    difficulty: "hard",
    question: "A plan shows '-/+ destroy and then create replacement' for your production database. What's the professional response?",
    options: [
      { key: "A", text: "Apply — Terraform knows best." },
      { key: "B", text: "Stop; identify the ForceNew attribute, protect stateful resources with lifecycle prevent_destroy, and plan a migration before any apply." },
      { key: "C", text: "Delete state and re-import." },
      { key: "D", text: "Run apply -auto-approve." }
    ],
    correctAnswer: "B",
    explanation: "Replacement means data loss on stateful resources. The plan gate exists for this moment — investigate before applying.",
    technicalResources: [{ name: "Lifecycle", url: "https://developer.hashicorp.com/terraform/language/meta-arguments/lifecycle", type: "docs" }]
  },
  {
    id: "quiz-gcp-5-q9",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-5",
    type: "multiple_choice",
    difficulty: "medium",
    question: "What does a Terraform module give you?",
    options: [
      { key: "A", text: "Faster networking." },
      { key: "B", text: "A reusable, parameterized bundle of resources that encapsulates organizational standards as the default path." },
      { key: "C", text: "Automatic secrets." },
      { key: "D", text: "A GUI." }
    ],
    correctAnswer: "B",
    explanation: "Modules package best practices (service account per service, required labels) so teams get them by default via variables and .tfvars per environment.",
    technicalResources: [{ name: "Modules", url: "https://developer.hashicorp.com/terraform/language/modules", type: "docs" }]
  },
  {
    id: "quiz-gcp-5-q10",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-5",
    type: "multiple_choice",
    difficulty: "medium",
    question: "How do you bring a pre-existing cloud resource under Terraform management?",
    options: [
      { key: "A", text: "Delete and recreate it." },
      { key: "B", text: "terraform import, which writes the existing resource into state." },
      { key: "C", text: "Hand-edit the state file." },
      { key: "D", text: "It's impossible." }
    ],
    correctAnswer: "B",
    explanation: "terraform import brings existing resources under management without recreating them — essential when adopting IaC on a legacy estate.",
    technicalResources: [{ name: "Import", url: "https://developer.hashicorp.com/terraform/cli/import", type: "docs" }]
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
  },
  {
    id: "quiz-gcp-6-q4",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-6",
    type: "multiple_choice",
    difficulty: "easy",
    question: "What do CI and CD stand for in a deployment pipeline?",
    options: [
      { key: "A", text: "Code Integrity and Code Delivery." },
      { key: "B", text: "Continuous Integration (test every change) and Continuous Deployment (ship every passing change)." },
      { key: "C", text: "Container Image and Cloud Deploy." },
      { key: "D", text: "Compile Instructions and Compile Directives." }
    ],
    correctAnswer: "B",
    explanation: "CI tests every change automatically; CD deploys every change that passes — together an automated path from commit to production.",
    technicalResources: [{ name: "Cloud Build Docs", url: "https://cloud.google.com/build/docs", type: "docs" }]
  },
  {
    id: "quiz-gcp-6-q5",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-6",
    type: "multiple_choice",
    difficulty: "hard",
    question: "In a GitHub Actions workflow using Workload Identity Federation, which permission is required?",
    options: [
      { key: "A", text: "contents: write" },
      { key: "B", text: "id-token: write — so GitHub can mint the OIDC token exchanged for GCP credentials." },
      { key: "C", text: "packages: write" },
      { key: "D", text: "issues: write" }
    ],
    correctAnswer: "B",
    explanation: "WIF needs the workflow's id-token: write permission to obtain the OIDC token that GCP's identity pool verifies and exchanges.",
    technicalResources: [{ name: "google-github-actions/auth", url: "https://github.com/google-github-actions/auth", type: "repo" }]
  },
  {
    id: "quiz-gcp-6-q6",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-6",
    type: "architecture_scenario",
    difficulty: "hard",
    question: "During a zero-downtime rollout, old and new revisions serve simultaneously. Your release renames a Firestore field the old code still reads. What pattern avoids breakage?",
    options: [
      { key: "A", text: "Deploy faster." },
      { key: "B", text: "Expand–migrate–contract: ship code writing BOTH fields, backfill, then remove the old field once no serving revision reads it." },
      { key: "C", text: "Schedule downtime." },
      { key: "D", text: "Firestore handles renames automatically." }
    ],
    correctAnswer: "B",
    explanation: "Overlapping revisions require backwards-compatible changes. Expand-migrate-contract sequences the change so no revision ever reads a missing field.",
    technicalResources: [{ name: "Migration Concepts", url: "https://cloud.google.com/architecture/database-migration-concepts-principles-part-1", type: "article" }]
  },
  {
    id: "quiz-gcp-6-q7",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-6",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Why tag pipeline-built images with the git SHA?",
    options: [
      { key: "A", text: "For smaller images." },
      { key: "B", text: "So any running revision maps to an exact source commit, making diagnosis and rollback deterministic." },
      { key: "C", text: "Cloud Build requires it." },
      { key: "D", text: "For vulnerability scanning." }
    ],
    correctAnswer: "B",
    explanation: "SHA tags make 'which commit is running?' answerable at a glance and rollbacks exact — unlike the moving :latest tag.",
    technicalResources: [{ name: "Cloud Run CD", url: "https://cloud.google.com/run/docs/continuous-deployment-with-cloud-build", type: "docs" }]
  },
  {
    id: "quiz-gcp-6-q8",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-6",
    type: "multiple_choice",
    difficulty: "medium",
    question: "What is the purpose of a smoke-test step against a tagged, traffic-less revision before promotion?",
    options: [
      { key: "A", text: "To warm the cache." },
      { key: "B", text: "To gate promotion — if the tagged URL fails a basic check (curl -f), the pipeline stops before shifting real traffic." },
      { key: "C", text: "To generate logs." },
      { key: "D", text: "It has no effect." }
    ],
    correctAnswer: "B",
    explanation: "A failing smoke test on the canary URL halts the pipeline before users are exposed. A gate that can't fail is theater.",
    technicalResources: [{ name: "Cloud Build Triggers", url: "https://cloud.google.com/build/docs/triggers", type: "docs" }]
  },
  {
    id: "quiz-gcp-6-q9",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-6",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Why keep application deploys and infrastructure (Terraform) changes on separate pipelines?",
    options: [
      { key: "A", text: "To use more compute." },
      { key: "B", text: "They are different machines with different identities: one ships revisions on merge, the other applies plans with plan-on-PR review." },
      { key: "C", text: "GitHub requires it." },
      { key: "D", text: "There's no reason to." }
    ],
    correctAnswer: "B",
    explanation: "App and infra pipelines have distinct cadences, permissions, and review needs; separating them keeps each safe and auditable.",
    technicalResources: [{ name: "Cloud Build Docs", url: "https://cloud.google.com/build/docs", type: "docs" }]
  },
  {
    id: "quiz-gcp-6-q10",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-6",
    type: "multiple_choice",
    difficulty: "easy",
    question: "How can you avoid a full build-and-deploy on a docs-only commit?",
    options: [
      { key: "A", text: "You can't." },
      { key: "B", text: "Add a path filter to the build trigger so only relevant file changes fire the pipeline." },
      { key: "C", text: "Delete the trigger each time." },
      { key: "D", text: "Commit less often." }
    ],
    correctAnswer: "B",
    explanation: "Trigger path filters prevent unnecessary pipeline runs (and deploy noise/cost) for changes that don't affect the app.",
    technicalResources: [{ name: "Cloud Build Triggers", url: "https://cloud.google.com/build/docs/triggers", type: "docs" }]
  }
];
