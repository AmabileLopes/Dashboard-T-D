import React from 'react';
import { Moon, Sun, ChevronDown, X, BookmarkCheck } from 'lucide-react';
import { FilterState } from '../types';

interface HeaderFiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onResetFilters: () => void;
  onSaveFilters: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  availableOptions: {
    directorates: string[];
    managers: string[];
    leaders: string[];
    teams: string[];
    makers: string[];
    categories: string[];
    targets: string[];
  };
}

export const HeaderFilters: React.FC<HeaderFiltersProps> = ({
  filters,
  setFilters,
  onResetFilters,
  onSaveFilters,
  isDarkMode,
  setIsDarkMode,
  availableOptions,
}) => {
  const handleChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs mb-6">
      <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between pb-4 border-b border-slate-100">
        {/* Title and Dark Mode Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-11 h-11 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 transition-colors shadow-2xs"
            title={isDarkMode ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
          >
            {isDarkMode ? <Sun size={20} className="text-amber-500" /> : <Moon size={20} />}
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight leading-tight">
              Gestão de Treinamentos
            </h1>
            <p className="text-xs text-slate-400 font-normal mt-0.5">
              Última atualização: 30/09/2026 07:34
            </p>
          </div>
        </div>

        {/* Action summary badge or quick stats if needed */}
      </div>

      {/* Filter Inputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4">
        {/* Row 1 */}
        <div>
          <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
            Diretoria
          </label>
          <div className="relative">
            <select
              value={filters.directorate}
              onChange={(e) => handleChange('directorate', e.target.value)}
              className="w-full bg-white border border-slate-200 text-slate-700 text-xs rounded-xl px-3 py-2.5 pr-8 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition shadow-2xs appearance-none"
            >
              <option value="Todas">Todas</option>
              {availableOptions.directorates.map((dir) => (
                <option key={dir} value={dir}>{dir}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-3 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
            Gerente
          </label>
          <div className="relative">
            <select
              value={filters.manager}
              onChange={(e) => handleChange('manager', e.target.value)}
              className="w-full bg-white border border-slate-200 text-slate-700 text-xs rounded-xl px-3 py-2.5 pr-8 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition shadow-2xs appearance-none"
            >
              <option value="Todos">Todos</option>
              {availableOptions.managers.map((mgr) => (
                <option key={mgr} value={mgr}>{mgr}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-3 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
            Coordenador / Líder Direto
          </label>
          <div className="relative">
            <select
              value={filters.leader}
              onChange={(e) => handleChange('leader', e.target.value)}
              className="w-full bg-white border border-slate-200 text-slate-700 text-xs rounded-xl px-3 py-2.5 pr-8 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition shadow-2xs appearance-none"
            >
              <option value="Todos">Todos</option>
              {availableOptions.leaders.map((ldr) => (
                <option key={ldr} value={ldr}>{ldr}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-3 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
            Time
          </label>
          <div className="relative">
            <select
              value={filters.team}
              onChange={(e) => handleChange('team', e.target.value)}
              className="w-full bg-white border border-slate-200 text-slate-700 text-xs rounded-xl px-3 py-2.5 pr-8 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition shadow-2xs appearance-none"
            >
              <option value="Todos">Todos</option>
              {availableOptions.teams.map((tm) => (
                <option key={tm} value={tm}>{tm}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-3 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Row 2 */}
        <div>
          <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
            Colaborador
          </label>
          <div className="relative">
            <select
              value={filters.maker}
              onChange={(e) => handleChange('maker', e.target.value)}
              className="w-full bg-white border border-slate-200 text-slate-700 text-xs rounded-xl px-3 py-2.5 pr-8 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition shadow-2xs appearance-none"
            >
              <option value="Todos">Todos</option>
              {availableOptions.makers.map((mkr) => (
                <option key={mkr} value={mkr}>{mkr}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-3 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
            Admissão
          </label>
          <div className="relative">
            <select
              value={filters.admission}
              onChange={(e) => handleChange('admission', e.target.value)}
              className="w-full bg-white border border-slate-200 text-slate-700 text-xs rounded-xl px-3 py-2.5 pr-8 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition shadow-2xs appearance-none"
            >
              <option value="Todas">Todas</option>
              <option value="< 6 meses">&lt; 6 meses</option>
              <option value="6 a 12 meses">6 a 12 meses</option>
              <option value="1 a 2 anos">1 a 2 anos</option>
              <option value="> 2 anos">&gt; 2 anos</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-3 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
            Categoria
          </label>
          <div className="relative">
            <select
              value={filters.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full bg-white border border-slate-200 text-slate-700 text-xs rounded-xl px-3 py-2.5 pr-8 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition shadow-2xs appearance-none"
            >
              <option value="Todas">Todas</option>
              {availableOptions.categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-3 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
            Obrigatória
          </label>
          <div className="relative">
            <select
              value={filters.mandatory}
              onChange={(e) => handleChange('mandatory', e.target.value)}
              className="w-full bg-white border border-slate-200 text-slate-700 text-xs rounded-xl px-3 py-2.5 pr-8 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition shadow-2xs appearance-none"
            >
              <option value="Todas">Todas</option>
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-3 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Row 3 - Meta + Action Buttons */}
        <div>
          <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
            Meta
          </label>
          <div className="relative">
            <select
              value={filters.target}
              onChange={(e) => handleChange('target', e.target.value)}
              className="w-full bg-white border border-slate-200 text-slate-700 text-xs rounded-xl px-3 py-2.5 pr-8 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition shadow-2xs appearance-none"
            >
              <option value="Todas">Todas</option>
              {availableOptions.targets.map((tgt) => (
                <option key={tgt} value={tgt}>{tgt}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-3 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div className="sm:col-span-2 lg:col-span-3 flex items-end gap-3 pt-2 sm:pt-0">
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-600 text-xs font-semibold transition shadow-2xs"
          >
            <X size={15} />
            <span>Limpar Filtros</span>
          </button>
          <button
            onClick={onSaveFilters}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-600 text-xs font-semibold transition shadow-2xs"
          >
            <BookmarkCheck size={15} className="text-slate-500" />
            <span>Salvar Filtros</span>
          </button>
        </div>
      </div>
    </div>
  );
};
