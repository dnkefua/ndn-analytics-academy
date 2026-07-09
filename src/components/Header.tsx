import React from 'react';
import { BookOpen, Award, FileText, Layout, Play, ShieldCheck, HelpCircle, Flame, Zap, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { UniswapButton } from './ui/UniswapButton';
import { LearnerProgress } from '../types/academy';
import { computeLevel, computeStreak } from '../services/engagementService';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  studentName?: string;
  learnerProgress?: LearnerProgress;
  setSidebarOpen?: (isOpen: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  studentName = "MSc Desmond Nkefua",
  learnerProgress,
  setSidebarOpen,
}) => {
  const location = useLocation();
  const level = learnerProgress ? computeLevel(learnerProgress) : null;
  const streak = learnerProgress ? computeStreak(learnerProgress) : null;
  const tabs = [
    { id: 'catalog', label: 'Courses' },
    { id: 'learn', label: 'My Learning' },
    { id: 'quiz', label: 'Assessments' },
    { id: 'projects', label: 'Projects' },
    { id: 'transcript', label: 'Transcript' },
    { id: 'certificates', label: 'Certificates' },
  ];
  const routeLinks = [
    { href: '/cohort-1', label: 'Cohort 1' },
    { href: '/courses/ai-mvp-builder-africa/curriculum', label: 'Curriculum' },
    { href: '/enroll', label: 'Enroll' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800 shadow-lg font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-16 py-2 flex flex-wrap items-center justify-between gap-y-2 gap-x-4">
        {/* Mobile Hamburger Toggle & Brand */}
        <div className="flex items-center gap-4">
          {setSidebarOpen && (
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          <div className="lg:hidden flex items-center gap-2">
            <span className="font-extrabold text-white text-sm tracking-tight font-display">
              NDN Academy
            </span>
          </div>
        </div>

        {/* Engagement + Learner Profile */}
        <div className="flex items-center space-x-3">
          {/* Daily streak (Duolingo-style loss-aversion mechanic) */}
          {streak && (
            <div
              className={`hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl border transition-all ${
                streak.activeToday
                  ? 'bg-orange-500/15 border-orange-500/40'
                  : 'bg-slate-900 border-slate-800'
              }`}
              title={streak.activeToday
                ? `${streak.current}-day streak — you've studied today!`
                : `${streak.current}-day streak — study today to keep it alive`}
            >
              <Flame className={`w-4 h-4 ${streak.activeToday ? 'text-orange-400' : 'text-slate-500'}`} />
              <span className={`text-sm font-extrabold ${streak.activeToday ? 'text-orange-300' : 'text-slate-400'}`}>
                {streak.current}
              </span>
            </div>
          )}

          {/* XP level (Khan Academy-style points) */}
          {level && (
            <div
              className="hidden sm:flex items-center space-x-2 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800"
              title={`Level ${level.level} ${level.title} — ${level.totalXP.toLocaleString()} XP (${level.xpIntoLevel}/${level.xpForNextLevel} into this level)`}
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <div className="leading-none">
                <span className="text-xs font-extrabold text-white block">Lv {level.level}</span>
                <span className="block w-14 h-1 mt-1 rounded-full bg-slate-800 overflow-hidden">
                  <span
                    className="block h-full bg-gradient-to-r from-amber-500 to-amber-300"
                    style={{ width: `${level.progressPct}%` }}
                  />
                </span>
              </div>
            </div>
          )}

          <UniswapButton
            to="/enroll"
            variant="gold"
            size="sm"
            className="hidden lg:inline-flex shadow-lg shadow-[#F5B400]/20"
          >
            Enroll Now
          </UniswapButton>
          <div className="text-right hidden lg:block">
            <span className="text-xs font-bold text-white block">{studentName}</span>
            <span className="text-[10px] text-emerald-400 font-semibold block">
              {level ? `${level.title} · ${level.totalXP.toLocaleString()} XP` : 'Verified Student'}
            </span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500 p-0.5 shadow-md">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-xs font-bold text-cyan-300">
              DN
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
