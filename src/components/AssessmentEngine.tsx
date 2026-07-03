import React, { useState } from 'react';
import { QuizQuestion, QuizAttempt } from '../types/academy';
import { QUIZZES } from '../data/quizzes';
import { HelpCircle, CheckCircle, XCircle, RefreshCw, Award, BookOpen, ArrowRight } from 'lucide-react';

interface AssessmentEngineProps {
  quizId?: string;
  onRecordAttempt: (attempt: QuizAttempt) => void;
  onBackToSyllabus: () => void;
}

export const AssessmentEngine: React.FC<AssessmentEngineProps> = ({
  quizId,
  onRecordAttempt,
  onBackToSyllabus,
}) => {
  const currentQuiz = QUIZZES.find(q => q.id === quizId) || QUIZZES[0];
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const isMultiSelect = currentQuiz.type === 'multi_select';

  const toggleOption = (key: string) => {
    if (submitted) return;
    if (isMultiSelect) {
      if (selectedAnswers.includes(key)) {
        setSelectedAnswers(selectedAnswers.filter(k => k !== key));
      } else {
        setSelectedAnswers([...selectedAnswers, key]);
      }
    } else {
      setSelectedAnswers([key]);
    }
  };

  const isCorrect = () => {
    if (isMultiSelect) {
      const correctArr = Array.isArray(currentQuiz.correctAnswer) ? currentQuiz.correctAnswer : [currentQuiz.correctAnswer];
      if (selectedAnswers.length !== correctArr.length) return false;
      return selectedAnswers.every(k => correctArr.includes(k));
    }
    return selectedAnswers[0] === currentQuiz.correctAnswer;
  };

  const handleSubmit = () => {
    if (selectedAnswers.length === 0) return;
    setSubmitted(true);

    const correct = isCorrect();
    const score = correct ? 100 : 0;

    const attempt: QuizAttempt = {
      id: `qa-${Date.now()}`,
      quizId: currentQuiz.id,
      courseId: currentQuiz.courseId,
      moduleId: currentQuiz.moduleId,
      selectedAnswer: isMultiSelect ? selectedAnswers : selectedAnswers[0],
      isCorrect: correct,
      score,
      attemptedAt: new Date().toISOString()
    };

    onRecordAttempt(attempt);
  };

  const handleRetake = () => {
    setSelectedAnswers([]);
    setSubmitted(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in text-slate-100 pb-16">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center space-x-1.5">
              <HelpCircle className="w-4 h-4" />
              <span>MODULE EVALUATION QUIZ ({currentQuiz.type.replace('_', ' ').toUpperCase()})</span>
            </span>
            <h1 className="text-2xl font-bold text-white font-display">Technical Assessment Engine</h1>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            {currentQuiz.difficulty.toUpperCase()}
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">{currentQuiz.question}</p>

        {/* Code Snippet if present */}
        {currentQuiz.codeSnippet && (
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto">
            <pre>{currentQuiz.codeSnippet}</pre>
          </div>
        )}

        {/* Options List */}
        <div className="space-y-3 pt-2">
          {currentQuiz.options.map((opt) => {
            const isSelected = selectedAnswers.includes(opt.key);
            let optionStyle = "border-slate-800 bg-slate-950 hover:border-slate-700 text-slate-300";

            if (submitted) {
              const isAns = isMultiSelect
                ? (Array.isArray(currentQuiz.correctAnswer) && currentQuiz.correctAnswer.includes(opt.key))
                : currentQuiz.correctAnswer === opt.key;

              if (isAns) {
                optionStyle = "border-emerald-500 bg-emerald-950/40 text-emerald-200 font-semibold";
              } else if (isSelected) {
                optionStyle = "border-rose-500 bg-rose-950/40 text-rose-200";
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
                <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-xs font-bold shrink-0">
                  {opt.key}
                </span>
                <span className="text-sm pt-0.5">{opt.text}</span>
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex justify-between items-center pt-4 border-t border-slate-800">
          <button
            onClick={onBackToSyllabus}
            className="text-xs text-slate-400 hover:text-cyan-400 cursor-pointer"
          >
            ← Return to Module Syllabus
          </button>

          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={selectedAnswers.length === 0}
              className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs transition-all cursor-pointer shadow-md"
            >
              Submit Assessment Answer
            </button>
          ) : (
            <button
              onClick={handleRetake}
              className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all flex items-center space-x-2 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retake Quiz</span>
            </button>
          )}
        </div>
      </div>

      {/* Explanation & Technical Feedback Panel */}
      {submitted && (
        <div className={`p-6 rounded-2xl border space-y-4 shadow-xl ${
          isCorrect()
            ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
            : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
        }`}>
          <div className="flex items-center space-x-3 font-bold text-lg">
            {isCorrect() ? (
              <>
                <CheckCircle className="w-6 h-6 text-emerald-400" />
                <span>Correct Answer! 100% Evaluation Score</span>
              </>
            ) : (
              <>
                <XCircle className="w-6 h-6 text-rose-400" />
                <span>Incorrect Selection</span>
              </>
            )}
          </div>

          <div className="space-y-2 text-sm text-slate-300 leading-relaxed">
            <h5 className="font-bold text-white text-xs uppercase tracking-wider">Technical Explanation</h5>
            <p>{currentQuiz.explanation}</p>
          </div>

          {currentQuiz.technicalResources && currentQuiz.technicalResources.length > 0 && (
            <div className="pt-2 border-t border-slate-800/80 space-y-2">
              <h5 className="font-bold text-white text-xs uppercase tracking-wider">Recommended Docs</h5>
              <div className="flex flex-wrap gap-2">
                {currentQuiz.technicalResources.map((res, i) => (
                  <a
                    key={i}
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-cyan-400 hover:text-cyan-300"
                  >
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
