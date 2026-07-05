import React, { useMemo, useState } from 'react';
import { LearnerProgress } from '../types/academy';
import { COURSES } from '../data/courses';
import { MODULES } from '../data/modules';
import { getQuizQuestions } from '../data/quizzes';
import {
  HelpCircle, CheckCircle, RotateCcw, Play, ChevronDown, ChevronRight,
  Award, Target, TrendingUp, ClipboardList, Lock
} from 'lucide-react';

interface AssessmentsHubProps {
  learnerProgress: LearnerProgress;
  onOpenQuiz: (quizGroupId: string) => void;
}

type QuizStatus = 'not_started' | 'in_progress' | 'passed' | 'retake';

interface ModuleQuizStat {
  moduleId: string;
  moduleTitle: string;
  order: number;
  groupId: string;
  total: number;
  answered: number;
  score: number;
  attempts: number;
  status: QuizStatus;
}

const PASS_MARK = 75;

const STATUS_META: Record<QuizStatus, { label: string; cls: string; dot: string }> = {
  not_started: { label: 'Not started', cls: 'text-slate-400 bg-slate-800/60 border-slate-700', dot: 'bg-slate-500' },
  in_progress: { label: 'In progress', cls: 'text-amber-300 bg-amber-500/10 border-amber-500/30', dot: 'bg-amber-400' },
  passed: { label: 'Passed', cls: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30', dot: 'bg-emerald-400' },
  retake: { label: 'Retake', cls: 'text-rose-300 bg-rose-500/10 border-rose-500/30', dot: 'bg-rose-400' },
};

const computeModuleStat = (
  moduleId: string, moduleTitle: string, order: number, groupId: string, progress: LearnerProgress
): ModuleQuizStat => {
  const questions = getQuizQuestions(groupId);
  const total = questions.length;

  // Best score per question id from recorded attempts
  const bestByQuestion = new Map<string, number>();
  let attempts = 0;
  progress.quizAttempts
    .filter(a => a.quizId === groupId || a.quizId.startsWith(`${groupId}-`))
    .forEach(a => {
      attempts++;
      const prev = bestByQuestion.get(a.quizId) ?? -1;
      if (a.score > prev) bestByQuestion.set(a.quizId, a.score);
    });

  const answered = questions.filter(q => bestByQuestion.has(q.id)).length;
  const score = answered > 0
    ? Math.round(questions.reduce((sum, q) => sum + (bestByQuestion.get(q.id) ?? 0), 0) / answered)
    : 0;

  let status: QuizStatus = 'not_started';
  if (answered === 0) status = 'not_started';
  else if (answered < total) status = 'in_progress';
  else status = score >= PASS_MARK ? 'passed' : 'retake';

  return { moduleId, moduleTitle, order, groupId, total, answered, score, attempts, status };
};

export const AssessmentsHub: React.FC<AssessmentsHubProps> = ({ learnerProgress, onOpenQuiz }) => {
  const [expanded, setExpanded] = useState<string>(
    learnerProgress.activeCourseId || COURSES[0]?.id || ''
  );

  const courseStats = useMemo(() => {
    return COURSES.map(course => {
      const modules = MODULES
        .filter(m => m.courseId === course.id)
        .sort((a, b) => a.order - b.order);
      const quizzes: ModuleQuizStat[] = modules
        .filter(m => m.quizIds && m.quizIds.length > 0)
        .map(m => computeModuleStat(m.id, m.title, m.order, m.quizIds[0], learnerProgress));
      return { course, quizzes };
    });
  }, [learnerProgress]);

  // Global stats
  const allQuizzes = courseStats.flatMap(c => c.quizzes);
  const totalQuizzes = allQuizzes.length;
  const attemptedList = allQuizzes.filter(q => q.answered > 0);
  const passedCount = allQuizzes.filter(q => q.status === 'passed').length;
  const overallAvg = attemptedList.length > 0
    ? Math.round(attemptedList.reduce((s, q) => s + q.score, 0) / attemptedList.length)
    : 0;

  return (
    <div className="space-y-8 animate-fade-in text-slate-100 pb-16">
      {/* Header */}
      <div className="relative rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 p-8 overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            <ClipboardList className="w-3.5 h-3.5" />
            <span>Technical Assessment Center</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
            Module Evaluations
          </h1>
          <p className="text-base text-slate-300 leading-relaxed max-w-3xl">
            Every module has a graded evaluation quiz. Score {PASS_MARK}%+ on each to satisfy your certificate's
            quiz-average requirement. Pick any module below to begin — you can retake as many times as you like;
            your best result counts.
          </p>
        </div>
      </div>

      {/* Global stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: ClipboardList, label: 'Total Evaluations', value: `${totalQuizzes}`, color: 'text-cyan-400' },
          { icon: TrendingUp, label: 'Attempted', value: `${attemptedList.length}/${totalQuizzes}`, color: 'text-indigo-400' },
          { icon: CheckCircle, label: 'Passed', value: `${passedCount}`, color: 'text-emerald-400' },
          { icon: Award, label: 'Average Score', value: attemptedList.length ? `${overallAvg}%` : '—', color: 'text-amber-400' },
        ].map((s, i) => (
          <div key={i} className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{s.label}</span>
              <s.icon className={`w-4 h-4 ${s.color}`} />
            </div>
            <div className={`text-2xl font-extrabold font-display mt-2 ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Courses with module quizzes */}
      <div className="space-y-4">
        {courseStats.map(({ course, quizzes }) => {
          const isOpen = expanded === course.id;
          const coursePassed = quizzes.filter(q => q.status === 'passed').length;
          const courseAttempted = quizzes.filter(q => q.answered > 0);
          const courseAvg = courseAttempted.length
            ? Math.round(courseAttempted.reduce((s, q) => s + q.score, 0) / courseAttempted.length)
            : 0;

          return (
            <div key={course.id} className="rounded-2xl bg-slate-900/70 border border-slate-800 shadow-lg overflow-hidden">
              {/* Course header row */}
              <button
                onClick={() => setExpanded(isOpen ? '' : course.id)}
                className="w-full flex items-center justify-between p-5 hover:bg-slate-900 transition-all cursor-pointer text-left"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  {isOpen ? <ChevronDown className="w-5 h-5 text-cyan-400 shrink-0" /> : <ChevronRight className="w-5 h-5 text-slate-500 shrink-0" />}
                  <div className="min-w-0">
                    <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">{course.code}</span>
                    <h3 className="text-base font-bold text-white font-display truncate">{course.title}</h3>
                  </div>
                </div>
                <div className="flex items-center space-x-4 shrink-0 pl-3">
                  <div className="text-right hidden sm:block">
                    <span className="block text-[10px] text-slate-500 uppercase tracking-wider">Quizzes Passed</span>
                    <span className="block text-sm font-bold text-white">{coursePassed}/{quizzes.length}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] text-slate-500 uppercase tracking-wider">Avg</span>
                    <span className={`block text-sm font-bold ${courseAvg >= PASS_MARK ? 'text-emerald-400' : courseAttempted.length ? 'text-amber-400' : 'text-slate-500'}`}>
                      {courseAttempted.length ? `${courseAvg}%` : '—'}
                    </span>
                  </div>
                </div>
              </button>

              {/* Module quiz list */}
              {isOpen && (
                <div className="border-t border-slate-800 divide-y divide-slate-800/70">
                  {quizzes.map((q) => {
                    const meta = STATUS_META[q.status];
                    const started = q.answered > 0;
                    return (
                      <div key={q.moduleId} className="flex items-center justify-between gap-4 p-4 hover:bg-slate-950/40 transition-all">
                        <div className="flex items-center space-x-3 min-w-0">
                          <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
                            <HelpCircle className="w-4 h-4 text-indigo-400" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-white truncate">{q.moduleTitle}</p>
                            <p className="text-[11px] text-slate-500">
                              {q.total} questions
                              {started && ` · answered ${q.answered}/${q.total}`}
                              {q.attempts > 0 && ` · ${q.attempts} attempt${q.attempts === 1 ? '' : 's'}`}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 shrink-0">
                          {/* Score */}
                          {started && (
                            <div className="text-right hidden sm:block">
                              <span className="block text-[10px] text-slate-500 uppercase tracking-wider">Best</span>
                              <span className={`block text-sm font-bold ${q.score >= PASS_MARK ? 'text-emerald-400' : 'text-amber-400'}`}>
                                {q.score}%
                              </span>
                            </div>
                          )}
                          {/* Status pill */}
                          <span className={`hidden md:inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${meta.cls}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                            <span>{meta.label}</span>
                          </span>
                          {/* Action */}
                          <button
                            onClick={() => onOpenQuiz(q.groupId)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer shadow-md ${
                              q.status === 'passed'
                                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                                : q.status === 'retake'
                                ? 'bg-rose-500/90 hover:bg-rose-400 text-white'
                                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                            }`}
                          >
                            {q.status === 'not_started' && <><Play className="w-3.5 h-3.5" /><span>Start</span></>}
                            {q.status === 'in_progress' && <><Play className="w-3.5 h-3.5" /><span>Resume</span></>}
                            {q.status === 'passed' && <><RotateCcw className="w-3.5 h-3.5" /><span>Retake</span></>}
                            {q.status === 'retake' && <><RotateCcw className="w-3.5 h-3.5" /><span>Retake</span></>}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  {quizzes.length === 0 && (
                    <div className="p-6 text-center text-sm text-slate-500 flex items-center justify-center gap-2">
                      <Lock className="w-4 h-4" /> No evaluations configured for this course yet.
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
