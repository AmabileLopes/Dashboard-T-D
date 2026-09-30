import React, { useState } from 'react';
import { MonthlyDataPoint } from '../types';

interface EvolutionChartProps {
  data: MonthlyDataPoint[];
}

export const EvolutionChart: React.FC<EvolutionChartProps> = ({ data }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // SVG dimensions
  const width = 1000;
  const height = 300;
  const paddingLeft = 55;
  const paddingRight = 40;
  const paddingTop = 30;
  const paddingBottom = 40;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  // Y scale: 0 to 100%
  const getY = (val: number) => {
    return paddingTop + chartHeight - (val / 100) * chartHeight;
  };

  // X scale: data points
  const getX = (idx: number) => {
    if (data.length <= 1) return paddingLeft;
    return paddingLeft + (idx / (data.length - 1)) * chartWidth;
  };

  // Generate SVG path strings
  const atendimentoPoints = data.map((d, i) => `${getX(i)},${getY(d.atendimento)}`).join(' ');
  const gapPoints = data.map((d, i) => `${getX(i)},${getY(d.gap)}`).join(' ');

  const yTicks = [100, 75, 50, 25, 0];

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Evolução do Atendimento de Competências
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-normal">
            Acompanhamento mensal do atendimento e do gap frente aos requisitos de competência.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-5 text-xs font-medium">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
            <span className="text-slate-600">Atendimento (%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
            <span className="text-slate-600">Gap (%)</span>
          </div>
        </div>
      </div>

      {/* SVG Responsive Container */}
      <div className="w-full overflow-x-auto relative">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto min-w-[650px] overflow-visible"
        >
          {/* Grid lines and Y labels */}
          {yTicks.map((tick) => {
            const y = getY(tick);
            return (
              <g key={tick}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="#e2e8f0"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <text
                  x={paddingLeft - 12}
                  y={y + 4}
                  textAnchor="end"
                  className="text-[12px] fill-slate-400 font-sans"
                >
                  {tick}%
                </text>
              </g>
            );
          })}

          {/* X Axis labels */}
          {data.map((d, i) => {
            const x = getX(i);
            return (
              <text
                key={d.month}
                x={x}
                y={height - 12}
                textAnchor="middle"
                className="text-[12px] fill-slate-400 font-sans"
              >
                {d.month}
              </text>
            );
          })}

          {/* Atendimento Line (Green) */}
          <polyline
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={atendimentoPoints}
          />

          {/* Gap Line (Red/Rose) */}
          <polyline
            fill="none"
            stroke="#f43f5e"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={gapPoints}
          />

          {/* Interactive Dots for Atendimento */}
          {data.map((d, i) => {
            const cx = getX(i);
            const cy = getY(d.atendimento);
            const isHovered = hoveredIdx === i;
            return (
              <g
                key={`atend-${i}`}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? 6 : 4}
                  fill="#10b981"
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="transition-all duration-150"
                />
              </g>
            );
          })}

          {/* Interactive Dots for Gap */}
          {data.map((d, i) => {
            const cx = getX(i);
            const cy = getY(d.gap);
            const isHovered = hoveredIdx === i;
            return (
              <g
                key={`gap-${i}`}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? 6 : 4}
                  fill="#f43f5e"
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="transition-all duration-150"
                />
              </g>
            );
          })}

          {/* Vertical indicator line when hovering */}
          {hoveredIdx !== null && (
            <line
              x1={getX(hoveredIdx)}
              y1={paddingTop}
              x2={getX(hoveredIdx)}
              y2={paddingTop + chartHeight}
              stroke="#94a3b8"
              strokeDasharray="3 3"
              strokeWidth="1.5"
              pointerEvents="none"
            />
          )}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredIdx !== null && (
          <div
            className="absolute top-4 pointer-events-none transform -translate-x-1/2 bg-slate-900/95 text-white text-xs px-3.5 py-2.5 rounded-xl shadow-xl border border-slate-700 backdrop-blur-xs z-10 transition-all duration-150"
            style={{
              left: `${(getX(hoveredIdx) / width) * 100}%`,
            }}
          >
            <p className="font-bold text-slate-300 border-b border-slate-700/60 pb-1 mb-1.5">
              Mês: {data[hoveredIdx].month}/2026
            </p>
            <div className="flex items-center justify-between gap-4 text-emerald-400 font-medium">
              <span>Atendimento:</span>
              <span className="font-bold">{data[hoveredIdx].atendimento.toFixed(2)}%</span>
            </div>
            <div className="flex items-center justify-between gap-4 text-rose-400 font-medium mt-0.5">
              <span>Gap:</span>
              <span className="font-bold">{data[hoveredIdx].gap.toFixed(2)}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
