import React, { useState, useMemo } from 'react';
import {
  X,
  ChevronDown,
  ChevronRight,
  Briefcase,
  Users,
  User,
  GraduationCap,
  Clock,
  ArrowUpDown,
  Search,
  FolderTree,
} from 'lucide-react';
import {
  HierarchicalVertical,
  hierarchicalExplorerData,
} from '../data/hoursManagementData';

interface MakerTrainingExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MakerTrainingExplorerModal: React.FC<
  MakerTrainingExplorerModalProps
> = ({ isOpen, onClose }) => {
  const [sortBy, setSortBy] = useState<'alpha' | 'hours'>('hours');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedVerticals, setExpandedVerticals] = useState<Record<string, boolean>>({
    'ALCEU FERNANDO KELLER': true,
  });
  const [expandedManagers, setExpandedManagers] = useState<Record<string, boolean>>({
    'Alceu Keller': true,
  });
  const [expandedTeams, setExpandedTeams] = useState<Record<string, boolean>>({
    'Sem Time (Matriz)': true,
  });

  const toggleVertical = (name: string) => {
    setExpandedVerticals((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const toggleManager = (name: string) => {
    setExpandedManagers((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const toggleTeam = (name: string) => {
    setExpandedTeams((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  // Process data with search and sorting
  const processedData = useMemo(() => {
    let data = JSON.parse(JSON.stringify(hierarchicalExplorerData)) as HierarchicalVertical[];

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      data = data
        .map((v) => {
          const matchV = v.verticalName.toLowerCase().includes(q);
          const filteredManagers = v.managers
            .map((m) => {
              const matchM = m.managerName.toLowerCase().includes(q);
              const filteredTeams = m.teams
                .map((t) => {
                  const matchT = t.teamName.toLowerCase().includes(q);
                  const filteredMakers = t.makers.filter(
                    (maker) =>
                      matchV ||
                      matchM ||
                      matchT ||
                      maker.name.toLowerCase().includes(q)
                  );
                  return { ...t, makers: filteredMakers };
                })
                .filter((t) => t.makers.length > 0 || matchV || matchM);
              return { ...m, teams: filteredTeams };
            })
            .filter((m) => m.teams.length > 0 || matchV);
          return { ...v, managers: filteredManagers };
        })
        .filter((v) => v.managers.length > 0);
    }

    // Sort verticals
    data.sort((a, b) => {
      if (sortBy === 'alpha') return a.verticalName.localeCompare(b.verticalName);
      return b.totalHours - a.totalHours;
    });

    // Sort managers and teams inside
    data.forEach((v) => {
      v.managers.sort((a, b) => {
        if (sortBy === 'alpha') return a.managerName.localeCompare(b.managerName);
        return b.totalHours - a.totalHours;
      });
      v.managers.forEach((m) => {
        m.teams.sort((a, b) => {
          if (sortBy === 'alpha') return a.teamName.localeCompare(b.teamName);
          return b.totalHours - a.totalHours;
        });
        m.teams.forEach((t) => {
          t.makers.sort((a, b) => {
            if (sortBy === 'alpha') return a.name.localeCompare(b.name);
            return b.hours - a.hours;
          });
        });
      });
    });

    return data;
  }, [sortBy, searchTerm]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-5"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
              <FolderTree size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-purple-700 tracking-tight flex items-center gap-2">
                Explorador de Treinamentos por Maker
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Visão detalhada das horas de treinamento: Vertical &gt; Gerente &gt; Time &gt; Maker
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            {/* Sort Toggle */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setSortBy('alpha')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  sortBy === 'alpha'
                    ? 'bg-white text-purple-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Ordenar por Ordem Alfabética"
              >
                <ArrowUpDown size={12} />
                <span>A-Z</span>
              </button>
              <button
                onClick={() => setSortBy('hours')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  sortBy === 'hours'
                    ? 'bg-white text-purple-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Ordenar por Total de Horas"
              >
                <Clock size={12} />
                <span>HORAS</span>
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 px-3 py-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-5 py-3 bg-slate-50/70 border-b border-slate-100 flex items-center gap-2">
          <Search size={14} className="text-slate-400" />
          <input
            type="text"
            placeholder="Filtrar por nome do Maker, Gerente, Time ou Vertical..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Tree Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 bg-[#fafbfe]">
          {processedData.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              Nenhum registro encontrado para &quot;{searchTerm}&quot;.
            </div>
          ) : (
            processedData.map((vertical) => {
              const isVExpanded = !!expandedVerticals[vertical.verticalName];
              return (
                <div
                  key={vertical.verticalName}
                  className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden transition-all"
                >
                  {/* Vertical Header (Level 1) */}
                  <div
                    onClick={() => toggleVertical(vertical.verticalName)}
                    className="p-3.5 sm:p-4 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50/80 transition-colors select-none"
                  >
                    <div className="flex items-center gap-2.5">
                      <Briefcase size={16} className="text-purple-600 shrink-0" />
                      <span className="text-xs sm:text-sm font-bold text-slate-900">
                        Vertical: {vertical.verticalName}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="bg-[#4f46e5] text-white text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full shadow-2xs">
                        {vertical.totalHours.toFixed(1)}h Totais
                      </span>
                      <span className="bg-slate-100 text-slate-700 text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                        <GraduationCap size={13} className="text-slate-500" />
                        {vertical.totalCourses}
                      </span>
                      <button className="text-slate-400 hover:text-slate-600 p-0.5">
                        {isVExpanded ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronRight size={16} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Level 2: Managers */}
                  {isVExpanded && (
                    <div className="px-3 sm:px-5 pb-3.5 pt-1 space-y-2.5 border-t border-slate-100 bg-[#fbfcfe]">
                      {vertical.managers.map((manager) => {
                        const isMExpanded =
                          expandedManagers[manager.managerName] ?? true;
                        return (
                          <div
                            key={manager.managerName}
                            className="bg-white rounded-lg border border-slate-200/60 overflow-hidden"
                          >
                            {/* Manager Row */}
                            <div
                              onClick={() => toggleManager(manager.managerName)}
                              className="p-3 flex items-center justify-between gap-2 cursor-pointer hover:bg-slate-50 transition-colors select-none"
                            >
                              <div className="flex items-center gap-2">
                                <Users size={14} className="text-slate-500 shrink-0" />
                                <span className="text-xs font-semibold text-slate-800">
                                  Gerente: {manager.managerName}
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                <span className="bg-blue-600 text-white text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                                  {manager.totalHours.toFixed(1)}h
                                </span>
                                <span className="bg-slate-100 text-slate-600 text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                                  <GraduationCap size={11} className="text-slate-400" />
                                  {manager.totalCourses}
                                </span>
                                {isMExpanded ? (
                                  <ChevronDown size={14} className="text-slate-400" />
                                ) : (
                                  <ChevronRight size={14} className="text-slate-400" />
                                )}
                              </div>
                            </div>

                            {/* Level 3: Teams */}
                            {isMExpanded && (
                              <div className="px-3 pb-3 pt-1 space-y-2 bg-slate-50/50 border-t border-slate-100">
                                {manager.teams.map((team) => {
                                  const isTExpanded =
                                    expandedTeams[team.teamName] ?? true;
                                  return (
                                    <div
                                      key={team.teamName}
                                      className="bg-white rounded-md border border-slate-200/50 p-2.5"
                                    >
                                      {/* Team Row */}
                                      <div
                                        onClick={() => toggleTeam(team.teamName)}
                                        className="flex items-center justify-between gap-2 cursor-pointer select-none mb-1.5"
                                      >
                                        <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-md">
                                          {team.teamName}
                                        </span>
                                        <div className="flex items-center gap-2">
                                          <span className="text-[10px] font-bold text-slate-600">
                                            {team.totalHours.toFixed(1)}h
                                          </span>
                                          <span className="bg-slate-100 text-slate-600 text-[10px] px-1.5 py-0.5 rounded-md flex items-center gap-1">
                                            <GraduationCap size={10} />
                                            {team.totalCourses}
                                          </span>
                                          {isTExpanded ? (
                                            <ChevronDown size={12} className="text-slate-400" />
                                          ) : (
                                            <ChevronRight size={12} className="text-slate-400" />
                                          )}
                                        </div>
                                      </div>

                                      {/* Level 4: Makers */}
                                      {isTExpanded && (
                                        <div className="pl-2 pt-1.5 space-y-1.5 border-t border-slate-100">
                                          {team.makers.map((maker) => (
                                            <div
                                              key={maker.id}
                                              className="flex items-center justify-between gap-2 p-1.5 hover:bg-slate-50 rounded transition-colors"
                                            >
                                              <div className="flex items-center gap-2">
                                                <User size={13} className="text-slate-400 shrink-0" />
                                                <span className="text-[11px] sm:text-xs font-bold text-slate-800">
                                                  {maker.name}
                                                </span>
                                              </div>

                                              <div className="flex items-center gap-2">
                                                <span className="bg-[#059669] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-2xs">
                                                  {maker.hours.toFixed(1)}h
                                                </span>
                                                <span className="bg-slate-100 text-slate-600 text-[10px] font-medium px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                                                  <GraduationCap size={10} className="text-slate-400" />
                                                  {maker.coursesCount}
                                                </span>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500 font-normal">
            Organize por ordem alfabética ou por volume de horas
          </span>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
          >
            Fechar Explorador
          </button>
        </div>
      </div>
    </div>
  );
};
