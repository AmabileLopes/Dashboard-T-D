import React, { useState } from 'react';
import {
  Users,
  Clock,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  Bookmark,
  Moon,
  Sun,
  Timer,
} from 'lucide-react';
import {
  monthlyTrainingData,
  monthlyTargets,
  categoryHoursData,
  verticalTrainingData,
  distributionRangesData,
} from '../data/hoursManagementData';
import { MakerTrainingExplorerModal } from './MakerTrainingExplorerModal';
import { MakerDistributionModal } from './MakerDistributionModal';

interface HoursManagementViewProps {
  onToast?: (msg: string) => void;
}

export const HoursManagementView: React.FC<HoursManagementViewProps> = ({
  onToast,
}) => {
  // Modals state
  const [isExplorerModalOpen, setIsExplorerModalOpen] = useState(false);
  const [isDistributionModalOpen, setIsDistributionModalOpen] = useState(false);

  // Dark/Light aesthetic toggle
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Filters state
  const [verticalFilter, setVerticalFilter] = useState('Todos');
  const [managerFilter, setManagerFilter] = useState('Todos');
  const [monthFilter, setMonthFilter] = useState('Todos');
  const [teamFilter, setTeamFilter] = useState('Todos');
  const [roleFilter, setRoleFilter] = useState('Todos');
  const [categoryFilter, setCategoryFilter] = useState('Todas');

  // Tooltip hover states for charts
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);
  const [hoveredVertical, setHoveredVertical] = useState<number | null>(null);
  const [hoveredRange, setHoveredRange] = useState<number | null>(null);

  const handleSaveFilters = () => {
    if (onToast) {
      onToast('Filtros do dashboard salvos com sucesso!');
    }
  };

  return (
    <div className={`space-y-6 ${isDarkMode ? 'dark' : ''}`}>
      {/* 1. Header & Filter Bar (Telas 1 e 2) */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          {/* Left Title + Dark Mode Toggle */}
          <div className="flex items-center gap-3.5">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-700 bg-white hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer shrink-0"
              title={isDarkMode ? 'Alternar para Modo Claro' : 'Alternar para Modo Escuro'}
            >
              {isDarkMode ? <Sun size={18} className="text-amber-500" /> : <Moon size={18} />}
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Gestão de Treinamentos
              </h1>
              <p className="text-xs text-slate-400 font-normal mt-0.5">
                Última atualização: 01/10/2026 10:45
              </p>
            </div>
          </div>

          {/* Right Filter Matrix */}
          <div className="flex flex-col gap-2.5">
            {/* Filter Row 1 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div>
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                  VERTICAL
                </label>
                <select
                  value={verticalFilter}
                  onChange={(e) => setVerticalFilter(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-purple-400 cursor-pointer shadow-2xs"
                >
                  <option value="Todos">Todos</option>
                  <option value="ALCEU FERNANDO KELLER">ALCEU FERNANDO KELLER</option>
                  <option value="RAFAEL DIOGO SARTOREL">RAFAEL DIOGO SARTOREL</option>
                  <option value="PAULO ROBERTO DA SILVA PEREIRA">PAULO ROBERTO DA SILVA PEREIRA</option>
                  <option value="JACKSON ANTONIO CENCI">JACKSON ANTONIO CENCI</option>
                  <option value="RAPHAEL MORAES SANTANA">RAPHAEL MORAES SANTANA</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                  GERENTE
                </label>
                <select
                  value={managerFilter}
                  onChange={(e) => setManagerFilter(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-purple-400 cursor-pointer shadow-2xs"
                >
                  <option value="Todos">Todos</option>
                  <option value="Alceu Keller">Alceu Keller</option>
                  <option value="Alik Votisch">Alik Votisch</option>
                  <option value="Edionei Santos">Edionei Santos</option>
                  <option value="Felipe Ramos">Felipe Ramos</option>
                  <option value="Flavia Morgenstern">Flavia Morgenstern</option>
                  <option value="Lilian Schultz">Lilian Schultz</option>
                  <option value="Samuel Zanotto">Samuel Zanotto</option>
                  <option value="Thiago Marques">Thiago Marques</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                  MÊS
                </label>
                <select
                  value={monthFilter}
                  onChange={(e) => setMonthFilter(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-purple-400 cursor-pointer shadow-2xs"
                >
                  <option value="Todos">Todos</option>
                  <option value="Janeiro">Janeiro</option>
                  <option value="Fevereiro">Fevereiro</option>
                  <option value="Março">Março</option>
                  <option value="Abril">Abril</option>
                  <option value="Maio">Maio</option>
                  <option value="Junho">Junho</option>
                  <option value="Julho">Julho</option>
                  <option value="Agosto">Agosto</option>
                  <option value="Setembro">Setembro</option>
                  <option value="Outubro">Outubro</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                  TIME
                </label>
                <select
                  value={teamFilter}
                  onChange={(e) => setTeamFilter(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-purple-400 cursor-pointer shadow-2xs"
                >
                  <option value="Todos">Todos</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Growth & Analytics">Growth & Analytics</option>
                  <option value="Core Platform Engineering">Core Platform</option>
                  <option value="DevOps & Cloud Core">DevOps & Cloud</option>
                  <option value="Enterprise Solutions">Enterprise Solutions</option>
                  <option value="Data & AI">Data & AI</option>
                </select>
              </div>
            </div>

            {/* Filter Row 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 items-end">
              <div>
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                  CARGO
                </label>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-purple-400 cursor-pointer shadow-2xs"
                >
                  <option value="Todos">Todos</option>
                  <option value="Desenvolvedor">Desenvolvedor</option>
                  <option value="Tech Lead">Tech Lead</option>
                  <option value="Analista">Analista</option>
                  <option value="Arquiteto">Arquiteto</option>
                  <option value="Especialista">Especialista</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                  CATEGORIA
                </label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-purple-400 cursor-pointer shadow-2xs"
                >
                  <option value="Todas">Todas</option>
                  <option value="Tech Skills">Tech Skills</option>
                  <option value="Produtos e Negócios Específicos NDD">Produtos e Negócios NDD</option>
                  <option value="Normativos e de Processos">Normativos e Processos</option>
                  <option value="Comportamentos e Soft Skills">Soft Skills</option>
                </select>
              </div>

              <div>
                <button
                  onClick={handleSaveFilters}
                  className="w-full h-8 px-4 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                >
                  <Bookmark size={13} className="text-slate-600" />
                  <span>Salvar Filtros</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Top KPI Cards Row (Tela 1) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total de Makers */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs flex items-center gap-4 hover:shadow-sm transition-shadow">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Users size={22} />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium block">
              Total de Makers
            </span>
            <div className="text-3xl font-black text-[#1d4ed8] tabular-nums tracking-tight">
              716
            </div>
            <span className="text-[11px] text-slate-400 block mt-0.5">
              Mês de referência
            </span>
          </div>
        </div>

        {/* Card 2: Média Horas Maker */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs flex items-center gap-4 hover:shadow-sm transition-shadow">
          <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0">
            <Timer size={22} />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium block">
              Média Horas Maker
            </span>
            <div className="text-3xl font-black text-[#ef4444] tabular-nums tracking-tight">
              1.49 h
            </div>
            <span className="text-[11px] text-slate-400 block mt-0.5">
              Meta Período: 2.2 h
            </span>
          </div>
        </div>

        {/* Card 3: Total Horas */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs flex items-center gap-4 hover:shadow-sm transition-shadow">
          <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Clock size={22} />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium block">
              Total Horas
            </span>
            <div className="text-3xl font-black text-[#7c3aed] tabular-nums tracking-tight">
              8984.8 h
            </div>
            <span className="text-[11px] text-slate-400 block mt-0.5">
              Registradas em 2026
            </span>
          </div>
        </div>

        {/* Card 4: Participantes */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs flex items-center gap-4 hover:shadow-sm transition-shadow">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium block">
              Participantes
            </span>
            <div className="text-3xl font-black text-[#10b981] tabular-nums tracking-tight">
              756
            </div>
            <span className="text-[11px] text-slate-400 block mt-0.5">
              Makers únicos
            </span>
          </div>
        </div>
      </div>

      {/* 3. First Chart Row: Treinamento por Mês & Hora Maker por Categoria (Telas 1 e 2) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Treinamento por Mês H/M (Hora Maker) */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Treinamento por Mês H/M (Hora Maker)
              </h3>
              {/* Target Legend */}
              <div className="flex flex-wrap items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1 font-semibold text-[#059669]">
                  <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
                  Supera: 3.0 H/M mês
                </span>
                <span className="flex items-center gap-1 font-semibold text-[#d97706]">
                  <span className="w-2 h-2 rounded-full bg-[#f59e0b]"></span>
                  Atinge: 2.2 H/M mês
                </span>
                <span className="flex items-center gap-1 font-semibold text-[#dc2626]">
                  <span className="w-2 h-2 rounded-full bg-[#ef4444]"></span>
                  Mínimo: 2.0 H/M mês
                </span>
              </div>
            </div>

            {/* Series Legend (Center) */}
            <div className="flex items-center justify-center gap-4 text-xs text-slate-600 mb-3">
              <span className="flex items-center gap-1.5 font-medium text-purple-700">
                <span className="w-3 h-3 rounded-xs bg-[#8b5cf6]"></span>
                Média
              </span>
              <span className="flex items-center gap-1.5 font-medium text-red-600">
                <span className="w-3 h-0.5 bg-red-400"></span>
                <span className="w-1.5 h-1.5 rounded-full border border-red-500 bg-white"></span>
                Mínimo
              </span>
              <span className="flex items-center gap-1.5 font-medium text-amber-600">
                <span className="w-3 h-0.5 border-b border-dashed border-amber-500"></span>
                <span className="w-1.5 h-1.5 rounded-full border border-amber-500 bg-white"></span>
                Atinge
              </span>
              <span className="flex items-center gap-1.5 font-medium text-emerald-600">
                <span className="w-3 h-0.5 border-b border-dashed border-emerald-500"></span>
                <span className="w-1.5 h-1.5 rounded-full border border-emerald-500 bg-white"></span>
                Supera
              </span>
            </div>

            {/* SVG Chart with Target Lines & Bars */}
            <div className="w-full relative h-64 select-none">
              <svg
                viewBox="0 0 540 260"
                className="w-full h-full overflow-visible"
              >
                {/* Y-axis guidelines */}
                {[
                  { val: '3.4', y: 30 },
                  { val: '2.55', y: 85 },
                  { val: '1.7', y: 140 },
                  { val: '0.85', y: 195 },
                ].map((tick) => (
                  <g key={tick.val}>
                    <line
                      x1="45"
                      y1={tick.y}
                      x2="520"
                      y2={tick.y}
                      stroke="#f1f5f9"
                      strokeDasharray="4 4"
                      strokeWidth="1"
                    />
                    <text
                      x="40"
                      y={tick.y + 3}
                      textAnchor="end"
                      fill="#94a3b8"
                      fontSize="10"
                      className="font-mono tabular-nums"
                    >
                      {tick.val}
                    </text>
                  </g>
                ))}

                {/* Target Thresholds (horizontal lines across months) */}
                {/* 1. Supera (3.0): y = 250 - (3.0/3.4)*220 = 55.88 */}
                <line
                  x1="55"
                  y1="56"
                  x2="515"
                  y2="56"
                  stroke="#10b981"
                  strokeDasharray="4 4"
                  strokeWidth="1.5"
                  strokeOpacity="0.8"
                />
                {/* Supera points across chart */}
                {[75, 125, 175, 225, 275, 325, 375, 425, 475].map((cx, i) => (
                  <circle
                    key={`sup-${i}`}
                    cx={cx}
                    cy="56"
                    r="3.5"
                    fill="#a7f3d0"
                    stroke="#10b981"
                    strokeWidth="1"
                  />
                ))}

                {/* 2. Atinge (2.2): y = 250 - (2.2/3.4)*220 = 107.6 */}
                <line
                  x1="55"
                  y1="108"
                  x2="515"
                  y2="108"
                  stroke="#f59e0b"
                  strokeDasharray="4 4"
                  strokeWidth="1.5"
                  strokeOpacity="0.8"
                />
                {[75, 125, 175, 225, 275, 325, 375, 425, 475].map((cx, i) => (
                  <circle
                    key={`atinge-${i}`}
                    cx={cx}
                    cy="108"
                    r="3.5"
                    fill="#fde68a"
                    stroke="#f59e0b"
                    strokeWidth="1"
                  />
                ))}

                {/* 3. Mínimo (2.0): y = 250 - (2.0/3.4)*220 = 120.5 */}
                <line
                  x1="55"
                  y1="121"
                  x2="515"
                  y2="121"
                  stroke="#ef4444"
                  strokeDasharray="4 4"
                  strokeWidth="1.5"
                  strokeOpacity="0.8"
                />
                {[75, 125, 175, 225, 275, 325, 375, 425, 475].map((cx, i) => (
                  <circle
                    key={`min-${i}`}
                    cx={cx}
                    cy="121"
                    r="3.5"
                    fill="#fecaca"
                    stroke="#ef4444"
                    strokeWidth="1"
                  />
                ))}

                {/* Monthly Bars */}
                {monthlyTrainingData.map((d, i) => {
                  const barWidth = 32;
                  const x = 60 + i * 50;
                  const barHeight = (d.hoursPerMaker / 3.4) * 220;
                  const y = 250 - barHeight;
                  const isExceeded = d.hoursPerMaker >= monthlyTargets.supera;
                  const barColor = isExceeded ? '#10b981' : '#ef4444';
                  const isHovered = hoveredMonth === i;

                  return (
                    <g
                      key={d.month}
                      onMouseEnter={() => setHoveredMonth(i)}
                      onMouseLeave={() => setHoveredMonth(null)}
                      className="cursor-pointer"
                    >
                      {/* Bar */}
                      <rect
                        x={x}
                        y={y}
                        width={barWidth}
                        height={barHeight}
                        rx="3"
                        fill={barColor}
                        opacity={isHovered ? 1 : 0.9}
                        className="transition-all"
                      />

                      {/* Number value above bar */}
                      <text
                        x={x + barWidth / 2}
                        y={y - 6}
                        textAnchor="middle"
                        fill="#1e293b"
                        fontSize="10"
                        fontWeight="bold"
                        className="font-mono tabular-nums"
                      >
                        {d.hoursPerMaker.toFixed(2)}
                      </text>

                      {/* Month label below bar */}
                      <text
                        x={x + barWidth / 2}
                        y="262"
                        textAnchor="middle"
                        fill="#64748b"
                        fontSize="10"
                        fontWeight="500"
                      >
                        {d.month}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>

        {/* Right: Hora Maker por Categoria */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Hora Maker por Categoria
              </h3>
              <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8b5cf6]"></span>
                Horas
              </span>
            </div>

            {/* Horizontal Bar Chart */}
            <div className="space-y-6 pt-2">
              {categoryHoursData.map((cat) => {
                // Max hours reference ~6000h
                const pctWidth = Math.min(100, Math.round((cat.hours / 6000) * 100));

                return (
                  <div key={cat.category} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800 text-[11px] sm:text-xs">
                        {cat.category}
                      </span>
                      <span className="font-bold text-slate-900 tabular-nums text-xs">
                        {cat.hours.toLocaleString('pt-BR')}h ({cat.percentage}%)
                      </span>
                    </div>

                    <div className="w-full bg-slate-100 h-9 rounded-lg overflow-hidden flex items-center p-0.5">
                      <div
                        className="bg-[#8b5cf6] hover:bg-[#7c3aed] transition-all h-full rounded-md flex items-center justify-end pr-3"
                        style={{ width: `${pctWidth}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Second Chart Section: Treinamento por Vertical (Tela 3) */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Treinamento por Vertical
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Horas Maker vs. Representatividade (%) no Total
            </p>
          </div>

          {/* Action Button: Ver Lista */}
          <button
            onClick={() => setIsExplorerModalOpen(true)}
            className="px-4 py-2 bg-[#4f46e5] hover:bg-[#4338ca] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer self-start sm:self-center"
          >
            <ExternalLink size={13} />
            <span>Ver lista</span>
          </button>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-5 text-xs text-slate-600 mb-4">
          <span className="flex items-center gap-1.5 font-medium text-purple-700">
            <span className="w-3 h-3 rounded-xs bg-[#8b5cf6]"></span>
            Horas Maker
          </span>
          <span className="flex items-center gap-1.5 font-medium text-orange-600">
            <span className="w-4 h-0.5 bg-[#f97316]"></span>
            <span className="w-2 h-2 rounded-full border border-orange-500 bg-white"></span>
            Representatividade (%)
          </span>
        </div>

        {/* Mixed SVG Chart (Bars + Connected Orange Polyline) */}
        <div className="w-full relative h-72 sm:h-80 select-none overflow-x-auto">
          <svg
            viewBox="0 0 880 280"
            className="w-full min-w-[700px] h-full overflow-visible"
          >
            {/* Gridlines */}
            {[
              { val: '20', pct: '20%', y: 30 },
              { val: '15', pct: '15%', y: 85 },
              { val: '10', pct: '10%', y: 140 },
              { val: '5', pct: '5%', y: 195 },
              { val: '0', pct: '0%', y: 250 },
            ].map((tick) => (
              <g key={tick.val}>
                <line
                  x1="45"
                  y1={tick.y}
                  x2="835"
                  y2={tick.y}
                  stroke="#f1f5f9"
                  strokeWidth="1"
                />
                {/* Left Y-axis (Hours) */}
                <text
                  x="38"
                  y={tick.y + 3}
                  textAnchor="end"
                  fill="#94a3b8"
                  fontSize="10"
                  className="font-mono tabular-nums"
                >
                  {tick.val}
                </text>
                {/* Right Y-axis (Percentage) */}
                <text
                  x="842"
                  y={tick.y + 3}
                  textAnchor="start"
                  fill="#ea580c"
                  fontSize="10"
                  className="font-mono tabular-nums"
                >
                  {tick.pct}
                </text>
              </g>
            ))}

            {/* Bars */}
            {verticalTrainingData.map((item, idx) => {
              const barWidth = 36;
              const x = 65 + idx * 78;
              const barHeight = (item.hoursMaker / 20) * 220;
              const y = 250 - barHeight;
              const isHovered = hoveredVertical === idx;

              return (
                <g
                  key={item.vertical}
                  onMouseEnter={() => setHoveredVertical(idx)}
                  onMouseLeave={() => setHoveredVertical(null)}
                  className="cursor-pointer"
                >
                  <rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    rx="3"
                    fill="#8b5cf6"
                    opacity={isHovered ? 1 : 0.88}
                  />

                  {/* Vertical Label on bottom */}
                  <text
                    x={x + barWidth / 2}
                    y="266"
                    textAnchor="middle"
                    fill="#475569"
                    fontSize="9.5"
                    fontWeight="600"
                  >
                    {item.vertical.split(' ')[0]} {item.vertical.split(' ')[1] || ''}
                  </text>
                </g>
              );
            })}

            {/* Orange Connected Curve */}
            {(() => {
              const points = verticalTrainingData.map((item, idx) => {
                const barWidth = 36;
                const x = 65 + idx * 78 + barWidth / 2;
                const y = 250 - (item.representativityPct / 20) * 220;
                return { x, y, val: item.representativityPct };
              });

              // Create path
              const d = points
                .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
                .join(' ');

              return (
                <g>
                  <path
                    d={d}
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Node circles & Values above nodes */}
                  {points.map((p, i) => (
                    <g key={`node-${i}`}>
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r="4"
                        fill="#ffffff"
                        stroke="#f97316"
                        strokeWidth="2"
                      />
                      <text
                        x={p.x}
                        y={p.y - 7}
                        textAnchor="middle"
                        fill="#ea580c"
                        fontSize="9.5"
                        fontWeight="bold"
                        className="font-mono tabular-nums"
                      >
                        {p.val.toFixed(1)}
                      </text>
                    </g>
                  ))}
                </g>
              );
            })()}
          </svg>
        </div>
      </div>

      {/* 5. Third Chart Section: Distribuição Geral de Horas Maker (Tela 4) */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <GraduationCap size={18} className="text-[#6366f1]" />
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Distribuição Geral de Horas Maker
              </h3>
              <span className="bg-indigo-50 text-indigo-700 font-bold text-xs px-2.5 py-0.5 rounded-full">
                756 makers
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Frequência de Makers por faixa de horas de treinamento realizadas (Ano 2026)
            </p>
          </div>

          {/* Action Button: Ver Lista */}
          <button
            onClick={() => setIsDistributionModalOpen(true)}
            className="px-4 py-2 bg-[#4f46e5] hover:bg-[#4338ca] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer self-start sm:self-center"
          >
            <ExternalLink size={13} />
            <span>Ver lista</span>
          </button>
        </div>

        {/* Histogram Chart with 15 Bins */}
        <div className="w-full relative h-72 sm:h-80 select-none overflow-x-auto">
          <svg
            viewBox="0 0 920 280"
            className="w-full min-w-[760px] h-full overflow-visible"
          >
            {/* Gridlines */}
            {[
              { val: '200', y: 30 },
              { val: '150', y: 85 },
              { val: '100', y: 140 },
              { val: '50', y: 195 },
              { val: '0', y: 250 },
            ].map((tick) => (
              <g key={tick.val}>
                <line
                  x1="45"
                  y1={tick.y}
                  x2="900"
                  y2={tick.y}
                  stroke="#f8fafc"
                  strokeWidth="1"
                />
                <text
                  x="38"
                  y={tick.y + 3}
                  textAnchor="end"
                  fill="#94a3b8"
                  fontSize="10"
                  className="font-mono tabular-nums"
                >
                  {tick.val}
                </text>
              </g>
            ))}

            {/* Bins / Bars */}
            {distributionRangesData.map((item, idx) => {
              const barWidth = 42;
              const x = 55 + idx * 56;
              const barHeight = (item.count / 200) * 220;
              const y = 250 - barHeight;
              const isHovered = hoveredRange === idx;

              return (
                <g
                  key={item.range}
                  onMouseEnter={() => setHoveredRange(idx)}
                  onMouseLeave={() => setHoveredRange(null)}
                  className="cursor-pointer"
                >
                  {/* Bar */}
                  <rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    rx="4"
                    fill="#8b5cf6"
                    opacity={isHovered ? 1 : 0.88}
                  />

                  {/* Value above bar */}
                  <text
                    x={x + barWidth / 2}
                    y={y - 6}
                    textAnchor="middle"
                    fill="#6d28d9"
                    fontSize="10"
                    fontWeight="bold"
                    className="font-mono tabular-nums"
                  >
                    {item.count}
                  </text>

                  {/* Range Label on bottom */}
                  <text
                    x={x + barWidth / 2}
                    y="266"
                    textAnchor="middle"
                    fill="#64748b"
                    fontSize="8.5"
                    fontWeight="500"
                  >
                    {item.range}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Modal 1: Explorador de Treinamentos por Maker (Tela 3) */}
      <MakerTrainingExplorerModal
        isOpen={isExplorerModalOpen}
        onClose={() => setIsExplorerModalOpen(false)}
      />

      {/* Modal 2: Detalhamento de Distribuição Maker (Tela 4) */}
      <MakerDistributionModal
        isOpen={isDistributionModalOpen}
        onClose={() => setIsDistributionModalOpen(false)}
      />
    </div>
  );
};
