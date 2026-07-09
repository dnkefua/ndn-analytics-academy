import React, { useState } from 'react';
import { Lab, LabSubmission } from '../types/academy';
import { validateLabSubmission, LabValidationResult } from '../services/labValidationService';
import { Terminal, CheckSquare, Code2, Globe, FileText, Send, AlertCircle, CheckCircle, RefreshCw, Award } from 'lucide-react';

interface LabStudioProps {
  lab: Lab;
  existingSubmission?: LabSubmission;
  onSaveSubmission: (submission: LabSubmission) => void;
}

export const LabStudio: React.FC<LabStudioProps> = ({
  lab,
  existingSubmission,
  onSaveSubmission,
}) => {
  const [checklist, setChecklist] = useState<Record<number, boolean>>({});
  const [submittedCode, setSubmittedCode] = useState(existingSubmission?.submittedCode || lab.starterCode || "");
  const [repoUrl, setRepoUrl] = useState(existingSubmission?.repoUrl || "");
  const [deployedUrl, setDeployedUrl] = useState(existingSubmission?.deployedUrl || "");
  const [screenshotEvidence, setScreenshotEvidence] = useState((existingSubmission?.screenshotUrls || []).join("\n"));
  const [reflection, setReflection] = useState(existingSubmission?.reflection || "");

  const [validationResult, setValidationResult] = useState<LabValidationResult | null>(
    existingSubmission && existingSubmission.score !== undefined
      ? {
          score: existingSubmission.score,
          status: existingSubmission.status as any,
          feedback: existingSubmission.feedback || "",
          checklistPassed: true,
          repoValid: true,
          deployedUrlValid: true,
          screenshotValid: true,
          codeKeywordsValid: true,
          reflectionValid: true,
        }
      : null
  );

  const allChecklistDone = lab.instructions.every((_, idx) => !!checklist[idx]);

  const toggleChecklist = (idx: number) => {
    setChecklist(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleSubmitLab = () => {
    const screenshotUrls = screenshotEvidence
      .split(/\r?\n|,/)
      .map(url => url.trim())
      .filter(Boolean);

    const result = validateLabSubmission(
      lab,
      {
        submittedCode,
        repoUrl,
        deployedUrl,
        screenshotUrls,
        reflection,
      },
      allChecklistDone
    );

    setValidationResult(result);

    const submissionRecord: LabSubmission = {
      id: existingSubmission?.id || `sub-${lab.id}-${Date.now()}`,
      labId: lab.id,
      courseId: lab.courseId,
      studentId: existingSubmission?.studentId || "NDN-STU-2026-8801",
      repoUrl,
      deployedUrl,
      submittedCode,
      screenshotUrls,
      reflection,
      score: result.score,
      feedback: result.feedback,
      status: result.status,
      submittedAt: new Date().toISOString(),
      gradedAt: new Date().toISOString(),
    };

    onSaveSubmission(submissionRecord);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl text-slate-100">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
            <Terminal className="w-4 h-4" />
            <span>Practical Lab Studio</span>
          </div>
          <h2 className="text-xl font-bold text-white font-display">{lab.title}</h2>
        </div>

        {validationResult && (
          <div className={`px-4 py-2 rounded-xl flex items-center space-x-2 border text-sm font-bold ${
            validationResult.status === 'passed'
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
              : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
          }`}>
            <Award className="w-4 h-4" />
            <span>Score: {validationResult.score}/100 ({validationResult.status === 'passed' ? 'PASSED' : 'NEEDS REVISION'})</span>
          </div>
        )}
      </div>

      <p className="text-sm text-slate-300 leading-relaxed">{lab.summary}</p>

      {/* Grid: Instructions & Evidence Input */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Guided Checklist & Rubric */}
        <div className="space-y-6">
          {/* Guided Checklist */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center space-x-2">
              <CheckSquare className="w-4 h-4 text-cyan-400" />
              <span>Step-by-Step Guided Checklist</span>
            </h4>
            <div className="space-y-3">
              {lab.instructions.map((step, idx) => (
                <label key={idx} className="flex items-start space-x-3 text-xs text-slate-300 cursor-pointer hover:text-white transition-colors">
                  <input
                    type="checkbox"
                    checked={!!checklist[idx]}
                    onChange={() => toggleChecklist(idx)}
                    className="mt-0.5 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-500"
                  />
                  <span className={checklist[idx] ? "line-through text-slate-500" : ""}>{step}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Rubric Breakdown */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center space-x-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Evaluation Rubric</span>
            </h4>
            <div className="space-y-2.5">
              {lab.rubric.map((item) => (
                <div key={item.id} className="text-xs space-y-1 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <div className="flex justify-between font-semibold text-slate-200">
                    <span>{item.label}</span>
                    <span className="text-cyan-400">{item.maxPoints} pts</span>
                  </div>
                  <p className="text-slate-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Code & Evidence Submission */}
        <div className="space-y-6">
          {/* Code Editor */}
          {lab.requiredEvidence.includes("code") && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span className="font-mono text-cyan-400">Source Implementation Snippet</span>
                <span>TypeScript / Node</span>
              </div>
              <textarea
                value={submittedCode}
                onChange={(e) => setSubmittedCode(e.target.value)}
                rows={8}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 font-mono text-xs text-cyan-300 focus:outline-none focus:border-cyan-500"
                placeholder="// Write or paste your solution implementation here..."
              />
            </div>
          )}

          {/* GitHub Repo URL */}
          {lab.requiredEvidence.includes("repo_url") && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>GitHub Repository Link</span>
              </label>
              <input
                type="url"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/username/project-repo"
                className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>
          )}

          {/* Deployed App URL */}
          {lab.requiredEvidence.includes("deployed_url") && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>Live Deployed Application URL</span>
              </label>
              <input
                type="url"
                value={deployedUrl}
                onChange={(e) => setDeployedUrl(e.target.value)}
                placeholder="https://app-name.hosted.app"
                className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>
          )}

          {/* Screenshot / Recording Evidence */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>
                Screenshot / Recording Evidence Links
                {lab.requiredEvidence.includes("screenshot") ? " (Required)" : " (Optional)"}
              </span>
            </label>
            <textarea
              value={screenshotEvidence}
              onChange={(e) => setScreenshotEvidence(e.target.value)}
              rows={3}
              placeholder="Paste HTTPS links to screenshots, Loom videos, console captures, or shared evidence folders. One per line."
              className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Reflection */}
          {lab.requiredEvidence.includes("reflection") && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
                <FileText className="w-3.5 h-3.5 text-indigo-400" />
                <span>Engineering Reflection (Min 50 chars)</span>
              </label>
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                rows={3}
                placeholder="Detail your architecture decisions, challenges encountered, and optimization steps..."
                className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmitLab}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>{validationResult ? "Re-evaluate Lab Submission" : "Submit Lab for Evaluation"}</span>
          </button>
        </div>
      </div>

      {/* Feedback Panel */}
      {validationResult && (
        <div className={`p-5 rounded-xl border space-y-3 ${
          validationResult.status === 'passed'
            ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
            : 'bg-amber-950/40 border-amber-500/40 text-amber-200'
        }`}>
          <div className="flex items-center space-x-2 font-bold text-sm">
            {validationResult.status === 'passed' ? <CheckCircle className="w-5 h-5 text-emerald-400" /> : <AlertCircle className="w-5 h-5 text-amber-400" />}
            <span>Evaluation Result Feedback</span>
          </div>
          <pre className="text-xs font-sans whitespace-pre-wrap leading-relaxed opacity-90">{validationResult.feedback}</pre>
        </div>
      )}
    </div>
  );
};
