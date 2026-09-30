import React from 'react';
import {
  LayoutGrid,
  Clock,
  BookOpen,
  Lock,
  ChevronLeft,
  ChevronRight,
  User,
  LogOut,
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  collapsed,
  setCollapsed,
}) => {
  const menuItems = [
    { id: 'treinamentos', label: 'Gestão de Treinamentos', icon: LayoutGrid },
    { id: 'horas', label: 'Gestão Horas Maker', icon: Clock },
    { id: 'trilhas', label: 'Trilhas de Treinamento', icon: BookOpen },
    { id: 'restrita', label: 'Área Restrita', icon: Lock },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-[#0d1322] text-slate-300 z-30 transition-all duration-300 flex flex-col justify-between border-r border-[#1a233a] shadow-xl ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Header & Logo */}
      <div>
        <div className="h-16 px-4 flex items-center justify-between border-b border-[#172036]">
          {!collapsed && (
            <div className="flex items-center gap-2 select-none">
              {/* NDD custom stylized logo */}
              <div className="flex items-baseline font-black tracking-tight text-3xl">
                <span className="text-[#00e1d9] font-bold">n</span>
                <span className="text-[#00d0c4] font-bold">d</span>
                <span className="text-[#00b4d8] font-bold">d</span>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="w-full flex justify-center">
              <span className="text-[#00e1d9] font-black text-2xl">ndd</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1a243d] transition-colors"
            title={collapsed ? 'Expandir menu' : 'Recolher menu'}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1.5 mt-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#182749] text-white shadow-sm border border-[#2b447e]/50'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#131b2e]'
                } ${collapsed ? 'justify-center px-0' : ''}`}
                title={collapsed ? item.label : undefined}
              >
                <Icon
                  size={19}
                  className={isActive ? 'text-[#38bdf8]' : 'text-slate-400'}
                />
                {!collapsed && (
                  <span className="truncate">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile & Version */}
      <div className="p-4 border-t border-[#172036] space-y-3">
        <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-9 h-9 rounded-full bg-[#1b263b] border border-[#2b3a56] flex items-center justify-center text-slate-300 shrink-0">
            <User size={18} />
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white truncate">
                Olá, Amabile Ouriques
              </p>
              <button
                onClick={() => alert('Sessão encerrada com sucesso.')}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-rose-400 transition-colors mt-0.5"
              >
                <LogOut size={12} />
                <span>Sair</span>
              </button>
            </div>
          )}
        </div>

        {!collapsed && (
          <div className="pt-2 text-center">
            <span className="text-[11px] text-slate-500 font-mono tracking-wider">
              v1.0.0 © 2026
            </span>
          </div>
        )}
      </div>
    </aside>
  );
};
