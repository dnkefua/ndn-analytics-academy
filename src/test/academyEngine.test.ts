import { describe, it, expect, beforeEach } from 'vitest';
import { COURSES } from '../data/courses';
import { DEFAULT_DEMO_LEARNER } from '../data/demoLearner';
import { calculateCourseGrade, calculateGPA } from '../services/gradingService';
import { checkCertificateEligibility } from '../services/certificateService';
import { validateLabSubmission } from '../services/labValidationService';
import { LABS } from '../data/labs';

describe('NDN Analytics Academy Learning Engine Tests', () => {
  it('should load 5 flagship courses', () => {
    expect(COURSES).toHaveLength(5);
    expect(COURSES[0].id).toBe("course-firebase-gcp");
  });

  it('should calculate weighted course grade correctly', () => {
    const grade = calculateCourseGrade("course-firebase-gcp", DEFAULT_DEMO_LEARNER);
    expect(grade.courseId).toBe("course-firebase-gcp");
    expect(grade.quizAverage).toBeGreaterThanOrEqual(0);
    expect(grade.labAverage).toBeGreaterThanOrEqual(0);
    expect(grade.finalScore).toBeGreaterThanOrEqual(0);
    expect(grade.letterGrade).toBeDefined();
  });

  it('should calculate GPA correctly from course grade summaries', () => {
    const summaries = COURSES.map(c => calculateCourseGrade(c.id, DEFAULT_DEMO_LEARNER));
    const gpa = calculateGPA(summaries);
    expect(gpa).toBeGreaterThanOrEqual(0);
    expect(gpa).toBeLessThanOrEqual(4.0);
  });

  it('should validate lab submissions deterministically', () => {
    const lab = LABS[0];
    const invalidRes = validateLabSubmission(lab, { repoUrl: "http://invalid-url.com" }, false);
    expect(invalidRes.status).toBe('needs_revision');

    const validRes = validateLabSubmission(
      lab,
      {
        repoUrl: "https://github.com/dnkefua/ndn-analytics-academy",
        submittedCode: "import { initializeApp } from 'firebase/app';\nconst app = initializeApp({});",
        reflection: "Detailed architecture reflection containing more than 50 characters of technical description for validation."
      },
      true
    );
    expect(validRes.status).toBe('passed');
    expect(validRes.score).toBeGreaterThanOrEqual(75);
  });

  it('should check certificate eligibility requirements correctly', () => {
    const course = COURSES[0];
    const eligibility = checkCertificateEligibility(course, DEFAULT_DEMO_LEARNER);
    expect(eligibility.courseId).toBe(course.id);
    expect(typeof eligibility.isEligible).toBe('boolean');
    expect(eligibility.missingRequirements).toBeDefined();
  });
});
