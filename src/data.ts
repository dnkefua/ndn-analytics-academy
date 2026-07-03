import {
  Course,
  Lesson,
  SystemStatusItem,
  RecommendedTrack,
  QuizQuestion,
  ActiveBuild,
  SkillNode,
  EvalQueueItem,
  TranscriptRecord,
  Certificate,
} from './types';

export const coursesData: Course[] = [
  {
    id: 'firebase-gcp-app-dev',
    level: 'L2_INTERMEDIATE',
    category: 'FIREBASE_GCP',
    title: 'Full-Stack App Development with Firebase & GCP',
    description: 'Build serverless, real-time web & mobile applications leveraging Firebase Authentication, Cloud Firestore, Firebase Cloud Functions, and GCP Cloud Run integration.',
    duration: '22.0_HOURS',
    credits: '55_CPD',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    instructorName: 'MSc Desmond Nkefua',
    instructorRole: 'Lead Full-Stack & Cloud Architect',
    syllabus: [
      'Firebase Authentication & Secure OAuth Setup (Google, Email/Password, Anonymous)',
      'Real-time NoSQL Database Architecture with Cloud Firestore & Security Rules',
      'Serverless Cloud Functions & GCP Cloud Run Event-Driven Microservices',
      'Push Notifications via Firebase Cloud Messaging (FCM) & Hosting Deployment'
    ],
    prerequisites: ['JavaScript / TypeScript', 'REST API basics']
  },
  {
    id: 'gcp-cloud-architecture',
    level: 'L3_PROFESSIONAL',
    category: 'GCP_ARCHITECTURE',
    title: 'Google Cloud Platform App Architecture & Deployment',
    description: 'Master enterprise-scale application deployment on Google Cloud Platform using Cloud Run, GKE, Terraform, and IAM.',
    duration: '24.0_HOURS',
    credits: '60_CPD',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
    instructorName: 'MSc Desmond Nkefua',
    instructorRole: 'Founder & GCP Cloud Architect',
    syllabus: [
      'Containerizing Web & Mobile Backends with Docker & Cloud Run',
      'Cloud SQL Database Clustering & Automated Backup Topologies',
      'IAM Security Policies, VPC Peering & Terraform Infrastructure as Code',
      'Continuous Deployment CI/CD with Cloud Build & Google Artifact Registry'
    ],
    prerequisites: ['Basic Docker', 'Linux Command Line', 'REST APIs']
  },
  {
    id: 'play-store-app-dev',
    level: 'L2_INTERMEDIATE',
    category: 'PLAY_STORE_DEV',
    title: 'Google Play Store App Development & Publishing',
    description: 'Build production-ready mobile applications and navigate Google Play Console publishing, Play Integrity API, and Monetization.',
    duration: '18.5_HOURS',
    credits: '45_CPD',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
    instructorName: 'MSc Desmond Nkefua',
    instructorRole: 'Lead Mobile Systems Developer',
    syllabus: [
      'Android App Architecture (MVVM, Jetpack Compose / Flutter)',
      'Google Play Console Release Management & Internal Testing Tracks',
      'Implementing Google Play In-App Billing & Subscription APIs',
      'Play Integrity API & App Security Bundle (AAB) Verification'
    ],
    prerequisites: ['Kotlin or Dart/Flutter basics']
  },
  {
    id: 'ai-agentic-engineering',
    level: 'L4_EXPERT',
    category: 'AI_ENGINEERING',
    title: 'Applied AI Engineering & Autonomous Gemini Agents',
    description: 'Architecting intelligent multi-agent systems, RAG vector search, and custom Gemini 3.5 LLM integrations for enterprise apps.',
    duration: '32.0_HOURS',
    credits: '90_CPD',
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80',
    instructorName: 'MSc Desmond Nkefua',
    instructorRole: 'AI Systems Director',
    syllabus: [
      'Gemini 3.5 Flash & Pro API Integration with Structured Function Calling',
      'Vector Databases (Vertex AI Vector Search & Pinecone) for Enterprise RAG',
      'Autonomous Multi-Agent Orchestration & Subagent Task Loops',
      'Prompt Engineering & Fine-tuning LLM Guardrails'
    ],
    prerequisites: ['Python 3.10+', 'Async Programming']
  },
  {
    id: 'bigquery-mlops-analytics',
    level: 'L3_PROFESSIONAL',
    category: 'BIGDATA_MLOPS',
    title: 'BigData Analytics & MLOps with BigQuery ML',
    description: 'Deploy petabyte-scale data pipelines and machine learning models directly inside Google BigQuery & Vertex AI Pipelines.',
    duration: '20.0_HOURS',
    credits: '50_CPD',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    instructorName: 'MSc Desmond Nkefua',
    instructorRole: 'Principal Data Engineer',
    syllabus: [
      'Building Predictive ML Models using SQL with BigQuery ML (BQML)',
      'Streaming Data Ingestion via Pub/Sub & Dataflow',
      'Automated Model Monitoring, Feature Stores & Vertex AI Pipelines'
    ],
    prerequisites: ['Advanced SQL', 'Data Warehousing']
  }
];

