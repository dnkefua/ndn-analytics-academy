import { Module } from '../types/academy';

export const MODULES: Module[] = [
  // Course 1: Firebase & GCP Full-Stack
  {
    id: "mod-fb-1",
    courseId: "course-firebase-gcp",
    order: 1,
    title: "Module 1: Firebase Foundations & Architecture",
    summary: "Set up Google Firebase project, initialize Firebase SDK in React/Node environment, and master app configurations.",
    estimatedHours: 4,
    lessonIds: ["les-fb-1-1", "les-fb-1-2", "les-fb-1-3"],
    quizIds: ["quiz-fb-1"],
    labIds: ["lab-fb-1"]
  },
  {
    id: "mod-fb-2",
    courseId: "course-firebase-gcp",
    order: 2,
    title: "Module 2: Firebase Authentication & Security",
    summary: "Implement OAuth providers, email/password auth, JWT token verification, and session state persistence.",
    estimatedHours: 5,
    lessonIds: ["les-fb-2-1", "les-fb-2-2", "les-fb-2-3"],
    quizIds: ["quiz-fb-2"],
    labIds: ["lab-fb-2"]
  },
  {
    id: "mod-fb-3",
    courseId: "course-firebase-gcp",
    order: 3,
    title: "Module 3: Cloud Firestore Database Architecture",
    summary: "Design document-oriented Firestore collections, subcollections, compound indexes, and pagination.",
    estimatedHours: 5,
    lessonIds: ["les-fb-3-1", "les-fb-3-2", "les-fb-3-3"],
    quizIds: ["quiz-fb-3"],
    labIds: ["lab-fb-3"]
  },
  {
    id: "mod-fb-4",
    courseId: "course-firebase-gcp",
    order: 4,
    title: "Module 4: Zero-Trust Firestore Security Rules",
    summary: "Write unit-tested Firestore security rules enforcing role-based access control (RBAC) and schema validation.",
    estimatedHours: 4,
    lessonIds: ["les-fb-4-1", "les-fb-4-2", "les-fb-4-3"],
    quizIds: ["quiz-fb-4"],
    labIds: ["lab-fb-4"]
  },
  {
    id: "mod-fb-5",
    courseId: "course-firebase-gcp",
    order: 5,
    title: "Module 5: Serverless GCP Cloud Functions",
    summary: "Create Node.js Cloud Functions triggered by Firestore triggers, Cloud Storage uploads, and HTTP requests.",
    estimatedHours: 5,
    lessonIds: ["les-fb-5-1", "les-fb-5-2", "les-fb-5-3"],
    quizIds: ["quiz-fb-5"],
    labIds: ["lab-fb-5"]
  },
  {
    id: "mod-fb-6",
    courseId: "course-firebase-gcp",
    order: 6,
    title: "Module 6: GCP Cloud Run Microservice Integration",
    summary: "Connect Firebase frontend to autoscaling Cloud Run Docker containers over authenticated HTTPS endpoints.",
    estimatedHours: 5,
    lessonIds: ["les-fb-6-1", "les-fb-6-2", "les-fb-6-3"],
    quizIds: ["quiz-fb-6"],
    labIds: ["lab-fb-6"]
  },
  {
    id: "mod-fb-7",
    courseId: "course-firebase-gcp",
    order: 7,
    title: "Module 7: Firebase App Hosting Deployment",
    summary: "Configure apphosting.yaml compute parameters, continuous deployment from GitHub, and production launch.",
    estimatedHours: 4,
    lessonIds: ["les-fb-7-1", "les-fb-7-2", "les-fb-7-3"],
    quizIds: ["quiz-fb-7"],
    labIds: ["lab-fb-7"]
  },

  // Course 2: GCP Architecture
  {
    id: "mod-gcp-1",
    courseId: "course-gcp-architecture",
    order: 1,
    title: "Module 1: Google Cloud Infrastructure Fundamentals",
    summary: "Explore GCP resource hierarchy, projects, VPC networks, regions, and Cloud IAM permission structures.",
    estimatedHours: 6,
    lessonIds: ["les-gcp-1-1", "les-gcp-1-2", "les-gcp-1-3"],
    quizIds: ["quiz-gcp-1"],
    labIds: ["lab-gcp-1"]
  },
  {
    id: "mod-gcp-2",
    courseId: "course-gcp-architecture",
    order: 2,
    title: "Module 2: Containerization with Docker & Artifact Registry",
    summary: "Build multi-stage Dockerfiles, minimize container footprint, and push images to Google Artifact Registry.",
    estimatedHours: 7,
    lessonIds: ["les-gcp-2-1", "les-gcp-2-2", "les-gcp-2-3"],
    quizIds: ["quiz-gcp-2"],
    labIds: ["lab-gcp-2"]
  },
  {
    id: "mod-gcp-3",
    courseId: "course-gcp-architecture",
    order: 3,
    title: "Module 3: Serverless Microservices on GCP Cloud Run",
    summary: "Deploy stateless containers to Cloud Run with custom memory, concurrency, VPC connectors, and secrets.",
    estimatedHours: 7,
    lessonIds: ["les-gcp-3-1", "les-gcp-3-2", "les-gcp-3-3"],
    quizIds: ["quiz-gcp-3"],
    labIds: ["lab-gcp-3"]
  },
  {
    id: "mod-gcp-4",
    courseId: "course-gcp-architecture",
    order: 4,
    title: "Module 4: Zero-Trust IAM & Secret Manager Security",
    summary: "Configure service account keyless authentication, Workload Identity, and Cloud Secret Manager integration.",
    estimatedHours: 6,
    lessonIds: ["les-gcp-4-1", "les-gcp-4-2", "les-gcp-4-3"],
    quizIds: ["quiz-gcp-4"],
    labIds: ["lab-gcp-4"]
  },
  {
    id: "mod-gcp-5",
    courseId: "course-gcp-architecture",
    order: 5,
    title: "Module 5: Infrastructure as Code with HashiCorp Terraform",
    summary: "Write modular HCL scripts to provision Cloud Run services, IAM roles, and VPC networks reproducibly.",
    estimatedHours: 7,
    lessonIds: ["les-gcp-5-1", "les-gcp-5-2", "les-gcp-5-3"],
    quizIds: ["quiz-gcp-5"],
    labIds: ["lab-gcp-5"]
  },
  {
    id: "mod-gcp-6",
    courseId: "course-gcp-architecture",
    order: 6,
    title: "Module 6: Cloud Build & GitHub Actions CI/CD Automation",
    summary: "Set up zero-downtime blue/green deployment triggers on commit to main branch.",
    estimatedHours: 7,
    lessonIds: ["les-gcp-6-1", "les-gcp-6-2", "les-gcp-6-3"],
    quizIds: ["quiz-gcp-6"],
    labIds: ["lab-gcp-6"]
  },

  // Course 3: Play Store Publishing
  {
    id: "mod-mob-1",
    courseId: "course-play-store-dev",
    order: 1,
    title: "Module 1: Android Production Readiness & Build Tools",
    summary: "Configure Android SDK build tools, Capacitor/React Native assets, target API level 34+, and Gradle configurations.",
    estimatedHours: 4,
    lessonIds: ["les-mob-1-1", "les-mob-1-2", "les-mob-1-3"],
    quizIds: ["quiz-mob-1"],
    labIds: ["lab-mob-1"]
  },
  {
    id: "mod-mob-2",
    courseId: "course-play-store-dev",
    order: 2,
    title: "Module 2: Android App Bundle (AAB) & Keystore Signing",
    summary: "Generate upload keystores, configure R8 code minification, and compile release Android App Bundles (AAB).",
    estimatedHours: 4,
    lessonIds: ["les-mob-2-1", "les-mob-2-2", "les-mob-2-3"],
    quizIds: ["quiz-mob-2"],
    labIds: ["lab-mob-2"]
  },
  {
    id: "mod-mob-3",
    courseId: "course-play-store-dev",
    order: 3,
    title: "Module 3: Google Play Console Setup & Compliance",
    summary: "Create app entries, complete Content Ratings, Data Safety forms, and privacy policy verification.",
    estimatedHours: 4,
    lessonIds: ["les-mob-3-1", "les-mob-3-2", "les-mob-3-3"],
    quizIds: ["quiz-mob-3"],
    labIds: ["lab-mob-3"]
  },
  {
    id: "mod-mob-4",
    courseId: "course-play-store-dev",
    order: 4,
    title: "Module 4: Closed Testing Track & QA Management",
    summary: "Invite testers, manage internal release tracks, analyze crash reports in Play Vitals, and collect feedback.",
    estimatedHours: 4,
    lessonIds: ["les-mob-4-1", "les-mob-4-2", "les-mob-4-3"],
    quizIds: ["quiz-mob-4"],
    labIds: ["lab-mob-4"]
  },
  {
    id: "mod-mob-5",
    courseId: "course-play-store-dev",
    order: 5,
    title: "Module 5: Google Play Integrity API Implementation",
    summary: "Integrate server-side token decryption to verify app binary authenticity and defeat piracy/tampering.",
    estimatedHours: 5,
    lessonIds: ["les-mob-5-1", "les-mob-5-2", "les-mob-5-3"],
    quizIds: ["quiz-mob-5"],
    labIds: ["lab-mob-5"]
  },
  {
    id: "mod-mob-6",
    courseId: "course-play-store-dev",
    order: 6,
    title: "Module 6: Store Listing Optimization & Production Release",
    summary: "Optimize title, short description, graphic assets, localization, and launch open production rollout.",
    estimatedHours: 4,
    lessonIds: ["les-mob-6-1", "les-mob-6-2", "les-mob-6-3"],
    quizIds: ["quiz-mob-6"],
    labIds: ["lab-mob-6"]
  },

  // Course 4: Applied AI Engineering
  {
    id: "mod-ai-1",
    courseId: "course-applied-ai-engineering",
    order: 1,
    title: "Module 1: Prompt Engineering & Gemini 3.5 Models",
    summary: "Master systematic prompting techniques, system instructions, temperature tuning, and zero-shot reasoning.",
    estimatedHours: 7,
    lessonIds: ["les-ai-1-1", "les-ai-1-2", "les-ai-1-3"],
    quizIds: ["quiz-ai-1"],
    labIds: ["lab-ai-1"]
  },
  {
    id: "mod-ai-2",
    courseId: "course-applied-ai-engineering",
    order: 2,
    title: "Module 2: Gemini API Integration & Node/Python SDKs",
    summary: "Connect backend services to Gemini 3.5 API with retry handlers, streaming tokens, and rate limiters.",
    estimatedHours: 8,
    lessonIds: ["les-ai-2-1", "les-ai-2-2", "les-ai-2-3"],
    quizIds: ["quiz-ai-2"],
    labIds: ["lab-ai-2"]
  },
  {
    id: "mod-ai-3",
    courseId: "course-applied-ai-engineering",
    order: 3,
    title: "Module 3: Structured JSON Outputs & Pydantic Validation",
    summary: "Enforce strict JSON schema responses using Gemini responseSchema to eliminate hallucinated structure.",
    estimatedHours: 7,
    lessonIds: ["les-ai-3-1", "les-ai-3-2", "les-ai-3-3"],
    quizIds: ["quiz-ai-3"],
    labIds: ["lab-ai-3"]
  },
  {
    id: "mod-ai-4",
    courseId: "course-applied-ai-engineering",
    order: 4,
    title: "Module 4: Retrieval-Augmented Generation (RAG) Architecture",
    summary: "Build vector embeddings with text-embedding-004 and connect Vertex AI Vector Search for enterprise RAG.",
    estimatedHours: 8,
    lessonIds: ["les-ai-4-1", "les-ai-4-2", "les-ai-4-3"],
    quizIds: ["quiz-ai-4"],
    labIds: ["lab-ai-4"]
  },
  {
    id: "mod-ai-5",
    courseId: "course-applied-ai-engineering",
    order: 5,
    title: "Module 5: Multi-Agent Workflows & Function Calling",
    summary: "Implement function calling declarations enabling agents to query databases, call APIs, and execute code.",
    estimatedHours: 8,
    lessonIds: ["les-ai-5-1", "les-ai-5-2", "les-ai-5-3"],
    quizIds: ["quiz-ai-5"],
    labIds: ["lab-ai-5"]
  },
  {
    id: "mod-ai-6",
    courseId: "course-applied-ai-engineering",
    order: 6,
    title: "Module 6: AI Safety, Guardrails & Evaluation",
    summary: "Configure safety settings, block toxic prompts, test edge cases, and measure response latency and accuracy.",
    estimatedHours: 7,
    lessonIds: ["les-ai-6-1", "les-ai-6-2", "les-ai-6-3"],
    quizIds: ["quiz-ai-6"],
    labIds: ["lab-ai-6"]
  },

  // Course 5: BigQuery & MLOps
  {
    id: "mod-data-1",
    courseId: "course-bigquery-mlops",
    order: 1,
    title: "Module 1: BigQuery Data Warehouse Architecture",
    summary: "Understand columnar storage, slot allocation, dataset structuring, and cost management in Google BigQuery.",
    estimatedHours: 6,
    lessonIds: ["les-data-1-1", "les-data-1-2", "les-data-1-3"],
    quizIds: ["quiz-data-1"],
    labIds: ["lab-data-1"]
  },
  {
    id: "mod-data-2",
    courseId: "course-bigquery-mlops",
    order: 2,
    title: "Module 2: Advanced BigQuery SQL & Optimization",
    summary: "Master window functions, CTEs, array/struct unnesting, partitioning, and clustering for fast query execution.",
    estimatedHours: 6,
    lessonIds: ["les-data-2-1", "les-data-2-2", "les-data-2-3"],
    quizIds: ["quiz-data-2"],
    labIds: ["lab-data-2"]
  },
  {
    id: "mod-data-3",
    courseId: "course-bigquery-mlops",
    order: 3,
    title: "Module 3: Automated Data Ingestion & Pipelines",
    summary: "Build streaming and batch ETL pipelines importing Firestore change logs and CSV/JSON files into BigQuery.",
    estimatedHours: 6,
    lessonIds: ["les-data-3-1", "les-data-3-2", "les-data-3-3"],
    quizIds: ["quiz-data-3"],
    labIds: ["lab-data-3"]
  },
  {
    id: "mod-data-4",
    courseId: "course-bigquery-mlops",
    order: 4,
    title: "Module 4: In-Database Machine Learning with BigQuery ML",
    summary: "Train linear regression, logistic regression, and XGBoost models directly inside BigQuery using standard SQL.",
    estimatedHours: 6,
    lessonIds: ["les-data-4-1", "les-data-4-2", "les-data-4-3"],
    quizIds: ["quiz-data-4"],
    labIds: ["lab-data-4"]
  },
  {
    id: "mod-data-5",
    courseId: "course-bigquery-mlops",
    order: 5,
    title: "Module 5: MLOps Model Deployment & Monitoring",
    summary: "Export BigQuery ML models to Vertex AI Endpoint, set up feature drift detection, and automate re-training.",
    estimatedHours: 6,
    lessonIds: ["les-data-5-1", "les-data-5-2", "les-data-5-3"],
    quizIds: ["quiz-data-5"],
    labIds: ["lab-data-5"]
  },
  {
    id: "mod-data-6",
    courseId: "course-bigquery-mlops",
    order: 6,
    title: "Module 6: Business Intelligence & Executive Dashboards",
    summary: "Connect BigQuery datasets to Looker Studio, create real-time KPI scorecards, and publish interactive reports.",
    estimatedHours: 6,
    lessonIds: ["les-data-6-1", "les-data-6-2", "les-data-6-3"],
    quizIds: ["quiz-data-6"],
    labIds: ["lab-data-6"]
  }
];
