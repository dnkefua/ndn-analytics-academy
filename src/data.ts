import {
  SystemStatusItem,
  RecommendedTrack,
  ActiveBuild,
  SkillNode,
  EvalQueueItem,
  TranscriptRecord,
  Certificate,
} from './types';

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