export const activeLessonData: Lesson = {
  id: 'firebase-gcp-functions',
  courseId: 'firebase-gcp-app-dev',
  moduleId: 'MODULE 02',
  moduleName: 'Firebase Cloud Firestore & Functions',
  title: 'Connecting Firebase Cloud Functions to GCP Cloud Run',
  progress: 80,
  videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  videoPoster: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
  terminalLanguage: 'python',
  terminalCode: `# Firebase Admin SDK & GCP Integration
import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase App authenticated with GCP credentials
cred = credentials.ApplicationDefault()
firebase_admin.initialize_app(cred, {
    'projectId': 'ndn-analytics-prod',
})

db = firestore.client()
doc_ref = db.collection('academy_users').document('student_01')
doc_ref.set({'status': 'ACTIVE', 'gcp_linked': True})

print("[ SUCCESS ] Firestore document synchronized with GCP project!")`,
  terminalOutput: '[ STATUS_OK ] Firebase & GCP Project uplink verified. Latency: 10ms',
  practicalTasks: [
    { id: 't1', title: 'Initialize Firebase Admin SDK with GCP Default Credentials', completed: true },
    { id: 't2', title: 'Write real-time Firestore Document & security rules', completed: true },
    { id: 't3', title: 'Trigger Firebase Cloud Function on Firestore write event', completed: true },
    { id: 't4', title: 'Configure FCM push notifications for Android Play Store app', completed: false }
  ],
  notes: {
    coreConcepts: 'Firebase provides real-time client SDKs for mobile and web apps, while backing seamlessly into Google Cloud Platform infrastructure for advanced container scaling and BigQuery data exports.',
    proTip: 'Use Cloud Firestore Security Rules to enforce authorization directly on client database requests, keeping backends slim and fast.',
    keyTerms: [
      { term: 'Cloud Firestore', definition: 'Google scale NoSQL document database.' },
      { term: 'Cloud Functions', definition: 'Serverless event-driven code execution.' },
      { term: 'Application Default Credentials', definition: 'GCP security authentication standard.' }
    ]
  },
  resources: [
    { name: 'NDN_Firebase_GCP_Architecture.pdf', url: 'https://www.ndnanalytics.com/', type: 'pdf' },
    { name: 'Firebase_Firestore_Security_Rules.js', url: 'https://github.com/dnkefua/ndn-analytics.git', type: 'code' }
  ],
  instructor: {
    name: 'MSc Desmond Nkefua',
    role: 'Founder & Lead Instructor',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    online: true
  }
};

export const systemStatusItems: SystemStatusItem[] = [
  {
    id: 'feed-1',
    time: 'NOW',
    category: 'FIREBASE & GCP',
    message: 'Cloud Firestore & Cloud Run event pipeline operational.',
    status: 'success'
  },
  {
    id: 'feed-2',
    time: '1H AGO',
    category: 'PLAY STORE',
    message: 'Google Play Console API v3 integrated into NDN App Workbench.',
    status: 'info'
  },
  {
    id: 'feed-3',
    time: '3H AGO',
    category: 'AI ENGINEERING',
    message: 'Gemini 3.5 Flash model weights updated for multi-agent loops.',
    status: 'success'
  }
];

