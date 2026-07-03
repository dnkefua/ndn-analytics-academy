import { LearnerProgress } from '../types/academy';
import { COURSES } from '../data/courses';
import { LESSONS } from '../data/lessons';

export interface CourseGradeSummary {
  courseId: string;
  courseTitle: string;
  quizAverage: number;
  labAverage: number;
  finalProjectScore: number;
  finalScore: number;
  letterGrade: 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'C' | 'Needs Improvement';
  isPassed: boolean;
  completionPercent: number;
}

export const calculateCourseGrade = (courseId: string, progress: LearnerProgress): CourseGradeSummary => {
  const course = COURSES.find(c => c.id === courseId);
  const title = course ? course.title : "Course";

  // Quiz average: best attempt per question, averaged across attempted questions
  const courseQuizzes = progress.quizAttempts.filter(q => q.courseId === courseId);
  const bestByQuestion = new Map<string, number>();
  courseQuizzes.forEach(a => {
    const prev = bestByQuestion.get(a.quizId) ?? 0;
    if (a.score >= prev) bestByQuestion.set(a.quizId, a.score);
  });
  const quizScores = [...bestByQuestion.values()];
  const quizAverage = quizScores.length > 0
    ? Math.round(quizScores.reduce((sum, s) => sum + s, 0) / quizScores.length)
    : 0;

  // Lab average: latest submission per lab
  const courseLabs = progress.labSubmissions.filter(l => l.courseId === courseId);
  const labAverage = courseLabs.length > 0
    ? Math.round(courseLabs.reduce((sum, l) => sum + (l.score || 0), 0) / courseLabs.length)
    : 0;

  // Final project score
  const projectSub = progress.projectSubmissions.find(p => p.courseId === courseId);
  const finalProjectScore = projectSub && projectSub.score ? projectSub.score : 0;

  // Weighted: 30% quizzes, 40% labs, 30% final project
  const finalScore = Math.round((quizAverage * 0.30) + (labAverage * 0.40) + (finalProjectScore * 0.30));

  let letterGrade: CourseGradeSummary['letterGrade'] = 'Needs Improvement';
  if (finalScore >= 95) letterGrade = 'A+';
  else if (finalScore >= 90) letterGrade = 'A';
  else if (finalScore >= 85) letterGrade = 'A-';
  else if (finalScore >= 80) letterGrade = 'B+';
  else if (finalScore >= 75) letterGrade = 'B';
  else if (finalScore >= 70) letterGrade = 'C';

  const isPassed = finalScore >= 75;

  // Lesson completion % against the actual curriculum
  const courseLessonIds = LESSONS.filter(l => l.courseId === courseId).map(l => l.id);
  const completedCourseLessons = progress.completedLessonIds.filter(id => courseLessonIds.includes(id)).length;
  const completionPercent = courseLessonIds.length > 0
    ? Math.min(100, Math.round((completedCourseLessons / courseLessonIds.length) * 100))
    : 0;

  return {
    courseId,
    courseTitle: title,
    quizAverage,
    labAverage,
    finalProjectScore,
    finalScore,
    letterGrade,
    isPassed,
    completionPercent
  };
};

export const calculateGPA = (summaries: CourseGradeSummary[]): number => {
  if (summaries.length === 0) return 4.0;
  const gradePointsMap: Record<string, number> = {
    'A+': 4.0,
    'A': 4.0,
    'A-': 3.7,
    'B+': 3.3,
    'B': 3.0,
    'C': 2.0,
    'Needs Improvement': 0.0
  };
  const totalPoints = summaries.reduce((sum, s) => sum + (gradePointsMap[s.letterGrade] || 0), 0);
  return Number((totalPoints / summaries.length).toFixed(2));
};
