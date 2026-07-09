import React from 'react';
import { BookOpen, Award, FileText, Layout, Play, ShieldCheck, HelpCircle, Flame, Zap } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { LearnerProgress } from '../types/academy';
import { computeLevel, computeStreak } from '../services/engagementService';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  studentName?: string;
  learnerProgress?: LearnerProgress;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  studentName = "MSc Desmond Nkefua",
  learnerProgress,
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
        {/* Brand */}
        <div
          onClick={() => setActiveTab('catalog')}
          className="flex items-center space-x-3 cursor-pointer group shrink-0"
        >
          <img
            src="/ndn_3d_logo.png"
            alt="NDN 3D Logo"
            className="w-9 h-9 object-contain rounded-lg border border-cyan-500/40 shadow-md group-hover:scale-105 transition-transform"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80';
            }}
          />
          <div className="whitespace-nowrap">
            <span className="font-extrabold text-white text-base tracking-tight font-display block">
              NDN Analytics
            </span>
            <span className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase block">
              Academy Platform
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center space-x-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id || (activeTab === 'detail' && tab.id === 'catalog');

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
          <div className="mx-1 h-6 w-px bg-slate-800" />
          {routeLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                location.pathname === link.href
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

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

          <Link
            to="/enroll"
            className="hidden lg:inline-flex min-h-10 items-center rounded-lg bg-amber-400 px-4 py-2 text-xs font-black text-slate-950 shadow-lg shadow-amber-500/20 hover:bg-amber-300"
          >
            Enroll Now
          </Link>
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

      {/* Mobile Nav Bar */}
      <div className="md:hidden flex overflow-x-auto border-t border-slate-800/80 px-2 py-1.5 space-x-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1 rounded-md text-[11px] font-bold shrink-0 ${
              activeTab === tab.id ? 'bg-cyan-500 text-slate-950' : 'text-slate-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
        {routeLinks.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className={`px-3 py-1 rounded-md text-[11px] font-bold shrink-0 ${
              location.pathname === link.href ? 'bg-amber-400 text-slate-950' : 'text-slate-300'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
};