export const recommendedTracks: RecommendedTrack[] = [
  {
    id: 'firebase-gcp-app-dev',
    title: 'Firebase & GCP App Dev',
    description: 'Build real-time full-stack apps with Firebase Auth, Firestore & GCP Cloud Run.',
    modulesCount: 14,
    level: 'L2_INTERMEDIATE',
    icon: 'local_fire_department',
    category: 'Firebase & GCP'
  },
  {
    id: 'ai-agentic-engineering',
    title: 'Applied AI & Agentic Systems',
    description: 'Master Gemini 3.5 APIs, RAG pipelines, and multi-agent AI engineering.',
    modulesCount: 16,
    level: 'L4_EXPERT',
    icon: 'psychology',
    category: 'AI Engineering'
  },
  {
    id: 'gcp-cloud-architecture',
    title: 'Google Cloud Platform Architecture',
    description: 'Deploy serverless microservices with Cloud Run, GKE, and Terraform.',
    modulesCount: 14,
    level: 'L3_PROFESSIONAL',
    icon: 'cloud',
    category: 'GCP Architecture'
  },
  {
    id: 'play-store-app-dev',
    title: 'Google Play Store App Dev',
    description: 'Build, monetize, and publish production Android & Flutter apps.',
    modulesCount: 12,
    level: 'L2_INTERMEDIATE',
    icon: 'smartphone',
    category: 'Google App Store'
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'quiz-fire-1',
    moduleId: 'FIREBASE_MODULE_02',
    idCode: 'FIRE-201-F',
    category: 'Firebase & GCP App Dev',
    question: 'Which Firebase feature allows you to execute backend Node.js or Python code automatically in response to events triggered by Cloud Firestore or Firebase Auth?',
    options: [
      { key: 'A', text: 'Firebase Cloud Messaging (FCM)' },
      { key: 'B', text: 'Firebase Cloud Functions' },
      { key: 'C', text: 'Firebase Remote Config' },
      { key: 'D', text: 'Firebase App Check' }
    ],
    correctAnswer: 'B',
    explanation: 'Firebase Cloud Functions is a serverless framework that lets you automatically run backend code in response to events triggered by Firebase features and HTTPS requests.',
    potentialRewards: [
      { name: 'FIREBASE_FULLSTACK_DEV', badge: 'Firebase Master Badge', icon: 'local_fire_department', color: 'secondary-container' },
      { name: 'FIRESTORE_ARCHITECT', badge: 'Unlocks Lab Workbench', icon: 'database', color: 'neon-cyan' }
    ],
    technicalResources: [
      { title: 'Firebase Cloud Functions Official Docs', url: 'https://firebase.google.com/docs/functions' },
      { title: 'NDN Analytics Firebase Guide', url: 'https://www.ndnanalytics.com/' }
    ]
  },
  {
    id: 'quiz-gcp-1',
    moduleId: 'GCP_MODULE_03',
    idCode: 'GCP-884-A',
    category: 'Google Cloud Platform',
    question: 'Which GCP compute service automatically scales containerized applications from zero to thousands of instances without managing cluster nodes?',
    options: [
      { key: 'A', text: 'Google Kubernetes Engine (GKE) Autopilot' },
      { key: 'B', text: 'Google Cloud Run' },
      { key: 'C', text: 'Compute Engine Virtual Machines' },
      { key: 'D', text: 'App Engine Standard Environment' }
    ],
    correctAnswer: 'B',
    explanation: 'Google Cloud Run is a fully managed serverless platform that automatically scales containerized stateless web services or microservices from zero to scale.',
    potentialRewards: [
      { name: 'CERTIFIED_GCP_ARCHITECT', badge: 'GCP Architect Seal', icon: 'verified', color: 'secondary-container' },
      { name: 'CLOUD_RUN_SPECIALIST', badge: 'Unlocks Lab Workbench', icon: 'cloud', color: 'neon-cyan' }
    ],
    technicalResources: [
      { title: 'Google Cloud Run Official Documentation', url: 'https://cloud.google.com/run' },
      { title: 'NDN Analytics GCP Architecture Guide', url: 'https://www.ndnanalytics.com/' }
    ]
  }
];

export const activeBuildsData: ActiveBuild[] = [
  {
    id: 'build-ndn-firebase',
    title: 'NDN Firebase & GCP Realtime Portal',
    description: 'Full-stack application with Cloud Firestore, Auth, and GCP Cloud Run microservices.',
    repoUrl: 'https://github.com/dnkefua/ndn-analytics.git',
    status: 'STABLE_RELEASE',
    progressLabel: 'FIRESTORE BENCHMARK VERIFIED',
    progressValue: 100,
    complete: true
  },
  {
    id: 'build-ndn-cloud',
    title: 'NDN GCP Cloud Run Gateway',
    description: 'Production containerized backend microservice with automated terraform deployment.',
    repoUrl: 'https://github.com/dnkefua/ndn-analytics.git',
    status: 'STABLE_RELEASE',
    progressLabel: 'DEPRECATING TEST INSTANCES',
    progressValue: 100,
    complete: true
  }
];

export const skillNodesData: SkillNode[] = [
  { id: 'node-firebase', label: 'Firebase & Firestore', level: 'L4 Specialist', icon: 'local_fire_department', x: 25, y: 20 },
  { id: 'node-gcp', label: 'GCP Cloud Run', level: 'L4 Architect', icon: 'cloud', x: 75, y: 25 },
  { id: 'node-ai', label: 'Gemini Agentic AI', level: 'L5 Expert', icon: 'psychology', x: 33, y: 80 },
  { id: 'node-android', label: 'Play Store App Dev', level: 'L3 Dev', icon: 'smartphone', x: 66, y: 75 }
];

