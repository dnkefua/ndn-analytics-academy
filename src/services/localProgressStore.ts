import { LearnerProgress, QuizAttempt, LabSubmission, ProjectSubmission, EarnedCertificate } from '../types/academy';
import { DEFAULT_DEMO_LEARNER } from '../data/demoLearner';

const STORAGE_KEY = "ndn-academy-demo-progress-v2";

export const getProgress = (): LearnerProgress => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn("Failed to load local progress store:", e);
  }
  return DEFAULT_DEMO_LEARNER;
};

export const saveProgress = (progress: LearnerProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error("Failed to save progress to localStorage:", e);
  }
};

export const resetDemoProgress = (): LearnerProgress => {
  saveProgress(DEFAULT_DEMO_LEARNER);
  return DEFAULT_DEMO_LEARNER;
};

export const markLessonComplete = (lessonId: string): LearnerProgress => {
  const current = getProgress();
  if (!current.completedLessonIds.includes(lessonId)) {
    const updated: LearnerProgress = {
      ...current,
      completedLessonIds: [...current.completedLessonIds, lessonId]
    };
    saveProgress(updated);
    return updated;
  }
  return current;
};

export const setActiveCourse = (courseId: string): LearnerProgress => {
  const current = getProgress();
  const updated: LearnerProgress = {
    ...current,
    activeCourseId: courseId
  };
  saveProgress(updated);
  return updated;
};

export const recordQuizAttempt = (attempt: QuizAttempt): LearnerProgress => {
  const current = getProgress();
  const filteredAttempts = current.quizAttempts.filter(a => a.quizId !== attempt.quizId);
  const updated: LearnerProgress = {
    ...current,
    quizAttempts: [...filteredAttempts, attempt]
  };
  saveProgress(updated);
  return updated;
};

export const saveLabSubmission = (submission: LabSubmission): LearnerProgress => {
  const current = getProgress();
  const filteredLabs = current.labSubmissions.filter(s => s.labId !== submission.labId);
  const completedLabs = submission.status === 'passed' && !current.completedLabIds.includes(submission.labId)
    ? [...current.completedLabIds, submission.labId]
    : current.completedLabIds;

  const updated: LearnerProgress = {
    ...current,
    labSubmissions: [...filteredLabs, submission],
    completedLabIds: completedLabs
  };
  saveProgress(updated);
  return updated;
};

export const saveProjectSubmission = (submission: ProjectSubmission): LearnerProgress => {
  const current = getProgress();
  const filteredProjects = current.projectSubmissions.filter(s => s.projectId !== submission.projectId);
  const updated: LearnerProgress = {
    ...current,
    projectSubmissions: [...filteredProjects, submission]
  };
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
