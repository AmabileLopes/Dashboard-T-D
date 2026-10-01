import React, { useState, useMemo } from 'react';
import {
  GraduationCap,
  ArrowUpDown,
  Clock,
  User,
  Search,
  X,
  ChevronDown,
  ChevronRight,
  Filter,
} from 'lucide-react';
import {
  DetailedMaker,
  detailedMakersList,
  distributionRangesData,
} from '../data/hoursManagementData';

interface MakerDistributionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MakerDistributionModal: React.FC<MakerDistributionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'geral' | 'gerente'>('geral');
  const [sortBy, setSortBy] = useState<'alpha' | 'hours'>('hours');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRange, setSelectedRange] = useState<string>('all');
  const [expandedManagers, setExpandedManagers] = useState<Record<string, boolean>>({});

  // Filtered and sorted list
  const filteredMakers = useMemo(() => {
    let list = [...detailedMakersList];

    // Filter by search
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.manager.toLowerCase().includes(q) ||
          m.directorate.toLowerCase().includes(q) ||
          m.team.toLowerCase().includes(q)
      );
    }

    // Filter by range
    if (selectedRange !== 'all') {
      list = list.filter((m) => m.range === selectedRange);
    }

    // Sort
    list.sort((a, b) => {
      if (sortBy === 'alpha') return a.name.localeCompare(b.name);
      return b.hours - a.hours;
    });

    return list;
  }, [searchTerm, selectedRange, sortBy]);

  // Grouped by manager
  const groupedByManager = useMemo(() => {
    const map = new Map<string, { manager: string; directorate: string; makers: DetailedMaker[]; totalHours: number }>();

    filteredMakers.forEach((m) => {
      const existing = map.get(m.manager);
      if (!existing) {
        map.set(m.manager, {
          manager: m.manager,
          directorate: m.directorate,
          makers: [m],
          totalHours: m.hours,
        });
      } else {
        existing.makers.push(m);
        existing.totalHours += m.hours;
      }
    });

    const groups = Array.from(map.values());
    groups.sort((a, b) => {
      if (sortBy === 'alpha') return a.manager.localeCompare(b.manager);
      return b.totalHours - a.totalHours;
    });

    return groups;
  }, [filteredMakers, sortBy]);

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
              <GraduationCap size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-purple-700 tracking-tight flex items-center gap-2">
                Detalhamento de Distribuição Maker
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Exploração de faixas: Diretoria &gt; Gerência &gt; Maker
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
                title="Ordenar por Nome Alfabético"
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
                title="Ordenar por Horas"
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

        {/* Tab & Filter Bar */}
        <div className="px-5 py-3 border-b border-slate-100 bg-white flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Segmented Tabs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('geral')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'geral'
                  ? 'bg-[#4f46e5] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Lista Geral
            </button>
            <button
              onClick={() => setActiveTab('gerente')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'gerente'
                  ? 'bg-[#4f46e5] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Agrupado por Gerente
            </button>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5">
              <Filter size={12} className="text-slate-400" />
              <select
                value={selectedRange}
                onChange={(e) => setSelectedRange(e.target.value)}
                className="bg-transparent text-xs text-slate-700 font-medium focus:outline-none cursor-pointer"
              >
                <option value="all">Todas as Faixas</option>
                {distributionRangesData.map((r) => (
                  <option key={r.range} value={r.range}>
                    Faixa: {r.range} ({r.count} makers)
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5">
              <Search size={12} className="text-slate-400" />
              <input
                type="text"
                placeholder="Buscar maker..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent text-xs text-slate-700 placeholder-slate-400 focus:outline-none w-28 sm:w-36"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#fafbfe]">
          {activeTab === 'geral' ? (
            /* Lista Geral */
            <div className="space-y-2.5">
              {filteredMakers.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  Nenhum Maker encontrado com os filtros aplicados.
                </div>
              ) : (
                filteredMakers.map((maker) => (
                  <div
                    key={maker.id}
                    className="p-3.5 sm:p-4 bg-white hover:bg-slate-50 border border-slate-100 rounded-xl transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                  >
                    {/* Left: Avatar + Name + Manager */}
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0">
                        <User size={18} />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
                          {maker.name}
                        </h4>
                        <span className="text-[11px] font-semibold text-slate-400 block uppercase">
                          GERENTE: {maker.manager}
                        </span>
                      </div>
                    </div>

                    {/* Right: Diretoria + Faixa + Hours badge */}
                    <div className="flex flex-wrap items-center justify-between sm:justify-end gap-4 sm:gap-6 pl-12 sm:pl-0">
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                          DIRETORIA
                        </span>
                        <span className="text-[11px] font-semibold text-slate-700">
                          {maker.directorate}
                        </span>
                      </div>

                      <div className="min-w-[65px]">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                          FAIXA
                        </span>
                        <span className="text-[11px] font-bold text-[#4f46e5]">
                          {maker.range}
                        </span>
                      </div>

                      <div>
                        <span className="bg-[#059669] text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow-2xs inline-block">
                          {maker.hours.toFixed(1)}h
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            /* Agrupado por Gerente */
            <div className="space-y-3">
              {groupedByManager.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  Nenhum grupo encontrado com os filtros aplicados.
                </div>
              ) : (
                groupedByManager.map((group) => {
                  const isExpanded = expandedManagers[group.manager] ?? true;
                  return (
                    <div
                      key={group.manager}
                      className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden"
                    >
                      {/* Manager Header */}
                      <div
                        onClick={() =>
                          setExpandedManagers((prev) => ({
                            ...prev,
                            [group.manager]: !isExpanded,
                          }))
                        }
                        className="p-3.5 sm:p-4 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50 transition-colors select-none"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-sm font-bold text-slate-900">
                              Gerente: {group.manager}
                            </span>
                            <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                              {group.makers.length} makers
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-400 font-normal">
                            Diretoria: {group.directorate}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="bg-[#059669] text-white text-xs font-bold px-3 py-1 rounded-full shadow-2xs">
                            {group.totalHours.toFixed(1)}h Totais
                          </span>
                          <button className="text-slate-400 hover:text-slate-600 p-0.5">
                            {isExpanded ? (
                              <ChevronDown size={16} />
                            ) : (
                              <ChevronRight size={16} />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Makers List Inside Manager */}
                      {isExpanded && (
                        <div className="px-3 pb-3 pt-1 space-y-1.5 border-t border-slate-100 bg-slate-50/50">
                          {group.makers.map((maker) => (
                            <div
                              key={maker.id}
                              className="p-2.5 bg-white hover:bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-between gap-2 text-xs"
                            >
                              <div className="flex items-center gap-2">
                                <User size={13} className="text-slate-400" />
                                <span className="font-bold text-slate-800">
                                  {maker.name}
                                </span>
                              </div>

                              <div className="flex items-center gap-3">
                                <span className="text-[11px] font-semibold text-[#4f46e5]">
                                  Faixa: {maker.range}
                                </span>
                                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-md">
                                  {maker.hours.toFixed(1)}h
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-white flex items-center justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
          >
            Fechar Detalhamento
          </button>
        </div>
      </div>
    </div>
  );
};
