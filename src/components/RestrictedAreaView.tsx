import React from 'react';
import { Lock, Shield, Settings, Sliders, Database, Key } from 'lucide-react';

export const RestrictedAreaView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
            <Lock size={18} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Área Restrita & Configurações da Matriz
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Gestão administrativa de pesos, parâmetros de proficiência e calibração de requisitos de competências.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs">
          <div className="flex items-center gap-3 text-slate-800 font-bold text-sm mb-4">
            <Sliders size={18} className="text-blue-600" />
            <span>Calibração de Níveis de Competência</span>
          </div>
          <p className="text-xs text-slate-500 mb-4 leading-relaxed">
            Configure as faixas de corte para os níveis de atendimento e os critérios de validação para promoção de Bronze para Prata e Ouro.
          </p>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <span className="font-semibold text-slate-700">Tolerância Máxima de Gaps em Hard Skills</span>
              <span className="font-bold text-slate-900">1 requisito</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <span className="font-semibold text-slate-700">Requisito Mínimo para Potencial de Mentoria</span>
              <span className="font-bold text-slate-900">Nível 3 (Ouro) em &ge; 4 competências</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <span className="font-semibold text-slate-700">Prazo Padrão para Resolução de Gap de Prioridade Alta</span>
              <span className="font-bold text-slate-900">60 dias</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs">
          <div className="flex items-center gap-3 text-slate-800 font-bold text-sm mb-4">
            <Shield size={18} className="text-emerald-600" />
            <span>Segurança e Permissões de Acesso (RBAC)</span>
          </div>
          <p className="text-xs text-slate-500 mb-4 leading-relaxed">
            Usuários habilitados para edição de datas previstas e alteração de prioridades de gaps.
          </p>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <div>
                <span className="font-bold text-slate-800 block">Amabile Ouriques</span>
                <span className="text-[11px] text-slate-400">Administrador / D&A Lead</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[11px]">
                Acesso Total
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <div>
                <span className="font-bold text-slate-800 block">Alik Votisch</span>
                <span className="text-[11px] text-slate-400">Gerente de Marketing & Tech</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold text-[11px]">
                Gestor da Equipe
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
