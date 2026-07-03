import React, { useState, useEffect } from 'react';
import { Course, LearnerProgress, LabSubmission, ProjectSubmission, QuizAttempt } from './types/academy';
import { COURSES } from './data/courses';
import {
  getProgress,
  setActiveCourse as saveActiveCourse,
  markLessonComplete as saveLessonComplete,
  saveLabSubmission as saveLabSubmissionStore,
  saveProjectSubmission as saveProjectSubmissionStore,
  recordQuizAttempt as saveQuizAttemptStore,
} from './services/localProgressStore';
import { calculateCourseGrade } from './services/gradingService';

import { Header } from './components/Header';
import { AcademyCatalog } from './components/AcademyCatalog';
import { CourseDetail } from './components/CourseDetail';
import { LessonView } from './components/LessonView';
import { AssessmentEngine } from './components/AssessmentEngine';
import { ProjectWorkbench } from './components/ProjectWorkbench';
import { TranscriptView } from './components/TranscriptView';
import { CertificationsView } from './components/CertificationsView';
import { AiMentorChat } from './components/AiMentorChat';
import { Bot, MessageSquare } from 'lucide-react';

type AppTab = 'catalog' | 'detail' | 'learn' | 'quiz' | 'projects' | 'transcript' | 'certificates';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('catalog');
  const [learnerProgress, setLearnerProgress] = useState<LearnerProgress>(getProgress());
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeQuizId, setActiveQuizId] = useState<string | undefined>(undefined);
  const [aiChatOpen, setAiChatOpen] = useState<boolean>(false);

  // Sync progress state
  useEffect(() => {
    setLearnerProgress(getProgress());
  }, []);

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    setActiveTab('detail');
  };

  const handleStartCourse = (courseId: string) => {
    const targetCourse = COURSES.find(c => c.id === courseId) || COURSES[0];
    setSelectedCourse(targetCourse);
    const updated = saveActiveCourse(courseId);
    setLearnerProgress(updated);
    setActiveTab('learn');
  };

  const handleMarkLessonComplete = (lessonId: string) => {
    const updated = saveLessonComplete(lessonId);
    setLearnerProgress(updated);
  };

  const handleSaveLabSubmission = (submission: LabSubmission) => {
    const updated = saveLabSubmissionStore(submission);
    setLearnerProgress(updated);
  };

  const handleRecordQuizAttempt = (attempt: QuizAttempt) => {
    const updated = saveQuizAttemptStore(attempt);
    setLearnerProgress(updated);
  };

  const handleSaveProjectSubmission = (submission: ProjectSubmission) => {
    const updated = saveProjectSubmissionStore(submission);
    setLearnerProgress(updated);
  };

  const handleOpenQuiz = (quizId: string) => {
    setActiveQuizId(quizId);
    setActiveTab('quiz');
  };

  // Build progress % map for catalog cards
  const progressPercentMap: Record<string, number> = {};
  COURSES.forEach(c => {
    const summary = calculateCourseGrade(c.id, learnerProgress);
    progressPercentMap[c.id] = summary.completionPercent;
  });

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      {/* Background Circuit Grid Accent */}
      <div className="fixed inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none z-0" />

      {/* Header Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => setActiveTab(tab as AppTab)}
        studentName={learnerProgress.studentName}
      />

      {/* Main Container */}
      <main className="flex-1 relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'catalog' && (
          <AcademyCatalog
            onSelectCourse={handleSelectCourse}
            onStartCourse={handleStartCourse}
            activeCourseId={learnerProgress.activeCourseId}
            learnerProgressPercentMap={progressPercentMap}
          />
        )}

        {activeTab === 'detail' && selectedCourse && (
          <CourseDetail
            course={selectedCourse}
            onStartCourse={handleStartCourse}
            onBackToCatalog={() => setActiveTab('catalog')}
            isEnrolled={learnerProgress.activeCourseId === selectedCourse.id}
          />
        )}

        {activeTab === 'learn' && (
          <LessonView
            courseId={learnerProgress.activeCourseId || COURSES[0].id}
            learnerProgress={learnerProgress}
            onMarkLessonComplete={handleMarkLessonComplete}
            onSaveLabSubmission={handleSaveLabSubmission}
            onOpenQuiz={handleOpenQuiz}
            onBackToCatalog={() => setActiveTab('catalog')}
          />
        )}

        {activeTab === 'quiz' && (
          <AssessmentEngine
            quizId={activeQuizId}
            onRecordAttempt={handleRecordQuizAttempt}
            onBackToSyllabus={() => setActiveTab('learn')}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectWorkbench
            learnerProgress={learnerProgress}
            onSaveProjectSubmission={handleSaveProjectSubmission}
          />
        )}

        {activeTab === 'transcript' && (
          <TranscriptView
            learnerProgress={learnerProgress}
          />
        )}

        {activeTab === 'certificates' && (
          <CertificationsView
            learnerProgress={learnerProgress}
          />
        )}
      </main>

      {/* Floating AI Mentor Chat Button / Modal */}
      <div className="fixed bottom-6 right-6 z-50">
        {aiChatOpen ? (
          <div className="w-80 sm:w-96 h-[500px]">
            <AiMentorChat
              learnerProgress={learnerProgress}
              activeCourseId={learnerProgress.activeCourseId}
              onClose={() => setAiChatOpen(false)}
            />
          </div>
        ) : (
          <button
            onClick={() => setAiChatOpen(true)}
            className="p-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-slate-950 font-bold shadow-xl shadow-cyan-500/25 flex items-center space-x-2.5 transition-all hover:scale-105 cursor-pointer"
          >
            <Bot className="w-6 h-6 text-slate-950" />
            <span className="text-xs font-extrabold font-display">AI MENTOR</span>
          </button>
        )}
      </div>
    </div>
  );
}
