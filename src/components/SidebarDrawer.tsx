import React from 'react';

interface SidebarDrawerProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  operatorAvatar: string;
}

export default function SidebarDrawer({ currentTab, onTabChange, operatorAvatar }: SidebarDrawerProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Network Status', icon: 'hub' },
    { id: 'portfolio', label: 'Portfolios', icon: 'folder_special', active: true },
    { id: 'academy', label: 'Academy Curriculum', icon: 'school' },
    { id: 'logs', label: 'System Logs', icon: 'terminal' },
  ];

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-full w-80 bg-surface-container-low border-r border-circuit-line flex-col overflow-y-auto z-50">
      <div className="p-8 border-b border-circuit-line">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center border border-circuit-line shadow-[0_0_15px_rgba(6,182,212,0.1)]">
            <span className="material-symbols-outlined text-neon-cyan text-2xl font-bold">memory</span>
          </div>
          <div>
            <h1 className="font-display text-xl font-extrabold text-neon-cyan leading-none">NDN</h1>
            <p className="text-[10px] font-mono font-bold tracking-widest text-on-surface-variant opacity-50">ANALYTICS</p>
          </div>
        </div>

        {/* User Card */}
        <div className="flex items-center gap-3 p-3 bg-surface-container rounded-xl border border-circuit-line">
          <div className="w-10 h-10 rounded bg-neon-cyan/20 flex items-center justify-center overflow-hidden border border-neon-cyan/20">
            <img 
              className="w-full h-full object-cover" 
              src={operatorAvatar} 
              alt="Operator Profile" 
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-mono text-xs font-bold text-neon-cyan truncate">OPERATOR_01</p>
            <p className="text-[9px] font-mono text-on-surface-variant">Blockchain Architect</p>
          </div>
          <span className="text-[9px] font-mono font-bold text-neon-cyan/50">[ LVL 4 ]</span>
        </div>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-2 font-mono">
        {menuItems.map((item) => {
          const isCurrentTab = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 text-left transition-all rounded-lg group cursor-pointer ${
                isCurrentTab
                  ? 'bg-secondary-container text-white font-bold border-l-4 border-neon-cyan shadow-[0_0_15px_rgba(96,1,209,0.3)]'
                  : 'text-on-surface-variant hover:bg-circuit-line/50 hover:text-neon-cyan'
              }`}
            >
              <span className={`material-symbols-outlined text-xl ${isCurrentTab ? 'text-neon-cyan' : 'group-hover:text-neon-cyan'}`}>
                {item.icon}
              </span>
              <span className="text-xs font-bold tracking-wider uppercase">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-6 mt-auto border-t border-circuit-line bg-surface-container-lowest">
        <div className="flex items-center justify-between text-[10px] font-mono font-bold text-neon-cyan/40 mb-2">
          <span>API UPTIME</span>
          <span>[ 99.99% ]</span>
        </div>
        <div className="h-1 bg-circuit-line rounded-full overflow-hidden">
          <div className="h-full bg-neon-cyan w-[99.99%] shadow-[0_0_10px_#06b6d4]"></div>
        </div>
      </div>
    </aside>
  );
}
