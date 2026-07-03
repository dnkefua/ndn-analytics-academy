import React, { useState } from 'react';
import { Course, EarnedCertificate, LearnerProgress } from '../types/academy';
import { COURSES } from '../data/courses';
import { checkCertificateEligibility, issueCertificateIfEligible } from '../services/certificateService';
import { CertificateEvidence } from './CertificateEvidence';
import { Award, Lock, Unlock, CheckCircle, AlertCircle, Eye, ShieldCheck } from 'lucide-react';

interface CertificationsViewProps {
  learnerProgress: LearnerProgress;
}

export const CertificationsView: React.FC<CertificationsViewProps> = ({
  learnerProgress,
}) => {
  const [selectedCert, setSelectedCert] = useState<EarnedCertificate | null>(null);

  return (
    <div className="space-y-8 animate-fade-in text-slate-100 pb-16">
      {/* Header */}
      <div className="relative rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 p-8 overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <Award className="w-3.5 h-3.5" />
            <span>NDN Verifiable Credentials</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
            Professional Certifications & Badges
          </h1>
          <p className="text-base text-slate-300 leading-relaxed">
            Certificates unlock dynamically when your quiz average, lab evaluations, lesson completion %, and capstone project meet NDN Analytics academic standards.
          </p>
        </div>
      </div>

      {/* Course Certificate Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {COURSES.map((course) => {
          const eligibility = checkCertificateEligibility(course, learnerProgress);
          const existingCert = learnerProgress.certificates.find(c => c.courseId === course.id);

          const isUnlocked = eligibility.isEligible || !!existingCert;

          return (
            <div
              key={course.id}
              className={`rounded-2xl p-6 border transition-all space-y-4 shadow-lg ${
                isUnlocked
                  ? 'bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-amber-500/40 shadow-amber-500/5'
                  : 'bg-slate-900/60 border-slate-800/80 opacity-90'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">{course.code}</span>
                  <h3 className="text-lg font-bold text-white font-display">{course.title}</h3>
                </div>
                {isUnlocked ? (
                  <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300">
                    <Unlock className="w-5 h-5" />
                  </div>
                ) : (
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-500">
                    <Lock className="w-5 h-5" />
                  </div>
                )}
              </div>

              {/* Requirement Checklist */}
              <div className="space-y-2 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                <h4 className="font-bold text-slate-300 uppercase tracking-wider text-[10px] mb-2">Completion Requirements</h4>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Quiz Average (Min {eligibility.minQuizAverage}%):</span>
                  <span className={eligibility.quizPassed ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                    {eligibility.quizAverage}% {eligibility.quizPassed ? "✓" : "✗"}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Lab Average (Min {eligibility.minLabAverage}%):</span>
                  <span className={eligibility.labPassed ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                    {eligibility.labAverage}% {eligibility.labPassed ? "✓" : "✗"}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Lesson Completion (Min {eligibility.minLessonPercent}%):</span>
                  <span className={eligibility.lessonPassed ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                    {eligibility.lessonPercent}% {eligibility.lessonPassed ? "✓" : "✗"}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Capstone Final Project:</span>
                  <span className={eligibility.projectPassed ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                    {eligibility.projectPassed ? "PASSED ✓" : "PENDING ✗"}
                  </span>
                </div>
              </div>

              {/* Action */}
              {isUnlocked ? (
                <button
                  onClick={() => {
                    const certToView = existingCert || issueCertificateIfEligible(course, learnerProgress);
                    if (certToView) setSelectedCert(certToView);
                  }}
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-md shadow-amber-500/20"
                >
                  <Eye className="w-4 h-4" />
                  <span>View & Verify Certificate Evidence</span>
                </button>
              ) : (
                <div className="text-xs text-slate-400 space-y-1 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                  <span className="font-semibold text-amber-400 block">Locked — Requirements Pending:</span>
                  <ul className="space-y-0.5 text-[11px] list-disc list-inside">
                    {eligibility.missingRequirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Certificate Evidence Modal */}
      {selectedCert && (
        <CertificateEvidence
          certificate={selectedCert}
          onClose={() => setSelectedCert(null)}
        />
      )}
    </div>
  );
};
