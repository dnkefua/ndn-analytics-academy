import React, { useState } from 'react';
import { ProjectBrief, ProjectSubmission, LearnerProgress } from '../types/academy';
import { PROJECTS } from '../data/projects';
import { COURSES } from '../data/courses';
import { ShieldCheck, Code2, Globe, Video, FileText, Send, Award, CheckCircle, ExternalLink, Sparkles, AlertCircle } from 'lucide-react';

interface ProjectWorkbenchProps {
  learnerProgress: LearnerProgress;
  onSaveProjectSubmission: (submission: ProjectSubmission) => void;
}

export const ProjectWorkbench: React.FC<ProjectWorkbenchProps> = ({
  learnerProgress,
  onSaveProjectSubmission,
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(PROJECTS[0].id);

  const activeProject = PROJECTS.find(p => p.id === selectedProjectId) || PROJECTS[0];
  const activeCourse = COURSES.find(c => c.id === activeProject.courseId);
  const existingSubmission = learnerProgress.projectSubmissions.find(s => s.projectId === activeProject.id);

  const [repoUrl, setRepoUrl] = useState(existingSubmission?.repoUrl || "");
  const [deployedUrl, setDeployedUrl] = useState(existingSubmission?.deployedUrl || "");
  const [demoVideoUrl, setDemoVideoUrl] = useState(existingSubmission?.demoVideoUrl || "");
  const [reflection, setReflection] = useState(existingSubmission?.reflection || "");

  const [lastSubmission, setLastSubmission] = useState<ProjectSubmission | null>(existingSubmission || null);

  const handleSubmitProject = () => {
    let score = 100;
    const feedbackLines: string[] = [];

    if (!repoUrl.toLowerCase().startsWith("https://github.com/")) {
      score -= 20;
      feedbackLines.push("Repository URL must be a valid GitHub URL.");
    }
    if (!deployedUrl.toLowerCase().startsWith("https://")) {
      score -= 15;
      feedbackLines.push("Deployed application URL must use HTTPS.");
    }
    if ((reflection || "").length < 60) {
      score -= 15;
      feedbackLines.push("Reflection summary must be at least 60 characters detailing architectural design decisions.");
    }

    const finalScore = Math.max(0, score);
    const status: 'passed' | 'needs_revision' = finalScore >= 80 ? 'passed' : 'needs_revision';

    const feedback = status === 'passed'
      ? "🎉 Capstone Project Approved! Your architecture, code quality, and security implementation meet NDN Analytics engineering standards."
      : `⚠️ Revisions Required (${finalScore}/100):\n• ${feedbackLines.join("\n• ")}`;

    const newSub: ProjectSubmission = {
      id: existingSubmission?.id || `proj-sub-${activeProject.id}-${Date.now()}`,
      projectId: activeProject.id,
      courseId: activeProject.courseId,
      studentId: learnerProgress.studentId,
      repoUrl,
      deployedUrl,
      demoVideoUrl,
      reflection,
      score: finalScore,
      feedback,
      status,
      submittedAt: new Date().toISOString(),
      gradedAt: new Date().toISOString(),
    };

    setLastSubmission(newSub);
    onSaveProjectSubmission(newSub);
  };

  return (
    <div className="space-y-8 animate-fade-in text-slate-100 pb-16">
      {/* Header */}
      <div className="relative rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 p-8 overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>NDN Engineering Portfolio Workbench</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
            Capstone Project Workbench & Portfolio
          </h1>
          <p className="text-base text-slate-300 leading-relaxed">
            Submit real GitHub repositories, live Cloud Run / Firebase deployments, and architectural reflections to complete your certification evidence portfolio.
          </p>
        </div>
      </div>

      {/* Project Selector Bar */}
      <div className="flex flex-wrap gap-3 bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
        {PROJECTS.map((proj) => {
          const sub = learnerProgress.projectSubmissions.find(s => s.projectId === proj.id);
          const isSel = proj.id === selectedProjectId;

          return (
            <button
              key={proj.id}
              onClick={() => {
                setSelectedProjectId(proj.id);
                const subForProj = learnerProgress.projectSubmissions.find(s => s.projectId === proj.id);
                setRepoUrl(subForProj?.repoUrl || "");
                setDeployedUrl(subForProj?.deployedUrl || "");
                setDemoVideoUrl(subForProj?.demoVideoUrl || "");
                setReflection(subForProj?.reflection || "");
                setLastSubmission(subForProj || null);
              }}
              className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer ${
                isSel
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-950 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
              }`}
            >
              <span>{proj.title.split(':')[0]}</span>
              {sub && sub.status === 'passed' && <CheckCircle className="w-3.5 h-3.5 text-emerald-950 fill-emerald-400" />}
            </button>
          );
        })}
      </div>

      {/* Main Grid: Brief vs Submission Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Scenario & Rubric */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="space-y-2">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">{activeCourse?.title}</span>
            <h2 className="text-xl font-bold text-white font-display">{activeProject.title}</h2>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-sm text-slate-300 leading-relaxed">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Project Scenario Brief</h4>
            <p>{activeProject.scenario}</p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Required Deliverables</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {activeProject.deliverables.map((del, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>{del}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Rubric Table */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
              <Award className="w-4 h-4" />
              <span>Evaluation Rubric (100 Points Total)</span>
            </h4>
            <div className="space-y-2">
              {activeProject.rubric.map((item) => (
                <div key={item.id} className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-200">{item.label}: </span>
                    <span className="text-slate-400">{item.description}</span>
                  </div>
                  <span className="text-cyan-400 font-bold ml-2 shrink-0">{item.maxPoints} pts</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submission Form & Status */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white font-display">Project Submission Form</h3>
            {lastSubmission && (
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                lastSubmission.status === 'passed'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
              }`}>
                {lastSubmission.status.toUpperCase()} ({lastSubmission.score}/100)
              </span>
            )}
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>GitHub Repository URL</span>
              </label>
              <input
                type="url"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/username/capstone-project"
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>Live Deployed Application URL</span>
              </label>
              <input
                type="url"
                value={deployedUrl}
                onChange={(e) => setDeployedUrl(e.target.value)}
                placeholder="https://capstone.hosted.app"
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
                <Video className="w-3.5 h-3.5 text-amber-400" />
                <span>Demo Video or Screenshot Proof URL</span>
              </label>
              <input
                type="url"
                value={demoVideoUrl}
                onChange={(e) => setDemoVideoUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=demo or image link"
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
                <FileText className="w-3.5 h-3.5 text-indigo-400" />
                <span>Architectural Reflection & Technical Summary</span>
              </label>
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                rows={4}
                placeholder="Summarize your data model, security design, deployment steps, and key challenges..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              onClick={handleSubmitProject}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{lastSubmission ? "Resubmit Capstone Project" : "Submit Capstone Project for Evaluation"}</span>
            </button>
          </div>

          {/* Feedback Display */}
          {lastSubmission && (
            <div className={`p-4 rounded-xl border space-y-2 ${
              lastSubmission.status === 'passed'
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                : 'bg-amber-950/40 border-amber-500/40 text-amber-200'
            }`}>
              <div className="flex items-center space-x-2 font-bold text-xs">
                {lastSubmission.status === 'passed' ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-amber-400" />}
                <span>Evaluator Feedback & Rubric Assessment</span>
              </div>
              <p className="text-xs whitespace-pre-wrap leading-relaxed">{lastSubmission.feedback}</p>
            </div>
          )}
        </div>
      </div>

      {/* Showcase Portfolio Gallery */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
        <h3 className="text-xl font-bold text-white font-display flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span>Learner Showcase Portfolio Gallery</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {learnerProgress.projectSubmissions.filter(s => s.status === 'passed').map((sub) => {
            const proj = PROJECTS.find(p => p.id === sub.projectId);

            return (
              <div key={sub.id} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-white text-base">{proj?.title}</h4>
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Grade: {sub.score}/100
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">{sub.reflection}</p>

                <div className="flex flex-wrap gap-3 pt-2 text-xs">
                  {sub.repoUrl && (
                    <a href={sub.repoUrl} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline flex items-center space-x-1">
                      <Code2 className="w-3.5 h-3.5" />
                      <span>Repository</span>
                    </a>
                  )}
                  {sub.deployedUrl && (
                    <a href={sub.deployedUrl} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline flex items-center space-x-1">
                      <Globe className="w-3.5 h-3.5" />
                      <span>Live App</span>
                    </a>
                  )}
                </div>
              </div>
            );
          })}

          {learnerProgress.projectSubmissions.filter(s => s.status === 'passed').length === 0 && (
            <div className="col-span-2 text-center py-8 text-slate-400 text-sm">
              No capstone projects completed yet. Submit and pass a capstone project above to showcase it in your portfolio!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
