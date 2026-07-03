import React, { useState } from 'react';
import { COURSES } from '../data/courses';
import { MODULES } from '../data/modules';
import { Course, CourseCategory, CourseLevel } from '../types/academy';
import { Search, Filter, Clock, Award, BookOpen, ChevronRight, Play, Eye } from 'lucide-react';

interface AcademyCatalogProps {
  onSelectCourse: (course: Course) => void;
  onStartCourse: (courseId: string) => void;
  activeCourseId?: string;
  learnerProgressPercentMap?: Record<string, number>;
}

export const AcademyCatalog: React.FC<AcademyCatalogProps> = ({
  onSelectCourse,
  onStartCourse,
  activeCourseId,
  learnerProgressPercentMap = {}
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory | "ALL">("ALL");
  const [selectedLevel, setSelectedLevel] = useState<CourseLevel | "ALL">("ALL");

  const filteredCourses = COURSES.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === "ALL" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "ALL" || course.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="space-y-8 animate-fade-in text-slate-100 pb-16">
      {/* Catalog Header */}
      <div className="relative rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 p-8 overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            <span>NDN Analytics Engineering Curriculum</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
            Project-Based Course Catalog
          </h1>
          <p className="text-base text-slate-300 leading-relaxed">
            Build real AI models, GCP microservices, Android Play Store apps, and Firebase backends adhering to NDN Analytics engineering standards.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-lg space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative md:col-span-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses, tools, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className="w-full px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              <option value="ALL">All Categories</option>
              <option value="FIREBASE_GCP">Firebase & GCP</option>
              <option value="GCP_ARCHITECTURE">GCP Architecture</option>
              <option value="PLAY_STORE_DEV">Play Store Publishing</option>
              <option value="AI_ENGINEERING">AI Engineering & Gemini</option>
              <option value="BIGDATA_MLOPS">BigQuery & MLOps</option>
            </select>
          </div>

          {/* Level Filter */}
          <div>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value as any)}
              className="w-full px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              <option value="ALL">All Competency Levels</option>
              <option value="L1_FOUNDATION">L1 Foundation</option>
              <option value="L2_INTERMEDIATE">L2 Intermediate</option>
              <option value="L3_PROFESSIONAL">L3 Professional</option>
              <option value="L4_EXPERT">L4 Expert</option>
            </select>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const courseModules = MODULES.filter(m => m.courseId === course.id);
          const progressPercent = learnerProgressPercentMap[course.id] || 0;
          const isActive = activeCourseId === course.id;

          return (
            <div
              key={course.id}
              className={`group rounded-2xl bg-slate-900/90 border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg ${
                isActive ? 'border-cyan-500 ring-1 ring-cyan-500/50' : 'border-slate-800/80 hover:border-slate-700 hover:shadow-cyan-500/10'
              }`}
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-slate-950/80 backdrop-blur-md text-cyan-400 border border-cyan-500/30">
                      {course.code}
                    </span>
                    <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-950/80 backdrop-blur-md text-indigo-300 border border-indigo-500/30">
                      {course.level.replace('_', ' ')}
                    </span>
                  </div>

                  {course.finalProjectId && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        Capstone Project
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors font-display line-clamp-2">
                    {course.title}
                  </h3>

                  <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed">
                    {course.shortDescription}
                  </p>

                  {/* Outcome */}
                  <div className="bg-slate-950/60 rounded-lg p-3 border border-slate-800/60 text-xs text-slate-300">
                    <span className="font-bold text-cyan-400">Outcome:</span> {course.outcomes[0]}
                  </div>

                  {/* Specs */}
                  <div className="grid grid-cols-3 gap-2 pt-1 text-xs text-slate-400 border-t border-slate-800/60">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{course.durationHours}h</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      <span>{course.cpdCredits} CPD</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{courseModules.length} Modules</span>
                    </div>
                  </div>

                  {/* Progress Bar if started */}
                  {progressPercent > 0 && (
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400 font-medium">Progress</span>
                        <span className="text-cyan-400 font-bold">{progressPercent}%</span>
                      </div>
                      <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-1.5 rounded-full"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 grid grid-cols-2 gap-3">
                <button
                  onClick={() => onSelectCourse(course)}
                  className="w-full py-2.5 px-3 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-slate-200 text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Overview</span>
                </button>

                <button
                  onClick={() => onStartCourse(course.id)}
                  className="w-full py-2.5 px-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer shadow-md shadow-cyan-500/20"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{progressPercent > 0 ? "Continue" : "Start Course"}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
