import { LearnerProgress, QuizAttempt, LabSubmission } from '../types/academy';

// Demo learner state: the Firebase & GCP course is fully completed (certificate
// unlockable for review), with early progress in the AI Engineering course.

const STUDENT_ID = "NDN-STU-2026-8801";

// All 21 Firebase course lessons complete + first two AI lessons
const FB_LESSON_IDS = Array.from({ length: 7 }, (_, m) =>
  Array.from({ length: 3 }, (_, l) => `les-fb-${m + 1}-${l + 1}`)
).flat();

const COMPLETED_LESSONS = [...FB_LESSON_IDS, "les-ai-1-1", "les-ai-1-2"];

// Best-attempt quiz record across all 7 Firebase module quizzes (avg ≈ 90%)
const FB_QUIZ_ATTEMPTS: QuizAttempt[] = Array.from({ length: 7 }, (_, m) =>
  Array.from({ length: 3 }, (_, q): QuizAttempt => {
    const questionId = `quiz-fb-${m + 1}-q${q + 1}`;
    const missed = questionId === "quiz-fb-3-q2" || questionId === "quiz-fb-6-q3";
    return {
      id: `qa-demo-${questionId}`,
      quizId: questionId,
      courseId: "course-firebase-gcp",
      moduleId: `mod-fb-${m + 1}`,
      selectedAnswer: missed ? "A" : "B",
      isCorrect: !missed,
      score: missed ? 0 : 100,
      attemptedAt: `2026-06-${String(10 + m).padStart(2, "0")}T10:30:00Z`
    };
  })
).flat();

// Graded lab submissions for all 7 Firebase labs (avg ≈ 91%)
const FB_LAB_SCORES = [95, 92, 88, 94, 90, 89, 93];
const FB_LAB_SUBMISSIONS: LabSubmission[] = FB_LAB_SCORES.map((score, i): LabSubmission => ({
  id: `lab-sub-demo-fb-${i + 1}`,
  labId: `lab-fb-${i + 1}`,
  courseId: "course-firebase-gcp",
  studentId: STUDENT_ID,
  repoUrl: "https://github.com/dnkefua/ndn-analytics-academy",
  submittedCode: `// Lab ${i + 1} submission — see repository for full implementation`,
  reflection: `Module ${i + 1} lab completed: implementation validated against the rubric with all evidence attached.`,
  score,
  feedback: "Meets NDN Analytics engineering standards. Clean structure, security posture verified.",
  status: "passed",
  submittedAt: `2026-06-${String(11 + i).padStart(2, "0")}T14:20:00Z`,
  gradedAt: `2026-06-${String(11 + i).padStart(2, "0")}T16:05:00Z`
}));

export const DEFAULT_DEMO_LEARNER: LearnerProgress = {
  studentId: STUDENT_ID,
  studentName: "MSc Desmond Nkefua",
  activeCourseId: "course-firebase-gcp",
  completedLessonIds: COMPLETED_LESSONS,
  completedLabIds: FB_LAB_SUBMISSIONS.map(l => l.labId),
  quizAttempts: FB_QUIZ_ATTEMPTS,
  labSubmissions: FB_LAB_SUBMISSIONS,
  projectSubmissions: [
    {
      id: "proj-sub-demo-fb",
      projectId: "proj-fb-capstone",
      courseId: "course-firebase-gcp",
      studentId: STUDENT_ID,
      repoUrl: "https://github.com/dnkefua/ndn-analytics-academy",
      deployedUrl: "https://ndn-analytics-academy.web.app",
      reflection: "Capstone delivered: real-time analytics dashboard on Firebase Auth + Firestore rules + Cloud Functions, deployed to App Hosting with Secret Manager bindings.",
      score: 92,
      feedback: "Excellent capstone. Real-time sync flawless; zero-trust rules unit-tested; CI/CD rollout green. Approved for certification.",
      status: "passed",
      submittedAt: "2026-06-28T09:00:00Z",
      gradedAt: "2026-06-30T11:00:00Z"
    }
  ],
  certificates: []
};
