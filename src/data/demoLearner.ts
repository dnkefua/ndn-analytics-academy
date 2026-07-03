import { LearnerProgress } from '../types/academy';

export const DEFAULT_DEMO_LEARNER: LearnerProgress = {
  studentId: "NDN-STU-2026-8801",
  studentName: "MSc Desmond Nkefua",
  activeCourseId: "course-firebase-gcp",
  completedLessonIds: ["les-fb-1-1", "les-fb-1-2"],
  completedLabIds: ["lab-fb-1"],
  quizAttempts: [
    {
      id: "qa-101",
      quizId: "quiz-fb-1",
      courseId: "course-firebase-gcp",
      moduleId: "mod-fb-1",
      selectedAnswer: "B",
      isCorrect: true,
      score: 100,
      attemptedAt: "2026-07-01T10:30:00Z"
    }
  ],
  labSubmissions: [
    {
      id: "lab-sub-1",
      labId: "lab-fb-1",
      courseId: "course-firebase-gcp",
      studentId: "NDN-STU-2026-8801",
      repoUrl: "https://github.com/dnkefua/ndn-analytics-academy",
      submittedCode: "import { initializeApp } from 'firebase/app';\nimport { getFirestore } from 'firebase/firestore';\nconst config = { projectId: 'ndn-analytics-academy' };\nexport const app = initializeApp(config);\nexport const db = getFirestore(app);",
      reflection: "Integrated Firebase app singleton pattern with TypeScript types and validated environment variable imports cleanly.",
      score: 95,
      feedback: "Excellent singleton pattern implementation! Security and configuration structure meets NDN Analytics standards.",
      status: "passed",
      submittedAt: "2026-07-02T14:20:00Z",
      gradedAt: "2026-07-02T14:21:00Z"
    }
  ],
  projectSubmissions: [],
  certificates: []
};
