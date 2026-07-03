import { ProjectBrief } from '../types/academy';

export const PROJECTS: ProjectBrief[] = [
  {
    id: "proj-fb-capstone",
    courseId: "course-firebase-gcp",
    title: "Capstone Project: Real-Time Enterprise Analytics Dashboard",
    scenario: "NDN Analytics requires a production-grade web application to monitor real-time user activity, automated course evaluations, and cloud service status. You must architect a full-stack React/Node solution utilizing Firebase Authentication, Firestore with security rules, serverless Cloud Functions for background processing, and deploy to Firebase App Hosting.",
    deliverables: [
      "Public GitHub repository containing client frontend, server API, and firestore.rules",
      "Live deployed URL hosted on Firebase App Hosting (*.hosted.app or *.web.app)",
      "Architecture diagram & security breakdown document in README.md",
      "Short video demo link or screenshots showcasing real-time Firestore database sync"
    ],
    requiredEvidence: ["repo_url", "deployed_url", "screenshots", "reflection"],
    rubric: [
      { id: "rub-p1", label: "Functionality", description: "Real-time updates, auth flows, and API requests execute flawlessly.", maxPoints: 25 },
      { id: "rub-p2", label: "Code Quality", description: "Clean TypeScript modular code, zero lint errors, proper error boundaries.", maxPoints: 20 },
      { id: "rub-p3", label: "Architecture", description: "Firestore schema normalized cleanly; Cloud Functions handles backend side-effects.", maxPoints: 20 },
      { id: "rub-p4", label: "Security", description: "Firestore security rules enforce RBAC; credentials stored safely in secrets.", maxPoints: 15 },
      { id: "rub-p5", label: "Deployment", description: "App is deployed and live on Firebase App Hosting with custom domain or default domain.", maxPoints: 10 },
      { id: "rub-p6", label: "Documentation", description: "Comprehensive README detailing architecture decisions, setup guide, and reflection.", maxPoints: 10 }
    ]
  },
  {
    id: "proj-gcp-capstone",
    courseId: "course-gcp-architecture",
    title: "Capstone Project: Cloud Run Multi-Region Autoscaling Microservice",
    scenario: "Design, containerize, and deploy a resilient microservice on GCP Cloud Run using HashiCorp Terraform IaC and Cloud Build CI/CD automation.",
    deliverables: [
      "GitHub repo with Terraform HCL scripts and Dockerfile",
      "Live Cloud Run service URL",
      "Cloud Build trigger configuration log output",
      "Technical reflection & architecture diagram"
    ],
    requiredEvidence: ["repo_url", "deployed_url", "reflection"],
    rubric: [
      { id: "rub-gcp-p1", label: "Functionality", description: "Microservice endpoints respond with sub-100ms latency.", maxPoints: 25 },
      { id: "rub-gcp-p2", label: "Code Quality", description: "Modular Dockerfile & Terraform scripts following Google Cloud best practices.", maxPoints: 20 },
      { id: "rub-gcp-p3", label: "Architecture", description: "VPC connector, IAM least privilege service accounts, Cloud Run autoscaling.", maxPoints: 20 },
      { id: "rub-gcp-p4", label: "Security", description: "Secret Manager integration; zero hardcoded credentials.", maxPoints: 15 },
      { id: "rub-gcp-p5", label: "Deployment", description: "Automated GitHub Actions/Cloud Build pipeline triggers on main branch.", maxPoints: 10 },
      { id: "rub-gcp-p6", label: "Documentation", description: "Detailed architectural diagram and cost optimization plan.", maxPoints: 10 }
    ]
  },
  {
    id: "proj-mob-capstone",
    courseId: "course-play-store-dev",
    title: "Capstone Project: Google Play Store Production Release",
    scenario: "Package, sign, secure with Play Integrity API, and publish an Android application on Google Play Console testing tracks.",
    deliverables: [
      "GitHub repository with Android build setup",
      "Signed Android App Bundle (.aab)",
      "Play Integrity API server-side verification token script",
      "Play Console Store listing URL or screenshot proof of Closed Testing release"
    ],
    requiredEvidence: ["repo_url", "screenshots", "reflection"],
    rubric: [
      { id: "rub-mob-p1", label: "Functionality", description: "App runs smoothly on Android API level 34+ without ANR/crashes.", maxPoints: 25 },
      { id: "rub-mob-p2", label: "Code Quality", description: "ProGuard/R8 obfuscation enabled; clean build logs.", maxPoints: 20 },
      { id: "rub-mob-p3", label: "Architecture", description: "Play Integrity API verification flow fully implemented.", maxPoints: 20 },
      { id: "rub-mob-p4", label: "Security", description: "App signing key securely managed; release keystore isolated.", maxPoints: 15 },
      { id: "rub-mob-p5", label: "Deployment", description: "AAB uploaded and released to Play Console Closed Testing track.", maxPoints: 10 },
      { id: "rub-mob-p6", label: "Documentation", description: "Privacy policy link, data safety form completed, store metadata.", maxPoints: 10 }
    ]
  },
  {
    id: "proj-ai-capstone",
    courseId: "course-applied-ai-engineering",
    title: "Capstone Project: Gemini Multi-Agent Enterprise Intelligence System",
    scenario: "Build an autonomous AI system using Google Gemini 3.5, vector embeddings RAG, tool calling, and Pydantic structured output.",
    deliverables: [
      "GitHub repository containing agent orchestration code & prompt definitions",
      "Live interactive web interface URL",
      "Evaluations script demonstrating response accuracy & safety guardrails",
      "Architectural design whitepaper"
    ],
    requiredEvidence: ["repo_url", "deployed_url", "demo_video", "reflection"],
    rubric: [
      { id: "rub-ai-p1", label: "Functionality", description: "Multi-agent tool calling and conversational RAG execute seamlessly.", maxPoints: 25 },
      { id: "rub-ai-p2", label: "Code Quality", description: "Clean Python/TypeScript code with Pydantic type safety.", maxPoints: 20 },
      { id: "rub-ai-p3", label: "Architecture", description: "Vertex AI Vector Search integration; clean subagent orchestration.", maxPoints: 20 },
      { id: "rub-ai-p4", label: "Security", description: "Safety settings configured; prompt injection guardrails active.", maxPoints: 15 },
      { id: "rub-ai-p5", label: "Deployment", description: "Hosted endpoint live on GCP Cloud Run / Firebase App Hosting.", maxPoints: 10 },
      { id: "rub-ai-p6", label: "Documentation", description: "Comprehensive benchmark report detailing latency and precision.", maxPoints: 10 }
    ]
  },
  {
    id: "proj-data-capstone",
    courseId: "course-bigquery-mlops",
    title: "Capstone Project: BigQuery Data Pipeline & Looker Intelligence Dashboard",
    scenario: "Ingest enterprise telemetry data, optimize SQL queries using partitioning/clustering, train a BigQuery ML model, and publish a Looker Studio dashboard.",
    deliverables: [
      "GitHub repo with SQL transformations and BigQuery ML DDL scripts",
      "Looker Studio public/shared report URL",
      "Query execution cost comparison benchmark",
      "Executive data story presentation"
    ],
    requiredEvidence: ["repo_url", "deployed_url", "reflection"],
    rubric: [
      { id: "rub-data-p1", label: "Functionality", description: "SQL pipelines process petabytes efficiently; ML model outputs predictions.", maxPoints: 25 },
      { id: "rub-data-p2", label: "Code Quality", description: "Clean formatted ANSI SQL with CTEs and window functions.", maxPoints: 20 },
      { id: "rub-data-p3", label: "Architecture", description: "Table partitioning by DATE and clustering by ID reduces query scan size.", maxPoints: 20 },
      { id: "rub-data-p4", label: "Security", description: "Column-level security and authorized views configured.", maxPoints: 15 },
      { id: "rub-data-p5", label: "Deployment", description: "Looker Studio dashboard connected live to BigQuery backend.", maxPoints: 10 },
      { id: "rub-data-p6", label: "Documentation", description: "Executive summary explaining model insights and business ROI.", maxPoints: 10 }
    ]
  }
];
