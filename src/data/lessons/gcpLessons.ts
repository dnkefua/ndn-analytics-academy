import { Lesson } from '../../types/academy';

// Course 2: NDN-GCP-501 — Google Cloud App Architecture & Infrastructure
// 6 modules × 3 lessons (reading / video / lab)

export const GCP_LESSONS: Lesson[] = [
  // ─────────────────────────────────────────────────────────
  // MODULE 1 — Google Cloud Infrastructure Fundamentals
  // ─────────────────────────────────────────────────────────
  {
    id: "les-gcp-1-1",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-1",
    order: 1,
    type: "reading",
    title: "Lesson 1.1: GCP Resource Hierarchy, Projects, Regions & VPC Basics",
    summary: "Understand how organizations, folders, projects, regions/zones, and VPC networks structure everything you build on Google Cloud.",
    durationMinutes: 30,
    readingMarkdown: `
# GCP Resource Hierarchy, Projects, Regions & VPC Basics

Every architectural decision on Google Cloud hangs off four structural concepts: the resource hierarchy, projects, geography (regions/zones), and networking (VPC). Get these right and IAM, billing, and scaling all fall into place.

## 1. The Resource Hierarchy

\`\`\`text
Organization (ndnanalytics.com)
└── Folder (production / staging / dev)
    └── Project (ndn-academy-prod)
        └── Resources (Cloud Run services, buckets, datasets…)
\`\`\`

Two things flow *down* this tree:
- **IAM policies** — a role granted on a folder applies to every project inside it.
- **Billing & quotas** — projects attach to billing accounts; quotas are per-project.

The **project** is the primary isolation unit: separate prod from dev with separate projects, not naming conventions. Blast radius, budgets, and access reviews all become trivial.

## 2. Regions & Zones

- A **region** (e.g. \`europe-west1\`) is an independent geographic area.
- A **zone** (\`europe-west1-b\`) is an isolated failure domain within it.

Placement rules of thumb:
- Put compute in the region closest to your users (or your data — data gravity wins).
- Regional services (Cloud Run, GKE regional) survive zone failures automatically.
- Cross-region egress costs money; co-locate chatty services.

## 3. VPC Networks

A **VPC** is a global, software-defined network. Subnets are regional; firewall rules are stateful and tag/service-account based:

\`\`\`bash
gcloud compute networks create ndn-net --subnet-mode=custom
gcloud compute networks subnets create app-subnet \\
  --network=ndn-net --region=europe-west1 --range=10.10.0.0/24

# Allow only internal traffic to backends tagged 'api'
gcloud compute firewall-rules create allow-internal-api \\
  --network=ndn-net --allow=tcp:8080 \\
  --source-ranges=10.10.0.0/24 --target-tags=api
\`\`\`

Serverless products (Cloud Run, Functions) live *outside* your VPC by default; a **Serverless VPC Connector** bridges them to private resources like Cloud SQL or Memorystore.

## 4. gcloud Mental Model

Everything you click in the Console is an API call. The CLI makes it scriptable:

\`\`\`bash
gcloud config set project ndn-academy-prod
gcloud services enable run.googleapis.com artifactregistry.googleapis.com
gcloud projects get-iam-policy ndn-academy-prod --format=json
\`\`\`

If you can't express your infrastructure as commands, you can't automate it — and in Module 5 you'll go one step further and express it as Terraform.
`,
    terminalLanguage: "gcloud",
    starterCode: `gcloud config set project ndn-academy-prod\ngcloud services list --enabled --format="value(config.name)"`,
    expectedOutput: "run.googleapis.com\nartifactregistry.googleapis.com\ncloudbuild.googleapis.com",
    notes: {
      coreConcepts: "IAM and billing inherit down Organization → Folder → Project. Projects are the isolation unit; regions are placement decisions; VPCs are global with regional subnets and stateful firewalls.",
      proTip: "Create separate projects per environment (dev/staging/prod) from day one — retrofitting isolation after resources exist is 10× the work.",
      keyTerms: [
        { term: "Resource Hierarchy", definition: "The Organization → Folder → Project → Resource tree down which IAM policies and billing flow." },
        { term: "Zone", definition: "An isolated failure domain within a region; regional services replicate across zones automatically." },
        { term: "VPC", definition: "A global software-defined network with regional subnets and stateful, tag-based firewall rules." }
      ]
    },
    resources: [
      { name: "Resource Hierarchy Docs", url: "https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy", type: "docs" },
      { name: "Regions & Zones", url: "https://cloud.google.com/compute/docs/regions-zones", type: "docs" },
      { name: "VPC Overview", url: "https://cloud.google.com/vpc/docs/vpc", type: "docs" }
    ]
  },
  {
    id: "les-gcp-1-2",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-1",
    order: 2,
    type: "video",
    title: "Lesson 1.2: Video — Organisations & the Resource Hierarchy (Level Up From Zero)",
    summary: "Google's own series episode explaining organizations, folders, and projects — the governance skeleton of GCP.",
    durationMinutes: 15,
    videoUrl: "https://www.youtube.com/embed/jJOZUQTwdLk",
    videoPoster: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    readingMarkdown: `
# Video Briefing

This Google Cloud series episode walks the hierarchy from organization down to resources, with governance in mind.

**Watch for:**
- Why the organization node (not a personal Gmail project) is the anchor for real companies.
- Folder strategies: by environment, by team, or by product line.
- How policy inheritance interacts with exceptions — deny nothing at the top that a child must allow.

**Challenge:** sketch the hierarchy you'd propose for NDN Analytics with three products and dev/staging/prod each.
`,
    notes: {
      coreConcepts: "Hierarchy design is governance design: policies granted high up are inherited everywhere below, so structure follows how you want to delegate control.",
      proTip: "Name projects with a deterministic scheme (team-product-env, e.g. ndn-academy-prod) — every later automation (Terraform, billing exports) keys off it.",
      keyTerms: [
        { term: "Organization Node", definition: "The root of the hierarchy, tied to a Workspace/Cloud Identity domain, enabling org-wide policy." }
      ]
    },
    resources: [
      { name: "Organization Setup Guide", url: "https://cloud.google.com/resource-manager/docs/creating-managing-organization", type: "docs" }
    ]
  },
  {
    id: "les-gcp-1-3",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-1",
    order: 3,
    type: "lab",
    title: "Lesson 1.3: Practical Lab — Project, APIs & Network Bootstrap",
    summary: "Bootstrap a clean GCP project from the CLI: enable APIs, create a custom-mode VPC with a subnet and a scoped firewall rule.",
    durationMinutes: 45,
    readingMarkdown: `
# Practical Lab

Using only \`gcloud\`, bootstrap the foundation every later module builds on: a fresh project (or clean namespace), required APIs enabled, a custom-mode VPC, one regional subnet, and one least-privilege firewall rule.

Complete the lab in the **Lab Studio** panel below and submit your command transcript for grading.
`,
    notes: {
      coreConcepts: "A reproducible bootstrap script is the seed of Infrastructure as Code — if it only exists as console clicks, it doesn't really exist.",
      proTip: "Run 'gcloud services list --available | grep <keyword>' when you don't know an API's exact name — enabling the wrong API is a silent time sink.",
      keyTerms: [
        { term: "Custom-Mode VPC", definition: "A VPC where you create every subnet explicitly, instead of Google auto-creating one per region." }
      ]
    },
    resources: [
      { name: "gcloud Cheat Sheet", url: "https://cloud.google.com/sdk/docs/cheatsheet", type: "docs" }
    ]
  },

  // ─────────────────────────────────────────────────────────
  // MODULE 2 — Containerization with Docker & Artifact Registry
  // ─────────────────────────────────────────────────────────
  {
    id: "les-gcp-2-1",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-2",
    order: 1,
    type: "reading",
    title: "Lesson 2.1: Multi-Stage Dockerfiles & Artifact Registry",
    summary: "Write production multi-stage Dockerfiles for Node apps, minimize image size and attack surface, and push to Artifact Registry.",
    durationMinutes: 35,
    readingMarkdown: `
# Multi-Stage Dockerfiles & Artifact Registry

Containers are the deployment unit for everything else in this course. A production image must be small (fast cold starts), reproducible, and minimal in attack surface. Multi-stage builds deliver all three.

@video[Official Google Cloud — Create an Artifact Registry Docker repository on Google Cloud](https://www.youtube.com/embed/YmsRECPZ0f0)

## 1. The Anti-Pattern

\`\`\`dockerfile
FROM node:22            # ~1.1 GB with compilers, git, python…
COPY . .
RUN npm install         # dev deps included
CMD ["npm", "run", "dev"]  # dev server in production 😱
\`\`\`

## 2. The Production Multi-Stage Build

\`\`\`dockerfile
# ---- Stage 1: build ----
FROM node:22-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci                      # exact lockfile install, cached layer
COPY . .
RUN npm run build               # emits dist/

# ---- Stage 2: runtime ----
FROM node:22-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev           # production deps only
COPY --from=build /app/dist ./dist
USER node                       # never run as root
EXPOSE 8080
CMD ["node", "dist/server.cjs"]
\`\`\`

Key moves:
- **Layer-order caching**: copy \`package*.json\` and install *before* copying source, so code changes don't bust the dependency layer.
- **\`npm ci\`** over \`npm install\`: byte-exact installs from the lockfile.
- **\`--omit=dev\`** in the runtime stage: compilers and test frameworks never ship.
- **\`USER node\`**: a container escape from a non-root process is far less valuable.

Typical result: 1.1 GB → ~180 MB.

## 3. .dockerignore Is Security

\`\`\`text
node_modules
.git
.env*
coverage
*.md
\`\`\`

Without it, your \`.env\` and git history can end up baked into image layers — extractable by anyone who can pull the image.

## 4. Artifact Registry

Artifact Registry is GCP's store for container images (Container Registry's successor):

\`\`\`bash
gcloud artifacts repositories create ndn-images \\
  --repository-format=docker --location=europe-west1

gcloud auth configure-docker europe-west1-docker.pkg.dev

docker build -t europe-west1-docker.pkg.dev/ndn-academy-prod/ndn-images/academy-api:v1.2.0 .
docker push europe-west1-docker.pkg.dev/ndn-academy-prod/ndn-images/academy-api:v1.2.0
\`\`\`

Tag with **semantic versions or git SHAs, never just \`latest\`** — deployments must be traceable to exact source commits. Enable vulnerability scanning on the repository; it flags CVEs in base image layers automatically.
`,
    terminalLanguage: "bash",
    starterCode: `docker build -t europe-west1-docker.pkg.dev/ndn-academy-prod/ndn-images/academy-api:v1.0.0 .\ndocker images --format "{{.Repository}}:{{.Tag}} {{.Size}}"`,
    expectedOutput: "europe-west1-docker.pkg.dev/ndn-academy-prod/ndn-images/academy-api:v1.0.0 182MB",
    notes: {
      coreConcepts: "Multi-stage builds separate the build toolchain from the runtime image. Layer ordering drives cache hits; npm ci drives reproducibility; non-root USER and .dockerignore drive security.",
      proTip: "Add 'docker history <image>' to your review habit — it shows exactly which instruction bloated the image and whether secrets leaked into a layer.",
      keyTerms: [
        { term: "Multi-Stage Build", definition: "A Dockerfile with multiple FROM stages where only artifacts copied into the final stage ship to production." },
        { term: "Artifact Registry", definition: "GCP's regional repository service for container images and language packages, with IAM and vulnerability scanning." },
        { term: "Layer Caching", definition: "Docker's reuse of unchanged build steps; ordering instructions from least- to most-frequently-changed maximizes hits." }
      ]
    },
    resources: [
      { name: "Multi-Stage Builds Docs", url: "https://docs.docker.com/build/building/multi-stage/", type: "docs" },
      { name: "Artifact Registry Docs", url: "https://cloud.google.com/artifact-registry/docs", type: "docs" },
      { name: "Node.js Docker Best Practices", url: "https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md", type: "article" }
    ]
  },
  {
    id: "les-gcp-2-2",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-2",
    order: 2,
    type: "video",
    title: "Lesson 2.2: Video — Docker Multi-Stage Builds Explained",
    summary: "A focused walkthrough of multi-stage builds: why they exist, how stages communicate, and the size/security wins.",
    durationMinutes: 12,
    videoUrl: "https://www.youtube.com/embed/V0kTEk7YA70",
    videoPoster: "https://images.unsplash.com/photo-1646627927863-19874c27316b?auto=format&fit=crop&w=1200&q=80",
    readingMarkdown: `
# Video Briefing

Multi-stage builds explained visually in under ten minutes — stages, COPY --from, and the final-image mental model.

**Watch for:**
- How intermediate stages are discarded and only the last stage ships.
- \`COPY --from=<stage>\` as the only bridge between stages.
- Real before/after image sizes.

**Challenge:** take any Dockerfile you've written (or the anti-pattern from Lesson 2.1) and split it into build + runtime stages. Measure both sizes.
`,
    notes: {
      coreConcepts: "Only the final stage becomes the image; everything else is scaffolding. This single idea removes compilers, dev deps, and secrets from production images.",
      proTip: "Name your stages (AS build) and target them directly with 'docker build --target build' to debug the build environment interactively.",
      keyTerms: [
        { term: "COPY --from", definition: "Dockerfile instruction that copies artifacts out of an earlier named stage into the current one." }
      ]
    },
    resources: [
      { name: "Dockerfile Reference", url: "https://docs.docker.com/reference/dockerfile/", type: "docs" }
    ]
  },
  {
    id: "les-gcp-2-3",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-2",
    order: 3,
    type: "lab",
    title: "Lesson 2.3: Practical Lab — Build, Harden & Push a Production Image",
    summary: "Containerize an Express API with a multi-stage Dockerfile under 250 MB, non-root, and push it to Artifact Registry.",
    durationMinutes: 50,
    readingMarkdown: `
# Practical Lab

Containerize the module's sample Express API: multi-stage Dockerfile, .dockerignore, non-root user, image under 250 MB, tagged with a version, pushed to Artifact Registry with vulnerability scanning enabled.

Complete the lab in the **Lab Studio** panel below and submit for grading.
`,
    notes: {
      coreConcepts: "The lab's acceptance bar — size budget, non-root, versioned tag in a scanned registry — is exactly the bar a platform team sets for production images.",
      proTip: "If your image is mysteriously huge, 'docker history' + checking for a missing .dockerignore solves it 90% of the time.",
      keyTerms: [
        { term: "Vulnerability Scanning", definition: "Automated CVE analysis of image layers, built into Artifact Registry." }
      ]
    },
    resources: [
      { name: "Push & Pull Images", url: "https://cloud.google.com/artifact-registry/docs/docker/pushing-and-pulling", type: "docs" }
    ]
  },

  // ─────────────────────────────────────────────────────────
  // MODULE 3 — Serverless Microservices on Cloud Run
  // ─────────────────────────────────────────────────────────
  {
    id: "les-gcp-3-1",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-3",
    order: 1,
    type: "reading",
    title: "Lesson 3.1: Cloud Run in Production — Autoscaling, Concurrency & Traffic Splitting",
    summary: "Tune memory, CPU, concurrency and instance bounds; wire VPC connectors and secrets; run canary deploys with revision traffic splitting.",
    durationMinutes: 35,
    readingMarkdown: `
# Cloud Run in Production — Autoscaling, Concurrency & Traffic Splitting

You met Cloud Run as a deployment target in NDN-FB-401. This lesson is the operator's view: capacity math, configuration, and safe releases.

@video[Official Google Cloud — Development to production in 3 easy steps with Cloud Run](https://www.youtube.com/embed/xgBPn-aLmFk)

## 1. Capacity Math

Cloud Run scales on **concurrent requests**:

\`\`\`text
instances ≈ ceil(concurrent_requests / concurrency_setting)
\`\`\`

Defaults: concurrency 80, min 0, max 100. Three tuning scenarios:

| Workload | Concurrency | Why |
|---|---|---|
| Lightweight JSON API | 80–250 | I/O-bound, cheap per request |
| PDF/image rendering | 4–10 | Memory-heavy, protect the instance |
| ML inference | 1 | One model run saturates CPU |

\`\`\`bash
gcloud run deploy academy-api \\
  --image=europe-west1-docker.pkg.dev/ndn/ndn-images/academy-api:v1.2.0 \\
  --concurrency=80 --cpu=1 --memory=512Mi \\
  --min-instances=1 --max-instances=20 \\
  --region=europe-west1
\`\`\`

\`min-instances=1\` eliminates cold starts for user-facing APIs (~$8/month); \`max-instances\` caps your blast radius against bill-shock and downstream overload.

## 2. Secrets & Config

\`\`\`bash
gcloud run deploy academy-api \\
  --set-env-vars=NODE_ENV=production \\
  --set-secrets=GEMINI_API_KEY=geminiApiKey:latest
\`\`\`

Secrets mount from Secret Manager at runtime — never bake them into images (Module 4 covers who can *read* them).

## 3. Private Networking

To reach Cloud SQL or Memorystore on private IPs, attach a **Serverless VPC Connector**:

\`\`\`bash
gcloud compute networks vpc-access connectors create ndn-connector \\
  --network=ndn-net --region=europe-west1 --range=10.8.0.0/28

gcloud run services update academy-api --vpc-connector=ndn-connector
\`\`\`

## 4. Revisions & Canary Releases

Every deploy creates an immutable **revision**. Traffic is assignable per-revision:

\`\`\`bash
# Deploy without shifting traffic
gcloud run deploy academy-api --image=...:v1.3.0 --no-traffic --tag=canary

# Send 10% of traffic to the canary
gcloud run services update-traffic academy-api \\
  --to-tags=canary=10

# Healthy? Promote. Broken? Instant rollback:
gcloud run services update-traffic academy-api --to-latest
gcloud run services update-traffic academy-api --to-revisions=academy-api-00041=100
\`\`\`

The \`--tag\` also gives the canary its own URL (\`https://canary---academy-api-xyz.a.run.app\`) for pre-traffic smoke tests. This revision model is the foundation your CI/CD pipeline (Module 6) automates.
`,
    terminalLanguage: "gcloud",
    starterCode: `gcloud run services update-traffic academy-api --to-tags=canary=10\ngcloud run services describe academy-api --format="value(status.traffic)"`,
    expectedOutput: "10% canary (v1.3.0) / 90% stable (v1.2.0)",
    notes: {
      coreConcepts: "Concurrency is the capacity dial; min-instances kills cold starts; max-instances caps blast radius. Immutable revisions plus traffic splitting give you canaries and instant rollback for free.",
      proTip: "Always deploy risky changes with --no-traffic --tag=canary and smoke-test the tagged URL before shifting a single percent of real traffic.",
      keyTerms: [
        { term: "Traffic Splitting", definition: "Percentage-based routing between Cloud Run revisions, enabling canary and blue/green releases." },
        { term: "Serverless VPC Connector", definition: "A bridge letting Cloud Run/Functions reach private VPC resources like Cloud SQL." },
        { term: "Revision Tag", definition: "A named pointer to a revision with its own URL, usable for pre-traffic testing." }
      ]
    },
    resources: [
      { name: "Instance Autoscaling", url: "https://cloud.google.com/run/docs/about-instance-autoscaling", type: "docs" },
      { name: "Rollbacks & Traffic Migration", url: "https://cloud.google.com/run/docs/rollouts-rollbacks-traffic-migration", type: "docs" },
      { name: "Connect to a VPC", url: "https://cloud.google.com/run/docs/configuring/connecting-vpc", type: "docs" }
    ]
  },
  {
    id: "les-gcp-3-2",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-3",
    order: 2,
    type: "video",
    title: "Lesson 3.2: Video — Introduction to Google Cloud Run",
    summary: "How Cloud Run turns any container into an autoscaling service — the model behind everything you tuned in Lesson 3.1.",
    durationMinutes: 14,
    videoUrl: "https://www.youtube.com/embed/mRM8h-2sdEo",
    videoPoster: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&w=1200&q=80",
    readingMarkdown: `
# Video Briefing

An introduction to Cloud Run's serverless container model — request-driven scaling with per-100ms billing.

**Watch for:**
- The 'any language, any binary' pitch: if it containerizes and speaks HTTP, it runs.
- Scale-to-zero economics vs. always-on VMs.
- The relationship between Cloud Run and Knative (portability of the service model).

**Connect it:** map each Console setting shown in the video to the gcloud flag you used in Lesson 3.1 — Console for exploration, CLI for automation.
`,
    notes: {
      coreConcepts: "Cloud Run's contract is minimal — stateless container, HTTP on $PORT — which is exactly what makes the autoscaling and billing model possible.",
      proTip: "Treat instance memory as scratch space only: anything you need across requests belongs in Firestore, Cloud SQL, or Memorystore, because instances vanish on scale-down.",
      keyTerms: [
        { term: "Statelessness", definition: "Designing services so any instance can serve any request, enabling horizontal scaling and scale-to-zero." }
      ]
    },
    resources: [
      { name: "Cloud Run & Serverless (deep dive video)", url: "https://www.youtube.com/watch?v=sAFuHhQPKJk", type: "video" }
    ]
  },
  {
    id: "les-gcp-3-3",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-3",
    order: 3,
    type: "lab",
    title: "Lesson 3.3: Practical Lab — Canary Deploy with Traffic Splitting",
    summary: "Deploy v1 and v2 of your containerized API, smoke-test a tagged canary, shift 10% → 100%, then execute an instant rollback.",
    durationMinutes: 50,
    readingMarkdown: `
# Practical Lab

Run a full release cycle on Cloud Run: deploy v1, deploy v2 with --no-traffic and a canary tag, smoke-test the tagged URL, shift 10% then 100%, and finish with a one-command rollback to v1. Capture the traffic table at each step.

Complete the lab in the **Lab Studio** panel below and submit for grading.
`,
    notes: {
      coreConcepts: "Practicing the rollback while calm is what makes it available to you during an incident.",
      proTip: "Script the whole cycle in a .sh file as you go — you're building your team's future release runbook.",
      keyTerms: [
        { term: "Smoke Test", definition: "A fast, shallow test against a live endpoint verifying the deployment is fundamentally functional." }
      ]
    },
    resources: [
      { name: "Traffic Management Docs", url: "https://cloud.google.com/run/docs/managing/revisions", type: "docs" }
    ]
  },

  // ─────────────────────────────────────────────────────────
  // MODULE 4 — Zero-Trust IAM & Secret Manager
  // ─────────────────────────────────────────────────────────
  {
    id: "les-gcp-4-1",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-4",
    order: 1,
    type: "reading",
    title: "Lesson 4.1: IAM Least Privilege, Service Accounts & Secret Manager",
    summary: "Design least-privilege IAM: custom service accounts per service, keyless auth, Workload Identity Federation, and Secret Manager access control.",
    durationMinutes: 35,
    readingMarkdown: `
# IAM Least Privilege, Service Accounts & Secret Manager

IAM answers one question — **who can do what on which resource** — and most cloud breaches are IAM failures, not exotic exploits. This lesson gives you the production patterns.

@video[Official Google Cloud — Manage your Cloud Run secrets securely with Secret Manager](https://www.youtube.com/embed/JIE89dneaGo)

## 1. The IAM Model

\`\`\`text
Member (user / group / service account)
  + Role (collection of permissions)
  + Resource (org / folder / project / single service)
  = Binding
\`\`\`

Role tiers:
- **Basic roles** (\`owner\`, \`editor\`, \`viewer\`) — project-wide, enormous. *Never* use in production.
- **Predefined roles** (\`roles/run.invoker\`, \`roles/secretmanager.secretAccessor\`) — the workhorses.
- **Custom roles** — when a predefined role grants even slightly too much.

## 2. Service Accounts: One Per Service

The default Compute service account is \`editor\` on the whole project — a skeleton key. Replace it:

\`\`\`bash
gcloud iam service-accounts create academy-api-sa \\
  --display-name="Academy API runtime"

# Grant only what the service actually does:
gcloud projects add-iam-policy-binding ndn-academy-prod \\
  --member="serviceAccount:academy-api-sa@ndn-academy-prod.iam.gserviceaccount.com" \\
  --role="roles/datastore.user"

gcloud run deploy academy-api --service-account=academy-api-sa@ndn-academy-prod.iam.gserviceaccount.com
\`\`\`

Now a compromise of this service leaks *Firestore access*, not your whole project.

## 3. Keyless Everywhere

Service account **JSON keys are the #1 leaked credential on GitHub**. You almost never need them:

- **On GCP** — attached service accounts provide credentials via the metadata server automatically (that's what \`admin.initializeApp()\` with no args uses).
- **From GitHub Actions** — **Workload Identity Federation** exchanges GitHub's OIDC token for short-lived GCP credentials. No stored key, nothing to rotate or leak.

\`\`\`yaml
# .github/workflows/deploy.yml (the key-free pattern)
- uses: google-github-actions/auth@v2
  with:
    workload_identity_provider: projects/1234/locations/global/workloadIdentityPools/gh/providers/gh
    service_account: deployer@ndn-academy-prod.iam.gserviceaccount.com
\`\`\`

## 4. Secret Manager Access Control

Storing a secret is easy; controlling *read* access is the point:

\`\`\`bash
echo -n "sk-live-..." | gcloud secrets create stripe-key --data-file=-

gcloud secrets add-iam-policy-binding stripe-key \\
  --member="serviceAccount:academy-api-sa@ndn-academy-prod.iam.gserviceaccount.com" \\
  --role="roles/secretmanager.secretAccessor"
\`\`\`

Grant \`secretAccessor\` **per secret**, never project-wide. Rotation = add a new version; consumers pinned to \`:latest\` pick it up on next start.

## 5. Audit Ritual

\`\`\`bash
gcloud projects get-iam-policy ndn-academy-prod \\
  --flatten="bindings[].members" \\
  --format="table(bindings.role, bindings.members)" | grep -E "editor|owner"
\`\`\`

Anything with \`editor\`/\`owner\` that isn't a human break-glass account is your next ticket.
`,
    terminalLanguage: "gcloud",
    starterCode: `gcloud iam service-accounts create academy-api-sa --display-name="Academy API runtime"\ngcloud run services update academy-api --service-account=academy-api-sa@ndn-academy-prod.iam.gserviceaccount.com`,
    expectedOutput: "Updated service [academy-api] with dedicated least-privilege service account.",
    notes: {
      coreConcepts: "Bindings = member + role + resource. One dedicated service account per service, predefined roles at the narrowest scope, no JSON keys — metadata server on GCP, Workload Identity Federation from CI.",
      proTip: "Search your org's GitHub for '\"private_key\"' occasionally — finding a committed service account key before an attacker does is the cheapest incident response you'll ever run.",
      keyTerms: [
        { term: "Least Privilege", definition: "Granting exactly the permissions a workload needs and nothing more, at the narrowest resource scope." },
        { term: "Workload Identity Federation", definition: "Keyless exchange of an external OIDC token (e.g. GitHub Actions) for short-lived GCP credentials." },
        { term: "secretAccessor", definition: "The Secret Manager role permitting payload reads — grant it per-secret to specific service accounts." }
      ]
    },
    resources: [
      { name: "IAM Overview", url: "https://cloud.google.com/iam/docs/overview", type: "docs" },
      { name: "Workload Identity Federation", url: "https://cloud.google.com/iam/docs/workload-identity-federation", type: "docs" },
      { name: "Secret Manager Best Practices", url: "https://cloud.google.com/secret-manager/docs/best-practices", type: "docs" }
    ]
  },
  {
    id: "les-gcp-4-2",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-4",
    order: 2,
    type: "video",
    title: "Lesson 4.2: Video — IAM Explained: Roles, Policies & Permissions",
    summary: "A visual tour of Google Cloud IAM: members, roles, policy inheritance, and managing access safely.",
    durationMinutes: 14,
    videoUrl: "https://www.youtube.com/embed/iTY64is1-qk",
    videoPoster: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80",
    readingMarkdown: `
# Video Briefing

IAM's moving parts — principals, roles, policies — explained visually, including how inheritance interacts with resource-level bindings.

**Watch for:**
- How a role granted at folder level silently applies to every future project inside it.
- The difference between *permissions* (fine-grained verbs) and *roles* (bundles you actually grant).
- Where to inspect effective access in the Console (IAM → 'View by principal').

**Challenge:** pick any service account in your project and answer, from the Console alone: what can it do, granted where, inherited from what?
`,
    notes: {
      coreConcepts: "Effective access = union of every binding up the hierarchy. Auditing means walking that union, not just the project's own IAM page.",
      proTip: "Use the IAM Policy Troubleshooter when 'permission denied' makes no sense — it shows exactly which binding (or absence) decided the outcome.",
      keyTerms: [
        { term: "Policy Inheritance", definition: "IAM bindings on parent nodes (org/folder) automatically applying to all descendant resources." }
      ]
    },
    resources: [
      { name: "IAM Policy Troubleshooter", url: "https://cloud.google.com/policy-intelligence/docs/troubleshoot-access", type: "docs" }
    ]
  },
  {
    id: "les-gcp-4-3",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-4",
    order: 3,
    type: "lab",
    title: "Lesson 4.3: Practical Lab — Lock Down a Service with Least Privilege",
    summary: "Replace a default service account with a dedicated one, scope its roles, bind a secret per-service, and prove denied access.",
    durationMinutes: 50,
    readingMarkdown: `
# Practical Lab

Harden the API you deployed in Module 3: dedicated service account, narrowest predefined roles, a Secret Manager secret readable *only* by that account, and a negative test proving another identity gets PERMISSION_DENIED.

Complete the lab in the **Lab Studio** panel below and submit for grading.
`,
    notes: {
      coreConcepts: "Positive tests prove function; negative tests prove security. This lab requires both.",
      proTip: "gcloud's '--impersonate-service-account' flag lets you *be* another identity for a negative test without creating keys.",
      keyTerms: [
        { term: "Negative Test", definition: "A test asserting that unauthorized access fails with the expected denial." }
      ]
    },
    resources: [
      { name: "Service Account Impersonation", url: "https://cloud.google.com/iam/docs/service-account-impersonation", type: "docs" }
    ]
  },

  // ─────────────────────────────────────────────────────────
  // MODULE 5 — Infrastructure as Code with Terraform
  // ─────────────────────────────────────────────────────────
  {
    id: "les-gcp-5-1",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-5",
    order: 1,
    type: "reading",
    title: "Lesson 5.1: Terraform on GCP — HCL, State & Modules",
    summary: "Provision Cloud Run, service accounts, and IAM bindings declaratively; manage remote state in GCS; structure reusable modules.",
    durationMinutes: 35,
    readingMarkdown: `
# Terraform on GCP — HCL, State & Modules

Everything you've built with \`gcloud\` so far is imperative: a sequence of commands whose result depends on what already existed. **Terraform** is declarative: you describe the end state, it computes the diff. That diff — the *plan* — is what makes infrastructure reviewable like code.

@video[Official HashiCorp — Using Terraform with Google Cloud](https://www.youtube.com/embed/Xni8GUcWQ_s)

## 1. A Real Configuration

\`\`\`hcl
terraform {
  required_providers {
    google = { source = "hashicorp/google", version = "~> 6.0" }
  }
  backend "gcs" {
    bucket = "ndn-terraform-state"
    prefix = "academy/prod"
  }
}

provider "google" {
  project = var.project_id
  region  = "europe-west1"
}

resource "google_service_account" "api" {
  account_id   = "academy-api-sa"
  display_name = "Academy API runtime"
}

resource "google_cloud_run_v2_service" "api" {
  name     = "academy-api"
  location = "europe-west1"

  template {
    service_account = google_service_account.api.email
    containers {
      image = var.api_image
      resources { limits = { memory = "512Mi", cpu = "1" } }
    }
    scaling { min_instance_count = 1, max_instance_count = 20 }
  }
}

resource "google_cloud_run_v2_service_iam_member" "public" {
  name     = google_cloud_run_v2_service.api.name
  location = "europe-west1"
  role     = "roles/run.invoker"
  member   = "allUsers"
}
\`\`\`

Notice the **dependency graph**: the service references \`google_service_account.api.email\`, so Terraform creates the account first — no manual ordering.

## 2. The Workflow

\`\`\`bash
terraform init      # download providers, connect state backend
terraform plan      # the diff: + create, ~ change, - destroy
terraform apply     # execute the plan
\`\`\`

**Read every plan before applying.** A surprise \`- destroy\` line on a database has ended careers.

## 3. State Is Sacred

Terraform maps real resources to your config through the **state file**. Rules:

- Remote backend (the GCS bucket above) with versioning enabled — never local state in a team.
- State can contain secrets → lock the bucket down with IAM.
- Never hand-edit state; use \`terraform state mv\` / \`terraform import\`.

## 4. Modules for Reuse

\`\`\`hcl
module "api_service" {
  source        = "./modules/cloud-run-service"
  name          = "academy-api"
  image         = var.api_image
  min_instances = 1
}
\`\`\`

A module encapsulating your org's opinions (service account per service, required labels, alerting policy) turns best practice into the *default* path. Variables + separate \`.tfvars\` per environment give you dev/staging/prod from one codebase:

\`\`\`bash
terraform apply -var-file=env/prod.tfvars
\`\`\`
`,
    terminalLanguage: "bash",
    starterCode: `terraform init\nterraform plan -var-file=env/prod.tfvars`,
    expectedOutput: "Plan: 3 to add, 0 to change, 0 to destroy.",
    notes: {
      coreConcepts: "Declarative config + plan/apply diffing + a sacred remote state file. Resource references build the dependency graph; modules turn best practices into defaults.",
      proTip: "Enable object versioning on your state bucket before your first apply — a corrupted or deleted state file without versioning means manually re-importing your whole estate.",
      keyTerms: [
        { term: "Terraform State", definition: "The mapping between declared resources and real cloud objects; stored remotely (GCS) and treated as sensitive." },
        { term: "Plan", definition: "The computed diff between desired configuration and current state — review it like a code diff." },
        { term: "Module", definition: "A reusable, parameterized bundle of Terraform resources encapsulating organizational standards." }
      ]
    },
    resources: [
      { name: "Terraform Google Provider", url: "https://registry.terraform.io/providers/hashicorp/google/latest/docs", type: "docs" },
      { name: "GCS State Backend", url: "https://developer.hashicorp.com/terraform/language/backend/gcs", type: "docs" },
      { name: "Terraform on GCP Best Practices", url: "https://cloud.google.com/docs/terraform/best-practices-for-terraform", type: "docs" }
    ]
  },
  {
    id: "les-gcp-5-2",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-5",
    order: 2,
    type: "video",
    title: "Lesson 5.2: Video — Getting Started with Terraform for Google Cloud",
    summary: "Terraform's workflow on GCP demonstrated end-to-end: providers, resources, plan, apply, and teardown.",
    durationMinutes: 16,
    videoUrl: "https://www.youtube.com/embed/BUPenAjobjw",
    videoPoster: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1200&q=80",
    readingMarkdown: `
# Video Briefing

Watch the init → plan → apply loop happen live against a real GCP project.

**Watch for:**
- How the provider authenticates (application default credentials — the keyless theme again).
- Reading a plan: the +/~/- symbols and what forces a *replace* vs an in-place update.
- \`terraform destroy\` as the honest test of whether your config captures everything.

**Challenge:** after the video, translate the Module 1 lab (VPC + subnet + firewall) into HCL on paper — which resources and references do you need?
`,
    notes: {
      coreConcepts: "The plan is the contract: what you review is what gets executed. Destroy-and-recreate proving reproducibility is the real IaC milestone.",
      proTip: "Run 'terraform fmt' and 'terraform validate' as a pre-commit hook — formatting arguments in review are a waste of everyone's life.",
      keyTerms: [
        { term: "Provider", definition: "The Terraform plugin that translates HCL resources into a specific platform's API calls." }
      ]
    },
    resources: [
      { name: "Terraform CLI Docs", url: "https://developer.hashicorp.com/terraform/cli", type: "docs" }
    ]
  },
  {
    id: "les-gcp-5-3",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-5",
    order: 3,
    type: "lab",
    title: "Lesson 5.3: Practical Lab — Terraform Your Cloud Run Stack",
    summary: "Recreate your Module 3/4 stack declaratively: service account, IAM, secret binding, and Cloud Run service — with remote state.",
    durationMinutes: 55,
    readingMarkdown: `
# Practical Lab

Codify what you built by hand: GCS state backend, service account, least-privilege bindings, secret access, and the Cloud Run service — then prove reproducibility with destroy + re-apply.

Complete the lab in the **Lab Studio** panel below and submit your HCL and plan output for grading.
`,
    notes: {
      coreConcepts: "If destroy + apply reproduces your stack identically, your infrastructure is finally *software*.",
      proTip: "Import pre-existing resources with 'terraform import' rather than recreating them — practicing import now saves you when you adopt Terraform on a legacy project.",
      keyTerms: [
        { term: "terraform import", definition: "Bringing an existing cloud resource under Terraform management by writing it into state." }
      ]
    },
    resources: [
      { name: "Cloud Run v2 Resource Docs", url: "https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/cloud_run_v2_service", type: "docs" }
    ]
  },

  // ─────────────────────────────────────────────────────────
  // MODULE 6 — Cloud Build & GitHub Actions CI/CD
  // ─────────────────────────────────────────────────────────
  {
    id: "les-gcp-6-1",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-6",
    order: 1,
    type: "reading",
    title: "Lesson 6.1: CI/CD Pipelines — Cloud Build, GitHub Actions & Zero-Downtime Deploys",
    summary: "Automate test → build → push → deploy on every merge to main, with keyless auth and canary-gated traffic shifting.",
    durationMinutes: 35,
    readingMarkdown: `
# CI/CD Pipelines — Cloud Build, GitHub Actions & Zero-Downtime Deploys

Everything in this course converges here: containers (M2), Cloud Run revisions (M3), keyless IAM (M4), and Terraform (M5) become stages in one automated pipeline.

## 1. The Pipeline Shape

\`\`\`text
push to main
  → CI: lint + tests
  → build image (tagged with git SHA)
  → push to Artifact Registry
  → deploy to Cloud Run with --no-traffic
  → smoke-test the tagged revision URL
  → shift traffic (canary → 100%)
\`\`\`

## 2. GitHub Actions Implementation

\`\`\`yaml
name: deploy
on: { push: { branches: [main] } }

permissions:
  contents: read
  id-token: write          # ← required for keyless OIDC auth

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm test

      - uses: google-github-actions/auth@v2
        with:
          workload_identity_provider: \${{ vars.WIF_PROVIDER }}
          service_account: deployer@ndn-academy-prod.iam.gserviceaccount.com

      - uses: google-github-actions/setup-gcloud@v2

      - name: Build & push
        run: |
          IMAGE=europe-west1-docker.pkg.dev/ndn-academy-prod/ndn-images/academy-api:\${GITHUB_SHA}
          gcloud builds submit --tag $IMAGE

      - name: Deploy (no traffic)
        run: |
          gcloud run deploy academy-api --image $IMAGE \\
            --region europe-west1 --no-traffic --tag sha-\${GITHUB_SHA::7}

      - name: Smoke test canary
        run: curl -fsS https://sha-\${GITHUB_SHA::7}---academy-api-xyz.a.run.app/healthz

      - name: Promote
        run: gcloud run services update-traffic academy-api --to-latest --region europe-west1
\`\`\`

No JSON keys anywhere — the \`id-token: write\` permission plus Workload Identity Federation gives the workflow short-lived credentials.

## 3. Cloud Build Alternative

For teams that want the pipeline *inside* GCP, \`cloudbuild.yaml\` expresses the same stages, and a trigger fires it on GitHub pushes:

\`\`\`yaml
steps:
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'europe-west1-docker.pkg.dev/$PROJECT_ID/ndn-images/api:$SHORT_SHA', '.']
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'europe-west1-docker.pkg.dev/$PROJECT_ID/ndn-images/api:$SHORT_SHA']
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    entrypoint: gcloud
    args: ['run', 'deploy', 'academy-api',
           '--image=europe-west1-docker.pkg.dev/$PROJECT_ID/ndn-images/api:$SHORT_SHA',
           '--region=europe-west1']
\`\`\`

Cloud Build's service account gets the deploy roles; GitHub never holds any GCP identity at all.

## 4. Zero-Downtime Semantics

Cloud Run gives you most of it free: a failing new revision never receives traffic if you deploy \`--no-traffic\` and gate promotion on a smoke test. The remaining discipline is *backwards-compatible migrations* — the old revision keeps serving during rollout, so schema changes must support both versions simultaneously (expand → migrate → contract).

## 5. What Ships Where

- **App code** → this pipeline, on every merge.
- **Infrastructure** → a separate Terraform pipeline with plan-on-PR, apply-on-merge.
- **Secrets** → Secret Manager, referenced not copied — CI never sees payloads.
`,
    terminalLanguage: "bash",
    starterCode: `gcloud builds submit --tag europe-west1-docker.pkg.dev/ndn-academy-prod/ndn-images/api:$GIT_SHA\ngcloud run services update-traffic academy-api --to-latest`,
    expectedOutput: "BUILD SUCCESS — traffic: 100% to revision academy-api-00042 (sha 4f2a91c)",
    notes: {
      coreConcepts: "The pipeline is your course's capstone pattern: SHA-tagged builds, keyless auth, no-traffic deploys, smoke-test gates, then promotion. Old and new revisions overlap, so migrations must be backwards-compatible.",
      proTip: "Tag images with the git SHA, never 'latest' — when production misbehaves, 'which commit is running?' must be answerable in one glance.",
      keyTerms: [
        { term: "CI/CD", definition: "Continuous Integration (test every change) and Continuous Deployment (ship every passing change) as an automated pipeline." },
        { term: "Expand–Migrate–Contract", definition: "The zero-downtime schema-change pattern: add new structure, migrate readers/writers, remove old structure." },
        { term: "OIDC Token", definition: "The short-lived identity token GitHub issues to workflows, exchangeable for GCP credentials via WIF." }
      ]
    },
    resources: [
      { name: "Cloud Build Docs", url: "https://cloud.google.com/build/docs", type: "docs" },
      { name: "google-github-actions/auth", url: "https://github.com/google-github-actions/auth", type: "repo" },
      { name: "Cloud Run Continuous Deployment", url: "https://cloud.google.com/run/docs/continuous-deployment-with-cloud-build", type: "docs" }
    ]
  },
  {
    id: "les-gcp-6-2",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-6",
    order: 2,
    type: "video",
    title: "Lesson 6.2: Video — CI/CD Pipeline with Cloud Build & Terraform",
    summary: "A worked DevOps project connecting a repo to Cloud Build triggers and Terraform-managed infrastructure.",
    durationMinutes: 18,
    videoUrl: "https://www.youtube.com/embed/dzh17NFSRBk",
    videoPoster: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&w=1200&q=80",
    readingMarkdown: `
# Video Briefing

A complete DevOps project: repository triggers, Cloud Build stages, and Terraform-provisioned targets working together.

**Watch for:**
- How the trigger's file filter decides which pipeline runs (app change vs infra change).
- Where the pipeline's service account gets its deploy permissions — and how narrow they are.
- The substitution variables ($SHORT_SHA, $PROJECT_ID) flowing through build steps.

**Challenge:** identify one manual step left in the video's workflow, and describe how you'd automate or gate it.
`,
    notes: {
      coreConcepts: "App pipelines and infra pipelines are separate machines with separate identities — one deploys revisions, the other applies plans.",
      proTip: "Add a path filter so docs-only commits don't trigger a full build-and-deploy — pipeline minutes and deploy noise both cost real money.",
      keyTerms: [
        { term: "Build Trigger", definition: "A Cloud Build rule mapping repository events (push, PR) to a pipeline definition." }
      ]
    },
    resources: [
      { name: "Cloud Build Triggers", url: "https://cloud.google.com/build/docs/triggers", type: "docs" }
    ]
  },
  {
    id: "les-gcp-6-3",
    courseId: "course-gcp-architecture",
    moduleId: "mod-gcp-6",
    order: 3,
    type: "lab",
    title: "Lesson 6.3: Practical Lab — Ship a Keyless Pipeline to Production",
    summary: "Build the full merge-to-production pipeline: tests, SHA-tagged image, no-traffic deploy, smoke gate, promotion — zero stored keys.",
    durationMinutes: 55,
    readingMarkdown: `
# Practical Lab

The course's flagship lab: wire GitHub Actions (or Cloud Build) so a merge to main tests, builds, pushes, canary-deploys, smoke-tests, and promotes your service — authenticated via Workload Identity Federation with no JSON keys anywhere.

Complete the lab in the **Lab Studio** panel below and submit your workflow file plus a green run link for grading.
`,
    notes: {
      coreConcepts: "A green end-to-end run from commit to shifted traffic is the artifact — everything else in this course was preparation for this pipeline.",
      proTip: "Make the smoke-test step actually able to fail (curl -f) — a pipeline whose gates can't fail is theater, not engineering.",
      keyTerms: [
        { term: "Pipeline Gate", definition: "An automated check that must pass before the pipeline proceeds to a riskier stage." }
      ]
    },
    resources: [
      { name: "GitHub Actions for GCP", url: "https://github.com/google-github-actions", type: "repo" }
    ]
  }
];
