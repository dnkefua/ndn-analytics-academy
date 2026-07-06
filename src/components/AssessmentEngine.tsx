import React, { useMemo, useState } from 'react';
import { QuizQuestion, QuizAttempt } from '../types/academy';
import { QUIZZES, getQuizQuestions } from '../data/quizzes';
import { MODULES } from '../data/modules';
import { COURSES } from '../data/courses';
import { HelpCircle, CheckCircle, XCircle, RefreshCw, Award, ArrowRight, ArrowLeft, Target } from 'lucide-react';

interface AssessmentEngineProps {
  quizId?: string;
  /** Explicit question set — used by Smart Review to practice previously missed questions. */
  questionIds?: string[];
  onRecordAttempt: (attempt: QuizAttempt) => void;
  onBackToSyllabus: () => void;
}

// Fisher–Yates shuffle: varied question order between retakes strengthens
// retrieval practice (interleaving) and prevents answer-position memorization.
const shuffle = <T,>(arr: T[]): T[] => {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};

interface QuestionResult {
  question: QuizQuestion;
  selected: string[];
  correct: boolean;
}

export const AssessmentEngine: React.FC<AssessmentEngineProps> = ({
  quizId,
  questionIds,
  onRecordAttempt,
  onBackToSyllabus,
}) => {
  const isReview = !!questionIds && questionIds.length > 0;

  const questions = useMemo(() => {
    if (isReview) {
      const byId = new Map(QUIZZES.map(q => [q.id, q]));
      const set = questionIds!.map(id => byId.get(id)).filter((q): q is QuizQuestion => !!q);
      return shuffle(set);
    }
    const set = quizId ? getQuizQuestions(quizId) : [];
    return shuffle(set.length > 0 ? set : QUIZZES.slice(0, 3));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizId, questionIds]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<QuestionResult[]>([]);
  const [finished, setFinished] = useState(false);

  const currentQuiz = questions[currentIndex];
  const isMultiSelect = currentQuiz.type === 'multi_select';
  const module = MODULES.find(m => m.id === currentQuiz.moduleId);
  const course = COURSES.find(c => c.id === currentQuiz.courseId);
  const isLast = currentIndex === questions.length - 1;

  const toggleOption = (key: string) => {
    if (submitted) return;
    if (isMultiSelect) {
      setSelectedAnswers(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
    } else {
      setSelectedAnswers([key]);
    }
  };

  const isCorrect = (quiz: QuizQuestion, selected: string[]) => {
    const correctArr = Array.isArray(quiz.correctAnswer) ? quiz.correctAnswer : [quiz.correctAnswer];
    if (quiz.type === 'multi_select') {
      return selected.length === correctArr.length && selected.every(k => correctArr.includes(k));
    }
    return selected[0] === correctArr[0];
  };

  const handleSubmit = () => {
    if (selectedAnswers.length === 0) return;
    setSubmitted(true);

    const correct = isCorrect(currentQuiz, selectedAnswers);
    onRecordAttempt({
      id: `qa-${Date.now()}-${currentQuiz.id}`,
      quizId: currentQuiz.id,
      courseId: currentQuiz.courseId,
      moduleId: currentQuiz.moduleId,
      selectedAnswer: isMultiSelect ? selectedAnswers : selectedAnswers[0],
      isCorrect: correct,
      score: correct ? 100 : 0,
      attemptedAt: new Date().toISOString()
    });
    setResults(prev => [...prev, { question: currentQuiz, selected: selectedAnswers, correct }]);
  };

  const handleNext = () => {
    if (isLast) {
      setFinished(true);
    } else {
      setCurrentIndex(i => i + 1);
      setSelectedAnswers([]);
      setSubmitted(false);
    }
  };

  const handleRetakeAll = () => {
    setCurrentIndex(0);
    setSelectedAnswers([]);
    setSubmitted(false);
    setResults([]);
    setFinished(false);
  };

  // ─── Results screen ───
  if (finished) {
    const correctCount = results.filter(r => r.correct).length;
    const pct = Math.round((correctCount / results.length) * 100);
    const passed = pct >= 75;

    return (
      <div className="max-w-3xl mx-auto space-y-6 animate-fade-in text-slate-100 pb-16">
        <div className={`rounded-2xl border p-8 text-center space-y-4 shadow-xl ${
          passed ? 'bg-emerald-950/30 border-emerald-500/40' : 'bg-slate-900/90 border-amber-500/40'
        }`}>
          <div className="flex justify-center">
            <div className={`p-4 rounded-2xl ${passed ? 'bg-emerald-500/20' : 'bg-amber-500/20'}`}>
              {passed ? <Award className="w-10 h-10 text-emerald-400" /> : <Target className="w-10 h-10 text-amber-400" />}
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-extrabold font-display text-white">{pct}%</h1>
            <p className="text-sm text-slate-300 mt-1">
              {correctCount} of {results.length} correct — {isReview ? 'Smart Review session' : module?.title}
            </p>
          </div>
          <p className={`text-sm font-bold ${passed ? 'text-emerald-400' : 'text-amber-400'}`}>
            {passed
              ? 'Module evaluation passed. Scores recorded to your transcript.'
              : 'Below the 75% pass bar — review the explanations below and retake when ready.'}
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={handleRetakeAll}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all flex items-center space-x-2 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retake Quiz</span>
            </button>
            <button
              onClick={onBackToSyllabus}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all flex items-center space-x-2 cursor-pointer shadow-md"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Done — Back to Assessments</span>
            </button>
          </div>
        </div>

        {/* Per-question review */}
        <div className="space-y-3">
          {results.map((r, idx) => (
            <div key={r.question.id} className={`rounded-xl border p-4 space-y-2 ${
              r.correct ? 'bg-emerald-950/20 border-emerald-500/20' : 'bg-rose-950/20 border-rose-500/20'
            }`}>
              <div className="flex items-start space-x-3">
                {r.correct
                  ? <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  : <XCircle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />}
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-200">Q{idx + 1}. {r.question.question}</p>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{r.question.explanation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ─── Question screen ───
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in text-slate-100 pb-16">
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
        {/* Header + progress */}
        <div className="space-y-3 border-b border-slate-800 pb-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center space-x-1.5">
                <HelpCircle className="w-4 h-4" />
                <span>{isReview ? `Smart Review · ${course?.code} — ${module?.title}` : `${course?.code} — ${module?.title}`}</span>
              </span>
              <h1 className="text-xl font-bold text-white font-display">
                {isReview ? 'Smart Review' : 'Module Evaluation'} — Question {currentIndex + 1} of {questions.length}
              </h1>
            </div>
            <div className="flex flex-col items-end space-y-1">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {currentQuiz.difficulty.toUpperCase()}
              </span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                {currentQuiz.type.replace(/_/g, ' ')}
              </span>
            </div>
          </div>
          {/* Progress bar */}
          <div className="flex space-x-1.5">
            {questions.map((q, idx) => {
              const result = results[idx];
              return (
                <div
                  key={q.id}
                  className={`h-1.5 flex-1 rounded-full transition-all ${
                    result ? (result.correct ? 'bg-emerald-500' : 'bg-rose-500')
                      : idx === currentIndex ? 'bg-cyan-500' : 'bg-slate-800'
                  }`}
                />
              );
            })}
          </div>
        </div>

        <p className="text-sm text-slate-200 leading-relaxed font-medium">{currentQuiz.question}</p>

        {currentQuiz.codeSnippet && (
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto">
            <pre>{currentQuiz.codeSnippet}</pre>
          </div>
        )}

        {isMultiSelect && !submitted && (
          <p className="text-[11px] text-amber-400/90 font-semibold">Select ALL answers that apply.</p>
        )}

        {/* Options */}
        <div className="space-y-3 pt-1">
          {currentQuiz.options.map((opt) => {
            const isSelected = selectedAnswers.includes(opt.key);
            let optionStyle = "border-slate-800 bg-slate-950 hover:border-slate-600 text-slate-300";

            if (submitted) {
              const correctArr = Array.isArray(currentQuiz.correctAnswer) ? currentQuiz.correctAnswer : [currentQuiz.correctAnswer];
              if (correctArr.includes(opt.key)) {
                optionStyle = "border-emerald-500 bg-emerald-950/40 text-emerald-200 font-semibold";
              } else if (isSelected) {
                optionStyle = "border-rose-500 bg-rose-950/40 text-rose-200";
              } else {
                optionStyle = "border-slate-800 bg-slate-950/50 text-slate-500";
              }
            } else if (isSelected) {
              optionStyle = "border-cyan-500 bg-cyan-950/40 text-cyan-200 font-semibold";
            }

            return (
              <button
                key={opt.key}
                onClick={() => toggleOption(opt.key)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-start space-x-3 cursor-pointer ${optionStyle}`}
              >
                <span className={`w-6 h-6 rounded-lg border flex items-center justify-center text-xs font-bold shrink-0 ${
                  isSelected && !submitted ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'bg-slate-900 border-slate-700'
                }`}>
                  {opt.key}
                </span>
                <span className="text-sm pt-0.5">{opt.text}</span>
              </button>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center pt-4 border-t border-slate-800">
          <button onClick={onBackToSyllabus} className="text-xs text-slate-400 hover:text-cyan-400 cursor-pointer">
            ← Exit
          </button>

          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={selectedAnswers.length === 0}
              className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold text-xs transition-all cursor-pointer shadow-md"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs transition-all flex items-center space-x-2 cursor-pointer shadow-md"
            >
              <span>{isLast ? 'View Results' : 'Next Question'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Feedback panel */}
      {submitted && (
        <div className={`p-6 rounded-2xl border space-y-4 shadow-xl ${
          isCorrect(currentQuiz, selectedAnswers)
            ? 'bg-emerald-950/40 border-emerald-500/40'
            : 'bg-rose-950/40 border-rose-500/40'
        }`}>
          <div className="flex items-center space-x-3 font-bold text-base">
            {isCorrect(currentQuiz, selectedAnswers) ? (
              <><CheckCircle className="w-5 h-5 text-emerald-400" /><span className="text-emerald-200">Correct</span></>
            ) : (
              <><XCircle className="w-5 h-5 text-rose-400" /><span className="text-rose-200">Incorrect</span></>
            )}
          </div>
          <div className="space-y-2 text-sm text-slate-300 leading-relaxed">
            <h5 className="font-bold text-white text-xs uppercase tracking-wider">Technical Explanation</h5>
            <p>{currentQuiz.explanation}</p>
          </div>
          {currentQuiz.technicalResources?.length > 0 && (
            <div className="pt-2 border-t border-slate-800/80 space-y-2">
              <h5 className="font-bold text-white text-xs uppercase tracking-wider">Recommended Docs</h5>
              <div className="flex flex-wrap gap-2">
                {currentQuiz.technicalResources.map((res, i) => (
                  <a key={i} href={res.url} target="_blank" rel="noreferrer"
                    className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-cyan-400 hover:text-cyan-300">
                    {res.name || res.url}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
