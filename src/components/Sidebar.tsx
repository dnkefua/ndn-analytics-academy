import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, Layout, Play, Award, FileText, CheckCircle2, Rocket, Menu, X, RocketIcon, ChevronDown, ChevronRight, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { curriculumWeeks } from '../data/curriculum';

interface SidebarProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [curriculumOpen, setCurriculumOpen] = React.useState(
    location.pathname.includes('/curriculum') || location.pathname.includes('/week-')
  );

  const [resourcesOpen, setResourcesOpen] = React.useState(
    location.pathname.includes('/certificate-preview') || location.pathname.includes('/student-dashboard')
  );

  React.useEffect(() => {
    if (location.pathname.includes('/curriculum') || location.pathname.includes('/week-')) {
      setCurriculumOpen(true);
    }
  }, [location.pathname]);

  React.useEffect(() => {
    if (location.pathname.includes('/certificate-preview') || location.pathname.includes('/student-dashboard')) {
      setResourcesOpen(true);
    }
  }, [location.pathname]);

  const platformTabs = [
    { id: 'catalog', label: 'Course Catalog', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'learn', label: 'My Learning', icon: <Play className="w-5 h-5" /> },
    { id: 'quiz', label: 'Assessments', icon: <CheckCircle2 className="w-5 h-5" /> },
    { id: 'projects', label: 'Projects Workbench', icon: <Layout className="w-5 h-5" /> },
    { id: 'transcript', label: 'Transcript', icon: <FileText className="w-5 h-5" /> },
    { id: 'certificates', label: 'Certificates', icon: <Award className="w-5 h-5" /> },
  ];

  const handleTabClick = (id: string) => {
    if (location.pathname !== '/' && location.pathname !== '/courses') {
      navigate(`/?tab=${id}`);
    } else if (setActiveTab) {
      setActiveTab(id);
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-950/95 border-r border-white/10 backdrop-blur-xl flex flex-col h-full transition-transform duration-300 ease-in-out lg:translate-x-0 lg:flex ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
          <Link to="/" className="flex items-center gap-3">
            <img src="/ndn_3d_logo.png" alt="NDN" className="h-8 w-8 rounded-lg" />
            <span className="font-black text-white text-sm tracking-tight font-display">NDN Academy</span>
          </Link>
          <button onClick={() => setIsOpen(false)} className="p-2 text-slate-400 hover:text-white lg:hidden">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-8">
          
          {/* Academy Platform Section */}
          <div>
            <p className="px-3 mb-2 text-xs font-black uppercase tracking-widest text-slate-500">Platform</p>
            <nav className="space-y-1">
              {platformTabs.map((tab) => {
                const isActive = activeTab === tab.id || (activeTab === 'detail' && tab.id === 'catalog');
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      isActive
                        ? 'bg-cyan-500/15 text-cyan-400 shadow-[inset_0_0_0_1px_rgba(6,182,212,0.3)]'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Marketing & Enrollment Section */}
          <div>
            <p className="px-3 mb-2 text-xs font-black uppercase tracking-widest text-slate-500">Programs</p>
            <nav className="space-y-1">
              {/* Home Link */}
              <Link
                to="/cohort-1"
                onClick={() => setIsOpen(false)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  location.pathname === '/cohort-1'
                    ? 'bg-amber-500/15 text-amber-400 shadow-[inset_0_0_0_1px_rgba(245,180,0,0.3)]'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                }`}
              >
                <Home className="w-5 h-5" />
                Home (Cohort 1)
              </Link>

              {/* Curriculum Expandable Dropdown */}
              <div className="space-y-1">
                <div className="flex items-center justify-between w-full rounded-xl transition-all overflow-hidden">
                  <Link
                    to="/courses/ai-mvp-builder-africa/curriculum"
                    onClick={() => {
                      setIsOpen(false);
                      setCurriculumOpen(true);
                    }}
                    className={`flex-1 flex items-center gap-3 px-3 py-2.5 text-sm font-bold transition-all ${
                      location.pathname === '/courses/ai-mvp-builder-africa/curriculum'
                        ? 'bg-amber-500/15 text-amber-400 border-l border-y border-amber-500/30'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                    }`}
                  >
                    <BookOpen className="w-5 h-5" />
                    Curriculum
                  </Link>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setCurriculumOpen(!curriculumOpen);
                    }}
                    className={`px-3 py-2.5 transition-all text-slate-400 hover:text-slate-100 hover:bg-white/5 h-[40px] flex items-center justify-center ${
                      location.pathname === '/courses/ai-mvp-builder-africa/curriculum'
                        ? 'bg-amber-500/15 text-amber-400 border-r border-y border-amber-500/30'
                        : ''
                    }`}
                  >
                    {curriculumOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                </div>

                {/* Sub-menu Weeks */}
                {curriculumOpen && (
                  <div className="pl-4 pr-1 py-1 space-y-1 ml-5 border-l border-white/10">
                    {curriculumWeeks.map((week) => {
                      const isWeekActive = location.pathname === week.route;
                      return (
                        <Link
                          key={week.slug}
                          to={week.route}
                          onClick={() => setIsOpen(false)}
                          className={`block px-3 py-2 rounded-lg text-xs font-semibold transition-all truncate ${
                            isWeekActive
                              ? 'bg-cyan-500/15 text-cyan-400 shadow-[inset_0_0_0_1px_rgba(6,182,212,0.3)]'
                              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                          }`}
                          title={week.previewTitle}
                        >
                          Week {week.week}: {week.title}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Resources Expandable Dropdown */}
              <div className="space-y-1">
                <button
                  onClick={() => setResourcesOpen(!resourcesOpen)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    location.pathname === '/certificate-preview' || location.pathname === '/student-dashboard'
                      ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-3 font-bold text-sm">
                    <FileText className="w-5 h-5" />
                    Resources
                  </span>
                  {resourcesOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>

                {/* Sub-menu Resources */}
                {resourcesOpen && (
                  <div className="pl-4 pr-1 py-1 space-y-1 ml-5 border-l border-white/10">
                    <Link
                      to="/student-dashboard"
                      onClick={() => setIsOpen(false)}
                      className={`block px-3 py-2 rounded-lg text-xs font-semibold transition-all truncate ${
                        location.pathname === '/student-dashboard'
                          ? 'bg-cyan-500/15 text-cyan-400 shadow-[inset_0_0_0_1px_rgba(6,182,212,0.3)]'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                      }`}
                    >
                      Student Dashboard
                    </Link>
                    <Link
                      to="/certificate-preview"
                      onClick={() => setIsOpen(false)}
                      className={`block px-3 py-2 rounded-lg text-xs font-semibold transition-all truncate ${
                        location.pathname === '/certificate-preview'
                          ? 'bg-cyan-500/15 text-cyan-400 shadow-[inset_0_0_0_1px_rgba(6,182,212,0.3)]'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                      }`}
                    >
                      Certificate Preview
                    </Link>
                  </div>
                )}
              </div>

              {/* Enroll Now Link */}
              <Link
                to="/enroll"
                onClick={() => setIsOpen(false)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  location.pathname === '/enroll'
                    ? 'bg-amber-500/15 text-amber-400 shadow-[inset_0_0_0_1px_rgba(245,180,0,0.3)]'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                }`}
              >
                <Play className="w-5 h-5" />
                Enroll Now
              </Link>
            </nav>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10">
          <a
            href="https://www.ndnanalytics.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-slate-400 hover:text-slate-100 hover:bg-white/5 transition-all"
          >
            <RocketIcon className="w-4 h-4" />
            NDN Analytics Inc.
          </a>
        </div>
      </aside>
    </>
  );
};
