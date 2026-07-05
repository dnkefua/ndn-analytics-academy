export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export type CourseLevel = "L1_FOUNDATION" | "L2_INTERMEDIATE" | "L3_PROFESSIONAL" | "L4_EXPERT";

export type CourseCategory =
  | "FIREBASE_GCP"
  | "GCP_ARCHITECTURE"
  | "PLAY_STORE_DEV"
  | "AI_ENGINEERING"
  | "BIGDATA_MLOPS";

export type LessonType = "video" | "reading" | "lab" | "quiz" | "project";

export interface ResourceLink {
  name: string;
  url: string;
  type: "pdf" | "code" | "docs" | "video" | "repo" | "article";
}

export interface LessonNotes {
  coreConcepts: string;
  proTip: string;
  keyTerms: { term: string; definition: string }[];
}

export interface CertificateRules {
  minQuizAverage: number;
  minLabAverage: number;
  requiredLessonCompletionPercent: number;
  requiresFinalProject: boolean;
}

export interface Course {
  id: string;
  slug: string;
  code: string;
  title: string;
  category: CourseCategory;
  level: CourseLevel;
  durationHours: number;
  cpdCredits: number;
  image: string;
  shortDescription: string;
  longDescription: string;
  instructorName: string;
  instructorRole: string;
  outcomes: string[];
  prerequisites: string[];
  moduleIds: string[];
  finalProjectId?: string;
  certificateRules: CertificateRules;
  tags: string[];
}

export interface Module {
  id: string;
  courseId: string;
  order: number;
  title: string;
  summary: string;
  estimatedHours: number;
  lessonIds: string[];
  quizIds: string[];
  labIds: string[];
  assignmentIds?: string[];
}

export interface Lesson {
  id: string;
  courseId: string;
  moduleId: string;
  order: number;
  type: LessonType;
  title: string;
  summary: string;
  durationMinutes: number;
  videoUrl?: string;
  videoPoster?: string;
  readingMarkdown?: string;
  terminalLanguage?: "python" | "kotlin" | "gcloud" | "javascript" | "typescript" | "bash";
  starterCode?: string;
  expectedOutput?: string;
  notes: LessonNotes;
  resources: ResourceLink[];
}

export interface QuizQuestion {
  id: string;
  courseId: string;
  moduleId: string;
  type: "multiple_choice" | "multi_select" | "code_output" | "debugging" | "architecture_scenario";
  difficulty: "easy" | "medium" | "hard";
  question: string;
  codeSnippet?: string;
  options: { key: string; text: string }[];
  correctAnswer: string | string[];
  explanation: string;
  technicalResources: ResourceLink[];
}

export interface RubricItem {
  id: string;
  label: string;
  description: string;
  maxPoints: number;
}

export interface Lab {
  id: string;
  courseId: string;
  moduleId: string;
  title: string;
  summary: string;
  instructions: string[];
  starterCode?: string;
  expectedOutput?: string;
  validationType: "manual" | "checklist" | "unit_test" | "repo_scan" | "url_check" | "ai_review";
  rubric: RubricItem[];
  requiredEvidence: ("code" | "repo_url" | "deployed_url" | "screenshot" | "reflection")[];
}

export interface ProjectBrief {
  id: string;
  courseId: string;
  title: string;
  scenario: string;
  deliverables: string[];
  rubric: RubricItem[];
  requiredEvidence: ("repo_url" | "deployed_url" | "screenshots" | "demo_video" | "reflection")[];
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  courseId: string;
  moduleId: string;
  selectedAnswer: string | string[];
  isCorrect: boolean;
  score: number;
  attemptedAt: string;
}

export interface LabSubmission {
  id: string;
  labId: string;
  courseId: string;
  studentId: string;
  repoUrl?: string;
  deployedUrl?: string;
  submittedCode?: string;
  screenshotUrls?: string[];
  reflection?: string;
  score?: number;
  feedback?: string;
  status: "draft" | "submitted" | "grading" | "passed" | "needs_revision";
  submittedAt?: string;
  gradedAt?: string;
}

export interface ProjectSubmission {
  id: string;
  projectId: string;
  courseId: string;
  studentId: string;
  repoUrl?: string;
  deployedUrl?: string;
  demoVideoUrl?: string;
  reflection?: string;
  score?: number;
  feedback?: string;
  status: "draft" | "submitted" | "grading" | "passed" | "needs_revision";
  submittedAt?: string;
  gradedAt?: string;
}

export interface EarnedCertificate {
  id: string;
  courseId: string;
  title: string;
  recipientName: string;
  issueDate: string;
  verificationId: string;
  cpdCredits: number;
  evidenceUrl?: string;
}

export interface LearnerProgress {
  studentId: string;
  studentName: string;
  activeCourseId?: string;
  completedLessonIds: string[];
  completedLabIds: string[];
  quizAttempts: QuizAttempt[];
  labSubmissions: LabSubmission[];
  projectSubmissions: ProjectSubmission[];
  certificates: EarnedCertificate[];
}

export interface SystemStatusItem {
  id: string;
  time: string;
  category: string;
  message: string;
  status: 'info' | 'success' | 'warning';
}

export interface RecommendedTrack {
  id: string;
  title: string;
  description: string;
  modulesCount: number;
  level: string;
  icon: string;
  category: string;
}

export interface ActiveBuild {
  id: string;
  title: string;
  description: string;
  repoUrl: string;
  status: 'STABLE_RELEASE' | 'EVAL_RUNNING';
  progressLabel: string;
  progressValue: number;
  complete: boolean;
}

export interface SkillNode {
  id: string;
  label: string;
  level: string;
  icon: string;
  x: number;
  y: number;
}

export interface EvalQueueItem {
  id: string;
  fileName: string;
  status: 'QUEUED' | 'RUNNING' | 'COMPLETED';
}

export interface GradeItem {
  id: string;
  courseCode: string;
  courseTitle: string;
  category: string;
  credits: number;
  quizScore: number;
  labScore: number;
  finalGrade: 'A+' | 'A' | 'A-' | 'B+' | 'B';
  status: 'COMPLETED' | 'IN_PROGRESS';
  term: string;
}

export interface TranscriptRecord {
  studentName: string;
  studentId: string;
  enrollmentDate: string;
  gpa: number;
  totalCredits: number;
  cpdPoints: number;
  verificationHash: string;
  grades: GradeItem[];
}

export interface Certificate {
  id: string;
  courseId: string;
  title: string;
  trackName: string;
  recipientName: string;
  issueDate: string;
  verificationId: string;
  badgeIcon: string;
  cpdCredits: number;
  instructorName: string;
  isUnlocked: boolean;
}
