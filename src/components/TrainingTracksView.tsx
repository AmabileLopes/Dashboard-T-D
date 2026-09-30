import React from 'react';
import { Award, BookOpen, CheckCircle2, ChevronRight, ShieldCheck } from 'lucide-react';

export const TrainingTracksView: React.FC = () => {
  const levels = [
    {
      level: 1,
      badge: 'Bronze',
      title: 'Nível 1 - Bronze (Fundamentos)',
      badgeColor: 'border-amber-600 text-amber-700 bg-amber-50',
      description: 'Domínio dos conceitos essenciais, ferramentas básicas e execução autônoma de rotinas padronizadas.',
      tracks: [
        { name: 'Onboarding Técnico e Arquitetura NDD', duration: '20 horas', modules: 6 },
        { name: 'APIs & Padrões REST fundamentais', duration: '15 horas', modules: 4 },
        { name: 'Capacidade de Abstração & Resolução de Problemas', duration: '12 horas', modules: 4 },
      ],
    },
    {
      level: 2,
      badge: 'Prata',
      title: 'Nível 2 - Prata (Intermediário / Aplicação Plena)',
      badgeColor: 'border-slate-400 text-slate-700 bg-slate-100',
      description: 'Capacidade de lidar com cenários complexos, otimização de performance, segurança e entrega ponta a ponta.',
      tracks: [
        { name: 'Integrações de Alta Disponibilidade e Microsserviços', duration: '30 horas', modules: 8 },
        { name: 'Análise de Conversão, Funil e Métricas de Produto', duration: '25 horas', modules: 5 },
        { name: 'Qualidade de Software, Testes Automatizados e CI/CD', duration: '20 horas', modules: 6 },
      ],
    },
    {
      level: 3,
      badge: 'Ouro',
      title: 'Nível 3 - Ouro (Avançado / Potencial de Mentoria)',
      badgeColor: 'border-emerald-600 text-emerald-700 bg-emerald-50',
      description: 'Referência técnica da equipe, formulação de padrões arquiteturais e formação ativa de novos talentos (Mentoria).',
      tracks: [
        { name: 'Programa de Mentores & Multiplicadores de Conhecimento', duration: '24 horas', modules: 6 },
        { name: 'Engenharia de Dados em Escala e Governança Corporativa', duration: '35 horas', modules: 7 },
        { name: 'Liderança Técnica & Arquitetura Evolutiva', duration: '28 horas', modules: 5 },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Trilhas de Treinamento por Nível
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Evolução estruturada em 3 níveis: Bronze (Nível 1), Prata (Nível 2) e Ouro (Nível 3 - Mentoria).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {levels.map((lvl) => (
          <div
            key={lvl.level}
            className="bg-white rounded-2xl border border-slate-100 shadow-xs p-6 flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${lvl.badgeColor}`}>
                  {lvl.badge}
                </span>
                <span className="text-xs font-bold text-slate-400">Nível {lvl.level}</span>
              </div>

              <h2 className="text-base font-bold text-slate-900 mb-2">{lvl.title}</h2>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">{lvl.description}</p>

              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Trilhas Obrigatórias
                </h3>
                {lvl.tracks.map((trk, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-xs font-semibold text-slate-800">{trk.name}</h4>
                      <span className="text-[11px] text-slate-400">
                        {trk.duration} &bull; {trk.modules} módulos
                      </span>
                    </div>
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0 ml-2" />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                onClick={() => alert(`Acessando trilhas do nível ${lvl.badge}...`)}
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <span>Explorar Conteúdos</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
