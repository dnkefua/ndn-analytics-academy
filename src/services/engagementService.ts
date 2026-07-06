import { LearnerProgress } from '../types/academy';

// Engagement layer: XP, levels, and streaks.
// XP is DERIVED from recorded progress (never stored), so it can't drift out of sync.
// Design informed by Khan Academy's energy points and Duolingo's streak mechanics.

export const XP_RULES = {
  lessonCompleted: 10,
  quizQuestionCorrect: 5,
  labPassed: 25,
  projectPassed: 100,
  certificateEarned: 150,
} as const;

export interface LevelInfo {
  level: number;
  title: string;
  totalXP: number;
  xpIntoLevel: number;
  xpForNextLevel: number;
  progressPct: number;
}

export interface StreakInfo {
  current: number;
  activeToday: boolean;
  /** Last 7 days, oldest first — true where the learner was active. */
  week: { date: string; active: boolean; label: string }[];
}

const LEVEL_TITLES = [
  'Newcomer',      // 1
  'Learner',       // 2
  'Builder',       // 3
  'Practitioner',  // 4
  'Engineer',      // 5
  'Specialist',    // 6
  'Architect',     // 7
  'Expert',        // 8
  'Master',        // 9
  'Luminary',      // 10+
];

const isoDate = (d: Date): string => d.toISOString().split('T')[0];

export const computeXP = (progress: LearnerProgress): number => {
  const lessonXP = progress.completedLessonIds.length * XP_RULES.lessonCompleted;

  // Best attempt per question is what's stored; each fully-correct question earns XP once.
  const correctQuestions = progress.quizAttempts.filter(a => a.score >= 100).length;
  const quizXP = correctQuestions * XP_RULES.quizQuestionCorrect;

  const labXP = progress.labSubmissions.filter(l => l.status === 'passed').length * XP_RULES.labPassed;
  const projectXP = progress.projectSubmissions.filter(p => p.status === 'passed').length * XP_RULES.projectPassed;
  const certXP = progress.certificates.length * XP_RULES.certificateEarned;

  return lessonXP + quizXP + labXP + projectXP + certXP;
};

// Quadratic level curve: total XP required to REACH level n is 60·(n−1)².
// L2 at 60, L3 at 240, L4 at 540, L5 at 960 … climbs steadily with the curriculum.
const xpToReachLevel = (level: number): number => 60 * (level - 1) * (level - 1);

export const computeLevel = (progress: LearnerProgress): LevelInfo => {
  const totalXP = computeXP(progress);
  let level = 1;
  while (totalXP >= xpToReachLevel(level + 1)) level++;

  const floor = xpToReachLevel(level);
  const ceiling = xpToReachLevel(level + 1);
  const xpIntoLevel = totalXP - floor;
  const xpForNextLevel = ceiling - floor;

  return {
    level,
    title: LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)],
    totalXP,
    xpIntoLevel,
    xpForNextLevel,
    progressPct: Math.min(100, Math.round((xpIntoLevel / xpForNextLevel) * 100)),
  };
};

export const computeStreak = (progress: LearnerProgress): StreakInfo => {
  const dates = new Set(progress.activityDates ?? []);
  const today = new Date();
  const todayStr = isoDate(today);
  const activeToday = dates.has(todayStr);

  // Count consecutive active days ending today (or yesterday, so the streak
  // isn't shown as broken before the learner has studied today).
  let current = 0;
  const cursor = new Date(today);
  if (!activeToday) cursor.setDate(cursor.getDate() - 1); // grace: start from yesterday
  while (dates.has(isoDate(cursor))) {
    current++;
    cursor.setDate(cursor.getDate() - 1);
  }

  const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const week: StreakInfo['week'] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const ds = isoDate(d);
    week.push({ date: ds, active: dates.has(ds), label: dayLabels[d.getDay()] });
  }

  return { current, activeToday, week };
};
