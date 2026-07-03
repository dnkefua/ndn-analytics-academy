import { Lesson } from '../types/academy';
import { FIREBASE_LESSONS } from './lessons/firebaseLessons';
import { GCP_LESSONS } from './lessons/gcpLessons';
import { MOBILE_LESSONS } from './lessons/mobileLessons';
import { AI_LESSONS } from './lessons/aiLessons';
import { DATA_LESSONS } from './lessons/dataLessons';

// Full academy curriculum: 5 courses × (6–7 modules × 3 lessons) = 96 lessons
export const LESSONS: Lesson[] = [
  ...FIREBASE_LESSONS,
  ...GCP_LESSONS,
  ...MOBILE_LESSONS,
  ...AI_LESSONS,
  ...DATA_LESSONS,
];