export const evalQueueData: EvalQueueItem[] = [
  { id: 'queue-1', fileName: 'firestore_security_rules.js', status: 'QUEUED' },
  { id: 'queue-2', fileName: 'gcloud_deploy_pipeline.sh', status: 'QUEUED' }
];

export const transcriptData: TranscriptRecord = {
  studentName: 'MSc Desmond Nkefua',
  studentId: 'NDN-STUDENT-2026-8809',
  enrollmentDate: 'OCTOBER 14, 2025',
  gpa: 3.96,
  totalCredits: 50,
  cpdPoints: 300,
  verificationHash: 'NDN-ACADEMY-VERIFIED-994285-FIREBASE-GCP-AI',
  grades: [
    {
      id: 'g-0',
      courseCode: 'FIRE-201',
      courseTitle: 'Full-Stack App Development with Firebase & GCP',
      category: 'Firebase & GCP',
      credits: 10,
      quizScore: 99,
      labScore: 100,
      finalGrade: 'A+',
      status: 'COMPLETED',
      term: 'SPRING 2026'
    },
    {
      id: 'g-1',
      courseCode: 'AI-301',
      courseTitle: 'Applied AI Engineering & Autonomous Gemini Agents',
      category: 'AI Engineering',
      credits: 10,
      quizScore: 98,
      labScore: 100,
      finalGrade: 'A+',
      status: 'COMPLETED',
      term: 'SPRING 2026'
    },
    {
      id: 'g-2',
      courseCode: 'GCP-101',
      courseTitle: 'Google Cloud Platform App Architecture & Deployment',
      category: 'GCP Architecture',
      credits: 10,
      quizScore: 95,
      labScore: 96,
      finalGrade: 'A',
      status: 'COMPLETED',
      term: 'SPRING 2026'
    },
    {
      id: 'g-3',
      courseCode: 'PLAY-201',
      courseTitle: 'Google Play Store App Development & Publishing',
      category: 'Google App Store',
      credits: 10,
      quizScore: 92,
      labScore: 95,
      finalGrade: 'A',
      status: 'COMPLETED',
      term: 'WINTER 2025'
    },
    {
      id: 'g-4',
      courseCode: 'BQML-401',
      courseTitle: 'BigData Analytics & MLOps with BigQuery ML',
      category: 'BigData MLOps',
      credits: 10,
      quizScore: 90,
      labScore: 92,
      finalGrade: 'A-',
      status: 'COMPLETED',
      term: 'WINTER 2025'
    }
  ]
};

export const certificatesData: Certificate[] = [
  {
    id: 'cert-firebase-dev',
    courseId: 'firebase-gcp-app-dev',
    title: 'Certified Firebase & GCP Full-Stack Developer',
    trackName: 'Firebase & Google Cloud App Development Track',
    recipientName: 'MSc Desmond Nkefua',
    issueDate: 'MARCH 10, 2026',
    verificationId: 'NDN-CERT-2026-FIRE-77291',
    badgeIcon: 'local_fire_department',
    cpdCredits: 55,
    instructorName: 'MSc Desmond Nkefua',
    isUnlocked: true
  },
  {
    id: 'cert-gcp-arch',
    courseId: 'gcp-cloud-architecture',
    title: 'Certified Google Cloud Platform Application Architect',
    trackName: 'Google Cloud Platform Engineering Track',
    recipientName: 'MSc Desmond Nkefua',
    issueDate: 'FEBRUARY 28, 2026',
    verificationId: 'NDN-CERT-2026-GCP-88429',
    badgeIcon: 'cloud',
    cpdCredits: 60,
    instructorName: 'MSc Desmond Nkefua',
    isUnlocked: true
  },
  {
    id: 'cert-play-dev',
    courseId: 'play-store-app-dev',
    title: 'Google Play Store App Publishing Specialist',
    trackName: 'Mobile App Store & Play Console Track',
    recipientName: 'MSc Desmond Nkefua',
    issueDate: 'JANUARY 15, 2026',
    verificationId: 'NDN-CERT-2026-PLAY-55102',
    badgeIcon: 'smartphone',
    cpdCredits: 45,
    instructorName: 'MSc Desmond Nkefua',
    isUnlocked: true
  },
  {
    id: 'cert-ai-eng',
    courseId: 'ai-agentic-engineering',
    title: 'Senior AI Systems & Gemini Agentic Engineer',
    trackName: 'Generative AI & Autonomous Systems Track',
    recipientName: 'MSc Desmond Nkefua',
    issueDate: 'MARCH 30, 2026',
    verificationId: 'NDN-CERT-2026-AI-99381',
    badgeIcon: 'psychology',
    cpdCredits: 90,
    instructorName: 'MSc Desmond Nkefua',
    isUnlocked: true
  }
];
