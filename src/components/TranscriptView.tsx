import React from 'react';
import { LearnerProgress } from '../types/academy';
import { COURSES } from '../data/courses';
import { calculateCourseGrade, calculateGPA } from '../services/gradingService';
import { FileText, Award, ShieldCheck, Printer, CheckCircle } from 'lucide-react';

interface TranscriptViewProps {
  learnerProgress: LearnerProgress;
}

export const TranscriptView: React.FC<TranscriptViewProps> = ({
  learnerProgress,
}) => {
  const gradeSummaries = COURSES.map(c => calculateCourseGrade(c.id, learnerProgress));
  const gpa = calculateGPA(gradeSummaries);

  const totalCPDEarned = COURSES.reduce((sum, c) => {
    const summary = gradeSummaries.find(s => s.courseId === c.id);
    return sum + (summary && summary.isPassed ? c.cpdCredits : 0);
  }, 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fade-in text-slate-100 pb-16">
      {/* Header */}
      <div className="relative rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 p-8 overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-wrap justify-between items-center gap-4">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              <FileText className="w-3.5 h-3.5" />
              <span>Official Academic Record</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
              Academic Transcript
            </h1>
            <p className="text-sm text-slate-300">
              Derived live from verified quiz scores, practical lab evaluations, and capstone project submissions.
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer border border-slate-700"
          >
            <Printer className="w-4 h-4" />
            <span>Print Official Transcript</span>
          </button>
        </div>
      </div>

      {/* Learner Profile Overview Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-4 gap-6 shadow-xl text-xs">
        <div>
          <span className="text-slate-500 block uppercase tracking-wider text-[10px]">Student Name</span>
          <span className="text-base font-bold text-white font-display">{learnerProgress.studentName}</span>
        </div>
        <div>
          <span className="text-slate-500 block uppercase tracking-wider text-[10px]">Student ID</span>
          <span className="text-base font-mono font-bold text-cyan-400">{learnerProgress.studentId}</span>
        </div>
        <div>
          <span className="text-slate-500 block uppercase tracking-wider text-[10px]">Cumulative GPA</span>
          <span className="text-base font-bold text-emerald-400">{gpa} / 4.0</span>
        </div>
        <div>
          <span className="text-slate-500 block uppercase tracking-wider text-[10px]">Total CPD Earned</span>
          <span className="text-base font-bold text-amber-400">{totalCPDEarned} Credits</span>
        </div>
      </div>

      {/* Course Grades Breakdown Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <h3 className="text-xl font-bold text-white font-display">Course Evaluations & Final Grades</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-xs uppercase text-slate-400 bg-slate-950/60">
                <th className="py-3 px-4">Course Code & Title</th>
                <th className="py-3 px-4">Quiz Avg</th>
                <th className="py-3 px-4">Lab Avg</th>
                <th className="py-3 px-4">Capstone</th>
                <th className="py-3 px-4">Final Score</th>
                <th className="py-3 px-4">Grade</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs">
              {gradeSummaries.map((summary) => {
                const course = COURSES.find(c => c.id === summary.courseId);

                return (
                  <tr key={summary.courseId} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-200">
                      <span className="text-cyan-400 font-mono text-[11px] block">{course?.code}</span>
                      <span>{summary.courseTitle}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">{summary.quizAverage}%</td>
                    <td className="py-3.5 px-4 text-slate-300">{summary.labAverage}%</td>
                    <td className="py-3.5 px-4 text-slate-300">{summary.finalProjectScore}%</td>
                    <td className="py-3.5 px-4 font-bold text-white">{summary.finalScore}%</td>
                    <td className="py-3.5 px-4 font-bold text-cyan-400">{summary.letterGrade}</td>
                    <td className="py-3.5 px-4">
                      {summary.isPassed ? (
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          PASSED
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-slate-800 text-slate-400">
                          IN PROGRESS
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
