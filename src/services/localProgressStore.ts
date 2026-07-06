import { LearnerProgress, QuizAttempt, LabSubmission, ProjectSubmission, EarnedCertificate } from '../types/academy';
import { DEFAULT_DEMO_LEARNER } from '../data/demoLearner';

const STORAGE_KEY = "ndn-academy-demo-progress-v2";

const todayISO = (): string => new Date().toISOString().split('T')[0];

/** Ensure fields added after a learner's progress was first saved exist. */
const withDefaults = (progress: LearnerProgress): LearnerProgress => ({
  ...progress,
  activityDates: progress.activityDates ?? [],
  lastLessonByCourse: progress.lastLessonByCourse ?? {},
});

/** Record that the learner did something today — powers the streak. */
const touchActivity = (progress: LearnerProgress): LearnerProgress => {
  const today = todayISO();
  const dates = progress.activityDates ?? [];
  if (dates.includes(today)) return progress;
  return { ...progress, activityDates: [...dates, today] };
};

export const getProgress = (): LearnerProgress => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return withDefaults(JSON.parse(saved));
    }
  } catch (e) {
    console.warn("Failed to load local progress store:", e);
  }
  return withDefaults(DEFAULT_DEMO_LEARNER);
};

export const saveProgress = (progress: LearnerProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error("Failed to save progress to localStorage:", e);
  }
};

export const resetDemoProgress = (): LearnerProgress => {
  const fresh = withDefaults(DEFAULT_DEMO_LEARNER);
  saveProgress(fresh);
  return fresh;
};

export const markLessonComplete = (lessonId: string): LearnerProgress => {
  const current = getProgress();
  if (!current.completedLessonIds.includes(lessonId)) {
    const updated: LearnerProgress = touchActivity({
      ...current,
      completedLessonIds: [...current.completedLessonIds, lessonId]
    });
    saveProgress(updated);
    return updated;
  }
  return current;
};

export const setActiveCourse = (courseId: string): LearnerProgress => {
  const current = getProgress();
  const updated: LearnerProgress = touchActivity({
    ...current,
    activeCourseId: courseId
  });
  saveProgress(updated);
  return updated;
};

/** Remember the learner's position in a course so they can resume where they left off. */
export const setLastLesson = (courseId: string, lessonId: string): LearnerProgress => {
  const current = getProgress();
  const updated: LearnerProgress = {
    ...current,
    lastLessonByCourse: { ...(current.lastLessonByCourse ?? {}), [courseId]: lessonId }
  };
  saveProgress(updated);
  return updated;
};

export const recordQuizAttempt = (attempt: QuizAttempt): LearnerProgress => {
  const current = getProgress();
  // Keep the learner's BEST attempt per question: a retake can add a new best,
  // but can never lower a previously earned score.
  const existing = current.quizAttempts.find(a => a.quizId === attempt.quizId);
  const keep = existing && existing.score > attempt.score ? existing : attempt;
  const filteredAttempts = current.quizAttempts.filter(a => a.quizId !== attempt.quizId);
  const updated: LearnerProgress = touchActivity({
    ...current,
    quizAttempts: [...filteredAttempts, keep]
  });
  saveProgress(updated);
  return updated;
};

export const saveLabSubmission = (submission: LabSubmission): LearnerProgress => {
  const current = getProgress();
  const filteredLabs = current.labSubmissions.filter(s => s.labId !== submission.labId);
  const completedLabs = submission.status === 'passed' && !current.completedLabIds.includes(submission.labId)
    ? [...current.completedLabIds, submission.labId]
    : current.completedLabIds;

  const updated: LearnerProgress = touchActivity({
    ...current,
    labSubmissions: [...filteredLabs, submission],
    completedLabIds: completedLabs
  });
  saveProgress(updated);
  return updated;
};

export const saveProjectSubmission = (submission: ProjectSubmission): LearnerProgress => {
  const current = getProgress();
  const filteredProjects = current.projectSubmissions.filter(s => s.projectId !== submission.projectId);
  const updated: LearnerProgress = touchActivity({
    ...current,
    projectSubmissions: [...filteredProjects, submission]
  });
  saveProgress(updated);
  return updated;
};

export const awardCertificate = (cert: EarnedCertificate): LearnerProgress => {
  const current = getProgress();
  if (!current.certificates.some(c => c.courseId === cert.courseId)) {
    const updated: LearnerProgress = {
      ...current,
      certificates: [...current.certificates, cert]
    };
    saveProgress(updated);
    return updated;
  }
  return current;
};
