import React from 'react';
import { Clock, TrendingUp, Award, Calendar, CheckCircle2 } from 'lucide-react';

export const HoursManagementView: React.FC = () => {
  const makersHours = [
    { name: 'GLAUCO SCAGLIA', team: 'Marketing', hours: 42, target: 40, status: 'Meta Atingida' },
    { name: 'BEATRIZ MENDES', team: 'Marketing', hours: 38, target: 40, status: 'Em Progresso' },
    { name: 'LUCAS PINHEIRO', team: 'Marketing', hours: 45, target: 40, status: 'Meta Atingida' },
    { name: 'CAMILA BORGES', team: 'Growth & Performance', hours: 50, target: 40, status: 'Meta Atingida' },
    { name: 'GABRIEL NOGUEIRA', team: 'Engenharia Core', hours: 48, target: 40, status: 'Meta Atingida' },
    { name: 'JULIANA COSTA', team: 'Engenharia Core', hours: 36, target: 40, status: 'Em Progresso' },
    { name: 'AMABILE OURIQUES', team: 'Data & Analytics', hours: 56, target: 40, status: 'Meta Atingida' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Gestão Horas Maker
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Acompanhamento do investimento em capacitação, horas de estudo e mentoria prática dos colaboradores.
        </p>

        {/* Top metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4">
            <div className="flex items-center justify-between text-blue-600 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Total de Horas no Mês</span>
              <Clock size={20} />
            </div>
            <div className="text-2xl font-extrabold text-blue-900">315h</div>
            <span className="text-xs text-blue-700 mt-1 block">+18% em relação ao mês anterior</span>
          </div>

          <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-4">
            <div className="flex items-center justify-between text-emerald-600 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Média por Maker</span>
              <TrendingUp size={20} />
            </div>
            <div className="text-2xl font-extrabold text-emerald-900">45.0h</div>
            <span className="text-xs text-emerald-700 mt-1 block">Meta mensal recomendada: 40h</span>
          </div>

          <div className="bg-purple-50/60 border border-purple-100 rounded-xl p-4">
            <div className="flex items-center justify-between text-purple-600 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Horas de Mentoria Ouro</span>
              <Award size={20} />
            </div>
            <div className="text-2xl font-extrabold text-purple-900">72h</div>
            <span className="text-xs text-purple-700 mt-1 block">Compartilhamento de conhecimento</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-800">
            Horas Registradas por Maker (Setembro/2026)
          </h2>
          <span className="text-xs text-slate-500">7 makers monitorados</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
              <tr>
                <th className="px-5 py-3">Maker</th>
                <th className="px-5 py-3">Time</th>
                <th className="px-5 py-3">Horas Realizadas</th>
                <th className="px-5 py-3">Meta (h)</th>
                <th className="px-5 py-3">Progresso</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {makersHours.map((row, i) => {
                const pct = Math.min(100, Math.round((row.hours / row.target) * 100));
                return (
                  <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 py-3.5 font-bold text-slate-800">{row.name}</td>
                    <td className="px-5 py-3.5 text-slate-600">{row.team}</td>
                    <td className="px-5 py-3.5 font-semibold text-slate-900">{row.hours}h</td>
                    <td className="px-5 py-3.5 text-slate-500">{row.target}h</td>
                    <td className="px-5 py-3.5 w-44">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              pct >= 100 ? 'bg-emerald-500' : 'bg-blue-500'
                            }`}
                            style={{ width: `${pct}%` }}
                          ></div>
                        </div>
                        <span className="text-[11px] font-bold text-slate-600">{pct}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                          row.status === 'Meta Atingida'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {row.status === 'Meta Atingida' && <CheckCircle2 size={12} />}
                        {row.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
