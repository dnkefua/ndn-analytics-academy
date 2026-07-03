import { LearnerProgress } from '../types/academy';
import { COURSES } from '../data/courses';

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

  // Calculate Quiz Average for course
  const courseQuizzes = progress.quizAttempts.filter(q => q.courseId === courseId);
  const quizAverage = courseQuizzes.length > 0
    ? Math.round(courseQuizzes.reduce((sum, q) => sum + q.score, 0) / courseQuizzes.length)
    : 0;

  // Calculate Lab Average for course
  const courseLabs = progress.labSubmissions.filter(l => l.courseId === courseId);
  const labAverage = courseLabs.length > 0
    ? Math.round(courseLabs.reduce((sum, l) => sum + (l.score || 0), 0) / courseLabs.length)
    : 0;

  // Final Project Score
  const projectSub = progress.projectSubmissions.find(p => p.courseId === courseId);
  const finalProjectScore = projectSub && projectSub.score ? projectSub.score : 0;

  // Weighted calculation: 30% Quizzes, 40% Labs, 30% Final Project
  const finalScore = Math.round((quizAverage * 0.30) + (labAverage * 0.40) + (finalProjectScore * 0.30));

  let letterGrade: 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'C' | 'Needs Improvement' = 'Needs Improvement';
  if (finalScore >= 95) letterGrade = 'A+';
  else if (finalScore >= 90) letterGrade = 'A';
  else if (finalScore >= 85) letterGrade = 'A-';
  else if (finalScore >= 80) letterGrade = 'B+';
  else if (finalScore >= 75) letterGrade = 'B';
  else if (finalScore >= 70) letterGrade = 'C';

  const isPassed = finalScore >= 75;

  // Calculate Lesson Completion %
  const totalCourseLessons = 21; // ~3 lessons * 7 modules average
  const completedCourseLessons = progress.completedLessonIds.filter(id => id.startsWith(`les-${courseId.replace('course-', '')}`)).length;
  const completionPercent = Math.min(100, Math.round((completedCourseLessons / (totalCourseLessons || 1)) * 100));

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
