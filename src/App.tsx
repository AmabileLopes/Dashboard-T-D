/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { HeaderFilters } from './components/HeaderFilters';
import { KpiCards } from './components/KpiCards';
import { EvolutionChart } from './components/EvolutionChart';
import { CompetencyModal } from './components/CompetencyModal';
import { HoursManagementView } from './components/HoursManagementView';
import { TrainingTracksView } from './components/TrainingTracksView';
import { RestrictedAreaView } from './components/RestrictedAreaView';
import { Toast } from './components/Toast';
import { initialManagers, monthlyEvolutionData } from './data/mockData';
import { Manager, FilterState, SkillLevel, GapPriority } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState('treinamentos');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInitialTab, setModalInitialTab] = useState<'todas' | 'atendidas' | 'gaps' | 'priorizados'>('todas');

  // Managers State
  const [managers, setManagers] = useState<Manager[]>(initialManagers);

  // Filters State
  const initialFilterState: FilterState = {
    directorate: 'Todas',
    manager: 'Todos',
    leader: 'Todos',
    team: 'Todos',
    maker: 'Todos',
    admission: 'Todas',
    category: 'Todas',
    mandatory: 'Todas',
    target: 'Todas',
    priorityFilter: 'Todas',
    searchQuery: '',
  };
  const [filters, setFilters] = useState<FilterState>(initialFilterState);

  // Collect available unique filter options
  const availableOptions = useMemo(() => {
    const directorates = new Set<string>();
    const managersList = new Set<string>();
    const leaders = new Set<string>();
    const teams = new Set<string>();
    const makers = new Set<string>();
    const categories = new Set<string>();
    const targets = new Set<string>();

    initialManagers.forEach((m) => {
      directorates.add(m.directorate);
      managersList.add(m.name);
      m.teams.forEach((t) => {
        teams.add(t.name);
        t.makers.forEach((mk) => {
          makers.add(mk.name);
          leaders.add(mk.directLeader);
          mk.competencies.forEach((c) => {
            categories.add(c.category);
            targets.add(c.targetPeriod);
          });
        });
      });
    });

    return {
      directorates: Array.from(directorates),
      managers: Array.from(managersList),
      leaders: Array.from(leaders),
      teams: Array.from(teams),
      makers: Array.from(makers),
      categories: Array.from(categories),
      targets: Array.from(targets),
    };
  }, []);

  // Filtered dataset
  const filteredManagers = useMemo(() => {
    return managers
      .filter((m) => {
        if (filters.directorate !== 'Todas' && m.directorate !== filters.directorate) return false;
        if (filters.manager !== 'Todos' && m.name !== filters.manager) return false;
        return true;
      })
      .map((m) => {
        const matchingTeams = m.teams
          .filter((t) => {
            if (filters.team !== 'Todos' && t.name !== filters.team) return false;
            return true;
          })
          .map((t) => {
            const matchingMakers = t.makers
              .filter((mk) => {
                if (filters.maker !== 'Todos' && mk.name !== filters.maker) return false;
                if (filters.leader !== 'Todos' && mk.directLeader !== filters.leader) return false;
                return true;
              })
              .map((mk) => {
                const matchingComps = mk.competencies.filter((c) => {
                  if (filters.category !== 'Todas' && c.category !== filters.category) return false;
                  if (filters.mandatory === 'Sim' && !c.isMandatory) return false;
                  if (filters.mandatory === 'Não' && c.isMandatory) return false;
                  if (filters.target !== 'Todas' && c.targetPeriod !== filters.target) return false;

                  const isAtend = c.currentLevel >= c.desiredLevel;
                  const isPrioritized = !isAtend && c.gapPriority && c.gapPriority !== 'Item não priorizado';

                  if (filters.priorityFilter === 'Sim' && !isPrioritized) return false;
                  if (filters.priorityFilter === 'Não' && isPrioritized) return false;

                  return true;
                });
                return { ...mk, competencies: matchingComps };
              })
              .filter((mk) => mk.competencies.length > 0);

            return { ...t, makers: matchingMakers };
          })
          .filter((t) => t.makers.length > 0);

        return { ...m, teams: matchingTeams };
      })
      .filter((m) => m.teams.length > 0);
  }, [managers, filters]);

  // Overall statistics calculation
  const overallStats = useMemo(() => {
    let atendidas = 0;
    let gaps = 0;
    let priorizados = 0;
    let mentorsCount = 0;
    let totalMakersCount = 0;

    filteredManagers.forEach((m) => {
      m.teams.forEach((t) => {
        t.makers.forEach((mk) => {
          totalMakersCount++;
          let hasGoldCompetency = false;
          mk.competencies.forEach((c) => {
            const isAtend = c.currentLevel >= c.desiredLevel;
            if (isAtend) {
              atendidas++;
            } else {
              gaps++;
              if (c.gapPriority && c.gapPriority !== 'Item não priorizado') {
                priorizados++;
              }
            }
            if (c.currentLevel === 3) {
              hasGoldCompetency = true;
            }
          });
          if (hasGoldCompetency) {
            mentorsCount++;
          }
        });
      });
    });

    const total = atendidas + gaps;
    const isFiltered = Object.entries(filters).some(([k, v]) => k !== 'searchQuery' && v !== 'Todas' && v !== 'Todos');

    let atendPct = 70.06;
    let gapPct = 29.94;
    let mentorPct = 16.66;

    if (total > 0 && isFiltered) {
      atendPct = (atendidas / total) * 100;
      gapPct = 100 - atendPct;
      mentorPct = totalMakersCount > 0 ? (mentorsCount / totalMakersCount) * 100 : 0;
    }

    const priorizadosRate = gaps > 0 ? (priorizados / gaps) * 100 : 32.4;
    const priorizadosDisplayCount = Math.max(0, 3420 + (priorizados - 4) * 850);

    return {
      atendimentoRate: atendPct,
      gapRate: gapPct,
      mentoriaRate: mentorPct,
      priorizadosCount: priorizadosDisplayCount,
      priorizadosRate,
      atendidas,
      gaps,
      priorizados,
      total,
    };
  }, [filteredManagers, filters]);

  // Handle competency updates from modal
  const handleUpdateCompetency = (
    makerId: string,
    compId: string,
    field: 'gapPriority' | 'targetDate' | 'currentLevel',
    value: string | SkillLevel | GapPriority
  ) => {
    setManagers((prev) =>
      prev.map((mgr) => ({
        ...mgr,
        teams: mgr.teams.map((tm) => ({
          ...tm,
          makers: tm.makers.map((mk) => {
            if (mk.id !== makerId) return mk;
            return {
              ...mk,
              competencies: mk.competencies.map((comp) => {
                if (comp.id !== compId) return comp;
                return {
                  ...comp,
                  [field]: value,
                };
              }),
            };
          }),
        })),
      }))
    );
  };

  // Simulation handler: assigns priorities based on desired level
  const handleSimulatePriorities = (rules: {
    level1: GapPriority;
    level2: GapPriority;
    level3: GapPriority;
  }) => {
    setManagers((prev) =>
      prev.map((mgr) => ({
        ...mgr,
        teams: mgr.teams.map((tm) => ({
          ...tm,
          makers: tm.makers.map((mk) => ({
            ...mk,
            competencies: mk.competencies.map((comp) => {
              const isGap = comp.currentLevel < comp.desiredLevel;
              if (!isGap) return comp;
              let assigned = comp.gapPriority;
              if (comp.desiredLevel === 1) assigned = rules.level1;
              else if (comp.desiredLevel === 2) assigned = rules.level2;
              else if (comp.desiredLevel === 3) assigned = rules.level3;

              let targetDate = comp.targetDate;
              if (assigned && assigned !== 'Item não priorizado' && !targetDate) {
                const days = comp.desiredLevel === 1 ? 30 : comp.desiredLevel === 2 ? 60 : 90;
                const d = new Date();
                d.setDate(d.getDate() + days);
                targetDate = d.toISOString().split('T')[0];
              }

              return { ...comp, gapPriority: assigned, targetDate };
            }),
          })),
        })),
      }))
    );
  };

  const handleResetPriorities = () => {
    setManagers(initialManagers);
  };

  const handleOpenModal = (tab: 'todas' | 'atendidas' | 'gaps' | 'priorizados') => {
    setModalInitialTab(tab);
    setIsModalOpen(true);
  };

  const handleResetFilters = () => {
    setFilters(initialFilterState);
    setToastMessage('Filtros restaurados para o padrão.');
  };

  const handleSaveFilters = () => {
    setToastMessage('Filtros salvos com sucesso no seu perfil.');
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? 'bg-[#0b101b] text-slate-100' : 'bg-[#f4f6f9] text-slate-800'
      } flex transition-colors duration-200`}
    >
      {/* Left Sidebar */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        collapsed={isSidebarCollapsed}
        setCollapsed={setIsSidebarCollapsed}
        onLogout={() => setToastMessage('Sessão encerrada com sucesso.')}
      />

      {/* Main Content Area */}
      <main
        className={`flex-1 transition-all duration-300 min-w-0 ${
          isSidebarCollapsed ? 'ml-20' : 'ml-64'
        } p-4 sm:p-6 lg:p-8`}
      >
        <div className="max-w-[1400px] mx-auto space-y-6">
          {currentTab === 'treinamentos' && (
            <>
              {/* Header & Filter Controls com Caixa Amarela de Priorização */}
              <HeaderFilters
                filters={filters}
                setFilters={setFilters}
                onResetFilters={handleResetFilters}
                onSaveFilters={handleSaveFilters}
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
                availableOptions={availableOptions}
              />

              {/* KPI Cards (Padrão exato de Tela 1: Atendimento, Gaps, Mentoria) */}
              <KpiCards
                atendimentoRate={overallStats.atendimentoRate}
                gapRate={overallStats.gapRate}
                mentoriaRate={overallStats.mentoriaRate}
                onOpenModal={handleOpenModal}
              />

              {/* Monthly Evolution Chart */}
              <EvolutionChart data={monthlyEvolutionData} />
            </>
          )}

          {currentTab === 'horas' && <HoursManagementView />}

          {currentTab === 'trilhas' && (
            <TrainingTracksView onSelectTrack={(msg) => setToastMessage(msg)} />
          )}

          {currentTab === 'restrita' && <RestrictedAreaView />}
        </div>
      </main>

      {/* Competency Modal com Caixa Amarela entre Atendidas e Gaps e Simulador */}
      <CompetencyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        managers={filteredManagers}
        initialTab={modalInitialTab}
        onUpdateCompetency={handleUpdateCompetency}
        onSimulatePriorities={handleSimulatePriorities}
        onResetPriorities={handleResetPriorities}
        onToast={(msg) => setToastMessage(msg)}
      />

      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
