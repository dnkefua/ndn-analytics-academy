import { Course } from '../types/academy';

export const COURSES: Course[] = [
  {
    id: "course-firebase-gcp",
    slug: "firebase-gcp-fullstack",
    code: "NDN-FB-401",
    title: "Firebase & GCP Full-Stack App Development",
    category: "FIREBASE_GCP",
    level: "L2_INTERMEDIATE",
    durationHours: 32,
    cpdCredits: 15,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Master end-to-end full-stack app engineering using Firebase Auth, Firestore Security Rules, GCP Cloud Functions, and App Hosting.",
    longDescription: "Architect, build, and deploy enterprise-grade web and mobile applications leveraging Google Firebase and Google Cloud Platform. You will design real-time database schemas, enforce zero-trust Firestore security rules, deploy serverless GCP Cloud Functions, and deploy high-performance applications to Firebase App Hosting.",
    instructorName: "MSc Desmond Nkefua",
    instructorRole: "Founder & Lead Cloud/AI Architect, NDN Analytics",
    outcomes: [
      "Architect relational data models inside Google Cloud Firestore with sub-10ms query performance.",
      "Write bulletproof Firestore Security Rules protecting learner data against unauthorized reads/writes.",
      "Deploy event-driven Cloud Functions triggered by Firestore mutations and HTTP webhooks.",
      "Containerize and deploy production Node/React web applications onto Firebase App Hosting."
    ],
    prerequisites: [
      "Proficiency in JavaScript/TypeScript (ES6+)",
      "Basic understanding of RESTful APIs & JSON data formats",
      "Git CLI & terminal fundamentals"
    ],
    moduleIds: [
      "mod-fb-1",
      "mod-fb-2",
      "mod-fb-3",
      "mod-fb-4",
      "mod-fb-5",
      "mod-fb-6",
      "mod-fb-7"
    ],
    finalProjectId: "proj-fb-capstone",
    certificateRules: {
      minQuizAverage: 75,
      minLabAverage: 80,
      requiredLessonCompletionPercent: 85,
      requiresFinalProject: true
    },
    tags: ["Firebase", "Cloud Firestore", "GCP Cloud Functions", "App Hosting", "TypeScript", "Node.js"]
  },
  {
    id: "course-gcp-architecture",
    slug: "gcp-cloud-architecture",
    code: "NDN-GCP-501",
    title: "Google Cloud App Architecture & Infrastructure",
    category: "GCP_ARCHITECTURE",
    level: "L3_PROFESSIONAL",
    durationHours: 40,
    cpdCredits: 20,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Design resilient, autoscaling microservices on Google Cloud Run, IAM, Docker, Terraform IaC, and Cloud Build CI/CD.",
    longDescription: "Prepare for production cloud engineering by mastering GCP infrastructure as code. Learn containerization with Docker, serverless execution on Cloud Run, granular identity access management (IAM), automated CI/CD pipelines with Cloud Build, and declarative infrastructure provisioning via Terraform.",
    instructorName: "MSc Desmond Nkefua",
    instructorRole: "Founder & Lead Cloud/AI Architect, NDN Analytics",
    outcomes: [
      "Package microservices into multi-stage Docker containers optimized for Cloud Run.",
      "Configure GCP Identity & Access Management (IAM) least-privilege service accounts.",
      "Provision GCP cloud infrastructure declaratively using HashiCorp Terraform.",
      "Build automated GitHub Actions & Cloud Build CI/CD deployment pipelines."
    ],
    prerequisites: [
      "Prior experience with Linux command line",
      "Basic knowledge of cloud computing concepts",
      "Familiarity with containerization concepts"
    ],
    moduleIds: [
      "mod-gcp-1",
      "mod-gcp-2",
      "mod-gcp-3",
      "mod-gcp-4",
      "mod-gcp-5",
      "mod-gcp-6"
    ],
    finalProjectId: "proj-gcp-capstone",
    certificateRules: {
      minQuizAverage: 80,
      minLabAverage: 80,
      requiredLessonCompletionPercent: 90,
      requiresFinalProject: true
    },
    tags: ["Google Cloud", "Cloud Run", "Docker", "Terraform", "IAM", "CI/CD"]
  },
  {
    id: "course-play-store-dev",
    slug: "play-store-dev",
    code: "NDN-MOB-301",
    title: "Google Play Store App Publishing & Security",
    category: "PLAY_STORE_DEV",
    level: "L2_INTERMEDIATE",
    durationHours: 25,
    cpdCredits: 12,
    image: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Build, sign, optimize, and publish Android applications on Google Play Store with Play Integrity API security.",
    longDescription: "Take your mobile application from source code to global distribution on the Google Play Store. Learn Android App Bundle (AAB) compilation, R8/ProGuard obfuscation, keystore management, Google Play Integrity API verification, closed testing tracks, and Play Store ASO optimization.",
    instructorName: "MSc Desmond Nkefua",
    instructorRole: "Founder & Lead Cloud/AI Architect, NDN Analytics",
    outcomes: [
      "Generate release Android App Bundles (AAB) signed with secure keystores.",
      "Implement Google Play Integrity API to detect tampered binaries and unauthorized execution.",
      "Set up Play Console internal, closed, and open testing tracks.",
      "Optimize Google Play Store metadata, screenshots, and privacy policy compliance."
    ],
    prerequisites: [
      "Basic Kotlin, React Native, or Capacitor/Android app build knowledge",
      "Google Play Developer account setup"
    ],
    moduleIds: [
      "mod-mob-1",
      "mod-mob-2",
      "mod-mob-3",
      "mod-mob-4",
      "mod-mob-5",
      "mod-mob-6"
    ],
    finalProjectId: "proj-mob-capstone",
    certificateRules: {
      minQuizAverage: 75,
      minLabAverage: 75,
      requiredLessonCompletionPercent: 85,
      requiresFinalProject: true
    },
    tags: ["Android", "Play Store", "Play Integrity API", "AAB", "App Signing", "Capacitor"]
  },
  {
    id: "course-applied-ai-engineering",
    slug: "applied-ai-engineering",
    code: "NDN-AI-601",
    title: "Applied AI Engineering & Gemini Autonomous Agents",
    category: "AI_ENGINEERING",
    level: "L3_PROFESSIONAL",
    durationHours: 45,
    cpdCredits: 25,
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Engineer production LLM applications using Google Gemini 3.5, Structured Outputs, RAG, and multi-agent systems.",
    longDescription: "Master cutting-edge AI engineering with Google Gemini models. Learn prompt engineering, Pydantic structured output enforcement, Retrieval-Augmented Generation (RAG) with vector databases, agent tool calling, and evaluation frameworks for reliable enterprise deployment.",
    instructorName: "MSc Desmond Nkefua",
    instructorRole: "Founder & Lead Cloud/AI Architect, NDN Analytics",
    outcomes: [
      "Prompt engineering for zero-shot reasoning and multi-turn conversational agents.",
      "Enforce JSON schema outputs with Pydantic for deterministic backend execution.",
      "Build RAG pipelines using Vertex AI Vector Search and embeddings.",
      "Architect multi-agent autonomous systems using tool-calling capabilities."
    ],
    prerequisites: [
      "Solid Python or TypeScript background",
      "Basic understanding of API requests and JSON structure"
    ],
    moduleIds: [
      "mod-ai-1",
      "mod-ai-2",
      "mod-ai-3",
      "mod-ai-4",
      "mod-ai-5",
      "mod-ai-6"
    ],
    finalProjectId: "proj-ai-capstone",
    certificateRules: {
      minQuizAverage: 80,
      minLabAverage: 85,
      requiredLessonCompletionPercent: 90,
      requiresFinalProject: true
    },
    tags: ["Gemini 3.5", "AI Agents", "RAG", "LLM", "Python", "Structured Output"]
  },
  {
    id: "course-bigquery-mlops",
    slug: "bigquery-mlops",
    code: "NDN-DATA-502",
    title: "BigQuery Data Warehousing, Analytics & MLOps",
    category: "BIGDATA_MLOPS",
    level: "L3_PROFESSIONAL",
    durationHours: 36,
    cpdCredits: 18,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Architect petabyte-scale data pipelines, BigQuery SQL analytics, BigQuery ML models, and automated MLOps.",
    longDescription: "Transform enterprise raw data into strategic intelligence. Learn BigQuery table partitioning, clustered SQL query optimization, automated ETL/ELT pipelines with Cloud Dataflow, machine learning directly inside BigQuery using BigQuery ML, and model monitoring in production.",
    instructorName: "MSc Desmond Nkefua",
    instructorRole: "Founder & Lead Cloud/AI Architect, NDN Analytics",
    outcomes: [
      "Write high-efficiency SQL queries with partitioning and clustering on BigQuery.",
      "Build automated data ingestion pipelines from Cloud Storage and Firestore.",
      "Train and deploy predictive machine learning models directly in SQL using BigQuery ML.",
      "Design Looker Studio real-time executive dashboards."
    ],
    prerequisites: [
      "SQL query proficiency (SELECT, JOIN, GROUP BY)",
      "Basic statistics & data analytics background"
    ],
    moduleIds: [
      "mod-data-1",
      "mod-data-2",
      "mod-data-3",
      "mod-data-4",
      "mod-data-5",
      "mod-data-6"
    ],
    finalProjectId: "proj-data-capstone",
    certificateRules: {
      minQuizAverage: 80,
      minLabAverage: 80,
      requiredLessonCompletionPercent: 85,
      requiresFinalProject: true
    },
    tags: ["BigQuery", "SQL", "MLOps", "BigQuery ML", "Data Pipeline", "Looker Studio"]
  }
];
