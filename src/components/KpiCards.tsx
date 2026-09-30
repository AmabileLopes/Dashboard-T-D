import React from 'react';
import { Target, AlertTriangle, Users, ExternalLink } from 'lucide-react';

interface KpiCardsProps {
  atendimentoRate: number;
  gapRate: number;
  mentoriaRate: number;
  onOpenModal: (tab: 'todas' | 'atendidas' | 'gaps') => void;
}

export const KpiCards: React.FC<KpiCardsProps> = ({
  atendimentoRate,
  gapRate,
  mentoriaRate,
  onOpenModal,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {/* Card 1: Atendimento de Competências */}
      <div className="bg-white rounded-2xl p-6 border-t-4 border-t-emerald-500 border border-slate-100 shadow-xs relative overflow-hidden transition-all hover:shadow-md">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-2xs shrink-0">
              <Target size={22} className="stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-800 leading-tight">
                Atendimento de Competências
              </h3>
            </div>
          </div>
          <button
            onClick={() => onOpenModal('atendidas')}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-2xs transition-all active:scale-95 cursor-pointer shrink-0"
          >
            <ExternalLink size={12} />
            <span>Ver lista</span>
          </button>
        </div>

        <div className="mt-2">
          <span className="text-4xl font-extrabold text-[#059669] tracking-tight">
            {atendimentoRate.toFixed(2)}%
          </span>
          <p className="text-xs text-slate-500 mt-2 font-normal">
            % de requisitos plenamente atendidos
          </p>
        </div>
      </div>

      {/* Card 2: Gap de Talentos */}
      <div className="bg-white rounded-2xl p-6 border-t-4 border-t-rose-500 border border-slate-100 shadow-xs relative overflow-hidden transition-all hover:shadow-md">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 shadow-2xs shrink-0">
              <AlertTriangle size={22} className="stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-800 leading-tight">
                Gap de Talentos
              </h3>
            </div>
          </div>
          <button
            onClick={() => onOpenModal('gaps')}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-2xs transition-all active:scale-95 cursor-pointer shrink-0"
          >
            <ExternalLink size={12} />
            <span>Ver lista</span>
          </button>
        </div>

        <div className="mt-2">
          <span className="text-4xl font-extrabold text-[#e11d48] tracking-tight">
            {gapRate.toFixed(2)}%
          </span>
          <p className="text-xs text-slate-500 mt-2 font-normal">
            % de Skills abaixo do nível desejado
          </p>
        </div>
      </div>

      {/* Card 3: Potencial de Mentoria */}
      <div className="bg-white rounded-2xl p-6 border-t-4 border-t-indigo-500 border border-slate-100 shadow-xs relative overflow-hidden transition-all hover:shadow-md">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-2xs shrink-0">
              <Users size={22} className="stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-800 leading-tight">
                Potencial de Mentoria
              </h3>
            </div>
          </div>
          <button
            onClick={() => onOpenModal('todas')}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-2xs transition-all active:scale-95 cursor-pointer shrink-0"
          >
            <ExternalLink size={12} />
            <span>Ver lista</span>
          </button>
        </div>

        <div className="mt-2">
          <span className="text-4xl font-extrabold text-[#4f46e5] tracking-tight">
            {mentoriaRate.toFixed(2)}%
          </span>
          <p className="text-xs text-slate-500 mt-2 font-normal">
            Colaboradores nível &ldquo;Ouro&rdquo; (Podem ensinar)
          </p>
        </div>
      </div>
    </div>
  );
};
