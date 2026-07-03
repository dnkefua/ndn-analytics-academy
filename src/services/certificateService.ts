import { Course, EarnedCertificate, LearnerProgress } from '../types/academy';
import { calculateCourseGrade } from './gradingService';
import { awardCertificate } from './localProgressStore';

export interface CertificateEligibility {
  courseId: string;
  isEligible: boolean;
  quizAverage: number;
  minQuizAverage: number;
  quizPassed: boolean;
  labAverage: number;
  minLabAverage: number;
  labPassed: boolean;
  lessonPercent: number;
  minLessonPercent: number;
  lessonPassed: boolean;
  projectPassed: boolean;
  missingRequirements: string[];
}

export const checkCertificateEligibility = (course: Course, progress: LearnerProgress): CertificateEligibility => {
  const grade = calculateCourseGrade(course.id, progress);
  const rules = course.certificateRules;

  const quizPassed = grade.quizAverage >= rules.minQuizAverage;
  const labPassed = grade.labAverage >= rules.minLabAverage;
  const lessonPassed = grade.completionPercent >= rules.requiredLessonCompletionPercent;

  const projectSub = progress.projectSubmissions.find(p => p.courseId === course.id);
  const projectPassed = rules.requiresFinalProject ? (projectSub ? projectSub.status === 'passed' : false) : true;

  const missingRequirements: string[] = [];
  if (!quizPassed) missingRequirements.push(`Quiz average (${grade.quizAverage}%) is below required ${rules.minQuizAverage}%`);
  if (!labPassed) missingRequirements.push(`Lab average (${grade.labAverage}%) is below required ${rules.minLabAverage}%`);
  if (!lessonPassed) missingRequirements.push(`Lesson completion (${grade.completionPercent}%) is below required ${rules.requiredLessonCompletionPercent}%`);
  if (!projectPassed) missingRequirements.push(`Final capstone project not yet submitted or evaluated`);

  const isEligible = quizPassed && labPassed && lessonPassed && projectPassed;

  return {
    courseId: course.id,
    isEligible,
    quizAverage: grade.quizAverage,
    minQuizAverage: rules.minQuizAverage,
    quizPassed,
    labAverage: grade.labAverage,
    minLabAverage: rules.minLabAverage,
    labPassed,
    lessonPercent: grade.completionPercent,
    minLessonPercent: rules.requiredLessonCompletionPercent,
    lessonPassed,
    projectPassed,
    missingRequirements
  };
};

export const issueCertificateIfEligible = (course: Course, progress: LearnerProgress): EarnedCertificate | null => {
  const eligibility = checkCertificateEligibility(course, progress);
  if (!eligibility.isEligible) return null;

  const certId = `CERT-NDN-${course.code}-${progress.studentId.slice(-4)}`;
  const earned: EarnedCertificate = {
    id: certId,
    courseId: course.id,
    title: course.title,
    recipientName: progress.studentName,
    issueDate: new Date().toISOString().split('T')[0],
    verificationId: `NDN-HASH-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
    cpdCredits: course.cpdCredits,
    evidenceUrl: `/certificates/${certId}`
  };

  awardCertificate(earned);
  return earned;
};
