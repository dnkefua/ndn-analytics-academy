import React from 'react';
import { Course } from '../types/academy';
import { MODULES } from '../data/modules';
import { PROJECTS } from '../data/projects';
import { Clock, Award, CheckCircle, BookOpen, User, ArrowLeft, ArrowRight, ShieldCheck, Cpu, Play } from 'lucide-react';

interface CourseDetailProps {
  course: Course;
  onStartCourse: (courseId: string) => void;
  onBackToCatalog: () => void;
  isEnrolled?: boolean;
}

export const CourseDetail: React.FC<CourseDetailProps> = ({
  course,
  onStartCourse,
  onBackToCatalog,
  isEnrolled = false,
}) => {
  const courseModules = MODULES.filter(m => m.courseId === course.id);
  const capstoneProject = PROJECTS.find(p => p.id === course.finalProjectId);

  return (
    <div className="space-y-8 animate-fade-in text-slate-100 pb-16">
      {/* Back button */}
      <button
        onClick={onBackToCatalog}
        className="flex items-center space-x-2 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back to Course Catalog</span>
      </button>

      {/* Hero Section */}
      <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800/80 p-6 sm:p-10 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {course.code}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {course.level.replace('_', ' ')}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {course.category.replace('_', ' & ')}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
              {course.title}
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
              {course.longDescription}
            </p>

            {/* Meta badges */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-sm text-slate-400">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>{course.durationHours} Hours to Complete</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span>{course.cpdCredits} CPD Professional Credits</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>{courseModules.length} Structured Modules</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onStartCourse(course.id)}
                className="px-8 py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 cursor-pointer flex items-center space-x-2"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>{isEnrolled ? "Continue Learning" : "Start Course Now"}</span>
              </button>
            </div>
          </div>

          {/* Instructor Card */}
          <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500 p-0.5 shadow-md">
                <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center font-bold text-cyan-400 text-lg">
                  MN
                </div>
              </div>
              <div>
                <h4 className="font-bold text-white text-base">{course.instructorName}</h4>
                <p className="text-xs text-cyan-400 font-medium">{course.instructorRole}</p>
              </div>
            </div>

            <div className="border-t border-slate-800/80 pt-4 space-y-2 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Certificate Rules:</span>
                <span className="text-white font-medium">Verified CPD</span>
              </div>
              <div className="flex justify-between">
                <span>Min Quiz Pass:</span>
                <span className="text-emerald-400 font-semibold">{course.certificateRules.minQuizAverage}%</span>
              </div>
              <div className="flex justify-between">
                <span>Min Lab Pass:</span>
                <span className="text-emerald-400 font-semibold">{course.certificateRules.minLabAverage}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Outcomes & Prerequisites */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Outcomes */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center space-x-3 text-cyan-400">
            <CheckCircle className="w-5 h-5" />
            <h3 className="text-lg font-bold text-white font-display">What You Will Learn & Build</h3>
          </div>
          <ul className="space-y-3">
            {course.outcomes.map((outcome, idx) => (
              <li key={idx} className="flex items-start space-x-3 text-sm text-slate-300">
                <span className="text-cyan-400 font-bold">•</span>
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Prerequisites & Skills */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center space-x-3 text-indigo-400">
            <Cpu className="w-5 h-5" />
            <h3 className="text-lg font-bold text-white font-display">Prerequisites & Skills Gained</h3>
          </div>
          <div className="space-y-4">
            <div>
              <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Prerequisites</h5>
              <ul className="space-y-1.5 text-sm text-slate-300">
                {course.prerequisites.map((req, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Skills You Will Master</h5>
              <div className="flex flex-wrap gap-2">
                {course.tags.map((tag, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Syllabus / Module Accordion List */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white font-display">Course Syllabus</h3>
            <p className="text-xs text-slate-400">{courseModules.length} Modules • Practical Lab & Evaluation Breakdown</p>
          </div>
          <span className="text-sm font-semibold text-cyan-400">{course.durationHours} Total Hours</span>
        </div>

        <div className="space-y-4">
          {courseModules.map((module) => (
            <div key={module.id} className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-5 hover:border-slate-700 transition-all space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Module {module.order}</span>
                <span className="text-xs text-slate-400">{module.estimatedHours} Hours</span>
              </div>
              <h4 className="text-base font-bold text-white">{module.title}</h4>
              <p className="text-sm text-slate-300">{module.summary}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Capstone Project Overview */}
      {capstoneProject && (
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 rounded-xl p-6 space-y-4">
          <div className="flex items-center space-x-3 text-indigo-400">
            <ShieldCheck className="w-6 h-6 text-indigo-400" />
            <h3 className="text-xl font-bold text-white font-display">Final Capstone Project</h3>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">{capstoneProject.scenario}</p>
          <div className="pt-2">
            <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Deliverables</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {capstoneProject.deliverables.map((d, i) => (
                <div key={i} className="text-xs text-slate-300 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 flex items-center space-x-2">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
