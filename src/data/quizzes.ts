import { QuizQuestion } from '../types/academy';
import { FIREBASE_QUIZZES } from './quizzes/firebaseQuizzes';
import { GCP_QUIZZES } from './quizzes/gcpQuizzes';
import { MOBILE_QUIZZES } from './quizzes/mobileQuizzes';
import { AI_QUIZZES } from './quizzes/aiQuizzes';
import { DATA_QUIZZES } from './quizzes/dataQuizzes';

// Full assessment bank: 32 module quizzes × 3 questions = 96 questions.
// Question ids are "<quizGroupId>-q<n>"; a module's quiz group id (e.g. "quiz-fb-1")
// collects every question whose id starts with it.
export const QUIZZES: QuizQuestion[] = [
  ...FIREBASE_QUIZZES,
  ...GCP_QUIZZES,
  ...MOBILE_QUIZZES,
  ...AI_QUIZZES,
  ...DATA_QUIZZES,
];

export const getQuizQuestions = (quizGroupId: string): QuizQuestion[] =>
  QUIZZES.filter(q => q.id === quizGroupId || q.id.startsWith(`${quizGroupId}-`));
