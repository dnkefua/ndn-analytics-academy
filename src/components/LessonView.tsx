import React, { useState } from 'react';
import { Course, Module, Lesson, Lab, LearnerProgress } from '../types/academy';
import { COURSES } from '../data/courses';
import { MODULES } from '../data/modules';
import { LESSONS } from '../data/lessons';
import { LABS } from '../data/labs';
import { LabStudio } from './LabStudio';
import { ArrowLeft, ArrowRight, CheckCircle, Play, BookOpen, Terminal, HelpCircle, FileText, Download, Award, ChevronDown, ChevronRight } from 'lucide-react';

interface LessonViewProps {
  courseId: string;
  learnerProgress: LearnerProgress;
  onMarkLessonComplete: (lessonId: string) => void;
  onSaveLabSubmission: (submission: any) => void;
  onOpenQuiz: (quizId: string) => void;
  onBackToCatalog: () => void;
}

export const LessonView: React.FC<LessonViewProps> = ({
  courseId,
  learnerProgress,
  onMarkLessonComplete,
  onSaveLabSubmission,
  onOpenQuiz,
  onBackToCatalog,
}) => {
  const course = COURSES.find(c => c.id === courseId) || COURSES[0];
  const courseModules = MODULES.filter(m => m.courseId === course.id);
  const courseLessons = LESSONS.filter(l => l.courseId === course.id);

  const [activeModuleId, setActiveModuleId] = useState<string>(courseModules[0]?.id || "");
  const [activeLessonId, setActiveLessonId] = useState<string>(courseLessons[0]?.id || "");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const activeLesson = courseLessons.find(l => l.id === activeLessonId) || courseLessons[0] || LESSONS[0];
  const activeModule = courseModules.find(m => m.id === activeLesson.moduleId) || courseModules[0];
  const currentLab = LABS.find(l => l.moduleId === activeModule?.id);

  const isCompleted = learnerProgress.completedLessonIds.includes(activeLesson.id);

  const activeIndex = courseLessons.findIndex(l => l.id === activeLesson.id);
  const prevLesson = activeIndex > 0 ? courseLessons[activeIndex - 1] : null;
  const nextLesson = activeIndex < courseLessons.length - 1 ? courseLessons[activeIndex + 1] : null;

  return (
    <div className="space-y-6 animate-fade-in text-slate-100 pb-16">
      {/* Top Breadcrumb & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
        <div className="flex items-center space-x-3 text-xs">
          <button onClick={onBackToCatalog} className="text-slate-400 hover:text-cyan-400 font-medium cursor-pointer">
            Catalog
          </button>
          <span className="text-slate-600">/</span>
          <span className="text-cyan-400 font-semibold">{course.title}</span>
          <span className="text-slate-600">/</span>
          <span className="text-white font-bold">{activeModule?.title}</span>
        </div>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-950 text-xs font-semibold text-slate-300 hover:text-cyan-400 cursor-pointer"
        >
          {sidebarOpen ? "Hide Module Syllabus Sidebar" : "Show Module Syllabus Sidebar"}
        </button>
      </div>

      {/* Main Grid: Syllabus Sidebar + Lesson Player */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Sidebar */}
        {sidebarOpen && (
          <div className="lg:col-span-1 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-white font-display border-b border-slate-800 pb-3 flex items-center justify-between">
              <span>Course Syllabus</span>
              <span className="text-xs font-normal text-slate-400">{courseModules.length} Modules</span>
            </h3>

            <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
              {courseModules.map((mod) => {
                const modLessons = courseLessons.filter(l => l.moduleId === mod.id);
                const modLab = LABS.find(l => l.moduleId === mod.id);

                return (
                  <div key={mod.id} className="space-y-1.5">
                    <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider px-2 py-1 bg-slate-950/60 rounded-md border border-slate-800">
                      Module {mod.order}: {mod.title}
                    </div>

                    <div className="pl-2 space-y-1">
                      {modLessons.map((les) => {
                        const done = learnerProgress.completedLessonIds.includes(les.id);
                        const isCurrent = les.id === activeLesson.id;

                        return (
                          <button
                            key={les.id}
                            onClick={() => {
                              setActiveLessonId(les.id);
                              setActiveModuleId(mod.id);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                              isCurrent
                                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                            }`}
                          >
                            <div className="flex items-center space-x-2 truncate">
                              {done ? (
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              ) : (
                                <Play className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                              )}
                              <span className="truncate">{les.title}</span>
                            </div>
                            <span className="text-[10px] text-slate-500">{les.durationMinutes}m</span>
                          </button>
                        );
                      })}

                      {/* Quiz Link */}
                      {mod.quizIds && mod.quizIds.length > 0 && (
                        <button
                          onClick={() => onOpenQuiz(mod.quizIds[0])}
                          className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-300 bg-indigo-950/30 border border-indigo-500/20 hover:border-indigo-500/40 transition-all flex items-center space-x-2 cursor-pointer"
                        >
                          <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
                          <span>Module {mod.order} Evaluation Quiz</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Lesson Body */}
        <div className={sidebarOpen ? "lg:col-span-3 space-y-6" : "lg:col-span-4 space-y-6"}>
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
            {/* Header & Mark Complete */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  {activeLesson.type.toUpperCase()} LESSON
                </span>
                <h1 className="text-2xl font-bold text-white font-display">{activeLesson.title}</h1>
              </div>

              <button
                onClick={() => onMarkLessonComplete(activeLesson.id)}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center space-x-2 cursor-pointer shadow-md ${
                  isCompleted
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-gradient-to-r from-cyan-500 to-emerald-400 text-slate-950 hover:from-cyan-400 hover:to-emerald-300'
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                <span>{isCompleted ? "Completed ✓" : "Mark Lesson Complete"}</span>
              </button>
            </div>

            {/* Content: Video or Markdown Reading */}
            {activeLesson.type === 'video' && activeLesson.videoUrl && (
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
                <iframe
                  src={activeLesson.videoUrl}
                  title={activeLesson.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            {activeLesson.readingMarkdown && (
              <div className="prose prose-invert max-w-none bg-slate-950/60 p-6 rounded-xl border border-slate-800/80 text-sm text-slate-300 leading-relaxed">
                <pre className="font-sans whitespace-pre-wrap leading-relaxed">{activeLesson.readingMarkdown}</pre>
              </div>
            )}

            {/* Embedded Practical Lab Studio if Type is Lab */}
            {activeLesson.type === 'lab' && currentLab && (
              <LabStudio
                lab={currentLab}
                existingSubmission={learnerProgress.labSubmissions.find(s => s.labId === currentLab.id)}
                onSaveSubmission={onSaveLabSubmission}
              />
            )}

            {/* Lesson Notes */}
            {activeLesson.notes && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center space-x-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Core Engineering Concepts</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{activeLesson.notes.coreConcepts}</p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
                    <Award className="w-3.5 h-3.5" />
                    <span>NDN Engineering Pro-Tip</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{activeLesson.notes.proTip}</p>
                </div>
              </div>
            )}

            {/* Resources Link Bar */}
            {activeLesson.resources && activeLesson.resources.length > 0 && (
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Technical Resources & References</h4>
                <div className="flex flex-wrap gap-2">
                  {activeLesson.resources.map((res, idx) => (
                    <a
                      key={idx}
                      href={res.url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-medium text-cyan-400 hover:text-cyan-300 hover:border-cyan-500/40 transition-all flex items-center space-x-1.5"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>{res.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Footer: Prev / Next */}
            <div className="flex justify-between items-center pt-6 border-t border-slate-800">
              {prevLesson ? (
                <button
                  onClick={() => setActiveLessonId(prevLesson.id)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous Lesson</span>
                </button>
              ) : <div />}

              {nextLesson ? (
                <button
                  onClick={() => setActiveLessonId(nextLesson.id)}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all flex items-center space-x-2 cursor-pointer shadow-md"
                >
                  <span>Next Lesson</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : <div />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
