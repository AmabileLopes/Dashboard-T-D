import React, { useState, useMemo } from 'react';
import {
  Users,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Trophy,
  BarChart2,
  BookOpen,
  UserCheck,
  ChevronRight,
  Download,
  Search,
  ArrowUpDown,
  Moon,
  Sun,
  Filter,
} from 'lucide-react';
import {
  directorateData,
  allCollaboratorsList,
  managerTrackData,
  moduleTrackData,
  CollaboratorProgress,
} from '../data/trainingTracksData';

interface TrainingTracksViewProps {
  onSelectTrack?: (msg: string) => void;
}

type TabType = 'visao-geral' | 'colaboradores' | 'por-gestor' | 'trilhas-modulos';
type StatusFilter = 'todos' | 'verde' | 'amarelo' | 'vermelho' | 'zerados';

export const TrainingTracksView: React.FC<TrainingTracksViewProps> = ({
  onSelectTrack,
}) => {
  const [currentTab, setCurrentTab] = useState<TabType>('visao-geral');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Filters
  const [selectedSetor, setSelectedSetor] = useState('Todos');
  const [selectedGestor, setSelectedGestor] = useState('Todos');

  // Tab 1 Drilldown State (Visão Geral - Conclusão por Diretoria)
  // Level 0: Directorships, Level 1: Managers, Level 2: Team members
  const [drilldownLevel, setDrilldownLevel] = useState<0 | 1 | 2>(0);
  const [selectedManagerIdx, setSelectedManagerIdx] = useState<number | null>(null);

  // Tab 2 Colaboradores Filter & Sorting
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('todos');
  const [searchColab, setSearchColab] = useState('');
  const [colabSortField, setColabSortField] = useState<keyof CollaboratorProgress>('completionPct');
  const [colabSortAsc, setColabSortAsc] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 25;

  // Tab 3 Por Gestor Sorting
  const [managerSortField, setManagerSortField] = useState<'averagePct' | 'managerName' | 'studentsCount' | 'zeradosCount'>('averagePct');
  const [managerSortAsc, setManagerSortAsc] = useState<boolean>(false);

  // Filtered & sorted collaborators list
  const filteredCollaborators = useMemo(() => {
    let list = [...allCollaboratorsList];

    // Top dropdown filters
    if (selectedSetor !== 'Todos') {
      list = list.filter((c) => c.sector === selectedSetor);
    }
    if (selectedGestor !== 'Todos') {
      list = list.filter((c) => c.manager === selectedGestor);
    }

    // Status pill filter
    if (statusFilter === 'verde') {
      list = list.filter((c) => c.status === 'verde');
    } else if (statusFilter === 'amarelo') {
      list = list.filter((c) => c.status === 'amarelo');
    } else if (statusFilter === 'vermelho') {
      list = list.filter((c) => c.status === 'vermelho');
    } else if (statusFilter === 'zerados') {
      list = list.filter((c) => c.approvedCount === 0);
    }

    // Text search
    if (searchColab.trim()) {
      const q = searchColab.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.manager.toLowerCase().includes(q) ||
          c.sector.toLowerCase().includes(q)
      );
    }

    // Sorting
    list.sort((a, b) => {
      let aVal = a[colabSortField];
      let bVal = b[colabSortField];
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return colabSortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return colabSortAsc ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });

    return list;
  }, [selectedSetor, selectedGestor, statusFilter, searchColab, colabSortField, colabSortAsc]);

  // Export CSV handler
  const handleExportCSV = () => {
    const headers = ['Nome', '% Conclusão', 'Aprovados', 'Total', 'Status', 'Setor', 'Gestor'];
    const rows = filteredCollaborators.map((c) => [
      `"${c.name}"`,
      `"${c.completionPct.toFixed(1)}%"`,
      c.approvedCount,
      c.totalCount,
      `"${c.status}"`,
      `"${c.sector}"`,
      `"${c.manager}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(';'), ...rows.map((e) => e.join(';'))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `indicador_colaboradores_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (onSelectTrack) {
      onSelectTrack('Arquivo CSV exportado com sucesso!');
    }
  };

  // Toggle sort for Colaboradores
  const handleSortColab = (field: keyof CollaboratorProgress) => {
    if (colabSortField === field) {
      setColabSortAsc(!colabSortAsc);
    } else {
      setColabSortField(field);
      setColabSortAsc(false);
    }
    setCurrentPage(1);
  };

  return (
    <div className={`space-y-6 ${isDarkMode ? 'dark' : ''}`}>
      {/* 1. Top Header & Filters Bar */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          {/* Left Title + Dark mode toggle */}
          <div className="flex items-center gap-3.5">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-700 bg-white hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer shrink-0"
              title={isDarkMode ? 'Modo Claro' : 'Modo Escuro'}
            >
              {isDarkMode ? <Sun size={18} className="text-amber-500" /> : <Moon size={18} />}
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Trilhas de Treinamento
              </h1>
              <p className="text-xs text-slate-400 font-normal mt-0.5">
                Última atualização: 17/09/2026 15:41
              </p>
            </div>
          </div>

          {/* Right Setor / Gestor Filters */}
          <div className="flex items-center gap-3 self-end sm:self-center">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                SETOR
              </label>
              <select
                value={selectedSetor}
                onChange={(e) => setSelectedSetor(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-purple-400 cursor-pointer shadow-2xs min-w-[140px]"
              >
                <option value="Todos">Todos</option>
                <option value="PROJETOS NDD FRETE">PROJETOS NDD FRETE</option>
                <option value="GER.SUPORTE FISCAL">GER.SUPORTE FISCAL</option>
                <option value="Implantacao Nigeria">Implantacao Nigeria</option>
                <option value="Suporte.i-docs I">Suporte.i-docs I</option>
                <option value="Coord.Prod.Doc.E">Coord.Prod.Doc.E</option>
                <option value="GC FISCAL">GC FISCAL</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                GESTOR
              </label>
              <select
                value={selectedGestor}
                onChange={(e) => setSelectedGestor(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-purple-400 cursor-pointer shadow-2xs min-w-[140px]"
              >
                <option value="Todos">Todos</option>
                <option value="Paulo Pereira">Paulo Pereira</option>
                <option value="Olinto Vertuoso">Olinto Vertuoso</option>
                <option value="Alik Votisch">Alik Votisch</option>
                <option value="Thiago Comel">Thiago Comel</option>
                <option value="Flavia Morgenstern">Flavia Morgenstern</option>
                <option value="Jackson Cenci">Jackson Cenci</option>
                <option value="Ricardo Vieira">Ricardo Vieira</option>
                <option value="Rodrigo Souza">Rodrigo Souza</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-5 border-t border-slate-100">
          <button
            onClick={() => setCurrentTab('visao-geral')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              currentTab === 'visao-geral'
                ? 'bg-[#4f46e5] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BarChart2 size={14} />
            <span>Visão Geral</span>
          </button>

          <button
            onClick={() => setCurrentTab('colaboradores')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              currentTab === 'colaboradores'
                ? 'bg-[#4f46e5] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Users size={14} />
            <span>Colaboradores</span>
          </button>

          <button
            onClick={() => setCurrentTab('por-gestor')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              currentTab === 'por-gestor'
                ? 'bg-[#4f46e5] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <UserCheck size={14} />
            <span>Por Gestor</span>
          </button>

          <button
            onClick={() => setCurrentTab('trilhas-modulos')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              currentTab === 'trilhas-modulos'
                ? 'bg-[#4f46e5] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BookOpen size={14} />
            <span>Trilhas &amp; Módulos</span>
          </button>
        </div>
      </div>

      {/* 2. Top 5 KPI Cards Row (Identical across all 4 screens) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {/* Card 1: Colaboradores */}
        <div className="bg-white rounded-2xl border border-slate-100 border-t-2 border-t-blue-500 p-4 shadow-xs flex items-center gap-3.5 hover:shadow-sm transition">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Users size={19} />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 font-medium block">
              Colaboradores
            </span>
            <div className="text-2xl font-black text-[#1d4ed8] tabular-nums tracking-tight">
              235
            </div>
            <span className="text-[10px] text-slate-400 block">
              participantes
            </span>
          </div>
        </div>

        {/* Card 2: % Conclusão Geral */}
        <div className="bg-white rounded-2xl border border-slate-100 border-t-2 border-t-emerald-500 p-4 shadow-xs flex items-center gap-3.5 hover:shadow-sm transition">
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 size={19} />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 font-medium block">
              % Conclusão Geral
            </span>
            <div className="text-2xl font-black text-[#10b981] tabular-nums tracking-tight">
              7.7%
            </div>
            <span className="text-[10px] text-slate-400 block">
              54 aprovados
            </span>
          </div>
        </div>

        {/* Card 3: Zerados */}
        <div className="bg-white rounded-2xl border border-slate-100 border-t-2 border-t-rose-500 p-4 shadow-xs flex items-center gap-3.5 hover:shadow-sm transition">
          <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
            <AlertTriangle size={19} />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 font-medium block">
              Zerados
            </span>
            <div className="text-2xl font-black text-[#ef4444] tabular-nums tracking-tight">
              209
            </div>
            <span className="text-[10px] text-slate-400 block">
              sem nenhum aprovado
            </span>
          </div>
        </div>

        {/* Card 4: Em Andamento */}
        <div className="bg-white rounded-2xl border border-slate-100 border-t-2 border-t-amber-500 p-4 shadow-xs flex items-center gap-3.5 hover:shadow-sm transition">
          <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
            <Clock size={19} />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 font-medium block">
              Em Andamento
            </span>
            <div className="text-2xl font-black text-[#f59e0b] tabular-nums tracking-tight">
              0
            </div>
            <span className="text-[10px] text-slate-400 block">
              itens em progresso
            </span>
          </div>
        </div>

        {/* Card 5: Top Performer */}
        <div className="bg-white rounded-2xl border border-slate-100 border-t-2 border-t-purple-500 p-4 shadow-xs flex items-center gap-3.5 hover:shadow-sm transition">
          <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Trophy size={19} />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] text-slate-500 font-medium block">
              Top Performer
            </span>
            <div className="text-2xl font-black text-[#7c3aed] tabular-nums tracking-tight">
              100%
            </div>
            <span className="text-[10px] text-slate-400 block truncate" title="Ednilson Scopel - Expert">
              Ednilson Scopel - Expert
            </span>
          </div>
        </div>
      </div>

      {/* 3. TAB 1: VISÃO GERAL (Conclusão por Diretoria com Drilldown de 3 níveis) */}
      {currentTab === 'visao-geral' && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs">
          {/* Top Title & Organogram warning */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-6">
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                Conclusão por diretoria
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {drilldownLevel === 0 && 'Clique em uma diretoria para abrir os gerentes'}
                {drilldownLevel === 1 && 'Escolha um gerente para ver as pessoas'}
                {drilldownLevel === 2 && 'Pessoas da equipe'}
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-medium text-amber-700 bg-amber-50/80 border border-amber-200/80 px-3 py-1.5 rounded-xl self-start sm:self-auto shadow-2xs">
              <AlertTriangle size={14} className="text-amber-600" />
              <span>{directorateData.warningText}</span>
            </div>
          </div>

          {/* Breadcrumb Navigation for Drilldown */}
          {drilldownLevel > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-6 pb-3 border-b border-slate-100">
              <button
                onClick={() => {
                  setDrilldownLevel(0);
                  setSelectedManagerIdx(null);
                }}
                className="hover:text-purple-600 hover:underline cursor-pointer"
              >
                &lt; Diretorias
              </button>
              <span>&gt;</span>
              <button
                onClick={() => {
                  setDrilldownLevel(1);
                  setSelectedManagerIdx(null);
                }}
                className={`cursor-pointer ${
                  drilldownLevel === 1
                    ? 'font-bold text-slate-900'
                    : 'hover:text-purple-600 hover:underline'
                }`}
              >
                Sem vínculo no organograma
              </button>
              {drilldownLevel === 2 && selectedManagerIdx !== null && (
                <>
                  <span>&gt;</span>
                  <span className="font-bold text-slate-900">
                    {directorateData.managers[selectedManagerIdx]?.managerName}
                  </span>
                </>
              )}
            </div>
          )}

          {/* LEVEL 0: Directorships Grid */}
          {drilldownLevel === 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              <div
                onClick={() => setDrilldownLevel(1)}
                className="bg-white border border-slate-200/90 hover:border-purple-300 rounded-2xl p-5 transition-all shadow-2xs hover:shadow-md cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
                    {directorateData.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                    <Users size={13} className="text-slate-400" />
                    <span>{directorateData.colabsCount} COLABS</span>
                  </div>

                  {/* Circular Progress Ring */}
                  <div className="flex flex-col items-center justify-center my-6">
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                        {/* Background Track */}
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#f1f5f9"
                          strokeWidth="3.2"
                        />
                        {/* Progress arc (8%) */}
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#ef4444"
                          strokeWidth="3.2"
                          strokeDasharray="8, 100"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute text-base font-extrabold text-slate-800">
                        8%
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 tracking-wider mt-2 uppercase">
                      54/705 CONCLUÍDOS
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500 hover:text-purple-600 transition-colors">
                  <span>VER DETALHES</span>
                  <ChevronRight size={14} />
                </div>
              </div>
            </div>
          )}

          {/* LEVEL 1: Managers Grid (tela 1 modal diretoria ao clicar.png) */}
          {drilldownLevel === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {directorateData.managers.map((mgr, idx) => (
                <div
                  key={mgr.managerName}
                  onClick={() => {
                    setSelectedManagerIdx(idx);
                    setDrilldownLevel(2);
                  }}
                  className="bg-white border border-slate-200/90 hover:border-purple-300 rounded-2xl p-5 transition-all shadow-2xs hover:shadow-md cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
                      {mgr.managerName}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                      <Users size={13} className="text-slate-400" />
                      <span>{mgr.colabsCount} COLABS</span>
                    </div>

                    {/* Circular Progress */}
                    <div className="flex flex-col items-center justify-center my-6">
                      <div className="relative w-24 h-24 flex items-center justify-center">
                        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#f1f5f9"
                            strokeWidth="3.2"
                          />
                          {mgr.pct > 0 && (
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="#ef4444"
                              strokeWidth="3.2"
                              strokeDasharray={`${mgr.pct}, 100`}
                              strokeLinecap="round"
                            />
                          )}
                        </svg>
                        <span className="absolute text-base font-extrabold text-slate-800">
                          {mgr.pct}%
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500 tracking-wider mt-2 uppercase">
                        {mgr.approvedCount}/{mgr.totalCount} CONCLUÍDOS
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500 hover:text-purple-600 transition-colors">
                    <span>VER DETALHES</span>
                    <ChevronRight size={14} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* LEVEL 2: Team Members List (tela 1 modal ao expandir e escolher diretor.PNG) */}
          {drilldownLevel === 2 && selectedManagerIdx !== null && (
            <div className="space-y-3">
              {directorateData.managers[selectedManagerIdx]?.members.map((member) => (
                <div
                  key={member.id}
                  className="p-3.5 sm:p-4 bg-white border border-slate-100 hover:border-slate-200 rounded-xl flex items-center justify-between gap-4 shadow-2xs"
                >
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800">
                    <span>{member.name}</span>
                    {member.isExpert && (
                      <span className="text-slate-400 font-normal">·</span>
                    )}
                    <span className="text-xs text-slate-400 font-normal">
                      {member.department}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <span className="text-xs text-slate-400 font-mono">
                      {member.approved}/{member.total}
                    </span>
                    <div className="w-28 sm:w-40 bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          member.pct >= 100
                            ? 'bg-emerald-500'
                            : member.pct > 0
                            ? 'bg-amber-500'
                            : 'bg-transparent'
                        }`}
                        style={{ width: `${member.pct}%` }}
                      ></div>
                    </div>
                    <span
                      className={`text-xs font-bold w-10 text-right ${
                        member.pct >= 100
                          ? 'text-emerald-600'
                          : member.pct > 0
                          ? 'text-amber-600'
                          : 'text-red-500'
                      }`}
                    >
                      {member.pct}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 4. TAB 2: COLABORADORES (Indicador por colaborador sobre os 3 episódios) */}
      {currentTab === 'colaboradores' && (
        <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 shadow-xs space-y-4">
          {/* Top Filter Buttons & Export */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setStatusFilter('todos')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  statusFilter === 'todos'
                    ? 'bg-[#4f46e5] text-white shadow-2xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                Todos <span className="opacity-90 ml-1">235</span>
              </button>

              <button
                onClick={() => setStatusFilter('verde')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  statusFilter === 'verde'
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50/50'
                }`}
              >
                Verde <span className="opacity-90 ml-1">4</span>
              </button>

              <button
                onClick={() => setStatusFilter('amarelo')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  statusFilter === 'amarelo'
                    ? 'bg-amber-500 text-white shadow-2xs'
                    : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-50/50'
                }`}
              >
                Amarelo <span className="opacity-90 ml-1">20</span>
              </button>

              <button
                onClick={() => setStatusFilter('vermelho')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  statusFilter === 'vermelho'
                    ? 'bg-red-500 text-white shadow-2xs'
                    : 'bg-white text-red-700 border border-red-200 hover:bg-red-50/50'
                }`}
              >
                Vermelho <span className="opacity-90 ml-1">211</span>
              </button>

              <button
                onClick={() => setStatusFilter('zerados')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  statusFilter === 'zerados'
                    ? 'bg-slate-800 text-white shadow-2xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                Zerados <span className="opacity-90 ml-1">209</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5">
                <Search size={13} className="text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar colaborador..."
                  value={searchColab}
                  onChange={(e) => {
                    setSearchColab(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-transparent text-xs text-slate-700 placeholder-slate-400 focus:outline-none w-36"
                />
              </div>

              <button
                onClick={handleExportCSV}
                className="px-3.5 py-1.5 rounded-xl border border-emerald-200 text-emerald-700 hover:bg-emerald-50 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
              >
                <Download size={13} />
                <span>Exportar CSV</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
                <tr>
                  <th
                    onClick={() => handleSortColab('name')}
                    className="px-4 py-3 cursor-pointer hover:text-purple-600 select-none"
                  >
                    <div className="flex items-center gap-1">
                      <span>NOME</span>
                      <ArrowUpDown size={11} />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSortColab('completionPct')}
                    className="px-4 py-3 cursor-pointer hover:text-purple-600 select-none"
                  >
                    <div className="flex items-center gap-1">
                      <span>% CONCLUSÃO</span>
                      <ArrowUpDown size={11} />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSortColab('approvedCount')}
                    className="px-4 py-3 cursor-pointer hover:text-purple-600 select-none"
                  >
                    <div className="flex items-center gap-1">
                      <span>APROVADOS</span>
                      <ArrowUpDown size={11} />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSortColab('totalCount')}
                    className="px-4 py-3 cursor-pointer hover:text-purple-600 select-none"
                  >
                    <div className="flex items-center gap-1">
                      <span>TOTAL</span>
                      <ArrowUpDown size={11} />
                    </div>
                  </th>
                  <th className="px-4 py-3">PROGRESSO</th>
                  <th className="px-4 py-3">STATUS</th>
                  <th
                    onClick={() => handleSortColab('sector')}
                    className="px-4 py-3 cursor-pointer hover:text-purple-600 select-none"
                  >
                    <div className="flex items-center gap-1">
                      <span>SETOR</span>
                      <ArrowUpDown size={11} />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSortColab('manager')}
                    className="px-4 py-3 cursor-pointer hover:text-purple-600 select-none"
                  >
                    <div className="flex items-center gap-1">
                      <span>GESTOR</span>
                      <ArrowUpDown size={11} />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredCollaborators
                  .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                  .map((colab) => (
                    <tr
                      key={colab.id}
                      className="hover:bg-slate-50/70 transition-colors"
                    >
                      <td className="px-4 py-3.5 font-bold text-slate-800">
                        {colab.name}
                      </td>
                      <td
                        className={`px-4 py-3.5 font-bold tabular-nums ${
                          colab.completionPct >= 100
                            ? 'text-emerald-600'
                            : colab.completionPct > 0
                            ? 'text-amber-600'
                            : 'text-red-500'
                        }`}
                      >
                        {colab.completionPct.toFixed(1)}%
                      </td>
                      <td className="px-4 py-3.5 text-slate-600 font-mono">
                        {colab.approvedCount}
                      </td>
                      <td className="px-4 py-3.5 text-slate-600 font-mono">
                        {colab.totalCount}
                      </td>
                      <td className="px-4 py-3.5 w-32">
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              colab.completionPct >= 100
                                ? 'bg-emerald-500'
                                : colab.completionPct > 0
                                ? 'bg-amber-500'
                                : 'bg-transparent'
                            }`}
                            style={{ width: `${colab.completionPct}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-block w-2.5 h-2.5 rounded-full ${
                            colab.status === 'verde'
                              ? 'bg-emerald-500'
                              : colab.status === 'amarelo'
                              ? 'bg-amber-500'
                              : 'bg-red-500'
                          }`}
                        ></span>
                      </td>
                      <td className="px-4 py-3.5 text-slate-600 font-medium uppercase text-[11px]">
                        {colab.sector}
                      </td>
                      <td className="px-4 py-3.5 text-slate-600 font-medium">
                        {colab.manager}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
            <span>
              Mostrando {Math.min((currentPage - 1) * pageSize + 1, filteredCollaborators.length)} a{' '}
              {Math.min(currentPage * pageSize, filteredCollaborators.length)} de{' '}
              {filteredCollaborators.length} colaboradores
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-2.5 py-1 border border-slate-200 rounded-md disabled:opacity-40 hover:bg-slate-50 cursor-pointer"
              >
                Anterior
              </button>
              <span className="px-2 font-medium text-slate-700">
                Pág. {currentPage} de {Math.max(1, Math.ceil(filteredCollaborators.length / pageSize))}
              </span>
              <button
                disabled={currentPage >= Math.ceil(filteredCollaborators.length / pageSize)}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-2.5 py-1 border border-slate-200 rounded-md disabled:opacity-40 hover:bg-slate-50 cursor-pointer"
              >
                Próxima
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. TAB 3: POR GESTOR (Acompanhamento por gestão) */}
      {currentTab === 'por-gestor' && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs space-y-8">
          {/* Horizontal Bar Chart */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Média de Conclusão por Gestor
              </h3>
              <span className="text-xs text-slate-400 font-medium">
                Escala de 0% a 100%
              </span>
            </div>

            {/* SVG Chart */}
            <div className="w-full relative h-96 select-none overflow-x-auto">
              <svg viewBox="0 0 880 340" className="w-full min-w-[700px] h-full overflow-visible">
                {/* Guidelines */}
                {[
                  { pct: '0%', x: 120 },
                  { pct: '25%', x: 295 },
                  { pct: '50%', x: 470 },
                  { pct: '75%', x: 645 },
                  { pct: '100%', x: 820 },
                ].map((g) => (
                  <g key={g.pct}>
                    <line
                      x1={g.x}
                      y1="10"
                      x2={g.x}
                      y2="310"
                      stroke="#f1f5f9"
                      strokeWidth="1"
                    />
                    <text
                      x={g.x}
                      y="326"
                      textAnchor="middle"
                      fill="#94a3b8"
                      fontSize="10"
                      className="font-mono"
                    >
                      {g.pct}
                    </text>
                  </g>
                ))}

                {/* Gestores Bars */}
                {managerTrackData.map((m, idx) => {
                  const y = 20 + idx * 24;
                  const barWidth = (m.averagePct / 100) * 700;
                  const isTop = m.averagePct > 50;
                  const barColor = isTop ? '#ea580c' : '#ef4444';

                  return (
                    <g key={m.managerName}>
                      {/* Manager label */}
                      <text
                        x="110"
                        y={y + 11}
                        textAnchor="end"
                        fill="#475569"
                        fontSize="10"
                        fontWeight="500"
                      >
                        {m.managerName}
                      </text>

                      {/* Bar */}
                      {barWidth > 0 ? (
                        <rect
                          x="120"
                          y={y}
                          width={barWidth}
                          height="15"
                          rx="3"
                          fill={barColor}
                        />
                      ) : (
                        <line x1="120" y1={y + 7.5} x2="124" y2={y + 7.5} stroke="#cbd5e1" strokeWidth="2" />
                      )}

                      {/* Value text at bar end */}
                      <text
                        x={Math.max(120 + barWidth + 6, 126)}
                        y={y + 11.5}
                        textAnchor="start"
                        fill="#1e293b"
                        fontSize="10"
                        fontWeight="bold"
                        className="font-mono tabular-nums"
                      >
                        {m.averagePct}%
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Table below chart */}
          <div className="pt-4 border-t border-slate-100">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
                  <tr>
                    <th className="px-5 py-3">GESTOR</th>
                    <th className="px-5 py-3">ALUNOS</th>
                    <th className="px-5 py-3">ZERADOS</th>
                    <th className="px-5 py-3">MÉDIA %</th>
                    <th className="px-5 py-3">PROGRESSO</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {managerTrackData.map((row) => (
                    <tr key={row.managerName} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-3.5 font-bold text-slate-900">
                        {row.managerName}
                      </td>
                      <td className="px-5 py-3.5 text-slate-600 font-mono">
                        {row.studentsCount}
                      </td>
                      <td className="px-5 py-3.5 font-bold text-red-600 font-mono">
                        {row.zeradosCount}
                      </td>
                      <td
                        className={`px-5 py-3.5 font-bold font-mono ${
                          row.averagePct > 50 ? 'text-amber-600' : 'text-red-500'
                        }`}
                      >
                        {row.averagePct.toFixed(1)}%
                      </td>
                      <td className="px-5 py-3.5 w-44">
                        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              row.averagePct > 50 ? 'bg-amber-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${row.averagePct}%` }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 6. TAB 4: TRILHAS & MÓDULOS (Concluídos por episódio) */}
      {currentTab === 'trilhas-modulos' && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              % de Aprovação por Módulo
            </h3>
            <span className="text-xs text-slate-400 font-medium">
              3 episódios avaliados
            </span>
          </div>

          {/* Horizontal Bar Chart for Modules */}
          <div className="w-full relative h-72 select-none overflow-x-auto">
            <svg viewBox="0 0 920 240" className="w-full min-w-[700px] h-full overflow-visible">
              {/* Guidelines */}
              {[
                { pct: '0%', x: 260 },
                { pct: '25%', x: 415 },
                { pct: '50%', x: 570 },
                { pct: '75%', x: 725 },
                { pct: '100%', x: 880 },
              ].map((g) => (
                <g key={g.pct}>
                  <line
                    x1={g.x}
                    y1="10"
                    x2={g.x}
                    y2="200"
                    stroke="#f1f5f9"
                    strokeWidth="1"
                  />
                  <text
                    x={g.x}
                    y="218"
                    textAnchor="middle"
                    fill="#94a3b8"
                    fontSize="10"
                    className="font-mono"
                  >
                    {g.pct}
                  </text>
                </g>
              ))}

              {/* Modules Bars */}
              {moduleTrackData.map((m, idx) => {
                const y = 30 + idx * 60;
                const barWidth = (m.approvalPct / 100) * 620;

                return (
                  <g key={m.id}>
                    {/* Module label */}
                    <text
                      x="250"
                      y={y + 14}
                      textAnchor="end"
                      fill="#475569"
                      fontSize="10"
                      fontWeight="500"
                    >
                      {m.shortName}
                    </text>

                    {/* Bar */}
                    <rect
                      x="260"
                      y={y}
                      width={barWidth}
                      height="20"
                      rx="3"
                      fill="#ef4444"
                    />

                    {/* Value label */}
                    <text
                      x={260 + barWidth + 8}
                      y={y + 14}
                      textAnchor="start"
                      fill="#1e293b"
                      fontSize="10"
                      fontWeight="bold"
                      className="font-mono tabular-nums"
                    >
                      {m.approvalPct.toFixed(1)}%
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Modules Details Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-slate-100">
            {moduleTrackData.map((m) => (
              <div key={m.id} className="p-4 bg-slate-50/70 border border-slate-100 rounded-xl">
                <span className="text-xs font-bold text-slate-800 block line-clamp-1">
                  {m.name}
                </span>
                <div className="flex items-center justify-between text-xs mt-3">
                  <span className="text-slate-500">Aprovados:</span>
                  <span className="font-bold text-slate-900">{m.approvedCount} / {m.totalStudents}</span>
                </div>
                <div className="flex items-center justify-between text-xs mt-1">
                  <span className="text-slate-500">Taxa de Conclusão:</span>
                  <span className="font-bold text-red-500">{m.approvalPct}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
